# SceneForge v5 协议层 Review 报告

日期：2026-06-02

## 1. Review 范围

本次 review 覆盖 v5 `Professional Storyboard Director System` 第一轮实施后的协议层一致性。

检查范围：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md

.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md

.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md

.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md

README.md
```

关联 v5 研究与计划文档：

```text
docs/SceneForge-v5-Storyboard-Director-Research-Framework.md
docs/SceneForge-v5-Animation-Film-Shot-Language-Study.md
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
```

---

## 2. Review 结论

当前 v5 协议层已完成第一轮落地，具备最小项目测试条件。

结论：

```text
可以进入最小项目测试。
```

测试重点：

1. 分镜阶段是否先生成 `storyboard_content_breakdown`。
2. 分镜阶段是否再生成 `cinematic_language_plan`。
3. 每个关键镜头是否有 `visual_motivation`。
4. 使用资产库 pattern 时是否写明 `selected_shot_pattern.reason`。
5. 视频提示词阶段是否继承 `camera_language` 和 `visual_motivation`。
6. 运行时是否仍禁止读取 `docs/` 和 `.handoff/`。

---

## 3. 已完成文件

### 3.1 执行期资产库

已新增：

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

结论：通过。

### 3.2 总控与黑板协议

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

结论：通过。

### 3.3 分镜导演协议

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

结论：通过。

### 3.4 视频提示词协议

已改造：

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
    staging_depth:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
```

结论：通过。

---

## 4. 字段贯通检查

### 4.1 顶层字段

已贯通：

```yaml
storyboard_director_v5:
  enabled:
  confirmation_status:
  assets:
  default_policy:
```

存在位置：

- `project-board-template.md`
- `board-protocol.md`
- `scene-forge/SKILL.md`
- `scene-storyboard-director/references/output-contract.md`
- `scene-video-prompt-builder/references/output-contract.md`
- `README.md`

结论：通过。

### 4.2 执行期资产白名单

已贯通：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

存在位置：

- `project-board-template.md`
- `board-protocol.md`
- `scene-forge/SKILL.md`
- `scene-storyboard-director/SKILL.md`
- `scene-storyboard-director/references/output-contract.md`
- `scene-video-prompt-builder/SKILL.md`
- `scene-video-prompt-builder/references/output-contract.md`
- `README.md`

结论：通过。

### 4.3 禁止运行时读取路径

仍保持：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

结论：通过。

---

## 5. v5 分镜链路检查

### 5.1 内容拆分链路

要求：

```text
Story Beat 不能直接跳成 shot list。
```

已加入：

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

结论：通过。

### 5.2 镜头语言转换链路

已加入：

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

结论：通过。

### 5.3 视频提示词继承链路

已加入：

```yaml
cinematic_language_prompting:
  global_camera_language_note:
  global_visual_motivation_note:
  global_selected_pattern_note:
  per_segment:
    - segment_id:
      camera_language:
      storyboard_units:
      prompt_camera_direction:
```

Segment Prompt 已要求包含 `camera_language`。

结论：通过。

---

## 6. 资产库安全与调性边界检查

### 6.1 不按电影名组织

资产库以功能组织：

```text
character_reveal
silent_visual_storytelling
action_comedy_chase
clear_action_geography
multi_scale_world_reveal
```

没有按电影名组织。

结论：通过。

### 6.2 不复刻具体电影镜头

资产库均声明：

```text
只使用抽象镜头结构，不复制具体电影镜头。
```

结论：通过。

### 6.3 避免模板堆叠

已加入：

```yaml
avoid_template_stack: true
require_pattern_reason: true
```

结论：通过。

---

## 7. 与 v4 的关系检查

v4：

```text
回答“可以用什么动画表现”。
```

v5：

```text
回答“这个表现应该怎么拍”。
```

两个字段并存：

```yaml
expressive_animation:
storyboard_director_v5:
```

分镜阶段同时继承：

```yaml
expressive_animation_inheritance:
storyboard_director_v5_inheritance:
```

视频提示词阶段同时继承：

```yaml
expressive_animation_prompting:
cinematic_language_prompting:
```

结论：未发现字段冲突。

---

## 8. 测试建议

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

## 9. 当前遗留事项

当前没有发现阻塞最小项目测试的协议问题。

可选优化：

1. 为 `assets/cinematic-language/*` 增加更多示例 prompt fragment。
2. 给 `scene-audio-director` 增加对 v5 镜头语言的声音辅助字段，例如 `camera_language_audio_hints` 的更细定义。
3. 后续在真实测试后补 v5 migration note。
4. 可考虑添加一个纯 YAML 的 PROJECT_BOARD 初始化模板，便于脚本复制。

---

## 10. 最终结论

```text
SceneForge v5 专业分镜导演增强协议层已完成第一轮落地。
当前状态可以进入最小项目测试。
```
