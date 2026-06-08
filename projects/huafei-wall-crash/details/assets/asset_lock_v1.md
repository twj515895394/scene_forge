# 资产锁定文件 v1

## 锁定状态总表

| 类别 | 名称 | 状态 | 路径 |
|------|------|------|------|
| 角色 | 士兰 | new_full | 待 scene-design-builder 创建 |
| 角色 | 场务小哥 | new_light | 待 scene-design-builder 创建 |
| 角色 | 导演 | new_light | 待 scene-design-builder 创建 |
| 角色 | 皇上 | new_light | 待 scene-design-builder 创建 |
| 场景 | 冷宫/棚拍片场 | new_full | 待 scene-design-builder 创建 |
| 场景 | 片场休息区 | new_light | 待 scene-design-builder 创建 |
| 场景 | 养心殿 | new_light | 待 scene-design-builder 创建 |
| 道具 | 泡沫柱子 | new_core_prop | 待 scene-design-builder 创建 |
| 道具 | 纸板柱子 | new_core_prop | 待 scene-design-builder 创建 |
| 道具 | 蹦床地板 | new_core_prop | 待 scene-design-builder 创建 |
| 道具 | 绿幕背景布 | new_core_prop | 待 scene-design-builder 创建 |
| 道具 | LED显示屏墙面 | new_core_prop | 待 scene-design-builder 创建 |
| 道具 | iPad | embed_in_scene | 附属养心殿场景 |

## 下游约束

1. 全部资产为全新原创，无复用资产
2. 士兰角色设计必须服从参考边界 must_avoid：严禁复刻任何具体剧集的旗装造型细节
3. 冷宫场景必须支持"正常冷宫→棚拍穿帮"的双状态渐进切换
4. 五个核心道具必须定义正常态/触发态/交互边界
5. 场务小哥、导演、皇上为功能性配角，轻量锁定卡即可，不需要完整角色说明书
