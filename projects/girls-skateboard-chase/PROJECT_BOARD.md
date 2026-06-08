project:
  name: girls-skateboard-chase
  slug: girls-skateboard-chase
  created_at: "2026-06-04T15:56:38+08:00"
  updated_at: "2026-06-04T16:05:50+08:00"

state:
  project_status: reviewed
  next_stage: completed
  lifecycle_flag: active
  blocker_note:

routing:
  current_stage: completed
  allowed_next_stages: []
  last_completed_stage: scene-publish-review
  route_reason: 已完成微信视频号与YouTube等全平台宣发文案、双语配音字幕设计，以及复盘数据追踪与角色/场景/道具资产沉淀建议，全流程圆满归档。

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
  score: 87
  production_level: focus
  reference_type: original_work
  adaptation_level:
  performance_style:
  target_total_duration_seconds: 60
  segment_duration_seconds: 10

confirmations:
  topic_confirmed:
    status: confirmed
    note: "已确认滑板少女山道极限追逐与特技展现的原创动作选题，选题评分87分，列入重点制作池。"
  reference_confirmed:
    status: confirmed
    note: "已确认滑板速降物理常识与青春动漫风镜头边界，锁定双人交替领先的友好竞技与安全防护规范。"
  story_confirmed:
    status: confirmed
    note: "已确认包含起跑、漂移、越障、气流牵引、双漂和撞线等6个动作节拍的速降竞技故事骨架。"
  asset_plan_confirmed:
    status: confirmed
    note: "已确认女孩A、女孩B以及山道场景采用new_full新建开发路径，滑板采用new_core_prop道具开发，锁定安全全护具穿戴与写实物理约束。"
  design_confirmed:
    status: confirmed
    note: "已确认活力运动半盔露出发型面部、完美运动健美体态，以及包含丰富竞速偶发性互动的视觉设计方案。"
  script_confirmed:
    status: confirmed
    note: "已确认60秒双滑手山道极限追逐剧本，包含蹬地、Slide漂移、越障碰板尾、气流牵引、双漂火花及冲线碰拳6个动作节拍，并锁定了VGU生成单元参数与动态残影策略。"
  performance_confirmed:
    status: confirmed
    note: "已确认女孩A(活力撞色)与女孩B(科技撞色)的表演性格、眼神和标志性动作，锁定了6个节拍的微表情设计与动作/情绪连续性链条。"
  storyboard_plan_confirmed:
    status: confirmed
    note: "已确认包含20个高频切换镜头的动画级分镜规划(v2.0)，支持动作/情绪/空间四线连续性，并输出3个中文分包合集提示词（每包少于12格以确保大图合集生图精度）。"
  audio_plan_confirmed:
    status: confirmed
    note: "已确认由女孩A(热情高亢)与女孩B(冷静从容)台词配音、20个镜头的精细Foley拟音、160 BPM滑板朋克配乐主题(含空中撞板尾静音和双漂火花高潮压限)以及安全物理非写实声音策略组成的声音导演方案。"
  video_prompt_plan_confirmed:
    status: confirmed
    note: "已确认中英文双语导演长版视频生成提示词，各10秒分段与镜头级控制链写入完毕，物理、声音与镜头连续性符合规范。"
  publish_confirmed:
    status: confirmed
    note: "已确认多平台宣发文案（含中英双语字幕、视频号及 YouTube 特色定制）与发布后复盘资产库沉淀建议，项目全流程归档完成。"

active_versions:
  source_intake:
  topic: v1
  reference: v1
  story: v1
  assets: v1
  design: v2
  script: v1
  performance: v1
  storyboard: v2
  audio: v1
  video_prompts: v1
  publish: v1

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
    summary: "已完成滑板少女山道追逐项目选题评估，评分87分，属于重点制作池（focus），决策为进行（go）。"
    updated_at: "2026-06-04T15:56:38+08:00"
    files:
      index: "projects/girls-skateboard-chase/inputs/topic_gate_handoff_v1.md"
      primary: "projects/girls-skateboard-chase/inputs/topic_gate_handoff_v1.md"
      details: []
      outputs: []
      handoff: "projects/girls-skateboard-chase/inputs/topic_gate_handoff_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/inputs/topic_gate_handoff_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-reference-decider 阶段进行参考边界裁定。"
  reference:
    status: completed
    active_version: v1
    summary: "已裁定本项目为原创滑板运动速降路线，确立了物理真实度、安全护具红线 and 高速镜头语言规范。"
    updated_at: "2026-06-04T15:56:38+08:00"
    files:
      index: "projects/girls-skateboard-chase/inputs/reference_boundary_v1.md"
      primary: "projects/girls-skateboard-chase/inputs/reference_boundary_v1.md"
      details: []
      outputs: []
      handoff: "projects/girls-skateboard-chase/inputs/reference_boundary_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/inputs/reference_boundary_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-story-development 阶段开发 6 段式（共60秒）故事骨架。"
  story:
    status: completed
    active_version: v1
    summary: "已完成6段式滑板速降故事骨架开发，设计了双人速度/特技拉锯拉扯，并确定了弯道并漂视觉高潮。"
    updated_at: "2026-06-04T15:59:41+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/story/story_development_v1.md"
      primary: "projects/girls-skateboard-chase/details/story/story_development_v1.md"
      details: []
      outputs: []
      handoff: "projects/girls-skateboard-chase/details/story/story_development_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/story/story_development_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-asset-checker 阶段进行角色、场景和道具的资产复用与设计检查。"
  assets:
    status: completed
    active_version: v1
    summary: "已锁定两名滑板少女的外观防护设计、山道的Zone A-D物理划分以及滑板的橙/蓝涂鸦设定，并落盘 asset_lock_v1.md。"
    updated_at: "2026-06-04T15:59:41+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/assets/asset_lock_v1.md"
      primary: "projects/girls-skateboard-chase/details/assets/asset_check_v1.md"
      details:
        - "projects/girls-skateboard-chase/details/assets/asset_lock_v1.md"
      outputs: []
      handoff: "projects/girls-skateboard-chase/details/assets/asset_lock_v1.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/assets/asset_lock_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "推进到 scene-design-builder 阶段进行角色、场景与核心道具原画设定及Prompt编写。"
  design:
    status: completed
    active_version: v2
    summary: "已根据更新的 scene-design-builder 技能重新设计并锁定角色形象与专属道具绑定。女孩 A 配色更新为象牙白/炭黑/亮橘，女孩 B 采用鼠尾草绿/深蓝/粉白，规避单一色调制服感。输出两份单角色说明书，包含头盔外露露出面部发型、夏装露脐及百褶裙等展现完美运动S型身材的视觉锁卡，并在 details/character_design_v1.0.md 中写入完整输出协议 YAML 块，并生成支持 Midjourney 和 Flux 平台的 Prompts 最终文件。"
    updated_at: "2026-06-04T16:30:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/character_design_v1.0.md"
      primary: "projects/girls-skateboard-chase/details/character_design_v1.0.md"
      details:
        - "projects/girls-skateboard-chase/details/character_design_v1.0.md"
        - "projects/girls-skateboard-chase/details/scene_design_v1.0.md"
        - "projects/girls-skateboard-chase/details/prop_design_v1.0.md"
        - "projects/girls-skateboard-chase/details/design/space_continuity_seed_v1.md"
        - "projects/girls-skateboard-chase/details/角色说明书_女孩A_v1.0.md"
        - "projects/girls-skateboard-chase/details/角色说明书_女孩B_v1.0.md"
      outputs:
        - "projects/girls-skateboard-chase/outputs/design_prompts/角色说明书图片提示词_v1.0.md"
        - "projects/girls-skateboard-chase/outputs/design_prompts/scene_prompts_v1.0.md"
        - "projects/girls-skateboard-chase/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
      handoff: "projects/girls-skateboard-chase/details/character_design_v1.0.md"
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/character_design_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-script-adapter 阶段，撰写 60 秒含丰富动作特技与偶发性互动（击掌、贴肩、碰板尾）的正式剧本及生成单元规划。"
  script:
    status: completed
    active_version: v1
    summary: "已完成滑板少女极限速降追逐战正式剧本（6段共60秒），融入了拼色街头潮服、专属道具绑定、空中碰板尾/肩膀蹭擦等细节，规划了6段 10s 的视频生成单元（VGU），确立了运动受身防护防线。"
    updated_at: "2026-06-04T16:35:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/script_v1.0.md"
      primary: "projects/girls-skateboard-chase/details/script_v1.0.md"
      details:
        - "projects/girls-skateboard-chase/details/script_v1.0.md"
        - "projects/girls-skateboard-chase/details/script/beat_table_v1.md"
        - "projects/girls-skateboard-chase/details/script/video_generation_unit_plan_v1.md"
      outputs: []
      handoff: "projects/girls-skateboard-chase/details/script_v1.0.md"
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/script_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-performance-director 阶段，为6个节拍的眼神对焦、微表情（挑眉、Wink鬼脸）以及高难度动作做表演导演规划。"
  performance:
    status: completed
    active_version: v1
    summary: "已完成滑板少女极限速降追逐战的表演导演设计（6段共60秒），规划了女孩 A（起跑大笑/吃瘪/蹭肩坏笑）与女孩 B（抿嘴角/ Wink 吐舌鬼脸）的动作性格与标志性姿态，输出了动作与情绪连续性链文件。"
    updated_at: "2026-06-04T16:50:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/performance_sheet_v1.md"
      primary: "projects/girls-skateboard-chase/details/performance_sheet_v1.md"
      details:
        - "projects/girls-skateboard-chase/details/performance_sheet_v1.md"
        - "projects/girls-skateboard-chase/details/performance/action_continuity_chains_v1.md"
        - "projects/girls-skateboard-chase/details/performance/emotion_continuity_chains_v1.md"
      outputs: []
      handoff: "projects/girls-skateboard-chase/details/performance_sheet_v1.md"
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/performance_sheet_v1.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-storyboard-director 阶段，根据表演和动作连续性设计，撰写镜头级调度与分镜提示词。"
  storyboard:
    status: completed
    active_version: v2
    summary: "已完成20个镜头的分镜清单设计(v2.0)，且基于大于12个镜头分拆规则，将故事板提示词拆分为三个交付包（每包均少于12格以确保生图细节不失真），包内整合中文控制轨道。"
    updated_at: "2026-06-04T19:33:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/分镜清单_v2.0.md"
      primary: "projects/girls-skateboard-chase/details/分镜清单_v2.0.md"
      details:
        - "projects/girls-skateboard-chase/details/storyboard/storyboard_components_v2.0.md"
      outputs:
        - "projects/girls-skateboard-chase/outputs/storyboard_prompts/故事板提示词_pack_01_v2.0.md"
        - "projects/girls-skateboard-chase/outputs/storyboard_prompts/故事板提示词_pack_02_v2.0.md"
        - "projects/girls-skateboard-chase/outputs/storyboard_prompts/故事板提示词_pack_03_v2.0.md"
      handoff: "projects/girls-skateboard-chase/details/分镜清单_v2.0.md"
      quality_check:
        - "projects/girls-skateboard-chase/details/storyboard/storyboard_components_v2.0.md"
      methodology_config:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/分镜清单_v2.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-audio-director 阶段，根据分镜清单制定配音方向、拟音、环境音与配乐方案。"
  audio:
    status: completed
    active_version: v1
    summary: "已完成配音导演、20个镜头的精细拟音、高山及终点环境声床设计，制定了160 BPM滑板朋克配乐与静默/压限计划，输出独立音乐、拟音及混音三个文件。"
    updated_at: "2026-06-04T17:00:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/details/audio_plan_v1.0.md"
      primary: "projects/girls-skateboard-chase/details/audio_plan_v1.0.md"
      details:
        - "projects/girls-skateboard-chase/details/audio_plan_v1.0.md"
      outputs:
        - "projects/girls-skateboard-chase/outputs/audio/music_prompts_v1.0.md"
        - "projects/girls-skateboard-chase/outputs/audio/foley_prompts_v1.0.md"
        - "projects/girls-skateboard-chase/outputs/audio/mix_plan_v1.0.md"
      handoff: "projects/girls-skateboard-chase/details/audio_plan_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/details/audio_plan_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-video-prompt-builder 阶段，结合分镜与声音方案生成最终的视频生成提示词。"
  video_prompts:
    status: completed
    active_version: v1
    summary: "已生成并校验中英文双语导演长版视频生成提示词交付包，采用 Segment+Shot+Timecode 强结构，完全继承 VGU 及四线连续性控制链。"
    updated_at: "2026-06-04T19:42:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      primary: "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      details:
        - "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md"
      outputs:
        - "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
        - "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md"
      handoff: "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-publish-review 阶段，进行发布前审核与文案包装策划。"
  publish:
    status: completed
    active_version: v1
    summary: "多平台发布文案、配音字幕与复盘报告已全数生成，微信视频号与 YouTube 平台深度定制，两名角色、高山山道及涂鸦滑板已作为资产沉淀回库。"
    updated_at: "2026-06-04T20:04:00+08:00"
    files:
      index: "projects/girls-skateboard-chase/outputs/publish_copy/发布文案_v1.0.md"
      primary: "projects/girls-skateboard-chase/outputs/publish_copy/发布文案_v1.0.md"
      details:
        - "projects/girls-skateboard-chase/details/review_v1.0.md"
      outputs:
        - "projects/girls-skateboard-chase/outputs/publish_copy/发布文案_v1.0.md"
      handoff: "projects/girls-skateboard-chase/details/review_v1.0.md"
      quality_check:
    read_policy:
      default_read:
        - "projects/girls-skateboard-chase/outputs/publish_copy/发布文案_v1.0.md"
      deep_read: []
      never_read_by_default: []
    next_action: "项目全生命周期已完成，资产成功归档。"

cross_stage_summary:
  premise: "二位18岁中国青春活力女孩在山道上滑滑板高速追逐超越，在各异小道（弯道、直道、崎岖路、障碍物）展现炫酷特技动作。"
  story_engine: "双人交替领先的极限运动竞技 + 默契互动与动作反差"
  core_characters:
    - "女孩A (开朗活力型)"
    - "女孩B (沉稳技巧型)"
  core_scene: "蜿蜒山道（包含S弯、直道、路障、终点草坪）"
  key_props:
    - "炫彩滑板"
    - "安全头盔与护具"
  visual_style: "3D 迪士尼/皮克斯动画长片风格 (3D Feature Animation Style)"
  continuity_focus: "纵深下坡运动方向连续性 (Axis Line) 与角色头盔、板轮涂鸦的一致性"
  source_adaptation_mode: "rewrite_adaptation"
  current_risks:
    - "滑板动作姿态的物理真实度要求高"
    - "高速运动下机位跟随和空间连续性保持"

read_policy:
  default_read:
    - PROJECT_BOARD.md
  stage_specific_reads: {}
  deep_read_requires_reason: true

stage_patches:
  - patch_type: scene-topic-gate
    version: 1
    status: completed
    updated_at: "2026-06-04T15:56:38+08:00"
    summary: "已完成滑板少女山道追逐项目选题评估，七维评分87分，属于重点制作池（focus），决策为进行（go）。"
  - patch_type: scene-reference-decider
    version: 1
    status: completed
    updated_at: "2026-06-04T15:56:38+08:00"
    summary: "已完成参考边界判定，确立原创运动路线并落盘 inputs/reference_boundary_v1.md，项目状态推进至参考裁定完成（reference_decided）。"
  - patch_type: scene-story-development
    version: 1
    status: completed
    updated_at: "2026-06-04T15:59:41+08:00"
    summary: "已完成滑板少女山道追逐项目的故事骨架开发，总时长60秒，设计了起跑、漂移、飞跃、尾随、并漂、撞线六个动作节拍，并落盘 details/story/story_development_v1.md，项目状态推进至故事骨架开发完成（story_developed）。"
  - patch_type: scene-asset-checker
    version: 1
    status: completed
    updated_at: "2026-06-04T15:59:41+08:00"
    summary: "已完成滑板少女山道追逐项目的资产检查，决定双人角色、山道场景以及滑板道具采用新建路径，并落盘 details/assets/asset_lock_v1.md，项目状态推进至资产检查完成（assets_checked）。"
  - patch_type: scene-design-builder
    version: 2
    status: completed
    updated_at: "2026-06-04T16:30:00+08:00"
    summary: "已根据更新的 scene-design-builder 技能重新设计并锁定角色形象与专属道具绑定。女孩 A 配色更新为象牙白/炭黑/亮橘，女孩 B 采用鼠尾草绿/深蓝/粉白，规避单一色调制服感。输出两份单角色说明书，包含头盔外露露出面部发型、夏装露脐及百褶裙等展现完美运动S型身材的视觉锁卡，并在 details/character_design_v1.0.md 中补齐完整输出协议 YAML 块，并生成支持 Midjourney 和 Flux 平台的 Prompts 最终文件。"
  - patch_type: scene-script-adapter
    version: 1
    status: completed
    updated_at: "2026-06-04T16:35:00+08:00"
    summary: "已完成 60 秒原创运动题材正式剧本编写，整合了蹬地起手、S弯内弯超车、空中Ollie/Kickflip碰板尾、颠簸路肩气流牵引与碰肩、双滑手同步擦地漂移金色火花特效，以及终点草地滚翻受身刹车碰拳收尾。输出剧本及标准化节拍表与视频单元VGU生成规划，项目状态推进至剧本就绪（script_ready）。"
  - patch_type: scene-performance-director
    version: 1
    status: completed
    updated_at: "2026-06-04T16:50:00+08:00"
    summary: "已完成滑板少女山道极限速降表演导演规范设计，锁定了女孩A（热情外放，大笑与吃瘪反差）与女孩B（冷静游刃，Wink鬼脸反差）的眼神、重心和标志性手势；细化了6个节拍的微表情、动作特写与次级动作；输出了动作与情绪连续性链条，项目状态推进至表演就绪（performance_ready）。"
  - patch_type: scene-storyboard-director
    version: 1
    status: completed
    updated_at: "2026-06-04T16:55:00+08:00"
    summary: "已根据前序剧本与动作/情绪连续性设计，制定包含20个高频切换镜头的动画级分镜规划，落盘镜头清单与架构组件，并输出三包双版本故事板生图提示词，项目状态推进至分镜就绪（storyboard_ready）。"
  - patch_type: scene-audio-director
    version: 1
    status: completed
    updated_at: "2026-06-04T17:00:00+08:00"
    summary: "已完成滑板少女山道追逐战的声音导演设计，确立了双人配音反差、20个镜头拟音及非写实卡通音效，制定了160 BPM滑板朋克配乐（含空中静放与并漂高潮）和侧链混音方案，项目状态推进至声音就绪（audio_ready）。"
  - patch_type: scene-storyboard-director
    version: 2
    status: completed
    updated_at: "2026-06-04T19:33:00+08:00"
    summary: "由于故事板重构需求与单包大于12个分镜分拆原则，重新生成了包含 20 个镜头、时长 60 秒的动画电影级分镜清单(v2.0)，以及包含 VGU 与时空连续性控制的故事板组件(v2.0)，并输出 3 包完全合规的中文故事板生图提示词（每包少于 12 格）。项目重推回至声音就绪（audio_ready）状态。"
  - patch_type: scene-video-prompt-builder
    version: 1
    status: completed
    updated_at: "2026-06-04T19:42:00+08:00"
    summary: "已完成滑板少女山道追逐项目的视频生成提示词包开发，采用双语导演长版（v1.0）及 Segment + Shot + Timecode 强结构，全方位落实时空/动作/情绪/声音四线连续性和动画表现力扩展要求，项目状态推进至提示词就绪（video_prompts_ready）。"
  - patch_type: scene-publish-review
    version: 1
    status: completed
    updated_at: "2026-06-04T20:04:00+08:00"
    summary: "已完成多平台发布文案包定制（含视频号与YouTube平台包装）与双语字幕脚本开发，制定了模拟复盘与角色/场景/道具资产沉淀建议，项目全流程圆满归档完成。"
