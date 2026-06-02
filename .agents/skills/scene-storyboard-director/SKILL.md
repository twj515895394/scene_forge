---
name: scene-storyboard-director
description: 当用户要把 SceneForge 剧本节拍和表演导演结果转成具有动画电影感的分镜方案，并沉淀镜头级表演、调度、声音意图、情绪设计、动画物理镜头、轻伤可见度和反差喜剧 reveal 时应使用此技能。
---

# scene-storyboard-director

负责把 Story Beat 和表演导演结果转成可执行分镜，强调动画电影化镜头语言，而不是复刻原片拍法。

本阶段需要消费 `scene-performance-director` 产出的表演表，把眼神、微表情、停顿、反应节奏、动画物理表演、轻伤反应和反差表演转化为镜头设计。

黑板记录分镜摘要、分段信息、故事板 prompt 路径、Hero Shot、Bridge Shot、v4 表现力镜头和连续性规则，完整分镜另行落盘。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-storyboard-director`
- 已完成剧本改编和表演导演，项目状态为 `performance_ready`
- 需要进入镜头级表达设计
- 需要把角色动作、表情、场景调度、光影节奏和声音意图收成可用于后续提示词构建的分镜方案
- 需要把 `physical_comedy_performance`、`contrast_performance` 或 `injury_reaction_performance` 转成 setup / reveal / impact / hold / recovery 镜头

如果剧本还没定稿、表演表缺失，或已经进入声音导演/提示词构建阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `performance_ready`，且总控路由的 `next_stage` 为 `scene-storyboard-director`。
2. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、剧本摘要、`story_beats`、表演表、设计摘要、参考边界和必要的 Blocking/道具状态输入；运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。
3. 如果当前分镜需要镜头化动画物理、轻伤可见度或反差 reveal，可按需读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
4. 读取 `references/output-contract.md`，确认分镜字段、三层时间模型、v4 表现力镜头字段、黑板摘要和长分镜落盘路径。
5. 先读取顶层 `segment_strategy`、`segment_duration_seconds`、`target_total_duration_seconds`；若为空，必须先向用户确认总时长、10 秒 / 15 秒 / 混合分段策略，不直接生成正式分镜。
6. 在正式落盘前，先输出“分镜方案预览”，至少包含镜头数量建议、Segment Plan、Hero Shot、Bridge Shot、Blocking Map、关键道具状态变化、v4 表现力镜头候选和需要用户确认的问题。
7. 等待用户明确确认分镜方案；用户纠错或补充偏好不等于授权落盘。
8. 用户确认后，生成动画电影化分镜，不直接照搬原版拍法。
9. 对每个镜头至少明确动作、表情、调度、情绪功能、导演意图、声音意图和时间轴位置。
10. 对动画物理镜头，必须镜头化 setup / impact / deformation / hold / recovery。
11. 对反差喜剧镜头，必须镜头化 setup / conceal / reveal / hold / continue。
12. 对轻中度卡通伤害镜头，必须明确 injury_visibility、喜剧化呈现方式和禁止的写实伤害边界。
13. 产出“每段覆盖哪些镜头和 Story Beat”的 Segment Plan，并写出可直接生成故事板图的 prompt 文件。
14. 将完整分镜写入 `details/shotlist_v*.md`；黑板只记录版本、镜头总览、分段信息、故事板 prompt 路径、Hero Shot、Bridge Shot、Blocking Map、v4 表现力镜头和关键连续性规则。
15. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
16. 将状态推进建议交回总控 Skill，进入 `scene-audio-director`。

## 关键规则

- 分镜字段至少覆盖镜头编号、所属 Beat、起止时间、时长、景别、机位、镜头运动、角色动作、表情变化、场景调度、光影变化、声音设计、情绪功能、导演意图、转场方式。
- 必须继承 `performance_sheet` 中的眼神、微表情、停顿、标志性动作和反应节奏。
- 必须继承表演阶段的 `physical_comedy_performance`、`contrast_performance` 和 `injury_reaction_performance`，并转化为镜头级字段。
- 不照搬原版拍法，要用动画电影化的表演、节奏、视角和情绪调度重构名场面。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 一个 Segment 可以包含多个 Shot；一个 Story Beat 可以跨多个 Shot 或 Segment。
- 默认按 10 秒 Segment 进行技术分段；只有在镜头密度过高、动作和台词承载不下时，才在用户确认后改为 15 秒或混合分段。
- 故事板 prompt 由本阶段产出，供用户在外部平台生成故事板图；本阶段不得声称已生成故事板图片。
- 必须显式标记 `hero_shot` / `hero_moment`，说明该镜头为什么是看点、服务哪个情绪或反转。
- 必须显式设计 `bridge_shot` / 桥接分镜，用于解决 Segment 之间的动作、视线、声音和空间衔接。
- 动画物理镜头必须包含可看清的停顿，不要把所有动作压成一团快节奏。
- 反差喜剧镜头要让观众看清 setup 和 reveal，不要用过多 VFX 遮住反差本身。
- 轻中度卡通伤害可以可见，但不得表现大量流血、写实伤口、身体恐怖或持续痛苦。
- 多角色项目必须继承或补充 `blocking_map`、`faction_layout` 和 `forbidden_zone`，降低角色站位漂移概率。
- 关键道具必须继承 `prop_state_machines`，在分镜中写清状态变化和可见证据。
- 必须诚实说明 Blocking 和连续性约束只能降低抽卡成本，不能保证视频模型一次生成完全稳定。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：分镜字段、三层时间模型、v4 表现力镜头字段和落盘约定
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
