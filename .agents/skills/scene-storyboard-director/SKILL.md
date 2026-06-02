---
name: scene-storyboard-director
description: 当用户要把 SceneForge 剧本节拍和表演导演结果转成具有动画电影感的分镜方案，并沉淀镜头级表演、调度、声音意图与情绪设计时应使用此技能。
---

# scene-storyboard-director

负责把 Story Beat 和表演导演结果转成可执行分镜，强调动画电影化镜头语言，而不是复刻原片拍法。

本阶段需要消费 `scene-performance-director` 产出的表演表，把眼神、微表情、停顿和反应节奏转化为镜头设计。

黑板记录分镜摘要、分段信息和故事板 prompt 路径，完整分镜另行落盘。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-storyboard-director`
- 已完成剧本改编和表演导演，项目状态为 `performance_ready`
- 需要进入镜头级表达设计
- 需要把角色动作、表情、场景调度、光影节奏和声音意图收成可用于后续提示词构建的分镜方案

如果剧本还没定稿、表演表缺失，或已经进入声音导演/提示词构建阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `performance_ready`。
2. 读取剧本摘要、`story_beats`、表演表、设计摘要和参考边界，确认哪些内容必须保留、哪些镜头表达必须规避。
3. 读取 `references/output-contract.md`，确认分镜字段、三层时间模型、黑板摘要和长分镜落盘路径。
4. 先读取顶层 `segment_duration_seconds`；若为空默认按单个视频生成片段 `10` 秒拆段。若判断 10 秒承载不下关键表演，再向用户确认是否改成 `15` 秒。
5. 生成动画电影化分镜，不直接照搬原版拍法。
6. 对每个镜头至少明确动作、表情、调度、情绪功能、导演意图、声音意图和时间轴位置。
7. 产出“每段覆盖哪些镜头和 Story Beat”的 Segment Plan，并写出可直接生成故事板图的 prompt 文件。
8. 将完整分镜写入 `details/shotlist_v*.md`；黑板只记录版本、镜头总览、分段信息、故事板 prompt 路径和关键连续性规则。
9. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
10. 将状态推进建议交回总控 Skill，进入 `scene-audio-director`。

## 关键规则

- 分镜字段至少覆盖镜头编号、所属 Beat、起止时间、时长、景别、机位、镜头运动、角色动作、表情变化、场景调度、光影变化、声音设计、情绪功能、导演意图、转场方式。
- 必须继承 `performance_sheet` 中的眼神、微表情、停顿、标志性动作和反应节奏。
- 不照搬原版拍法，要用动画电影化的表演、节奏、视角和情绪调度重构名场面。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 一个 Segment 可以包含多个 Shot；一个 Story Beat 可以跨多个 Shot 或 Segment。
- 默认按 10 秒 Segment 进行技术分段；只有在镜头密度过高、动作和台词承载不下时，才在用户确认后改为 15 秒。
- 故事板 prompt 由本阶段产出，供后续直接生成故事板图。

## 参考资料

- `references/output-contract.md`：分镜字段、三层时间模型和落盘约定
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
- `docs/皮克斯电影风格路线实施计划.md`：当前 pixar_like 路线实施计划
- `docs/协议层与选题闸门设计.md`：黑板补丁统一协议
