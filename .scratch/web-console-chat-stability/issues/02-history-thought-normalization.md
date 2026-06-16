Status: completed

# Issue 02: 历史思考归一化与空白块清洗

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前历史会话中的 thought 解析只处理了最浅层的空字符串情况，仍然会把只包含换行、缩进、重复 chunk 拼接结果的伪空白思考块渲染到聊天流中，造成大量空白行。需要对历史 JSONL 的 thought 恢复做归一化清洗，只保留真实可读的思考内容。

此切片完成后，用户在历史会话中展开思考区时，不会再看到成片空白块或只有空行的 thought。

## 验收标准

- [ ] 历史 JSONL 中空 `thinking`、纯空白 `thinking`、仅换行的 `thinking` 不会生成可见气泡。
- [ ] 历史 JSONL 中包含有效文字的 thought 仍能正常显示，不能因清洗逻辑被误删。
- [ ] 思考块展开后最多保留语义相关的换行，不再出现大段连续空行。

## Code Review 严格验收标准

- [ ] 归一化逻辑必须集中在历史解析层，而不是散落在多个 React 渲染分支里做 UI 级补丁。
- [ ] 必须新增针对“空字符串 thought”“纯换行 thought”“有效 thought”的三类测试样例。
- [ ] 审查时必须确认清洗规则不会破坏真实段落结构，不能简单用全局替换把所有换行压平。

## 被阻塞于

无 - 可以立即开始

## 当前审计结论（2026-06-12）

- 已完成实现：历史 thought 解析已集中迁移到 `chatHistory.ts`，加入空白 thought 过滤、噪声换行归一化、连续重复 thought 跳过。
- 已有验证：`conversation_parsing.test.ts` 已覆盖空字符串、纯空白、噪声换行和有效 thought 场景。
- 结论：本票范围内目标已满足，可标记为完成。若后续仍有“大空白”，应视为其他布局或会话重复问题，而非本票未完成。
