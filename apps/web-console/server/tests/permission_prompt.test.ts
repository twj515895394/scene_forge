import { test } from 'node:test';
import assert from 'node:assert';
import {
  buildIdeBlockedPromptPayload,
  buildPermissionPromptPayload,
  isIdeApprovalGuidanceText,
  isPermissionPromptText,
  sanitizePromptText,
} from '../permissionPrompt.js';

test('permission prompt detection covers stdout/stderr approval hints', async (t) => {
  await t.test('detects classic yes/no CLI approval prompt', () => {
    assert.strictEqual(isPermissionPromptText('Allow write to file? [y/N]'), true);
  });

  await t.test('detects permission wording from stderr-like messages', () => {
    assert.strictEqual(
      isPermissionPromptText('Permission required: approve command execution before continuing'),
      true,
    );
  });

  await t.test('sanitizes ansi and collapsed whitespace', () => {
    assert.strictEqual(
      sanitizePromptText('\u001b[33mAllow command?\u001b[0m   [y/N]\n'),
      'Allow command? [y/N]',
    );
  });

  await t.test('builds prompt card payload for detected permission text', () => {
    assert.deepStrictEqual(buildPermissionPromptPayload('Authorization required (y/n)'), {
      title: 'Authorization required (y/n)',
      options: [
        { label: '批准写入/执行 (Yes)', value: 'y', kind: 'allow' },
        { label: '拒绝操作 (No)', value: 'n', kind: 'deny' },
      ],
    });
  });

  await t.test('ignores ordinary assistant text', () => {
    assert.strictEqual(buildPermissionPromptPayload('我先检查一下当前状态。'), null);
  });

  await t.test('detects IDE approval guidance text as fallback prompt source', () => {
    assert.strictEqual(
      isIdeApprovalGuidanceText('还是被拦截。你需要在 IDE 中点击 Approve 或 允许 来批准这次写入操作。'),
      true,
    );
  });

  await t.test('builds fallback card payload for IDE-blocked guidance text', () => {
    assert.deepStrictEqual(
      buildIdeBlockedPromptPayload('还是被拦截。你需要在 IDE 中点击 Approve 或 允许 来批准这次写入操作。'),
      {
        title: '还是被拦截。你需要在 IDE 中点击 Approve 或 允许 来批准这次写入操作。',
        options: [
          { label: '开启自动授权并重试', value: 'retry_bypass', kind: 'allow' },
          { label: '已在 IDE 处理，关闭提示', value: 'ack_ide', kind: 'allow' },
          { label: '取消本次操作', value: 'cancel', kind: 'deny' },
        ],
      },
    );
  });
});
