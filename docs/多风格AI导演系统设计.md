# 多风格 AI 导演系统设计

## 文档定位

本文档用于记录 SceneForge 后续升级为“多风格 AI 导演系统平台”的设计方向。

当前阶段的重点仍然是先跑通并完善第一套 `pixar_like` 动画电影化导演链路，包括：

- Story Beat
- Performance Director
- Storyboard Director
- Audio Director
- Video Prompt Builder

多风格体系不建议立即全面落地。

正确路线是：

```text
先把 pixar_like 跑通
↓
沉淀通用导演协议
↓
抽象 Style Profile
↓
扩展多风格可选体系
```

因此，本文档属于后续演进设计，不直接替代现有协议。

---

# 一、核心判断

当前 SceneForge 的目录结构和 Skill 链路适合升级为多风格 AI 导演系统。

但当前协议层仍然偏单一风格链路，尤其是 `performance_style` 字段还不足以表达完整导演风格。

当前结构适合扩展的原因：

```text
.agents/skills/   -> 可复用导演能力
assets/           -> 长期资产库
projects/         -> 单项目状态和产物
outputs/          -> 最终输出物
docs/             -> 协议和规范
.handoff/         -> 阶段交接
```

这些目录已经具备平台化基础。

真正需要补的是：

```text
Style Profile 抽象层
Style Selector 风格选择器
Director Style Contract 导演风格协议
多风格 Schema
```

---

# 二、基本原则

## 1. Pixar-like 是第一套验证风格，不是系统边界

当前重点可以继续围绕 Pixar-like 动画电影风格打磨。

但系统设计上不要把 Pixar-like 写死在核心 Skill 中。

正确理解：

```text
Pixar-like = 第一个风格包
SceneForge = 多风格 AI 导演系统底座
```

## 2. Skill 是能力，Style Profile 是风格

不要为每种风格复制一套 Skill。

错误做法：

```text
scene-pixar-storyboard-director
scene-anime-storyboard-director
scene-noir-storyboard-director
scene-dreamworks-storyboard-director
```

正确做法：

```text
scene-storyboard-director
+
style_profiles/pixar_like
```

或者：

```text
scene-storyboard-director
+
style_profiles/anime_cinematic
```

即：

```text
Skill 负责“做什么”
Style Profile 负责“用什么导演语言做”
Project Board 负责“当前项目处于什么状态”
Assets 负责“可复用素材是什么”
Outputs 负责“最终产物在哪里”
```

## 3. 多风格扩展不能破坏现有主链路

主链路应该保持稳定：

```text
选题
参考裁定
资产检查
设定
剧本
表演导演
分镜导演
声音导演
视频提示词
发布复盘
```

风格应该作为参数和配置注入，而不是改写主流程。

---

# 三、推荐三层架构

## 第一层：Production Pipeline

所有风格共享的生产流程。

```text
scene-topic-gate
-> scene-style-selector
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

其中 `scene-style-selector` 是未来新增 Skill，不建议当前阶段立即强制接入。

## 第二层：Director Style Profile

风格配置层。

例如：

```yaml
director_style_id: pixar_like
style_family: 3d_animation
style_version: v1
```

或者：

```yaml
director_style_id: anime_cinematic
style_family: 2d_animation
style_version: v1
```

## 第三层：Skill Runtime

每个 Skill 读取当前项目的 `director_style_id`，再读取对应 Style Profile，按当前风格完成任务。

示例：

```text
scene-storyboard-director + pixar_like.camera_language
= Pixar-like 动画电影化分镜
```

```text
scene-storyboard-director + anime_cinematic.camera_language
= 日式动画电影感分镜
```

```text
scene-storyboard-director + noir_detective.camera_language
= 黑色侦探电影分镜
```

---

# 四、建议新增目录

建议未来新增一级目录：

```text
style_profiles/
```

不建议放在 `assets/` 下。

原因：

- `assets/` 更像角色、场景、道具资产库。
- `style_profiles/` 是导演风格协议和执行参数。
- 风格包不是普通素材，而是生产系统配置。

推荐结构：

```text
style_profiles/
  pixar_like/
    profile.md
    visual_language.md
    character_language.md
    performance_language.md
    camera_language.md
    rhythm_language.md
    sound_language.md
    music_language.md
    humor_language.md
    lighting_language.md
    negative_constraints.md

  dreamworks_like/
    profile.md
    visual_language.md
    character_language.md
    performance_language.md
    camera_language.md
    rhythm_language.md
    sound_language.md
    music_language.md
    humor_language.md
    negative_constraints.md

  anime_cinematic/
    profile.md
    visual_language.md
    character_language.md
    performance_language.md
    camera_language.md
    rhythm_language.md
    sound_language.md
    music_language.md
    negative_constraints.md

  noir_detective/
    profile.md
    camera_language.md
    lighting_language.md
    performance_language.md
    sound_language.md
    music_language.md
    negative_constraints.md
```

---

# 五、Director Style Profile 协议

建议每个风格包都包含一个 `profile.md`。

基础结构：

```yaml
style_id:
style_name:
style_family:
version:
summary:
recommended_use_cases:
not_recommended_use_cases:
core_principles:
required_language_modules:
negative_constraints:
```

示例：

```yaml
style_id: pixar_like
style_name: Pixar-like animation cinema
style_family: 3d_animation
version: v1
summary: 以角色魅力、情绪曲线、家庭电影感、温暖灯光、表演驱动幽默和主题音乐为核心的 3D 动画电影化风格。
recommended_use_cases:
  - 情绪喜剧
  - 家庭向桥段
  - 角色成长故事
  - 经典名场面温暖改编
not_recommended_use_cases:
  - 极端黑暗惊悚
  - 写实暴力动作
  - 纯鬼畜无情绪核心片段
core_principles:
  - 角色先于世界观
  - 情绪先于动作
  - 表演先于台词
  - 声音服务情绪
negative_constraints:
  - 不复刻任何具体电影角色
  - 不引用受版权保护的既有主题旋律
  - 不使用具体公司或作品名作为最终生成提示词的直接风格指令
```

---

# 六、风格语言模块

每个风格包至少应覆盖以下模块。

## 1. Visual Language

负责画面、美术、材质、色彩、光影基调。

```yaml
visual_language:
  color_palette:
  material_preference:
  lighting_emotion:
  environment_detail_density:
  shape_language:
```

## 2. Character Language

负责角色造型和角色吸引力。

```yaml
character_language:
  silhouette_strength:
  shape_language:
  facial_exaggeration:
  body_proportion:
  costume_readability:
```

## 3. Performance Language

负责表演方式。

```yaml
performance_language:
  acting_energy:
  micro_expression_density:
  eye_focus_pattern:
  body_language_exaggeration:
  pause_usage:
  signature_gesture_rule:
```

## 4. Camera Language

负责镜头语言。

```yaml
camera_language:
  shot_preference:
  movement_preference:
  emotional_push_in:
  environmental_storytelling:
  comedy_wide_shot:
  closeup_usage:
```

## 5. Rhythm Language

负责节奏。

```yaml
rhythm_language:
  setup_pause_payoff:
  emotional_breathing_room:
  gag_timing:
  action_density:
  silence_before_payoff:
```

## 6. Sound Language

负责拟音、环境声、静默。

```yaml
sound_language:
  foley_density:
  ambience_density:
  silence_usage:
  exaggerated_sound_usage:
  sound_motif:
```

## 7. Music Language

负责配乐。

```yaml
music_language:
  leitmotif_usage:
  instrumentation:
  theme_repetition:
  emotional_curve:
  music_density:
```

## 8. Humor Language

负责喜剧类型。

```yaml
humor_language:
  character_comedy:
  reaction_comedy:
  visual_comedy:
  contrast_comedy:
  dialogue_comedy:
```

## 9. Lighting Language

负责灯光叙事。

```yaml
lighting_language:
  warmth:
  contrast:
  rim_light:
  shadow_depth:
  emotional_color_shift:
```

---

# 七、PROJECT_BOARD 多风格字段

未来建议在顶层 YAML 中增加：

```yaml
director_style_id:
director_style_version:
style_family:
style_profile_path:
performance_style:
```

说明：

## `director_style_id`

当前项目选择的导演风格包。

例如：

```yaml
director_style_id: pixar_like
```

## `director_style_version`

风格包版本。

例如：

```yaml
director_style_version: v1
```

## `style_family`

风格大类。

例如：

```yaml
style_family: 3d_animation
```

可选：

- `3d_animation`
- `2d_animation`
- `live_action_cinematic`
- `stop_motion`
- `motion_comic`
- `hybrid`

## `style_profile_path`

风格包路径。

例如：

```yaml
style_profile_path: style_profiles/pixar_like/profile.md
```

## `performance_style`

继续保留。

注意：`performance_style` 不等于 `director_style_id`。

示例：

```yaml
director_style_id: pixar_like
performance_style: cinematic_comedy
```

表示：

```text
用 Pixar-like 动画电影导演语言，做喜剧电影化演绎。
```

另一个示例：

```yaml
director_style_id: noir_detective
performance_style: cinematic_serious
```

表示：

```text
用黑色侦探电影导演语言，做严肃电影化演绎。
```

---

# 八、scene-style-selector 设计

## 定位

`scene-style-selector` 是未来新增 Skill。

它负责根据选题、平台、目标受众、制作成本和风险边界，推荐或确认导演风格。

## 插入位置

建议插入在：

```text
scene-topic-gate
-> scene-style-selector
-> scene-reference-decider
```

## 输入

- 选题信息
- 目标平台
- 受众定位
- 制作档位
- 风险提示
- 用户偏好

## 输出

```yaml
patch_type: scene-style-selector
version: 1
status: completed
updated_at:
summary:
data:
  selected_style:
    director_style_id:
    director_style_version:
    style_family:
    style_profile_path:
  recommended_styles:
    - director_style_id:
      fit_score:
      reason:
      risk_note:
  rejected_styles:
    - director_style_id:
      reason:
  next_action:
```

## 推荐规则

风格选择不应该只看“好不好看”，还要看：

- 是否适合该片段的情绪核
- 是否适合平台传播
- 是否适合当前制作成本
- 是否容易形成系列化
- 是否存在版权或风格复刻风险
- 是否适合现有资产库复用

---

# 九、各 Skill 如何读取风格包

## scene-design-builder

读取：

```text
visual_language
character_language
lighting_language
```

输出：

- 角色设定
- 场景设定
- 美术方向
- 视觉一致性约束

## scene-script-adapter

读取：

```text
rhythm_language
humor_language
performance_language
```

输出：

- 剧情改编档位
- Story Beat 初稿
- 情绪曲线
- 喜剧或正剧表达策略

## scene-performance-director

读取：

```text
performance_language
character_language
rhythm_language
```

输出：

- 表演表
- 角色微表情
- 肢体动作
- 停顿与反应设计

## scene-storyboard-director

读取：

```text
camera_language
lighting_language
rhythm_language
performance_language
```

输出：

- 分镜
- 镜头意图
- 表演意图
- 节奏切分
- Segment Plan

## scene-audio-director

读取：

```text
sound_language
music_language
rhythm_language
```

输出：

- 配音方向
- 拟音设计
- 环境音设计
- 配乐 Prompt
- 静默点设计

## scene-video-prompt-builder

读取所有已生成结果：

- style profile
- design summary
- performance sheet
- shotlist
- audio plan

输出最终视频生成提示词。

---

# 十、首批建议支持的风格包

不建议一开始支持太多。

建议顺序：

## P0：pixar_like

当前第一验证风格。

重点验证：

- 角色魅力
- 情绪曲线
- 表演导演
- 音乐主题
- 拟音和静默
- 10s/15s Segment 拼接

## P1：dreamworks_like

适合更强冲突、更强角色态度、更强喜剧张力。

重点验证：

- 反应喜剧
- 角色嘴炮
- 更外放的表演
- 快节奏动作喜剧

## P1：anime_cinematic

适合热血、反转、情绪爆发和高传播短视频。

重点验证：

- 静帧爆发
- 极端特写
- 速度感
- 内心独白
- 音乐推进

## P2：chinese_mythic_fantasy

适合神话、古装、东方奇幻和经典 IP 二创。

重点验证：

- 东方色彩
- 神话意象
- 法术视觉
- 古典音乐和打击乐

## P2：noir_detective

适合悬疑、反转、黑色幽默。

重点验证：

- 低调光
- 强阴影
- 旁白
- 爵士/低频配乐
- 慢节奏压迫感

---

# 十一、风格包安全与版权边界

多风格系统必须避免“复刻具体作品”。

推荐写法：

```text
pixar_like animation cinema
```

不推荐：

```text
in the style of Toy Story
```

推荐写法：

```text
warm 3D animated family film look, expressive character acting, emotional lighting
```

不推荐：

```text
make it look exactly like Pixar's Up
```

风格包中的 `negative_constraints.md` 必须明确：

- 不复刻具体角色
- 不复刻具体镜头
- 不复刻具体主题旋律
- 不直接使用受保护作品名作为生成指令
- 保留风格抽象，不复制可识别表达

---

# 十二、当前阶段不立即落地的原因

多风格系统非常有价值，但当前不建议立即全面开发。

原因：

1. Pixar-like 第一套链路尚未完全跑通。
2. Performance Director 和 Audio Director 还需要先验证。
3. Story Beat、Shot、Segment 三层时间模型还需要样例项目验证。
4. 如果过早扩展多风格，会导致协议复杂度上升。
5. 当前最重要的是先证明一套风格可以稳定产出高质量结果。

因此当前建议：

```text
先把 pixar_like 当作第一个完整参考实现
不要把多风格作为当前开发阻塞项
但所有新增协议都要避免写死 pixar_like
```

---

# 十三、后续迁移路线

## 阶段 1：Pixar-like 跑通

目标：

- 完成 `scene-performance-director`
- 完成 `scene-audio-director`
- 完成 Story Beat Schema
- 完成 Segment Plan v2
- 跑通一个完整样例项目

## 阶段 2：抽象 Style Profile

目标：

- 新增 `style_profiles/`
- 把 pixar_like 拆成风格包
- 修改 Skill，使其读取风格包，而不是内置风格描述

## 阶段 3：新增 scene-style-selector

目标：

- 根据选题推荐风格
- 支持用户指定风格
- 支持多候选风格评分

## 阶段 4：扩展第二个风格包

建议优先：

```text
dreamworks_like
```

原因：

- 与 pixar_like 同属 3D 动画大类
- 资产体系可复用
- 差异主要体现在表演、幽默、节奏和角色态度
- 迁移成本低于 anime_cinematic 或 noir_detective

## 阶段 5：扩展跨大类风格

再考虑：

- anime_cinematic
- chinese_mythic_fantasy
- noir_detective
- stop_motion

---

# 十四、最终平台形态

未来 SceneForge 可以升级为：

```text
多风格 AI 导演系统平台
```

用户输入：

```text
我要把这个名场面做成动画电影化短片
```

系统输出：

```yaml
recommended_styles:
  - pixar_like
  - dreamworks_like
  - anime_cinematic
```

用户选择：

```yaml
director_style_id: pixar_like
```

系统执行：

```text
选题
风格选择
参考裁定
资产检查
设定
剧本
表演
分镜
声音
视频提示词
发布
```

最终结果：

同一个桥段可以用不同导演风格生成多套版本。

---

# 十五、结论

SceneForge 当前结构具备升级为多风格 AI 导演系统的基础。

但当前开发重点不应该立刻转向多风格，而应该先完成第一套 `pixar_like` 参考实现。

多风格系统的正确设计原则是：

```text
主链路稳定
Skill 通用
Style Profile 可插拔
Project Board 记录风格选择
每个风格包独立维护
```

最终目标：

```text
SceneForge 不只是 Pixar-like 视频系统，
而是一个可插拔、多风格、可长期扩展的 AI 导演平台。
```
