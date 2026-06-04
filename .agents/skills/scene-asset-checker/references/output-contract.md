# scene-asset-checker 输出协议

本文件定义 `scene-asset-checker` 的判断分类、资产锁定文件约定、黑板摘要边界和阶段推进建议。

## 阶段补丁壳

```yaml
patch_type: scene-asset-checker
stage: scene-asset-checker
version: 8
status: pending | in_progress | completed | blocked | skipped
updated_at:
summary:
board_updates:
  state:
  routing:
  project_config:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created:
  - path:
    purpose:
    version:
files_updated:
  - path:
    purpose:
    version:
next_action:
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

## 阶段正文结构

下文结构用于阶段正式产物文件，例如 `details/`、`outputs/` 或 `inputs/` 中的 primary/handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

```yaml
data:
  story_function_summary:
    key_characters:
    key_scenes:
    key_props:
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
  asset_lock_file:
  asset_lock_summary:
    locked_characters:
    locked_scenes:
    locked_props:
    downstream_constraints:
  risk_notes:
  next_action:
```

### 字段说明

- `character_assets`：角色资产判断结果列表。
- `scene_assets`：场景资产判断结果列表。
- `prop_assets`：核心道具判断结果列表；普通道具可为空或只记录跳过结论。
- `design_actions`：供 `scene-design-builder` 直接消费的设计动作清单。
- `asset_lock_file`：写入 `details/assets/asset_lock_v*.md` 的资产锁定文件路径，供设计、剧本和分镜阶段读取。
- `asset_lock_summary`：轻量资产锁定摘要，用于快速说明本项目哪些角色、场景和核心道具已经锁定，哪些必须新建或微调。
- `story_function_summary`：本阶段读取到的关键角色/场景/道具剧情功能摘要，用于解释资产判断为什么成立。
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

#### `asset_lock_summary`

- `locked_characters`：已经明确复用 / 微调 / 新建路径的角色列表。
- `locked_scenes`：已经明确复用 / 微调 / 新建路径的场景列表。
- `locked_props`：已经被视为核心道具或附属处理的关键道具列表。
- `downstream_constraints`：后续设计和分镜必须继承的资产锁定边界，例如“不得新增未评估角色外观锚点”。

## 与上一阶段的衔接规则

- 只判断 `scene-reference-decider` 允许继承，且 `scene-story-development` 明确需要的内容。
- 若对象落在 `forbidden_inheritance` 所覆盖的表达边界内，不应直接按高相似度资产复用。
- 资产命中判断服从参考边界和故事功能，不能因为“库存里有现成项”就越界继承。

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
- `asset_lock_v*.md` 是否已生成
- 后续设计阶段应复用或新建的对象清单

## 示例

```yaml
patch_type: scene-asset-checker
stage: scene-asset-checker
version: 8
status: completed
updated_at: 2026-06-01
summary: 角色与场景资产判断已完成，孙悟空进入微调复用（`reuse_tweak`），山林小路进入直接复用（`reuse_direct`），白骨精进入完整新建（`new_full`）。
board_updates:
  state:
    project_status: assets_checked
    next_stage: scene-design-builder
  stage_index:
    assets:
files_created:
  - path: details/assets/asset_check_v1.md
    purpose: 资产判断正文
    version: v1
  - path: details/assets/asset_lock_v1.md
    purpose: 资产锁定文件
    version: v1
files_updated:
  - path: projects/<project>/PROJECT_BOARD.md
    purpose: 资产阶段索引更新
    version: v1
next_action: 进入 scene-design-builder，优先补白骨精完整设定和妖洞内部轻量场景锁定卡。
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
  asset_lock_file: details/assets/asset_lock_v1.md
  asset_lock_summary:
    locked_characters:
      - 孙悟空
      - 白骨精
    locked_scenes:
      - 山林小路
      - 妖洞内部
    locked_props:
      - 金箍棒
    downstream_constraints:
      - 后续设计不得跳过白骨精完整新建路径
      - 孙悟空只能在既有资产基础上微调，不得改成全新陌生造型
  risk_notes:
    - 若孙悟空微调过度贴近86版外观，可能越过参考边界。
  next_action: 进入 scene-design-builder，优先补白骨精完整设定和妖洞内部轻量场景锁定卡。
```

## 阶段推进建议

- `board_updates.state.project_status: assets_checked`
- `board_updates.state.next_stage: scene-design-builder`
- `board_updates.stage_index.assets`
- 黑板不新增全局正文字段，只更新摘要、文件索引和下一步设计动作
- `files_created` 应显式包含 `details/assets/asset_lock_v*.md`
