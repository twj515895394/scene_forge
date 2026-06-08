# 资产复用判断卡 (asset_check_v1.md)

本文件定义《华强买瓜》动物版中角色、场景和道具的资产复用策略与命中结论。

---

## 一、 资产决策数据

```yaml
data:
  story_function_summary:
    key_characters:
      - 平头哥 (蜜獾) - 华强
      - 恶霸犬 (美国恶霸/斗牛犬) - 摊主
      - 土拨鼠 - 小弟
    key_scenes:
      - 街角水果摊
    key_props:
      - 作弊电子秤 (带吸铁石)
      - 粉色踏板摩托车与安全帽
      - 爆破大西瓜

  character_assets:
    - role_name: 平头哥 (蜜獾)
      reuse_status: new_full
      asset_ref: ""
      reuse_reason: 当前资产库中没有可直接继承的拟人化蜜獾 3D 角色模型，需为本系列完整新建。
      required_adjustments: []
    - role_name: 恶霸犬 (美国恶霸/斗牛犬)
      reuse_status: new_full
      asset_ref: ""
      reuse_reason: 当前资产库中没有可直接继承的拟人化恶霸犬 3D 角色模型，需为本系列完整新建。
      required_adjustments: []
    - role_name: 土拨鼠
      reuse_status: new_full
      asset_ref: ""
      reuse_reason: 当前资产库中没有可直接继承的拟人化土拨鼠 3D 角色模型，需为本系列完整新建。
      required_adjustments: []

  scene_assets:
    - scene_name: 街角水果摊
      reuse_status: new_full
      asset_ref: ""
      reuse_reason: 需独立创建高拟真 3D 卡通水果摊场景，方便后续系列短片拍摄。
      required_adjustments: []

  prop_assets:
    - prop_name: 作弊电子秤
      prop_status: new_core_prop
      asset_ref: ""
      handling_note: 电子秤需要承担翻转、揭底、拍击等夸张物理反馈动作，属于核心道具，应单独建立道具卡并完成设计。
    - prop_name: 粉色踏板摩托车与安全帽
      prop_status: new_core_prop
      asset_ref: ""
      handling_note: 摩托车与安全帽作为平头哥的标志性交互道具，承担驻车、解盔、踩火启动排黑烟等核心动作反馈，需单独设计。
    - prop_name: 爆破大西瓜
      prop_status: embed_in_character_or_scene
      asset_ref: ""
      handling_note: 作为场景可交互物与爆破特效容器，直接嵌入场景和动作流程设计，不单独建核心道具卡。

  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - 平头哥 (蜜獾)
      - 恶霸犬 (美国恶霸/斗牛犬)
      - 土拨鼠
      - 街角水果摊
      - 作弊电子秤
      - 粉色踏板摩托车与安全帽

  asset_lock_file: projects/huaqiang-watermelon-animal/details/assets/asset_lock_v1.md
```

---

## 二、 资产锁定摘要与风险说明

```yaml
  asset_lock_summary:
    locked_characters:
      - 平头哥 (蜜獾)
      - 恶霸犬
      - 土拨鼠
    locked_scenes:
      - 街角水果摊
    locked_props:
      - 作弊电子秤
      - 粉色踏板摩托车与安全帽
    downstream_constraints:
      - 后续角色设计（scene-design-builder）必须新建上述三位动物角色的 3D 形象设定与锁定卡，不得简化或跳过。
      - 街角水果摊需建立适配 3D 卡通相机的完整三维空间和道具陈列。
      - 作弊电子秤需预留底层可分离吸铁石贴片的设计。
      - 踏板摩托车与安全帽必须保持高对比的粉色漆面，并在车身一侧带有侧倾驻车支撑。
  risk_notes:
    - 本项目所有核心角色和场景均为完整新建，首期模型制作与设定时间较长，但能为后续系列化提供高价值资产积淀。
  next_action: 进入 scene-design-builder，产出三位动物角色、水果摊场景和电子秤与摩托车道具的 3D 动画锁定卡和 Prompt。
```
