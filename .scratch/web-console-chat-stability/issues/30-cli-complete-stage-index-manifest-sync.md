Status: completed

# Issue 30: CLI complete 后自动同步 stage_index 与 manifest

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

让 `node packages/engine/dist/cli.js complete --stage <stage>` 在校验通过并完成阶段后，自动把当前阶段真实存在的产物同步到 `artifacts.manifest.yaml` 与 `PROJECT_BOARD.md stage_index.<stage>`。

目标是让 Agent 只要按 SOP 执行 `start -> validate/complete`，就不会因为忘记手工回写 board 或 manifest 而导致 Web Console 侧边栏显示空产物。

## 验收标准

- [ ] complete 成功后，当前阶段的 `outputs/` 主产物和子产物被注册到 manifest。
- [ ] complete 成功后，`PROJECT_BOARD.md stage_index.<stage>.status` 更新为 `completed`，`active_version` 和 `files` 指向真实文件。
- [ ] handoff 文件生成后同步进 `stage_index.<stage>.files.handoff`。
- [ ] 同步逻辑只注册真实存在且可归属当前阶段的文件，不编造缺失文件。
- [ ] 补充 Engine CLI 回归测试。

## 被阻塞于

- [Issue 29: Web Console 产物发现兜底与真实 API 回归](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/29-web-console-artifact-discovery-fallback.md)

## 实施记录

- 新增 `packages/engine/src/artifact_sync.ts`，支持发现当前阶段的 outputs、details 和 handoff 文件。
- `complete --stage <stage>` 成功后会自动同步 manifest，并在存在 `PROJECT_BOARD.md` 时同步 `stage_index`。
- manifest schema 已改为 passthrough，避免写回时丢失扩展字段。
- Targeted 验证通过：`pnpm --filter @scene-forge/engine build`；`node --test dist/tests/artifact_sync.test.js dist/tests/cli.test.js`。
