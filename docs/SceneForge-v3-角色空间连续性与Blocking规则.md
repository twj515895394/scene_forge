# SceneForge v3 角色空间连续性与 Blocking 规则

> 版本：v3 补充规则  
> 日期：2026-06-02  
> 来源：`huaqiang-watermelon-40s` 四段拼接视频复盘  
> 对应文档：
> - `docs/SceneForge-v3-提示词生产链路待优化明细.md`
> - `docs/SceneForge-v3-实施计划.md`

---

## 1. 背景

在 `huaqiang-watermelon-40s` 四段视频拼接样例中，除段落衔接、Hero Shot 不突出等问题外，还暴露出一个新的稳定性问题：

> 小弟的位置在不同镜头或不同 Segment 中发生漂移，一会儿像在华强旁边，一会儿又回到摊主老大旁边。

这类问题会直接破坏观众对空间关系的理解，让人物阵营、冲突线和镜头调度变得混乱。

该问题属于：

```text
角色空间连续性问题 / Blocking Continuity Issue
```

---

## 2. 问题定义

### 2.1 什么是角色站位漂移

角色站位漂移指：

```text
同一个角色在不同分镜、不同 Segment 或同一段视频内部，空间位置不稳定，突然从一个阵营或区域跳到另一个区域，且剧情中没有给出合理移动过程。
```

在本样例中，小弟应该是摊主阵营的一部分，但视频生成结果中可能会出现：

```text
- 小弟突然站到华强身边；
- 小弟出现在摊位外侧；
- 小弟出现在摩托附近；
- 小弟进入华强和摊主之间的主冲突线；
- 小弟在不同 Segment 的起始位置完全不一致。
```

### 2.2 为什么这是问题

这会导致：

1. 角色阵营混乱；
2. 观众不清楚小弟到底是谁的人；
3. 主冲突线被配角打乱；
4. 多段视频拼接时空间跳变明显；
5. 后续“萨日朗！！！”的情绪来源变弱。

---

## 3. v3 新增概念：Blocking Map

v3 故事板阶段必须增加：

```text
Blocking Map / 角色站位图
```

Blocking Map 用来定义：

```text
- 每个角色的默认站位；
- 每个角色允许移动的区域；
- 每个角色禁止进入的区域；
- 每个 Segment 开头和结尾的站位交接；
- 角色阵营关系；
- 角色与核心道具的空间关系。
```

---

## 4. 《华强买瓜》Blocking Map 建议

## 4.1 华强

```yaml
hua_qiang:
  faction: "customer_side / 单独一方"
  default_zone: "摊位外侧，靠近摩托与西瓜箱前沿"
  allowed_movement:
    - "从摩托旁移动到西瓜箱前"
    - "靠近电子秤进行观察和翻秤盘"
    - "高潮后回到摩托旁"
  forbidden_zone:
    - "摊主后场"
    - "小弟小板凳区域"
  spatial_function: "主施压者，始终从摊位外侧向摊主阵营施压"
```

## 4.2 摊主老大

```yaml
boss_vendor:
  faction: "vendor_side / 摊主阵营"
  default_zone: "摊位内侧，电子秤和西瓜堆后方"
  allowed_movement:
    - "在电子秤、西瓜箱、刀所在桌边之间移动"
    - "向前压到摊位边缘与华强对峙"
    - "被西瓜汁冲击后向摊位内侧后退"
  forbidden_zone:
    - "华强摩托车旁"
    - "摊位外侧街面深处"
  spatial_function: "主对抗者，和华强隔着摊位形成冲突线"
```

## 4.3 摊主小弟

```yaml
vendor_henchman:
  faction: "vendor_side / 摊主阵营"
  default_zone: "摊主老大侧后方，小板凳、瓜子和杂物区域"
  allowed_movement:
    - "缩到摊主老大身后"
    - "在小板凳附近看戏、嗑瓜子"
    - "受惊后向摊位内侧或后方摔倒"
    - "结尾向摊位后方逃跑并喊“萨日朗！！！”"
  forbidden_zone:
    - "华强身边"
    - "摩托车旁边"
    - "摊位外侧街面"
    - "华强和摊主之间的主冲突线"
  spatial_function: "摊主老大的跟班与反应角色，不能破坏华强与摊主的主冲突线"
```

---

## 5. v3 新增概念：Faction Layout

为了帮助视频模型理解人物关系，提示词中应增加阵营说明。

中文建议：

```text
保持清晰的阵营站位：华强是单独一方，始终在水果摊外侧的顾客位置；摊主老大和小弟是一组，始终在水果摊内侧。小弟是摊主老大的跟班，空间上贴近摊主老大或躲在摊主老大身后，不要出现在华强身边。
```

英文建议：

```text
Keep a clear faction layout: Hua Qiang is alone on the customer side outside the fruit stand; the boss vendor and the skinny assistant are together on the vendor side behind the stall. The assistant must stay near or behind the boss vendor, never beside Hua Qiang.
```

---

## 6. v3 新增概念：Forbidden Zone

每个角色都应有禁止进入区域，尤其是配角。

对小弟来说，必须明确：

```text
不要站到华强身边。
不要出现在摩托车旁边。
不要进入摊位外侧街面。
不要站在华强和摊主之间。
不要抢占主冲突线。
```

这类约束应进入：

```text
1. 场景道具总参考图 Prompt；
2. 故事板 Prompt；
3. 视频分段 Prompt；
4. continuity_in/out 字段；
5. no_jump_constraints 字段。
```

---

## 7. 故事板阶段的新增字段

`scene-storyboard-director` 输出中建议新增：

```yaml
blocking_map:
  hua_qiang:
    default_zone:
    allowed_movement:
    forbidden_zone:
  boss_vendor:
    default_zone:
    allowed_movement:
    forbidden_zone:
  vendor_henchman:
    default_zone:
    allowed_movement:
    forbidden_zone:

faction_layout:
  customer_side:
    characters: [hua_qiang]
    zone: "摊位外侧"
  vendor_side:
    characters: [boss_vendor, vendor_henchman]
    zone: "摊位内侧"

shot_blocking:
  - shot_id: SH001
    hua_qiang_position:
    boss_vendor_position:
    vendor_henchman_position:
    blocking_notes:
```

---

## 8. 视频分段提示词阶段的新增字段

`scene-video-prompt-builder` 输出中建议新增：

```yaml
blocking_continuity:
  faction_layout: "华强单独在摊位外侧；摊主老大和小弟在摊位内侧。"
  character_positions_in:
    hua_qiang:
    boss_vendor:
    vendor_henchman:
  character_positions_out:
    hua_qiang:
    boss_vendor:
    vendor_henchman:
  forbidden_position_changes:
    - "小弟不要出现在华强身边"
    - "小弟不要站到摊位外侧"
    - "小弟不要进入华强和摊主之间"
  blocking_notes:
```

`no_jump_constraints` 中应加入：

```text
保持三人空间关系稳定：华强始终在摊位外侧；摊主老大始终在摊位内侧电子秤附近；小弟始终在摊主老大侧后方的小板凳/瓜子区域，除非受惊摔倒或向摊位后方逃跑，不要出现在华强身边。
```

---

## 9. 每段视频的站位交接示例

## 9.1 SEG01

```yaml
SEG01:
  character_positions_in:
    hua_qiang: "骑摩托从街面进入，停在水果摊外侧"
    boss_vendor: "摊位内侧，竹椅或电子秤后方"
    vendor_henchman: "摊主侧后方，小板凳旁嗑瓜子"
  character_positions_out:
    hua_qiang: "摊位外侧，视线转向西瓜堆，准备伸手敲瓜"
    boss_vendor: "摊位内侧，面向华强发怒"
    vendor_henchman: "摊主侧后方，不靠近华强"
```

## 9.2 SEG02

```yaml
SEG02:
  character_positions_in:
    hua_qiang: "摊位外侧，手伸向西瓜"
    boss_vendor: "摊位内侧，盯着华强"
    vendor_henchman: "摊主侧后方，幸灾乐祸看戏"
  character_positions_out:
    hua_qiang: "摊位外侧，逼问保熟"
    boss_vendor: "摊位内侧，恼怒地拿起西瓜准备上秤"
    vendor_henchman: "摊主侧后方，缩脖子意识到不对劲"
```

## 9.3 SEG03

```yaml
SEG03:
  character_positions_in:
    hua_qiang: "摊位外侧，靠近电子秤观察"
    boss_vendor: "电子秤后方，强装镇定"
    vendor_henchman: "摊主身后或侧后方，不进入主冲突线"
  character_positions_out:
    hua_qiang: "摊位外侧，翻开秤盘露出红磁铁"
    boss_vendor: "电子秤后方，心虚转恼怒"
    vendor_henchman: "摊主后方震惊，不移动到华强旁边"
```

## 9.4 SEG04

```yaml
SEG04:
  character_positions_in:
    hua_qiang: "摊位外侧，冷静看着摊主恼羞成怒"
    boss_vendor: "摊位内侧，手摸向圆头西瓜刀或西瓜"
    vendor_henchman: "摊主后方，受惊准备后退"
  character_positions_out:
    hua_qiang: "回到摩托旁，准备离场"
    boss_vendor: "摊位内侧，被西瓜汁冲成狼狈落汤鸡"
    vendor_henchman: "摊位后方摔倒或逃跑，大喊“萨日朗！！！”"
```

---

## 10. 需要诚实说明的限制

角色站位约束只能提高稳定概率，不能保证视频模型一次生成成功。

多角色视频仍然可能出现：

```text
- 配角站位漂移；
- 阵营关系错位；
- 角色数量异常；
- 小弟突然换边；
- 配角被模型当成路人重排。
```

因此 SOP 应明确：

```text
Blocking 规则是降低抽卡成本，不是消除抽卡。
如果某段出现明显站位错误，应优先重抽该段，而不是勉强拼接。
```

---

## 11. 降低抽卡成本的建议

1. 场景道具总参考图中标出三人默认站位。
2. 故事板图中固定小弟在摊主老大侧后方。
3. 每段视频 Prompt 都重复阵营和站位约束。
4. 选择参考图时，优先使用角色站位正确的故事板图。
5. 小弟只在结尾“萨日朗！！！”时成为主角，其余时间作为摊主阵营侧后方反应角色。
6. 如果小弟站错到华强身边，优先重抽该段。
7. 不要在 Prompt 中写“小弟跑到华强旁边”“小弟围着华强转”等可能误导模型的动作。

---

## 12. 应并入 v3 的优先级

该问题建议作为：

```text
P1：角色空间连续性与 Blocking Map
```

如果项目是多角色对峙型、多人群像型，则提升为：

```text
P0.5：必须在故事板前确认 Blocking Map
```

需要修改：

```text
.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-video-prompt-builder/SKILL.md
PROJECT_BOARD 协议
```

---

## 13. 结论

`huaqiang-watermelon-40s` 中的小弟站位漂移说明：

> 多角色视频提示词不能只描述角色长相和动作，还必须描述阵营、站位、可移动区域和禁止区域。

v3 应将角色 Blocking 作为故事板和视频分段提示词的基础组成部分。

尤其是小弟这类配角，其职责不是自由移动，而是承担：

```text
摊主阵营侧后方反应角色 + 结尾“萨日朗！！！”喜剧爆点
```

只有固定他的空间锚点，后续多段视频拼接才不会让角色关系发生混乱。
