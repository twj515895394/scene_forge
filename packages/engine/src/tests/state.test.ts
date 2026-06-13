import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project } from '../project.js';
import { DEFAULT_STAGES, STAGE_DEPENDENCIES, StateMachine } from '../state_machine.js';

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
    assert.deepStrictEqual(Object.keys(state.stages), [...DEFAULT_STAGES]);
    for (const stage of DEFAULT_STAGES) {
      assert.strictEqual(state.stages[stage].status, 'ready');
    }
  });

  await t.test('2. SOP Stage Dependencies', () => {
    assert.deepStrictEqual(STAGE_DEPENDENCIES, {
      topic_gate: [],
      reference: ['topic_gate'],
      story: ['reference'],
      assets: ['story'],
      design: ['assets'],
      script: ['design'],
      performance: ['script'],
      storyboard: ['performance'],
      audio: ['storyboard'],
      video_prompts: ['audio'],
      publish_review: ['video_prompts']
    });
  });

  await t.test('3. Start Stage Dependency Checks', () => {
    // Cannot jump from topic_gate to script; SOP requires reference/story/assets/design first.
    assert.throws(() => {
      sm.startStage('script');
    }, /Cannot start stage 'script': required upstream stages \[design\] are not completed/);

    // Can start topic_gate because it has no dependencies
    const topicState = sm.startStage('topic_gate');
    assert.strictEqual(topicState.status, 'in_progress');
    assert.strictEqual(sm.readState().current_stage, 'topic_gate');
  });

  await t.test('4. Complete Stage Transaction Fail', () => {
    // completeStage with failure
    assert.throws(() => {
      sm.completeStage('topic_gate', false, ['Missing key style configurations']);
    }, /Validation failed for stage 'topic_gate': Missing key style configurations/);

    const state = sm.readState();
    assert.strictEqual(state.stages['topic_gate'].status, 'review_failed');
    assert.ok(state.stages['topic_gate'].validation_result_path);
    assert.strictEqual(state.stages['reference'].status, 'ready'); // Downstream is still locked

    const validationResultPath = path.resolve(testDir, state.stages['topic_gate'].validation_result_path!);
    assert.ok(fs.existsSync(validationResultPath));
    const validationContent = JSON.parse(fs.readFileSync(validationResultPath, 'utf8'));
    assert.strictEqual(validationContent.status, 'failed');
    assert.deepStrictEqual(validationContent.errors, ['Missing key style configurations']);
  });

  await t.test('5. Complete Stage Transaction Success', () => {
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

    // Now reference is ready and can be started.
    assert.ok(sm.checkDependencies('reference'));
    const referenceState = sm.startStage('reference');
    assert.strictEqual(referenceState.status, 'in_progress');
  });

  await t.test('6. Complete Standard SOP Dependency Chain', () => {
    const completeActiveStage = (stage: string) => {
      const state = sm.readState();
      if (state.stages[stage].status !== 'in_progress') {
        sm.startStage(stage);
      }
      sm.completeStage(stage, true);
    };

    completeActiveStage('reference');
    completeActiveStage('story');
    completeActiveStage('assets');
    completeActiveStage('design');
    completeActiveStage('script');
    completeActiveStage('performance');
    completeActiveStage('storyboard');

    assert.throws(() => {
      sm.startStage('video_prompts');
    }, /Cannot start stage 'video_prompts': required upstream stages \[audio\] are not completed/);

    completeActiveStage('audio');
    assert.ok(sm.checkDependencies('video_prompts'));
    completeActiveStage('video_prompts');
    assert.ok(sm.checkDependencies('publish_review'));
    completeActiveStage('publish_review');

    const state = sm.readState();
    for (const stage of DEFAULT_STAGES) {
      assert.strictEqual(state.stages[stage].status, 'completed');
    }
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
