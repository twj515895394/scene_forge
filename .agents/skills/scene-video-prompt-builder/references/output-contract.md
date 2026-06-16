# Video Prompts 阶段短机器契约

本文件只定义 `scene-video-prompt-builder` 的最小字段契约，用于 validator、manifest、board 索引和最终提示词交付核对。

它不是执行流程文档，不承载完整创作方法、长 YAML 样例或资产库说明。执行流程读取 `workflow.md`；必交文件读取 `required-deliverables.md`；正式提示词体裁读取 `video-prompt-template.md`；完成前检查读取 `review-checklist.md`。

完整规则迁移位置见 `../../scene-design-builder/references/output-contract-migration-map.md`。

- 默认执行阶段不需要全文读取本文件。
- 只有在修复字段、实现 validator、排查 board/manifest 漂移或核对 pack 正式体裁时读取。
- 中文 pack 是默认主交付；英文 pack 是按需生成的翻译/模型适配版。
- 正文说明必须中文主导；英文只保留为技术 key、镜头参数、模型提示词必要表达。

## 主交付

默认必须按故事板 pack 对齐输出，多包按 `第02包`、`第03包` 递增：

- `outputs/video_prompts/视频提示词_第01包_中文_v*.md`

英文 pack 仅在用户明确要求、目标平台需要英文或发布策略要求海外投放时生成：

- `outputs/video_prompts/视频提示词_第01包_英文_v*.md`

只有用户明确要求整片汇编版时，才额外写：

- `outputs/video_prompts/视频提示词_导演长版_中文_v*.md`
- `outputs/video_prompts/视频提示词_导演长版_英文_v*.md`

## Review 文件

必须真实落盘并注册，且包含 `review_status`、`review_round`、`issues_found`、`auto_fixes_applied`、`final_delivery_ready`：

- `details/video_prompts/video_prompt_review_v*.md`

## 每个 Pack 必备结构

每个已生成的中文/英文 pack 文件必须包含：

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

## Segment Control 必备字段

每个 Segment 至少包含：

- `primary_vgu_ids`
- `continuity_in`
- `continuity_out`
- `blocking_execution`
- `prop_state_execution`
- `next_handoff`

每个 Shot 至少包含：

- `shot_continuity`
- `screen_positioning`

## 声音执行

`segment_sound_execution` 必须拆成四层：

- `BGM`
- `Foley-SFX`
- `Ambience`
- `Silence`

## 禁止形态

不得把以下内容当成正式 video_prompts 完成：

- 缺少中文 pack。
- 用户未要求英文时默认生成英文 pack。
- 用户要求英文但缺少英文 pack。
- 说明性表格、逐段参数表、逐镜参数表。
- “全局设定 + 参数表 + 编译 Prompt”。
- 缺少 `segment_technical_control_block` 或 `shot_by_shot_director_prompt` 的大段 prompt。
- 缺少 BGM / Foley-SFX / Ambience / Silence 四层声音执行。
- 缺少 `可直接复制使用块`。
- board 或 manifest 未注册必交文件。

## Board 索引

`PROJECT_BOARD.md stage_index.video_prompts.files` 必须包含：

```yaml
primary: outputs/video_prompts/视频提示词_第01包_中文_v*.md
outputs:
  - outputs/video_prompts/视频提示词_第01包_中文_v*.md
details:
  - details/video_prompts/video_prompt_review_v*.md
quality_check: details/video_prompts/video_prompt_review_v*.md
```

## 上游继承

Video prompts 阶段必须继承而不是重写：

- storyboard pack 规划。
- Beat / VGU / Shot / Segment 对齐关系。
- continuity_in / continuity_out。
- blocking_execution / prop_state_execution。
- performance、audio、design 的已确认结论。
- design_reconciliation_review 的修订建议或无需修订理由。
