# `stylized_chinese_3d` 风格总览（Profile）

```yaml
style_profile:
  director_style_id: stylized_chinese_3d
  director_style_version: v1
  style_family: 3d_animation
  summary: >
    以东方造型语汇、层次化服装、意象化光色、英雄亮相和带有仪式感的空间调度为核心的
    3D 东方奇幻动画电影风格。
  suitable_topics:
    - 神话史诗
    - 武侠传奇
    - 志怪奇谭
    - 古装奇幻
  recommended_performance_styles:
    - heroic_intense
    - poetic_lyrical
  required_profile_files:
    - style_profiles/stylized_chinese_3d/visual_language.md
    - style_profiles/stylized_chinese_3d/performance_language.md
    - style_profiles/stylized_chinese_3d/camera_language.md
    - style_profiles/stylized_chinese_3d/rhythm_language.md
    - style_profiles/stylized_chinese_3d/lighting_language.md
    - style_profiles/stylized_chinese_3d/negative_constraints.md
  fallback_policy:
    can_be_default_for_phase1_3d: false
    note: 第一阶段仅作为显式确认后的可选风格包，不作为系统默认回退项。
```

## 使用原则

- 它强调东方奇幻世界观、器物感和英雄姿态，但不能退化成泛古风贴皮。
- 对外提示词与发布文案不直接使用具体作品名作为复刻目标。
- 风格包负责强化“怎么亮相、怎么立气势、怎么做东方意象”，不改主链结构。

## 代表作品（Representative Works）

- 《长安三万里》
- 《白蛇：缘起》
- 《深海》

说明：

- 这些作品只用于帮助理解“东方奇幻风格化 3D（Stylized Chinese Fantasy 3D）”的导演语言。
- 运行时应提炼共同的风格特征，不直接把具体作品当成复刻目标。
