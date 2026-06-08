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
      - projects/ 下当前项目之外的任何兄弟项目目录
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
  director_style_id:
  director_style_version:
  style_family:
  style_profile_path:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:

confirmations:
  topic_confirmed:
  style_family_confirmed:
  style_confirmed:
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
- 未经用户明确要求，严禁扫描、检索或引用当前项目之外的任何 `projects/*` 兄弟项目。
- 运行时若需要风格候选池，优先读取 `style_profiles/style_registry.md`，不得通过遍历全部 `style_profiles/*` 目录临时构造。

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
  director_style_id:
  director_style_version:
  style_family:
  style_profile_path:
  performance_style:
  target_total_duration_seconds:
  segment_duration_seconds:
```

规则：

- 这里只保留项目级配置索引，不保存阶段正文。
- `director_style_id`：当前项目采用的具体风格包。
- `director_style_version`：当前风格包版本。
- `style_family`：当前风格所属大类，例如 `3d_animation`。
- `style_profile_path`：当前风格包索引路径，固定指向该风格包的 `profile.md`，作为运行时唯一入口。
- `performance_style`：本次演绎力度，不等于 `director_style_id`。
- 若尚未明确风格包，可暂空；执行期若发生默认回退，相关阶段产物必须显式记录回退情况。
- 对历史项目兼容执行以下保守规则：若 `confirmations.style_family_confirmed` 或 `confirmations.style_confirmed` 缺失，但 `director_style_id / director_style_version / style_family / style_profile_path` 四个字段齐全，则可按 `legacy confirmed` 使用。
- 时长字段更新时，阶段产物、`stage_index` 摘要和 `project_config` 必须一致。
- 下游阶段默认先读 `style_profile_path`，再按其中的 `required_profile_files` 选择性深读，不得一次性加载整个风格包。

## `confirmations`

```yaml
confirmations:
  topic_confirmed:
    status: pending | confirmed | rejected | not_needed
    note:
  style_family_confirmed:
    status: pending | confirmed | rejected | not_needed
    note:
  style_confirmed:
    status: pending | confirmed | rejected | not_needed
    note:
  reference_confirmed:
    status:
    note:
```

规则：

- 不得伪造用户确认。
- 用户纠错、比较方案、补充偏好不等于 `confirmed`。
- 任何 `*_confirmed` 都只绑定对应阶段，不得跨阶段复用。
- `storyboard_plan_confirmed = confirmed` 只表示用户已确认分镜 / 故事板阶段预览，不等于已授权生成音频方案或视频提示词。
- `video_prompt_plan_confirmed = confirmed` 必须来自视频提示词阶段自己的方案确认，不得由故事板确认、音频确认、统称“继续”或泛化的“都按这个做”推导得到。
- `style_family_confirmed` 用于记录风格大类是否已在设计前被正式确认；它是 `style_confirmed` 的上游确认层。
- `style_confirmed` 用于记录导演风格包是否已在设计前被正式确认。
- 对旧项目读取时，若 `style_family_confirmed` 或 `style_confirmed` 缺失但风格字段齐全，可临时视为 `legacy confirmed`；若字段不齐，则仍视为未确认。

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
2. `files.primary` 指向该阶段最权威的正式正文文件；若该阶段协议存在显式 `quality_check` / `final_delivery_ready` 闸门，则在通过闸门前不得把草稿、说明稿或未通过 review 的产物写成 `primary`。
3. `files.details` / `files.outputs` 只保存路径列表，不内联内容。
4. `handoff` 与 `quality_check` 也是路径索引，不写正文。
5. `read_policy.default_read` 只列下游默认应读的最小集合；不得把已知 stale、说明稿体裁或未通过阶段质量门槛的文件列为默认读取入口。
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
- 历史 `dimension_scores.动画化适配度` 在读取 topic 阶段产物时，统一视为 `dimension_scores.风格转译适配度`
- `story_beats`、`hero_moment_candidates`、`ending_payoff` 进入 `stage_index.story` 的正文文件
- `expressive_animation` 进入 `stage_index.design` / `stage_index.script` / `stage_index.performance` / `stage_index.storyboard` 的产物文件与 `cross_stage_summary.visual_style`
- `storyboard_director_v5` 进入 `stage_index.storyboard` 的正文文件和读取白名单
- `video_prompt_files`、`video_prompt_review` 进入 `stage_index.video_prompts`
- 故事板方法论资产不新增黑板顶层字段；只通过 `runtime_policy.context_policy.allowed_runtime_asset_paths` 与 `stage_index.storyboard.files` 暴露

兼容要求：

- 不批量改写历史 topic 产物或旧黑板里的 `动画化适配度`
- 读取侧、展示侧和索引刷新侧必须把 `动画化适配度` 当作 `风格转译适配度` 的旧别名处理
- 新阶段产物、新摘要和新黑板回写只允许使用 `风格转译适配度`

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

故事板阶段除通用结构外，必须补足以下文件索引：

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
        - outputs/storyboard_prompts/故事板提示词_pack_01_v*.md
        - outputs/storyboard_prompts/故事板提示词_pack_02_v*.md
        - outputs/storyboard_prompts/故事板提示词_v*.md
        - outputs/storyboard_prompts/control_storyboard_prompt_v*.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
      handoff:
      quality_check:
      methodology_config:
```

说明：

- `methodology_config` 用于记录本次故事板阶段实际使用的方法论配置或索引文件。
- `quality_check` 用于记录故事板质量检查结果路径。
- `outputs` 默认先索引正式故事板 prompt 主交付；若为多包模式，应优先索引 `pack` 文件。整片单文件与控制版 / 风格版生成 prompt 只能按需补充，不得反过来替代正式主交付。
- 若阶段正文声明存在 `storyboard_quality_check.final_delivery_ready` 闸门，则：
  - 只有 `final_delivery_ready: true` 且 `stage_index.storyboard.files.quality_check` 已落路径时，`stage_index.storyboard.status` 才允许写成 `completed`
  - 在上述条件满足前，`stage_index.storyboard.files.primary` 与 `read_policy.default_read` 都不得指向该阶段草稿、中间稿、说明稿或未过审文件
- 若 `total_shots > 12`，但 `storyboard_prompt_pack_mode` 仍为 `single_pack` 或未生成多包主交付，不得把本阶段写成 `completed`
- 这些都是文件路径，不是黑板正文。

## `stage_index.video_prompts` 的附加约定

视频提示词阶段除通用结构外，必须补足以下 review 索引：

```yaml
stage_index:
  video_prompts:
    files:
      index:
      primary:
      details:
        - details/video_prompts/video_prompt_review_v*.md
        - details/video_prompts/video_prompt_auto_fix_v*.md
      outputs:
        - outputs/video_prompts/视频提示词_第01包_中文_v*.md
        - outputs/video_prompts/视频提示词_第01包_英文_v*.md
        - outputs/video_prompts/视频提示词_导演长版_中文_v*.md
        - outputs/video_prompts/视频提示词_导演长版_英文_v*.md
      handoff:
      quality_check:
```

说明：

- `quality_check` 用于记录本轮视频提示词 review / auto-fix 结果路径。
- `outputs` 默认先索引与故事板 `pack` 对齐的视频提示词文件；整片中文 / 英文导演长版仅在用户明确需要时作为可选汇编版补充。
- 若阶段正文声明存在 `video_prompt_review.final_delivery_ready` 闸门，则：
  - 只有 `final_delivery_ready: true` 且 `stage_index.video_prompts.files.quality_check` 已落路径时，`stage_index.video_prompts.status` 才允许写成 `completed`
  - 在上述条件满足前，`stage_index.video_prompts.files.primary` 与 `read_policy.default_read` 都不得指向该阶段草稿、说明稿或未过审文件
- 如果上游故事板为 `multi_pack_confirmed`，则 `outputs` 应同时索引整片总控文件和 pack 对齐文件；缺少 pack 对齐文件时，不得把本阶段写成 `completed`
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
    - projects/PROJECT_INDEX.md
    - stage_index.<current_stage>.files.handoff
    - style_profiles/style_registry.md
  stage_specific_reads:
    storyboard:
      - stage_index.performance.files.handoff
      - stage_index.script.files.primary
  style_profile_resolution_order:
    - project_config.style_profile_path
    - style_profile.required_profile_files
  style_profile_bulk_scan_allowed: false
  cross_project_scan_allowed: false
  deep_read_requires_reason: true
```

规则：

- 默认只读黑板和当前阶段最必要的 handoff / primary。
- `style_profiles/style_registry.md` 是运行时风格候选池和风格最小元数据的唯一总索引。
- `projects/PROJECT_INDEX.md` 是项目发现的唯一全局索引；默认只允许用它判断“是否命中现有项目”。
- 若项目已确认当前风格，默认顺序固定为“先读 `profile.md`，再按 `required_profile_files` 读取当前阶段必需文件”。
- `style_profile_bulk_scan_allowed: false` 表示禁止默认扫描全部风格目录或一次性读入某个风格包全部文件。
- `cross_project_scan_allowed: false` 表示禁止默认读取当前项目之外的任何项目目录。
- 需要读取完整正文、长分析或大资产库时，必须说明原因。

## 项目索引约定

运行时允许存在两级项目索引：

```text
projects/PROJECT_INDEX.md
projects/<project>/PROJECT_INDEX.md
```

规则：

1. 两级索引都只是发现层和路由层，不是状态源。
2. 正式状态、阶段摘要和阶段文件索引仍只以 `PROJECT_BOARD.md` 为准。
3. 当用户只给一句需求或续写意图时，总控必须先读 `projects/PROJECT_INDEX.md`，而不是扫描全部项目黑板。
4. 只有全局索引高置信命中单个项目时，才允许继续读取该项目的 `PROJECT_INDEX.md`。
5. 只有用户明确继续该项目，或命中已足够明确时，才允许读取该项目的 `PROJECT_BOARD.md`。
6. 没有 `projects/<project>/PROJECT_INDEX.md` 的项目，默认不参与自动命中；只有用户明确点名该项目时，才允许直接读取它的 `PROJECT_BOARD.md`。
7. 每次项目状态推进后，应同步更新项目级索引与全局索引，避免发现层漂移。

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
