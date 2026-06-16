# Artifact Consistency Task Plan

## Goal

修复 Web Console 与 Engine 在产物发现、阶段索引同步、manifest 完整性和实时 assistant 去重上的一致性缺口。

## Phases

### Phase 1: 计划与 issues
**Status:** complete
- 创建实施计划文档
- 创建 29-34 本地 issue 文件

### Phase 2: Web Console 产物发现兜底
**Status:** complete
- 抽取 artifact discovery helper
- 接入 `/api/artifacts`
- 补测试

### Phase 3: Engine complete 同步
**Status:** complete
- complete 成功后同步 manifest 与 board
- 补 CLI 测试

### Phase 4: Validator 一致性检查
**Status:** complete
- 检测 state/board/manifest/disk 脱节
- 补 validator 测试

### Phase 5: 实时 assistant 去重
**Status:** complete
- 跨 bubble text dedupe helper
- 补 live bubble 测试

### Phase 6: 回归验证与收口
**Status:** complete
- 运行 web-console 与 engine 测试
- 验证 projects/worldcup
- 汇总风险与剩余项

## Risks

- 自动同步不能编造不存在的产物。
- 阶段别名必须集中处理，避免 UI/CLI 命名继续漂移。
- 深层 output-contract 校验需单独设计确认，不与本轮工程防线混在一起。

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| Web Console full test hangs in watcher.test.js | 1 | 中断全量命令，改跑 build 与 targeted server tests；该挂起为既有问题 |
| server_api.test.ts listen EPERM | 1 | 改为不监听端口，直接测试 API backing discovery helper |
| storyboard 旧产物不符合 final 命名 | 1 | 将不符合 final 命名的 outputs 子文件注册为 draft/output，保留 UI 可见性且不污染 final 校验 |
