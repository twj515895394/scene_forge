# SOP Token Artifact Optimization Task Plan

## Goal

把 P0 Claude session token 控制与 SOP 阶段产物瘦身合并为一个可执行主线，先完成目录/计划/issues 收口，再按确认后的 issue 顺序实施。

## Phases

### Phase 1: 上下文读取与目录判断
**Status:** complete
- 阅读 handoff、P0 设计、产物 inventory、相关 skill 和现有 issue 格式。
- 判断新建 `.scratch/sop-flow-optimization/` 作为统一执行入口。

### Phase 2: 统一计划与 issues 草案
**Status:** complete
- 创建 README、实施计划和 draft issues。
- issues 使用本地 Markdown tracker 格式，等待用户确认粒度和顺序。

### Phase 3: 用户确认
**Status:** complete
- 用户确认 issue 粒度、依赖和是否开始代码执行。
- 确认后把对应 issue 状态从 `draft-for-review` 调整为 `ready-for-agent`。

### Phase 4: P0 止血执行
**Status:** complete
- 执行 Issue 01 / 02。
- 验证 web-console build 和 args 单测。

### Phase 5: 产物协议执行
**Status:** complete
- 执行 Issue 04 / 05 / 06 / 07。
- 验证 engine build/test。

### Phase 6: P0 精修与后续加固
**Status:** implemented-awaiting-token-sample
- 执行 Issue 03 / 08 / 09。
- validator 加固已完成。
- 阶段 session rotate 工程实现已完成；真实长 session token A/B 采样待在已激活项目中执行。

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| `scene-forge` skill 首次按全局路径读取失败 | 1 | 改读仓库内 `.agents/skills/scene-forge/SKILL.md` |

## Current Decision

- 不移动或删除旧 `.scratch` 资料。
- 新主线入口为 `.scratch/sop-flow-optimization/`。
- 代码改造前等待用户确认 draft issues。
