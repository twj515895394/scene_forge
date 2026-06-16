Status: completed

# Issue 05: Video Prompts 默认中文 Pack 协议

## 父问题

[implementation_plan_20260615.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sop-flow-optimization/implementation_plan_20260615.md)

## 要构建什么

把 video_prompts 阶段从默认中英双产改为默认只强制中文 pack + review。英文 pack、英文整片汇编、英文 segment 拆分全部降级为按需生成；如果英文 pack 存在，仍需符合 pack 对齐和内容结构要求。

## 验收标准

- [x] skill 文档移除“不得只生成中文 pack”的阻断表达。
- [x] validator 不再因为缺英文 pack 触发必交错误。
- [x] 中文 pack + review 缺失仍会触发必交错误。
- [x] 英文 pack 若存在，仍要通过同等结构校验。
- [x] `pnpm --filter @scene-forge/engine test` 通过。

## 执行记录

- `SF-VP-202` 英文 pack 改为 optional required artifact。
- board outputs 校验默认只强制中文 pack。
- 已生成的英文 pack 仍进入 pack 深度契约校验。
- 更新 video prompt builder 的 SKILL、output-contract、required-deliverables、workflow、review-checklist、template。
- 测试 helper 默认只生成中文 pack；新增测试覆盖英文 pack 存在但浅内容会失败。

## 验证记录

- 通过：`pnpm --filter @scene-forge/engine build`
- 通过：`pnpm --filter @scene-forge/engine test`，58 passed。

## Review 标准

- [x] 检查所有 video_prompts reference 文档中的中英双产表述已统一为“中文默认、英文按需”。
- [x] 检查 validator 没有把英文 pack 从必交降级成完全不校验。
- [x] 检查 copy-ready block、逐镜头时间码、声音继承等深度规则仍作用于中文主交付。
- [x] 检查 board stage_index 示例默认只列中文 pack 和 review。

## 被阻塞于

无 - 可以立即开始
