import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { Project } from '../project.js';

test('CLI System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_cli_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  const project = new Project(testDir);
  const cliPath = path.resolve('./dist/cli.js');

  // Helper to run CLI command
  function runCli(args: string, options: { expectError?: boolean } = {}): any {
    try {
      const output = execSync(`node "${cliPath}" ${args}`, {
        cwd: testDir,
        env: { ...process.env, NODE_ENV: 'test' }
      }).toString();
      return JSON.parse(output);
    } catch (err: any) {
      if (options.expectError) {
        // In commander or error handlers, output is written to stdout for --json
        return JSON.parse(err.stdout.toString() || err.stderr.toString());
      }
      throw new Error(`CLI Command 'node cli.js ${args}' failed unexpectedly: ${err.message}\nStdout: ${err.stdout?.toString()}\nStderr: ${err.stderr?.toString()}`);
    }
  }

  await t.test('1. status command --json', () => {
    const res = runCli('status --json');
    assert.strictEqual(res.project, 'temp_test_cli_project');
    assert.strictEqual(res.stages.topic_gate.status, 'ready');
    assert.strictEqual(res.current_stage, undefined);
  });

  await t.test('2. start command success and dependency fail', () => {
    // 1. Start topic_gate (no dependency)
    const resStart = runCli('start --stage topic_gate --json');
    assert.strictEqual(resStart.stage, 'topic_gate');
    assert.strictEqual(resStart.status, 'in_progress');

    // 2. Verify status changed
    const resStatus = runCli('status --json');
    assert.strictEqual(resStatus.current_stage, 'topic_gate');
    assert.strictEqual(resStatus.stages.topic_gate.status, 'in_progress');

    // 3. Attempt to start script (dependency topic_gate not completed)
    const resFail = runCli('start --stage script --json', { expectError: true });
    assert.strictEqual(resFail.error_code, 'SF-ERR-DEPENDENCY-FAILED');
    assert.ok(resFail.message.includes('upstream stages'));
  });

  await t.test('3. validate command fail and success', () => {
    // 1. Validation fails because no artifacts exist
    const resFail = runCli('validate --stage topic_gate --json', { expectError: true });
    assert.strictEqual(resFail.error_code, 'SF-ERR-VALIDATION-FAILED');
    let status = runCli('status --json');
    assert.strictEqual(status.stages.topic_gate.status, 'review_failed');

    // 2. Setup correct artifact
    const validPath = 'outputs/topic.md';
    const fullValidPath = path.resolve(testDir, validPath);
    fs.mkdirSync(path.dirname(fullValidPath), { recursive: true });
    fs.writeFileSync(fullValidPath, '---\nschema: topic_gate.v1\nstage: topic_gate\n---\npatch_type: scene-topic-gate\nstage: topic_gate\n', 'utf8');

    // 3. Validate again, should auto-sync the disk artifact and pass
    const resPass = runCli('validate --stage topic_gate --json');
    assert.strictEqual(resPass.status, 'passed');
    assert.strictEqual(resPass.errors.length, 0);
    status = runCli('status --json');
    assert.strictEqual(status.stages.topic_gate.status, 'validated');
  });

  await t.test('4. complete command auto-syncs and succeeds for YAML topic_gate artifact', () => {
    const validPath = 'outputs/topic.md';
    const fullValidPath = path.resolve(testDir, validPath);
    fs.writeFileSync(fullValidPath, '---\nschema: topic_gate.v1\nstage: topic_gate\n---\npatch_type: scene-topic-gate\nstage: topic_gate\n', 'utf8');

    const resPass = runCli('complete --stage topic_gate --json');
    assert.strictEqual(resPass.stage, 'topic_gate');
    assert.strictEqual(resPass.status, 'completed');
    assert.ok(resPass.handoff_path);
    assert.strictEqual(resPass.synced_artifacts, 2);

    const status2 = runCli('status --json');
    assert.strictEqual(status2.stages.topic_gate.status, 'completed');
  });

  await t.test('5. artifacts command --json', () => {
    const res = runCli('artifacts --from topic_gate --json');
    assert.strictEqual(res.filter((artifact: any) => artifact.path === 'outputs/topic.md').length, 1);
  });

  await t.test('6. rules command --json', () => {
    const res = runCli('rules --stage storyboard --json');
    assert.strictEqual(res.stage, 'storyboard');
    assert.strictEqual(res.expected_file_pattern, '^outputs/storyboard_pack_\\d+(_\\w+)?\\.md$');
    assert.deepStrictEqual(res.required_headers, ['storyboard_prompt_pack']);
  });

  await t.test('7. complete auto-syncs protocol detail primary files before validation', () => {
    const referencePath = 'details/reference/reference_boundary_v1.md';
    const fullReferencePath = path.resolve(testDir, referencePath);
    fs.mkdirSync(path.dirname(fullReferencePath), { recursive: true });
    fs.writeFileSync(
      fullReferencePath,
      '# reference_boundary\nallowed_inheritance\nforbidden_inheritance\ncreative_direction_context\n',
      'utf8',
    );

    runCli('start --stage reference --json');
    const resPass = runCli('complete --stage reference --json');
    assert.strictEqual(resPass.stage, 'reference');
    assert.strictEqual(resPass.status, 'completed');

    const manifest = project.readManifest();
    const registered = manifest.artifacts.find((artifact) => artifact.path === referencePath);
    assert.strictEqual(registered?.kind, 'final');
    assert.strictEqual(registered?.readable_by_downstream, true);
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
