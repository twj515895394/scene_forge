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
import { AcpSubprocess, AcpJsonRpcTransport, AcpClientConnection } from './acp/index.js';

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

const STYLE_MAP: Record<string, string> = {
  disney_3d: 'pixar_like',
  classic_film: 'realist_cinematic_3d',
  pixar_sci_fi: 'dreamworks_like',
  cyberpunk_neon: 'comic_action_3d'
};

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

    // Map style ID
    const resolvedStyleId = STYLE_MAP[directorStyleId] || directorStyleId || 'pixar_like';
    const styleFamily = '3d_animation';

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
    (state as any).director_style_id = resolvedStyleId;
    if (concept) {
      (state as any).concept = concept;
    }
    fs.writeFileSync(
      path.join(newProjectPath, 'PROJECT_STATE.json'),
      JSON.stringify(state, null, 2),
      'utf8'
    );

    const nowStr = new Date().toISOString();

    // 1. Initialize PROJECT_BOARD.md
    const boardTemplatePath = path.join(workspaceRoot, '.agents', 'skills', 'scene-forge', 'references', 'project-board-template.md');
    if (fs.existsSync(boardTemplatePath)) {
      const templateContent = fs.readFileSync(boardTemplatePath, 'utf8');
      const yamlMatch = templateContent.match(/```yaml([\s\S]*?)```/);
      if (yamlMatch) {
        let boardYaml = yamlMatch[1].trim();
        boardYaml = boardYaml
          .replace(/(\s+)name:\s*$/m, `$1name: ${cleanSlug}`)
          .replace(/(\s+)slug:\s*$/m, `$1slug: ${cleanSlug}`)
          .replace(/(\s+)created_at:\s*$/m, `$1created_at: "${nowStr}"`)
          .replace(/(\s+)updated_at:\s*$/m, `$1updated_at: "${nowStr}"`)
          .replace(/(\s+)director_style_id:\s*$/m, `$1director_style_id: ${resolvedStyleId}`)
          .replace(/(\s+)director_style_version:\s*$/m, `$1director_style_version: v1`)
          .replace(/(\s+)style_family:\s*$/m, `$1style_family: ${styleFamily}`)
          .replace(/(\s+)style_profile_path:\s*$/m, `$1style_profile_path: style_profiles/${resolvedStyleId}/profile.md`);

        fs.writeFileSync(path.join(newProjectPath, 'PROJECT_BOARD.md'), boardYaml, 'utf8');
      }
    }

    // 2. Initialize PROJECT_INDEX.md for this project
    const indexTemplatePath = path.join(workspaceRoot, '.agents', 'skills', 'scene-forge', 'references', 'project-index-template.md');
    if (fs.existsSync(indexTemplatePath)) {
      const templateContent = fs.readFileSync(indexTemplatePath, 'utf8');
      const yamlMatch = templateContent.match(/```yaml([\s\S]*?)```/);
      if (yamlMatch) {
        let indexYaml = yamlMatch[1].trim();
        indexYaml = indexYaml
          .replace(/(\s+)project_slug:\s*$/m, `$1project_slug: ${cleanSlug}`)
          .replace(/(\s+)project_name:\s*$/m, `$1project_name: ${cleanSlug}`)
          .replace(/(\s+)updated_at:\s*$/m, `$1updated_at: "${nowStr}"`)
          .replace(/(\s+)lifecycle_flag:\s*$/m, `$1lifecycle_flag: active`)
          .replace(/(\s+)project_status:\s*$/m, `$1project_status: draft`)
          .replace(/(\s+)next_stage:\s*$/m, `$1next_stage: scene-topic-gate`)
          .replace(/(\s+)current_stage:\s*$/m, `$1current_stage: scene-topic-gate`)
          .replace(/(\s+)topic_summary:\s*$/m, `$1topic_summary: ${JSON.stringify(concept || '')}`)
          .replace(/(\s+)style_summary:\s*$/m, `$1style_summary: ${resolvedStyleId}`)
          .replace(/(\s+)aliases:\s*\[\]/m, `$1aliases: [${cleanSlug}]`)
          .replace(/(\s+)tags:\s*\[\]/m, `$1tags: [active, scene-topic-gate]`)
          .replace(/(\s+)board_path:\s*$/m, `$1board_path: projects/${cleanSlug}/PROJECT_BOARD.md`)
          .replace(/(\s+)route_reason:\s*$/m, `$1route_reason: 新项目初始化，等待进入选题闸门。`);

        fs.writeFileSync(path.join(newProjectPath, 'PROJECT_INDEX.md'), indexYaml, 'utf8');
      }
    }

    // 3. Register in global projects/PROJECT_INDEX.md
    const globalIndexPath = path.join(workspaceRoot, 'projects', 'PROJECT_INDEX.md');
    if (fs.existsSync(globalIndexPath)) {
      let content = fs.readFileSync(globalIndexPath, 'utf8');
      const indentedConcept = concept ? concept.trim().replace(/\n/g, '\n        ') : '';
      const newEntry = `    - project_slug: ${cleanSlug}
      project_name: ${cleanSlug}
      updated_at: ${nowStr}
      lifecycle_flag: active
      project_status: draft
      next_stage: scene-topic-gate
      current_stage: scene-topic-gate
      topic_summary: >
        ${indentedConcept}
      style_summary: ${resolvedStyleId}
      aliases:
        - ${cleanSlug}
      tags:
        - active
        - scene-topic-gate
      project_index_path: projects/${cleanSlug}/PROJECT_INDEX.md
      project_board_path: projects/${cleanSlug}/PROJECT_BOARD.md
`;
      const lastFenceIndex = content.lastIndexOf('```');
      if (lastFenceIndex !== -1) {
        content = content.slice(0, lastFenceIndex) + newEntry + content.slice(lastFenceIndex);
        content = content.replace(/updated_at:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, `updated_at: ${nowStr.split('.')[0]}`);
        fs.writeFileSync(globalIndexPath, content, 'utf8');
      }
    }

    // Set as active project
    activeProjectPath = newProjectPath;
    console.log(`New project created, initialized with board & index, and activated: ${cleanSlug}`);

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
            let raw = typeof entry.message.content === 'string'
              ? entry.message.content
              : JSON.stringify(entry.message.content);
            // 剥离注入上下文，只显示用户真正输入的内容
            const sep = '\n\n---\n用户: ';
            const idx = raw.indexOf(sep);
            firstUserMessage = idx !== -1 ? raw.slice(idx + sep.length) : raw;
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
  // Claude 的 cwd 是 workspaceRoot，session 文件始终存在该目录下
  const projectPath = workspaceRoot;
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
  const projectPath = workspaceRoot;
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
          let content = typeof entry.message?.content === 'string' ? entry.message.content : '';
          // 剥离我们注入的上下文，只保留用户真正的输入
          const sep = '\n\n---\n用户: ';
          const idx = content.indexOf(sep);
          if (idx !== -1) {
            content = content.slice(idx + sep.length);
          }
          if (content.trim()) {
            messages.push({ role: 'user', content, timestamp: entry.timestamp });
          }
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
          const joined = textParts.join('\n');
          if (joined.trim()) {
            messages.push({ role: 'assistant', content: joined, timestamp: entry.timestamp });
          }
        }
      } catch { /* skip */ }
    }

    res.json({ id: req.params.id, messages });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Build minimal routing context for Claude's first message
function buildProjectContext(projectPath: string): string {
  const slug = path.basename(projectPath);
  return `读取 ./AGENTS.md（不是根目录 the CLAUDE.md）。当前项目: ${slug}，目录 projects/${slug}/。`;
}

// Helper to parse Claude's raw session JSONL log into ChatBubbles
function getSessionBubbles(sessionId: string): any[] {
  const sessionDir = getClaudeSessionDir(workspaceRoot);
  const jsonlPath = path.join(sessionDir, `${sessionId}.jsonl`);
  if (!fs.existsSync(jsonlPath)) return [];
  try {
    const content = fs.readFileSync(jsonlPath, 'utf8');
    const lines = content.trim().split('\n');
    const bubbles: any[] = [];
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'user') {
          let text = typeof entry.message?.content === 'string' ? entry.message.content : '';
          const sep = '\n\n---\n用户: ';
          const idx = text.indexOf(sep);
          if (idx !== -1) {
            text = text.slice(idx + sep.length);
          }
          if (text.trim()) {
            bubbles.push({
              id: `hist-u-${sessionId.slice(0, 4)}-${bubbles.length}`,
              type: 'text',
              content: `> ${text}`,
              timestamp: entry.timestamp || new Date().toISOString()
            });
          }
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
          const joined = textParts.join('\n');
          if (joined.trim()) {
            const parts = joined.split(/(<thought>[\s\S]*?<\/thought>)/g);
            for (const part of parts) {
              if (part.startsWith('<thought>')) {
                bubbles.push({
                  id: `hist-t-${bubbles.length}`,
                  type: 'thought',
                  content: part.replace(/<\/?thought>/g, ''),
                  timestamp: entry.timestamp || new Date().toISOString()
                });
              } else if (part.trim()) {
                const isToolCall = part.trim().startsWith('[tool_call:');
                bubbles.push({
                  id: `hist-a-${bubbles.length}`,
                  type: isToolCall ? 'tool_call' : 'text',
                  content: part.trim(),
                  timestamp: entry.timestamp || new Date().toISOString()
                });
              }
            }
          }
        }
      } catch { /* skip */ }
    }
    return bubbles;
  } catch {
    return [];
  }
}

wss.on('connection', (ws: WebSocket) => {
  const targetPath = activeProjectPath || workspaceRoot;
  console.log(`Client connected to Web Console WebSocket. Target path: ${targetPath}`);

  const parser = new OutputParser();
  let currentProcess: ChildProcess | null = null;
  let sessionId: string = randomUUID();
  let isFirstMessage = true;
  let bypassPermissions = false;

  // Restore or persist session ID for the active target
  const activeSessionFile = path.join(targetPath, '.active_session_id');
  if (fs.existsSync(activeSessionFile)) {
    const storedId = fs.readFileSync(activeSessionFile, 'utf8').trim();
    if (storedId && storedId.length > 10) {
      sessionId = storedId;
      const sessionDir = getClaudeSessionDir(workspaceRoot);
      const jsonlPath = path.join(sessionDir, `${sessionId}.jsonl`);
      if (fs.existsSync(jsonlPath) && fs.statSync(jsonlPath).size > 0) {
        isFirstMessage = false;
        console.log(`[Session] Restored active session: ${sessionId} (resuming: true)`);
      } else {
        console.log(`[Session] Stored session ID found but empty on disk: ${sessionId}`);
      }
    }
  } else {
    try {
      fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
      console.log(`[Session] Persisted new active session ID: ${sessionId}`);
    } catch (err) {
      console.warn(`Failed to write .active_session_id: ${(err as Error).message}`);
    }
  }

  // Immediately push session history to the connected client
  const initialBubbles = getSessionBubbles(sessionId);
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'session_init', sessionId }));
    if (initialBubbles.length > 0) {
      ws.send(JSON.stringify({ type: 'output', bubbles: initialBubbles }));
    }
  }

  // Set up FileWatcher for hot reload push
  const watcher = new FileWatcher(targetPath, (msg: any) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  });

  const runClaude = async (prompt: string) => {
    if (currentProcess) {
      try { currentProcess.kill('SIGINT'); } catch (_) {}
      currentProcess = null;
    }

    // 首次消息：注入项目上下文作为 system context
    let finalPrompt = prompt;
    const args = ['--print'];
    if (bypassPermissions) {
      args.push('--dangerously-skip-permissions');
    }
    if (isFirstMessage) {
      const ctx = buildProjectContext(targetPath);
      finalPrompt = `${ctx}\n\n---\n用户: ${prompt}`;
      args.push(finalPrompt, '--session-id', sessionId);
      isFirstMessage = false;
    } else {
      args.push(prompt, '--resume', sessionId);
    }

    console.log(`[runClaude] Spawn command: claude ${args.join(' ')}`);

    let claudeBin = 'claude';
    try {
      if (fs.existsSync('/opt/homebrew/bin/claude')) {
        claudeBin = '/opt/homebrew/bin/claude';
      } else if (fs.existsSync('/usr/local/bin/claude')) {
        claudeBin = '/usr/local/bin/claude';
      }
    } catch (_) {}

    const proc = spawn(claudeBin, args, {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH || ''}`
      }
    });
    currentProcess = proc;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'run_status', running: true }));
    }

    proc.stdout.on('data', (data: Buffer) => {
      const text = data.toString();
      
      // 检测是否有提权等待：包含 '[y/N]' 或者 '(y/n)'，以及以 'Allow ' 开头。
      const cleanText = text.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '');
      const isPermissionRequest = cleanText.includes('[y/N]') || cleanText.includes('(y/n)') || cleanText.includes('Allow ') || cleanText.includes('批准');

      if (isPermissionRequest && !bypassPermissions) {
        console.log(`[Permission Intercepted] Captured question text: ${cleanText.trim()}`);
        
        const id = `prompt-${Date.now()}`;
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'prompt_ui',
            id,
            title: cleanText.trim() || '系统检测到 Claude CLI 正在请求授权，是否批准？',
            options: [
              { label: '批准写入/执行 (Yes)', value: 'y', kind: 'allow' },
              { label: '拒绝操作 (No)', value: 'n', kind: 'deny' }
            ]
          }));
        }
      }

      const bubbles = parser.feed(text);
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

  ws.on('message', async (message: string) => {
    try {
      const payload = JSON.parse(message);
      if (payload.bypassPermissions !== undefined) {
        bypassPermissions = !!payload.bypassPermissions;
      }

      switch (payload.type) {
        case 'load_session':
          if (payload.sessionId) {
            sessionId = payload.sessionId;
            isFirstMessage = false;
            try {
              fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
              console.log(`[Session] Synced active session ID to: ${sessionId}`);
            } catch (err) {
              console.warn(`Failed to sync .active_session_id: ${(err as Error).message}`);
            }
          }
          break;

        case 'stdin':
          if (typeof payload.data === 'string' && payload.data.trim()) {
            await runClaude(payload.data.trim());
          }
          break;

        case 'prompt_response':
          if (currentProcess && currentProcess.stdin) {
            console.log(`[Permission Response] Writing User response: ${payload.value} to stdin`);
            currentProcess.stdin.write(`${payload.value}\n`);
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
          try {
            fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
            console.log(`[Session] Created new active session ID: ${sessionId}`);
          } catch (err) {
            console.warn(`Failed to write new .active_session_id: ${(err as Error).message}`);
          }
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'run_status', running: false }));
            ws.send(JSON.stringify({ type: 'session_init', sessionId }));
          }
          break;

        case 'macro': {
          const { action, stage } = payload;
          if (action && stage) {
            const prompts: Record<string, string> = {
              start: `请开始执行 ${stage} 阶段 learnings 对应的管线制作工作。先检查上游依赖是否完成，然后按照 Project Board 中的规范生成产物。`,
              validate: `请对 ${stage} 阶段的产物执行格式校验（Lint/Validator），并输出校验结果。`,
              complete: `请确认 ${stage} 阶段的工作已完成，执行 Complete 流程：生成 Handoff 文件，更新 PROJECT_STATE.json 状态。`
            };
            if (prompts[action]) await runClaude(prompts[action]);
          }
          break;
        }

        default:
          break;
      }
    } catch (err) {
      if (typeof message === 'string' && message.trim()) {
        await runClaude(message.trim());
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
