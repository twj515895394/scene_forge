# SceneForge v9 架构演进实施计划

本计划旨在将 SceneForge v9 设计文档中的“CLI Wrapper 终端聊天嵌入与机器硬校验”架构逐步落地。为了避免开发环境的多 runtime 冲突并提升调用效率，项目决定将底层 CLI Engine 和 Web Console 后台服务**全面统一为 TypeScript / Node.js 技术栈**。

---

## 1. 架构原则与选型锁定

1. **统一语言**：CLI Engine (`scene_forge_engine`) 与 Web UI backend (`apps/web-console`) 全量采用 **TypeScript (Node.js)**。
2. **核心依赖库**：
   * **CLI Command 框架**：使用 `commander` 或 `yargs` 代替 Python click。
   * **Schema 校验器**：使用 `zod` 代替 Python pydantic，由 Zod Schema 自动导出 TypeScript 静态类型。
   * **文件监听器**：使用 `chokidar` 替代 Python watchdogs。
   * **PTY 终端派生**：使用 Node 生态的 `node-pty` 挂载交互式终端。
3. **调用机制**：因为同属 Node 进程，本地 GUI 服务端可直接以库（library）形式加载 `packages/engine` 的逻辑（如读取状态、运行校验），而对于用户通过 CLI 终端操作的常规交互，则通过 `node-pty` 对 `scene-forge` 可执行文件进行包装。

---

## 2. 6大分阶段开发任务与交付明细

### Phase 1：Artifact Manifest 产物隔离与 Taxonomy 读取策略
*   **目标**：实施 Artifact 物理分层物理隔离，防止草稿和预览泄露给下游。
*   **交付件**：
    *   `packages/engine/src/artifact_registry.ts`
    *   `projects/<project_slug>/artifacts.manifest.yaml` （Schema 与解析类）
*   **规则限制**：限制 downstream read，下游阶段只能请求 `kind: final` 且 `readable_by_downstream: true` 的产物。

### Phase 2：阶段事务状态机与推进原子化 (Transactional Complete)
*   **目标**：重构状态机以支持完整的 Transactional Complete/Start（原子提交/回滚）。
*   **交付件**：
    *   `packages/engine/src/state_machine.ts`
    *   `projects/<project_slug>/PROJECT_STATE.json`
*   **业务逻辑**：在 complete 时运行校验，校验通过自动推进状态并生成 handoff 简报；失败则退回并写入 `validation_result.json`，拦截状态变更。

### Phase 3：开发硬性校验规则引擎 (Schema & Semantic Validator)
*   **目标**：将自然语言规范转化为硬性规则及校验脚本，杜绝跑偏。
*   **交付件**：
    *   `.rules/stages/*.yaml`（阶段规则配置库）
    *   `packages/engine/src/validators/`（三层校验器：Level 1 Lint, Level 2 Schema/Zod, Level 3 Semantic 敏感词正则与连续性校验）
    *   `.schemas/*.json` （锁死分镜包、视频提示词包的字段规范）

### Phase 4：稳定化 CLI JSON API (CLI Interface Freeze)
*   **目标**：规范化 CLI 命令行工具，提供标准的 JSON 交互接口。
*   **交付件**：
    *   `packages/engine/src/cli.ts` (打包为 `scene-forge` 可执行程序)
    *   支持 `status`, `start`, `validate`, `complete`, `artifacts`, `rules` 命令输出 `--json` 格式。
    *   注册统一错误码（Error Code Registry）。

### Phase 5：本地虚拟终端与聊天交互桥接 (PTY Terminal Bridge)
*   **目标**：在 GUI 后台派生本地 CLI 的 PTY 进程，并代理输入输出。
*   **交付件**：
    *   `apps/web-console/server/TerminalBridge.ts`
    *   `apps/web-console/server/OutputParser.ts` (ANSI 码过滤与 markdown 聊天气泡合并解析器)
    *   指令自动注入与宏路由器（自动注入 `/run scene-forge validate` 和 Handoff Prompt）。

### Phase 6：构建 Web Console 界面与文件监听机制 (GUI & Watcher)
*   **目标**：构建三栏式 Web 前端与文件热更新，实现双线完全一致。
*   **交付件**：
    *   Vite React 前端界面（Pipeline 状态、流式 Chat Bubble、Artifact 预览及 Diff 差异高亮）。
    *   `apps/web-console/server/FileWatcher.ts` (基于 chokidar 的 WebSocket 实时推送)。

---

## 3. 验收与集成测试方案

### 自动化校验
- 运行 CLI 单元测试：`npm run test --workspace=packages/engine`。
- 测试命令接口：执行 `scene-forge validate --stage storyboard --json`，校验报错 JSON 是否结构完整。

### 手动交互测试
- 启动 GUI 本地服务，点击左侧看板的“开始阶段”，在中间聊天框观察是否自动派生 PTY 进程并注入阶段 intake 简报。
- 往分镜文件里写入敏感词（如演员名字），点击右侧“Validator 校验”，校验左侧状态看板是否闪红灯，且右侧高亮呈现对应行数错误提示。
