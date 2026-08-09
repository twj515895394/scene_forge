# 01_CREATIVE_STORY.md Output Contract

本文件定义 `creative-story-planner` 的唯一正式输出格式。

## 文件名

```text
01_CREATIVE_STORY.md
```

## 顶部元数据

推荐使用以下 YAML frontmatter：

```yaml
---
schema: sceneforge.stage-document/v1
stage: "01"
stage_skill: creative-story-planner
document_type: creative_story
version: 1
status: completed
project_id:
parent_document_id:
root_document_id:
created_at:
updated_at:
---
```

`parent_document_id` 在本阶段没有上游文档时可以为空；若输入来自 `source-intake` 或其他画布文档，应记录对应文档 ID。

## 正文强制结构

```markdown
# 01 Creative Story

## 1. Stage Summary

## 2. Input Understanding

## 3. Creative Mode

## 4. Reference Boundary

## 5. Creative Direction

## 6. Story Core

## 7. Character Functions

## 8. Story Beats

## 9. Duration & Rhythm

## 10. Style Direction

## 11. Continuity Seeds

## 12. Risks / Open Issues

## 13. Internal Quality Review

## 14. Downstream Handoff
```

## 1. Stage Summary

必须用简短文字回答：

- 这是什么项目；
- 本次决定拍什么；
- 预计时长；
- 创作模式；
- 主要风格方向。

## 2. Input Understanding

记录真正影响创作的输入，不要复制整段源材料。

建议字段：

```yaml
source_type:
user_goal:
target_audience:
target_duration_seconds:
explicit_requirements:
explicit_exclusions:
```

## 3. Creative Mode

必须包含：

```yaml
script_mode: original | rewrite_adaptation | preserve_original
selected_adaptation:
  status: selected | bypassed | not_applicable
  id:
  title:
  note:
```

## 4. Reference Boundary

无参考源时写 `not_applicable`。

有参考源时至少包含：

```yaml
reference_type: original_work | specific_adaptation | hybrid_reference | not_applicable
must_keep: []
should_keep: []
allowed_to_rewrite: []
must_avoid: []
```

## 5. Creative Direction

至少包含：

- 主题；
- 情绪目标；
- 类型；
- 叙事视角；
- 创意钩子；
- 观众 payoff；
- 关键限制。

## 6. Story Core

至少包含：

```yaml
logline:
premise:
setup:
central_conflict:
escalation:
climax:
ending:
payoff:
```

## 7. Character Functions

每个重要角色使用稳定 ID。

示例：

```yaml
characters:
  - character_id: CHAR_001
    name:
    narrative_role:
    point_of_view: true | false
    goal:
    obstacle:
    relationship_summary:
    arc:
    immutable_story_facts: []
```

这里只描述叙事，不写完整视觉造型 Prompt。

## 8. Story Beats

每个 Beat 至少包含：

```yaml
story_beats:
  - beat_id: BEAT_001
    title:
    narrative_function:
    event:
    active_characters: [CHAR_001]
    conflict_change:
    emotion_in:
    emotion_out:
    estimated_duration_seconds:
    must_preserve: []
```

默认 4–8 个 Beats。

## 9. Duration & Rhythm

至少包含：

```yaml
target_total_duration_seconds:
rhythm_profile:
beat_duration_sum_seconds:
segment_strategy:
  status: confirmed | recommended | unknown
  preferred_segment_seconds:
  note:
```

## 10. Style Direction

至少包含：

```yaml
style_family:
director_style_id:
visual_keywords: []
narrative_keywords: []
rhythm_keywords: []
style_constraints: []
```

尚未确认的值可以写 `recommended` 或 `unknown`，不要伪造用户确认。

## 11. Continuity Seeds

只记录后续必须保持稳定的种子信息。

例如：

```yaml
continuity_seeds:
  characters:
    - CHAR_001
  scenes:
    - SCENE_001
  props:
    - PROP_001
  story_facts:
    - "BEAT_004 前 CHAR_001 不知道真相"
```

## 12. Risks / Open Issues

区分：

- `blocking_issues`：不解决就无法继续；
- `non_blocking_open_issues`：可由下游或用户后续决定。

## 13. Internal Quality Review

只记录简短结论，不输出完整思考过程。

示例：

```yaml
review:
  story_logic: pass
  beat_coverage: pass
  duration_fit: pass
  reference_boundary: pass
  downstream_readiness: pass
  notes: []
```

## 14. Downstream Handoff

必须能够直接驱动 Stage 02 / Stage 03。

建议格式：

```yaml
handoff:
  locked_story_mode:
  core_character_ids: []
  beat_ids: []
  visual_design_targets:
    characters: []
    scenes: []
    props: []
  immutable_story_facts: []
  must_keep: []
  must_avoid: []
  open_questions: []
```

## 禁止项

正式输出中不要：

- 生成第二份 topic/reference/story 文档；
- 把完整 source intake 原文复制进来；
- 写角色完整外观设计；
- 写镜头级分镜；
- 写视频生成 Prompt；
- 声称已经生成任何媒体资产。
