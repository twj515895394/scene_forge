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
details/design/character_design_*_v*.md
details/design/scene_design_v*.md
details/design/prop_design_v*.md
details/design/space_continuity_seed_v*.md
```

兼容中文角色说明书路径：

```text
details/角色说明书_*_v*.md
```

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
        - details/design/character_design_*_v*.md
        - details/design/scene_design_v*.md
        - details/design/prop_design_v*.md
        - details/design/space_continuity_seed_v*.md
      outputs:
        - outputs/design.md
        - outputs/design_prompts/角色说明书图片提示词_v*.md
        - outputs/design_prompts/全场景资产总参考图提示词_v*.md
```

## 禁止完成的情况

不得把以下情况标记为 completed：

- 角色说明书图片 prompt 英文主导。
- 角色 prompt 是单张海报式图，而不是角色说明书板。
- 缺少角色、场景、道具或空间连续性文件。
- 文件存在但未注册 manifest。
- board 没有索引 details / outputs。
- 快速模式下用户尚未确认 design 方案。
