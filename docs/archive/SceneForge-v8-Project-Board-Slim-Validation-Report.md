# SceneForge v8：PROJECT_BOARD 轻黑板静态验证报告

> 日期：2026-06-04  
> 范围：v8 Phase 1 - Phase 4 中已完成的协议改造与静态验收  
> 验证方式：协议文档审查、跨文件一致性检查、`rg` 静态扫描、`git diff --check`  
> 不包含：`projects/` 下真实项目迁移、运行时项目推进、链路实跑

---

## 1. 验证结论

当前分支上的 v8 轻黑板协议改造已经达到“可继续进入后续 v8 实施”的静态完成状态。

本轮已确认：

1. `PROJECT_BOARD.md` 新结构已经在总控协议、模板和核心 output contract 中形成一致口径。
2. 主流程状态推进已统一收敛到 `state.project_status` / `state.next_stage` / `state.lifecycle_flag`。
3. 核心子 Skill 输出协议已统一切到 `board_updates` 模型。
4. `docs/` 与 `.handoff/` 已被明确排除在运行时上下文之外。
5. 高风险旧语义残留已清理到低风险水平。

---

## 2. 本轮验证对象

### 2.1 总控与模板

- `.agents/skills/scene-forge/SKILL.md`
- `.agents/skills/scene-forge/SKILL.manual-copy.md`
- `.agents/skills/scene-forge/references/board-protocol.md`
- `.agents/skills/scene-forge/references/project-board-template.md`

### 2.2 核心子 Skill

- `scene-video-intake`
- `scene-topic-gate`
- `scene-reference-decider`
- `scene-story-development`
- `scene-asset-checker`
- `scene-design-builder`
- `scene-script-adapter`
- `scene-performance-director`
- `scene-storyboard-director`
- `scene-audio-director`
- `scene-video-prompt-builder`
- `scene-publish-review`

### 2.3 本轮不验证

- `projects/` 下任何真实项目产物
- 旧项目迁移脚本
- 真正的 Agent 运行效果
- 真实链路文件是否全部存在

---

## 3. 通过项

### 3.1 黑板新结构已落地

已确认总控协议和模板都使用以下结构：

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

通过依据：

- `board-protocol.md` 已重写为 v8 轻黑板协议
- `project-board-template.md` 已改为仅初始化新结构
- `scene-forge/SKILL.md` 已改为读取 `state.*` 与 `stage_index.*`

### 3.2 旧状态字段写法已从主协议移除

已确认主 Skill 和 output contract 不再使用旧式黑板根字段推进：

- `project_status`
- `next_stage`
- `lifecycle_flag`

而是统一写为：

- `board_updates.state.project_status`
- `board_updates.state.next_stage`
- `board_updates.state.lifecycle_flag`

通过依据：

- 静态扫描未发现旧式顶层推进格式残留

### 3.3 核心 output contract 已统一到新补丁壳

已确认核心 output contract 使用统一补丁结构：

```yaml
patch_type:
stage:
version:
status:
updated_at:
summary:
board_updates:
files_created:
files_updated:
next_action:
```

通过依据：

- 12 个核心 output contract 已切换到新格式
- review 中发现的旧示例补丁也已补齐为新结构

### 3.4 docs / handoff 运行时隔离已明确

已确认以下目录被显式排除在运行时上下文之外：

- `docs/`
- `.handoff/`

通过依据：

- `board-protocol.md`
- `project-board-template.md`
- `scene-forge/SKILL.md`

都明确声明：

```text
docs/ 与 .handoff/ 不进入运行时上下文
```

### 3.5 topic -> storyboard 主链静态路由已连通

已确认主链静态推进关系存在明确契约：

1. `scene-topic-gate` -> `scene-reference-decider`
2. `scene-reference-decider` -> `scene-story-development`
3. `scene-story-development` -> `scene-asset-checker`
4. `scene-asset-checker` -> `scene-design-builder`
5. `scene-design-builder` -> `scene-script-adapter`
6. `scene-script-adapter` -> `scene-performance-director`
7. `scene-performance-director` -> `scene-storyboard-director`
8. `scene-storyboard-director` -> `scene-audio-director`
9. `scene-audio-director` -> `scene-video-prompt-builder`
10. `scene-video-prompt-builder` -> `scene-publish-review`

说明：

- 本轮验证的是“协议是否写通”
- 不是“真实项目是否已成功跑通”

---

## 4. 本轮 review 中已自动修复的问题

### 4.1 output contract 新旧补丁壳混用

问题：

- 部分 contract 已改为 `board_updates`
- 但示例块仍保留旧 `data` 风格补丁壳

修复：

- 已统一修正示例区，使其与新协议一致

### 4.2 旧黑板语义残留在正文说明中

问题：

- 多处仍写“顶层 `script_strategy`”
- 多处仍写“继承顶层 `expressive_animation`”
- 多处仍写“顶层 `video_prompt_review`”

修复：

- 已改为：
  - `project_config.*`
  - `stage_index.*`
  - review 文件索引
  - 上游阶段正文摘要

### 4.3 `scene-design-builder` contract 漏切新补丁壳

问题：

- `scene-design-builder/references/output-contract.md` 一度仍保留旧补丁壳

修复：

- 已补齐为新格式

### 4.4 手工镜像文件与主入口可能冲突

问题：

- `SKILL.manual-copy.md` 仍可能保留旧规则

修复：

- 已改为“以 `SKILL.md` 为准”的轻量镜像说明

---

## 5. 未做项

以下内容本轮没有执行：

1. 旧 `projects/*` 项目迁移
2. 真实项目 `PROJECT_BOARD.md` 行数检查
3. `stage_index.files` 路径逐个存在性核验
4. topic -> storyboard 的真实项目实跑
5. `SceneForge-v8-Full-Workflow-Validation-Report.md`

---

## 6. 当前剩余风险

### 6.1 低风险术语遗留

仍有部分阶段正文结构保留旧内容命名，例如：

- `source_intake`
- `creative_direction_context`
- `expressive_animation_design`

当前判断：

- 这些词现在主要作为阶段正文内容名存在
- 不再作为黑板根字段协议存在
- 风险为“命名延续”，不是“结构回退”

### 6.2 未做真实项目手测

当前最大未验证项不是协议，而是：

- 总控在真实项目上是否完全按新 `state` / `stage_index` 口径执行
- 真实项目产物路径是否与 `stage_index.files` 一致

这部分需要后续项目级测试。

---

## 7. 是否允许进入下一阶段

结论：允许继续。

理由：

1. Phase 1 - Phase 3 的协议层改造已完成
2. Phase 4 的静态验收已达到继续推进条件
3. 当前剩余风险集中在真实项目运行验证，不再是协议结构不一致

---

## 8. 下一步建议

如果继续 v8 剩余实施，建议顺序如下：

1. 保留当前轻黑板协议，不再回头扩旧兼容层
2. 由用户自行或后续会话完成真实项目手测
3. 在此基础上开始：
   - `assets/storyboard-methodology/`
   - `scene-storyboard-director` 方法论升级
   - `scene-video-prompt-builder` 方法论升级
   - 上游阶段补强

如果后续发现真实项目运行问题，应优先修：

1. `stage_index.files` 路径组织
2. 总控对 `state.next_stage` 的读取与写回
3. 子 Skill 对 `board_updates` 的实际合并边界
