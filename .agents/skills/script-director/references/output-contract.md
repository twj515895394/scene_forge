# 03_SCRIPT_DIRECTION.md Output Contract

## 文件名

```text
03_SCRIPT_DIRECTION.md
```

## YAML Frontmatter

```yaml
---
schema: sceneforge.stage-document/v1
stage: "03"
stage_skill: script-director
document_type: script_direction
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
# 03 Script Direction

## 1. Stage Summary
## 2. Upstream Locks
## 3. Script Strategy
## 4. Character Performance Profiles
## 5. Scene Plan
## 6. Formal Script
## 7. Action Continuity Chains
## 8. Emotion Continuity Chains
## 9. Prop & Blocking Continuity
## 10. Storyboard Hints
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
  story_mode:
  immutable_story_facts: []
  character_visual_locks: []
  scene_spatial_locks: []
  prop_locks: []
  must_keep: []
  must_avoid: []
```

## 3. Script Strategy

```yaml
script_strategy:
  mode: original | rewrite_adaptation | preserve_original
  target_total_duration_seconds:
  performance_style:
  adaptation_level:
  preserved_dialogue: []
  rewritten_elements: []
```

## 4. Character Performance Profiles

```yaml
performance_profiles:
  - character_id: CHAR_001
    gaze_strategy:
    facial_range:
    body_center:
    default_posture:
    gesture_habits: []
    signature_gesture:
    reaction_speed:
    emotional_leakage_pattern:
    dialogue_rhythm:
    stylized_action_range:
    forbidden_out_of_character_behavior: []
```

## 5. Scene Plan

```yaml
scene_plan:
  - scene_script_id: SCN_001
    beat_ids: [BEAT_001]
    location_id: SCENE_001
    characters: [CHAR_001]
    props: [PROP_001]
    estimated_duration_seconds:
    scene_goal:
    conflict_change:
    emotion_in:
    emotion_out:
    end_state:
```

## 6. Formal Script

每个 Scene 建议结构：

```markdown
### SCN_001 — 场次标题

- Story Beat: `BEAT_001`
- Location: `SCENE_001`
- Time:
- Characters: `CHAR_001`, `CHAR_002`
- Props: `PROP_001`
- Estimated Duration: 12s

**Scene Goal**  
...

**Action / Performance**  
...

**CHAR_001**  
（眼神先落在桌面；右手指尖轻敲两次，第二次停住。）  
“……”

**CHAR_002 Reaction**  
（不立即回答；停顿约 1 秒，身体重心轻微后移。）

**End State**  
...
```

表演动作必须和对白、动作或反应点绑定。

## 7. Action Continuity Chains

```yaml
action_continuity_chains:
  - chain_id: ACTION_CHAIN_001
    character_id: CHAR_001
    states:
      - scene_script_id: SCN_003
        state:
      - scene_script_id: SCN_004
        state:
```

## 8. Emotion Continuity Chains

```yaml
emotion_continuity_chains:
  - chain_id: EMOTION_CHAIN_001
    character_id: CHAR_001
    states:
      - scene_script_id: SCN_001
        emotion:
        trigger:
```

## 9. Prop & Blocking Continuity

```yaml
prop_state_timeline:
  - prop_id: PROP_001
    scene_script_id: SCN_001
    state:
    holder:
    location:

blocking_continuity:
  - scene_script_id: SCN_001
    character_positions: []
    required_movements: []
    spatial_constraints: []
```

## 10. Storyboard Hints

```yaml
storyboard_hints:
  hero_moments: []
  reaction_moments: []
  bridge_shot_candidates: []
  must_show_expressions: []
  must_show_prop_actions: []
  spatial_establishing_needs: []
  avoid_overcutting: []
```

## 11. Duration Check

```yaml
duration_check:
  target_total_seconds:
  estimated_script_seconds:
  difference_seconds:
  result: pass | adjust
  notes: []
```

## 13. Internal Quality Review

只记录结论。

## 14. Downstream Handoff

```yaml
handoff:
  scene_script_ids: []
  beat_scene_map: []
  performance_profile_ids: []
  action_chain_ids: []
  emotion_chain_ids: []
  prop_state_refs: []
  blocking_refs: []
  hero_moments: []
  reaction_moments: []
  bridge_candidates: []
  immutable_dialogue_or_story_results: []
  storyboard_open_decisions: []
```

## 禁止项

- 不拆分 script / performance / beat table 正式文档。
- 不写正式 Shot List。
- 不写最终视频生成 Prompt。
- 不改变 Stage 01/02 的 Canonical Facts。
- 不声称已经生成媒体资产。
