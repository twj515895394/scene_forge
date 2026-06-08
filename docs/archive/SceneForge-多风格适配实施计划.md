# SceneForge 多风格适配实施计划

## 1. 目标

本计划用于把 SceneForge 从“默认 `pixar_like` 的单风格主链”升级为“基于风格包（Style Profile）切换的多风格主链”。

本轮目标不是一次性支持全部风格，而是：

1. 保持 `v8` 主链控制模型不变。
2. 先把现有默认 `pixar_like` 路线改造成显式可配置的风格包机制。
3. 只接入 `Phase 1` 的四个 3D 风格包：
   - `pixar_like`
   - `dreamworks_like`
   - `stylized_chinese_3d`
   - `comic_action_3d`
4. 先打通三条关键主链：
   - `scene-design-builder`
   - `scene-storyboard-director`
   - `scene-video-prompt-builder`

---

## 2. 实施边界

### 2.1 本轮要做

1. 增加风格字段与协议说明。
2. 新建 `style_profiles/` 目录与四个风格包骨架。
3. 盘点并替换现有 `pixar_like` / 动画电影默认口径的硬编码。
4. 让三个关键 Skill 在运行时读取 `director_style_id` 与 `style_profile_path`。
5. 用一个短项目做最小风格切换验证。

### 2.2 本轮不做

1. 不新增独立 `scene-style-selector` Skill；第一版风格确认闭环先收进现有 SOP。
2. 不一次性适配全部 Skill。
3. 不批量修改历史 `projects/*` 产物。
4. 不优先实现 2D、真人电影感、定格、动态漫画、混合形态的正式落地。
5. 不为每个风格复制一套 Skill。

---

## 3. 总体策略

采用“协议先行、风格包落地、风格确认闭环、三 Skill 试点、样例验证”的顺序推进：

```text
风格体系总表
-> 协议补丁
-> style_profiles/ 骨架
-> 风格确认闭环
-> 硬编码盘点
-> scene-design-builder
-> scene-storyboard-director
-> scene-video-prompt-builder
-> 样例项目 A/B 验证
```

原则：

- 只做最小必要改造。
- 优先保留既有主链结构。
- 风格切换只影响导演语言，不影响主状态机、pack 规则、continuity 规则和 copy-ready 规则。

---

## 4. 关键概念与字段

本轮统一采用以下结构：

```yaml
project_config:
  director_style_id:
  director_style_version:
  style_family:
  style_profile_path:
  performance_style:
```

语义边界：

- `director_style_id`：当前项目采用哪个具体风格包。
- `director_style_version`：风格包版本。
- `style_family`：风格大类，例如 `3d_animation`。
- `style_profile_path`：风格包索引路径。
- `performance_style`：本次演绎力度，不等于风格包。

第一版风格确认闭环：

- `scene-topic-gate`：给出导演风格建议（Director Style Suggestion），不做最终确认。
- `scene-script-adapter`：在确认剧本方案时，连同导演风格包（Director Style Package）一起正式确认并回写黑板。
- `scene-design-builder` / `scene-storyboard-director` / `scene-video-prompt-builder`：严格读取已确认风格；若字段缺失，只允许显式回退到 `pixar_like`，且必须记录 `used_default_fallback`。

所有面向用户的确认信息统一采用：

- 中文描述（English Term）

例如：

- 导演风格包（Director Style Package）
- 风格大类（Style Family）
- 演绎风格（Performance Style）

---

## 5. 涉及文件地图

### 5.1 协议与模板

- 修改：
  - `.agents/skills/scene-forge/references/project-board-template.md`
  - `.agents/skills/scene-forge/references/board-protocol.md`
  - `docs/SOP总览.md`
- 新增：
  - `docs/SceneForge-多风格协议补丁.md`

### 5.2 风格总表与风格包

- 已有：
  - `docs/SceneForge-风格体系总表.md`
- 新增：
  - `style_profiles/pixar_like/profile.md`
  - `style_profiles/pixar_like/visual_language.md`
  - `style_profiles/pixar_like/performance_language.md`
  - `style_profiles/pixar_like/camera_language.md`
  - `style_profiles/pixar_like/rhythm_language.md`
  - `style_profiles/pixar_like/lighting_language.md`
  - `style_profiles/pixar_like/negative_constraints.md`
  - `style_profiles/dreamworks_like/*`
  - `style_profiles/stylized_chinese_3d/*`
  - `style_profiles/comic_action_3d/*`

### 5.3 关键 Skill 协议

- 修改：
  - `.agents/skills/scene-topic-gate/references/output-contract.md`
  - `.agents/skills/scene-script-adapter/SKILL.md`
  - `.agents/skills/scene-script-adapter/references/output-contract.md`
  - `.agents/skills/scene-design-builder/SKILL.md`
  - `.agents/skills/scene-design-builder/references/output-contract.md`
  - `.agents/skills/scene-storyboard-director/SKILL.md`
  - `.agents/skills/scene-storyboard-director/references/output-contract.md`
  - `.agents/skills/scene-video-prompt-builder/SKILL.md`
  - `.agents/skills/scene-video-prompt-builder/references/output-contract.md`

### 5.4 验证项目

- 只读/验证，不批量改写历史产物：
  - `projects/_template/PROJECT_BOARD.md`
  - 另选一个短项目作为试跑对象

---

## 6. 分阶段计划

## Phase 0：硬编码盘点与改造清单

### 目标

把当前仓库中与 `pixar_like`、默认动画电影风格、默认正式电影风格相关的口径全部盘点出来，明确哪些需要抽象、哪些保留、哪些仅换成中性说法。

### 主要文件

- `docs/皮克斯电影风格路线实施计划.md`
- `docs/多风格AI导演系统设计.md`
- `.agents/skills/scene-design-builder/SKILL.md`
- `.agents/skills/scene-design-builder/references/output-contract.md`
- `.agents/skills/scene-storyboard-director/SKILL.md`
- `.agents/skills/scene-storyboard-director/references/output-contract.md`
- `.agents/skills/scene-video-prompt-builder/SKILL.md`
- `.agents/skills/scene-video-prompt-builder/references/output-contract.md`

### 输出物

- `docs/SceneForge-多风格协议补丁.md` 中的“硬编码盘点表”

### 验证命令

```bash
rg -n "pixar_like|3D Pixar style|高品质 3D 动画电影质感|正式电影风格|动画电影风格" \
  .agents/skills/scene-design-builder \
  .agents/skills/scene-storyboard-director \
  .agents/skills/scene-video-prompt-builder \
  docs assets
```

### 预期结果

- 能得到一张清单，按三类区分：
  - 改为读取 `style_profile`
  - 改为通用抽象描述
  - 保留为默认回退口径

---

## Phase 1：协议层补丁

### 目标

在不破坏 `v8` 轻黑板的前提下，把风格字段显式加入协议和模板。

### 主要文件

- 修改：
  - `.agents/skills/scene-forge/references/project-board-template.md`
  - `.agents/skills/scene-forge/references/board-protocol.md`
  - `docs/SOP总览.md`
- 新增：
  - `docs/SceneForge-多风格协议补丁.md`

### 具体改动

在 `project_config` 增加：

```yaml
director_style_id:
director_style_version:
style_family:
style_profile_path:
performance_style:
```

同时补充说明：

- `performance_style` 继续保留
- `performance_style` 不等于 `director_style_id`
- 第一阶段默认 `style_family = 3d_animation`
- 未明确指定时，运行时允许回退到 `pixar_like`

### 验证命令

```bash
rg -n "director_style_id|director_style_version|style_family|style_profile_path|performance_style" \
  .agents/skills/scene-forge/references/project-board-template.md \
  .agents/skills/scene-forge/references/board-protocol.md \
  docs/SOP总览.md
```

### 预期结果

- 三份文件都能看到新字段
- 协议定义与 `docs/SceneForge-风格体系总表.md` 术语一致
- 旧的 `performance_style` 语义没有被覆盖或改坏

---

## Phase 2：建立 `style_profiles/` 最小可用骨架

### 目标

让风格体系从“文档概念”变成“可被 Skill 读取的结构化资产”。

### 新增目录

```text
style_profiles/
  pixar_like/
  dreamworks_like/
  stylized_chinese_3d/
  comic_action_3d/
```

### 每个风格包至少包含

- `profile.md`
- `visual_language.md`
- `performance_language.md`
- `camera_language.md`
- `rhythm_language.md`
- `lighting_language.md`
- `negative_constraints.md`

### `profile.md` 最小字段建议

```yaml
style_profile:
  director_style_id:
  director_style_version:
  style_family:
  summary:
  suitable_topics: []
  recommended_performance_styles: []
  required_profile_files: []
```

### 验证命令

```bash
rg --files style_profiles
```

```bash
rg -n "director_style_id|style_family|recommended_performance_styles" style_profiles
```

### 预期结果

- 四个风格包目录齐全
- 每个风格包不是空壳
- 每个风格包都能清楚回答“和其他三个风格有什么本质差异”

---

## Phase 2.5：`pixar_like` 资产与枚举归属盘点

### 目标

把当前仓库里已经存在的、带有 `pixar_like` 电影风格特征的资产、枚举、提示词片段和方法论口径做一次归属盘点，避免后续多风格适配时继续把 `pixar_like` 当成隐式全局默认值。

### 核心判断

本阶段不要求立即重写全部资产，只要求先回答“它应该归谁管”。

### 归属分层

后续资产统一分三层维护：

1. 全局共享资产（Global Shared Assets）
   - 所有风格都能复用
   - 不包含明显的单一风格审美偏向
   - 例如：
     - 主链协议
     - `Beat / Shot / Segment` 结构
     - `continuity control`
     - `pack` 规则
     - 通用故事板方法论

2. 家族共享资产（Family Shared Assets）
   - 只在某一 `style_family` 内复用
   - 例如未来可能存在：
     - `3d_animation` 共享材质/镜头/表演边界
     - `2d_animation` 共享镜头夸张规则

3. 风格专属资产（Style-Specific Assets）
   - 只服务某个 `director_style_id`
   - 必须归入对应 `style_profiles/<director_style_id>/`
   - 例如：
     - `pixar_like` 的角色魅力导向
     - `dreamworks_like` 的外放喜剧反应规则
     - `stylized_chinese_3d` 的东方意象与造型语言

### 盘点范围

重点检查：

- `docs/皮克斯电影风格路线实施计划.md`
- `docs/SceneForge-Pixar-Production-System-Enhancement-Plan.md`
- `docs/风险与版权边界.md`
- `docs/SceneForge-v4-Animation-Stylization-System.md`
- `assets/animation-stylization/`
- `assets/cinematic-language/`
- `assets/storyboard-methodology/`
- `scene-design-builder` / `scene-storyboard-director` / `scene-video-prompt-builder` 中已写死的 Pixar-like 口径

### 盘点输出表

建议在 `docs/SceneForge-多风格协议补丁.md` 中增加表格：

| 资产/枚举/规则 | 当前路径 | 当前倾向 | 归属层级 | 目标去向 | 处理动作 |
|---|---|---|---|---|---|
| 示例项 | `assets/...` | `pixar_like` | 风格专属资产 | `style_profiles/pixar_like/...` | 迁移 |

### 处理动作枚举

- `保留`：继续放在原路径
- `迁移`：移动到对应风格包
- `拆分`：拆成共享层 + 风格层
- `改名`：从带品牌倾向的名字改成中性名字
- `废弃`：不再作为运行时默认输入

### 判定规则

#### 应归入全局共享资产

满足以下特征：

- 不依赖单一风格包
- 换成 `dreamworks_like` / `comic_action_3d` 后仍成立
- 本质是结构规则、生产规则、连续性规则、切分规则

#### 应归入家族共享资产

满足以下特征：

- 明显只适合某个 `style_family`
- 例如只适合 3D 动画，不适合 2D 或真人电影感
- 但不只服务单一 `director_style_id`

#### 应归入风格专属资产

满足以下特征：

- 明显体现某个具体风格包的审美、表演、镜头、节奏或灯光偏向
- 切换风格后应同步替换
- 若继续留在全局，会把该风格错误地当成系统默认风格

### 验证命令

```bash
rg -n "pixar_like|皮克斯|高品质 3D 动画电影质感|圆润|温暖灯光|角色驱动" \
  docs assets .agents/skills
```

### 预期结果

- 能列出当前 `pixar_like` 相关资产清单
- 每一项都能被判定到“全局 / 家族 / 风格专属”三层之一
- 后续 `Phase 3-5` 改 Skill 时，有明确读取边界，不再继续把 Pixar-like 资产误当成全局默认资产

---

## Phase 2.6：风格确认闭环

### 目标

在不新增独立 `scene-style-selector` Skill 的前提下，为现有 SOP 补上一条最小可运行的风格确认闭环。

### 主要文件

- `.agents/skills/scene-topic-gate/references/output-contract.md`
- `.agents/skills/scene-script-adapter/SKILL.md`
- `.agents/skills/scene-script-adapter/references/output-contract.md`
- `.agents/skills/scene-forge/SKILL.md`

### 闭环设计

```text
scene-topic-gate
-> 给出导演风格建议（Director Style Suggestion）
-> scene-script-adapter
-> 正式确认导演风格包（Director Style Package）
-> 写回 PROJECT_BOARD.project_config
-> 下游三阶段按已确认风格执行
```

### 改造要点

1. `scene-topic-gate` 增加：
   - `director_style_suggestion`
   - `style_selection_note`
   这些字段只作为建议，不直接写死项目最终风格。
2. `scene-script-adapter` 在剧本方案预览中必须加入：
   - 导演风格包候选（Director Style Package Candidates）
   - 风格大类（Style Family）
   - 当前确认状态（Confirmation Status）
3. `scene-script-adapter` 正式落盘时必须回写：
   - `director_style_id`
   - `director_style_version`
   - `style_family`
   - `style_profile_path`
   - `used_default_fallback`
4. 所有用户可见确认文案统一使用“中文描述（English Term）”格式，避免只出现英文协议名。

### 验证命令

```bash
rg -n "director_style_suggestion|style_selection_note|director_style_id|used_default_fallback" \
  .agents/skills/scene-topic-gate/references/output-contract.md \
  .agents/skills/scene-script-adapter/SKILL.md \
  .agents/skills/scene-script-adapter/references/output-contract.md \
  .agents/skills/scene-forge/SKILL.md
```

### 预期结果

- 选题阶段能给出风格建议，但不冒充最终确认
- 剧本阶段能正式锁定风格包并写回黑板
- 下游三阶段不再只能依赖“字段为空时默认回退”
- 用户看到的确认信息默认中英双写，便于理解

---

## Phase 3：改造 `scene-design-builder`

### 目标

让设计阶段先吃到风格包，使角色、场景、道具的视觉基线从“默认皮克斯感”变为“按风格包切换”。

### 主要文件

- `.agents/skills/scene-design-builder/SKILL.md`
- `.agents/skills/scene-design-builder/references/output-contract.md`

### 改造要点

1. 输入声明增加：
   - `project_config.director_style_id`
   - `project_config.style_family`
   - `project_config.style_profile_path`
2. 运行时说明增加：
   - 读取 `visual_language.md`
   - 读取 `lighting_language.md`
   - 需要时读取 `performance_language.md`
3. 输出说明增加：
   - 设计摘要中写明当前风格包
   - 下游设计基线说明引用当前风格包
4. 回退规则：
   - 若风格字段缺失，默认按 `pixar_like` 执行，但要显式说明是回退

### 验证命令

```bash
rg -n "director_style_id|style_profile_path|visual_language|lighting_language|pixar_like" \
  .agents/skills/scene-design-builder/SKILL.md \
  .agents/skills/scene-design-builder/references/output-contract.md
```

### 预期结果

- `scene-design-builder` 能解释“为什么这个角色/场景长成这样”
- 同一桥段切到 `dreamworks_like` 或 `stylized_chinese_3d` 时，设计方向应明显变化
- 文件结构和阶段补丁结构保持不变

---

## Phase 4：改造 `scene-storyboard-director`

### 目标

让分镜导演阶段的镜头语言、节奏语言、灯光与气氛语言，从统一默认动画电影感改为风格包驱动。

### 主要文件

- `.agents/skills/scene-storyboard-director/SKILL.md`
- `.agents/skills/scene-storyboard-director/references/output-contract.md`

### 改造要点

1. 输入声明增加风格字段。
2. 读取语言增加：
   - `camera_language.md`
   - `rhythm_language.md`
   - `lighting_language.md`
   - `performance_language.md`
3. 明确“不改主控制模型”：
   - `Beat / Shot / Segment`
   - `continuity control`
   - `pack` 拆分规则
   - 双版故事板机制
4. 只改导演语言，不改状态机与结构化输出壳。

### 验证命令

```bash
rg -n "director_style_id|camera_language|rhythm_language|lighting_language|performance_language|performance_style" \
  .agents/skills/scene-storyboard-director/SKILL.md \
  .agents/skills/scene-storyboard-director/references/output-contract.md
```

### 预期结果

- `pixar_like` 更重角色关系和呼吸位
- `comic_action_3d` 更重冲击、速度和动作姿态
- `dreamworks_like` 更重外放反应和喜剧对撞
- 但 continuity、shot 结构和 pack 规则不变

---

## Phase 5：改造 `scene-video-prompt-builder`

### 目标

让最终视频提示词阶段，从“默认 Pixar-like 或高品质 3D 动画电影感”的隐式写法，升级为按风格包生成风格总控语句。

### 主要文件

- `.agents/skills/scene-video-prompt-builder/SKILL.md`
- `.agents/skills/scene-video-prompt-builder/references/output-contract.md`

### 改造要点

1. 输入声明增加风格字段与 `style_profile` 读取说明。
2. 总控提示词来源改为：
   - `profile.md`
   - `visual_language.md`
   - `camera_language.md`
   - `lighting_language.md`
   - `negative_constraints.md`
3. 继续保留：
   - `performance_style` 的运行时语义
   - copy-ready 规则
   - 不直接绑定具体品牌名称的合规要求

### 验证命令

```bash
rg -n "director_style_id|style_profile_path|negative_constraints|performance_style|copy-ready|品牌名称" \
  .agents/skills/scene-video-prompt-builder/SKILL.md \
  .agents/skills/scene-video-prompt-builder/references/output-contract.md
```

### 预期结果

- 同一分镜输入切不同风格包，最终视频提示词风格显著变化
- copy-ready 结构和故事板转译规则保持不变
- 对外措辞继续合规

---

## Phase 6：最小样例验证

### 目标

验证多风格机制真的可切换，而不是只改了文档。

### 验证方式

选择一个短、角色少、动作清楚的项目进行最小试跑。

推荐顺序：

1. 跑 `pixar_like`
2. 切 `dreamworks_like`
3. 切 `comic_action_3d` 或 `stylized_chinese_3d`

### 观察三类差异

1. 设计差异：
   - 角色比例
   - 场景材质
   - 光感
   - 造型态度
2. 分镜差异：
   - 景别选择
   - 节奏切分
   - 反应镜头密度
   - Hero Moment 组织方式
3. 视频提示词差异：
   - 风格总控
   - 动作组织
   - 灯光与材质描述
   - 负面约束

### 验证命令

无统一自动化命令，本阶段采用对比式人工验收，至少输出：

- 一份风格切换对比记录
- 一份问题清单

建议补充命令用于核查字段是否落到项目板：

```bash
rg -n "director_style_id|style_family|style_profile_path|performance_style" projects/<sample-project>/PROJECT_BOARD.md
```

### 预期结果

- 风格切换后，下游产物差异真实可见
- 但黑板协议、状态推进、阶段壳结构没有被破坏

---

## 7. 推荐执行顺序

建议按以下顺序实际开工：

1. `Phase 0` 硬编码盘点
2. `Phase 1` 协议补丁
3. `Phase 2` 建立四个 `style_profiles/`
4. `Phase 2.5` 做 `pixar_like` 资产与枚举归属盘点
5. `Phase 3` 改 `scene-design-builder`
6. `Phase 4` 改 `scene-storyboard-director`
7. `Phase 5` 改 `scene-video-prompt-builder`
8. `Phase 6` 样例验证

不建议调换顺序，因为：

- 不先补协议，后面字段会乱
- 不先建 `style_profiles/`，三个 Skill 没有稳定读取源
- 不先做资产归属盘点，后面很容易继续把 `pixar_like` 专属资产当全局默认值
- 不先改设计阶段，下游风格会失去视觉基线来源

---

## 8. 风险点

### 8.1 语义重叠风险

`performance_style` 和 `director_style_id` 混用，导致系统无法判断“这次是换了演法，还是换了导演风格”。

控制方式：

- 所有协议文档必须反复强调两者边界。

### 8.2 风格包空壳风险

如果 `style_profiles/` 只有目录名，没有清晰语言差异，下游 Skill 只能继续写空话。

控制方式：

- 每个风格包必须至少写明视觉、表演、镜头、节奏、灯光、禁忌。

### 8.3 过早跨媒介风险

如果第一轮就同时推进 2D、真人电影感、定格，会把问题从“风格切换”变成“整个系统重写”。

控制方式：

- 第一轮只做 3D 动画家族。

### 8.4 只改措辞不改运行时风险

如果只是把文档从“Pixar-like”换成“风格包”，但 Skill 读取逻辑没变，最终仍然是假多风格。

控制方式：

- 三个关键 Skill 都必须显式声明读取 `style_profile`。

---

## 9. 验收标准

本轮完成的最低验收标准：

1. `PROJECT_BOARD` 协议中出现风格字段。
2. `style_profiles/` 下有四个可读的 3D 风格包。
3. 三个关键 Skill 都显式读取风格包。
4. 同一桥段在至少两个风格包下，设计、分镜、视频提示词存在清晰差异。
5. 黑板协议、状态机、pack 和 copy-ready 规则没有回退。

---

## 10. 结论

多风格适配不应该从“再发明一整条新主链”开始，而应该从“把当前默认 `pixar_like` 主链抽象成显式风格包主链”开始。

因此，最稳妥的推进路径是：

```text
先把默认皮克斯路线改造成可配置风格包
再接入另外三个 3D 风格包
再验证三条主链是否真的能切换风格
最后才考虑风格选择器和跨媒介扩展
```
