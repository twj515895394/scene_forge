# 视频提示词 — Pack 01：悲壮→懵圈

覆盖 Seg1+Seg2（00:00-00:20），8镜，对应故事板 Pack 01，VGU-01。

---

## global_execution_preamble

将提供的"故事板总板 Pack 01"视为本段视频生成的**顺序视觉关键帧参考**，而非松散灵感图。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。

在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作，而不是逐格摆拍。每个动作单元遵循：预备动作 → 发力 → 反应 → 收势，保留故事板已确定的动作方向和表演时机。

关键姿势的电影化动作扩展原则：
- A01跪地→A02抬头：从静止低垂到缓慢抬起的颈部与脊椎逐节运动，烛火随呼吸气流微晃
- A02含泪→A03猛站：从面部情绪积累到全身爆发的能量传递，裙摆滞后0.3秒体现发力速度
- A03站姿→A04冲刺：身体前倾由慢到快的加速度过渡，泪珠从眼眶脱离飞散的粒子路径
- A04冲刺→B01撞击：从极限速度到瞬间弹性回弹的物理反差，柱子晃动与人体弹回的同步关系
- B01弹回→B02表情切换：身体落地后的余震传递到面部肌肉的1.5秒连续变形
- B03便利贴→B04"啊？"：视线引导的焦点转移和认知崩溃的微表情链条

不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。故事板是视觉路线图，不是画面模板——保留其空间关系和动作逻辑，但用完整的电影化连续镜头来呈现。

## project_level_global_rules

**主场景空间锁定**：本段全部发生在冷宫棚拍片场内。空间结构固定——泡沫柱在画面左侧（Zone B左），后墙在正后方，Zone A为中央表演区。空间布局在整个 Segment 内保持不变。

**角色重现锁定**：士兰每次出现必须保持同一角色设计——清代妃子，圆润鹅蛋脸，杏眼柳叶眉，素白棉麻旗装，两把头简化版发髻。五官比例、身形轮廓、服装细节在跨镜头时必须一致，不得漂移。

**不重复角色**：同一镜头内不得出现两个士兰。同一角色在同一连续场景中不无因重复、增殖或替换。

**画面可读性优先**：
- 动作清晰度：每个动作的发力方向、运动轨迹和收势姿态必须一眼可辨
- 角色轮廓识别：士兰的旗装剪影和两把头侧面轮廓在任何景别下保持清晰可辨
- 空间稳定性：泡沫柱、后墙、烛火等空间锚点不因镜头切换而漂移
- 表演时机准确性：表情切换节奏严格遵循故事板时间码，悲壮到懵圈的1.5秒过渡不可压缩或拉伸

**风格锁定（classic_studio_wuxia）**：
- 棚拍布景感贯穿：场景是摄影棚搭的景，保留布景的"棚味"而非追求实景逼真
- 定场亮相：关键动作前给亮相停顿（A01跪地→A03名台词间的情绪亮相）
- 完整动作展示：冲刺→撞击→弹回→坐地的动作链不断碎切
- 进出场秩序：士兰的动作起止有明确的空间定位和方向性

**灯光锁定**：棚拍式轮廓光+人物分区优先。烛火暖色主光（约2700K）从低角度打士兰面部，高窗月光冷色补光（约5600K）从上方漫射。光比保持约3:1。不采用现代自然主义平光。

**负向边界**：
- 不套用现代快剪动作片镜头逻辑
- 不把角色演法现代化或口语化
- 不只靠旧滤镜而无调度秩序
- 所有冲击效果保持无害化、非写实、可继续表演的表现方式
- 镜头语言只服务叙事、情绪、动作可读性和视觉信息

---

## Segment 1：悲壮还原（00:00-00:10）

### segment_technical_control_block — Seg1

```yaml
segment_id: Seg1
timecode: "00:00-00:10"
duration_seconds: 10
beat_ref: B01a
beat_purpose: setup——建立极致悲壮氛围，让观众信任"这是正剧"
primary_vgu_ids: [VGU-01]
covered_units: [U01, U02, U03]
covered_shots: [A01, A02, A03, A04]
continuity_in: 黑屏淡入，无前置Segment
continuity_out: 冲刺动势向北→Seg2 B01撞击瞬间0s硬切承接，动势不中断
next_handoff: A04冲刺至额距柱面10cm处→B01撞击瞬间直接承接
blocking_continuity:
  default_positions: 士兰Zone A中央偏南，泡沫柱Zone B左，后墙正后方
  allowed_moves: 士兰可在Zone A内南北向移动（冲刺路径）
  forbidden_zones: Zone D（片场后方）在B05前不可见
  crossing_rule: 不跨180度东西轴线
  screen_side_lock: 泡沫柱始终在画面左侧
  eye_line_rule: A01-A03视线向上（对君王），A04视线水平向北（对柱子）
  axis_preservation_note: 主轴线南北向，镜头默认从南向北
prop_state_continuity:
  opening_state: FP-01（泡沫柱正常仿石外观）
  closing_state: FP-01（恢复静止），FP-02（便利贴可见）待Seg2揭示
blocking_execution:
  A01: 士兰跪Zone A南端，面向北，泡沫柱在左前方
  A02: 同上位，镜头推进
  A03: 士兰从跪到站，仍在Zone A南端，身体前倾30°向北
  A04: 士兰向北全速冲刺，从Zone A南→北，泪珠飞散轨迹向北
prop_state_execution:
  opening_state: 泡沫柱FP-01正常外观，仿石纹理完整
  in_segment_changes: 无（撞击在Seg2发生）
  closing_state: 泡沫柱FP-01（即将被撞）
  visible_evidence: 石纹表面光滑完整，黄色便利贴尚未入镜
expressive_animation_inheritance:
  enabled: false
  note: live_action_cinematic不启用卡通形变，悲壮氛围通过真人表演+棚拍灯光实现
cinematic_language_inheritance:
  camera_language: 固定→慢推→低角度微仰→跟拍慢镜
  visual_motivation: 让观众从压抑的静止→情绪积累→爆发→释放，完整经历士兰的悲壮
  selected_shot_pattern: 积累式推镜（从特写到近景再到中景爆发），用空间压缩对应情绪增压
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "陛下，你害得士兰好苦啊！！！！"
      line_intent: 压抑已久的悲愤全力释放，原剧名台词在喜剧框架中的"最后一次正经"
      delivery_tone: 撕心裂肺，嗓音破音边缘，尾音带颤抖
      pacing_or_pause: 台词前深吸一口气（可见胸腔起伏），喊完后0.5秒静止
rhythm_continuity:
  intensity_progression: 3→5→7（冲刺峰值）
  edit_rhythm: A01-A02慢推积累→A03爆发跳切→A04慢镜释放
action_continuity: 跪→抬→含泪→喊→猛站→冲刺（向北）
emotion_continuity: 压抑→悲愤→爆发
space_continuity: 全段在冷宫Zone A/B左，无空间切换
audio_direction:
  music: 悲怆弦乐渐强（大提琴+小提琴），A01-A02缓慢积蓄→A03推到最大→A04保持峰值
  ambience: 烛火噼啪微响、高窗风声
  foley: 裙摆扬起布料的"唰——"，A02→A03心跳低音鼓"咚——咚——"
  silence_or_pause: A03台词喊完后0.5秒让悲壮感"挂"在空中
  expressive_audio: 不启用卡通音效（live_action_cinematic）
  segment_audio_bridge_out: BGM在A04冲刺峰值保持→Seg2 B01撞击瞬间用橡胶玩具挤压声拦腰截断
hero_moment_candidates: []
ending_payoff_hook: 无（开场段）
opening_anchor_reference: AF-01（烛火特写→黑屏淡入）
closing_anchor_reference: AF-02（便利贴大特写→Seg2揭示）
storyboard_ref: 故事板提示词_pack_01_v2.md（控制版+风格版）
storyboard_translation_rule:
  sequential_keyframe_reference: true
  preserve_storyboard_progression:
    beat_progression: true
    camera_rhythm: true
    composition_logic: true
    action_choreography: true
    spatial_relationships: true
    emotional_progression: true
    key_pose_readability: true
    anticipation_and_release: true
  inbetween_motion_expansion: true
  readability_priority: true
  do_not_render_storyboard_artifacts: true
  scene_lock_rule: true
  character_reappearance_lock: true
model_adaptation:
  preferred_prompt_density: 导演长版完整细节
  visual_reference_mode: 角色说明书板+场景道具总参考图+故事板Pack 01
  motion_control_focus: 慢镜冲刺的泪珠粒子+裙摆物理+头发飘动
  continuity_risk: 低（开场段建立所有基线）
  negative_prompt_focus: 避免现代灯光设备入镜、避免演员穿帮
reference_images:
  global_refs:
    - 角色说明书图片提示词_士兰_v1
    - master_scene_prop_reference_v1
    - 空间站位图提示词_v1
  per_segment_refs:
    required: [故事板提示词_pack_01_v2（控制版+风格版）]
    usage_order: 先角色锚定→再场景空间→再故事板关键帧
shot_plan:
  - shot_id: A01
    related_vgu_id: VGU-01
    timecode_start: "00:00"
    timecode_end: "00:04"
    source_unit_id: U01
    shot_continuity:
      previous_left: 黑屏淡入
      current_picks_up: 烛火微光→士兰跪地低头
      entry_state: 观众零信息
      core_action: 跪地→缓慢抬头→烛火在低垂脸上摇曳
      exit_state: 泪盈眶，情绪积累中
      next_handoff: 抬头动势→A02推镜含泪
      space_positioning: 士兰Zone A南端跪姿，面向北
    visual_goal: 建立冷宫氛围基线+士兰悲壮情绪
    camera_direction: 特写固定，前景烛台虚化，棚拍暖色轮廓光从低角度打面部
    screen_positioning:
      subject_left_right: 士兰居中偏下
      facing_direction: 面部朝向镜头偏上方（对君王方向）
      depth_relation: 前景烛台虚化→士兰面部清晰→后景暗灰墙面虚化
      axis_side: 南侧，向北拍摄
    blocking_execution:
      default_positions: 士兰跪Zone A南端
      allowed_moves: 仅头部抬起
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-01
      in_shot_changes: 无
      closing_state: FP-01
      visible_evidence: —
    performance_direction: 低垂→缓慢抬头的颈部逐节运动，烛火随呼吸气流微晃
    audio_direction: 烛火噼啪+高窗远风+大提琴低音渐入
    negative_constraints: 不出现现代元素、不让烛火照亮整个面部（保留暗部轮廓）

  - shot_id: A02
    related_vgu_id: VGU-01
    timecode_start: "00:04"
    timecode_end: "00:07"
    source_unit_id: U02
    shot_continuity:
      previous_left: A01泪盈眶
      current_picks_up: 推镜加深→眼眶渐红
      entry_state: 情绪积累中
      core_action: 泪珠成形→嘴唇高频微颤→情绪到临界点
      exit_state: 情绪即将爆发
      next_handoff: 临界情绪→A03名台词爆发
      space_positioning: 同A01机位推近
    visual_goal: 名台词前最后的情感加压
    camera_direction: 特写极慢推镜，从面部近景推至眼唇大特写，浅景深（f/2.8等效）
    screen_positioning:
      subject_left_right: 士兰面部居中
      facing_direction: 视线向上偏右（对君王），泪光映烛火
      depth_relation: 眼睛→嘴唇→背景全虚化
      axis_side: 同A01
    blocking_execution:
      default_positions: 同A01
      allowed_moves: 微表情运动
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-01
      in_shot_changes: 无
      closing_state: FP-01
      visible_evidence: —
    performance_direction: 泪珠在烛光下闪烁成形，嘴唇高频微颤速度渐增，下巴肌肉紧绷
    audio_direction: 心跳低音鼓"咚——咚——"渐强+弦乐渐紧
    negative_constraints: 不夸张到卡通化，保持真人表演的可信度

  - shot_id: A03
    related_vgu_id: VGU-01
    timecode_start: "00:07"
    timecode_end: "00:10"
    source_unit_id: U03
    shot_continuity:
      previous_left: A02临界情绪
      current_picks_up: 猛站+名台词爆发
      entry_state: 情绪临界点
      core_action: "台词'陛下，你害得士兰好苦啊！！！！'+从跪到站+身体前倾30°"
      exit_state: 全力释放，身体站直前倾
      next_handoff: 前倾动势→A04冲刺（0.3s动势重叠）
      space_positioning: 士兰从跪→站，仍在Zone A南端，面北
    visual_goal: 全片情绪最高点——下一秒被泡沫柱粉碎
    camera_direction: 中景低角度微仰（从地面高度约30cm向上拍），裙摆扬起+烛火剧烈摇曳在画面内
    screen_positioning:
      subject_left_right: 士兰居中
      facing_direction: 面朝正北（柱子方向），身体前倾30°
      depth_relation: 士兰前景→泡沫柱中景左前方→后墙远景正前方
      axis_side: 南向北，低角度
    blocking_execution:
      default_positions: 士兰站Zone A南端
      allowed_moves: 从跪到站的垂直运动+前倾
      forbidden_zones: —
      crossing_rule: 不跨轴
    prop_state_execution:
      opening_state: FP-01
      in_shot_changes: 无
      closing_state: FP-01（即将被撞）
      visible_evidence: 泡沫柱在画面左中景，仿石纹理完整
    performance_direction: 裙摆滞后0.3秒扬起（体现发力速度），双臂后摆，胸腔可见深吸气后的扩张
    audio_direction: 台词干声+BGM全推至峰值，心跳鼓点最后一声最重
    negative_constraints: 不将悲壮变成浮夸——这是最后一次"真"的表演

  - shot_id: A04
    related_vgu_id: VGU-01
    timecode_start: "00:10"
    timecode_end: "00:10"
    source_unit_id: U03
    shot_continuity:
      previous_left: A03站姿爆发前倾
      current_picks_up: 身体从30°前倾过渡到全速冲刺
      entry_state: 爆发后全力冲刺
      core_action: 慢镜冲刺+泪珠飞散+发丝飘起+裙摆扬飞
      exit_state: 额距柱面约10cm（即将撞击）
      next_handoff: 撞前0.1s→Seg2 B01固定撞击（0s硬切）
      space_positioning: 士兰从Zone A南端向北冲刺，泡沫柱在画面正前方逼近
    visual_goal: 悲壮冲刺的视觉峰值——泪珠和发丝在空中定格般的慢镜
    camera_direction: 侧面跟拍慢镜头（约60fps升格），镜头与士兰同步向北移动
    screen_positioning:
      subject_left_right: 士兰居中偏右（让出北向前方空间）
      facing_direction: 向北（画面左侧偏上方向冲刺）
      depth_relation: 士兰中景→冲刺路径空间→泡沫柱远景正前方快速逼近
      axis_side: 东西侧面向北跟拍
    blocking_execution:
      default_positions: 士兰从Zone A南→北全速移动
      allowed_moves: 南北向直线冲刺路径
      forbidden_zones: 不可偏离冲刺轴线
      crossing_rule: 不跨轴
    prop_state_execution:
      opening_state: FP-01
      in_shot_changes: 泡沫柱快速逼近
      closing_state: FP-01（即将撞击）
      visible_evidence: 柱面仿石纹理从远景→中景→近景快速放大
    performance_direction: 泪珠从眼眶脱离→飞散成水滴粒子（慢镜可见），发丝向后飘起，裙摆扬飞至水平
    audio_direction: 悲怆BGM保持峰值→延至Seg2 B01撞击瞬间被橡胶玩具挤压声截断
    negative_constraints: 泪珠飞散不夸张到卡通化，保持真人物理尺度

# Seg1→Seg2桥接
# A04冲刺动势(向北)由B01撞击瞬间直接承接，0s硬切，动势不中断
# BGM在峰值被橡胶玩具挤压声"拦腰截断"（不渐弱，是被"切掉"的）
```

### 导演长版正文 — Seg1

**Segment 1：悲壮还原 | 00:00-00:10 | VGU-01 | A01-A04**

**A01 [00:00-00:04] 特写固定**
黑屏淡入。烛火在画面右下角前景摇曳，虚化为暖色光斑。士兰跪于冷宫地面，头部低垂，素白旗装在暗调暖光中形成清晰剪影。她缓缓抬起头的过程中，烛火暖光从下方渐次照亮她的面部——先下颌、再嘴唇、最后眼眶。抬头的速度极慢，颈部肌肉逐节运动，每一次脊椎的伸展都可见。烛火随她的呼吸气流微微晃动，光的节奏与呼吸同步。高窗月光从画面上方以冷色漫射补充轮廓。棚拍布景感保留：墙面灰泥纹理、地上深红磨损地毯的边缘、空气中微尘在光柱中缓慢漂浮。

**A02 [00:04-00:07] 特写极慢推镜**
镜头从面部近景向眼唇大特写极慢推进。士兰眼眶渐红——从眼角开始泛粉，向眼白蔓延，最后整个眼眶通红。泪珠在烛光下成形：先在眼睑边缘聚集为光点，然后表面张力拉成椭圆，最后盈满欲滴。嘴唇开始高频微颤，下巴肌肉紧绷，鼻翼微微张合——她在忍哭。镜头推至只容下眼睛和嘴唇。背景全部虚化为暖色光晕。心跳低音鼓"咚——咚——"与弦乐渐紧同步，每一声鼓点对应一次泪珠的微晃。

**A03 [00:07-00:10] 中景低角度微仰**
从地面高度约30cm向上仰拍。士兰猛站起来的瞬间——先是胸腔深吸一口气可见的扩张，然后她开口，嗓音在破音边缘："陛下，你害得士兰好苦啊！！！！"。身体从跪姿爆发为站姿，裙摆滞后0.3秒才扬起。双臂后摆，身体前倾约30°。烛火在她身后剧烈摇曳。低角度让她的身影在暖色光中显得高大而孤立。台词喊完后0.5秒完全静止——悲壮感悬在空中。背景中，泡沫柱（Zone B左）的仿石纹理在烛光下隐约可见——观众此刻不知道它是假的。

**A04 [00:10-00:10] 侧面跟拍慢镜头**
慢镜头（升格）。士兰身体前倾加速进入全速冲刺。泪珠从眼眶脱离——一颗、两颗、三颗——在空中飞散成拉长的水滴粒子轨迹。发丝从两把头中散出向后飘起，旗装裙摆扬飞至近乎水平。镜头从侧面跟拍，与士兰同步向北移动。泡沫柱在画面正前方从远景→中景→近景快速逼近，仿石纹理越来越清晰。额距柱面约10cm时画面定格——BGM在峰值保持——然后0s硬切到Seg2。

---

## Segment 2：泡沫穿帮（00:10-00:20）

### segment_technical_control_block — Seg2

```yaml
segment_id: Seg2
timecode: "00:10-00:20"
duration_seconds: 10
beat_ref: B01b
beat_purpose: 一秒钟粉碎悲壮，完成第一次预期违背
primary_vgu_ids: [VGU-01]
covered_units: [U04, U05, U06]
covered_shots: [B01, B02, B03, B04]
continuity_in: ←Seg1 A04冲刺动势，0s硬切，动势方向向北保持不变
continuity_out: 士兰坐地盯便利贴→Seg3爬起拍灰，0s切
next_handoff: B04坐地姿势+懵圈表情→Seg3 C01爬起动作直接承接
blocking_continuity:
  default_positions: 泡沫柱Zone B左（撞击后晃动但位置不变），士兰弹回后坐Zone A
  allowed_moves: 士兰弹回坐地后不移动
  forbidden_zones: Zone D不可见
  crossing_rule: 不跨轴
  screen_side_lock: 泡沫柱始终在画面左侧，便利贴在柱面右侧
  eye_line_rule: B01-B02视线向北（盯柱子），B03视线跟便利贴，B04视线回到柱子
  axis_preservation_note: 主轴线不变，镜头仍从南向北
prop_state_continuity:
  opening_state: FP-01（正常外观）
  closing_state: FP-01（恢复静止）+FP-02（便利贴已被阅读）
blocking_execution:
  B01: 士兰撞柱→弹回坐地，泡沫柱Zone B左弹性晃动
  B02: 士兰坐地，面部特写，泡沫柱在画面左侧背景
  B03: 便利贴大特写，柱面局部
  B04: 士兰坐地中景，盯柱子，泡沫柱左侧恢复静止
prop_state_execution:
  opening_state: 泡沫柱FP-01正常外观
  in_segment_changes: B01撞击→FP-03弹性晃动±15°→士兰弹回→B03揭示FP-02便利贴
  closing_state: FP-01恢复静止，FP-02已被揭示
  visible_evidence: B01柱子晃动可见，B03便利贴字迹清晰，B04柱子静止
expressive_animation_inheritance:
  enabled: false
  note: 泡沫弹性晃动为棚拍物理道具效果，非卡通形变
cinematic_language_inheritance:
  camera_language: 固定中景→面部特写→大特写推镜→中景
  visual_motivation: 先让观众看到撞击弹回的全貌→聚焦表情切换→揭示原因（便利贴）→回到人物反应
  selected_shot_pattern: 预期违背三拍：建立→打破→揭示→反应
dialogue_plan:
  has_dialogue: true
  speakers:
    - character_id: 士兰
      dialogue_text: "……啊？"
      line_intent: 完全懵圈后的第一反应，大脑处理信息失败
      delivery_tone: 极轻，音量约为正常说话的30%，嘴唇微动几乎没出声
      pacing_or_pause: B03便利贴揭示后0.5秒→然后极轻的"啊？"
  no_dialogue_strategy: Seg2前半（B01-B03）无对白，完全由动作、表情和音效驱动
rhythm_continuity:
  intensity_progression: 5（撞击）→3（弹回）→2（懵圈）→1（"啊？"谷底）
  edit_rhythm: B01冲击→B02-B03减速→B04静止
action_continuity: 撞→弹→坐→懵→看便利贴→"啊？"
emotion_continuity: 冲击→困惑→完全懵圈→系统崩溃
space_continuity: 全段在冷宫Zone A/B左，泡沫柱保持位置
audio_direction:
  music: Seg1悲怆BGM在B01撞击瞬间被橡胶玩具挤压声"砰——叽————"拦腰截断，之后3秒完全无声
  ambience: 无（利用无声放大喜剧感）
  foley: 撞击弹回的低频嗡声（持续1秒），便利贴纸角微风"沙"
  silence_or_pause: B01撞击后3秒无声，B03→B04间0.5秒无声
  expressive_audio: 橡胶玩具挤压声为棚拍实物拟音，非卡通合成音效
  segment_audio_bridge_in: ←Seg1 BGM在撞击瞬间被截断
  segment_audio_bridge_out: Seg2结尾无声→保持无声过渡到Seg3，拍灰声打破静默
hero_moment_candidates: []
ending_payoff_hook: 便利贴揭示为全片第一个"道具穿帮"信息锚点
opening_anchor_reference: ←Seg1 A04冲刺（动势承接）
closing_anchor_reference: AF-02（便利贴大特写完成揭示）
storyboard_ref: 故事板提示词_pack_01_v2.md
storyboard_translation_rule:
  sequential_keyframe_reference: true
  preserve_storyboard_progression: true
  inbetween_motion_expansion: true
  readability_priority: true
  do_not_render_storyboard_artifacts: true
model_adaptation:
  preferred_prompt_density: 导演长版完整细节
  visual_reference_mode: 角色说明书板+场景道具总参考图+故事板Pack 01
  motion_control_focus: 柱子弹性晃动的物理节奏+表情1.5秒切换的肌肉运动
  continuity_risk: 低（VGU-01内部）
  negative_prompt_focus: 保持柱子弹性晃动的道具感（是泡沫不是果冻），不夸张变形
reference_images:
  required: [故事板提示词_pack_01_v2（控制版+风格版）]
  usage_order: 同Seg1
shot_plan:
  - shot_id: B01
    related_vgu_id: VGU-01
    timecode_start: "00:10"
    timecode_end: "00:13"
    source_unit_id: U04
    shot_continuity:
      previous_left: A04冲刺至额距10cm
      current_picks_up: 头撞石柱瞬间
      entry_state: 悲壮决绝
      core_action: 撞→柱如泡沫弹性晃动约±15°→人弹回→仰面摔坐地上
      exit_state: 士兰坐地，表情从悲壮→冲击
      next_handoff: 坐地0.3s后→B02特写表情切换
      space_positioning: 泡沫柱Zone B左，士兰弹回后坐Zone A
    visual_goal: 第一次预期违背——用道具物理粉碎悲壮
    camera_direction: 中景平视固定，柱子晃动与人体弹回同时发生在一帧内
    screen_positioning:
      subject_left_right: 泡沫柱画面左侧，士兰从右方撞入→弹回至画面中央偏右坐地
      facing_direction: 撞击方向向北，弹回方向向南
      depth_relation: 泡沫柱前景左→士兰中景→后墙远景
      axis_side: 南向北
    blocking_execution:
      default_positions: 泡沫柱Zone B左固定
      allowed_moves: 士兰弹回后坐地位置
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-01
      in_shot_changes: 撞击触发FP-03（弹性晃动±15°）
      closing_state: FP-03晃动中
      visible_evidence: 柱子左右晃动，表面仿石纹理随晃动产生微光变化
    performance_direction: 撞击瞬间身体接触柱面的0.1秒→柱面凹陷→弹性回弹→士兰身体向后飞出→仰面摔坐。整个物理链条约1秒
    audio_direction: 橡胶玩具挤压声"砰——叽————"+柱子震颤低频嗡（1秒），BGM被截断后3秒无声
    negative_constraints: 不出现写实撞击伤害，士兰不流血不骨折，仅为弹回坐地的无害后果

  - shot_id: B02
    related_vgu_id: VGU-01
    timecode_start: "00:13"
    timecode_end: "00:15"
    source_unit_id: U05
    shot_continuity:
      previous_left: B01弹回坐地
      current_picks_up: 面部特写，表情切换开始
      entry_state: 冲击（0.2秒）
      core_action: 悲壮→冲击→困惑→完全懵圈（1.5秒连续表情切换）
      exit_state: 完全懵圈，盯柱子
      next_handoff: 视线引导→B03便利贴
      space_positioning: 士兰坐Zone A，面北，泡沫柱在画面左外
    visual_goal: 全片第一个喜剧节奏锚点——1.5秒表情切换
    camera_direction: 面部特写固定，浅景深
    screen_positioning:
      subject_left_right: 士兰面部居中
      facing_direction: 面朝北偏上（盯柱子）
      depth_relation: 面部清晰→背景柱子虚化
      axis_side: 南向北
    blocking_execution:
      default_positions: 坐姿，手撑地面
      allowed_moves: 面部肌肉运动
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-03晃动尾声
      in_shot_changes: 柱子晃动逐渐静止
      closing_state: FP-01恢复静止
      visible_evidence: —
    performance_direction: 眉毛从紧锁→高扬（眉头上挑约3mm），嘴从呐喊大张→闭合→0.5秒后微张O形。整个表情切换1.5秒，在0.8秒处完成悲壮→困惑的转折
    audio_direction: 无声（3秒无声段的最后部分）
    negative_constraints: 表情切换不夸张到搞笑综艺级别，保持真人表演的微妙层次

  - shot_id: B03
    related_vgu_id: VGU-01
    timecode_start: "00:15"
    timecode_end: "00:18"
    source_unit_id: U06
    shot_continuity:
      previous_left: B02士兰盯柱子
      current_picks_up: 便利贴大特写推镜
      entry_state: 观众跟随士兰视线
      core_action: 极慢推镜至便利贴，字迹清晰可读
      exit_state: 便利贴内容完全清晰
      next_handoff: 信息接收→B04士兰反应
      space_positioning: 泡沫柱Zone B左柱面，便利贴贴在柱面右侧
    visual_goal: 揭秘——为什么柱子会弹
    camera_direction: 大特写极慢推镜，从柱面纹理→推至便利贴文字清晰
    screen_positioning:
      subject_left_right: 便利贴居中
      facing_direction: 贴纸正面朝镜头
      depth_relation: 便利贴→柱面纹理（虚化）→背景全虚
      axis_side: 南向北
    blocking_execution:
      default_positions: —
      allowed_moves: —
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-02（便利贴已在柱面）
      in_shot_changes: 无
      closing_state: FP-02已被揭示
      visible_evidence: 黄色便利贴，手写字迹"道具泡沫柱，请勿用力撞击——横店影视城"，纸角微翘，墨水微渗
    performance_direction: 无人物表演（纯道具镜头）
    audio_direction: 极轻的纸角微风"沙"，其余完全无声——用无声放大信息冲击
    negative_constraints: 便利贴文字不出现品牌logo或真实电话号码

  - shot_id: B04
    related_vgu_id: VGU-01
    timecode_start: "00:18"
    timecode_end: "00:20"
    source_unit_id: U06
    shot_continuity:
      previous_left: B03便利贴揭示
      current_picks_up: 士兰坐地盯便利贴
      entry_state: 信息已接收
      core_action: 嘴唇微动→极轻"……啊？"
      exit_state: 系统崩溃→B01 Beat收束
      next_handoff: 坐地姿势→Seg3 C01爬起拍灰（0s切）
      space_positioning: 士兰坐Zone A，泡沫柱Zone B左背景静止
    visual_goal: B01收束——从悲壮到系统崩溃的完整弧线终点
    camera_direction: 中景，士兰坐地+泡沫柱在画面左侧背景，身后冷宫昏暗
    screen_positioning:
      subject_left_right: 泡沫柱画面左侧背景→士兰画面中央偏右坐地
      facing_direction: 面北盯柱子
      depth_relation: 泡沫柱中景左→士兰前景中央→后墙远景
      axis_side: 南向北
    blocking_execution:
      default_positions: 士兰坐Zone A，泡沫柱Zone B左
      allowed_moves: 嘴唇微动
      forbidden_zones: —
      crossing_rule: —
    prop_state_execution:
      opening_state: FP-01恢复静止+FP-02便利贴可见
      in_shot_changes: 无
      closing_state: 同opening_state
      visible_evidence: 柱子恢复静止，便利贴在柱面可辨（远景中为小黄点）
    performance_direction: 嘴唇微动，几乎没出声——"……啊？"音量极轻，像大脑正在处理信息但CPU过热
    audio_direction: 完全无声→"……啊？"极轻→保持无声过渡到Seg3
    negative_constraints: 不夸张到瞪眼张嘴的综艺反应
```

### 导演长版正文 — Seg2

**Segment 2：泡沫穿帮 | 00:10-00:20 | VGU-01 | B01-B04**

**B01 [00:10-00:13] 中景平视固定**
从Seg1 A04的慢镜冲刺0s硬切到撞击瞬间。士兰的额头接触泡沫柱表面——柱面微微凹陷约2cm——然后柱身像高密度泡沫一样弹性晃动，左右摆幅约±15°。同时士兰的身体被弹回，向后飞出约1.5米，仰面摔坐在地上。整个物理链条约1秒完成：撞→柱晃→弹回→摔坐。柱子在晃动时表面仿石纹理随角度变化产生微光变化，露出涂装的质感——远看是石头，近看是喷漆泡沫。背景中，冷宫后墙的灰暗在烛光下保持不动。BGM在撞击瞬间被一个橡胶玩具挤压的高音"砰——叽————"拦腰截断——BGM不是渐弱，是被"切掉"的——然后3秒完全无声。柱子晃动的低频嗡声持续约1秒后消失。

**B02 [00:13-00:15] 面部特写固定**
镜头切到士兰面部特写。1.5秒的表情切换过程：
- 0.0-0.2秒：悲壮决绝的残余——眉头紧锁，眼神炙热
- 0.2-0.5秒：冲击——眉头开始松动，眼神焦点涣散，嘴唇从紧抿变为微张
- 0.5-1.0秒：困惑——眉毛从紧锁过渡到高高扬起（眉头上挑约3mm），嘴从微张过渡到O形，眼神从炙热变为空洞
- 1.0-1.5秒：完全懵圈——所有面部肌肉松弛，眼睛圆睁但不对焦，嘴唇保持微张O形
背景中泡沫柱逐渐静止。完全无声的3秒放大了每一个微表情的变化。

**B03 [00:15-00:18] 大特写极慢推镜**
镜头从柱面纹理极慢推向一张黄色便利贴。便利贴一角微翘，手写字迹随推近越来越清晰："道具泡沫柱，请勿用力撞击——横店影视城"。浅景深让背景石纹全部虚化，只有便利贴是清晰的。墨水微微渗透纸张——是真实的圆珠笔手写。纸角在极微的空气中轻轻颤动。完全无声，只有便利贴纸角"沙"的极轻摩擦声。推镜的速度极慢，给观众3秒时间读完、消化、然后开始和士兰一起懵。

**B04 [00:18-00:20] 中景**
切回士兰。她坐在地上，身体后仰约15°，双腿自然分开，手撑地面。泡沫柱在她左侧背景，已经完全恢复静止，便利贴作为一个小黄点可辨。她的嘴唇动了动——几乎没出声，音量约为正常说话的30%——"……啊？"。声音轻到像在问自己。身后冷宫在烛火下昏暗而空旷。画面保持2秒静止，然后0s切到Seg3——她即将从地上爬起来，拍掉身上的灰。

---

## 可直接复制使用块 — Seg1

```
【全局前导】

将"故事板总板 Pack 01"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作，遵循预备动作→发力→反应→收势的完整弧线。不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。泡沫柱在画面左侧（Zone B左），后墙在正后方，空间布局不变
- 角色锁定：士兰每次出现保持一致——清代妃子，圆润鹅蛋脸，杏眼柳叶眉，素白棉麻旗装，两把头简化版发髻
- 不重复角色：同一镜头内不出现两个士兰
- 画面可读性：动作清晰、角色轮廓可辨、空间锚点稳定、表演时机准确
- 风格锁定：棚拍布景感、定场亮相、完整动作展示、节拍偏稳
- 灯光锁定：烛火暖色主光(2700K)+高窗月光冷补(5600K)，光比3:1，棚拍式轮廓光+人物分区优先
- 负向边界：不套用现代快剪逻辑、不现代化表演、所有冲击效果保持无害化非写实表现

【Segment 1 技术控制块】

segment_id: Seg1
timecode: 00:00-00:10
primary_vgu_ids: [VGU-01]
continuity_in: 黑屏淡入
continuity_out: 冲刺动势向北→Seg2 B01 0s硬切
shot_continuity_refs: [A01, A02, A03, A04]
blocking_continuity: 士兰Zone A中央偏南→向北冲刺路径，泡沫柱Zone B左固定，后墙正后方
prop_state_continuity: 泡沫柱FP-01正常外观（撞击在Seg2发生）
blocking_execution: A01-A02跪Zone A南端→A03站Zone A南端前倾→A04向北全速冲刺
prop_state_execution: 泡沫柱FP-01仿石纹理完整，便利贴尚未入镜
next_handoff: A04冲刺至额距柱面10cm→Seg2 B01撞击直接承接

【Segment 1 导演长版提示词】

Seg1 悲壮还原 | 00:00-00:10 | VGU-01 | 4镜

A01 [00:00-00:04] 特写固定。黑屏淡入。烛火前景虚化暖色光斑。士兰跪冷宫地面，素白旗装，头低垂。极慢抬头——烛火从下颌→嘴唇→眼眶渐次照亮面部。颈部脊椎逐节运动。烛火随呼吸气流微晃。高窗月光冷色补光从上方漫射轮廓。棚拍布景感：灰泥墙面、磨损地毯边、空气中微尘在光柱中漂浮。

A02 [00:04-00:07] 特写极慢推镜。从面部近景推至眼唇大特写。眼眶从眼角泛粉→眼白→全眼通红。泪珠在烛光下成形→盈满欲滴。嘴唇高频微颤，下巴肌肉紧绷，鼻翼微张。浅景深(f/2.8等效)，背景全虚化为暖色光晕。心跳低音鼓"咚——咚——"与弦乐渐紧同步。

A03 [00:07-00:10] 中景低角度微仰。地面高度约30cm向上仰拍。士兰猛站"陛下，你害得士兰好苦啊！！！！"。从跪到站爆发，裙摆滞后0.3秒扬起。双臂后摆，身体前倾30°。烛火剧烈摇曳。台词喊完后0.5秒静止。泡沫柱Zone B左在背景烛光下隐约可见。台词干声+BGM全推至峰值。

A04 [00:10] 侧面跟拍慢镜头(升格)。士兰全速冲刺，泪珠从眼眶脱离飞散成拉长水滴粒子，发丝向后飘起，裙摆扬飞至水平。镜头侧面跟拍同步向北移动。泡沫柱从远景→中景→近景快速逼近，仿石纹理渐清晰。额距柱面10cm画面定格→0s硬切Seg2。
```

---

## 可直接复制使用块 — Seg2

```
【全局前导】

将"故事板总板 Pack 01"视为本段视频生成的顺序视觉关键帧参考。严格依据故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作。不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

【项目级全局锁定规则】

- 主场景：冷宫棚拍片场。泡沫柱在画面左侧（Zone B左），后墙在正后方，空间布局不变
- 角色锁定：士兰每次出现保持一致——清代妃子，圆润鹅蛋脸，杏眼柳叶眉，素白棉麻旗装，两把头简化版发髻
- 不重复角色：同一镜头内不出现两个士兰
- 画面可读性：动作清晰、角色轮廓可辨、空间锚点稳定、表演时机准确
- 风格锁定：棚拍布景感、定场亮相、完整动作展示、节拍偏稳
- 灯光锁定：烛火暖色主光(2700K)+高窗月光冷补(5600K)，光比3:1，棚拍式轮廓光+人物分区优先
- 负向边界：不套用现代快剪逻辑、不现代化表演、所有冲击效果保持无害化非写实表现

【Segment 2 技术控制块】

segment_id: Seg2
timecode: 00:10-00:20
primary_vgu_ids: [VGU-01]
continuity_in: ←Seg1 A04冲刺动势，0s硬切，动势方向向北不变
continuity_out: 士兰坐地盯便利贴→Seg3爬起拍灰，0s切
shot_continuity_refs: [B01, B02, B03, B04]
blocking_continuity: 泡沫柱Zone B左固定，士兰弹回坐Zone A
prop_state_continuity: FP-01→FP-03(弹性晃动)→FP-01(恢复静止)+FP-02(便利贴揭示)
blocking_execution: B01撞柱弹回坐地→B02-B04坐Zone A不移动
prop_state_execution: B01撞击FP-03弹性晃动→B03揭示FP-02便利贴→B04 FP-01恢复静止
next_handoff: B04坐地姿势→Seg3 C01爬起拍灰直接承接

【Segment 2 导演长版提示词】

Seg2 泡沫穿帮 | 00:10-00:20 | VGU-01 | 4镜

B01 [00:10-00:13] 中景平视固定。从Seg1冲刺0s硬切。士兰额头接触泡沫柱→柱面微凹2cm→柱身弹性晃动±15°→人弹回飞出约1.5米→仰面摔坐地上。整个物理链条约1秒。柱面仿石纹理随角度变化露出喷漆泡沫涂装质感。BGM被橡胶玩具挤压声"砰——叽————"拦腰截断（非渐弱，是被切掉）→3秒完全无声。柱子低频嗡声持续1秒后消失。

B02 [00:13-00:15] 面部特写固定。1.5秒表情切换：悲壮(0-0.2s:眉紧锁眼炙热)→冲击(0.2-0.5s:眉松动眼神涣散)→困惑(0.5-1.0s:眉高扬嘴O形)→完全懵圈(1.0-1.5s:所有肌肉松弛眼不对焦)。眉毛从紧锁到高扬，嘴从紧抿到大张到O形。3秒无声放大每个微表情。

B03 [00:15-00:18] 大特写极慢推镜。从柱面纹理推至黄色便利贴。纸角微翘，圆珠笔手写字迹："道具泡沫柱，请勿用力撞击——横店影视城"。墨水微渗。浅景深背景全虚。推镜速度极慢，给3秒读完。仅纸角"沙"极轻摩擦声。

B04 [00:18-00:20] 中景。士兰坐地，身体后仰约15°，双腿自然分开，手撑地面。泡沫柱左侧背景已完全静止，便利贴小黄点可辨。嘴唇微动几乎无声："……啊？"身后冷宫在烛火下昏暗空旷。保持2秒静止→0s切Seg3。
```
