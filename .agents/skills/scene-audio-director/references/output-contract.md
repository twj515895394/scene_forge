# scene-audio-director 输出协议

本文件定义 `scene-audio-director` 的输出形态、声音方案字段、Bridge/Blocking/道具状态声音连续性、黑板摘要边界和长内容落盘方式。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

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

---

# 一、上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-design-builder`：角色、场景、道具设定、全场景资产总参考图、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-performance-director`：`performance_sheet_path`、角色表演锚点、停顿与反应节奏、Bridge 表演钩子、Blocking / 道具交互连续性
- `scene-storyboard-director`：`segments`、`shot_highlights`、`hero_moments`、`bridge_shots`、`continuity_rules`、`prompt_hints`、`shotlist_file`、`blocking_map`、`faction_layout`、`prop_state_machines`
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`、`segment_strategy`

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
version: 2
status:
updated_at:
summary:
data:
```

---

# 四、`data` 结构

```yaml
data:
  audio_plan_version:
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
  music_design:
    main_theme:
    leitmotif:
    instrumentation:
    tempo_range:
    emotional_curve:
    music_density:
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
      silence_or_pause:
      continuity_in:
      continuity_out:
      bridge_audio_hook:
      blocking_audio_continuity:
      prop_state_audio_continuity:
  video_prompt_handoff:
    must_include_audio_notes:
    music_prompt_usage:
    foley_prompt_usage:
    mix_notes:
    bridge_audio_usage:
    blocking_audio_usage:
    prop_state_audio_usage:
  risk_notes:
  next_action:
```

---

# 五、字段说明

- `audio_plan_version`：本次声音方案版本号。
- `audio_plan_path`：完整声音导演方案路径。
- `voice_direction`：配音方向，必须覆盖语言、总体语气、语速、气口、情绪递进和角色级声音设计。
- `music_design`：配乐设计，必须说明主情绪主题、乐器方向、速度范围、情绪曲线、音乐密度和静默点。
- `foley_design`：拟音设计，必须服务动作、表情、道具、喜剧节奏、情绪停顿和道具状态变化。
- `related_prop_state`：该拟音是否支撑某个道具状态变化。
- `related_blocking`：该拟音是否支撑角色站位、移动或空间关系变化。
- `ambience_design`：环境音设计。环境音不是随机背景噪声，而是场景情绪和空间关系的一部分。
- `blocking_ambience_note`：角色空间距离、遮挡或区域变化是否通过环境声体现。
- `segment_audio_plan`：按视频生成 Segment 输出声音计划。
- `related_hero_moments`：本段音频是否支撑看点镜头。
- `related_bridge_shots`：本段音频是否支撑桥接分镜。
- `bridge_audio_hook`：交给下一段的动作余音、环境底噪、台词气口或音乐尾音。
- `blocking_audio_continuity`：角色空间变化如何通过声音保持连续。
- `prop_state_audio_continuity`：道具状态变化如何通过拟音或环境声保持连续。
- `video_prompt_handoff`：交给 `scene-video-prompt-builder` 的整合说明。

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

## 5. 音乐不能复刻受保护旋律

允许使用：

```text
温暖木管、轻弦乐、家庭动画电影感、主题动机反复变奏
```

避免使用：

```text
某部具体电影的主题曲
某个作曲家的可识别旋律
```

## 6. 声音要服务桥接和连续性

Segment 之间如果存在动作、视线、空间或道具状态衔接，声音应提供钩子：

- 动作余音
- 环境底噪延续
- 台词气口
- 音乐尾音
- 道具拟音的状态延续

---

# 七、黑板摘要建议

黑板补丁至少应说明：

- 声音方案版本号
- 完整声音方案路径
- 音乐 Prompt 路径
- 拟音 Prompt 路径
- 混音计划路径
- 配音方向摘要
- 每个 Segment 的声音重点
- Hero Shot 的声音强化
- Bridge Shot 的声音钩子
- Blocking / Faction 的声音连续性
- 道具状态的声音连续性
- 静默点设计
- 视频提示词阶段必须继承的音频要求

---

# 八、阻塞规则

只要已有分镜、Segment Plan 和基本表演信息，就不应阻塞。

可以先输出 v1 声音方案，再后续细化。

只有在以下情况下才使用 `status: blocked`：

- 分镜缺失，无法知道镜头和 Segment 覆盖范围
- 角色身份缺失，无法设计配音方向
- 场景缺失，无法设计环境音
- 上游参考边界冲突导致无法判断声音风格

---

# 九、示例

```yaml
patch_type: scene-audio-director
version: 2
status: completed
updated_at: 2026-06-02
summary: 声音导演已完成，已为 3 个 Segment 设计配音气口、拟音、环境音、音乐曲线、Bridge 声音钩子和道具状态声音连续性。
data:
  audio_plan_version: v1
  audio_plan_path: details/audio_plan_v1.md
  music_prompt_path: outputs/audio/music_prompt_v1.md
  foley_prompt_path: outputs/audio/foley_prompt_v1.md
  audio_mix_plan_path: outputs/audio/audio_mix_plan_v1.md
  audio_summary: 本次声音以环境底噪、动作余音和短暂停顿支撑段落拼接，音乐只在情绪释放点抬升。
  voice_direction:
    language: zh-CN
    overall_tone: 夸张但不失真实气口。
    pacing: 前段克制，中段加速，爆点前短暂停顿。
    breath_control: 关键台词前保留半秒吸气。
    emotional_delivery: 情绪递进从试探到压迫，再到释放。
    character_voice_notes:
      - character_id: hero
        character_name: 主角
        voice_age: adult
        voice_texture: 声音偏低，带轻微压迫感。
        emotional_tone: 冷静外壳下有逐渐显露的怒气。
        pacing: 慢起，中段压低，爆点前停顿。
        pause_pattern: 关键反问前停顿 0.4 秒。
        delivery_notes: 不要大喊，用气口和重音制造压力。
  music_design:
    main_theme: 低频拨弦和轻木管组成的喜剧压迫主题。
    leitmotif: 关键道具出现时短促重复一次。
    instrumentation: 低音拨弦、木管、轻打击。
    tempo_range: 90-110 BPM
    emotional_curve: 前段克制，中段收窄，爆点释放。
    music_density: 爆点前减少音乐，让台词和拟音突出。
    silence_points:
      - beat_id: B02
        shot_id: SH006
        purpose: 给反应停顿和观众预判空间。
  foley_design:
    density: medium
    key_foley_moments:
      - shot_id: SH006
        segment_id: SEG02
        sound: 关键道具被触碰的轻微金属声。
        timing: 台词停顿后 0.2 秒。
        purpose: 暗示道具状态即将变化。
        related_prop_state: prop_state_02
        related_blocking: 角色仍保持在默认区域内伸手触碰道具。
  ambience_design:
    location_bed: 稳定环境底噪，段落之间不断裂。
    emotional_ambience: 冲突升级时轻微压低环境声。
    transition_ambience: 每段结尾保留 0.5 秒环境尾音。
    blocking_ambience_note: 角色距离变化通过脚步声和空间反射轻微体现。
  segment_audio_plan:
    - segment_id: SEG01
      covered_shots:
        - SH001
        - SH002
      related_hero_moments: []
      related_bridge_shots:
        - BR01
      voice_focus: 建立角色语气和气口。
      music_focus: 轻微铺底，不抢台词。
      foley_focus: 保留脚步、衣料和道具轻响。
      ambience_focus: 环境底噪稳定。
      silence_or_pause: 段尾保留短暂停顿。
      continuity_in: 从自然环境声进入。
      continuity_out: 以动作余音和环境底噪交给 SEG02。
      bridge_audio_hook: 保留 0.5 秒动作余音。
      blocking_audio_continuity: 角色没有无动机跨区，脚步声保持同一空间方向。
      prop_state_audio_continuity: 道具仍处于初始状态，仅有轻微预告声。
  video_prompt_handoff:
    must_include_audio_notes: 每段视频 prompt 必须包含台词气口、拟音、音乐、环境音和静默点。
    music_prompt_usage: 使用 music_prompt_v1.md 作为原创配乐方向。
    foley_prompt_usage: 使用 foley_prompt_v1.md 作为关键动作拟音方向。
    mix_notes: 台词优先，拟音服务动作，音乐不压过表演停顿。
    bridge_audio_usage: Segment 之间保留动作余音或环境底噪。
    blocking_audio_usage: 空间移动需要有脚步、距离感或环境反射支撑。
    prop_state_audio_usage: 道具状态变化必须有相应拟音证据。
  risk_notes:
    - 不复刻具体电影配乐或可识别旋律。
  next_action: 进入 scene-video-prompt-builder，整合声音方案和分镜生成分段视频提示词。
```

---

# 十、阶段推进建议

完成后建议推进：

```yaml
project_status: audio_ready
next_stage: scene-video-prompt-builder
```
