---
name: script-director
description: 当用户要把已确认的创意故事与视觉设定转成可直接供分镜阶段消费的正式剧本，并同时补齐角色对白、动作、眼神、微表情、停顿、身体重心、反应节奏、Blocking、道具交互和动作/情绪连续性时使用。合并编剧与表演导演职责，只输出一个权威 Markdown 文档。
---

# Script Director

SceneForge 文本创作主链第 03 阶段。

本 Skill 解决两个高度耦合的问题：

1. **故事具体怎么发生、角色说什么。**
2. **角色具体怎么演。**

它合并旧版 `scene-script-adapter` 与 `scene-performance-director`，避免把“剧本”和“表演说明”拆成两份互相容易漂移的文档。

执行期通用约束遵循仓库根 `AGENTS.md`。本 Skill 只输出文本型剧本与导演表演说明，不生成图片、音频或视频。

## 1. 何时使用

以下情况使用本 Skill：

- 已有 `01_CREATIVE_STORY.md` 和 `02_PRODUCTION_DESIGN.md`，需要写正式剧本。
- 用户已有故事梗概和角色设定，需要转换为可分镜、可表演的剧本。
- 用户已有剧本，但希望补齐表演、动作、停顿、眼神和导演执行信息。
- 用户要求保留原剧情，只做剧本标准化、节奏压缩或表演导演化处理。
- 用户要求按已选改编方向生成正式剧本。

如果用户已经提供完整剧本，也可以把它作为主输入，重点执行结构标准化和表演导演增强，而不是无意义重写。

## 2. 输入

默认主输入：

```text
01_CREATIVE_STORY.md
02_PRODUCTION_DESIGN.md
```

可选输入：

- 用户提供的完整或部分剧本；
- 已确认对白；
- source intake 中与动作链、对白或原剧情直接相关的文本；
- 用户指定目标总时长；
- 单段视频生成时长或 Segment Strategy；
- 表演风格；
- 需要保留的经典台词；
- 禁止改变的剧情结果；
- 风格化动作/喜剧/动画表现要求。

## 3. 输入读取边界

默认只读取：

1. `01_CREATIVE_STORY.md`；
2. `02_PRODUCTION_DESIGN.md`；
3. 当前用户明确补充；
4. 用户显式引用的 source 文本；
5. 本 Skill 的 `references/output-contract.md` 与 `references/review-checklist.md`。

从 Stage 02 只读取当前剧本真正需要的角色、场景、道具和空间锁，不复制整份图片 Prompt 内容。

不得扫描其他项目或历史剧本作为默认参考。

## 4. 单一输出原则

本阶段只能产出 **一个权威阶段文档**：

```text
03_SCRIPT_DIRECTION.md
```

禁止把以下内容拆成额外正式文档：

- script；
- beat table；
- performance sheet；
- action continuity；
- emotion continuity；
- blocking notes；
- VGU planning hints；
- script review。

这些都必须进入 `03_SCRIPT_DIRECTION.md`。

详细格式见 `references/output-contract.md`。

## 5. 核心职责

### 5.1 继承 Story Canon

必须继承 Stage 01：

- 创作模式；
- Story Beats；
- 角色关系；
- immutable story facts；
- must_keep / must_avoid；
- 结局与 payoff；
- 目标总时长。

不得在正式剧本阶段重新发散新的故事方向。

### 5.2 继承 Visual Canon

必须继承 Stage 02 中与表演和场景调度相关的：

- 角色身份与外形锁；
- 主服装；
- 场景空间关系；
- 门、窗、桌、道路、关键地标方向；
- 关键道具及其状态；
- 允许的视觉变化范围。

剧本可以安排角色换装或道具状态变化，但必须显式写出变化发生的时间点，不得静默漂移。

### 5.3 把 Story Beats 转成正式场次

每个 Beat 可以对应一个或多个 Scene，但必须保持可追溯。

使用稳定 ID：

```text
SCN_001
SCN_002
...
```

每个场次必须关联：

- `BEAT_###`；
- `SCENE_###`；
- 出场 `CHAR_###`；
- 关键 `PROP_###`；
- 预计时长；
- 场次目标；
- 冲突变化；
- 场次结束状态。

### 5.4 写正式剧本

剧本至少覆盖：

- 场景标题；
- 时间/地点；
- 人物；
- 可见动作；
- 对白；
- 环境反应；
- 关键道具交互；
- 场次转折；
- 结尾状态。

对白必须符合角色身份、关系和当前情绪，不要为了“文学感”牺牲可表演性。

### 5.5 同步写表演导演信息

不要在剧本写完后附一份泛化“表演建议”。

表演信息应尽量靠近具体对白、动作或 Beat，至少覆盖：

- eye line / gaze；
- 微表情；
- 表情变化过程；
- 身体重心；
- 手部或次级动作；
- anticipation；
- pause / hold；
- reaction timing；
- 声音状态或说话节奏；
- 与其他角色距离变化；
- Blocking；
- 道具交互；
- signature gesture。

不要只写“生气地说”“悲伤地看着”。必须把情绪变成可观察、可拍摄的行为。

### 5.6 Character Performance Profile

每个主要角色都要有简洁的表演基线：

- gaze strategy；
- facial range；
- body center；
- default posture；
- gesture habits；
- signature gesture；
- reaction speed；
- emotional leakage pattern；
- dialogue rhythm；
- forbidden out-of-character behavior。

如果风格允许动画夸张，可额外定义 stylized action range，但不能强制所有项目都使用动画物理。

### 5.7 表现力扩展

仅在题材和风格适合时使用。

可包括：

- stylized action；
- contrast comedy；
- cartoon timing；
- exaggerated anticipation / impact / recovery；
- 轻中度非写实伤害反应。

若使用夸张动作，必须写清：

```text
anticipation
→ impact
→ deformation / reaction
→ hold
→ recovery
```

不能只写“夸张撞飞”。

### 5.8 动作连续性链

必须维护跨 Scene / Beat 的关键动作状态。

例如：

```text
ACTION_CHAIN_001
SCN_003 角色拿起杯子
→ SCN_004 杯子仍在右手
→ SCN_005 放到桌面左侧
```

记录真正影响后续分镜和视频生成的动作即可，不要把所有细节都做成状态机。

### 5.9 情绪连续性链

必须维护关键角色情绪跨场次变化。

例如：

```text
EMOTION_CHAIN_001
警惕
→ 怀疑
→ 确认真相
→ 强装平静
→ 爆发
```

每次重要跳变应有触发事件。

### 5.10 为分镜准备 Shot Intent

本阶段不能写正式 Shot List，但必须给 Storyboard Director 足够的信息判断镜头。

可以标记：

- 必须看清的表情；
- 必须看清的道具动作；
- Hero Moment；
- Reaction Moment；
- 必须建立空间关系的时刻；
- 可能需要 Bridge Shot 的动作；
- 哪些场次不适合过度切镜。

这叫 `storyboard_hints`，不是正式分镜。

## 6. 时长控制

正式剧本必须和 Stage 01 的目标总时长一致。

每个 Scene 至少有估时。

如果总时长与剧本明显不匹配，应优先：

1. 压缩重复信息；
2. 合并功能重复场次；
3. 减少冗余对白；
4. 保留高潮、关键反应和必要停顿。

不要用不现实的超快语速来“满足时长”。

## 7. 执行流程

```text
读取 Story Canon
→ 读取 Visual Canon
→ 建立 Scene Plan
→ Beat → Scene 映射
→ 写剧本动作与对白
→ 同步补表演导演信息
→ 建立 Character Performance Profiles
→ 建立 Action / Emotion Continuity Chains
→ 标记 Storyboard Hints
→ 校准时长
→ 内部 review
→ 输出 03_SCRIPT_DIRECTION.md
```

## 8. 内部 Review

正式输出前按 `references/review-checklist.md` 自检。

允许自动修正：

- 场次 ID 缺失；
- Beat 没有覆盖；
- 表演描述过于抽象；
- 动作状态前后矛盾；
- 道具凭空出现/消失；
- 角色位置不符合场景空间锁；
- 剧本时长明显超标；
- 下游缺少关键 Shot Intent。

不得在 review 中擅自改变用户已确认的故事结局、角色关系、角色身份或视觉 Canon。

## 9. 下游交接

文档必须让 Stage 04 `storyboard-director` 无需重新解释剧本即可工作。

Downstream Handoff 至少包含：

- Scene IDs；
- Beat → Scene 映射；
- 角色表演锁；
- Action Continuity Chains；
- Emotion Continuity Chains；
- Prop State Timeline；
- Blocking 重点；
- Hero / Reaction / Bridge 候选；
- 每场时长；
- 不得改变的对白或剧情结果；
- 仍开放给分镜阶段决定的镜头问题。

## 10. 完成定义

只有同时满足以下条件才算完成：

1. 所有关键 Story Beats 被正式剧本覆盖；
2. 角色对白与行为符合人物设定；
3. 表演不是抽象情绪词，而是可观察动作；
4. 主要角色有 Performance Profile；
5. 关键动作和情绪连续性已建立；
6. 场景、服装、道具和空间状态不冲突；
7. 总时长基本成立；
8. Storyboard Director 可以直接消费；
9. 唯一正式输出是 `03_SCRIPT_DIRECTION.md`；
10. 没有生成正式分镜或视频 Prompt。
