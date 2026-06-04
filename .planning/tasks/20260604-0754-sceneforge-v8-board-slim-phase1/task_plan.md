# Task Plan: SceneForge v8 轻黑板与故事板方法论改造

## Goal
完成 v8 前半段 SOP 链路改造：先把 `PROJECT_BOARD.md` 从旧顶层大字段协议切到轻黑板协议，再把故事板方法论按轻黑板协议接入 `scene-storyboard-director` 和 `scene-video-prompt-builder`。

## Current Phase
Phase 9

## Phases

### Phase 1: Requirements & Discovery
- [x] 明确本轮只处理整体 SOP 链路，不处理 `projects/` 产出目录
- [x] 读取远端 v8 handoff，确认先做黑板瘦身、后做故事板升级
- [x] 审读 `board-protocol.md`、`project-board-template.md`、`scene-forge/SKILL.md`
- [x] 扫描核心 Skill 与 output contract 中对旧顶层字段的依赖面
- **Status:** complete

### Phase 2: Planning & Structure
- [x] 定义轻黑板顶层结构与 `board_updates` 回写模型
- [x] 明确 `state`、`stage_index`、`cross_stage_summary`、`read_policy` 的职责边界
- [x] 决定哪些既有顶层业务字段迁入 `cross_stage_summary`，哪些保留在 `project_config` / `runtime_policy`
- **Status:** complete

### Phase 3: Implementation
- [x] 改写 `scene-forge/references/board-protocol.md`
- [x] 改写 `scene-forge/references/project-board-template.md`
- [x] 改写 `scene-forge/SKILL.md` 的总控路由与补丁合并约定
- [x] 改写 11 个核心 Skill output contract 为新 patch 结构
- [x] 同步修正子 Skill `SKILL.md` 中对旧状态字段的显式说明
- **Status:** complete

### Phase 4: Testing & Verification
- [x] 静态检查是否仍残留旧 patch `data:` 主体写法
- [x] 静态检查是否仍有 `project_status` / `next_stage` 顶层推进说明
- [x] 人工抽样验证新协议能覆盖 topic -> storyboard 主链路
- [x] 记录剩余未改造点与后续风险
- **Status:** complete

### Phase 5: Delivery
- [x] 汇总改动范围、验证结果、剩余风险
- [x] 给出下一步建议（验证报告 / 最小链路项目）
- **Status:** complete

### Phase 6: Storyboard Methodology Assets
- [x] 新增 `assets/storyboard-methodology/` 资产库与索引
- [x] 把故事板方法论资产接入轻黑板白名单和 `stage_index.storyboard.files`
- [x] 明确不新增黑板顶层 `storyboard_methodology_v8` 字段
- **Status:** complete

### Phase 7: Storyboard / Prompt Protocol Upgrade
- [x] 升级 `scene-storyboard-director/SKILL.md`
- [x] 升级 `scene-storyboard-director/references/output-contract.md`
- [x] 升级 `scene-video-prompt-builder/SKILL.md`
- [x] 升级 `scene-video-prompt-builder/references/output-contract.md`
- [x] 静态验证未回退轻黑板协议
- **Status:** complete

### Phase 8: Upstream Reinforcement
- [x] 补强 `scene-asset-checker` 的 `asset_lock_v*.md`
- [x] 补强 `scene-design-builder` 的 `space_continuity_seed_v*.md`
- [x] 补强 `scene-script-adapter` 的 `beat_table_v*.md` 与 `video_generation_unit_plan_v*.md`
- [x] 补强 `scene-performance-director` 的 `action_continuity_chains_v*.md` 与 `emotion_continuity_chains_v*.md`
- [x] 让 `scene-storyboard-director` 显式消费这些上游补强结果
- **Status:** complete

### Phase 9: Static Workflow Validation
- [x] 新增 `docs/SceneForge-v8-Full-Workflow-Validation-Report.md`
- [x] 静态检查上游产物名与下游消费名闭环
- [x] 静态检查未回退顶层方法论字段
- [x] `git diff --check`
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 忽略 `projects/` 目录现有产出 | 用户明确本轮只修 SOP 链路，不改项目产物 |
| 在独立分支 `codex/v8-board-slim-phase1` 上实施 | 避免污染当前 `main` 分叉状态 |
| 先做协议与契约层改造，不直接碰 storyboard 方法论资产库 | 远端 v8 handoff 明确要求先验证轻黑板 |
| 故事板方法论不新增黑板顶层字段 | 已提交的 v8 轻黑板协议和 `2026-06-04` handoff 明确禁止 |
| 采用“兼容 v5 主链条的窄改造” | 避免另起一套分镜体系，降低范围失控风险 |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `git checkout -b` 初次失败，无法写 `.git/refs` | 使用提权重试后成功创建分支 |
| `init-session.sh` 初次执行权限不足 | 改为 `bash <script>` 显式执行 |
