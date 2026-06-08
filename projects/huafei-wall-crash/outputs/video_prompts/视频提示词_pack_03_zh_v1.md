# 视频提示词 — Pack 03：弹飞→沉默→觉醒

覆盖 Seg5+Seg6（00:40-01:00），8镜，对应故事板 Pack 03，VGU-03+VGU-04。

---

## global_execution_preamble

将提供的"故事板总板 Pack 03"视为本段视频生成的**顺序视觉关键帧参考**，而非松散灵感图。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。

在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作。每个动作单元遵循：预备动作 → 发力 → 反应 → 收势。

本 Pack 覆盖全片节奏最高点到最低点的极速切换：
- Seg5（E01-E05）：蹦床弹飞8次——从惊恐→愤怒→认命→昏厥的完整崩溃弧线
- Seg6（F01-F03）：翻身极慢→仰躺独白（Hero Shot）→猛坐觉醒——全片情感呼吸点

关键姿势的电影化动作扩展原则：
- E01俯冲弹起：从跳水姿势垂直向下→地毯塌陷露出蹦床→第一次弹起的高弧线
- E02八次弹跳：每次弹跳的运动轨迹弧线→弹1-3四肢乱甩/弹4-6挣扎/弹7-8瘫软——姿态逐次降级
- E03表情插入：在弹跳运动中的三种表情快速切换——不是定格，是弹跳过程中的自然面部变化
- E04趴地→E05小鸟：从极限运动到突然静止→头顶VFX小鸟转圈（轻量卡通合成，屏幕模式70%不透明度）
- F01翻身：从脸朝地→极慢翻身仰面（2秒过渡），每个翻转都有重量感和疲惫感
- F02 Hero Shot：极俯拍长镜头——月光圆形聚光圈（直径约1.5m）打在她仰躺的身体上，白鸽剪影飞过高窗
- F03猛坐：从平躺→0.5秒触电式坐起——从极慢到极快的节奏反转

不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

## project_level_global_rules

**主场景空间锁定**：冷宫棚拍片场。泡沫柱Zone B左固定。蹦床区Zone C前区（初始被深红地毯覆盖→E01暴露→F01-F03画面边缘仍可见金属边框）。后墙正后方。纸板柱保持倒地（CB-03）。绿幕散落地面。

**角色重现锁定**：士兰——圆润鹅蛋脸，杏眼柳叶眉，素白旗装（延续Pack 02的皱褶+完全散乱头发）。本 Pack 新增：E05晕厥后眼睛旋涡状（仅此镜头允许轻量卡通化处理），F01-F02脸上干涸泪痕（从Seg1残留）。

**不重复角色**：同一镜头内不出现两个士兰。

**画面可读性优先**：动作清晰度、角色轮廓识别、空间稳定性、表演时机准确性。

**风格锁定（classic_studio_wuxia）**：棚拍布景感贯穿。Seg5蹦床弹跳为棚拍实拍物理效果（弹簧弹力网面），非CG卡通弹跳。Seg6极俯拍+单束月光+无BGM为棚拍静谧美学的极致运用。

**灯光锁定**：暖色烛火(2700K)+高窗月光冷补(5600K)。E01地毯塌陷处透出冷白LED光（来自蹦床下方空间暗示）。F02月光圆形聚光(直径1.5m,5600K)与周围暖色形成冷暖隔离。白鸽剪影纯黑半透明(40% opacity)。

**负向边界**：所有冲击效果保持无害化非写实表现。蹦床弹跳为弹簧物理，不将角色身体进行卡通形变。E05小鸟星星VFX为棚拍后期合成叠层（金色半透明），不进入角色身体变形逻辑。镜头语言只服务叙事和动作可读性。

---

## Segment 5：蹦床弹飞（00:40-00:50）

### segment_technical_control_block — Seg5

```yaml
segment_id: Seg5
timecode: "00:40-00:50"
duration_seconds: 10
beat_ref: B03b
beat_purpose: Segment 3-4笑点密度的最终释放，蹦床是道具清单的压轴
primary_vgu_ids: [VGU-03]
covered_units: [U17, U18, U19, U20]
covered_shots: [E01, E02, E03, E04, E05]
continuity_in: ←Seg4 D06跳水预备俯冲动势，0s切，音乐连续
continuity_out: E05趴地小鸟→Seg6 F01翻身仰面，极慢动作过渡(2s)，节奏9→1紧急复位
next_handoff: E05脸朝地趴地→Seg6 F01极慢翻身（动势从0开始）
blocking_continuity:
  default_positions: 蹦床Zone C前区（深红地毯下），泡沫柱Zone B左
  allowed_moves: 士兰垂直弹跳运动（上下），蹦床位置固定
  forbidden_zones: —
  crossing_rule: —
  screen_side_lock: 泡沫柱左侧
  axis_preservation_note: 主轴线不变
prop_state_continuity:
  opening_state: TB-01地毯覆盖隐藏
  closing_state: TB-04暴露状态（边框+弹力网面可见）
blocking_execution:
  E01: 士兰头朝下俯冲Zone C前区→地毯塌陷TB-02
  E02: 8次弹跳在Zone C前区垂直运动
  E03: 面部近景插入（弹跳中）
  E04-E05: 第8次弹跳后趴地Zone C前区→静止
prop_state_execution:
  opening_state: TB-01地毯覆盖
  in_segment_changes: TB-02触发→TB-03持续弹跳8次→TB-04暴露
  closing_state: TB-04不可逆（地毯撕裂角+金属边框+弹力网面可见）
  visible_evidence: E01地毯塌陷处→E02-E05撕裂地毯边+蹦床金属边框→暴露的黑色弹力网面
expressive_animation_inheritance:
  enabled: false
  note: 蹦床弹跳为真实弹簧物理，E05小鸟星星VFX为棚拍后期合成叠层（仅此镜头允许轻量卡通化）
cinematic_language_inheritance:
  camera_language: 俯拍→全景侧面→近景插入→中近景俯拍→近景俯拍
  visual_motivation: 先俯拍建立弹跳的空间锚点→侧全景展示弹跳弧线和姿态变化→面部插入捕捉情绪→俯拍收束到静止
  selected_shot_pattern: 极限运动→逐次降级→突然静止的物理收束
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "啊——啊——够了——放我下来——谁放的蹦床——"
      line_intent: 从惊恐→愤怒→认命的三阶段叫喊
      delivery_tone: 弹1-3高音尖叫→弹4-6低音怒吼→弹7-8无力"放我下来…"
      pacing_or_pause: 每次弹跳的顶点或落点喊出，弹8次时无声
rhythm_continuity:
  intensity_progression: 9→9→9→5→3（从极限起→逐次降→静止收）
  edit_rhythm: E01冲击起→E02-E03高频弹跳→E04急停→E05静止+小鸟
action_continuity: 俯冲→弹起→弹飞8次→趴地→小鸟晕
emotion_continuity: 惊恐→愤怒→认命→昏厥
space_continuity: Zone C前区（蹦床位置），泡沫柱左侧参照不变
audio_direction:
  music: 奥运铜管BGM持续（从Seg4延续），每次弹跳加入滑稽变调(pitch bend下滑)
  foley: E01地毯塌陷"噗"→E02蹦床弹簧"boing-boing"×8次，每次音高递减半音(C5→C3)→E04落地闷响→E05小鸟"啾啾啾～"
  dialogue: 弹跳喊叫叠加(高音尖叫→低音怒吼→无力)
  silence_or_pause: E04趴地后2秒无声→小鸟叫声打破
  segment_audio_bridge_in: ←Seg4 D06奥运BGM+跳水pose保持→音乐连续跨越边界
  segment_audio_bridge_out: E05小鸟最后一声"啾"→0.5s无声→Seg6 F01翻身衣料摩擦声(极轻极慢)
storyboard_ref: 故事板提示词_pack_03_v2.md
shot_plan:
  - shot_id: E01
    related_vgu_id: VGU-03
    timecode_start: "00:40"
    timecode_end: "00:42.5"
    shot_continuity:
      previous_left: Seg4 D06跳水预备pose
      current_picks_up: 标准跳水姿势头朝下俯冲
      entry_state: 极度认真、闭眼
      core_action: 头朝下俯冲→深红地毯塌陷→露出黑色蹦床网面→身体弹起
      exit_state: 第一次弹跳高弧线，四肢张开
      next_handoff: →E02八次弹跳
    visual_goal: 最认真的跳水姿势遇到最荒诞的结果
    camera_direction: 中景俯拍（从上方垂直向下拍摄蹦床区域）
    screen_positioning:
      subject_left_right: 士兰头顶朝下在画面中央
      facing_direction: 垂直向下
      depth_relation: 士兰→地毯(即将塌陷)→蹦床网面(即将暴露)
    blocking_execution:
      default_positions: 蹦床Zone C前区
      allowed_moves: 垂直向下→弹起向上
    prop_state_execution:
      opening_state: TB-01地毯覆盖
      in_shot_changes: 俯冲→TB-02地毯塌陷→蹦床触发
      closing_state: TB-02→TB-03弹跳中
      visible_evidence: 地毯塌陷处露出黑色弹力网面+金属边框一角
    performance_direction: 标准跳水姿势头朝下→闭眼→嘴角一丝"终于解脱"的放松→然后弹起来了——眼睛突然睁开惊恐
    audio_direction: 地毯塌陷"噗"+蹦床弹簧"boing"+奥运BGM保持

  - shot_id: E02
    related_vgu_id: VGU-03
    timecode_start: "00:42.5"
    timecode_end: "00:45.5"
    shot_continuity:
      previous_left: E01第一次弹起
      current_picks_up: 8次弹跳全过程
      entry_state: 惊恐
      core_action: 弹跳8次，每次高度递减，姿态从乱甩→挣扎→瘫软
      exit_state: 第8次即将落下
      next_handoff: →E03面部近景插入
    visual_goal: 蹦床弹跳的完整运动弧线+姿态降级过程
    camera_direction: 全景侧面（东西侧拍摄南北向弹跳弧线），运动轨迹弧线可见
    screen_positioning:
      subject_left_right: 士兰空中居中
      facing_direction: 弹跳上下，侧面视角
    blocking_execution:
      default_positions: 垂直弹跳Zone C前区
      allowed_moves: 上下弹跳8次
    prop_state_execution:
      opening_state: TB-03弹跳中
      in_shot_changes: 8次弹跳高度递减
      closing_state: 即将TB-04暴露
      visible_evidence: 弹1-3高弧线→弹4-6中弧线→弹7-8低弧线
    performance_direction: 弹1-3:惊恐乱甩、眼圆睁嘴大张。弹4-6:愤怒挣扎、咬牙眉紧锁四肢甩动有对抗。弹7-8:认命瘫软、不再挣扎四肢自然下垂、嘴紧闭
    audio_direction: 蹦床"boing"×8次，每次音高递减半音(C5→C3)。弹1-3响亮→弹4-6渐弱→弹7-8沉闷。士兰喊叫随弹跳叠加。奥运BGM持续+每次弹跳pitch bend下滑

  - shot_id: E03
    related_vgu_id: VGU-03
    timecode_start: "00:45.5"
    timecode_end: "00:47"
    shot_continuity:
      previous_left: E02弹跳中
      current_picks_up: 弹跳过程中的面部近景
      entry_state: 弹跳中
      core_action: 三种表情在弹跳中快速切换
      exit_state: 认命表情
      next_handoff: →E04趴地
    visual_goal: 紧贴面部的情绪捕捉，让观众看到每一次弹跳的心理变化
    camera_direction: 面部近景插入，镜头随弹跳微震
    screen_positioning:
      subject_left_right: 面部居中
      facing_direction: 正面
    performance_direction: 恐惧(眼圆睁嘴大张)→愤怒(咬牙眉紧锁鼻孔张)→认命(眼半闭嘴紧闭)，非定格而是在弹跳中自然过渡
    audio_direction: 喊叫叠加在BGM上

  - shot_id: E04
    related_vgu_id: VGU-03
    timecode_start: "00:47"
    timecode_end: "00:48.5"
    shot_continuity:
      previous_left: E03面部
      current_picks_up: 第8次弹跳后脸朝下趴地
      entry_state: 弹跳结束
      core_action: 脸朝下趴地→四肢大张海星状→静止2秒
      exit_state: 趴地静止
      next_handoff: →E05小鸟特效
    visual_goal: 从极限运动到突然静止的物理收束
    camera_direction: 中近景俯拍（从上方垂直向下）
    screen_positioning:
      subject_left_right: 士兰趴地居中，四肢大张
    blocking_execution:
      default_positions: 趴地Zone C前区
    prop_state_execution:
      opening_state: TB-03弹跳结束
      in_shot_changes: →TB-04暴露
      closing_state: TB-04
      visible_evidence: 撕裂地毯边缘+蹦床金属边框+黑色弹力网面完全可见
    performance_direction: 趴地2秒完全静止，旗装如白花铺开在地面
    audio_direction: 落地闷响→2秒无声

  - shot_id: E05
    related_vgu_id: VGU-03
    timecode_start: "00:48.5"
    timecode_end: "00:50"
    shot_continuity:
      previous_left: E04趴地静止
      current_picks_up: VFX叠加+晕厥
      entry_state: 静止2秒后
      core_action: 头顶出现金色小鸟转圈+小星星→眼睛旋涡状
      exit_state: 昏厥（仅是昏过去）
      next_handoff: 趴地姿势→Seg6 F01翻身仰面（极慢动作2s过渡）
    visual_goal: 轻量卡通化收束——仅此镜头允许
    camera_direction: 近景俯拍头部，VFX叠层（金色半透明，screen模式70%不透明度）
    screen_positioning:
      subject_left_right: 头顶居中
    prop_state_execution:
      opening_state: TB-04暴露
      closing_state: TB-04
    performance_direction: 眼睛旋涡状（仅此镜头允许轻微卡通化），小鸟绕圈+星星闪烁为合成VFX
    audio_direction: 小鸟清脆"啾啾啾～"(与前面混乱形成反差)→最后一声"啾"→0.5s无声→过渡到Seg6
```

### 导演长版正文 — Seg5

**Segment 5：蹦床弹飞 | 00:40-00:50 | VGU-03 | E01-E05**

**E01 [00:40-00:42.5] 中景俯拍**
从Seg4 D06的跳水预备pose 0s切——奥运BGM连续跨越边界。士兰以一个极其标准的跳水姿势，双臂紧贴耳侧，身体挺直呈流线型，头朝下，向地面俯冲。她的眼睛闭着，面部肌肉松弛——嘴角有一丝"终于解脱"的放松。然后在接触地面的瞬间——深红地毯塌陷下去，露出下方黑色的蹦床弹力网面和金属边框的一角。她的身体没入塌陷处，然后被弹力网面弹起——第一次弹跳画出一条高弧线，四肢在弹起的瞬间张开。撕裂的地毯边角翘起。塌陷处缝隙透出冷白LED光（来自蹦床下方空间）。

**E02 [00:42.5-00:45.5] 全景侧面**
侧面全景拍摄，镜头固定。士兰在空中上下弹跳，每次弹跳的运动轨迹弧线在画面中清晰可见。弹跳8次，每次高度递减约15%：
- 弹1-3：高弧线，四肢在空中滑稽乱甩——眼睛圆睁，嘴大张，裙摆上下翻飞
- 弹4-6：中弧线，四肢开始有对抗性的挣扎——咬牙，眉紧锁，鼻孔张开，"够了！""放我下来！"
- 弹7-8：低弧线，不再挣扎——四肢自然下垂，表情空洞，嘴紧闭
蹦床弹簧"boing-boing"声每次音高递减半音（从C5→C3），奥运BGM在每次弹跳时做pitch bend下滑变调。士兰的喊叫从高音尖叫→低音怒吼→无力的"放我下来…"叠加在BGM上。

**E03 [00:45.5-00:47] 面部近景插入**
切到面部近景。镜头随弹跳微震。三种表情在弹跳过程中快速自然切换——不是定格切换，而是面部肌肉在弹跳颠簸中的连续变形：恐惧（眼圆睁、嘴大张）→愤怒（咬牙、眉紧锁、鼻孔扩张）→认命（眼半闭、嘴紧闭、面部肌肉全部松弛）。

**E04 [00:47-00:48.5] 中近景俯拍**
第8次弹跳后，士兰脸朝下趴在地上。四肢大张呈海星状。完全静止2秒。撕裂的地毯边缘，蹦床的黑色金属边框和弹力网面完全暴露。素白旗装像一朵白花铺开在深红地毯和黑色网面之间。落地闷响→2秒无声。

**E05 [00:48.5-00:50] 近景俯拍头部**
VFX叠加：一圈金色卡通小鸟绕着她的头顶转圈飞行，伴有小星星闪烁——这些为棚拍实拍+后期合成叠层（金色半透明，screen模式70%不透明度）。她的眼睛变成旋涡状（仅此镜头允许轻微卡通化处理）。小鸟叫声"啾啾啾～"清脆轻快，与前面的混乱形成强烈反差。仅是昏过去，不是受伤。小鸟最后一声"啾"→0.5秒无声→极慢过渡到Seg6翻身。

---

## Segment 6：短暂沉默（00:50-01:00）

### segment_technical_control_block — Seg6

```yaml
segment_id: Seg6
timecode: "00:50-01:00"
duration_seconds: 10
beat_ref: B04
beat_purpose: emotional_breather——全片唯一正经时刻，让笑声卡在喉咙里，证明喜剧内核是悲剧
primary_vgu_ids: [VGU-04]
covered_units: [U21, U22, U23]
covered_shots: [F01, F02, F03]
continuity_in: ←Seg5 E05趴地，极慢动作过渡(2s)，节奏9→1紧急复位，BGM骤停
continuity_out: 猛坐起动势→Seg7 G01移步外墙，0s切，空间切换+冷暖桥接
next_handoff: F03猛坐起（0.5s触电式）→Seg7 G01移步外墙（动作爆发衔接空间切换）
blocking_continuity:
  default_positions: 士兰从Zone C前区翻身→躺Zone C中央→坐起
  allowed_moves: 翻身→仰躺→猛坐
  forbidden_zones: —
  screen_side_lock: 泡沫柱Zone B左（F03画面左侧可见）
  eye_line_rule: F02视线向房梁（上方）→F03视线变清亮（锁定目标方向）
  axis_preservation_note: F02极俯拍打破此前所有角度→F03跳切回平视
prop_state_continuity:
  opening_state: 蹦床TB-04暴露（F01-F03画面边缘仍可见金属边框）
  closing_state: TB-04保持暴露
blocking_execution:
  F01: 从Zone C前区趴地→极慢翻身仰面
  F02: 仰躺Zone C中央→望房梁
  F03: 从躺→猛坐起（0.5s触电式）
prop_state_execution:
  opening_state: TB-04暴露（趴地位置在蹦床旁）
  in_segment_changes: 翻身至旁边地面（离开蹦床区域）
  closing_state: TB-04画面边缘可见
  visible_evidence: 撕裂地毯+蹦床边框在F01-F03画面边缘
expressive_animation_inheritance:
  enabled: false
cinematic_language_inheritance:
  camera_language: 中景极慢运动→极俯拍长镜(Hero Shot)→中景平视跳切
  visual_motivation: F01极慢运动让观众从混乱中"着陆"→F02极俯拍让观众以上帝视角看她的渺小→F03跳切平视是她觉醒的节奏信号
  selected_shot_pattern: 慢→静止→跳切（classic_studio_wuxia"亮相"的觉醒版）
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "士兰争了一辈子。争恩宠，争地位，争一口气。到头来，连一面真的墙……都争不到。"
      line_intent: 全片灵魂台词——喜剧中的悲剧内核
      delivery_tone: 极平淡，不煽情。每句间停顿1-1.5秒。像在和空气说话
    - character_id: 士兰
      dialogue_text: "不对。冷宫。冷宫的墙，一定是真的。那地方没人愿意去，道具组肯定懒得布置。"
      line_intent: 从绝望中抓住最后一根稻草——逻辑荒谬但情感真实
      delivery_tone: 语调突然变快变亮，眼睛重新燃起火苗
rhythm_continuity:
  intensity_progression: 1→1→1（极慢谷底）→3（觉醒跳切）
  edit_rhythm: F01极慢运动→F02极俯拍长镜全片最长镜头→F03跳切平视0.5s爆发
action_continuity: 翻身→仰躺→望梁→鸽子飞过→独白→猛坐
emotion_continuity: 空洞→心酸→觉醒
space_continuity: 冷宫地板（Zone C区域），泡沫柱F03左侧可见
audio_direction:
  music: 完全无BGM——全片唯一没有配乐的段落
  ambience: 极轻空调低频嗡声（片场环境），远处模糊人声"泡沫柱子谁准备的…""蹦床谁放那里的…"（如来自另一个世界）
  foley: F01翻身衣料极轻摩擦→F02鸽子翅膀扑棱"咕咕～"→F03猛坐衣物锐利摩擦"唰——"
  dialogue: 独白干声无配乐，每句间自然停顿1-1.5s
  silence_or_pause: "争不到"之后1.5秒完全静止
  segment_audio_bridge_in: ←Seg5小鸟最后一声→0.5s无声→翻身衣料摩擦(极轻极慢)
  segment_audio_bridge_out: F03"唰"的尾声→史诗交响BGM极弱起(ppp,弦乐泛音)→Seg7 G01夕阳石墙画面淡入
hero_moment_candidates: [H02]
ending_payoff_hook: "连一面真的墙都争不到"→为B05"找真墙"种下动机
opening_anchor_reference: AF-07（翻身慢动作）
closing_anchor_reference: AF-08（猛坐起平视）
storyboard_ref: 故事板提示词_pack_03_v2.md
shot_plan:
  - shot_id: F01
    related_vgu_id: VGU-04
    timecode_start: "00:50"
    timecode_end: "00:53.5"
    shot_continuity:
      previous_left: Seg5 E05趴地
      current_picks_up: 脸朝地趴→极慢翻身仰面
      entry_state: 刚经历所有道具失败，精疲力竭
      core_action: 从脸朝地→缓慢翻身至仰面（约2秒），每个翻转有重量感和疲惫
      exit_state: 仰面躺地，手臂自然摊开
      next_handoff: →F02极俯拍Hero Shot
    visual_goal: 从极限混乱到绝对静止的过渡镜头——让观众"着陆"
    camera_direction: 中景极慢运动，镜头缓慢跟随翻身动作
    screen_positioning:
      subject_left_right: 士兰从趴→翻身→仰面居中
      depth_relation: 士兰前景→撕裂地毯+蹦床边框画面边缘→冷宫后墙远景
    blocking_execution:
      default_positions: Zone C前区→翻身至旁边地面
      allowed_moves: 翻身仰面极慢动作
    performance_direction: 翻身极慢——先睫毛微颤(1秒)→眼皮抬起一半(1秒)→完全睁开(1秒)。翻身动作沉重疲惫，每次翻转约1秒。手臂自然摊开
    audio_direction: 翻身衣料摩擦极轻极慢→BGM全部消失→环境低频嗡声+远处模糊人声

  - shot_id: F02
    related_vgu_id: VGU-04
    timecode_start: "00:53.5"
    timecode_end: "00:58"
    shot_continuity:
      previous_left: F01翻身仰面
      current_picks_up: 极俯拍天花板垂直向下
      entry_state: 仰面躺地
      core_action: 仰躺望房梁→独白→鸽子飞过
      exit_state: 独白完成，眼神从空洞→微动
      next_handoff: →F03猛坐
    visual_goal: ★HERO SHOT★——全片最长最安静的镜头，全片情感呼吸点
    camera_direction: 极俯拍（天花板高度垂直向下），一道月光形成圆形聚光(直径约1.5m)打在士兰脸上和身上，白鸽剪影从高窗飞过（纯黑半透明40% opacity）
    screen_positioning:
      subject_left_right: 士兰居中仰躺，手臂如翅膀摊开
      facing_direction: 正面朝上
      depth_relation: 月光聚光圈→士兰→地板→周围暗色
    blocking_execution:
      default_positions: 仰躺Zone C中央
    performance_direction: 表情空洞平静——眼望房梁但眼神失焦，不在看任何具体东西。干涸泪痕在月光下微亮（从Seg1残留）。独白语调平淡不煽情，每句间停顿1-1.5秒。"争不到"之后1.5秒完全静止
    audio_direction: 无BGM。鸽子翅膀扑棱+清脆"咕咕～"打破绝对静默。独白干声无配乐。远处模糊人声"泡沫柱子谁准备的…""蹦床谁放那里的…"

  - shot_id: F03
    related_vgu_id: VGU-04
    timecode_start: "00:58"
    timecode_end: "01:00"
    shot_continuity:
      previous_left: F02极俯拍长镜
      current_picks_up: 从F02俯拍突然跳切至平视
      entry_state: 刚完成独白
      core_action: 从平躺→猛地坐起（0.5秒触电式）
      exit_state: 坐姿，眼神清亮
      next_handoff: 坐起动势→Seg7 G01移步外墙
    visual_goal: 觉醒的节奏信号——从极慢到极快的反转
    camera_direction: 中景平视（从F02俯拍突然跳切），泡沫柱在画面左侧可见
    screen_positioning:
      subject_left_right: 士兰居中偏右（坐起后偏上），泡沫柱左侧背景
      facing_direction: 面北偏上（锁定目标方向）
    blocking_execution:
      default_positions: 士兰从躺→坐Zone C
      allowed_moves: 猛坐起0.5秒爆发
    performance_direction: 从平躺→猛坐起0.5秒完成，像触电一样。头发向前甩。眼神瞬间从空洞→清亮凌厉，燃起新的火光。"不对。冷宫。冷宫的墙，一定是真的。"语调突然变快变亮
    audio_direction: 衣物锐利摩擦"唰——"(打破寂静的最强音)→史诗BGM极弱起(ppp,弦乐泛音)→过渡到Seg7
```

### 导演长版正文 — Seg6

**Segment 6：短暂沉默 | 00:50-01:00 | VGU-04 | F01-F03**

**F01 [00:50-00:53.5] 中景极慢运动**
从Seg5 E05的趴地——0.5秒无声后——以极慢动作开始翻身。士兰从脸朝地缓慢翻身至仰面，整个过程约2秒。睫毛先微颤(1秒)→眼皮抬起一半(1秒)→完全睁开(1秒)。翻身的每个动作都有重量感和疲惫感——像连翻身都很累。翻到仰面后，手臂自然摊开，像翅膀一样放在身体两侧。所有BGM消失——仅剩极轻的空调低频嗡声（片场环境音），远处有模糊的人声："泡沫柱子谁准备的……""蹦床谁放那里的……"——像来自另一个世界的声音。撕裂地毯边缘和蹦床金属边框在画面边缘仍可见（承接连贯性）。这是全片节奏从9紧急复位到1的过渡镜头。

**F02 [00:53.5-00:58] 极俯拍长镜 ★HERO SHOT★**
天花板高度垂直向下俯拍。一道月光从高窗形成圆形聚光圈（直径约1.5m，色温5600K），精准地打在士兰仰躺的脸上和身上。周围全部是暗色——只有聚光圈内是亮的。士兰手臂如翅膀摊开，旗装如花瓣铺在地面。表情空洞而平静——眼望房梁但眼神失焦，不在看任何具体的东西。脸上有道干涸的泪痕（从Seg1残留），在月光下微微发亮。一只白鸽的剪影从高窗前飞过（纯黑，半透明，40%不透明度）。翅膀扑棱的声音"咕咕～"清脆地打破绝对静默——这是本段唯一主动的声音。然后士兰开口，语调出奇的平淡，不煽情，每句话之间自然停顿1-1.5秒："士兰争了一辈子。争恩宠，争地位，争一口气。到头来，连一面真的墙……都争不到。"——"争不到"之后1.5秒完全静止。全片最长最安静的镜头。全片情感呼吸点。

**F03 [00:58-01:00] 中景平视跳切**
从极俯拍突然跳切至平视——节奏信号：觉醒。士兰从平躺的状态猛地坐起来——整个动作0.5秒完成，像触电一样锐利。头发向前甩动。她的眼神瞬间从空洞变为清亮凌厉，燃起了新的火光。泡沫柱在她左侧背景中可见（空间锚定）——"不对。"语调突然变快变亮。"冷宫。冷宫的墙，一定是真的。那地方没人愿意去，道具组肯定懒得布置。"衣物锐利的摩擦声"唰——"是打破寂静的最强音。在这个"唰"的尾声——史诗交响BGM从极弱起(ppp，仅弦乐泛音)——音乐淡入过渡到Seg7。
```

---

## 可直接复制使用块 — Seg5

```
【全局前导】

将"故事板总板 Pack 03"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。泡沫柱Zone B左，蹦床Zone C前区(深红地毯→暴露)，后墙正后方
- 角色锁定：士兰(旗装皱褶+头发散乱+E05眼睛旋涡仅此镜头轻卡通化)
- 不重复角色、画面可读性优先、棚拍布景感贯穿
- 灯光：暖色烛火(2700K)+E01塌陷处冷白LED光+E05 VFX金色半透明叠层(screen模式70%)
- 负向边界：蹦床弹跳为真实弹簧物理不卡通形变、冲击效果无害化、小鸟星星为棚拍后期合成

【Segment 5 技术控制块】

segment_id: Seg5 | timecode: 00:40-00:50
primary_vgu_ids: [VGU-03]
continuity_in: ←Seg4 D06跳水预备俯冲动势，0s切，音乐连续
continuity_out: E05趴地→Seg6 F01翻身仰面，极慢动作过渡(2s)，节奏9→1复位
shot_continuity_refs: [E01, E02, E03, E04, E05]
blocking_continuity: 蹦床Zone C前区垂直弹跳运动
prop_state_continuity: TB-01→TB-02→TB-03(8次弹跳)→TB-04暴露(不可逆)
blocking_execution: E01俯冲→E02-E03弹跳8次→E04-E05趴地静止
prop_state_execution: 地毯覆盖→塌陷→弹跳→暴露(撕裂边+金属框+弹力网面)
next_handoff: E05脸朝地趴→Seg6 F01翻身(极慢2s过渡)

【Segment 5 导演长版提示词】

Seg5 蹦床弹飞 | 00:40-00:50 | VGU-03 | 5镜

[E01 00:40-00:42.5] 中景俯拍。0s切。士兰标准跳水姿势头朝下俯冲→闭眼嘴角放松→接触地面→深红地毯塌陷→露出黑色蹦床弹力网面+金属边框→身体弹起高弧线四肢张开。塌陷缝隙透出冷白LED光。地毯塌陷"噗"+弹簧"boing"。

[E02 00:42.5-00:45.5] 全景侧面。8次弹跳弧线清晰。弹1-3高弧惊恐乱甩→弹4-6中弧愤怒挣扎→弹7-8低弧瘫软认命。每次高度递减约15%。弹簧"boing"×8次音高递减C5→C3。喊叫从尖叫→怒吼→无力。奥运BGM每跳pitch bend下滑。

[E03 00:45.5-00:47] 面部近景插入。镜头随弹微震。三种表情在弹跳颠簸中连续切换：恐惧(眼圆睁嘴大张)→愤怒(咬牙眉紧锁)→认命(眼半闭嘴紧闭)。

[E04 00:47-00:48.5] 中近景俯拍。第8次后脸朝地趴，四肢大张海星状。静止2秒。撕裂地毯+金属边框+弹力网面完全暴露。旗装如白花铺开。落地闷响→2秒无声。

[E05 00:48.5-00:50] 近景俯拍头部。VFX叠层：金色小鸟转圈+小星星闪烁(半透明screen模式70%)。眼睛旋涡状(仅此镜头轻卡通化)。小鸟"啾啾啾～"清脆。仅是昏过去。最后一声"啾"→0.5s无声→极慢过渡Seg6。
```

---

## 可直接复制使用块 — Seg6

```
【全局前导】

将"故事板总板 Pack 03"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。泡沫柱Zone B左(F03可见)，蹦床TB-04暴露(画面边缘可见)
- 角色锁定：士兰(旗装皱褶+头发散乱+干涸泪痕)
- 不重复角色、画面可读性优先、棚拍布景感贯穿
- 灯光：暖色烛火(2700K)+F02月光聚光圈(直径1.5m,5600K)冷暖隔离+白鸽剪影纯黑半透明(40%)
- 负向边界：无卡通形变、无BGM为有意静默、冲击效果无害化

【Segment 6 技术控制块】

segment_id: Seg6 | timecode: 00:50-01:00
primary_vgu_ids: [VGU-04]
continuity_in: ←Seg5 E05趴地，极慢动作过渡(2s)，节奏9→1紧急复位
continuity_out: F03猛坐起动势→Seg7 G01移步外墙，0s切+空间切换+冷暖桥接
shot_continuity_refs: [F01, F02, F03]
blocking_continuity: 士兰从Zone C前区翻身→仰躺Zone C中央→猛坐
prop_state_continuity: TB-04暴露保持(F01-F03画面边缘可见金属边框)
blocking_execution: F01趴地翻身(极慢)→F02仰躺望梁(静止长镜)→F03猛坐(0.5s爆发)
prop_state_execution: 士兰从蹦床旁翻身至旁边地面→TB-04画面边缘保持可见
next_handoff: F03猛坐起→Seg7 G01移步外墙(动作爆发衔接空间切换)

【Segment 6 导演长版提示词】

Seg6 短暂沉默 | 00:50-01:00 | VGU-04 | 3镜 ★HERO SHOT★

[F01 00:50-00:53.5] 中景极慢运动。从Seg5趴地→0.5s无声→极慢翻身仰面(约2s)。睫毛微颤(1s)→眼皮半抬(1s)→全睁(1s)。每个翻转有重量疲惫感。手臂自然摊开。所有BGM消失。仅空调低频嗡+远处模糊人声"泡沫柱子谁准备的…""蹦床谁放那里的…"。节奏9→1紧急复位。

[F02 00:53.5-00:58] ★HERO SHOT★ 极俯拍长镜。天花板垂直向下。月光圆形聚光(直径1.5m,5600K)打脸上身上。周围全暗。士兰手臂如翅膀摊开，眼望房梁但失焦。干涸泪痕月光下微亮。白鸽剪影飞过高窗(纯黑半透明40%)→"咕咕～"打破静默。独白平淡不煽情每句间停顿1-1.5s："士兰争了一辈子。争恩宠，争地位，争一口气。到头来，连一面真的墙……都争不到。"——"争不到"后1.5s完全静止。全片最长最安静镜头。

[F03 00:58-01:00] 中景平视跳切。从极俯拍突然跳切。士兰猛坐起0.5s触电式→头发前甩→眼神空洞→清亮凌厉燃新火苗。泡沫柱左侧可见。语调变快变亮："不对。冷宫。冷宫的墙，一定是真的。那地方没人愿意去，道具组肯定懒得布置。"衣物锐利摩擦"唰——"→史诗BGM极弱起(ppp弦乐泛音)→过渡Seg7。
```
