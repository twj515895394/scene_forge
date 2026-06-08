---
name: scene-script-adapter
description: 当用户要把 SceneForge 选中的经典片段、热点桥段或 source_intake 视频源解析结果改编成适合当前已确认风格家族表达的剧本版本，并按改编档位控制保留与重写强度，同时产出 Story Beat 供表演导演和分镜阶段消费时应使用此技能。
---

# scene-script-adapter

负责把参考边界、轻量故事骨架、视频源优先级分层、用户选择的改写方向或原始剧情方向，以及设计结果整合成可拍、可表演、可分镜的正式剧本版本。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

本阶段不再负责前置故事发散；它以已确认的 `story_beats` 为骨架，输出正式剧本、节拍细化和下游 handoff。

完整剧本正文继续落盘，黑板只记录摘要、档位、演绎风格、Story Beat、表现力扩展机会点、source intake 继承说明和路径引用。

## 改写方向选择规则

如果项目来自 `scene-video-intake`，且黑板存在：

```yaml
source_intake:
  adaptation_ideas_summary:
    user_selection_required: true
  adaptation_selection:
    status: pending | selected | bypassed
```

且当前创作方向摘要要求 `rewrite_adaptation`，则本阶段必须先检查 `adaptation_selection`。

### 用户未选择

如果：

```yaml
adaptation_selection:
  status: pending
```

本阶段不得生成正式剧本、剧本方案预览、Story Beat 或分镜提示。

必须输出阻塞补丁：

```yaml
summary: 等待用户选择改写方向，暂不生成正式剧本。
board_updates:
  state:
    project_status: story_developed
    next_stage: scene-script-adapter
    lifecycle_flag: blocked
  cross_stage_summary:
    adaptation_selection_block:
      waiting_for_adaptation_selection: true
      reason: adaptation idea not selected
next_action:
  next_stage: scene-script-adapter
  requires_user_confirmation: true
```

### 用户已选择

如果：

```yaml
adaptation_selection:
  status: selected
  selected_idea_id:
  selected_title:
  selection_note:
```

本阶段必须把 `selected_idea_id` / `selected_title` 作为正式改写方向。

后续剧本、Story Beat、角色关系、场景迁移、道具替换和表现风格都必须围绕该方向展开。

不得重新发散题材，不得把用户选择的方向替换成其他方向。

### 使用原始剧本

如果顶层：

```yaml
script_strategy:
  mode: preserve_original
```

则本阶段不做题材改写，只做原始剧本标准化：

- 把原始剧情/原桥段整理为可供下游消费的 `script_summary`、`story_beats`、`preserved_elements` 和边界说明。
- 允许记录节奏压缩、去害化、镜头化整理，但不得重写成新的题材方向。
- 视频源项目可读取 `source_intake` 作为结构辅助，但 `adaptation_selection.status = bypassed` 时不得阻塞。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-script-adapter`
- 已完成故事骨架、角色与场景设定，需要把片段改编成适合当前已确认风格家族的正式剧本
- 需要按改编档位决定保留原表达的比例和重写强度
- 需要把 `source_intake` 的核心保留点、亮点、可压缩项、可替换项、用户选择的 adaptation idea 和禁止照搬项转成剧本边界
- 需要在进入表演导演和分镜之前，先明确故事节拍、情绪节奏和关键表演提示
- 若当前 `style_family` 适合启用表现力扩展策略，需要识别项目级 `expressive_animation` 的机会点：风格化动作转译、轻中度卡通伤害、反差喜剧桥段；非动画家族默认不开启整套动画扩展

如果角色与场景设定还没完成，或已经进入表演/分镜阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `design_ready`，且总控路由的 `state.next_stage` 为 `scene-script-adapter`。
2. 读取当前创作方向摘要和 `creative_direction_context`。
3. 如果 `script_strategy.mode = rewrite_adaptation` 且存在 `source_intake.status: analyzed` 且 `source_intake.adaptation_ideas_summary.user_selection_required: true`，先检查 `source_intake.adaptation_selection.status`。
4. 如果 `script_strategy.mode = rewrite_adaptation` 且 `adaptation_selection.status != selected`，输出阻塞补丁并等待用户选择，不得继续生成正式剧本。
5. 如果 `script_strategy.mode = rewrite_adaptation` 且 `adaptation_selection.status: selected`，记录并继承 `selected_idea_id`、`selected_title` 和 `selection_note`。
6. 如果 `script_strategy.mode = preserve_original`，记录 `creative_direction_context.selected_adaptation.status = bypassed | not_applicable`，不要求改写方向选择。
7. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、`scene-reference-decider` 的边界约束、`scene-story-development` 的故事骨架和 `scene-design-builder` 的设定摘要；执行期读取边界同时遵循仓库根 `AGENTS.md`。
8. 如果存在 `source_intake.status: analyzed`，读取黑板中的 `source_intake.topic_gate_handoff_summary`、`adaptation_ideas_summary`、`adaptation_selection`，并按需读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
   - `inputs/source_intake/adaptation_ideas_v1.md` 中被选中 idea 的相关条目（仅 `rewrite_adaptation` 模式）
9. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有剧本动作链无法判断时，才读取相关章节并说明原因。
10. 如果上游设计或故事摘要已启用项目级表现力扩展策略，且当前 `style_family` 属于 `3d_animation`、`2d_animation`，或属于明确允许风格化夸张动作的 `hybrid / motion_comic`，再按需识别风格化动作、轻中度卡通伤害或反差喜剧机会点，并读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
11. 先检查确认记录中的时长/分段确认状态，以及当前阶段可读的 `segment_strategy`。如果整片目标时长、单段视频生成时长或分段策略未确认，先输出时长/分段候选方案，不生成正式剧本。
12. 先检查 `confirmations.style_family_confirmed.status`、`confirmations.style_confirmed.status`、`project_config.style_family` 与 `project_config.director_style_id`。若风格家族或导演风格包尚未在上游确认，且不满足“历史项目已具备完整风格字段”的兼容条件，本阶段必须阻塞并返回风格确认，不得临时默认 `pixar_like` 继续写剧本。
13. 在剧本正式落盘前，先输出“剧本方案预览”，至少包含 `script_strategy`、`creative_direction_context`、改编档位候选、用户选择的 adaptation idea 或原始剧情保留说明、演绎风格候选（Performance Style Candidates）、当前已确认导演风格包（Director Style Package）、风格大类（Style Family）、目标总时长、已确认 Story Beat 的继承方式、source intake 继承计划、保留点、重写点、禁止照搬点、表现力扩展机会点和风险边界。
14. 所有面向用户的确认信息默认使用“中文描述（English Term）”格式，避免只出现协议英文值。
15. 等待用户明确确认剧本方案；用户纠错或补充偏好不等于授权落盘。
16. 用户确认后，选择本次改编档位，并在继承已确认导演风格包的前提下最终确认 `performance_style`。
17. 若用户明确要求改风格，本阶段可以提出新的导演风格包候选，但只有在用户再次确认后，才允许覆盖黑板中的正式风格字段。
18. 输出适合后续表演导演和分镜使用的剧本摘要、Story Beat、场次拆分建议、表现力扩展机会点和改编说明。
19. 同步产出 `details/script/beat_table_v*.md` 和 `details/script/video_generation_unit_plan_v*.md`，把标准化 Beat 摘要、视频生成单元初步规划、动作连续性焦点和情绪连续性焦点先写出来。
20. 将完整剧本正文写入 `details/script_v*.md`；黑板只记录摘要、档位、演绎风格、导演风格包、Story Beat、关键镜头提示、source intake 继承说明、表现力扩展机会点和路径引用。
21. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
22. 将状态推进建议交回总控 Skill，进入 `scene-performance-director`。

## source_intake 剧本继承规则

如果项目来自视频源输入，本阶段必须显式输出：

```yaml
source_intake_script_use:
  source_intake_used: true
  files_read:
  selected_adaptation_idea:
    selected_idea_id:
    selected_title:
    selection_note:
  core_must_keep_as_story_function:
  highlights_to_adapt:
  optional_to_compress:
  safe_to_replace:
  avoid_copying:
```

规则：

- `rewrite_adaptation` 模式下，`selected_adaptation_idea` 是当前改写方向的最高优先级约束。
- `preserve_original` 模式下，`selected_adaptation_idea` 可为空，改由原始剧情/桥段保留说明驱动。
- `core_must_keep` 只继承为叙事功能、冲突结构、动作链或情绪转折。
- `highlight_should_keep` 可改写为新的风格化/电影化 hero moment。
- `pass_or_compress` 不应占用主要 Story Beat。
- `safe_to_replace` 应优先替换人物身份、场景表层、道具表层和具体镜头表达；台词是否保留由当前项目创作目标和经典性决定，不默认要求改写。
- `avoid_copying` 必须进入剧本风险边界，不得被后续阶段复活。
- 允许保留或改写原版经典台词；默认不要求为了“去重”而强行改写有效对白。
- 仍应避免直接继承源视频的字幕版式、平台水印、品牌元素、强识别人物身份绑定和无必要的整段逐字转录。
- 不得把用户已选 adaptation idea 改写成其他题材方向。

## 关键规则

- 只执行当前 `state.next_stage`，不得跳过设计阶段或直接进入分镜/视频提示词阶段。
- 如果 `script_strategy.mode = rewrite_adaptation` 且 source_intake 要求用户选择改写方向，则用户未选择前必须阻塞。
- 用户已选择改写方向后，本阶段必须继承该方向，不得重新发散题材。
- 如果 `script_strategy.mode = preserve_original`，本阶段不得要求选择 adaptation idea，也不得把原始剧情改写成新题材。
- 本阶段必须先确认整片目标时长、单段视频生成时长和分段策略，再定 Story Beat 密度。
- 本阶段的剧本转译必须服从已确认的 `style_family`；不得默认把题材先翻译成动画电影表达。
- 本阶段默认继承上游已确认的导演风格包，不得把自己当作第一版正式风格确认点。
- 若用户明确要求在剧本阶段改风格，必须显式重新确认后，才允许覆盖 `director_style_id`、`director_style_version`、`style_family` 和 `style_profile_path`。
- 是否保留原台词、原镜头表达和高识别内容，由当前项目创作目标与改编档位决定；本阶段不默认限制保留强度。
- 根据改编档位决定保留比例。
- 增强动作可视化、表情变化、环境反应和情绪节拍。
- 如果启用 `expressive_animation`，必须先说明它为何适用于当前 `style_family`，再识别哪些 Story Beat 适合风格化动作物理、轻中度卡通伤害、反差喜剧或组合表达；但不得每个 Beat 都硬塞特效或反差。
- 对 `live_action_cinematic` 家族，默认不启用动画物理和卡通伤害，只允许在用户明确要求或当前风格包显式支持时启用轻量反差喜剧提示。
- 对 `motion_comic` 与 `hybrid` 家族，只允许启用与当前风格包一致的局部扩展，不得自动套用整套动画动作喜剧语言。
- 高风险动作若启用 `expressive_animation`，应优先考虑风格化动作转译，而不是写实暴力复刻。
- 轻中度卡通伤害可以作为动作喜剧结果，但必须避免大量流血、写实伤口、身体恐怖和持续痛苦。
- 反差喜剧必须服务人物、故事、情绪转折或视觉 payoff；不得把随机梗堆进剧本。
- `story_beats` 必须与 `scene-story-development` 已确认的故事骨架一致，只允许做剧本级细化，不允许重开前置故事方向会。
- Story Beat 不是 Segment；不得用 10 秒技术分段直接替代叙事节拍。
- 剧本阶段应先给出 `beat_table_v*.md` 和 `video_generation_unit_plan_v*.md` 的初步结构，后续表演与分镜阶段在此基础上细化，而不是从零发明控制单元。
- 必须把潜在 Hero Moment 作为 `storyboard_hints.shot_priority_note` 的输入，供分镜阶段明确标记。
- 完整剧本落盘，黑板只保留可供后续阶段消费的摘要信息。
- 本阶段完成后不直接进入分镜，而是先进入 `scene-performance-director`。

## 参考资料

- `references/output-contract.md`：改编档位、Story Beat 结构、表现力扩展机会点、黑板摘要字段和长正文落盘方式
