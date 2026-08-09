# 04_STORYBOARD.md Output Contract

## 文件名

```text
04_STORYBOARD.md
```

## YAML Frontmatter

```yaml
---
schema: sceneforge.stage-document/v1
stage: "04"
stage_skill: storyboard-director
document_type: storyboard
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
# 04 Storyboard

## 1. Stage Summary
## 2. Upstream Locks
## 3. Cinematic Language Plan
## 4. Scene Content Breakdown
## 5. Shot List
## 6. Hero / Bridge Shots
## 7. Segment / Video Generation Unit Plan
## 8. Shot Continuity Plan
## 9. Storyboard & Keyframe Prompts
## 10. Segment Start / End States
## 11. Duration Check
## 12. Risks / Open Issues
## 13. Internal Quality Review
## 14. Downstream Handoff
```

## 2. Upstream Locks

```yaml
upstream_locks:
  creative_story_document_id:
  production_design_document_id:
  script_direction_document_id:
  immutable_story_facts: []
  character_locks: []
  scene_locks: []
  prop_locks: []
  spatial_locks: []
  action_chain_refs: []
  emotion_chain_refs: []
```

## 3. Cinematic Language Plan

```yaml
cinematic_language:
  aspect_ratio:
  shot_size_tendency: []
  camera_angle_tendency: []
  camera_movement_tendency: []
  composition_principles: []
  focal_length_feel: []
  rhythm_principles: []
  lighting_principles: []
  forbidden_camera_patterns: []
```

## 4. Scene Content Breakdown

```yaml
scene_breakdown:
  - scene_script_id: SCN_001
    beat_ids: [BEAT_001]
    must_show_information: []
    must_show_performance: []
    must_show_prop_actions: []
    spatial_establishing_needs: []
    hero_moment_candidates: []
    bridge_needs: []
```

## 5. Shot List

每个 Shot 至少：

```yaml
shots:
  - shot_id: SHOT_001
    beat_ids: [BEAT_001]
    scene_script_id: SCN_001
    location_id: SCENE_001
    characters: [CHAR_001]
    props: [PROP_001]
    narrative_purpose:
    emotional_purpose:
    estimated_duration_seconds:
    shot_size:
    camera_angle:
    camera_position:
    focal_length_feel:
    composition:
    camera_movement:
    subject_movement:
    blocking:
    performance_focus:
    lighting_intention:
    continuity_in:
    continuity_out:
```

## 6. Hero / Bridge Shots

```yaml
hero_shots:
  - shot_id: SHOT_006
    reason:
    visual_memory_point:

bridge_shots:
  - shot_id: SHOT_009
    bridges_from:
    bridges_to:
    continuity_problem_solved:
```

## 7. Segment / Video Generation Unit Plan

```yaml
segments:
  - segment_id: SEG_001
    beat_ids: [BEAT_001]
    scene_script_ids: [SCN_001]
    shot_ids: [SHOT_001, SHOT_002]
    estimated_duration_seconds:
    primary_action:
    primary_performance:
    camera_behavior:
    start_state:
    end_state:
    continuity_in:
    continuity_out:
    recommended_reference_mode: none | reference_image | start_frame | start_end_frames | storyboard_reference
    bridge_shot_ids: []
```

## 8. Shot Continuity Plan

```yaml
continuity_plan:
  - from_shot: SHOT_001
    to_shot: SHOT_002
    screen_direction:
    eyeline:
    character_position:
    prop_state:
    action_phase:
    emotion_phase:
    lighting_time:
    geography:
    notes:
```

## 9. Storyboard & Keyframe Prompts

每个 Prompt 使用稳定 ID：

```yaml
storyboard_prompts:
  - prompt_id: PROMPT_SB_001
    shot_id: SHOT_001
    purpose: control_storyboard | styled_storyboard | keyframe | start_frame | end_frame
    target_entities:
      characters: [CHAR_001]
      scene: SCENE_001
      props: [PROP_001]
    prompt_cn: |
      ...
    prompt_en: |
      ...
    continuity_constraints: []
    negative_constraints: []
    aspect_ratio:
```

英文不是强制项。

## 10. Segment Start / End States

```yaml
segment_states:
  - segment_id: SEG_001
    start_state:
      character_positions: []
      character_actions: []
      expressions: []
      prop_states: []
      camera_state:
    end_state:
      character_positions: []
      character_actions: []
      expressions: []
      prop_states: []
      camera_state:
```

## 11. Duration Check

```yaml
duration_check:
  target_total_seconds:
  shot_total_seconds:
  segment_total_seconds:
  result: pass | adjust
  notes: []
```

## 14. Downstream Handoff

```yaml
handoff:
  shot_ids: []
  segment_ids: []
  shot_segment_map: []
  segment_duration_map: []
  continuity_refs: []
  start_end_state_refs: []
  storyboard_prompt_ids: []
  required_reference_modes: []
  immutable_video_facts: []
  video_prompt_open_decisions: []
```

## 禁止项

- 不拆分 beat skeleton / VGU / shot continuity / prompt pack 正式文件。
- 不改变正式剧本剧情。
- 不绑定具体视频模型。
- 不写最终视频生成 Prompt。
- 不声称已生成故事板图或视频。
