# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、三层时间模型、分段规则、Hero Shot、Bridge Shot、Blocking/Faction 连续性、故事板 prompt 和长分镜落盘方式。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

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

# 一、确认闸门

本阶段默认不能直接落盘正式分镜和故事板 prompt。必须先输出分镜方案预览，并等待用户确认。

分镜方案预览至少包含：

- 镜头数量建议
- Segment Plan
- Hero Shot / Hero Moment 候选
- Bridge Shot / 桥接分镜候选
- Blocking Map 和 Faction Layout 继承策略
- 核心道具状态变化继承策略
- 故事板 prompt 输出范围
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-storyboard-director
version: 3
status:
updated_at:
summary:
data:
```

---

# 三、上游输入

本阶段默认消费以下结果：

- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`storyboard_hints`、`hero_moment_candidates`、`segment_strategy`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、表演连续性规则
- `scene-design-builder`：角色与场景设定摘要、视觉语言和一致性锚点、`blocking_map`、`faction_layout`、`prop_state_machines`
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`、`segment_strategy`

---

# 四、风格执行要求

分镜设计必须继承顶层 `performance_style`：

- `cinematic_serious`：偏电影化节奏与正剧张力
- `cinematic_comedy`：偏轻喜剧节奏与角色反应
- `exaggerated_comedy`：强化夸张反应、反差停顿和喜剧节奏
- `absurd_chaotic`：强化鬼畜式节奏推进、离谱升级和高反差调度

当前动画电影化路线下，分镜还必须继承：

- 角色魅力优先
- 表演先于台词
- 情绪先于动作
- 停顿服务喜剧和情绪释放
- 声音意图必须提前进入镜头设计

---

# 五、三层时间模型

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

通常为 10 秒、15 秒或经用户确认的混合分段。

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

# 六、分段规则

- 默认 `segment_duration_seconds = 10`
- 若单个技术分段承载不下关键动作、台词和情绪起伏，可在用户确认后改为 `15` 或混合分段
- 分段结果一旦确认，后续声音导演和视频提示词阶段必须继承，不再二次拆段
- 一个 Segment 可以覆盖多个 Shot
- 一个 Story Beat 可以跨多个 Shot
- 一个 Story Beat 也可以跨多个 Segment，但必须写清 `continuity_in` 和 `continuity_out`
- Segment 之间如存在动作、视线、空间或声音断点，必须补充 `bridge_shots`

---

# 七、分镜字段

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
- Blocking / 站位说明
- 道具状态
- 光影变化
- 台词/声音提示
- 声音意图
- 情绪功能
- 是否 Hero Shot
- 是否 Bridge Shot
- 转场方式

---

# 八、`data` 结构

```yaml
data:
  storyboard_confirmation:
    confirmed_by_user: false
    confirmation_note:
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
      bridge_required: false
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
      hero_shot: false
      bridge_shot: false
      blocking_note:
      prop_state_note:
  hero_moments:
    - hero_id:
      title:
      related_beat:
      related_shot:
      reason:
      visual_payoff:
      prompt_priority:
  bridge_shots:
    - bridge_id:
      from_segment:
      to_segment:
      related_shot:
      purpose:
      continuity_in:
      continuity_out:
      visual_hook:
      audio_hook:
  blocking_map:
    spatial_axis:
    zones:
      - zone_id:
        description:
        allowed_characters:
        forbidden_characters:
    continuity_rule:
  faction_layout:
    factions:
      - faction_id:
        members:
        default_zone:
        forbidden_zones:
  prop_state_machines:
    - prop_name:
      current_storyboard_usage:
      states:
        - state_id:
          description:
          visible_evidence:
          allowed_interaction:
          safety_boundary:
  continuity_rules:
    character_consistency:
    performance_consistency:
    scene_consistency:
    motion_continuity:
    audio_continuity_hint:
    blocking_continuity:
    prop_state_continuity:
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
    blocking_reference_usage:
    prop_state_reference_usage:
  risk_notes:
  next_action:
```

---

# 九、字段说明

- `storyboard_confirmation`：记录用户是否确认分镜方案。正式落盘时应为 `confirmed_by_user: true`。
- `storyboard_version`：本次分镜版本号。
- `segment_duration_seconds`：单个视频生成片段时长，默认 `10`。
- `target_total_duration_seconds`：整片目标总时长。
- `total_story_beats`：Story Beat 总数。
- `total_shots`：镜头总数。
- `total_segments`：视频生成 Segment 总数。
- `storyboard_summary`：供黑板和后续阶段读取的分镜摘要。
- `segments`：每段覆盖哪些 Beat 和 Shot，以及这段的叙事/节奏功能。
- `shot_highlights`：关键镜头列表。
- `hero_moments`：最终确认的看点镜头。
- `bridge_shots`：Segment 之间用于动作、视线、空间或声音衔接的桥接分镜。
- `blocking_map`：通用空间调度图，记录角色可出现和不可出现的区域。
- `faction_layout`：通用阵营布局，记录角色阵营、默认区域和禁止区域。
- `prop_state_machines`：核心道具状态机在分镜阶段的使用方式。
- `continuity_rules`：角色、表演、场景、运动、声音、站位和道具状态连续性约束。
- `shotlist_file`：完整分镜路径。
- `storyboard_prompt_files`：可直接生成故事板图的 prompt 文件列表。
- `audio_handoff`：交给 `scene-audio-director` 的声音设计提示。
- `prompt_hints`：交给视频提示词阶段的重点。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

---

# 十、Hero Shot 规则

每个项目都应根据自己的剧情自动识别 Hero Shot，而不是复用某个样例项目的看点。

Hero Shot 必须说明：

- 为什么它是看点
- 属于哪个 Beat 和 Shot
- 承担哪种叙事或情绪功能
- 视觉上如何强化
- 后续故事板 prompt 和视频 prompt 是否需要优先保障

Hero Shot 可以是反转、高潮动作、关键表情、道具揭示、喜剧停顿、情绪释放或其他适合当前项目的记忆点。

---

# 十一、Bridge Shot 规则

Bridge Shot 用于解决 Segment 之间的动作、视线、空间、声音和道具状态衔接问题。

以下情况必须考虑 Bridge Shot：

- Segment 结尾动作未自然交给下一段
- 角色从一个空间位置切换到另一个空间位置
- 关键道具状态跨段变化
- 声音或台词气口需要延续
- 情绪从对峙、铺垫、反转、爆发或释放之间切换

Bridge Shot 不是复杂新概念，只是分镜中的桥接镜头，应直接进入 shotlist 和故事板 prompt。

---

# 十二、Blocking / Faction 规则

多角色项目必须继承或补充 `blocking_map` 与 `faction_layout`。

每个主要角色应明确：

- 默认站位区域
- 允许移动区域
- 禁止区域
- 所属阵营或关系组
- 与主冲突线、道具、镜头动线的关系

这些规则只能降低视频生成抽卡成本，不能保证一次生成完全稳定。

---

# 十三、黑板摘要建议

黑板补丁至少应说明：

- 用户是否确认分镜方案
- 分镜版本号
- 整片目标时长
- 单个 Segment 时长和总段数
- Story Beat 总数
- 镜头总数
- 核心镜头策略
- 每段覆盖哪些 Beat 和 Shot
- Hero Shot 列表
- Bridge Shot 列表
- Blocking / Faction 规则摘要
- 道具状态连续性摘要
- 故事板 prompt 文件路径
- 完整分镜路径
- 声音导演阶段最需要继承的配音、拟音、音乐和静默点提示
- 视频提示词阶段最需要继承的连续性规则和视觉重点

`summary` 使用中文；如需强调风格，可写为“夸张搞笑化（`exaggerated_comedy`）分镜已完成”。

---

# 十四、长内容落盘

完整分镜写入：

```text
details/shotlist_v*.md
```

故事板 prompt 写入：

```text
outputs/storyboard_prompts/storyboard_prompt_v*.md
```

黑板只保留摘要和路径，不直接塞完整分镜表或完整 prompt。

本阶段不得声称已经生成故事板图片，只能说明已经生成用于外部平台制作故事板图的 prompt。

---

# 十五、prompt 文档语言规范

- 故事板 prompt 文档默认以中文为主。
- 镜头用途、画面描述、构图重点、动作与表情要求优先用中文表达。
- 若某个出图平台对英文更敏感，可基于中文主文档再派生英文版，但中文主文档始终保留。

---

# 十六、阻塞规则

只要用户已确认分镜方案，并且能给出镜头主线、关键镜头、Segment Plan、Hero Shot、Bridge Shot 和连续性规则，就不应阻塞。

即使个别镜头还可继续细修，也可以先完成本阶段。

只有在以下情况下才使用 `status: blocked`：

- 用户尚未确认分镜方案，且当前阶段必须等待确认
- Story Beat 不清，无法拆镜
- performance sheet 缺失且无法推断表演重点
- 参考/设计边界冲突到无法做镜头表达
- 无法形成 Segment Plan
- 无法形成必要的连续性规则

---

# 十七、阶段推进建议

完成后建议推进：

```yaml
project_status: storyboard_ready
next_stage: scene-audio-director
```

顶层建议写入或更新：

```yaml
segment_strategy:
hero_moments:
bridge_shots:
blocking_map:
faction_layout:
prop_state_machines:
user_confirmations:
  storyboard_plan_confirmed: true
```
