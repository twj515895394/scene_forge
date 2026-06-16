Status: deferred

# Issue 05: 审批卡片交互闭环与状态关闭

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

参考 `claudian` 中 approval request / resolve 的思路，把 SceneForge Web Console 的审批卡片从“显示一个看起来能点的按钮”升级为“真正可点击、可回传、可结束”的交互闭环。用户点击批准、拒绝或其他选项后，后端必须收到对应决策，CLI/运行时能继续推进，前端卡片状态也必须随之关闭或更新为已处理。

此切片完成后，审批卡片不仅能看见，还能真正完成一次批准或拒绝，并在处理后结束等待状态。

## 验收标准

- [ ] 用户点击审批卡片上的选项后，后端能收到对应决策并把结果回传给运行中的会话。
- [ ] 审批通过后，原本阻塞的流程能继续执行；审批拒绝后，流程能得到明确拒绝反馈。
- [ ] 审批请求处理完成后，卡片会更新为已处理态或被正确关闭，不会一直悬挂在聊天流中。

## Code Review 严格验收标准

- [ ] 审查必须确认前端按钮点击与后端 request id / 当前活跃请求之间存在明确绑定，不能只靠“最近一次 prompt”这种脆弱假设。
- [ ] 必须有测试覆盖“批准继续”“拒绝停止”“请求已解决后卡片 dismiss”三种核心路径。
- [ ] 参考 `claudian` 的 request/resolve 思路时，只借鉴生命周期设计，不得把不属于本仓库的复杂抽象整包硬搬进来。

## 被阻塞于

- [Issue 04: 审批请求可见性修复](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/04-approval-request-visibility.md)

## 当前审计结论（2026-06-12）

- 已有部分实现：前端 `prompt_ui` 卡片、`prompt_response` 回传和 resolved/dismissed 生命周期已经接入过一版。
- 现实结果：由于 `04` 的可见性链路未稳定，且当前产品决策已经切换到“默认自动授权”，本票暂时失去执行前提。
- 结论：本票随 `04` 一并延后，当前不进入主执行序列。
