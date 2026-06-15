# Video Prompts 阶段强制交付清单

本文件是从 `scene-video-prompt-builder` 既有阶段规则和 `references/output-contract.md` 抽出的交付清单，不以任何单个项目产物作为模板来源。

Video Prompts 阶段完成时，以下文件必须真实存在、写入 manifest，并进入 `PROJECT_BOARD.md stage_index.video_prompts.files`。

## Pack 对齐输出

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

每个 Segment 的 `可直接复制使用块` 必须是可直接投喂外部视频模型的完整正文，而不是索引、摘要或参数表。必须包含：

- `【故事板关键帧参考规则】`
- `【项目级全局锁定规则】`
- `【Segment X 技术控制说明】`
- `【Segment X 导演长版提示词】`

其中技术控制说明必须是自然语言控制段，导演长版提示词必须包含 Segment 总时间轴、逐镜头时间码，并覆盖镜头语言、画面构图、角色表演、情绪递进、动作弧线、空间与道具连续性、声音承接和负向边界。

`segment_sound_execution` 必须覆盖：

- `BGM`
- `Foley-SFX`
- `Ambience`
- `Silence`

## Review 细节文件

```text
details/video_prompts/video_prompt_review_v*.md
```

必须记录：

- review_status
- review_round
- issues_found
- auto_fixes_applied
- final_delivery_ready

## 可选整片汇编

只有用户明确需要整片汇编版时才写入：

```text
outputs/video_prompts/视频提示词_导演长版_中文_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_v*.md
```

## 可选 Segment 文件

只有用户明确要求按段单独落文件时才写入：

```text
outputs/video_prompts/视频提示词_导演长版_中文_segment_01_v*.md
outputs/video_prompts/视频提示词_导演长版_英文_segment_01_v*.md
```

## 黑板索引

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

## 禁止完成的情况

不得把以下情况标记为 completed：

- 只生成中文或只生成英文 pack。
- 文件存在但未注册 manifest。
- board 没有索引 outputs / details / quality_check。
- pack 文件缺少四层强结构。
- pack 文件缺少 `可直接复制使用块`。
- `可直接复制使用块` 缺少故事板关键帧参考规则、项目级全局锁定规则、自然语言技术控制说明或导演长版提示词。
- `可直接复制使用块` 的技术控制说明仍是 YAML、参数表或 key-value 清单。
- pack 文件缺少 `BGM / Foley-SFX / Ambience / Silence` 四层声音执行。
- 快速模式下用户尚未确认 video prompt 方案。
