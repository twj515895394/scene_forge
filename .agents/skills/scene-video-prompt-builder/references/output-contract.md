# scene-video-prompt-builder 输出协议

本文件定义 `scene-video-prompt-builder` 的输出分类、分段视频提示词结构、表演/声音整合规则、参考图使用、Blocking/Faction 连续性、道具状态连续性、v4 表现力提示词字段、v5 镜头语言提示词字段和目录落点。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

## 阶段定位

`scene-video-prompt-builder` 位于：

```text
scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

本阶段负责把设计、剧本、表演、分镜和声音方案整合成最终可用于视频生成平台的 Segment Prompt。

本阶段只输出提示词和制作说明，不生成视频。

v4 起，本阶段负责把 `expressive_animation` 的动画物理、伤害尺度、反差喜剧、VFX 支撑、声音钩子和负向边界写入最终 Segment Prompt。

v5 起，本阶段负责把 `scene-storyboard-director` 的 `storyboard_content_breakdown`、`cinematic_language_plan`、`camera_language`、`visual_motivation` 和 `selected_shot_pattern` 写入最终 Segment Prompt。

---

# 一、确认闸门

本阶段默认不能直接落盘正式视频提示词。必须先输出视频提示词方案预览，并等待用户确认。

视频提示词方案预览至少包含：

- 分段提示词结构
- 每段覆盖的 Beat / Unit / Shot / Segment
- 每段参考图使用计划
- `continuity_in` / `continuity_out`
- `blocking_continuity`
- `prop_state_continuity`
- 表演连续性
- 声音连续性
- v4 表现力写入方案：动画物理、伤害尺度、反差喜剧、VFX、声音钩子和负向边界
- v5 镜头语言写入方案：景别、机位、构图、镜头运动、剪辑节奏、视觉动机和 selected pattern
- 全局负向约束
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-video-prompt-builder
version: 5
status:
updated_at:
summary:
data:
```

---

# 三、上游输入

本阶段默认消费以下结果：

- `scene-storyboard-director`：`storyboard_version`、`storyboard_summary`、`storyboard_content_breakdown`、`cinematic_language_plan`、`segments`、`shot_highlights`、`expressive_storyboard_shots`、`stylized_action_shots`、`contrast_storyboard`、`hero_moments`、`bridge_shots`、`continuity_rules`、`storyboard_prompt_files`、`prompt_hints`、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、`physical_comedy_performance`、`contrast_performance`、`injury_reaction_performance`、表演连续性规则
- `scene-audio-director`：`audio_plan_path`、`music_prompt_path`、`foley_prompt_path`、`audio_mix_plan_path`、`segment_audio_plan`、`expressive_audio_design`、`video_prompt_handoff`
- `scene-design-builder`：角色与场景设定摘要、全场景资产总参考图 prompt、视觉语言和一致性锚点、`expressive_animation_design`
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`、`segment_strategy`、`expressive_animation`、`storyboard_director_v5`
- v4 执行期资产库（仅在需要统一正向/负向口径时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`
- v5 执行期资产库（仅在需要统一镜头语言口径时按需读取）：
  - `assets/cinematic-language/shot-language-library.md`
  - `assets/cinematic-language/animation-film-shot-patterns.md`
  - `assets/cinematic-language/animation-comedy-action-patterns.md`

---

# 四、风格执行要求

提示词必须继承顶层 `performance_style`，并转换为通用动画电影化描述，不直接绑定具体品牌名称。

建议理解：

- `cinematic_serious`：强调电影感、叙事张力、真实光影
- `cinematic_comedy`：强调轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：强调夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：强调鬼畜式升级、离谱反差、连续爆点推进

本阶段不再负责生成故事板 prompt；故事板 prompt 已在分镜阶段产出。

运行时输出不得写“模仿某部电影镜头”，只能写抽象镜头结构、景别、机位、构图、镜头运动、剪辑节奏和视觉动机。

---

# 五、三层时间模型继承

本阶段必须继承上游确认的：

```yaml
segment_duration_seconds:
target_total_duration_seconds:
segment_strategy:
segments:
storyboard_content_breakdown:
cinematic_language_plan:
shot_highlights:
hero_moments:
bridge_shots:
blocking_map:
faction_layout:
prop_state_machines:
expressive_animation:
storyboard_director_v5:
```

注意：

```text
segment_duration_seconds 表示单个视频生成片段时长，不是整条视频总时长。
```

每个 Segment Prompt 必须明确：

- covered_beats
- covered_units
- covered_shots
- segment_start
- segment_end
- continuity_in
- continuity_out
- blocking_continuity
- prop_state_continuity
- expressive_animation_continuity
- cinematic_language_continuity

---

# 六、输出内容

至少包括：

- 视频分段提示词
- 角色一致性约束
- 场景一致性约束
- 表演连续性约束
- 声音连续性说明
- 镜头连续性说明
- v5 镜头语言说明
- 参考图使用说明
- Blocking / Faction 连续性说明
- 道具状态连续性说明
- v4 表现力说明
- 全局生成约束

---

# 七、`data` 结构

```yaml
data:
  video_prompt_confirmation:
    confirmed_by_user: false
    confirmation_note:
  prompt_pack_version:
  expressive_animation_inheritance:
    enabled:
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
  storyboard_director_v5_inheritance:
    enabled:
    confirmation_status:
    require_storyboard_content_breakdown:
    require_cinematic_language_plan:
    require_visual_motivation:
    avoid_template_stack:
  segment_duration_seconds:
  target_total_duration_seconds:
  total_segments:
  video_prompt_files:
    - file:
      segment_scope:
      covered_beats:
      covered_units:
      covered_shots:
      related_hero_moments:
      related_bridge_shots:
      expressive_animation_scope:
      cinematic_language_scope:
      purpose:
  reference_assets:
    character_design_refs:
    scene_prop_master_ref:
    storyboard_refs:
    performance_refs:
    audio_refs:
    reference_image_plan:
      global_refs:
      per_segment_refs:
        - segment_id:
          required_refs:
          optional_refs:
          usage_order:
  consistency_rules:
    character_consistency:
    scene_consistency:
    performance_consistency:
    motion_continuity:
    audio_continuity:
    blocking_continuity:
    prop_state_continuity:
    expressive_animation_continuity:
    contrast_comedy_continuity:
    injury_tone_continuity:
    cinematic_language_continuity:
    selected_pattern_continuity:
  segment_continuity:
    - segment_id:
      continuity_in:
      continuity_out:
      next_handoff:
      blocking_continuity:
      prop_state_continuity:
      expressive_animation_continuity:
      cinematic_language_continuity:
      audio_tail:
      visual_tail:
      camera_language_tail:
  expressive_animation_prompting:
    global_animation_physics_note:
    global_injury_tone_note:
    global_contrast_comedy_note:
    global_vfx_support_note:
    global_expressive_audio_note:
    global_negative_boundary:
    per_segment:
      - segment_id:
        animation_physics:
        injury_tone:
        contrast_comedy:
        vfx_support:
        expressive_audio:
        negative_safety_constraints:
  cinematic_language_prompting:
    global_camera_language_note:
    global_visual_motivation_note:
    global_selected_pattern_note:
    global_negative_boundary:
    per_segment:
      - segment_id:
        camera_language:
          shot_scale:
          camera_angle:
          composition:
          lens_feel:
          camera_movement:
          staging_depth:
          edit_rhythm:
          visual_motivation:
          selected_shot_pattern:
        storyboard_units:
          - unit_id:
            story_content:
            visual_goal:
        prompt_camera_direction:
        negative_cinematic_constraints:
  global_render_rules:
    visual_style_note:
    performance_note:
    dialogue_audio_note:
    music_and_foley_note:
    reference_usage_note:
    segment_connection_note:
    blocking_note:
    prop_state_note:
    expressive_animation_note:
    injury_tone_note:
    contrast_comedy_note:
    cinematic_language_note:
    visual_motivation_note:
    negative_constraints:
  readiness_notes:
  next_action:
```

---

# 八、字段说明

- `video_prompt_confirmation`：记录用户是否确认视频提示词方案。正式落盘时应为 `confirmed_by_user: true`。
- `prompt_pack_version`：本次提示词包版本号。
- `expressive_animation_inheritance`：继承顶层 `expressive_animation` 的摘要。
- `storyboard_director_v5_inheritance`：继承顶层 `storyboard_director_v5` 的摘要。
- `segment_duration_seconds`：本次视频分段时长，应继承分镜阶段确认结果。
- `target_total_duration_seconds`：整片目标总时长。
- `total_segments`：本次视频分段总数。
- `video_prompt_files`：视频分段提示词文件列表。
- `expressive_animation_scope`：该文件或 Segment 是否覆盖动画物理、轻伤、反差喜剧或组合表达。
- `cinematic_language_scope`：该文件或 Segment 是否覆盖 v5 镜头语言、视觉动机或 selected pattern。
- `reference_assets`：生成视频时需要一并喂给模型的角色设定图、全场景资产总参考图、故事板图、表演表和声音方案来源。
- `reference_image_plan`：多图参考使用顺序和每段所需参考图。
- `consistency_rules`：角色、场景、表演、运动、声音、站位、道具状态、v4 表现力和 v5 镜头语言连续性约束摘要。
- `segment_continuity`：每段开头如何承接上一段、结尾如何交给下一段。
- `expressive_animation_prompting`：v4 表现力提示词写入计划，分为全局口径和每段口径。
- `cinematic_language_prompting`：v5 镜头语言提示词写入计划，分为全局口径和每段口径。
- `global_render_rules`：适用于全部视频分段的统一约束。
- `readiness_notes`：进入发布阶段前仍需准备的事项。
- `next_action`：下一阶段执行提示。

---

# 九、Segment Prompt 必须包含的内容

每个 Segment Prompt 至少包含：

```yaml
segment_prompt:
  segment_id:
  duration_seconds:
  segment_start:
  segment_end:
  covered_beats:
  covered_units:
  covered_shots:
  related_hero_moments:
  continuity_in:
  visual_goal:
  camera_direction:
  camera_language:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    staging_depth:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
  character_action:
  performance_direction:
  animation_physics:
  injury_tone:
  contrast_comedy:
  vfx_support:
  dialogue_direction:
  foley_direction:
  expressive_audio:
  music_direction:
  ambience_direction:
  silence_or_pause:
  blocking_continuity:
  prop_state_continuity:
  expressive_animation_continuity:
  cinematic_language_continuity:
  continuity_out:
  next_handoff:
  reference_images:
  negative_constraints:
```

说明：

- `camera_language` 必须继承分镜阶段的 `cinematic_language_plan` 和 `shot_highlights.camera_language`。
- `visual_motivation` 必须被转成自然语言导演说明，例如“观众需要同时看到角色、道具和空间关系”。
- `selected_shot_pattern` 只能以抽象结构方式表达，不得写具体电影名。
- `performance_direction` 必须继承 performance sheet。
- `animation_physics` 写本段是否涉及压扁拉伸、回弹、贴墙、纸片化、动作余势等。
- `injury_tone` 写本段是否允许灰头土脸、头包、小擦伤、鼻血笑点等轻中度卡通伤害。
- `contrast_comedy` 写本段是否存在反差喜剧，以及 setup / reveal / hold 如何呈现。
- `vfx_support` 写尘雾、速度线、冲击环、星星等是否使用，以及密度边界。
- `expressive_audio` 写 boing、bonk、puff、小铃铛、静默等声音钩子。
- `foley_direction`、`music_direction`、`ambience_direction`、`silence_or_pause` 必须继承 audio plan。
- `continuity_in` 和 `continuity_out` 必须确保多个 10 秒/15 秒 Segment 可以拼接成完整视频。
- `blocking_continuity` 必须说明主要角色在本段的默认站位、允许移动区域和禁止区域。
- `prop_state_continuity` 必须说明核心道具在本段开头、过程中和结尾的状态。
- `expressive_animation_continuity` 必须说明动画物理余势、轻伤状态或反差 reveal 是否跨段延续。
- `cinematic_language_continuity` 必须说明镜头方向、运动、景别或剪辑节奏是否跨段延续。
- `next_handoff` 必须说明给下一段留下的动作、视线、声音、镜头语言或道具状态钩子。

---

# 十、v4 表现力提示词规则

## 1. 动画物理

必须写清：

```text
动作前摇 → 冲击 / 揭示 → 变形 / 反应 → 停顿 → 恢复 / 收尾
```

不要只写：

```text
加入夸张动画特效。
```

## 2. 轻中度卡通伤害

允许写：

- 灰头土脸
- 头上起包
- 小擦伤
- 鼻血笑点
- 黑脸爆炸头
- 眼冒金星

必须禁止：

- 大量流血
- 血泊
- 开放性伤口
- 写实刀枪伤
- 子弹入体
- 骨折特写
- 身体恐怖
- 持续痛苦

## 3. 反差喜剧

必须写清：

```text
setup → concealment → reveal → hold → continue
```

例如：

```text
先用低机位建立大块头压迫感，再切全身侧面揭示他骑着过小的小自行车，停顿半秒，让体型、道具和气质反差成为核心笑点。
```

## 4. VFX 支撑

VFX 只服务动作和笑点，不要盖住主体。

可使用：

- dust_puffs
- impact_rings
- speed_lines
- motion_arcs
- cartoon_stars
- subtle_prop_squash

避免：

- unrelated_particles
- excessive_impact_rings
- random_symbol_stack

---

# 十一、v5 镜头语言提示词规则

## 1. 必须写“怎么拍”

不要只写：

```text
角色走进房间。
```

要写：

```text
使用中景跟拍角色走进房间，镜头保持平视，构图让门框作为前景遮挡，观众能同时看到角色犹豫的步伐和房间深处的目标。
```

## 2. 必须写视觉动机

每段提示词应尽量把 `visual_motivation` 转成自然语言。

例如：

```text
这个镜头的重点是让观众同时看清角色、道具和空间关系，因此使用宽镜头和固定机位，不用快速切换。
```

## 3. selected pattern 只能抽象表达

允许：

```text
采用“先建立角色气场，再揭示反差道具，并停顿半秒”的反差揭示结构。
```

禁止：

```text
模仿某部电影的某个镜头。
```

## 4. 镜头语言必须服务当前 Segment

不要堆：

```text
低机位、广角、推镜、环绕、快切、史诗构图。
```

要按需要选择：

```text
因为本段需要观众看清动作地理，先用宽镜头建立角色与障碍物位置，再进入跟拍。
```

---

# 十二、负向边界

所有 Segment Prompt 都应按需包含：

```text
不要大量流血、血泊、开放性伤口、写实刀枪伤、子弹入体、骨折特写、身体恐怖、持续痛苦、随机堆特效、每个镜头都抖包袱，或机械套用镜头模板。所有夸张动作都保持动画电影动作喜剧尺度，角色在动作结束后保持完整可表演状态。镜头语言只服务叙事、情绪、动作可读性和视觉信息，不模仿任何具体电影镜头。
```

---

# 十三、输出路径

视频分段提示词统一写入：

```text
outputs/video_prompts/video_prompts_v*.md
```

如需要按段拆文件，可使用：

```text
outputs/video_prompts/segment_01_prompt_v*.md
outputs/video_prompts/segment_02_prompt_v*.md
```

黑板只记录摘要和路径，不直接塞完整提示词正文。

---

# 十四、阶段推进建议

完成后建议推进：

```yaml
project_status: video_prompts_ready
next_stage: scene-publish-review
```
