import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  denormalizeCliStageToSceneStage,
  getCurrentSopStage,
  getNextSopStage,
  normalizeSceneStageToCliStage,
  readProjectState,
} from '../stageState.js';

function makeTempProject(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'sf-stage-state-'));
}

function writeFile(projectPath: string, relativePath: string, content: string) {
  const fullPath = path.join(projectPath, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

test('stage names map between scene skill names and CLI stage ids', () => {
  assert.strictEqual(normalizeSceneStageToCliStage('scene-topic-gate'), 'topic_gate');
  assert.strictEqual(normalizeSceneStageToCliStage('scene-video-prompt-builder'), 'video_prompts');
  assert.strictEqual(denormalizeCliStageToSceneStage('topic_gate'), 'scene-topic-gate');
  assert.strictEqual(denormalizeCliStageToSceneStage('video_prompts'), 'scene-video-prompt-builder');
});

test('current stage prefers active PROJECT_STATE over already-advanced board routing', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'PROJECT_BOARD.md', `
routing:
  current_stage: scene-reference-decider
`);
    writeFile(projectPath, 'PROJECT_STATE.json', JSON.stringify({
      current_stage: 'topic_gate',
      stages: {
        topic_gate: { status: 'in_progress' },
        reference: { status: 'ready' },
      },
    }));

    assert.strictEqual(getCurrentSopStage(projectPath), 'topic_gate');
    assert.strictEqual(getNextSopStage(projectPath, 'topic_gate', ['topic_gate', 'reference']), 'reference');
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});

test('current stage falls back to board routing when PROJECT_STATE has no active stage', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'PROJECT_BOARD.md', `
routing:
  current_stage: scene-story-development
`);
    writeFile(projectPath, 'PROJECT_STATE.json', JSON.stringify({
      stages: {
        topic_gate: { status: 'completed' },
        reference: { status: 'completed' },
      },
    }));

    assert.strictEqual(getCurrentSopStage(projectPath), 'story');
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});

test('current stage can resolve ready board-routed stage without mutating PROJECT_STATE', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'PROJECT_BOARD.md', `
routing:
  current_stage: scene-topic-gate
`);
    writeFile(projectPath, 'PROJECT_STATE.json', JSON.stringify({
      stages: {
        topic_gate: { status: 'ready' },
        reference: { status: 'ready' },
      },
    }));

    assert.strictEqual(getCurrentSopStage(projectPath), 'topic_gate');
    assert.strictEqual(readProjectState(projectPath)?.current_stage, undefined);
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});
