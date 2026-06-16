Status: completed

# Issue 08: Storyboard 强制 Breakdown 文件合并评审与改造

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

评审是否将 storyboard 的 `beat_skeleton`、`video_generation_units`、`shot_continuity_plan` 三个强制 detail 合并为一个 `storyboard_breakdown` 文件。如果确认合并，则同步修改 validator SF-SB-201/202/203 为检查合并文件内的三个 section，而不是检查三个独立文件。

## 验收标准

- [x] 先给出保留三文件与合并为一文件的明确利弊评审。
- [x] 若合并，validator 能识别合并文件内的 beat / VGU / shot continuity 三个 section。（本轮决策：暂不合并，保持现状）
- [x] 若合并，board stage_index 示例和 skill required deliverables 同步更新。（本轮决策：暂不合并，无需改动）
- [x] control / styled storyboard prompt 和 design_reconciliation review 强制交付不受影响。
- [x] `pnpm --filter @scene-forge/engine test` 通过。

## 评审结论

本轮不合并 `beat_skeleton`、`video_generation_units`、`shot_continuity_plan` 三个强制 detail 文件。

保留三文件的优势：

- 每个文件对应一个明确 validator 规则：SF-SB-201 / SF-SB-202 / SF-SB-203，失败定位清楚。
- 下游 video_prompts 可以按职责读取，不必从大合并文件中抽 section。
- board details 和 manifest 现有结构已经稳定，改动面小。
- Issue 07 已把三个推荐文件按需化，storyboard 文件数量已下降。

合并为一个 `storyboard_breakdown` 的优势：

- 物理文件数量可再减少 2 个。
- beat、VGU、shot continuity 在同一文件中方便人工浏览。

暂不合并的原因：

- 收益较小，但会同时改 validator、skill、board 示例、manifest 约定和下游读取习惯。
- 合并后错误信息需要重新设计，否则会从“缺具体文件”退化成“合并文件缺 section”，排错更绕。
- 当前最需要止血的是 token 与默认产物数量；强制 storyboard detail 合并不是主瓶颈。

后续触发条件：

- 若真实项目仍反馈 storyboard 文件数过多，或 compact context 读取中这三文件造成明显 token 压力，再重新打开本票做合并。

## 验证记录

- 复用 Issue 07 后验证：`pnpm --filter @scene-forge/engine test`，58 passed。

## Review 标准

- [x] 检查是否先形成评审结论，再进行 validator 改造。
- [x] 检查 SF-SB-201/202/203 的错误信息仍能指出缺失的具体 section。（未合并，现有文件级错误保持）
- [x] 检查 design_reconciliation review 闸门和两个 storyboard prompt 文件未被弱化。
- [x] 检查测试覆盖合并文件缺单个 section 的失败场景。（未合并，保留现有文件缺失测试）

## 被阻塞于

- Issue 07
