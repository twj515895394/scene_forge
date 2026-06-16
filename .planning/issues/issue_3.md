# Issue #3: Markdown 渲染器全标签重构 (Markdown Tag Render Upgrades)

## 要构建什么

重构 `App.tsx` 中的 `renderMarkdown` 功能，以支持高保真的 Markdown 全标签解析及渲染。解决原本列表无 Bullet 符号、引用块缺失排版、水平线直接显示为原始减号等简陋源码感的问题。
支持解析：水平分割线 (`---`/`***`)、块引用 (`> `)、有序列表 (`\d+\. `)、超链接 (`[text](url)`)、图片 (`![alt](url)`)，并为其设计高水准的暗黑太空霓虹 CSS。

## 详细设计 (Detailed Design)

1. **解析正则扩充**（在 `App.tsx` 中）：
   - **水平分割线**：
     `.replace(/^(?:---|\*\*\*)$/gm, '<hr class="md-hr" />')`
   - **超链接与图片**：
     `.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="md-img" src="$2" alt="$1" />')`
     `.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noopener">$1</a>')`
   - **块引用（Blockquote）**：
     匹配连续的 `> ` 开头行：
     ```typescript
     .replace(/((?:^> .*$\n?)+)/gm, (quoteBlock: string) => {
       const lines = quoteBlock.trim().split('\n');
       const content = lines.map(l => l.replace(/^>\s?/, '')).join('<br/>');
       return `<blockquote class="md-blockquote">${content}</blockquote>`;
     })
     ```
   - **有序列表（Ordered List）**：
     匹配连续的 `\d+\. ` 开头行：
     ```typescript
     .replace(/((?:^\d+\.\s+.*$\n?)+)/gm, (listBlock: string) => {
       const items = listBlock.trim().split('\n');
       return '<ol class="md-ol">' + items.map(item => {
         const content = item.replace(/^\d+\.\s+/, '');
         return `<li class="md-li">${content}</li>`;
       }).join('') + '</ol>';
     })
     ```

2. **太空霓虹 CSS 定制**（在 `variant-b-chat.css` 中）：
   - **列表 Bullet**：
     ```css
     .markdown-body-b .md-ul {
       padding-left: 20px;
       margin: 12px 0;
       list-style-type: square;
     }
     .markdown-body-b .md-li::marker {
       color: var(--accent-cyan); /* 青色霓虹列表符号 */
     }
     ```
   - **分割线**：
     ```css
     .md-hr {
       border: none;
       border-top: 1px solid rgba(217, 70, 239, 0.15); /* 霓虹紫 */
       margin: 16px 0;
       box-shadow: 0 0 8px rgba(217, 70, 239, 0.1);
     }
     ```
   - **块引用**：
     ```css
     .markdown-body-b .md-blockquote {
       border-left: 3px solid var(--accent-magenta);
       background: rgba(217, 70, 239, 0.02);
       padding: 8px 16px;
       margin: 12px 0;
       border-radius: 0 4px 4px 0;
       color: #d1b0ff;
     }
     ```
   - **超链接**：
     ```css
     .markdown-body-b .md-link {
       color: var(--accent-cyan);
       text-decoration: none;
       border-bottom: 1px dashed rgba(0, 240, 255, 0.4);
       transition: all 0.2s;
     }
     .markdown-body-b .md-link:hover {
       color: #fff;
       border-bottom-color: #fff;
       text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
     }
     ```

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **水平分割线解析验证**：在渲染结果中检查是否存在 raw 文本 `---`。所有的 `---` 必须被正确渲染成一条优雅的发光霓虹紫色横线。
- [ ] **无序列表 Bullet 验证**：无序列表卡片中，每项的前端必须出现深青色（Cyan）的实心小方块，缩进不可与左侧边缘对齐，需要保持 `20px` 缩进。
- [ ] **有序列表渲染验证**：含有 `1. ` `2. ` 的文本行，需要被 `<ol>` 正确包裹，并且能以 1, 2, 3 等序号递增展示。
- [ ] **引用框排版验证**：检测包含 `> ` 符号的输出内容。所有的 `>` 符号均已洗掉，且文字呈现出左边有洋红色（Magenta）粗边线、背景为淡紫色的高逼格卡片区。
- [ ] **链接点击安全校验**：链接必须能高亮显示，且点击时必须是以在新标签页打开的形式（`target="_blank" rel="noopener"`）跳转，不能导致当前 web-console 页面被刷新。

## 被阻塞于

无 - 可以立即开始
