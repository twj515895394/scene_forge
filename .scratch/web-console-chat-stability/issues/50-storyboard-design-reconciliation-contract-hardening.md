Status: completed

# Issue 50: Storyboard Design Reconciliation Contract Hardening

## 父问题

[implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md)

## 要构建什么

把 storyboard 完整生成后的设计回看从“粗 marker 检查”升级为可执行契约：根据 `design_revision_required` 的 true / false 条件校验原因或建议，并要求覆盖表达姿态、道具状态、空间站位和 reference board 回看维度。同步修正 skill 入口和示例，降低 agent 漏执行概率。

## 验收标准

- [x] `design_revision_required: false` 时必须包含 `no_design_change_reason`。
- [x] `design_revision_required: true` 时必须包含 `recommended_design_updates`。
- [x] review 文件必须覆盖表达 / 姿态、道具状态、空间 / blocking、reference board 维度。
- [x] storyboard 顶层 `SKILL.md` 和 required deliverables 示例与 validator 保持一致。
- [x] validator 测试覆盖 true / false 条件缺失和维度缺失。

## 实施记录

- 加强 storyboard design reconciliation validator 条件校验。
- 同步修正 storyboard 顶层强制交付清单和 required deliverables YAML 示例缩进。
- 验证通过：`pnpm --filter @scene-forge/engine build && pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- Issue 46
