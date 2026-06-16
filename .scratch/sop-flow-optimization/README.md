# SceneForge SOP Flow Optimization

> 创建时间：2026-06-15
> 状态：draft-for-review

本目录是后续执行入口，用于合并两条原本分散的需求线：

- P0 Claude Session Token 控制：来源 `.scratch/p0-claude-session-token-control/design.md`
- SOP 阶段产物瘦身与上下游协议收口：来源 `.scratch/sop-artifact-slimming/artifact_inventory_20260615.md`

旧目录不删除、不搬迁，继续作为来源证据和交接资料。本目录只承载统一计划、实施 issues 和后续执行追踪。

## 决策摘要

推荐采用三段式路线：

1. P0 先止血：先让 Web Console 默认不再项目级长期 `--resume`，改为轻量阶段上下文。
2. 产物协议瘦身：收口 design、video_prompts、performance、audio 等阶段的默认交付文件和 validator/skill 协议。
3. P0 再精修：等产物协议稳定后，再把 compact context、stage session rotate 和 token 对比做深。

这样可以避免两个极端：

- 先等全部产物瘦身完成，会让当前 token 爆炸继续拖累开发和真实验证。
- 先把 P0 compact context 全做深，会被后续产物路径和协议改造返工。

## 文件

- `implementation_plan_20260615.md`：完整实施计划。
- `issues/`：按垂直切片拆分的本地 issue 草案。

## 当前边界

- 不修改 `projects/*` 真实项目产物。
- 不删除旧 `.scratch/*` 资料。
- 不提交任何运行产物。
- 代码执行前需确认本目录 issue 粒度和执行顺序。
