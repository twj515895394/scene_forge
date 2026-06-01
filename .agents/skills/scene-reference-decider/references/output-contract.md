# scene-reference-decider 输出协议

本文件定义 `scene-reference-decider` 的裁定结果结构、固定分类和状态推进方式。

## 阶段补丁壳

```yaml
patch_type: scene-reference-decider
version: 1
status:
updated_at:
summary:
data:
```

## `data` 结构

```yaml
data:
  reference_type:
  decision_summary:
  reference_boundary:
    primary_reference:
    secondary_reference:
    boundary_rule:
    allowed_inheritance:
    forbidden_inheritance:
  must_keep:
    - category:
      note:
  must_avoid:
    - category:
      note:
  risk_notes:
  next_action:
```

## `reference_type` 枚举

- `original_work`
- `specific_adaptation`
- `hybrid_reference`

说明：

- `source_material.source_type` 是输入来源描述
- `reference_type` 是本阶段最终裁定结果
- “未定”不进入该枚举，用补丁 `status` 表达

## `reference_boundary` 结构

```yaml
reference_boundary:
  primary_reference:
  secondary_reference:
  boundary_rule:
  allowed_inheritance:
  forbidden_inheritance:
```

## 固定分类

`allowed_inheritance`、`forbidden_inheritance`、`must_keep.category`、`must_avoid.category` 统一只允许以下分类：

- `角色身份`
- `角色关系`
- `服装轮廓`
- `标志道具`
- `情绪核心`
- `剧情骨架`
- `世界观母题`
- `场景气质`
- `镜头动势`

## 轻结构约束

```yaml
must_keep:
  - category:
    note:

must_avoid:
  - category:
    note:
```

## 顶层状态推进

- `project_status: reference_decided`
- `next_stage: scene-asset-checker`
- 顶层写入 `reference_type`
- `lifecycle_flag: active`

说明：

- `hybrid_reference` 不自动阻塞
- 只有参考边界存在真实冲突、无法继续执行时，补丁 `status` 才使用 `blocked`
- 顶层 `blocker_note` 只在真实阻塞时写入

## 示例

```yaml
patch_type: scene-reference-decider
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次以86版西游记为主参考，允许继承母题级角色和剧情骨架，但避免直接复刻具体表演与镜头。
data:
  reference_type: hybrid_reference
  decision_summary: 以86版西游记为主参考，辅以西游记母题边界，按高认知锚点保留、具体影视表达降继承执行。
  reference_boundary:
    primary_reference: 86版西游记
    secondary_reference: 西游记原著母题
    boundary_rule: 角色身份、关系和剧情骨架优先继承母题与大众认知，避免直接复刻86版具体镜头和表演表达。
    allowed_inheritance:
      - 角色身份
      - 角色关系
      - 标志道具
      - 情绪核心
      - 剧情骨架
      - 世界观母题
    forbidden_inheritance:
      - 镜头动势
      - 服装轮廓
  must_keep:
    - category: 角色身份
      note: 必须保留孙悟空、唐僧、白骨精之间的基础身份关系和冲突结构。
    - category: 情绪核心
      note: 必须保留忠诚与误解并存的核心戏剧张力。
  must_avoid:
    - category: 镜头动势
      note: 避免直接复刻86版的经典机位切换、走位和表演调度。
    - category: 服装轮廓
      note: 避免过度贴近86版真人戏服造型，改为动画电影化转译。
  risk_notes:
    - 若角色外观参考强度过高，容易滑向具体影视版本复刻。
  next_action: 进入 scene-asset-checker，优先判断孙悟空角色资产和山林、妖洞类场景资产是否已有可复用版本。
```
