# SceneForge v4 实施计划：Expressive Animation Extension

日期：2026-06-02

## 1. 实施目标

本计划用于把 v4 设计从 `docs/` 的概念方案，逐步落地到 SceneForge 执行协议中。

v4 的核心扩展统一命名为：

```text
Expressive Animation Extension
动画电影级表现力扩展系统
```

它包含三组能力：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

目标不是简单“加特效”，而是让 SceneForge 在流程执行中稳定具备：

1. 动画电影级夸张物理与 VFX 表达。
2. 家庭向动作喜剧里的轻中度卡通伤害尺度。
3. 反差喜剧与角色记忆点设计能力。
4. 多阶段继承一致性，从设计、剧本、表演、分镜、声音到视频 prompt 都能使用同一套规则。

---

## 2. 当前已完成基础

已新增设计文档：

```text
docs/SceneForge-v4-Animation-Stylization-System.md
docs/SceneForge-v4-Animation-Stylization-Effect-Library.md
docs/SceneForge-v4-Expressive-Extension-System.md
```

已新增执行期资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

已新增交接文档：

```text
.handoff/2026-06-02-sceneforge-v4-animation-stylization-handoff.md
.handoff/2026-06-02-sceneforge-v4-animation-stylization-asset-and-safety-addendum.md
```

---

## 3. 目录职责边界

v4 必须继续遵守 v3 的上下文边界，但要允许执行期读取明确的资产库。

```yaml
docs:
  role: 人类阅读、方案解释、协议设计草案
  runtime_readable: false

.handoff:
  role: 阶段性交接、人工复盘
  runtime_readable: false

assets:
  role: 执行期可读取的枚举库、模板库、风格库、素材规则库
  runtime_readable: true

.agents/skills/**/references:
  role: Skill 稳定执行协议、输出字段、阶段规则
  runtime_readable: true

PROJECT_BOARD.md:
  role: 当前项目唯一状态源、用户确认、跨阶段记忆、已选风格参数
  runtime_readable: true
```

实施原则：

```text
解释性内容留在 docs；
执行期枚举库放 assets；
阶段强规则放 Skill references；
项目级已选配置写 PROJECT_BOARD。
```

---

## 4. 实施阶段

### Phase 1：协议入口与黑板字段

目标：让总控和黑板协议认识 `expressive_animation`。

改造范围：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/expressive-animation-protocol.md
```

任务：

1. 新增 `expressive_animation` 顶层字段。
2. 新增执行期可读资产路径说明：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
3. 明确 `docs/` 和 `.handoff/` 仍禁止运行时读取。
4. 明确只有当前阶段需要动画风格化、伤害尺度或反差喜剧时，才读取对应 asset，不能全仓库扫描。

验收标准：

- board protocol 中存在 `expressive_animation` 字段结构。
- scene-forge 总控规则允许读取白名单资产库，但仍禁止读取 `docs/`。
- 新增独立协议摘要 `expressive-animation-protocol.md`。

---

### Phase 2：设计阶段落地

目标：让 `scene-design-builder` 在项目视觉设定阶段定义 v4 表达策略。

改造范围：

```text
.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-design-builder/references/output-contract.md
```

任务：

1. 设计方向预览中加入：
   - 动画风格化档位
   - 轻中度卡通伤害尺度
   - 反差喜剧是否启用
   - 可读取资产库路径
2. 输出字段加入：
   - `expressive_animation_design`
   - `animation_stylization`
   - `injury_tone_policy`
   - `contrast_comedy`
3. 设计阶段只定义规则，不写具体镜头。

验收标准：

- 设计阶段能把项目级 v4 表达策略写入黑板补丁。
- 用户确认闸门包含 v4 表达策略。

---

### Phase 3：剧本阶段落地

目标：让 `scene-script-adapter` 能识别哪些 Story Beat 适合动画化转译、轻伤喜剧和反差喜剧。

改造范围：

```text
.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-script-adapter/references/output-contract.md
```

任务：

1. 剧本方案预览中加入：
   - `expressive_animation` 继承策略
   - 反差喜剧机会点
   - 高风险动作安全转译机会
2. 输出字段加入：
   - `expressive_beat_opportunities`
   - `stylized_action_opportunities`
   - `contrast_opportunities`
3. Story Beat 可选加入：
   - `expressive_animation_hint`
   - `contrast_comedy_hint`
   - `injury_tone_hint`

验收标准：

- 剧本阶段能识别哪些 beat 需要 v4 表达增强。
- 不会每个 beat 都滥用特效或反差。

---

### Phase 4：表演阶段落地

目标：让 `scene-performance-director` 把 v4 机会点转成可拍的动画表演。

改造范围：

```text
.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-performance-director/references/output-contract.md
```

任务：

1. 角色表演档案加入反差行为、卡通物理边界、轻伤反应规则。
2. Beat 表演说明加入：
   - `physical_comedy_performance`
   - `contrast_performance`
   - `injury_reaction`
3. 强制说明动作恢复：
   - 变形后如何恢复
   - 轻伤状态如何保持喜剧化
   - 反差行为如何保持角色一致性

验收标准：

- 表演阶段不只写“夸张”，而写清楚 anticipation / impact / deformation / hold / recovery。
- 反差喜剧有具体动作和表情执行方式。

---

### Phase 5：分镜阶段落地

目标：让 `scene-storyboard-director` 能镜头化 v4 表达。

改造范围：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

任务：

1. 分镜预览加入：
   - 动画化动作镜头候选
   - 反差 reveal 镜头候选
   - 轻伤可见度策略
2. 输出字段加入：
   - `expressive_storyboard_shots`
   - `stylized_action_shots`
   - `contrast_storyboard`
3. 镜头字段加入：
   - `animation_physics`
   - `injury_visibility`
   - `contrast_framing`
   - `vfx_support`
   - `tonal_boundary`

验收标准：

- 分镜能区分 setup / reveal / impact / hold / recovery。
- 反差笑点有可见的镜头揭晓设计。

---

### Phase 6：声音阶段落地

目标：让 `scene-audio-director` 支持卡通动作声、轻伤喜剧声和声音反差。

改造范围：

```text
.agents/skills/scene-audio-director/SKILL.md
.agents/skills/scene-audio-director/references/output-contract.md
```

任务：

1. 拟音设计加入卡通动作声：boing、bonk、puff、paper_slide 等。
2. 禁止写实伤害声：骨裂、湿黏伤害声、真实惨叫。
3. 加入 `contrast_audio`：例如小自行车铃声与庞大身体的声音反差。

验收标准：

- 声音阶段能继承 v4 表达策略。
- 声音不把轻伤变成写实暴力。

---

### Phase 7：视频提示词阶段落地

目标：让 `scene-video-prompt-builder` 把 v4 表达写进最终 Segment Prompt。

改造范围：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

任务：

1. 全局渲染规则加入：
   - `expressive_animation_note`
   - `injury_tone_note`
   - `contrast_comedy_note`
2. 每段 Segment Prompt 加入：
   - `animation_physics`
   - `injury_tone`
   - `contrast_comedy`
   - `vfx_support`
   - `negative_safety_constraints`
3. 正向和负向提示词都要写清楚。

验收标准：

- 最终视频 prompt 能继承动画物理、伤害尺度和反差喜剧。
- 不出现大量流血、真实伤口、身体恐怖或随机梗堆叠。

---

## 5. 推荐默认配置

```yaml
expressive_animation:
  enabled: true
  mode: animated_feature_comedy
  assets:
    effect_library: assets/animation-stylization/effect-library.md
    contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  animation_stylization:
    level: expressive
    preset: animated_feature_expressive
    effect_density: medium
    density_rule: hero_moment_and_high_risk_translation_only
  injury_tone_policy:
    visible_injury_level: minor_cartoon
    allow_minor_cartoon_injury: true
    allow_small_blood: selective
    allow_nosebleed_gag: true
    allow_bumps_bruises_dust: true
    allow_soot_face: true
    allow_torn_clothes: selective
    forbid_large_blood_loss: true
    forbid_graphic_wounds: true
    forbid_gore: true
    forbid_realistic_weapon_wound: true
    forbid_realistic_bullet_wound: true
    forbid_prolonged_pain_focus: true
    restore_character_integrity_after_gag: true
  contrast_comedy:
    enabled: selective
    contrast_density: low_to_medium
    max_core_contrasts_per_project: 2
    max_hero_contrast_per_segment: 1
    allowed_contrast_types:
      - size_mismatch
      - prop_scale_irony
      - personality_gap
      - identity_behavior_gap
      - visual_context_gap
      - capability_gap
    avoid_when:
      - serious_emotional_scene
      - repeated_same_gag
      - climax_tension_without_release
    contrast_must_serve:
      - character
      - story
      - emotional_turn
      - visual_payoff
```

---

## 6. 实施顺序建议

本计划建议按以下顺序执行：

1. Phase 1：总控 + board protocol + v4 协议摘要。
2. Phase 2：设计阶段。
3. Phase 3：剧本阶段。
4. Phase 4：表演阶段。
5. Phase 5：分镜阶段。
6. Phase 6：声音阶段。
7. Phase 7：视频提示词阶段。
8. 最后补充 README 和交接文档。

如果一次性实施，应每个文件保持“协议增量改造”，不要重写原有协议结构。

---

## 7. 风险与边界

1. 不得破坏 v3 的确认闸门。
2. 不得让 Skill 运行时读取 `docs/` 或 `.handoff/`。
3. 不得把某个样例桥段固化成默认输出。
4. 不得默认所有项目都使用强卡通或反差喜剧。
5. 轻中度卡通伤害允许，但必须禁止严重写实创伤。
6. 反差喜剧必须服务人物、故事或画面 payoff，不能随机堆梗。

---

## 8. 完成标准

v4 实施完成时，应满足：

1. `PROJECT_BOARD.md` 协议支持 `expressive_animation`。
2. 总控知道 `assets/animation-stylization/*` 是可执行期读取资产。
3. 设计阶段能定义 v4 表达策略。
4. 剧本阶段能识别 v4 表达机会点。
5. 表演阶段能具体化动画物理、轻伤反应和反差表演。
6. 分镜阶段能镜头化 setup / reveal / impact / hold / recovery。
7. 声音阶段能设计卡通动作声和声音反差。
8. 视频提示词阶段能把 v4 规则写入最终 Segment Prompt。
9. 全流程仍遵守 SceneForge 只输出 prompt / 制作说明、不生成图片视频音频的边界。
