# `comic_action_3d` 风格总览（Profile）

```yaml
style_profile:
  director_style_id: comic_action_3d
  director_style_version: v1
  style_family: 3d_animation
  summary: >
    以更强图形感、清晰动作轨迹、冲击帧、速度感和英雄爆点为核心的
    3D 漫画动作动画电影风格。
  suitable_topics:
    - 追逐桥段
    - 对决桥段
    - 运动竞技
    - 闯关爽片
  recommended_performance_styles:
    - exaggerated_comedy
    - heroic_intense
  required_profile_files:
    - style_profiles/comic_action_3d/visual_language.md
    - style_profiles/comic_action_3d/performance_language.md
    - style_profiles/comic_action_3d/camera_language.md
    - style_profiles/comic_action_3d/rhythm_language.md
    - style_profiles/comic_action_3d/lighting_language.md
    - style_profiles/comic_action_3d/negative_constraints.md
  fallback_policy:
    can_be_default_for_phase1_3d: false
    note: 第一阶段仅作为显式确认后的可选风格包，不作为系统默认回退项。
```

## 使用原则

- 它强调速度、切点、冲击和姿态设计，但不能退化成全程只剩打点。
- 对外提示词与发布文案不直接使用具体作品名作为复刻目标。
- 风格包负责强化“怎么打、怎么冲、怎么出 Hero Moment”，不改主链结构。

## 代表作品（Representative Works）

- 《蜘蛛侠：平行宇宙》
- 《忍者神龟：变种大乱斗》
- 《无敌破坏王》

说明：

- 这些作品只用于帮助理解“漫画动作 3D（Comic Action 3D）”的导演语言。
- 运行时应提炼共同的风格特征，不直接把具体作品当成复刻目标。
