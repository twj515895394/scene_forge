---
name: scene-performance-director
description: 当用户要把 SceneForge 的剧本节拍转化为动画电影级角色表演设计，包括眼神、微表情、肢体动作、停顿、反应节奏、动画物理表演、轻中度卡通伤害反应和角色反差表演时应使用此技能。
---

# scene-performance-director

负责把正式剧本和已确认 Story Beat 转化为可供分镜阶段直接消费的角色表演方案。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

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
- 动画物理表演
- 轻中度卡通伤害反应
- 反差喜剧表演

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-performance-director`
- `scene-script-adapter` 已完成，项目状态为 `script_ready`
- 剧本已经有基于 `scene-story-development` 确认过的 `story_beats`
- 需要把角色表演细化后再进入分镜阶段
- 剧本阶段输出了 `expressive_beat_opportunities`、`stylized_action_opportunities` 或 `contrast_opportunities`，需要转化为可拍表演

如果剧本尚未完成，或角色设定缺失导致无法判断表演方式，不要优先使用本技能。

## 上游输入

采用 `compact` 上下文预算，运行时只读取：

1. 项目 `PROJECT_BOARD.md`
2. 本 Skill 文件
3. `references/output-contract.md`
4. `scene-reference-decider` 的参考边界、保留项、规避项和 `creative_direction_context`
5. `scene-story-development` 的故事骨架摘要、`story_beats`、角色/场景/道具功能
6. `scene-design-builder` 的角色设定、视觉语言、角色魅力设计、`expressive_animation_design`、`blocking_map`、`faction_layout` 和 `prop_state_machines`（如有）
7. `scene-script-adapter` 的剧本摘要、完整剧本路径、`story_beats`、`expressive_beat_opportunities`、`stylized_action_opportunities`、`contrast_opportunities`、改编档位、演绎风格、`segment_strategy`、Hero 候选、Bridge 需求和 `creative_direction_context`

如果当前表演设计需要查找动画物理、轻伤尺度或反差表演模板，可按需读取：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

执行期读取边界同时遵循仓库根 `AGENTS.md`；本阶段只以上述输入和按需资产库为准。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 为 `script_ready`，且总控路由的 `state.next_stage` 为 `scene-performance-director`。
2. 读取剧本摘要、完整剧本路径、`story_beats`、`creative_direction_context` 和表现力扩展机会点。
3. 读取角色设定，提取每个主要角色的性格、轮廓、形状语言、表情梯度和反差边界。
4. 继承项目级表现力扩展策略 `expressive_animation`、`segment_strategy`、`hero_moment_candidates`、`storyboard_hints.bridge_shot_need`、`blocking_map`、`faction_layout`、`prop_state_machines`、`beat_table` 和 `video_generation_unit_plan`，作为后续分镜表演连续性的输入。
5. 按每个角色建立 `character_performance_profile`，并补充动画物理承受度、卡通轻伤反应规则和反差表演规则。
6. 按每个 Story Beat 设计表演目标、眼神、微表情、身体动作、停顿和次级动作。
7. 对 `stylized_action_opportunities`，必须设计 `anticipation → impact → deformation → hold → recovery`，说明变形后如何恢复。
8. 对 `contrast_opportunities`，必须设计 setup、reveal、deadpan 或 reaction timing，说明角色是否自知。
9. 对轻中度卡通伤害，必须说明可见伤害、表演反应、喜剧化方式和禁止的写实痛苦表达。
10. 明确每个角色至少一个 `signature_gesture`。
11. 明确关键 Beat 的 `pause_or_hold`，尤其是喜剧反应、情绪犹豫、反差 reveal 和情绪释放点。
12. 除完整表演表外，同步写出 `details/performance/action_continuity_chains_v*.md` 和 `details/performance/emotion_continuity_chains_v*.md`，把跨 Beat / Segment 延续的动作链和情绪链单独沉淀出来。
13. 将完整表演表写入 `details/performance_sheet_v*.md`。
14. 黑板只记录摘要、路径、角色表演概要、Beat 表演重点、表现力扩展表演设计和连续性规则。
15. 输出单个 YAML 补丁块，并将状态推进到 `performance_ready`，下一阶段为 `scene-storyboard-director`。

## 关键规则

- 只执行当前 `state.next_stage`，不得跳过剧本阶段或直接进入分镜阶段。
- 不要只写“开心、难过、生气”，必须写具体表演方式。
- 每个主要角色必须有眼神策略、身体重心、表情范围和标志性动作。
- 每个关键 Story Beat 至少要有一个可拍的微表情或停顿设计。
- 表演要服务角色心理和情绪曲线，不只是堆动作。
- 喜剧表演必须包含 setup / pause / payoff 的节奏意识。
- 动画物理表演必须写清楚前摇、冲击、变形、停顿和恢复，不能只写“夸张撞飞”。
- 轻中度卡通伤害可以出现灰头土脸、头包、小擦伤、喷鼻血笑点等，但不得写实痛苦化、血腥化或身体恐怖化。
- 反差喜剧表演必须保持角色一致性，不能为了梗让角色崩坏。
- 不模仿具体演员或具体影视角色的表演，只抽象为动画电影级表演原则。
- 表演连续性需要服务后续 Hero Shot、Bridge Shot、Blocking 和道具状态连续性。
- 必须显式产出动作连续性链和情绪连续性链，供分镜和视频提示词阶段继承。
- 必须继承 `creative_direction_context`；`preserve_original` 模式下不得把原始剧情表演重新发散成新题材。
- 输出要能被 `scene-storyboard-director` 直接转成镜头。

## 参考资料

- `references/output-contract.md`：表演导演输出协议、表现力扩展表演字段、黑板摘要字段和长正文落盘方式
