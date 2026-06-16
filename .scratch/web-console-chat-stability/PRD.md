# PRD: Web Console 聊天稳定性与审批交互修复

此需求旨在修复 SceneForge Web Console 在 `test-project-001` 等项目中的聊天稳定性问题，重点收口三类核心故障：消息重复渲染、历史思考空白行、审批卡片不可见或不可交互。

## 核心目标

1. **消除重复渲染**：统一历史加载、会话切换与实时流式更新的气泡归并策略，避免同一轮 assistant 内容重复显示。
2. **修复思考展示**：让实时思考与历史思考使用一致的数据模型，消除历史空白行并稳定展示有效 thought 内容。
3. **恢复审批闭环**：确保审批请求可以显示、点击选择、回传决策，并在处理完成后正确关闭或更新状态。
4. **沉淀回归验收**：固定 `test-project-001` 的复现剧本与自动化回归，避免同类问题反复回归。

## 阶段规划

* **Phase 1**：收口聊天气泡唯一键与历史/实时合并时序。
* **Phase 2**：清洗 thought 历史空白与重复 chunk，统一实时/历史思考模型。
* **Phase 3**：修复审批请求展示链路与交互回传闭环，参考 `claudian` 的 request/resolve 模式。
* **Phase 4**：补齐 `test-project-001` 场景回归测试与验收脚本。

## 任务状态追踪

### 聊天稳定性主线

- [ ] [01-bubble-dedup-and-merge-order.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/01-bubble-dedup-and-merge-order.md)
- [x] [02-history-thought-normalization.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/02-history-thought-normalization.md)
- [ ] [03-unified-thought-stream-model.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/03-unified-thought-stream-model.md)
- [ ] [04-approval-request-visibility.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/04-approval-request-visibility.md)
- [ ] [05-approval-interaction-lifecycle.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/05-approval-interaction-lifecycle.md)
- [ ] [06-e2e-regression-and-acceptance.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/06-e2e-regression-and-acceptance.md)
- [ ] [16-chat-history-dedup-and-render-sanitization.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/16-chat-history-dedup-and-render-sanitization.md)
- [ ] [17-live-chat-stream-and-prompt-card-stability.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/17-live-chat-stream-and-prompt-card-stability.md)

### 流程一致性主线

- [ ] [18-engine-sop-stage-model-alignment.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/18-engine-sop-stage-model-alignment.md)

### 视觉系统主线

- [ ] [07-ui-visual-system-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/07-ui-visual-system-refresh.md)
- [ ] [12-visual-tokens-and-typography.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/12-visual-tokens-and-typography.md)
- [ ] [13-pipeline-flow-and-artifact-list-visual-refresh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/13-pipeline-flow-and-artifact-list-visual-refresh.md)
- [ ] [14-chat-surface-visual-unification.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/14-chat-surface-visual-unification.md)
- [ ] [15-visual-regression-and-acceptance.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/15-visual-regression-and-acceptance.md)

### 阶段产物可访问性主线

- [ ] [08-stage-artifact-access-design.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)
- [ ] [09-artifact-index-and-stage-mapping.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/09-artifact-index-and-stage-mapping.md)
- [ ] [10-sidebar-stage-artifact-browser.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/10-sidebar-stage-artifact-browser.md)
- [ ] [11-all-artifacts-panel-and-preview-state.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/11-all-artifacts-panel-and-preview-state.md)

## 当前执行排序（2026-06-12）

1. 视觉系统主线：`12 -> 13 -> 14 -> 15`
2. 阶段产物可访问性主线：`09 -> 10 -> 11`
3. 聊天稳定性主线收尾：审计后仅保留真实未闭环项继续执行

## 新增执行排序（2026-06-13）

1. 聊天显示收口：`16 -> 17`
2. 流程一致性裁决与实现：`18`
3. 旧稳定性票复审：`01 / 03 / 06` 只保留仍真实未闭环项

## Issue 审计摘要（2026-06-12）

- `07`：设计已完成，作为视觉主线父票保留
- `08`：设计已完成，作为阶段产物可访问性父票保留
- `02`：已完成
- `01 / 03 / 06`：部分完成，仍需后续跟进
- `04 / 05`：因“所有项目默认自动授权”策略已切换，暂时延后
