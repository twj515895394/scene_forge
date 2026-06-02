# Optional Source Intake Runtime Rule v6

`source_intake` 是可选运行时输入，不是所有 SceneForge 项目的必选依赖。

## 唯一读取触发条件

只有当黑板满足以下条件时，后续 Skill 才允许读取 source intake 相关文件：

```yaml
source_intake:
  status: analyzed
```

允许读取的默认文件：

```text
inputs/source_intake/topic_gate_handoff_v1.md
inputs/source_intake/source_video_priority_map_v1.md
```

按需读取：

```text
inputs/source_intake/source_intake_index_v1.md
```

谨慎深读：

```text
inputs/source_intake/source_video_analysis_v1.md
inputs/source_intake/source_video_timeline_v1.md 的相关章节
```

深读必须说明原因。

## 状态机处理规则

```yaml
source_intake.status:
  analyzed:
    behavior: allow_downstream_source_intake_reads
    next: downstream_skills_may_inherit_handoff_and_priority_map
  pending:
    behavior: do_not_read_downstream
    next: continue_or_retry_scene-video-intake
  failed:
    behavior: do_not_read_downstream
    next: fallback_to_normal_flow_or_request_new_source
  skipped:
    behavior: do_not_read_downstream
    next: normal_scene_forge_flow
  null:
    behavior: do_not_read_downstream
    next: normal_scene_forge_flow
```

## 两条合法入口

### 视频源输入

```text
video_file / video_url / short_video_url / frame_sequence
-> scene-video-intake
-> source_intake.status: analyzed
-> scene-topic-gate
-> downstream skills may inherit source_intake
```

### 普通文本输入

```text
用户口述经典片段 / 热点事件 / 剧情梗概 / 角色想法
-> scene-topic-gate
-> downstream skills must ignore source_intake unless status is analyzed
```

## 禁止行为

- 不得因为 `PROJECT_BOARD.md` 有 `source_intake` 字段就自动读取 source intake 文件。
- 不得把 `pending`、`failed`、`skipped` 或空值当成可读取状态。
- 不得为普通文本项目伪造 `source_intake`。
- 不得默认深读长解析文件。
- 不得自动创建 `assets/source-materials/<source-slug>/`。

## 后续 Skill 统一判断

所有接入 v6 的后续 Skill 必须先做：

```text
if source_intake.status == analyzed:
    read topic_gate_handoff + priority_map as needed
else:
    run normal SceneForge flow and ignore source_intake
```
