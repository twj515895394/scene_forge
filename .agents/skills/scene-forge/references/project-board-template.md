# PROJECT_BOARD.md 初始化模板

本文件给 `scene-forge` 总控 Skill 使用，作为新建 `projects/<project>/PROJECT_BOARD.md` 时的默认模板。

模板原则：

1. `PROJECT_BOARD.md` 是项目唯一状态源。
2. 黑板只保存顶层索引、跨阶段摘要、确认状态和文件路径，不塞长正文。
3. 运行时仍禁止读取 `docs/`、`.handoff/`、历史项目输出和其他无关项目目录。
4. v4 起默认包含 `expressive_animation`。
5. v5 起默认包含 `storyboard_director_v5`。
6. v6 起支持 `source_intake`，但完整视频解析必须落盘到 `inputs/source_intake/`。
7. 所有模板、示例、枚举和资产库 pattern 都是参考锚点，不是封闭集合。

## v6 source_intake 顶层协议

```yaml
source_intake:
  type:
  status: pending
  source_path_or_url:
  source_summary:
  source_duration_seconds:
  source_language_hint:
  active_version:
  files:
    index:
    analysis:
    timeline:
    dialogue:
    audio:
    camera:
    priority_map:
    adaptation_ideas:
    topic_gate_handoff:

  topic_gate_handoff_summary:
    candidate_topic:
    core_must_keep:
    highlights_to_consider:
    optional_to_compress:
    safe_replacement_notes:
    adaptation_ideas_summary:
    risks_or_limits:

  adaptation_ideas_summary:
    idea_count:
    recommended_ideas:
    user_selection_required: true

  adaptation_selection:
    status: pending | selected
    selected_idea_id:
    selected_title:
    selection_note:

  assetization:
    candidate_for_assetization: false
    reason:
    suggested_asset_slug:
    asset_status: none
    asset_path:

  source_asset_ref:
    asset_id:
    asset_path:
    reuse_mode:

  read_policy:
    default_read: topic_gate_handoff + priority_map_summary + adaptation_ideas_summary
    read_full_analysis_only_when_needed: true
    downstream_must_not_load_all_by_default: true
```

关键规则：

- 黑板只保存摘要。
- 不保存完整逐镜头表。
- 不保存完整台词表。
- 不保存完整长解析正文。
- 不保存完整 adaptation ideas 正文。
- 长解析统一保存到 `inputs/source_intake/`。
- adaptation ideas 仅保存摘要和文件路径。
- 用户未选择改写方向前，不进入正式剧本改写阶段。
- source asset 必须用户确认后才创建。