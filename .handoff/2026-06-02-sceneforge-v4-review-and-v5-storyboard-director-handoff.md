# SceneForge v4 Review 完成与 v5 分镜导演增强交接

日期：2026-06-02

## 1. 当前交接目的

本 handoff 用于记录：

1. v4 `Expressive Animation Extension` 当前已完成状态。
2. `PROJECT_BOARD.md` 初始化模板与全面 review 已完成。
3. v5 分镜导演增强的研究框架、镜头语言研究和实施计划已落库。
4. 下一阶段可直接按 v5 实施计划开始资产库和协议改造。

---

## 2. v4 当前状态

v4 已完成第一轮协议落地。

统一顶层字段：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

核心能力：

1. 动画电影级夸张物理与 VFX。
2. 动画动作喜剧里的轻中度卡通伤害尺度。
3. 反差喜剧与角色记忆点设计。
4. 从设计、剧本、表演、分镜、声音到视频 prompt 的跨阶段继承。

执行期资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

运行时仍禁止读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

---

## 3. v4 已完成文件清单

### 3.1 设计、计划与 review 文档

```text
docs/SceneForge-v4-Animation-Stylization-System.md
docs/SceneForge-v4-Animation-Stylization-Effect-Library.md
docs/SceneForge-v4-Expressive-Extension-System.md
docs/SceneForge-v4-Implementation-Plan.md
docs/SceneForge-v4-Protocol-Review.md
```

### 3.2 执行期资产库

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

### 3.3 总控与黑板协议

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/expressive-animation-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

### 3.4 各阶段 Skill / output-contract

```text
.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-design-builder/references/output-contract.md

.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-script-adapter/references/output-contract.md

.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-performance-director/references/output-contract.md

.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md

.agents/skills/scene-audio-director/SKILL.md
.agents/skills/scene-audio-director/references/output-contract.md

.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

---

## 4. v4 Review 结论

最新 review 结论见：

```text
docs/SceneForge-v4-Protocol-Review.md
```

结论：

```text
SceneForge v4 表现力扩展协议层已完成初始化模板与全面 review。
当前状态可以进入最小项目测试。
```

已确认：

```text
PROJECT_BOARD 模板：已补
confirmation_status 字段：已对齐
总控初始化流程：已对齐
执行期资产白名单：已对齐
docs/.handoff 禁止读取边界：仍保持
各阶段 v4 字段交接：已贯通
```

---

## 5. v5 研究与计划当前状态

v5 方向已从“想法”整理为三份文档。

### 5.1 v5 分镜导演研究框架

已新增：

```text
docs/SceneForge-v5-Storyboard-Director-Research-Framework.md
```

核心定义：

```text
script_to_storyboard_content
-> storyboard_content_to_cinematic_language
-> cinematic_language_asset_selection
```

也就是：

```text
剧本内容拆分能力
+ 影视镜头语言转换能力
+ 动画电影镜头资产选择能力
```

### 5.2 v5 动画电影镜头语言研究

已新增：

```text
docs/SceneForge-v5-Animation-Film-Shot-Language-Study.md
```

参考方向包括：

```text
Despicable Me / 神偷奶爸系列
Minions / 小黄人系列
The Incredibles / 超能总动员系列
Zootopia / 疯狂动物城
Toy Story
A Bug's Life
Finding Nemo
WALL·E
Up
Inside Out
Coco
Lightyear
```

研究原则：

```text
不复制具体电影镜头、角色或受版权保护表达；
只提炼可迁移的镜头语言原则。
```

### 5.3 v5 分镜导演实施计划

已新增：

```text
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
```

v5 目标：

```text
让分镜导演先懂“要拍什么”，再懂“怎么拍”，最后把专业镜头语言稳定传递到故事板和视频提示词阶段。
```

---

## 6. v5 核心改造方向

v5 不只是继续给 `scene-storyboard-director` 加字段，而是要把它升级为“专业分镜导演”。

核心能力链：

```text
script_to_storyboard_content
-> storyboard_content_to_cinematic_language
-> cinematic_language_asset_selection
-> storyboard_prompt_and_video_prompt_handoff
```

### 6.1 第一层：剧本内容拆分

建议新增：

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
```

目的：

```text
先把 Story Beat 拆成 action / reaction / emotion_shift / reveal / transition / insert / environment_response / contrast_payoff 等可拍内容单元。
```

### 6.2 第二层：影视镜头语言转换

建议新增：

```yaml
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

目的：

```text
不能只写“中景、推镜、角色做动作”，而要说明为什么这样拍。
```

### 6.3 第三层：镜头语言资产选择

建议新增执行期资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

这些资产库应按镜头功能组织，而不是按电影名组织。

---

## 7. v5 实施计划摘要

完整计划见：

```text
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
```

推荐实施顺序：

```text
1. 新增 assets/cinematic-language/*
2. 修改 board protocol / project-board-template / scene-forge/SKILL.md
3. 修改 scene-storyboard-director
4. 修改 scene-video-prompt-builder
5. 更新 README 和 handoff
6. 新增 v5 Protocol Review
7. 做最小项目测试
```

### Phase 1：资产库落地

新增：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

### Phase 2：总控与黑板协议改造

改造：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

新增轻量字段建议：

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

### Phase 3：分镜导演协议改造

改造：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

新增：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
selected_shot_pattern:
visual_motivation:
```

### Phase 4：视频提示词协议改造

改造：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

让 Segment Prompt 继承：

```yaml
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

### Phase 5：README 与 handoff 更新

更新：

```text
README.md
.handoff/*
```

### Phase 6：v5 Protocol Review

新增：

```text
docs/SceneForge-v5-Protocol-Review.md
```

### Phase 7：最小项目测试

测试重点：

```text
同一个 Story Beat 能否先拆成分镜内容单元，
再转换成专业镜头语言，
最后进入 Segment Prompt。
```

---

## 8. v5 参考片单与资产化原则

参考片单不是为了模仿具体电影，而是为了提炼可迁移镜头模式。

重点研究组：

```text
动作喜剧 + 家庭反差：Despicable Me / Minions / The Incredibles
世界观尺度 + 类型片结构：Zootopia / A Bug's Life / Toy Story / Finding Nemo
少对白视觉叙事 + 情绪镜头：WALL·E / Up / Inside Out / Coco
更电影化动作规格：Lightyear / The Incredibles 2
```

可资产化模式示例：

```yaml
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
silent_visual_storytelling:
emotional_montage_memory_object:
cinematic_scifi_scale:
```

资产化原则：

```text
按镜头功能组织，不按电影名组织。
每个 pattern 必须说明 purpose / best_for / structure / shot_language / avoid。
使用时必须写 selected_shot_pattern 和 reason。
```

---

## 9. v5 风险与控制

### 9.1 模板堆叠风险

风险：为了专业感，每个镜头都套 pattern。

控制：

```yaml
storyboard_director_v5:
  default_policy:
    avoid_template_stack: true
```

并要求每个 `selected_shot_pattern` 必须写 `reason`。

### 9.2 电影模仿风险

风险：资产库变成“模仿某部电影”。

控制：

```text
资产库按镜头功能组织，不按电影名组织。
不在执行期输出中写“模仿某电影镜头”。
```

### 9.3 分镜表膨胀风险

风险：`storyboard_content_breakdown` 和 `cinematic_language_plan` 增加信息量。

控制：

```text
完整内容落 details/shotlist_v*.md，黑板只保留摘要和路径。
```

### 9.4 v4 / v5 字段混乱风险

控制：

```text
v4 回答“可以用什么动画表现”。
v5 回答“这个表现应该怎么拍”。
```

---

## 10. 下一步建议

下一步可以直接开始 v5 实施：

```text
v5 Phase 1：新增 assets/cinematic-language/* 镜头语言资产库
```

然后继续：

```text
v5 Phase 2：修改 board protocol / project-board-template / scene-forge/SKILL.md
v5 Phase 3：修改 scene-storyboard-director
v5 Phase 4：修改 scene-video-prompt-builder
v5 Phase 5：更新 README 和 handoff
v5 Phase 6：生成 v5 Protocol Review
v5 Phase 7：最小项目测试
```

当前不建议直接测试，因为 v5 的执行期资产库和协议改造还没完成。v4 可测试，v5 还处在“研究与实施计划已完成、待执行实施”的状态。

---

## 11. 一句话总结

```text
v4 已完成动画表现力协议；
v5 已完成分镜导演研究框架、镜头语言研究和实施计划；
下一步应从 assets/cinematic-language/* 资产库落地开始执行 v5。
```
