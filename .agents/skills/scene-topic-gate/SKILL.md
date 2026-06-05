---
name: scene-topic-gate
description: 当用户提供候选片段、影视桥段、热点内容、原著母题、台词梗概、创作想法或来自 scene-video-intake 的 source_intake handoff，并需要判断是否值得进入 SceneForge 制作流程时应使用此技能。
---

# scene-topic-gate

负责 SceneForge 入口阶段的选题闸门判断。输出应为结构化 YAML 阶段补丁，而不是自然语言结论或旧版 HTML 注释补丁。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

## 何时使用

在以下场景使用此技能：

- 用户提供经典影视桥段、热点片段或原著母题
- 用户希望根据某个内容制作视频
- 用户提供链接、截图、剧情梗概或创作想法
- 总控 Skill 发现项目 `state.next_stage` 为 `scene-topic-gate`
- `scene-video-intake` 已完成并生成 `topic_gate_handoff`

如果参考对象边界已经确定、正在做资产复用或剧本改编，不要使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`。
2. 读取 `references/output-contract.md`。
3. 若存在 `source_intake`，优先读取：
   - `topic_gate_handoff_v1.md`
   - `source_video_priority_map_v1.md`
   - `adaptation_ideas_v1.md` 的摘要或黑板中的 `adaptation_ideas_summary`
4. 如果当前创作方向摘要要求 `rewrite_adaptation`，且 `source_intake.adaptation_ideas_summary.user_selection_required: true` 且 `source_intake.adaptation_selection.status != selected`，不得继续评分或推进；输出 `status: blocked`，并要求用户先从 5-10 个改写方向中选择一个。
5. 如果当前创作方向摘要要求 `rewrite_adaptation` 且 `source_intake.adaptation_selection.status: selected`，将 `selected_idea_id`、`selected_title` 和 `selection_note` 作为本阶段正式选题方向，不得重新发散题材。
6. 如果当前创作方向摘要要求 `preserve_original`，不得因 `adaptation_selection` 未选择而阻塞；此时只把 adaptation ideas 作为参考资料。
7. 仅在必要时读取更深层 source intake 文件。
8. 整理 `source_material`。
9. 按七维评分规则完成打分并计算 `total_score`。
10. 产出 `decision`：`go` / `observe` / `drop`。
11. `decision=go` 时填写 `production_level`。
12. 输出 YAML 补丁并返回黑板索引更新建议。

## adaptation selection 规则

如果输入来自 `scene-video-intake` 且已经生成 `adaptation_ideas_v1.md`：

```yaml
source_intake:
  adaptation_ideas_summary:
    user_selection_required: true
  adaptation_selection:
    status: pending | selected | bypassed
```

### 用户未选择

如果当前创作方向摘要要求 `rewrite_adaptation` 且：

```yaml
adaptation_selection:
  status: pending
```

本阶段必须停止，不得评分，不得进入 `scene-reference-decider`。

输出应包含：

```yaml
summary: 等待用户先选择改写方向，暂不继续评分或推进。
board_updates:
  state:
    project_status: draft
    next_stage: scene-topic-gate
    lifecycle_flag: blocked
  cross_stage_summary:
    adaptation_selection_block:
      waiting_for_adaptation_selection: true
      reason: adaptation idea not selected
next_action:
  next_stage: scene-topic-gate
  requires_user_confirmation: true
```

### 用户已选择

如果当前创作方向摘要要求 `rewrite_adaptation` 且：

```yaml
adaptation_selection:
  status: selected
  selected_idea_id:
  selected_title:
```

本阶段必须把所选 idea 作为正式创作方向。

允许基于所选方向做选题评分和制作档位判断。

不得重新推荐新的 5-10 个方向，不得改写为其他题材。

### 使用原始剧本

如果：

```yaml
script_strategy:
  mode: preserve_original
```

则本阶段：

- 允许 `adaptation_selection.status = bypassed`。
- 可以读取 `adaptation_ideas_summary` 作为创意参考，但不得把它作为阻塞条件。
- 输出完成后，总控仍需在进入 `scene-reference-decider` 前确保 `script_strategy.status = selected`。

## source_intake 规则

如果输入来自 `scene-video-intake`：

- 优先使用 handoff，而不是重新解析全部视频。
- 必须记录是否使用了 source intake。
- 必须记录读取了哪些 source intake 文件。
- 必须保留 source intake 给出的风险和替换建议。
- 在 `rewrite_adaptation` 模式下必须继承用户选择的 adaptation idea。
- 在 `preserve_original` 模式下不得强制要求 adaptation idea。
- 不得默认加载全部长解析文件。

## 关键规则

- 只执行当前 `state.next_stage`。
- 最低制作门槛为 60 分。
- `80+` 进入重点制作池。
- `60-79` 进入快速制作池。
- `40-59` 进入观察池。
- `<40` 进入放弃池。
- 只输出结构化 YAML 补丁。
- 禁止默认深读全部 source intake 长文件。
- 若 `script_strategy.mode = rewrite_adaptation` 且 source intake 要求用户选择改写方向，则用户未选前必须阻塞。
- 用户已选择改写方向后，本阶段不得重新发散或替换方向。
- 若 `script_strategy.mode = preserve_original`，本阶段不得因为未选 adaptation idea 而阻塞。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`
