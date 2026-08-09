---
name: production-designer
description: 当用户要把已确认的创意故事文档转成统一的角色、场景、关键道具与视觉连续性设定，并生成可直接用于外部图像模型的角色设计图、角色说明书、场景参考图、道具图或空间参考图提示词时使用。只输出一个权威 Markdown 文档，不实际生成图片。
---

# Production Designer

SceneForge 文本创作主链第 02 阶段。

本 Skill 解决一个核心问题：**这个故事里的世界、人物和关键物件应该长什么样，以及如何稳定地生成这些视觉参考。**

它合并旧版 `scene-asset-checker` 与 `scene-design-builder`：资产是否可复用变成设计阶段内部判断，不再作为独立画布节点。

执行期通用约束遵循仓库根 `AGENTS.md`。本 Skill 只输出文本型视觉设定和图片生成提示词，不声称已生成任何图片。

## 1. 何时使用

以下情况使用本 Skill：

- 已有 `01_CREATIVE_STORY.md`，需要进入角色、场景、道具设计。
- 用户已经有明确故事，需要补齐统一视觉设定。
- 用户需要角色说明书图、三视图、表情图、服装设定图、场景参考图、道具设定图或空间关系图 Prompt。
- 用户提供已有角色图、场景图或设计资产，需要判断复用、修改还是新建设定。
- 无限画布的上游节点向本节点传入创意故事文档和可选视觉参考文本。

如果用户只要求修改某一个现成 Prompt，可以局部执行；如果没有故事上下文，也允许把用户明确给出的角色/场景定义当作最小输入。

## 2. 输入

默认主输入：

```text
01_CREATIVE_STORY.md
```

可选输入：

- 已有角色/场景/道具设定文本；
- 已有媒体资产的文字描述或 asset reference；
- 用户指定视觉风格；
- `style_family` / `director_style_id`；
- 比例、时代、地域、服装、材质等硬约束；
- 用户指定的图像模型或 Prompt 偏好；
- 已知的角色身份一致性要求；
- 已知的空间关系或关键 Blocking 要求。

## 3. 输入读取边界

默认只读取：

1. `01_CREATIVE_STORY.md`；
2. 当前用户补充；
3. 用户显式提供或当前文档显式引用的视觉参考；
4. 当前已确认风格资料中与视觉设计直接相关的最小章节；
5. 本 Skill 的 `references/output-contract.md` 与 `references/review-checklist.md`。

不要扫描其他项目或历史设计来“找相似角色”。

## 4. 单一输出原则

本阶段只能产出 **一个权威阶段文档**：

```text
02_PRODUCTION_DESIGN.md
```

禁止把以下内容拆成独立正式输出：

- asset check；
- character bible；
- scene bible；
- prop bible；
- character prompt pack；
- scene prompt pack；
- spatial prompt；
- continuity review。

这些都必须作为 `02_PRODUCTION_DESIGN.md` 的章节存在。

详细格式见 `references/output-contract.md`。

## 5. 核心职责

### 5.1 继承故事事实

必须从 Stage 01 继承：

- `CHAR_###`；
- `BEAT_###`；
- 已存在的 `SCENE_###` / `PROP_###`；
- immutable story facts；
- `must_keep / must_avoid`；
- 风格方向；
- 时代、地域、身份等故事硬约束。

不得为了视觉好看擅自改变角色年龄、身份、人物关系、剧情功能或故事时代。

### 5.2 内部资产策略判断

针对每个角色、场景、关键道具判断：

```text
reuse
reuse_with_modification
new_design
not_required
```

这只是 Production Designer 内部决策，不成为独立 Stage。

若输入没有任何现成资产，直接进入 `new_design`，不要因为没有资产库而阻塞。

### 5.3 建立统一视觉语言

必须明确：

- 视觉媒介/风格家族；
- 形状语言；
- 材质语言；
- 色彩策略；
- 光线基调；
- 时代与地域识别点；
- 真实度/风格化程度；
- 角色与环境的视觉对比关系；
- 需要避免的视觉漂移。

### 5.4 角色视觉设计

每个主要角色至少定义：

- 稳定 `CHAR_###` ID；
- 身份和年龄感；
- 身高/体型/比例；
- 脸型与五官关键锚点；
- 肤色；
- 发型；
- 主服装；
- 鞋子和配饰；
- 轮廓特征；
- 色彩方案；
- 表情范围；
- 标志性视觉元素；
- 不可漂移项；
- 可变化项；
- 角色设计图 Prompt。

若用户提供人物身份参考，Prompt 必须明确区分：

```text
IDENTITY_REFERENCE
CLOTHING_REFERENCE
HAIR_REFERENCE
STYLE_REFERENCE
```

不同参考图的职责不能混淆。

### 5.5 场景视觉设计

为每个重要地点创建或继承稳定 `SCENE_###` ID。

至少定义：

- 场景功能；
- 时代/地域；
- 空间布局；
- 入口、出口和关键地标；
- 材质；
- 色彩；
- 光线；
- 天气/时段；
- 可交互区域；
- 角色活动区域；
- 不可漂移元素；
- 场景参考图 Prompt。

如果后续分镜依赖明确空间方向，必须建立简化 `spatial_lock`，例如门、窗、桌、灶台、道路方向等。

### 5.6 关键道具设计

只设计对剧情、动作或连续性有意义的道具。

使用稳定 `PROP_###` ID，至少定义：

- 剧情功能；
- 外观；
- 尺寸/比例；
- 材质；
- 初始状态；
- 可变化状态；
- 与角色/场景的关系；
- 道具图 Prompt（如确实需要）。

### 5.7 Continuity Bible

本阶段负责建立第一版视觉连续性锁，不另建独立 Skill。

至少包括：

- character lock；
- costume lock；
- hair lock；
- scene lock；
- prop lock；
- spatial lock；
- allowed variations。

这些内容写入 `02_PRODUCTION_DESIGN.md`，供 Stage 03–05 引用。

### 5.8 图片 Prompt 编译

本阶段必须把设计定义转换成可直接用于外部图像生成模型的 Prompt。

Prompt 不应只是关键词堆砌。推荐按以下层次组织：

```text
任务类型
→ 主体身份
→ 身份一致性参考职责
→ 外观锚点
→ 服装/材质
→ 姿态/视角
→ 构图
→ 场景/背景
→ 光线/色彩
→ 风格/媒介
→ 连续性约束
→ 禁止项/负向约束
```

Prompt 默认中文主导；如果用户指定目标模型更适合英文，可附英文版本，但不要因此生成第二个正式阶段文档。

## 6. 必须覆盖的 Prompt 类型

根据项目实际需要选择，不要求机械生成所有类型。

### 角色类

- 角色标准设定图；
- 角色三视图；
- 半身/全身 reference；
- 表情表；
- 服装设定；
- 角色说明书板；
- 多角色身高比例对照。

### 场景类

- 场景概念图；
- 场景资产总参考图；
- 室内/室外空间参考；
- 不同时间/天气状态；
- 空间站位/布局参考图。

### 道具类

- 关键道具设定图；
- 状态变化图；
- 与角色比例参考图。

不需要的 Prompt 类型明确写 `not_required`，不要为了完整度制造无用 Prompt。

## 7. 执行流程

```text
读取 01_CREATIVE_STORY
→ 提取稳定实体与视觉目标
→ 判断 reuse / modify / new
→ 建立统一视觉语言
→ 角色设计
→ 场景设计
→ 道具设计
→ 建立 Continuity Bible
→ 编译图片生成 Prompts
→ 运行内部 review
→ 输出 02_PRODUCTION_DESIGN.md
```

## 8. 设计与 Prompt 的关系

必须先有 Canonical Design Definition，再有 Prompt。

禁止：

```text
直接凭感觉写 Prompt
→ 再从 Prompt 猜角色设定
```

正确顺序：

```text
Canonical Design
→ Continuity Lock
→ Prompt
```

这样后续 Prompt 可以针对不同模型重新编译，而不会改变角色本身。

## 9. 内部 Review

正式输出前按 `references/review-checklist.md` 自检。

允许自动修正：

- ID 漏写；
- Prompt 缺字段；
- 角色外观前后矛盾；
- 场景方向冲突；
- 道具状态冲突；
- 用户明确约束没有进入 Prompt。

不得自动改变已确认的故事事实和人物身份。

## 10. 下游交接

文档必须让 Stage 03 `script-director` 和 Stage 04 `storyboard-director` 直接消费。

`Downstream Handoff` 至少包含：

- 角色视觉锁；
- 场景与空间锁；
- 关键道具锁；
- 可用于后续生成参考图的 Prompt 索引；
- 哪些设计事实不可修改；
- 哪些视觉细节允许按场次变化；
- 仍缺少但不阻塞剧本的视觉项。

## 11. 完成定义

只有同时满足以下条件才算完成：

1. Stage 01 的角色和故事事实被正确继承；
2. 所有重要角色有完整视觉定义；
3. 所有重要场景有可分镜的空间定义；
4. 关键道具有必要状态定义；
5. 第一版 Continuity Bible 已建立；
6. 必需的图片生成 Prompt 可直接复制使用；
7. Prompt 与 Canonical Design 一致；
8. 已通过内部 review；
9. 唯一正式输出是 `02_PRODUCTION_DESIGN.md`；
10. 没有声称已生成任何图片。
