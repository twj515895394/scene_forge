Status: ready-for-human

# Issue 34: Storyboard 与 Video Prompts 深层 output-contract 校验设计

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

为 `storyboard` 与 `video_prompts` 两个阶段设计更深的 output-contract 校验方案，明确哪些结构缺失应作为 error，哪些只作为 warning。

当前 `projects/worldcup` 暴露出一个问题：CLI validator 能通过 frontmatter 和必需标题检查，但无法识别 storyboard 缺少双版故事板 prompt、MasterPrompt，或 video prompts 缺少四层有序结构等深层规范差距。这张票只做设计确认，不直接编码。

## 验收标准

- [ ] 输出一份设计文档，列出 storyboard 最小深层校验项。
- [ ] 输出一份设计文档，列出 video_prompts 最小深层校验项。
- [ ] 每条规则标明 error/warning 级别和误伤风险。
- [ ] 明确是否需要先调整 skill/output-contract，再调整 validator。

## 被阻塞于

- [Issue 31: Validator 增加产物索引一致性检查](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/31-validator-artifact-index-consistency.md)
