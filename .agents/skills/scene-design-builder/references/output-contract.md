# scene-design-builder 输出协议

本文件定义 `scene-design-builder` 的输出形态、设定图 prompt 包和长内容落盘边界。

## 上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-asset-checker`：`character_assets`、`scene_assets`、`prop_assets`、`design_actions`
- 顶层索引：`production_level`、`performance_style`（若已在后续流程中确认则继承；未确认时仅参考建议）

## 设计输出路径

根据制作档位选择输出形态：

- `focus`：完整角色锁定卡 + 完整场景锁定卡 + 设定图 prompt 包
- `fast`：轻量角色锁定卡 + 轻量场景锁定卡 + 最小可用设定图 prompt 包

## 参考强度

- `high_anchor`
- `medium_anchor`
- `low_anchor_originalized`

## 阶段补丁壳

```yaml
patch_type: scene-design-builder
version: 1
status:
updated_at:
summary:
data:
```

## `data` 结构

```yaml
data:
  design_mode:
  visual_language:
    shape_language_core:
    silhouette_anchors:
    proportion_strategy:
    material_strategy:
    color_script:
    environment_stylization:
    prop_exaggeration_rule:
  character_designs:
    - name:
      reference_strength:
      asset_strategy:
      lock_card_file:
      prompt_file:
  scene_designs:
    - name:
      reference_strength:
      asset_strategy:
      lock_card_file:
      prompt_file:
  prop_designs:
    - name:
      asset_strategy:
      lock_card_file:
      prompt_file:
  visual_consistency:
    character_anchor_note:
    scene_anchor_note:
    material_anchor_note:
  script_adaptation_notes:
  next_action:
```

### 字段说明

- `design_mode`：本次走完整设定还是轻量锁定，建议直接复用顶层 `production_level` 的语义。
- `visual_language`：本次项目的统一视觉语言基线，角色、场景、核心道具都必须继承这组约束。
- `character_designs`：角色级锁定卡与设定图 prompt 路径。
- `scene_designs`：场景级锁定卡与设定图 prompt 路径。
- `prop_designs`：关键道具锁定卡与 prompt 路径；仅对核心道具使用。
- `visual_consistency`：供后续分镜和视频提示词继承的一致性锚点。
- `script_adaptation_notes`：剧本阶段需要继承的视觉与动作约束。
- `next_action`：下一阶段执行提示。

### 轻结构约束

`character_designs` / `scene_designs` / `prop_designs` 统一使用：

```yaml
- name:
  reference_strength:
  asset_strategy:
  lock_card_file:
  prompt_file:
```

其中：

- `reference_strength` 适用于角色与场景，可取 `high_anchor / medium_anchor / low_anchor_originalized`
- `asset_strategy` 建议直接复用资产阶段语义，例如 `reuse / tweak / new_light / new_full / new_core_prop`

`visual_language` 建议至少收敛为：

```yaml
visual_language:
  shape_language_core:
  silhouette_anchors:
  proportion_strategy:
  material_strategy:
  color_script:
  environment_stylization:
  prop_exaggeration_rule:
```

其中：

- `shape_language_core`：本次世界观统一形状语言，例如“人物以方形+三角形为主，建筑以稳定方形为基底并带轻微弧线”。
- `silhouette_anchors`：角色或道具在远景和黑影状态下仍可识别的外轮廓记忆点。
- `proportion_strategy`：人物、道具、建筑的大体比例基线，例如“人物 6.5 头身，道具 70% 真实 + 30% 夸张”。
- `material_strategy`：统一的材质原则，例如“动画比例 + 真实材质，不走玩具塑料感”。
- `color_script`：统一色彩剧本，例如“暖灰基底 + 低饱和青绿 + 局部红色点睛”。
- `environment_stylization`：场景空间如何做电影化转译，例如“轻微弧线、有节奏起伏、层次强化”。
- `prop_exaggeration_rule`：关键道具如何做有性格的夸张，而不是普通商品图。

## 黑板摘要建议

黑板补丁至少应说明：

- 本次走的是完整设定还是轻量锁定卡
- 本次统一视觉语言基线是什么
- 角色参考强度和场景参考强度
- 哪些内容来自资产复用，哪些内容是新建
- 分别消费了哪些 `reuse_targets / tweak_targets / new_light_targets / new_full_targets`
- 锁定卡写入了哪些 `details/` 文件
- 可直接生成设定图的 prompt 写入了哪些 `outputs/design_prompts/` 文件

## 长内容落盘

较长的角色或场景设定正文写入 `details/`，命名可采用：

- `details/character_design_v*.md`
- `details/scene_design_v*.md`

可直接生成设定图的 prompt 写入：

- `outputs/design_prompts/character_prompts_v*.md`
- `outputs/design_prompts/scene_prompts_v*.md`
- `outputs/design_prompts/prop_prompts_v*.md`

## prompt 文档语言规范

- 设定图 prompt 文档默认以中文为主。
- 结构说明、角色描述、场景描述、负向约束优先使用中文。
- 只有在特定平台确实需要时，才额外派生英文适配版；英文不作为默认主交付。

## 生成 prompt 与对外文案的风格口径

- 生成 prompt 允许使用强风格锚词，例如：
  - 皮克斯电影级动画风格
  - 超高质量 3D 角色动画
  - 电影级灯光与镜头语言
  - feature animation character sheet
- 这些锚词的作用是把模型拉向动画长片级角色设计，而不是普通写实人物图。
- 发布文案、对外介绍和复盘摘要仍尽量使用通用表述，不直接写“Pixar 官方风格”“皮克斯同款”等措辞。

## Pixar 电影角色设计共性原则

以下原则不是只适用于某个角色，而是任何角色进入设定阶段都应先判断：

### 1. 概括优先，不走半写实真人

- 保留辨识度最强的身份特征
- 主动简化五官复杂度
- 明确是“动画角色设计”，不是“真人演员换成 3D”

### 2. 轮廓识别度优先

- 角色变成纯黑剪影后，仍应尽量一眼可辨
- 需要至少一个强剪影锚点，例如：
  - 特殊持物方式
  - 肩颈轮廓
  - 服装外轮廓
  - 固定站姿

### 3. 形状语言先行

角色性格必须先翻译成形状比例，而不是只写性格词：

- `circle`：温暖、安全、亲和
- `square`：稳重、可靠、强硬
- `triangle`：危险、锐利、压迫

每个角色都应给出一个主导比例，例如：

- `70% square + 30% triangle`
- `60% circle + 40% square`

### 4. 头身比必须明确

- 默认不要落回真人 7.5~8 头身
- 先在 5.5~7 头身区间判断
- 成年男性、带压迫感的角色通常可优先尝试 6~6.5 头身

### 5. 眼睛与眉骨策略必须明确

- 动画角色的眼睛通常比真人更大，但不能等于“萌眼”
- 要写清：
  - 眼睛相对真人放大多少
  - 眉骨是否压眼
  - 眼窝深浅
  - 眼神是温暖、机警、压迫还是迟钝

### 6. 表情系统必须成组

- 不要只给 2~3 个表情
- 至少给一组完整的情绪梯度，例如：
  - 平静
  - 怀疑
  - 轻蔑
  - 冷笑
  - 压迫凝视

### 7. 动画比例 + 真实材质

- 角色比例、五官和轮廓动画化
- 材质、布料、皮肤、头发仍保持电影级真实感
- 既不是玩具公仔感，也不是写实写真感

## Pixar 电影级统一视觉语言原则

以下原则适用于角色、场景、道具三者的整体协同，而不是只适用于单个角色：

### 1. 同一世界遵循同一套形状语言

- 人物、建筑、摊位、头盔、摩托、电子秤都应来自同一个形状语言母体
- 不允许出现“人物很像动画长片，场景却像普通 AI 背景图，道具又像商品图”的拼接感

### 2. 场景要设计化，而不是现实照搬

- 现实空间需要经过节奏化和电影化整理
- 建筑、街道、摊位、招牌允许轻微弯曲、强化层次和动线
- 目标是“真实世界的设计转译”，不是“原样写实抄录”

### 3. 道具要角色化，而不是普通产品图

- 关键道具应具备远景可识别的外轮廓记忆点
- 道具默认采用“70% 真实 + 30% 夸张”的处理
- 例如头盔、摩托、电子秤都应在轮廓、比例或细节上带一点角色性格

### 4. 色彩要统一，不要杂乱堆叠

- 颜色比现实更干净，主次关系更明确
- 同一项目应先确定一套基底色、功能色和强调色，再分配到人物、场景和道具
- 目标是“真实但更美、更可读”，不是“随机真实世界杂色”

### 5. 灯光和材质服务电影感

- 灯光优先服务角色表演和镜头阅读，不只是照亮物体
- 材质保持真实层次，但避免塑料玩具感、廉价游戏建模感和纯写实摄影感
- 统一追求“动画比例 + 真实材质 + 电影灯光”

## 角色设定图 prompt 结构要求

角色设定图 prompt 不能只描述“这个人长什么样”，而必须明确要求输出为**角色设定板 / character sheet**。

至少应覆盖：

- `16:9` 横版单张画布
- Pixar / 动画长片级角色设计锚词
- 头身比
- 形状语言比例
- 剪影锚点
- 眼睛与眉骨策略
- 正面、侧面、背面、四分之三视角
- 3 组以上核心表情
- 2 组以上代表性动作姿态
- 服装分层与配件细节
- 角色气质关键词
- 干净背景与版式要求

推荐写法要点：

- 明确写“角色设定板”“多视角”“表情区”“动作区”“细节标注区”
- 明确写“16:9 横版单张设定板”“左中右或上中下分区”
- 明确写“皮克斯电影级动画风格 / feature animation quality”等风格锚词
- 明确写头身比、形状语言、剪影锚点和眼部策略
- 明确禁止“摄影棚人像照”“单张海报照”“真人定妆照”
- 明确要求动画角色比例、面部概括程度、轮廓简化程度

如果用户没有特别要求，角色设定图 prompt 默认追求：

1. 一张图里能同时看到多视角
2. 一张图里能看到表情变化和动作倾向
3. 一张图本身就能直接作为后续故事板和视频的参考板

推荐默认版式：

1. 中间主区：最大尺寸的正面主视图 + 四分之三主视图
2. 左侧窄区：侧面与背面
3. 右上区：3 组表情头部特写
4. 右下区：2 到 3 组动作姿态
5. 底部窄条：服装配件、鞋、头盔、局部材质细节

## 场景设定图 prompt 结构要求

场景设定图 prompt 不能只描述“有一个什么场景”，而必须明确要求输出为**环境设定板 / environment sheet**。

至少应覆盖：

- `16:9` 横版单张画布
- Pixar / 动画长片级场景设计锚词
- 主场景总览
- 中景构图版本
- 关键空间动线
- 关键道具位置关系
- 光照方向与色彩方案
- 局部材质与道具细节区

推荐写法要点：

- 明确写“环境设定板”“场景总览区”“镜头构图区”“局部细节区”
- 明确写“适合连续镜头调度”“适合角色对峙和动作推进”
- 明确写“电影级环境灯光”“动画长片级空间组织”
- 明确禁止“背景碎而乱”“低质游戏场景感”“童话糖果屋式泛化场景”

如果用户没有特别要求，场景设定图 prompt 默认追求：

1. 一张图里先看清空间关系
2. 一张图里能看出镜头可用性
3. 一张图里能直接提取后续故事板需要的环境信息

推荐默认版式：

1. 中间主区：场景总览主视图
2. 左侧区：另一角度的空间视图或俯视结构图
3. 右上区：适合对话/对峙的中景构图
4. 右下区：高潮镜头可用的空间构图
5. 底部窄条：关键道具、局部材质、灯光标注

## 阶段推进建议

- `project_status: design_ready`
- `next_stage: scene-script-adapter`
