# PROJECT_BOARD.md 初始化模板

本文件给 `scene-forge` 总控 Skill 使用，作为新建 `projects/<project>/PROJECT_BOARD.md` 时的默认模板。

模板原则：

1. `PROJECT_BOARD.md` 是项目唯一状态源。
2. 黑板只保存顶层索引、跨阶段摘要、确认状态和文件路径，不塞长正文。
3. 运行时仍禁止读取 `docs/`、`.handoff/`、历史项目输出和其他无关项目目录。
4. v4 起，默认包含 `expressive_animation`，但具体启用强度必须在 `scene-design-builder` 阶段预览并由用户确认。

---

## 默认模板

```yaml
project_name:
project_status: draft
next_stage: scene-topic-gate
lifecycle_flag: active
blocker_note:

score:
production_level:
reference_type:
adaptation_level:
performance_style:

target_total_duration_seconds:
segment_duration_seconds:

context_policy:
  mode: minimal
  allow_docs_scan: false
  active_protocol_docs: []
  allowed_runtime_asset_paths:
    - assets/animation-stylization/effect-library.md
    - assets/animation-stylization/contrast-comedy-library.md
  forbidden_runtime_paths:
    - docs/
    - .handoff/
    - 会话记录_*.md
    - 历史项目输出
    - 其他无关项目目录
  token_budget:
    default_stage_budget: compact
    require_reason_for_extra_reads: true

user_confirmations:
  duration_strategy_confirmed: false
  script_plan_confirmed: false
  design_direction_confirmed: false
  expressive_animation_confirmed: false
  storyboard_plan_confirmed: false
  video_prompt_plan_confirmed: false

segment_strategy:
  target_total_duration_seconds:
  segment_duration_seconds:
  segment_count:
  segmentation_mode: fixed_10s
  confirmation_note:

hero_moments: []
bridge_shots: []
prop_state_machines: []

blocking_map:
  spatial_axis:
  zones: []
  continuity_rule:

faction_layout:
  factions: []

expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation
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
    allowed_contrast_types:
      - size_mismatch
      - prop_scale_irony
      - personality_gap
      - identity_behavior_gap
      - visual_context_gap
      - capability_gap
    avoid_when:
      - serious_emotional_scene
      - repeated_same_gag
      - climax_tension_without_release
    contrast_must_serve:
      - character
      - story
      - emotional_turn
      - visual_payoff

created_at:
updated_at:

stage_patches: {}
```

---

## 字段使用说明

### `expressive_animation.confirmation_status`

```yaml
confirmation_status: pending_design_confirmation | confirmed | disabled
```

含义：

- `pending_design_confirmation`：模板默认值。表示项目可使用 v4 表现力扩展，但具体强度仍需设计阶段预览并由用户确认。
- `confirmed`：用户已在设计方向确认中接受项目级 v4 表现力策略。
- `disabled`：用户明确要求不使用动画物理、轻伤尺度或反差喜剧扩展。

### `enabled: true` 的含义

模板默认 `enabled: true` 不代表自动强行使用强特效或反差喜剧。

它只表示：

```text
本项目允许后续阶段在确认后的边界内使用 v4 表现力扩展。
```

实际执行仍必须遵守：

1. `scene-design-builder` 先输出设计方向预览。
2. 用户确认后才能把 `confirmation_status` 改为 `confirmed`。
3. 后续阶段只能在当前项目已确认的范围内继承。
4. 反差喜剧和强特效不能每个镜头乱用。

### `allowed_runtime_asset_paths`

该字段只允许以下执行期资产：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

它不改变 `docs/` 与 `.handoff/` 的禁止读取规则。

---

## 新项目初始化建议

新建项目时，总控应：

1. 复制本模板到：

```text
projects/<project>/PROJECT_BOARD.md
```

2. 写入：

```yaml
project_name:
created_at:
updated_at:
```

3. 根据当前阶段写入：

```yaml
project_status: draft
next_stage: scene-topic-gate
lifecycle_flag: active
```

4. 不要在初始化时伪造用户确认。

即：

```yaml
user_confirmations:
  expressive_animation_confirmed: false
expressive_animation:
  confirmation_status: pending_design_confirmation
```

---

## 后续阶段写入规则

### scene-design-builder

确认设计方向后，可写入：

```yaml
user_confirmations:
  design_direction_confirmed: true
  expressive_animation_confirmed: true
expressive_animation:
  confirmation_status: confirmed
```

如果用户明确不要 v4 表现力扩展：

```yaml
user_confirmations:
  expressive_animation_confirmed: true
expressive_animation:
  enabled: false
  confirmation_status: disabled
```

### scene-script-adapter 及后续阶段

后续阶段只能继承已确认策略，并在自己的阶段补丁中写摘要，不应重写整个 `expressive_animation` 顶层字段，除非用户明确调整项目级策略。
