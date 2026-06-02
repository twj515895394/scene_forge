# SceneForge v4 动画风格化资产库与安全尺度补充交接

日期：2026-06-02

## 1. 本次补充目的

本补充文档记录两项关键修订：

1. **执行期可读取的特效库不应只放在 `docs/`。**
   - `docs/` 继续作为人类设计说明。
   - 如果某些规则、枚举、模板需要被 Skill / Agent 在流程执行中读取，应放入 `assets/`、`.agents/skills/**/references/` 或 `PROJECT_BOARD.md` 初始化模板。

2. **安全边界不应过度保守。**
   - v4 Animation Stylization System 不应简单禁止所有受伤或血迹。
   - 应改成“动画电影级动作喜剧尺度”：允许轻中度卡通伤害，禁止严重写实创伤。

---

## 2. 新增执行期资产库

已新增：

```text
assets/animation-stylization/effect-library.md
```

定位：

```yaml
asset_type: executable_reference
purpose:
  - 动画物理效果枚举
  - 喜剧冲击效果枚举
  - VFX 画面语言枚举
  - 情绪特效枚举
  - 环境与道具反应枚举
  - 声音钩子枚举
  - 场景触发模板
  - 动画电影级受伤尺度规则
```

建议后续 Skill / Agent 可读取该 asset，而不是读取 `docs/`。

---

## 3. `docs/` 与 `assets/` 的职责划分

建议后续稳定采用：

```yaml
docs:
  role: 人类阅读、设计解释、长期方案讨论
  runtime_readable: false

assets:
  role: 执行期可读取的枚举库、模板库、风格库、素材规则库
  runtime_readable: true

.agents/skills/**/references:
  role: 某个 Skill 的稳定执行协议、输出字段、阶段规则
  runtime_readable: true

PROJECT_BOARD.md:
  role: 当前项目状态、用户确认、跨阶段记忆、已选风格参数
  runtime_readable: true
```

结论：

```text
凡是执行流程需要查的“库”，优先放 assets；
凡是阶段必须遵守的“规则”，放 Skill references；
凡是项目已选配置，写 PROJECT_BOARD；
凡是解释为什么这么设计，放 docs。
```

---

## 4. 安全边界修订方向

旧思路偏保守：

```yaml
safety_boundary:
  avoid_blood: true
  avoid_visible_injury: true
```

建议废弃这种写法，改为：

```yaml
injury_tone_policy:
  allow_minor_cartoon_injury: true
  allow_small_blood: selective
  allow_nosebleed_gag: true
  allow_bumps_bruises_dust: true
  avoid_graphic_injury_detail: true
  avoid_large_blood_loss: true
  avoid_gore_or_body_horror: true
  avoid_realistic_weapon_wound: true
  avoid_prolonged_pain_focus: true
  restore_character_integrity_after_gag: true
```

---

## 5. 允许的动画电影级轻中度伤害

允许：

- 灰头土脸
- 头上起包
- 小擦伤
- 小范围鼻血
- 喷鼻血笑点
- 贴创可贴
- 衣服破一点
- 衣服边缘烧焦
- 黑脸爆炸头
- 眼冒金星
- 角色被打飞后坐地发懵
- 机器人或非人角色冒烟、掉零件

这些表达必须满足：

```text
短暂、非写实、非恐怖、非虐待、可恢复、服务喜剧节奏。
```

---

## 6. 禁止的表达

禁止或强烈避免：

- 大量流血
- 血泊
- 开放性伤口细节
- 刀砍、枪击、穿刺造成的清晰身体伤口
- 子弹入体、枪伤血洞
- 骨折特写
- 断肢、内脏、身体恐怖
- 持续痛苦呻吟
- 虐打、折磨、处刑感镜头
- 真实可模仿的危险动作教程化表现

---

## 7. 推荐默认配置

```yaml
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
```

---

## 8. 后续落地建议

1. `scene-forge/references/board-protocol.md`
   - 新增 `animation_stylization.injury_tone_policy`。
   - 明确 `docs/` 不可执行期读取，`assets/` 可作为执行期枚举库。

2. `PROJECT_BOARD.md` 初始化模板
   - 新增默认 `animation_stylization` 配置。
   - 加入 `visible_injury_level: minor_cartoon`。

3. `scene-design-builder`
   - 负责选择本项目的受伤尺度：`none` / `minor_cartoon` / `moderate_stylized`。

4. `scene-script-adapter`
   - 把高风险动作改写为动画动作喜剧时，不必完全删除受伤，可保留轻中度卡通受伤。

5. `scene-storyboard-director`
   - 每个打斗、撞击、枪炮、追逐镜头都要写清楚：允许的轻伤、禁止的写实伤害、角色如何恢复。

6. `scene-video-prompt-builder`
   - 最终 prompt 应同时包含正向尺度与负向边界。

---

## 9. 一句话原则

```text
SceneForge v4 允许动画电影动作喜剧里的轻中度卡通受伤；
禁止真实、血腥、残酷、持续痛苦和身体恐怖。
```
