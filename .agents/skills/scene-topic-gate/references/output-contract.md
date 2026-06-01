# scene-topic-gate 输出协议

本文件定义 `scene-topic-gate` 的输出字段、评分规则和状态推进方式。

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
  rationale:
  risk_notes:
  reuse_hints:
  evaluator_rule_version:
```

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

## 摘要显示规则

- `summary` 必须用中文
- 关键决策、制作档位、演绎风格建议在中文后附英文参数值

示例：

- 该选题判断为进入制作（`go`），建议走夸张搞笑化（`exaggerated_comedy`）路线，进入重点制作池（`focus`）。

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

## 示例

```yaml
patch_type: scene-topic-gate
version: 1
status: completed
updated_at: 2026-06-01
summary: 该选题总分 86，判断为进入制作（`go`），建议走夸张搞笑化（`exaggerated_comedy`）路线，并进入重点制作池（`focus`）。
data:
  topic_name: 西游记三打白骨精
  source_material:
    source_type: specific_adaptation
    source_name: 86版西游记
    source_locator: 第10集相关桥段
    notes: 以大众共同记忆最强的版本作为首轮参考输入
  total_score: 86
  performance_style_suggestion: exaggerated_comedy
  production_level: focus
  decision: go
  dimension_scores:
    热点价值: 18
    动画化适配度: 19
    改编空间: 14
    经典认知锚点: 15
    风险可控性: 8
    制作成本可控性: 8
    平台传播潜力: 4
  rationale:
    - 国民级认知强，具备天然传播锚点
    - 人物冲突和动作戏适合动画化重演
  risk_notes:
    - 需区分原著母题与具体影视表达
  reuse_hints:
    - 孙悟空角色具备高复用潜力
  evaluator_rule_version: topic-gate-v1
```
