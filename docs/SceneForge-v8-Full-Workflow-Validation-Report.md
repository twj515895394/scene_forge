# SceneForge v8 全链路静态验收报告

日期：2026-06-04

## 1. 验收范围

本报告只覆盖 `v8` 文档与协议层的静态验收，不包含 `projects/` 下真实项目实跑。

本轮验收范围：

- `scene-forge` 轻黑板协议
- `assets/storyboard-methodology/` 资产库
- `scene-storyboard-director`
- `scene-video-prompt-builder`
- `scene-asset-checker`
- `scene-design-builder`
- `scene-script-adapter`
- `scene-performance-director`

## 2. 验收目标

确认以下链路已经在协议层连通：

```text
asset_lock
-> space_continuity_seed / prop_state_machines
-> beat_table / video_generation_unit_plan
-> action_continuity_chains / emotion_continuity_chains
-> storyboard video_generation_units / anchors / continuity control / dual-version storyboard
-> video prompts / model adaptation
```

并确认：

- `PROJECT_BOARD.md` 仍保持轻量黑板职责
- 方法论资产没有重新塞回黑板顶层
- 上游新产物名与下游消费名一致

## 3. 已验证项

### 3.1 黑板协议边界

已确认：

- 故事板方法论资产只通过 `runtime_policy.context_policy.allowed_runtime_asset_paths` 暴露
- 运行态索引通过 `stage_index.storyboard.files.*` 和相关阶段文件路径暴露
- 没有新增顶层 `storyboard_methodology_v8` 或等价黑板大字段

### 3.2 上游阶段补强

已确认以下产物已进入协议或执行说明：

- `scene-asset-checker`
  - `details/assets/asset_lock_v*.md`
- `scene-design-builder`
  - `details/design/space_continuity_seed_v*.md`
  - `prop_state_machines`
- `scene-script-adapter`
  - `details/script/beat_table_v*.md`
  - `details/script/video_generation_unit_plan_v*.md`
- `scene-performance-director`
  - `details/performance/action_continuity_chains_v*.md`
  - `details/performance/emotion_continuity_chains_v*.md`

### 3.3 下游消费闭环

已确认：

- `scene-storyboard-director` 已显式消费：
  - `space_continuity_seed`
  - `beat_table`
  - `video_generation_unit_plan`
  - `action_continuity_chains`
  - `emotion_continuity_chains`
- `scene-video-prompt-builder` 已显式消费：
  - `video_generation_units`
  - `opening_anchor_frame`
  - `closing_anchor_frame`
  - `space_continuity_map`
  - `action_continuity_chains`
  - `emotion_continuity_chains`
  - 控制版 / 风格版故事板
  - `model_adaptation_plan`

## 4. 静态检查结果

执行结果：

- `rg -n 'storyboard_methodology_v8|^storyboard_methodology:' ...`
  - 仅命中禁止性说明
- `rg` 检查上游新产物名
  - 已在上游产出定义和下游消费说明中闭环
- `git diff --check`
  - 通过

## 5. 当前结论

结论：`v8` 的 SOP 协议层整改已完成到可交付状态。

具体判断：

- 轻黑板协议未回退
- 故事板方法论未重新压回黑板顶层
- `Phase 5-8` 的核心文档与 contract 已连通
- 剩余工作主要是用户后续自行执行真实项目手测

## 6. 未覆盖项

本报告未覆盖：

- `projects/` 真实项目迁移
- 中等复杂度项目的全链路实跑
- 产物文件实际生成质量
- 模型平台侧的真实视频生成稳定性

## 7. 后续手测建议

若后续做真实验证，建议最少检查：

1. `PROJECT_BOARD.md` 是否仍只保留状态、索引、摘要和路由
2. `stage_index.*.files` 是否都能指向真实文件
3. `scene-storyboard-director` 是否会基于上游文件生成 `video_generation_units`
4. `scene-video-prompt-builder` 是否真的继承双版故事板、锚帧和连续性链
5. 最终视频 prompt 是否排除了故事板边框、箭头、编号和草图质感
