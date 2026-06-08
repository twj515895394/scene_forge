# 空间连续性种子卡 (space_continuity_seed_v1.0.md)

本文件标定《华强买瓜》动物版中的空间连续性参数与站位记忆，为后续的剧本编写、分镜运镜和视频提示词提供统一的空间轴线约束。

---

## 一、 空间连续性种子数据

```yaml
space_continuity_seed:
  seed_file: projects/huaqiang-watermelon-animal/details/design/space_continuity_seed_v1.0.md
  anchor_spaces:
    - name: 街角水果摊正面对峙区
      description: 整个水果摊的正面全景，木案板为视觉中轴，红蓝雨棚为视觉顶盖。
    - name: 电子秤称重区
      description: 木案板右侧的近景特写空间，电子秤放在中央，西瓜刀插在秤旁。
    - name: 摊外空地摩托车停放区
      description: 泥石路面，位于摊位左前方约 2.5 米处，作为平头哥出场与退场的定位点。
  recurring_landmarks:
    - name: 红蓝条纹大雨棚
      role: 顶部构图锚点，确保任何广角镜头都能通过其颜色辨识摊位位置。
    - name: 墨绿色三层西瓜铁架
      role: 案板左后侧地标，用于框定摊位深度与中远景构图层级。
  entrance_exit_logic:
    - character: 平头哥 (蜜獾)
      entry_logic: 从摊位左前方的摩托车通道缓缓骑车驶入，并在左前方熄火下车。
      exit_logic: 在摊位左前方跨上摩托车，一轰油门，沿左侧马路通道绝尘离去。
    - character: 恶霸犬 (摊主)
      entry_logic: 默认在案板桌后方操作区，无进出移动，高潮爆炸时往右后方倒下。
    - character: 土拨鼠 (小弟)
      entry_logic: 默认在案板右后方，掀秤时滑稽摔倒退缩到案板下侧。
  axis_preservation_note: |
    人字形对峙轴线：平头哥始终处于镜头左前方（向右上方看），恶霸犬始终处于右后方（向左下方俯视），土拨鼠处于极右侧。
    后续分镜与视频生成必须严守“左买家、右卖家”的经典对峙轴线，镜头朝向切忌发生 180 度反转颠倒，以防产生空间混乱。
```
