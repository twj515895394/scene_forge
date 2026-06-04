# scene-story-development 输出协议

本文件定义 `scene-story-development` 的轻量故事骨架结构、确认闸门和状态推进方式。

## 阶段补丁壳

```yaml
patch_type: scene-story-development
stage: scene-story-development
version: 1
status: pending | in_progress | completed | blocked | skipped
updated_at:
summary:
board_updates:
  state:
  routing:
  project_config:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created:
  - path:
    purpose:
    version:
files_updated:
  - path:
    purpose:
    version:
next_action:
```

## 阶段目标

在参考边界确定后，用最小必要结构回答：

- 这次具体讲什么
- 用哪些 Story Beat 讲清楚
- 角色、场景、核心道具各自承担什么剧情功能
- hero moment 和 ending payoff 在哪里

## 阶段正文结构

下文结构用于阶段正式产物文件，例如 `details/`、`outputs/` 或 `inputs/` 中的 primary/handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

```yaml
data:
  script_strategy:
    status:
    mode:
  creative_direction_context:
    script_mode:
    selected_adaptation:
      status:
      selected_idea_id:
      selected_title:
      selection_note:
    downstream_rule:
  story_confirmation:
    confirmed_by_user: false
    confirmation_note:
  story_development_summary:
  logline:
  story_premise:
  duration_target:
    target_total_duration_seconds:
    rationale:
  story_beats:
    - beat_id:
      title:
      function:
      beat_summary:
      emotion_goal:
      dramatic_question:
      payoff_seed:
  character_functions:
    - character_name:
      story_function:
      conflict_role:
      emotional_task:
  core_scene_functions:
    - scene_name:
      story_function:
      required_beats:
  key_prop_functions:
    - prop_name:
      story_function:
      required_beats:
  emotional_arc:
  hero_moment_candidates:
    - hero_id:
      title:
      related_beat:
      reason:
  ending_payoff:
  story_risk_notes:
  next_action:
```

## 关键约束

- `story_beats` 固定控制在 4-8 个。
- 不输出完整台词或完整剧本正文。
- `character_functions` / `core_scene_functions` / `key_prop_functions` 只写剧情作用，不写视觉设定。
- `rewrite_adaptation` 项目必须围绕已选方向开发骨架。
- `preserve_original` 项目必须围绕原始剧情保留，不得在此阶段重新发散题材。

## 黑板回写建议

- `board_updates.state.project_status: story_developed`
- `board_updates.state.next_stage: scene-asset-checker`
- `board_updates.stage_index.story`
- `board_updates.project_config.target_total_duration_seconds`
- `board_updates.cross_stage_summary`
- 完整 `story_beats`、角色功能、场景功能、道具功能和 `ending_payoff` 必须写入 `details/story/` 正文文件，不直接回写黑板

## 示例

```yaml
patch_type: scene-story-development
stage: scene-story-development
version: 1
status: completed
updated_at: 2026-06-03
summary: 故事骨架已确认，围绕误解升级与反转澄清建立 6 个 Story Beat，并锁定高潮看点与结尾 payoff。
board_updates:
  state:
    project_status: story_developed
    next_stage: scene-asset-checker
  project_config:
    target_total_duration_seconds: 45
  stage_index:
    story:
  cross_stage_summary:
files_created:
  - path: details/story/story_development_v1.md
    purpose: 故事骨架正文
    version: v1
files_updated:
  - path: projects/<project>/PROJECT_BOARD.md
    purpose: 故事阶段索引更新
    version: v1
next_action: 进入 scene-asset-checker，优先判断主角、厨房主操作区和核心触发道具是否已有可复用资产。
data:
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: selected
      selected_idea_id: idea_03
      selected_title: 厨房灾难喜剧化
      selection_note: 保留原冲突关系，改为家庭厨房场景中的连锁误会。
    downstream_rule: 下游围绕家庭厨房灾难喜剧方向设计角色、场景与正式剧本。
  story_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户确认 6 Beat 结构与结尾反转方向。
  story_development_summary: 以误解升级和道具失控为主轴，用 6 个 Beat 完成 setup、升级、反转和释放。
  logline: 一个本想掩盖小失误的人，意外把整个厨房拖进更大的灾难，最后在众目睽睽下反转揭晓真相。
  story_premise: 用道具连锁失控驱动误解升级，再用角色反应完成喜剧 payoff。
  duration_target:
    target_total_duration_seconds: 45
    rationale: 6 个 Beat，适合 40-50 秒短片承载。
  story_beats:
    - beat_id: B01
      title: 小失误被看见
      function: setup
      beat_summary: 主角试图掩盖一个小错误，但被旁人注意到异常。
      emotion_goal: 建立紧张又滑稽的预期
      dramatic_question: 他能否在不暴露的情况下补救？
      payoff_seed: 掩盖动作会反噬
  character_functions:
    - character_name: 主角
      story_function: 灾难制造者与补救发起者
      conflict_role: 主动掩盖
      emotional_task: 从侥幸转向崩溃再转向承认
  core_scene_functions:
    - scene_name: 厨房主操作区
      story_function: 道具失控与误解升级的核心战场
      required_beats:
        - B01
  key_prop_functions:
    - prop_name: 平底锅
      story_function: 引发连锁反应的核心触发器
      required_beats:
        - B02
  emotional_arc: 侥幸 -> 紧张 -> 失控 -> 羞耻 -> 反转释放
  hero_moment_candidates:
    - hero_id: H01
      title: 全场停顿后的真相揭晓
      related_beat: B05
      reason: 适合成为视觉与表演的共同高潮
  ending_payoff: 主角最终承认错误，反而化解众人误会，留下一个反差笑点。
  story_risk_notes:
    - 如果中段升级过多，可能压缩结尾反转的空间。
  next_action: 进入 scene-asset-checker，优先判断主角、厨房主操作区和核心触发道具是否已有可复用资产。
```
