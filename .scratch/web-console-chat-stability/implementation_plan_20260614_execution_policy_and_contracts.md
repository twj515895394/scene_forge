# SceneForge Execution Policy and Contract Hardening Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use planning-with-files to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 SceneForge 增加快速执行/全自动两种执行模式，修复 Web Console CLI 工作目录、Markdown 渲染和重点阶段产物规范缺口。

**Architecture:** `PROJECT_BOARD.md.execution_policy` 作为执行策略事实源；Web Console 提供模式切换并把策略注入 Agent 上下文；`scene-forge` 总控和重点阶段 skill 读取策略决定确认闸门。渲染和 CLI 命令修复保持在 Web Console 边界内，深层 storyboard/video_prompts 合规则由 validator/review 后续票处理。

**Tech Stack:** TypeScript, Express, React, SceneForge project board YAML, node:test.

---

## 模式共识

- `fast_production`：默认。关键创作阶段确认，执行型阶段自动落盘汇报。
- `full_auto`：手动开启。`topic_gate + script/adaptation` 确认题材、改编方向、风格、目标总时长、分段策略、输出目标后，后续阶段自动执行。
- 全自动允许提前开启，但在前置确认完成前显示待解锁。
- 全自动只因硬错误暂停：validator/review 失败、必填字段缺失、时长/分段冲突、上游产物不存在、CLI 状态机无法推进。
- 创作质量一般但结构可用时不中断，最终汇报风险。

## Issues

- [35-cli-command-working-directory-guard.md](issues/35-cli-command-working-directory-guard.md)
- [36-execution-policy-board-and-ui-toggle.md](issues/36-execution-policy-board-and-ui-toggle.md)
- [37-execution-policy-agent-context-injection.md](issues/37-execution-policy-agent-context-injection.md)
- [38-scene-forge-confirmation-gate-policy.md](issues/38-scene-forge-confirmation-gate-policy.md)
- [39-markdown-rendering-hardening.md](issues/39-markdown-rendering-hardening.md)
- [40-storyboard-contract-review-hardening.md](issues/40-storyboard-contract-review-hardening.md)
- [41-video-prompts-contract-review-hardening.md](issues/41-video-prompts-contract-review-hardening.md)
- [42-execution-policy-e2e-regression.md](issues/42-execution-policy-e2e-regression.md)

## Task Order

### Task 1: CLI 工作目录修复

- [ ] Web Console 宏命令提示中强制当前项目目录执行 CLI。
- [ ] 项目上下文注入明确错误示例和正确命令。
- [ ] 不改 Engine CLI 状态机行为。

### Task 2: 执行模式 UI 与 board 写入

- [ ] 新增读取/写入 `PROJECT_BOARD.md.execution_policy` 的 API。
- [ ] 左侧 Pipeline Flow 标题区增加 `快速 / 全自动` 切换。
- [ ] 缺省 board 字段按 `fast_production`。
- [ ] 全自动但前置未确认时 UI 显示待解锁。

### Task 3: Agent 上下文注入

- [ ] `buildProjectContext` 注入当前 `execution_policy`。
- [ ] 明确 fast/full_auto 的确认闸门和硬停机条件。

### Task 4: Markdown 渲染兜底

- [ ] 支持 `###中文标题` 等无空格标题。
- [ ] 改善聊天和右侧栏共同 renderer 的表格/标题解析顺序。
- [ ] 加渲染 helper 单元测试或至少 build 验证。

### Task 5: Skill/contract 后续硬化

- [ ] 修改 `scene-forge` 确认闸门规则，支持执行策略。
- [ ] 为 storyboard/video_prompts 增加深层 contract review/validator。
- [ ] E2E 跑快速模式和全自动模式最短链路。

## Verification

```bash
pnpm --filter @scene-forge/web-console build
pnpm --filter @scene-forge/engine test
```

## Risks

- `PROJECT_BOARD.md` 是大 YAML 文件，写入必须只改 `execution_policy`，避免重排全文件。
- 全自动模式不能绕过 topic/script 的核心确认。
- 深层 contract 不应一次性阻塞全部历史项目，应先从 warning/review 过渡。
