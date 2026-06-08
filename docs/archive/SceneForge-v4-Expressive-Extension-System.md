# SceneForge v4：动画风格化、伤害尺度与反差喜剧统一扩展方案

> 本文档是 SceneForge v4 的统一扩展设计方案，整合：
>
> 1. `Animation Stylization System`：动画电影级夸张物理表演与 VFX。
> 2. `Injury Tone Policy`：动画动作喜剧里的轻中度卡通伤害尺度。
> 3. `Contrast Comedy System`：反差喜剧 / 反差表达系统。
>
> 注意：本文档位于 `docs/`，只供人类阅读和协议改造参考。执行期可读取的效果库、模板库、枚举库应放入 `assets/` 或 `.agents/skills/**/references/`。

---

## 1. 为什么要统一成一个 v4 扩展体系

前面单独设计了动画风格化系统，重点解决：

```text
真实暴力 / 高风险动作 → 动画物理 + 喜剧 VFX + 安全转译
```

后续又补充了伤害尺度，重点解决：

```text
不是完全禁止受伤，而是允许动画电影动作喜剧里的轻中度卡通受伤。
```

现在需要再纳入反差喜剧，重点解决：

```text
通过人物、道具、体型、性格、身份、行为、画面预期之间的反差制造笑点和角色记忆点。
```

这三者不应该割裂。它们共同服务 SceneForge v4 的一个更大的目标：

```text
让 SceneForge 不只是“改写剧情 + 生成 prompt”，
而是具备动画电影级的表演、喜剧、风格化和画面设计能力。
```

因此建议统一命名为：

```text
Expressive Animation Extension
动画电影级表现力扩展系统
```

也可作为内部字段集合：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

---

## 2. 三个子系统的职责边界

### 2.1 `animation_stylization`

负责：

- 压扁与拉伸
- 弹性回弹
- 撞击贴墙
- 纸片化滑落
- 速度线
- 冲击环
- 尘雾 puff
- 眩晕星星
- 道具与环境反应
- 高风险动作的动画化转译

它解决的是：

```text
动作怎么变得更动画、更夸张、更安全、更有节奏。
```

### 2.2 `injury_tone_policy`

负责：

- 是否允许灰头土脸
- 是否允许小擦伤
- 是否允许鼻血笑点
- 是否允许头上起包
- 是否允许衣服破损 / 黑脸爆炸头
- 禁止哪些血腥、写实、残酷、身体恐怖表达

它解决的是：

```text
动作后果可以呈现到什么尺度。
```

核心不是完全无伤，而是：

```text
允许轻中度卡通受伤，禁止严重写实创伤。
```

### 2.3 `contrast_comedy`

负责：

- 大身体 + 小道具
- 凶狠外表 + 温柔行为
- 英雄登场 + 生活化动作
- 高压画面 + 荒诞道具
- 弱小角色 + 超强能力
- 严肃人物 + 可爱习惯
- 反派气场 + 笨拙日常

它解决的是：

```text
笑点和人物记忆点如何通过“预期落差”产生。
```

例如：

```text
一个身形庞大、气场压迫的超级奶爸，骑着一辆明显过小的小自行车。
```

这个例子不是纯剧本，也不是纯画面效果，而是跨阶段的反差表达：

```text
剧本发起 → 角色成立 → 表演放大 → 分镜兑现 → 特效辅助
```

---

## 3. 统一字段设计

建议 v4 在 `PROJECT_BOARD.md` 中加入一个顶层字段：

```yaml
expressive_animation:
  enabled: true
  mode: animated_feature_comedy
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
    forbidden_overuse:
      - repeated_same_gag
      - every_scene_has_contrast
      - breaking_serious_emotional_scene
    tonal_boundary:
      preserve_character_consistency: true
      contrast_must_serve_story_or_character: true
      avoid_random_meme_stack: true
```

为什么要统一放在 `expressive_animation` 下：

1. 三者都属于“动画电影表现力增强”。
2. 三者都影响剧本、表演、分镜、视频 prompt。
3. 三者都需要密度控制和调性边界。
4. 三者都不能在每个镜头乱用。

---

## 4. 反差喜剧到底属于哪一层

以“超级奶爸骑小自行车”为例。

### 4.1 剧本层：笑点机制

```yaml
script_function:
  contrast_type: size_mismatch + identity_behavior_gap
  expectation: 观众预期超级奶爸应使用大型、强力、压迫感交通工具
  payoff: 他认真骑上一辆明显过小的小自行车
  emotional_function:
    - 可爱化角色
    - 降低压迫感
    - 建立亲和力
    - 制造喜剧记忆点
```

在剧本层，它是一个 beat 设计。

### 4.2 角色层：人物反差画像

```yaml
character_contrast_profile:
  outer_identity: 身形庞大、压迫感强、像动作片硬汉
  inner_behavior: 细心、温柔、认真履行奶爸职责
  contrast_hook: 巨大身体与温柔日常之间的反差
```

在角色层，它帮助人物立住。

### 4.3 表演层：动作喜剧

```yaml
contrast_performance:
  physical_behavior:
    - 坐上车时车架轻微下沉
    - 膝盖几乎顶到胸口
    - 宽大肩膀和小车把形成比例反差
    - 角色表情非常认真，不觉得自己好笑
    - 铃铛叮一声，角色仍然保持硬汉气场
  comedic_timing:
    reveal_hold: 0.5s
    reaction_delay: 0.3s
```

在表演层，它决定这个反差好不好笑。

### 4.4 分镜层：视觉揭晓

```yaml
contrast_storyboard:
  setup_shot: 先拍超级奶爸巨大背影或低机位英雄式登场
  reveal_shot: 切到全身，揭示他骑的是一辆过小的小自行车
  framing: 侧面宽镜头强化体型与车的比例差
  hold: 停顿半秒让观众看清楚
  follow_through: 小自行车摇晃，但角色一本正经骑走
```

在分镜层，它是一个 reveal payoff。

### 4.5 VFX 层：轻辅助

```yaml
contrast_vfx_support:
  allowed:
    - tiny_bicycle_suspension_squash
    - small_dust_puff_on_start
    - subtle_tire_squeak
    - bell_sound_contrast
  avoid:
    - 大量粒子遮住主体反差
    - 过度夸张导致角色变低幼
```

在 VFX 层，它不是主角，只做辅助。

---

## 5. 反差类型库

### 5.1 体型反差：`size_mismatch`

```yaml
size_mismatch:
  examples:
    - 大块头骑小自行车
    - 小角色拖着巨大行李箱
    - 高大角色坐儿童椅
    - 小宠物顶住巨大怪物
    - 巨大机器人拿迷你茶杯
  use_for:
    - 可爱化强角色
    - 放大弱角色勇气
    - 制造视觉记忆点
  avoid:
    - 每场都重复大小反差
    - 让角色能力看起来不可信
```

### 5.2 道具比例反差：`prop_scale_irony`

```yaml
prop_scale_irony:
  examples:
    - 硬汉拿粉色小饭盒
    - 反派用儿童雨伞
    - 超级英雄骑共享单车
    - 巨人用迷你手机
    - 高级特工从小熊背包掏装备
  use_for:
    - 生活化角色
    - 制造亲和力
    - 打破装腔感
```

### 5.3 性格反差：`personality_gap`

```yaml
personality_gap:
  examples:
    - 外表凶狠但非常温柔
    - 看起来柔弱但非常能打
    - 高冷角色其实社恐
    - 不靠谱角色关键时刻最稳
    - 反派打扮但很爱整理家务
  use_for:
    - 角色立体化
    - 反转人物预期
    - 增加观众好感
```

### 5.4 身份与行为反差：`identity_behavior_gap`

```yaml
identity_behavior_gap:
  examples:
    - 奶爸像黑帮大哥一样登场，却在认真接娃
    - 老板像实习生一样紧张汇报
    - 反派造型却在排队买菜
    - 英雄登场镜头后开始修儿童玩具
  use_for:
    - 强化喜剧人设
    - 打破类型片套路
    - 制造短视频传播点
```

### 5.5 情绪反差：`emotion_gap`

```yaml
emotion_gap:
  examples:
    - 全员紧张，只有一个角色淡定吃东西
    - 看似大发雷霆，实际只是委屈
    - 气势汹汹冲来，开口却奶声奶气
    - 全场严肃，角色小心翼翼哄娃
  use_for:
    - 打破紧张
    - 制造反转
    - 增加人物可爱感
```

### 5.6 画面语境反差：`visual_context_gap`

```yaml
visual_context_gap:
  examples:
    - 史诗镜头拍买菜
    - 战斗打光拍接孩子放学
    - 英雄式低机位拍角色骑小车
    - 黑帮谈判构图拍亲子沟通
  use_for:
    - 类型反差
    - 高级喜剧质感
    - 强化画面记忆点
  caution:
    - 不能破坏真正严肃的情绪场
```

---

## 6. 反差使用密度规则

反差喜剧不能滥用。

推荐规则：

```yaml
contrast_comedy_density:
  project_level:
    max_core_contrasts_per_project: 2
    note: 一个项目最多抓 1 到 2 个核心反差母题。
  segment_level:
    max_hero_contrast_per_segment: 1
    note: 一个视频分段最多一个主反差笑点。
  beat_level:
    use_when:
      - character_introduction
      - comedic_payoff
      - tension_release
      - hero_moment
      - contrast_reveal
    avoid_when:
      - serious_emotional_scene
      - climax_tension_without_release
      - exposition_heavy_scene
      - repeated_same_gag
```

大白话：

```text
反差要像调味料，不是主食。
一个项目有核心反差母题就够了，不要每个镜头都抖包袱。
```

---

## 7. 与动画风格化系统的关系

反差喜剧和动画风格化是互补关系。

### 7.1 反差是笑点核心，动画特效是辅助

例如：

```text
大块头骑小自行车
```

核心笑点是：

```text
体型和道具比例反差 + 气质和行为反差
```

不是：

```text
冲击环、速度线、烟尘、星星
```

所以推荐：

```yaml
contrast_first_effect_second:
  core: size_mismatch + deadpan_performance
  support:
    - tiny_bicycle_suspension_squash
    - soft_tire_squeak
    - bell_sound_contrast
  avoid:
    - overwhelming_vfx
    - random_cartoon_symbols
```

### 7.2 动画风格化可放大反差

适当的动画物理可以增强反差：

```yaml
animation_support_for_contrast:
  size_mismatch:
    - 道具被压得轻微下沉
    - 轮胎轻微变形
    - 车把左右晃
  personality_gap:
    - 凶狠角色动作突然变得极轻柔
    - 角色眼神从压迫切换到温柔
  visual_context_gap:
    - 英雄镜头后突然切日常道具特写
    - 庄严音乐戛然而止，换成小铃铛声
```

---

## 8. 与伤害尺度系统的关系

反差喜剧也可以和轻中度卡通伤害结合，但要控制。

### 8.1 可接受组合

```yaml
contrast_plus_minor_injury:
  example_1:
    setup: 凶狠大块头冲进门
    payoff: 被儿童小车绊倒
    injury: 头上起包 + 灰头土脸 + 眼冒金星
    tone: 可爱化，不是羞辱或虐待

  example_2:
    setup: 反派气场拉满准备开火
    payoff: 枪炮后坐力把他弹进沙发
    injury: 黑脸爆炸头 + 小擦伤
    tone: 动作喜剧，不是残酷惩罚
```

### 8.2 禁止组合

```yaml
forbidden_contrast_injury_combo:
  - 用反差包装残酷伤害
  - 把弱小角色受伤当主要笑点
  - 长时间嘲笑角色真实疼痛
  - 用血腥伤口制造反差
  - 用身体恐怖当搞笑点
```

---

## 9. 各 Skill 落地分工

### 9.1 `scene-design-builder`

负责定义项目级表达策略。

```yaml
expressive_animation_design:
  animation_stylization:
    selected_level:
    selected_preset:
    effect_density:
  injury_tone_policy:
    visible_injury_level:
    allowed_minor_injuries:
    forbidden_graphic_injuries:
  contrast_comedy:
    enabled:
    core_contrast_types:
    contrast_density:
    tonal_boundary:
    avoid_overuse_rules:
```

设计阶段要回答：

- 这个项目整体偏写实、动画电影、短视频喜剧，还是荒诞卡通？
- 是否允许轻中度卡通伤害？
- 是否有核心反差母题？
- 哪些反差会破坏人物或情绪？

### 9.2 `scene-script-adapter`

负责识别 Story Beat 里的机会点。

```yaml
expressive_beat_opportunities:
  - beat_id:
    opportunity_type: stylized_action | minor_cartoon_injury | contrast_comedy | combined
    original_beat:
    proposed_expression:
    emotional_function:
    comedic_function:
    safety_or_tonal_note:
```

例如：

```yaml
expressive_beat_opportunities:
  - beat_id: B02
    opportunity_type: contrast_comedy
    original_beat: 超级奶爸准备出门接孩子
    proposed_expression: 先以硬汉低机位登场，再揭示他骑的是一辆过小的小自行车
    emotional_function: 降低压迫感，建立温柔奶爸气质
    comedic_function: 体型与道具比例反差
    safety_or_tonal_note: 不要重复使用小车反差，作为本段唯一主笑点
```

### 9.3 `scene-performance-director`

负责动作与表演落地。

```yaml
expressive_performance:
  - beat_id:
    character_id:
    expression_type:
    physical_action:
    facial_performance:
    contrast_behavior:
    injury_reaction:
    timing:
    recovery_or_settle:
```

### 9.4 `scene-storyboard-director`

负责镜头化呈现。

```yaml
expressive_storyboard_shots:
  - shot_id:
    beat_id:
    shot_role: setup | reveal | impact | hold | recovery | bridge
    animation_physics:
    injury_visibility:
    contrast_framing:
    vfx_support:
    camera_behavior:
    tonal_boundary:
```

### 9.5 `scene-audio-director`

负责声音反差和卡通动作声。

```yaml
expressive_audio:
  - shot_id:
    action_sound:
    injury_gag_sound:
    contrast_sound:
    silence_or_pause:
    forbidden_realistic_sounds:
```

例如：

```yaml
contrast_sound:
  - 小自行车铃铛叮一声
  - 和超级奶爸巨大身形形成声音反差
```

### 9.6 `scene-video-prompt-builder`

负责最终 Segment Prompt 汇总。

```yaml
expressive_animation_prompt:
  segment_id:
  animation_physics:
  injury_tone:
  contrast_comedy:
  vfx_support:
  audio_hooks:
  negative_boundary:
```

---

## 10. 推荐执行期资产组织

建议新增或保留：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

职责：

```yaml
assets/animation-stylization/effect-library.md:
  contains:
    - animation physics effect enums
    - VFX enums
    - injury tone policy
    - action scene trigger templates

assets/animation-stylization/contrast-comedy-library.md:
  contains:
    - contrast type enums
    - contrast density rules
    - character contrast profiles
    - prop scale irony templates
    - visual reveal templates
    - contrast prompt fragments
```

未来如果体系变大，也可以改为：

```text
assets/expressive-animation/effect-library.md
assets/expressive-animation/contrast-comedy-library.md
assets/expressive-animation/injury-tone-policy.md
```

但当前为了少改目录，可以继续沿用：

```text
assets/animation-stylization/
```

---

## 11. Prompt 模板示例

### 11.1 超级奶爸骑小自行车

```text
通过反差喜剧建立角色记忆点：一个身形庞大、肩膀宽厚、气场像动作片硬汉的超级奶爸，认真骑在一辆明显过小的小自行车上。镜头先用低机位拍他的巨大身影和严肃表情，再切到全身侧面镜头揭示小自行车的比例反差。车架被压得轻微下沉，轮胎有一点弹性变形，小铃铛发出清脆的“叮”声。角色表情保持一本正经，不自知地制造笑点。不要加入过多特效，让体型、道具和气质反差成为画面核心。
```

### 11.2 反差 + 动画物理 + 轻伤

```text
角色以强势姿态冲来，却被一个很小的儿童玩具车绊到。动作以动画电影级喜剧物理表现：脚底打滑，身体在半空停顿半拍，落地时地面像软垫一样轻轻下陷，扬起圆润尘雾。角色坐起来时灰头土脸、头上起一个卡通包、眼冒金星，但没有真实伤口、大量流血或痛苦特写。笑点来自巨大气场和小玩具之间的反差。
```

### 11.3 严肃镜头 + 生活化行为反差

```text
使用史诗式低机位和戏剧化背光拍摄角色登场，让观众以为他要执行危险任务。停顿半秒后揭示他只是拎着粉色小饭盒去接孩子。画面保持电影质感，反差来自英雄式构图和温柔生活行为之间的落差，不要使用过多卡通符号。
```

---

## 12. 默认配置建议

```yaml
expressive_animation:
  enabled: true
  mode: animated_feature_comedy
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
    forbid_large_blood_loss: true
    forbid_graphic_wounds: true
    forbid_gore: true
    forbid_realistic_weapon_wound: true
    forbid_prolonged_pain_focus: true
    restore_character_integrity_after_gag: true
  contrast_comedy:
    enabled: selective
    contrast_density: low_to_medium
    max_core_contrasts_per_project: 2
    max_hero_contrast_per_segment: 1
    default_use_cases:
      - character_introduction
      - comedic_payoff
      - tension_release
      - hero_moment
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

## 13. 落地优先级

建议分三步落地。

### 第一阶段：资产库与协议字段

- 新增 `assets/animation-stylization/contrast-comedy-library.md`。
- 在 `board-protocol.md` 中加入 `expressive_animation` 顶层字段。
- 在 `PROJECT_BOARD.md` 模板中加入默认配置。

### 第二阶段：各 Skill 输出字段

- `scene-design-builder`：项目级表达策略。
- `scene-script-adapter`：机会点识别。
- `scene-performance-director`：具体表演。
- `scene-storyboard-director`：镜头化 reveal / impact / hold。
- `scene-audio-director`：声音反差与卡通动作声音。
- `scene-video-prompt-builder`：最终 prompt 汇总。

### 第三阶段：密度控制与确认闸门

- 反差喜剧需要用户确认，不能自动大量加入。
- 强特效、轻伤尺度、枪炮动作、反差核心母题都应进入设计阶段确认。
- 一个段落只允许一个主反差笑点，避免梗堆叠。

---

## 14. 总结

SceneForge v4 的核心升级不只是“更会加特效”。

更准确地说，它应该具备：

```text
动画动作语法 + 家庭向伤害尺度 + 反差喜剧设计 + 多阶段一致性
```

其中：

- `animation_stylization` 解决动作如何更动画、更有冲击。
- `injury_tone_policy` 解决受伤尺度如何既有表现力又不血腥。
- `contrast_comedy` 解决笑点和角色记忆点如何通过预期落差成立。

最终目标是：

```text
让 SceneForge 能产出更像动画电影片段的短视频方案，
而不是只把剧情翻译成普通 3D 镜头 prompt。
```
