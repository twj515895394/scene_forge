---
name: scene-forge
description: 当用户要在 SceneForge 项目中推进黑板驱动的多阶段创作流程、判断当前阶段、或编排 SceneForge 子 Skill 时应使用此技能。
---

# scene-forge

SceneForge 总控入口 Skill。只负责路由、编排、状态合并和阶段推进，不直接产出具体内容成品。

SceneForge 当前只负责输出提示词、制作说明、结构化方案和项目文档；不负责生成图片、视频或音频。对话中不得声称“已经生成图片/视频/音频”，只能表述为“已生成用于外部平台制作的提示词”。

## 何时使用

在以下场景使用此技能：

- 用户要新建或推进某个 `projects/*` 项目
- 用户要判断当前项目处于哪个阶段
- 用户要在多个 SceneForge 子 Skill 之间切换
- 用户要把子 Skill 结果合并回 `PROJECT_BOARD.md`

如果用户只是讨论某个单一子模块的字段或模板，不需要优先触发本技能。

## 执行步骤

1. 读取目标项目的 `PROJECT_BOARD.md`；如果用户没有指定项目，先确认目标项目目录。
2. 读取 `references/board-protocol.md`，确认顶层索引字段、阶段补丁壳、主状态机、上下文读取边界和确认闸门规则。
3. 根据 `project_status`、`next_stage`、`lifecycle_flag` 判断当前阶段和是否存在阻塞。
4. 只选择 `PROJECT_BOARD.md` 中 `next_stage` 指向的一个子 Skill；不得跳过、推断替换或同时展开多个阶段。
5. 如果用户只说“继续”，只能解释为执行当前 `next_stage`；不得一口气连跑多个阶段。
6. 要求子 Skill 只产出该阶段的 YAML 补丁块，不要重写整份黑板。
7. 阶段涉及剧本、角色/场景道具、故事板、视频提示词等核心创作决策时，必须先输出方案预览或候选方向，并等待用户明确确认后再落盘正式文件。
8. 用户纠错、补充偏好或指出问题，不等于授权落盘；只有用户明确表达“确认/采用/按这个生成/落盘/写入”时，才可以写入正式文件或推进状态。
9. 将子 Skill 结果合并回 `PROJECT_BOARD.md`，并同步更新顶层索引字段。
10. 在阶段完成后推进 `project_status` 和 `next_stage`；如果存在真实阻塞，再写 `blocker_note`。

## 编排顺序

默认主流程顺序如下：

1. `scene-topic-gate`
2. `scene-reference-decider`
3. `scene-asset-checker`
4. `scene-design-builder`
5. `scene-script-adapter`
6. `scene-performance-director`
7. `scene-storyboard-director`
8. `scene-audio-director`
9. `scene-video-prompt-builder`
10. `scene-publish-review`

说明：真实执行顺序以 `PROJECT_BOARD.md` 的 `next_stage` 为唯一准入条件；上面的顺序只用于新项目初始化或协议校验。

## 上下文读取与 Token 预算

默认执行阶段采用 `compact` 预算和最小必要上下文原则：少读但读准，少想但想对，少生成但可控。

默认只读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
当前阶段明确依赖的输入文件
```

默认不读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

只有在用户明确要求“分析/复盘/重构协议/读取交接/查看 docs”时，才允许读取上述默认禁止内容，并应说明额外读取原因。

## 关键规则

- 只承认一个唯一状态源：`PROJECT_BOARD.md`
- 只执行 `PROJECT_BOARD.md` 中的 `next_stage`
- 用户说“继续”不得连跑多个阶段
- 用户纠错默认不落盘，确认后才落盘
- 子 Skill 只输出单阶段补丁，不直接重写完整项目黑板
- `project_status` 只表达主流程阶段，不混入异常态
- `blocker_note` 只在真实阻塞时写入
- 默认不扫描 `docs/`、`.handoff/` 和历史项目输出
- 默认 `token_budget_level` 为 `compact`
- 如果协议字段与旧文档冲突，以最新协议参考文件为准

## 参考资料

- `references/board-protocol.md`：黑板顶层字段、补丁结构、状态推进规则、上下文读取边界和确认闸门
- `references/display-conventions.md`：中文显示名与英文参数值的统一表达规范
