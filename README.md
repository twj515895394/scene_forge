# SceneForge / 名场面工坊

SceneForge 是一套「经典影视 / 热点片段的 3D 动画电影化再创作提示词生产系统」。

它不是单个视频项目，也不是单个提示词模板，而是一套可长期复用的内容生产框架：

- `.agents/skills/`：Agent 可调用的 SOP 能力包。
- `assets/`：长期复用资产库，保存角色、场景、核心道具、动画风格化效果库、反差喜剧模板与专业镜头语言资产库。
- `projects/`：每一次具体片段创作的工作区。
- `outputs/`：跨项目共享的最终提示词模板、制作说明和发布素材文案。
- `docs/`：给人阅读的项目规范说明。
- `.handoff/`：阶段性交接文档。

## 当前状态

SceneForge v3 已将主链路从“自动生成并推进”调整为“方案预览 → 用户确认 → 正式落盘”。

当前重点包括：

- `PROJECT_BOARD.md` 顶层薄索引协议与通用项目记忆字段。
- `context_policy` 与 `token_budget`：执行阶段默认最小上下文读取，不扫描 `docs/`、`.handoff/` 和历史项目输出。
- `assets/animation-stylization/`：v4 执行期可读取的动画风格化与反差喜剧资产库。
- `assets/cinematic-language/`：v5 执行期可读取的基础镜头语言、动画电影镜头模式和动作喜剧镜头模式资产库。
- `expressive_animation`：v4 动画电影级表现力扩展字段，统一记录动画风格化、轻中度卡通伤害尺度和反差喜剧策略。
- `storyboard_director_v5`：v5 专业分镜导演增强字段，统一记录剧本内容拆分、影视镜头语言转换和镜头模式资产选择策略。
- `source_intake`：v6 视频源解析字段，用于记录视频输入解析摘要、长解析文件路径、topic gate handoff、优先级分层和资产化候选状态。
- `user_confirmations`：剧本、设计、分镜、视频提示词等关键阶段必须先确认再落盘。
- `segment_strategy`：区分整片目标时长与单段视频生成时长。
- `hero_moments`、`bridge_shots`、`prop_state_machines`、`blocking_map`、`faction_layout`：用于提升多段视频提示词的看点表达、段落衔接、道具状态和角色空间连续性。
- 后半段产物链路为“设定图 prompt → 故事板图 prompt → 按 10s/15s/混合分段的视频 prompt”。

## v4 表现力扩展

v4 第一轮协议落地新增：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

它解决三类问题：

1. `animation_stylization`：动画电影级夸张物理、喜剧 VFX、动作转译和环境反应。
2. `injury_tone_policy`：允许轻中度卡通受伤表达，同时禁止写实、血腥、残酷和身体恐怖化表达。
3. `contrast_comedy`：通过体型反差、道具反差、性格反差、身份行为反差和画面语境反差制造角色记忆点与喜剧 payoff。

执行期可读取资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

## v5 专业分镜导演增强

v5 第一轮协议落地新增：

```yaml
storyboard_director_v5:
  enabled: true
  confirmation_status: pending_storyboard_plan_confirmation
  assets:
    shot_language_library: assets/cinematic-language/shot-language-library.md
    animation_film_patterns: assets/cinematic-language/animation-film-shot-patterns.md
    animation_comedy_action_patterns: assets/cinematic-language/animation-comedy-action-patterns.md
```

它解决三类问题：

1. `storyboard_content_breakdown`：先把 Story Beat 拆成 action / reaction / emotion_shift / reveal / transition / insert / environment_response 等可拍内容单元。
2. `cinematic_language_plan`：再为内容单元选择景别、机位、构图、镜头运动、剪辑节奏和视觉动机。
3. `selected_shot_pattern`：按需从 `assets/cinematic-language/` 读取抽象镜头模式，但不复制具体电影镜头。

执行期可读取资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

v4 与 v5 的职责区别：

```text
v4 回答：可以用什么动画表现。
v5 回答：这个表现应该怎么拍。
```

## v6 Video Intake / Source Intake

v6 第一轮协议落地新增：

```text
scene-video-intake
```

当用户提供视频文件、视频链接、短视频链接或来自同一段视频的截图序列，并希望基于该视频进行分析、改编或制作项目时，主流程先进入 `scene-video-intake`，再进入 `scene-topic-gate`。

视频源输入流程：

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

普通文字输入仍直接进入：

```text
scene-topic-gate
```

v6 的关键不是普通视频总结，而是生成服务后续创作链路的 `source_intake`：

```yaml
source_intake:
  type: video_clip
  status: pending | analyzed | skipped | failed
  files:
    index: inputs/source_intake/source_intake_index_v1.md
    analysis: inputs/source_intake/source_video_analysis_v1.md
    timeline: inputs/source_intake/source_video_timeline_v1.md
    priority_map: inputs/source_intake/source_video_priority_map_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

完整长解析不进入黑板，而保存到：

```text
projects/<project>/inputs/source_intake/
```

项目尚未创建时，可先保存到：

```text
projects/_intake/<timestamp-or-slug>/
```

如果某个源片段具备跨项目复用价值，`scene-video-intake` 只能先标记资产化候选；只有用户确认后，才可提升为可复用 source asset：

```text
assets/source-materials/<source-slug>/
```

不应把整个 `assets/source-materials/` 加入运行时白名单。若某项目明确引用 source asset，只加入具体文件路径。

人类设计说明：

```text
docs/SceneForge-v4-Animation-Stylization-System.md
docs/SceneForge-v4-Animation-Stylization-Effect-Library.md
docs/SceneForge-v4-Expressive-Extension-System.md
docs/SceneForge-v4-Implementation-Plan.md
docs/SceneForge-v4-Protocol-Review.md
docs/SceneForge-v5-Storyboard-Director-Research-Framework.md
docs/SceneForge-v5-Animation-Film-Shot-Language-Study.md
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
docs/SceneForge-v6-Video-Intake-System.md
docs/SceneForge-v6-Video-Intake-Storage-and-Reading-Strategy.md
docs/SceneForge-v6-Source-Intake-Assetization-Strategy.md
docs/SceneForge-v6-Video-Intake-Implementation-Plan.md
docs/SceneForge-v6-Video-Intake-Protocol-Review.md
```

注意：`docs/` 与 `.handoff/` 仍不作为 Skill / Agent 阶段执行上下文。执行期规则应来自 `.agents/skills/**/references/`、`assets/` 和当前项目 `PROJECT_BOARD.md`。

## 主链路

当前普通文字输入主流程为：

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

视频源输入可选前置：

```text
scene-video-intake
-> scene-topic-gate
-> ...
```

总控 `scene-forge` 只执行 `PROJECT_BOARD.md` 中的 `next_stage`。用户说“继续”只能解释为执行当前 `next_stage`，不得一口气连跑多个阶段。

## 输出边界

SceneForge 当前只负责输出：

- 结构化方案
- 视频源解析资料与 source intake handoff
- 角色 / 场景 / 道具设定图 prompt
- 全场景资产总参考图 prompt
- 故事板图 prompt
- 视频分段提示词
- 声音制作说明 / 音乐 prompt / 拟音 prompt
- 发布文案、字幕文案、配音文案

SceneForge 不负责生成图片、视频或音频。图片、视频和音频需要用户基于 prompt 在外部平台手动生成。

禁止表述：

```text
我已经生成了角色图。
我已经生成了故事板图。
我已经生成了视频。
```

推荐表述：

```text
已生成用于制作角色设定图的提示词。
已生成用于制作故事板图的提示词。
已生成用于基于角色图、场景道具图、故事板图生成视频的分段提示词。
```

当前协议基线见 [docs/协议层与选题闸门设计.md](docs/协议层与选题闸门设计.md)。v4 实施计划见 [docs/SceneForge-v4-Implementation-Plan.md](docs/SceneForge-v4-Implementation-Plan.md)。v5 实施计划见 [docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md](docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md)。v6 实施计划见 [docs/SceneForge-v6-Video-Intake-Implementation-Plan.md](docs/SceneForge-v6-Video-Intake-Implementation-Plan.md)。
