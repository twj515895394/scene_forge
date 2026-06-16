import fs from 'fs';
import path from 'path';
import { parseMarkdownFrontmatter } from '@scene-forge/engine';

export function readProjectBoardState(projectPath: string): any | null {
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

export function normalizeSceneStageToCliStage(stage: string | undefined | null): string | undefined {
  if (!stage) return undefined;
  const mapping: Record<string, string> = {
    'scene-topic-gate': 'topic_gate',
    'scene-reference-decider': 'reference',
    'scene-story-development': 'story',
    'scene-asset-checker': 'assets',
    'scene-design-builder': 'design',
    'scene-script-adapter': 'script',
    'scene-performance-director': 'performance',
    'scene-storyboard-director': 'storyboard',
    'scene-audio-director': 'audio',
    'scene-video-prompt-builder': 'video_prompts',
    'scene-publish-review': 'publish_review',
  };
  return mapping[stage] ?? stage;
}

export function denormalizeCliStageToSceneStage(stage: string | undefined | null): string | undefined {
  if (!stage) return undefined;
  const mapping: Record<string, string> = {
    topic_gate: 'scene-topic-gate',
    reference: 'scene-reference-decider',
    story: 'scene-story-development',
    assets: 'scene-asset-checker',
    design: 'scene-design-builder',
    script: 'scene-script-adapter',
    performance: 'scene-performance-director',
    storyboard: 'scene-storyboard-director',
    audio: 'scene-audio-director',
    video_prompts: 'scene-video-prompt-builder',
    publish_review: 'scene-publish-review',
  };
  return mapping[stage] ?? stage;
}

export function readProjectState(projectPath: string): any | null {
  const statePath = path.join(projectPath, 'PROJECT_STATE.json');
  if (!fs.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch {
    return null;
  }
}

function getActiveStateStage(projectPath: string): string | undefined {
  const state = readProjectState(projectPath);
  const currentStage = typeof state?.current_stage === 'string' ? state.current_stage : undefined;
  if (!currentStage) return undefined;

  const currentStatus = state?.stages?.[currentStage]?.status;
  if (currentStatus !== 'completed') {
    return currentStage;
  }
  return undefined;
}

export function getCurrentSopStage(projectPath: string): string {
  const activeStateStage = getActiveStateStage(projectPath);
  if (activeStateStage) {
    return activeStateStage;
  }

  const boardStage = normalizeSceneStageToCliStage(readProjectBoardState(projectPath)?.routing?.current_stage);
  if (boardStage) {
    return boardStage;
  }

  const state = readProjectState(projectPath);
  return typeof state?.current_stage === 'string' ? state.current_stage : 'workspace';
}

export function getNextSopStage(projectPath: string, completedStage: string, sopStageOrder: string[]): string {
  const activeStateStage = getActiveStateStage(projectPath);
  if (activeStateStage && activeStateStage !== completedStage) {
    return activeStateStage;
  }

  const boardStage = normalizeSceneStageToCliStage(readProjectBoardState(projectPath)?.routing?.current_stage);
  if (boardStage && boardStage !== completedStage) {
    return boardStage;
  }

  const state = readProjectState(projectPath);
  if (typeof state?.current_stage === 'string' && state.current_stage !== completedStage) {
    return state.current_stage;
  }

  const currentIndex = sopStageOrder.indexOf(completedStage);
  if (currentIndex >= 0) {
    return sopStageOrder[currentIndex + 1] ?? completedStage;
  }
  return getCurrentSopStage(projectPath);
}
