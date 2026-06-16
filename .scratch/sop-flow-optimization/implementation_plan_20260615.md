# SceneForge SOP Token 与产物协议优化实施计划

> 状态：draft-for-review
> 来源：
> - `.handoff/handoff-20260615-164214.md`
> - `.handoff/handoff-20260615-150441.md`
> - `.scratch/p0-claude-session-token-control/design.md`
> - `.scratch/sop-artifact-slimming/artifact_inventory_20260615.md`

## 1. 问题理解

当前存在两类相关但不等价的问题：

1. Web Console 默认使用项目级长期 `--resume`，导致 Claude CLI session JSONL 持续累积 `thinking`、`tool_use`、`tool_result`、文件快照和长输出，形成 P0 级 token 滚雪球。
2. SOP 各阶段产物数量和上下游协议偏重，尤其 design、storyboard、video_prompts、audio、performance 等阶段存在重复落盘、默认双语、派生文件独立输出过多等问题。

两者关系：

- P0 token 控制可以先做通用止血，不必等待产物协议全部稳定。
- compact context 的深度读取策略会依赖产物协议，因此不应在产物瘦身前写死旧文件结构。

## 2. 总体策略

采用“三段式”执行：

### Stage A：P0 止血层

目标是快速切断项目级长期 `--resume`：

- 抽离 Claude CLI 参数构造。
- 增加 `stage_light | resume_full` 模式。
- 默认 `stage_light` 不传 `--resume`。
- compact context 第一版只注入轻量状态和路径索引，不深读产物正文。
- UI 提供“轻量阶段 / 完整续聊”切换和当前模式提示。

### Stage B：产物协议层

目标是减少默认交付文件，并让 skill、validator、board、manifest 协议一致：

- design：取消 4 个完整 details 草稿强制落盘，改为对话预览 + 3 个一体化 outputs + 可选 design_notes。
- video_prompts：默认只强制中文 pack，英文 pack / 英文汇编 / 英文 segment 按需生成。
- performance/audio/script/assets：优先做不破坏 validator 的合并。
- storyboard：先合并推荐文件，再评估强制 detail 合并。
- video_intake：全量解析和 timeline 改按需。

### Stage C：P0 精修层

目标是在新协议稳定后补齐工作流级能力：

- 阶段 complete 后自动 rotate stage session。
- compact context 根据 `stage_index.read_policy`、`artifacts.manifest.yaml`、handoff 和新产物协议选择最小必要输入。
- 用 `worldcup003` 或同类长 session 项目做 `resume_full` 与 `stage_light` token 对比。

## 3. 目录调整

新增统一执行入口：

```text
.scratch/sop-flow-optimization/
  README.md
  implementation_plan_20260615.md
  issues/
```

旧目录保留：

```text
.scratch/p0-claude-session-token-control/
.scratch/sop-artifact-slimming/
.scratch/web-console-chat-stability/
```

理由：

- 不破坏已有 handoff 引用。
- 不把 P0 新主线继续塞进已很臃肿的 `web-console-chat-stability`。
- 后续 issue 编号和状态可从 01 重新开始，减少上下文漂移。

## 4. 改动范围

### Web Console

- `apps/web-console/server/server.ts`
- 可新增：`apps/web-console/server/claudeArgs.ts`
- 可新增测试：`apps/web-console/server/tests/claude_args.test.ts`
- `apps/web-console/src/App.tsx`
- `apps/web-console/src/VariantB.tsx`

### Engine / Validator

- `packages/engine/src/validators/validator.ts`
- `packages/engine/src/tests/validator.test.ts`
- `packages/engine/src/tests/skill_contract_docs.test.ts`

### Skills

- `.agents/skills/scene-design-builder/SKILL.md`
- `.agents/skills/scene-design-builder/references/output-contract.md`
- `.agents/skills/scene-design-builder/references/required-deliverables.md`
- `.agents/skills/scene-design-builder/references/workflow.md`
- `.agents/skills/scene-design-builder/references/review-checklist.md`
- `.agents/skills/scene-design-builder/references/design-prompt-template.md`
- `.agents/skills/scene-video-prompt-builder/SKILL.md`
- `.agents/skills/scene-video-prompt-builder/references/output-contract.md`
- `.agents/skills/scene-video-prompt-builder/references/required-deliverables.md`
- `.agents/skills/scene-video-prompt-builder/references/workflow.md`
- `.agents/skills/scene-video-prompt-builder/references/review-checklist.md`
- `.agents/skills/scene-video-prompt-builder/references/video-prompt-template.md`
- `.agents/skills/scene-performance-director/**`
- `.agents/skills/scene-audio-director/**`
- `.agents/skills/scene-script-adapter/**`
- `.agents/skills/scene-asset-checker/**`
- `.agents/skills/scene-storyboard-director/**`
- `.agents/skills/scene-video-intake/**`

### 计划与 issues

- `.scratch/sop-flow-optimization/**`
- `.planning/tasks/2026-06-15-sop-token-artifact-optimization/**`
- `.planning/current`

## 5. 风险点

- `stage_light` 如果 context 太轻，可能丢失刚才聊天中的用户偏好。缓解：重要偏好必须进入 board、handoff 或阶段确认。
- compact context 如果过早绑定旧产物结构，产物瘦身后会返工。缓解：Stage A 只注入路径索引和摘要。
- design/video_prompts validator 改动会改变阶段完成标准。缓解：先写失败测试，再改 validator 和 skill。
- 合并 performance/audio 等 detail 文件可能被 skill 文案隐性依赖。缓解：每个阶段只合并文档协议，不修改真实项目产物；验证 skill grep 和 validator。
- storyboard 强制 detail 合并牵涉 validator 深，放到后段独立 issue。

## 6. 验证方式

代表性验证命令：

```bash
pnpm --filter @scene-forge/engine build
pnpm --filter @scene-forge/engine test
pnpm --filter @scene-forge/web-console build
git diff --check
```

P0 手工验证：

1. Web Console 默认显示轻量阶段模式。
2. `stage_light` 发送消息时 Claude args 不包含 `--resume`。
3. `resume_full` 发送第二条消息时仍包含 `--resume`。
4. reload Claude 不读取、不展示、不保存 `baseUrl` / `apiKey`。

产物协议验证：

1. design 缺 4 个旧 details 草稿不再触发 SF-DG-201~204 旧文件缺失错误。
2. design 缺 `prop_state_machines` 或 `space_continuity_seed` marker 仍会失败。
3. video_prompts 只有中文 pack + review 可通过必交校验。
4. 英文 pack 如果存在，仍必须和中文 pack 对齐。

## 7. Issue 执行顺序

1. `01-p0-claude-args-context-mode.md`
2. `02-p0-stage-light-ui-and-default.md`
3. `03-p0-stage-session-rotate-and-token-check.md`
4. `04-design-artifact-slimming-contract.md`
5. `05-video-prompts-zh-default-contract.md`
6. `06-low-risk-stage-artifact-merges.md`
7. `07-video-intake-and-storyboard-optional-slimming.md`
8. `08-storyboard-required-breakdown-consolidation.md`
9. `09-reference-story-assets-validator-hardening.md`

推荐先执行 01 和 02，完成 P0 止血；03 可等产物协议稳定后再做。

## 8. 不做

- 不清理旧 `.scratch` 历史文件。
- 不提交或修改 `projects/*` 真实项目产物。
- 不修改 Claude CLI 自身 session JSONL。
- 不裁剪本机 Claude session 历史再强行 resume。
- 不在未确认 issue 粒度前开始代码改造。
