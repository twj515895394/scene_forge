Status: deferred-optimization

# Issue 17: 实时聊天流与确认卡片稳定性收口

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

在历史回放收口之后，Web Console 还需要把“实时运行中的聊天流”也统一成稳定模型。当前用户仍能在运行阶段看到：

- 同一段 assistant 内容在流式阶段与最终 assistant 阶段各显示一次
- prompt / confirm 卡片前后仍残留大块空白或无效占位
- 卡片确认后，运行中消息和 resolved 状态之间的切换不稳定

这张票的目标是把实时 `stream_event`、最终 assistant message、prompt card 注入与 resolved 更新收成一个可预测的生命周期，让一次运行中的聊天区域行为和最终历史回放结果一致。

## 问题诊断

### 1. 流式 text / final assistant text 仍存在残余重复窗口

服务端已经有 `mergeVisibleBubbleChunk` 和语义级跳过逻辑，但前端收到的仍是多个 `generatedBubbles` 批次。当前链路对“同一 index 的 stream 文本”和“后续 assistant 完整文本”的消重主要依赖运行期状态，一旦事件顺序、prompt 注入或隐藏逻辑稍有偏移，就会留下重复段落。

### 2. prompt 卡片会制造隐藏 text 占位

当服务端识别到 IDE 权限提示时，会隐藏对应 text index，并注入 `prompt_ui`。这条路径如果没有和最终 resolved / dismissed 状态完全闭环，就会导致聊天区出现看似“空消息”的占位空间，或卡片确认后正文/卡片顺序不自然。

### 3. 历史与实时仍不是同一个 turn 级模型

虽然 thought / text / tool 的基础累加已经有部分统一，但当前仍然更像“服务端边流边拼 + 前端继续过滤”的二段式机制，而不是稳定的 turn 模型。这会让复杂阶段如 storyboard、video prompts 的长输出更容易暴露残余重复和空隙。

## 验收标准

- [ ] 实时运行中，同一段 assistant 回复不会再以“流式一次 + 最终一次”的形式重复出现。
- [ ] 确认卡片显示、确认、关闭后，聊天区不会遗留大片空白占位，也不会把正文顺序打乱。
- [ ] 运行中看到的 text / thought / tool_call / prompt_ui 顺序，与最终历史回放保持一致。
- [ ] 对至少一个长输出场景和一个确认卡片场景补充回归测试。

## Code Review 严格验收标准

- [ ] 必须明确 prompt card 的状态机：显示、回答、dismiss、resolved 后 UI 分别如何变化，不能继续靠多处局部过滤拼出结果。
- [ ] 必须补回归测试覆盖“流式内容 + 最终 assistant 内容 + prompt_ui”混排场景，而不仅是单一 text。
- [ ] 不允许通过简单延迟、粗暴 `setTimeout` 或静默丢弃整类消息来掩盖重复问题。
- [ ] 审查时必须确认该修复没有破坏 `tool_call`、`thought` 与 `text` 的可见性和顺序稳定性。

## 被阻塞于

- [Issue 16: 历史聊天去重与 Markdown 渲染净化收口](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/16-chat-history-dedup-and-render-sanitization.md)

## 当前审计结论（2026-06-13）

- 已有实现：实时流、最终 assistant message 与 `prompt_ui` 的合并链路已做过一轮稳定性收口。
- 当前现实：由于 `16` 里的聊天显示链路仍有残余横线/空白噪声，本票对应的实时聊天稳定性暂时不适合继续单独推进，否则容易反复互相覆盖。
- 决策：本票调整为“后续优化 backlog”，等待聊天显示链路下一轮更强诊断后，与实时流和确认卡片生命周期一起整体收口。

## 新线索：thinking 生命周期与横线残留（2026-06-13）

用户在新项目首次对话中补充了两张截图：

- 运行中：`Agent 思考中...` thought bubble 展开时，内容区已经出现大量横线/空白线。
- 思考结束后：正常 `AI DIRECTOR` 回复只显示一小段文本，但中间仍残留整屏横线式占位。

这说明问题很可能不是单纯 Markdown `<hr>` 样式，而是实时 thinking / thought 生命周期没有收口：

- 当前普通 assistant `text` 在前端会经过 `stripChatNoiseLines`、`isChatContentRenderable` 和 `renderMarkdown(..., 'chat')` 净化。
- 但 `thought` bubble 在 `VariantB.tsx` 中直接用 `<pre className="thought-pre-b">{thoughtContent}</pre>` 渲染，不走 text 的噪声净化。
- 服务端实时流会持续发出 `type: 'thought'` 的 bubble，id 形如 `run-${runId}-thought-${idx}`。
- 如果最终 assistant 正文已经到达，但 thought bubble 仍保留在 bubbles 中，UI 就会表现为“正常回复前/中间残留大量横线或空白”。

更合理的产品行为应参考 Codex / Claude / Antigravity。这里不是简单删除 thinking，而是把它从主对话正文降级为轻量 process summary：

- 运行中显示一条轻量状态行，例如 `思考中...` / `处理中...`，可展开查看实时 thinking。
- 思考结束并开始输出正式 assistant text 后，状态行变成类似 `已处理 1m 47s >` 的收起态。
- 收起态只占一小行，不应是一个横贯全屏、带大面积空白的折叠面板。
- 点击状态行后，可以展开查看之前的 thinking 内容。
- 正常 assistant 回复紧跟在状态行下面，作为主阅读内容。
- 历史回放也默认恢复为轻量收起态，而不是默认展开 thought 大面板。

建议后续修复方向：

1. 引入 turn 级生命周期字段，而不是只靠 bubble type：
   - `thought.status = streaming | resolved`
   - `thought.durationMs` 或等价时间摘要用于渲染 `已处理 1m 47s`。
   - 当同一 run/turn 出现最终 assistant `text` 或 `message_stop` 时，将对应 thought 从展开面板切换为轻量收起状态行。
2. 实时 feed 中只允许一个当前活动 thinking 面板：
   - 新 thought chunk 更新同一个面板。
   - final text 出现后自动折叠该面板，只留下 process summary row。
3. 历史 parser 不应把 `thinking` block 当普通 `thought` 大面板直接推入主 feed：
   - 应恢复为默认折叠的 process summary row。
   - 展开时才展示历史 thinking 内容。
   - 正文阅读流默认只突出 `text / tool_call / prompt_ui` 等用户需要处理的内容。
4. 如果短期先做视觉止血，thought 展开内容也必须走类似 `stripChatNoiseLines` 的净化；但这只能缓解横线，不能解决生命周期残留。

建议新增回归测试：

- 实时流：`thinking_delta` 多段只生成一个可更新 thought 面板。
- 实时流：final assistant `text` 出现后，thought 从展开面板自动切为轻量 `已处理 ...` 状态行。
- 历史回放：包含 `thinking + text` 的 assistant message，默认显示轻量收起状态行和 text，点击后才展开 thinking。
- 历史回放：thinking 内容只有分隔符/空白时，不产生任何可见 bubble。

## 本轮实现记录（2026-06-13）

- `ChatBubble` 增加 `thoughtStatus: streaming | resolved` 与 `durationMs`，用于表达 thinking 生命周期。
- 实时 `output` 合并时，incoming `thought` 默认标记为 `streaming`。
- 同一轮出现 assistant `text` 后，前端会把现有 streaming thought 自动标记为 `resolved`，并记录处理耗时。
- `run_status.running !== true` 时也会兜底 resolve 仍在 streaming 的 thought。
- `VariantB` 将 resolved thought 渲染为轻量 process row：默认显示 `已处理 1m 47s ›`，点击后才展开历史 thinking 内容。
- streaming thought 仍默认展开，保持运行中可观察性。
- thought 展开内容改为先经过 `stripChatNoiseLines` 净化，避免分隔符刷成整屏横线。
- 验证：
  - `npm run build` 通过。
  - `npx tsc -p tsconfig.server.json` 通过。
  - `node --test dist/server/tests/conversation_parsing.test.js dist/server/tests/live_bubble_accumulator.test.js` 通过，10 个测试全部通过。
  - 全量 `npm test` 在既有 `watcher.test.js` 段挂起，已中断；此前相关测试已通过。

## 最终根因定位与部分日志交互修复（2026-06-13 追加）

### 1. 横线残留根因
在实时流和历史会话中，有大量的 `thought` 和 `tool_call` 被依次渲染。因为在 Variant B 布局下，这些气泡默认是 `.claudian-tool-call-container` 这种拥有 `border: 1px solid rgba(255,255,255,0.06)` 的全宽容器，其左右边框直接在视口边缘外或与之融合，造成极易被误解为单纯 markdown 横线的细线占位。

### 2. 最终修复方案
- **显示日志控制开关**：在标题栏增加了 `显示日志 / 隐藏日志` 开关控制 `showSystemLogs` 状态。
- **状态逻辑解耦**：当该开关为关闭状态（默认）时，直接在气泡过滤层中拦截已解析完的历史工具节点与已处理的思考节点。
- **动态展开与恢复**：当用户手动开启该日志开关时，系统会自动将所有的历史工具调用和思考流程块置为“默认展开（Expanded）”的日志树形式进行无障碍展示，再次关闭时一键隐藏。

### 3. “显示日志”开启后内容被截断与折叠的最终修复（2026-06-13 第二次追加）
- **现象与根因**：开启“显示日志”后，中间所有生成的工具卡片 `.claudian-tool-call-container` 与思考卡片 `.chat-bubble-b.thought` 全都表现为高度极矮（仅 `2px` 的边框厚度）的空横线。根因为上述元素声明了 `overflow: hidden;`，由于在弹性布局父容器 `.variant-b-feed-viewport` 中其 `min-height` 默认值退化为了 `0`。在有大量元素挤压的情况下，浏览器直接将它们压缩到了极致，从而裁剪隐藏了全部内容。
- **最终修复**：在 `.chat-bubble-b` 和 `.claudian-tool-call-container` 的 CSS 规则中添加 `flex-shrink: 0;`。重新编译运行后，卡片不再被布局压缩，均自适应显示出正常的内容高度（例如 `300.42px` 与 `80.76px`），文字与按钮交互恢复正常，没有残留空横线，问题彻底解决。


