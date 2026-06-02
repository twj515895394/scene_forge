---
name: scene-script-adapter
description: 当用户要把 SceneForge 选中的经典片段、热点桥段或 source_intake 视频源解析结果改编成适合 3D 动画电影表达的剧本版本，并按改编档位控制保留与重写强度，同时产出 Story Beat 供表演导演和分镜阶段消费时应使用此技能。
---

# scene-script-adapter

负责把参考边界、视频源优先级分层、用户选择的改写方向和设计结果转化为可拍、可表演、可分镜的剧本版本。

本阶段不只输出剧情摘要，还必须产出更清晰的 `story_beats`，作为后续 `scene-performance-director` 和 `scene-storyboard-director` 的共同输入。

完整剧本正文继续落盘，黑板只记录摘要、档位、演绎风格、Story Beat、v4 表现力机会点、source intake 继承说明和路径引用。

## v6.1 adaptation selection 规则

如果项目来自 `scene-video-intake`，且黑板存在：

```yaml
source_intake:
  adaptation_ideas_summary:
    user_selection_required: true
  adaptation_selection:
    status: pending | selected
```

则本阶段必须先检查 `adaptation_selection`。

### 用户未选择

如果：

```yaml
adaptation_selection:
  status: pending
```

本阶段不得生成正式剧本、剧本方案预览、Story Beat 或分镜提示。

必须输出阻塞补丁：

```yaml
status: blocked
summary: 等待用户选择改写方向，暂不生成正式剧本。
data:
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

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-script-adapter`
- 已完成角色与场景设定，需要把片段改编成动画电影化表达的剧本
- 需要按改编档位决定保留原表达的比例和重写强度
- 需要把 `source_intake` 的核心保留点、亮点、可压缩项、可替换项、用户选择的 adaptation idea 和禁止照搬项转成剧本边界
- 需要在进入表演导演和分镜之前，先明确故事节拍、情绪节奏和关键表演提示
- 需要识别 v4 `expressive_animation` 机会点：动画化动作转译、轻中度卡通伤害、反差喜剧桥段

如果角色与场景设定还没完成，或已经进入表演/分镜阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `design_ready`，且总控路由的 `next_stage` 为 `scene-script-adapter`。
2. 如果存在 `source_intake.status: analyzed` 且 `source_intake.adaptation_ideas_summary.user_selection_required: true`，先检查 `source_intake.adaptation_selection.status`。
3. 如果 `adaptation_selection.status != selected`，输出阻塞补丁并等待用户选择，不得继续生成正式剧本。
4. 如果 `adaptation_selection.status: selected`，记录并继承 `selected_idea_id`、`selected_title` 和 `selection_note`。
5. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、`scene-reference-decider` 的边界约束和 `scene-design-builder` 的设定摘要。
6. 如果存在 `source_intake.status: analyzed`，读取黑板中的 `source_intake.topic_gate_handoff_summary`、`adaptation_ideas_summary`、`adaptation_selection`，并按需读取：
   - `inputs/source_intake/source_video_priority_map_v1.md`
   - `inputs/source_intake/topic_gate_handoff_v1.md`
   - `inputs/source_intake/adaptation_ideas_v1.md` 中被选中 idea 的相关条目
7. 不默认读取 `source_video_analysis_v1.md` 或 `source_video_timeline_v1.md` 全文；只有剧本动作链无法判断时，才读取相关章节并说明原因。
8. 如果顶层 `expressive_animation.enabled` 为 `true`，且当前剧本需要识别动画化动作、轻中度卡通伤害或反差喜剧机会点，可按需读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
9. 先检查 `user_confirmations.duration_strategy_confirmed` 和 `segment_strategy`。如果整片目标时长、单段视频生成时长或分段策略未确认，先输出时长/分段候选方案，不生成正式剧本。
10. 在剧本正式落盘前，先输出“剧本方案预览”，至少包含改编档位候选、用户选择的 adaptation idea、演绎风格候选、目标总时长、Story Beat 草案、source intake 继承计划、保留点、重写点、禁止照搬点、v4 表现力机会点和风险边界。
11. 等待用户明确确认剧本方案；用户纠错或补充偏好不等于授权落盘。
12. 用户确认后，选择本次改编档位，并结合选题阶段建议最终确认 `performance_style`。
13. 输出适合后续表演导演和分镜使用的剧本摘要、Story Beat、场次拆分建议、v4 表现力机会点和改编说明。
14. 将完整剧本正文写入 `details/script_v*.md`；黑板只记录摘要、档位、演绎风格、Story Beat、关键镜头提示、source intake 继承说明、v4 表现力机会点和路径引用。
15. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
16. 将状态推进建议交回总控 Skill，进入 `scene-performance-director`。

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

- `selected_adaptation_idea` 是 v6.1 改写方向的最高优先级约束。
- `core_must_keep` 只继承为叙事功能、冲突结构、动作链或情绪转折。
- `highlight_should_keep` 可改写为新的动画电影化 hero moment。
- `pass_or_compress` 不应占用主要 Story Beat。
- `safe_to_replace` 应优先替换人物身份、场景表层、道具表层、台词表述和具体镜头表达。
- `avoid_copying` 必须进入剧本风险边界，不得被后续阶段复活。
- 不照搬源视频原台词、原镜头组合、强识别人物身份、平台水印、品牌或受保护表达。
- 不得把用户已选 adaptation idea 改写成其他题材方向。

## 关键规则

- 只执行当前 `next_stage`，不得跳过设计阶段或直接进入分镜/视频提示词阶段。
- 如果 source_intake 要求用户选择改写方向，则用户未选择前必须阻塞。
- 用户已选择改写方向后，本阶段必须继承该方向，不得重新发散题材。
- 本阶段必须先确认整片目标时长、单段视频生成时长和分段策略，再定 Story Beat 密度。
- 保留情绪核，但不得复刻具体受保护表达。
- 根据改编档位决定保留比例。
- 增强动作可视化、表情变化、环境反应和情绪节拍。
- 如果启用 `expressive_animation`，必须识别哪些 Story Beat 适合动画物理、轻中度卡通伤害、反差喜剧或组合表达；但不得每个 Beat 都硬塞特效或反差。
- 高风险动作应优先考虑动画动作喜剧转译，而不是写实暴力复刻。
- 轻中度卡通伤害可以作为动作喜剧结果，但必须避免大量流血、写实伤口、身体恐怖和持续痛苦。
- 反差喜剧必须服务人物、故事、情绪转折或视觉 payoff；不得把随机梗堆进剧本。
- `story_beats` 必须表达叙事功能、情绪目标、视觉焦点、表演提示和节奏提示。
- Story Beat 不是 Segment；不得用 10 秒技术分段直接替代叙事节拍。
- 必须把潜在 Hero Moment 作为 `storyboard_hints.shot_priority_note` 的输入，供分镜阶段明确标记。
- 完整剧本落盘，黑板只保留可供后续阶段消费的摘要信息。
- 本阶段完成后不直接进入分镜，而是先进入 `scene-performance-director`。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：改编档位、Story Beat 结构、v4 表现力机会点、黑板摘要字段和长正文落盘方式
