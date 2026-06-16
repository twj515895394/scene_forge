# Findings

## 2026-06-13

- 当前 `packages/engine/src/state_machine.ts` 仍是 7 阶段模型：
  - `topic_gate -> script -> performance -> audio -> storyboard -> video_prompts -> publish_review`
- 当前依赖顺序还把 `storyboard` 依赖写成 `performance + audio`，与现有 UI/SOP 的 `storyboard -> audio -> video_prompts` 冲突。
- 当前 validator/schemas/tests 也都只覆盖旧 7 阶段模型。
- 当前左栏 UI 顺序是：
  - `source_intake -> topic -> reference -> story -> assets -> design -> script -> performance -> storyboard -> audio -> video_prompts -> publish`

## 待确认实现点

- engine 内部是否统一沿用 UI 风格命名，还是继续保留 `topic_gate / publish_review` 这种 CLI 命名后再映射。
- 对于 `reference / story / assets / design`，最小可行实现是否先只纳入状态机和 CLI，不立即强上重 validator。

## 2026-06-13 20:17 更新

- 已确认本票采用 engine 现有 CLI 命名：保留 `topic_gate / publish_review`，新增中间阶段使用 `reference / story / assets / design`。
- 本票最小闭环不强行扩展所有阶段的深度 validator；深度产物合规校验另开后续专项更合适。
- 关键修正点：`video_prompts` 必须依赖 `audio`，否则仍会允许 `storyboard -> video_prompts` 跳过声音阶段。
- 状态机测试已作为本票的完整流程基线，覆盖普通文本 SOP 11 阶段顺序。
