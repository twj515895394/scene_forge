---
project_name: huaqiang-watermelon-40s
project_status: video_prompts_ready
next_stage: scene-publish-review
lifecycle_flag: active
blocker_note:
score: 92
production_level: focus
reference_type: hybrid_reference
adaptation_level: partial_rewrite
performance_style: exaggerated_comedy
segment_duration_seconds: 10
target_total_duration_seconds: 40
story_beat_count: 4
shot_count: 12
segment_count: 4
created_at: 2026-06-02
updated_at: 2026-06-02
---

# PROJECT BOARD

## 0. 项目总览

- 项目名称：华强买瓜 3D 动画电影风格 40 秒版本
- 选题来源：电视剧《征服>经典片段“华强买瓜”
- 当前状态：提示词已构建（`video_prompts_ready`）
- 下一阶段：发布与评审（`scene-publish-review`）
- 生命周期：进行中（`active`）
- 制作分层：重点制作池（`focus`）
- 参考对象类型：混合参考（`hybrid_reference`）
- 改编档位：部分改写（`partial_rewrite`）
- 演绎风格：夸张搞笑化（`exaggerated_comedy`）
- 单段时长：10 秒（`10`）
- 目标总时长：40 秒（`40`）

## 1. 选题评分区

```yaml
patch_type: scene-topic-gate
version: 1
status: completed
updated_at: 2026-06-02
summary: 该选题总分 92，判断为进入制作（`go`），建议走夸张搞笑化（`exaggerated_comedy`）路线，并进入重点制作池（`focus`）。
data:
  topic_name: 华强买瓜 3D 动画电影风格 40 秒版本
  source_material:
    source_type: specific_adaptation
    source_name: 电视剧《征服》华强买瓜片段
    source_locator: 华强买瓜
    notes: 经典互联网热梗片段，保留冲突张力与全部经典台词，转为高品质3D动画电影质感的夸张搞笑表达，并升级为40秒的完整叙事。
  total_score: 92
  performance_style_suggestion: exaggerated_comedy
  production_level: focus
  decision: go
  dimension_scores:
    热点价值: 24
    动画化适配度: 19
    改编空间: 14
    经典认知锚点: 15
    风险可控性: 7
    制作成本可控性: 8
    platform_traffic_potential: 5
  rationale:
    - 经典热梗国民认知度极高，具有非常强烈的传播效果。
    - 对话冲突鲜明、台词脍炙人口，极其适合做多段动画演绎与表情表现。
    - 升级为40秒能完美容纳所有名场面，解决节奏过快问题。
  risk_notes:
    - “捅刀”动作必须做卡通去害化处理，防止产生暴力血腥画面。
  reuse_hints:
    - 华强、摊主模型和老街水果摊可以作为后续系列作品的通用资产。
  evaluator_rule_version: topic-gate-v1
```

## 2. 参考对象判断区

```yaml
patch_type: scene-reference-decider
version: 1
status: completed
updated_at: 2026-06-02
summary: 本次以电视剧《征服》原版桥段为主参考，保留经典台词、人物关系和水果摊认知锚点，同时把动作表现和视听风格改写为高品质3D动画电影化的夸张喜剧表达。
data:
  reference_type: hybrid_reference
  decision_summary: 以原片段的角色关系、对峙流程和经典台词为主参考，动作、运镜和物理反馈全部重做，不复刻原片写实拍法。
  reference_boundary:
    primary_reference: 电视剧《征服》华强买瓜片段
    secondary_reference: 高品质3D动画电影化夸张喜剧表达
    boundary_rule: 保留名场面认知锚点和冲突流程，但镜头调度、角色外形比例和动作物理全部按动画表达重构。
    allowed_inheritance:
      - 角色身份
      - 角色关系
      - 标志道具
      - 情绪核心
      - 剧情骨架
      - 场景气质
    forbidden_inheritance:
      - 镜头动势
  must_keep:
    - category: 标志道具
      note: 水果摊、西瓜、电子秤、摩托车和水果刀都要保留为认知锚点。
    - category: 剧情骨架
      note: 骑车到摊位、问瓜保熟吗、秤上冲突、揭穿猫腻、去害化高潮、平静离场路线必须保留。
    - category: 情绪核心
      note: 华强平静问话与摊主不耐烦之间的张力必须保持。
  must_avoid:
    - category: 镜头动势
      note: 避免直接模仿原片写实切镜和写实持刀调度。
    - category: 标志道具
      note: 避免写实伤害性劈瓜动作，改为夸张去害化的果汁爆炸与搞笑物理反馈。
  risk_notes:
    - 角色外形比例需具有动画感，避免滑向真人脸复刻导致侵权或版权问题。
  next_action: 进入 scene-asset-checker，判断角色、场景和核心道具的复用与新建策略。
```

## 3. 资产复用判断区

```yaml
patch_type: scene-asset-checker
version: 1
status: completed
updated_at: 2026-06-02
summary: 角色与场景资产判断已完成，华强、摊主、摊主小弟和街角水果摊均进入完整新建（`new_full`），核心道具电子秤进入单独新建（`new_core_prop`）。
data:
  character_assets:
    - role_name: 华强
      reuse_status: new_full
      asset_ref:
      reuse_reason: 当前资产库内无可直接承接该桥段的角色基础模型，需要完整新建。
      required_adjustments: []
    - role_name: 摊主
      reuse_status: new_full
      asset_ref:
      reuse_reason: 当前资产库内无可直接承接该桥段的角色基础模型，需要完整新建。
      required_adjustments: []
    - role_name: 摊主小弟
      reuse_status: new_full
      asset_ref:
      reuse_reason: 作为关键协力喜剧配角，无现成资产，需要完整新建以建立系列胖瘦反差资产。
      required_adjustments: []
  scene_assets:
    - scene_name: 街角水果摊
      reuse_status: new_full
      asset_ref:
      reuse_reason: 需要独立建立可服务后续系列化短视频的通用水果摊场景。
      required_adjustments: []
  prop_assets:
    - prop_name: 电子秤
      prop_status: new_core_prop
      asset_ref:
      handling_note: 电子秤承担关键物理与数值反馈，单独建核心道具卡。
    - prop_name: 摩托车
      prop_status: new_core_prop
      asset_ref:
      handling_note: 华强核心入画与出画载具，单独建核心载具道具卡。
    - prop_name: 水果刀
      prop_status: new_core_prop
      asset_ref:
      handling_note: 动作与高潮冲突核心载体，进行去害化圆角设计，单独建动作道具卡。
    - prop_name: 西瓜
      prop_status: new_core_prop
      asset_ref:
      handling_note: 交互与去害化爆裂高潮担当，具有Q弹形变与水球爆开反馈，单独建核心道具卡。
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - 华强
      - 摊主
      - 摊主小弟
      - 街角水果摊
  risk_notes:
    - 角色表情需支持夸张喜剧，但不能损坏身份辨识。
  next_action: 进入 scene-design-builder，产出锁定卡和可直接生成设定图的 prompt 包。
```

## 4. 角色与场景设定区

```yaml
patch_type: scene-design-builder
version: 1
status: completed
updated_at: 2026-06-02
summary: 角色与场景设定已完成；锁定卡与设计图 prompt 已成功落盘，可直接生成 3D 动画电影级的角色、场景和核心道具。
data:
  design_mode: focus
  visual_language:
    shape_language_core: 角色以方形、圆形与三角概括，道具与建筑以稳重方形为基底并带有动画化的微弧圆角，消除生硬折角。
    silhouette_anchors: 华强的挺拔方肩和机车夹克、摊主的圆润肚腩和白色吊带衫、小弟的极瘦长驼背溜肩，电子秤的厚重双层结构。
    proportion_strategy: 采用 70% 真实比例 + 30% 动画夸张；人物头身比分别控制在 6.2 (华强)、5.8 (摊主) 和 6.8 (小弟)。
    material_strategy: 动画长片级比例搭配电影级真实物理材质纹理，如松木干燥纤维、拉丝金属 and 坚挺皮革，避免玩具塑料感。
    color_script: 温暖烟火气的街道灰色和原木松黄为主（占90%），点睛高饱和西瓜瓤红与磁铁亮红（占10%）作为强调色。
    environment_stylization: 街角水泥墙面、电线杆与水果箱堆叠均进行节奏感微调，略有起伏倾斜，渲染夏日空气通透感。
    prop_exaggeration_rule: 电子秤体表面做生锈凹陷磨损，秤盘加宽凹陷以强化受瓜冲击时的剧烈物理弹力抖动。
  character_designs:
    - name: 华强
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-40s/details/character_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/character_prompts_v1.0.md
    - name: 摊主
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-40s/details/character_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/character_prompts_v1.0.md
    - name: 摊主小弟
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-40s/details/character_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/character_prompts_v1.0.md
  scene_designs:
    - name: 街角水果摊
      reference_strength: high_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon-40s/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/scene_prompts_v1.0.md
  prop_designs:
    - name: 电子秤
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-40s/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/scene_prompts_v1.0.md
    - name: 摩托车
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-40s/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/scene_prompts_v1.0.md
    - name: 水果刀
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-40s/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/scene_prompts_v1.0.md
    - name: 西瓜
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon-40s/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon-40s/outputs/design_prompts/scene_prompts_v1.0.md
  visual_consistency:
    character_anchor_note: 华强冷静凝视，寸头边缘利落；主摊主满脸胡茬挺着大肚腩；小弟尖嘴猴腮驼背身穿蓝汗衫，三人高矮胖瘦对比强烈，反差感强。
    scene_anchor_note: 帆布雨棚、背景灰色老旧水泥墙和松木水果堆在对话与对峙镜头中保持固定的机位投射关系。
    material_anchor_note: 夹克皮革折痕和棉质背心磨损纹理在多视角与运动切片中维持电影级渲染统一，避免材质跳变。
  script_adaptation_notes: 剧本改编需设计经典台词间的微妙停顿与眉眼动作设计，SEG04 劈瓜高潮需充分融入西瓜汁爆发、摊主狼狈淋湿以及小弟摔落尖叫“萨日朗”的喜剧反馈。
  next_action: 进入 scene-script-adapter，结合视觉基线和 40 秒架构改编新剧本。
```

## 5. 剧本改编区

```yaml
patch_type: scene-script-adapter
version: 2
status: completed
updated_at: 2026-06-02
summary: 本次采用部分改写型（`partial_rewrite`）并确认为夸张搞笑化（`exaggerated_comedy`）路线，已产出 4 个 Story Beat，完整剧本已落盘。
data:
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  target_total_duration_seconds: 40
  script_summary: 完整保留买瓜全部经典对话，重构物理避震、敲瓜抖动、秤盘翻面露磁铁以及去害化西瓜水球大爆炸等动画电影级动作机制，新加入摊主小弟喜剧受惊与“萨日朗”逃跑高潮。
  preserved_elements:
    - category: 台词表达
      note: 保留“老板这瓜多少钱一斤”、“金子做的”、“这瓜保熟吗”、“故意找茬”、“不熟我自己吃了它”等全部买瓜名句。
    - category: 剧情骨架
      note: 到摊问价、问瓜保熟、对赌上秤、揭穿磁铁、劈瓜高潮、逃跑离场的主线剧情骨架完全保留。
  rewritten_elements:
    - category: 动作设计
      note: 新增摩托刹车Q弹下压、排气管烟雾圈、敲西瓜藤蔓抖动及灰尘圈、西瓜受重力砸秤盘颤抖以及西瓜受击像水球爆汁冲刷老板等全套夸张动作。
    - category: 角色反应
      note: 新增摊主小弟狗仗人势的狐假虎威鬼祟笑、受惊吓四脚朝天翻凳倒地、以及双手抱头惊恐逃跑大喊“萨日朗！”。
    - category: 喜剧机制
      note: 老板败露后的傲娇与被红色西瓜汁冲刷成落汤鸡、满脸粘籽发直冒金星的滑稽荒诞受击效果。
  story_beats:
    - beat_id: B01
      title: 登场与调侃价格
      function: setup
      beat_summary: 华强骑摩托Q弹刹停，摘盔入场。问价两块一斤，华强开启金子二创调侃，摊主横肉反呛。
      emotion_goal: 建立平静冷酷的压迫感与喜剧对峙张力。
      dramatic_question: 华强与摊主的首次交锋谁能在气势上压倒对方？
      visual_focus: 摩托刹车排气管烟雾圈特写，双方一静一躁、一高瘦一肥硕的视觉并置。
      action_focus: 华强摩托Q弹刹停与摘盔，摊主吐掉剔牙签猛立挺腹。
      performance_hint: 华强面沉似水毫无表情，动作慢条斯理但带着不容置疑；摊主眼神市侩横蛮。
      rhythm_hint: 华强调侃台词字字清晰慢节奏，摊主粗暴抢答加紧凑。
      sound_hint: 摩托刹车避震声，排气管“啵”的喷气声，吐牙签“啐”声。
      target_duration_seconds: 10
      payoff_seed: 华强的绝对平静为后续劈瓜做前摇，摊主的蛮横为爆汁受洗买下伏笔。
    - beat_id: B02
      title: 挑瓜与保熟交锋
      function: escalation
      beat_summary: 华强上前挑西瓜轻敲，发问“这瓜保熟吗？”，引发摊主强烈情绪升级与第二次更锋利的对峙交涉。
      emotion_goal: 让观众感到经典名场面卡点的舒适感与紧迫感。
      dramatic_question: 摊主在面对“这瓜保熟吗”的质疑时会如何虚张声势？
      visual_focus: 华强轻敲西瓜，西瓜顶部褐色弯藤剧烈弹簧抖动及灰尘圈的微形变特写。
      action_focus: 华强皮手套轻敲瓜，摊主大力怒拍双手横肉暴起。
      performance_hint: 华强上眼睑拉平，眼神死死锁定摊主；小弟在旁边狐假虎威狗仗人势谄媚笑。
      rhythm_hint: 华强发问语气平静无波，与摊主恼羞成怒暴起拍手形成强烈动静反差。
      sound_hint: 敲西瓜清脆空腔回音“咚咚”声，摊主大胖手“啪”肉掌撞击声。
      target_duration_seconds: 10
      payoff_seed: 摊主“你要不要吧”的极度愤怒将博弈推向深水区。
    - beat_id: B03
      title: 对赌上秤与揭穿猫腻
      function: reveal
      beat_summary: 摊主将瓜狠狠砸在秤盘上，读数虚假定格20斤。华强当场翻转秤盘，秤盘背面正中心吸附的亮红吸铁石大白于天下。
      emotion_goal: 揭穿猫腻时的痛快与悬疑感瞬间爆发。
      dramatic_question: 秤底隐藏的欺诈把戏被揭穿后双方博弈如何逆转？
      visual_focus: 秤盘受力Q弹剧烈弹跳、数显屏延迟闪烁，以及秤盘被掀翻后背面凹陷中心吸附的亮红圆形磁铁微距特写。
      action_focus: 摊主砸瓜落秤，华强单指按秤盘，利落地一把反转秤盘。
      performance_hint: 华强眼带戏谑意，动作利索；小弟在旁边瞪大豆豆眼面色呆滞，摊主表情僵住。
      rhythm_hint: 翻开秤盘前保留半秒极其戏剧性的死寂停顿，随后掀秤盘动作快速凌厉。
      sound_hint: 西瓜落秤金属重响“当——”及颤声，反转秤盘金属扭曲声“吱呀——”，红磁铁撞击亮反差音。
      target_duration_seconds: 10
      payoff_seed: 猫腻败露导致摊主彻底失控想抢刀，直接引出劈瓜爆发。
    - beat_id: B04
      title: 去害化劈瓜与荒诞谢幕
      function: payoff
      beat_summary: 摊主急躁抢刀，华强后发先至出刀劈西瓜，西瓜水球爆开巨量西瓜汁水枪冲洗摊主；小弟摔翻爬起惊恐高喊“萨日朗！”逃跑；华强淡定跨车离场。
      emotion_goal: 极度滑稽、痛快、反差爆笑的荒诞谢幕快感。
      dramatic_question: 去害化的冲突如何完成情绪的完美释放与喜剧谢幕？
      visual_focus: 刀尖一亮，西瓜流体果汁水球大爆炸，老板满面红汁冒金星，小弟滑稽摔倒屁滚尿流跑走。
      action_focus: 华强出刀劈西瓜，老板连退两步，小弟后翻倒地狂奔，华强跨车离场。
      performance_hint: 华强始终冷艳旁观、帅气潇洒；老板从暴怒变为落汤鸡委屈脸；小弟表情张大到极限拉长。
      rhythm_hint: 劈瓜瞬间镜头慢动作拉伸，随后爆水瞬间动作爆发，最后华强发动摩托车回复沉静慢节奏。
      sound_hint: 刀刃星芒闪光“锃”声，西瓜水球大爆炸“嘭——啪！”，小弟凳子侧翻倒地声和惊恐破音大喊“萨日朗！”。
      target_duration_seconds: 10
      payoff_seed: 华强在“萨日朗”背景声中绝尘而去，完成完美谢幕。
  script_file: projects/huaqiang-watermelon-40s/details/script_v2.0.md
  performance_handoff:
    acting_note: 强化华强绝对沉稳与老板粗野易怒、小弟胆小谄媚的三人性格动态，动作停顿卡点要明显。
    micro_expression_note: 华强的眼神微压、摊主肉横横肉暴起，小弟大张的长条嘴是核心微表情焦点。
    pause_note: 敲西瓜保熟发问前、翻秤盘猫腻暴露前、劈瓜瞬间前均保留半秒电影级静默期。
    character_reaction_note: 摊主从小动作剔牙到拍手再到僵住最后变成落汤鸡，情绪多层递进。
  storyboard_hints:
    pacing_note: 每个 10 秒 Segment 包含 3 个左右镜头，剧本已做好 0-10s、10-20s、20-30s、30-40s 严格的分段隔断。
    visual_escalation_note: 视觉高潮由西瓜藤微抖升级为电子秤受力抖，最后爆发西瓜水球大爆炸。
    shot_priority_note: 优先保证西瓜藤抖动、反转秤盘露红磁铁以及西瓜水球大爆炸的三组特写镜头。
  risk_notes:
    - 刀具绝不指向人体，刀尖有圆头钝化设计，西瓜爆汁效果偏卡通。
  next_action: 进入 scene-performance-director，为三位角色设计精准表情微动作与肢体停顿表演。
```

## 6. 表演导演区

```yaml
patch_type: scene-performance-director
version: 1
status: completed
updated_at: 2026-06-02
summary: 表演导演阶段已完成。为华强、摊主老板和摊主小弟设计了3D动画长片级的表演档案，并为 4 个 Story Beat 设计了眼神、微表情、肢体动作、喜剧停顿和物理反馈，将完整表演表落盘至 `details/performance_sheet_v1.0.md`。
data:
  performance_version: v1.0
  performance_style: exaggerated_comedy
  performance_sheet_path: details/performance_sheet_v1.0.md
  performance_summary: 本次表演通过华强的沉稳冷静与摊主暴烈蛮横、小弟谄媚懦弱的胖瘦喜剧反差，结合关键节拍停顿和去害化西瓜水球大爆炸，实现了高品质 3D 动画电影级的戏剧张力与荒诞幽默。
  character_performance_profiles:
    - character_id: hua_qiang
      character_name: 华强
      acting_energy: restrained_but_precise
      eye_focus_pattern: 专注死死锁定，上眼睑拉平，眼神平静但带极强压迫审视。
      facial_expression_range: 包含绝对冷静(Neutral)、微带挑衅的冷笑(Smirk)和死亡压迫凝视(Intense Stare)。
      body_language: 站姿挺拔如松，双脚开立，动作慢条斯理但发力瞬间极速流畅。
      body_weight: 重心极稳，分布于双足，磐石感强。
      hand_action_pattern: 极度克制，敲击西瓜和翻秤盘动作精准敏捷，其余时间手指自然松弛。
      signature_gesture: 摘下头盔抬起下颌冷静直视；食指尖轻抵秤盘边缘并微微偏头。
      emotional_leak: 左侧眉毛极轻微挑动，黑皮手套手指在案板上沉闷单次敲击。
      comedy_reaction_rule: 以 1.0s 的冷酷死寂面对摊主的暴怒，让空气冻结，成为冷场掌控者。
    - character_id: boss_vendor
      character_name: 摊主老板
      acting_energy: explosive_but_unstable
      eye_focus_pattern: 斜视、眼珠频繁闪烁，对峙时瞪大眼珠掩盖心虚。
      facial_expression_range: 包含剔牙傲慢(Impatient)、横肉恐吓(Bluffing)、猫腻破产呆滞(Shocked)和满脸果汁发懵(Drenched Comical)。
      body_language: 挺着圆润大肚腩，双腿大字架开，怒吼时伴随全身肥肉卡通抖动。
      body_weight: 重心高且飘，肥胖肩膀耸动，抢刀时蓝色人字拖打滑产生滑稽趔趄。
      hand_action_pattern: 大开大合，两手粗鲁，抓瓜用抱，拍打秤盘时带有明显颤颤感。
      signature_gesture: 啐出牙签双手掐腰挺出皮球般的大肚子；胸前大声拍打肥厚肉掌。
      emotional_leak: 大蒜鼻翼剧烈翕张，频繁吞咽口水，谎言被点穿时短脖子瞬间红透。
      comedy_reaction_rule: 表情在 1 帧内硬切卡壳（如秤盘反转后石化），被西瓜汁冲成甜美委屈的落汤鸡。
    - character_id: vendors_henchman
      character_name: 摊主小弟
      acting_energy: jittery_and_comedic
      eye_focus_pattern: 高频眼珠飞转，两颗豆豆眼转动极快，尖嘴猴腮的贼相。
      facial_expression_range: 包含谄媚狗仗人势笑(Smug)、眼珠脱眶下巴脱臼(Terrified)和抱头呐喊夺路狂奔(Panic Escape)。
      body_language: 溜肩驼背，常揣手缩头贴在老板身侧，跑动时像小鸭摆动或抱头。
      body_weight: 重心极高、身轻如豆角，受惊时像弹簧瞬间蹦起。
      hand_action_pattern: 碎动作极多，倒腾瓜子，手搓衣角，惊吓时手指呈鹰爪状狂乱乱弹。
      signature_gesture: 双手拢在背心底端缩头附和；惊吓翻车时四脚朝天在空中蹬自行车。
      emotional_leak: 被华强逼视时双膝发软、微幅颤抖打战，滑稽向老板身后缩身。
      comedy_reaction_rule: 贡献全片最大幅度的卡通仰翻和破音喊“萨日朗！”逃跑，放大物理爆破滑稽感。
  beat_performance_notes:
    - beat_id: B01
      emotional_goal: 建立华强深沉冷静压迫感与摊主蛮横剔牙傲慢的极致视觉反差。
      main_expression: 华强冷静深邃；摊主斜眼剔牙，被调侃后猛啐牙签。
      micro_expression: 华强下颌微抬10度审视；小弟小嘴高频嗑瓜子、八字胡抖动。
      eye_action: 华强深锁摊主；摊主斜眼瞅人后瞪眼起立；小弟豆豆眼高频在两人间倒腾。
      body_action: 华强下车踱步如松；摊主大肚子向前一顶双手掐腰；小弟溜肩缩头蹲在矮凳上。
      hand_action: 华强皮手套利落摘头盔；摊主肥手抓剔牙签；小弟如松鼠般快速磕瓜子。
      pause_or_hold: 华强调侃完“金子做的”台词后，全场定格死寂 0.5 秒。
      secondary_action: 摊主剔牙动作静止，小弟瓜子停在嘴唇边。
      reaction_timing: 死寂停顿后，摊主猛啐牙签横肉一抽，起立挺肚产生肥肉回弹颤动。
      transition_to_next_beat: 摊主发问挑衅，华强踱步走近西瓜堆，博弈由口头试探转向物理动作。
    - beat_id: B02
      emotional_goal: 挑瓜问瓜保熟，引出对峙升级，展现华强冷静威严与摊主暴怒恐吓。
      main_expression: 华强面无表情，眉骨深压；摊主横肉暴起，大蒜鼻孔扩张。
      micro_expression: 华强眼睑拉平，锁死对方；小弟半眯豆豆眼咧嘴小人得志笑。
      eye_action: 华强双眼锁死摊主；摊主暴怒怒瞪华强；小弟两眼贼溜溜紧盯敲瓜皮手套。
      body_action: 华强身体前倾15度，肩膀挺括；摊主大肚挺起耸肩；小弟像黄鼠狼附在老板左侧。
      hand_action: 华强食指轻敲西瓜；摊主肥手掌在大胸前啪的一合，颤抖指向华强。
      pause_or_hold: 无。
      secondary_action: 华强轻拍西瓜，西瓜藤蔓产生弹簧般Q弹剧烈抖动，震起一圈滑稽白灰尘。
      reaction_timing: 摊主在华强二次平静发问后横肉僵化0.3s，随即猛拍巴掌并怒吼“你要不要吧”。
      transition_to_next_beat: 气氛在摊主狂躁拍巴掌后瞬间进入死静，开始砸瓜对赌上秤。
    - beat_id: B03
      emotional_goal: 对赌上秤，翻盘揭穿吸铁石猫腻，展现揭露真相时的戏剧性石化。
      main_expression: 华强从容戏谑；摊主呆若木鸡，眼圈出汗；小弟下巴脱臼痴呆。
      micro_expression: 华强嘴角掠过一丝讽刺冷笑；摊主大蒜鼻紧闭，横肉冻结；小弟下巴张大。
      eye_action: 华强戏谑斜瞅秤盘；摊主眼球停止转动死盯秤底；小弟两豆豆眼外凸死盯亮红磁铁。
      body_action: 华强仅有左臂做行云流水的反转秤盘动作；摊主僵立如石雕；小弟双膝颤抖开始倒退。
      hand_action: 华强单指沉稳抵秤盘，左手利落一把反转秤盘；摊主指向绿屏的粗肥食指僵死在半空。
      pause_or_hold: 掀翻秤盘露出亮红圆形磁铁的瞬间，画面死寂定格 1.0 秒。
      secondary_action: 秤盘反面银色反射中，鲜红色圆形磁铁极为刺眼；老板脸上一滴大汗滑落。
      reaction_timing: 死静 1.0 秒后，摊主把戏彻底败露被羞辱，气急败坏进入情绪爆炸狂抓刀。
      transition_to_next_beat: 摊主彻底失控抓刀，华强抢先一步拔刀劈瓜，进入爆裂大结局。
    - beat_id: B04
      emotional_goal: 爆汁水球的滑稽洗礼与小弟“萨日朗”逃跑的滑稽收尾，释放极度搞笑爽感。
      main_expression: 华强面色如水，冷静收刀；摊主满脸红汁发直冒金星；小弟嘴巴张拉到极限大喊。
      micro_expression: 华强眼神冷峻跨摩托；摊主落汤鸡状双眼委屈闭合；小弟眼泪大鼻涕滑稽喷洒。
      eye_action: 华强直视前方绝尘而去；摊主发懵流泪；小弟双眼闭成卡通大“X”型惶恐万状。
      body_action: 华强侧身潇洒出刀，跨摩托绝尘；摊主被水冲击退两步；小弟仰天大跌跤，翻凳倒地。
      hand_action: 华强反手利落劈下，收刀一插；摊主肥手抓瞎划圈；小弟双手抱头连滚带爬逃跑。
      pause_or_hold: 西瓜水球大爆炸后，摊主被冲成甜美落汤鸡、满头粘子冒金星的瞬间定格 0.5s。
      secondary_action: 西瓜爆裂呈现卡通大爆炸，果汁如高压水枪喷射；排气管帅气喷出三个大小递减烟圈。
      reaction_timing: 爆炸发生瞬间，小弟瞬间向后仰跌矮凳翻车，爬起大打滑，破音喊“萨日朗！”跑远。
      transition_to_next_beat: 华强摩托绝尘而去，镜头拉高拉远，在喜感方言呼喊声中完成滑稽谢幕。
  continuity_rules:
    character_performance_consistency: 华强冷静克制绝不失控；摊主暴躁后硬切僵硬委屈；小弟驼背溜肩极具卡通形变。
    emotional_progression: 从平静挑衅到沸点对峙，再到被揭穿后的石化，最后以爆汁受洗和破音逃亡喜剧收场。
    gesture_continuity: 华强的黑色皮手套、摊主泛黄背心大肚腩和小弟踩后跟黑布鞋作为贯穿四幕的视觉连续性工具。
  storyboard_handoff:
    camera_focus_suggestions:
      - SEG01：华强摩托Q弹避震与喷白烟圈特写，华强脱头盔仰拍特写，摊主挺肚特写。
      - SEG02：手敲西瓜特写，展现西瓜藤弹簧般可爱颤动与白色灰尘微粒圈。
      - SEG03：西瓜砸秤盘Q弹避震跳动特写；秤盘翻开背面凹陷中心的亮红塑料吸铁石微距大特写。
      - SEG04：华强拔刀闪过卡通星芒特写；西瓜汁高压水枪拍脸与老板落汤鸡委屈近景特写；小弟翻车仰天蹬自行车特写；摩托排气管喷出三个大小递减圆形白烟圈特写。
    closeup_priority: 华强压低眉骨眼神、吸铁石大红特写、老板落汤鸡脸粘西瓜籽特写、小弟尖大嘴破音特写。
    reaction_shot_priority: 秤盘反转露出红磁铁时的三人同框石化反应大中景；老板抢刀时华强瞬间出刀的慢动作。
    timing_notes: 严禁剪碎三个黄金停顿（SEG01的0.5s，SEG03 the 1.0s，SEG04的0.5s），必须保留死寂以实现极强冷幽默。
  risk_notes:
    - 钝化水果刀圆头设计，刀具绝不指向任何人，劈瓜过程不展现流血撕裂，果汁呈高饱和亮红色，纯属搞笑物理，极度安全。
    - 人物纯几何体概括夸张，胖瘦反差，不参考任何真人演员肖像。
  next_action: 进入 scene-storyboard-director，消费 performance_sheet_v1.0.md 设计分镜运镜与段落过渡。
```

## 7. 分镜设计区

```yaml
patch_type: scene-storyboard-director
version: 2
status: completed
updated_at: 2026-06-02
summary: 夸张搞笑化（`exaggerated_comedy`）分镜设计已完成。全片目标 40 秒，按 10 秒分为 4 个 Segment，共计 4 个 Story Beat，设计了 12 个镜头（SH001-SH012）。完整镜头表落盘至 `details/shotlist_v1.0.md`，12张故事板设计图 prompt 已落盘至 `outputs/storyboard_prompts/storyboard_prompt_v1.0.md`。
data:
  storyboard_version: v1.0
  segment_duration_seconds: 10
  target_total_duration_seconds: 40
  total_story_beats: 4
  total_shots: 12
  total_segments: 4
  storyboard_summary: 重构原片写实拍法，转为高品质 3D 动画电影镜头语言。以华强的绝对冷静压迫与摊主暴烈蛮横、小弟谄媚多动的胖瘦反差动态博弈为主轴，通过避震Q弹、藤蔓弹抖、翻盘露红磁铁、去害化果汁大爆炸与小弟四脚蹬地破音逃命，将荒诞喜剧张力推至最高点，并设计了 3 个关键死寂停顿。
  segments:
    - segment_id: SEG01
      duration_seconds: 10
      covered_beats:
        - B01
      covered_shots:
        - SH001
        - SH002
        - SH003
      story_function: 华强Q弹疾驰刹停登场，调侃金子瓜价，建立冷酷压迫与市侩剔牙反差。
      rhythm_function: setup
      continuity_in: 夏日老街知了叫声淡入，复古摩托排气管啵啵喷气声切入。
      continuity_out: 华强“金子做的”调侃后定格 0.5s 死寂，移交挑瓜博弈。
    - segment_id: SEG02
      duration_seconds: 10
      covered_beats:
        - B02
      covered_shots:
        - SH004
        - SH005
        - SH006
      story_function: 华强手拍西瓜藤弹抖，发出“保熟”质问，逼急摊主怒拍肥手暴怒恐吓。
      rhythm_function: escalation
      continuity_in: 摊主不耐烦冷哼、小弟谄媚狗仗人势坏笑顺延。
      continuity_out: 摊主暴烈拍手和“你要不要吧”怒吼尾音卡点，移交砸瓜上秤。
    - segment_id: SEG03
      duration_seconds: 10
      covered_beats:
        - B03
      covered_shots:
        - SH007
        - SH008
        - SH009
      story_function: 对赌砸瓜上秤绿数爆闪，华强食指按盘一把翻面，刺眼大红吸铁石猫腻暴露，名定格全员石化。
      rhythm_function: reveal
      continuity_in: 西瓜砸中秤盘的巨大金属重撞音与颤音。
      continuity_out: 露出红色磁铁瞬间定格死寂 1.0s，移交高潮劈瓜爆发。
    - segment_id: SEG04
      duration_seconds: 10
      covered_beats:
        - B04
      covered_shots:
        - SH010
        - SH011
        - SH012
      story_function: 华强优美夺刀去害化劈西瓜，高压红色汁水大爆炸，老板落汤鸡，小弟仰天蹬空喊“萨日朗”逃命，华强绝尘离去，荒诞谢幕。
      rhythm_function: payoff
      continuity_in: 摊主把戏败露暴跳抢刀、华强钝刀折射星芒慢镜头拉伸。
      continuity_out: 摩托排气管卡点喷出三个烟圈，伴随渐远“萨日朗”破音呐喊，画面渐暗淡出。
  shot_highlights:
    - shot_id: SH001
      beat_id: B01
      start_second: 0.0
      end_second: 3.0
      shot_purpose: 建立异常摩托接近与Q弹刹车登场。
      camera_intent: 全景侧拍加惯性跟进缓冲，交代街角水果摊夏日环境，奠定物理喜剧底色。
      visual_focus: 华强黑色皮衣后背，摩托车红色弹簧避震剧烈起伏，排气管喷出白色卡通烟圈。
      motion_note: 摩托车疾驰而入稳稳刹停，前后避震弹跳回弹。
      acting_intent: 华强动作利索帅气，展示其不可动摇的磐石物理特征。
      facial_expression: 戴黑色高亮头盔，反光镜片折射光。
      dialogue_cue: 无台词。
      sound_intent: 发电机“轰隆”由近及近，刹车避震弹簧扭曲“吱溜”，排气管“啵”的一声。
      emotion_note: 帅气登场夹带卡通喜剧弹力。
    - shot_id: SH004
      beat_id: B02
      start_second: 10.0
      end_second: 13.5
      shot_purpose: 拍瓜挑西瓜，展现极度舒适的物理触觉。
      camera_intent: 俯拍瓜堆近景，在华强食指轻敲的瞬间镜头伴随微颤，增强冲击感。
      visual_focus: 华强黑色皮套右手，极圆蜡质西瓜顶部的卷曲褐色藤蔓。
      motion_note: 敲击处瓜皮微下陷并弹回，藤蔓产生弹簧般剧烈抖动，震起滑稽白粉尘。
      acting_intent: 手部动作沉稳精准，与藤蔓的高频振动形成大动静对比。
      facial_expression: 仅展现手部与西瓜。
      dialogue_cue: 无台词。
      sound_intent: “咚咚”空腔敲击回音，藤蔓Q弹摩擦音。
      emotion_note: 西瓜藤蔓被拟人化，逗趣可爱。
    - shot_id: SH009
      beat_id: B03
      start_second: 26.5
      end_second: 30.0
      shot_purpose: 掀盘揭穿猫腻，名定格全员石化。
      camera_intent: 秤底极微距高饱和红色大吸铁石特写，瞬间拉开为横向三人大中景。
      visual_focus: 秤盘反面金属折射中心的一大颗圆形亮红塑料磁铁。
      motion_note: 掀秤盘大动作利落，随后画面冻结一动不动，老板额头流下一大颗汗珠。
      acting_intent: 华强戏谑冷笑；老板僵若木鸡；小弟下巴大张嘴巴脱臼，膝盖颤抖鹰爪手。
      dialogue_cue: 华强：“你瞧瞧这秤盘子，这底下……”
      sound_intent: 掀秤金属摩擦吱呀声，磁铁相撞叮声，露出红磁铁瞬间完全真空静音。
      emotion_note: 绝对静止定格与亮红色突刺视觉重击，产生极强黑色幽默。
    - shot_id: SH011
      beat_id: B04
      start_second: 33.5
      end_second: 37.0
      shot_purpose: 去害化大爆炸，小弟仰天滑倒蹬车。
      camera_intent: 近景斜仰拍，镜头随爆炸剧烈晃动，果汁喷射迎面冲击镜头。
      visual_focus: 高压水枪般的鲜红色西瓜汁喷泉拍脸，小弟矮凳侧翻四脚朝天。
      motion_note: 西瓜像果汁水球剧烈爆炸激射瓜皮；小弟翻车倒地双脚在空中蹬自行车。
      acting_intent: 老板暴怒僵死委屈；小弟惊恐长嘴眼泪喷洒逃命；华强置身事外。
      dialogue_cue: 小弟：“萨日朗！萨日朗！！”
      sound_intent: 爆裂水闷爆“嘭—啪”，果汁水枪哗啦啦冲刷脸部，小弟破音方言尖叫声带距离衰减。
      emotion_note: 卡通物理受击与大爆炸，爆笑荒诞。
    - shot_id: SH012
      beat_id: B04
      start_second: 37.0
      end_second: 40.0
      shot_purpose: 华强绝尘离去，老街荒诞完美谢幕。
      camera_intent: 中景平滑向后、向上拉高为拉远鸟瞰俯拍，拉长斜黑影。
      visual_focus: 摩托车排气管特写喷出三个圆形卡通烟圈，后景小弟抱头大打滑狂奔逃窜。
      motion_note: 华强跨车绝尘而去驶入夕阳；小弟双手抱头向反方向拼命逃亡。
      acting_intent: 华强冷静克制；老板呆死废墟背景虚化；小弟溜肩抱头大打滑。
      dialogue_cue: 小弟：“萨日朗……萨日朗……”（画外渐远）
      sound_intent: 摩托“轰隆”油门，烟圈啵啵啵卡点喷气声，知了声在摩托引擎绝尘中连同大喊一起淡出。
      emotion_note: 完美荒诞戏剧谢幕，黑色幽默余韵无穷。
  continuity_rules:
    character_consistency: 华强的方肩皮外套和寸头、老板泛黄吊带和络腮胡、小弟瘦长驼背和豆豆眼锁定。
    performance_consistency: 华强绝对冷静克制，老板暴怒后硬切懵逼委屈，小弟大形变四脚蹬天狂奔。
    scene_consistency: 斑驳老墙、红蓝遮阳棚透视固定，雨棚倾斜微弧度与三木箱残骸连续。
    motion_continuity: 摩托SH001与SH012车架Q弹呼应；西瓜砸秤SH007与抵秤SH008底座下沉连续；钝刀卡通亮银星芒SH010衔接爆汁SH011。
    audio_continuity_hint: 保留SH003的 0.5s、SH009的 1.0s 和 SH011的 0.5s 三个真空静默，摩托引擎声跨越段落作为音频连续钩子。
  shotlist_file: details/shotlist_v1.0.md
  storyboard_prompt_files:
    - file: outputs/storyboard_prompts/storyboard_prompt_v1.0.md
      purpose: 生成 12 个镜头中英文故事板构图与视觉设计提示词
  audio_handoff:
    voice_direction_hints: 华强平稳冷静中慢速，第二次“保熟”声调压低；老板粗野咆哮；小弟方言高音破音喊“萨日朗”并进行声场距离拉远衰减。
    foley_priority: 摩托前后避震弹簧吱呀、啐出牙签当啷、皮套轻敲空腔咚咚、怒拍大肥手掌、西瓜砸秤沉重当、反盘锈蚀吱呀、磁铁相撞叮、钝刀破空呼、锃亮星芒锃、果汁大爆水球爆、水枪冲刷哗啦啦、排气喷烟啵啵啵。
    music_timing_hints: 敲瓜问价保持知了老街干底噪，劈瓜大爆炸SH010至SH011爆发出戏剧性滑稽大管弦乐卡点（长号/木琴滑音）。
    silence_points: B01句尾0.5s，B03磁铁败露1.0s，B04爆汁受洗后0.5s，达到物理真空静音。
  prompt_hints:
    video_prompt_focus: 每个分镜必须继承角色设定几何体、红蓝条纹遮阳雨棚和拉丝皮夹克纹理。
    reference_image_usage: 12张出图结果作为后续生成视频的强构图与关键帧参考图。
    segment_connection_focus: 前后两个 Segment 的衔接点必须通过摩托车引擎声和排气管卡点烟圈音效紧密咬合。
  risk_notes:
    - 刀具绝不指向人，钝化圆头切瓜刀设计，劈瓜不展现血腥血肉破裂，果汁呈高饱和亮红色，偏卡通流体，绝对PG安全。
    - 角色造型基于方形、圆形和三角形几何高度夸张概括，胖瘦反差，防侵肖像权。
  next_action: 进入 scene-audio-director，基于 shotlist_v1.0.md 细化配配音、拟音、环境音与混音计划。
```

## 8. 声音导演区

```yaml
patch_type: scene-audio-director
version: 1
status: completed
updated_at: 2026-06-02
summary: 声音导演阶段已完成。为 4 个 Segment 设计了高品质 3D 动画长片级配音方向、拟音、环境音、配乐主题和混音，完整声音导演方案落盘至 `details/audio_plan_v1.0.md`，配乐、拟音提示词及混音计划已分别写入 `outputs/audio/`。
data:
  audio_plan_version: v1.0
  audio_plan_path: details/audio_plan_v1.0.md
  music_prompt_path: outputs/audio/music_prompt_v1.0.md
  foley_prompt_path: outputs/audio/foley_prompt_v1.0.md
  audio_mix_plan_path: outputs/audio/audio_mix_plan_v1.0.md
  audio_summary: 本次声音方案以荒诞高反差喜剧为核心，保留老街知了环境底噪和摩托发电机低频，通过巴松管、尤克里里与马林巴的变奏动机烘托博弈，设计了 3 处戏剧性绝对静音，并使用滑稽长号大滑音卡点西瓜水球大爆炸和小弟破音“萨日朗”逃跑的滑稽释放，实现声画高度交响。
  voice_direction:
    language: zh-CN
    overall_tone: 荒诞高反差喜剧、生动烟火气、口语化呼吸感
    pacing: 华强中慢字字稳重，老板急躁粗重，小弟高频附和高潮极度破音大尖叫。
    breath_control: 华强两次发问前有清晰吸气声；老板发怒粗重喘气；小弟在死寂定格期吸凉气并吞咽口水。
    emotional_delivery: 华强冷静深邃中略微挑衅戏谑；老板粗野横蛮后被爆汁洗礼委屈发愣；小弟谄媚狗仗人势后屁滚尿流极度惶恐。
    character_voice_notes:
      - character_id: hua_qiang
        character_name: 华强
        voice_age: middle_aged
        voice_texture: 浑厚低沉、平稳带磁性
        emotional_tone: 冷静自若，隐含玩味冷笑
        pacing: 极其稳健，字句逻辑顿挫清晰
        pause_pattern: 台词发问前鼻息停顿 0.4s
        delivery_notes: 吐字速度恒定，语气克制，调侃价格时微弱声调戏谑上扬。
      - character_id: boss_vendor
        character_name: 摊主老板
        voice_age: middle_aged
        voice_texture: 粗粝沙哑、混浊带痰音
        emotional_tone: 粗野横蛮，用大嗓门掩盖心虚
        pacing: 快速抢话，句句紧密带粗喘
        pause_pattern: 掀翻秤盘露出红磁铁刹那瞬间卡脖子卡住 1.0s
        delivery_notes: 咬字极重，尾音带往上挑的挑衅感，爆汁后转为灌满甜果汁的发愣委屈鼻音。
      - character_id: vendors_henchman
        character_name: 摊主小弟
        voice_age: young_adult
        voice_texture: 尖细尖刻、干瘪带漏风
        emotional_tone: 谄媚鬼祟，高潮时惊恐万状破声
        pacing: 极其短促急促，碎字高频附和
        pause_pattern: 静音定格中耸动喉结咽口水发出清晰“咕噜”湿响
        delivery_notes: 谄媚笑声嘿嘿嘿气声，高潮惊恐“萨日朗”尖叫破音，声场拉远物理渐弱衰减。
  music_design:
    main_theme: 轻巧博弈主题，巴松代表老板，马林巴代表华强。
    leitmotif: 华强冷静发问出现【低音大提琴单音拨弦与马林巴敲击】；小弟谄媚附和出现【低音巴松断奏颤音】。
    instrumentation: 尤克里里、古典吉他、巴松管、单簧管、双簧管、大提琴拨弦、马林巴琴、大长号。
    tempo_range: 88-108 BPM
    emotional_curve: 夏日庸懒/冷面调侃 -> 对峙升级/压缩戏剧距离 -> 砸秤对赌突跳/掀秤真空死静 -> 西瓜爆炸长号滑音大释放。
    music_density: medium
    silence_points:
      - beat_id: B01
        shot_id: SH003
        purpose: 华强台词“金子做的”吐字结束，完全抽空所有配乐 0.5s，制造冷场死寂。
      - beat_id: B03
        shot_id: SH009
        purpose: 秤盘反转露出鲜红磁铁瞬间完全切断进入 1.0s 绝对真空静音，烘托三人同框石化。
      - beat_id: B04
        shot_id: SH011
        purpose: 西瓜大爆炸果汁水枪狠狠拍脸老板面门，完全静音配乐 0.5s 突出委屈金星特效。
  foley_design:
    density: high
    key_foley_moments:
      - shot_id: SH001
        segment_id: SEG01
        sound: 摩托避震Q弹吱溜下压摩擦，排气管啵气孔弹跳哨音。
        timing: 摩托急驰刹停瞬间与刚停稳卡点。
        purpose: 突出惯性下压的卡通物理回弹。
      - shot_id: SH004
        segment_id: SEG02
        sound: 皮手套敲西瓜清脆咚咚空腔回音，瓜藤啵嘤弹簧剧烈抖动摩擦。
        timing: 手指触瓜与敲击震起白小灰尘卡点。
        purpose: 增加大西瓜的蜡质弹性触觉细节。
      - shot_id: SH007
        segment_id: SEG03
        sound: 西瓜狠狠扣击秤盘巨大的金属当撞音，秤避震底座当啷当啷弹跳余颤。
        timing: 西瓜砸下卡点。
        purpose: 展现砸秤的力量感与夸张弹弹。
      - shot_id: SH009
        segment_id: SEG03
        sound: 反转秤盘干涩吱呀声，磁铁中心撞击亮响叮声。
        timing: 掀秤盘与盘面贴底瞬间。
        purpose: 金属扭曲与叮亮音撞击完美卡点，戳穿作弊。
      - shot_id: SH010
        segment_id: SEG04
        sound: 钝圆头刀锃地锃闪光音，慢动作下割裂空气重低音划空呼啸。
        timing: 华强拔刀瞬间与劈砍轨道。
        purpose: 渲染劈西瓜出刀威严与帅气。
      - shot_id: SH011
        segment_id: SEG04
        sound: 西瓜爆裂大水球闷爆嘭啪响，高压果汁消防水枪拍脸哗啦啦冲刷。
        timing: 劈中西瓜与红色水流击脸时。
        purpose: 爆笑卡通物理受洗，去害化大PAYOFF。
      - shot_id: SH012
        segment_id: SEG04
        sound: 摩托油门轰隆，排气管啵啵啵由高到低三烟圈弹跳哨音，小弟狂奔打滑踩后跟布鞋摩擦。
        timing: 跨车踩油门及烟圈卡点。
        purpose: 华强绝尘离去的完美黑色幽默画龙点睛。
  ambience_design:
    location_bed: 老街夏日高频知了高燥音床，闷热焦燥
    emotional_ambience: 对峙发问时知了声缓慢下压 6dB，让声音更显刺骨；大爆炸瞬间知了声掐断并加入 1000Hz 喜剧性短耳鸣。
    transition_ambience: 在 4 段 10 秒 Segment 技术切片拼接点，环境知了声底噪保持 100% 对齐与 15 帧等功率交叉淡化。
  segment_audio_plan:
    - segment_id: SEG01
      covered_shots:
        - SH001
        - SH002
        - SH003
      voice_focus: 华强沉稳发问与摊主剔牙漫不经心
      music_focus: 老街博弈轻松尤克里里与巴松 staccato 散漫
      foley_focus: 摩托避震Q弹吱溜、脱头盔当啷、啐牙签啐嗒
      ambience_focus: 正午燥热老街 100% 强度知了音床
      silence_or_pause: 华强“金子做的”台词结束 8.0s 完全真空静音 0.5s
      continuity_in: 夏日知了底噪渐入，机车引擎声由远及近
      continuity_out: 保留知了声与摩托低频底噪无缝带入 SEG02
    - segment_id: SEG02
      covered_shots:
        - SH004
        - SH005
        - SH006
      voice_focus: 华强二次压低发问“保熟吗”压迫，摊主怒吼“你要不要吧”粗野
      music_focus: 马林巴与提琴拨弦紧密，速度微调 88 BPM
      foley_focus: 手敲瓜咚咚、藤弹弹啵嘤、怒拍肥掌啪！！
      ambience_focus: 挑瓜交锋时知了叫声音量平滑下压 6dB 并削弱高频
      silence_or_pause: 无
      continuity_in: 摩托低频底噪、知了音床连续
      continuity_out: 摊主“你要不要吧”怒喘声与知了底噪带入 SEG03
    - segment_id: SEG03
      covered_shots:
        - SH007
        - SH008
        - SH009
      voice_focus: 华强指秤平静，秤盘反转后摊主败露语卡卡壳
      music_focus: 砸秤时马林巴突跳，翻盘瞬间配乐彻底切断
      foley_focus: 西瓜砸秤当、秤底倾斜咯吱、翻秤吱呀、磁铁叮亮音
      ambience_focus: 掀盘瞬间环境底噪彻底掐断
      silence_or_pause: 秤盘反转露出鲜红磁铁暴露（26.5s-27.5s）真空静音 1.0s，老板懵逼发愣（33.5s-34.0s）静音 0.5s
      continuity_in: 知了声与老板怒喘声连续
      continuity_out: 绝对静默中，小弟喉结耸动咽口水“咕噜”湿响和老板粗重呼吸声带入 SEG04
    - segment_id: SEG04
      covered_shots:
        - SH010
        - SH011
        - SH012
      voice_focus: 小弟惊恐破音呐喊“萨日朗”，方言破锣尖叫，声场移动渐弱混响
      music_focus: 爆炸瞬间爆发出极具爆笑滑稽大长号滑音与急促木琴（108 BPM）
      foley_focus: 圆头刀锃锃亮闪、慢动划空呼啸、水球闷爆嘭啪、消防水枪冲刷哗啦啦、摩托啵啵啵烟圈
      ambience_focus: 爆炸一瞬间加入 0.8s 由强转弱 1000Hz 喜剧性单耳鸣，后景逐渐淡出
      silence_or_pause: 西瓜爆汁后老板落汤鸡委屈脸强定制静音 0.5s
      continuity_in: 摊主败露咆哮声、华强拔刀慢动作拉伸
      continuity_out: 摩托车发电机引擎和排气管烟圈啵啵声，在知了底噪重叠渐弱中淡出静音，Fade to Black
  video_prompt_handoff:
    must_include_audio_notes: 最终视频 Prompt 必须把摩托Q弹吱溜、拍瓜咚咚藤啵嘤、砸秤当当当、反盘吱呀磁铁叮、刀锃锃亮闪、果汁爆嘭啪哗啦啦、排气啵啵啵等物理声音和三个真空静默段落写入每段视频 Prompt 中。
    music_prompt_usage: 继承 music_prompt_v1.0.md 知道配乐节奏和情感起伏，突出巴松与尤克里里、大长号滑音。
    foley_prompt_usage: 消费 foley_prompt_v1.0.md 生成物理碰撞。
    mix_notes: 台词第一优先级，重要拟音卡点瞬间压低配乐 -8dB，环境底噪在相邻 Segment 交界处 15 帧等功率交叉淡化。
  risk_notes:
    - 刀具绝不劈砍人，安全钝圆头设计，西瓜呈现流体水球爆炸与红色消防果汁，极度卡通搞笑，毫无暴力血腥。
    - 音乐不引用任何受版权保护的曲子，纯由巴松、尤克里里和长号滑音构成轻喜剧大Payoff。
  next_action: 进入 scene-video-prompt-builder，将完整角色设计、表演设计、分镜表和声音方案融合构建 4 段 10 秒视频 Prompt 及一致性语法约束。
```

## 9. 故事板与视频提示词区

```yaml
patch_type: scene-video-prompt-builder
version: 2
status: completed
updated_at: 2026-06-02
summary: 夸张搞笑化（`exaggerated_comedy`）视频提示词已生成。全片 40 秒，按 10 秒分为 4 个 Segment。成功将角色造型设定、眼神微表情、分镜镜头调度、台词气口、拟音与配乐完全内嵌于每一段提示词中，最大化确保生成效果与拼接连续性。提示词已落盘至 `outputs/video_prompts/video_prompt_segments_v1.0.md`。
data:
  prompt_pack_version: v1.0
  segment_duration_seconds: 10
  target_total_duration_seconds: 40
  total_segments: 4
  video_prompt_files:
    - file: outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_01
      covered_beats:
        - B01
      covered_shots:
        - SH001
        - SH002
        - SH003
      purpose: 第 1 段视频生成提示词，华强Q弹登场，脱盔直视，调侃价格尴尬冷场。
    - file: outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_02
      covered_beats:
        - B02
      covered_shots:
        - SH004
        - SH005
        - SH006
      purpose: 第 2 段视频生成提示词，手敲瓜藤Q弹颤抖抖灰，发问保熟及摊主暴拍肉掌。
    - file: outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_03
      covered_beats:
        - B03
      covered_shots:
        - SH007
        - SH008
        - SH009
      purpose: 第 3 段视频生成提示词，对赌砸瓜上秤，单指抵盘一掀翻秤，红磁铁猫腻暴露，三人石化。
    - file: outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_04
      covered_beats:
        - B04
      covered_shots:
        - SH010
        - SH011
        - SH012
      purpose: 第 4 段视频生成提示词，华强帅气反手拔刀劈瓜星芒闪，西瓜汁水球爆炸消防水枪冲脸老板，小弟仰天蹬空喊萨日朗逃命，排气管啵啵啵烟圈离场。
  reference_assets:
    character_design_refs: 使用 details/character_design_v1.0.md 产出的角色几何体、头身比与表情梯度锁定作为角色一致性参考。
    storyboard_refs: 使用 outputs/storyboard_prompts/storyboard_prompt_v1.0.md 生成故事板参考构图。
    performance_refs: 继承 details/performance_sheet_v1.0.md 中的华强单指抵秤、摘盔俯视，老板拍肉掌挺肚、硬切呆滞，小弟谄媚揣手、仰天自行车四脚蹬空动作连续。
    audio_refs: 继承 details/audio_plan_v1.0.md 角色台词气口起伏，outputs/audio/ 里的乐器动机与 foley 拟音。
  consistency_rules:
    character_consistency: 华强的黑皮夹克折痕拉丝拉链，老板白色吊带汗污渍与满脸西瓜汁粘籽物理，小弟瘦驼背溜肩裤脚高度不一与鞋子残缺。
    scene_consistency: 街角斑驳老墙裂缝与红蓝条纹遮阳棚倾斜微弧透视锁定，木箱碎裂与瓜皮滚地废墟一致性。
    performance_consistency: 华强冷静中慢字字稳，出刀跨车慢动作极度精准；老板粗暴横蛮硬切卡壳呆滞委屈；小弟高频猥琐谄媚坏笑受惊大形变仰天蹬车。
    motion_continuity: 摩托车避震Q弹前后呼应，西瓜砸秤盘绿屏滋滋闪烁定格，圆头西瓜刀锃锃金属锃亮划破空气呼啸，西瓜汁水球闷爆，排气管啵啵啵白烟圈依次淡出。
    audio_continuity: 摩托车发电机低频底噪跨段 SEG01-SEG02 Phase对齐，SEG03-SEG04 衔接点进行 J-Cut：在 SEG03 结尾提前 0.5s 淡入老板咆哮；相邻 Segment 交界处底噪执行 15 帧等功率交叉淡化。
  global_render_rules:
    visual_style_note: 保持皮克斯高品质 3D 动画电影粘土滑润 Clay 皮肤、真实物理材质纤维，不使用具体品牌字眼。
    performance_note: 严格继承表演表中的眼神、微表情变化梯度。
    dialogue_audio_note: 最终生成 prompt 中必须内嵌台词对话、呼吸与喊叫声卡点。
    music_and_foley_note: 提示词内嵌尤克里里、马林巴敲击、大长号大滑音管弦乐及拟音啵啵啵、咚咚、嘭啪。
    reference_usage_note: 喂入角色一致图 -> 每段故事板图 -> 分段提示词进行多模态视频生产。
    segment_connection_note: 结尾保留视线、气口或摩托引擎惯性作为拼接钩子。
  readiness_notes:
    - 故事板图与视频提示词完全落盘就绪，已具备视频生产多模态素材拼接的全部视觉、声音与物理一致性条件。
  next_action: 进入 scene-publish-review，准备封面、发布标题、多平台宣传文案引导与发布后复盘规范。
```

## 10. 发布与复盘区

```yaml
patch_type: scene-publish-review
version: 1
status: pending
updated_at:
summary: 待进行发布与复盘
data: {}
```

## 11. 风险与待办

- 确认 40 秒剧本的分段衔接点。
- 确认“捅刀/劈瓜”动作的去害化表现细节。
