# SceneForge 项目轻索引模板

本模板用于新建 `projects/<project>/PROJECT_INDEX.md`。

用途只有三个：

1. 让总控先做低成本项目发现
2. 让 agent 在决定是否续写前，先读一份短索引
3. 避免为模糊匹配而扫描全部 `PROJECT_BOARD.md`

约束：

- 这不是状态源，正式状态仍只认 `PROJECT_BOARD.md`
- 只保留短摘要、阶段状态、关键标签和索引路径
- 不得复制整份黑板正文

## 模板

```yaml
project_index:
  project_slug:
  project_name:
  updated_at:
  lifecycle_flag:
  project_status:
  next_stage:
  current_stage:
  topic_summary:
  style_summary:
  aliases: []
  tags: []
  board_path:
  primary_stage_file:
  route_reason:
```

## 字段说明

- `project_slug`：项目唯一 slug
- `project_name`：用户可见项目名
- `updated_at`：最近一次索引更新时间
- `lifecycle_flag`：`active / blocked / completed / archived / abandoned`
- `project_status`：当前主流程状态
- `next_stage`：当前唯一下一步
- `current_stage`：当前路由阶段
- `topic_summary`：一句话项目摘要，控制在 30~60 字
- `style_summary`：当前导演风格和演绎方向摘要；若未确认可留空
- `aliases`：可用于命中该项目的别名、简称、角色名、梗名
- `tags`：低成本检索标签，如题材、人物、风格、媒介
- `board_path`：对应 `PROJECT_BOARD.md` 路径
- `primary_stage_file`：当前最值得继续读的主文件路径；没有则留空
- `route_reason`：当前为什么停在这里，一句话即可

## 更新规则

1. 新建项目时必须同步创建本文件
2. 每次推进项目状态时，都应同步更新本文件
3. 若黑板已变更而索引未变更，必须以黑板为准，并在本轮补齐索引
