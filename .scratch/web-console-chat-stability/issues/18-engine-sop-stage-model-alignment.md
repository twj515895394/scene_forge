Status: complete

# Issue 18: Engine CLI 与 SceneForge SOP 阶段模型对齐

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前 SceneForge 存在一条更严重的一致性问题：总控 skill、黑板协议、左侧阶段流 UI 都按完整 SOP 阶段模型在工作，但 `packages/engine` 里的 CLI 状态机仍然是被裁剪过的 7 阶段流水线。结果就是：

- UI 显示 `reference / story / assets / design` 等阶段
- 黑板协议要求这些阶段是强制中间阶段
- 但 CLI 却允许 `topic_gate -> script`
- 甚至把 `storyboard` 的依赖写成 `performance + audio`，和当前 SOP 顺序冲突

这张票的目标是先明确并落地一个统一裁决：**以 SceneForge 完整 SOP 为准**，把 engine 阶段模型、依赖关系、状态字段和测试基线补齐到同一套协议上。

## 问题诊断

### 1. 产品协议是完整 11/12 阶段主流程

`scene-forge` 总控 skill 明确规定：

- 普通文本输入主流程：`topic -> reference -> story -> assets -> design -> script -> performance -> storyboard -> audio -> video_prompts -> publish`
- 视频源输入在前面额外增加 `source_intake`

同时还明确限制：

- `reference_decided` 后必须先进入 `story`
- `story_developed` 前不得进入 `assets / design / script`
- `scene-design-builder` 是正式确认闸门之一

### 2. engine CLI 仍然只实现了裁剪流水线

当前 `packages/engine/src/state_machine.ts` 只定义：

- `topic_gate`
- `script`
- `performance`
- `audio`
- `storyboard`
- `video_prompts`
- `publish_review`

这和产品协议不一致，直接导致“design 没有强依赖”这种错误结论在运行时被制造出来。

### 3. 依赖顺序本身也有冲突

当前 engine 里 `storyboard` 依赖 `['performance', 'audio']`，等于默认 `audio` 在 `storyboard` 之前。但当前 SceneForge 总控流程和左栏 UI 顺序都是 `storyboard -> audio -> video_prompts`。这不是展示偏差，而是执行模型冲突。

## 决策前提

本票默认建议：

- **以完整 SOP 为准**
- 补齐 engine 状态机，而不是反过来裁剪 UI / 黑板 / skill

用户已确认以完整 SOP 为准。本票已进入实现并完成 engine 阶段模型的最小闭环。

## 验收标准

- [x] engine CLI 的阶段集合与 SceneForge SOP 主流程一致，不再缺失 `reference / story / assets / design` 等强制阶段。
- [x] engine 依赖顺序与当前产品协议一致，不再出现 `topic_gate -> script` 这类跳级合法路径。
- [x] 左侧阶段栏、`PROJECT_BOARD.md`、`PROJECT_STATE.json`、CLI `status/start/complete` 的 engine 侧阶段结论已按普通文本 SOP 对齐。
- [x] 至少补一组完整流程测试，覆盖普通文本输入的标准阶段推进。

## Code Review 严格验收标准

- [x] 必须先给出“以完整 SOP 为准”的实现边界与兼容策略，不能边改边决定，导致状态模型继续漂移。
- [x] 审查必须确认 `storyboard / audio / video_prompts` 的顺序在 engine 与 UI 中完全一致。
- [x] 必须检查现有 validator、artifact registry、测试样例是否仍然假设旧 7 阶段模型，避免只改状态机不改周边。
- [x] 不允许通过简单在 UI 层隐藏错误路径来掩盖 engine 与协议不一致。

## 完成记录

- 修改 `packages/engine/src/state_machine.ts`：
  - 阶段集合对齐普通文本 SOP 11 阶段。
  - `storyboard -> audio -> video_prompts` 顺序对齐 UI/SOP。
  - `video_prompts` 依赖修正为 `audio`。
  - 读取旧 `PROJECT_STATE.json` 时自动补齐缺失默认阶段，降低历史状态文件解析风险。
- 修改 `packages/engine/src/tests/state.test.ts`：
  - 增加完整阶段集合断言。
  - 增加完整依赖表断言。
  - 增加普通文本 SOP 完整推进测试。
  - 增加禁止跳过 `audio` 进入 `video_prompts` 的回归测试。
- 验证：
  - `npm run build` 通过。
  - `npm test` 通过，27 个测试全部通过。

## 后续专项

- 本票只完成 engine 阶段模型与依赖顺序闭环。
- `design / storyboard / video_prompts` 等阶段的深度产物合规 validator，需要单独拆 issue 继续做。

## 关联记录：聊天 thinking 横线问题不属于本票（2026-06-13）

用户在新项目首次对话中补充了 thinking 展示结束后残留横线/空白的截图线索。该问题与实时聊天流和历史回放的 `thought` bubble 生命周期有关，已记录到 issue 16 / 17；不重新打开本 engine SOP 阶段模型票。
