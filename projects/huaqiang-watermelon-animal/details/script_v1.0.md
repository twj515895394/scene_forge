data:
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
  script_confirmation:
    confirmed_by_user: true
    confirmation_note: "用户确认了包含 110 秒总时长、11 段 10 秒分段的剧本及西瓜果汁爆破去害化高潮、土拨鼠嚎哭萨日朗结尾的剧本方案。"
  adaptation_level: mostly_preserve
  performance_style: exaggerated_comedy
  director_style_package:
    confirmation_status: confirmed
    director_style_id: pixar_like
    director_style_version: v1.0
    style_family: 3d_animation
    style_profile_path: style_profiles/pixar_like
    used_default_fallback: false
    fallback_note: ""
  target_total_duration_seconds: 110
  segment_strategy:
    segment_duration_seconds: 10
    segment_count: 11
    segmentation_mode: uniform
    rationale: "适配生成平台10秒时长限制，并能保证华强慢条斯理的经典对峙语气得到100%呈现，避免台词局促压缩。"
  expressive_animation_inheritance:
    enabled: true
    source_stage: stage_index.design
    animation_stylization_level: high
    injury_tone_level: minor_cartoon
    contrast_comedy_enabled: true
    asset_references:
      effect_library: assets/animation-stylization/effect-library.md
      contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  script_summary: "平头哥华强骑着粉色踏板车停在街角水果摊前，慢条斯理下车问瓜，并借挑西瓜对恶霸犬老板的作弊秤进行盘问和揭穿。面对老板拔刀找茬的挑衅，华强一爪劈碎西瓜引爆了亮红色西瓜汁气流大爆炸，将老板震得天旋地转翻白眼倒地，土拨鼠小弟从摊底爬出抱头大喊‘萨日朗’，而平头哥淡定跨上摩托点火绝尘离去。"
  script_source_mode: rewrite_adaptation
  preserved_elements:
    - category: "台词表达"
      note: "100% 还原电视剧《征服》中经典台词对白，如‘这瓜多少钱一斤’、‘这瓜皮是金子做的’、‘这瓜保熟吗’、‘萨日朗’等。"
    - category: "剧情骨架"
      note: "起因-对峙-质询-掀秤-冲突-爆炸-离场的经典事件顺序。"
    - category: "角色神态"
      note: "平头哥面对高大老板时的面瘫冷静与压迫感，恶霸犬老板虚张声势的横蛮，土拨鼠的狐假虎威。"
  rewritten_elements:
    - category: "动画化动作转译"
      note: "平头哥的骑行道具设计为与其体型具有巨大反差的小粉色踏板车与粉色安全帽，增加喜剧细节。"
    - category: "轻中度卡通伤害"
      note: "高潮动作去害化，劈瓜引爆高压西瓜汁形成红色飓风气浪，将恶霸犬老板冲倒，晕厥呈X_X眼、头上转金星并口吐白泡泡。完全规避流血与写实利器刺伤。"
    - category: "反差喜剧"
      note: "平头哥冷静跨车点火伴随排气管喷出三个滑稽烟圈离场，土拨鼠大嘴哭嚎‘萨日朗’的夸张歌剧风反差。"
  story_beats:
    - beat_id: B01
      title: "街角驻车"
      function: setup
      beat_summary: "平头哥骑着粉色踏板摩托车由远及近，缓缓停在街角的水果摊前，熄火，单脚撑地，冷着脸以极具压迫感的姿态坐着。恶霸犬老板跷二郎腿躺在椅上剔牙。"
      emotion_goal: "建立平静中深藏压迫感的对峙开局。"
      dramatic_question: "平头哥以什么气场亮相？"
      visual_focus: "远景到中景镜头。粉色踏板摩托车与平头哥黑色皮衣的强烈色彩对比。"
      action_focus: "摩托车平稳滑行、缓缓踩脚刹、平头哥双爪搭在车把上的冷静不动。"
      performance_hint: "平头哥的眼眶微眯，眼神透露出冰冷压迫感，完全忽视摩托车的滑稽粉色；恶霸犬老板不耐烦地抖腿剔牙。"
      rhythm_hint: "极缓的切入，摩托车引擎突突声由远及近，最终熄火，归于知了鸣叫的盛夏寂静。"
      sound_hint: "摩托车老旧排气声、鸟蝉鸣叫、人字拖在地上拍击的细微声响。"
      target_duration_seconds: 10
      payoff_seed: "粉色复古踏板摩托车与平头哥大佬气质的强烈对比。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: true
        reason: "利用平头哥的大佬气质与粉色小踏板车形成强烈的反差萌。"
        downstream_note: "突出摩托车的可爱圆润造型和平头哥的墨镜与冷酷表情反差。"

    - beat_id: B02
      title: "摘盔问价"
      function: setup
      beat_summary: "平头哥慢条斯理地摘下小粉盔挂在摩托车把上，走到水果摊前用小爪子拍了拍西瓜（咚咚声），冷静发问：“老板，这西瓜多少钱一斤啊？”"
      emotion_goal: "正式切入交易，确立华强平缓冷酷的语速。"
      dramatic_question: "华强的第一声提问语速如何？"
      visual_focus: "平头哥特写到拍瓜近景。粉色安全帽稳固挂在反光镜上。"
      action_focus: "平头哥慢吞吞地解开帽扣、挂盔、踱步到案板前，伸出锋利的指爪轻轻叩击瓜皮。"
      performance_hint: "平头哥说话时嘴唇微动，左嘴角叼着的干草签上下抖动，表情始终处于冰冷面瘫状态。"
      rhythm_hint: "每一个动作都有明显的停顿，体现胸有成竹的从容。"
      sound_hint: "安全帽卡扣解开的声音、脚踩在碎石上的沙沙声、爪子拍击瓜皮的“咚、咚”空闷声。"
      target_duration_seconds: 10
      payoff_seed: "拍西瓜的声音以及华强的慢语速开腔。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "标准铺垫，不宜过多使用表现力特效。"
        downstream_note: "注意西瓜皮的反光和敲击时的微弱变形。"

    - beat_id: B03
      title: "抠牙答复"
      function: setup
      beat_summary: "恶霸犬老板斜眼瞥了平头哥一眼，不屑地吐掉嘴里的牙签答道：“两块钱一斤。”平头哥双臂环抱，眼角抽搐，口中开始嚼着草签。"
      emotion_goal: "展现商贩对小个子平头哥的轻蔑。"
      dramatic_question: "老板是否看不起平头哥？"
      visual_focus: "恶霸犬老板中景剔牙到平头哥冷眼特写。"
      action_focus: "恶霸犬翘脚大腹便便躺着，用大肥爪剔牙，吐出牙签；平头哥双手环抱在胸前，冷冷瞪着老板。"
      performance_hint: "恶霸犬的眼球翻动，透露出市侩和傲慢；平头哥面部肌肉有一次精细的抽动，展现内心的不屑。"
      rhythm_hint: "恶霸犬的动作松散市侩，与平头哥雕塑般的冷静形成速度差。"
      sound_hint: "牙签划过犬齿的摩擦声、吐牙签的“呸”一声、远处微弱的大排档喧闹背景音。"
      target_duration_seconds: 10
      payoff_seed: "恶霸犬市侩的神态。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "对话阶段，强调神态刻画。"
        downstream_note: "恶霸犬大肚腩微微起伏，白色背心滑落肩膀。"

    - beat_id: B04
      title: "黄金瓜皮"
      function: escalation
      beat_summary: "平头哥眼角微挑，语气带刺地嘲讽：“卧槽，这西瓜皮是金子做的，还是西瓜子是金子做的？”恶霸犬老板脸色一沉。"
      emotion_goal: "极具杀伤力的台词输出，挑衅氛围显现。"
      dramatic_question: "这一句金子皮的吐槽效果如何？"
      visual_focus: "平头哥冷嘲的脸部特写到恶霸犬老板嘴角抽搐的反打镜头。"
      action_focus: "平头哥慢吞吞开口，眼神闪过一丝锐利的寒光；恶霸犬剔牙的脚突然停住，脸上的横肉瞬间拉紧下沉。"
      performance_hint: "平头哥眼皮低垂但瞳孔紧盯对手，表现出极致的戏谑；恶霸犬老板眉头紧锁，两只狗耳朵慢慢向后竖起防备。"
      rhythm_hint: "台词一字一顿，每个字都像小刀般锋利，尾音略带挑衅地拉长。"
      sound_hint: "知了鸣叫声仿佛突然小了一半，只剩下平头哥冷静而尖锐的声音。"
      target_duration_seconds: 10
      payoff_seed: "经典金句呈现，挑衅效果拉满。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "重在台词压迫，暂不用物理特效。"
        downstream_note: "平头哥嘴唇微翘的微表情是镜头核心。"

    - beat_id: B05
      title: "大棚挑瓜"
      function: escalation
      beat_summary: "老板猛然站起身挺起肚皮，大嗓门嚷嚷：“你瞧瞧现在哪有西瓜啊？这都是大棚的西瓜，你嫌贵我还嫌贵呢。”平头哥冷淡答道：“给我挑一个。”"
      emotion_goal: "商贩粗野反击与华强冷峻应对。"
      dramatic_question: "摊主是否展现了物理体量压迫？"
      visual_focus: "仰拍恶霸犬立起身后的高大身躯，到平头哥俯拍冷漠脸的切分。"
      action_focus: "恶霸犬一巴掌拍在躺椅上猛然站起，肥肚腩横向撑开雨棚下的阴影；平头哥身体微丝不动，只是把头微微抬高一寸。"
      performance_hint: "恶霸犬龇牙咧嘴，大声咆哮，口沫横飞；平头哥面无表情，极轻地点了点头，吐出冷淡的指令。"
      rhythm_hint: "恶霸犬动作快而猛烈，木椅往后滑退发出尖锐摩擦声，平头哥的回应则极冷极慢，重新拉住节奏。"
      sound_hint: "椅子摩擦地面的刺耳“嘎吱”声、恶霸犬大嗓门的轰鸣、平头哥平缓低沉的嗓音。"
      target_duration_seconds: 10
      payoff_seed: "大块头与小身板在气势上的反差平手。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: true
        reason: "恶霸犬挺起巨大身躯与矮小平头哥的对比，形成滑稽的体量压迫。"
        downstream_note: "强调恶霸犬白色老汉衫下晃动的赘肉线条。"

    - beat_id: B06
      title: "抱瓜问熟"
      function: reveal
      beat_summary: "老板在西瓜堆里粗鲁一拍，抱出一个大西瓜放在台面上：“行！这瓜怎么样？”平头哥盯着恶霸犬，以经典姿势压迫并冰冷地提问：“这瓜保熟吗？”"
      emotion_goal: "核心锚点出现，空气温度骤降。"
      dramatic_question: "“这瓜保熟吗”发声时的压抑感。"
      visual_focus: "拍在案板上的西瓜特写，拉伸到两人在案板两侧隔瓜对视的水平中景。"
      action_focus: "恶霸犬粗暴地将西瓜抱起重摔在长木案板中央；平头哥前倾并双爪按撑在木案板边缘，上半身弓下前探，头往侧面歪斜，眼神向上斜视锁死恶霸犬（经典姿态复刻）。"
      performance_hint: "恶霸犬挑衅地拍了拍瓜，面带嘲弄；平头哥维持双爪撑案板的前倾歪头姿态，眼神极度冰冷死寂，语气低沉而肯定。"
      rhythm_hint: "背景所有的环境杂音在平头哥说出“这瓜保熟吗”的瞬间骤然全部切断，万籁俱寂。"
      sound_hint: "西瓜砸在案板上的沉重闷响、木板的吱呀声、空气中知了叫声突然静音的突变效果。"
      target_duration_seconds: 10
      payoff_seed: "全片最著名的灵魂提问“这瓜保熟吗”，复刻经典问瓜站立姿态。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "戏剧转折的核心静止点，利用经典动作和音画突变创造真空般的紧张氛围。"
        downstream_note: "平头哥眼睛中必须倒映出西瓜的绿色轮廓，歪头撑桌的姿势必须有力量感。"

    - beat_id: B07
      title: "找茬对峙"
      function: reveal
      beat_summary: "老板裂开獠牙怒怼：“我开水果摊的，能卖给你生瓜蛋子？”平头哥毫无动摇，眼神死锁，摊主猛然一愣卡壳，平头哥语调甚至更加平缓冷漠：“我问你这瓜保熟吗？”"
      emotion_goal: "双方寸步不让，陷入僵持对立。"
      dramatic_question: "平头哥重复提问时的心理施压。"
      visual_focus: "恶霸犬裂嘴大吼的特写与平头哥双眼一动不动的凝视反打。"
      action_focus: "恶霸犬身体前倾，唾沫飞溅；平头哥面部和撑案姿势保持绝对静止；恶霸犬狗眼一颤猛然愣住一瞬间，表情有些微呆滞与惶恐卡壳（一愣），喉头轻微耸动。"
      performance_hint: "恶霸犬在叫嚣后被平头哥死水般的歪头眼神盯得脊背发凉，猛然一愣卡壳；平头哥的冷静到了偏执的程度，像一堵无法击穿的石墙。"
      rhythm_hint: "恶霸犬的语速变快、语调尖锐后突然卡顿一秒；平头哥第二次提问比第一次更加缓慢、声调压得更低，产生极强的情绪逆向压迫。"
      sound_hint: "恶霸犬大吼后的吞咽口水声、平头哥手指在木案板上极有规律的“嗒、嗒”敲击声。"
      target_duration_seconds: 10
      payoff_seed: "双重提问积累起的物理危机感，摊主瞬间一愣的情感张力。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "心理对峙的最高点，恶霸犬的一愣卡壳作为情绪顿挫点。"
        downstream_note: "恶霸犬嘴角獠牙流出的口水反光是神态重点，卡壳一愣神态要做到位。"

    - beat_id: B08
      title: "拍案拔刀"
      function: reveal
      beat_summary: "老板猛烈拍案拔刀剁在木板上：“你是故意找茬是不是？你要不要吧！”平头哥微翘嘴角：“这瓜要是熟的我肯定要啊。那它要是不熟怎么办呀？”老板恶狠狠答：“要是不熟自己吃了它！”"
      emotion_goal: "武器亮出，冲突升至临界物理威胁。"
      dramatic_question: "大西瓜刀的视觉威慑力。"
      visual_focus: "大刀剁入木板的低角度特写，到两个角色头部在刀锋两侧错开的深焦镜头。"
      action_focus: "恶霸犬一肥掌砸在台面上，顺手抽出插在案板上的水果砍刀，“夺”一声剁在西瓜前；平头哥眼皮动了动，左嘴角微微一扬，吐出草签。"
      performance_hint: "恶霸犬狂怒到了极点，身体微微颤抖，眼神充满威胁；平头哥露出危险的笑意，那是找到猎物破绽的狡黠冷笑。"
      rhythm_hint: "剁刀的动作极快，伴随金属铮鸣；华强的回答则带着戏谑的滑音，挑逗对手底线。"
      sound_hint: "木桌被砸响的巨震声、水果刀剁入木案的“夺”声并伴随金属刀片的高频颤音、恶霸犬急促的呼吸声。"
      target_duration_seconds: 10
      payoff_seed: "水果刀的出现作为冲突导火索。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: true
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "水果砍刀剁入木案的颤动需要夸张的物理变形和反光光效。"
        downstream_note: "刀身必须反射出头顶条纹雨棚的颜色。"

    - beat_id: B09
      title: "上秤称量"
      function: escalation
      beat_summary: "平头哥冷笑着推瓜上秤。电子秤上数字闪烁，老板斜眼报数：“十五斤，三十块。这称够数吧？”平头哥眼神一寒，伸手直接将电子秤扯翻掀底。"
      emotion_goal: "精细计谋施展与突然爆破的快速转折。"
      dramatic_question: "掀秤动作的突然性。"
      visual_focus: "电子秤跳变红色数字的特写，迅速切为秤体在空中翻滚飞出秤盘的侧面中景。"
      action_focus: "平头哥用小爪将西瓜推上秤盘，数字急速变幻。恶霸犬手掌按秤，不屑报数。平头哥右手猛然化为一道虚影，拽住秤身往上一掀，电子秤翻转飞空。"
      performance_hint: "恶霸犬以为诡计得逞，面带轻蔑得意；平头哥眼神瞬间变得极为冰冷，掀秤的动作快准狠，没有一丝拖泥带水。"
      rhythm_hint: "前5秒称重节奏缓慢而市侩；后5秒掀秤动作突如其来，瞬间点燃冲突物理速度。"
      sound_hint: "西瓜滚上秤盘的“咕噜”声、电子秤开机“嘀”一声、平头哥出爪的微弱破风声、电子秤离桌落地时塑料底座破裂和零件散落的脆响。"
      target_duration_seconds: 10
      payoff_seed: "突然掀秤的视觉冲击。"
      potential_hero_moment: false
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: true
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason: "掀秤动作和电子秤破裂需要夸张的物理抛物线和碎裂细节。"
        downstream_note: "电子秤底部的大磁铁要在翻转中反光露面。"

    - beat_id: B10
      title: "拆磁爆炸"
      function: payoff
      beat_summary: "老板吼叫找茬。平头哥指认秤底大磁铁：“吸铁石贴在秤底下，当我傻逼啊？”老板急眼砍来。平头哥敏捷闪身一爪横切，西瓜像果汁炸弹爆破喷出巨量红色风暴，老板被冲晕翻白眼倒地。"
      emotion_goal: "动作戏爆发，去害化喜剧核爆瞬间。"
      dramatic_question: "如何消解劈人血腥感？"
      visual_focus: "平头哥指着秤底磁铁的特写 ➡️ 恶霸犬挥刀下砍 ➡️ 爪风闪过 ➡️ 西瓜爆裂红色风暴吞没整个摊位。"
      action_focus: "平头哥指尖指着磁铁；恶霸犬狗急跳墙猛砍；平头哥身形一矮（残影特效），右手亮爪横向撕裂；案板上的西瓜瞬间四分五裂，爆发液态巨浪。"
      performance_hint: "恶霸犬气急败坏、面目狰狞；平头哥冷静出手、利落优雅；老板在爆破西瓜汁气流中翻白眼、像陀螺般飞转倒下。"
      rhythm_hint: "极快的物理交锋，出招只在1秒内，西瓜爆炸流体爆发则以慢镜头展示，果汁在空中缓缓扩散，形成视觉奇观。"
      sound_hint: "恶霸犬的愤怒咆哮、利刃破空的刺耳“呼”声、平头哥亮爪的金属闪光音效、西瓜爆裂如水弹爆炸的轰鸣（重低音轰鸣）、果汁喷淋的哗啦声。"
      target_duration_seconds: 10
      payoff_seed: "西瓜果肉大核爆，全片最高视觉 payoff。"
      potential_hero_moment: true
      bridge_need: true
      expressive_animation_hint:
        use_stylized_action: true
        use_minor_cartoon_injury: true
        use_contrast_comedy: true
        reason: "高潮戏份，动作转译、西瓜爆裂流体动效与恶霸犬被震晕倒地呈X_X眼、头上漂星星的卡通受击特效需要拉满。"
        downstream_note: "西瓜汁必须是亮红色（Bright Watermelon Red），绝对避免暗红和血液感；眩晕星星要发金色光芒。"

    - beat_id: B11
      title: "萨日朗扬长"
      function: release
      beat_summary: "浑身湿透的土拨鼠小弟爬出来抱起倒地的恶霸犬胖狗头，张嘴嚎嚎大哭：“萨——日——朗——！！”平头哥戴上粉头盔踩燃摩托发动机，在哭嚎声中一轰油门离场。"
      emotion_goal: "荒诞悲情男高音式哀嚎与冷酷帅气退场的极强笑果。"
      dramatic_question: "视频最后一镜的收束点。"
      visual_focus: "中景到特写。土拨鼠抱狗头撕心裂肺大哭的大嘴特写，平反打为平头哥骑摩托驶离背景的冷静背影。"
      action_focus: "土拨鼠双手疯狂抓扯自己湿透的毛发，大张嘴咆哮；平头哥从容戴回粉色安全帽，踩下踏板点火，排气管喷出三个膨胀黑烟圈后绝尘而去。"
      performance_hint: "土拨鼠面部极度拉伸（经典Meme大叫表情），眼睛挤出卡通喷泉泪水；平头哥面无表情踩油门，与土拨鼠的狂乱悲哭形成荒诞对比。"
      rhythm_hint: "土拨鼠的尖叫拉长到极致，与摩托车逐渐远去的“突突突”发动机节奏交织在一起，画面以黑烟圈环绕镜头淡出。"
      sound_hint: "土拨鼠撕心裂肺、破音咆哮“萨日朗！”（Sa Ri Lang）、老旧摩托车沉重吃力的点火发动机踩踏声、摩托车轰油门驶离马路的排气声和轮胎沙石摩擦声。"
      target_duration_seconds: 10
      payoff_seed: "土拨鼠表情包嚎哭与平头哥粉色摩托车淡定离场的荒诞结尾。"
      potential_hero_moment: true
      bridge_need: false
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: true
        use_contrast_comedy: true
        reason: "网络Meme的完美落地，利用嚎哭与帅气退场的强对比收尾。"
        downstream_note: "土拨鼠的大嘴嚎哭表情一定要拉伸到占整个面部的60%以上以契合经典Meme。"

  expressive_beat_opportunities:
    - beat_id: B10
      opportunity_type: combined
      original_beat: B10
      proposed_expression: "平头哥一爪横切引爆西瓜形成粉红色果汁龙卷，将恶霸犬老板直接冲得像陀螺般飞速自转，最后双眼翻白（X_X眼）倒地，头顶有3个金黄色的亮光卡通星星在盘旋。不仅完全掩盖原版的砍杀暴力，而且增加了好莱坞动画级别的动作滑稽度。"
      emotional_function: "将写实物理冲突完全释放为卡通奇观，消除血腥，带来快乐的情绪释放。"
      comedic_function: "陀螺打转与金星眩晕的皮克斯卡通受击反馈。"
      safety_or_tonal_note: "西瓜汁材质调成鲜艳、饱满的亮西瓜红（Bright Watermelon Red），粒子呈水弹液滴，严禁暗红或血液质感。"
      downstream_owner: scene-video-prompt-builder

    - beat_id: B11
      opportunity_type: contrast_comedy
      original_beat: B11
      proposed_expression: "土拨鼠抱住庞大的老板狗头撕心裂肺嚎叫‘萨日朗’，眼泪呈两侧喷泉飞出。而浑身不沾一滴汁水的平头哥，在耳边尖利的哀鸣中慢条斯理地戴好有猫耳装饰的粉色安全帽，跨上粉色踏板车，踩下点火踏板。伴随小摩托‘突突突’冒出三个缓缓膨胀的卡通小黑烟圈，平头哥冷酷的背影在清风中缓缓驶离现场。"
      emotional_function: "网络爆梗的高潮重现，用戏剧化和荒诞的音画极差收尾。"
      comedic_function: "土拨鼠的过度悲情嚎哭与平头哥极度装酷、骑粉色滑稽摩托形成的终极反差萌。"
      safety_or_tonal_note: "土拨鼠的嘴巴要在动画绑定中进行夸张的拉伸比例，确保极高的网络Meme还原度。"
      downstream_owner: scene-performance-director

  stylized_action_opportunities:
    - beat_id: B10
      scene_trigger: "恶霸犬摊主挥刀砍向平头哥"
      original_action_or_risk: "白刃砍伤与写实打斗"
      proposed_animation_translation: "平头哥侧身跨立，身形拉出一道残影，在刀锋落下的瞬间进行极速的后滑错位。随后出爪，爪风形成一道白色的弯月形刀芒特效划过西瓜，随后西瓜内部积攒的红色果汁气浪呈扇形气流大爆破。"
      recommended_animation_level: extreme
      recommended_effect_combo: "出爪残影 + 弯月形白芒爪风 + 西瓜汁流体高压喷溅粒子"
      injury_tone: minor_cartoon
      safety_note: "刀具在画面中只能用于破坏秤或剁入案板，严禁有任何刀刃接触角色肢体表面的运动画幅。"

  contrast_opportunities:
    - beat_id: B01
      contrast_type: vehicle_character_contrast
      setup_expectation: "平头哥是个身穿黑色皮衣、眼神凶悍的街头黑帮大佬，观众期待他会骑一辆轰鸣咆哮的重型哈雷机车登场。"
      payoff_reveal: "平头哥跨立在一辆极小、圆润、通体粉红色的复古踏板车上，头上还戴着一顶粉红色带萌萌猫耳的安全帽。大佬表情冷峻压迫，车身可爱娇柔，形成极端反差。"
      emotional_function: "在开场第一秒破冰，用视觉错位暗示短片夸张喜剧的搞笑定位，让观众立刻建立好奇心。"
      comedic_function: "大汉骑小粉车的经典反差萌。"
      use_template: true
      avoid_repetition_note: "踏板车在全片左侧保持固定的空间锚点，保证空间连续性不发生瞬移。"

  hero_moment_candidates:
    - hero_id: H01
      title: "高饱和度粉红西瓜汁液大核爆吞没水果摊，果肉粒子在镜头前呈 3D 喷溅"
      related_beat: B10
      reason: "全片物理特效的中心点，用于展示高质量的流体物理学模拟与果汁膨胀特效。"
      visual_payoff: "西瓜皮向外炸裂的碎片与放射性亮红水花交织，在逆光夏日照耀下闪烁晶莹质感。"
    - hero_id: H02
      title: "土拨鼠抱起恶霸犬狗头，大张嘴咆哮“萨——日——朗——！！”眼泪喷泉飞射"
      related_beat: B11
      reason: "经典网络搞笑表情包的网络化还原，是全片最大的病毒式传播引爆点。"
      visual_payoff: "土拨鼠面部夸张变形拉伸，背景为倒塌的水果摊与平头哥逐渐远去的滑稽小摩托。"

  beat_table_file: "projects/huaqiang-watermelon-animal/details/script/beat_table_v1.0.md"
  video_generation_unit_plan_file: "projects/huaqiang-watermelon-animal/details/script/video_generation_unit_plan_v1.0.md"
  
  beat_table:
    - beat_id: B01
      dramatic_role: setup
      emotional_turn: "虚无 ➡️ 冷静压迫"
      action_chain_role: "进场驻车，冷眼相对"
      continuity_risk: "踏板摩托车停靠坐标，头盔在头上的朝向"
      target_duration_seconds: 10
    - beat_id: B02
      dramatic_role: setup
      emotional_turn: "压迫 ➡️ 挑衅发问"
      action_chain_role: "下车，拍瓜，冷面发问"
      continuity_risk: "安全帽挂扣挂在车把上，拍瓜次数 (2次)"
      target_duration_seconds: 10
    - beat_id: B03
      dramatic_role: setup
      emotional_turn: "漠视 ➡️ 挑衅反馈"
      action_chain_role: "老板剔牙，斜眼报数"
      continuity_risk: "牙签在恶霸犬嘴里的晃动角度，人字拖方位"
      target_duration_seconds: 10
    - beat_id: B04
      dramatic_role: escalation
      emotional_turn: "调侃 ➡️ 蓄势冲突"
      action_chain_role: "华强讥讽，老板沉脸"
      continuity_risk: "平头哥嘴边干草抖动，恶霸犬眼珠微转"
      target_duration_seconds: 10
    - beat_id: B05
      dramatic_role: escalation
      emotional_turn: "嚣张 ➡️ 冷酷命令"
      action_chain_role: "老板起立反驳，华强点单"
      continuity_risk: "恶霸犬站起身后的物理体量剪影与椅子距离"
      target_duration_seconds: 10
    - beat_id: B06
      dramatic_role: reveal
      emotional_turn: "贪婪 ➡️ 危机对峙"
      action_chain_role: "老板拍瓜，华强保熟首问"
      continuity_risk: "水果案板在镜头前的纵深，背景蝉鸣静音"
      target_duration_seconds: 10
    - beat_id: B07
      dramatic_role: reveal
      emotional_turn: "叫嚣 ➡️ 步步紧逼"
      action_chain_role: "老板狡辩，华强重复保熟"
      continuity_risk: "双方对视人字形轴线，恶霸犬嘴角獠牙特写"
      target_duration_seconds: 10
    - beat_id: B08
      dramatic_role: reveal
      emotional_turn: "暴怒 ➡️ 戏谑博弈"
      action_chain_role: "老板拔刀威慑，华强戏谑"
      continuity_risk: "案板大瓜刀扎入木板的物理角度与铮鸣颤动"
      target_duration_seconds: 10
    - beat_id: B09
      dramatic_role: escalation
      emotional_turn: "欺诈 ➡️ 突然决裂"
      action_chain_role: "秤上博弈，华强掀翻电子秤"
      continuity_risk: "电子秤被掀起飞空的塑料抛物线及落地读数"
      target_duration_seconds: 10
    - beat_id: B10
      dramatic_role: payoff
      emotional_turn: "拼死 ➡️ 卡通晕厥"
      action_chain_role: "老板挥刀，华强一爪爆瓜"
      continuity_risk: "西瓜汁爆炸粒子轨迹与亮红果浆物理扩散"
      target_duration_seconds: 10
    - beat_id: B11
      dramatic_role: release
      emotional_turn: "绝望 ➡️ 荒诞谢幕"
      action_chain_role: "小弟嚎哭，华强骑车退场"
      continuity_risk: "土拨鼠抱大狗头站位，踏板摩托排气烟圈圈数"
      target_duration_seconds: 10

  video_generation_unit_plan:
    - vgu_id: VGU_01
      linked_beat_ids:
        - B01
      narrative_goal: "建立街角水果摊正面全景，展示平头哥骑摩托驶入并停靠的过程。"
      target_duration_seconds: 10
      shot_density_hint: "4镜 (高动态调度)"
      shot_details:
        - shot_01: "大远景。盛夏知了鸣叫，水果摊老街空旷，隐约传来摩托引擎声。"
        - shot_02: "中远景跟拍。平头哥戴小粉盔骑小粉车，由远及近慢速滑入。"
        - shot_03: "反打中景。恶霸犬老板躺在椅上剔牙，抖脚瞅见摩托。"
        - shot_04: "中景。平头哥刹车，踩脚撑熄火，冷面跨立在车上直视小摊。"
      bridge_required: true
      action_continuity_focus: "踏板摩托车滑行轨迹、车胎与泥地泥点飞溅。"
      emotion_continuity_focus: "冷峻压迫感的建立。"
    - vgu_id: VGU_02
      linked_beat_ids:
        - B02
      narrative_goal: "平头哥下车摘安全帽，问出首句台词。"
      target_duration_seconds: 10
      shot_density_hint: "4镜"
      shot_details:
        - shot_01: "平头哥特写。黑皮套小爪子解开粉安全帽挂扣。"
        - shot_02: "车把把手特写。小粉帽摘下，挂在反光镜柱把手旁。"
        - shot_03: "低角度跟拍。机车靴沉稳踩沙地踱步至案板前。"
        - shot_04: "近景拍瓜.小指爪拍瓜两声：“老板，这西瓜多少钱一斤啊？”"
      bridge_required: true
      action_continuity_focus: "粉色安全帽挂扣卡在左车反光镜把手上的状态，右爪拍击瓜皮频率。"
      emotion_continuity_focus: "平缓慢速的挑衅情绪切入。"
    - vgu_id: VGU_03
      linked_beat_ids:
        - B03
      narrative_goal: "展现恶霸犬老板市侩抠牙回绝，平头哥冷眼嚼草。"
      target_duration_seconds: 10
      shot_density_hint: "4镜"
      shot_details:
        - shot_01: "恶霸犬狗脸大特写。双眼缝隙，神色慵懒轻蔑。"
        - shot_02: "抠牙特写。肥爪咬剔牙签，随口一吐，面朝外答：“两块钱一斤。”"
        - shot_03: "侧面对立中景.平头哥在对面双臂环抱，嚼动嘴角的干草签。"
        - shot_04: "平头哥微表情特写。微微抽搐的眼角，满是冰冷与不屑。"
      bridge_required: true
      action_continuity_focus: "牙签/干草在两人嘴角的相对位。"
      emotion_continuity_focus: "双方冷硬与不屑的气势交错。"
    - vgu_id: VGU_04
      linked_beat_ids:
        - B04
      narrative_goal: "平头哥正面抛出“金子皮”的经典嘲讽，恶霸犬面色下沉。"
      target_duration_seconds: 10
      shot_density_hint: "4镜"
      shot_details:
        - shot_01: "平头哥特写。眼神深沉：“卧槽，这西瓜皮是金子做的...”"
        - shot_02: "恶霸犬老板嘴角耸动特写。獠牙咬合，横肉抽缩。"
        - shot_03: "反打平头哥。继续讥讽：“...还是西瓜子是金子做的？”"
        - shot_04: "案板中景。恶霸犬抖动的粗腿猛踩定，狗脸黑沉，土拨鼠小弟悄悄缩头。"
      bridge_required: true
      action_continuity_focus: "平头哥上唇八字毛胡的物理微颤，恶霸犬狗耳耸立。"
      emotion_continuity_focus: "对峙张力加速压缩。"
    - vgu_id: VGU_05
      linked_beat_ids:
        - B05
      narrative_goal: "老板站起身挺肚吵嚷，平头哥冷静命令挑瓜。"
      target_duration_seconds: 10
      shot_density_hint: "5镜"
      shot_details:
        - shot_01: "中景。伴随椅子嘎吱摩擦声，恶霸犬老板猛然站直身子。"
        - shot_02: "仰拍恶霸犬。指着货架狂吼：“你瞧瞧现在哪有西瓜啊？这是大棚瓜...”"
        - shot_03: "恶霸犬凶悍特写：“...你嫌贵我还嫌贵呢！”飞沫效果。"
        - shot_04: "平头哥视角俯拍。冷视不动，毫无波澜。"
        - shot_05: "平头哥低沉特写。平静吐词：“给我挑一个。”"
      bridge_required: true
      action_continuity_focus: "恶霸犬老板挺起的大肚腩在雨棚阴影下的投影范围，椅子滑开轨迹。"
      emotion_continuity_focus: "菜市一霸的横蛮气焰输出。"
    - vgu_id: VGU_06
      linked_beat_ids:
        - B06
      narrative_goal: "老板拍瓜上台，平头哥直视以经典姿势拷问“这瓜保熟吗？”。"
      target_duration_seconds: 10
      shot_density_hint: "5镜 (经典复刻)"
      shot_details:
        - shot_01: "恶霸犬老板在堆里粗鲁一拍，抱出一个大西瓜。"
        - shot_02: "西瓜落地近景。西瓜被砸放在案板中央，溅起少量碎屑。"
        - shot_03: "恶霸犬挑衅中景。拍了拍大西瓜：“行！这瓜怎么样？”"
        - shot_04: "经典姿态特写。平头哥双爪按撑在案板边缘，身子弓下前倾，歪起脑袋，冷酷斜盯老板。"
        - shot_05: "平头哥问瓜特写。慢条斯理吐字：“这瓜保熟吗？”（蝉鸣音瞬间被切断静态）。"
      bridge_required: true
      action_continuity_focus: "案板木纹刀痕，平头哥撑案前倾歪头的经典姿态。"
      emotion_continuity_focus: "戏剧最强爆点预热，万籁俱寂。"
    - vgu_id: VGU_07
      linked_beat_ids:
        - B07
      narrative_goal: "恶霸犬嚣张质问，平头哥二次重复保熟问题，摊主一愣。"
      target_duration_seconds: 10
      shot_density_hint: "5镜 (情绪卡壳)"
      shot_details:
        - shot_01: "恶霸犬怒极咆哮特写：“我开水果摊的，能卖给你生瓜蛋子？！”"
        - shot_02: "土拨鼠小弟中景。在右侧疯狂摇纸扇，瑟瑟缩头看。"
        - shot_03: "平头哥撑案姿势反打。维持歪头前探，眼神死水般无情绪变化。"
        - shot_04: "恶霸犬愣神大特写。叫嚣完脸突然一僵，瞳孔骤缩（一愣），卡壳呆滞一秒。"
        - shot_05: "平头哥低沉声特写：“我问你这瓜保熟吗？”"
      bridge_required: true
      action_continuity_focus: "恶霸犬嘴角獠牙上的涎水光泽，平头哥歪头撑桌的绝对静止。"
      emotion_continuity_focus: "心理压迫层层推向顶点。"
    - vgu_id: VGU_08
      linked_beat_ids:
        - B08
      narrative_goal: "老板拔刀威慑剁案板，双方对峙亮爪。"
      target_duration_seconds: 10
      shot_density_hint: "5镜"
      shot_details:
        - shot_01: "恶霸犬一巴掌掴在木案板上，顺势拔出身旁的水果大刀。"
        - shot_02: "西瓜刀剁板特写。精钢大刀猛地剁入西瓜前方的木板，刀身颤鸣发出錚声。"
        - shot_03: "恶霸犬发飙大吼：“你是故意找茬是不是？你要不要吧！”"
        - shot_04: "平头哥戏谑特写。斜睨颤动的尖刀，嘴角勾起冷笑：“熟的肯定要啊。”"
        - shot_05: "平头哥眼神反打：“要是不熟怎么办呀？”老板指刀咬牙：“不熟我自己吃了它！”"
      bridge_required: true
      action_continuity_focus: "西瓜刀扎入木案板的物理震颤频率、反光金属拉丝。"
      emotion_continuity_focus: "物理冲突爆发前夕。"
    - vgu_id: VGU_09
      linked_beat_ids:
        - B09
      narrative_goal: "平头哥推瓜，老板虚报重量，平头哥伸手掀秤。"
      target_duration_seconds: 10
      shot_density_hint: "5镜"
      shot_details:
        - shot_01: "平头哥用小爪将西瓜推进电子秤盘特写。"
        - shot_02: "电子秤红色屏数字闪烁，恶霸犬按住案面遮掩。"
        - shot_03: "恶霸犬得意斜睨报数：“十五斤，三十块。这称够数吧？”"
        - shot_04: "平头哥视线看下秤底。嘴角挂着一丝冷哼。"
        - shot_05: "中景。平头哥爪子闪电拽秤暴掀，电子秤翻转腾空，底壳碎片落地飞裂。"
      bridge_required: true
      action_continuity_focus: "电子秤从木台面飞出翻滚抛物线，落地时秤盘与底座脱落一致。"
      emotion_continuity_focus: "爽快掀秤的惊愕爆发。"
    - vgu_id: VGU_10
      linked_beat_ids:
        - B10
      narrative_goal: "指认作弊吸铁石，老板砍来，平头哥闪避一爪引爆西瓜风暴。"
      target_duration_seconds: 10
      shot_density_hint: "6镜 (流体核爆)"
      shot_details:
        - shot_01: "平头哥爪子指着秤底磁铁：“吸铁石贴在秤底下，当我傻逼啊？”"
        - shot_02: "恶霸犬狂怒挥刀剁砍而来。"
        - shot_03: "动作特写。平头哥身子一矮缩成块状，残影特效横移闪避大刀。"
        - shot_04: "出爪特写。平头哥小爪亮起弯月白芒风，划过半空中的西瓜。"
        - shot_05: "爆炸大广角。西瓜大核爆，高饱和亮红色西瓜汁卷起飓风风暴卷飞木屑。"
        - shot_06: "恶霸犬倒地。庞大狗躯被西瓜汁冲得如陀螺狂转，翻X_X卡通眼瘫晕，金星转动。"
      bridge_required: true
      action_continuity_focus: "爪击划过的破空白芒波纹、红色西瓜汁呈气浪扇形向外喷溅的流体物理模拟。"
      emotion_continuity_focus: "极致暴烈但完全去害化的喜剧视觉释放。"
    - vgu_id: VGU_11
      linked_beat_ids:
        - B11
      narrative_goal: "土拨鼠抱狗头狂嚎萨日朗，平头哥踩摩托冒黑烟离场。"
      target_duration_seconds: 10
      shot_density_hint: "5镜"
      shot_details:
        - shot_01: "案板一侧。湿透的土拨鼠惊恐地从水果筐架底下爬出。"
        - shot_02: "嚎哭咆哮大特写。土拨鼠抱着昏迷的恶霸犬狗头，大嘴拉伸60%狂嚎：“萨——日——朗——！”两侧喷泉泪花。"
        - shot_03: "反打平头哥。浑身清爽走到踏板摩托旁，冷静扣上粉色安全帽扣。"
        - shot_04: "排气管特写。踏板车点火踩踏，排气管突突喷出三个依次膨胀的卡通小黑烟圈。"
        - shot_05: "大远景。平头哥小粉车冷静驶出，背后土拨鼠嚎哭声淡出画幅。"
      bridge_required: false
      action_continuity_focus: "土拨鼠张大嘴拉伸比例（占头60%）、摩托车起步时轮胎空转卷沙及三个膨胀废烟圈。"
      emotion_continuity_focus: "终极荒诞歌剧反差谢幕。"

  script_file: "projects/huaqiang-watermelon-animal/details/script_v1.0.md"

  performance_handoff:
    acting_note: "平头哥（华强）的所有动作需极其冷静、缓慢、有力，说话一字一顿；恶霸犬（老板）横蛮暴躁，身体抖动频率高；土拨鼠（小弟）前松后紧，结尾大嚎叫必须面部极致拉伸。"
    micro_expression_note: "平头哥眼神保持死死凝视，眼皮半张；恶霸犬咧嘴亮出大牙，横肉耸动；土拨鼠嘴角一直带有鬼祟的坏笑，直到结尾双眼外凸大哭。"
    pause_note: "华强的台词之间必须留出 0.5-1 秒的物理停顿，让观众感受到空气凝聚的压迫感。"
    character_reaction_note: "掀秤和拔刀的瞬间，角色之间的物理反应必须迅捷利落，不拖泥带水。"
    expressive_animation_note: "在 B10 劈瓜瞬间启用爪风与爆炸粒子动效，B11 嚎哭时眼泪作卡通飞溅特效。"
    contrast_performance_note: "开场平头哥骑粉色摩托需神态自若，表现出极致的‘大佬玩萌物’的反差感。"
    injury_reaction_note: "恶霸犬被喷晕后采用翻白眼、头上飘旋转金星、口吐泡沫圈的完全无血卡通喜剧表现方式。"

  storyboard_hints:
    pacing_note: "前9个 Beat 节奏沉闷、低气压，通过大特写和侧打反打堆积张力；B10 劈瓜爆炸节奏瞬间拉长，B11 土拨鼠大张嘴长啸释放全部喜剧包袱。"
    visual_escalation_note: "从 B01 的平视远景全景，随着冲突升级，机位逐渐收窄，到 B06 的案板平视中轴线对决，B08 刀剁下的低角度，再到 B10 爆发时的 3D 广角爆裂镜头。"
    shot_priority_note: "Hero Moment H01（果汁爆破）与 H02（土拨鼠大喊萨日朗）必须在故事板中用红框重点标出并进行镜特写分配。"
    bridge_shot_need: "摩托停靠到下车摘安全帽、电子秤被掀翻到指认秤底需要过渡帧平滑拉伸。"
    blocking_note: "左侧平头哥及踏板车，中间案板西瓜，右侧老板，极右侧土拨鼠。守住这条 180 度人字轴线防越轴。"
    prop_state_note: "安全帽在 B01 戴在头上 ➡️ B02-B10 挂在车把镜上 ➡️ B11 重新扣在头上；电子秤在 B09 翻转，底部朝向镜头露出磁铁。"
    expressive_storyboard_note: "劈瓜时用速度线和白色风洞特效强化出爪物理动能。"
    contrast_reveal_note: "第一镜粉色踏板车进场与最后一镜粉色踏板车退场均要有平头哥的严肃冷脸正面反打。"
    injury_visibility_note: "摊主老板被爆破击晕后，身上的白色老头衫需完全被西瓜汁浸染成斑驳的亮红色，但面部不准有任何擦伤、凹陷或流血破相画幅。"

  risk_notes:
    - "西瓜汁高压爆破的流体颜色绝对不能调成深红或暗红，必须是高亮、饱和的亮西瓜红（Bright Watermelon Red），粒子需要做成圆润的水滴和气雾，规避血液质感审查。"
    - "西瓜刀剁在桌子上后，任何劈、砍的轨迹均只能划向西瓜或案板，绝对不能让刀刃与角色身体发生接触线索。"
    - "土拨鼠嚎哭萨日朗的张嘴比例要控制在 60% 头部大小，避免拉伸过大导致角色面部建模拉碎。"

  next_action: "进入 scene-performance-director 阶段，根据剧本中的微表情、动作链和卡通伤害表现，细化三位角色的 3D 骨骼表演动画参数表。"
