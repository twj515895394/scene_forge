# Video Prompt Pack Template

`outputs/video_prompts/视频提示词_第XX包_中文_v*.md` 与英文版必须使用 pack-aligned director prompt 体裁。

## Required Sections

```markdown
# 视频提示词 第XX包

## video_prompt_pack_plan

## pack_audio_execution_plan

## global_execution_preamble

## project_level_global_rules

## Segment 01

### segment_technical_control_block

- primary_vgu_ids:
- continuity_in:
- continuity_out:
- shot_continuity_refs:
- blocking_continuity:
- prop_state_continuity:
- blocking_execution:
- prop_state_execution:
- next_handoff:

### segment_sound_execution

#### BGM

#### Foley-SFX

#### Ambience

#### Silence

### shot_by_shot_director_prompt

### prompt_trace

### 可直接复制使用块

1. global_execution_preamble
2. project_level_global_rules
3. segment_technical_control_block
4. shot_by_shot_director_prompt

## video_prompt_review
```

## Forbidden Shape

不要把正式 pack 写成以下说明稿：

```text
全局一致性锚点
每段参数表
编译 Prompt
```

这类内容只能作为中间层导演稿或 review 草稿，不能替代正式 pack-aligned director prompt。
