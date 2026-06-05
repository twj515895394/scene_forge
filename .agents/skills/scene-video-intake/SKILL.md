---
name: scene-video-intake
description: 当用户上传视频文件、提供视频链接、短视频链接或来自同一段视频的截图序列，并希望基于该视频进行分析、改编、选题、分镜、脚本或视频提示词制作时应使用此技能。
---

# scene-video-intake

`scene-video-intake` 是 SceneForge v6 新增的条件触发前置 Skill。它负责把源视频输入解析为结构化创作资料，并生成交给 `scene-topic-gate` 的精简 handoff。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

它不是视频生成器，不产出最终视频、图片或音频；只产出源视频解析资料、索引文件、优先级分层、v6.1 改写方向候选、资产化候选判断和阶段补丁。

## v6.1 新增能力

v6.1 新增：

```text
Pattern Diagnosis
↓
Adaptation Ideas Generation
↓
User Selection Gate
```

本 Skill 在完成 source intake 后，必须基于源视频抽象结构生成 5-10 个候选改写方向，并明确 `user_selection_required: true`。

本 Skill 不替用户决定最终改写方向，不生成正式剧本、完整分镜或视频 prompt。

## 何时使用

在以下场景使用本技能：

- 用户上传视频文件，并表示要分析、改编或基于它制作项目。
- 用户提供视频链接或短视频链接，并明确说“分析这个视频”“根据这个视频片段做”。
- 用户上传多张截图，并说明这些截图来自同一段视频或需要按时间顺序还原。
- 用户要求从视频中提取分镜、镜头、动作、台词、字幕、声音、节奏、亮点、可改编结构或候选改写方向。
- `scene-forge` 总控判断视频源输入应先完成 source intake，再进入 `scene-topic-gate`。

不应在以下场景使用：

- 用户只是描述剧情、片名、桥段名、台词或创作想法。
- 用户只提供普通参考图，而不是视频或截图序列。
- 用户已经给出明确改编目标且不需要解析源视频。
- 用户只是询问协议、SOP 或项目设计。
- 链接用途不明确；此时应先询问：这是要作为源视频片段解析，还是只是作为参考资料？

## 输入类型

```yaml
source_input_type: video_file | video_url | short_video_url | frame_sequence | unknown
source_locator:
source_language_hint:
source_duration_seconds:
user_goal:
project_path:
```

说明：

- `video_file`：用户上传的视频文件。
- `video_url` / `short_video_url`：用户提供的视频或短视频链接。
- `frame_sequence`：用户提供来自同一视频片段的截图序列。
- `unknown`：输入疑似视频源但边界不清，应先请求用户确认用途。

## 执行步骤

1. 确认输入确实是源视频或视频截图序列，并确认用户希望基于它分析、改编或制作项目。
2. 读取当前项目 `PROJECT_BOARD.md`；若项目尚未建立，使用 `projects/_intake/<timestamp-or-slug>/` 作为临时 intake 目录。
3. 读取 `references/output-contract.md`，确认阶段补丁字段和长解析文件要求。
4. 解析源视频基础信息、内容摘要、逐镜头时间轴、主体连续性、空间关系、动作链、对白/字幕/屏幕文字、音频、视觉风格和镜头语言。
5. 生成 `content_priority_map`，明确哪些必须保留、建议保留、可选、可压缩、可替换和不应照搬。
6. 基于 `content_priority_map` 提炼核心叙事模式、冲突模式、情绪模式、揭示机制和可替换结构槽位。
7. 可按需参考：
   - `assets/adaptation/narrative-pattern-library.md`
   - `assets/adaptation/replaceable-slot-library.md`
   - `assets/adaptation/adaptation-idea-seed-library.md`
8. 生成 `adaptation_ideas_v1.md`，提供 5-10 个候选改写方向。每个方向只包含 `idea_id`、`title`、`seed_type`、`selection_mode`、`summary`、`why_it_works`、`recommended_for`、`user_choice_required` 等轻量信息。
9. 生成 `topic_gate_handoff`，只包含给 `scene-topic-gate` 必需的选题判断资料，并附带 adaptation ideas 摘要。
10. 将长解析和候选改写方向写入 `projects/<project>/inputs/source_intake/` 或 `projects/_intake/<timestamp-or-slug>/`。
11. 生成 `source_intake_index_v1.md`，作为后续阶段按需读取入口。
12. 判断是否具备 source asset 候选价值，但不得自动写入 `assets/source-materials/`。
13. 输出单个 YAML 阶段补丁，交给总控合并到 `PROJECT_BOARD.md`。

## Adaptation Ideas 规则

`adaptation_ideas_v1.md` 必须遵守：

```yaml
adaptation_ideas:
  version: v1
  source_pattern_summary:
    core_patterns:
    must_preserve:
    replaceable_slots:
  ideas:
    - idea_id:
      title:
      seed_type:
      selection_mode: reference | adapted_reference | custom_generated
      summary:
      why_it_works:
      recommended_for:
      user_choice_required: true
  recommendation_note:
  user_selection_required: true
```

禁止：

- 直接生成完整剧本。
- 直接生成完整分镜。
- 直接生成完整视频提示词。
- 代替用户做最终方向选择。

允许：

- 推荐 1-3 个更值得优先考虑的方向。
- 说明推荐理由。
- 说明哪些方向适合短视频、动画电影化、喜剧化或情绪向。

## User Selection Gate

必须输出：

```yaml
user_selection_required: true
```

只有用户明确选择后，黑板才应写入：

```yaml
source_intake:
  adaptation_selection:
    status: selected
    selected_idea_id:
    selected_title:
    selection_note:
```

用户未选择前，后续阶段不得进入正式剧本改写。

## 输出文件

项目已创建时写入：

```text
projects/<project>/inputs/source_intake/source_video_analysis_v1.md
projects/<project>/inputs/source_intake/source_video_timeline_v1.md
projects/<project>/inputs/source_intake/source_video_priority_map_v1.md
projects/<project>/inputs/source_intake/adaptation_ideas_v1.md
projects/<project>/inputs/source_intake/topic_gate_handoff_v1.md
projects/<project>/inputs/source_intake/source_intake_index_v1.md
```

可按复杂度额外拆分：

```text
projects/<project>/inputs/source_intake/source_video_dialogue_v1.md
projects/<project>/inputs/source_intake/source_video_audio_v1.md
projects/<project>/inputs/source_intake/source_video_camera_v1.md
```

项目尚未创建时，先写入：

```text
projects/_intake/<timestamp-or-slug>/
```

待 `scene-topic-gate` 判定进入制作后，再由总控迁移或复制到正式项目目录。

## 长内容读取策略

`PROJECT_BOARD.md` 只保存 source intake 摘要、路径、active_version、adaptation ideas 摘要、用户选择状态和 read_policy，不保存完整逐镜头表、完整台词表、完整长分析正文或完整 adaptation ideas 正文。

后续阶段默认读取：

```text
PROJECT_BOARD.md source_intake summary
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
inputs/source_intake/adaptation_ideas_v1.md summary
```

按需读取：

```text
inputs/source_intake/source_intake_index_v1.md
inputs/source_intake/adaptation_ideas_v1.md
当前阶段相关专用文件
```

谨慎深读：

```text
inputs/source_intake/source_video_analysis_v1.md
inputs/source_intake/source_video_timeline_v1.md 的相关章节
```

只有当用户要求复盘源视频、阶段需要解决关键不确定性、或剧本/分镜必须核对具体动作链时，才允许深读。

## 资产化规则

默认身份是 project input，而不是 reusable source asset。

本技能只能写：

```yaml
assetization:
  candidate_for_assetization: true | false | uncertain
  reason:
  suggested_asset_slug:
  asset_status: none | proposed
```

不得自动创建：

```text
assets/source-materials/<source-slug>/
```

只有用户明确确认资产化后，才可由后续流程写入 source asset 文件并更新 `source_intake.source_asset_ref`。

## 运行时边界

默认只读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/adaptation-idea-seed-library.md
用户提供的视频 / 链接 / 截图序列
```

禁止读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

`docs/` 和 `.handoff/` 只作为人类设计说明与交接材料；本 Skill 的其余通用读取边界同时遵循仓库根 `AGENTS.md`。

## 关键规则

- 只输出结构化解析资料、候选改写方向和阶段补丁，不生成图片、视频或音频。
- 不把完整长解析塞进 `PROJECT_BOARD.md`。
- 不把完整 adaptation ideas 正文塞进 `PROJECT_BOARD.md`。
- 不默认读取所有 source intake 长文件。
- 不自动资产化 source intake。
- 不照搬源视频具体受保护表达；应区分抽象结构、可替换元素与不应复制元素。
- 所有模板、示例、枚举和 pattern 都是参考锚点，不是封闭集合。
- 输出必须包含 `topic_gate_handoff`、`adaptation_ideas_v1.md`，并将 `next_action` 指向 `scene-topic-gate`。
- 用户拥有最终改写方向决定权。

## 参考资料

- `references/output-contract.md`：阶段补丁字段、长解析文件、priority map、adaptation ideas、topic gate handoff、assetization 和 read_policy 协议。
