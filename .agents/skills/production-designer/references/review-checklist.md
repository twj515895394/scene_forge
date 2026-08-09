# Production Designer Review Checklist

在输出 `02_PRODUCTION_DESIGN.md` 前逐项检查。

## 上游继承

- [ ] 所有 `CHAR_### / SCENE_### / PROP_###` 沿用上游稳定 ID。
- [ ] 没有改变 Stage 01 的角色身份、人物关系、故事时代或关键剧情事实。
- [ ] `must_keep / must_avoid` 已正确继承。

## 资产策略

- [ ] 每个重要视觉实体都有 reuse / modify / new / not_required 判断。
- [ ] 没有现成资产时不会无意义阻塞。
- [ ] 已有参考图的职责区分明确，不混用 identity / clothing / hair / style reference。

## 角色设计

- [ ] 主角和关键配角都有完整视觉锚点。
- [ ] 脸型、五官、肤色、发型、体型、服装、鞋子、配饰没有互相冲突。
- [ ] 不可漂移项和可变化项明确。
- [ ] 多角色之间具备足够区分度。
- [ ] 角色造型符合故事时代、地域和身份。

## 场景设计

- [ ] 所有关键场景都有空间逻辑。
- [ ] 门、窗、桌、道路、关键物件等方向关系没有冲突。
- [ ] 场景时代、地域、材质和灯光与故事一致。
- [ ] 重要可交互区域足以支持后续 Blocking 和分镜。

## 道具设计

- [ ] 只保留真正影响剧情或连续性的关键道具。
- [ ] 道具尺寸、材质、外观和状态变化清晰。
- [ ] 道具状态与 Story Beats 不冲突。

## Continuity Bible

- [ ] Character / Costume / Hair / Scene / Prop / Spatial Lock 已建立。
- [ ] 允许变化项不会破坏角色和场景识别。
- [ ] 下游不需要重新猜测“人物到底穿什么、场景到底怎么摆”。

## Prompt

- [ ] Prompt 由 Canonical Design 编译，而不是反过来。
- [ ] Prompt 中包含用户最重要的视觉约束。
- [ ] Prompt 任务类型明确。
- [ ] 构图、视角、背景、光线和风格信息足够执行。
- [ ] 需要身份一致性时，已明确参考图职责。
- [ ] 负向约束没有与正向要求冲突。
- [ ] 不需要的 Prompt 类型没有为了凑数量而生成。

## 输出纪律

- [ ] 唯一正式输出是 `02_PRODUCTION_DESIGN.md`。
- [ ] 没有额外正式 asset-check/design-prompt 文档。
- [ ] 没有声称已生成图片。
- [ ] Downstream Handoff 完整。
