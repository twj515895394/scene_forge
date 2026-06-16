Status: completed

# Issue 02: P0 轻量阶段默认模式与 UI 切换

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

让 Web Console 默认使用 `stage_light`，并在聊天界面提供“轻量阶段 / 完整续聊”切换。轻量阶段首版 compact context 只包含项目路径、当前阶段、执行边界、board/state/manifest 路径索引和用户本次输入，不深读阶段产物正文。

## 验收标准

- [x] 新连接默认上下文模式是 `stage_light`。
- [x] UI 可以切换到 `resume_full`，并通过 WebSocket 同步给服务端。
- [x] 轻量阶段模式提示用户“不携带历史 tool/thought/raw assistant”。
- [x] 宏命令 start / validate / complete 走当前上下文模式。
- [x] `pnpm --filter @scene-forge/web-console build` 通过。

## 执行记录

- 服务端默认 `contextMode` 改为 `stage_light`。
- `stage_light` 每轮创建新 session，避免无 `--resume` 复用旧 session id。
- `buildProjectContext()` 在轻量模式下注入“不携带历史 tool/thought/raw assistant”的明确提示。
- 前端新增“轻量阶段 / 完整续聊”切换控件，并通过 `set_context_mode` WebSocket 消息同步服务端。
- 宏命令和普通输入共用 `runClaude()`，因此自动继承当前上下文模式。

## 验证记录

- 通过：`pnpm --filter @scene-forge/web-console exec tsc -p tsconfig.server.json`
- 通过：`pnpm --filter @scene-forge/web-console build`
- 通过：`node --test apps/web-console/dist/server/tests/claude_args.test.js`
- 浏览器检查：当前 `localhost:4398` 停在 Lobby，未激活项目，因此聊天输入区未渲染；为避免创建/激活项目副作用，未继续操作。

## Review 标准

- [x] 检查 UI 文案是否简短明确，且不暗示会管理 Claude baseUrl/apiKey。
- [x] 检查 WebSocket 消息 schema 是否向后兼容，未知消息不会破坏旧客户端。
- [x] 检查宏命令与普通 stdin 使用同一模式来源，不出现双轨逻辑。
- [x] 检查移动/窄屏布局下切换控件不会挤压输入区核心操作。

## 被阻塞于

- Issue 01
