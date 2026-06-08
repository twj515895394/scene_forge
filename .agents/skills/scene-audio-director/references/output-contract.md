# scene-audio-director 输出协议

本文件定义 `scene-audio-director` 的输出形态、声音方案字段、Bridge/Blocking/道具状态声音连续性、表现力扩展声音设计、黑板摘要边界和长内容落盘方式。

本阶段只输出声音制作说明、音乐 prompt、拟音 prompt 和混音计划，不生成最终音频。

## 阶段定位

`scene-audio-director` 位于：

```text
scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
```

它不是最终视频提示词阶段，而是独立的声音导演阶段。

目标：

```text
把分镜、表演和情绪节拍转化为可执行的配音、拟音、环境音、音乐和混音方案。
```

本阶段还负责把动画物理、轻中度卡通伤害和反差喜剧转换为非写实的声音钩子。

---

# 一、上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-story-development`：`story_beats`、`hero_moment_candidates`、`ending_payoff`
- `scene-design-builder`：角色、场景、道具设定、全场景资产总参考图、`expressive_animation_design`、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-performance-director`：`performance_sheet_path`、角色表演锚点、停顿与反应节奏、Bridge 表演钩子、Blocking / 道具交互连续性、`physical_comedy_performance`、`contrast_performance`、`injury_reaction_performance`
- `scene-storyboard-director`：`segments`、`shot_highlights`、`expressive_storyboard_shots`、`stylized_action_shots`、`contrast_storyboard`、`hero_moments`、`bridge_shots`、`continuity_rules`、`prompt_hints`、`shotlist_file`、`blocking_map`、`faction_layout`、`prop_state_machines`
- 项目配置与阶段索引：`project_config.performance_style`、`project_config.segment_duration_seconds`、`project_config.target_total_duration_seconds`、上游阶段产出的 `segment_strategy` 与表现力扩展摘要
- 表现力扩展资产库（仅在需要声音模板时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`

---

# 二、输出路径

完整声音方案写入：

```text
details/audio_plan_v*.md
```

独立音频提示与混音计划写入：

```text
outputs/audio/music_prompt_v*.md
outputs/audio/foley_prompt_v*.md
outputs/audio/audio_mix_plan_v*.md
```

黑板只记录摘要和路径，不直接塞完整声音方案正文。

---

# 三、阶段补丁壳

```yaml
patch_type: scene-audio-director
stage: scene-audio-director
version: 3
status: pending | in_progress | completed | blocked | skipped
updated_at:
summary:
board_updates:
  state:
  routing:
  project_config:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created:
  - path:
    purpose:
    version:
files_updated:
  - path:
    purpose:
    version:
next_action:
```

---

# 四、`data` 结构

```yaml
data:
  audio_plan_version:
  expressive_animation_inheritance:
    enabled:
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
  audio_plan_path:
  music_prompt_path:
  foley_prompt_path:
  audio_mix_plan_path:
  audio_summary:
  voice_direction:
    language:
    overall_tone:
    pacing:
    breath_control:
    emotional_delivery:
    character_voice_notes:
      - character_id:
        character_name:
        voice_age:
        voice_texture:
        emotional_tone:
        pacing:
        pause_pattern:
        delivery_notes:
        contrast_voice_note:
  music_design:
    main_theme:
    leitmotif:
    instrumentation:
    tempo_range:
    emotional_curve:
    music_density:
    music_misdirection:
    silence_points:
      - beat_id:
        shot_id:
        purpose:
  foley_design:
    density:
    key_foley_moments:
      - shot_id:
        segment_id:
        sound:
        timing:
        purpose:
        related_prop_state:
        related_blocking:
        expressive_audio:
          sound_type: none | cartoon_physics | minor_injury_gag | contrast_sound | combined
          cartoon_action_sound:
          injury_gag_sound:
          contrast_sound:
          forbidden_realistic_sounds:
  expressive_audio_design:
    stylized_action_audio:
      - shot_id:
        beat_id:
        impact_sound:
        motion_sound:
        deformation_sound:
        hold_or_silence:
        recovery_sound:
    injury_gag_audio:
      - shot_id:
        beat_id:
        visible_injury:
        allowed_sound:
        comedic_timing:
        forbidden_realistic_sounds:
    contrast_audio:
      - shot_id:
        beat_id:
        contrast_type:
        sound_contrast:
        silence_or_pause:
        prop_sound:
        music_misdirection:
  ambience_design:
    location_bed:
    emotional_ambience:
    transition_ambience:
    blocking_ambience_note:
  segment_audio_plan:
    - segment_id:
      covered_shots:
      related_hero_moments:
      related_bridge_shots:
      voice_focus:
      music_focus:
      foley_focus:
      ambience_focus:
      expressive_audio_focus:
      silence_or_pause:
      continuity_in:
      continuity_out:
      bridge_audio_hook:
      blocking_audio_continuity:
      prop_state_audio_continuity:
      expressive_audio_continuity:
  video_prompt_handoff:
    must_include_audio_notes:
    music_prompt_usage:
    foley_prompt_usage:
    mix_notes:
    bridge_audio_usage:
    blocking_audio_usage:
    prop_state_audio_usage:
    expressive_audio_usage:
    forbidden_realistic_audio:
  risk_notes:
  next_action:
```

---

# 五、字段说明

- `audio_plan_version`：本次声音方案版本号。
- `expressive_animation_inheritance`：继承设计、剧本或分镜阶段沉淀的表现力扩展摘要。
- `audio_plan_path`：完整声音导演方案路径。
- `voice_direction`：配音方向，必须覆盖语言、总体语气、语速、气口、情绪递进和角色级声音设计。
- `contrast_voice_note`：声音体型反差或身份行为反差的配音提示，例如巨大角色使用轻柔语气。
- `music_design`：配乐设计，必须说明主情绪主题、乐器方向、速度范围、情绪曲线、音乐密度和静默点。
- `music_misdirection`：类型片误导或反差 reveal 的音乐策略，例如先严肃铺垫再用生活化小声释放。
- `foley_design`：拟音设计，必须服务动作、表情、道具、喜剧节奏、情绪停顿和道具状态变化。
- `expressive_audio`：镜头级表现力扩展声音字段。
- `expressive_audio_design`：统一记录动画物理声音、轻伤喜剧声音和反差声音。
- `stylized_action_audio`：动画物理动作声音，例如 boing、bonk、puff、rubber_thump、paper_slide。
- `injury_gag_audio`：轻中度卡通伤害声音，例如 bump_pop、tiny_alarm、stars_twinkle，但不得写实血腥。
- `contrast_audio`：反差喜剧声音，例如小自行车铃声和庞大体型之间的声音落差。
- `related_prop_state`：该拟音是否支撑某个道具状态变化。
- `related_blocking`：该拟音是否支撑角色站位、移动或空间关系变化。
- `ambience_design`：环境音设计。环境音不是随机背景噪声，而是场景情绪和空间关系的一部分。
- `segment_audio_plan`：按视频生成 Segment 输出声音计划。
- `expressive_audio_focus`：该 Segment 是否重点承载表现力扩展声音。
- `video_prompt_handoff`：交给 `scene-video-prompt-builder` 的整合说明。
- `video_prompt_handoff` 不应只停留在“需要继承声音”这类抽象提醒；下游视频提示词阶段默认应把这些信息显式展开为 pack 级声音执行摘要，以及每个 Segment 内独立的 `BGM / Foley-SFX / Ambience / Silence` 声音执行块。

最终视频 Prompt 必须把声音要求整合进每段 Prompt 正文，而不是只给一个独立音频文件名。

---

# 六、声音设计原则

## 1. 声音是叙事，不是装饰

不要写：

```text
加温暖音乐
```

要写：

```text
音乐在误解解除前保持轻微拨弦和低音铺底，误解解除后加入温暖木管主题，形成情绪释放。
```

## 2. 静默必须被设计

动画电影化表达经常用短暂停顿制造情绪和喜剧。

要明确：

```yaml
silence_points:
```

说明静默发生在哪个 Beat、哪个 Shot，以及目的是什么。

## 3. 拟音要角色化

同样是脚步声，不同角色应有不同声音质感。

```text
紧张角色的脚步轻而碎，权威角色的脚步低频更重。
```

## 4. 配音要写气口和停顿

不要只写“紧张地说”。

要写：

```text
前半句语速偏快，关键字前有半秒吸气，句尾压低音量，像在努力假装镇定。
```

## 5. 卡通动作声必须非写实

允许：

- boing
- bonk
- puff
- rubber_thump
- paper_slide
- tiny_alarm
- bell_ping
- soft_splat

禁止：

- bone_crack
- wet_gore_impact
- realistic_pain_scream
- weapon_stab_sound
- realistic_gunshot_into_body

## 6. 声音反差要服务 reveal

例如“大块头骑小自行车”可以使用：

```text
巨大身体的低频脚步铺垫 → reveal 后小车铃铛叮一声
```

声音反差要帮助观众吃到笑点，不要随机加滑稽音效。

---

# 七、黑板摘要建议

黑板补丁至少应说明：

- 声音方案版本号
- 完整声音方案路径
- 音乐、拟音、混音计划路径
- 表现力扩展声音策略
- 哪些镜头使用卡通动作声
- 哪些镜头使用轻伤喜剧声
- 哪些镜头使用声音反差
- 哪些写实伤害声被禁止
- 给视频提示词阶段的声音整合重点

---

# 八、阶段推进建议

完成后建议推进：

```yaml
board_updates:
  state:
    project_status: audio_ready
    next_stage: scene-video-prompt-builder
  stage_index:
    audio:
```
