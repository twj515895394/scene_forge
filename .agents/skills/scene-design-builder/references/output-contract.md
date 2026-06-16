# Design 阶段短机器契约

本文件只定义 `scene-design-builder` 的最小字段契约，用于 validator、manifest、board 索引和下游阶段核对。

它不是执行流程文档，不承载创作方法、长样例或资产库说明。执行流程读取 `workflow.md`；必交文件读取 `required-deliverables.md`；正式 prompt 体裁读取 `design-prompt-template.md`；完成前检查读取 `review-checklist.md`。

完整规则迁移位置见 `output-contract-migration-map.md`。

## 读取规则

- 默认执行阶段不需要全文读取本文件。
- 只有在修复字段、实现 validator、排查 board/manifest 漂移时读取。
- 正文说明必须中文主导；英文只保留为技术 key、文件名或外部模型辅助词。

## 主交付

`outputs/design.md` 必须是中文设计总览，至少包含以下 marker：

- `visual_language`
- `character_designs`
- `scene_designs`
- `prop_designs`
- `space_continuity_seed`
- `prop_state_machines`
- `blocking_map`

## 细节文件

旧版完整 details 草稿不再是强制交付。正式设计细节必须并入一体化 outputs：

- 角色身份、轮廓、配色、材质、表情系统、动作姿态、道具交互和边界约束并入 `outputs/design_prompts/角色说明书图片提示词_v*.md`。
- 场景视觉、空间结构、道具外观和材质细节并入 `outputs/design_prompts/全场景资产总参考图提示词_v*.md`。
- 道具状态机、空间连续性和 blocking 基线并入 `outputs/design.md`。

可选追溯文件：

- `details/design/design_notes_v*.md`

## Prompt 输出

必须真实落盘并注册：

- `outputs/design_prompts/角色说明书图片提示词_v*.md`
- `outputs/design_prompts/全场景资产总参考图提示词_v*.md`

推荐但不强制：

- `outputs/design_prompts/空间站位图提示词_v*.md`

角色说明书图片提示词必须中文主导，目标是角色说明书板，不是单张海报或单人肖像。

## 角色说明书 Prompt 必备 marker

`outputs/design_prompts/角色说明书图片提示词_v*.md` 必须包含：

- `角色说明书`
- `多视角`
- `轮廓剪影`
- `表情系统`
- `微表情`
- `动作姿态`
- `关键道具交互`
- `细节区`
- `比例对照`
- `边界约束`

## 禁止形态

不得把以下内容当成正式 design 完成：

- 英文主导的角色 prompt。
- `single portrait`、`cinematic portrait`、`hero poster`、`character poster` 等海报/肖像导向 prompt。
- 只写 `outputs/design.md`，但缺角色说明书 prompt 或全场景资产总参考图 prompt。
- `outputs/design.md` 缺 `space_continuity_seed`、`prop_state_machines` 或 `blocking_map`。
- 文件存在但未进入 `artifacts.manifest.yaml`。
- `PROJECT_BOARD.md stage_index.design.files` 缺 primary / outputs / details。

## Board 索引

`PROJECT_BOARD.md stage_index.design.files` 必须包含：

```yaml
primary: outputs/design.md
outputs:
  - outputs/design.md
  - outputs/design_prompts/角色说明书图片提示词_v*.md
  - outputs/design_prompts/全场景资产总参考图提示词_v*.md
details:
  - details/design/design_notes_v*.md   # 可选
```

## 下游交接

Storyboard 阶段只应从 design 阶段继承：

- 角色一致性锚点。
- 场景空间关系。
- 道具状态机。
- blocking / 站位基线。
- 中文角色说明书板和全场景参考图 prompt 路径。
