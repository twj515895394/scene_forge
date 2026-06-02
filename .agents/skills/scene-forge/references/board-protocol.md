# SceneForge 黑板协议摘要

本文件给 `scene-forge` 总控 Skill 使用，作为读取和回写 `PROJECT_BOARD.md` 的最小协议摘要。

`PROJECT_BOARD.md` 是项目唯一状态源。黑板只保存顶层索引、跨阶段摘要、确认状态、文件路径和读取策略，不保存长正文。

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
reference_policy:
source_intake:
user_confirmations:
segment_strategy:
hero_moments:
bridge_shots:
prop_state_machines:
blocking_map:
faction_layout:
expressive_animation:
storyboard_director_v5:
created_at:
updated_at:
stage_patches:
```

## `context_policy`

```yaml
context_policy:
  mode: minimal
  allow_docs_scan: false
  active_protocol_docs: []
  allowed_runtime_asset_paths:
    - assets/animation-stylization/effect-library.md
    - assets/animation-stylization/contrast-comedy-library.md
    - assets/cinematic-language/shot-language-library.md
    - assets/cinematic-language/animation-film-shot-patterns.md
    - assets/cinematic-language/animation-comedy-action-patterns.md
  forbidden_runtime_paths:
    - docs/
    - .handoff/
    - 会话记录_*.md
    - 历史项目输出
    - 其他无关项目目录
  token_budget:
    default_stage_budget: compact
    require_reason_for_extra_reads: true
```

说明：

- `docs/` 只作为人类阅读的说明文档，不作为 Skill / Agent 阶段执行上下文。
- `.handoff/` 只用于人工交接和复盘，不作为阶段执行上下文。
- `assets/animation-stylization/*` 是 v4 执行期资产库，只能按需读取。
- `assets/cinematic-language/*` 是 v5 执行期资产库，主要供分镜和视频提示词阶段按需读取。
- `assets/source-materials/*` 不默认进入白名单；只有用户确认具体 source asset 后，才允许把具体文件路径加入白名单。

## `reference_policy`

```yaml
reference_policy:
  templates_are_reference_only: true
  examples_are_reference_only: true
  enums_are_open_by_default: true
  strict_enum_only_when_explicit: true
  allow_adapted_reference: true
  allow_custom_generated_option: true
  require_reason_for_custom_option: true
```

所有模板、示例、枚举、资产库 pattern 和 prompt fragment 都是参考锚点，不是封闭集合。除非字段明确写明 `strict_enum: true`，否则枚举默认开放。

推荐选择字段：

```yaml
selection_mode: reference | adapted_reference | custom_generated
source_reference:
reason:
```

## v6 字段：`source_intake`

`source_intake` 是 v6 新增顶层字段，用于记录视频源输入的结构化解析摘要、长解析文件索引、给选题闸门的 handoff、内容优先级分层和资产化候选状态。

默认结构：

```yaml
source_intake:
  type: video_clip | video_url | short_video_url | frame_sequence | other
  status: pending | analyzed | skipped | failed
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version:
  files:
    index: inputs/source_intake/source_intake_index_v1.md
    analysis: inputs/source_intake/source_video_analysis_v1.md
    timeline: inputs/source_intake/source_video_timeline_v1.md
    dialogue: inputs/source_intake/source_video_dialogue_v1.md
    audio: inputs/source_intake/source_video_audio_v1.md
    camera: inputs/source_intake/source_video_camera_v1.md
    priority_map: inputs/source_intake/source_video_priority_map_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode: direct_reference | adapted_reference | structure_only
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

### source_intake 保存规则

完整解析内容必须落盘，黑板只保存轻量索引：

```text
projects/<project>/inputs/source_intake/
  source_video_analysis_v1.md
  source_video_timeline_v1.md
  source_video_dialogue_v1.md
  source_video_audio_v1.md
  source_video_camera_v1.md
  source_video_priority_map_v1.md
  topic_gate_handoff_v1.md
  source_intake_index_v1.md
```

项目尚未创建时，先写入：

```text
projects/_intake/<timestamp-or-slug>/
```

不得把以下内容写入 `PROJECT_BOARD.md`：

```text
完整逐镜头表
完整台词表
完整长解析正文
完整音频细节表
```

### source_intake 读取规则

`scene-topic-gate` 默认读取：

```text
PROJECT_BOARD.md source_intake summary
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
```

必要时读取：

```text
inputs/source_intake/source_intake_index_v1.md
```

不默认读取完整：

```text
source_video_analysis_v1.md
source_video_timeline_v1.md
```

如果下游阶段需要深读，必须说明原因，并只读取相关章节。

### source asset 约束

`scene-video-intake` 和 `scene-topic-gate` 只能提出资产化候选，不得自动创建：

```text
assets/source-materials/<source-slug>/
```

只有用户明确确认资产化后，才允许创建长期 source asset，并更新：

```yaml
source_intake:
  assetization:
    asset_status: created
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode:
```

## v4 字段：`expressive_animation`

`expressive_animation` 用于记录动画风格化、轻中度卡通伤害尺度和反差喜剧策略。

```yaml
expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation | confirmed | disabled
  mode: animated_feature_comedy
  assets:
    effect_library: assets/animation-stylization/effect-library.md
    contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  animation_stylization:
    level: expressive
    preset: animated_feature_expressive
    effect_density: medium
    density_rule: hero_moment_and_high_risk_translation_only
  injury_tone_policy:
    visible_injury_level: minor_cartoon
    allow_minor_cartoon_injury: true
    allow_small_blood: selective
    allow_nosebleed_gag: true
    allow_bumps_bruises_dust: true
    allow_soot_face: true
    allow_torn_clothes: selective
    forbid_large_blood_loss: true
    forbid_graphic_wounds: true
    forbid_gore: true
    forbid_realistic_weapon_wound: true
    forbid_realistic_bullet_wound: true
    forbid_prolonged_pain_focus: true
    restore_character_integrity_after_gag: true
  contrast_comedy:
    enabled: selective
    contrast_density: low_to_medium
    max_core_contrasts_per_project: 2
    max_hero_contrast_per_segment: 1
```

新项目初始化时不得伪造确认，`confirmation_status` 默认为 `pending_design_confirmation`。

## v5 字段：`storyboard_director_v5`

`storyboard_director_v5` 用于记录专业分镜导演增强策略。

```yaml
storyboard_director_v5:
  enabled: true
  confirmation_status: pending_storyboard_plan_confirmation | confirmed | disabled
  assets:
    shot_language_library: assets/cinematic-language/shot-language-library.md
    animation_film_patterns: assets/cinematic-language/animation-film-shot-patterns.md
    animation_comedy_action_patterns: assets/cinematic-language/animation-comedy-action-patterns.md
  default_policy:
    require_storyboard_content_breakdown: true
    require_cinematic_language_plan: true
    require_visual_motivation: true
    avoid_template_stack: true
    require_pattern_reason: true
    do_not_reference_specific_films_in_runtime_output: true
```

新项目初始化时不得伪造确认，`confirmation_status` 默认为 `pending_storyboard_plan_confirmation`。

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

`project_status` 只表达主流程阶段，不混入异常态。

## 生命周期字段

- `active`
- `blocked`
- `skipped`
- `abandoned`
- `completed`

`blocker_note` 只在真实阻塞时填写。

## 阶段补丁壳

```yaml
patch_type:
version:
status: pending | in_progress | completed | blocked | skipped
updated_at:
summary:
data:
```

子 Skill 只输出单阶段补丁，不直接重写完整黑板。

## 确认闸门规则

涉及以下阶段时，默认必须先产出方案预览或候选方向，并等待用户明确确认后，才允许写入正式文件、输出最终 Prompt 或推进到下一阶段：

- `scene-script-adapter`：时长分段策略、剧本方案、Story Beat 方向、v4 表现力机会点
- `scene-design-builder`：角色方向、场景道具清单、视觉语言方向、参考强度、`expressive_animation` 表达策略
- `scene-storyboard-director`：分镜结构、Hero Shot、Bridge Shot、Segment Plan、Blocking Map、v4 表达镜头策略、v5 内容拆分与镜头语言方案
- `scene-video-prompt-builder`：分段提示词结构、参考图使用方案、连续性策略、v4 表达写入方案、v5 镜头语言继承方案

用户纠错、补充偏好、指出问题或提出比较方向，不等于授权落盘。只有用户明确表达“确认 / 采用 / 按这个生成 / 落盘 / 写入 / 继续执行该阶段”时，才能推进。

## 总控路由原则

1. 先看顶层 `project_status`、`next_stage`、`lifecycle_flag`。
2. 如果用户提供视频源输入，且尚未完成 `source_intake`，优先路由到 `scene-video-intake`。
3. 如果 `source_intake.status: analyzed` 且 `next_stage: scene-topic-gate`，由 `scene-topic-gate` 读取 handoff 和 priority map。
4. 只调度 `next_stage` 指向的一个当前必需子 Skill。
5. 合并阶段补丁后再更新顶层索引。
6. 若补丁与旧文档冲突，以当前 Skill 的 `references/` 协议为准，不读取 `docs/` 仲裁。
7. 用户说“继续”只能解释为执行当前 `next_stage`，不得一口气连跑多个阶段。

## 显示规范

- 对话层使用中文。
- `summary` 使用中文描述，必要时在关键值后附英文参数值。
- 结构化字段值始终保留英文参数值。
