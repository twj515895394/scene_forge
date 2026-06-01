---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜结果生成故事板提示词、视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

负责把分镜结果转成故事板提示词和视频分段提示词，并补齐角色一致性、场景一致性、镜头连续性和声音提示。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-video-prompt-builder`
- 已完成分镜设计，需要生成可直接用于故事板和视频生成的提示词
- 需要把一致性约束和声音提示一并整理为最终输出物

如果分镜还没完成，或已经进入发布包装阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `storyboard_ready`。
2. 读取完整分镜、设计摘要和参考边界。
3. 读取 `references/output-contract.md`，确认输出物分类和目录落点。
4. 生成故事板提示词、视频分段提示词以及必要的一致性约束。
5. 将最终提示词写入 `outputs/` 指定目录；黑板里只保留摘要、版本信息和路径。
6. 输出单个 YAML 补丁块，说明生成了哪些提示词版本、一致性约束是否覆盖，以及后续发布需要的素材准备情况。
7. 将状态推进建议交回总控 Skill，进入 `scene-publish-review`。

## 关键规则

- 输出内容至少包括：故事板提示词、视频分段提示词、角色一致性约束、场景一致性约束、镜头连续性说明、声音音效配乐提示
- 视频提示词当前不按模型分类，统一写入 `outputs/video_prompts/`
- 黑板只记录摘要和文件路径，不直接塞完整提示词正文

## 参考资料

- `references/output-contract.md`：输出分类、目录规则和黑板摘要边界
- `docs/项目创建规范.md`：`details/` 与 `outputs/` 的边界说明
