Status: ready-for-agent

# Issue 11: 全局 All Artifacts 面板与预览状态管理

## 父问题

[08-stage-artifact-access-design.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)

## 要构建什么

在左栏阶段内产物浏览之外，再补一条全局路径：`All Artifacts` 面板。它服务于“我不想顺着阶段找，我只想把所有阶段产物集中浏览”的需求。同时，这张票还要把右侧预览区的自动/手动选择状态理顺，避免用户刚点开历史阶段产物，就被当前阶段自动预览抢回。

完成后，用户应该能够：

- 从全局入口查看所有阶段的产物
- 按阶段分组浏览
- 点击任意产物直接在右侧预览
- 手动打开历史阶段文件后保持当前查看上下文，直到主动返回当前阶段主产物

## 验收标准

- [ ] 界面中存在全局 `All Artifacts` 入口，并能打开跨阶段产物浏览面板。
- [ ] 面板按阶段分组展示所有可查看产物，且能直接切换右侧预览。
- [ ] 右侧预览明确显示当前查看的是哪个阶段、哪个文件，以及是自动选中还是手动打开。
- [ ] 用户手动打开历史阶段产物后，不会被后续当前阶段自动预览立即覆盖。
- [ ] 存在“返回当前阶段主产物”入口，允许用户回到自动预览模式。

## Code Review 严格验收标准

- [ ] 审查必须确认 `All Artifacts` 不是左栏的简单复制，而是真正的跨阶段集中索引入口。
- [ ] 审查必须确认右侧预览区存在清晰的自动/手动状态边界，不再发生用户选择被静默抢走。
- [ ] 审查必须确认多阶段产物切换时，当前查看上下文是可见的，不会让用户迷失。
- [ ] 必须有验证覆盖“从当前阶段跳到历史阶段文件，再返回当前阶段”的完整路径。

## 被阻塞于

- [Issue 08: 阶段产物可访问性与产物浏览体系设计](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)
- [Issue 09: 阶段映射统一与产物索引接口标准化](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/09-artifact-index-and-stage-mapping.md)
- [Issue 10: 左侧阶段卡与阶段内产物浏览重构](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/10-sidebar-stage-artifact-browser.md)
