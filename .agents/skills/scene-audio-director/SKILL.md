---
name: scene-audio-director
description: 当用户要把 SceneForge 的分镜和表演设计转化为动画电影级声音方案，包括配音方向、拟音、环境音、静默点、配乐主题和音频混合计划时应使用此技能。
---

# scene-audio-director

负责把分镜、表演和情绪节拍转化为可执行的声音导演方案。

本技能解决的问题不是“顺便加点音乐”，而是把声音作为动画电影叙事的一部分来设计。

它重点补齐动画电影化路线中的声音层：

- 配音方向
- 台词气口
- 拟音设计
- 环境音叙事
- 情绪静默
- 配乐主题
- 音乐情绪曲线
- Segment 级声音连续性

SceneForge 当前只输出声音制作说明、音乐 prompt、拟音 prompt 和混音计划，不生成最终音频。

## 何时使用

在以下场景使用此技能：

- 总控 Skill 发现项目 `next_stage` 为 `scene-audio-director`
- `scene-storyboard-director` 已完成，项目状态为 `storyboard_ready`
- 已有完整分镜、Segment Plan 和关键镜头声音提示
- 需要在生成最终视频 Prompt 前，先统一规划配音、拟音、环境音、音乐和静默点

如果分镜尚未完成，或缺少 Segment Plan，不要优先使用本技能。

## 上游输入

采用 `compact` 上下文预算，运行时只读取：

1. 项目 `PROJECT_BOARD.md`
2. 本 Skill 文件
3. `references/output-contract.md`
4. `scene-reference-decider` 的参考边界和规避项
5. `scene-design-builder` 的场景与角色设定
6. `scene-performance-director` 的表演表和停顿设计
7. `scene-storyboard-director` 的完整分镜、`segments`、`shot_highlights`、`hero_moments`、`bridge_shots`、`continuity_rules`、`prompt_hints`、`blocking_map`、`faction_layout` 和 `prop_state_machines`

运行时禁止读取：

```text
docs/
.handoff/
会话记录_*.md
历史项目输出
其他无关项目目录
```

## 执行步骤

1. 读取项目 `PROJECT_BOARD.md`，确认 `project_status` 为 `storyboard_ready`，且总控路由的 `next_stage` 为 `scene-audio-director`。
2. 读取完整分镜和 Segment Plan，确认每个 Segment 覆盖的镜头和 Story Beat。
3. 读取 Hero Shot、Bridge Shot、Blocking/Faction 和道具状态连续性，作为声音钩子与段落衔接的输入。
4. 读取表演表，提取台词气口、停顿、反应节奏和关键动作。
5. 为主要角色设计 `voice_direction`，包括语速、情绪递进、停顿、气口和表达质感。
6. 为每个关键镜头设计 Foley 拟音，确保动作、表情和喜剧节奏有声音支撑。
7. 为场景设计环境音床，避免背景音随机或与情绪脱节。
8. 设计音乐主题、情绪曲线和静默点，避免音乐全程铺满。
9. 为每个 Segment 写明 `audio_continuity`，尤其是 Bridge Shot 需要承接的动作余音、环境底噪、台词气口或音乐尾音。
10. 生成音频计划并写入 `details/audio_plan_v*.md`。
11. 生成独立音乐提示词、拟音提示词和混音计划，写入 `outputs/audio/`。
12. 黑板只记录摘要、版本、路径、关键声音策略和后续视频提示词需要继承的内容。
13. 输出单个 YAML 补丁块，并将状态推进到 `audio_ready`，下一阶段为 `scene-video-prompt-builder`。

## 关键规则

- 只执行当前 `next_stage`，不得跳过分镜阶段或直接进入视频提示词阶段。
- 音乐不是背景填充，而是情绪叙事工具。
- 拟音必须服务动作、表情、角色性格和喜剧节奏。
- 静默必须被设计，而不是缺省。
- 配音必须写清语速、气口、停顿和情绪递进。
- 每个 Segment 都应有声音连续性说明。
- Bridge Shot 的动作、视线或空间衔接，应尽量配合声音钩子。
- 不复刻具体电影配乐、主题旋律或可识别音频表达。
- 本阶段不得声称已生成最终音频，只能说明已生成声音制作说明、音乐 prompt、拟音 prompt 或混音计划。
- 输出要能被 `scene-video-prompt-builder` 直接整合进每段视频 Prompt。
- 运行时禁止读取 `docs/`、`.handoff/`、历史项目输出或其他无关项目目录。

## 参考资料

- `references/output-contract.md`：声音导演输出协议、黑板摘要字段和长正文落盘方式
