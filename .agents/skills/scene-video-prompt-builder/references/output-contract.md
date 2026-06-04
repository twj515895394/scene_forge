# scene-video-prompt-builder 输出协议

本文件定义 `scene-video-prompt-builder` 的输出分类、分段视频提示词结构、表演/声音整合规则、参考图使用、双版故事板转译、锚帧与连续性控制、模型适配、Blocking/Faction 连续性、道具状态连续性、自动 review / auto-fix 机制和目录落点。

## 阶段定位

`scene-video-prompt-builder` 位于：

```text
scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

本阶段负责把设计、剧本、表演、分镜和声音方案整合成最终可用于视频生成平台的提示词交付包。

本阶段只输出提示词和制作说明，不生成视频。

本阶段默认输出导演长版双语交付物：

- 导演长版：中文 / 英文各一份，保留解释、继承理由、分段目标和 review 摘要

导演长版必须直接包含 `Segment + Shot + Timecode` 双层强结构，不再额外维护一套独立的“模型投喂版”文件。

本阶段还必须先经历：

```text
Prompt Draft
-> Prompt Review
-> Auto Fix
-> Final Delivery
```

只有通过自动 review 的提示词，才能被标记为最终交付。

本阶段负责把表现力扩展摘要中的动画物理、伤害尺度、反差喜剧、VFX 支撑、声音钩子和负向边界写入最终 Segment Prompt。

本阶段负责把 `scene-storyboard-director` 的 `beat_skeleton`、`storyboard_content_breakdown`、`cinematic_language_plan`、`video_generation_units`、`shot_continuity_plan`、`camera_language`、`visual_motivation`、`selected_shot_pattern`、锚帧和连续性控制结构写入最终 Segment Prompt。

---

# 一、确认闸门

本阶段默认不能直接落盘正式视频提示词。必须先输出视频提示词方案预览，并等待用户确认。

视频提示词方案预览至少包含：

- 分段提示词结构
- 每段覆盖的 Beat / Unit / Shot / Segment
- 运行时是否采用 `Segment + Shot + Timecode` 双层结构
- 每段参考图使用计划
- `continuity_in` / `continuity_out`
- `blocking_continuity`
- `prop_state_continuity`
- `blocking_execution`
- `prop_state_execution`
- 表演连续性
- 声音连续性
- 表现力扩展写入方案：动画物理、伤害尺度、反差喜剧、VFX、声音钩子和负向边界
- 镜头语言写入方案：景别、机位、构图、镜头运动、剪辑节奏、视觉动机和 selected pattern
- 控制版 / 风格版故事板使用声明
- 模型适配计划
- 双语交付计划：中文长版 / 英文长版
- 全局负向约束
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-video-prompt-builder
stage: scene-video-prompt-builder
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

- `scene-storyboard-director`：`storyboard_version`、`storyboard_summary`、`beat_skeleton`、`storyboard_content_breakdown`、`cinematic_language_plan`、`video_generation_units`、`shot_continuity_plan`、`opening_anchor_frame`、`closing_anchor_frame`、`space_continuity_map`、`action_continuity_chains`、`emotion_continuity_chains`、`continuity_control_system`、`segments`、`shot_highlights`、`expressive_storyboard_shots`、`stylized_action_shots`、`contrast_storyboard`、`hero_moments`、`bridge_shots`、`continuity_rules`、`storyboard_prompt_pack_mode`、`storyboard_prompt_files`、`control_storyboard_file`、`styled_storyboard_file`、`control_storyboard_prompt_file`、`styled_storyboard_prompt_file`、`storyboard_quality_check`、`prompt_hints`、`blocking_map`、`faction_layout`、`prop_state_machines`、`creative_direction_context`
- `scene-story-development`：`story_beats`、`hero_moment_candidates`、`ending_payoff`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、`physical_comedy_performance`、`contrast_performance`、`injury_reaction_performance`、表演连续性规则
- `scene-audio-director`：`audio_plan_path`、`music_prompt_path`、`foley_prompt_path`、`audio_mix_plan_path`、`segment_audio_plan`、`expressive_audio_design`、`video_prompt_handoff`
- `scene-design-builder`：角色与场景设定摘要、全场景资产总参考图 prompt、视觉语言和一致性锚点、`expressive_animation_design`
- 项目配置与阶段索引：`project_config.performance_style`、`project_config.segment_duration_seconds`、`project_config.target_total_duration_seconds`、上游阶段产出的 `segment_strategy`、表现力扩展摘要和分镜方法论摘要
- 表现力扩展资产库（仅在需要统一正向/负向口径时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`
- 镜头语言资产库（仅在需要统一镜头语言口径时按需读取）：
  - `assets/cinematic-language/shot-language-library.md`
  - `assets/cinematic-language/animation-film-shot-patterns.md`
  - `assets/cinematic-language/animation-comedy-action-patterns.md`
- 故事板方法论资产库（仅在需要显式对齐双版故事板、视频转译或模型适配时按需读取）：
  - `assets/storyboard-methodology/index.md`
  - `assets/storyboard-methodology/video-generation-unit-library.md`
  - `assets/storyboard-methodology/continuity-control-library.md`
  - `assets/storyboard-methodology/storyboard-dual-version-prompt-library.md`
  - `assets/storyboard-methodology/video-prompt-translation-library.md`
  - `assets/storyboard-methodology/model-adaptation-library.md`

---

# 四、风格执行要求

提示词必须继承`project_config.performance_style`，并转换为通用动画电影化描述，不直接绑定具体品牌名称。

`performance_style` 运行时语义：

- `cinematic_serious`：电影感、叙事张力、真实光影
- `cinematic_comedy`：轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：鬼畜式升级、离谱反差、连续爆点推进

本阶段不再负责生成故事板 prompt；故事板 prompt 已在分镜阶段产出。

运行时输出不得写“模仿某部电影镜头”，只能写抽象镜头结构、景别、机位、构图、镜头运动、剪辑节奏和视觉动机。

故事板方法论资产不得新增黑板顶层字段；方法论配置和启用记录只允许通过 `runtime_policy.context_policy.allowed_runtime_asset_paths`、`stage_index.storyboard.files.methodology_config` 和 `stage_index.storyboard.read_policy` 暴露。

---

# 五、三层时间模型继承

本阶段必须继承上游确认的：

```yaml
segment_duration_seconds:
target_total_duration_seconds:
segment_strategy:
beat_skeleton:
storyboard_content_breakdown:
cinematic_language_plan:
video_generation_units:
shot_continuity_plan:
continuity_control_system:
segments:
shot_highlights:
hero_moments:
hero_moment_candidates:
ending_payoff:
bridge_shots:
storyboard_prompt_pack_mode:
control_storyboard_file:
styled_storyboard_file:
control_storyboard_prompt_file:
styled_storyboard_prompt_file:
opening_anchor_frame:
closing_anchor_frame:
space_continuity_map:
action_continuity_chains:
emotion_continuity_chains:
blocking_map:
faction_layout:
prop_state_machines:
expressive_animation:
cinematic_language_inheritance:
```

注意：

```text
segment_duration_seconds 表示单个视频生成片段时长，不是整条视频总时长。
```

每个 Segment Prompt 必须明确：

- primary_vgu_ids
- covered_beats
- covered_units
- covered_shots
- related_shot_continuity_refs
- segment_start
- segment_end
- continuity_in
- continuity_out
- blocking_continuity
- prop_state_continuity
- blocking_execution
- prop_state_execution
- expressive_animation_continuity
- cinematic_language_continuity

---

# 六、输出内容

至少包括：

- 视频分段提示词
- 导演长版提示词
- 导演长版内嵌运行时强结构
- 角色一致性约束
- 场景一致性约束
- 表演连续性约束
- 声音连续性说明
- 镜头连续性说明
- 镜头语言说明
- 参考图使用说明
- Blocking / Faction 连续性说明
- 道具状态连续性说明
- 表现力扩展说明
- 全局生成约束
- 自动 review 摘要

---

# 七、阶段正文结构

下文结构用于最终视频提示词 pack、review 文件和 handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

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
  video_prompt_confirmation:
    confirmed_by_user: false
    confirmation_note:
  prompt_pack_version:
  expressive_animation_inheritance:
    enabled:
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
  cinematic_language_inheritance:
    enabled:
    confirmation_status:
    require_storyboard_content_breakdown:
    require_cinematic_language_plan:
    require_visual_motivation:
    avoid_template_stack:
  storyboard_methodology_inheritance:
    enabled:
    require_beat_skeleton: true
    require_video_generation_units: true
    require_shot_continuity_plan: true
    require_anchor_frames: true
    require_continuity_control: true
    require_dual_storyboard_reference: true
    require_model_adaptation_plan: true
  segment_duration_seconds:
  target_total_duration_seconds:
  total_segments:
  storyboard_prompt_pack_mode: single_pack | multi_pack_recommended | multi_pack_confirmed
  video_prompt_review:
    review_status: pending | failed | fixed | passed
    review_round:
    issues_found:
    auto_fixes_applied:
    final_delivery_ready: false
  video_prompt_files:
    zh_full:
    en_full:
  reference_assets:
    character_design_refs:
    scene_prop_master_ref:
    storyboard_refs:
    control_storyboard_files:
      - file:
        covered_segments:
        control_focus:
    styled_storyboard_files:
      - file:
        covered_segments:
        style_focus:
    control_storyboard_refs:
    styled_storyboard_refs:
    storyboard_prompt_pack_refs:
      - pack_id:
        file:
        covered_segments:
        covered_shots:
    methodology_refs:
      beat_skeleton:
      video_generation_units:
      shot_continuity_plan:
      continuity_control:
      model_adaptation:
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
    storyboard_anchor_continuity:
  segment_continuity:
    - segment_id:
      primary_vgu_ids:
        - vgu_id:
      continuity_in:
      continuity_out:
      next_handoff:
      opening_anchor_usage:
      closing_anchor_usage:
      shot_continuity_refs:
        - shot_id:
      blocking_continuity:
      prop_state_continuity:
      expressive_animation_continuity:
      cinematic_language_continuity:
      rhythm_continuity:
      action_chain_continuity:
      emotion_chain_continuity:
      space_continuity:
      audio_tail:
      visual_tail:
      camera_language_tail:
      ending_payoff_hook:
  storyboard_reference_usage:
    mode: control_primary_style_secondary
    control_board_role:
    styled_board_role:
    do_not_render_storyboard_artifacts: true
  prompt_trace:
    - segment_id:
      source_story_beats:
      source_beat_skeletons:
      source_storyboard_units:
      source_shots:
      source_video_generation_units:
      source_shot_continuity:
      source_performance_points:
      source_audio_points:
      source_blocking_refs:
      source_prop_state_refs:
      source_hero_candidates:
      source_ending_payoff:
      source_anchor_frames:
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
  model_adaptation_plan:
    target_models:
      - model_id:
        preferred_prompt_density:
        visual_reference_mode:
        motion_control_focus:
        continuity_risk:
        negative_prompt_focus:
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
    storyboard_reference_note:
    model_adaptation_note:
    negative_constraints:
  runtime_prompt_structure:
    structure_mode: segment_and_shot_timecode
    bilingual_required: true
    include_vgu_and_shot_continuity: true
    include_blocking_execution: true
    include_prop_state_execution: true
    include_prompt_trace: true
    shot_timecode_required: true
  readiness_notes:
  next_action:
```

---

# 八、字段说明

- `video_prompt_confirmation`：记录用户是否确认视频提示词方案。正式落盘时应为 `confirmed_by_user: true`。
- `prompt_pack_version`：本次提示词包版本号。
- `script_strategy`：本次项目是改写剧本还是使用原始剧本。
- `creative_direction_context`：最终提示词必须继承的统一创作方向上下文。
- `expressive_animation_inheritance`：继承设计、剧本、分镜阶段输出的表现力扩展摘要。
- `cinematic_language_inheritance`：继承分镜阶段输出的方法论与镜头语言摘要。
- `storyboard_methodology_inheritance`：继承 Beat Skeleton、视频生成单元、镜头交接、锚帧、连续性控制、双版故事板和模型适配摘要。
- `segment_duration_seconds`：本次视频分段时长，应继承分镜阶段确认结果。
- `target_total_duration_seconds`：整片目标总时长。
- `total_segments`：本次视频分段总数。
- `storyboard_prompt_pack_mode`：上游故事板 prompt 是单包还是多包。本阶段若看到多包模式，必须消费全部相关 pack。
- `video_prompt_review`：自动 review 与自动修复结果；只有 `final_delivery_ready: true` 时，才算真正可交付。
- `video_prompt_files`：最终交付文件路径。默认必须支持中文 / 英文双份导演长版；运行时强结构直接内嵌在导演长版正文中。
- `reference_assets`：生成视频时需要一并喂给模型的角色说明书、全场景资产总参考图、故事板图、表演表和声音方案来源。
- `control_storyboard_files` / `styled_storyboard_files`：分镜阶段落盘的同源双版故事板主产物。视频提示词阶段应优先消费它们，再结合对应 prompt 文件和参考图，不应只读故事板 prompt 文件。
- `control_storyboard_refs` / `styled_storyboard_refs`：同源双版故事板参考路径。控制版负责结构和构图锚定，风格版负责材质、光感和氛围边界。
- `methodology_refs`：当前提示词真正使用到的 Beat Skeleton、视频生成单元、镜头交接、连续性控制和模型适配文件。
- `storyboard_prompt_pack_refs`：当上游故事板拆成多包时，用于记录每个 pack 的路径和覆盖范围，防止末端漏读。
- `reference_image_plan`：多图参考使用顺序和每段所需参考图。
- `consistency_rules`：角色、场景、表演、运动、声音、站位、道具状态、表现力扩展和镜头语言连续性约束摘要。
- `storyboard_anchor_continuity`：锚帧和连续性控制链如何跨段保持稳定。
- `segment_continuity`：每段开头如何承接上一段、结尾如何交给下一段。
- `segment_continuity.primary_vgu_ids`：该段主要由哪些视频生成单元驱动，避免末端退化成只看 `segments` 的旧结构。
- `storyboard_reference_usage`：说明控制版 / 风格版故事板在本阶段如何使用，以及必须排除哪些故事板版式痕迹。
- `prompt_trace`：记录最终每段提示词到底继承了哪些上游信息，避免末端过度压缩后无法反查。
- `source_video_generation_units` / `source_shot_continuity` / `source_anchor_frames`：把最终每段 prompt 对应的分镜控制单元、镜头交接和锚帧来源记清，防止末端断链。
- `expressive_animation_prompting`：表现力扩展提示词写入计划，分为全局口径和每段口径。
- `cinematic_language_prompting`：镜头语言提示词写入计划，分为全局口径和每段口径。
- `model_adaptation_plan`：同一分段提示词如何按目标模型调整提示词密度、参考图用法和负向约束。
- `global_render_rules`：适用于全部视频分段的统一约束。
- `runtime_prompt_structure`：运行时提示词的强结构约束。
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
  primary_vgu_ids:
    - vgu_id:
  covered_beats:
  covered_units:
  covered_shots:
  related_shot_continuity_refs:
    - shot_id:
  related_hero_moments:
  continuity_in:
  continuity_out:
  rhythm_continuity:
  action_continuity:
  emotion_continuity:
  space_continuity:
  visual_goal:
  opening_anchor_reference:
  closing_anchor_reference:
  prompt_trace:
    source_story_beats:
    source_beat_skeletons:
    source_storyboard_units:
    source_shots:
    source_video_generation_units:
    source_shot_continuity:
    source_hero_candidates:
    source_ending_payoff:
    source_anchor_frames:
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
  dialogue_plan:
    has_dialogue: true | false
    speakers:
      - character_id:
        dialogue_text:
        line_intent:
        delivery_tone:
        pacing_or_pause:
    no_dialogue_strategy:
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
  blocking_execution:
    default_positions:
    allowed_moves:
    forbidden_zones:
    crossing_rule:
    screen_side_lock:
    eye_line_rule:
    axis_preservation_note:
  prop_state_continuity:
  prop_state_execution:
    opening_state:
    in_segment_changes:
    closing_state:
    visible_evidence:
  expressive_animation_continuity:
  cinematic_language_continuity:
  action_chain_continuity:
  emotion_chain_continuity:
  next_handoff:
  reference_images:
  negative_constraints:
  shot_plan:
    - shot_id:
      related_vgu_id:
      timecode_start:
      timecode_end:
      source_unit_id:
      source_shot_id:
      shot_continuity:
        previous_left:
        current_picks_up:
        entry_state:
        core_action:
        exit_state:
        next_handoff:
        space_positioning:
      visual_goal:
      camera_direction:
      screen_positioning:
        subject_left_right:
        facing_direction:
        depth_relation:
        axis_side:
      blocking_execution:
        default_positions:
        allowed_moves:
        forbidden_zones:
        crossing_rule:
      prop_state_execution:
        opening_state:
        in_shot_changes:
        closing_state:
        visible_evidence:
      performance_direction:
      audio_direction:
      negative_constraints:
```

说明：

- `camera_language` 必须继承分镜阶段的 `cinematic_language_plan` 和 `shot_highlights.camera_language`。
- `primary_vgu_ids` 必须显式指出本段主要由哪些视频生成单元驱动，不能只写段级概述。
- `visual_motivation` 必须被转成自然语言导演说明，例如“观众需要同时看到角色、道具和空间关系”。
- `selected_shot_pattern` 只能以抽象结构方式表达，不得写具体电影名。
- `performance_direction` 必须继承 performance sheet。
- `dialogue_plan` 必须显式给出本段的对白存在性判断，而不是默认存在对白；仅当上游剧本或分镜已明确存在对白设计时，才写出具体台词正文 `dialogue_text`，并补齐说话角色、对白意图、语气和停顿，无对白时写明由动作、表情、环境音或静默承载。
- `animation_physics` 写本段是否涉及压扁拉伸、回弹、贴墙、纸片化、动作余势等。
- `injury_tone` 写本段是否允许灰头土脸、头包、小擦伤、鼻血笑点等轻中度卡通伤害。
- `contrast_comedy` 写本段是否存在反差喜剧，以及 setup / reveal / hold 如何呈现。
- `vfx_support` 写尘雾、速度线、冲击环、星星等是否使用，以及密度边界。
- `expressive_audio` 写 boing、bonk、puff、小铃铛、静默等声音钩子。
- `foley_direction`、`music_direction`、`ambience_direction`、`silence_or_pause` 必须继承 audio plan。
- `continuity_in` 和 `continuity_out` 必须确保多个 10 秒/15 秒 Segment 可以拼接成完整视频。
- `related_shot_continuity_refs`、`shot_plan[].shot_continuity` 和 `next_handoff` 必须同源，确保镜头交接不是在末端临时脑补。
- `opening_anchor_reference` / `closing_anchor_reference` 用于显式承接分镜阶段的起止锚帧，避免跨段首尾漂移。
- `blocking_continuity` 必须说明主要角色在本段的默认站位、允许移动区域和禁止区域。
- `blocking_execution` 必须把站位说明升级成运行时可执行结构，不能只写“角色在左边、右边”；至少要交代左右锁定、视线方向和轴线保持规则。
- `prop_state_continuity` 必须说明核心道具在本段开头、过程中和结尾的状态。
- `prop_state_execution` 必须写清本段开头状态、段内变化、段尾状态和可见证据。
- `expressive_animation_continuity` 必须说明动画物理余势、轻伤状态或反差 reveal 是否跨段延续。
- `cinematic_language_continuity` 必须说明镜头方向、运动、景别或剪辑节奏是否跨段延续。
- `action_chain_continuity` / `emotion_chain_continuity` 必须显式承接上游连续性链，避免动作对不上或情绪断档。
- `next_handoff` 必须说明给下一段留下的动作、视线、声音、镜头语言或道具状态钩子。
- `shot_plan` 是导演长版内部的强结构要求。导演长版不得退化成“10 秒一段的大 Prompt”，而必须显式写出每个 Shot 的时间码、所属 VGU、镜头交接重点和逐镜头站位承接。

## 自动 review 与 auto-fix 规则

自动 review 至少检查：

- `project_config.target_total_duration_seconds` 是否与当前阶段时长一致
- 中英双份文件是否都存在
- 中文 / 英文导演长版是否都存在
- 每个 Segment 是否包含 `shot_plan`
- 每个 Segment 是否显式继承 `primary_vgu_ids`
- 每个 Segment 是否显式声明 `dialogue_plan.has_dialogue`
- 仅当上游已有对白设计时，Segment 是否写出 `dialogue_plan.speakers[].dialogue_text`
- `related_shot_continuity_refs` 与 `shot_plan[].shot_continuity` 是否完整且同源
- `blocking_execution` / `prop_state_execution` 是否完整
- `shot_plan[].screen_positioning` 是否完整
- 是否继承 `hero_moment_candidates` 与 `ending_payoff`
- 是否包含上游 Beat Skeleton、声音、表演和镜头语言信息
- 是否遗漏必要负向约束

自动修复只允许修：

- 文件缺项
- 结构漏项
- 时间码漏写
- 继承字段漏写
- 中英文件不对齐

自动修复不得悄悄改动：

- 用户已确认的改写方向
- 用户已确认的总时长
- 用户已确认的 Segment 策略
- 用户已确认的核心剧情与结尾 payoff

## 创作方向继承规则

最终提示词阶段必须继承：

```yaml
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
```

规则：

- `rewrite_adaptation`：提示词服务已选改写方向。
- `preserve_original`：提示词服务原始剧情/桥段保留，不得再写成新的题材方向。

---

# 十、表现力扩展提示词规则

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

# 十一、镜头语言提示词规则

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
outputs/video_prompts/视频提示词_导演长版_中文_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_v*.md
```

如需要按段拆文件，可使用：

```text
outputs/video_prompts/视频提示词_导演长版_中文_segment_01_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_segment_01_v*.md
```

黑板只记录摘要和路径，不直接塞完整提示词正文。

---

# 十四、阶段推进建议

完成后建议推进：

```yaml
board_updates:
  state:
    project_status: video_prompts_ready
    next_stage: scene-publish-review
  stage_index:
    video_prompts:
```
