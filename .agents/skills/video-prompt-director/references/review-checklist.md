# Video Prompt Director Review Checklist

在输出 `05_VIDEO_PROMPTS.md` 前逐项检查。

## Storyboard Fidelity

- [ ] 所有需要生成视频的 `SEG_###` 都有 Prompt。
- [ ] 每个 Segment 引用正确的 `SHOT_###`。
- [ ] Shot 顺序没有被擅自修改。
- [ ] 剧情结果、人物身份和关键动作结果与 Stage 04 一致。
- [ ] Hero / Bridge intent 没有被 Prompt 破坏。

## Start / End State

- [ ] 每段开始状态与 Stage 04 一致。
- [ ] 每段结束状态与 Stage 04 一致。
- [ ] 上一 Segment 的 continuity out 能成为下一 Segment 的 continuity in。
- [ ] 角色位置、朝向、动作阶段和表情阶段连续。
- [ ] 道具持有人、左右手和位置连续。

## Action Timeline

- [ ] 主动作具有明确先后顺序。
- [ ] Reaction 发生在触发事件之后。
- [ ] 重要 pause / hold 得到明确时间空间。
- [ ] 动作复杂度与 Segment 时长匹配。
- [ ] 没有用一堆静态形容词替代动作过程。

## Performance

- [ ] gaze / micro-expression / body movement 已转成可观察行为。
- [ ] 关键表演没有被过多次要动作淹没。
- [ ] 角色反应节奏与 Stage 03/04 一致。
- [ ] 风格化动作如存在，时序完整且没有改变剧情结果。

## Camera

- [ ] framing / angle / movement 清楚。
- [ ] 运镜数量不过载。
- [ ] 不存在互相冲突的推进、拉远、绕拍、摇移等要求。
- [ ] 运镜开始/停止时机在必要时明确。
- [ ] Camera Prompt 与 Stage 04 的核心镜头意图一致。

## Environment Motion

- [ ] 只保留有意义的环境动态。
- [ ] 环境动作不会抢占主体动作。
- [ ] 天气、时间和光线不会无故跳变。

## References

- [ ] reference image / storyboard / start frame / end frame 职责明确。
- [ ] 没有把场景参考误当人物身份参考。
- [ ] 没有把服装参考误当身份参考。
- [ ] 无实际 URI 时使用稳定逻辑 ID，不伪造资源地址。

## Continuity & Negative Rules

- [ ] 人物数量保持稳定。
- [ ] 服装、发型、道具和场景锁进入必要 Prompt。
- [ ] Negative Constraints 与正向要求不冲突。
- [ ] 没有机械加入巨大无关负面词库。

## Model Adapter

- [ ] 未指定模型时只输出 model-neutral Director Prompt。
- [ ] 指定模型时，Model Prompt 只改变表达方式，不改变导演意图。
- [ ] 不确定的模型专有规则没有被伪造。
- [ ] 中英版本如同时存在，语义和时间顺序一致。

## Prompt Load

- [ ] Prompt 优先保留身份、时序、动作、表演、镜头、首尾状态和连续性。
- [ ] 次要风格修饰没有造成信息过载。
- [ ] 每个 Segment 至少有一段可直接复制的最终 Prompt。

## 输出纪律

- [ ] 唯一正式输出是 `05_VIDEO_PROMPTS.md`。
- [ ] 没有拆出中文包、英文包、review pack 等正式文件。
- [ ] 没有声称已生成视频。
- [ ] Final Handoff 标明是否已准备好外部视频生成。
