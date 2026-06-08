data:
  performance_version: v1.0
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
    downstream_rule: "下游围绕平头哥（平头哥蜜獾）华强与恶霸犬老板、土拨鼠小弟的对峙进行 100% 原版台词还原与每段 10 秒的视频切分设计。"
  performance_style: exaggerated_comedy
  expressive_animation_inheritance:
    enabled: true
    animation_stylization_level: high
    injury_tone_level: minor_cartoon
    contrast_comedy_enabled: true
    asset_references:
      effect_library: assets/animation-stylization/effect-library.md
      contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  performance_sheet_path: "projects/huaqiang-watermelon-animal/details/performance_sheet_v1.0.md"
  performance_summary: "本表锁定动物化华强买瓜中平头哥、恶霸犬和土拨鼠的表演规范。平头哥采用冷面笑匠的极致面瘫与经典歪头撑桌对峙姿态；恶霸犬为喧嚣浮夸的恶霸做派，重点设计了二次问瓜后‘一愣卡壳’的神态；土拨鼠为狗仗人势的滑稽配角，结尾大嚎哭进行拉伸变形。B10 劈瓜高潮实施无害化西瓜汁爆破，老板呈现翻白眼、头上转金星的眩晕卡通受击。"
  
  character_performance_profiles:
    - character_id: CHA_01
      character_name: "平头哥 (蜜獾) - 华强"
      acting_energy: 4  # 沉稳、冷峻，以慢打快的压迫感
      eye_focus_pattern: "死锁凝视。眼皮压得很低，极少眨眼，黑眼珠始终直视对手，不发生游离。"
      facial_expression_range: "微小面瘫。嘴角微垂，唯有在挑衅和露出破绽时左侧嘴角有一丝微翘的冷笑。"
      body_language: "背部微弓，垫肩黑色皮衣显得肩膀宽平。动作迟缓沉稳，极有爆发力。"
      body_weight: "重心低，双脚机车靴踏地扎实。站立时重心稍微偏向左前侧踏板车方向。"
      hand_action_pattern: "双爪大部分时间环抱在胸前，或者单爪插在黑色皮夹克口袋里，动作幅度小但极精准。"
      signature_gesture: "撑桌歪头对峙（双爪按在案板边缘，上身前俯，脖子拉直，头向左偏，眼神上翻死死锁住对手）。"
      emotional_leak: "只有在掀翻电子秤和指认吸铁石的一瞬间，眼神会有一刹那睁大并闪过锐利光芒。"
      comedy_reaction_rule: "在极端滑稽可爱的道具（粉色小摩托、猫耳安全帽）包围中保持绝对的冷面硬汉表演，不自知其搞笑。"
      blocking_behavior: "始终占据摊位左前侧，身体朝向右后方的老板，不发生大范围的走位变动。"
      prop_interaction_behavior: "解帽扣、挂安全帽、拍瓜、掀秤等动作慢速精准；出爪劈瓜动作则快如残影。"
      expressive_physics_capacity:
        squash_stretch_allowed: true
        impact_deformation_allowed: false  # 平头哥作为战力天花板，不发生滑稽的撞击变形
        recovery_rule: "闪避挥刀时身体被拉伸呈一道白芒动作线，避开后瞬间恢复原状。"
      cartoon_injury_reaction_rule:
        allowed_visible_injuries: []  # 绝对不准受伤，不准沾染脏污
        forbidden_reactions: "叫喊、恐慌、写实流血或后退"
        recovery_or_settle: "离场时依然清爽冷酷。"
      contrast_performance_profile:
        core_contrast_type: "大佬气质与粉色可爱道具的物理反差萌"
        deadpan_or_self_aware: "completely_deadpan (完全不自知，以极严肃的态度骑粉色车)"
        consistency_boundary: "任何机位反打时，脸上的冰冷面瘫不准动摇。"

    - character_id: CHA_02
      character_name: "恶霸犬 (美国恶霸/斗牛犬) - 摊主"
      acting_energy: 8  # 狂躁、浮夸、多动，市侩气焰高涨
      eye_focus_pattern: "斜眼打量。眼神飘忽，透露出狡黠和贪婪；发怒时双眼圆睁，红眼丝浮现。"
      facial_expression_range: "极其丰富。从剔牙时的不屑、吹嘘时的狂妄、到被拆穿时的气急败坏以及受击后的眩晕呆滞。"
      body_language: "挺起肥硕的肚腩，耸起粗壮的双肩，双手扶腰或扶着案板，身体多摇晃。"
      body_weight: "重心浮躁，肥腿晃动。站立时大屁股摇摆，人字拖在水泥地上有拖沓的物理摩擦。"
      hand_action_pattern: "喜欢用大粗爪子直戳对方，或者用力拍击西瓜皮，拍案拔刀时大开大合。"
      signature_gesture: "吐剔牙牙签（呸一声将牙签吐出），胖手拍打大肚腩。"
      emotional_leak: "用磁铁作弊时，右爪会不自觉地向下压案台边缘，大耳耸动，眼神心虚闪烁。"
      comedy_reaction_rule: "遭到质问时有短暂的一愣卡壳（定格呆滞），随后被大怒咆哮掩盖。"
      blocking_behavior: "死守木案板后侧操作区，高潮爆炸时身体被果汁气流往右后方抛飞。"
      prop_interaction_behavior: "抱西瓜动作粗鲁，拔刀时金属铮鸣，切西瓜时水果大弯刀劈出破空声。"
      expressive_physics_capacity:
        squash_stretch_allowed: true
        impact_deformation_allowed: true  # 允许被果汁狂飙冲得自转变形
        recovery_rule: "被西瓜果汁飓风冲刷在原地如陀螺般飞速自转 3 圈，最后瘫坐在碎椅子上，头部歪向一侧，不反弹恢复。"
      cartoon_injury_reaction_rule:
        allowed_visible_injuries: ["X_X卡通眼", "满脸粘稠粉红西瓜汁与西瓜籽", "口吐白沫圈圈", "头顶漂浮三颗发光的黄色眩晕星星"]
        forbidden_reactions: "任何写实的伤口、凹陷骨折、惨叫哀鸣或面部流血"
        recovery_or_settle: "定格在口吐泡沫圈、翻白眼躺倒的废虚状态，供土拨鼠嚎哭。"
      contrast_performance_profile:
        core_contrast_type: "菜市一霸横肉大块头最终被一爪果汁风暴冲成陀螺打转晕厥的反差"
        deadpan_or_self_aware: "completely_unaware (前脚狠辣，后脚秒晕)"
        consistency_boundary: "晕厥后必须保持滑稽的眩晕定格动作，头上的眩晕星星必须平滑自转。"

    - character_id: CHA_03
      character_name: "土拨鼠 - 小弟"
      acting_energy: 9  # 极度多动与神经质，胆小而尖刻
      eye_focus_pattern: "老鼠眼四处乱转。平时贼眼溜溜地打量平头哥，受惊时眼珠几乎凸出眼眶。"
      facial_expression_range: "狗仗人势的坏笑，到极度恐慌的下巴脱臼拉伸，大张嘴咆哮。"
      body_language: "佝偻耸肩，溜肩，双小爪缩在胸前，喜欢躲在恶霸犬老板的肚皮后侧探头。"
      body_weight: "身体轻飘。被平头哥掀秤吓得往后滑行跌倒，四肢在空中滑稽乱抓爬。"
      hand_action_pattern: "两只小爪不断交叠揉搓，或者拿着大纸扇疯狂摇动，被掀秤时纸扇飞脱。"
      signature_gesture: "大叫萨日朗（大张嘴拉伸至头部的60%以上，泪水像水枪一样朝两侧飙射）。"
      emotional_leak: "华强每看他一眼，他都会浑身皮毛一抖，小腿直打哆嗦。"
      comedy_reaction_rule: "用极度浮夸、近乎男高音唱歌剧的哀恸姿态来哭丧，与冷酷跨车的平头哥形成强烈视觉拉扯。"
      blocking_behavior: "活动于水果摊极右侧，高潮时缩进案板台面下躲避，结尾爬出来抱狗头嚎哭。"
      prop_interaction_behavior: "疯狂摇纸扇，掀秤时纸扇被震飞插在西瓜上。"
      expressive_physics_capacity:
        squash_stretch_allowed: true
        impact_deformation_allowed: true
        recovery_rule: "嚎哭时脖子和嘴部拉伸拉长，哭完后脖子缩回，身子像弹簧般晃动。"
      cartoon_injury_reaction_rule:
        allowed_visible_injuries: ["浑身湿透的毛皮挂满粉红果汁", "双眼喷出卡通水柱泪水"]
        forbidden_reactions: "任何实质肉体伤害"
        recovery_or_settle: "维持在大声破音嚎叫的状态中淡出。"
      contrast_performance_profile:
        core_contrast_type: "小跟班在爆炸后的嚎哭哭丧大戏与华强淡定跨车离场形成的极强冷热反差"
        deadpan_or_self_aware: "dramatically_self_aware (沉浸在自己的悲剧歌剧嚎哭大戏中)"
        consistency_boundary: "大喊萨日朗时的嘴巴比例和声调必须拉到物理崩溃边缘。"

  beat_performance_notes:
    - beat_id: B01
      emotional_goal: "建立平静中深藏压迫感的对峙开局。"
      main_expression: "平头哥面瘫冷酷；恶霸犬市侩轻蔑。"
      micro_expression: "平头哥眉头死死压住，嚼着干草；恶霸犬嘴角抽动，露出半颗犬齿。"
      eye_action: "平头哥单眼皮微张，视线水平锁死摊位；恶霸犬翻了个白眼，斜视进车通道。"
      body_action: "平头哥单脚撑地跨立在粉色踏板车上，双手抓把；恶霸犬躺在椅上，大粗腿架起二郎腿乱抖。"
      hand_action: "平头哥爪子扣死反光镜把手；恶霸犬右手二指夹着牙签往狗牙缝里剔。"
      pause_or_hold: "熄火后，平头哥保持驻车静止姿态 3 秒，空气只有知了声，营造大牌档暴风雨前的宁静。"
      secondary_action: "恶霸犬剔牙后弹了弹爪子，吐出一口气。"
      reaction_timing: "摩托车停稳熄火时，恶霸犬抖腿的频率突然缓了一刹那，又恢复不屑的乱抖。"
      transition_to_next_beat: "平头哥左爪抬起，移向额头前的安全帽搭扣。"
      potential_hero_support: false
      bridge_performance_hook: "手部伸向帽子卡扣的悬停动作。"
      blocking_note: "平头哥摩托车停于左下角空地，恶霸犬躺椅处于案板右后侧。"
      prop_state_note: "粉色小踏板摩托排气管喷出一口微小灰色废烟，随后熄火静止。"
      expressive_performance:
        expression_type: "contrast_comedy"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "硬派皮衣平头哥大佬，跨骑在极其可爱、圆润粉色的萌系摩托上，表情却极为严酷。"
        timing_structure: "驻车静止 3 秒作为 setup。"
        recovery_or_settle: "平头哥在车上踏实踩地锁定重心。"

    - beat_id: B02
      title: "摘盔问价"
      function: setup
      beat_summary: "平头哥慢条斯理下车摘安全帽挂把手上，踱步拍瓜问价。"
      emotion_goal: "正式切入交易，确立华强平缓冷酷的语速。"
      main_expression: "平头哥面无表情，动作慢悠；恶霸犬斜睨打量。"
      micro_expression: "平头哥嘴唇微动，嘴角叼着的干草签上下有规律地摆动。"
      eye_action: "平头哥目光在西瓜堆和恶霸犬脸上缓慢移动；恶霸犬视线跟着平头哥的身形滑动。"
      body_action: "平头哥提腿下车，步伐沉重缓慢；走到案板前身体微前俯。"
      hand_action: "双爪慢动作解开猫耳安全帽卡扣，顺手把安全帽挂在车把镜柱上；在西瓜皮上伸出小爪轻叩两下。"
      pause_or_hold: "叩瓜两次后，平头哥的爪子停留在西瓜皮上悬空半秒，才抬头问价。"
      secondary_action: "安全帽挂在镜柱上微微摆动。"
      reaction_timing: "指爪触碰到瓜皮发出沉闷敲击声的同时，吐字发音：“老板，这西瓜多少钱一斤啊？”"
      transition_to_next_beat: "问完价后，平头哥收回爪子，双手环抱在胸前，直立等答复。"
      potential_hero_support: false
      bridge_performance_hook: "拍瓜的咚咚声与开腔问价的节奏桥接。"
      blocking_note: "平头哥移步至长木案板左侧前，恶霸犬起立靠在椅背。"
      prop_state_note: "粉色安全帽挂在摩托把手上，产生轻微钟摆式摇晃物理摆幅。"
      expressive_performance:
        expression_type: "none"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "无"
        timing_structure: "解帽（2s）➡️ 挂帽（2s）➡️ 踱步（3s）➡️ 拍瓜问话（3s）。"
        recovery_or_settle: "平头哥站定在案板左前方对立面。"

    - beat_id: B03
      title: "抠牙答复"
      function: setup
      beat_summary: "恶霸犬老板不屑剔牙，冷漠吐字报数，平头哥冷眼嚼草。"
      emotion_goal: "展现商贩对小个子平头哥的轻蔑。"
      main_expression: "恶霸犬傲慢市侩；平头哥冷酷冷笑。"
      micro_expression: "恶霸犬狗嘴角咧开挑衅；平头哥眼眶微抖，草签开始在齿间剧烈打转。"
      eye_action: "恶霸犬用眼角余光往下俯视平头哥；平头哥瞳孔微缩，直视对方牙缝。"
      body_action: "恶霸犬屁股在躺椅上挪了挪，往后一瘫；平头哥身体微不可查地向后微靠，保持环抱。"
      hand_action: "恶霸犬粗胖的大爪子把玩着剔牙牙签，随手往案板旁一啐。"
      pause_or_hold: "恶霸犬吐掉牙签后，故意停顿了一整秒，才斜着眼吐出台词：“两块钱一斤。”"
      secondary_action: "土拨鼠小弟在老板后侧探出半个鼠头，贼眉鼠眼地坏笑。"
      reaction_timing: "吐掉的牙签撞在案板木刺上发出极细微的啪嗒声，随后吐字：“两块钱一斤。”"
      transition_to_next_beat: "平头哥听到价格后，嚼草的动作停下，下唇微翘。"
      potential_hero_support: false
      bridge_performance_hook: "吐牙签与报出两块钱价格的声音与情绪桥接。"
      blocking_note: "恶霸犬保持在躺椅上，土拨鼠躲在其侧后方探头。"
      prop_state_note: "吐落的牙签在案板上弹跳两下静止。"
      expressive_performance:
        expression_type: "none"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "无"
        timing_structure: "抠牙（3s）➡️ 啐牙签（2s）➡️ 停顿（1s）➡️ 报数（4s）。"
        recovery_or_settle: "恶霸犬牙尖剔空，保持不屑嘴角。"

    - beat_id: B04
      title: "黄金瓜皮"
      function: escalation
      beat_summary: "平头哥挑衅讥讽，恶霸犬脸色阴沉。"
      emotion_goal: "极具杀伤力的台词输出，挑衅氛围显现。"
      dramatic_question: "这一句金子皮的吐槽效果如何？"
      main_expression: "平头哥带刺冷笑；恶霸犬阴狠防备。"
      micro_expression: "平头哥上唇八字毛胡须微不可查地耸动；恶霸犬狗耳朵慢慢往脑后贴紧。"
      eye_action: "平头哥眼角挑起，露出一抹嘲讽；恶霸犬瞳孔往中间靠拢，锁死对方。"
      body_action: "平头哥脑袋微微歪斜，草签滑向嘴角右侧；恶霸犬在椅上的大腿抖动突然停滞，身体肌肉紧绷。"
      hand_action: "平头哥环抱的双爪中，右手食指指甲轻轻在左臂皮套上刮动；恶霸犬肥手掌死死扣住椅子扶手。"
      pause_or_hold: "平头哥在说“卧槽”后，故意长长停顿 0.8 秒，积攒戏谑气流，再吐出“这西瓜皮是金子做的...”"
      secondary_action: "土拨鼠小弟在老板身后吓得耳朵紧贴脑门，神色一缩。"
      reaction_timing: "平头哥冷嘲的话音刚落，恶霸犬抓椅扶手的指关节因用力发生木板嘎吱声。"
      transition_to_next_beat: "恶霸犬老板肥硕的肚皮猛烈收缩一口气，准备发飙暴跳。"
      potential_hero_support: false
      bridge_performance_hook: "台词尾音的挑衅与老板脸色下沉的肢体反应对接。"
      blocking_note: "平头哥与恶霸犬视线轴线拉紧，空间距离无变化。"
      prop_state_note: "摊位上的红蓝遮阳棚在风中发出几声沉闷的塑料抖动声。"
      expressive_performance:
        expression_type: "none"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "无"
        timing_structure: "平头哥台词吐出（6s）➡️ 老板凝神脸色阴沉变脸（4s）。"
        recovery_or_settle: "恶霸犬老脸彻底阴沉下来。"

    - beat_id: B05
      title: "大棚挑瓜"
      function: escalation
      beat_summary: "老板挺肚叫嚷，平头哥冷淡命令挑瓜。"
      emotion_goal: "商贩粗野反击与华强冷峻应对。"
      main_expression: "恶霸犬粗暴大吼；平头哥死水微澜。"
      micro_expression: "恶霸犬龇牙裂嘴，嘴角有大量卡通唾沫泡泡飞溅；平头哥双眼略微睁大，面部仍无表情。"
      eye_action: "恶霸犬眼珠暴突，向下俯视死瞪；平头哥视线向上平视其喉咙处的皮褶。"
      body_action: "恶霸犬一掌拍椅子猛地站立起身，巨大的体量完全遮盖案板后的阳光，大肚子向前挺出；平头哥双腿站直，皮衣垫肩耸起防备。"
      hand_action: "恶霸犬右手大粗指头直指身后的铁架西瓜堆，左肥手撑着腰；平头哥双手插兜，指爪在兜内扣紧。"
      pause_or_hold: "恶霸犬吼完“你嫌贵我还嫌贵呢”后大口喘粗气，平头哥停顿半秒，才用最低音频回应：“给我挑一个。”"
      secondary_action: "土拨鼠小弟赶紧摇动大纸扇帮老板降温，谄媚点头。"
      reaction_timing: "老板站立时，木躺椅发生滑行倒退的声音，与大吼台词同步爆发。"
      transition_to_next_beat: "恶霸犬老板粗暴转过身去，粗手伸向后方的铁架瓜堆。"
      potential_hero_support: false
      bridge_performance_hook: "恶霸犬粗野立身与平头哥冷静回绝的动态反差。"
      blocking_note: "恶霸犬站立后呈俯视姿态，木椅子往后滑移 0.3 米。"
      prop_state_note: "大雨棚在恶霸犬起立的瞬间投射下大面积阴影，将平头哥覆盖。"
      expressive_performance:
        expression_type: "contrast_comedy"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "横蛮庞大的狗头老板在大吼叫嚣，而小个子平头哥冷静插兜，形成了滑稽的体量与脾气反差。"
        timing_structure: "老板拍案站立大吼（6s）➡️ 喘气停顿（1s）➡️ 平头哥答话（3s）。"
        recovery_or_settle: "恶霸犬重心前移，全身肌肉鼓胀。"

    - beat_id: B06
      title: "抱瓜问熟"
      function: reveal
      beat_summary: "老板抱瓜重砸，平头哥经典姿态拷问“这瓜保熟吗？”。"
      emotion_goal: "核心锚点出现，空气温度骤降。"
      main_expression: "恶霸犬狞笑挑衅；平头哥歪头撑案，死死锁死。"
      micro_expression: "恶霸犬横肉往两侧扯开；平头哥下颌骨收紧，嘴角的草签因为咬牙而断成两截掉落一截。"
      eye_action: "恶霸犬目光下指西瓜；平头哥黑豆眼死水微澜，从下往上斜视，充满偏执威胁。"
      body_action: "恶霸犬抱瓜重拍在木案板上，身体前倾压在瓜上；**平头哥双爪按撑在木案板的油腻边缘，手肘弯曲，身体前倾，头猛地偏斜歪向左侧（复刻刘华强问瓜经典姿态）**。"
      hand_action: "恶霸犬拍打瓜皮发出闷响；平头哥黑皮套爪尖深深抓陷进烂木案板木纹中。"
      pause_or_hold: "西瓜落地砸响后，画面静止一秒，知了声在平头哥说出“这瓜保熟吗”前一瞬间彻底切断（蝉鸣静音），留下绝对的死寂。"
      secondary_action: "土拨鼠小弟在老板身后把纸扇合拢，面色僵直。"
      reaction_timing: "瓜落地拍响的“咚”声余音消散的刹那，平头哥冰冷吐词：“这瓜保熟吗？”"
      transition_to_next_beat: "恶霸犬听到提问后，咧开的嘴角狗皮瞬间有些僵住。"
      potential_hero_support: true  # 为后续镜头张力提供强表演支撑
      bridge_performance_hook: "平头哥经典歪头撑桌动作的物理锁定与灵魂发问。"
      blocking_note: "两个角色隔着正中央的大西瓜近景对立，平头哥头肩向右上方探出。"
      prop_state_note: "案板上的西瓜拍定，表面浮尘在空气中乱抖。"
      expressive_performance:
        expression_type: "none"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "无"
        timing_structure: "抱瓜砸案板（3s）➡️ 老板挑衅（2s）➡️ 经典动作定格与静音（2s）➡️ 灵魂拷问（3s）。"
        recovery_or_settle: "平头哥锁定歪头撑桌的经典雕塑姿态，保持完全不眨眼。"

    - beat_id: B07
      title: "找茬对峙"
      function: reveal
      beat_summary: "老板大吼反怼，平头哥眼神死锁，摊主猛然一愣卡壳，华强二次发问。"
      emotion_goal: "双方寸步不让，陷入僵持对立。"
      dramatic_question: "平头哥重复提问时的心理施压。"
      main_expression: "恶霸犬狂暴大吼 ➡️ 呆滞卡壳（一愣） ➡️ 羞恼；平头哥死锁撑案。"
      micro_expression: "恶霸犬嘴角獠牙呲开，吐沫飞溅，**随后嘴角剧烈抽动，眼神瞳孔急剧缩回一圈（一愣神态）**；平头哥眼皮始终一动不动。"
      eye_action: "恶霸犬狂躁回瞪 ➡️ 视线在平头哥死水般的歪头斜视中出现动摇游离，吞咽口水；平头哥黑瞳死锁。"
      body_action: "恶霸犬全身抖动叫嚣：“我开水果摊的，能卖给你生瓜蛋子？！”**叫嚣完毕后突然身体猛地一震，陷入一愣定格状态卡壳 1 秒**；平头哥撑在案板上的姿态稳如泰山，毫无波动。"
      hand_action: "恶霸犬爪子用力拍打西瓜发出咚咚声；平头哥指爪稳固扣在木案板缝隙里。"
      pause_or_hold: "**恶霸犬一愣卡壳，眼神惶恐的定格保持足足 1.2 秒**，喉结上下大动作滑动一次，才被平头哥以更低声调、极慢的语速打破死寂：“我问你这瓜保熟吗？”"
      secondary_action: "土拨鼠小弟吓得向后挪了半步，扇子无力抖动。"
      reaction_timing: "在恶霸犬喉咙大动作发生吞咽口水声的微音效同时，平头哥二次开腔提问。"
      transition_to_next_beat: "恶霸犬老板老脸涨成猪肝色，气急败坏准备掀桌拔刀。"
      potential_hero_support: true
      bridge_performance_hook: "恶霸犬卡壳一愣神态的定格，与平头哥二次施压提问的节奏衔接。"
      blocking_note: "两个角色视线胶着在西瓜上方，空间轴线为死死咬合的 180 度正反打。"
      prop_state_note: "西瓜在案板上一动不动，反射着白光。"
      expressive_performance:
        expression_type: "none"
        animation_physics: "无"
        injury_reaction: "无"
        contrast_behavior: "无"
        timing_structure: "恶霸犬大吼（4s）➡️ 突然一愣定格卡壳（2s）➡️ 平头哥二次逼问台词（4s）。"
        recovery_or_settle: "恶霸犬老脸面部神经剧烈跳动，进入极度羞怒状态。"

    - beat_id: B08
      title: "拍案拔刀"
      function: reveal
      beat_summary: "老板剁刀发彪，平头哥冷笑询问，老板恶狠狠逼视。"
      emotion_goal: "武器亮出，冲突升至临界物理威胁。"
      main_expression: "恶霸犬凶狠暴怒；平头哥危险冷笑。"
      micro_expression: "恶霸犬鼻褶因愤怒往上翻起，露出粗短鼻孔；平头哥左眼眉毛微微上扬，左嘴角露出冷面嘲弄。"
      eye_action: "恶霸犬眼冒火星死瞪对方；平头哥眼睑半垂，斜视木板上铮鸣颤动的水果弯刀，然后再笑意盈盈地抬头看恶霸犬。"
      body_action: "恶霸犬猛力一巴掌掴在案板上，另一手抽刀大开大合猛力朝下剁击；平头哥双爪从案板上撤回，站直身子，重心微向后仰，做出戏谑挑逗姿态。"
      hand_action: "恶霸犬大肥手死死扣着西瓜刀塑料刀柄；平头哥双手随意地抱回胸前，手指在大腿侧轻点。"
      pause_or_hold: "刀剁下“夺”一声后，刀身铮铮作响，恶霸犬大声喝问，平头哥停顿半秒，才不紧不慢答：“这瓜要是熟的我肯定要啊...”"
      secondary_action: "土拨鼠小弟吓得一屁股从矮凳上翻滚摔倒在地，手脚并用地往后爬行。"
      reaction_timing: "西瓜刀尖刺入木案板爆发出金属尖锐铮鸣的同时，伴随老板的台词喝问：“你是故意找茬是不是？你要不要吧！”"
      transition_to_next_beat: "平头哥伸出一只黑爪，指尖探向案板上的西瓜，暗示要开始博弈。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: true
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "水果刀剁入案板的受力与震颤需要夸张物理变形。"
        downstream_note: "强调刀片在剁入时的弹性弯曲和高速抖动虚影。"

    - beat_id: B09
      title: "上秤称量"
      function: escalation
      beat_summary: "平头哥推瓜上秤，老板报数，平头哥闪电掀秤。"
      emotion_goal: "精细计谋施展与突然爆破的快速转折。"
      main_expression: "平头哥冷冽发难；恶霸犬得意欺诈。"
      micro_expression: "平头哥小瞳孔一缩，眼神射出寒芒；恶霸犬狗嘴歪起，露出小人得志的市侩笑。"
      eye_action: "平头哥死死盯着电子秤下方缝隙；恶霸犬斜眼瞥着跳变的红色数字显示屏。"
      body_action: "平头哥轻轻一爪将瓜推上秤盘，在老板报数完毕的瞬间，身体重心猛然下压，右手闪电般暴起；恶霸犬伸长脖子报数，身体因秤被掀翻而猛向后仰。"
      hand_action: "平头哥用食指利爪将西瓜推上不锈钢秤盘，接着右爪化为虚影猛地拽住秤底边缘向上一扣掀飞；恶霸犬用右手按着案台，指头无声在台下轻动。"
      pause_or_hold: "报完价格“十五斤三十块”后，恶霸犬得意拍秤，平头哥眼神凝聚半秒，出手掀秤动作在 0.5 秒内完成，紧接着是一大段秤飞上空的物理慢镜头定格。"
      secondary_action: "土拨鼠小弟在右侧地上狼狈爬起，大张着嘴，纸扇掉落在西瓜堆里。"
      reaction_timing: "掀秤的巨响与零件散落爆裂的脆响同步，平头哥皮夹克拉链因为剧烈运动发生金属碰撞声。"
      transition_to_next_beat: "秤翻转落地，露出底部合格证纸贴下的特大黑色吸铁石磁铁。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: true
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "电子秤腾空翻滚抛物线和外壳塑料破裂需要夸张的物理变形动能。"
        downstream_note: "注意秤底特大黑色圆吸铁石磁铁要给到镜头的反光特写。"

    - beat_id: B10
      title: "拆磁爆炸"
      function: payoff
      beat_summary: "指认磁铁，老板砍来，平头哥避闪亮爪引爆西瓜汁风暴将老板冲晕。"
      emotion_goal: "动作戏爆发，去害化喜剧核爆瞬间。"
      dramatic_question: "如何消解劈人血腥感？"
      main_expression: "平头哥冷静制裁；恶霸犬发疯暴怒 ➡️ X_X眩晕定格。"
      micro_expression: "平头哥双眼大睁指认，出手时眼眶压平；恶霸犬急眼大吼，横肉被红色西瓜汁气浪冲得剧烈向后波浪状抖动，晕厥后舌头挂在嘴唇外吐卡通泡泡。"
      eye_action: "平头哥盯着磁铁再瞪向老板；恶霸犬眼球充血死砍下，遭到西瓜爆炸后眼球瞬间打转，瞳孔化为 X_X 卡通眩晕线。"
      body_action: "平头哥手指磁铁揭穿，在刀劈来的瞬间，身体微缩如方形残影向左横移；出爪横划，动作利落；恶霸犬挥刀重劈，西瓜爆炸的强力红色气浪呈高压飓风迎面冲在它巨大的躯体上，将其在原地冲刷得像陀螺般飞速自转 3 圈，最后向后仰面倒下，将身后的木躺椅坐得四分五裂。"
      hand_action: "平头哥右手出爪，五指尖伸长出三道弯月状的白色爪风特效；恶霸犬双手握刀狂砍；倒地后肥爪自然瘫软在身侧抽搐。"
      pause_or_hold: "出爪横切仅需 0.2 秒；西瓜核爆红色汁液龙卷喷溅以极慢镜头慢速在大屏幕上飞散展示（慢动作高潮 Payoff 4 秒），随后恶霸犬像陀螺般飞快旋转倒塌。"
      secondary_action: "土拨鼠小弟吓得尖叫着缩成一团圆滚滚的毛球，滑稽地滚进水果架最下层的烂菜筐里躲避。"
      reaction_timing: "爪风割过西瓜皮的瞬间，响起水弹引爆的重低音闷雷轰鸣，伴随粉红色液滴大雨泼洒声。"
      transition_to_next_beat: "红色汁液风暴渐渐落地归于寂静，水果摊一片狼藉，恶霸犬横躺呈眩晕死机状态。"
      potential_hero_moment: true
      bridge_performance_hook: "果汁风暴的卡通液体粒子大爆发与恶霸犬飞转晕眩的物理反馈。"
      blocking_note: "恶霸犬被击退 1.5 米跌落至右后方椅子废墟中，平头哥站在案板中央，指爪收回皮套。"
      prop_state_note: "木案板彻底被喷溅的亮红色汁水浸染；水果大刀斜插在破碎的西瓜皮木屑废墟里。"
      expressive_performance:
        expression_type: "combined"
        animation_physics: "平头哥动作滑行带动作线残影，西瓜汁爆裂呈液态气旋扩散，恶霸犬受击呈陀螺自转并倒塌碎椅。"
        injury_reaction: "恶霸犬老板面部无任何伤口，老头背心浸染亮红西瓜汁，翻白眼X_X，嘴角吐出白肥皂泡圈，头顶有三颗卡通金星围绕自转。"
        contrast_behavior: "无"
        timing_structure: "指认（2s）➡️ 闪避出爪（1s）➡️ 西瓜慢动作大核爆（4s）➡️ 陀螺自转与瘫倒（3s）。"
        recovery_or_settle: "恶霸犬彻底瘫软定格，头部歪斜，不再恢复；平头哥收爪平立。"

    - beat_id: B11
      title: "萨日朗扬长"
      function: release
      beat_summary: "土拨鼠抱狗头嚎大哭，平头哥冷静戴盔踩摩托喷烟圈退场。"
      emotion_goal: "荒诞悲情男高音式哀嚎与冷酷帅气退场的极强笑果。"
      dramatic_question: "视频最后一镜的收束点。"
      main_expression: "土拨鼠崩溃大嚎大哭；平头哥冷静潇洒。"
      micro_expression: "土拨鼠**面部肌肉极度朝四周拉伸（占头部的60%以上，完美还原咆哮Meme）**，嘴角拉到耳根，鼻尖通红，大滴卡通眼泪如喷泉飞射；平头哥面瘫脸拉下，单眼皮压低。"
      eye_action: "土拨鼠紧闭双眼，满脸是泪；平头哥跨上摩托，微低头，眼神从粉色防风镜后冷眼扫过街道，踩油门绝尘。"
      body_action: "土拨鼠从小摊底下一边哆嗦一边往外爬，抱住恶霸犬巨大的狗头嚎嚎大哭，身子不断拉伸颤动；平头哥沉稳走向摩托车，单腿利落跨上粉色小摩托，踩动点火踏板。"
      hand_action: "土拨鼠双小爪捧着恶霸犬沾满果汁的大肥脸；平头哥左手抓把，右手戴好粉色安全帽并拉上猫耳挡风镜，踩下摩托车启动杆。"
      pause_or_hold: "土拨鼠的破音大叫“萨日朗”嚎哭声在背景长鸣 4 秒，与平头哥慢吞吞踩油门、点火发动机突突响形成大冷大热的静默拉扯。"
      secondary_action: "摩托车尾气管冒出三个完美的卡通胖烟圈，平稳地依次扩大淡出。"
      reaction_timing: "摩托车点火发动成功的“突突突”发动机怒吼响起的同时，伴随着土拨鼠最响亮的一声萨日朗尖叫破音。"
      transition_to_next_beat: "平头哥骑摩托缓缓驶出马路左侧拐角，画面以三个排气烟圈圈住镜头中心，渐暗淡出。"
      potential_hero_moment: true
      bridge_performance_hook: "土拨鼠大喊萨日朗的滑稽大嘴表情与平头哥发动粉色摩托冒烟圈的对比表现。"
      blocking_note: "土拨鼠与恶霸犬瘫死在右下角废墟，平头哥摩托车启动并从左侧马路驶离画幅。"
      prop_state_note: "粉色小摩托排气管喷出三个膨胀消散的滑稽黑色尾烟圈。"
      expressive_performance:
        expression_type: "combined"
        animation_physics: "土拨鼠身体和脖颈受悲伤拉扯变形，排气管尾烟呈完美膨胀小圆圈的物理轨迹。"
        injury_reaction: "土拨鼠满身粉红汁水，眼眶飙射出两侧水柱状卡通泪水飞溅（高饱和度浅蓝色水粒子）。"
        contrast_behavior: "土拨鼠撕心裂肺、表情极其狰狞的苦情悲剧嚎哭大戏，与平头哥完全不为所动、踩燃粉色可爱摩托、戴猫耳帽冷静驶离的大佬冷漠脸形成极致的反差笑果。"
        timing_structure: "爬出抱狗头哭萨日朗（4s）➡️ 平头哥跨车系帽扣（2s）➡️ 点火起步突突冒三个烟圈驶离（4s）。"
        recovery_or_settle: "画面归于突突突引擎余音与嚎哭淡出，全片结束。"

  physical_comedy_performance:
    - beat_id: B10
      character_id: CHA_02
      trigger: "平头哥一爪切碎西瓜，西瓜产生红色果汁高压大爆破气流冲击摊主"
      anticipation: "恶霸犬大瓜刀重剁案板砍空，身体因用力过度前倾，眼神有一瞬间发直卡住。"
      impact_or_reveal: "西瓜核爆，亮红色水汽风暴迎面狂飙拍击在他满是狗皮褶的肥大面部上，横肉剧烈被冲刷向脑后像波浪般抖动。"
      deformation_or_contrast_action: "庞大笨重的恶霸犬身体失去地心引力，在原地像陀螺般飞速自转 3 圈，动作拉伸出模糊线条。"
      facial_take: "转圈时狗眼乱转，最后翻白眼，舌头无力地耷拉挂在厚嘴唇边缘随身体转动甩动。"
      hold_timing: "瘫砸在身后的木竹椅废墟中，发出一声清脆的骨牌塌落碎裂响，一动不动保持眩晕定格 2.5 秒。"
      recovery: "头向侧面一歪，眼圈化为 X_X，头顶浮现 3 颗卡通眩晕发光金星自转，彻底失去知觉（settle，不恢复）。"
      continuity_note: "摊主昏迷的眩晕姿态（歪头、口吐泡沫圈、头上星星转）必须跨越到 B11，给土拨鼠提供抱头嚎哭的道具底座。"

    - beat_id: B11
      character_id: CHA_03
      trigger: "看到老板被喷晕倒在废墟，土拨鼠从小摊底下爬出，情绪大崩溃"
      anticipation: "双手抱头，瑟瑟抖动，喉结上下滑动三次，眼睛睁大到极限（Pupil dilation）。"
      impact_or_reveal: "扑跪在恶霸犬瘫倒的胖狗脸前，双小爪大动作捧起狗头，肩膀耸起压低。"
      deformation_or_contrast_action: "身体极度向斜上方拉伸拉长，脖子变长，大张嘴咆哮（下巴张到最大极限占头部的60%以上，完美复刻咆哮土拨鼠 Meme）。"
      facial_take: "双眼因用力紧闭挤在一起，嘴角拉扯到耳根，面部全是褶皱，鼻尖变红，两侧射出拱门形的卡通水柱泪水飞溅。"
      hold_timing: "保持大嘴大开的干嚎定格姿态 3 秒，双爪在空中滑稽地抖动虚影。"
      recovery: "嚎哭完毕后大嘴闭合，身子像被压缩的弹簧般在原地抖动几下，随后继续大哭嚎叫（循环嚎哭）。"
      continuity_note: "嚎哭的大嗓门声音要贯穿平头哥点火、发车到完全驶离的整个背景声场。"

  contrast_performance:
    - beat_id: B01
      character_id: CHA_01
      contrast_type: "vehicle_character_contrast"
      setup_behavior: "平头哥一言不发，黑色机车皮衣挺拔，眼神狠辣平静，全身散发着街头帮派大佬的低气压压迫感。"
      reveal_behavior: "缓缓将一辆极其小巧、轮胎袖珍、漆成娇嫩粉红色的复古女式踏板车驶入，头上系着一顶粉红色、带萌系猫耳的安全帽。身形魁梧的平头哥大佬以极度严肃的态度大剌剌跨着小粉车熄火踩脚撑。"
      deadpan_or_self_aware: "completely_deadpan (完全无视小车的可爱和滑稽，神态极度认真，视其为霸气的黑色哈雷重机)"
      supporting_reaction: "恶霸犬老板看到粉车驶入时，抖动的二郎腿僵了一秒，用极其嫌弃和无语的斜眼打量它。"
      timing: "熄火跨车定格 3 秒，反差情绪在无台词中自然铺垫发酵（Tension setup）。"
      consistency_boundary: "平头哥在车上的坐姿必须挺拔狠辣，眼神不能有一丝游离，防风镜泛起冷光。"

    - beat_id: B11
      character_id: CHA_01
      contrast_type: "ending_cooling_contrast"
      setup_behavior: "水果摊一片废墟，西瓜汁横流，小弟土拨鼠抱着昏迷的老板撕心裂肺、声嘶力竭地嚎大哭‘萨日朗’，背景大雨淋漓般狼狈。"
      reveal_behavior: "平头哥片尘不染，慢条斯理地踱步走向路口，跨上粉色小摩托，踩动打火，排气管突突突喷出三个缓缓膨胀的小圆烟圈。他以极其优雅冷峻的大佬背影，伴着尖利的嚎哭，在知了叫声恢复中骑粉车驶离。"
      deadpan_or_self_aware: "completely_deadpan (对身后的凄凉嚎哭和滑稽摩托完全不屑一顾，维持其大片落幕的冷漠)"
      supporting_reaction: "土拨鼠的嚎哭眼泪呈喷泉状疯狂朝摩托方向飙射，加深画面的冰火两重天反差。"
      timing: "土拨鼠萨日朗尖叫爆发 2 秒后，平头哥第一脚踩动摩托点火；冒出第三个尾烟圈时，摩托起步驶出画面。"
      consistency_boundary: "平头哥跨车和点火的动作不能有慌乱感，摩托起步速度必须是优哉游哉的慢速，不能是慌忙逃窜。"

  injury_reaction_performance:
    - beat_id: B10
      character_id: CHA_02
      visible_injury_level: "minor_cartoon (无害化卡通轻伤)"
      allowed_visible_injury: "满脸粘稠的亮粉红西瓜果汁与挂在额头狗皮褶上的 5 颗西瓜籽，双眼翻白（X_X眼），嘴角淌出一长串卡通白泡泡圈，头顶有三颗旋转发光的卡通金色五角星。"
      reaction_style: "dizzy_stun (眩晕休克动作反馈)"
      comedic_timing: "被红色风暴震飞抛在椅子废墟上的瞬间，眩晕金星出现并在头顶缓缓转圈 3 圈，伴随吐泡泡的节奏规律飘动。"
      forbidden_realistic_focus: "绝对禁止任何写实的流血、刀伤口、淤青、浮肿、骨折或者面部软组织变形下陷。"
      recovery_or_settle: "settle (直接定格在翻白眼眩晕倒地的无意识状态中，不需要起立恢复动作)。"

  action_continuity_chains:
    - chain_id: ACT_CHAIN_01
      source_beats:
        - beat_id: B01
        - beat_id: B02
        - beat_id: B11
      involved_characters:
        - "平头哥 (蜜獾) - 华强"
      carry_over_action: "粉色猫耳安全帽的穿戴状态与摩托位置。B01 平头哥头上戴着安全帽 ➡️ B02 解扣摘下并挂在摩托车左反光镜柱把手上，作为动作静止锚点 ➡️ B02至B10 期间安全帽一直在此锚点保持静止（防镜头跳变位置发生位移） ➡️ B11 平头哥收爪走回摩托，单手将帽从左镜柱取下戴回头顶，卡好挂扣，发车驶离。"
      handoff_signal: "平头哥眼神看向左下角反光镜把手帽子的动作。"
      break_risk: "防止在 B03 至 B10 期间的任意侧机位打扫镜头中，挂在把手上的粉色安全帽突然神秘消失或者转移到右侧反光镜。"

    - chain_id: ACT_CHAIN_02
      source_beats:
        - beat_id: B06
        - beat_id: B07
      involved_characters:
        - "平头哥 (蜜獾) - 华强"
      carry_over_action: "经典歪头撑桌对峙姿势。B06 平头哥出声‘这瓜保熟吗’时双爪按在案板边缘，身子前俯，头向左侧歪斜 ➡️ B07 恶霸犬老板叫嚣反怼并一愣卡壳期间，平头哥无条件维持该歪头撑桌的绝对静止姿态（像石雕一样毫无抖动与位移） ➡️ 直至 B08 恶霸犬拍案拔刀剁桌子，平头哥才收回双爪站直身体。"
      handoff_signal: "恶霸犬拔刀剁入木板发生铮鸣的一刹那，平头哥站直身体的物理惯性动能。"
      break_risk: "防止在 B07 中间由于镜头正反打，平头哥突然站直或头部歪斜方向发生跳变（必须锁死歪头角度与双爪撑案的力矩点）。"

  emotion_continuity_chains:
    - chain_id: EMO_CHAIN_01
      source_beats:
        - beat_id: B06
        - beat_id: B07
        - beat_id: B08
      involved_characters:
        - "恶霸犬 (美国恶霸/斗牛犬) - 摊主"
      emotion_arc: "嚣张市侩 ➡️ 狂躁反怼 ➡️ 瞳孔骤缩一愣（卡壳） ➡️ 极度羞怒暴发拔刀"
      carry_over_expression: "B06 被问及保熟时露出市侩挑衅的狞笑 ➡️ B07 听到保熟问题被重复，先是大怒叫嚣‘能卖给你生瓜蛋子’，随后狗眼瞳孔突然骤缩（一愣卡壳，面部横肉抖动凝固，吞咽口水），眼神出现心虚惶恐 ➡️ B08 一愣后老脸涨红，气急败坏，身体颤抖拍案拔刀。"
      reset_risk: "防止恶霸犬在 B07 吼完直接接拔刀，必须表现出一愣卡壳这 1 秒的核心心理转变期，否则情绪链会断裂，无法体现平头哥眼神的物理压迫感。"

  continuity_rules:
    character_performance_consistency: "平头哥的眼神始终要锁定对手，在非动作发生时头部动作幅度要控制在最小范围；恶霸犬平时多有小幅度的耸肩、晃腰动作体现痞气。"
    emotional_progression: "全片压迫感不能断裂。平头哥的冷静要随时间推移下压得更深更冷；恶霸犬的愤怒要随被反问积攒得更狂躁，直到一愣时卡住，接着怒气决裂剁刀。"
    gesture_continuity: "安全帽的位置（ACT_CHAIN_01）与歪头对峙姿态（ACT_CHAIN_02）在跨 Beat 生成视频时必须使用图像参考进行硬锁定。"
    blocking_continuity: "左平头哥小车，中案板西瓜，右老板与小弟。守住 180 度轴线，严禁发生左买右卖的位置颠倒。"
    prop_interaction_continuity: "掀秤后，落地的电子秤盘和底座在 B10 和 B11 的背景中必须保持破碎倾倒在右下角地面的死状态，大磁铁合格证标签朝上。"
    expressive_animation_continuity: "西瓜炸裂产生的亮红色果汁，在 B10 被喷射出来后，B11 浸染在木案板上以及淋透在土拨鼠、恶霸犬身上的亮红色渍面积要在大体轮廓上保持一致。"
    contrast_comedy_continuity: "平头哥骑粉车和戴帽扣的动作要维持绝对庄重、大佬仪式感；土拨鼠嚎哭萨日朗要嚎出荒诞歌剧风，不能写实惨哭。"
    injury_tone_continuity: "恶霸犬头上的眩晕星星旋转方向必须是水平顺时针，吐泡泡的吹胀消散时间要呈卡通气泡物理抛物线一致性。"

  storyboard_handoff:
    camera_focus_suggestions: "B01至B05建议使用中远景与角色正面反打；B06至B08问瓜时必须切为大案板视平线深焦正反打，突出平头哥歪头按桌的身体剪影；B09掀秤切手部特写；B10爆炸切3D广角大液滴慢放；B11嚎哭萨日朗切土拨鼠变形脸大特写反打平头哥摩托车冷静远去背影。"
    closeup_priority:
      - beat_id: B06
        character_id: CHA_01
        reason: "平头哥歪头撑桌的眼部斜视大特写，眼神死锁，体现冷面压迫力。"
      - beat_id: B07
        character_id: CHA_02
        reason: "恶霸犬叫嚣后猛然一愣、狗眼颤动瞳孔收缩的大特写，体现心理卡壳防线崩溃。"
      - beat_id: B11
        character_id: CHA_03
        reason: "土拨鼠大张嘴（占头60%）哭嚎萨日朗、眼泪呈两侧喷泉飙飞的经典 Meme 大特写。"
    reaction_shot_priority:
      - beat_id: B04
        reaction_character: CHA_02
        reason: "华强说出金子皮台词后，老板横肉一沉、狗耳后贴防备的反应帧。"
      - beat_id: B07
        reaction_character: CHA_02
        reason: "被华强二次逼问保熟时，叫嚣到一愣卡壳的表情转变反应帧。"
    timing_notes: "平头哥的台词气口要留出 0.5-1 秒的静默；B10劈瓜后的爆炸流体扩散和自转晕倒要用 4 秒钟的极慢镜头（Slow-motion）展示，突出动作 Payoff 爽感。"
    hero_moment_support:
      - hero_id: H01
        beat_id: B10
        acting_support: "恶霸犬被喷中时面部呈波浪抖动并陀螺打转，西瓜果汁粒子呈晶莹剔透液态喷溅。"
      - hero_id: H02
        beat_id: B11
        acting_support: "土拨鼠头部拉伸，嘴部拉伸至 60%，手部空中抓扯出抖动虚影，嚎叫萨日朗。"
    bridge_shot_support: "VGU_01到VGU_02需要跟拍平头哥解扣、下车、踱步；VGU_08到VGU_09需要拍西瓜滚上秤盘与恶霸犬按桌遮掩磁铁的特写过渡。"
    blocking_support: "守住左买右卖人字轴线，恶霸犬退场砸椅在案板右后侧 chair debris 范围内。"
    prop_state_support: "安全帽解扣-挂把手-重新戴回扣好；电子秤跳变-翻转飞空-落地破碎磁铁露出。"
    expressive_storyboard_support: "劈瓜爪切时，故事板要在爪芒划过轨迹上设计白色的月牙形空气斩波浪特效线。"
    contrast_reveal_support: "开场平头哥跨小粉摩托和结尾点火冒烟圈时，背景蝉鸣要与点火声突突突做声画呼应。"
    injury_visibility_support: "恶霸犬身上无任何血迹写实伤，仅有西瓜汁溅射和大泡泡，眩晕星星要有金色描边微发光。"

  risk_notes:
    - "西瓜爆裂流体颜色必须是亮红色（Bright Watermelon Red），粒子需要圆润，防止看起来像血液发生过审风险。"
    - "平头哥的出爪斩击轨迹只能划向西瓜，恶霸犬挥刀下劈也必须剁在案板，严禁让任何冷兵器锋刃在画面中与两方身体表皮发生接触线索。"
    - "土拨鼠大吼萨日朗时的嘴巴拉伸比例控制在 60% 头部大小，防止模型拉长发生物理崩溃和穿模。"
    - "恶霸犬一愣卡壳神态必须保留足 1 秒的定格时间，若直接接拔刀剁刀，情绪转折会过快导致戏剧压迫力尽失。"

  next_action: "进入 scene-storyboard-director 阶段，根据本案中的 4-8 镜切分、撑桌歪头经典站姿及一愣卡壳反应，设计 110 秒逐镜头的故事板草图与生图提示词。"
