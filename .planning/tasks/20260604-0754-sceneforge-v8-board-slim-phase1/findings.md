# Findings & Decisions

## Requirements
-

## Research Findings
-

## Technical Decisions
| Decision | Rationale |
|----------|-----------|

## Issues Encountered
| Issue | Resolution |
|-------|------------|

## Resources
-
# Findings

## 2026-06-04

- 远端 `origin/main` 已包含 v8 交接提交 `3fd4297`，但本地 `main` 与远端分叉，当前工作在新分支 `codex/v8-board-slim-phase1` 进行。
- 当前仓库的“实现”主要是 Skill 协议文档：`scene-forge` 总控与各子 Skill 的 `SKILL.md` / `references/output-contract.md`，没有独立的运行时代码可直接修。
- 现状仍是旧黑板模型：`board-protocol.md` 以顶层字段列举 `project_status`、`next_stage`、`source_intake`、`expressive_animation`、`storyboard_director_v5` 等大块结构。
- `project-board-template.md` 仍默认把大量业务字段初始化在黑板顶层，和 v8 “轻黑板只做状态机、索引、摘要、路由”目标冲突。
- `scene-forge/SKILL.md` 明确以顶层 `project_status` / `next_stage` / `lifecycle_flag` 路由，并要求子 Skill 输出单阶段 YAML 补丁，但补丁正文仍约定写在 `data:` 下。
- 11 个核心 output contract 普遍仍使用旧补丁壳：
  - `patch_type`
  - `version`
  - `status`
  - `updated_at`
  - `summary`
  - `data`
- 多数 output contract 还在“阶段推进建议”里直接写顶层 `project_status` 和 `next_stage`，需要改为 `board_updates.state.*`。
- v4 / v5 / v6 扩展不是要删除，而是要改为通过 `stage_index`、`cross_stage_summary`、`runtime_policy`、`project_config` 或阶段产物文件索引暴露，而不是继续占用黑板顶层正文。
- 子 Skill 的 `SKILL.md` 也普遍显式写了“确认 `project_status` 为 X 且 `next_stage` 为当前阶段”，至少需要把这些入口说明改成读取 `state.project_status` 与 `state.next_stage`。
- 已完成的主改造：
  - `scene-forge/references/board-protocol.md` 已重写为 v8 轻黑板协议
  - `scene-forge/references/project-board-template.md` 已改为纯新结构模板
  - `scene-forge/SKILL.md` 已改为只使用 `state.next_stage` 路由、只合并 `board_updates`
  - 11 个核心 output contract 已统一引入 `board_updates`、`files_created`、`files_updated`
  - 子 Skill `SKILL.md` 中对 `project_status / next_stage / lifecycle_flag` 的说明已切到 `state.*`
- 已通过的静态检查：
  - `rg` 未发现主 Skill / output contract 中残留旧式顶层 `project_status`、`next_stage`、`lifecycle_flag` 回写示例
  - `rg` 未发现主入口中“推进旧顶层状态字段”的遗留文案
- 当前剩余风险：
  - 多个子 Skill 仍在正文说明里使用旧概念名，例如 `script_strategy`、`source_intake`、`expressive_animation`、`storyboard_director_v5`
  - 这些旧概念现在更适合作为阶段正文或 `cross_stage_summary` 摘要存在，但还没有逐一重命名为统一的新黑板语义
  - 本轮没有跑真实项目迁移，也没有生成 `SceneForge-v8-Project-Board-Slim-Validation-Report.md`
- 后续补充：
  - 已新增 `docs/SceneForge-v8-Project-Board-Slim-Validation-Report.md`
  - 已在报告中明确：本轮完成的是静态协议验收，不含 `projects/` 实跑验证
  - 现阶段剩余风险已从“协议不一致”下降为“真实项目运行待验证”
- 继续核对 `2026-06-04` handoff 和已落地轻黑板协议后，确认故事板方法论阶段不能照早期设计文档新增顶层 `storyboard_methodology_v8`；方法论资产必须通过 `assets/storyboard-methodology/*`、`runtime_policy.context_policy.allowed_runtime_asset_paths` 和 `stage_index.storyboard.files.*` 暴露。
- `scene-storyboard-director` 的正确升级方式不是抛弃 v5，而是在 `storyboard_content_breakdown -> cinematic_language_plan` 后继续补 `video_generation_units`、锚帧、空间连续性图、动作/情绪连续性链、双版故事板和质量检查。
- `scene-video-prompt-builder` 的正确升级方式是显式消费上述分镜阶段新增结构，并把控制版 / 风格版故事板、锚帧、连续性链和模型适配计划转译成 `Segment + Shot + Timecode` 提示词，而不是生成第二套独立 storyboard 协议。
- 已通过的新增静态检查：
  - 未出现新的黑板顶层方法论字段；`rg` 命中仅为禁止性说明
  - `scene-storyboard-director` / `scene-video-prompt-builder` 已显式引用 `assets/storyboard-methodology/*`
  - `git diff --check` 通过
- `Phase 8` 的正确补强方式不是把上游阶段重写成分镜阶段，而是仅要求它们各自产出下游真正依赖的文件：
  - `scene-asset-checker`：`asset_lock_v*.md`
  - `scene-design-builder`：`space_continuity_seed_v*.md`
  - `scene-script-adapter`：`beat_table_v*.md`、`video_generation_unit_plan_v*.md`
  - `scene-performance-director`：`action_continuity_chains_v*.md`、`emotion_continuity_chains_v*.md`
- 静态链路已确认闭环：上游新产物名已在 `scene-storyboard-director` 或 `scene-video-prompt-builder` 中被显式消费说明接住。
