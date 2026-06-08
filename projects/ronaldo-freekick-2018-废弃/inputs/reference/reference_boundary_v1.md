data:
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
    downstream_rule: "下游各阶段（故事骨架、角色设计、剧本、动作、分镜、声音和提示词等）必须忠实还原2018世界杯C罗任意球的经典现场氛围、经典动作和戏剧张力，同时在进球后庆祝部分释放视觉张力，融入动作及能量场特效。"
  reference_type: "hybrid_reference"
  decision_summary: "以2018年俄罗斯世界杯葡萄牙对阵西班牙小组赛中C罗的绝平任意球为核心参考，忠实还原备战神态、人墙反应及电梯球球路轨迹，并在进球SIUUU庆祝时引入夸张的动漫风物理及光影特效增强视觉爆发力。"
  reference_boundary:
    primary_reference: "2018俄罗斯世界杯小组赛B组 葡萄牙 vs 西班牙 实况录像（第88分钟C罗任意球）"
    secondary_reference: "写实动漫/特效电影级动作表现（庆祝动作SIUUU的气流与重力场特效）"
    boundary_rule: "准备助跑、摆腿击球、皮球飞行路线及门将扑救动作完全遵循实况物理规律；进球后的狂奔与SIUUU转体落地定格瞬间，允许通过气流扩散、尘土飞扬、能量力场和微弱地面开裂等夸张视觉效果进行情绪情感的具象化渲染。"
    allowed_inheritance:
      - "角色身份"
      - "角色关系"
      - "服装轮廓"
      - "标志道具"
      - "情绪核心"
      - "剧情骨架"
      - "镜头动势"
    forbidden_inheritance:
      - "场景气质"
  must_keep:
    - category: "角色身份"
      note: "必须精准还原C罗准备罚球时的经典细节：深呼吸时胸口的剧烈起伏、坚毅到近乎凝固的眼神特写、拉起短裤露出大腿肌肉的准备姿势。"
    - category: "剧情骨架"
      note: "必须保留经典动作剧情链：主裁判鸣哨 -> C罗深呼吸助跑 -> 踢出完美绕过白色西班牙人墙的电梯球 -> 西班牙门将德赫亚判断失误目送皮球直挂球门右上死角 -> C罗飞奔至角旗区跃起转体180度SIUUU落地庆祝。"
    - category: "标志道具"
      note: "必须保留葡萄牙7号红色球衣、西班牙白色球衣、白底有线条的世界杯足球、草坪上裁判画出的喷雾白色折线。"
    - category: "镜头动势"
      note: "必须保留C罗微距眼神特写、皮球越过西班牙人墙顶部的超慢动作镜头、网底死角机位（皮球入网瞬间）、C罗跃起下落时仰视的低机位升格镜头。"
  must_avoid:
    - category: "场景气质"
      note: "避免死板照搬低对比度、低画质的电视转播画面气质。应升级为高保真电影级渲染，突出落日余晖或强探照灯下的逆光金边光影效果。"
    - category: "剧情骨架"
      note: "避免在进球前引入任何脱离实际足球竞技的非写实改编（如球员产生超能力、足球拖着超长火焰等），确保击球前和击球中的写实感与紧张度。"
  source_intake_reference_use:
    source_intake_used: false
    files_read: []
    inherited_core: null
    inherited_highlights: null
    rewritten_or_replaced: null
    avoid_copying: null
  risk_notes:
    - "C罗面部特征及坚毅眼神的3D动画还原难度极高，需要在角色设计阶段进行重点打磨。"
    - "电梯球弧线球路的物理模拟必须精确，不可过于僵硬，需具备自然的皮球旋转和急剧下坠动态。"
    - "SIUUU庆祝动作的动漫特效需克制，作为情感宣泄的具象表达（气流、震波），避免完全偏离写实底色变为仙侠剧。"
  next_action: "进入 scene-story-development 阶段，围绕参考边界进行30秒轻量故事骨架与镜头节拍设计。"
