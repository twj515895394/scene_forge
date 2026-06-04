# scene-reference-decider 输出协议

本文件定义 `scene-reference-decider` 的裁定结果结构、固定分类和状态推进方式。

## 阶段补丁壳

```yaml
patch_type: scene-reference-decider
stage: scene-reference-decider
version: 1
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

## 阶段正文结构

下文结构用于阶段正式产物文件，例如 `details/`、`outputs/` 或 `inputs/` 中的 primary/handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

```yaml
data:
  script_strategy:
    status:
    mode:
  creative_direction_context:
    script_mode:
    selected_adaptation:
      status:
      selected_idea_id:
      selected_title:
      selection_note:
    downstream_rule:
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
  source_intake_reference_use:
    source_intake_used:
    files_read:
    inherited_core:
    inherited_highlights:
    rewritten_or_replaced:
    avoid_copying:
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

## 黑板回写建议

- `board_updates.state.project_status: reference_decided`
- `board_updates.state.next_stage: scene-story-development`
- `board_updates.state.lifecycle_flag: active`
- `board_updates.project_config.reference_type`
- `board_updates.stage_index.reference`
- `board_updates.cross_stage_summary`

说明：

- `hybrid_reference` 不自动阻塞
- 只有参考边界存在真实冲突、无法继续执行时，补丁 `status` 才使用 `blocked`
- `board_updates.state.blocker_note` 只在真实阻塞时写入
- 若 `script_strategy.mode = rewrite_adaptation` 且项目来自视频源，则进入本阶段前 `selected_adaptation.status` 必须已经是 `selected`

## 示例

```yaml
patch_type: scene-reference-decider
stage: scene-reference-decider
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次以86版西游记为主参考，允许继承母题级角色和剧情骨架，但避免直接复刻具体表演与镜头。
board_updates:
  state:
    project_status: reference_decided
    next_stage: scene-story-development
    lifecycle_flag: active
  project_config:
    reference_type: hybrid_reference
  stage_index:
    reference:
  cross_stage_summary:
files_created:
  - path: details/reference/reference_boundary_v1.md
    purpose: 参考边界正文
    version: v1
files_updated:
  - path: projects/<project>/PROJECT_BOARD.md
    purpose: 参考阶段索引更新
    version: v1
next_action: 进入 scene-story-development，先围绕参考边界建立轻量故事骨架，再判断角色和场景资产。
data:
  script_strategy:
    status: selected
    mode: preserve_original
  creative_direction_context:
    script_mode: preserve_original
    selected_adaptation:
      status: bypassed
      selected_idea_id:
      selected_title:
      selection_note: 本项目保留原始剧情方向，不使用视频改写方向候选。
    downstream_rule: 下游各阶段围绕原始剧情/桥段保留进行设计和标准化，不重新发散改写方向。
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
  next_action: 进入 scene-story-development，先围绕参考边界建立轻量故事骨架，再判断角色和场景资产。
```
