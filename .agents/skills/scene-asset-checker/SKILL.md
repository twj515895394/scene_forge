---
name: scene-asset-checker
description: 当用户要为 SceneForge 项目判断角色、场景、核心道具是否可复用，并决定复用、微调、轻量新建或完整新建时应使用此技能。
---

# scene-asset-checker

负责在故事骨架明确后，判断角色、场景、核心道具的资产复用策略。输出应为结构化 YAML 阶段补丁，并为后续设计阶段提供资产命中结论。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-asset-checker`
- 已完成故事骨架开发，需要确认角色、场景和关键道具是否已有可复用资产
- 需要决定后续进入“复用 / 微调 / 轻量新建 / 完整新建”的哪条路径

如果故事骨架还没有定，或已经开始做角色/场景设定，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `story_developed`，且总控路由的 `state.next_stage` 为 `scene-asset-checker`。
2. 读取 `scene-reference-decider` 的边界结果和 `scene-story-development` 的故事骨架，确认哪些角色、场景和道具在剧情上是必要的、哪些允许继承。
3. 读取 `references/output-contract.md`，确认资产判断分类、输出结构和阶段推进口径。
4. 先做角色资产判断，再做场景资产判断；两者都是强制前置。
5. 仅当道具满足角色识别、剧情动作或系列复用任一条件时，再做核心道具判断。
6. 为每类资产产出命中结论，并说明是完全复用、微调复用、轻量新建还是完整新建。
7. 将资产锁定结论写入 `details/assets/asset_lock_v*.md`，明确哪些角色、场景和核心道具已锁定、哪些必须微调或新建。
8. 输出单个 YAML 补丁块，附带已命中的资产引用、中文 `summary` 和后续设计建议；关键分类值可在摘要中附英文参数值。
9. 将黑板状态推进建议交回总控 Skill，进入 `scene-design-builder`。

## 关键规则

- 只执行当前 `state.next_stage`，不得跳过故事骨架阶段或直接进入设计阶段。
- 角色资产复用判断：强制前置。
- 场景资产复用判断：强制前置。
- 道具资产判断：轻量备选，不默认进入重型判断。
- 资产判断必须同时服从参考边界和故事功能，不能因为“库里有现成资产”就越界复用或误用。
- 未命中资产不是阻塞；只要能明确进入 `new_light` 或 `new_full` 路径，就应继续推进。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：资产判断分类、输出结构和阶段推进建议
