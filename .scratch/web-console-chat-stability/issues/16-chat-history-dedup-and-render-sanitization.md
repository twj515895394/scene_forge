Status: completed

# Issue 16: 历史聊天去重与 Markdown 渲染净化收口

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前 Web Console 的聊天显示问题已经不只是“样式难看”，而是历史会话恢复链路本身仍然会把同语义 assistant 文本保留两份，同时把模型输出中的分隔符过度渲染成大面积横线，直接破坏可读性。

这张票只解决“历史回放结果正确”这一个垂直切片，不碰实时流、审批卡片生命周期，也不改 SceneForge 的阶段状态机。目标是让用户重新进入项目、加载历史会话、滚动查看旧消息时：

- 同一段 assistant 回复不会重复显示两次
- 普通文本分隔符不会被渲染成整屏横线和大块空白
- 历史聊天在视觉上恢复为“正常对话记录”，而不是“日志回放残片”

## 问题诊断

### 1. 历史 assistant text 仍缺少稳定语义去重

当前 `chatHistory` 只对历史 `thinking` block 做了归一化与连续去重，但对 assistant `text` block 仍然是命中即 push。这意味着当 session JSONL 同一轮 assistant 内容既以 block 数组出现，又在后续 message/content 层再次出现时，前端会拿到两条语义相同但 `id` 不同的 text bubble。

### 2. 前端 `output/history` 合并只按 id，不按语义

前端合并 WebSocket `history` / `output` 气泡时主要以 `id` 为唯一键。对于“不同来源、不同 id、同一内容”的历史 text，当前实现只能打印 `duplicatesByContent` 诊断日志，不能真正消解重复显示。

### 3. Markdown 水平分隔线渲染规则过于激进

渲染器会把独立一行的 `---` / `***` 直接转成 `<hr>`。在真实 assistant 输出中，这类分隔符经常只是模型的普通文本结构符号，而不是用户期望的视觉分隔线。结果就是聊天区域出现多条横线和大片空白，误导用户以为存在空消息。

## 验收标准

- [ ] 历史会话恢复后，同一段 assistant text 不会因为不同事件来源被显示两次。
- [ ] 打开包含多段 `---` / `***` 的历史聊天时，不再出现整屏横线和大片空白占位。
- [ ] 历史 `text / thought / tool_call / prompt_ui` 仍然完整可见，去重和净化不会误删有效内容。
- [ ] `test-project-001` 这类真实历史会话的回放结果可稳定复现并用于回归。

## Code Review 严格验收标准

- [ ] 必须明确区分“按 id 合并”和“按语义去重”的职责边界，不允许继续把两种问题混在一处通过 if 补丁掩盖。
- [ ] 必须补上历史 assistant text 的回归测试，覆盖“同语义不同来源”的重复场景，而不是只覆盖 thought。
- [ ] Markdown 渲染净化必须是有边界的，不能为了消灭横线而破坏正常表格、标题、代码块等结构化输出。
- [ ] 修复后应保留足够诊断信息，能继续识别是否还有残余 `duplicatesByContent`，但用户界面本身不能再显示重复内容。

## 被阻塞于

无 - 可以立即开始

## 当前审计结论（2026-06-13）

- 已有实现：历史 assistant text 去重、前端语义级去重、聊天区 Markdown 净化与诊断日志都已补上第一轮收口。
- 当前现实：重复显示主症状已有明显缓解，但“多条横线 / 大空白占位”在真实页面中仍未彻底消失，当前仍无法稳定满足验收标准。
- 决策：先降级为“后续优化 backlog”，不再阻塞当前主线。后续若重启修复，应围绕真实 render tree、bubble 生命周期和分隔内容来源重新做专项诊断。

## 新线索：历史 thinking 默认应恢复为轻量收起态（2026-06-13）

用户在新项目首次对话中观察到：实时 thinking 阶段会显示大量思考过程，结束后正常回复出现，但 thinking 区域留下横线/空白占位。这个现象也直接解释了历史回放问题的一部分：

- 当前 `chatHistory.ts` 会把 assistant content 里的 `thinking` block 转成 `type: 'thought'` bubble。
- 这意味着历史会话默认会把模型思考过程作为普通大块内容恢复，而不是像 Codex 一样恢复为轻量 `已处理 1m 47s >` 状态行。
- 普通 `text` 内容已经走 Markdown 噪声净化；但 `thought` 内容在 UI 里以 `<pre>` 方式展示，可能保留大量 `---`、空白段和结构线。

建议调整本票验收口径：

- 历史回放默认只展示面向用户的正常回复内容。
- `thinking` 默认恢复为轻量收起状态行，例如 `已处理 1m 47s >`，不作为普通大块聊天 bubble 渲染。
- 点击状态行后，可以展开查看之前的 thinking 内容。
- 展开内容也要经过噪声净化，避免历史 thinking 里的分隔符刷成整屏横线。
- 回归测试应覆盖 `assistant.content = [{type:'thinking'}, {type:'text'}]` 时最终默认显示收起状态行 + text，展开后才显示 thinking 的场景。

## 本轮实现记录（2026-06-13）

- `chatHistory.ts` 现在把历史 `thinking` block 恢复为 `thoughtStatus: resolved` 的 process row，而不是运行中大面板。
- 历史加载与 websocket `history` 都会补齐旧数据缺失的 `thoughtStatus`，默认按 resolved 处理。
- 历史 resolved thought 在 UI 中默认收起为轻量状态行，点击后才展开查看。
- 历史 thought 内容展开前会经过 `stripChatNoiseLines`，降低分隔线/空白噪声。
- 已更新 conversation parsing 测试，覆盖历史 thinking 恢复为 resolved process row 的行为。

## 最终根因定位与修复（2026-06-13 追加）

### 1. 为什么仍有大量横线？
在加载历史会话时，虽然普通文本走了解析和噪声过滤，但是中间产生的过百条 `thought` 与 `tool_call`（尤其是 `tool_call` 容器）在默认折叠状态下依然全部被渲染出来。
这些容器的 CSS 属性设置了 `width: 100%; align-self: stretch; border: 1px solid rgba(255, 255, 255, 0.06)`，导致其左右边框贴着视口边缘而被隐去，仅在页面上留下一层层横跨全屏的极窄水平细线，累加起来占满了数千像素的阅读流，不仅严重干扰视觉，还把真实的 AI 文本气泡顶到了极低的位置。

### 2. 最终修复方案
- **引入日志隐藏机制**：在 `VariantB.tsx` 的气泡过滤链中增加默认拦截。在非调试状态下，默认只呈现用户和 AI DIRECTOR 对话气泡。
- **系统日志显示/隐藏切换开关**：在 COLLABORATIVE FEED 头部添加了“显示日志 / 隐藏日志”状态控制开关，支持局部高亮状态。
- **自动展示/隐藏展开**：点击显示日志后，所有的历史工具调用和思考流程块不仅被拉回渲染树，还会自动呈现“展开（Expanded）”的可读日志状态，无需手动逐个点击。

## 点击“显示日志”后依旧呈现空横线与无法显示日志的深度根因及修复（2026-06-13 第二次追加）

### 1. 为什么显示日志后依旧看不到内容、只有大量横线？
通过在 Chromium 中使用 Playwright 脚本评估页面的实时 DOM 和 computed style，发现当开启“显示日志”时，所有的 `.claudian-tool-call-container` 与 `.chat-bubble-b.thought.resolved.expanded` 元素的计算高度（computed height）居然都变成了 **`2px`**。
进一步的 CSS 规则和布局分析定位到了以下两个关键设定：
1. 这些容器元素都声明了 `overflow: hidden;`；
2. 它们的直接父容器 `.variant-b-feed-viewport` 采用的是弹性伸缩布局 `display: flex; flex-direction: column;`。

根据 CSS Flexbox 规范：
- 弹性子元素的 `min-height` 默认值是 `auto`，通常它能保持内容尺寸以防止内容被裁切；
- **但当弹性子元素设置了 `overflow` 为非 `visible` 的值（如 `hidden`、`scroll` 或 `auto`）时，其 `min-height` 的计算值会自动退化为 `0`**；
- 此时，若 Flex 容器中的内容超出视口，且子元素没有声明 `flex-shrink: 0;`，浏览器就会将所有退化为 `min-height: 0` 的子项高度强制压缩到它们的极小极限——即 `2px`（刚好是 1px top border + 1px bottom border 的宽度），导致容器内所有本应正常渲染的文本和结构彻底被截断隐藏，只在页面上堆叠出大量平行的极细横线。

### 2. 最终修复方案
- 在 `variant-b-chat.css` 的 `.chat-bubble-b` 与 `.claudian-tool-call-container` 类中显式添加了 **`flex-shrink: 0;`**。
- 这项修补彻底阻止了弹性布局对气泡与日志容器进行的高度挤压，强制它们在 DOM 渲染时采用其内部内容的真实天然高度。当内容总高度超出视口时，会自然触发父视口 `.variant-b-feed-viewport` 的原生滚动条。

### 3. 验证结论
- 重新使用 Playwright 脚本在浏览器中执行检测，确认当开启“显示日志”后：
  - `.claudian-tool-call-container` 正常自适应渲染，展开出 `300.42px` 的实际日志内容高度；
  - `.chat-bubble-b.thought.resolved.expanded` 正常渲染出 `80.76px` 的实际思考流程高度；
  - 页面各日志条目的图标、Bash 命令、执行输出和文本完全可读，没有出现空横线残留，用户操作一键展开/折叠日志功能完美生效。


