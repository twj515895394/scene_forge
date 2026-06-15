# Storyboard 阶段短机器契约

本文件只定义 `scene-storyboard-director` 的最小字段契约，用于 validator、manifest、board 索引和 video_prompts 下游交接核对。

它不是执行流程文档，不承载完整分镜方法、长 YAML 样例或资产库说明。执行流程读取 `workflow.md`；必交文件读取 `required-deliverables.md`；故事板 prompt 体裁读取 `storyboard-prompt-template.md`；完成前检查读取 `review-checklist.md`。

完整规则迁移位置见 `../../scene-design-builder/references/output-contract-migration-map.md`。

## 读取规则

- 默认执行阶段不需要全文读取本文件。
- 只有在修复字段、实现 validator、排查 board/manifest 漂移或核对下游交接时读取。
- 正式用户可读内容必须中文主导；英文只保留为技术 key、文件名或外部模型固定术语。

## 主交付

`outputs/storyboard_pack_*.md` 必须是中文分镜控制包，至少包含以下 marker：

- `storyboard_prompt_pack`
- `beat_skeleton`
- `storyboard_content_breakdown`
- `cinematic_language_plan`
- `video_generation_units`
- `shot_continuity_plan`
- `continuity_control_system`
- `storyboard_prompt_pack_plan`
- `storyboard_quality_check`
- `control_storyboard_file`
- `styled_storyboard_file`
- `control_storyboard_prompt_file`
- `styled_storyboard_prompt_file`

## 细节文件

必须真实落盘并注册：

- `details/storyboard/beat_skeleton_v*.md`
- `details/storyboard/video_generation_units_v*.md`
- `details/storyboard/shot_continuity_plan_v*.md`
- `details/storyboard/storyboard_quality_check_v*.md`
- `details/storyboard/design_reconciliation_review_v*.md`

推荐但不强制：

- `details/storyboard/storyboard_content_breakdown_v*.md`
- `details/storyboard/cinematic_language_plan_v*.md`
- `details/storyboard/space_continuity_map_v*.md`

## 故事板 Prompt 输出

必须真实落盘并注册：

- `outputs/storyboard_prompts/control_storyboard_prompt_v*.md`
- `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md`

每个正式故事板 prompt 文件必须是中文整板故事板 prompt，并包含：

- `复制专用主 Prompt`
- `Control-Oriented Storyboard Board`
- `Style & Rendering Storyboard Board`

这些英文段名是外部模型固定结构锚点，段落说明必须中文主导。

## Design Reconciliation

`details/storyboard/design_reconciliation_review_v*.md` 必须包含：

- `design_revision_required: true | false`
- `checked_storyboard_sources`
- `checked_design_sources`
- `new_expression_or_pose_needs`
- `new_prop_state_needs`
- `new_space_or_blocking_needs`
- `new_reference_board_needs`
- 若无需修订：`no_design_change_reason`
- 若需要修订：`recommended_design_updates`

该文件只提出回看判断和修订建议，不得静默改写已确认 design 产物。若 `design_revision_required: true`，storyboard 不得完成，必须先回到 design 修订。

## 禁止形态

不得把以下内容当成正式 storyboard 完成：

- 单纯 shotlist。
- `Seg / Shot / Prompt EN / Prompt CN / Continuity` 逐镜头提示词表。
- 只在主文件声明 prompt 路径，但 prompt 文件不存在。
- prompt 文件缺少三段正式整板结构。
- 缺少 design reconciliation review。
- board 或 manifest 未注册必交文件。

## Board 索引

`PROJECT_BOARD.md stage_index.storyboard.files` 必须包含：

```yaml
primary: outputs/storyboard_pack_*.md
outputs:
  - outputs/storyboard_pack_*.md
  - outputs/storyboard_prompts/control_storyboard_prompt_v*.md
  - outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
details:
  - details/storyboard/beat_skeleton_v*.md
  - details/storyboard/video_generation_units_v*.md
  - details/storyboard/shot_continuity_plan_v*.md
  - details/storyboard/storyboard_quality_check_v*.md
  - details/storyboard/design_reconciliation_review_v*.md
quality_check: details/storyboard/storyboard_quality_check_v*.md
```

## 下游 video_prompts 交接

Video prompts 阶段必须从 storyboard 继承：

- pack 规划和 segment 对齐关系。
- VGU id、covered shots、timecode。
- continuity_in / continuity_out。
- blocking_execution 和 prop_state_execution。
- shot continuity、screen positioning、camera movement。
- storyboard_quality_check 与 design_reconciliation_review 的结论。
