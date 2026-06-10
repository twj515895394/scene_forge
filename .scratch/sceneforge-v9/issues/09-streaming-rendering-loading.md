Status: closed

# Issue 09: 执行中的实时流式渲染与 Loading 指示器 (Streaming & Loading Indicator)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

在 Claude 思考或执行工具时，界面给人的感觉是卡死，然后突然吐出一大块内容。我们需要设计实时流式渲染状态和工作指示器：
1. **工作状态气泡 (Loading Bubble)**：当前端收到 `run_status` 中 `running = true` 时，在聊天消息列表的最底部追加一个特殊的 AI 工作指示器气泡：
   - 显示 "AI DIRECTOR IS THINKING" 状态。
   - 带有脉冲效果的蓝色指示灯 (`.dot-blink-blue`)。
   - 带有经典的三点弹跳打字动画 (`.typing-dot`)。
2. **CSS 动画与版面微调**：在 `variant-b-chat.css` 中，为打字指示器添加 keyframes 动画，确保动画流畅且占用的 CPU/GPU 资源极小。

## 验收标准

- [ ] 用户发送消息后，底部立即渲染一个呼吸状态的 "AI DIRECTOR IS THINKING" 工作气泡。
- [ ] 工作气泡中的三个打字点以正弦波周期性连续上下弹跳。
- [ ] 当 `agentRunning` 变为 `false` 时，该指示气泡立即被移出消息列表，聊天窗口滚动到底部。

## 被阻塞于

无 - 可立即开始
