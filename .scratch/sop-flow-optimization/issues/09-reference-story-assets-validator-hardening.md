Status: completed

# Issue 09: Reference / Story / Assets 结构校验补强

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

补强 reference、story、assets 三个轻阶段的 validator 结构校验，避免产物瘦身后只剩少量文件却缺关键字段仍能通过。该切片不增加新默认产物，只检查现有主文件的关键 section 和下游继承字段。

## 验收标准

- [x] reference 缺参考边界、allowed/forbidden inheritance 或 creative direction context 会失败。
- [x] story 缺 4-8 个 story beat 或 emotional arc 会失败。
- [x] assets 缺 locked assets / downstream constraints 会失败。
- [x] 不新增默认交付文件数量。
- [x] `pnpm --filter @scene-forge/engine test` 通过。

## Review 标准

- [x] 检查补强只增加结构校验，不新增阶段默认产物。
- [x] 检查错误信息能指导代理补齐具体缺失字段。
- [x] 检查 reference/story/assets 的轻量阶段定位没有被过度复杂化。
- [x] 检查新规则不会阻断已有合法旧项目的兼容路径，必要时给出 legacy confirmed 兼容判断。

## 实施记录

- 在 `DEFAULT_STAGE_RULES` 中为 reference / story / assets 补充轻量主产物匹配规则，使通用 L1 主产物检查能识别现有单文件产物。
- 新增轻量阶段结构校验：
  - reference: `reference_boundary`、`allowed_inheritance`、`forbidden_inheritance`、`creative_direction_context`
  - story: `story_beats`、`emotional_arc`，且 `beat_id` 数量为 4-8
  - assets: `asset_lock`、`locked_assets`、`downstream_constraints`
- 新增 validator 测试 23-26 覆盖缺字段、beat 数量和合法通过路径。

## 验证记录

- `pnpm --filter @scene-forge/engine build` 通过。
- `pnpm --filter @scene-forge/engine test` 通过，62 passed。

## 被阻塞于

- Issue 06
