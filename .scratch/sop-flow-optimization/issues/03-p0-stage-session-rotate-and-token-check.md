Status: implemented-awaiting-token-sample

# Issue 03: P0 阶段 Session Rotate 与 Token 对比

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

在轻量阶段模式下，为每个 SOP 阶段维护独立 session，并在阶段 complete 成功后自动 rotate。补充 token usage 展示中的 context mode / session id 信息，并用长 session 项目做 `stage_light` 与 `resume_full` 对比。

## 验收标准

- [x] 阶段 session metadata 不混入真实阶段产物正文。
- [x] complete 成功后下游阶段使用新 session。
- [x] UI usage 展示包含 context mode 和当前 session id。
- [ ] 手工验证记录显示 `stage_light` contextTokens 明显低于 `resume_full`。
- [x] `pnpm --filter @scene-forge/web-console build` 通过。

## Review 标准

- [x] 检查 session metadata 是否只保存短字段和路径，不保存 raw assistant/tool/thought。
- [x] 检查 complete 检测逻辑不会误判普通聊天为阶段完成。
- [ ] 检查 token 对比记录包含同一项目、同一提示词、两种模式的可比数据。
- [x] 检查失败时仍可手动切回 `resume_full` 排错。

## 实施记录

- 新增 `.scene_forge_session_meta.json` 短 metadata，用于记录 `activeStage` 与各阶段最新 `sessionId`；该文件不位于 `outputs/`、`details/` 或 `artifacts.manifest.yaml`。
- `stage_light` 模式下每次运行都会为当前 SOP 阶段生成并登记新的轻量 session，避免携带旧 raw assistant/tool/thought 历史。
- `complete` 宏执行结束后读取 `PROJECT_STATE.json`，只有确认该阶段状态为 `completed` 时才为下游阶段准备 session，避免普通聊天误判为阶段完成。
- UI 上下文切换控件展示当前短 session id；usage 系统气泡补充 `context mode` 与 `session id`。
- 保留 `resume_full` 切换入口，排错时仍可回到 Claude CLI `--resume` 完整续聊。

## 验证记录

- `pnpm --filter @scene-forge/web-console exec tsc -p tsconfig.server.json` 通过。
- `pnpm --filter @scene-forge/web-console build` 通过。
- `node --test apps/web-console/dist/server/tests/claude_args.test.js` 通过，4 passed。
- 未伪造真实 token A/B 数据；需要在已激活的长 session 项目里，用同一提示词分别切换 `stage_light` 与 `resume_full` 后记录 usage 气泡中的 `contextTokens`。

## 被阻塞于

- Issue 02
- Issue 04
- Issue 05
