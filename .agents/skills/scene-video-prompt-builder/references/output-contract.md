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
- 如上游故事板为多包模式，额外输出按 `pack` 对齐的视频提示词文件，便于和故事板包一一对应使用

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
视频提示词阶段的确认只绑定当前阶段，不得由故事板确认、音频确认、泛化的“确认/继续”或其他上游阶段确认推导得到。
若用户只说“确认”而未点名阶段，运行时只允许在当前 `state.next_stage = scene-video-prompt-builder` 且本阶段预览已明确展示的前提下，将其解释为确认视频提示词方案；否则必须回问或阻塞。

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

开始本阶段前，还必须满足以下硬条件：

- 上游 `storyboard_confirmation.confirmed_by_user = true`
- 若 `storyboard_prompt_pack_mode = multi_pack_recommended`，说明故事板拆包方案尚未正式确认，本阶段必须阻塞并返回故事板阶段
- 不得把故事板预览确认或故事板正式落盘，直接视为视频提示词阶段的正式确认

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
- `scene-design-builder`：角色与场景设定摘要、全场景资产总参考图 prompt、空间站位图 prompt、视觉语言和一致性锚点、`expressive_animation_design`
- 项目配置与阶段索引：`project_config.director_style_id`、`project_config.director_style_version`、`project_config.style_family`、`project_config.style_profile_path`、`project_config.performance_style`、`project_config.segment_duration_seconds`、`project_config.target_total_duration_seconds`、上游阶段产出的 `segment_strategy`、表现力扩展摘要和分镜方法论摘要
- 风格包输入（若项目已确认导演风格包则按需读取）：
  - `style_profiles/<director_style_id>/profile.md`
  - `style_profiles/<director_style_id>/visual_language.md`
  - `style_profiles/<director_style_id>/camera_language.md`
  - `style_profiles/<director_style_id>/lighting_language.md`
  - `style_profiles/<director_style_id>/negative_constraints.md`
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

提示词必须继承`project_config.performance_style`，并在此基础上优先继承当前 `director_style_id` 对应风格包的视觉、镜头、灯光和负向边界；最终应转换为适合当前 `style_family` 的通用电影化 / 风格化描述，不直接绑定具体品牌名称。

`performance_style` 运行时语义：

- `cinematic_serious`：电影感、叙事张力、真实光影
- `cinematic_comedy`：轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：鬼畜式升级、离谱反差、连续爆点推进

本阶段不再负责生成故事板 prompt；故事板 prompt 已在分镜阶段产出。

若风格包字段缺失，或风格确认状态不满足正式确认/历史兼容条件，本阶段必须阻塞并返回风格确认，不得回退到 `pixar_like` 继续生成提示词。

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
  style_profile:
    director_style_id:
    director_style_version:
    style_family:
    style_profile_path:
    used_default_fallback: false
    fallback_note:
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
  video_prompt_pack_plan:
    delivery_mode: pack_aligned_primary | full_aggregate_optional | segment_files_on_request_only
    packs:
      - pack_id:
        storyboard_pack_ref:
        covered_segments:
        covered_shots:
        delivery_role: primary
  pack_audio_execution_plan:
    - pack_id:
      covered_segments:
      bgm_emotional_arc:
      key_foley_hooks:
      ambience_bed:
      silence_points:
      transition_audio_hooks:
  video_prompt_review:
    review_status: pending | failed | fixed | passed
    review_round:
    issues_found:
    auto_fixes_applied:
    final_delivery_ready: false
  video_prompt_files:
    zh_full:
    en_full:
    delivery_shape:
    forbidden_substitutions: []
    zh_pack_files:
      - pack_id:
        file:
        covered_segments:
        covered_shots:
    en_pack_files:
      - pack_id:
        file:
        covered_segments:
        covered_shots:
    zh_segment_copy_ready:
      - segment_id:
        file:
        embedded_in_pack_file: true
        includes_global_execution_preamble: true
        includes_project_level_global_rules: true
        includes_global_render_rules: true
        includes_technical_control_block: true
        includes_zh_natural_language_prompt: true
        excludes_trademark_avoidance: true
        excludes_review_meta: true
    en_segment_copy_ready:
      - segment_id:
        file:
        embedded_in_pack_file: true
        includes_global_execution_preamble: true
        includes_project_level_global_rules: true
        includes_global_render_rules: true
        includes_technical_control_block: true
        includes_en_natural_language_prompt: true
        excludes_trademark_avoidance: true
        excludes_review_meta: true
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
    sequential_keyframe_reference: true
    preserve_storyboard_progression:
      beat_progression:
      camera_rhythm:
      composition_logic:
      action_choreography:
      spatial_relationships:
      emotional_progression:
      key_pose_readability:
      anticipation_and_release:
    inbetween_motion_expansion:
      preserve_key_pose_direction: true
      preserve_performance_timing: true
      expand_to_cinematic_animation: true
    scene_lock_rule:
    character_reappearance_lock:
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
  global_execution_preamble:
    sequential_keyframe_reference:
    preserve_storyboard_progression:
      beat_progression:
      camera_rhythm:
      composition_logic:
      action_choreography:
      spatial_relationships:
      emotional_progression:
      key_pose_readability:
      anticipation_force_reaction_release:
    inbetween_motion_expansion:
    do_not_render_storyboard_artifacts:
    prompt_voice_rule:
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
  project_level_global_rules:
    scene_lock_rule:
    character_reappearance_lock:
    no_character_duplication_rule:
    readability_priority:
      image_readability:
      motion_clarity:
      silhouette_recognition:
      spatial_stability:
      performance_timing_accuracy:
  runtime_prompt_structure:
    structure_mode: segment_and_shot_timecode
    bilingual_required: true
    ordered_layers:
      - global_execution_preamble
      - project_level_global_rules
      - segment_technical_control_block
      - shot_by_shot_director_prompt
    include_global_execution_preamble: true
    include_project_level_global_rules: true
    include_segment_technical_control_block: true
    include_shot_by_shot_director_prompt: true
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
- `expressive_animation_inheritance`：继承设计、剧本、分镜阶段输出的表现力扩展摘要。它属于按 `style_family` 条件启用的扩展层：`3d_animation`、`2d_animation` 可正常继承，`motion_comic`、`hybrid` 仅在当前风格包明确支持时局部继承，`live_action_cinematic` 默认不写入动画物理和卡通伤害。
- `cinematic_language_inheritance`：继承分镜阶段输出的方法论与镜头语言摘要。
- `storyboard_methodology_inheritance`：继承 Beat Skeleton、视频生成单元、镜头交接、锚帧、连续性控制、双版故事板和模型适配摘要。
- `segment_duration_seconds`：本次视频分段时长，应继承分镜阶段确认结果。
- `target_total_duration_seconds`：整片目标总时长。
- `total_segments`：本次视频分段总数。
- `storyboard_prompt_pack_mode`：上游故事板 prompt 是单包还是多包。本阶段若看到多包模式，必须消费全部相关 pack。
- `video_prompt_pack_plan`：视频提示词与故事板 `pack` 的对齐计划。预览阶段必须先明确主交付将拆成几个视频提示词包、每个包对应哪个故事板包、覆盖哪些 `segments / shots`，以及哪些只是可选整片汇编版；不得跳过该计划直接用“2 个长版文件”替代。
- `pack_audio_execution_plan`：每个视频提示词 `pack` 的包级声音执行摘要。默认必须在 pack 文件内显式呈现，用于快速查看该包的 BGM 主情绪、关键拟音、环境音床、静默点和转场声音钩子；它是正式主交付的一部分，不应被省略到只剩正文散落描述。
- `video_prompt_review`：自动 review 与自动修复结果；只有 `final_delivery_ready: true` 时，才算真正可交付。
- `video_prompt_files`：最终交付文件路径。默认必须优先支持与故事板 `pack` 对齐的中文 / 英文导演长版；运行时强结构直接内嵌在导演长版正文中，且默认在每个 pack 文件内带包级声音执行摘要与每段声音执行块。整片双语总控文件只作为可选汇编版存在，不应反过来替代 `pack` 主交付。
- `video_prompt_files.zh_pack_files` / `video_prompt_files.en_pack_files`：按故事板 `pack` 对齐的视频提示词文件索引。这是默认主交付层，用户应能直接按故事板包逐批生成和校对。
- `video_prompt_files.zh_segment_copy_ready` / `video_prompt_files.en_segment_copy_ready`：每个 Segment 的可直接复制使用块。默认应内嵌在所属 `pack` 文件中，而不是拆成大量独立物理文件；只有用户明确要求“按段单独落文件”时，才额外为每个 Segment 单独生成文件。每个区块都应按四层顺序自带 `global_execution_preamble` 精简可用版、`project_level_global_rules` 当前段锁定规则、当前 Segment 的结构化控制参数、以及对应语言的导演长版自然语言提示词；不得混入版权与安全规避说明、review 日志、确认事项或其他非投喂元信息。
- `video_prompt_files.delivery_shape`：正式主交付应是“按故事板 `pack` 对齐的导演长版正文 + pack 内嵌的每段可直接复制使用块 + 视需要补充的整片汇编版”，而不是“全局设定 + 逐段参数表 + 编译 Prompt”的说明稿，也不是默认为每个 Segment 额外拆一批独立文件。
- `video_prompt_files.forbidden_substitutions`：不得用“逐段参数表 / 逐镜参数表 / 编译 Prompt / 说明性表格”替代正式导演长版主交付。此类内容若存在，只能作为中间层导演稿、review 草稿或附录。
- `global_execution_preamble`：最终使用型提示词的全局前导块，必须直接写进正文，且使用可投喂模型的指令语气，而不是解释性说明文。至少显式写出顺序视觉关键帧参考、节拍推进、镜头节奏、构图逻辑、动作编排、空间关系、情绪递进、关键姿势、预备动作 / 发力 / 反应 / 收势逻辑、关键姿势之间的电影化动作扩展，以及不渲染故事板版式痕迹。
- `project_level_global_rules`：项目级全局锁定规则，必须直接写进正文。至少显式写出主场景空间锁定、角色重现锁定、不重复角色，以及画面可读性、动作清晰度、角色轮廓识别、空间稳定性和表演时机准确性。
- `negative_constraints`：允许在内部协议、review 或方法说明中保留安全/版权边界，但最终投喂模型的正文必须把这些边界改写为正向、抽象、非触发性的表达，不得直接出现显式安全词或版权词。
- `reference_assets`：生成视频时需要一并喂给模型的角色说明书、全场景资产总参考图、故事板图、表演表和声音方案来源。
- `control_storyboard_files` / `styled_storyboard_files`：分镜阶段落盘的同源双版故事板主产物。视频提示词阶段应优先消费它们，再结合对应 prompt 文件和参考图，不应只读故事板 prompt 文件。
- `control_storyboard_refs` / `styled_storyboard_refs`：同源双版故事板参考路径。控制版负责结构和构图锚定，风格版负责材质、光感和氛围边界。
- `methodology_refs`：当前提示词真正使用到的 Beat Skeleton、视频生成单元、镜头交接、连续性控制和模型适配文件。
- `storyboard_prompt_pack_refs`：当上游故事板拆成多包时，用于记录每个中文整板故事板总板 pack 的路径和覆盖范围，辅助校对镜头画面层、控制轨道和对白轨是否与内部控制链一致，并防止末端漏读；它不替代控制版故事板主产物。
- `reference_image_plan`：多图参考使用顺序和每段所需参考图。
- `consistency_rules`：角色、场景、表演、运动、声音、站位、道具状态、表现力扩展和镜头语言连续性约束摘要。
- `storyboard_anchor_continuity`：锚帧和连续性控制链如何跨段保持稳定。
- `segment_continuity`：每段开头如何承接上一段、结尾如何交给下一段。
- `segment_continuity.primary_vgu_ids`：该段主要由哪些视频生成单元驱动，避免末端退化成只看 `segments` 的旧结构。
- `storyboard_reference_usage`：说明控制版 / 风格版故事板在本阶段如何使用，以及必须排除哪些故事板版式痕迹。
- `storyboard_reference_usage.sequential_keyframe_reference`：若上游存在故事板总板或故事板包，应把它视为顺序视觉关键帧参考，而不是松散灵感图参考。
- `preserve_storyboard_progression`：最终视频提示词必须显式继承的故事板推进维度，包括节拍推进、镜头节奏、构图逻辑、动作编排、空间关系、情绪递进、关键姿势可读性以及预备动作/发力/反应/收势逻辑。
- `inbetween_motion_expansion`：说明最终视频不是逐格硬切，而是要在相邻故事板关键姿势之间扩展出流畅、连续、电影化的动作过渡。
- `scene_lock_rule` / `character_reappearance_lock`：同一连续场景段默认保持同一主场景空间锚点；同一角色重复出现时必须保持同一角色设计，不得无因重复、增殖、替换或漂移。
- `runtime_prompt_structure`：不仅约束字段存在，还约束正文输出顺序。默认必须按 `global_execution_preamble -> project_level_global_rules -> segment_technical_control_block -> shot_by_shot_director_prompt` 组织。
- `prompt_trace`：记录最终每段提示词到底继承了哪些上游信息，避免末端过度压缩后无法反查。
- `source_video_generation_units` / `source_shot_continuity` / `source_anchor_frames`：把最终每段 prompt 对应的分镜控制单元、镜头交接和锚帧来源记清，防止末端断链。
- `expressive_animation_prompting`：表现力扩展提示词写入计划，分为全局口径和每段口径；只有在当前 `style_family` 允许时才作为正式运行时层级写入。
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
  segment_sound_execution:
    bgm_plan:
      cue:
      emotion:
      density:
      entry_exit:
    foley_sfx_plan:
      key_hits:
      motion_sounds:
      prop_sounds:
      comedic_support:
    ambience_plan:
      room_tone:
      emotional_ambience:
      transition_bed:
    silence_plan:
      silence_points:
      hold_purpose:
    dialogue_audio_bridge:
      breath_pause:
      handoff_tail:
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
  storyboard_translation_rule:
    sequential_keyframe_reference:
    preserve_storyboard_progression:
    inbetween_motion_expansion:
    readability_priority:
    do_not_render_storyboard_artifacts:
    scene_lock_rule:
    character_reappearance_lock:
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
- `segment_sound_execution` 是本段独立的声音执行块，默认必须显式分成 `BGM / Foley-SFX / Ambience / Silence` 四层，不得只把声音要求埋进长版叙述里。
- `dialogue_audio_bridge` 用于写清本段对白气口、呼吸、停顿和对下一段的声音交接；即使本段无对白，也应说明由环境音、静默或动作余音承接。
- `animation_physics` 写本段是否涉及压扁拉伸、回弹、贴墙、纸片化、动作余势等。
- `injury_tone` 写本段是否允许灰头土脸、头包、小擦伤、鼻血笑点等轻中度卡通伤害。
- `contrast_comedy` 写本段是否存在反差喜剧，以及 setup / reveal / hold 如何呈现。
- `vfx_support` 写尘雾、速度线、冲击环、星星等是否使用，以及密度边界。
- `expressive_audio` 写 boing、bonk、puff、小铃铛、静默等声音钩子。
- `foley_direction`、`music_direction`、`ambience_direction`、`silence_or_pause` 必须继承 audio plan。
- `storyboard_translation_rule` 用于把故事板驱动规则直接写进最终视频提示词正文：说明本段如何把上游故事板当作顺序视觉关键帧参考、保留哪些推进维度、如何在相邻关键姿势之间扩展出电影化动作、如何确保画面可读性，以及哪些故事板版式痕迹不得渲染。
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
- `storyboard_translation_rule.readability_priority` 应使用题材无关的表达，例如画面可读性、动作清晰度、角色轮廓识别、空间稳定性和表演时机准确性；不要把这层总规则写窄成只服务喜剧的 timing 要求。
- 最终投喂模型的正文不得直接出现显式安全触发词，例如 `骨折`、`残忍`、`血腥`、`写实伤口`、`禁止暴力` 等；若内部需要表达边界，应改写为“无害化卡通效果”“非写实冲击”“轻喜剧化安全表现”等正向描述。
- 最终投喂模型的正文不得直接出现具体版权角色名、明星名、演员名、影视 IP 名，或“像某角色 / 某明星 / 某演员 / 某 IP 一样”的直接说法；若内部需要表达规避边界，应改写为抽象风格描述、原创角色约束和非识别性视觉特征描述。

每个 Segment 还应提供一个“可直接复制使用块”，默认按以下顺序组织：

```text
1. `global_execution_preamble` 的精简可用版
2. `project_level_global_rules` 中与当前段直接相关的全局锁定规则
3. 当前 Segment 的结构化控制参数（Technical Control Block）
4. 当前 Segment 的导演长版自然语言提示词
```

这个“可直接复制使用块”是给用户按段直接投喂外部视频模型使用的，不应混入其他 Segment、英文版正文、review 日志、确认事项、版权与安全规避说明或实现说明。

正式 pack 文件在进入各 Segment 之前，还应给出一个“包级声音执行摘要”，至少包含：

```text
1. BGM 主情绪与起落
2. 关键拟音 / 动作声钩子
3. 环境音床与空间底噪
4. 静默点 / 声音留白
5. 跨 Segment 的转场声音钩子
```

它用于帮助用户在不通读全文的情况下快速把握该包的声音执行策略，不替代各 Segment 内的独立声音执行块。

其中第 1 部分必须把故事板顺序视觉关键帧参考、不渲染故事板版式痕迹和电影化动作扩展写成直接可用的提示词开头，而不是只留在说明层。

其中第 2 部分必须把主场景空间锁定、角色重现锁定、不重复角色和通用可读性要求写成直接可用的提示词约束，而不是只留在 review 摘要。

其中第 3 部分“当前 Segment 的结构化控制参数（Technical Control Block）”不得退化成只有 `Duration / Camera / Dialogue` 的轻量摘要；至少必须显式包含：

- `primary_vgu_ids`
- `continuity_in`
- `continuity_out`
- `shot_continuity_refs`
- `blocking_continuity`
- `prop_state_continuity`
- `blocking_execution`
- `prop_state_execution`
- `next_handoff`

以下结构不属于正式 `video_prompt_files` 主交付：

```text
全局一致性锚点
Seg1 / Seg2 / Seg3 ...
每段仅包含：站位执行 / 道具状态执行 / 逐镜参数表 / 编译Prompt
```

这类文体最多只能作为中间层导演稿或 review 草稿，不能替代正式导演长版与每段 `可直接复制使用块`。

## 自动 review 与 auto-fix 规则

自动 review 至少检查：

- `project_config.target_total_duration_seconds` 是否与当前阶段时长一致
- 中英双份文件是否都存在
- 中文 / 英文导演长版是否都存在
- 导演长版正文是否按 `global_execution_preamble -> project_level_global_rules -> segment_technical_control_block -> shot_by_shot_director_prompt` 组织
- 预览阶段是否先给出 `video_prompt_pack_plan`
- 预览阶段是否同时给出 `pack_audio_execution_plan`
- 正文中是否真实写出了顺序视觉关键帧参考、故事板推进维度、关键姿势之间的电影化动作扩展和不渲染故事板版式痕迹
- 正文中是否真实写出了主场景空间锁定、角色重现锁定、不重复角色，以及画面可读性、动作清晰度、角色轮廓识别、空间稳定性和表演时机准确性
- 每个 Segment 是否包含 `shot_plan`
- 每个 Segment 是否真实包含 `segment_technical_control_block`
- 每个 Segment 是否显式继承 `primary_vgu_ids`
- 每个 Segment 是否显式继承 `continuity_in` / `continuity_out`
- 每个 Segment 是否显式继承 `blocking_continuity` / `prop_state_continuity`
- 每个 Segment 是否显式继承 `blocking_execution` / `prop_state_execution`
- 每个 Segment 是否显式声明 `dialogue_plan.has_dialogue`
- 每个 Segment 是否显式存在独立的 `segment_sound_execution`
- `segment_sound_execution` 是否真实覆盖 `BGM / Foley-SFX / Ambience / Silence`
- 仅当上游已有对白设计时，Segment 是否写出 `dialogue_plan.speakers[].dialogue_text`
- 每个正式 pack 文件是否存在包级声音执行摘要
- 每个 Segment 是否提供完整的可直接复制使用块
- 可直接复制使用块是否真实包含全局前导块和项目级全局锁定规则，而不是只剩段级控制和自然语言正文
- 可直接复制使用块中的 Technical Control Block 是否真实包含 `primary_vgu_ids`、`continuity_in`、`continuity_out`、`shot_continuity_refs`、`blocking_continuity`、`prop_state_continuity`、`blocking_execution`、`prop_state_execution` 和 `next_handoff`
- 可直接复制使用块是否误混入版权与安全规避说明、review 日志、确认事项或其他元说明
- 正式文件是否仍退化成“全局设定 + 参数表 + 编译 Prompt”的说明稿；若是，则必须判定为未通过
- 最终投喂正文、导演长版正文和可直接复制使用块中，是否出现显式安全触发词
- 最终投喂正文、导演长版正文和可直接复制使用块中，是否出现具体版权角色名、明星名、演员名、影视 IP 名，或“像某角色 / 某明星 / 某演员 / 某 IP 一样”的直接说法
- 若 `storyboard_prompt_pack_mode` 为多包模式，是否同时提供了按 `pack` 对齐的视频提示词文件索引
- `related_shot_continuity_refs` 与 `shot_plan[].shot_continuity` 是否完整且同源
- `blocking_execution` / `prop_state_execution` 是否完整
- `shot_plan[].screen_positioning` 是否完整
- 是否继承 `hero_moment_candidates` 与 `ending_payoff`
- 是否包含上游 Beat Skeleton、声音、表演和镜头语言信息
- 是否遗漏必要负向约束
- review 结论是否与正文真实字段一致，不得只在结尾摘要宣称“已包含”而正文缺失
- 若上游故事板为多包模式，黑板中的 `files.primary` 与 `read_policy.default_read` 是否仍错误指向未提供 pack 对齐文件的结果；若是，则不得写入 completed 状态

自动修复只允许修：

- 文件缺项
- 结构漏项
- `video_prompt_pack_plan` 漏项
- `pack_audio_execution_plan` 漏项
- `segment_technical_control_block` 漏项
- `segment_sound_execution` 漏项
- 时间码漏写
- 继承字段漏写
- 中英文件不对齐

自动修复不允许把不合格说明稿直接宣告为正式交付；若缺少 `video_prompt_pack_plan`、缺少 `pack_audio_execution_plan`、缺少 `可直接复制使用块`、缺少 `segment_technical_control_block`、缺少 `segment_sound_execution`、缺少 pack 对齐文件、或正文仍有版权直指词，必须回退到 `Prompt Draft / Prompt Review`，而不是跳到 `Final Delivery`。

自动修复不得悄悄改动：

- 用户已确认的改写方向
- 用户已确认的总时长
- 用户已确认的 Segment 策略
- 用户已确认的 pack 规划
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

必须规避的效果方向：

- 过度写实的高冲击伤害表现
- 持续性痛苦聚焦
- 身体破坏细节特写
- 暗沉、恐怖化的伤害质感
- 让观众注意力偏离喜剧动作主体的高刺激伤害描写

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
保持动画电影动作喜剧尺度，所有冲击效果都采用无害化、非写实、可继续表演的卡通化表现。避免高刺激伤害细节、恐怖化质感、持续痛苦聚焦、随机堆特效、每个镜头都强行抖包袱，或机械套用镜头模板。镜头语言只服务叙事、情绪、动作可读性和视觉信息，不模仿任何具体电影镜头。
```

---

# 十三、输出路径

视频分段提示词默认按故事板 `pack` 对齐写入：

```text
outputs/video_prompts/视频提示词_第01包_中文_v*.md
outputs/video_prompts/视频提示词_第01包_英文_v*.md
```

如用户明确需要整片汇编版，可额外写入：

```text
outputs/video_prompts/视频提示词_导演长版_中文_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_v*.md
```

只有当用户明确要求“按段单独落文件”时，才允许按段拆文件：

```text
outputs/video_prompts/视频提示词_导演长版_中文_segment_01_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_segment_01_v*.md
```

黑板只记录摘要和路径，不直接塞完整提示词正文。

若本阶段将 `video_prompt_review.final_delivery_ready` 视为正式完成闸门，则正式推进前还必须将 review / auto-fix 结果文件写入 `stage_index.video_prompts.files.quality_check`；缺少该路径索引时，不得把 `stage_index.video_prompts.status` 写成 `completed`，也不得把未过审文件写成 `files.primary` 或 `read_policy.default_read`。

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
