# Design 阶段强制交付清单

本文件是从 `scene-design-builder` 既有阶段规则和 `references/output-contract.md` 抽出的交付清单，不以任何单个项目产物作为模板来源。

Design 阶段完成时，以下文件必须真实存在、写入 manifest，并进入 `PROJECT_BOARD.md stage_index.design.files`。

## 主交付

```text
outputs/design.md
```

必须包含：

- `visual_language`
- `character_designs`
- `scene_designs`
- `prop_designs`
- `space_continuity_seed`
- `prop_state_machines`
- `blocking_map`

## 细节文件

```text
details/design/design_notes_v*.md
```

`design_notes` 是可选追溯文件，默认只记录关键设计决策、取舍理由和用户确认点，不承载完整角色/场景/道具草稿。

旧版完整 details 草稿不再默认生成。其内容必须并入正式 outputs：

- character design bible → `outputs/design_prompts/角色说明书图片提示词_v*.md`
- scene design + prop visual design → `outputs/design_prompts/全场景资产总参考图提示词_v*.md`
- prop state machine + space continuity seed + blocking → `outputs/design.md`

## 设计 Prompt 输出

```text
outputs/design_prompts/角色说明书图片提示词_v*.md
outputs/design_prompts/全场景资产总参考图提示词_v*.md
```

推荐：

```text
outputs/design_prompts/空间站位图提示词_v*.md
```

角色说明书图片 prompt 必须中文主导，并明确目标是：

- 角色说明书板
- character bible sheet
- character design board

不得退化为单张海报式图。

## 黑板索引

`PROJECT_BOARD.md` 必须同步：

```yaml
stage_index:
  design:
    files:
      primary: outputs/design.md
      details:
        - details/design/design_notes_v*.md   # 可选
      outputs:
        - outputs/design.md
        - outputs/design_prompts/角色说明书图片提示词_v*.md
        - outputs/design_prompts/全场景资产总参考图提示词_v*.md
```

## 禁止完成的情况

不得把以下情况标记为 completed：

- 角色说明书图片 prompt 英文主导。
- 角色 prompt 是单张海报式图，而不是角色说明书板。
- 缺少角色说明书 prompt 或全场景资产总参考图 prompt。
- `outputs/design.md` 缺少空间连续性、道具状态机或 blocking 基线。
- 文件存在但未注册 manifest。
- board 没有索引 details / outputs。
- 快速模式下用户尚未确认 design 方案。
