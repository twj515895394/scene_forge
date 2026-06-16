Status: ready-for-agent

# Issue 13: Pipeline Flow 与阶段产物列表视觉重构

## 父问题

[07-ui-visual-system-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)

## 要构建什么

把左侧 `Pipeline Flow` 和其展开后的阶段产物列表从“功能性列表”升级成结构清晰、靠左稳定、适合扫读的导航面板。重点解决当前展开区右缩、文件名被挤压、空态弱和父子层级关系不清的问题。

这张票只聚焦视觉与布局，不负责新增跨阶段浏览逻辑；其目标是把现有左栏做成一套稳定、好读、好点的阶段导航面板。

## 验收标准

- [ ] 展开后的产物列表整体视觉重心回到左侧，不再明显右缩。
- [ ] 文件图标、文件名、kind badge 形成稳定三列布局，长文件名不会被严重挤压。
- [ ] “暂无交付产物”使用结构化空态，而不是弱文本占位。
- [ ] 阶段主卡与展开区的父子关系清晰，展开后像一套连续结构而不是悬浮补丁。

## Code Review 严格验收标准

- [ ] 审查必须确认这张票解决的是左栏整体视觉组织，而不只是微调单个 margin/padding。
- [ ] 审查必须确认 stage 主行、展开区、文件行三层视觉层级可稳定区分。
- [ ] 审查必须确认在窄宽度侧栏下文件名仍具备基本可读性。
- [ ] 必须有至少一组覆盖“有产物阶段”和“空阶段”的视觉验证结果。

## 被阻塞于

- [Issue 07: Web Console UI 视觉系统与侧栏产物布局重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)
- [Issue 12: 全局视觉 Token 与排版系统重建](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/12-visual-tokens-and-typography.md)
