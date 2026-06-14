import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { getArtifactsForStage } from '../artifactDiscovery.js';

function makeTempProject(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'sf-api-artifacts-'));
}

function writeFile(projectPath: string, relativePath: string, content = '') {
  const fullPath = path.join(projectPath, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

test('Web Console Server - /api/artifacts backing discovery', () => {
  const projectPath = makeTempProject();
  try {
    writeFile(projectPath, 'artifacts.manifest.yaml', `
version: 1
project: test_project
artifacts:
  - id: art-1
    stage: storyboard
    kind: final
    role: director
    path: outputs/storyboard_pack_001_cn.md
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
    writeFile(projectPath, 'outputs/storyboard_pack_001_cn.md', '# storyboard');
    writeFile(projectPath, 'details/storyboard/shotlist_v1.md', '# shotlist');

    const data = getArtifactsForStage(projectPath, 'storyboard');
    assert.strictEqual(data.some((artifact) => artifact.id === 'art-1'), true);
    assert.strictEqual(data.some((artifact) => artifact.path === 'details/storyboard/shotlist_v1.md'), true);
    assert.strictEqual(
      data.filter((artifact) => artifact.path === 'outputs/storyboard_pack_001_cn.md').length,
      1,
    );
  } finally {
    fs.rmSync(projectPath, { recursive: true, force: true });
  }
});
