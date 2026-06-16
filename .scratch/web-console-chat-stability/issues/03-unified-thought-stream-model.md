Status: mostly-complete

# Issue 03: 实时思考与历史思考统一气泡模型

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前实时 stream 里的 `thinking` chunk 与历史 JSONL 恢复出的 `thinking` block 不是同一套模型，导致一边修好了，另一边仍然可能出现重复、缺失或空白。需要统一实时 thought、历史 thought、tool/text 累加规则与 turn/bubble 结构，让“实时渲染”和“历史回放”对同一轮 assistant 内容的还原结果一致。

此切片完成后，同一段思考在实时流与历史回放里的表现应保持一致，不会出现“实时没显示但历史有”“历史有空白但实时正常”的分裂行为。

## 验收标准

- [ ] 同一条 assistant turn 在实时展示与历史回放中的 thought/text/tool 顺序保持一致。
- [ ] `thinking_delta`、`content_block_start`、assistant content block 三种来源都能稳定进入统一模型。
- [ ] 同一 thought 不会因 chunk 拼接或历史回放再次拆成重复 bubble。

## Code Review 严格验收标准

- [ ] 统一模型必须有明确的数据边界，不能继续保留“实时一套、历史一套、前端再临时修一套”的三层分裂。
- [ ] 必须有回归测试覆盖至少一种实时 `thinking_delta` 和一种历史 assistant `thinking` block，且断言它们最终映射成一致的 bubble 结构。
- [ ] 审查时必须检查 tool/text/thought 三类 chunk 的顺序稳定性，避免修 thought 时打乱其他内容顺序。

## 被阻塞于

- [Issue 01: 聊天气泡去重与历史/实时合并时序收口](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/01-bubble-dedup-and-merge-order.md)
- [Issue 02: 历史思考归一化与空白块清洗](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/02-history-thought-normalization.md)

## 当前审计结论（2026-06-13）

- 已有实现：`claudeStream.ts`、`liveBubbleAccumulator.ts` 已补上实时 `thinking_delta` / assistant block` 的 fallback 解析和关键累加规则。
- 已有验证：测试已覆盖实时 `thinking_delta`、历史 `thinking` block，以及部分重复 assistant 收口场景。
- 当前现实：实时/历史思考模型的大方向已经统一，可支撑当前主流程；剩余风险主要出现在复杂长输出和工具事件混排场景。
- 结论：本票可调整为“基本完成”。如未来继续深修聊天流 turn 模型，可与 `16/17` 一起作为后续优化处理。
