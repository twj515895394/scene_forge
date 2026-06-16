# Web Console 视觉回归验收清单

适用范围：

- `Issue 12: visual tokens and typography`
- `Issue 13: pipeline flow and artifact list visual refresh`
- `Issue 14: chat surface visual unification`
- 后续所有改动 `apps/web-console/src/index.css`
- 后续所有改动 `apps/web-console/src/styles/variant-b-layout.css`
- 后续所有改动 `apps/web-console/src/styles/variant-b-chat.css`
- 后续所有改动 `apps/web-console/src/VariantB.tsx`

## 使用方式

每次涉及 Web Console 视觉、排版、密度、三栏布局、聊天表面时，至少执行一次：

1. 构建 `@scene-forge/web-console`
2. 跑现有聊天相关回归测试
3. 对照本清单做人眼验收，记录每项 `pass / fail`

如果当前环境无法做浏览器验证，允许先做 `codereview` 式静态验收，但必须在结论里明确标注“缺少浏览器实屏验证”。

## 场景 A：三栏主工作台

目标：三栏像一块连续工作台，而不是三张割裂卡片。

通过标准：

- 顶部 header 下方，左栏、中栏、右栏的起始高度对齐。
- 左栏、中栏、右栏外边框弱化，不能出现过重卡片感。
- 列与列之间分隔线细且克制，hover 时才增强，不应长期抢眼。
- 背景深色应接近石墨灰工作台，而不是纯黑洞效果。

失败信号：

- 任一列像单独悬浮卡片。
- 中栏和右栏顶部高度与左栏不齐。
- 分隔条长期高亮或边界过粗。
- 深色背景过黑，正文反差刺眼。

## 场景 B：左栏阶段列表

目标：阶段列表紧凑、稳定、易扫读。

通过标准：

- 单行阶段项高度稳定，没有额外厚 padding。
- 被选中阶段只保留轻量选中态，不出现左侧发光阴影条。
- 阶段标题、状态 badge、箭头在同一横向栅格内对齐。
- 展开产物后，子项像 thread 延展，而不是再嵌套一张厚卡片。

失败信号：

- 当前阶段前面出现额外高亮阴影条或发光条。
- 阶段项上下留白明显偏大，导致一屏显示内容偏少。
- 展开态右缩、文件名和 kind badge 互相挤压。
- 空态像孤零零一句字，没有结构化占位。

## 场景 C：聊天区混排

目标：用户消息、AI 回复、工具卡、思考区、审批卡属于同一视觉系统。

通过标准：

- AI 正文是主舞台，标签、sender、时间戳都退后。
- 用户消息保留方向感，但不能比 AI 内容更抢眼。
- 工具卡、思考区、审批卡共享同一 panel hierarchy。
- 装饰色只作为辅助语义，不能让工具或思考块压过正文。
- hover 元信息仅在需要时出现，不破坏默认阅读节奏。

失败信号：

- 用户气泡过亮、过厚、阴影太重。
- 工具卡和审批卡像另一套产品皮肤。
- 思考区大面积紫色、荧光、边框装饰抢戏。
- sender 标签、状态字样、badge 比正文还醒目。

## 场景 D：正文排版密度

目标：正文可读，但一屏能装下更多真实内容。

通过标准：

- 中栏正文中文字号、行高、列表项间距保持紧凑。
- 段落间距小于传统文档式布局，不出现大段空白。
- 表格、引用、代码块与正文保持同一密度体系。
- 输入框上方操作栏比正文更轻、更短，不抢垂直空间。

失败信号：

- 一屏被大面积空白、卡片 padding、段间距吞掉。
- markdown 列表项上下过松。
- 表格、引用、代码块明显是另一套 spacing。
- 输入区上方按钮栏过高。

## 场景 E：右栏预览

目标：预览像连续文档阅读面，不像独立厚卡片。

通过标准：

- 右栏正文、列表项、表格密度与中栏接近。
- 标题、正文、元信息层级清楚，但不夸张拉开。
- 预览头部与正文衔接自然，不出现过厚 chrome。
- 空态和有内容态都维持同一视觉基线。

失败信号：

- 右栏正文行高过大，看起来比中栏更散。
- 顶部文件头占高过多。
- 表格 padding 过厚，导致一屏显示不了多少行。
- 空态与有内容态像两个产品。

## 场景 F：关键混合验收组合

每次视觉回归至少覆盖以下两组组合：

1. `Topic Gate` 或 `Script Adapter` 展开态 + 右侧预览打开
2. 聊天区同时存在：
   - 一条用户消息
   - 一条 AI 正文回复
   - 一条工具卡
   - 一条思考区
   - 一条审批卡或已处理授权卡

通过标准：

- 同屏混排时没有任何一种块明显像“外来皮肤”。
- 视线会先落在正文，再落在辅助信息。
- 左栏、中栏、右栏的视觉重量基本平衡。

## 静态验收命令

```bash
pnpm --filter @scene-forge/web-console build
node --test apps/web-console/dist/server/tests/conversation_parsing.test.js \
  apps/web-console/dist/server/tests/live_bubble_accumulator.test.js \
  apps/web-console/dist/server/tests/permission_prompt.test.js
```

## 当前基线结论（2026-06-12）

- `Issue 12`：已形成统一 token 与 typography 基线。
- `Issue 13`：左栏阶段列表与展开态已完成主视觉重构。
- `Issue 14`：聊天正文、工具卡、思考区、审批卡已收敛到同一视觉系统。
- 当前仍建议后续每次相关改动后保留一次真实浏览器截图验收，避免纯静态自审遗漏交互态差异。
