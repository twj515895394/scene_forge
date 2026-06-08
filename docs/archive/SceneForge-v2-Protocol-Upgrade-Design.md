# SceneForge v2 协议升级设计

## 目标

本文档用于把 `SceneForge Pixar Production System Enhancement Plan` 从方向性方案推进为可执行协议设计。

v2 的核心目标不是替换现有链路，而是在现有链路上补齐导演层能力：

- Story Beat：叙事节奏层
- Performance Direction：角色表演层
- Camera Language：镜头语言层
- Audio Direction：声音导演层
- Music Direction：配乐设计层
- Style Profile：动画电影风格协议层

v2 要解决的问题：

1. `segment_duration_seconds` 容易被误解为整片时长。
2. `performance_style` 目前过粗，只能表达喜剧/正剧/鬼畜等演绎方向。
3. 分镜字段已经覆盖镜头技术信息，但缺少导演意图、表演意图和声音意图。
4. 声音、配乐、拟音、静默目前只是视频 Prompt 的附属项，尚未成为独立产物。
5. Pixar 风格不应只落在画面和人物，应覆盖表演、镜头、声音、音乐、节奏、幽默和情绪曲线。

---

# 一、主链路升级

## v1 链路

```text
scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-storyboard-director
-> scene-video-prompt-builder
-> scene-publish-review
```

## v2 建议链路

```text
scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

新增两个 Skill：

- `scene-performance-director`
- `scene-audio-director`

保留现有主链路，不做破坏性替换。

---

# 二、PROJECT_BOARD v2 顶层协议

v2 顶层仍然坚持“薄索引”原则，只保存跨阶段路由和高价值索引，不塞长正文。

建议字段：

```yaml
---
project_name:
project_status:
next_stage:
lifecycle_flag:
blocker_note:
score:
production_level:
reference_type:
adaptation_level:
performance_style:
animation_style:
segment_duration_seconds:
target_total_duration_seconds:
story_beat_count:
shot_count:
segment_count:
created_at:
updated_at:
---
```

## 字段说明

### `performance_style`

保留 v1 字段。

继续表示演绎方向，例如：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

### `animation_style`

新增。

用于表达动画电影风格基线：

- `pixar_like`
- `dreamworks_like`
- `sony_animation_like`
- `disney_animation_like`
- `custom`

注意：这里使用 `*_like`，避免直接声明复刻某公司风格。

### `segment_duration_seconds`

必须明确：

> 单个视频生成片段的目标时长，不是整条视频总时长。

建议默认：

```yaml
segment_duration_seconds: 10
```

可选：

```yaml
segment_duration_seconds: 15
```

### `target_total_duration_seconds`

新增。

表示整条视频目标总时长，例如：

```yaml
target_total_duration_seconds: 60
```

### `story_beat_count`

新增。

表示叙事节拍数量。

### `shot_count`

表示完整分镜镜头数量。

### `segment_count`

表示最终视频生成片段数量。

---

# 三、三层时间模型

v2 必须区分三种时间：

```text
Story Beat Duration
Shot Duration
Segment Duration
```

## 1. Story Beat Duration

叙事/情绪节奏。

例如：

```yaml
beat_id: B01
function: setup
emotion: curiosity
target_duration_seconds: 12
```

## 2. Shot Duration

导演分镜节奏。

例如：

```yaml
shot_id: SH001
start_time: 00:00
end_time: 00:04
duration_seconds: 4
```

## 3. Segment Duration

视频生成技术切片。

例如：

```yaml
segment_id: S01
duration_seconds: 10
covered_shots:
  - SH001
  - SH002
  - SH003
```

## 正确关系

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

正确理解：

```text
Segment = 视频生成平台的最小生产单元
Story Beat = 故事节奏和情绪转折单元
Shot = 导演表达单元
```

---

# 四、Style Profile v2

新增阶段共享结构：

```yaml
style_profile:
  animation_style: pixar_like
  visual_style:
    shape_language:
    color_temperature:
    lighting_emotion:
  character_style:
    appeal_level:
    silhouette_strength:
    facial_exaggeration:
  camera_style:
    emotional_push_in:
    environmental_storytelling:
    comedy_wide_shot:
    emotional_closeup:
  performance_style:
    acting_energy:
    micro_expression_density:
    body_language_exaggeration:
  sound_style:
    foley_density:
    ambience_density:
    silence_usage:
  music_style:
    leitmotif_usage:
    orchestration_style:
    emotional_theme_repetition:
  rhythm_style:
    setup_pause_payoff:
    emotional_breathing_room:
    gag_timing:
  humor_style:
    character_comedy:
    reaction_comedy:
    visual_comedy:
    contrast_comedy:
```

该结构不建议完整写入顶层 YAML。

建议写入 `scene-design-builder` 或新增 `style-profile` 分区补丁中。

---

# 五、Story Beat Schema

建议由 `scene-script-adapter` 初步产出，由 `scene-storyboard-director` 细化。

```yaml
story_beats:
  - beat_id: B01
    title:
    function: setup
    emotion:
    dramatic_question:
    target_duration_seconds:
    key_action:
    key_expression:
    payoff_seed:
    notes:
```

## `function` 枚举

- `setup`
- `escalation`
- `misdirection`
- `reveal`
- `payoff`
- `release`
- `transition`

## 要求

每个 Beat 必须回答：

1. 这个节拍推动了什么？
2. 观众此刻应该感到什么？
3. 角色此刻的心理状态是什么？
4. 这个节拍为后面埋了什么？
5. 这个节拍如何被镜头和声音表达？

---

# 六、scene-performance-director 设计

## 位置

```text
.agents/skills/scene-performance-director/
```

## 触发条件

当：

```yaml
next_stage: scene-performance-director
```

且：

```yaml
project_status: script_ready
```

## 输入

- `PROJECT_BOARD.md`
- `scene-reference-decider` 边界
- `scene-design-builder` 角色设定
- `scene-script-adapter` 剧本摘要和完整剧本
- `story_beats`

## 输出路径

```text
projects/<project>/details/performance_sheet_v*.md
```

## 黑板补丁

```yaml
patch_type: scene-performance-director
version: 1
status: completed
updated_at:
summary:
data:
  performance_version:
  performance_sheet_path:
  acting_style:
  character_performance_profiles:
    - character_id:
      acting_energy:
      eye_focus_pattern:
      facial_expression_range:
      body_language:
      signature_gesture:
      emotional_leak:
  beat_performance_notes:
    - beat_id:
      emotional_goal:
      main_expression:
      micro_expression:
      body_action:
      pause_or_hold:
      secondary_action:
  continuity_rules:
    - rule:
```

## 关键规则

- 不只写“开心/难过”，必须写表演方式。
- 每个主要角色至少要有一个 `signature_gesture`。
- 每个关键 Beat 至少要有一个 `micro_expression`。
- 必须明确停顿、眼神、身体重心、手部小动作。

---

# 七、scene-storyboard-director v2 升级

现有字段继续保留。

新增导演层字段：

```yaml
shots:
  - shot_id:
    beat_id:
    start_time:
    end_time:
    duration_seconds:
    shot_size:
    camera_angle:
    camera_movement:
    camera_intent:
    character_action:
    acting_intent:
    facial_expression:
    blocking:
    lighting_change:
    emotional_goal:
    sound_intent:
    transition:
```

## 新增字段说明

### `beat_id`

绑定 Story Beat。

### `camera_intent`

说明镜头为什么这么拍。

例如：

```yaml
camera_intent: 用缓慢推进压缩空间，让观众进入角色的尴尬和犹豫。
```

### `acting_intent`

说明表演目的。

例如：

```yaml
acting_intent: 通过眼神飘移和手指轻敲表现角色想掩饰紧张。
```

### `sound_intent`

说明声音目的。

例如：

```yaml
sound_intent: 音乐暂时抽空，只保留衣料摩擦和远处环境声，突出沉默压力。
```

---

# 八、scene-audio-director 设计

## 位置

```text
.agents/skills/scene-audio-director/
```

## 触发条件

当：

```yaml
next_stage: scene-audio-director
```

且：

```yaml
project_status: storyboard_ready
```

## 输入

- 完整分镜
- performance sheet
- style profile
- reference boundary

## 输出路径

```text
projects/<project>/details/audio_plan_v*.md
projects/<project>/outputs/audio/music_prompt_v*.md
projects/<project>/outputs/audio/foley_prompt_v*.md
projects/<project>/outputs/audio/audio_mix_plan_v*.md
```

## 黑板补丁

```yaml
patch_type: scene-audio-director
version: 1
status: completed
updated_at:
summary:
data:
  audio_plan_version:
  audio_plan_path:
  music_prompt_path:
  foley_prompt_path:
  audio_mix_plan_path:
  voice_direction:
    language:
    performance_tone:
    pacing:
    emotional_delivery:
  music_design:
    main_theme:
    leitmotif:
    instrumentation:
    emotional_curve:
    silence_points:
  foley_design:
    density:
    key_foley_moments:
      - shot_id:
        sound:
        purpose:
  ambience_design:
    location_bed:
    emotional_ambience:
  mix_notes:
    - note:
```

## 关键规则

- 音乐不是背景填充，而是情绪叙事工具。
- 拟音必须服务角色动作和喜剧节奏。
- 静默必须被设计，而不是缺省。
- 配音要写清语速、气口、停顿、情绪递进。

---

# 九、Music Prompt Schema

建议输出独立文件。

```yaml
music_prompt:
  target_platform:
  duration_seconds:
  style:
  instrumentation:
  tempo:
  mood_arc:
  leitmotif:
  section_plan:
    - section_id:
      start_time:
      end_time:
      emotion:
      arrangement:
  avoid:
    - copyrighted_theme
    - recognizable_existing_score
```

## 平台适配

可选：

- `suno`
- `udio`
- `stable_audio`
- `ace_step`
- `mmaudio`
- `generic`

---

# 十、Voice Direction Schema

```yaml
voice_direction:
  character_id:
  voice_age:
  voice_texture:
  emotional_tone:
  pacing:
  breath_control:
  pause_pattern:
  delivery_notes:
```

示例：

```yaml
voice_direction:
  character_id: hero
  voice_age: young_adult
  voice_texture: warm_but_nervous
  emotional_tone: trying_to_sound_confident_but_leaking_panic
  pacing: starts_fast_then_breaks_into_short_pauses
  breath_control: shallow_breath_before_key_line
  pause_pattern: half-second pause before confession
  delivery_notes: 不要播音腔，要像角色真实在压住情绪。
```

---

# 十一、Segment Plan v2

```yaml
segments:
  - segment_id: S01
    duration_seconds: 10
    covered_beats:
      - B01
    covered_shots:
      - SH001
      - SH002
      - SH003
    story_function: 建立环境和角色处境
    rhythm_function: setup
    continuity_in:
    continuity_out:
    reference_images:
    video_prompt_path:
```

## 规则

- 一个 Segment 可以覆盖多个 Shot。
- 一个 Beat 可以跨多个 Segment。
- 一个 Segment 也可以跨 Beat 边界，但必须写清 `continuity_in` 和 `continuity_out`。
- 不能用 Segment 替代 Story Beat。

---

# 十二、project_status v2 枚举

建议新增：

```text
performance_ready
audio_ready
```

完整枚举：

```text
draft
topic_scored
reference_decided
assets_checked
design_ready
script_ready
performance_ready
storyboard_ready
audio_ready
video_prompts_ready
published
reviewed
archived
```

---

# 十三、next_stage v2 枚举

新增：

```text
scene-performance-director
scene-audio-director
```

完整主链路：

```text
scene-topic-gate
scene-reference-decider
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
scene-storyboard-director
scene-audio-director
scene-video-prompt-builder
scene-publish-review
```

---

# 十四、迁移策略

## 阶段 1：文档冻结

先提交：

- v2 协议设计文档
- Pixar Production Enhancement Plan

## 阶段 2：新增 Skill 骨架

新增：

```text
.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-performance-director/references/output-contract.md
.agents/skills/scene-audio-director/SKILL.md
.agents/skills/scene-audio-director/references/output-contract.md
```

## 阶段 3：升级现有 Skill contract

修改：

```text
scene-script-adapter
scene-storyboard-director
scene-video-prompt-builder
```

## 阶段 4：更新 PROJECT_BOARD 模板

加入：

- performance 分区
- audio 分区
- story beat 摘要字段

## 阶段 5：跑一个样例项目

选择一个简单片段进行验证：

- 30 秒
- 3 个 Story Beats
- 8-12 个 Shots
- 3 个 10 秒 Segments

---

# 十五、最小可行落地版本

MVP 不需要一次完成全部 Pixar 系统。

建议最小版本只做：

1. 修正 `segment_duration_seconds` 解释。
2. 增加 `target_total_duration_seconds`。
3. 增加 `story_beats`。
4. 新增 `scene-performance-director`。
5. 新增 `scene-audio-director`。
6. 让 `scene-video-prompt-builder` 读取 performance/audio 输出。

完成以上，SceneForge 就从“视频提示词流水线”升级为“动画导演流水线”的第一版。
