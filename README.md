# SceneForge / 名场面工坊

SceneForge 是一套「经典影视 / 热点片段的 3D 动画电影化再创作生产系统」。

它不是单个视频项目，也不是单个提示词模板，而是一套可长期复用的内容生产框架：

- `.agents/skills/`：Agent 可调用的 SOP 能力包。
- `assets/`：长期复用资产库，保存角色、场景、核心道具。
- `projects/`：每一次具体片段创作的工作区。
- `outputs/`：跨项目共享的最终产物模板。
- `docs/`：给人阅读的项目规范说明。
- `.handoff/`：阶段性交接文档。

## 当前状态

本项目骨架、9 个 SceneForge Skill 标准骨架，以及主链路 SOP contract 已经完成第一轮收口。

当前已完成的重点包括：

- `PROJECT_BOARD.md` 顶层薄索引协议与阶段补丁壳
- 9 个 Skill 的标准 `SKILL.md + references/` 结构
- 主链路 `scene-topic-gate -> scene-reference-decider -> scene-asset-checker -> scene-design-builder -> scene-script-adapter -> scene-storyboard-director -> scene-video-prompt-builder -> scene-publish-review`
- `performance_style` 新维度，以及“中文展示 + 英文参数值”的统一表达规范

当前协议基线见 [docs/协议层与选题闸门设计.md](docs/协议层与选题闸门设计.md)。
