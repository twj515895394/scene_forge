Status: closed

# Issue 05: 本地虚拟终端与聊天交互桥接 (PTY Terminal Bridge)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

在 GUI 后台进程（Node.js 服务端）使用 `node-pty` 库托管命令行子进程，并将 CLI 的交互输入与输出流通过 WebSocket 暴露给 Web UI。

主要模块设计：
1. **TerminalBridge.ts**：在当前 workspace 派生子进程，并加载 `claude` / `codex` 命令行进程。
2. **OutputParser.ts**：
   - 清除 ANSI 特殊字符。
   - 解析 Agent 的思考过程与工具调用过程，把 markdown 渲染与 diff 展示切片并转化为 Chat Bubble。
3. **输入劫持与宏命令注入**：当用户在 GUI 界面触发特定卡片操作时（如“开始阶段”、“发送错误以引导修复”），UI 服务端直接将预制指令（`/run scene-forge validate` 和 handoff 数据）写入终端 stdin 会话以驱动 Agent 运行。

## 验收标准

- [ ] Node 服务能够正常派生 `claude` 终端子进程，并模拟按键发送。
- [ ] 终端的输出数据流被 Parser 过滤掉多余的 loading 转轮和控制符后，流式合并为 Markdown Chat Bubble 发送至 WebSocket。
- [ ] 隐式输入注入运行平稳，能正确劫持并自动调用 `/run` 相关的校验及 start 流程。

## 被阻塞于

- [Issue 04: 稳定化 CLI JSON API (CLI Interface Freeze)](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/04-cli-json-api.md)
