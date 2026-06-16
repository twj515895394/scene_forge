Status: pending

# Issue 23: 表演导演阶段产物规范化与落盘 (Performance Stage Deliverables Rectification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，依据表演导演的 Skill 协议合规要求，重构并生成标准的表演草稿与正式交付物，避免之前简单的聊天式总结。

任务包括：
1. 编写完整表演表 `details/performance_sheet_v1.md`，包含眼神、面部、手势等微表情，服务 5 Beat（通道→征途→观众→围圈→决战）角色心理。
2. 提取跨镜动作及情绪的延续，生成动作连续性链 `details/performance/action_continuity_chains_v1.md` 和情绪连续性链 `details/performance/emotion_continuity_chains_v1.md`。
3. 规范化重写 `outputs/performance_pack_001.md`，注入标准的 frontmatter 元数据和 Beat 表演描述。

## 验收标准

- [ ] 生成 `details/performance_sheet_v1.md` 且内容详实，分层明确。
- [ ] 生成 `details/performance/action_continuity_chains_v1.md` 和 `details/performance/emotion_continuity_chains_v1.md` 且逻辑合理。
- [ ] 重构 `outputs/performance_pack_001.md` 且通过 CLI 验证命令：`node ../../packages/engine/dist/cli.js validate --stage performance`。

## 被阻塞于

- [Issue 22: 阶段索引与产物清单关联注册](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/22-stage-index-and-artifact-manifest-registration.md)
