# scene-audio-director 输出协议

本文件定义 `scene-audio-director` 的输出形态、声音方案字段、黑板摘要边界和长内容落盘方式。

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
- `scene-design-builder`：角色、场景、道具设定
- `scene-performance-director`：`performance_sheet_path`、角色表演锚点、停顿与反应节奏
- `scene-storyboard-director`：`segments`、`shot_highlights`、`continuity_rules`、`prompt_hints`、`shotlist_file`
- 顶层索引：`performance_style`、`segment_duration_seconds`

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
version: 1
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
  ambience_design:
    location_bed:
    emotional_ambience:
    transition_ambience:
  segment_audio_plan:
    - segment_id:
      covered_shots:
      voice_focus:
      music_focus:
      foley_focus:
      ambience_focus:
      silence_or_pause:
      continuity_in:
      continuity_out:
  video_prompt_handoff:
    must_include_audio_notes:
    music_prompt_usage:
    foley_prompt_usage:
    mix_notes:
  risk_notes:
  next_action:
```

---

# 五、字段说明

## `audio_plan_version`

本次声音方案版本号。

示例：

```yaml
audio_plan_version: v1
```

## `audio_plan_path`

完整声音导演方案路径。

示例：

```yaml
audio_plan_path: details/audio_plan_v1.md
```

## `voice_direction`

配音方向。

必须覆盖：

- 语言
- 总体语气
- 语速
- 气口
- 情绪递进
- 角色级声音设计

## `music_design`

配乐设计。

必须说明：

- 主情绪主题
- 是否使用 leitmotif
- 乐器方向
- 速度范围
- 情绪曲线
- 音乐密度
- 静默点

## `foley_design`

拟音设计。

必须服务：

- 动作
- 表情
- 道具
- 喜剧节奏
- 情绪停顿

## `ambience_design`

环境音设计。

环境音不是随机背景噪声，而是场景情绪的一部分。

## `segment_audio_plan`

按视频生成 Segment 输出声音计划。

必须确保每个 Segment 都有：

- voice_focus
- music_focus
- foley_focus
- ambience_focus
- silence_or_pause
- continuity_in
- continuity_out

## `video_prompt_handoff`

交给 `scene-video-prompt-builder` 的整合说明。

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
音乐在角色误解解除前保持轻微拨弦和低音铺底，误解解除后加入温暖木管主题，形成情绪释放。
```

## 2. 静默必须被设计

Pixar-like 动画电影经常用短暂停顿制造情绪和喜剧。

要明确：

```yaml
silence_points:
```

说明静默发生在哪个 Beat、哪个 Shot，以及目的是什么。

## 3. 拟音要角色化

同样是脚步声，不同角色应有不同声音质感。

示例：

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
version: 1
status: completed
updated_at: 2026-06-02
summary: 声音导演已完成，按 3 个 10 秒 Segment 设计了配音气口、拟音重点、环境音、音乐主题和静默点。
data:
  audio_plan_version: v1
  audio_plan_path: details/audio_plan_v1.md
  music_prompt_path: outputs/audio/music_prompt_v1.md
  foley_prompt_path: outputs/audio/foley_prompt_v1.md
  audio_mix_plan_path: outputs/audio/audio_mix_plan_v1.md
  audio_summary: 本次声音方案以轻喜剧误会升级为核心，音乐保持温暖木管和轻弦乐，误会爆点前短暂抽空音乐，用拟音放大角色反应。
  voice_direction:
    language: zh-CN
    overall_tone: 温暖、轻喜剧、角色驱动
    pacing: 前半段轻快，误会升级时短促，情绪释放时放慢
    breath_control: 关键误会前保留半秒吸气或卡壳
    emotional_delivery: 角色努力维持体面，但情绪会从气口和尾音泄露
    character_voice_notes:
      - character_id: hero
        character_name: 主角
        voice_age: young_adult
        voice_texture: warm_but_nervous
        emotional_tone: 想显得镇定但压不住焦急
        pacing: 开始偏快，解释失败后出现短暂停顿
        pause_pattern: 关键解释前半秒吸气
        delivery_notes: 不要播音腔，要像角色真实在压住情绪。
  music_design:
    main_theme: 温暖而轻巧的角色主题
    leitmotif: 主角每次被误解时出现 2-3 个音的短动机
    instrumentation: 木管、拨弦、轻弦乐、少量马林巴
    tempo_range: 92-112 BPM
    emotional_curve: 从轻松观察到误会升级，再到温暖释放
    music_density: medium
    silence_points:
      - beat_id: B02
        shot_id: SH006
        purpose: 在误会爆点前抽空音乐，突出角色尴尬停顿和观众预期。
  foley_design:
    density: medium_high
    key_foley_moments:
      - shot_id: SH004
        segment_id: SEG01
        sound: 手指收紧衣袖的细小摩擦声
        timing: 角色准备解释但被打断前
        purpose: 放大紧张和压抑感。
  ambience_design:
    location_bed: 柔和室内空气感，远处轻微人声，不抢角色台词
    emotional_ambience: 误会升级时环境声略微降低，突出角色反应
    transition_ambience: 每段结尾保留同一环境底噪，帮助 Segment 拼接连续
  segment_audio_plan:
    - segment_id: SEG01
      covered_shots:
        - SH001
        - SH002
        - SH003
      voice_focus: 建立角色语气和轻微紧张感
      music_focus: 轻巧主题进入但不抢戏
      foley_focus: 衣料、脚步、轻微道具声
      ambience_focus: 稳定场景环境音
      silence_or_pause: 结尾前保留 0.4 秒停顿
      continuity_in: 从自然环境底噪进入
      continuity_out: 保留同一环境底噪进入 SEG02
  video_prompt_handoff:
    must_include_audio_notes: 每段视频 Prompt 必须写入台词气口、拟音、音乐情绪和静默点。
    music_prompt_usage: 使用 music_prompt_v1.md 生成或指导配乐，不复刻具体电影旋律。
    foley_prompt_usage: 使用 foley_prompt_v1.md 指导后期或多模态音频生成。
    mix_notes: 台词优先级最高，拟音用于强调动作和喜剧点，音乐在爆点前可短暂抽空。
  risk_notes:
    - 不引用具体动画电影主题曲或可识别旋律。
  next_action: 进入 scene-video-prompt-builder，整合 audio_plan_v1.md 到每段视频 Prompt。
```

---

# 十、阶段推进建议

完成后建议推进：

```yaml
project_status: audio_ready
next_stage: scene-video-prompt-builder
```
