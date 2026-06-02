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
reference_policy:
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
```

## v3+ 顶层字段说明

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

reference_policy:
  templates_are_reference_only: true
  examples_are_reference_only: true
  enums_are_open_by_default: true
  strict_enum_only_when_explicit: true
  allow_adapted_reference: true
  allow_custom_generated_option: true
  require_reason_for_custom_option: true

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
- `reference_policy` 说明模板、示例、枚举和资产库 pattern 默认是参考锚点，不是封闭集合。
- `user_confirmations` 记录关键创作决策是否已经由用户确认。
- `segment_strategy` 记录整片目标时长、单段视频生成时长和分段策略。
- `hero_moments` 记录必须强化的看点镜头。
- `bridge_shots` 记录 Segment 之间的桥接分镜。
- `prop_state_machines` 记录核心道具状态变化，供分镜和视频提示词继承。
- `blocking_map` 与 `faction_layout` 记录角色站位、阵营和禁止区域，降低视频分段中的空间漂移。
- `expressive_animation` 记录 v4 动画电影级表现力扩展策略，供设计、剧本、表演、分镜、声音和视频提示词阶段继承。
- `storyboard_director_v5` 记录 v5 专业分镜导演增强策略，供分镜阶段与视频提示词阶段继承。

## 开放参考原则：`reference_policy`

`reference_policy` 是全局解释字段，用于说明 SOP 中的模板、示例、枚举、资产库 pattern 和 prompt fragment 如何被使用。

规则：

1. 模板用于提供结构，不用于限制创作。
2. 示例用于说明一种可能性，不代表必须照搬。
3. 除非字段明确写明 `strict_enum: true`，否则枚举默认开放。
4. 资产库 pattern 是可选参考，不是强制模板。
5. 如果没有合适参考项，Agent 应根据当前项目的剧情、角色、情绪、动作、镜头或声音功能生成更合适方案，并说明原因。

推荐选择字段：

```yaml
selection_mode: reference | adapted_reference | custom_generated
source_reference:
reason:
```

开放参考不改变确认闸门、运行时读取边界、阶段输出协议和安全边界。

## v4 表现力扩展字段：`expressive_animation`

`expressive_animation` 是 v4 新增顶层项目记忆字段，用于统一记录动画风格化、轻中度卡通伤害尺度和反差喜剧策略。

默认结构：

```yaml
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
```

字段说明：

- `enabled`：表示项目允许在确认后的边界内使用 v4 表现力扩展。模板默认 `true` 不等于自动强行使用强特效或反差喜剧。
- `confirmation_status`：项目级 v4 表现力策略确认状态，枚举为 `pending_design_confirmation`、`confirmed`、`disabled`。
- `animation_stylization`：动画电影级夸张物理、VFX、喜剧冲击和动作安全转译策略。
- `injury_tone_policy`：允许轻中度卡通受伤，禁止严重写实创伤。
- `contrast_comedy`：反差喜剧策略，例如体型反差、道具反差、性格反差、画面语境反差。
- `assets`：执行期允许按需读取的资产库路径。

使用规则：

1. 新项目初始化时 `confirmation_status` 默认为 `pending_design_confirmation`，不得伪造用户确认。
2. 设计阶段负责定义项目级默认值，并在用户确认后将 `confirmation_status` 改为 `confirmed`。
3. 如果用户明确不要 v4 表现力扩展，将 `enabled` 改为 `false`，并将 `confirmation_status` 改为 `disabled`。
4. 剧本阶段负责识别 Story Beat 机会点。
5. 表演阶段负责把机会点转成可拍表演。
6. 分镜阶段负责镜头化 setup / reveal / impact / hold / recovery。
7. 声音阶段负责卡通动作声、轻伤喜剧声和声音反差。
8. 视频提示词阶段负责写入最终 Segment Prompt。
9. 强特效、明显轻伤和核心反差母题必须服务 Hero Moment、情绪转折、喜剧 payoff 或安全转译，不能随机堆叠。

## v5 分镜导演增强字段：`storyboard_director_v5`

`storyboard_director_v5` 是 v5 新增顶层项目记忆字段，用于记录专业分镜导演增强策略。

默认结构：

```yaml
storyboard_director_v5:
  enabled: true
  confirmation_status: pending_storyboard_plan_confirmation
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

字段说明：

- `enabled`：表示项目允许在分镜阶段使用 v5 专业分镜导演能力。
- `confirmation_status`：分镜方案确认状态，枚举为 `pending_storyboard_plan_confirmation`、`confirmed`、`disabled`。
- `assets`：执行期允许 `scene-storyboard-director` 按需读取的镜头语言资产库路径。
- `default_policy.require_storyboard_content_breakdown`：分镜阶段必须先把 Story Beat 拆成可拍内容单元。
- `default_policy.require_cinematic_language_plan`：分镜阶段必须把内容单元转成专业镜头语言。
- `default_policy.require_visual_motivation`：关键镜头必须说明为什么这样拍。
- `default_policy.avoid_template_stack`：避免每个镜头都机械套 pattern。
- `default_policy.require_pattern_reason`：使用资产库 pattern 时必须说明原因。
- `default_policy.do_not_reference_specific_films_in_runtime_output`：运行时输出不得写“模仿某电影镜头”。

使用规则：

1. 新项目初始化时 `confirmation_status` 默认为 `pending_storyboard_plan_confirmation`，不得伪造用户确认。
2. 分镜阶段负责输出 v5 分镜方案预览，并在用户确认后将 `confirmation_status` 改为 `confirmed`。
3. 如果用户明确不要 v5 分镜增强，将 `enabled` 改为 `false`，并将 `confirmation_status` 改为 `disabled`。
4. v5 回答“这个内容应该怎么拍”，不替代 v4 的动画表现力策略。
5. 分镜阶段可按需读取 `assets/cinematic-language/*`，但不得全仓库扫描。

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

- `scene-script-adapter`：时长分段策略、剧本方案、Story Beat 方向、v4 表现力机会点
- `scene-design-builder`：角色方向、场景道具清单、视觉语言方向、参考强度、`expressive_animation` 表达策略
- `scene-storyboard-director`：分镜结构、Hero Shot、Bridge Shot、Segment Plan、Blocking Map、v4 表达镜头策略、v5 内容拆分与镜头语言方案
- `scene-video-prompt-builder`：分段提示词结构、参考图使用方案、连续性策略、v4 表达写入方案、v5 镜头语言继承方案

用户纠错、补充偏好、指出问题或提出比较方向，不等于授权落盘。只有用户明确表达“确认 / 采用 / 按这个生成 / 落盘 / 写入 / 继续执行该阶段”时，才能推进。

## 上下文读取边界与 Token 预算

默认执行阶段采用：

```yaml
token_budget_level: compact
context_policy:
  mode: minimal
  allow_docs_scan: false
  allowed_runtime_asset_paths:
    - assets/animation-stylization/effect-library.md
    - assets/animation-stylization/contrast-comedy-library.md
    - assets/cinematic-language/shot-language-library.md
    - assets/cinematic-language/animation-film-shot-patterns.md
    - assets/cinematic-language/animation-comedy-action-patterns.md
```

默认读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
当前阶段明确依赖的输入文件
```

按需允许读取的执行期资产：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

读取条件：

- 当前阶段需要选择动画物理、VFX、轻中度卡通伤害尺度、反差喜剧模板、镜头语言或分镜 pattern。
- `PROJECT_BOARD.md` 中对应扩展字段 `enabled` 为 `true`，或当前阶段正在定义该字段。
- 读取目的必须服务当前阶段输出，不得全仓库扫描。

运行时禁止任何 Skill 或 Agent 访问：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

说明：

- `docs/` 只作为人类阅读的说明文档，不作为任何 Skill 或 Agent 的运行时上下文来源。
- `.handoff/` 只用于人工交接和复盘，不作为阶段执行上下文来源。
- `assets/animation-stylization/*` 是 v4 明确允许的执行期资产库，但只能按需读取。
- `assets/cinematic-language/*` 是 v5 明确允许的执行期资产库，但主要供分镜与视频提示词阶段按需读取。
- 即使用户要求“看 docs / 读 docs / 扫文档”，SceneForge 执行链路也不得读取 `docs/` 来推进项目。
- 如果需要修改协议，应直接修改 `.agents/skills/**/SKILL.md` 或 `.agents/skills/**/references/*.md`；`docs/` 不参与运行时仲裁。

预算等级：

- `compact`：只读黑板、当前 Skill、当前输出协议和必要输入文件；如当前阶段需要扩展能力，可按需读取 1 个明确 asset。
- `standard`：允许读取 1-3 个明确依赖文件和必要 asset，但不得包含 forbidden runtime paths。
- `deep`：仅用于人工复盘或协议改造说明，不用于项目阶段执行；即使 deep，也不得读取 forbidden runtime paths 作为 Skill 上下文。

## 显示规范

- 对话层使用中文
- `summary` 使用中文描述，必要时在关键值后附英文参数值
- 结构化字段值始终保留英文参数值

示例：

- 项目状态：选题已评分（`topic_scored`）
- 演绎风格：鬼畜离谱化（`absurd_chaotic`）
- 表现力扩展：动画电影喜剧（`animated_feature_comedy`）
- 分镜增强：专业分镜导演（`storyboard_director_v5`）

## 总控路由原则

1. 先看顶层 `project_status`、`next_stage`、`lifecycle_flag`
2. 再定位当前阶段分区补丁
3. 只调度 `next_stage` 指向的一个当前必需子 Skill
4. 合并阶段补丁后再更新顶层索引
5. 若补丁与旧文档冲突，以当前 Skill 的 `references/` 协议为准，不读取 `docs/` 仲裁
6. 若项目启用 `expressive_animation`，总控只负责传递顶层字段和允许当前 Skill 按需读取 asset；不得代替子 Skill 设计具体镜头、表演或 prompt
7. 若项目启用 `storyboard_director_v5`，总控只负责传递顶层字段和允许分镜 / 视频提示词阶段按需读取 cinematic-language asset；不得代替分镜导演生成具体镜头语言
