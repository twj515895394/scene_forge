---
name: storyboard-director
description: 当用户要把正式剧本、角色表演、视觉设定和连续性约束转换为可执行的镜头设计、Shot/Segment 时间线、运镜、构图、Blocking、首尾状态以及可直接用于外部图像模型生成故事板或关键帧的提示词时使用。只输出一个权威 Markdown 文档，不实际生成故事板图片或视频。
---

# Storyboard Director

SceneForge 文本创作主链第 04 阶段。

本 Skill 解决一个核心问题：**摄像机应该怎样看见这个故事。**

这是从“剧本语义”进入“视觉时间轴”的关键转换层，因此保持为独立 Stage。

它吸收旧版 `scene-storyboard-director` 的有效能力：Beat Skeleton、镜头语言、Video Generation Unit、Shot Continuity、Blocking、Hero Shot、Bridge Shot、故事板 Prompt 和质量检查，但统一到单一阶段文档。

执行期通用约束遵循仓库根 `AGENTS.md`。本 Skill 只输出文本型分镜设计和图片生成提示词，不声称已经生成故事板图、关键帧或视频。

## 1. 何时使用

以下情况使用本 Skill：

- 已有 `03_SCRIPT_DIRECTION.md`，需要正式镜头化。
- 用户已有完整剧本，希望直接拆分成专业分镜。
- 用户需要 Storyboard Shot List、镜头设计、关键帧 Prompt 或故事板图片 Prompt。
- 用户需要为后续视频生成确定 Segment、首帧/尾帧状态和镜头连续性。
- 用户要检查已有分镜是否符合剧本、表演和空间连续性。

## 2. 输入

默认主输入：

```text
01_CREATIVE_STORY.md
02_PRODUCTION_DESIGN.md
03_SCRIPT_DIRECTION.md
```

执行时优先把 `03_SCRIPT_DIRECTION.md` 作为主时间线；Stage 01/02 只用于核对 Canon 和视觉连续性。

可选输入：

- 用户已有 Shot List；
- 用户指定镜头数量；
- 用户指定景别、镜头语言或导演风格；
- 目标画幅；
- 目标总时长；
- 单段视频生成时长；
- 用户指定 Storyboard 图风格；
- 外部角色/场景参考图的文字资产引用；
- 用户指定图像模型及 Prompt 偏好。

## 3. 输入读取边界

默认只读取：

1. `03_SCRIPT_DIRECTION.md`；
2. `02_PRODUCTION_DESIGN.md` 中与当前 Scene/角色/空间/道具有关的章节；
3. `01_CREATIVE_STORY.md` 中 Story Beats 与不可变故事事实；
4. 当前用户补充；
5. 当前已确认风格中与 camera / rhythm / lighting 直接相关的最小资料；
6. 本 Skill 的 `references/output-contract.md` 与 `references/review-checklist.md`。

不要默认读取 Stage 02 中所有图片 Prompt；只有生成当前 Storyboard Prompt 时才读取相关实体定义。

不得扫描其他项目的分镜做默认模仿。

## 4. 单一输出原则

本阶段只能产出 **一个权威阶段文档**：

```text
04_STORYBOARD.md
```

禁止把以下内容拆成额外正式文档：

- beat skeleton；
- shot list；
- VGU plan；
- shot continuity plan；
- hero/bridge shot list；
- storyboard image prompt pack；
- design reconciliation review；
- storyboard quality check。

全部作为 `04_STORYBOARD.md` 内部章节存在。

详细格式见 `references/output-contract.md`。

## 5. 核心职责

### 5.1 建立 Beat / Scene / Shot 可追溯链

所有 Shot 必须能够追溯到：

```text
BEAT_###
→ SCN_###
→ SHOT_###
```

使用稳定 ID：

```text
SHOT_001
SHOT_002
...
```

如果一个视频生成段包含多个 Shot，再建立：

```text
SEG_001
SEG_002
...
```

禁止为了镜头效果添加与剧本无关的新剧情。

### 5.2 先做 Storyboard Content Breakdown

在具体镜头前，先判断每个 Scene：

- 哪个信息必须让观众看见；
- 哪个表情必须看清；
- 哪个动作必须完整呈现；
- 哪些台词可以用反应镜头承接；
- 哪些地方需要建立空间；
- 哪些地方应该减少切镜；
- 哪个 moment 是 Hero Moment；
- 哪个动作需要 Bridge Shot。

镜头数量由叙事需要决定，不要机械地“一句台词一个镜头”。

### 5.3 设计 Cinematic Language

每个 Shot 至少明确：

- shot size；
- camera angle；
- camera position；
- composition；
- focal-length feel；
- camera movement；
- subject movement；
- Blocking；
- foreground / midground / background 关系；
- lighting intention；
- emotional purpose；
- estimated duration。

使用“焦段感觉”即可，不要求虚构真实摄影机参数。

### 5.4 继承表演

Storyboard Director 不重新发明角色表演，而是把 Stage 03 的表演转成镜头可见信息。

必须保留：

- gaze；
- micro-expression；
- body center；
- gesture；
- pause/hold；
- reaction timing；
- action continuity；
- emotion continuity。

镜头必须保证关键表演真的能被看见。

例如剧本要求“嘴角轻微抽动”，但 Shot 使用超远景看不见，则需要改变镜头或说明该表演不作为该 Shot 的信息目标。

### 5.5 继承空间与道具连续性

必须遵循 Stage 02 的 spatial lock 和 Stage 03 的 blocking / prop state timeline。

每个关键 Shot 应明确：

- 人物在空间中的位置；
- 朝向；
- 进入/离开方向；
- 手中道具；
- 道具位置；
- 上一个 Shot 的 continuity in；
- 当前 Shot 的 continuity out。

注意轴线、视线方向和运动方向连续性；如果故意跳轴，必须有明确叙事目的。

### 5.6 Hero Shot / Bridge Shot

#### Hero Shot

用于承载：

- 情绪高潮；
- 标志性构图；
- 关键视觉记忆点；
- 核心 reveal；
- 重要角色状态。

Hero Shot 不是“画面最漂亮”就够了，必须服务剧情。

#### Bridge Shot

用于解决：

- 动作跨段衔接；
- 空间跳跃；
- 视线连续；
- 道具状态迁移；
- 视频生成 Segment 之间难以直接衔接的问题。

Bridge Shot 可以是短插入、动作中间态、环境过渡或反应镜头。

### 5.7 Video Generation Units / Segments

本阶段需要为 Stage 05 建立视频生成结构，但不写最终视频 Prompt。

每个 `SEG_###` 至少明确：

- 包含哪些 `SHOT_###`；
- 对应 `BEAT_### / SCN_###`；
- 预计时长；
- Segment 起始画面状态；
- Segment 结束画面状态；
- primary action；
- primary performance；
- camera behavior；
- continuity in/out；
- 推荐使用首帧、尾帧还是普通参考图的文本需求；
- 是否需要 Bridge Shot。

不要在本阶段绑定具体视频模型。

### 5.8 Storyboard 图片 Prompt

每个需要生成故事板图或关键帧的 Shot 都应提供可直接使用的图片 Prompt。

Prompt 必须由以下内容编译：

```text
Shot Intent
+ Character Locks
+ Scene Locks
+ Prop State
+ Blocking
+ Performance Moment
+ Composition
+ Camera Angle
+ Lighting
+ Visual Style
+ Continuity Constraints
```

必须明确当前故事板图的目标：

- `control_storyboard`：优先保证构图、人物数量、位置、动作和空间关系；
- `styled_storyboard`：在控制正确基础上加强最终视觉风格；
- `keyframe`：更接近最终视频参考帧。

不需要为每个 Shot 同时生成三套 Prompt；根据用途选择。

### 5.9 首帧 / 尾帧状态

对计划用于视频生成的 Segment，必须给出文字化的：

- `start_state`；
- `end_state`。

必要时提供：

- `start_frame_prompt`；
- `end_frame_prompt`。

这些 Prompt 仍然属于 `04_STORYBOARD.md`，不拆文件。

### 5.10 Shot Continuity

至少检查：

- screen direction；
- eyeline；
- character position；
- costume state；
- prop state；
- action phase；
- emotion phase；
- lighting/time progression；
- camera continuity；
- scene geography。

## 6. 镜头节奏原则

镜头时长和切换频率必须服务故事。

一般原则：

- 信息建立需要足够时间；
- 微表情需要观众能看见；
- 喜剧 pause 不要被切碎；
- 动作冲击前后需要 anticipation / reaction；
- 关键 reveal 前避免过早泄露信息；
- 情绪高潮允许更长 Hold；
- 不要为了“电影感”无意义增加大量镜头。

## 7. 执行流程

```text
读取剧本与 Continuity Locks
→ Scene Content Breakdown
→ Beat / Scene / Shot 映射
→ Cinematic Language Plan
→ Shot List
→ Blocking / Performance 可视化
→ Hero / Bridge Shot
→ Segment / VGU Plan
→ Shot Continuity
→ Storyboard / Keyframe Prompts
→ Start / End State
→ 内部 review
→ 输出 04_STORYBOARD.md
```

## 8. 内部 Review

正式输出前按 `references/review-checklist.md` 自检。

允许自动修正：

- Shot ID/Segment ID；
- Scene/Beat trace 缺失；
- 角色站位冲突；
- 视线/运动方向冲突；
- 道具状态错误；
- Prompt 缺少关键角色/场景锁；
- 镜头无法看清剧本要求的表演；
- Segment 首尾状态不连续；
- 镜头时长总和明显不合理。

不得在 review 中改写剧本剧情。

## 9. 下游交接

`04_STORYBOARD.md` 必须让 Stage 05 `video-prompt-director` 可以直接生成视频提示词。

Downstream Handoff 至少包含：

- `SHOT_###` 列表；
- `SEG_###` 列表；
- Shot → Segment 映射；
- Segment 时长；
- continuity in/out；
- start/end state；
- primary character/action/performance；
- camera behavior；
- relevant character/scene/prop IDs；
- Storyboard/Keyframe Prompt IDs；
- 哪些 Segment 需要首帧/尾帧参考；
- 哪些设计不得在视频 Prompt 中改变。

## 10. 完成定义

只有同时满足以下条件才算完成：

1. 所有关键剧本 Scene 被镜头覆盖；
2. Shot 有稳定 ID 和明确叙事目的；
3. 关键表演能够被镜头看见；
4. Blocking、空间和道具连续性成立；
5. Hero/Bridge Shot 使用合理；
6. Segment/VGU 足以驱动视频 Prompt；
7. Storyboard/Keyframe Prompt 可直接复制使用；
8. Segment 起止状态明确；
9. 已通过内部 review；
10. 唯一正式输出是 `04_STORYBOARD.md`；
11. 没有声称已生成故事板图或视频。
