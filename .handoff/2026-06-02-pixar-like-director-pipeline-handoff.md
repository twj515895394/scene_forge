# 2026-06-02 Pixar-like 动画导演链路增强交接

## 交接目的

本交接文档记录本轮围绕 SceneForge `pixar_like` 动画电影风格路线完成的设计、协议、Skill 增强与后续待办。

当前阶段目标不是做多风格系统，而是先把第一套 Pixar-like 动画导演链路跑通、跑透。

核心路线：

```text
先跑通 pixar_like
↓
沉淀通用导演协议
↓
后续再抽象多风格 Style Profile
```

---

# 一、本轮优化重点

本轮主要补齐了 SceneForge 从“视频提示词流水线”升级到“动画导演流水线”所缺的中间导演层。

重点增强包括：

1. 新增 Story Beat 叙事节拍层。
2. 新增 Performance Director 表演导演阶段。
3. 新增 Audio Director 声音导演阶段。
4. 升级 Storyboard Director 为导演意图型分镜。
5. 升级 Video Prompt Builder，使其整合表演、分镜、声音和 Segment 拼接规则。
6. 修正 `segment_duration_seconds` 的语义，明确它是单个视频生成片段时长，不是整片时长。
7. 增加 `performance_ready` 与 `audio_ready` 状态。
8. 增加 PROJECT_BOARD 顶层建议字段：`target_total_duration_seconds`、`story_beat_count`、`shot_count`、`segment_count`。

---

# 二、当前最新目标链路

增强后的目标主链路为：

```text
scene-topic-gate
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

新增阶段：

```text
scene-performance-director
scene-audio-director
```

新增状态：

```text
performance_ready
audio_ready
```

---

# 三、已新增文档

## 1. Pixar-like 路线实施计划

```text
docs/皮克斯电影风格路线实施计划.md
```

用途：

- 记录当前 Pixar-like 路线的实施计划。
- 跟踪 P0 / P1 / P2 / P3 清单。
- 当前已标记 P0、P1、P2 完成，P3 进入样例验证。

## 2. PROJECT_BOARD 与状态机增量协议

```text
docs/皮克斯路线PROJECT_BOARD与状态机增量协议.md
```

用途：

- 作为原主协议的增量补丁。
- 记录 `performance_ready`、`audio_ready`。
- 记录新增顶层字段。
- 记录增强后的 next_stage 主链路。
- 记录 Story Beat / Shot / Segment 三层时间模型。

## 3. 多风格 AI 导演系统设计

```text
docs/多风格AI导演系统设计.md
```

用途：

- 记录后续平台化、多风格扩展方向。
- 明确 Pixar-like 是第一套验证风格，不是系统边界。
- 当前阶段暂不落地多风格，只作为后续演进设计。

## 4. v2 协议升级设计

```text
docs/SceneForge-v2-Protocol-Upgrade-Design.md
```

用途：

- 记录 v2 协议层设计。
- 包含 Story Beat、Performance Director、Audio Director、三层时间模型等结构。

## 5. Pixar Production System Enhancement Plan

```text
docs/SceneForge-Pixar-Production-System-Enhancement-Plan.md
```

用途：

- 记录 Pixar-like 动画电影路线的总体增强方向。
- 包含角色魅力、情绪曲线、镜头语言、表演、声音、音乐、节奏等增强维度。

---

# 四、已新增 Skill

## 1. scene-performance-director

新增文件：

```text
.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-performance-director/references/output-contract.md
```

职责：

- 把剧本和 Story Beat 转成动画电影级表演方案。
- 设计眼神、微表情、身体重心、手部动作、停顿、反应节奏和角色标志性动作。
- 产出 `details/performance_sheet_v*.md`。

阶段推进：

```yaml
project_status: performance_ready
next_stage: scene-storyboard-director
```

## 2. scene-audio-director

新增文件：

```text
.agents/skills/scene-audio-director/SKILL.md
.agents/skills/scene-audio-director/references/output-contract.md
```

职责：

- 把分镜和表演方案转成声音导演方案。
- 设计配音方向、气口、拟音、环境音、音乐主题、静默点和混音计划。
- 产出：

```text
details/audio_plan_v*.md
outputs/audio/music_prompt_v*.md
outputs/audio/foley_prompt_v*.md
outputs/audio/audio_mix_plan_v*.md
```

阶段推进：

```yaml
project_status: audio_ready
next_stage: scene-video-prompt-builder
```

---

# 五、已升级 Skill

## 1. scene-script-adapter

已更新：

```text
.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-script-adapter/references/output-contract.md
```

主要变化：

- 从 `scene_beats` 升级为 `story_beats`。
- 新增 `target_total_duration_seconds`。
- 新增 `performance_handoff`。
- 下一阶段从 `scene-storyboard-director` 改为 `scene-performance-director`。

现在完成后建议推进：

```yaml
project_status: script_ready
next_stage: scene-performance-director
```

## 2. scene-storyboard-director

已更新：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

主要变化：

- 消费 `performance_sheet`。
- 新增 `camera_intent`、`acting_intent`、`sound_intent`。
- Segment Plan 现在必须记录 `covered_beats`、`covered_shots`、`continuity_in`、`continuity_out`。
- 下一阶段从 `scene-video-prompt-builder` 改为 `scene-audio-director`。

现在完成后建议推进：

```yaml
project_status: storyboard_ready
next_stage: scene-audio-director
```

## 3. scene-video-prompt-builder

已更新：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

主要变化：

- 消费 `performance_sheet`。
- 消费 `audio_plan`、`music_prompt`、`foley_prompt`、`audio_mix_plan`。
- 每段 Segment Prompt 必须整合：动作、运镜、表演、台词、拟音、音乐、环境音、静默点和拼接连续性。
- 项目状态入口从 `storyboard_ready` 调整为 `audio_ready`。

现在完成后建议推进：

```yaml
project_status: video_prompts_ready
next_stage: scene-publish-review
```

---

# 六、关键协议修正

## 1. segment_duration_seconds 语义修正

现在统一定义为：

```text
单个视频生成片段的目标时长。
```

它不是整条视频总时长。

正确理解：

```text
完整视频 = 多个 10 秒或 15 秒 Segment 拼接
```

## 2. 三层时间模型

统一采用：

```text
Story Beat
  -> Shot
    -> Segment
      -> Final Video
```

说明：

- Story Beat：叙事情绪节拍。
- Shot：导演镜头表达单元。
- Segment：视频生成技术切片。

## 3. PROJECT_BOARD 建议新增字段

```yaml
target_total_duration_seconds:
story_beat_count:
shot_count:
segment_count:
```

## 4. 新状态机片段

```text
script_ready
-> performance_ready
-> storyboard_ready
-> audio_ready
-> video_prompts_ready
```

---

# 七、当前实施清单状态

当前实施计划文档中状态为：

```text
P0：完成
P1：完成
P2：完成
P3：进行中
```

## P0 已完成

- 新增实施计划文档。
- 新增 `scene-performance-director` Skill 与输出协议。
- 新增 `scene-audio-director` Skill 与输出协议。

## P1 已完成

- 升级 `scene-script-adapter`。
- 升级 `scene-storyboard-director`。
- 升级 `scene-video-prompt-builder`。
- 修正 `segment_duration_seconds` 解释。

## P2 已完成

- 新增 PROJECT_BOARD 与状态机增量协议。
- 增加 `performance_ready` / `audio_ready`。
- 增加增强后的 next_stage 链路。
- 增加顶层建议字段。

## P3 未完成

P3 是下一步重点：样例验证。

---

# 八、后续待办

## 1. 创建 30 秒样例项目

建议创建一个最小可行样例：

```yaml
target_total_duration_seconds: 30
segment_duration_seconds: 10
story_beat_count: 3
shot_count: 8-12
segment_count: 3
```

## 2. 跑通完整增强链路

需要按顺序执行：

```text
scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
```

## 3. 验证关键问题

需要重点验证：

- Story Beat 是否能稳定指导表演和分镜。
- Performance Sheet 是否能显著提升镜头表演质量。
- Storyboard 是否能正确拆成多个 Segment。
- Audio Plan 是否能解决配音、拟音、音乐、静默的独立设计问题。
- Video Prompt 是否真正融合了表演和声音，而不是只写画面。
- 3 个 10 秒 Segment 是否能自然拼接为 30 秒短片。

## 4. 样例复盘

样例完成后需要补一份复盘文档，建议路径：

```text
.handoff/2026-06-xx-pixar-like-sample-validation-review.md
```

复盘内容应包括：

- 哪些协议字段有用。
- 哪些字段太重或可删减。
- 哪些 Skill 阶段存在职责重叠。
- 哪些输出对最终视频 Prompt 影响最大。
- 是否需要调整 PROJECT_BOARD 顶层字段。
- 是否可以开始抽象 Style Profile。

---

# 九、重要注意事项

## 1. 暂时不要急着做多风格

当前阶段应继续聚焦 Pixar-like 第一套路线。

多风格文档已经记录，但不应成为当前开发阻塞项。

## 2. 不建议直接重写原主协议

当前采用增量协议：

```text
docs/皮克斯路线PROJECT_BOARD与状态机增量协议.md
```

这样可以避免大范围改动原 `docs/协议层与选题闸门设计.md`。

## 3. 不要把 Pixar-like 写死为系统边界

当前可以继续用 Pixar-like 作为内部路线验证，但后续应保持抽象：

```text
高品质 3D 动画电影质感
角色驱动的动画电影表演
电影级镜头和声音设计
```

避免直接复刻具体公司、作品、角色或音乐。

---

# 十、下一步建议

下一步直接进入 P3：

```text
创建一个 30 秒样例项目，用 3 个 Story Beat、8-12 个 Shots、3 个 10 秒 Segments 跑通 script -> performance -> storyboard -> audio -> video prompts 的完整链路。
```

如果样例能跑通，再考虑：

1. 回调各 Skill 的字段复杂度。
2. 合并增量协议到主协议。
3. 抽象 `pixar_like` 为第一个 Style Profile。
4. 开始第二风格包的设计。
