Status: ready-for-agent

# Issue 02: 阶段事务状态机与推进原子化 (Transactional Complete)

## 背景

当前状态机在推进阶段时全靠 Agent 文本自查并放行，这极易导致未校验的、含有错漏的半成品直接完成阶段，污染下游。

## 目标

1. 建立 `PROJECT_STATE.json` 并追踪阶段状态（`ready` / `in_progress` / `review_failed` / `validated` / `completed`）。
2. 实现 `scene-forge start --stage <stage>` 和 `scene-forge complete --stage <stage>` 两个事务命令。
3. `complete` 时，事务内部自动读取 manifest、运行硬性校验脚本并输出 `validation_result.json`；若校验不通过，状态退回 `review_failed`，严禁推进。
4. 阶段通过后，自动合并生成 Handoff 简报（KV结构），释放下游阶段的 `ready` 状态。

## 验收标准

- [ ] 在 Validator 失败时运行 `scene-forge complete` 会被拦截，状态不会变更为 `completed`。
- [ ] 只有成功的 validation 会生成对应阶段的 `handoff.json` 并解锁下一阶段。
