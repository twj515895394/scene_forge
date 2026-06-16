# Video Prompts 阶段 Review 清单

正式推进 video_prompts 阶段前逐项检查。

## 确认闸门

- 快速执行模式：`confirmations.video_prompt_plan_confirmed.status = confirmed`。
- 全自动模式：必须确认总控已注入 `execution_policy.mode = full_auto` 且 unlock 条件满足。

## 文件检查

- 中文 pack 文件存在。
- 若用户明确要求英文版、目标平台需要英文或发布策略要求海外投放，则英文 pack 文件存在。
- `details/video_prompts/video_prompt_review_v*.md` 存在。
- 所有文件已进入 manifest。
- `PROJECT_BOARD.md stage_index.video_prompts.files.outputs` 包含中文 pack；英文 pack 仅在生成时进入 outputs。
- `PROJECT_BOARD.md stage_index.video_prompts.files.quality_check` 指向 review 文件。

## Pack 正文

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

## 声音执行

`segment_sound_execution` 必须拆出：

- `BGM`
- `Foley-SFX`
- `Ambience`
- `Silence`

## 可直接复制使用块

每个 Segment 的 `可直接复制使用块` 必须按顺序包含：

1. `【故事板关键帧参考规则】`
2. `【项目级全局锁定规则】`
3. `【Segment X 技术控制说明】`
4. `【Segment X 导演长版提示词】`

`【故事板关键帧参考规则】` 必须包含固定开头：

```text
将"控制故事板 Pack XX"作为本段视频生成的顺序动作、镜头调度、空间关系和连续性主参考；将"风格故事板 Pack XX"作为角色渲染、场景质感、灯光影调、情绪氛围和最终画面质量辅助参考。
```

`【项目级全局锁定规则】` 至少覆盖：

- 主场景
- 角色锁定
- 不重复角色
- 画面可读性
- 风格锁定
- 灯光锁定
- 负向边界

`【Segment X 技术控制说明】` 必须是自然语言控制段，覆盖 VGU、continuity_in/out、blocking、prop state 和 next_handoff，不得写成 YAML、参数表或 key-value 清单。

`【Segment X 导演长版提示词】` 必须按镜头顺序写成可直接投喂的导演长版，不能只是镜头标题或摘要。每个关键镜头至少覆盖：

- 时间轴：必须包含 Segment 总时间轴和逐镜头时间码，例如 `Segment 总时间轴：00:00-00:10`、`C01 [00:00-00:02]`；时间码必须与 storyboard 的 shot_continuity / VGU / pack 规划一致。
- 镜头语言：景别、机位、运动、焦段/景深或剪辑节奏。
- 画面构图：主体位置、前中后景、空间锚点、screen side lock。
- 角色表演：动作、微表情、身体姿态、视线和节奏。
- 情绪递进：本镜头进入情绪、变化点和离开状态。
- 动作弧线：预备动作、发力、反应、收势。
- 空间与道具连续性：站位、轴线、核心道具状态与可见证据。
- 风格与画面质感：情绪氛围、美术质感、灯光影调和最终画面质量。
- 声音承接：必须继承 audio 阶段已确认的 BGM、Foley-SFX、Ambience、Silence 和跨镜 / 跨段声音钩子。
- 负向边界：避免现代快剪、现代化表演、角色重复、空间漂移、写实伤害或故事板版式痕迹。

不得混入：

- review 日志
- 确认事项
- 实现解释
- 版权与安全规避说明
- 其他非投喂元信息

## 自动修复规则

若缺结构或缺文件，只补缺失结构与注册信息；不得改变已确认的创作方向、总时长、分段策略、pack 规划、角色设定或剧情结果。
