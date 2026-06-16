Status: completed

# Issue 38: scene-forge 确认闸门支持执行策略

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

更新项目内 `scene-forge` 总控 skill 的确认闸门规则，让它按 `execution_policy.mode` 区分快速执行和全自动执行。

## 验收标准

- [ ] `fast_production` 中执行型阶段可以自动落盘汇报。
- [ ] `full_auto` 中 topic/script 前置确认完成后，后续阶段自动执行。
- [ ] full_auto 未解锁时不得跳过 topic/script 的时长、分段和改编方向确认。
- [ ] 硬错误仍会暂停。

## 被阻塞于

- [Issue 37: 执行策略注入 Agent 上下文](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/37-execution-policy-agent-context-injection.md)

## 实施记录

- 项目内 `scene-forge` 总控 skill 的确认闸门已支持 `fast_production` 与 `full_auto`。
- fast 模式下 reference/story/assets/performance/audio/publish_review 可自动落盘汇报。
- full_auto 解锁条件、自动阶段和硬停机条件已写入总控规则。
