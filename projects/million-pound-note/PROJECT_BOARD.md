---
project_name: million-pound-note
project_status: video_prompts_ready
next_stage: scene-publish-review
lifecycle_flag: active
blocker_note: null
score: 88
production_level: focus
reference_type: hybrid_reference

script_strategy:
  status: selected
  mode: rewrite_adaptation
  selection_note: "用户明确确认本次重制采用改编模式（rewrite_adaptation），并指定特定改编约束：物理场地（1903年古典英式餐厅）保持完全一致，仅对人物角色与支付道具媒介进行改编。"
  selected_at: "2026-06-03T11:26:49+08:00"

creative_direction_context:
  script_mode: rewrite_adaptation
  selected_adaptation:
    status: selected
    selected_idea_id: "idea_selected_sanzang"
    selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
    selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
  downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具。"

source_intake:
  type: video_clip
  status: analyzed
  source_path_or_url: "user_provided_text"
  source_summary: "《百万英镑》经典餐厅结账片段的结构化解析，包括28个镜头的详细分镜、对白、摄影、声音及空间关系。"
  source_duration_seconds: 386
  source_language_hint: "zh-CN"
  active_version: "v1"
  files:
    index: "projects/million-pound-note/inputs/source_intake/source_intake_index_v1.md"
    analysis: "projects/million-pound-note/inputs/source_intake/source_video_analysis_v1.md"
    timeline: "projects/million-pound-note/inputs/source_intake/source_video_timeline_v1.md"
    dialogue: "projects/million-pound-note/inputs/source_intake/source_video_dialogue_v1.md"
    audio: "projects/million-pound-note/inputs/source_intake/source_video_audio_v1.md"
    camera: "projects/million-pound-note/inputs/source_intake/source_video_camera_v1.md"
    priority_map: "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
    adaptation_ideas: "projects/million-pound-note/inputs/source_intake/adaptation_ideas_v1.md"
    topic_gate_handoff: "projects/million-pound-note/inputs/source_intake/topic_gate_handoff_v1.md"

  topic_gate_handoff_summary:
    candidate_topic: "基于《百万英镑》经典餐厅结账片段重制，进行角色设定跨界改编（场地空间完全保留）"
    core_must_keep: "态度180度反转冲突，古典英式餐厅物理空间，狼吞虎咽吃相与店家傲慢对峙，亮出钞票瞬间喜剧视听骤停"
    highlights_to_consider: "挂钟秒针滴答声，下巴脱臼夸张表情，面包擦盘子动作细节，对称仪式感双排鞠躬送客"
    optional_to_compress: "大门外张望和进门慢步，账台前讨论支票的繁琐对白"
    safe_replacement_notes: "主角身份可改编为赛博人、修真者等，支票改为高额芯片、令牌等，台词风格可做跨界幽默改编"
    adaptation_ideas_summary: "包含5个‘场地不变、改编角色’的定制构想，推荐 Idea 01（赛博义体人）和 Idea 02（落魄修仙者）"
    risks_or_limits: "维多利亚茶室空间与异质角色的融合度，三维动画角色交互与卡通物理表现要求高"

  adaptation_ideas_summary:
    idea_count: 5
    recommended_ideas: "Idea 01 (赛博义体人), Idea 02 (落魄修仙者)"
    user_selection_required: true

  adaptation_selection:
    status: selected
    selected_idea_id: "idea_selected_sanzang"
    selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
    selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"

  assetization:
    candidate_for_assetization: true
    reason: "极具复用价值的经典态度反转喜剧母题，包含丰富的视听技巧与镜头语言"
    suggested_asset_slug: "million-pound-note"
    asset_status: created
    user_confirmation_required: true
    user_confirmation_status: confirmed
    confirmation_note: "用户确认将原片视频解析数据（《百万英镑》餐厅结账片段）提升为全局复用资产。"
    asset_path: "assets/source-materials/million-pound-note/"

  source_asset_ref:
    asset_id: "million-pound-note"
    asset_path: "assets/source-materials/million-pound-note/"
    reuse_mode: adapted_reference
    standard_files:
      source_card: "assets/source-materials/million-pound-note/source-card.md"
      structure_analysis: "assets/source-materials/million-pound-note/structure-analysis.md"
      adaptation_angles: "assets/source-materials/million-pound-note/adaptation-angles.md"
      safety_boundaries: "assets/source-materials/million-pound-note/safety-boundaries.md"
      reuse_history: "assets/source-materials/million-pound-note/reuse-history.md"

  read_policy:
    default_read: "topic_gate_handoff + priority_map_summary + adaptation_ideas_summary"
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true

expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation
  mode: animated_feature_comedy
  assets:
    effect_library: assets/animation-stylization/effect-library.md
    contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  animation_stylization:
    level: expressive
    preset: animated_feature_expressive
    effect_density: medium
    density_rule: hero_moment_and_high_risk_translation_only
  injury_tone_policy:
    visible_injury_level: minor_cartoon
    allow_minor_cartoon_injury: true
    allow_small_blood: selective
    allow_nosebleed_gag: true
    allow_bumps_bruises_dust: true
    allow_soot_face: true
    allow_torn_clothes: selective
    forbid_large_blood_loss: true
    forbid_graphic_wounds: true
    forbid_gore: true
    forbid_realistic_weapon_wound: true
    forbid_realistic_bullet_wound: true
    forbid_prolonged_pain_focus: true
    restore_character_integrity_after_gag: true
  contrast_comedy:
    enabled: selective
    contrast_density: low_to_medium
    max_core_contrasts_per_project: 2
    max_hero_contrast_per_segment: 1

storyboard_director_v5:
  enabled: true
  confirmation_status: confirmed
  assets:
    shot_language_library: assets/cinematic-language/shot-language-library.md
    animation_film_patterns: assets/cinematic-language/animation-film-shot-patterns.md
    animation_comedy_action_patterns: assets/cinematic-language/animation-comedy-action-patterns.md
  default_policy:
    require_storyboard_content_breakdown: true
    require_cinematic_language_plan: true
    require_visual_motivation: true
    avoid_template_stack: true
    require_pattern_reason: true
    do_not_reference_specific_films_in_runtime_output: true

story_development_summary: "以未受封落魄唐朝和尚在1903年英式高档餐厅吃素面，与势力见钱眼开的金池长老及其弟子对决为主轴，基于6个Story Beat构建中西跨界反差喜剧与黄金通关文牒反转的故事结构。"
target_total_duration_seconds: 60
ending_payoff: "金池长老率领全体店小二对称两列排开，90度深鞠躬恭送唐朝和尚离店，通关金牒恭敬免单奉还。"

hero_moment_candidates:
  - hero_id: "H01"
    title: "展平通关文牒，金光亮起，视听瞬间骤停"
    related_beat: "B04"
    reason: "大唐黄金通关文牒金光照亮昏暗餐厅，挂钟秒针停摆，交响乐在一瞬间死寂，戏剧与视听张力拉满。"
hero_moments: []
story_beats:
  - beat_id: "B01"
    title: "落魄僧人入店"
    function: "setup"
  - beat_id: "B02"
    title: "筷子吃面与傲慢窥视"
    function: "setup"
  - beat_id: "B03"
    title: "按表逼债与催账"
    function: "crisis"
  - beat_id: "B04"
    title: "展平金牒，视听骤停"
    function: "climax"
  - beat_id: "B05"
    title: "魂飞魄散，核对真伪"
    function: "reversal"
  - beat_id: "B06"
    title: "对称大鞠躬，免单送客"
    function: "payoff"
character_functions:
  - character_name: "唐朝和尚"
    story_function: "扮猪吃老虎（隐秘大佬）。表面落魄凄惨，实则手握唐皇御弟权柄与通关重金，神态平静慈悲。"
  - character_name: "金池长老"
    story_function: "势利眼餐厅老板。崇拜虚荣与权力，中西合璧奢华装束，负责极度傲慢到极度谄媚的大起大落笑点。"
  - character_name: "小二（金池弟子）"
    story_function: "傲慢的侍应生。前期百般刁难逼债，后期下巴脱臼震惊与谄媚碎步。"
core_scene_functions:
  - scene_name: "1903古典英式高级餐厅"
    story_function: "唯一物理空间约束。提供优雅西式餐厅环境，与落魄东方和尚吃面及大唐传国玉玺金印产生强烈的空间与文化违和张力。"
key_prop_functions:
  - prop_name: "黄金通关文牒"
    story_function: "百万英镑支票等价物。镶金线织就的卷轴，加盖唐太宗大唐国主传国玉玺，代表大唐国家无限信用保证。"
  - prop_name: "素面与筷子"
    story_function: "展现唐朝和尚极度饥饿吃相、与优雅西式餐厅格格不入的标志吃食道具。"

created_at: "2026-06-03T11:26:49+08:00"
updated_at: "2026-06-03T11:26:49+08:00"

stage_patches:
  - patch_type: scene-topic-gate
    version: 1
    status: completed
    updated_at: "2026-06-03T11:50:03+08:00"
    summary: "已完成《百万英镑》经典餐厅结账片段重制的选题决策门评估。用户选定‘未受封落魄唐朝和尚吃面与金池长老势力店员’改编构想，场地完全保留，主角吃面且道具为黄金通关文牒。选题打分88分，推进到下一阶段（scene-reference-decider）。"
    data:
      topic_name: "sanzang-noodle-restaurant"
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
      source_material:
        source_type: "classic_movie_clip"
        source_name: "电影《百万英镑》经典片段 (The Million Pound Bank Note)"
        source_locator: "user_provided_parsed_text"
        notes: "用户提供详细解析，保存于 inputs/source_intake/"
      source_intake_used: true
      source_intake_files_read:
        - file: "inputs/source_intake/topic_gate_handoff_v1.md"
          read_budget: compact
          reason: "读取选题评分子系统必需 of handoff 资料"
        - file: "inputs/source_intake/source_video_priority_map_v1.md"
          read_budget: compact
          reason: "读取必须保留的冲突与可替换边界以核对场地和角色重定义约束"
      total_score: 88
      performance_style_suggestion: "exaggerated_comedy"
      production_level: "focus"
      decision: "go"
      dimension_scores:
        热点价值: 22
        动画化适配度: 18
        改编空间: 14
        经典认知锚点: 14
        风险可控性: 9
        制作成本可控性: 8
        平台传播潜力: 3
      source_intake_dimension_notes:
        源视频核心是否清晰: "清晰，核心在于由于巨额资产引起的谄媚反转冲突"
        亮点是否足够支撑改编: "足够，唐朝和尚吃面和金池长老势力眼的戏剧点非常突出"
        可压缩内容是否明确: "明确，压缩了大门外徘徊和账台繁琐对白"
        可替换内容是否明确: "明确，角色身份完全重写，支付凭证转换为通关文牒"
        是否有不应照搬元素: "有，避开电影原版具体长台词，采用同义动作对白"
        是否具备资产化候选价值: "具备，已沉淀到全局 assets/"
      rationale: "唐朝和尚在英式餐厅大口吃素面，与见钱眼开的金池长老对决，并以大唐通关金牒降维打击，荒诞戏剧冲突与视觉撕裂感极强。评分88分，进入重点制作池（focus）。"
      risk_notes: "维多利亚高档茶室空间与古代中国和尚吃面的画风融合度需要精细控制，防止变成粗糙的低俗搞笑。"
      reuse_hints: "作为全局复用资产 million-pound-note 的首个 adapted_reference 引用项目"
      evaluator_rule_version: "v6.1"
  - patch_type: scene-reference-decider
    version: 1
    status: completed
    updated_at: "2026-06-03T11:52:00+08:00"
    summary: "已确定以《百万英镑》餐厅结账结构为主参考（hybrid_reference），物理场地完全保留，主角及店方替换为西游记未受封唐朝和尚与金池长老师徒，标志道具替换为黄金通关文牒。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具。"
      reference_type: hybrid_reference
      decision_summary: "物理场地、冲突骨架与视听节奏继承自《百万英镑》；人物设定、服装轮廓与标志道具继承自《西游记》未受封唐朝和尚与金池长老原型。"
      reference_boundary:
        primary_reference: "电影《百万英镑》餐厅结账结构"
        secondary_reference: "《西游记》未受封唐朝和尚与金池长老"
        boundary_rule: "以古典英国餐厅为不变时空，将西游师徒进行跨界卡通电影化转译，替换原版英国绅士与侍应生。"
        allowed_inheritance:
          - 剧情骨架
          - 情绪核心
          - 场景气质
          - 镜头动势
          - 角色关系
          - 角色身份
          - 服装轮廓
          - 标志道具
        forbidden_inheritance:
          - 角色身份
          - 服装轮廓
      must_keep:
        - category: 剧情骨架
          note: "必须保留‘狼吞虎咽吃面 -> 傲慢催账 -> 亮出天价凭证 -> 视听骤停 -> 极度谄媚免单送客’的冲突骨架。"
        - category: 场景气质
          note: "必须完全保留1903年古典英式茶室的木质复古装潢、白色台布、大挂钟等视觉空间设定。"
        - category: 标志道具
          note: "必须保留挂钟滴答声特写、唐朝和尚大碗吃素面、以及作为百万英镑支票等价物的黄金通关文牒。"
      must_avoid:
        - category: 角色身份
          note: "严禁照搬原片英国绅士亨利与男招待弗罗斯特的写实身份，完全替换为落魄和尚与市侩僧侣。"
        - category: 服装轮廓
          note: "严禁让唐朝和尚穿着大衣或西装，他必须穿着发白补丁僧袍；金池长老不穿英式纯马甲，需穿着带有红宝石佛珠的中西合璧奢华长衫。"
      source_intake_reference_use:
        source_intake_used: true
        files_read:
          - "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
          - "projects/million-pound-note/inputs/source_intake/adaptation_ideas_v1.md"
        inherited_core: "态度剧变冲突骨架，1903餐厅物理空间，进食狼吞虎咽对峙，亮出支票时的喜剧视听骤停"
        inherited_highlights: "挂钟滴答声特写，下巴脱臼表情特写，面包擦盘底细节，对称双排鞠躬送客"
        rewritten_or_replaced: "主角亨利替换为未受封落魄唐朝和尚；主食由炸牛排替换为热面条；支付支票替换为黄金通关文牒；侍应生与经理替换为金池长老及弟子"
        avoid_copying: "避开原版具体长台词，唐朝和尚不穿毛呢大衣而穿破僧袍，店家不穿标准纯西式马甲，结合唐朝和尚吃面对白"
      risk_notes:
        - "唐朝和尚用筷子在英式高档餐厅大口吃素面的荒诞感需要高度动画化渲染，需避免流于低俗搞笑，必须通过唐朝和尚安静悲悯的神态与店家惊恐谄媚来拉高格调。"
      next_action: "进入 scene-story-development，首先制定故事一句话梗概和 4-8 个 Story Beat 故事骨架。"
  - patch_type: scene-story-development
    version: 1
    status: completed
    updated_at: "2026-06-03T11:58:55+08:00"
    summary: "已完成《百万英镑》经典餐厅结账片段重制的故事骨架开发。锁定6个Story Beat，确立未受封唐朝和尚吃面与金池老僧势利逼债的冲突结构，以黄金通关文牒金印触发反转与两列大鞠躬免单Payoff。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
      story_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户明确确认采用‘唐朝和尚吃素面与通关文牒反转’的6节拍故事骨架。"
      story_development_summary: "以中西文化碰撞与人物贪婪反转为驱动，通过6个Story Beat完成入店、吃面、催债、出牒、核验、送客的完整反差喜剧故事骨架。"
      logline: "一个身穿补丁僧袍的落魄和尚在奢华英式茶室里大口吃素面，在面对势利老板拍桌子逼债时，亮出了一张盖有传国玉玺的大唐皇帝黄金通关文牒，让见钱眼开的老板瞬间长跪免单。"
      story_premise: "中西跨界文化错位，东土大唐至高皇权印信对近代西方市侩拜金主义的降维喜剧打击。"
      duration_target:
        target_total_duration_seconds: 60
        rationale: "6个包含动作对切的Story Beat，包含进食、逼债、看支票骤停及走秀送客，60秒能承载饱满的视听喜剧效果。"
      story_beats:
        - beat_id: "B01"
          title: "落魄僧人入店"
          function: "setup"
          beat_summary: "唐朝和尚身穿打满补丁的粗布僧袍，满脸风尘推开奢华茶室大门。店小二嫌弃其寒酸，故意将其引至角落暗处卡座。"
          emotion_goal: "建立贫富与中西环境的强烈反差预期"
          dramatic_question: "这个破和尚能不能在店里安稳坐下？"
          payoff_seed: "小二嫌贫爱富的势利眼神"
        - beat_id: "B02"
          title: "筷子吃面与傲慢窥视"
          function: "setup"
          beat_summary: "唐朝和尚点了一碗热面条，大口狼吞虎咽，甚至用小面饼把碗底酱汁擦拭得干干净净。柜台前金池长老和徒弟在柱子后偷偷窥视鄙夷，商量着克扣面条配料以省成本。"
          emotion_goal: "强化喜剧违和感与商家的市侩算计"
          dramatic_question: "店员能忍受他的‘粗俗’吃相多久？"
          payoff_seed: "擦盘子细节为后文大佬反转埋下伏笔"
        - beat_id: "B03"
          title: "按表逼债与催账"
          function: "crisis"
          beat_summary: "唐朝和尚吃完擦嘴，小二递上高额账单催账。金池长老走过来拍桌子，指着滴答作响的挂钟强力施压，质问他是否付得起钱。"
          emotion_goal: "催债的紧张迫切感，挂钟滴答声强化节奏"
          dramatic_question: "和尚没有零钱，要怎么收场？"
          payoff_seed: "拍桌子警告的嚣张态度"
        - beat_id: "B04"
          title: "展平金牒，视听骤停"
          function: "climax"
          beat_summary: "唐朝和尚平静一笑，从破大衣摸出大油污信封，在白台布上缓缓展平一张巨大的黄金通关文牒，露出红色的传国玉玺金印。挂钟秒针停摆，交响乐在一瞬间骤停，全场死寂。"
          emotion_goal: "极度惊愕与荒诞的喜剧定格"
          dramatic_question: "他们看到大唐皇帝亲签玉玺会如何？"
          payoff_seed: "玉玺金印与死寂对比"
        - beat_id: "B05"
          title: "魂飞魄散，核对真伪"
          function: "reversal"
          beat_summary: "小二被皇权文牒震慑得下巴拉长脱臼，发抖着把金牒呈给金池。金池拿着放大镜反复看，确认是无可挑剔的大唐帝皇真迹、代表国家信用，意识到唐朝和尚是皇帝御弟大佬，当场呆若木鸡。"
          emotion_goal: "大跌眼镜的喜剧反差与信念崩溃"
          dramatic_question: "势利掌柜该如何挽回局面？"
          payoff_seed: "经理双腿发软的生理恐惧"
        - beat_id: "B06"
          title: "对称大鞠躬，免单送客"
          function: "payoff"
          beat_summary: "小二一溜小跑哈腰返回，双手颤抖将金牒原样奉还，连称找不开并宣称小店免单。金池长老率全体店小二在门口对称排成两列，90度深鞠躬谄媚微笑，唐朝和尚道佛号起步插兜优雅出店。"
          emotion_goal: "极度谄媚引起的荒谬滑稽Payoff"
          dramatic_question: "唐朝和尚能优雅地走出大门吗？"
          payoff_seed: "双排对称鞠躬送客"
      character_functions:
        - character_name: "唐朝和尚"
          story_function: "扮猪吃老虎的隐秘大佬，代表东土大唐最高皇权与财富信用"
        - character_name: "金池长老"
          story_function: "势利老板，中西合璧奢华长衫，负责从极度傲慢到长跪谄媚的笑点担当"
        - character_name: "小二（金池弟子）"
          story_function: "市侩马前卒，傲慢催债与下巴脱臼震惊的喜剧物理担当"
      core_scene_functions:
        - scene_name: "1903古典英式茶室"
          story_function: "稳定物理空间，西式市侩压迫感与东方穷和尚及至高玉玺金印形成最强烈跨界对撞"
      key_prop_functions:
        - prop_name: "黄金通关文牒"
          story_function: "百万英镑支票等价物，大唐国主御赐传国玉玺印信，不可找零的全国无限信用保证"
        - prop_name: "素面与筷子"
          story_function: "核心视觉与文化反差道具，狼吞虎咽的对比道具"
      emotional_arc: "饥饿局促 -> 自若吃面 -> 被债压迫 -> 亮底骤停 -> 倒吸凉气 -> 极谄免单"
      hero_moment_candidates:
        - hero_id: "H01"
          title: "展平通关文牒，金光亮起，视听瞬间骤停"
          related_beat: "B04"
          reason: "大唐黄金通关文牒金光照亮昏暗餐厅，挂钟秒针停摆，交响乐在一瞬间死寂，戏剧与视听张力拉满。"
      ending_payoff: "金池长老率全体店小二对称两列排开，90度深鞠躬恭送唐朝和尚离店，通关金牒恭敬免单奉还。"
      story_risk_notes:
        - "唐朝和尚在西式茶室吃面用筷子，必须做得细节真实、表情安静自然，若用力过猛会显得太恶俗；金池的谄媚动作应当带有些许京剧/古典舞台化的小碎步，增强卡通喜剧感。"
      next_action: "进入 scene-asset-checker，检查项目中是否有‘唐朝和尚（破僧衣造型）’、‘金池长老（suit配宝石念珠）’、‘1903古典餐厅’、‘黄金通关文牒’等角色的已有资产或复用方案。"
  - patch_type: scene-asset-checker
    version: 1
    status: completed
    updated_at: "2026-06-03T12:00:18+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的资产检查。全局及项目资产库全空，唐朝和尚、金池长老与英式餐厅均无现成资产，决定全部走新建路径。核心道具黄金通关文牒单独沉淀设计。"
    data:
      story_function_summary:
        key_characters: "未受封唐朝和尚 (扮猪吃老虎圣僧), 金池长老 (虚荣势利老板), 小二 (市侩伙计)"
        key_scenes: "1903古典英式高级餐厅 (物理场地约束)"
        key_props: "黄金通关文牒 (天价道具，大唐皇权国家信用担保)"
      character_assets:
        - role_name: "唐朝和尚"
          reuse_status: "new_full"
          asset_ref: ""
          reuse_reason: "资产库无现有唐朝和尚模型或设定，且本次为‘未受封落魄版僧袍造型’，需完整新建视觉设计。"
          required_adjustments: []
        - role_name: "金池长老"
          reuse_status: "new_full"
          asset_ref: ""
          reuse_reason: "资产库无现有金池模型或设定，且本次为‘西装搭配红宝石佛珠’的中西合璧特定造型，需完整新建视觉设计。"
          required_adjustments: []
        - role_name: "小二（金池弟子）"
          reuse_status: "new_light"
          asset_ref: ""
          reuse_reason: "资产库无现有小二模型，需轻量新建面部表情与动作比例设定以支持下巴脱臼等Gag动作。"
          required_adjustments: []
      scene_assets:
        - scene_name: "1903古典英式高级餐厅"
          reuse_status: "new_full"
          asset_ref: ""
          reuse_reason: "资产库无现有的维多利亚风格高档茶室场景资产，鉴于其为全程唯一空间，且需绝对物理连续性约束，决定完整新建。"
          required_adjustments: []
      prop_assets:
        - prop_name: "黄金通关文牒"
          prop_status: "new_core_prop"
          asset_ref: ""
          handling_note: "作为核心亮点道具，单独建立设计卡以详细设计金线织就卷轴、唐皇亲笔与传国玉玺印记细节。"
        - prop_name: "素面与筷子"
          prop_status: "embed_in_character_or_scene"
          asset_ref: ""
          handling_note: "素面做为场景道具，筷子作为唐朝和尚随身挂件，直接嵌入角色与场景设计中，不单独建核心道具卡。"
      design_actions:
        reuse_targets: []
        tweak_targets: []
        new_light_targets:
          - "小二（金池弟子）"
        new_full_targets:
          - "唐朝和尚"
          - "金池长老"
          - "1903古典英式高级餐厅"
          - "黄金通关文牒"
      risk_notes:
        - "场景和角色全部新建会增加制作量，必须控制设计复杂度，尤其是唐朝和尚补丁僧衣与金池宝石西装的材质对比，应多利用现有的三维通用资产库进行快速组装。"
      next_action: "进入 scene-design-builder，正式为唐朝和尚、金池长老、小二、英式茶室及黄金通关文牒生成动画电影化设计设定与视觉风格 prompts。"
  - patch_type: scene-script-adapter
    version: 1
    status: completed
    updated_at: "2026-06-03T12:20:00+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的剧本改编与分段确认。剧本扩展为90秒（9段x10秒），引入经典的窗外犹豫与推门入店戏份，确定局部重写与夸张动作喜剧演绎风格，并识别了多项v4卡通表现力与反差喜剧机会点。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主要角色登场时需在画面下方显示简单的卡通/古风字姓名贴；通关文牒从破信封里拿出后再展开；文牒展开时有皮克斯式温暖体积光效。"
      script_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户于2026-06-03明确确认了增加开局窗外犹豫、将时长扩展至80-90秒且每段10秒的剧本规划。"
      adaptation_level: "partial_rewrite"
      performance_style: "exaggerated_comedy"
      target_total_duration_seconds: 90
      segment_strategy:
        segment_duration_seconds: 10
        segment_count: 9
        segmentation_mode: "equal_segments"
        rationale: "9段x10秒短视频，契合3D动画剪辑节奏与分镜模块化生成需求。"
      expressive_animation_inheritance:
        enabled: true
        source: "PROJECT_BOARD.expressive_animation"
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
        asset_references:
          effect_library: "assets/animation-stylization/effect-library.md"
          contrast_comedy_library: "assets/animation-stylization/contrast-comedy-library.md"
      script_summary: "大唐落魄僧人唐朝和尚饥饿入茶室吃面，遇金池老僧与弟子小二拍桌逼债，掏出脏信封里的黄金通关文牒平铺，大唐御笔与传国玺印大放圣光体积特效，震服掌柜与小二，实现免单且双排深鞠躬送客。"
      script_source_mode: "rewrite_adaptation"
      preserved_elements:
        - category: "剧情骨架"
          note: "保留大口吃面与店员冷眼对切、秒针滴答对峙、出牒瞬间视听死寂、排队深鞠躬免单送客的冲突骨架。"
        - category: "喜剧机制"
          note: "保留由于巨大财富/信用差距引起的态度180度滑稽反转核心。"
      rewritten_elements:
        - category: "角色替换"
          note: "主角稳重亨利替换为落魄圣僧唐朝和尚，掌柜与伙计替换为贪财金池长老及其弟子。"
        - category: "道具替换"
          note: "百万英镑支票替换为脏信封装的黄金通关文牒，炸牛排替换为筷子吸素面。"
        - category: "台词表达"
          note: "纯英式礼貌长对白重写为带有中西交融市侩幽默风的台词。"
      story_beats:
        - beat_id: "B01"
          title: "窗外徘徊"
          function: "setup"
          beat_summary: "唐朝和尚身穿破僧袍在寒风中透过结霜玻璃窗犹豫张望，肚子咕噜叫，从衣袖里摸了摸破信封决定进店。"
          emotion_goal: "建立贫富与饥饿局促的对比预期"
          dramatic_question: "这个潦倒的和尚有勇气走入奢华的茶室吗？"
          visual_focus: "透过结霜玻璃窗的特写镜头，浮现唐朝和尚姓名贴"
          action_focus: "摸衣袖信封，捂肚子"
          performance_hint: "神色饥饿、迟疑、随后坚定"
          rhythm_hint: "节奏缓慢，寒风声"
          sound_hint: "复古滑音与管弦乐，肚子咕噜声，木鱼碰铃名帖音效"
          target_duration_seconds: 10
          payoff_seed: "摸出破信封"
          potential_hero_moment: false
          bridge_need: "走入大门"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "落魄古代僧人与维多利亚高级茶室的跨界体型语境反差"
            downstream_note: "强调中式姓名贴显示"
        - beat_id: "B02"
          title: "局促入店"
          function: "setup"
          beat_summary: "唐朝和尚推门进入，暖气和客人交谈声涌来，他局促地抱着信封站在门口。柜台前金池长老与小二冷眼打量嫌弃他。"
          emotion_goal: "强化环境与角色寒酸的反差压迫感"
          dramatic_question: "店员会直接把他轰出去吗？"
          visual_focus: "金池与小二柜台探头，浮现店方两人姓名贴"
          action_focus: "小二嫌弃撇嘴，金池拨弄算盘"
          performance_hint: "小二极度市侩嫌弃，金池傲慢冷漠"
          rhythm_hint: "进入室内嘈杂节奏"
          sound_hint: "人声，餐具碰撞声，柜台名帖音效"
          target_duration_seconds: 10
          payoff_seed: "柜台密谋"
          potential_hero_moment: false
          bridge_need: "小二走下柜台"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "中西合璧的怪诞长衫马甲与西装对比"
            downstream_note: "小二脖子可拉长探视"
        - beat_id: "B03"
          title: "引至角落"
          function: "setup"
          beat_summary: "小二皮笑肉不笑迎上，挡住路将唐朝和尚引向最偏僻、光线最暗的角落圆桌，甩下发黄菜单。唐朝和尚平静坐下。"
          emotion_goal: "展现商家的冷漠与区别对待"
          dramatic_question: "和尚会因为被歧视而局促吗？"
          visual_focus: "小二假笑特写，暗卡座圆桌"
          action_focus: "甩菜单，唐朝和尚合十坐下"
          performance_hint: "小二假笑虚虚，唐朝和尚安详自若"
          rhythm_hint: "动作利索，带有一丝驱赶感"
          sound_hint: "菜单拍桌声"
          target_duration_seconds: 10
          payoff_seed: "偏僻卡座"
          potential_hero_moment: false
          bridge_need: "上面条"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "小二僵硬制式假笑与唐朝和尚平静慈悲的反差"
            downstream_note: "小二身体比例面条化拉长"
        - beat_id: "B04"
          title: "大口吸面"
          function: "setup"
          beat_summary: "素面上桌，唐朝和尚用竹筷狼吞虎咽，大口大口地吸面条，双颊卡通化鼓起。柜台前金池与小二冷眼算计克扣葱花。"
          emotion_goal: "极度饥饿动作与安静神态的喜剧冲突"
          dramatic_question: "和尚的吃相会引起柜台怎样的反应？"
          visual_focus: "吃面大碗特写，筷子飞速夹面"
          action_focus: "吸面、嚼面，双颊鼓起"
          performance_hint: "吸面速度极快，神情仍然安详"
          rhythm_hint: "吸面声效急促"
          sound_hint: "滑稽吸面气流声，嚼面声"
          target_duration_seconds: 10
          payoff_seed: "粘汤的嘴巴"
          potential_hero_moment: false
          bridge_need: "面条吃完"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: true
            use_contrast_comedy: false
            reason: "吃相的滑稽夸张表现，嘴边粘汤面屑"
            downstream_note: "吸面条动作允许Smear Frame重影"
        - beat_id: "B05"
          title: "面饼擦底"
          function: "setup"
          beat_summary: "唐朝和尚用一小块面饼仔细把陶碗底汤汁擦拭得一干二净塞嘴里。陶碗内壁干净反光如镜，反照出走来的小二的傲慢脸孔。"
          emotion_goal: "极致吃相引起的尴尬与荒谬笑点"
          dramatic_question: "盘子刮这么干净，店员怎么看？"
          visual_focus: "面饼擦碗底的特写，碗内倒影"
          action_focus: "面饼转圈擦碗，碗内折射小二走近倒影"
          performance_hint: "动作细致专注，十分享受"
          rhythm_hint: "动作放缓，安静下来"
          sound_hint: "面饼擦碗底的清脆吱吱声"
          target_duration_seconds: 10
          payoff_seed: "碗内倒影"
          potential_hero_moment: false
          bridge_need: "小二拍账单"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "用面饼擦盘底的日常小事用大特写表现的画面语境反差"
            downstream_note: "碗底高光反光质感"
        - beat_id: "B06"
          title: "拍桌逼债"
          function: "crisis"
          beat_summary: "小二拍下高额账单。金池过来拍桌警告，桌面茶匙茶杯弹起。挂钟秒针滴答声骤响，交响乐死寂。金池手指挂钟催债。"
          emotion_goal: "强烈的债务压迫感，死寂后的滴答紧张感"
          dramatic_question: "僧人身无分文，该如何应对逼债？"
          visual_focus: "拍桌特写，大挂钟秒针滴答特写"
          action_focus: "金池拍桌，茶匙弹起，手指大钟"
          performance_hint: "金池凶狠傲慢，中英夹杂，小二叉腰得意"
          rhythm_hint: "拍桌声骤响，音乐骤停死寂"
          sound_hint: "拍桌巨响，茶匙跳动清脆音，秒针极度清晰的滴答声"
          target_duration_seconds: 10
          payoff_seed: "催债的最后期限"
          potential_hero_moment: false
          bridge_need: "唐朝和尚摸袖口"
          expressive_animation_hint:
            use_stylized_action: true
            use_minor_cartoon_injury: true
            use_contrast_comedy: false
            reason: "拍桌导致的桌面物品回弹Overshoot，震起白烟尘"
            downstream_note: "金池手掌冒白色Puff尘雾"
        - beat_id: "B07"
          title: "金牒初露"
          function: "misdirection"
          beat_summary: "唐朝和尚淡然合十，从破袖子摸出油污信封按在白台布上，缓缓抽出黄金通关文牒三分之一，露出一角金线折射出耀眼高光。"
          emotion_goal: "暴风雨前的平静，高光初现的预示感"
          dramatic_question: "信封那么破，里面能有什么？"
          visual_focus: "白台布上的油垢宣纸信封，抽出的一角闪烁星芒高光"
          action_focus: "摸袖子，掏出，徐徐抽出"
          performance_hint: "唐朝和尚神情自若，动作极慢，小二和金池斜眼凑近"
          rhythm_hint: "极度缓慢，刻意拖延"
          sound_hint: "宣纸信封摩擦白台布沙沙声，金光初现时的清脆金属星鸣（Chime）"
          target_duration_seconds: 10
          payoff_seed: "抽出一半"
          potential_hero_moment: false
          bridge_need: "完全展平"
          expressive_animation_hint:
            use_stylized_action: false
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "史诗决斗般的慢推镜去拍掏信封的画面语境反差"
            downstream_note: "信封折叠包裹态State_Closed_Envelope"
        - beat_id: "B08"
          title: "圣光核验"
          function: "reveal"
          beat_summary: "唐朝和尚完全展平文牒，露出传国玉玺红印。纯金卷轴爆发暖金色体积圣光照亮圆桌。金池眼镜震飞，小二下巴拉长脱臼。"
          emotion_goal: "极致震惊与荒谬，圣洁金光降维打击"
          dramatic_question: "金印一出，店家态度会怎么崩溃？"
          visual_focus: "黄金卷轴玉玺印，漫天金色体积圣光晕，金池与小二金光照亮的惊恐脸庞"
          action_focus: "唐朝和尚合十，金池双手打颤拿放大镜检查，小二下巴脱落直坠胸前"
          performance_hint: "金池结巴瘫软，瞳孔剧震狂擦汗；小二呆立如鸡"
          rhythm_hint: "圣歌管弦乐轰鸣，高潮爆发"
          sound_hint: "震撼的交响圣歌，下巴脱臼弹簧Boing声，眼镜旋转声，金池发抖念佛号"
          target_duration_seconds: 10
          payoff_seed: "确认真迹"
          potential_hero_moment: true
          bridge_need: "小二双手呈递"
          expressive_animation_hint:
            use_stylized_action: true
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "小二下巴脱臼拉长与金池眼镜震飞的夸张卡通物理表现"
            downstream_note: "文牒完全展开态State_Unfolded_Glow，暖金体积光，金光粒子"
        - beat_id: "B09"
          title: "深鞠送客"
          function: "payoff"
          beat_summary: "小二碎步托还信封宣布免单。金池和小二在门前对称排成两列，90度深鞠躬谄媚大笑。唐朝和尚道佛号收妥金牒，优雅出门。"
          emotion_goal: "大快人心的谄媚Payoff，唐朝和尚出店的洒脱英雄感"
          dramatic_question: "这场荒诞冲突以什么礼遇画上句号？"
          visual_focus: "门口对称排开的两排店小二，90度大鞠躬，唐朝和尚飘逸走出门口背影"
          action_focus: "小二托还文牒，众人对称大鞠躬，唐朝和尚道佛号起步插兜出店"
          performance_hint: "店家极度谄笑恭维，唐朝和尚从容不迫"
          rhythm_hint: "欢快古典曲谢幕，关门声"
          sound_hint: "欢快进行曲，大门关上的沉重音"
          target_duration_seconds: 10
          payoff_seed: "完美的谢幕"
          potential_hero_moment: false
          bridge_need: "大门完全关上"
          expressive_animation_hint:
            use_stylized_action: true
            use_minor_cartoon_injury: false
            use_contrast_comedy: true
            reason: "小二小碎步跑回的卡通拖影，以及唐朝和尚落魄身形与高贵步伐的反差"
            downstream_note: "小二碎步Windup spin"
      expressive_beat_opportunities:
        - beat_id: "B03"
          opportunity_type: "contrast_comedy"
          original_beat: "小二带领唐朝和尚走向角落"
          proposed_expression: "小二耸肩摆臀的卡通面条人比例与高档西式背景冲突"
          emotional_function: "强化荒谬感"
          comedic_function: "小二滑稽的傲慢身段"
          safety_or_tonal_note: "动作夸张但保持礼貌节奏，避免过于猥琐"
          downstream_owner: "scene-performance-director"
        - beat_id: "B04"
          opportunity_type: "stylized_action"
          original_beat: "唐朝和尚大口大口吃面"
          proposed_expression: "面条在空中飞舞拉扯，吸面动作极快，双颊卡通充气充饱"
          emotional_function: "极度饿鬼投胎感"
          comedic_function: "夸张吃面视觉"
          safety_or_tonal_note: "面汤不溅到背景客人，仅限自己吃食"
          downstream_owner: "scene-performance-director"
        - beat_id: "B06"
          opportunity_type: "combined"
          original_beat: "经理拍桌催款"
          proposed_expression: "拍桌桌面颤动回弹Overshoot，震起白烟Puffs，大钟指针震颤"
          emotional_function: "增强逼债的滑稽威势"
          comedic_function: "桌上茶具如蹦床般弹跳"
          safety_or_tonal_note: "餐具跳起后慢半拍接住/落回，无打破伤人"
          downstream_owner: "scene-storyboard-director"
        - beat_id: "B08"
          opportunity_type: "combined"
          original_beat: "亮出通关文牒"
          proposed_expression: "黄金金光在低照度背景爆发体积光晕，小二下巴滑落脱臼，金池单片眼镜震飞翻转"
          emotional_function: "视觉震撼Payoff与倒倒吸凉气喜剧反转"
          comedic_function: "小二脱指到胸前，金池发抖核验"
          safety_or_tonal_note: "金光必须温暖，不可刺眼写实伤害"
          downstream_owner: "scene-video-prompt-builder"
      stylized_action_opportunities:
        - beat_id: "B06"
          scene_trigger: "stylized_fight_or_payoff_punishment"
          original_action_or_risk: "拍桌催债的肢体施压风险"
          proposed_animation_translation: "拍桌力道转化为空气冲击波与桌布果冻震颤，震起圆润白尘雾Puffs"
          recommended_animation_level: "expressive"
          recommended_effect_combo: "lamp_sway, cup_spin, dust_puffs, camera_bump"
          injury_tone: "none"
          safety_note: "纯环境与道具反馈，金池手掌无红肿写实伤口"
        - beat_id: "B08"
          scene_trigger: "wall_or_door_impact"
          original_action_or_risk: "亮出文牒产生的精神冲击"
          proposed_animation_translation: "精神冲击实体化为暖金体积光与气流，震飞眼镜，拉长脱臼下巴"
          recommended_animation_level: "comedic_push"
          recommended_effect_combo: "jaw_drop_stretch, eye_pop_take, volumetric_glow, sound_silence"
          injury_tone: "minor_cartoon"
          safety_note: "小二脱臼动作必须在下个Beat恢复，嘴部拉伸禁止出血或撕裂伤口"
      contrast_opportunities:
        - beat_id: "B01"
          contrast_type: "visual_context_gap"
          setup_expectation: "寒冷萧瑟的英国伦敦街道，透过高档气派的茶室拱窗，以为是苦情戏主角"
          payoff_reveal: "唐朝和尚摸信封后一肚子咕噜叫，反转为肚子冒卡通烟尘与滑稽鼓点"
          emotional_function: "打破严肃预期，切入滑稽节奏"
          comedic_function: "苦情背景与肚子咕噜的喜剧冲突"
          use_template: "genre_misdirection"
          avoid_repetition_note: "咕噜效果仅出现一次"
        - beat_id: "B07"
          contrast_type: "prop_scale_irony"
          setup_expectation: "用史诗极慢推镜、死寂钟声烘托出极度神圣高贵的出招姿态"
          payoff_reveal: "掏出的只是一个沾满大片大油污、烂原巴的宣纸信封"
          emotional_function: "烘托极致的‘扮猪吃老虎’冲突"
          comedic_function: "信封越破，金牒展开时亮瞎眼的反差就越大"
          use_template: "hide_then_reveal"
          avoid_repetition_note: "信封出场即锁定State_Closed_Envelope"
      hero_moment_candidates:
        - hero_id: "H01"
          title: "展平通关文牒，圣金体积光晕爆开，全场视听死寂"
          related_beat: "B08"
          reason: "大唐黄金通关文牒耀眼爆发，体积金色温暖光线吞噬Zone C并把店方二人脸盘染成金色，小二下巴脱臼眼镜震飞，大挂钟秒针在死寂中静止，喜剧画面感与视听高潮完美拉满。"
          visual_payoff: "强烈的暖金体积光晕，把金池和小二惊悚的脸镀成金色，背景胡桃木壁板暗化剪影，脱臼下巴与半空翻转眼镜定格"
      script_file: "projects/million-pound-note/details/script_v1.0.md"
      performance_handoff:
        acting_note: "唐朝和尚大口吃面，动作狂放神态平静慈悲；小二尖嘴假笑傲慢，高潮下巴脱落颤抖；金池拍桌凶狠，核对时发抖满头大汗。"
        micro_expression_note: "唐朝和尚双颊气泡卡通充气；小二眼角撇嘴；金池怒发冲冠红气场，谄媚时褶子挤成月牙。"
        pause_note: "Beat 06拍桌后秒针滴答，有一秒的绝对死寂对峙；Beat 08展开文牒，金光爆开时画面定格半秒（Hold for 0.5s）。"
        character_reaction_note: "小二双手颤抖托还文牒；金池率领全体对称两排大鞠躬谄大笑送客。"
        expressive_animation_note: "继承自顶层配置，执行小二下巴脱臼拉长、金池眼镜震飞、金光微粒体积感、拍桌杯具跳跃。"
        contrast_performance_note: "唐朝和尚越平静自若，掏信封越慢条斯理，店方逼债越凶恶，反转时的滑稽感就越饱满。"
        injury_reaction_note: "小二的下巴脱臼属于喜剧无伤变形，在Beat 09跑步递还文牒时必须自行恢复完整性。"
      storyboard_hints:
        pacing_note: "从前面的局促徘徊慢节奏，到吃面与拍桌的快动作对切，到金牒爆开的定格死寂，最后进行曲谢幕，动静分明。"
        visual_escalation_note: "从餐馆暗角落的灰暗，到金池逼债投影，到展开金牒体积光爆发的金色全场高亮，亮度呈阶梯式爆发。"
        shot_priority_note: "必须确保H01（完全展平文牒爆金光，二人惊愕定格）作为全片绝对的一号重点镜头（Master Climax Shot）。"
        bridge_shot_need: "Beat 01唐朝和尚推重门入店需要动作连贯；Beat 08小二接文牒碎步跑向柜台需要滑行轨迹。"
        blocking_note: "严格执行左柜台、右餐桌的调度轴线。金光辐射从右下（餐桌）打向左上（柜台）。"
        prop_state_note: "白台布圆桌中心从空碗 -> 拍下账单 -> 脏信封 -> 黄金文牒展开圣光爆开，状态机变道明晰。"
        expressive_storyboard_note: "分镜中需明确画出拍桌尘雾Puffs、茶杯空跃状态、圣光粒子以及下巴脱臼的拉伸效果。"
        contrast_reveal_note: "用中景特写表现掏出信封，再切全身大广角展露闪亮金牒爆开光晕的反差过程。"
        injury_visibility_note: "嘴角汤屑需近景可见，除拍桌灰尘和嘴角面汤外，不出现写实流血或创伤痕迹。"
      risk_notes:
        - "唐朝和尚在西式茶室大口狼吞虎咽，必须保持面容安静清澈以避开粗俗恶心风险；小二下巴脱落变形不可出现撕裂出血以符合家庭动作喜剧尺度；圣光必须是温暖明亮的物理体积光，禁止激光强光以防产生攻击性科幻违和感。"
      next_action: "进入 scene-performance-director，为唐朝和尚、金池长老与店小二设计动画长片级的微表情、动作节奏、姿态回弹与表演手势。"
  - patch_type: scene-performance-director
    version: 1
    status: completed
    updated_at: "2026-06-03T12:21:00+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的表演导演设计。为唐朝和尚设计了平静安详的“一本正经”反差吃面及出牒表演；为金池设计了驼背拨算盘、拍桌及倒地核对的贪婪表现；为小二设计了耸肩假笑、下巴脱落拉长（Jaw Drop）与龙卷碎步（Windup spin）的卡通物理反应；并制定了逐节拍的微表情、眼神与动作过渡细则。"
    data:
      performance_version: "v1.0"
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主要角色登场时需在画面下方显示简单的卡通/古风字姓名贴；通关文牒从破信封里拿出后再展开；文牒展开时有皮克斯式温暖体积光效。"
      performance_style: "exaggerated_comedy"
      expressive_animation_inheritance:
        enabled: true
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
        asset_references:
          effect_library: "assets/animation-stylization/effect-library.md"
          contrast_comedy_library: "assets/animation-stylization/contrast-comedy-library.md"
      performance_sheet_path: "projects/million-pound-note/details/performance_sheet_v1.0.md"
      performance_summary: "唐朝和尚以安静合十、筷子吃面饼擦碗底等一本正经细节制造反差；金池长老以拍桌通红脸、瘫软擦冷汗与双排90度鞠躬送客展现市侩；小二以搓毛巾假笑、下巴脱落砸胸膛的卡通物理形变呈现极度震惊。"
      character_performance_profiles:
        - character_id: "CH01"
          character_name: "唐朝和尚"
          acting_energy: "低能量"
          eye_focus_pattern: "清澈、半闭合平视"
          facial_expression_range: "微表情，如平和面部、淡然微笑"
          body_language: "背梁挺直，上半身稳重"
          body_weight: "沉稳端庄"
          hand_action_pattern: "单手合十，拿竹筷，平压信封"
          signature_gesture: "单手立于胸前，微动嘴唇念阿弥陀佛"
          emotional_leak: "无，通过肚子咕噜冒烟、嘴角沾汤等外在细节泄露饥饿"
          comedy_reaction_rule: "一本正经（Deadpan）不自知"
          blocking_behavior: "固定在卡座Zone C，以静态制约店方动作"
          prop_interaction_behavior: "竹筷吸面拉残影，面饼圈擦陶碗底，大袖口摸出脏信封，平压展平文牒"
          expressive_physics_capacity:
            squash_stretch_allowed: false
            impact_deformation_allowed: false
            recovery_rule: "不形变，保持佛法相庄严"
          cartoon_injury_reaction_rule:
            allowed_visible_injuries: ["嘴角粘上面汤和绿菜屑", "窗外徘徊时鼻尖冻红"]
            forbidden_reactions: ["写实虚脱", "伤口流血"]
            recovery_or_settle: "眨眼几下，收回大袖"
          contrast_performance_profile:
            core_contrast_type: "visual_context_gap"
            deadpan_or_self_aware: "deadpan"
            consistency_boundary: "任何时候不参与搞怪或卖蠢，保持圣僧威仪"
        - character_id: "CH02"
          character_name: "金池长老"
          acting_energy: "高能量"
          eye_focus_pattern: "傲慢斜视，核对文牒时凸眼大瞪"
          facial_expression_range: "老脸褶皱挤压，胡须颤动，单片镜后凸眼"
          body_language: "肥胖驼背，双手反插腰后，走路左右鸭子晃"
          body_weight: "重心偏下，软性松弛"
          hand_action_pattern: "手指颤抖，重拍桌子，作揖发抖"
          signature_gesture: "右手大拇指与食指揉捏胸前巨大红宝石念珠"
          emotional_leak: "脸上渗出大冷汗珠，愤怒时憋得脸红"
          comedy_reaction_rule: "极傲到极谄的180度大反差"
          blocking_behavior: "在Zone B与Zone C移动，逼债前倾，爆金光被震退，发软下跪"
          prop_interaction_behavior: "单片放大镜照金牒，拨弄算盘，拍桌子"
          expressive_physics_capacity:
            squash_stretch_allowed: true
            impact_deformation_allowed: true
            recovery_rule: "被圣光震退倒吸凉气后，下一Beat像不倒翁一样弹回谄笑站姿"
          cartoon_injury_reaction_rule:
            allowed_visible_injuries: ["拍桌震起灰尘扑脸剧烈咳嗽"]
            forbidden_reactions: ["写实骨折", "大量出血"]
            recovery_or_settle: "作揖谄慢爬起"
          contrast_performance_profile:
            core_contrast_type: "prop_scale_irony"
            deadpan_or_self_aware: "deadpan"
            consistency_boundary: "贪婪虚荣底色不变，因对大唐国主玺印的世俗恐惧而臣服"
        - character_id: "CH03"
          character_name: "店小二"
          acting_energy: "极高能量"
          eye_focus_pattern: "势利打量衣服与竹笈，震惊时眼眶脱框"
          facial_expression_range: "门牙微露，咧嘴假笑，吃惊时下巴拉长砸地"
          body_language: "高耸肩膀，长手长脚面条人，小碎步"
          body_weight: "轻飘机警，重心高"
          hand_action_pattern: "双手揉搓甩白毛巾，猛拍账单"
          signature_gesture: "抹布在左右手甩动，然后搭在肩膀上"
          emotional_leak: "尴尬汗滴弹出，双脚原地打滑"
          comedy_reaction_rule: "狗仗人势，极端夸张身体物理变形"
          blocking_behavior: "在两区跑动，结尾在大门口对称双鞠躬"
          prop_interaction_behavior: "拍菜单与账单，端托盘，碎步高托信封"
          expressive_physics_capacity:
            squash_stretch_allowed: true
            impact_deformation_allowed: true
            recovery_rule: "下巴拉长脱臼后在下一个Beat小碎步递文牒时自动缩回原位"
          cartoon_injury_reaction_rule:
            allowed_visible_injuries: ["金光冲击贴墙像纸片滑落"]
            forbidden_reactions: ["写实疼痛惨叫", "创伤流血"]
            recovery_or_settle: "橡皮弹簧回弹音效中弹起"
          contrast_performance_profile:
            core_contrast_type: "size_mismatch"
            deadpan_or_self_aware: "deadpan"
            consistency_boundary: "市侩跑腿，一切狐假虎威以金池的指令为准"
      beat_performance_notes:
        - beat_id: "B01"
          emotional_goal: "饥饿与局促"
          main_expression: "缩肩寒冷，视线聚焦吃面"
          micro_expression: "咽口水，嘴唇冻紫轻颤"
          eye_action: "盯着窗内面条眨眼"
          body_action: "缩肩，身躯受寒轻微前后晃"
          hand_action: "袖中捂肚子，摸出油污信封看0.8秒（Hold）"
          pause_or_hold: "摸出信封看0.8s定格"
          secondary_action: "肚子上冒小团滑稽烟尘"
          reaction_timing: "00:05肚子咕噜叫"
          transition_to_next_beat: "把信封揣回袖子走向大门"
          potential_hero_moment: false
          bridge_performance_hook: "视线看向大门"
          blocking_note: "常驻Zone C窗外"
          prop_state_note: "信封处于State_Closed_Envelope"
          expressive_performance:
            expression_type: "contrast_comedy"
            animation_physics: "肚子烟尘Puffs"
            injury_reaction: "鼻尖冻红"
            contrast_behavior: "苦情戏氛围与滑稽肚子咕噜音的反差"
            timing_structure: "徘徊 -> 摸信封 -> 肚子叫 -> 入店"
            recovery_or_settle: "整理袖口，恢复端庄"
        - beat_id: "B06"
          emotional_goal: "逼债紧迫感与挂钟死寂"
          main_expression: "金池怒发冲冠红脸，小二叉腰谄笑"
          micro_expression: "金池胡须大抖，眼睛冒火光"
          eye_action: "怒视唐朝和尚，手指上指大挂钟"
          body_action: "金池前倾拍桌子"
          hand_action: "小二拍账单，金池重重拍白圆桌桌布"
          pause_or_hold: "拍桌后秒针滴答，画面与声音绝对静音对峙1秒"
          secondary_action: "茶匙茶杯在圆桌上像果冻般高空蹦极弹起滞空0.3秒落回（Overshoot）"
          reaction_timing: "00:53金池重拍桌子"
          transition_to_next_beat: "金池缩回手指，等唐朝和尚反应"
          potential_hero_moment: false
          bridge_performance_hook: "指大钟的手势余势"
          blocking_note: "金池由柜台逼近圆桌Zone C"
          prop_state_note: "拍下账单，桌面震动"
          expressive_performance:
            expression_type: "combined"
            animation_physics: "茶具跳起弹回，手掌微扁"
            injury_reaction: "震起大片白色Puff尘雾"
            contrast_behavior: "严肃拍桌与勺子跳蹦床的反差"
            timing_structure: "前倾 -> 拍桌 -> 震动 -> 滞空 -> 慢落回 -> 对峙静音"
            recovery_or_settle: "茶具稳稳落回桌布，尘雾散去"
        - beat_id: "B08"
          emotional_goal: "极致震惊与神圣反转"
          main_expression: "唐朝和尚平静合十金光照脸；金池瘫软惊骇；小二脱臼傻立"
          micro_expression: "金池汗出如浆狂擦汗；小二眼球脱框"
          eye_action: "金池大瞪老眼贴放大镜核对文牒；小二呆视前方"
          body_action: "文牒完全展开，爆发扇形暖金体积圣光照亮圆桌；金池被金光震退一步瘫跪地上；小二下巴脱落直脱到胸口（Jaw drop stretch）"
          hand_action: "唐朝和尚平展文牒；金池双手筛糠般颤抖拿放大镜指文牒"
          pause_or_hold: "金光亮起爆发瞬间，全场画面死静定格半秒（Hold 0.5s），挂钟秒针静止"
          secondary_action: "金池单片金丝眼镜震飞半空旋转三圈接住"
          reaction_timing: "01:12文牒展平金光爆发"
          transition_to_next_beat: "金池核实大唐国主大印，满面堆谄笑"
          potential_hero_moment: true
          bridge_performance_hook: "金色圣光满溢"
          blocking_note: "圣光爆开，金池被震退瘫跪，小二贴向椅背"
          prop_state_note: "通关文牒State_Unfolded_Glow完全展开态，红玺印显现，体积圣光漫天，粒子飘动"
          expressive_performance:
            expression_type: "combined"
            animation_physics: "下巴拉长脱臼，眼镜震飞空中翻转"
            injury_reaction: "金光气流冲击小二贴椅背"
            contrast_behavior: "破烂黄纸信封抽出纯金体积国书的反差payoff"
            timing_structure: "完全展开 -> 金光爆发 -> 震飞眼镜 -> 下巴脱臼 -> 瘫软核对 -> 谄媚月牙"
            recovery_or_settle: "金光趋于柔和，小二双手颤抖"
      continuity_rules:
        character_performance_consistency: "唐朝和尚全程平稳佛性，无任何惊怒动作；金池傲慢与谄媚大反差，但贪财本色一致；小二狗仗人势，形变承载者"
        emotional_progression: "唐朝和尚平静 -> 局促入店 -> 慈悲吃面 -> 静看逼债 -> 展牒放金光 -> 佛号出门。递进圆润"
        gesture_continuity: "小二肩膀上的白抹布在不同Beat之间位置连贯；金池手中的单片镜飞起接住的运动轨迹连贯"
        blocking_continuity: "唐朝和尚始终坐于Zone C；金池与小二前期压迫右侧，反转时被逼退向左"
        prop_state_continuity: "信封经历State_Closed_Envelope -> State_Revealing_Envelope -> State_Unfolded_Glow三个连续物理状态变化，不可穿帮"
      storyboard_handoff:
        camera_focus_suggestions: "B01以隔窗外中景表现唐朝和尚寒冷；B04以极近景吸面；B06拍桌时给勺子跳起特写；B08圣光爆开切广角低仰角拍漫天金色体积光照亮惊恐人脸"
        closeup_priority: ["B01唐朝和尚面部冻红特写", "B05碗底镜面折射小二走来倒影", "B08金印红红玺章与体积光特写"]
        reaction_shot_priority: ["B02金池小二柜台冷眼窥视", "B06挂钟秒针嘀嗒特写", "B08小二下巴脱臼拉长与金池大冷汗珠特写"]
        timing_notes: "拍桌后有一秒绝对死寂对峙；金牒金光爆发时定格0.5秒；小二递还文牒跑步打滑3秒"
        hero_moment_support: "通过小二拉伸脱臼的夸张动作和金池飞起金眼镜抛物线，在画面上形成强烈的前景衬托，强力托举H01圣光爆发"
      risk_notes:
        - "唐朝和尚在西式茶室大口狼吞虎咽，必须保持面容安静清澈以避开粗俗恶心风险；小二下巴脱落变形不可出现撕裂出血以符合家庭动作喜剧尺度；圣光必须是温暖明亮的物理体积光，禁止激光强光以防产生攻击性科幻违和感。"
      next_action: "进入 scene-storyboard-director，制定 9 个 10 秒 Segment 的专业镜头规划，设计影视镜头语言、调度、声音与动画物理分镜。"
  - patch_type: scene-storyboard-director
    version: 1
    status: completed
    updated_at: "2026-06-03T12:43:00+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的分镜故事板阶段（scene-storyboard-director）。设计了包含18个镜头的分镜，指定了每个镜头的序号以及衔接与连续性锚点（Linkage & Continuity Anchors），并锁定了方案B（门外低角度仰送）的最终大结局。故事板Prompt输出已落盘。推进至下一步（scene-audio-director）。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_sanzang"
          selected_title: "未受封落魄唐朝和尚吃面与金池长老势力店员"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为未受封的落魄唐朝和尚吃素面；老板与侍应生改编为见钱眼开的金池长老及其弟子；核心道具为加盖传国玉玺的大唐黄金通关文牒。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主要角色登场时需在画面下方显示简单的卡通/古风字姓名贴；通关文牒从破信封里拿出后再展开；文牒展开时有皮克斯式温暖体积光效。"
      storyboard_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户确认了最终的18个镜头分镜，并明确了防衔接不自然规则以及选择方案B结局。"
      storyboard_version: "v1.0"
      segment_duration_seconds: 10
      target_total_duration_seconds: 90
      total_story_beats: 9
      total_shots: 18
      total_segments: 9
      storyboard_summary: "18个精细设计的动画电影化镜头，全片共9个Segment，包含窗外犹豫、局促入店、引至角落、大口吸面、面饼擦底、拍桌逼债、金牒初露、圣光核验以及大鞠躬免单方案B送客大结局。"
      shotlist_file: "projects/million-pound-note/details/shotlist_v1.0.md"
      storyboard_prompt_files:
        - file: "projects/million-pound-note/outputs/storyboard_prompts/storyboard_prompt_v1.0.md"
          purpose: "用于外部平台生成18个分镜的故事板图片"
      next_action: "推进到 scene-audio-director 阶段，为这18个镜头制定声音导演方案。"
  - patch_type: scene-audio-director
    version: 1
    status: completed
    updated_at: "2026-06-03T12:48:00+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的声音导演阶段（scene-audio-director）。设计了完整的声音导演方案，包含唐朝和尚、金池、小二的中英混合配音方向；设计了英伦市侩与东方禅意融合的配乐主题和静默点；为18个分镜定制了非写实的卡通动作声与星芒/圣光爆发拟音，并严格限制了写实伤害声。生成了音乐提示词、拟音提示词与混音计划，全部落盘。推进至下一步（scene-video-prompt-builder）。"
    data:
      audio_plan_version: "v1.0"
      audio_plan_path: "projects/million-pound-note/details/audio_plan_v1.0.md"
      music_prompt_path: "projects/million-pound-note/outputs/audio/music_prompt_v1.0.md"
      foley_prompt_path: "projects/million-pound-note/outputs/audio/foley_prompt_v1.0.md"
      audio_mix_plan_path: "projects/million-pound-note/outputs/audio/audio_mix_plan_v1.0.md"
      next_action: "推进到 scene-video-prompt-builder 阶段，编写各镜头的视频提示词并整合声音提示。"
  - patch_type: scene-video-prompt-builder
    version: 2
    status: completed
    updated_at: "2026-06-03T15:26:00+08:00"
    summary: "已完成《百万英镑》餐厅结账重制项目的视频提示词构建阶段。针对上游剧本、分镜、表演和声音计划进行了零损失的高细节度整合，采用 Segment + Shot + Timecode 双层结构输出中英文两套正式提示词文档。提示词完整体现了主要角色的中文姓名贴、金黄体积圣光爆发、店小二下巴脱落拉伸、店小二双脚打转三圈谄笑、大门合拢高大剪影等物理/表演喜剧看点，并全面嵌入了声相连续性与全局负向边界约束。推进至下一步（scene-publish-review）。"
    data:
      prompt_pack_version: "v1.0"
      segment_duration_seconds: 10
      target_total_duration_seconds: 90
      total_segments: 9
      video_prompt_files:
        - file: "projects/million-pound-note/outputs/video_prompts/video_prompts_zh_v1.0.md"
          segment_scope: "Segment 1 - 9"
          purpose: "中文版视频生成提示词"
        - file: "projects/million-pound-note/outputs/video_prompts/video_prompts_en_v1.0.md"
          segment_scope: "Segment 1 - 9"
          purpose: "英文版视频生成提示词"
      next_action: "推进到 scene-publish-review 阶段，准备发布宣发文案、字幕歌词以及评论引导。"
---

# 项目黑板：百万英镑餐厅结账重制项目

## 项目简介
本项目基于《百万英镑》经典餐厅结账片段的视频解析内容进行重新创作。
*   **物理场地约束**：保留原片经典的20世纪初高档英式餐厅/茶室空间（场地不变）。
*   **创作模式**：进行**角色题材跨界改编**。

## 当前进度与下一阶段
*   **当前项目状态**：`video_prompts_ready` (已完成中英文视频提示词构建，完美继承分镜、表演与声音规则)
*   **下一阶段任务**：`scene-publish-review` (发布包装与复盘阶段，编写宣发文案、字幕歌词以及评论引导)

## 资产引用
本科学项目已将原视频解析内容提升为全局可复用资产：
*   **资产中心卡片**：[source-card.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/assets/source-materials/million-pound-note/source-card.md)
*   **项目输入路径**：`projects/million-pound-note/inputs/source_intake/`
