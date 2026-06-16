Status: pending

# Issue 22: 阶段索引与产物清单关联注册 (Stage Index & Manifest Registration)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，补齐 `PROJECT_BOARD.md` 的 `stage_index` 节点（包括 `performance`、`storyboard`、`audio`、`video_prompts`、`publish`）与 `artifacts.manifest.yaml` 下的相关产物注册。确保 Web Console 前端接口（`/api/artifacts`）能够完整加载并展示后半段的所有明细草稿及主交付文件。

任务包括：
1. 编辑 `PROJECT_BOARD.md`，手动在 `stage_index` 下补全缺失的 `files` 路径。
2. 编辑 `artifacts.manifest.yaml`，注册将要生成的 `details/` 草稿和 `outputs/` 正式文件，并准确标注其 `role`、`kind` 和 `pack_id`。

## 验收标准

- [ ] `PROJECT_BOARD.md` 下后五个阶段的 `files`（`primary`, `details`, `outputs` 等）完成配置。
- [ ] `artifacts.manifest.yaml` 下登记了所有规范化交付文件的 id、路径及元数据。
- [ ] 终端或接口测试无 YAML 语法错误。

## 被阻塞于

无 - 可以立即开始
