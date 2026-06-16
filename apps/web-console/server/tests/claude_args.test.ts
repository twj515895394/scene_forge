import { test } from 'node:test';
import assert from 'node:assert';
import { buildClaudeArgs } from '../claudeArgs.js';

test('Claude args builder keeps resume_full first message behavior', () => {
  const result = buildClaudeArgs({
    prompt: '继续推进 storyboard',
    sessionId: 'session-1',
    isFirstMessage: true,
    contextMode: 'resume_full',
    projectContext: '【SceneForge 执行上下文】',
  });

  assert.strictEqual(result.nextIsFirstMessage, false);
  assert.ok(result.finalPrompt.includes('【SceneForge 执行上下文】'));
  assert.ok(result.finalPrompt.includes('用户: 继续推进 storyboard'));
  assert.deepStrictEqual(result.args.slice(-3), [result.finalPrompt, '--session-id', 'session-1']);
  assert.strictEqual(result.args.includes('--resume'), false);
});

test('Claude args builder keeps resume_full follow-up resume behavior', () => {
  const result = buildClaudeArgs({
    prompt: '继续',
    sessionId: 'session-2',
    isFirstMessage: false,
    contextMode: 'resume_full',
    projectContext: 'SHOULD_NOT_BE_USED',
  });

  assert.strictEqual(result.finalPrompt, '继续');
  assert.deepStrictEqual(result.args.slice(-3), ['继续', '--resume', 'session-2']);
  assert.strictEqual(result.args.includes('SHOULD_NOT_BE_USED'), false);
});

test('Claude args builder injects context for first stage_light message', () => {
  const result = buildClaudeArgs({
    prompt: '校验 video_prompts',
    sessionId: 'stage-session-1',
    isFirstMessage: true,
    contextMode: 'stage_light',
    projectContext: '【轻量阶段上下文】',
  });

  assert.strictEqual(result.args.includes('--resume'), false);
  assert.ok(result.finalPrompt.includes('【轻量阶段上下文】'));
  assert.ok(result.finalPrompt.includes('用户: 校验 video_prompts'));
  assert.deepStrictEqual(result.args.slice(-3), [result.finalPrompt, '--session-id', 'stage-session-1']);
});

test('Claude args builder resumes follow-up stage_light messages in the same session', () => {
  const result = buildClaudeArgs({
    prompt: '继续',
    sessionId: 'stage-session-1',
    isFirstMessage: false,
    contextMode: 'stage_light',
    projectContext: '【最新轻量阶段上下文】',
  });

  assert.ok(result.finalPrompt.includes('【最新轻量阶段上下文】'));
  assert.ok(result.finalPrompt.includes('用户: 继续'));
  assert.deepStrictEqual(result.args.slice(-3), [result.finalPrompt, '--resume', 'stage-session-1']);
});

test('Claude args builder does not add provider secret fields', () => {
  const result = buildClaudeArgs({
    prompt: 'hello',
    sessionId: 'session-3',
    isFirstMessage: true,
    contextMode: 'stage_light',
    projectContext: 'project only',
    bypassPermissions: true,
  });

  const joined = result.args.join(' ');
  assert.ok(result.args.includes('--dangerously-skip-permissions'));
  assert.strictEqual(/baseUrl|apiKey|ANTHROPIC_API_KEY/i.test(joined), false);
});
