import { test } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import { isAllowedStageLightProjectCommand, isAllowedStageLightReadOnlyCommand } from '../stageLightGuard.js';

const workspaceRoot = '/Users/example/scene_forge';
const projectPath = path.join(workspaceRoot, 'projects/test0616');

test('stage_light allows read-only shell preview of current project files', () => {
  assert.strictEqual(
    isAllowedStageLightReadOnlyCommand(`cat "${projectPath}/PROJECT_STATE.json" | head -30`, projectPath, workspaceRoot),
    true,
  );
  assert.strictEqual(
    isAllowedStageLightReadOnlyCommand(`head -30 "${projectPath}/PROJECT_BOARD.md"`, projectPath, workspaceRoot),
    true,
  );
  assert.strictEqual(
    isAllowedStageLightReadOnlyCommand(`sed -n '1,80p' PROJECT_INDEX.md`, projectPath, workspaceRoot),
    true,
  );
});

test('stage_light blocks read-only shell previews outside the current project', () => {
  assert.strictEqual(
    isAllowedStageLightReadOnlyCommand(`cat "${workspaceRoot}/packages/engine/src/cli.ts" | head -30`, projectPath, workspaceRoot),
    false,
  );
  assert.strictEqual(
    isAllowedStageLightReadOnlyCommand(`cat "${workspaceRoot}/projects/other/PROJECT_STATE.json" | head -30`, projectPath, workspaceRoot),
    false,
  );
});

test('stage_light allows shell commands scoped to the current project tree', () => {
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`mkdir -p "${projectPath}/outputs"`, projectPath, workspaceRoot),
    true,
  );
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`cd "${projectPath}" && mkdir -p outputs && printf ok > outputs/topic.md`, projectPath, workspaceRoot),
    true,
  );
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`sed -n '1,80p' "${projectPath}/PROJECT_BOARD.md"`, projectPath, workspaceRoot),
    true,
  );
});

test('stage_light allows project-scoped engine CLI with diagnostic output suffix', () => {
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`cd "${projectPath}" && node ../../packages/engine/dist/cli.js complete --stage story 2>&1 | head -20`, projectPath, workspaceRoot),
    true,
  );
});

test('stage_light blocks shell commands with explicit paths outside the current project tree', () => {
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`mkdir -p "${workspaceRoot}/projects/other/outputs"`, projectPath, workspaceRoot),
    false,
  );
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`cd "${projectPath}" && cat ../other/PROJECT_STATE.json`, projectPath, workspaceRoot),
    false,
  );
  assert.strictEqual(
    isAllowedStageLightProjectCommand(`cat "${workspaceRoot}/packages/engine/src/cli.ts"`, projectPath, workspaceRoot),
    false,
  );
});
