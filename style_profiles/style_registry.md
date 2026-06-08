# SceneForge 风格运行时索引（Style Registry）
该文件只服务运行时风格候选与最小读取，不替代各风格包正文。
## 运行时规则
- 入口阶段默认先读取本文件构造导演风格候选池，不扫描全部 `style_profiles/*` 目录。
- 用户确认具体风格后，再读取 `project_config.style_profile_path` 指向的 `profile.md`。
- 下游阶段只按 `profile.md` 中的 `required_profile_files` 读取当前阶段必需文件，不默认整包读取。
- 本文件只保留候选、显示、成熟度和最小匹配信息；详细导演语言仍在各自风格包中。

```yaml
style_registry:
  version: v1
  default_runtime_read_order:
    - style_profiles/style_registry.md
    - project_config.style_profile_path
    - style_profile.required_profile_files
  style_profile_bulk_scan_allowed: false
  entries:
    - director_style_id: pixar_like
      display_name: 高品质角色驱动动画电影感（Premium Character-Driven 3D Animation）
      display_name_cn: 高品质角色驱动动画电影感
      english_label: Premium Character-Driven 3D Animation
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      style_profile_path: style_profiles/pixar_like/profile.md
      summary: >
        以角色魅力、情绪曲线、温暖灯光、表演驱动幽默和家庭向动画电影感为核心的 3D 动画电影化风格。
      recommended_performance_styles:
        - cinematic_comedy
        - poetic_lyrical
      suitable_topics:
        - 家庭向喜剧
        - 情绪反差桥段
        - 角色成长故事
        - 经典名场面温暖改编
    - director_style_id: dreamworks_like
      display_name: 外放喜剧冲突 3D（Outward Comedic 3D）
      display_name_cn: 外放喜剧冲突 3D
      english_label: Outward Comedic 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      style_profile_path: style_profiles/dreamworks_like/profile.md
      summary: >
        以外放喜剧冲突、强角色态度、快速反应、鲜明剪影和更明显的商业娱乐节奏为核心的 3D 动画电影化风格。
      recommended_performance_styles:
        - cinematic_comedy
        - exaggerated_comedy
      suitable_topics:
        - 嘴仗喜剧
        - 群像冲突短片
        - 反差搭档桥段
        - 强对抗动作喜剧
    - director_style_id: stylized_chinese_3d
      display_name: 东方奇幻风格化 3D（Stylized Chinese Fantasy 3D）
      display_name_cn: 东方奇幻风格化 3D
      english_label: Stylized Chinese Fantasy 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      style_profile_path: style_profiles/stylized_chinese_3d/profile.md
      summary: >
        以东方造型语汇、层次化服装、意象化光色、英雄亮相和带有仪式感的空间调度为核心的 3D 东方奇幻动画电影风格。
      recommended_performance_styles:
        - heroic_intense
        - poetic_lyrical
      suitable_topics:
        - 神话史诗
        - 武侠传奇
        - 志怪奇谭
        - 古装奇幻
    - director_style_id: comic_action_3d
      display_name: 漫画动作 3D（Comic Action 3D）
      display_name_cn: 漫画动作 3D
      english_label: Comic Action 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 1
      maturity_label: 第一阶段优先（Phase 1）
      selectable_status: supported
      style_profile_path: style_profiles/comic_action_3d/profile.md
      summary: >
        以更强图形感、清晰动作轨迹、冲击帧、速度感和英雄爆点为核心的 3D 漫画动作动画电影风格。
      recommended_performance_styles:
        - exaggerated_comedy
        - heroic_intense
      suitable_topics:
        - 追逐桥段
        - 对决桥段
        - 运动竞技
        - 闯关爽片
    - director_style_id: coming_of_age_3d
      display_name: 青春成长 3D（Coming-of-Age 3D）
      display_name_cn: 青春成长 3D
      english_label: Coming-of-Age 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/coming_of_age_3d/profile.md
      summary: >
        以少年视角、关系成长、生活流观察和青春色块为核心的 3D 动画电影化风格。
      recommended_performance_styles:
        - cinematic_comedy
        - poetic_lyrical
      suitable_topics:
        - 校园成长
        - 朋友关系
        - 代际沟通
        - 第一次冒险
        - 青春轻喜
    - director_style_id: realist_cinematic_3d
      display_name: 写实质感 3D 电影化（Realist Cinematic 3D）
      display_name_cn: 写实质感 3D 电影化
      english_label: Realist Cinematic 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/realist_cinematic_3d/profile.md
      summary: >
        以可信光影、材质重量、真人电影机位和克制动作物理为核心的写实向 3D 电影风格。
      recommended_performance_styles:
        - cinematic_serious
        - dark_tense
      suitable_topics:
        - 灾难逃生
        - 末日生存
        - 硬派动作
        - 冷调科幻
        - 严肃冲突
    - director_style_id: mythic_epic_3d
      display_name: 神话史诗 3D（Mythic Epic 3D）
      display_name_cn: 神话史诗 3D
      english_label: Mythic Epic 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/mythic_epic_3d/profile.md
      summary: >
        以宏大空间、神性光感、英雄亮相和仪式化节奏为核心的神话史诗 3D 风格。
      recommended_performance_styles:
        - heroic_intense
        - poetic_lyrical
      suitable_topics:
        - 封神
        - 神话
        - 东方传奇
        - 宿命对决
        - 王者归来
    - director_style_id: dark_fable_3d
      display_name: 黑色奇谭 3D（Dark Fable 3D）
      display_name_cn: 黑色奇谭 3D
      english_label: Dark Fable 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/dark_fable_3d/profile.md
      summary: >
        以童话化轮廓、危险异境、冷暖反差和禁忌试炼为核心的黑奇谭 3D 风格。
      recommended_performance_styles:
        - dark_tense
        - poetic_lyrical
      suitable_topics:
        - 黑童话
        - 禁忌冒险
        - 诅咒
        - 异境试炼
    - director_style_id: retro_toybox_3d
      display_name: 复古玩具箱 3D（Retro Toybox 3D）
      display_name_cn: 复古玩具箱 3D
      english_label: Retro Toybox 3D
      director_style_version: v1
      style_family: 3d_animation
      style_family_label: 3D动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/retro_toybox_3d/profile.md
      summary: >
        以复古玩具材质、箱庭空间、收藏感和童趣协作为核心的玩具箱 3D 风格。
      recommended_performance_styles:
        - cinematic_comedy
      suitable_topics:
        - 玩具世界
        - 收藏柜冒险
        - 童年回忆
        - 轻动作喜剧
    - director_style_id: anime_cinematic
      display_name: 日式热血动画电影感（Anime Cinematic）
      display_name_cn: 日式热血动画电影感
      english_label: Anime Cinematic
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/anime_cinematic/profile.md
      summary: >
        以线条清晰、静帧蓄力、速度线爆发和情绪峰值可视化为核心的日式动画电影风格。
      recommended_performance_styles:
        - heroic_intense
        - poetic_lyrical
      suitable_topics:
        - 热血竞技
        - 少年对决
        - 友情誓言
        - 命运挑战
        - 青春燃向
    - director_style_id: poetic_2d_fantasy
      display_name: 诗意幻想手绘动画（Poetic Hand-Drawn Fantasy）
      display_name_cn: 诗意幻想手绘动画
      english_label: Poetic Hand-Drawn Fantasy
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/poetic_2d_fantasy/profile.md
      summary: >
        以手绘肌理、空气感、自然意象和情绪余韵为核心的诗意幻想 2D 风格。
      recommended_performance_styles:
        - poetic_lyrical
        - cinematic_comedy
      suitable_topics:
        - 自然幻想
        - 童年回忆
        - 静谧冒险
        - 日常奇遇
        - 治愈叙事
    - director_style_id: urban_graphic_2d
      display_name: 都市潮流平面动画（Urban Graphic 2D）
      display_name_cn: 都市潮流平面动画
      english_label: Urban Graphic 2D
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/urban_graphic_2d/profile.md
      summary: >
        以平面构成、强图形轮廓、街头色彩和卡点动效为核心的都市图形 2D 风格。
      recommended_performance_styles:
        - exaggerated_comedy
        - heroic_intense
      suitable_topics:
        - 城市青年
        - 时尚喜剧
        - 品牌感短片
        - 社交平台传播片段
        - 轻反叛表达
    - director_style_id: dreamy_shoujo_2d
      display_name: 少女梦幻叙事动画（Dreamy Shoujo Narrative 2D）
      display_name_cn: 少女梦幻叙事动画
      english_label: Dreamy Shoujo Narrative 2D
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/dreamy_shoujo_2d/profile.md
      summary: >
        以柔焦意象、情绪花语、凝视与幻想转换为核心的少女叙事 2D 风格。
      recommended_performance_styles:
        - poetic_lyrical
      suitable_topics:
        - 青春情感
        - 少女成长
        - 关系误会
        - 梦境化日常
    - director_style_id: wild_comedy_2d
      display_name: 狂想夸张喜剧动画（Wild Exaggerated Comedy 2D）
      display_name_cn: 狂想夸张喜剧动画
      english_label: Wild Exaggerated Comedy 2D
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/wild_comedy_2d/profile.md
      summary: >
        以超弹性形变、崩坏式反应、快切冲击和图形化笑点为核心的 2D 狂想喜剧风格。
      recommended_performance_styles:
        - exaggerated_comedy
      suitable_topics:
        - 闹剧
        - 追逐
        - 误会连锁
        - 角色翻车
    - director_style_id: ink_poetic_2d
      display_name: 水墨抒情动画（Ink Poetic 2D）
      display_name_cn: 水墨抒情动画
      english_label: Ink Poetic 2D
      director_style_version: v1
      style_family: 2d_animation
      style_family_label: 2D动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/ink_poetic_2d/profile.md
      summary: >
        以水墨留白、卷轴式展开、黑白灰层次和意在言外的东方抒情为核心的 2D 风格。
      recommended_performance_styles:
        - poetic_lyrical
      suitable_topics:
        - 山水抒情
        - 古典诗意
        - 离别
        - 修行
        - 东方寓言
    - director_style_id: classic_studio_wuxia
      display_name: 经典棚拍武侠电影感（Classic Studio Wuxia Feel）
      display_name_cn: 经典棚拍武侠电影感
      english_label: Classic Studio Wuxia Feel
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/classic_studio_wuxia/profile.md
      summary: >
        以棚拍布景感、亮相秩序、身段规则和古典类型光感为核心的经典武侠电影风格。
      recommended_performance_styles:
        - heroic_intense
        - cinematic_serious
      suitable_topics:
        - 门派冲突
        - 江湖复仇
        - 客栈对峙
        - 比武亮相
        - 古典类型桥段
    - director_style_id: neo_wuxia_cinematic
      display_name: 东方新武侠电影感（Neo Wuxia Cinematic）
      display_name_cn: 东方新武侠电影感
      english_label: Neo Wuxia Cinematic
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/neo_wuxia_cinematic/profile.md
      summary: >
        以流动空间、写意动作、情绪回旋和现代东方美术控制为核心的新武侠电影风格。
      recommended_performance_styles:
        - cinematic_serious
        - heroic_intense
      suitable_topics:
        - 宿命对决
        - 朝堂江湖
        - 情义撕裂
        - 孤胆远行
        - 东方美学决战
    - director_style_id: noir_detective
      display_name: 黑色侦探电影感（Noir Detective Cinematic）
      display_name_cn: 黑色侦探电影感
      english_label: Noir Detective Cinematic
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/noir_detective/profile.md
      summary: >
        以阴影遮挡、夜雨都市、信息延迟和疲惫侦探观察感为核心的 noir 电影风格。
      recommended_performance_styles:
        - dark_tense
        - cinematic_serious
      suitable_topics:
        - 侦探调查
        - 罪案迷局
        - 都市黑夜
        - 身份欺骗
        - 危险合作
    - director_style_id: hk_underworld_cinematic
      display_name: 港式江湖类型片感（Hong Kong Underworld Cinematic）
      display_name_cn: 港式江湖类型片感
      english_label: Hong Kong Underworld Cinematic
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/hk_underworld_cinematic/profile.md
      summary: >
        以霓虹旧街、湿热都市、兄弟义气和危险交易节拍为核心的港式江湖电影风格。
      recommended_performance_styles:
        - dark_tense
        - cinematic_serious
      suitable_topics:
        - 兄弟反目
        - 卧底
        - 黑帮交易
        - 命运滑坡
    - director_style_id: social_realist_tension
      display_name: 社会现实压迫电影感（Social Realist Tension Cinematic）
      display_name_cn: 社会现实压迫电影感
      english_label: Social Realist Tension Cinematic
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/social_realist_tension/profile.md
      summary: >
        以朴素空间、现实压力、忍耐与局促情绪积累为核心的社会现实压迫电影风格。
      recommended_performance_styles:
        - cinematic_serious
        - dark_tense
      suitable_topics:
        - 社会困境
        - 家庭压力
        - 边缘人生
        - 现实冲突
    - director_style_id: warm_humanist_cinematic
      display_name: 温暖治愈生活电影感（Warm Humanist Cinematic）
      display_name_cn: 温暖治愈生活电影感
      english_label: Warm Humanist Cinematic
      director_style_version: v1
      style_family: live_action_cinematic
      style_family_label: 真人电影感
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/warm_humanist_cinematic/profile.md
      summary: >
        以自然暖光、生活细节、笨拙善意和人物陪伴关系为核心的人文治愈电影风格。
      recommended_performance_styles:
        - cinematic_comedy
        - poetic_lyrical
      suitable_topics:
        - 家庭关系
        - 普通人小愿望
        - 城市治愈
        - 代际和解
    - director_style_id: handcrafted_whimsy_stop_motion
      display_name: 手工奇趣定格（Handcrafted Whimsy Stop Motion）
      display_name_cn: 手工奇趣定格
      english_label: Handcrafted Whimsy Stop Motion
      director_style_version: v1
      style_family: stop_motion
      style_family_label: 定格动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/handcrafted_whimsy_stop_motion/profile.md
      summary: >
        以手工材质纹理、微缩道具、怪趣幽默和可见手作痕迹为核心的奇趣定格风格。
      recommended_performance_styles:
        - cinematic_comedy
        - dark_tense
      suitable_topics:
        - 怪趣家庭
        - 微缩冒险
        - 黑色童趣
        - 发明小物件
        - quirky 喜剧
    - director_style_id: gothic_fairy_stop_motion
      display_name: 哥特童话定格（Gothic Fairy-Tale Stop Motion）
      display_name_cn: 哥特童话定格
      english_label: Gothic Fairy-Tale Stop Motion
      director_style_version: v1
      style_family: stop_motion
      style_family_label: 定格动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/gothic_fairy_stop_motion/profile.md
      summary: >
        以哥特装饰、暗色手工材质、怪诞童话机制和危险好奇心为核心的定格风格。
      recommended_performance_styles:
        - dark_tense
      suitable_topics:
        - 暗黑童话
        - 诅咒婚礼
        - 奇异家族
        - 怪诞成长
    - director_style_id: retro_mechanical_stop_motion
      display_name: 复古机械定格（Retro Mechanical Stop Motion）
      display_name_cn: 复古机械定格
      english_label: Retro Mechanical Stop Motion
      director_style_version: v1
      style_family: stop_motion
      style_family_label: 定格动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/retro_mechanical_stop_motion/profile.md
      summary: >
        以齿轮、黄铜、拼装结构和机械秩序中的情感温度为核心的复古机械定格风格。
      recommended_performance_styles:
        - cinematic_comedy
        - poetic_lyrical
      suitable_topics:
        - 发明冒险
        - 蒸汽机械
        - 微缩工业世界
    - director_style_id: heroic_motion_comic
      display_name: 热血分镜漫画动效（Heroic Motion Comic）
      display_name_cn: 热血分镜漫画动效
      english_label: Heroic Motion Comic
      director_style_version: v1
      style_family: motion_comic
      style_family_label: 动态漫画/分镜动画
      maturity: Phase 2
      maturity_label: 第二阶段扩展（Phase 2）
      selectable_status: supported
      style_profile_path: style_profiles/heroic_motion_comic/profile.md
      summary: >
        以分镜格构图、停格式英雄姿态、卡点推镜和有限动效爆点为核心的热血动态漫画风格。
      recommended_performance_styles:
        - heroic_intense
        - exaggerated_comedy
      suitable_topics:
        - 英雄登场
        - 能力觉醒
        - 短时对决
        - 宣言式高潮
        - 低成本高情绪段落
    - director_style_id: suspense_monochrome_motion_comic
      display_name: 悬疑黑白动态漫画（Suspense Monochrome Motion Comic）
      display_name_cn: 悬疑黑白动态漫画
      english_label: Suspense Monochrome Motion Comic
      director_style_version: v1
      style_family: motion_comic
      style_family_label: 动态漫画/分镜动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/suspense_monochrome_motion_comic/profile.md
      summary: >
        以黑白高反差、遮挡式信息控制和分镜格揭示为核心的悬疑动态漫画风格。
      recommended_performance_styles:
        - dark_tense
      suitable_topics:
        - 悬疑
        - 调查
        - 谜团
        - 惊悚短篇
    - director_style_id: social_fastcut_motion_comic
      display_name: 社媒快节奏动效漫画（Social Fast-Cut Motion Comic）
      display_name_cn: 社媒快节奏动效漫画
      english_label: Social Fast-Cut Motion Comic
      director_style_version: v1
      style_family: motion_comic
      style_family_label: 动态漫画/分镜动画
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/social_fastcut_motion_comic/profile.md
      summary: >
        以信息卡片、图文混排、热点 punchline 和移动端快切为核心的社媒动效漫画风格。
      recommended_performance_styles:
        - exaggerated_comedy
      suitable_topics:
        - 热点解构
        - 情绪吐槽
        - 快速传播型内容
    - director_style_id: two_d_character_three_d_world
      display_name: 2D角色+3D场景混合（2D Character with 3D World Hybrid）
      display_name_cn: 2D角色+3D场景混合
      english_label: 2D Character with 3D World Hybrid
      director_style_version: v1
      style_family: hybrid
      style_family_label: 混合形态
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/two_d_character_three_d_world/profile.md
      summary: >
        以 2D 角色轮廓与 3D 空间纵深并置、媒介反差和一致性调和为核心的混合风格。
      recommended_performance_styles:
        - heroic_intense
        - poetic_lyrical
      suitable_topics:
        - 奇幻冒险
        - 跨维度世界
        - 风格反差叙事
    - director_style_id: live_action_animation_hybrid
      display_name: 真人表演+动画强化混合（Live Action with Animation Enhancement）
      display_name_cn: 真人表演+动画强化混合
      english_label: Live Action with Animation Enhancement
      director_style_version: v1
      style_family: hybrid
      style_family_label: 混合形态
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/live_action_animation_hybrid/profile.md
      summary: >
        以真人基底表演、动画批注强化和主观感受可视化为核心的真人+动画混合风格。
      recommended_performance_styles:
        - cinematic_comedy
        - poetic_lyrical
      suitable_topics:
        - 都市奇想
        - 主观情绪
        - 轻实验短片
        - 人物心理可视化
    - director_style_id: docu_comic_hybrid
      display_name: 纪录感+漫画批注混合（Docu Comic Hybrid）
      display_name_cn: 纪录感+漫画批注混合
      english_label: Docu Comic Hybrid
      director_style_version: v1
      style_family: hybrid
      style_family_label: 混合形态
      maturity: Exploration Pool
      maturity_label: 探索候选（Exploration Pool）
      selectable_status: experimental
      style_profile_path: style_profiles/docu_comic_hybrid/profile.md
      summary: >
        以纪实画面基底、漫画批注层、观点插入和信息节奏组织为核心的 docu-comic 混合风格。
      recommended_performance_styles:
        - cinematic_serious
        - exaggerated_comedy
      suitable_topics:
        - 社会观察
        - 知识拆解
        - 纪实短片
        - 现场解构
```
