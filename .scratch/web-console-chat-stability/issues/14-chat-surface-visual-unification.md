Status: ready-for-agent

# Issue 14: 聊天区气泡、工具卡片与思考区视觉统一

## 父问题

[07-ui-visual-system-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)

## 要构建什么

把当前聊天区中分裂的几套视觉语言统一起来：用户气泡、AI 回复、工具卡片、思考区、审批卡片都要建立在同一套 typography 和 panel hierarchy 上。目标不是让所有块看起来一样，而是让它们属于同一系统中的不同变体。

完成后，中栏应具备稳定的阅读节奏：正文优先、元信息退后、工具与思考信息可被快速区分，但不再彼此抢戏。

## 验收标准

- [ ] 用户消息、AI 回复、工具卡片、思考区至少共享统一的面板层级与文本层级。
- [ ] AI 回复正文可读性提升，标题与高亮标签不再压过正文。
- [ ] 工具卡片与思考区的装饰噪声被显著收敛，视觉主舞台回到结果内容。
- [ ] 聊天区整体从上到下形成统一节奏，不再像多个设计稿拼接。

## Code Review 严格验收标准

- [ ] 审查必须确认这张票做的是“系统统一”，而不是单独美化某一类气泡。
- [ ] 审查必须确认工具卡片、思考区与正文内容的视觉优先级排序清晰。
- [ ] 审查必须确认用户气泡仍保持对话方向感，但不喧宾夺主。
- [ ] 必须有至少一组覆盖多类气泡同时出现时的视觉验证结果。

## 被阻塞于

- [Issue 07: Web Console UI 视觉系统与侧栏产物布局重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)
- [Issue 12: 全局视觉 Token 与排版系统重建](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/12-visual-tokens-and-typography.md)

## 当前审计结论（2026-06-12）

- 已完成一轮聊天表面统一收敛，落点集中在 `apps/web-console/src/styles/variant-b-chat.css`。
- 用户气泡保留方向感，但阴影、边框、圆角都已弱化，不再压过正文。
- AI 正文、工具卡、思考区、审批卡已被拉回同一套 panel hierarchy 与 typography hierarchy。
- 当前验收方式以 `build + tests + codereview 式静态自审` 为主，暂未补浏览器实屏自动化验证。
