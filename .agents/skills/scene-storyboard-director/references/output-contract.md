# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、分段规则、故事板 prompt 和长分镜落盘方式。

## 阶段补丁壳

```yaml
patch_type: scene-storyboard-director
version: 1
status:
updated_at:
summary:
data:
```

## 上游输入

本阶段默认消费以下结果：

- `scene-script-adapter`：`adaptation_level`、`performance_style`、`scene_beats`、`storyboard_hints`
- `scene-design-builder`：角色与场景设定摘要
- 顶层索引：`performance_style`、`segment_duration_seconds`

## 风格执行要求

分镜设计必须继承顶层 `performance_style`：

- `cinematic_serious`：偏电影化节奏与正剧张力
- `cinematic_comedy`：偏轻喜剧节奏与角色反应
- `exaggerated_comedy`：强化夸张反应、反差停顿和喜剧节奏
- `absurd_chaotic`：强化鬼畜式节奏推进、离谱升级和高反差调度

## 分段规则

- 默认 `segment_duration_seconds = 10`
- 若当前剧本节拍在 10 秒内承载不下关键动作、台词和情绪起伏，可在该阶段向用户确认改为 `15`
- 分段结果一旦确认，后续视频提示词阶段必须继承，不再二次拆段

## 分镜字段

至少覆盖以下字段：

- 镜头编号
- 起止时间
- 时长
- 景别
- 机位
- 镜头运动
- 角色动作
- 表情变化
- 场景调度
- 光影变化
- 台词/声音提示
- 情绪功能
- 转场方式

## `data` 结构

```yaml
data:
  storyboard_version:
  segment_duration_seconds:
  total_shots:
  total_segments:
  storyboard_summary:
  segments:
    - segment_id:
      duration_seconds:
      covered_shots:
      segment_goal:
  shot_highlights:
    - shot_id:
      beat_id:
      start_second:
      end_second:
      shot_purpose:
      visual_focus:
      motion_note:
      dialogue_cue:
      emotion_note:
  continuity_rules:
    character_consistency:
    scene_consistency:
    motion_continuity:
  shotlist_file:
  storyboard_prompt_files:
    - file:
      purpose:
  prompt_hints:
    video_prompt_focus:
    audio_prompt_focus:
  risk_notes:
  next_action:
```

### 字段说明

- `storyboard_version`：本次分镜版本号。
- `segment_duration_seconds`：本次分段时长，默认 `10`。
- `total_shots`：镜头总数。
- `total_segments`：视频分段总数。
- `storyboard_summary`：供黑板和后续阶段读取的分镜摘要。
- `segments`：每段覆盖哪些镜头，以及这段的叙事目标。
- `shot_highlights`：关键镜头列表。
- `continuity_rules`：角色、场景、运动连续性约束。
- `shotlist_file`：完整分镜路径。
- `storyboard_prompt_files`：可直接生成故事板图的 prompt 文件列表。
- `prompt_hints`：交给视频提示词阶段的重点。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

### `segments` 结构

```yaml
segments:
  - segment_id:
    duration_seconds:
    covered_shots:
      - S01
      - S02
    segment_goal:
```

说明：

- `segment_id`：分段编号，如 `SEG01`
- `duration_seconds`：该段时长，通常为 `10` 或 `15`
- `covered_shots`：该段覆盖的镜头编号列表
- `segment_goal`：该段承担的情绪/叙事任务

### `shot_highlights` 结构

```yaml
shot_highlights:
  - shot_id:
    beat_id:
    start_second:
    end_second:
    shot_purpose:
    visual_focus:
    motion_note:
    dialogue_cue:
    emotion_note:
```

说明：

- `shot_id`：镜头编号，如 `S01`
- `beat_id`：所属剧本节拍编号，如 `B1`
- `start_second` / `end_second`：镜头在整支视频中的时间轴位置
- `shot_purpose`：该镜头承担的叙事功能
- `visual_focus`：该镜头最核心的视觉抓手
- `motion_note`：镜头运动或角色动作重点
- `dialogue_cue`：该镜头最关键的台词或声音提示
- `emotion_note`：该镜头要传递的情绪或喜剧效果

### `continuity_rules` 结构

```yaml
continuity_rules:
  character_consistency:
  scene_consistency:
  motion_continuity:
```

说明：

- `character_consistency`：角色形象和表演连续性规则
- `scene_consistency`：场景与光影连续性规则
- `motion_continuity`：镜头之间的运动衔接规则

## 黑板摘要建议

黑板补丁至少应说明：

- 分镜版本号
- 分段时长和总段数
- 镜头总数
- 核心镜头策略
- 每段覆盖哪些镜头
- 故事板 prompt 文件路径
- 完整分镜路径
- 提示词阶段最需要继承的连续性规则和视觉重点

`summary` 使用中文；如需强调风格，可写为“夸张搞笑化（`exaggerated_comedy`）分镜已完成”。

## 长内容落盘

完整分镜写入：

- `details/shotlist_v*.md`

故事板 prompt 写入：

- `outputs/storyboard_prompts/storyboard_prompt_v*.md`

黑板只保留摘要和路径，不直接塞完整分镜表或完整 prompt。

## prompt 文档语言规范

- 故事板 prompt 文档默认以中文为主。
- 镜头用途、画面描述、构图重点、动作与表情要求优先用中文表达。
- 若某个出图平台对英文更敏感，可基于中文主文档再派生英文版，但中文主文档始终保留。

## 阻塞规则

- 只要能给出镜头主线、关键镜头和连续性规则，就不应阻塞。
- 即使个别镜头还可继续细修，也可以先完成本阶段。
- 只有在剧本节拍不清、无法拆镜，或参考/设计边界冲突到无法做镜头表达时，才使用 `status: blocked`。

## 示例

```yaml
patch_type: scene-storyboard-director
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）分镜已完成，按 10 秒分为 2 段，共 12 镜；完整分镜表和故事板 prompt 已落盘。
data:
  storyboard_version: v1
  segment_duration_seconds: 10
  total_shots: 12
  total_segments: 2
  storyboard_summary: 以误会升级为主线，镜头节奏从试探到爆发逐步加速，重点放大角色错愕与夸张反应。
  segments:
    - segment_id: SEG01
      duration_seconds: 10
      covered_shots:
        - S01
        - S02
        - S03
        - S04
        - S05
        - S06
      segment_goal: 建立角色关系、误会起点与第一轮节奏升级。
    - segment_id: SEG02
      duration_seconds: 10
      covered_shots:
        - S07
        - S08
        - S09
        - S10
        - S11
        - S12
      segment_goal: 推进爆发高潮与结果收束。
  shot_highlights:
    - shot_id: S01
      beat_id: B1
      start_second: 0.0
      end_second: 1.6
      shot_purpose: 建立白骨精接近与悟空预判的第一轮反差。
      visual_focus: 悟空的警觉表情与其他人放松状态的并置。
      motion_note: 缓慢推近悟空，再快速切到他视角。
      dialogue_cue: 白骨精首次开口接近。
      emotion_note: 建立轻悬疑里的喜剧预判。
  continuity_rules:
    character_consistency: 悟空始终保持敏捷警觉，唐僧与八戒的反应逐轮升级但不脱离各自身份。
    scene_consistency: 山林与妖洞的光影风格分别保持暖黄悬疑和冷色压迫，不跨镜跳变。
    motion_continuity: 每轮冲突升级前保留停顿镜头，镜头运动由稳到快逐步递进。
  shotlist_file: details/shotlist_v1.md
  storyboard_prompt_files:
    - file: outputs/storyboard_prompts/storyboard_prompt_v1.md
      purpose: 逐镜头故事板图生成 prompt
  prompt_hints:
    video_prompt_focus: 保持角色一致性，突出动作停顿与节奏爆点。
    audio_prompt_focus: 在误会升级前后加入夸张停顿与反应音效。
  risk_notes:
    - 喜剧化表达不能滑向具体影视镜头复刻。
  next_action: 进入 scene-video-prompt-builder，按分段方案和故事板 prompt 组织视频提示词。
```

## 阶段推进建议

- `project_status: storyboard_ready`
- `next_stage: scene-video-prompt-builder`
