# scene-topic-gate 阶段正文 v1

data:
  topic_name: 唐伯虎点秋香-对对子桥段

  script_strategy:
    status: selected
    mode: preserve_original

  creative_direction_context:
    script_mode: preserve_original
    selected_adaptation:
      status: not_applicable
      selected_idea_id:
      selected_title:
      selection_note: 文字输入复刻，非视频源，不涉及 adaptation idea 选择

  source_material:
    source_type: classic_film_scene
    source_name: 唐伯虎点秋香（1993，周星驰）
    source_locator: 华府门前对对子桥段（约在第 45-52 分钟）
    notes: |
      该桥段是华语喜剧电影中最具辨识度的嘴仗对决场景之一。
      唐伯虎（周星驰饰）化装进入华府前，遭遇"对穿肠"（谷德昭饰）的对联挑战。
      两人从客套对子逐步升级到人身攻击，最终对穿肠被唐伯虎的对子逼到喷血倒地。
      核心台词"我上等威风，显现一身虎胆 / 你下流贱格，露出半个龟头"等广泛流传。

  source_intake_used: false
  source_intake_files_read: []
  source_intake_summary_used: {}

  assetization_recommendation:
    candidate_for_assetization: true
    reason: 明代服饰、园林建筑、折扇、书桌等可作为古装喜剧通用资产复用
    suggested_asset_slug: ming-dynasty-comedy-assets
    recommended_asset_status: proposed

  total_score: 90
  performance_style_suggestion: exaggerated_comedy

  director_style_candidates:
    - director_style_id: dreamworks_like
      director_style_version: v1
      style_family: 3d_animation
      style_profile_path: style_profiles/dreamworks_like/profile.md
      display_name: 梦工厂式动画喜剧（DreamWorks-like）
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: recommended
      recommendation_rank: 1
      recommendation_confidence: high
      reason: 适合题材白名单直接命中"嘴仗喜剧""反差搭档桥段"，外放冲突+强角色态度+快速反应精准命中对对子的攻防节奏
      difference_note: 侧重角色表情和喜剧 timing，强调冲突感和快速反应，比 comic_action_3d 更偏文戏喜剧

    - director_style_id: comic_action_3d
      director_style_version: v1
      style_family: 3d_animation
      style_profile_path: style_profiles/comic_action_3d/profile.md
      display_name: 漫画动作 3D（Comic Action 3D）
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      recommendation_rank: 2
      recommendation_confidence: medium
      reason: "对决桥段"可映射到对子对决，冲击帧和速度线可强化喷血倒地等滑稽暴力时刻
      difference_note: 偏动作轨迹和速度感，对以文戏为主的嘴仗需要额外喜剧适配

    - director_style_id: stylized_chinese_3d
      director_style_version: v1
      style_family: 3d_animation
      style_profile_path: style_profiles/stylized_chinese_3d/profile.md
      display_name: 东方奇幻 3D（Stylized Chinese 3D）
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      recommendation_rank: 3
      recommendation_confidence: low
      reason: 提供明代服饰、园林建筑等古装视觉基底
      difference_note: 偏史诗/英雄向，喜剧节奏需较大调整，建议仅作视觉参考

    - director_style_id: pixar_like
      director_style_version: v1
      style_family: 3d_animation
      style_profile_path: style_profiles/pixar_like/profile.md
      display_name: 皮克斯式动画（Pixar-like）
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      recommendation_rank: 4
      recommendation_confidence: low
      reason: 角色魅力和情绪反差可支撑表演
      difference_note: 偏温暖家庭向，对闹剧/吐槽气质的适配度最低

    - director_style_id: wild_comedy_2d
      director_style_version: v1
      style_family: 2d_animation
      style_profile_path: style_profiles/wild_comedy_2d/profile.md
      display_name: 狂野喜剧 2D（Wild Comedy 2D）
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      recommendation_rank: 5
      recommendation_confidence: experimental
      reason: 2D 狂野喜剧天然适配周星驰式无厘头——变形帧、Q版切入、速度线、颜艺夸张、喷血特效等在 2D 媒介中有极高发挥空间。对对子桥段的吐槽节奏和肢体荒诞感在 2D 狂野喜剧体系下可实现最大的风格自由度
      difference_note: 2D 媒介 vs 其余 3D 候选；无厘头/荒诞向 vs dreamworks_like 的好莱坞式喜剧结构；当前处于 Exploration Pool，资料深度和验证程度低于正式风格包

  director_style_suggestion:
    director_style_id: wild_comedy_2d
    director_style_version: v1
    style_family: 2d_animation
    style_profile_path: style_profiles/wild_comedy_2d/profile.md
    recommendation_confidence: experimental
    reason: 用户显式选择 Exploration Pool 中的 wild_comedy_2d。该风格在无厘头喜剧方向上有最高创作自由度，但 profile 文件尚未落地，需在进入 design 阶段前完成脚手架搭建

  style_confirmation:
    confirmation_status: confirmed
    confirmed_director_style_id: wild_comedy_2d
    confirmed_director_style_version: v1
    confirmed_style_family: 2d_animation
    confirmed_style_profile_path: style_profiles/wild_comedy_2d/profile.md
    confirmation_note: 用户从 Exploration Pool 中显式选择 wild_comedy_2d。风格包 profile 文件尚不存在，需在 scene-design-builder 前搭建最小可用的 profile 脚手架（至少包含 visual_language / performance_language / camera_language / rhythm_language / negative_constraints 六项中的核心项）

  style_selection_note: |
    用户确认选择 Exploration Pool 中的 wild_comedy_2d。
    该风格包在风格总表中已注册，但 profile.md 及六项 reference 文件均未创建。
    下一步需要：
    1. 创建 style_profiles/wild_comedy_2d/ 目录及 profile.md
    2. 至少产出 visual_language / performance_language / camera_language 三项
    3. 再进入 scene-design-builder

  production_level: focus

  decision: go

  dimension_scores:
    热点价值: 22
    动画化适配度: 18
    改编空间: 13
    经典认知锚点: 14
    风险可控性: 9
    制作成本可控性: 9
    平台传播潜力: 5

  source_intake_dimension_notes: {}

  rationale: |
    选题总分 90，进入重点制作池（focus）。
    该桥段的喜剧密度、角色反差、经典台词和短视频传播潜力均处于极高水平。
    二人单空间、对话驱动的结构使制作成本可控。
    最大风险在于 wild_comedy_2d 风格包尚未落地，进入设计阶段前需额外搭建风格脚手架。

  risk_notes:
    - wild_comedy_2d 风格包 profile 未落地，需额外搭建工作
    - 原文对子中部分典故（如"家兄江南亡"）在现代观众中认知度有限，可考虑微调
    - 对穿肠喷血是标志性笑点，2D 动画需找到合适的夸张程度（太收敛没效果，太血腥可能不适）

  reuse_hints:
    - 明代服饰、建筑可作为资产候选复用
    - 对子节奏模板可作为 future 嘴仗类桥段的参考结构

  evaluator_rule_version: v8
