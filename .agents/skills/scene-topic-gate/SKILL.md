---
name: scene-topic-gate
description: 当用户提供候选片段、影视桥段、热点内容、原著母题、台词梗概、创作想法或来自 scene-video-intake 的 source_intake handoff，并需要判断是否值得进入 SceneForge 制作流程时应使用此技能。
---

# scene-topic-gate

负责 SceneForge 入口阶段的选题闸门判断。输出应为结构化 YAML 阶段补丁，而不是自然语言结论或旧版 HTML 注释补丁。

## 何时使用

在以下场景使用此技能：

- 用户提供经典影视桥段、热点片段或原著母题
- 用户希望根据某个内容制作视频
- 用户提供链接、截图、剧情梗概或创作想法
- 总控 Skill 发现项目 `next_stage` 为 `scene-topic-gate`
- `scene-video-intake` 已完成并生成 `topic_gate_handoff`

如果参考对象边界已经确定、正在做资产复用或剧本改编，不要使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`。
2. 读取 `references/output-contract.md`。
3. 若存在 `source_intake`，优先读取：
   - `topic_gate_handoff_v1.md`
   - `source_video_priority_map_v1.md`
4. 仅在必要时读取更深层 source intake 文件。
5. 整理 `source_material`。
6. 按七维评分规则完成打分并计算 `total_score`。
7. 产出 `decision`：`go` / `observe` / `drop`。
8. `decision=go` 时填写 `production_level`。
9. 输出 YAML 补丁并返回顶层索引更新建议。

## source_intake 规则

如果输入来自 `scene-video-intake`：

- 优先使用 handoff，而不是重新解析全部视频。
- 必须记录是否使用了 source intake。
- 必须记录读取了哪些 source intake 文件。
- 必须保留 source intake 给出的风险和替换建议。
- 不得默认加载全部长解析文件。

## 关键规则

- 只执行当前 `next_stage`。
- 最低制作门槛为 60 分。
- `80+` 进入重点制作池。
- `60-79` 进入快速制作池。
- `40-59` 进入观察池。
- `<40` 进入放弃池。
- 只输出结构化 YAML 补丁。
- 禁止默认深读全部 source intake 长文件。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`
