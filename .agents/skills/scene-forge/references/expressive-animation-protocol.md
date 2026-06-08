# SceneForge v4 表现力扩展协议摘要

状态说明：

- 本文件为历史协议摘要，保留用于理解旧项目和旧字段来源。
- 当前主链运行期不应再把本文中的顶层 `expressive_animation.enabled: true` 视为默认启用规则。
- 现行规则以各阶段 `output-contract.md` 和当前 `style_family` 条件启用边界为准。

本文件给 `scene-forge` 总控 Skill 和各子 Skill 使用，用于在运行时识别和继承 v4 表现力扩展字段。

该协议不是设计说明，而是执行期可读取的最小规则摘要。

---

## 1. 顶层字段

v4 历史版本曾使用以下顶层项目记忆字段：

```yaml
expressive_animation:
  enabled: true
  confirmation_status: pending_design_confirmation
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

### 1.1 确认状态

```yaml
confirmation_status: pending_design_confirmation | confirmed | disabled
```

含义：

- `pending_design_confirmation`：新项目默认值。表示项目可使用 v4 表现力扩展，但具体强度仍需设计阶段预览并由用户确认。
- `confirmed`：用户已在设计方向确认中接受项目级 v4 表现力策略。
- `disabled`：用户明确要求不使用动画物理、轻伤尺度或反差喜剧扩展。

历史模板默认 `enabled: true` 不代表自动强行使用强特效或反差喜剧；但现行主链已经改为“按 `style_family` 条件启用”，不再建议把该顶层默认值当作运行时总开关。

---

## 2. 三个子系统

### 2.1 `animation_stylization`

负责动画电影级夸张物理和 VFX：

- 压扁与拉伸
- 弹性回弹
- 撞击贴墙
- 纸片化滑落
- 速度线
- 冲击环
- 尘雾 puff
- 道具与环境延迟反应
- 高风险动作的非写实转译

使用原则：

```text
动作必须服务情绪、笑点、看点或安全转译，不得随机堆特效。
```

### 2.2 `injury_tone_policy`

负责动画动作喜剧中的伤害尺度。

允许：

- 灰头土脸
- 头上起包
- 小擦伤
- 小范围鼻血
- 喷鼻血笑点
- 贴创可贴
- 衣服轻微破损或烧焦
- 黑脸爆炸头
- 眼冒金星

禁止：

- 大量流血
- 血泊
- 开放性伤口
- 写实刀枪伤
- 子弹入体
- 骨折特写
- 断肢、内脏、身体恐怖
- 持续痛苦、虐打、处刑感镜头

核心原则：

```text
允许轻中度卡通受伤，禁止严重写实创伤。
```

### 2.3 `contrast_comedy`

负责反差喜剧和角色记忆点：

- 体型反差：大身体 + 小道具
- 道具反差：强气场角色 + 可爱生活化道具
- 性格反差：外表凶狠但温柔
- 身份行为反差：英雄式登场但做生活小事
- 情绪反差：全员紧张，某角色淡定
- 画面语境反差：史诗镜头拍买菜
- 能力反差：弱小角色很强，强大角色被小事难住

使用原则：

```text
反差喜剧必须服务人物、故事、情绪转折或画面 payoff，不能随机堆梗。
```

---

## 3. 执行期资产读取规则

v4 允许在确有需要时读取以下资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

读取条件：

```yaml
asset_read_policy:
  allowed_when:
    - 当前阶段需要选择动画物理效果
    - 当前阶段需要校准轻中度卡通伤害尺度
    - 当前阶段需要设计反差喜剧
    - 当前阶段协议明确允许表现力扩展，且当前 `style_family` 支持或当前风格包显式支持
  forbidden_when:
    - 当前阶段不涉及表现力扩展
    - 只是为了泛泛了解项目背景
    - 试图替代当前 Skill 的 output-contract
```

不得读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

说明：

```text
assets 是执行期素材/规则库；
docs 和 .handoff 仍然只给人类阅读，不参与运行时上下文。
```

---

## 4. 阶段分工

```yaml
scene-design-builder:
  responsibility:
    - 定义项目级 expressive_animation 策略
    - 选择 animation_stylization 档位
    - 选择 injury_tone_policy 尺度
    - 判断 contrast_comedy 是否启用
    - 用户确认后将 confirmation_status 改为 confirmed，或在用户禁用时改为 disabled

scene-script-adapter:
  responsibility:
    - 识别 stylized_action_opportunities
    - 识别 contrast_opportunities
    - 识别轻中度卡通伤害是否服务剧情或笑点

scene-performance-director:
  responsibility:
    - 把动画化机会转成可拍表演
    - 设计 anticipation / impact / deformation / hold / recovery
    - 设计 contrast_performance 和 injury_reaction

scene-storyboard-director:
  responsibility:
    - 镜头化 setup / reveal / impact / hold / recovery
    - 设计 stylized_action_shots 和 contrast_storyboard
    - 控制 injury_visibility

scene-audio-director:
  responsibility:
    - 设计卡通动作声、轻伤喜剧声和声音反差
    - 避免写实伤害声

scene-video-prompt-builder:
  responsibility:
    - 仅在当前 `style_family` 允许时，把风格化动作物理、伤害尺度、反差喜剧和负向边界写入最终 Segment Prompt
```

---

## 5. 密度控制

```yaml
expressive_animation_density:
  animation_stylization:
    strong_effects_only_for:
      - hero_moment
      - high_risk_translation
      - comedic_payoff
      - emotional_turn
  contrast_comedy:
    max_core_contrasts_per_project: 2
    max_hero_contrast_per_segment: 1
    avoid_repeated_same_gag: true
  injury_tone_policy:
    visible_injury_level_default: minor_cartoon
    moderate_stylized_requires_reason: true
```

---

## 6. 负向边界

任何阶段使用 v4 表现力扩展时，都必须继承以下边界：

```yaml
negative_boundaries:
  no_random_effect_stack: true
  no_every_scene_gag: true
  no_large_blood_loss: true
  no_graphic_wounds: true
  no_gore: true
  no_body_horror: true
  no_realistic_weapon_wound: true
  no_realistic_bullet_wound: true
  no_prolonged_pain_focus: true
  preserve_character_consistency: true
  restore_character_integrity_after_gag: true
```

---

## 7. 默认口径

对话和输出中建议这样描述：

```text
本项目启用动画电影级表现力扩展：使用适度动画物理、轻中度卡通伤害尺度和选择性反差喜剧设计。所有夸张效果都服务角色、情绪、笑点或安全转译，不随机堆叠。
```
