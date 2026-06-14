import fs from 'fs';
import path from 'path';
import { Project, parseMarkdownFrontmatter } from '@scene-forge/engine';

export interface DiscoveredArtifact {
  id: string;
  stage: string;
  kind: 'preview' | 'draft' | 'review' | 'final';
  role: string;
  path: string;
  readable_by_downstream?: boolean;
  pack_id?: string;
  language?: string;
  schema?: string;
  created_by_run?: string;
}

const STAGE_ALIASES: Record<string, string[]> = {
  topic: ['topic', 'topic_gate'],
  topic_gate: ['topic_gate', 'topic'],
  publish: ['publish', 'publish_review'],
  publish_review: ['publish_review', 'publish'],
};

function getStageAliases(stage: string): string[] {
  return STAGE_ALIASES[stage] ?? [stage];
}

function normalizePath(value: string): string {
  return value.split(path.sep).join('/');
}

function addArtifact(
  list: DiscoveredArtifact[],
  artifact: DiscoveredArtifact,
) {
  if (!artifact.path || list.some((item) => item.path === artifact.path)) {
    return;
  }
  list.push(artifact);
}

function readBoardStageIndex(projectPath: string, stage: string): any | undefined {
  const boardPath = path.join(projectPath, 'PROJECT_BOARD.md');
  if (!fs.existsSync(boardPath)) {
    return undefined;
  }

  const boardContent = fs.readFileSync(boardPath, 'utf8');
  const parsed = parseMarkdownFrontmatter(boardContent);
  const stageIndex = parsed.frontmatter?.stage_index ?? {};

  for (const alias of getStageAliases(stage)) {
    if (stageIndex[alias]) {
      return stageIndex[alias];
    }
  }

  return undefined;
}

function addBoardArtifacts(
  list: DiscoveredArtifact[],
  projectPath: string,
  stage: string,
) {
  const stageIndex = readBoardStageIndex(projectPath, stage);
  if (!stageIndex?.files) {
    return;
  }

  const files = stageIndex.files;
  const version = stageIndex.active_version || 'v1';
  const addPath = (
    filePath: unknown,
    idSuffix: string,
    kind: DiscoveredArtifact['kind'],
    role: string,
  ) => {
    if (typeof filePath !== 'string' || !filePath) {
      return;
    }
    addArtifact(list, {
      id: `${stage}_${idSuffix}_${version}`,
      stage,
      kind,
      role,
      path: filePath,
      readable_by_downstream: kind === 'final',
    });
  };

  addPath(files.primary, 'primary', 'final', 'primary_delivery');
  addPath(files.index, 'index', 'final', 'index');
  addPath(files.handoff, 'handoff', 'review', 'handoff');
  addPath(files.quality_check, 'qc', 'review', 'quality_check');

  if (Array.isArray(files.outputs)) {
    files.outputs.forEach((file: unknown, idx: number) => {
      addPath(file, `output_${idx}`, 'final', 'output');
    });
  }

  if (Array.isArray(files.details)) {
    files.details.forEach((file: unknown, idx: number) => {
      addPath(file, `detail_${idx}`, 'draft', 'detail');
    });
  }
}

function walkFiles(root: string): string[] {
  if (!fs.existsSync(root)) {
    return [];
  }

  const result: string[] = [];
  const entries = fs.readdirSync(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath));
      continue;
    }
    if (entry.isFile()) {
      result.push(fullPath);
    }
  }
  return result;
}

function isStageDiskPath(relativePath: string, aliases: string[]): boolean {
  const normalized = normalizePath(relativePath);
  const base = path.basename(normalized);

  return aliases.some((alias) => (
    normalized.startsWith(`outputs/${alias}/`) ||
    normalized.startsWith(`details/${alias}/`) ||
    normalized === `handoffs/${alias}.handoff.json` ||
    base.startsWith(`${alias}.`) ||
    base.startsWith(`${alias}_`) ||
    base.startsWith(`${alias}-`)
  ));
}

function inferDiskArtifact(
  relativePath: string,
  stage: string,
  index: number,
): DiscoveredArtifact {
  const normalized = normalizePath(relativePath);
  const inDetails = normalized.startsWith('details/');
  const inHandoffs = normalized.startsWith('handoffs/');

  return {
    id: `${stage}_disk_${index}`,
    stage,
    kind: inHandoffs ? 'review' : inDetails ? 'draft' : 'final',
    role: inHandoffs ? 'handoff' : inDetails ? 'detail' : 'output',
    path: normalized,
    readable_by_downstream: !inDetails,
  };
}

function addDiskArtifacts(
  list: DiscoveredArtifact[],
  projectPath: string,
  stage: string,
) {
  const aliases = getStageAliases(stage);
  const scanRoots = ['outputs', 'details', 'handoffs']
    .map((dir) => path.join(projectPath, dir));

  let idx = 0;
  for (const fullPath of scanRoots.flatMap(walkFiles)) {
    const relativePath = normalizePath(path.relative(projectPath, fullPath));
    if (!isStageDiskPath(relativePath, aliases)) {
      continue;
    }

    addArtifact(list, inferDiskArtifact(relativePath, stage, idx));
    idx += 1;
  }
}

export function getArtifactsForStage(
  projectPath: string,
  stage: string,
): DiscoveredArtifact[] {
  const project = new Project(projectPath);
  const list: DiscoveredArtifact[] = [];
  const aliases = getStageAliases(stage);

  try {
    const manifest = project.readManifest();
    manifest.artifacts
      .filter((artifact) => aliases.includes(artifact.stage))
      .forEach((artifact) => {
        addArtifact(list, {
          ...artifact,
          stage,
          kind: artifact.kind,
        });
      });
  } catch {
    // A missing or temporarily invalid manifest should not block UI fallback.
  }

  try {
    addBoardArtifacts(list, projectPath, stage);
  } catch (err) {
    console.error('Failed to parse PROJECT_BOARD.md in artifact discovery:', err);
  }

  addDiskArtifacts(list, projectPath, stage);

  return list;
}
