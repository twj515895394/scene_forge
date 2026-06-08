# 视频提示词 — Pack 02：社死→崩溃

覆盖 Seg3+Seg4（00:20-00:40），10镜，对应故事板 Pack 02，VGU-02+VGU-03。

---

## global_execution_preamble

将提供的"故事板总板 Pack 02"视为本段视频生成的**顺序视觉关键帧参考**，而非松散灵感图。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。

在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作，而不是逐格摆拍。每个动作单元遵循：预备动作 → 发力 → 反应 → 收势。

本 Pack 覆盖两次情绪反转与四道具快剪：
- Seg3（C01-C04）：从借冷笑重建自信到纸板柱倒塌和场务穿帮的"社死"
- Seg4（D01-D06）：四道具连环崩溃的快节奏蒙太奇，到跳水预备的"认真暂停"

关键姿势的电影化动作扩展原则：
- C01爬起拍灰：从坐地到站立的逐关节运动，拍灰三联的节奏递增
- C02敲柱测试：试探→确认→自信的三阶段微表情串联
- C03撞纸板柱：从自信冲刺到柱子僵直倒下的物理反差——柱子不倒向侧面，而是直挺挺向前拍地
- C04场务对视：3秒凝固时间的微动作（面条悬挂的摆动→吸面的慢动作→士兰嘴角抽搐）
- D01-D05快剪：每个道具失败单元的完整物理链（撞→道具崩溃→踉跄/飞出/栽入/缠绕/挣脱）
- D06跳水预备：从披头散发的混乱到极度认真的仪式化pose——"认真得过分所以好笑"

不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

## project_level_global_rules

**主场景空间锁定**：冷宫棚拍片场贯穿。泡沫柱Zone B左固定（Seg2后已恢复静止），纸板柱Zone B右（C03倒地后保持至Seg8），木桌/香炉/绿幕/蹦床在Zone C前区。Zone D在Seg8前不可见。后墙始终在正后方。

**角色重现锁定**：士兰——圆润鹅蛋脸，杏眼柳叶眉，素白棉麻旗装，两把头简化版发髻。本 Pack 中旗装渐皱、发丝渐乱（C01后拍灰留灰痕，D05后头发完全散乱）。场务小哥——22-28岁，灰色短袖T恤，深色工装裤，胸前挂工作证，单耳挂耳机，手持一次性泡面碗。

**不重复角色**：同一镜头内同一角色不出现两次。

**画面可读性优先**：动作清晰度、角色轮廓识别、空间稳定性、表演时机准确性。

**风格锁定（classic_studio_wuxia）**：棚拍布景感、定场亮相、完整动作展示、节拍偏稳。Seg4快剪不套用现代MTV式碎片化——每个道具失败后给0.5秒亮相停顿。

**灯光锁定**：暖色烛火主光(2700K)+高窗月光冷补(5600K)。D06跳水预备：单束冷白聚光(5000K)从上方45°隔离于周围暖色烛火。

**负向边界**：不套用现代快剪动作片逻辑、不现代化表演、所有冲击效果保持无害化非写实表现、镜头语言只服务叙事和动作可读性。

---

## Segment 3：卷土重来（00:20-00:30）

### segment_technical_control_block — Seg3

```yaml
segment_id: Seg3
timecode: "00:20-00:30"
duration_seconds: 10
beat_ref: B02
beat_purpose: escalation——从"不服"到"社死"，第二次道具失败+第三方围观加倍荒诞
primary_vgu_ids: [VGU-02]
covered_units: [U07, U08, U09, U10]
covered_shots: [C01, C02, C03, C04]
continuity_in: ←Seg2 B04坐地姿势，0s切，无声桥接
continuity_out: 社死凝固→Seg4 D01暴躁撞桌，0s切，情绪从尴尬跳发泄
next_handoff: C04场务与士兰对视凝固+纸板柱倒地→Seg4 D01撞桌瞬间打破
blocking_continuity:
  default_positions: 士兰Zone A/B左右移动，泡沫柱Zone B左固定，纸板柱Zone B右
  allowed_moves: 士兰从Zone B左→Zone B右（走向纸板柱），场务Zone D→暴露于Zone B右（柱倒后）
  forbidden_zones: Zone D在C04前不完全暴露（仅场务所在局部可见）
  crossing_rule: 不跨180度东西轴线
  screen_side_lock: 泡沫柱始终在画面左侧
  eye_line_rule: C01-C02士兰视线在柱子间转移→C04与场务对视
  axis_preservation_note: 主轴线不变
prop_state_continuity:
  opening_state: 泡沫柱FP-01静止，纸板柱CB-01正常外观
  closing_state: 纸板柱CB-03倒地（保持至VGU-05 C12），泡沫柱FP-01原位
blocking_execution:
  C01: 士兰从坐地爬起，Zone A→拍灰，转身盯泡沫柱
  C02: 士兰移至Zone B右，敲纸板柱
  C03: 士兰冲刺撞纸板柱，柱倒向正前方
  C04: 柱倒后暴露场务，双人构图对峙
prop_state_execution:
  opening_state: 泡沫柱FP-01静止+FP-02便利贴可见，纸板柱CB-01正常外观
  in_segment_changes: C03纸板柱CB-01→CB-03倒地
  closing_state: 纸板柱CB-03倒地不可逆，泡沫柱FP-01原位
  visible_evidence: 纸板柱背面中空可见，场务从柱后暴露
expressive_animation_inheritance:
  enabled: false
cinematic_language_inheritance:
  camera_language: 中景→中景→跟拍→双人中景凝固
  visual_motivation: 先从士兰视角建立试探→自信→冲刺→然后柱倒揭示真相→双人构图让观众同时看到施害者与"帮凶"
  selected_shot_pattern: 建立→测试→执行→揭示→凝固
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "呵。区区泡沫，也配挡本宫？"
      line_intent: 冷笑不服，用傲慢掩饰刚才的尴尬
      delivery_tone: 嘴角右侧不对称上挑，鼻腔轻"哼"
    - character_id: 场务
      dialogue_text: "……那个……士兰老师？您这场已经拍了八遍了……"
      line_intent: 尴尬到声音越来越小
      delivery_tone: 小心翼翼，尾音下坠
    - character_id: 士兰
      dialogue_text: "……你先把面咽下去再说话！"
      line_intent: 想骂人但又维持体面，嘴角抽搐
      delivery_tone: 咬牙切齿但音量克制
rhythm_continuity:
  intensity_progression: 4→5→6→6（社死峰值）
action_continuity: 爬→拍→笑→移→敲→点头→冲刺→撞→柱倒→场务现→对视
emotion_continuity: 困惑→冷笑不服→自信→震惊→社死尴尬
space_continuity: 士兰从Zone B左→Zone B右，纸板柱Zone B右倒地，场务暴露（Zone D局部）
audio_direction:
  music: 无BGM（干声段，让道具音效和表演驱动节奏）
  ambience: 冷宫环境低噪
  foley: C01拍灰三联"沙沙沙"递增→C02敲柱"咚咚咚"空洞纸板声递减→C03柱子倒地"啪嗒——"干瘪纸板声
  silence_or_pause: C04场务吸面后3秒完全凝固
  expressive_audio: 不启用卡通音效
  segment_audio_bridge_in: ←Seg2结尾无声，拍灰声打破静默
  segment_audio_bridge_out: C04凝固最后0.5秒→Seg4 D01撞桌"咔嚓"瞬间打破，0s切
storyboard_ref: 故事板提示词_pack_02_v2.md
storyboard_translation_rule:
  sequential_keyframe_reference: true
  preserve_storyboard_progression: true
  inbetween_motion_expansion: true
  readability_priority: true
  do_not_render_storyboard_artifacts: true
model_adaptation:
  preferred_prompt_density: 导演长版完整细节
  visual_reference_mode: 角色说明书板+场景道具总参考图+故事板Pack 02
  motion_control_focus: 纸板柱僵直倒下的物理+3秒凝固的微动作表演
  continuity_risk: 中（纸板柱倒地状态需跨Segment保持至Seg8）
reference_images: [角色说明书图片提示词_士兰_v1, master_scene_prop_reference_v1, 空间站位图提示词_v1, 故事板提示词_pack_02_v2]
shot_plan:
  - shot_id: C01
    related_vgu_id: VGU-02
    timecode_start: "00:20"
    timecode_end: "00:22.5"
    source_unit_id: U07
    shot_continuity:
      previous_left: Seg2 B04坐地
      current_picks_up: 从坐地爬起
      entry_state: 刚经历泡沫柱+便利贴
      core_action: 爬起→左肩拍灰→右肩拍灰→裙摆扫灰→盯泡沫柱冷笑
      exit_state: 站姿冷笑不服
      next_handoff: 转身→C02敲柱
      space_positioning: 士兰Zone A→站起后面向泡沫柱(Zone B左)
    visual_goal: 士兰从被动受害者变为主动试探者
    camera_direction: 中景，跟士兰从坐到站
    screen_positioning:
      subject_left_right: 士兰居中，泡沫柱在画面左侧背景
      facing_direction: 面北（对泡沫柱方向）
      depth_relation: 士兰前景→泡沫柱中景左
      axis_side: 南向北
    blocking_execution:
      default_positions: 士兰Zone A起身
      allowed_moves: 垂直站起+拍灰动作
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: 泡沫柱FP-01静止+FP-02便利贴可见
      in_shot_changes: 无
      closing_state: 同opening_state
      visible_evidence: 泡沫柱左侧背景，便利贴小黄点可辨
    performance_direction: 拍灰三联(左肩→右肩→裙摆)约2秒，动作节奏递增。盯泡沫柱后嘴角右侧不对称上挑冷笑
    audio_direction: 拍灰布料摩擦"沙沙沙"3下递增→打破Seg2延续的无声

  - shot_id: C02
    related_vgu_id: VGU-02
    timecode_start: "00:22.5"
    timecode_end: "00:25"
    source_unit_id: U08
    shot_continuity:
      previous_left: C01冷笑
      current_picks_up: 转身移向纸板柱
      entry_state: 不确定但自信回升
      core_action: 移向纸板柱→指节敲三下→停顿0.5s→满意点头
      exit_state: 确认"这是真柱子"
      next_handoff: 自信冲刺→C03撞柱
      space_positioning: 士兰从Zone B左移至Zone B右，纸板柱Zone B右
    visual_goal: 建立"这次稳了"的虚假安全感
    camera_direction: 中景，跟士兰横向移动，纸板柱在画面右侧
    screen_positioning:
      subject_left_right: 士兰画面偏左→移至偏右，纸板柱右侧
      facing_direction: 面北偏右（对纸板柱）
      depth_relation: 士兰中景→纸板柱右侧中景
      axis_side: 南向北
    blocking_execution:
      default_positions: 士兰Zone B右
      allowed_moves: 东西向横移至纸板柱前
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: 纸板柱CB-01正常外观
      in_shot_changes: CB-02敲击测试
      closing_state: CB-02→即将CB-03
      visible_evidence: 敲击动作，声音空洞清脆"咚咚咚"
    performance_direction: 敲柱三下每下间隔0.3秒，停顿0.5秒后满意点头，嘴角带"这次稳了"的笑
    audio_direction: 敲柱"咚咚咚"空洞纸板声→与之前泡沫柱的沉闷声形成对比

  - shot_id: C03
    related_vgu_id: VGU-02
    timecode_start: "00:25"
    timecode_end: "00:27.5"
    source_unit_id: U09
    shot_continuity:
      previous_left: C02满意点头
      current_picks_up: 自信冲刺撞纸板柱
      entry_state: 自信满满
      core_action: 冲刺→撞→柱子僵直向前倒下
      exit_state: 柱子在倒下过程中
      next_handoff: 柱完全倒地→C04场务暴露
      space_positioning: 士兰冲刺路径Zone B右→北，纸板柱倒向正北
    visual_goal: 第二次预期违背——敲起来像石头，撞起来像纸板
    camera_direction: 中景跟拍冲刺→固定拍摄柱倒
    screen_positioning:
      subject_left_right: 士兰从右方入画撞柱→柱倒向画面正前方（北）
      facing_direction: 冲刺向北，柱倒向北
      depth_relation: 士兰→纸板柱→后墙
      axis_side: 南向北
    blocking_execution:
      default_positions: 纸板柱Zone B右
      allowed_moves: 柱倒向北（正前方）
      forbidden_zones: 柱倒方向不可有人员
      crossing_rule: —
    prop_state_execution:
      opening_state: CB-02
      in_shot_changes: 撞击→CB-03倒地
      closing_state: CB-03不可逆
      visible_evidence: 柱如硬纸板僵直倒下，背面中空结构暴露
    performance_direction: 撞击前自信满满微笑→接触瞬间柱子没有弹性反馈→柱子开始倾斜时的疑惑→完全倒下后的"又来？？"
    audio_direction: 干瘪纸板倒地"啪嗒——"（与泡沫柱的橡胶声形成物理对比）

  - shot_id: C04
    related_vgu_id: VGU-02
    timecode_start: "00:27.5"
    timecode_end: "00:30"
    source_unit_id: U10
    shot_continuity:
      previous_left: C03柱倒下过程
      current_picks_up: 柱后场务暴露+双人对视
      entry_state: 场务正在吃泡面
      core_action: 场务抬头→面条挂嘴边→筷子悬空→3秒对视→吸面条
      exit_state: 士兰嘴角抽搐
      next_handoff: 社死愤怒→Seg4 D01撞桌(VGU-03)
      space_positioning: 纸板柱横在两人中间，场务Zone D局部暴露
    visual_goal: 首次确认"这是片场"——第三方围观加倍荒诞
    camera_direction: 中景双人构图，倒下的纸板柱横贯前景
    screen_positioning:
      subject_left_right: 场务在画面右侧（柱后），士兰在左侧
      facing_direction: 两人面对面
      depth_relation: 倒柱前景→场务中景右→士兰中景左→后墙远景
      axis_side: 东南→西北双向构图
    blocking_execution:
      default_positions: 场务Zone D边缘（工作推车旁），士兰Zone B右
      allowed_moves: 微动作（吸面、嘴角抽搐）
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: 纸板柱CB-03倒地
      in_shot_changes: 无
      closing_state: CB-03保持倒地
      visible_evidence: 倒柱横在画面中，背面中空，场务的泡面和工作推车可见
    performance_direction: 场务：身体微缩→筷子悬空→面条挂嘴边(面条微晃)→3秒凝固→吸面条慢动作"咻——"。士兰：嘴角抽搐→嘴微张想骂人但又体面→"你先把面咽下去！"
    audio_direction: 3秒完全凝固→吸面条"咻——"打破静默→场务声音越来越小→士兰咬牙切齿
```

### 导演长版正文 — Seg3

**Segment 3：卷土重来 | 00:20-00:30 | VGU-02 | C01-C04**

**C01 [00:20-00:22.5] 中景**
从Seg2的无声延续而来——拍灰的布料摩擦声打破了静默。士兰从坐地爬起来：左手撑地→右腿收→身体重心上移→站直。然后拍灰三联——左肩"沙"、右肩"沙"（声音略大）、裙摆"沙"（最大声），3个动作约2秒，节奏递增。她站直后盯着左侧的泡沫柱看了两秒，嘴角右侧不对称上挑——一个冷笑。鼻腔轻"哼"。泡沫柱在画面左侧背景，黄色便利贴仍可辨。她开口，语气傲慢："呵。区区泡沫，也配挡本宫？"

**C02 [00:22.5-00:25] 中景**
士兰转身，目光扫视四周，锁定右侧另一根更大的柱子——纸板柱。她走过去，伸出右手，弯曲指节，在柱面上敲了三下。"咚咚咚"——声音空洞清脆，和泡沫柱的沉闷声完全不同。敲完停顿0.5秒，她满意地点头，嘴角带着"这次稳了"的微笑。纸板柱正面涂装与泡沫柱相同——远看无法分辨。

**C03 [00:25-00:27.5] 中景跟拍→固定**
士兰后退几步，蓄力，冲刺。这次比第一次更自信——肩膀更挺，下巴微抬。慢镜头：她全速冲向纸板柱，面部带着确信。撞击——柱子没有任何弹性反馈。它像一块硬纸板一样，直挺挺地、僵直地向前倒下，没有晃动，没有弹回。"啪嗒——"干瘪的纸板倒地声。士兰跟着柱子一起向前踉跄了几步。

**C04 [00:27.5-00:30] 中景双人构图**
倒下的纸板柱横在画面下部前景。柱背面的中空结构完全暴露——而在柱后，场务小哥蹲在一辆工作推车旁，手里端着一碗泡面。他抬头，筷子夹着面条悬在半空，面条挂在嘴边微微晃动。空气凝固3秒。场务的眼神在士兰和泡面之间游移。然后他以慢动作把面条"咻——"地吸进嘴里。"……那个……士兰老师？您这场已经拍了八遍了……"声音越来越小。士兰嘴角抽搐，嘴微张——想骂人但又维持体面——"……你先把面咽下去再说话！"咬牙切齿但音量克制。3秒对视的最后一个0.5秒——然后0s切Seg4。

---

## Segment 4：快剪蒙太奇（00:30-00:40）

### segment_technical_control_block — Seg4

```yaml
segment_id: Seg4
timecode: "00:30-00:40"
duration_seconds: 10
beat_ref: B03a
beat_purpose: 快节奏堆叠笑点，制造"彻底崩溃"的荒诞感，为Seg5蹦床高潮建立"什么都是假的"的认知基线
primary_vgu_ids: [VGU-03]
covered_units: [U11, U12, U13, U14, U15, U16]
covered_shots: [D01, D02, D03, D04, D05, D06]
continuity_in: ←Seg3 C04社死凝固，0s切，静→爆切换
continuity_out: D06跳水预备俯冲动势→Seg5 E01俯冲落地，0s切，音乐连续
next_handoff: D06跳水pose身体挺直双臂上举→Seg5 E01头朝下俯冲
blocking_continuity:
  default_positions: 道具分布在Zone C前区（木桌/自动门/香炉/绿幕）
  allowed_moves: 士兰在各道具间快速移动
  forbidden_zones: Zone D不可见
  screen_side_lock: 泡沫柱左侧始终作为视觉参照
  axis_preservation_note: 主轴线不变
prop_state_continuity:
  opening_state: 桌子完整、门关闭、香炉充气、绿幕平整悬挂
  closing_state: 桌子碎裂、香炉瘪、绿幕散落地面
blocking_execution:
  D01: 士兰撞纸桌，桌子碎裂
  D02: 士兰冲自动门，门感应打开
  D03: 士兰撞充气香炉，香炉瘪
  D04-D05: 士兰撞绿幕，缠绕→挣脱
  D06: 士兰站Zone C中央，跳水预备pose
prop_state_execution:
  opening_state: 各道具初始状态
  in_segment_changes: 桌碎裂→门感应开→香炉瘪→绿幕GS-01→GS-03缠绕→散落
  closing_state: 绿幕散落地面，其他道具已毁
  visible_evidence: 各道具状态变化明显可见
dialogue_plan:
  has_dialogue: false
  no_dialogue_strategy: 全段无对白。由动作、道具音效、弹幕文字和BGM驱动。弹幕"道具组是不是没有预算""这宫里还有真东西吗"从画面右侧飘入
rhythm_continuity:
  intensity_progression: 8→8→8→8（快切峰值）→6→3（跳水静止）
action_continuity: 撞桌→冲门→撞香炉→撞绿幕→缠绕→挣脱→喘气→跳水预备
emotion_continuity: 暴躁→崩溃→荒诞→认真暂停
audio_direction:
  music: 快节奏喜剧BGM从D01撞桌瞬间切入(tempo~140bpm)→D06跳水预备切换为奥运主题铜管BGM
  foley: D01桌碎"咔嚓"→D02感应门"叮咚——欢迎光临"→D03香炉瘪"噗——"→D04绿幕脱落"哗啦——"→D05布料撕裂"嘶——"
  silence_or_pause: D06闭眼深呼吸的2秒（BGM保持但士兰无声）
  segment_audio_bridge_in: ←Seg3凝固最后0.5秒→撞桌"咔嚓"+喜剧BGM瞬间切入
  segment_audio_bridge_out: D06奥运BGM在跳水pose顶点保持→音乐连续跨越Seg4→Seg5边界
storyboard_ref: 故事板提示词_pack_02_v2.md
shot_plan:
  - shot_id: D01
    related_vgu_id: VGU-03
    timecode_start: "00:30"
    timecode_end: "00:31.5"
    shot_continuity:
      previous_left: Seg3 C04社死凝固
      current_picks_up: 士兰暴躁撞向木桌
      entry_state: 社死愤怒
      core_action: 撞木桌→桌如纸糊碎裂→木屑飞溅→踉跄穿过
      exit_state: 踉跄穿过碎桌
      next_handoff: →D02冲门
    visual_goal: 第三个道具失败——连桌子也是假的
    camera_direction: 中景，运动线+速度线贯穿画面
    screen_positioning:
      subject_left_right: 士兰从左冲入→撞桌→穿过
      facing_direction: 向北
      depth_relation: 士兰→桌→后墙
      axis_side: 南向北
    blocking_execution:
      default_positions: 木桌Zone C前区
      allowed_moves: 士兰穿过碎裂的桌子
    prop_state_execution:
      opening_state: 木桌完整
      in_shot_changes: 撞击→碎裂
      closing_state: 桌面裂成两半，木屑飞溅
      visible_evidence: 桌面断裂处露出纸板横截面
    performance_direction: 咬牙冲刺→撞击时用力过猛的表情→桌子碎时的意外→踉跄穿过时的狼狈
    audio_direction: "咔嚓"+喜剧快节奏BGM瞬间切入

  - shot_id: D02
    related_vgu_id: VGU-03
    timecode_start: "00:31.5"
    timecode_end: "00:33"
    shot_continuity:
      previous_left: D01穿过碎桌
      current_picks_up: 全速冲向厚重木门
      entry_state: 不信邪
      core_action: 冲向木门→撞前瞬间门自动感应滑开→人飞出画外
      exit_state: 双脚离地飞出门外
      next_handoff: →D03撞香炉
    camera_direction: 中景，门在画面中央，感应滑开的瞬间切士兰飞出
    screen_positioning:
      subject_left_right: 士兰冲向画面中央的门
      facing_direction: 向北冲
    blocking_execution:
      default_positions: 自动门Zone C前区
    prop_state_execution:
      opening_state: 门关闭
      in_shot_changes: 感应→自动滑开
      closing_state: 门全开
      visible_evidence: 门顶感应器红灯闪烁
    performance_direction: 全速冲刺→门开的瞬间脚下一滑→"哎？"的表情→身体水平飞出画外
    audio_direction: "叮咚——欢迎光临"（自动门电子提示音）

  - shot_id: D03
    related_vgu_id: VGU-03
    timecode_start: "00:33"
    timecode_end: "00:34.5"
    shot_continuity:
      previous_left: D02飞出门外
      current_picks_up: 头撞铜质香炉
      entry_state: 继续发泄
      core_action: 头撞香炉→香炉"噗"瘪掉→头栽进瘪香炉
      exit_state: 头卡在瘪香炉里，双臂乱挥
      next_handoff: →D04撞绿幕
    camera_direction: 中景
    screen_positioning:
      subject_left_right: 香炉居中，士兰从右侧撞入
    prop_state_execution:
      opening_state: 香炉充气饱满
      in_shot_changes: 撞击→"噗"瘪掉
      closing_state: 香炉塌成皱塑料堆
      visible_evidence: 香炉表面褶皱，充气阀门可见
    performance_direction: 头撞→香炉不是碎而是瘪→头栽进瘪香炉→双臂在炉外乱挥→拔出头满脸灰
    audio_direction: "噗——"（充气道具泄气声）

  - shot_id: D04
    related_vgu_id: VGU-03
    timecode_start: "00:34.5"
    timecode_end: "00:36"
    shot_continuity:
      previous_left: D03头卡香炉
      current_picks_up: 全速冲向鲜绿幕布侧墙
      entry_state: 越来越崩溃
      core_action: 撞绿幕→幕布从上沿脱落倾泻而下→缠绕全身→裹着滚3圈
      exit_state: 绿色人形布团在地面蠕动
      next_handoff: →D05挣脱
    camera_direction: 中景，幕布脱落用俯角强调布匹倾泻感，然后平跟滚3圈
    prop_state_execution:
      opening_state: GS-01平整悬挂
      in_shot_changes: GS-02被扯下→GS-03缠绕木乃伊
      closing_state: GS-03缠绕状态
      visible_evidence: 鲜绿幕布从顶沿脱落，包裹全身
    performance_direction: 冲刺撞入→幕布倾泻→被裹住的瞬间惊慌→滚3圈时天旋地转
    audio_direction: "哗啦——"幕布脱落+滚地的布料摩擦"沙沙沙"

  - shot_id: D05
    related_vgu_id: VGU-03
    timecode_start: "00:36"
    timecode_end: "00:38"
    shot_continuity:
      previous_left: D04绿色布团
      current_picks_up: 一只手从绿布里伸出
      entry_state: 被缠绕
      core_action: 手撕扯→头钻出→扯掉剩余布料
      exit_state: 披头散发站起
      next_handoff: →D06跳水预备
    camera_direction: 中景，从布团特写拉至全身
    screen_positioning:
      subject_left_right: 士兰从布团中央钻出
    prop_state_execution:
      opening_state: GS-03缠绕
      in_shot_changes: 挣脱
      closing_state: 绿布散落地面
    performance_direction: 手伸出挣扎→头钻出大口呼吸→脸通红→头发完全散乱→站起扯掉剩余绿布
    audio_direction: "嘶——"布料撕裂+士兰粗重喘息

  - shot_id: D06
    related_vgu_id: VGU-03
    timecode_start: "00:38"
    timecode_end: "00:40"
    shot_continuity:
      previous_left: D05挣脱站起
      current_picks_up: 披头散发站画面中央
      entry_state: 精疲力竭但眼神变了
      core_action: 闭眼深呼吸→睁眼（眼神清明决绝）→摆奥运跳水预备pose
      exit_state: 双臂上举身体挺直
      next_handoff: 向下俯冲动势→Seg5 E01 0s切
    visual_goal: 极度认真反而好笑——这是她的"认真时刻"
    camera_direction: 中景低角度微仰，单束冷白聚光(5000K)从上方45°打士兰
    screen_positioning:
      subject_left_right: 士兰居中
      facing_direction: 面北偏上
      depth_relation: 士兰前景聚光中→散落绿布地面→冷宫背景暗
    blocking_execution:
      default_positions: 士兰站Zone C中央
      allowed_moves: 双臂上举→身体挺直
    prop_state_execution:
      opening_state: 绿布散落地面
      in_shot_changes: 无
      closing_state: 同opening_state
    performance_direction: 闭眼深呼吸(胸腔可见起伏)→睁眼(眼神清明极度认真)→双臂缓缓上举→身体挺直→标准跳水预备姿势。"极度认真所以好笑"——不挤眉弄眼，是完全真诚的仪式感
    audio_direction: 喜剧BGM→奥运跳水铜管BGM"登登登登～"突然切入+单束聚光亮起
```

### 导演长版正文 — Seg4

**Segment 4：快剪蒙太奇 | 00:30-00:40 | VGU-03 | D01-D06**

**D01 [00:30-00:31.5] 中景**
从Seg3的3秒凝固0s切——士兰咬牙冲向木桌。桌子在接触瞬间"咔嚓"碎裂，木屑向四周飞溅，桌面从中间断成两半——横截面露出纸板夹层。士兰踉踉跄跄从碎桌中穿过。运动线和速度线贯穿画面。弹幕文字"道具组是不是没有预算"从画面右侧飘入。快节奏喜剧BGM在撞击瞬间同步切入。

**D02 [00:31.5-00:33] 中景**
士兰全速冲向一扇厚重的木门——在撞上前0.1秒，门顶感应器红灯闪烁，门自动滑开。"叮咚——欢迎光临"。士兰因为全速冲刺无法刹车，整个人水平飞出画外，双脚离地。弹幕"这宫里还有真东西吗"飘入。

**D03 [00:33-00:34.5] 中景**
士兰的头撞向铜质香炉——香炉不碎，而是"噗——"一声瘪了。它是充气道具——表面皱成塑料堆，充气阀门暴露。士兰的头栽进瘪掉的香炉里，双臂在炉外乱挥。拔出头时，满脸沾着灰——灰头土脸的喜剧效果。

**D04 [00:34.5-00:36] 中景**
士兰全速冲向侧墙——墙面是鲜绿色的幕布。撞击瞬间，幕布从上沿的固定夹脱落，整块布倾泻而下，像绿色瀑布一样盖住她。她裹着绿布在地上滚了三圈——变成一个人形绿色布团，四肢在里面挣扎蠕动。

**D05 [00:36-00:38] 中景（布团→全身）**
一只手从绿色布团里伸出来，然后是另一只——撕扯布料。士兰的头钻出来，大口喘气。脸通红，头发完全散乱，旗装皱褶密布。她站起，把剩余的绿布从身上扯掉。绿布散落在她脚下的地面上。她站在散落的道具残骸中央——碎桌、瘪香炉、绿布——像刚经历了一场灾难。

**D06 [00:38-00:40] 中景低角度微仰**
一束冷白聚光从上方45°打下，将士兰与周围的暖色烛火隔离。她站在画面正中央，披头散发，闭上眼，深呼吸——胸腔可见起伏。然后睁眼。眼神从混乱→清明→极度认真。她缓缓举起双臂，在空中划出弧线，双手在头顶合拢——一个标准的跳水预备姿势。身体挺直，下巴微抬。表情极度认真而真诚——正是这种真诚的认真，在满地道具残骸的背景下，形成强烈的反差。奥运铜管BGM"登登登登～"在聚光亮起的瞬间切入。画面在这个pose上保持——然后0s切Seg5。
```

---

## 可直接复制使用块 — Seg3

```
【全局前导】

将"故事板总板 Pack 02"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号、UI标注等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。泡沫柱Zone B左固定(已恢复静止)，纸板柱Zone B右，后墙正后方
- 角色锁定：士兰——圆润鹅蛋脸，杏眼柳叶眉，素白旗装(渐皱)，两把头。场务小哥——灰T恤+深色工装裤+工作证+单耳耳机+泡面碗
- 不重复角色、画面可读性优先、棚拍布景感贯穿
- 灯光：暖色烛火(2700K)+高窗月光冷补(5600K)，光比3:1
- 负向边界：不套用现代快剪、不现代化表演、冲击效果无害化

【Segment 3 技术控制块】

segment_id: Seg3 | timecode: 00:20-00:30
primary_vgu_ids: [VGU-02]
continuity_in: ←Seg2 B04坐地，0s切，无声桥接
continuity_out: 社死凝固→Seg4 D01暴躁撞桌，0s切
shot_continuity_refs: [C01, C02, C03, C04]
blocking_continuity: 泡沫柱Zone B左固定→士兰从Zone B左移至Zone B右→纸板柱Zone B右→C04场务暴露于Zone D局部
prop_state_continuity: 纸板柱CB-01→CB-03倒地(不可逆，保持至Seg8)
blocking_execution: C01爬起拍灰→C02横移敲柱→C03冲刺撞柱→C04双人对峙
prop_state_execution: 纸板柱CB-01→C03撞击→CB-03倒地→背面中空暴露场务
next_handoff: C04社死凝固最后0.5s→Seg4 D01撞桌"咔嚓"打破

【Segment 3 导演长版提示词】

Seg3 卷土重来 | 00:20-00:30 | VGU-02 | 4镜

[C01 00:20-00:22.5] 中景。士兰从坐地爬起→拍灰三联(左肩→右肩→裙摆,约2s节奏递增)→盯泡沫柱冷笑(嘴角右侧不对称上挑)+鼻腔轻"哼":"呵。区区泡沫，也配挡本宫？"泡沫柱左侧背景，便利贴可辨。拍灰布料"沙沙沙"打破Seg2延续的无声。

[C02 00:22.5-00:25] 中景。士兰转身扫视→锁定右侧更大纸板柱→走过去→指节敲三下(0.3s间隔)→"咚咚咚"空洞清脆声→停顿0.5s→满意点头，嘴角"这次稳了"的笑。

[C03 00:25-00:27.5] 中景跟拍→固定。士兰后退蓄力→冲刺(比第一次更自信，肩更挺下巴微抬)→慢镜头→撞击→柱如硬纸板僵直向前倒下(不晃不弹)→"啪嗒——"干瘪纸板声。士兰踉跄穿过柱倒的位置。

[C04 00:27.5-00:30] 中景双人构图。倒柱横在前景→柱后场务小哥蹲工作推车旁端泡面→抬头→面条挂嘴边晃动→筷子悬空→3秒凝固→慢动作吸面"咻——"→"那个……士兰老师？您这场已经拍了八遍了……"(声音渐小)→士兰嘴角抽搐:"……你先把面咽下去再说话！"(咬牙切齿克制)→最后一个0.5s→0s切Seg4。
```

---

## 可直接复制使用块 — Seg4

```
【全局前导】

将"故事板总板 Pack 02"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。道具分布在Zone C前区，泡沫柱左侧，纸板柱倒地状态保持
- 角色锁定：士兰(旗装渐皱→D05后头发完全散乱)
- 不重复角色、画面可读性优先、棚拍布景感贯穿
- 灯光：暖色烛火(2700K)+D06单束冷白聚光(5000K)隔离
- 负向边界：不套现代快剪碎片化、每个道具失败给0.5s亮相停顿

【Segment 4 技术控制块】

segment_id: Seg4 | timecode: 00:30-00:40
primary_vgu_ids: [VGU-03]
continuity_in: ←Seg3 C04社死凝固，0s切，静→爆切换
continuity_out: D06跳水预备俯冲动势→Seg5 E01俯冲，0s切，音乐连续
shot_continuity_refs: [D01, D02, D03, D04, D05, D06]
blocking_continuity: 士兰在Zone C前区各道具间快速移动
prop_state_continuity: 桌碎裂→门感应开→香炉瘪→绿幕GS-01→GS-03→散落
blocking_execution: D01撞桌→D02冲门→D03撞香炉→D04-D05撞幕挣脱→D06站Zone C中央跳水pose
prop_state_execution: 各道具依次破坏，绿幕最终散落地面
next_handoff: D06跳水pose双臂上举→Seg5 E01头朝下俯冲0s切

【Segment 4 导演长版提示词】

Seg4 快剪蒙太奇 | 00:30-00:40 | VGU-03 | 6镜

[D01 00:30-00:31.5] 中景。0s切。士兰咬牙撞木桌→桌"咔嚓"碎裂(纸板夹层横截面露出)→木屑飞溅→踉跄穿过。运动线+速度线贯穿。弹幕"道具组是不是没有预算"从右飘入。快节奏喜剧BGM(140bpm)同步切入。

[D02 00:31.5-00:33] 中景。士兰全速冲向厚重木门→撞前0.1s门感应滑开(红灯闪烁)→"叮咚——欢迎光临"→人无法刹车双脚离地水平飞出画外。弹幕"这宫里还有真东西吗"。

[D03 00:33-00:34.5] 中景。头撞铜质香炉→"噗——"瘪掉(充气道具)→头栽进瘪香炉双臂乱挥→拔出头满脸灰——灰头土脸喜剧效果。

[D04 00:34.5-00:36] 中景。全速冲向鲜绿幕布侧墙→幕布从上沿脱落倾泻如绿色瀑布→裹住全身→滚3圈→人形绿色布团在地上蠕动。

[D05 00:36-00:38] 中景(布团→全身)。手从绿布里伸出撕扯→头钻出大口喘气脸通红头发完全散乱→站起扯掉剩余绿布。绿布散落地面。士兰站道具残骸中央——碎桌+瘪香炉+散落绿布。

[D06 00:38-00:40] 中景低角度微仰。单束冷白聚光(5000K)从上方45°打下，与周围暖色烛火冷暖隔离。士兰居中，闭眼深呼吸(胸腔可见起伏)→睁眼(眼神清明极度认真)→双臂缓缓上举→双手头顶合拢→身体挺直→标准跳水预备pose。极度认真所以好笑。奥运铜管BGM"登登登登～"切入→pose保持→0s切Seg5。
```
