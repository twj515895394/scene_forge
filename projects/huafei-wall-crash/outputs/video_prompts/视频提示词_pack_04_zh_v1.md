# 视频提示词 — Pack 04：仪式→高潮

覆盖 Seg7+Seg8（01:00-01:20），10镜，对应故事板 Pack 04，VGU-05。

---

## global_execution_preamble

将提供的"故事板总板 Pack 04"视为本段视频生成的**顺序视觉关键帧参考**，而非松散灵感图。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。

在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作。每个动作单元遵循：预备动作 → 发力 → 反应 → 收势。

本 Pack 覆盖全片从最高希望到终极爆破的完整弧线：
- Seg7（G01-G05）：用体育电影仪式感将希望拉到最高——2.35:1宽银幕+黄金时刻夕阳+史诗BGM渐强
- Seg8（H01-H05）：终极荒诞爆破——LED穿透+片场暴露+导演"保一条"+全员鼓掌

关键姿势的电影化动作扩展原则：
- G01触摸石墙：手伸出极慢→指尖触碰→手掌贴墙→闭眼感受——像触摸圣物
- G02触摸→微笑：从触觉到视觉的跨感官传递→第一个真正的笑
- G03-G04训练蒙太奇：体育电影式仪式化动作（画线→压腿→转肩→深呼吸），每个动作的极度认真形成反差
- G05起跑蹲姿：从低角度拍地面高度——蹲下→双手撑地→头低→缓缓抬头→眼神锁定
- H01爆发冲刺：慢镜侧面跟拍——脚蹬地扬起尘土粒子→面部被风力吹变形→泪汗飞散
- H02闭眼前0.2秒：面部肌肉从极度紧绷→完全松弛——平和
- H03 LED穿透（Hero Shot）：身体穿透"石墙"→墙面揭示为LED屏→像素撕裂/RGB碎片/雪花噪点——无声无撞击
- H04反向镜头（唯一轴线翻转）：从LED背面向片场方向——士兰闯入现代摄影棚
- H05导演+昏倒+鼓掌："保一条"后的五连击——嘴唇微动→眼上翻→前倾倒地→静默→掌声

本 Pack 为全片最高控制优先级（VGU-05: control_priority = highest）。

不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

## project_level_global_rules

**主场景空间锁定**：Seg7冷宫外墙（新空间，夕阳外景）。Seg8从外墙→LED穿透→片场（Zone D完全暴露，唯一轴线翻转）。泡沫柱在Seg8 H04片场广角中可见于背景冷宫侧。纸板柱CB-03倒地保持可见。

**角色重现锁定**：士兰——圆润鹅蛋脸，杏眼柳叶眉，素白旗装（延续皱褶状态，但G01-G05因为"认真"所以姿态庄严），干涸泪痕仍可见。新增角色：导演——40-50岁，鸭舌帽，导演马甲，胸前挂对讲机，坐在监视器前。

**不重复角色**：同一镜头内不出现两个士兰或其他角色重复。

**画面可读性优先**：动作清晰度、角色轮廓识别、空间稳定性、表演时机准确性。H04轴线翻转后空间关系必须清晰可辨——冷宫侧暖色+片场侧冷白LED的冷暖世界边界。

**风格锁定（classic_studio_wuxia）**：Seg7将"亮相"传统转化为体育电影仪式感——2.35:1宽银幕+黄金时刻夕阳+长阴影+完整动作展示。Seg8高潮处理不借通用快切——完整慢镜动作展示+无声穿透（舞台式"亮相"反转）+唯一轴线翻转+全员鼓掌（棚拍舞台谢幕）。

**灯光锁定**：Seg7金色夕阳逆光(色温3200K→2500K渐变)+长阴影(3m→8m)。Seg8 H01-H02暗橙余晖→H03穿透瞬间LED面光暖色→冷白突变→H04片场冷白LED(5600K)+暖柔光箱(3200K)混合 vs 冷宫暖色(2700K)——冷暖世界边界。

**负向边界**：不套用现代快剪爆破、LED穿透为柔性面板分离（无碎玻璃无锐边无火花）、不将"穿透"表现为写实伤害、镜头语言只服务叙事和动作可读性、不模仿任何具体电影镜头。

---

## Segment 7：终极准备（01:00-01:10）

### segment_technical_control_block — Seg7

```yaml
segment_id: Seg7
timecode: "01:00-01:10"
duration_seconds: 10
beat_ref: B05a
beat_purpose: 用体育电影蒙太奇把希望拉到最高——铺垫Seg8的终极翻转
primary_vgu_ids: [VGU-05]
covered_units: [U24, U25, U26, U27, U28]
covered_shots: [G01, G02, G03, G04, G05]
continuity_in: ←Seg6 F03猛坐起动势，0s切，空间切换(内→外)+冷暖桥接+音乐淡入
continuity_out: G05起跑蹲姿→Seg8 H01爆发冲刺，0s切，动作爆发衔接，2.35:1保持
next_handoff: G05起跑蹲姿+眼神锁定+最后夕阳余晖→Seg8 H01爆发冲刺直接承接
blocking_continuity:
  default_positions: 冷宫外墙（新空间），石墙在正北方，士兰从南侧接近
  allowed_moves: 士兰从外墙南侧→触摸→后退50m画线→拉伸→起跑蹲姿
  forbidden_zones: 石墙北侧（LED屏背面/片场侧）不可见
  screen_side_lock: 石墙永远在画面正前方（北）
  axis_preservation_note: 主轴线南北向保持，2.35:1宽银幕切换
prop_state_continuity:
  opening_state: LED屏LD-01石墙显示（外观逼真如长满青苔的古石墙）
  closing_state: LD-01（即将被穿透）
blocking_execution:
  G01-G02: 士兰站石墙南侧→伸手触摸
  G03: 士兰后退50m→画线→拉伸
  G04: 训练蒙太奇四格
  G05: 士兰起跑蹲姿距墙50m
prop_state_execution:
  opening_state: LD-01石墙显示（冰凉粗糙触感+青苔纹理+风化裂缝——外观极度逼真）
  in_segment_changes: 无
  closing_state: LD-01
  visible_evidence: 石墙表面纹理细节丰富，但观众不知其为LED屏
expressive_animation_inheritance:
  enabled: false
cinematic_language_inheritance:
  camera_language: 广角夕阳逆光→大特写交替→中景→四格分镜框→低角度
  visual_motivation: 先广角建立新空间+夕阳氛围→大特写让观众感受触觉→四格分镜致敬体育电影训练蒙太奇→低角度建立起跑的仪式感
  selected_shot_pattern: 体育电影训练蒙太奇结构——建立目标→测试→训练→起跑预备
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "陛下，我们来世再见。"
      line_intent: 对世界的最后一句话——极度认真所以沉重
      delivery_tone: 低沉，嘴唇无声微动（观众看到嘴型但不一定听到声音），BGM在台词时略退
      pacing_or_pause: 在起跑蹲姿中说完，然后沉默
rhythm_continuity:
  intensity_progression: 2→2→3→4→5（史诗渐强）
action_continuity: 触摸→微笑→画线→拉伸→蒙太奇→起跑蹲姿
emotion_continuity: 希望→仪式感→决绝
space_continuity: 冷宫外墙（室外新空间），2.35:1宽银幕
audio_direction:
  music: 史诗交响乐从ppp渐强(tempo~90→110bpm):G01-G02弦乐泛音→G03铜管进入→G04定音鼓+弦乐全奏→G05推到ff但留一口气
  ambience: 户外微风"呼——"、远处鸟鸣
  foley: G01手指触墙微摩擦"沙——"(极近距录音)→G03画白粉线"沙沙"
  dialogue: G05"陛下，我们来世再见"干声，BGM在台词时略退(mf)让这句话有重量
  segment_audio_bridge_in: ←Seg6 F03"唰"尾声→史诗BGM极弱起(ppp,弦乐泛音)→G01画面淡入
  segment_audio_bridge_out: G05台词余音+BGM在ff临界点→Seg8 H01冲刺爆发瞬间BGM全推至fff
storyboard_ref: 故事板提示词_pack_04_v2.md
shot_plan:
  - shot_id: G01
    related_vgu_id: VGU-05
    timecode_start: "01:00"
    timecode_end: "01:02"
    shot_continuity:
      previous_left: Seg6 F03猛坐起
      current_picks_up: 冷宫外墙广角
      entry_state: 士兰刚觉醒——"冷宫的墙一定是真的"
      core_action: 夕阳逆光+古老石墙全景→士兰站墙前→伸手极慢触摸
      exit_state: 手指触到石墙表面
      next_handoff: →G02大特写触摸+微笑
    visual_goal: 新空间建立——冷宫外墙在夕阳下极其真实
    camera_direction: 广角暖色夕阳逆光，2.35:1宽银幕切换，长影子拖身前地面
    screen_positioning:
      subject_left_right: 石墙在画面正前方，士兰居中偏下（仰角）
      facing_direction: 面北偏上（仰望石墙）
      depth_relation: 士兰前景→长影子中景→石墙正前方远景
    blocking_execution:
      default_positions: 士兰站外墙南侧
      allowed_moves: 缓慢伸手触摸
    prop_state_execution:
      opening_state: LD-01石墙显示
      visible_evidence: 古老石墙长满青苔，风化裂缝，表面粗糙纹理
    performance_direction: 伸手极慢——像触摸圣物。手指从身侧抬起→缓慢向前伸展→指尖第一个触到石面
    audio_direction: 史诗BGM极弱起(ppp,弦乐泛音)→户外微风→手指触墙极近距摩擦"沙——"

  - shot_id: G02
    related_vgu_id: VGU-05
    timecode_start: "01:02"
    timecode_end: "01:04"
    shot_continuity:
      previous_left: G01手指触墙
      current_picks_up: 大特写手指触墙+面部反应
      entry_state: 触觉确认——冰凉、粗糙、湿润青苔
      core_action: 手指抚摸石质纹理→切面部→闭眼感受→第一个真正微笑
      exit_state: 内心确信"这是真墙"
      next_handoff: →G03后退画线
    visual_goal: 从触觉到视觉的跨感官传递→她的第一个真正开心的笑
    camera_direction: 大特写插入手指触墙+切面部特写，2.35:1
    screen_positioning:
      subject_left_right: 手指特写(石墙局部)→士兰面部特写(居中)
    blocking_execution:
      default_positions: 士兰站外墙南侧
    performance_direction: 指尖触碰冰冷粗糙石质→手掌贴墙→闭眼感受→嘴角自然上扬→眼角有笑纹→眼睛微弯——全片第一个真正开心的笑
    audio_direction: 触墙微摩擦+C大调和弦渐入

  - shot_id: G03
    related_vgu_id: VGU-05
    timecode_start: "01:04"
    timecode_end: "01:06.5"
    shot_continuity:
      previous_left: G02微笑
      current_picks_up: 后退50m+画白粉起跑线
      entry_state: 确认目标
      core_action: 蹲下画线→站起→压腿→转肩→闭眼深呼吸
      exit_state: 热身完成
      next_handoff: →G04四格蒙太奇
    visual_goal: 仪式化准备——极度认真反而好笑
    camera_direction: 中景，金色夕阳拖长影子(3m→5m)，2.35:1
    screen_positioning:
      subject_left_right: 士兰居中，白粉线在地面横贯
    performance_direction: 蹲下画线缓慢仪式化→画完用袖子擦手→压腿(2s)+转肩(2s)+闭眼深呼吸(2s)——每个动作都极度认真形式化
    audio_direction: 画线"沙沙"+铜管渐入

  - shot_id: G04
    related_vgu_id: VGU-05
    timecode_start: "01:06.5"
    timecode_end: "01:08.5"
    shot_continuity:
      previous_left: G03拉伸热身
      current_picks_up: 四格分镜框训练蒙太奇
      entry_state: 准备进入最后的起跑
      core_action: 格1蹲白粉线旁严肃侧影·格2压腿拉伸·格3慢镜风吹发丝裙摆+极长影子(8m)·格4宫人路过被眼神吓僵贴墙溜走
      exit_state: 训练完成
      next_handoff: →G05起跑蹲姿
    visual_goal: 体育电影训练蒙太奇致敬——用分镜压缩时间+建立节奏
    camera_direction: 四格分镜框(上下或2×2)，2.35:1统一比例
    performance_direction: 格4宫人路过→士兰充满杀气的眼神→宫人吓得贴墙根溜走(喜剧点缀在仪式中)
    audio_direction: 定音鼓+弦乐全奏渐强

  - shot_id: G05
    related_vgu_id: VGU-05
    timecode_start: "01:08.5"
    timecode_end: "01:10"
    shot_continuity:
      previous_left: G04训练蒙太奇
      current_picks_up: 起跑蹲姿低角度
      entry_state: 身心准备完毕
      core_action: 蹲下→双手撑地→头低垂→缓缓抬头→眼神锁定50m外石墙
      exit_state: 锁定目标，即将爆发
      next_handoff: 起跑爆发动势→Seg8 H01 0s切
    visual_goal: 所有仪式感的终点——她准备好了
    camera_direction: 中景低角度(地面高度)，最后夕阳余晖照脸，2.35:1
    screen_positioning:
      subject_left_right: 士兰蹲姿居中偏右，石墙远景正前方
      facing_direction: 向北，眼神锁定正前方
    blocking_execution:
      default_positions: 起跑位距石墙约50m
    performance_direction: 头低垂→缓缓抬起(眼神从地面→石墙)→嘴唇无声微动"陛下，我们来世再见"→表情平静决绝
    audio_direction: BGM推到ff但留一口气→台词时BGM略退(mf)→台词余音+音乐在ff临界点
```

### 导演长版正文 — Seg7

**Segment 7：终极准备 | 01:00-01:10 | VGU-05 | G01-G05**

**G01 [01:00-01:02] 广角夕阳逆光**
从Seg6 F03的"唰"声——史诗交响BGM极弱起（ppp，仅弦乐泛音）——画面淡入冷宫外墙。2.35:1宽银幕切换，上下黑边正式进入"这次是认真的"视觉语境。外景，夕阳西下。金色逆光中，一面长满青苔的古老石墙占据画面正前方。风化裂缝、湿润青苔、粗糙的石质纹理——一切都极其真实。士兰站在墙前，素白旗装在夕阳下泛着金边。她的身影在地上拖出一条很长的影子。她伸出手——极慢，像触摸圣物。指尖第一个触到石面——"沙——"极近距的触墙摩擦声。

**G02 [01:02-01:04] 大特写交替**
大特写：手指在石面上缓慢抚摸——冰凉的粗糙纹理、青苔的湿润砂砾感、风化裂缝的凹凸。然后切到面部特写。士兰闭着眼睛，感受石墙。然后——她笑了。嘴角自然上扬，眼角出现笑纹，眼睛微微弯曲。这是全片第一个真正开心的笑。她内心确信：这是真的石头。C大调和弦在微笑时渐入。

**G03 [01:04-01:06.5] 中景**
士兰转身，向后退了约50米。蹲下，从袖中取出白粉，在地面缓慢而仪式化地画了一条笔直的起跑线。画完，用袖子擦擦手。站起——开始拉伸：压腿（2秒，节奏缓慢）→转肩（2秒，每个关节有控制）→闭眼深呼吸（2秒，胸腔可见扩张和收缩）。每个动作都极度认真、形式化——正是这种真诚的认真，在观众知道"之前所有道具都是假的"的认知下，形成了强烈的反差。铜管在深呼吸时渐入。

**G04 [01:06.5-01:08.5] 四格分镜框**
画面分割为四格（2×2或横向四格），致敬经典体育电影训练蒙太奇：
格1：士兰蹲在白粉线旁，严肃侧影，夕阳在她身后
格2：压腿拉伸姿势，身体前倾，头发垂下
格3：慢镜头——风吹动她的发丝和旗装裙摆，夕阳在她身后拉出一道极长的影子（约8m）
格4：一个宫人路过——她的眼神扫过去，充满杀气——宫人吓得僵住，然后贴着墙根溜走（这是Seg7唯一喜剧点缀）
定音鼓+弦乐全奏渐强。

**G05 [01:08.5-01:10] 中景低角度**
从地面高度的低角度拍摄。士兰蹲下，双手撑地，像短跑运动员。头低垂。然后缓缓抬头——眼神从地面→抬起→锁定50米外的石墙。最后一丝夕阳余晖照在她的脸上，表情平静而决绝。嘴唇无声微动："陛下，我们来世再见。"BGM在台词时略退（mf），让这句话有重量。音乐保持在ff的临界点——留一口气——然后0s切Seg8。

---

## Segment 8：LED穿帮（01:10-01:20）

### segment_technical_control_block — Seg8

```yaml
segment_id: Seg8
timecode: "01:10-01:20"
duration_seconds: 10
beat_ref: B05b
beat_purpose: 全片终极翻转——最认真的一撞，撞出了最荒诞的结果
primary_vgu_ids: [VGU-05]
covered_units: [U29, U30, U31, U32, U33]
covered_shots: [H01, H02, H03, H04, H05]
continuity_in: ←Seg7 G05起跑爆发，0s切，动作爆发衔接，2.35:1保持
continuity_out: H05昏倒→Seg9 I01醒来(时间省略)，reverb尾音+钢琴pp音桥
next_handoff: H05脸朝下大字趴→Seg9 I01坐导演椅醒来(冰袋+毯子为时间省略线索)
blocking_continuity:
  default_positions: 石墙/LED屏正北方，士兰从南向北冲刺
  allowed_moves: 冲刺→穿透→闯入片场(Zone D完全暴露，不可逆)
  forbidden_zones: 穿透后不可返回冷宫侧
  crossing_rule: H04唯一轴线翻转（从北向南拍片场）
  screen_side_lock: 泡沫柱/纸板柱倒地状态在H04片场广角中可见于背景冷宫侧
  axis_preservation_note: H01-H03保持南北轴→H04翻转轴(北→南)→H05恢复多角度
prop_state_continuity:
  opening_state: LD-01石墙显示
  closing_state: LD-03片场暴露（不可逆）
blocking_execution:
  H01-H02: 士兰向南→北冲刺
  H03: 士兰穿透LED屏（从南→北穿越至片场侧）
  H04: 士兰踉跄闯入片场Zone D→环顾
  H05: 士兰听到"保一条"→昏倒大字趴
prop_state_execution:
  opening_state: LD-01石墙显示（外观逼真）
  in_segment_changes: H03穿透→LD-02像素撕裂→LD-03片场暴露
  closing_state: LD-03不可逆（LED面板背面:黑色框架+电源线+信号线可见）
  visible_evidence: H03像素撕裂/RGB碎片/扫描线碎裂/雪花噪点→H04 LED面板背面结构→正面恢复显示石墙图像(但秘密已暴露)
expressive_animation_inheritance:
  enabled: false
  note: LED穿透为物理特技+视觉特效（柔性面板分离设计，无碎玻璃无锐边）
cinematic_language_inheritance:
  camera_language: 侧面跟拍慢镜→面部大特写→正面慢镜(Hero)→广角反向(唯一轴线翻转)→中景拉广角
  visual_motivation: 从士兰视角(冲向石墙)→观众视角(穿透揭示真相)→士兰视角(环顾片场)→导演视角(监视器后的反应)
  selected_shot_pattern: 建立→加速→穿透→揭示→反应——classic_studio_wuxia"亮相"的反转版
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 导演
      dialogue_text: "好！这条情绪到了！保一条！"
      line_intent: 职业习惯式赞赏——完全没意识到士兰已经昏倒
      delivery_tone: 拍大腿站起→竖起大拇指→眼睛发光
    - character_id: 副导演
      dialogue_text: "导演，她好像……穿到B组了？"
      line_intent: 小心翼翼地提醒
      delivery_tone: 凑近耳语，声音压低
rhythm_continuity:
  intensity_progression: 9→9→0（静音爆破）→3→5→4→6（掌声释放）
action_continuity: 冲刺→闭眼→穿透→踉跄→环顾→听到保一条→嘴唇动→眼上翻→前倾倒地→鼓掌
emotion_continuity: 决绝→平和→空白→崩塌→释放
space_continuity: 冷宫外墙→LED穿透→片场(Zone D完全暴露)。2.35:1保持至H03→H04恢复16:9
audio_direction:
  music: 史诗BGM从fff→ffff(H01-H02推到极限)→H03穿透瞬间突然静音(拔电源式，0.1s内归零，不是fade out)
  foley: H01脚蹬地尘土粒子→H03穿透瞬间:像素撕裂数字噪音"滋滋——"(高频)+扫描线蜂鸣(中频)+雪花噪点(白噪短爆)→0.5s→完全无声
  ambience: H04片场环境音涌入——设备低频嗡声+对讲机杂音"沙沙"+空调运行声
  silence_or_pause: H03穿透后0.5s完全无声→H05"保一条"后2秒静默→第一个掌声打破
  dialogue: H05导演"好！保一条！"→副导演耳语→静默2秒→掌声渐起
  segment_audio_bridge_in: ←Seg7 G05 BGM在ff临界点→H01冲刺爆发瞬间BGM全推至fff
  segment_audio_bridge_out: H05掌声最后渐弱(reverb tail延长2s)→温暖钢琴单音进入(pp)→Seg9 I01醒来
hero_moment_candidates: [H01]——全片终极爆破点
ending_payoff_hook: LED穿透+导演"保一条"为全片核心翻转——她的"认真"在别人眼里是"好戏"
opening_anchor_reference: AF-09（夕阳石墙广角）已承接
closing_anchor_reference: AF-10（全员鼓掌广角）
storyboard_ref: 故事板提示词_pack_04_v2.md
shot_plan:
  - shot_id: H01
    related_vgu_id: VGU-05
    timecode_start: "01:10"
    timecode_end: "01:12.5"
    shot_continuity:
      previous_left: Seg7 G05起跑蹲姿
      current_picks_up: 爆发全速冲刺
      entry_state: 决绝
      core_action: 脚蹬地→尘土粒子扬起(慢镜)→面部被风力吹变形→泪汗飞散→身体极限前倾→石墙快速逼近
      exit_state: 距石墙约5m
      next_handoff: →H02闭眼前0.2s
    visual_goal: 全片最悲壮的冲刺——用最认真的跑法冲向最荒诞的结局
    camera_direction: 中景侧面跟拍慢镜头(升格)，2.35:1
    screen_positioning:
      subject_left_right: 士兰侧面(东西侧跟拍)，石墙远景正前方快速逼近
      facing_direction: 向北
    blocking_execution:
      default_positions: 冲刺路径约50m(南→北)
      allowed_moves: 全速向北直线冲刺
    performance_direction: 脚蹬地瞬间爆发力→身体前倾角>30°→面部被"风"吹动(嘴微张呼吸眼始终锁死前方)→泪水和汗水向后飞散成水滴粒子(慢镜可见)
    audio_direction: BGM从ff→fff全推到极限

  - shot_id: H02
    related_vgu_id: VGU-05
    timecode_start: "01:12.5"
    timecode_end: "01:14"
    shot_continuity:
      previous_left: H01冲刺距墙5m
      current_picks_up: 撞击前0.2秒面部
      entry_state: 全力冲刺即将撞墙
      core_action: 闭眼→面部肌肉从极限紧绷→完全松弛→泪珠挤出
      exit_state: 平和——她以为自己即将死去
      next_handoff: →H03穿透瞬间(Hero Shot)
    visual_goal: 撞前0.2秒——从极度紧张到完全放下的瞬间
    camera_direction: 面部大特写，2.35:1，BGM峰值保持
    performance_direction: 闭眼→面部肌肉从紧绷(额头/嘴角/下巴张力)→完全松弛(所有肌肉泄去)→一颗泪珠从闭眼挤出→平和的表情——她以为这是死亡
    audio_direction: BGM保持在ffff极限

  - shot_id: H03
    related_vgu_id: VGU-05
    timecode_start: "01:14"
    timecode_end: "01:16"
    shot_continuity:
      previous_left: H02闭眼平和
      current_picks_up: 身体穿透"石墙"
      entry_state: 闭眼，迎接撞击
      core_action: 身体穿透石墙→墙面揭示为LED屏→像素撕裂/扫描线碎裂/雪花噪点/RGB碎片散射→剪影穿过数字裂痕
      exit_state: 穿透完成，已入片场侧
      next_handoff: →H04踉跄环顾片场
    visual_goal: ★HERO SHOT★——全片终极爆破点
    camera_direction: 中景正面慢镜头(士兰正面冲来→穿透→镜头在"墙"另一侧接住她)，2.35:1
    screen_positioning:
      subject_left_right: 士兰正面从远→极近→穿透→越过镜头
      facing_direction: 从南向北→穿透后向北继续
    performance_direction: 身体接触"石面"→没有撞击，没有声音→LED面板柔性分离→她穿过去→像穿过一层像素组成的水面
    audio_direction: 史诗BGM突然静音(拔电源式，0.1s内归零)→像素撕裂数字噪音"滋滋——"(高频)+扫描线蜂鸣(中频)+雪花噪点(白噪短爆)→0.5s→完全无声

  - shot_id: H04
    related_vgu_id: VGU-05
    timecode_start: "01:16"
    timecode_end: "01:18"
    shot_continuity:
      previous_left: H03穿透完成
      current_picks_up: 从LED屏背面向片场方向
      entry_state: 士兰刚穿出LED面板
      core_action: 踉跄闯入片场→可见摄像机轨道+收音吊杆+灯光架+工作人员定格→环顾180°
      exit_state: 认知崩溃中
      next_handoff: →H05导演反应+昏倒
    visual_goal: 全片唯一轴线翻转——让观众和士兰同时看到真相
    camera_direction: 广角反向镜头(从北向南拍片场)，恢复16:9
    screen_positioning:
      subject_left_right: 士兰从LED屏方向闯入画面→环顾
      depth_relation: 士兰前景→LED面板背面(黑色框架+电源线+信号线)→冷宫侧(bg可见泡沫柱+倒地纸板柱暖色烛火)→片场设备(冷白LED+暖柔光混合)
    blocking_execution:
      default_positions: 片场Zone D(完全暴露，不可逆)
    performance_direction: 踉跄前冲几步→站定→缓慢转头180°环顾——灯光→摄像机→监视器→工作人员(全部定格在看她的瞬间)→表情完全空白(大脑在尝试处理但CPU过热)
    audio_direction: 0.5s完全无声→片场环境音涌入(设备嗡声+对讲机杂音+空调声)——这是声音的"世界切换"

  - shot_id: H05
    related_vgu_id: VGU-05
    timecode_start: "01:18"
    timecode_end: "01:20"
    shot_continuity:
      previous_left: H04环顾片场
      current_picks_up: 导演探头+士兰反应
      entry_state: 认知空白
      core_action: 导演探头"好！这条情绪到了！保一条！"→副导耳语→士兰嘴唇动→眼上翻→前倾倒地→静默→第一个掌声→全员鼓掌
      exit_state: 士兰昏倒+全员鼓掌
      next_handoff: 昏倒脸朝下大字趴→Seg9 I01醒来(时间省略)
    visual_goal: 五连击终极爆破收束
    camera_direction: 中景拉广角——前景士兰昏倒大字趴+背景全员鼓掌
    screen_positioning:
      subject_left_right: 导演监视器在画面一侧→士兰居中→背景群演鼓掌
    blocking_execution:
      default_positions: 士兰站→倒，导演在监视器后
    performance_direction: 导演拍大腿站起竖大拇指"好！这条情绪到了！保一条！"(职业习惯完全没意识到士兰已昏)→副导凑近耳语"导演她好像穿到B组了？"→切士兰:嘴唇微动想说"什么"但发不出声→眼神困惑→恍然→彻底崩→眼上翻→如断电前倾→脸朝下大字趴→静默一拍→灯光师第一个掌声"啪啪啪"孤立清晰→更多人加入→热烈鼓掌+口哨
    audio_direction: 导演"保一条！"→2秒完全静默(没有音效没有BGM没有环境音——真空静默)→灯光师第一个掌声"啪、啪、啪"(孤立中频清晰)→渐多→热烈+欢呼口哨→掌声渐弱(reverb tail延长2s)
```

### 导演长版正文 — Seg8

**Segment 8：LED穿帮 | 01:10-01:20 | VGU-05 | H01-H05 ★HERO SHOT★**

**H01 [01:10-01:12.5] 中景侧面跟拍慢镜头**
0s切。士兰从起跑位爆发出全速冲刺——脚蹬地的瞬间，尘土粒子在慢镜头下扬起成扩散的微粒云。她的身体极限前倾（角度>30°）。面部被"风力"吹得微微变形——嘴微张呼吸，眼睛始终锁死正前方的石墙。泪水和汗水向后飞散成拉长的水滴粒子轨迹。发丝和裙摆向后水平飘飞。石墙在画面正前方从远景→中景→近景快速逼近——表面青苔和风化裂缝越来越清晰。史诗BGM从ff全推至fff极限。2.35:1宽银幕。

**H02 [01:12.5-01:14] 面部大特写**
距石墙约2米——撞击前0.2秒。士兰闭上眼睛。面部肌肉在0.2秒内经历完整变化：额头肌肉从紧绷（青筋微现）→完全松弛（皮肤平滑），嘴角从紧抿→自然松开，下巴从咬紧→打开。一颗泪珠从闭着的眼缝中挤出——不是恐惧的泪，是放下的泪。她的表情极度平和。BGM保持在ffff——然后——

**H03 [01:14-01:16] 中景正面慢镜头 ★HERO SHOT★**
没有撞击。没有声音。她的身体像穿过一层像素组成的水面——"石墙"在她接触的瞬间暴露出真相：它是LED显示屏。穿透点以她的身体为中心扩散——像素撕裂像玻璃裂纹但由RGB碎片组成、扫描线碎裂成横纹、雪花噪点向四周爆炸、数字残影拖在她身后。她的剪影穿过这道数字裂痕，像穿过一面光之门。BGM在穿透瞬间被"拔掉电源"——不是fade out，是在0.1秒内从ffff归零。替换它的是一声高频数字噪音"滋滋——"、扫描线蜂鸣中频、白噪短爆——然后0.5秒——完全无声。2.35:1。

**H04 [01:16-01:18] 广角反向镜头（唯一轴线翻转）**
画面恢复16:9。镜头从LED屏幕的背面——向北——向片场方向拍摄。士兰从LED面板的另一面踉跄穿出，惯性让她向前冲了几步才站定。LED屏幕的背面：黑色面板框架、缠绕的电源线、信号线、散热孔——这是它的内脏。屏幕正面已经恢复显示石墙图像（但秘密已被打破）。士兰站在片场中央——摄像机轨道铺在地上、收音麦克风吊杆在头顶悬停、灯光架布满LED面板和柔光箱、所有工作人员保持定格姿势盯着她。她缓慢转头180°——从灯光→摄像机→监视器→众人。表情完全空白。冷宫侧（画面远处背景）的暖色烛火（2700K）和片场侧的冷白LED（5600K）+暖柔光箱（3200K）混合在同一画面中——冷暖世界的边界。完全无声→片场环境音涌入：设备低频嗡声、对讲机杂音"沙沙"、空调运行声——声音进行的"世界切换"。

**H05 [01:18-01:20] 中景拉广角**
导演从监视器后面探出头——他愣了一秒，然后拍大腿站起来，竖起大拇指，眼睛发光："好！这条情绪到了！保一条！"——完全职业习惯的赞赏，完全没注意到士兰已经不在正常状态。副导演凑近耳语，声音压低："导演，她好像……穿到B组了？"——导演歪头"穿到B组了？"然后若有所思，最后耸肩（不在乎）。切到士兰面部：嘴唇微动——想说"什么"但发不出声。眼神从困惑→恍然（终于明白了）→彻底崩——眼睛向上翻，身体像断电一样前倾，脸朝下倒在地上，形成一个标准的"大"字趴。2秒完全静默——没有BGM、没有音效、没有环境音——只有真空的静默。然后灯光师第一个鼓掌："啪、啪、啪"——三声孤立而清晰。掌声从这一处开始扩散——越来越多人加入——越来越热烈——有人吹口哨——变成全场的欢呼。前景是士兰昏倒的身体，背景是整个片场在为她鼓掌。掌声渐弱（reverb tail延长2秒）——过渡到Seg9。
```

---

## 可直接复制使用块 — Seg7

```
【全局前导】

将"故事板总板 Pack 04"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫外墙(室外新空间)。石墙在正北方，2.35:1宽银幕切换
- 角色锁定：士兰(旗装皱褶+干涸泪痕，姿态庄严)，不重复角色
- 画面可读性优先、棚拍布景感贯穿
- 灯光：金色夕阳逆光(色温3200→2500K渐变)+长阴影(3m→8m)
- 负向边界：不套现代快剪、冲击效果无害化、不模仿具体电影镜头

【Segment 7 技术控制块】

segment_id: Seg7 | timecode: 01:00-01:10
primary_vgu_ids: [VGU-05]
continuity_in: ←Seg6 F03猛坐起动势，0s切+空间切换(内→外)+冷暖桥接+音乐淡入
continuity_out: G05起跑蹲姿→Seg8 H01爆发冲刺，0s切+动作爆发衔接+2.35:1保持
shot_continuity_refs: [G01, G02, G03, G04, G05]
blocking_continuity: 石墙正北，士兰从南侧接近→后退50m→起跑蹲姿
prop_state_continuity: LED屏LD-01石墙显示(外观逼真如古石墙)
blocking_execution: G01-G02站墙前触摸→G03后退50m画线拉伸→G04四格蒙太奇→G05起跑蹲姿距墙50m
prop_state_execution: LD-01(冰凉粗糙触感+青苔+风化裂缝——观众不知其为LED屏)
next_handoff: G05起跑蹲姿+眼神锁定→Seg8 H01爆发冲刺直接承接

【Segment 7 导演长版提示词】

Seg7 终极准备 | 01:00-01:10 | VGU-05 | 5镜 | 2.35:1

[G01 01:00-01:02] 广角夕阳逆光。2.35:1宽银幕切换。古老石墙长满青苔风化裂缝占据正前方。士兰站墙前，夕阳逆光泛金边，长影子拖地。伸手极慢触摸——指尖第一个触石面"沙——"。史诗BGM ppp起弦乐泛音。

[G02 01:02-01:04] 大特写交替。手指抚摸石质纹理(冰凉粗糙+青苔湿润)→切面部→闭眼感受→第一个真正微笑(嘴角上扬眼角笑纹眼微弯)。C大调和弦渐入。

[G03 01:04-01:06.5] 中景。后退50m→蹲下白粉画线(缓慢仪式化)→用袖擦手→站起→压腿(2s)→转肩(2s)→闭眼深呼吸(2s胸腔可见)。每个动作极度认真形式化。夕阳影子拉长3m→5m。铜管渐入。

[G04 01:06.5-01:08.5] 四格分镜框(2×2)。格1蹲白粉线旁严肃侧影·格2压腿拉伸·格3慢镜风吹发丝裙摆+影子拉至8m·格4宫人路过被眼神吓僵贴墙溜走(喜剧点缀)。定音鼓+弦乐全奏渐强。

[G05 01:08.5-01:10] 中景低角度(地面高度)。起跑蹲姿——双手撑地→头低垂→缓缓抬头→眼神锁定50m外石墙。最后夕阳照脸，平静决绝。嘴唇无声微动"陛下，我们来世再见"。BGM推至ff留一口气→0s切Seg8。
```

---

## 可直接复制使用块 — Seg8

```
【全局前导】

将"故事板总板 Pack 04"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫外墙→LED穿透→片场(Zone D完全暴露，不可逆)。2.35:1→H04恢复16:9
- 角色锁定：士兰+导演(40-50岁,鸭舌帽,导演马甲,对讲机,监视器前)，不重复角色
- 画面可读性优先：H04轴线翻转后空间关系清晰——冷宫暖色+片场冷白LED冷暖边界
- 灯光：H01-H02暗橙余晖→H03穿透LED面光暖→冷白突变→H04冷暖世界同框
- 负向边界：LED穿透为柔性面板分离(无碎玻璃无锐边无火花)、不表现为写实伤害

【Segment 8 技术控制块】

segment_id: Seg8 | timecode: 01:10-01:20
primary_vgu_ids: [VGU-05]
continuity_in: ←Seg7 G05起跑爆发，0s切+动作爆发衔接+2.35:1保持
continuity_out: H05昏倒→Seg9 I01醒来(时间省略)，掌声reverb尾音+钢琴pp音桥
shot_continuity_refs: [H01, H02, H03, H04, H05]
blocking_continuity: 冲刺→穿透→闯入片场(Zone D不可逆)。H04唯一轴线翻转(北→南)
prop_state_continuity: LD-01→LD-02(像素撕裂)→LD-03(片场暴露/不可逆)
blocking_execution: H01-H02冲刺→H03穿透→H04闯入片场环顾→H05昏倒大字趴
prop_state_execution: 石墙→穿透→LED面板背面(黑色框架+电源线+信号线)暴露
next_handoff: H05脸朝下大字趴→Seg9 I01坐导演椅醒来(冰袋+毯子时间省略线索)

【Segment 8 导演长版提示词】

Seg8 LED穿帮 | 01:10-01:20 | VGU-05 | 5镜 ★HERO SHOT★

[H01 01:10-01:12.5] 中景侧面跟拍慢镜(升格)。0s切。脚蹬地尘土粒子扬起慢镜扩散→面部被风力吹变→泪汗飞散拉长水滴轨迹→身体极限前倾>30°→石墙从远→近快速逼近。BGM ff→fff。2.35:1。

[H02 01:12.5-01:14] 面部大特写。撞前0.2s。闭眼→面部肌肉从极限紧绷→完全松弛(0.2s连续变化)：额头青筋→平滑、嘴角紧抿→松开、下巴咬紧→打开。泪珠从闭眼挤出。表情极度平和。BGM ffff。

[H03 01:14-01:16] ★HERO SHOT★ 中景正面慢镜。身体穿透"石墙"→墙面揭示为LED屏。穿透点以身体为中心扩散：像素撕裂RGB碎片、扫描线碎裂横纹、雪花噪点爆炸、数字残影拖在身后。剪影穿过数字裂痕如穿光之门。BGM拔电源式骤停(0.1s归零)→数字噪音"滋滋——"+扫描线蜂鸣+白噪短爆→0.5s完全无声。2.35:1。

[H04 01:16-01:18] 广角反向镜头(唯一轴线翻转)。恢复16:9。从LED屏背面向北拍。士兰踉跄穿出→冲几步站定→缓慢环顾180°。LED背面：黑色框架+电源线+信号线(内脏暴露)。片场：摄像机轨道+收音吊杆+灯光架+工作人员定格。冷宫暖色(2700K)vs片场冷白LED(5600K)冷暖同框。无声→片场环境音涌入(设备嗡+对讲杂音+空调)。

[H05 01:18-01:20] 中景拉广角。导演探头→愣→拍大腿站竖拇指"好！这条情绪到了！保一条！"(完全没注意士兰已昏)→副导耳语"导演她好像穿到B组了？"。士兰：唇动发不出声→困惑→恍然→彻底崩→眼上翻→断电前倾→脸朝下大字趴。2秒真空静默→灯光师第一个掌声"啪啪啪"(孤立)→渐多→热烈+欢呼口哨。前景士兰昏倒+背景全员鼓掌。掌声渐弱(reverb 2s)→钢琴pp进入→过渡Seg9。
```
