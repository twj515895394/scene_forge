# scene-video-prompt-builder 输出协议

本文件定义 `scene-video-prompt-builder` 的输出分类、补丁结构和目录落点。

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

- `scene-storyboard-director`：`storyboard_version`、`storyboard_summary`、`shot_highlights`、`continuity_rules`、`prompt_hints`
- `scene-design-builder`：角色与场景设定摘要
- 顶层索引：`performance_style`

## 风格执行要求

提示词必须继承顶层 `performance_style`，并转换为通用动画电影化描述，不直接绑定具体品牌名称。

建议理解：

- `cinematic_serious`：强调电影感、叙事张力、真实光影
- `cinematic_comedy`：强调轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：强调夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：强调鬼畜式升级、离谱反差、连续爆点推进

## 输出内容

- 故事板提示词
- 视频分段提示词
- 角色一致性约束
- 场景一致性约束
- 镜头连续性说明
- 声音、音效、配乐提示

## `data` 结构

```yaml
data:
  prompt_pack_version:
  storyboard_prompt_files:
    - file:
      purpose:
  video_prompt_files:
    - file:
      segment_scope:
      purpose:
  consistency_rules:
    character_consistency:
    scene_consistency:
    motion_continuity:
  audio_rules:
    sound_fx_direction:
    music_direction:
    pacing_audio_note:
  readiness_notes:
  next_action:
```

### 字段说明

- `prompt_pack_version`：本次提示词包版本号。
- `storyboard_prompt_files`：故事板提示词文件列表。
- `video_prompt_files`：视频分段提示词文件列表。
- `consistency_rules`：角色、场景、运动连续性约束摘要。
- `audio_rules`：音效、配乐和节奏声音提示。
- `readiness_notes`：进入发布阶段前仍需准备的事项。
- `next_action`：下一阶段执行提示。

### 文件列表结构

```yaml
- file:
  purpose:
```

`video_prompt_files` 中的 `segment_scope` 用于标记覆盖范围，例如：

- `full_sequence`
- `segment_01_03`
- `segment_04_06`

## 目录规则

视频提示词统一写入：

- `outputs/video_prompts/`

如需补充故事板相关文本，可一并放在：

- `outputs/storyboard_prompts/`

建议的附属文件目录：

- `outputs/consistency_rules/`
- `outputs/audio_notes/`

## 黑板摘要建议

黑板补丁至少应说明：

- 产出了哪些提示词版本
- 各提示词文件路径
- 一致性约束是否已覆盖
- 是否已经具备进入发布包装阶段的素材条件

`summary` 使用中文；风格名建议写成“鬼畜离谱化（`absurd_chaotic`）提示词已生成”。

## 阻塞规则

- 只要能产出一版完整可用的故事板提示词、视频提示词和一致性约束，就不应阻塞。
- 即使提示词还可继续细修，也可以先完成本阶段。
- 只有在分镜输入缺失、镜头连续性规则无法提炼，或输出目录与内容边界无法判定时，才使用 `status: blocked`。

## 示例

```yaml
patch_type: scene-video-prompt-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）提示词已生成，故事板、视频分段和一致性约束文件均已落盘。
data:
  prompt_pack_version: v1
  storyboard_prompt_files:
    - file: outputs/storyboard_prompts/storyboard_prompt_v1.md
      purpose: 故事板静帧生成提示词
  video_prompt_files:
    - file: outputs/video_prompts/video_prompt_full_v1.md
      segment_scope: full_sequence
      purpose: 全片统一视频提示词
    - file: outputs/video_prompts/video_prompt_segments_v1.md
      segment_scope: segment_01_12
      purpose: 分镜头视频分段提示词
  consistency_rules:
    character_consistency: 悟空、唐僧、八戒与白骨精在各镜头中保持统一比例、服装逻辑和夸张表情层级。
    scene_consistency: 山林与妖洞沿用既定光影和色彩氛围，不跨段跳变。
    motion_continuity: 所有快切和停顿节奏应与分镜中的误会升级断点一致。
  audio_rules:
    sound_fx_direction: 夸张反应点加入停顿、顿挫和拟音强化。
    music_direction: 轻快悬疑底色中逐步升级喜剧节奏。
    pacing_audio_note: 每次误会升级前后保留明显声音断点，方便做鬼畜式或夸张式节奏卡点。
  readiness_notes:
    - 发布前仍需补封面文案与平台标题版本。
  next_action: 进入 scene-publish-review，整理标题、封面文案和平台发布文案。
```

## 阶段推进建议

- `project_status: video_prompts_ready`
- `next_stage: scene-publish-review`
