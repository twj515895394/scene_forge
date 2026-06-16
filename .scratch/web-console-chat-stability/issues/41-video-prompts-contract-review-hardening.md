Status: completed

# Issue 41: Video Prompts 深层规范 review 与自动修复

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

补强 video_prompts 阶段深层 contract review，确保最终提示词包含四层结构、segment technical control block、声音执行块、prompt trace、continuity 和 pack plan。

## 验收标准

- [x] review 能检测缺少 `global_execution_preamble`、`project_level_global_rules`、`segment_technical_control_block`。
- [x] review 能检测 segment 缺少 `primary_vgu_ids`、`continuity_in/out`、`blocking_execution`、`prop_state_execution`。
- [x] 自动修复后仍不通过时必须暂停。

## 实施记录

- 在 `packages/engine/src/validators/validator.ts` 增加 video_prompts 深层 contract 校验。
- 缺少 `video_prompt_pack_plan`、`global_execution_preamble`、`project_level_global_rules`、`segment_technical_control_block`、`primary_vgu_ids`、`continuity_in/out`、`blocking_execution`、`prop_state_execution`、`next_handoff`、四层声音结构、`shot_by_shot_director_prompt`、`prompt_trace`、`video_prompt_review` 时直接失败。
- 在 `packages/engine/src/tests/validator.test.ts` 增加浅层 video_prompts 产物拒绝测试。
- 验证通过：`pnpm --filter @scene-forge/engine build`、`pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- [Issue 40: Storyboard 深层规范 review 与自动修复](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/40-storyboard-contract-review-hardening.md)
