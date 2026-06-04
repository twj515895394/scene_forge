# scene-video-intake 输出协议

本文件定义 `scene-video-intake` 的阶段补丁、长解析文件、source intake 黑板摘要、topic gate handoff、内容优先级分层、改写方向候选和资产化候选判断。

## 阶段补丁壳

```yaml
patch_type: scene-video-intake
stage: scene-video-intake
version: 1
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

`status` 枚举：

- `pending`
- `in_progress`
- `completed`
- `blocked`
- `skipped`
- `failed`

## 阶段正文结构

下文结构用于阶段正式产物文件，例如 `details/`、`outputs/` 或 `inputs/` 中的 primary/handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

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
  adaptation_ideas:
    version: v1
    source_pattern_summary:
      core_patterns:
      must_preserve:
      replaceable_slots:
    ideas:
      - idea_id: idea_01
        title:
        seed_type:
        selection_mode: reference | adapted_reference | custom_generated
        summary:
        why_it_works:
        recommended_for:
        user_choice_required: true
    recommendation_note:
    user_selection_required: true
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
    user_confirmation_required: true | false
    user_confirmation_status: pending | confirmed | rejected | not_needed
    confirmation_note:
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
    adaptation_ideas_summary:
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
    adaptation_ideas:
    topic_gate_handoff:
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary + adaptation_ideas_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
    source_intake_read_budget:
      compact:
        read:
          - PROJECT_BOARD.md source_intake summary
          - topic_gate_handoff_v1.md
          - source_video_priority_map_v1.md
          - adaptation_ideas_v1.md summary
      standard:
        read:
          - source_intake_index_v1.md
          - adaptation_ideas_v1.md
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
inputs/source_intake/adaptation_ideas_v1.md
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

## 资产化确认闸门

当 `assetization.candidate_for_assetization = true` 或 `uncertain` 时：

- 本阶段必须把资产化确认为显式用户交互点。
- 在用户确认前，`asset_status` 只能是 `proposed`。
- `user_confirmation_required` 应为 `true`。
- `user_confirmation_status` 默认写为 `pending`。
- 用户对“是否提升为全局 source asset”给出明确同意前，不得把泛泛复用意图、全局存放偏好或架构讨论视为确认完成。
- 在确认完成前，不得回写 `source_asset_ref`。

只有当用户明确同意资产化后，后续流程才允许：

```text
写入 assets/source-materials/<source-slug>/
更新 source_intake.source_asset_ref
将 asset_status 推进为 confirmed / created
```

如果此前已经提前生成了 `assets/source-materials/<source-slug>/` 下的草稿文件，但尚未完成显式确认：

- 黑板状态仍保持 `asset_status: proposed`
- `user_confirmation_status` 仍保持 `pending`
- 不得把这些草稿文件当作正式 `source_asset_ref`

如果用户明确拒绝资产化：

- `user_confirmation_status: rejected`
- `asset_status` 保持 `none` 或 `proposed`
- 解析结果继续只作为当前项目输入使用

## 资产化确认后标准落盘

当用户明确确认资产化，且准备写入：

```text
assets/source-materials/<source-slug>/
```

建议至少生成以下标准文件：

```text
assets/source-materials/<source-slug>/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

说明：

- `source-card.md`：给总控、选题和引用阶段快速读取的资产卡摘要。
- `structure-analysis.md`：桥段结构、动作链、情绪推进、台词/声音节奏等可复用结构分析。
- `adaptation-angles.md`：可长期复用的改编角度，不绑定单个项目。
- `safety-boundaries.md`：不可照搬内容、必须替换元素、版权/品牌/人物边界。
- `reuse-history.md`：该 source asset 被哪些项目引用、以何种模式引用。

可选补充：

```text
source-video-analysis-v1.md
source-video-timeline-v1.md
source-video-dialogue-v1.md
source-video-audio-v1.md
source-video-camera-v1.md
source-video-priority-map-v1.md
adaptation-ideas-v1.md
```

规则：

- 标准文件用于沉淀长期可复用知识，不要求与当前项目输入目录完全一一镜像。
- 不应强制重写用户已有资产正文；已有内容结构合理时，应优先补齐缺失标准文件或建立引用关系。
- `reuse-history.md` 可先写最小版本，后续被项目引用时再持续追加。

## 资产化确认后的执行流程

当用户明确确认资产化后，推荐执行顺序：

```text
1. 创建或定位 assets/source-materials/<source-slug>/
2. 检查该目录下是否已存在相关资产正文
3. 先建立 standard_files 映射
4. 对缺失标准文件做最小补齐
5. 回写 PROJECT_BOARD source_asset_ref
```

具体规则：

- 若目录下已经有等价正文，不强制重写，只需：
  - 把它映射到 `source_asset_ref.standard_files`
  - 或补一个轻量标准文件引用已有正文
- 若目录为空或缺关键标准文件，则优先从当前项目的：
  - `source_intake_index_v1.md`
  - `topic_gate_handoff_v1.md`
  - `source_video_priority_map_v1.md`
  - `adaptation_ideas_v1.md`
  中抽取摘要，生成最小标准文件
- `reuse-history.md` 初次创建时允许只写：
  - 首次创建项目
  - 创建日期
  - 初始 `reuse_mode`

推荐最小生成策略：

```text
source-card.md <- source_intake summary + topic_gate handoff
structure-analysis.md <- priority map + action / emotion structure summary
adaptation-angles.md <- adaptation ideas summary + reusable angle summary
safety-boundaries.md <- safe_adaptation_notes + avoid_copying
reuse-history.md <- current project reference record
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
  adaptation_ideas_summary:
    idea_count:
    recommended_ideas:
    user_selection_required: true
  read_policy:
    default_stage_budget: compact
    recommended_first_read:
      - topic_gate_handoff_v1.md
      - source_video_priority_map_v1.md
      - adaptation_ideas_v1.md summary
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

## `adaptation_ideas_v1.md` 必须包含

`adaptation_ideas_v1.md` 是当前轻量改写方向候选文件。它不是剧本、不是分镜、不是最终 prompt。

```yaml
adaptation_ideas:
  version: v1
  source_pattern_summary:
    core_patterns:
      - pattern_id:
        selection_mode: reference | adapted_reference | custom_generated
        reason:
    must_preserve:
    replaceable_slots:
  ideas:
    - idea_id: idea_01
      title:
      seed_type:
      selection_mode: reference | adapted_reference | custom_generated
      summary:
      why_it_works:
      recommended_for:
      user_choice_required: true
  recommendation_note:
  user_selection_required: true
```

要求：

- 生成 5-10 个候选改写方向。
- 每个方向只写 `title`、`summary`、`why_it_works`、`recommended_for` 等轻量信息。
- 不生成完整剧本、完整分镜或视频 prompt。
- 必须明确 `user_selection_required: true`。
- 用户未选择方向前，后续阶段不得正式生成改写剧本。
- 如果后续创作方向摘要要求 `preserve_original`，可将方向选择状态记为 `bypassed`，后续阶段不得再把它当阻塞条件。

可按需读取以下资产：

```text
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/adaptation-idea-seed-library.md
```

这些资产是开放参考，不是封闭枚举。

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
    adaptation_ideas: inputs/source_intake/adaptation_ideas_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    adaptation_ideas_summary:
    risks_or_limits:
  adaptation_ideas_summary:
    idea_count:
    recommended_ideas:
    user_selection_required: true
  adaptation_selection:
    status: pending | selected | bypassed
    selected_idea_id:
    selected_title:
    selection_note:
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
    default_read: topic_gate_handoff + priority_map_summary + adaptation_ideas_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

黑板不得保存完整长解析、完整逐镜头时间轴、完整台词表或完整 adaptation ideas 正文。

## 黑板回写建议

当 `status: completed` 且 `topic_gate_handoff` 已生成：

```yaml
board_updates:
  state:
    project_status: draft
    next_stage: scene-topic-gate
    lifecycle_flag: active
  stage_index:
    source_intake:
```

如果用户目标明确要求“先选择改写方向再继续”，或 `adaptation_selection.status: pending` 且后续阶段需要正式改写，则应先展示 `adaptation_ideas_v1.md` 的候选摘要，等待用户选择。

如果后续创作方向摘要要求 `preserve_original`：

```yaml
source_intake:
  adaptation_selection:
    status: bypassed
    selection_note: preserve_original script mode selected
```

此时改写方向候选仅作为参考资料保留，不再阻塞下游推进。

如果解析失败：

```yaml
board_updates:
  state:
    next_stage:
    lifecycle_flag: blocked
    blocker_note:
  stage_index:
    source_intake:
      status: failed
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
