# 故事骨架细节卡 (story_development_v1.md)

本文件定义《华强买瓜》动物版改编的轻量故事骨架、剧情节拍（Story Beats）及各角色的叙事功能定位。已重构为 11 段、每段 10 秒，总长 110 秒的精细化视频生成结构。

---

## 一、 故事基本属性与创作上下文

```yaml
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
    downstream_rule: 下游围绕平头哥（蜜獾）华强与恶霸犬老板、土拨鼠小弟的对峙进行 100% 原版台词还原与每段 10 秒的视频切分设计。
  story_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户要求每段视频时长严格控制在 10 秒，总时长扩充至 110 秒（共 11 段），以适配视频生成平台的 10 秒输出限制，同时 100% 还原原片台词与张力。
  story_development_summary: 本故事骨架完全还原原版台词，划分为 11 个 10 秒节拍。高潮肢体冲突改为西瓜汁大爆炸，恶霸犬老板被震晕，小弟土拨鼠抱着其哭嚎“萨日朗”反差收尾。
  logline: 平头哥华强在水果摊拆穿了恶霸犬老板的吸铁石秤，在被西瓜刀威胁时一爪劈开西瓜引发果汁大爆炸，将老板直接冲晕，小弟土拨鼠抱着老板绝望呼喊“萨日朗”。
  story_premise: 用经典的平头哥“生死看淡”对决恶霸犬的“虚张声势”产生强戏剧张力，最终通过去害化大爆炸动作与土拨鼠经典哭嚎表情包收尾。
  duration_target:
    target_total_duration_seconds: 110
    rationale: 11 个 Story Beats，每个 Beat 为 10 秒，总时长 110 秒。高度适合 10 秒一段的视频生成。
```

---

## 二、 11 节拍故事设计 (Story Beats - 11x10s = 110s)

```yaml
  story_beats:
    - beat_id: B01
      title: 街角驻车
      function: setup
      beat_summary: 平头哥骑着踏板摩托车由远及近，缓缓停在街角的水果摊前，熄火，单脚撑地，冷着脸以极具压迫感的姿态坐着。恶霸犬老板跷二郎腿躺在椅上剔牙。
      emotion_goal: 建立平静中深藏压迫感的对峙开局。
      dramatic_question: 平头哥以什么气场亮相？
      payoff_seed: 彪悍大哥平头哥与矮小踏板摩托车的对比。
      duration_seconds: 10
    - beat_id: B02
      title: 摘盔问价
      function: setup
      beat_summary: 平头哥慢条斯理地摘下小粉盔挂在摩托车把上，走到水果摊前用小爪子拍了拍西瓜（咚咚声），冷静发问：“老板，这西瓜多少钱一斤啊？”
      emotion_goal: 正式切入交易，确立华强平缓冷酷的语速。
      dramatic_question: 华强的第一声提问语速如何？
      payoff_seed: 敲击西瓜的空洞音。
      duration_seconds: 10
    - beat_id: B03
      title: 抠牙答复
      function: provocation
      beat_summary: 恶霸犬老板斜眼瞥了平头哥一眼，不屑地吐掉嘴里的牙签答道：“两块钱一斤。”平头哥双臂环抱，眼角抽搐，口中开始嚼着草签。
      emotion_goal: 展现商贩对小个子平头哥的轻蔑。
      dramatic_question: 老板是否看不起平头哥？
      payoff_seed: 剔牙与吐牙签的市侩音效。
      duration_seconds: 10
    - beat_id: B04
      title: 黄金瓜皮
      function: provocation
      beat_summary: 平头哥眼角微挑，语气带刺地嘲讽：“卧槽，这西瓜皮是金子做的，还是西瓜子是金子做的？”恶霸犬老板脸色一沉。
      emotion_goal: 极具杀伤力的台词输出，挑衅氛围显现。
      dramatic_question: 这一句金子皮的吐槽效果如何？
      payoff_seed: 华强轻蔑的冷面笑意。
      duration_seconds: 10
    - beat_id: B05
      title: 大棚挑瓜
      function: provocation
      beat_summary: 老板猛然站起身挺起肚皮，大嗓门嚷嚷：“你瞧瞧现在哪有西瓜啊？这都是大棚的西瓜，你嫌贵我还嫌贵呢。”平头哥冷淡答道：“给我挑一个。”
      emotion_goal: 商贩粗野反击与华强冷峻应对。
      dramatic_question: 摊主是否展现了物理体量压迫？
      payoff_seed: 恶霸犬站立起身时木椅子的刺耳摩擦声。
      duration_seconds: 10
    - beat_id: B06
      title: 抱瓜问熟
      function: confrontation_warmup
      beat_summary: 老板在西瓜堆里粗鲁一拍，抱出一个大西瓜放在台面上：“行！这瓜怎么样？”平头哥盯着恶霸犬，眼神冰冷地提问：“这瓜保熟吗？”
      emotion_goal: 核心锚点出现，空气温度骤降。
      dramatic_question: “这瓜保熟吗”发声时的压抑感。
      payoff_seed: 拍击西瓜皮的结实闷响与背景蝉鸣静音。
      duration_seconds: 10
    - beat_id: B07
      title: 找茬对峙
      function: confrontation_warmup
      beat_summary: 老板裂开獠牙怒怼：“我开水果摊的，能卖给你生瓜蛋子？”平头哥毫无动摇，语调甚至更加平缓冷漠：“我问你这瓜保熟吗？”
      emotion_goal: 双方寸步不让，陷入僵持对立。
      dramatic_question: 平头哥重复提问时的心理施压。
      payoff_seed: 恶霸犬愤怒喘息粗气的声音。
      duration_seconds: 10
    - beat_id: B08
      title: 拍案拔刀
      function: threat
      beat_summary: 老板猛烈拍案拔刀剁在木板上：“你是故意找茬是不是？你要不要吧！”平头哥微翘嘴角：“这瓜要是熟的我肯定要啊。那它要是不熟怎么办呀？”老板恶狠狠答：“要是不熟自己吃了它！”
      emotion_goal: 武器亮出，冲突升至临界物理威胁。
      dramatic_question: 大西瓜刀的视觉威慑力。
      payoff_seed: 拍桌巨响与大刀震颤的颤音。
      duration_seconds: 10
    - beat_id: B09
      title: 上秤称量
      function: conflict_escalation
      beat_summary: 平头哥冷笑着推瓜上秤。电子秤上数字闪烁，老板斜眼报数：“十五斤，三十块。这称够数吧？”平头哥眼神一寒，伸手直接将电子秤扯翻掀底。
      emotion_goal: 精细计谋施展与突然爆破的快速转折。
      dramatic_question: 掀秤动作的突然性。
      payoff_seed: 电子秤被掀起落地塑料碎裂的刺耳撞击声。
      duration_seconds: 10
    - beat_id: B10
      title: 拆磁爆炸
      function: climax
      beat_summary: 老板吼叫找茬。平头哥指认秤底大磁铁：“吸铁石贴在秤底下，当我傻逼啊？”老板急眼砍来。平头哥敏捷闪身一爪横切，西瓜像果汁炸弹爆破喷出巨量红色风暴，老板被冲晕翻白眼倒地。
      emotion_goal: 动作戏爆发，去害化喜剧核爆瞬间。
      dramatic_question: 如何消解劈人血腥感？
      payoff_seed: 亮亮爪芒光效与红色西瓜汁巨浪喷溅。
      duration_seconds: 10
    - beat_id: B11
      title: 萨日朗扬长
      function: ending_payoff
      beat_summary: 浑身湿透的土拨鼠小弟爬出来抱起倒地的恶霸犬胖狗头，张嘴嚎嚎大哭：“萨——日——朗——！！”平头哥戴上粉头盔踩燃摩托发动机，在哭嚎声中一轰油门离场。
      emotion_goal: 荒诞悲情男高音式哀嚎与冷酷帅气退场的极强笑果。
      dramatic_question: 视频最后一镜的收束点。
      payoff_seed: 土拨鼠经典破音大嗓门萨日朗音效与排气黑烟。
      duration_seconds: 10
```

---

## 三、 角色、场景与核心道具功能 (Functions)

```yaml
  character_functions:
    - character_name: 平头哥 (蜜獾) - 华强
      story_function: 挑衅者与正义制裁者。以极致的平静慢语速对抗市侩，一爪定江山。
      conflict_role: 主动挑起质询，实施揭底与爆破劈瓜动作
      emotional_task: 维持冷面笑匠和战力天花板的神秘气场，说话时体现不紧不慢的冷峻语速
    - character_name: 恶霸犬 (American Bully) - 摊主
      story_function: 编造猫腻的商贩与受难反派。虚张声势，利令智昏，最终成为爆炸果汁冲刷下的狼狈晕厥体。
      conflict_role: 实施欺诈、挥刀反扑，提供受重力反馈的角色
      emotional_task: 从不屑、狂妄到气急败坏，最后呈现彻底失去意识的眩晕
    - character_name: 土拨鼠 - 小弟
      story_function: 捧哏与表情包爆点担当。提供全片最大的喜剧哭嚎动作与收尾台词。
      conflict_role: 前期为虎作伥，高潮后哭丧式嚎叫呼喊
      emotional_task: 从狗仗人势的狐假虎威转为抱着老板头哭嚎的浮夸深情
  core_scene_functions:
    - scene_name: 街角水果摊
      story_function: 冲突发生的狭窄局限空间。木案板、大雨棚和散落 of 西瓜架提供了微调镜头的物理隔阂。
      required_beats:
        - B01
        - B02
        - B03
        - B04
        - B05
        - B06
        - B07
        - B08
        - B09
        - B10
        - B11
  key_prop_functions:
    - prop_name: 作弊电子秤（带磁铁）
      story_function: 提供物理博弈的道具线索，展现商贩欺诈的破绽。
      required_beats:
        - B09
    - prop_name: 爆破大西瓜
      story_function: 替代真人身体，承受爆破能量，作为去害化高潮的物理道具容器。
      required_beats:
        - B10
```

---

## 四、 艺术设计定位与风险说明

```yaml
  emotional_arc: 严肃冷峻 ➡️ 针锋相对 ➡️ 紧张对峙 ➡️ 水果爆弹爆发 ➡️ 荒诞歌剧式哀嚎 ➡️ 幽默离场
  hero_moment_candidates:
    - hero_id: H01
      title: 红色果汁爆炸气浪吞没恶霸犬老板，水花在镜头前呈 3D 喷溅效果
      related_beat: B10
      reason: 全片视觉特效核心，展现精美的卡通液体模拟物理表现。
    - hero_id: H02
      title: 土拨鼠抱起恶霸犬老板的肥胖大头，大张嘴咆哮“萨日朗——！”
      related_beat: B11
      reason: 网络迷因（Meme）的高浓度呈现，全片最强的病毒式传播点。
  ending_payoff: 恶霸犬满头西瓜籽、双眼翻白口吐白沫泡泡躺倒，小弟土拨鼠抱着他声嘶力竭地喊杀人啦，而背景平头哥骑摩托突突突驶离，黑色排气烟构成最后谢幕画幅。
  story_risk_notes:
    - 西瓜爆炸的视觉必须做得很“卡通水弹”化，避免西瓜的深红色果汁在镜头中因为光影原因看起来像血液，需调成鲜艳、饱满的果汁亮红色。
  next_action: 进入 scene-asset-checker，确定角色和道具的资产复用策略。
```
