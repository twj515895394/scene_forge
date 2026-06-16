# Findings

## 2026-06-14

- `projects/worldcup/PROJECT_STATE.json` 显示 `storyboard/audio/video_prompts` 已 completed。
- `projects/worldcup/PROJECT_BOARD.md` 中 `storyboard/audio/video_prompts/publish` 的 `stage_index` 仍是 pending 且 files 为空。
- `projects/worldcup/artifacts.manifest.yaml` 只注册主产物，没有覆盖 details 和 storyboard 子 pack。
- `/api/artifacts` 当前只合并 manifest 和 board，不扫描磁盘兜底。
- `validate --stage storyboard` 和 `validate --stage video_prompts` 当前均可通过，说明 validator 没覆盖 board/manifest 一致性。
- `server_api.test.ts` 当前只搭了 manifest-only 迷你 API，无法覆盖真实 artifact 合并行为。
