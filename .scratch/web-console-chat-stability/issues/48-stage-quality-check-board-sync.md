Status: completed

# Issue 48: Stage Quality Check Board Sync

## 父问题

[implementation_plan_20260614_storyboard_skill_contract_standard.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_storyboard_skill_contract_standard.md)

## 要构建什么

让 artifact sync 在能明确识别质量检查文件时自动同步 `PROJECT_BOARD.md stage_index.*.files.quality_check`，避免 storyboard / video_prompts 文件已经真实落盘和注册，但黑板缺少 quality_check 而导致阶段完成后校验失败。

## 验收标准

- [x] storyboard 阶段自动写入 `details/storyboard/storyboard_quality_check_v*.md`。
- [x] video_prompts 阶段自动写入 `details/video_prompts/video_prompt_review_v*.md`。
- [x] 已存在的显式 quality_check 不被无关文件覆盖。
- [x] artifact sync 测试覆盖 quality_check 自动同步。

## 实施记录

- 为 artifact sync 增加阶段 quality_check 路径推导。
- 只在能明确匹配阶段质量检查文件时写入 `files.quality_check`。
- 验证通过：`pnpm --filter @scene-forge/engine build && pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- Issue 47
