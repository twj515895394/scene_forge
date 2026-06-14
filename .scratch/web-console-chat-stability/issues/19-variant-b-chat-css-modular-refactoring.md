Status: completed

# Issue 19: Web Console CSS 样式模块化单一职责重构

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前 Web Console 的 `variant-b-chat.css` 文件已经累积至 1,420 行，混合了布局、列表、Markdown、输入表单、弹窗卡片等多重职责。这违反了单一职责原则，且增加了后期维护的复杂度。

本任务需要：
1. 备份原有的 `variant-b-chat.css` 文件。
2. 按照职责将现有样式拆分成三个独立、且行数均在 800 行以内的模块化 CSS 文件（Feed 视口布局、底部输入框与交互、产物预览面板与 Markdown 样式）。
3. 修改入口文件 `main.tsx` 引用这三个新样式表，确保整体样式和打包构建系统正常运行。

## 验收标准

- [x] 原庞大样式表已备份为 `variant-b-chat.css.bak`。
- [x] 原 `variant-b-chat.css` 已彻底移除，并生成了 `variant-b-chat-feed.css`、`variant-b-chat-inputs.css` 和 `variant-b-chat-markdown.css`。
- [x] 拆分后的每个样式文件行数均不超过 800 行。
- [x] 页面在编译打包和浏览器预览中的表现与拆分前保持完全一致。
- [x] `pnpm run build` 构建成功且无错误。

## 被阻塞于

无 - 可以立即开始
