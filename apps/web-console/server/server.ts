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
import { buildClaudeArgs, type ClaudeContextMode } from './claudeArgs.js';
import { isAllowedStageLightProjectCommand, isAllowedStageLightReadOnlyCommand } from './stageLightGuard.js';
import {
  denormalizeCliStageToSceneStage,
  getCurrentSopStage,
  getNextSopStage as resolveNextSopStage,
  normalizeSceneStageToCliStage,
  readProjectBoardState,
  readProjectState,
} from './stageState.js';
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

interface ToolGuardResult {
  blocked: boolean;
  reason?: string;
}

const STAGE_LIGHT_FORBIDDEN_PATH_SEGMENTS = [
  '.handoff',
  '.scratch',
  'docs',
  'packages',
  'runtime',
  '.git',
];

const STAGE_LIGHT_BLOCKED_TOOL_NAMES = new Set([
  'TaskCreate',
  'TodoWrite',
]);

function readToolInputString(input: any, keys: string[]): string {
  if (!input || typeof input !== 'object') return '';
  for (const key of keys) {
    const value = input[key];
    if (typeof value === 'string') return value;
  }
  return '';
}

function isPathInside(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function getStageLightPathCandidates(rawPath: string, projectPath: string): string[] {
  return [
    path.resolve(workspaceRoot, rawPath),
    path.resolve(projectPath, rawPath),
  ];
}

function isAllowedWorkspaceProtocolReadPath(rawPath: string, projectPath: string): boolean {
  const candidates = getStageLightPathCandidates(rawPath, projectPath);
  const skillRoot = path.join(workspaceRoot, '.agents', 'skills');
  const styleRoot = path.join(workspaceRoot, 'style_profiles');
  const assetsRoot = path.join(workspaceRoot, 'assets');
  const rootAgentsPath = path.join(workspaceRoot, 'AGENTS.md');
  const globalProjectIndexPath = path.join(projectsRoot, 'PROJECT_INDEX.md');

  return candidates.some((candidate) => {
    if (candidate === rootAgentsPath || candidate === globalProjectIndexPath) {
      return true;
    }

    if (isPathInside(skillRoot, candidate)) {
      const relativePath = path.relative(skillRoot, candidate).replace(/\\/g, '/');
      return /^scene-[^/]+\/SKILL\.md$/i.test(relativePath) ||
        /^scene-[^/]+\/references\/.+\.md$/i.test(relativePath);
    }

    if (isPathInside(styleRoot, candidate)) {
      const relativePath = path.relative(styleRoot, candidate).replace(/\\/g, '/');
      return relativePath === 'style_registry.md' ||
        /^[^/]+\/[^/]+\.md$/i.test(relativePath);
    }

    if (isPathInside(assetsRoot, candidate)) {
      const relativePath = path.relative(assetsRoot, candidate).replace(/\\/g, '/');
      return !relativePath.startsWith('.') && /(^|\/)[^/]+\.md$/i.test(relativePath);
    }

    return false;
  });
}

function isAllowedProjectContractPath(rawPath: string, projectPath: string, mode: 'read' | 'write'): boolean {
  const candidates = getStageLightPathCandidates(rawPath, projectPath);
  return candidates.some((resolvedPath) => {
    if (!isPathInside(projectPath, resolvedPath)) {
      return false;
    }

    const relativePath = path.relative(projectPath, resolvedPath).replace(/\\/g, '/');
    if (relativePath === '.scene_forge_session_meta.json' || relativePath === '.active_session_id') {
      return false;
    }

    return true;
  });
}

function isAllowedStageLightReadPath(rawPath: string, projectPath: string): boolean {
  if (!rawPath) return true;
  const normalizedRaw = rawPath.replace(/\\/g, '/');
  if (/(^|\/)CLAUDE\.md$/i.test(normalizedRaw)) {
    return false;
  }

  if (isAllowedWorkspaceProtocolReadPath(rawPath, projectPath)) {
    return true;
  }

  return isAllowedProjectContractPath(rawPath, projectPath, 'read');
}

function isAllowedStageLightWritePath(rawPath: string, projectPath: string): boolean {
  if (!rawPath) return true;
  const normalizedRaw = rawPath.replace(/\\/g, '/');
  if (/(^|\/)CLAUDE\.md$/i.test(normalizedRaw)) {
    return false;
  }
  return isAllowedProjectContractPath(rawPath, projectPath, 'write');
}

function isAllowedProjectLsCommand(command: string, projectPath: string): boolean {
  const pathPattern = '(?:"([^"]+)"|\\\'([^\\\']+)\\\'|(\\S+))';
  const lsPattern = new RegExp(`^ls(?:\\s+-[A-Za-z0-9@]+)*\\s+${pathPattern}(?:\\s+2>/dev/null)?(?:\\s+\\|\\|\\s+echo\\s+(?:"[^"]*"|\\'[^\\']*\\'))?$`);
  const match = command.match(lsPattern);
  if (!match) return false;

  const rawPath = match[1] || match[2] || match[3] || '';
  if (!rawPath) return false;
  const candidates = getStageLightPathCandidates(rawPath, projectPath);
  return candidates.some((candidate) => isPathInside(projectPath, candidate));
}

function validateStageLightToolUse(toolName: string, input: any, projectPath: string, sourceType?: string): ToolGuardResult {
  if (STAGE_LIGHT_BLOCKED_TOOL_NAMES.has(toolName)) {
    return { blocked: true, reason: `${toolName} is blocked in stage_light; use PROJECT_STATE.json / PROJECT_BOARD.md / CLI status instead.` };
  }

  if (toolName === 'LS') {
    const rawPath = readToolInputString(input, ['path', 'file_path', 'AbsolutePath', 'TargetFile']);
    if (!rawPath || !isAllowedProjectContractPath(rawPath, projectPath, 'read')) {
      return { blocked: true, reason: `stage_light blocked LS outside the current project: ${rawPath || '(unknown path)'}` };
    }
  }

  if (toolName === 'Glob' || toolName === 'Grep') {
    const rawPath = readToolInputString(input, ['path', 'cwd', 'root', 'directory', 'AbsolutePath']);
    if (!rawPath && sourceType === 'stream_event') {
      return { blocked: false };
    }
    if (!rawPath || !isAllowedProjectContractPath(rawPath, projectPath, 'read')) {
      return { blocked: true, reason: `stage_light blocked ${toolName} outside the current project: ${rawPath || '(missing project path)'}` };
    }
  }

  if (toolName === 'Read') {
    const rawPath = readToolInputString(input, ['file_path', 'path', 'AbsolutePath', 'TargetFile']);
    if (!isAllowedStageLightReadPath(rawPath, projectPath)) {
      return { blocked: true, reason: `stage_light blocked ${toolName} outside the current project contract: ${rawPath || '(unknown path)'}` };
    }
  }

  if (toolName === 'Edit' || toolName === 'Write') {
    const rawPath = readToolInputString(input, ['file_path', 'path', 'AbsolutePath', 'TargetFile']);
    if (!isAllowedStageLightWritePath(rawPath, projectPath)) {
      return { blocked: true, reason: `stage_light blocked ${toolName} outside writable project artifacts: ${rawPath || '(unknown path)'}` };
    }
  }

  if (toolName === 'Bash') {
    const command = readToolInputString(input, ['command', 'CommandLine']);
    const trimmed = command.trim();
    if (!trimmed) return { blocked: false };
    const normalizedCommand = trimmed.replace(/\s+/g, ' ');
    const cliOutputSuffix = String.raw`(?:\s+2>&1)?(?:\s+\|\s+head(?:\s+(?:-n\s+\d+|-\d+))?)?`;
    const allowedCli = new RegExp(String.raw`^node \.\.\/\.\.\/packages\/engine\/dist\/cli\.js (status|rules --stage [a-z_]+|start --stage [a-z_]+|validate --stage [a-z_]+|complete --stage [a-z_]+)( --json)?${cliOutputSuffix}$`, 'i');
    const escapedProjectPath = projectPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const allowedRootCli = new RegExp(String.raw`^cd ["']?${escapedProjectPath}["']? && node \.\.\/\.\.\/packages\/engine\/dist\/cli\.js (status|rules --stage [a-z_]+|start --stage [a-z_]+|validate --stage [a-z_]+|complete --stage [a-z_]+)( --json)?${cliOutputSuffix}$`, 'i');
    if (
      normalizedCommand === 'pwd' ||
      allowedCli.test(normalizedCommand) ||
      allowedRootCli.test(normalizedCommand) ||
      isAllowedProjectLsCommand(normalizedCommand, projectPath) ||
      isAllowedStageLightReadOnlyCommand(normalizedCommand, projectPath, workspaceRoot) ||
      isAllowedStageLightProjectCommand(normalizedCommand, projectPath, workspaceRoot)
    ) {
      return { blocked: false };
    }
    return { blocked: true, reason: `stage_light blocked shell command: ${normalizedCommand.slice(0, 180)}` };
  }

  const serializedInput = JSON.stringify(input ?? {}).replace(/\\/g, '/');
  if (STAGE_LIGHT_FORBIDDEN_PATH_SEGMENTS.some((segment) => serializedInput.includes(segment))) {
    return { blocked: true, reason: `stage_light blocked access to forbidden workspace segment via ${toolName}.` };
  }

  return { blocked: false };
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
const webConsoleConfigPath = path.join(workspaceRoot, '.web-console-config.json');

interface WebConsoleConfig {
  projectsRoot?: string;
}

function readWebConsoleConfig(): WebConsoleConfig {
  if (!fs.existsSync(webConsoleConfigPath)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(webConsoleConfigPath, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeWebConsoleConfig(config: WebConsoleConfig) {
  fs.writeFileSync(webConsoleConfigPath, JSON.stringify(config, null, 2), 'utf8');
}

function resolveProjectsRoot(config: WebConsoleConfig = readWebConsoleConfig()): string {
  const configured = config.projectsRoot?.trim() || process.env.SCENE_FORGE_PROJECTS_DIR?.trim();
  if (!configured) {
    return path.resolve(workspaceRoot, 'projects');
  }
  return path.isAbsolute(configured)
    ? path.resolve(configured)
    : path.resolve(workspaceRoot, configured);
}

let projectsRoot = resolveProjectsRoot();
let activeProjectPath: string | null = null;
console.log(`Starting Web Console Server (Engine v${engineVersion})...`);
console.log(`Workspace root determined as: ${workspaceRoot}`);
console.log(`Projects root determined as: ${projectsRoot}`);

function resolveProjectPath(projectSlug: string): string {
  return path.resolve(projectsRoot, projectSlug);
}

function setProjectsRoot(projectsRootInput: string | undefined): string {
  const trimmed = projectsRootInput?.trim();
  const config = readWebConsoleConfig();
  if (!trimmed) {
    delete config.projectsRoot;
  } else {
    config.projectsRoot = path.isAbsolute(trimmed)
      ? path.resolve(trimmed)
      : path.resolve(workspaceRoot, trimmed);
  }
  writeWebConsoleConfig(config);
  projectsRoot = resolveProjectsRoot(config);
  activeProjectPath = null;
  console.log(`Projects root updated to: ${projectsRoot}`);
  return projectsRoot;
}

function getProjectDisplayPath(projectPath: string): string {
  const relative = path.relative(workspaceRoot, projectPath).replace(/\\/g, '/');
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative)
    ? relative
    : projectPath;
}

function getProjectsRootPayload() {
  const defaultProjectsRoot = path.resolve(workspaceRoot, 'projects');
  const config = readWebConsoleConfig();
  return {
    workspaceRoot,
    projectsRoot,
    defaultProjectsRoot,
    configuredProjectsRoot: config.projectsRoot ?? '',
    isDefault: projectsRoot === defaultProjectsRoot,
  };
}

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
    const projectsDir = projectsRoot;
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
  const projectPath = resolveProjectPath(projectSlug);
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

    const projectsDir = projectsRoot;
    const newProjectPath = path.resolve(projectsDir, cleanSlug);
    const projectIndexPath = getProjectDisplayPath(path.join(newProjectPath, 'PROJECT_INDEX.md'));
    const projectBoardPath = getProjectDisplayPath(path.join(newProjectPath, 'PROJECT_BOARD.md'));
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
          .replace(/(\s+)board_path:\s*$/m, `$1board_path: ${projectBoardPath}`)
          .replace(/(\s+)route_reason:\s*$/m, `$1route_reason: 新项目初始化，等待进入选题闸门。`);

        fs.writeFileSync(path.join(newProjectPath, 'PROJECT_INDEX.md'), indexYaml, 'utf8');
      }
    }

    // 3. Register in global projects/PROJECT_INDEX.md
    const globalIndexPath = path.join(projectsRoot, 'PROJECT_INDEX.md');
    if (fs.existsSync(globalIndexPath)) {
      let content = fs.readFileSync(globalIndexPath, 'utf8');
      const indentedConcept = concept ? concept.trim().replace(/\n/g, '\n        ') : '';
      const topicSummaryBlock = indentedConcept
        ? `topic_summary: >\n        ${indentedConcept}`
        : 'topic_summary: ""';
      const newEntry = `    - project_slug: ${cleanSlug}
      project_name: ${cleanSlug}
      updated_at: ${nowStr}
      lifecycle_flag: active
      project_status: draft
      next_stage: scene-topic-gate
      current_stage: scene-topic-gate
      ${topicSummaryBlock}
      style_summary: ${resolvedStyleId}
      aliases:
        - ${cleanSlug}
      tags:
        - active
        - scene-topic-gate
      project_index_path: ${projectIndexPath}
      project_board_path: ${projectBoardPath}
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

app.get('/api/config/projects-root', (_req, res) => {
  res.json(getProjectsRootPayload());
});

app.post('/api/config/projects-root', (req, res) => {
  const projectsRootInput = typeof req.body?.projectsRoot === 'string' ? req.body.projectsRoot : '';
  try {
    const nextProjectsRoot = setProjectsRoot(projectsRootInput);
    fs.mkdirSync(nextProjectsRoot, { recursive: true });
    res.json({
      success: true,
      ...getProjectsRootPayload(),
      activeCleared: true,
    });
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

interface SessionScope {
  scope: 'project' | 'workspace';
  label: string;
  projectPath: string;
}

interface SessionPreview {
  id: string;
  sessionId: string;
  preview: string;
  timestamp: string;
  messageCount: number;
  scope: SessionScope['scope'];
  scopeLabel: string;
}

interface ProjectSessionOwnership {
  label: string;
  stage: string;
}

function encodeScopedSessionId(scope: SessionScope['scope'], sessionId: string): string {
  return `${scope}:${sessionId}`;
}

function decodeScopedSessionId(value: string): { scope: SessionScope['scope']; sessionId: string } {
  const separatorIndex = value.indexOf(':');
  if (separatorIndex === -1) {
    return { scope: 'project', sessionId: value };
  }
  const scope = value.slice(0, separatorIndex);
  const sessionId = value.slice(separatorIndex + 1);
  return {
    scope: scope === 'workspace' ? 'workspace' : 'project',
    sessionId,
  };
}

function getSessionScopes(): SessionScope[] {
  const scopes: SessionScope[] = [];
  if (activeProjectPath) {
    scopes.push({
      scope: 'project',
      label: path.basename(activeProjectPath),
      projectPath: activeProjectPath,
    });
  }
  scopes.push({
    scope: 'workspace',
    label: 'Workspace Root',
    projectPath: workspaceRoot,
  });
  return scopes;
}

function getSessionProjectPathForScope(scope: SessionScope['scope']): string {
  if (scope === 'project' && activeProjectPath) {
    return activeProjectPath;
  }
  return workspaceRoot;
}

function getProjectSessionOwnership(projectPath: string | null): Map<string, ProjectSessionOwnership> {
  const ownership = new Map<string, ProjectSessionOwnership>();
  if (!projectPath || projectPath === workspaceRoot) return ownership;

  const projectName = path.basename(projectPath);
  const metadata = readStageSessionMetadata(projectPath);
  for (const [stage, value] of Object.entries(metadata.sessions)) {
    if (!value?.sessionId) continue;
    ownership.set(value.sessionId, {
      label: stage === 'workspace' ? projectName : `${projectName} / ${stage}`,
      stage,
    });
  }
  return ownership;
}

function applyProjectOwnership(preview: SessionPreview, ownership: Map<string, ProjectSessionOwnership>): SessionPreview {
  const owner = ownership.get(preview.sessionId);
  if (!owner) return preview;
  return {
    ...preview,
    id: encodeScopedSessionId('project', preview.sessionId),
    scope: 'project',
    scopeLabel: owner.label,
  };
}

function dedupeSessionPreviews(previews: SessionPreview[]): SessionPreview[] {
  const bySessionId = new Map<string, SessionPreview>();
  for (const preview of previews) {
    const existing = bySessionId.get(preview.sessionId);
    if (!existing || (existing.scope === 'workspace' && preview.scope === 'project')) {
      bySessionId.set(preview.sessionId, preview);
    }
  }
  return [...bySessionId.values()];
}

function getSessionJsonlPath(sessionId: string, preferredProjectPath: string = workspaceRoot): string | null {
  const candidateProjectPaths = Array.from(new Set([preferredProjectPath, workspaceRoot]));
  for (const projectPath of candidateProjectPaths) {
    const jsonlPath = path.join(getClaudeSessionDir(projectPath), `${sessionId}.jsonl`);
    if (fs.existsSync(jsonlPath)) {
      return jsonlPath;
    }
  }
  return null;
}

function parseSessionPreview(jsonlPath: string, scopeInfo: SessionScope): SessionPreview | null {
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
    const sessionId = path.basename(jsonlPath, '.jsonl');
    return {
      id: encodeScopedSessionId(scopeInfo.scope, sessionId),
      sessionId,
      preview: firstUserMessage.length > 100 ? firstUserMessage.slice(0, 100) + '…' : firstUserMessage,
      timestamp,
      messageCount,
      scope: scopeInfo.scope,
      scopeLabel: scopeInfo.label,
    };
  } catch {
    return null;
  }
}

app.get('/api/sessions', (req, res) => {
  try {
    const ownership = getProjectSessionOwnership(activeProjectPath);
    const sessions = dedupeSessionPreviews(getSessionScopes()
      .flatMap((scopeInfo) => {
        const sessionDir = getClaudeSessionDir(scopeInfo.projectPath);
        if (!fs.existsSync(sessionDir)) return [];
        return fs.readdirSync(sessionDir)
          .filter(f => f.endsWith('.jsonl'))
          .map(f => parseSessionPreview(path.join(sessionDir, f), scopeInfo))
          .filter(Boolean)
          .map((preview) => applyProjectOwnership(preview as SessionPreview, ownership));
      }))
      .filter((preview) => !activeProjectPath || ownership.has(preview.sessionId))
      .sort((a, b) => (b?.timestamp || '').localeCompare(a?.timestamp || ''));

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get('/api/sessions/:id', (req, res) => {
  const decoded = decodeScopedSessionId(req.params.id);
  const projectPath = getSessionProjectPathForScope(decoded.scope);
  try {
    const jsonlPath = getSessionJsonlPath(decoded.sessionId, projectPath);
    if (!jsonlPath) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const bubbles = getSessionBubbles(decoded.sessionId, projectPath);
    res.json({ id: req.params.id, sessionId: decoded.sessionId, scope: decoded.scope, bubbles });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});


// Build minimal routing context for Claude's first message
function buildProjectContext(projectPath: string, contextMode: ClaudeContextMode = 'resume_full'): string {
  const slug = path.basename(projectPath);
  const isStageLight = contextMode === 'stage_light';
  const currentCliStage = projectPath !== workspaceRoot ? getCurrentSopStage(projectPath) : 'workspace';
  const currentSceneStage = denormalizeCliStageToSceneStage(currentCliStage) ?? currentCliStage;
  const stageIdentityNote = projectPath !== workspaceRoot
    ? `【当前阶段标识】
- CLI stage id：${currentCliStage}
- Skill/protocol stage：${currentSceneStage}
- 状态机、rules/status/start/validate/complete、PROJECT_STATE.json 和 artifacts.manifest.yaml 的 stage 字段必须使用 CLI stage id。
- scene-* 名称只用于读取 .agents/skills/<scene-skill>/SKILL.md 和协议文档，不得用于 PROJECT_STATE、CLI --stage 或 .rules/stages 文件名。
- 阶段规则优先用 CLI：\`cd "${projectPath}" && node ../../packages/engine/dist/cli.js rules --stage ${currentCliStage}\`；不要直接 Read .rules/stages/<stage>.yaml，项目没有自定义规则文件是正常情况。
${currentCliStage === 'topic_gate' ? '- topic_gate 的正式阶段产物必须写入 outputs/topic.md，并包含 ## topic_ideas；inputs/ 只适合作为用户需求或源输入，不是 validator 认可的 final artifact。' : ''}`
    : '';
  const lightContextNote = contextMode === 'stage_light'
    ? `【上下文模式】轻量阶段 / 快速首轮：
- 本次不携带历史 tool/thought/raw assistant。
- 默认目标是快速推进当前 SOP 阶段，而不是做仓库级诊断。
- 第一轮优先读取当前项目 PROJECT_STATE.json、PROJECT_BOARD.md、PROJECT_INDEX.md、当前阶段 rules/status；当前创作项目目录内文件和目录均可按需访问。
- 禁止全仓搜索/git status/测试扫描/读取 validator 或无关 skill；Glob/Grep/LS 只能限定在当前创作项目目录内。
- 禁止初始化 TaskCreate/任务系统；如需计划，用 3 条以内中文短计划直接回复。
- 必须用中文回复。先给阶段判断和下一步预览；需要用户确认时停在预览，不要长时间自我探索。`
    : '';
  if (projectPath !== workspaceRoot) {
    if (isStageLight) {
      return `${lightContextNote}
【当前项目目录】
Claude 进程可以从仓库根目录启动，但当前创作项目目录必须以 SCENE_FORGE_PROJECT_PATH / 下方路径为准。
当前项目目录：${projectPath}
项目名：${slug}

${stageIdentityNote}

【轻量阶段硬边界】
1. 当前创作项目目录是你的运行沙盒：
   - ${projectPath}/ 下所有目录和文件都可按需读取、列目录、项目内搜索和写入阶段产物
   - 优先读取 PROJECT_STATE.json、PROJECT_BOARD.md、PROJECT_INDEX.md、artifacts.manifest.yaml 和当前阶段相关文件
   - 可以检查 inputs/、details/、outputs/、handoffs/、.rules/ 等项目内目录是否存在
   - 如果 PROJECT_STATE.json 显示当前阶段是 ready 或 in_progress，都不要再询问“是否进入阶段”；当前用户消息就是处理该阶段的授权，直接给当前阶段的预览、必要确认项或下一步执行
2. 禁止默认读取或扫描：
   - 当前项目目录之外的任何路径
   - .handoff/、.scratch/、docs/、packages/、runtime/
   - 其他 projects/* 兄弟项目
   - git status / git diff / 测试文件 / validator 源码
3. 允许精准读取的协议与资产库文件：
   - .agents/skills/scene-*/SKILL.md
   - .agents/skills/scene-*/references/*.md
   - style_profiles/style_registry.md
   - 已在项目配置或 profile.md 中指向的 style_profiles/<style_id>/*.md
   - assets/**/*.md 中与当前阶段直接相关、或已写入 allowed_runtime_asset_paths / source_asset_ref / asset_ref 的具体文件
   - ${projectPath}/PROJECT_INDEX.md
   - 根目录 AGENTS.md 仅限用户要求改代码或排查权限/规范问题时读取
   禁止扫描全部 .agents/skills、style_profiles 或 assets；项目内搜索只允许限定在 ${projectPath}/ 下。
4. CLI 命令必须显式切到当前项目目录，例如：
   - cd "${projectPath}" && node ../../packages/engine/dist/cli.js status
   - cd "${projectPath}" && node ../../packages/engine/dist/cli.js rules --stage <stage>
5. 如果你需要确认目录，最多运行一次 pwd；可以 ls 当前项目内目录；不要 ls 父目录，不要 find/glob 全仓。
6. 当前模式下不要读取 AGENTS.md，除非用户明确要求改代码或排查工具权限问题；任何时候都不要读取 CLAUDE.md。

【输出要求】
先用中文给出当前阶段判断、最少必要依据和下一步预览。需要确认时停在预览，不要长时间自我探索。`;
    }

    return `${lightContextNote}
【重要提示】当前正在操作的项目是：${slug}。
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
3. ${isStageLight ? '轻量阶段默认不要读取 AGENTS.md；只有用户要求改代码或遇到明确权限/规范问题时再读；任何时候都不要读取 CLAUDE.md。' : "随时阅读根目录下的 './AGENTS.md' 了解开发规范，而不是 './CLAUDE.md'。"}`;
  }
  return `${lightContextNote}
【当前状态】工作区处于根目录，暂无激活的具体创作项目。
如需开始工作，请先在 Web Console 激活或创建一个具体项目。${isStageLight ? '轻量阶段默认不要做仓库扫描。' : "请阅读根目录下的 './AGENTS.md' 了解开发规范，而不是 './CLAUDE.md'。"}`;
}

const SOP_STAGE_ORDER = [
  'source_intake',
  'topic_gate',
  'reference',
  'story',
  'assets',
  'design',
  'script',
  'performance',
  'storyboard',
  'audio',
  'video_prompts',
  'publish_review',
];

interface StageSessionMetadata {
  version: 1;
  activeStage?: string;
  updatedAt: string;
  sessions: Record<string, { sessionId: string; updatedAt: string }>;
}

function getNextSopStage(projectPath: string, completedStage: string): string {
  return resolveNextSopStage(projectPath, completedStage, SOP_STAGE_ORDER);
}

function isStageCompletedForRotation(projectPath: string, completedStage: string): boolean {
  const state = readProjectState(projectPath);
  if (state?.stages?.[completedStage]?.status === 'completed') {
    return true;
  }
  const boardLastCompleted = normalizeSceneStageToCliStage(readProjectBoardState(projectPath)?.routing?.last_completed_stage);
  return boardLastCompleted === completedStage;
}

function getStageSessionMetadataPath(projectPath: string): string {
  return path.join(projectPath, '.scene_forge_session_meta.json');
}

function readStageSessionMetadata(projectPath: string): StageSessionMetadata {
  const metadataPath = getStageSessionMetadataPath(projectPath);
  if (fs.existsSync(metadataPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      return {
        version: 1,
        activeStage: typeof parsed.activeStage === 'string' ? parsed.activeStage : undefined,
        updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
        sessions: parsed.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
      };
    } catch {
      // Regenerate malformed metadata below.
    }
  }
  return { version: 1, updatedAt: new Date().toISOString(), sessions: {} };
}

function writeStageSessionMetadata(projectPath: string, metadata: StageSessionMetadata) {
  const metadataPath = getStageSessionMetadataPath(projectPath);
  const next = { ...metadata, updatedAt: new Date().toISOString() };
  fs.writeFileSync(metadataPath, JSON.stringify(next, null, 2), 'utf8');
}

function setStageSession(projectPath: string, stage: string, sessionId: string): StageSessionMetadata {
  const metadata = readStageSessionMetadata(projectPath);
  metadata.activeStage = stage;
  metadata.sessions[stage] = { sessionId, updatedAt: new Date().toISOString() };
  writeStageSessionMetadata(projectPath, metadata);
  return metadata;
}

function createStageSession(projectPath: string, stage: string): string {
  const nextSessionId = randomUUID();
  setStageSession(projectPath, stage, nextSessionId);
  return nextSessionId;
}

function getStageSession(projectPath: string, stage: string): string {
  const metadata = readStageSessionMetadata(projectPath);
  const existing = metadata.sessions[stage]?.sessionId;
  if (existing) {
    if (metadata.activeStage !== stage) {
      metadata.activeStage = stage;
      writeStageSessionMetadata(projectPath, metadata);
    }
    return existing;
  }
  return createStageSession(projectPath, stage);
}

// Helper to parse Claude's raw session JSONL log into ChatBubbles
function getSessionBubbles(sessionId: string, projectPath: string = workspaceRoot): any[] {
  const jsonlPath = getSessionJsonlPath(sessionId, projectPath);
  if (!jsonlPath) return [];
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
  let contextMode: ClaudeContextMode = 'stage_light';
  let activePromptSignature = '';
  let activePromptId = '';
  let activePromptMode: 'stdin' | 'ide_guidance' | '' = '';
  let lastPromptText = '';
  let pendingCompleteStage: string | null = null;

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
  if (contextMode === 'stage_light' && targetPath !== workspaceRoot) {
    const stage = getCurrentSopStage(targetPath);
    sessionId = getStageSession(targetPath, stage);
    const jsonlPath = getSessionJsonlPath(sessionId, targetPath);
    isFirstMessage = !(jsonlPath && fs.statSync(jsonlPath).size > 0);
    try {
      fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
      console.log(`[StageSession] Restored ${stage}: ${sessionId} (first: ${isFirstMessage})`);
    } catch (err) {
      console.warn(`Failed to persist stage session ID: ${(err as Error).message}`);
    }
  } else if (fs.existsSync(activeSessionFile)) {
    const storedId = fs.readFileSync(activeSessionFile, 'utf8').trim();
    if (storedId && storedId.length > 10) {
      sessionId = storedId;
      const jsonlPath = getSessionJsonlPath(sessionId, targetPath);
      if (jsonlPath && fs.statSync(jsonlPath).size > 0) {
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
  const initialBubbles = getSessionBubbles(sessionId, targetPath);
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

    lastPromptText = prompt;
    if (contextMode === 'stage_light') {
      const stage = getCurrentSopStage(targetPath);
      sessionId = getStageSession(targetPath, stage);
      const jsonlPath = getSessionJsonlPath(sessionId, targetPath);
      isFirstMessage = !(jsonlPath && fs.statSync(jsonlPath).size > 0);
      try {
        fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
      } catch (err) {
        console.warn(`Failed to persist stage_light session ID: ${(err as Error).message}`);
      }
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'session_init', sessionId }));
        ws.send(JSON.stringify({
          type: 'stage_session',
          mode: contextMode,
          stage,
          sessionId,
          autoStarted: false,
        }));
      }
    }
    const ctx = (contextMode === 'stage_light' || isFirstMessage)
      ? buildProjectContext(targetPath, contextMode)
      : undefined;
    const claudeArgs = buildClaudeArgs({
      prompt,
      sessionId,
      isFirstMessage,
      contextMode,
      projectContext: ctx,
      bypassPermissions,
    });
    const args = claudeArgs.args;
    isFirstMessage = claudeArgs.nextIsFirstMessage;

    const claudeCwd = workspaceRoot;
    console.log(`[runClaude] cwd: ${claudeCwd}`);
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
      cwd: claudeCwd,
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
          if (contextMode === 'stage_light' && targetPath !== workspaceRoot) {
            const guardResult = validateStageLightToolUse(tool.name, tool.input, targetPath, msg?.type);
            if (guardResult.blocked) {
              console.warn(`[StageLightGuard] ${guardResult.reason}`);
              try { proc.kill('SIGINT'); } catch (_) {}
              currentProcess = null;
              dismissActivePrompt();
              const freshStage = getCurrentSopStage(targetPath);
              sessionId = createStageSession(targetPath, freshStage);
              isFirstMessage = true;
              try {
                fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
              } catch (err) {
                console.warn(`Failed to persist guard-reset session ID: ${(err as Error).message}`);
              }
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'session_init', sessionId }));
                ws.send(JSON.stringify({
                  type: 'stage_session',
                  mode: contextMode,
                  stage: freshStage,
                  sessionId,
                  resetReason: 'stage_light_guard_blocked',
                }));
              }
              generatedBubbles.push({
                id: `run-${runId}-guard-${Date.now()}`,
                type: 'system',
                content: `已中断越界工具调用：${guardResult.reason}\n\n请读取当前项目契约文件、当前阶段直接相关产物，或精准读取 SceneForge 协议白名单文件；不要扫描仓库、历史项目、docs、.handoff、.scratch 或 packages 源码。`,
                timestamp: new Date().toISOString()
              });
              break;
            }
          }
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
        } else if (chunk.type === 'usage') {
          const usage = chunk.usage;
          generatedBubbles.push({
            id: `run-${runId}-usage-${Date.now()}`,
            type: 'usage',
            content: 'usage',
            timestamp: new Date().toISOString(),
            usage: {
              ...usage,
              contextMode,
              sessionId,
            }
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
      if (contextMode === 'stage_light' && pendingCompleteStage) {
        const completedStage = pendingCompleteStage;
        pendingCompleteStage = null;
        if (isStageCompletedForRotation(targetPath, completedStage)) {
          const nextStage = getNextSopStage(targetPath, completedStage);
          sessionId = getStageSession(targetPath, nextStage);
          isFirstMessage = true;
          try {
            fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
          } catch (err) {
            console.warn(`Failed to persist next stage session ID: ${(err as Error).message}`);
          }
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'session_init', sessionId }));
            ws.send(JSON.stringify({
              type: 'stage_session',
              mode: contextMode,
              stage: nextStage,
              sessionId,
              rotatedFromStage: completedStage,
            }));
          }
          console.log(`[StageSession] completed ${completedStage}; next stage ${nextStage}; session ${sessionId}`);
        }
      }
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
        case 'set_context_mode':
          if (payload.mode === 'stage_light' || payload.mode === 'resume_full') {
            contextMode = payload.mode;
            if (contextMode === 'stage_light') {
              const stage = getCurrentSopStage(targetPath);
              sessionId = getStageSession(targetPath, stage);
              const jsonlPath = getSessionJsonlPath(sessionId, targetPath);
              isFirstMessage = !(jsonlPath && fs.statSync(jsonlPath).size > 0);
            }
            console.log(`[ClaudeContext] mode set to ${contextMode}`);
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'context_mode', mode: contextMode }));
              ws.send(JSON.stringify({
                type: 'stage_session',
                mode: contextMode,
                stage: getCurrentSopStage(targetPath),
                sessionId,
              }));
            }
          }
          break;

        case 'load_session':
          if (payload.sessionId) {
            const decoded = decodeScopedSessionId(payload.sessionId);
            sessionId = decoded.sessionId;
            isFirstMessage = false;
            try {
              fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
              console.log(`[Session] Synced active session ID to: ${sessionId} (${decoded.scope})`);
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
          if (contextMode === 'stage_light' && targetPath !== workspaceRoot) {
            sessionId = createStageSession(targetPath, getCurrentSopStage(targetPath));
          } else {
            sessionId = randomUUID();
          }
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

        case 'reload_claude_config':
          if (currentProcess) { try { currentProcess.kill('SIGINT'); } catch (_) {} }
          currentProcess = null;
          dismissActivePrompt();
          if (contextMode === 'stage_light' && targetPath !== workspaceRoot) {
            sessionId = createStageSession(targetPath, getCurrentSopStage(targetPath));
          } else {
            sessionId = randomUUID();
          }
          isFirstMessage = true;
          try {
            fs.writeFileSync(activeSessionFile, sessionId, 'utf8');
            console.log(`[Session] Reloaded Claude config with new session ID: ${sessionId}`);
          } catch (err) {
            console.warn(`Failed to write reloaded .active_session_id: ${(err as Error).message}`);
          }
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'run_status', running: false }));
            ws.send(JSON.stringify({ type: 'session_init', sessionId }));
            ws.send(JSON.stringify({
              type: 'output',
              bubbles: [{
                id: `reload-${Date.now()}`,
                type: 'system',
                content: 'Claude 配置已重载：已停止当前进程并创建新会话。下一次发送消息会重新启动 Claude CLI 并读取 cc switch 写入的配置；如果切换依赖环境变量，请重启 Web Console 服务。',
                timestamp: new Date().toISOString()
              }]
            }));
          }
          break;

        case 'macro': {
          const { action } = payload;
          const stage = normalizeSceneStageToCliStage(typeof payload.stage === 'string' ? payload.stage : '');
          if (action && stage) {
            const slug = activeProjectPath ? path.basename(activeProjectPath) : '<project-slug>';
            const cliPrefix = `cd projects/${slug} && node ../../packages/engine/dist/cli.js`;
            const prompts: Record<string, string> = {
              start: `请开始执行 ${stage} 阶段 learnings 对应的管线制作工作。先检查上游依赖是否完成。所有 CLI 命令必须使用当前项目目录执行，例如：\`${cliPrefix} start --stage ${stage}\`。`,
              validate: `请对 ${stage} 阶段的产物执行格式校验（Lint/Validator），并输出校验结果。必须使用当前项目目录执行：\`${cliPrefix} validate --stage ${stage}\`；查看规则使用：\`${cliPrefix} rules --stage ${stage}\`。`,
              complete: `请确认 ${stage} 阶段的工作已完成，执行 Complete 流程：生成 Handoff 文件，更新 PROJECT_STATE.json 状态。必须使用当前项目目录执行：\`${cliPrefix} complete --stage ${stage}\`。`
            };
            if (prompts[action]) {
              if (action === 'complete') {
                pendingCompleteStage = stage;
              }
              await runClaude(prompts[action]);
            }
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
