Status: completed

# Issue 04: Design 阶段一体化交付与 Validator 改造

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

把 design 阶段从“完整 details 草稿 + 最终 prompt 重复落盘”改为“对话内设计预览 + 3 个一体化 outputs + 可选 design_notes”。validator 不再强制旧的 4 个 details 草稿文件，而是检查 `outputs/design.md` 中的空间、道具状态机和 blocking marker，以及两个最终 prompt 文件的完整性。

## 验收标准

- [x] skill 文档明确第一步是对话内设计预览，确认后一次性落最终产物。
- [x] `character_design`、`scene_design`、`prop_design`、`space_continuity_seed` 旧 details 文件不再是必交文件。
- [x] `outputs/design.md` 缺 `prop_state_machines` 或 `space_continuity_seed` 仍会被 validator 拦截。
- [x] board stage_index 示例不再要求列出 4 个旧 details 草稿。
- [x] `pnpm --filter @scene-forge/engine test` 通过。

## 执行记录

- design validator 必交清单移除旧版 4 个完整 details 草稿。
- 保留 `outputs/design.md` 的 `space_continuity_seed`、`prop_state_machines`、`blocking_map` marker 校验。
- design board index 不再强制 details 列出旧草稿。
- 更新 `scene-design-builder` 的 SKILL、output-contract、required-deliverables、workflow、review-checklist。
- 测试 helper 改为只生成 `outputs/design.md` 和两个 design prompt 主交付。
- 新增测试覆盖核心 marker 缺失失败。

## 验证记录

- 通过：`pnpm --filter @scene-forge/engine build`
- 通过：`pnpm --filter @scene-forge/engine test`，57 passed。

## Review 标准

- [x] 检查 skill、required-deliverables、output-contract、review-checklist 与 validator 口径完全一致。
- [x] 检查不会降低设计质量要求：旧草稿内容必须有明确并入新最终产物的位置。
- [x] 检查 board stage_index 与 manifest 校验没有继续引用旧 details 必交项。
- [x] 检查测试同时覆盖“旧 details 缺失可过”和“核心 marker 缺失必失败”。

## 被阻塞于

无 - 可以立即开始
