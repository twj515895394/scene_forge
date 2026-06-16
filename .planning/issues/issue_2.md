# Issue #2: 隐藏流式空白卡片残影与 Thought 树状折叠线 (Filter Empty Loading Card & Thought Indentation)

## 要构建什么

在 `VariantB` 前端渲染中，对流式解析中尚未就绪（为空或仅包含空白字符）的思考块和工具块卡片进行隐藏处理，避免其在页面中折叠产生一像素宽度的暗紫色/灰色细横线条。
同时，美化展开后的 Agent 思考内容区，将原有的粉色 pre 大外框，改造成带有左侧垂直辅助发光线与缩进的“树状折叠线”样式，展现深度和层级感。

## 详细设计 (Detailed Design)

1. **空内容渲染隐藏**：
   - 在 `VariantB.tsx` 的 `{bubbles.map((b) => { ... })}` 渲染循环中：
     - 对于 `b.type === 'thought'`，如果 `!b.content || !b.content.trim()`，则返回 `null`（或将其包裹在隐藏节点中）。
     - 对于 `b.type === 'tool_call'`，首先尝试 JSON 解析，若解析出的 `toolInfo` 的 `result` 为空，且状态不为 `running`，则根据情况折叠或隐藏；若处于流式最早期没有任何输入和输出，则将其隐藏，直到有具体工具名。

2. **Thought 树状左侧辅助线设计**：
   - 移除 `.chat-bubble-b.thought` 原有的外围四周大框线（`border` 属性），改为极简风格。
   - 对思考块展开的内容区 `.thought-pre-b` 进行 CSS 改造：
     ```css
     .thought-pre-b {
       margin: 8px 0 8px 12px;
       padding: 8px 0 8px 16px;
       font-family: 'JetBrains Mono', monospace;
       font-size: 11px;
       color: #ff85c0;
       background: transparent; /* 去除深背景 */
       border-left: 2px solid rgba(217, 70, 239, 0.25); /* 紫色垂直树状线 */
       overflow-x: auto;
       white-space: pre-wrap;
       line-height: 1.5;
     }
     ```
   - 这样在视觉上，思考过程会缩进嵌在对话流中，有一条优雅的紫色细线将其从顶部贯穿到底部。

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **空内容消除验证**：在流式生成开始的前半秒，确认 Collaborative Feed 中绝对不会出现任何只有边框无文字的“扁细紫色/灰色横线”。
- [ ] **Thought 树状线渲染**：展开思考卡片，验证思考文本前部有且仅有一条垂直的紫色发光线，卡片不再有上下左右完整的外部粉红边框，背景与对话视口融为一体。
- [ ] **Thought 边距确认**：垂直线与左右文字保留至少 `16px` 的安全 padding 间距，样式精细不局促。

## 被阻塞于

无 - 可以立即开始
