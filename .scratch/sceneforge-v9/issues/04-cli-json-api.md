Status: ready-for-agent

# Issue 04: 稳定化 CLI JSON API (CLI Interface Freeze)

## 背景

为了向前端 Web Console 提供无状态的引擎接口，需要将 CLI 输出接口进行标准化，保证所有核心操作皆可通过 `--json` 返回确定性的结构数据。

## 目标

1. 改造 `scene-forge` CLI 命令行工具，提供对以下命令的 `--json` 支持：
   - `scene-forge status`
   - `scene-forge start`
   - `scene-forge validate`
   - `scene-forge complete`
   - `scene-forge artifacts`
   - `scene-forge rules`
2. 规范化统一错误码（Error Code Registry），当执行失败时返回清晰的错误结构（包括 code、message、details）。

## 验收标准

- [ ] 在 CLI 中执行 `scene-forge status --json` 等命令能成功输出标准的 JSON，无任何 ANSI 控制字符干扰，便于后续 node 桥接层解析。
