# SceneForge v6.1 Adaptation Ideas Generator 实施计划

## 0. 收敛后的 v6.1 范围

v6.1 不做重型改写 SOP，不做复杂评分矩阵，不新增独立审批系统。

v6.1 只补一个轻量但关键的能力：

```text
source_intake
-> pattern diagnosis
-> replaceable slots
-> 5-10 adaptation ideas
-> user selection required
-> downstream execution
```

核心原则：

```text
AI 负责理解、抽象、发散和推荐。
用户负责选择改写方向。
后续 Agent 只基于用户确认后的方向继续执行。
```

---

## Phase 1 — 资产库层（P0，已完成）

目标：建立少而精的开放参考资产库。

已新增：

```text
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/adaptation-idea-seed-library.md
```

三件套职责：

```text
narrative-pattern-library
回答：这个案例为什么好看？

replaceable-slot-library
回答：哪些结构槽位可以替换？

adaptation-idea-seed-library
回答：可以往哪些方向改？
```

验收状态：

```yaml
narrative_patterns: completed
replaceable_slots: completed
idea_seeds: completed
```

---

## Phase 2 — 协议层（P0）

目标：让 `scene-video-intake` 能正式输出轻量改写方向文件。

需要更新：

```text
.agents/skills/scene-video-intake/references/output-contract.md
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-forge/references/project-board-template.md
README.md
```

新增 source intake 输出文件：

```text
inputs/source_intake/adaptation_ideas_v1.md
```

推荐结构：

```yaml
adaptation_ideas:
  version: v1
  source_pattern_summary:
    core_patterns:
    must_preserve:
    replaceable_slots:
  ideas:
    - idea_id: idea_01
      title:
      seed_type:
      selection_mode: reference | adapted_reference | custom_generated
      summary:
      why_it_works:
      recommended_for:
      user_choice_required: true
  recommendation_note:
  user_selection_required: true
```

验收标准：

- 协议中出现 `adaptation_ideas_v1.md`。
- `read_policy.compact` 包含 adaptation ideas summary。
- `PROJECT_BOARD.md` 只保存 adaptation ideas 摘要和文件路径，不保存完整候选正文。
- 明确：用户未选择前，不得进入正式改写剧本生成。

---

## Phase 3 — scene-video-intake 生成能力（P1）

目标：在完成 source video analysis 与 priority map 后，额外生成 5-10 个改写方向。

生成依据：

```text
source_video_analysis_v1.md
source_video_priority_map_v1.md
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/adaptation-idea-seed-library.md
```

输出要求：

- 生成 5-10 个方向。
- 每个方向只包含：`title`、`summary`、`why_it_works`、`recommended_for`。
- 不生成完整剧本。
- 不生成分镜。
- 不生成 prompt。
- 明确提示用户选择。

验收标准：

```yaml
adaptation_ideas_generated: true
idea_count: 5-10
user_selection_required: true
next_stage_behavior: wait_for_user_selection_or_scene-topic-gate
```

---

## Phase 4 — 用户选择与下游消费（P1）

目标：用户选择某个 idea 后，后续阶段可以继承该方向。

最小实现方式：

在 `PROJECT_BOARD.md` 中记录：

```yaml
adaptation_selection:
  status: selected | pending
  selected_idea_id:
  selected_title:
  selection_note:
```

下游读取：

```text
scene-script-adapter
读取 selected adaptation idea 后再写剧本。

scene-storyboard-director
继承 selected adaptation idea 的题材、核心结构和视觉方向。

scene-video-prompt-builder
继承 selected adaptation idea，不重新发散题材。
```

验收标准：

- 用户未选择时，只能展示候选方向或询问选择。
- 用户选择后，才能进入正式剧本改写。
- 后续阶段不得忽略用户选择重新自创方向。

---

## Phase 5 — 暂缓项

以下不纳入 v6.1 MVP：

```text
upgrade-pattern-library.md
ai-generation-risk-library.md
adaptation-risk-library.md
adaptation-objective-framework.md
adaptation-selection-contract.md
feasibility matrix
quality scoring system
```

原因：

```text
这些会把创作者工作流变成重型企业 SOP。
v6.1 首轮只需要高质量改写方向推荐 + 用户选择。
```

---

## MVP 完成定义

v6.1 MVP 完成时，系统应做到：

```text
输入一个源视频或案例
↓
完成 source_intake
↓
抽象核心叙事模式和可替换槽位
↓
给出 5-10 个改写方向
↓
等待用户选择
↓
用户选择后再进入剧本/分镜/prompt
```

一句话：

```text
v6.1 = Adaptation Ideas Generator，不是重型 Adaptation Workflow Engine。
```
