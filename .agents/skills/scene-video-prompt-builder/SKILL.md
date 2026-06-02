---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜、表演表和声音导演结果生成视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

负责把分镜、表演设计和声音方案转成最终可用于视频生成平台的分段视频提示词。

本阶段不再把声音要求作为附属说明，而是必须继承 `scene-audio-director` 的 audio plan，把台词气口、拟音、音乐、环境音和静默点整合进每个 Segment Prompt。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-video-prompt-builder`
- 已完成分镜设计和声音导演，项目状态为 `audio_ready`
- 需要生成可直接用于视频生成平台的分段提示词
- 需要把角色一致性、场景一致性、镜头连续性、表演连续性和声音连续性一并整理为最终输出物

如果分镜或 audio plan 还没完成，或已经进入发布包装阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `audio_ready`。
2. 读取完整分镜、表演表、声音方案、设计摘要和参考边界。
3. 读取 `references/output-contract.md`，确认输出物分类、Segment Prompt 结构和目录落点。
4. 继承分镜阶段已经确认的 `segment_duration_seconds`、`target_total_duration_seconds` 和每段镜头覆盖范围。
5. 为每个视频分段整合镜头内容、动作、运镜、表演、台词、拟音、音乐、环境音、静默点、节奏和参考图使用方式。
6. 将最终提示词写入 `outputs/video_prompts/`；黑板里只保留摘要、版本信息和路径。
7. 输出单个 YAML 补丁块，说明生成了哪些视频提示词版本、是否已覆盖分段、参考图使用条件、表演/声音连续性和后续发布素材准备情况。
8. 将状态推进建议交回总控 Skill，进入 `scene-publish-review`。

## 关键规则

- 输出内容至少包括：分段视频提示词、角色一致性约束、场景一致性约束、表演连续性约束、声音连续性说明、镜头连续性说明。
- 每段视频提示词必须整合该段的动作、运镜、表演、台词、拟音、音乐、环境音和节奏，而不是把声音要求单独悬空。
- 必须继承 `scene-performance-director` 的角色表演锚点和 `scene-audio-director` 的声音计划。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 视频提示词当前不按模型分类，统一写入 `outputs/video_prompts/`。
- 黑板只记录摘要和文件路径，不直接塞完整提示词正文。

## 参考资料

- `references/output-contract.md`：输出分类、目录规则和黑板摘要边界
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
- `.agents/skills/scene-audio-director/references/output-contract.md`：声音导演输出协议
- `docs/皮克斯电影风格路线实施计划.md`：当前 pixar_like 路线实施计划
- `docs/项目创建规范.md`：`details/` 与 `outputs/` 的边界说明
