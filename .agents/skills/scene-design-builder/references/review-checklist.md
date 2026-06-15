# Design 阶段 Review 清单

正式推进 design 阶段前逐项检查。

## 确认闸门

- 快速执行模式：`confirmations.design_confirmed.status = confirmed`。
- 全自动模式：必须确认总控已注入 `execution_policy.mode = full_auto` 且 unlock 条件满足。

## 文件检查

- `outputs/design.md` 存在。
- 至少一个角色设计 / 角色说明书文件存在。
- 场景设计文件存在。
- 道具设计文件存在。
- `space_continuity_seed` 文件存在。
- 角色说明书图片 prompt 存在。
- 全场景资产总参考图 prompt 存在。
- 所有文件已进入 manifest。
- `PROJECT_BOARD.md stage_index.design.files.details / outputs` 已同步。

## 角色说明书板 Prompt

角色说明书图片 prompt 必须包含：

- 多视角
- 轮廓剪影
- 表情系统
- 微表情
- 动作姿态
- 关键道具交互
- 服装 / 配件 / 细节区
- 比例对照
- 边界约束

必须中文主导，英文只作为锚词、风格词和板式名词辅助。

不得退化成：

- single portrait
- poster
- cinematic portrait
- hero poster
- character poster

## 空间与道具连续性

- `space_continuity_seed` 必须覆盖空间锚点、重复地标、出入口逻辑和轴线说明。
- 核心道具必须有状态机或状态变化说明。
- 多角色项目必须有 blocking / faction 设计摘要。

## 自动修复规则

若缺结构或缺文件，只补缺失结构与注册信息；不得改变已确认的创作方向、风格包、角色身份、故事功能或参考边界。
