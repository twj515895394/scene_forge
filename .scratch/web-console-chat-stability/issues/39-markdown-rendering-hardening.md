Status: completed

# Issue 39: 聊天与预览 Markdown 渲染兜底

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

修复聊天内容和右侧预览中偶发的 Markdown 标签残留，例如 `###分段覆盖|...` 因标题标记后缺少空格而没有被解析。

## 验收标准

- [ ] 支持 `#中文标题`、`##中文标题`、`###中文标题`。
- [ ] 表格仍能正常渲染，不被标题解析破坏。
- [ ] 聊天和右侧预览使用同一兜底规则。

## 被阻塞于

无 - 可以立即开始

## 实施记录

- Markdown renderer 标题规则已支持 `#中文标题`、`##中文标题`、`###中文标题`。
- 该 renderer 同时服务聊天内容和右侧预览内容。
- 已通过 Web Console build 验证。
