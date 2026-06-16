Status: completed

# Issue 45: Design Builder Skill Contract Standard

## 父问题

[implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_design_builder_and_storyboard_reconciliation.md)

## 要构建什么

把 `scene-design-builder` 改造成标准 skill 结构，并补强 design 阶段真实交付 validator。完成后，design 阶段不能输出英文主导、弱 prompt 或单张海报式角色图就通过；必须真实落盘并注册角色说明书、场景/道具设定、空间连续性种子、角色说明书板 prompt 和全场景资产总参考图 prompt。

交付要求必须以 `scene-design-builder` 既有 Skill 规则和 `references/output-contract.md` 为准。

## 验收标准

- [x] `scene-design-builder/SKILL.md` 精简为标准入口。
- [x] 新增 `workflow.md`、`required-deliverables.md`、`review-checklist.md`、`design-prompt-template.md`。
- [x] validator 能拦截缺少角色说明书、场景、道具、空间连续性种子和设计 prompt 的情况。
- [x] validator 能拦截角色说明书图片 prompt 英文主导或退化成单张海报式图的情况。
- [x] validator 能拦截 board 索引缺失和快速模式 `design_confirmed` pending 的情况。
- [x] 合规测试样例可以通过，浅层/英文/假声明样例必须失败。
- [x] 不修改任何真实项目产物。

## 实施记录

- 重构 `scene-design-builder/SKILL.md` 为标准入口。
- 新增 `workflow.md`、`required-deliverables.md`、`review-checklist.md`、`design-prompt-template.md`。
- 增强 artifact sync，让 design 阶段发现 `outputs/design_prompts/*`。
- 增强 validator，补充 design delivery contract 检查。
- 新增 design delivery contract 测试，覆盖缺文件、英文/海报式 prompt、快速模式未确认和完整合规样例。
- 验证通过：`pnpm --filter @scene-forge/engine build`。
- 验证通过：`pnpm --filter @scene-forge/engine test`，45 个测试全绿。
- 验证通过：`pnpm --filter @scene-forge/web-console build`。
- 未修改任何真实项目产物。

## 被阻塞于

无 - 可以立即开始
