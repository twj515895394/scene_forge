# SceneForge 黑板协议摘要

本文件给 `scene-forge` 总控 Skill 使用，作为读取和回写 `PROJECT_BOARD.md` 的最小协议摘要。

## 顶层 YAML 字段

```yaml
project_name:
project_status:
next_stage:
lifecycle_flag:
blocker_note:
score:
production_level:
reference_type:
adaptation_level:
performance_style:
segment_duration_seconds:
created_at:
updated_at:
```

## 主流程阶段

- `draft`
- `topic_scored`
- `reference_decided`
- `assets_checked`
- `design_ready`
- `script_ready`
- `storyboard_ready`
- `video_prompts_ready`
- `published`
- `reviewed`
- `archived`

## 生命周期字段

- `active`
- `blocked`
- `skipped`
- `abandoned`
- `completed`

说明：

- `project_status` 只表达主流程阶段
- `blocker_note` 只在真实阻塞时填写
- `next_stage` 显式保留，不完全依赖推导
- `performance_style` 由 `scene-script-adapter` 最终确认写入顶层
- `segment_duration_seconds` 默认写 `10`，由 `scene-storyboard-director` 在分镜阶段确认；若分镜密度过高，可在用户确认后改为 `15`

## 阶段补丁壳

```yaml
patch_type:
version:
status:
updated_at:
summary:
data:
```

`status` 枚举：

- `pending`
- `in_progress`
- `completed`
- `blocked`
- `skipped`

## 显示规范

- 对话层使用中文
- `summary` 使用中文描述，必要时在关键值后附英文参数值
- 结构化字段值始终保留英文参数值

示例：

- 项目状态：选题已评分（`topic_scored`）
- 演绎风格：鬼畜离谱化（`absurd_chaotic`）

## 总控路由原则

1. 先看顶层 `project_status`、`next_stage`、`lifecycle_flag`
2. 再定位当前阶段分区补丁
3. 只调度一个当前必需子 Skill
4. 合并阶段补丁后再更新顶层索引
5. 若补丁与旧文档冲突，以最新协议为准
