# SceneForge v6 Phase2 Audit & Next-Step Handoff

Date: 2026-06-02

## Current Status

v6 Video Intake 主链路已经完成并通过审计。

完成链路：

```text
Video Source
-> scene-video-intake
-> source_intake
-> topic_gate_handoff
-> scene-topic-gate
-> scene-reference-decider
-> scene-script-adapter
-> scene-storyboard-director
-> scene-video-prompt-builder
```

状态：

```yaml
v6_protocol_layer: completed
v6_routing_layer: completed
v6_blackboard_layer: completed
v6_core_pipeline_layer: completed
audit_status: pass
```

## Important Findings

### Finding 1

source_intake 不应成为必选依赖。

已新增：

```text
.agents/skills/scene-forge/references/optional-source-intake-rule-v6.md
```

规则：

```text
if source_intake.status == analyzed:
    allow read
else:
    ignore source_intake
```

### Finding 2

当前 v6 更擅长：

```text
解析视频
识别结构
识别动作链
识别亮点
识别风险
```

但对于：

```text
如何改得更好
如何更有传播性
如何更适合动画电影
如何更适合短视频
如何提高完播率
```

能力仍偏弱。

## Recommended Next Phase

### v6.1 Intelligent Adaptation Layer

目标：

让 SceneForge 不仅会解析视频。

而且会主动提出：

```text
更好的改编方案
更好的喜剧方案
更好的动画化方案
更好的短视频化方案
```

## Proposed New Output

Video Intake 除现有：

```yaml
core_must_keep:
highlight_should_keep:
pass_or_compress:
safe_to_replace:
avoid_copying:
```

新增：

```yaml
adaptation_opportunities:
```

### Example

```yaml
adaptation_opportunities:

  animation_upgrade:

  comedy_upgrade:

  pacing_upgrade:

  emotional_upgrade:

  hero_moment_upgrade:

  virality_upgrade:

  visual_upgrade:
```

## New Suggested File

```text
inputs/source_intake/adaptation_recommendations_v1.md
```

内容来源：

```text
原视频分析
+ SceneForge 创作经验
+ 动画电影表达
+ 短视频传播逻辑
```

## Example Recommendation Types

### Animation Upgrade

原视频：

```text
真人动作
```

推荐：

```text
动画物理
夸张形变
视觉反应
```

### Comedy Upgrade

原视频：

```text
普通冲突
```

推荐：

```text
反差喜剧
误导与揭示
动作喜剧
```

### Virality Upgrade

原视频：

```text
高潮偏弱
```

推荐：

```text
增加 Hero Moment
增加视觉记忆点
增加反转
```

### Pacing Upgrade

原视频：

```text
节奏拖沓
```

推荐：

```text
压缩桥段
前置冲突
提前 payoff
```

## Additional Enhancement Candidates

后续可扩展：

```yaml
source_intake:
  narrative_pattern:
  comedy_pattern:
  emotional_pattern:
  virality_pattern:
```

用于后续自动辅助：

```text
reference-decider
script-adapter
storyboard-director
video-prompt-builder
```

## Remaining Technical Cleanup

非阻塞项：

```text
scene-script-adapter
scene-storyboard-director
scene-video-prompt-builder
scene-forge
```

进一步统一引用：

```text
optional-source-intake-rule-v6.md
```

避免协议漂移。

## Conclusion

v6 已达到可用状态。

下一阶段重点不应继续扩展解析能力。

而应提升：

```text
智能改编能力
创意增强能力
动画电影化能力
短视频传播优化能力
```

即：

```text
Video Understanding
-> Video Understanding + Creative Adaptation
```
