# 2026-06-15 Output Contract 瘦身与中文主导重构方案

## 背景

用户测试发现三项核心 skill 仍存在上下文漂移，尤其 video_prompts 产物容易退化成说明稿或英文主导内容。当前三个 `output-contract.md` 行数过长：

- `scene-design-builder`: 510 行
- `scene-storyboard-director`: 1148 行
- `scene-video-prompt-builder`: 1124 行

这些文件已不适合作为执行期必读规则。它们会和 `workflow.md`、`required-deliverables.md`、`*-prompt-template.md`、`review-checklist.md` 重复，增加上下文漂移概率。

## 设计决策

`output-contract.md` 保留，但职责降级：

- 只作为“短机器契约 / 字段索引 / validator 对齐说明”。
- 不再承载完整创作流程、长 YAML 样例、资产库说明和风格生成指导。
- 单文件目标控制在 120 行以内。
- 默认执行读取顺序不再要求读取 `output-contract.md`，只在实现 validator、核对字段名或修复契约错误时按需读取。
- 三个核心 skill 的 reference 文档必须中文主导；保留英文技术 key 只用于机器字段、文件名、schema marker 和外部模型必要结构。

## 三个 skill 职责边界

### scene-design-builder

- `workflow.md`: 阶段执行顺序。
- `required-deliverables.md`: 必交文件、board/manifest 索引、禁止完成条件。
- `design-prompt-template.md`: 中文角色说明书板 prompt 体裁。
- `review-checklist.md`: 完成前自检。
- `output-contract.md`: 只列 `outputs/design.md`、设计 prompt、board index 的最小字段契约。

### scene-storyboard-director

- `workflow.md`: beat 到 VGU、shot continuity、故事板 prompt 的执行链。
- `required-deliverables.md`: 必交文件和 design reconciliation。
- `storyboard-prompt-template.md`: 中文整板故事板 prompt 体裁。
- `review-checklist.md`: 完成前自检与设计回看。
- `output-contract.md`: 只列 storyboard pack、prompt 文件、design reconciliation、下游 video handoff 的最小字段契约。

### scene-video-prompt-builder

- `workflow.md`: storyboard/audio/design 到 pack-aligned prompt 的执行链。
- `required-deliverables.md`: 中文/英文 pack 文件与 review 文件。
- `video-prompt-template.md`: pack-aligned director prompt 的中文主导正式体裁。
- `review-checklist.md`: 运行前与完成前自检。
- `output-contract.md`: 只列 video prompt pack、segment control、sound execution、copy-ready block、review 的最小字段契约。

## 验证策略

- 文档约束：
  - 三个 `output-contract.md` 行数 <= 120。
  - 三个核心 skill 的 references 标题和说明中文主导。
  - `SKILL.md` 中不再把 output-contract 作为默认必读文件。
- 程序验证：
  - 增加 engine 测试约束 `output-contract.md` 行数上限和中文主导。
  - 保持现有 validator 测试全绿。
- 构建验证：
  - `pnpm --filter @scene-forge/engine build`
  - `pnpm --filter @scene-forge/engine test`
  - `pnpm --filter @scene-forge/web-console build`

## 不做

- 不修改任何 `projects/*` 产物。
- 不回写真实项目黑板。
- 不删除 validator 仍依赖的技术 marker。
- 不把英文技术 key 翻译成无法被程序识别的中文。

