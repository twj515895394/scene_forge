# Beat Skeleton v1

```yaml
beat_skeleton:
  - beat_id: B01
    beat_order: 1
    beat_purpose: setup——建立极致悲壮氛围，让观众信任"这是正剧"，在最后一帧用物理笑点粉碎
    duration_range_seconds: {min: 18, max: 22}
    action_progression: 跪→抬→含泪→名台词爆发→猛站→全力冲刺→撞泡沫柱→弹回坐地→懵圈→便利贴揭示
    emotion_progression: 压抑→悲愤→爆发→冲击→困惑→系统崩溃
    information_release: 开场建立冷宫氛围→士兰悲愤原因(台词暗示)→柱子是假的→为什么假(便利贴)
    space_change: 无。始终在冷宫Zone A/B左区域。泡沫柱首次亮相。
    continuity_from_previous_beat: 黑屏淡入，无前置Beat
    continuity_to_next_beat: 士兰坐地盯便利贴→爬起拍灰(动势衔接B02)
    suggested_shot_count: 9-10
    suggested_rhythm_type: setup_then_shatter
    suggested_rhythm_intensity: 3→5→1(粉碎点)

  - beat_id: B02
    beat_order: 2
    beat_purpose: escalation——从"不服"到"社死"，第二次道具失败+第三方围观放大荒诞
    duration_range_seconds: {min: 8, max: 12}
    action_progression: 爬起→拍灰→冷笑→转身→敲柱→满意→自信冲刺→撞纸板柱→柱倒→场务穿帮→对视3秒
    emotion_progression: 困惑→冷笑不服→自信→震惊→社死尴尬
    information_release: 第二根柱子也是假的→场务的存在确认"这是片场"
    space_change: 士兰从Zone B左移至Zone B右。纸板柱倒下首次暴露Zone D(仅场务区域)。
    continuity_from_previous_beat: 坐地盯便利贴→爬起拍灰，泡沫柱保持画面左侧
    continuity_to_next_beat: 社死愤怒→撞桌发泄(B03起点)，纸板柱保持倒地状态
    suggested_shot_count: 5-6
    suggested_rhythm_type: medium_escalation
    suggested_rhythm_intensity: 4→6

  - beat_id: B03
    beat_order: 3
    beat_purpose: peak_chaos——全片笑点密度最高段落，连环道具失败+蹦床弹飞作为压轴
    duration_range_seconds: {min: 18, max: 22}
    action_progression: 撞纸桌→自动门飞出→充气香炉瘪→绿幕缠绕滚→挣脱→跳水预备→俯冲→蹦床弹飞8次→趴地→小鸟星星晕倒
    emotion_progression: 暴躁→崩溃→荒诞→认真(跳水pose)→惊恐→愤怒→认命→晕厥
    information_release: 桌子/门/香炉/墙/地板全是道具→蹦床是最后一个
    space_change: 冷宫各区域快速遍历。蹦床Zone C触发暴露(TB-01→TB-04)。
    continuity_from_previous_beat: 士兰因B02场务穿帮而暴躁，快切发泄。纸板柱倒地状态在背景保持。
    continuity_to_next_beat: 脸朝地趴→翻身仰面(极慢动作衔接B04)
    suggested_shot_count: 14-16
    suggested_rhythm_type: fast_cutting_peak
    suggested_rhythm_intensity: 7→8→8→8→3(跳水静止)→9→5(晕倒)

  - beat_id: B04
    beat_order: 4
    beat_purpose: emotional_breather——全片唯一正经时刻，让笑声卡在喉咙里，证明喜剧内核是悲剧
    duration_range_seconds: {min: 8, max: 12}
    action_progression: 翻身→仰躺→望房梁→鸽子飞过→独白→猛坐起
    emotion_progression: 空洞→心酸→觉醒
    information_release: 独白揭示士兰内心——"争了一辈子，连面真的墙都争不到"
    space_change: 无。始终在冷宫地板。极俯拍建立新视角。蹦床撕裂地毯仍可见(连接B03)。
    continuity_from_previous_beat: 脸朝地趴→翻身仰面(2秒慢动作过渡)
    continuity_to_next_beat: 猛坐起→移步外墙(动作爆发衔接B05空间切换)
    suggested_shot_count: 3-4
    suggested_rhythm_type: still_reset
    suggested_rhythm_intensity: 1(全局节奏复位点)

  - beat_id: B05
    beat_order: 5
    beat_purpose: climax——从希望拉到最高再砸到终极荒诞，LED穿透是全片Hero Shot
    duration_range_seconds: {min: 18, max: 22}
    action_progression: 移步外墙→触摸石墙→微笑→画起跑线→拉伸→四格训练蒙太奇→起跑蹲姿→冲刺→闭眼→穿透LED→片场暴露→环顾→导演"保一条"→昏倒→全员鼓掌
    emotion_progression: 希望→仪式感→决绝→平和(闭眼)→空白→崩塌
    information_release: 石墙是真的→但它是LED屏→冷宫就是摄影棚→她的"认真"在别人眼里是"好戏"
    space_change: 冷宫内→外墙(冷暖切换)→LED穿透→片场(Zone D完全暴露，轴线翻转)
    continuity_from_previous_beat: 猛坐起→移步外墙。2.35:1宽银幕切换标志"这次是认真的"。
    continuity_to_next_beat: 昏倒在地→醒来坐椅(时间省略衔接B06)
    suggested_shot_count: 12-14
    suggested_rhythm_type: slow_build_to_shatter
    suggested_rhythm_intensity: 2→3→4→5→7→9→9→0(静音爆破)→3(掌声)

  - beat_id: B06
    beat_order: 6
    beat_purpose: resolution——释然和解+彩蛋callback，双重收尾
    duration_range_seconds: {min: 8, max: 12}
    action_progression: 醒来→坐椅→接水→喝水→看片场→对镜头独白→叠毯→回头调侃→切黑→皇上彩蛋→憋笑四阶段→滑下龙椅→定格
    emotion_progression: 平静→释然→俏皮→爆笑(彩蛋)
    information_release: "不撞了，凑合活吧"主题收束→皇上转发callback
    space_change: 片场休息区(新空间)→养心殿(彩蛋新空间)
    continuity_from_previous_beat: 昏倒→醒来(时间省略，冰袋+毯子为视觉线索)
    continuity_to_next_beat: 无(全片结尾)
    suggested_shot_count: 8-10
    suggested_rhythm_type: relaxed_with_comedy_button
    suggested_rhythm_intensity: 2→3→1(切黑)→5→7→9(滑下)→定格
```

总计: 6 Beat, ~55镜, 90秒
