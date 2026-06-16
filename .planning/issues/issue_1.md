# Issue #1: AI 侧卡片宽度对齐与表格超长溢出处理 (AI Card Alignment & Overflow Wrap)

## 要构建什么

在 `VariantB` 前端渲染中，实现 AI 侧所有卡片（包括普通文字回答 `.ai-wrapper`、思考卡片 `.thought` 以及工具调用卡片 `.claudian-tool-call-container`）在 Collaborative Feed 面板内的水平宽度完美齐平对齐。
同时，修复 Markdown 渲染中的文本硬穿透与表格超出气泡边界的问题。当文字、文件路径或表格单元格包含超长连续无空格字符串时，应自动进行折行换行；对于多列的超宽表格，其应该能够支持在气泡卡片内部进行横向滚动展示，而不破损或重合右侧的分栏边界。

## 详细设计 (Detailed Design)

1. **宽度齐平方案**：
   - 移除 `.chat-bubble-b.ai-wrapper` 的 `max-width: 85%`，并将其设为 `width: 100%; max-width: 100%; align-self: stretch;`。
   - 统一让 `.chat-bubble-b.thought`、`.claudian-tool-call-container` 拥有与 AI 气泡相同的 `width: 100%; max-width: 100%; align-self: stretch;` 排布，确保三者两端对齐。
   - 对 AI 文本气泡内层 `.ai-bubble` 设置 `min-width: 280px; width: 100%;`，以防极短文本（如 "Go"）使卡片坍塌过窄。
   - 用户侧气泡 `.chat-bubble-b.user-wrapper` 保持 `align-self: flex-end; max-width: 75%;` 结构，拉开对比。

2. **表格与长路径折行与滚动设计**：
   - 在 `App.tsx` 的 `renderMarkdown` 表格解析正则中，将生成的 `<table>` 统一包裹在 `<div class="md-table-wrapper">` 容器中。
   - 增加 CSS 样式：
     ```css
     .md-table-wrapper {
       width: 100%;
       overflow-x: auto;
       -webkit-overflow-scrolling: touch;
       margin: 16px 0;
     }
     .markdown-body-b {
       word-break: break-word;
       overflow-wrap: anywhere;
     }
     .markdown-body-b td,
     .markdown-body-b code,
     .markdown-body-b pre {
       word-break: break-word;
       overflow-wrap: anywhere;
     }
     ```
   - 这样可以确保单字路径（如 `/Users/tangwujun/...`）在 `<code>` 或表格单元格中自动换行，且多列的大表格可以在内部横向滚动，不撑开整体卡片宽度。

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **宽度对齐验证**：检查 AI 文本卡片、思考块卡片和工具执行卡片，三者在左右边界上必须完全平齐，无任何像素偏差或缩水。
- [ ] **短内容防坍塌**：当 AI 返回极其简短的应答时，卡片宽度不应少于 `280px`，必须保持优雅的排版感。
- [ ] **代码/路径换行检查**：在对话中发送超长的文件路径（例如 `projects/datouerzi/details/topic_gate_output_v1.md`），验证文字在 `<code>` 或普通文本中均能按字符折行，绝不能破坏卡片右边缘。
- [ ] **超宽表格验证**：生成一个多列的表格，验证其外层被 `.md-table-wrapper` 包裹，且能够进行顺滑的横向拖动滚动，表格右边界不超出卡片主轮廓。

## 被阻塞于

无 - 可以立即开始
