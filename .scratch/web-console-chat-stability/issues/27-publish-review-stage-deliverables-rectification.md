Status: pending

# Issue 27: 发布评审阶段产物规范化与落盘 (Publish Review Stage Deliverables Rectification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，根据发布评审的 Skill 契约规范，生成可直接在外部社交平台或发布渠道使用的文案与字幕，并沉淀资产库建议。

任务包括：
1. 在 `outputs/publish_copy/` 文件夹下生成 `title_and_covers_v1.md`（包含多角度爆款标题和封面文案）。
2. 在 `outputs/publish_copy/` 文件夹下生成 `platform_posts_v1.md`（社交媒体发布转发词、评论区引流引导、字幕与配音方案）。
3. 规范化重写 `outputs/publish_review.md`，追加完整的自检 checklist 记录及资产沉淀回库清单（队长说明书、决赛球场场景卡、红球衣等核心资产的回库复用建议）。

## 验收标准

- [ ] 在 `outputs/publish_copy/` 下生成了符合传播规范的标题封面和平台文案文件。
- [ ] 重构 `outputs/publish_review.md`，追加了详细的数据复盘框架与明确的资产库沉淀建议。
- [ ] 通过 CLI 验证命令：`node ../../packages/engine/dist/cli.js validate --stage publish_review`。

## 被阻塞于

- [Issue 26: 视频提示词阶段产物规范化与落盘](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/26-video-prompts-stage-deliverables-rectification.md)
