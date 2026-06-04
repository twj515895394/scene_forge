---
name: scene-video-prompt-builder
description: 当用户要根据 SceneForge 分镜、表演表、声音导演结果和 source_intake 继承约束生成视频分段提示词及一致性约束，并把最终可用提示词写入 outputs 时应使用此技能。
---

# scene-video-prompt-builder

负责把分镜、表演设计、声音方案和 source intake 继承约束转成最终可用于视频生成平台的提示词交付包，并保持与上游故事骨架一致。

本阶段不再把声音要求作为附属说明，而是必须继承 `scene-audio-director` 的 audio plan，把台词气口、拟音、音乐、环境音和静默点整合进每个 Segment Prompt。

本阶段必须继承 `expressive_animation` 中的动画物理、轻中度卡通伤害尺度、反差喜剧、VFX 支撑、卡通声音和负向边界。

本阶段还必须继承 `scene-storyboard-director` 的 `storyboard_content_breakdown`、`cinematic_language_plan`、`video_generation_units`、开头/结尾锚帧和 `camera_language`，把专业镜头语言写入每段视频提示词。

如果项目包含 `source_intake`，本阶段必须继承 source intake 的抽象结构与当前项目确认的保留 / 改写边界；是否保留经典台词、关键对白、具体镜头和高识别表达，由项目目标决定，本阶段只在需要时规避字幕版式、平台水印、品牌元素和强识别人物绑定。

SceneForge 当前只输出视频生成提示词和制作说明，不生成视频。视频需要用户基于本阶段 prompt、角色说明书板、场景道具图和故事板图在外部平台手动生成。

本阶段默认输出：

- 中文导演长版提示词
- 英文导演长版提示词
- 中文模型投喂版提示词
- 英文模型投喂版提示词

并且必须先经历：

```text
Prompt Draft
-> Prompt Review
-> Auto Fix
-> Final Delivery
```

未经自动 review 通过，不得标记为最终交付。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-video-prompt-builder`
- 已完成分镜设计和声音导演，项目状态为 `audio_ready`
- 需要生成可直接用于视频生成平台的分段提示词
- 需要把 source intake 的核心动作链、亮点、可替换项和禁止照搬项落实到最终 Segment Prompt
- 需要把角色一致性、场景一致性、镜头连续性、表演连续性和声音连续性一并整理为最终输出物
- 需要把分镜、表演、声音阶段的表现力扩展规则整合进最终 Segment Prompt
- 需要把分镜阶段的镜头语言方案、视觉动机和 selected shot pattern 整合进最终 Segment Prompt
- 需要把双版故事板、连续性控制和模型适配策略转译成最终视频提示词

如果分镜或 audio plan 还没完成，或已经进入发布包装阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `audio_ready`，且总控路由的 `state.next_stage` 为 `scene-video-prompt-builder`。
2. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、完整分镜、表演表、声音方案、设计摘要、参考边界、`creative_direction_context` 和必要的 Blocking/道具状态输入。
3. 如果存在 `source_intake.status: analyzed`，读取黑板中的 `source_intake.topic_gate_handoff_summary`，并继承 `scene-storyboard-director` 产出的 `source_intake_storyboard_use`。
4. 必要时读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
5. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有最终提示词需要核对动作连续性时，才读取相关章节并说明原因。
6. 如最终提示词需要补充表现力扩展资产库中的正向或负向口径，可按需读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
7. 如最终提示词需要补充镜头语言方案或分镜 pattern 的通用口径，可按需读取：
   - `assets/cinematic-language/shot-language-library.md`
   - `assets/cinematic-language/animation-film-shot-patterns.md`
   - `assets/cinematic-language/animation-comedy-action-patterns.md`
8. 如最终提示词需要显式对齐视频生成单元、双版故事板或模型适配规则，可按需读取：
   - `assets/storyboard-methodology/index.md`
   - `assets/storyboard-methodology/video-generation-unit-library.md`
   - `assets/storyboard-methodology/continuity-control-library.md`
   - `assets/storyboard-methodology/storyboard-dual-version-prompt-library.md`
   - `assets/storyboard-methodology/video-prompt-translation-library.md`
   - `assets/storyboard-methodology/model-adaptation-library.md`
9. 读取 `references/output-contract.md`，确认输出物分类、`Segment + Shot + Timecode` 结构、双版故事板继承字段、模型适配字段、自动 review 要求和目录落点。
10. 继承分镜阶段已经确认的 `segment_duration_seconds`、`target_total_duration_seconds`、`segments`、`storyboard_content_breakdown`、`cinematic_language_plan`、`video_generation_units`、`shot_highlights`、`hero_moments`、`bridge_shots`、`blocking_map`、`faction_layout`、`prop_state_machines`、`storyboard_prompt_pack_mode`、`storyboard_prompt_files`、`control_storyboard_prompt_file`、`styled_storyboard_prompt_file`、`opening_anchor_frame`、`closing_anchor_frame`、`space_continuity_map`、`action_continuity_chains` 和 `emotion_continuity_chains`。
11. 继承 `expressive_animation`、当前分镜阶段沉淀的镜头语言继承摘要、`expressive_storyboard_shots`、`stylized_action_shots`、`contrast_storyboard`、`expressive_audio_design` 和相关负向边界。
12. 在正式生成视频提示词文件前，先输出“视频提示词方案预览”，至少包含分段提示词结构、`Segment + Shot + Timecode` 执行方式、每段参考图使用计划、控制版 / 风格版故事板使用声明、source intake 继承与规避计划、每段是否有对白与对白承载策略、continuity_in / continuity_out、blocking_continuity、prop_state_continuity、blocking_execution、prop_state_execution、声音连续性、表现力扩展写入方案、镜头语言继承方案、模型适配计划、双语交付计划和需要用户确认的问题。
13. 等待用户明确确认视频提示词方案；用户纠错或补充偏好不等于授权落盘。
14. 用户确认后，先生成视频提示词草稿：为每个视频分段整合镜头内容、动作、运镜、镜头语言、视觉动机、表演、台词、拟音、音乐、环境音、静默点、节奏、参考图使用方式、source intake 规避约束、表现力扩展要求、双版故事板转译规则和连续性钩子。
15. 草稿必须同时产出导演长版和模型投喂版；模型投喂版必须采用 `Segment + Shot + Timecode` 双层结构，而不是只写“10 秒一段的大 Prompt”。
16. 对草稿执行自动 review：检查时长一致性、双语完整性、Shot Timecode 完整性、每段是否显式声明有无对白、Blocking / Prop State 执行结构、Hero Candidate / Ending Payoff 继承、声音/表演/镜头语言继承、锚帧与连续性链继承、模型适配完整性和负向约束。
17. 若发现结构性问题，先自动修复，再重新 review；不得悄悄改动用户已确认的创作方向、总时长和 Segment 策略。
18. 通过 review 后，将最终提示词写入 `outputs/video_prompts/`；黑板里只保留摘要、版本信息、review 状态和路径。
19. 输出单个 YAML 补丁块，说明生成了哪些视频提示词版本、是否已覆盖分段、source intake 继承边界、参考图使用条件、表演/声音/空间/道具/连续性/表现力扩展/镜头语言连续性、模型适配和自动修复情况。
20. 将状态推进建议交回总控 Skill，进入 `scene-publish-review`。

## source_intake 最终提示词规则

如果项目来自视频源输入，本阶段必须显式输出：

```yaml
source_intake_prompt_use:
  source_intake_used: true
  files_read:
  inherited_structure:
  inherited_action_chain:
  adapted_highlights:
  replaced_elements:
  avoid_copying_enforced:
```

规则：

- `core_must_keep` 只能转写为抽象动作、冲突结构、情绪转折、镜头功能或连续性目标。
- `highlight_should_keep` 可以转写为新的动画电影化看点，但必须使用新的镜头表达、视觉语境和提示词措辞。
- `safe_to_replace` 必须优先替换人物身份、场景表层、道具表层、构图、机位、转场和字幕画面；台词是否保留由项目创作目标和经典性决定，不默认强制替换。
- `avoid_copying` 必须落实到每段 prompt 的负向边界或全局 negative / avoid section。
- 最终 Segment Prompt 是否保留经典台词、关键对白、具体镜头组合、原始构图、原剪辑节奏或高识别视觉表达，由当前项目创作目标决定；本阶段不默认限制保留强度，只在需要时规避字幕版式、平台水印、品牌元素和具体人物身份绑定。
- 允许继承的是“为什么有效”的结构，不是“它具体长什么样”。
- 如果使用 source asset，只能引用用户确认后的具体 source asset 文件，不得默认读取整个 `assets/source-materials/`。

## 关键规则

- 输出内容至少包括：分段视频提示词、角色一致性约束、场景一致性约束、表演连续性约束、声音连续性说明、镜头连续性说明、镜头语言说明、source intake 继承与规避说明、参考图使用说明、Blocking 连续性、道具状态连续性和表现力扩展约束。
- 每段视频提示词必须显式给出“对白存在性判断”，而不是默认存在对白；有对白时写清角色、对白意图、语气、停顿和承载方式，无对白时写明由动作、表情、环境音或静默承载。
- 默认交付必须包含中文 / 英文双份，以及导演长版 / 模型投喂版双层。
- 若上游故事板为 `multi_pack_recommended` 或 `multi_pack_confirmed`，本阶段必须显式消费全部相关故事板包，不得假设只有一个故事板 prompt 文件。
- 每段视频提示词必须整合该段的动作、运镜、镜头语言、表演、台词、拟音、音乐、环境音和节奏，而不是把声音或镜头语言要求单独悬空。
- 双版故事板只能作为同源参考，不得把控制版和风格版翻译成两个不同叙事版本。
- 模型投喂版必须包含 `shot_plan`、时间码、`blocking_execution` 和 `prop_state_execution`，不能只保留段级概述。
- 必须继承 `scene-performance-director` 的角色表演锚点和 `scene-audio-director` 的声音计划。
- 必须继承分镜阶段的 `continuity_in`、`continuity_out`、Hero Shot、Bridge Shot、Segment Plan、`storyboard_content_breakdown` 和 `cinematic_language_plan`。
- 必须继承 `video_generation_units`、`opening_anchor_frame`、`closing_anchor_frame`、`space_continuity_map`、`action_continuity_chains` 和 `emotion_continuity_chains`。
- 必须继承 `scene-story-development` 的 `hero_moment_candidates` 与 `ending_payoff`，避免末端把前面确定的高潮与收束点压掉。
- 必须继承 `scene-storyboard-director` 的 `source_intake_storyboard_use`，并继续执行 `avoid_copying_shots`。
- 必须继承 `creative_direction_context`；`preserve_original` 模式下不得把原始剧情提示词重新写成新题材方向。
- 必须继承 `expressive_animation`，把动画物理、轻中度卡通伤害尺度、反差喜剧和负向边界写入对应 Segment Prompt。
- 必须继承分镜阶段的镜头语言继承摘要，把 `camera_language`、`visual_motivation`、`selected_shot_pattern` 转化为自然语言导演说明。
- 不得在最终 prompt 中写“模仿某部电影镜头”；只能写抽象镜头结构、景别、机位、构图、运动和视觉动机。
- 不得把故事板边框、箭头、镜头号、草图质感或版式说明直接翻译进最终视频 prompt。
- 是否保留原版镜头组合和高识别视觉表达由当前项目创作目标决定；本阶段只在需要时规避字幕画面、平台水印、品牌元素和具体人物身份绑定。
- 动画物理提示词必须写清动作节奏和恢复，不只写“夸张特效”。
- 轻中度卡通伤害提示词允许灰头土脸、头包、小擦伤、鼻血笑点等，但必须明确不要大量流血、写实伤口、身体恐怖或持续痛苦。
- 反差喜剧提示词必须保留 setup / reveal / hold，不能用过量 VFX 遮住反差本身。
- 必须继承 `blocking_map`、`faction_layout` 和 `forbidden_zone`，在每段 prompt 中写清角色默认站位、允许移动区域和禁止区域。
- 必须继承 `prop_state_machines`，在每段 prompt 中写清核心道具当前状态、可见证据、允许交互和安全边界。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 正式落盘前必须校验`project_config.target_total_duration_seconds` 是否与当前阶段和当前文件声明一致；不一致时先回写顶层黑板。
- 视频提示词统一写入 `outputs/video_prompts/`，但必须区分导演长版与模型投喂版，并默认使用中文主导文件名。
- 故事板方法论资产不得新增黑板顶层字段；方法论配置和启用记录只允许通过 `runtime_policy.context_policy.allowed_runtime_asset_paths`、`stage_index.storyboard.files.methodology_config` 和 `stage_index.storyboard.read_policy` 暴露。
- 黑板只记录摘要和文件路径，不直接塞完整提示词正文。
- 本阶段不得声称已经生成视频，只能说明“已生成用于外部平台制作视频的分段提示词”。
- 必须诚实说明连续性、Blocking、镜头语言和参考图策略只能降低抽卡成本，不能保证视频模型一次生成完全稳定。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：输出分类、目录规则、表现力扩展字段、镜头语言字段和黑板摘要边界
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
- `.agents/skills/scene-audio-director/references/output-contract.md`：声音导演输出协议
- `.agents/skills/scene-storyboard-director/references/output-contract.md`：分镜导演输出协议
