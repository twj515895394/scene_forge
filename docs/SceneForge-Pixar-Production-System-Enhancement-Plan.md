# SceneForge Pixar Production System Enhancement Plan

## 背景

当前 SceneForge 已完成：

选题 -> 参考裁定 -> 资产检查 -> 设定 -> 剧本 -> 分镜 -> 视频 Prompt -> 发布

但当前系统仍主要聚焦于：

- 剧情
- 角色设定
- 分镜
- 视频生成

尚未完整覆盖 Pixar / DreamWorks 级别动画电影生产体系。

本方案目标：

将 SceneForge 从 AI 视频工作流升级为 AI 动画电影导演工作流。

---

# 一、建立 Pixar 风格协议层

新增顶层协议：

```yaml
style_profile:
  visual_style:
  character_style:
  camera_style:
  performance_style:
  sound_style:
  music_style:
  rhythm_style:
  humor_style:
```

默认支持：

- pixar
- dreamworks
- sony_animation
- disney_animation
- custom

---

# 二、新增 Character Appeal 模块

新增字段：

```yaml
character_appeal_profile:
  shape_language:
  silhouette_strength:
  facial_exaggeration:
  animation_energy:
```

目标：

让角色设计从“外观描述”升级为“动画角色设计”。

---

# 三、新增 Emotion Arc 模块

新增字段：

```yaml
emotion_arc:
  start:
  middle:
  climax:
  release:
```

要求：

每个项目必须定义情绪曲线。

---

# 四、新增 Pixar Camera Language

新增字段：

```yaml
camera_language_profile:
  emotional_push_in:
  environmental_storytelling:
  comedy_wide_shot:
  emotional_closeup:
```

升级 scene-storyboard-director。

让分镜输出从镜头记录升级为导演镜头设计。

---

# 五、新增 Acting Design

新增模块：

```yaml
acting_design:
  eye_focus_shift:
  anticipation_motion:
  secondary_action:
  micro_expression:
```

目标：

把 Pixar 式表演纳入 SOP。

---

# 六、新增 scene-performance-director Skill

位置：

.agents/skills/scene-performance-director

插入链路：

script
↓
performance-director
↓
storyboard

职责：

- 角色演技设计
- 表情设计
- 肢体设计
- 停顿设计
- 情绪释放设计

输出：

performance_sheet.md

---

# 七、新增 Sound Design System

新增：

```yaml
sound_design_profile:
  foley_density:
  ambient_storytelling:
  silence_usage:
```

要求：

声音不再作为 Prompt 附属内容。

成为独立生产资产。

---

# 八、新增 scene-audio-director Skill

位置：

.agents/skills/scene-audio-director

插入链路：

storyboard
↓
audio-director
↓
video-prompt-builder

职责：

- Foley
- Ambient
- Voice
- Music
- Silence

输出：

- music_prompt.md
- foley_prompt.md
- audio_mix_plan.md

---

# 九、新增 Pixar Music System

新增字段：

```yaml
music_design:
  main_theme:
  leitmotif:
  instrument_style:
  emotion_curve:
```

支持：

- Suno
- Udio
- Stable Audio
- ACE Step

音乐成为独立产物。

---

# 十、修正节奏系统

当前：

segment_duration_seconds

容易被理解为故事节奏。

实际应明确：

```yaml
segment_duration_seconds:
```

仅表示：

单个视频生成片段时长。

不是故事长度。

---

新增 Story Beat Layer

```yaml
story_beats:
  - beat_id:
    function:
    emotion:
    target_duration_seconds:
```

关系：

Story Beat
↓
Shot
↓
Segment
↓
Final Video

---

# 十一、升级 scene-storyboard-director

新增字段：

- beat_id
- emotional_goal
- camera_intent
- acting_intent
- sound_intent

当前镜头字段保留。

新增导演层字段。

---

# 十二、升级 scene-video-prompt-builder

新增输入来源：

- performance_sheet
- audio_mix_plan
- music_prompt

视频 Prompt 自动融合：

- 动作
- 表情
- 运镜
- 台词
- Foley
- 音乐
- 环境音

---

# 实施优先级

P0

- Story Beat 系统
- Performance Director
- Audio Director

P1

- Pixar Camera Language
- Emotion Arc
- Character Appeal

P2

- Leitmotif Music System
- Humor Engine
- Lighting Emotion System

最终目标：

SceneForge v1 = AI 视频生产系统

SceneForge v2 = AI 动画电影导演系统
