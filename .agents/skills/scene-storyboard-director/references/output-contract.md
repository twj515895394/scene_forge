# scene-storyboard-director 输出协议

本文件定义 `scene-storyboard-director` 的分镜字段、三层时间模型、分段规则、视频生成单元、开头/结尾锚帧、连续性控制、Hero Shot、Bridge Shot、Blocking/Faction 连续性、双版故事板 prompt，以及面向 `scene-video-prompt-builder` 的执行级交接结构。

## 阶段定位

`scene-storyboard-director` 位于：

```text
scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
```

本阶段负责把 Story Beat 和表演导演结果转化为可执行分镜。

它不是单纯镜头清单，而是导演分镜：必须说明镜头为什么这样拍、表演为什么这样处理、声音为什么这样设计。

本阶段负责把动画物理表演、轻中度卡通伤害反应和反差喜剧表演镜头化。

本阶段必须先把剧本与表演压成 `beat_skeleton`，再拆成可拍的 `storyboard_content_breakdown`，随后生成 `cinematic_language_plan`、`video_generation_units`、`shot_continuity_plan` 与四线连续性控制结构，最后从这些主结构派生 `shot_highlights`、完整 shotlist 和双版故事板 prompt。

本阶段还必须把 Blocking / Faction / Prop State 从“可读说明”提升为“末端可执行交接结构”，确保最终视频提示词阶段能直接继承。

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
- `beat_skeleton` 样例
- 表现力扩展镜头候选：动画化动作镜头、反差 reveal 镜头、轻伤可见度镜头
- 剧本内容拆分样例：`storyboard_content_breakdown`
- 专业镜头语言样例：`cinematic_language_plan`
- `video_generation_units` 样例
- `shot_continuity_plan` 样例
- 开头 / 结尾锚帧策略
- 四线连续性策略
- 可能使用的镜头语言资产库与 pattern 类型
- 故事板 prompt 输出范围
- 是否需要拆成多个故事板 prompt 包
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-storyboard-director
stage: scene-storyboard-director
version: 8
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

# 三、上游输入

本阶段默认消费以下结果：

- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`beat_table`、`video_generation_unit_plan`、`expressive_beat_opportunities`、`storyboard_hints`、`hero_moment_candidates`、`segment_strategy`、`creative_direction_context`
- `scene-story-development`：已确认的 `story_beats`、`character_functions`、`core_scene_functions`、`key_prop_functions`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、`physical_comedy_performance`、`contrast_performance`、`injury_reaction_performance`、`action_continuity_chains`、`emotion_continuity_chains`、表演连续性规则
- `scene-design-builder`：角色与场景设定摘要、视觉语言和一致性锚点、`expressive_animation_design`、`space_continuity_seed`、`blocking_map`、`faction_layout`、`prop_state_machines`
- 项目配置与阶段索引：`project_config.performance_style`、`project_config.segment_duration_seconds`、`project_config.target_total_duration_seconds`、上游阶段产出的 `segment_strategy`、表现力扩展摘要和分镜方法论摘要
- 表现力扩展资产库（仅在需要镜头化动画物理、轻伤尺度或反差 reveal 时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`
- 镜头语言资产库（仅在需要专业镜头语言或分镜 pattern 时按需读取）：
  - `assets/cinematic-language/shot-language-library.md`
  - `assets/cinematic-language/animation-film-shot-patterns.md`
  - `assets/cinematic-language/animation-comedy-action-patterns.md`
- 故事板方法论资产库（仅在项目已加入运行时白名单时按需读取）：
  - `assets/storyboard-methodology/index.md`
  - `assets/storyboard-methodology/video-generation-unit-library.md`
  - `assets/storyboard-methodology/beat-structure-library.md`
  - `assets/storyboard-methodology/shot-type-library.md`
  - `assets/storyboard-methodology/rhythm-type-shot-combo-library.md`
  - `assets/storyboard-methodology/shot-density-reference.md`
  - `assets/storyboard-methodology/continuity-control-library.md`
  - `assets/storyboard-methodology/storyboard-dual-version-prompt-library.md`
  - `assets/storyboard-methodology/storyboard-quality-checklist.md`

---

# 四、风格执行要求

分镜设计必须继承`project_config.performance_style`：

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
- 表现力扩展必须服务角色、情绪、动作安全转译或视觉 payoff
- 镜头语言必须服务叙事功能、情绪功能、动作可读性、喜剧节奏或世界观信息
- 故事板方法论资产不得新增黑板顶层字段；只允许通过 `runtime_policy.context_policy.allowed_runtime_asset_paths` 和 `stage_index.storyboard.files.*` 暴露

## 创作方向继承规则

分镜阶段必须继承 `creative_direction_context`：

- `rewrite_adaptation`：分镜服务已选改写方向。
- `preserve_original`：分镜服务原始剧情/桥段保留，不得再发散新的改写方向。

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

时间模型约束：

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
- 一个 5 秒片段可以覆盖 1 个或多个 Shot，视具体剧本节奏而定
- 一个 Story Beat 可以跨多个 Unit / Shot / Segment
- 一个 Story Beat 也可以跨多个 Segment，但必须写清 `continuity_in` 和 `continuity_out`
- Segment 之间如存在动作、视线、空间、声音、镜头语言或道具状态断点，必须补充 `bridge_shots`
- `segment_duration_seconds` 是技术生成分段，不是镜头数量上限
- 当 `total_shots > 20`，或 `target_total_duration_seconds > 90` 时，默认推荐拆成多个故事板 prompt 包

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
- 表现力扩展字段（如适用）：`animation_physics`、`injury_visibility`、`contrast_framing`、`vfx_support`、`tonal_boundary`
- 镜头语言字段（如适用）：`shot_scale`、`camera_angle`、`composition`、`lens_feel`、`camera_movement`、`staging_depth`、`edit_rhythm`、`selected_shot_pattern`

---

# 八、`data` 结构

```yaml
data:
  script_strategy:
    status:
    mode:
  creative_direction_context:
    script_mode:
    selected_adaptation:
      status:
      selected_idea_id:
      selected_title:
      selection_note:
    downstream_rule:
  storyboard_confirmation:
    confirmed_by_user: false
    confirmation_note:
  storyboard_version:
  cinematic_language_inheritance:
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
  storyboard_methodology_inheritance:
    enabled:
    methodology_assets:
      index: assets/storyboard-methodology/index.md
      video_generation_unit_library: assets/storyboard-methodology/video-generation-unit-library.md
      beat_structure_library: assets/storyboard-methodology/beat-structure-library.md
      continuity_control_library: assets/storyboard-methodology/continuity-control-library.md
      dual_version_prompt_library: assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
      storyboard_quality_checklist: assets/storyboard-methodology/storyboard-quality-checklist.md
    policy:
      require_beat_skeleton: true
      require_video_generation_units: true
      require_shot_continuity_plan: true
      require_opening_and_closing_anchors: true
      require_space_continuity_map: true
      require_action_and_emotion_chains: true
      require_four_line_continuity_control: true
      require_dual_version_storyboard: true
      require_storyboard_quality_check: true
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
  storyboard_prompt_pack_mode: single_pack | multi_pack_recommended | multi_pack_confirmed
  methodology_config_file:
  storyboard_summary:
  beat_skeleton:
    - beat_id:
      beat_order:
      beat_purpose:
      duration_range_seconds:
        min:
        max:
      action_progression:
      emotion_progression:
      information_release:
      space_change:
      continuity_from_previous_beat:
      continuity_to_next_beat:
      suggested_shot_count:
      suggested_rhythm_type:
      suggested_rhythm_intensity:
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
  video_generation_units:
    - vgu_id:
      vgu_order:
      linked_segment_ids:
        - segment_id:
      source_beat_ids:
        - beat_id:
      source_unit_ids:
        - unit_id:
      unit_goal:
      beat_structure:
        beat_purpose:
        action_progression:
        emotion_progression:
        information_release:
        space_change:
      rhythm_type:
      rhythm_intensity:
      continuity_role:
      shot_density:
      suggested_shot_count:
      shot_entry:
      shot_exit:
      entry_state:
      exit_state:
      transition_hook:
      continuity_focus:
      opening_anchor_frame_id:
      closing_anchor_frame_id:
      space_continuity_map_id:
      target_duration_seconds:
      control_priority: high | medium | low
  shot_continuity_plan:
    - shot_id:
      related_vgu_id:
      source_beat_id:
      source_unit_id:
      previous_left:
      current_picks_up:
      entry_state:
      core_action:
      exit_state:
      next_handoff:
      continuity_goal:
      space_positioning:
      rhythm_role:
  opening_anchor_frame:
    related_segment:
    related_vgu:
    visual_goal:
    required_subjects:
    spatial_readability:
    continuity_hooks:
  closing_anchor_frame:
    related_segment:
    related_vgu:
    visual_goal:
    required_subjects:
    spatial_readability:
    continuity_hooks:
  space_continuity_map:
    related_vgu:
    anchor_space:
    axis_rules:
    recurring_landmarks:
    entrance_exit_rules:
    camera_side_rules:
  action_continuity_chains:
    - chain_id:
      chain_goal:
      linked_shots:
        - shot_id:
      carry_over_signal:
      break_risk:
  emotion_continuity_chains:
    - chain_id:
      emotion_arc:
      linked_shots:
        - shot_id:
      carry_over_signal:
      reset_risk:
  continuity_control_system:
    rhythm_continuity:
      carry_forward_rule:
      escalation_points:
      contrast_release_points:
      reset_conditions:
    action_continuity:
      carry_forward_rule:
      action_chain_refs:
        - chain_id:
      handoff_priority:
      break_risk:
    emotion_continuity:
      carry_forward_rule:
      emotion_chain_refs:
        - chain_id:
      emotional_anchor:
      reset_risk:
    space_continuity:
      anchor_map_ref:
      axis_rule:
      recurring_landmarks:
      camera_side_rule:
      drift_risk:
  segments:
    - segment_id:
      duration_seconds:
      segment_start_second:
      segment_end_second:
      mapped_vgu_ids:
        - vgu_id:
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
      blocking_execution:
        default_positions:
        allowed_moves:
        forbidden_zones:
        crossing_rule:
      prop_state_execution:
        opening_state:
        in_segment_changes:
        closing_state:
        visible_evidence:
      faction_execution:
        active_factions:
        default_zone_assignments:
        forbidden_zone_assignments:
      ending_payoff_hook:
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
      shot_continuity:
        related_vgu_id:
        previous_left:
        current_picks_up:
        entry_state:
        core_action:
        exit_state:
        next_handoff:
      blocking_note:
      prop_state_note:
      blocking_execution:
        default_positions:
        allowed_moves:
        forbidden_zones:
        crossing_rule:
      prop_state_execution:
        opening_state:
        in_shot_change:
        closing_state:
        visible_evidence:
      faction_execution:
        active_factions:
        zone_assignments:
      prompt_trace:
        source_story_beat:
        source_character_function:
        source_scene_function:
        source_prop_function:
        source_hero_candidate:
        source_ending_payoff:
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
    rhythm_continuity:
    space_continuity:
    action_continuity:
    emotion_continuity:
    audio_continuity_hint:
    blocking_continuity:
    prop_state_continuity:
    expressive_animation_continuity:
    contrast_comedy_continuity:
    injury_tone_continuity:
    cinematic_language_continuity:
    selected_pattern_continuity:
  shotlist_file:
  storyboard_quality_check:
    file:
    status:
    key_findings:
  storyboard_prompt_files:
    - file:
      purpose:
      pack_id:
      covered_segments:
      covered_shots:
      covered_story_function:
  control_storyboard_file:
  styled_storyboard_file:
  control_storyboard_prompt_file:
  styled_storyboard_prompt_file:
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
    runtime_prompt_required_structure:
      structure_mode: segment_and_shot_timecode
      bilingual_required: true
      include_vgu_and_shot_continuity: true
      include_blocking_execution: true
      include_prop_state_execution: true
      include_prompt_trace: true
      include_ending_payoff_hook: true
  downstream_video_prompt_handoff:
    required_output_mode: bilingual_director_pack
    runtime_prompt_structure: segment_and_shot_timecode
    required_runtime_fields:
      - beat_id
      - vgu_id
      - shot_timecode
      - shot_continuity
      - blocking_execution
      - prop_state_execution
      - prompt_trace
      - ending_payoff_hook
    review_focus:
      - total_duration_sync
      - bilingual_output
      - beat_and_vgu_inheritance
      - shot_continuity_handoff
      - shot_timecode_completeness
      - blocking_and_prop_state_execution
      - hero_candidate_and_ending_payoff_inheritance
      - performance_and_audio_inheritance
      - storyboard_anchor_and_continuity_inheritance
  risk_notes:
  next_action:
```

---

# 九、字段说明

- `storyboard_confirmation`：记录用户是否确认分镜方案。正式落盘时应为 `confirmed_by_user: true`。
- `cinematic_language_inheritance`：继承分镜阶段方法论、资产路径和默认镜头语言策略摘要。
- `storyboard_methodology_inheritance`：继承 Beat Skeleton、视频生成单元、镜头交接、四线连续性、双版故事板和质量检查方法论摘要。
- `expressive_animation_inheritance`：继承设计或剧本阶段沉淀的表现力扩展摘要。
- `beat_skeleton`：v8 主骨架。先定义每个 Beat 的功能、时长范围、动作推进、情绪推进、信息释放和建议镜头数，再向下游派生内容单元和镜头。
- `storyboard_content_breakdown`：核心字段。把 Story Beat 拆成可拍内容单元。
- `cinematic_language_plan`：核心字段。把内容单元转换成影视级镜头语言。
- `video_generation_units`：v8 主控制层。把 Beat 和内容单元组织成视频生成友好的控制单元，明确节奏类型、节奏强度、入镜 / 出镜、开头 / 结尾锚帧和空间连续性。
- `shot_continuity_plan`：v8 镜头交接层。逐镜头记录上一镜头留下什么、当前镜头接什么、镜头内核心动作、镜头结束时交给下一镜头什么。
- `opening_anchor_frame` / `closing_anchor_frame`：为跨段衔接提供稳定起止锚帧。
- `space_continuity_map`：记录主要空间锚点、轴线规则和出入口规则。
- `action_continuity_chains` / `emotion_continuity_chains`：记录跨镜头和跨段延续的动作链、情绪链。
- `continuity_control_system`：v8 四线连续性主结构。统一记录 rhythm / action / emotion / space 四条连续性控制线。
- `selected_shot_pattern`：若使用资产库 pattern，必须记录 pattern ID、来源资产、选择原因和适配说明。
- `segments`：技术交付切片。负责把上游 Beat / VGU / Shot 组织成最终视频分段，不再充当分镜主驱动。
- `storyboard_prompt_pack_mode`：故事板 prompt 是单包还是多包；当镜头数或总时长超过阈值时，不应默认单包。
- `segments.blocking_execution`：交给视频提示词阶段的段级站位执行结构，不再只是阅读说明。
- `segments.prop_state_execution`：交给视频提示词阶段的段级道具状态执行结构。
- `segments.faction_execution`：交给视频提示词阶段的角色阵营空间分配。
- `segments.ending_payoff_hook`：该段如何为最终收束点服务。
- `shot_highlights`：关键镜头列表，应从 `cinematic_language_plan` 派生。
- `camera_language`：镜头语言摘要，用于后续视频 prompt 继承。
- `shot_highlights.shot_continuity`：镜头级入镜 / 出镜 / 交接摘要，用于后续视频 prompt 不丢失衔接控制。
- `shot_highlights.blocking_execution`：镜头级站位执行结构。
- `shot_highlights.prop_state_execution`：镜头级道具状态执行结构。
- `shot_highlights.prompt_trace`：标明该镜头到底继承了哪些上游故事和功能信息。
- `expressive_storyboard`：镜头级表现力扩展字段摘要。
- `expressive_storyboard_shots`：统一记录所有表现力扩展镜头。
- `stylized_action_shots`：专门记录动画物理动作镜头。
- `contrast_storyboard`：专门记录反差喜剧 reveal 镜头。
- `injury_visibility`：轻中度卡通伤害在镜头中是否可见，以及如何避免写实痛苦。
- `hero_moments`：最终确认的看点镜头。
- `bridge_shots`：Segment 之间用于动作、视线、空间、声音和镜头语言衔接的桥接分镜。
- `continuity_rules`：运行期摘要规则；其中 rhythm / action / emotion / space 应与 `continuity_control_system` 保持同源。
- `storyboard_quality_check`：故事板阶段的结构化质量检查结果。必须检查镜头职责、动作交接、空间交接、连续性四线和双版故事板一致性。
- `control_storyboard_file` / `styled_storyboard_file`：同源双版故事板主产物。控制版负责 VGU、Beat、Shot、Anchor、Space、Action、Emotion 等控制信息；风格版负责材质、光感、氛围和风格层表达，但不得改变叙事结构和镜头职责。
- `control_storyboard_prompt_file` / `styled_storyboard_prompt_file`：生成上述双版故事板时使用的同源 prompt 文件；它们不是双版故事板本体的替代品。
- `audio_handoff`：交给 `scene-audio-director` 的声音设计提示。
- `prompt_hints`：交给视频提示词阶段的重点。
- `downstream_video_prompt_handoff`：显式告诉视频提示词阶段必须交付什么结构，重点保证 Beat / VGU / shot continuity 不在末端退化成说明型大 Prompt。

---

# 十、Storyboard Unit 规则

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

补充规则：

- 不为了“让故事板看起来更少”而合并本该拆开的镜头。
- 一个 5 秒片段里可以有 1 个或多个镜头，视具体剧本节奏而定；如果同时需要建立空间、给角色反应、再给道具或 payoff 特写，应拆成多个镜头。

---

# 十一、镜头语言规则

每个关键镜头都必须有 `visual_motivation`。

`visual_motivation` 必须说明该镜头为何存在，以及它服务的情绪变化、空间关系、动作因果或喜剧 payoff。

---

# 十二、镜头语言资产库使用规则

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

# 十四、表现力扩展镜头规则

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

如果表现力扩展镜头跨 Segment，必须补充：

- 动画物理动作余势
- 轻伤状态是否延续
- 反差 reveal 是否已经完成
- 声音尾巴如何交给下一段

如果镜头语言跨 Segment，必须补充：

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
- Beat Skeleton / VGU / Shot Continuity 摘要
- 核心镜头策略
- 表现力扩展镜头列表
- 使用了哪些镜头语言模式
- 双版故事板控制链摘要
- 每段覆盖哪些 Beat、Unit 和 Shot
- Hero Shot 列表
- Bridge Shot 列表
- Blocking / Faction 规则摘要
- 道具状态连续性摘要
- 故事板 prompt 文件路径
- 完整分镜路径
- 声音导演阶段最需要继承的配音、拟音、音乐、静默点和镜头语言声音提示
- 视频提示词阶段最需要继承的连续性规则、视觉重点、表现力扩展边界和镜头语言

---

# 十八、长内容落盘

完整分镜写入：

```text
details/分镜清单_v*.md
```

建议同步落盘的控制链文件：

```text
details/storyboard/beat_skeleton_v*.md
details/storyboard/video_generation_units_v*.md
details/storyboard/shot_continuity_plan_v*.md
details/storyboard/space_continuity_map_v*.md
details/storyboard/action_continuity_chains_v*.md
details/storyboard/emotion_continuity_chains_v*.md
details/storyboard/shotlist_v*.md
details/storyboard/storyboard_methodology_config_v*.md
details/storyboard/storyboard_quality_check_v*.md
```

同源双版故事板主产物建议写入：

```text
details/storyboard/control_storyboard_v*.md
details/storyboard/styled_storyboard_v*.md
```

故事板 prompt 写入：

```text
outputs/storyboard_prompts/故事板提示词_v*.md
```

当 `storyboard_prompt_pack_mode != single_pack` 时，推荐写成：

```text
outputs/storyboard_prompts/故事板提示词_pack_01_v*.md
outputs/storyboard_prompts/故事板提示词_pack_02_v*.md
```

黑板只保留摘要和路径，不直接塞完整分镜表或完整 prompt。

本阶段不得声称已经生成故事板图片，只能说明已经生成用于外部平台制作故事板图的 prompt。

---

# 十九、阶段推进建议

完成后建议推进：

```yaml
board_updates:
  state:
    project_status: storyboard_ready
    next_stage: scene-audio-director
  stage_index:
    storyboard:
```

黑板建议写入或更新：

```yaml
project_config:
  segment_duration_seconds:
confirmations:
  storyboard_plan_confirmed:
    status: confirmed
stage_index:
  storyboard:
    files:
      methodology_config:
      beat_skeleton:
      video_generation_units:
      shot_continuity_plan:
      opening_anchor_frame:
      closing_anchor_frame:
      space_continuity_map:
      action_continuity_chains:
      emotion_continuity_chains:
      shotlist:
      control_storyboard:
      styled_storyboard:
      storyboard_quality_check:
      storyboard_prompt_files:
      control_storyboard_prompt:
      styled_storyboard_prompt:
cross_stage_summary:
  continuity_focus:
```
