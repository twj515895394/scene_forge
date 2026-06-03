# SceneForge v8 实施计划：先黑板瘦身，再故事板方法论升级

> 版本：v8 Implementation Plan  
> 日期：2026-06-03  
> 状态：实施计划，尚未执行代码 / 协议修改  
> 关联设计文档：  
> - `docs/SceneForge-v8-Project-Board-Slim-One-Shot-Refactor-Plan.md`  
> - `docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md`

---

## 0. v8 总体定位

SceneForge v8 包含两个大改动：

```text
改动 A：PROJECT_BOARD 黑板一次性瘦身重构
改动 B：AI 视频故事板方法论升级
```

这两个改动不能并行推进，也不能先做故事板升级再改黑板。

正确顺序必须是：

```text
先完成黑板瘦身重构
→ 检查总控、项目模板、阶段补丁、产物索引均稳定
→ 再进入故事板方法论升级
```

原因很简单：故事板方法论升级会新增大量结构化信息，例如视频生成单元、首尾衔接帧、空间连续性地图、动作链、情绪链、双版故事板、质量检查和模型适配。如果黑板没有先瘦身，这些内容很容易继续膨胀到 `PROJECT_BOARD.md` 中，导致 v8 一开始就把问题放大。

因此，v8 的实施优先级为：

```text
P0：黑板瘦身重构
P1：黑板重构验收和最小链路验证
P2：故事板方法论资产库落地
P3：分镜导演与视频提示词阶段升级
P4：上游阶段补强
```

---

## 1. v8 实施总原则

### 1.1 先结构，后能力

先把 `PROJECT_BOARD.md` 从“中重型黑板”改成“轻量状态机 + 阶段索引 + 读取路由表”，再往系统里加故事板方法论能力。

### 1.2 不做兼容层

本次黑板瘦身采用一次性切换，不保留旧字段兼容层。

也就是说，新协议定稿后：

```text
新项目只使用新 PROJECT_BOARD 结构；
子 Skill 只读写新结构；
旧字段不继续作为运行时协议；
旧项目如需继续使用，必须迁移到新结构。
```

### 1.3 黑板只保存索引

所有阶段必须遵守：

```text
完整内容写入 details / outputs；
PROJECT_BOARD.md 只保存 status / summary / active_version / files / read_policy / next_action；
子 Skill 不得把完整正文写入 board_updates。
```

### 1.4 故事板升级必须建立在轻黑板上

故事板 v8 方法论涉及大量中间结构，这些结构必须落入：

```text
details/storyboard/
outputs/storyboard_prompts/
outputs/video_prompts/
assets/storyboard-methodology/
```

而不是进入 `PROJECT_BOARD.md`。

---

## 2. v8 阶段总览

```text
Phase 0：冻结 v8 设计文档
Phase 1：黑板协议瘦身重构
Phase 2：总控与项目模板改造
Phase 3：核心 Skill 读写协议改造
Phase 4：黑板瘦身验收与最小链路验证
Phase 5：故事板方法论资产库落地
Phase 6：分镜导演升级
Phase 7：视频提示词构建升级
Phase 8：上游阶段补强
Phase 9：完整链路回归验证
Phase 10：文档收尾与版本标记
```

其中：

```text
Phase 1 - Phase 4 只处理黑板瘦身。
Phase 5 之后才允许处理故事板方法论升级。
```

---

# 第一部分：黑板瘦身重构

---

## Phase 0：冻结 v8 设计文档

### 目标

确认 v8 两份设计文档作为实施依据。

### 输入文档

```text
docs/SceneForge-v8-Project-Board-Slim-One-Shot-Refactor-Plan.md
docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md
```

### 工作项

1. 确认黑板瘦身采用“一次性切换”；
2. 确认不做旧字段兼容层；
3. 确认故事板升级必须排在黑板重构验收之后；
4. 确认新黑板顶层结构；
5. 确认 `details/` 与 `outputs/` 产物目录边界。

### 产出

```text
docs/SceneForge-v8-Implementation-Plan.md
```

### 验收标准

```text
实施计划明确写清：先黑板，后故事板；
实施计划明确写清：黑板瘦身完成并验收前，不开始故事板方法论落地；
实施计划明确写清：不保留旧字段兼容层。
```

---

## Phase 1：黑板协议瘦身重构

### 目标

将 `board-protocol.md` 从旧顶层字段协议改为轻量黑板协议。

### 修改文件

```text
.agents/skills/scene-forge/references/board-protocol.md
```

### 新协议核心结构

```yaml
project:
state:
routing:
runtime_policy:
project_config:
confirmations:
active_versions:
stage_index:
cross_stage_summary:
read_policy:
stage_patches:
```

### 必须移除的旧顶层字段

旧协议中以下字段不再作为顶层运行时字段存在：

```text
project_name
project_status
next_stage
lifecycle_flag
blocker_note
score
production_level
reference_type
adaptation_level
performance_style
target_total_duration_seconds
segment_duration_seconds
context_policy
reference_policy
source_intake
user_confirmations
segment_strategy
hero_moments
bridge_shots
prop_state_machines
blocking_map
faction_layout
expressive_animation
storyboard_director_v5
created_at
updated_at
```

这些信息必须迁移到新结构或外部文件中。

### 新阶段索引协议

每个阶段统一使用：

```yaml
stage_index:
  <stage_key>:
    status:
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
      deep_read: []
      never_read_by_default: []
    next_action:
```

### 新阶段补丁协议

旧补丁：

```yaml
patch_type:
version:
status:
updated_at:
summary:
data:
```

新补丁：

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

### 关键规则

```text
1. board_updates 中禁止出现完整正文；
2. 子 Skill 必须先生成 details / outputs 文件，再回写 stage_index；
3. 黑板只允许保存阶段摘要、文件路径、读取策略和 next_action；
4. docs/ 仍然禁止作为运行时上下文；
5. details/ 和 outputs/ 是项目产物，不是协议文档。
```

### 验收标准

```text
board-protocol.md 不再定义旧顶层大字段；
board-protocol.md 明确 PROJECT_BOARD.md 的轻量定位；
board-protocol.md 明确 stage_index 标准结构；
board-protocol.md 明确新 patch 格式；
board-protocol.md 明确禁止把完整正文写入黑板。
```

---

## Phase 2：总控与项目模板改造

### 目标

让新项目初始化、总控路由、补丁合并全部使用新黑板结构。

### 修改文件

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/project-board-template.md
```

### `scene-forge/SKILL.md` 改造点

1. 读取 `state.project_status`，不再读取顶层 `project_status`；
2. 读取 `state.next_stage`，不再读取顶层 `next_stage`；
3. 读取 `state.lifecycle_flag`，不再读取顶层 `lifecycle_flag`；
4. 根据 `stage_index.<stage>.status` 判断阶段完成情况；
5. 合并子 Skill 输出时只接受 `board_updates`；
6. 拒绝子 Skill 把完整正文写入黑板；
7. 新项目初始化时使用新模板；
8. 阶段完成后更新：

```yaml
state:
routing:
active_versions:
stage_index:
cross_stage_summary:
stage_patches:
```

### `project-board-template.md` 改造点

新模板必须只包含新结构：

```yaml
project:
state:
routing:
runtime_policy:
project_config:
confirmations:
active_versions:
stage_index:
cross_stage_summary:
read_policy:
stage_patches:
```

不得再出现旧顶层字段。

### 验收标准

```text
新项目模板不再包含 source_intake / expressive_animation / storyboard_director_v5 等顶层大字段；
scene-forge 总控规则只使用 state.next_stage 进行路由；
scene-forge 合并规则明确只接受 board_updates；
stage_patches 瘦身，只记录 patch 摘要和文件变化。
```

---

## Phase 3：核心 Skill 读写协议改造

### 目标

一次性让所有核心子 Skill 适配新黑板，不保留旧字段兼容读取。

### 必须修改的 Skill

```text
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md

.agents/skills/scene-topic-gate/SKILL.md
.agents/skills/scene-topic-gate/references/output-contract.md

.agents/skills/scene-reference-decider/SKILL.md
.agents/skills/scene-reference-decider/references/output-contract.md

.agents/skills/scene-asset-checker/SKILL.md
.agents/skills/scene-asset-checker/references/output-contract.md

.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-design-builder/references/output-contract.md

.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-script-adapter/references/output-contract.md

.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-performance-director/references/output-contract.md

.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md

.agents/skills/scene-audio-director/SKILL.md
.agents/skills/scene-audio-director/references/output-contract.md

.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md

.agents/skills/scene-publish-review/SKILL.md
.agents/skills/scene-publish-review/references/output-contract.md
```

如果某个 Skill 目前没有 `references/output-contract.md`，则本阶段需要补齐。

### 全部 Skill 统一新规则

```text
1. 读取 PROJECT_BOARD.md 新结构；
2. 读取当前阶段自己的 stage_index；
3. 默认读取上一阶段 handoff 文件；
4. 需要深读 primary / details 文件时必须说明原因；
5. 产出完整内容时，必须写入 details / outputs；
6. 输出 patch 时只写 board_updates；
7. files_created / files_updated 必须列清；
8. 不得输出旧 data 大字段；
9. 不得要求总控把完整正文合并进黑板。
```

### 各阶段产物落点

```text
source_intake → inputs/source_intake/
topic → details/topic/
reference → details/reference/
assets → details/assets/
design → details/design/ + outputs/image_prompts/
script → details/script/
performance → details/performance/
storyboard → details/storyboard/ + outputs/storyboard_prompts/
audio → details/audio/ + outputs/audio_prompts/
video_prompts → details/video_prompts/ + outputs/video_prompts/
publish → details/publish/ + outputs/publish_copy/
```

### 验收标准

```text
所有核心 Skill 的 SKILL.md 都不再要求读取旧顶层字段；
所有核心 Skill 的 output-contract 都使用新 patch 格式；
所有核心 Skill 都明确完整内容落 details / outputs；
所有核心 Skill 都明确黑板只写 stage_index 和 cross_stage_summary 等轻量字段。
```

---

## Phase 4：黑板瘦身验收与最小链路验证

### 目标

在进入故事板方法论升级前，确认轻黑板结构已经稳定可用。

### 必须完成的检查

#### 4.1 协议检查

```text
board-protocol.md 已是新结构；
project-board-template.md 已是新结构；
scene-forge/SKILL.md 已按新结构路由；
所有核心 Skill 已按新 patch 格式输出。
```

#### 4.2 黑板大小检查

创建一个测试项目，完整跑到 `storyboard_ready`，检查：

```text
PROJECT_BOARD.md 不超过 300 行；
不包含完整剧本；
不包含完整分镜；
不包含完整 Prompt；
不包含完整 source 解析；
不包含完整策略库内容。
```

#### 4.3 文件索引检查

检查所有 `stage_index.<stage>.files`：

```text
引用路径真实存在；
不存在文件有但黑板没索引的关键产物；
不存在黑板引用但文件不存在的断链；
每个阶段至少有 index 或 primary；
需要交给下一阶段的阶段必须有 handoff。
```

#### 4.4 路由检查

检查：

```text
state.next_stage 能正确驱动总控；
用户说“继续”时只执行 state.next_stage；
阶段完成后 state.project_status 正确推进；
routing.current_stage / last_completed_stage 正确更新；
阻塞时 lifecycle_flag 和 blocker_note 正确写入。
```

#### 4.5 读取策略检查

检查：

```text
默认只读 PROJECT_BOARD + 当前 stage_index + 上一阶段 handoff；
深读 details 文件时必须说明原因；
docs/ 和 .handoff/ 仍不作为运行时上下文；
assets/ 只按 allowed_runtime_asset_paths 读取。
```

### 阻塞条件

只要以下任一问题存在，不允许进入故事板方法论升级：

```text
总控仍依赖旧顶层 next_stage；
任一核心 Skill 仍输出旧 data 大字段；
PROJECT_BOARD.md 仍写入完整阶段内容；
stage_index 文件路径大量断链；
新项目模板仍包含旧顶层大字段；
最小项目无法从 draft 推进到 storyboard_ready。
```

### 验收产出

建议新增：

```text
docs/SceneForge-v8-Project-Board-Slim-Validation-Report.md
```

内容包括：

```text
检查日期；
检查项目；
测试项目路径；
通过项；
失败项；
修复记录；
是否允许进入故事板方法论升级。
```

---

# 第二部分：故事板方法论升级

> 注意：只有 Phase 4 完成并通过验收后，才允许进入以下阶段。

---

## Phase 5：故事板方法论资产库落地

### 目标

将 AI 视频故事板方法论拆成执行期可读资产库，而不是塞入黑板。

### 新增目录

```text
assets/storyboard-methodology/
```

### 新增文件

```text
assets/storyboard-methodology/index.md
assets/storyboard-methodology/video-generation-unit-library.md
assets/storyboard-methodology/beat-structure-library.md
assets/storyboard-methodology/shot-type-library.md
assets/storyboard-methodology/rhythm-type-shot-combo-library.md
assets/storyboard-methodology/shot-density-reference.md
assets/storyboard-methodology/continuity-control-library.md
assets/storyboard-methodology/storyboard-dual-version-prompt-library.md
assets/storyboard-methodology/video-prompt-translation-library.md
assets/storyboard-methodology/storyboard-quality-checklist.md
assets/storyboard-methodology/model-adaptation-library.md
```

### 资产库要求

每个文件必须声明：

```yaml
asset_type: executable_reference
runtime_readable: true
templates_are_reference_only: true
enums_are_open_by_default: true
strict_enum_only_when_explicit: true
```

### 运行时读取策略

`PROJECT_BOARD.md` 不新增大字段 `storyboard_methodology_v8`。

只在轻黑板中记录：

```yaml
stage_index:
  storyboard:
    files:
      methodology_config: details/storyboard/storyboard_methodology_config_v1.md
```

以及在 `runtime_policy.context_policy.allowed_runtime_asset_paths` 中加入具体资产文件路径。

### 验收标准

```text
assets/storyboard-methodology/ 存在；
每个资产库文件可被分镜和视频提示词阶段按需读取；
没有把方法论完整正文写入 PROJECT_BOARD.md；
index.md 能说明每个资产库文件用途。
```

---

## Phase 6：分镜导演升级

### 目标

升级 `scene-storyboard-director`，使其基于轻黑板与故事板方法论资产库输出完整故事板控制链。

### 修改文件

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

### 新 SOP 顺序

```text
1. 读取 PROJECT_BOARD.md 新结构。
2. 读取 stage_index.script / stage_index.performance / stage_index.design 的 handoff 和必要 primary 文件。
3. 按需读取 assets/storyboard-methodology/*。
4. 校验视频生成单元计划。
5. 为每个 Unit 建立 opening_anchor_frame 和 closing_anchor_frame。
6. 为每个 Unit 建立 space_continuity_map。
7. 标准化 Beat 表。
8. 拆 storyboard_content_breakdown。
9. 生成 cinematic_language_plan。
10. 生成 Shot 表，并补齐 entry_state / core_action / exit_state / next_handoff。
11. 生成 action_chain_mapping 和 emotion_chain_mapping。
12. 生成 rhythm_density_check。
13. 生成控制版故事板 Prompt。
14. 对关键片段 / 高风险片段生成风格版故事板 Prompt。
15. 执行 storyboard_quality_checklist。
16. 写入 details/storyboard/ 和 outputs/storyboard_prompts/。
17. 回写 stage_index.storyboard，不把完整分镜塞入黑板。
```

### 产物落点

```text
details/storyboard/storyboard_index_v*.md
details/storyboard/video_generation_units_v*.md
details/storyboard/beat_table_v*.md
details/storyboard/shotlist_v*.md
details/storyboard/continuity_maps_v*.md
details/storyboard/action_emotion_chain_mapping_v*.md
details/storyboard/hero_moments_v*.md
details/storyboard/bridge_shots_v*.md
details/storyboard/storyboard_quality_check_v*.md
details/storyboard/storyboard_to_audio_handoff_v*.md
outputs/storyboard_prompts/control_storyboard_prompt_v*.md
outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
```

### 黑板回写范围

只允许更新：

```yaml
stage_index.storyboard:
active_versions.storyboard:
cross_stage_summary.continuity_focus:
state.project_status:
state.next_stage:
routing:
stage_patches:
```

不得写入：

```text
完整 shotlist；
完整 Beat 表；
完整故事板 Prompt；
完整质量检查表；
完整连续性地图。
```

### 验收标准

```text
scene-storyboard-director 输出不污染黑板；
完整分镜在 details/storyboard/；
故事板 Prompt 在 outputs/storyboard_prompts/；
stage_index.storyboard 能索引所有关键文件；
storyboard_to_audio_handoff 存在；
storyboard_quality_check 存在。
```

---

## Phase 7：视频提示词构建升级

### 目标

升级 `scene-video-prompt-builder`，让视频 Prompt 继承故事板控制链，并明确参考图用途说明。

### 修改文件

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

### 新增要求

每个 Segment Prompt 必须包含：

```text
故事板参考用途声明；
不要保留分镜边框、编号、箭头、文字、草图风格；
最终画风覆盖说明；
资产一致性；
开头承接画面；
结尾交接画面；
空间连续性；
动作连续性；
情绪连续性；
镜头执行顺序；
声音 / 音效 / BGM；
模型适配说明。
```

### 产物落点

```text
details/video_prompts/video_prompt_index_v*.md
details/video_prompts/video_prompt_quality_check_v*.md
details/video_prompts/video_prompt_to_publish_handoff_v*.md
outputs/video_prompts/general_segment_prompts_v*.md
outputs/video_prompts/model_adapters/seedance_segment_prompts_v*.md
outputs/video_prompts/model_adapters/kling_jimeng_segment_prompts_v*.md
outputs/video_prompts/model_adapters/sora_veo_segment_prompts_v*.md
```

### 黑板回写范围

只允许更新：

```yaml
stage_index.video_prompts:
active_versions.video_prompts:
state.project_status:
state.next_stage:
routing:
stage_patches:
```

### 验收标准

```text
视频 Prompt 文件存在；
每段都包含故事板参考用途说明；
每段都继承 opening / closing anchor；
每段都继承空间、动作、情绪连续性；
每段都明确不要保留分镜图边框、编号、箭头和草图风格；
PROJECT_BOARD.md 不包含完整视频 Prompt。
```

---

## Phase 8：上游阶段补强

### 目标

让 asset / design / script / performance 阶段为故事板方法论提供稳定输入。

### 修改对象

```text
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
```

### `scene-asset-checker` 补强

输出到：

```text
details/assets/asset_lock_v*.md
details/assets/asset_gap_report_v*.md
```

必须包含：

```text
角色资产锁定；
场景资产锁定；
道具资产锁定；
风格资产锁定；
禁止变化项。
```

### `scene-design-builder` 补强

输出到：

```text
details/design/blocking_map_v*.md
details/design/faction_layout_v*.md
details/design/prop_state_machines_v*.md
details/design/space_continuity_seed_v*.md
```

### `scene-script-adapter` 补强

输出到：

```text
details/script/video_generation_unit_plan_v*.md
details/script/beat_table_v*.md
details/script/segment_strategy_v*.md
```

### `scene-performance-director` 补强

输出到：

```text
details/performance/action_continuity_chains_v*.md
details/performance/emotion_continuity_chains_v*.md
details/performance/performance_sheet_v*.md
```

### 验收标准

```text
分镜阶段不需要从黑板读取完整上游内容；
分镜阶段可以通过 stage_index 找到上游 handoff 和 primary 文件；
上游阶段产物能支撑视频生成单元、空间连续性、动作链和情绪链。
```

---

## Phase 9：完整链路回归验证

### 目标

验证黑板瘦身和故事板升级可以在完整项目链路中稳定运行。

### 测试项目建议

准备一个 45-60 秒中等复杂度项目，至少包含：

```text
2 个角色；
1 个核心场景；
1 个关键道具；
4-6 个视频生成单元；
至少 1 个情绪转折；
至少 1 个动作连续性难点；
至少 1 个桥接镜头；
至少 1 个控制版故事板 Prompt；
至少 1 个风格版故事板 Prompt。
```

### 验证链路

```text
scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

如果是视频源输入，则前置：

```text
scene-video-intake
```

### 回归检查

```text
PROJECT_BOARD.md 是否仍然轻量；
每阶段 stage_index 是否完整；
所有 files 路径是否存在；
handoff 是否足够支撑下一阶段；
深读是否都有原因；
故事板控制链是否完整；
视频 Prompt 是否继承故事板参考用途声明；
最终 outputs 是否完整。
```

### 产出

建议新增：

```text
docs/SceneForge-v8-Full-Workflow-Validation-Report.md
```

---

## Phase 10：文档收尾与版本标记

### 目标

把 v8 变更沉淀为稳定说明。

### 更新文档

```text
README.md
docs/SceneForge-v8-Implementation-Plan.md
docs/SceneForge-v8-Project-Board-Slim-One-Shot-Refactor-Plan.md
docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md
```

### README 需要补充

```text
v8 已完成两项核心升级：
1. PROJECT_BOARD 黑板瘦身为轻量状态机与阶段索引；
2. 故事板升级为视频生成控制链。
```

### 最终验收标准

```text
README 与 docs 描述一致；
Skill 协议与黑板模板一致；
资产库路径与 allowed_runtime_asset_paths 一致；
示例项目能跑通；
无旧顶层字段残留在新模板；
无新故事板方法论内容污染黑板。
```

---

## 11. 明确禁止事项

在 v8 实施过程中，禁止：

```text
1. 黑板瘦身未验收前就落地故事板方法论资产库；
2. 黑板瘦身未验收前就修改 scene-storyboard-director 的 v8 故事板 SOP；
3. 在 PROJECT_BOARD.md 中新增 storyboard_methodology_v8 大字段；
4. 在 PROJECT_BOARD.md 中保存完整分镜、完整 Prompt 或完整质量检查；
5. 子 Skill 继续输出旧 data 大字段；
6. 总控同时支持旧字段和新字段两套路由；
7. 新项目模板继续包含旧顶层字段；
8. 让 docs/ 成为运行时上下文；
9. 用 README 替代 Skill references 协议；
10. 未跑最小链路验证就标记 v8 完成。
```

---

## 12. 推荐提交顺序

建议按以下提交颗粒度执行：

```text
Commit 1：docs: add v8 implementation plan
Commit 2：refactor(board): replace board protocol with slim structure
Commit 3：refactor(board): update project board template
Commit 4：refactor(scene-forge): route by slim board state
Commit 5：refactor(skills): migrate stage output contracts to board_updates
Commit 6：test(board): add slim board validation sample/report
Commit 7：assets(storyboard): add storyboard methodology runtime libraries
Commit 8：refactor(storyboard): implement v8 storyboard control chain output contract
Commit 9：refactor(video-prompts): inherit storyboard control chain and reference usage rules
Commit 10：refactor(upstream): add asset/script/performance handoff support for storyboard v8
Commit 11：test(v8): add full workflow validation report
Commit 12：docs: update README for v8
```

---

## 13. 最终实施判断

v8 的关键不是“把两个大方案都写进系统”，而是要控制顺序：

```text
黑板先瘦身，确保系统有一个干净、轻量、稳定的状态与索引层；
然后故事板再升级，确保新增复杂能力全部落到 details / outputs / assets，而不是重新污染黑板。
```

如果顺序反过来，故事板升级会立刻制造更多黑板字段，v8 会变成“更重的 v7”。

如果顺序正确，v8 会变成 SceneForge 后续继续扩展的基础设施升级：

```text
轻黑板负责调度；
阶段文档负责承载内容；
资产库负责提供方法；
Skill references 负责执行协议；
outputs 负责交付可用提示词。
```

一句话总结：

> SceneForge v8 必须先修操作系统的进程表，再升级视频生产能力；先把 PROJECT_BOARD 变轻，再让故事板变强。
