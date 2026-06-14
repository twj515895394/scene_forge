import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Artifact, parseMarkdownFrontmatter, Project } from './project.js';

const STAGE_ALIASES: Record<string, string[]> = {
  topic_gate: ['topic_gate', 'topic'],
  topic: ['topic', 'topic_gate'],
  publish_review: ['publish_review', 'publish'],
  publish: ['publish', 'publish_review'],
};

const STAGE_EXTRA_PREFIXES: Record<string, string[]> = {
  design: [
    'outputs/design_prompts/',
  ],
  storyboard: [
    'outputs/storyboard_prompts/',
  ],
};

function getStageAliases(stage: string): string[] {
  return STAGE_ALIASES[stage] ?? [stage];
}

function normalizePath(value: string): string {
  return value.split(path.sep).join('/');
}

function walkFiles(root: string): string[] {
  if (!fs.existsSync(root)) {
    return [];
  }

  const result: string[] = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath));
    } else if (entry.isFile()) {
      result.push(fullPath);
    }
  }
  return result;
}

function isStagePath(stage: string, relativePath: string, aliases: string[]): boolean {
  const normalized = normalizePath(relativePath);
  const base = path.basename(normalized);
  const extraPrefixes = STAGE_EXTRA_PREFIXES[stage] ?? [];

  return extraPrefixes.some((prefix) => normalized.startsWith(prefix)) || aliases.some((alias) => (
    normalized.startsWith(`outputs/${alias}/`) ||
    normalized.startsWith(`details/${alias}/`) ||
    normalized === `handoffs/${alias}.handoff.json` ||
    base.startsWith(`${alias}.`) ||
    base.startsWith(`${alias}_`) ||
    base.startsWith(`${alias}-`)
  ));
}

function makeArtifactId(stage: string, relativePath: string): string {
  const normalized = normalizePath(relativePath);
  const safePath = normalized
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  if (!/[^\x00-\x7F]/.test(normalized)) {
    return `${stage}-${safePath}`;
  }

  let hash = 0;
  for (const char of normalized) {
    hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0;
  }
  return `${stage}-${safePath || 'artifact'}-${hash.toString(36)}`;
}

function inferArtifact(stage: string, relativePath: string): Artifact {
  const normalized = normalizePath(relativePath);
  const inDetails = normalized.startsWith('details/');
  const inHandoffs = normalized.startsWith('handoffs/');

  return {
    id: makeArtifactId(stage, normalized),
    stage,
    kind: inHandoffs ? 'review' : inDetails ? 'draft' : 'final',
    role: inHandoffs ? 'handoff' : inDetails ? 'detail' : 'output',
    path: normalized,
    readable_by_downstream: !inDetails,
  };
}

function getExpectedFinalPathPattern(stage: string): RegExp | undefined {
  const patterns: Record<string, RegExp> = {
    topic_gate: /^outputs\/topic\.md$/,
    reference: /^outputs\/reference\.md$/,
    story: /^outputs\/story\.md$/,
    assets: /^outputs\/assets\.md$/,
    design: /^outputs\/design\.md$/,
    script: /^outputs\/script\.md$/,
    performance: /^outputs\/performance_pack_\d+(_\w+)?\.md$/,
    audio: /^outputs\/audio_pack_\d+(_\w+)?\.md$/,
    storyboard: /^outputs\/storyboard_pack_\d+(_\w+)?\.md$/,
    video_prompts: /^(outputs\/video_prompts_pack_\d+(_\w+)?\.md|outputs\/video_prompts\/视频提示词_第\d+包_(中文|英文)_v[^/]+\.md)$/,
    publish_review: /^outputs\/publish_review\.md$/,
  };
  return patterns[stage];
}

function getQualityCheckPathPattern(stage: string): RegExp | undefined {
  const patterns: Record<string, RegExp> = {
    storyboard: /^details\/storyboard\/storyboard_quality_check_v[^/]+\.md$/i,
    video_prompts: /^details\/video_prompts\/video_prompt_review_v[^/]+\.md$/i,
  };
  return patterns[stage];
}

function normalizeArtifactForManifest(artifact: Artifact): Artifact {
  if (artifact.kind !== 'final') {
    return artifact;
  }
  const pattern = getExpectedFinalPathPattern(artifact.stage);
  if (!pattern || pattern.test(artifact.path)) {
    return artifact;
  }
  return {
    ...artifact,
    kind: 'draft',
    role: 'output',
  };
}

export function discoverStageArtifacts(project: Project, stage: string): Artifact[] {
  const aliases = getStageAliases(stage);
  const scanRoots = ['outputs', 'details', 'handoffs']
    .map((dir) => path.join(project.projectPath, dir));

  const artifacts = scanRoots
    .flatMap(walkFiles)
    .map((fullPath) => normalizePath(path.relative(project.projectPath, fullPath)))
    .filter((relativePath) => isStagePath(stage, relativePath, aliases))
    .sort()
    .map((relativePath) => inferArtifact(stage, relativePath));

  const seen = new Set<string>();
  return artifacts.filter((artifact) => {
    if (seen.has(artifact.path)) {
      return false;
    }
    seen.add(artifact.path);
    return true;
  });
}

function syncManifest(project: Project, artifacts: Artifact[]) {
  const manifest = project.readManifest();
  for (const artifact of artifacts) {
    const existing = manifest.artifacts.find((item) => item.path === artifact.path);
    if (existing) {
      Object.assign(existing, {
        stage: artifact.stage,
        kind: existing.kind ?? artifact.kind,
        role: existing.role ?? artifact.role,
        readable_by_downstream: existing.readable_by_downstream ?? artifact.readable_by_downstream,
      });
      continue;
    }
    manifest.artifacts = manifest.artifacts.filter((item) => item.id !== artifact.id);
    manifest.artifacts.push(artifact);
  }
  project.writeManifest(manifest);
}

function chooseBoardStageKey(boardState: Record<string, any>, stage: string): string {
  const stageIndex = boardState.stage_index ?? {};
  for (const alias of getStageAliases(stage)) {
    if (stageIndex[alias]) {
      return alias;
    }
  }
  return stage;
}

function syncBoard(project: Project, stage: string, artifacts: Artifact[]) {
  const boardPath = path.join(project.projectPath, 'PROJECT_BOARD.md');
  if (!fs.existsSync(boardPath)) {
    return;
  }

  const boardContent = fs.readFileSync(boardPath, 'utf8');
  const parsed = parseMarkdownFrontmatter(boardContent);
  const boardState = parsed.frontmatter;
  if (!boardState || typeof boardState !== 'object') {
    return;
  }

  boardState.stage_index = boardState.stage_index ?? {};
  const boardStageKey = chooseBoardStageKey(boardState, stage);
  const existingStageIndex = boardState.stage_index[boardStageKey] ?? {};
  const finalArtifacts = artifacts.filter((artifact) => artifact.kind === 'final');
  const outputArtifacts = artifacts.filter((artifact) => artifact.role === 'output');
  const detailArtifacts = artifacts.filter((artifact) => artifact.role === 'detail');
  const handoff = artifacts.find((artifact) => artifact.role === 'handoff');
  const primary = finalArtifacts[0]?.path ?? existingStageIndex.files?.primary ?? '';
  const qualityCheckPattern = getQualityCheckPathPattern(stage);
  const existingQualityCheck = existingStageIndex.files?.quality_check ?? '';
  const qualityCheck = qualityCheckPattern
    ? detailArtifacts.find((artifact) => qualityCheckPattern.test(artifact.path))?.path
      ?? existingQualityCheck
    : existingQualityCheck;

  boardState.stage_index[boardStageKey] = {
    ...existingStageIndex,
    status: 'completed',
    active_version: existingStageIndex.active_version || 'v1',
    updated_at: new Date().toISOString(),
    files: {
      ...(existingStageIndex.files ?? {}),
      primary,
      outputs: outputArtifacts.map((artifact) => artifact.path),
      details: detailArtifacts.map((artifact) => artifact.path),
      handoff: handoff?.path ?? existingStageIndex.files?.handoff ?? '',
      quality_check: qualityCheck,
    },
  };

  fs.writeFileSync(boardPath, yaml.dump(boardState, { lineWidth: 120 }), 'utf8');
}

export function syncStageArtifactIndex(project: Project, stage: string): Artifact[] {
  const artifacts = discoverStageArtifacts(project, stage);
  const syncableArtifacts = artifacts.map(normalizeArtifactForManifest);
  if (syncableArtifacts.length === 0) {
    return [];
  }

  syncManifest(project, syncableArtifacts);
  syncBoard(project, stage, syncableArtifacts);
  return syncableArtifacts;
}
