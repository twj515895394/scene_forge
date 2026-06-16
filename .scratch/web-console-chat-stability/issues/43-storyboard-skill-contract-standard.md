Status: completed

# Issue 43: Storyboard Skill Contract Standard

## 父问题

[implementation_plan_20260614_storyboard_skill_contract_standard.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_storyboard_skill_contract_standard.md)

## 要构建什么

把 `scene-storyboard-director` 改造成可复用的标准 skill 结构，并补强 storyboard 阶段的真实交付 validator。完成后，storyboard 阶段不能再只生成一个包含关键词的主 Markdown 文件就通过；它必须真实落盘并注册分镜细节文件、质量检查文件和可直接复制给 `gpt-image2` 的双版整板 prompt 文件。

这个 issue 也是后续重构其他 SceneForge skill 的样板：`SKILL.md` 负责短流程和路由，长 contract、交付清单、review checklist、模板都拆入 `references/`。

交付要求必须以 `scene-storyboard-director` 既有 Skill 规则和 `references/output-contract.md` 为准；`worldcup003` 只作为漏检样本，不作为交付模板来源。

## 验收标准

- [x] `scene-storyboard-director/SKILL.md` 精简为标准入口，不再承载大段输出协议正文。
- [x] `references/required-deliverables.md` 明确列出必须真实落盘和注册的 storyboard 文件。
- [x] `references/review-checklist.md` 明确正式完成前的质量闸口。
- [x] `references/storyboard-prompt-template.md` 明确整板 prompt 必含的三段结构。
- [x] validator 能拦截“主文件声明 prompt 路径但文件不存在”的情况。
- [x] validator 能拦截缺少 `details/storyboard/*`、缺少 `outputs/storyboard_prompts/*`、缺少 board 索引的情况。
- [x] validator 能拦截快速模式下 `storyboard_plan_confirmed` 仍为 pending 却完成阶段的情况。
- [x] 合规测试样例可以通过，浅层/假声明样例必须失败。
- [x] 不修改 `projects/worldcup003` 任何产物。

## 实施记录

- 重构 `scene-storyboard-director/SKILL.md` 为标准入口。
- 新增 `workflow.md`、`required-deliverables.md`、`review-checklist.md`、`storyboard-prompt-template.md`。
- 增强 artifact sync，让 storyboard 阶段发现 `outputs/storyboard_prompts/*`。
- 增强 validator，区分 primary final artifact 与 final output artifact。
- 新增 storyboard delivery contract 测试，覆盖缺真实文件、缺 prompt 三段结构、快速模式未确认和完整合规样例。
- 验证通过：`pnpm --filter @scene-forge/engine build`。
- 验证通过：`pnpm --filter @scene-forge/engine test`，36 个测试全绿。
- 验证通过：`pnpm --filter @scene-forge/web-console build`。
- 只读验证：`projects/worldcup003` storyboard 被新规则正确拦截；未修改该项目产物。

## 被阻塞于

无 - 可以立即开始
