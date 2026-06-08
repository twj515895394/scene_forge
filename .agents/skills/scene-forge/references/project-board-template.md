# PROJECT_BOARD.md v8 初始化模板

本模板用于新建 `projects/<project>/PROJECT_BOARD.md`。

模板原则：

1. 只使用 v8 轻黑板结构
2. 不保留旧顶层兼容字段
3. 黑板只保存状态、索引、摘要、读取策略和确认记录
4. 完整阶段内容统一落到 `inputs/`、`details/`、`outputs/`
5. `docs/` 与 `.handoff/` 永远不进入运行时上下文

## 初始化模板

```yaml
project:
  name:
  slug:
  created_at:
  updated_at:

state:
  project_status: draft
  next_stage: scene-topic-gate
  lifecycle_flag: active
  blocker_note:

routing:
  current_stage: scene-topic-gate
  allowed_next_stages:
    - scene-topic-gate
  last_completed_stage:
  route_reason: 新项目初始化，等待进入选题闸门。

runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    active_protocol_docs:
      - .agents/skills/scene-forge/references/board-protocol.md
      - .agents/skills/scene-forge/references/project-board-template.md
    allowed_runtime_asset_paths: []
    forbidden_runtime_paths:
      - docs/
      - .handoff/
      - 会话记录_*.md
      - 历史项目输出
      - 其他无关项目目录
      - projects/ 下当前项目之外的任何兄弟项目目录
    token_budget:
      default_stage_budget: compact
      require_reason_for_extra_reads: true
  reference_policy:
    templates_are_reference_only: true
    examples_are_reference_only: true
    enums_are_open_by_default: true
    strict_enum_only_when_explicit: true
    allow_adapted_reference: true
    allow_custom_generated_option: true
    require_reason_for_custom_option: true

project_config:
  score:
  production_level:
  reference_type:
  adaptation_level:
  director_style_id:
  director_style_version:
  style_family:
  style_profile_path:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:

confirmations:
  topic_confirmed:
    status: pending
    note:
  style_family_confirmed:
    status: pending
    note:
  style_confirmed:
    status: pending
    note:
  reference_confirmed:
    status: pending
    note:
  story_confirmed:
    status: pending
    note:
  asset_plan_confirmed:
    status: pending
    note:
  design_confirmed:
    status: pending
    note:
  script_confirmed:
    status: pending
    note:
  performance_confirmed:
    status: pending
    note:
  storyboard_plan_confirmed:
    status: pending
    note:
  audio_plan_confirmed:
    status: pending
    note:
  video_prompt_plan_confirmed:
    status: pending
    note:
  publish_confirmed:
    status: pending
    note:

active_versions:
  source_intake:
  topic:
  reference:
  story:
  assets:
  design:
  script:
  performance:
  storyboard:
  audio:
  video_prompts:
  publish:

stage_index:
  source_intake:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  topic:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  reference:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  story:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  assets:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  design:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  script:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  performance:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  storyboard:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
      methodology_config:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  audio:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  video_prompts:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  publish:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:

cross_stage_summary:
  premise:
  story_engine:
  core_characters: []
  core_scene:
  key_props: []
  visual_style:
  continuity_focus:
  source_adaptation_mode:
  current_risks: []

read_policy:
  default_read:
    - PROJECT_BOARD.md
    - projects/PROJECT_INDEX.md
    - style_profiles/style_registry.md
  stage_specific_reads: {}
  style_profile_resolution_order:
    - project_config.style_profile_path
    - style_profile.required_profile_files
  style_profile_bulk_scan_allowed: false
  cross_project_scan_allowed: false
  deep_read_requires_reason: true

stage_patches: []
```

## 初始化规则

- 若项目来自视频源输入，新建黑板后可把：
  - `state.next_stage` 改为 `scene-video-intake`
  - `routing.current_stage` 改为 `scene-video-intake`
  - `routing.allowed_next_stages` 改为 `[scene-video-intake]`
- 新建项目时应同时创建 `projects/<project>/PROJECT_INDEX.md`，并同步更新 `projects/PROJECT_INDEX.md`
- 若项目进入 v8 故事板方法论阶段，只允许把 `assets/storyboard-methodology/*` 中实际需要的文件加入 `runtime_policy.context_policy.allowed_runtime_asset_paths`，不得整目录默认深读。
- 不得预先创建 `source_intake`、`expressive_animation`、`storyboard_director_v5` 等旧顶层大字段。
- 不得把 `docs/`、`.handoff/`、历史产出目录写入任何默认读取白名单。
