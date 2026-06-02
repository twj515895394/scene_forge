# SceneForge v3 实施计划

> 版本：v3 草案  
> 日期：2026-06-02  
> 对应文档：`docs/SceneForge-v3-提示词生产链路待优化明细.md`  
> 目标：将 SceneForge 从 v2 的“增强导演链路”升级为 v3 的“可确认、可控、提示词生产专用导演流水线”。

---

## 1. v3 实施目标

v3 不以增加更多自动执行为目标，而是解决以下问题：

1. 明确 SceneForge 当前只输出提示词，不生成图片、视频或音频。
2. 防止 Agent 跳阶段、自动落盘、自动推进状态。
3. 在剧本、角色、场景道具、故事板、视频提示词等关键节点增加用户确认闸门。
4. 在剧本前置阶段确认总时长、单段时长和分段策略。
5. 将角色提示词升级为剧本驱动的角色制作资料板。
6. 将场景与道具提示词升级为全场景资产总参考图 + 道具状态机。
7. 将故事板升级为主分镜 + 桥接分镜 + Hero Shot。
8. 将视频分段提示词升级为多图参考 + 开头承接 + 结尾交接 + 状态连续。

---

## 2. v3 总体链路建议

v2 链路：

```text
scene-topic-gate
-> scene-reference-decider
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

v3 建议链路：

```text
scene-topic-gate
-> scene-reference-decider
-> scene-duration-segmentation-planner
-> scene-asset-checker
-> scene-design-builder
-> scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
-> scene-audio-director
-> scene-video-prompt-builder
-> scene-publish-review
```

如果暂不新增独立 Skill，也必须将 `scene-duration-segmentation-planner` 作为 `scene-script-adapter` 的强制前置确认环节。

---

## 3. v3 状态机建议

### 3.1 新增状态

```text
duration_strategy_pending_review
duration_strategy_confirmed
asset_plan_pending_review
design_direction_pending_review
script_plan_pending_review
script_ready_pending_review
character_prompt_plan_pending_review
scene_prop_prompt_plan_pending_review
storyboard_plan_pending_review
video_prompt_plan_pending_review
```

### 3.2 关键 ready 状态保留

```text
design_ready
script_ready
performance_ready
storyboard_ready
audio_ready
video_prompts_ready
published
```

### 3.3 推荐推进模型

```text
方案/草案 pending_review
-> 用户确认
-> 正式产物 ready
-> next_stage 更新
```

示例：

```text
script_plan_pending_review
-> 用户确认剧本方案
-> script_ready
-> next_stage: scene-performance-director
```

---

## 4. PROJECT_BOARD 字段扩展

### 4.1 时长与分段策略字段

```yaml
target_total_duration_seconds:
segment_duration_seconds:
segment_strategy:
  mode: fixed_10s | fixed_15s | mixed
  segments:
    - segment_id:
      duration_seconds:
      narrative_function:
      expected_shot_count:
      requires_bridge_out:
duration_confirmed_by_user: false
duration_confirmation_notes:
```

### 4.2 用户确认字段

```yaml
user_confirmations:
  duration_strategy:
    confirmed: false
    confirmed_at:
    notes:
  script_plan:
    confirmed: false
    confirmed_at:
    notes:
  character_design_direction:
    confirmed: false
    confirmed_at:
    notes:
  scene_prop_design_direction:
    confirmed: false
    confirmed_at:
    notes:
  storyboard_plan:
    confirmed: false
    confirmed_at:
    notes:
  video_prompt_strategy:
    confirmed: false
    confirmed_at:
    notes:
```

### 4.3 Hero Shot 字段

```yaml
hero_moments:
  - hero_id:
    title:
    related_story_beat:
    related_shots:
    narrative_function:
    visual_focus:
    dialogue_anchor:
    sound_anchor:
```

### 4.4 桥接分镜字段

```yaml
bridge_shots:
  - shot_id:
    bridge_from_segment:
    bridge_to_segment:
    continuity_function:
    character_position_out:
    prop_state_out:
    next_segment_handoff:
```

### 4.5 道具状态机字段

```yaml
prop_state_machines:
  electronic_scale:
    - state_id: Scale_State_A
      description:
      visible_in_shots:
  watermelon:
    - state_id: Melon_State_A
      description:
      visible_in_shots:
  knife:
    - state_id: Knife_State_A
      description:
      visible_in_shots:
  motorcycle:
    - state_id: Motor_State_A
      description:
      visible_in_shots:
```

---

## 5. P0 实施项

## P0-1：统一项目边界口径

### 目标

所有 Skill 和文档统一说明：SceneForge 只生产提示词与制作说明，不生成图片、视频、音频。

### 修改范围

```text
README.md
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-audio-director/SKILL.md
```

### 要求

禁止出现：

```text
已生成图片
已生成视频
后台调用绘图引擎
生成并嵌入图片
```

统一改为：

```text
已生成用于外部平台生成图片/视频的提示词。
图片/视频需由用户在外部平台手动生成。
```

---

## P0-2：总控严格按 next_stage 执行

### 目标

防止 `/scene-forge` 自动跳阶段。

### 修改范围

```text
.agents/skills/scene-forge/SKILL.md
PROJECT_BOARD 协议文档
```

### 执行规则

每次运行前必须读取：

```yaml
project_status:
next_stage:
```

并输出：

```text
当前阶段：xxx
下一阶段：xxx
本次只会执行：xxx
本次将产出/修改：xxx
是否需要用户确认：是/否
```

若用户未明确要求跳阶段，禁止执行非 `next_stage` 阶段。

---

## P0-3：用户纠错默认不落盘

### 目标

把“讨论/纠错”和“执行/写入”分开。

### 修改范围

```text
.agents/skills/scene-forge/SKILL.md
所有子 Skill 的执行协议
```

### 规则

用户提出问题、纠错、建议时，默认流程为：

```text
理解用户反馈
-> 复述问题
-> 给出修改方案
-> 等用户确认是否写入
```

只有用户明确说“更新到文件 / 写入仓库 / 直接改 / 执行”时，才允许修改文件。

---

## P0-4：增加时长与分段策略确认

### 目标

在剧本改编前确认总时长和单段生成时长。

### 新增 Skill 方案

新增：

```text
.agents/skills/scene-duration-segmentation-planner/SKILL.md
.agents/skills/scene-duration-segmentation-planner/references/output-contract.md
```

### 轻量方案

若暂不新增 Skill，则把该环节并入：

```text
.agents/skills/scene-script-adapter/SKILL.md
```

作为强制前置检查。

### 必问问题

```text
你希望单段视频生成时长采用哪种？
A. 10 秒一段
B. 15 秒一段
C. 混合分段
```

### 输出字段

```yaml
target_total_duration_seconds:
segment_duration_seconds:
segment_strategy:
duration_confirmed_by_user:
```

---

## P0-5：剧本改编先输出方案，不直接定稿

### 目标

让用户先确认剧本路线，再生成正式剧本。

### 修改范围

```text
.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-script-adapter/references/output-contract.md
```

### 新流程

```text
输入主题/参考/时长策略
-> 输出剧本改编方案预览
-> 用户确认
-> 生成正式剧本
```

### 剧本方案预览必须包含

```text
- 总时长
- 分段策略
- Story Beat 列表
- 每个 Beat 的核心台词
- 必须保留的原台词
- 可压缩或改写的台词
- 去害化动作方案
- Hero Moment
- 风险点
```

---

## P0-6：角色设计先输出方向选项

### 目标

避免 Agent 直接生成不符合用户想象的角色设定。

### 修改范围

```text
.agents/skills/scene-design-builder/SKILL.md
角色提示词输出协议
```

### 新流程

```text
角色清单确认
-> 角色方向候选
-> 用户选择/修改
-> 生成角色设定 Prompt
```

### 输出示例

```text
华强：
A. 冷峻压迫型
B. 动画化喜剧冷面型
C. 更接近原剧写实型

摊主：
A. 粗鲁横蛮型
B. 市侩滑稽型
C. 外强中干型

小弟：
A. 瘦高谄媚型
B. 矮小机灵型
C. 胆小夸张反应型
```

---

## P0-7：故事板增加桥接分镜与 Hero Shot

### 目标

解决多段视频拼接时的跳跃问题，并突出重点看点。

### 修改范围

```text
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-storyboard-director/references/output-contract.md
```

### 新增字段

```yaml
shot_type: setup_shot | action_shot | bridge_shot | hero_shot
hero_moment_id:
bridge_from_segment:
bridge_to_segment:
continuity_function:
```

### 要求

每个 Segment 至少包含：

```text
起始分镜
中段推进分镜
重点/动作分镜
结尾桥接分镜
```

如果 4 段视频，则至少需要 3 个桥接分镜。

---

## P0-8：视频分段提示词增加连续性字段

### 目标

让视频提示词不仅描述本段内部，还描述如何接上一段、交给下一段。

### 修改范围

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-video-prompt-builder/references/output-contract.md
```

### 新增字段

```yaml
continuity_in_visual:
continuity_out_visual:
prop_state_in:
prop_state_out:
character_position_in:
character_position_out:
hero_moment:
reference_image_plan:
no_jump_constraints:
```

### 多图参考默认方案

```text
Ref 1：角色设定总参考图
Ref 2：场景道具总参考图
Ref 3：本段起始分镜图
Ref 4：本段中段分镜图
Ref 5：本段结束/桥接分镜图
```

---

## 6. P1 实施项

## P1-1：角色设定 Prompt 标准模板

### 目标

统一不同 Agent 输出角色图提示词的结构。

### 模板内容

```text
1. 角色主视图
2. 正面 / 3/4 / 侧面 / 背面
3. 6-9 个剧本驱动表情矩阵
4. 4-6 个剧情动作姿态
5. 角色与核心道具交互姿态
6. 角色之间比例对照
7. 服装材质锚点
8. 物理与安全边界
9. 板块编号、标题和说明文字
```

### 注意

默认允许角色板带文字标注。无文字版只在用户明确要求时输出。

---

## P1-2：新增全场景资产总参考图 Prompt

### 目标

适配视频模型最多 5 张图参考的实际限制。

### 修改范围

```text
.agents/skills/scene-design-builder/SKILL.md
场景与道具提示词输出协议
```

### 输出内容

```text
Master Scene-Prop Reference Board
- 街角水果摊主场景
- 角色站位区
- 核心道具状态矩阵
- 比例与物理说明
```

---

## P1-3：道具状态机

### 目标

保证道具在故事板和视频分段提示词中的状态连续。

### 修改范围

```text
scene-design-builder
scene-storyboard-director
scene-video-prompt-builder
PROJECT_BOARD 协议
```

### 核心道具

```text
电子秤
西瓜
水果刀
摩托车
小板凳
瓜子/牙签
```

---

## P1-4：故事板 Prompt 支持参考角色/场景道具图

### 目标

让故事板图提示词显式说明参考已生成的角色设定图和场景道具图。

### 推荐前缀

```text
参考已生成的角色设定图、场景道具总参考图，保持角色外形、服装、道具位置和场景结构一致，生成该编号故事板图。
```

---

## P1-5：中英双语完整可复制 Prompt

### 目标

所有最终 Prompt 都能直接复制到外部平台使用。

### 要求

```text
- 中文完整 Prompt
- 英文完整 Prompt
- 不使用“同上”“参考前文”“沿用上述设定”
- 每个 Prompt 块都独立可用
```

---

## 7. P2 实施项

## P2-1：回复风格工程化

减少夸张赞美式表达，改为：

```text
收到。我的理解是 xxx。
本次只会修改 xxx，不会推进阶段。
是否写入文件？
```

## P2-2：示例项目重跑

用 v3 链路重新跑一次 `huaqiang-watermelon-40s-v3` 样例，只输出提示词，不声称生成图片或视频。

## P2-3：补充 README 使用说明

说明用户如何：

1. 使用角色 Prompt 手动生成角色设定图；
2. 使用场景道具 Prompt 手动生成参考图；
3. 使用故事板 Prompt 手动生成故事板图；
4. 使用视频 Prompt 和参考图在外部视频平台生成片段；
5. 将多段视频手动剪辑拼接。

---

## 8. 文件修改清单

## 8.1 新增文件

```text
docs/SceneForge-v3-提示词生产链路待优化明细.md
docs/SceneForge-v3-实施计划.md
```

可选新增：

```text
.agents/skills/scene-duration-segmentation-planner/SKILL.md
.agents/skills/scene-duration-segmentation-planner/references/output-contract.md
```

## 8.2 修改文件

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-script-adapter/SKILL.md
.agents/skills/scene-design-builder/SKILL.md
.agents/skills/scene-storyboard-director/SKILL.md
.agents/skills/scene-video-prompt-builder/SKILL.md
.agents/skills/scene-performance-director/SKILL.md
.agents/skills/scene-audio-director/SKILL.md
docs/皮克斯路线PROJECT_BOARD与状态机增量协议.md
README.md
```

---

## 9. 实施顺序建议

## 阶段 1：协议止血

目标：先防止继续跳阶段和误导生成。

```text
1. 修改 scene-forge 总控协议
2. 明确只输出提示词
3. 增加 next_stage 强校验
4. 增加用户纠错不自动落盘规则
```

## 阶段 2：时长与剧本前置确认

```text
1. 增加时长与分段策略确认
2. 修改 script-adapter 输出协议
3. 增加剧本方案预览
4. 增加用户确认后再定稿
```

## 阶段 3：角色、场景、道具提示词模板升级

```text
1. 角色设定图标准模板
2. 角色方向候选机制
3. 全场景资产总参考图 Prompt
4. 道具状态机
```

## 阶段 4：故事板和视频提示词升级

```text
1. shot_type 字段
2. Hero Shot 机制
3. 桥接分镜
4. 视频 continuity 字段
5. 多图参考计划
```

## 阶段 5：样例验证

```text
1. 新建 huaqiang-watermelon-40s-v3
2. 按 v3 链路只输出提示词
3. 用户手动生成角色图、场景道具图、故事板图和视频
4. 根据结果复盘 Prompt 是否继续优化
```

---

## 10. 验收标准

## 10.1 流程验收

- `/scene-forge` 不再跳阶段。
- 用户说“继续”只执行当前 `next_stage`。
- 用户纠错不会自动落盘。
- 剧本前会询问 10 秒、15 秒或混合分段。
- 每个关键阶段都有方案预览和用户确认。

## 10.2 产物验收

- 所有产物都是提示词或文本说明。
- 不声称生成了图片、视频或音频。
- 角色 Prompt 包含表情矩阵、动作矩阵、道具交互和说明文字。
- 场景道具 Prompt 包含全场景资产总参考图。
- 故事板包含 bridge_shot 和 hero_shot。
- 视频分段 Prompt 包含 continuity_in/out、prop_state、reference_image_plan。

## 10.3 样例验收

以 `huaqiang-watermelon-40s-v3` 为例：

- 用户能先确认 40 秒总长和 10 秒/15 秒/混合分段。
- 用户能选择剧本改编方向。
- 用户能选择角色设计方向。
- 故事板明确突出：
  - 第二次“这瓜保熟吗？”；
  - 翻秤盘露吸铁石；
  - 西瓜爆汁；
  - 小弟“萨日朗！！！”。
- 4 段视频提示词每段都有明确的开头承接和结尾交接。

---

## 11. 风险与注意事项

1. 不要把 v3 做成更复杂的自动系统。v3 的核心是更可控，而不是更自动。
2. 不要把“确认闸门”做成形式主义。每个确认点都必须给用户有价值的信息和选择。
3. 不要默认所有项目都适合 10 秒分段。10 秒只是默认建议，不是固定规则。
4. 不要把桥接分镜独立成复杂系统。它就是故事板中的一种分镜类型。
5. 不要默认角色图必须无文字。当前工作流中，带编号和说明的角色板更有用。
6. 不要在提示词里过度复杂化多图参考。应保持“参考角色图、场景道具图、故事板图”的自然语言表达。

---

## 12. 结论

v3 实施的核心路线：

```text
先止血：不跳阶段、不乱落盘、不声称生成图片视频
再前置：确认时长、分段、剧本方向、角色方向
再增强：角色模板、场景道具总参考图、道具状态机
再优化：桥接分镜、Hero Shot、多图参考视频提示词
最后验证：用 huaqiang-watermelon-40s-v3 重新跑一版提示词链路
```

完成 v3 后，SceneForge 应该从“自动创作型 Agent”升级为“用户可控的提示词制片流水线”。
