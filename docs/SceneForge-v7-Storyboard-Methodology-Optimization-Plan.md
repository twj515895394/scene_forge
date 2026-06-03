# SceneForge 当前现状与 AI 视频故事板方法论整改优化方案

> 建议版本：v7 / Storyboard Generation Methodology Integration  
> 生成日期：2026-06-03  
> 目标仓库：`twj515895394/scene_forge`  
> 建议落点：`docs/SceneForge-v7-Storyboard-Methodology-Optimization-Plan.md`  
> 适用对象：SceneForge 总控、分镜导演、视频提示词构建、资产库设计、项目黑板协议和后续 Skill SOP 改造。

---

## 0. 结论摘要

SceneForge 当前已经具备比较完整的“AI 视频提示词生产系统”骨架：

```text
scene-video-intake
-> scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

其中 v4 已经补强“动画表现力”，v5 已经补强“专业镜头语言”，v6 已经补强“源视频解析与结构继承”。当前项目的优势是：

1. 已经形成 Skill 化阶段链路；
2. 已经建立 `PROJECT_BOARD.md` 作为唯一状态源；
3. 已经明确 `docs/` 不进入运行时上下文，执行期依赖应沉淀到 `.agents/skills/**/references/` 和 `assets/`；
4. 已经有 `assets/animation-stylization/` 和 `assets/cinematic-language/` 两类执行期资产库；
5. 已经有 `storyboard_content_breakdown`、`cinematic_language_plan`、`segments`、`hero_moments`、`bridge_shots`、`blocking_map`、`prop_state_machines` 等字段。

但对照《AI 视频故事板生成方法论 v1.0》，SceneForge 仍有几个关键缺口：

1. **视频生成单元概念还不够强**：当前有 Segment，但缺少“5-15 秒视频生成单元”的明确质量标准、首尾衔接帧和单元级空间地图。
2. **Beat 层和 Shot 层之间缺少统一中间规范**：已有 `storyboard_content_breakdown`，但还没有完全对齐方法论中的 Beat → Shot → Anchor 控制链。
3. **资产锁定还停留在摘要和 prompt 层**：需要补出角色 / 场景 / 道具 / 风格资产卡字段、禁止变化项、视图需求、枚举库。
4. **连续性系统需要从若干字段升级为四线模型**：节奏连续、动作连续、情绪连续、空间连续应成为强制检查项。
5. **同源双版故事板尚未成为正式输出协议**：当前有故事板 prompt，但没有明确“控制版故事板”和“风格版故事板”同源生成规则。
6. **视频提示词转译层需要更明确**：当前视频 prompt builder 已继承分镜和声音，但还需要明确“故事板图只作为镜头顺序 / 动作 / 站位 / 运镜参考，不保留编号、边框、箭头、草图风格”。
7. **质量检查清单需要资产化为执行期 Checklist**：当前规则分散在 Skill 和 output-contract 中，建议补一个可复用的 `storyboard-quality-checklist.md`。

因此，建议将本轮升级命名为：

```text
SceneForge v7：AI 视频故事板生成控制链升级
```

核心目标不是推翻 v4/v5/v6，而是把方法论中的：

```text
Asset 控一致性
Beat 控节奏
Shot 控画面
Anchor 控连续性
Space 控空间
Action 控动作
Emotion 控表演
Style 控观感
Prompt 控执行
Checklist 控质量
```

嵌入现有 SceneForge 阶段链路。

---

## 1. 当前项目现状梳理

### 1.1 顶层定位

当前 README 对 SceneForge 的定位是：

```text
经典影视 / 热点片段的 3D 动画电影化再创作提示词生产系统
```

它不是单个视频项目，也不是单个提示词模板，而是一套长期复用的内容生产框架。

当前目录职责大致为：

| 目录 | 当前职责 | 方法论整合后的建议 |
|---|---|---|
| `.agents/skills/` | Agent 可调用 SOP 能力包 | 保持不变，但补充 v7 的故事板控制链字段和检查协议 |
| `assets/` | 长期复用资产库 | 扩展为角色、场景、道具、风格、镜头类型、节奏模板、连续性规则、模型适配资产库 |
| `projects/` | 单项目工作区 | 强化 `inputs/assets/`、`details/storyboard/`、`outputs/storyboards/`、`outputs/video_prompts/` 的文件边界 |
| `outputs/` | 跨项目共享最终提示词模板和发布素材 | 保持跨项目产物，但项目级 prompt 建议仍优先落项目目录 |
| `docs/` | 人类阅读的项目规范说明 | 保存本方案、设计说明、实施计划，不进入运行时上下文 |
| `.handoff/` | 阶段性交接文档 | 继续作为人工交接，不作为执行上下文 |

### 1.2 已有能力

#### v4：表现力扩展

当前 v4 的主要字段：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

对应能力：

1. 动画电影级夸张物理；
2. 轻中度卡通伤害安全转译；
3. 反差喜剧 setup / reveal / payoff；
4. 动画 VFX、环境反应、声音钩子。

可读取资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

#### v5：专业分镜导演增强

当前 v5 已经形成三层链路：

```text
story_beats / performance_sheet / source_intake_constraints
-> storyboard_content_breakdown
-> cinematic_language_plan
-> shot_highlights / shotlist / storyboard_prompts
```

核心字段包括：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
shot_highlights:
segments:
hero_moments:
bridge_shots:
blocking_map:
faction_layout:
prop_state_machines:
continuity_rules:
```

可读取资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

#### v6：视频源解析 / Source Intake

当前 v6 用于处理视频文件、视频链接、短视频链接、截图序列等输入。

核心结构：

```yaml
source_intake:
  type:
  status:
  files:
    index:
    analysis:
    timeline:
    dialogue:
    audio:
    camera:
    priority_map:
    topic_gate_handoff:
  topic_gate_handoff_summary:
  assetization:
  read_policy:
```

核心策略：完整长解析不塞进黑板，只保存到：

```text
projects/<project>/inputs/source_intake/
```

并通过：

```text
topic_gate_handoff_v1.md
source_video_priority_map_v1.md
```

服务后续阶段。

### 1.3 当前最接近方法论的部分

| 方法论模块 | SceneForge 当前对应 | 当前成熟度 |
|---|---|---:|
| 资产锁定 | `scene-asset-checker`、`scene-design-builder`、设计摘要、`prop_state_machines` | 中 |
| 视频生成单元 | `segment_strategy`、`segment_duration_seconds`、`segments` | 中 |
| Beat 层 | `story_beats` | 中 |
| Shot 层 | `shot_highlights`、`shotlist_file` | 中高 |
| 镜头语言资产 | `assets/cinematic-language/*` | 高 |
| 表现力资产 | `assets/animation-stylization/*` | 高 |
| 源视频解析 | `source_intake` | 高 |
| 桥接镜头 | `bridge_shots` | 中高 |
| 道具状态 | `prop_state_machines` | 中高 |
| Blocking | `blocking_map`、`faction_layout` | 中高 |
| 视频 prompt 转译 | `scene-video-prompt-builder` | 中高 |
| 质量检查 | 分散在 Skill 规则中 | 中低 |
| 同源双版故事板 | 尚未明确协议化 | 低 |

---

## 2. 方法论可落地阶段映射

### 2.1 总流程映射

方法论标准流程：

```text
完整剧本
→ 视频生成单元切分
→ Beat 叙事节拍
→ Shot 分镜镜头
→ 连续性锚点
→ 空间连续性地图
→ 动作连续性语法
→ 情绪连续性语法
→ 同源双版故事板
→ 视频提示词转译
→ 模型适配
→ 视频生成
→ 拼接成片
```

映射到 SceneForge：

| 方法论步骤 | SceneForge 阶段 | 需要新增 / 强化 |
|---|---|---|
| 完整剧本 | `scene-script-adapter` | 强化 Beat 标准字段与长剧本切分建议 |
| 视频生成单元切分 | `scene-script-adapter` + `scene-storyboard-director` | 明确 5-15 秒单元规则、首尾衔接帧 |
| Beat 叙事节拍 | `scene-script-adapter` | 增加 Beat 目的、动作推进、情绪推进、信息释放、交接字段 |
| Shot 分镜镜头 | `scene-storyboard-director` | 与方法论 Shot 字段对齐 |
| 连续性锚点 | `scene-storyboard-director` | 新增 `continuity_anchors` 强制字段 |
| 空间连续性地图 | `scene-design-builder` + `scene-storyboard-director` | 从 `blocking_map` 扩展为 `space_continuity_map` |
| 动作连续性语法 | `scene-performance-director` + `scene-storyboard-director` | 新增 action chain：准备 / 触发 / 过程 / 落点 / 反应 |
| 情绪连续性语法 | `scene-performance-director` | 新增 emotion chain：起点 / 触发 / 变化 / 峰值 / 落点 / 下一入口 |
| 同源双版故事板 | `scene-storyboard-director` | 新增 control storyboard prompt 与 styled storyboard prompt |
| 视频提示词转译 | `scene-video-prompt-builder` | 增加故事板参考用途声明和模型适配层 |
| 模型适配 | `scene-video-prompt-builder` | 新增 Seedance / 即梦 / 可灵 / Veo / Sora 适配建议 |
| 质量检查 | 各阶段 + 新 checklist asset | 新增统一 checklist |

---

## 3. 当前缺口与整改方向

### 3.1 缺口一：Segment 还不是完整“视频生成单元”

当前 SceneForge 已经有：

```yaml
segment_duration_seconds:
segment_strategy:
segments:
```

但方法论中的视频生成单元要求更强。一个合格单元必须具备：

```text
有明确片段目标；
有动作或情绪起点；
有动作或情绪变化；
有小落点；
能为下一片段留下入口；
时长在 5-15 秒内。
```

#### 整改建议

把 `segments` 升级为 `video_generation_units`，或在 `segments` 下补充以下字段：

```yaml
video_generation_units:
  - unit_id:
    duration_seconds:
    unit_goal:
    rhythm_type:
    rhythm_intensity:
    recommended_storyboard_panels:
    covered_beats:
    covered_shots:
    opening_anchor_frame:
      image_state:
      character_pose:
      character_position:
      prop_state:
      camera_direction:
      emotion_state:
      lighting_or_scene_continuity:
    closing_anchor_frame:
      image_state:
      character_action_state:
      visual_hook:
      next_unit_entry:
      unfinished_action:
      gaze_prop_or_composition_hook:
    continuity_risk:
    split_or_merge_reason:
```

### 3.2 缺口二：Beat 标准字段不够统一

当前 `story_beats` 多由剧本阶段产生，但 Beat 作为分镜骨架，应至少包含：

```yaml
beat_id:
beat_purpose:
duration_range:
action_progression:
emotion_progression:
information_release:
space_change:
continuity_from_previous_beat:
continuity_to_next_beat:
suggested_shot_count:
```

#### 整改建议

在 `scene-script-adapter/references/output-contract.md` 中新增或规范：

```yaml
story_beats:
  - beat_id:
    beat_purpose:
    duration_range_seconds:
    action_progression:
    emotion_progression:
    information_release:
    space_change:
    continuity_from_previous_beat:
    continuity_to_next_beat:
    suggested_shot_count:
    unit_split_hint:
```

并要求 `scene-storyboard-director` 不能只拿剧情摘要直接生镜头，必须先消费 Beat 标准字段。

### 3.3 缺口三：Shot 字段缺少“入镜 / 出镜 / 交接”强约束

当前 v5 shotlist 已覆盖镜头编号、Beat、时间、景别、机位、构图、镜头运动、角色动作、声音、情绪等字段，但方法论强调每个 Shot 必须写清：

```text
承接上一镜头；
入镜状态；
核心动作；
出镜状态；
下一镜头交接。
```

#### 整改建议

在 `scene-storyboard-director/references/output-contract.md` 的 `shot_highlights` 和完整 shotlist 中补强：

```yaml
shot_continuity:
  previous_left:
  current_picks_up:
  entry_state:
  core_action:
  exit_state:
  next_handoff:
```

完整 Shot 字段建议升级为：

```yaml
shots:
  - shot_id:
    beat_id:
    unit_id:
    shot_type:
    shot_purpose:
    previous_shot_continuity:
    entry_state:
    core_action:
    exit_state:
    next_shot_handoff:
    shot_scale:
    camera_angle:
    composition:
    camera_movement:
    blocking:
    visual_focus:
    emotional_change:
    action_continuity_stage: preparation | trigger | process | landing | reaction
    sound_or_dialogue:
    style_and_lighting_note:
    risk_note:
```

### 3.4 缺口四：连续性系统需要升维

当前已有：

```yaml
continuity_rules:
  character_consistency:
  performance_consistency:
  scene_consistency:
  motion_continuity:
  audio_continuity_hint:
  blocking_continuity:
  prop_state_continuity:
```

但方法论建议把连续性明确拆成四条线：

```text
节奏连续：Beat 层
动作连续：动作连续性语法
情绪连续：情绪连续性语法
空间连续：空间连续性地图
```

#### 整改建议

新增结构：

```yaml
continuity_control_system:
  rhythm_continuity:
    beat_chain:
    rhythm_type:
    rhythm_intensity:
    shot_density_reason:
  action_continuity:
    action_chain:
      preparation:
      trigger:
      process:
      landing:
      reaction:
      next_action_entry:
  emotion_continuity:
    emotion_start:
    emotion_trigger:
    emotion_shift:
    emotion_peak:
    emotion_landing:
    next_emotion_entry:
  space_continuity:
    spatial_axis:
    character_positions:
    prop_positions:
    camera_activity_area:
    forbidden_axis_crossing:
```

### 3.5 缺口五：同源双版故事板没有协议化

方法论建议：

```text
一套主分镜数据
├─ 控制版故事板
└─ 风格版故事板
```

当前 SceneForge 有 `storyboard_prompt_files`，但没有强制区分：

1. 控制版故事板 Prompt：强调镜头、动作、站位、运镜、节奏、连续性；
2. 风格版故事板 Prompt：强调最终画风、光影、色彩、质感、角色与场景一致性。

#### 整改建议

在 `scene-storyboard-director` 输出中加入：

```yaml
storyboard_prompt_files:
  - file: outputs/storyboards/control_storyboard_prompt_v1.md
    purpose: director_control_storyboard
    source_data: same_structured_shot_data
    use_for:
      - shot_order
      - action_continuity
      - blocking
      - camera_movement
      - segment_handoff
  - file: outputs/storyboards/styled_storyboard_prompt_v1.md
    purpose: styled_keyframe_storyboard
    source_data: same_structured_shot_data
    use_for:
      - final_style
      - lighting
      - color
      - texture
      - character_scene_consistency
```

并明确：两版必须同源，不允许两套分镜数据各自生成。

### 3.6 缺口六：视频提示词转译层需要强约束

方法论强调：故事板图不能直接等同于视频提示词。必须声明：

```text
参考故事板只用于理解镜头顺序、人物动作、站位关系、运镜方向和叙事节奏。
不要生成分镜表格。
不要保留故事板边框。
不要保留 Shot 编号。
不要保留箭头标注。
不要保留黑白铅笔草图风格。
最终成片必须使用指定最终画风。
```

#### 整改建议

在 `scene-video-prompt-builder/references/output-contract.md` 和 Skill 步骤中加入：

```yaml
storyboard_reference_usage:
  reference_purpose:
    - shot_order
    - action_continuity
    - blocking
    - camera_movement
    - narrative_rhythm
  must_not_preserve:
    - storyboard_grid
    - panel_border
    - shot_number
    - arrows
    - handwritten_notes
    - pencil_sketch_style_unless_final_style
  final_style_override:
```

并在每段 Segment Prompt 固定写入“参考图用途说明”。

---

## 4. 建议新增 / 扩展资产库

### 4.1 当前已有资产库

```text
assets/animation-stylization/
  effect-library.md
  contrast-comedy-library.md

assets/cinematic-language/
  shot-language-library.md
  animation-film-shot-patterns.md
  animation-comedy-action-patterns.md
```

### 4.2 建议新增资产库目录

```text
assets/storyboard-methodology/
  video-generation-unit-library.md
  beat-structure-library.md
  shot-type-library.md
  rhythm-type-shot-combo-library.md
  shot-density-reference.md
  continuity-control-library.md
  storyboard-dual-version-prompt-library.md
  video-prompt-translation-library.md
  storyboard-quality-checklist.md
  model-adaptation-library.md
```

这些不是 docs，而是执行期可读的轻量资产库。它们应遵守：

```yaml
asset_type: executable_reference
runtime_readable: true
examples_are_reference_only: true
enums_are_open_by_default: true
```

### 4.3 `video-generation-unit-library.md`

建议内容：

```yaml
video_generation_unit_policy:
  default_duration_seconds: 10
  allowed_duration_seconds: [5, 8, 10, 12, 15]
  max_duration_seconds: 15
  split_priority:
    - action_completeness
    - emotion_completeness
    - space_continuity
    - generation_duration_limit
    - management_convenience
  unit_quality_requirements:
    - clear_unit_goal
    - action_or_emotion_start
    - action_or_emotion_change
    - landing_point
    - next_unit_entry
    - duration_between_5_and_15_seconds
```

### 4.4 `beat-structure-library.md`

建议内容：

```yaml
beat_required_fields:
  beat_id:
  beat_purpose:
  duration_range:
  action_progression:
  emotion_progression:
  information_release:
  space_change:
  continuity_from_previous_beat:
  continuity_to_next_beat:
  suggested_shot_count:

beat_count_reference:
  five_second_unit: 2-3
  eight_second_unit: 3-4
  ten_second_unit: 3-5
  twelve_second_unit: 4-6
  fifteen_second_unit: 5-7
```

### 4.5 `shot-type-library.md`

建议基础镜头类型枚举：

```yaml
shot_type_library:
  establishing_shot: 建立镜头
  entrance_shot: 进入镜头
  action_trigger_shot: 动作触发镜头
  action_process_shot: 动作过程镜头
  action_landing_shot: 动作落点镜头
  reaction_shot: 反应镜头
  relationship_shot: 关系镜头
  emotional_pause_shot: 情绪停顿镜头
  prop_insert_shot: 道具插入镜头
  transition_bridge_shot: 转场桥接镜头
  climax_emphasis_shot: 高潮强化镜头
  ending_hold_shot: 结尾定格镜头

extended_shot_type_library:
  misdirection_shot:
  punchline_landing_shot:
  texture_closeup_shot:
  result_display_shot:
  pressure_closeup_shot:
  environment_change_shot:
  voyeur_shot:
  pov_shot:
  over_shoulder_reverse_shot:
  low_angle_pressure_shot:
  high_angle_vulnerability_shot:
  extreme_negative_space_shot:
```

### 4.6 `rhythm-type-shot-combo-library.md`

建议内容：

```yaml
rhythm_type_library:
  slow_emotional_scene:
    use_for: [孤独, 失落, 治愈, 思考, 回忆]
    recommended_combo:
      - establishing_shot
      - relationship_shot
      - emotional_pause_shot
      - prop_insert_shot
      - reaction_shot
      - ending_hold_shot
    risks:
      - shots_too_fragmented
      - emotion_no_progression
      - beautiful_but_no_story
      - overacting

  normal_story_progression:
    recommended_combo:
      - establishing_shot
      - entrance_shot
      - action_trigger_shot
      - relationship_shot
      - reaction_shot
      - transition_bridge_shot

  fast_action_scene:
    recommended_combo:
      - entrance_shot
      - action_trigger_shot
      - action_process_shot
      - action_landing_shot
      - reaction_shot
      - climax_emphasis_shot

  comedy_reversal_scene:
    recommended_combo:
      - establishing_shot
      - misdirection_shot
      - action_trigger_shot
      - reaction_shot
      - punchline_landing_shot
      - ending_hold_shot

  suspense_tension_scene:
    recommended_combo:
      - establishing_shot
      - prop_insert_shot
      - emotional_pause_shot
      - relationship_shot
      - reaction_shot
      - climax_emphasis_shot

  product_ad_scene:
    recommended_combo:
      - establishing_shot
      - prop_insert_shot
      - action_process_shot
      - texture_closeup_shot
      - result_display_shot
      - ending_hold_shot

  confrontation_scene:
    recommended_combo:
      - establishing_shot
      - relationship_shot
      - reaction_shot
      - pressure_closeup_shot
      - emotional_pause_shot
      - ending_hold_shot

  montage_transition_scene:
    recommended_combo:
      - establishing_shot
      - transition_bridge_shot
      - action_process_shot
      - prop_insert_shot
      - environment_change_shot
      - ending_hold_shot
```

### 4.7 `shot-density-reference.md`

建议内容：

```yaml
shot_density_reference:
  five_seconds:
    low: 2-3
    medium: 3-4
    high: 4-6
  eight_seconds:
    low: 3-4
    medium: 4-6
    high: 6-8
  ten_seconds:
    low: 4-5
    medium: 6-8
    high: 8-12
  twelve_seconds:
    low: 5-6
    medium: 7-9
    high: 9-12
  fifteen_seconds:
    low: 6-8
    medium: 8-12
    high: split_preferred
```

### 4.8 `continuity-control-library.md`

建议内容：

```yaml
continuity_anchor_fields:
  previous_left:
  current_picks_up:
  current_leaves:
  next_should_pick_up:

space_continuity_map_fields:
  space_type:
  main_axis:
  initial_character_positions:
  character_movement_range:
  key_prop_positions:
  camera_activity_area:
  forbidden_axis_crossing:
  foreground_midground_background:
  available_camera_positions:
  unavailable_camera_positions:
  previous_unit_spatial_handoff:
  next_unit_spatial_handoff:

action_chain_fields:
  preparation:
  trigger:
  process:
  landing:
  reaction:
  next_action_entry:

emotion_chain_fields:
  emotion_start:
  emotion_trigger:
  emotion_shift:
  emotion_peak:
  emotion_landing:
  next_emotion_entry:
```

### 4.9 `storyboard-dual-version-prompt-library.md`

建议内容：

```yaml
dual_version_storyboard_policy:
  source_data: same_structured_beat_and_shot_data
  control_version:
    purpose:
      - camera_order
      - action_continuity
      - blocking
      - camera_movement
      - rhythm
      - continuity
    visual_style:
      - black_white_pencil_sketch
      - director_control_storyboard
      - low_detail_high_readability
    must_include_final_style_note: true
  styled_version:
    purpose:
      - final_visual_style
      - lighting
      - color
      - material
      - character_consistency
      - scene_consistency
    must_preserve_control_info:
      - shot_number
      - key_action
      - camera_movement
      - composition_intent
      - continuity_note
```

### 4.10 `video-prompt-translation-library.md`

建议内容：

```yaml
storyboard_reference_usage_statement:
  use_reference_for:
    - shot_order
    - character_action
    - blocking
    - camera_movement
    - composition
    - narrative_rhythm
  do_not_preserve:
    - storyboard_grid
    - panel_border
    - shot_number
    - arrows
    - labels
    - pencil_sketch_style
  final_video_must_use:
    - specified_final_style
    - character_assets
    - scene_assets
    - lighting
    - color
    - material_texture
```

### 4.11 `storyboard-quality-checklist.md`

建议内容：

```yaml
storyboard_quality_checklist:
  narrative:
    - unit_goal_is_clear
    - beat_has_progression
    - every_shot_serves_goal
    - no_beautiful_but_useless_shot
  rhythm:
    - duration_between_5_and_15_seconds
    - panel_count_matches_rhythm_intensity
    - slow_scene_not_too_fragmented
    - fast_scene_not_too_sparse
  action:
    - action_chain_complete
    - no_action_jump
    - exit_state_matches_next_entry
  emotion:
    - emotion_start_clear
    - emotion_change_progressive
    - peak_has_setup
    - landing_can_enter_next_unit
  space:
    - character_positions_stable
    - prop_positions_stable
    - no_unmotivated_axis_crossing
    - layout_consistent
  anchor:
    - opening_anchor_picks_up_previous
    - closing_anchor_leaves_next_entry
    - gaze_prop_or_composition_hook_exists
  assets:
    - character_consistent
    - costume_hair_prop_no_drift
    - scene_matches_design
  style:
    - control_version_does_not_mislead_final_style
    - styled_version_preserves_control_info
    - lighting_color_texture_consistent
  video_executability:
    - storyboard_reference_usage_declared
    - no_panel_border_number_arrow_in_final_video
    - model_adapter_applied_when_needed
```

### 4.12 `model-adaptation-library.md`

建议内容：

```yaml
model_adaptation_library:
  jimeng_kling_like:
    focus:
      - strict_storyboard_order
      - no_skipping_shots
      - clear_reference_usage
      - avoid_storyboard_artifacts
      - control_shot_count
  seedance_like:
    structure:
      - FORMAT
      - SUBJECTS
      - SETTING
      - ACTION_SEQUENCE
      - CAMERA
      - SOUND
      - CONTINUITY
  sora_veo_like:
    focus:
      - natural_cinematic_paragraph
      - physical_causality
      - stable_spatial_geography
      - smooth_emotional_progression
      - avoid_over_numbered_prompt
```

---

## 5. 项目黑板协议建议

### 5.1 新增顶层字段

建议在 `PROJECT_BOARD.md` 顶层新增：

```yaml
storyboard_methodology_v7:
  enabled: true
  confirmation_status: pending_storyboard_methodology_confirmation | confirmed | disabled
  assets:
    video_generation_unit_library: assets/storyboard-methodology/video-generation-unit-library.md
    beat_structure_library: assets/storyboard-methodology/beat-structure-library.md
    shot_type_library: assets/storyboard-methodology/shot-type-library.md
    rhythm_type_shot_combo_library: assets/storyboard-methodology/rhythm-type-shot-combo-library.md
    shot_density_reference: assets/storyboard-methodology/shot-density-reference.md
    continuity_control_library: assets/storyboard-methodology/continuity-control-library.md
    storyboard_dual_version_prompt_library: assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
    video_prompt_translation_library: assets/storyboard-methodology/video-prompt-translation-library.md
    storyboard_quality_checklist: assets/storyboard-methodology/storyboard-quality-checklist.md
    model_adaptation_library: assets/storyboard-methodology/model-adaptation-library.md
  default_policy:
    require_video_generation_units: true
    require_opening_closing_anchor_frames: true
    require_space_continuity_map: true
    require_action_chain: true
    require_emotion_chain: true
    require_continuity_anchors_per_shot: true
    require_dual_version_storyboard_for_high_risk_units: true
    require_storyboard_reference_usage_statement: true
    require_quality_check_before_video_prompt: true
```

### 5.2 更新 `context_policy.allowed_runtime_asset_paths`

建议加入：

```yaml
context_policy:
  allowed_runtime_asset_paths:
    - assets/storyboard-methodology/video-generation-unit-library.md
    - assets/storyboard-methodology/beat-structure-library.md
    - assets/storyboard-methodology/shot-type-library.md
    - assets/storyboard-methodology/rhythm-type-shot-combo-library.md
    - assets/storyboard-methodology/shot-density-reference.md
    - assets/storyboard-methodology/continuity-control-library.md
    - assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
    - assets/storyboard-methodology/video-prompt-translation-library.md
    - assets/storyboard-methodology/storyboard-quality-checklist.md
    - assets/storyboard-methodology/model-adaptation-library.md
```

注意：仍不得把 `docs/` 加入执行期读取白名单。

---

## 6. 各阶段 SOP 整改建议

### 6.1 `scene-forge` 总控

#### 需要改造的点

1. 初始化新项目时写入 `storyboard_methodology_v7` 顶层字段；
2. 更新 `context_policy.allowed_runtime_asset_paths`；
3. 继续坚持只执行 `next_stage`，不因为 v7 增加链路而一口气连跑多个阶段；
4. 不代替子 Skill 设计具体分镜。

#### SOP 补充

```text
如果项目启用 storyboard_methodology_v7，总控只负责传递该字段、开放对应资产库读取路径，并确保 scene-storyboard-director 和 scene-video-prompt-builder 在需要时按需读取。总控不得直接生成 Beat、Shot、故事板 Prompt 或视频 Prompt。
```

### 6.2 `scene-asset-checker`

#### 当前问题

资产检查偏“是否有资产 / 需要什么资产”，但方法论要求资产锁定可执行化。

#### 建议新增资产卡字段

```yaml
asset_lock:
  characters:
    - character_id:
      name:
      age_gender_body:
      face_hair_features:
      costume:
      accessories:
      typical_expression:
      typical_action:
      identity_temperament:
      required_views:
        - front
        - side
        - back
        - three_quarter
        - expression_sheet
        - action_pose
      forbidden_changes:
  scenes:
    - scene_id:
      era_location_time:
      spatial_layout:
      key_zones:
      main_props:
      light_source:
      color_palette:
      materials:
      available_camera_positions:
      forbidden_changes:
  props:
    - prop_id:
      appearance:
      size:
      material:
      color:
      usage:
      featured_shots:
      closeup_need:
      state_machine_required:
      forbidden_changes:
  style:
    final_style:
    character_style:
    scene_style:
    lighting_style:
    color_style:
    camera_feel:
    texture_keywords:
    forbidden_styles:
```

### 6.3 `scene-design-builder`

#### 建议补强

1. 在场景设计阶段产出 `space_continuity_seed`；
2. 在角色关系复杂时产出 `faction_layout`；
3. 对关键道具默认建立 `prop_state_machines`；
4. 对多段视频提前定义可用机位与不可用机位。

建议输出：

```yaml
space_continuity_seed:
  space_type:
  main_axis:
  key_zones:
  initial_character_positions:
  prop_positions:
  camera_activity_area:
  forbidden_axis_crossing:
  foreground_midground_background:
  available_camera_positions:
  unavailable_camera_positions:
```

### 6.4 `scene-script-adapter`

#### 建议补强

1. 把完整剧本拆成 `video_generation_units` 初稿；
2. 每个 Unit 先按动作 / 情绪完整性切，不机械按时间切；
3. 产出 Beat 标准字段；
4. 标记每个 Beat 的建议 Shot 数与节奏强度。

建议输出：

```yaml
video_generation_unit_plan:
  - unit_id:
    duration_seconds:
    unit_goal:
    content_summary:
    rhythm_type:
    rhythm_intensity:
    suggested_panel_count:
    split_reason:
    opening_anchor_hint:
    closing_anchor_hint:
    covered_beats:
```

### 6.5 `scene-performance-director`

#### 建议补强

把表演阶段输出从“角色怎么演”升级为可被分镜继承的动作链和情绪链。

```yaml
action_continuity_chains:
  - chain_id:
    related_beat:
    preparation:
    trigger:
    process:
    landing:
    reaction:
    next_action_entry:

emotion_continuity_chains:
  - chain_id:
    related_beat:
    emotion_start:
    emotion_trigger:
    emotion_shift:
    emotion_peak:
    emotion_landing:
    next_emotion_entry:
```

### 6.6 `scene-storyboard-director`

这是 v7 改造核心。

#### 新 SOP 顺序

```text
1. 读取 PROJECT_BOARD.md 与必要输入。
2. 读取 v7 方法论资产库，按需读取，不全量读取。
3. 校验 segment_strategy 和 video_generation_unit_plan。
4. 为每个 Unit 建立开头衔接帧和结尾交接帧。
5. 为每个 Unit 建立空间连续性地图。
6. 读取 / 生成 Beat 标准表。
7. 将 Beat 拆成 storyboard_content_breakdown。
8. 为内容单元生成 cinematic_language_plan。
9. 为每个 Shot 补齐入镜状态、核心动作、出镜状态、下一镜头交接。
10. 生成 continuity_anchors。
11. 根据节奏类型和强度校验镜头密度。
12. 生成控制版故事板 Prompt。
13. 按需生成风格版故事板 Prompt。
14. 执行故事板质量检查。
15. 用户确认后落盘完整 shotlist、prompt 和 YAML 补丁。
```

#### 建议新增输出

```yaml
storyboard_methodology_v7_output:
  video_generation_units:
  unit_anchor_frames:
  space_continuity_maps:
  beat_tables:
  shot_type_usage:
  shot_continuity_anchors:
  action_chain_mapping:
  emotion_chain_mapping:
  rhythm_density_check:
  dual_version_storyboard:
    control_prompt_file:
    styled_prompt_file:
    source_data_consistency: same_structured_shot_data
  quality_check_result:
    passed:
    warnings:
    required_fixes:
```

### 6.7 `scene-video-prompt-builder`

#### 建议补强

在每个 Segment Prompt 中新增：

```yaml
segment_prompt:
  storyboard_reference_usage:
    use_for:
      - shot_order
      - action_continuity
      - blocking
      - camera_movement
      - narrative_rhythm
    do_not_preserve:
      - storyboard_grid
      - panel_border
      - shot_number
      - arrows
      - labels
      - sketch_style
  opening_anchor_frame:
  closing_anchor_frame:
  space_continuity:
  action_continuity:
  emotion_continuity:
  shot_execution_order:
  final_style:
  model_adapter:
```

并允许输出：

```text
outputs/video_prompts/general_segment_prompts_v*.md
outputs/video_prompts/seedance_adapter_prompts_v*.md
outputs/video_prompts/kling_jimeng_adapter_prompts_v*.md
outputs/video_prompts/sora_veo_adapter_prompts_v*.md
```

是否输出模型适配版本可以由用户确认或项目配置决定。

---

## 7. 推荐文件落地计划

### Phase 1：docs 设计文档落地

新增：

```text
docs/SceneForge-v7-Storyboard-Methodology-Optimization-Plan.md
```

目的：给人阅读，作为本轮整改总方案。

### Phase 2：执行期资产库落地

新增：

```text
assets/storyboard-methodology/video-generation-unit-library.md
assets/storyboard-methodology/beat-structure-library.md
assets/storyboard-methodology/shot-type-library.md
assets/storyboard-methodology/rhythm-type-shot-combo-library.md
assets/storyboard-methodology/shot-density-reference.md
assets/storyboard-methodology/continuity-control-library.md
assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
assets/storyboard-methodology/video-prompt-translation-library.md
assets/storyboard-methodology/storyboard-quality-checklist.md
assets/storyboard-methodology/model-adaptation-library.md
```

### Phase 3：总控协议改造

修改：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

目标：加入 `storyboard_methodology_v7` 顶层字段和资产读取白名单。

### Phase 4：分镜导演协议改造

修改：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

目标：加入 Unit、Anchor、Space、Action、Emotion、Dual Storyboard、Checklist。

### Phase 5：视频提示词构建协议改造

修改：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

目标：加入故事板参考用途声明、双版故事板继承、模型适配层。

### Phase 6：上游阶段协议补强

视当前文件存在情况修改：

```text
.agents/skills/scene-asset-checker/references/output-contract.md
.agents/skills/scene-design-builder/references/output-contract.md
.agents/skills/scene-script-adapter/references/output-contract.md
.agents/skills/scene-performance-director/references/output-contract.md
```

目标：让资产、Beat、表演、空间数据能被分镜阶段稳定继承。

---

## 8. 验收标准

### 8.1 协议层验收

1. 新项目 `PROJECT_BOARD.md` 包含 `storyboard_methodology_v7`；
2. `context_policy.allowed_runtime_asset_paths` 包含 v7 资产库；
3. `docs/` 仍不进入运行时上下文；
4. 所有新增枚举遵守开放参考原则。

### 8.2 分镜阶段验收

一个合格的 `scene-storyboard-director` 输出必须包含：

```text
视频生成单元列表；
每个单元的首尾衔接帧；
每个单元的空间连续性地图；
Beat 表；
Shot 表；
Shot 连续性锚点；
动作链映射；
情绪链映射；
节奏密度检查；
控制版故事板 Prompt；
关键片段或高风险片段的风格版故事板 Prompt；
故事板质量检查结果。
```

### 8.3 视频提示词阶段验收

每个 Segment Prompt 必须包含：

```text
故事板参考用途声明；
不要保留分镜边框、编号、箭头、文字、草图风格的负向说明；
最终画风覆盖说明；
资产一致性；
开头承接画面；
结尾交接画面；
空间连续性；
动作连续性；
情绪连续性；
镜头执行顺序；
声音 / 音效 / BGM；
模型适配说明，如果项目要求。
```

### 8.4 质量验收

输出前必须通过：

```text
叙事检查；
节奏检查；
动作检查；
情绪检查；
空间检查；
首尾检查；
资产检查；
风格检查；
视频可执行性检查。
```

---

## 9. 建议优先级

| 优先级 | 事项 | 原因 |
|---|---|---|
| P0 | 在 docs 落地本整改方案 | 先统一人类理解 |
| P0 | 新增 `storyboard-quality-checklist.md` | 立即提升输出稳定性 |
| P0 | 改造 `scene-storyboard-director` 的 Unit / Anchor / Space / Shot 连续性字段 | 最直接解决视频断裂、站位漂移、动作跳步 |
| P1 | 新增 `storyboard-dual-version-prompt-library.md` | 解决控制版 / 风格版混淆 |
| P1 | 改造 `scene-video-prompt-builder` 的故事板参考用途声明 | 避免视频模型保留分镜格、编号、箭头、草图风格 |
| P1 | 新增 `shot-type-library.md` 和 `rhythm-type-shot-combo-library.md` | 提升镜头功能选择稳定性 |
| P2 | 新增模型适配库 | 让不同视频模型的 prompt 更可控 |
| P2 | 上游资产卡和表演链补强 | 提升长项目一致性 |

---

## 10. 最终建议

SceneForge 不需要把方法论变成一份超长 prompt，而应该把它拆进三层：

```text
docs/：人类理解与实施计划
assets/storyboard-methodology/：执行期可读的轻量枚举库、模板库、检查库
.agents/skills/**/references/：每个阶段真正执行的 SOP 和输出协议
```

最小可行整改路径是：

```text
1. 先落地本 docs 方案；
2. 再新增 storyboard-methodology 资产库；
3. 然后优先改 scene-storyboard-director；
4. 再改 scene-video-prompt-builder；
5. 最后补齐上游 asset / design / script / performance 阶段。
```

这样不会破坏当前 v4/v5/v6 架构，反而会让已有字段获得更清晰的控制目标：

```text
source_intake 负责理解源视频；
asset_lock 负责锁定角色、场景、道具和风格；
story_beats 负责叙事节奏；
video_generation_units 负责生成切段；
shotlist 负责镜头执行；
continuity_anchors 负责前后衔接；
dual_version_storyboard 负责控制图和风格图；
video_prompt_translation 负责把故事板转成模型可执行说明；
quality_checklist 负责减少返工。
```

一句话总结：

> v7 的重点不是“再加一个分镜模板”，而是把 SceneForge 从“能生成分镜提示词”升级为“能稳定控制多段 AI 视频生成的故事板生产系统”。
