import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getArtifactsForStage } from '../artifactDiscovery.js';

function makeTempProject(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'sf-artifacts-'));
}

function writeFile(projectPath: string, relativePath: string, content = '') {
  const fullPath = path.join(projectPath, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

test('artifact discovery merges manifest, board, and disk fallback entries', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'artifacts.manifest.yaml', `
version: 1
project: temp
artifacts:
  - id: storyboard-main
    stage: storyboard
    kind: final
    role: primary
    path: outputs/storyboard_pack_1_all.md
    readable_by_downstream: true
`);
    writeFile(projectPath, 'PROJECT_BOARD.md', `
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
    writeFile(projectPath, 'outputs/storyboard_pack_1_all.md', '# storyboard');
    writeFile(projectPath, 'outputs/storyboard/pack_1_vgu01.md', '# pack');
    writeFile(projectPath, 'details/storyboard/shotlist_v1.md', '# shotlist');
    writeFile(projectPath, 'handoffs/storyboard.handoff.json', '{}');
    writeFile(projectPath, '../other-project/outputs/storyboard_leak.md', '# leak');

    const artifacts = getArtifactsForStage(projectPath, 'storyboard');
    const paths = artifacts.map((artifact) => artifact.path).sort();

    assert.deepStrictEqual(paths, [
      'details/storyboard/shotlist_v1.md',
      'handoffs/storyboard.handoff.json',
      'outputs/storyboard/pack_1_vgu01.md',
      'outputs/storyboard_pack_1_all.md',
    ]);
    assert.strictEqual(
      artifacts.filter((artifact) => artifact.path === 'outputs/storyboard_pack_1_all.md').length,
      1,
    );
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});

test('artifact discovery maps UI publish stage to engine publish_review files', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'artifacts.manifest.yaml', `
version: 1
project: temp
artifacts:
  - id: publish-review-main
    stage: publish_review
    kind: final
    role: primary
    path: outputs/publish_review.md
    readable_by_downstream: true
`);
    writeFile(projectPath, 'outputs/publish_review.md', '# publish');
    writeFile(projectPath, 'details/publish_review/caption_v1.md', '# caption');

    const artifacts = getArtifactsForStage(projectPath, 'publish');
    assert.deepStrictEqual(
      artifacts.map((artifact) => artifact.path).sort(),
      ['details/publish_review/caption_v1.md', 'outputs/publish_review.md'],
    );
    assert.ok(artifacts.every((artifact) => artifact.stage === 'publish'));
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});
