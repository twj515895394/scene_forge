# SceneForge v5 Open Reference 与协议全链路 Review

日期：2026-06-02

## 1. Review 目的

本次 review 检查以下事项：

1. 用户手动复制后的 `scene-forge/SKILL.md` 是否已正确接入 `open-reference`。
2. `reference_policy` 是否进入 `PROJECT_BOARD` 初始化模板。
3. `board-protocol.md` 是否已承认 `reference_policy` 顶层字段。
4. v4 / v5 协议是否仍保持边界清晰。
5. 分镜导演与视频提示词阶段是否能继承 v5 镜头语言。
6. 是否存在阻塞最小项目测试的问题。

---

## 2. 总控 Skill 检查

检查文件：

```text
.agents/skills/scene-forge/SKILL.md
```

结论：通过。

已确认：

1. 已包含 `references/open-reference.md`。
2. 已新增“开放参考原则”。
3. 已说明模板、示例、枚举、资产库 pattern 和 prompt fragment 都是参考锚点，不是封闭集合。
4. 已支持：

```yaml
selection_mode: reference | adapted_reference | custom_generated
```

5. 已清理手动复制时带入的 `manual_copy_target` frontmatter 字段。

---

## 3. Open Reference 文件检查

检查文件：

```text
.agents/skills/scene-forge/references/open-reference.md
assets/open-reference.md
```

结论：通过。

核心规则：

```text
SceneForge templates, examples, enum values, asset patterns, and prompt fragments are starting points, not final limits.
```

说明：

- `references/open-reference.md` 供总控 Skill 读取。
- `assets/open-reference.md` 可作为资产层轻量说明保留。

---

## 4. PROJECT_BOARD 模板检查

检查文件：

```text
.agents/skills/scene-forge/references/project-board-template.md
```

结论：通过。

已确认新增：

```yaml
reference_policy:
  templates_are_reference_only: true
  examples_are_reference_only: true
  enums_are_open_by_default: true
  strict_enum_only_when_explicit: true
  allow_adapted_reference: true
  allow_custom_generated_option: true
  require_reason_for_custom_option: true
```

解释：

```text
模板、示例、枚举和 pattern 是创作起点，不是创作上限；找不到合适参考项时，Agent 应根据项目语境生成更合适方案并说明原因。
```

---

## 5. Board Protocol 检查

检查文件：

```text
.agents/skills/scene-forge/references/board-protocol.md
```

结论：通过。

已确认：

1. 顶层字段列表已包含：

```yaml
reference_policy:
```

2. `v3+ 顶层字段说明` 已包含 `reference_policy` 默认结构。
3. 已新增“开放参考原则：`reference_policy`”章节。
4. 已说明开放参考不改变确认闸门、运行时读取边界、阶段输出协议和安全边界。

---

## 6. v4 / v5 字段关系检查

当前并存字段：

```yaml
reference_policy:
expressive_animation:
storyboard_director_v5:
```

职责区别：

```text
reference_policy：解释模板、枚举和 pattern 是否开放。
expressive_animation：回答“可以用什么动画表现”。
storyboard_director_v5：回答“这个表现应该怎么拍”。
```

结论：无冲突。

---

## 7. 分镜导演协议检查

检查文件：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

结论：通过。

已确认分镜流程为：

```text
story_beats / performance_sheet
-> storyboard_content_breakdown
-> cinematic_language_plan
-> shot_highlights / shotlist / storyboard_prompts
```

已确认核心字段：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
selected_shot_pattern:
visual_motivation:
```

说明：

- v5 资产库 pattern 是可用参考。
- 若没有合适 pattern，应结合 `reference_policy` 允许 `custom_generated`。
- 使用 pattern 时仍需 reason，不能机械套模板。

---

## 8. 视频提示词协议检查

检查文件：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

结论：通过。

Segment Prompt 已要求继承：

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

并明确：

```text
不得写“模仿某部电影镜头”；只能写抽象镜头结构、景别、机位、构图、镜头运动、剪辑节奏和视觉动机。
```

---

## 9. 执行期资产检查

v4 执行期资产：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

v5 执行期资产：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

辅助说明资产：

```text
assets/open-reference.md
```

结论：通过。

说明：`assets/open-reference.md` 当前不强依赖读取，因为总控已有 `.agents/skills/scene-forge/references/open-reference.md`。

---

## 10. 仍需注意的小点

### 10.1 `SKILL.manual-copy.md`

当前仓库中仍保留：

```text
.agents/skills/scene-forge/SKILL.manual-copy.md
```

它是手动复制备份文件，不参与正式运行。

建议：

```text
可以保留作为手动备份，也可以后续删除。
```

### 10.2 assets/open-reference.md 未进入 allowed_runtime_asset_paths

`PROJECT_BOARD` 模板中的 `allowed_runtime_asset_paths` 未列入：

```text
assets/open-reference.md
```

但这不阻塞，因为正式总控参考文件是：

```text
.agents/skills/scene-forge/references/open-reference.md
```

---

## 11. 测试建议

现在建议进入最小项目测试。

测试片段建议：

```text
20-30 秒动作喜剧 / 家庭反差短片段。
```

必须覆盖：

1. 一个角色反差设定；
2. 一个动作喜剧或追逐单元；
3. 一个轻中度卡通伤害结果；
4. 一个情绪停顿；
5. 一个道具或声音反差；
6. 至少 2 个 Story Beat；
7. 至少 3 个 storyboard units；
8. 至少 3 个 cinematic_language_plan 条目；
9. 至少 1 个 `custom_generated` 或 `adapted_reference`，用于验证开放参考原则。

---

## 12. 最终结论

```text
SceneForge 当前总控、黑板模板、board protocol、v4 表现力协议、v5 分镜导演协议、视频提示词协议与 open-reference 原则已完成对齐。

当前没有发现阻塞最小项目测试的问题。
```
