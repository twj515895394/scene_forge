# SceneForge v6：Source Intake 资产化策略

日期：2026-06-02

> 本文档是 `SceneForge-v6-Video-Intake-System.md` 与 `SceneForge-v6-Video-Intake-Storage-and-Reading-Strategy.md` 的补充设计。
>
> 目标：说明 `scene-video-intake` 解析出来的内容，什么时候只是某个项目的输入资料，什么时候可以提升为可复用资产，以及如何保存、索引、读取和避免误用。

---

## 1. 核心结论

视频解析结果有两种身份：

```text
project input：某个具体项目的源视频解析资料
reusable source asset：可被多个项目重复参考、改编和复用的源片段资产
```

默认规则：

```text
第一次解析先进入 projects/<project>/inputs/source_intake/ 或 projects/_intake/。
只有经过显式提升，才进入 assets/source-materials/。
```

也就是说：

```text
不是所有 intake 都自动变资产。
只有具备复用价值、清楚安全边界和抽象改编价值的 intake 才应资产化。
```

---

## 2. 为什么需要资产化

有些视频片段会被反复拿来做不同改编，例如：

```text
华强买瓜
经典小品桥段
热点短视频名场面
采访名场面
高传播反差片段
经典动作 / 表演 / 情绪段落
```

这些内容的价值不只是一次项目输入，而是可以沉淀成：

- 源片段理解资料；
- 桥段结构模板；
- 表演节奏资产；
- 镜头语言参考；
- 改编角度库；
- 安全替换规则；
- 可重复使用的选题素材。

---

## 3. Project Input 与 Reusable Asset 的区别

### 3.1 Project Input

位置：

```text
projects/<project>/inputs/source_intake/
```

特点：

- 服务当前项目；
- 可以比较详细；
- 包含当前项目的判断、偏好和取舍；
- 后续阶段按需读取；
- 不默认给其他项目使用。

适合保存：

```text
当前项目完整解析
逐镜头时间轴
本项目的 topic gate handoff
本项目的保留 / 压缩 / 替换决策
```

### 3.2 Reusable Source Asset

位置：

```text
assets/source-materials/<source-slug>/
```

特点：

- 可跨项目复用；
- 应更抽象、更稳定；
- 不应绑定某个项目的具体创作决策；
- 应强调可迁移结构、亮点、风险和改编边界；
- 应能被 `scene-topic-gate`、`scene-reference-decider`、`scene-script-adapter` 等阶段按需读取。

适合保存：

```text
源片段摘要
核心桥段结构
传播亮点
人物关系 / 情绪关系
动作节奏 / 台词节奏 / 镜头节奏
可复用改编角度
安全替换建议
不应照搬元素
历史项目引用记录
```

---

## 4. 推荐资产目录结构

建议新增：

```text
assets/source-materials/
```

示例：

```text
assets/source-materials/huaqiang-buy-watermelon/
  source-card.md
  structure-analysis.md
  adaptation-angles.md
  safety-boundaries.md
  reuse-history.md
```

说明：

```text
source-card.md：源片段资产卡，给总控和选题阶段快速读取
structure-analysis.md：桥段结构、动作节奏、情绪节奏、台词节奏
adaptation-angles.md：可复用改编角度，不绑定具体项目
safety-boundaries.md：不应照搬内容、需替换元素、版权/品牌/人物边界
reuse-history.md：哪些项目用过、怎么用的、效果如何
```

---

## 5. Source Asset Card 草案

`source-card.md` 建议结构：

```yaml
source_asset:
  asset_id:
  title_cn:
  title_en:
  source_type: video_clip | scene | short_video | interview | sketch | other
  origin_note:
  canonical_summary:
  why_reusable:
  core_hook:
  core_conflict:
  emotional_engine:
  comedic_engine:
  performance_engine:
  camera_or_editing_engine:
  dialogue_or_audio_engine:
  reusable_structure:
    setup:
    escalation:
    turn:
    payoff:
  content_priority:
    must_preserve_as_abstract_structure:
    can_transform:
    should_replace:
    avoid_copying:
  candidate_adaptation_angles:
    - angle_id:
      title:
      reason:
      suitable_for:
      risk_note:
      selection_mode:
  recommended_usage:
    topic_gate:
    script_adapter:
    storyboard_director:
    video_prompt_builder:
  safety_boundaries:
    do_not_copy:
    replace_required:
    keep_only_as_abstract_reference:
  reuse_history_file: reuse-history.md
```

---

## 6. 什么时候把 intake 提升为 asset

不是每个视频解析都要资产化。

建议满足以下任意条件时，可以考虑提升：

```text
1. 用户明确说“这个片段以后可能还会反复用”。
2. 片段是经典名场面、网络名梗或高传播桥段。
3. 片段有清晰可迁移的结构，例如强冲突、强反差、强台词节奏、强动作节奏。
4. 片段可以支持多个改编角度，而不是只适合当前项目。
5. 片段已经被多个项目引用。
6. 片段有明显的可复用镜头语言、表演节奏或声音节奏。
```

不建议资产化的情况：

```text
1. 只服务一次项目。
2. 内容价值主要来自具体人物身份、品牌或受保护表达，抽象后价值不足。
3. 片段信息不完整或解析不可靠。
4. 安全边界不清楚。
5. 用户只是临时参考，不希望沉淀。
```

---

## 7. 提升流程：Project Intake -> Source Asset

建议流程：

```text
scene-video-intake 生成 project intake
-> scene-topic-gate / 用户判断该片段有复用价值
-> 标记 candidate_for_assetization: true
-> 生成 source asset draft
-> 用户确认是否资产化
-> 写入 assets/source-materials/<source-slug>/
-> 在 PROJECT_BOARD 或 reuse-history 中记录引用
```

不应自动资产化。

因为资产库是长期复用资源，必须经过确认。

---

## 8. PROJECT_BOARD 建议字段

在 `source_intake` 中增加：

```yaml
source_intake:
  assetization:
    candidate_for_assetization: true | false | uncertain
    reason:
    suggested_asset_slug:
    asset_status: none | proposed | confirmed | created
    asset_path:
```

如果已经资产化：

```yaml
source_intake:
  source_asset_ref:
    asset_id:
    asset_path: assets/source-materials/<source-slug>/source-card.md
    reuse_mode: direct_reference | adapted_reference | structure_only
```

---

## 9. 读取策略

### 9.1 当前项目读取 project input

当前项目后续阶段优先读取：

```text
projects/<project>/inputs/source_intake/source_intake_index_v1.md
projects/<project>/inputs/source_intake/topic_gate_handoff_v1.md
projects/<project>/inputs/source_intake/source_video_priority_map_v1.md
```

### 9.2 未来项目读取 source asset

未来项目如果想用同一个经典片段作为参考，应优先读取：

```text
assets/source-materials/<source-slug>/source-card.md
assets/source-materials/<source-slug>/adaptation-angles.md
assets/source-materials/<source-slug>/safety-boundaries.md
```

只有在需要深入分析时，才读取：

```text
assets/source-materials/<source-slug>/structure-analysis.md
```

### 9.3 不建议未来项目直接读取旧项目 intake

不建议未来项目直接读取：

```text
projects/<old-project>/inputs/source_intake/*
```

原因：

```text
旧项目 intake 混有旧项目的创作取舍，不一定适合新项目。
```

如果某个旧项目 intake 很有复用价值，应先提升成 `assets/source-materials/*`，再给新项目读取。

---

## 10. 与 allowed_runtime_asset_paths 的关系

如果新增 `assets/source-materials/`，不建议一次性把整个目录加入所有阶段默认读取。

更合适的规则：

```text
assets/source-materials/<source-slug>/source-card.md 可按需读取。
structure-analysis / adaptation-angles / safety-boundaries 只能在当前项目明确引用该 source asset 时读取。
```

黑板中应记录：

```yaml
context_policy:
  allowed_runtime_asset_paths:
    - assets/source-materials/<source-slug>/source-card.md
    - assets/source-materials/<source-slug>/adaptation-angles.md
    - assets/source-materials/<source-slug>/safety-boundaries.md
```

不建议写：

```yaml
allowed_runtime_asset_paths:
  - assets/source-materials/
```

原因：

```text
这会导致资产库过大，且容易让阶段读取无关源片段。
```

---

## 11. 与 Open Reference 的关系

Source Asset 仍然只是参考锚点，不是封闭模板。

使用时应标记：

```yaml
selection_mode: reference | adapted_reference | custom_generated
source_reference: assets/source-materials/<source-slug>/source-card.md
reason:
```

如果只借用抽象结构，不借用具体人物、台词或场景，应写：

```yaml
reuse_mode: structure_only
```

---

## 12. “华强买瓜”这类片段的处理方式

对于类似“华强买瓜”的经典片段，建议不要只保存某次项目解析，而应拆成两个层级：

### 12.1 Project Intake

保存当前项目对这个片段的具体解析：

```text
projects/<project>/inputs/source_intake/*
```

### 12.2 Source Asset

沉淀其可复用结构：

```text
assets/source-materials/huaqiang-buy-watermelon/
```

重点不应是照搬具体人物或台词，而是抽象为：

```text
强势顾客与摊主之间的交易冲突
台词压迫与反压迫节奏
表面日常场景下的高张力对峙
物品质量争议引发的身份与气场博弈
连续问答推进的喜剧/戏剧张力
```

可复用资产应记录：

```text
这个桥段为什么有传播性；
核心冲突是什么；
台词节奏如何推进；
哪些元素可以替换；
哪些元素不应照搬；
适合哪些改编方向。
```

---

## 13. 一句话总结

```text
scene-video-intake 的解析结果默认是项目输入资料；当它具备跨项目复用价值时，应经过确认提升为 assets/source-materials/<source-slug>/ 下的 Source Asset。未来项目应读取 Source Asset，而不是直接读取旧项目的长 intake 文件。
```
