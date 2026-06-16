Status: completed

# Issue 31: Validator 增加产物索引一致性检查

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

增强 Engine validator，让它不只校验 final artifact 文件是否存在和 frontmatter 是否合规，还能发现 `PROJECT_STATE.json`、`PROJECT_BOARD.md stage_index`、`artifacts.manifest.yaml` 与磁盘产物之间的明显脱节。

这张票的重点是把当前 `projects/worldcup` 暴露出的状态不一致变成可检测问题，而不是继续让 `validate --stage storyboard` 在 board 仍 pending 时静默通过。

## 验收标准

- [ ] 当阶段在 state 中是 `completed`，但 board 中同阶段仍是 `pending` 或 files 为空时，validator 给出明确问题。
- [ ] 当 manifest 只注册主 final artifact，但磁盘存在明显归属当前阶段的 details/子 outputs 时，validator 至少给出 warning。
- [ ] 临时测试项目没有 `PROJECT_BOARD.md` 时不应被硬失败，保持现有测试兼容。
- [ ] 补充 validator 回归测试覆盖 state completed + board pending 的脱节场景。

## 被阻塞于

- [Issue 30: CLI complete 后自动同步 stage_index 与 manifest](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/30-cli-complete-stage-index-manifest-sync.md)

## 实施记录

- Validator 新增 L4 warning：检测 completed state 与 board stage_index pending/files 空的脱节。
- Validator 新增 manifest warning：检测磁盘存在同阶段产物但 manifest 未注册的情况。
- 保持旧项目兼容：没有 `PROJECT_BOARD.md` 的临时项目不会硬失败。
- Targeted 验证通过：`pnpm --filter @scene-forge/engine build`；`node --test dist/tests/validator.test.js dist/tests/artifact_sync.test.js dist/tests/cli.test.js`，18 条通过。
