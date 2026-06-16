Status: completed

# Issue 32: 实时 assistant 跨 bubble 去重收口

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

修复实时聊天中同一段 assistant 回复可能以不同 bubble id 重复显示的问题。当前已有同 id chunk 合并和前端连续 text 去重，但 stream 完整内容与 final assistant 完整内容仍可能作为不同 id 的 text bubble 进入列表。

这张票只处理 assistant text 的跨 bubble 去重，不改变 thought、tool_call、prompt_ui 的生命周期和显示策略。

## 验收标准

- [ ] 当相邻 assistant text bubble 的标准化内容完全相同，只保留一条。
- [ ] 当 final assistant text 完整包含前一条 stream text，保留更完整的一条。
- [ ] 去重不会影响 user、thought、tool_call、prompt_ui。
- [ ] 补充回归测试覆盖不同 id 的 stream + final 重复场景。

## 被阻塞于

无 - 可以立即开始

## 实施记录

- 增强前端 `dedupeConsecutiveTextBubbles`，支持相邻 text 完全相同与包含关系去重。
- `liveBubbleAccumulator.ts` 增加同类标准化与相邻 text 去重 helper，并补测试。
- 不改变 user、thought、tool_call、prompt_ui 的生命周期。
- Targeted 验证通过：`pnpm --filter @scene-forge/web-console build`；`node --test apps/web-console/dist/server/tests/live_bubble_accumulator.test.js apps/web-console/dist/server/tests/artifact_discovery.test.js apps/web-console/dist/server/tests/server_api.test.js`。
