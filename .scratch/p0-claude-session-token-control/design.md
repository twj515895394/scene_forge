# P0: Claude Session Token 控制设计

## 1. 背景

当前 Web Console 的 Claude 聊天采用长期 `--resume sessionId` 模式。用户在一个创作项目中连续推进多个 SceneForge 阶段时，Claude CLI 会持续恢复同一个 session 的历史上下文。

SceneForge 阶段执行会产生大量内容：

- assistant 正文
- thinking / thought
- tool_use
- tool_result
- 文件快照
- 校验输出
- 长篇阶段产物摘要

这些内容被 Claude CLI session JSONL 持续记录。后续每次 `--resume` 都可能恢复越来越大的历史上下文，导致 token 消耗滚雪球。

该问题影响：

- 一次完整创作项目的成本
- 阶段执行速度
- 模型上下文稳定性
- 后续流程化 / 工作流化执行能力

优先级：P0。

## 2. 当前证据

Web Console 后端当前行为：

- 首轮：`claude --print ... <project context + 用户输入> --session-id <sessionId>`
- 后续：`claude --print ... <用户输入> --resume <sessionId>`

关键代码：

- `apps/web-console/server/server.ts`
- `runClaude()`

本机 session JSONL 统计示例：

```text
projects/worldcup003:
  jsonl size: ~3465KB
  lines: 1169
  assistant: 608
  user: 296
  thinking: 263
  tool_use: 278
  tool_result: 278
  file-history-snapshot: 85
```

这说明 token 膨胀不是前端泡泡渲染导致，而是 Claude CLI 的长期 session resume 历史过大。

## 3. 问题定义

当前设计把一个完整创作项目绑定到一个长期 Claude session。

这与 SceneForge 架构不匹配：

- SceneForge 已经有项目黑板：`PROJECT_BOARD.md`
- 已经有阶段状态：`PROJECT_STATE.json`
- 已经有 manifest：`artifacts.manifest.yaml`
- 已经有阶段产物：`outputs/`、`details/`
- 已经有 handoff / stage summary 能承接上下文

因此，继续依赖 Claude CLI session 历史作为项目长期记忆，会造成重复上下文和 token 浪费。

## 4. 目标

把 Web Console 的 Claude 执行模式从：

```text
项目级长期 session
```

调整为：

```text
阶段节点级 session + 文件化上下文交接
```

每个 SOP 阶段可以视为一个工作流节点：

- 节点启动时读取最小必要上下文
- 节点执行中可使用独立 Claude session
- 节点完成后产出文件、board update、handoff / summary
- 下一个节点通过文件化上下文继续，而不是通过 Claude 历史继续

## 5. 非目标

本任务不管理 Claude 的 `baseUrl`、`apiKey` 或模型供应商配置。

不改造 Claude CLI 内部 session JSONL。

不尝试裁剪 Claude CLI 的 `--resume` 历史文件后再复用。

不删除真实项目产物。

## 6. 设计原则

### 6.1 默认轻量上下文

默认不使用长期 `--resume`。

每次阶段执行或关键动作启动新的 Claude session，只注入：

- 当前项目路径
- 当前阶段
- 执行模式
- `PROJECT_BOARD.md` 的状态摘要
- `PROJECT_STATE.json` 的阶段状态
- 当前阶段必要上游产物路径
- 最近阶段 handoff / quality check / summary
- 用户本次输入

### 6.2 文件是长期记忆

长期上下文必须沉淀到文件：

- board
- manifest
- outputs
- details
- handoffs
- quality checks

Claude session 只作为单个节点执行时的短期工作记忆。

### 6.3 完整 resume 保留为诊断开关

有些场景需要完整续聊，例如：

- 排查刚刚失败的工具调用
- 用户明确要接着上一轮未完成推理继续
- permission / tool 执行正在处理中

因此保留 `resume` 模式，但不作为默认。

## 7. 新执行模式

新增 Web Console conversation context mode：

```ts
type ClaudeContextMode = 'stage_light' | 'resume_full';
```

### 7.1 `stage_light`

默认模式。

行为：

- 不传 `--resume`
- 每次阶段启动或新一轮执行创建新 `sessionId`
- 首条 prompt 注入 compact project context
- 后续同一阶段内是否 resume 由节点策略决定，默认只在“同一运行中”保留

适用：

- 常规阶段推进
- 宏命令 start / validate / complete
- 自动工作流节点执行
- token 成本敏感的长项目

### 7.2 `resume_full`

手动模式。

行为：

- 沿用当前 `--resume sessionId`
- 用于短期排错或用户明确要求继续当前会话

适用：

- 调试刚刚失败的工具链
- 用户想恢复完整聊天上下文
- 需要沿用未完成推理

## 8. 阶段节点 session 模型

建议新增阶段 session 结构：

```text
projects/<slug>/.scene_sessions/
  source_intake.session
  topic.session
  reference.session
  story.session
  assets.session
  design.session
  script.session
  performance.session
  storyboard.session
  audio.session
  video_prompts.session
  publish_review.session
```

第一版也可以不新增目录，直接在 `PROJECT_BOARD.md` 的 `stage_index.<stage>.session_id` 中记录。

推荐第一版使用轻量文件：

```json
{
  "stage": "storyboard",
  "session_id": "...",
  "context_mode": "stage_light",
  "created_at": "...",
  "completed_at": "...",
  "handoff_path": "handoffs/storyboard.handoff.json"
}
```

## 9. Compact Project Context

新增 `buildCompactStageContext(projectPath, stage)`，替代当前偏静态的 `buildProjectContext()`。

上下文建议结构：

```text
【SceneForge 执行上下文】

项目：
- slug
- projectPath
- 当前阶段
- 执行模式

状态：
- PROJECT_STATE current_stage / next_stage
- PROJECT_BOARD state / confirmations / project_config 摘要

必须遵守：
- 当前阶段 skill
- 仓库 AGENTS.md
- CLI 必须在 projects/<slug> 下执行

上游索引：
- stage_index 中当前阶段必要的 upstream files
- artifacts.manifest.yaml 中可读 final artifacts

本阶段目标：
- 当前动作：start / validate / complete / free_chat
- 用户本次输入

禁止：
- 不扫描其他 projects/*
- 不读取无关历史产物
- 不把完整历史聊天当作上下文
```

## 10. Stage Handoff

阶段完成后必须形成机器可读 handoff，供下一阶段轻量恢复。

可以复用现有 CLI complete 生成的 handoff，也可以补强格式：

```json
{
  "stage": "storyboard",
  "status": "completed",
  "primary_outputs": [],
  "details": [],
  "quality_check": "",
  "downstream_notes": {
    "video_prompts": []
  },
  "blocking_issues": [],
  "token_context_notes": []
}
```

关键点：

- handoff 只写摘要和路径
- 不写完整长文
- 下游按路径读取必要文件

## 11. UI 设计

### 11.1 顶部模式切换

聊天框增加一个紧凑 toggle：

```text
上下文模式：轻量阶段 / 完整续聊
```

默认：轻量阶段。

Tooltip：

- 轻量阶段：新 Claude session + 项目文件上下文，省 token，适合常规流程推进。
- 完整续聊：使用 Claude CLI --resume，保留完整历史，适合排错但 token 消耗高。

### 11.2 阶段节点提示

当点击阶段 start / validate / complete 宏命令时，UI 显示：

```text
本次将以轻量阶段上下文启动 Claude，不携带历史 tool/thought。
```

### 11.3 Token 监控

保留并强化 usage 展示：

- inputTokens
- cacheCreationInputTokens
- cacheReadInputTokens
- contextTokens
- context percentage
- context mode
- session id

如果 contextTokens 超阈值，提示：

```text
当前完整续聊上下文较大，建议切换到轻量阶段模式。
```

## 12. Server 设计

### 12.1 新状态

WebSocket connection 内新增：

```ts
let contextMode: ClaudeContextMode = 'stage_light';
let activeStageSessionId: string | null = null;
```

### 12.2 新消息

```ts
{ type: 'set_context_mode', mode: 'stage_light' | 'resume_full' }
{ type: 'start_stage_session', stage: string }
{ type: 'reset_stage_session', stage: string }
```

### 12.3 runClaude 行为

伪代码：

```ts
if (contextMode === 'resume_full') {
  if (isFirstMessage) {
    claude prompt --session-id sessionId
  } else {
    claude prompt --resume sessionId
  }
}

if (contextMode === 'stage_light') {
  const stageSessionId = getOrCreateStageSessionId(stage);
  const compactContext = buildCompactStageContext(projectPath, stage);
  claude `${compactContext}\n\n用户: ${prompt}` --session-id stageSessionId
}
```

第一版为了最大节省 token，可以每次用户消息都创建新 session：

```text
stage_light_per_turn
```

但更符合工作流节点的是：

```text
stage_light_per_stage
```

建议第一版选择 `stage_light_per_stage`，并在阶段 complete 后自动 rotate。

## 13. Validator / 测试设计

### 13.1 单元测试

新增 server tests：

- `stage_light` 模式不生成 `--resume`
- `resume_full` 模式继续生成 `--resume`
- `stage_light` prompt 包含 compact context
- mode 切换不会改变 baseUrl / apiKey

### 13.2 集成测试

针对 `runClaude` 参数构造抽离函数：

```ts
buildClaudeArgs({
  contextMode,
  isFirstMessage,
  sessionId,
  prompt,
  compactContext
})
```

测试该函数即可，避免真实启动 Claude CLI。

### 13.3 手工验证

用 `worldcup003`：

1. resume_full 模式发同一条轻量请求，记录 contextTokens。
2. stage_light 模式发同一条轻量请求，记录 contextTokens。
3. 预期 stage_light 显著低于 resume_full。

## 14. 分阶段实施

### Phase 1: 参数构造抽离与模式开关

目标：

- 引入 `ClaudeContextMode`
- 抽离 Claude args 构造
- UI 能切换模式
- 默认仍可先保持当前行为，降低风险

验收：

- web-console build/test 通过
- 单测覆盖 args

### Phase 2: stage_light 默认启用

目标：

- 默认不再 `--resume`
- 注入 compact stage context
- 新增阶段 session id 管理

验收：

- 常规聊天可用
- 宏命令 start / validate / complete 可用
- contextTokens 显著下降

### Phase 3: 阶段 complete 自动 rotate

目标：

- complete 成功后写 stage session metadata
- 下游阶段自动创建新 session
- UI 显示当前 stage session

验收：

- 一个项目跨两个阶段执行，不依赖上阶段 Claude JSONL 历史

### Phase 4: 产物瘦身联动

目标：

- 结合后续“产物瘦身 / 阶段交付简化”专项
- 只保留下游必要文件
- 减少 compact context 需要索引的文件数量

## 15. 风险

### 15.1 轻量上下文遗漏

风险：

- Claude 不知道刚才对话里用户偏好

缓解：

- 重要偏好必须落到 board / handoff / confirmation
- UI 提醒用户：轻量模式不携带完整聊天历史

### 15.2 阶段内连续推理被切断

风险：

- 同一阶段多轮讨论需要上下文

缓解：

- 阶段内可保留 stage session
- 手动切 resume_full

### 15.3 token 降低但文件读取增多

风险：

- Claude 为恢复上下文重新读很多文件

缓解：

- compact context 只给路径和摘要
- skill 继续遵守紧凑读取边界

## 16. 推荐决策

建议采用：

```text
默认 stage_light_per_stage
手动 resume_full
阶段 complete 后自动 rotate
```

理由：

- 与 SceneForge SOP 管线天然匹配
- 每个阶段就是一个工作流节点
- 下游通过 board / manifest / handoff 继承
- token 成本可控
- 后续可程序化调度

## 17. P0 Issue 草案

标题：

```text
P0: Web Console Claude resume session token explosion
```

验收标准：

- 默认 Claude 执行不再长期 `--resume` 项目级 session。
- UI 提供 `轻量阶段 / 完整续聊` 模式切换。
- 轻量阶段模式每个 stage 使用独立 session。
- 阶段 complete 后自动 rotate session。
- compact context 不包含历史 tool/thought/raw assistant。
- 保留完整续聊用于手动排错。
- 有测试覆盖 args 构造和模式切换。
- `worldcup003` 代表项目在轻量模式下 contextTokens 明显下降。

