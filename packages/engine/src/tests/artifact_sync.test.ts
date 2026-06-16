import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project } from '../project.js';
import { discoverStageArtifacts, syncStageArtifactIndex } from '../artifact_sync.js';

function writeFile(projectPath: string, relativePath: string, content = '') {
  const fullPath = path.join(projectPath, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

test('artifact sync discovers stage outputs, details, and handoff files', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_discovery');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'outputs/storyboard_pack_1_all.md');
    writeFile(testDir, 'outputs/storyboard/pack_1.md');
    writeFile(testDir, 'outputs/storyboard_prompts/control_storyboard_prompt_v1.md');
    writeFile(testDir, 'details/storyboard/shotlist_v1.md');
    writeFile(testDir, 'handoffs/storyboard.handoff.json');
    writeFile(testDir, 'outputs/audio_pack_1.md');

    const artifacts = discoverStageArtifacts(project, 'storyboard');
    assert.deepStrictEqual(
      artifacts.map((artifact) => artifact.path).sort(),
      [
        'details/storyboard/shotlist_v1.md',
        'handoffs/storyboard.handoff.json',
        'outputs/storyboard/pack_1.md',
        'outputs/storyboard_pack_1_all.md',
        'outputs/storyboard_prompts/control_storyboard_prompt_v1.md',
      ],
    );
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync updates manifest and PROJECT_BOARD stage_index', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_board');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'PROJECT_BOARD.md', `
stage_index:
  storyboard:
    status: pending
    active_version:
    files:
      primary:
      details: []
      outputs: []
      handoff:
`);
    writeFile(testDir, 'outputs/storyboard_pack_1_all.md');
    writeFile(testDir, 'outputs/storyboard.md');
    writeFile(testDir, 'outputs/storyboard_prompts/control_storyboard_prompt_v1.md');
    writeFile(testDir, 'details/storyboard/shotlist_v1.md');
    writeFile(testDir, 'handoffs/storyboard.handoff.json');

    const artifacts = syncStageArtifactIndex(project, 'storyboard');
    const manifest = project.readManifest();
    const board = fs.readFileSync(path.join(testDir, 'PROJECT_BOARD.md'), 'utf8');

    assert.strictEqual(artifacts.length, 5);
    assert.strictEqual(manifest.artifacts.some((artifact) => artifact.path === 'outputs/storyboard_pack_1_all.md'), true);
    assert.strictEqual(
      manifest.artifacts.some((artifact) => artifact.path === 'outputs/storyboard.md' && artifact.kind === 'draft'),
      true,
    );
    assert.match(board, /status: pending/);
    assert.match(board, /primary: outputs\/storyboard_pack_1_all\.md/);
    assert.match(board, /details\/storyboard\/shotlist_v1\.md/);
    assert.match(board, /outputs\/storyboard_prompts\/control_storyboard_prompt_v1\.md/);
    assert.match(board, /handoffs\/storyboard\.handoff\.json/);
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync discovers design prompt outputs', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_design');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'outputs/design.md');
    writeFile(testDir, 'outputs/design_prompts/角色说明书图片提示词_v1.md');
    writeFile(testDir, 'details/design/character_design_主角_v1.md');
    writeFile(testDir, 'outputs/storyboard_pack_1_all.md');

    const artifacts = discoverStageArtifacts(project, 'design');
    assert.deepStrictEqual(
      artifacts.map((artifact) => artifact.path).sort(),
      [
        'details/design/character_design_主角_v1.md',
        'outputs/design.md',
        'outputs/design_prompts/角色说明书图片提示词_v1.md',
      ],
    );
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync treats new video prompt pack paths as final outputs', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_video_prompts');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'PROJECT_BOARD.md', `
stage_index:
  video_prompts:
    status: pending
    active_version:
    files:
      primary:
      details: []
      outputs: []
      quality_check:
`);
    writeFile(testDir, 'outputs/video_prompts/视频提示词_第01包_中文_v1.md');
    writeFile(testDir, 'outputs/video_prompts/视频提示词_第01包_英文_v1.md');
    writeFile(testDir, 'details/video_prompts/video_prompt_review_v1.md');

    const artifacts = syncStageArtifactIndex(project, 'video_prompts');
    const manifest = project.readManifest();
    const board = fs.readFileSync(path.join(testDir, 'PROJECT_BOARD.md'), 'utf8');

    assert.strictEqual(
      manifest.artifacts.some((artifact) => (
        artifact.path === 'outputs/video_prompts/视频提示词_第01包_中文_v1.md' &&
        artifact.kind === 'final'
      )),
      true,
    );
    assert.strictEqual(
      manifest.artifacts.some((artifact) => (
        artifact.path === 'outputs/video_prompts/视频提示词_第01包_英文_v1.md' &&
        artifact.kind === 'final'
      )),
      true,
    );
    assert.strictEqual(artifacts.length, 3);
    assert.match(board, /primary: outputs\/video_prompts\/视频提示词_第01包_中文_v1\.md/);
    assert.match(board, /quality_check: details\/video_prompts\/video_prompt_review_v1\.md/);
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync writes storyboard quality_check when quality detail exists', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_storyboard_quality');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'PROJECT_BOARD.md', `
stage_index:
  storyboard:
    status: pending
    active_version:
    files:
      primary:
      details: []
      outputs: []
      quality_check:
`);
    writeFile(testDir, 'outputs/storyboard_pack_1_all.md');
    writeFile(testDir, 'details/storyboard/storyboard_quality_check_v1.md');

    syncStageArtifactIndex(project, 'storyboard');
    const board = fs.readFileSync(path.join(testDir, 'PROJECT_BOARD.md'), 'utf8');

    assert.match(board, /quality_check: details\/storyboard\/storyboard_quality_check_v1\.md/);
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync treats protocol-defined detail files as final primary artifacts', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_detail_primary');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'PROJECT_BOARD.md', `
stage_index:
  reference:
    status: pending
    active_version:
    files:
      primary:
      details: []
      outputs: []
`);
    writeFile(testDir, 'details/reference/reference_boundary_v1.md');

    syncStageArtifactIndex(project, 'reference');
    const manifest = project.readManifest();
    const board = fs.readFileSync(path.join(testDir, 'PROJECT_BOARD.md'), 'utf8');
    const artifact = manifest.artifacts.find((item) => item.path === 'details/reference/reference_boundary_v1.md');

    assert.strictEqual(artifact?.kind, 'final');
    assert.strictEqual(artifact?.role, 'detail');
    assert.strictEqual(artifact?.readable_by_downstream, true);
    assert.match(board, /primary: details\/reference\/reference_boundary_v1\.md/);
    assert.match(board, /details\/reference\/reference_boundary_v1\.md/);
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync treats performance and audio plan details as final primary artifacts', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_plan_details');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'details/performance_sheet_v1.md');
    writeFile(testDir, 'details/audio_plan_v1.md');

    syncStageArtifactIndex(project, 'performance');
    syncStageArtifactIndex(project, 'audio');
    const manifest = project.readManifest();

    assert.strictEqual(
      manifest.artifacts.some((artifact) => (
        artifact.stage === 'performance' &&
        artifact.path === 'details/performance_sheet_v1.md' &&
        artifact.kind === 'final'
      )),
      true,
    );
    assert.strictEqual(
      manifest.artifacts.some((artifact) => (
        artifact.stage === 'audio' &&
        artifact.path === 'details/audio_plan_v1.md' &&
        artifact.kind === 'final'
      )),
      true,
    );
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('artifact sync discovers publish copy outputs for publish_review', () => {
  const testDir = path.resolve('./temp_test_artifact_sync_publish_copy');
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
  try {
    const project = new Project(testDir);
    writeFile(testDir, 'outputs/publish_copy/title_cover_v1.md');
    writeFile(testDir, 'outputs/publish_copy/douyin_publish_v1.md');

    const artifacts = syncStageArtifactIndex(project, 'publish_review');

    assert.deepStrictEqual(
      artifacts.map((artifact) => [artifact.path, artifact.kind]).sort(),
      [
        ['outputs/publish_copy/douyin_publish_v1.md', 'final'],
        ['outputs/publish_copy/title_cover_v1.md', 'final'],
      ],
    );
  } finally {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
