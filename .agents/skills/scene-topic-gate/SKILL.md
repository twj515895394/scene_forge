---
name: scene-topic-gate
description: 当用户要对 SceneForge 候选片段做选题评分、制作分层、进入制作池/观察池/放弃池判断时应使用此技能。
---

# scene-topic-gate

负责 SceneForge 入口阶段的选题闸门判断。输出应为结构化 YAML 阶段补丁，而不是自然语言结论或旧版 HTML 注释补丁。

## 何时使用

在以下场景使用此技能：

- 用户提供一个经典影视桥段、热点片段或原著母题，想判断是否值得制作
- 总控 Skill 发现项目 `next_stage` 为 `scene-topic-gate`
- 需要根据评分结果决定进入制作、观察池或放弃

如果参考对象边界已经确定、正在做资产复用或剧本改编，不要使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认当前阶段确实处于入口评估阶段。
2. 读取 `references/output-contract.md`，确认输出字段、评分维度和状态推进规则。
3. 收集候选片段名称与来源信息，整理为 `source_material` 结构。
4. 按七维评分规则完成打分，并计算 `total_score`。
5. 产出 `decision`：
   - `go`
   - `observe`
   - `drop`
6. 仅在 `decision = go` 时填写 `production_level`，值限定为 `focus` 或 `fast`。
7. 结合题材判断给出 `performance_style_suggestion`，用于建议正剧、喜剧、夸张搞笑或鬼畜离谱路线。
8. 输出单个 YAML 补丁块，包含中文 `summary`、评分依据、风险提示和复用提示；关键枚举建议在摘要中附英文参数值。
9. 将顶层索引更新建议交回总控 Skill：
   - 写入 `score`
   - 视情况写入 `production_level`
   - 推进 `next_stage`

## 关键规则

- 最低制作门槛为 60 分
- `80+` 进入重点制作池
- `60-79` 进入快速制作池
- `40-59` 进入观察池
- `<40` 进入放弃池
- 只输出结构化 YAML 补丁，不再使用 `<!-- PATCH -->` 注释协议

## 参考资料

- `references/output-contract.md`：字段协议、评分规则、状态推进和示例
- `docs/协议层与选题闸门设计.md`：项目级协议基线
