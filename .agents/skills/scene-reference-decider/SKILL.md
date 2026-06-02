---
name: scene-reference-decider
description: 当用户要为 SceneForge 项目裁定“按原著母题还是具体影视版本参考”、并输出后续设计与改编可执行边界时应使用此技能。
---

# scene-reference-decider

负责把选题输入正式裁定成可执行的参考边界。输出不仅是 `reference_type`，还必须给出后续阶段可直接消费的保留约束和规避约束。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-reference-decider`
- 已完成选题评分，需要明确本次到底按原著母题、具体影视版本，还是混合参考来执行
- 需要给角色设计和剧本改编阶段提供明确边界
- 项目包含 `source_intake`，需要把视频解析中的保留点、可替换点和禁止照搬点转成参考边界

如果项目还没有完成选题评分，或已经进入资产复用判断，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `topic_scored`，且总控路由的 `next_stage` 为 `scene-reference-decider`。
2. 读取 `scene-topic-gate` 产出的 `source_material`、`risk_notes`、`reuse_hints`。
3. 如果存在 `source_intake.status: analyzed`，优先读取黑板中的 `source_intake.topic_gate_handoff_summary`，并按需读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
4. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有参考边界无法判断时才读取相关章节，并说明原因。
5. 读取 `references/output-contract.md`，确认 `reference_type` 枚举、边界结构和状态推进规则。
6. 裁定本次 `reference_type`：
   - `original_work`
   - `specific_adaptation`
   - `hybrid_reference`
7. 生成结构化 `reference_boundary`，明确主参考、辅助参考、允许继承项和禁止继承项。
8. 将 `source_intake.content_priority_map` 转成参考边界：
   - `core_must_keep` → `must_keep`
   - `highlight_should_keep` → `should_keep`
   - `safe_to_replace` → `allowed_to_rewrite`
   - `avoid_copying` → `must_avoid`
9. 输出单个 YAML 补丁块，并给出 `risk_notes` 和 `next_action`。
10. 将顶层索引更新建议交回总控 Skill：写入 `reference_type`，推进 `project_status: reference_decided`，推进 `next_stage: scene-asset-checker`。

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
- 不得照搬源视频中具体受保护台词、具体镜头组合、人物身份、品牌、平台水印或强识别表达。
- `avoid_copying` 优先级高于普通 `must_keep`。
- 如果 `source_intake.assetization.candidate_for_assetization` 为 `true`，只能保留为后续建议，不得自动创建 source asset。

## 关键规则

- 只执行当前 `next_stage`，不得跳过资产检查阶段或直接进入设计阶段。
- `source_material.source_type` 是输入来源描述，不等于最终 `reference_type`。
- “未定”不进入 `reference_type` 枚举，用补丁 `status` 表达。
- `hybrid_reference` 是正常业务结果，只要边界清楚就可以 `completed`。
- 参考边界必须吸收 `source_intake` 的保留、替换和规避建议。
- `blocker_note` 只在真实阻塞时由总控 Skill 写入；普通风险只留在 `risk_notes`。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：字段协议、固定分类、状态推进和示例
