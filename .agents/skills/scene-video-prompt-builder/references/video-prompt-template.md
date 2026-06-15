# 视频提示词 Pack 模板

`outputs/video_prompts/视频提示词_第XX包_中文_v*.md` 与英文版必须使用 pack-aligned director prompt 体裁。

## 必须使用的章节

```markdown
# 视频提示词 第XX包

## video_prompt_pack_plan

## pack_audio_execution_plan

## global_execution_preamble

## project_level_global_rules

## Segment 01

### segment_technical_control_block

技术控制块必须保留 `segment_technical_control_block` 标记，但正文写成自然语言控制说明，不写 YAML、参数表或 key-value 清单。

必须用连续段落说明：

- 本段承接的 VGU、continuity_in、continuity_out。
- 本段人物站位、移动方向、轴线、screen side lock。
- 本段核心道具开头状态、段内变化、结尾状态。
- 本段与上一段、下一段的动作、视线、声音或道具 handoff。

### segment_sound_execution

#### BGM

#### Foley-SFX

#### Ambience

#### Silence

### shot_by_shot_director_prompt

### prompt_trace

### 可直接复制使用块

每个 Segment 必须提供完整可复制块，按以下中文段名组织：

```markdown
【故事板关键帧参考规则】
将"控制故事板 Pack XX"作为本段视频生成的顺序动作、镜头调度、空间关系和连续性主参考；将"风格故事板 Pack XX"作为角色渲染、场景质感、灯光影调、情绪氛围和最终画面质量辅助参考。严格依据控制故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作，遵循预备动作→发力→反应→收势的完整弧线。不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

【项目级全局锁定规则】
- 主场景：
- 角色锁定：
- 不重复角色：
- 画面可读性：
- 风格锁定：
- 灯光锁定：
- 负向边界：

【Segment X 技术控制说明】
用自然语言说明本段 VGU、continuity_in/out、站位、轴线、道具状态、blocking 执行和 next_handoff。不得写成 YAML 或参数表。

【Segment X 导演长版提示词】
按镜头顺序写成可直接投喂的视频生成提示词。必须包含 Segment 总时间轴和逐镜头时间码，例如 `Segment 总时间轴：00:00-00:10`、`C01 [00:00-00:02]`。时间码必须与 storyboard 的 shot_continuity / VGU / pack 规划一致。每个时间段必须覆盖镜头语言、画面构图、角色表演、情绪递进、动作弧线、空间关系、道具状态、情绪氛围、美术质感、灯光影调、声音承接和负向边界。声音承接必须继承 audio 阶段已确认的 BGM、Foley-SFX、Ambience、Silence 与跨段声音钩子。
```

## video_prompt_review
```

## 禁止形态

不要把正式 pack 写成以下说明稿：

```text
全局一致性锚点
每段参数表
编译 Prompt
YAML 技术控制块
只有镜头编号和短句的导演摘要
```

这类内容只能作为中间层导演稿或 review 草稿，不能替代正式 pack-aligned director prompt。
