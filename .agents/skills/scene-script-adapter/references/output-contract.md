# scene-script-adapter 输出协议

本文件定义 `scene-script-adapter` 的改编档位、Story Beat 结构、时长分段确认、补丁结构、黑板摘要边界和长正文落盘方式。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

## 阶段定位

`scene-script-adapter` 位于：

```text
scene-design-builder
-> scene-script-adapter
-> scene-performance-director
```

本阶段负责把参考边界和角色/场景设定转化为可拍、可表演、可分镜的剧本版本。

v3 起，本阶段必须先确认整片目标时长、单段视频生成时长和分段策略，再输出正式剧本与 `story_beats`。

---

# 一、确认闸门

本阶段默认不能直接落盘正式剧本。必须先输出剧本方案预览，并等待用户确认。

剧本方案预览至少包含：

- 目标总时长候选，例如 30 秒、40 秒、60 秒
- 单段视频生成时长候选，例如 10 秒、15 秒或混合分段
- 改编档位候选
- 演绎风格候选
- Story Beat 草案
- 关键保留点
- 主动重写点
- 潜在 Hero Moment
- 对分镜阶段的桥接需求提示
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-script-adapter
version: 3
status:
updated_at:
summary:
data:
```

---

# 三、改编档位

- `original_preserve`
- `mostly_preserve`
- `partial_rewrite`
- `reconstruct_expand`

---

# 四、演绎风格

由本阶段最终确认并写入顶层 `performance_style`：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

---

# 五、`data` 结构

```yaml
data:
  script_confirmation:
    confirmed_by_user: false
    confirmation_note:
  adaptation_level:
  performance_style:
  target_total_duration_seconds:
  segment_strategy:
    segment_duration_seconds:
    segment_count:
    segmentation_mode:
    rationale:
  script_summary:
  preserved_elements:
    - category:
      note:
  rewritten_elements:
    - category:
      note:
  story_beats:
    - beat_id:
      title:
      function:
      beat_summary:
      emotion_goal:
      dramatic_question:
      visual_focus:
      action_focus:
      performance_hint:
      rhythm_hint:
      sound_hint:
      target_duration_seconds:
      payoff_seed:
      potential_hero_moment: false
      bridge_need:
  hero_moment_candidates:
    - hero_id:
      title:
      related_beat:
      reason:
      visual_payoff:
  script_file:
  performance_handoff:
    acting_note:
    micro_expression_note:
    pause_note:
    character_reaction_note:
  storyboard_hints:
    pacing_note:
    visual_escalation_note:
    shot_priority_note:
    bridge_shot_need:
    blocking_note:
    prop_state_note:
  risk_notes:
  next_action:
```

---

# 六、字段说明

- `script_confirmation`：记录用户是否确认剧本方案。正式落盘时应为 `confirmed_by_user: true`。
- `adaptation_level`：本次最终改编档位。
- `performance_style`：本次最终演绎风格，同时回写顶层。
- `target_total_duration_seconds`：整条视频目标总时长，不等于单个 Segment 时长。
- `segment_strategy`：剧本阶段确认的分段策略，供分镜和视频提示词继承。
- `script_summary`：供黑板与后续阶段读取的剧本摘要。
- `preserved_elements`：必须保留的内容列表。
- `rewritten_elements`：本次主动重写或强化的内容列表。
- `story_beats`：面向表演导演和分镜阶段的叙事情绪节拍列表。
- `potential_hero_moment`：该 Story Beat 是否可能成为看点镜头。最终 Hero Shot 由分镜阶段确认。
- `bridge_need`：该 Beat 是否需要在进入下一个 Beat 或 Segment 时设计桥接。
- `hero_moment_candidates`：候选看点，不绑定具体样例，应根据当前项目剧情动态生成。
- `script_file`：完整剧本正文路径。
- `performance_handoff`：交给 `scene-performance-director` 的表演提示。
- `storyboard_hints`：交给 `scene-storyboard-director` 的节奏、视觉升级、桥接、Blocking 和道具状态提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

---

# 七、轻结构约束

`preserved_elements` 与 `rewritten_elements` 使用同一轻结构：

```yaml
- category:
  note:
```

推荐分类：

- `台词表达`
- `情绪核心`
- `剧情骨架`
- `动作设计`
- `角色反应`
- `喜剧机制`
- `节奏推进`
- `声音提示`
- `空间调度`
- `道具状态`

---

# 八、Story Beat 结构

```yaml
story_beats:
  - beat_id:
    title:
    function:
    beat_summary:
    emotion_goal:
    dramatic_question:
    visual_focus:
    action_focus:
    performance_hint:
    rhythm_hint:
    sound_hint:
    target_duration_seconds:
    payoff_seed:
    potential_hero_moment: false
    bridge_need:
```

## `function` 枚举

- `setup`
- `escalation`
- `misdirection`
- `reveal`
- `payoff`
- `release`
- `transition`

## 说明

- `beat_id`：节拍编号，如 `B01`、`B02`。
- `title`：节拍短标题。
- `function`：该节拍承担的叙事功能。
- `beat_summary`：该节拍发生什么。
- `emotion_goal`：观众此刻应该感到什么。
- `dramatic_question`：该节拍制造或回答的问题。
- `visual_focus`：后续分镜最该抓的画面焦点。
- `action_focus`：最关键的可拍动作。
- `performance_hint`：交给表演导演的角色表演提示。
- `rhythm_hint`：节奏提示，例如停顿、加速、反应延迟、爆点。
- `sound_hint`：声音提示，例如静默、拟音、音乐进入点。
- `target_duration_seconds`：该 Beat 的目标叙事时长。
- `payoff_seed`：为后续反转、爆点或情绪释放埋下的种子。
- `potential_hero_moment`：提示该 Beat 是否可能成为后续 Hero Shot。
- `bridge_need`：提示该 Beat 与相邻 Beat / Segment 是否需要桥接分镜。

## 必答问题

每个 Story Beat 必须回答：

1. 这个节拍推动了什么？
2. 观众此刻应该感到什么？
3. 角色此刻的心理状态是什么？
4. 这个节拍为后面埋了什么？
5. 这个节拍如何被表演、镜头和声音表达？
6. 这个节拍是否可能成为 Hero Moment？
7. 这个节拍与相邻段落是否需要桥接？

---

# 九、三层时间模型

必须区分：

```text
Story Beat Duration
Shot Duration
Segment Duration
```

## Story Beat Duration

叙事/情绪节奏。

由本阶段初步给出。

## Shot Duration

导演分镜节奏。

由 `scene-storyboard-director` 决定。

## Segment Duration

视频生成技术切片。

通常是 10 秒、15 秒或经用户确认的混合分段。

注意：

```text
segment_duration_seconds 不是整片时长。
```

本阶段必须先确认 `target_total_duration_seconds` 与 `segment_strategy`，否则不得正式落盘剧本。

---

# 十、黑板摘要建议

黑板补丁至少应说明：

- 用户是否确认剧本方案
- 本次改编档位
- 最终演绎风格
- 目标总时长
- 单段视频生成时长与分段模式
- 剧本摘要
- Story Beat 数量和每个 Beat 的功能
- 潜在 Hero Moment
- 桥接分镜需求
- 关键保留点
- 关键重写点
- 完整剧本正文路径
- 表演导演阶段需要继承的提示

`summary` 使用中文。

关键档位和演绎风格建议采用“中文显示名（英文参数值）”。

---

# 十一、长正文落盘

完整剧本写入：

```text
details/script_v*.md
```

黑板只保留摘要和路径，不直接塞完整正文。

---

# 十二、阻塞规则

只要用户已确认剧本方案，并且能明确给出改编档位、演绎风格、可执行剧本主线、目标总时长、分段策略和 Story Beat，就不应阻塞。

即使完整台词还需后续润色，也可以先完成本阶段。

只有在以下情况下才使用 `status: blocked`：

- 用户尚未确认时长 / 分段 / 剧本方案，且当前阶段必须等待确认
- 参考边界冲突，无法决定保留与重写范围
- 完全无法形成 Story Beat
- 无法判断整片目标时长或单段视频生成策略

---

# 十三、示例

```yaml
patch_type: scene-script-adapter
version: 3
status: completed
updated_at: 2026-06-02
summary: 本次采用部分改写型（`partial_rewrite`），并最终确认为夸张搞笑化（`exaggerated_comedy`）路线，目标 30 秒，按 10 秒分为 3 段，已产出 3 个 Story Beat。
data:
  script_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户确认 30 秒总时长、10 秒固定分段和部分改写方案。
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  target_total_duration_seconds: 30
  segment_strategy:
    segment_duration_seconds: 10
    segment_count: 3
    segmentation_mode: fixed_10s
    rationale: 每段承载一个主要情绪推进点，便于后续拼接。
  script_summary: 保留冲突升级的基础结构，强化角色反应、停顿和喜剧释放。
  preserved_elements:
    - category: 情绪核心
      note: 保留主角判断正确但不被理解的委屈与急切。
  rewritten_elements:
    - category: 角色反应
      note: 强化配角错愕、主角克制和群体误会扩散。
  story_beats:
    - beat_id: B01
      title: 异常出现
      function: setup
      beat_summary: 异常目标接近，主角先于众人察觉问题。
      emotion_goal: 建立轻微悬疑和喜剧预判。
      dramatic_question: 主角能否让大家相信他的判断？
      visual_focus: 主角警觉眼神和其他人迟钝反应的并置。
      action_focus: 主角身体前倾但没有立刻出手。
      performance_hint: 眼神先锁定目标，再扫视同伴，嘴角压住焦急。
      rhythm_hint: 出手前保留半秒停顿。
      sound_hint: 音乐轻微收窄，保留衣料和手指动作拟音。
      target_duration_seconds: 10
      payoff_seed: 其他人没有注意异常，为后续误会升级埋点。
      potential_hero_moment: false
      bridge_need: 需要用视线或声音钩子交给下一段。
  hero_moment_candidates:
    - hero_id: H01
      title: 关键反转或情绪爆点
      related_beat: B03
      reason: 该处承担观众记忆点和转发点。
      visual_payoff: 通过特写、停顿和动作释放强化。
  script_file: details/script_v1.md
  performance_handoff:
    acting_note: 强化主角克制与配角迟钝的反应差。
    micro_expression_note: 主角多用眼神、嘴角和呼吸泄露情绪。
    pause_note: 每次误会爆发前保留可见停顿。
    character_reaction_note: 配角反应要逐轮升级，但不能脱离身份。
  storyboard_hints:
    pacing_note: 每个 Beat 可以拆成多个镜头，但不能用 Segment 替代 Beat。
    visual_escalation_note: 视觉反应从小到大逐步升级。
    shot_priority_note: 优先保留主角眼神特写和群体反应宽镜头。
    bridge_shot_need: 段落之间需要保留动作、视线或声音钩子。
    blocking_note: 继承设计阶段的空间区域和阵营关系。
    prop_state_note: 关键道具状态变化需在分镜中可见。
  risk_notes:
    - 夸张反应不能滑向具体影视演员模仿。
  next_action: 进入 scene-performance-director，基于 story_beats 设计角色表演。
```

---

# 十四、阶段推进建议

完成后建议推进：

```yaml
project_status: script_ready
next_stage: scene-performance-director
```

顶层建议写入或更新：

```yaml
adaptation_level:
performance_style:
target_total_duration_seconds:
segment_duration_seconds:
segment_strategy:
user_confirmations:
  duration_strategy_confirmed: true
  script_plan_confirmed: true
```
