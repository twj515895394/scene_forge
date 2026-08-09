# Storyboard Director Review Checklist

在输出 `04_STORYBOARD.md` 前逐项检查。

## Traceability

- [ ] 所有关键 `SCN_###` 都被 Shot 覆盖。
- [ ] 每个 `SHOT_###` 能追溯到 `SCN_### / BEAT_###`。
- [ ] 每个 `SEG_###` 明确包含哪些 Shot。
- [ ] 没有为了“镜头好看”新增剧本不存在的剧情事实。

## Cinematic Language

- [ ] 每个 Shot 有明确叙事目的。
- [ ] 景别、机位、构图和运镜服务故事，不是随机电影化。
- [ ] 焦段使用“感觉/视觉效果”表达，不伪造没有意义的器材数据。
- [ ] 镜头切换频率与情绪和信息密度匹配。
- [ ] 关键 reveal 没有被提前泄露。

## Performance Visibility

- [ ] 剧本要求看清的微表情使用了足够近的镜头。
- [ ] Reaction Moment 有观众可见的反应时间。
- [ ] pause / hold 没有被过度切镜破坏。
- [ ] 重要 gaze、gesture、body shift 能在画面中成立。
- [ ] 没有让镜头设计覆盖或否定 Stage 03 的表演意图。

## Blocking & Geography

- [ ] 人物站位符合 Stage 02 spatial lock。
- [ ] 进出方向合理。
- [ ] 视线方向连续。
- [ ] 运动方向连续。
- [ ] 轴线没有无意跳轴。
- [ ] 故意跳轴时有明确叙事目的。

## Prop & State Continuity

- [ ] 道具持有人、位置和状态与 Stage 03 一致。
- [ ] Costume / Hair / Scene State 没有无意漂移。
- [ ] Shot 的 continuity_in 能接上前一 Shot 的 continuity_out。
- [ ] Segment 的 start/end state 可以真实衔接。

## Hero / Bridge

- [ ] Hero Shot 服务情绪或剧情，不只是漂亮。
- [ ] Bridge Shot 真正解决动作、空间、视线或 Segment 衔接问题。
- [ ] 没有为了凑镜头数滥用 Hero/Bridge 标签。

## Segment / VGU

- [ ] Segment 长度适合后续视频生成策略。
- [ ] Segment 内动作复杂度不过载。
- [ ] Segment 有明确 primary action / performance / camera behavior。
- [ ] Start / End State 足够 Stage 05 编写提示词。
- [ ] 需要首帧/尾帧参考的 Segment 已标明。

## Storyboard Prompt

- [ ] Prompt 与 Shot 定义一致。
- [ ] 人物数量、身份、位置和动作明确。
- [ ] Scene / Prop / Costume 连续性已进入 Prompt。
- [ ] 构图、机位和光线信息足够执行。
- [ ] `control_storyboard / styled_storyboard / keyframe` 用途明确。
- [ ] 不需要的 Prompt 没有机械生成。

## Duration

- [ ] Shot 时长总和与 Scene/整片时长基本一致。
- [ ] Segment 时长与 Shot 时长没有明显矛盾。
- [ ] 高潮、反应和重要停顿得到足够时间。

## 输出纪律

- [ ] 唯一正式输出是 `04_STORYBOARD.md`。
- [ ] 没有单独输出 VGU/Shot Continuity/Prompt Pack 正式文件。
- [ ] 没有写最终视频生成 Prompt。
- [ ] 没有声称已生成故事板图片或视频。
- [ ] Downstream Handoff 完整。
