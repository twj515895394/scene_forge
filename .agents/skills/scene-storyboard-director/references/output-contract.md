# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、三层时间模型、分段规则、故事板 prompt 和长分镜落盘方式。

## 阶段定位

`scene-storyboard-director` 位于：

```text
scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
```

本阶段负责把 Story Beat 和表演导演结果转化为可执行分镜。

它不是单纯镜头清单，而是导演分镜：必须说明镜头为什么这样拍、表演为什么这样处理、声音为什么这样设计。

---

# 一、阶段补丁壳

```yaml
patch_type: scene-storyboard-director
version: 2
status:
updated_at:
summary:
data:
```

---

# 二、上游输入

本阶段默认消费以下结果：

- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`storyboard_hints`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、表演连续性规则
- `scene-design-builder`：角色与场景设定摘要、视觉语言和一致性锚点
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`

---

# 三、风格执行要求

分镜设计必须继承顶层 `performance_style`：

- `cinematic_serious`：偏电影化节奏与正剧张力
- `cinematic_comedy`：偏轻喜剧节奏与角色反应
- `exaggerated_comedy`：强化夸张反应、反差停顿和喜剧节奏
- `absurd_chaotic`：强化鬼畜式节奏推进、离谱升级和高反差调度

当前 pixar_like 路线下，分镜还必须继承：

- 角色魅力优先
- 表演先于台词
- 情绪先于动作
- 停顿服务喜剧和情绪释放
- 声音意图必须提前进入镜头设计

---

# 四、三层时间模型

必须区分：

```text
Story Beat Duration
Shot Duration
Segment Duration
```

## 1. Story Beat Duration

叙事/情绪节奏。

由 `scene-script-adapter` 初步给出。

## 2. Shot Duration

导演分镜节奏。

由本阶段决定。

## 3. Segment Duration

视频生成技术切片。

通常为 10 秒或 15 秒。

注意：

```text
segment_duration_seconds 表示单个视频生成片段时长，不是整条视频总时长。
```

正确关系：

```text
Story Beat
  -> Shot
    -> Segment
      -> Final Video
```

错误理解：

```text
Segment = Story
```

---

# 五、分段规则

- 默认 `segment_duration_seconds = 10`
- 若单个技术分段承载不下关键动作、台词和情绪起伏，可在用户确认后改为 `15`
- 分段结果一旦确认，后续声音导演和视频提示词阶段必须继承，不再二次拆段
- 一个 Segment 可以覆盖多个 Shot
- 一个 Story Beat 可以跨多个 Shot
- 一个 Story Beat 也可以跨多个 Segment，但必须写清 `continuity_in` 和 `continuity_out`

---

# 六、分镜字段

完整分镜至少覆盖以下字段：

- 镜头编号
- 所属 Beat
- 起止时间
- 时长
- 景别
- 机位
- 镜头运动
- 镜头意图
- 角色动作
- 表演意图
- 表情变化
- 场景调度
- 光影变化
- 台词/声音提示
- 声音意图
- 情绪功能
- 转场方式

---

# 七、`data` 结构

```yaml
data:
  storyboard_version:
  segment_duration_seconds:
  target_total_duration_seconds:
  total_story_beats:
  total_shots:
  total_segments:
  storyboard_summary:
  segments:
    - segment_id:
      duration_seconds:
      covered_beats:
        - beat_id:
      covered_shots:
        - shot_id:
      story_function:
      rhythm_function:
      continuity_in:
      continuity_out:
  shot_highlights:
    - shot_id:
      beat_id:
      start_second:
      end_second:
      shot_purpose:
      camera_intent:
      visual_focus:
      motion_note:
      acting_intent:
      facial_expression:
      dialogue_cue:
      sound_intent:
      emotion_note:
  continuity_rules:
    character_consistency:
    performance_consistency:
    scene_consistency:
    motion_continuity:
    audio_continuity_hint:
  shotlist_file:
  storyboard_prompt_files:
    - file:
      purpose:
  audio_handoff:
    voice_direction_hints:
    foley_priority:
    music_timing_hints:
    silence_points:
  prompt_hints:
    video_prompt_focus:
    reference_image_usage:
    segment_connection_focus:
  risk_notes:
  next_action:
```

---

# 八、字段说明

- `storyboard_version`：本次分镜版本号。
- `segment_duration_seconds`：单个视频生成片段时长，默认 `10`。
- `target_total_duration_seconds`：整片目标总时长。
- `total_story_beats`：Story Beat 总数。
- `total_shots`：镜头总数。
- `total_segments`：视频生成 Segment 总数。
- `storyboard_summary`：供黑板和后续阶段读取的分镜摘要。
- `segments`：每段覆盖哪些 Beat 和 Shot，以及这段的叙事/节奏功能。
- `shot_highlights`：关键镜头列表。
- `continuity_rules`：角色、表演、场景、运动和声音连续性约束。
- `shotlist_file`：完整分镜路径。
- `storyboard_prompt_files`：可直接生成故事板图的 prompt 文件列表。
- `audio_handoff`：交给 `scene-audio-director` 的声音设计提示。
- `prompt_hints`：交给视频提示词阶段的重点。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

---

# 九、`segments` 结构

```yaml
segments:
  - segment_id:
    duration_seconds:
    covered_beats:
      - B01
    covered_shots:
      - SH001
      - SH002
    story_function:
    rhythm_function:
    continuity_in:
    continuity_out:
```

说明：

- `segment_id`：分段编号，如 `SEG01`
- `duration_seconds`：该段时长，通常为 `10` 或 `15`
- `covered_beats`：该段覆盖的 Story Beat 编号列表
- `covered_shots`：该段覆盖的镜头编号列表
- `story_function`：该段承担的叙事任务
- `rhythm_function`：该段承担的节奏任务，如 `setup / build / payoff / release`
- `continuity_in`：该段开头如何承接上一段
- `continuity_out`：该段结尾如何交给下一段

---

# 十、`shot_highlights` 结构

```yaml
shot_highlights:
  - shot_id:
    beat_id:
    start_second:
    end_second:
    shot_purpose:
    camera_intent:
    visual_focus:
    motion_note:
    acting_intent:
    facial_expression:
    dialogue_cue:
    sound_intent:
    emotion_note:
```

说明：

- `shot_id`：镜头编号，如 `SH001`
- `beat_id`：所属 Story Beat 编号，如 `B01`
- `start_second` / `end_second`：镜头在整支视频中的时间轴位置
- `shot_purpose`：该镜头承担的叙事功能
- `camera_intent`：为什么使用这个景别、机位和镜头运动
- `visual_focus`：该镜头最核心的视觉抓手
- `motion_note`：镜头运动或角色动作重点
- `acting_intent`：该镜头中表演如何服务情绪目标
- `facial_expression`：关键表情或微表情
- `dialogue_cue`：该镜头最关键的台词
- `sound_intent`：声音在该镜头中的叙事目的
- `emotion_note`：该镜头要传递的情绪或喜剧效果

---

# 十一、黑板摘要建议

黑板补丁至少应说明：

- 分镜版本号
- 整片目标时长
- 单个 Segment 时长和总段数
- Story Beat 总数
- 镜头总数
- 核心镜头策略
- 每段覆盖哪些 Beat 和 Shot
- 故事板 prompt 文件路径
- 完整分镜路径
- 声音导演阶段最需要继承的配音、拟音、音乐和静默点提示
- 视频提示词阶段最需要继承的连续性规则和视觉重点

`summary` 使用中文；如需强调风格，可写为“夸张搞笑化（`exaggerated_comedy`）分镜已完成”。

---

# 十二、长内容落盘

完整分镜写入：

```text
details/shotlist_v*.md
```

故事板 prompt 写入：

```text
outputs/storyboard_prompts/storyboard_prompt_v*.md
```

黑板只保留摘要和路径，不直接塞完整分镜表或完整 prompt。

---

# 十三、prompt 文档语言规范

- 故事板 prompt 文档默认以中文为主。
- 镜头用途、画面描述、构图重点、动作与表情要求优先用中文表达。
- 若某个出图平台对英文更敏感，可基于中文主文档再派生英文版，但中文主文档始终保留。

---

# 十四、阻塞规则

只要能给出镜头主线、关键镜头、Segment Plan 和连续性规则，就不应阻塞。

即使个别镜头还可继续细修，也可以先完成本阶段。

只有在以下情况下才使用 `status: blocked`：

- Story Beat 不清，无法拆镜
- performance sheet 缺失且无法推断表演重点
- 参考/设计边界冲突到无法做镜头表达
- 无法形成 Segment Plan

---

# 十五、示例

```yaml
patch_type: scene-storyboard-director
version: 2
status: completed
updated_at: 2026-06-02
summary: 夸张搞笑化（`exaggerated_comedy`）分镜已完成，目标 30 秒，按 10 秒分为 3 段，共 3 个 Story Beat、12 个镜头。
data:
  storyboard_version: v1
  segment_duration_seconds: 10
  target_total_duration_seconds: 30
  total_story_beats: 3
  total_shots: 12
  total_segments: 3
  storyboard_summary: 以误会升级为主线，镜头节奏从观察、停顿到爆发逐步加速，重点放大角色眼神和群体反应。
  segments:
    - segment_id: SEG01
      duration_seconds: 10
      covered_beats:
        - B01
      covered_shots:
        - SH001
        - SH002
        - SH003
        - SH004
      story_function: 建立异常、主角警觉和旁人迟钝反差。
      rhythm_function: setup
      continuity_in: 从环境建立镜头进入，声音保持自然环境底噪。
      continuity_out: 以主角半秒停顿结束，交给下一段误会升级。
  shot_highlights:
    - shot_id: SH001
      beat_id: B01
      start_second: 0.0
      end_second: 2.4
      shot_purpose: 建立异常目标接近与主角预判。
      camera_intent: 用缓慢推进压缩空间，让观众进入主角警觉状态。
      visual_focus: 主角眼神锁定目标，背景角色仍放松。
      motion_note: 镜头从中景缓慢推至主角半近景。
      acting_intent: 通过眼神先动、身体后动表现主角已经判断出异常。
      facial_expression: 眉毛微压，嘴角收紧但努力装作平静。
      dialogue_cue: 无台词，留给表演和环境声。
      sound_intent: 音乐轻微收窄，保留衣料摩擦和环境底噪。
      emotion_note: 建立轻悬疑里的喜剧预判。
  continuity_rules:
    character_consistency: 角色比例、服装和表情层级继承设定卡。
    performance_consistency: 主角始终先用眼神反应，再用身体动作跟进。
    scene_consistency: 场景光影保持暖色基底，冲突升级时局部对比增强。
    motion_continuity: 每轮冲突升级前保留停顿镜头，镜头运动由稳到快。
    audio_continuity_hint: 每段结尾保留环境底噪，帮助后续 Segment 拼接。
  shotlist_file: details/shotlist_v1.md
  storyboard_prompt_files:
    - file: outputs/storyboard_prompts/storyboard_prompt_v1.md
      purpose: 生成 12 个关键故事板图
  audio_handoff:
    voice_direction_hints: 主角语速先快后卡顿，解释失败时气口明显。
    foley_priority: 手指收紧衣袖、脚步停顿、道具轻响。
    music_timing_hints: B02 爆点前抽空音乐，B03 释放时加入温暖主题。
    silence_points: B01 结尾、B02 爆点前各保留短暂停顿。
  prompt_hints:
    video_prompt_focus: 每段都要继承眼神、停顿、反应镜头和环境底噪。
    reference_image_usage: 每段使用对应故事板图作为构图参考。
    segment_connection_focus: 每段结尾保留动作或声音连续性钩子。
  risk_notes:
    - 不复刻原片具体机位和演员表演。
  next_action: 进入 scene-audio-director，基于分镜和 audio_handoff 设计完整声音方案。
```

---

# 十六、阶段推进建议

完成后建议推进：

```yaml
project_status: storyboard_ready
next_stage: scene-audio-director
```

顶层建议写入：

```yaml
segment_duration_seconds:
target_total_duration_seconds:
shot_count:
segment_count:
```
