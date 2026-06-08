---
data:
  design_mode: focus
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: selected
      selected_idea_id: idea_girls_skateboard_chase
      selected_title: 滑板少女山道极限追逐与动作反差
      selection_note: 二位18岁中国青春活力女孩在蜿蜒山路进行滑板竞技与追逐。场景包括陡峭的弯道、直道、以及各种路障障碍物。动作设计融合极速滑行、炫酷滑板技巧。两人在不同路段交互领先，交替领航，并在追逐中展现默契配合与幽默互动。
    downstream_rule: 以下游重点制作池标准开发故事骨架与后续设计，主打青春活力与极限动作，确保滑板物理质感真实。重点关注双人滑板技巧的动态还原、交替领先的戏剧化节奏，同时落实运动安全护具规范，避免恶性碰撞。
  design_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户明确确认采用撞色街头潮服方案，且在提示词中保留文字标注，并在运动物理中启用smear_motion动态残影特效。
  story_design_mapping:
    beat_to_design_targets:
      - beat_id: B01
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-起点Zone A]
        related_props: [滑板A, 滑板B, 半盔A, 半盔B]
      - beat_id: B02
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-弯道Zone B]
        related_props: [滑板A, 滑板B, 防护手套A]
      - beat_id: B03
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-障区Zone C]
        related_props: [滑板A, 滑板B, 塑料隔离墩]
      - beat_id: B04
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-崎岖直道Zone C]
        related_props: [滑板A, 滑板B]
      - beat_id: B05
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-急转直角弯Zone B]
        related_props: [滑板A, 滑板B]
      - beat_id: B06
        related_characters: [女孩A, 女孩B]
        related_scenes: [蜿蜒山道-终点草坪Zone D]
        related_props: [滑板A, 滑板B]
  visual_language:
    shape_language_core: 概括几何与张力优先。女孩A以向后摆动的高马尾和前倾冲刺剪影体现极限速度；女孩B以齐耳短发、直刘海与沉稳下蹲剪影体现技巧控制力。
    silhouette_anchors: 女孩A的高马尾和露脐背心短裤剪影，女孩B的齐耳短发和百褶运动短裙剪影，以及各自专属涂鸦滑板与祥云/科技半盔。
    proportion_strategy: 3D Pixar 卡通长片风格，头身比控制在 5.5 到 6 头身，展现高挑修长、运动健美的S型凹凸有致身材。
    material_strategy: 卡通造型结合高精微瑕PBR材质（如滑板背面防滑砂纸磨砂质感、磨损哑光黑支架、冷光高反光漆面半盔、软胶护具等）。
    color_script: 起点为金黄色清晨斜阳逆光；直道为明亮通透的户外天光伴随树影斑驳；B05弯道并漂呈现亮黄色卡通火花特效与红白防撞栏飞速退后；终点为高饱和度青草绿与和煦阳光。
    environment_stylization: 场景进行卡通电影设计化，突出沥青路面的粗糙材质、一侧黑灰色花岗岩悬崖和另一侧红色反光片金属护栏的质感，强调用速度感拉退的地标。
    prop_exaggeration_rule: 道具角色化。滑板A突出橙/黑棋盘格防滑砂纸，滑板B突出蓝/绿双拼防滑砂纸；半盔A突出白色亮漆国风云纹，半盔B突出哑光冷灰科技线条。
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
        - dust_face
        - small_scratch
        - leaf_face
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
        - personality_gap
        - size_mismatch
      max_core_contrasts_per_project: 2
      max_hero_contrast_per_segment: 1
      tonal_boundary:
        preserve_character_consistency: true
        contrast_must_serve_story_or_character: true
        avoid_random_meme_stack: true
    design_notes_for_downstream:
      script_adapter: 确保角色专属撞色潮服和专属滑板涂鸦、半盔印花在动作描述中完全一致；在B03/B04/B05中写入眼神、吐舌做鬼脸及肩部碰撞等幽默互动。
      performance_director: 眼神对焦是互动的核心，女孩A的张扬吃瘪表情与女孩B的冷静Wink做鬼脸需形成镜头特写反差。
      storyboard_director: 弯道漂移时采用低角度仰拍，保证空间连续性轴线（双黄线）不被越过。
      video_prompt_builder: 严格继承服装配色（Ivory-white/Charcoal-black/Neon-orange vs Sage-green/Midnight-navy/Chalk-white）与专属道具细节。
  character_designs:
    - name: 女孩A
      reference_strength: low_anchor_originalized
      asset_strategy: new_full
      lock_card_file: details/character_design_v1.0.md
      character_bible_file: details/角色说明书_女孩A_v1.0.md
      prompt_file: outputs/design_prompts/角色说明书图片提示词_v1.0.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views: front, 3/4 side, back
        silhouette_required: true
        expression_count: 6
        micro_expression_count: 2
        action_pose_count: 4
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
    - name: 女孩B
      reference_strength: low_anchor_originalized
      asset_strategy: new_full
      lock_card_file: details/character_design_v1.0.md
      character_bible_file: details/角色说明书_女孩B_v1.0.md
      prompt_file: outputs/design_prompts/角色说明书图片提示词_v1.0.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views: front, 3/4 side, back
        silhouette_required: true
        expression_count: 6
        micro_expression_count: 2
        action_pose_count: 4
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
  scene_designs:
    - name: 蜿蜒山道
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: details/scene_design_v1.0.md
      prompt_file: outputs/design_prompts/scene_prompts_v1.0.md
  prop_designs:
    - name: 滑板A
      asset_strategy: new_core_prop
      lock_card_file: details/prop_design_v1.0.md
      prompt_file: outputs/design_prompts/scene_prompts_v1.0.md
      state_machine_id: prop-skateboards
    - name: 滑板B
      asset_strategy: new_core_prop
      lock_card_file: details/prop_design_v1.0.md
      prompt_file: outputs/design_prompts/scene_prompts_v1.0.md
      state_machine_id: prop-skateboards
  master_scene_prop_reference:
    enabled: true
    prompt_file: outputs/design_prompts/master_scene_prop_reference_v1.0.md
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
      - physical_safety_notes
      - expressive_animation_notes
  space_continuity_seed:
    seed_file: details/design/space_continuity_seed_v1.md
    anchor_spaces: [Zone A, Zone B, Zone C, Zone D]
    recurring_landmarks: [孤立落叶松树, 双黄线, 红白相间防护栏, 施工塑料锥筒]
    entrance_exit_logic: 从画面左侧进入向右侧滑出，或从纵深处出发滑向前景。
    axis_preservation_note: 以路面双黄线为绝对动作轴线，Chase跟车镜头必须保持在轴线后方15度夹角内，并漂机位由内弯向外弯仰拍。
  prop_state_machines:
    - prop_name: 炫彩滑板
      states:
        - state_id: State_Ready
          description: 起跑线静止就绪
          visible_evidence: 板身水平平放，轮子静止，高光清晰
          allowed_interaction: 角色双脚踩板击掌互动
          safety_boundary: 贴紧路面，重力平衡
        - state_id: State_Speeding
          description: 高速滑降状态
          visible_evidence: 轮毂高速模糊，支架高频微小物理颤动
          allowed_interaction: 弓身降低重心，风阻流线姿态
          safety_boundary: 禁止穿模，轮毂贴地
        - state_id: State_Sliding
          description: 弯道侧滑漂移
          visible_evidence: 板尾倾斜滑出，手撑地冒烟及滑板支架摩擦溅起金色火花
          allowed_interaction: 单手撑地身体倾斜过发卡弯
          safety_boundary: 滑动轨迹平滑，火花特效为暖金色卡通粒子
        - state_id: State_Ollie_Air
          description: 飞跃障碍滞空
          visible_evidence: 离地腾空，板轮失去摩擦高速空转
          allowed_interaction: 空中碰板尾 Board-tap 互动
          safety_boundary: 抛物线轨迹合理，禁止二次跳跃
        - state_id: State_Stopped
          description: 终点缓冲刹停
          visible_evidence: 斜擦缓冲，底面刮擦划痕与碎草叶
          allowed_interaction: 角色跳板顺势躺倒草地
          safety_boundary: 动能自然递减结算
  blocking_map:
    spatial_axis: 赛道中心双黄线
    zones:
      - zone_id: Zone_A
        description: 山顶起跑点，地势开阔平坦
        allowed_characters: [女孩A, 女练B]
        forbidden_characters: []
      - zone_id: Zone_B
        description: 陡峭S形发卡弯与直角弯，是滑降漂移主要博弈地
        allowed_characters: [女孩A, 女孩B]
        forbidden_characters: []
      - zone_id: Zone_C
        description: 直道与障碍维修区，是气流牵引和Ollie越障点
        allowed_characters: [女孩A, 女孩B]
        forbidden_characters: []
      - zone_id: Zone_D
        description: 山脚平缓草坪，刹车与冲线相拥地
        allowed_characters: [女孩A, 女孩B]
        forbidden_characters: []
    continuity_rule: 双人行进机位严格位于赛道中轴线后方15度，弯道并漂机位由内弯向外弯仰拍，以防越轴。
  faction_layout:
    factions:
      - faction_id: warm_speed_A
        members: [女孩A]
        default_zone: Zone_A
        forbidden_zones: []
      - faction_id: cool_tech_B
        members: [女孩B]
        default_zone: Zone_A
        forbidden_zones: []
  visual_consistency:
    character_anchor_note: 女孩A(高马尾，象牙白露脐背心，炭黑短裤)，女孩B(齐耳短发，鼠尾草绿露脐T恤，深蓝褶裙)，通过专属服饰与特征锚定。
    scene_anchor_note: 山道两侧的黑灰花岗岩、红色反射金属防撞护栏、以及施工锥筒地标锚定空间。
    material_strategy_note: 细腻微瑕PBR材质，融合运动橡胶、哑光合金、光滑反光漆面和滑板防滑砂纸。
    blocking_anchor_note: 赛道中心双黄线作为绝对跟车拍摄轴线。
    prop_state_anchor_note: 滑板随剧情推进产生的板底擦痕递增（从崭新到B06的斑驳擦伤）。
    expressive_animation_anchor_note: 仅在起跳和极速滑降、擦地漂移时使用 smear_motion 残影帧，火花粒子为金色卡通微尘。
  script_adaptation_notes: 剧本在描述弯道、起跳和碰撞时，需结合人物的拼色服饰描述，并重点插入B03的“碰板尾（Board-tap）”木质碰撞声与B04的肩膀轻微撞击。
  next_action: 进入 scene-script-adapter 阶段，正式根据这套视觉语言与表现力边界撰写 60 秒极速追逐和丰富互动的分段剧本。
---

# 角色设计锁定卡 (Character Design Constraints) - girls-skateboard-chase

本文件定义本项目中两名主角的视觉造型与物理特征，下游剧本、表演导演、分镜及视频提示词生成阶段必须严格继承以下约束。

## 1. 统一角色视觉风格 (Unified Styling)
*   **制作风格**：3D 迪士尼/皮克斯动画长片风格 (3D Feature Animation Style)。
*   **头身比例**：统一采用 **5.5头身至6头身** 的黄金动画比例，以呈现青春高挑、身材纤细修长且充满运动爆发力的体态（Slender and athletic figures）。
*   **体态特征**：双腿修长匀称，腰肢纤细，肩背挺拔，具有完美的青春少女运动健美体型。**服装统一采用夏装运动风格，通过露脐上衣与运动短裤/短裙，完美展现女性健美的S型凹凸有致身材曲线**。
*   **头部与面部**：大眼睛（灵动明亮，眼角微扬），面部线条圆润柔和，表情富有张力，能够清晰呈现微表情与眼神互动。
*   **防护装备要求**：两人统一穿戴**敞开式运动半盔 (Open-face Half-shell Sport Helmet)**，绝对不加装面罩或防护风镜，确保前额刘海、发梢发型以及面部所有的表情变化完全暴露在镜头中。

---

## 2. 角色 A：女孩 A (开朗活力速度手)
*   **基本特征**：18岁中国女孩，热情洋溢，个性奔放。
*   **体型特征**：高挑纤细，四肢比例修长，马甲线轮廓微露，具有极佳的流线型运动身材。
*   **发型与面部**：
    *   高耸的单马尾（High Ponytail），发色为深栗色，额头带细碎的空气刘海。
    *   在滑行迎风时，马尾随风向后剧烈飘摆，具有极强的动感指向性。
*   **服装造型 (街头运动潮服)**：
    *   **上身**：象牙白修身紧身运动露脐背心 (Ivory white sporty crop tank top)，边缘带荧光亮橘细饰边，前胸印有小巧的橙色街头泼墨标志，显现紧致的腰线与胸部S型曲线。
    *   **下身**：高腰修身炭黑色技术防撕裂短裤 (High-waisted charcoal black sporty mini shorts)，带亮橘色反光缝线与微型工装口袋，展现匀称修长的腿部线条。
    *   **脚部**：白底拼橘色复古滑板鞋配奶油色（Cream beige）中筒袜（袜口带两条炭灰色横条纹）。
*   **防护装备**：
    *   亮白色为主漆面、饰有亮橘色与炭黑色国潮云纹泼墨印花的敞开式半盔 (Glossy white helmet with orange and black cloud print)。
    *   双肘与双膝配戴石板灰（Slate grey）专业护具（带有亮橘色带扣）。
    *   戴着深灰色耐磨半指手套，掌心贴有聚氨酯耐磨片（用于弯道撑地漂移动作）。
*   **核心动作与表情姿态**：
    *   **起跑姿态**：单脚蹬地，上身俯冲，单手向后摆动，露出自信而张扬的笑脸。
    *   **滑行姿态**：完全弓身俯贴在滑板上（Aerodynamic drafting pose），双臂收拢在身后，双眼专注地盯着前方女孩B的背影。
    *   **撑地漂移**：单膝下沉，左手平撑在地面上，滑板鞋在沥青路面上拉出火花，嘴唇微张大喊，发丝向一侧飘散。
    *   **互动表情**：超车时调皮地对女孩B挑眉，坏笑着大声呼喊；终点跌倒在草地上时，四肢摊开大笑。

---

## 3. 角色 B：女孩 B (沉稳技巧特技手)
*   **基本特征**：18岁中国女孩，沉稳冷静，自信从容。
*   **体型特征**：身材匀称紧致，肌肉线条流畅（Fit and active build），腿部力量感强，下盘极稳。
*   **发型与面部**：
    *   齐短发（Bob hairstyle），黑色直发在耳侧自然垂下，随风微微向后飞拂。
    *   神态冷静自信，嘴角微翘带有一抹从容不迫的微笑。
*   **服装造型 (街头运动潮服)**：
    *   **上身**：鼠尾草绿/薄荷灰紧身露脐短袖T恤 (Tight-fit sage green/mint grey crop sport tee)，胸前带斜向深蓝色速度条纹，勾勒出肩背与完美的腰身S型曲线。
    *   **下身**：高腰深蓝色高弹褶皱运动裙 (High-waisted midnight navy pleated active tennis skirt)，腰部带白色对比宽腰带，内置深蓝色防走光防磨安全裤。
    *   **脚部**：深蓝色白底专业滑板鞋（带薄荷绿拼色），配纯黑色中筒运动袜（袜口带两条薄荷绿速度细条纹）。
*   **防护装备**：
    *   哑光冷灰色底色、饰有深蓝色与薄荷绿几何机械线条科幻涂鸦的敞开式半盔 (Matte cool grey helmet with navy and mint tech-line decals)。
    *   双肘与双膝配戴粉白色（Chalk white）专业硬壳护具。
    *   戴着浅灰色耐磨全指滑板手套。
*   **核心动作与表情姿态**：
    *   **切弯姿态**：双腿下蹲呈微曲状态，身体向内侧倾斜，双臂张开保持平衡，面带若有若无的自信微笑。
    *   **Ollie越障**：身体下蹲蓄力后向上猛跃，双膝微蜷收在腹部，带板凌空飞起，齐耳短发在空中飞散开来。
    *   **互动表情**：超车瞬间回头对女孩A眨眼、吐舌头做鬼脸；在直弯并排时，转头向女孩A大喊“并排冲！”；终点碰拳时露出温柔而爽朗的笑容。

---

## 4. 下游阶段物理与调性约束
1.  **体型比例与S型身材一致性**：生图 Prompt 与 3D 物理形变中必须严格保持 **“纤细修长、健美、丰满凹凸、具有完美S型曲线”** 的青春少女特征，短裤短裙物理结算应贴合身形，动态姿态需展现腰身与臀腿的力量感。
2.  **发型与头盔互动**：半盔设计必须露出马尾（女孩A）和齐肩直发发尾（女孩B），动作连贯性中发丝的抖动和风向必须与运动速度相符。
3.  **互动神态优先**：眼神接触与面部小表情（眨眼、挑眉、咬唇、大笑）在每一个视频分段（VGU）中需作为核心机位对焦的重点。
4.  **专属道具绑定约束 (Bound Props Constraint)**：女孩 A 的专属滑板（“CHASE”橙色祥云板）与专属半盔（亮橘色祥云半盔），以及女孩 B 的专属滑板（“FUTURE”深蓝科技长板）与专属半盔（深蓝色科技线条半盔），必须分别与各自的角色模型强绑定。在设定图展示、三维资产建模、角色材质着色器（Shaders）以及后续视频 Prompt 生成中，严禁出现道具交叉错配（例如：女孩 A 误用滑板 B，或穿戴了女孩 B 的头盔）。
