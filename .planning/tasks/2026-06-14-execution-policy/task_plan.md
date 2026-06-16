# Execution Policy Task Plan

## Goal

实现 SceneForge 快速执行/全自动模式基础设施，并修复 CLI 工作目录和 Markdown 渲染兜底问题。

## Phases

### Phase 1: 计划与 issues
**Status:** complete
- 写实施计划
- 创建 35-42 本地 issues

### Phase 2: CLI 工作目录防护
**Status:** complete
- 修正项目上下文和宏命令提示

### Phase 3: 执行模式 UI 与 board API
**Status:** complete
- 新增 API
- 新增左侧模式切换

### Phase 4: Agent 上下文注入
**Status:** complete
- 注入执行策略、待解锁和硬停机条件

### Phase 5: Markdown 渲染兜底
**Status:** complete
- 支持无空格标题
- 保持表格渲染

### Phase 6: Skill/contract 后续
**Status:** complete
- scene-forge 确认闸门：complete
- storyboard/video_prompts 深层 review：complete

### Phase 7: 验证收口
**Status:** complete
- build/test
- 汇总剩余风险：complete

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| engine test initially read stale dist when build/test ran in parallel | Parallel validation run | Re-ran in correct order: build first, then test |
| web-console full test did not exit | `pnpm --filter @scene-forge/web-console test` | Targeted changed server tests passed; full run hung at watcher test and was interrupted |
| existing worldcup storyboard/video_prompts fail new deep validator | CLI validate from `projects/worldcup` | Expected finding: old artifacts need regeneration under new contract rules |
