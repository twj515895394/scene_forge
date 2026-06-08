# 皮克斯路线 PROJECT_BOARD 与状态机增量协议

## 文档目的

本文档是 `docs/协议层与选题闸门设计.md` 的增量补丁，用于支持当前 `pixar_like` 动画电影导演路线的第一轮落地。

本补丁不废弃原有协议，而是在原有主链路基础上增加：

- `scene-performance-director`
- `scene-audio-director`
- `performance_ready`
- `audio_ready`
- 三层时间模型相关顶层索引字段

当前目标是先跑通 Pixar-like 第一套导演链路，不立即扩展多风格系统。

---

# 一、适用范围

本文档适用于：

- `PROJECT_BOARD.md` 顶层 YAML 薄索引
- 主流程 `project_status` 枚举
- `next_stage` 路由枚举
- `segment_duration_seconds` 的语义修正
- 新增 Performance / Audio 阶段的状态推进规则

---

# 二、PROJECT_BOARD 顶层字段增量

原有顶层字段保持不变。

建议新增以下字段：

```yaml
target_total_duration_seconds:
story_beat_count:
shot_count:
segment_count:
```

结合原有字段后，推荐 v2 顶层结构为：

```yaml
---
project_name:
project_status:
next_stage:
lifecycle_flag:
blocker_note:
score:
production_level:
reference_type:
adaptation_level:
performance_style:
segment_duration_seconds:
target_total_duration_seconds:
story_beat_count:
shot_count:
segment_count:
created_at:
updated_at:
---
```

## 字段说明

### `segment_duration_seconds`

语义必须修正为：

```text
单个视频生成片段的目标时长。
```

它不是整条视频总时长。

常见值：

```yaml
segment_duration_seconds: 10
```

或：

```yaml
segment_duration_seconds: 15
```

### `target_total_duration_seconds`

整条视频目标总时长。

示例：

```yaml
target_total_duration_seconds: 30
```

### `story_beat_count`

Story Beat 数量。

由 `scene-script-adapter` 初步写入。

示例：

```yaml
story_beat_count: 3
```

### `shot_count`

完整分镜镜头数量。

由 `scene-storyboard-director` 写入。

示例：

```yaml
shot_count: 12
```

### `segment_count`

最终视频生成 Segment 数量。

由 `scene-storyboard-director` 写入，后续 `scene-audio-director` 和 `scene-video-prompt-builder` 继承。

示例：

```yaml
segment_count: 3
```

---

# 三、三层时间模型

当前路线必须区分三种时间：

```text
Story Beat Duration
Shot Duration
Segment Duration
```

## 1. Story Beat Duration

叙事和情绪节拍时长。

由 `scene-script-adapter` 产出。

## 2. Shot Duration

镜头时长。

由 `scene-storyboard-director` 产出。

## 3. Segment Duration

视频生成技术切片时长。

由 `scene-storyboard-director` 确认，后续阶段继承。

正确关系：

```text
Story Beat
  -> Shot
    -> Segment
      -> Final Video
```

错误理解：

```text
Segment = Story
```

---

# 四、主流程阶段枚举增量

在原有 `project_status` 枚举基础上新增：

```text
performance_ready
audio_ready
```

推荐完整枚举：

```text
draft
topic_scored
reference_decided
assets_checked
design_ready
script_ready
performance_ready
storyboard_ready
audio_ready
video_prompts_ready
published
reviewed
archived
```

## 新增状态说明

### `performance_ready`

表示 `scene-performance-director` 已完成。

此时应已产出：

```text
details/performance_sheet_v*.md
```

并且黑板中已记录表演摘要、角色表演锚点、Beat 表演重点和后续分镜提示。

### `audio_ready`

表示 `scene-audio-director` 已完成。

此时应已产出：

```text
details/audio_plan_v*.md
outputs/audio/music_prompt_v*.md
outputs/audio/foley_prompt_v*.md
outputs/audio/audio_mix_plan_v*.md
```

并且黑板中已记录声音摘要、配音方向、拟音重点、音乐设计、静默点和视频提示词继承要求。

---

# 五、next_stage 枚举增量

在原有主链路基础上新增：

```text
scene-performance-director
scene-audio-director
```

推荐完整主链路：

```text
scene-topic-gate
scene-reference-decider
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
scene-storyboard-director
scene-audio-director
scene-video-prompt-builder
scene-publish-review
```

---

# 六、状态推进规则

## 1. `scene-script-adapter` 完成后

建议写入：

```yaml
project_status: script_ready
next_stage: scene-performance-director
adaptation_level:
performance_style:
target_total_duration_seconds:
story_beat_count:
```

本阶段必须产出：

```text
details/script_v*.md
```

并在黑板补丁中记录：

- `story_beats`
- `performance_handoff`
- `storyboard_hints`

## 2. `scene-performance-director` 完成后

建议写入：

```yaml
project_status: performance_ready
next_stage: scene-storyboard-director
```

本阶段必须产出：

```text
details/performance_sheet_v*.md
```

并在黑板补丁中记录：

- 表演版本
- 主要角色表演锚点
- Story Beat 表演重点
- 分镜阶段需要保留的停顿、特写和反应镜头

## 3. `scene-storyboard-director` 完成后

建议写入：

```yaml
project_status: storyboard_ready
next_stage: scene-audio-director
segment_duration_seconds:
target_total_duration_seconds:
shot_count:
segment_count:
```

本阶段必须产出：

```text
details/shotlist_v*.md
outputs/storyboard_prompts/storyboard_prompt_v*.md
```

并在黑板补丁中记录：

- Segment Plan
- Shot highlights
- Continuity rules
- Audio handoff
- Prompt hints

## 4. `scene-audio-director` 完成后

建议写入：

```yaml
project_status: audio_ready
next_stage: scene-video-prompt-builder
```

本阶段必须产出：

```text
details/audio_plan_v*.md
outputs/audio/music_prompt_v*.md
outputs/audio/foley_prompt_v*.md
outputs/audio/audio_mix_plan_v*.md
```

并在黑板补丁中记录：

- 配音方向
- 音乐设计
- 拟音设计
- 环境音设计
- Segment audio plan
- Video prompt handoff

## 5. `scene-video-prompt-builder` 完成后

建议写入：

```yaml
project_status: video_prompts_ready
next_stage: scene-publish-review
```

本阶段必须产出：

```text
outputs/video_prompts/video_prompt_segments_v*.md
```

并在黑板补丁中记录：

- Prompt pack version
- Segment Prompt 文件路径
- 角色一致性
- 场景一致性
- 表演连续性
- 声音连续性
- Segment 拼接规则

---

# 七、PROJECT_BOARD 阶段分区建议

建议在项目黑板中增加两个阶段分区。

## Performance 分区

```md
## 6A. 表演导演区

```yaml
patch_type: scene-performance-director
version: 1
status: pending
updated_at:
summary: 待进行角色表演设计
data: {}
```
```

## Audio 分区

```md
## 8A. 声音导演区

```yaml
patch_type: scene-audio-director
version: 1
status: pending
updated_at:
summary: 待进行声音导演设计
data: {}
```
```

说明：

- 表演导演区建议位于剧本区之后、分镜区之前。
- 声音导演区建议位于分镜区之后、视频提示词区之前。
- 编号可根据现有模板实际章节微调，不强制固定为 `6A` / `8A`。

---

# 八、最小可行验证样例

建议第一个样例项目使用：

```yaml
target_total_duration_seconds: 30
segment_duration_seconds: 10
story_beat_count: 3
shot_count: 8-12
segment_count: 3
```

验证目标：

- 3 个 Story Beat 是否足够支撑 30 秒短片
- 每个 Beat 能否被拆成多个 Shot
- 3 个 10 秒 Segment 是否能自然拼接
- performance sheet 是否能指导分镜
- audio plan 是否能指导最终视频 Prompt
- video prompts 是否真正整合了表演和声音

---

# 九、兼容性说明

本补丁属于增量协议。

旧项目如果没有 `scene-performance-director` 或 `scene-audio-director`，仍可按旧链路运行。

但新建 pixar_like 路线项目建议走完整增强链路：

```text
script_ready
-> performance_ready
-> storyboard_ready
-> audio_ready
-> video_prompts_ready
```

---

# 十、后续工作

本补丁完成后，下一步应进入样例验证：

1. 创建 30 秒样例项目。
2. 设计 3 个 Story Beat。
3. 生成 performance sheet。
4. 生成 8-12 个镜头的 shotlist。
5. 拆成 3 个 10 秒 Segment。
6. 生成 audio plan。
7. 生成 video prompts。
8. 复盘链路阻塞点。
