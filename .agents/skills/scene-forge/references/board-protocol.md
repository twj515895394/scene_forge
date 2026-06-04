# SceneForge v8 轻黑板协议

本文件定义 `scene-forge` 总控和各子 Skill 共享的 `PROJECT_BOARD.md` 运行时协议。

`PROJECT_BOARD.md` 仍然是项目唯一状态源，但从 v8 起只承担：

1. 状态机
2. 路由表
3. 阶段索引
4. 跨阶段极短摘要
5. 确认记录
6. 读取策略
7. 阶段补丁摘要

黑板不再保存完整剧本、完整分镜、完整 Prompt、完整 source 解析、完整设计说明或任何长正文。

## 顶层结构

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
  allowed_next_stages: []
  last_completed_stage:
  route_reason:

runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    active_protocol_docs: []
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
  score:
  production_level:
  reference_type:
  adaptation_level:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:

confirmations:
  topic_confirmed:
  reference_confirmed:
  story_confirmed:
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
  story:
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
  story:
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
  story_engine:
  core_characters: []
  core_scene:
  key_props: []
  visual_style:
  continuity_focus:
  source_adaptation_mode:
  current_risks: []

read_policy:
  default_read:
    - PROJECT_BOARD.md
    - stage_index.<current_stage>.files.handoff
  stage_specific_reads: {}
  deep_read_requires_reason: true

stage_patches: []
```

## 旧字段迁移规则

以下旧顶层字段不再允许继续作为运行时根字段存在：

```text
project_name
project_status
next_stage
lifecycle_flag
blocker_note
context_policy
reference_policy
source_intake
script_strategy
creative_direction_context
story_development_summary
story_beats
character_functions
core_scene_functions
key_prop_functions
hero_moment_candidates
ending_payoff
segment_strategy
hero_moments
bridge_shots
prop_state_machines
blocking_map
faction_layout
expressive_animation
storyboard_director_v5
video_prompt_files
video_prompt_review
created_at
updated_at
```

迁移原则：

1. 项目元信息进入 `project`
2. 主流程状态进入 `state`
3. 运行时白名单和开放参考规则进入 `runtime_policy`
4. 可配置项目参数进入 `project_config`
5. 用户确认状态进入 `confirmations`
6. 阶段产物位置、激活版本和摘要进入 `stage_index`
7. 下游必须知道但不值得深读正文的极短信息进入 `cross_stage_summary`
8. 完整阶段正文一律写入 `details/`、`outputs/`、`inputs/`

## `state`

```yaml
state:
  project_status: draft | topic_scored | reference_decided | story_developed | assets_checked | design_ready | script_ready | performance_ready | storyboard_ready | audio_ready | video_prompts_ready | published | reviewed | archived
  next_stage:
  lifecycle_flag: active | blocked | skipped | abandoned | completed
  blocker_note:
```

规则：

- `state.next_stage` 是总控唯一准入条件。
- 用户说“继续”时，只能解释为执行 `state.next_stage`。
- `state.project_status` 只表达主流程阶段，不混入策略、版本或长摘要。
- `state.blocker_note` 只在真实阻塞时填写。

## `routing`

```yaml
routing:
  current_stage:
  allowed_next_stages: []
  last_completed_stage:
  route_reason:
```

规则：

- `routing.current_stage` 通常与 `state.next_stage` 一致。
- `allowed_next_stages` 只列当前协议允许的下一步，不做并行阶段展开。
- `route_reason` 只写一句话原因，不写阶段正文。

## `runtime_policy`

### `context_policy`

```yaml
runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    active_protocol_docs: []
    allowed_runtime_asset_paths: []
    forbidden_runtime_paths:
      - docs/
      - .handoff/
      - 会话记录_*.md
      - 历史项目输出
      - 其他无关项目目录
```

规则：

- `docs/` 和 `.handoff/` 永远不作为运行时上下文。
- 资产库只允许按需加入 `allowed_runtime_asset_paths`。
- `active_protocol_docs` 只记录当前运行中被允许参考的协议文件路径。

### `reference_policy`

```yaml
runtime_policy:
  reference_policy:
    templates_are_reference_only: true
    examples_are_reference_only: true
    enums_are_open_by_default: true
    strict_enum_only_when_explicit: true
    allow_adapted_reference: true
    allow_custom_generated_option: true
    require_reason_for_custom_option: true
```

规则：

- 模板、示例、枚举、资产库 pattern 都是参考锚点，不是封闭集合。
- 除非字段显式声明 `strict_enum: true`，否则默认允许开放选择。

## `project_config`

```yaml
project_config:
  score:
  production_level:
  reference_type:
  adaptation_level:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:
```

规则：

- 这里只保留项目级配置索引，不保存阶段正文。
- 时长字段更新时，阶段产物、`stage_index` 摘要和 `project_config` 必须一致。

## `confirmations`

```yaml
confirmations:
  topic_confirmed:
    status: pending | confirmed | rejected | not_needed
    note:
  reference_confirmed:
    status:
    note:
```

规则：

- 不得伪造用户确认。
- 用户纠错、比较方案、补充偏好不等于 `confirmed`。

## `active_versions`

```yaml
active_versions:
  topic: v1
  storyboard: v2
```

规则：

- 这里只记录当前激活版本号。
- 版本对应的正文路径必须落在 `stage_index.<stage>.files` 中。

## `stage_index`

每个阶段统一使用以下结构：

```yaml
stage_index:
  <stage_key>:
    status: pending | in_progress | completed | blocked | skipped
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
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
```

规则：

1. `summary` 只写 1-3 句话，不写长正文。
2. `files.primary` 指向该阶段最权威的正文文件。
3. `files.details` / `files.outputs` 只保存路径列表，不内联内容。
4. `handoff` 与 `quality_check` 也是路径索引，不写正文。
5. `read_policy.default_read` 只列下游默认应读的最小集合。
6. `deep_read` 只列允许深读的文件，深读仍必须说明原因。
7. `never_read_by_default` 用于限制长文件或参考型文件被误读。

## 阶段键约定

固定阶段键：

```text
source_intake
topic
reference
story
assets
design
script
performance
storyboard
audio
video_prompts
publish
```

旧概念映射：

- `source_intake` 进入 `stage_index.source_intake`
- `script_strategy` 和 `creative_direction_context` 进入 `cross_stage_summary.source_adaptation_mode` 与相关阶段正文
- `story_beats`、`hero_moment_candidates`、`ending_payoff` 进入 `stage_index.story` 的正文文件
- `expressive_animation` 进入 `stage_index.design` / `stage_index.script` / `stage_index.performance` / `stage_index.storyboard` 的产物文件与 `cross_stage_summary.visual_style`
- `storyboard_director_v5` 进入 `stage_index.storyboard` 的正文文件和读取白名单
- `video_prompt_files`、`video_prompt_review` 进入 `stage_index.video_prompts`
- 故事板方法论资产不新增黑板顶层字段；只通过 `runtime_policy.context_policy.allowed_runtime_asset_paths` 与 `stage_index.storyboard.files` 暴露

## 故事板方法论资产读取约定

以下文件允许在故事板阶段和视频提示词阶段按需加入运行时白名单：

```yaml
runtime_policy:
  context_policy:
    allowed_runtime_asset_paths:
      - assets/storyboard-methodology/index.md
      - assets/storyboard-methodology/video-generation-unit-library.md
      - assets/storyboard-methodology/beat-structure-library.md
      - assets/storyboard-methodology/shot-type-library.md
      - assets/storyboard-methodology/rhythm-type-shot-combo-library.md
      - assets/storyboard-methodology/shot-density-reference.md
      - assets/storyboard-methodology/continuity-control-library.md
      - assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
      - assets/storyboard-methodology/video-prompt-translation-library.md
      - assets/storyboard-methodology/storyboard-quality-checklist.md
      - assets/storyboard-methodology/model-adaptation-library.md
```

规则：

1. 不得新增 `storyboard_methodology_v8` 这类黑板顶层方法论字段。
2. 是否启用、读取了哪些方法论资产、产出了哪份配置，统一写入 `stage_index.storyboard.files` 与 `stage_index.storyboard.read_policy`。
3. `docs/` 中的方法论说明文档依然不进入运行时上下文。

## `stage_index.storyboard` 的 v8 附加约定

故事板阶段除通用结构外，建议补足以下文件索引：

```yaml
stage_index:
  storyboard:
    files:
      index:
      primary:
      details:
        - details/storyboard/video_generation_units_v*.md
        - details/storyboard/space_continuity_map_v*.md
        - details/storyboard/action_emotion_chains_v*.md
      outputs:
        - outputs/storyboard_prompts/control_storyboard_prompt_v*.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
      handoff:
      quality_check:
      methodology_config:
```

说明：

- `methodology_config` 用于记录本次故事板阶段实际使用的方法论配置或索引文件。
- `quality_check` 用于记录故事板质量检查结果路径。
- 这些都是文件路径，不是黑板正文。

## `cross_stage_summary`

```yaml
cross_stage_summary:
  premise:
  story_engine:
  core_characters: []
  core_scene:
  key_props: []
  visual_style:
  continuity_focus:
  source_adaptation_mode:
  current_risks: []
```

规则：

- 这里只保留跨阶段必需的短摘要。
- 不再把完整故事骨架、角色功能表、场景功能表、道具状态机直接放入黑板。
- 任何超过轻摘要的信息都应落盘到对应阶段正文文件。

## `read_policy`

```yaml
read_policy:
  default_read:
    - PROJECT_BOARD.md
    - stage_index.<current_stage>.files.handoff
  stage_specific_reads:
    storyboard:
      - stage_index.performance.files.handoff
      - stage_index.script.files.primary
  deep_read_requires_reason: true
```

规则：

- 默认只读黑板和当前阶段最必要的 handoff / primary。
- 需要读取完整正文、长分析或大资产库时，必须说明原因。

## 阶段补丁协议

子 Skill 只输出单阶段补丁，不直接重写整份黑板。

```yaml
patch_type:
stage:
version:
status: pending | in_progress | completed | blocked | skipped
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

强制规则：

1. `board_updates` 禁止出现完整正文。
2. 必须先生成 `details/`、`outputs/` 或 `inputs/` 文件，再回写 `stage_index`。
3. `files_created` / `files_updated` 只列文件索引和用途。
4. `next_action` 只写下一步建议，不写新正文。

## 总控路由规则

1. 总控先读 `state.project_status`、`state.next_stage`、`state.lifecycle_flag`。
2. 视频源输入优先进入 `scene-video-intake`，但只在 `stage_index.source_intake.status != completed` 时触发。
3. `topic_scored` 后若剧本模式或改写方向未确认，应先停在确认闸门，不得越级推进。
4. `reference_decided` 后下一步必须是 `scene-story-development`。
5. `story_developed` 后下一步必须是 `scene-asset-checker`。
6. 任何时刻只允许调度 `state.next_stage` 指向的一个阶段。
7. 合并阶段结果时，只接受补丁中的 `board_updates` 与文件索引。

## 禁止事项

黑板中禁止出现：

```text
完整 source 视频解析
完整故事骨架正文
完整角色设定
完整场景设定
完整剧本
完整分镜
完整故事板 Prompt
完整视频 Prompt
完整声音方案
完整发布文案
完整质量检查报告
完整方法论策略正文
```

这些内容必须写入：

```text
projects/<project>/inputs/
projects/<project>/details/
projects/<project>/outputs/
```

## 显示规范

- 对话层默认使用中文。
- `summary` 使用中文，必要时可在关键参数后附英文值。
- 结构化字段值保留英文参数值，便于后续阶段消费。
