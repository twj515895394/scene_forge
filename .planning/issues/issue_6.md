# Issue #6: 二三栏左右拖拽调整宽度与输入框禁用警告 (Draggable Columns & Input Notices)

## 要构建什么

在 Collaborative Feed（第二列）和 Output Artifact Visualizer（第三列）之间，实现可左右拖拽拉伸的边界划块。鼠标按住并左右拖动时能够动态改变第三列预览区的像素宽度，第二列自适应缩放。
另外，当子进程等待授权挂起（`hasPendingPrompt === true`）输入框被禁用时，在输入框内部渲染一行黄色的醒目警示提醒，引导用户前往上方卡片点击按钮进行决策。
最后，定制系统所有滚动条为极窄半透明的霓虹发光样式，并精细调整 AI 导演的标题字号与间距。

## 详细设计 (Detailed Design)

1. **左右拖拽 Resizer 设计**：
   - 在 `VariantB.tsx` 中增加 `const [previewWidth, setPreviewWidth] = React.useState<number>(600);`。
   - 在 `.variant-b-grid` 容器上添加 `ref={containerRef}`。
   - 插入拖拽条：
     ```tsx
    <div
       className={`variant-b-resizer ${isDragging ? 'dragging' : ''}`}
       onMouseDown={handleResizerMouseDown}
     />
     ```
   - 在 `handleResizerMouseDown` 中：
     - 记录按下时的 `startX = e.clientX` 与 `startWidth = previewWidth`。
     - 绑定全局鼠标移动和松开监听：
       ```typescript
       const handleMouseMove = (moveEvent: MouseEvent) => {
         const deltaX = moveEvent.clientX - startX;
         const containerWidth = containerRef.current?.getBoundingClientRect().width || 1200;
         const maxW = Math.floor(containerWidth * 0.7);
         // 左右拉拽：因为预览区在右侧，向左拖动（deltaX 为负）应增大宽度
         const newWidth = Math.max(250, Math.min(maxW, startWidth - deltaX));
         setPreviewWidth(newWidth);
       };
       ```
     - 鼠标松开时，移出监听器：
       ```typescript
       document.removeEventListener('mousemove', handleMouseMove);
       document.removeEventListener('mouseup', handleMouseUp);
       ```
   - 渲染时：
     - `.variant-b-feed` 拥有 `style={{ flex: 1 }}`。
     - `.variant-b-preview` 拥有 `style={{ width: `${previewWidth}px`, flexShrink: 0 }}`。

2. **输入框禁用警告**：
   - 当 `hasPendingPrompt` 为 `true` 时，在输入框上方或文本域内部渲染提示：
     `"⚠️ 等待授权决策中，请在上方卡片进行选择以继续..."`。
   - 保证文本域背景和发送按钮的视觉状态为高对比置灰。

3. **极简暗黑霓虹滚动条**：
   - 在 `variant-b-chat.css` 中覆盖全局或组件局部的滚动条样式：
     ```css
     .variant-b-feed-viewport::-webkit-scrollbar,
     .variant-b-sidebar::-webkit-scrollbar,
     .preview-content-b::-webkit-scrollbar {
       width: 6px;
       height: 6px;
     }
     .variant-b-feed-viewport::-webkit-scrollbar-thumb,
     .variant-b-sidebar::-webkit-scrollbar-thumb,
     .preview-content-b::-webkit-scrollbar-thumb {
       background: rgba(255, 255, 255, 0.08);
       border-radius: 3px;
     }
     .variant-b-feed-viewport::-webkit-scrollbar-thumb:hover,
     .preview-content-b::-webkit-scrollbar-thumb:hover {
       background: rgba(0, 240, 255, 0.2);
     }
     ```

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **分栏拖拽事件释放校验**：拖拽过程中即使鼠标滑出了浏览器视口，释放鼠标后也必须能正确销毁 `mousemove` 监听。不应产生卡死或持续黏连拖拽的现象。
- [ ] **拖拽条发光反馈验证**：鼠标悬停在分栏线上时，分栏线必须呈现高度为 100% 的发光效果。长按拖动时，分栏线呈现为高亮青色。
- [ ] **授权禁用警告验证**：当页面出现 🛡️ 授权卡片时，验证输入区 placeholder 是否变为黄色高对比度提示，且文字明确引导去“上方卡片进行选择”。
- [ ] **极窄滚动条视觉复核**：检查中间 Feed 面板和右侧预览面板的滚动条，其粗细不能超过 `6px`，轨道透明，不能影响整体暗黑无边界一体性。

## 被阻塞于

- Issue #1: AI 侧卡片宽度对齐与表格超长溢出处理
- Issue #4: 第一列（SOP 管线栏）折叠收起与中英双语双态面板
