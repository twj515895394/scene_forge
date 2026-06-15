Status: completed

# Issue 53: Output Contract 漂移防护测试

## 父问题

[implementation_plan_20260615_output_contract_slimming_and_zh.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260615_output_contract_slimming_and_zh.md)

## 要构建什么

增加轻量测试，防止 `output-contract.md` 再次膨胀为长规则书，并检查三个核心 skill reference 文档保持中文主导。

## 验收标准

- [x] 测试会在任一 `output-contract.md` 超过 120 行时报错。
- [x] 测试会在 output-contract 缺少“短机器契约”说明时报错。
- [x] 测试会检查核心模板/清单标题中文主导。
- [x] engine build/test 全绿。

## 执行记录

- 已新增 `packages/engine/src/tests/skill_contract_docs.test.ts`。
- 测试覆盖短契约行数、短机器契约声明、默认读取顺序和中文主导标题。
- 已验证 `pnpm --filter @scene-forge/engine build` 与 `pnpm --filter @scene-forge/engine test`。

## 被阻塞于

- Issue 51
- Issue 52
