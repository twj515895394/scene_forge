# Findings

本文件记录 SceneForge v9 架构设计阶段的关键技术发现与技术决策。

## 2026-06-08 (v9 设计期发现)

- **语言栈统一与 PTY 协同**：
  - 参考了开源 Obsidian 插件 [YishenTu/claudian](https://github.com/YishenTu/claudian) 的设计思路。
  - PTY 虚拟终端技术（如 `node-pty`）直接在 Node.js 环境下运行，而 `claude` / `codex` CLI 等 AI 工具也均原生集成在命令行终端中。
  - 因此，若将底层的 `scene-forge` 校验与状态引擎也统一为 TypeScript (Node.js) 实现，则 Web Console 后端可以直接在进程内加载引擎逻辑（无需跨语言 IPC 转换），大幅度简化整体运行环境。
- **pnpm Workspaces 优势**：
  - 相较于 npm workspaces，pnpm Workspaces 对多包 Monorepo 提供更严格的幽灵依赖保护，能天然阻断 `apps/web-console` 在未显式声明时对 `packages/engine` 依赖项的误引用，保持了引擎与 UI 的干净边界。
  - 采用了 `workspace:*` 依赖协议，能够自动保持对本地子包的软链接。
- **防跑偏校验三层防御模型**：
  - **Level 1 (Lint)**：文件结构、命名与 manifest 文件在磁盘上的匹配检查。
  - **Level 2 (Schema)**：依靠 Zod Schema 强行校验必需段落（如 `pack_audio_execution_plan`、`segment_sound_execution` 等）的结构和字段存在性。
  - **Level 3 (Semantic)**：通过正则表达式硬性提取和阻断违规词（如真实演员姓名、IP 等敏感版权词），替代原本脆弱的 AI 纯文本自查 review。
- **文件与状态双线一致性**：
  - Web Console GUI 前端是无状态的，它不持有持久化数据，而是通过 chokidar 监听本地工作区（`outputs/`、`details/` 和 `PROJECT_STATE.json`）。无论文件是由 CLI、Agent 还是人工在编辑器中修改，UI 界面都能在 500ms 内通过 WebSocket 刷新呈现最新视图，实现状态的双向完全对称。
- **历史文档归档**：
  - 随着多风格资产盘点等前序任务落盘，历史版本（v2 至 v8）的协议、计划以及 Pixar-like 迁移记录堆积在 `docs/` 目录中。为了避免新开发的 Agent 在工作时产生上下文漂移，已将所有历史说明和草稿文档全量归档至 [docs/archive/](file:///Users/tangwujun/Documents/trae_projects/scene_forge/docs/archive/) 中。
