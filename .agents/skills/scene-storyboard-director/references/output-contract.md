# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、补丁结构和长分镜落盘方式。

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
- 顶层索引：`performance_style`

## 风格执行要求

分镜设计必须继承顶层 `performance_style`：

- `cinematic_serious`：偏电影化节奏与正剧张力
- `cinematic_comedy`：偏轻喜剧节奏与角色反应
- `exaggerated_comedy`：强化夸张反应、反差停顿和喜剧节奏
- `absurd_chaotic`：强化鬼畜式节奏推进、离谱升级和高反差调度

## 分镜字段

至少覆盖以下字段：

- 镜头编号
- 时长
- 景别
- 机位
- 镜头运动
- 角色动作
- 表情变化
- 场景调度
- 光影变化
- 情绪功能
- 声音设计
- 转场方式

## `data` 结构

```yaml
data:
  storyboard_version:
  total_shots:
  storyboard_summary:
  shot_highlights:
    - shot_id:
      shot_purpose:
      visual_focus:
      motion_note:
      emotion_note:
  continuity_rules:
    character_consistency:
    scene_consistency:
    motion_continuity:
  shotlist_file:
  prompt_hints:
    storyboard_prompt_focus:
    video_prompt_focus:
    audio_prompt_focus:
  risk_notes:
  next_action:
```

### 字段说明

- `storyboard_version`：本次分镜版本号。
- `total_shots`：镜头总数。
- `storyboard_summary`：供黑板和后续阶段读取的分镜摘要。
- `shot_highlights`：关键镜头列表。
- `continuity_rules`：角色、场景、运动连续性约束。
- `shotlist_file`：完整分镜路径。
- `prompt_hints`：交给提示词阶段的构图、视频、声音重点。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

### `shot_highlights` 结构

```yaml
shot_highlights:
  - shot_id:
    shot_purpose:
    visual_focus:
    motion_note:
    emotion_note:
```

说明：

- `shot_id`：镜头编号，如 `S01`
- `shot_purpose`：该镜头承担的叙事功能
- `visual_focus`：该镜头最核心的视觉抓手
- `motion_note`：镜头运动或角色动作重点
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
- 镜头总数
- 核心镜头策略
- 完整分镜路径
- 提示词阶段最需要继承的连续性规则和视觉重点

`summary` 使用中文；如需强调风格，可写为“夸张搞笑化（`exaggerated_comedy`）分镜已完成”。

## 长内容落盘

完整分镜写入：

- `details/shotlist_v*.md`

黑板只保留摘要和路径，不直接塞完整分镜表。

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
summary: 夸张搞笑化（`exaggerated_comedy`）分镜已完成，共 12 镜，完整分镜表已落盘。
data:
  storyboard_version: v1
  total_shots: 12
  storyboard_summary: 以误会升级为主线，镜头节奏从试探到爆发逐步加速，重点放大角色错愕与夸张反应。
  shot_highlights:
    - shot_id: S01
      shot_purpose: 建立白骨精接近与悟空预判的第一轮反差。
      visual_focus: 悟空的警觉表情与其他人放松状态的并置。
      motion_note: 缓慢推近悟空，再快速切到他视角。
      emotion_note: 建立轻悬疑里的喜剧预判。
    - shot_id: S07
      shot_purpose: 误会爆发点，强化唐僧和八戒的夸张震惊。
      visual_focus: 多角色表情连锁反应。
      motion_note: 连续快速切镜配合停顿回看。
      emotion_note: 放大错愕和无奈形成喜剧峰值。
  continuity_rules:
    character_consistency: 悟空始终保持敏捷警觉，唐僧与八戒的反应逐轮升级但不脱离各自身份。
    scene_consistency: 山林与妖洞的光影风格分别保持暖黄悬疑和冷色压迫，不跨镜跳变。
    motion_continuity: 每轮冲突升级前保留停顿镜头，镜头运动由稳到快逐步递进。
  shotlist_file: details/shotlist_v1.md
  prompt_hints:
    storyboard_prompt_focus: 强调夸张表情、误会反差和逐轮升级的镜头断点。
    video_prompt_focus: 保持角色一致性，突出动作停顿与节奏爆点。
    audio_prompt_focus: 在误会升级前后加入夸张停顿与反应音效。
  risk_notes:
    - 喜剧化表达不能滑向具体影视镜头复刻。
  next_action: 进入 scene-video-prompt-builder，按 shot_highlights 和 continuity_rules 组织提示词。
```

## 阶段推进建议

- `project_status: storyboard_ready`
- `next_stage: scene-video-prompt-builder`
