# 视频提示词 — Pack 05：释然+彩蛋

覆盖 Seg9（01:20-01:30），5镜，对应故事板 Pack 05，VGU-06。

---

## global_execution_preamble

将提供的"故事板总板 Pack 05"视为本段视频生成的**顺序视觉关键帧参考**，而非松散灵感图。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。

在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作。每个动作单元遵循：预备动作 → 发力 → 反应 → 收势。

本 Pack 覆盖全片收束——从片场回归平静到彩蛋爆笑的双重收尾：
- I01-I03：士兰醒来→独白→叠毯→回头调侃——温暖释然+打破第四面墙
- I04-I05：皇上憋笑四阶段→滑下龙椅→定格——彩蛋callback

关键姿势的电影化动作扩展原则：
- I01醒来：从昏倒到坐起的意识恢复过程——冰袋和毯子是时间省略的视觉线索
- I02第四面墙独白：正面近景直接对镜头说话——语气像和老朋友聊天
- I03叠毯回头：站起→叠毯整齐→走→回头→挑眉——全片唯一俏皮
- I04憋笑两阶段：嘴唇紧抿→腮帮鼓起→眼角抽搐→"噗—"漏气→嘴角失控→手捂嘴(太晚)
- I05大笑→滑下：从张嘴露齿大笑→眼睛眯缝→头后仰→重心偏移→抓扶手抓不住→缓慢滑下→龙袍皱地→擦泪拿对讲机→定格憋笑脸

不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

## project_level_global_rules

**主场景空间锁定**：片场休息区（暖色日常光，新空间）→切黑→养心殿（暖黄宫灯光，新空间）。背景可见工作人员拆泡沫柱、收蹦床、卷绿幕——对应Pack 01-04所有道具"收工"。

**角色重现锁定**：士兰——冰袋+毯子（新增配件），旗装皱褶。皇上——45-55岁，微胖体型，八字胡+山羊胡，明黄简化龙袍（云纹补子），手持iPad黑色保护壳。休息区背景群演为拆道具工作人员。

**不重复角色**：同一镜头内同一角色不出现两次。养心殿内无侍从——皇上可毫无形象。

**画面可读性优先**：动作清晰度、角色轮廓识别、空间稳定性、表演时机准确性。I04-I05憋笑四阶段每个阶段约2秒，连续无cut。

**风格锁定（classic_studio_wuxia）**：士兰收尾——温暖日常光+打破第四面墙——将"亮相"传统温柔解构为对观众说"凑合活吧"。皇上彩蛋——暖黄宫灯光+iPad冷白屏光反脸——4阶段单人喜剧独幕剧→定格在憋笑脸（将笑未笑>大笑，留余味）。字幕滚屏=正式谢幕。

**灯光锁定**：片场休息区温暖日常光(3200K)。I02浅景深(f/2.8等效)面部专注。养心殿暖黄宫灯(2700K)+iPad冷白屏光(6500K)在皇上脸上反光——唯一变化光源。

**负向边界**：皇上憋笑不夸张到挤眉弄眼级别——保留四郎胡子的威严残余。所有表现保持无害化非写实。龙椅滑下时龙袍绸缎光泽与地面褶皱哑光质感形成面料对比。

---

## Segment 9：不撞了+彩蛋（01:20-01:30）

### segment_technical_control_block — Seg9

```yaml
segment_id: Seg9
timecode: "01:20-01:30"
duration_seconds: 10
beat_ref: B06
beat_purpose: resolution——释然和解+彩蛋callback，双重收尾
primary_vgu_ids: [VGU-06]
covered_units: [U34, U35, U36, U37, U38]
covered_shots: [I01, I02, I03, I04, I05]
continuity_in: ←Seg8 H05昏倒，时间省略，冰袋+毯子为视觉线索
continuity_out: 全片结尾→憋笑脸定格→字幕滚屏
next_handoff: 无（全片结束）
blocking_continuity:
  default_positions: 休息区(士兰坐帆布导演椅)→养心殿(皇上坐龙椅)
  allowed_moves: 士兰坐→站→走→回头，皇上坐→滑下龙椅
  forbidden_zones: —
  screen_side_lock: —
  axis_preservation_note: I02打破第四面墙(正面镜头)
prop_state_continuity:
  opening_state: 士兰新增冰袋+毯子，休息区背景拆道具
  closing_state: 士兰离开，皇上滑下龙椅
blocking_execution:
  I01-I02: 士兰坐导演椅
  I03: 站起→叠毯→走→回头
  I04-I05: 皇上坐龙椅→滑下
prop_state_execution:
  opening_state: 冰袋在头上+毯子在肩上，背景泡沫柱被拆+蹦床被收+绿幕被卷
  in_segment_changes: I03叠毯放椅→I05龙椅滑下龙袍皱地
  closing_state: 毯子叠好放椅上，龙椅空(皇上在地上)
  visible_evidence: 椅背"主演·士兰"文字，iPad屏幕士兰弹飞回放
expressive_animation_inheritance:
  enabled: false
cinematic_language_inheritance:
  camera_language: 中景温暖环境光→近景正面(第四面墙)→中景→中景+近景切换→中景拉宽→定格
  visual_motivation: I01-I03让士兰从片场视角过渡到观众视角→I04-I05切换到养心殿完成callback——两个空间在情绪上呼应(都是"放下")
  selected_shot_pattern: 释然→切黑→彩蛋callback→定格——双重收尾结构
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "不撞了。活着，喝点水，晒晒太阳。被弹飞八次都没死，说明老天不收我。那就……凑合活吧。"
      line_intent: 释然和解，主题收束。每句间0.8-1s自然停顿
      delivery_tone: 像和老朋友聊天，平淡自然，最后一句微笑微加深
    - character_id: 士兰
      dialogue_text: "对了，帮我转告陛下——让他下次批道具预算的时候，上点心。"
      line_intent: 全片唯一俏皮——边走边回头
      delivery_tone: 说"上点心"时挑了挑眉毛
    - character_id: 皇上
      dialogue_text: "苏培盛——把这段发给她姐姐。标题写：你姐姐今日战绩。"
      line_intent: 还在喘着笑——callback的callback
      delivery_tone: 擦着笑出来的眼泪，嗓音被笑打断
rhythm_continuity:
  intensity_progression: 2(醒来)→3(独白)→3(回头)→1(切黑)→5(憋笑)→7(破功)→9(滑下)→定格
action_continuity: 醒→坐→接水→喝→独白→叠毯→站→走→回头→挑眉(士兰) | 坐→看iPad→憋→漏→捂→松→大笑→歪→滑→擦泪→对讲机(皇上)
emotion_continuity: 平静→释然→俏皮→切黑→憋(5)→破(7)→大笑(9+)→滑下(9+)→定格
space_continuity: 片场休息区→切黑→养心殿
audio_direction:
  music: I01-I03温暖钢琴+吉他(治愈系,tempo~70bpm松弛)→I03"切黑"后BGM渐弱至ppp→0→I04彩蛋喜剧拨弦乐pizzicato strings切入(轻快调皮)→I05定格所有声音骤停→字幕滚屏温暖钢琴+弦乐收尾
  ambience: I01-I03片场收工环境(拆道具声、卷线声,远景模糊)→切黑后1s无声→I04-I05养心殿极静
  foley: I01拧瓶盖"咔"→喝水"咕"(极近距)→I03叠毯布料摩擦→I04憋笑喉咙压住的"嗯——"→破功"噗——"(漏气)→I05大笑→龙椅滑动"吱——"+身体滑落闷响→对讲机"咔嗒"
  dialogue: 士兰独白(BGM下)干声自然→皇上台词还在喘
  silence_or_pause: I03切黑后1s无声→I05定格所有声音骤停→字幕滚屏BGM恢复
  segment_audio_bridge_in: ←Seg8 H05掌声reverb尾音(2s)→温暖钢琴单音pp进入→I01醒来
hero_moment_candidates: []
ending_payoff_hook: 憋笑脸定格——选择将笑未笑而非大笑，给观众留余味
opening_anchor_reference: AF-11（休息区中景）
closing_anchor_reference: AF-12（皇上憋笑脸定格）→字幕滚屏
storyboard_ref: 故事板提示词_pack_05_v2.md
storyboard_translation_rule:
  sequential_keyframe_reference: true
  preserve_storyboard_progression: true
  inbetween_motion_expansion: true
  readability_priority: true
  do_not_render_storyboard_artifacts: true
model_adaptation:
  preferred_prompt_density: 导演长版完整细节
  visual_reference_mode: 角色说明书板+故事板Pack 05
  motion_control_focus: 皇上憋笑四阶段的微表情连续变化+龙椅滑下的物理
  continuity_risk: 低（收束段，无跨段连续性压力）
reference_images: [角色说明书图片提示词_士兰_v1, 故事板提示词_pack_05_v2]
shot_plan:
  - shot_id: I01
    related_vgu_id: VGU-06
    timecode_start: "01:20"
    timecode_end: "01:22.5"
    shot_continuity:
      previous_left: Seg8 H05昏倒大字趴
      current_picks_up: 士兰坐帆布导演椅醒来
      entry_state: 刚经历一切
      core_action: 头上冰袋→肩上毯子→坐椅→接矿泉水→表情刚醒微懵但平静→背景拆道具
      exit_state: 安静坐着
      next_handoff: →I02第四面墙独白
    visual_goal: 时间省略+状态过渡——用冰袋和毯子让观众自己脑补中间发生了什么
    camera_direction: 中景温暖环境光(3200K)，背景拆道具活动模糊
    screen_positioning:
      subject_left_right: 士兰坐椅居中偏右，椅背"主演·士兰"在画面内
      depth_relation: 士兰前景→工作人员拆道具中景模糊→片场远景
    blocking_execution:
      default_positions: 士兰坐帆布导演椅，休息区
    prop_state_execution:
      opening_state: 冰袋在头+毯子在肩（新增）
      closing_state: 接水后喝一口
      visible_evidence: 椅背"主演·士兰"，背景可辨识：泡沫柱被拆卸+蹦床被折叠+绿幕被卷起
    performance_direction: 睫毛微颤→睁眼→看到冰袋→摸了一下→"哦，又活了"的平淡表情→接水→拧盖→喝一小口
    audio_direction: 温暖钢琴单音pp进入→片场收工环境音(远景拆道具声+卷线声)

  - shot_id: I02
    related_vgu_id: VGU-06
    timecode_start: "01:22.5"
    timecode_end: "01:25.5"
    shot_continuity:
      previous_left: I01喝水
      current_picks_up: 正面近景，打破第四面墙
      entry_state: 平静
      core_action: 对镜头独白——像和老朋友聊天
      exit_state: 释然微笑
      next_handoff: →I03叠毯回头
    visual_goal: 主题收束——士兰直接对观众说话
    camera_direction: 近景正面镜头（直视镜头，打破第四面墙），浅景深(f/2.8等效)背景全虚化
    screen_positioning:
      subject_left_right: 士兰面部居中
      facing_direction: 正面看镜头(看观众)
      depth_relation: 面部→矿泉水瓶→背景全虚化
    blocking_execution:
      default_positions: 士兰坐导演椅不动
    performance_direction: 看镜头，表情平静带疲惫微笑。说话自然如老朋友。每句间自然停顿0.8-1s。"凑合活吧"时微笑微加深。不煽情不夸张——就是一个人想通了
    audio_direction: 温暖钢琴+吉他BGM下干声独白

  - shot_id: I03
    related_vgu_id: VGU-06
    timecode_start: "01:25.5"
    timecode_end: "01:27"
    shot_continuity:
      previous_left: I02独白结尾
      current_picks_up: 站起叠毯子
      entry_state: 刚说完主题台词
      core_action: 站起→叠毯子整齐放椅上→转身走两步→回头→挑眉"对了…"→走远
      exit_state: 离开画面
      next_handoff: 切黑→I04彩蛋
    visual_goal: 最好的告别——不悲情，有俏皮
    camera_direction: 中景，士兰从坐→站→走的过程，椅背"主演·士兰"留在画面
    screen_positioning:
      subject_left_right: 士兰从画面中央站起→走向画面外→椅背文字留白
    performance_direction: 站起→把毯子叠得整整齐齐放在椅子上→转身走两步→回头→说"上点心"时挑了挑眉毛(全片唯一活泼)→继续走远。动作不匆忙也不拖沓
    audio_direction: 叠毯布料摩擦→"上点心"挑眉时音乐微扬→走远BGM渐弱至ppp

  - shot_id: I04
    related_vgu_id: VGU-06
    timecode_start: "01:27"
    timecode_end: "01:29"
    shot_continuity:
      previous_left: I03切黑
      current_picks_up: 养心殿内景
      entry_state: 全新空间——彩蛋
      core_action: 皇上独坐龙椅看iPad→憋笑两阶段(压2s)→"噗—"漏气→嘴角失控→手捂嘴(太晚)
      exit_state: 防线崩溃
      next_handoff: →I05大笑滑下
    visual_goal: 彩蛋callback——让系列老观众会心一笑
    camera_direction: 中景+近景切换，养心殿暖黄宫灯光(2700K)，iPad冷白屏光(6500K)在脸上反光
    screen_positioning:
      subject_left_right: 皇上居中坐龙椅
      facing_direction: 低头看手中iPad(屏幕光从下往上打脸)
    blocking_execution:
      default_positions: 皇上坐龙椅中央
    performance_direction: 憋笑两阶段(约2s/阶段)：阶段1-嘴唇紧抿→腮帮鼓起像松鼠→眼角肌肉抽动→鼻孔微张。阶段2-"噗—"漏气→嘴角一侧失控上翘→赶紧用手捂嘴(但太晚了)
    audio_direction: 切黑后1s无声→喜剧拨弦乐pizzicato strings切入→憋笑喉咙压住的"嗯——"→破功"噗——"

  - shot_id: I05
    related_vgu_id: VGU-06
    timecode_start: "01:29"
    timecode_end: "01:30"
    shot_continuity:
      previous_left: I04憋笑破功
      current_picks_up: 大笑→滑下龙椅
      entry_state: 防线已崩溃
      core_action: 手松开→张嘴露齿大笑→眼眯成缝→头后仰→iPad晃→重心偏移→抓扶手抓不住→缓慢滑下→龙袍皱地→擦泪拿对讲机→"苏培盛……"
      exit_state: 定格憋笑脸
      next_handoff: 全片结束→字幕滚屏
    visual_goal: ★结尾锚帧★——憋笑脸定格的瞬间，给观众留余味
    camera_direction: 中景拉宽——龙椅在中央→皇上滑下→对讲机→定格→字幕滚屏
    screen_positioning:
      subject_left_right: 皇上从龙椅中央→滑至龙椅下方地面
    performance_direction: 手松开→张嘴大笑露齿→眼眯成两条缝→头后仰→iPad在手中危险晃动→身体重心慢慢偏移→一只手伸向龙椅扶手→抓了一下没抓住→整个人缓慢地从龙椅上滑下来→龙袍在椅面上皱成一团→他坐在地上→用袖口擦笑出来的眼泪→拿起对讲机(还在喘)→"苏培盛——把这段发给她姐姐。标题写：你姐姐今日战绩。"——定格在憋笑脸(将笑未笑，不是大笑)——字幕滚屏
    audio_direction: 大笑(中气十足)→龙椅滑动"吱——"+身体滑落闷响→喘着笑说台词→对讲机"咔嗒"开关→定格所有声音骤停→字幕滚屏:温暖钢琴+弦乐收尾(回到I01治愈主题形成闭环)
```

### 导演长版正文 — Seg9

**Segment 9：不撞了+彩蛋 | 01:20-01:30 | VGU-06 | I01-I05**

**I01 [01:20-01:22.5] 中景温暖环境光**
掌声的reverb尾音渐弱——温暖钢琴单音pp进入。片场休息区，明亮而温暖的工作灯光（3200K）。士兰醒了。她坐在一把帆布折叠导演椅上，头上戴着白色冰袋，肩上披着一件灰色剧组毯子（罩在皱褶的旗装外面）。椅背印着四个字："主演·士兰"。她的表情刚醒微懵但平静。旁边有人递过来一瓶矿泉水——她接过来，拧开盖子（"咔"），喝了一小口（"咕"）。背景中，工作人员在拆道具——泡沫柱子被拆卸、蹦床被折叠收走、绿幕被卷起——所有Pack 01-04的道具都在"收工"。这些活动在浅景深中保持模糊，不抢注意力。

**I02 [01:22.5-01:25.5] 近景正面镜头——打破第四面墙**
切到近景。士兰正面看着镜头——直接看观众。浅景深(f/2.8等效)让背景全部虚化。她的表情平静，嘴角带着一丝疲惫但真实的微笑。说话的语气像和老朋友聊天——自然、不煽情、每句话之间有0.8-1秒的自然停顿："不撞了。活着，喝点水，晒晒太阳。被弹飞八次都没死，说明老天不收我。"——停了半拍——"那就……凑合活吧。"最后一句微笑微微加深。温暖钢琴+吉他BGM（tempo~70bpm，松弛）轻轻垫在下面。

**I03 [01:25.5-01:27] 中景**
士兰站起来。她把肩上的毯子取下来，叠得整整齐齐，放在导演椅上。转身走了两步——然后回头。表情突然有了一丝俏皮："对了，帮我转告陛下——"边走边回头，"让他下次批道具预算的时候，上点心。"说"上点心"时挑了挑眉毛——这是全片唯一一次活泼的表情。然后她转身继续走远。画面留在空椅子和椅背"主演·士兰"几个字上。切黑。BGM渐弱至ppp→0。1秒无声。

**I04 [01:27-01:29] 中景+近景**
养心殿。暖黄宫灯光（2700K）。皇上独自坐在龙椅上——微胖，八字胡+山羊胡，明黄简化龙袍（云纹补子）。没有侍从——他可以完全不需要保持形象。他手里拿着iPad，屏幕的冷白光照在他的脸上（6500K，唯一变化光源）。屏幕上正在回放今天的拍摄画面——士兰被蹦床弹飞的片段。他看了一遍。嘴角抽搐。看第二遍。面部肌肉开始诡异扭动。他经历了两个阶段——每个阶段约2秒：
阶段1：嘴唇紧抿→腮帮像松鼠一样鼓起→眼角肌肉开始抽动→鼻孔微微张开——他在和笑意进行殊死搏斗
阶段2："噗——"一声漏气——嘴角一侧彻底失控上翘——他赶紧用手捂嘴——但捂得太晚了，笑意已经从眼睛和肩膀的抖动中完全暴露
喜剧拨弦乐pizzicato strings在I04开始时切入。憋笑喉音"嗯——"→"噗——"漏气。

**I05 [01:29-01:30] 中景拉宽→定格 ★结尾锚帧★**
防线彻底崩溃。他松开手——张嘴露齿大笑——眼睛眯成两条缝——头后仰——iPad在手中危险地左右晃动。身体重心慢慢偏移——一只手伸向龙椅扶手——抓了一下——没抓住——整个人缓慢地从龙椅上滑下来。龙袍的绸缎在椅面上皱成一团，与地面的哑光质感形成对比。他坐在地上，还在喘着笑。用袖口擦掉笑出来的眼泪。拿起对讲机（"咔嗒"开关声），嗓音被笑打断："苏培盛——把这段发给她姐姐。标题写：你姐姐今日战绩。"——画面定格。定格在他将笑未笑的表情上——嘴角还在上扬，眼睛还眯着——笑意的中途被捕捉。不是结束在大笑，而是留给观众去完成这个笑。

所有声音骤停。字幕滚屏："本片拍摄过程中没有士兰受伤" / "泡沫柱子三根，纸板柱子两根，蹦床一座，绿幕一块，LED屏一面——均已回收利用" / "特别鸣谢：横店影视城道具组（你们是懂省钱的）"——温暖钢琴+弦乐收尾（回到I01的治愈主题，形成闭环）。

——终——

---

## 可直接复制使用块 — Seg9

```
【全局前导】

将"故事板总板 Pack 05"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间扩展出流畅连续的电影化动画动作。不渲染故事板边框、箭头、镜头编号等版式痕迹。

【项目级全局锁定规则】

- 场景：片场休息区(暖色日常光3200K)→切黑→养心殿(暖黄宫灯2700K+iPad冷白屏光6500K)
- 角色锁定：士兰(冰袋+毯子+皱旗装)、皇上(微胖+八字胡+山羊胡+明黄简化龙袍+iPad)，不重复角色
- 画面可读性优先：憋笑四阶段每阶段约2s连续无cut
- 灯光：休息区温暖环境光→养心殿iPad屏光在脸上反光(唯一变化光源)
- 负向边界：憋笑不夸张到挤眉弄眼级别、保持四郎胡子威严残余、冲击效果无害化

【Segment 9 技术控制块】

segment_id: Seg9 | timecode: 01:20-01:30
primary_vgu_ids: [VGU-06]
continuity_in: ←Seg8 H05昏倒，时间省略，冰袋+毯子为线索
continuity_out: 全片结尾→憋笑脸定格→字幕滚屏
shot_continuity_refs: [I01, I02, I03, I04, I05]
blocking_continuity: 休息区(士兰坐→站→走)→养心殿(皇上坐→滑下)
prop_state_continuity: 休息区背景拆道具(泡沫柱被拆+蹦床被收+绿幕被卷)
blocking_execution: I01-I02坐椅→I03站叠毯走回头→I04-I05坐龙椅→滑下
prop_state_execution: I01冰袋+毯子新增→I03毯叠好放椅→I05龙椅滑下龙袍皱地
next_handoff: 无(全片结束)/结尾锚帧AF-12憋笑脸定格

【Segment 9 导演长版提示词】

Seg9 不撞了+彩蛋 | 01:20-01:30 | VGU-06 | 5镜

[I01 01:20-01:22.5] 中景温暖环境光(3200K)。掌声reverb尾音→钢琴pp进入。士兰坐帆布导演椅醒来——头上冰袋、肩上毯子。椅背"主演·士兰"。表情刚醒微懵但平静。接矿泉水→拧盖"咔"→喝一小口"咕"。背景模糊：工作人员拆泡沫柱+收蹦床+卷绿幕(所有道具"收工")。

[I02 01:22.5-01:25.5] 近景正面——打破第四面墙。士兰看镜头。浅景深(f/2.8)背景全虚。语气像和老朋友聊天每句停顿0.8-1s:"不撞了。活着，喝点水，晒晒太阳。被弹飞八次都没死，说明老天不收我。那就……凑合活吧。"最后微笑微加深。钢琴+吉他BGM(tempo~70bpm)。

[I03 01:25.5-01:27] 中景。站起→叠毯整齐放椅→转身走两步→回头挑眉"对了，帮我转告陛下——让他下次批道具预算的时候，上点心。"(挑眉全片唯一俏皮)→继续走远。椅背"主演·士兰"留在画面。切黑。BGM→ppp→0→1s无声。

[I04 01:27-01:29] 中景+近景。养心殿暖黄宫灯(2700K)。皇上独坐龙椅看iPad(屏幕冷白光6500K反脸)。无侍从——可毫无形象。憋笑两阶段(每段约2s):阶段1-嘴唇紧抿→腮帮鼓起→眼角抽搐→鼻孔微张。阶段2-"噗—"漏气→嘴角失控上翘→手捂嘴(太晚)。pizzicato strings切入。

[I05 01:29-01:30] ★结尾锚帧★ 中景拉宽→定格。手松开大笑露齿→眼眯缝→头后仰→iPad晃→重心偏移→抓扶手抓不住→缓慢滑下龙椅→龙袍皱地。坐地上袖口擦笑泪→拿对讲机"咔嗒"(还在喘):"苏培盛——把这段发给她姐姐。标题写:你姐姐今日战绩。"★定格在憋笑脸(将笑未笑，留余味)★。所有声音骤停。字幕滚屏+温暖钢琴+弦乐收尾(闭环)。
```
