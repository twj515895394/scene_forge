Status: closed

# Issue 07: 黑板与状态机一致性对齐与文档整理 (Board & State Machine Alignment)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建与整理什么

本项目核心重构中，`PROJECT_BOARD.md`（Agent 侧轻黑板）与 `PROJECT_STATE.json`（程序侧状态机）的双轨设计是核心。本任务旨在：
1. **理清双轨设计定位与读写权限**。
2. **修复当前文档与模板的 Schema 冲突**（`docs/项目创建规范.md` 仍在使用老旧的扁平字段，需同步为 V8/V9 Structured Light Board 规范）。
3. **规范 CLI 驱动与双轨同步流程**，确保 Agent 在执行过程中，通过 CLI 操作状态机，通过文件读写修改黑板，防止越权或状态失稳。

### 核心规范定义

#### 1. PROJECT_BOARD.md (Agent 侧轻黑板)
- **定位**：面向大语言模型（LLM Agent）的可读轻量记忆体与索引文件。
- **格式**：Markdown 格式包裹的 YAML 块。
- **读写权限**：由 Agent 拥有主写权限，在各阶段完成后由 Agent 合并该阶段 of `stage_patches`。
- **约束**：遵循“轻黑板”纪律，行数控制在 300 行以内，长正文（如剧本、分镜表等）一律外部落盘于 `details/` 和 `outputs/`，黑板只保留文件路径、状态和极简摘要。

#### 2. PROJECT_STATE.json (程序侧状态机)
- **定位**：面向 Node.js 后端、React 前端及 CLI 引擎的结构化状态缓存。
- **格式**：纯 JSON 格式。
- **读写权限**：由 CLI 引擎（`node packages/engine/dist/cli.js`）独占写权限。Agent 与 GUI 禁止直接读写修改该文件，必须通过 CLI 命令触发状态转移。
- **约束**：强制接受 Zod Schema 校验与上游依赖级联检查。

### 整理与同步流程
1. **项目创建/激活**：
   - 后端 `/api/projects` 接口通过 `STYLE_MAP` 转换 UI 选择的风格 ID，并将模版黑板和项目索引分别落盘为 `PROJECT_BOARD.md` 和 `PROJECT_INDEX.md`。
2. **状态推进环路 (CLI Loop)**：
   - 阶段启动：Agent 或 UI 调用 `node packages/engine/dist/cli.js start --stage <stage>`，更新 `PROJECT_STATE.json` 状态为 `in_progress`。
   - 阶段完成：Agent 完成预览与确认落盘，并修改 `PROJECT_BOARD.md` 的 `stage_patches` 后，调用 `node packages/engine/dist/cli.js complete --stage <stage>`。
   - CLI 自动加载硬性校验器，校验通过后自动更新 `PROJECT_STATE.json` 为 `completed`，并解锁下游阶段。
3. **数据监听与热重载**：
   - 后端 `FileWatcher` 监听 `PROJECT_STATE.json` 与 `PROJECT_BOARD.md` 的修改，实时向 Web 端推送局部无感刷新。

---

## 验收标准

- [x] 在 `AGENTS.md` 中添加管线状态推进 CLI 指令集与导演执行原则，移出 `CLAUDE.md`。
- [x] 重构 [项目创建规范.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/docs/%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA%E8%A7%84%E8%8C%83.md) 中的 YAML 字段定义，使其与 V8/V9 模版黑板 [project-board-template.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.agents/skills/scene-forge/references/project-board-template.md) 保持完全一致。
- [x] 检查并确保 `/api/projects` 接口的初始化逻辑覆盖了 `PROJECT_BOARD.md`、`PROJECT_INDEX.md` 以及全局 `projects/PROJECT_INDEX.md` 的合并注册。

## 被阻塞于

- 无 (已全部完成)

