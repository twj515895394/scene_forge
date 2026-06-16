Status: ready-for-agent

# Issue 12: 全局视觉 Token 与排版系统重建

## 父问题

[07-ui-visual-system-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)

## 要构建什么

先把 `apps/web-console` 的视觉基础层统一下来，定义新的全局色彩、背景层级、文本层级和 spacing rhythm，让后续左栏、聊天区、预览区都建立在同一套视觉 token 和排版系统上，而不是继续各写各的局部样式。

这张票不负责具体重做某个业务组件，而是提供整个 Variant B 的新基线：更耐读的正文字体、更清晰的字号刻度、更稳定的暗色层级和统一的状态色使用方式。

## 验收标准

- [ ] 建立统一的颜色 token、面板层级和文本层级定义，并被 Variant B 主界面使用。
- [ ] 正文、元信息、状态 badge、代码/路径四类文本有明确字体与字号分工。
- [ ] 当前界面中显著过小的字号被收口到可读范围，不再大量依赖 8px/9px 字号。
- [ ] 新视觉基底符合 `Quiet Command Center` 方向：低饱和深色、弱装饰、强层级。

## Code Review 严格验收标准

- [ ] 审查必须确认 token 是全局可复用的，而不是散落在单个组件中的硬编码颜色替换。
- [ ] 审查必须确认正文字体与等宽字体边界清晰，不再把大段正文继续渲染成终端感样式。
- [ ] 审查必须确认状态色仅承担状态表达，不再混作主要品牌色。
- [ ] 必须有至少一处对主要界面区域的前后对照验证，证明新基线已被真实接入。

## 被阻塞于

- [Issue 07: Web Console UI 视觉系统与侧栏产物布局重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)
