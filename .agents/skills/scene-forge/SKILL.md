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
projects/<project>/PROJECT_BOARD.md
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
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
```

## 新项目初始化

1. 如果用户表达了制作意图但没有现成项目，创建 `projects/<project>/PROJECT_BOARD.md`。
2. 初始化时必须复制 `references/project-board-template.md` 的当前轻黑板模板。
3. 写入 `project.name`、`project.slug`、`project.created_at`、`project.updated_at`。
4. 默认为：
   - `state.project_status: draft`
   - `state.next_stage: scene-topic-gate`
   - `state.lifecycle_flag: active`
5. 若输入是视频源，改为：
   - `state.next_stage: scene-video-intake`
   - `routing.current_stage: scene-video-intake`
   - `routing.allowed_next_stages: [scene-video-intake]`
6. 不得伪造任何确认状态。

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
