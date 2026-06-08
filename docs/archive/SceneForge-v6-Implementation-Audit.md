# SceneForge v6 Implementation Audit

日期：2026-06-02

## Audit 目标

验证 v6 Video Intake / Source Intake 是否已经从文档设计进入实际运行协议。

## 已完成项

### 1. Video Intake Skill

已新增：

```text
.agents/skills/scene-video-intake/SKILL.md
.agents/skills/scene-video-intake/references/output-contract.md
```

职责：

```text
视频解析
source_intake 生成
priority_map 生成
topic_gate_handoff 生成
assetization candidate 判断
```

### 2. 总控接入

已更新：

```text
.agents/skills/scene-forge/SKILL.md
.agents/skills/scene-forge/references/video-intake-routing-v6.md
```

新增输入识别：

```text
video_file
video_url
short_video_url
frame_sequence
```

新增路由：

```text
scene-video-intake
-> scene-topic-gate
-> production pipeline
```

### 3. Blackboard 接入

已更新：

```text
.agents/skills/scene-forge/references/board-protocol.md
.agents/skills/scene-forge/references/project-board-template.md
```

新增：

```yaml
source_intake:
```

并明确：

```text
长解析不进入 PROJECT_BOARD
```

### 4. Topic Gate 接入

已更新：

```text
.agents/skills/scene-topic-gate/SKILL.md
.agents/skills/scene-topic-gate/references/output-contract.md
```

默认读取：

```text
topic_gate_handoff_v1.md
source_video_priority_map_v1.md
```

### 5. Reference Boundary 接入

已更新：

```text
.agents/skills/scene-reference-decider/SKILL.md
```

新增：

```yaml
source_intake_reference_use:
```

### 6. Script 接入

已更新：

```text
.agents/skills/scene-script-adapter/SKILL.md
```

新增：

```yaml
source_intake_script_use:
```

### 7. Storyboard 接入

已更新：

```text
.agents/skills/scene-storyboard-director/SKILL.md
```

新增：

```yaml
source_intake_storyboard_use:
```

### 8. Video Prompt 接入

已更新：

```text
.agents/skills/scene-video-prompt-builder/SKILL.md
```

新增：

```yaml
source_intake_prompt_use:
```

## 全链路状态

当前链路：

```text
Video Source
↓
scene-forge
↓
scene-video-intake
↓
source_intake
↓
topic_gate_handoff
↓
scene-topic-gate
↓
scene-reference-decider
↓
scene-script-adapter
↓
scene-storyboard-director
↓
scene-video-prompt-builder
```

## 核心约束

全链路执行：

```text
core_must_keep
highlight_should_keep
safe_to_replace
avoid_copying
```

并持续向下游传播。

禁止：

```text
照搬原镜头
照搬原构图
照搬原机位
照搬原剪辑节奏
照搬原字幕画面
照搬平台水印
照搬品牌元素
```

允许：

```text
继承抽象结构
继承动作因果
继承情绪转折
继承冲突关系
继承镜头功能
```

## Remaining Work

增强项（不阻塞 v6 主链路）：

```text
scene-asset-checker
scene-design-builder
scene-performance-director
scene-audio-director
```

后续可进一步接入 source_intake 摘要继承。

## Audit Conclusion

```yaml
audit_result: pass
video_intake_protocol: integrated
source_intake_blackboard: integrated
topic_gate_handoff: integrated
reference_boundary: integrated
script_pipeline: integrated
storyboard_pipeline: integrated
video_prompt_pipeline: integrated
remaining_work: enhancement_only
```
