Status: completed

# Issue 07: Video Intake 与 Storyboard 推荐产物按需化

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

把 video_intake 的完整 source analysis / timeline / dialogue / audio / camera 等长解析改为按需生成；storyboard 的 content_breakdown、cinematic_language_plan、space_continuity_map 等推荐文件默认并入主包或按需生成，不改变 validator 仍强制的核心交付。

## 验收标准

- [x] video_intake 默认只要求 index、handoff、priority_map、adaptation_ideas。
- [x] 全量 source analysis / timeline 只有复杂项目或用户明确要求时才生成。
- [x] storyboard 推荐文件不再被 skill 描述为默认独立落盘。
- [x] storyboard 强制文件和 prompt 三段结构校验保持不变。
- [x] 相关 skill 文档中文主导，且无“必须生成所有长解析”的残留表达。

## 执行记录

- video_intake 默认输出收敛为 `source_intake_index`、`topic_gate_handoff`、`source_video_priority_map`、`adaptation_ideas`。
- `source_video_analysis`、`source_video_timeline`、dialogue/audio/camera 专项文件改为复杂项目或明确需要时按需生成。
- storyboard 推荐文件改为默认并入主包 section，独立文件按需。
- storyboard 强制 detail、prompt 三段结构和 design reconciliation 闸门未改。

## 验证记录

- 通过：`pnpm --filter @scene-forge/engine build`
- 通过：`pnpm --filter @scene-forge/engine test`，58 passed。

## Review 标准

- [x] 检查 video_intake 的下游必要信息没有被降级为可选。
- [x] 检查 storyboard validator 强制项未被本票误删或弱化。
- [x] 检查“按需生成”触发条件清楚，不能让执行代理猜测。
- [x] 检查 compact 读取预算与新默认产物清单一致。

## 被阻塞于

- Issue 06
