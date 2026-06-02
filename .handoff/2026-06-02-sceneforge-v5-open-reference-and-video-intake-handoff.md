# SceneForge v5 Open Reference 完成与下一阶段 Video Intake 交接

日期：2026-06-02

## 1. 本 handoff 目的

本 handoff 用于记录：

1. v4 动画表现力扩展当前完成状态。
2. v5 专业分镜导演增强当前完成状态。
3. Open Reference 原则已接入总控、黑板模板与 board protocol。
4. 下一阶段新增方向：用户提供视频片段时，先进入“视频片段解析前置阶段”，再进入选题阶段。

---

## 2. 当前总体状态

当前 SceneForge 已完成：

```text
v4：动画表现力协议第一轮落地
v5：专业分镜导演增强协议第一轮落地
Open Reference：模板 / 示例 / 枚举 / pattern 作为参考锚点，不是封闭集合
```

当前建议下一步：

```text
在 scene-topic-gate 前新增 video-intake / video-analysis 前置阶段。
```

该阶段用于处理用户上传或提供的视频片段、视频链接、截图序列、短视频素材等输入。

---

## 3. v4 当前状态

v4 顶层字段：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

执行期资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

v4 解决的问题：

```text
可以用什么动画表现。
```

包括：

- 动画物理；
- 轻中度卡通伤害尺度；
- 反差喜剧；
- VFX 支撑；
- 动作喜剧安全边界；
- 声音与视频提示词阶段继承。

最新 review：

```text
docs/SceneForge-v4-Protocol-Review.md
```

结论：

```text
v4 可进入最小项目测试。
```

---

## 4. v5 当前状态

v5 顶层字段：

```yaml
storyboard_director_v5:
  enabled: true
  confirmation_status: pending_storyboard_plan_confirmation
  assets:
    shot_language_library: assets/cinematic-language/shot-language-library.md
    animation_film_patterns: assets/cinematic-language/animation-film-shot-patterns.md
    animation_comedy_action_patterns: assets/cinematic-language/animation-comedy-action-patterns.md
```

执行期资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

v5 解决的问题：

```text
这个表现应该怎么拍。
```

核心能力链：

```text
story_beats / performance_sheet
-> storyboard_content_breakdown
-> cinematic_language_plan
-> shot_highlights / shotlist / storyboard_prompts
```

关键字段：

```yaml
storyboard_content_breakdown:
cinematic_language_plan:
selected_shot_pattern:
visual_motivation:
```

最新 review：

```text
docs/SceneForge-v5-Protocol-Review.md
docs/SceneForge-v5-Open-Reference-and-Protocol-Review.md
```

结论：

```text
v5 专业分镜导演增强协议层已完成第一轮落地。
当前没有发现阻塞最小项目测试的问题。
```

---

## 5. Open Reference 当前状态

### 5.1 正式协议文件

已新增并接入：

```text
.agents/skills/scene-forge/references/open-reference.md
```

### 5.2 总控 Skill 已接入

已确认真实总控文件：

```text
.agents/skills/scene-forge/SKILL.md
```

已经包含：

```text
references/open-reference.md
```

并包含开放参考原则：

```text
所有模板、示例、枚举、资产库 pattern 和 prompt fragment 都是参考锚点，不是封闭集合。
```

支持：

```yaml
selection_mode: reference | adapted_reference | custom_generated
source_reference:
reason:
```

### 5.3 PROJECT_BOARD 模板已接入

已更新：

```text
.agents/skills/scene-forge/references/project-board-template.md
```

新增：

```yaml
reference_policy:
  templates_are_reference_only: true
  examples_are_reference_only: true
  enums_are_open_by_default: true
  strict_enum_only_when_explicit: true
  allow_adapted_reference: true
  allow_custom_generated_option: true
  require_reason_for_custom_option: true
```

### 5.4 Board Protocol 已接入

已更新：

```text
.agents/skills/scene-forge/references/board-protocol.md
```

已经包含顶层：

```yaml
reference_policy:
```

并说明：

```text
开放参考不改变确认闸门、运行时读取边界、阶段输出协议和安全边界。
```

### 5.5 注意事项

仓库中仍有：

```text
assets/open-reference.md
```

该文件已标记为：

```text
deprecated duplicate
```

正式来源是：

```text
.agents/skills/scene-forge/references/open-reference.md
```

不建议把 `assets/open-reference.md` 加入 `allowed_runtime_asset_paths`，因为 open-reference 是协议解释，不是执行期创作资产。

---

## 6. 当前主流程

当前主流程为：

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

总控原则：

```text
只执行 PROJECT_BOARD.md 中 next_stage 指向的一个阶段。
用户说“继续”不得连跑多个阶段。
```

---

## 7. 下一阶段新增方向：Video Intake 前置阶段

用户提出的新方向：

```text
当用户提供一个视频片段时，SceneForge 应先解析视频片段，生成该视频的相关内容信息整理，再进入选题阶段。
```

理解：

```text
这是在 scene-topic-gate 之前新增一个入口分流和前置处理步骤。
```

不是替代 `scene-topic-gate`，而是：

```text
video_input
-> video-intake / video-analysis
-> scene-topic-gate
-> 后续主流程
```

---

## 8. 为什么需要 Video Intake

当前 `scene-topic-gate` 更适合处理：

- 用户直接给一句创作意图；
- 用户给影视桥段名；
- 用户给剧情描述；
- 用户给改编方向；
- 用户给文字材料。

但当用户提供视频片段时，系统需要先回答：

```text
这个视频里到底发生了什么？
里面有哪些人物、场景、动作、情绪、台词、镜头、节奏、亮点？
它适不适合改编？
适合从哪个角度做 SceneForge 项目？
```

因此需要新增一个前置阶段，把视频输入转成结构化内容资料。

---

## 9. 新阶段候选命名

候选 Skill 名：

```text
scene-video-intake
scene-video-analyzer
scene-source-video-analyzer
scene-source-intake
scene-clip-intake
```

推荐命名：

```text
scene-video-intake
```

原因：

- 它是入口阶段，不只是分析工具。
- 它负责接收视频输入、提取内容、整理信息、生成可供选题阶段使用的材料。
- 名称比 `video-analyzer` 更适合放在主流程入口。

---

## 10. 建议新增流程

建议新主流程变为：

```text
scene-video-intake        # 仅当用户提供视频片段/视频链接/视频文件时触发
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

普通文字输入仍然走：

```text
scene-topic-gate
-> scene-reference-decider
-> ...
```

也就是说：

```text
video-intake 是条件触发，不是所有项目都必须执行。
```

---

## 11. 中控需要新增的判断逻辑

总控 `scene-forge` 后续需要判断：

### 11.1 触发 `scene-video-intake` 的情况

当用户输入包含以下内容时，应优先触发：

```text
视频文件
视频链接
短视频链接
用户明确说“分析这个视频”
用户明确说“根据这个视频片段做”
用户上传视频帧 / 截图序列，并表示这些来自同一段视频
用户要求先看懂片段，再帮我改编 / 做视频 / 做提示词
```

### 11.2 不触发 `scene-video-intake` 的情况

不应触发：

```text
用户只是描述一个剧情
用户只给影视片名或桥段名
用户只给文字台词
用户已经给出明确改编目标，不需要解析源视频
用户只是询问项目协议或 SOP
```

### 11.3 模糊情况

如果用户给了链接但不确定是不是视频，应由总控判断或询问：

```text
这是要作为源视频片段解析，还是只是作为参考资料？
```

但如果用户明显表达“根据这个视频片段做”，应直接进入 `scene-video-intake`。

---

## 12. `scene-video-intake` 的职责建议

`scene-video-intake` 应负责：

1. 接收源视频输入。
2. 提取基础元信息。
3. 解析画面内容。
4. 解析人物 / 角色 / 主体。
5. 解析动作和事件。
6. 解析场景和道具。
7. 解析台词 / 字幕 / 屏幕文字，若可用。
8. 解析声音 / 音乐 / 情绪节奏，若可用。
9. 解析镜头语言：景别、机位、运动、剪辑节奏。
10. 提取高光点、冲突点、笑点、情绪点、可改编点。
11. 判断内容是否适合 SceneForge 改编。
12. 输出给 `scene-topic-gate` 使用的结构化摘要。

---

## 13. `scene-video-intake` 输出建议

建议输出字段：

```yaml
patch_type: scene-video-intake
version: 1
status:
updated_at:
summary:
data:
  source_video:
    input_type: file | url | frame_sequence | unknown
    source_path_or_url:
    duration_estimate_seconds:
    resolution_or_aspect_ratio:
    has_audio:
    has_dialogue_or_text:
    language_hint:
  content_summary:
    one_sentence_summary:
    detailed_summary:
    main_event:
    conflict_or_hook:
    emotional_tone:
    genre_feel:
  timeline_breakdown:
    - time_range:
      visual_content:
      action:
      characters:
      dialogue_or_text:
      audio_note:
      camera_note:
      story_function:
  characters_or_subjects:
    - subject_id:
      visible_description:
      role_in_clip:
      personality_hint:
      action_profile:
      emotional_arc:
  scene_and_props:
    locations:
    key_props:
    prop_state_changes:
  audio_observations:
    music:
    ambience:
    foley:
    dialogue:
    silence_or_pause:
  camera_and_editing_observations:
    shot_types:
    camera_movement:
    edit_rhythm:
    visual_style:
    notable_shots:
  adaptation_potential:
    suitable_for_sceneforge: true | false | uncertain
    candidate_angles:
      - angle_id:
        title:
        reason:
        target_emotion:
        possible_style:
    risks_or_limits:
    recommended_next_stage: scene-topic-gate
  topic_gate_handoff:
    candidate_topic:
    source_material_summary:
    key_moments:
    adaptation_notes:
    reference_policy_note:
```

---

## 14. PROJECT_BOARD 建议新增字段

如果执行了 `scene-video-intake`，黑板可新增：

```yaml
source_intake:
  type: video_clip
  status: analyzed
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  intake_file:
  topic_gate_handoff:
```

也可以更具体：

```yaml
video_intake:
  enabled: true
  status: completed
  source_type: file | url | frame_sequence | unknown
  analysis_file:
  candidate_angles:
  recommended_next_stage: scene-topic-gate
```

建议取舍：

```text
如果后续还会支持文章、图片、音频等源材料输入，可用 source_intake。
如果只先做视频片段，可用 video_intake。
```

推荐：

```text
source_intake
```

原因：未来更容易扩展到：

- 图片解析；
- 音频解析；
- 剧本文档解析；
- 网页 / 新闻 / 帖子解析。

---

## 15. 产物落盘建议

建议 `scene-video-intake` 生成：

```text
projects/<project>/inputs/source_video_analysis_v*.md
projects/<project>/inputs/source_video_timeline_v*.md
```

黑板只保留摘要和路径，不塞完整逐秒解析。

如果项目尚未创建，可先生成临时 intake 文件，再由总控创建项目目录。

候选路径：

```text
projects/_intake/<timestamp-or-slug>/source_video_analysis_v1.md
```

或者总控先根据视频主题生成项目名，再写入：

```text
projects/<project>/inputs/source_video_analysis_v1.md
```

---

## 16. 与 topic gate 的关系

`scene-video-intake` 不负责最终选题评分。

它只负责把源视频整理成可供选题判断的信息。

`scene-topic-gate` 仍负责：

```text
判断是否值得做、怎么做、是否需要改编、是否适合当前生产规格。
```

交接关系：

```text
scene-video-intake 输出 source summary / key moments / candidate angles
scene-topic-gate 基于这些内容做 topic scoring 和项目准入判断
```

---

## 17. 与 reference_policy 的关系

视频解析阶段同样遵守 Open Reference：

```text
解析模板、时间轴字段、角色类型、镜头类型、候选角度枚举，都只是参考。
如果视频里出现模板里没有的表达，Agent 应自定义更准确的分类，并说明原因。
```

建议输出：

```yaml
selection_mode: custom_generated
reason: 当前视频的核心吸引力不是动作、喜剧或情绪，而是空间错觉和信息误导，因此自定义 candidate angle。
```

---

## 18. 与运行时读取边界的关系

新增 `scene-video-intake` 后仍应遵守：

```text
不读取 docs/
不读取 .handoff/
不读取历史项目输出
不读取其他无关项目目录
```

允许读取：

```text
当前用户提供的视频输入
当前项目 PROJECT_BOARD.md
scene-video-intake/SKILL.md
scene-video-intake/references/output-contract.md
必要的总控 board protocol / open-reference 说明
```

是否需要新增执行期资产库：

暂时不需要。

后续如果要增强视频解析，可再新增：

```text
assets/video-analysis/shot-type-library.md
assets/video-analysis/content-analysis-taxonomy.md
assets/video-analysis/adaptation-angle-library.md
```

但第一版建议先用 Skill 协议完成，不急着堆资产库。

---

## 19. 后续实施计划建议

建议下一阶段先写：

```text
docs/SceneForge-v6-Video-Intake-System.md
```

内容：

1. 新入口场景定义；
2. 中控触发逻辑；
3. `scene-video-intake` 职责；
4. 输出协议；
5. 与 `scene-topic-gate` 的交接；
6. `PROJECT_BOARD` 新字段；
7. 输入文件 / 链接 / 截图序列的处理边界；
8. 是否需要资产库；
9. 测试方案。

然后再写：

```text
docs/SceneForge-v6-Video-Intake-Implementation-Plan.md
```

再进入协议改造：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
.agents/skills/scene-topic-gate/SKILL.md
.agents/skills/scene-topic-gate/references/output-contract.md
```

---

## 20. 中控后续要改的重点

`scene-forge/SKILL.md` 需要新增：

```text
当用户提供视频片段、视频链接、视频文件或截图序列，并表达希望基于该视频制作/改编/分析时，优先进入 scene-video-intake。
```

主流程说明需要改为：

```text
可选前置：scene-video-intake
主流程：scene-topic-gate -> ...
```

`PROJECT_BOARD` 初始化模板需要新增：

```yaml
source_intake:
  type:
  status:
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  intake_file:
  topic_gate_handoff:
```

`board-protocol.md` 需要新增 `source_intake` 顶层字段说明。

`scene-topic-gate` 需要新增：

```text
如果存在 source_intake.topic_gate_handoff，则优先基于该 handoff 进行选题判断。
```

---

## 21. 测试建议

v6 最小测试：

用户输入：

```text
一个 10-30 秒视频片段 / 链接 / 截图序列，并说“根据这个视频做一个动画短片项目”。
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

观察点：

1. 中控是否正确识别视频输入。
2. 是否没有直接跳到 `scene-topic-gate`。
3. video intake 是否生成结构化摘要和时间轴。
4. 是否产生 candidate angles。
5. topic gate 是否使用 intake handoff。
6. 没有读取 docs / handoff / 历史项目。
7. Open Reference 是否仍然适用。

---

## 22. 最终结论

```text
当前 v4、v5 和 open-reference 协议已对齐，可进入测试。

下一阶段建议启动 v6：Video Intake / Source Intake 前置阶段。

v6 的目标不是替代选题阶段，而是在用户提供视频片段时，先把源视频解析成结构化内容资料，再交给 scene-topic-gate 做选题判断。
```
