Status: completed

# Issue 46: Storyboard Design Reconciliation Review

## 父问题

[implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md)

## 要构建什么

在 storyboard 完整设计和生成后增加自动设计回看环节。该环节根据最终分镜内容判断是否需要回补或修订 design 阶段产物，例如补表情、动作姿态、关键道具交互、空间站位图、道具状态机或 master reference。它只产出 review 和修订建议，不得静默改写已确认设计。

## 验收标准

- [x] storyboard 强制交付包含 `details/storyboard/design_reconciliation_review_v*.md`。
- [x] review 文件必须包含是否需要设计修订的判断。
- [x] 若无需修订，必须包含 `no_design_change_reason`。
- [x] 若需要修订，必须包含 `recommended_design_updates`。
- [x] validator 能拦截 storyboard 缺少设计回看文件的情况。
- [x] 不修改任何真实项目产物。

## 实施记录

- 更新 storyboard required deliverables 与 review checklist。
- 增强 storyboard validator，要求 `design_reconciliation_review_v*.md` 真实存在并包含完整判断。
- 该环节只输出 review 和修订建议，不静默改写 design 产物。
- 验证通过：`pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- Issue 45
