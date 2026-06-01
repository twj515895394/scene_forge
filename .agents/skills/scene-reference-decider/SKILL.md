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

如果项目还没有完成选题评分，或已经进入资产复用判断，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `topic_scored`。
2. 读取 `scene-topic-gate` 产出的 `source_material`。
3. 读取 `references/output-contract.md`，确认 `reference_type` 枚举、边界结构和状态推进规则。
4. 裁定本次 `reference_type`：
   - `original_work`
   - `specific_adaptation`
   - `hybrid_reference`
5. 生成结构化 `reference_boundary`，明确主参考、辅助参考、允许继承项和禁止继承项。
6. 用“分类 + 说明”的轻结构产出 `must_keep` 和 `must_avoid`。
7. 输出单个 YAML 补丁块，并给出 `risk_notes` 和 `next_action`。
8. 将顶层索引更新建议交回总控 Skill：
   - 写入 `reference_type`
   - 推进 `project_status: reference_decided`
   - 推进 `next_stage: scene-asset-checker`

## 关键规则

- `source_material.source_type` 是输入来源描述，不等于最终 `reference_type`
- “未定”不进入 `reference_type` 枚举，用补丁 `status` 表达
- `hybrid_reference` 是正常业务结果，只要边界清楚就可以 `completed`
- `blocker_note` 只在真实阻塞时由总控 Skill 写入；普通风险只留在 `risk_notes`

## 参考资料

- `references/output-contract.md`：字段协议、固定分类、状态推进和示例
- `docs/协议层与选题闸门设计.md`：项目级协议基线
