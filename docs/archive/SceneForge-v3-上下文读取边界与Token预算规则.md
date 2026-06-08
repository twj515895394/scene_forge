# SceneForge v3 上下文读取边界与 Token 预算规则

> 版本：v3 补充规则  
> 日期：2026-06-02  
> 对应文档：
> - `docs/SceneForge-v3-提示词生产链路待优化明细.md`
> - `docs/SceneForge-v3-实施计划.md`

---

## 1. 背景

在 `huaqiang-watermelon-40s` 测试过程中，Agent 执行阶段时频繁读取 `docs/` 目录下的多个文档，导致：

1. 执行过程变慢；
2. 上下文被旧文档、规划文档、复盘文档污染；
3. Agent 容易把历史设计文档误当成当前执行协议；
4. Token 被不必要地消耗；
5. 用户无法判断 Agent 当前到底在依据哪份规则执行。

v3 必须明确：**SOP 的设计不仅要能完成任务，也要避免浪费不该浪费的 Token。Token 是执行资源，过度读取无关上下文就是资源损耗。**

---

## 2. 核心原则

### 2.1 最小必要上下文原则

Agent 执行任意阶段时，只能读取完成当前阶段所需的最小上下文。

默认不得全量扫描：

```text
docs/
projects/<project>/outputs/
projects/<project>/details/
```

除非当前阶段明确依赖其中的具体文件。

### 2.2 当前协议优先原则

执行阶段时，Agent 应优先读取：

```text
1. 当前 Skill 的 SKILL.md
2. 当前 Skill 的 references/output-contract.md
3. 当前项目的 PROJECT_BOARD.md
4. 当前阶段明确依赖的输入文件
```

不应优先读取 `docs/` 下的设计文档、实施计划或复盘文档。

### 2.3 文档分层原则

`docs/` 目录中的文档必须分清用途：

```text
执行协议：当前可直接约束 Agent 行为
实施计划：开发和改造计划，不应直接驱动项目执行
设计文档：长期架构思路，不应默认参与当前阶段决策
复盘文档：问题记录，不应直接作为执行规则
历史文档：只供查阅，不参与当前执行
```

### 2.4 不重复读取原则

同一轮执行中，Agent 已经读取过的文档，不应重复读取全文。

如果需要再次使用，应读取缓存摘要或只读取必要片段。

### 2.5 不用“读很多”伪装严谨

严谨不等于多读文档。

真正的严谨是：

```text
读对文件
读必要片段
按当前状态执行
明确不读取无关上下文
```

---

## 3. 默认允许读取的文件

## 3.1 所有阶段都允许读取

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
```

## 3.2 只在需要时读取

```text
projects/<project>/details/<current-stage-input>.md
projects/<project>/outputs/<current-stage-input>.md
```

例如：

- `scene-storyboard-director` 可以读取已确认剧本、角色/场景设计、表演方案。
- `scene-video-prompt-builder` 可以读取已确认故事板、音频方案、角色/场景道具提示词。
- `scene-publish-review` 可以读取最终提示词包和项目摘要。

但不得因为“可能有用”就全量读取所有 outputs。

---

## 4. 默认禁止读取的内容

除非用户明确要求分析、复盘或改造协议，否则执行阶段默认禁止读取：

```text
docs/多风格AI导演系统设计.md
docs/SceneForge-v2-Protocol-Upgrade-Design.md
docs/SceneForge-Pixar-Production-System-Enhancement-Plan.md
docs/皮克斯电影风格路线实施计划.md
docs/SceneForge-v3-提示词生产链路待优化明细.md
docs/SceneForge-v3-实施计划.md
.handoff/*.md
会话记录_*.md
```

这些文件属于：

```text
设计 / 计划 / 复盘 / 历史记录
```

不是项目执行时的默认输入。

---

## 5. docs 目录读取边界

### 5.1 推荐新增文档索引

建议新增：

```text
docs/DOCUMENT_INDEX.md
```

内容示例：

```markdown
# docs 文档索引

## 当前执行协议
- docs/protocols/current.md

## 实施计划，仅供开发改造使用
- docs/SceneForge-v3-实施计划.md

## 问题复盘，仅供分析使用
- docs/SceneForge-v3-提示词生产链路待优化明细.md

## 历史归档，不参与当前执行
- docs/SceneForge-v2-Protocol-Upgrade-Design.md
- docs/皮克斯电影风格路线实施计划.md
```

### 5.2 推荐目录分层

后续可逐步整理为：

```text
docs/
  protocols/        当前有效协议
  plans/            实施计划
  design/           架构设计
  reviews/          复盘与问题记录
  archived/         历史归档
```

执行阶段默认只允许读取：

```text
docs/protocols/current.md
```

不得主动读取：

```text
docs/plans/
docs/design/
docs/reviews/
docs/archived/
```

---

## 6. PROJECT_BOARD 中增加上下文读取控制

建议在 `PROJECT_BOARD.md` 中增加：

```yaml
context_policy:
  mode: minimal
  allow_docs_scan: false
  active_protocol_docs:
    - docs/protocols/current.md
  forbidden_by_default:
    - docs/plans/
    - docs/design/
    - docs/reviews/
    - docs/archived/
    - .handoff/
    - 会话记录_*.md
  token_budget:
    default_stage_budget: compact
    require_reason_for_extra_reads: true
```

如暂时没有 `docs/protocols/current.md`，可以先写：

```yaml
active_protocol_docs: []
```

表示执行阶段主要依赖 Skill 与 PROJECT_BOARD，不主动读取 docs。

---

## 7. Token 预算规则

## 7.1 阶段级预算

每个阶段应有 Token 预算等级：

```yaml
token_budget_level: compact | standard | deep
```

建议：

```text
compact：只读 PROJECT_BOARD + 当前 Skill + 必要输入文件
standard：允许读取 1-3 个明确依赖文件
deep：仅在用户要求复盘、重构、分析全链路时使用
```

默认执行阶段使用：

```text
compact
```

## 7.2 不同任务的预算建议

| 任务类型 | 默认预算 | 读取范围 |
|---|---|---|
| 执行当前 next_stage | compact | PROJECT_BOARD + 当前 Skill + 必要输入 |
| 修改某个 Prompt | compact | 目标文件 + 直接上游输入 |
| 生成阶段方案预览 | standard | PROJECT_BOARD + 当前 Skill + 1-3 个上游文件 |
| 复盘完整项目 | deep | 可读取 docs、handoff、会话记录、多个产物 |
| 协议重构 | deep | 可读取 Skill、docs、历史文档 |

## 7.3 额外读取必须说明原因

当 Agent 需要读取超出默认范围的文件时，必须先说明：

```text
我需要额外读取 xxx，因为当前阶段需要确认 xxx。
```

禁止无说明地读取大量文件。

---

## 8. 每个 Skill 的读取白名单建议

## 8.1 scene-script-adapter

允许读取：

```text
PROJECT_BOARD.md
scene-script-adapter/SKILL.md
scene-script-adapter/references/output-contract.md
已确认的主题、参考裁定、时长分段策略
```

禁止默认读取：

```text
docs/ 下所有设计和实施计划
旧项目输出
.handoff/
会话记录_*.md
```

## 8.2 scene-design-builder

允许读取：

```text
PROJECT_BOARD.md
scene-design-builder/SKILL.md
scene-design-builder/references/output-contract.md
已确认的角色清单、场景清单、道具清单、剧本方案
```

## 8.3 scene-storyboard-director

允许读取：

```text
PROJECT_BOARD.md
scene-storyboard-director/SKILL.md
scene-storyboard-director/references/output-contract.md
已确认剧本
已确认角色设定 Prompt
已确认场景道具 Prompt
已确认表演方案
```

## 8.4 scene-video-prompt-builder

允许读取：

```text
PROJECT_BOARD.md
scene-video-prompt-builder/SKILL.md
scene-video-prompt-builder/references/output-contract.md
已确认故事板
已确认音频方案
已确认角色/场景/道具提示词
```

不得读取：

```text
所有历史设计文档
无关样例项目
未确认草稿
```

---

## 9. Token 浪费判定标准

以下行为应视为 Token 浪费：

1. 当前阶段只需要 PROJECT_BOARD，却全文读取多个 docs 文件。
2. 为了执行单个 Prompt 修改，读取整个项目 outputs 目录。
3. 已读取过某文档，又重复全文读取。
4. 把历史方案、长期设计、复盘问题全部塞进上下文。
5. 对用户已经确认过的信息反复重新推理。
6. 明明只需读取某几行，却读取整篇长文档。
7. Agent 为了“显得专业”输出大量无关背景说明。

---

## 10. 推荐执行前检查

每次执行 Skill 前，Agent 应先进行轻量检查：

```text
1. 当前 next_stage 是什么？
2. 当前阶段必须读取哪些文件？
3. 哪些文件不需要读取？
4. 是否需要读取 docs？如果需要，理由是什么？
5. 当前任务是 compact、standard 还是 deep？
```

用户可见输出建议：

```text
我会按最小上下文执行：只读取 PROJECT_BOARD、当前 Skill 协议和本阶段必要输入，不扫描 docs 目录。
```

---

## 11. 与 v3 实施计划的关系

本规则应作为 v3 实施计划的 P0 补充项：

```text
P0-9：增加上下文读取边界与 Token 预算策略
```

修改范围：

```text
.agents/skills/scene-forge/SKILL.md
所有子 Skill 的 SKILL.md
PROJECT_BOARD 协议
README.md
```

验收标准：

```text
- 执行阶段不再默认扫描 docs/
- Agent 额外读取文件前说明原因
- 每个 Skill 有读取白名单
- PROJECT_BOARD 支持 context_policy
- 默认 token_budget_level 为 compact
```

---

## 12. 结论

v3 的执行原则应从：

```text
多读、多想、多生成
```

改为：

```text
少读但读准，少想但想对，少生成但可控。
```

Token 是执行资源。SOP 的设计必须把 Token 损耗纳入成本管理，避免因为无边界读取、重复读取和上下文污染，导致 Agent 变慢、变贵、变不稳定。
