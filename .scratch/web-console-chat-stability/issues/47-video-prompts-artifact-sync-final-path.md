Status: completed

# Issue 47: Video Prompts Artifact Sync Final Path

## 父问题

[implementation_plan_20260614_video_prompt_skill_contract_standard.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_video_prompt_skill_contract_standard.md)

## 要构建什么

让 artifact sync 正确识别 video_prompts 新规范的中文 / 英文 pack 文件为阶段正式产物，保证 CLI complete 后 manifest、board primary 和下游读取都能追踪到新路径，同时保留旧式路径兼容。

## 验收标准

- [x] `outputs/video_prompts/视频提示词_第XX包_中文_v*.md` 能被识别为 video_prompts final。
- [x] `outputs/video_prompts/视频提示词_第XX包_英文_v*.md` 能被注册为 video_prompts output，不被错误排除。
- [x] 旧式 `outputs/video_prompts_pack_*.md` 兼容不回退。
- [x] artifact sync 测试覆盖新路径的 manifest / board 追踪。

## 实施记录

- 更新 artifact sync 的 video_prompts final path pattern，兼容新旧路径。
- 修复中文路径 artifact id 碰撞，避免中文 / 英文 pack 互相覆盖。
- 验证通过：`pnpm --filter @scene-forge/engine build && pnpm --filter @scene-forge/engine test`。

## 被阻塞于

无 - 可以立即开始
