# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、三层时间模型、分段规则、Hero Shot、Bridge Shot、Blocking/Faction 连续性、故事板 prompt、v4 表现力镜头字段、v5 剧本内容拆分与专业镜头语言字段，以及长分镜落盘方式。

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

v4 起，本阶段负责把动画物理表演、轻中度卡通伤害反应和反差喜剧表演镜头化。

v5 起，本阶段必须先把剧本与表演拆成可拍的 `storyboard_content_breakdown`，再将内容单元转换成 `cinematic_language_plan`，最后从镜头语言计划派生 `shot_highlights`、完整 shotlist 和故事板 prompt。

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
- v4 表现力镜头候选：动画化动作镜头、反差 reveal 镜头、轻伤可见度镜头
- v5 剧本内容拆分样例：`storyboard_content_breakdown`
- v5 专业镜头语言样例：`cinematic_language_plan`
- 可能使用的镜头语言资产库与 pattern 类型
- 故事板 prompt 输出范围
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-storyboard-director
version: 5
status:
updated_at:
summary:
data:
```

---

# 三、上游输入

本阶段默认消费以下结果：

- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`expressive_beat_opportunities`、`storyboard_hints`、`hero_moment_candidates`、`segment_strategy`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、`physical_comedy_performance`、`contrast_performance`、`injury_reaction_performance`、表演连续性规则
- `scene-design-builder`：角色与场景设定摘要、视觉语言和一致性锚点、`expressive_animation_design`、`blocking_map`、`faction_layout`、`prop_state_machines`
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`、`segment_strategy`、`expressive_animation`、`storyboard_director_v5`
- v4 执行期资产库（仅在需要镜头化动画物理、轻伤尺度或反差 reveal 时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`
- v5 执行期资产库（仅在需要专业镜头语言或分镜 pattern 时按需读取）：
  - `assets/cinematic-language/shot-language-library.md`
  - `assets/cinematic-language/animation-film-shot-patterns.md`
  - `assets/cinematic-language/animation-comedy-action-patterns.md`

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
- v4 表现力扩展必须服务角色、情绪、动作安全转译或视觉 payoff
- v5 镜头语言必须服务叙事功能、情绪功能、动作可读性、喜剧节奏或世界观信息

---

# 五、三层时间模型

必须区分：

```text
Story Beat Duration
Storyboard Unit Duration
Shot Duration
Segment Duration
```

`segment_duration_seconds` 表示单个视频生成片段时长，不是整条视频总时长。

说明：

- 一个 Story Beat 可以拆成多个 `storyboard_content_breakdown` 单元。
- 一个 storyboard unit 可以对应一个镜头，也可以被多个镜头覆盖。
- 一个镜头也可以同时服务多个轻量 unit，但必须写清主导 unit。
- 一个 Segment 可以覆盖多个 Shot。

---

# 六、分段规则

- 默认 `segment_duration_seconds = 10`
- 若单个技术分段承载不下关键动作、台词和情绪起伏，可在用户确认后改为 `15` 或混合分段
- 分段结果一旦确认，后续声音导演和视频提示词阶段必须继承，不再二次拆段
- 一个 Segment 可以覆盖多个 Shot
- 一个 Story Beat 可以跨多个 Unit / Shot / Segment
- 一个 Story Beat 也可以跨多个 Segment，但必须写清 `continuity_in` 和 `continuity_out`
- Segment 之间如存在动作、视线、空间、声音、镜头语言或道具状态断点，必须补充 `bridge_shots`

---

# 七、分镜字段

完整分镜至少覆盖以下字段：

- 镜头编号
- 所属 Beat
- 所属 storyboard unit
- 起止时间
- 时长
- 景别
- 机位
- 构图
- 镜头运动
- 镜头意图
- 视觉动机 `visual_motivation`
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
- v4 表现力字段（如适用）：`animation_physics`、`injury_visibility`、`contrast_framing`、`vfx_support`、`tonal_boundary`
- v5 镜头语言字段（如适用）：`shot_scale`、`camera_angle`、`composition`、`lens_feel`、`camera_movement`、`staging_depth`、`edit_rhythm`、`selected_shot_pattern`

---

# 八、`data` 结构

```yaml
data:
  storyboard_confirmation:
    confirmed_by_user: false
    confirmation_note:
  storyboard_version:
  storyboard_director_v5_inheritance:
    enabled:
    confirmation_status:
    asset_references:
      shot_language_library: assets/cinematic-language/shot-language-library.md
      animation_film_patterns: assets/cinematic-language/animation-film-shot-patterns.md
      animation_comedy_action_patterns: assets/cinematic-language/animation-comedy-action-patterns.md
    policy:
      require_storyboard_content_breakdown: true
      require_cinematic_language_plan: true
      require_visual_motivation: true
      avoid_template_stack: true
      require_pattern_reason: true
      do_not_reference_specific_films_in_runtime_output: true
  expressive_animation_inheritance:
    enabled:
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
  segment_duration_seconds:
  target_total_duration_seconds:
  total_story_beats:
  total_storyboard_units:
  total_shots:
  total_segments:
  storyboard_summary:
  storyboard_content_breakdown:
    - unit_id:
      source_beat_id:
      unit_type: action | reaction | emotion_shift | reveal | transition | insert | environment_response | contrast_payoff | stylized_impact | injury_result
      story_content:
      character_focus:
      action_focus:
      emotional_function:
      comedic_function:
      required_visual_information:
      required_audio_information:
      required_continuity:
      suggested_duration_seconds:
      downstream_priority: high | medium | low
  cinematic_language_plan:
    - unit_id:
      shot_id:
      shot_scale:
      camera_angle:
      composition:
      lens_feel:
      camera_movement:
      staging_depth:
      blocking_intent:
      lighting_intent:
      color_intent:
      edit_rhythm:
      visual_motivation:
      selected_shot_pattern:
        pattern_id:
        source_asset:
        reason:
        adaptation_note:
  segments:
    - segment_id:
      duration_seconds:
      covered_beats:
        - beat_id:
      covered_units:
        - unit_id:
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
      unit_id:
      start_second:
      end_second:
      shot_purpose:
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
      expressive_storyboard:
        expression_type: none | stylized_action | minor_cartoon_injury | contrast_comedy | combined
        shot_role: setup | reveal | impact | hold | recovery | bridge
        animation_physics:
        injury_visibility:
        contrast_framing:
        vfx_support:
        tonal_boundary:
  expressive_storyboard_shots:
    - shot_id:
      beat_id:
      unit_id:
      expression_type:
      shot_role:
      animation_principles:
      visual_action:
      injury_visibility:
      contrast_framing:
      vfx_elements:
      environment_reaction:
      camera_behavior:
      safety_or_tonal_boundary:
  stylized_action_shots:
    - shot_id:
      beat_id:
      unit_id:
      scene_trigger:
      setup:
      impact:
      deformation:
      hold:
      recovery:
      vfx_elements:
      injury_tone:
      safety_boundary:
  contrast_storyboard:
    - shot_id:
      beat_id:
      unit_id:
      contrast_type:
      setup_shot:
      concealment:
      reveal_shot:
      hold_duration:
      framing_note:
      vfx_support:
      avoid_overuse_note:
  hero_moments:
    - hero_id:
      title:
      related_beat:
      related_unit:
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
      camera_language_hook:
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
    expressive_animation_continuity:
    contrast_comedy_continuity:
    injury_tone_continuity:
    cinematic_language_continuity:
    selected_pattern_continuity:
  shotlist_file:
  storyboard_prompt_files:
    - file:
      purpose:
  audio_handoff:
    voice_direction_hints:
    foley_priority:
    music_timing_hints:
    silence_points:
    expressive_audio_hints:
    camera_language_audio_hints:
  prompt_hints:
    video_prompt_focus:
    reference_image_usage:
    segment_connection_focus:
    blocking_reference_usage:
    prop_state_reference_usage:
    expressive_animation_usage:
    contrast_comedy_usage:
    injury_tone_usage:
    cinematic_language_usage:
    selected_pattern_usage:
  risk_notes:
  next_action:
```

---

# 九、字段说明

- `storyboard_confirmation`：记录用户是否确认分镜方案。正式落盘时应为 `confirmed_by_user: true`。
- `storyboard_director_v5_inheritance`：继承顶层 `storyboard_director_v5` 的启用状态、资产路径和默认策略。
- `expressive_animation_inheritance`：继承顶层 `expressive_animation` 的摘要。
- `storyboard_content_breakdown`：v5 新增核心字段。把 Story Beat 拆成可拍内容单元。
- `cinematic_language_plan`：v5 新增核心字段。把内容单元转换成影视级镜头语言。
- `selected_shot_pattern`：若使用资产库 pattern，必须记录 pattern ID、来源资产、选择原因和适配说明。
- `segments`：每段覆盖哪些 Beat、Unit 和 Shot，以及这段的叙事/节奏功能。
- `shot_highlights`：关键镜头列表，应从 `cinematic_language_plan` 派生。
- `camera_language`：镜头语言摘要，用于后续视频 prompt 继承。
- `expressive_storyboard`：镜头级 v4 表现力字段摘要。
- `expressive_storyboard_shots`：统一记录所有 v4 表现力镜头。
- `stylized_action_shots`：专门记录动画物理动作镜头。
- `contrast_storyboard`：专门记录反差喜剧 reveal 镜头。
- `injury_visibility`：轻中度卡通伤害在镜头中是否可见，以及如何避免写实痛苦。
- `hero_moments`：最终确认的看点镜头。
- `bridge_shots`：Segment 之间用于动作、视线、空间、声音和镜头语言衔接的桥接分镜。
- `continuity_rules`：角色、表演、场景、运动、声音、站位、道具状态、v4 表现力和 v5 镜头语言连续性约束。
- `audio_handoff`：交给 `scene-audio-director` 的声音设计提示。
- `prompt_hints`：交给视频提示词阶段的重点。

---

# 十、v5 Storyboard Unit 规则

## 1. `unit_type` 枚举

```yaml
unit_type:
  action: 动作单元，例如冲刺、躲闪、摔倒、推门、转身
  reaction: 反应单元，例如惊讶、尴尬、慢半拍、群体反应
  emotion_shift: 情绪转折，例如从强硬变温柔、从自信变心虚
  reveal: 信息揭示，例如反差道具出现、真相暴露、环境打开
  transition: 转场单元，例如视线、动作余势、声音尾巴、空间移动
  insert: 插入镜头单元，例如道具特写、手部动作、线索、按钮
  environment_response: 环境反应，例如道具掉落、人群转头、地面回弹
  contrast_payoff: 反差喜剧 payoff，例如大块头骑小车、反派拿粉色饭盒
  stylized_impact: 动画物理冲击，例如贴墙、弹飞、压扁、回弹
  injury_result: 轻中度卡通伤害结果，例如头包、灰头土脸、喷鼻血笑点
```

## 2. 拆分原则

```text
一个 Story Beat 可以拆成多个 storyboard_units。
一个 storyboard_unit 不一定等于一个镜头。
一个 storyboard_unit 可以被一个镜头覆盖，也可以拆成多个镜头。
```

拆分优先保证：

1. 观众必须理解的剧情信息；
2. 角色情绪变化；
3. 动作因果关系；
4. 空间方向；
5. 道具状态变化；
6. 喜剧 setup / reveal / payoff；
7. Segment 之间的连续性。

---

# 十一、v5 镜头语言规则

每个关键镜头都必须有 `visual_motivation`。

不推荐：

```yaml
shot_scale: close_up
visual_motivation: 好看
```

推荐：

```yaml
shot_scale: close_up
visual_motivation: 观众需要看到角色从强硬到心虚的微表情变化，推动情绪反转。
```

或者：

```yaml
shot_scale: wide
visual_motivation: 观众需要同时看到大块头角色、小自行车和周围空间，体型与道具反差必须在同一画面内成立。
```

---

# 十二、v5 资产库使用规则

允许按需读取：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

使用资产库 pattern 时，必须写：

```yaml
selected_shot_pattern:
  pattern_id:
  source_asset:
  reason:
  adaptation_note: 只使用抽象镜头结构，不复制具体电影镜头。
```

禁止：

```text
模仿某部电影镜头
照搬某片段构图
按某电影同款镜头拍
```

---

# 十三、Hero Shot 规则

每个项目都应根据自己的剧情自动识别 Hero Shot，而不是复用某个样例项目的看点。

Hero Shot 可以是反转、高潮动作、关键表情、道具揭示、喜剧停顿、情绪释放、动画化动作 payoff、轻伤喜剧后果、反差 reveal 或专业镜头语言 payoff。

---

# 十四、v4 表现力镜头规则

## 1. 动画物理镜头

必须尽量覆盖：

```text
setup / anticipation → impact → deformation → hold → recovery / settle
```

不能只写结果，例如“角色被撞飞”。

## 2. 反差喜剧镜头

必须尽量覆盖：

```text
setup → concealment → reveal → hold → continue
```

核心是让观众看清预期与实际之间的落差。

## 3. 轻中度卡通伤害镜头

允许：

- 头包
- 灰头土脸
- 小擦伤
- 鼻血笑点
- 黑脸爆炸头
- 眼冒金星

禁止：

- 大量流血
- 写实伤口
- 骨折特写
- 身体恐怖
- 持续痛苦

---

# 十五、Bridge Shot 规则

Bridge Shot 用于解决 Segment 之间的动作、视线、空间、声音、道具状态和镜头语言衔接问题。

如果 v4 表现力镜头跨 Segment，必须补充：

- 动画物理动作余势
- 轻伤状态是否延续
- 反差 reveal 是否已经完成
- 声音尾巴如何交给下一段

如果 v5 镜头语言跨 Segment，必须补充：

- 上一段结尾的镜头方向
- 下一段开头的承接景别或运动
- 是否需要 match cut / action continuity / audio bridge
- 是否需要重建空间关系

---

# 十六、Blocking / Faction 规则

多角色项目必须继承或补充 `blocking_map` 与 `faction_layout`。

这些规则只能降低视频生成抽卡成本，不能保证一次生成完全稳定。

---

# 十七、黑板摘要建议

黑板补丁至少应说明：

- 用户是否确认分镜方案
- 分镜版本号
- 整片目标时长
- 单个 Segment 时长和总段数
- Story Beat 总数
- Storyboard Unit 总数
- 镜头总数
- 核心镜头策略
- v4 表现力镜头列表
- v5 使用了哪些镜头语言模式
- 每段覆盖哪些 Beat、Unit 和 Shot
- Hero Shot 列表
- Bridge Shot 列表
- Blocking / Faction 规则摘要
- 道具状态连续性摘要
- 故事板 prompt 文件路径
- 完整分镜路径
- 声音导演阶段最需要继承的配音、拟音、音乐、静默点和镜头语言声音提示
- 视频提示词阶段最需要继承的连续性规则、视觉重点、v4 表现力边界和 v5 镜头语言

---

# 十八、长内容落盘

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

# 十九、阶段推进建议

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
storyboard_director_v5:
  confirmation_status: confirmed
user_confirmations:
  storyboard_plan_confirmed: true
```
