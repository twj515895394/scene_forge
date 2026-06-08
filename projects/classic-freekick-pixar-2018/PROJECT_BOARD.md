project:
  name: 2018经典任意球绝平改编（皮克斯风格）
  slug: classic-freekick-pixar-2018
  created_at: "2026-06-05T11:30:00+08:00"
  updated_at: "2026-06-05T12:03:00+08:00"

state:
  project_status: video_prompts_ready
  next_stage: scene-publish-review
  lifecycle_flag: active
  blocker_note:

routing:
  current_stage: scene-publish-review
  allowed_next_stages:
    - scene-publish-review
  last_completed_stage: scene-video-prompt-builder
  route_reason: "4分段全中文加括号英文专业标注的导演长版视频提示词已落盘。内含一键复制投喂块，声音/物理形变连续性控制设计完整。等待进入最终发布与评审阶段。"

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
  score: 95
  production_level: focus
  reference_type: hybrid_reference
  adaptation_level: preserve_original
  performance_style: cinematic_serious
  target_total_duration_seconds: 40
  segment_duration_seconds: 10

confirmations:
  topic_confirmed:
    status: confirmed
    note: "用户确认复刻2018经典任意球绝平名场面，同意进行完全去真人化、去国家/队名化处理，并采用皮克斯 3D 动画风格设计角色。"
  reference_confirmed:
    status: confirmed
    note: "参考决策已确认：采用以世界杯经典动作为主动作参考、以皮克斯风格为视觉参考的混合参考方案，已彻底规避肖像及国家/队名侵权风险。"
  story_confirmed:
    status: confirmed
    note: "用户确认了40秒、8 节拍故事骨架，并要求在比分HUD及回放机位上体现英文宿命感与高潮艺术感。"
  asset_plan_confirmed:
    status: confirmed
    note: "已评估并锁定本次去侵权皮克斯项目所需的全部资产制作路径：总裁/海滨竞技场为完整新建，鸭哥/人墙/队友为轻量新建，像素足球为核心道具。"
  design_confirmed:
    status: confirmed
    note: "用户确认了皮克斯 3D 风格角色与场景设计方向，同意金飞鹰队徽、红金粒子气流落地激波以及门将/人墙的大眼卡通滑稽脸设计，角色球衣与HUD面板已完全作去字、英文代号匿名处理。"
  script_confirmed:
    status: confirmed
    note: "用户确认了40秒剧本方案，包含片头比分看板HUD RED 2-3 WHT及进球改写RED 3-3 WHT、新增多机位慢镜头回放节拍B07。"
  performance_confirmed:
    status: confirmed
    note: "用户同意并确认了皮克斯 3D 风格角色表演设计方案，包含总裁提短裤与SIUUU落地激波、门将鸭哥的大眼飞扑和捶地等戏剧性表演动作，并锁定了动作与情绪连续性链条。"
  storyboard_plan_confirmed:
    status: confirmed
    note: "用户确认重新将 40 秒视频重设为 4 张故事板（对应 4 个 10 秒 VGU），每张设计 8 个镜头，总共 32 镜头，以更高的分镜密度与细节表达皮克斯 3D 风格画面。"
  audio_plan_confirmed:
    status: confirmed
    note: "用户确认了动画电影级声音导演大纲，包含总裁备战呼吸与SIUUU大吼声、门将大眼飞扑的橡胶拉伸声和捶地懊恼声，以及8-bit金币星星掉落的卡通配乐和混音静默点设计。"
  video_prompt_plan_confirmed:
    status: confirmed
    note: "用户确认了全中文且专业术语加括号英文标注的提示词设计，包含一键复制块、声音与画面连续性控制已完全融入并落盘。"
  publish_confirmed:
    status: pending
    note:

active_versions:
  source_intake:
  topic: 1
  reference: 1
  story: 1
  assets: 1
  design: 1
  script: 2
  performance: 2
  storyboard: 1
  audio: 1
  video_prompts: 1
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
    status: completed
    active_version: 1
    summary: "选题评分已完成（95分，重点制作池），采用皮克斯 3D 动画电影风格，并进行完全的无真人名、无国家队名去标与去字化处理。"
    updated_at: "2026-06-05T11:30:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/topic/"
      primary: "projects/classic-freekick-pixar-2018/inputs/topic/topic_scored_v1.md"
      details: []
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/inputs/topic/topic_scored_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/topic/topic_scored_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  reference:
    status: completed
    active_version: 1
    summary: "参考边界已划定，完成高认知动作与镜头继承及服饰/场景/道具的皮克斯卡通化转译约束。"
    updated_at: "2026-06-05T11:32:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/reference/"
      primary: "projects/classic-freekick-pixar-2018/inputs/reference/reference_boundary_v1.md"
      details: []
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/inputs/reference/reference_boundary_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/reference/reference_boundary_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  story:
    status: completed
    active_version: 1
    summary: "故事骨架设计完成（40秒，8节拍，HUD记分牌与进球慢镜重放锁定），并已通过用户同意确认。"
    updated_at: "2026-06-05T11:40:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/story/"
      primary: "projects/classic-freekick-pixar-2018/inputs/story/story_development_v1.md"
      details: []
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/inputs/story/story_development_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/story/story_development_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  assets:
    status: completed
    active_version: 1
    summary: "评估资产锁定方案：总裁与海滨球场完整新建（new_full），人墙与门将鸭哥轻量设计（new_light），足球单独做核心道具锁定。"
    updated_at: "2026-06-05T11:41:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/assets/"
      primary: "projects/classic-freekick-pixar-2018/inputs/assets/asset_check_v1.md"
      details:
        - "projects/classic-freekick-pixar-2018/inputs/assets/asset_lock_v1.md"
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/inputs/assets/asset_lock_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/assets/asset_check_v1.md"
        - "projects/classic-freekick-pixar-2018/inputs/assets/asset_lock_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  design:
    status: completed
    active_version: 1
    summary: "已产出总裁（new_full，飞鹰队徽）、人墙（new_light）、门将鸭哥（new_light，大橙手套）及红衣队友的皮克斯设定与提示词板，并产出海滨竞技场大屏比分HUD设定与空间坐标种子，完全隐去真人与真实国家名。"
    updated_at: "2026-06-05T11:44:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/design/"
      primary: "projects/classic-freekick-pixar-2018/inputs/design/design_summary_v1.0.md"
      details:
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_总裁_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_鸭哥_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_白色人墙_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_红衣队友_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/scene_design_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/space_continuity_seed_v1.0.md"
      outputs:
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_总裁_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_鸭哥_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_白色人墙_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_红衣队友_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/scene_prompts_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
      handoff: "projects/classic-freekick-pixar-2018/inputs/design/design_summary_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/design/design_summary_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_总裁_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_鸭哥_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_白色人墙_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/character_design_红衣队友_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/scene_design_v1.0.md"
        - "projects/classic-freekick-pixar-2018/inputs/design/space_continuity_seed_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  script:
    status: completed
    active_version: 2
    summary: "已产出 40秒、32个高密镜头皮克斯风格剧本、节拍表及VGU视频生成单元规划，比分牌HUD及慢镜头完美继承。"
    updated_at: "2026-06-05T11:57:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/inputs/script/"
      primary: "projects/classic-freekick-pixar-2018/inputs/script/script_v1.1.md"
      details:
        - "projects/classic-freekick-pixar-2018/inputs/script/beat_table_v1.1.md"
        - "projects/classic-freekick-pixar-2018/inputs/script/video_generation_unit_plan_v1.1.md"
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/inputs/script/script_v1.1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/inputs/script/script_v1.1.md"
        - "projects/classic-freekick-pixar-2018/inputs/script/beat_table_v1.1.md"
        - "projects/classic-freekick-pixar-2018/inputs/script/video_generation_unit_plan_v1.1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  performance:
    status: completed
    active_version: 2
    summary: "已根据32镜头重新排布并落盘角色表演大纲、皮克斯风格表演档案、32个细化镜头的详细表演及动作情绪连续性链条。"
    updated_at: "2026-06-05T11:57:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/details/"
      primary: "projects/classic-freekick-pixar-2018/details/performance_sheet_v1.1.md"
      details:
        - "projects/classic-freekick-pixar-2018/details/performance/action_continuity_chains_v1.1.md"
        - "projects/classic-freekick-pixar-2018/details/performance/emotion_continuity_chains_v1.1.md"
      outputs: []
      handoff: "projects/classic-freekick-pixar-2018/details/performance_sheet_v1.1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/details/performance_sheet_v1.1.md"
        - "projects/classic-freekick-pixar-2018/details/performance/action_continuity_chains_v1.1.md"
        - "projects/classic-freekick-pixar-2018/details/performance/emotion_continuity_chains_v1.1.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  storyboard:
    status: completed
    active_version: 1
    summary: "已完成 40秒、32镜头故事板导演清单，分别输出 4个故事板总板提示词，包含 7条中文控制轨，并完成连续性与轴线质量审查。"
    updated_at: "2026-06-05T11:58:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/details/"
      primary: "projects/classic-freekick-pixar-2018/details/分镜清单_v1.0.md"
      details:
        - "projects/classic-freekick-pixar-2018/details/storyboard_quality_check_v1.0.md"
      outputs:
        - "projects/classic-freekick-pixar-2018/outputs/storyboard_prompts/故事板提示词_v1.0.md"
      handoff: "projects/classic-freekick-pixar-2018/details/分镜清单_v1.0.md"
      quality_check: "projects/classic-freekick-pixar-2018/details/storyboard_quality_check_v1.0.md"
      methodology_config:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/details/分镜清单_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/storyboard_prompts/故事板提示词_v1.0.md"
        - "projects/classic-freekick-pixar-2018/details/storyboard_quality_check_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  audio:
    status: completed
    active_version: 1
    summary: "已完成 40秒、32镜头配音方向、配乐情绪主题、Foley卡通音效及4轨混音计划的定义与落盘。"
    updated_at: "2026-06-05T12:03:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/outputs/audio/"
      primary: "projects/classic-freekick-pixar-2018/details/audio_plan_v1.0.md"
      details:
        - "projects/classic-freekick-pixar-2018/outputs/audio/audio_mix_plan_v1.0.md"
      outputs:
        - "projects/classic-freekick-pixar-2018/outputs/audio/music_prompt_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/audio/foley_prompt_v1.0.md"
      handoff: "projects/classic-freekick-pixar-2018/details/audio_plan_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/classic-freekick-pixar-2018/details/audio_plan_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/audio/audio_mix_plan_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/audio/music_prompt_v1.0.md"
        - "projects/classic-freekick-pixar-2018/outputs/audio/foley_prompt_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action:
  video_prompts:
    status: completed
    active_version: 1
    summary: "已完成 40秒、32镜头全中文且专业术语带英文括号标注的导演长版分段提示词设计，包含一键复制块，已通过自动 review。"
    updated_at: "2026-06-05T12:09:00+08:00"
    files:
      index: "projects/classic-freekick-pixar-2018/outputs/video_prompts/"
      primary: "projects/classic-freekick-pixar-2018/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      details: []
      outputs:
        - "projects/classic-freekick-pixar-2018/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      handoff: "projects/classic-freekick-pixar-2018/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
      next_stage: scene-publish-review
      requires_user_confirmation: false
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
  premise: "以皮克斯3D动画风格绝平罚入任意球并进行SIUUU庆祝，隐去一切真实人名与国家队名。"
  story_engine:
  core_characters:
    - "总裁"
    - "鸭哥"
    - "白色人墙"
    - "红衣队友"
  core_scene: "海滨竞技场大禁区"
  key_props:
    - "星纹像素足球"
    - "裁判白折线喷雾"
    - "比分看板 HUD"
  visual_style: "Pixar 3D Animation Style (皮克斯3D动画电影级，高饱和度、高表情张力，SIUUU庆祝阶段融入魔法光效激波)"
  continuity_focus:
  source_adaptation_mode: "preserve_original"
  current_risks:
    - "皮克斯风格下总裁大腿肌发力与拉短裤等特征动作的卡通物理还原"
    - "必须严控提示词中不带任何真实姓名与国家徽章"

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
    updated_at: "2026-06-05T11:30:00+08:00"
    summary: "选题评分已完成（95分，重点制作），已确认采用皮克斯3D动画风格及完全的去版权、去真人化匿名策略。"
    board_updates:
      state:
        project_status: topic_scored
        next_stage: scene-reference-decider
        lifecycle_flag: active
      routing:
        current_stage: scene-reference-decider
        allowed_next_stages:
          - scene-reference-decider
        last_completed_stage: scene-topic-gate
        route_reason: "选题评分与去版权化设计基调已完成（95分），已确定皮克斯动画化改编方案，等待进入参考决策阶段。"
      project_config:
        score: 95
        production_level: focus
        reference_type: hybrid_reference
        adaptation_level: preserve_original
        performance_style: cinematic_serious
      confirmations:
        topic_confirmed:
          status: confirmed
          note: "用户确认复刻2018经典任意球绝平名场面，同意进行完全去真人化、去国家/队名化处理，并采用皮克斯 3D 动画风格设计角色。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/topic/topic_scored_v1.md
        purpose: topic_gate_scoring
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: board_status_update
        version: 1
    next_action:
      next_stage: scene-reference-decider
      requires_user_confirmation: false

  - patch_type: scene-reference-decider
    stage: scene-reference-decider
    version: 1
    status: completed
    updated_at: "2026-06-05T11:32:00+08:00"
    summary: "参考边界已划定，完成高认知动作与镜头继承及服饰/场景/道具的皮克斯卡通化转译约束。"
    board_updates:
      state:
        project_status: reference_decided
        next_stage: scene-story-development
        lifecycle_flag: active
      routing:
        current_stage: scene-story-development
        allowed_next_stages:
          - scene-story-development
        last_completed_stage: scene-reference-decider
        route_reason: "参考决策边界已定义完成，成功划定保留与规避范围，限制全去真人/国家队名化及皮克斯化画风，等待进入故事骨架开发阶段。"
      project_config:
        reference_type: hybrid_reference
      confirmations:
        reference_confirmed:
          status: confirmed
          note: "参考决策已确认：采用以世界杯经典动作为主动作参考、以皮克斯风格为视觉参考的混合参考方案，已彻底规避肖像及国家/队名侵权风险。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/reference/reference_boundary_v1.md
        purpose: reference_boundary_definition
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: board_status_update
        version: 1
    next_action:
      next_stage: scene-story-development
      requires_user_confirmation: false

  - patch_type: scene-story-development
    stage: scene-story-development
    version: 1
    status: completed
    updated_at: "2026-06-05T11:40:00+08:00"
    summary: "故事骨架设计完成（40秒，8节拍，HUD记分牌与进球慢镜重放锁定），并已通过用户同意确认。"
    board_updates:
      state:
        project_status: story_developed
        next_stage: scene-asset-checker
      project_config:
        target_total_duration_seconds: 40
      confirmations:
        story_confirmed:
          status: confirmed
          note: "用户确认了40秒、8 节拍故事骨架，并要求在比分HUD及回放机位上体现英文宿命感与高潮艺术感。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/story/story_development_v1.md
        purpose: story_development_beats
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: story_status_update
        version: 1
    next_action:
      next_stage: scene-asset-checker
      requires_user_confirmation: false

  - patch_type: scene-asset-checker
    stage: scene-asset-checker
    version: 1
    status: completed
    updated_at: "2026-06-05T11:41:00+08:00"
    summary: "评估资产锁定方案：总裁与海滨球场完整新建（new_full），人墙与门将鸭哥轻量设计（new_light），足球单独做核心道具锁定。"
    board_updates:
      state:
        project_status: assets_checked
        next_stage: scene-design-builder
      confirmations:
        asset_plan_confirmed:
          status: confirmed
          note: "已评估并锁定本次去侵权皮克斯项目所需的全部资产制作路径：总裁/海滨竞技场为完整新建，鸭哥/人墙/队友为轻量新建，像素足球为核心道具。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/assets/asset_check_v1.md
        purpose: asset_check_evaluation
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/assets/asset_lock_v1.md
        purpose: asset_lock_definition
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: assets_status_update
        version: 1
    next_action:
      next_stage: scene-design-builder
      requires_user_confirmation: false

  - patch_type: scene-design-builder
    stage: scene-design-builder
    version: 1
    status: completed
    updated_at: "2026-06-05T11:44:00+08:00"
    summary: "已产出总裁（new_full，飞鹰队徽）、人墙（new_light）、门将鸭哥（new_light，大橙手套）及红衣队友的皮克斯设定与提示词板，并产出海滨竞技场大屏比分HUD设定与空间坐标种子，完全隐去真人与真实国家名。"
    board_updates:
      state:
        project_status: design_ready
        next_stage: scene-script-adapter
      confirmations:
        design_confirmed:
          status: confirmed
          note: "用户确认了皮克斯 3D 风格角色与场景设计方向，同意金飞鹰队徽、红金粒子气流落地激波以及门将/人墙的大眼卡通滑稽脸设计，角色球衣与HUD面板已完全作去字、英文代号匿名处理。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/design/design_summary_v1.0.md
        purpose: design_stage_summary
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/character_design_总裁_v1.0.md
        purpose: character_bible_definition_president
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/character_design_鸭哥_v1.0.md
        purpose: character_bible_definition_yage
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/character_design_白色人墙_v1.0.md
        purpose: character_bible_definition_wall
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/character_design_红衣队友_v1.0.md
        purpose: character_bible_definition_teammates
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/scene_design_v1.0.md
        purpose: scene_design_definition
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/design/space_continuity_seed_v1.0.md
        purpose: space_continuity_definition
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_总裁_v1.0.md
        purpose: character_bible_image_prompt_president
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_鸭哥_v1.0.md
        purpose: character_bible_image_prompt_yage
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_白色人墙_v1.0.md
        purpose: character_bible_image_prompt_wall
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/角色说明书图片提示词_红衣队友_v1.0.md
        purpose: character_bible_image_prompt_teammates
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/scene_prompts_v1.0.md
        purpose: scene_and_prop_image_prompt
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/design_prompts/master_scene_prop_reference_v1.0.md
        purpose: master_scene_image_prompt
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: design_status_update
        version: 1
    next_action:
      next_stage: scene-script-adapter
      requires_user_confirmation: false

  - patch_type: scene-script-adapter
    stage: scene-script-adapter
    version: 1
    status: completed
    updated_at: "2026-06-05T11:47:00+08:00"
    summary: "已产出 40秒经典绝平剧本（8节拍）、HUD比分改写和回放节拍、足球形变和气尾特效，空间坐标与连续性已锁定，去字化去真人化匿名完成。"
    board_updates:
      state:
        project_status: script_ready
        next_stage: scene-performance-director
      confirmations:
        script_confirmed:
          status: confirmed
          note: "用户确认了40秒剧本方案，包含片头比分看板HUD RED 2-3 WHT及进球改写RED 3-3 WHT、新增多机位慢镜头回放节拍B07。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/inputs/script/script_v1.0.md
        purpose: adapter_script_content
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/script/beat_table_v1.0.md
        purpose: beat_table_details
        version: 1
      - path: projects/classic-freekick-pixar-2018/inputs/script/video_generation_unit_plan_v1.0.md
        purpose: video_generation_unit_plan_definition
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: script_status_update
        version: 1
    next_action:
      next_stage: scene-performance-director
      requires_user_confirmation: false

  - patch_type: scene-performance-director
    stage: scene-performance-director
    version: 1
    status: completed
    updated_at: "2026-06-05T11:53:00+08:00"
    summary: "已完成 40秒、8节拍角色表演大纲、角色表演档案、动画物理形变、轻伤卡通规范与连续性双链的定义，并与剧本完成对接。"
    board_updates:
      state:
        project_status: performance_ready
        next_stage: scene-storyboard-director
      routing:
        current_stage: scene-storyboard-director
        allowed_next_stages:
          - scene-storyboard-director
        last_completed_stage: scene-performance-director
        route_reason: "角色表演大纲、皮克斯风格表演档案、8节拍详细动作与眼神设计、动作与情绪连续性双链已正式确立并落盘。等待进入故事板分镜导演设计阶段。"
      confirmations:
        performance_confirmed:
          status: confirmed
          note: "用户同意并确认了皮克斯 3D 风格角色表演设计方案，包含总裁提短裤与SIUUU落地激波、门将鸭哥的大眼飞扑和捶地等戏剧性表演动作，并锁定了动作与情绪连续性链条。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/details/performance_sheet_v1.0.md
        purpose: performance_sheet_primary
        version: 1
      - path: projects/classic-freekick-pixar-2018/details/performance/action_continuity_chains_v1.0.md
        purpose: action_continuity_chains
        version: 1
      - path: projects/classic-freekick-pixar-2018/details/performance/emotion_continuity_chains_v1.0.md
        purpose: emotion_continuity_chains
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: performance_status_update
        version: 1
    next_action:
      next_stage: scene-storyboard-director
      requires_user_confirmation: true

  - patch_type: scene-storyboard-director
    stage: scene-storyboard-director
    version: 1
    status: completed
    updated_at: "2026-06-05T11:58:00+08:00"
    summary: "完成 4 张故事板（对应 4 个 VGU），每板 8 个镜头，总计 32 镜头分镜设计，输出故事板提示词包，并完成质量核对。"
    board_updates:
      state:
        project_status: storyboard_ready
        next_stage: scene-audio-director
      routing:
        current_stage: scene-audio-director
        allowed_next_stages:
          - scene-audio-director
        last_completed_stage: scene-storyboard-director
        route_reason: "32镜头分镜清单、同源故事板合集提示词及质量核对报告已正式确立并落盘。比分牌英文HUD及多角度慢放、高潮SIUUU完全符合分镜规范。等待进入声音导演阶段。"
      confirmations:
        storyboard_plan_confirmed:
          status: confirmed
          note: "用户确认重新将 40 秒视频重设为 4 张故事板（对应 4 个 10 秒 VGU），每张设计 8 个镜头，总共 32 镜头，以更高的分镜密度与细节表达皮克斯 3D 风格画面。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/details/分镜清单_v1.0.md
        purpose: storyboard_primary_list
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/storyboard_prompts/故事板提示词_v1.0.md
        purpose: storyboard_gpt_image2_prompts
        version: 1
      - path: projects/classic-freekick-pixar-2018/details/storyboard_quality_check_v1.0.md
        purpose: storyboard_quality_check
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: storyboard_status_update
        version: 1
    next_action:
      next_stage: scene-audio-director
      requires_user_confirmation: false

  - patch_type: scene-audio-director
    stage: scene-audio-director
    version: 1
    status: completed
    updated_at: "2026-06-05T12:03:00+08:00"
    summary: "已完成 40秒、32镜头配音方向、配乐情绪主题、Foley卡通音效及4轨混音计划的定义与落盘。"
    board_updates:
      state:
        project_status: audio_ready
        next_stage: scene-video-prompt-builder
      routing:
        current_stage: scene-video-prompt-builder
        allowed_next_stages:
          - scene-video-prompt-builder
        last_completed_stage: scene-audio-director
        route_reason: "32镜头配乐Prompt、拟音音效Prompt及多轨混音计划已正式确立并落盘。声音层与32分镜及表演连续性完美对齐。等待进入最终视频提示词构建阶段。"
      confirmations:
        audio_plan_confirmed:
          status: confirmed
          note: "用户确认了动画电影级声音导演大纲，包含总裁备战呼吸与SIUUU大吼声、门将大眼飞扑的橡胶拉伸声和捶地懊恼声，以及8-bit金币星星掉落的卡通配乐和混音静默点设计。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/details/audio_plan_v1.0.md
        purpose: audio_plan_primary
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/audio/audio_mix_plan_v1.0.md
        purpose: audio_mix_plan
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/audio/music_prompt_v1.0.md
        purpose: music_prompt_generation
        version: 1
      - path: projects/classic-freekick-pixar-2018/outputs/audio/foley_prompt_v1.0.md
        purpose: foley_prompt_generation
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: audio_status_update
        version: 1
    next_action:
      next_stage: scene-video-prompt-builder
      requires_user_confirmation: false

  - patch_type: scene-video-prompt-builder
    stage: scene-video-prompt-builder
    version: 1
    status: completed
    updated_at: "2026-06-05T12:09:00+08:00"
    summary: "已落盘 40秒、32个镜头的全中文加括号英文专业标注导演长版视频提示词，包含一键复制投喂块，已通过自动 review。"
    board_updates:
      state:
        project_status: video_prompts_ready
        next_stage: scene-publish-review
      routing:
        current_stage: scene-publish-review
        allowed_next_stages:
          - scene-publish-review
        last_completed_stage: scene-video-prompt-builder
        route_reason: "全中文视频分分段提示词及一致性控制规则已全部建立并写入 outputs。等待进入发布与评审阶段。"
      confirmations:
        video_prompt_plan_confirmed:
          status: confirmed
          note: "用户确认了全中文且专业术语加括号英文标注的提示词设计，包含一键复制块、声音与画面连续性控制已完全融入并落盘。"
    files_created:
      - path: projects/classic-freekick-pixar-2018/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md
        purpose: video_prompt_delivery_zh
        version: 1
    files_updated:
      - path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
        purpose: video_prompts_status_update
        version: 1
    next_action:
      next_stage: scene-publish-review
      requires_user_confirmation: false
