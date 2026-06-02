# scene-video-prompt-builder 输出协议

本文件定义 `scene-video-prompt-builder` 的输出分类、分段视频提示词结构和目录落点。

## 阶段补丁壳

```yaml
patch_type: scene-video-prompt-builder
version: 1
status:
updated_at:
summary:
data:
```

## 上游输入

本阶段默认消费以下结果：

- `scene-storyboard-director`：`storyboard_version`、`storyboard_summary`、`segments`、`shot_highlights`、`continuity_rules`、`storyboard_prompt_files`、`prompt_hints`
- `scene-design-builder`：角色与场景设定摘要
- 顶层索引：`performance_style`、`segment_duration_seconds`

## 风格执行要求

提示词必须继承顶层 `performance_style`，并转换为通用动画电影化描述，不直接绑定具体品牌名称。

本阶段不再负责生成故事板 prompt；故事板 prompt 已在分镜阶段产出。本阶段只负责把这些输入整合为最终可用的视频分段 prompt。

建议理解：

- `cinematic_serious`：强调电影感、叙事张力、真实光影
- `cinematic_comedy`：强调轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：强调夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：强调鬼畜式升级、离谱反差、连续爆点推进

## 输出内容

- 视频分段提示词
- 角色一致性约束
- 场景一致性约束
- 镜头连续性说明
- 全局生成约束

## `data` 结构

```yaml
data:
  prompt_pack_version:
  segment_duration_seconds:
  total_segments:
  video_prompt_files:
    - file:
      segment_scope:
      purpose:
  reference_assets:
    character_design_refs:
    storyboard_refs:
  consistency_rules:
    character_consistency:
    scene_consistency:
    motion_continuity:
  global_render_rules:
    visual_style_note:
    dialogue_audio_note:
    reference_usage_note:
  readiness_notes:
  next_action:
```

### 字段说明

- `prompt_pack_version`：本次提示词包版本号。
- `segment_duration_seconds`：本次视频分段时长，应继承分镜阶段确认结果。
- `total_segments`：本次视频分段总数。
- `video_prompt_files`：视频分段提示词文件列表。
- `reference_assets`：生成视频时需要一并喂给模型的角色设定图和故事板图来源。
- `consistency_rules`：角色、场景、运动连续性约束摘要。
- `global_render_rules`：适用于全部视频分段的统一约束。
- `readiness_notes`：进入发布阶段前仍需准备的事项。
- `next_action`：下一阶段执行提示。

### 文件列表结构

```yaml
- file:
  purpose:
```

`video_prompt_files` 中的 `segment_scope` 用于标记覆盖范围，例如：

- `segment_01`
- `segment_02`
- `segment_03`

## 目录规则

视频提示词统一写入：

- `outputs/video_prompts/`

建议的附属文件目录：

- `outputs/consistency_rules/`
- `outputs/audio_notes/`

说明：

- `outputs/audio_notes/` 仅用于附加给人工配音或后期的提炼版清单
- 最终视频生成所需的台词、音效、节奏要求，必须已经整合进每段视频 prompt 正文

## prompt 文档语言规范

- 分段视频 prompt 文档默认以中文为主。
- 分段说明、动作设计、运镜、台词、音效、节奏要求优先使用中文。
- 只有平台明确更偏好英文输入时，才在中文主文档之外补一份英文适配版。

## 黑板摘要建议

黑板补丁至少应说明：

- 产出了哪些视频提示词版本
- 当前分段时长和总段数
- 各提示词文件路径
- 参考图使用条件是否明确
- 一致性约束是否已覆盖
- 是否已经具备进入发布包装阶段的素材条件

`summary` 使用中文；风格名建议写成“鬼畜离谱化（`absurd_chaotic`）提示词已生成”。

## 阻塞规则

- 只要能产出一版完整可用的分段视频提示词和一致性约束，就不应阻塞。
- 即使提示词还可继续细修，也可以先完成本阶段。
- 只有在分镜输入缺失、分段方案缺失、镜头连续性规则无法提炼，或输出目录与内容边界无法判定时，才使用 `status: blocked`。

## 示例

```yaml
patch_type: scene-video-prompt-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）视频提示词已生成，按 10 秒分为 2 段，视频分段和一致性约束文件均已落盘。
data:
  prompt_pack_version: v1
  segment_duration_seconds: 10
  total_segments: 2
  video_prompt_files:
    - file: outputs/video_prompts/video_prompt_segments_v1.md
      segment_scope: segment_01
      purpose: 第 1 段视频生成提示词
    - file: outputs/video_prompts/video_prompt_segments_v1.md
      segment_scope: segment_02
      purpose: 第 2 段视频生成提示词
  reference_assets:
    character_design_refs: 角色设定图使用 design-builder 产出的角色 prompt 先生成，再作为角色参考图输入模型。
    storyboard_refs: 每段使用对应故事板图作为镜头构图参考输入。
  consistency_rules:
    character_consistency: 悟空、唐僧、八戒与白骨精在各镜头中保持统一比例、服装逻辑和夸张表情层级。
    scene_consistency: 山林与妖洞沿用既定光影和色彩氛围，不跨段跳变。
    motion_continuity: 所有快切和停顿节奏应与分镜中的误会升级断点一致。
  global_render_rules:
    visual_style_note: 保持通用高品质 3D 动画电影质感，不直接绑定具体品牌名称。
    dialogue_audio_note: 每段 prompt 内直接写明台词、拟音和节奏停顿，不再拆成独立音频说明才能使用。
    reference_usage_note: 先喂角色设定图，再喂当前段故事板图，最后输入该段视频 prompt。
  readiness_notes:
    - 发布前仍需补封面文案与平台标题版本。
  next_action: 进入 scene-publish-review，整理标题、封面文案和平台发布文案。
```

## 阶段推进建议

- `project_status: video_prompts_ready`
- `next_stage: scene-publish-review`
