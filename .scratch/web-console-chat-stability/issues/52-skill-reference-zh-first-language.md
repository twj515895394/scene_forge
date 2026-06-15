Status: completed

# Issue 52: 三个核心 Skill Reference 中文主导

## 父问题

[implementation_plan_20260615_output_contract_slimming_and_zh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260615_output_contract_slimming_and_zh.md)

## 要构建什么

统一 `scene-design-builder`、`scene-storyboard-director`、`scene-video-prompt-builder` 的 reference 文档语言。标题、说明、规则、模板描述必须中文主导；英文只保留为技术字段、schema marker、外部模型固定术语或必要双语交付内容。

## 验收标准

- [x] 三个 skill 的 reference 文档标题中文化。
- [x] `SKILL.md` 中不再要求默认读取完整 `output-contract.md`。
- [x] 模板文件用中文说明正式产物体裁，避免 agent 误以为英语结构优先。
- [x] video prompt 模板明确中文正式包是主交付，英文包是翻译/适配版。

## 执行记录

- 已调整三个核心 skill 的 `SKILL.md` 默认读取顺序，把 `output-contract.md` 改为按需读取。
- 已中文化 workflow、required-deliverables、review-checklist、prompt template 等核心 reference 标题与章节名。
- 已在 video prompt 相关文档中明确中文 pack 为主交付，英文 pack 为翻译/模型适配版。

## 被阻塞于

- Issue 51
