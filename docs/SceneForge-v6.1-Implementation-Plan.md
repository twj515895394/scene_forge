# SceneForge v6.1 Intelligent Adaptation Layer 实施计划

## Phase 1 — 协议层（优先级：P0）

目标：先建立协议，不改执行逻辑。

### 1.1 更新 scene-video-intake 输出协议

文件：

```text
.agents/skills/scene-video-intake/references/output-contract.md
```

新增：

```yaml
adaptation_recommendations:
```

新增文件：

```text
inputs/source_intake/adaptation_recommendations_v1.md
```

要求：

- 保持向后兼容。
- 不影响现有 source_intake 读取策略。
- adaptation 文件默认作为 compact read 的补充资料。

验收：

- 协议通过。
- README 同步。
- PROJECT_BOARD 顶层摘要增加 adaptation 索引入口。

---

## Phase 2 — 资产库层（优先级：P0）

目标：建立开放参考型改写资产库。

新增目录：

```text
assets/adaptation/
```

新增文件：

```text
assets/adaptation/narrative-pattern-library.md
assets/adaptation/replaceable-slot-library.md
assets/adaptation/upgrade-pattern-library.md
assets/adaptation/ai-generation-risk-library.md
```

设计要求：

- 参考锚点，不是封闭枚举。
- 所有 pattern 支持：

```yaml
pattern_id:
selection_mode:
applicable_when:
creative_value:
misuse_risk:
```

验收：

- 至少覆盖 20+ narrative patterns。
- 至少覆盖 30+ replaceable slot examples。
- 至少覆盖短视频、动画电影、喜剧、情绪增强方向。

---

## Phase 3 — scene-video-intake 增强（优先级：P1）

目标：从视频理解升级到视频理解 + 改写诊断。

新增输出：

```yaml
pattern_diagnosis:
must_preserve:
replaceable_slots:
upgrade_opportunities:
variant_direction_candidates:
ai_generation_adaptation:
```

原则：

- 不输出最终创意。
- 只输出结构化建议。
- 不要求命中资产库。

验收：

- 任意源视频都能生成 adaptation_recommendations。
- 不依赖具体题材。

---

## Phase 4 — 下游消费层（优先级：P1）

目标：让改写建议真正影响创作。

### scene-topic-gate

新增读取：

```text
adaptation_recommendations.summary
```

用途：

- 选题价值判断。
- 传播潜力判断。

### scene-reference-decider

新增读取：

```text
narrative_patterns
replaceable_slots
```

用途：

- 参考方案选择。
- 避免照搬。

### scene-script-adapter

新增读取：

```text
must_preserve
replaceable_slots
variant_direction_candidates
```

用途：

- 剧本改编。

### scene-storyboard-director

新增读取：

```text
animation_upgrade
hero_moment_upgrade
visual_upgrade
```

用途：

- 镜头强化。

### scene-video-prompt-builder

新增读取：

```text
ai_generation_adaptation
```

用途：

- 降低生成失败率。

---

## Phase 5 — 质量评估层（优先级：P2）

新增评估维度：

```yaml
adaptation_quality:
  abstraction_quality:
  replacement_quality:
  creativity_quality:
  animation_quality:
  virality_quality:
  generation_feasibility:
```

用于后续审计。

---

## Phase 6 — 长期扩展（优先级：P3）

未来可增加：

```text
emotion-pattern-library
comedy-pattern-library
virality-pattern-library
character-archetype-library
social-commentary-library
```

但不纳入 v6.1 首轮。

---

## 最小可交付版本（MVP）

第一轮只做：

1. adaptation_recommendations_v1 协议。
2. 四个 adaptation 资产库。
3. scene-video-intake 生成能力。
4. scene-script-adapter 消费能力。

达到：

```text
Video Understanding
-> Adaptation Recommendations
-> Better Script Adaptation
```

即可视为 v6.1 MVP 完成。
