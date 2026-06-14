# Video Prompts Review Checklist

正式推进 video_prompts 阶段前逐项检查。

## Confirmation

- 快速执行模式：`confirmations.video_prompt_plan_confirmed.status = confirmed`。
- 全自动模式：必须确认总控已注入 `execution_policy.mode = full_auto` 且 unlock 条件满足。

## Files

- 中文 pack 文件存在。
- 英文 pack 文件存在。
- `details/video_prompts/video_prompt_review_v*.md` 存在。
- 所有文件已进入 manifest。
- `PROJECT_BOARD.md stage_index.video_prompts.files.outputs` 包含中文和英文 pack。
- `PROJECT_BOARD.md stage_index.video_prompts.files.quality_check` 指向 review 文件。

## Pack Body

每个正式 pack 文件必须包含：

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

## Sound Execution

`segment_sound_execution` 必须拆出：

- `BGM`
- `Foley-SFX`
- `Ambience`
- `Silence`

## Copy-Ready Block

每个 Segment 的 `可直接复制使用块` 必须按顺序包含：

1. `global_execution_preamble` 精简可用版
2. `project_level_global_rules` 当前段锁定规则
3. `segment_technical_control_block`
4. `shot_by_shot_director_prompt`

不得混入：

- review 日志
- 确认事项
- 实现解释
- 版权与安全规避说明
- 其他非投喂元信息

## Auto-fix Rule

若缺结构或缺文件，只补缺失结构与注册信息；不得改变已确认的创作方向、总时长、分段策略、pack 规划、角色设定或剧情结果。
