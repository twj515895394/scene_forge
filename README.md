# SceneForge / 名场面工坊

SceneForge 是一套「经典影视 / 热点片段的 3D 动画电影化再创作提示词生产系统」。

它不是单个视频项目，也不是单个提示词模板，而是一套可长期复用的内容生产框架：

- `.agents/skills/`：Agent 可调用的 SOP 能力包。
- `assets/`：长期复用资产库，保存角色、场景、核心道具的可复用设定与引用。
- `projects/`：每一次具体片段创作的工作区。
- `outputs/`：跨项目共享的最终提示词模板、制作说明和发布素材文案。
- `docs/`：给人阅读的项目规范说明。
- `.handoff/`：阶段性交接文档。

## 当前状态

SceneForge v3 已将主链路从“自动生成并推进”调整为“方案预览 → 用户确认 → 正式落盘”。

当前重点包括：

- `PROJECT_BOARD.md` 顶层薄索引协议与通用项目记忆字段。
- `context_policy` 与 `token_budget`：执行阶段默认最小上下文读取，不扫描 `docs/`、`.handoff/` 和历史项目输出。
- `user_confirmations`：剧本、设计、分镜、视频提示词等关键阶段必须先确认再落盘。
- `segment_strategy`：区分整片目标时长与单段视频生成时长。
- `hero_moments`、`bridge_shots`、`prop_state_machines`、`blocking_map`、`faction_layout`：用于提升多段视频提示词的看点表达、段落衔接、道具状态和角色空间连续性。
- 后半段产物链路为“设定图 prompt → 故事板图 prompt → 按 10s/15s/混合分段的视频 prompt”。

## 主链路

当前主流程为：

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

总控 `scene-forge` 只执行 `PROJECT_BOARD.md` 中的 `next_stage`。用户说“继续”只能解释为执行当前 `next_stage`，不得一口气连跑多个阶段。

## 输出边界

SceneForge 当前只负责输出：

- 结构化方案
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

当前协议基线见 [docs/协议层与选题闸门设计.md](docs/协议层与选题闸门设计.md)。
