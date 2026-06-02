# SceneForge v6：Video Intake 长解析内容存储与读取策略

日期：2026-06-02

> 本文档是 `docs/SceneForge-v6-Video-Intake-System.md` 的补充设计。
>
> 目标：解决 `scene-video-intake` 解析内容很长时，如何保存、索引、摘要化，以及如何供后续阶段按需读取的问题。

---

## 1. 核心结论

`scene-video-intake` 的完整解析内容应该保存到具体项目目录下，但不能直接塞进 `PROJECT_BOARD.md`。

推荐规则：

```text
完整内容落文件。
黑板只存摘要、路径、索引和读取策略。
后续阶段默认读摘要，必要时按章节读取完整解析。
```

也就是说：

```text
PROJECT_BOARD.md = 轻量索引和跨阶段状态
inputs/source_intake/* = 源视频解析长内容
stage outputs = 各阶段从 source_intake 中提取自己需要的信息
```

---

## 2. 为什么不能把完整解析放进黑板

视频解析可能包含：

- 基础信息；
- 整体摘要；
- 逐镜头时间轴；
- 台词 / 字幕 / 屏幕文字；
- 声音设计；
- 镜头语言；
- 主体连续性；
- 场景空间；
- 动作链；
- 可保留 / 可压缩 / 可替换 / 不应照搬内容；
- topic gate handoff；
- 后续改编建议。

这些内容可能非常长。如果全部塞进 `PROJECT_BOARD.md`，会导致：

1. 黑板膨胀；
2. 每个阶段读取成本过高；
3. 后续阶段容易被无关细节干扰；
4. 总控难以保持“薄索引”职责；
5. 版本迭代困难。

因此必须采用“长内容落盘 + 黑板索引”的方式。

---

## 3. 推荐目录结构

### 3.1 项目已创建时

如果项目目录已经确定，建议写入：

```text
projects/<project>/inputs/source_intake/
  source_video_analysis_v1.md
  source_video_timeline_v1.md
  source_video_dialogue_v1.md
  source_video_audio_v1.md
  source_video_camera_v1.md
  source_video_priority_map_v1.md
  topic_gate_handoff_v1.md
  source_intake_index_v1.md
```

说明：

```text
source_video_analysis_v1.md：完整综合解析
source_video_timeline_v1.md：逐镜头 / 时间轴解析
source_video_dialogue_v1.md：对白、字幕、屏幕文字
source_video_audio_v1.md：音乐、环境音、拟音、声音钩子
source_video_camera_v1.md：镜头语言、景别、机位、运动、剪辑
source_video_priority_map_v1.md：核心、亮点、可选、可压缩、可替换、不应照搬
source_gate_handoff_v1.md：给选题阶段的精简交接
source_intake_index_v1.md：所有解析文件的索引、章节摘要和读取建议
```

### 3.2 项目尚未创建时

如果用户先上传视频，还没有项目名，建议先写入临时 intake：

```text
projects/_intake/<timestamp-or-slug>/
  source_video_analysis_v1.md
  source_video_timeline_v1.md
  topic_gate_handoff_v1.md
  source_intake_index_v1.md
```

当 `scene-topic-gate` 判断值得建项后，再迁移或复制到：

```text
projects/<project>/inputs/source_intake/
```

### 3.3 不建议的位置

不建议写入：

```text
docs/
.handoff/
assets/
outputs/
```

原因：

- `docs/` 是人类设计说明，不是项目执行上下文；
- `.handoff/` 是交接文档，不参与阶段运行；
- `assets/` 是长期复用资产库，不应保存某个项目的视频解析；
- `outputs/` 更适合最终提示词和发布素材，不适合原始解析资料。

---

## 4. PROJECT_BOARD 中的保存方式

`PROJECT_BOARD.md` 只保存轻量摘要和文件路径。

推荐结构：

```yaml
source_intake:
  type: video_clip
  status: analyzed
  source_path_or_url:
  source_duration_seconds:
  source_language_hint:
  source_summary:
  intake_version: v1
  files:
    index: inputs/source_intake/source_intake_index_v1.md
    analysis: inputs/source_intake/source_video_analysis_v1.md
    timeline: inputs/source_intake/source_video_timeline_v1.md
    dialogue: inputs/source_intake/source_video_dialogue_v1.md
    audio: inputs/source_intake/source_video_audio_v1.md
    camera: inputs/source_intake/source_video_camera_v1.md
    priority_map: inputs/source_intake/source_video_priority_map_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

原则：

```text
黑板中不放完整逐镜头表。
黑板中不放完整台词表。
黑板中不放完整长分析正文。
```

---

## 5. source_intake_index 的作用

`source_intake_index_v1.md` 是后续阶段最重要的入口文件。

它应该包含：

```yaml
source_intake_index:
  version:
  source_summary:
  file_manifest:
    - file:
      content_type:
      when_to_read:
      key_sections:
  chapter_index:
    topic_gate:
    reference_decider:
    design_builder:
    script_adapter:
    performance_director:
    storyboard_director:
    audio_director:
    video_prompt_builder:
  priority_summary:
    core_must_keep:
    highlight_should_keep:
    pass_or_compress:
    safe_to_replace:
    avoid_copying:
  read_policy:
    default_stage_budget: compact
    recommended_first_read:
      - topic_gate_handoff_v1.md
      - source_video_priority_map_v1.md
    avoid_default_full_read:
      - source_video_analysis_v1.md
      - source_video_timeline_v1.md
```

作用：

```text
让后续阶段先知道应该读什么，而不是一上来读取所有长文件。
```

---

## 6. 后续阶段读取策略

### 6.1 `scene-topic-gate`

默认读取：

```text
PROJECT_BOARD.md
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
```

必要时读取：

```text
inputs/source_intake/source_intake_index_v1.md
```

不默认读取完整：

```text
source_video_analysis_v1.md
source_video_timeline_v1.md
```

### 6.2 `scene-reference-decider`

默认读取：

```text
source_video_priority_map_v1.md
```

重点看：

```text
safe_to_replace
avoid_copying
keep_structure
replace_elements
```

### 6.3 `scene-design-builder`

默认读取：

```text
source_video_priority_map_v1.md
source_video_camera_v1.md 的视觉锚点摘要
```

必要时读取：

```text
source_video_analysis_v1.md 的人物 / 主体 / 场景章节
```

### 6.4 `scene-script-adapter`

默认读取：

```text
source_video_priority_map_v1.md
topic_gate_handoff_v1.md
```

重点继承：

```text
core_must_keep
highlight_should_keep
pass_or_compress
safe_to_replace
```

剧本阶段必须说明：

```text
保留了哪些内容
压缩了哪些内容
删除了哪些内容
替换了哪些内容
```

### 6.5 `scene-performance-director`

默认读取：

```text
source_video_analysis_v1.md 的人物动作 / 情绪章节摘要
source_video_audio_v1.md 的节奏和声音钩子摘要
```

不默认读取完整逐镜头表。

### 6.6 `scene-storyboard-director`

默认读取：

```text
source_video_camera_v1.md
source_video_timeline_v1.md 的 key shots 摘要
source_video_priority_map_v1.md
```

必要时读取完整时间轴相关片段。

分镜阶段应保留：

```text
抽象镜头语言
节奏功能
空间调度功能
动作因果
```

不应照搬具体受保护表达。

### 6.7 `scene-audio-director`

默认读取：

```text
source_video_audio_v1.md
```

重点看：

```text
music
ambience
foley
dialogue_or_voice
sync_points
audio_must_keep
audio_can_replace
```

### 6.8 `scene-video-prompt-builder`

默认读取：

```text
source_intake_index_v1.md
source_video_priority_map_v1.md
分镜阶段输出
声音阶段输出
```

只在需要源视频细节校验时读取具体解析文件。

---

## 7. 分级读取预算

建议设置三档：

```yaml
source_intake_read_budget:
  compact:
    read:
      - PROJECT_BOARD.md source_intake summary
      - topic_gate_handoff_v1.md
      - source_video_priority_map_v1.md
  standard:
    read:
      - source_intake_index_v1.md
      - 当前阶段相关专用文件
  deep:
    read:
      - source_video_analysis_v1.md
      - source_video_timeline_v1.md 的相关章节
    only_when:
      - 用户要求复盘源视频
      - 当前阶段需要解决关键不确定性
      - 分镜 / 剧本需要核对具体动作链
```

原则：

```text
默认 compact。
按需 standard。
谨慎 deep。
```

---

## 8. 长解析文件的章节锚点

为了方便后续阶段按章节读取，长文件应使用稳定标题。

建议 `source_video_analysis_v1.md` 包含：

```text
# Source Video Analysis v1
## 1. Metadata
## 2. One Sentence Summary
## 3. Detailed Summary
## 4. Characters / Subjects
## 5. Scene Space
## 6. Action Continuity
## 7. Dialogue / Text
## 8. Audio Observations
## 9. Camera Language
## 10. Visual Style
## 11. Core Highlight Analysis
## 12. Content Priority Map
## 13. Safe Adaptation Notes
## 14. Topic Gate Handoff
## 15. Uncertainty Notes
```

建议 `source_video_timeline_v1.md` 包含：

```text
# Source Video Timeline v1
## Timeline Index
## Shot S01
## Shot S02
## Shot S03
...
```

这样后续阶段可以只读取相关章节，而不是整份文件。

---

## 9. 版本管理

源视频解析可能会迭代。

建议版本命名：

```text
source_video_analysis_v1.md
source_video_analysis_v2.md
source_video_timeline_v1.md
source_video_timeline_v2.md
```

黑板中记录当前有效版本：

```yaml
source_intake:
  active_version: v1
  previous_versions:
    - v0
  files:
    analysis: inputs/source_intake/source_video_analysis_v1.md
```

原则：

```text
后续阶段只读 active_version。
旧版本保留但不默认读取。
```

---

## 10. 如果项目被放弃或未通过选题

如果 `scene-topic-gate` 判断不进入正式项目，有两种处理方式：

### 10.1 临时 intake 保留

```text
projects/_intake/<slug>/
```

保留用于之后复盘或重新选题。

### 10.2 转为 abandoned 状态

在临时黑板或 intake index 中写：

```yaml
intake_status: abandoned_after_topic_gate
reason:
```

不建议删除源解析，因为用户之后可能会要求换角度重新做。

---

## 11. 对 v6 设计文档的修正建议

`docs/SceneForge-v6-Video-Intake-System.md` 中“产物落盘建议”应扩展为：

```text
完整解析、逐镜头时间轴、声音解析、镜头语言解析、内容优先级表和 topic gate handoff 应拆分落盘。
PROJECT_BOARD 只保留摘要、路径、active_version 和 read_policy。
后续阶段默认读取 topic_gate_handoff + priority_map；需要时按阶段读取专用文件。
```

---

## 12. 一句话总结

```text
scene-video-intake 的长解析内容应该存到具体项目的 inputs/source_intake/ 目录；PROJECT_BOARD 只做轻量索引；后续阶段通过 source_intake_index 和 read_policy 按需读取，避免把完整视频解析当作每阶段默认上下文。
```
