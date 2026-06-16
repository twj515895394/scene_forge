# Issue #4: 第一列（SOP 管线栏）折叠收起与中英双语双态面板 (Collapsible Sidebar & Bilingual Stages)

## 要构建什么

对前端左侧的 SOP 管线栏进行整体交互与布局重构。
支持通过顶栏的开关按钮将左侧栏进行折叠收起（宽度归 0 隐藏，释放屏幕空间给聊天对话区）。
同时，侧边栏中的各个阶段展示为“英文 + 中文双语名称”（如 `Topic Gate (选题吸入)`），并带状态指示。
为当前正处于的活动管线阶段（`current_stage`）添加高亮的垂直霓虹青色发光指示条。

## 详细设计 (Detailed Design)

1. **侧边栏折叠交互**：
   - 在 `VariantB.tsx` 中引入 `const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);`。
   - 在 `variant-b-header` 的左侧区域（返回大厅按钮右侧）添加一个切换按钮：
     ```tsx
     <Button
       variant="ghost"
       size="icon"
       onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
       title={sidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
       className="text-muted-foreground hover:text-white"
     >
       {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
     </Button>
     ```
   - 在 `variant-b-layout.css` 中将 Grid 布局改为 Flex 布局，并为 `.variant-b-sidebar` 添加动画过渡：
     ```css
     .variant-b-sidebar {
       width: 270px;
       min-width: 270px;
       max-width: 270px;
       flex-shrink: 0;
       transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
       opacity: 1;
       overflow: hidden;
     }
     .variant-b-sidebar.collapsed {
       width: 0px !important;
       min-width: 0px !important;
       max-width: 0px !important;
       opacity: 0;
       border-right: none;
     }
     ```

2. **中英双语与高亮状态设计**：
   - 将侧边栏渲染卡片里的阶段名称替换为全称 `STAGE_NAMES[stg]`，确保英文+中文显示。
   - 对当前激活阶段 `.stage-card-b.current` 或有 `.active` 类的高亮显示进行重写：
     - 在左侧应用 `border-left: 3px solid var(--accent-cyan);`。
     - 为其设置向右微微偏移动画和淡青色背景阴影：
       ```css
       .stage-card-b.current {
         border-left: 3px solid var(--accent-cyan);
         padding-left: 11px; /* 补偿 border 宽度 */
         background: rgba(0, 240, 255, 0.04);
         box-shadow: inset 5px 0 15px rgba(0, 240, 255, 0.02);
       }
       ```

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **折叠状态切换验证**：点击顶栏按钮，侧边栏必须在 `0.3s` 内顺滑缩窄至 `0` 并且完全消失。聊天和预览区域会自动伸长填充其原本占据的 `270px` 空间。再次点击能完美弹回。
- [ ] **多端对齐验证**：当侧边栏缩回或展开时，不能出现任何多余的 `1px` 白边或背景裂缝，且过渡动画不可卡顿。
- [ ] **双语与状态核对**：检查侧边栏的 7 个阶段：
  - 必须完整包含中英文，如 `Topic Gate (选题吸入)`、`Script (剧本开发)`、`Audio (声音导演)` 等。
  - 右侧状态徽标（Done、Run、Idle）能根据 `projectState` 的状态实时反应。
- [ ] **当前活动高亮指示**：项目正在进行的阶段卡片左侧，必须显现一条极为高亮的发光青色（Cyan）垂直长方块，提示用户这是当前主要任务。

## 被阻塞于

无 - 可以立即开始
