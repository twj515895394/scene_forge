# SceneForge v4 Review 完成与 v5 分镜导演增强交接

日期：2026-06-02

## 1. 当前交接目的

本 handoff 用于记录：

1. v4 `Expressive Animation Extension` 当前已完成状态。
2. `PROJECT_BOARD.md` 初始化模板与全面 review 已完成。
3. v5 分镜导演增强的研究框架、镜头语言研究、实施计划与第一轮协议落地已完成。
4. 下一阶段可直接进入最小项目测试。

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

## 3. v4 Review 结论

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

## 4. v5 研究、计划与实施状态

v5 方向已从研究、计划推进到第一轮协议落地。

### 4.1 v5 研究文档

已新增：

```text
docs/SceneForge-v5-Storyboard-Director-Research-Framework.md
docs/SceneForge-v5-Animation-Film-Shot-Language-Study.md
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

### 4.2 v5 实施计划

已新增：

```text
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
```

v5 目标：

```text
让分镜导演先懂“要拍什么”，再懂“怎么拍”，最后把专业镜头语言稳定传递到故事板和视频提示词阶段。
```

### 4.3 v5 Protocol Review

已新增：

```text
docs/SceneForge-v5-Protocol-Review.md
```

结论：

```text
SceneForge v5 专业分镜导演增强协议层已完成第一轮落地。
当前状态可以进入最小项目测试。
```

---

## 5. v5 已完成实施清单

### Phase 1：资产库落地，已完成

新增执行期资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

定位：

```text
shot-language-library.md：基础景别、机位、构图、镜头运动和剪辑节奏。
animation-film-shot-patterns.md：动画电影视觉叙事、情绪、世界观、少对白和舞台化镜头模式。
animation-comedy-action-patterns.md：动作喜剧、反差喜剧、多尺度世界、团队动作和类型片调度镜头模式。
```

### Phase 2：总控与黑板协议改造，已完成

已改造：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

新增顶层字段：

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

### Phase 3：分镜导演协议改造，已完成

已改造：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

新增核心字段：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
selected_shot_pattern:
visual_motivation:
```

分镜导演流程升级为：

```text
story_beats / performance_sheet
-> storyboard_content_breakdown
-> cinematic_language_plan
-> shot_highlights / shotlist / storyboard_prompts
```

### Phase 4：视频提示词协议改造，已完成

已改造：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

Segment Prompt 现在必须继承：

```yaml
camera_language:
  shot_scale:
  camera_angle:
  composition:
  lens_feel:
  camera_movement:
  staging_depth:
  edit_rhythm:
  visual_motivation:
  selected_shot_pattern:
```

### Phase 5：README 与 handoff 更新，已完成

已更新：

```text
README.md
.handoff/2026-06-02-sceneforge-v4-review-and-v5-storyboard-director-handoff.md
```

### Phase 6：v5 Protocol Review，已完成

已新增：

```text
docs/SceneForge-v5-Protocol-Review.md
```

### Phase 7：最小项目测试，未执行

下一步应进入最小项目测试。

---

## 6. v5 参考片单与资产化原则

参考片单不是为了模仿具体电影，而是为了提炼可迁移镜头模式。

重点研究组：

```text
动作喜剧 + 家庭反差：Despicable Me / Minions / The Incredibles
世界观尺度 + 类型片结构：Zootopia / A Bug's Life / Toy Story / Finding Nemo
少对白视觉叙事 + 情绪镜头：WALL·E / Up / Inside Out / Coco
更电影化动作规格：Lightyear / The Incredibles 2
```

资产化原则：

```text
按镜头功能组织，不按电影名组织。
每个 pattern 必须说明 purpose / best_for / structure / shot_language / avoid。
使用时必须写 selected_shot_pattern 和 reason。
运行时输出不得写“模仿某部电影镜头”。
```

---

## 7. v5 测试建议

建议最小测试项目包含：

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
- 最终 Segment Prompt 是否继承镜头语言；
- 最终 Prompt 是否仍包含 v4 的动画物理、伤害尺度、反差喜剧和负向边界。

---

## 8. 风险与控制

### 8.1 模板堆叠风险

控制：

```yaml
storyboard_director_v5:
  default_policy:
    avoid_template_stack: true
    require_pattern_reason: true
```

### 8.2 电影模仿风险

控制：

```text
资产库按镜头功能组织，不按电影名组织。
不在执行期输出中写“模仿某电影镜头”。
```

### 8.3 v4 / v5 字段混乱风险

控制：

```text
v4 回答“可以用什么动画表现”。
v5 回答“这个表现应该怎么拍”。
```

---

## 9. 下一步建议

当前不建议继续改协议。建议先测试。

下一步：

```text
Phase 7：最小项目测试
```

测试通过后再考虑：

1. 为 `assets/cinematic-language/*` 增加更多示例 prompt fragment。
2. 给 `scene-audio-director` 增加对 v5 镜头语言的声音辅助字段。
3. 根据真实测试结果补 v5 migration note。
4. 考虑添加纯 YAML 的 PROJECT_BOARD 初始化模板，便于脚本复制。

---

## 10. 一句话总结

```text
v4 已完成动画表现力协议；
v5 已完成专业分镜导演增强协议第一轮落地；
下一步应进入最小项目测试，而不是继续盲目扩协议。
```
