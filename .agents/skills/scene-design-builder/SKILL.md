---
name: scene-design-builder
description: 当用户要为 SceneForge 项目生成角色与场景的风格化设定，并根据制作档位产出轻量锁定卡或完整设定时应使用此技能。
---

# scene-design-builder

负责角色与场景的风格化设定。根据制作档位、故事骨架和资产判断结果，决定输出轻量锁定卡还是完整设定，并同步产出可直接生成角色说明书板、场景图、空间站位图、场景道具总参考图的最终提示词文件。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补当前阶段特有边界。

SceneForge 当前只输出提示词和制作说明，不生成图片。角色说明书板、场景图和道具图需要用户基于本阶段 prompt 在外部平台手动生成。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `state.next_stage` 为 `scene-design-builder`
- 已完成资产复用判断，需要为角色和场景生成本次项目可执行的视觉设定
- 需要把故事骨架、参考强度、已确认风格家族和资产复用结论合并成统一设计结果
- 需要定义本项目是否启用项目级 `expressive_animation` 表现力扩展策略；该策略默认只对适配家族开放，包括动画风格化、轻中度卡通伤害尺度和反差喜剧策略

如果资产命中判断还没完成，或已经进入剧本改编，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `state.project_status` 已到 `assets_checked`，且总控路由的 `state.next_stage` 为 `scene-design-builder`。
2. 先检查 `confirmations.style_family_confirmed.status`、`confirmations.style_confirmed.status`、`project_config.style_family` 与 `project_config.director_style_id`。若风格家族或风格包尚未正式确认，且不满足“历史项目已具备完整风格字段”的兼容条件，必须输出阻塞补丁并返回 `scene-topic-gate`，不得继续设计阶段。
3. 采用 `compact` 上下文预算：只读取 `PROJECT_BOARD.md`、本 Skill、`references/output-contract.md`、`scene-reference-decider` 的边界和 `creative_direction_context`、`scene-story-development` 的故事骨架、`scene-asset-checker` 的复用结论；若 `project_config.director_style_id` / `style_profile_path` 已存在，先读 `style_profiles/style_registry.md` 与当前 `style_profile_path`，再按需读取当前风格包；执行期读取边界同时遵循仓库根 `AGENTS.md`。
4. 如果项目已经确认导演风格包，优先读取：
   - `style_profiles/<director_style_id>/profile.md`
   - `style_profiles/<director_style_id>/visual_language.md`
   - `style_profiles/<director_style_id>/lighting_language.md`
   只读取当前阶段必需文件，不得顺手读取整个风格包 7 个文件；若风格包字段缺失，只允许输出阻塞或兼容性异常说明；不得静默回退到 `pixar_like` 继续设计。
5. 如果当前 `style_family` 属于 `3d_animation`、`2d_animation`，或当前风格包明确允许夸张风格化扩展的 `hybrid / motion_comic`，且项目确实需要轻中度卡通伤害尺度或反差喜剧策略，可按需读取：
   - `assets/animation-stylization/effect-library.md`
   - `assets/animation-stylization/contrast-comedy-library.md`
   只能读取与当前设计决策有关的资产库，不得全仓库扫描。
6. 读取 `references/output-contract.md`，确认制作档位、参考强度、输出落点、风格包字段和 `expressive_animation_design` 输出字段。
7. 在正式产出锁定卡和 prompt 前，先输出“设计方向预览”，至少包含角色方向候选、场景道具清单、统一视觉语言基线、参考强度、当前已确认的 `director_style_id`、角色/场景/道具输出清单、这些设计分别服务哪些 Story Beat / story function、`script_strategy` / `creative_direction_context` 继承方式、表现力扩展策略和需要用户确认的问题。
8. 等待用户明确确认设计方向；用户纠错或补充偏好不等于授权落盘。
9. 用户确认后，判断本次走“轻量锁定卡”还是“完整设定”路径。
10. 定义本次项目的统一视觉语言基线，包括形状语言、剪影锚点、比例策略、材质策略、色彩剧本和场景设计化规则；若已存在风格包，则必须继承其中的 `visual_language` 与 `lighting_language`。
11. 若当前 `style_family` 适合启用表现力扩展，再定义本次项目的 `expressive_animation_design`：风格化档位、允许的动作物理、轻中度卡通伤害尺度、反差喜剧密度、禁用项和执行期资产库引用；若不适合，则显式写明关闭或仅保留轻量局部策略。
12. 为角色、场景和关键道具分别产出统一的锁定摘要、风格约束和复用说明；三者都必须继承同一套视觉语言基线，而 `expressive_animation` 只在当前家族允许时作为扩展层继承。
13. 对存在明确空间调度需求的项目，补 `details/design/space_continuity_seed_v*.md`，写清空间锚点、重复地标、出入口逻辑和后续需要优先保留的朝向/轴线。
14. 先为每个核心角色写入单角色角色说明书，写入 `details/角色说明书_角色名_v*.md`；说明书应把身份档案、多视角、表情系统、动作姿态、关键道具交互、细节区、比例对照和边界约束组织成制作资料板结构，并作为后续角色图最终提示词的最高规范源和角色设计基线版本。
15. 基于角色说明书和统一视觉语言，产出可直接生成角色说明书板、场景图、空间站位图和道具图的最终提示词文件，写入 `outputs/design_prompts/`；角色提示词必须明确要求“角色说明书板 / character bible sheet / character design board”，而不是单张海报式图片，也不得为了压缩而丢掉角色说明书里的关键结构和细节；`outputs/design_prompts/角色说明书图片提示词_v*.md` 默认就应是完整终稿，而不是摘要壳。
16. 对较长的角色/场景/道具锁定卡正文，写入 `details/`；黑板里只保留摘要和引用路径。
17. 输出单个 YAML 补丁块，并给出下一阶段的剧本改编注意事项。
18. 将状态推进建议交回总控 Skill，进入 `scene-script-adapter`。

## 关键规则

- 本阶段必须先给设计方向预览，用户确认后才生成正式锁定卡和 prompt 文件。
- 若本项目启用 `expressive_animation`，设计方向预览必须包含其与当前 `style_family` 的适配理由、风格化档位、伤害尺度和反差喜剧策略，并等待用户确认。
- 重点制作池优先产出完整角色说明书和完整场景设定。
- 快速制作池优先产出精简角色说明书和轻量场景锁定卡。
- 角色参考强度分为：高锚点参考型 / 中度参考型 / 低参考原创转译型。
- 生成 prompt 时，必须优先读取当前 `director_style_id` 对应风格包中的视觉锚词、材质锚词、灯光锚词和板式锚词；若当前项目未提供风格包字段，必须阻塞并返回风格确认，不得静默回退到 `pixar_like` 继续设计。发布文案和对外包装仍尽量避免品牌绑定词。
- 输出必须优先服务生成链路：拿到 prompt 文件就能直接在外部平台生成角色说明书板、场景设定图、道具设定图或全场景资产总参考图。
- 对多角色、多道具或镜头调度复杂的项目，必须额外产出“空间站位图提示词”，目标是生成一张面向模型理解的站位参考图，而不是气氛海报。
- 角色说明书图片最终提示词必须以 `details/角色说明书_角色名_v*.md` 为最高规范源，允许展开和重组，但不允许比角色说明书本身更短、更弱或更失真。
- `outputs/design_prompts/角色说明书图片提示词_v*.md` 默认应覆盖角色说明书中的身份、外形、材质、服装、配件、表情系统、动作姿态、版式要求、文字信息区、关键道具交互和边界约束；允许重排，不允许降级。
- 角色说明书板默认允许包含板块标题、编号和说明文字；只有用户明确要求时，才额外输出无文字干净参考图 prompt。
- 角色说明书板默认必须保留角色名称和基础身份信息区，便于后续参考、复用和一致性校对；除非用户明确要求无字版，否则不得主动去字。
- 角色说明书板默认要求包含多视角、轮廓剪影、表情区、微表情区、动作姿态区、服装配件细节区，不能退化成单张站姿人像。
- 角色说明书板必须故事骨架驱动，包含 6 到 9 个剧情表情、2 到 4 个微表情、4 到 6 个剧情动作姿态、关键道具交互姿态、角色比例对照、物理与安全边界。
- 图片生成最终提示词以中文为主、英文锚词为辅，不需要刻意模仿某个平台口癖；重点是把结构、分区和约束写清楚，并保持可直接复制使用。
- 角色图最终提示词默认不做“模型分流”或激进压缩，不把兼容旧平台的短 prompt 当成主交付。
- 若当前家族允许启用 `expressive_animation`，角色、场景和关键道具必须继承 `expressive_animation_design` 中的动作物理边界、轻中度卡通伤害尺度和反差喜剧密度规则；否则不得强行套用这些动画扩展规则。
- `rewrite_adaptation` 模式下，设计方向必须围绕用户已选 adaptation direction 和已确认 story beats。
- `preserve_original` 模式下，设计方向必须围绕原始剧情/桥段和已确认 story beats，不得重新发散新的改写方向。
- 反差喜剧设计必须服务角色、故事、情绪转折或视觉 payoff，不能随机堆梗。
- 轻中度卡通伤害允许，但必须禁止大量流血、写实伤口、身体恐怖和持续痛苦。
- 本阶段必须服从已确认的 `style_family`；不得把真人电影感、动态漫画或混合形态项目默认翻译成动画角色设计。
- 任何角色都必须先过一轮风格角色设计判断：形状语言、比例策略、剪影锚点、表情系统、材质方向，不能只堆服装和年龄描述。
- 场景和关键道具必须过统一视觉语言判断，不能只有人物进入了已确认风格，场景和道具却像普通背景图或商品图。
- 必须优先考虑“全场景资产总参考图 / Master Scene-Prop Reference Board”，把主场景、角色站位、核心道具位置、道具状态矩阵和物理说明整合到一个可供后续多图参考的总 prompt 中。
- 空间站位图提示词必须用模型更容易稳定继承的方式表达站位：优先使用俯视 / 半俯视、左 / 右 / 前 / 后、中心轴线、入口 / 出口、允许移动区、禁止区、核心道具默认位置和相对距离，不写模糊的人类叙事式站位说明。
- 核心道具必须建立状态机，至少说明状态变化、可见证据、允许交互和安全边界。
- 多角色、多段或空间关系复杂的项目必须补 `space_continuity_seed_v*.md`，供剧本、分镜和视频提示词继承。
- 多角色项目必须输出初版 `blocking_map` 与 `faction_layout`，说明默认站位、允许区域和禁止区域，供分镜与视频提示词继承。
- 分镜和视频提示词如果出现角色或物体站位漂移，应优先回看并继承空间站位图提示词，而不是只靠文本补救。
- 角色设计一旦确认，即视为当前项目的基线版本；剧本、表演、分镜和视频提示词阶段只能提出设计修正请求，不得静默重设计角色。
- 下游若发现表情、动作、识别锚点、配件稳定性、站位识别或多镜头连续性不足，只能按“补充型 / 功能型 / 连续性型”反馈回设计阶段，形成增量版本如 `v1.1 / v1.2`。
- 若下游反馈触及脸型、发型主轮廓、服装主配色、角色气质、核心身份锚点等大改动，必须回到设计确认，不得由下游阶段直接覆盖原角色设定。
- 本技能输出的核心不只是“某个角色长什么样”，而是“这一整个视觉宇宙遵循什么电影级设计语言”。

## 参考资料

- `references/output-contract.md`：设计输出形态、参考强度、`expressive_animation_design` 和落盘约定
