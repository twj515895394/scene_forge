---
name: scene-forge
description: 当用户想用 SceneForge 制作、改编、推进或管理某个片段、桥段或短视频项目时使用。负责项目识别、阶段路由、补丁合并和状态推进。
---

# scene-forge

SceneForge 总控入口 Skill。只负责：

1. 识别或初始化项目
2. 读取 `PROJECT_BOARD.md`
3. 判断当前阶段与阻塞
4. 选择唯一一个当前可执行子 Skill
5. 合并该阶段的轻量补丁
6. 推进状态机

总控不直接产出剧本、分镜、声音方案或视频 Prompt 正文。

执行期通用约束见仓库根 `AGENTS.md`；本文件只补总控特有边界和状态机规则。

## 何时使用

以下场景优先触发本 Skill：

- 用户想新建 `projects/*` 项目
- 用户想继续推进某个已有项目
- 用户说“继续”“下一步”“推进这个项目”
- 用户上传视频文件、视频链接、短视频链接或截图序列，希望基于该 source 制作
- 用户想查看当前项目卡在哪一阶段
- 用户要把某个子 Skill 的结果合并回 `PROJECT_BOARD.md`

如果用户只是讨论单个字段命名或单份产物内容，不必强制走总控。

## 运行前必读

总控运行时至少读取：

```text
projects/PROJECT_INDEX.md
projects/<project>/PROJECT_BOARD.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
.agents/skills/scene-forge/references/project-index-template.md
```

如涉及视频源路由，还读取：

```text
.agents/skills/scene-forge/references/video-intake-routing-v6.md
```

运行时禁止把以下路径当作执行上下文：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
projects/ 下当前项目之外的任何兄弟项目目录
```

总控额外硬限制：

1. 未经用户明确要求，不得检索“是否存在类似项目”。
2. 不得为了复用、对比、找灵感或补全信息而扫描其他 `projects/*` 项目目录。
3. 风格候选与风格确认默认依赖 `style_profiles/style_registry.md` 和当前项目黑板，不得通过遍历全部 `style_profiles/*` 或其他项目产物来补上下文。

## 项目发现规则

当用户没有明确给出 `project slug` 时，总控必须按以下顺序做项目发现：

1. 先读取 `projects/PROJECT_INDEX.md`
2. 只基于全局索引里的短字段做匹配：
   - `project_slug`
   - `project_name`
   - `aliases`
   - `tags`
   - `topic_summary`
   - `project_status`
   - `next_stage`
3. 若全局索引没有高置信命中，默认按“新项目”处理，不得为了模糊匹配去扫描全部 `PROJECT_BOARD.md`
4. 若全局索引命中单个高相关项目，只允许继续读取该项目的 `projects/<project>/PROJECT_INDEX.md`
5. 只有在用户明确要继续该项目，或项目命中已足够明确时，才允许读取该项目的 `PROJECT_BOARD.md`
6. 没有 `projects/<project>/PROJECT_INDEX.md` 的项目，默认不参与自动命中；只有用户明确点名该项目时，才允许直接读取它的 `PROJECT_BOARD.md`

项目索引不是状态源，只是发现与路由加速层；正式状态仍只认 `PROJECT_BOARD.md`。

## 新项目初始化

1. 如果用户表达了制作意图但没有现成项目，创建 `projects/<project>/PROJECT_BOARD.md`。
2. 同时创建 `projects/<project>/PROJECT_INDEX.md`。
3. 初始化时必须复制 `references/project-board-template.md` 的当前轻黑板模板。
4. 项目轻索引必须复制 `references/project-index-template.md` 的当前模板。
5. 写入 `project.name`、`project.slug`、`project.created_at`、`project.updated_at`。
6. 默认为：
   - `state.project_status: draft`
   - `state.next_stage: scene-topic-gate`
   - `state.lifecycle_flag: active`
7. 若输入是视频源，改为：
   - `state.next_stage: scene-video-intake`
   - `routing.current_stage: scene-video-intake`
   - `routing.allowed_next_stages: [scene-video-intake]`
8. 不得伪造任何确认状态。
9. 新建项目后必须同步更新 `projects/PROJECT_INDEX.md`，不得只建黑板不建索引。

## 总控读取规则

总控先看：

```yaml
state:
  project_status:
  next_stage:
  lifecycle_flag:
  blocker_note:
```

再看：

```yaml
routing:
  current_stage:
  allowed_next_stages:
  last_completed_stage:
  route_reason:
```

以及当前阶段和上游阶段的：

```yaml
stage_index.<stage>.summary
stage_index.<stage>.files
stage_index.<stage>.read_policy
```

总控不从黑板读取完整正文；正文只通过 `stage_index.<stage>.files.*` 指向的项目文件按需读取。

在读取黑板之前，总控应优先使用：

```text
projects/PROJECT_INDEX.md
projects/<project>/PROJECT_INDEX.md
```

来完成项目发现、项目选择和“是否续写旧项目”的初判。

若项目已确认导演风格包，总控的风格读取顺序固定为：

1. `style_profiles/style_registry.md`
2. `project_config.style_profile_path`
3. 当前阶段实际需要的 `required_profile_files`

总控不得默认读取：

- 全部风格目录
- 当前风格包全部 7 个文件
- 其他项目里的任何风格使用实例

## 路由规则

### 主规则

1. `state.next_stage` 是唯一准入条件。
2. 用户说“继续”时，只允许执行 `state.next_stage`。
3. 不得一口气连跑多个阶段。
4. 不得跳过当前协议要求的中间阶段。

### 视频源规则

1. 若输入是视频源，且 `stage_index.source_intake.status != completed`，优先进入 `scene-video-intake`。
2. `scene-video-intake` 完成后，下一步推进到 `scene-topic-gate`。
3. source 相关长解析只允许存在于 `inputs/source_intake/`，黑板只保留摘要和文件索引。

### Story-Driven 规则

1. `reference_decided` 后必须先进入 `scene-story-development`。
2. `story_developed` 前不得进入 `scene-asset-checker`、`scene-design-builder` 或 `scene-script-adapter`。
3. `scene-script-adapter` 只负责正式剧本整合，不重新发散故事方向。

## 确认闸门

以下阶段默认先出预览，再等用户确认，确认后才允许写正式文件或推进状态：

- `scene-story-development`
- `scene-script-adapter`
- `scene-design-builder`
- `scene-performance-director`
- `scene-storyboard-director`
- `scene-audio-director`
- `scene-video-prompt-builder`
- `scene-publish-review`

用户纠错、比较方案、补充偏好或指出问题，不等于授权落盘。只有明确表达“确认 / 采用 / 按这个生成 / 落盘 / 写入 / 继续执行该阶段”时，才可写正式产物。
确认默认只绑定当前阶段预览，不得自动扩展为后续阶段授权。
例如：

- 确认 `scene-storyboard-director` 预览，只允许正式落盘故事板相关产物，并把 `state.next_stage` 推进到 `scene-audio-director`
- 不得把这次确认同时视为对 `scene-audio-director`、`scene-video-prompt-builder` 或 `scene-publish-review` 的授权
- 用户只说“确认”而未点名阶段时，默认解释为确认当前 `state.next_stage` 对应阶段的预览，而不是整条后续流水线
- 用户明确要求“继续下一阶段”时，也只允许执行一个下一阶段，不得一口气连续跑完多个确认型阶段

## 剧本模式与 source 改写方向

总控负责守住以下闸门：

1. `state.project_status = topic_scored` 后，如果项目需要正式继续推进，先确认剧本模式：
   - `rewrite_adaptation`
   - `preserve_original`
2. 若项目来自视频源且 `rewrite_adaptation`，在进入 `scene-reference-decider` 前必须先确认已选改写方向。
3. 若 `preserve_original`，改写方向候选仅作参考，不得继续作为阻塞条件。
4. 这些信息不再写回黑板顶层大字段，而是：
   - 项目级摘要进入 `cross_stage_summary.source_adaptation_mode`
   - 正式说明进入相关阶段正文
   - 当前状态通过 `stage_index.source_intake` 和 `stage_index.topic` 摘要暴露

## 风格确认闭环

总控负责守住以下口径：

1. `scene-topic-gate` 必须先给出风格大类建议与导演风格建议，并在用户继续推进前完成第一版正式风格确认闭环。
2. 第一确认层是 `style_family`；第二确认层才是 `director_style_id`。第一版正式风格确认点前移到 `scene-topic-gate`；确认后由该阶段回写 `director_style_id / director_style_version / style_family / style_profile_path`，并把 `confirmations.style_family_confirmed.status` 与 `confirmations.style_confirmed.status` 设为 `confirmed`。
3. `scene-design-builder` 之前若 `project_config.style_family` 仍为空，或 `confirmations.style_family_confirmed.status != confirmed`，总控不得继续推进到设计阶段；若具体风格包也为空或未确认，同样不得推进。
4. `scene-script-adapter` 负责继承已确认风格包；只有用户明确要求改风格，才允许该阶段提出重新确认，并显式覆盖黑板中的风格字段。
5. 若阶段产物发生默认回退，相关阶段摘要必须显式记录 `used_default_fallback` 或等价说明，避免把回退结果伪装成正式风格选择。
6. 对历史项目兼容执行以下保守规则：若 `confirmations.style_family_confirmed` 或 `confirmations.style_confirmed` 缺失，但 `director_style_id / director_style_version / style_family / style_profile_path` 四个字段齐全，则可视为 `legacy confirmed`，不得因此阻塞执行。

## 轻黑板合并规则

子 Skill 只允许返回单阶段补丁：

```yaml
patch_type:
stage:
version:
status:
updated_at:
summary:
board_updates:
  state:
  routing:
  project_config:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created: []
files_updated: []
next_action:
```

总控合并时遵守：

1. 只合并 `board_updates`
2. 只登记 `files_created` / `files_updated`
3. 只向 `stage_patches` 写入补丁摘要和文件变化
4. 拒绝任何完整正文直接写入黑板
5. 若子 Skill 同时给出正文和黑板更新，必须保证“先写正文文件，再回写索引”

## 阶段推进

阶段完成后，总控同步更新：

```yaml
state:
routing:
active_versions:
stage_index:
cross_stage_summary:
read_policy:
stage_patches:
```

具体要求：

1. `state.project_status` 只表达主流程阶段
2. `state.next_stage` 指向唯一下一步
3. `routing.last_completed_stage` 记录刚完成的阶段
4. `stage_index.<stage>.status`、`active_version`、`summary`、`files` 必须与产物一致
5. `cross_stage_summary` 只写极短摘要，不写大表
6. 每次项目状态推进后，必须同步更新 `projects/<project>/PROJECT_INDEX.md` 与 `projects/PROJECT_INDEX.md`

## 与子 Skill 的衔接约定

总控默认要求当前子 Skill：

1. 读取 `PROJECT_BOARD.md` 新结构
2. 读取自己的 `references/output-contract.md`
3. 默认读取上一阶段 `handoff` 或 `primary` 文件
4. 需要深读 `details/` 或大资产库时说明原因
5. 不得改写其他阶段正文
6. 不得重写整份黑板

## 典型主流程

普通文字输入：

1. `scene-topic-gate`
2. `scene-reference-decider`
3. `scene-story-development`
4. `scene-asset-checker`
5. `scene-design-builder`
6. `scene-script-adapter`
7. `scene-performance-director`
8. `scene-storyboard-director`
9. `scene-audio-director`
10. `scene-video-prompt-builder`
11. `scene-publish-review`

视频源输入：

1. `scene-video-intake`
2. `scene-topic-gate`
3. `scene-reference-decider`
4. `scene-story-development`
5. `scene-asset-checker`
6. `scene-design-builder`
7. `scene-script-adapter`
8. `scene-performance-director`
9. `scene-storyboard-director`
10. `scene-audio-director`
11. `scene-video-prompt-builder`
12. `scene-publish-review`

真实执行仍以 `state.next_stage` 为唯一准入条件，上面只表示合法顺序。

## 关键规则

- 只承认一个唯一状态源：`PROJECT_BOARD.md`
- 只执行 `state.next_stage`
- 视频源项目先走 `scene-video-intake`
- `docs/` 与 `.handoff/` 不进入运行时上下文
- 子 Skill 只输出轻量补丁，不直接重写整份黑板
- 黑板只做状态机、索引、摘要、路由和确认记录
