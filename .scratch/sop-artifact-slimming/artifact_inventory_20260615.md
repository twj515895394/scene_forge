# SceneForge SOP 阶段产物梳理与瘦身方案

> 生成时间：2026-06-15
> 方向：产物瘦身 / 阶段交付简化专项（inventory 第一阶段，不直接删规则）
> 对应交接：`.handoff/handoff-20260615-150441.md`

## 文档目的

本文档对 SceneForge SOP 全管线每个阶段的交付产物做一次完整 inventory，回答四个问题：

1. 每个阶段要产出哪些文件
2. 每个产物是干嘛用的
3. 每个产物属于哪一类（下游必须读取 / validator 必须存在 / 可合并降级）
4. 每个产物的瘦身方案（必留 / 合并 / 按需生成 / 删除降级）

本文档只做梳理与建议，**不直接修改任何 skill / validator / 产物**。后续按本文档生成 issues 再逐步落地。

## 分类口径

| 类别 | 含义 | 判定依据 |
|---|---|---|
| **A. 下游必须读取** | 下游阶段把该文件作为正式输入边界，缺它会重建或漂移 | skill 文档明确写"下游消费 / handoff / 继承" |
| **B. validator 必须存在** | validator 检查该文件物理存在、marker、heading 或 board 索引，缺失会 review_failed | validator.ts 中的 required_artifacts / required_markers |
| **C. 可合并 / 降级** | 只用于中间推理、解释、自检，下游不直接读，validator 也不强制独立存在 | skill 标注"推荐/可选"或 validator 无要求 |

> 一个产物可能同时是 A 和 B（下游要读 + validator 要查）。瘦身方案对这类产物默认 **必留**。

## 瘦身方案口径

| 方案 | 含义 |
|---|---|
| **必留** | 保留现状，不动 |
| **合并** | 把多个文件合并成一个，或把子文件内容并回主文件 |
| **按需生成** | 默认不产，只在复杂项目 / 用户明确要求时才产 |
| **删除/降级** | 不再独立落盘，改为 review 摘要或黑板字段 |

## 全局政策：默认只产中文版产物

> 用户已确认（2026-06-15）：**所有阶段默认只产出中文版产物**，英文版一律降级为按需生成。本政策适用于全部 11 个主线阶段及 video_intake。

### 政策含义

- 所有 skill 的 required-deliverables / output-contract 默认只强制中文产物
- 英文产物（如 `视频提示词_第N包_英文_v*.md`、英文 segment 拆分、英文整片汇编）一律降级为 C 可选，仅用户明确要求时才产
- validator 中所有"强制双产"规则（如 SF-VP-202 强制英文 pack）需改造为"强制中文，英文可选"

### 主要冲击阶段

| 阶段 | 影响 | 配套改造 |
|---|---|---|
| video_prompts | 默认中英双产 → 默认仅中文 | validator SF-VP-202 降级为可选；required-deliverables 删"不得只生成中文"条款 |
| 其他阶段 | 多数已是中文主导，影响小 | 排查各 skill 是否有隐性英文强制 |

### 用户触发英文的条件

英文版只在以下情况产出（任一即可）：
1. 用户在阶段确认门明确要求英文版
2. 目标发布平台明确需要英文（如海外平台）
3. 用户主动在对话中要求

本政策会体现在后续每个 issue 的改造清单中。

## 阶段总览

主线 11 阶段顺序（来自 `state_machine.ts`）：

```
topic_gate → reference → story → assets → design → script
→ performance → storyboard → audio → video_prompts → publish_review
```

另有 `video_intake`（输入入口，不在主线 11 阶段，但在用户提供视频源时作为 source_intake 产生物）。

### 产物数量与 validator 强度速查

| 阶段 | 必交文件数 | validator 文件 pattern | 深度契约 | 确认门 | 强制 manifest |
|---|---:|---|---|---|---|
| topic_gate | 1 | `outputs/topic.md` | ❌ | ❌ | ❌ |
| reference | 1 | （无） | ❌ | ❌ | ❌ |
| story | 1 | （无） | ❌ | ❌ | ❌ |
| assets | 2 | （无） | ❌ | ❌ | ❌ |
| design | 7~8 → **3 必留 + 1 可选** ⭐ | `outputs/design.md` | delivery（拟改造） | ✅ design_confirmed | ✅ |
| script | 3 | `outputs/script.md` | ❌ | ❌ | ❌ |
| performance | 3 | `outputs/performance_pack_*.md` | ❌ | ❌ | ❌ |
| storyboard | 8（+3 推荐） | `outputs/storyboard_pack_*.md` | ✅ SF-SB-101~108 | ✅ storyboard_plan_confirmed | ✅ |
| audio | 4 | `outputs/audio_pack_*.md` | ❌ | ❌ | ❌ |
| video_prompts | 2~4 → **1~2（中文 pack + review）** | `outputs/video_prompts_pack_*.md` 或 `outputs/video_prompts/视频提示词_第N包_*.md` | ✅ SF-VP-101~106 | ✅ video_prompt_plan_confirmed | ✅ |
| publish_review | 1~3 | `outputs/publish_review.md` | ❌ | ❌ | ❌ |

**关键发现**：`reference` / `story` / `assets` 三个阶段在 validator 中基本是"空规则"——只跑通用 Level 1（manifest 需有 final artifact + 文件存在）和 forbidden_terms，没有文件名 pattern、heading、frontmatter schema 校验。这是瘦身的最大机会区。

---

## 阶段逐项梳理

### 0. video_intake（输入入口，非主线阶段）

**skill**：`scene-video-intake`
**触发**：用户提供视频文件 / 链接 / 截图序列
**落盘目录**：`inputs/source_intake/`

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `source_video_analysis_v1.md` | 完整源视频解析（内容摘要、镜头语言、角色、场景、动作连续性、台词、音频、视觉风格、核心亮点） | C 可降级 | **按需生成**：默认只产 handoff+priority_map+ideas，全量解析仅在分镜/剧本需要核对动作链时才补 |
| `source_video_timeline_v1.md` | 逐镜头时间轴（时间范围、视觉描述、动作、台词、音频、镜头/剪辑） | C 可降级 | **按需生成**：同上 |
| `source_video_priority_map_v1.md` | 内容优先级分层（core_must_keep / highlight / useful / pass / safe_to_replace / avoid_copying） | A 下游必须读取 | **必留** |
| `adaptation_ideas_v1.md` | 5-10 个改写方向候选（轻量，非剧本） | A 下游必须读取 | **必留** |
| `topic_gate_handoff_v1.md` | 给 topic_gate 的交接（candidate_topic、source_material、risks、scoring_hints、assetization_recommendation） | A 下游必须读取 | **必留** |
| `source_intake_index_v1.md` | source_intake 文件索引与读取预算策略（compact/standard/deep） | A 下游必须读取 | **必留** |
| `source_video_dialogue_v1.md` | 完整台词表（按复杂度可选） | C 可降级 | **按需生成** |
| `source_video_audio_v1.md` | 音频观察（音乐/拟音/静默/节奏） | C 可降级 | **按需生成** |
| `source_video_camera_v1.md` | 镜头语言分析（景别/角度/运动/构图） | C 可降级 | **按需生成** |

**资产化后额外文件**（`assets/source-materials/<slug>/`，需用户显式确认）：
`source-card.md` / `structure-analysis.md` / `adaptation-angles.md` / `safety-boundaries.md` / `reuse-history.md` — 这 5 个是资产沉淀，不在本项目瘦身范围。

**阶段小结**：3 个必留（handoff/priority_map/ideas + index）+ 1 个全量解析核心 + 3 个可选专项。当前默认会产 6 个必生文件 + 3 个可选，**建议把全量 analysis/timeline 改为按需**，默认只产 4 个（index/handoff/priority_map/ideas）。

---

### 1. topic_gate（选题裁定）

**skill**：`scene-topic-gate`
**validator 依赖**：`outputs/topic.md`（pattern + `## topic_ideas` heading + frontmatter schema + forbidden_terms）

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `outputs/topic.md` | 选题七维评分、风格家族候选、导演风格候选、决策结论、production_level、reuse_hints、source_intake 继承结论 | B validator 必须存在 + A 下游必须读取 | **必留** |

#### 瘦身判断

只有 1 个文件，且是 validator 强依赖，**无需瘦身**。注意：风格家族 + 导演风格未确认前不得推进，`next_stage` 会回退到自身——这是流程闸门，不是产物问题。

---

### 2. reference（参考裁定）

**skill**：`scene-reference-decider`
**validator 依赖**：⚠️ **无文件 pattern / 无 heading / 无 frontmatter schema**，只跑通用 manifest final artifact 检查

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/reference/reference_boundary_v1.md` | 参考类型裁定（original_work/specific_adaptation/hybrid）、参考边界（主参考/辅助/允许继承/禁止继承）、must_keep/must_avoid、creative_direction_context 下游继承规则 | A 下游必须读取（全链路继承） | **必留** |

#### 瘦身判断

只有 1 个文件，且是全链路继承权威（`creative_direction_context.downstream_rule` 被 story/assets/design/script/performance/storyboard/video-prompt 继承）。**产物本身无需瘦身**。

**但发现一个 validator 缺口**：reference 阶段 validator 没有任何结构校验，如果 reference_boundary 文件缺关键字段，validator 不会拦。这是后续可考虑补强点（不属于瘦身，属于加固）。

---

### 3. story（故事开发）

**skill**：`scene-story-development`
**validator 依赖**：⚠️ **无文件 pattern / 无 heading / 无 frontmatter schema**

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/story/story_development_v1.md` | 轻量故事骨架：logline、4-8 个 Story Beat、character/scene/prop 剧情功能、emotional_arc、hero_moment_candidates、ending_payoff | A 下游必须读取 | **必留** |

#### 瘦身判断

只有 1 个文件，是最轻量阶段。**无需瘦身**。同样存在 validator 无结构校验的缺口（4-8 beat 限制不被 validator 拦）。

---

### 4. assets（资产复用判断）

**skill**：`scene-asset-checker`
**validator 依赖**：⚠️ **无文件 pattern / 无 heading / 无 frontmatter schema**

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/assets/asset_check_v1.md` | 角色/场景/核心道具的资产复用判断（reuse_direct/reuse_tweak/new_light/new_full）与 design_actions 清单 | A 下游必须读取 | **必留** |
| `details/assets/asset_lock_v1.md` | 资产锁定文件：明确哪些角色/场景/道具已锁定、downstream_constraints 硬约束（供 design/script/storyboard 继承） | A 下游必须读取 | **必留**（但见下方合并建议） |

#### 瘦身判断

2 个文件都是下游硬约束载体。**瘦身边界**：asset_check 和 asset_lock 内容高度相关（lock 是 check 结论的锁定态）。**可选合并方案**：把 asset_lock 的 locked_*/downstream_constraints 字段直接并入 asset_check 文件的尾部 section，减少为 1 个文件。需先确认 validator 是否会校验 asset_lock 文件名——目前 validator 对 assets 阶段无任何文件校验，所以**合并不违反 validator**。

> 合并属于 issue 级建议，需要确认下游 design skill 是否硬依赖 `asset_lock` 文件名路径。建议合并前先用一个真实项目验证。

---

### 5. design（设计设定）⭐⭐ 重点瘦身区（工作流重构）

**skill**：`scene-design-builder`
**validator 依赖**：`outputs/design.md` + 7 个 content markers + 6 个必需 detail/output 文件 + 确认门 `design_confirmed` + board stage_index 一致性

这是**强制注册 manifest 的两个阶段之一**，validator 约束最密。

#### 现状问题

调研中发现两个反模式：

1. **草稿比最终产物还详细**：`details/design/character_design_*.md`（草稿）写得比 `outputs/design_prompts/角色说明书图片提示词_*.md`（最终 prompt）还详细。草稿本应是轻量思考大纲，最终产物才应是最完整最详细的——现在反过来了。
2. **同一设计被写两遍**：character_design 草稿写一遍角色设定 → 角色说明书 prompt 再把同样设定重新组织写一遍；scene_design → 全场景参考图 prompt 同理。这是实质性的重复工作。

**根因**：旧认知"prompt 要短、要精简、要针对特定平台"。但当前图像生成模型（gpt-image 等）对长文本 prompt 完全可接受，"给人看的设计说明"和"给模型投喂的 prompt"可以是**同一份文档**。

#### 新工作流：先设计（对话内）→ 后一次性落最终产物

保留"先设计、后落文档"两步心智流程，但把第一步从"独立落盘草稿"降级为"对话内设计预览"，只在第二步一次性落最终产物。

**第一步：设计思考 + 对话内预览（不独立落盘）**
- 在对话里完成完整设计推演：视觉语言、每个角色、每个场景、道具状态机、空间站位、blocking
- 以"设计预览"形式展示给用户确认
- 这一步不产生 details/ 完整草稿文件——草稿只在对话里，确认后即弃
- 质量保证来自这一步的"想清楚 + 用户确认"，不来自落盘文件

**第二步：一次性高质量落地（精简文件数）**
用户确认设计后，直接落最终产物。因为长文本 prompt 可接受，所以最终产物本身就是最完整的"设计存档 + 可投喂 prompt"一体化文档。

#### 产物清单（重构后：7~8 → 3 必留 + 1 可选）

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `outputs/design.md` | 设计总览：visual_language / character_designs / scene_designs / prop_designs / **space_continuity_seed（承接原 seed 草稿内容）** / **prop_state_machines（承接原 prop_design 状态机部分）** / **blocking_map（承接原 seed 站位基线）** | B validator 必须存在 + A 下游必须读取 | **必留**（吸收原 details 草稿的状态机/空间/站位内容） |
| `outputs/design_prompts/角色说明书图片提示词_v*.md` | **完整角色设定 + 可投喂 prompt 一体化**：融合原 character_design 草稿的全部设定细节，使其成为最完整最详细的角色存档（10 个必需 marker 不变） | A+B（SF-DG-205）+ 承接 SF-DG-201 内容 | **必留**（升级为一体化文档） |
| `outputs/design_prompts/全场景资产总参考图提示词_v*.md` | **完整场景 + 空间关系 + 道具视觉 + 可投喂 prompt 一体化**：融合原 scene_design 视觉细节 + prop_design 视觉部分 | A+B（SF-DG-206）+ 承接 SF-DG-202/203 视觉内容 | **必留**（升级为一体化文档） |
| `outputs/design_prompts/空间站位图提示词_v*.md` | 空间站位图 prompt | C 可选 | **按需生成**：多角色/复杂空间/高漂移风险时才产 |
| `details/design/design_notes_v*.md` | **轻量设计工作笔记**：只记录关键设计决策与追溯点（如"为何选这个轮廓""这个状态机为什么这么设计"），不是完整草稿，用于复盘追溯 | C 可选（默认建议写） | **新增**：替代原完整草稿，作为设计过程的轻量痕迹 |

**去掉的独立草稿文件**（内容不丢，并入上述 3 个必留文件）：
- ~~`details/design/character_design_*_v*.md`~~ → 内容融入角色说明书 prompt（SF-DG-205）
- ~~`details/design/scene_design_v*.md`~~ → 视觉内容融入全场景参考图 prompt（SF-DG-206）
- ~~`details/design/prop_design_v*.md`~~ → 视觉部分融入全场景参考图 prompt，状态机部分融入 design.md 的 prop_state_machines section
- ~~`details/design/space_continuity_seed_v*.md`~~ → 融入 design.md 的 space_continuity_seed + blocking_map section

净减少 **4 个 details 完整草稿文件**，且消除内容重复。

#### 内容融合映射（落地时严格对照）

| 原草稿内容 | 去向 | 接收 section |
|---|---|---|
| character_design：角色身份、轮廓、配色、材质、表情系统、动作姿态、关键道具交互、边界约束 | 角色说明书图片提示词 | 全部融入（这才是最详细的角色存档） |
| scene_design：场景空间结构、灯光、材质、关键道具锚点、连续性风险 | 全场景资产总参考图提示词 | 融入场景部分 |
| prop_design 视觉部分：道具外观、材质、状态外观 | 全场景资产总参考图提示词 | 融入道具部分 |
| prop_design 状态机部分：道具状态转换规则、触发条件 | design.md | `prop_state_machines` section |
| space_continuity_seed：空间轴、站位基线、blocking | design.md | `space_continuity_seed` + `blocking_map` section |

#### validator 改造（同步进行）

这 4 个 details 文件现在被 SF-DG-201/202/203/204 强制校验，瘦身要同步改 validator：

| 规则 | 现状 | 改造 |
|---|---|---|
| SF-DG-201 character_design 文件 | 强制 details/design/character_design 存在 | **删除**（SF-DG-205 角色说明书 prompt 已覆盖，且更全） |
| SF-DG-202 scene_design 文件 | 强制 details/design/scene_design 存在 | **删除**（SF-DG-206 全场景参考图已覆盖） |
| SF-DG-203 prop_design 文件 | 强制 details/design/prop_design 存在 | **改造**：改为检查 design.md 内 `prop_state_machines` marker（SF-DG-101 已要求该 marker，可合并） |
| SF-DG-204 space_continuity_seed 文件 | 强制 details/design/space_continuity_seed 存在 | **改造**：改为检查 design.md 内 `space_continuity_seed` marker（同上） |

改造后 validator 不但没变弱，反而从"检查独立文件存在"升级为"检查 design.md 内核心 section 存在"，校验更聚焦。需同步更新 SF-DG-211/212（board stage_index.design.files 的 details/outputs 必需条目）。

#### 黑板 stage_index 改造

```yaml
stage_index:
  design:
    files:
      primary: outputs/design.md
      outputs:
        - outputs/design.md
        - outputs/design_prompts/角色说明书图片提示词_v*.md
        - outputs/design_prompts/全场景资产总参考图提示词_v*.md
      details:
        - details/design/design_notes_v*.md   # 可选，默认建议写
```

不再要求 details 列出 4 个原草稿文件。

#### 瘦身判断

design 是本轮**重点重构区**。核心思路：消解"草稿 vs 最终产物"的内容重复，把"先设计"留在对话内，"后落文档"一次性落最完整的 outputs 文件。details 只保留一个轻量 design_notes 用于追溯。需配套改造 validator SF-DG-201~204 + board 索引。

---

### 6. script（剧本改编）

**skill**：`scene-script-adapter`
**validator 依赖**：`outputs/script.md`（pattern + `## story_beats` heading + frontmatter schema）

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/script_v*.md` | 完整剧本正文（下游所有阶段读取的正式剧本） | A 下游必须读取 | **必留** |
| `details/script/beat_table_v*.md` | 标准化 Beat 表（dramatic_role / emotional_turn / continuity_risk） | A 下游表演/分镜必读 | **必留** |
| `details/script/video_generation_unit_plan_v*.md` | VGU 初步规划（linked_beat_ids / action/emotion continuity / bridge_required） | A 下游分镜必读 | **合并**：考虑把 VGU 初步规划并入 beat_table 尾部 section |

#### 瘦身判断

3 个文件。beat_table 和 VGU plan 都是下游分镜的输入，但 VGU plan 在 storyboard 阶段会被重新细化。**可选合并**：把 VGU plan 的 linked_beat_ids / bridge_required 字段并入 beat_table，减少为 2 个文件。validator 只校验 `outputs/script.md`，不校验 details 文件名，**合并不违反 validator**。

---

### 7. performance（表演设计）

**skill**：`scene-performance-director`
**validator 依赖**：`outputs/performance_pack_*.md`（pattern + `## performance_beats` heading + pack_id 连续性）

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/performance_sheet_v*.md` | 完整表演表：角色表演档案 + Beat 级表演设计 + 物理喜剧/反差/轻伤表演 + 连续性规则 | A 下游必须读取 | **必留** |
| `details/performance/action_continuity_chains_v*.md` | 跨 Beat/Segment 动作连续性链 | A 分镜/视频提示词必读 | **合并**：并入 performance_sheet 尾部 |
| `details/performance/emotion_continuity_chains_v*.md` | 跨 Beat/Segment 情绪连续性链 | A 分镜/视频提示词必读 | **合并**：并入 performance_sheet 尾部 |

#### 瘦身判断

3 个文件。两个 continuity chain 都是表演表的派生（动作链、情绪链），下游分镜会把它们转成镜头连续性。**强烈建议合并**：把 action_continuity + emotion_continuity 作为 performance_sheet 的两个 section，减少为 1 个文件。validator 只校验 `outputs/performance_pack_*.md`，**合并不违反 validator**。

---

### 8. storyboard（分镜）⭐⭐ 最大瘦身区

**skill**：`scene-storyboard-director`
**validator 依赖**：`outputs/storyboard_pack_*.md` + 8 个深度契约 marker（SF-SB-101~108）+ 7 个必需文件（SF-SB-201~206,213）+ prompt 三段结构（SF-SB-207）+ design_reconciliation（SF-SB-214/215）+ 确认门 + board 一致性

这是**约束最重的阶段**，validator 几乎全程硬阻断。

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `outputs/storyboard_pack_*.md` | 分镜控制主包（13 个 marker：beat_skeleton/content_breakdown/cinematic_language/VGU/shot_continuity/continuity_control_system/prompt_pack_plan/quality_check 等） | B validator 必须存在 + A 下游必须读取 | **必留** |
| `details/storyboard/beat_skeleton_v*.md` | 每个 Story Beat 的镜头骨架（shot 数/时长/节奏） | A+B（SF-SB-201） | **必留** |
| `details/storyboard/video_generation_units_v*.md` | VGU 细化（id/covered shots/timecode/continuity_in/out） | A+B（SF-SB-202） | **必留** |
| `details/storyboard/shot_continuity_plan_v*.md` | 镜头连续性计划（screen positioning/camera movement） | A+B（SF-SB-203） | **必留** |
| `details/storyboard/storyboard_quality_check_v*.md` | storyboard 自检结果 | A+B（SF-SB-204，board 索引 quality_check） | **必留** |
| `details/storyboard/design_reconciliation_review_v*.md` | 设计回看：判断是否需回 design 修订（design_revision_required） | A+B（SF-SB-213/214/215） | **必留**（设计回看闸门） |
| `outputs/storyboard_prompts/control_storyboard_prompt_v*.md` | 可直接复制给图像平台的整板控制向故事板 prompt（三段结构） | A+B（SF-SB-205/207） | **必留**（外部平台消费） |
| `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md` | 可直接复制给图像平台的整板风格渲染向故事板 prompt（三段结构） | A+B（SF-SB-206/207） | **必留** |
| `details/storyboard/storyboard_content_breakdown_v*.md` | 剧本内容拆分细化 | C 可选（推荐） | **按需生成**：简单项目可不独立成文件，并入 beat_skeleton |
| `details/storyboard/cinematic_language_plan_v*.md` | 影视镜头语言规划 | C 可选（推荐） | **按需生成**：并入 storyboard_pack 的 cinematic_language_plan section |
| `details/storyboard/space_continuity_map_v*.md` | 空间连续性地图 | C 可选（推荐） | **按需生成** |

#### 瘦身判断

storyboard 是文件最多的阶段（8 强制 + 3 推荐 = 最多 11 个）。但其中 8 个是 validator 硬依赖（SF-SB-201~206,213,207），删任何一个都会 review_failed。

**真正可瘦身的只有 3 个推荐文件**：
- storyboard_content_breakdown → 已是推荐，建议默认并入 beat_skeleton
- cinematic_language_plan → 已是推荐，建议默认并入 storyboard_pack
- space_continuity_map → 已是推荐，建议默认按需

**强制文件的合并空间**：beat_skeleton + VGU + shot_continuity_plan 三个 detail 内容相关，理论上可合并为一个 `storyboard_breakdown_v*.md`，但需要同步改 validator SF-SB-201/202/203 的文件检查（改为检查合并文件内的三个 section）。**这是中等难度 issue，需要 validator 配合改造**。

---

### 9. audio（声音导演）

**skill**：`scene-audio-director`
**validator 依赖**：`outputs/audio_pack_*.md`（pattern + `## audio_execution_plan` heading + pack_id 连续性）

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `details/audio_plan_v*.md` | 完整声音导演方案（voice_direction/music_design/foley_design/expressive_audio_design/ambience/segment_audio_plan/video_prompt_handoff） | A 下游必须读取 | **必留** |
| `outputs/audio/music_prompt_v*.md` | 独立音乐提示词 | A 下游视频提示词必读 | **合并**：考虑并入 audio_plan 的 music_design section |
| `outputs/audio/foley_prompt_v*.md` | 独立拟音提示词 | A 下游视频提示词必读 | **合并**：考虑并入 audio_plan 的 foley_design section |
| `outputs/audio/audio_mix_plan_v*.md` | 混音计划（每 Segment 的 BGM/Foley-SFX/Ambience/Silence） | A 下游视频提示词必读 | **合并**：考虑并入 audio_plan 的 segment_audio_plan section |

#### 瘦身判断

4 个文件。3 个独立 prompt 文件（music/foley/mix）都是 audio_plan 的派生，下游 video_prompts 最终会把它们整合进每段视频 prompt 正文。**强烈建议合并**：把 3 个 prompt 文件作为 audio_plan 的 section，减少为 1 个文件。validator 只校验 `outputs/audio_pack_*.md`，**合并不违反 validator**。

> 注意：如果用户希望独立复制 music/foley prompt 给音频平台，可保留独立文件作为"可选导出"。建议默认合并，仅在用户明确要独立 prompt 时才拆分。

---

### 10. video_prompts（视频提示词）⭐⭐ 重点瘦身区

**skill**：`scene-video-prompt-builder`
**validator 依赖**：`outputs/video_prompts_pack_*.md` 或 `outputs/video_prompts/视频提示词_第N包_*.md` + 6 个深度契约 marker（SF-VP-101~106）+ 3 个必需文件（SF-VP-201~203）+ pack 内容四层结构（SF-VP-204~205）+ 复制块 markers（SF-VP-211~214）+ 跨 pack 对齐（SF-VP-001）+ 确认门 + board 一致性

这是**约束第二重**的阶段，validator 硬阻断最多。

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `outputs/video_prompts/视频提示词_第N包_中文_v*.md` | 中文 pack 主交付（四层结构 + 可直接复制使用块） | A+B（SF-VP-201/204/205/211~214） | **必留**（默认唯一主交付） |
| `outputs/video_prompts/视频提示词_第N包_英文_v*.md` | 英文 pack 主交付 | C 可选 | **按需生成**：仅用户明确要英文版时才产（见全局中文优先政策） |
| `details/video_prompts/video_prompt_review_v*.md` | review 结果（review_status/round/issues_found/auto_fixes/final_delivery_ready） | A+B（SF-VP-203/208/209） | **必留** |
| `outputs/video_prompts/视频提示词_导演长版_中文_v*.md` | 整片汇编中文版 | C 可选 | **按需生成**：仅用户明确要整片汇编时才产 |
| `outputs/video_prompts/视频提示词_导演长版_英文_v*.md` | 整片汇编英文版 | C 可选 | **按需生成**：仅用户明确要英文整片汇编时才产 |
| `outputs/video_prompts/视频提示词_导演长版_中文_segment_*.md` | 按 segment 拆分的中文长版 | C 可选 | **按需生成**：仅用户明确要求按段落盘时才产 |
| `outputs/video_prompts/视频提示词_导演长版_英文_segment_*.md` | 按 segment 拆分的英文长版 | C 可选 | **按需生成**：仅用户明确要英文段拆时才产 |

#### 瘦身判断

video_prompts 默认会产 中文 pack 各 N 个 + 1 个 review。**关键政策变更（见文档"全局政策"段）**：默认只产中文版，英文版改为按需。

1. **默认仅中文**：当前 required-deliverables 明确"不得只生成中文或只生成英文 pack"，validator SF-VP-201/202 强制双语。**需改为默认只强制中文（SF-VP-201），英文（SF-VP-202）降级为可选**。这是配合全局"默认只产中文版产物"政策的硬性改造。
2. **整片汇编 / segment 拆分**：已经是按需（required-deliverables 明确"只有用户明确需要时才写入"），保持。

**瘦身边界**：pack 对齐输出（中文）是 validator 强依赖，无法直接删；英文降为按需后，每个 pack 直接减半文件数。需配套改 validator SF-VP-202 政策 + required-deliverables 的"禁止只生成中文"条款。

---

### 11. publish_review（发布复盘）

**skill**：`scene-publish-review`
**validator 依赖**：`outputs/publish_review.md`（pattern + `## publish_checklist` heading + frontmatter schema）

#### 产物清单

| 文件 | 用途 | 类别 | 瘦身方案 |
|---|---|---|---|
| `outputs/publish_review.md` | 发布检查清单 + 发布状态 | B validator 必须存在 | **必留** |
| `outputs/publish_copy/title_cover_v1.md` | 标题与封面文案 | A 发布物 | **必留** |
| `outputs/publish_copy/<platform>_publish_v1.md` | 各平台发布文案（抖音/B站/小红书/X/generic） | A 发布物 | **按需生成**：只产用户指定的平台 |
| `outputs/publish_copy/voice_subtitle_v1.md` | 字幕/配音文案 | A 发布物 | **必留** |
| `details/review_v*.md` | 发布后复盘记录 | C 可降级 | **按需生成**：发布后数据回流才补 |

#### 瘦身判断

发布物按平台数量浮动。**建议**：默认只产 generic + title_cover + voice_subtitle，其他平台按需。review 文件已是按需。**无需大改**。

---

## 横向瘦身机会汇总

### ⭐ 重点重构（工作流改造 + validator 配套，收益最大）

| 阶段 | 当前 | 建议 | 收益 | validator 影响 |
|---|---|---|---|---|
| design | 7~8 文件 | **工作流重构**：草稿不独立落盘（对话内设计预览），一次性落 3 个一体化 outputs + 1 个轻量 design_notes | **-4 文件** + 消除草稿/最终内容重复 | ✅ 需删 SF-DG-201/202，改 SF-DG-203/204，更新 SF-DG-211/212 |

### 高优先级（合并不违反 validator，收益大）

| 阶段 | 当前 | 建议 | 收益 | validator 影响 |
|---|---|---|---|---|
| performance | 3 文件 | 合并为 1（performance_sheet 含 action/emotion continuity section） | -2 文件 | ❌ 无（只校验 outputs/performance_pack_*.md） |
| audio | 4 文件 | 合并为 1（audio_plan 含 music/foley/mix section） | -3 文件 | ❌ 无（只校验 outputs/audio_pack_*.md） |
| script | 3 文件 | 合并 VGU plan 入 beat_table | -1 文件 | ❌ 无（只校验 outputs/script.md） |
| assets | 2 文件 | 合并 asset_lock 入 asset_check | -1 文件 | ❌ 无（assets 阶段 validator 无文件校验） |

### 中优先级（需要 validator 配合改造）

| 阶段 | 当前 | 建议 | 收益 | validator 影响 |
|---|---|---|---|---|
| storyboard | 8 强制 + 3 推荐 | 合并 beat_skeleton+VGU+shot_continuity 为 storyboard_breakdown；3 推荐默认并入主包 | -2~5 文件 | ✅ 需改 SF-SB-201/202/203 文件检查 |

### 低优先级（需要产品决策）

| 阶段 | 当前 | 建议 | 收益 | validator 影响 |
|---|---|---|---|---|
| video_intake | 默认 6 必生 + 3 可选 | 全量 analysis/timeline 改按需 | -2~5 文件 | ❌ 无（video_intake 不在主线 validator） |

### 无瘦身空间（保持现状）

| 阶段 | 原因 |
|---|---|
| topic_gate | 单文件 + validator 强依赖 |
| reference | 单文件 + 全链路继承权威 |
| story | 单文件 + 最轻量 |
| publish_review | 发布物按需已是合理 |

---

## validator 校验强度缺口（附带发现）

调研发现 `reference` / `story` / `assets` 三个阶段 validator 几乎是"空规则"，只跑通用 manifest final artifact 检查。这意味着：

- reference_boundary 文件缺关键字段（allowed_inheritance/forbidden_inheritance/creative_direction_context）→ validator 不拦
- story 文件 beat 数量不在 4-8 范围 → validator 不拦
- assets 文件缺 asset_lock → validator 不拦

**这不属于瘦身，属于加固**。但与瘦身专项相关：如果后续要合并 assets 的 asset_lock 入 asset_check，需要先补 assets 阶段的 validator 结构校验，否则合并后更难发现产物缺失。建议作为独立 issue 跟踪。

---

## 建议执行顺序（issue 化路线图）

按"低风险高收益"排序：

1. **Issue A：design 工作流重构**（⭐ 重点，收益 -4 文件 + 消除内容重复）
   - 草稿不独立落盘，改为对话内设计预览 + 用户确认后一次性落 3 个一体化 outputs
   - 新增轻量 `details/design/design_notes_v*.md` 用于追溯
   - 需改 validator：删 SF-DG-201/202，改 SF-DG-203/204 为 marker 检查，更新 SF-DG-211/212 board 索引
   - 需改 skill：`scene-design-builder` 的 workflow / required-deliverables / output-contract
2. **Issue B：video_prompts 默认仅中文**（⭐ 全局政策落地，收益 -N 文件 / 每包减半）
   - 英文 pack / 英文整片汇编 / 英文 segment 拆分一律降级为按需
   - 需改 validator：SF-VP-202 从强制降为可选；移除"不得只生成中文"阻断
   - 需改 skill：`scene-video-prompt-builder` 的 required-deliverables / output-contract / workflow
   - 这是全局"默认只产中文版产物"政策的主要落地 issue（见"全局政策"段）
3. **Issue C：performance 三文件合并**（无 validator 风险，收益 -2 文件）
4. **Issue D：audio 四文件合并**（无 validator 风险，收益 -3 文件）
5. **Issue E：script VGU plan 合并入 beat_table**（无 validator 风险，收益 -1 文件）
6. **Issue F：assets asset_lock 合并入 asset_check**（无 validator 风险，收益 -1 文件；但需先验证下游 design 硬依赖）
7. **Issue G：video_intake 全量解析改按需**（无 validator 风险，收益 -2~5 文件；需改 video-intake skill 的"必须生成"清单）
8. **Issue H：storyboard 推荐文件默认并入主包**（无 validator 风险，收益 -3 文件；只动推荐项）
9. **Issue I：storyboard 强制 detail 合并**（需改 validator SF-SB-201~203，收益 -2 文件）
10. **Issue J：补 reference/story/assets validator 结构校验**（加固，非瘦身）

> 注：Issue A/B 虽需改 validator，但都是用户已明确认可的方向（design 消除"草稿比最终产物还详细"反模式；video_prompts 落地全局中文优先政策），故提到最前。

---

## 不做

- 不修改任何 `projects/*` 产物
- 不回写真实项目黑板
- 不删除 validator 仍依赖的技术 marker
- 不在本阶段直接改 skill / validator / manifest
- 本文档仅为 inventory，后续 issue 化后才逐步落地

## 参考来源

- `packages/engine/src/state_machine.ts`（阶段顺序与依赖）
- `packages/engine/src/validators/validator.ts`（校验规则 SF-*）
- `packages/engine/src/validators/schemas.ts`（frontmatter schema）
- 各 skill 的 `SKILL.md` + `references/output-contract.md` + `references/required-deliverables.md`
- `.handoff/handoff-20260615-150441.md`（上轮交接）
