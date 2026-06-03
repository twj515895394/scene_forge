# SceneForge v8：AI 视频故事板方法论整改优化方案

> 生成日期：2026-06-03  
> 版本定位：v8 / Storyboard Generation Methodology Integration  
> 版本说明：仓库已有 7.x / 7.2 迭代线，本方案不应命名为 v7；应作为 v7.2 之后的下一轮重大方法论整合，统一命名为 v8。  
> 目标仓库：`twj515895394/scene_forge`  
> 建议落点：`docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md`

---

## 0. 修正说明

上一版误将本方案命名为 `SceneForge-v7-Storyboard-Methodology-Optimization-Plan.md`。考虑到仓库已有 7.x / 7.2 迭代线，本方案应归入 v8。

本方案的内容定位不是 v7 小补丁，而是一次新的方法论级升级：把《AI 视频故事板生成方法论 v1.0》中的视频生成单元、资产锁定、Beat、Shot、连续性锚点、空间连续性地图、同源双版故事板、视频提示词转译、模型适配和质量检查体系，系统嵌入 SceneForge 当前 v4/v5/v6 架构。

因此建议命名为：

```text
SceneForge v8：AI 视频故事板生成控制链升级
```

一句话目标：

> 把 SceneForge 从“能生成分镜提示词”升级为“能稳定控制多段 AI 视频生成的故事板生产系统”。

---

## 1. 当前项目现状判断

SceneForge 当前已经具备较完整的提示词生产系统骨架：

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

已有能力可以概括为：

1. **v4 表现力扩展**：通过 `expressive_animation` 处理动画风格化、轻中度卡通伤害、反差喜剧、动画 VFX、环境反应和声音钩子。
2. **v5 专业分镜导演增强**：通过 `storyboard_content_breakdown`、`cinematic_language_plan`、`shot_highlights`、`segments`、`hero_moments`、`bridge_shots`、`blocking_map`、`faction_layout`、`prop_state_machines` 建立镜头语言与分镜能力。
3. **v6 Source Intake**：通过 `source_intake`、`topic_gate_handoff_v1.md`、`source_video_priority_map_v1.md` 把视频源解析转成后续创作链路可继承的结构。

当前最适合承接方法论的阶段是：

```text
scene-script-adapter
scene-performance-director
scene-storyboard-director
scene-video-prompt-builder
```

其中 `scene-storyboard-director` 是 v8 的核心改造点。

---

## 2. 对照方法论后的核心缺口

### 2.1 Segment 还没有完全升级为“视频生成单元”

当前项目已有：

```yaml
segment_strategy:
segment_duration_seconds:
segments:
```

但方法论要求每个视频生成单元必须有：

```text
片段目标；
动作或情绪起点；
动作或情绪变化；
小落点；
下一片段入口；
5-15 秒时长边界；
开头衔接帧；
结尾交接帧；
空间连续性地图。
```

因此 v8 应把 `segments` 强化为 `video_generation_units`，或者在 `segments` 下补充同等字段。

### 2.2 Beat 层字段还不够标准化

方法论中的 Beat 不是普通剧情摘要，而是分镜节奏骨架。建议标准字段为：

```yaml
beat_id:
beat_purpose:
duration_range_seconds:
action_progression:
emotion_progression:
information_release:
space_change:
continuity_from_previous_beat:
continuity_to_next_beat:
suggested_shot_count:
```

### 2.3 Shot 层缺少强制“入镜 / 出镜 / 交接”

当前 v5 shotlist 已经有镜头语言，但应补强：

```yaml
shot_continuity:
  previous_left:
  current_picks_up:
  entry_state:
  core_action:
  exit_state:
  next_handoff:
```

这样才能降低视频生成中的动作跳步、站位漂移和镜头断裂。

### 2.4 连续性系统需要升维

现有 `continuity_rules` 需要升级成四线模型：

```yaml
continuity_control_system:
  rhythm_continuity:
  action_continuity:
  emotion_continuity:
  space_continuity:
```

对应方法论中的：

```text
Beat 控节奏；
Action 控动作；
Emotion 控表演；
Space 控空间。
```

### 2.5 同源双版故事板尚未协议化

v8 应明确采用：

```text
一套结构化 Beat + Shot 数据
├─ 控制版故事板 Prompt
└─ 风格版故事板 Prompt
```

控制版解决镜头顺序、动作承接、站位关系、运镜方向、节奏推进和连续性控制。

风格版解决最终画风、光影、色彩、质感、角色一致性和场景一致性。

两版必须同源，不能各自生成两套分镜数据。

### 2.6 视频提示词转译层需要更明确

`scene-video-prompt-builder` 应在每个 Segment Prompt 中明确：

```text
参考故事板只用于理解镜头顺序、人物动作、站位关系、运镜方向、构图关系和叙事节奏。
不要生成分镜表格。
不要保留故事板边框。
不要保留 Shot 编号。
不要保留箭头、标注文字或草图痕迹。
不要把控制版草图风格当成最终成片风格。
最终视频必须使用指定最终画风。
```

---

## 3. 建议新增执行期资产库

建议新增：

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

这些文件不是 `docs/` 说明文档，而是执行期可读取资产库。建议遵守：

```yaml
asset_type: executable_reference
runtime_readable: true
templates_are_reference_only: true
enums_are_open_by_default: true
```

### 3.1 `video-generation-unit-library.md`

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
  required_fields:
    - unit_goal
    - rhythm_type
    - rhythm_intensity
    - opening_anchor_frame
    - closing_anchor_frame
    - space_continuity_map
```

### 3.2 `beat-structure-library.md`

```yaml
beat_required_fields:
  beat_id:
  beat_purpose:
  duration_range_seconds:
  action_progression:
  emotion_progression:
  information_release:
  space_change:
  continuity_from_previous_beat:
  continuity_to_next_beat:
  suggested_shot_count:
```

### 3.3 `shot-type-library.md`

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
```

### 3.4 `rhythm-type-shot-combo-library.md`

建议覆盖：

```yaml
rhythm_type_library:
  slow_emotional_scene:
  normal_story_progression:
  fast_action_scene:
  comedy_reversal_scene:
  suspense_tension_scene:
  product_ad_scene:
  confrontation_scene:
  montage_transition_scene:
```

### 3.5 `shot-density-reference.md`

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

### 3.6 `continuity-control-library.md`

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

### 3.7 `storyboard-dual-version-prompt-library.md`

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

### 3.8 `video-prompt-translation-library.md`

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

### 3.9 `storyboard-quality-checklist.md`

检查维度：

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

### 3.10 `model-adaptation-library.md`

建议覆盖：

```yaml
model_adaptation_library:
  jimeng_kling_like:
    focus:
      - strict_storyboard_order
      - no_skipping_shots
      - avoid_storyboard_artifacts
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
```

---

## 4. 黑板协议建议

建议新增顶层字段：

```yaml
storyboard_methodology_v8:
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

同时更新：

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

注意：`docs/` 仍不应进入运行时读取白名单。

---

## 5. 各 Skill 改造重点

### 5.1 `scene-forge`

负责：

```text
初始化 storyboard_methodology_v8；
开放 v8 资产库读取路径；
继续只执行 PROJECT_BOARD.md 中的 next_stage；
不得代替子 Skill 生成具体 Beat、Shot、故事板或视频 Prompt。
```

### 5.2 `scene-asset-checker`

补强资产锁定字段：

```yaml
asset_lock:
  characters:
  scenes:
  props:
  style:
```

每类资产都应包含 `forbidden_changes`。

### 5.3 `scene-design-builder`

补强：

```yaml
space_continuity_seed:
  space_type:
  main_axis:
  key_zones:
  initial_character_positions:
  prop_positions:
  camera_activity_area:
  forbidden_axis_crossing:
  available_camera_positions:
  unavailable_camera_positions:
```

### 5.4 `scene-script-adapter`

新增：

```yaml
video_generation_unit_plan:
  - unit_id:
    duration_seconds:
    unit_goal:
    rhythm_type:
    rhythm_intensity:
    suggested_panel_count:
    opening_anchor_hint:
    closing_anchor_hint:
    covered_beats:
```

### 5.5 `scene-performance-director`

新增：

```yaml
action_continuity_chains:
  - preparation:
    trigger:
    process:
    landing:
    reaction:
    next_action_entry:

emotion_continuity_chains:
  - emotion_start:
    emotion_trigger:
    emotion_shift:
    emotion_peak:
    emotion_landing:
    next_emotion_entry:
```

### 5.6 `scene-storyboard-director`

v8 核心 SOP：

```text
1. 校验 video_generation_unit_plan。
2. 为每个 Unit 建立开头衔接帧和结尾交接帧。
3. 为每个 Unit 建立空间连续性地图。
4. 读取 / 生成 Beat 标准表。
5. 将 Beat 拆成 storyboard_content_breakdown。
6. 生成 cinematic_language_plan。
7. 为每个 Shot 补齐 entry_state / core_action / exit_state / next_handoff。
8. 生成 continuity_anchors。
9. 根据 rhythm_type 和 rhythm_intensity 检查镜头密度。
10. 生成控制版故事板 Prompt。
11. 对关键片段、高风险片段、首尾片段生成风格版故事板 Prompt。
12. 执行 storyboard_quality_checklist。
13. 用户确认后落盘完整 shotlist、prompt 和 YAML 补丁。
```

### 5.7 `scene-video-prompt-builder`

每个 Segment Prompt 必须包含：

```yaml
storyboard_reference_usage:
opening_anchor_frame:
closing_anchor_frame:
space_continuity:
action_continuity:
emotion_continuity:
shot_execution_order:
final_style:
model_adapter:
```

并明确不要保留分镜格、编号、箭头、文字和草图风格。

---

## 6. 推荐落地阶段

### Phase 1：文档修正

新增本文件：

```text
docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md
```

删除或废弃误命名文件：

```text
docs/SceneForge-v7-Storyboard-Methodology-Optimization-Plan.md
```

### Phase 2：资产库落地

新增：

```text
assets/storyboard-methodology/*.md
```

### Phase 3：总控与黑板协议改造

修改：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

### Phase 4：分镜导演协议改造

修改：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

### Phase 5：视频提示词构建协议改造

修改：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

### Phase 6：上游阶段补强

按需修改：

```text
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
```

---

## 7. 验收标准

### 7.1 协议层

```text
PROJECT_BOARD.md 包含 storyboard_methodology_v8；
context_policy.allowed_runtime_asset_paths 包含 v8 资产库；
docs/ 仍不进入运行时上下文；
新增枚举遵守开放参考原则。
```

### 7.2 分镜阶段

合格输出必须包含：

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
关键 / 高风险片段的风格版故事板 Prompt；
故事板质量检查结果。
```

### 7.3 视频提示词阶段

每个 Segment Prompt 必须包含：

```text
故事板参考用途声明；
不要保留分镜边框、编号、箭头、文字、草图风格；
最终画风覆盖说明；
资产一致性；
开头承接画面；
结尾交接画面；
空间连续性；
动作连续性；
情绪连续性；
镜头执行顺序；
声音 / 音效 / BGM；
模型适配说明。
```

---

## 8. 最终建议

v8 不应再理解为“分镜 prompt 模板升级”，而应理解为 SceneForge 的故事板生成控制链升级。

建议最终形成：

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

> SceneForge v8 的重点，是把故事板从“好看的分镜图提示词”升级成“可检查、可转译、可复用、可降低抽卡成本的视频生成控制系统”。
