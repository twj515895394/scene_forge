# SceneForge v5：分镜导演能力研究框架

> 本文档是 v5 研究框架，不是实施计划。
>
> 目标：先把 `scene-storyboard-director` 应该增强什么能力梳理清楚，再进入 v5 实施计划与协议改造。
>
> 核心判断：v4 解决“动画表现力”，v5 应重点解决“专业分镜导演能力”。

---

## 1. 背景

SceneForge v4 已完成 `expressive_animation` 协议落地，覆盖：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

v4 让系统能在设计、剧本、表演、分镜、声音、视频提示词阶段继承：

- 动画电影级夸张物理；
- 轻中度卡通伤害尺度；
- 反差喜剧设计；
- VFX、拟音、负向边界和连续性规则。

但目前 `scene-storyboard-director` 仍然更接近：

```text
根据 Story Beat + 表演表生成 shot list。
```

v5 要把它升级为真正的“专业分镜导演”：

```text
先理解剧本内容，再拆分成可拍内容单元，
再用影视级镜头语言把内容单元转换成镜头，
最后把镜头策略交给故事板图 prompt、声音导演和视频 prompt。
```

---

## 2. v5 核心目标

v5 的目标不是生成更长的分镜表，而是让分镜导演具备三层能力：

```text
script_to_storyboard_content
-> storyboard_content_to_cinematic_language
-> cinematic_language_asset_selection
```

换句话说：

```text
剧本内容拆分能力
+ 影视镜头语言转换能力
+ 动画电影镜头资产选择能力
```

这三层能力应共同服务：

- 叙事清晰；
- 动作可读；
- 情绪可见；
- 喜剧节奏成立；
- 角色关系明确；
- 世界观空间稳定；
- v4 表现力不过度堆叠；
- 最终 Segment Prompt 更像专业分镜推导出的镜头，而不是普通描述句。

---

## 3. 为什么不能从剧本直接生成 shot list

当前常见问题：

```text
Story Beat 太大，直接变镜头会丢信息。
```

一个 Story Beat 里可能同时包含：

- 角色进入；
- 发现异常；
- 表情变化；
- 道具触发；
- 动作冲突；
- 反应停顿；
- 环境变化；
- 反差揭示；
- 情绪转折；
- 进入下一段的视觉或声音钩子。

如果直接把这个 Beat 变成一个或两个镜头，容易出现：

1. 动作不清楚；
2. 情绪跳变；
3. 反差笑点没有 setup / reveal / hold；
4. 道具状态断裂；
5. 镜头语言没有动机；
6. Segment Prompt 缺少连续性。

因此 v5 需要一个中间层：

```text
storyboard_content_breakdown
```

它先回答：

```text
这个 Beat 里面有哪些可拍内容？
哪些内容必须被观众看见？
哪些内容可以省略？
哪些内容必须用镜头强调？
```

---

## 4. 第一层能力：剧本内容拆分

### 4.1 定义

剧本内容拆分不是分镜语言，而是“可拍内容单元”的整理。

建议字段：

```yaml
storyboard_content_breakdown:
  - unit_id:
    source_beat_id:
    unit_type:
    story_content:
    character_focus:
    action_focus:
    emotional_function:
    comedic_function:
    required_visual_information:
    required_audio_information:
    required_continuity:
    suggested_duration_seconds:
    downstream_priority:
```

### 4.2 `unit_type` 枚举

```yaml
unit_type:
  action: 动作单元，例如冲刺、躲闪、摔倒、推门、转身
  reaction: 反应单元，例如惊讶、尴尬、慢半拍、群体反应
  emotion_shift: 情绪转折，例如从强硬变温柔、从自信变心虚
  reveal: 信息揭示，例如反差道具出现、真相暴露、环境打开
  transition: 转场单元，例如视线、动作余势、声音尾巴、空间移动
  insert: 插入镜头单元，例如道具特写、手部动作、线索、按钮
  environment_response: 环境反应，例如道具掉落、人群转头、地面回弹
  contrast_payoff: 反差喜剧 payoff，例如大块头骑小车、反派拿粉色饭盒
  stylized_impact: 动画物理冲击，例如贴墙、弹飞、压扁、回弹
  injury_result: 轻中度卡通伤害结果，例如头包、灰头土脸、喷鼻血笑点
```

### 4.3 拆分原则

```text
一个 Story Beat 可以拆成多个 storyboard_units。
一个 storyboard_unit 不一定等于一个镜头。
一个 storyboard_unit 可以被一个镜头覆盖，也可以拆成多个镜头。
```

拆分时优先保证：

1. 观众必须理解的剧情信息；
2. 角色情绪变化；
3. 动作因果关系；
4. 空间方向；
5. 道具状态变化；
6. 喜剧 setup / reveal / payoff；
7. Segment 之间的连续性。

### 4.4 示例：反差喜剧 Beat 拆分

原 Beat：

```text
超级奶爸准备出门接孩子，观众以为他会开很酷的车，结果他一本正经骑上一辆过小的小自行车。
```

拆分：

```yaml
storyboard_content_breakdown:
  - unit_id: U01
    source_beat_id: B02
    unit_type: reveal
    story_content: 先建立超级奶爸巨大身形和硬汉气场
    character_focus: super_dad
    emotional_function: 建立观众预期
    required_visual_information:
      - 巨大身体
      - 严肃表情
      - 英雄式出门姿态

  - unit_id: U02
    source_beat_id: B02
    unit_type: contrast_payoff
    story_content: 揭示他骑的是明显过小的小自行车
    comedic_function: 体型与道具比例反差
    required_visual_information:
      - 小自行车完整轮廓
      - 身体与车的比例差
      - 角色不自知的一本正经

  - unit_id: U03
    source_beat_id: B02
    unit_type: environment_response
    story_content: 小车被压得轻微下沉，铃铛轻响
    comedic_function: 反差辅助
    required_audio_information:
      - 小铃铛声
      - 轻微轮胎 squeak
```

---

## 5. 第二层能力：影视级镜头语言转换

### 5.1 定义

镜头语言转换负责把 `storyboard_units` 转成专业影视分镜。

建议字段：

```yaml
cinematic_language_plan:
  - unit_id:
    shot_id:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    staging_depth:
    blocking_intent:
    lighting_intent:
    color_intent:
    edit_rhythm:
    visual_motivation:
    selected_shot_pattern:
```

这一步要回答：

```text
为什么用这个镜头？
为什么这个景别、机位、构图和运动适合这个内容？
这个镜头服务剧情、情绪、动作、喜剧还是世界观？
```

### 5.2 关键镜头语言维度

```yaml
shot_scale:
  - extreme_wide
  - wide
  - full
  - medium
  - medium_close
  - close_up
  - extreme_close_up
  - insert

camera_angle:
  - eye_level
  - low_angle
  - high_angle
  - overhead
  - dutch
  - over_shoulder
  - pov

composition:
  - centered
  - rule_of_thirds
  - symmetrical
  - asymmetrical
  - negative_space
  - foreground_frame
  - silhouette
  - deep_staging
  - scale_contrast_depth

lens_feel:
  - wide_comic_space
  - normal_observational
  - telephoto_isolation
  - macro_miniature
  - imax_scale

camera_movement:
  - locked
  - pan
  - tilt
  - push_in
  - pull_out
  - tracking
  - orbit
  - crane
  - whip_pan

edit_rhythm:
  - slow_hold
  - reaction_pause
  - reveal_cut
  - action_continuity
  - quick_cut
  - match_cut
  - montage
```

### 5.3 镜头动机

每个关键镜头都应该有 `visual_motivation`。

不推荐：

```yaml
shot_scale: close_up
visual_motivation: 好看
```

推荐：

```yaml
shot_scale: close_up
visual_motivation: 观众需要看到角色从强硬到心虚的微表情变化，推动情绪反转。
```

或者：

```yaml
shot_scale: wide
visual_motivation: 观众需要同时看到大块头角色、小自行车和周围环境，体型与道具比例反差必须在同一画面内成立。
```

---

## 6. 第三层能力：镜头语言资产选择

v5 应新增执行期资产库，让分镜导演可按需读取。

建议新增：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

职责：

```yaml
shot-language-library.md:
  role: 通用镜头语言枚举与使用规则

animation-film-shot-patterns.md:
  role: 动画电影常见镜头模式，如情绪特写、环境揭示、道具插入、视觉叙事

animation-comedy-action-patterns.md:
  role: 动作喜剧、反差喜剧、轻伤卡通化、战斗/追逐可读性镜头模式
```

这些资产库应放在 `assets/`，后续允许 `scene-storyboard-director` 执行期按需读取。

`docs/` 只保留研究说明，不参与阶段运行时上下文。

---

## 7. 与 v4 的关系

v4 与 v5 的关系：

```text
v4：解决动画表现力。
v5：解决专业镜头语言。
```

具体来说：

```yaml
v4_expressive_animation:
  answers:
    - 动作能不能压扁拉伸？
    - 伤害尺度到哪里？
    - 能不能做反差喜剧？
    - VFX 和声音边界是什么？

v5_storyboard_director:
  answers:
    - 剧本里哪些内容必须被拍出来？
    - 这些内容分别需要什么镜头？
    - 镜头如何服务情绪、动作、喜剧、空间和世界观？
    - 动画电影常见镜头模式如何辅助选择？
```

v5 不是替代 v4，而是把 v4 的表达能力镜头化。

例如：

```text
v4 说：这里可以做体型与小自行车的反差喜剧。
v5 要说：先用低机位建立体型压迫，再用宽侧面 reveal 小自行车，停顿 0.5 秒，最后用小铃铛和轻微下沉辅助笑点。
```

---

## 8. 与现有 scene-storyboard-director 的差距

当前 `scene-storyboard-director` 已有：

- Segment Plan；
- Hero Shot；
- Bridge Shot；
- Blocking Map；
- v4 表现力镜头字段；
- `stylized_action_shots`；
- `contrast_storyboard`。

但仍需要增强：

```yaml
missing_or_weak:
  storyboard_content_breakdown: 剧本内容单元拆分还不够明确
  cinematic_language_plan: 镜头语言动机和选择过程还不够明确
  shot_pattern_selection: 缺少可读取的镜头模式资产库
  film_language_reasoning: 每个镜头为什么这样拍还不够强
  animation_film_reference_modes: 动画电影镜头模式尚未资产化
```

---

## 9. v5 对下游的影响

### 9.1 对 scene-audio-director

v5 分镜需要更明确地交接：

```yaml
audio_handoff:
  silence_points:
  reveal_sound_hook:
  action_rhythm_audio:
  emotional_hold_audio:
  scale_contrast_audio:
```

### 9.2 对 scene-video-prompt-builder

v5 分镜需要把镜头语言传下去：

```yaml
segment_prompt:
  camera_language:
    shot_scale:
    camera_angle:
    composition:
    lens_feel:
    camera_movement:
    edit_rhythm:
    visual_motivation:
```

这会让最终视频 prompt 不只是“角色做什么”，而是：

```text
如何拍、为什么这样拍、观众应该看哪里。
```

---

## 10. v5 研究问题清单

在写实施计划前，应先回答：

1. Story Beat 与 storyboard unit 的关系如何定义？
2. storyboard unit 与 shot 的关系是一对一、一对多还是多对一？
3. 哪些 unit 必须镜头化，哪些可以被合并？
4. 反差喜剧需要哪些镜头语言结构？
5. 动作喜剧需要哪些空间建立规则？
6. 情绪片段需要哪些停顿和近景规则？
7. 多尺度世界如何建立空间和比例？
8. 少对白视觉叙事如何转成镜头字段？
9. 哪些动画电影镜头模式适合进入资产库？
10. 分镜导演读取资产库时如何避免堆模板？

---

## 11. v5 暂定输出协议草案

后续可在 `scene-storyboard-director/references/output-contract.md` 中新增：

```yaml
data:
  storyboard_content_breakdown:
    - unit_id:
      source_beat_id:
      unit_type:
      story_content:
      character_focus:
      action_focus:
      emotional_function:
      comedic_function:
      required_visual_information:
      required_audio_information:
      required_continuity:
      suggested_duration_seconds:
      downstream_priority:

  cinematic_language_plan:
    - unit_id:
      shot_id:
      shot_scale:
      camera_angle:
      composition:
      lens_feel:
      camera_movement:
      staging_depth:
      blocking_intent:
      lighting_intent:
      color_intent:
      edit_rhythm:
      visual_motivation:
      selected_shot_pattern:
```

`shot_highlights` 可以继续保留，但应从 `cinematic_language_plan` 派生，而不是直接从 Story Beat 跳过去。

---

## 12. 下一步

本研究框架确认后，再进入：

```text
docs/SceneForge-v5-Storyboard-Director-Implementation-Plan.md
```

实施计划应包括：

1. 新增 `assets/cinematic-language/*`；
2. 修改 board protocol 和总控资产白名单；
3. 改造 `scene-storyboard-director`；
4. 改造 `scene-video-prompt-builder`；
5. 做 v5 protocol review；
6. 做最小项目测试。
