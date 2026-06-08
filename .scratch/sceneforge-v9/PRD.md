# PRD: SceneForge v9 架构演化

此需求旨在将 SceneForge 从当前的“文档规则软约束阶段”重构成“具备机器硬校验（Linter/Validator）与可视化聊天桥接（CLI Wrapper）”的工程化自媒体/视频创作控制系统。

## 核心目标

1. **解决规则漏水**：将自然语言规范沉淀为硬性的 Schema 和 Validator（三层防御：Lint、Schema、Semantic）。
2. **解决上下文漂移**：实施 Artifact 物理分层隔离（Taxonomy），下游 Agent 默认仅能读取上游 Final 主交付件。
3. **完成界面化升级**：参考 Claudian 插件，利用 PTY 桥接本地 CLI 进程，实现“用户界面聊天 - Agent 执行生成 - 文件系统监听 - GUI 产物实时 Diff 与审核”的双线一致协同。

## 阶段规划

*   **Phase 1**：实现 Artifact Manifest 产物隔离与 Taxonomy 读取策略。
*   **Phase 2**：重构无状态 Engine 状态机，实现 Transactional Complete/Start（原子提交/回滚）。
*   **Phase 3**：构建三层校验器（JSON Schema、禁用词正则、连续性校验）。
*   **Phase 4**：稳定化 CLI JSON API（支持 `--json` 输出与统一错误码）。
*   **Phase 5**：开发本地 Node 虚拟终端代理（node-pty PTY Bridge & ANSI 解析器）。
*   **Phase 6**：开发本地 Web Console 前端（Pipeline 看板、聊天框、产物 Diff 与单点击 Approve 闸门）。

## 任务状态追踪

- [ ] [01-artifact-manifest.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/01-artifact-manifest.md)
- [ ] [02-transactional-state-machine.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/02-transactional-state-machine.md)
- [ ] [03-schema-validator.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/03-schema-validator.md)
- [ ] [04-cli-json-api.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/04-cli-json-api.md)
- [ ] [05-claudian-pty-bridge.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/05-claudian-pty-bridge.md)
- [ ] [06-web-console-ui.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/06-web-console-ui.md)
