# 2026-06-02 SceneForge v3 提示词生产链路交接

> 交接时间：2026-06-02  
> 交接主题：SceneForge v3 提示词生产链路、阶段确认、上下文读取边界、Token 预算、角色空间连续性  
> 样例项目：`projects/huaqiang-watermelon-40s`  
> 当前交接目的：记录本轮围绕 `huaqiang-watermelon-40s` 复盘后形成的 v3 优化方向、已落地文档、后续实施重点与注意事项。

---

## 1. 本轮交接背景

本轮起点是对 `huaqiang-watermelon-40s` 样例的复盘。

用户重新跑了一版 40 秒《华强买瓜》项目，并指出：

1. Agent 执行阶段容易跳步。
2. 没有充分和用户讨论，就直接生成角色、道具或方案。
3. 角色提示词与用户预期仍有差距。
4. 场景、道具、故事板、视频分段提示词都有优化空间。
5. 4 段 10 秒视频拼接后，段落衔接不够自然。
6. 小弟角色在视频中存在空间位置漂移，一会儿像在华强旁边，一会儿又回到摊主老大旁边。
7. Agent 执行时经常读取 `docs/` 下大量文档，造成上下文污染和 Token 浪费。
8. SOP 执行需要明确 Token 成本控制，不能浪费本不该浪费的资源。

本轮围绕这些问题形成了 v3 的提示词生产链路优化方案。

---

## 2. v3 的核心定位

v3 不是为了让 SceneForge 更自动，而是为了让 SceneForge 更可控。

核心变化：

```text
从：Agent 自动理解、自动生成、自动推进
到：Agent 提供方案、用户确认、再生成提示词
```

v3 要解决的核心问题：

1. 阶段不乱跳。
2. 用户纠错不等于授权落盘。
3. 剧本、角色、场景道具、故事板、视频提示词都需要先有方案预览，再让用户确认。
4. 项目只输出提示词和制作说明，不生成图片、视频或音频。
5. 但提示词中可以明确写“参考角色设定图、场景道具图、故事板图”。这些图由用户基于前置提示词在外部平台手动生成。
6. 执行阶段要有上下文读取边界和 Token 预算。
7. 多角色视频需要 Blocking Map、Faction Layout、Forbidden Zone 来降低站位漂移概率。

---

## 3. 已落地文档清单

本轮已在 `docs/` 下新增 5 份 v3 文档。

## 3.1 v3 待优化明细

```text
docs/SceneForge-v3-提示词生产链路待优化明细.md
```

用途：

- 汇总 `huaqiang-watermelon-40s` 样例暴露的问题。
- 明确 v3 提示词生产链路的优化方向。
- 记录项目边界、阶段跳转、时长分段、角色提示词、场景道具、故事板、视频分段提示词等问题。
- 明确 Hero Shot、桥接分镜、道具状态机、多图参考等改造项。

已写入 commit：

```text
618bcb85aea42547f576904ecfe3409c580193b7
```

## 3.2 v3 实施计划

```text
docs/SceneForge-v3-实施计划.md
```

用途：

- v3 的主实施计划已经存在。
- 记录 P0 / P1 / P2 实施项。
- 明确需要修改的 Skill、协议、PROJECT_BOARD 字段和验收标准。
- 记录是否新增 `scene-duration-segmentation-planner` Skill 的两种方案。

已写入 commit：

```text
ff621fcde9bd51e591d930fa0aa9500cd058db84
```

## 3.3 上下文读取边界与 Token 预算规则

```text
docs/SceneForge-v3-上下文读取边界与Token预算规则.md
```

用途：

- 解决 Agent 执行过程中频繁读取 `docs/` 的问题。
- 明确执行阶段默认不扫描 `docs/`。
- 规定最小必要上下文原则。
- 提出 `context_policy` 和 `token_budget_level`。
- 建议每个 Skill 建立读取白名单。
- 把 Token 浪费作为 SOP 成本管理的一部分。

已写入 commit：

```text
d1f072dbd35c27321016baf87edcd4c60493e964
```

## 3.4 角色空间连续性与 Blocking 规则

```text
docs/SceneForge-v3-角色空间连续性与Blocking规则.md
```

用途：

- 记录视频中小弟站位漂移问题。
- 增加 Blocking Map、Faction Layout、Forbidden Zone。
- 明确华强、摊主老大、小弟三人的默认站位、允许移动区域和禁止区域。
- 建议故事板和视频提示词新增 blocking continuity 字段。
- 说明该类约束只能降低抽卡成本，不能完全消除视频模型随机性。

已写入 commit：

```text
e6b2fd5e4603290b26da103311324183359e72ed
```

## 3.5 本交接文档

```text
.handoff/2026-06-02-scene-forge-v3-prompt-pipeline-handoff.md
```

用途：

- 汇总本轮所有 v3 讨论和落地文档。
- 作为下一轮继续改 Skill、协议、PROJECT_BOARD 的入口。

---

## 4. 已确认的重要原则

## 4.1 SceneForge 只输出提示词，不生成图片和视频

必须明确：

```text
SceneForge 当前只负责输出提示词和制作说明。
不负责生成图片、视频或音频。
```

禁止 Agent 使用：

```text
我已经生成了角色图。
我已经生成了故事板图。
我已经生成了视频。
我后台调用绘图引擎运行了提示词。
我已经把生成图片嵌入文档。
```

推荐表述：

```text
已生成用于制作角色设定图的提示词。
已生成用于制作故事板图的提示词。
已生成用于基于角色图、场景道具图、故事板图生成视频的分段提示词。
这些图片和视频需要用户在外部平台手动生成。
```

## 4.2 提示词可以写“参考图”

虽然项目不生成图片和视频，但提示词中可以明确说明参考图关系。

正确口径：

```text
故事板图提示词可以写：参考已生成的角色设定图、场景图、道具图，生成故事板画面。

视频分段提示词可以写：参考角色设定图、场景道具图、故事板图，生成对应视频片段。
```

这些参考图由用户基于前置提示词在外部平台手动生成。

## 4.3 角色设定图默认允许有文字

已确认：不需要默认输出“无文字干净参考图”。

原因：

- 角色图主要作为制作资料板和多图参考输入。
- 用户需要编号、板块标题和说明文字来理解角色图结构。
- 这些图不是最终视频的首尾帧。
- 文字通常不会直接进入最终视频画面。

仅当用户明确要求时，才额外输出无文字版 Prompt。

## 4.4 桥接帧应作为桥接分镜处理

不需要新增复杂概念。

直接在故事板中增加：

```text
bridge_shot / 桥接分镜
```

用于解决 Segment 之间的动作和空间衔接。

## 4.5 必须标记 Hero Shot

故事板阶段必须明确哪些分镜是看点。

`huaqiang-watermelon-40s` 至少包括：

```text
1. 第二次“这瓜保熟吗？”摊主意识到找茬的压迫特写
2. 翻秤盘露吸铁石的道具反转特写
3. 西瓜爆汁的去害化高潮镜头
4. 小弟“萨日朗！！！”大喊特写
```

---

## 5. 当前发现的核心问题清单

## 5.1 阶段跳转问题

当前 Agent 容易跳过 `scene-script-adapter`，直接进入后续表演、分镜、音频或视频提示词阶段。

v3 要求：

```text
/scene-forge 只能执行 PROJECT_BOARD.md 中的 next_stage。
用户说“继续”只能解释为执行当前 next_stage。
不得一口气连跑多个阶段。
```

## 5.2 用户确认闸门不足

剧本、角色、场景道具、故事板、视频提示词阶段都不能直接产出最终方案。

应先输出：

```text
方案预览 / 候选方向 / 结构草案
```

用户确认后，才产出正式提示词文件。

## 5.3 时长与分段策略没有前置确认

必须在剧本改编前确认：

```text
总时长是多少？
单段视频默认 10 秒，还是 15 秒？
是否采用混合分段？
```

这会直接影响：

- Story Beat；
- 分镜数量；
- 桥接分镜；
- 每段提示词；
- 参考图配置。

## 5.4 角色提示词需要剧本驱动

角色提示词不能只是“普通设定板”。

应包含：

```text
- 正面 / 3/4 / 侧面 / 背面
- 6 到 9 个剧本驱动表情
- 4 到 6 个剧情动作姿态
- 道具交互姿态
- 角色比例对照
- 物理与安全边界
- 板块编号和说明文字
```

## 5.5 场景道具需要总参考图

因为视频平台参考图数量有限，场景和道具不能过度拆散。

v3 需要：

```text
全场景资产总参考图 / Master Scene-Prop Reference Board
```

应整合：

```text
街角水果摊主场景
角色站位
核心道具位置
道具状态矩阵
物理说明
```

## 5.6 道具需要状态机

核心道具要明确状态变化。

例如：

```text
电子秤：正常称重 -> 准备翻盘 -> 秤盘反面红磁铁暴露 -> 摊主心虚 -> 滑稽受损
西瓜：完整 -> 敲击 -> 上秤 -> 切开 -> 爆汁
水果刀：闲置 -> 摊主摸刀 -> 刀进入画面 -> 只作用于西瓜 -> 离开人物身体范围
摩托车：入场 -> 刹停 -> 停靠 -> 重新上车 -> 离场
```

## 5.7 视频衔接需要桥接分镜

`huaqiang-watermelon-40s` 拼接视频暴露出：

```text
SEG01 -> SEG02：缺少从对峙转向敲瓜的桥接。
SEG02 -> SEG03：缺少从保熟对话转向上秤的桥接。
SEG03 -> SEG04：缺少从翻秤盘揭穿转向高潮动作的桥接。
```

建议 12 个分镜升级为 15 或 16 个分镜，直接加入桥接分镜。

## 5.8 小弟站位漂移问题

视频中小弟一会儿像在华强旁边，一会儿又回到摊主老大旁边。

v3 要求增加：

```text
Blocking Map
Faction Layout
Forbidden Zone
```

《华强买瓜》默认站位：

```text
华强：摊位外侧，摩托与西瓜箱前沿。
摊主老大：摊位内侧，电子秤和西瓜堆后方。
小弟：摊主老大侧后方，小板凳、瓜子和杂物区域。
```

小弟禁止区域：

```text
华强身边
摩托车旁边
摊位外侧街面
华强和摊主之间的主冲突线
```

必须诚实说明：这只能降低抽卡成本，不能保证一次生成成功。

---

## 6. 上下文读取边界与 Token 预算

用户明确提出：SOP 执行时不要浪费不该浪费的 Token。

本轮已沉淀文档：

```text
docs/SceneForge-v3-上下文读取边界与Token预算规则.md
```

核心原则：

```text
少读但读准，少想但想对，少生成但可控。
```

## 6.1 执行阶段默认不扫描 docs

执行 Skill 时默认读取：

```text
projects/<project>/PROJECT_BOARD.md
.agents/skills/<current-skill>/SKILL.md
.agents/skills/<current-skill>/references/output-contract.md
当前阶段明确依赖的输入文件
```

默认不读取：

```text
docs/ 下的设计文档、实施计划、复盘文档
.handoff/*.md
会话记录_*.md
历史项目输出
```

除非用户明确要求分析、复盘或协议改造。

## 6.2 Token 预算等级

建议：

```text
compact：只读 PROJECT_BOARD + 当前 Skill + 必要输入文件
standard：允许读取 1-3 个明确依赖文件
deep：仅在用户要求复盘、重构、分析全链路时使用
```

默认执行阶段使用：

```text
compact
```

## 6.3 PROJECT_BOARD 建议字段

```yaml
context_policy:
  mode: minimal
  allow_docs_scan: false
  active_protocol_docs: []
  forbidden_by_default:
    - docs/plans/
    - docs/design/
    - docs/reviews/
    - docs/archived/
    - .handoff/
    - 会话记录_*.md
  token_budget:
    default_stage_budget: compact
    require_reason_for_extra_reads: true
```

---

## 7. v3 实施计划状态

v3 实施计划文档已经存在：

```text
docs/SceneForge-v3-实施计划.md
```

当前实施计划已包含：

```text
P0：项目边界、next_stage、用户确认闸门、时长分段、剧本方案、角色方向、桥接分镜、视频 continuity
P1：角色模板、全场景资产总参考图、道具状态机、故事板参考来源、中英双语完整 Prompt
P2：工程化回复风格、样例重跑、README 使用说明
```

需要后续补入或执行的增量项：

```text
P0-9：上下文读取边界与 Token 预算策略
P1 / P0.5：角色空间连续性与 Blocking Map
```

这两个增量项已分别沉淀为补充规则文档，后续改 Skill 时应同步并入正式实施计划或 Skill 协议。

---

## 8. 下一步建议

## 8.1 第一优先级：改总控和协议止血

优先修改：

```text
.agents/skills/scene-forge/SKILL.md
```

必须加入：

```text
1. 只执行 PROJECT_BOARD.next_stage。
2. 用户说“继续”不得连跑多个阶段。
3. 用户纠错默认不落盘。
4. 执行阶段默认不扫描 docs。
5. 默认 token_budget_level 为 compact。
```

## 8.2 第二优先级：改 PROJECT_BOARD 协议

需要增加：

```yaml
context_policy:
user_confirmations:
segment_strategy:
hero_moments:
bridge_shots:
prop_state_machines:
blocking_map:
faction_layout:
```

## 8.3 第三优先级：改关键 Skill

优先顺序：

```text
1. scene-script-adapter
2. scene-design-builder
3. scene-storyboard-director
4. scene-video-prompt-builder
```

重点：

```text
scene-script-adapter：先确认时长分段和剧本方案。
scene-design-builder：先给角色方向和场景道具清单，不直接生成最终 Prompt。
scene-storyboard-director：增加 bridge_shot、hero_shot、blocking_map。
scene-video-prompt-builder：增加 continuity_in/out、reference_image_plan、blocking_continuity。
```

## 8.4 第四优先级：用 v3 重跑样例

建议新建：

```text
projects/huaqiang-watermelon-40s-v3/
```

只输出提示词，不声称生成图片或视频。

验证重点：

```text
1. 是否先询问 10 秒 / 15 秒 / 混合分段。
2. 是否先给剧本方案让用户确认。
3. 是否先给角色设计方向让用户选择。
4. 是否输出全场景资产总参考图 Prompt。
5. 是否新增桥接分镜。
6. 是否明确 Hero Shot。
7. 是否保持小弟在摊主阵营侧后方。
8. 是否每段视频提示词都有 continuity_out 和 next handoff。
```

---

## 9. 本轮不要遗漏的用户偏好

1. 默认中文沟通，文档也以中文为主。
2. 用户需要的是 Markdown 文档，不是 docx。
3. 项目输出重点是提示词，不是自动生成图片/视频。
4. 用户会手动拿提示词去外部平台生成图和视频。
5. 用户非常关注提示词的实际可用性，而不是概念完整性。
6. 用户希望 SOP 不浪费 Token。
7. 用户希望阶段过程中能看到方案、选择和确认，而不是 Agent 直接替用户做决定。
8. 用户可以接受视频生成存在抽卡，但希望 SOP 尽量降低抽卡成本。

---

## 10. 交接结论

本轮已经完成 v3 的问题梳理、实施计划和补充规则沉淀。

已落地文档包括：

```text
docs/SceneForge-v3-提示词生产链路待优化明细.md
docs/SceneForge-v3-实施计划.md
docs/SceneForge-v3-上下文读取边界与Token预算规则.md
docs/SceneForge-v3-角色空间连续性与Blocking规则.md
.handoff/2026-06-02-scene-forge-v3-prompt-pipeline-handoff.md
```

下一轮应从“改 Skill 和协议”开始，而不是继续写更多规划文档。

最关键的落地顺序：

```text
scene-forge 总控止血
-> PROJECT_BOARD 协议扩展
-> script/design/storyboard/video 四个核心 Skill 升级
-> 新建 huaqiang-watermelon-40s-v3 样例验证
```

v3 的核心原则：

```text
少读但读准，少想但想对，少生成但可控。
```
