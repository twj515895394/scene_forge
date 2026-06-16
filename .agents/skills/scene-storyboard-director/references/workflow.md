# scene-storyboard-director 工作流

## 1. 入口检查

- 读取 `PROJECT_BOARD.md`。
- 确认 `project_config.target_total_duration_seconds` 和 `project_config.segment_duration_seconds` 已存在。
- 确认 `project_config.director_style_id`、`style_family`、`style_profile_path` 已确认。
- 确认 `script`、`performance`、`design` 阶段已有可读产物。
- 快速执行模式下确认 `confirmations.storyboard_plan_confirmed.status` 不应在正式完成时保持 `pending`。

## 2. 读取输入

按紧凑预算读取：

- 剧本主产物和 beat table。
- VGU plan。
- 表演 pack。
- 设计摘要、角色设定、空间连续性种子。
- 当前风格包的镜头、节奏、光影文件。
- source_intake 摘要文件，只在项目来自视频源时读取。

## 3. 生成预览

预览必须包含：

- `storyboard_prompt_pack_plan`
- Beat Skeleton 样例
- Segment Plan
- VGU 样例
- shot continuity 样例
- Hero Shot 和 Bridge Shot
- Blocking / prop state 继承策略
- 故事板 prompt 是否单包或多包

## 4. 正式生成

用户确认后，按以下顺序生成：

1. `beat_skeleton`
2. `storyboard_content_breakdown`，默认写入主包 section，复杂项目才独立落盘
3. `cinematic_language_plan`，默认写入主包 section，复杂项目才独立落盘
4. `video_generation_units`
5. `shot_continuity_plan`
6. anchor frames / continuity chains / continuity control system
7. segments
8. shot highlights
9. storyboard prompt pack plan
10. control storyboard prompt
11. styled storyboard prompt
12. storyboard quality check
13. design reconciliation review：根据最终分镜回看 design 阶段产物是否需要补充或修订

## 5. 落盘与注册

正式完成前必须：

- 写入 `outputs/storyboard_pack_*.md`。
- 写入 `details/storyboard/*` 分层文件。
- 写入 `outputs/storyboard_prompts/*` prompt 文件。
- 写入 `details/storyboard/design_reconciliation_review_v*.md`；若 `design_revision_required: true`，不得完成 storyboard，应先回到 design 做修订。
- 在 `artifacts.manifest.yaml` 注册上述文件。
- 在 `PROJECT_BOARD.md stage_index.storyboard.files` 注册 primary、details、outputs、quality_check。

## 6. 完成前校验

- 运行 `node ../../packages/engine/dist/cli.js validate --stage storyboard`。
- validator 失败时按错误补结构，不推进阶段。
- 校验通过后才能交回总控推进至 audio。
