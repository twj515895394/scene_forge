Status: completed

# Issue 37: 执行策略注入 Agent 上下文

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

让 Agent 每次进入项目会话时都能读到当前 `execution_policy`，并知道快速模式/全自动模式下哪些阶段需要确认、哪些阶段可以自动执行。

## 验收标准

- [ ] `buildProjectContext` 输出当前执行模式。
- [ ] 上下文明确 full_auto 的前置确认与硬停机条件。
- [ ] 缺省 `execution_policy` 时按 `fast_production` 说明。

## 被阻塞于

- [Issue 36: 执行模式 PROJECT_BOARD 写入与 UI 切换](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/36-execution-policy-board-and-ui-toggle.md)

## 实施记录

- `buildProjectContext` 已注入当前 `execution_policy.mode`。
- 上下文明确 fast/full_auto 的阶段确认边界。
- 上下文明确 full_auto 待解锁状态和硬停机条件。
