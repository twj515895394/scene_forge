# 02_PRODUCTION_DESIGN.md Output Contract

## 文件名

```text
02_PRODUCTION_DESIGN.md
```

## YAML Frontmatter

```yaml
---
schema: sceneforge.stage-document/v1
stage: "02"
stage_skill: production-designer
document_type: production_design
version: 1
status: completed
project_id:
parent_document_id:
root_document_id:
created_at:
updated_at:
---
```

## 强制正文结构

```markdown
# 02 Production Design

## 1. Stage Summary
## 2. Upstream Story Locks
## 3. Asset Strategy
## 4. Global Visual Language
## 5. Character Design
## 6. Scene Design
## 7. Prop Design
## 8. Spatial & Continuity Bible
## 9. Image Generation Prompts
## 10. Risks / Open Issues
## 11. Internal Quality Review
## 12. Downstream Handoff
```

## 2. Upstream Story Locks

只摘录后续设计真正需要继承的锁，不复制整个 Stage 01。

```yaml
story_refs:
  document_id:
  character_ids: []
  beat_ids: []
  immutable_story_facts: []
  must_keep: []
  must_avoid: []
```

## 3. Asset Strategy

```yaml
asset_strategy:
  - entity_id: CHAR_001
    mode: reuse | reuse_with_modification | new_design | not_required
    source_asset_refs: []
    decision_note:
```

## 4. Global Visual Language

```yaml
visual_language:
  style_family:
  medium:
  realism_level:
  shape_language: []
  material_language: []
  color_strategy: []
  lighting_baseline: []
  period_region_anchors: []
  visual_constraints: []
```

## 5. Character Design

每个重要角色至少：

```yaml
characters:
  - character_id: CHAR_001
    name:
    narrative_role:
    age_impression:
    height:
    body_type:
    face_anchors: []
    skin_tone:
    hair:
    primary_costume:
    footwear:
    accessories: []
    silhouette:
    palette: []
    expression_range: []
    signature_visuals: []
    immutable_visual_locks: []
    allowed_variations: []
    prompt_refs: []
```

## 6. Scene Design

```yaml
scenes:
  - scene_id: SCENE_001
    name:
    narrative_function:
    period_region:
    layout:
    entrances_exits: []
    landmarks: []
    materials: []
    palette: []
    lighting:
    weather_time:
    interaction_zones: []
    immutable_scene_locks: []
    allowed_variations: []
    prompt_refs: []
```

## 7. Prop Design

```yaml
props:
  - prop_id: PROP_001
    name:
    narrative_function:
    appearance:
    dimensions_or_scale:
    materials: []
    initial_state:
    state_changes: []
    related_characters: []
    related_scenes: []
    immutable_prop_locks: []
    prompt_refs: []
```

## 8. Spatial & Continuity Bible

```yaml
continuity_bible:
  character_locks: []
  costume_locks: []
  hair_locks: []
  scene_locks: []
  prop_locks: []
  spatial_locks: []
  allowed_variations: []
```

## 9. Image Generation Prompts

每个 Prompt 必须有稳定 ID：

```yaml
image_prompts:
  - prompt_id: PROMPT_IMG_001
    purpose: character_turnaround | character_sheet | expression_sheet | scene_reference | prop_reference | spatial_reference | other
    target_entities: [CHAR_001]
    reference_roles:
      identity_reference: []
      clothing_reference: []
      hair_reference: []
      style_reference: []
    prompt_cn: |
      ...
    prompt_en: |
      ...
    negative_constraints: []
    aspect_ratio:
    notes:
```

英文不是强制项；没有需要时可留空。

## 10. Risks / Open Issues

区分 blocking / non-blocking。

## 11. Internal Quality Review

只写 review 结果，不输出长推理过程。

## 12. Downstream Handoff

```yaml
handoff:
  character_locks: []
  scene_locks: []
  prop_locks: []
  spatial_locks: []
  image_prompt_ids: []
  immutable_visual_facts: []
  allowed_scene_variations: []
  open_questions: []
```

## 禁止项

- 不拆分额外角色/场景/Prompt 正式文档。
- 不声称已生成图片。
- 不在本阶段写正式剧本或镜头级分镜。
- 不改变 Stage 01 的故事事实。
