# reuse-history.md

# 《百万英镑》经典桥段资产复用历史

本文件记录该全局复用资产（Source Asset）在不同项目中的实际引用、改编情况与复用模式。

## 1. 资产基本引用规则
在项目 `PROJECT_BOARD.md` 的 `source_asset_ref` 中引用本资产时，需指定复用模式 `reuse_mode`：
*   `direct_reference`：经典复刻模式。完全保留原片的1903年背景、台词大纲与人物身份，仅用3D动画重制。
*   `adapted_reference`：混合改编模式。例如保留物理空间/场地，但改编人物角色与道具，或者相反。
*   `structure_only`：纯结构复用模式。仅抽取“傲慢变谄媚”的戏剧内核，场地和角色完全重新设计。

## 2. 复用历史记录表

| 记录日期 | 引用项目ID | 项目路径 | 复用模式 | 改编方向说明 | 资产状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-06-03 | `million-pound-note` | `projects/million-pound-note/` | `adapted_reference` | 物理场地（1903年古典英式餐厅）保持不变，角色及支付道具进行题材跨界改编（改编为未受封落魄唐朝和尚吃面与大唐黄金通关文牒反转）。 | `confirmed` / 已创建 |
| 2026-06-03 | `million-pound-biao` | `projects/million-pound-biao/` | `adapted_reference` | 物理场地（1903年古典英式餐厅）保持不变，角色及支付道具进行题材跨界改编（改编为东北搞笑角色“彪哥”吃大葱面与维多利亚黑卡反转，结尾加长枪走火）。 | `confirmed` / 已创建 |

