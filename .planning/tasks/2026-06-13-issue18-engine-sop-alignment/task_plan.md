# Issue 18 Engine SOP Alignment

## Goal

让 `packages/engine` 的 CLI 阶段模型、依赖顺序和测试基线与 SceneForge 当前完整 SOP 保持一致，不再出现 UI/黑板要求完整流程、engine 却允许跳级推进的冲突。

## Scope

- 对齐 engine 状态机的阶段集合
- 对齐阶段依赖顺序
- 对齐 CLI / validator / schemas / tests 中的阶段假设
- 不处理聊天 UI、视觉样式、历史会话渲染

## Phases

### Phase 1: 差异审计
**Status:** complete
- 对比 SOP、左栏 UI、engine 状态机、validator、tests 的阶段集合与顺序
- 记录兼容风险与需要同步修改的文件

### Phase 2: 实现边界确认
**Status:** complete
- 明确新增阶段在 engine 中的命名、依赖和默认状态
- 明确对历史项目兼容策略

### Phase 3: 状态机与 CLI 实现
**Status:** complete
- 修改 state machine、CLI 输出和相关规则映射

### Phase 4: 测试与回归
**Status:** complete
- 更新 engine 测试
- 运行相关测试与构建验证

### Phase 5: 交付收口
**Status:** complete
- 汇总验收结果、剩余风险、后续建议

## Risks

- engine 目前是 7 阶段裁剪模型，补齐为完整 SOP 后会波及 validator、schemas、tests 和现有 `PROJECT_STATE.json` 初始化逻辑
- `reference / story / assets / design` 这些中间阶段是否都需要 validator 规则，需要先明确最小可行策略
- 历史项目如果只包含旧 7 阶段状态，可能需要兼容读取或一次性补齐默认阶段

## Verification

- 静态审查阶段集合与依赖顺序是否与 UI/SOP 一致
- 运行 engine 相关测试
- 至少验证 `status / start / complete / rules` 的关键路径

## Result

- 以普通文本 SOP 11 阶段为本票落地范围：`topic_gate -> reference -> story -> assets -> design -> script -> performance -> storyboard -> audio -> video_prompts -> publish_review`
- 历史 `PROJECT_STATE.json` 兼容策略采用自动补齐缺失默认阶段，保留可解析的未知历史阶段，避免旧状态文件直接解析失败。
- `video_prompts` 依赖已修正为 `audio`，避免跳过声音阶段。
- 已补状态机测试覆盖完整 SOP 依赖链。
- `npm run build` 通过。
- `npm test` 通过，27 个测试全部通过。
