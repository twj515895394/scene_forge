# Storyboard Review Checklist

正式推进 storyboard 阶段前逐项检查。

## Confirmation

- 快速执行模式：`confirmations.storyboard_plan_confirmed.status = confirmed`。
- 全自动模式：必须确认总控已注入 `execution_policy.mode = full_auto` 且 unlock 条件满足。

## Structure

- `beat_skeleton` 已生成。
- `storyboard_content_breakdown` 已生成。
- `cinematic_language_plan` 已生成。
- `video_generation_units` 已生成。
- `shot_continuity_plan` 已生成。
- `continuity_control_system` 已生成。
- `storyboard_prompt_pack_plan` 已生成。

## Files

- `outputs/storyboard_pack_*.md` 存在。
- `details/storyboard/beat_skeleton_v*.md` 存在。
- `details/storyboard/video_generation_units_v*.md` 存在。
- `details/storyboard/shot_continuity_plan_v*.md` 存在。
- `details/storyboard/storyboard_quality_check_v*.md` 存在。
- `details/storyboard/design_reconciliation_review_v*.md` 存在。
- `outputs/storyboard_prompts/control_storyboard_prompt_v*.md` 存在。
- `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md` 存在。

## Prompt Body

每个 `outputs/storyboard_prompts/*_prompt_v*.md` 必须包含：

- `复制专用主 Prompt`
- `Control-Oriented Storyboard Board`
- `Style & Rendering Storyboard Board`

不得用以下内容替代正式整板 prompt：

- `Seg / Shot / Prompt (EN) / Prompt (CN) / 连续性`
- 单镜头平台 prompt 清单
- 只适合内部导演阅读的 shotlist

## Registry

- 所有正式文件已进入 `artifacts.manifest.yaml`。
- `PROJECT_BOARD.md stage_index.storyboard.files.primary` 指向主 storyboard pack。
- `details` 包含 `details/storyboard/*`。
- `outputs` 包含主 pack 和 prompt outputs。
- `quality_check` 指向质量检查文件。

## Design Reconciliation

Storyboard 完整生成后，必须根据最终分镜自动回看 design 阶段产物是否需要补充或修订。

`details/storyboard/design_reconciliation_review_v*.md` 必须包含：

- `design_revision_required: true | false`
- `checked_storyboard_sources`
- `checked_design_sources`
- `new_expression_or_pose_needs`
- `new_prop_state_needs`
- `new_space_or_blocking_needs`
- `new_reference_board_needs`
- 若不需要修订：`no_design_change_reason`
- 若需要修订：`recommended_design_updates`

该环节只产出 review 和建议，不得静默改写已确认 design 产物。

## Auto-fix Rule

若缺结构或缺文件，只补缺失结构与注册信息；不得改变已确认的创作方向、总时长、分段策略、pack 规划、角色设定或剧情结果。
