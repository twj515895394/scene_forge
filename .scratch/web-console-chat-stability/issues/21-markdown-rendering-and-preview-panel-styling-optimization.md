Status: completed

# Issue 21: 聊天内容与预览面板 Markdown 样式及元素排版深度优化

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

在对 CSS 进行模块化拆分后，我们需要针对聊天 feed 视口以及右侧 Markdown 预览面板中的各文本元素（代码块、任务列表、YAML Frontmatter 卡片、引用块、段落及分割线）进行精细化视觉体验提升。

任务包括：
1. 统一代码块 `.md-code-block` 样式并在全局 `variant-b-chat-markdown.css` 中定义，确保右侧预览栏也完美支持带背景色、圆角及小滚动条的代码块。
2. 引入原生 Markdown 任务列表（Task Lists `- [ ]` 和 `- [x]`）的识别逻辑，并在前端将其渲染为精致、带发光阴影的亮青色复选框，而非硬编码的 `[ ]`/`[x]`。
3. 优化 YAML Frontmatter 卡片为微透玻璃态布局，优化 Key/Value 配色，增强信息层级并移植到 Markdown 专属样式表。
4. 美化引用块 `.md-blockquote` 样式，增加亮青色粗指示边线及渐变背景。
5. 适度优化右侧预览栏的段落间距（从 `2px` 微调至 `6px`）和行高（由 `1.28` 设为 `1.4`），同时将分割线 `.md-hr` 改为渐变消隐线，从而兼顾视觉层次与文本可读性。

## 验收标准

- [x] 右侧预览面板中的代码块能正确渲染出深色背景、暗灰微光边框及圆角，行内长代码支持水平滚动条。
- [x] 聊天及预览面板中的 `- [ ]` 和 `- [x]` 任务列表可正确显示为自定义的精美勾选框。
- [x] YAML Frontmatter 卡片采用统一的玻璃态质感与 Key/Value 配色，并由 `variant-b-chat-markdown.css` 全权接管。
- [x] 引用块获得亮青边线和渐变背景，段落间距调整为 6px 且行高为 1.4。
- [x] `pnpm run build` 构建成功且无错误。

## 被阻塞于

- [Issue 20: 聊天栏原生 HTML 表格支持与溢出滚动美化](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/20-chat-column-markdown-table-rendering-optimization.md)
