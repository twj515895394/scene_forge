Status: closed

# Issue 10: 权限设置按钮与自动授权选项 (Permissions Configuration Switch)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

在非交互式子进程中运行时，Claude 的写入/执行工具常因未获授权而报错拦截，导致管线中断。我们需要提供配置开关和选项：
1. **自动授权开关**：在 UI 顶部 Header 左侧添加一个权限控制状态按钮：
   - 绿色高亮 `🛡️ 自动授权 (Auto-Approve)` 或 黄色警告 `🛡️ 安全限制 (Protected)`。
   - 状态使用 `localStorage` 持久化，防刷新丢失。
2. **命令参数动态注入**：
   - 前端向 WebSocket 发送消息时，将当前 `bypassPermissions` 偏好状态内联传入 payload。
   - 后端解析到 `bypassPermissions: true` 时，自动在 Claude CLI 启动参数中追加 `--dangerously-skip-permissions`，从而在沙箱中跳过一切读写确认弹窗，实现全自动 AFK 管线推进。

## 验收标准

- [ ] Web Console 顶栏成功渲染带有颜色反馈的自动授权切换按钮。
- [ ] 切换按钮的状态能够正常持久化到浏览器的 `localStorage` 中。
- [ ] 开启自动授权时，Claude Code 的写入操作（如写入 `PROJECT_BOARD.md` 或 `details/` 产物）能够直接成功，不再报 "haven't granted permission yet" 错误。

## 被阻塞于

无 - 可立即开始
