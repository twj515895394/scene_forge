import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { spawn, ChildProcess } from 'child_process';
import { randomUUID } from 'crypto';
import { createTransformStreamState, createTransformUsageState } from './transformClaudeMessage.js';
import { FileWatcher } from './FileWatcher.js';
import { engineVersion, Project, StateMachine, parseMarkdownFrontmatter } from '@scene-forge/engine';
import { AcpSubprocess, AcpJsonRpcTransport, AcpClientConnection } from './acp/index.js';
import { buildSessionBubblesFromJsonl } from './chatHistory.js';
import { extractClaudeChunks } from './claudeStream.js';
import { getArtifactsForStage } from './artifactDiscovery.js';
import { mergeVisibleBubbleChunk } from './liveBubbleAccumulator.js';
import {
  buildIdeBlockedPromptPayload,
  buildPermissionPromptPayload,
} from './permissionPrompt.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 4399;

function previewDebugContent(value: string, length = 80): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, length);
}

function debugChatEvent(label: string, payload: Record<string, unknown>) {
  console.log(`[DEBUG-chatdiag] ${label}`, payload);
}

function normalizeComparableContent(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function collectSeparatorLines(value: string): string[] {
  return value.match(/^\s*(?:-{3,}|\*{3,}|_{3,}|={3,})\s*$/gm) ?? [];
}

function collectTableDelimiterLines(value: string): string[] {
  return value.match(/^\s*\|?(?:\s*:?-{3,}:?\s*\|){1,}\s*:?-{3,}:?\s*\|?\s*$/gm) ?? [];
}

function collectBlankRunLengths(value: string): number[] {
  return (value.match(/\n{3,}/g) ?? []).map((segment) => segment.length);
}

function summarizeRenderableAnomalies(value: string) {
  const separatorLines = collectSeparatorLines(value);
  const tableDelimiterLines = collectTableDelimiterLines(value);
  const blankRuns = collectBlankRunLengths(value);

  return {
    separatorLineCount: separatorLines.length,
    tableDelimiterCount: tableDelimiterLines.length,
    blankRunCount: blankRuns.length,
    maxBlankRun: blankRuns.length > 0 ? Math.max(...blankRuns) : 0,
  };
}

function collectSuspiciousTextBubbles(
  bubbles: Array<{ id: string; type: string; content: string }>
) {
  return bubbles
    .filter((bubble) => bubble.type === 'text' && typeof bubble.content === 'string')
    .map((bubble) => {
      const summary = summarizeRenderableAnomalies(bubble.content);
      return {
        id: bubble.id,
        preview: previewDebugContent(bubble.content, 140),
        ...summary,
      };
    })
    .filter((bubble) =>
      bubble.separatorLineCount > 0 ||
      bubble.tableDelimiterCount > 0 ||
      bubble.blankRunCount > 0
    );
}

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

type ExecutionPolicyMode = 'fast_production' | 'full_auto';

function isExecutionPolicyMode(value: unknown): value is ExecutionPolicyMode {
  return value === 'fast_production' || value === 'full_auto';
}

function buildExecutionPolicyYaml(mode: ExecutionPolicyMode): string {
  return [
    'execution_policy:',
    `  mode: ${mode}`,
    `  updated_at: '${new Date().toISOString()}'`,
    '  full_auto_requires:',
    '    topic_gate_confirmed: true',
    '    adaptation_confirmed: true',
    '    duration_confirmed: true',
    '    segment_strategy_confirmed: true',
  ].join('\n');
}

function upsertExecutionPolicyBlock(boardContent: string, mode: ExecutionPolicyMode): string {
  const block = buildExecutionPolicyYaml(mode);
  const existingBlockPattern = /^execution_policy:\n(?:^[ \t]+.*\n?)*/m;
  if (existingBlockPattern.test(boardContent)) {
    return boardContent.replace(existingBlockPattern, `${block}\n`);
  }

  const insertBeforeRuntime = /^runtime_policy:/m;
  if (insertBeforeRuntime.test(boardContent)) {
    return boardContent.replace(insertBeforeRuntime, `${block}\n$&`);
  }

  return `${block}\n${boardContent}`;
}

function readProjectBoardState(projectPath: string): any | null {
  const boardPath = path.join(projectPath, 'PROJECT_BOARD.md');
  if (!fs.existsSync(boardPath)) {
    return null;
  }
  try {
    const boardContent = fs.readFileSync(boardPath, 'utf8');
    const parsed = parseMarkdownFrontmatter(boardContent);
    return parsed.frontmatter;
  } catch (err) {
    console.error('Failed to parse PROJECT_BOARD.md:', err);
    return null;
  }
}

function getExecutionPolicyContext(projectPath: string): string {
  const boardState = readProjectBoardState(projectPath);
  const mode = boardState?.execution_policy?.mode === 'full_auto' ? 'full_auto' : 'fast_production';
  const confirmations = boardState?.confirmations ?? {};
  const config = boardState?.project_config ?? {};
  const confirmed = (value: any) => value?.status === 'confirmed' || value?.status === 'legacy confirmed';
  const fullAutoUnlocked = (
    confirmed(confirmations.topic_confirmed) &&
    confirmed(confirmations.style_family_confirmed) &&
    confirmed(confirmations.style_confirmed) &&
    confirmed(confirmations.script_confirmed) &&
    Boolean(config.target_total_duration_seconds) &&
    Boolean(config.segment_duration_seconds)
  );

  return `当前执行策略 execution_policy.mode = ${mode}。
- fast_production：默认快速执行模式。topic_gate、script/adaptation、design、storyboard、video_prompts 等关键创作阶段保留确认；reference、story、assets、performance、audio、publish_review 等执行型阶段可自动落盘并汇报产物。
- full_auto：全自动模式。只有 topic_gate + script/adaptation 必须先确认题材、风格、改编方向、目标总时长、分段策略和输出目标；之后 design/performance/storyboard/audio/video_prompts/publish_review 自动执行。
- full_auto 当前状态：${fullAutoUnlocked ? '已解锁，可在硬错误前自动推进后续阶段' : '待解锁，前置确认未完全满足，不得跳过 topic_gate 或 script/adaptation 的确认'}。
- 全自动硬停机条件：validator/review 失败、必填字段缺失、时长/分段策略冲突、上游关键产物不存在、CLI 状态机无法推进。
- 创作质量一般但结构可用时，不中断流程；在最终汇报中标注风险。`;
}

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

  const boardState = readProjectBoardState(activeProjectPath);

  res.json({ success: true, projectSlug, state, boardState });
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

    const boardState = readProjectBoardState(activeProjectPath);

    res.json({
      active: true,
      projectSlug: path.basename(activeProjectPath),
      path: activeProjectPath,
      state,
      boardState
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/projects/active/execution-policy', (req, res) => {
  if (!activeProjectPath) {
    return res.status(400).json({ error: 'No active project selected' });
  }

  const { mode } = req.body;
  if (!isExecutionPolicyMode(mode)) {
    return res.status(400).json({ error: 'Invalid execution policy mode' });
  }

  const boardPath = path.join(activeProjectPath, 'PROJECT_BOARD.md');
  if (!fs.existsSync(boardPath)) {
    return res.status(404).json({ error: 'PROJECT_BOARD.md not found' });
  }

  try {
    const boardContent = fs.readFileSync(boardPath, 'utf8');
    fs.writeFileSync(boardPath, upsertExecutionPolicyBlock(boardContent, mode), 'utf8');
    res.json({
      success: true,
      mode,
      boardState: readProjectBoardState(activeProjectPath),
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

    // Parse newly created PROJECT_BOARD.md
    let boardState = null;
    const boardPath = path.join(newProjectPath, 'PROJECT_BOARD.md');
    if (fs.existsSync(boardPath)) {
      try {
        const boardContent = fs.readFileSync(boardPath, 'utf8');
        const parsed = parseMarkdownFrontmatter(boardContent);
        boardState = parsed.frontmatter;
      } catch (err) {
        console.error('Failed to parse PROJECT_BOARD.md:', err);
      }
    }

    res.status(201).json({
      success: true,
      projectSlug: cleanSlug,
      path: newProjectPath,
      state,
      boardState
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
    res.json(getArtifactsForStage(activeProjectPath, stage));
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
        const val = entry.message?.content || entry.content;
        if (entry.type === 'user' && val) {
          if (!firstUserMessage) {
            let raw = '';
            if (typeof val === 'string') {
              raw = val;
            } else if (Array.isArray(val)) {
              raw = val
                .filter((b: any) => b.type === 'text')
                .map((b: any) => b.text)
                .join('\n');
            } else {
              raw = JSON.stringify(val);
            }
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

    const bubbles = getSessionBubbles(req.params.id);
    res.json({ id: req.params.id, bubbles });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Build minimal routing context for Claude's first message
function buildProjectContext(projectPath: string): string {
  const slug = path.basename(projectPath);
  if (projectPath !== workspaceRoot) {
    return `【重要提示】当前正在操作的项目是：${slug}。
${getExecutionPolicyContext(projectPath)}
1. 所有该项目的产物（无论是通过工具写入文件还是生成代码）在调用工具时，必须使用以项目文件夹为起点的完整相对路径（即以 'projects/${slug}/' 开头）：
   - 正式产物写盘路径应为：'projects/${slug}/outputs/' (例如：'projects/${slug}/outputs/video_prompts_pack_001.md')
   - 过程草稿写盘路径应为：'projects/${slug}/details/'
   - 输入资产读写路径应为：'projects/${slug}/inputs/'
   - 阶段配置文件路径为：'projects/${slug}/PROJECT_STATE.json'
   - 黑板文件路径为：'projects/${slug}/PROJECT_BOARD.md'
   - 产物注册清单路径为：'projects/${slug}/artifacts.manifest.yaml'
   注意：在调用 IDE/AI 文件读写工具（如 write_to_file、replace_file_content 等）时，绝对不能省略 'projects/${slug}/' 前缀！
2. 任何在终端执行 CLI 状态机命令的操作，必须先切换工作目录（cd）至 'projects/${slug}/' 后再执行。例如：
   - cd projects/${slug} && node ../../packages/engine/dist/cli.js status
   - cd projects/${slug} && node ../../packages/engine/dist/cli.js start --stage <stage>
   - cd projects/${slug} && node ../../packages/engine/dist/cli.js validate --stage <stage>
   - cd projects/${slug} && node ../../packages/engine/dist/cli.js complete --stage <stage>
   - cd projects/${slug} && node ../../packages/engine/dist/cli.js rules --stage <stage>
   严禁在工作区根目录、/Users/tangwujun/Documents 或其他目录直接执行 'node ../../packages/engine/dist/cli.js ...'，否则相对路径会解析到错误位置。
3. 随时阅读根目录下的 './AGENTS.md' 了解开发规范，而不是 './CLAUDE.md'。`;
  }
  return `【当前状态】工作区处于根目录，暂无激活的具体创作项目。
如需开始工作，请先在 Web Console 激活或创建一个具体项目。请阅读根目录下的 './AGENTS.md' 了解开发规范，而不是 './CLAUDE.md'。`;
}

// Helper to parse Claude's raw session JSONL log into ChatBubbles
function getSessionBubbles(sessionId: string): any[] {
  const sessionDir = getClaudeSessionDir(workspaceRoot);
  const jsonlPath = path.join(sessionDir, `${sessionId}.jsonl`);
  if (!fs.existsSync(jsonlPath)) return [];
  try {
    const content = fs.readFileSync(jsonlPath, 'utf8');
    return buildSessionBubblesFromJsonl(content, sessionId);
  } catch {
    return [];
  }
}

wss.on('connection', (ws: WebSocket) => {
  const targetPath = activeProjectPath || workspaceRoot;
  console.log(`Client connected to Web Console WebSocket. Target path: ${targetPath}`);

  let currentProcess: ChildProcess | null = null;
  let sessionId: string = randomUUID();
  let isFirstMessage = true;
  let bypassPermissions = false;
  let activePromptSignature = '';
  let activePromptId = '';
  let activePromptMode: 'stdin' | 'ide_guidance' | '' = '';
  let lastPromptText = '';

  const dismissActivePrompt = () => {
    if (!activePromptId) return;
    if (activePromptMode === 'stdin' && ws.readyState === WebSocket.OPEN) {
      debugChatEvent('ws.prompt_ui_dismissed', { id: activePromptId });
      ws.send(JSON.stringify({ type: 'prompt_ui_dismissed', id: activePromptId }));
    }
    if (activePromptMode === 'stdin') {
      activePromptSignature = '';
      activePromptId = '';
      activePromptMode = '';
    }
  };

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
      const suspiciousHistoryBubbles = collectSuspiciousTextBubbles(initialBubbles);
      debugChatEvent('ws.history.initial', {
        sessionId,
        count: initialBubbles.length,
        sample: initialBubbles.slice(0, 6).map((bubble) => ({
          id: bubble.id,
          type: bubble.type,
          preview: previewDebugContent(bubble.content),
        })),
        suspiciousTextBubbles: suspiciousHistoryBubbles.slice(0, 12),
      });
      ws.send(JSON.stringify({ type: 'history', bubbles: initialBubbles }));
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

    let finalPrompt = prompt;
    lastPromptText = prompt;
    const args = [
      '--print',
      '--output-format', 'stream-json',
      '--include-partial-messages',
      '--verbose'
    ];
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

    const childEnv: Record<string, string> = {
      ...process.env,
      PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH || ''}`
    };
    if (targetPath !== workspaceRoot) {
      childEnv.SCENE_FORGE_PROJECT_PATH = targetPath;
    }

    const proc = spawn(claudeBin, args, {
      cwd: workspaceRoot,
      env: childEnv
    });
    currentProcess = proc;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'run_status', running: true }));
    }

    // Initialize transformer state for the current run
    const streamState = createTransformStreamState();
    const usageState = createTransformUsageState();
    const transformOptions = {
      streamState,
      usageState,
      intendedModel: 'sonnet'
    };

    // Keep track of thoughts and text per block index, and tools by ID
    const thoughtsByIndex: Record<number, string> = {};
    const textsByIndex: Record<number, string> = {};
    const visibleThoughtStreamIndexes = new Set<number>();
    const visibleTextStreamIndexes = new Set<number>();
    const hiddenTextIndexes = new Set<number>();
    const toolUses = new Map<string, { id: string; name: string; input: any; status: string; result?: string; isError?: boolean }>();
    const lastToolBubbleContent = new Map<string, string>();
    let pendingSensitiveTool: { id: string; name: string } | null = null;
    let ideGuidancePromptShown = false;

    const runId = Date.now().toString(36); // Generate unique ID for this turn to avoid collisions

    const emitPromptUi = (
      promptPayload: { title: string; options: Array<{ kind: 'allow' | 'deny'; label: string; value: string }> },
      mode: 'stdin' | 'ide_guidance'
    ) => {
      if (promptPayload.title === activePromptSignature) {
        debugChatEvent('prompt_ui.duplicate_ignored', {
          title: previewDebugContent(promptPayload.title, 140),
          mode,
        });
        return;
      }
      activePromptSignature = promptPayload.title;
      activePromptId = `prompt-${Date.now()}`;
      activePromptMode = mode;
      if (ws.readyState === WebSocket.OPEN) {
        debugChatEvent('ws.prompt_ui', {
          id: activePromptId,
          mode,
          title: previewDebugContent(promptPayload.title, 140),
          options: promptPayload.options.map((option) => option.value),
        });
        ws.send(JSON.stringify({
          type: 'prompt_ui',
          id: activePromptId,
          title: promptPayload.title,
          options: promptPayload.options,
        }));
      }
    };

    const handleClaudeJsonEvent = (msg: any) => {
      let chunks: any[] = [];
      try {
        chunks = extractClaudeChunks(msg, transformOptions);
      } catch (err) {
        console.error(`[handleClaudeJsonEvent] transform error:`, err);
        return;
      }
      if (chunks.length === 0) return;

      const generatedBubbles: any[] = [];

      for (const chunk of chunks) {
        debugChatEvent('claude.chunk', {
          sourceType: msg?.type ?? 'unknown',
          chunkType: chunk.type,
          index: chunk.index ?? null,
          id: chunk.id ?? null,
          preview: previewDebugContent(
            typeof chunk.content === 'string'
              ? chunk.content
              : JSON.stringify(chunk.input ?? {})
          ),
        });
        if (chunk.type === 'thinking') {
          const idx = chunk.index ?? 0;
          const comparableIncoming = normalizeComparableContent(chunk.content);
          if (
            msg?.type !== 'stream_event' &&
            comparableIncoming &&
            Object.values(thoughtsByIndex).some(
              (existing) => normalizeComparableContent(existing) === comparableIncoming
            )
          ) {
            debugChatEvent('thinking.semantic_duplicate_skipped', {
              runId,
              idx,
              preview: previewDebugContent(chunk.content),
            });
            continue;
          }
          const mergeResult = mergeVisibleBubbleChunk({
            previous: thoughtsByIndex[idx] || '',
            incoming: chunk.content,
            source: msg?.type === 'stream_event' ? 'stream' : 'assistant',
            streamVisible: visibleThoughtStreamIndexes.has(idx),
          });
          if (mergeResult.skipped) {
            continue;
          }
          thoughtsByIndex[idx] = mergeResult.next;
          if (msg?.type === 'stream_event') {
            visibleThoughtStreamIndexes.add(idx);
          }
          generatedBubbles.push({
            id: `run-${runId}-thought-${idx}`,
            type: 'thought',
            content: thoughtsByIndex[idx],
            timestamp: new Date().toISOString()
          });
        } else if (chunk.type === 'text') {
          const idx = chunk.index ?? 0;
          if (ideGuidancePromptShown && buildIdeBlockedPromptPayload(chunk.content)) {
            debugChatEvent('text.ide_guidance_duplicate_skipped', {
              runId,
              idx,
              preview: previewDebugContent(chunk.content, 140),
            });
            continue;
          }
          const comparableIncoming = normalizeComparableContent(chunk.content);
          if (
            msg?.type !== 'stream_event' &&
            comparableIncoming &&
            Object.values(textsByIndex).some(
              (existing) => normalizeComparableContent(existing) === comparableIncoming
            )
          ) {
            debugChatEvent('text.semantic_duplicate_skipped', {
              runId,
              idx,
              preview: previewDebugContent(chunk.content, 140),
            });
            continue;
          }
          const mergeResult = mergeVisibleBubbleChunk({
            previous: textsByIndex[idx] || '',
            incoming: chunk.content,
            source: msg?.type === 'stream_event' ? 'stream' : 'assistant',
            streamVisible: visibleTextStreamIndexes.has(idx),
          });
          if (mergeResult.skipped) {
            continue;
          }
          textsByIndex[idx] = mergeResult.next;
          if (msg?.type === 'stream_event') {
            visibleTextStreamIndexes.add(idx);
          }

          if (!ideGuidancePromptShown && pendingSensitiveTool) {
            const fallbackPromptPayload = buildIdeBlockedPromptPayload(textsByIndex[idx]);
            if (fallbackPromptPayload && !bypassPermissions) {
              ideGuidancePromptShown = true;
              hiddenTextIndexes.add(idx);
              textsByIndex[idx] = '';
              emitPromptUi(fallbackPromptPayload, 'ide_guidance');
              generatedBubbles.push({
                id: `run-${runId}-text-${idx}`,
                type: 'text',
                content: '',
                timestamp: new Date().toISOString()
              });
              continue;
            }
          }

          if (hiddenTextIndexes.has(idx)) {
            continue;
          }

          if (textsByIndex[idx] && textsByIndex[idx].trim()) {
            generatedBubbles.push({
              id: `run-${runId}-text-${idx}`,
              type: 'text',
              content: textsByIndex[idx],
              timestamp: new Date().toISOString()
            });
          }
        } else if (chunk.type === 'tool_use') {
          type ToolInfo = { id: string; name: string; input: any; status: string; result?: string; isError?: boolean };
          const tool: ToolInfo = toolUses.get(chunk.id) || {
            id: chunk.id,
            name: chunk.name,
            input: chunk.input,
            status: 'running'
          };
          // Update partial input
          tool.input = { ...tool.input, ...chunk.input };
          toolUses.set(chunk.id, tool);
          if (['Write', 'Bash', 'Edit'].includes(tool.name)) {
            pendingSensitiveTool = { id: tool.id, name: tool.name };
          }

          const serializedTool = JSON.stringify(tool);
          if (lastToolBubbleContent.get(chunk.id) === serializedTool) {
            debugChatEvent('tool_use.duplicate_skipped', {
              runId,
              toolId: chunk.id,
              name: tool.name,
            });
            continue;
          }
          lastToolBubbleContent.set(chunk.id, serializedTool);

          generatedBubbles.push({
            id: `run-${runId}-tool-${chunk.id}`,
            type: 'tool_call',
            content: serializedTool,
            timestamp: new Date().toISOString()
          });
        } else if (chunk.type === 'tool_result') {
          type ToolInfo = { id: string; name: string; input: any; status: string; result?: string; isError?: boolean };
          const tool: ToolInfo = toolUses.get(chunk.id) || {
            id: chunk.id,
            name: 'unknown',
            input: {},
            status: 'completed'
          };
          tool.status = chunk.isError ? 'error' : 'completed';
          tool.result = chunk.content;
          tool.isError = chunk.isError;
          toolUses.set(chunk.id, tool);

          const serializedTool = JSON.stringify(tool);
          if (lastToolBubbleContent.get(chunk.id) === serializedTool) {
            debugChatEvent('tool_result.duplicate_skipped', {
              runId,
              toolId: chunk.id,
              name: tool.name,
            });
            continue;
          }
          lastToolBubbleContent.set(chunk.id, serializedTool);

          generatedBubbles.push({
            id: `run-${runId}-tool-${chunk.id}`,
            type: 'tool_call',
            content: serializedTool,
            timestamp: new Date().toISOString()
          });
        } else if (chunk.type === 'error') {
          generatedBubbles.push({
            id: `run-${runId}-error-${Date.now()}`,
            type: 'text',
            content: `❌ **Error:** ${chunk.content}`,
            timestamp: new Date().toISOString()
          });
        } else if (chunk.type === 'notice') {
          generatedBubbles.push({
            id: `run-${runId}-notice-${Date.now()}`,
            type: 'text',
            content: `⚠️ **Notice:** ${chunk.content}`,
            timestamp: new Date().toISOString()
          });
        }
      }

      if (ws.readyState === WebSocket.OPEN && generatedBubbles.length > 0) {
        const suspiciousOutputBubbles = collectSuspiciousTextBubbles(generatedBubbles);
        debugChatEvent('ws.output', {
          runId,
          count: generatedBubbles.length,
          sample: generatedBubbles.map((bubble) => ({
            id: bubble.id,
            type: bubble.type,
            preview: previewDebugContent(
              typeof bubble.content === 'string' ? bubble.content : JSON.stringify(bubble.content)
            ),
          })),
          suspiciousTextBubbles: suspiciousOutputBubbles.slice(0, 12),
        });
        ws.send(JSON.stringify({ type: 'output', bubbles: generatedBubbles }));
      }
    };

    const handleClaudeRawText = (text: string) => {
      const promptPayload = buildPermissionPromptPayload(text);
      debugChatEvent('claude.raw_text', {
        matchedPrompt: Boolean(promptPayload),
        bypassPermissions,
        preview: previewDebugContent(text, 140),
      });

      if (promptPayload && !bypassPermissions) {
        console.log(`[Permission Intercepted] Captured question text: ${promptPayload.title}`);
        emitPromptUi(promptPayload, 'stdin');
      }
    };

    let stdoutBuffer = '';
    proc.stdout.on('data', (data: Buffer) => {
      stdoutBuffer += data.toString();
      let lineIndex = stdoutBuffer.indexOf('\n');
      while (lineIndex !== -1) {
        const line = stdoutBuffer.slice(0, lineIndex).trim();
        stdoutBuffer = stdoutBuffer.slice(lineIndex + 1);
        if (line) {
          try {
            const parsed = JSON.parse(line);
            handleClaudeJsonEvent(parsed);
          } catch (err) {
            handleClaudeRawText(line);
          }
        }
        lineIndex = stdoutBuffer.indexOf('\n');
      }

      // Check remaining buffer for prompts without newline
      if (stdoutBuffer.trim()) {
        const remaining = stdoutBuffer.trim();
        if (buildPermissionPromptPayload(remaining) && !bypassPermissions) {
          handleClaudeRawText(remaining);
          stdoutBuffer = '';
        }
      }
    });

    let stderrBuffer = '';
    proc.stderr?.on('data', (data: Buffer) => {
      stderrBuffer += data.toString();
      let lineIndex = stderrBuffer.indexOf('\n');
      while (lineIndex !== -1) {
        const line = stderrBuffer.slice(0, lineIndex).trim();
        stderrBuffer = stderrBuffer.slice(lineIndex + 1);
        if (line) {
          handleClaudeRawText(line);
          console.warn(`[Claude Stderr] ${line}`);
        }
        lineIndex = stderrBuffer.indexOf('\n');
      }

      if (stderrBuffer.trim() && !bypassPermissions) {
        const remaining = stderrBuffer.trim();
        if (buildPermissionPromptPayload(remaining)) {
          handleClaudeRawText(remaining);
          stderrBuffer = '';
        }
      }
    });

    proc.on('close', () => {
      currentProcess = null;
      dismissActivePrompt();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'run_status', running: false }));
      }
    });
  };

  ws.on('message', async (message: string) => {
    try {
      const payload = JSON.parse(message);
      if (payload.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
        return;
      }
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
          if (activePromptMode === 'stdin' && currentProcess && currentProcess.stdin) {
            console.log(`[Permission Response] Writing User response: ${payload.value} to stdin`);
            currentProcess.stdin.write(`${payload.value}\n`);
            if (activePromptId && ws.readyState === WebSocket.OPEN) {
              const selectedOptionLabel = payload.value === 'y'
                ? '批准写入/执行 (Yes)'
                : payload.value === 'n'
                  ? '拒绝操作 (No)'
                  : payload.value;
              ws.send(JSON.stringify({
                type: 'prompt_ui_resolved',
                id: activePromptId,
                selectedOptionLabel,
              }));
            }
            activePromptSignature = '';
            activePromptId = '';
            activePromptMode = '';
          } else if (activePromptMode === 'ide_guidance') {
            const selectedOptionLabel = payload.value === 'retry_bypass'
              ? '开启自动授权并重试'
              : payload.value === 'ack_ide'
                ? '已在 IDE 处理，关闭提示'
                : payload.value === 'cancel'
                  ? '取消本次操作'
                  : payload.value;
            if (activePromptId && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'prompt_ui_resolved',
                id: activePromptId,
                selectedOptionLabel,
              }));
            }
            activePromptSignature = '';
            activePromptId = '';
            activePromptMode = '';
            if (payload.value === 'retry_bypass' && lastPromptText) {
              bypassPermissions = true;
              await runClaude(lastPromptText);
            }
          }
          break;

        case 'cancel':
          if (currentProcess) {
            try { currentProcess.kill('SIGINT'); } catch (_) {}
            currentProcess = null;
            dismissActivePrompt();
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
          dismissActivePrompt();
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
            const slug = activeProjectPath ? path.basename(activeProjectPath) : '<project-slug>';
            const cliPrefix = `cd projects/${slug} && node ../../packages/engine/dist/cli.js`;
            const prompts: Record<string, string> = {
              start: `请开始执行 ${stage} 阶段 learnings 对应的管线制作工作。先检查上游依赖是否完成。所有 CLI 命令必须使用当前项目目录执行，例如：\`${cliPrefix} start --stage ${stage}\`。`,
              validate: `请对 ${stage} 阶段的产物执行格式校验（Lint/Validator），并输出校验结果。必须使用当前项目目录执行：\`${cliPrefix} validate --stage ${stage}\`；查看规则使用：\`${cliPrefix} rules --stage ${stage}\`。`,
              complete: `请确认 ${stage} 阶段的工作已完成，执行 Complete 流程：生成 Handoff 文件，更新 PROJECT_STATE.json 状态。必须使用当前项目目录执行：\`${cliPrefix} complete --stage ${stage}\`。`
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
