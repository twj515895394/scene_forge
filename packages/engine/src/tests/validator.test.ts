import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project } from '../project.js';
import { Validator } from '../validators/validator.js';

test('Validator System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_validator_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  const project = new Project(testDir);
  const validator = new Validator(project);

  await t.test('1. L1 Lint - Missing final artifacts and file existence', () => {
    // 1. No artifacts at all
    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L1-001'));

    // 2. Register final artifact but file does not physically exist
    project.registerArtifact({
      id: 'storyboard_final_001',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: 'outputs/storyboard_pack_001_cn.md',
      readable_by_downstream: true,
      pack_id: '001'
    });

    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L1-002'));
  });

  await t.test('2. L1 Lint - Path mismatch', () => {
    // Write physical file at a non-matching pattern
    const invalidPath = 'outputs/invalid_name.md';
    const fullInvalidPath = path.resolve(testDir, invalidPath);
    fs.mkdirSync(path.dirname(fullInvalidPath), { recursive: true });
    fs.writeFileSync(fullInvalidPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## storyboard_prompt_pack', 'utf8');

    project.registerArtifact({
      id: 'storyboard_invalid_pattern',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: invalidPath,
      readable_by_downstream: true,
      pack_id: '001'
    });

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-L1-003'));

    // Clean up
    fs.unlinkSync(fullInvalidPath);
    // Remove the invalid artifact from manifest to prevent noise in subsequent tests
    const manifest = project.readManifest();
    manifest.artifacts = manifest.artifacts.filter(art => art.id !== 'storyboard_invalid_pattern');
    project.writeManifest(manifest);
  });

  await t.test('3. L2 Schema - Zod frontmatter and required headings', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    const fullValidPath = path.resolve(testDir, validPath);
    
    // Clear manifest and register one valid path artifact
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_final_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: validPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });
    
    // 1. Broken Frontmatter (unclosed flow sequence causes yaml parse error)
    fs.writeFileSync(fullValidPath, '---\nstage: [\n---\nBody', 'utf8');
    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L2-001'));

    // 2. Schema schema mismatch (missing 'schema' in frontmatter)
    fs.writeFileSync(fullValidPath, '---\nstage: storyboard\npack_id: "001"\n---\nBody', 'utf8');
    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L2-002'));

    // 3. Missing required heading (## storyboard_prompt_pack)
    fs.writeFileSync(fullValidPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\nBody content', 'utf8');
    const report3 = validator.validate('storyboard');
    assert.strictEqual(report3.status, 'failed');
    assert.ok(report3.errors.some(e => e.rule_id === 'SF-L2-003'));
  });

  await t.test('4. L3 Semantic - Forbidden terms', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    const fullValidPath = path.resolve(testDir, validPath);

    // Clear manifest
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_final_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: validPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });

    // Setup forbidden terms
    const forbiddenPath = path.resolve(testDir, 'forbidden_terms.yaml');
    fs.writeFileSync(forbiddenPath, 'terms:\n  - "Tom Cruise"\n  - "Coca-Cola"', 'utf8');

    // Content containing a forbidden term
    fs.writeFileSync(fullValidPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## storyboard_prompt_pack\nWe will hire Tom Cruise for this scene.', 'utf8');
    
    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-L3-001' && e.line === 7));

    // Clean up forbidden_terms file
    fs.unlinkSync(forbiddenPath);
  });

  await t.test('5. L3 Semantic - Pack ID and Segment ID continuity', () => {
    // Clear manifest completely
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: []
    });

    const p1Path = 'outputs/storyboard_pack_002_cn.md';
    const fullP1Path = path.resolve(testDir, p1Path);
    
    // 1. Pack ID discontinuity (starts at 002, missing 001)
    fs.writeFileSync(fullP1Path, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "002"\n---\n## storyboard_prompt_pack\n### segment-01', 'utf8');
    project.registerArtifact({
      id: 'storyboard_final_002',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: p1Path,
      readable_by_downstream: true,
      pack_id: '002'
    });

    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L3-002'));

    // Fix Pack ID discontinuity but introduce Segment ID discontinuity
    // We clean manifest and register ONLY pack 001 which has segments 01 and 03
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: []
    });

    // Delete outputs/storyboard_pack_002_cn.md physically to avoid scanning it
    if (fs.existsSync(fullP1Path)) {
      fs.unlinkSync(fullP1Path);
    }

    const p0Path = 'outputs/storyboard_pack_001_cn.md';
    const fullP0Path = path.resolve(testDir, p0Path);
    fs.writeFileSync(fullP0Path, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## storyboard_prompt_pack\n### segment-01\n### segment-03', 'utf8');
    
    project.registerArtifact({
      id: 'storyboard_final_001',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: p0Path,
      readable_by_downstream: true,
      pack_id: '001'
    });

    // Segment ID discontinuity check (starts at 1, but jumps to 3)
    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L3-003'));
  });

  await t.test('6. Custom override of stage rules using YAML configuration', () => {
    const customRuleDir = path.resolve(testDir, '.rules/stages');
    fs.mkdirSync(customRuleDir, { recursive: true });

    // Custom rule that changes expected pattern and required headers
    fs.writeFileSync(path.resolve(customRuleDir, 'storyboard.yaml'), 'expected_file_pattern: "^outputs/custom_storyboard_\\\\d+\\\\.md$"\nrequired_headers:\n  - "custom_header"', 'utf8');

    const customPath = 'outputs/custom_storyboard_1.md';
    const fullCustomPath = path.resolve(testDir, customPath);
    fs.writeFileSync(fullCustomPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## custom_header', 'utf8');

    // Register custom artifact
    project.registerArtifact({
      id: 'custom_storyboard',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: customPath,
      readable_by_downstream: true,
      pack_id: '001'
    });

    // We need to clear previous final artifacts in manifest to avoid their path mismatches
    const manifest = project.readManifest();
    manifest.artifacts = manifest.artifacts.filter(art => art.id === 'custom_storyboard');
    project.writeManifest(manifest);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'passed');
    assert.strictEqual(report.errors.length, 0);
  });

  await t.test('7. SF-VP-001 Video Prompt storyboard pack alignment', () => {
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_pack_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: 'outputs/storyboard_pack_001_cn.md',
          readable_by_downstream: true,
          pack_id: '001'
        }
      ]
    });

    const vpPath = 'outputs/video_prompts_pack_002_cn.md';
    const fullVpPath = path.resolve(testDir, vpPath);
    fs.mkdirSync(path.dirname(fullVpPath), { recursive: true });
    // Write a valid body with headers to avoid other errors
    fs.writeFileSync(fullVpPath, '---\nschema: video_prompts.v1\nstage: video_prompts\npack_id: "002"\n---\n## pack_audio_execution_plan\n## segment_sound_execution', 'utf8');

    project.registerArtifact({
      id: 'vp_pack_002',
      stage: 'video_prompts',
      kind: 'final',
      role: 'primary_delivery',
      path: vpPath,
      readable_by_downstream: true,
      pack_id: '002'
    });

    // Validating video_prompts: it has pack_id: 002 but storyboard only has 001. Should fail SF-VP-001.
    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-001'));

    // Clean up
    if (fs.existsSync(fullVpPath)) {
      fs.unlinkSync(fullVpPath);
    }
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
