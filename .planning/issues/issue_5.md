# Issue #5: 阶段产物手风琴级联菜单与点击投射预览 (Stage Artifacts Accordion & Click Projection)

## 要构建什么

在左侧 SOP 管线列表中，为每个阶段实现一个手风琴式（Accordion）级联展示。
如果某个阶段在 `projectState` 的状态中为 `completed`（或已有产物），点击下拉小 Chevron 按钮后，能动态从后端加载该阶段注册在 `artifacts.manifest.yaml` 下的物理产物文件列表（如 `outputs/topic.md`）。
点击其中的产物名称时，该文件的路径会被直接投射给第三列（Output Artifact Visualizer），实现无感无刷新的 Markdown 高保真渲染。

## 详细设计 (Detailed Design)

1. **手风琴展开与按需拉取**：
   - 在 `VariantB.tsx` 中定义状态：
     ```typescript
     const [expandedStages, setExpandedStages] = React.useState<Record<string, boolean>>({});
     const [stageArtifacts, setStageArtifacts] = React.useState<Record<string, any[]>>({});
     ```
   - 编写级联点击切换函数：
     ```typescript
     const handleToggleStage = async (stg: string, e: React.MouseEvent) => {
       e.stopPropagation(); // 阻止触发宏命令开始阶段
       const nextVal = !expandedStages[stg];
       setExpandedStages(prev => ({ ...prev, [stg]: nextVal }));
       
       if (nextVal && !stageArtifacts[stg]) {
         try {
           const res = await fetch(`/api/artifacts?stage=${encodeURIComponent(stg)}`);
           if (res.ok) {
             const list = await res.json();
             setStageArtifacts(prev => ({ ...prev, [stg]: list }));
           }
         } catch (err) {
           console.error('Failed to load artifacts for', stg, err);
         }
       }
     };
     ```

2. **嵌套列表 UI 渲染**：
   - 在阶段卡片的右侧加上一个 Chevron 箭头按钮：
     ```tsx
     <span
       onClick={(e) => handleToggleStage(stg, e)}
       className="p-1 hover:bg-white/10 rounded cursor-pointer transition-transform"
       style={{ transform: expandedStages[stg] ? 'rotate(90deg)' : 'rotate(0deg)' }}
     >
       ▶
     </span>
     ```
   - 在阶段卡片下方，如果 `expandedStages[stg]` 为真，则渲染嵌套的交付件列表：
     ```tsx
     {expandedStages[stg] && (
       <div className="stage-artifacts-list">
         {!stageArtifacts[stg] ? (
           <div className="artifact-item loading">加载中...</div>
         ) : stageArtifacts[stg].length === 0 ? (
           <div className="artifact-item empty">(暂无产物)</div>
         ) : (
           stageArtifacts[stg].map(art => (
            <div
               key={art.id}
               onClick={() => onSelectArtifact && onSelectArtifact(art.path)}
               className={`artifact-item ${previewPath === art.path ? 'active' : ''}`}
             >
              📄 {art.path.split('/').pop()}
               <span className="artifact-badge">{art.kind}</span>
             </div>
           ))
         )}
       </div>
     )}
     ```
   - 在 `variant-b-chat.css` 中为 `.stage-artifacts-list` 和 `.artifact-item` 添加精致缩进、悬停和高亮效果。

## Code Review 严格验收标准 (Acceptance Criteria)

- [ ] **按需网络请求校验**：检查浏览器 Network 面板。在初次点击 Chevron 展开某阶段时，必须发出一项且仅有一项 GET `/api/artifacts?stage=...` 请求。再次折叠展开时不应重复请求。
- [ ] **多阶段级联隔离**：展开 Stage A 的产物菜单时，必须完全与 Stage B 隔离。手风琴面板互不干扰。
- [ ] **点击投射渲染验证**：展开 `topic_gate`，点击 `topic.md` 产物。验证第三列（Preview 窗口）顶部的文件名称是否立即变为 `outputs/topic.md`，且内容框展示该文件的正确渲染。
- [ ] **当前激活高亮检查**：若第三列正在浏览的产物文件与当前显示的某阶段产物路径一致，侧边栏列表中该产物项前必须呈现出淡青色发光高亮以及文件小图标。

## 被阻塞于

- Issue #4: 第一列（SOP 管线栏）折叠收起与中英双语双态面板
