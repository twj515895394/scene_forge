# SceneForge v4：动画电影级夸张表演与 VFX 体系设计方案

> 本文档是 SceneForge v4 升级设计草案，供人类阅读和后续协议改造参考。
>
> 注意：当前 v3 运行时规则仍然禁止 Skill / Agent 把 `docs/` 作为阶段执行上下文。本文档不应被任何 Skill 在项目运行时读取；后续落地时，应把稳定规则转写进 `.agents/skills/**/SKILL.md` 与 `.agents/skills/**/references/output-contract.md`。

## 1. 设计目标

SceneForge v4 需要补充一套“动画电影级夸张物理表演与喜剧 VFX 系统”（Animation Stylization System）。

它的核心目标不是简单“加特效”，而是让 SceneForge 具备稳定的动画化转译能力：

```text
当原片段中存在暴力、冲突、受伤、追打、摔倒、撞击、惊吓、尴尬、爆发等强动作时，
不要直接复刻现实伤害，
而是转译成动画电影级夸张物理表演 + 喜剧 VFX + 安全边界明确的画面笑点。
```

这套体系尤其适合把真实暴力或高风险动作转译为：

- 弹性变形
- 压扁与拉伸
- 撞击贴墙
- 纸片化滑落
- 卡通烟尘 puff
- 冲击环
- 眩晕星星
- 慢半拍喜剧停顿
- 道具与场景延迟反应
- 身体回弹复原

最终效果是：保留戏剧冲突、爽点和画面记忆点，同时降低血腥、真实伤害和平台表达风险。

---

## 2. 核心原则

### 2.1 用动画物理替代真实伤害

最重要的原则是：

```text
不表现真实创伤，不强调疼痛，不表现血腥后果。
```

高风险动作应转译为：

- 弹性变形
- 压扁拉伸
- 撞击贴墙
- 纸片化滑落
- 烟尘 puff
- 星星眩晕
- 道具夸张变形
- 慢动作停顿
- 回弹复原

例如，原始危险表达：

```text
角色使用刀具攻击摊主。
```

可以转译为：

```text
摩托车轮子像夸张旋转道具一样横向扫过，摊主被冲击力卷起，身体变成柔软的弧形，飞向墙面，砰地贴成扁平剪影。墙面出现夸张的卡通冲击印，但没有血迹。停顿半秒后，他像贴纸一样从墙上慢慢滑落，落地后头顶转着几颗小星星。
```

该画面保留了“惩罚 / 爆点 / 冲击”的戏剧功能，但删除了真实伤害。

### 2.2 夸张服务情绪，不随机搞怪

每个夸张动作必须回答：

```text
这个变形为什么发生？
它强化了哪个情绪？
它服务哪个笑点？
它是不是当前角色性格能承受的表达？
它是否会破坏故事张力？
```

建议原则：

- 愤怒爆发：身体短暂膨胀、眼神压迫、背景气流收缩。
- 惊吓反应：眼睛放大、身体后仰拉长、脚底打滑。
- 被撞击：先压扁，再停顿，再回弹。
- 尴尬：画面冻结、角色缩小、冷风横扫。
- 误会升级：配角集体错位反应、节奏逐层加速。

不是所有地方都要夸张。最佳效果通常是“克制铺垫 + 爆点瞬间夸张”。

### 2.3 动作必须有完整节奏

夸张动作不能只写结果，要写过程。

推荐固定节奏：

```text
anticipation → impact → deformation → hold → rebound / settle
```

含义：

1. `anticipation`：前摇 / 蓄力，让观众预感要出事。
2. `impact`：冲击 / 触发，动作爆发。
3. `deformation`：变形 / 夸张物理反应，例如拉长、压扁、扭曲、贴墙、弹飞。
4. `hold`：停顿 / 看清笑点，喜剧最重要的一拍。
5. `rebound / settle`：回弹、滑落、收尾，让角色回到可继续表演的状态。

示例：

```text
摊主看到摩托车轮影压来，先僵住 0.3 秒，眼睛突然放大；
轮子从画面侧面扫过，形成圆形速度拖影；
摊主身体被撞成夸张弧线飞出；
砰地贴在墙上，变成扁平轮廓；
停顿 0.5 秒，墙上尘土慢慢落下；
他像贴纸一样从墙上滑落，落地后身体弹回原形，头顶星星转圈。
```

---

## 3. 体系命名

不建议命名为：

```text
皮克斯特效
皮克斯夸张变形
```

推荐命名为：

```text
Animation Stylization System
动画电影级夸张物理表演与喜剧 VFX 系统
```

原因：

1. 更通用，不绑定具体品牌。
2. 更适合作为 SceneForge 长期协议能力。
3. 可服务多种动画电影风格。
4. 便于在 Skill 与黑板协议中结构化表达。

---

## 4. 能力模块拆分

建议拆成 6 个模块。

### 4.1 夸张物理表演：`physical_exaggeration`

负责角色身体和动作的夸张。

包括：

- `squash_stretch`：压扁与拉伸
- `elastic_rebound`：弹性回弹
- `impact_flattening`：撞击压扁
- `smear_motion`：高速拖影
- `overshoot_settle`：过冲与回落
- `stagger_recoil`：踉跄与回震
- `freeze_take`：惊吓定格
- `delayed_reaction`：延迟反应

示例：

```yaml
physical_exaggeration:
  squash_stretch: enabled
  elastic_rebound: enabled
  impact_flattening: selective
  smear_motion: selective
  overshoot_settle: enabled
  freeze_take: enabled
```

### 4.2 喜剧冲击设计：`impact_gag_design`

负责把危险动作转成喜剧冲击。

包括：

- 被撞飞
- 贴墙
- 纸片化
- 弹进箱子 / 桶里 / 摊位里
- 身体像弹簧一样回弹
- 旋转飞出
- 落地变成夸张坐姿
- 头顶星星
- 身后烟尘轮廓

示例：

```yaml
impact_gag_design:
  enabled: true
  allowed_gags:
    - wall_splat
    - paper_flatten_slide
    - elastic_rebound
    - dust_puff
    - dizziness_stars
  forbidden_gags:
    - visible_injury
    - blood
    - gore
    - realistic_pain_focus
```

### 4.3 VFX 画面强化：`vfx_language`

负责画面上的视觉效果。

包括：

- `dust_puffs`：尘雾团
- `impact_rings`：冲击环
- `speed_lines`：速度线
- `motion_arcs`：动势弧线
- `spark_particles`：轻微火花
- `debris_particles`：碎屑粒子
- `smoke_trails`：烟尘尾迹
- `cartoon_stars`：眩晕星星
- `freeze_frame_accent`：定格强调
- `flash_accent`：喜剧闪白 / 节奏闪点

示例：

```yaml
vfx_language:
  dust_puffs: enabled
  impact_rings: enabled
  speed_lines: selective
  motion_arcs: enabled
  cartoon_stars: selective
  smoke_trails: selective
  debris_particles: minimal
  flash_accent: selective
```

### 4.4 情绪特效：`emotional_vfx`

负责把角色心理状态转成视觉效果。

包括：

- 愤怒蒸汽
- 尴尬冷风
- 惊讶冻结
- 背景瞬间压暗
- 角色心理崩塌时背景轻微变形
- 误会时画面短暂静音 / 慢动作
- 得意时背景闪光
- 崩溃时头顶小乌云

示例：

```yaml
emotional_vfx:
  anger_steam: selective
  awkward_freeze: enabled
  shock_freeze: enabled
  background_squeeze: selective
  tiny_storm_cloud: selective
  comedic_silence: enabled
```

### 4.5 道具与场景反应：`environment_reactivity`

动画电影感的关键是：角色动作发生后，场景和道具也会“表演”。

包括：

- 墙面弹性凹陷
- 桌子被撞后像弹簧一样回弹
- 摊位布棚抖动
- 西瓜、篮子、箱子轻微弹跳
- 灰尘从墙缝落下
- 小道具延迟掉落
- 门牌、灯泡、纸片震动
- 背景群众统一转头 / 停顿

示例：

```yaml
environment_reactivity:
  wall_deformation: selective
  prop_bounce: enabled
  cloth_flap: enabled
  delayed_object_fall: enabled
  crowd_reaction_wave: selective
```

### 4.6 安全边界：`safety_boundary`

夸张物理必须有安全边界，否则容易滑向暴力或怪异恐怖。

建议字段：

```yaml
safety_boundary:
  avoid_blood: true
  avoid_visible_injury: true
  avoid_body_horror: true
  avoid_realistic_pain_focus: true
  avoid_gore_or_wounds: true
  keep_comedic_tone: true
  restore_character_integrity_after_gag: true
```

核心原则：

```text
角色可以夸张变形，但不能呈现真实受伤。
角色可以被压扁，但要像橡皮或纸片，不像身体损伤。
角色可以撞墙，但重点是卡通轮廓、烟尘、停顿和回弹，不是疼痛和伤口。
```

---

## 5. 夸张档位设计

这套系统不能默认拉满，建议做 4 档。

### 5.1 `grounded`

克制电影化。

适合：

- 温暖叙事
- 正剧改编
- 情绪类片段
- 不希望太卡通的项目

表现：

- 轻微动作夸张
- 轻微衣料和头发回弹
- 轻微尘雾
- 真实物理为主
- 不使用贴墙、纸片化、星星转圈等强卡通效果

示例：

```text
角色被撞后后退两步，肩膀和衣角有明显惯性，背后扬起轻微尘土。
```

### 5.2 `expressive`

标准动画电影化。

适合大多数 SceneForge 项目。

表现：

- 明显 squash and stretch
- 有节奏化停顿
- 有轻微撞击 VFX
- 有夸张表情和动作回弹
- 不进入强卡通荒诞

示例：

```text
角色被冲击力撞得身体短暂拉长，脚下滑出半米，眼睛放大，停顿半拍后恢复平衡。
```

### 5.3 `comedic_push`

喜剧强化。

适合：

- 短视频爆点
- 夸张搞笑化
- 冲突反转
- 误会升级
- 需要规避真实暴力的名场面

表现：

- 明显撞击变形
- 贴墙
- 纸片化滑落
- 烟尘团
- 星星眩晕
- 道具弹跳
- 群体反应波

示例：

```text
角色被横向撞飞，身体像橡皮一样拉长，砰地贴在墙上变成扁平剪影，停顿半秒后像纸片一样滑落。
```

### 5.4 `wild_cartoon`

强卡通化。

适合：

- 鬼畜离谱化
- 极端喜剧
- 高能短视频
- 非写实世界观

表现：

- 大幅身体变形
- 多次回弹
- 夸张飞出画面
- 物理规则明显卡通化
- 大量符号化 VFX

示例：

```text
角色被撞成一条波浪形橡皮带，绕场景旋转一圈后贴到墙上，身体慢慢弹回原形，表情还停留在上一秒的惊讶状态。
```

该档需要谨慎，避免变得低幼或失控。

---

## 6. 与现有 `performance_style` 的关系

现有字段：

```yaml
performance_style:
  cinematic_serious
  cinematic_comedy
  exaggerated_comedy
  absurd_chaotic
```

建议新增独立字段：

```yaml
animation_stylization_level:
```

不要直接绑死到 `performance_style`，因为同样是 `exaggerated_comedy`，也可能有不同夸张程度。

推荐默认映射：

```yaml
cinematic_serious:
  recommended_animation_stylization_level: grounded

cinematic_comedy:
  recommended_animation_stylization_level: expressive

exaggerated_comedy:
  recommended_animation_stylization_level: comedic_push

absurd_chaotic:
  recommended_animation_stylization_level: wild_cartoon
```

这只是建议默认值，用户可以改。

---

## 7. 建议新增 PROJECT_BOARD 通用字段

建议在 v4 中新增顶层通用记忆字段：

```yaml
animation_stylization:
  level:
  physical_exaggeration:
    squash_stretch:
    elastic_rebound:
    impact_flattening:
    smear_motion:
    overshoot_settle:
    freeze_take:
  impact_gag_design:
    enabled:
    allowed_gags:
    forbidden_gags:
  vfx_language:
    dust_puffs:
    impact_rings:
    speed_lines:
    motion_arcs:
    cartoon_stars:
    smoke_trails:
    debris_particles:
    flash_accent:
  emotional_vfx:
    shock_freeze:
    awkward_freeze:
    anger_steam:
    comedic_silence:
    background_squeeze:
  environment_reactivity:
    wall_deformation:
    prop_bounce:
    cloth_flap:
    delayed_object_fall:
    crowd_reaction_wave:
  safety_boundary:
    avoid_blood:
    avoid_visible_injury:
    avoid_body_horror:
    avoid_realistic_pain_focus:
    keep_comedic_tone:
    restore_character_integrity_after_gag:
```

示例默认值：

```yaml
animation_stylization:
  level: expressive
  physical_exaggeration:
    squash_stretch: enabled
    elastic_rebound: enabled
    impact_flattening: selective
    smear_motion: selective
    overshoot_settle: enabled
    freeze_take: selective
  impact_gag_design:
    enabled: true
    allowed_gags:
      - elastic_rebound
      - dust_puff
      - impact_ring
    forbidden_gags:
      - visible_injury
      - blood
      - gore
      - realistic_pain_focus
  vfx_language:
    dust_puffs: enabled
    impact_rings: selective
    speed_lines: selective
    motion_arcs: enabled
    cartoon_stars: selective
    smoke_trails: selective
    debris_particles: minimal
  emotional_vfx:
    shock_freeze: selective
    awkward_freeze: enabled
    anger_steam: selective
    comedic_silence: enabled
  environment_reactivity:
    prop_bounce: enabled
    wall_deformation: selective
    cloth_flap: enabled
    delayed_object_fall: enabled
    crowd_reaction_wave: selective
  safety_boundary:
    avoid_blood: true
    avoid_visible_injury: true
    avoid_body_horror: true
    avoid_realistic_pain_focus: true
    keep_comedic_tone: true
    restore_character_integrity_after_gag: true
```

---

## 8. Skill 落地分工建议

### 8.1 `scene-design-builder`

职责：定义本项目允许什么级别的夸张。

建议新增：

```yaml
animation_stylization:
  level:
  deformation_language:
  vfx_language:
  environment_reactivity:
  safety_boundary:
```

设计阶段需要回答：

- 本项目适合多夸张？
- 角色身体能不能拉伸？
- 墙、桌子、道具能不能卡通变形？
- VFX 是克制还是明显？
- 是否允许贴墙、纸片化、星星眩晕？
- 哪些效果禁止？

设计阶段输出的是规则，不是具体镜头。

### 8.2 `scene-script-adapter`

职责：识别哪些 Story Beat 有动画化转译机会。

建议新增：

```yaml
stylized_action_opportunities:
  - beat_id:
    original_action_risk:
    proposed_animation_translation:
    emotional_function:
    safety_note:
```

示例：

```yaml
stylized_action_opportunities:
  - beat_id: B03
    original_action_risk: 真实攻击动作容易血腥化
    proposed_animation_translation: 转译为摩托轮冲击 + 贴墙纸片化滑落
    emotional_function: 惩罚爆点 + 喜剧释放
    safety_note: 不表现伤口、血液或真实痛苦
```

### 8.3 `scene-performance-director`

职责：设计具体表演形变。

建议新增：

```yaml
physical_comedy_performance:
  - beat_id:
    character_id:
    anticipation:
    impact_reaction:
    deformation_action:
    hold_timing:
    recovery:
    emotion_result:
```

示例：

```yaml
physical_comedy_performance:
  - beat_id: B03
    character_id: vendor
    anticipation: 摊主先听到摩托轮声，肩膀僵住，眼睛向左上角瞟。
    impact_reaction: 身体被横向冲击拉成长弧线。
    deformation_action: 撞墙瞬间变成扁平剪影。
    hold_timing: 贴墙后停顿 0.5 秒。
    recovery: 像纸片一样慢慢滑落，落地后弹回正常比例。
    emotion_result: 从嚣张到懵住，形成喜剧反差。
```

### 8.4 `scene-storyboard-director`

职责：把夸张动作落成镜头和 VFX。

建议新增：

```yaml
stylized_action_shots:
  - shot_id:
    beat_id:
    shot_type:
    animation_principle:
    visual_action:
    vfx_elements:
    safety_boundary:
```

示例：

```yaml
stylized_action_shots:
  - shot_id: SH012
    beat_id: B03
    shot_type: impact_gag
    animation_principle:
      - anticipation
      - squash_stretch
      - impact_flattening
      - hold
      - settle
    visual_action: 摩托车轮从左侧扫过，摊主被夸张撞飞，身体变成弧形拖影。
    vfx_elements:
      - speed_lines
      - impact_ring
      - dust_puff
    safety_boundary: 不表现血液、伤口或真实痛苦，只表现卡通冲击。
```

### 8.5 `scene-audio-director`

职责：为夸张动作设计声音钩子。

建议新增：

```yaml
stylized_action_audio:
  - shot_id:
    impact_sound:
    slide_sound:
    rebound_sound:
    comedic_pause:
```

示例：

```yaml
stylized_action_audio:
  - shot_id: SH012
    impact_sound: 低频卡通砰声 + 轻微橡皮拉伸音
    slide_sound: 纸片摩擦墙面的轻微滑落声
    rebound_sound: 柔软弹簧回弹音
    comedic_pause: 撞墙后 0.5 秒静默
```

### 8.6 `scene-video-prompt-builder`

职责：把动画物理、VFX 和安全边界写进最终 Segment Prompt。

建议新增：

```yaml
stylized_action_prompt:
  segment_id:
  animation_physics:
  vfx_elements:
  safety_boundary:
  audio_hooks:
```

中文 Prompt 示例：

```text
采用动画电影级喜剧物理表现。摊主被高速旋转的摩托车轮以非写实卡通方式横向撞飞，身体像柔软橡皮一样拉成长弧线，撞到墙上时变成扁平剪影。加入柔和冲击环、尘雾 puff 和半秒喜剧定格。不要血液、伤口或真实痛苦表现。停顿后，他像贴纸一样从墙上慢慢滑落，落地后弹回正常比例。
```

英文 Prompt 示例：

```text
Use animated feature-film physical comedy. The vendor is hit by a fast spinning motorcycle wheel in a non-realistic cartoon way. His body stretches into a soft arc, flies sideways, and splats flat against the wall as a paper-thin silhouette. Add a soft impact ring, dust puff, and brief comedic freeze. No blood, no wounds, no realistic pain. After a half-second pause, he slowly slides down like a sticker and pops back to normal shape on the ground.
```

---

## 9. 高风险动作安全转译策略

建议新增规则：

```yaml
violence_translation_policy:
  prefer_cartoon_physics: true
  replace_realistic_harm_with_impact_gag: true
  avoid_weapon_contact_detail: true
  use_deformation_and_vfx_for_payoff: true
```

适用情况：

- 原始桥段包含真实暴力
- 原始桥段包含武器攻击
- 原始桥段包含受伤、撞击、摔打、追打
- 原始桥段容易产生血腥或危险动作联想

转译目标：

```text
保留冲突爆点、角色关系、情绪释放和短视频爽点；
删除血液、伤口、真实痛苦、具体攻击细节和真实伤害后果；
使用动画物理、喜剧 VFX 和夸张表演完成画面 payoff。
```

---

## 10. 示例：从危险攻击到动画冲击笑点

### 原始危险表达

```text
角色使用刀具攻击摊主。
```

风险：

- 血腥
- 真实暴力
- 刀具攻击
- 伤害后果
- 平台审核风险
- 画面不适

### 动画化转译

```text
刀具攻击不直接表现为刺伤，而转译为摩托车轮式夸张冲击。
摊主被非写实卡通冲击撞飞到墙上，身体像纸片一样贴墙、滑落、回弹。
```

### 转译后的画面功能

保留：

- 冲突爆点
- 角色受惩罚
- 观众爽点
- 画面记忆点
- 短视频传播性

移除：

- 血液
- 伤口
- 真实痛苦
- 真实攻击细节

增强：

- 喜剧节奏
- 动画电影感
- VFX 趣味
- 角色反应差
- 可爱化暴力

### 分镜示例

```yaml
stylized_action_sequence:
  original_risk: 真实攻击动作可能产生血腥或危险联想。
  animation_translation: 摩托车轮式卡通冲击替代真实伤害。
  sequence:
    - step: anticipation
      description: 摊主听到轮子高速旋转声，表情从得意变成迟疑，眼睛慢慢瞟向画面侧边。
    - step: impact
      description: 摩托车轮以夸张速度线从侧面扫过，没有真实接触细节，只表现一团圆形动势和冲击风。
    - step: deformation
      description: 摊主身体被冲击力拉成长弧形，像橡皮一样飞向墙面。
    - step: wall_splat
      description: 摊主贴到墙上变成扁平剪影，墙面出现卡通冲击印和尘雾。
    - step: comedic_hold
      description: 画面停顿 0.5 秒，摊主眼睛转圈，旁边几个西瓜慢半拍弹起来。
    - step: slide_down
      description: 摊主像贴纸一样从墙上滑落，落地后身体弹回正常比例。
  safety_boundary:
    - 不出现血液
    - 不出现伤口
    - 不表现真实痛苦
    - 不表现具体刺伤动作
    - 保持卡通喜剧调性
```

---

## 11. 通用 Prompt 模板

### 中文模板

```text
本段使用动画电影级夸张物理表演。
动作遵循 anticipation → impact → deformation → hold → settle 的节奏。
当冲击发生时，角色以非写实卡通方式产生压扁、拉伸、回弹或贴墙变形。
使用适度的尘雾 puff、冲击环、速度线、动作弧线和道具弹跳强化画面。
所有变形都保持喜剧化、橡皮感、无真实伤害。
不要血液、伤口、骨折、真实痛苦或恐怖身体变形。
特效服务情绪和笑点，不喧宾夺主。
```

### 英文模板

```text
Use animated feature-film physical comedy. The action follows anticipation, impact, deformation, hold, and settle. During the impact, the character reacts in a non-realistic cartoon way with squash and stretch, elastic rebound, wall splat, or soft deformation. Add subtle dust puffs, impact rings, speed lines, motion arcs, and prop bounce to emphasize timing and comedy. Keep all deformation playful, rubbery, and non-injurious. No blood, no wounds, no broken bones, no realistic pain, no body horror. VFX should support emotion and comedy, not overpower the scene.
```

---

## 12. 推荐落地策略

建议分三层落地。

### 第一层：协议字段

加入 `animation_stylization` 顶层字段。

用途：

- 定义本项目夸张程度
- 给所有后续阶段继承
- 防止每个阶段随机发挥

### 第二层：阶段输出

不同 Skill 各自承担一部分：

```text
scene-design-builder：定义规则
scene-script-adapter：识别可转译动作
scene-performance-director：设计表演形变
scene-storyboard-director：落成镜头和 VFX
scene-audio-director：设计声音钩子
scene-video-prompt-builder：写进最终 Segment Prompt
```

### 第三层：安全边界

所有阶段都要继承：

```text
不血腥
不真实受伤
不身体恐怖
不聚焦痛苦
保持动画喜剧调性
```

---

## 13. v4 落地清单

建议后续改造范围：

1. `scene-forge/references/board-protocol.md`
   - 新增 `animation_stylization` 顶层字段。
   - 新增 `violence_translation_policy` 或并入 `animation_stylization.safety_boundary`。

2. `scene-design-builder/SKILL.md` 与 `references/output-contract.md`
   - 增加动画夸张档位判断。
   - 增加 `deformation_language`、`vfx_language`、`environment_reactivity`、`safety_boundary`。

3. `scene-script-adapter/SKILL.md` 与 `references/output-contract.md`
   - 增加 `stylized_action_opportunities`。
   - 对高风险动作优先尝试动画化安全转译。

4. `scene-performance-director/SKILL.md` 与 `references/output-contract.md`
   - 增加 `physical_comedy_performance`。
   - 设计 anticipation、impact、deformation、hold、recovery。

5. `scene-storyboard-director/SKILL.md` 与 `references/output-contract.md`
   - 增加 `stylized_action_shots`。
   - 每个夸张动作镜头必须写明动画原则、VFX 元素和安全边界。

6. `scene-audio-director/SKILL.md` 与 `references/output-contract.md`
   - 增加 `stylized_action_audio`。
   - 为贴墙、滑落、回弹、烟尘、停顿等设计声音钩子。

7. `scene-video-prompt-builder/SKILL.md` 与 `references/output-contract.md`
   - 增加 `stylized_action_prompt`。
   - 每段视频提示词整合动画物理、VFX、安全边界和声音钩子。

8. `PROJECT_BOARD.md` 初始化模板
   - 新增 `animation_stylization` 默认字段。
   - 确保 v4 字段仍遵守 v3 的确认闸门和运行时禁止读取 `docs/` 规则。

---

## 14. 结论

这套体系应作为 SceneForge v4 的核心升级之一。

价值包括：

1. 增强动画电影感：画面不再只是 3D 写实复刻，而是拥有真正的动画表演语法。
2. 提升短视频爆点：贴墙、压扁、回弹、慢半拍滑落等都是天然传播点。
3. 降低血腥和暴力风险：把真实攻击转译成卡通冲击和物理笑点。
4. 增强多阶段一致性：从设计、剧本、表演、分镜、声音到视频 prompt 都能继承同一套夸张规则。

推荐正式命名：

```text
Animation Stylization System
动画电影级夸张物理表演与喜剧 VFX 系统
```
