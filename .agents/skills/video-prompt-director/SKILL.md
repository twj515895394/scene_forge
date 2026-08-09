---
name: video-prompt-director
description: 当用户要把已确认的分镜、Segment、Shot、角色表演、首尾状态和连续性约束转换为可直接复制到外部视频生成模型使用的分段视频提示词时使用。负责导演级视频 Prompt、模型适配层、连续性与负向约束，只输出一个权威 Markdown 文档，不实际生成视频。
---

# Video Prompt Director

SceneForge 文本创作主链第 05 阶段。

本 Skill 解决一个核心问题：**怎样把已经确定的导演意图和分镜结构，准确翻译成视频生成模型真正能执行的提示词。**

它吸收旧版 `scene-video-prompt-builder` 的有效能力，但不再输出多份 pack/review 文件。所有 Segment Prompt、全局规则、连续性约束、模型适配和内部 review 都统一进入一个阶段文档。

执行期通用约束遵循仓库根 `AGENTS.md`。本 Skill 只输出文本提示词和制作说明，不声称已经生成任何视频。

## 1. 何时使用

以下情况使用本 Skill：

- 已有 `04_STORYBOARD.md`，需要生成最终视频提示词。
- 用户已经有 Shot/Segment 分镜，希望转换成可直接用于视频模型的 Prompt。
- 用户要为不同 Segment 分别生成视频提示词。
- 用户指定某个视频模型，需要在不改变导演意图的前提下调整 Prompt 表达。
- 用户有首帧、尾帧或故事板参考的文字资产引用，需要写入生成条件。

如果用户已经有一段完整视频 Prompt，只要求优化，也可以局部执行，但必须保持其上游 Storyboard 意图不被擅自修改。

## 2. 输入

默认主输入：

```text
04_STORYBOARD.md
```

必要时按需读取：

```text
02_PRODUCTION_DESIGN.md
03_SCRIPT_DIRECTION.md
```

只用于核对角色、场景、表演或道具连续性，不要重复加载无关章节。

可选输入：

- 目标视频模型，例如 Wan、Seedance、Veo、Kling、Hailuo、LTX 等；
- 模型版本；
- image-to-video / text-to-video / start-end-frame 等生成方式；
- 参考图片的文字 asset ID / URI；
- 用户指定分辨率、画幅、FPS、时长；
- 用户指定 Prompt 语言；
- 用户指定是否生成带声音/对白的视频；
- 平台特殊 Prompt 规则。

如果没有指定具体模型，先生成 **model-neutral director prompt**，不要猜测模型。

## 3. 输入读取边界

默认只读取：

1. `04_STORYBOARD.md`；
2. 当前 Segment 所引用的 Stage 02/03 Canon 片段；
3. 当前用户指定的目标模型/平台要求；
4. 本 Skill 的 `references/output-contract.md` 与 `references/review-checklist.md`。

不要扫描其他项目、历史 Prompt 或未被当前 Segment 引用的全部角色/场景资料。

## 4. 单一输出原则

本阶段只能产出 **一个权威阶段文档**：

```text
05_VIDEO_PROMPTS.md
```

禁止把以下内容拆成额外正式文档：

- global prompt rules；
- segment prompt packs；
- Chinese pack；
- English pack；
- model-specific pack；
- negative prompt pack；
- video prompt review。

全部作为 `05_VIDEO_PROMPTS.md` 内的章节存在。

详细格式见 `references/output-contract.md`。

## 5. 核心职责

### 5.1 继承 Storyboard，不重新导演

Stage 05 的首要规则：**不能重新设计分镜。**

必须继承 Stage 04：

- `SEG_###`；
- `SHOT_###`；
- Shot 顺序；
- Segment 时长；
- start/end state；
- primary action；
- primary performance；
- camera behavior；
- continuity in/out；
- character / scene / prop IDs；
- Hero / Bridge intent；
- 必须保持的视觉事实。

如果 Stage 04 本身存在明显不可执行矛盾，应标记问题并给出最小修复建议，而不是静默改写。

### 5.2 建立 Global Execution Rules

整个项目只写一次全局规则，用于避免每个 Segment Prompt 重复大量内容。

可以包含：

- 角色身份一致性；
- 服装/发型稳定；
- 场景风格；
- 画幅；
- 视觉媒介；
- 摄像机总体原则；
- 动作自然度；
- 面部稳定性；
- 道具连续性；
- 时间/光线连续性；
- 禁止新增人物；
- 禁止改变剧情结果；
- 负向约束。

Global Rules 只包含真正跨 Segment 稳定的内容。

### 5.3 每个 Segment 生成 Director Prompt

每个 `SEG_###` 必须有独立可复制 Prompt。

推荐按以下执行顺序写：

```text
生成任务 / 输入模式
→ 开始画面状态
→ 场景与人物锁
→ 主要动作链
→ 角色表演
→ 摄像机行为
→ 环境动态
→ 时间与节奏
→ 连续性要求
→ 结束画面状态
→ 禁止项
```

Prompt 应描述**变化过程**，而不是静态画面关键词堆砌。

### 5.4 动作必须具有时间顺序

视频 Prompt 最重要的是时序。

错误示例：

```text
男人生气，转身，女人惊讶，镜头推进。
```

更好的结构：

```text
开始时男人背对女人站在桌边，右手仍握着杯子。
前 2 秒他保持沉默，肩膀轻微绷紧；
随后缓慢回头，视线先移向女人，再抬到她的眼睛；
女人在他回头后约半秒才做出反应，身体重心后移；
镜头从中景缓慢推进到中近景；
结尾男人停在半转身状态，杯子仍在右手，女人保持后退半步后的站位。
```

必须尽量让模型理解事件顺序、反应延迟和结束状态。

### 5.5 表演 Prompt

从 Stage 03/04 继承并转成视频可执行语言：

- gaze movement；
- micro-expression change；
- head/shoulder/body movement；
- hand action；
- pause/hold；
- reaction timing；
- emotion transition；
- dialogue mouth movement（仅在需要时）；
- stylized action timing（如适用）。

不要只写抽象情绪。

### 5.6 Camera Prompt

摄像机描述至少覆盖当前 Segment 真正需要的：

- framing / shot size；
- camera angle；
- camera position；
- movement；
- movement speed；
- subject tracking；
- focus behavior（如重要）；
- 构图变化；
- 何时开始/停止移动。

避免把大量互相冲突的运镜同时塞进一个短 Segment。

### 5.7 Environment Motion

只写与镜头有意义的环境动态，例如：

- 风吹衣物/树叶；
- 蒸汽；
- 雨雪；
- 人群背景运动；
- 灯光变化；
- 车辆；
- 烟尘；
- 门帘等响应动作。

不要为了“丰富画面”堆无关环境运动，导致模型抢占主体动作能力。

### 5.8 Continuity In / Out

每个 Segment Prompt 必须明确：

- 从哪里开始；
- 继承上段哪些状态；
- 到哪里结束；
- 下一段需要继承哪些状态。

特别关注：

- 角色位置；
- 角色朝向；
- 角色动作阶段；
- 表情阶段；
- 道具持有状态；
- 服装状态；
- 场景时间/光线；
- 摄像机最终状态。

### 5.9 参考图/首尾帧说明

如果 Stage 04 标记：

```text
reference_image
start_frame
start_end_frames
storyboard_reference
```

本阶段必须在 Prompt 条目中记录对应参考职责。

示例：

```yaml
reference_inputs:
  identity_reference: ASSET_CHAR_001
  scene_reference: ASSET_SCENE_001
  start_frame: ASSET_FRAME_021
  end_frame: ASSET_FRAME_022
```

如果当前系统只传文本而没有实际 asset URI，可以保留逻辑 ID，供外部工作流后续绑定。

### 5.10 Model-Neutral Prompt 与 Model-Specific Adapter

每个 Segment 首先生成 `director_prompt`，这是 Canonical Prompt。

如果用户指定目标模型，再追加：

```text
model_prompt
```

转换原则：

```text
Director Intent
→ Target Model Expression
```

模型适配只允许调整：

- Prompt 顺序；
- 术语；
- 长短；
- 平台参数描述方式；
- 模型擅长的控制格式。

不得改变：

- 剧情；
- Shot/Segment 顺序；
- 人物身份；
- 动作结果；
- 摄像机核心意图；
- start/end state。

如果不确定目标模型当前 Prompt 规范，不要伪造专有参数；输出 model-neutral prompt 即可。

### 5.11 Prompt 长度控制

Prompt 越长不代表越好。

优先级：

1. 身份/参考约束；
2. 起始状态；
3. 主体动作；
4. 关键表演；
5. 摄像机；
6. 结束状态；
7. 连续性；
8. 环境动态；
9. 风格修饰。

如果内容过载，应减少次要视觉修饰，而不是删掉时序和连续性。

### 5.12 Negative / Avoid Rules

针对每个 Segment 只写真正相关的禁止项，例如：

- 不新增人物；
- 不改变服装；
- 不改变发型；
- 不改变人物数量；
- 不让道具消失；
- 不错误切换左右手；
- 不发生额外镜头切换；
- 不突然改变天气/时间；
- 不改变角色身份；
- 不出现字幕、水印或 UI；
- 不发生不符合剧情的夸张动作。

不要机械添加巨大通用负面词库。

## 6. Prompt 语言

默认主交付使用中文。

只有以下情况才需要英文：

- 用户明确要求；
- 目标平台明确更适合英文；
- 用户需要中英双语。

即使需要双语，也仍写在同一个 `05_VIDEO_PROMPTS.md` 中。

## 7. 执行流程

```text
读取 04_STORYBOARD
→ 提取 Global Locks
→ Segment Prompt Plan
→ 每段建立 start/end state
→ 写 model-neutral Director Prompt
→ 如指定模型，做 Model Adapter
→ 写 continuity / negative rules
→ Prompt 长度与冲突检查
→ 内部 review
→ 输出 05_VIDEO_PROMPTS.md
```

## 8. 内部 Review

正式输出前按 `references/review-checklist.md` 自检。

允许自动修正：

- Segment/Shot 引用错误；
- Prompt 遗漏关键动作；
- start/end state 不一致；
- 道具或服装漂移；
- 反应先后顺序错误；
- 运镜冲突；
- Prompt 过载；
- model-specific prompt 改变导演意图；
- 中英文版本语义不一致。

不得自动改变上游 Storyboard 的剧情和镜头核心决策。

## 9. 最终交付的可复制性

每个 Segment 至少提供一个清晰的 `Copy-ready Director Prompt`。

用户应该能够：

```text
复制 SEG_001 Prompt
→ 粘贴到视频生成平台
→ 绑定对应参考图/首尾帧
→ 开始生成
```

而不需要从文档其他 20 个章节自行拼 Prompt。

## 10. 完成定义

只有同时满足以下条件才算完成：

1. 所有需要生成视频的 `SEG_###` 都有 Prompt；
2. 每个 Prompt 与 `SHOT_###` 和 Stage 04 一致；
3. 动作具有明确时间顺序；
4. 关键表演被写成可执行行为；
5. 摄像机行为不冲突；
6. start/end state 明确；
7. continuity in/out 明确；
8. 参考输入职责明确；
9. 如有模型适配，没有改变 Director Intent；
10. 每个 Segment 有可直接复制的最终 Prompt；
11. 已通过内部 review；
12. 唯一正式输出是 `05_VIDEO_PROMPTS.md`；
13. 没有声称已生成视频。
