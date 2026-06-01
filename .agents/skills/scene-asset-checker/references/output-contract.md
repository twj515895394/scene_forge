# scene-asset-checker 输出协议

本文件定义 `scene-asset-checker` 的判断分类、黑板摘要边界和阶段推进建议。

## 阶段补丁壳

```yaml
patch_type: scene-asset-checker
version: 1
status:
updated_at:
summary:
data:
```

## 阶段目标

判断角色、场景、核心道具在当前项目中是：

- 直接复用
- 微调复用
- 轻量新建
- 完整新建

## 强制顺序

1. 角色资产判断
2. 场景资产判断
3. 道具资产判断（仅满足必要条件时）

## 判断分类

### 角色 / 场景

- `reuse_direct`
- `reuse_tweak`
- `new_light`
- `new_full`

### 道具

- `skip_normal`
- `embed_in_character_or_scene`
- `new_core_prop`

## `data` 结构

```yaml
data:
  character_assets:
    - role_name:
      reuse_status:
      asset_ref:
      reuse_reason:
      required_adjustments:
  scene_assets:
    - scene_name:
      reuse_status:
      asset_ref:
      reuse_reason:
      required_adjustments:
  prop_assets:
    - prop_name:
      prop_status:
      asset_ref:
      handling_note:
  design_actions:
    reuse_targets:
    tweak_targets:
    new_light_targets:
    new_full_targets:
  risk_notes:
  next_action:
```

### 字段说明

- `character_assets`：角色资产判断结果列表。
- `scene_assets`：场景资产判断结果列表。
- `prop_assets`：核心道具判断结果列表；普通道具可为空或只记录跳过结论。
- `design_actions`：供 `scene-design-builder` 直接消费的设计动作清单。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

### 字段口径

#### `character_assets` / `scene_assets`

- `role_name` / `scene_name`：本次项目中的角色名或场景名。
- `reuse_status`：固定使用 `reuse_direct / reuse_tweak / new_light / new_full`。
- `asset_ref`：命中资产的相对路径或资产卡标识；若未命中可留空。
- `reuse_reason`：为什么做出该判断。
- `required_adjustments`：若为微调复用，列出需要调整的点；否则可为空列表。

#### `prop_assets`

- `prop_name`：道具名。
- `prop_status`：固定使用 `skip_normal / embed_in_character_or_scene / new_core_prop`。
- `asset_ref`：若已有核心道具资产则填写；否则留空。
- `handling_note`：说明为何跳过、嵌入角色/场景，或需要单独建核心道具卡。

#### `design_actions`

- `reuse_targets`：直接复用对象列表。
- `tweak_targets`：需要微调复用的对象列表。
- `new_light_targets`：需要轻量新建锁定卡的对象列表。
- `new_full_targets`：需要完整新建设定的对象列表。

## 与上一阶段的衔接规则

- 只判断 `scene-reference-decider` 允许继承的内容。
- 若对象落在 `forbidden_inheritance` 所覆盖的表达边界内，不应直接按高相似度资产复用。
- 资产命中判断服从参考边界，不能因为“库存里有现成项”就越界继承。

## 阻塞规则

- 未命中资产不是阻塞。
- 只要能明确归入 `new_light` 或 `new_full`，本阶段就应继续完成并推进。
- 只有在输入信息严重不足、无法判断对象清单，或参考边界与资产复用要求真实冲突时，才使用 `status: blocked`。

## 摘要显示规则

- `summary` 使用中文。
- 对关键分类建议采用“中文显示名（英文参数值）”。

示例：

- 角色资产判断已完成，孙悟空进入微调复用（`reuse_tweak`），白骨精进入完整新建（`new_full`）。

## 黑板输出建议

黑板补丁至少应说明：

- 命中的角色资产
- 命中的场景资产
- 是否存在需要单独沉淀的核心道具
- 后续设计阶段应复用或新建的对象清单

## 示例

```yaml
patch_type: scene-asset-checker
version: 1
status: completed
updated_at: 2026-06-01
summary: 角色与场景资产判断已完成，孙悟空进入微调复用（`reuse_tweak`），山林小路进入直接复用（`reuse_direct`），白骨精进入完整新建（`new_full`）。
data:
  character_assets:
    - role_name: 孙悟空
      reuse_status: reuse_tweak
      asset_ref: assets/characters/角色_孙悟空_v1.0_经典锚点版.md
      reuse_reason: 存在高认知锚点角色资产，但需按本项目参考边界做动画化微调。
      required_adjustments:
        - 降低对具体影视服装轮廓的贴近度
        - 强化夸张表情层次
    - role_name: 白骨精
      reuse_status: new_full
      asset_ref:
      reuse_reason: 当前资产库没有可直接继承的白骨精角色资产。
      required_adjustments: []
  scene_assets:
    - scene_name: 山林小路
      reuse_status: reuse_direct
      asset_ref: assets/scenes/场景_山林小路_v1.0_黄昏神秘版.md
      reuse_reason: 场景气质与本项目需求一致，可直接复用。
      required_adjustments: []
    - scene_name: 妖洞内部
      reuse_status: new_light
      asset_ref:
      reuse_reason: 需要快速补一版锁定卡以支撑本次分镜。
      required_adjustments: []
  prop_assets:
    - prop_name: 金箍棒
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 当前作为孙悟空角色锁定卡附属信息处理，不单独建核心道具卡。
  design_actions:
    reuse_targets:
      - 山林小路
    tweak_targets:
      - 孙悟空
    new_light_targets:
      - 妖洞内部
    new_full_targets:
      - 白骨精
  risk_notes:
    - 若孙悟空微调过度贴近86版外观，可能越过参考边界。
  next_action: 进入 scene-design-builder，优先补白骨精完整设定和妖洞内部轻量场景锁定卡。
```

## 阶段推进建议

- `project_status: assets_checked`
- `next_stage: scene-design-builder`
- 顶层不新增全局索引字段
