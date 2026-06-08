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
  director_style_candidates:
    - director_style_id:
      director_style_version:
      style_family:
      style_profile_path:
      display_name:
      maturity:
      maturity_label:
      selectable_status:
      recommendation_rank:
      recommendation_confidence:
      reason:
      difference_note:
  director_style_suggestion:
    director_style_id:
    director_style_version:
    style_family:
    style_profile_path:
    recommendation_confidence:
    reason:
  style_family_confirmation:
    confirmation_status:
    confirmed_style_family:
    confirmation_note:
  style_confirmation:
    confirmation_status:
    confirmed_director_style_id:
    confirmed_director_style_version:
    confirmed_style_family:
    confirmed_style_profile_path:
    confirmation_note:
  style_selection_note:
  production_level:
  decision:
  style_family_candidates:
    - style_family:
      style_family_label:
      recommendation_rank:
      recommendation_confidence:
      reason:
  dimension_scores:
    热点价值:
    风格转译适配度:
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

兼容读取规则：

- 新产物必须使用 `dimension_scores.风格转译适配度`
- 读取历史 `PROJECT_BOARD.md`、旧 `topic_gate_output_v*.md` 或其他旧 topic 产物时，若只存在 `dimension_scores.动画化适配度`，应将其视为 `风格转译适配度` 的 legacy alias
- 新旧字段同时存在时，以 `风格转译适配度` 为准，不得反向回写旧字段
- 本轮兼容只作用于读取语义，不要求批量改写历史项目正文

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

风格候选池默认读取：

```text
style_profiles/style_registry.md
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

`style_family_candidates`：

- 用于先给出风格大类层面的判断，而不是直接把项目默认压进动画家族
- 当前候选应从以下六类中选择高相关项：
  - `3d_animation`
  - `2d_animation`
  - `live_action_cinematic`
  - `stop_motion`
  - `motion_comic`
  - `hybrid`
- 每个候选应包含：
  - `style_family`
  - `style_family_label`
  - `recommendation_rank`
  - `recommendation_confidence`
  - `reason`
- `style_family_candidates` 先独立排序，再决定具体风格包排序；不得先算全局风格包最优，再倒推出家族
- `recommendation_rank = 1` 的 `style_family` 视为当前首选家族；若用户尚未手动改家族，后续具体风格包排序必须以它为主
- `style_family_confirmation` 用于记录风格大类是否已经被用户正式确认；在协议层它是 `director_style_id` 确认前的第一闸门
- `director_style_candidates` 的推荐顺序必须与首选 `style_family` 保持一致，不得先默认动画家族再硬套具体风格包

`director_style_suggestion`：

- 建议值必须优先从与首选 `style_family` 一致的候选中选择，不得默认偏向 `3d_animation`
- 这是选题阶段的建议入口；若用户在本阶段明确确认，则应直接写入 `project_config.director_style_id`
- 第一版正式 `director_style_id` 确认点前移到 `scene-topic-gate`
- `style_profile_path` 只写风格包索引路径，例如 `style_profiles/pixar_like/profile.md`
- `director_style_suggestion` 必须与首选 `style_family` 保持一致；不得把真人电影感、动态漫画或混合形态题材先默认翻译成动画包
- 若“全局最相关风格包”和“首选家族内最相关风格包”不一致，必须优先服从首选 `style_family`，不得跨家族抢占建议位
- `director_style_suggestion` 的 tie-break 顺序固定为：
  1. 先取当前首选或已确认 `style_family`
  2. 再在该家族内部按 `recommendation_rank` 选择第 1 名
  3. 若同家族内分数接近，则优先 `maturity` 更高者，再优先 `selectable_status` 更强者

`director_style_candidates`：

- 用于面向用户展示本阶段可选的导演风格包候选列表，而不是只暴露单个推荐值
- 运行时默认从 `style_profiles/style_registry.md` 构造候选池，而不是扫描全部 `style_profiles/*` 目录
- 当前版本应覆盖风格总表中的全部 `director_style_id`
- 展示层按成熟度分为：
  - `Phase 1`
  - `Phase 2`
  - `Exploration Pool`
- 推荐展示数量仍建议控制在 `2` 到 `6` 个高相关候选，但完整候选池可以在详细视图中展开
- 每个候选应包含：
  - `display_name`：用户可见名称，使用“中文描述（English Term）”
  - `maturity`：`Phase 1 | Phase 2 | Exploration Pool`
  - `maturity_label`：用户可见成熟度说明，例如“第一阶段优先（Phase 1）”或“探索候选（Exploration Pool）”
  - `selectable_status`：
    - `recommended`
    - `supported`
    - `experimental`
  - `recommendation_rank`：`1` 表示最推荐
  - `reason`：推荐原因
  - `difference_note`：该候选与其他主要候选的关键差异
- `director_style_candidates` 的默认排序范围应先收敛到首选 `style_family`；跨家族候选可以展示在扩展列表中，但不得覆盖默认建议位
- `director_style_suggestion` 必须来自当前首选 `style_family` 子列表中的首选项，而不是独立漂浮字段
- `Phase 1` 与 `Phase 2` 默认标记为 `supported`
- `Exploration Pool` 默认标记为 `experimental`，但仍允许用户显式选择；摘要必须明确说明这是实验候选，当前资料深度和验证程度低于正式风格包
- 只有在用户确认具体 `director_style_id` 后，后续阶段才允许读取 `project_config.style_profile_path` 和当前阶段必需的 `required_profile_files`

当前总候选池应至少覆盖以下全部风格包：

`Phase 1`

- `pixar_like`
- `dreamworks_like`
- `stylized_chinese_3d`
- `comic_action_3d`

`Phase 2`

- `coming_of_age_3d`
- `realist_cinematic_3d`
- `mythic_epic_3d`
- `anime_cinematic`
- `poetic_2d_fantasy`
- `urban_graphic_2d`
- `classic_studio_wuxia`
- `neo_wuxia_cinematic`
- `noir_detective`
- `handcrafted_whimsy_stop_motion`
- `heroic_motion_comic`

`Exploration Pool`

- `dark_fable_3d`
- `retro_toybox_3d`
- `dreamy_shoujo_2d`
- `wild_comedy_2d`
- `ink_poetic_2d`
- `hk_underworld_cinematic`
- `social_realist_tension`
- `warm_humanist_cinematic`
- `gothic_fairy_stop_motion`
- `retro_mechanical_stop_motion`
- `suspense_monochrome_motion_comic`
- `social_fastcut_motion_comic`
- `two_d_character_three_d_world`
- `live_action_animation_hybrid`
- `docu_comic_hybrid`

`style_confirmation`：

- `confirmation_status`：
  - `pending`
  - `confirmed`
  - `rejected`
- `style_family_confirmation.confirmation_status` 与 `style_confirmation.confirmation_status` 不是同义字段：
  - 前者用于确认风格大类
  - 后者用于确认具体导演风格包
- 正常流程下应先确认 `style_family`，再确认 `director_style_id`；如果用户一次性确认了两层，可在同一轮同时写回
- 当用户已明确确认风格大类时，本阶段必须同步回写：
  - `project_config.style_family`
  - `confirmations.style_family_confirmed.status = confirmed`
- 当用户已明确确认导演风格包时，本阶段必须同步回写：
  - `project_config.director_style_id`
  - `project_config.director_style_version`
  - `project_config.style_family`
  - `project_config.style_profile_path`
  - `confirmations.style_family_confirmed.status = confirmed`
  - `confirmations.style_confirmed.status = confirmed`
- 若用户尚未确认风格大类，`style_family_confirmation.confirmation_status = pending`，不得把具体风格包伪装成已确认
- 若用户尚未确认导演风格包，`style_confirmation.confirmation_status = pending`，不得推进到依赖风格的下游设计阶段

除非字段明确写明 `strict_enum: true`，否则枚举仍遵守 `reference_policy` 的开放参考原则。

## 摘要显示规则

- `summary` 必须用中文
- 关键决策、制作档位、演绎风格建议和导演风格建议都应使用“中文描述（English Term）”格式
- 若 `decision = go`，摘要应先暴露首选 `style_family`，再暴露导演风格包推荐项
- 若已给出多个候选，摘要应明确写出“推荐项 + 其余可选项”
- 若候选中包含 `Exploration Pool`，摘要必须显式标记其为“探索候选（Exploration Pool）”
- 若导演风格包尚未确认，摘要必须明确写出“等待风格确认”
- 若使用 source intake，应在摘要中说明“已基于源视频 handoff 和优先级分层完成评估”

## 七维评分权重

| 维度 | 权重 |
|---|---:|
| 热点价值 | 25 |
| 风格转译适配度 | 20 |
| 改编空间 | 15 |
| 经典认知锚点 | 15 |
| 风险可控性 | 10 |
| 制作成本可控性 | 10 |
| 平台传播潜力 | 5 |

## 历史字段兼容

- 当前标准字段名为 `风格转译适配度`
- 历史字段名 `动画化适配度` 在读取时视为等价别名
- 面向用户的摘要、前台展示、索引刷新和后续新产物写回，应统一使用 `风格转译适配度`

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
- 若风格已确认：`board_updates.state.next_stage: scene-reference-decider`
- 若风格未确认：`board_updates.state.next_stage: scene-topic-gate`
- `board_updates.state.lifecycle_flag: active`
- `board_updates.project_config.score`
- `board_updates.project_config.production_level`
- `board_updates.stage_index.topic`
- `director_style_candidates` 与 `director_style_suggestion` 保留在本阶段正文与摘要中，供前台选择器或确认 UI 使用
- `director_style_suggestion` 保留在本阶段正文与摘要中
- 只有用户已明确确认时，才回写 `project_config.director_style_id` 等正式风格字段

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
