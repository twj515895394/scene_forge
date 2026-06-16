Status: completed

# Issue 01: P0 Claude 参数构造与上下文模式

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

把 Web Console 中 Claude CLI 参数构造从 `runClaude()` 内部抽离出来，并引入 `stage_light | resume_full` 两种上下文模式。此切片只提供可测试的参数构造和服务端模式状态，不改变 UI 默认体验，也不深做 compact context。

## 验收标准

- [x] 服务端有独立的 Claude args 构造函数，单测可直接验证，不需要真实启动 Claude CLI。
- [x] `stage_light` 模式下不会生成 `--resume` 参数。
- [x] `resume_full` 模式下保留当前首轮 `--session-id`、后续 `--resume` 行为。
- [x] 模式切换不读取、不保存、不展示 `baseUrl`、`apiKey` 或供应商配置。
- [x] `pnpm --filter @scene-forge/web-console build` 通过。

## 执行记录

- 新增 `apps/web-console/server/claudeArgs.ts`，抽离 Claude CLI 参数构造。
- 新增 `apps/web-console/server/tests/claude_args.test.ts`，覆盖 `resume_full` 首轮/续聊、`stage_light` 不生成 `--resume`、secret 字段不进入 args。
- `apps/web-console/server/server.ts` 接入 `ClaudeContextMode` 和 `set_context_mode` WebSocket 消息。
- 默认模式仍保持 `resume_full`，避免本票提前改变 UI 和默认体验。

## 验证记录

- 通过：`pnpm --filter @scene-forge/web-console exec tsc -p tsconfig.server.json`
- 通过：`node --test apps/web-console/dist/server/tests/claude_args.test.js`
- 通过：`pnpm --filter @scene-forge/web-console build`
- 说明：曾运行完整 `pnpm --filter @scene-forge/web-console test`，新增单测初版有 2 个断言顺序错误，已修复；随后整套测试跑到既有 watcher 测试时未自然退出，已中断，未作为最终验证依据。

## Review 标准

- [x] 只审查 Claude args 构造、context mode 状态与调用接线，不把 Issue 02 的 UI 默认切换混入本票。
- [x] 检查 `stage_light` 与 `resume_full` 的首轮/后续参数行为是否由单测覆盖。
- [x] 检查日志、prompt 和测试 fixture 中没有 secret 字段或供应商配置暴露。
- [x] 检查修改是否保持现有 reload Claude、new session、load session 行为兼容。

## 被阻塞于

无 - 可以立即开始
