# SceneForge v4 协议层 Review 报告

日期：2026-06-02

## 1. Review 范围

本次 review 覆盖 v4 `Expressive Animation Extension` 第一轮实施后的协议层一致性。

检查范围：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/expressive-animation-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
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
README.md
```

涉及资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

---

## 2. Review 结论

当前 v4 协议层已具备测试条件。

结论：

```text
可以进入最小项目测试。
```

但建议测试时重点观察：

1. `expressive_animation` 是否从初始化模板顺利进入 `PROJECT_BOARD.md`。
2. `scene-design-builder` 是否会先输出 v4 表现力策略预览，而不是直接落盘。
3. 用户确认后，`confirmation_status` 是否从 `pending_design_confirmation` 变为 `confirmed`。
4. 后续阶段是否只继承已确认策略，不擅自重写整个顶层字段。
5. 最终 Segment Prompt 是否同时包含正向表达和负向边界。

---

## 3. 已完成修复

### 3.1 新增 PROJECT_BOARD 初始化模板

新增：

```text
.agents/skills/scene-forge/references/project-board-template.md
```

该模板包含：

```yaml
expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation
  mode: animated_feature_comedy
```

并明确：

```text
enabled: true 不代表自动强行使用强特效或反差喜剧，
只代表项目允许后续阶段在确认后的边界内使用 v4 表现力扩展。
```

### 3.2 同步 confirmation_status 到 board protocol

发现问题：

```text
project-board-template.md 中有 confirmation_status，
但 board-protocol.md 中的 expressive_animation 默认结构未包含该字段。
```

已修复：

```yaml
expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation
```

并补充枚举：

```yaml
confirmation_status: pending_design_confirmation | confirmed | disabled
```

### 3.3 同步 confirmation_status 到 expressive animation protocol

发现问题：

```text
expressive-animation-protocol.md 中的顶层字段示例未包含 confirmation_status。
```

已修复，并补充解释：

- `pending_design_confirmation`
- `confirmed`
- `disabled`

### 3.4 总控新项目初始化流程补充模板读取

发现问题：

```text
scene-forge/SKILL.md 之前没有明确新建项目时读取 project-board-template.md。
```

已修复。

现在总控初始化步骤明确：

```text
新项目初始化时读取 references/project-board-template.md，
复制模板到 projects/<project>/PROJECT_BOARD.md，
写入 project_name、created_at、updated_at，
不得伪造用户确认。
```

---

## 4. 字段贯通检查

### 4.1 顶层字段

已贯通：

```yaml
expressive_animation:
  enabled:
  confirmation_status:
  mode:
  assets:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

存在位置：

- `project-board-template.md`
- `board-protocol.md`
- `expressive-animation-protocol.md`
- `scene-forge/SKILL.md`
- 各阶段 output-contract 的 inheritance / design / prompting 字段

结论：通过。

### 4.2 用户确认字段

已贯通：

```yaml
user_confirmations:
  expressive_animation_confirmed: false
```

确认流程：

```text
初始化：false + pending_design_confirmation
设计预览：展示 v4 策略，等待用户确认
用户确认：true + confirmed
用户禁用：true + disabled + enabled: false
```

结论：通过。

### 4.3 执行期资产白名单

已贯通：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

存在位置：

- `project-board-template.md`
- `board-protocol.md`
- `expressive-animation-protocol.md`
- `scene-forge/SKILL.md`
- 各相关子 Skill 的 SKILL.md / output-contract.md

结论：通过。

### 4.4 禁止运行时读取路径

已贯通：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

结论：通过。

---

## 5. 阶段交接检查

### 5.1 scene-design-builder

职责：定义项目级 v4 表现力策略。

关键字段：

```yaml
expressive_animation_design:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

Review 结论：通过。

### 5.2 scene-script-adapter

职责：识别表现力机会点。

关键字段：

```yaml
expressive_animation_inheritance:
expressive_beat_opportunities:
stylized_action_opportunities:
contrast_opportunities:
story_beats[].expressive_animation_hint:
```

Review 结论：通过。

### 5.3 scene-performance-director

职责：把机会点转成可拍表演。

关键字段：

```yaml
physical_comedy_performance:
contrast_performance:
injury_reaction_performance:
```

要求：

```text
anticipation → impact → deformation → hold → recovery / settle
```

Review 结论：通过。

### 5.4 scene-storyboard-director

职责：把表演镜头化。

关键字段：

```yaml
expressive_storyboard_shots:
stylized_action_shots:
contrast_storyboard:
shot_highlights[].expressive_storyboard:
```

要求：

```text
setup → concealment → reveal → hold → continue
```

Review 结论：通过。

### 5.5 scene-audio-director

职责：设计 v4 声音钩子。

关键字段：

```yaml
expressive_audio_design:
stylized_action_audio:
injury_gag_audio:
contrast_audio:
```

明确禁止：

```text
bone_crack
wet_gore_impact
realistic_pain_scream
weapon_stab_sound
realistic_gunshot_into_body
```

Review 结论：通过。

### 5.6 scene-video-prompt-builder

职责：写入最终 Segment Prompt。

关键字段：

```yaml
expressive_animation_prompting:
segment_prompt.animation_physics:
segment_prompt.injury_tone:
segment_prompt.contrast_comedy:
segment_prompt.vfx_support:
segment_prompt.expressive_audio:
segment_prompt.expressive_animation_continuity:
```

Review 结论：通过。

---

## 6. 安全与调性边界检查

已确认：

允许：

- 灰头土脸
- 头上起包
- 小擦伤
- 小范围鼻血
- 喷鼻血笑点
- 黑脸爆炸头
- 眼冒金星
- 轻度衣服破损或烧焦

禁止：

- 大量流血
- 血泊
- 开放性伤口
- 写实刀枪伤
- 子弹入体
- 骨折特写
- 断肢、内脏、身体恐怖
- 持续痛苦、虐打、处刑感镜头
- 写实伤害声音

结论：边界符合“动画电影动作喜剧尺度”。

---

## 7. 反差喜剧密度检查

已确认：

```yaml
contrast_comedy:
  contrast_density: low_to_medium
  max_core_contrasts_per_project: 2
  max_hero_contrast_per_segment: 1
```

并明确避免：

```text
random_meme_stack
every_scene_gag
repeated_same_gag
breaking_serious_emotional_scene
```

结论：通过。

---

## 8. 测试建议

建议用一个最小项目测试：

```text
一个 20-30 秒的轻喜剧动作片段，包含：
1 个角色反差设定
1 个动画物理动作
1 个轻中度卡通伤害后果
1 个声音反差
2-3 个 Story Beat
2-3 个 Segment 或单 Segment
```

重点观察：

1. 新建项目黑板是否正确包含 `expressive_animation`。
2. 设计阶段是否先请求确认。
3. 剧本阶段是否只识别少量机会点，而不是每个 Beat 都加特效。
4. 表演阶段是否写出完整动作节奏。
5. 分镜阶段是否能镜头化 reveal / impact / hold。
6. 声音阶段是否避免写实伤害声。
7. 视频 prompt 是否包含正向表达和负向边界。

---

## 9. 当前遗留事项

当前没有阻塞测试的协议问题。

可选优化：

1. 后续可补一个真实示例项目作为 v4 fixture。
2. 后续可为 `PROJECT_BOARD.md` 模板再拆一个纯 YAML 版本，方便脚本复制。
3. 后续可写一个 lint checklist，用于人工检查各阶段补丁是否包含必要字段。

---

## 10. 最终结论

```text
SceneForge v4 表现力扩展协议层已完成初始化模板与全面 review。
当前状态可以进入最小项目测试。
```
