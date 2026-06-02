# SceneForge v6：Video Intake / Source Intake 前置解析系统设计

日期：2026-06-02

> 本文档是 v6 设计文档，不是实施计划。
>
> 目标：当用户提供视频片段、视频链接、视频文件或截图序列时，SceneForge 先进入视频源解析前置阶段，把源视频整理成结构化、导演级、可改编、可供后续创作阶段使用的内容资料，再交给 `scene-topic-gate` 做选题判断。
>
> v6 还需要解决两个长期问题：
>
> 1. 视频解析内容很长，如何保存和供后续阶段按需读取；
> 2. 一些经典源片段可能被反复改编，如何从项目输入资料提升为可复用资产。

---

## 1. 背景

当前 SceneForge 主流程是：

```text
scene-topic-gate
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

这条流程适合用户直接提供文字意图、桥段名、剧情梗概或改编方向。

但当用户提供的是一个视频片段时，系统首先需要弄清楚：

```text
视频里真实发生了什么？
哪些内容是核心？
哪些内容是亮点？
哪些内容只是辅助信息？
哪些可以在后续改编中删减或快速带过？
哪些镜头、动作、声音、情绪和节奏值得保留为创作参考？
这个片段是否有跨项目复用价值？
```

因此 v6 需要新增条件触发的前置阶段：

```text
scene-video-intake
```

---

## 2. v6 核心定位

v6 不是普通视频总结，而是一个服务 SceneForge 后续创作链路的源视频解析系统。

它要产出的不是简单摘要，而是：

```text
导演级、分镜级、可复现描述、可改编、可供 AI 视频生成链路参考的源视频解析资料。
```

核心链路：

```text
video_input
-> source_intake_analysis
-> topic_gate_handoff
-> scene-topic-gate
```

v6 解决的是：

```text
用户给的是视频素材时，先把视频转成结构化创作资料。
```

同时，v6 要区分两种结果身份：

```text
project input：服务当前项目的源视频解析资料
reusable source asset：可被多个项目复用的源片段资产
```

默认规则：

```text
第一次解析先作为 project input 保存。
只有经过显式确认和资产化整理后，才提升为 reusable source asset。
```

---

## 3. 阶段命名

推荐 Skill 名：

```text
scene-video-intake
```

推荐黑板字段：

```text
source_intake
```

原因：`source_intake` 未来可以扩展到图片、音频、文章、网页、新闻和剧本文档等源材料。

---

## 4. 新主流程

### 4.1 普通文字输入

仍然走：

```text
scene-topic-gate
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

### 4.2 视频源输入

当用户提供视频片段、视频链接、视频文件或截图序列，并表达要基于它分析、改编或制作项目时，走：

```text
scene-video-intake
-> scene-topic-gate
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

`scene-video-intake` 是条件触发的前置阶段，不是所有项目都必须执行。

---

## 5. 中控触发逻辑

### 5.1 应触发 `scene-video-intake` 的情况

当用户输入包含以下情况时，总控应优先触发 `scene-video-intake`：

```text
用户上传视频文件
用户提供视频链接
用户提供短视频链接
用户上传截图序列并表示来自同一段视频
用户明确说“分析这个视频”
用户明确说“根据这个视频片段做”
用户说“先看懂这个片段，再帮我改编 / 做视频 / 做提示词”
用户要求从视频中提取分镜、镜头、动作、台词、声音或亮点
```

### 5.2 不应触发 `scene-video-intake` 的情况

不应触发：

```text
用户只是描述一个剧情
用户只给影视片名或桥段名
用户只给文字台词
用户已经给出明确改编目标，不需要解析源视频
用户只是询问协议、SOP 或项目设计
用户提供的是普通参考图，不是视频片段或截图序列
```

### 5.3 模糊情况

如果用户给了链接，但不确定是不是源视频，应询问：

```text
这是要作为源视频片段解析，还是只是作为参考资料？
```

---

## 6. `scene-video-intake` 的职责

`scene-video-intake` 应负责：

1. 接收源视频输入。
2. 提取基础元信息。
3. 解析整体内容。
4. 拆解逐镜头时间轴。
5. 解析人物 / 主体连续性。
6. 解析场景空间关系。
7. 解析动作连续性。
8. 解析对白 / 旁白 / 字幕。
9. 解析声音设计。
10. 解析视觉风格。
11. 解析镜头语言。
12. 提取核心重点与亮点。
13. 区分必须保留、可替换、可删减、可快速带过、不建议照搬的内容。
14. 提取后续改编可用的抽象结构。
15. 判断是否具备资产化候选价值。
16. 生成给 `scene-topic-gate` 的结构化 handoff。

---

## 7. 解析深度

参考用户提供的解析提示词，v6 应采用以下深度：

```text
基础信息
-> 整体概述
-> 逐镜头时间轴
-> 镜头语言分析
-> 主体连续性
-> 场景空间关系
-> 动作连续性
-> 对白/字幕/旁白
-> 声音设计
-> 视觉风格
-> 核心重点与亮点
-> 可保留 / 可替换 / 可压缩 / 不应照搬 内容清单
-> 安全改编结构
-> 资产化候选判断
-> topic gate handoff
```

注意：

```text
视频解析不是最终视频 prompt。
```

最终视频 prompt 仍由 `scene-video-prompt-builder` 统一生成。

---

## 8. 内容重要性分层

v6 必须明确：后续改编和剧本阶段不能把源视频所有细节等权保留。

建议新增：

```yaml
content_priority_map:
  core_must_keep:
  highlight_should_keep:
  useful_optional:
  pass_or_compress:
  safe_to_replace:
  avoid_copying:
```

### 8.1 `core_must_keep`

必须保留的核心内容，例如：

- 主要冲突；
- 关键动作链路；
- 情绪转折；
- 段落核心爽点；
- 观众理解视频必须知道的信息。

### 8.2 `highlight_should_keep`

值得优先保留的亮点内容，例如：

- 最有记忆点的镜头；
- 最有节奏感的动作；
- 最有反差的画面；
- 最有情绪张力的停顿；
- 最适合转化为 Hero Moment 的段落。

### 8.3 `useful_optional`

有帮助但不是必须保留的内容，例如：

- 背景环境细节；
- 次要动作；
- 辅助台词；
- 氛围音；
- 次要道具；
- 普通过渡镜头。

### 8.4 `pass_or_compress`

可以快速带过或压缩的内容，例如：

- 重复动作；
- 长时间铺垫；
- 低信息量停顿；
- 与核心冲突无关的环境展示。

### 8.5 `safe_to_replace`

可以安全替换的内容，例如：

- 人物身份；
- 服装；
- 场景；
- 道具；
- 品牌；
- 原台词；
- 背景音乐。

### 8.6 `avoid_copying`

不建议照搬的内容，例如：

- 明确版权角色；
- 明星脸；
- 标志性台词；
- 商标 / logo；
- 特定平台水印；
- 可识别的原片标志性画面。

---

## 9. 长解析内容的保存策略

`scene-video-intake` 解析结果通常会很长，不能直接塞进 `PROJECT_BOARD.md`。

推荐三层存储：

```text
1. 完整长解析文件：projects/<project>/inputs/source_intake/*
2. 章节索引文件：source_intake_index_v1.md
3. PROJECT_BOARD 轻量摘要：只存路径、摘要、active_version、read_policy
```

### 9.1 项目已创建时

推荐目录：

```text
projects/<project>/inputs/source_intake/
  source_video_analysis_v1.md
  source_video_timeline_v1.md
  source_video_dialogue_v1.md
  source_video_audio_v1.md
  source_video_camera_v1.md
  source_video_priority_map_v1.md
  topic_gate_handoff_v1.md
  source_intake_index_v1.md
```

### 9.2 项目尚未创建时

如果用户先上传视频，还没有项目名，建议先写入临时 intake：

```text
projects/_intake/<timestamp-or-slug>/
  source_video_analysis_v1.md
  source_video_timeline_v1.md
  source_video_priority_map_v1.md
  topic_gate_handoff_v1.md
  source_intake_index_v1.md
```

当 `scene-topic-gate` 判断值得建项后，再迁移或复制到：

```text
projects/<project>/inputs/source_intake/
```

### 9.3 不建议的位置

不建议写入：

```text
docs/
.handoff/
assets/
outputs/
```

说明：

- `docs/` 是人类设计说明，不是项目执行上下文；
- `.handoff/` 是交接文档，不参与阶段运行；
- `assets/` 是长期复用资产库，不应保存某个项目的原始长解析；
- `outputs/` 更适合最终提示词和发布素材，不适合源视频解析资料。

---

## 10. 读取策略

默认规则：

```text
PROJECT_BOARD.md 只存摘要和文件路径。
后续阶段默认读取 topic_gate_handoff + priority_map。
只有在当前阶段确实需要核对细节时，才读取完整分析或时间轴相关章节。
```

推荐读取策略：

```yaml
source_intake_read_policy:
  compact:
    read:
      - PROJECT_BOARD.md source_intake summary
      - topic_gate_handoff_v1.md
      - source_video_priority_map_v1.md
  standard:
    read:
      - source_intake_index_v1.md
      - 当前阶段相关专用文件
  deep:
    read:
      - source_video_analysis_v1.md
      - source_video_timeline_v1.md 的相关章节
    only_when:
      - 用户要求复盘源视频
      - 当前阶段需要解决关键不确定性
      - 分镜 / 剧本需要核对具体动作链
```

各阶段默认读取建议：

```text
scene-topic-gate：topic_gate_handoff + priority_map
scene-reference-decider：safe_to_replace / avoid_copying
scene-script-adapter：core_must_keep / highlight_should_keep / pass_or_compress / safe_to_replace
scene-storyboard-director：camera 摘要、key shots、action continuity、priority_map
scene-audio-director：source_video_audio_v1.md
scene-video-prompt-builder：source_intake_index + priority_map + 上游阶段产物
```

---

## 11. 资产化策略

`scene-video-intake` 的解析结果默认是 project input，但一部分可能提升为 reusable source asset。

### 11.1 Project Input

位置：

```text
projects/<project>/inputs/source_intake/
```

特点：

- 服务当前项目；
- 可以比较详细；
- 包含当前项目的判断、偏好和取舍；
- 后续阶段按需读取；
- 不默认给其他项目使用。

### 11.2 Reusable Source Asset

位置：

```text
assets/source-materials/<source-slug>/
```

特点：

- 可跨项目复用；
- 应更抽象、更稳定；
- 不应绑定某个项目的具体创作决策；
- 应强调可迁移结构、亮点、风险和改编边界；
- 应能被 `scene-topic-gate`、`scene-reference-decider`、`scene-script-adapter` 等阶段按需读取。

推荐目录：

```text
assets/source-materials/<source-slug>/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

说明：

```text
source-card.md：源片段资产卡，给总控和选题阶段快速读取
structure-analysis.md：桥段结构、动作节奏、情绪节奏、台词节奏
adaptation-angles.md：可复用改编角度，不绑定具体项目
safety-boundaries.md：不应照搬内容、需替换元素、版权/品牌/人物边界
reuse-history.md：哪些项目用过、怎么用的、效果如何
```

---

## 12. 什么时候把 intake 提升为 source asset

不是每个视频解析都要资产化。

建议满足以下任意条件时，可以考虑提升：

```text
用户明确说“这个片段以后可能还会反复用”
片段是经典名场面、网络名梗或高传播桥段
片段有清晰可迁移结构，例如强冲突、强反差、强台词节奏、强动作节奏
片段可以支持多个改编角度，而不是只适合当前项目
片段已经被多个项目引用
片段有明显可复用的镜头语言、表演节奏或声音节奏
```

不建议资产化的情况：

```text
只服务一次项目
内容价值主要来自具体人物身份、品牌或受保护表达，抽象后价值不足
片段信息不完整或解析不可靠
安全边界不清楚
用户只是临时参考，不希望沉淀
```

提升流程：

```text
scene-video-intake 生成 project intake
-> scene-topic-gate / 用户判断该片段有复用价值
-> 标记 candidate_for_assetization: true
-> 生成 source asset draft
-> 用户确认是否资产化
-> 写入 assets/source-materials/<source-slug>/
-> 在 PROJECT_BOARD 或 reuse-history 中记录引用
```

不应自动资产化，因为资产库是长期复用资源，必须经过确认。

---

## 13. 输出协议草案

建议 `scene-video-intake` 输出：

```yaml
patch_type: scene-video-intake
version: 1
status:
updated_at:
summary:
data:
  intake_confirmation:
    confirmed_by_user: false
    confirmation_note:
  source_video:
    input_type: file | url | frame_sequence | unknown
    source_path_or_url:
    duration_estimate_seconds:
    aspect_ratio:
    resolution_hint:
    has_audio:
    has_dialogue_or_text:
    language_hint:
    uncertainty_notes:
  content_summary:
    one_sentence_summary:
    short_summary_300_cn:
    main_event:
    conflict_or_hook:
    emotional_tone:
    genre_feel:
    viewing_value:
  timeline_breakdown:
    - shot_id:
      time_range:
      shot_scale:
      camera_angle:
      camera_movement:
      composition:
      visual_content:
      character_action_or_subject_motion:
      scene_and_props:
      lighting_and_color:
      focus_and_depth:
      sound_content:
      transition:
      story_function:
      importance_level: core | highlight | optional | pass
  camera_language_analysis:
    viewpoint_strategy:
    shot_scale_progression:
    camera_movement_function:
    composition_strategy:
    edit_rhythm:
    key_shots:
  characters_or_subjects:
    - subject_id:
      visible_description:
      role_in_clip:
      continuity_features:
      action_profile:
      emotional_arc:
      uncertainty_notes:
  scene_space_analysis:
    locations:
    spatial_layout:
    subject_entry_exit:
    movement_path:
    camera_position_changes:
    foreground_midground_background:
    key_spatial_constraints_for_generation:
  action_continuity:
    - time_range:
      action:
      cause_or_continuity:
      next_action_handoff:
      importance_level: core | highlight | optional | pass
  dialogue_transcript:
    - time_range:
      speaker:
      original_text:
      language:
      translation_cn:
      tone:
      emotion:
      confidence: high | medium | low | unclear
      note:
  audio_observations:
    music:
    ambience:
    foley:
    dialogue_or_voice:
    sync_points:
    audio_must_keep:
    audio_can_replace:
  visual_style_analysis:
    photography_style:
    lighting_style:
    color_style:
    texture_quality:
    editing_style:
    style_keywords:
  core_highlight_analysis:
    attention_hook:
    most_memorable_frame:
    key_action_node:
    strongest_emotional_moment:
    strongest_contrast_or_drama:
    top_5_must_not_lose:
    top_5_worth_preserving_for_adaptation:
  content_priority_map:
    core_must_keep:
    highlight_should_keep:
    useful_optional:
    pass_or_compress:
    safe_to_replace:
    avoid_copying:
  adaptation_potential:
    suitable_for_sceneforge: true | false | uncertain
    suitability_reason:
    candidate_angles:
      - angle_id:
        title:
        reason:
        target_emotion:
        possible_style:
        content_priority_used:
        selection_mode: reference | adapted_reference | custom_generated
    risks_or_limits:
  safe_adaptation_notes:
    keep_structure:
    replace_elements:
    avoid_elements:
    recommended_adaptation_direction:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
    source_asset_ref:
      asset_id:
      asset_path:
      reuse_mode: direct_reference | adapted_reference | structure_only
  topic_gate_handoff:
    candidate_topic:
    source_material_summary:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
    assetization_candidate:
    recommended_next_stage: scene-topic-gate
```

---

## 14. PROJECT_BOARD 建议新增字段

推荐顶层字段：

```yaml
source_intake:
  type: video_clip
  status: pending | analyzed | skipped | failed
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version: v1
  files:
    index: inputs/source_intake/source_intake_index_v1.md
    analysis: inputs/source_intake/source_video_analysis_v1.md
    timeline: inputs/source_intake/source_video_timeline_v1.md
    dialogue: inputs/source_intake/source_video_dialogue_v1.md
    audio: inputs/source_intake/source_video_audio_v1.md
    camera: inputs/source_intake/source_video_camera_v1.md
    priority_map: inputs/source_intake/source_video_priority_map_v1.md
    topic_gate_handoff: inputs/source_intake/topic_gate_handoff_v1.md
  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    risks_or_limits:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode: direct_reference | adapted_reference | structure_only
  read_policy:
    default_read: topic_gate_handoff + priority_map_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

---

## 15. 与 `scene-topic-gate` 的关系

`scene-video-intake` 不负责最终选题评分。

它只负责把源视频整理成结构化材料。

`scene-topic-gate` 仍负责：

- 判断是否值得做；
- 判断适合什么生产规格；
- 判断改编难度；
- 判断版权 / 安全 / 传播风险；
- 判断是否进入后续主流程；
- 判断 source intake 是否值得提升为 reusable source asset。

如果 `source_intake.topic_gate_handoff` 存在，`scene-topic-gate` 应优先使用该 handoff，而不是重新从视频或用户原始输入开始判断。

---

## 16. 与后续阶段的关系

### 16.1 `scene-reference-decider`

使用 `source_intake.safe_replacement_notes` 判断哪些内容可参考，哪些内容必须替换。

如果存在 `source_asset_ref`，应优先读取对应 source asset 的 `safety-boundaries.md`。

### 16.2 `scene-design-builder`

继承人物 / 主体连续性、场景空间关系、视觉锚点和可替换方向。

### 16.3 `scene-script-adapter`

继承：

```text
core_must_keep
highlight_should_keep
pass_or_compress
safe_to_replace
```

剧本阶段应明确：

```text
哪些源视频内容被保留，哪些被压缩，哪些被删减，哪些被安全替换。
```

如果使用 source asset，应说明当前项目是 `direct_reference`、`adapted_reference` 还是 `structure_only`。

### 16.4 `scene-storyboard-director`

继承 key shots、camera language、action continuity、scene space 和 top must not lose。

分镜阶段不能照搬具体受保护表达，而应保留抽象镜头语言与节奏功能。

### 16.5 `scene-video-prompt-builder`

继承主体一致性、场景空间一致性、动作连续性、声音同步点和负向约束。

---

## 17. 与 Open Reference 的关系

`scene-video-intake` 同样遵守：

```text
模板、示例、枚举、pattern 都是参考锚点，不是封闭集合。
```

如果视频中出现模板没有覆盖的表达，Agent 应使用：

```yaml
selection_mode: custom_generated
reason:
```

Source Asset 也只是参考锚点，不是强制模板。

如果只借用抽象结构，不借用具体人物、台词或场景，应写：

```yaml
reuse_mode: structure_only
```

---

## 18. 不确定性规则

视频解析必须明确不确定性。

要求：

1. 看不清的细节标注 `unclear`。
2. 推测内容标注 `inferred` 或 `推测`。
3. 听不清的对白标注 `unclear_audio`。
4. 不确认的场景、身份、品牌不强行命名。
5. 不要把模型猜测当成事实写入 `core_must_keep`。

建议字段：

```yaml
confidence: high | medium | low | unclear
uncertainty_notes:
```

---

## 19. 第一版是否需要资产库

第一版不建议立即新增通用视频解析资产库。

原因：

```text
先把入口、输出协议、黑板字段、长解析存储和与 topic gate 的交接跑通更重要。
```

但第一版可以预留 source material 资产化目录：

```text
assets/source-materials/<source-slug>/
```

这不是视频解析 taxonomy 库，而是经典源片段的可复用资产目录。

后续如需要再新增：

```text
assets/video-analysis/shot-type-library.md
assets/video-analysis/content-analysis-taxonomy.md
assets/video-analysis/adaptation-angle-library.md
```

v6 第一轮建议先新增：

```text
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
```

---

## 20. 实施阶段建议

下一步实施计划可拆成：

```text
Phase 1：生成 v6 Implementation Plan
Phase 2：新增 scene-video-intake Skill 与 output contract
Phase 3：修改 scene-forge 总控触发逻辑
Phase 4：修改 board-protocol 与 project-board-template，加入 source_intake
Phase 5：修改 scene-topic-gate，使其优先读取 source_intake.topic_gate_handoff
Phase 6：加入 source_intake 存储与读取策略
Phase 7：加入 source_intake assetization 机制
Phase 8：生成 v6 Protocol Review
Phase 9：用一个视频片段做最小测试
```

---

## 21. 最小测试建议

测试输入：

```text
用户上传一个 10-30 秒视频片段，并说：根据这个视频做一个动画短片项目。
```

期望流程：

```text
scene-forge 判断输入类型
-> 触发 scene-video-intake
-> 生成 source_video_analysis
-> 写入 source_intake
-> 推进 scene-topic-gate
-> topic gate 基于 source_intake 判断选题
```

测试观察点：

1. 是否没有直接跳到 `scene-topic-gate`。
2. 是否生成视频基础信息。
3. 是否生成逐镜头时间轴。
4. 是否提取人物 / 主体连续性。
5. 是否提取声音、镜头、动作和场景空间。
6. 是否区分 `core_must_keep`、`highlight_should_keep`、`pass_or_compress`。
7. 是否生成 `topic_gate_handoff`。
8. 后续 topic gate 是否使用该 handoff。
9. 是否判断 `candidate_for_assetization`。
10. 是否遵守 Open Reference。
11. 是否没有读取 `docs/`、`.handoff/` 或历史项目输出。

资产化测试可用：

```text
用户说明该片段可能以后反复用于不同改编。
```

期望：

```text
source_intake.assetization.candidate_for_assetization = true
但不会自动写入 assets/source-materials，除非用户确认。
```

---

## 22. 一句话总结

```text
SceneForge v6 的 Video Intake 不是普通视频总结，而是把用户提供的视频源解析成可供选题、改编、剧本、分镜、声音和视频提示词阶段复用的结构化创作资料；解析结果默认存为项目输入，若具备跨项目复用价值，可经确认提升为 assets/source-materials/<source-slug>/ 下的可复用源片段资产。
```
