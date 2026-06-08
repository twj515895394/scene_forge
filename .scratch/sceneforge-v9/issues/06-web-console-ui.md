Status: closed

# Issue 06: 构建 Web Console 界面与文件监听机制 (GUI & Watcher)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

在底层 CLI API 与 PTY 后台集成完毕后，构建本地三栏前端 Web UI 展现：
1. **左侧（Pipeline看板）**：呈现状态机的完整流程图（ready -> completed），显示每一阶段 validator 红绿灯。
2. **中间（Chat 创作面板）**：渲染流式 Chat Bubble 对话框，对接 stdin 发送输入。
3. **右侧（Artifact/Diff 预览区）**：直接以 Markdown 呈现 outputs 下的 final 交付物，提供历史版本的 markdown 渲染与 Diff 视图，突出显示错误行。
4. **工作区热重载 (File Watcher)**：在后台编写 `FileWatcher.ts`（使用 `chokidar`），实时监听整个工作区的 `outputs/`、`details/` 和 `PROJECT_STATE.json`。每当 CLI/Agent 写入新产物或改变状态，前端界面通过 WebSocket 推送局部无感刷新视图。
5. **一键审批（Approve / Re-run）**：按钮直接调底层 CLI 的 validate 和 complete。

## 验收标准

- [ ] Web Console 能够无感加载、显示流式对话。
- [ ] 工作区一旦被 Agent 或人工修改，右侧 markdown 产物预览和 Diff 会在 500ms 内自动重新渲染。
- [ ] 界面上的状态灯状态和磁盘上的 `PROJECT_STATE.json` 保持完全的双向实时同步。

## 被阻塞于

- [Issue 05: 本地虚拟终端与聊天交互桥接 (PTY Terminal Bridge)](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/05-claudian-pty-bridge.md)
