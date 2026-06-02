# SceneForge 黑板协议摘要

本文件给 `scene-forge` 总控 Skill 使用，作为读取和回写 `PROJECT_BOARD.md` 的最小协议摘要。

## 顶层 YAML 字段

```yaml
project_name:
project_status:
next_stage:
lifecycle_flag:
blocker_note:
score:
production_level:
reference_type:
adaptation_level:
performance_style:
target_total_duration_seconds:
segment_duration_seconds:
context_policy:
user_confirmations:
segment_strategy:
hero_moments:
bridge_shots:
prop_state_machines:
blocking_map:
faction_layout:
created_at:
updated_at:
```

## v3 新增字段说明

```yaml
context_policy:
  mode: minimal
  allow_docs_scan: false
  active_protocol_docs: []
  forbidden_by_default:
    - docs/
    - .handoff/
    - 会话记录_*.md
    - 历史项目输出
  token_budget:
    default_stage_budget: compact
    require_reason_for_extra_reads: true

user_confirmations:
  duration_strategy_confirmed: false
  script_plan_confirmed: false
  design_direction_confirmed: false
  storyboard_plan_confirmed: false
  video_prompt_plan_confirmed: false

segment_strategy:
  target_total_duration_seconds:
  segment_duration_seconds:
  segment_count:
  segmentation_mode: fixed_10s
  confirmation_note:

hero_moments:
  - hero_id:
    title:
    reason:
    related_beat:
    related_shot:

bridge_shots:
  - bridge_id:
    from_segment:
    to_segment:
    purpose:
    continuity_in:
    continuity_out:

prop_state_machines:
  - prop_name:
    states:
      - state_id:
        description:
        visible_evidence:
        allowed_interaction:
        safety_boundary:

blocking_map:
  spatial_axis:
  zones:
    - zone_id:
      description:
      allowed_characters:
      forbidden_characters:
  continuity_rule:

faction_layout:
  factions:
    - faction_id:
      members:
      default_zone:
      forbidden_zones:
```

说明：

- `context_policy` 控制执行阶段读取边界和 Token 预算。
- `user_confirmations` 记录关键创作决策是否已经由用户确认。
- `segment_strategy` 记录整片目标时长、单段视频生成时长和分段策略。
- `hero_moments` 记录必须强化的看点镜头。
- `bridge_shots` 记录 Segment 之间的桥接分镜。
- `prop_state_machines` 记录核心道具状态变化，供分镜和视频提示词继承。
- `blocking_map` 与 `faction_layout` 记录角色站位、阵营和禁止区域，降低视频分段中的空间漂移。

## 主流程阶段

- `draft`
- `topic_scored`
- `reference_decided`
- `assets_checked`
- `design_ready`
- `script_ready`
- `performance_ready`
- `storyboard_ready`
- `audio_ready`
- `video_prompts_ready`
- `published`
- `reviewed`
- `archived`

## 生命周期字段

- `active`
- `blocked`
- `skipped`
- `abandoned`
- `completed`

说明：

- `project_status` 只表达主流程阶段
- `blocker_note` 只在真实阻塞时填写
- `next_stage` 显式保留，不完全依赖推导
- 总控只能执行 `next_stage` 指向的当前阶段，不得跳步或连跑多个阶段
- `performance_style` 由 `scene-script-adapter` 最终确认写入顶层
- `target_total_duration_seconds` 表示整条视频目标总时长
- `segment_duration_seconds` 表示单个视频生成片段时长，通常为 `10` 或 `15`，不得当作整片时长

## 阶段补丁壳

```yaml
patch_type:
version:
status:
updated_at:
summary:
data:
```

`status` 枚举：

- `pending`
- `in_progress`
- `completed`
- `blocked`
- `skipped`

## 确认闸门规则

涉及以下阶段时，默认必须先产出方案预览或候选方向，并等待用户明确确认后，才允许写入正式文件、输出最终 Prompt 或推进到下一阶段：

- `scene-script-adapter`：时长分段策略、剧本方案、Story Beat 方向
- `scene-design-builder`：角色方向、场景道具清单、视觉语言方向、参考强度
- `scene-storyboard-director`：分镜结构、Hero Shot、Bridge Shot、Segment Plan、Blocking Map
- `scene-video-prompt-builder`：分段提示词结构、参考图使用方案、连续性策略

用户纠错、补充偏好、指出问题或提出比较方向，不等于授权落盘。只有用户明确表达“确认 / 采用 / 按这个生成 / 落盘 / 写入 / 继续执行该阶段”时，才能推进。

## 上下文读取边界与 Token 预算

默认执行阶段采用：

```yaml
token_budget_level: compact
context_policy:
  mode: minimal
  allow_docs_scan: false
```

默认读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
当前阶段明确依赖的输入文件
```

默认不读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

如果需要超出默认读取范围，必须满足至少一个条件：

1. 用户明确要求分析、复盘、重构协议或读取相关文档。
2. `PROJECT_BOARD.md` 的 `context_policy.active_protocol_docs` 明确列出该文档。
3. 当前阶段无法用最小上下文完成，且回复中说明额外读取原因。

预算等级：

- `compact`：只读黑板、当前 Skill、当前输出协议和必要输入文件。
- `standard`：允许读取 1-3 个明确依赖文件。
- `deep`：仅用于复盘、协议改造、全链路分析或用户明确要求的深度读取。

## 显示规范

- 对话层使用中文
- `summary` 使用中文描述，必要时在关键值后附英文参数值
- 结构化字段值始终保留英文参数值

示例：

- 项目状态：选题已评分（`topic_scored`）
- 演绎风格：鬼畜离谱化（`absurd_chaotic`）

## 总控路由原则

1. 先看顶层 `project_status`、`next_stage`、`lifecycle_flag`
2. 再定位当前阶段分区补丁
3. 只调度 `next_stage` 指向的一个当前必需子 Skill
4. 合并阶段补丁后再更新顶层索引
5. 若补丁与旧文档冲突，以最新协议为准
