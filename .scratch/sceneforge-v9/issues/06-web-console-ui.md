Status: ready-for-agent

# Issue 06: 构建 Web Console 界面与文件监听机制 (GUI & Watcher)

## 背景

在底层 CLI API 和后端 PTY 桥接层稳定后，需要提供直观的三栏 GUI，让用户能够通过界面查看生成阶段、聊天修正并一键推进/审核状态。

## 目标

1. 开发本地 Web Console 前端（Vite + React/Svelte），包含：
   - **左侧 Pipeline 面板**：显示每个阶段的状态、校验结果、耗时。
   - **中间 Chat 面板**：渲染 PTY 终端流式转译的聊天气泡，支持常规聊天输入。
   - **右侧 Artifact 预览与 Diff 视窗**：根据当前阶段，直接读取 `outputs/` 并使用 Markdown 渲染主交付件，支持历史版本 Diff，支持 Validator 错误行高亮。
2. 开发 `FileWatcher.js`（基于 chokidar / fs.watch）：监听工作区中的 artifacts 修改与 `PROJECT_STATE.json`。每当本地 CLI 写入新产物或改变状态，通过 WebSocket 实时通知前端进行组件局部热更新（Hot Reload）。
3. 支持一键式动作（如“点击 Approve”，在后台调用 `complete_stage` 并更新状态）。

## 验收标准

- [ ] Web Console 能够成功连接本地 Node 后端。
- [ ] 工作区手动修改分镜或提示词文件时，右侧预览及 Diff 会在 500ms 内自动刷新。
- [ ] 界面上的阶段红绿状态能与本地项目的 `PROJECT_STATE.json` 保持严格双向一致。
