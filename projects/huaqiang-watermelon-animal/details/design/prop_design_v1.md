# 核心道具设定卡 - 电子秤与踏板摩托车 v1.0

本文件定义《华强买瓜》动物版中的核心道具“作弊电子秤”与“粉色踏板摩托车”的物理结构、设计要求及道具状态机。

---

## 一、 核心道具一：作弊电子秤 (Cheating Scale)

### 1. 物理特征 (Physical Specs)
*   **外观设计**：一台浅蓝色卡通造型的双面数显电子秤。外壳有磨损油腻的反光。秤盘为不锈钢拉丝材质，秤身有塑料划痕。
*   **特设物理机关**：
    1.  **磁铁容纳腔**：秤盘底部中央设计有一块可物理贴合/分离的特大圆形黑色磁铁（吸铁石）。
    2.  **红蓝贴纸**：磁铁上贴有明显的“合格”字样遮掩贴纸。
    3.  **转轴铰链**：秤盘与电子秤底盘连接处有易脱离的塑料传统卡扣，支持被平头哥猛力掀翻时，秤盘飞出、底座弹簧震颤的物理反馈。

### 2. 电子秤状态机 (Scale State Machine)
```yaml
scale_state_machine:
  states:
    - state_id: SCALE_01_NORMAL
      description: 正常称重状态。秤盘空载，数字显示屏为“0.00”。
      visible_evidence: 秤盘水平，LED 屏无红光，贴于底部的吸铁石未靠近秤传感器。
      allowed_interaction: 角色可将瓜放置其上进行正常称重。
      safety_boundary: 角色不可用物理猛力掀秤，不触发磁性干扰。

    - state_id: SCALE_02_CHEAT
      description: 吸铁石作弊状态。吸铁石贴在秤盘底部传感器旁，由于磁力干扰，显示重量自动虚高。
      visible_evidence: 西瓜放置其上时，数显强行跳跃显示“15.00”斤，老板报数“三十块”。
      allowed_interaction: 摊主点击按钮锁定数字，平头哥用怀疑眼光凝视秤。
      safety_boundary: 摊主需用手轻按台面遮掩吸铁石，防止底座穿帮。

    - state_id: SCALE_03_FLIPPED_EXPOSED
      description: 掀翻暴露状态。平头哥伸手一把将不锈钢秤盘猛烈扯翻。
      visible_evidence: 不锈钢秤盘翻转飞出落地，暴露出电子秤底部正中央粘着的一块特大黑色圆形吸铁石（露出红蓝贴纸）。底盘露出的两个铜制小弹簧因重力反弹不停抖动。
      allowed_interaction: 平头哥用爪子指着吸铁石质问，摊主气急败坏。
      safety_boundary: 底座零部件碎裂，不可复原，直接触发下一阶段的大招对峙。
```

---

## 二、 核心道具二：粉色踏板摩托车与安全帽 (Pink Scooter & Helmet)

### 1. 物理特征 (Physical Specs)
*   **外观设计**：一台圆润复古的 3D 卡通踏板摩托车 (pink vintage retro scooter)，车身喷有高亮反光的樱花粉漆面。车头配有单圆大灯（启动时发亮）和圆滚的镀铬后视镜。
*   **安全帽配件**：一个同样涂有樱花粉漆面的可爱复古哈雷安全帽 (pink retro helmet)，正面印有醒目的白色边框（与平头哥的冷静气质形成极大滑稽反差）。
*   **物理机关**：
    1.  **单侧支架**：车身左侧配有可物理收放的单侧支撑杆，倾斜驻车时支架支撑于地面。
    2.  **卡通排气管**：尾部有一个微粗的圆形排气管，启动和轰油门时，支持喷吐膨胀的圈状黑色卡通废气。

### 2. 摩托车状态机 (Scooter State Machine)
```yaml
scooter_state_machine:
  states:
    - state_id: SCOOTER_01_RIDING
      description: 骑行行驶状态。平头哥戴着粉色安全帽跨在车上，车轮高速转动。
      visible_evidence: 车头大灯发出温暖的黄光，轮胎在泥路上碾过尘土，排气管排出微弱的尾气。
      allowed_interaction: 平头哥操纵车把平稳转向，缓缓驶入水果摊范围。
      safety_boundary: 维持行驶重心，车身微向左侧倾斜。

    - state_id: SCOOTER_02_PARKED
      description: 支架驻车状态。单侧支架踢下支撑，摩托车向左侧倾斜 15 度停放在摊前路边。
      visible_evidence: 发动机熄火，车大灯关闭。平头哥将摘下的粉色安全帽松垮地挂在左侧圆反光镜（车把）上。
      allowed_interaction: 处于背景静态道具状态，作为平头哥出场与退场的定位地标。
      safety_boundary: 车辆稳定支撑，车头大灯关闭。

    - state_id: SCOOTER_03_KICKSTART_ESCAPE
      description: 踩火轰油退场状态。平头哥重新跨上摩托，踩下启动杆，车身抖动，绝尘而去。
      visible_evidence: 发动机发出巨响。平头哥戴上粉安全帽，排气管随着油门轰鸣爆发式地排出三个连续膨胀的**黑色圈状卡通烟圈 (cartoon puff smoke ring)**。
      allowed_interaction: 摩托车车轮在沙地上原地空转并打滑抛沙，随后向前疾驰。
      safety_boundary: 尾气表现限制在卡通黑色烟雾圈，严禁产生写实火花或明火。
```

---

## 三、 辅助道具：爆破大西瓜 (Exploding Watermelon)
*   **开发策略**：附属道具 (`embed_in_character_or_scene`)
*   **物理特征**：圆球状，表面墨绿条纹。内部为卡通去害化的“液体炸弹”物理构造。
*   **爆炸表现**：一爪切过后，自切缝向外爆发出极其浓密的亮红色果浆，向外呈环形气浪喷射，夹杂数颗黑色西瓜籽。果汁有晶莹的卡通液体折射。
