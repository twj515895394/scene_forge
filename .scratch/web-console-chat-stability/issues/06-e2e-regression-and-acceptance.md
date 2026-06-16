Status: needs-followup

# Issue 06: test-project-001 端到端回归与验收剧本固化

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

把 `test-project-001` 的真实复现路径固化成端到端验收剧本，覆盖进入项目、加载历史、继续对话、显示思考、触发审批、点击审批和继续执行等关键路径。需要把这套剧本沉淀为可重复运行的回归测试步骤或最小脚本，确保后续修复不会再次回归。

此切片完成后，我们不再依赖人工口述“又坏了”，而是有一套固定的可执行验收步骤来判断聊天稳定性是否通过。

## 验收标准

- [ ] 存在一套围绕 `test-project-001` 的固定验收步骤，至少覆盖历史加载、实时思考、审批出现、审批交互四条路径。
- [ ] 回归验证能明确指出每条路径的预期结果，而不是笼统地写“页面正常”。
- [ ] 本轮 01-05 号工票修复的关键症状都能在验收剧本中被重复验证。

## Code Review 严格验收标准

- [ ] 审查必须确认验收剧本覆盖的是这轮真实出现过的故障，不是无关 happy path。
- [ ] 验收步骤需要有可操作输入和可观察输出，不能写成无法执行的抽象描述。
- [ ] 如果自动化受限，也必须留下最小人工验收清单，并标明每一步的通过/失败判定标准。

## 被阻塞于

- [Issue 01: 聊天气泡去重与历史/实时合并时序收口](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/01-bubble-dedup-and-merge-order.md)
- [Issue 02: 历史思考归一化与空白块清洗](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/02-history-thought-normalization.md)
- [Issue 03: 实时思考与历史思考统一气泡模型](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/03-unified-thought-stream-model.md)
- [Issue 05: 审批卡片交互闭环与状态关闭](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/05-approval-interaction-lifecycle.md)

## 当前审计结论（2026-06-12）

- 已有部分实现：关键解析层和若干回归测试已落地，但尚未形成面向 `test-project-001` 的完整端到端验收剧本。
- 现实变化：审批路径已被产品策略切换为“默认自动授权”，因此本票的验收内容需要根据新策略重写。
- 结论：本票仍需后续跟进，但要在视觉与产物主线推进后，按最新产品策略改写验收剧本。
