Status: completed

# Issue 49: Confirmation Gate Hardening

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

强化 design / storyboard / video_prompts 三个关键阶段的确认闸门：快速执行模式下确认字段缺失也视为未确认；全自动模式必须具备明确解锁信号，不能只凭 `execution_policy.mode = full_auto` 跳过确认。

## 验收标准

- [x] 快速执行模式下，确认字段为 `pending` 或缺失都校验失败。
- [x] 确认字段为 `confirmed` 时允许继续校验后续契约。
- [x] `full_auto` 模式缺少明确 unlock 信号时校验失败。
- [x] validator 测试覆盖 design / storyboard / video_prompts 至少各一个关键闸门路径。

## 实施记录

- 抽出 validator 确认闸门 helper。
- 复用 Web Console 已有 full_auto 解锁条件：topic、style family、style、script confirmed，加目标总时长和分段时长。
- 验证通过：`pnpm --filter @scene-forge/engine build && pnpm --filter @scene-forge/engine test`。

## 被阻塞于

无 - 可以立即开始
