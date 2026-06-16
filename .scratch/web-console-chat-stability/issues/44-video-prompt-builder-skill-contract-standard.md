Status: completed

# Issue 44: Video Prompt Builder Skill Contract Standard

## 父问题

[implementation_plan_20260614_video_prompt_skill_contract_standard.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_video_prompt_skill_contract_standard.md)

## 要构建什么

把 `scene-video-prompt-builder` 改造成与 storyboard 重构一致的标准 skill 结构，并补强 video_prompts 阶段的真实交付 validator。完成后，video_prompts 阶段不能只生成一个包含关键词的 Markdown 文件就通过；它必须真实落盘并注册按故事板 pack 对齐的中文 / 英文导演长版、review 文件、board 索引，并且正式 pack 文件必须包含四层强结构、声音执行块和可直接复制使用块。

交付要求必须以 `scene-video-prompt-builder` 既有 Skill 规则和 `references/output-contract.md` 为准；任何现有项目产物只作为漏检样本，不作为交付模板来源。

## 验收标准

- [x] `scene-video-prompt-builder/SKILL.md` 精简为标准入口，不再承载大段输出协议正文。
- [x] `references/required-deliverables.md` 明确列出必须真实落盘和注册的 video prompt 文件。
- [x] `references/review-checklist.md` 明确正式完成前的质量闸口。
- [x] `references/video-prompt-template.md` 明确 pack 文件必含四层强结构和可直接复制使用块。
- [x] validator 能拦截缺少中文 / 英文 pack 文件的情况。
- [x] validator 能拦截缺少 `details/video_prompts/video_prompt_review_v*.md` 或 board `quality_check` 的情况。
- [x] validator 能拦截 pack 文件缺少四层强结构、声音四层、`prompt_trace` 或 `video_prompt_review` 的情况。
- [x] validator 能拦截快速模式下 `video_prompt_plan_confirmed` 仍为 pending 却完成阶段的情况。
- [x] 合规测试样例可以通过，浅层/假声明样例必须失败。
- [x] 不修改任何真实项目产物。

## 实施记录

- 重构 `scene-video-prompt-builder/SKILL.md` 为标准入口。
- 新增 `workflow.md`、`required-deliverables.md`、`review-checklist.md`、`video-prompt-template.md`。
- 增强 validator，补充 video_prompts delivery contract 检查。
- 默认路径规则对齐 output-contract：`outputs/video_prompts/视频提示词_第XX包_中文/英文_v*.md`。
- 新增 video_prompts delivery contract 测试，覆盖缺中英 pack、缺 review/board、pack 缺四层结构、快速模式未确认和完整合规样例。
- 验证通过：`pnpm --filter @scene-forge/engine build`。
- 验证通过：`pnpm --filter @scene-forge/engine test`，40 个测试全绿。
- 验证通过：`pnpm --filter @scene-forge/web-console build`。
- 未修改任何真实项目产物。

## 被阻塞于

无 - 可以立即开始
