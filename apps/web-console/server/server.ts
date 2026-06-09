import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn, ChildProcess } from 'child_process';
import { randomUUID } from 'crypto';
import { OutputParser } from './OutputParser.js';
import { FileWatcher } from './FileWatcher.js';
import { engineVersion, Project, StateMachine } from '@scene-forge/engine';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 4399;

// Helper to locate the monorepo workspace root containing the 'projects' directory
function findWorkspaceRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml')) || fs.existsSync(path.join(dir, 'projects'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return startDir;
}

const workspaceRoot = findWorkspaceRoot(process.cwd());
console.log(`Starting Web Console Server (Engine v${engineVersion})...`);
console.log(`Workspace root determined as: ${workspaceRoot}`);

// Support json request bodies
app.use(express.json());

// Allow CORS for development SPA access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve front-end static files in production
const distPath = path.resolve('./dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 1. File fetch API for GUI sidebar rendering
app.get('/api/file', (req, res) => {
  const filePath = req.query.path as string;
  if (!filePath) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }
  const rootDir = activeProjectPath || workspaceRoot;
  const fullPath = path.resolve(rootDir, filePath);
  
  // Sandbox boundary check to prevent traversal leaks
  if (!fullPath.startsWith(rootDir)) {
    return res.status(403).json({ error: 'Access Denied' });
  }
  
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Global tracker for currently active workspace project path
let activeProjectPath: string | null = null;

// 2. Projects Discovery API
app.get('/api/projects', (req, res) => {
  try {
    const projectsDir = path.resolve(workspaceRoot, 'projects');
    if (!fs.existsSync(projectsDir)) {
      return res.json([]);
    }
    const dirs = fs.readdirSync(projectsDir).filter(f => {
      const fullPath = path.join(projectsDir, f);
      return fs.statSync(fullPath).isDirectory() && f !== '_template' && !f.startsWith('.');
    });

    const list = dirs.map(dirName => {
      const projectPath = path.join(projectsDir, dirName);
      const project = new Project(projectPath);
      const stateMachine = new StateMachine(project);
      try {
        const state = stateMachine.readState();
        return {
          slug: dirName,
          path: projectPath,
          state
        };
      } catch (err) {
        return {
          slug: dirName,
          path: projectPath,
          error: (err as Error).message
        };
      }
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 3. Active project toggle API
app.post('/api/projects/active', (req, res) => {
  const { projectSlug } = req.body;
  if (!projectSlug) {
    activeProjectPath = null;
    console.log('Active project cleared.');
    return res.json({ success: true, active: false });
  }
  const projectPath = path.resolve(workspaceRoot, 'projects', projectSlug);
  if (!fs.existsSync(projectPath)) {
    return res.status(404).json({ error: `Project directory ${projectSlug} not found` });
  }
  activeProjectPath = projectPath;
  console.log(`Active project path updated to: ${activeProjectPath}`);
  
  // Return current state of active project
  const project = new Project(activeProjectPath);
  const stateMachine = new StateMachine(project);
  const state = stateMachine.readState();
  res.json({ success: true, projectSlug, state });
});

// 4. Retrieve current active project API
app.get('/api/projects/active', (req, res) => {
  if (!activeProjectPath) {
    return res.json({ active: false });
  }
  try {
    const project = new Project(activeProjectPath);
    const stateMachine = new StateMachine(project);
    const state = stateMachine.readState();
    res.json({
      active: true,
      projectSlug: path.basename(activeProjectPath),
      path: activeProjectPath,
      state
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 5. Create New Project API
app.post('/api/projects', (req, res) => {
  try {
    const { projectSlug, directorStyleId, concept } = req.body;
    if (!projectSlug || typeof projectSlug !== 'string' || !projectSlug.trim()) {
      return res.status(400).json({ error: '项目目录名称 (projectSlug) 不能为空' });
    }
    const cleanSlug = projectSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!cleanSlug) {
      return res.status(400).json({ error: '项目名称仅能包含英文字符、数字和横线' });
    }

    const projectsDir = path.resolve(workspaceRoot, 'projects');
    const newProjectPath = path.resolve(projectsDir, cleanSlug);
    if (fs.existsSync(newProjectPath)) {
      return res.status(409).json({ error: `项目 '${cleanSlug}' 已经存在` });
    }

    // Create directory structure
    fs.mkdirSync(newProjectPath, { recursive: true });
    fs.mkdirSync(path.join(newProjectPath, 'outputs'), { recursive: true });
    fs.mkdirSync(path.join(newProjectPath, 'inputs'), { recursive: true });
    fs.mkdirSync(path.join(newProjectPath, 'details'), { recursive: true });

    // Initialize PROJECT_STATE.json via StateMachine
    const project = new Project(newProjectPath);
    const stateMachine = new StateMachine(project);
    const state = stateMachine.readState(); // Auto-initializes

    // Inject director_style_id and concept into state
    (state as any).director_style_id = directorStyleId || 'disney_3d';
    if (concept) {
      (state as any).concept = concept;
    }
    fs.writeFileSync(
      path.join(newProjectPath, 'PROJECT_STATE.json'),
      JSON.stringify(state, null, 2),
      'utf8'
    );

    // Set as active project
    activeProjectPath = newProjectPath;
    console.log(`New project created and activated: ${cleanSlug}`);

    res.status(201).json({
      success: true,
      projectSlug: cleanSlug,
      path: newProjectPath,
      state
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 6. Artifacts dynamic listing API
app.get('/api/artifacts', (req, res) => {
  const stage = req.query.stage as string;
  if (!stage) {
    return res.status(400).json({ error: 'Missing stage parameter' });
  }
  if (!activeProjectPath) {
    return res.status(400).json({ error: 'No active project selected' });
  }
  try {
    const project = new Project(activeProjectPath);
    const manifest = project.readManifest();
    const list = manifest.artifacts.filter(a => a.stage === stage);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 7. Session History APIs — read Claude's on-disk conversation records
function getClaudeSessionDir(projectPath: string): string {
  // Claude normalises paths: replaces all non-alphanumeric chars with '-'
  const name = projectPath.replace(/[^a-zA-Z0-9]/g, '-');
  return path.join(os.homedir(), '.claude', 'projects', name);
}

function parseSessionPreview(jsonlPath: string): { id: string; preview: string; timestamp: string; messageCount: number } | null {
  try {
    const content = fs.readFileSync(jsonlPath, 'utf8');
    const lines = content.trim().split('\n');
    let firstUserMessage = '';
    let timestamp = '';
    let messageCount = 0;

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'user' && entry.message?.content) {
          if (!firstUserMessage) {
            firstUserMessage = typeof entry.message.content === 'string'
              ? entry.message.content
              : JSON.stringify(entry.message.content);
            timestamp = entry.timestamp || '';
          }
          messageCount++;
        } else if (entry.type === 'assistant') {
          messageCount++;
        }
      } catch { /* skip malformed lines */ }
    }

    if (!firstUserMessage) return null;
    const id = path.basename(jsonlPath, '.jsonl');
    return {
      id,
      preview: firstUserMessage.length > 100 ? firstUserMessage.slice(0, 100) + '…' : firstUserMessage,
      timestamp,
      messageCount
    };
  } catch {
    return null;
  }
}

app.get('/api/sessions', (req, res) => {
  const projectPath = activeProjectPath || workspaceRoot;
  try {
    const sessionDir = getClaudeSessionDir(projectPath);
    if (!fs.existsSync(sessionDir)) return res.json([]);

    const files = fs.readdirSync(sessionDir).filter(f => f.endsWith('.jsonl'));
    const sessions = files
      .map(f => parseSessionPreview(path.join(sessionDir, f)))
      .filter(Boolean)
      .sort((a, b) => (b?.timestamp || '').localeCompare(a?.timestamp || ''));

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get('/api/sessions/:id', (req, res) => {
  const projectPath = activeProjectPath || workspaceRoot;
  try {
    const sessionDir = getClaudeSessionDir(projectPath);
    const jsonlPath = path.join(sessionDir, `${req.params.id}.jsonl`);
    if (!fs.existsSync(jsonlPath)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const content = fs.readFileSync(jsonlPath, 'utf8');
    const lines = content.trim().split('\n');
    const messages: any[] = [];

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'user') {
          messages.push({
            role: 'user',
            content: typeof entry.message?.content === 'string' ? entry.message.content : '',
            timestamp: entry.timestamp
          });
        } else if (entry.type === 'assistant') {
          const blocks = entry.message?.content;
          const textParts: string[] = [];
          if (Array.isArray(blocks)) {
            for (const block of blocks) {
              if (block.type === 'text' && block.text) {
                textParts.push(block.text);
              } else if (block.type === 'thinking' && block.thinking) {
                textParts.push(`<thought>${block.thinking}</thought>`);
              } else if (block.type === 'tool_use') {
                textParts.push(`[tool_call: ${block.name || 'unknown'}]`);
              }
            }
          }
          messages.push({
            role: 'assistant',
            content: textParts.join('\n'),
            timestamp: entry.timestamp
          });
        }
      } catch { /* skip */ }
    }

    res.json({ id: req.params.id, messages });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Build project context for Claude's first message
function buildProjectContext(projectPath: string): string {
  const slug = path.basename(projectPath);
  const statePath = path.join(projectPath, 'PROJECT_STATE.json');
  let stateSummary = '未初始化';
  let currentStage = '';

  if (fs.existsSync(statePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      currentStage = state.current_stage || '';
      const stages = Object.entries(state.stages || {}) as [string, any][];
      const lines = stages.map(([name, s]) => {
        const statusIcon = s.status === 'completed' ? '✅' : s.status === 'in_progress' ? '🔄' : s.status === 'ready' ? '⬜' : '❌';
        return `  ${statusIcon} ${name}: ${s.status}`;
      });
      stateSummary = lines.join('\n');
      if (currentStage) {
        stateSummary += `\n\n当前活跃阶段: ${currentStage}`;
      }
    } catch {}
  }

  return `你是 SceneForge v9 的视频制作管线 AI 导演。

## 首要任务
**立即读取仓库根目录的运行规则文件 ./AGENTS.md**
该文件定义了上下文读取边界、紧凑预算、黑板纪律、预览先行等硬性约束，必须在执行任何操作前理解并遵守。

## 当前项目
- 项目名: ${slug}
- 路径: projects/${slug}/

## 管线阶段（严格按顺序执行，不可跳过）
topic_gate(选题) → script(剧本) → performance(表演) → audio(声音) → storyboard(分镜) → video_prompts(提示词) → publish_review(发布)

## 当前项目状态
${stateSummary}

## 执行顺序
1. 读取 ./AGENTS.md 理解全局约束
2. 读取 projects/${slug}/PROJECT_STATE.json 核对当前阶段
3. 读取 projects/${slug}/PROJECT_BOARD.md 了解项目详情和规则
4. 严格按阶段依赖顺序推进，上游未完成不开下游
5. 产物写 projects/${slug}/outputs/，草稿放 projects/${slug}/details/<stage>/
6. 完成后更新 projects/${slug}/PROJECT_STATE.json
7. 用中文回复，引导创作过程`;
}

wss.on('connection', (ws: WebSocket) => {
  const targetPath = activeProjectPath || workspaceRoot;
  console.log(`Client connected to Web Console WebSocket. Target path: ${targetPath}`);

  const parser = new OutputParser();
  let currentProcess: ChildProcess | null = null;
  let sessionId: string = randomUUID();
  let isFirstMessage = true;

  // Set up FileWatcher for hot reload push
  const watcher = new FileWatcher(targetPath, (msg: any) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  });

  const runClaude = (prompt: string) => {
    if (currentProcess) {
      try { currentProcess.kill('SIGINT'); } catch (_) {}
      currentProcess = null;
    }

    // 首次消息：注入项目上下文作为 system context
    let finalPrompt = prompt;
    const args = ['--print'];
    if (isFirstMessage) {
      const ctx = buildProjectContext(targetPath);
      finalPrompt = `${ctx}\n\n---\n用户: ${prompt}`;
      args.push(finalPrompt, '--session-id', sessionId);
      isFirstMessage = false;
    } else {
      args.push(prompt, '--resume', sessionId);
    }

    const proc = spawn('claude', args, { cwd: workspaceRoot, env: process.env });
    currentProcess = proc;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'run_status', running: true }));
    }

    proc.stdout.on('data', (data: Buffer) => {
      const bubbles = parser.feed(data.toString());
      if (ws.readyState === WebSocket.OPEN && bubbles.length > 0) {
        ws.send(JSON.stringify({ type: 'output', bubbles }));
      }
    });

    proc.on('close', () => {
      currentProcess = null;
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'run_status', running: false }));
      }
    });
  };

  ws.on('message', (message: string) => {
    try {
      const payload = JSON.parse(message);

      switch (payload.type) {
        case 'stdin':
          if (typeof payload.data === 'string' && payload.data.trim()) {
            runClaude(payload.data.trim());
          }
          break;

        case 'cancel':
          if (currentProcess) {
            try { currentProcess.kill('SIGINT'); } catch (_) {}
            currentProcess = null;
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'run_status', running: false }));
              ws.send(JSON.stringify({
                type: 'output',
                bubbles: [{ id: `c-${Date.now()}`, type: 'system', content: '⏹ 已中断', timestamp: new Date().toISOString() }]
              }));
            }
          }
          break;

        case 'new_session':
          if (currentProcess) { try { currentProcess.kill(); } catch (_) {} }
          currentProcess = null;
          parser.clear();
          sessionId = randomUUID();
          isFirstMessage = true;
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'run_status', running: false }));
          }
          break;

        case 'macro': {
          const { action, stage } = payload;
          if (action && stage) {
            const prompts: Record<string, string> = {
              start: `请开始执行 ${stage} 阶段的制作工作。先检查上游依赖是否完成，然后按照 Project Board 中的规范生成产物。`,
              validate: `请对 ${stage} 阶段的产物执行格式校验（Lint/Validator），并输出校验结果。`,
              complete: `请确认 ${stage} 阶段的工作已完成，执行 Complete 流程：生成 Handoff 文件，更新 PROJECT_STATE.json 状态。`
            };
            if (prompts[action]) runClaude(prompts[action]);
          }
          break;
        }

        default:
          break;
      }
    } catch (err) {
      if (typeof message === 'string' && message.trim()) {
        runClaude(message.trim());
      }
    }
  });

  ws.on('close', () => {
    if (currentProcess) { try { currentProcess.kill(); } catch (_) {} }
    watcher.close();
  });
});

server.listen(PORT, () => {
  console.log(`Web Console Service is active on http://localhost:${PORT}`);
});
