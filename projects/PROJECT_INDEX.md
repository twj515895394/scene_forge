# SceneForge 项目总索引（Project Registry）

该文件只服务项目发现与低成本路由，不替代任何 `PROJECT_BOARD.md`。

## 运行时规则
- 当用户只给一句新需求或续写意图时，先读本文件，不扫描全部项目黑板。
- 命中单个高相关项目后，再读对应 `projects/<project>/PROJECT_INDEX.md`。
- 只有在用户明确继续该项目，或命中已足够明确时，才读取对应 `PROJECT_BOARD.md`。
- 正式状态源始终是 `PROJECT_BOARD.md`，本文件只保留短摘要与索引路径。

```yaml
project_registry:
  version: v1
  updated_at: 2026-06-07T12:05:00+08:00
  entries:
    - project_slug: huafei-wall-crash
      project_name: 士兰撞墙未遂事件
      updated_at: 2026-06-08T00:00:00+08:00
      lifecycle_flag: active
      project_status: performance_ready
      next_stage: scene-storyboard-director
      current_stage: scene-storyboard-director
      topic_summary: >
        古装宫斗剧妃子撞墙名场面鬼畜改编——士兰撞什么都是道具，怎么也撞不死。反差喜剧短片，9段×10秒=90秒。
      style_summary: classic_studio_wuxia / live_action_cinematic / exaggerated_comedy
      aliases:
        - 士兰撞墙
        - 华妃撞墙
        - 华妃鬼畜
        - 甄嬛传鬼畜
        - shilan-parody
      tags:
        - performance_ready
        - scene-storyboard-director
        - active
        - classic_studio_wuxia
        - live_action_cinematic
        - 鬼畜
        - 喜剧
      project_index_path: projects/huafei-wall-crash/PROJECT_INDEX.md
      project_board_path: projects/huafei-wall-crash/PROJECT_BOARD.md
    - project_slug: tangbohu-couplet-battle
      project_name: 唐伯虎点秋香-对对子
      updated_at: 2026-06-07T00:00:00+08:00
      lifecycle_flag: active
      project_status: topic_scored
      next_stage: scene-reference-decider
      current_stage: scene-topic-gate
      topic_summary: >
        选题"唐伯虎点秋香-对对子"通过（90分/focus），演绎风格建议 exaggerated_comedy，导演风格已确认 wild_comedy_2d（...
      style_summary: wild_comedy_2d / 2d_animation
      aliases:
        - tangbohu-couplet-battle
        - 唐伯虎点秋香-对对子
      tags:
        - topic_scored
        - scene-reference-decider
        - active
        - wild_comedy_2d
        - 2d_animation
      project_index_path: projects/tangbohu-couplet-battle/PROJECT_INDEX.md
      project_board_path: projects/tangbohu-couplet-battle/PROJECT_BOARD.md
    - project_slug: classic-freekick-pixar-2018
      project_name: 2018经典任意球绝平改编（皮克斯风格）
      updated_at: 2026-06-05T12:03:00+08:00
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        选题评分已完成（95分，重点制作池），采用皮克斯 3D 动画电影风格，并进行完全的无真人名、无国家队名去标与去字化处理。
      style_summary: cinematic_serious
      aliases:
        - classic-freekick-pixar-2018
        - 2018经典任意球绝平改编（皮克斯风格）
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/classic-freekick-pixar-2018/PROJECT_INDEX.md
      project_board_path: projects/classic-freekick-pixar-2018/PROJECT_BOARD.md
    - project_slug: huaqiang-watermelon-animal
      project_name: 华强买瓜动物化改编（平头哥与恶霸犬）
      updated_at: 2026-06-05
      lifecycle_flag: completed
      project_status: published
      next_stage: 
      current_stage: scene-publish-review
      topic_summary: >
        该选题打分 92，判定为 Go (focus)，建议走夸张搞笑路线（exaggerated_comedy）。角色确定为平头哥华强、恶霸犬摊主、土拨鼠小弟。
      style_summary: pixar_like / 3d_animation / exaggerated_comedy
      aliases:
        - huaqiang-watermelon-animal
        - 华强买瓜动物化改编（平头哥与恶霸犬）
      tags:
        - published
        - completed
        - pixar_like
        - 3d_animation
      project_index_path: projects/huaqiang-watermelon-animal/PROJECT_INDEX.md
      project_board_path: projects/huaqiang-watermelon-animal/PROJECT_BOARD.md
    - project_slug: ronaldo-freekick-2018-废弃
      project_name: C罗2018世界杯任意球绝平西班牙
      updated_at: 2026-06-04T23:03:00+08:00
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        选题评分已完成（92分，重点制作），采用经典还原策略，庆祝阶段加局部夸张表现。
      style_summary: cinematic_serious
      aliases:
        - ronaldo-freekick-2018-废弃
        - C罗2018世界杯任意球绝平西班牙
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/ronaldo-freekick-2018-废弃/PROJECT_INDEX.md
      project_board_path: projects/ronaldo-freekick-2018-废弃/PROJECT_BOARD.md
    - project_slug: girls-skateboard-chase
      project_name: girls-skateboard-chase
      updated_at: 2026-06-04T16:05:50+08:00
      lifecycle_flag: active
      project_status: reviewed
      next_stage: completed
      current_stage: completed
      topic_summary: >
        已完成滑板少女山道追逐项目选题评估，评分87分，属于重点制作池（focus），决策为进行（go）。
      style_summary: 
      aliases:
        - girls-skateboard-chase
      tags:
        - reviewed
        - completed
        - active
      project_index_path: projects/girls-skateboard-chase/PROJECT_INDEX.md
      project_board_path: projects/girls-skateboard-chase/PROJECT_BOARD.md
    - project_slug: million-pound-biao-v2
      project_name: million-pound-biao-v2
      updated_at: 2026-06-04T11:43:00+08:00
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        已完成以对白交互驱动、保留点餐加餐、外形磨损潦倒的《百万英镑》彪哥版二创选题评估（得分93分，Go，重点制作池）。已锁定基于原版台词逐字稿的方言口对白改编方案。
      style_summary: 
      aliases:
        - million-pound-biao-v2
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/million-pound-biao-v2/PROJECT_INDEX.md
      project_board_path: projects/million-pound-biao-v2/PROJECT_BOARD.md
    - project_slug: million-pound-biao
      project_name: million-pound-biao
      updated_at: 2026-06-03T17:47:00+08:00
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        以东北方言和角色反转为驱动，通过9段式故事骨架（90秒）完成窗外徘徊、局促入店、小二带位、大口吃面、面饼擦碗、拍桌逼债、出卡亮底、经理跪验以及走火礼炮送客...
      style_summary: 
      aliases:
        - million-pound-biao
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/million-pound-biao/PROJECT_INDEX.md
      project_board_path: projects/million-pound-biao/PROJECT_BOARD.md
    - project_slug: million-pound-note
      project_name: million-pound-note
      updated_at: 2026-06-03T11:26:49+08:00
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        以未受封落魄唐朝和尚在1903年英式高档餐厅吃素面，与势力见钱眼开的金池长老及其弟子对决为主轴，基于6个Story Beat构建中西跨界反差喜剧与黄金通关...
      style_summary: 
      aliases:
        - million-pound-note
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/million-pound-note/PROJECT_INDEX.md
      project_board_path: projects/million-pound-note/PROJECT_BOARD.md
    - project_slug: huaqiang-watermelon-40s
      project_name: huaqiang-watermelon-40s
      updated_at: 2026-06-02
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        huaqiang-watermelon-40s
      style_summary: exaggerated_comedy
      aliases:
        - huaqiang-watermelon-40s
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/huaqiang-watermelon-40s/PROJECT_INDEX.md
      project_board_path: projects/huaqiang-watermelon-40s/PROJECT_BOARD.md
    - project_slug: huaqiang-watermelon
      project_name: huaqiang-watermelon
      updated_at: 2026-06-01
      lifecycle_flag: active
      project_status: video_prompts_ready
      next_stage: scene-publish-review
      current_stage: scene-publish-review
      topic_summary: >
        huaqiang-watermelon
      style_summary: exaggerated_comedy
      aliases:
        - huaqiang-watermelon
      tags:
        - video_prompts_ready
        - scene-publish-review
        - active
      project_index_path: projects/huaqiang-watermelon/PROJECT_INDEX.md
      project_board_path: projects/huaqiang-watermelon/PROJECT_BOARD.md
```
