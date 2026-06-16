Status: pending

# Issue 24: 分镜故事板阶段产物规范化与落盘 (Storyboard Stage Deliverables Rectification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，依据分镜故事板的 Skill 协议合规要求，重构产生专业的镜头分镜、VGU 控制链和同源双版故事板 Prompt，替代之前简易的镜头自然语言罗列。

任务包括：
1. 生成包含景别、机位、镜头运动、光影、剪辑及视觉动机等字段的多维表格文件 `details/分镜清单_v1.md`。
2. 在 `details/storyboard/` 下产生 `beat_skeleton.md`、`video_generation_units.md`、`shot_continuity_plan.md` 和质量自检单 `storyboard_quality_check.md`。
3. 在 `outputs/storyboard_prompts/` 下产生 **控制版故事板（ControlBoard_v1.md）**、**风格版故事板（StyleBoard_v1.md）** 和 **整板总 Prompt（MasterPrompt_v1.md）**，用于在外部 Midjourney/Flux 等平台精确绘图。
4. 重写 `outputs/storyboard_pack_001.md` 以契合标准契约。

## 验收标准

- [ ] 生成 `details/分镜清单_v1.md`，至少包含 9 个关键镜头且字段完整。
- [ ] `details/storyboard/` 目录下的四个控制链文件与质量自检文档生成完毕。
- [ ] 产出同源双版故事板 Prompt 及整板 12 格绘图 Prompt。
- [ ] 通过 CLI 验证命令：`node ../../packages/engine/dist/cli.js validate --stage storyboard`。

## 被阻塞于

- [Issue 23: 表演导演阶段产物规范化与落盘](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/23-performance-stage-deliverables-rectification.md)
