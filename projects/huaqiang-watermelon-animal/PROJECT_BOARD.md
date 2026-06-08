project:
  name: 华强买瓜动物化改编（平头哥与恶霸犬）
  slug: huaqiang-watermelon-animal
  created_at: 2026-06-05
  updated_at: 2026-06-05

state:
  project_status: published
  next_stage: ""
  lifecycle_flag: completed
  blocker_note: ""

routing:
  current_stage: scene-publish-review
  allowed_next_stages: []
  last_completed_stage: scene-publish-review
  route_reason: "发布物文案（包括各平台分包、封面大字报设计）与逐镜时间码对齐字幕已全部输出并确认，项目正式进入发布后归档状态。"

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
  score: 92
  production_level: focus
  reference_type: hybrid_reference
  adaptation_level: partial_rewrite
  director_style_id: pixar_like
  director_style_version: v1.0
  style_family: 3d_animation
  style_profile_path: style_profiles/pixar_like
  performance_style: exaggerated_comedy
  target_total_duration_seconds: 110
  segment_duration_seconds: 10

confirmations:
  topic_confirmed:
    status: confirmed
    note: "用户在对话中已明确选择方案 A（平头哥蜜獾、恶霸犬、土拨鼠组合），完成方案确认。"
  reference_confirmed:
    status: confirmed
    note: "参考边界已划定，去害化西瓜汁爆炸设计已通过，走混合参考模式。"
  story_confirmed:
    status: confirmed
    note: "用户确认 11 Beat 结构，要求 100% 还原原片台词且每段时长严格控制在 10 秒，总时长为 110 秒（10秒分段）。高潮与结尾设定为恶霸犬震晕、土拨鼠嚎哭萨日朗。"
  asset_plan_confirmed:
    status: confirmed
    note: "三位动物角色及水果摊场景确定为完整新建（new_full），作弊电子秤确定为核心道具新建（new_core_prop），锁定卡文件已生成。"
  design_confirmed:
    status: confirmed
    note: "用户授权通过设计预览。已正式建立三位动物角色说明书、场景设定卡、道具设定卡（增加粉色小摩托与安全帽），空间站位图与全套 AI 生成提示词包已全部落盘。"
  script_confirmed:
    status: confirmed
    note: "用户在对话中确认了包含 110 秒总时长、11 段 10 秒分段的剧本及西瓜果汁爆破去害化高潮、土拨鼠嚎哭萨日朗结尾的剧本方案。"
  performance_confirmed:
    status: confirmed
    note: "已成功细化三位角色的眼神、重心、动作、次级动作、卡通眩晕和嚎哭萨日朗等物理表演规范，以及动作与情绪连续性链。"
  storyboard_plan_confirmed:
    status: confirmed
    note: "用户在对话中确认了包含 52 个镜头的分镜清单设计，已完成 Beat 骨架、VGU 规划与 5 包同源双版故事板生图 Prompt 的输出。"
  audio_plan_confirmed:
    status: confirmed
    note: "用户在对话中确认了包含西部孤狼牛仔配乐、对峙真空静音对位、滑音笛/金星八音盒/土拨鼠男高音歌剧嚎哭的非写实卡通喜剧拟音在内的声音方案细节。"
  video_prompt_plan_confirmed:
    status: confirmed
    note: "用户在对话中确认了包含 11 段 10 秒 VGU 对位时间码的视频生成提示词和模型适配、去害化西瓜爆破策略，7个提示词大包已正式写入 outputs。"
  publish_confirmed:
    status: pending
    note: ""

active_versions:
  source_intake:
  topic: v1.0
  reference: v1.0
  story: v1.0
  assets: v1.0
  design: v1.0
  script: v1.0
  performance: v1.0
  storyboard: v1.0
  audio: v1.0
  video_prompts: v1.0
  publish: v1.0

stage_index:
  source_intake:
    status: skipped
    active_version:
    summary: 非视频源直接解析，采用创意文本引入，跳过 intake 阶段。
    updated_at: 2026-06-05
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
    active_version: v1.0
    summary: 该选题打分 92，判定为 Go (focus)，建议走夸张搞笑路线（exaggerated_comedy）。角色确定为平头哥华强、恶霸犬摊主、土拨鼠小弟。
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/inputs/topic/topic_scored_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/inputs/topic/topic_scored_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-reference-decider 裁定原著与影视版本参考边界。
  reference:
    status: completed
    active_version: v1.0
    summary: "裁定以电视剧《征服》原著剧情骨架及核心台词为主要参考，辅以 3D 动画电影夸张物理与西瓜汁爆炸去害化为辅助参考。角色拟人化为平头哥、恶霸犬与土拨鼠。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/reference/reference_boundary_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/reference/reference_boundary_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-story-development 阶段建立故事骨架。
  story:
    status: completed
    active_version: v1.0
    summary: "完成 11 个 Story Beat 故事骨架（总长 110 秒，每段 10 秒），确立了平头哥（蜜獾）、恶霸犬和土拨鼠的剧情与对白对齐。设计了西瓜爆破去害化高潮，摊主被震晕，小弟抱着其哭嚎‘萨日朗’的经典反差结尾。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/story/story_development_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/story/story_development_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-asset-checker 阶段确定角色和道具的资产复用策略。
  assets:
    status: completed
    active_version: v1.0
    summary: "角色（平头哥、恶霸犬、土拨鼠）与水果摊场景进入完整新建（new_full），电子秤道具进入单独核心新建（new_core_prop），已产出资产锁定卡规定形状语言与物理约束。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/assets/asset_check_v1.md
      details:
        - projects/huaqiang-watermelon-animal/details/assets/asset_lock_v1.md
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/assets/asset_check_v1.md
        - projects/huaqiang-watermelon-animal/details/assets/asset_lock_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-design-builder 阶段开发动物角色、场景和电子秤道具的详细设定锁定卡与设计 Prompt。
  design:
    status: completed
    active_version: v1.0
    summary: "完成角色与场景详细设计，产出平头哥、恶霸犬、土拨鼠说明书正文；场景与电子秤、踏板车道具设定完成；输出全套 AI 图像生成提示词，空间连续性种子锁定完成。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/design/design_check_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/details/角色说明书_平头哥_v1.0.md
        - projects/huaqiang-watermelon-animal/details/角色说明书_恶霸犬_v1.0.md
        - projects/huaqiang-watermelon-animal/details/角色说明书_土拨鼠_v1.0.md
        - projects/huaqiang-watermelon-animal/details/design/scene_design_v1.0.md
        - projects/huaqiang-watermelon-animal/details/design/prop_design_v1.0.md
        - projects/huaqiang-watermelon-animal/details/design/space_continuity_seed_v1.0.md
      outputs:
        - projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/design_prompts/scene_prompts_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/design_prompts/prop_prompts_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/design_prompts/空间站位图提示词_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/design_prompts/master_scene_prop_reference_v1.0.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/design/design_check_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-script-adapter 阶段，整合正式的 11 节拍剧本对白与视听镜头暗示。
  script:
    status: completed
    active_version: v1.0
    summary: "完成 11 段 10 秒改编剧本正文编写，合并了去害化果汁大爆炸高潮与土拨鼠嚎哭萨日朗网络梗；输出标准化节拍对照表及视频生成单元切分规划。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/script_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/details/script/beat_table_v1.0.md
        - projects/huaqiang-watermelon-animal/details/script/video_generation_unit_plan_v1.0.md
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/script_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-performance-director 阶段，细化角色的微表情动作与卡通伤害受击反馈。
  performance:
    status: completed
    active_version: v1.0
    summary: "完成角色表演档案，细化 11 个节拍的逐人眼神/表情/身体/次级表演动作，设计了劈瓜高潮卡通物理变形与一愣卡壳细节，产出动作与情绪连续性链。"
    updated_at: 2026-06-05
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/performance_sheet_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/details/performance/action_continuity_chains_v1.0.md
        - projects/huaqiang-watermelon-animal/details/performance/emotion_continuity_chains_v1.0.md
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/performance_sheet_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-storyboard-director 阶段，依据表演设计 and 4-8 镜规划设计分镜头和故事板 Prompt 包。
  storyboard:
    status: completed
    active_version: v1.0
    summary: "完成 52 个镜头的分镜清单编写，建立了 Beat 骨架、VGU 技术规格和 r-a-e-s 四轨画面连续性控制系统；生成了 5 包同源双版（控制版/风格版）中文整板故事板生图 Prompt 并进行了质量自检。"
    updated_at: 2026-06-06
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/分镜清单_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/details/storyboard/beat_skeleton_v1.0.md
        - projects/huaqiang-watermelon-animal/details/storyboard/video_generation_units_v1.0.md
        - projects/huaqiang-watermelon-animal/details/storyboard/shot_continuity_plan_v1.0.md
      outputs:
        - projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack01_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack02_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack03_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack04_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack05_v1.0.md
      handoff:
      quality_check: projects/huaqiang-watermelon-animal/details/storyboard/storyboard_quality_check_v1.0.md
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/分镜清单_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-audio-director 阶段，开展声音音效与配乐主题设计。
  audio:
    status: completed
    active_version: v1.0
    summary: "完成动画电影级声音导演方案设计，细化了三角色配音特征、西部片对峙与卡通反差配乐主题、环境音床及静默点；针对劈瓜、掀秤等动作锁定了 12 处 Foley 拟音与卡通效果音，完成了 11 段 VGU 声音连续性规划与混音电平、侧链 Ducking 及声相定位计划。"
    updated_at: 2026-06-06
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/audio_plan_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/outputs/audio/audio_mix_plan_v1.0.md
      outputs:
        - projects/huaqiang-watermelon-animal/outputs/audio/music_prompt_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/audio/foley_prompt_v1.0.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/audio_plan_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: 进入 scene-video-prompt-builder 阶段，结合分镜与声音设计生成最终视频提示词。
  video_prompts:
    status: completed
    active_version: v1.0
    summary: "完成了 11 段视频生成单元的中英双语导演长版主提示词文件，以及 5 个对齐故事板的分包文件。提示词内嵌 Segment + Shot + Timecode 强结构，完全继承声音、表演连续性与去害化视觉奇观设定。"
    updated_at: 2026-06-06
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md
      details:
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md
      outputs:
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第一包_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第二包_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第三包_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第四包_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第五包_v1.0.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: "进入 scene-publish-review 阶段，进行发布标题、平台文案与字幕配音的整体规划。"
  publish:
    status: completed
    active_version: v1.0
    summary: "已生成拟人动物改编版买瓜短视频在抖音、小红书、B站及X平台的首轮发布标题、文案、封面创意与评论引导，且输出与11段时码完全对应的字幕与配音方案；明确了平头哥、恶霸犬、土拨鼠及粉色摩托、电子秤等资产向公共库沉淀的建议。"
    updated_at: 2026-06-06
    files:
      index:
      primary: projects/huaqiang-watermelon-animal/details/publish_details_v1.0.md
      details: []
      outputs:
        - projects/huaqiang-watermelon-animal/outputs/publish_copy/social_publish_v1.0.md
        - projects/huaqiang-watermelon-animal/outputs/publish_copy/voice_subtitle_v1.0.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - projects/huaqiang-watermelon-animal/details/publish_details_v1.0.md
      deep_read: []
      never_read_by_default: []
    next_action: "等待实际上线后的播放、互动与完播数据回流进行复盘审计。"

cross_stage_summary:
  premise: 经典名场面“华强买瓜”动物版改编，讲述平头哥蜜獾在大排档街头水果摊的对峙冲突。
  story_engine: 动物界经典胖瘦对峙组合，平头哥的“生死看淡”与恶霸犬的“虚张声势”产生强喜剧冲突。
  core_characters:
    - 平头哥 (蜜獾) - 华强
    - 恶霸犬 (美国恶霸/斗牛犬) - 摊主
    - 土拨鼠 - 小弟
  core_scene: 街角水果摊
  key_props:
    - 电子秤
    - 粉色踏板摩托车与安全帽
    - 西瓜
  visual_style: 高品质 3D 动画电影质感，夸张喜剧风格
  continuity_focus: 角色胖瘦体型剪影连续性，去害化西瓜汁爆裂物理效果。
  source_adaptation_mode: 部分改写 (partial_rewrite)，走夸张喜剧 (exaggerated_comedy) 路线。
  current_risks:
    - 动作需做无害化卡通化处理，西瓜汁爆炸必须做亮红色卡通液态模拟，防止呈现血液质感。

read_policy:
  default_read:
    - PROJECT_BOARD.md
    - stage_index.design.files.primary
  stage_specific_reads: {}
  deep_read_requires_reason: true

stage_patches:
  - patch_type: scene-topic-gate
    version: 1
    status: completed
    updated_at: 2026-06-05
    summary: 该选题打分 92，判定为 Go (focus)，建议走夸张搞笑路线（exaggerated_comedy），角色配置为平头哥、恶霸犬、土拨鼠.
    files_created:
      - path: projects/huaqiang-watermelon-animal/inputs/topic/topic_scored_v1.md
        purpose: 选题打分卡
        version: v1.0
    files_updated: []
    next_action: 进入 scene-reference-decider 阶段进行参考判定。
  - patch_type: scene-reference-decider
    version: 1
    status: completed
    updated_at: 2026-06-05
    summary: 裁定以原版《征服》剧情骨架及核心台词为主要参考，辅以 3D 动画电影夸张物理与无害化西瓜汁大爆炸为辅助参考。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/reference/reference_boundary_v1.md
        purpose: 参考边界裁定卡
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 参考决策索引更新
        version: v1.0
    next_action: 进入 scene-story-development 阶段开发轻量故事骨架。
  - patch_type: scene-story-development
    version: 1
    status: completed
    updated_at: 2026-06-05
    summary: 重构故事骨架以 100% 还原对峙语速，共 11 个 beats，总时长为 110 秒（10秒分段），融合了恶霸犬震晕、土拨鼠“萨日朗”哭丧式嚎叫的喜剧结尾。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/story/story_development_v1.md
        purpose: 故事骨架卡
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 故事阶段索引更新
        version: v1.0
    next_action: 进入 scene-asset-checker 阶段进行资产复用检查。
  - patch_type: scene-asset-checker
    version: 8
    status: completed
    updated_at: 2026-06-05
    summary: 角色（平头哥、恶霸犬、土拨鼠）与水果摊场景资产确定为完整新建（new_full），作弊电子秤确定为核心道具新建（new_core_prop），已生成锁定卡锁定开发规范。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/assets/asset_check_v1.md
        purpose: 资产复用判断卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/assets/asset_lock_v1.md
        purpose: 资产锁定卡
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 资产阶段索引更新
        version: v1.0
    next_action: 进入 scene-design-builder 阶段开发动物角色、场景和电子秤道具的详细设定。
  - patch_type: scene-design-builder
    version: 8
    status: completed
    updated_at: 2026-06-05
    summary: 角色说明书、场景设定卡、核心道具设定卡开发完成，并加入了粉色小踏板车与安全帽的设计；生成提示词包（包含角色、场景、电子秤与摩托车道具、站位图、总参考图等 5 份 Prompt）已全部落盘。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/design/design_check_v1.0.md
        purpose: 设计决策汇总细节卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/角色说明书_平头哥_v1.0.md
        purpose: 平头哥说明书正文
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/角色说明书_恶霸犬_v1.0.md
        purpose: 恶霸犬说明书正文
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/角色说明书_土拨鼠_v1.0.md
        purpose: 土拨鼠说明书正文
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/design/scene_design_v1.0.md
        purpose: 水果摊场景设计卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/design/prop_design_v1.0.md
        purpose: 电子秤与摩托车道具设计卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/design/space_continuity_seed_v1.0.md
        purpose: 空间连续性种子
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
        purpose: 角色生图 Prompt 包
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/scene_prompts_v1.0.md
        purpose: 场景生图 Prompt
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/prop_prompts_v1.0.md
        purpose: 道具生图 Prompt 集合
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/空间站位图提示词_v1.0.md
        purpose: 空间站位生图 Prompt
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/master_scene_prop_reference_v1.0.md
        purpose: 总参考生图 Prompt
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 设计阶段索引更新
        version: v1.0
    next_action: 进入 scene-script-adapter 阶段整合 11 节拍完整剧本。
  - patch_type: scene-script-adapter
    version: 1
    status: completed
    updated_at: 2026-06-05
    summary: 完成 11 段 10 秒改编剧本正文编写，合并了去害化西瓜大核爆高潮与小弟嚎哭萨日朗网络梗；输出标准化节拍表与视频生成单元规划卡。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/script_v1.0.md
        purpose: 改编剧本主细节卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/script/beat_table_v1.0.md
        purpose: 剧本标准化节拍表
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/script/video_generation_unit_plan_v1.0.md
        purpose: 视频生成单元规划卡
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 剧本阶段状态更新与索引挂载
        version: v1.0
    next_action: 进入 scene-performance-director 阶段，开展 3D 角色动作与表演设计。
  - patch_type: scene-performance-director
    version: 1
    status: completed
    updated_at: 2026-06-05
    summary: 完成角色表演设计，输出 11 个节拍的角色微表情、眼神、肢体动作与卡通眩晕物理反馈；同步落盘动作与情绪连续性链，规范镜头表现力。
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/performance_sheet_v1.0.md
        purpose: 角色表演设计主细节表
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/performance/action_continuity_chains_v1.0.md
        purpose: 动作连续性链细节表
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/performance/emotion_continuity_chains_v1.0.md
        purpose: 情绪连续性链细节表
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 表演阶段状态更新与索引挂载
        version: v1.0
    next_action: 进入 scene-storyboard-director 阶段，开展故事板与生图提示词设计。
  - patch_type: scene-storyboard-director
    version: 1
    status: completed
    updated_at: 2026-06-06
    summary: "完成 52 个镜头的分镜清单设计与 r-a-e-s 四线连续性锁定，产出 5 包同源双版中文整板故事板生图 Prompt 包。"
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/分镜清单_v1.0.md
        purpose: 分镜设计清单
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/storyboard/beat_skeleton_v1.0.md
        purpose: 节拍骨架控制卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/storyboard/video_generation_units_v1.0.md
        purpose: 视频单元控制卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/storyboard/shot_continuity_plan_v1.0.md
        purpose: 四轨连续性控制卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/details/storyboard/storyboard_quality_check_v1.0.md
        purpose: 故事板自检验收卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack01_v1.0.md
        purpose: 故事板 Prompt 分包 1 (VGU_01-03)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack02_v1.0.md
        purpose: 故事板 Prompt 分包 2 (VGU_04-05)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack03_v1.0.md
        purpose: 故事板 Prompt 分包 3 (VGU_06-07)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack04_v1.0.md
        purpose: 故事板 Prompt 分包 4 (VGU_08-09)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/storyboard_prompts/storyboard_prompts_pack05_v1.0.md
        purpose: 故事板 Prompt 分包 5 (VGU_10-11)
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 分镜阶段状态更新与索引挂载
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
        purpose: 角色安全帽猫耳细节补充
        version: v1.1
      - path: projects/huaqiang-watermelon-animal/outputs/design_prompts/prop_prompts_v1.0.md
        purpose: 安全帽猫耳细节补充及新增爆瓜 Prompt
        version: v1.1
    next_action: 进入 scene-audio-director 阶段，开展声音音效与配乐主题设计。
  - patch_type: scene-audio-director
    version: 1
    status: completed
    updated_at: 2026-06-06
    summary: "完成动画电影级声音导演方案，细化配音、配乐、Foley拟音与混音规划，产出独立音频提示词与混音细节卡。"
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/audio_plan_v1.0.md
        purpose: 声音导演主方案卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/audio/music_prompt_v1.0.md
        purpose: 独立配乐提示词卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/audio/foley_prompt_v1.0.md
        purpose: 独立拟音音效提示词卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/audio/audio_mix_plan_v1.0.md
        purpose: 混音与声相声道规划卡
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 声音阶段状态更新与索引挂载
        version: v1.0
    next_action: 进入 scene-video-prompt-builder 阶段，设计最终视频生成提示词。
  - patch_type: scene-video-prompt-builder
    version: 1
    status: completed
    updated_at: 2026-06-06
    summary: "完成了 11 段视频生成分段的中英双语主控提示词及 5 包故事板对位视频提示词，内嵌强结构控制，并在 outputs 正式落盘。"
    files_created:
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md
        purpose: 视频生成提示词中文主控大包
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md
        purpose: 视频生成提示词英文主控大包
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第一包_v1.0.md
        purpose: 第一包提示词 (Segment 01-03)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第二包_v1.0.md
        purpose: 第二包提示词 (Segment 04-05)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第三包_v1.0.md
        purpose: 第三包提示词 (Segment 06-07)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第四包_v1.0.md
        purpose: 第四包提示词 (Segment 08-09)
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/video_prompts/视频提示词_第五包_v1.0.md
        purpose: 第五包提示词 (Segment 10-11)
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 视频提示词构建阶段状态更新与索引挂载
        version: v1.0
    next_action: 进入 scene-publish-review 阶段开展发布后与文案包装审计工作。
  - patch_type: scene-publish-review
    version: 1
    status: completed
    updated_at: 2026-06-06
    summary: "已从零完成动物化改编版买瓜的抖音、小红书、B站及X平台分包发布文案与封面创意设计，对齐输出 110s 全剧字幕与配音指导，完成资产沉淀判定并落盘交付。"
    files_created:
      - path: projects/huaqiang-watermelon-animal/details/publish_details_v1.0.md
        purpose: 发布物与复盘细节卡
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/publish_copy/social_publish_v1.0.md
        purpose: 平台发布文案及评论区引导
        version: v1.0
      - path: projects/huaqiang-watermelon-animal/outputs/publish_copy/voice_subtitle_v1.0.md
        purpose: 对齐时码字幕与配音指导
        version: v1.0
    files_updated:
      - path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
        purpose: 项目黑板状态与发布阶段更新
        version: v1.0
    next_action: 等待实际上线后的数据回流复盘。
