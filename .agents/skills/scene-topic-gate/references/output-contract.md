# scene-topic-gate 输出协议

本文件定义 `scene-topic-gate` 的输出字段、评分规则、source intake 读取记录和状态推进方式。

## 阶段补丁壳

```yaml
patch_type: scene-topic-gate
version: 1
status:
updated_at:
summary:
data:
```

## `data` 结构

```yaml
data:
  topic_name:
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

- 这是选题阶段的建议值，不直接写入顶层 `performance_style`
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

## 顶层状态推进

### `decision = go`

- `project_status: topic_scored`
- `next_stage: scene-reference-decider`
- 顶层写入 `score`
- 顶层写入 `production_level`
- `lifecycle_flag: active`

### `decision = observe`

- `project_status: topic_scored`
- `next_stage` 留空
- 顶层写入 `score`
- `production_level` 留空
- `lifecycle_flag: active`

### `decision = drop`

- `project_status: topic_scored`
- `next_stage` 留空
- 顶层写入 `score`
- `production_level` 留空
- `lifecycle_flag: abandoned`

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
