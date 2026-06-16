Status: completed

# Issue 06: Performance / Audio / Script / Assets 低风险产物合并

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

优先合并当前 validator 不硬依赖独立文件名的阶段产物：performance 的 action/emotion continuity 并入 performance_sheet，audio 的 music/foley/mix 并入 audio_plan，script 的 VGU plan 并入 beat_table，assets 的 asset_lock 并入 asset_check。

## 验收标准

- [x] performance skill 默认只要求一个完整 performance_sheet 承载表演和连续性链。
- [x] audio skill 默认只要求一个 audio_plan 承载音乐、拟音和混音计划。
- [x] script skill 默认把 VGU 初步规划写入 beat_table 的独立 section。
- [x] assets skill 默认把 locked assets 与 downstream constraints 写入 asset_check。
- [x] engine validator 测试不因上述文件合并回归。

## 执行记录

- performance：`action_continuity_chains` / `emotion_continuity_chains` 默认并入 `performance_sheet`。
- audio：`music_prompt` / `foley_prompt` / `audio_mix_plan` 默认并入 `audio_plan`，独立文件只按需导出。
- script：`video_generation_unit_plan` 默认并入 `beat_table` section。
- assets：`asset_lock` 默认并入 `asset_check` section。

## 验证记录

- 通过：`pnpm --filter @scene-forge/engine build`
- 通过：`pnpm --filter @scene-forge/engine test`，58 passed。

## Review 标准

- [x] 检查每个阶段的下游继承字段仍有明确 section 承接，不能只删除文件名。
- [x] 检查没有修改真实 `projects/*` 产物来适配新协议。
- [x] 检查 validator 当前不依赖这些独立文件名的判断仍成立。
- [x] 检查各 skill 的 output-contract 与 SKILL.md 不再互相矛盾。

## 被阻塞于

- Issue 04
- Issue 05
