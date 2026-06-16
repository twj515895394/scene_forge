# Findings

## 2026-06-15

- P0 token 控制来源目录：`.scratch/p0-claude-session-token-control/design.md`。
- 产物瘦身来源目录：`.scratch/sop-artifact-slimming/artifact_inventory_20260615.md`。
- 旧 `web-console-chat-stability` 已承载大量历史 issue，继续塞入 P0 + 瘦身主线会增加上下文漂移。
- 现有本地 issue 格式是 `.scratch/<topic>/issues/*.md`，文件头使用 `Status: ...`。
- Web Console 当前 `runClaude()` 首轮使用 `--session-id`，后续使用 `--resume sessionId`，这是 P0 token 滚雪球主因。
- design 阶段 validator 当前强制旧 details 草稿文件；video_prompts 当前强制中英双产。
- reference / story / assets validator 结构校验偏弱，是产物瘦身后的加固点。

## Directory Decision

新增 `.scratch/sop-flow-optimization/` 作为合并执行入口；旧目录作为来源证据保留。
