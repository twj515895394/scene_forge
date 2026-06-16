Status: completed

# Issue 33: worldcup 项目产物索引修复与回归验证

## 父问题

[implementation_plan_20260614_artifact_consistency.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/implementation_plan_20260614_artifact_consistency.md)

## 要构建什么

使用新的同步与发现逻辑修复 `projects/worldcup` 当前的产物索引脱节，并验证 Web Console 侧边栏对 `storyboard`、`audio`、`video_prompts` 等阶段不再显示空产物。

这张票是回归验证切片，只在同步工具已可用后执行，不手工编造不存在的产物。

## 验收标准

- [ ] `projects/worldcup/PROJECT_BOARD.md` 中后半阶段 `stage_index` 与 `PROJECT_STATE.json` 不再明显脱节。
- [ ] `projects/worldcup/artifacts.manifest.yaml` 注册当前阶段真实存在的主产物与子产物。
- [ ] `node ../../packages/engine/dist/cli.js validate --stage storyboard --json` 通过或输出可解释 warning。
- [ ] Web Console `/api/artifacts?stage=storyboard`、`audio`、`video_prompts` 均返回非空列表。

## 被阻塞于

- [Issue 29: Web Console 产物发现兜底与真实 API 回归](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/29-web-console-artifact-discovery-fallback.md)
- [Issue 30: CLI complete 后自动同步 stage_index 与 manifest](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/30-cli-complete-stage-index-manifest-sync.md)

## 实施记录

- 已用 `syncStageArtifactIndex` 同步 `projects/worldcup` 的 `storyboard`、`audio`、`video_prompts`。
- `storyboard` 子包和旧 `outputs/storyboard.md` 以 `draft/output` 注册，避免污染 final artifact 命名校验。
- `publish_review` 当前没有真实产物，未生成虚假索引。
- 回归结果：`validate --stage storyboard/audio/video_prompts --json` 均 passed，warnings 为空。
- Web Console helper 返回：storyboard 9 项、audio 2 项、video_prompts 5 项。
