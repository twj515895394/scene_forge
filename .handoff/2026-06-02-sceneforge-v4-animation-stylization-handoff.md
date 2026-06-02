# SceneForge v4 动画电影级夸张表演与 VFX 体系交接文档

日期：2026-06-02

## 1. 本次交接目的

本交接文档用于记录 SceneForge v4 下一阶段升级方向：

```text
Animation Stylization System
动画电影级夸张物理表演与喜剧 VFX 系统
```

该体系的完整设计方案已落地到：

```text
docs/SceneForge-v4-Animation-Stylization-System.md
```

注意：该文档位于 `docs/`，只供人类阅读和协议改造参考。按照 v3 当前规则，任何 Skill / Agent 在项目运行时都不得读取 `docs/` 作为阶段执行上下文。

后续如果要正式落地 v4，需要把稳定规则转写到：

```text
.agents/skills/**/SKILL.md
.agents/skills/**/references/output-contract.md
.agents/skills/scene-forge/references/board-protocol.md
项目 PROJECT_BOARD.md 初始化模板
```

而不是在运行时读取 `docs/`。

---

## 2. 当前仓库状态摘要

### 2.1 v3 已完成的关键规则

当前 v3 已经完成以下基础约束：

1. `scene-forge` 总控入口已扩大触发范围。
   - 用户说“我想制作某个片段”
   - “根据某个影视桥段 / 热点事件 / 原著内容做一个视频”
   - “帮我把这个桥段做成 3D 动画 / 动画电影风格 / 短视频”
   - 用户提供链接、截图、台词、剧情梗概或片段名，希望判断能不能做
   - 用户说“继续 / 下一步 / 推进这个项目”

2. 总控只执行 `PROJECT_BOARD.md` 的 `next_stage`。
   - 用户说“继续”不得连跑多个阶段。
   - 不得跳步或同时展开多个阶段。

3. 关键阶段已加入确认闸门。
   - `scene-design-builder`
   - `scene-script-adapter`
   - `scene-storyboard-director`
   - `scene-video-prompt-builder`

4. 当前 SceneForge 只输出：
   - 结构化方案
   - 角色 / 场景 / 道具设定图 prompt
   - 全场景资产总参考图 prompt
   - 故事板图 prompt
   - 视频分段提示词
   - 声音制作说明 / 音乐 prompt / 拟音 prompt
   - 发布文案、字幕文案、配音文案

5. 当前 SceneForge 不生成：
   - 最终图片
   - 最终视频
   - 最终音频

6. 运行时禁止 Skill / Agent 读取：
   - `docs/`
   - `.handoff/`
   - `会话记录_*.md`
   - 历史项目输出
   - 其他无关项目目录

### 2.2 v3 当前项目记忆字段

当前 `PROJECT_BOARD.md` 已具备或计划稳定使用以下通用记忆字段：

```yaml
context_policy:
user_confirmations:
segment_strategy:
hero_moments:
bridge_shots:
prop_state_machines:
blocking_map:
faction_layout:
```

这些字段解决的是：

- Token 与上下文边界
- 用户确认闸门
- 整片目标时长与技术分段
- Hero Moment / 看点镜头
- Bridge Shot / 桥接分镜
- 道具状态机
- Blocking Map / 空间调度图
- Faction Layout / 阵营布局

---

## 3. v4 新增设计主题

v4 重点不是继续扩大自动化，而是补充“动画化转译能力”。

核心问题：

```text
当原片段中存在暴力、冲突、受伤、追打、摔倒、撞击、惊吓、尴尬、爆发等强动作时，
不要直接复刻现实伤害，
而是转译成动画电影级夸张物理表演 + 喜剧 VFX + 安全边界明确的画面笑点。
```

典型表达：

- 压扁与拉伸
- 弹性回弹
- 撞击贴墙
- 纸片化滑落
- 尘雾 puff
- 冲击环
- 速度线 / 动势弧线
- 眩晕星星
- 道具和环境延迟反应
- 背景群众反应波
- 半秒喜剧停顿

该体系的主要价值：

1. 增强动画电影感。
2. 提升短视频爆点。
3. 降低血腥和暴力风险。
4. 增强多阶段一致性。

---

## 4. v4 建议新增字段

建议新增顶层通用字段：

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

也可新增或并入：

```yaml
violence_translation_policy:
  prefer_cartoon_physics: true
  replace_realistic_harm_with_impact_gag: true
  avoid_weapon_contact_detail: true
  use_deformation_and_vfx_for_payoff: true
```

---

## 5. v4 建议档位

建议 `animation_stylization.level` 使用四档：

```yaml
grounded:
expressive:
comedic_push:
wild_cartoon:
```

含义：

1. `grounded`
   - 克制电影化
   - 轻微动作夸张和轻微尘雾
   - 不使用强卡通贴墙、纸片化等效果

2. `expressive`
   - 标准动画电影化
   - 有明显 squash and stretch、节奏化停顿、轻微 VFX
   - 适合大多数 SceneForge 项目

3. `comedic_push`
   - 喜剧强化
   - 允许明显撞击变形、贴墙、纸片化滑落、烟尘团、道具弹跳
   - 适合短视频爆点和高风险动作安全转译

4. `wild_cartoon`
   - 强卡通化
   - 大幅身体变形、多次回弹、物理规则明显卡通化
   - 适合鬼畜离谱化，但需要谨慎

推荐与现有 `performance_style` 的默认映射：

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

但这只是默认建议，不应强绑死。

---

## 6. v4 各 Skill 落地分工

### 6.1 `scene-forge/references/board-protocol.md`

需要新增：

- `animation_stylization` 顶层字段
- 可选 `violence_translation_policy`
- 与现有 `performance_style` 的推荐映射
- 安全边界说明
- v4 字段仍遵守 v3 的确认闸门和运行时禁止读取 `docs/` 规则

### 6.2 `scene-design-builder`

设计阶段负责定义规则，而不是具体镜头。

建议新增：

```yaml
animation_stylization:
  level:
  deformation_language:
  vfx_language:
  environment_reactivity:
  safety_boundary:
```

需要回答：

- 本项目适合多夸张？
- 角色身体能不能拉伸？
- 墙、桌子、道具能不能卡通变形？
- VFX 是克制还是明显？
- 是否允许贴墙、纸片化、星星眩晕？
- 哪些效果禁止？

### 6.3 `scene-script-adapter`

剧本阶段负责识别哪些 Story Beat 有动画化转译机会。

建议新增：

```yaml
stylized_action_opportunities:
  - beat_id:
    original_action_risk:
    proposed_animation_translation:
    emotional_function:
    safety_note:
```

对高风险动作，优先尝试动画化安全转译，而不是直接复刻现实伤害。

### 6.4 `scene-performance-director`

表演阶段负责设计具体表演形变。

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

动作节奏应遵循：

```text
anticipation → impact → deformation → hold → rebound / settle
```

### 6.5 `scene-storyboard-director`

分镜阶段负责把夸张动作落成镜头和 VFX。

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

每个夸张动作镜头必须写明：

- 动画原则
- VFX 元素
- 喜剧停顿
- 安全边界
- 与 Segment / Bridge Shot 的衔接

### 6.6 `scene-audio-director`

声音阶段负责为夸张动作设计声音钩子。

建议新增：

```yaml
stylized_action_audio:
  - shot_id:
    impact_sound:
    slide_sound:
    rebound_sound:
    comedic_pause:
```

例如贴墙、滑落、回弹、烟尘、停顿都应该有声音设计。

### 6.7 `scene-video-prompt-builder`

视频提示词阶段负责把动画物理、VFX 和安全边界写进最终 Segment Prompt。

建议新增：

```yaml
stylized_action_prompt:
  segment_id:
  animation_physics:
  vfx_elements:
  safety_boundary:
  audio_hooks:
```

每段提示词应整合：

- 动画物理原则
- 具体夸张动作
- VFX 元素
- 安全边界
- 声音钩子
- 与参考图、故事板图和 Segment 连续性的关系

---

## 7. 典型安全转译案例

原始危险表达：

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

v4 转译方向：

```text
刀具攻击不直接表现为刺伤，而转译为摩托车轮式夸张冲击。
摊主被非写实卡通冲击撞飞到墙上，身体像纸片一样贴墙、滑落、回弹。
```

转译后的画面功能：

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

---

## 8. v4 Prompt 模板参考

中文模板：

```text
本段使用动画电影级夸张物理表演。
动作遵循 anticipation → impact → deformation → hold → settle 的节奏。
当冲击发生时，角色以非写实卡通方式产生压扁、拉伸、回弹或贴墙变形。
使用适度的尘雾 puff、冲击环、速度线、动作弧线和道具弹跳强化画面。
所有变形都保持喜剧化、橡皮感、无真实伤害。
不要血液、伤口、骨折、真实痛苦或恐怖身体变形。
特效服务情绪和笑点，不喧宾夺主。
```

英文模板：

```text
Use animated feature-film physical comedy. The action follows anticipation, impact, deformation, hold, and settle. During the impact, the character reacts in a non-realistic cartoon way with squash and stretch, elastic rebound, wall splat, or soft deformation. Add subtle dust puffs, impact rings, speed lines, motion arcs, and prop bounce to emphasize timing and comedy. Keep all deformation playful, rubbery, and non-injurious. No blood, no wounds, no broken bones, no realistic pain, no body horror. VFX should support emotion and comedy, not overpower the scene.
```

---

## 9. 后续执行建议

建议下一轮按以下顺序执行：

1. 先更新 `scene-forge/references/board-protocol.md`。
2. 再更新 `docs/项目创建规范.md` 中的 PROJECT_BOARD 初始化字段，但注意该文档仍只供人类阅读。
3. 再更新 `scene-design-builder` 的 `SKILL.md` 和 `output-contract.md`。
4. 再更新 `scene-script-adapter`。
5. 再更新 `scene-performance-director`。
6. 再更新 `scene-storyboard-director`。
7. 再更新 `scene-audio-director`。
8. 最后更新 `scene-video-prompt-builder`。
9. 用一个测试项目验证：
   - 高风险动作是否被转译为动画冲击笑点
   - 是否仍遵守 v3 的确认闸门
   - 是否不读取 `docs/`
   - 是否不声称生成图片/视频/音频

---

## 10. 重要注意事项

1. `docs/SceneForge-v4-Animation-Stylization-System.md` 是设计文档，不是运行时上下文。
2. 后续落地时，不要让 Skill 通过读取 `docs/` 来执行 v4。
3. 必须把稳定协议写进 `.agents/skills/**/references/output-contract.md`。
4. `animation_stylization` 不应替代 `performance_style`，而应作为独立维度。
5. `performance_style` 可以给默认建议，但用户可以覆盖 `animation_stylization.level`。
6. 高风险动作转译应优先保持喜剧化、安全化、非写实化。
7. 所有阶段都要保留安全边界：不血腥、不真实受伤、不身体恐怖、不聚焦痛苦。
8. v4 不应削弱 v3 的阶段确认闸门。
9. v4 不应让总控连跑多阶段。
10. v4 不应引入任何样例项目专属角色、台词、站位或桥段到通用协议。

---

## 11. 本次新增文件

```text
docs/SceneForge-v4-Animation-Stylization-System.md
.handoff/2026-06-02-sceneforge-v4-animation-stylization-handoff.md
```

---

## 12. 当前状态

本轮只完成 v4 设计方案文档与交接文档落地。

尚未把 v4 字段写入运行时 Skill / output-contract。

下一轮如果要继续，应从 `board-protocol.md` 和 `scene-design-builder` 开始正式协议改造。
