# SceneForge v4：动画风格化效果库与场景触发库

> 本文档是 `docs/SceneForge-v4-Animation-Stylization-System.md` 的补充附录。
>
> 作用：扩充 Animation Stylization System 的特效枚举、喜剧动作库、情绪 VFX、场景触发模板和 Prompt 片段，供人类阅读与后续协议改造参考。
>
> 注意：当前 v3 运行时规则仍然禁止 Skill / Agent 把 `docs/` 作为阶段执行上下文。后续正式落地时，应把稳定字段转写进 `.agents/skills/**/SKILL.md`、`.agents/skills/**/references/output-contract.md`、`.agents/skills/scene-forge/references/board-protocol.md` 与 `PROJECT_BOARD.md` 初始化模板。

---

## 1. 设计定位

主文档已经定义了 Animation Stylization System 的核心目标、能力模块、档位、Skill 落地分工与安全边界。

本补充文档解决三个问题：

1. **特效枚举不够全**：把可复用的动画物理、VFX、情绪符号、道具反应、声音钩子整理成库。
2. **场景覆盖不够广**：补充追逐、摔倒、误会、爆发、尴尬、群体混乱、交通冲击、厨房事故、办公室闹剧、奇幻魔法等常见场景。
3. **落地选择不够明确**：提供“场景触发 → 推荐档位 → 推荐效果 → 禁用项 → Prompt 片段”的组合模板，方便后续 Skill 结构化输出。

这不是要求每个项目都堆满特效。原则仍然是：

```text
特效服务情绪、节奏和安全转译；
不是为了炫技而随机添加视觉噪音。
```

---

## 2. 效果使用总规则

### 2.1 每个特效必须有触发理由

可接受的触发理由包括：

- 强动作冲击：撞击、摔倒、追逐、躲闪、爆炸式启动。
- 情绪爆点：愤怒、惊吓、尴尬、得意、崩溃、心虚、误会升级。
- 喜剧节奏：铺垫、停顿、反转、慢半拍、集体反应。
- 安全转译：把真实攻击、受伤、危险动作改写成卡通物理笑点。
- 世界观表达：奇幻、科幻、童话、荒诞喜剧、玩具化空间。

不建议的触发方式：

- 没有动作或情绪理由，只是“加点酷炫特效”。
- 所有镜头都加速度线、冲击环、尘雾，导致画面廉价。
- 正剧情绪段落强行加入低幼卡通符号。
- 高风险动作仍保留真实伤害细节，只在旁边补一点卡通烟尘。

### 2.2 推荐组合方式

优先使用组合，而不是孤立特效。

```text
动作前摇 + 物理变形 + VFX 强调 + 喜剧停顿 + 恢复收尾
```

例如：

```yaml
stylized_action_combo:
  trigger: 角色被突如其来的推力撞飞
  anticipation: 肩膀僵住，眼睛慢慢转向冲击来源
  deformation: 身体被拉成长弧线，四肢滞后半拍
  vfx: speed_lines + soft_impact_ring + dust_puff
  hold: 贴墙后停顿 0.4 秒
  settle: 像贴纸一样滑落，落地后弹回原形
  safety: no_blood_no_wounds_no_realistic_pain
```

### 2.3 档位决定特效强度

```yaml
grounded:
  max_effect_density: low
  allowed: subtle_physics, light_dust, cloth_inertia, micro_expression_pop
  avoid: wall_splat, paper_flatten, stars, impossible_body_twist

expressive:
  max_effect_density: medium
  allowed: squash_stretch, elastic_rebound, motion_arcs, light_impact_vfx, emotional_background_shift
  avoid: repeated_extreme_bounce, full_paper_flatten unless user wants comedy

comedic_push:
  max_effect_density: medium_high
  allowed: wall_splat, paper_slide, dust_cloud, prop_bounce, crowd_reaction_wave, dizziness_stars
  avoid: gore, body_horror, realistic_injury_detail

wild_cartoon:
  max_effect_density: high
  allowed: ricochet_bounce, accordion_compress, noodle_body, impossible_spin, symbol_vfx_burst
  avoid: uncontrolled_visual_noise, confusing_story_continuity, horror_body_deformation
```

---

## 3. 夸张物理表演枚举：`physical_exaggeration`

### 3.1 身体形变类

```yaml
physical_exaggeration.body_deformation:
  squash_stretch: 压扁与拉伸，动画物理基础效果
  elastic_rebound: 橡皮感回弹，适合撞击后恢复
  impact_flattening: 撞击瞬间压扁，适合墙面、地面、门板冲击
  paper_flatten: 纸片化变薄，适合强喜剧贴墙或门缝挤压
  accordion_compress: 手风琴式压缩，适合被门、箱子、弹簧道具挤压
  noodle_body: 面条化身体，适合惊吓、脱力、晕眩
  rubber_limb_stretch: 四肢橡皮拉长，适合抓取、被拽、飞扑
  corkscrew_twist: 螺旋扭转，适合旋转飞出或被风卷起
  balloon_inflate: 短暂气球膨胀，适合愤怒、憋气、被气流灌满
  pinched_tiny_body: 突然缩小成小团，适合尴尬、心虚、被气场压制
  giant_head_take: 头部瞬间放大，适合惊讶反应
  eye_pop_take: 眼睛夸张弹出但保持可爱化，适合震惊
  jaw_drop_stretch: 下巴夸张下落，适合难以置信
  shoulder_sag_melt: 肩膀融化式下垂，适合崩溃和认输
  spine_wave: 身体像波浪一样传导冲击，适合被吓到或被电流感惊吓
```

### 3.2 动作动力学类

```yaml
physical_exaggeration.motion_dynamics:
  anticipation_squeeze: 动作前先压缩蓄力
  launch_stretch: 起跳或冲出时身体拉长
  overshoot_settle: 动作超过目标后回落稳定
  stagger_recoil: 受冲击后踉跄回震
  delayed_reaction: 身体或表情慢半拍反应
  chain_reaction_recoil: 冲击从头到脚或从脚到头传导
  smear_motion: 高速拖影
  multiple_pose_smear: 同一角色出现连续姿态残影
  snap_to_pose: 一帧式切换到夸张姿势
  hang_time: 半空中停顿一拍再下落
  gravity_delay: 重力延迟，适合角色意识到危险后的喜剧下坠
  skid_stop: 脚底打滑刹停
  windup_spin: 原地旋转蓄力
  ricochet_bounce: 在多个表面之间弹射
  boomerang_return: 飞出去后像回力镖一样返回
  magnet_pull: 像被磁铁吸走一样突然贴向目标
  suction_stretch: 被吸力拉成长条
  spring_pop: 像弹簧一样突然弹起
```

### 3.3 表情与姿态类

```yaml
physical_exaggeration.expression_pose:
  freeze_take: 惊吓定格
  double_take: 看一眼、反应半秒、再猛然回头
  slow_blink_realization: 慢眨眼后意识到问题
  embarrassed_shrink: 尴尬时角色缩小、肩膀收紧
  proud_chest_puff: 得意时胸口膨起、下巴上扬
  angry_puff_up: 愤怒时身体短暂膨胀
  panic_scramble: 原地小碎步打滑但没移动
  guilty_micro_tremble: 心虚时微微颤抖
  fake_confidence_crack: 假装镇定，表情突然裂开
  heroic_pose_overdo: 过度英雄姿势导致失衡
  defeated_puddle_pose: 失败后瘫成一滩但保持非恐怖
```

---

## 4. 喜剧冲击设计枚举：`impact_gag_design`

### 4.1 表面冲击类

```yaml
impact_gag_design.surface_impact:
  wall_splat: 贴墙变扁
  door_splat: 贴在门板上，门板反弹
  glass_squish_no_break: 贴玻璃但玻璃像橡胶一样变形，不碎裂伤人
  floor_pancake: 砸到地面短暂变成煎饼形
  ceiling_bonk: 弹到天花板，留下卡通凹印
  corner_fold: 撞到墙角后身体像纸张折角
  poster_peel_slide: 像海报一样从墙上慢慢剥落
  stamp_mark_impact: 墙面或地面留下夸张轮廓印
  soft_crater_bounce: 地面出现软凹坑后把角色弹回
```

### 4.2 弹射与容器类

```yaml
impact_gag_design.launch_container:
  barrel_pop_in: 弹进木桶或垃圾桶
  box_fold_in: 把纸箱撞成折叠形，角色从箱盖探头
  basket_swallow: 被篮筐或布袋套住
  laundry_wrap: 被布料或窗帘卷住
  umbrella_flip: 被伞面弹开或包住
  spring_trap_pop: 坐到弹簧道具上被弹起
  vending_slot_squeeze: 被挤进狭窄缝隙后像纸片滑出
  cushion_sink_rebound: 掉进软垫深陷后弹出
  toy_box_jumble: 掉进玩具箱，道具随后慢半拍飞出
```

### 4.3 旋转与混乱类

```yaml
impact_gag_design.spin_chaos:
  tornado_spin: 角色和小道具卷成小龙卷
  wheel_roll: 角色蜷成轮子滚动
  dizzy_orbit: 小星星、小鸟、道具围绕头顶转
  spiral_launch: 螺旋状飞出画面
  pinball_hit: 像弹珠一样在物体之间弹跳
  boomerang_curve: 飞行轨迹弯回原地
  group_domino: 多个角色像多米诺骨牌一样倒下
  chair_spin_out: 椅子旋转，角色被甩出但安全落地
  tablecloth_pull_chaos: 桌布被拉走，道具悬停半拍后掉落
```

### 4.4 安全替代高风险动作类

```yaml
impact_gag_design.safety_translation:
  weapon_to_prop_sweep: 把武器接触改写成道具扫过或冲击风
  punch_to_air_burst: 把真实击打改写成夸张空气冲击波
  fall_to_bounce: 把危险坠落改写成软垫反弹
  crash_to_splat: 把真实撞击改写成贴墙纸片化
  chase_to_skid: 把追打改写成脚底打滑和道具阻挡
  explosion_to_confetti_puff: 把爆炸式冲击改写成彩纸、烟尘和弹跳
  crush_to_accordion: 把挤压风险改写成手风琴式非伤害变形
  cut_to_ribbon_gag: 把切割风险改写成衣带、纸带、装饰带飞散，不接触身体
  fire_to_soot_face: 把火焰危险改写成烟熏黑脸和夸张眨眼，避免烧伤
```

---

## 5. VFX 画面语言枚举：`vfx_language`

### 5.1 冲击与速度类

```yaml
vfx_language.impact_speed:
  impact_rings: 冲击环
  shockwave_ripple: 空气波纹
  speed_lines: 速度线
  motion_arcs: 动势弧线
  radial_burst: 放射线爆点
  contact_flash: 接触瞬间短闪
  squash_shadow: 变形投影
  stretch_blur: 拉伸模糊
  afterimage_trail: 姿态残影
  compression_wave: 被压缩的空气波
  ground_ripple: 地面软波纹
  camera_bump: 镜头轻微震动，但不眩晕
```

### 5.2 尘雾与粒子类

```yaml
vfx_language.particles:
  dust_puffs: 圆润尘雾团
  smoke_trails: 烟尘尾迹
  soft_debris: 轻量非尖锐碎屑
  paper_bits: 纸屑
  leaves_swirl: 树叶旋转
  flour_cloud: 面粉云，适合厨房喜剧
  soap_bubbles: 肥皂泡，适合浴室/清洁场景
  sparkle_pop: 小闪光
  confetti_burst: 彩纸爆开
  snow_puff: 雪粉团
  sand_splash: 沙尘飞溅
  water_splat: 水花拍扁形状
```

### 5.3 符号化漫画效果类

```yaml
vfx_language.symbolic:
  cartoon_stars: 眩晕星星
  tiny_birds: 头顶小鸟绕圈
  question_marks: 困惑问号
  exclamation_pop: 惊叹号弹出
  sweat_drop: 尴尬汗滴
  anger_marks: 愤怒符号
  heart_pop: 心动或喜欢
  broken_heart_icon: 失落或误会
  tiny_storm_cloud: 头顶小乌云
  lightbulb_idea: 灵光一闪
  money_eye_flash: 贪心或得意
  warning_triangle: 危险预感，但要风格化
  silence_crow: 冷场乌鸦飞过，可用作可选梗
```

### 5.4 背景与构图强调类

```yaml
vfx_language.background_accent:
  freeze_frame_accent: 定格强调
  flash_accent: 喜剧闪白
  background_squeeze: 背景挤压
  background_zoom_tunnel: 背景隧道式拉远
  emotional_gradient_shift: 情绪渐变背景
  spotlight_isolation: 聚光灯式孤立角色
  vignette_pressure: 四周压暗制造压迫
  stage_curtain_snap: 舞台幕布式转场
  comic_panel_split: 漫画分格
  speed_tunnel: 高速通道背景
  silent_empty_background: 尴尬时背景突然空白
  dramatic_shadow_drop: 角色身后阴影夸张落下
```

---

## 6. 情绪特效枚举：`emotional_vfx`

### 6.1 愤怒 / 爆发

```yaml
emotional_vfx.anger:
  anger_steam: 耳边或头顶冒蒸汽
  red_pressure_aura: 背景红色压迫气场
  eye_flame_glint: 眼神火光一闪
  body_puff_up: 身体短暂膨胀
  ground_crack_symbolic: 地面出现符号化裂纹，不表现真实破坏
  kettle_whistle_build: 像水壶一样逐步升压
  eyebrows_shadow: 眉眼阴影压低
```

### 6.2 惊吓 / 意识到危险

```yaml
emotional_vfx.shock:
  shock_freeze: 全身定格
  eye_pop_take: 眼睛夸张放大
  soul_pop_out: 灵魂小影子弹出又立刻回去，仅用于 wild_cartoon
  blue_face_drain: 脸色变蓝，适合喜剧恐慌
  background_drop: 背景瞬间下坠
  heartbeat_pulse: 胸口或画面轻微脉冲
  tiny_alarm_icons: 头顶小警报符号
```

### 6.3 尴尬 / 冷场

```yaml
emotional_vfx.awkward:
  awkward_freeze: 画面定住
  cold_wind_sweep: 冷风横扫
  sweat_drop: 头侧汗滴
  shrinking_spotlight: 聚光灯缩小
  silent_crow_pass: 冷场乌鸦飞过
  background_empty_white: 背景抽空变白
  delayed_prop_drop: 一个小物件慢半拍掉下，打破沉默
```

### 6.4 得意 / 反转前膨胀

```yaml
emotional_vfx.pride:
  sparkle_backdrop: 背景闪光
  chin_up_glint: 下巴上扬亮光
  chest_puff: 胸口鼓起
  tiny_fanfare_flags: 小旗帜或小号符号
  golden_rim_light: 金色边缘光
  smug_bubble: 得意泡泡膨胀，反转时破掉
```

### 6.5 崩溃 / 认输

```yaml
emotional_vfx.defeat:
  tiny_storm_cloud: 头顶小乌云
  shoulder_melt: 肩膀融化式下垂
  color_desaturate: 角色局部失去饱和度
  rain_on_head: 小范围下雨
  cracked_confidence_mask: 自信面具符号化裂开
  puddle_slump: 角色瘫成一滩非恐怖形状
```

### 6.6 心虚 / 偷偷摸摸

```yaml
emotional_vfx.guilt_stealth:
  micro_tremble_lines: 微颤线
  darting_eye_trails: 眼神乱瞟轨迹
  nervous_sweat: 小汗珠
  shadow_sneak: 影子先行动
  zipper_mouth: 嘴巴像拉链一样闭住，注意不要恐怖化
  tiptoe_music_notes: 脚步音符符号
```

---

## 7. 道具与场景反应枚举：`environment_reactivity`

### 7.1 建筑与大环境

```yaml
environment_reactivity.architecture:
  wall_deformation: 墙面弹性凹陷
  floor_ripple: 地面像软垫一样波动
  ceiling_dust_fall: 天花板灰尘慢半拍落下
  door_flex_rebound: 门板被撞后弹回
  window_wobble: 窗户果冻式晃动，不碎裂伤人
  signboard_swing: 招牌左右摆动
  lamp_sway: 灯具摇晃
  curtain_wave: 窗帘或布棚波浪式传导
  stair_domino_echo: 楼梯上小物件逐级震动
```

### 7.2 小道具

```yaml
environment_reactivity.props:
  prop_bounce: 小道具弹跳
  delayed_object_fall: 小物件慢半拍掉落
  stack_wobble: 堆叠物摇晃
  cup_spin: 杯子原地旋转
  spoon_flip: 勺子弹起翻转
  hat_pop: 帽子飞起又落回头上
  glasses_slide: 眼镜滑到鼻尖
  paper_fly: 纸张被冲击风卷起
  fruit_bounce: 水果弹跳
  toy_squeak: 玩具被压发出吱声
```

### 7.3 群众与背景角色

```yaml
environment_reactivity.crowd:
  crowd_reaction_wave: 群众像波浪一样依次转头
  synchronized_gasp: 集体吸气
  delayed_applause_misfire: 误会式鼓掌后尴尬停住
  group_lean: 所有人同向倾斜
  domino_fall_safe: 背景人群安全多米诺倒下
  freeze_except_one: 全场定格，只剩一个角色慢慢反应
  background_whisper_bubbles: 背景窃窃私语气泡
  crowd_parting_sea: 人群像海浪一样分开
```

### 7.4 材质专项

```yaml
environment_reactivity.materials:
  cloth_flap: 布料抖动
  rubber_wall: 橡胶墙感
  jelly_table: 果冻桌面回弹
  foam_floor: 泡沫地面吸收冲击
  paper_world_fold: 纸片世界折叠
  toy_plastic_bounce: 玩具塑料弹跳
  water_blob_splash: 水团化飞溅
  flour_soft_cloud: 面粉软云
  snow_cushion: 雪地软垫
```

---

## 8. 声音钩子枚举：`stylized_action_audio`

声音要与画面同样非写实，避免强调疼痛、骨裂、真实击打。

```yaml
stylized_action_audio:
  impact:
    soft_bonk: 柔软“咚”声
    rubber_thump: 橡皮低频碰撞
    pillow_whump: 枕头式闷响
    toy_pop: 玩具弹出声
    comedic_boing: 弹簧 boing
    paper_splat: 纸片贴墙啪声
    puff_burst: 烟尘 puff 声
  motion:
    zipper_whoosh: 高速拉链式掠过
    wind_sweep: 风扫过
    spin_whirr: 旋转嗡声
    skid_squeak: 脚底打滑吱声
    stretch_squeal: 橡皮拉伸声
    wobble_wub: 果冻晃动声
  emotion:
    tiny_whistle: 尴尬小口哨
    silence_drop: 突然静音
    blink_tick: 慢眨眼小 tick
    kettle_pressure: 愤怒升压声
    tiny_alarm: 惊吓小警报
    sparkle_chime: 得意闪光音
  recovery:
    rebound_boing: 回弹声
    paper_slide: 纸片滑落摩擦声
    dust_settle: 灰尘落下细声
    prop_clatter_soft: 道具轻柔散落
```

禁用或慎用：

```yaml
forbidden_audio:
  - bone_crack
  - wet_impact
  - realistic_pain_scream
  - gore_squish
  - weapon_stab_sound
  - injury_detail_sound
```

---

## 9. 场景触发库：`stylized_scene_triggers`

### 9.1 追逐场景

```yaml
scene_trigger: chase
recommended_level: expressive_to_comedic_push
use_when:
  - 角色追赶、逃跑、穿过拥挤空间
  - 动作需要快节奏但不能真实危险
recommended_effects:
  physical:
    - skid_stop
    - smear_motion
    - panic_scramble
    - launch_stretch
    - ricochet_bounce
  vfx:
    - speed_lines
    - dust_puffs
    - motion_arcs
    - afterimage_trail
  environment:
    - crowd_parting_sea
    - signboard_swing
    - paper_fly
  audio:
    - zipper_whoosh
    - skid_squeak
    - comedic_boing
avoid:
  - 真实车祸细节
  - 真实摔伤
  - 持续痛苦表演
prompt_fragment_cn: >
  追逐动作采用动画电影式夸张节奏，角色脚底打滑、身体拉长冲出，身后留下柔和速度线和尘雾。穿过人群时，背景群众像波浪一样让开。所有摔倒和碰撞都以橡皮感回弹处理，不表现真实受伤。
```

### 9.2 摔倒 / 滑倒场景

```yaml
scene_trigger: slip_and_fall
recommended_level: grounded_to_comedic_push
recommended_effects:
  physical:
    - hang_time
    - gravity_delay
    - floor_pancake
    - elastic_rebound
    - delayed_reaction
  vfx:
    - motion_arcs
    - dust_puffs
    - soft_impact_ring
  environment:
    - floor_ripple
    - prop_bounce
    - delayed_object_fall
  audio:
    - skid_squeak
    - pillow_whump
    - rebound_boing
avoid:
  - 头部真实重击
  - 骨折暗示
  - 痛苦呻吟特写
prompt_fragment_cn: >
  角色滑倒时先在半空中停顿一拍，意识到自己要摔倒后表情定格。落地瞬间地面像软垫一样微微下陷，扬起圆润尘雾，角色短暂压扁后弹回坐姿。
```

### 9.3 撞墙 / 撞门场景

```yaml
scene_trigger: wall_or_door_impact
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - impact_flattening
    - paper_flatten
    - poster_peel_slide
    - elastic_rebound
  vfx:
    - impact_rings
    - stamp_mark_impact
    - dust_puffs
  environment:
    - wall_deformation
    - door_flex_rebound
    - signboard_swing
  audio:
    - paper_splat
    - rubber_thump
    - paper_slide
avoid:
  - 真实撞伤
  - 鼻血或伤口
  - 过度痛苦表情
prompt_fragment_cn: >
  角色撞到墙面时不表现真实伤害，而是变成扁平剪影贴在墙上。墙面出现卡通轮廓印和柔和冲击环，停顿半秒后角色像海报一样从墙上滑落并弹回原形。
```

### 9.4 争吵 / 愤怒爆发场景

```yaml
scene_trigger: argument_anger_burst
recommended_level: grounded_to_expressive
recommended_effects:
  physical:
    - angry_puff_up
    - anticipation_squeeze
    - snap_to_pose
  emotional_vfx:
    - anger_steam
    - red_pressure_aura
    - kettle_whistle_build
  environment:
    - cup_spin
    - lamp_sway
    - paper_fly
  audio:
    - kettle_pressure
    - silence_drop
avoid:
  - 真实攻击升级
  - 威胁性武器细节
  - 恐怖化面部变形
prompt_fragment_cn: >
  愤怒爆发时，角色身体短暂膨胀，头顶冒出轻微蒸汽，背景气场向内压缩。桌上的纸张被气流吹起，但动作保持喜剧化，不进入真实暴力。
```

### 9.5 尴尬 / 社死场景

```yaml
scene_trigger: awkward_public_moment
recommended_level: grounded_to_expressive
recommended_effects:
  physical:
    - embarrassed_shrink
    - slow_blink_realization
    - shoulder_sag_melt
  emotional_vfx:
    - awkward_freeze
    - cold_wind_sweep
    - sweat_drop
    - silent_empty_background
  environment:
    - freeze_except_one
    - delayed_object_fall
  audio:
    - silence_drop
    - tiny_whistle
    - blink_tick
prompt_fragment_cn: >
  尴尬发生后，画面突然安静，角色缩小一圈，头侧出现一滴汗。背景被抽成空白冷色，只有一个小物件慢半拍掉落，制造冷场笑点。
```

### 9.6 误会升级场景

```yaml
scene_trigger: misunderstanding_escalation
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - double_take
    - delayed_reaction
    - group_lean
    - panic_scramble
  emotional_vfx:
    - question_marks
    - exclamation_pop
    - background_squeeze
  environment:
    - crowd_reaction_wave
    - synchronized_gasp
    - background_whisper_bubbles
  audio:
    - tiny_alarm
    - silence_drop
    - comedic_boing
prompt_fragment_cn: >
  误会被点燃后，角色先慢半拍转头，随后表情同时炸开。背景群众按从近到远的顺序形成反应波，问号和惊叹号短暂弹出，节奏逐层加速。
```

### 9.7 厨房 / 餐馆事故场景

```yaml
scene_trigger: kitchen_or_restaurant_mishap
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - skid_stop
    - floor_pancake
    - rubber_limb_stretch
    - hang_time
  vfx:
    - flour_cloud
    - water_splat
    - sparkle_pop
  environment:
    - spoon_flip
    - cup_spin
    - fruit_bounce
    - stack_wobble
  audio:
    - soft_bonk
    - prop_clatter_soft
    - puff_burst
avoid:
  - 烫伤细节
  - 刀具切割身体
  - 真实厨房危险事故
prompt_fragment_cn: >
  厨房混乱以软性喜剧方式呈现：面粉变成圆润白云，水果像弹力球一样跳起，盘子在空中旋转但不碎裂伤人。角色被冲击后短暂压扁又弹回。
```

### 9.8 交通 / 车辆冲击场景

```yaml
scene_trigger: vehicle_near_miss_or_cartoon_impact
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - launch_stretch
    - impact_flattening
    - ricochet_bounce
    - hang_time
  vfx:
    - speed_lines
    - shockwave_ripple
    - dust_puffs
    - tire_smoke_trail
  environment:
    - signboard_swing
    - crowd_parting_sea
    - paper_fly
  audio:
    - zipper_whoosh
    - rubber_thump
    - skid_squeak
avoid:
  - 真实车祸伤害
  - 碾压细节
  - 血迹或伤口
prompt_fragment_cn: >
  车辆或轮子只作为非写实卡通冲击源，画面强调速度线、冲击风和角色橡皮式弹飞。不表现碾压、伤口或真实事故后果。
```

### 9.9 办公室 / 教室闹剧场景

```yaml
scene_trigger: office_or_classroom_comedy
recommended_level: grounded_to_expressive
recommended_effects:
  physical:
    - chair_spin_out
    - double_take
    - embarrassed_shrink
    - panic_scramble
  vfx:
    - paper_fly
    - question_marks
    - freeze_frame_accent
  environment:
    - stack_wobble
    - delayed_object_fall
    - synchronized_gasp
  audio:
    - chair_squeak
    - paper_splat
    - silence_drop
prompt_fragment_cn: >
  办公室闹剧使用克制动画物理：文件像雪片一样飞起，椅子轻微旋转，角色慢半拍意识到问题并定格。道具反应比身体变形更明显，整体保持电影化而不过分低幼。
```

### 9.10 魔法 / 科幻失控场景

```yaml
scene_trigger: magic_or_scifi_malfunction
recommended_level: expressive_to_wild_cartoon
recommended_effects:
  physical:
    - suction_stretch
    - magnet_pull
    - floating_suspension
    - corkscrew_twist
    - spring_pop
  vfx:
    - sparkle_pop
    - shockwave_ripple
    - speed_tunnel
    - radial_burst
  environment:
    - prop_bounce
    - toy_box_jumble
    - background_zoom_tunnel
  audio:
    - wobble_wub
    - sparkle_chime
    - toy_pop
avoid:
  - 恐怖身体变形
  - 真实电击伤害
  - 失控到看不清叙事
prompt_fragment_cn: >
  魔法或装置失控时，角色被无形吸力拉成长条，在半空中停顿一拍后像弹簧一样弹回。周围道具漂浮旋转，使用闪光粒子和柔和能量波，不表现真实伤害。
```

### 9.11 群体混乱 / 集体反应场景

```yaml
scene_trigger: crowd_chaos
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - group_domino
    - group_lean
    - freeze_except_one
    - delayed_reaction
  vfx:
    - radial_burst
    - dust_puffs
    - question_marks
  environment:
    - crowd_reaction_wave
    - crowd_parting_sea
    - synchronized_gasp
  audio:
    - synchronized_gasp
    - silence_drop
    - prop_clatter_soft
prompt_fragment_cn: >
  群体混乱不表现真实踩踏或伤害，而是用波浪式反应、同步后仰、多米诺式安全倒下和圆润尘雾表现喜剧节奏。
```

### 9.12 情感反转 / 爽点惩罚场景

```yaml
scene_trigger: payoff_punishment_gag
recommended_level: expressive_to_comedic_push
recommended_effects:
  physical:
    - proud_chest_puff
    - fake_confidence_crack
    - wall_splat
    - paper_slide
    - elastic_rebound
  emotional_vfx:
    - smug_bubble
    - exclamation_pop
    - cartoon_stars
  environment:
    - delayed_object_fall
    - crowd_reaction_wave
  audio:
    - smug_chime_then_pop
    - paper_splat
    - silence_drop
avoid:
  - 真实报复性暴力
  - 血腥惩罚
  - 伤害快感细节
prompt_fragment_cn: >
  反派或嚣张角色的惩罚以卡通物理完成：得意泡泡先膨胀，下一秒被冲击打破，角色贴墙成扁平剪影。观众获得爽点，但画面不表现真实伤害。
```

---

## 10. 风格组合预设：`animation_stylization_presets`

### 10.1 电影克制型

```yaml
preset: cinematic_subtle
recommended_level: grounded
use_for:
  - 情绪戏
  - 温暖叙事
  - 半写实动画短片
features:
  - subtle_squash_stretch
  - cloth_inertia
  - light_dust
  - micro_expression_pop
avoid:
  - wall_splat
  - cartoon_stars
  - paper_flatten
```

### 10.2 标准动画电影型

```yaml
preset: animated_feature_expressive
recommended_level: expressive
use_for:
  - 大多数 SceneForge 动画电影风项目
  - 家庭喜剧
  - 轻动作冒险
features:
  - squash_stretch
  - elastic_rebound
  - motion_arcs
  - impact_rings
  - expressive_face_take
  - prop_bounce
```

### 10.3 短视频爆点型

```yaml
preset: short_video_comedy_payoff
recommended_level: comedic_push
use_for:
  - 反转短视频
  - 名场面安全改编
  - 高风险动作转译
features:
  - wall_splat
  - paper_flatten_slide
  - dust_cloud
  - cartoon_stars
  - crowd_reaction_wave
  - silence_then_pop
```

### 10.4 玩具世界型

```yaml
preset: toy_world_physics
recommended_level: expressive_to_comedic_push
use_for:
  - 玩具、桌面、微缩世界
  - 童话式空间
features:
  - toy_plastic_bounce
  - spring_pop
  - cushion_sink_rebound
  - prop_bounce
  - sparkle_pop
  - miniature_dust_puff
```

### 10.5 荒诞鬼畜型

```yaml
preset: absurd_chaotic_cartoon
recommended_level: wild_cartoon
use_for:
  - 鬼畜离谱化
  - 非写实短视频
  - 强反差改编
features:
  - ricochet_bounce
  - tornado_spin
  - noodle_body
  - corkscrew_twist
  - symbol_vfx_burst
  - impossible_recovery
safety_note: 必须仍然保持无血腥、无真实伤害、无身体恐怖。
```

---

## 11. PROJECT_BOARD 扩展字段建议

主文档已有基础字段。本附录建议增加三个更可控的子字段：

```yaml
animation_stylization:
  level: expressive
  preset: animated_feature_expressive
  effect_density: medium
  physical_exaggeration:
    allowed:
      - squash_stretch
      - elastic_rebound
      - smear_motion
      - overshoot_settle
    selective:
      - impact_flattening
      - hang_time
      - delayed_reaction
    forbidden:
      - body_horror_deformation
      - realistic_injury_deformation
  impact_gag_design:
    allowed_gags:
      - wall_splat
      - paper_flatten_slide
      - dust_puff
      - prop_bounce
    forbidden_gags:
      - visible_injury
      - blood
      - gore
      - realistic_pain_focus
  vfx_language:
    allowed:
      - dust_puffs
      - impact_rings
      - speed_lines
      - motion_arcs
      - cartoon_stars
    density_rule: hero_moment_only
  emotional_vfx:
    allowed:
      - anger_steam
      - awkward_freeze
      - shock_freeze
      - sweat_drop
      - tiny_storm_cloud
  environment_reactivity:
    allowed:
      - prop_bounce
      - delayed_object_fall
      - cloth_flap
      - crowd_reaction_wave
  scene_trigger_rules:
    chase: expressive
    wall_or_door_impact: comedic_push
    awkward_public_moment: grounded
    payoff_punishment_gag: comedic_push
  safety_boundary:
    avoid_blood: true
    avoid_visible_injury: true
    avoid_body_horror: true
    avoid_realistic_pain_focus: true
    avoid_weapon_contact_detail: true
    keep_comedic_tone: true
    restore_character_integrity_after_gag: true
```

### 字段解释

- `preset`：整体风格预设，减少每个阶段重复判断。
- `effect_density`：控制特效密度，避免每个镜头都过度夸张。
- `allowed / selective / forbidden`：比单纯 enabled 更清晰，适合阶段继承。
- `scene_trigger_rules`：不同场景可以自动推荐不同档位，但仍需用户确认。
- `density_rule: hero_moment_only`：建议强特效只用于 Hero Moment 或关键转译镜头。

---

## 12. Skill 输出字段增强建议

### 12.1 `scene-design-builder`

```yaml
animation_stylization_design:
  selected_preset:
  selected_level:
  effect_density:
  body_deformation_policy:
  impact_gag_policy:
  vfx_density_policy:
  emotional_vfx_policy:
  environment_reactivity_policy:
  scene_trigger_rules:
  forbidden_effects:
  safety_boundary:
```

要求：设计阶段只定义规则，不写具体镜头。

### 12.2 `scene-script-adapter`

```yaml
stylized_action_opportunities:
  - beat_id:
    scene_trigger:
    original_action_or_emotion:
    original_risk:
    recommended_level:
    recommended_effect_combo:
    emotional_function:
    safety_note:
```

要求：识别哪些 Story Beat 值得转译，不要每个 beat 都加特效。

### 12.3 `scene-performance-director`

```yaml
physical_comedy_performance:
  - beat_id:
    character_id:
    trigger:
    anticipation:
    deformation:
    facial_take:
    hold_timing:
    recovery:
    continuity_note:
```

要求：必须写清楚变形后如何恢复，避免角色状态断裂。

### 12.4 `scene-storyboard-director`

```yaml
stylized_action_shots:
  - shot_id:
    beat_id:
    scene_trigger:
    shot_role: setup | impact | hold | recovery | bridge
    animation_principles:
    vfx_elements:
    environment_reaction:
    camera_behavior:
    safety_boundary:
```

要求：强特效镜头要有 setup / impact / hold / recovery，不要只写一个结果镜头。

### 12.5 `scene-audio-director`

```yaml
stylized_action_audio:
  - shot_id:
    impact_sound:
    motion_sound:
    emotional_sound:
    silence_or_pause:
    recovery_sound:
    forbidden_realistic_sounds:
```

要求：声音也要避免真实伤害联想。

### 12.6 `scene-video-prompt-builder`

```yaml
stylized_action_prompt:
  segment_id:
  scene_trigger:
  animation_physics:
  vfx_elements:
  environment_reaction:
  emotional_vfx:
  audio_hooks:
  negative_safety_prompt:
```

要求：最终视频提示词必须同时写正向效果和负向安全边界。

---

## 13. 可复制 Prompt 片段库

### 13.1 通用正向片段：中文

```text
本段采用动画电影级夸张物理表现。动作不是现实伤害复刻，而是通过压扁、拉伸、回弹、定格、尘雾和道具反应来表达冲击。特效只在动作爆点和情绪转折处出现，服务节奏和笑点。
```

### 13.2 通用负向片段：中文

```text
不要血液、伤口、骨折、真实痛苦、身体恐怖、真实攻击接触细节或事故后果。所有变形都保持橡皮感、纸片感、玩具感或动画喜剧感，角色在动作结束后恢复完整状态。
```

### 13.3 通用正向片段：英文

```text
Use animated feature-film physical comedy. Do not replicate realistic injury. Express impact through squash and stretch, elastic rebound, brief holds, soft dust puffs, stylized impact rings, prop bounce, and playful environment reactions. VFX should appear only on action beats or emotional turns.
```

### 13.4 通用负向片段：英文

```text
No blood, no wounds, no broken bones, no body horror, no realistic pain focus, no explicit weapon contact, and no realistic accident aftermath. All deformations should feel rubbery, paper-like, toy-like, or comedic, and the character should recover to an intact readable form after the gag.
```

### 13.5 贴墙纸片化片段

```text
角色被非写实冲击横向带飞，身体像柔软橡皮一样拉成长弧线，撞到墙面时变成扁平剪影。墙面出现卡通轮廓印、柔和冲击环和圆润尘雾。画面停顿半秒后，角色像海报一样慢慢滑落，落地后弹回正常比例。
```

### 13.6 追逐打滑片段

```text
追逐段落使用夸张脚底打滑和速度拖影。角色冲出时身体拉长，刹停时鞋底发出轻微吱声，身后留下尘雾和动作弧线。背景群众像波浪一样让开，避免任何真实碰撞伤害。
```

### 13.7 尴尬冷场片段

```text
尴尬发生后画面突然静音，角色缩小一圈，肩膀收紧，头侧出现一滴汗。背景被抽成简洁空白，一个小道具慢半拍掉落，制造冷场笑点。
```

### 13.8 愤怒升压片段

```text
愤怒逐步升压，角色身体短暂膨胀，头顶冒出轻微蒸汽，背景向内压缩。桌面纸张和小道具被气流吹起，但不表现真实攻击或伤害。
```

### 13.9 厨房面粉云片段

```text
厨房事故以软性喜剧呈现，面粉爆成圆润白云，水果像弹力球一样跳起，盘子在半空旋转但不碎裂伤人。角色落进面粉云后只留下夸张眼睛和尴尬表情。
```

### 13.10 魔法失控片段

```text
魔法失控产生柔和能量波，角色被无形吸力拉成长条，在半空中停顿一拍后像弹簧一样弹回。周围小道具漂浮旋转，使用闪光粒子和动作弧线，不出现恐怖变形。
```

---

## 14. 推荐默认值

如果用户没有特别指定，建议默认使用：

```yaml
animation_stylization:
  level: expressive
  preset: animated_feature_expressive
  effect_density: medium
  density_rule: hero_moment_and_high_risk_translation_only
  allow_symbolic_vfx: selective
  allow_wall_splat: selective
  allow_paper_flatten: selective
  allow_cartoon_stars: selective
  allow_wild_cartoon_physics: false
  safety_boundary:
    avoid_blood: true
    avoid_visible_injury: true
    avoid_body_horror: true
    avoid_realistic_pain_focus: true
    avoid_weapon_contact_detail: true
    keep_comedic_tone: true
    restore_character_integrity_after_gag: true
```

推荐解释：

- `expressive` 足够体现动画电影感，但不会默认失控。
- 强喜剧效果只在 Hero Moment、高风险动作转译、短视频爆点中选择性使用。
- 默认不启用 `wild_cartoon`，除非用户明确要鬼畜、荒诞、强卡通。

---

## 15. 结论

本附录应作为 v4 Animation Stylization System 的效果库和场景库补充。

后续正式落地时，不建议让 Skill 直接读取本文档，而应把稳定部分拆成：

1. `board-protocol.md`：新增字段、档位、默认值、安全边界。
2. 各 Skill 的 `SKILL.md`：说明本阶段如何使用动画风格化规则。
3. 各 Skill 的 `output-contract.md`：加入结构化输出字段。
4. `PROJECT_BOARD.md` 初始化模板：保存项目级 `animation_stylization` 记忆。

这样 SceneForge v4 才能把“动画化转译”从一次性的提示词灵感，变成跨阶段继承的稳定生产能力。
