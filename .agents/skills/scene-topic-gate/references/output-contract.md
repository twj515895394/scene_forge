# scene-topic-gate 输出协议

本文件定义 `scene-topic-gate` 的输出字段、评分规则、source intake 读取记录和状态推进方式。

## 阶段补丁壳

```yaml
patch_type: scene-topic-gate
stage: scene-topic-gate
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
  topic_name:
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
  source_material:
    source_type:
    source_name:
    source_locator:
    notes:
  source_intake_used: true | false
  source_intake_files_read:
    - file:
      read_budget: compact | standard | deep
      reason:
  source_intake_summary_used:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    adaptation_ideas_summary:
    risks_or_limits:
  assetization_recommendation:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    recommended_asset_status: none | proposed
  total_score:
  performance_style_suggestion:
  production_level:
  decision:
  dimension_scores:
    热点价值:
    动画化适配度:
    改编空间:
    经典认知锚点:
    风险可控性:
    制作成本可控性:
    平台传播潜力:
  source_intake_dimension_notes:
    源视频核心是否清晰:
    亮点是否足够支撑改编:
    可压缩内容是否明确:
    可替换内容是否明确:
    是否有不应照搬元素:
    是否具备资产化候选价值:
  rationale:
  risk_notes:
  reuse_hints:
  evaluator_rule_version:
```

## source_intake 输入规则

如果 `PROJECT_BOARD.md` 存在：

```yaml
source_intake:
  status: analyzed
  files:
    topic_gate_handoff:
    priority_map:
    adaptation_ideas:
```

则本阶段优先读取：

```text
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
```

必要时读取：

```text
inputs/source_intake/source_intake_index_v1.md
```

如果顶层：

```yaml
script_strategy:
  mode: rewrite_adaptation | preserve_original
```

则本阶段还必须读取该字段，并生成统一的 `creative_direction_context`。

不应默认读取完整：

```text
source_video_analysis_v1.md
source_video_timeline_v1.md
```

如果读取完整长解析，必须在 `source_intake_files_read.reason` 中说明原因。

## 枚举约束

`decision`：

- `go`
- `observe`
- `drop`

`production_level`：

- `focus`
- `fast`

说明：

- 仅当 `decision = go` 时填写 `production_level`
- 当 `decision = observe / drop` 时，`production_level` 留空

`performance_style_suggestion`：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

说明：

- 这是选题阶段的建议值，不直接写入`project_config.performance_style`
- 最终 `performance_style` 由 `scene-script-adapter` 确认

除非字段明确写明 `strict_enum: true`，否则枚举仍遵守 `reference_policy` 的开放参考原则。

## 摘要显示规则

- `summary` 必须用中文
- 关键决策、制作档位、演绎风格建议在中文后附英文参数值
- 若使用 source intake，应在摘要中说明“已基于源视频 handoff 和优先级分层完成评估”

## 七维评分权重

| 维度 | 权重 |
|---|---:|
| 热点价值 | 25 |
| 动画化适配度 | 20 |
| 改编空间 | 15 |
| 经典认知锚点 | 15 |
| 风险可控性 | 10 |
| 制作成本可控性 | 10 |
| 平台传播潜力 | 5 |

## source intake 额外判断维度

基于 source intake 增加以下判断：

```text
源视频核心是否清晰
亮点是否足够支撑改编
可压缩内容是否明确
可替换内容是否明确
是否有不应照搬元素
是否具备资产化候选价值
```

这些维度用于辅助七维评分，不单独改变权重。

## 决策门槛

- `80+`：重点制作池
- `60-79`：快速制作池
- `40-59`：观察池
- `<40`：放弃池

## 黑板回写建议

### `decision = go`

- `board_updates.state.project_status: topic_scored`
- `board_updates.state.next_stage: scene-reference-decider`
- `board_updates.state.lifecycle_flag: active`
- `board_updates.project_config.score`
- `board_updates.project_config.production_level`
- `board_updates.stage_index.topic`

### `decision = observe`

- `board_updates.state.project_status: topic_scored`
- `board_updates.state.next_stage` 留空
- `board_updates.state.lifecycle_flag: active`
- `board_updates.project_config.score`
- `board_updates.project_config.production_level` 留空
- `board_updates.stage_index.topic`

### `decision = drop`

- `board_updates.state.project_status: topic_scored`
- `board_updates.state.next_stage` 留空
- `board_updates.state.lifecycle_flag: abandoned`
- `board_updates.project_config.score`
- `board_updates.project_config.production_level` 留空
- `board_updates.stage_index.topic`

## source asset 约束

`scene-topic-gate` 可以根据 source intake 建议资产化候选，但不得自动创建：

```text
assets/source-materials/<source-slug>/
```

只能建议：

```yaml
assetization_recommendation:
  candidate_for_assetization: true | false | uncertain
  recommended_asset_status: proposed
```

资产化必须由用户明确确认后再执行。

## 剧本模式规则

本阶段产出 `decision = go` 后，不直接决定进入 `scene-reference-decider`。总控必须先确认：

```yaml
script_strategy:
  status: selected
  mode: rewrite_adaptation | preserve_original
```

`creative_direction_context` 规则：

- `rewrite_adaptation`：
  - 若项目来自视频源并准备继续推进，则必须先完成 adaptation idea 选择。
  - 进入 `scene-reference-decider` 后，`selected_adaptation.status` 只能为 `selected`。
- `preserve_original`：
  - `selected_adaptation.status = bypassed`
  - adaptation ideas 仅作参考，不得作为阻塞条件。

建议输出结构：

```yaml
script_strategy:
  status: pending | selected
  mode: rewrite_adaptation | preserve_original
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
  selected_adaptation:
    status: selected | bypassed | not_applicable
    selected_idea_id:
    selected_title:
    selection_note:
```
