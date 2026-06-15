Status: completed

# Issue 51: Output Contract 瘦身与职责降级

## 父问题

[implementation_plan_20260615_output_contract_slimming_and_zh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260615_output_contract_slimming_and_zh.md)

## 要构建什么

把三个核心 skill 的 `output-contract.md` 从长规则书改成短机器契约。保留字段、文件、board/manifest 和 validator 对齐信息，移除创作流程、长样例和资产库说明，降低执行期上下文漂移。

## 验收标准

- [x] 三个 `output-contract.md` 均不超过 120 行。
- [x] 每个 `output-contract.md` 开头明确说明它不是执行流程文档。
- [x] 长流程说明迁移或保留在 `workflow / required-deliverables / template / review-checklist` 中。
- [x] 不删除 validator 仍使用的技术 marker。

## 执行记录

- 已将 design / storyboard / video_prompts 三个 `output-contract.md` 降级为短机器契约。
- 已新增 `scene-design-builder/references/output-contract-migration-map.md`，把旧规则块映射到 workflow、required-deliverables、template、review-checklist 等承接文档。
- 已保留 validator、manifest、board、文件路径和技术 marker 所需字段。

## 被阻塞于

无 - 可以立即开始
