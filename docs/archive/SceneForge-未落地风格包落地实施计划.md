# SceneForge 未落地风格包落地实施计划

## 1. 文档目标

本文档用于指导 SceneForge 当前 26 个未落地风格包的后续落地顺序、批次拆分、产物要求与验收标准。

这份计划只回答四个问题：

1. 哪些风格先做。
2. 每一批为什么这样排。
3. 每个风格落地前必须补齐哪些资料。
4. 如何判断该风格已经具备“可进入 `style_profiles/` 建包”的条件。

---

## 2. 规划原则

### 2.1 总原则

1. 先做差异明显、复用价值高、最容易验证链路的风格。
2. 不把 `Exploration Pool` 直接当正式落地 backlog。
3. 单批次尽量覆盖不同 `style_family`，但不强求一次跨完全部媒介。
4. 每次只推进少量风格，避免风格包数量膨胀快于主链适配质量。

### 2.2 与现有主链的关系

当前 `scene-design-builder / scene-storyboard-director / scene-video-prompt-builder` 已经具备按 `director_style_id` 读取风格包的能力。

因此后续新增风格包的核心问题不再是“能不能接入”，而是：

1. 风格定义是否足够清楚。
2. 是否真的和现有风格有差异。
3. 共享资产与风格专属约束是否拆得干净。

### 2.3 进入建包前的最小资料门槛

每个风格在进入 `style_profiles/<director_style_id>/` 前，至少要补齐：

1. 中文讨论名（Chinese Discussion Name）
2. 英文标签（English Label）
3. 系统风格包 ID（Director Style ID）
4. 所属大类（Style Family）
5. 成熟度状态（Maturity）
6. 核心视觉特征（Visual Traits）
7. 核心表演特征（Performance Traits）
8. 核心镜头/节奏特征（Camera and Rhythm Traits）
9. 适配题材（Suitable Topics）
10. 风险提示/边界（Risk Notes）
11. 推荐演绎力度（Recommended Performance Styles）
12. 反向禁忌（Negative Constraints）
13. 与相邻风格的区分点（Differentiation Notes）

---

## 3. 三阶段推进路线

### 3.1 阶段 A：先完成 `Phase 2` 高完整度风格盘点

目标：

- 把 11 个 `Phase 2` 风格全部补到可建包级别的索引卡质量

产物：

- [SceneForge-未落地风格包详细梳理.md](/Users/tangwujun/Documents/trae_projects/scene_forge/docs/SceneForge-未落地风格包详细梳理.md)
- 每个风格的差异化说明
- 批次优先级结论

完成标准：

- 11 个 `Phase 2` 风格都具备统一字段结构
- 每个风格都能说清“它不是哪个现有风格”
- 能直接为建包写出 7 个核心文件的内容提纲

### 3.2 阶段 B：为 `Exploration Pool` 建立受控候选池

目标：

- 不急着建包，但避免未来再次从零讨论

产物：

- 15 个 `Exploration Pool` 风格的中等细度卡片
- 提前标出高潜方向与暂缓方向

完成标准：

- 每个条目至少有基本风格定义、代表作品、风险提示、推荐演绎力度
- 标清哪些可升级为 `Phase 2`

### 3.3 阶段 C：按批次进入真实建包

目标：

- 不是一次性建完 26 个风格包，而是分 3 批推进

产物：

- 每批次对应的 `style_profiles/` 建包清单
- 每批次的差异化自查记录
- 必要时补充主链 skill 的风格特异约束

完成标准：

- 每个新风格都能被清楚识别
- 不出现“名字不同但输出差不多”的伪风格包

---

## 4. 建议批次拆分

### 4.1 Batch 1：近期最值得落地的 4 个风格包

1. `coming_of_age_3d`
2. `realist_cinematic_3d`
3. `classic_studio_wuxia`
4. `noir_detective`

选择理由：

- 都是高可复用主风格
- 与当前四个已落地 `Phase 1` 风格差异明显
- 能直接检验“温暖 3D / 写实 3D / 古典武侠 / 冷调 noir”四种大方向

建议补齐顺序：

1. 先写索引卡定稿
2. 再写 7 个核心文件提纲
3. 再决定是否进入正式建包

验收重点：

1. `coming_of_age_3d` 与 `pixar_like` 不混
2. `realist_cinematic_3d` 不只是“把颜色调灰”
3. `classic_studio_wuxia` 与 `neo_wuxia_cinematic` 边界清楚
4. `noir_detective` 与 `social_realist_tension` 边界清楚

### 4.2 Batch 2：风格辨识度强的 4 个风格包

1. `mythic_epic_3d`
2. `anime_cinematic`
3. `urban_graphic_2d`
4. `heroic_motion_comic`

选择理由：

- 四个方向都高度依赖强风格语言
- 很适合检验 SceneForge 在非温和写实风格上的拉开能力

验收重点：

1. `mythic_epic_3d` 要有空间和仪式感，不是单纯大场面
2. `anime_cinematic` 要有静帧与爆发的节拍骨架
3. `urban_graphic_2d` 要有图形设计规则，不是杂乱潮流拼贴
4. `heroic_motion_comic` 要有低成本高冲击逻辑，不是假动画

### 4.3 Batch 3：质感型和诗性型风格包

1. `poetic_2d_fantasy`
2. `handcrafted_whimsy_stop_motion`
3. `neo_wuxia_cinematic`

选择理由：

- 都需要更细的美学控制
- 建包时更依赖共享资产拆分是否成熟

验收重点：

1. `poetic_2d_fantasy` 不能只有好看氛围
2. `handcrafted_whimsy_stop_motion` 不能只有材质没有角色
3. `neo_wuxia_cinematic` 不能只剩慢动作和空镜

---

## 5. Exploration Pool 的升级规则

### 5.1 可升级到 `Phase 2` 的触发条件

满足以下任意两项，可考虑从 `Exploration Pool` 升到 `Phase 2`：

1. 用户项目中连续两次出现该风格需求
2. 该风格与现有风格差异明显，且不属于简单 Variant
3. 该风格对应 `style_family` 当前覆盖薄弱
4. 已能明确代表作品、风险边界和核心节拍

### 5.2 当前最值得观察的 5 个方向

1. `dark_fable_3d`
2. `warm_humanist_cinematic`
3. `two_d_character_three_d_world`
4. `hk_underworld_cinematic`
5. `docu_comic_hybrid`

原因：

- 这 5 个方向和现有已落地风格重叠较少
- 一旦成熟，能明显扩展 SceneForge 的题材与媒介表达边界

### 5.3 当前建议继续冻结的方向

1. `retro_toybox_3d`
2. `social_fastcut_motion_comic`
3. `wild_comedy_2d`

原因：

- 容易与现有风格或现有平台表达方式重叠
- 当前阶段建包价值低于维护成本

---

## 6. 每个风格进入建包时必须产出的文件

任何一个风格从“文档定义”进入“正式建包”，都必须生成以下 7 个文件：

1. `profile.md`
2. `visual_language.md`
3. `performance_language.md`
4. `camera_language.md`
5. `rhythm_language.md`
6. `lighting_language.md`
7. `negative_constraints.md`

各文件关注点：

- `profile.md`：总述、适配题材、演绎力度、边界
- `visual_language.md`：造型、材质、颜色、意象
- `performance_language.md`：表演原则、情绪组织、角色反应方式
- `camera_language.md`：机位、景别、构图、运动倾向
- `rhythm_language.md`：节拍、段落推进、爆点组织
- `lighting_language.md`：主调光感、空间层次、氛围策略
- `negative_constraints.md`：常见误用、相邻风格混淆点、禁止项

---

## 7. 验收清单

### 7.1 文档层验收

1. 风格命名统一采用 `中文描述（English Term）`
2. 每个风格都有清楚的大类归属
3. 每个风格都有明确风险边界
4. 每个风格都能指出至少一个相邻风格区分点

### 7.2 建包前验收

1. 7 个核心文件是否都有可写提纲
2. 下游三个主链 skill 是否都能从该风格定义中读到差异
3. 是否会与某个现有风格形成高度重复

### 7.3 建包后验收

1. `scene-design-builder` 是否能产出明显不同的设计说明
2. `scene-storyboard-director` 是否能体现镜头和节奏差异
3. `scene-video-prompt-builder` 是否能体现视觉、镜头、光感差异
4. 是否出现退回 `pixar_like` 的隐性依赖

---

## 8. 当前建议结论

最稳妥的推进顺序不是“把全部未落地风格一次补完”，而是：

1. 先完成 `Phase 2` 的高完整度定义。
2. 再维护一个受控的 `Exploration Pool`。
3. 最后按 `Batch 1 -> Batch 2 -> Batch 3` 渐进进入真实建包。

这样既能保证风格库继续扩张，又不会让 SceneForge 过早进入“风格名字很多，但真实差异不足”的失真状态。
