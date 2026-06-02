# scene-video-prompt-builder 输出协议

本文件定义 `scene-video-prompt-builder` 的输出分类、分段视频提示词结构、表演/声音整合规则、参考图使用、Blocking/Faction 连续性、道具状态连续性和目录落点。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

## 阶段定位

`scene-video-prompt-builder` 位于：

```text
scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

本阶段负责把设计、剧本、表演、分镜和声音方案整合成最终可用于视频生成平台的 Segment Prompt。

本阶段只输出提示词和制作说明，不生成视频。

---

# 一、确认闸门

本阶段默认不能直接落盘正式视频提示词。必须先输出视频提示词方案预览，并等待用户确认。

视频提示词方案预览至少包含：

- 分段提示词结构
- 每段覆盖的 Beat / Shot / Segment
- 每段参考图使用计划
- `continuity_in` / `continuity_out`
- `blocking_continuity`
- `prop_state_continuity`
- 表演连续性
- 声音连续性
- 全局负向约束
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

---

# 二、阶段补丁壳

```yaml
patch_type: scene-video-prompt-builder
version: 3
status:
updated_at:
summary:
data:
```

---

# 三、上游输入

本阶段默认消费以下结果：

- `scene-storyboard-director`：`storyboard_version`、`storyboard_summary`、`segments`、`shot_highlights`、`hero_moments`、`bridge_shots`、`continuity_rules`、`storyboard_prompt_files`、`prompt_hints`、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-performance-director`：`performance_sheet_path`、角色表演档案、Beat 表演重点、表演连续性规则
- `scene-audio-director`：`audio_plan_path`、`music_prompt_path`、`foley_prompt_path`、`audio_mix_plan_path`、`segment_audio_plan`、`video_prompt_handoff`
- `scene-design-builder`：角色与场景设定摘要、全场景资产总参考图 prompt、视觉语言和一致性锚点
- 顶层索引：`performance_style`、`segment_duration_seconds`、`target_total_duration_seconds`、`segment_strategy`

---

# 四、风格执行要求

提示词必须继承顶层 `performance_style`，并转换为通用动画电影化描述，不直接绑定具体品牌名称。

建议理解：

- `cinematic_serious`：强调电影感、叙事张力、真实光影
- `cinematic_comedy`：强调轻喜剧反应、节奏弹性、表情层次
- `exaggerated_comedy`：强调夸张反应、强节奏停顿、喜剧反差推进
- `absurd_chaotic`：强调鬼畜式升级、离谱反差、连续爆点推进

本阶段不再负责生成故事板 prompt；故事板 prompt 已在分镜阶段产出。

---

# 五、三层时间模型继承

本阶段必须继承上游确认的：

```yaml
segment_duration_seconds:
target_total_duration_seconds:
segment_strategy:
segments:
hero_moments:
bridge_shots:
blocking_map:
faction_layout:
prop_state_machines:
```

注意：

```text
segment_duration_seconds 表示单个视频生成片段时长，不是整条视频总时长。
```

每个 Segment Prompt 必须明确：

- covered_beats
- covered_shots
- segment_start
- segment_end
- continuity_in
- continuity_out
- blocking_continuity
- prop_state_continuity

---

# 六、输出内容

至少包括：

- 视频分段提示词
- 角色一致性约束
- 场景一致性约束
- 表演连续性约束
- 声音连续性说明
- 镜头连续性说明
- 参考图使用说明
- Blocking / Faction 连续性说明
- 道具状态连续性说明
- 全局生成约束

---

# 七、`data` 结构

```yaml
data:
  video_prompt_confirmation:
    confirmed_by_user: false
    confirmation_note:
  prompt_pack_version:
  segment_duration_seconds:
  target_total_duration_seconds:
  total_segments:
  video_prompt_files:
    - file:
      segment_scope:
      covered_beats:
      covered_shots:
      related_hero_moments:
      related_bridge_shots:
      purpose:
  reference_assets:
    character_design_refs:
    scene_prop_master_ref:
    storyboard_refs:
    performance_refs:
    audio_refs:
    reference_image_plan:
      global_refs:
      per_segment_refs:
        - segment_id:
          required_refs:
          optional_refs:
          usage_order:
  consistency_rules:
    character_consistency:
    scene_consistency:
    performance_consistency:
    motion_continuity:
    audio_continuity:
    blocking_continuity:
    prop_state_continuity:
  segment_continuity:
    - segment_id:
      continuity_in:
      continuity_out:
      next_handoff:
      blocking_continuity:
      prop_state_continuity:
      audio_tail:
      visual_tail:
  global_render_rules:
    visual_style_note:
    performance_note:
    dialogue_audio_note:
    music_and_foley_note:
    reference_usage_note:
    segment_connection_note:
    blocking_note:
    prop_state_note:
    negative_constraints:
  readiness_notes:
  next_action:
```

---

# 八、字段说明

- `video_prompt_confirmation`：记录用户是否确认视频提示词方案。正式落盘时应为 `confirmed_by_user: true`。
- `prompt_pack_version`：本次提示词包版本号。
- `segment_duration_seconds`：本次视频分段时长，应继承分镜阶段确认结果。
- `target_total_duration_seconds`：整片目标总时长。
- `total_segments`：本次视频分段总数。
- `video_prompt_files`：视频分段提示词文件列表。
- `related_hero_moments`：该视频提示词覆盖的看点镜头。
- `related_bridge_shots`：该视频提示词覆盖或承接的桥接分镜。
- `reference_assets`：生成视频时需要一并喂给模型的角色设定图、全场景资产总参考图、故事板图、表演表和声音方案来源。
- `reference_image_plan`：多图参考使用顺序和每段所需参考图。
- `consistency_rules`：角色、场景、表演、运动、声音、站位和道具状态连续性约束摘要。
- `segment_continuity`：每段开头如何承接上一段、结尾如何交给下一段。
- `global_render_rules`：适用于全部视频分段的统一约束。
- `readiness_notes`：进入发布阶段前仍需准备的事项。
- `next_action`：下一阶段执行提示。

---

# 九、Segment Prompt 必须包含的内容

每个 Segment Prompt 至少包含：

```yaml
segment_prompt:
  segment_id:
  duration_seconds:
  segment_start:
  segment_end:
  covered_beats:
  covered_shots:
  related_hero_moments:
  continuity_in:
  visual_goal:
  camera_direction:
  character_action:
  performance_direction:
  dialogue_direction:
  foley_direction:
  music_direction:
  ambience_direction:
  silence_or_pause:
  blocking_continuity:
  prop_state_continuity:
  continuity_out:
  next_handoff:
  reference_images:
  negative_constraints:
```

说明：

- `performance_direction` 必须继承 performance sheet。
- `foley_direction`、`music_direction`、`ambience_direction`、`silence_or_pause` 必须继承 audio plan。
- `continuity_in` 和 `continuity_out` 必须确保多个 10 秒/15 秒 Segment 可以拼接成完整视频。
- `blocking_continuity` 必须说明主要角色在本段的默认站位、允许移动区域和禁止区域。
- `prop_state_continuity` 必须说明核心道具在本段开头、过程中和结尾的状态。
- `next_handoff` 必须说明给下一段留下的动作、视线、声音或道具状态钩子。

---

# 十、参考图使用规则

虽然 SceneForge 不生成图片和视频，但视频提示词可以明确写“参考角色设定图、场景道具总参考图、故事板图”。这些参考图由用户基于前置提示词在外部平台手动生成。

推荐顺序：

1. 全局角色设定图：保证角色外观、服装、比例和表情系统。
2. 全场景资产总参考图：保证场景、角色站位、道具位置和空间关系。
3. 当前 Segment 对应的故事板图：保证构图、镜头调度和动作节奏。
4. 当前 Segment Prompt：生成具体视频片段。

如果平台参考图数量有限，应优先保留角色设定图、全场景资产总参考图和当前 Segment 故事板图。

---

# 十一、Blocking / Faction 连续性规则

每段视频提示词必须继承 `blocking_map` 和 `faction_layout`。

需要写清：

- 本段开头各主要角色位于哪个区域
- 本段允许移动到哪些区域
- 本段禁止进入哪些区域
- 角色是否保持自己的阵营侧或关系组
- 是否跨越主冲突线
- 如果需要跨越，必须有明确动作原因和桥接镜头

该规则只能降低视频生成抽卡成本，不能保证模型一次生成完全稳定。

---

# 十二、道具状态连续性规则

每段视频提示词必须继承 `prop_state_machines`。

需要写清：

- 本段开始时道具处于哪个状态
- 本段中道具如何变化
- 本段结尾道具交给下一段时处于哪个状态
- 哪些可见证据证明状态变化
- 哪些交互是允许的
- 哪些交互因安全或叙事边界禁止

---

# 十三、文件列表结构

```yaml
video_prompt_files:
  - file:
    segment_scope:
    covered_beats:
    covered_shots:
    related_hero_moments:
    related_bridge_shots:
    purpose:
```

`segment_scope` 用于标记覆盖范围，例如：

- `segment_01`
- `segment_02`
- `segment_03`

---

# 十四、目录规则

视频提示词统一写入：

```text
outputs/video_prompts/
```

建议的附属文件目录：

```text
outputs/consistency_rules/
outputs/audio_notes/
```

说明：

- `outputs/audio_notes/` 仅用于附加给人工配音或后期的提炼版清单。
- 最终视频生成所需的台词、音效、节奏要求，必须已经整合进每段视频 prompt 正文。
- 如果 `scene-audio-director` 已产出 `outputs/audio/`，本阶段应引用它，而不是重复生成独立音频方案。

---

# 十五、prompt 文档语言规范

- 分段视频 prompt 文档默认以中文为主。
- 分段说明、动作设计、运镜、表演、台词、拟音、音乐、音效、节奏要求优先使用中文。
- 只有平台明确更偏好英文输入时，才在中文主文档之外补一份英文适配版。

---

# 十六、黑板摘要建议

黑板补丁至少应说明：

- 用户是否确认视频提示词方案
- 产出了哪些视频提示词版本
- 当前分段时长、整片目标时长和总段数
- 各提示词文件路径
- 参考图使用条件是否明确
- Hero Shot 是否被重点覆盖
- Bridge Shot 是否被用于段落衔接
- 表演连续性是否已覆盖
- 声音连续性是否已覆盖
- Blocking / Faction 连续性是否已覆盖
- 道具状态连续性是否已覆盖
- 是否已经具备进入发布包装阶段的素材条件

`summary` 使用中文；风格名建议写成“鬼畜离谱化（`absurd_chaotic`）提示词已生成”。

---

# 十七、阻塞规则

只要用户已确认视频提示词方案，并且能产出一版完整可用的分段视频提示词和一致性约束，就不应阻塞。

即使提示词还可继续细修，也可以先完成本阶段。

只有在以下情况下才使用 `status: blocked`：

- 用户尚未确认视频提示词方案，且当前阶段必须等待确认
- 分镜输入缺失
- 分段方案缺失
- performance sheet 缺失且无法推断表演约束
- audio plan 缺失且无法推断声音约束
- 镜头连续性规则无法提炼
- Blocking / Faction 连续性完全无法判断
- 道具状态连续性完全无法判断
- 输出目录与内容边界无法判定

---

# 十八、示例

```yaml
patch_type: scene-video-prompt-builder
version: 3
status: completed
updated_at: 2026-06-02
summary: 夸张搞笑化（`exaggerated_comedy`）视频提示词已生成，目标 30 秒，按 10 秒分为 3 段，已整合表演表、声音方案、参考图计划和连续性约束。
data:
  video_prompt_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户确认分段提示词结构、参考图使用顺序和连续性策略。
  prompt_pack_version: v1
  segment_duration_seconds: 10
  target_total_duration_seconds: 30
  total_segments: 3
  video_prompt_files:
    - file: outputs/video_prompts/video_prompt_segments_v1.md
      segment_scope: segment_01
      covered_beats:
        - B01
      covered_shots:
        - SH001
        - SH002
        - SH003
      related_hero_moments: []
      related_bridge_shots:
        - BR01
      purpose: 第 1 段视频生成提示词
  reference_assets:
    character_design_refs: 使用 design-builder 产出的角色设定图作为角色一致性参考。
    scene_prop_master_ref: 使用全场景资产总参考图作为空间、道具和站位参考。
    storyboard_refs: 每段使用对应故事板图作为镜头构图参考输入。
    performance_refs: 继承 details/performance_sheet_v1.md 中的眼神、停顿和标志性动作。
    audio_refs: 继承 details/audio_plan_v1.md、outputs/audio/music_prompt_v1.md 和 outputs/audio/foley_prompt_v1.md。
    reference_image_plan:
      global_refs:
        - 角色设定图
        - 全场景资产总参考图
      per_segment_refs:
        - segment_id: SEG01
          required_refs:
            - SEG01 故事板图
          optional_refs: []
          usage_order: 先角色，再场景道具总参考，最后当前段故事板。
  consistency_rules:
    character_consistency: 角色在各镜头中保持统一比例、服装逻辑和表情层级。
    scene_consistency: 场景光影和色彩氛围不跨段跳变。
    performance_consistency: 主角始终先用眼神反应，再用身体动作跟进；关键停顿不能被剪掉。
    motion_continuity: 所有快切和停顿节奏应与分镜中的升级断点一致。
    audio_continuity: 每段结尾保留环境底噪或动作余音，帮助 Segment 拼接连续。
    blocking_continuity: 角色保持分镜阶段确认的区域关系，禁止无动机跨区漂移。
    prop_state_continuity: 核心道具状态必须从上一段结尾自然延续到下一段开头。
  segment_continuity:
    - segment_id: SEG01
      continuity_in: 从环境建立镜头进入。
      continuity_out: 以角色视线和环境声音钩子交给下一段。
      next_handoff: 下一段应承接该视线方向和动作余势。
      blocking_continuity: 主要角色保持各自默认区域。
      prop_state_continuity: 核心道具保持初始状态，尚未发生反转。
      audio_tail: 保留环境底噪。
      visual_tail: 保留角色视线方向。
  global_render_rules:
    visual_style_note: 保持通用高品质 3D 动画电影质感，不直接绑定具体品牌名称。
    performance_note: 表演必须包含眼神、微表情、身体重心和反应停顿。
    dialogue_audio_note: 每段 prompt 内直接写明台词气口、拟音和节奏停顿。
    music_and_foley_note: 音乐使用原创主题动机，不复刻具体电影旋律；拟音服务动作和喜剧点。
    reference_usage_note: 先喂角色设定图，再喂全场景资产总参考图，再喂当前段故事板图，最后输入该段视频 prompt。
    segment_connection_note: 每段结尾保留动作、视线或声音钩子，方便拼接。
    blocking_note: 站位连续性只能降低抽卡成本，不能保证一次生成完全稳定。
    prop_state_note: 道具状态必须按状态机递进，不能无因跳变。
    negative_constraints:
      - 不生成真实人物伤害画面。
      - 不让角色无动机切换阵营或空间区域。
  readiness_notes:
    - 发布前仍需补封面文案与平台标题版本。
  next_action: 进入 scene-publish-review，整理标题、封面文案和平台发布文案。
```

---

# 十九、阶段推进建议

完成后建议推进：

```yaml
project_status: video_prompts_ready
next_stage: scene-publish-review
```

顶层建议写入或更新：

```yaml
user_confirmations:
  video_prompt_plan_confirmed: true
```
