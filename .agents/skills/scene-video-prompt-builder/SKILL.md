---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜、表演表、声音导演结果和 source_intake 继承约束生成视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

把分镜、表演设计、声音方案和 source intake 继承约束转成最终可用于外部视频生成平台的提示词交付包。SceneForge 只输出提示词和制作说明，不声称已经生成视频。

执行期通用约束见仓库根 `AGENTS.md`。本技能只定义 video_prompts 阶段的路由、读取边界、执行顺序和强制交付。

## 必读参考

执行本技能时按顺序读取：

1. `references/workflow.md`
2. `references/required-deliverables.md`
3. `references/review-checklist.md`
4. `references/video-prompt-template.md`
5. `references/output-contract.md` 中与当前阶段相关的字段章节

若上下文紧张，优先完整读取 `required-deliverables.md` 与 `review-checklist.md`，再按需读取 `output-contract.md` 目标章节。

## 何时使用

在以下场景使用：

- 总控发现当前项目 `state.next_stage` 为 `scene-video-prompt-builder`。
- 已完成 storyboard 和 audio，项目可进入 video_prompts。
- 需要按故事板 pack 生成中文 / 英文导演长版视频提示词。
- 需要把 Beat、VGU、shot continuity、表演、声音、Blocking、道具状态和模型适配写进最终提示词。

如果 storyboard、audio、时长、分段策略、风格包或视频提示词方案尚未确认，先阻塞并返回上游确认。

## 输入边界

默认只读取：

- 当前项目 `PROJECT_BOARD.md`
- 本技能和上述 references
- `outputs/storyboard_pack_*.md`
- `details/storyboard/*` 中与 Beat Skeleton、VGU、Shot Continuity、Quality Check 相关的文件
- `outputs/storyboard_prompts/*`
- `outputs/audio_pack_*.md`
- `outputs/performance_pack_*.md`
- `outputs/design.md`
- 当前风格包中与视觉、镜头、光影和负向约束直接相关的文件

不要扫描其他项目、历史产物或整个 `docs/`。需要额外读取资产库时，先说明原因，并只读取当前提示词生成所需章节。

## 执行链

必须按以下顺序产出，不能跳步：

```text
storyboard / performance / audio / design inputs
-> video_prompt_pack_plan
-> pack_audio_execution_plan
-> global_execution_preamble
-> project_level_global_rules
-> segment_technical_control_block
-> shot_by_shot_director_prompt
-> segment_sound_execution
-> prompt_trace
-> video_prompt_review
-> zh/en pack-aligned final files
```

## 确认闸门

正式落盘前先输出视频提示词方案预览，至少包含：

- `video_prompt_pack_plan`
- 每个 pack 覆盖的 segments / shots
- 包级声音执行摘要
- 四层强结构草案
- 每段 `primary_vgu_ids`
- continuity_in / continuity_out
- blocking_execution / prop_state_execution
- `segment_sound_execution` 如何覆盖 BGM / Foley-SFX / Ambience / Silence
- 可直接复制使用块示例
- 需要用户确认的问题

快速执行模式下，必须等待用户确认当前 video prompt 方案。全自动模式只有在总控注入的 `execution_policy.mode = full_auto` 且前置解锁条件满足时，才可跳过确认。

## 强制交付

正式完成前必须真实落盘并注册以下文件，不能只在主文件中声明路径：

- `outputs/video_prompts/视频提示词_第01包_中文_v*.md`
- `outputs/video_prompts/视频提示词_第01包_英文_v*.md`
- `details/video_prompts/video_prompt_review_v*.md`

如用户明确需要整片汇编版，才额外写入：

- `outputs/video_prompts/视频提示词_导演长版_中文_v*.md`
- `outputs/video_prompts/视频提示词_导演长版_英文_v*.md`

如用户明确要求按段单独落文件，才额外写入 segment 文件。

正式 pack 文件必须使用 `video-prompt-template.md` 定义的体裁。

## 完成前 review

写文件后、推进状态前，按 `references/review-checklist.md` 自检。若发现结构性缺失，只允许补结构、补缺失文件、补注册和索引；不得悄悄改动用户已确认的创作方向、总时长、分段策略、pack 规划、角色设定或剧情结果。

若 auto-fix 后仍缺正式主交付必需元素，本阶段必须保持 failed 或 pending confirmation，不得推进。

## 输出

输出单个 YAML 补丁块：

```yaml
patch_type: scene-video-prompt-builder
stage: scene-video-prompt-builder
version:
status: pending | in_progress | completed | blocked | failed
summary:
board_updates:
files_created:
files_updated:
next_action:
```

黑板只记录状态、摘要、索引和路径；完整提示词正文必须落到实际文件。
