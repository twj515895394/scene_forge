data:
  story_function_summary:
    key_characters:
      - 士兰（主角，disaster承受者与和解者）
      - 场务小哥（B02穿帮触发者）
      - 导演（B05高潮触发者）
      - 皇上（彩蛋角色）
    key_scenes:
      - 冷宫/棚拍片场（B01-B05主场景，空间从悲剧→穿帮渐进揭示）
      - 片场休息区（B06释然和解空间）
      - 养心殿（彩蛋场景）
    key_props:
      - 泡沫柱子（B01笑点触发器）
      - 纸板柱子（B02笑点触发器）
      - 蹦床地板（B03笑点顶点）
      - 绿幕背景布（B03蒙太奇笑点）
      - LED显示屏墙面（B05高潮翻转道具）
      - iPad（彩蛋道具）
  character_assets:
    - role_name: 士兰
      reuse_status: new_full
      asset_ref:
      reuse_reason: 全新原创角色，需要完整设定。角色基于清宫妃子类型化形象，但需做去版权化转译。
      required_adjustments: []
    - role_name: 场务小哥
      reuse_status: new_light
      asset_ref:
      reuse_reason: 功能性配角，需要轻量锁定卡（服饰、年龄范围、基本表情），不需要深度角色设定。
      required_adjustments: []
    - role_name: 导演
      reuse_status: new_light
      asset_ref:
      reuse_reason: 功能性配角，仅B05出场。需要轻量锁定卡（导演标配：鸭舌帽/对讲机/监视器）。
      required_adjustments: []
    - role_name: 皇上
      reuse_status: new_light
      asset_ref:
      reuse_reason: 彩蛋角色，仅B06彩蛋出场。需要轻量锁定卡（龙袍类型化廓形），不需要深度设定。
      required_adjustments: []
  scene_assets:
    - scene_name: 冷宫/棚拍片场
      reuse_status: new_full
      asset_ref:
      reuse_reason: >
        全片核心场景，需要在"冷宫"和"棚拍片场"两种状态之间渐进切换。
        需要完整场景设定：正常冷宫状态（烛火/破旧/阴暗）→ 逐步暴露道具元素
        → B05完全暴露为片场状态（灯光/轨道/监视器）。空间连续性要求高。
      required_adjustments: []
    - scene_name: 片场休息区
      reuse_status: new_light
      asset_ref:
      reuse_reason: B06单场使用，轻量锁定卡即可（折叠椅/冰袋/矿泉水/道具拆卸中的背景）。
      required_adjustments: []
    - scene_name: 养心殿
      reuse_status: new_light
      asset_ref:
      reuse_reason: 彩蛋单场使用，轻量锁定卡即可（龙椅/宫殿类型化空间）。
      required_adjustments: []
  prop_assets:
    - prop_name: 泡沫柱子
      prop_status: new_core_prop
      asset_ref:
      handling_note: B01核心道具，需要状态定义：外观像石柱但可弹性形变，表面贴便利贴。
    - prop_name: 纸板柱子
      prop_status: new_core_prop
      asset_ref:
      handling_note: B02核心道具，需要状态定义：外观像石柱但轻飘飘可推倒，背面中空可见场务。
    - prop_name: 蹦床地板
      prop_status: new_core_prop
      asset_ref:
      handling_note: B03核心道具，需要状态定义：覆盖在地毯下，触发时弹起。
    - prop_name: 绿幕背景布
      prop_status: new_core_prop
      asset_ref:
      handling_note: B03核心道具，覆盖在墙上，可被扯下并缠绕角色。
    - prop_name: LED显示屏墙面
      prop_status: new_core_prop
      asset_ref:
      handling_note: B05核心道具，外观逼真石墙面，背面是LED面板，可穿透。
    - prop_name: iPad
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 伴随道具，在养心殿场景设定中作为附属物品处理。
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets:
      - 场务小哥
      - 导演
      - 皇上
      - 片场休息区
      - 养心殿
    new_full_targets:
      - 士兰
      - 冷宫/棚拍片场
      - 泡沫柱子
      - 纸板柱子
      - 蹦床地板
      - 绿幕背景布
      - LED显示屏墙面
  asset_lock_file: details/assets/asset_lock_v1.md
  asset_lock_summary:
    locked_characters:
      - 士兰（new_full）
      - 场务小哥（new_light）
      - 导演（new_light）
      - 皇上（new_light）
    locked_scenes:
      - 冷宫/棚拍片场（new_full）
      - 片场休息区（new_light）
      - 养心殿（new_light）
    locked_props:
      - 泡沫柱子（new_core_prop）
      - 纸板柱子（new_core_prop）
      - 蹦床地板（new_core_prop）
      - 绿幕背景布（new_core_prop）
      - LED显示屏墙面（new_core_prop）
      - iPad（embed_in_character_or_scene）
    downstream_constraints:
      - 全部角色/场景/道具均为全新原创，不存在可复用资产
      - 士兰角色设计必须服从参考边界：清代妃子类型化廓形，严禁复刻具体剧集造型
      - 冷宫场景必须支持"正常冷宫"到"棚拍片场"的双状态渐进切换
      - 五个核心道具必须建立状态机，定义正常外观/触发状态/交互边界
  risk_notes:
    - 全新项目无任何可复用资产，设计阶段工作量大但可控。
    - 士兰角色设计是避免版权风险的第一道防线，需要在"清宫妃子类型感"和"去版权化"之间精确拿捏。
  next_action: 进入 scene-design-builder，优先补士兰完整设定和冷宫/棚拍片场完整场景设定。
