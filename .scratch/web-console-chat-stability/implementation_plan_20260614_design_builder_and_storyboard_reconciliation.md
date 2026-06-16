# Design Builder Contract Standard And Storyboard Reconciliation Plan

## Source of Truth

本方案的设计阶段落盘产物与内容要求只来自：

- `.agents/skills/scene-design-builder/SKILL.md` 的既有阶段规则
- `.agents/skills/scene-design-builder/references/output-contract.md` 的既有输出协议
- `.agents/skills/scene-storyboard-director` 的既有 storyboard 完成前 review 机制

任何现有项目产物仅可作为漏检样本，不作为新交付模板来源。

## 目标

1. 将 `scene-design-builder` 改造成标准 skill 结构。
2. 增强 design 阶段 validator，拦截英文主导、弱 prompt、缺角色说明书板结构、缺真实落盘和 board 索引。
3. 在 storyboard 完整生成后增加自动 `design_reconciliation_review` 环节：根据最终分镜判断是否需要回补或修订设计阶段产物。
4. 不修改任何真实项目产物。

## Design 强制交付

- `outputs/design.md`
- `details/design/character_design_*_v*.md` 或 `details/角色说明书_*_v*.md`
- `details/design/scene_design_v*.md`
- `details/design/prop_design_v*.md`
- `details/design/space_continuity_seed_v*.md`
- `outputs/design_prompts/角色说明书图片提示词_v*.md`
- `outputs/design_prompts/全场景资产总参考图提示词_v*.md`

可选但推荐：

- `outputs/design_prompts/空间站位图提示词_v*.md`

## Design Validator

- 检查 prompt 是否中文主导。
- 检查角色说明书板结构：多视角、轮廓剪影、表情系统、微表情、动作姿态、关键道具交互、细节区、比例对照、边界约束。
- 检查不能退化成单张海报式输出。
- 检查 manifest 与 board stage_index 是否同步。
- 快速模式下 `design_confirmed` pending 时不得完成。

## Storyboard 后置设计回看

Storyboard 阶段完成前必须生成：

- `details/storyboard/design_reconciliation_review_v*.md`

该文件必须判断：

- 最终分镜是否新增了设计阶段没有覆盖的表情、动作姿态、道具状态、空间站位或角色识别锚点。
- 是否需要更新角色说明书、设计 prompt、空间站位图、道具状态机或 master reference。
- 若无需更新，必须说明 no_design_change_reason。
- 若需要更新，必须列出 recommended_design_updates，但不得静默直接改设计阶段产物。

## 验证

- `pnpm --filter @scene-forge/engine build`
- `pnpm --filter @scene-forge/engine test`
- `pnpm --filter @scene-forge/web-console build`
