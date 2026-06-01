# scene-design-builder 输出协议

本文件定义 `scene-design-builder` 的输出形态和长内容落盘边界。

## 上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-asset-checker`：`character_assets`、`scene_assets`、`prop_assets`、`design_actions`
- 顶层索引：`production_level`、`performance_style`（若已在后续流程中确认则继承；未确认时仅参考建议）

## 设计输出路径

根据制作档位选择输出形态：

- `focus`：完整角色设定 + 完整场景设定
- `fast`：轻量角色锁定卡 + 轻量场景锁定卡

## 参考强度

- `high_anchor`
- `medium_anchor`
- `low_anchor_originalized`

## 黑板摘要建议

黑板补丁至少应说明：

- 本次走的是完整设定还是轻量锁定卡
- 角色参考强度和场景参考强度
- 哪些内容来自资产复用，哪些内容是新建
- 分别消费了哪些 `reuse_targets / tweak_targets / new_light_targets / new_full_targets`
- 长设定正文写入了哪些 `details/` 文件

## 长内容落盘

较长的角色或场景设定正文写入 `details/`，命名可采用：

- `details/character_design_v*.md`
- `details/scene_design_v*.md`

## 阶段推进建议

- `project_status: design_ready`
- `next_stage: scene-script-adapter`
