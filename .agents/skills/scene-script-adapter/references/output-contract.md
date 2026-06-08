# scene-script-adapter 输出协议

本文件定义 `scene-script-adapter` 的改编档位、Story Beat 结构、视频生成单元计划、标准化 Beat 表、时长分段确认、表现力扩展机会点、补丁结构、黑板摘要边界和长正文落盘方式。

## 阶段定位

`scene-script-adapter` 位于：

```text
scene-story-development
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
```

本阶段负责把参考边界和角色/场景设定转化为可拍、可表演、可分镜的剧本版本。

本阶段必须先确认整片目标时长、单段视频生成时长和分段策略，再输出正式剧本与 `story_beats`。

本阶段还负责识别表现力扩展机会点，包括动画化动作转译、轻中度卡通伤害和反差喜剧桥段；这些信息应落入剧本正文与后续阶段索引，不作为黑板根字段保存。

---

# 一、确认闸门

本阶段默认不能直接落盘正式剧本。必须先输出剧本方案预览，并等待用户确认。

剧本方案预览至少包含：

- 目标总时长候选，例如 30 秒、40 秒、60 秒
- 单段视频生成时长候选，例如 10 秒、15 秒或混合分段
- 改编档位候选
- 演绎风格候选（Performance Style Candidates）
- 导演风格包候选（Director Style Package Candidates）
- 风格大类（Style Family）
- 当前风格确认状态（Style Confirmation Status）
- Story Beat 草案
- 关键保留点
- 主动重写点
- 潜在 Hero Moment
- `expressive_animation` 继承策略
- 动画化动作转译机会点
- 轻中度卡通伤害尺度使用建议
- 反差喜剧机会点
- 对分镜阶段的桥接需求提示
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-script-adapter
stage: scene-script-adapter
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

---

# 三、改编档位

- `original_preserve`
- `mostly_preserve`
- `partial_rewrite`
- `reconstruct_expand`

---

# 四、演绎风格

由本阶段最终确认并写入`project_config.performance_style`：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

---

# 四点五、导演风格包

默认由上游已确认并由本阶段继承：

- `project_config.director_style_id`
- `project_config.director_style_version`
- `project_config.style_family`
- `project_config.style_profile_path`

规则：

- 若 `confirmations.style_family_confirmed.status != confirmed`、`confirmations.style_confirmed.status != confirmed` 或风格字段为空，本阶段必须阻塞并返回上游风格确认；若为历史项目且四个风格字段齐全，可按 `legacy confirmed` 兼容。
- 若上游已确认导演风格包，本阶段默认继承，不重新发明第一版正式选择。
- 若用户明确要求改风格，本阶段可以提出新的候选，但只有在用户再次确认后，才允许覆盖正式字段。
- 若正式产物使用默认回退，必须记录 `used_default_fallback: true`。

---

# 五、阶段正文结构

下文结构用于剧本阶段 primary / handoff 正文文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

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
  script_confirmation:
    confirmed_by_user: false
    confirmation_note:
  adaptation_level:
  performance_style:
  director_style_package:
    confirmation_status:
    director_style_id:
    director_style_version:
    style_family:
    style_profile_path:
    used_default_fallback: false
    fallback_note:
  target_total_duration_seconds:
  segment_strategy:
    segment_duration_seconds:
    segment_count:
    segmentation_mode:
    rationale:
  expressive_animation_inheritance:
    enabled:
    source_stage: stage_index.design
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
    asset_references:
      effect_library: assets/animation-stylization/effect-library.md
      contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  script_summary:
  script_source_mode:
  preserved_elements:
    - category:
      note:
  rewritten_elements:
    - category:
      note:
  story_beats:
    - beat_id:
      title:
      function:
      beat_summary:
      emotion_goal:
      dramatic_question:
      visual_focus:
      action_focus:
      performance_hint:
      rhythm_hint:
      sound_hint:
      target_duration_seconds:
      payoff_seed:
      potential_hero_moment: false
      bridge_need:
      expressive_animation_hint:
        use_stylized_action: false
        use_minor_cartoon_injury: false
        use_contrast_comedy: false
        reason:
        downstream_note:
  expressive_beat_opportunities:
    - beat_id:
      opportunity_type: stylized_action | minor_cartoon_injury | contrast_comedy | combined
      original_beat:
      proposed_expression:
      emotional_function:
      comedic_function:
      safety_or_tonal_note:
      downstream_owner: scene-performance-director | scene-storyboard-director | scene-video-prompt-builder
  stylized_action_opportunities:
    - beat_id:
      scene_trigger:
      original_action_or_risk:
      proposed_animation_translation:
      recommended_animation_level:
      recommended_effect_combo:
      injury_tone:
      safety_note:
  contrast_opportunities:
    - beat_id:
      contrast_type:
      setup_expectation:
      payoff_reveal:
      emotional_function:
      comedic_function:
      use_template:
      avoid_repetition_note:
  hero_moment_candidates:
    - hero_id:
      title:
      related_beat:
      reason:
      visual_payoff:
  beat_table_file:
  video_generation_unit_plan_file:
  beat_table:
    - beat_id:
      dramatic_role:
      emotional_turn:
      action_chain_role:
      continuity_risk:
      target_duration_seconds:
  video_generation_unit_plan:
    - vgu_id:
      linked_beat_ids:
        - beat_id:
      narrative_goal:
      target_duration_seconds:
      shot_density_hint:
      bridge_required: false
      action_continuity_focus:
      emotion_continuity_focus:
  script_file:
  performance_handoff:
    acting_note:
    micro_expression_note:
    pause_note:
    character_reaction_note:
    expressive_animation_note:
    contrast_performance_note:
    injury_reaction_note:
  storyboard_hints:
    pacing_note:
    visual_escalation_note:
    shot_priority_note:
    bridge_shot_need:
    blocking_note:
    prop_state_note:
    expressive_storyboard_note:
    contrast_reveal_note:
    injury_visibility_note:
  risk_notes:
  next_action:
```

---

# 六、字段说明

- `script_confirmation`：记录用户是否确认剧本方案。正式落盘时应为 `confirmed_by_user: true`。
- `script_strategy`：本次项目是改写剧本还是使用原始剧本。
- `creative_direction_context`：剧本阶段必须继承的统一创作方向上下文。
- `adaptation_level`：本次最终改编档位。
- `performance_style`：本次最终演绎风格，同时回写 `board_updates.project_config.performance_style`。
- `director_style_package`：默认继承当前已确认的导演风格包；若用户在本阶段明确改风格，再回写 `board_updates.project_config.director_style_id`、`director_style_version`、`style_family` 和 `style_profile_path`。
- `target_total_duration_seconds`：整条视频目标总时长，不等于单个 Segment 时长。
- `segment_strategy`：剧本阶段确认的分段策略，供分镜和视频提示词继承。
- `expressive_animation_inheritance`：继承设计/上游阶段提供的表现力扩展摘要，说明本阶段使用的风格化档位、伤害尺度和反差喜剧开关。它不是默认必启字段：`3d_animation`、`2d_animation` 可正常启用，`motion_comic`、`hybrid` 仅在当前风格包明确支持时局部启用，`live_action_cinematic` 默认关闭动画物理和卡通伤害。
- `script_summary`：供黑板与后续阶段读取的剧本摘要。
- `script_source_mode`：`rewrite_adaptation` 表示改写型剧本；`preserve_original` 表示原始剧本标准化结果。
- `preserved_elements`：必须保留的内容列表。
- `rewritten_elements`：本次主动重写或强化的内容列表。
- `story_beats`：面向表演导演和分镜阶段的叙事情绪节拍列表。
- `expressive_animation_hint`：Story Beat 内的轻量表现力扩展提示，供后续阶段继承，不替代完整机会点列表。
- `expressive_beat_opportunities`：统一记录该 Beat 是否适合动画化动作、轻中度卡通伤害、反差喜剧或组合表达。
- `stylized_action_opportunities`：专门记录高风险动作、强动作或喜剧冲击如何转译为动画物理和 VFX。
- `contrast_opportunities`：专门记录反差喜剧机会点，例如体型反差、道具反差、性格反差、画面语境反差。
- `potential_hero_moment`：该 Story Beat 是否可能成为看点镜头。最终 Hero Shot 由分镜阶段确认。
- `bridge_need`：该 Beat 是否需要在进入下一个 Beat 或 Segment 时设计桥接。
- `hero_moment_candidates`：候选看点，不绑定具体样例，应根据当前项目剧情动态生成。
- `beat_table_file`：写入 `details/script/beat_table_v*.md` 的标准化 Beat 表路径。
- `video_generation_unit_plan_file`：写入 `details/script/video_generation_unit_plan_v*.md` 的视频生成单元规划路径。
- `beat_table`：供表演、分镜和视频提示词阶段快速读取的标准化 Beat 摘要。
- `video_generation_unit_plan`：剧本阶段对后续视频生成单元的初步规划，供分镜阶段细化而不是从零重建。
- `script_file`：完整剧本正文路径。
- `performance_handoff`：交给 `scene-performance-director` 的表演提示，必须包含表现力扩展相关提示（如适用）。
- `storyboard_hints`：交给 `scene-storyboard-director` 的节奏、视觉升级、桥接、Blocking、道具状态和表现力扩展镜头表达提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

---

# 七、轻结构约束

`preserved_elements` 与 `rewritten_elements` 使用同一轻结构：

```yaml
- category:
  note:
```

推荐分类：

- `台词表达`
- `情绪核心`
- `剧情骨架`
- `动作设计`
- `角色反应`
- `喜剧机制`
- `反差喜剧`
- `动画化动作转译`
- `轻中度卡通伤害`
- `节奏推进`
- `声音提示`
- `空间调度`
- `道具状态`

---

# 八、Story Beat 结构

```yaml
story_beats:
  - beat_id:
    title:
    function:
    beat_summary:
    emotion_goal:
    dramatic_question:
    visual_focus:
    action_focus:
    performance_hint:
    rhythm_hint:
    sound_hint:
    target_duration_seconds:
    payoff_seed:
    potential_hero_moment: false
    bridge_need:
    expressive_animation_hint:
      use_stylized_action: false
      use_minor_cartoon_injury: false
      use_contrast_comedy: false
      reason:
      downstream_note:
```

## `function` 枚举

- `setup`
- `escalation`
- `misdirection`
- `reveal`
- `payoff`
- `release`
- `transition`

## 说明

- `beat_id`：节拍编号，如 `B01`、`B02`。
- `title`：节拍短标题。
- `function`：该 Beat 在叙事中的功能。
- `beat_summary`：该 Beat 的可拍摘要。
- `emotion_goal`：观众应感受到的情绪变化。
- `dramatic_question`：这个 Beat 推动的悬念或冲突问题。
- `visual_focus`：画面应优先表现什么。
- `action_focus`：动作或调度重点。
- `performance_hint`：交给表演导演的角色表演提示。
- `rhythm_hint`：节奏、停顿、加速或释放提示。
- `sound_hint`：声音、音乐、拟音或静默提示。
- `payoff_seed`：该 Beat 是否埋下后续看点、反转或 Hero Moment。
- `expressive_animation_hint`：该 Beat 是否需要表现力扩展，必须说明理由，并说明它为何适配当前 `style_family`，不能默认每个 Beat 都启用。

## 剧本模式规则

剧本阶段必须显式输出：

```yaml
script_strategy:
  status: selected
  mode: rewrite_adaptation | preserve_original
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
  selected_adaptation:
    status: selected | bypassed | not_applicable
    selected_idea_id:
    selected_title:
    selection_note:
```

规则：

- `rewrite_adaptation`：正常输出改写型剧本，允许填写 `selected_adaptation_idea` 与 `rewritten_elements`。
- `preserve_original`：输出原始剧本标准化结果，`rewritten_elements` 只允许记录节奏压缩、去害化和镜头化整理，不得记录新的题材改写。

---

# 九、表现力扩展机会点规则

## 1. 何时识别 `stylized_action_opportunities`

适用场景：

- 追逐、摔倒、撞击、飞扑、打斗、枪炮、爆炸、强冲击。
- 原桥段存在真实暴力或高风险动作，需要转译成动画动作喜剧。
- 需要把动作冲击变成短视频看点或 Hero Moment。

要求：

```text
保留冲突、爽点、节奏和情绪功能；
降低真实伤害、血腥和危险动作复刻。
```

## 2. 何时识别 `minor_cartoon_injury`

适用场景：

- 动作后果需要可见，但不应写实血腥。
- 需要角色灰头土脸、头包、鼻血笑点、小擦伤、黑脸爆炸头等动画喜剧后果。

禁止：

- 大量流血
- 血泊
- 开放性伤口
- 写实刀枪伤
- 子弹入体
- 骨折特写
- 身体恐怖
- 持续痛苦

## 3. 何时识别 `contrast_opportunities`

适用场景：

- 角色介绍
- 喜剧 reveal
- tension release
- Hero Moment
- 角色可爱化或立体化
- 画面语境反差

密度规则：

```text
一个项目最多 1-2 个核心反差母题；
一个视频分段最多一个主反差笑点；
不要每个 Beat 都抖包袱。
```

---

# 十、黑板摘要建议

黑板补丁至少应说明：

- 用户是否确认剧本方案
- 整片目标时长和分段策略
- 最终改编档位和演绎风格
- 最终导演风格包（Director Style Package）与风格大类（Style Family）
- Story Beat 数量和核心节奏
- 是否已产出 `beat_table_v*.md` 与 `video_generation_unit_plan_v*.md`
- 是否启用 `expressive_animation`
- 识别了哪些 `stylized_action_opportunities`
- 识别了哪些 `contrast_opportunities`
- 轻中度卡通伤害尺度是否需要后续阶段继承
- 哪些机会点可能成为 Hero Moment
- 完整剧本路径
- 下一阶段表演导演最需要继承的提示

---

# 十一、长正文落盘

完整剧本正文写入：

```text
details/script_v*.md
details/script/beat_table_v*.md
details/script/video_generation_unit_plan_v*.md
```

黑板只保留摘要、Story Beat、表现力扩展机会点和路径引用，不直接塞完整剧本文本。
