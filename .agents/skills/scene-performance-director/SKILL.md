---
name: scene-performance-director
description: 当用户要把 SceneForge 的剧本节拍转化为动画电影级角色表演设计，包括眼神、微表情、肢体动作、停顿、反应节奏和角色标志性动作时应使用此技能。
---

# scene-performance-director

负责把剧本改编结果和 Story Beat 转化为可供分镜阶段直接消费的角色表演方案。

本技能解决的问题不是“角色说什么”，而是“角色如何表演”。

它重点补齐动画电影化路线中最关键的表演层：

- 眼神移动
- 微表情
- 肢体重心
- 手部小动作
- 喜剧停顿
- 情绪泄露
- 标志性动作
- 反应节奏

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-performance-director`
- `scene-script-adapter` 已完成，项目状态为 `script_ready`
- 剧本已经有 `story_beats` 或可供拆解的节拍信息
- 需要把角色表演细化后再进入分镜阶段

如果剧本尚未完成，或角色设定缺失导致无法判断表演方式，不要优先使用本技能。

## 上游输入

采用 `compact` 上下文预算，运行时只读取：

1. 项目 `PROJECT_BOARD.md`
2. 本 Skill 文件
3. `references/output-contract.md`
4. `scene-reference-decider` 的参考边界、保留项和规避项
5. `scene-design-builder` 的角色设定、视觉语言、角色魅力设计、`blocking_map`、`faction_layout` 和 `prop_state_machines`（如有）
6. `scene-script-adapter` 的剧本摘要、完整剧本路径、`story_beats`、改编档位、演绎风格、`segment_strategy`、Hero 候选和 Bridge 需求

运行时禁止读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 为 `script_ready`，且总控路由的 `next_stage` 为 `scene-performance-director`。
2. 读取剧本摘要、完整剧本路径和 `story_beats`。
3. 读取角色设定，提取每个主要角色的性格、轮廓、形状语言和表情梯度。
4. 继承 `segment_strategy`、`hero_moment_candidates`、`storyboard_hints.bridge_shot_need`、`blocking_map`、`faction_layout` 和 `prop_state_machines`，作为后续分镜表演连续性的输入。
5. 按每个角色建立 `character_performance_profile`。
6. 按每个 Story Beat 设计表演目标、眼神、微表情、身体动作、停顿和次级动作。
7. 明确每个角色至少一个 `signature_gesture`。
8. 明确关键 Beat 的 `pause_or_hold`，尤其是喜剧反应、情绪犹豫和情绪释放点。
9. 将完整表演表写入 `details/performance_sheet_v*.md`。
10. 黑板只记录摘要、路径、角色表演概要、Beat 表演重点和连续性规则。
11. 输出单个 YAML 补丁块，并将状态推进到 `performance_ready`，下一阶段为 `scene-storyboard-director`。

## 关键规则

- 只执行当前 `next_stage`，不得跳过剧本阶段或直接进入分镜阶段。
- 不要只写“开心、难过、生气”，必须写具体表演方式。
- 每个主要角色必须有眼神策略、身体重心、表情范围和标志性动作。
- 每个关键 Story Beat 至少要有一个可拍的微表情或停顿设计。
- 表演要服务角色心理和情绪曲线，不只是堆动作。
- 喜剧表演必须包含 setup / pause / payoff 的节奏意识。
- 不模仿具体演员或具体影视角色的表演，只抽象为动画电影级表演原则。
- 表演连续性需要服务后续 Hero Shot、Bridge Shot、Blocking 和道具状态连续性。
- 输出要能被 `scene-storyboard-director` 直接转成镜头。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：表演导演输出协议、黑板摘要字段和长正文落盘方式
