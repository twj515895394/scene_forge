# scene-script-adapter 输出协议

本文件定义 `scene-script-adapter` 的改编档位、Story Beat 结构、补丁结构、黑板摘要边界和长正文落盘方式。

## 阶段定位

`scene-script-adapter` 位于：

```text
scene-design-builder
-> scene-script-adapter
-> scene-performance-director
```

本阶段负责把参考边界和角色/场景设定转化为可拍、可表演、可分镜的剧本版本。

v2 起，本阶段必须输出 `story_beats`，不再只输出轻量 `scene_beats`。

---

# 一、阶段补丁壳

```yaml
patch_type: scene-script-adapter
version: 2
status:
updated_at:
summary:
data:
```

---

# 二、改编档位

- `original_preserve`
- `mostly_preserve`
- `partial_rewrite`
- `reconstruct_expand`

---

# 三、演绎风格

由本阶段最终确认并写入顶层 `performance_style`：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

---

# 四、`data` 结构

```yaml
data:
  adaptation_level:
  performance_style:
  target_total_duration_seconds:
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
  risk_notes:
  next_action:
```

---

# 五、字段说明

- `adaptation_level`：本次最终改编档位。
- `performance_style`：本次最终演绎风格，同时回写顶层。
- `target_total_duration_seconds`：整条视频目标总时长，不等于单个 Segment 时长。
- `script_summary`：供黑板与后续阶段读取的剧本摘要。
- `preserved_elements`：必须保留的内容列表。
- `rewritten_elements`：本次主动重写或强化的内容列表。
- `story_beats`：面向表演导演和分镜阶段的叙事情绪节拍列表。
- `script_file`：完整剧本正文路径。
- `performance_handoff`：交给 `scene-performance-director` 的表演提示。
- `storyboard_hints`：交给 `scene-storyboard-director` 的节奏、视觉升级和镜头优先级提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

---

# 六、轻结构约束

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

---

# 七、Story Beat 结构

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

## 必答问题

每个 Story Beat 必须回答：

1. 这个节拍推动了什么？
2. 观众此刻应该感到什么？
3. 角色此刻的心理状态是什么？
4. 这个节拍为后面埋了什么？
5. 这个节拍如何被表演、镜头和声音表达？

---

# 八、三层时间模型

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

通常是 10 秒或 15 秒，由分镜阶段确认。

注意：

```text
segment_duration_seconds 不是整片时长。
```

---

# 九、黑板摘要建议

黑板补丁至少应说明：

- 本次改编档位
- 最终演绎风格
- 目标总时长
- 剧本摘要
- Story Beat 数量和每个 Beat 的功能
- 关键保留点
- 关键重写点
- 完整剧本正文路径
- 表演导演阶段需要继承的提示

`summary` 使用中文。

关键档位和演绎风格建议采用“中文显示名（英文参数值）”。

示例：

```text
本次采用部分改写型（`partial_rewrite`）并最终确认为夸张搞笑化（`exaggerated_comedy`）路线，已产出 3 个 Story Beat。
```

---

# 十、长正文落盘

完整剧本写入：

```text
details/script_v*.md
```

黑板只保留摘要和路径，不直接塞完整正文。

---

# 十一、阻塞规则

只要能明确给出改编档位、演绎风格、可执行剧本主线和 Story Beat，就不应阻塞。

即使完整台词还需后续润色，也可以先完成本阶段。

只有在参考边界冲突、无法决定保留与重写范围，或完全无法形成 Story Beat 时，才使用 `status: blocked`。

---

# 十二、示例

```yaml
patch_type: scene-script-adapter
version: 2
status: completed
updated_at: 2026-06-02
summary: 本次采用部分改写型（`partial_rewrite`），并最终确认为夸张搞笑化（`exaggerated_comedy`）路线，已产出 3 个 Story Beat。
data:
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  target_total_duration_seconds: 30
  script_summary: 保留误会升级的基础冲突结构，强化角色反应、停顿和温暖释放。
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
  risk_notes:
    - 夸张反应不能滑向具体影视演员模仿。
  next_action: 进入 scene-performance-director，基于 story_beats 设计角色表演。
```

---

# 十三、阶段推进建议

完成后建议推进：

```yaml
project_status: script_ready
next_stage: scene-performance-director
```

顶层建议写入：

```yaml
adaptation_level:
performance_style:
target_total_duration_seconds:
story_beat_count:
```
