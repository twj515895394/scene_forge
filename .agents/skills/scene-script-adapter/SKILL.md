---
name: scene-script-adapter
description: 当用户要把 SceneForge 选中的经典片段或热点桥段改编成适合 3D 动画电影表达的剧本版本，并按改编档位控制保留与重写强度，同时产出 Story Beat 供表演导演和分镜阶段消费时应使用此技能。
---

# scene-script-adapter

负责把参考边界和设计结果转化为可拍、可表演、可分镜的剧本版本。

本阶段不只输出剧情摘要，还必须产出更清晰的 `story_beats`，作为后续 `scene-performance-director` 和 `scene-storyboard-director` 的共同输入。

完整剧本正文继续落盘，黑板只记录摘要、档位、演绎风格、Story Beat 和路径引用。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-script-adapter`
- 已完成角色与场景设定，需要把片段改编成动画电影化表达的剧本
- 需要按改编档位决定保留原表达的比例和重写强度
- 需要在进入表演导演和分镜之前，先明确故事节拍、情绪节奏和关键表演提示

如果角色与场景设定还没完成，或已经进入表演/分镜阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `design_ready`。
2. 读取 `scene-reference-decider` 的边界约束和 `scene-design-builder` 的设定摘要。
3. 读取 `references/output-contract.md`，确认改编档位、Story Beat 结构、输出边界和落盘路径。
4. 选择本次改编档位，并结合选题阶段建议最终确认 `performance_style`。
5. 输出适合后续表演导演和分镜使用的剧本摘要、Story Beat、场次拆分建议和改编说明。
6. 将完整剧本正文写入 `details/script_v*.md`；黑板只记录摘要、档位、演绎风格、Story Beat、关键镜头提示和路径引用。
7. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值。
8. 将状态推进建议交回总控 Skill，进入 `scene-performance-director`。

## 关键规则

- 保留情绪核。
- 根据改编档位决定保留比例。
- 增强动作可视化、表情变化、环境反应和情绪节拍。
- `story_beats` 必须表达叙事功能、情绪目标、视觉焦点、表演提示和节奏提示。
- 不死套原版演绎和镜头。
- 完整剧本落盘，黑板只保留可供后续阶段消费的摘要信息。
- 本阶段完成后不直接进入分镜，而是先进入 `scene-performance-director`。

## 参考资料

- `references/output-contract.md`：改编档位、Story Beat 结构、黑板摘要字段和长正文落盘方式
- `docs/皮克斯电影风格路线实施计划.md`：当前 pixar_like 路线实施计划
- `docs/风险与版权边界.md`：改编强度与风险边界
