import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project } from '../project.js';
import { StateMachine } from '../state_machine.js';

test('State Machine System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_state_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  const project = new Project(testDir);
  const sm = new StateMachine(project);

  await t.test('1. Initialize Stage States', () => {
    const state = sm.readState();
    assert.strictEqual(state.project, 'temp_test_state_project');
    assert.ok(state.stages['topic_gate']);
    assert.strictEqual(state.stages['topic_gate'].status, 'ready');
    assert.strictEqual(state.stages['script'].status, 'ready');
  });

  await t.test('2. Start Stage Dependency Checks', () => {
    // Cannot start script because topic_gate is not completed
    assert.throws(() => {
      sm.startStage('script');
    }, /Cannot start stage 'script': required upstream stages \[topic_gate\] are not completed/);

    // Can start topic_gate because it has no dependencies
    const topicState = sm.startStage('topic_gate');
    assert.strictEqual(topicState.status, 'in_progress');
    assert.strictEqual(sm.readState().current_stage, 'topic_gate');
  });

  await t.test('3. Complete Stage Transaction Fail', () => {
    // completeStage with failure
    assert.throws(() => {
      sm.completeStage('topic_gate', false, ['Missing key style configurations']);
    }, /Validation failed for stage 'topic_gate': Missing key style configurations/);

    const state = sm.readState();
    assert.strictEqual(state.stages['topic_gate'].status, 'review_failed');
    assert.ok(state.stages['topic_gate'].validation_result_path);
    assert.strictEqual(state.stages['script'].status, 'ready'); // Downstream is still locked

    const validationResultPath = path.resolve(testDir, state.stages['topic_gate'].validation_result_path!);
    assert.ok(fs.existsSync(validationResultPath));
    const validationContent = JSON.parse(fs.readFileSync(validationResultPath, 'utf8'));
    assert.strictEqual(validationContent.status, 'failed');
    assert.deepStrictEqual(validationContent.errors, ['Missing key style configurations']);
  });

  await t.test('4. Complete Stage Transaction Success', () => {
    // Restart from review_failed
    sm.startStage('topic_gate');
    assert.strictEqual(sm.readState().stages['topic_gate'].status, 'in_progress');

    // Complete with success
    const topicState = sm.completeStage('topic_gate', true);
    assert.strictEqual(topicState.status, 'completed');
    assert.ok(topicState.handoff_path);

    const handoffFilePath = path.resolve(testDir, topicState.handoff_path!);
    assert.ok(fs.existsSync(handoffFilePath));
    const handoffContent = JSON.parse(fs.readFileSync(handoffFilePath, 'utf8'));
    assert.strictEqual(handoffContent.stage, 'topic_gate');

    const state = sm.readState();
    assert.strictEqual(state.stages['topic_gate'].status, 'completed');
    assert.strictEqual(state.current_stage, undefined);

    // Now script is ready and can be started
    assert.ok(sm.checkDependencies('script'));
    const scriptState = sm.startStage('script');
    assert.strictEqual(scriptState.status, 'in_progress');
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
