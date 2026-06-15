# Storyboard 阶段 Review 清单

正式推进 storyboard 阶段前逐项检查。

## 确认闸门

- 快速执行模式：`confirmations.storyboard_plan_confirmed.status = confirmed`。
- 全自动模式：必须确认总控已注入 `execution_policy.mode = full_auto` 且 unlock 条件满足。

## 结构检查

- `beat_skeleton` 已生成。
- `storyboard_content_breakdown` 已生成。
- `cinematic_language_plan` 已生成。
- `video_generation_units` 已生成。
- `shot_continuity_plan` 已生成。
- `continuity_control_system` 已生成。
- `storyboard_prompt_pack_plan` 已生成。

## 文件检查

- `outputs/storyboard_pack_*.md` 存在。
- `details/storyboard/beat_skeleton_v*.md` 存在。
- `details/storyboard/video_generation_units_v*.md` 存在。
- `details/storyboard/shot_continuity_plan_v*.md` 存在。
- `details/storyboard/storyboard_quality_check_v*.md` 存在。
- `details/storyboard/design_reconciliation_review_v*.md` 存在。
- `outputs/storyboard_prompts/control_storyboard_prompt_v*.md` 存在。
- `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md` 存在。

## Prompt 正文

每个 `outputs/storyboard_prompts/*_prompt_v*.md` 必须包含：

- `复制专用主 Prompt`
- `Control-Oriented Storyboard Board`
- `Style & Rendering Storyboard Board`

不得用以下内容替代正式整板 prompt：

- `Seg / Shot / Prompt (EN) / Prompt (CN) / 连续性`
- 单镜头平台 prompt 清单
- 只适合内部导演阅读的 shotlist

## 控制板画面标注

`outputs/storyboard_prompts/control_storyboard_prompt_v*.md` 必须要求：

- 每个分镜画面区内部直接标注运动箭头。
- 红色箭头画在角色或动作路径旁，表示人物运动方向。
- 蓝色摄影机箭头 / 蓝色镜头图标画在画面边缘或镜头路径旁，表示摄影机运动方向。
- 红蓝箭头不得只放在底部控制轨道栏，轨道栏只能补充说明。
- 红蓝箭头不得遮挡角色脸部、关键道具或主体动作。
- 若某格无人物移动或无摄影机运动，该格底部轨道栏必须标注“人物静止”或“固定机位”。

## 注册与索引

- 所有正式文件已进入 `artifacts.manifest.yaml`。
- `PROJECT_BOARD.md stage_index.storyboard.files.primary` 指向主 storyboard pack。
- `details` 包含 `details/storyboard/*`。
- `outputs` 包含主 pack 和 prompt outputs。
- `quality_check` 指向质量检查文件。

## 设计回看

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

若 `design_revision_required: true`，storyboard 阶段不得标记 completed，也不得继续推进下游；必须先回到 design 阶段生成修订产物后再重新校验 storyboard。

## 自动修复规则

若缺结构或缺文件，只补缺失结构与注册信息；不得改变已确认的创作方向、总时长、分段策略、pack 规划、角色设定或剧情结果。
