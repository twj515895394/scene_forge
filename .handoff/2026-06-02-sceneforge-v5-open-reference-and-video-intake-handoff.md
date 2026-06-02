# SceneForge v5 完成与 v6 Video Intake 实施交接

日期：2026-06-02

## 1. 本 handoff 目的

本 handoff 用于新会话继续执行 SceneForge v6。

当前状态：

```text
v4 expressive_animation：已完成第一轮协议落地
v5 storyboard_director_v5：已完成第一轮协议落地
Open Reference：已接入总控、黑板模板和 board protocol
v6 Video Intake：设计文档、存储读取策略、资产化策略、实施计划已完成
```

下一步：

```text
按照 docs/SceneForge-v6-Video-Intake-Implementation-Plan.md 开始执行协议改造。
```

---

## 2. 当前已完成文档

### v4 / v5 / Open Reference

```text
docs/SceneForge-v4-Protocol-Review.md
docs/SceneForge-v5-Protocol-Review.md
docs/SceneForge-v5-Open-Reference-and-Protocol-Review.md
```

### v6 Video Intake 设计与计划

```text
docs/SceneForge-v6-Video-Intake-System.md
docs/SceneForge-v6-Video-Intake-Storage-and-Reading-Strategy.md
docs/SceneForge-v6-Source-Intake-Assetization-Strategy.md
docs/SceneForge-v6-Video-Intake-Implementation-Plan.md
```

新会话应优先读取：

```text
docs/SceneForge-v6-Video-Intake-Implementation-Plan.md
```

如果需要理解设计背景，再读取：

```text
docs/SceneForge-v6-Video-Intake-System.md
```

如果需要处理长解析存储或资产化，再读取：

```text
docs/SceneForge-v6-Video-Intake-Storage-and-Reading-Strategy.md
docs/SceneForge-v6-Source-Intake-Assetization-Strategy.md
```

---

## 3. v6 目标

v6 要新增一个条件触发的前置阶段：

```text
scene-video-intake
```

当用户提供视频片段、视频链接、视频文件或截图序列，并希望基于该视频进行分析、改编或制作项目时，流程应变为：

```text
scene-video-intake
-> scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

普通文字输入仍然直接走：

```text
scene-topic-gate
-> ...
```

`scene-video-intake` 不替代 `scene-topic-gate`，只负责把视频源解析成结构化创作资料，并生成 `topic_gate_handoff`。

---

## 4. v6 必须解决的核心问题

### 4.1 视频解析内容会很长

完整解析不能塞进 `PROJECT_BOARD.md`。

采用三层存储：

```text
1. 完整长解析文件：projects/<project>/inputs/source_intake/*
2. 章节索引文件：source_intake_index_v1.md
3. PROJECT_BOARD 轻量摘要：只存路径、摘要、active_version、read_policy
```

项目已创建时：

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

项目未创建时：

```text
projects/_intake/<timestamp-or-slug>/
```

### 4.2 后续阶段不能默认读取完整长解析

默认读取：

```text
PROJECT_BOARD.md source_intake summary
topic_gate_handoff_v1.md
source_video_priority_map_v1.md
```

按需读取：

```text
source_intake_index_v1.md
当前阶段相关专用文件
```

谨慎深读：

```text
source_video_analysis_v1.md
source_video_timeline_v1.md 的相关章节
```

### 4.3 视频内容要做重要性分层

必须输出：

```yaml
content_priority_map:
  core_must_keep:
  highlight_should_keep:
  useful_optional:
  pass_or_compress:
  safe_to_replace:
  avoid_copying:
```

后续剧本、分镜和视频提示词阶段需要清楚：

```text
哪些保留
哪些压缩
哪些删减
哪些替换
哪些不应照搬
```

### 4.4 解析结果可能资产化

默认身份：

```text
project input：服务当前项目的源视频解析资料
```

如果片段具备跨项目复用价值，可经确认提升为：

```text
reusable source asset：可被多个项目复用的源片段资产
```

资产目录建议：

```text
assets/source-materials/<source-slug>/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

不应自动资产化。必须先标记候选，再由用户确认。

---

## 5. 关键新增字段

### 5.1 `source_intake`

建议加入 `PROJECT_BOARD.md` 顶层：

```yaml
source_intake:
  type: video_clip
  status: pending | analyzed | skipped | failed
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version: v1
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
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode: direct_reference | adapted_reference | structure_only
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

### 5.2 `scene-video-intake` 补丁核心字段

```yaml
patch_type: scene-video-intake
version: 1
status:
updated_at:
summary:
data:
  source_video:
  content_summary:
  timeline_breakdown:
  camera_language_analysis:
  characters_or_subjects:
  scene_space_analysis:
  action_continuity:
  dialogue_transcript:
  audio_observations:
  visual_style_analysis:
  core_highlight_analysis:
  content_priority_map:
  adaptation_potential:
  safe_adaptation_notes:
  assetization:
  topic_gate_handoff:
  output_files:
  read_policy:
  risk_notes:
  next_action:
```

---

## 6. 实施计划摘要

完整计划见：

```text
docs/SceneForge-v6-Video-Intake-Implementation-Plan.md
```

推荐执行顺序：

```text
1. 新增 scene-video-intake Skill 与 output contract
2. 修改 board-protocol 与 project-board-template，加入 source_intake
3. 修改 scene-forge 总控路由
4. 修改 scene-topic-gate 输入和输出协议
5. 补 README
6. 生成 v6 Protocol Review
7. 再做最小测试
```

---

## 7. 需要修改的文件

### 新增

```text
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
docs/SceneForge-v6-Video-Intake-Protocol-Review.md
```

### 修改

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
.agents/skills/scene-topic-gate/SKILL.md
.agents/skills/scene-topic-gate/references/output-contract.md
README.md
```

### 可选新增资产目录

只有用户确认资产化时才创建：

```text
assets/source-materials/<source-slug>/
```

不要提前把整个目录加入 `allowed_runtime_asset_paths`。

如果当前项目明确引用某个 source asset，只允许加入具体文件，例如：

```text
assets/source-materials/<source-slug>/source-card.md
assets/source-materials/<source-slug>/adaptation-angles.md
assets/source-materials/<source-slug>/safety-boundaries.md
```

---

## 8. 路由规则重点

总控应触发 `scene-video-intake` 的情况：

```text
用户上传视频文件
用户提供视频链接
用户提供短视频链接
用户上传截图序列并表示来自同一段视频
用户明确说“分析这个视频”
用户明确说“根据这个视频片段做”
用户要求从视频中提取分镜、镜头、动作、台词、声音或亮点
```

不应触发：

```text
用户只是描述剧情
用户只给影视片名或桥段名
用户只给文字台词
用户已经给出明确改编目标且不需要解析源视频
用户只是询问协议、SOP 或项目设计
```

模糊链接时应询问：

```text
这是要作为源视频片段解析，还是只是作为参考资料？
```

---

## 9. 与 Open Reference 的关系

`scene-video-intake` 同样遵守：

```text
模板、示例、枚举、pattern 都是参考锚点，不是封闭集合。
```

如果视频中出现模板没有覆盖的表达，应使用：

```yaml
selection_mode: custom_generated
reason:
```

Source Asset 也只是参考锚点，不是强制模板。

如果只借用抽象结构，不借用具体人物、台词或场景，应写：

```yaml
reuse_mode: structure_only
```

---

## 10. 最小测试建议

### 10.1 普通视频输入测试

输入：

```text
用户上传一个 10-30 秒视频片段，并说：根据这个视频做一个动画短片项目。
```

期望：

```text
scene-forge
-> scene-video-intake
-> source_intake 写入
-> next_stage: scene-topic-gate
```

观察点：

```text
没有直接进入 scene-topic-gate
生成 topic_gate_handoff
生成 content_priority_map
长解析写入 inputs/source_intake/
黑板只保存摘要和路径
后续 topic gate 使用 intake handoff
```

### 10.2 资产化候选测试

输入：

```text
用户说明这个片段类似经典名场面，后续可能反复用。
```

期望：

```yaml
source_intake:
  assetization:
    candidate_for_assetization: true
    asset_status: proposed
```

但不自动创建：

```text
assets/source-materials/<source-slug>/
```

除非用户确认。

### 10.3 旧流程回归测试

输入：

```text
用户只给一句创作意图，没有视频。
```

期望：

```text
直接进入 scene-topic-gate，不触发 scene-video-intake。
```

---

## 11. 风险提醒

### 11.1 不要把完整视频解析塞进黑板

黑板只存摘要、路径、active_version 和 read_policy。

### 11.2 不要让后续阶段默认读完整长解析

默认 compact，按需 standard，谨慎 deep。

### 11.3 不要自动资产化

source asset 是长期资产，必须经过用户确认。

### 11.4 不要照搬源视频

使用 `safe_to_replace`、`avoid_copying`、`reuse_mode: structure_only` 控制边界。

### 11.5 不要读取 docs / handoff 作为运行时上下文

本 handoff 和 docs 只用于实施协议改造。真正执行项目阶段时仍应遵守运行时读取边界。

---

## 12. 最新 commits

最近关键提交：

```text
206e28dd5608e9ba8f48e9e9cc8ea915b2d2eaa0  add v6 video intake system design
ce242a3a4322acd81a608c9d7fd32074f2a72d9a  add v6 video intake storage and reading strategy
9f4597f65d4656309e4e3c9eb3761fae7d855533  add source intake assetization strategy
b1cdd4a6e7ec62733ea87c9200d3520e547bfc9d  update v6 video intake design with assetization strategy
dbe46cf9e6475622a1ac1fc73512a204e45648b4  add v6 video intake implementation plan
```

---

## 13. 一句话总结

```text
下个会话应从 docs/SceneForge-v6-Video-Intake-Implementation-Plan.md 开始，先新增 scene-video-intake Skill 和 output contract，再改黑板协议、总控路由和 topic gate；重点是长解析落项目 inputs/source_intake，黑板只存索引，经典片段可经确认提升为 assets/source-materials。
```
