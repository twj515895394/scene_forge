import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project, parseMarkdownFrontmatter } from '../project.js';
import { ArtifactRegistry } from '../artifact_registry.js';

test('Artifact System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  const project = new Project(testDir);
  const registry = new ArtifactRegistry(project);

  await t.test('1. Manifest Read/Write & Validation', () => {
    const manifest = project.readManifest();
    assert.strictEqual(manifest.project, 'temp_test_project');
    assert.strictEqual(manifest.artifacts.length, 0);

    project.registerArtifact({
      id: 'storyboard_final_pack',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: 'outputs/storyboard_pack_001_cn.md',
      readable_by_downstream: true
    });

    project.registerArtifact({
      id: 'storyboard_draft_notes',
      stage: 'storyboard',
      kind: 'draft',
      role: 'working_notes',
      path: 'details/storyboard/draft_notes.md',
      readable_by_downstream: false
    });

    const updated = project.readManifest();
    assert.strictEqual(updated.artifacts.length, 2);
  });

  await t.test('2. Downstream Read Scope Isolation', () => {
    const readable = registry.getReadableArtifacts('storyboard', 'video_prompts');
    assert.strictEqual(readable.length, 1);
    assert.strictEqual(readable[0].id, 'storyboard_final_pack');
    assert.strictEqual(readable[0].kind, 'final');
  });

  await t.test('3. Write Scope Locking', () => {
    // Valid final output write
    assert.ok(registry.validateWritePath('storyboard', 'outputs/storyboard_pack01.md'));
    // Valid details write
    assert.ok(registry.validateWritePath('storyboard', 'details/storyboard/preview_storyboard.md'));
    assert.ok(registry.validateWritePath('storyboard', 'details/storyboard/draft_notes.md'));
    // Valid special files write
    assert.ok(registry.validateWritePath('storyboard', 'PROJECT_STATE.json'));

    // Invalid details write (storyboard writing to video_prompts details)
    assert.throws(() => {
      registry.validateWritePath('storyboard', 'details/video_prompts/preview.md');
    }, /Write Scope Lock Violated/);

    // Invalid write outside directory
    assert.throws(() => {
      registry.validateWritePath('storyboard', '../outside.md');
    }, /Permission Denied/);
  });

  await t.test('4. Markdown Frontmatter Parser', () => {
    const md = `---
schema: storyboard.v1
stage: storyboard
---
# Content Body`;
    const parsed = parseMarkdownFrontmatter(md);
    assert.strictEqual(parsed.frontmatter.schema, 'storyboard.v1');
    assert.strictEqual(parsed.frontmatter.stage, 'storyboard');
    assert.strictEqual(parsed.body.trim(), '# Content Body');
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
