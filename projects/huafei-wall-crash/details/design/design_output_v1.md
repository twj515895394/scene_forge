data:
  design_mode: focus
  style_profile:
    confirmation_status: confirmed
    director_style_id: classic_studio_wuxia
    director_style_version: v1
    style_family: live_action_cinematic
    style_profile_path: style_profiles/classic_studio_wuxia/profile.md
    used_default_fallback: false
    fallback_note:
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: selected
      selected_idea_id: shilan_parody_selected
      selected_title: 士兰撞墙鬼畜——撞什么都撞不死
      selection_note: 用户已确认改编方向。角色去版权化。核心引擎：道具穿帮喜剧。
    downstream_rule: 下游围绕6 Beat鬼畜喜剧结构，严格遵循棚拍布景美学。
  design_confirmation:
    confirmed_by_user: true
    confirmation_note: >
      用户确认设计方向，要求士兰脸型参考蒋欣（甄嬛传华妃扮演者），
      皇上保留四郎经典胡子。其他按设计预览执行。
  story_design_mapping:
    beat_to_design_targets:
      - beat_id: B01
        related_characters: [士兰]
        related_scenes: [冷宫/棚拍片场]
        related_props: [泡沫柱子]
      - beat_id: B02
        related_characters: [士兰, 场务小哥]
        related_scenes: [冷宫/棚拍片场]
        related_props: [纸板柱子]
      - beat_id: B03
        related_characters: [士兰]
        related_scenes: [冷宫/棚拍片场]
        related_props: [蹦床地板, 绿幕背景布]
      - beat_id: B04
        related_characters: [士兰]
        related_scenes: [冷宫/棚拍片场]
        related_props: []
      - beat_id: B05
        related_characters: [士兰, 导演]
        related_scenes: [冷宫/棚拍片场]
        related_props: [LED显示屏墙面]
      - beat_id: B06
        related_characters: [士兰, 皇上]
        related_scenes: [片场休息区, 养心殿]
        related_props: [iPad]
  visual_language:
    shape_language_core: 清代宫廷类型化廓形，建筑以直线+对称构图为主，棚拍布景美学
    silhouette_anchors: 旗装宽大直筒剪影，两把头侧面识别性
    proportion_strategy: 真人比例，士兰168cm修长，配角为普通人身高
    material_strategy: 布景质感对比——真材质(棉麻/木材/灰砖) vs 道具材质(泡沫/纸板/蹦床网面)
    color_script: 冷宫暗调暖色(烛火+深木色) → 片场冷白LED+暖色工作灯混合
    environment_stylization: 棚拍布景感——场景是摄影棚搭的景，不求逼真求"有棚味"
    prop_exaggeration_rule: 道具外观逼真但物理行为暴露真相，不作卡通形变
  expressive_animation_design:
    enabled: false
    mode: none
    note: >
      当前style_family=live_action_cinematic，不适用卡通物理扩展。
      鬼畜效果通过棚拍道具的物理穿帮实现（泡沫弹性回弹、纸板轻倒、
      蹦床弹跳），而非角色身体的卡通变形。允许轻灰脸、冰袋等喜剧化痕迹。
  character_designs:
    - name: 士兰
      baseline_version: v1
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: details/角色说明书_士兰_v1.md
      character_bible_file: details/角色说明书_士兰_v1.md
      prompt_file: outputs/design_prompts/角色说明书图片提示词_士兰_v1.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views:
          - 正面全身
          - 3/4侧面头像
          - 侧面头像
          - 背面全身
        silhouette_required: true
        expression_count: 6
        micro_expression_count: 4
        action_pose_count: 4
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: true
        revision_request_file:
    - name: 场务小哥
      baseline_version: v1
      reference_strength: low_anchor
      asset_strategy: new_light
      lock_card_file: details/design/supporting_characters_v1.md
      character_bible_file:
      prompt_file:
      prompt_target:
      sheet_requirements: {}
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: false
    - name: 导演
      baseline_version: v1
      reference_strength: low_anchor
      asset_strategy: new_light
      lock_card_file: details/design/supporting_characters_v1.md
      character_bible_file:
      prompt_file:
      prompt_target:
      sheet_requirements: {}
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: false
    - name: 皇上
      baseline_version: v1
      reference_strength: medium_anchor
      asset_strategy: new_light
      lock_card_file: details/design/supporting_characters_v1.md
      character_bible_file:
      prompt_file:
      prompt_target:
      sheet_requirements: {}
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: false
  scene_designs:
    - name: 冷宫/棚拍片场
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: details/scene_design_cold_palace_v1.md
      prompt_file: outputs/design_prompts/scene_cold_palace_prompt_v1.md
    - name: 片场休息区
      reference_strength: low_anchor
      asset_strategy: new_light
      lock_card_file: details/design/supporting_scenes_v1.md
      prompt_file:
    - name: 养心殿
      reference_strength: low_anchor
      asset_strategy: new_light
      lock_card_file: details/design/supporting_scenes_v1.md
      prompt_file:
  prop_designs:
    - name: 泡沫柱子
      asset_strategy: new_core_prop
      lock_card_file: details/design/prop_state_machines_v1.md
      prompt_file:
      state_machine_id: FP
    - name: 纸板柱子
      asset_strategy: new_core_prop
      lock_card_file: details/design/prop_state_machines_v1.md
      prompt_file:
      state_machine_id: CB
    - name: 蹦床地板
      asset_strategy: new_core_prop
      lock_card_file: details/design/prop_state_machines_v1.md
      prompt_file:
      state_machine_id: TB
    - name: 绿幕背景布
      asset_strategy: new_core_prop
      lock_card_file: details/design/prop_state_machines_v1.md
      prompt_file:
      state_machine_id: GS
    - name: LED显示屏墙面
      asset_strategy: new_core_prop
      lock_card_file: details/design/prop_state_machines_v1.md
      prompt_file:
      state_machine_id: LD
  space_blocking_reference:
    enabled: true
    prompt_file: outputs/design_prompts/空间站位图提示词_v1.md
    target_view: top_down
    includes:
      - spatial_axis
      - default_character_positions
      - key_prop_positions
      - entrance_exit_paths
      - allowed_move_zones
      - forbidden_zones
      - camera_facing_reference
      - relative_distance_notes
  master_scene_prop_reference:
    enabled: true
    prompt_file: outputs/design_prompts/master_scene_prop_reference_v1.md
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
      - physical_safety_notes
      - expressive_animation_notes
  space_continuity_seed:
    seed_file: details/design/space_continuity_seed_v1.md
    anchor_spaces:
      - 泡沫柱子(Zone B左)
      - 后墙/LED屏(正后方)
      - 导演监视器(Zone D)
    recurring_landmarks:
      - 高窗月光
      - 木桌+香炉
      - 地上T形胶带标记
    entrance_exit_logic: 冷宫入口(西侧拱门)进入，LED屏穿透后进入片场(不可逆)
    axis_preservation_note: 主轴线南北向(士兰冲刺路径)，180度线东西向，默认镜头从南向北
  prop_state_machines:
    - prop_name: 泡沫柱子
      states:
        - state_id: FP-01
          description: 正常外观(仿石纹理)
          visible_evidence: 光滑石纹表面
          allowed_interaction: 可触碰、敲击
          safety_boundary: 撞击后将人弹回坐地，不产生伤害
        - state_id: FP-02
          description: 便利贴可见
          visible_evidence: 黄色便利贴，手写"道具泡沫柱"
          allowed_interaction: 可阅读
          safety_boundary: —
        - state_id: FP-03
          description: 撞击触发(弹性晃动)
          visible_evidence: 柱子晃动约±15°
          allowed_interaction: —
          safety_boundary: 弹力安全，不造成伤害
    - prop_name: 纸板柱子
      states:
        - state_id: CB-01
          description: 正常外观
        - state_id: CB-03
          description: 推倒触发(纸板倒下)
          visible_evidence: 柱子倒下，背面中空露出场务
          allowed_interaction: —
          safety_boundary: 极轻，倒下不伤人
    - prop_name: 蹦床地板
      states:
        - state_id: TB-01
          description: 地毯覆盖(隐藏)
        - state_id: TB-03
          description: 弹跳触发(8次弹跳)
          visible_evidence: 士兰在空中上下弹跳
          allowed_interaction: —
          safety_boundary: 弹跳高度渐减，第8次静止
    - prop_name: 绿幕背景布
      states:
        - state_id: GS-01
          description: 平整悬挂
        - state_id: GS-03
          description: 缠绕木乃伊
          visible_evidence: 绿色布缠绕全身
          allowed_interaction: 可自行挣脱
          safety_boundary: 不缠绕颈部
    - prop_name: LED显示屏墙面
      states:
        - state_id: LD-01
          description: 石墙显示
        - state_id: LD-02
          description: 穿透瞬间(像素撕裂)
          visible_evidence: 屏幕画面撕裂/雪花噪点
          allowed_interaction: —
          safety_boundary: 柔性面板，无碎玻璃或锐边
  blocking_map:
    spatial_axis: 南北向(冲刺路径) / 东西向(横向调度)
    zones:
      - zone_id: Zone A
        description: 中心表演区，士兰起跑/冲刺/撞击
        allowed_characters: [士兰]
        forbidden_characters: []
      - zone_id: Zone B
        description: 柱子区(左)，泡沫柱+纸板柱
        allowed_characters: [士兰]
        forbidden_characters: [场务小哥(B02倒柱前)]
      - zone_id: Zone C
        description: 前区，蹦床+木桌
        allowed_characters: [士兰]
        forbidden_characters: []
      - zone_id: Zone D
        description: 片场后方，导演/场务/摄像机/灯光
        allowed_characters: [场务小哥, 导演]
        forbidden_characters: [士兰(B05穿透前)]
    continuity_rule: 泡沫柱永远在左，后墙永远在正后，Zone D在B05前不可见
  faction_layout:
    factions:
      - faction_id: 冷宫侧
        members: [士兰]
        default_zone: Zone A
        forbidden_zones: [Zone D(B05前)]
      - faction_id: 片场侧
        members: [场务小哥, 导演]
        default_zone: Zone D
        forbidden_zones: [Zone A(B02前)]
  visual_consistency:
    character_anchor_note: 士兰素白旗装+两把头为全片唯一角色锚点，不可变更配色或发型主轮廓
    scene_anchor_note: 冷宫空间结构贯穿全片，B01-B04与B05为同一空间的不同揭示阶段
    material_anchor_note: 道具材质对比(真vs假)是笑点来源，棚拍布景感贯穿
    blocking_anchor_note: 泡沫柱/后墙/Zone D位置固定，不可漂移
    prop_state_anchor_note: 五个核心道具状态机为分镜和视频提示词阶段唯一权威源
    expressive_animation_anchor_note: 不启用卡通形变，鬼畜通过道具物理穿帮实现
  script_adaptation_notes: >
    剧本阶段需继承士兰6个剧情表情和4个关键动作姿态，
    冷宫双状态渐进揭示逻辑，5个核心道具的状态机触发时序。
    空间轴线(南北冲刺路径)和zone布局为镜头调度的唯一约束。
  next_action: 进入 scene-script-adapter，基于已确认的6 Beat骨架和角色/场景/道具设计产出正式剧本。
