# Video Generation Units v1

```yaml
video_generation_units:
  - vgu_id: VGU-01
    vgu_order: 1
    linked_segment_ids: [Seg1, Seg2]
    source_beat_ids: [B01]
    source_unit_ids: [U01, U02, U03, U04, U05, U06]
    unit_goal: 完成"最严肃的20秒"→建立正剧信任→在最后一帧粉碎
    beat_structure:
      beat_purpose: setup_then_shatter
      action_progression: 跪→抬→喊→冲→撞弹→坐懵→便利贴
      emotion_progression: 压抑→爆发→冲击→困惑
      information_release: 冷宫氛围→悲愤→柱子是泡沫道具→便利贴解释
      space_change: 无(冷宫Zone A/B左)
    rhythm_type: setup_then_shatter
    rhythm_intensity: 3→5→1
    continuity_role: 全片开场VGU，建立所有空间锚点基线
    shot_density: medium
    suggested_shot_count: 9-10
    shot_entry: 黑屏淡入→烛火特写
    shot_exit: 便利贴大特写→士兰坐地中景
    entry_state: 观众不知这是喜剧
    exit_state: 观众已知柱子是泡沫道具；士兰坐地懵圈
    transition_hook: 坐地→爬起拍灰(动势衔接VGU-02)
    continuity_focus: 泡沫柱Zone B左锚定；烛火暖色光+月光冷色补光基线
    opening_anchor_frame_id: AF-01(烛火特写)
    closing_anchor_frame_id: AF-02(便利贴大特写)
    space_continuity_map_id: SCM-01
    target_duration_seconds: 20
    control_priority: high

  - vgu_id: VGU-02
    vgu_order: 2
    linked_segment_ids: [Seg3]
    source_beat_ids: [B02]
    unit_goal: 冷笑不服→二次道具失败→第三方穿帮加倍荒诞
    rhythm_type: medium_escalation
    rhythm_intensity: 4→6
    continuity_role: 巩固"道具穿帮"模式+引入片场元设定
    shot_density: medium
    suggested_shot_count: 5-6
    shot_entry: 士兰从地上爬起
    shot_exit: 场务与士兰对视3秒凝固
    entry_state: 士兰刚经历泡沫柱，不信邪
    exit_state: 纸板柱倒地(保持至VGU-05)；场务出现确认"这是片场"
    transition_hook: 社死愤怒→撞桌发泄(动势衔接VGU-03)
    opening_anchor_frame_id: AF-03(拍灰冷笑中景)
    closing_anchor_frame_id: AF-04(场务泡面特写)
    control_priority: high

  - vgu_id: VGU-03
    vgu_order: 3
    linked_segment_ids: [Seg4, Seg5]
    source_beat_ids: [B03]
    unit_goal: 笑点密度峰值——四道具连环崩溃+蹦床弹飞压轴
    rhythm_type: fast_cutting_peak
    rhythm_intensity: 7→8→8→8→3→9→5
    continuity_role: 全片节奏最密段，多道具状态变化集中发生
    shot_density: highest
    suggested_shot_count: 14-16
    shot_entry: 士兰撞纸桌
    shot_exit: 小鸟星星+旋涡眼→趴地静止
    entry_state: 士兰暴躁发泄
    exit_state: 士兰昏厥趴地；蹦床暴露(TB-04)；绿幕散落(GS-03)
    transition_hook: 趴地→翻身仰面(极慢动作衔接VGU-04)
    opening_anchor_frame_id: AF-05(撞纸桌碎裂)
    closing_anchor_frame_id: AF-06(小鸟星星俯拍)
    control_priority: high

  - vgu_id: VGU-04
    vgu_order: 4
    linked_segment_ids: [Seg6]
    source_beat_ids: [B04]
    unit_goal: 全片唯一正经时刻——情感呼吸+独白+觉醒
    rhythm_type: still_reset
    rhythm_intensity: 1
    continuity_role: 全局节奏复位点。全片最安静段落。
    shot_density: lowest
    suggested_shot_count: 3-4
    shot_entry: 翻身仰面(极慢)
    shot_exit: 猛坐起(0.5s触电式)
    entry_state: 士兰刚经历所有道具失败，精疲力竭
    exit_state: 士兰觉醒——"冷宫的墙一定是真的"
    transition_hook: 猛坐起→移步外墙(动作爆发+空间切换衔接VGU-05)
    opening_anchor_frame_id: AF-07(翻身慢动作)
    closing_anchor_frame_id: AF-08(猛坐起平视)
    control_priority: high

  - vgu_id: VGU-05
    vgu_order: 5
    linked_segment_ids: [Seg7, Seg8]
    source_beat_ids: [B05]
    unit_goal: 希望拉到最高→终极荒诞爆破——LED穿透是Hero Shot
    rhythm_type: slow_build_to_shatter
    rhythm_intensity: 2→3→4→5→7→9→9→0→3
    continuity_role: 全片高潮。2.35:1宽银幕+史诗BGM+突然静音爆破。
    shot_density: medium→high
    suggested_shot_count: 12-14
    shot_entry: 夕阳外墙全景
    shot_exit: 全员鼓掌+士兰昏倒
    entry_state: 士兰深信找到真墙，充满仪式感
    exit_state: LED穿透不可逆；Zone D完全暴露；士兰昏倒
    transition_hook: 昏倒在地→醒来坐椅(时间省略衔接VGU-06)
    opening_anchor_frame_id: AF-09(夕阳石墙广角)
    closing_anchor_frame_id: AF-10(全员鼓掌广角)
    control_priority: highest

  - vgu_id: VGU-06
    vgu_order: 6
    linked_segment_ids: [Seg9]
    source_beat_ids: [B06]
    unit_goal: 释然和解→彩蛋callback双重收尾
    rhythm_type: relaxed_with_comedy_button
    rhythm_intensity: 2→3→1(切黑)→5→7→9→定格
    continuity_role: 全片收束。休息区+养心殿两个新空间。
    shot_density: medium
    suggested_shot_count: 8-10
    shot_entry: 士兰坐导演椅醒来
    shot_exit: 皇上憋笑脸定格→字幕滚屏
    entry_state: 士兰刚经历一切，首次面对镜头
    exit_state: 全片结束
    transition_hook: 无(全片结尾)
    opening_anchor_frame_id: AF-11(休息区中景)
    closing_anchor_frame_id: AF-12(皇上憋笑脸定格)
    control_priority: high
```
