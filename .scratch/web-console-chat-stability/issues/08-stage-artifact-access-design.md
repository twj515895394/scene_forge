Status: design-complete

# Issue 08: 阶段产物可访问性与产物浏览体系设计

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/PRD.md)

## 要构建什么

当前 `apps/web-console` 已经具备阶段状态、聊天协作和右侧产物预览三大能力，但“每个阶段的产物都应该始终有地方可以点击查看”这条用户目标还没有形成一套稳定设计。现在的右侧预览默认只跟随**当前阶段**，左侧阶段栏虽然支持展开产物列表，但入口弱、发现成本高，导致像 `scene-script` 这样的已完成阶段，即使产物已经真实存在，用户仍会误以为“没法查看”。

这张票的目标不是直接实现，而是先沉淀一份完整的**阶段产物可访问性设计方案**，同时覆盖：

- 左侧 `Pipeline Flow` 中每阶段产物的可发现性
- 全局跨阶段产物浏览能力
- 右侧预览区与“当前阶段 / 历史阶段”之间的预览切换策略
- 后端产物索引、阶段映射、标准化返回结构

## 现状诊断

### 1. `scene-script` 不是没产物，而是难以发现

根据当前项目状态：

- `PROJECT_BOARD.md` 中 `stage_index.script.files` 已经登记：
  - `outputs/script.md`
  - `details/script_v1.0.md`
  - `details/script/beat_table_v1.0.md`
  - `details/script/video_generation_unit_plan_v1.0.md`
  - `handoffs/script.handoff.json`
- `artifacts.manifest.yaml` 中也已有 `stage: script` 的产物记录
- `/api/artifacts?stage=script` 按当前代码路径可读到这些产物

也就是说，`script` 阶段的问题不是“数据没落地”，而是“UI 没把查看入口设计成一级能力”。

### 2. 当前交互天然偏向“只看当前阶段”

右侧 `Output Artifact Visualizer` 的默认行为是：

- 跟随 `activeStage`
- 自动选当前阶段的最佳产物
- 如果当前阶段没有产物，就显示空态

这导致一个结构性问题：

- 当用户已经从 `script` 进入 `performance`
- 右侧就自动切成 `performance`
- 即使 `script` 已完成并有产物，用户不主动展开左侧、逐条点文件，就几乎感知不到它们

### 3. 这不是 `scene-script` 单点问题，而是系统性问题

凡是满足下列条件的阶段，都可能出现“产物存在但用户以为看不到”的现象：

- 阶段已经完成并产生产物
- 当前项目已推进到下一个阶段
- 用户没有主动展开该历史阶段
- 右侧预览仍绑定当前阶段

因此，`topic / script / performance / storyboard / audio / publish` 后续都可能重复踩这个坑。

## 设计目标

1. **任何阶段只要有产物，就始终有地方可点击查看**
2. **当前阶段推进与历史阶段产物浏览解耦**
3. **用户手动打开的产物不会被系统自动预览抢走**
4. **左栏适合顺流程找，全局入口适合跨阶段找**
5. **前后端阶段映射与产物结构标准化，避免“数据有、UI 不认”**

## 推荐方案

### 方案名

**双入口产物浏览体系（Mixed Access Model）**

### 核心思想

同时保留两条路径：

1. **左栏阶段卡内产物浏览**
2. **全局 `All Artifacts` 入口**

这样满足两类心智：

- 顺着 SOP 找某阶段产物
- 不关心当前阶段，只想快速翻历史产物

这是推荐方案。只改左栏虽然能缓解，但后续阶段增多后仍然不够；只做全局面板又会削弱阶段流自身价值。

## UI 布局设计

### A. 左栏 `Pipeline Flow`

每个阶段卡拆为两层：

#### 第一层：阶段主行

- 阶段编号
- 阶段名称
- 状态 badge
- 产物数量 badge，例如 `3 files`
- 展开箭头

#### 第二层：阶段展开区

- `Open latest` 快捷入口
- 全部产物列表
- 空态区域

#### 交互规则

- 点击阶段主行正文：
  - 如果该阶段有产物，直接打开该阶段最佳产物
  - 如果没有产物，仅切换阶段焦点或维持现状
- 点击展开箭头：
  - 只负责展开/收起
  - 不触发右侧预览切换
- 点击产物行：
  - 右侧预览切换到该文件
- 有产物的阶段，即使不是当前阶段，也应显示数量 badge

#### 文件行布局

采用三列：

- 左：文件图标
- 中：文件名
- 右：kind badge（`Final / Draft / Review / Handoff`）

文件名默认只显示 basename，hover 时展示完整路径。

### B. 全局 `All Artifacts` 入口

#### 位置

建议放在右侧预览头部右上角，作为全局入口按钮：

- `All Artifacts`

#### 打开方式

点击后弹出轻量侧滑面板或抽屉，不新开页面。

#### 面板结构

- 按阶段分组
- 每组显示：
  - 阶段名
  - 状态
  - 产物数量
- 组内列出全部产物
- 支持：
  - kind 过滤：`Final / Draft / Review / Handoff`
  - 文件名搜索

#### 价值

这是“全局索引”，让用户不需要沿着 SOP 回忆“该文件在哪一阶段”。

### C. 右侧预览区

右侧头部增加上下文信息：

- 当前查看阶段
- 当前文件名
- 文件 kind badge
- 来源标记：
  - `Auto-selected`
  - `Manually opened`

增加一个按钮：

- `返回当前阶段主产物`

当用户在看历史阶段文件时，可以一键回到当前阶段默认预览。

## 交互状态设计

建议新增两类前端状态：

- `selectedArtifactPath`
- `selectionMode: auto | manual`

### 行为规则

- 页面进入项目时：
  - 默认预览当前阶段最佳产物
  - `selectionMode = auto`
- 用户点击任意阶段产物：
  - 右侧切到目标文件
  - `selectionMode = manual`
- 后续聊天继续推进时：
  - 若为 `manual`，系统不得强行抢回预览
  - 若为 `auto`，系统可继续跟随当前阶段
- 用户点击“返回当前阶段主产物”：
  - 切回当前阶段最佳产物
  - `selectionMode = auto`

这条规则非常关键，用来避免“我正在看 script，系统又跳回 performance”。

## 阶段最佳产物选择策略

每个阶段定义一个 `bestArtifact` 规则：

### kind 优先级

1. `final`
2. `review`
3. `draft`
4. `preview`
5. `handoff`

### role 优先级

1. `primary_delivery`
2. `output`
3. `index`
4. `detail`
5. `handoff`
6. `quality_check`

这条规则供：

- 左栏点击阶段主行
- 进入项目默认预览
- “返回当前阶段主产物” 按钮

统一使用。

## 后端设计

### A. 统一阶段映射层

现在 `/api/artifacts` 只对 `topic/publish` 做局部映射，后续应抽成统一映射表，至少统一：

- UI stage key
- manifest stage key
- board stage key
- display name

例如：

- `topic -> topic / topic_gate`
- `script -> script`
- `performance -> performance`
- `publish -> publish / publish_review`

不要再把映射逻辑散落在多个前后端文件中。

### B. 新增标准化索引接口

保留现有：

- `GET /api/artifacts?stage=<stage>`

新增建议：

- `GET /api/artifacts-index`

返回按阶段聚合的数据结构：

- 阶段名
- 显示名
- 阶段状态
- 产物数量
- 最佳产物路径
- 全部产物列表

前端左栏 badge、全局面板、最佳产物选择都使用这条标准化数据，不再自行拼装。

### C. 标准化产物字段

后端产物对象应统一补齐：

- `stage`
- `displayStage`
- `kind`
- `role`
- `path`
- `filename`
- `exists`
- `source`
- `isBestArtifact`

这样前端只负责渲染，不负责猜测。

### D. 数据来源优先级

后端聚合建议顺序：

1. `artifacts.manifest.yaml`
2. `PROJECT_BOARD.md.stage_index`
3. 必要时 filesystem fallback

按 `path` 去重。

### E. 文件存在性标记

后端应在返回时校验文件是否存在：

- `exists: true | false`

前端据此区分：

- 可预览
- 缺失 / 失效引用

避免点开才发现找不到文件。

## 推荐落地顺序

1. 先统一后端阶段映射和标准化产物索引
2. 再升级左栏阶段卡与阶段产物浏览
3. 最后补全局 `All Artifacts` 入口和预览状态管理

## 验收标准

- [ ] 任意已完成且有产物的阶段，都能在界面中被明显发现并点击查看。
- [ ] 右侧预览不再只绑定当前阶段，而是同时支持当前阶段自动预览与历史阶段手动预览。
- [ ] 存在一个全局 `All Artifacts` 入口，用于跨阶段查看所有产物。
- [ ] 前后端对阶段映射与产物字段有统一定义，避免再出现“数据已有但 UI 不显示”的隐患。
- [ ] 方案可直接拆为后端索引、左栏浏览、全局入口三类实现票，无需再次做产品定义。

## Code Review 严格验收标准

- [ ] 审查必须确认 `scene-script` 问题被识别为系统级可访问性问题，而不是只做单阶段补丁。
- [ ] 审查必须确认设计同时覆盖左栏入口、全局入口、右侧预览状态三部分，而不是只改其中一块。
- [ ] 审查必须确认后端设计包含统一阶段映射与标准化字段，而不是继续把兼容逻辑散落在前端。
- [ ] 若实现偏离“双入口产物浏览体系”，必须在实现票中明确记录取舍与替代方案。

## 被阻塞于

无 - 可以立即开始

## 当前审计结论（2026-06-12）

- 设计与分析已完成，本票作为父设计票保留。
- 后续不直接执行本票，而是按 `09 -> 10 -> 11` 推进阶段产物可访问性实现。
