# scene-video-prompt-builder 工作流

## 1. 入口检查

- 读取 `PROJECT_BOARD.md`。
- 确认 `project_config.target_total_duration_seconds` 和 `project_config.segment_duration_seconds` 已存在。
- 确认 storyboard 阶段已完成且有可读 details、prompt outputs 和 quality check。
- 确认 audio 阶段已完成且有可读 audio pack。
- 快速执行模式下确认 `confirmations.video_prompt_plan_confirmed.status` 不应在正式完成时保持 `pending`。

## 2. 读取输入

按紧凑预算读取：

- storyboard 主 pack。
- storyboard details 中的 Beat Skeleton、VGU、Shot Continuity、Quality Check。
- storyboard prompt outputs，用于校对视觉关键帧和控制轨道。
- audio pack；必须继承其中的 BGM、Foley-SFX、Ambience、Silence 与跨段声音钩子。
- performance pack。
- design summary。
- 当前风格包的 visual / camera / lighting / negative constraints。

## 3. 生成预览

预览必须包含：

- `video_prompt_pack_plan`
- 每个 pack 的声音执行摘要
- 四层强结构草案
- 每段 technical control block 样例
- 每段 sound execution 样例
- 每段如何继承 audio 阶段声音设计
- 每段可直接复制使用块样例
- 是否需要英文 pack；默认只交付中文 pack

## 4. 正式生成

用户确认后，按以下顺序生成：

1. `video_prompt_pack_plan`
2. `pack_audio_execution_plan`
3. `global_execution_preamble`
4. `project_level_global_rules`
5. `segment_technical_control_block`
6. `shot_by_shot_director_prompt`
7. `segment_sound_execution`：继承 audio 阶段的 BGM、Foley-SFX、Ambience、Silence 和跨段声音钩子
8. `prompt_trace`
9. 中文 pack 文件
10. 按需英文 pack 文件
11. `video_prompt_review`

## 5. 落盘与注册

正式完成前必须：

- 写入 `outputs/video_prompts/*中文_v*.md`。
- 仅在用户明确要求、目标平台需要英文或发布策略要求海外投放时写入 `outputs/video_prompts/*英文_v*.md`。
- 写入 `details/video_prompts/video_prompt_review_v*.md`。
- 在 `artifacts.manifest.yaml` 注册上述文件。
- 在 `PROJECT_BOARD.md stage_index.video_prompts.files` 注册 primary、outputs、details、quality_check。

## 6. 完成前校验

- 运行 `node ../../packages/engine/dist/cli.js validate --stage video_prompts`。
- validator 失败时按错误补结构，不推进阶段。
- 校验通过后才能交回总控推进至 publish review。
