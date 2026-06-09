# SceneForge v9 架构演进实施计划

> **最后更新**: 2026-06-09 — 同步至实际实现状态  
> **标记**: ✅ 已完成 | ⏳ 部分完成/待验证 | ⬜ 未开始

本计划旨在将 SceneForge v9 设计文档中的”CLI Wrapper 终端聊天嵌入与机器硬校验”架构逐步落地。为了避免开发环境的多 runtime 冲突并提升调用效率，项目决定将底层 CLI Engine 和 Web Console 后台服务**全面统一为 TypeScript / Node.js 技术栈**。

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

### Phase 1：Artifact Manifest 产物隔离与 Taxonomy 读取策略 ✅
*   **交付件**：`packages/engine/src/artifact_registry.ts`、`artifacts.manifest.yaml` Schema
*   **状态**：引擎层已实现。Web Console 的 `/api/artifacts` 已基于 Manifest 过滤产物。

### Phase 2：阶段事务状态机与推进原子化 ✅
*   **交付件**：`packages/engine/src/state_machine.ts`、`PROJECT_STATE.json`
*   **状态**：引擎层已实现完整的 `ready → in_progress → validated → completed` 流转 + 依赖检查 + Handoff 生成。**但 Web Console 中 Claude 直接读写文件而非通过 CLI 调用，状态推进的正确性依赖 Claude 遵守上下文提示（无硬约束）**。

### Phase 3：开发硬性校验规则引擎 ✅
*   **交付件**：`packages/engine/src/validators/`
*   **状态**：引擎层已实现三层校验器。**但 Web Console 中校验器未接入 Claude 工作流——Claude 完成阶段后不会自动运行 Validator**。

### Phase 4：稳定化 CLI JSON API ✅
*   **交付件**：`packages/engine/src/cli.ts`
*   **状态**：CLI 命令已实现（`status/start/validate/complete --json`）。**但 Web Console 不再通过 CLI 调用来驱动流程**，改为 Claude 自然语言对话 + 直接文件操作。

### Phase 5：本地虚拟终端与聊天交互桥接 ✅ / ⏳
*   **交付件**：`TerminalBridge.ts`、`OutputParser.ts`
*   **状态**：PTY 桥接已实现但未使用。实际采用 `claude --print` + `spawn` 方式，每消息独立进程，通过 `--session-id`/`--resume` 保持上下文。OutputParser 仅做 ANSI 剥离和 `<thought>` 解析，未实现 Markdown 渲染拆分。

### Phase 6：Web Console 界面与文件监听 ✅ / ⏳
*   **交付件**：
    *   ✅ Vite React 前端（Lobby + 三栏 Workspace + shadcn/ui）
    *   ✅ `FileWatcher.ts`（chokidar WebSocket 推送）
    *   ✅ 聊天气泡流式渲染
    *   ✅ 会话历史面板
    *   ⏳ Diff 差异高亮未实现
    *   ⏳ Validator 行高亮定位未实现
    *   ⏳ Prompt 快捷拷贝未实现

---

## 3. 实际架构 vs 设计架构差异

### 3.1 Claude 桥接方式演变

| | 设计 | 实际 |
|:---|:---|:---|
| 进程模型 | PTY 持久进程（`node-pty` → Claude 交互模式） | `spawn` 每消息独立进程（`claude --print`） |
| 上下文 | PTY stdin/stdout 持续流 | `--session-id` UUID + `--resume` 磁盘会话 |
| 宏注入 | 自动注入 `/run scene-forge validate` | 自然语言快捷指令 |
| 工作目录 | 项目子目录 | 仓库根目录 `scene_forge/`（方便读 AGENTS.md 和 skills） |

### 3.2 流程驱动方式演变

| | 设计 | 实际 |
|:---|:---|:---|
| 阶段选择 | 手动点击 Timeline 节点 | 自动跟随 PROJECT_STATE.json |
| 操作触发 | 点击 START/VALIDATE/COMPLETE 按钮 | 对话驱动 Claude 自主推进 |
| 状态机调用 | CLI `scene-forge start --stage xxx` | Claude 直接读写 PROJECT_STATE.json |
| 校验 | Validator 硬校验 + 行高亮 | Claude 自觉 + 自然语言反馈 |

### 3.3 已知风险
1. **状态机无硬约束**：Claude 可能跳过阶段或错误推进状态，没有程序化闸门
2. **产物协议依赖自觉**：Manifest 更新、frontmatter 规范性全凭 Claude 遵守上下文
3. **Validator 未接入**：引擎层校验器已就绪但未与 Claude 工作流集成

---

## 4. 验收与集成测试方案

### 自动化校验
- 运行 CLI 单元测试：`npm run test --workspace=packages/engine`。
- 测试命令接口：执行 `scene-forge validate --stage storyboard --json`，校验报错 JSON 是否结构完整。

### 手动交互测试
- 启动 GUI 本地服务，点击左侧看板的“开始阶段”，在中间聊天框观察是否自动派生 PTY 进程并注入阶段 intake 简报。
- 往分镜文件里写入敏感词（如演员名字），点击右侧“Validator 校验”，校验左侧状态看板是否闪红灯，且右侧高亮呈现对应行数错误提示。
