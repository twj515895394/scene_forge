Status: completed

# Issue 29: Web Console 产物发现兜底与真实 API 回归

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

让 Web Console 的阶段产物列表不再只依赖 `artifacts.manifest.yaml` 与 `PROJECT_BOARD.md stage_index`。当阶段已经有真实磁盘产物，但 manifest 或 board 缺失注册时，`/api/artifacts?stage=<stage>` 应能从当前项目的 `outputs/`、`details/`、`handoffs/` 中发现可归属文件并合并返回。

这张票只处理读取与展示兜底，不修改 CLI 状态机，也不改任何项目产物文件。

## 验收标准

- [ ] `storyboard` 阶段在 manifest 只注册主交付、board 为 pending 空 files、磁盘存在 `outputs/storyboard/` 与 `details/storyboard/` 文件时，API 返回主交付和子产物。
- [ ] `publish` 与 `publish_review`、`topic` 与 `topic_gate` 的阶段别名能统一映射。
- [ ] 合并结果按 path 去重，manifest/board 已提供的条目不会被磁盘扫描重复添加。
- [ ] 磁盘扫描只读取当前项目目录内的 `outputs/`、`details/`、`handoffs/`，不会扫描其他 `projects/*`。
- [ ] 补充 node:test 回归测试。

## 被阻塞于

无 - 可以立即开始

## 实施记录

- 新增 `apps/web-console/server/artifactDiscovery.ts`，统一合并 manifest、PROJECT_BOARD stage_index 与当前项目磁盘产物。
- `/api/artifacts` 已改为调用 `getArtifactsForStage(activeProjectPath, stage)`。
- 新增 `artifact_discovery.test.ts`，并改造旧 `server_api.test.ts`，避免在沙箱内监听端口。
- Targeted 验证通过：`pnpm --filter @scene-forge/web-console exec tsc -p tsconfig.server.json`；`node --test apps/web-console/dist/server/tests/artifact_discovery.test.js apps/web-console/dist/server/tests/server_api.test.js apps/web-console/dist/server/tests/live_bubble_accumulator.test.js`。
