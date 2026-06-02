---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜结果生成故事板提示词、视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

负责把分镜结果转成最终可用于视频生成平台的分段视频提示词，并补齐角色一致性、场景一致性、镜头连续性和必要的全局约束。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-video-prompt-builder`
- 已完成分镜设计，需要生成可直接用于视频生成平台的分段提示词
- 需要把一致性约束和声音提示一并整理为最终输出物

如果分镜还没完成，或已经进入发布包装阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `storyboard_ready`。
2. 读取完整分镜、设计摘要和参考边界。
3. 读取 `references/output-contract.md`，确认输出物分类和目录落点。
4. 继承分镜阶段已经确认的 `segment_duration_seconds` 和每段镜头覆盖范围。
5. 为每个视频分段整合镜头内容、动作、运镜、台词、音效、节奏和参考图使用方式。
6. 将最终提示词写入 `outputs/video_prompts/`；黑板里只保留摘要、版本信息和路径。
7. 输出单个 YAML 补丁块，说明生成了哪些视频提示词版本、是否已覆盖分段和参考图使用条件，以及后续发布需要的素材准备情况。
8. 将状态推进建议交回总控 Skill，进入 `scene-publish-review`。

## 关键规则

- 输出内容至少包括：分段视频提示词、角色一致性约束、场景一致性约束、镜头连续性说明
- 每段视频提示词必须整合该段的动作、运镜、台词、音效和节奏，而不是把声音要求单独悬空
- 视频提示词当前不按模型分类，统一写入 `outputs/video_prompts/`
- 黑板只记录摘要和文件路径，不直接塞完整提示词正文

## 参考资料

- `references/output-contract.md`：输出分类、目录规则和黑板摘要边界
- `docs/项目创建规范.md`：`details/` 与 `outputs/` 的边界说明
