Status: ready-for-agent

# Issue 15: Web Console 视觉回归与验收固化

## 父问题

[07-ui-visual-system-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)

## 要构建什么

在视觉主线完成后，把新的 UI 基线固化成一套可重复验收的对照标准，避免后续修功能时重新把字号、层级、侧栏布局和聊天密度打乱。这张票负责沉淀视觉回归清单、关键场景截图点位或人工验收步骤，而不是继续做新设计。

重点覆盖：

- 左栏展开区
- 空态与有产物态
- 用户/AI/工具/思考混排
- 三栏布局在主场景宽度下的整体层级

## 验收标准

- [ ] 存在一套面向 Web Console 的视觉验收清单，覆盖左栏、中栏、右栏关键场景。
- [ ] 清单能区分“排版退化”“层级混乱”“展开区右缩”“字体回退”这类典型回归。
- [ ] 至少包含一组有产物阶段与一组多类聊天气泡混排的验收参考。
- [ ] 后续实现票可以直接复用该清单做视觉回归。

## Code Review 严格验收标准

- [ ] 审查必须确认这张票产出的是可重复执行的视觉验收标准，而不是主观评价。
- [ ] 审查必须确认验收项覆盖视觉主线的关键风险区，而不只是随便截几张图。
- [ ] 如果自动化有限，也必须留下明确的人工通过/失败判定标准。
- [ ] 视觉验收必须与 12-14 的新基线一致，不能继续沿用旧界面参考。

## 被阻塞于

- [Issue 12: 全局视觉 Token 与排版系统重建](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/12-visual-tokens-and-typography.md)
- [Issue 13: Pipeline Flow 与阶段产物列表视觉重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/13-pipeline-flow-and-artifact-list-visual-refresh.md)
- [Issue 14: 聊天区气泡、工具卡片与思考区视觉统一](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/14-chat-surface-visual-unification.md)

## 当前审计结论（2026-06-12）

- 已新增视觉回归基线文档：[visual-regression-checklist.md](/Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/visual-regression-checklist.md)
- 清单覆盖左栏展开区、三栏主工作台、聊天区混排、正文密度、右栏预览和关键混合场景。
- 清单提供了明确的通过/失败判定与静态验收命令，可直接复用于后续视觉回归。
