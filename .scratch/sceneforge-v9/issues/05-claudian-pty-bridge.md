Status: ready-for-agent

# Issue 05: 开发本地虚拟终端与聊天交互桥接 (PTY Terminal Bridge)

## 背景

我们放弃了复杂的 MCP Server，转而采用类似 Claudian 插件的嵌入式聊天模型：在 GUI 后台直接 spawn 本地 CLI（如 Claude/Codex）的 PTY 进程，并将其标准输入输出流（stdin/stdout）与 GUI 界面桥接。

## 目标

1. 在 `apps/web-console/server/` 下使用 `node-pty` 构建 PTY 进程托管服务端。
2. 编写 `TerminalBridge.js`：启动本地 shell 并在指定 workspace 运行 CLI 会话。
3. 编写 `OutputParser.js`：
   - 过滤 stdout/stderr 中的 ANSI Escape 码。
   - 解析 Markdown 文本块与工具执行指令。
   - 将流式终端字符提取为漂亮的聊天对话气泡（Chat Bubbles）与命令执行卡片。
4. 编写 Prompt/Command 自动注入模块：在用户操作 GUI 时（如开始阶段、校验打回时），自动向 CLI stdin 模拟写入 `/run scene-forge validate` 或 Validator 的结构化报错，引导 Agent 自行修复。

## 验收标准

- [ ] Node 服务能够正常 spawn 并管理 CLI 终端进程。
- [ ] 终端里的流式字符能够被 parser 正确提取为 Chat Bubble。
- [ ] 能向子进程的 stdin 成功注入模拟指令并获取预期 stdout 反馈。
