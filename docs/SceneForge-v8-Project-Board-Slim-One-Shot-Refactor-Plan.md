# SceneForge v8：PROJECT_BOARD 黑板一次性瘦身重构方案

> 版本：v8 / Project Board Slim One-Shot Refactor  
> 日期：2026-06-03  
> 状态：设计方案，尚未执行协议改造  
> 目标：将 `PROJECT_BOARD.md` 从“中重型项目记忆黑板”重构为“轻量状态机 + 阶段索引 + 读取路由表”。

---

## 0. 背景与判断

当前 SceneForge 的黑板协议在原则上已经是轻量设计：

```text
PROJECT_BOARD.md 是项目唯一状态源。黑板只保存顶层索引、跨阶段摘要、确认状态、文件路径和读取策略，不保存长正文。
```

但随着 v4 / v5 / v6 / v8 能力持续增加，实际黑板字段开始变重：

```text
source_intake
expressive_animation
storyboard_director_v5
hero_moments
bridge_shots
prop_state_machines
blocking_map
faction_layout
segment_strategy
未来 storyboard_methodology_v8
```

其中很多字段已经不只是“索引”，而是包含策略、规则、阶段结果、执行细节或跨阶段产物摘要。

如果继续沿用当前做法，后续风险会越来越高：

1. `PROJECT_BOARD.md` 越来越长，Agent 每阶段读取成本上升；
2. 顶层字段越来越多，协议心智负担加重；
3. 阶段产物和项目索引边界混乱；
4. 子 Skill 回写黑板时更容易覆盖、遗漏或污染旧内容；
5. 长项目、多版本、多轮改写时，黑板会变成半文档、半数据库、半状态机的混合体；
6. v8 故事板方法论如果继续直接加入黑板，会进一步放大问题。

因此建议 v8 先做一次 **PROJECT_BOARD 黑板瘦身重构**。

本方案不采用“兼容层逐步迁移”路线，而采用 **一次性切换**：

```text
旧黑板结构
→ 新轻量黑板结构
→ 所有阶段输出改为 detail 文档优先
→ 黑板只保留 status / summary / files / read_policy / confirmation / route
```

---

## 1. 重构目标

### 1.1 一句话目标

```text
PROJECT_BOARD.md 不再保存阶段内容，只保存项目状态、阶段索引、活跃版本、确认状态、文件路径和读取策略。
```

### 1.2 新黑板定位

重构后，`PROJECT_BOARD.md` 只承担五件事：

```text
1. 状态机：当前项目到哪一步了？下一步是谁？是否阻塞？
2. 路由表：当前应该调用哪个 Skill？允许读哪些文件？
3. 阶段索引：每个阶段产物在哪里？当前激活版本是什么？
4. 跨阶段摘要：下游必须知道的极短摘要是什么？
5. 确认记录：哪些关键决策已经被用户确认？
```

### 1.3 明确不再承担

重构后黑板不再保存：

```text
完整剧本；
完整 Story Beat；
完整角色设定；
完整场景设定；
完整道具状态机；
完整 source 视频解析；
完整分镜；
完整故事板 Prompt；
完整视频 Prompt；
完整声音方案；
完整发布文案；
完整质量检查结果；
完整方法论默认策略；
大段 YAML data。
```

这些全部落到阶段产物文档。

---

## 2. 一次性重构原则

本方案明确不走“保留旧字段兼容层”的路线。

原因：

1. 兼容层会让黑板在一段时间内更重；
2. 旧字段和新索引并存会造成双写问题；
3. 子 Skill 容易不知道应该读旧字段还是新字段；
4. 迁移期越长，错误越隐蔽；
5. SceneForge 当前仍处于协议快速迭代阶段，一次性切换成本可接受。

因此采用：

```text
一次性修改 board-protocol；
一次性修改 project-board-template；
一次性修改 scene-forge 总控规则；
一次性修改所有核心 Skill 的读写约定；
新项目只使用新黑板；
旧项目需要迁移脚本或人工迁移，不继续支持旧字段运行。
```

---

## 3. 新黑板总结构

建议新 `PROJECT_BOARD.md` 顶层结构如下：

```yaml
project:
  name:
  slug:
  created_at:
  updated_at:

state:
  project_status:
  next_stage:
  lifecycle_flag:
  blocker_note:

routing:
  current_stage:
  allowed_next_stages:
  last_completed_stage:
  route_reason:

runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    allowed_runtime_asset_paths: []
    forbidden_runtime_paths:
      - docs/
      - .handoff/
      - 会话记录_*.md
      - 历史项目输出
      - 其他无关项目目录
    token_budget:
      default_stage_budget: compact
      require_reason_for_extra_reads: true
  reference_policy:
    templates_are_reference_only: true
    examples_are_reference_only: true
    enums_are_open_by_default: true
    strict_enum_only_when_explicit: true
    allow_adapted_reference: true
    allow_custom_generated_option: true
    require_reason_for_custom_option: true

project_config:
  production_level:
  reference_type:
  adaptation_level:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:

confirmations:
  topic_confirmed:
  reference_confirmed:
  asset_plan_confirmed:
  design_confirmed:
  script_confirmed:
  performance_confirmed:
  storyboard_plan_confirmed:
  audio_plan_confirmed:
  video_prompt_plan_confirmed:
  publish_confirmed:

active_versions:
  source_intake:
  topic:
  reference:
  assets:
  design:
  script:
  performance:
  storyboard:
  audio:
  video_prompts:
  publish:

stage_index:
  source_intake:
  topic:
  reference:
  assets:
  design:
  script:
  performance:
  storyboard:
  audio:
  video_prompts:
  publish:

cross_stage_summary:
  premise:
  core_characters:
  core_scene:
  key_props:
  visual_style:
  segment_strategy:
  continuity_focus:
  current_risks:

read_policy:
  default_read:
  stage_specific_reads:
  deep_read_requires_reason: true

stage_patches:
  - patch_id:
    stage:
    version:
    status:
    updated_at:
    summary:
    files_changed: []
```

---

## 4. 顶层字段保留 / 删除 / 合并规则

### 4.1 直接保留，但换分组

| 旧字段 | 新位置 | 说明 |
|---|---|---|
| `project_name` | `project.name` | 项目信息 |
| `project_status` | `state.project_status` | 状态机核心 |
| `next_stage` | `state.next_stage` | 总控路由核心 |
| `lifecycle_flag` | `state.lifecycle_flag` | 生命周期 |
| `blocker_note` | `state.blocker_note` | 阻塞说明 |
| `production_level` | `project_config.production_level` | 项目配置 |
| `reference_type` | `project_config.reference_type` | 项目配置 |
| `adaptation_level` | `project_config.adaptation_level` | 项目配置 |
| `performance_style` | `project_config.performance_style` | 项目配置 |
| `target_total_duration_seconds` | `project_config.target_total_duration_seconds` | 项目配置 |
| `segment_duration_seconds` | `project_config.segment_duration_seconds` | 项目配置 |
| `context_policy` | `runtime_policy.context_policy` | 运行策略 |
| `reference_policy` | `runtime_policy.reference_policy` | 开放参考原则 |
| `user_confirmations` | `confirmations` | 确认状态 |
| `stage_patches` | `stage_patches` | 保留但瘦身 |

### 4.2 直接删除顶层字段，迁移为阶段文件索引

| 旧字段 | 新位置 | 说明 |
|---|---|---|
| `source_intake` | `stage_index.source_intake` + `details/source_intake/*` | 黑板只保留文件索引和摘要 |
| `segment_strategy` | `stage_index.script.files.segment_strategy` 或 `cross_stage_summary.segment_strategy` | 不再顶层展开 |
| `hero_moments` | `stage_index.storyboard.files.hero_moments` | 不再顶层保存 |
| `bridge_shots` | `stage_index.storyboard.files.bridge_shots` | 不再顶层保存 |
| `prop_state_machines` | `stage_index.design.files.prop_state_machines` 或 `stage_index.storyboard.files.prop_state_usage` | 不再顶层保存 |
| `blocking_map` | `stage_index.design.files.blocking_map` | 不再顶层保存 |
| `faction_layout` | `stage_index.design.files.faction_layout` | 不再顶层保存 |
| `expressive_animation` | `stage_index.design.files.expressive_animation_policy` | 不再顶层保存完整策略 |
| `storyboard_director_v5` | `stage_index.storyboard.files.storyboard_system_config` | 不再顶层保存完整策略 |
| `storyboard_methodology_v8` | `stage_index.storyboard.files.storyboard_methodology_config` | 不进入顶层大字段 |

### 4.3 新增字段

新增：

```yaml
routing:
active_versions:
stage_index:
cross_stage_summary:
read_policy:
```

其中 `stage_index` 是本次瘦身的核心。

---

## 5. `stage_index` 标准结构

每个阶段统一使用以下结构：

```yaml
stage_index:
  <stage_key>:
    status: not_started | in_progress | completed | blocked | skipped
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
      deep_read:
      never_read_by_default:
    next_action:
```

示例：

```yaml
stage_index:
  storyboard:
    status: completed
    active_version: v3
    summary: 已完成 6 个视频生成单元、42 个 Shot、8 个 Bridge Shot；高风险片段已生成控制版和风格版故事板 Prompt。
    updated_at: 2026-06-03
    files:
      index: details/storyboard/storyboard_index_v3.md
      primary: details/storyboard/shotlist_v3.md
      details:
        - details/storyboard/video_generation_units_v3.md
        - details/storyboard/continuity_maps_v3.md
        - details/storyboard/hero_moments_v3.md
        - details/storyboard/bridge_shots_v3.md
      outputs:
        - outputs/storyboard_prompts/control_storyboard_prompt_v3.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v3.md
      handoff: details/storyboard/storyboard_to_audio_handoff_v3.md
      quality_check: details/storyboard/storyboard_quality_check_v3.md
    read_policy:
      default_read: index + handoff + quality_check_summary
      deep_read:
        - shotlist only when building video prompts
        - continuity maps only when resolving segment connection
      never_read_by_default:
        - full styled storyboard prompt
        - historical storyboard versions
    next_action: scene-audio-director
```

---

## 6. 阶段产物目录规范

建议项目目录统一为：

```text
projects/<project>/
  PROJECT_BOARD.md
  inputs/
    source_intake/
    references/
    user_materials/
  details/
    topic/
    reference/
    assets/
    design/
    script/
    performance/
    storyboard/
    audio/
    video_prompts/
    publish/
  outputs/
    image_prompts/
    storyboard_prompts/
    video_prompts/
    audio_prompts/
    publish_copy/
  archive/
    old_versions/
```

### 6.1 `details/` 的职责

`details/` 保存阶段内部详细产物：

```text
完整分析；
完整方案；
完整分镜；
完整检查表；
阶段 handoff；
阶段 index；
中间决策记录。
```

### 6.2 `outputs/` 的职责

`outputs/` 保存用户最终可拿去外部平台使用的内容：

```text
角色设定图 Prompt；
场景道具图 Prompt；
故事板图 Prompt；
视频分段 Prompt；
声音 / 音乐 / 拟音 Prompt；
发布文案；
字幕文案；
配音文案。
```

### 6.3 `PROJECT_BOARD.md` 的职责

黑板只保存这些文件路径的索引和极短摘要，不保存正文。

---

## 7. 新阶段补丁格式

旧补丁：

```yaml
patch_type:
version:
status:
updated_at:
summary:
data:
```

新补丁建议改为：

```yaml
patch_type:
stage:
version:
status:
updated_at:
summary:
board_updates:
  state:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created:
  - path:
    purpose:
    version:
files_updated:
  - path:
    purpose:
    version:
next_action:
```

关键变化：

```text
不再允许子 Skill 在 data 中塞完整阶段内容；
子 Skill 必须先写详情文档，再回写 stage_index；
board_updates 只能包含黑板允许字段；
files_created / files_updated 必须列清楚。
```

---

## 8. 各 Skill 一次性改造要求

### 8.1 `scene-forge`

必须修改：

```text
1. 读取新 PROJECT_BOARD 结构；
2. 只根据 state.next_stage 路由；
3. 合并 patch 时只接受 board_updates；
4. 拒绝子 Skill 把完整正文写入黑板；
5. 阶段完成后更新 state、active_versions、stage_index；
6. 创建新项目时使用新模板。
```

### 8.2 `scene-video-intake`

新规则：

```text
完整 source 解析只写 inputs/source_intake/；
黑板只写 stage_index.source_intake；
topic_gate_handoff_summary 不再直接塞入黑板；
需要给 topic gate 的摘要写入 handoff 文件。
```

### 8.3 `scene-topic-gate`

新规则：

```text
读取 stage_index.source_intake.files.handoff 和 priority_map；
输出 topic 评分详情到 details/topic/；
黑板只写 stage_index.topic、score、cross_stage_summary.premise。
```

### 8.4 `scene-reference-decider`

新规则：

```text
完整参考策略写入 details/reference/；
黑板只写 reference_type、adaptation_level 和 stage_index.reference。
```

### 8.5 `scene-asset-checker`

新规则：

```text
完整资产清单写入 details/assets/asset_check_v*.md；
角色 / 场景 / 道具缺口写入 details/assets/asset_gap_report_v*.md；
黑板只写 stage_index.assets 和 cross_stage_summary.core_characters / core_scene / key_props。
```

### 8.6 `scene-design-builder`

新规则：

```text
完整角色设定、场景设定、道具设定、风格设定写入 details/design/；
图像 Prompt 写入 outputs/image_prompts/；
blocking_map、faction_layout、prop_state_machines 写入 details/design/；
黑板只写 stage_index.design 和 cross_stage_summary.visual_style。
```

### 8.7 `scene-script-adapter`

新规则：

```text
完整剧本写入 details/script/script_v*.md；
Story Beat 写入 details/script/story_beats_v*.md；
视频生成单元计划写入 details/script/video_generation_unit_plan_v*.md；
黑板只写 stage_index.script、project_config.target_total_duration_seconds、project_config.segment_duration_seconds、cross_stage_summary.segment_strategy。
```

### 8.8 `scene-performance-director`

新规则：

```text
完整表演表写入 details/performance/performance_sheet_v*.md；
动作链、情绪链写入 details/performance/action_emotion_chains_v*.md；
黑板只写 stage_index.performance。
```

### 8.9 `scene-storyboard-director`

新规则：

```text
完整 shotlist 写入 details/storyboard/shotlist_v*.md；
视频生成单元、首尾锚点、空间连续性地图写入 details/storyboard/；
Hero Moments、Bridge Shots、Blocking 使用、道具状态使用写入 details/storyboard/；
故事板 Prompt 写入 outputs/storyboard_prompts/；
质量检查写入 details/storyboard/storyboard_quality_check_v*.md；
黑板只写 stage_index.storyboard 和 cross_stage_summary.continuity_focus。
```

### 8.10 `scene-audio-director`

新规则：

```text
完整声音设计写入 details/audio/audio_plan_v*.md；
音乐 / 拟音 / 配音 Prompt 写入 outputs/audio_prompts/；
黑板只写 stage_index.audio。
```

### 8.11 `scene-video-prompt-builder`

新规则：

```text
完整视频分段 Prompt 写入 outputs/video_prompts/；
模型适配版本写入 outputs/video_prompts/model_adapters/；
Prompt 检查结果写入 details/video_prompts/；
黑板只写 stage_index.video_prompts。
```

### 8.12 `scene-publish-review`

新规则：

```text
发布文案、字幕、标题、封面建议写入 outputs/publish_copy/；
发布检查写入 details/publish/；
黑板只写 stage_index.publish。
```

---

## 9. 新旧字段迁移表

| 旧顶层字段 | 新位置 | 是否保留顶层 |
|---|---|---|
| `project_name` | `project.name` | 否 |
| `project_status` | `state.project_status` | 否 |
| `next_stage` | `state.next_stage` | 否 |
| `lifecycle_flag` | `state.lifecycle_flag` | 否 |
| `blocker_note` | `state.blocker_note` | 否 |
| `score` | `stage_index.topic.summary` + 可选 `cross_stage_summary` | 否 |
| `production_level` | `project_config.production_level` | 否 |
| `reference_type` | `project_config.reference_type` | 否 |
| `adaptation_level` | `project_config.adaptation_level` | 否 |
| `performance_style` | `project_config.performance_style` | 否 |
| `target_total_duration_seconds` | `project_config.target_total_duration_seconds` | 否 |
| `segment_duration_seconds` | `project_config.segment_duration_seconds` | 否 |
| `context_policy` | `runtime_policy.context_policy` | 否 |
| `reference_policy` | `runtime_policy.reference_policy` | 否 |
| `source_intake` | `stage_index.source_intake` + `inputs/source_intake/` | 否 |
| `user_confirmations` | `confirmations` | 否 |
| `segment_strategy` | `details/script/segment_strategy_v*.md` + `cross_stage_summary.segment_strategy` | 否 |
| `hero_moments` | `details/storyboard/hero_moments_v*.md` | 否 |
| `bridge_shots` | `details/storyboard/bridge_shots_v*.md` | 否 |
| `prop_state_machines` | `details/design/prop_state_machines_v*.md` | 否 |
| `blocking_map` | `details/design/blocking_map_v*.md` | 否 |
| `faction_layout` | `details/design/faction_layout_v*.md` | 否 |
| `expressive_animation` | `details/design/expressive_animation_policy_v*.md` | 否 |
| `storyboard_director_v5` | `details/storyboard/storyboard_system_config_v*.md` | 否 |
| `storyboard_methodology_v8` | `details/storyboard/storyboard_methodology_config_v*.md` | 否 |
| `created_at` | `project.created_at` | 否 |
| `updated_at` | `project.updated_at` | 否 |
| `stage_patches` | `stage_patches` 瘦身版 | 是 |

注意：这里的“是否保留顶层”指是否保留旧字段名作为顶层字段。不是说信息丢弃，而是迁移到新位置或外部产物文档。

---

## 10. 一次性切换实施步骤

### Step 1：冻结旧协议

新增说明：

```text
board-protocol v1 frozen
```

旧协议只作为迁移参考，不再作为新项目执行协议。

### Step 2：新增新协议

新增或替换：

```text
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

### Step 3：更新总控 Skill

修改：

```text
.agents/skills/scene-forge/SKILL.md
```

确保总控只认新字段：

```yaml
state.next_stage
state.project_status
stage_index
confirmations
```

### Step 4：更新所有核心子 Skill 输出协议

至少修改：

```text
scene-video-intake
scene-topic-gate
scene-reference-decider
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
scene-storyboard-director
scene-audio-director
scene-video-prompt-builder
scene-publish-review
```

每个 Skill 都必须遵守：

```text
先写 details / outputs 文件；
再回写 board_updates；
不得在 board_updates 中包含完整正文。
```

### Step 5：新建迁移说明

新增：

```text
docs/SceneForge-v8-Project-Board-Migration-Guide.md
```

说明旧项目如何迁移为新结构。

### Step 6：创建示例项目黑板

新增：

```text
projects/_templates/PROJECT_BOARD.slim.md
```

或直接替换当前模板。

### Step 7：跑一个最小项目验证

用一个简单 30 秒短片验证完整链路：

```text
topic -> reference -> asset -> design -> script -> performance -> storyboard -> audio -> video prompts -> publish
```

确认每阶段只更新 `stage_index`，不塞正文。

---

## 11. 错误风险与防护

### 11.1 主要风险

| 风险 | 等级 | 说明 |
|---|---:|---|
| 总控找不到 `next_stage` | 高 | 字段位置改变，必须同步改总控 |
| 子 Skill 仍按旧字段读取 | 高 | 必须一次性改所有 Skill |
| 阶段产物路径不统一 | 中高 | 需要强制目录规范 |
| 旧项目无法继续跑 | 中高 | 一次性切换必然影响旧项目 |
| stage_index 摘要过短导致下游信息不够 | 中 | 需要 handoff 文件补足 |
| 文件写入成功但黑板索引漏写 | 中 | 需要验收 checklist |
| 黑板变轻后深读频率上升 | 中 | 通过 read_policy 控制 |

### 11.2 防护原则

```text
1. 每个阶段必须有 index 文件；
2. 每个阶段必须有 handoff 文件；
3. 黑板 summary 只负责让总控知道状态，不负责让下游完整执行；
4. 下游默认读取上一阶段 handoff，而不是深读完整正文；
5. 需要深读时必须说明原因；
6. 所有 outputs 文件必须被 stage_index 索引；
7. 不允许出现“文件存在但黑板不知道”的孤儿产物；
8. 不允许出现“黑板引用路径但文件不存在”的断链索引。
```

---

## 12. 验收标准

### 12.1 黑板大小验收

新 `PROJECT_BOARD.md` 应满足：

```text
通常不超过 300 行；
不包含完整剧本；
不包含完整分镜；
不包含完整 prompt；
不包含完整 source 解析；
不包含完整策略库内容。
```

### 12.2 字段边界验收

黑板每个阶段只允许包含：

```text
status；
active_version；
summary；
updated_at；
files；
read_policy；
next_action。
```

### 12.3 产物完整性验收

每个阶段至少有：

```text
index 文件；
primary 详情文件；
handoff 文件；
如有最终可用内容，则有 outputs 文件；
如涉及质量检查，则有 quality_check 文件。
```

### 12.4 Skill 行为验收

每个子 Skill：

```text
不重写完整黑板；
不把完整正文写入 board_updates；
只输出阶段 patch；
patch 中必须列出 files_created / files_updated；
patch 中必须更新 stage_index；
patch 中必须给出 next_action。
```

---

## 13. 推荐最终黑板示例

```yaml
project:
  name: 示例项目
  slug: sample-project
  created_at: 2026-06-03
  updated_at: 2026-06-03

state:
  project_status: storyboard_ready
  next_stage: scene-audio-director
  lifecycle_flag: active
  blocker_note:

routing:
  current_stage: scene-audio-director
  last_completed_stage: scene-storyboard-director
  allowed_next_stages:
    - scene-audio-director
  route_reason: 分镜阶段已完成，进入声音设计。

runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    allowed_runtime_asset_paths:
      - assets/animation-stylization/effect-library.md
      - assets/animation-stylization/contrast-comedy-library.md
      - assets/cinematic-language/shot-language-library.md
      - assets/cinematic-language/animation-film-shot-patterns.md
      - assets/cinematic-language/animation-comedy-action-patterns.md
    forbidden_runtime_paths:
      - docs/
      - .handoff/
      - 会话记录_*.md
      - 历史项目输出
      - 其他无关项目目录
    token_budget:
      default_stage_budget: compact
      require_reason_for_extra_reads: true
  reference_policy:
    templates_are_reference_only: true
    examples_are_reference_only: true
    enums_are_open_by_default: true
    strict_enum_only_when_explicit: true

project_config:
  production_level: standard
  reference_type: source_video_adaptation
  adaptation_level: structure_only
  performance_style: cinematic_comedy
  target_total_duration_seconds: 60
  segment_duration_seconds: 10

confirmations:
  topic_confirmed: true
  reference_confirmed: true
  asset_plan_confirmed: true
  design_confirmed: true
  script_confirmed: true
  performance_confirmed: true
  storyboard_plan_confirmed: true
  audio_plan_confirmed: false
  video_prompt_plan_confirmed: false
  publish_confirmed: false

active_versions:
  source_intake: v1
  topic: v1
  reference: v1
  assets: v1
  design: v2
  script: v2
  performance: v1
  storyboard: v3
  audio:
  video_prompts:
  publish:

stage_index:
  storyboard:
    status: completed
    active_version: v3
    summary: 已完成 6 个视频生成单元、42 个镜头、8 个桥接镜头，控制版故事板 Prompt 已生成。
    updated_at: 2026-06-03
    files:
      index: details/storyboard/storyboard_index_v3.md
      primary: details/storyboard/shotlist_v3.md
      details:
        - details/storyboard/video_generation_units_v3.md
        - details/storyboard/continuity_maps_v3.md
        - details/storyboard/hero_moments_v3.md
        - details/storyboard/bridge_shots_v3.md
      outputs:
        - outputs/storyboard_prompts/control_storyboard_prompt_v3.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v3.md
      handoff: details/storyboard/storyboard_to_audio_handoff_v3.md
      quality_check: details/storyboard/storyboard_quality_check_v3.md
    read_policy:
      default_read: index + handoff + quality_check_summary
      deep_read:
        - shotlist only when building video prompts
      never_read_by_default:
        - historical storyboard versions
    next_action: scene-audio-director

cross_stage_summary:
  premise: 一个反差喜剧名场面动画化改编。
  core_characters: 主角 A、对手 B。
  core_scene: 城市街边开放空间。
  key_props: 核心道具 X。
  visual_style: 3D 动画电影感，轻喜剧节奏。
  segment_strategy: 60 秒总长，6 个 10 秒视频生成单元。
  continuity_focus: 角色站位、道具状态、动作余势和眼神交接。
  current_risks: 多段视频生成时可能出现站位漂移和道具状态不连续。

read_policy:
  default_read: PROJECT_BOARD + current_stage_index + previous_stage_handoff
  deep_read_requires_reason: true

stage_patches:
  - patch_id: storyboard_v3
    stage: scene-storyboard-director
    version: v3
    status: completed
    updated_at: 2026-06-03
    summary: 完成分镜阶段并推进到声音设计。
    files_changed:
      - details/storyboard/shotlist_v3.md
      - outputs/storyboard_prompts/control_storyboard_prompt_v3.md
```

---

## 14. 最终建议

本方案主张：

```text
一次性瘦身；
不保留旧字段兼容层；
不继续让黑板承载阶段内容；
所有具体内容归档到 details / outputs；
黑板只做状态机、索引、摘要和读取路由。
```

这会带来一次性改造成本，但长期收益明显：

1. 黑板更稳定；
2. 子 Skill 边界更清晰；
3. 阶段产物更可追溯；
4. Token 消耗更可控；
5. v8 故事板方法论不会继续压垮黑板；
6. 后续 v9 / v10 再加能力时，只需扩展资产库和阶段文档，不必不断膨胀 `PROJECT_BOARD.md`。

一句话总结：

> `PROJECT_BOARD.md` 应该像操作系统的进程表和文件索引，而不是把每个进程的完整内存都塞进去。
