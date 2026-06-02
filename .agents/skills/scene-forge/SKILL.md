---
name: scene-forge
description: 当用户想用 SceneForge 制作、改编、推进或管理某个片段/桥段/短视频项目时应使用此技能，包括从一句自然语言创作意图开始建项、判断当前阶段、或编排 SceneForge 子 Skill。
---

# scene-forge

SceneForge 总控入口 Skill。只负责项目识别、路由、编排、状态合并和阶段推进，不直接产出具体内容成品。

SceneForge 当前只负责输出提示词、制作说明、结构化方案和项目文档；不负责生成图片、视频或音频。对话中不得声称“已经生成图片/视频/音频”，只能表述为“已生成用于外部平台制作的提示词”。

## 何时使用

只要用户表达的是“想做一个 SceneForge 创作项目 / 推进一个 SceneForge 项目 / 基于某个内容制作视频或提示词链路”，都应优先触发本技能。

典型触发场景包括但不限于：

- 用户说“我想制作某个片段”
- 用户说“根据某个影视桥段 / 热点事件 / 原著内容做一个视频”
- 用户说“帮我把这个桥段做成 3D 动画 / 动画电影风格 / 短视频”
- 用户提供一个链接、截图、台词、剧情梗概或片段名，希望判断能不能做
- 用户想新建 `projects/*` 项目
- 用户想继续推进某个已有项目
- 用户说“继续”“下一步”“推进这个项目”
- 用户要判断当前项目处于哪个阶段
- 用户要在多个 SceneForge 子 Skill 之间切换
- 用户要把子 Skill 结果合并回 `PROJECT_BOARD.md`
- 用户要生成角色设定图 prompt、场景道具 prompt、故事板 prompt、视频分段 prompt 或发布文案
- 用户要检查某个项目的黑板状态、阻塞原因、下一阶段或产物路径

如果用户只是讨论某个单一字段、协议命名或模板细节，且没有要新建或推进项目，不需要优先触发本技能。

## 执行步骤

1. 判断用户意图是否已对应到某个现有项目。
2. 如果没有现有项目但用户表达了制作意图，应进入新项目初始化或 `scene-topic-gate`。新项目初始化时读取 `references/project-board-template.md`，复制模板到 `projects/<project>/PROJECT_BOARD.md`，写入 `project_name`、`created_at`、`updated_at`，不得伪造用户确认。
3. 读取目标项目的 `PROJECT_BOARD.md`；如果用户没有指定项目且无法从上下文判断，先确认目标项目目录或为新项目生成候选目录名。
4. 读取 `references/board-protocol.md`，确认顶层索引字段、阶段补丁壳、主状态机、上下文读取边界和确认闸门规则。
5. 如果项目包含或即将定义 `reference_policy`，读取 `references/open-reference.md`，确认模板、示例、枚举和 pattern 都是参考锚点，不是封闭集合。
6. 如果项目包含或即将定义 `expressive_animation`，读取 `references/expressive-animation-protocol.md`，只理解顶层字段、阶段分工、资产读取白名单和负向边界；总控不得代替子 Skill 设计具体镜头、表演或 prompt。
7. 如果项目包含 `storyboard_director_v5`，只理解该字段的启用状态、确认状态、资产读取白名单和分镜增强职责；总控不得代替分镜导演生成具体镜头语言。
8. 根据 `project_status`、`next_stage`、`lifecycle_flag` 判断当前阶段和是否存在阻塞。
9. 只选择 `PROJECT_BOARD.md` 中 `next_stage` 指向的一个子 Skill；不得跳过、推断替换或同时展开多个阶段。
10. 如果用户只说“继续”，只能解释为执行当前 `next_stage`；不得一口气连跑多个阶段。
11. 要求子 Skill 只产出该阶段的 YAML 补丁块，不要重写整份黑板。
12. 阶段涉及剧本、角色/场景道具、故事板、视频提示词、`expressive_animation` 或 `storyboard_director_v5` 等核心创作决策时，必须先输出方案预览或候选方向，并等待用户明确确认后再落盘正式文件。
13. 用户纠错、补充偏好或指出问题，不等于授权落盘；只有用户明确表达“确认/采用/按这个生成/落盘/写入”时，才可以写入正式文件或推进状态。
14. 将子 Skill 结果合并回 `PROJECT_BOARD.md`，并同步更新顶层索引字段。
15. 在阶段完成后推进 `project_status` 和 `next_stage`；如果存在真实阻塞，再写 `blocker_note`。

## 编排顺序

默认主流程顺序如下：

1. `scene-topic-gate`
2. `scene-reference-decider`
3. `scene-asset-checker`
4. `scene-design-builder`
5. `scene-script-adapter`
6. `scene-performance-director`
7. `scene-storyboard-director`
8. `scene-audio-director`
9. `scene-video-prompt-builder`
10. `scene-publish-review`

说明：真实执行顺序以 `PROJECT_BOARD.md` 的 `next_stage` 为唯一准入条件；上面的顺序只用于新项目初始化或协议校验。

## 上下文读取与 Token 预算

默认执行阶段采用 `compact` 预算和最小必要上下文原则：少读但读准，少想但想对，少生成但可控。

默认只读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
当前阶段明确依赖的输入文件
```

总控可额外读取：

```text
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/display-conventions.md
.agents/skills/scene-forge/references/open-reference.md
.agents/skills/scene-forge/references/expressive-animation-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

当当前阶段确实需要 v4 表现力扩展时，子 Skill 可按需读取以下执行期资产库：

```text
assets/animation-stylization/effect-library.md
assets/animation-stylization/contrast-comedy-library.md
```

当当前阶段确实需要 v5 镜头语言增强时，`scene-storyboard-director` 和 `scene-video-prompt-builder` 可按需读取以下执行期资产库：

```text
assets/cinematic-language/shot-language-library.md
assets/cinematic-language/animation-film-shot-patterns.md
assets/cinematic-language/animation-comedy-action-patterns.md
```

读取条件：

- 当前阶段需要选择动画物理、VFX、轻中度卡通伤害尺度、反差喜剧模板、镜头语言或分镜 pattern。
- `PROJECT_BOARD.md` 中对应扩展字段 `enabled` 为 `true`，或当前阶段正在定义该字段。
- 读取目的必须服务当前阶段输出，不得全仓库扫描。

运行时禁止任何 Skill 或 Agent 访问：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

说明：`docs/` 只作为人类阅读的说明文档，不作为任何 Skill 或 Agent 的运行时上下文来源。即使 `PROJECT_BOARD.md`、旧文档或用户表达中出现“查看 docs”的说法，SceneForge 执行链路也不得把 `docs/` 纳入阶段执行上下文。`.handoff/` 也只用于人工交接，不作为阶段执行上下文。`assets/animation-stylization/*` 是 v4 明确允许的执行期资产库，但只能按需读取。`assets/cinematic-language/*` 是 v5 明确允许的执行期资产库，主要供分镜与视频提示词阶段按需读取。

## 开放参考原则

所有模板、示例、枚举、资产库 pattern 和 prompt fragment 都是参考锚点，不是封闭集合。

- 如果参考项高度匹配，使用 `selection_mode: reference`。
- 如果参考项部分匹配，使用 `selection_mode: adapted_reference`。
- 如果没有合适参考项，使用 `selection_mode: custom_generated`，并说明原因。
- 除非字段明确写明 `strict_enum: true`，否则枚举默认开放。
- 发散生成仍必须遵守确认闸门、运行时读取边界、当前阶段输出协议和安全边界。

## v4 表现力扩展总控规则

`expressive_animation` 是 v4 新增顶层项目记忆字段，用于统一记录：

```yaml
expressive_animation:
  animation_stylization:
  injury_tone_policy:
  contrast_comedy:
```

总控职责：

- 识别并传递 `expressive_animation` 顶层字段。
- 确保当前子 Skill 可按需读取白名单 asset。
- 确保 `docs/` 和 `.handoff/` 不被运行时读取。
- 确保涉及 v4 核心创作决策时仍遵守确认闸门。
- 合并子 Skill 回写的 `expressive_animation` 补丁。

总控不得：

- 替代 `scene-design-builder` 选择具体视觉方案。
- 替代 `scene-script-adapter` 改写 Story Beat。
- 替代 `scene-performance-director` 设计具体表演。
- 替代 `scene-storyboard-director` 设计镜头。
- 替代 `scene-video-prompt-builder` 生成最终 Segment Prompt。
- 默认把所有项目都变成强卡通、强反差或鬼畜风格。

## v5 分镜导演增强总控规则

`storyboard_director_v5` 是 v5 新增顶层项目记忆字段，用于记录专业分镜导演增强策略。

总控职责：

- 识别并传递 `storyboard_director_v5` 顶层字段。
- 确保 `scene-storyboard-director` 可按需读取 `assets/cinematic-language/*`。
- 确保 `scene-video-prompt-builder` 可继承分镜阶段产出的镜头语言字段。
- 确保分镜方案仍先预览、用户确认后落盘。

总控不得：

- 替代分镜导演拆分 `storyboard_content_breakdown`。
- 替代分镜导演生成 `cinematic_language_plan`。
- 默认把每个镜头都套用资产库 pattern。
- 在运行时输出中要求“模仿某部电影镜头”。

## 关键规则

- 只承认一个唯一状态源：`PROJECT_BOARD.md`
- 只执行 `PROJECT_BOARD.md` 中的 `next_stage`
- 用户说“继续”不得连跑多个阶段
- 用户纠错默认不落盘，确认后才落盘
- 新项目初始化必须使用 `references/project-board-template.md`，不得伪造任何用户确认
- 子 Skill 只输出单阶段补丁，不直接重写完整项目黑板
- `project_status` 只表达主流程阶段，不混入异常态
- `blocker_note` 只在真实阻塞时写入
- 运行时禁止读取 `docs/`、`.handoff/` 和历史项目输出
- 默认 `token_budget_level` 为 `compact`
- `assets/animation-stylization/*` 仅作为 v4 执行期资产库按需读取
- `assets/cinematic-language/*` 仅作为 v5 执行期资产库按需读取
- 所有模板、示例、枚举和 pattern 默认仅供参考，不限制 Agent 根据项目语境生成更匹配方案
- 如果协议字段与旧文档冲突，以当前 Skill 的 `references/` 协议为准，不读取 `docs/` 仲裁

## 参考资料

- `references/board-protocol.md`：黑板顶层字段、补丁结构、状态推进规则、上下文读取边界和确认闸门
- `references/project-board-template.md`：新建 `projects/<project>/PROJECT_BOARD.md` 的初始化模板
- `references/display-conventions.md`：中文显示名与英文参数值的统一表达规范
- `references/open-reference.md`：开放参考原则，说明模板、示例、枚举和 pattern 均为参考锚点
- `references/expressive-animation-protocol.md`：v4 表现力扩展字段、资产读取白名单、阶段分工和负向边界
