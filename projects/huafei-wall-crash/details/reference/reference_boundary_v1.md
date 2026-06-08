data:
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: selected
      selected_idea_id: shilan_parody_selected
      selected_title: 士兰撞墙鬼畜——撞什么都撞不死
      selection_note: >
        用户已明确确认改编方向：古装宫斗妃子撞墙名场面鬼畜喜剧化。
        角色已去版权化（华妃→士兰，皇帝未具名）。
        核心笑点引擎：所有可撞之物都是道具，怎么撞都撞不死。
    downstream_rule: >
      下游各阶段围绕鬼畜喜剧改编方向执行。角色统一使用士兰（皇帝的妃子），
      避免任何具体剧集名称、角色名和标志性台词。保留"撞墙"的仪式感动势，
      但转换为棚拍片场元喜剧语境。
  reference_type: hybrid_reference
  decision_summary: >
    以宫斗剧"妃子撞墙"经典桥段的抽象母题为主参考，
    辅以 classic_studio_wuxia（经典棚拍武侠电影感）的类型美学，
    按情绪骨架保留、具体影视表达降继承执行。
    本改编本质是"对一种类型桥段的鬼畜解构"而非"对某一部剧的改编"，
    因此采用 hybrid_reference，同时抽取类型母题并嫁接全新喜剧表达。
  reference_boundary:
    primary_reference: 宫斗剧"妃子撞墙自尽"桥段的类型化母题（角色关系、情绪冲突结构、空间氛围）
    secondary_reference: classic_studio_wuxia 棚拍武侠电影类型美学（棚拍布景感、亮相秩序、古典类型光感）
    boundary_rule: >
      继承类型母题级的角色冲突结构和情绪转折引擎（悲壮→绝望→爆发），
      但将悲剧表达完全翻转为鬼畜喜剧。棚拍美学从"风格手段"升级为"叙事本体"——
      片场的假墙假柱不是制作瑕疵，而是核心笑点的视觉基础。
    allowed_inheritance:
      - 角色关系
      - 情绪核心
      - 剧情骨架
      - 场景气质
    forbidden_inheritance:
      - 角色身份
      - 服装轮廓
      - 镜头动势
  must_keep:
    - category: 角色关系
      note: >
        保留"妃子对皇帝的绝望质问"这一核心关系张力。
        士兰对皇帝的感情从爱→恨→绝望的弧线是撞墙行为的情绪基础，
        没有这份悲壮就没有反差喜剧的起点。
    - category: 情绪核心
      note: >
        保留"得知真相→悲愤爆发→决意赴死"的三段式情绪引擎。
        正是这个极度严肃的情绪起点，才能支撑后续的荒诞翻转。
        保持开场15秒的原剧式悲壮氛围是鬼畜效果的前提。
    - category: 场景气质
      note: >
        保留冷宫的幽闭、昏暗、孤绝氛围——至少在开场阶段。
        冷宫的空间压抑感与后续"棚拍穿帮"形成关键反差。
    - category: 剧情骨架
      note: >
        保留"名台词喊出→冲刺→撞墙"的动作仪式链。
        这个动作链是观众认知锚点，无论撞到什么道具，
        起跑姿势和冲刺决心必须保持原剧级别的认真。
  must_avoid:
    - category: 角色身份
      note: >
        严禁使用"华妃""年世兰""甄嬛传""翊坤宫"等具体角色名、剧名和地名。
        角色统一为"士兰"（皇帝的妃子），皇帝不具名。
        场务小哥、导演等片场角色不使用具体人物特征。
    - category: 服装轮廓
      note: >
        避免复刻任何具体剧集的旗装造型细节（特定花色、头饰款式、刺绣纹样）。
        整体保留"清代宫廷妃子"的类型化廓形即可，不做剧集级别还原。
    - category: 标志道具
      note: >
        不使用原剧中具有强辨识度的特定道具（如欢宜香的具体容器造型）。
        本项目的道具均为棚拍道具：泡沫柱、纸板柱、蹦床、绿幕、LED屏。
  risk_notes:
    - 开场悲壮氛围如果渲染过度，后续喜剧翻转可能显得突兀；需要精确控制前15秒的色调和表演力度。
    - 士兰的人物弧光需保持连贯——从悲壮到荒诞到释然，不能因为鬼畜而丢失角色内核。
  next_action: 进入 scene-story-development，围绕参考边界建立正式故事骨架和 beat 结构。
