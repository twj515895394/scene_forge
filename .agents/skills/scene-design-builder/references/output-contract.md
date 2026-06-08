# scene-design-builder 输出协议

本文件定义 `scene-design-builder` 的输出形态、设定图 prompt 包、空间站位图、全场景资产总参考图、空间连续性种子、道具状态机、Blocking/Faction 记忆字段、表现力扩展设计和长内容落盘边界。

## 上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`、`creative_direction_context`
- `scene-story-development`：`story_beats`、`character_functions`、`core_scene_functions`、`key_prop_functions`、`hero_moment_candidates`
- `scene-asset-checker`：`character_assets`、`scene_assets`、`prop_assets`、`design_actions`、`asset_lock_file`、`asset_lock_summary`
- 项目配置索引：`project_config.production_level`、`project_config.director_style_id`、`project_config.director_style_version`、`project_config.style_family`、`project_config.style_profile_path`、`project_config.performance_style`、`confirmations.style_family_confirmed.status`、`confirmations.style_confirmed.status`（未确认风格家族或导演风格包时不得直接进入正式设计；若为历史项目且四个风格字段齐全，可按 `legacy confirmed` 兼容）
- 风格包输入（若项目已确认导演风格包则按需读取）：
  - `style_profiles/<director_style_id>/profile.md`
  - `style_profiles/<director_style_id>/visual_language.md`
  - `style_profiles/<director_style_id>/lighting_language.md`
- 黑板与阶段索引：`runtime_policy.context_policy`、`confirmations`、既有阶段产物中的 `blocking_map` / `faction_layout` / `prop_state_machines`、既有表现力扩展摘要（如有）
- 表现力扩展资产库（仅在需要定义表现力扩展策略时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`

## 设计输出路径

根据制作档位选择输出形态：

- `focus`：完整角色锁定卡 + 完整场景锁定卡 + 关键道具锁定卡 + 设定图 prompt 包 + 全场景资产总参考图 prompt
- `fast`：轻量角色锁定卡 + 轻量场景锁定卡 + 核心道具摘要 + 最小可用设定图 prompt 包 + 简版全场景资产总参考图 prompt

## 参考强度

- `high_anchor`
- `medium_anchor`
- `low_anchor_originalized`

## 确认闸门

本阶段默认不能直接落盘正式设定和 prompt。必须先输出设计方向预览，并等待用户确认。

设计方向预览至少包含：

- 角色方向候选
- 场景与关键道具清单
- 统一视觉语言基线
- 角色/场景/道具参考强度
- 是否需要全场景资产总参考图
- 初版 `blocking_map` / `faction_layout` 设计原则
- 核心道具是否需要 `prop_state_machines`
- `expressive_animation` 项目级策略：仅在当前 `style_family` 允许时展示其风格化档位、轻中度卡通伤害尺度和反差喜剧启用密度；不适配家族应明确写关闭或局部启用
- 当前已确认的导演风格包（Director Style Package）
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

## 阶段补丁壳

```yaml
patch_type: scene-design-builder
stage: scene-design-builder
version: 8
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
  design_mode:
  style_profile:
    confirmation_status:
    director_style_id:
    director_style_version:
    style_family:
    style_profile_path:
    used_default_fallback: false
    fallback_note:
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
  design_confirmation:
    confirmed_by_user: false
    confirmation_note:
  story_design_mapping:
    beat_to_design_targets:
      - beat_id:
        related_characters:
        related_scenes:
        related_props:
  visual_language:
    shape_language_core:
    silhouette_anchors:
    proportion_strategy:
    material_strategy:
    color_script:
    environment_stylization:
    prop_exaggeration_rule:
  expressive_animation_design:
    enabled: true
    mode: animated_feature_comedy
    asset_references:
      effect_library: assets/animation-stylization/effect-library.md
      contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
    animation_stylization:
      level: expressive
      preset: animated_feature_expressive
      effect_density: medium
      density_rule: hero_moment_and_high_risk_translation_only
      allowed_physics:
        - squash_stretch
        - elastic_rebound
        - smear_motion
      selective_physics:
        - impact_flattening
        - wall_splat
        - paper_flatten
      forbidden_physics:
        - body_horror_deformation
        - realistic_injury_deformation
    injury_tone_policy:
      visible_injury_level: minor_cartoon
      allowed_minor_injuries:
        - dust_face
        - bump_on_head
        - small_scratch
        - nosebleed_gag
        - soot_face
      forbidden_injuries:
        - large_blood_loss
        - graphic_wounds
        - gore
        - realistic_weapon_wound
        - realistic_bullet_wound
        - prolonged_pain_focus
      restore_character_integrity_after_gag: true
    contrast_comedy:
      enabled: selective
      contrast_density: low_to_medium
      core_contrast_types:
        - size_mismatch
        - prop_scale_irony
        - personality_gap
      max_core_contrasts_per_project: 2
      max_hero_contrast_per_segment: 1
      tonal_boundary:
        preserve_character_consistency: true
        contrast_must_serve_story_or_character: true
        avoid_random_meme_stack: true
    design_notes_for_downstream:
      script_adapter:
      performance_director:
      storyboard_director:
      video_prompt_builder:
  character_designs:
    - name:
      baseline_version:
      reference_strength:
      asset_strategy:
      lock_card_file:
      character_bible_file:
      prompt_file:
      prompt_target: character_bible_sheet
      sheet_requirements:
        views:
        silhouette_required:
        expression_count:
        micro_expression_count:
        action_pose_count:
        prop_interaction_required:
        detail_callout_required:
        scale_comparison_required:
        safety_boundary_required:
      downstream_revision_policy:
        minor_revision_allowed: true
        major_revision_requires_confirmation: true
        revision_request_file:
  scene_designs:
    - name:
      reference_strength:
      asset_strategy:
      lock_card_file:
      prompt_file:
  prop_designs:
    - name:
      asset_strategy:
      lock_card_file:
      prompt_file:
      state_machine_id:
  space_blocking_reference:
    enabled:
    prompt_file:
    target_view: top_down | semi_top_down
    includes:
      - spatial_axis
      - default_character_positions
      - key_prop_positions
      - entrance_exit_paths
      - allowed_move_zones
      - forbidden_zones
      - camera_facing_reference
      - relative_distance_notes
  master_scene_prop_reference:
    enabled:
    prompt_file:
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
      - physical_safety_notes
      - expressive_animation_notes
  space_continuity_seed:
    seed_file:
    anchor_spaces:
    recurring_landmarks:
    entrance_exit_logic:
    axis_preservation_note:
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
  visual_consistency:
    character_anchor_note:
    scene_anchor_note:
    material_anchor_note:
    blocking_anchor_note:
    prop_state_anchor_note:
    expressive_animation_anchor_note:
  script_adaptation_notes:
  next_action:
```

## 字段说明

- `design_mode`：本次走完整设定还是轻量锁定，建议直接复用`project_config.production_level` 的语义。
- `script_strategy`：本次项目是改写剧本还是使用原始剧本。
- `creative_direction_context`：统一记录当前创作方向；设计阶段不得自行推断或改写。
- `design_confirmation`：记录用户是否确认设计方向。正式落盘时应为 `confirmed_by_user: true`。
- `story_design_mapping`：说明哪些角色、场景和道具分别服务哪些 Story Beat，防止设计脱离剧情功能。
- `visual_language`：本次项目的统一视觉语言基线，角色、场景、核心道具都必须继承这组约束。
- `expressive_animation_design`：表现力扩展设计，属于按 `style_family` 条件启用的扩展层，而不是默认项目框架；可定义项目级风格化动作、轻中度卡通伤害尺度和反差喜剧策略。正式落盘后应同步更新 `stage_index.design` 摘要与相关文件索引。
- `animation_stylization`：动画物理、VFX、特效密度和高风险动作转译策略。设计阶段只定义允许范围，不写具体镜头。
- `injury_tone_policy`：动画动作喜剧伤害尺度，允许轻中度卡通伤害，禁止严重写实创伤。
- `contrast_comedy`：反差喜剧策略，定义是否启用、核心反差类型、密度规则和调性边界。
- `design_notes_for_downstream`：把表现力扩展策略交给后续剧本、表演、分镜和视频提示词阶段继承。
- `character_designs`：角色级锁定卡、角色说明书和图片生成 prompt 路径。
- `character_designs.baseline_version`：当前角色设计基线版本。下游阶段默认继承这个版本，不得静默改写。
- `character_bible_file`：单角色角色说明书正文，默认写入 `details/角色说明书_角色名_v*.md`。
- `character_bible_file` 同时也是角色说明书图片最终提示词的最高规范源；最终提示词允许按生成需要重组，但不得比该正文更弱、更短或更失真。
- `prompt_file`：默认应是可直接复制使用的完整终稿，不是摘要壳；至少覆盖角色说明书中的身份、外形、材质、服装、配件、表情系统、动作姿态、版式要求、文字信息区、关键道具交互和边界约束。
- `prompt_target`：默认应为 `character_bible_sheet`，表示目标不是概念海报，而是角色说明书板。
- `sheet_requirements`：角色说明书板结构要求；默认允许并应保留板块标题、编号、角色名称和基础身份信息区。只有用户明确要求时，才额外派生无文字版本。
- `downstream_revision_policy`：下游阶段对角色设计的反馈与回修规则。补充型、功能型、连续性型问题允许形成增量版本；大改动必须回到设计确认。
- `scene_designs`：场景级锁定卡与设定图 prompt 路径。
- `prop_designs`：关键道具锁定卡与 prompt 路径；仅对核心道具使用。
- `space_blocking_reference`：空间站位图提示词，目标是生成一张给后续分镜和视频模型继承的站位参考图。它不是氛围图，而是空间控制图。
- `space_blocking_reference.target_view`：优先使用 `top_down` 或 `semi_top_down`，让模型更稳定理解“谁在左、谁在右、谁在前、谁在后、道具在哪、入口出口在哪”。
- `space_blocking_reference.includes`：至少覆盖空间轴线、角色默认站位、核心道具位置、进入/离开路径、允许移动区、禁止区、镜头朝向参考和相对距离说明。
- `master_scene_prop_reference`：全场景资产总参考图，用于在参考图数量有限时把主场景、角色站位、核心道具位置和道具状态压缩为一个总参考 prompt。
- `space_continuity_seed`：写入 `details/design/space_continuity_seed_v*.md` 的空间连续性种子，供剧本、分镜和视频提示词阶段继承。
- `prop_state_machines`：核心道具状态机，供剧本、分镜和视频提示词继承。
- `blocking_map`：通用空间调度图，记录空间轴线、区域、允许/禁止角色。
- `faction_layout`：通用阵营布局，记录角色属于哪个阵营、默认区域和禁止区域。
- `visual_consistency`：供后续分镜和视频提示词继承的一致性锚点。
- `script_adaptation_notes`：剧本阶段需要继承的视觉、动作、站位、道具与表现力扩展约束。
- `next_action`：下一阶段执行提示。

### `space_continuity_seed` 字段口径

- `seed_file`：空间连续性种子正文路径。
- `anchor_spaces`：后续分镜和视频提示词必须保持可识别的空间锚点。
- `recurring_landmarks`：跨段重复出现的地标、空间部件或构图识别物。
- `entrance_exit_logic`：角色与镜头默认的进入 / 离开空间逻辑。
- `axis_preservation_note`：后续镜头语言需要优先保留的朝向或轴线边界。

## 创作方向继承规则

设计阶段必须显式继承：

```yaml
script_strategy:
  mode: rewrite_adaptation | preserve_original
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
  selected_adaptation:
    status: selected | bypassed | not_applicable
```

规则：

- `rewrite_adaptation`：角色、场景、道具和视觉语言应围绕已选 adaptation direction 服务。
- `preserve_original`：角色、场景、道具和视觉语言应围绕原始剧情/桥段保留，不得再发散新的改写方向。

## 表现力扩展设计原则

设计阶段只回答：

```text
本项目允许什么表达策略？
不允许什么表达策略？
哪些表达要留给后续阶段具体化？
```

设计阶段不要直接写完整动作镜头，但必须给出边界：

1. 本项目默认动画风格化档位：`grounded` / `expressive` / `comedic_push` / `wild_cartoon`。
2. 是否允许贴墙、纸片化、夸张回弹、星星眩晕等强卡通效果。
3. 是否允许轻中度卡通伤害，例如灰头土脸、头包、小擦伤、鼻血笑点。
4. 哪些写实伤害和血腥表达禁止。
5. 是否启用反差喜剧，以及最多使用几个核心反差母题。
6. 反差喜剧必须服务人物、故事、情绪转折或视觉 payoff。

## 角色说明书要求

角色说明书板默认允许包含文字、编号和板块标题，因为它是制作资料板和多图参考输入，不是最终视频画面。

每个核心角色默认应包含：

- 正面 / 3/4 / 侧面 / 背面
- 轮廓剪影区
- 6 到 9 个剧本驱动表情
- 2 到 4 个微表情
- 4 到 6 个剧情动作姿态
- 至少 1 个关键道具交互姿态（如适用）
- 至少 1 组服装、配件或手部细节区
- 角色之间的比例对照
- 物理边界和安全边界说明
- 表现力扩展边界：动画物理、轻中度卡通伤害尺度、反差喜剧角色边界
- 服装、配件、材质与剪影锚点

只有用户明确要求时，才额外输出无文字干净参考图 prompt。

## 下游反馈与角色修正规则

角色说明书和角色说明书图片提示词一旦确认，即构成当前项目的角色设计基线。

后续阶段允许提出的反馈类型：

- 补充型：补表情、补动作、补关键道具交互、补细节区
- 功能型：为表演、动作或镜头识别强化服装、配件或轮廓锚点
- 连续性型：为多镜头稳定性强化头盔、鞋子、道具、发型或站位识别点

这些反馈应形成增量修订，例如：

- `details/角色说明书_角色名_v1.1.md`
- `outputs/design_prompts/角色说明书图片提示词_v1.1.md`

下游不得直接静默改写的内容包括：

- 脸型主结构
- 发型主轮廓
- 服装主配色
- 角色核心气质
- 核心身份锚点

若反馈触及上述大项，必须回到设计阶段并重新确认。

## 全场景资产总参考图要求

当项目包含多角色、多道具、多段视频或参考图数量受限时，优先产出 `Master Scene-Prop Reference Board`。

该 prompt 应整合：

- 主场景空间布局
- 角色默认站位和阵营关系
- 核心道具位置
- 核心道具状态矩阵
- 镜头动线和安全边界
- 表现力扩展边界：允许的卡通物理、轻伤尺度和反差道具关系
- 后续故事板 / 视频提示词引用方式

## 空间站位图要求

当项目包含多角色、复杂道具关系、明显走位调度或容易出现站位漂移时，优先额外产出 `空间站位图提示词_v*.md`。

该 prompt 应满足：

- 目标是生成“空间控制图”，不是海报
- 视角优先 `top_down` 或 `semi_top_down`
- 明确角色默认位置：左 / 右 / 前 / 后 / 中心
- 明确核心道具默认位置和相对距离
- 明确入口 / 出口路径
- 明确允许移动区与禁止区
- 明确镜头默认朝向或轴线方向
- 尽量使用模型可稳定继承的空间语言，不用模糊抒情描述

## 黑板摘要建议

黑板补丁至少应说明：

- 本次走的是完整设定还是轻量锁定卡
- 用户是否已经确认设计方向
- 本次统一视觉语言基线是什么
- `expressive_animation` 是否启用、为何适配当前 `style_family`、默认档位、伤害尺度和反差喜剧密度
- 角色参考强度和场景参考强度
- 哪些内容来自资产复用，哪些内容是新建
- 锁定卡写入了哪些 `details/` 文件
- 设定图 prompt 写入了哪些 `outputs/design_prompts/` 文件
- 是否产出全场景资产总参考图 prompt
- 是否产出 `space_continuity_seed_v*.md`
- 是否产出 `prop_state_machines`、`blocking_map`、`faction_layout`

## 长内容落盘

较长的角色、场景或道具设定正文写入 `details/`，命名可采用：

- `details/character_design_v*.md`
- `details/scene_design_v*.md`
- `details/prop_design_v*.md`
- `details/design/space_continuity_seed_v*.md`

可直接生成设定图的 prompt 写入：

- `outputs/design_prompts/角色说明书图片提示词_v*.md`
- `outputs/design_prompts/scene_prompts_v*.md`
- `outputs/design_prompts/prop_prompts_v*.md`
- `outputs/design_prompts/空间站位图提示词_v*.md`
- `outputs/design_prompts/master_scene_prop_reference_v*.md`

其中：

- `角色说明书图片提示词_v*.md` 应作为可直接复制使用的长版最终提示词。
- 它必须以对应角色的 `details/角色说明书_角色名_v*.md` 为最高规范源。
- 允许把说明书内容重组为更适合生成的顺序，但不应压缩成丢失结构的短 prompt。
- 不默认按模型拆分多个版本，也不默认生成偏 Midjourney/SD 的兼容压缩稿作为主交付。

## prompt 文档语言规范

- 角色说明书图片 prompt 文档默认以中文为主。
- 结构说明、角色描述、场景描述、负向约束优先使用中文。
- 英文只作为锚词、风格词和板式名词的辅助，不单独派生纯英文主交付。
- 最终提示词应保证“拿起即可复制使用”，而不是要求用户再从设计稿二次提炼。
- 默认应保留角色名称、基础身份信息和必要分区标题，方便后续把设定图直接作为参考板使用；只有用户明确要求无字版时才去字。

## 生成 prompt 与对外文案的风格口径

生成 prompt 时允许使用强风格锚词，但这些锚词应来自当前 `director_style_id` 对应风格包，而不是由本协议写死内置示例。

本协议只定义机制，不再内置具体品牌倾向锚词。运行时应：

1. 优先读取当前 `style_profile`
2. 继承对应的 `visual_language` 与 `lighting_language`
3. 将其中适合直接投喂模型的锚词写入最终 prompt
4. 若风格家族或风格包字段缺失，或 `confirmations.style_family_confirmed.status != confirmed`、`confirmations.style_confirmed.status != confirmed` 且不满足历史项目兼容条件，本阶段应阻塞并返回风格确认，不得静默回退到 `pixar_like`

发布文案、对外介绍和复盘摘要仍尽量使用通用表述，不直接写“Pixar 官方风格”“皮克斯同款”等措辞。

## 统一视觉语言原则

任何角色、场景和道具都应先判断：

1. 概括优先，不走半写实真人。
2. 轮廓识别度优先。
3. 形状语言先行。
4. 头身比必须明确。
5. 眼睛与眉骨策略必须明确。
6. 表情系统必须成组。
7. 动画比例 + 真实材质。
8. 同一世界遵循同一套形状语言。
9. 场景要设计化，而不是现实照搬。
10. 道具要角色化，而不是普通产品图。
11. 色彩要统一，不要杂乱堆叠。
12. 灯光和材质服务电影感。
13. 表现力扩展必须服务角色、故事、情绪或画面 payoff，不随机加特效或梗。
