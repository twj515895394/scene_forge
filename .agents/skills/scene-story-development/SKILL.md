---
name: scene-story-development
description: 当用户要在参考边界确定后，为 SceneForge 项目先开发轻量故事骨架，再进入资产、设计和正式剧本阶段时应使用此技能。
---

# scene-story-development

负责在参考边界确定后，产出轻量故事骨架。输出应为结构化 YAML 阶段补丁，并为后续资产判断、设计和正式剧本阶段提供统一叙事骨架。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

## 何时使用

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-story-development`
- 已完成 `scene-reference-decider`
- 需要先确定故事骨架，再进入资产复用、视觉设计和正式剧本

如果参考边界未定，或已经进入资产/设计/剧本阶段，不应优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `reference_decided`，且总控路由的 `state.next_stage` 为 `scene-story-development`。
2. 读取 `scene-reference-decider` 的边界结果、`must_keep`、`must_avoid`、`creative_direction_context` 和相关创作方向摘要。
3. 读取 `references/output-contract.md`，确认故事骨架结构、输出边界和阶段推进口径。
4. 先输出轻量故事预览：一句话故事、4-8 个 beats、角色功能、高潮/结尾 payoff、目标时长。
5. 用户确认后，再输出正式阶段补丁。
6. 将黑板状态推进建议交回总控 Skill，进入 `scene-asset-checker`。

## 关键规则

- 只执行当前 `state.next_stage`，不得跳过参考边界阶段或直接进入设计/剧本阶段。
- 本阶段只做轻量故事骨架，不写完整剧本文字。
- Story Beat 数量控制在 4-8 个。
- 角色、场景、道具只定义剧情功能，不定义视觉外观。
- 输出必须服从 `creative_direction_context`，不得重新发散改写方向。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：故事骨架结构、输出字段和阶段推进建议
