# SceneForge v8 最新交接：黑板瘦身优先，故事板方法论随后升级

> 日期：2026-06-04  
> 状态：v8 设计与实施计划已完成，尚未执行协议改造  
> 交接目的：汇总本轮关于 `PROJECT_BOARD.md` 黑板瘦身、v8 故事板方法论升级、实施顺序和后续任务的关键结论，供下一轮继续执行。

---

## 1. 本轮讨论背景

本轮围绕 SceneForge 当前架构继续推进 v8 设计。

用户最初希望基于附件中的 AI 视频故事板生成方法论，对 `scene_forge` 项目做深入分析，判断当前项目哪些阶段可以吸收该方法论，并生成整改优化方案文档。

过程中发现：

1. SceneForge 已经有 v4 / v5 / v6 能力线：
   - v4：动画表现力扩展；
   - v5：专业分镜导演增强；
   - v6：Video Intake / Source Intake。
2. 仓库已存在 7.x / 7.2 迭代线，因此新的故事板方法论整合不应命名为 v7，而应作为 v8。
3. 在设计 v8 故事板方法论升级时，进一步发现 `PROJECT_BOARD.md` 黑板协议越来越重。
4. 用户明确提出：黑板应该只保存每个阶段的摘要或索引，具体内容应该放到相关产出文档中。
5. 用户不赞同“兼容层渐进迁移”，倾向一次性做黑板瘦身重构。
6. 最终确定 v8 包含两个大改动：
   - 第一大改动：`PROJECT_BOARD.md` 黑板一次性瘦身重构；
   - 第二大改动：AI 视频故事板方法论升级。
7. 实施顺序必须是：先完成黑板瘦身并验证没问题，再处理故事板方法论升级。

---

## 2. 已完成并提交的文档

### 2.1 v8 故事板方法论整改优化方案

文件：

```text
docs/SceneForge-v8-Storyboard-Methodology-Optimization-Plan.md
```

提交：

```text
e8168fed1302a877181b1a1ab3e448541a0a8511
docs: add v8 storyboard methodology optimization plan
```

说明：

该文档把 AI 视频故事板生成方法论拆解为 SceneForge 可落地方案，包括：

```text
视频生成单元；
资产锁定；
Beat 标准化；
Shot 入镜 / 出镜 / 交接；
连续性四线模型；
空间连续性地图；
同源双版故事板；
视频 Prompt 转译；
模型适配；
故事板质量检查。
```

重要修正：

原先误命名为 v7，后来确认应作为 v8，并新增 v8 文档。

### 2.2 删除误命名 v7 故事板方案

文件：

```text
docs/SceneForge-v7-Storyboard-Methodology-Optimization-Plan.md
```

提交：

```text
a11536ced4b1fb1eca385b4be3587f461c288e52
docs: remove misversioned v7 storyboard methodology plan
```

说明：

因为仓库已有 7.x / 7.2 迭代线，故事板方法论整合应归入 v8，不应作为 v7。

### 2.3 v8 PROJECT_BOARD 黑板一次性瘦身重构方案

文件：

```text
docs/SceneForge-v8-Project-Board-Slim-One-Shot-Refactor-Plan.md
```

提交：

```text
f0abbb7e0136530d1d9e1162b907628000ff977e
docs: add one-shot project board slim refactor plan
```

说明：

该文档明确主张：

```text
一次性瘦身；
不保留旧字段兼容层；
不继续让黑板承载阶段内容；
所有具体内容归档到 details / outputs；
黑板只做状态机、索引、摘要和读取路由。
```

建议新黑板顶层结构：

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

### 2.4 v8 实施计划

文件：

```text
docs/SceneForge-v8-Implementation-Plan.md
```

提交：

```text
1183296b2a44defaa4537245c871faffe35bfc5d
docs: add v8 implementation plan
```

说明：

该文档明确写清 v8 两个大改动的实施顺序：

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

核心要求：

```text
Phase 1 - Phase 4 只处理黑板瘦身。
Phase 5 之后才允许处理故事板方法论升级。
```

---

## 3. 当前关键决策

### 3.1 v8 不是单一故事板升级

v8 现在被定义为两项基础设施级升级：

```text
1. PROJECT_BOARD 黑板一次性瘦身重构；
2. AI 视频故事板生成控制链升级。
```

其中黑板瘦身优先级高于故事板升级。

### 3.2 黑板必须先变轻

如果先做故事板升级，故事板方法论新增的复杂结构会继续进入 `PROJECT_BOARD.md`，导致黑板更重。

因此必须先完成：

```text
board-protocol 重构；
project-board-template 重构；
scene-forge 总控路由重构；
所有核心 Skill output-contract 重构；
最小链路验证。
```

### 3.3 不做兼容层

用户明确不希望保留旧字段兼容层。

因此后续执行时不要设计：

```text
旧顶层字段 + 新 stage_index 并存；
总控同时支持旧 next_stage 和新 state.next_stage；
子 Skill 同时读旧字段和新字段；
旧 data 大字段继续回写。
```

新协议定稿后，应一次性切换。

### 3.4 黑板新职责

`PROJECT_BOARD.md` 只承担：

```text
状态机；
路由表；
阶段索引；
跨阶段极短摘要；
确认记录；
读取策略；
patch 摘要。
```

不再承担：

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
完整质量检查结果；
完整方法论策略。
```

### 3.5 阶段内容落点

统一使用：

```text
projects/<project>/details/<stage>/
projects/<project>/outputs/<type>/
projects/<project>/inputs/<type>/
```

黑板只索引这些文件。

### 3.6 新阶段补丁格式

后续 Skill 不能继续输出旧格式：

```yaml
patch_type:
version:
status:
updated_at:
summary:
data:
```

应改为：

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

核心原则：

```text
先写 details / outputs 文件；
再回写 board_updates；
board_updates 禁止塞完整正文。
```

---

## 4. 后续任务总顺序

后续任务必须严格按以下顺序执行。

---

## 5. 第一阶段：黑板瘦身重构

### 5.1 修改 `board-protocol.md`

目标文件：

```text
.agents/skills/scene-forge/references/board-protocol.md
```

任务：

1. 用新轻量黑板结构替换旧顶层字段协议；
2. 定义 `project / state / routing / runtime_policy / project_config / confirmations / active_versions / stage_index / cross_stage_summary / read_policy / stage_patches`；
3. 删除旧顶层字段定义；
4. 定义 `stage_index` 标准结构；
5. 定义新阶段 patch 格式；
6. 明确禁止完整正文写入黑板；
7. 明确 `docs/` 和 `.handoff/` 不作为运行时上下文。

验收：

```text
board-protocol.md 不再定义旧顶层大字段；
board-protocol.md 明确 PROJECT_BOARD.md 轻量定位；
board-protocol.md 明确 stage_index 和新 patch 格式。
```

### 5.2 修改 `project-board-template.md`

目标文件：

```text
.agents/skills/scene-forge/references/project-board-template.md
```

任务：

1. 替换为新 PROJECT_BOARD 初始化模板；
2. 移除旧顶层字段；
3. 初始化空的 `stage_index`；
4. 初始化 `confirmations`；
5. 初始化 `runtime_policy`；
6. 初始化 `read_policy`；
7. 保证新项目默认就是轻黑板。

验收：

```text
模板不再包含 source_intake / expressive_animation / storyboard_director_v5 等旧顶层字段；
模板只包含新结构；
新项目初始化不会自动生成大字段。
```

### 5.3 修改 `scene-forge/SKILL.md`

目标文件：

```text
.agents/skills/scene-forge/SKILL.md
```

任务：

1. 总控改为读取 `state.next_stage`；
2. 总控改为读取 `state.project_status`；
3. 总控改为读取 `state.lifecycle_flag`；
4. 总控通过 `stage_index` 判断阶段状态；
5. 总控只合并 `board_updates`；
6. 总控拒绝把完整正文合并到黑板；
7. 用户说“继续”只执行 `state.next_stage`。

验收：

```text
scene-forge 不再依赖旧顶层 next_stage；
scene-forge 不再依赖旧顶层 project_status；
scene-forge 合并逻辑适配新 patch；
scene-forge 仍保持一次只执行一个阶段。
```

### 5.4 修改所有核心 Skill 的 output contract

目标 Skill：

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

任务：

1. 全部改用新 patch 格式；
2. 全部明确完整内容写入 `details/` 或 `outputs/`；
3. 全部明确黑板只写 `stage_index` 等轻量字段；
4. 全部移除旧 `data` 大字段写法；
5. 全部补充 `files_created` / `files_updated`。

验收：

```text
所有核心 Skill 不再要求把阶段正文写入 PROJECT_BOARD；
所有核心 Skill 都按 stage_index 回写；
所有核心 Skill 都有明确产物落点。
```

---

## 6. 第二阶段：黑板瘦身验证

在进入故事板优化前，必须完成黑板验证。

### 6.1 新增验证报告

建议新增：

```text
docs/SceneForge-v8-Project-Board-Slim-Validation-Report.md
```

报告内容：

```text
测试项目路径；
测试日期；
检查项；
通过项；
失败项；
修复记录；
是否允许进入故事板方法论升级。
```

### 6.2 最小链路测试

测试项目至少跑到：

```text
draft -> topic_scored -> reference_decided -> assets_checked -> design_ready -> script_ready -> performance_ready -> storyboard_ready
```

可先不跑完整视频 prompt，但必须跑到 `storyboard_ready`，因为故事板阶段是后续 v8 方法论升级的承接点。

### 6.3 验证项目

必须验证：

```text
PROJECT_BOARD.md 不超过 300 行；
PROJECT_BOARD.md 不包含完整剧本；
PROJECT_BOARD.md 不包含完整分镜；
PROJECT_BOARD.md 不包含完整 Prompt；
PROJECT_BOARD.md 不包含完整 source 解析；
每个 stage_index.files 路径真实存在；
不存在黑板引用但文件不存在；
不存在关键产物文件存在但黑板未索引；
state.next_stage 路由正常；
用户说“继续”只执行当前 state.next_stage；
docs/ 和 .handoff/ 不进入运行时上下文。
```

### 6.4 不得进入故事板升级的阻塞条件

任一项存在则不能进入故事板升级：

```text
总控仍依赖旧顶层字段；
核心 Skill 仍输出旧 data 大字段；
PROJECT_BOARD.md 仍保存完整阶段正文；
stage_index 路径断链；
新项目模板仍包含旧顶层大字段；
最小项目无法推进到 storyboard_ready。
```

---

## 7. 第三阶段：故事板方法论升级

只有黑板瘦身验证通过后，才进入本阶段。

### 7.1 新增故事板方法论资产库

新增目录：

```text
assets/storyboard-methodology/
```

新增文件：

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

注意：

```text
不要在 PROJECT_BOARD.md 里新增 storyboard_methodology_v8 大字段。
```

只允许通过：

```text
runtime_policy.context_policy.allowed_runtime_asset_paths
stage_index.storyboard.files.methodology_config
```

索引相关配置。

### 7.2 升级 `scene-storyboard-director`

目标文件：

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

任务：

1. 读取轻黑板新结构；
2. 通过 `stage_index` 读取上游 handoff；
3. 按需读取 `assets/storyboard-methodology/*`；
4. 生成视频生成单元；
5. 生成开头衔接帧和结尾交接帧；
6. 生成空间连续性地图；
7. 标准化 Beat 表；
8. 生成 Shot 表；
9. 补齐 Shot 入镜、核心动作、出镜、下一镜头交接；
10. 生成动作链和情绪链映射；
11. 生成控制版故事板 Prompt；
12. 按需生成风格版故事板 Prompt；
13. 执行质量检查；
14. 所有完整内容写入 `details/storyboard/` 和 `outputs/storyboard_prompts/`；
15. 黑板只回写 `stage_index.storyboard`。

### 7.3 升级 `scene-video-prompt-builder`

目标文件：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

任务：

1. 从 `stage_index.storyboard` 读取故事板 handoff；
2. 默认读取故事板 index / handoff / quality_check summary；
3. 只有构建视频 prompt 时才深读 shotlist；
4. 每段 Prompt 明确故事板参考用途；
5. 每段 Prompt 明确不要保留分镜边框、编号、箭头、文字和草图风格；
6. 每段 Prompt 继承 opening / closing anchor；
7. 每段 Prompt 继承空间、动作、情绪连续性；
8. 按需生成模型适配版本。

### 7.4 补强上游阶段

目标 Skill：

```text
scene-asset-checker
scene-design-builder
scene-script-adapter
scene-performance-director
```

补强产物：

```text
details/assets/asset_lock_v*.md
details/design/space_continuity_seed_v*.md
details/design/prop_state_machines_v*.md
details/script/video_generation_unit_plan_v*.md
details/script/beat_table_v*.md
details/performance/action_continuity_chains_v*.md
details/performance/emotion_continuity_chains_v*.md
```

---

## 8. 第四阶段：完整链路验证

故事板方法论升级完成后，新增：

```text
docs/SceneForge-v8-Full-Workflow-Validation-Report.md
```

验证一个中等复杂度项目：

```text
2 个角色；
1 个核心场景；
1 个关键道具；
4-6 个视频生成单元；
至少 1 个情绪转折；
至少 1 个动作连续性难点；
至少 1 个桥接镜头；
控制版故事板 Prompt；
风格版故事板 Prompt；
视频分段 Prompt。
```

必须确认：

```text
黑板仍然轻量；
stage_index 完整；
所有 files 路径存在；
故事板控制链完整；
视频 Prompt 正确继承故事板参考用途；
没有把故事板方法论重新塞回 PROJECT_BOARD。
```

---

## 9. 当前状态

截至本 handoff：

```text
已完成：v8 故事板方法论整改优化方案文档；
已完成：v8 黑板一次性瘦身重构方案文档；
已完成：v8 实施计划文档；
已完成：本 handoff 文档；
未完成：board-protocol.md 实际改造；
未完成：project-board-template.md 实际改造；
未完成：scene-forge/SKILL.md 实际改造；
未完成：核心 Skill output-contract 实际改造；
未完成：黑板瘦身验证报告；
未完成：故事板方法论资产库落地；
未完成：故事板导演和视频 Prompt 构建阶段升级。
```

---

## 10. 下一轮建议直接从这里开始

下一轮最优先任务是：

```text
执行 Phase 1：黑板协议瘦身重构
```

具体先改：

```text
.agents/skills/scene-forge/references/board-protocol.md
```

然后再改：

```text
.agents/skills/scene-forge/references/project-board-template.md
.agents/skills/scene-forge/SKILL.md
```

暂时不要碰：

```text
assets/storyboard-methodology/
scene-storyboard-director v8 方法论升级
scene-video-prompt-builder v8 方法论升级
```

这些必须等黑板瘦身验证完成后再做。

---

## 11. 一句话交接

> SceneForge v8 现在已经完成设计阶段，下一步必须先执行 PROJECT_BOARD 黑板一次性瘦身重构，并通过最小链路验证；只有确认轻黑板稳定后，才能开始故事板方法论资产库和分镜 / 视频 Prompt 阶段升级。
