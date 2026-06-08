# Shot Continuity Plan v1

```yaml
shot_continuity_plan:
  # === VGU-01: B01 悲壮开场 ===
  - shot_id: A01
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 黑屏淡入
    current_picks_up: 烛火→士兰跪地低头
    entry_state: 观众零信息
    core_action: 跪地→抬头→含泪
    exit_state: 泪盈眶，嘴唇颤抖，情绪积累至爆发前
    next_handoff: 抬头动势→A02推镜含泪
    continuity_goal: 建立冷宫氛围基线+士兰悲壮情绪

  - shot_id: A02
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 含泪特写积累
    current_picks_up: 推镜加深→眼眶通红→泪珠映烛光
    entry_state: 情绪积累中
    core_action: 泪珠成形→嘴唇高频微颤
    exit_state: 情绪已到临界点
    next_handoff: 情绪爆发→A03名台词
    continuity_goal: 名台词前最后的情感加压

  - shot_id: A03
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 临界情绪
    current_picks_up: 猛站+名台词爆发
    entry_state: 情绪临界点
    core_action: "陛下你害得士兰好苦啊！！！"+从跪到站
    exit_state: 情绪全力释放，身体站直
    next_handoff: 站姿→冲刺(0.3s动势重叠)
    continuity_goal: 全片情绪最高点→下一秒被泡沫柱砸碎

  - shot_id: A04
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 站姿爆发
    current_picks_up: 身体前倾30°冲刺
    entry_state: 全力冲刺
    core_action: 慢镜冲刺+泪珠飞散+发丝飘起+裙摆扬起
    exit_state: 即将撞柱(额距柱面10cm)
    next_handoff: 撞前0.1s→A05固定撞击
    continuity_goal: 冲刺方向向北，石柱在画面正前方

  - shot_id: A05
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 冲刺至10cm
    current_picks_up: 撞击+柱弹性晃动15°+人弹回
    entry_state: 即将撞击(悲壮决绝)
    core_action: 撞→柱晃→弹回→仰面摔坐
    exit_state: 士兰坐地，表情从悲壮→冲击
    next_handoff: 坐地0.3s后→A06特写表情切换
    continuity_goal: 第一次预期违背。柱子Zone B左始终在画面左侧。

  - shot_id: A06
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 弹回坐地
    current_picks_up: 面部特写，表情切换1.5s
    entry_state: 冲击(0.2s)
    core_action: 悲壮→冲击→困惑→完全懵圈(1.5s表情切换)
    exit_state: 完全懵圈，盯柱子
    next_handoff: 视线引导→A07便利贴
    continuity_goal: 表情切换的1.5s是全片第一个喜剧节奏锚点

  - shot_id: A07
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 士兰盯柱子
    current_picks_up: 便利贴大特写推镜
    entry_state: 观众跟随士兰视线
    core_action: 推镜至便利贴"道具泡沫柱，请勿用力撞击——横店影视城"
    exit_state: 便利贴内容清晰可见
    next_handoff: 便利贴→A08士兰反应
    continuity_goal: 揭秘：为什么柱子会弹

  - shot_id: A08
    related_vgu_id: VGU-01
    source_beat_id: B01
    previous_left: 便利贴揭示
    current_picks_up: 士兰坐地盯便利贴
    entry_state: 信息已接收
    core_action: 嘴唇微动"……啊？"
    exit_state: 系统崩溃
    next_handoff: 坐地→A09爬起拍灰
    continuity_goal: B01收束

  # === VGU-02: B02 卷土重来 ===
  - shot_id: A09
    related_vgu_id: VGU-02
    source_beat_id: B02
    previous_left: 坐地懵圈
    current_picks_up: 爬起+拍灰3下(左肩/右肩/裙摆)
    entry_state: 刚经历泡沫柱
    core_action: 站起→拍灰三联→盯泡沫柱冷笑
    exit_state: 冷笑不服
    next_handoff: 转身→A10敲柱
    continuity_goal: 士兰从被动受害者变为主动试探者

  - shot_id: A10
    related_vgu_id: VGU-02
    source_beat_id: B02
    previous_left: 冷笑
    current_picks_up: 移向纸板柱+指节敲三下
    entry_state: 不确定
    core_action: 敲柱"咚咚咚"→停顿0.5s→满意点头
    exit_state: 确认"这是真柱子"
    next_handoff: 自信冲刺→A11撞柱
    continuity_goal: 敲击声为A11倒塌做物理铺垫。士兰从Zone B左→Zone B右。

  - shot_id: A11
    related_vgu_id: VGU-02
    source_beat_id: B02
    previous_left: 满意点头
    current_picks_up: 第二次冲刺+撞纸板柱
    entry_state: 自信满满
    core_action: 冲刺→撞→柱直挺挺倒下(不晃不弹)
    exit_state: 柱子在倒下的过程中
    next_handoff: 柱完全倒地→A12场务暴露
    continuity_goal: 纸板柱倒地后保持此状态至VGU-05(C12)

  - shot_id: A12
    related_vgu_id: VGU-02
    source_beat_id: B02
    previous_left: 柱倒下过程
    current_picks_up: 柱后场务暴露+双人对视
    entry_state: 场务正在吃泡面
    core_action: 场务抬头→面条挂嘴边→筷子悬空→对视3秒→吸面条
    exit_state: 士兰嘴角抽搐
    next_handoff: 社死愤怒→B01撞桌(VGU-03)
    continuity_goal: 首次暴露Zone D(仅场务区域)；柱保持倒地；场务位置锚定

  # === 后续VGU-03至VGU-06镜头交接见完整文件 ===
```

注：完整55镜shot_continuity_plan在正式落盘时展开。此文件展示VGU-01/B01和VGU-02/B02共12镜的完整交接结构，VGU-03至VGU-06遵循相同模式。
