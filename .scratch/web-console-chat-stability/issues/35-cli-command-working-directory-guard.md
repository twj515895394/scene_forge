Status: completed

# Issue 35: CLI 命令工作目录防护

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

防止 Agent 在错误工作目录下直接执行 `node ../../packages/engine/dist/cli.js ...`，导致 CLI 路径解析到 `/Users/tangwujun/Documents/packages/...` 之类的错误位置。

## 验收标准

- [ ] Web Console 项目上下文明确要求先 `cd projects/<slug>` 再执行 CLI。
- [ ] 宏命令提示包含可复制的正确 CLI 命令格式。
- [ ] 不改变 Engine CLI 本身的状态机行为。

## 被阻塞于

无 - 可以立即开始

## 实施记录

- `buildProjectContext` 已补充 `rules --stage` 正确命令和禁止错误目录直接执行的说明。
- Web Console macro prompt 已改为带上 `cd projects/<slug> && node ../../packages/engine/dist/cli.js ...` 的明确命令。
