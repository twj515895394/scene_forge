Status: completed

# Issue 40: Storyboard 深层规范 review 与自动修复

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

补强 storyboard 阶段的深层 contract review，避免只生成简单镜头清单却缺少 beat_skeleton、content_breakdown、cinematic_language_plan、VGU、continuity_control 和双版故事板 prompt。

## 验收标准

- [x] review 能检测 storyboard 主交付缺少核心结构层。
- [x] 自动修复只补结构，不改用户已确认创作方向。
- [x] 仍保留 storyboard 方案确认闸门。

## 实施记录

- 在 `packages/engine/src/validators/validator.ts` 增加 storyboard 深层 contract 校验。
- 缺少 `beat_skeleton`、`storyboard_content_breakdown`、`cinematic_language_plan`、`video_generation_units/VGU`、`shot_continuity_plan`、`continuity_control_system`、`storyboard_prompt_pack_plan`、双版故事板交付与 `storyboard_quality_check` 时直接失败。
- 在 `packages/engine/src/tests/validator.test.ts` 增加浅层 storyboard 产物拒绝测试。
- 验证通过：`pnpm --filter @scene-forge/engine build`、`pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- [Issue 38: scene-forge 确认闸门支持执行策略](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/38-scene-forge-confirmation-gate-policy.md)
