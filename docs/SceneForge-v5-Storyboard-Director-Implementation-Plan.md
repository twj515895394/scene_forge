# SceneForge v5：分镜导演能力增强实施计划

日期：2026-06-02

> 本文档是 v5 实施计划。
>
> 依据：
>
> - `docs/SceneForge-v5-Storyboard-Director-Research-Framework.md`
> - `docs/SceneForge-v5-Animation-Film-Shot-Language-Study.md`
>
> v5 目标：把 `scene-storyboard-director` 从普通 shot list 生成器升级为“专业分镜导演”，具备剧本内容拆分、影视镜头语言转换、动画电影镜头资产选择三层能力。

---

## 1. v5 核心定位

v4 已解决：

```text
动画表现力：动画物理、轻中度卡通伤害、反差喜剧、VFX、声音钩子。
```

v5 要解决：

```text
专业镜头语言：先把剧本拆成可拍内容单元，再把内容单元转换成影视级分镜镜头。
```

v5 的核心能力链：

```text
script_to_storyboard_content
-> storyboard_content_to_cinematic_language
-> cinematic_language_asset_selection
-> storyboard_prompt_and_video_prompt_handoff
```

也就是：

1. **剧本内容拆分**：把 Story Beat 拆成可拍的分镜内容单元。
2. **镜头语言转换**：为每个内容单元选择景别、机位、构图、镜头运动、剪辑节奏和视觉动机。
3. **资产库选择**：从动画电影镜头语言资产库中选择合适模式。
4. **下游继承**：把专业镜头语言传给故事板 prompt、声音导演和视频分段 prompt。

---

## 2. 不做什么

v5 不做：

```text
不复制具体电影镜头。
不绑定某部电影作为 prompt 风格。
不把参考片段硬编码进协议。
不让每个镜头都套模板。
不让 docs 成为运行时上下文。
```

v5 只做：

```text
把可迁移的镜头语言原则资产化，
并让分镜导演在合适场景按需采纳。
```

---

## 3. 目录职责

继续遵守 v4 的上下文边界。

```yaml
docs:
  role: 人类阅读、研究说明、实施计划
  runtime_readable: false

assets:
  role: 执行期可读取的镜头语言资产库
  runtime_readable: true

.agents/skills/**/references:
  role: Skill 稳定执行协议、输出字段、阶段规则
  runtime_readable: true

PROJECT_BOARD.md:
  role: 当前项目唯一状态源、用户确认、跨阶段记忆
  runtime_readable: true
```

新增执行期资产目录：

```text
assets/cinematic-language/
```

---

## 4. v5 新增资产库

### 4.1 `shot-language-library.md`

路径：

```text
assets/cinematic-language/shot-language-library.md
```

职责：基础镜头语言枚举与使用规则。

建议内容：

```yaml
shot_scale_library:
  extreme_wide:
  wide:
  full:
  medium:
  medium_close:
  close_up:
  extreme_close_up:
  insert:

camera_angle_library:
  eye_level:
  low_angle:
  high_angle:
  overhead:
  dutch:
  over_shoulder:
  pov:

composition_library:
  centered:
  rule_of_thirds:
  symmetrical:
  asymmetrical:
  negative_space:
  foreground_frame:
  silhouette:
  deep_staging:
  scale_contrast_depth:

movement_library:
  locked:
  pan:
  tilt:
  push_in:
  pull_out:
  tracking:
  orbit:
  crane:
  whip_pan:

edit_rhythm_library:
  slow_hold:
  reaction_pause:
  reveal_cut:
  action_continuity:
  quick_cut:
  match_cut:
  montage:
```

### 4.2 `animation-film-shot-patterns.md`

路径：

```text
assets/cinematic-language/animation-film-shot-patterns.md
```

职责：动画电影视觉叙事与情绪镜头模式。

建议内容：

```yaml
animation_film_shot_patterns:
  character_reveal:
  emotional_closeup:
  silent_visual_storytelling:
  object_memory_montage:
  world_scale_reveal:
  micro_world_low_angle:
  fluid_environment_staging:
  musical_emotional_stage:
  abstract_emotion_space_crosscut:
  cinematic_scifi_scale:
```

### 4.3 `animation-comedy-action-patterns.md`

路径：

```text
assets/cinematic-language/animation-comedy-action-patterns.md
```

职责：动作喜剧、反差喜剧、多尺度世界和类型片调度模式。

建议内容：

```yaml
animation_comedy_action_patterns:
  villain_softening_reveal:
  tiny_prop_contrast_insert:
  silent_body_comedy:
  action_comedy_chase:
  power_specific_camera:
  clear_action_geography:
  family_action_crosscut:
  superhero_pose_then_release:
  multi_scale_world_reveal:
  buddy_spatial_dialogue:
  district_transition:
  investigation_visual_chain:
```

---

## 5. 新增顶层协议建议

v5 不一定需要新增完整顶层大字段，但建议在 `PROJECT_BOARD.md` 中新增一个轻量字段：

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
```

说明：

- v5 主要增强 `scene-storyboard-director`，不必像 v4 那样横跨全部阶段新增大字段。
- 但需要在黑板中保存是否启用 v5 分镜增强，以及允许读取的镜头语言资产路径。
- `confirmation_status` 只表示分镜方案确认状态，不替代已有 `user_confirmations.storyboard_plan_confirmed`。

---

## 6. Phase 1：资产库落地

目标：先把 v5 镜头语言资产库落到 `assets/`，作为执行期可读资源。

新增文件：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

验收标准：

1. 资产库不按电影名组织，而按镜头功能组织。
2. 每个 pattern 包含：
   - `purpose`
   - `best_for`
   - `structure`
   - `shot_language`
   - `avoid`
   - `prompt_fragment_cn` 或 `storyboard_note_cn`
3. 资产库中不能出现“照搬某部电影镜头”的描述。
4. 资产库可被 `scene-storyboard-director` 按需读取。

---

## 7. Phase 2：总控与黑板协议改造

改造范围：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

任务：

1. 将 `assets/cinematic-language/*` 加入允许按需读取的执行期资产白名单。
2. 在 `PROJECT_BOARD.md` 模板中加入 `storyboard_director_v5` 轻量字段。
3. 明确 `storyboard_director_v5` 不替代 v4 的 `expressive_animation`，而是增强分镜阶段。
4. 仍禁止运行时读取 `docs/` 和 `.handoff/`。

验收标准：

- 新项目初始化时包含 `storyboard_director_v5`。
- 总控知道 v5 资产库可由分镜导演按需读取。
- v5 资产库不会被所有阶段默认读取。

---

## 8. Phase 3：scene-storyboard-director 协议改造

改造范围：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

核心新增字段：

```yaml
storyboard_content_breakdown:
  - unit_id:
    source_beat_id:
    unit_type:
    story_content:
    character_focus:
    action_focus:
    emotional_function:
    comedic_function:
    required_visual_information:
    required_audio_information:
    required_continuity:
    suggested_duration_seconds:
    downstream_priority:

cinematic_language_plan:
  - unit_id:
    shot_id:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    staging_depth:
    blocking_intent:
    lighting_intent:
    color_intent:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
```

执行规则：

1. 先拆 `storyboard_content_breakdown`，再生成 `shot_highlights`。
2. 每个关键镜头必须有 `visual_motivation`。
3. 使用资产库模式时必须记录 `selected_shot_pattern` 和 `reason`。
4. 不得直接写“参考某电影镜头”。
5. v4 表现力镜头仍要保留，但要被 v5 镜头语言承载。

验收标准：

- 分镜方案预览能说明“先拆内容，再转镜头语言”。
- 正式分镜中出现 `storyboard_content_breakdown` 和 `cinematic_language_plan`。
- `shot_highlights` 能从 `cinematic_language_plan` 派生。

---

## 9. Phase 4：scene-video-prompt-builder 协议改造

改造范围：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

新增继承字段：

```yaml
segment_prompt:
  camera_language:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
```

任务：

1. 最终 Segment Prompt 必须继承 `cinematic_language_plan`。
2. 每段 prompt 不仅写“角色做什么”，还要写“如何拍”和“观众应看哪里”。
3. 如果使用 v5 资产模式，prompt 中要抽象描述镜头结构，不出现具体电影名绑定。

验收标准：

- Segment Prompt 中出现专业镜头语言字段。
- `visual_motivation` 被转化为自然语言导演说明。
- 不丢失 v4 `animation_physics`、`injury_tone`、`contrast_comedy` 和 `expressive_audio` 字段。

---

## 10. Phase 5：README 与 handoff 更新

改造范围：

```text
README.md
.handoff/*
```

任务：

1. README 增加 v5 分镜导演增强状态。
2. handoff 记录资产库、协议、测试注意事项。
3. 明确 v5 仍然只输出提示词、制作说明和分镜方案，不生成图像或视频。

验收标准：

- README 能说明 v4 / v5 的职责区别。
- handoff 能让下一轮开发直接接上。

---

## 11. Phase 6：v5 Protocol Review

新增文档：

```text
docs/SceneForge-v5-Protocol-Review.md
```

检查项：

1. `storyboard_director_v5` 是否进入模板和 board protocol。
2. `assets/cinematic-language/*` 是否进入执行期白名单。
3. `scene-storyboard-director` 是否严格先拆内容再转镜头。
4. `scene-video-prompt-builder` 是否继承镜头语言。
5. v4 与 v5 字段是否冲突。
6. `docs/` 和 `.handoff/` 是否仍被禁止运行时读取。
7. 是否存在模板堆叠风险。

验收标准：

```text
可以进入最小项目测试。
```

---

## 12. Phase 7：最小项目测试建议

建议测试片段：

```text
20-30 秒动作喜剧 / 家庭反差短片段。
```

必须包含：

1. 一个角色反差设定；
2. 一个动作喜剧或追逐单元；
3. 一个轻中度卡通伤害结果；
4. 一个情绪停顿；
5. 一个道具或声音反差；
6. 至少 2 个 Story Beat；
7. 至少 3 个 storyboard units；
8. 至少 3 个 cinematic_language_plan 条目。

观察点：

- 分镜导演是否先拆 `storyboard_content_breakdown`；
- 是否为每个关键镜头写 `visual_motivation`；
- 是否选择合适 `selected_shot_pattern`；
- 是否避免堆模板；
- 最终 Segment Prompt 是否继承镜头语言。

---

## 13. 实施顺序建议

推荐顺序：

```text
1. 新增 assets/cinematic-language/*
2. 修改 board protocol / project-board-template / scene-forge/SKILL.md
3. 修改 scene-storyboard-director
4. 修改 scene-video-prompt-builder
5. 更新 README 和 handoff
6. 新增 v5 Protocol Review
7. 做最小项目测试
```

不要先改 `scene-video-prompt-builder`，因为它依赖分镜阶段新增的 `cinematic_language_plan`。

---

## 14. 风险与控制

### 14.1 风险：模板堆叠

问题：分镜导演可能为了“专业”给每个镜头都套 pattern。

控制：

```yaml
storyboard_director_v5:
  default_policy:
    avoid_template_stack: true
```

并要求每个 `selected_shot_pattern` 必须写 `reason`。

### 14.2 风险：资产库变成电影模仿库

问题：资产库按电影名组织，会导致模仿具体电影。

控制：资产库按镜头功能组织，不按电影名组织。

### 14.3 风险：分镜表过长

问题：`storyboard_content_breakdown` 与 `cinematic_language_plan` 增加信息量。

控制：完整内容落 `details/shotlist_v*.md`，黑板只保留摘要和路径。

### 14.4 风险：v4 与 v5 字段混乱

控制：

```text
v4 回答“可以用什么动画表现”。
v5 回答“这个表现应该怎么拍”。
```

---

## 15. 完成标准

v5 完成时应满足：

1. 分镜导演能先拆剧本内容单元。
2. 分镜导演能将内容单元转成专业镜头语言。
3. 分镜导演能从资产库选择镜头模式，并说明原因。
4. 视频提示词阶段能继承镜头语言。
5. v4 表现力字段不丢失。
6. 执行期资产库放在 `assets/`，不读取 `docs/`。
7. 协议层 review 通过。
8. 最小项目测试可以跑通。

---

## 16. 一句话总结

```text
SceneForge v5 的目标是让分镜导演先懂“要拍什么”，再懂“怎么拍”，最后把专业镜头语言稳定传递到故事板和视频提示词阶段。
```
