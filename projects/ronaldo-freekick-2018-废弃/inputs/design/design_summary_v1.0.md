data:
  design_mode: "focus"
  script_strategy:
    status: "selected"
    mode: "preserve_original"
  creative_direction_context:
    script_mode: "preserve_original"
    selected_adaptation:
      status: "bypassed"
      selected_idea_id: null
      selected_title: null
      selection_note: "用户选择 Option A（经典还原），但在进球后的庆祝阶段允许引入动漫风的视觉与动作夸张特效（如能量力场、震波及地面开裂特效）。"
    downstream_rule: "下游各阶段必须忠实还原2018世界杯C罗任意球的经典现场氛围、经典动作和戏剧张力，同时在进球后庆祝部分释放视觉张力，融入动作及能量场特效。"
  design_confirmation:
    confirmed_by_user: true
    confirmation_note: "用户确认设计方向预览，并要求在进球庆祝阶段精准复刻总裁经典的跑动、腾空、转体180度、落地摆臂SIUUU庆祝动作动作细节，项目全阶段隐去球员真名，全部采用外号，且设计中包含白色人墙、守门员鸭哥及红衣队友的专属人物设定卡与提示词。"
  story_design_mapping:
    beat_to_design_targets:
      - beat_id: "B01"
        related_characters: ["总裁", "白色人墙", "红衣队友"]
        related_scenes: ["菲什特球场禁区"]
        related_props: ["裁判喷雾白痕"]
      - beat_id: "B02"
        related_characters: ["总裁"]
        related_scenes: ["菲什特球场禁区"]
        related_props: ["世界杯足球"]
      - beat_id: "B03"
        related_characters: ["总裁", "白色人墙"]
        related_scenes: ["菲什特球场禁区"]
        related_props: ["世界杯足球"]
      - beat_id: "B04"
        related_characters: ["鸭哥"]
        related_scenes: ["菲什特球场禁区"]
        related_props: ["世界杯足球"]
      - beat_id: "B05"
        related_characters: ["总裁", "鸭哥"]
        related_scenes: ["菲什特球场禁区"]
        related_props: ["世界杯足球"]
      - beat_id: "B06"
        related_characters: ["总裁", "红衣队友", "白色人墙"]
        related_scenes: ["菲什特球场禁区"]
        related_props: []
  visual_language:
    shape_language_core: "总裁采用倒三角形（宽肩健壮）以突出巨星力量；人墙采用并排矩形（厚实如墙）突出防线阻碍；鸭哥采用长梯形（细长手臂）强调门将伸展度；红衣队友采用圆润流线与倒梯形展现敏捷矫健。"
    silhouette_anchors: "总裁罚球前叉腰大腿拉丝剪影、SIUUU跃起半空及落地双手甩开大字马步剪影；白色人墙并肩起跳护头剪影；鸭哥空中舒展飞扑剪影。"
    proportion_strategy: "写实动画电影头身比（总裁1:8，鸭哥1:8.2，人墙与队友1:7.5），肢体和头部细节略作动画化规整，保留真实肌肉力学。"
    material_strategy: "3D粘土微毛孔皮肤质感（总裁），带有精细编织网格的红色和白色球衣布料材质，半反射质感足球，高精度草皮及浮土尘埃粒子。"
    color_script: "B1-B4为冷色调（深蓝夜空、白色人墙、草地）配合高亮逆光金边；B5-B6进球后，暖色调（总裁与队友球衣红色、庆祝时的红金色爆裂能量流）瞬间炸开释放。"
    environment_stylization: "索契体育场看台背景虚化，强调大探照灯光轴在空气中形成的雾状光柱（丁达尔效应）和漫天飞扬的金色边缘光草屑。"
    prop_exaggeration_rule: "足球在被总裁击中的瞬间产生约 10% 的物理压扁变形，在空中飞行越过人墙时带有自转残影及微弱气流线；庆祝落地时爆开环状激波。"
  expressive_animation_design:
    enabled: true
    mode: "animated_feature_comedy"
    asset_references:
      effect_library: "assets/animation-stylization/effect-library.md"
      contrast_comedy_library: "assets/animation-stylization/contrast-comedy-library.md"
    animation_stylization:
      level: "expressive"
      preset: "animated_feature_expressive"
      effect_density: "medium"
      density_rule: "hero_moment_and_high_risk_translation_only"
      allowed_physics:
        - "squash_stretch"
        - "elastic_rebound"
        - "smear_motion"
      selective_physics:
        - "impact_flattening"
      forbidden_physics:
        - "body_horror_deformation"
        - "realistic_injury_deformation"
    injury_tone_policy:
      visible_injury_level: "minor_cartoon"
      allowed_minor_injuries:
        - "dust_face"
      forbidden_injuries:
        - "large_blood_loss"
        - "graphic_wounds"
        - "gore"
      restore_character_integrity_after_gag: true
    contrast_comedy:
      enabled: true
      contrast_density: "low"
      core_contrast_types:
        - "personality_gap"
      max_core_contrasts_per_project: 1
      max_hero_contrast_per_segment: 1
      tonal_boundary:
        preserve_character_consistency: true
        contrast_must_serve_story_or_character: true
        avoid_random_meme_stack: true
    design_notes_for_downstream:
      script_adapter: "剧本在动作描述中需显式体现拉短裤特写和SIUUU落地能量波，使用外号隐去球员真名。"
      performance_director: "表演导演应重点雕琢总裁深呼吸的胸口动态、大腿股四头肌纤维的拉紧收缩以及SIUUU跃起转体180度的标志性空中姿态，辅以鸭哥绝望飞扑和人墙受惊的眼神特写。"
      storyboard_director: "分镜导演需保留射击轴线，机位集中在右半区，提供超慢动作的越人墙镜头和低机位仰视的SIUUU落地镜头。"
      video_prompt_builder: "视频提示词需在B6阶段加入 red energy shockwave, dust ripple, epic cinematic 描述以触发庆祝特效。"
  character_designs:
    - name: "总裁"
      reference_strength: "high_anchor"
      asset_strategy: "new_full"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      character_bible_file: "projects/ronaldo-freekick-2018/inputs/design/character_design_总裁_v1.0.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/角色说明书图片提示词_总裁_v1.0.md"
      prompt_target: "character_bible_sheet"
      sheet_requirements:
        views: ["正面", "3/4侧面", "侧面", "背面"]
        silhouette_required: true
        expression_count: 6
        micro_expression_count: 3
        action_pose_count: 5
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
    - name: "白色人墙"
      reference_strength: "medium_anchor"
      asset_strategy: "new_light"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      character_bible_file: "projects/ronaldo-freekick-2018/inputs/design/character_design_白色人墙_v1.0.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/角色说明书图片提示词_白色人墙_v1.0.md"
      prompt_target: "character_bible_sheet"
      sheet_requirements:
        views: ["正面", "3/4侧面", "背面"]
        silhouette_required: true
        expression_count: 3
        micro_expression_count: 0
        action_pose_count: 3
        prop_interaction_required: false
        detail_callout_required: false
        scale_comparison_required: true
        safety_boundary_required: true
    - name: "鸭哥"
      reference_strength: "medium_anchor"
      asset_strategy: "new_light"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      character_bible_file: "projects/ronaldo-freekick-2018/inputs/design/character_design_鸭哥_v1.0.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/角色说明书图片提示词_鸭哥_v1.0.md"
      prompt_target: "character_bible_sheet"
      sheet_requirements:
        views: ["正面", "侧面", "背面"]
        silhouette_required: true
        expression_count: 4
        micro_expression_count: 0
        action_pose_count: 4
        prop_interaction_required: false
        detail_callout_required: false
        scale_comparison_required: true
        safety_boundary_required: true
    - name: "红衣队友"
      reference_strength: "medium_anchor"
      asset_strategy: "new_light"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      character_bible_file: "projects/ronaldo-freekick-2018/inputs/design/character_design_红衣队友_v1.0.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/角色说明书图片提示词_红衣队友_v1.0.md"
      prompt_target: "character_bible_sheet"
      sheet_requirements:
        views: ["正面", "侧面", "背面"]
        silhouette_required: true
        expression_count: 3
        micro_expression_count: 0
        action_pose_count: 3
        prop_interaction_required: false
        detail_callout_required: false
        scale_comparison_required: true
        safety_boundary_required: true
  scene_designs:
    - name: "菲什特球场禁区"
      reference_strength: "high_anchor"
      asset_strategy: "new_full"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/scene_prompts_v1.0.md"
  prop_designs:
    - name: "世界杯足球"
      asset_strategy: "new_core_prop"
      lock_card_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
      prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/scene_prompts_v1.0.md"
      state_machine_id: "telstar_18_sm"
  master_scene_prop_reference:
    enabled: true
    prompt_file: "projects/ronaldo-freekick-2018/outputs/design_prompts/master_scene_prop_reference_v1.0.md"
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
  space_continuity_seed:
    seed_file: "projects/ronaldo-freekick-2018/inputs/design/space_continuity_seed_v1.0.md"
    anchor_spaces: ["罚球锚点", "人墙防守锚点", "球门防守锚点", "庆祝落地锚点"]
    recurring_landmarks: ["裁判喷雾白痕", "白色门柱球网", "黄色角旗杆"]
    entrance_exit_logic: "足球从罚球点抛物线飞向球门挂网；总裁从罚球点沿斜线奔向右侧角旗区落地庆祝；门将在门线做横向位移飞扑。"
    axis_preservation_note: "保留180度射门轴线，摄像机机位保持在右半区，进攻方向始终在画面右侧。"
  prop_state_machines:
    - prop_name: "世界杯足球"
      states:
        - state_id: "static"
          description: "静止放置于原点白线处"
          visible_evidence: "球体压在草丝上，受草坪托起"
          allowed_interaction: "总裁摆球、踢球"
          safety_boundary: "白线范围"
        - state_id: "spinning_air"
          description: "空中自转高速飞跃人墙并急坠"
          visible_evidence: "黑白像素图案旋转模糊，带气流尾迹"
          allowed_interaction: "空气动力摩擦"
          safety_boundary: "抛物线轨迹高度"
        - state_id: "impact_net"
          description: "撞击球门右上死角球网"
          visible_evidence: "球体扁平约10%，球网向后剧烈凸起，震落草屑水汽"
          allowed_interaction: "球网撞击网眼纠缠"
          safety_boundary: "网底内部死角"
        - state_id: "grounded_stop"
          description: "滚落在网内停滞"
          visible_evidence: "球在网内草地滚动数圈后静止"
          allowed_interaction: "守门员捡球"
          safety_boundary: "球门内部地表"
  blocking_map:
    spatial_axis: "以罚球点为原点，指向球门右上角为Z轴正方向，X轴正方向指向右侧角旗区。"
    zones:
      - zone_id: "Zone_A_主罚区"
        description: "原点周围2米区域，总裁罚球备战与起跳点。"
        allowed_characters: ["总裁"]
        forbidden_characters: ["白色人墙", "鸭哥", "红衣队友"]
      - zone_id: "Zone_B_人墙防守区"
        description: "原点前方9.15米处，西班牙人墙防守区域。"
        allowed_characters: ["白色人墙"]
        forbidden_characters: ["总裁", "鸭哥", "红衣队友"]
      - zone_id: "Zone_C_球门禁区"
        description: "Z轴终点球门区域，鸭哥防守把控地带。"
        allowed_characters: ["鸭哥"]
        forbidden_characters: ["总裁", "白色人墙", "红衣队友"]
      - zone_id: "Zone_D_角旗庆祝区"
        description: "球门右侧角旗杆附近，总裁及队友落地SIUUU庆祝点。"
        allowed_characters: ["总裁", "红衣队友"]
        forbidden_characters: ["鸭哥", "白色人墙"]
    continuity_rule: "跨镜头切换时，总裁、人墙与鸭哥的Z轴相对距离必须维持一致，角色站位区域严格受Zone限制。"
  faction_layout:
    factions:
      - faction_id: "葡萄牙进攻阵营"
        members: ["总裁", "红衣队友"]
        default_zone: "Zone_A_主罚区"
        forbidden_zones: ["Zone_C_球门禁区"]
      - faction_id: "西班牙防守阵营"
        members: ["白色人墙", "鸭哥"]
        default_zone: "Zone_B_人墙防守区"
        forbidden_zones: ["Zone_A_主罚区"]
  visual_consistency:
    character_anchor_note: "总裁与红衣队友必须保留红色葡萄牙球衣、总裁背部7号标识；人墙为西班牙白色球衣并排矩形剪影；鸭哥为灰色/黄色门将球衣、长臂剪影。"
    scene_anchor_note: "菲什特球场大探照灯的雾状逆光光轴、绿草地裁判白线、白色球门边框。"
    material_anchor_note: "球衣粗糙编织网格纹理与粘土微孔皮肤、足球半金属镜面像素板材反射、泥土草屑高动态颗粒。"
    blocking_anchor_note: "主罚点到球门的180度深度轴线、进攻方向始终由左指向右。"
    prop_state_anchor_note: "电视之星18的像素斑块和自转尾迹，撞网时的10%压缩物理响应。"
    expressive_animation_anchor_note: "SIUUU落地瞬间红色激波和尘环特效，以及白色人墙被震波吹拂和转动眼珠的微喜剧设计。"
  script_adaptation_notes: "剧本描述中必须强制指明：1. 总裁深呼吸和拉短裤大腿肌特写机位；2. 子弹时间中皮球越人墙及德赫亚（鸭哥）极限飞扑目送的特写；3. 多角度回放中三个分镜视角的切换；4. 角旗区转体180度SIUUU落地双臂甩开定格，伴随红色激波和地表开裂特效，红衣队友狂奔飞身庆祝。"
  next_action: "进入 scene-script-adapter 阶段，整合剧本并精确转译上述视觉与动作动作，隐去真名采用外号，准备剧本初稿输出。"
