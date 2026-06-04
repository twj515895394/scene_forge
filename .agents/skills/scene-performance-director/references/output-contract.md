# scene-performance-director 输出协议

本文件定义 `scene-performance-director` 的输出形态、表演表字段、Hero/Bridge/Blocking/道具状态承接、动作/情绪连续性链、表现力扩展表演设计、黑板摘要边界和长内容落盘方式。

## 阶段定位

`scene-performance-director` 位于：

```text
scene-story-development
-> scene-script-adapter
scene-script-adapter
-> scene-performance-director
-> scene-storyboard-director
```

它不是剧本阶段，也不是分镜阶段，而是连接二者的表演导演层。

目标：

```text
把文字剧本节拍转化为动画电影级角色表演方案。
```

本阶段还负责把剧本阶段识别出的 `expressive_beat_opportunities`、`stylized_action_opportunities` 和 `contrast_opportunities` 转化为可拍表演。

---

# 一、上游输入

本阶段默认消费以下结果：

- `scene-reference-decider`：参考边界、`must_keep`、`must_avoid`、`creative_direction_context`
- `scene-story-development`：`story_beats`、`character_functions`、`core_scene_functions`、`key_prop_functions`、`hero_moment_candidates`
- `scene-design-builder`：角色设定、视觉语言、角色轮廓、表情系统、`expressive_animation_design`、`blocking_map`、`faction_layout`、`prop_state_machines`
- `scene-script-adapter`：`adaptation_level`、`performance_style`、`story_beats`、`beat_table`、`video_generation_unit_plan`、`expressive_beat_opportunities`、`stylized_action_opportunities`、`contrast_opportunities`、`script_file`、`storyboard_hints`、`segment_strategy`、`hero_moment_candidates`、`creative_direction_context`
- 项目配置与阶段索引：`project_config.performance_style`、`project_config.production_level`、`project_config.target_total_duration_seconds`、`project_config.segment_duration_seconds`、上游阶段产出的 `segment_strategy` 与表现力扩展摘要
- 表现力扩展资产库（仅在需要细化动画物理、轻伤尺度或反差表演时按需读取）：
  - `assets/animation-stylization/effect-library.md`
  - `assets/animation-stylization/contrast-comedy-library.md`

---

# 二、输出路径

完整表演表写入：

```text
details/performance_sheet_v*.md
```

黑板只记录摘要和路径，不直接塞完整表演表正文。

---

# 三、阶段补丁壳

```yaml
patch_type: scene-performance-director
stage: scene-performance-director
version: 8
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

---

# 四、阶段正文结构

下文结构用于表演阶段 primary / handoff 正文文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

```yaml
data:
  performance_version:
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
  performance_style:
  expressive_animation_inheritance:
    enabled:
    animation_stylization_level:
    injury_tone_level:
    contrast_comedy_enabled:
    asset_references:
      effect_library: assets/animation-stylization/effect-library.md
      contrast_comedy_library: assets/animation-stylization/contrast-comedy-library.md
  performance_sheet_path:
  performance_summary:
  character_performance_profiles:
    - character_id:
      character_name:
      acting_energy:
      eye_focus_pattern:
      facial_expression_range:
      body_language:
      body_weight:
      hand_action_pattern:
      signature_gesture:
      emotional_leak:
      comedy_reaction_rule:
      blocking_behavior:
      prop_interaction_behavior:
      expressive_physics_capacity:
        squash_stretch_allowed:
        impact_deformation_allowed:
        recovery_rule:
      cartoon_injury_reaction_rule:
        allowed_visible_injuries:
        forbidden_reactions:
        recovery_or_settle:
      contrast_performance_profile:
        core_contrast_type:
        deadpan_or_self_aware:
        consistency_boundary:
  beat_performance_notes:
    - beat_id:
      emotional_goal:
      main_expression:
      micro_expression:
      eye_action:
      body_action:
      hand_action:
      pause_or_hold:
      secondary_action:
      reaction_timing:
      transition_to_next_beat:
      potential_hero_support:
      bridge_performance_hook:
      blocking_note:
      prop_state_note:
      expressive_performance:
        expression_type: none | stylized_action | minor_cartoon_injury | contrast_comedy | combined
        animation_physics:
        injury_reaction:
        contrast_behavior:
        timing_structure:
        recovery_or_settle:
  physical_comedy_performance:
    - beat_id:
      character_id:
      trigger:
      anticipation:
      impact_or_reveal:
      deformation_or_contrast_action:
      facial_take:
      hold_timing:
      recovery:
      continuity_note:
  contrast_performance:
    - beat_id:
      character_id:
      contrast_type:
      setup_behavior:
      reveal_behavior:
      deadpan_or_self_aware:
      supporting_reaction:
      timing:
      consistency_boundary:
  injury_reaction_performance:
    - beat_id:
      character_id:
      visible_injury_level:
      allowed_visible_injury:
      reaction_style:
      comedic_timing:
      forbidden_realistic_focus:
      recovery_or_settle:
  action_continuity_chains:
    - chain_id:
      source_beats:
        - beat_id:
      involved_characters:
      carry_over_action:
      handoff_signal:
      break_risk:
  emotion_continuity_chains:
    - chain_id:
      source_beats:
        - beat_id:
      involved_characters:
      emotion_arc:
      carry_over_expression:
      reset_risk:
  continuity_rules:
    character_performance_consistency:
    emotional_progression:
    gesture_continuity:
    blocking_continuity:
    prop_interaction_continuity:
    expressive_animation_continuity:
    contrast_comedy_continuity:
    injury_tone_continuity:
  storyboard_handoff:
    camera_focus_suggestions:
    closeup_priority:
    reaction_shot_priority:
    timing_notes:
    hero_moment_support:
    bridge_shot_support:
    blocking_support:
    prop_state_support:
    expressive_storyboard_support:
    contrast_reveal_support:
    injury_visibility_support:
  risk_notes:
  next_action:
```

---

# 五、字段说明

- `performance_version`：本次表演设计版本号。
- `script_strategy`：本次项目是改写剧本还是使用原始剧本。
- `creative_direction_context`：表演阶段必须继承的统一创作方向上下文。
- `performance_style`：继承并细化`project_config.performance_style`。
- `expressive_animation_inheritance`：继承设计或剧本阶段提供的表现力扩展摘要。
- `performance_sheet_path`：完整表演表路径。
- `character_performance_profiles`：角色级表演档案。
- `expressive_physics_capacity`：角色可以承受何种动画物理变形，以及如何恢复。
- `cartoon_injury_reaction_rule`：角色可以呈现何种轻中度卡通伤害反应，以及禁止哪些写实痛苦反应。
- `contrast_performance_profile`：角色级反差表演画像，说明反差如何不破坏角色一致性。
- `blocking_behavior`：角色在空间调度中的行为习惯，例如是否主动逼近、保持阵营侧、回避某个区域。
- `prop_interaction_behavior`：角色与关键道具交互时的表演动作和安全边界。
- `beat_performance_notes`：按 Story Beat 输出表演设计。
- `expressive_performance`：Beat 级表现力扩展表演设计摘要。
- `physical_comedy_performance`：专门记录动画物理动作表演，必须覆盖前摇、冲击/揭示、变形/反差动作、停顿、恢复。
- `contrast_performance`：专门记录反差喜剧表演，例如先藏后露、一本正经、类型片误导、群体反应衬托。
- `injury_reaction_performance`：专门记录轻中度卡通伤害表演。
- `action_continuity_chains`：供分镜和视频提示词继承的动作连续性链，说明哪些动作必须跨 Beat / Segment 延续。
- `emotion_continuity_chains`：供分镜和视频提示词继承的情绪连续性链，说明哪些情绪弧线不能在镜头交接时断掉。
- `potential_hero_support`：该 Beat 是否需要表演层强化，以支持后续 Hero Shot。
- `bridge_performance_hook`：该 Beat 交给下一 Beat 或 Segment 的表演钩子，例如视线、停顿、动作余势。
- `blocking_note`：该 Beat 中角色站位和移动边界。
- `prop_state_note`：该 Beat 中关键道具状态与表演交互。
- `continuity_rules`：表演、手势、情绪、站位、道具交互和表现力扩展连续性约束。
- `storyboard_handoff`：交给 `scene-storyboard-director` 的镜头提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

## 创作方向继承规则

表演阶段必须继承：

```yaml
creative_direction_context:
  script_mode: rewrite_adaptation | preserve_original
```

规则：

- `rewrite_adaptation`：表演服务已选改写方向。
- `preserve_original`：表演服务原始剧情/桥段保留，不得再发散新的改写方向。

每个主要角色至少需要覆盖：

- 眼神策略
- 表情范围
- 身体语言
- 身体重心
- 手部动作模式
- 标志性动作
- 情绪泄露方式
- 喜剧反应规则
- 空间调度行为
- 关键道具交互行为（如适用）
- 动画物理承受度（如启用表现力扩展）
- 卡通轻伤反应规则（如启用表现力扩展）
- 反差表演画像（如启用表现力扩展）

每个关键 Beat 至少需要说明：

- 情绪目标
- 主表情
- 微表情
- 眼神动作
- 身体动作
- 手部动作
- 停顿或保持
- 次级动作
- 反应时间点
- 如何过渡到下一个 Beat
- 是否支持 Hero Moment
- 是否提供 Bridge Shot 的表演钩子
- 是否涉及 Blocking 或道具状态变化
- 是否涉及动画物理、卡通轻伤或反差喜剧

---

# 六、表演设计原则

## 1. 表演必须可拍

不要写抽象词：

```text
角色很紧张
```

要写可拍动作：

```text
角色眼神短暂避开对方，右手拇指反复摩擦袖口，嘴角想笑但压住。
```

## 2. 表演必须分层

建议至少分为：

```text
眼神
脸部
身体
手部
停顿
次级动作
空间位置
道具交互
```

## 3. 动画电影化表演不是大喊大叫

动画电影化表演强调：

- 情绪泄露
- 反应停顿
- 微表情变化
- 角色内心和外在动作的错位
- 喜剧反差
- 温暖情绪释放

## 4. 喜剧需要节奏

喜剧表演必须考虑：

```text
setup
pause
reaction
payoff
settle
```

## 5. 动画物理表演必须有完整节奏

使用动画物理时，必须写清楚：

```text
anticipation → impact → deformation → hold → recovery / settle
```

不能只写：

```text
角色被夸张撞飞。
```

要写：

```text
角色先听到动静后肩膀僵住，眼神慢慢转向冲击来源；冲击发生时身体被拉成长弧线；落点处停顿半秒；随后像橡皮一样弹回可继续表演的状态。
```

## 6. 轻中度卡通伤害必须可恢复

允许：

- 灰头土脸
- 头上起包
- 小擦伤
- 鼻血笑点
- 眼冒金星
- 黑脸爆炸头

禁止：

- 大量流血
- 写实伤口
- 骨折特写
- 身体恐怖
- 持续痛苦

## 7. 反差喜剧必须保持角色一致性

反差表演不是让角色随机变傻。

例如“大块头骑小自行车”的表演重点是：

```text
角色一本正经地完成不匹配行为，笑点来自体型、道具和气质反差，而不是角色主动卖蠢。
```

---

# 七、黑板摘要建议

黑板补丁至少应说明：

- 表演版本号
- 完整表演表路径
- 角色级表演档案摘要
- Beat 级表演重点
- 哪些 Beat 使用动画物理表演
- 哪些 Beat 使用轻中度卡通伤害反应
- 哪些 Beat 使用反差喜剧表演
- 给分镜阶段的镜头化建议
- 表现力扩展连续性规则

---

# 八、长内容落盘

完整表演表写入：

```text
details/performance_sheet_v*.md
details/performance/action_continuity_chains_v*.md
details/performance/emotion_continuity_chains_v*.md
```

黑板只保留摘要和路径，不直接塞完整表演表正文。
