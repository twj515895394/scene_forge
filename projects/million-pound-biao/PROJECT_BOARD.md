---
project_name: million-pound-biao
project_status: video_prompts_ready
next_stage: scene-publish-review
lifecycle_flag: active
blocker_note: null
score: 92
production_level: focus
reference_type: hybrid_reference

script_strategy:
  status: selected
  mode: rewrite_adaptation
  selection_note: "用户明确选择改编路线（rewrite_adaptation），并锁定中国幽默角色‘彪哥’及‘维多利亚黑卡’作为改编方向。"
  selected_at: "2026-06-03T17:02:00+08:00"

creative_direction_context:
  script_mode: rewrite_adaptation
  selected_adaptation:
    status: selected
    selected_idea_id: "idea_selected_biao"
    selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
    selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾；全员使用东北方言对话。"
  downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”；全员使用地道东北方言，制造英伦背景与东北话的极限喜剧反差。"

source_intake:
  type: video_clip
  status: analyzed
  source_path_or_url: "user_provided_text"
  source_summary: "《百万英镑》经典餐厅结账片段的结构化解析，作为彪哥版本的结构与视听参考源。"
  source_duration_seconds: 386
  source_language_hint: "zh-CN"
  active_version: "v1"
  files: null

  topic_gate_handoff_summary:
    candidate_topic: "基于《百万英镑》经典餐厅结账片段重制，进行中国有梗角色（彪哥、马大帅、吴总、阿刚）跨界改编"
    core_must_keep: "态度180度反转冲突，古典英式餐厅物理空间，进食狼吞虎咽对峙，亮出黑金卡瞬间喜剧视听骤停，结尾猎枪走火的喜剧收尾"
    highlights_to_consider: "大葱蘸酱与面饼擦碗底，挂钟秒针滴答声，下巴脱臼夸张表情，对称仪式感双排鞠躬送客，猎枪掉地走火震落白灰糊脸"
    optional_to_compress: "大门外张望和进餐前的慢步，账台前讨论支票的繁琐对白"
    safe_replacement_notes: "主角端庄亨利替换为彪哥，支票替换为维多利亚大饭店至尊钻石黑卡，经理和小二替换为吴总和阿刚，吃土豆老头替换为吃地瓜的马大帅，新增猎枪走火伏笔"
    adaptation_ideas_summary: "定制改编构想：彪哥与维多利亚黑卡版"
    risks_or_limits: "维多利亚高档茶室空间与东北乡土幽默角色的融合度，三维动画角色交互与卡通物理表现要求高"

  adaptation_ideas_summary:
    idea_count: 1
    recommended_ideas: "彪哥与维多利亚黑卡版"
    user_selection_required: true

  adaptation_selection:
    status: selected
    selected_idea_id: "idea_selected_biao"
    selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
    selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾。"

  assetization:
    candidate_for_assetization: false
    reason: "直接复用已有的全局资产 million-pound-note"
    suggested_asset_slug: "million-pound-note"
    asset_status: created
    user_confirmation_required: false
    user_confirmation_status: confirmed
    confirmation_note: "直接复用已有的全局资产 million-pound-note"
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
      original_transcript: "assets/source-materials/million-pound-note/original-transcript.md"


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
  confirmation_status: pending_storyboard_plan_confirmation
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

story_development_summary: "以东北方言和角色反转为驱动，通过9段式故事骨架（90秒）完成窗外徘徊、局促入店、小二带位、大口吃面、面饼擦碗、拍桌逼债、出卡亮底、经理跪验以及走火礼炮送客的完整喜剧叙事。"
target_total_duration_seconds: 90
ending_payoff: "吴总与阿刚对称大弯腰送客，彪哥枪支掉地走火轰碎吊灯，白粉白灰把经理小二糊成白脸，彪哥淡定救场称为开业礼炮并大步离店。"
hero_moment_candidates:
  - hero_id: "H01"
    title: "黑卡金光爆发，时空静止，秒针停摆"
    related_beat: "B08"
    reason: "维多利亚黑卡在奢华白台布上展开，爆发强烈霓虹体积光，大钟秒针静止，人声戛然而止，视听反差达到顶点。"

hero_moments: []
story_beats:
  - beat_id: "B01"
    title: "窗外犹豫"
    function: "setup"
  - beat_id: "B02"
    title: "局促入店"
    function: "setup"
  - beat_id: "B03"
    title: "引至角落"
    function: "setup"
  - beat_id: "B04"
    title: "大口吸面"
    function: "setup"
  - beat_id: "B05"
    title: "面饼擦底"
    function: "setup"
  - beat_id: "B06"
    title: "拍桌逼债"
    function: "crisis"
  - beat_id: "B07"
    title: "黑卡初露"
    function: "misdirection"
  - beat_id: "B08"
    title: "圣光滑跪"
    function: "reveal"
  - beat_id: "B09"
    title: "礼炮送客"
    function: "payoff"

character_functions:
  - character_name: "彪哥"
    story_function: "扮猪吃老虎的隐秘大佬。满嘴东北嗑，一本正经搞怪，身携惊世黑卡与走火猎枪。"
  - character_name: "吴总"
    story_function: "嫌贫爱富经理。带大金表，中式西装，负责从拍桌威胁到惊恐滑跪的180度反差。"
  - character_name: "阿刚"
    story_function: "市侩傲慢小二。看人下菜碟，催账打手，卡通下巴脱臼担当。"
  - character_name: "马大帅"
    story_function: "邻桌地瓜食客，彪哥的现实克星与吐槽官。"

core_scene_functions:
  - scene_name: "1903古典英式高级茶室"
    story_function: "古典精致的西式物理空间，与大葱吃相、大花布猎枪、东北话对峙形成极大的文化空间冲突力。"

key_prop_functions:
  - prop_name: "开原维多利亚大饭店至尊钻石黑卡"
    story_function: "等价于百万英镑支票。印有维多利亚与保卫科长粗黑字，金光闪耀，成为引起吴总误会的道具。"
  - prop_name: "东北花布包裹的长杆猎枪"
    story_function: "彪哥背在背上的伏笔道具，结局走火造成吊灯损毁与石膏灰糊脸，达到卡通喜剧高潮。"
  - prop_name: "大葱、面条与陶碗"
    story_function: "展示吃相与碗底镜面反射的物理道具。"

created_at: "2026-06-03T17:01:00+08:00"
updated_at: "2026-06-03T17:47:00+08:00"

stage_patches:
  - patch_type: scene-topic-gate
    version: 1
    status: completed
    updated_at: "2026-06-03T17:02:00+08:00"
    summary: "已完成彪哥版《百万英镑》餐厅结账重制项目的选题评估（scene-topic-gate）。评估得分92分，属于重点制作池（focus），决策为进行（go）。已确认采用改编模式（rewrite_adaptation），并锁定‘彪哥与维多利亚黑卡及猎枪走火’作为正式改编方向。已建立与全局资产 million-pound-note 的关联关系。"
    data:
      topic_name: "million-pound-biao"
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾。"
      source_material:
        source_type: "classic_movie_clip"
        source_name: "电影《百万英镑》经典片段 (The Million Pound Bank Note)"
        source_locator: "global_asset:million-pound-note"
        notes: "复用已存在的全局资产 million-pound-note，以结构模式和安全边界文件为主要参考。"
      source_intake_used: true
      source_intake_files_read:
        - file: "assets/source-materials/million-pound-note/source-card.md"
          read_budget: compact
          reason: "读取经典餐厅结账片段的戏剧冲突母题与动作链"
        - file: "assets/source-materials/million-pound-note/structure-analysis.md"
          read_budget: compact
          reason: "读取原片的反差对比、震惊定格和几何空间调度结构"
        - file: "assets/source-materials/million-pound-note/adaptation-angles.md"
          read_budget: compact
          reason: "读取场地不变、改编角色的可复用改编角度"
      total_score: 92
      performance_style_suggestion: "exaggerated_comedy"
      production_level: "focus"
      decision: "go"
      dimension_scores:
        热点价值: 24
        动画化适配度: 19
        改编空间: 14
        经典认知锚点: 14
        风险可控性: 9
        制作成本可控性: 8
        平台传播潜力: 4
      source_intake_dimension_notes:
        源视频核心是否清晰: "非常清晰，基于天价货币导致的态度180度大反转"
        亮点是否足够支撑改编: "足够，彪哥的性格、语言特色与维多利亚大饭店段子能完美融入"
        可压缩内容是否明确: "明确，压缩了大门外张望和进餐前的慢步，账台前讨论的繁琐对白"
        可替换内容是否明确: "明确，替换主角为彪哥，支票替换为维多利亚黑卡，市侩店家替换为吴总与阿刚，邻桌吃地瓜老头替换为马大帅"
        是否有不应照搬元素: "有，避开原版具体长台词，采用同义动作和彪哥经典特色对白"
        是否具备资产化候选价值: "已具备，直接复用已存在的全局资产 million-pound-note"
      rationale: "彪哥（保卫科长）在1903年古典英式餐厅用筷子吃大葱面，亮出‘开原维多利亚大饭店钻石VIP卡’，引发吴总和阿刚误以为是皇家维多利亚无限黑卡的180度谄媚反转，结尾引入猎枪落地的走火礼炮，具有极高的鬼畜和二创传播潜力，动画化适配度极高。"
      risk_notes: "猎枪走火只造成天价吊灯损坏和天花板白灰扑脸，属于卡通风格无伤尘土（soot_face），必须严格遵守 safety-boundaries.md，不得有任何流血或人身伤害。"
      reuse_hints: "作为全局资产 million-pound-note 的第二个 adapted_reference 引用项目"
      evaluator_rule_version: "v6.1"
  - patch_type: scene-reference-decider
    version: 1
    status: completed
    updated_at: "2026-06-03T17:06:00+08:00"
    summary: "已完成彪哥版《百万英镑》餐厅结账重制项目的参考边界裁定（scene-reference-decider）。确定为混合参考（hybrid_reference），以电影《百万英镑》餐厅结账冲突与空间结构为主参考，以《马大帅》彪哥系列角色与东北喜剧有梗元素为辅助参考，梳理了明确的保留、替换与规避边界。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”。"
      reference_type: hybrid_reference
      decision_summary: "物理空间、冲突骨架与视听节奏继承自《百万英镑》；人物原型、服装特色与支付媒介继承自《马大帅》彪哥系列梗。"
      reference_boundary:
        primary_reference: "电影《百万英镑》餐厅结账结构"
        secondary_reference: "《马大帅》彪哥系列角色与东北喜剧有梗元素"
        boundary_rule: "以古典英国餐厅为不变物理时空，将彪哥及其相关人际冲突引入并进行跨界卡通电影化转译，替换原版英国绅士与侍应生，最后以猎枪走火的卡通粉尘效果收官。"
        allowed_inheritance:
          - 剧情骨架
          - 情绪核心
          - 场景气质
          - 镜头动势
        forbidden_inheritance:
          - 角色身份
          - 服装轮廓
          - 标志道具
      must_keep:
        - category: 剧情骨架
          note: "必须保留‘大口进食吃面 -> 傲慢催账 -> 亮卡反转 -> 90度鞠躬送客’的冲突与结构。"
        - category: 场景气质
          note: "必须保留1903年古典英式茶室的木质装潢、白色台布和挂钟秒针滴答声等视听空间设定。"
        - category: 标志道具
          note: "必须保留大口吸面、面饼擦碗底细节，以及作为反转核心的‘开原维多利亚大饭店钻石VIP黑卡’。"
        - category: 情绪核心
          note: "必须保留由巨额财富误会带来的180度大谄媚反转。"
      must_avoid:
        - category: 角色身份
          note: "严禁照搬原片英国绅士亨利、男招待弗罗斯特和经理，彻底替换为彪哥、吴总与阿刚。"
        - category: 服装轮廓
          note: "严禁让彪哥穿着英式大衣，必须保留皮夹克加红领POLO衫、金链子与金丝蛤蟆镜；经理吴总需穿着带大金表的中式西服。"
        - category: 标志道具
          note: "严禁照搬原版百万英镑支票；严禁发生有真实人身伤害的枪击，走火必须是纯卡通白灰糊脸。"
      source_intake_reference_use:
        source_intake_used: true
        files_read:
          - "assets/source-materials/million-pound-note/source-card.md"
          - "assets/source-materials/million-pound-note/structure-analysis.md"
          - "assets/source-materials/million-pound-note/adaptation-angles.md"
          - "assets/source-materials/million-pound-note/safety-boundaries.md"
        inherited_core: "态度大转弯冲突结构，古典英式餐厅空间，吃面与店家冷眼对峙"
        inherited_highlights: "挂钟滴答声特写，下巴脱臼震惊定格，双排对称鞠躬送客"
        rewritten_or_replaced: "主角亨利替换为彪哥，支票替换为维多利亚黑卡，经理小二替换为吴总与阿刚，吃土豆老头替换为吃地瓜的马大帅，新增大花布包长猎枪"
        avoid_copying: "避开原片绅士腔对白，猎枪走火避开写实流血或打破人头，改用天花板白灰扑脸的卡通无伤形式"
      risk_notes:
        - "彪哥吃大葱蘸酱面用筷子的粗俗喜感需用精致英伦背景衬托，不能流于低俗搞笑，必须通过彪哥的一本正经（Deadpan）和店方的惊恐来拔高荒诞幽默。"
      next_action: "进入 scene-story-development 阶段，首先制定 4-8 个 Story Beat 故事骨架。"
  - patch_type: scene-story-development
    version: 1
    status: completed
    updated_at: "2026-06-03T17:16:00+08:00"
    summary: "已完成故事骨架开发阶段。设计了9段共90秒的完整故事骨架，确定全员对话采用东北方言，并锁定彪哥大葱吸面、大花布长枪走火和维多利亚黑卡反转等看点。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾；全员使用东北方言对话。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”；全员使用地道东北方言，制造英伦背景与东北话的极限喜剧反差。"
      story_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户确认9个节拍共90秒故事骨架，并特别要求对话全员使用东北方言。"
      story_development_summary: "以东北方言和角色反转为驱动，通过9段式故事骨架（90秒）完成窗外徘徊、局促入店、小二带位、大口吃面、面饼擦碗、拍桌逼债、出卡亮底、经理跪验以及走火礼炮送客的完整喜剧叙事。"
      logline: "身穿皮夹克、戴墨镜的彪哥背着破布包，在奢华英式茶室里吃大葱蘸酱面。面对经理吴总和阿刚的东北话逼债，他亮出一张‘开原维多利亚大饭店钻石黑卡’引发财富误会免单，出门时猎枪落地走火轰碎吊灯，漫天白灰给经理小二糊脸，彪哥淡定称其为‘开业礼炮’大步出门。"
      story_premise: "英国近代精致拜金主义与中国东北乡土幽默方言 the 降维碰撞，由财富误会驱动，由猎枪走火达到喜剧Payoff。"
      duration_target:
        target_total_duration_seconds: 90
        rationale: "包含丰富的入店、吃面密谋、大葱蘸酱及走火糊脸的动作和镜头细节，扩展至9个10秒段落，能保证戏剧和动作视听的饱满度。"
      story_beats:
        - beat_id: "B01"
          title: "窗外犹豫"
          function: "setup"
          beat_summary: "彪哥在寒风中缩肩、推了推蛤蟆镜，透过结霜玻璃窗张望高档茶室。他肚子咕噜直叫，摸了慢衣袖的破夹子和背上用花布裹着的长枪，嘀咕着：‘人活一张脸，树活一张皮，咔咔就是整！’推门进去。"
          emotion_goal: "建立落魄主人公与华丽背景的强烈对比"
          dramatic_question: "这个打扮怪异的东方来客是否有勇气进入茶室？"
          payoff_seed: "背负的花布包袱猎枪"
        - beat_id: "B02"
          title: "局促入店"
          function: "setup"
          beat_summary: "彪哥大步跨入，背着长枪有些碍手碍脚。前台的吴总拨着算盘，朝阿刚使了个眼色：‘阿刚，瞅瞅那人，整个儿一地痞流氓，别让他占咱便宜。’阿刚撇嘴，神色傲慢地迎上去。"
          emotion_goal: "强化环境与角色落魄的违和压迫感"
          dramatic_question: "店家会把他当场轰出去吗？"
          payoff_seed: "柜台吴总与阿刚的嫌弃注视"
        - beat_id: "B03"
          title: "引至角落"
          function: "setup"
          beat_summary: "阿刚拦住路，操着带洋腔的东北话将彪哥引向最阴暗狭窄的角落圆桌，甩下菜单。彪哥大度合十坐下：‘妥了，就这儿吧，安静。’"
          emotion_goal: "展现商家的势利对待，彪哥的强作冷静"
          dramatic_question: "彪哥是否会因为偏僻位置而局促？"
          payoff_seed: "甩菜单的轻蔑态度"
        - beat_id: "B04"
          title: "大口吸面"
          function: "setup"
          beat_summary: "一碗面条和一盘大葱蘸酱上桌。彪哥拿起竹筷吸面，呼噜呼噜吸出重影，还就着大葱嘎嘎大咬。柜台前吴总直皱眉：‘阿刚，去给他少放俩菜叶子，省点儿成本。’"
          emotion_goal: "极度饿相与精致餐馆的滑稽违和"
          dramatic_question: "阿刚和吴总会因为彪哥吃相产生什么算计？"
          payoff_seed: "柜台前的克扣算计"
        - beat_id: "B05"
          title: "面饼擦底"
          function: "setup"
          beat_summary: "彪哥连最后一根葱也吃完了，拿出一块大饼，在碗里转圈圈把汤汁圈擦得锃亮塞嘴里。陶碗反光折射出走来的阿刚那张傲慢的脸。邻桌的马大帅吃着地瓜，叹气嘀咕：‘这败家子德彪，到哪儿都把盘子舔得比猫舔的都干净！’"
          emotion_goal: "极致吃相引起的尴尬与马大帅的现实吐槽"
          dramatic_question: "阿刚看到比洗了还干净的碗会说什么？"
          payoff_seed: "碗底的反射影"
        - beat_id: "B06"
          title: "拍桌逼债"
          function: "crisis"
          beat_summary: "阿刚把天价账单啪地拍在桌上。吴总大步过来猛拍桌布：‘怎么地？没钱还敢来这儿大吃大喝？瞧见那钟没有？麻溜结账，别跟这儿扯犊子！’大钟秒针嘀嗒作响，空气死静。"
          emotion_goal: "高压逼债下的戏剧张力和滑稽逼视"
          dramatic_question: "彪哥身无零钱，如何化解逼账？"
          payoff_seed: "大金表与重拍的响度"
        - beat_id: "B07"
          title: "黑卡初露"
          function: "misdirection"
          beat_summary: "彪哥淡然一笑，单手一推墨镜：‘别急啊，差不了你的。’从兜里摸出黄纸信封，平铺在台布上，徐徐抽出一张黑色卡片的一角，卡片在吊灯下折射出一道亮眼的霓虹金光。"
          emotion_goal: "暴风雨前的平静，大招憋出时的视觉蓄力"
          dramatic_question: "信封里掏出的黑卡能有什么名堂？"
          payoff_seed: "抽出一半的黑金字样"
        - beat_id: "B08"
          title: "圣光滑跪"
          function: "reveal"
          beat_summary: "彪哥完全展平黑卡，‘开原维多利亚’金色字体爆发温暖体积光。阿刚吓得下巴瞬间脱臼砸在胸口；吴总眼镜震飞翻转，拿着放大镜筛糠般发抖：‘维多利亚……至尊钻石卡？！哎呀妈呀，这是皇家特使！’两人当场瘫软下跪，碎步哈腰免单。"
          emotion_goal: "极度惊愕引发的疯狂滑稽谄媚"
          dramatic_question: "贪财的吴总和阿刚如何应对这位‘特工财阀’？"
          payoff_seed: "黑卡上保卫科长的双关误会"
        - beat_id: "B09"
          title: "礼炮送客"
          function: "payoff"
          beat_summary: "吴总和阿刚在门口双排对称90度深鞠躬。彪哥出门想拧身摆个经典保卫科长军礼，结果背后花布滑落，猎枪掉地走火轰击天花板！白灰砸落把吴总和阿刚糊成白面脸（Soot face）。彪哥吹吹枪口烟，淡定称：‘开业礼炮，挺响！不用送了啊！’走起彪式碎步。马大帅拍着身上的灰大喊：‘德彪，你咋把村头鸟枪也带出来了！’"
          emotion_goal: "大快人心的谄媚Payoff，猎枪走火的动作喜剧震撼"
          dramatic_question: "彪哥能顺利大步离开茶室吗？"
          payoff_seed: "白灰脸和彪哥的swagger走姿"
      character_functions:
        - character_name: "彪哥"
          story_function: "扮猪吃老虎的隐秘大佬。满嘴东北嗑，一本正经搞怪，身携惊世黑卡与走火猎枪。"
          conflict_role: "吃面大王，被迫用巨额黑卡降维打击店家"
          emotional_task: "从饥饿淡定到亮卡高傲，再到开枪后的强行淡定"
        - character_name: "吴总"
          story_function: "嫌贫爱富经理。带大金表，中式西装，负责从拍桌威胁到惊恐滑跪的180度反差。"
          conflict_role: "逼债者，反转后变成最卑微的谄媚者"
          emotional_task: "从高傲威胁到惊恐颤抖，最后大拍马屁"
        - character_name: "阿刚"
          story_function: "市侩傲慢小二。看人下菜碟，催账打手，卡通下巴脱臼担当。"
          conflict_role: "带位与拍账单的直接挑衅者"
          emotional_task: "从白眼轻视到下巴脱臼震惊，最后碎步哈腰"
        - character_name: "马大帅"
          story_function: "邻桌地瓜食客，彪哥的现实克星与吐槽官。"
          conflict_role: "旁观者，打破彪哥英伦装腔的外化锚点"
          emotional_task: "从对彪哥的嫌弃，到吃瓜震惊，最后在灰尘中大喊大叫"
      core_scene_functions:
        - scene_name: "1903古典英式高级茶室"
          story_function: "古典精致的西式物理空间，与大葱吃相、大花布猎枪、东北话对峙形成极大的文化空间冲突力。"
          required_beats:
            - "B01"
            - "B02"
            - "B03"
            - "B04"
            - "B05"
            - "B06"
            - "B07"
            - "B08"
            - "B09"
      key_prop_functions:
        - prop_name: "开原维多利亚大饭店至尊钻石黑卡"
          story_function: "等价于百万英镑支票。印有维多利亚与保卫科长粗黑字，金光闪耀，成为引起吴总误会的道具。"
          required_beats:
            - "B07"
            - "B08"
            - "B09"
        - prop_name: "东北花布包裹的长杆猎枪"
          story_function: "彪哥背在背上的伏笔道具，结局走火造成吊灯损毁与石膏灰糊脸，达到卡通喜剧高潮。"
          required_beats:
            - "B01"
            - "B02"
            - "B09"
        - prop_name: "大葱、面条与陶碗"
          story_function: "展示吃相与碗底镜面反射 of 物理道具。"
          required_beats:
            - "B04"
            - "B05"
      emotional_arc: "饥寒迟疑 -> 傲然落座 -> 狂野吸面 -> 拍桌施压 -> 霓虹闪亮 -> 骨酥滑跪 -> 走火礼炮 -> 潇洒谢幕"
      hero_moment_candidates:
        - hero_id: "H01"
          title: "黑卡金光爆发，时空静止，秒针停摆"
          related_beat: "B08"
          reason: "维多利亚黑卡在奢华白台布上展开，爆发强烈霓虹体积光，大钟秒针静止，人声戛然而止，视听反差达到顶点。"
      ending_payoff: "吴总与阿刚对称大弯腰送客，彪哥枪支掉地走火轰碎吊灯，白粉白灰把经理小二糊成白脸，彪哥淡定救场称为开业礼炮并大步离店。"
      story_risk_notes:
        - "猎枪走火必须严格遵循卡通尺度（石膏尘土、白灰糊脸），切不可造成 any 伤亡或出血，走火瞬间应有明亮的滑稽音效降低现实危险感。"
      next_action: "进入 scene-asset-checker 阶段，检查彪哥皮夹克造型、吴总大金装造型、阿刚服务员造型、英式茶室及维多利亚黑卡等资产的复用或新建情况。"
  - patch_type: scene-asset-checker
    version: 1
    status: completed
    updated_at: "2026-06-03T17:17:00+08:00"
    summary: "已完成彪哥版《百万英镑》餐厅结账重制项目的资产检查阶段（scene-asset-checker）。确定直接复用已存在的 1903古典英式茶室（victorian-tea-room）场景资产，将角色彪哥、吴总、阿刚、马大帅以及核心道具维多利亚黑卡与包裹猎枪归入完整新建路径（new_full）。"
    data:
      story_function_summary:
        key_characters: "彪哥 (大葱吸面、亮卡主角), 吴总 (拍桌经理), 阿刚 (带位、拍账单小二), 马大帅 (吃烤地瓜吐槽食客)"
        key_scenes: "1903古典英式高级茶室 (唯一物理空间)"
        key_props: "开原维多利亚大饭店至尊钻石黑卡 (等价百万英镑支票), 东北花布包裹的长杆猎枪 (走火礼炮伏笔)"
      character_assets:
        - role_name: "彪哥"
          reuse_status: new_full
          asset_ref: ""
          reuse_reason: "资产库中无现成的‘彪哥皮夹克与墨镜’造型资产，需完整新建人物视觉特征与物理表现约束。"
          required_adjustments: []
        - role_name: "吴总"
          reuse_status: new_full
          asset_ref: ""
          reuse_reason: "资产库中无现成的‘吴总西装配金表’经理造型资产，需完整新建人物剧情动作与形变表现约束。"
          required_adjustments: []
        - role_name: "阿刚"
          reuse_status: new_full
          asset_ref: ""
          reuse_reason: "资产库中无现成的‘阿刚店小二’造型资产，且阿刚需承载下巴脱臼拉长等夸张物理形变，需完整新建。"
          required_adjustments: []
        - role_name: "马大帅"
          reuse_status: new_full
          asset_ref: ""
          reuse_reason: "资产库中无现成的‘马大帅地瓜食客’造型资产，需完整新建。"
          required_adjustments: []
      scene_assets:
        - scene_name: "1903古典英式高级茶室"
          reuse_status: reuse_direct
          asset_ref: "assets/scenes/victorian-tea-room.md"
          reuse_reason: "已存在的古典英式茶室资产在胡桃木装潢、三物理分区（Blocking Map）及灯光色彩预设上完全符合本项目场地不变的要求，可直接复用。"
          required_adjustments: []
      prop_assets:
        - prop_name: "开原维多利亚大饭店至尊钻石黑卡"
          prop_status: new_core_prop
          asset_ref: ""
          handling_note: "作为承载财富误会的关键道具，需单独建立核心道具卡设计其金色字体与PBR高光反射物理状态。"
        - prop_name: "东北花布包裹的长杆猎枪"
          prop_status: new_core_prop
          asset_ref: ""
          handling_note: "作为引发结局走火的关键物理伏笔道具，需单独建立核心道具卡设计其花布包裹状态与枪体走火状态。"
        - prop_name: "大葱、面条与陶碗"
          prop_status: embed_in_character_or_scene
          asset_ref: ""
          handling_note: "直接嵌入彪哥的角色设计卡和茶室场景中，不单独建立道具卡。"
        - prop_name: "烤地瓜 (红薯)"
          prop_status: embed_in_character_or_scene
          asset_ref: ""
          handling_note: "直接嵌入马大帅的角色设计卡中，不单独建立道具卡。"
      design_actions:
        reuse_targets:
          - "1903古典英式高级茶室"
        tweak_targets: []
        new_light_targets: []
        new_full_targets:
          - "彪哥"
          - "吴总"
          - "阿刚"
          - "马大帅"
          - "开原维多利亚大饭店至尊钻石黑卡"
          - "东北花布包裹的长杆猎枪"
      risk_notes:
        - "虽然场景直接复用，但结尾猎枪走火会破坏天花板石膏板并震落粉尘，需在设计阶段确保茶室包含可碎裂的天花板装饰吊顶资产。"
      next_action: "进入 scene-design-builder 阶段，正式为彪哥、吴总、阿刚、马大帅以及两个核心道具进行设定和 Midjourney/Flux prompt 的编写。"
  - patch_type: scene-design-builder
    version: 3
    status: completed
    updated_at: "2026-06-03T17:26:00+08:00"
    summary: "已完成彪哥版《百万英镑》餐厅结账重制项目的设计设定与 Prompt 编写阶段（scene-design-builder）。定义了项目统一视觉语言基线，启用了 v4 表现力动作喜剧策略，对彪哥、吴总、阿刚、马大帅及维多利亚黑卡、包裹猎枪六个资产建立了完整锁定设定与设定图生成 Prompts，并产出了全场景资产总参考图 Prompts。"
    data:
      design_mode: focus
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾；全员使用东北方言对话。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”；全员使用地道东北方言，制造英伦背景与东北话的极限喜剧反差。"
      design_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户明确确认采用“彪哥与维多利亚黑卡及走火猎枪”的设计方案，并允许大葱吸面Smear Frame和结尾走火Soot face糊脸。"
      story_design_mapping:
        beat_to_design_targets:
          - beat_id: "B01"
            related_characters: ["彪哥"]
            related_scenes: ["1903古典英式高级茶室"]
            related_props: ["东北花布包裹的长杆猎枪"]
          - beat_id: "B04"
            related_characters: ["彪哥", "吴总", "阿刚"]
            related_scenes: ["1903古典英式高级茶室"]
            related_props: ["大葱、面条与陶碗"]
          - beat_id: "B05"
            related_characters: ["彪哥", "阿刚", "马大帅"]
            related_scenes: ["1903古典英式高级茶室"]
            related_props: ["大葱、面条与陶碗", "烤地瓜 (红薯)"]
          - beat_id: "B08"
            related_characters: ["彪哥", "吴总", "阿刚"]
            related_scenes: ["1903古典英式高级茶室"]
            related_props: ["开原维多利亚大饭店至尊钻石黑卡"]
          - beat_id: "B09"
            related_characters: ["彪哥", "吴总", "阿刚", "马大帅"]
            related_scenes: ["1903古典英式高级茶室"]
            related_props: ["开原维多利亚大饭店至尊钻石黑卡", "东北花布包裹的长杆猎枪", "烤地瓜 (红薯)"]
      visual_language:
        shape_language_core: "几何概括与识别度优先。彪哥为圆角矩形，马大帅为向下微弯的梯形，吴总为下坠圆形，阿刚为倒三角与细线。"
        silhouette_anchors: "彪哥的垫肩皮夹克与大背头，阿刚高耸的细长肩膀，吴总挺拔的圆形啤酒肚，马大帅微驼的背影与手拿红薯。"
        proportion_strategy: "3D Pixar 卡通风格，头身比控制在 5 到 5.5，肢体比例适当夸张以支持动画效果。"
        material_strategy: "卡通几何体配写实微瑕 PBR 材质（例如仿皮裂纹、金属拉丝划痕、算盘玉石反光、大花布粗粝线头）。"
        color_script: "进餐逼债期为橘黄壁灯与冷蓝窗光低照度对峙；黑卡亮底期为漫金黄色体积圣光漫天；走火期为半透明柔和白色云雾状石膏粉尘。"
        environment_stylization: "复用 1903 维多利亚茶室，在此基础上天花板设计精美石膏雕花线与黄铜水晶吊灯，以支撑走火破坏效果。"
        prop_exaggeration_rule: "道具角色化。维多利亚黑卡突出亮黑色塑料反射卡面与烫金金箔字；猎枪大花布包极度鲜艳，掉地走火时喷出完美滑稽烟圈。"
      expressive_animation_design:
        enabled: true
        mode: animated_feature_comedy
        asset_references:
          effect_library: assets/animation-stylization/effect-library.md
          contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
        animation_stylization:
          level: expressive
          preset: animated_feature_expressive
          effect_density: medium
          density_rule: hero_moment_and_high_risk_translation_only
          allowed_physics:
            - squash_stretch
            - elastic_rebound
            - smear_motion
          selective_physics:
            - impact_flattening
            - wall_splat
            - paper_flatten
          forbidden_physics:
            - body_horror_deformation
            - realistic_injury_deformation
        injury_tone_policy:
          visible_injury_level: minor_cartoon
          allowed_minor_injuries:
            - soot_face
            - dust_face
            - bump_on_head
            - small_scratch
            - nosebleed_gag
          forbidden_injuries:
            - large_blood_loss
            - graphic_wounds
            - gore
            - realistic_weapon_wound
            - realistic_bullet_wound
            - prolonged_pain_focus
          restore_character_integrity_after_gag: true
        contrast_comedy:
          enabled: selective
          contrast_density: low_to_medium
          core_contrast_types:
            - size_mismatch
            - prop_scale_irony
            - personality_gap
          max_core_contrasts_per_project: 2
          max_hero_contrast_per_segment: 1
          tonal_boundary:
            preserve_character_consistency: true
            contrast_must_serve_story_or_character: true
            avoid_random_meme_stack: true
        design_notes_for_downstream:
          script_adapter: "将东北话台词与视觉反差（如吃大葱面与大花布猎枪）融入90秒剧本结构。"
          performance_director: "彪哥死鱼脸一本正经防卫动作与阿刚下巴脱臼拉长形变、吴总发抖核验对切。"
          storyboard_director: "吸面特写、拍桌茶匙起跳、黑卡圣光低仰拍、猎枪落地走火白灰糊脸的滑稽构图。"
          video_prompt_builder: "继承视觉语言中的仿皮夹克、金表反光、黑卡圣光体积感、走火白粉糊脸（Soot Face）以及东北大花布材质描写。"
      character_designs:
        - name: "彪哥"
          reference_strength: "medium_anchor"
          asset_strategy: "new_full"
          lock_card_file: "projects/million-pound-biao/details/character_design_v1.0.md"
          prompt_file: "projects/million-pound-biao/outputs/design_prompts/character_prompts_v1.0.md"
          sheet_requirements:
            views: ["front", "3/4 side", "back"]
            expression_count: 3
            action_pose_count: 3
            prop_interaction_required: true
            scale_comparison_required: true
            safety_boundary_required: true
        - name: "马大帅"
          reference_strength: "medium_anchor"
          asset_strategy: "new_full"
          lock_card_file: "projects/million-pound-biao/details/character_design_v1.0.md"
          prompt_file: "projects/million-pound-biao/outputs/design_prompts/character_prompts_v1.0.md"
          sheet_requirements:
            views: ["front", "3/4 side", "back"]
            expression_count: 3
            action_pose_count: 3
            prop_interaction_required: true
            scale_comparison_required: true
            safety_boundary_required: true
        - name: "吴总"
          reference_strength: "medium_anchor"
          asset_strategy: "new_full"
          lock_card_file: "projects/million-pound-biao/details/character_design_v1.0.md"
          prompt_file: "projects/million-pound-biao/outputs/design_prompts/character_prompts_v1.0.md"
          sheet_requirements:
            views: ["front", "3/4 side", "back"]
            expression_count: 3
            action_pose_count: 3
            prop_interaction_required: true
            scale_comparison_required: true
            safety_boundary_required: true
        - name: "阿刚"
          reference_strength: "medium_anchor"
          asset_strategy: "new_full"
          asset_strategy: "new_core_prop"
          lock_card_file: "projects/million-pound-biao/details/prop_design_v1.0.md"
          prompt_file: "projects/million-pound-biao/outputs/design_prompts/prop_prompts_v1.0.md"
          state_machine_id: "prop-victoria-card"
        - name: "东北花布包裹的长杆猎枪"
          asset_strategy: "new_core_prop"
          lock_card_file: "projects/million-pound-biao/details/prop_design_v1.0.md"
          prompt_file: "projects/million-pound-biao/outputs/design_prompts/prop_prompts_v1.0.md"
          state_machine_id: "prop-wrapped-shotgun"
      master_scene_prop_reference:
        enabled: true
        prompt_file: "projects/million-pound-biao/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
        includes:
          - main_scene_layout
          - character_blocking
          - key_prop_positions
          - prop_state_matrix
          - physical_safety_notes
          - expressive_animation_notes
      prop_state_machines:
        - prop_name: "开原维多利亚大饭店至尊钻石黑卡"
          states:
            - state_id: "State_In_Wallet"
              description: "折叠在发黄信封里插在脏皮夹内"
              visible_evidence: "无可见特征"
              allowed_interaction: "彪哥拿手捂住皮夹子"
              safety_boundary: "安全"
            - state_id: "State_Revealing"
              description: "彪哥从信封徐徐抽出一角"
              visible_evidence: "吊灯下一道霓虹金光闪耀星芒"
              allowed_interaction: "彪哥单手压信封，吴总阿刚伸长脖子"
              safety_boundary: "安全"
            - state_id: "State_Unfolded_Glow"
              description: "卡片在白棉布台面上完全平铺"
              visible_evidence: "爆发出漫金色体积圣光，空气微尘飘动，挂钟秒针停摆"
              allowed_interaction: "吴总双手发抖持放大镜核验，阿刚震惊下巴脱臼"
              safety_boundary: "体积金光不得刺眼伤人，大钟秒针静止"
        - prop_name: "东北花布包裹的长杆猎枪"
          states:
            - state_id: "State_Wrapped_On_Back"
              description: "由东北红绿牡丹花布裹紧斜跨背负"
              visible_evidence: "露出圆柱状花布长包，枪身轮廓模糊"
              allowed_interaction: "彪哥大步跨行，大包袱随身体摆动"
              safety_boundary: "安全"
            - state_id: "State_Falling"
              description: "彪哥拧身起范儿时布包松脱坠地"
              visible_evidence: "大花布在空中散开呈波浪状，露出拉丝黑铁双枪管和枪托，重影坠地"
              allowed_interaction: "枪支在物理坠地中，吴总和阿刚注视"
              safety_boundary: "安全"
            - state_id: "State_Misfire"
              description: "枪托触地触发走火，轰击天花板"
              visible_evidence: "砰地大响，枪口喷出圆润青烟圈，天花板吊灯碎裂，石膏白灰大片呈蓬松云雾状洒下"
              allowed_interaction: "彪哥迅速捡起枪大花布包回，吴总和阿刚在灰雾中变白粉脸"
              safety_boundary: "走火声音应为滑稽爆裂音，石膏落灰属于卡通无伤，严禁任何流血或身体创伤"
      blocking_map:
        spatial_axis: "X轴横向布局（左柜台，中大门，右卡座）"
        zones:
          - zone_id: "Zone B"
            description: "左侧收银柜台区，由店方把守，摆有算盘和账本"
            allowed_characters: ["吴总", "阿刚"]
            forbidden_characters: ["彪哥"]
          - zone_id: "Zone A"
            description: "中央大门与大钟区，走火礼炮点及对称鞠躬送客区"
            allowed_characters: ["彪哥", "吴总", "阿刚", "马大帅"]
            forbidden_characters: []
          - zone_id: "Zone C"
            description: "右侧靠窗餐桌区，彪哥吃面坐席，圣光爆发核心区，马大帅邻桌常驻"
            allowed_characters: ["彪哥", "马大帅", "阿刚", "吴总"]
            forbidden_characters: []
        continuity_rule: "从镜头直视视角看，账台必须在左（Zone B），餐桌卡座必须在右（Zone C），黄铜壁钟绝对挂在中央正门上方（Zone A）。"
      faction_layout:
        factions:
          - faction_id: "Customer_Faction"
            members: ["彪哥", "马大帅"]
            default_zone: "Zone C"
            forbidden_zones: ["Zone B"]
          - faction_id: "Shop_Faction"
            members: ["吴总", "阿刚"]
            default_zone: "Zone B"
            forbidden_zones: []
      visual_consistency:
        character_anchor_note: "彪哥黑色人造革夹克拉反射、红领POLO衫竖起、大链子和大蛤蟆镜；马大帅灰色粗麻衫与大红薯；阿刚侍应生制服配歪领结；吴总大金表金属反射。"
        scene_anchor_note: "复用 victorian-tea-room.md 胡桃木墙板哑光漫反射，罗马数字黄铜大挂钟，白桌布纹理。"
        material_anchor_note: "彪哥黑色皮衣皮革纹，红薯白气蒸汽体积，黑卡金色烫金字镜面黑，猎枪黑铁拉丝，大花布粗织布料。"
        blocking_anchor_note: "保持左收银柜台、中央正门挂钟、右靠窗圆桌餐椅的左右方向物理连续性。"
        prop_state_anchor_note: "维多利亚黑卡经历皮夹态、半露金光态、圣光爆开态变化；猎枪经历背负大花布态、松落坠地态、走火白粉糊脸态变化。"
        expressive_animation_anchor_note: "吃面面条弹性抖动与重影Smear Frame；阿刚下巴脱臼拉长（Jaw-drop）；吴总滑跪果冻状冷汗珠；走火吊灯震荡摇晃，白色石膏灰半透明蓬松云雾（Soot face白粉脸）。"
      script_adaptation_notes: "剧本描述中必须体现彪哥的皮夹克墨镜造型、用筷子吃大葱面面饼圈擦碗底的动作、掏黑卡的霓虹金光爆发、阿刚下巴拉伸脱臼的卡通表情、双鞠躬送客、以及背后猎枪落地走火轰天花板吊灯白灰糊脸的动作喜剧高潮，且全员使用地道东北方言对话。"
      next_action: "进入 scene-script-adapter 阶段，正式将故事骨架与设计约束转译为 90 秒的正式东北话剧本文件与 Story Beat 详细动作设计。"
  - patch_type: scene-script-adapter
    version: 4
    status: completed
    updated_at: "2026-06-03T17:35:00+08:00"
    summary: "已完成剧本改编阶段（scene-script-adapter），正式落盘 details/script_v1.0.md。剧本规定全片共9个10秒分段，全员采用地道东北方言。识别了吸面Smear Frame和走火糊白脸等卡通动作与轻度伤害表现力机会，并将项目状态推进至 script_ready。"
    data:
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾；全员使用东北方言对话。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”；全员使用地道东北方言，制造英伦背景与东北话的极限喜剧反差。"
      script_confirmation:
        confirmed_by_user: true
        confirmation_note: "用户确认剧本方案，同意 partial_rewrite 档位与 exaggerated_comedy 风格，90秒时长及分段合理。"
      adaptation_level: "partial_rewrite"
      performance_style: "exaggerated_comedy"
      target_total_duration_seconds: 90
      segment_strategy:
        segment_duration_seconds: 10
        segment_count: 9
        segmentation_mode: "uniform"
        rationale: "均匀划分9个10秒分段，完全映射9个Story Beat叙情节拍，保证镜头连续性。"
      expressive_animation_inheritance:
        enabled: true
        source: "PROJECT_BOARD.expressive_animation"
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
        asset_references:
          effect_library: "assets/animation-stylization/effect-library.md"
          contrast_comedy_library: "assets/animation-stylization/contrast-comedy-library.md"
      script_summary: "彪哥背着红绿大花布裹着的猎枪在英伦茶室狂吸大葱面，面对店家逼债，掏出开原维多利亚黑卡，金光圣光闪烁引发误会，免单送客时长枪落地走火轰天花板，落灰白粉糊了经理吴总和小二阿刚满脸，彪哥淡定救场大步迈出门去。"
      script_source_mode: "rewrite_adaptation"
      preserved_elements:
        - category: "剧情骨架"
          note: "吃面-催账-亮卡-反转谄媚送客的经典戏剧线完全保留。"
        - category: "情绪核心"
          note: "财富误会带来的180度滑稽大转弯冲突。"
        - category: "空间调度"
          note: "1903英式茶室物理空间与大挂钟滴答声。"
      rewritten_elements:
        - category: "角色替换"
          note: "亨利/经理/侍应生彻底替换为彪哥/吴总/阿刚/马大帅。"
        - category: "道具替换"
          note: "百万英镑支票替换为开原维多利亚黑卡，大餐替换为陶碗大葱面，大衣替换为皮夹克，追加裹长枪。"
        - category: "对白设计"
          note: "全员使用生动、原汁原味的东北方言口语对白。"
        - category: "喜剧高潮"
          note: "新增猎枪走火、石膏落灰糊白面脸（Soot Face）的卡通无伤喜剧Payoff。"
      story_beats:
        - beat_id: "B01"
          title: "窗外犹豫"
          function: "setup"
          beat_summary: "大雪天彪哥推蛤蟆镜望向高雅茶室，紧了紧大花布长枪，咬牙咔咔就是整入店。"
          emotion_goal: "对比感"
          dramatic_question: "这个怪异来客敢入店吗？"
          target_duration_seconds: 10
          payoff_seed: "背负的猎枪"
        - beat_id: "B02"
          title: "局促入店"
          function: "setup"
          beat_summary: "彪哥走彪式碎步，长枪轻磕门框，柜台吴总吩咐阿刚盯防流氓。"
          emotion_goal: "偏见"
          dramatic_question: "店家会驱逐他吗？"
          target_duration_seconds: 10
          payoff_seed: "枪身磕碰"
        - beat_id: "B03"
          title: "引至角落"
          function: "setup"
          beat_summary: "阿刚甩脏抹布用洋腔东北话把彪哥引向最偏僻小圆桌摔菜单，彪哥大度坐下。"
          emotion_goal: "轻慢"
          dramatic_question: "彪哥会因此窘迫吗？"
          target_duration_seconds: 10
          payoff_seed: "菜单重摔"
        - beat_id: "B04"
          title: "大口吸面"
          function: "setup"
          beat_summary: "大碗面与大葱上桌，彪哥竹筷疯狂吸面拉出重影，大嚼大葱，吴总算计省菜叶，马大帅邻桌斜眼看。"
          emotion_goal: "滑稽违和"
          dramatic_question: "吃相会引发店方什么反应？"
          target_duration_seconds: 10
          payoff_seed: "少放菜叶"
        - beat_id: "B05"
          title: "面饼擦底"
          function: "setup"
          beat_summary: "彪哥干饼擦净碗底打响嗝，碗底如镜照出逼近的阿刚，马大帅无情吐槽败家子。"
          emotion_goal: "尴尬吐槽"
          dramatic_question: "阿刚看到比洗了还干净的盘子会有何举动？"
          target_duration_seconds: 10
          payoff_seed: "白光一闪反射面"
        - beat_id: "B06"
          title: "拍桌逼债"
          function: "crisis"
          beat_summary: "阿刚拍天价账单，吴总挺大肚拍桌催账，茶匙震起，大钟滴答被放大。"
          emotion_goal: "压迫感"
          dramatic_question: "彪哥身无分文如何接招？"
          target_duration_seconds: 10
          payoff_seed: "大金表晃光"
        - beat_id: "B07"
          title: "黑卡初露"
          function: "misdirection"
          beat_summary: "彪哥推眼镜死鱼脸，牛皮信封露卡一角，在壁灯下激出一道金色星芒。"
          emotion_goal: "期待起伏"
          dramatic_question: "信封里到底是什么？"
          target_duration_seconds: 10
          payoff_seed: "霓虹金光"
        - beat_id: "B08"
          title: "圣光滑跪"
          function: "reveal"
          beat_summary: "至尊钻石卡亮出，漫天体积金光，秒针卡死，阿刚下巴脱臼，吴总拿着放大镜筛糠滑跪免单。"
          emotion_goal: "极度谄媚"
          dramatic_question: "店家能识破跨国误会吗？"
          target_duration_seconds: 10
          payoff_seed: "维多利亚金字"
        - beat_id: "B09"
          title: "礼炮送客"
          function: "payoff"
          beat_summary: "店家大门对称90度深鞠躬，彪哥起范敬礼，背后猎枪坠地走火轰烂吊灯，白粉白灰把吴总阿刚糊成白灰白脸，彪哥称其为开业礼炮碎步swagger出门，马大帅吐槽带鸟枪。"
          emotion_goal: "喜剧巅峰"
          dramatic_question: "彪哥能成功离去吗？"
          target_duration_seconds: 10
          payoff_seed: "白灰糊脸"
      expressive_beat_opportunities:
        - beat_id: "B04"
          opportunity_type: "stylized_action"
          original_beat: "狂野吃面"
          proposed_expression: "吸面时面条拉出Smear Frame重影，脸颊卡通充气鼓胀。"
          emotional_function: "滑稽"
          comedic_function: "夸张形变"
          safety_or_tonal_note: "沾汤汁与大葱仅限嘴边卡通渲染，无写实污物。"
          downstream_owner: "scene-performance-director"
        - beat_id: "B08"
          opportunity_type: "combined"
          original_beat: "圣光滑跪"
          proposed_expression: "黑卡金光漫射，大钟秒针静止；阿刚下巴脱臼拉长（Jaw Drop）；吴总滑跪果冻冷汗。"
          emotional_function: "震撼反差"
          comedic_function: "高潮反转"
          safety_or_tonal_note: "阿刚下巴在B09必须复原，禁止骨折或肉体伤害。"
          downstream_owner: "scene-performance-director"
        - beat_id: "B09"
          opportunity_type: "minor_cartoon_injury"
          original_beat: "走火糊脸"
          proposed_expression: "枪托着地走火喷烟圈，天花板吊灯白灰倾泻，吴总阿刚盖上白灰落灰图层（Soot Face）。"
          emotional_function: "滑稽释放"
          comedic_function: "戏剧收尾"
          safety_or_tonal_note: "石膏落灰纯属卡通无伤，严禁任何流血、起火或爆破真实伤害。"
          downstream_owner: "scene-performance-director"
      stylized_action_opportunities:
        - beat_id: "B04"
          scene_trigger: "大口吃葱面"
          original_action_or_risk: "吞咽大葱和面条"
          proposed_animation_translation: "竹筷吸面重影Smear Frame，咀嚼面颊像气球一样极速缩放"
          recommended_animation_level: "expressive"
          recommended_effect_combo: "motion_blur + facial_stretch"
          injury_tone: "minor_cartoon"
          safety_note: "无烫伤或窒息风险"
        - beat_id: "B09"
          scene_trigger: "猎枪掉落走火"
          original_action_or_risk: "枪支触地走火，吊灯砸落天花板破裂"
          proposed_animation_translation: "枪身散开花布，枪托着地反弹，喷出滑稽青烟圈，天花板坠落石膏粉"
          recommended_animation_level: "expressive"
          recommended_effect_combo: "smoke_rings + ceiling_fracture + plaster_cloud"
          injury_tone: "minor_cartoon"
          safety_note: "石膏粉落灰无害，眼睛留空"
      contrast_opportunities:
        - beat_id: "B04"
          contrast_type: "personality_gap"
          setup_expectation: "精致西式高雅下午茶室的古典就餐"
          payoff_reveal: "彪哥大吃大葱蘸酱面与大嚼嘎嘎响的大葱，邻桌马大帅吃烤地瓜"
          emotional_function: "雅俗极限降维"
          comedic_function: "身份与环境反差"
          use_template: "size_mismatch"
          avoid_repetition_note: "此反差仅做静态就餐渲染，不与亮卡冲突"
        - beat_id: "B08"
          contrast_type: "prop_scale_irony"
          setup_expectation: "一张破信封里拿出的垃圾黄纸"
          payoff_reveal: "亮出闪耀至尊金光的维多利亚黑卡，经理误认为英国皇室至尊钻石黑卡"
          emotional_function: "大反转"
          comedic_function: "财富误会"
          use_template: "personality_gap"
          avoid_repetition_note: "秒针停摆和圣光爆发做视听爆发"
      hero_moment_candidates:
        - hero_id: "H01"
          title: "黑卡金光爆发，时空静止，秒针停摆"
          related_beat: "B08"
          reason: "卡面烫金字体积圣光漫天，大钟秒针静止，将冲突推至喜剧最顶点。"
          visual_payoff: "金光将右侧照亮，与左侧的昏暗形成戏剧光影对切。"
        - hero_id: "H02"
          title: "走火礼炮，漫天粉尘白灰糊脸"
          related_beat: "B09"
          reason: "结局荒诞Payoff，经理小二瞬间化为白灰落灰妆（Soot Face），大吼大叫大怒形成反差。"
          visual_payoff: "乳白色烟雾环绕门口，与红绿大花布、黑铁枪身以及吴总和阿刚的黑色西服对比鲜明。"
      script_file: "projects/million-pound-biao/details/script_v1.0.md"
      performance_handoff:
        acting_note: "彪哥在全片中必须保持死鱼脸（Deadpan），强作大尾巴狼的自信，开枪走火后眼神有一瞬的心虚凸出；吴总从嫌弃、拍桌的暴怒，180度滑跪，再到满脸白灰时的咳嗽大骂；阿刚极力表现狗仗人势的傲慢，亮卡后配合下巴脱臼展现失控惊骇。"
        micro_expression_note: "吸面时彪哥嚼大葱的双颊卡通急速耸动；亮卡时吴总瞳孔缩成针尖并疯狂晃动；走火后两人白灰脸上只露出滑稽大眼睛眨动。"
        pause_note: "B08亮卡时秒针停摆，配合1-2秒的环境绝对静音，然后是吴总惊天动地的大嗓门喊哎呀妈呀；走火瞬间有0.5秒枪响后的静止，再是石膏落灰 and 马大帅的怒吼。"
        character_reaction_note: "马大帅作为吐槽担当，全片斜眼嫌弃地看德彪装腔作势，咬烤红薯；走火被淋了一身白灰后当场破功对德彪大骂。"
        expressive_animation_note: "继承B04吃面重影Smear Frame和B08阿刚下巴脱臼（Jaw Drop）。"
        contrast_performance_note: "将高雅茶室精致对白与全东北话“别跟这儿扯犊子”、“咔咔就是整”在表演语调中推向反差机制。"
        injury_reaction_note: "糊灰糊脸后吴总阿刚连打喷嚏，拍拍衣服腾起卡通灰圈，无任何疼痛感。"
      storyboard_hints:
        pacing_note: "前30秒节奏相对徐缓局促，吃面30-50秒带有一种狂野的狼吞虎咽速度感，50-60秒逼债进入紧张的滴答声催逼，60-80秒随着圣光爆发 and 滑跪达到视听张力顶点，最后80-90秒走火石膏漫天形成视觉爆发与快速拉开远景防送客。"
        visual_escalation_note: "从前期的昏暗橘黄煤气灯，到中期的漫天金色圣光爆发，再到最后的乳白色粉尘弥漫，视觉基调分三个阶段推进。"
        shot_priority_note: "B04吸面低空特写、B05碗底镜面反射面部特写、B08黑卡微距特写与大金表核验、B09猎枪掉落的物理坠落重影与石膏崩落全景。"
        bridge_shot_need: "B01向B02过渡时，用彪哥推门而入、风铃叮当的越轴切入；B08向B09过渡时，从滑跪特写拉开到大门口并排站立的全身鞠躬镜头。"
        blocking_note: "左柜台Zone B，中大门口Zone A，右餐桌Zone C。摄影机水平横移为主，严禁随意转角越轴。"
        prop_state_note: "注意大花布包和黑铁枪管的材质暴露比例（B01/B02仅见大花布，B09坠地露出枪管）。"
        expressive_storyboard_note: "绘制B08时阿刚脱臼的下巴要抵到胸前，眼珠画悬空虚线；B09走火烟圈为画在空中的双环烟云。"
        contrast_reveal_note: "B08圣光将经理眼镜晃掉要给一个空翻特写。"
        injury_visibility_note: "被淋白灰的吴总和阿刚全身覆盖雪白贴图，大嘴张开露出粉色舌头与嘴里的牙齿，增强滑稽度。"
      risk_notes:
        - "走火只是为了弄脏和滑稽摧毁吊灯白灰，枪口绝不可对准任何角色，子弹射击方向绝对直指天花板。"
        - "石膏落灰糊脸不得展现任何呼吸困难或痛苦咳嗽，纯属卡通烟灰gag。"
      next_action: "进入 scene-performance-director 阶段，对这9个Story Beat的对白、微表情、反应动作与物理弹性形变进行深度的动画导演规划。"
  - patch_type: scene-performance-director
    version: 3
    status: completed
    updated_at: "2026-06-03T17:40:00+08:00"
    summary: "已完成角色表演导演阶段（scene-performance-director），正式落盘 details/performance_sheet_v1.0.md。细化了彪哥的推蛤蟆镜与碎步、吴总的大金表与部不倒翁滑跪、阿刚下巴脱臼拉长（Jaw Drop）形变与猎枪坠地的5阶段动作序列，以及白脸无伤反应与Zone B/A/C的方向锁定连续性。"
    data:
      performance_version: "v1.0"
      script_strategy:
        status: selected
        mode: rewrite_adaptation
      creative_direction_context:
        script_mode: rewrite_adaptation
        selected_adaptation:
          status: selected
          selected_idea_id: "idea_selected_biao"
          selected_title: "彪哥与维多利亚大饭店至尊钻石黑卡以及猎枪走火"
          selection_note: "物理场地（1903餐厅）完全不变；主角改编为彪哥；老板与侍应生改编为吴总与阿刚；核心支付道具为开原维多利亚大饭店至尊钻石黑卡；邻桌食客为马大帅吃烤地瓜；新增东北花布包长杆猎枪的走火伏笔与收尾；全员使用东北方言对话。"
        downstream_rule: "场地保持1903年古典英式餐厅不变；仅改编角色及道具；主角为“彪哥”，经理为“吴总”，侍应生为“阿刚”，邻桌食客为“马大帅”；全员使用地道东北方言，制造英伦背景与东北话的极限喜剧反差。"
      performance_style: "exaggerated_comedy"
      expressive_animation_inheritance:
        enabled: true
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
        asset_references:
          effect_library: "assets/animation-stylization/effect-library.md"
          contrast_comedy_library: "assets/animation-stylization/contrast-comedy-library.md"
      performance_sheet_path: "projects/million-pound-biao/details/performance_sheet_v1.0.md"
      performance_summary: "细化了彪哥、吴总、阿刚、马大帅的3D皮克斯卡通表演规范。彪哥以死鱼脸和彪式碎步为主，吴总通过大金表与大幅度不倒翁滑跪反转，阿刚通过细长纸片体型及下巴脱臼（Jaw Drop）形变，马大帅做冷眼吃地瓜吐槽。结尾猎枪掉地走火经历大花布散落、枪身重影坠地、烟圈喷射、石膏落灰及无伤白粉糊脸（Soot Face）的完整物理喜剧动作序列。"
      character_performance_profiles:
        - character_id: "biao-ge"
          character_name: "彪哥"
          acting_energy: "medium_low"
          eye_focus_pattern: "蛤蟆镜后视线平直，偶有歪头滑落大眼外凸的心虚泄露"
          facial_expression_range: "死鱼脸、暴食嚼葱腮帮卡通膨胀、走火惊恐眼凸"
          body_language: "重心前倾，双臂后背，迈快频彪式碎步"
          body_weight: "medium"
          hand_action_pattern: "食中二指推蛤蟆镜中框，右臂死夹皮包，五指大张推防卫手势"
          signature_gesture: "二指推蛤蟆镜中框并歪头"
          emotional_leak: "走火后瞳孔微缩耸肩，极速裹枪吹枪口青烟强装镇定"
          comedy_reaction_rule: "越尴尬越死鱼脸对峙，制造戏剧性静默"
          blocking_behavior: "在Zone C就餐，B01-B02横穿Zone A，B09在Zone A正门"
          prop_interaction_behavior: "黑卡：单手二指夹卡；猎枪：斜背在身上，拧身过大脱落"
          expressive_physics_capacity:
            squash_stretch_allowed: true
            impact_deformation_allowed: false
            recovery_rule: "吸面腮颊膨胀130%在0.3秒吞咽中伴随喉结跳动弹性回弹"
          cartoon_injury_reaction_rule:
            allowed_visible_injuries: "头顶挂白灰"
            forbidden_reactions: "倒地不起、骨折"
            recovery_or_settle: "单手拍灰，重新起范碎步"
          contrast_performance_profile:
            core_contrast_type: "雅俗错位"
            deadpan_or_self_aware: "deadpan (完全不自知，自命高雅)"
            consistency_boundary: "绝不主动卖蠢，维持保卫科长仪轨"
      beat_performance_notes:
        - beat_id: "B01"
          emotional_goal: "寒冷窘迫与自信对比"
          main_expression: "缩肩哈白汽"
          micro_expression: "蛤蟆镜在鼻尖颤抖"
          eye_action: "双眼紧贴结霜玻璃窗扫视室内"
          body_action: "缩脖，双臂环抱，耸长枪"
          hand_action: "右手指指尖摩挲大包，手按皮夹"
          pause_or_hold: "吐白汽时身体僵直hold 1.5秒"
          secondary_action: "长枪花布袋上下晃动"
          reaction_timing: "0.2s 肚子叫起"
          transition_to_next_beat: "重步迈向Zone A大门"
          potential_hero_support: false
          bridge_performance_hook: "迈步的重力前冲"
          blocking_note: "Zone A大门外"
          prop_state_note: "长枪斜挎包裹态"
          expressive_performance:
            expression_type: "contrast_comedy"
            animation_physics: "白气卡通膨胀"
            injury_reaction: "none"
            contrast_behavior: "红绿花布斜跨与英伦精致背景"
            timing_structure: "肚子叫到起步"
            recovery_or_settle: "none"
      physical_comedy_performance:
        - beat_id: "B09"
          character_id: "biao-ge"
          trigger: "大门敬礼动作过大背带滑脱，枪托着地走火"
          anticipation: "敬礼时背带滑落，花布散开，长枪重影坠落"
          impact_or_reveal: "枪托磕地轰鸣，枪口喷射烟圈，吊灯剧晃天花板开裂"
          deformation_or_contrast_action: "石膏大片落灰呈云雾状倾泻，彪哥眼球乱凸受惊"
          facial_take: "耸肩缩头，蛤蟆镜滑落，嘴大张"
          hold_timing: "灰尘漫落，白灰糊脸定格hold 1.0秒"
          recovery: "抢步用花布把枪裹好，拍枪口青烟，碎步swagger溜走"
          continuity_note: "走火后天花板开裂及吊灯受损需在后续镜头保持"
      contrast_performance:
        - beat_id: "B08"
          character_id: "wu-zong"
          contrast_type: "personality_gap"
          setup_behavior: "怒拍桌子拍茶匙起跳，咆哮扯犊子逼账"
          reveal_behavior: "亮卡时眼镜震飞，持放大镜筛糠滑跪，连喊免单大爷"
          deadpan_or_self_aware: "self_aware (完全自知，毫无包袱秒切极品谄媚)"
          supporting_reaction: "阿刚下巴脱臼眼珠脱出"
          timing: "看到烫金字瞬间膝盖一软滑跪，静音2秒"
          consistency_boundary: "谄媚带有店方世俗经理的职业式作揖，不崩坏其拜金市侩基调"
      injury_reaction_performance:
        - beat_id: "B09"
          character_id: "wu-zong"
          visible_injury_level: "minor_cartoon"
          allowed_visible_injury: "Soot Face (反向落灰脸贴图，眼镜糊灰，眼睛留黑圈)"
          reaction_style: "拍灰大打喷嚏，从嘴喷灰烟圈，大骂德彪"
          comedic_timing: "走火落灰hold住1秒后，连打三个喷嚏大拍灰"
          forbidden_realistic_focus: "禁止出现咳嗽剧烈、捂胸吸氧或流眼泪"
          recovery_or_settle: "喷嚏喷完后，抹一把镜片，嘴唇张合大吼大叫，动作力度恢复"
      continuity_rules:
        character_performance_consistency: "彪哥全过程用死鱼脸包装装腔，走火惊慌不可泄露给店方；吴总保持大金表反光；阿刚耸肩小碎步。"
        emotional_progression: "前段彪哥局促暴食，中段高压逼债，后段滑跪免单，结局走火闹剧释放。"
        gesture_continuity: "彪哥推蛤蟆镜后如被拍桌打断，在抽黑卡前必须先推回一次；阿刚下巴脱臼必须在B09鞠躬前托住弹回。"
        blocking_continuity: "锁定Zone B左、Zone C右、Zone A中央，不可颠倒位置。"
        prop_state_continuity: "黑卡在B08爆发圣光，B09被彪哥塞回黑色皮包；猎枪在B09前仅大花布露出，走火后掉落枪身完全暴露。"
      storyboard_handoff:
        camera_focus_suggestions: "B04吸面给陶碗低视角特写；B05给碗底镜面反射特写；B08黑卡圣光由下往上扇形扫屏特写；B09落灰白脸中景双推特写。"
        closeup_priority: "大金表、推蛤蟆镜的二指、信封里抽出的烫金黑卡一角、脱臼的下巴。"
        reaction_shot_priority: "拍桌子时彪哥冷漠以对与茶匙跳起；亮卡时吴总眼镜震飞与阿刚眼珠脱出。"
        timing_notes: "B08亮卡配合罗马挂钟秒针静止，做1.5-2秒环境绝对静音，随后突入谄媚尖叫；B09走火瞬间枪响后定格1秒，落灰时咳嗽动作要节奏性打喷嚏。"
        hero_moment_support: "B08金光体积圣光从桌面爆开，B09白灰大云雾在门口炸开。"
      risk_notes:
        - "走火只是为了弄脏和滑稽摧毁吊灯白灰，枪口绝不可对准任何角色，子弹射击方向绝对直指天花板。"
        - "石膏落灰糊脸不得展现任何呼吸困难或痛苦咳嗽，纯属卡通烟灰gag。"
      next_action: "进入 scene-storyboard-director 阶段，根据本剧本与表演设计，在1903茶室Blocking约束下，绘制镜头并生成详细分镜。"
  - patch_type: scene-audio-director
    version: 1
    status: completed
    updated_at: "2026-06-03T17:50:00+08:00"
    summary: "已完成声音导演阶段。规划了全员东北话配音特征，为18个镜头定制了Pixar式卡通物理与轻伤喜剧拟音（Foley），设计了交响圣歌与东北板胡二人转配乐的主题冲突，完成了9个分段声音连续性与立体声混音计划，并将方案落盘写入 details/audio_plan_v1.0.md 及 outputs/audio/ 目录。"
    data:
      audio_plan_version: "v1.0"
      expressive_animation_inheritance:
        enabled: true
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
      audio_plan_path: "projects/million-pound-biao/details/audio_plan_v1.0.md"
      music_prompt_path: "projects/million-pound-biao/outputs/audio/music_prompt_v1.0.md"
      foley_prompt_path: "projects/million-pound-biao/outputs/audio/foley_prompt_v1.0.md"
      audio_mix_plan_path: "projects/million-pound-biao/outputs/audio/audio_mix_plan_v1.0.md"
      audio_summary: "90秒（18镜头）全员东北方言声音设计。配乐以小提琴拨弦对峙、爆开史诗唱诗班体积圣光、枪鸣后二人转板胡为主；拟音包含面条Smear拉伸吸声、大葱咔嚓脆断声、陶碗擦拭吱吱声、阿刚下巴脱臼拉长（sproing）与复位（咔吧）、香槟爆塞式走火与石膏白灰雪崩沙沙声；混音包含左右阵营声相偏置与低通滤波器（如白脸落灰糊脸后的高频闷音滤波）。"
      voice_direction:
        language: "东北方言 (zh-CN, Northeast Mandarin)"
        overall_tone: "中产英伦精致风雅与土味大碴子东北嗑的极限撕裂冲突"
        pacing: "彪哥官腔沉稳偏慢，吴总前倨后恭大开大合，阿刚尖细高频洋腔，马大帅沙哑吐槽"
        breath_control: "彪哥句前吸气蛤蟆镜微颤，吴总憋红脸爆言与下跪倒吸气，阿刚下巴脱臼复位咔吧，马大帅长声叹气"
        emotional_delivery: "轻蔑傲慢 -> 势利逼账 -> 震撼滑跪 -> 走火慌乱与淡定装蒜"
      music_design:
        main_theme: "维多利亚室内古典小提琴 pizzicato 拨弦，转宏大史诗管风琴圣咏，转欢快暴走东北二人转板胡"
        tempo_range: "70 bpm 到 140 bpm"
        silence_points:
          - beat_id: "B06"
            shot_id: "Shot 12"
            purpose: "吴总拍桌对峙，乐器全停，只留放大3倍的秒针滴答声制造空气窒息感"
          - beat_id: "B08"
            shot_id: "Shot 15"
            purpose: "黑卡完全平展的圣光前摇，全场绝对静音1.5秒蓄力"
      foley_design:
        density: "medium_to_high"
        key_foley_moments:
          - shot_id: "Shot 07"
            segment_id: "Segment 4"
            sound: "面条拉伸哧溜吸入声和大葱咔嚓咬断声"
            timing: "00:30-00:35"
            purpose: "展现彪哥暴食相与精致餐厅的滑稽违和"
            related_prop_state: "State_Eating"
            related_blocking: "彪哥坐在 Zone C 餐桌旁"
            expressive_audio:
              sound_type: "combined"
              cartoon_action_sound: "哧溜哧溜（rubber_pulley）高频吸水声，双腮充气波波爆音"
              forbidden_realistic_sounds: "写实的湿粘咀嚼音，口水吞咽声"
          - shot_id: "Shot 16"
            segment_id: "Segment 8"
            sound: "下巴脱臼拉长（sproing）与吴总滑跪哧溜声"
            timing: "01:15-01:20"
            purpose: "展现极度惊恐谄媚与下巴变形的喜剧Gag"
            related_prop_state: "State_Unfolded_Glow"
            related_blocking: "吴总阿刚在 Zone B/C 通道连滚带爬滑行"
            expressive_audio:
              sound_type: "minor_injury_gag"
              injury_gag_sound: "阿刚下巴脱臼拉长嘣嘤嘤嘤（sproing）与发条玩具嗒嗒嗒发抖抖动音"
              forbidden_realistic_sounds: "骨骼碎裂声，肌肉撕裂声，痛苦惨叫"
          - shot_id: "Shot 18"
            segment_id: "Segment 9"
            sound: "枪托落地走火礼炮与落灰糊脸沙沙声"
            timing: "01:25-01:30"
            purpose: "结局走火糊脸的喜剧Payoff"
            related_prop_state: "State_Misfire"
            related_blocking: "在大门口 Zone A，吊灯摇晃，落灰雪崩"
            expressive_audio:
              sound_type: "combined"
              cartoon_action_sound: "香槟塞爆pop混礼花筒开火，吊灯摇晃铁链吱呀声"
              injury_gag_sound: "石膏大片落地沙沙声，白脸大打喷嚏（鸭叫哈秋）"
              forbidden_realistic_sounds: "写实剧烈火药轰鸣，钢弹穿透肉体，痛苦惨嚎，缺氧剧咳"
      next_action: "进入 scene-video-prompt-builder 阶段，将完整分镜与声音导演计划内联翻译为9个Segment中英文双语视频生成Prompts。"
  - patch_type: scene-video-prompt-builder
    version: 1
    status: completed
    updated_at: "2026-06-03T17:57:00+08:00"
    summary: "已完成视频提示词构建阶段。将完整分镜与声音导演计划翻译为9个Segment共18镜头的详细双语视频生成提示词，产出了导演长版与模型投喂版，在outputs/video_prompts/下完成落盘，并通过了结构与连续性自校验。"
    data:
      prompt_pack_version: "v1.0"
      expressive_animation_inheritance:
        enabled: true
        animation_stylization_level: "expressive"
        injury_tone_level: "minor_cartoon"
        contrast_comedy_enabled: true
      video_prompt_review:
        review_status: "passed"
        review_round: 1
        issues_found: []
        auto_fixes_applied: []
        final_delivery_ready: true
      video_prompt_files:
        zh_full: "projects/million-pound-biao/outputs/video_prompts/视频提示词_导演长版_中文_v1.0.md"
        en_full: "projects/million-pound-biao/outputs/video_prompts/视频提示词_导演长版_英文_v1.0.md"
        zh_runtime: "projects/million-pound-biao/outputs/video_prompts/视频提示词_模型投喂版_中文_v1.0.md"
        en_runtime: "projects/million-pound-biao/outputs/video_prompts/视频提示词_模型投喂版_英文_v1.0.md"
      reference_assets:
        character_design_refs: "projects/million-pound-biao/details/character_design_v1.0.md"
        scene_prop_master_ref: "projects/million-pound-biao/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
        storyboard_refs: "projects/million-pound-biao/details/分镜清单_v1.0.md"
        storyboard_prompt_pack_refs:
          - pack_id: "pack_01"
            file: "projects/million-pound-biao/outputs/storyboard_prompts/故事板提示词_pack_01_v1.0.md"
            covered_segments: [1, 2, 3, 4, 5]
            covered_shots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          - pack_id: "pack_02"
            file: "projects/million-pound-biao/outputs/storyboard_prompts/故事板提示词_pack_02_v1.0.md"
            covered_segments: [6, 7, 8, 9]
            covered_shots: [11, 12, 13, 14, 15, 16, 17, 18]
      next_action: "进入 scene-publish-review 阶段，进行发布前字幕、配音、封面、宣发文案与平台发布方案的整理审查。"
---

# 项目黑板：彪哥版《百万英镑》餐厅结账重制项目

## 项目简介
本项目基于《百万英镑》经典餐厅结账片段 of 视频解析内容进行重新创作，并将角色替换为中国经典幽默有梗角色。
*   **物理场地约束**：保留原片经典的20世纪初高档英式餐厅/茶室空间（场地不变）。
*   **创作模式**：进行**角色题材跨界改编**。
*   **核心改编人物**：
    *   主角：**彪哥**（手握开原维多利亚大饭店至尊钻石黑卡，背负布包猎枪）
    *   经理与店小二：**吴总**与**阿刚**
    *   邻桌食客：**马大帅**（吃地瓜老头）

## 当前进度与下一阶段
*   **当前项目状态**：`video_prompts_ready`（已完成双语导演长版和模型投喂版视频生成提示词的落盘设计与自校验）
*   **下一阶段任务**：`scene-publish-review`（进入发布包装审查阶段，整理发布标题、平台文案、评论引导、字幕配音与发布后复盘方案）
