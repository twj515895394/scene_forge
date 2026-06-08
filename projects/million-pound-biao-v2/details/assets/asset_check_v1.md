data:
  story_function_summary:
    key_characters: "彪哥 (落魄但强撑尊严的保卫科长，负责在点餐、吃牛排、社会礼仪培训、核账对峙以及滑倒中展现其独特的东北幽默)、弗罗斯特 (势利眼英国侍应生，负责冷遇带位、念账单、以及下巴脱臼震惊与谄媚转折)、领班 (傲慢高个子，警告点餐)、老板老头与老板娘马琪 (抠门老板，负责后厨不留软骨算计与催账)、克莱门斯 (脑补达人总经理，脑补彪哥为隐世杀手巨头)、吃土豆老头 (邻桌拆穿挂钟走快的路人)。"
    key_scenes: "1903古典英式茶室 (提供精致、高雅的英伦物理环境，与彪哥大碴子方言吃大餐产生极限文化冲突)。"
    key_props: "维多利亚至尊钻石黑卡 (作为财富与地位误会的承载媒介)、一大盘炸牛排火腿煎蛋 (点餐与加餐的物理道具，承载‘不要去软骨’剧情)。"
  character_assets:
    - role_name: "彪哥"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "资产库中无现成的‘落魄西装蛤蟆镜’造型的彪哥角色资产，需完整新建视觉与物理特性。"
      required_adjustments: []
    - role_name: "弗罗斯特"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "资产库中无现成的‘弗罗斯特’角色资产，且弗罗斯特需承载下巴脱臼拉长等夸张卡通形变，需完整新建。"
      required_adjustments: []
    - role_name: "领班"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "需完整新建以支撑警告点餐的傲慢言语对决。"
      required_adjustments: []
    - role_name: "老板"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "需完整新建以支撑后厨抠门算计和拍桌催账的表演。"
      required_adjustments: []
    - role_name: "老板娘 (马琪)"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "需完整新建以支撑后厨“碰运气”的算计。"
      required_adjustments: []
    - role_name: "总经理 (克莱门斯)"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "需完整新建以支撑抽雪茄与脑补滑跪的夸张喜剧表演。"
      required_adjustments: []
    - role_name: "吃土豆的老头"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "需完整新建以支撑邻桌点餐和揭露挂钟快两分钟的台词戏份。"
      required_adjustments: []
  scene_assets:
    - scene_name: "1903古典英式高级茶室"
      reuse_status: "reuse_direct"
      asset_ref: "assets/scenes/victorian-tea-room.md"
      reuse_reason: "已存在的古典英式茶室资产在胡桃木装潢、三物理分区（Blocking Map）及灯光色彩预设上完全符合本项目场地不变的要求，可直接复用。"
      required_adjustments: []
  prop_assets:
    - prop_name: "开原维多利亚大饭店至尊钻石黑卡"
      prop_status: "new_core_prop"
      asset_ref: ""
      handling_note: "作为承载财富误会的关键道具，需单独建立核心道具卡设计其烫金字体与PBR高光反射物理状态。"
    - prop_name: "一大盘炸牛排、煎蛋与火腿"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "直接嵌入彪哥的角色设计和餐厅的餐具配件中，不单独建核心道具卡。"
    - prop_name: "大绿葱与大面饼"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "作为就餐的辅助道具，直接嵌入角色吃相设计中。"
  design_actions:
    reuse_targets:
      - "1903古典英式高级茶室"
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - "彪哥"
      - "弗罗斯特"
      - "领班"
      - "老板"
      - "老板娘 (马琪)"
      - "总经理 (克莱门斯)"
      - "吃土豆的老头"
      - "开原维多利亚大饭店至尊钻石黑卡"
  asset_lock_file: "projects/million-pound-biao-v2/details/assets/asset_lock_v1.md"
  asset_lock_summary:
    locked_characters:
      - "彪哥 (new_full)"
      - "弗罗斯特 (new_full)"
      - "领班 (new_full)"
      - "老板 (new_full)"
      - "老板娘 (new_full)"
      - "总经理 (new_full)"
      - "吃土豆的老头 (new_full)"
    locked_scenes:
      - "1903古典英式高级茶室 (reuse_direct)"
    locked_props:
      - "开原维多利亚大饭店至尊钻石黑卡 (new_core_prop)"
    downstream_constraints:
      - "场景必须严格沿用 assets/scenes/victorian-tea-room.md 中定义的 Zone B 账台在左、Zone A 中央大门带罗马壁挂钟、Zone C 靠窗圆桌在右的三物理分区，以维持物理连续性。"
      - "彪哥造型必须锁定为略显磨损起毛的旧西装套红POLO衫（立领耷拉）与带有裂纹的金丝蛤蟆镜，不得设计皮夹克或金链子造型。"
      - "弗罗斯特必须被赋予极大的面部形变网格（以支持下巴脱臼Jaw Drop），老板娘与克莱门斯必须被赋予夸张的面部谄媚褶子网格。"
  risk_notes:
    - "虽然场景直接复用，但克莱门斯核验黑卡时的圣光爆发需在 Zone C 桌面漫射，后续设计阶段必须为桌布、放大镜和卡面单独调试PBR强高光反射参数。"
  next_action: "进入 scene-design-builder 阶段，正式开发彪哥、弗罗斯特等核心角色以及维多利亚至尊钻石黑卡的设计方案与 Midjourney/Flux 生成 Prompt。"
