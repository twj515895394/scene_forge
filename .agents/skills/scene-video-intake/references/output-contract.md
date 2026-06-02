# scene-video-intake 输出协议

本文件定义 `scene-video-intake` 的阶段补丁、长解析文件、source intake 黑板摘要、topic gate handoff、内容优先级分层和资产化候选判断。

## 阶段补丁壳

```yaml
patch_type: scene-video-intake
version: 1
status:
updated_at:
summary:
data:
```

`status` 枚举：

- `pending`
- `in_progress`
- `completed`
- `blocked`
- `skipped`
- `failed`

## `data` 结构

```yaml
data:
  source_video:
    source_input_type: video_file | video_url | short_video_url | frame_sequence | unknown
    source_path_or_url:
    source_duration_seconds:
    source_language_hint:
    source_fps_or_frame_count:
    analysis_confidence:
    user_goal:
  content_summary:
    one_sentence_summary:
    short_summary:
    key_event_chain:
    emotional_arc:
    main_conflict_or_hook:
  timeline_breakdown:
    - time_range:
      shot_or_moment_id:
      visual_description:
      action:
      dialogue_or_text:
      audio:
      camera_or_editing:
      importance_level: core | highlight | useful | compress | replace | avoid_copying
      notes:
  camera_language_analysis:
    shot_scale:
    camera_angle:
    camera_movement:
    composition:
    editing_rhythm:
    visual_motivation:
  characters_or_subjects:
    - subject_id:
      description:
      role_in_clip:
      continuity_markers:
      emotion_or_intent:
      action_pattern:
  scene_space_analysis:
    location_summary:
    spatial_axis:
    zones:
    movement_path:
    continuity_risks:
  action_continuity:
    setup:
    escalation:
    turn:
    payoff:
    recovery:
    must_track_props_or_states:
  dialogue_transcript:
    has_dialogue: true | false
    dialogue_language:
    lines:
      - time_range:
        speaker_or_source:
        text:
        function:
    screen_text:
  audio_observations:
    music:
    ambience:
    foley:
    sound_hooks:
    silence_or_pause:
    audio_rhythm:
  visual_style_analysis:
    palette:
    lighting:
    texture:
    motion_quality:
    genre_or_platform_style:
  core_highlight_analysis:
    core_hook:
    hero_moments:
    comedic_or_emotional_engine:
    reusable_structure:
  content_priority_map:
    core_must_keep:
    highlight_should_keep:
    useful_optional:
    pass_or_compress:
    safe_to_replace:
    avoid_copying:
  adaptation_potential:
    candidate_topic:
    possible_adaptation_angles:
    suitable_performance_style:
    production_level_hint:
    transformation_notes:
  safe_adaptation_notes:
    keep_as_abstract_structure:
    replace_required:
    do_not_copy:
    copyright_or_identity_risks:
    platform_safety_risks:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed
    reuse_mode_hint: direct_reference | adapted_reference | structure_only
  topic_gate_handoff:
    candidate_topic:
    source_material:
      source_type:
      source_name:
      source_locator:
      notes:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
    scoring_hints:
    assetization_recommendation:
  output_files:
    index:
    analysis:
    timeline:
    dialogue:
    audio:
    camera:
    priority_map:
    topic_gate_handoff:
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
    source_intake_read_budget:
      compact:
        read:
          - PROJECT_BOARD.md source_intake summary
          - topic_gate_handoff_v1.md
          - source_video_priority_map_v1.md
      standard:
        read:
          - source_intake_index_v1.md
          - 当前阶段相关专用文件
      deep:
        read:
          - source_video_analysis_v1.md
          - source_video_timeline_v1.md 的相关章节
        only_when:
          - 用户要求复盘源视频
          - 当前阶段需要解决关键不确定性
          - 分镜或剧本需要核对具体动作链
  risk_notes:
  next_action:
    next_stage: scene-topic-gate
    requires_user_confirmation:
    blocker_note:
```

## 必须生成或声明的文件

项目已创建时：

```text
inputs/source_intake/source_video_analysis_v1.md
inputs/source_intake/source_video_timeline_v1.md
inputs/source_intake/source_video_priority_map_v1.md
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_intake_index_v1.md
```

按复杂度可额外生成：

```text
inputs/source_intake/source_video_dialogue_v1.md
inputs/source_intake/source_video_audio_v1.md
inputs/source_intake/source_video_camera_v1.md
```

项目尚未创建时：

```text
projects/_intake/<timestamp-or-slug>/
```

## `source_intake_index_v1.md` 建议结构

```yaml
source_intake_index:
  version: v1
  source_summary:
  file_manifest:
    - file:
      content_type:
      when_to_read:
      key_sections:
  chapter_index:
    topic_gate:
    reference_decider:
    design_builder:
    script_adapter:
    performance_director:
    storyboard_director:
    audio_director:
    video_prompt_builder:
  priority_summary:
    core_must_keep:
    highlight_should_keep:
    pass_or_compress:
    safe_to_replace:
    avoid_copying:
  read_policy:
    default_stage_budget: compact
    recommended_first_read:
      - topic_gate_handoff_v1.md
      - source_video_priority_map_v1.md
    avoid_default_full_read:
      - source_video_analysis_v1.md
      - source_video_timeline_v1.md
```

## `source_video_priority_map_v1.md` 必须包含

```yaml
content_priority_map:
  core_must_keep:
  highlight_should_keep:
  useful_optional:
  pass_or_compress:
  safe_to_replace:
  avoid_copying:
```

含义：

- `core_must_keep`：支撑片段成立的核心结构、冲突、动作链或情绪转折。
- `highlight_should_keep`：建议保留或改写强化的亮点。
- `useful_optional`：有帮助但不是必须的辅助信息。
- `pass_or_compress`：后续可快速带过或省略的内容。
- `safe_to_replace`：可以替换人物、场景、道具、台词或表层表达的内容。
- `avoid_copying`：不应照搬的具体表达、镜头、台词、人物身份、品牌或受保护元素。

## 给 `PROJECT_BOARD.md` 的顶层摘要补丁

`scene-video-intake` 合并后应更新或建议更新：

```yaml
source_intake:
  type: video_clip
  status: analyzed
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version: v1
  files:
    index: inputs/source_intake/source_intake_index_v1.md
    analysis: inputs/source_intake/source_video_analysis_v1.md
    timeline: inputs/source_intake/source_video_timeline_v1.md
    dialogue: inputs/source_intake/source_video_dialogue_v1.md
    audio: inputs/source_intake/source_video_audio_v1.md
    camera: inputs/source_intake/source_video_camera_v1.md
    priority_map: inputs/source_intake/source_video_priority_map_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode: direct_reference | adapted_reference | structure_only
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

黑板不得保存完整长解析、完整逐镜头时间轴或完整台词表。

## 状态推进建议

当 `status: completed` 且 `topic_gate_handoff` 已生成：

```yaml
project_status: draft
next_stage: scene-topic-gate
lifecycle_flag: active
```

如果解析失败：

```yaml
source_intake:
  status: failed
next_stage:
blocker_note:
```

## 资产化约束

本阶段不得自动写入：

```text
assets/source-materials/<source-slug>/
```

只能提出候选：

```yaml
assetization:
  candidate_for_assetization: true | false | uncertain
  asset_status: proposed
```

只有用户明确确认后，才允许创建长期 source asset，并且 `allowed_runtime_asset_paths` 只能加入具体文件，不能加入整个目录。
