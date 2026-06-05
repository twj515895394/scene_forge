---
name: scene-reference-decider
description: 当用户要为 SceneForge 项目裁定“按原著母题还是具体影视版本参考”、并输出后续设计与改编可执行边界时应使用此技能。
---

# scene-reference-decider

负责把选题输入正式裁定成可执行的参考边界。输出不仅是 `reference_type`，还必须给出后续阶段可直接消费的保留约束和规避约束。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-reference-decider`
- 已完成选题评分，需要明确本次到底按原著母题、具体影视版本，还是混合参考来执行
- 需要给故事骨架、角色设计和剧本改编阶段提供明确边界
- 项目包含 `source_intake`，需要把视频解析中的保留点、可替换点和禁止照搬点转成参考边界

如果项目还没有完成选题评分，或已经进入故事骨架开发阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `topic_scored`，且总控路由的 `state.next_stage` 为 `scene-reference-decider`。
2. 读取 `scene-topic-gate` 产出的 `source_material`、`risk_notes`、`reuse_hints`、`script_strategy` 和 `creative_direction_context`。
3. 如果 `script_strategy.mode = rewrite_adaptation` 且项目来自视频源，则进入本阶段前 `source_intake.adaptation_selection.status` 必须已经是 `selected`；若不是，则说明总控路由有缺口，应停止并回退到用户选择 adaptation idea。
4. 如需判断是否读取 source intake，先遵循 `.agents/skills/scene-forge/references/optional-source-intake-rule-v6.md`。
5. 如果存在 `source_intake.status: analyzed`，优先读取黑板中的 `source_intake.topic_gate_handoff_summary`，并按需读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
6. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有参考边界无法判断时才读取相关章节，并说明原因。
7. 读取 `references/output-contract.md`，确认 `reference_type` 枚举、边界结构和状态推进规则。
8. 裁定本次 `reference_type`：
   - `original_work`
   - `specific_adaptation`
   - `hybrid_reference`
9. 生成结构化 `reference_boundary`，明确主参考、辅助参考、允许继承项和禁止继承项。
10. 生成 `creative_direction_context`，统一说明本次项目走 `rewrite_adaptation` 还是 `preserve_original`，以及是否存在已选 adaptation idea。
11. 将 `source_intake.content_priority_map` 转成参考边界：
   - `core_must_keep` → `must_keep`
   - `highlight_should_keep` → `should_keep`
   - `safe_to_replace` → `allowed_to_rewrite`
   - `avoid_copying` → `must_avoid`
12. 输出单个 YAML 补丁块，并给出 `risk_notes` 和 `next_action`。
13. 将黑板索引更新建议交回总控 Skill：更新 `project_config.reference_type`、`stage_index.reference`、`cross_stage_summary`，并推进 `state.project_status: reference_decided` 与 `state.next_stage: scene-story-development`。

## source_intake 继承规则

如果项目来自视频源输入，本阶段必须显式区分：

```yaml
source_intake_reference_use:
  source_intake_used: true
  files_read:
  inherited_core:
  inherited_highlights:
  rewritten_or_replaced:
  avoid_copying:
```

规则：

- 可以继承源视频的抽象结构、冲突关系、动作链、情绪转折和可泛化镜头功能。
- 是否保留经典台词、原版对白、具体镜头组合或高识别表达，由当前项目创作目标决定；系统默认不预设保留强度，只在需要时规避字幕版式、平台水印、品牌元素和人物身份绑定。
- `avoid_copying` 优先级高于普通 `must_keep`。
- 如果 `source_intake.assetization.candidate_for_assetization` 为 `true`，只能保留为后续建议，不得自动创建 source asset。

## 剧本模式继承规则

本阶段必须显式输出：

```yaml
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
  selected_adaptation:
    status: selected | bypassed | not_applicable
    selected_idea_id:
    selected_title:
    selection_note:
  downstream_rule:
```

规则：

- `rewrite_adaptation` 时，参考边界需要与用户已选改写方向保持一致。
- `preserve_original` 时，参考边界服务原始剧情/桥段保留，不再发散新的改写方向。
- 该字段供故事骨架、设计、剧本、表演、分镜和视频提示词阶段统一继承。

## 关键规则

- 只执行当前 `state.next_stage`，不得跳过故事骨架阶段或直接进入资产/设计阶段。
- `source_material.source_type` 是输入来源描述，不等于最终 `reference_type`。
- “未定”不进入 `reference_type` 枚举，用补丁 `status` 表达。
- `hybrid_reference` 是正常业务结果，只要边界清楚就可以 `completed`。
- 参考边界必须吸收 `source_intake` 的保留、替换和规避建议。
- 若 `source_intake.status` 不是 `analyzed`，必须忽略 source intake 并按普通 SceneForge 流程执行。
- `blocker_note` 只在真实阻塞时由总控 Skill 写入；普通风险只留在 `risk_notes`。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：字段协议、固定分类、状态推进和示例
- `.agents/skills/scene-forge/references/optional-source-intake-rule-v6.md`：当前可选 source intake 读取触发条件和状态机
