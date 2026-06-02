# SceneForge v4 Review 完成与 v5 分镜导演增强交接

日期：2026-06-02

## 1. 当前交接目的

本 handoff 用于记录：

1. v4 `Expressive Animation Extension` 当前已完成状态。
2. `PROJECT_BOARD.md` 初始化模板与全面 review 已完成。
3. 下个阶段 v5 的重点方向：增强 `scene-storyboard-director` 的分镜导演能力。
4. v5 需要新增的分镜镜头语言资产库与研究任务。

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

### 3.1 设计与计划文档

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

## 5. v4 测试前注意事项

建议测试用一个 20-30 秒轻喜剧动作片段，包含：

```text
1 个角色反差设定
1 个动画物理动作
1 个轻中度卡通伤害后果
1 个声音反差
2-3 个 Story Beat
```

重点观察：

1. 新建项目黑板是否正确包含 `expressive_animation`。
2. `scene-design-builder` 是否先输出 v4 表现力策略预览，而不是直接落盘。
3. 用户确认后，`confirmation_status` 是否从 `pending_design_confirmation` 变为 `confirmed`。
4. 剧本阶段是否只识别少量机会点，而不是每个 Beat 都加特效。
5. 表演阶段是否写出完整动作节奏。
6. 分镜阶段是否能镜头化 reveal / impact / hold。
7. 声音阶段是否避免写实伤害声。
8. 视频 prompt 是否包含正向表达和负向边界。

---

## 6. v5 方向：增强分镜导演能力

用户提出的 v5 方向：

```text
分镜导演应该具备两部分，或者更准确地说三层能力：

1. 先把剧本拆分成分镜内容，也就是把剧本内容转成可拍的分镜叙事单元。
2. 再根据分镜内容转换成专业影视级镜头语言。
3. 研究皮克斯热门、有特色的动画电影，在镜头语言方面提炼可复用资产，加入资产库供分镜导演采纳。
```

这意味着 v5 不只是继续给 `scene-storyboard-director` 加字段，而是要把它拆成更明确的内部能力链：

```text
script_to_storyboard_content
-> storyboard_content_to_cinematic_language
-> cinematic_language_asset_selection
```

---

## 7. v5 对 scene-storyboard-director 的核心改造方向

### 7.1 第一层：剧本内容拆分能力

当前 `scene-storyboard-director` 已经消费 `story_beats` 和表演表，但还需要更明确地把剧本内容转成“分镜内容”。

建议新增能力：

```yaml
storyboard_content_breakdown:
  input:
    - story_beats
    - performance_sheet
    - script_file
  output:
    - storyboard_units
    - action_units
    - reaction_units
    - reveal_units
    - transition_units
```

要解决的问题：

- 一个 Story Beat 可能太大，不能直接变成镜头。
- 一个 Beat 内部可能包含动作、反应、情绪变化、道具状态、空间变化。
- 分镜导演需要先拆成“可拍的内容单元”，再选择镜头。

建议新增分镜内容单元：

```yaml
storyboard_units:
  - unit_id:
    source_beat_id:
    unit_type: action | reaction | emotion_shift | reveal | transition | insert | environment_response
    story_content:
    character_focus:
    action_focus:
    emotional_function:
    required_visual_information:
    required_continuity:
    suggested_duration_seconds:
```

### 7.2 第二层：影视级镜头语言转换能力

将 `storyboard_units` 转为镜头语言。

建议新增能力：

```yaml
cinematic_shot_language:
  shot_scale:
  camera_angle:
  composition:
  lens_feel:
  camera_movement:
  staging_depth:
  lighting_intent:
  color_intent:
  edit_rhythm:
  visual_motivation:
```

要解决的问题：

- 不能只写“中景、推镜、角色做动作”。
- 要说明为什么用这个景别、机位、运动和构图。
- 要把镜头语言与情绪、角色关系、喜剧节奏、动作安全和 v4 表现力结合。

建议镜头语言字段：

```yaml
shot_language:
  shot_scale: extreme_wide | wide | full | medium | medium_close | close_up | extreme_close_up | insert
  camera_angle: eye_level | low_angle | high_angle | overhead | dutch | over_shoulder | pov
  composition: centered | rule_of_thirds | symmetrical | asymmetrical | deep_staging | foreground_frame | silhouette | negative_space
  lens_feel: wide_comic_space | normal_observational | telephoto_isolation | macro_miniature | imax_scale
  camera_movement: locked | pan | tilt | push_in | pull_out | tracking | orbit | handheld_feel | crane | whip_pan
  staging_depth: flat_graphic | layered_depth | foreground_midground_background | crowd_depth | scale_contrast_depth
  edit_rhythm: slow_hold | reaction_pause | quick_cut | match_cut | reveal_cut | action_continuity | montage
  visual_motivation:
```

### 7.3 第三层：镜头语言资产选择能力

新增执行期资产库，用于分镜导演按需读取：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
```

职责：

- 通用镜头语言枚举。
- 动画电影分镜模式。
- 皮克斯式或动画长片常见镜头策略的抽象化模式。
- 不能直接写“模仿某部电影镜头”，要写可迁移的镜头原则。

---

## 8. v5 候选资产库内容

### 8.1 通用镜头语言库

建议文件：

```text
assets/cinematic-language/shot-language-library.md
```

可包含：

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

movement_library:
  locked:
  push_in:
  pull_out:
  pan:
  tilt:
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

### 8.2 动画电影镜头模式库

建议文件：

```text
assets/cinematic-language/animation-film-shot-patterns.md
```

可包含：

```yaml
animation_shot_patterns:
  character_reveal:
  emotional_closeup:
  comedy_reaction_hold:
  physical_comedy_impact:
  scale_contrast_reveal:
  prop_insert_payoff:
  environment_reaction:
  chase_spatial_continuity:
  silent_visual_storytelling:
  montage_emotional_progression:
```

---

## 9. v5 皮克斯镜头语言研究方向

需要研究皮克斯热门、有特色的动画电影，但必须注意：

```text
不要把某部电影的具体镜头、角色或受版权保护表达复制进资产库；
只提炼可迁移的镜头语言原则。
```

建议研究样本：

1. `Toy Story`：玩具尺度、低机位、儿童房空间、物体 POV。
2. `A Bug's Life`：昆虫视角、草丛微观世界、低机位和遮挡形成的微观空间感。
3. `Finding Nemo`：水下空间、流动环境、深度层次和环境运动。
4. `The Incredibles`：动作片镜头、家庭戏与超级英雄动作之间的节奏切换。
5. `Ratatouille`：厨房调度、主观感官表达、食物与空间节奏。
6. `WALL·E`：少对白视觉叙事、沉默表演、孤独空间与机械角色情绪表达。
7. `Up`：情绪蒙太奇、物体承载记忆、冒险空间与角色关系变化。
8. `Inside Out`：抽象心理空间、情绪角色与现实世界交叉剪辑。
9. `Coco`：舞台化表演、音乐空间、色彩和纵深人群调度。
10. `Lightyear`：更电影化的科幻规格、大画幅感、飞行与宇宙空间镜头。

初步公开资料提示：

- `A Bug's Life` 制作中曾使用类似 “Bugcam” 的低视角参考，帮助团队理解昆虫视角下草叶、花瓣形成的微观空间和半透明遮蔽感。
- `WALL·E` 以少对白、视觉叙事、声音设计和浪漫场面被广泛评价。
- `Lightyear` 的制作资料中提到更电影化、厚重的科幻视觉方向，并使用虚拟 IMAX 摄影机流程。

这些只能作为 v5 研究起点，不能直接变成最终资产库结论。v5 需要进一步整理成可执行的抽象模式。

---

## 10. v5 分镜导演输出协议建议

建议在 `scene-storyboard-director/references/output-contract.md` 中新增：

```yaml
storyboard_content_breakdown:
  - unit_id:
    source_beat_id:
    unit_type:
    story_content:
    character_focus:
    action_focus:
    emotional_function:
    required_visual_information:
    required_continuity:
    suggested_duration_seconds:

cinematic_language_plan:
  - unit_id:
    shot_id:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    staging_depth:
    lighting_intent:
    color_intent:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
```

现有 `shot_highlights` 可以保留，但应接收 `cinematic_language_plan` 的结果。

---

## 11. v5 实施计划建议

### Phase 1：v5 设计文档

新增：

```text
docs/SceneForge-v5-Storyboard-Director-System.md
```

内容：

- 分镜导演双层/三层能力模型。
- 剧本内容拆分协议。
- 镜头语言转换协议。
- 动画电影镜头资产库规划。

### Phase 2：新增镜头语言资产库

新增：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
```

### Phase 3：修改 board protocol 与总控白名单

允许按需读取：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
```

仍禁止读取：

```text
docs/
.handoff/
```

### Phase 4：修改 scene-storyboard-director

改造：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

增加：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
shot_language:
selected_shot_pattern:
```

### Phase 5：修改 scene-video-prompt-builder

让最终视频 prompt 继承分镜阶段的专业镜头语言：

```yaml
camera_language:
composition:
lens_feel:
camera_movement:
edit_rhythm:
visual_motivation:
```

### Phase 6：Review 与最小测试

测试目标：

```text
同一个 Story Beat 能否先拆成分镜内容单元，
再转换成专业镜头语言，
最后进入 Segment Prompt。
```

---

## 12. v5 关键设计原则

1. 分镜不是直接把剧本句子改成镜头。
2. 分镜导演必须先理解“这个 Beat 内部有哪些可拍内容单元”。
3. 镜头语言必须服务叙事功能、情绪功能和视觉信息传递。
4. 动画电影分镜可以更强调角色表演、视觉反差、环境反应和情绪节奏。
5. 皮克斯/动画电影研究只抽象镜头原则，不复制具体电影表达。
6. 镜头语言资产库应该是执行期可读资产，放 `assets/`，不是 `docs/`。
7. `scene-storyboard-director` 应该成为“内容拆分 + 镜头语言转换”的专业导演，而不是普通 shot list 生成器。

---

## 13. 下一步建议

下个阶段建议直接开始：

```text
v5 Phase 1：生成 docs/SceneForge-v5-Storyboard-Director-System.md
```

然后再开始：

```text
v5 Phase 2：生成 assets/cinematic-language/* 镜头语言资产库
```

在真正改 `scene-storyboard-director` 之前，建议先完成皮克斯/动画电影镜头语言研究，把可迁移原则转成资产库结构，避免直接在 Skill 协议里堆零散经验。
