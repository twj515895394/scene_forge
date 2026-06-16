Status: completed-with-notes

# Issue 42: 快速模式与全自动模式 E2E 回归

## 父问题

[implementation_plan_20260614_execution_policy_and_contracts.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_execution_policy_and_contracts.md)

## 要构建什么

为快速执行模式和全自动模式各跑一条最短项目链路，确认模式切换、前置确认、自动阶段推进、硬错误暂停和产物刷新都符合预期。

## 验收标准

- [x] 快速模式下关键阶段仍会请求确认。
- [x] 全自动模式待解锁状态显示正确。
- [x] 全自动解锁后执行型阶段不再逐个询问落盘。
- [x] 硬错误会暂停并汇报原因。

## 回归记录

- `pnpm --filter @scene-forge/web-console build` 通过，仅保留既有 Vite 第三方 `use client`/sourcemap warning。
- `pnpm --filter @scene-forge/engine build` 通过。
- `pnpm --filter @scene-forge/engine test` 通过，32 个测试全绿。
- 目标 server 测试通过：`node --test dist/server/tests/artifact_discovery.test.js dist/server/tests/live_bubble_accumulator.test.js dist/server/tests/server_api.test.js`，9 个测试全绿。
- `pnpm --filter @scene-forge/web-console test` 全量未完成：已通过前置子测试，但卡在 `dist/server/tests/watcher.test.js`，手动中止。该 watcher 挂起不是本次新增逻辑的断言失败。
- 使用正确工作目录验证真实项目：
  - `projects/worldcup && node ../../packages/engine/dist/cli.js validate --stage storyboard` 被新 `SF-SB-*` 深层 contract 阻断。
  - `projects/worldcup && node ../../packages/engine/dist/cli.js validate --stage video_prompts` 被新 `SF-VP-*` 深层 contract 阻断。
- 上述阻断符合本次目标：旧产物确实缺少深层规范结构，需要按新规则重生成，而不是放宽 validator。

## 被阻塞于

- [Issue 41: Video Prompts 深层规范 review 与自动修复](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/41-video-prompts-contract-review-hardening.md)
