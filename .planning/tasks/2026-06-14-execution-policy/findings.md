# Findings

## 2026-06-14

- 截图里的 node 错误来自错误工作目录执行 `node ../../packages/engine/dist/cli.js rules --stage audio`，路径被解析成 `/Users/tangwujun/Documents/packages/engine/dist/cli.js`。
- Web Console `buildProjectContext` 已提示先 `cd projects/<slug>`，但宏命令只给自然语言，没有把具体 CLI 工作目录约束放进每次宏。
- 当前 `scene-forge` 总控确认闸门对 8 个阶段默认都要求预览确认，流程偏长。
- Markdown renderer 只匹配 `### `、`## `、`# ` 后有空格的标题，无法解析 `###分段覆盖|...`。
