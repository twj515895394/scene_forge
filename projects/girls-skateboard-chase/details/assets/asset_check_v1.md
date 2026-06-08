data:
  story_function_summary:
    key_characters: "女孩A (开朗活力，速度型，超车担当), 女孩B (沉稳技巧，特技型，越障切弯担当)"
    key_scenes: "蜿蜒山道 (包含S弯、直道、修路窄道路障、终点草地)"
    key_props: "炫彩滑板 (两款涂鸦，人物物理载体), 安全头盔与护具 (国潮印花，动作安全红线防线)"
  character_assets:
    - role_name: "女孩A"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "全新原创速降追逐题材，资产库中没有可用的活力滑板少女角色资产。"
      required_adjustments: []
    - role_name: "女孩B"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "全新原创速降追逐题材，资产库中没有可用的技巧滑板少女角色资产。"
      required_adjustments: []
  scene_assets:
    - scene_name: "蜿蜒山道"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "全新原创速降山道，包含急弯、窄路障等复合特性的极限运动公路场景，需完整新建以匹配分镜。"
      required_adjustments: []
  prop_assets:
    - prop_name: "炫彩滑板"
      prop_status: "new_core_prop"
      asset_ref: ""
      handling_note: "作为两个女孩的物理运动载体，滑板涂鸦（亮橙泼墨与深蓝科幻）直接体现个性和物理交互，需建立核心道具卡设计其PBR PBR涂层、滑轮物理挂架与磨损细节。"
    - prop_name: "安全头盔与护具"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "直接嵌入女孩A与女孩B的角色外观锁定设计中，包括国潮印花头盔、护肘护膝等，不单独建核心道具卡。"
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - "女孩A"
      - "女孩B"
      - "蜿蜒山道"
      - "炫彩滑板"
  asset_lock_file: "projects/girls-skateboard-chase/details/assets/asset_lock_v1.md"
  asset_lock_summary:
    locked_characters:
      - "女孩A"
      - "女孩B"
    locked_scenes:
      - "蜿蜒山道"
    locked_props:
      - "炫彩滑板"
      - "安全头盔与护具"
    downstream_constraints:
      - "角色与道具设计必须满足物理速降的真实重心约束，轮子与板身物理结算参数需在设计中锁定。"
      - "必须始终佩戴防护头盔与护肘护膝，任何动作分镜严禁脱下安全防护装备。"
      - "速降山道必须具备完整的三维物理碰撞体（护栏、山体壁），且障碍物（落叶与隔离墩）要提供物理阻击反馈。"
  risk_notes:
    - "由于场景和角色均需全新设计开发，且滑板特技物理绑定较为复杂，对下游的视觉设定与物理仿真存在一定制作压力。"
    - "下坡弯道与跟车运镜如果处理不当易产生画面割裂与3D眩晕，必须严格按照分镜阶段的轴线锁定规范设计。"
  next_action: "进入 scene-design-builder 阶段，针对两名滑板少女的视觉形象、国潮头盔护具、两款炫彩滑板以及山道场景（弯道、障碍区布局）输出详细的视觉设定与生图 Prompts。"
