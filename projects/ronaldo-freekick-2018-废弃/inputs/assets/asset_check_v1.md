data:
  story_function_summary:
    key_characters:
      - "克里斯蒂亚诺·罗纳尔多 (C罗)：孤胆巨星与故事主角，承载从备战、助跑、击球到庆祝的完整戏份。"
      - "西班牙防守人墙：防守屏障，人墙神态紧张，衬托射门高压。"
      - "德赫亚 (西班牙门将)：守门员，负责极限扑救与无能为力目送。"
    key_scenes:
      - "菲什特奥林匹克体育场任意球区域：提供深蓝色夜空与球场巨型探照灯逆光的史诗竞技舞台。"
    key_props:
      - "世界杯足球：承载旋转、飞行弧线、极速急坠、击中球网形变等关键镜头轨迹。"
      - "裁判喷雾白痕：地面几何标识线，作为站位锚点。"
  character_assets:
    - role_name: "克里斯蒂亚诺·罗纳尔多 (C罗)"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "资产库中目前没有任何 C罗 角色资产，作为重点角色且包含微距表情及肌肉紧绷细节，必须进入完整新建路径。"
      required_adjustments: []
    - role_name: "西班牙防守人墙"
      reuse_status: "new_light"
      asset_ref: ""
      reuse_reason: "资产库中无防守人墙资产。作为配角群像，不需完整设计细节，采用轻量新建锁定卡描述其队服（白色）、动作与惊恐情绪表情即可。"
      required_adjustments: []
    - role_name: "德赫亚"
      reuse_status: "new_light"
      asset_ref: ""
      reuse_reason: "资产库中无德赫亚资产。作为守门员，属于辅助配角，采用轻量新建锁定卡描述其守门员手套、球衣和绝望飞扑身姿即可。"
      required_adjustments: []
  scene_assets:
    - scene_name: "菲什特奥林匹克体育场任意球区域"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "资产库中无足球场或体育场资产。考虑到球场大灯逆光、草坪质感、裁判划线等电影级光影需求，决定采用完整新建路径设计此场景。"
      required_adjustments: []
  prop_assets:
    - prop_name: "世界杯足球"
      prop_status: "new_core_prop"
      asset_ref: ""
      handling_note: "作为核心特写与运动轨迹承载体，需单独建立道具锁定卡设计其物理材质与黑白网格花纹。"
    - prop_name: "裁判喷雾白痕"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "作为球场草皮上的几何标线细节，直接嵌入体育场场景中处理，不单独建立道具卡。"
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets:
      - "西班牙防守人墙"
      - "德赫亚"
    new_full_targets:
      - "克里斯蒂亚诺·罗纳尔多 (C罗)"
      - "菲什特奥林匹克体育场任意球区域"
      - "世界杯足球"
  asset_lock_file: "projects/ronaldo-freekick-2018/inputs/assets/asset_lock_v1.md"
  asset_lock_summary:
    locked_characters:
      - "克里斯蒂亚诺·罗纳尔多 (C罗) [new_full]"
      - "西班牙防守人墙 [new_light]"
      - "德赫亚 [new_light]"
    locked_scenes:
      - "菲什特奥林匹克体育场任意球区域 [new_full]"
    locked_props:
      - "世界杯足球 [new_core_prop]"
      - "裁判喷雾白痕 [embed]"
    downstream_constraints:
      - "后续设计中，C罗面部及身姿设计必须紧密参考2018年世界杯实况，禁止使用任何脱离真实的二创捏脸。"
      - "足球必须精准按照2018世界杯官方用球（Telstar 18）的外观进行还原。"
      - "防守人墙和守门员仅做低识别度轻量设计，把资源集中于主角C罗身上。"
  risk_notes:
    - "C罗模型渲染及大腿肌肉精细度要求高，可能对制作周期产生一定压力。"
    - "多机位慢动作回放中，西班牙白色球衣与葡萄牙红色球衣色彩对比强烈，注意色调平衡。"
  next_action: "进入 scene-design-builder 阶段，开展主角C罗完整设计、球场逆光环境设计以及世界杯用球的锁定卡产出。"
