Status: closed

# Issue 08: 当前会话聊天记录持久化 (Chat History Persistence)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

在 Web Console 中，聊天记录在刷新页面或切换项目时会丢失。我们需要在项目目录中持久化当前会话 ID，并在连接时恢复历史：
1. **记录会话 ID**：在项目的 `projects/<project>/.active_session_id` 中保存当前活跃的 Claude session UUID。
2. **WebSocket 握手恢复**：当客户端通过 WebSocket 连接到服务器时，服务器读取项目下 `.active_session_id`：
   - 提取并读取 `~/.claude/projects/.../sessionId.jsonl` 中的历史对话记录。
   - 解析为 `ChatBubble` 对象数组，并通过 WebSocket 推送给客户端以恢复界面视图。
   - 如果 JSONL 存在且非空，在首次启动 Claude CLI 时，自动添加 `--resume <sessionId>` 且置 `isFirstMessage = false`。
3. **开始新会话更新**：用户在界面中点击 `+ 新会话` 时，生成新的 UUID 并更新 `.active_session_id`。

## 验收标准

- [ ] 刷新页面后，当前活跃项目的聊天记录可以完整回显恢复。
- [ ] 切换项目后，会自动加载并恢复目标项目的上一次活跃会话。
- [ ] 点击 "+ 新会话" 后，历史气泡清除，且能成功发起独立的全新 Claude 会话。

## 被阻塞于

无 - 可立即开始
