# scene-design-builder 输出协议

本文件定义 `scene-design-builder` 的输出形态、设定图 prompt 包、全场景资产总参考图、道具状态机、Blocking/Faction 记忆字段和长内容落盘边界。

本协议是通用项目记忆协议，不绑定任何具体样例项目。样例项目暴露的问题只能转译为通用字段与执行规则，不得把样例角色、样例台词、样例站位直接固化进协议。

## 上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`
- `scene-asset-checker`：`character_assets`、`scene_assets`、`prop_assets`、`design_actions`
- 顶层索引：`production_level`、`performance_style`（若已在后续流程中确认则继承；未确认时仅参考建议）
- 顶层记忆字段：`context_policy`、`user_confirmations`、既有 `blocking_map` / `faction_layout` / `prop_state_machines`（如有）

## 设计输出路径

根据制作档位选择输出形态：

- `focus`：完整角色锁定卡 + 完整场景锁定卡 + 关键道具锁定卡 + 设定图 prompt 包 + 全场景资产总参考图 prompt
- `fast`：轻量角色锁定卡 + 轻量场景锁定卡 + 核心道具摘要 + 最小可用设定图 prompt 包 + 简版全场景资产总参考图 prompt

## 参考强度

- `high_anchor`
- `medium_anchor`
- `low_anchor_originalized`

## 确认闸门

本阶段默认不能直接落盘正式设定和 prompt。必须先输出设计方向预览，并等待用户确认。

设计方向预览至少包含：

- 角色方向候选
- 场景与关键道具清单
- 统一视觉语言基线
- 角色/场景/道具参考强度
- 是否需要全场景资产总参考图
- 初版 `blocking_map` / `faction_layout` 设计原则
- 核心道具是否需要 `prop_state_machines`
- 需要用户确认的问题

用户纠错、补充偏好或指出问题，不等于授权落盘。只有用户明确表达确认、采用、按此生成、落盘或写入时，才能输出正式文件并推进阶段。

## 阶段补丁壳

```yaml
patch_type: scene-design-builder
version: 2
status:
updated_at:
summary:
data:
```

## `data` 结构

```yaml
data:
  design_mode:
  design_confirmation:
    confirmed_by_user: false
    confirmation_note:
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
      sheet_requirements:
        views:
        expression_count:
        action_pose_count:
        prop_interaction_required:
        scale_comparison_required:
        safety_boundary_required:
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
      state_machine_id:
  master_scene_prop_reference:
    enabled:
    prompt_file:
    includes:
      - main_scene_layout
      - character_blocking
      - key_prop_positions
      - prop_state_matrix
      - physical_safety_notes
  prop_state_machines:
    - prop_name:
      states:
        - state_id:
          description:
          visible_evidence:
          allowed_interaction:
          safety_boundary:
  blocking_map:
    spatial_axis:
    zones:
      - zone_id:
        description:
        allowed_characters:
        forbidden_characters:
    continuity_rule:
  faction_layout:
    factions:
      - faction_id:
        members:
        default_zone:
        forbidden_zones:
  visual_consistency:
    character_anchor_note:
    scene_anchor_note:
    material_anchor_note:
    blocking_anchor_note:
    prop_state_anchor_note:
  script_adaptation_notes:
  next_action:
```

## 字段说明

- `design_mode`：本次走完整设定还是轻量锁定，建议直接复用顶层 `production_level` 的语义。
- `design_confirmation`：记录用户是否确认设计方向。正式落盘时应为 `confirmed_by_user: true`。
- `visual_language`：本次项目的统一视觉语言基线，角色、场景、核心道具都必须继承这组约束。
- `character_designs`：角色级锁定卡与设定图 prompt 路径。
- `sheet_requirements`：角色设定图结构要求；默认允许板块标题、编号和说明文字。
- `scene_designs`：场景级锁定卡与设定图 prompt 路径。
- `prop_designs`：关键道具锁定卡与 prompt 路径；仅对核心道具使用。
- `master_scene_prop_reference`：全场景资产总参考图，用于在参考图数量有限时把主场景、角色站位、核心道具位置和道具状态压缩为一个总参考 prompt。
- `prop_state_machines`：核心道具状态机，供剧本、分镜和视频提示词继承。
- `blocking_map`：通用空间调度图，记录空间轴线、区域、允许/禁止角色。
- `faction_layout`：通用阵营布局，记录角色属于哪个阵营、默认区域和禁止区域。
- `visual_consistency`：供后续分镜和视频提示词继承的一致性锚点。
- `script_adaptation_notes`：剧本阶段需要继承的视觉、动作、站位与道具约束。
- `next_action`：下一阶段执行提示。

## 角色设定图要求

角色设定图默认允许包含文字、编号和板块标题，因为它是制作资料板和多图参考输入，不是最终视频画面。

每个核心角色默认应包含：

- 正面 / 3/4 / 侧面 / 背面
- 6 到 9 个剧本驱动表情
- 4 到 6 个剧情动作姿态
- 至少 1 个关键道具交互姿态（如适用）
- 角色之间的比例对照
- 物理边界和安全边界说明
- 服装、配件、材质与剪影锚点

只有用户明确要求时，才额外输出无文字干净参考图 prompt。

## 全场景资产总参考图要求

当项目包含多角色、多道具、多段视频或参考图数量受限时，优先产出 `Master Scene-Prop Reference Board`。

该 prompt 应整合：

- 主场景空间布局
- 角色默认站位和阵营关系
- 核心道具位置
- 核心道具状态矩阵
- 镜头动线和安全边界
- 后续故事板 / 视频提示词引用方式

## 黑板摘要建议

黑板补丁至少应说明：

- 本次走的是完整设定还是轻量锁定卡
- 用户是否已经确认设计方向
- 本次统一视觉语言基线是什么
- 角色参考强度和场景参考强度
- 哪些内容来自资产复用，哪些内容是新建
- 锁定卡写入了哪些 `details/` 文件
- 设定图 prompt 写入了哪些 `outputs/design_prompts/` 文件
- 是否产出全场景资产总参考图 prompt
- 是否产出 `prop_state_machines`、`blocking_map`、`faction_layout`

## 长内容落盘

较长的角色、场景或道具设定正文写入 `details/`，命名可采用：

- `details/character_design_v*.md`
- `details/scene_design_v*.md`
- `details/prop_design_v*.md`

可直接生成设定图的 prompt 写入：

- `outputs/design_prompts/character_prompts_v*.md`
- `outputs/design_prompts/scene_prompts_v*.md`
- `outputs/design_prompts/prop_prompts_v*.md`
- `outputs/design_prompts/master_scene_prop_reference_v*.md`

## prompt 文档语言规范

- 设定图 prompt 文档默认以中文为主。
- 结构说明、角色描述、场景描述、负向约束优先使用中文。
- 只有在特定平台确实需要时，才额外派生英文适配版；英文不作为默认主交付。

## 生成 prompt 与对外文案的风格口径

生成 prompt 允许使用强风格锚词，例如：

- 皮克斯电影级动画风格
- 超高质量 3D 角色动画
- 电影级灯光与镜头语言
- feature animation character sheet

这些锚词的作用是把模型拉向动画长片级角色设计，而不是普通写实人物图。

发布文案、对外介绍和复盘摘要仍尽量使用通用表述，不直接写“Pixar 官方风格”“皮克斯同款”等措辞。

## 统一视觉语言原则

任何角色、场景和道具都应先判断：

1. 概括优先，不走半写实真人。
2. 轮廓识别度优先。
3. 形状语言先行。
4. 头身比必须明确。
5. 眼睛与眉骨策略必须明确。
6. 表情系统必须成组。
7. 动画比例 + 真实材质。
8. 同一世界遵循同一套形状语言。
9. 场景要设计化，而不是现实照搬。
10. 道具要角色化，而不是普通产品图。
11. 色彩要统一，不要杂乱堆叠。
12. 灯光和材质服务电影感。
