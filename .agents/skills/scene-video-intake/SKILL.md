---
name: scene-video-intake
description: 当用户上传视频文件、提供视频链接、短视频链接或来自同一段视频的截图序列，并希望基于该视频进行分析、改编、选题、分镜、脚本或视频提示词制作时应使用此技能。
---

# scene-video-intake

`scene-video-intake` 是 SceneForge v6 新增的条件触发前置 Skill。它负责把源视频输入解析为结构化创作资料，并生成交给 `scene-topic-gate` 的精简 handoff。

它不是视频生成器，不产出最终视频、图片或音频；只产出源视频解析资料、优先级分层、改写方向候选、资产化候选判断和阶段补丁。

## v6.1 新增能力

新增：

```text
Pattern Diagnosis
↓
Adaptation Ideas Generation
↓
User Selection Gate
```

scene-video-intake 不再直接把源视频推进到正式改写。

必须先：

```text
抽象结构
↓
生成 5-10 个改写方向
↓
用户选择
↓
后续正式改写
```

## 执行步骤

1. 解析源视频。
2. 生成 Priority Map。
3. 提炼 Narrative Pattern、Conflict Pattern、Emotion Pattern、Reveal Pattern 等抽象结构。
4. 识别可替换槽位（人物、场景、身份、时代、道具、行业、表达方式等）。
5. 生成 5-10 个 Adaptation Ideas。
6. 写入 adaptation_ideas_v1.md。
7. 生成 topic_gate_handoff。
8. 等待用户选择方向。
9. 用户未选择前，不生成正式 Script Adapter 输出。

## Adaptation Ideas 规则

每个方向只包含：

```yaml
idea_id:
title:
seed_type:
summary:
why_it_works:
recommended_for:
```

禁止：

- 直接生成完整剧本。
- 直接生成完整分镜。
- 直接生成完整视频提示词。
- 代替用户做最终方向选择。

## User Selection Gate

必须输出：

```yaml
user_selection_required: true
```

允许：

```text
推荐 1-3 个方向
```

不允许：

```text
自动选定方向
```

只有用户明确选择后：

```yaml
adaptation_selection:
  status: selected
  selected_idea_id:
```

后续阶段才能进入正式改写。

## 资产库使用原则

可参考：

```text
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/adaptation-idea-seed-library.md
```

这些资产是开放参考库。

不得把资产库当成固定枚举。

## 核心原则

- 先抽象结构，再改写。
- 先生成候选方向，再让用户选择。
- 所有候选方向都是建议，不是最终答案。
- 用户拥有最终改写方向决定权。
- 不照搬原片人物、台词、镜头或受保护表达。