# 05_VIDEO_PROMPTS.md Output Contract

## 文件名

```text
05_VIDEO_PROMPTS.md
```

## YAML Frontmatter

```yaml
---
schema: sceneforge.stage-document/v1
stage: "05"
stage_skill: video-prompt-director
document_type: video_prompts
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
# 05 Video Prompts

## 1. Stage Summary
## 2. Upstream Storyboard Locks
## 3. Global Execution Rules
## 4. Segment Prompt Index
## 5. Segment Prompts
## 6. Model Adaptation Notes
## 7. Cross-Segment Continuity
## 8. Risks / Open Issues
## 9. Internal Quality Review
## 10. Final Handoff
```

## 2. Upstream Storyboard Locks

```yaml
upstream_locks:
  storyboard_document_id:
  shot_ids: []
  segment_ids: []
  immutable_video_facts: []
  character_locks: []
  scene_locks: []
  prop_locks: []
  continuity_refs: []
```

## 3. Global Execution Rules

```yaml
global_execution_rules:
  aspect_ratio:
  visual_style:
  character_identity_rules: []
  costume_hair_rules: []
  scene_rules: []
  prop_rules: []
  camera_rules: []
  motion_rules: []
  lighting_time_rules: []
  global_negative_constraints: []
```

## 4. Segment Prompt Index

```yaml
segment_prompt_index:
  - segment_id: SEG_001
    shot_ids: [SHOT_001, SHOT_002]
    duration_seconds:
    generation_mode: text_to_video | image_to_video | start_frame | start_end_frames | storyboard_reference | unspecified
    target_model:
    prompt_language: zh | en | bilingual
    copy_ready_prompt_id: PROMPT_VID_001
```

## 5. Segment Prompts

每个 Segment 至少使用以下结构：

```markdown
### SEG_001

**Trace**
- Shots: `SHOT_001`, `SHOT_002`
- Beat: `BEAT_001`
- Scene: `SCN_001`
- Duration: 10s

**Reference Inputs**
```yaml
identity_reference: []
scene_reference: []
storyboard_reference: []
start_frame:
end_frame:
```

**Continuity In**  
...

**Start State**  
...

**Action Timeline**
1. 0–2s: ...
2. 2–6s: ...
3. 6–10s: ...

**Performance**  
...

**Camera**  
...

**Environment Motion**  
...

**End State**  
...

**Continuity Out**  
...

**Avoid / Negative Constraints**
- ...

**Copy-ready Director Prompt — Chinese**
> ...

**Model-specific Prompt**
> ...
```

`Model-specific Prompt` 只有指定模型且确有必要时才生成。

## Segment Prompt 数据结构

如果使用 YAML 结构表达，也至少包含：

```yaml
segment_prompts:
  - prompt_id: PROMPT_VID_001
    segment_id: SEG_001
    shot_ids: [SHOT_001, SHOT_002]
    duration_seconds:
    generation_mode:
    target_model:
    reference_inputs:
      identity_reference: []
      scene_reference: []
      storyboard_reference: []
      start_frame:
      end_frame:
    continuity_in:
    start_state:
    action_timeline: []
    performance:
    camera:
    environment_motion:
    end_state:
    continuity_out:
    negative_constraints: []
    director_prompt_cn: |
      ...
    director_prompt_en: |
      ...
    model_prompt: |
      ...
```

## 6. Model Adaptation Notes

```yaml
model_adaptation:
  target_model:
  adapter_status: not_requested | applied | uncertain
  changed_expression_only: true
  preserved_director_intent: true
  notes: []
```

如果模型规则不确定：

```yaml
adapter_status: uncertain
```

并保留 model-neutral Director Prompt，不得伪造专有参数。

## 7. Cross-Segment Continuity

```yaml
cross_segment_continuity:
  - from_segment: SEG_001
    to_segment: SEG_002
    inherited_character_state: []
    inherited_prop_state: []
    inherited_scene_state: []
    inherited_emotion_state: []
    inherited_camera_or_direction_state: []
    required_match_points: []
```

## 9. Internal Quality Review

```yaml
review:
  storyboard_fidelity: pass
  action_timeline: pass
  performance_fidelity: pass
  camera_consistency: pass
  continuity: pass
  prompt_overload: pass
  model_adapter_integrity: pass
  copy_ready: pass
  notes: []
```

## 10. Final Handoff

```yaml
handoff:
  final_prompt_document: 05_VIDEO_PROMPTS.md
  segment_prompt_ids: []
  segment_generation_modes: []
  reference_bindings_required: []
  unresolved_model_specific_items: []
  ready_for_external_video_generation: true | false
```

## 禁止项

- 不拆分中文/英文/模型版多个正式文件。
- 不静默改变 Stage 04 的镜头或剧情。
- 不把静态图片 Prompt 当视频 Prompt。
- 不堆叠互相冲突的摄像机动作。
- 不伪造不确定的模型专有参数。
- 不声称已经生成视频。
