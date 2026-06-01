---
name: scene-script-adapter
description: 当用户要把 SceneForge 选中的经典片段或热点桥段改编成适合 3D 动画电影表达的剧本版本，并按改编档位控制保留与重写强度时应使用此技能。
---

# scene-script-adapter

负责把参考边界和设计结果转化为可拍、可分镜的剧本版本。输出应区分黑板摘要和长正文落盘，不在黑板里塞完整剧本。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-script-adapter`
- 已完成角色与场景设定，需要把片段改编成动画电影化表达的剧本
- 需要按改编档位决定保留原表达的比例和重写强度

如果角色与场景设定还没完成，或已经进入分镜阶段，不要优先使用本技能。

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 已到 `design_ready`。
2. 读取 `scene-reference-decider` 的边界约束和 `scene-design-builder` 的设定摘要。
3. 读取 `references/output-contract.md`，确认改编档位、输出边界和落盘路径。
4. 选择本次改编档位，并结合选题阶段建议最终确认 `performance_style`。
5. 输出适合后续分镜使用的剧本摘要、场次拆分建议和改编说明。
6. 将完整剧本正文写入 `details/script_v*.md`；黑板只记录摘要、档位、演绎风格、关键镜头提示和路径引用。
7. 输出单个 YAML 补丁块；`summary` 使用中文，必要时附英文参数值，并提示后续分镜阶段需要重点放大的动作、表情、节奏和环境反应。
8. 将状态推进建议交回总控 Skill，进入 `scene-storyboard-director`。

## 关键规则

- 保留情绪核
- 根据改编档位决定保留比例
- 增强动作可视化、表情变化和环境反应
- 不死套原版演绎和镜头
- 完整剧本落盘，黑板只保留可供分镜消费的摘要信息

## 参考资料

- `references/output-contract.md`：改编档位、黑板摘要字段和长正文落盘方式
- `docs/风险与版权边界.md`：改编强度与风险边界
