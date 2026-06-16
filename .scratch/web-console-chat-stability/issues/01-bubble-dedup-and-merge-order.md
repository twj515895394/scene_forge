Status: mostly-complete

# Issue 01: 聊天气泡去重与历史/实时合并时序收口

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

在 Web Console 中，当前历史加载、项目切换、手动载入会话与实时 WebSocket 输出使用了多套不同的气泡注入路径，导致同一轮 assistant 内容在某些时序下被重复显示。需要收口为一套稳定的气泡唯一键与归并策略，让 `history`、`load_session`、实时 `output` 与 `prompt_ui` 都通过同一个合并规则进入聊天流。

此切片完成后，用户进入 `test-project-001`、载入历史、继续对话时，不会再看到同一轮消息重复显示两次。

## 验收标准

- [ ] 进入 `test-project-001` 并加载已有会话时，同一轮用户消息与 assistant 回复不会重复出现。
- [ ] 历史载入后继续发送新消息，实时输出不会因为 `history`/`output` 双注入再次复制已有气泡。
- [ ] `prompt_ui`、`tool_call`、`thought`、`text` 四类气泡都遵循同一套唯一键和合并策略，不会因类型不同而逃逸去重。

## Code Review 严格验收标准

- [ ] 代码审查必须能明确指出“唯一键来源”和“合并入口”分别是什么，不能继续存在多处各自维护的隐式去重逻辑。
- [ ] 必须有回归测试覆盖“先加载历史，再继续对话”的重复渲染场景，且测试断言使用 bubble 数量或稳定 key，而不是肉眼截图判断。
- [ ] 不允许为了消除重复而直接丢弃有效气泡类型；`text`、`thought`、`tool_call`、`prompt_ui` 都必须保真。

## 被阻塞于

无 - 可以立即开始

## 当前审计结论（2026-06-13）

- 已有实现：历史 `history`、实时 `output`、`prompt_ui` 的合并入口已经明显收口，服务端与前端都补了语义级去重与诊断日志。
- 当前现实：主症状已不再表现为“大面积重复两次”，残余问题更集中在长消息渲染与个别复杂 turn 的显示噪声。
- 结论：本票可调整为“基本完成”。若后续在复杂会话里再次观察到稳定重复，再作为聊天流后续优化的一部分继续收尾。
