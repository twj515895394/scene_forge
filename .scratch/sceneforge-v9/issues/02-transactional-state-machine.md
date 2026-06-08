Status: ready-for-agent

# Issue 02: 阶段事务状态机与推进原子化 (Transactional Complete)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

构建基于 TypeScript 的阶段状态机，支持事务级的阶段启动与完成。状态信息集中存储在项目的 `PROJECT_STATE.json` 中。

主要功能包括：
1. **状态生命周期追踪**：追踪每个阶段的状态，即 `ready` -> `in_progress` -> `waiting_user_review` -> `validated` / `review_failed` -> `completed`。
2. **阶段启动前置检查 (Start Stage)**：检查上游 required 阶段是否 completed，准备 context pack 并锁定 write scope 目录。
3. **完成阶段事务 (Complete Stage)**：当触发完成时，核心状态机必须原子化地运行 validator。
   - 校验通过：写入状态 `validated`，自动合并生成 Handoff 简报（极度压缩的 KV 键值），将状态标记为 `completed`，并解锁下游阶段状态为 `ready`。
   - 校验失败：拦截状态推进，保存详细的 `validation_result.json`，并将状态打回 `review_failed`，强行要求 Agent 修复。

## 验收标准

- [ ] 在 Validator 失败时，执行 complete 命令会抛出异常，阻止状态机推进到 `completed`。
- [ ] 只有成功的 validation 会生成对应的 `handoff.json` 并解锁下一阶段。
- [ ] 状态机可读取 `PROJECT_STATE.json` 并验证所有阶段流转的历史记录。

## 被阻塞于

- [Issue 01: Artifact Manifest 产物隔离与 Taxonomy 读取策略](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/01-artifact-manifest.md)
