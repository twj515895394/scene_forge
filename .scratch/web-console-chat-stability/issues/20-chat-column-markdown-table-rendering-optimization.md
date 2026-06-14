Status: completed

# Issue 20: 聊天栏原生 HTML 表格支持与溢出滚动美化

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

在当前的 Web Console 聊天视图中，Markdown 格式的表格数据会在前端渲染前被强制转换并扁平化为 `项目 | 内容` 样式的文本行。这种展示方式视觉效果较差，且降低了数据的结构化表现力。

本任务需要：
1. 移除 `App.tsx` 在渲染聊天内容时强行执行表格扁平化（`flattenMarkdownTablesForChat`）的逻辑。
2. 恢复聊天栏中原生的 HTML 表格渲染，并结合 CSS 设置让表格在聊天视口内获得美观、高对比度的亮青色表头（`th`）及条纹悬停背景。
3. 确保表格在较窄的聊天栏视口下，可以通过独立的滚动包装层（`.md-table-wrapper`）水平滑动查看（`overflow-x: auto;`），而绝不撑大或挤压聊天气泡布局本身。

## 验收标准

- [x] 聊天列中输出的表格不再是以管道符 `|` 分割的文本行，而是由 `<table>` 渲染的原生网页表格。
- [x] 原有的辅助扁平化函数 `flattenMarkdownTablesForChat` 已从前端组件中彻底删除。
- [x] 聊天栏内渲染的表格拥有深色背景和亮青色表头，与控制台主色调契合，且行高亮 Hover 样式生效。
- [x] 缩小聊天视口宽度时，表格上方应正常出现水平滚动条且允许单独滑动，聊天气泡本身没有发生错位或宽度溢出。
- [x] `pnpm run build` 构建成功且无错误。

## 被阻塞于

- [Issue 19: Web Console CSS 样式模块化单一职责重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/19-variant-b-chat-css-modular-refactoring.md)
