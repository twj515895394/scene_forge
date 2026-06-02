# SceneForge v6：Video Intake / Source Intake 实施计划

日期：2026-06-02

## 1. 实施目标

v6 的目标是在 SceneForge 主流程前新增一个条件触发的源视频解析前置阶段：

```text
scene-video-intake
```

当用户提供视频片段、视频链接、视频文件或截图序列，并希望基于该视频进行分析、改编或制作项目时，总控不应直接进入 `scene-topic-gate`，而应先：

```text
scene-video-intake
-> 生成 source_intake 长解析与 topic_gate_handoff
-> scene-topic-gate
-> 后续主流程
```

v6 必须同时解决：

1. 视频解析内容很长，如何保存和按需读取；
2. 哪些源视频内容是核心、亮点、可选、可压缩、可替换、不应照搬；
3. 后续选题、剧本、分镜、声音和视频提示词阶段如何读取；
4. 部分经典片段如何经过确认提升为可复用 source asset。

---

## 2. 已完成设计依据

本实施计划基于以下设计文档：

```text
docs/SceneForge-v6-Video-Intake-System.md
docs/SceneForge-v6-Video-Intake-Storage-and-Reading-Strategy.md
docs/SceneForge-v6-Source-Intake-Assetization-Strategy.md
```

当前已完成的前置能力：

```text
v4 expressive_animation：动画表现力扩展
v5 storyboard_director_v5：专业分镜导演增强
open-reference：模板 / 示例 / 枚举 / pattern 均为参考锚点，不是封闭集合
```

---

## 3. 新增核心概念

### 3.1 `scene-video-intake`

新增 Skill，负责把用户提供的视频源解析成结构化创作资料。

职责：

```text
接收视频输入
提取基础信息
生成内容摘要
生成逐镜头时间轴
分析主体、场景、动作、声音和镜头语言
生成内容优先级分层
生成 topic_gate_handoff
判断是否具备资产化候选价值
```

### 3.2 `source_intake`

新增 `PROJECT_BOARD.md` 顶层字段，用于记录源输入解析状态、文件路径、摘要、读取策略和资产化状态。

### 3.3 `source_intake` 长内容文件

完整解析不进入黑板，而落盘到：

```text
projects/<project>/inputs/source_intake/
```

或项目尚未创建时：

```text
projects/_intake/<timestamp-or-slug>/
```

### 3.4 `assets/source-materials/`

新增可选长期资产目录，用于保存经过确认的可复用源片段资产。

例如：

```text
assets/source-materials/huaqiang-buy-watermelon/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

---

## 4. Phase 1：新增 `scene-video-intake` Skill

### 4.1 新增文件

```text
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
```

### 4.2 `SKILL.md` 需要包含

1. 触发条件；
2. 输入类型：video file / video url / frame sequence / unknown；
3. 运行时读取边界；
4. 不读取 `docs/`、`.handoff/`、历史项目输出；
5. 输出长解析文件与黑板补丁；
6. 默认不自动资产化；
7. 只输出分析资料，不生成视频。

### 4.3 `output-contract.md` 需要包含

补丁壳：

```yaml
patch_type: scene-video-intake
version: 1
status:
updated_at:
summary:
data:
```

核心字段：

```yaml
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

### 4.4 输出文件要求

`scene-video-intake` 应生成或声明以下文件：

```text
inputs/source_intake/source_video_analysis_v1.md
inputs/source_intake/source_video_timeline_v1.md
inputs/source_intake/source_video_priority_map_v1.md
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_intake_index_v1.md
```

如果音频、对白或镜头信息足够复杂，可拆出：

```text
inputs/source_intake/source_video_dialogue_v1.md
inputs/source_intake/source_video_audio_v1.md
inputs/source_intake/source_video_camera_v1.md
```

---

## 5. Phase 2：改造总控 `scene-forge`

### 5.1 修改文件

```text
.agents/skills/scene-forge/SKILL.md
```

### 5.2 新增触发逻辑

在“何时使用”和“执行步骤”中加入：

```text
当用户提供视频片段、视频链接、视频文件或截图序列，并表达希望基于该视频进行分析、改编或制作项目时，总控优先路由到 scene-video-intake。
```

### 5.3 主流程说明改造

当前主流程保持：

```text
scene-topic-gate -> ...
```

新增可选前置：

```text
scene-video-intake -> scene-topic-gate -> ...
```

### 5.4 总控规则

总控不得：

```text
直接把视频输入当作普通文字选题进入 scene-topic-gate
跳过 scene-video-intake 后直接写剧本
一次性连跑 video-intake 和 topic-gate，除非协议明确允许并且用户确认
```

总控应该：

```text
识别视频输入
创建或定位项目目录
触发 scene-video-intake
合并 source_intake 补丁
将 next_stage 推进到 scene-topic-gate
```

---

## 6. Phase 3：改造黑板协议与项目模板

### 6.1 修改文件

```text
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

### 6.2 顶层字段新增

```yaml
source_intake:
```

### 6.3 模板默认结构

```yaml
source_intake:
  type:
  status:
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version:
  files:
    index:
    analysis:
    timeline:
    dialogue:
    audio:
    camera:
    priority_map:
    topic_gate_handoff:
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
  assetization:
    candidate_for_assetization:
    reason:
    suggested_asset_slug:
    asset_status:
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode:
  read_policy:
    default_read:
    read_full_analysis_only_when_needed:
    downstream_must_not_load_all_by_default:
```

### 6.4 状态枚举

```yaml
source_intake.status: pending | analyzed | skipped | failed
assetization.asset_status: none | proposed | confirmed | created
source_asset_ref.reuse_mode: direct_reference | adapted_reference | structure_only
```

说明：这些枚举仍受 `reference_policy` 约束，除非写明 `strict_enum: true`，否则可根据项目需要扩展。

---

## 7. Phase 4：改造 `scene-topic-gate`

### 7.1 修改文件

```text
.agents/skills/scene-topic-gate/SKILL.md
.agents/skills/scene-topic-gate/references/output-contract.md
```

### 7.2 新增输入规则

如果 `PROJECT_BOARD.md` 存在：

```yaml
source_intake:
  status: analyzed
  files:
    topic_gate_handoff:
    priority_map:
```

则 `scene-topic-gate` 应优先读取：

```text
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
```

必要时读取：

```text
inputs/source_intake/source_intake_index_v1.md
```

不应默认读取完整：

```text
source_video_analysis_v1.md
source_video_timeline_v1.md
```

### 7.3 输出补丁新增

`scene-topic-gate` 输出时应记录：

```yaml
source_intake_used: true | false
source_intake_files_read:
source_intake_summary_used:
assetization_recommendation:
```

### 7.4 选题判断新增维度

基于 source intake 增加：

```text
源视频核心是否清晰
亮点是否足够支撑改编
可压缩内容是否明确
可替换内容是否明确
是否有不应照搬元素
是否具备资产化候选价值
```

---

## 8. Phase 5：长解析存储与读取策略落地

### 8.1 实施位置

主要落在：

```text
scene-video-intake/output-contract.md
board-protocol.md
project-board-template.md
scene-topic-gate/output-contract.md
```

### 8.2 文件分层

必须形成：

```text
source_intake_index_v1.md
source_video_analysis_v1.md
source_video_timeline_v1.md
source_video_priority_map_v1.md
topic_gate_handoff_v1.md
```

可选形成：

```text
source_video_dialogue_v1.md
source_video_audio_v1.md
source_video_camera_v1.md
```

### 8.3 读取预算

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
      - 分镜或剧本需要核对具体动作链
```

---

## 9. Phase 6：Source Asset 资产化机制

### 9.1 不自动资产化

`scene-video-intake` 只能判断：

```yaml
candidate_for_assetization: true | false | uncertain
```

不能自动写入 `assets/source-materials/`，除非用户确认。

### 9.2 新增可选资产目录

```text
assets/source-materials/<source-slug>/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

### 9.3 资产化触发条件

可以考虑资产化的情况：

```text
用户明确说以后会反复用
片段是经典名场面、网络名梗或高传播桥段
片段有清晰可迁移结构
片段支持多个改编角度
片段已经被多个项目引用
片段有可复用镜头语言、表演节奏或声音节奏
```

### 9.4 资产化确认流程

```text
source_intake 标记 candidate_for_assetization
-> 生成 source asset draft
-> 用户确认
-> 写入 assets/source-materials/<source-slug>/
-> 更新 source_intake.source_asset_ref
-> 更新 reuse-history.md
```

### 9.5 allowed_runtime_asset_paths 规则

不应把整个目录加入白名单：

```yaml
allowed_runtime_asset_paths:
  - assets/source-materials/
```

只在当前项目明确引用某个 source asset 时，加入具体文件：

```yaml
allowed_runtime_asset_paths:
  - assets/source-materials/<source-slug>/source-card.md
  - assets/source-materials/<source-slug>/adaptation-angles.md
  - assets/source-materials/<source-slug>/safety-boundaries.md
```

---

## 10. Phase 7：更新 README 与文档索引

### 10.1 修改文件

```text
README.md
```

### 10.2 新增说明

README 应说明：

```text
v6 新增 scene-video-intake，可在用户提供视频片段时先解析源视频，再进入选题阶段。
```

并说明长解析不进入黑板，保存在：

```text
projects/<project>/inputs/source_intake/
```

可复用源片段资产保存在：

```text
assets/source-materials/<source-slug>/
```

---

## 11. Phase 8：v6 Protocol Review

新增：

```text
docs/SceneForge-v6-Video-Intake-Protocol-Review.md
```

Review 必须检查：

1. `scene-video-intake` Skill 是否存在；
2. output contract 是否覆盖长解析、优先级分层、topic gate handoff 和 assetization；
3. 总控是否能识别视频输入并路由；
4. `PROJECT_BOARD` 是否有 `source_intake`；
5. `board-protocol` 是否说明 `source_intake`；
6. `scene-topic-gate` 是否优先读取 `source_intake.topic_gate_handoff`；
7. 长解析是否不塞入黑板；
8. source asset 是否需要确认后才创建；
9. `allowed_runtime_asset_paths` 是否只允许具体 source asset 文件；
10. Open Reference 是否仍适用。

---

## 12. Phase 9：最小测试

### 12.1 普通视频输入测试

输入：

```text
用户上传一个 10-30 秒视频片段，并说：根据这个视频做一个动画短片项目。
```

期望流程：

```text
scene-forge
-> scene-video-intake
-> source_intake 写入
-> next_stage: scene-topic-gate
```

观察点：

1. 没有直接进入 `scene-topic-gate`；
2. 生成 `topic_gate_handoff`；
3. 生成 `content_priority_map`；
4. 长解析写入 `inputs/source_intake/`；
5. 黑板只保存摘要和路径；
6. 后续 topic gate 使用 intake handoff。

### 12.2 资产化候选测试

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

### 12.3 旧流程回归测试

输入：

```text
用户只给一句创作意图，没有视频。
```

期望：

```text
直接进入 scene-topic-gate，不触发 scene-video-intake。
```

---

## 13. 实施顺序建议

建议按以下顺序执行：

```text
1. 新增 scene-video-intake Skill 与 output contract
2. 修改 board-protocol 与 project-board-template，加入 source_intake
3. 修改 scene-forge 总控路由
4. 修改 scene-topic-gate 输入和输出协议
5. 补 README
6. 生成 v6 Protocol Review
7. 再做最小测试
```

原因：

```text
先定义子 Skill 输出，再改黑板协议，最后改总控路由和 topic gate，风险最低。
```

---

## 14. 风险与控制

### 14.1 黑板膨胀风险

控制：

```text
PROJECT_BOARD 只保存摘要、路径、active_version 和 read_policy。
```

### 14.2 后续阶段读取过多风险

控制：

```text
默认 compact 读取；按需 standard；谨慎 deep。
```

### 14.3 资产库污染风险

控制：

```text
不自动资产化；必须用户确认；只把具备复用价值的片段提升到 assets/source-materials。
```

### 14.4 照搬源视频风险

控制：

```text
content_priority_map 区分 safe_to_replace 和 avoid_copying。
source asset 强调 structure_only 和 safety-boundaries。
```

### 14.5 路由误判风险

控制：

```text
只有用户明确提供视频源并希望基于其分析 / 改编 / 制作时，才触发 scene-video-intake。
模糊链接先询问用途。
```

---

## 15. 完成标准

v6 第一轮实施完成的标准：

```text
scene-video-intake Skill 已新增
source_intake 顶层字段已进入 board protocol 和 project template
scene-forge 总控可识别视频输入并路由
scene-topic-gate 可读取 source_intake handoff
长解析文件有明确落盘路径和读取策略
assetization 有候选判断和确认机制
v6 Protocol Review 通过
```

---

## 16. 一句话总结

```text
v6 实施的重点不是“多一个视频总结步骤”，而是让 SceneForge 在面对视频源输入时，先生成可索引、可读取、可改编、可资产化的 source_intake，再把精简 handoff 交给 scene-topic-gate 做选题判断。
```
