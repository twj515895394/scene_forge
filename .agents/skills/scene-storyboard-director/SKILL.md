---
name: scene-storyboard-director
description: 当用户要把 SceneForge 剧本节拍、source_intake 视频源优先级分层和表演导演结果转成适合当前已确认风格家族的专业分镜方案，并沉淀剧本内容拆分、影视镜头语言、镜头级表演、调度、声音意图和必要的风格化扩展镜头时应使用此技能。
---

# scene-storyboard-director

把已确认 Story Beat、source intake 继承约束、设计设定和表演导演结果转成可执行分镜。输出必须是导演级分镜控制链，不是单纯镜头清单。

执行期通用约束见仓库根 `AGENTS.md`。本技能只定义 storyboard 阶段的路由、读取边界、执行顺序和强制交付。用户可读说明与正式产物默认中文主导。

## 必读参考

执行本技能时默认按顺序读取：

1. `references/workflow.md`
2. `references/required-deliverables.md`
3. `references/review-checklist.md`
4. `references/storyboard-prompt-template.md`

`references/output-contract.md` 已降级为短机器契约，只在修复字段、实现 validator、排查 board/manifest 漂移或核对下游交接时按需读取。

## 何时使用

在以下场景使用：

- 总控发现当前项目 `state.next_stage` 为 `scene-storyboard-director`。
- 已完成剧本改编和表演导演，项目状态可进入 storyboard。
- 需要把 Beat、VGU、表演重点、Blocking、道具状态和风格包镜头语言转成正式分镜与故事板 prompt。

如果剧本、表演表、时长、分段策略或风格包尚未确认，先阻塞并返回上游确认。

## 输入边界

默认只读取：

- 当前项目 `PROJECT_BOARD.md`
- 本技能和上述 references
- `outputs/script.md`
- `details/script/beat_table_v*.md`
- `details/script/video_generation_unit_plan_v*.md`
- `outputs/performance_pack_*.md`
- `outputs/design.md`
- 与当前风格包直接相关的 `profile.md`、`camera_language.md`、`rhythm_language.md`、`lighting_language.md`
- 黑板中明确索引的 source_intake 摘要文件

不要扫描其他项目、历史产物或整个 `docs/`。需要额外读取资产库时，先说明原因，并只读取当前镜头设计所需章节。

## 执行链

必须按以下顺序产出，不能跳步：

```text
story_beats / performance_sheet / source_intake_constraints
-> beat_skeleton
-> storyboard_content_breakdown
-> cinematic_language_plan
-> video_generation_units
-> shot_continuity_plan
-> continuity_control_system
-> shot_highlights / segments
-> storyboard_prompt_pack_plan
-> control + styled storyboard prompt files
-> storyboard_quality_check
```

## 确认闸门

正式落盘前先输出分镜方案预览，至少包含：

- 镜头数量建议
- Segment Plan
- `storyboard_prompt_pack_plan`
- Beat Skeleton 样例
- VGU 样例
- shot continuity 样例
- Hero Shot / Bridge Shot
- Blocking 与道具状态继承策略
- 是否单包或多包故事板 prompt

快速执行模式下，必须等待用户确认当前 storyboard 方案。全自动模式只有在总控注入的 `execution_policy.mode = full_auto` 且前置解锁条件满足时，才可跳过确认。

## 强制交付

正式完成前必须真实落盘并注册以下文件，不能只在主文件中声明路径：

- `outputs/storyboard_pack_*.md`
- `details/storyboard/beat_skeleton_v*.md`
- `details/storyboard/video_generation_units_v*.md`
- `details/storyboard/shot_continuity_plan_v*.md`
- `details/storyboard/storyboard_quality_check_v*.md`
- `details/storyboard/design_reconciliation_review_v*.md`
- `outputs/storyboard_prompts/control_storyboard_prompt_v*.md`
- `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md`

正式故事板 prompt 文件必须可直接复制给 `gpt-image2`，并包含 `storyboard-prompt-template.md` 定义的三段结构。

## 完成前 review

写文件后、推进状态前，按 `references/review-checklist.md` 自检。若发现结构性缺失，只允许补结构、补缺失文件、补注册和索引；不得悄悄改动用户已确认的创作方向、总时长、分段策略或 pack 规划。

若 auto-fix 后仍缺正式主交付必需元素，本阶段必须保持 failed 或 pending confirmation，不得推进。

## 输出

输出单个 YAML 补丁块：

```yaml
patch_type: scene-storyboard-director
stage: scene-storyboard-director
version:
status: pending | in_progress | completed | blocked | failed
summary:
board_updates:
files_created:
files_updated:
next_action:
```

黑板只记录状态、摘要、索引和路径；完整内容必须落到实际文件。
