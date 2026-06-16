Status: ready-for-agent

# Issue 10: 左侧阶段卡与阶段内产物浏览重构

## 父问题

[08-stage-artifact-access-design.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)

## 要构建什么

把当前左侧 `Pipeline Flow` 从“阶段状态列表”升级成“阶段导航 + 阶段内产物浏览器”。用户应当能够在不离开当前工作流的情况下，直接从任意有产物的阶段卡进入该阶段最佳产物，或展开查看该阶段的全部产物。

这张票聚焦左栏本身，不承担全局跨阶段检索；但它必须把“历史阶段产物仍然可以被直接发现和点击”这件事做成一等能力。

完成后，像 `topic`、`script` 这类已完成但已非当前阶段的产物，也应在左栏被明显看见并能一键进入。

## 验收标准

- [ ] 有产物的阶段卡会显示明确的产物数量提示，而不是只有状态 badge。
- [ ] 点击阶段主行时，如果该阶段存在产物，会直接打开该阶段最佳产物。
- [ ] 点击展开箭头时，只展开该阶段产物列表，不误触预览切换。
- [ ] 阶段展开区能稳定显示该阶段全部可查看产物，并支持点击切换右侧预览。
- [ ] 无产物阶段会显示结构化空态，而不是弱占位文字。

## Code Review 严格验收标准

- [ ] 审查必须确认左栏交互区分“打开最佳产物”和“展开全部产物”两类动作，避免行为歧义。
- [ ] 审查必须确认文件行布局不会再次出现严重右缩、文件名被 badge 挤压的问题。
- [ ] 审查必须确认历史阶段与当前阶段在左栏中的可点击体验一致，不再偏向当前阶段。
- [ ] 必须有至少一条验证覆盖 `script` 这类非当前阶段但有产物的浏览路径。

## 被阻塞于

- [Issue 08: 阶段产物可访问性与产物浏览体系设计](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)
- [Issue 09: 阶段映射统一与产物索引接口标准化](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/09-artifact-index-and-stage-mapping.md)
