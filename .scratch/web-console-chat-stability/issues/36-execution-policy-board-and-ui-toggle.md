Status: completed

# Issue 36: 执行模式 PROJECT_BOARD 写入与 UI 切换

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

在左侧 Pipeline Flow 标题区增加 `快速 / 全自动` 执行模式切换，并把模式写入当前项目的 `PROJECT_BOARD.md.execution_policy`。

## 验收标准

- [ ] 默认模式为 `fast_production`。
- [ ] 用户切换到全自动后，`PROJECT_BOARD.md` 写入 `execution_policy.mode: full_auto`。
- [ ] 全自动前置确认未满足时 UI 显示待解锁。
- [ ] 切换不触发阶段推进、不生成产物。

## 被阻塞于

无 - 可以立即开始

## 实施记录

- 新增 `POST /api/projects/active/execution-policy`，写入当前项目 `PROJECT_BOARD.md.execution_policy`。
- 左侧 Pipeline Flow 标题区新增 `快速 / 全自动` 二段式切换。
- 缺省模式按 `fast_production`。
- 全自动前置未满足时显示 `全自动·待解锁`。
