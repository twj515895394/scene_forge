# 设计决策汇总细节卡 (design_check_v1.0.md)

本文件汇总《华强买瓜》动物版设计阶段的所有视觉决策、艺术基线、表现力扩展参数和输出关联。

---

## 一、 设计创作基础与视觉基线

```yaml
data:
  design_mode: focus
  style_profile:
    director_style_id: pixar_like
    director_style_version: v1.0
    style_family: 3d_animation
    style_profile_path: style_profiles/pixar_like
    used_default_fallback: false
    fallback_note: ""
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: bypassed
      selected_idea_id: ""
      selected_title: ""
      selection_note: "非视频源输入，直接基于平头哥动物改编的创意决策执行。"
    downstream_rule: 下游围绕平头哥（蜜獾）华强与恶霸犬老板、土拨鼠小弟的对峙进行 100% 原版台词还原与每段 10 秒的视频切分设计。
  design_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户在对话中已明确授权通过设计方向，要求补充踏板摩托车和粉色安全帽作为核心道具进行设定与锁定。

  story_design_mapping:
    beat_to_design_targets:
      - beat_id: B01
        related_characters:
          - 平头哥 (蜜獾)
          - 恶霸犬 (美国恶霸/斗牛犬)
        related_scenes:
          - 街角水果摊
        related_props:
          - 粉色踏板摩托车与安全帽
      - beat_id: B02
        related_characters:
          - 平头哥 (蜜獾)
          - 恶霸犬 (美国恶霸/斗牛犬)
          - 土拨鼠
        related_scenes:
          - 街角水果摊
        related_props: []
      - beat_id: B05
        related_characters:
          - 平头哥 (蜜獾)
          - 恶霸犬 (美国恶霸/斗牛犬)
        related_scenes:
          - 街角水果摊
        related_props:
          - 作弊电子秤
      - beat_id: B06
        related_characters:
          - 平头哥 (蜜獾)
          - 恶霸犬 (美国恶霸/斗牛犬)
        related_scenes:
          - 街角水果摊
        related_props:
          - 作弊电子秤
      - beat_id: B10
        related_characters:
          - 平头哥 (蜜獾)
          - 恶霸犬 (美国恶霸/斗牛犬)
        related_scenes:
          - 街角水果摊
        related_props:
          - 作弊电子秤
          - 爆破西瓜
      - beat_id: B11
        related_characters:
          - 恶霸犬 (美国恶霸/斗牛犬)
          - 土拨鼠
          - 平头哥 (蜜獾)
        related_scenes:
          - 街角水果摊
        related_props:
          - 粉色踏板摩托车与安全帽

  visual_language:
    shape_language_core: 胖瘦矮喜剧轮廓对比（恶霸犬扁宽胖 vs 土拨鼠耸肩瘦长 vs 平头哥方平矮健）。
    silhouette_anchors: 平头哥的银白平头背脊线、恶霸犬的白背心大肚腩、土拨鼠的弓腰细脖子。
    proportion_strategy: 亲和、比例圆润的拟人化 3D 动物卡通比例，头部与五官适当放大，增强情绪的可读性。
    material_strategy: 3D 卡通轮廓与真实质感结合。机车夹克的细腻皮革褶皱、泛黄老汗衫的起毛棉纹路、西瓜表皮蜡质反光与电子秤拉丝金属秤盘。
    color_script: 焦灼热烈夏日午后暖黄色基调，夕阳西斜投影。西瓜汁爆炸展现半透明亮红色卡通物理特效，避开深红。
    environment_stylization: 暖黄色调的大排档老街虚化背景，水果摊遮阳棚具有红蓝相间卡通色调。
    prop_exaggeration_rule: 电子秤显示屏背光偏大闪烁，排气管稍微加粗，西瓜内部膨胀。
```

---

## 二、 动画表现力设计 (Expressive Animation Design)

```yaml
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
        - bump_on_head
        - small_scratch
        - nosebleed_gag
        - soot_face
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
      script_adapter: 在台词中保留刘华强缓慢、多顿挫的对峙特色，不得缩减。
      performance_director: 表演上华强要维持极致的冷面与冷静，恶霸犬面部拉伸要大，土拨鼠抱头哭嚎时脖子要拉长。
      storyboard_director: 分镜上西瓜汁大爆炸气浪是全片核心 Hero Moment，恶霸犬被喷晕在原地打转，头顶飘星星眩晕的物理特效要着重展现。
      video_prompt_builder: 提示词需要指定 Bright Watermelon Red 亮红果浆色与 X_X 翻白眼卡通眩晕眼，严格规避血液质感。
```

---

## 三、 设定与 Prompt 关系索引

```yaml
  character_designs:
    - name: 平头哥 (蜜獾)
      baseline_version: v1.0
      reference_strength: low_anchor_originalized
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-animal/details/角色说明书_平头哥_v1.0.md
      character_bible_file: projects/huaqiang-watermelon-animal/details/角色说明书_平头哥_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views: front, three-quarter, back
        silhouette_required: true
        expression_count: 4
        micro_expression_count: 2
        action_pose_count: 4
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: true
        revision_request_file: ""
    - name: 恶霸犬 (美国恶霸/斗牛犬)
      baseline_version: v1.0
      reference_strength: low_anchor_originalized
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-animal/details/角色说明书_恶霸犬_v1.0.md
      character_bible_file: projects/huaqiang-watermelon-animal/details/角色说明书_恶霸犬_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views: front, three-quarter, back
        silhouette_required: true
        expression_count: 4
        micro_expression_count: 2
        action_pose_count: 4
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: true
        revision_request_file: ""
    - name: 土拨鼠
      baseline_version: v1.0
      reference_strength: low_anchor_originalized
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-animal/details/角色说明书_土拨鼠_v1.0.md
      character_bible_file: projects/huaqiang-watermelon-animal/details/角色说明书_土拨鼠_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/角色说明书图片提示词_v1.0.md
      prompt_target: character_bible_sheet
      sheet_requirements:
        views: front, three-quarter, back
        silhouette_required: true
        expression_count: 4
        micro_expression_count: 2
        action_pose_count: 3
        prop_interaction_required: true
        detail_callout_required: true
        scale_comparison_required: true
        safety_boundary_required: true
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: true
        revision_request_file: ""

  scene_designs:
    - name: 街角水果摊
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-animal/details/design/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/scene_prompts_v1.0.md

  prop_designs:
    - name: 作弊电子秤
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-animal/details/design/prop_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/prop_prompts_v1.0.md
      state_machine_id: scale_state_machine
    - name: 粉色踏板摩托车与安全帽
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-animal/details/design/prop_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/prop_prompts_v1.0.md
      state_machine_id: scooter_state_machine

  space_blocking_reference:
    enabled: true
    prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/空间站位图提示词_v1.0.md
    target_view: semi_top_down
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
    prompt_file: projects/huaqiang-watermelon-animal/outputs/design_prompts/master_scene_prop_reference_v1.0.md
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
      - physical_safety_notes
      - expressive_animation_notes

  space_continuity_seed:
    seed_file: projects/huaqiang-watermelon-animal/details/design/space_continuity_seed_v1.0.md
    anchor_spaces:
      - 街角水果摊正面对峙区
      - 电子秤称重区
      - 摊外空地摩托车停放区
    recurring_landmarks:
      - 红蓝条纹大雨棚
      - 墨绿色三层西瓜铁架
    entrance_exit_logic:
      - 平头哥骑入与骑出左前方通道
      - 土拨鼠掀秤倒地退缩至案板下
    axis_preservation_note: 严守“左买家、右卖家”人字形对峙轴线，镜头朝向严防 180 度翻转颠倒。

  visual_consistency:
    character_anchor_note: 平头哥保持冷静面瘫，银白色平头发顶；恶霸犬保持短胖，白吊带背心人字拖；土拨鼠保持瘦高溜肩，蓝色旧背心，大嘴嚎叫。
    scene_anchor_note: 水果摊保持红蓝条纹雨棚、木案板和墨绿色西瓜架，暖黄色夏日斜射光。
    material_anchor_note: 夹克皮革折痕，棉背心起毛，不锈钢不发亮拉丝。
    blocking_anchor_note: 平头哥在左前，恶霸犬在右后操作台，土拨鼠在右侧辅助。
    prop_state_anchor_note: 电子秤具备空载、作弊数显和掀秤翻出底部磁铁三种状态；摩托车具备骑行、左倾驻车挂盔和踩火喷排气烟圈三种状态。
    expressive_animation_anchor_note: 允许拉伸与挤压（Squash & Stretch），高潮使用果汁水弹爆裂特效，恶霸犬老板打转喷晕头飘旋转金星。

  script_adaptation_notes:
    - 剧本需100%还原台词，并标定每个 10 秒 Beat 覆盖的具体动作与对白。
    - 明确高潮劈瓜时平头哥一爪切碎西瓜，西瓜汁大爆炸冲晕恶霸犬老板，土拨鼠抱头痛哭嚎叫“萨日朗！”的戏份。

  next_action: 进入 scene-script-adapter，结合视觉设定和 100% 对齐台词，按 11 段 10 秒的结构编写完整改编剧本。
```
