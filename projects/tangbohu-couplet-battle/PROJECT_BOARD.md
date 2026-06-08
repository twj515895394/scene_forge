project:
  name: 唐伯虎点秋香-对对子
  slug: tangbohu-couplet-battle
  created_at: 2026-06-07T00:00:00+08:00
  updated_at: 2026-06-07T00:00:00+08:00

state:
  project_status: topic_scored
  next_stage: scene-reference-decider
  lifecycle_flag: active
  blocker_note: wild_comedy_2d 风格包 profile.md 及六项 reference 文件均未落地，需在进入 scene-design-builder 前完成脚手架搭建

routing:
  current_stage: scene-topic-gate
  allowed_next_stages:
    - scene-reference-decider
  last_completed_stage: scene-topic-gate
  route_reason: 选题通过（90分/focus），用户已确认 wild_comedy_2d（Exploration Pool），推进到参考素材决策阶段

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
  score: 90
  production_level: focus
  reference_type:
  adaptation_level:
  director_style_id: wild_comedy_2d
  director_style_version: v1
  style_family: 2d_animation
  style_profile_path: style_profiles/wild_comedy_2d/profile.md
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:

confirmations:
  topic_confirmed:
    status: confirmed
    note: 用户确认选题通过，90分进入重点制作池
  style_confirmed:
    status: confirmed
    note: 用户从 Exploration Pool 显式选择 wild_comedy_2d；profile 文件尚未落地，需在 scene-design-builder 前完成脚手架
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
  topic: v1
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
    status: skipped
    active_version:
    summary: 文字输入项目，无视频源
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
    status: completed
    active_version: v1
    summary: 选题"唐伯虎点秋香-对对子"通过（90分/focus），演绎风格建议 exaggerated_comedy，导演风格已确认 wild_comedy_2d（Exploration Pool/experimental），profile 脚手架待搭建
    updated_at: 2026-06-07T00:00:00+08:00
    files:
      index:
      primary: details/topic/topic_gate_output_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/topic/topic_gate_output_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-reference-decider；在此之前需确认 wild_comedy_2d 风格脚手架搭建时机
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
  premise: 唐伯虎化装进入华府前，遭遇对穿肠的对联挑战，二人从客套对子升级到人身攻击，最终对穿肠被逼到喷血倒地
  story_engine: 对决升级型（对子攻防 + 喜剧 escalation）
  core_characters:
    - 唐伯虎（机智从容的攻击者）
    - 对穿肠（自负而易碎的防守者）
  core_scene: 华府门前书桌对决
  key_props:
    - 折扇
    - 书桌
    - 文房四宝
  visual_style: 2D 狂野喜剧，变形帧+Q版切入+速度线+颜艺夸张
  continuity_focus:
  source_adaptation_mode: preserve_original
  current_risks:
    - wild_comedy_2d 风格包 profile.md 未落地，进入设计阶段前需搭建风格脚手架
    - 部分典故对现代观众认知度有限

read_policy:
  default_read:
    - PROJECT_BOARD.md
  stage_specific_reads: {}
  deep_read_requires_reason: true

stage_patches:
  - patch_type: scene-topic-gate
    stage: scene-topic-gate
    version: 1
    status: completed
    updated_at: 2026-06-07T00:00:00+08:00
    summary: 选题通过（90分/focus），导演风格确认为 wild_comedy_2d（Exploration Pool），风格脚手架待搭建
    files_created:
      - path: details/topic/topic_gate_output_v1.md
        purpose: 选题闸门阶段正文
        version: v1
    files_updated: []
    next_action: 推进到 scene-reference-decider；style_profiles/wild_comedy_2d/ 脚手架需在 scene-design-builder 前完成
