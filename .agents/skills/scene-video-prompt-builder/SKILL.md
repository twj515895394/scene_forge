---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜、表演表和声音导演结果生成视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

负责把分镜、表演设计和声音方案转成最终可用于视频生成平台的分段视频提示词。

本阶段不再把声音要求作为附属说明，而是必须继承 `scene-audio-director` 的 audio plan，把台词气口、拟音、音乐、环境音和静默点整合进每个 Segment Prompt。

SceneForge 当前只输出视频生成提示词和制作说明，不生成视频。视频需要用户基于本阶段 prompt、角色设定图、场景道具图和故事板图在外部平台手动生成。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-video-prompt-builder`
- 已完成分镜设计和声音导演，项目状态为 `audio_ready`
- 需要生成可直接用于视频生成平台的分段提示词
- 需要把角色一致性、场景一致性、镜头连续性、表演连续性和声音连续性一并整理为最终输出物

如果分镜或 audio plan 还没完成，或已经进入发布包装阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `audio_ready`，且总控路由的 `next_stage` 为 `scene-video-prompt-builder`。
2. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、完整分镜、表演表、声音方案、设计摘要、参考边界和必要的 Blocking/道具状态输入；默认不扫描 `docs/`、`.handoff/` 或历史项目。
3. 读取 `references/output-contract.md`，确认输出物分类、Segment Prompt 结构和目录落点。
4. 继承分镜阶段已经确认的 `segment_duration_seconds`、`target_total_duration_seconds`、`segments`、`hero_moments`、`bridge_shots`、`blocking_map`、`faction_layout` 和 `prop_state_machines`。
5. 在正式生成视频提示词文件前，先输出“视频提示词方案预览”，至少包含分段提示词结构、每段参考图使用计划、continuity_in / continuity_out、blocking_continuity、prop_state_continuity、声音连续性和需要用户确认的问题。
6. 等待用户明确确认视频提示词方案；用户纠错或补充偏好不等于授权落盘。
7. 用户确认后，为每个视频分段整合镜头内容、动作、运镜、表演、台词、拟音、音乐、环境音、静默点、节奏、参考图使用方式和连续性钩子。
8. 将最终提示词写入 `outputs/video_prompts/`；黑板里只保留摘要、版本信息和路径。
9. 输出单个 YAML 补丁块，说明生成了哪些视频提示词版本、是否已覆盖分段、参考图使用条件、表演/声音/空间/道具连续性和后续发布素材准备情况。
10. 将状态推进建议交回总控 Skill，进入 `scene-publish-review`。

## 关键规则

- 输出内容至少包括：分段视频提示词、角色一致性约束、场景一致性约束、表演连续性约束、声音连续性说明、镜头连续性说明、参考图使用说明、Blocking 连续性和道具状态连续性。
- 每段视频提示词必须整合该段的动作、运镜、表演、台词、拟音、音乐、环境音和节奏，而不是把声音要求单独悬空。
- 必须继承 `scene-performance-director` 的角色表演锚点和 `scene-audio-director` 的声音计划。
- 必须继承分镜阶段的 `continuity_in`、`continuity_out`、Hero Shot、Bridge Shot 和 Segment Plan。
- 必须继承 `blocking_map`、`faction_layout` 和 `forbidden_zone`，在每段 prompt 中写清角色默认站位、允许移动区域和禁止区域。
- 必须继承 `prop_state_machines`，在每段 prompt 中写清核心道具当前状态、可见证据、允许交互和安全边界。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 视频提示词当前不按模型分类，统一写入 `outputs/video_prompts/`。
- 黑板只记录摘要和文件路径，不直接塞完整提示词正文。
- 本阶段不得声称已经生成视频，只能说明“已生成用于外部平台制作视频的分段提示词”。
- 必须诚实说明连续性、Blocking 和参考图策略只能降低抽卡成本，不能保证视频模型一次生成完全稳定。

## 参考资料

- `references/output-contract.md`：输出分类、目录规则和黑板摘要边界
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
- `.agents/skills/scene-audio-director/references/output-contract.md`：声音导演输出协议
