project:
  name: million-pound-biao-v2
  slug: million-pound-biao-v2
  created_at: "2026-06-04T11:43:00+08:00"
  updated_at: "2026-06-04T11:43:00+08:00"

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
  route_reason: 已完成12个技术分段的导演长版与模型投喂版视频提示词的中英文落盘，等待进入发布审评阶段。

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
  score: 93
  production_level: focus
  reference_type: hybrid_reference
  adaptation_level:
  performance_style:
  target_total_duration_seconds: 120
  segment_duration_seconds: 10

confirmations:
  topic_confirmed:
    status: confirmed
    note: "已评估通过以对白交互驱动、保留点餐加餐、外形磨损潦倒的彪哥版选题（93分，Go，重点制作池）。"
  reference_confirmed:
    status: confirmed
    note: "已确认物理空间完全锁定在1903年古典英式餐厅，锁定主次参考及对白优先、规避实体枪支与动作斗打的改编边界。"
  story_confirmed:
    status: confirmed
    note: "已确认120秒全新故事骨架，首尾呼应的雪地动作设计（开场热身、结尾跳舞滑倒并说出经典台词挽尊），保留点餐牛排及不留软骨抠门算计对白。"
  asset_plan_confirmed:
    status: confirmed
    note: "已确认直接复用1903茶室场景资产，完整新建西装版彪哥及各英国侍应生/配角角色，核心道具锁定为维多利亚至尊钻石黑卡。"
  design_confirmed:
    status: confirmed
    note: "用户确认了设计方向，已落盘完整角色说明书、场景与道具锁定卡及图片Prompt文件包。"
  script_confirmed:
    status: confirmed
    note: "用户确认了 100 比特币天价账单和十成熟牛排的荒诞版剧本，已落盘剧本正文与视频生成单元规划。"
  performance_confirmed:
    status: confirmed
    note: "已落盘正式表演导演控制表、跨节拍动作连续性链和情绪连续性链，规范了下巴脱臼拉伸与雪地摔倒揉腰的物理细节。"
  storyboard_plan_confirmed:
    status: confirmed
    note: "已确认24个镜头分镜清单，生成3包双语分镜Prompt及质量自检表，画面无越轴风险且道具与动作连续性逻辑严密。"
  audio_plan_confirmed:
    status: confirmed
    note: "已确认120秒24个镜头的声音导演方案，包含音乐提示词、拟音提示词及混音计划，规避写实性伤害声并锁定翻译腔/东北话音调冲突。"
  video_prompt_plan_confirmed:
    status: confirmed
    note: "已确认12个分段（120秒）的中英文导演长版与模型投喂版视频提示词，融合了分镜、表演控制和声音导演计划，确立了防线负向约束。"
  publish_confirmed:
    status: pending
    note:

active_versions:
  source_intake:
  topic: v1
  reference: v1
  story: v1
  assets: v1
  design: v1
  script: v1
  performance: v1
  storyboard: v1
  audio: v1
  video_prompts: v1
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
    active_version: v1
    summary: "已完成以对白交互驱动、保留点餐加餐、外形磨损潦倒的《百万英镑》彪哥版二创选题评估（得分93分，Go，重点制作池）。已锁定基于原版台词逐字稿的方言口对白改编方案。"
    updated_at: "2026-06-04T11:43:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/inputs/topic_gate_handoff_v1.md"
      primary: "projects/million-pound-biao-v2/inputs/topic_gate_handoff_v1.md"
      details: []
      outputs: []
      handoff: "projects/million-pound-biao-v2/inputs/topic_gate_handoff_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/inputs/topic_gate_handoff_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-reference-decider 阶段进行参考边界裁定。"
  reference:
    status: completed
    active_version: v1
    summary: "已完成《百万英镑》彪哥新版（v2）参考边界裁定（混合参考hybrid_reference），锁定1903茶室纯对白交互边界，规避武斗与走火，明确彪哥潦倒西装造型。"
    updated_at: "2026-06-04T11:47:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/inputs/reference_boundary_v1.md"
      primary: "projects/million-pound-biao-v2/inputs/reference_boundary_v1.md"
      details: []
      outputs: []
      handoff: "projects/million-pound-biao-v2/inputs/reference_boundary_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/inputs/reference_boundary_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-story-development 阶段开发9个10秒段落的完整故事骨架。"
  story:
    status: completed
    active_version: v1
    summary: "已开发完成120秒全新故事骨架（12个10秒分段）。设计了开场大雪热身、点餐牛排、加餐大饱嗝、后厨“不要去软骨”算计、大挂钟对峙以及结尾跳舞滑倒强行挽尊动作戏。"
    updated_at: "2026-06-04T11:53:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/inputs/story_beats_v1.md"
      primary: "projects/million-pound-biao-v2/inputs/story_beats_v1.md"
      details: []
      outputs: []
      handoff: "projects/million-pound-biao-v2/inputs/story_beats_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/inputs/story_beats_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-asset-checker 阶段检查角色、场景和道具等资产储备与新建计划。"
  assets:
    status: completed
    active_version: v1
    summary: "已完成彪哥新版（v2）资产复用检查，直接复用1903茶室场景，锁定完整新建彪哥及英伦人员等7个角色，核心道具锁定为维多利亚至尊黑卡并落盘 asset_lock_v1.md。"
    updated_at: "2026-06-04T11:56:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/assets/asset_lock_v1.md"
      primary: "projects/million-pound-biao-v2/details/assets/asset_check_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/assets/asset_lock_v1.md"
      outputs: []
      handoff: "projects/million-pound-biao-v2/details/assets/asset_lock_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/assets/asset_lock_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-design-builder 阶段，开展彪哥及各配角造型与核心道具至尊黑卡的原画设定与 Prompt 设计。"
  design:
    status: completed
    active_version: v1
    summary: "已完成《百万英镑》彪哥新版（v2）迪士尼/皮克斯动画风格视觉设计，输出角色说明书、场景及道具锁定卡，并生成完整Prompt提示词包。"
    updated_at: "2026-06-04T12:05:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/character_design_v1.md"
      primary: "projects/million-pound-biao-v2/details/character_design_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/character_design_v1.md"
        - "projects/million-pound-biao-v2/details/scene_design_v1.md"
        - "projects/million-pound-biao-v2/details/prop_design_v1.md"
        - "projects/million-pound-biao-v2/details/design/space_continuity_seed_v1.md"
        - "projects/million-pound-biao-v2/details/角色说明书_彪哥_v1.md"
        - "projects/million-pound-biao-v2/details/角色说明书_弗罗斯特_v1.md"
        - "projects/million-pound-biao-v2/details/角色说明书_配角合集_v1.md"
      outputs:
        - "projects/million-pound-biao-v2/outputs/design_prompts/角色说明书图片提示词_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/design_prompts/scene_prompts_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/design_prompts/prop_prompts_v1.md"
        - "projects/million-pound-biao-v2/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
      handoff: "projects/million-pound-biao-v2/details/character_design_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/character_design_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-script-adapter 阶段，撰写 120 秒高傲翻译腔与土味东北话对峙的正式剧本。"
  script:
    status: completed
    active_version: v1
    summary: "已完成《百万英镑》彪哥新版（v2）120 秒比特币穿越荒诞版剧本改编，输出正式剧本、Beat 表及 VGU 视频控制单元计划。"
    updated_at: "2026-06-04T12:12:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/script_v1.md"
      primary: "projects/million-pound-biao-v2/details/script_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/script_v1.md"
        - "projects/million-pound-biao-v2/details/script/beat_table_v1.md"
        - "projects/million-pound-biao-v2/details/script/video_generation_unit_plan_v1.md"
      outputs: []
      handoff: "projects/million-pound-biao-v2/details/script_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/script_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-performance-director 阶段，规划角色方言配音风格、微表情、心理变化与动作节奏。"
  performance:
    status: completed
    active_version: v1
    summary: "已完成《百万英镑》彪哥新版（v2）表演导演设计，落盘完整表演控制表及动作、情绪连续性链。"
    updated_at: "2026-06-04T12:15:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/performance_sheet_v1.md"
      primary: "projects/million-pound-biao-v2/details/performance_sheet_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/performance_sheet_v1.md"
        - "projects/million-pound-biao-v2/details/performance/action_continuity_chains_v1.md"
        - "projects/million-pound-biao-v2/details/performance/emotion_continuity_chains_v1.md"
      outputs: []
      handoff: "projects/million-pound-biao-v2/details/performance_sheet_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/performance_sheet_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-storyboard-director 阶段，根据表演和生成单元规划，设计镜头级别画面的分镜提示词。"
  storyboard:
    status: completed
    active_version: v1
    summary: "设计了 120 秒共 24 个镜头的分镜控制，锁定 Blocking 对峙无越轴；生成了包含 3D 皮克斯风格的 3 包双语 Prompt，完成了包含四线连续性控制的自检。"
    updated_at: "2026-06-04T12:25:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/分镜清单_v1.md"
      primary: "projects/million-pound-biao-v2/details/分镜清单_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/分镜清单_v1.md"
        - "projects/million-pound-biao-v2/details/storyboard/storyboard_quality_check_v1.md"
      outputs:
        - "projects/million-pound-biao-v2/outputs/storyboard_prompts/故事板提示词_pack_01_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/storyboard_prompts/故事板提示词_pack_02_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/storyboard_prompts/故事板提示词_pack_03_v1.0.md"
      handoff: "projects/million-pound-biao-v2/details/分镜清单_v1.md"
      quality_check: "projects/million-pound-biao-v2/details/storyboard/storyboard_quality_check_v1.md"
      methodology_config:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/分镜清单_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-audio-director 阶段，根据分镜和表演控制编写动画电影级声音方案（配音风格、拟音环境音、配乐主题及音频混合计划）。"
  audio:
    status: completed
    active_version: v1
    summary: "规划了 120 秒声音方案，锁定翻译腔与东北大碴子方言语调错位；设计了包含嚼葱、拍天价账单和亮卡圣光瞬间静音的拟音，并输出了独立音乐提示词及混音计划。"
    updated_at: "2026-06-04T12:35:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/details/audio_plan_v1.md"
      primary: "projects/million-pound-biao-v2/details/audio_plan_v1.md"
      details:
        - "projects/million-pound-biao-v2/details/audio_plan_v1.md"
      outputs:
        - "projects/million-pound-biao-v2/outputs/audio/music_prompt_v1.md"
        - "projects/million-pound-biao-v2/outputs/audio/foley_prompt_v1.md"
        - "projects/million-pound-biao-v2/outputs/audio/audio_mix_plan_v1.md"
      handoff: "projects/million-pound-biao-v2/details/audio_plan_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/details/audio_plan_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-video-prompt-builder 阶段，根据分镜和声音导演规划，构建 12 个视频控制单元 (VGU) 的最终双语提示词与负面约束。"
  video_prompts:
    status: completed
    active_version: v1
    summary: "生成了全片 120 秒共 12 个分段（VGU01 - VGU12）的中英文双语、导演长版及模型投喂版视频生成提示词；完美融合了分镜运镜、角色动作表情控制和环境拟音音效，设立了防线负面约束。"
    updated_at: "2026-06-04T12:45:00+08:00"
    files:
      index: "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      primary: "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      details:
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_模型投喂版_中文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_模型投喂版_英文_v1.0.md"
      outputs:
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_模型投喂版_中文_v1.0.md"
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_模型投喂版_英文_v1.0.md"
      handoff: "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/million-pound-biao-v2/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-publish-review 阶段，整理最终发布文案、字幕配音对齐方案，并进行项目结项复盘归档。"
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
  premise: "落魄潦倒的彪哥（范德彪）进入高档英式茶室，经历冷遇点餐、大口加餐及后厨抠门算计后，在逼债交锋中被迫亮出‘维多利亚至尊黑卡’并摆出‘鹰爪挠’姿势，被店家误以为是皇家特工兼绝世高手而滑跪免单；最终彪哥在门口得意忘形跳舞，结果在大雪中滑倒，以‘今天发挥不太正常’尴尬挽尊起身后迈碎步开溜。"
  story_engine: "翻译腔高傲对白与彪哥东北大碴子方言对白错位 + 身份/武功/财富的多重误会驱动喜剧 + 片头片尾首尾呼应的雪地动作"
  core_characters:
    - "彪哥 (落魄但强撑尊严的保卫科长)"
    - "弗罗斯特 (势利眼男侍应生)"
    - "领班 (高个子警告点餐侍应生)"
    - "老板 (抠门打算的老头)"
    - "马琪 (老板娘)"
    - "克莱门斯 (脑补达人总经理)"
    - "吃土豆的老头 (邻桌老头)"
  core_scene: "1903古典英式高级茶室"
  key_props:
    - "开原维多利亚大饭店至尊钻石黑卡"
    - "大葱、面条与陶碗"
  visual_style: "3D 迪士尼/皮克斯动画电影风格 (3D Pixar Style)"
  continuity_focus: "空间阵营定位连续性 (Blocking Continuity) 与角色形象/道具物理状态连续性"
  source_adaptation_mode: "rewrite_adaptation"
  current_risks:
    - "中英文方言对白错位对比的语意契合度"
    - "大雪天跌倒滑行等卡通物理形变的落地表达"

read_policy:
  default_read:
    - PROJECT_BOARD.md
  stage_specific_reads: {}
  deep_read_requires_reason: true

stage_patches:
  - patch_type: scene-topic-gate
    version: 1
    status: completed
    updated_at: "2026-06-04T11:43:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）选题评估，七维评分93分，划入重点制作池（Focus），项目状态推进至选题评分完成（topic_scored）。"
  - patch_type: scene-reference-decider
    version: 1
    status: completed
    updated_at: "2026-06-04T11:47:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的参考边界判定，确立混合参考路线并落盘 inputs/reference_boundary_v1.md，项目状态推进至参考裁定完成（reference_decided）。"
  - patch_type: scene-story-development
    version: 1
    status: completed
    updated_at: "2026-06-04T11:53:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的故事骨架设计，总时长扩展为 120 秒并落盘 inputs/story_beats_v1.md，项目状态推进至故事骨架完成（story_developed）。"
  - patch_type: scene-asset-checker
    version: 1
    status: completed
    updated_at: "2026-06-04T11:56:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的资产检查，确定复用1903茶室场景，新建彪哥等7个角色及黑卡道具，并落盘 details/assets/asset_lock_v1.md，项目状态推进至资产检查完成（assets_checked）。"
  - patch_type: scene-design-builder
    version: 1
    status: completed
    updated_at: "2026-06-04T12:05:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的角色与场景设定设计，落盘多项角色与场景锁定卡细节，生成全套图片生成Prompt包，状态推进至设定就绪（design_ready）。"
  - patch_type: scene-script-adapter
    version: 1
    status: completed
    updated_at: "2026-06-04T12:12:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的比特币穿越版剧本改编，落盘正式剧本、标准化 Beat 表和 VGU 生成单元文件，状态推进至剧本就绪（script_ready）。"
  - patch_type: scene-performance-director
    version: 1
    status: completed
    updated_at: "2026-06-04T12:15:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）的表演导演设计，输出表演控制表、跨节拍动作/情绪连续性链，状态推进至表演就绪（performance_ready）。"
  - patch_type: scene-storyboard-director
    version: 1
    status: completed
    updated_at: "2026-06-04T12:25:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）分镜设计，落盘分镜清单及3包故事板Prompt，完成分镜质量自检，状态推进至分镜就绪（storyboard_ready）。"
  - patch_type: scene-audio-director
    version: 1
    status: completed
    updated_at: "2026-06-04T12:35:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）声音导演方案，落盘声音方案、音乐提示词、拟音提示词及混音计划，状态推进至声音就绪（audio_ready）。"
  - patch_type: scene-video-prompt-builder
    version: 1
    status: completed
    updated_at: "2026-06-04T12:45:00+08:00"
    summary: "已完成《百万英镑》彪哥新版（v2）视频提示词方案，落盘中英文双语、导演长版及模型投喂版四个视频提示词文件，状态推进至提示词就绪（video_prompts_ready）。"
