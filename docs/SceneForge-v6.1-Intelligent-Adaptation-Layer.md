# SceneForge v6.1 Intelligent Adaptation Layer 设计文档

## 1. 背景

SceneForge v6 已完成 Video Intake / Source Intake 主链路，能够把视频源解析为结构化创作资料，并通过 `topic_gate_handoff` 与 `priority_map` 交给后续阶段。

v6.1 的目标不是继续堆叠视频解析字段，而是在 v6 的理解结果上增加一层通用的创意改写适配能力：

```text
Video Understanding
-> Creative Adaptation Diagnosis
-> Adaptation Recommendations
-> Downstream Creative Execution
```

也就是说，系统不仅要回答“源片段讲了什么、怎么拍的、哪些要保留”，还要回答：

```text
这个案例的可复用叙事母版是什么？
哪些表层元素可以替换？
哪些爽点、情绪、节奏、喜剧、动画化表达可以增强？
哪些改写方向更适合短视频完播？
哪些元素会导致 AI 视频生成失败，应如何规避？
```

## 2. 设计目标

v6.1 面向所有源视频 / 案例 / 桥段，不绑定任何单一示例。

核心目标：

1. 从源片段中抽象出可复用的叙事、情绪、喜剧、传播和视觉母版。
2. 明确区分 `must_preserve`、`replaceable_slots`、`upgrade_opportunities`、`avoid_copying`。
3. 给 `scene-script-adapter`、`scene-storyboard-director`、`scene-video-prompt-builder` 提供可执行的改写方向。
4. 引入开放参考型枚举资产库，提升稳定性，但不把创作限制成封闭模板。
5. 把 AI 视频生成风险前置到改写阶段，减少文字乱码、手部畸形、道具漂移、多角色失控等问题。

## 3. 非目标

v6.1 不做以下事情：

1. 不自动替用户决定最终创意方案。
2. 不自动资产化源视频。
3. 不把完整源视频长解析写入 `PROJECT_BOARD.md`。
4. 不要求下游默认深读完整 `source_video_analysis_v1.md`。
5. 不把枚举资产当作严格封闭集合。除非字段明确写 `strict_enum: true`，否则均为开放参考。
6. 不照搬源视频的具体受保护表达、明星脸、品牌、标志、完整台词、独特镜头组合。

## 4. v6.1 新增产物

`scene-video-intake` 在 v6 原有产物基础上新增：

```text
inputs/source_intake/adaptation_recommendations_v1.md
```

该文件是 v6.1 的核心桥接文件。它不是完整视频解析，而是“可改写诊断与建议”。

推荐读取策略：

```yaml
read_policy:
  default_read:
    - topic_gate_handoff_v1.md
    - source_video_priority_map_v1.md
    - adaptation_recommendations_v1.md summary
  read_full_adaptation_only_when_needed: true
```

## 5. adaptation_recommendations_v1.md 数据结构

```yaml
adaptation_recommendations:
  version: v1
  source_summary:
    one_sentence:
    source_genre_or_format:
    source_conflict_type:
    source_emotional_engine:

  pattern_diagnosis:
    narrative_patterns:
      - pattern_id:
        selection_mode: reference | adapted_reference | custom_generated
        confidence: high | medium | low
        reason:
    emotional_patterns:
      - pattern_id:
        selection_mode:
        confidence:
        reason:
    comedy_patterns:
      - pattern_id:
        selection_mode:
        confidence:
        reason:
    virality_patterns:
      - pattern_id:
        selection_mode:
        confidence:
        reason:

  must_preserve:
    core_satisfaction:
    conflict_engine:
    reveal_or_turning_mechanism:
    emotional_payoff:
    audience_expectation:

  replaceable_slots:
    protagonist_surface_identity:
      original_function:
      replacement_guidance:
      examples:
    protagonist_hidden_value_or_truth:
      original_function:
      replacement_guidance:
      examples:
    authority_or_pressure_group:
      original_function:
      replacement_guidance:
      examples:
    setting_or_social_arena:
      original_function:
      replacement_guidance:
      examples:
    power_symbol_or_evidence:
      original_function:
      replacement_guidance:
      examples:
    reveal_action:
      original_function:
      replacement_guidance:
      examples:
    reaction_chain:
      original_function:
      replacement_guidance:
      examples:
    final_payoff_image:
      original_function:
      replacement_guidance:
      examples:

  upgrade_opportunities:
    animation_upgrade:
      level: none | light | medium | strong
      recommendations:
    comedy_upgrade:
      level: none | light | medium | strong
      recommendations:
    pacing_upgrade:
      level: none | light | medium | strong
      recommendations:
    emotional_upgrade:
      level: none | light | medium | strong
      recommendations:
    hero_moment_upgrade:
      level: none | light | medium | strong
      recommendations:
    virality_upgrade:
      level: none | light | medium | strong
      recommendations:
    visual_upgrade:
      level: none | light | medium | strong
      recommendations:

  variant_direction_candidates:
    - variant_id:
      target_format: short_video | animation_film | comedy_sketch | cinematic_scene | other
      logline:
      preserved_core:
      major_changes:
      risk_level: low | medium | high
      best_for:

  ai_generation_adaptation:
    stable_choices:
    risky_choices:
    suggested_substitutions:
    prop_and_text_strategy:
    character_consistency_strategy:
    negative_constraints:

  downstream_handoff:
    for_topic_gate:
    for_reference_decider:
    for_script_adapter:
    for_performance_director:
    for_storyboard_director:
    for_video_prompt_builder:
```

## 6. 枚举资产设计原则

v6.1 新增 `assets/adaptation/` 作为开放参考资产库。

建议首批资产：

```text
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/upgrade-pattern-library.md
assets/adaptation/ai-generation-risk-library.md
```

设计原则：

1. 资产库提供 `pattern_id`、适用条件、改写价值、误用风险和下游使用建议。
2. 资产库不是固定选项表，而是参考锚点。
3. 输出中必须记录 `selection_mode`：
   - `reference`：直接命中资产库模式。
   - `adapted_reference`：参考资产库但做了案例适配。
   - `custom_generated`：资产库没有合适项，生成自定义判断。
4. 枚举资产只服务改写判断，不直接替代创作。

## 7. 与现有 v4/v5/v6 的关系

```text
v4 expressive_animation
回答：可以用什么动画表现。

v5 storyboard_director_v5
回答：这个表现应该怎么拍。

v6 source_intake
回答：源视频是什么，哪些要保留，哪些不能照搬。

v6.1 intelligent_adaptation
回答：这个源视频可以如何通用化、替换、增强，并交给后续阶段执行。
```

v6.1 不替代 v4/v5/v6，而是建立在 v6 解析结果上，给 v4/v5/后续阶段提供更明确的创意改写方向。

## 8. 下游读取协议

默认下游不读取完整源视频长解析，而读取：

```text
PROJECT_BOARD.md source_intake summary
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
inputs/source_intake/adaptation_recommendations_v1.md 的 summary / downstream_handoff
```

阶段重点：

```yaml
scene-topic-gate:
  read:
    - source conflict type
    - candidate topic
    - virality upgrade hints
    - risks_or_limits

scene-reference-decider:
  read:
    - narrative_patterns
    - replaceable_slots
    - safe adaptation boundaries

scene-script-adapter:
  read:
    - must_preserve
    - replaceable_slots
    - variant_direction_candidates
    - meme/dialogue/turning point suggestions if present

scene-performance-director:
  read:
    - emotional_patterns
    - comedy_patterns
    - reaction_chain guidance

scene-storyboard-director:
  read:
    - hero_moment_upgrade
    - visual_upgrade
    - animation_upgrade
    - final_payoff_image

scene-video-prompt-builder:
  read:
    - ai_generation_adaptation
    - negative_constraints
    - prop/text/continuity strategy
```

## 9. 成功标准

v6.1 完成后，系统应能做到：

1. 任意源片段都能提炼出可复用改写结构，而不是只复刻原片。
2. 明确给出可替换槽位和不可丢失的核心爽点。
3. 能为短视频、动画电影、喜剧、情绪增强等目标提出差异化建议。
4. 能提前识别 AI 生成风险，并提供可执行替代方案。
5. 下游阶段无需深读完整长解析，也能获得足够的改写指导。
