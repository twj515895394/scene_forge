# SceneForge v6 Optional Source Intake Rule

## 核心原则

`source_intake` 是可选输入，不是必选输入。

只有当项目经过：

```text
scene-video-intake
```

并成功产生：

```yaml
source_intake:
  status: analyzed
```

后，后续阶段才允许读取 source intake 相关文件。

## 两条合法主流程

### 视频源流程

```text
Video Source
→ scene-video-intake
→ source_intake.status = analyzed
→ scene-topic-gate
→ 后续阶段
```

### 普通创意流程

```text
用户口述桥段
用户描述经典片段
用户描述热点事件
用户提供剧情梗概
用户提供角色想法
```

直接进入：

```text
scene-topic-gate
→ 后续阶段
```

此时：

```yaml
source_intake: null
```

或：

```yaml
source_intake:
  status: skipped
```

## 唯一触发条件

后续 Skill 只有在满足：

```yaml
source_intake:
  status: analyzed
```

时才允许读取：

```text
topic_gate_handoff_v1.md
source_video_priority_map_v1.md
source_intake_index_v1.md
```

否则必须忽略全部 source intake 文件。

## 禁止行为

禁止：

```text
假设所有项目都有 source_intake
假设所有项目都有视频输入
因为存在 source_intake 字段而自动读取相关文件
```

必须：

```text
先检查 source_intake.status
再决定是否读取
```

## Audit Recommendation

所有接入 v6 的 Skill 应遵守：

```text
if source_intake.status == analyzed:
    read source_intake
else:
    run normal SceneForge flow
```
