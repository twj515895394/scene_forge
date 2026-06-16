Status: ready-for-agent

# Issue 09: 阶段映射统一与产物索引接口标准化

## 父问题

[08-stage-artifact-access-design.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)

## 要构建什么

先把“阶段产物可访问性”的后端基础打稳。当前 `api/artifacts` 已经能部分返回阶段产物，但阶段映射、产物来源聚合、字段标准化仍然比较分散，不适合作为后续左栏产物浏览器和全局 `All Artifacts` 面板的稳定数据源。

这一票要提供一层统一的阶段映射与产物索引能力，使前端不再猜测：

- 某个 UI 阶段对应哪些 manifest / board 阶段
- 哪个文件是该阶段的最佳产物
- 某条产物记录是否真实存在

完成后，前端应能通过统一接口拿到“按阶段聚合后的完整产物索引”，并稳定驱动阶段 badge、产物列表和全局浏览面板。

## 验收标准

- [ ] 后端存在统一的阶段映射层，不再只对个别阶段做局部特殊判断。
- [ ] 存在标准化的产物索引接口，可按阶段聚合返回产物数量、最佳产物和全部产物。
- [ ] 每条产物记录都包含稳定的标准字段，例如阶段、kind、role、path、filename、exists、source。
- [ ] 产物聚合会对 manifest 与 `PROJECT_BOARD.md` 的重复路径做去重。

## Code Review 严格验收标准

- [ ] 审查必须确认阶段映射规则被集中定义，而不是继续散落在多个前后端文件中。
- [ ] 审查必须确认索引接口返回的是前端可直接消费的结构，而不是半成品原始数据。
- [ ] 审查必须确认缺失文件与重复路径场景有显式处理，而不是默默吞掉。
- [ ] 必须有测试覆盖至少一个多来源聚合场景和一个阶段映射场景。

## 被阻塞于

- [Issue 08: 阶段产物可访问性与产物浏览体系设计](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/08-stage-artifact-access-design.md)
