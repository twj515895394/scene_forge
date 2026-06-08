---
name: scene-storyboard-director
description: 当用户要把 SceneForge 剧本节拍、source_intake 视频源优先级分层和表演导演结果转成适合当前已确认风格家族的专业分镜方案，并沉淀剧本内容拆分、影视镜头语言、镜头级表演、调度、声音意图和必要的风格化扩展镜头时应使用此技能。
---

# scene-storyboard-director

负责把已确认 Story Beat、source intake 继承约束和表演导演结果转成可执行分镜，强调服从当前 `style_family` 的镜头语言，而不是复刻原片或源视频拍法。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

本技能执行四层能力链：

```text
story_beats / performance_sheet / source_intake_constraints
-> beat_skeleton / storyboard_content_breakdown
-> cinematic_language_plan / video_generation_units
-> shot_continuity_plan / continuity_control_system
-> shot_highlights / shotlist / storyboard_prompts
```

执行顺序：

1. 先把剧本、source intake 约束和表演压成 Beat Skeleton，明确每个 Beat 的功能、节奏、信息释放和建议镜头数。
2. 再把 Beat Skeleton 拆成可拍内容单元，并同步落专业影视镜头语言。
3. 再以 Beat Skeleton 和镜头语言为主驱动生成视频生成单元、镜头交接、锚帧和四线连续性控制。
4. 最后生成分镜、双版故事板主产物、可直接投喂生图模型的中文整板故事板总板 prompt、声音交接和视频 prompt 交接。

黑板记录分镜摘要、分段信息、方法论配置路径、故事板 prompt 路径、Hero Shot、Bridge Shot、视频生成单元摘要、source intake 镜头继承说明和连续性规则，完整分镜另行落盘。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-storyboard-director`
- 已完成剧本改编和表演导演，项目状态为 `performance_ready`
- 需要进入镜头级表达设计
- 需要把 source intake 的核心动作链、亮点、可替换项和禁止照搬项转成分镜约束
- 需要把角色动作、表情、场景调度、光影节奏和声音意图收成可用于后续提示词构建的分镜方案
- 需要把 `physical_comedy_performance`、`contrast_performance` 或 `injury_reaction_performance` 转成 setup / reveal / impact / hold / recovery 镜头
- 需要把现有分镜链条升级为视频生成友好的故事板控制链

如果剧本还没定稿、表演表缺失，或已经进入声音导演/提示词构建阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `performance_ready`，且总控路由的 `state.next_stage` 为 `scene-storyboard-director`。
2. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、剧本摘要、`scene-story-development` 已确认的 `story_beats`、表演表、设计摘要、参考边界、`creative_direction_context` 和必要的 Blocking/道具状态输入；若已存在 `asset_lock_v*.md`、`space_continuity_seed_v*.md`、`beat_table_v*.md`、`video_generation_unit_plan_v*.md`、`action_continuity_chains_v*.md`、`emotion_continuity_chains_v*.md`，优先读取对应摘要或目标章节，而不是重新从正文猜；若 `project_config.director_style_id` / `style_profile_path` 已存在，先读 `style_profiles/style_registry.md` 与当前 `style_profile_path`，再按需读取当前风格包；执行期读取边界同时遵循仓库根 `AGENTS.md`。
3. 如果项目已经确认导演风格包，优先读取：
   - `style_profiles/<director_style_id>/profile.md`
   - `style_profiles/<director_style_id>/camera_language.md`
   - `style_profiles/<director_style_id>/rhythm_language.md`
   - `style_profiles/<director_style_id>/lighting_language.md`
   只读取当前阶段必需文件，不得顺手读取整个风格包 7 个文件；若风格包字段缺失，或风格确认状态不满足正式确认/历史兼容条件，本阶段必须阻塞并返回风格确认，不得回退到 `style_profiles/pixar_like/` 继续分镜。
4. 如果存在 `source_intake.status: analyzed`，读取黑板中的 `source_intake.topic_gate_handoff_summary` 和 `source_intake.files.priority_map` 对应摘要；必要时读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
5. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有需要核对动作连续性或镜头因果时，才读取相关章节并说明原因。
6. 如果当前 `style_family` 属于 `3d_animation`、`2d_animation`，或当前风格包明确允许夸张风格化扩展的 `hybrid / motion_comic`，且当前分镜确实需要镜头化风格化动作物理、轻伤可见度或反差 reveal，可按需读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
7. 如果当前分镜需要专业镜头语言、动画电影镜头模式或动作喜剧分镜 pattern，可按需读取：
   - `assets/cinematic-language/shot-language-library.md`
   - `assets/cinematic-language/animation-film-shot-patterns.md`
   - `assets/cinematic-language/animation-comedy-action-patterns.md`
8. 如果项目已把 `assets/storyboard-methodology/*` 加入 `runtime_policy.context_policy.allowed_runtime_asset_paths`，按需读取：
   - `assets/storyboard-methodology/index.md`
   - `assets/storyboard-methodology/video-generation-unit-library.md`
   - `assets/storyboard-methodology/beat-structure-library.md`
   - `assets/storyboard-methodology/shot-type-library.md`
   - `assets/storyboard-methodology/rhythm-type-shot-combo-library.md`
   - `assets/storyboard-methodology/shot-density-reference.md`
   - `assets/storyboard-methodology/continuity-control-library.md`
   - `assets/storyboard-methodology/storyboard-dual-version-prompt-library.md`
   - `assets/storyboard-methodology/storyboard-quality-checklist.md`
9. 读取 `references/output-contract.md`，确认分镜字段、三层时间模型、视频生成单元字段、连续性控制字段、双版故事板字段、黑板摘要和长分镜落盘路径。
10. 先读取当前可用的 `segment_strategy`、`project_config.segment_duration_seconds`、`project_config.target_total_duration_seconds`；若为空，必须先向用户确认总时长、10 秒 / 15 秒 / 混合分段策略，不直接生成正式分镜。
11. 在正式落盘前，先输出“分镜方案预览”，至少包含镜头数量建议、`storyboard_prompt_pack_plan`（主交付将拆成几个故事板包、每个包覆盖哪些 `segments / shots / story_function`、为何单包或多包）、Beat Skeleton 样例、Segment Plan、Hero Shot、Bridge Shot、source intake 镜头继承计划、Blocking Map、关键道具状态变化、当前使用的 `director_style_id`（若发生回退则说明回退原因）、`storyboard_content_breakdown` 样例、`cinematic_language_plan` 样例、`video_generation_units` 样例、`shot_continuity_plan` 样例、开头/结尾锚帧策略、四线连续性策略、故事板是否需要拆成多个 prompt 包，以及需要用户确认的问题。
12. 若 `total_shots > 12`，预览中必须显式给出 `storyboard_prompt_pack_mode = multi_pack_recommended`，说明建议拆成几个故事板 prompt 包、每包覆盖哪些镜头，以及为什么不能继续使用单包总板。
13. 等待用户明确确认分镜方案；用户纠错或补充偏好不等于授权落盘。该确认只授权当前故事板阶段，不自动授权音频阶段或视频提示词阶段。
14. 用户确认后，先生成 `beat_skeleton`，为每个关键 Beat 写清 `beat_purpose`、`duration_range_seconds`、`action_progression`、`emotion_progression`、`information_release`、`space_change`、`continuity_from_previous_beat`、`continuity_to_next_beat` 和 `suggested_shot_count`。
15. 再生成 `storyboard_content_breakdown`，把每个关键 Story Beat 拆成 action / reaction / emotion_shift / reveal / transition / insert / environment_response / contrast_payoff / stylized_impact / injury_result 等可拍内容单元。
16. 同步生成 `cinematic_language_plan`，为每个关键内容单元选择景别、机位、构图、镜头运动、剪辑节奏和 `visual_motivation`。
17. 基于 Beat Skeleton 和镜头语言生成 `video_generation_units`，明确每个视频生成单元的 `unit_goal`、`rhythm_type`、`rhythm_intensity`、目标时长、入镜 / 出镜、镜头密度、转场钩子和连续性职责。
18. 为关键单元生成 `shot_continuity_plan`，写清 `previous_left`、`current_picks_up`、`entry_state`、`core_action`、`exit_state` 和 `next_handoff`，不要只给镜头摘要。
19. 为关键单元补齐 `opening_anchor_frame`、`closing_anchor_frame`、`space_continuity_map`、`action_continuity_chains`、`emotion_continuity_chains` 和 `continuity_control_system`。
20. 若使用资产库 pattern，必须写明 `selected_shot_pattern.pattern_id`、`source_asset`、`reason` 和“只使用抽象结构，不复制具体电影镜头”的说明。
21. 生成适合当前 `style_family` 的分镜，不直接照搬原版或源视频拍法。
22. 对每个镜头至少明确动作、表情、调度、情绪功能、导演意图、声音意图、镜头语言、时间轴位置和 `shot_continuity`。
23. 对动画物理镜头，必须镜头化 setup / impact / deformation / hold / recovery。
24. 对反差喜剧镜头，必须镜头化 setup / conceal / reveal / hold / continue。
25. 对轻中度卡通伤害镜头，必须明确 injury_visibility、喜剧化呈现方式和禁止的写实伤害边界。
26. 产出“每段覆盖哪些镜头和 Story Beat”的 Segment Plan，并分别落同源双版故事板主产物与控制版 / 风格版故事板生成 prompt 文件，同时产出可直接整份复制给 `gpt-image2` 的中文整板故事板总板 prompt。
27. 进入“中文整板故事板总板 prompt”模式后，默认单板最大承载量为 `12` 格；如果 `total_shots > 12`，必须拆成多个故事板 prompt 包，不把全部镜头硬塞进一张总板。
28. 如果 `total_shots > 20`，或 `target_total_duration_seconds > 90`，即使单镜头信息密度较低，也默认推荐进一步拆成多个故事板 prompt 包。
29. 拆分多个故事板 prompt 包时，优先按连续戏剧单元、场景块或段落块拆，而不是机械平均分镜头数。
30. 先对正式故事板主交付执行自动 review：检查 `storyboard_prompt_pack_plan` 是否存在、`total_shots > 12` 时是否正确进入多包模式、是否已生成控制版 / 风格版双版整板 Prompt 包、正式主交付是否仍退化成 `Seg / Shot / Prompt (EN/CN) / 连续性` 这类中间稿、`storyboard_quality_check` 是否覆盖镜头职责/动作交接/空间交接/连续性四线/双版一致性，以及 `files.primary` / `default_read` 是否仍可能误指向错误体裁文件。
31. 若自动 review 发现结构性问题，只允许自动补结构、补缺失区块、重排为正确主交付体裁；不得悄悄改动用户已确认的创作方向、总时长、Segment 策略或 pack 规划。若 auto-fix 后仍缺正式主交付必需元素，本阶段必须保持 `failed` 或 `pending_confirmation`，不得推进。
32. 通过 review 后，将完整分镜写入 `details/分镜清单_v*.md`，并把 `beat_skeleton`、`video_generation_units`、`shot_continuity_plan`、空间连续性图、动作/情绪连续性链、同源双版故事板主产物、故事板质量检查分别落到 `details/storyboard/` 或 `outputs/storyboard_prompts/`；`outputs/storyboard_prompts/` 下的主交付是中文整板故事板总板 prompt，要求整份可直接复制给 `gpt-image2` 使用；黑板只记录版本、索引、摘要和关键连续性规则。
33. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
34. 将状态推进建议交回总控 Skill，进入 `scene-audio-director`。

## source_intake 分镜继承规则

如果项目来自视频源输入，本阶段必须显式输出：

```yaml
source_intake_storyboard_use:
  source_intake_used: true
  files_read:
  core_action_chain_inherited:
  highlights_reframed_as_hero_shots:
  compressed_or_removed:
  replaced_visual_expression:
  avoid_copying_shots:
```

规则：

- `core_must_keep` 只继承为镜头功能、动作因果、情绪转折或调度目的。
- `highlight_should_keep` 可转译为新的 Hero Shot，但必须换新的镜头表达和视觉语境。
- `safe_to_replace` 应优先替换景别组合、构图、转场、人物站位、道具表层和场景表层。
- `avoid_copying` 必须进入 `avoid_copying_shots`，不得出现在故事板 prompt 或视频 prompt 交接中。
- 可以保留关键对白和经典台词，但不直接继承源视频的字幕版式、平台水印和镜头版式痕迹。
- 是否保留原始镜头顺序、机位组合、构图、剪辑节奏或高识别视觉表达，由当前项目创作目标决定；本阶段不默认限制保留强度，只在需要时规避字幕版式、平台水印、品牌元素和强识别人物绑定。
- 若必须保留动作链，应重构为适合当前 `style_family` 的镜头语言，而不是复刻源视频拍法。

## 关键规则

- 分镜必须先生成 `beat_skeleton`，再拆 `storyboard_content_breakdown`，再生成 `cinematic_language_plan`、`video_generation_units` 和 `shot_continuity_plan`；`shot_highlights` 只能作为这些主结构的可视化派生层。
- 故事板方法论资产只能通过 `runtime_policy.context_policy.allowed_runtime_asset_paths` 和 `stage_index.storyboard.files` 暴露，不得新增黑板顶层方法论大字段。
- 分镜数量应先服务剧情、表演、空间关系和节奏可读性，不能为了压缩故事板数量而强行减少镜头。
- 单个 5 秒片段可以包含 1 个或多个镜头，视具体剧本节奏而定；技术分段不是镜头上限。
- 每个关键镜头必须有 `visual_motivation`，说明为什么这样拍。
- 分镜字段至少覆盖镜头编号、所属 Beat、所属 content unit、起止时间、时长、景别、机位、构图、镜头运动、角色动作、表情变化、场景调度、光影变化、声音设计、情绪功能、导演意图、转场方式。
- 必须继承 `performance_sheet` 中的眼神、微表情、停顿、标志性动作和反应节奏。
- 必须继承表演阶段的 `physical_comedy_performance`、`contrast_performance` 和 `injury_reaction_performance`，并转化为镜头级字段。
- 必须继承 `source_intake` 的核心动作链和当前项目确认的保留 / 改写边界；是否保留原版镜头表达由项目目标决定，不由本阶段默认限制。
- 必须继承 `creative_direction_context`；`preserve_original` 模式下不得把原始剧情分镜重新发散成新题材。
- 若项目已确认 `director_style_id`，必须继承当前风格包中的 `camera_language`、`rhythm_language` 和 `lighting_language`；若发生默认回退，必须显式说明，而不是把 Pixar-like 原则伪装成全局默认原则。
- 使用 `assets/cinematic-language/*` 时，只能使用抽象模式，不得在运行时输出“模仿某部电影镜头”。
- 当项目目标是改写时，用适合当前 `style_family` 的表演、节奏、视角和情绪调度重构名场面；当项目目标是保留优先时，允许在此基础上尽量贴近原版镜头表达。
- `segment_duration_seconds` 表示单个视频生成片段时长，不表示整片时长。
- 一个 Segment 可以包含多个 Shot；一个 Story Beat 可以跨多个 content unit、Shot 或 Segment。
- 不允许把“每段 10 秒”误当成“每段只能有一个镜头”；若 5 秒或 10 秒内存在多个必要镜头，应正常拆开。
- 默认按 10 秒 Segment 进行技术分段；只有在镜头密度过高、动作和台词承载不下时，才在用户确认后改为 15 秒或混合分段。
- 当故事板主交付为“中文整板故事板总板 prompt”时，默认单板最大承载量为 `12` 格；`total_shots > 12` 时必须拆成多个 pack，以避免单板信息密度过高、控制轨道失真或画面可读性下降。
- 当 `total_shots > 20`，或 `target_total_duration_seconds > 90` 时，默认推荐进一步拆成更多故事板 prompt 包，以避免单个故事板包过粗、镜头设计失真。
- `video_generation_units` 是故事板运行时主驱动，`segments` 只是最终交付切片；不允许继续用 `segments` 反向主导 Beat、镜头和连续性设计。
- `shot_continuity_plan` 必须显式写清每个关键镜头如何承接上一镜头、如何把动作 / 情绪 / 空间交给下一镜头，不能只写“镜头摘要”。
- 必须输出开头/结尾锚帧、空间连续性图、动作连续性链和情绪连续性链，降低后续视频模型跨段漂移。
- 必须输出 `continuity_control_system`，显式覆盖 rhythm / action / emotion / space 四条连续性控制线。
- 必须产出同源双版故事板主产物：控制版负责视频生成控制链，风格版负责风格层表达；两者都不能退化成“只有 prompt 文件”。
- 故事板 prompt 由本阶段产出，供用户在外部平台生成故事板图；本阶段不得声称已生成故事板图片。
- `storyboard_prompt_files` 的主交付不是旧式平台 prompt 清单，而是中文整板故事板总板 prompt：整份文档应可直接复制给 `gpt-image2`，同时包含分镜画面要求与控制轨道要求。
- `storyboard_prompt_files` 的正式交付结构必须与既有成功样板同构：至少包含“复制专用主 Prompt”“控制版故事板（Control-Oriented Storyboard Board）”“风格版故事板（Style & Rendering Storyboard Board）”三个层次；多包时每个 pack 都必须保持这套双版整板结构，不能某个 pack 退化成另一种文体。
- `Seg1 / Shot 01 / Prompt (EN) / Prompt (CN) / 连续性` 这类逐镜头说明稿，只能作为 `shotlist`、`storyboard_content_breakdown`、内部导演稿或附录存在；它们不是 `storyboard_prompt_files` 主交付，也不能替代控制版 / 风格版整板 prompt。
- 控制版 / 风格版故事板生成 prompt 必须同源，只允许风格层表达不同，不允许叙事结构和镜头职责漂移。
- 故事板总板默认继承项目设计阶段已经确认的正式视觉风格；除非用户明确要求草稿 / 线稿 / 灰模风格，否则不得默认降级为草稿式故事板。
- 故事板总板的控制面默认使用中文，至少覆盖节拍线、镜头路径、动作路径、节奏轨、升级曲线、状态轨、风格轨；若上游剧本或分镜明确存在对白设计，还应加入中文对白轨。
- 故事板总板的版式必须优先保证镜头画面区可读：默认采用 `3 x 4` 的 12 格镜头区时，镜头画面区应占整板约 `70% ~ 80%` 的纵向空间，底部控制轨道区只占约 `20% ~ 30%`，不得让控制面反向压缩镜头画面可读性。
- 正式故事板主交付必须先通过自动 review，再允许写成 `completed`；缺 `storyboard_prompt_pack_plan`、缺多包主交付、缺双版整板 Prompt 包、或仍退化成逐镜头中间稿时，必须视为失败。
- 必须显式标记 `hero_shot` / `hero_moment`，说明该镜头为什么是看点、服务哪个情绪或反转。
- 必须显式设计 `bridge_shot` / 桥接分镜，用于解决 Segment 之间的动作、视线、声音和空间衔接。
- 动画物理镜头必须包含可看清的停顿，不要把所有动作压成一团快节奏。
- 反差喜剧镜头要让观众看清 setup 和 reveal，不要用过多 VFX 遮住反差本身。
- 轻中度卡通伤害可以可见，但不得表现大量流血、写实伤口、身体恐怖或持续痛苦。
- 多角色项目必须继承或补充 `blocking_map`、`faction_layout` 和 `forbidden_zone`，降低角色站位漂移概率。
- 关键道具必须继承 `prop_state_machines`，在分镜中写清状态变化和可见证据。
- 必须产出故事板质量检查文件，显式检查镜头职责、动作交接、空间交接、连续性四线和双版故事板一致性。
- 必须诚实说明 Blocking、镜头语言和连续性约束只能降低抽卡成本，不能保证视频模型一次生成完全稳定。

## 参考资料

- `references/output-contract.md`：分镜字段、三层时间模型、表现力扩展镜头字段、内容拆分与镜头语言字段和落盘约定
- `.agents/skills/scene-performance-director/references/output-contract.md`：表演导演输出协议
