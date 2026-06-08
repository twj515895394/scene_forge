# SceneForge v9 架构演进任务计划

本计划追踪 SceneForge v9 版本的开发任务，由本地问题追踪器工票（`.scratch/sceneforge-v9/issues/`）驱动。

## 当前目标

- 完成底层 TypeScript 核心引擎（Workspaces 中的 `packages/engine`）开发，包括产物隔离、事务状态机及三层 Validator。
- 开发本地 PTY 虚拟终端服务与 Markdown 流式 Chat Bubble 解析。
- 开发基于 Vite React 的三栏可视化控制台（Web Console）与 chokidar 文件热重载。

## 开发阶段与工票状态

- [ ] **Phase 1：Artifact Manifest 产物隔离与 Taxonomy 读取**
  - 工票：[01-artifact-manifest.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/01-artifact-manifest.md)
  - 状态：`Status: ready-for-agent`

- [ ] **Phase 2：阶段事务状态机与推进原子化**
  - 工票：[02-transactional-state-machine.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/02-transactional-state-machine.md)
  - 状态：`Status: ready-for-agent`

- [ ] **Phase 3：开发硬性校验规则引擎**
  - 工票：[03-schema-validator.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/03-schema-validator.md)
  - 状态：`Status: ready-for-agent`

- [ ] **Phase 4：稳定化 CLI JSON API**
  - 工票：[04-cli-json-api.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/04-cli-json-api.md)
  - 状态：`Status: ready-for-agent`

- [ ] **Phase 5：本地虚拟终端与聊天交互桥接**
  - 工票：[05-claudian-pty-bridge.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/05-claudian-pty-bridge.md)
  - 状态：`Status: ready-for-agent`

- [ ] **Phase 6：构建 Web Console 界面与文件监听**
  - 工票：[06-web-console-ui.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/06-web-console-ui.md)
  - 状态：`Status: ready-for-agent`
