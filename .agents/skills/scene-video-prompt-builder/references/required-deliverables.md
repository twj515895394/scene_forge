# Video Prompts Required Deliverables

本文件是从 `scene-video-prompt-builder` 既有阶段规则和 `references/output-contract.md` 抽出的交付清单，不以任何单个项目产物作为模板来源。

Video Prompts 阶段完成时，以下文件必须真实存在、写入 manifest，并进入 `PROJECT_BOARD.md stage_index.video_prompts.files`。

## Pack-Aligned Outputs

默认主交付：

```text
outputs/video_prompts/视频提示词_第01包_中文_v*.md
outputs/video_prompts/视频提示词_第01包_英文_v*.md
```

多包时按 pack 递增：

```text
outputs/video_prompts/视频提示词_第02包_中文_v*.md
outputs/video_prompts/视频提示词_第02包_英文_v*.md
```

每个 pack 文件必须包含：

- `video_prompt_pack_plan`
- `pack_audio_execution_plan`
- `global_execution_preamble`
- `project_level_global_rules`
- `segment_technical_control_block`
- `shot_by_shot_director_prompt`
- `segment_sound_execution`
- `prompt_trace`
- `video_prompt_review`
- `可直接复制使用块`

`segment_sound_execution` 必须覆盖：

- `BGM`
- `Foley-SFX`
- `Ambience`
- `Silence`

## Review Detail

```text
details/video_prompts/video_prompt_review_v*.md
```

必须记录：

- review_status
- review_round
- issues_found
- auto_fixes_applied
- final_delivery_ready

## Optional Aggregate

只有用户明确需要整片汇编版时才写入：

```text
outputs/video_prompts/视频提示词_导演长版_中文_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_v*.md
```

## Optional Segment Files

只有用户明确要求按段单独落文件时才写入：

```text
outputs/video_prompts/视频提示词_导演长版_中文_segment_01_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_segment_01_v*.md
```

## Board Index

`PROJECT_BOARD.md` 必须同步：

```yaml
stage_index:
  video_prompts:
    files:
      primary: outputs/video_prompts/视频提示词_第01包_中文_v*.md
      outputs:
        - outputs/video_prompts/视频提示词_第01包_中文_v*.md
        - outputs/video_prompts/视频提示词_第01包_英文_v*.md
      details:
        - details/video_prompts/video_prompt_review_v*.md
      quality_check: details/video_prompts/video_prompt_review_v*.md
```

## Forbidden Completion

不得把以下情况标记为 completed：

- 只生成中文或只生成英文 pack。
- 文件存在但未注册 manifest。
- board 没有索引 outputs / details / quality_check。
- pack 文件缺少四层强结构。
- pack 文件缺少 `可直接复制使用块`。
- pack 文件缺少 `BGM / Foley-SFX / Ambience / Silence` 四层声音执行。
- 快速模式下用户尚未确认 video prompt 方案。
