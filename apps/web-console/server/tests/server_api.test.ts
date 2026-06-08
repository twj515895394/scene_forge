import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { Project } from '@scene-forge/engine';

test('Web Console Server - /api/artifacts API', async (t) => {
  const manifestPath = path.resolve(process.cwd(), 'artifacts.manifest.yaml');
  const backupExists = fs.existsSync(manifestPath);
  let backupContent = '';
  if (backupExists) {
    backupContent = fs.readFileSync(manifestPath, 'utf8');
  }

  // Create test manifest
  const testManifest = `
version: 1
project: test_project
artifacts:
  - id: art-1
    stage: storyboard
    kind: final
    role: director
    path: outputs/storyboard_pack_001_cn.md
    readable_by_downstream: true
  - id: art-2
    stage: script
    kind: draft
    role: writer
    path: outputs/script_draft.md
    readable_by_downstream: true
`;

  fs.writeFileSync(manifestPath, testManifest, 'utf8');

  try {
    const app = express();
    app.get('/api/artifacts', (req, res) => {
      const stage = req.query.stage as string;
      if (!stage) {
        return res.status(400).json({ error: 'Missing stage parameter' });
      }
      try {
        const project = new Project(process.cwd());
        const manifest = project.readManifest();
        const list = manifest.artifacts.filter(a => a.stage === stage);
        res.json(list);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
    });

    const server = app.listen(3999);

    // Call API using fetch
    const response = await fetch('http://localhost:3999/api/artifacts?stage=storyboard');
    assert.strictEqual(response.status, 200);
    const data = (await response.json()) as any[];
    assert.strictEqual(data.length, 1);
    assert.strictEqual(data[0].id, 'art-1');
    assert.strictEqual(data[0].path, 'outputs/storyboard_pack_001_cn.md');

    // Call API with missing param
    const responseBad = await fetch('http://localhost:3999/api/artifacts');
    assert.strictEqual(responseBad.status, 400);

    server.close();
  } finally {
    // Restore backup
    if (backupExists) {
      fs.writeFileSync(manifestPath, backupContent, 'utf8');
    } else {
      if (fs.existsSync(manifestPath)) {
        fs.unlinkSync(manifestPath);
      }
    }
  }
});
