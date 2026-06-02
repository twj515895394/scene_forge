# scene-performance-director 输出协议

本文件定义 `scene-performance-director` 的输出形态、表演表字段、Hero/Bridge/Blocking/道具状态承接、黑板摘要边界和长内容落盘方式。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

## 阶段定位

`scene-performance-director` 位于：

```text
scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
```

它不是剧本阶段，也不是分镜阶段，而是连接二者的表演导演层。

目标：

```text
把文字剧本节拍转化为动画电影级角色表演方案。
```

---

# 一、上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-design-builder`：角色设定、视觉语言、角色轮廓、表情系统、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`script_file`、`storyboard_hints`、`segment_strategy`、`hero_moment_candidates`
- 顶层索引：`performance_style`、`production_level`、`target_total_duration_seconds`、`segment_duration_seconds`、`segment_strategy`

---

# 二、输出路径

完整表演表写入：

```text
details/performance_sheet_v*.md
```

黑板只记录摘要和路径，不直接塞完整表演表正文。

---

# 三、阶段补丁壳

```yaml
patch_type: scene-performance-director
version: 2
status:
updated_at:
summary:
data:
```

---

# 四、`data` 结构

```yaml
data:
  performance_version:
  performance_style:
  performance_sheet_path:
  performance_summary:
  character_performance_profiles:
    - character_id:
      character_name:
      acting_energy:
      eye_focus_pattern:
      facial_expression_range:
      body_language:
      body_weight:
      hand_action_pattern:
      signature_gesture:
      emotional_leak:
      comedy_reaction_rule:
      blocking_behavior:
      prop_interaction_behavior:
  beat_performance_notes:
    - beat_id:
      emotional_goal:
      main_expression:
      micro_expression:
      eye_action:
      body_action:
      hand_action:
      pause_or_hold:
      secondary_action:
      reaction_timing:
      transition_to_next_beat:
      potential_hero_support:
      bridge_performance_hook:
      blocking_note:
      prop_state_note:
  continuity_rules:
    character_performance_consistency:
    emotional_progression:
    gesture_continuity:
    blocking_continuity:
    prop_interaction_continuity:
  storyboard_handoff:
    camera_focus_suggestions:
    closeup_priority:
    reaction_shot_priority:
    timing_notes:
    hero_moment_support:
    bridge_shot_support:
    blocking_support:
    prop_state_support:
  risk_notes:
  next_action:
```

---

# 五、字段说明

- `performance_version`：本次表演设计版本号。
- `performance_style`：继承并细化顶层 `performance_style`。
- `performance_sheet_path`：完整表演表路径。
- `character_performance_profiles`：角色级表演档案。
- `blocking_behavior`：角色在空间调度中的行为习惯，例如是否主动逼近、保持阵营侧、回避某个区域。
- `prop_interaction_behavior`：角色与关键道具交互时的表演动作和安全边界。
- `beat_performance_notes`：按 Story Beat 输出表演设计。
- `potential_hero_support`：该 Beat 是否需要表演层强化，以支持后续 Hero Shot。
- `bridge_performance_hook`：该 Beat 交给下一 Beat 或 Segment 的表演钩子，例如视线、停顿、动作余势。
- `blocking_note`：该 Beat 中角色站位和移动边界。
- `prop_state_note`：该 Beat 中关键道具状态与表演交互。
- `continuity_rules`：表演、手势、情绪、站位和道具交互的连续性约束。
- `storyboard_handoff`：交给 `scene-storyboard-director` 的镜头提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

每个主要角色至少需要覆盖：

- 眼神策略
- 表情范围
- 身体语言
- 身体重心
- 手部动作模式
- 标志性动作
- 情绪泄露方式
- 喜剧反应规则
- 空间调度行为
- 关键道具交互行为（如适用）

每个关键 Beat 至少需要说明：

- 情绪目标
- 主表情
- 微表情
- 眼神动作
- 身体动作
- 手部动作
- 停顿或保持
- 次级动作
- 反应时间点
- 如何过渡到下一个 Beat
- 是否支持 Hero Moment
- 是否提供 Bridge Shot 的表演钩子
- 是否涉及 Blocking 或道具状态变化

---

# 六、表演设计原则

## 1. 表演必须可拍

不要写抽象词：

```text
角色很紧张
```

要写可拍动作：

```text
角色眼神短暂避开对方，右手拇指反复摩擦袖口，嘴角想笑但压住。
```

## 2. 表演必须分层

建议至少分为：

```text
眼神
脸部
身体
手部
停顿
次级动作
空间位置
道具交互
```

## 3. 动画电影化表演不是大喊大叫

动画电影化表演强调：

- 情绪泄露
- 反应停顿
- 微表情变化
- 角色内心和外在动作的错位
- 喜剧反差
- 温暖情绪释放

## 4. 喜剧需要节奏

喜剧表演必须考虑：

```text
setup
pause
reaction
payoff
```

尤其要标注：

```yaml
pause_or_hold:
reaction_timing:
```

## 5. 标志性动作要稳定

每个主要角色建议有一个稳定的动作锚点。

```yaml
signature_gesture: 紧张时下意识扶帽檐，想掩饰真实情绪。
```

后续分镜和视频提示词都要继承。

## 6. 表演要服务空间和道具连续性

多角色项目中，表演设计不能只写表情和动作，还应说明角色是否保持默认区域、是否跨越冲突线、是否触碰关键道具，以及这些行为如何进入下一段。

---

# 七、黑板摘要建议

黑板补丁至少应说明：

- 表演版本号
- 本次演绎风格
- 完整表演表路径
- 每个主要角色的表演锚点
- 每个关键 Beat 的表演重点
- 分镜阶段必须保留的停顿、特写和反应镜头
- Hero Moment 的表演支撑
- Bridge Shot 的表演钩子
- Blocking / Faction 的表演连续性
- 道具交互连续性规则

---

# 八、阻塞规则

只要有剧本摘要、主要角色和 Story Beat，就不应阻塞。

可以先输出 v1 表演表，再后续细化。

只有在以下情况下才使用 `status: blocked`：

- 主要角色身份完全不明
- 剧本节拍缺失到无法判断表演目标
- 参考边界与角色设定冲突，导致无法确定表演方式

---

# 九、示例

```yaml
patch_type: scene-performance-director
version: 2
status: completed
updated_at: 2026-06-02
summary: 表演导演已完成，按夸张搞笑化（`exaggerated_comedy`）路线为 3 个 Story Beat 设计了眼神、微表情、停顿、反应节奏和空间/道具连续性。
data:
  performance_version: v1
  performance_style: exaggerated_comedy
  performance_sheet_path: details/performance_sheet_v1.md
  performance_summary: 本次表演以“误会升级前的停顿”和“角色反应差异”为核心，强化主角克制、配角错愕和群体反应的喜剧波浪。
  character_performance_profiles:
    - character_id: hero
      character_name: 主角
      acting_energy: restrained_but_reactive
      eye_focus_pattern: 先盯住异常目标，再短暂扫视同伴确认没人理解他。
      facial_expression_range: 从警觉、怀疑、错愕到压住怒气的尴尬笑。
      body_language: 身体前倾但脚步克制，像随时准备行动却被迫压住。
      body_weight: 重心偏前，紧张时肩膀轻微上提。
      hand_action_pattern: 手指轻轻收紧，准备出手前有半秒停住。
      signature_gesture: 每次判断正确但没人相信时，都会短暂抿嘴并侧头吸气。
      emotional_leak: 想保持镇定，但眉头和嘴角先泄露焦急。
      comedy_reaction_rule: 反应比配角慢半拍，形成“他早就知道但说不出来”的喜剧压抑感。
      blocking_behavior: 保持在自己的默认区域，只在剧情需要时短暂前压。
      prop_interaction_behavior: 触碰关键道具前有清晰预备动作，避免突然跳变。
  beat_performance_notes:
    - beat_id: B01
      emotional_goal: 建立主角警觉和旁人迟钝之间的反差。
      main_expression: 眼睛微眯，嘴角收紧。
      micro_expression: 眉毛先压低再迅速放松，假装没事。
      eye_action: 先看目标，再看同伴，再回到目标。
      body_action: 身体轻微前倾，脚尖转向目标。
      hand_action: 手指收紧但没有真正出手。
      pause_or_hold: 出手前保留 0.5 秒停顿。
      secondary_action: 背景角色还在轻松吃东西或聊天。
      reaction_timing: 主角先反应，其他角色晚 1 秒才注意到他的异常。
      transition_to_next_beat: 停顿被打断，误会开始升级。
      potential_hero_support: false
      bridge_performance_hook: 用视线方向和身体前倾交给下一段。
      blocking_note: 角色保持在默认区域，不无动机跨区。
      prop_state_note: 关键道具仍处于初始状态。
  continuity_rules:
    character_performance_consistency: 主角始终保持先观察再压制情绪的表演逻辑。
    emotional_progression: 从警觉到焦急，再到无奈爆发。
    gesture_continuity: 抿嘴侧头吸气作为主角被误解时的重复动作锚点。
    blocking_continuity: 角色空间变化必须由动作和剧情触发。
    prop_interaction_continuity: 道具状态变化必须有可见表演动作支撑。
  storyboard_handoff:
    camera_focus_suggestions: B01 必须给主角眼神特写，B02 必须给群体反应宽镜头。
    closeup_priority: 主角微表情、配角错愕反应。
    reaction_shot_priority: 每次误会升级后必须有 1 个反应镜头。
    timing_notes: 喜剧停顿不能被剪掉，尤其是出手前半秒。
    hero_moment_support: 候选 Hero Moment 需要保留表演停顿和反应镜头。
    bridge_shot_support: 段落之间用视线、动作余势或停顿承接。
    blocking_support: 分镜需继承角色默认区域和禁止区域。
    prop_state_support: 分镜需让关键道具状态变化可见。
  risk_notes:
    - 不模仿具体影视演员的表情或动作习惯。
  next_action: 进入 scene-storyboard-director，基于 performance_sheet_v1.md 设计镜头和反应节奏。
```

---

# 十、阶段推进建议

完成后建议推进：

```yaml
project_status: performance_ready
next_stage: scene-storyboard-director
```
