---
name: scene-design-builder
description: 当用户要为 SceneForge 项目生成角色与场景的风格化设定，并根据制作档位产出轻量锁定卡或完整设定时应使用此技能。
---

# scene-design-builder

为 SceneForge 项目生成角色、场景、关键道具和空间连续性的视觉设定，并产出可直接用于外部图像平台的设计 prompt。SceneForge 只输出提示词和制作说明，不声称已经生成图片。

执行期通用约束见仓库根 `AGENTS.md`。本技能只定义 design 阶段的路由、读取边界、执行顺序和强制交付。用户可读说明与正式产物默认中文主导。

## 必读参考

执行本技能时默认按顺序读取：

1. `references/workflow.md`
2. `references/required-deliverables.md`
3. `references/review-checklist.md`
4. `references/design-prompt-template.md`

`references/output-contract.md` 已降级为短机器契约，只在修复字段、实现 validator、排查 board/manifest 漂移时按需读取。

## 何时使用

在以下场景使用：

- 总控发现当前项目 `state.next_stage` 为 `scene-design-builder`。
- 已完成资产复用判断，需要为角色、场景和关键道具生成本次项目可执行的视觉设定。
- 需要把故事骨架、参考边界、风格包和资产复用结论合并成统一设计结果。
- 需要产出角色说明书板、场景图、空间站位图、道具图或全场景资产总参考图 prompt。

如果资产命中判断、风格家族或导演风格包尚未确认，先阻塞并返回上游确认。

## 输入边界

默认只读取：

- 当前项目 `PROJECT_BOARD.md`
- 本技能和上述 references
- `outputs/reference.md`
- `outputs/story.md`
- `outputs/assets.md`
- 当前风格包的 `profile.md`、`visual_language.md`、`lighting_language.md`
- 与表现力扩展直接相关的资产库目标章节

不要扫描其他项目、历史产物或整个 `docs/`。需要额外读取资产库时，先说明原因，并只读取当前设计决策所需章节。

## 执行链

必须按以下顺序产出，不能跳步：

```text
reference / story / assets / style profile
-> design direction preview
-> visual_language baseline
-> character design bible files
-> scene design file
-> prop design file
-> space_continuity_seed
-> design prompt files
-> design review
```

## 确认闸门

正式落盘前先输出设计方向预览，至少包含：

- 角色方向候选
- 场景与关键道具清单
- 统一视觉语言基线
- 当前 `director_style_id`
- 角色/场景/道具输出清单
- 设计分别服务哪些 Story Beat / story function
- 表现力扩展策略
- 需要用户确认的问题

快速执行模式下，必须等待用户确认当前 design 方案。全自动模式只有在总控注入的 `execution_policy.mode = full_auto` 且前置解锁条件满足时，才可跳过确认。

## 强制交付

正式完成前必须真实落盘并注册以下文件，不能只在主文件中声明路径：

- `outputs/design.md`
- `details/design/character_design_*_v*.md` 或 `details/角色说明书_*_v*.md`
- `details/design/scene_design_v*.md`
- `details/design/prop_design_v*.md`
- `details/design/space_continuity_seed_v*.md`
- `outputs/design_prompts/角色说明书图片提示词_v*.md`
- `outputs/design_prompts/全场景资产总参考图提示词_v*.md`

多角色、复杂空间或高漂移风险项目还应产出：

- `outputs/design_prompts/空间站位图提示词_v*.md`

角色说明书图片 prompt 必须中文主导，目标是角色说明书板，不是单张海报式角色图。

## 完成前 review

写文件后、推进状态前，按 `references/review-checklist.md` 自检。若发现结构性缺失，只允许补结构、补缺失文件、补注册和索引；不得悄悄改动用户已确认的创作方向、风格包、角色身份、故事功能或参考边界。

若 auto-fix 后仍缺正式主交付必需元素，本阶段必须保持 failed 或 pending confirmation，不得推进。

## 输出

输出单个 YAML 补丁块：

```yaml
patch_type: scene-design-builder
stage: scene-design-builder
version:
status: pending | in_progress | completed | blocked | failed
summary:
board_updates:
files_created:
files_updated:
next_action:
```

黑板只记录状态、摘要、索引和路径；完整设计正文和 prompt 必须落到实际文件。
