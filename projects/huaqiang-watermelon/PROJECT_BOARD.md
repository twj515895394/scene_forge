---
project_name: huaqiang-watermelon
project_status: video_prompts_ready
next_stage: scene-publish-review
lifecycle_flag: active
blocker_note:
score: 90
production_level: focus
reference_type: hybrid_reference
adaptation_level: partial_rewrite
performance_style: exaggerated_comedy
created_at: 2026-06-01
updated_at: 2026-06-01
---

# PROJECT BOARD

## 0. 项目总览

- 项目名称：华强卖瓜皮克斯版
- 选题来源：电视剧《征服》经典片段“华强买瓜”
- 当前状态：提示词已完成（`video_prompts_ready`）
- 下一阶段：发布与复盘（`scene-publish-review`）
- 生命周期：进行中（`active`）
- 制作分层：重点制作池（`focus`）
- 参考对象类型：混合参考（`hybrid_reference`）
- 改编档位：部分改写（`partial_rewrite`）
- 演绎风格：夸张搞笑化（`exaggerated_comedy`）

## 1. 选题评分区

```yaml
patch_type: scene-topic-gate
version: 1
status: completed
updated_at: 2026-06-01
summary: 该选题总分 90，判断为进入制作（`go`），建议走夸张搞笑化（`exaggerated_comedy`）路线，并进入重点制作池（`focus`）。
data:
  topic_name: 华强卖瓜皮克斯版
  source_material:
    source_type: specific_adaptation
    source_name: 电视剧《征服》华强买瓜片段
    source_locator: 华强买瓜
    notes: 经典B站鬼畜/热点片段，保留原汁原味经典对白，改写为皮克斯风格与疯狂喜剧（夸张搞笑）表现风格，场景保持经典的水果摊。
  total_score: 90
  performance_style_suggestion: exaggerated_comedy
  production_level: focus
  decision: go
  dimension_scores:
    热点价值: 23
    动画化适配度: 18
    改编空间: 14
    经典认知锚点: 15
    风险可控性: 7
    制作成本可控性: 8
    平台传播潜力: 5
  rationale:
    - B站现象级热梗，天然具有极高的平台传播潜力与热点价值。
    - 角色对峙张力极强，转换为皮克斯疯狂喜剧（3D美式卡通）的夸张肢体与表情适配度极高。
    - 经典台词（“这瓜保熟吗？”、“找茬是不是？”）全数保留，确保极强的经典认知锚点。
  risk_notes:
    - 原版劈瓜与拿刀情节具有暴力元素，需进行皮克斯式的夸张喜剧去害化改编（如西瓜化身爆裂浆汁炸弹或卡通星星眼晕倒），保持全年龄段合规。
  reuse_hints:
    - 华强与摊主的3D皮克斯/小黄人式光滑Q弹角色资产可用于后续的系列化恶搞/改编。
    - 街角水果摊场景可沉淀为通用的城镇/街道资产。
  evaluator_rule_version: topic-gate-v1
```

## 2. 参考对象判断区

```yaml
patch_type: scene-reference-decider
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次以电视剧《征服》原版为主参考，允许继承经典对白、水果摊陈设与名场面调度，但华强拿刀动势改用“史诗级石中剑慢动作拔刀”设计，劈瓜特效采用“浆汁喷泉与老板脸部风洞形变”的卡通搞笑化改编。
data:
  reference_type: hybrid_reference
  decision_summary: 以电视剧《征服》原版剧情、对白与水果摊陈设为主参考，辅以皮克斯夸张喜剧动作与特效边界，按高认知名场面保留、动作运镜与物理特效卡通化重构执行。
  reference_boundary:
    primary_reference: 电视剧《征服》华强买瓜片段
    secondary_reference: 皮克斯/美式3D动画夸张动作物理学
    boundary_rule: 经典台词、水果摊空间布局、人物走位与对峙调度必须完整保留；华强的持刀特写镜头与劈瓜伤害性情节必须彻底规避，改用史诗反差运镜与Q弹流体风洞特效进行搞笑化改编。
    allowed_inheritance:
      - 角色身份
      - 角色关系
      - 服装轮廓
      - 标志道具
      - 情绪核心
      - 剧情骨架
      - 场景气质
    forbidden_inheritance:
      - 镜头动势
  must_keep:
    - category: 标志道具
      note: 水果摊的摆设陈设（西瓜堆放、折叠桌、电子秤、遮阳棚）、华强的摩托车、华强头盔以及经典水果刀必须作为核心认知锚点保留。
    - category: 剧情骨架
      note: 华强骑摩托车停下、挑瓜、问瓜保熟吗、老板挑瓜、秤上动手脚、劈瓜对峙、老板同伙围过来的经典调度流程必须1:1复刻。
    - category: 情绪核心
      note: 华强平静问话背后的隐性挑衅感，与老板嚣张、不耐烦的动态对比，必须作为名场面的张力核心予以保留。
  must_avoid:
    - category: 镜头动势
      note: 避免直接复刻电视剧原版的写实切镜和铺素运镜。华强持刀特写必须升级为360度低空史诗慢动作拔刀镜头（“石中剑”拔刀动势）。
    - category: 标志道具
      note: 规避任何写实的刀切西瓜动作和血腥、暴力元素。西瓜劈裂过程需重构为爆裂浆汁喷泉与秤盘震飞，老板面部受西瓜炸开的空气冲击波影响产生波浪形风洞卡通形变（“风洞化”特效）。
  risk_notes:
    - 卡通化面部变形力度需在分镜设计阶段细化，防止变形幅度过大导致角色身份特征丢失。
    - Q弹红色西瓜汁的粒子渲染效果需要控制好质感，避免观众产生不适联想。
  next_action: 进入 scene-asset-checker，检查华强、摊主和街角水果摊的 3D 卡通资产复用可能性，确认是否已有可复用基础资产。
```

## 3. 资产复用判断区

```yaml
patch_type: scene-asset-checker
version: 1
status: completed
updated_at: 2026-06-01
summary: 角色与场景资产判断已完成，由于资产库内无此类特定风格库存，华强、摊主角色与街角水果摊场景均进入完整新建（`new_full`），核心道具Q弹电子秤进入单独新建（`new_core_prop`）以供动作机制交互。
data:
  character_assets:
    - role_name: 华强
      reuse_status: new_full
      asset_ref:
      reuse_reason: 资产库中无符合皮克斯/小黄人式高饱和度、光滑Q弹3D动画风格的角色模型，需完整新建。
      required_adjustments: []
    - role_name: 摊主
      reuse_status: new_full
      asset_ref:
      reuse_reason: 资产库中无符合此特定角色与光滑3D风格要求的模型，需完整新建。
      required_adjustments: []
  scene_assets:
    - scene_name: 街角水果摊
      reuse_status: new_full
      asset_ref:
      reuse_reason: 需要从零建立起能够支撑皮克斯/小黄人风格、以及满足Slapstick（西瓜Q弹膨胀与果汁爆裂流体）物理互动的街角水果摊场景，需完整新建。
      required_adjustments: []
  prop_assets:
    - prop_name: Q弹电子秤
      prop_status: new_core_prop
      asset_ref:
      handling_note: 作为本剧的核心动作交互道具（需承受劈西瓜的空气冲击波、指针旋转爆表、秤盘震飞等极速卡通物理形变），需要单独建核心道具卡进行属性约束。
    - prop_name: 水果刀
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 经典水果刀作为华强角色的专属配件随身携带，不单独建立道具卡。
    - prop_name: 道具西瓜
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 作为场景摆设以及动作交互物嵌入水果摊场景中，不单独建核心道具卡。
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - 华强
      - 摊主
      - 街角水果摊
  risk_notes:
    - 华强角色的光滑Q弹面部表情在极度愤怒或平静挑衅时需进行合理的变形限制，避免过度卡通化导致认知的严重偏移。
    - Q弹电子秤的机械动作与指针旋转需要精细动画化，确保视觉反差性喜剧节奏。
  next_action: 进入 scene-design-builder，产出华强、摊主以及街角水果摊场景的完整皮克斯/小黄人风格的3D设定与角色锁定卡，并单独定义Q弹电子秤的核心道具设定。
```

## 4. 角色与场景设定区

```yaml
patch_type: scene-design-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 角色与场景设定已完成。根据重点制作池（`focus`）要求，已产出“华强”、“摊主”完整角色设定及“街角水果摊”完整场景设定，并单独定义了“Q弹电子秤”核心道具交互设定，详细正文已写入 details/ 目录中。
data:
  design_mode: focus
  character_design:
    - name: 华强
      reference_strength: high_anchor
      design_ref: projects/huaqiang-watermelon/details/character_design_v1.0.md
      summary: 采用五头身、微胖、梨形圆脸的亮眼3D卡通形象。身着极高反射亮黑色皮衣与亮蓝T恤，拥有清澈剔透、无辜但挑衅的双重点状反射大眼睛，支持极致的挤压与拉伸（Squash & Stretch）面部表情融合形变。
    - name: 摊主
      reference_strength: high_anchor
      design_ref: projects/huaqiang-watermelon/details/character_design_v1.0.md
      summary: 大猩猩比例的光头滑稽反派体型，金黄闪亮的大粗项链。圆滚滚的硕大光头支持镜面反光，脸部网格设置软体形变驱动骨骼，完美支撑西瓜浆汁炸裂时的卡通波浪形“风洞”脸部颤抖形变。
  scene_design:
    - name: 街角水果摊
      reference_strength: high_anchor
      design_ref: projects/huaqiang-watermelon/details/scene_design_v1.0.md
      summary: 高饱和度“糖果色”调性街景。蓝白相间的Q弹荷叶边帆布遮阳棚，油亮光滑的墨绿色金字塔西瓜堆，在温暖耀眼的侧上日照与金色边缘光（Rim Light）下折射出高端电影级3D动画漫反射质感。
  prop_design:
    - name: Q弹电子秤
      reference_strength: high_anchor
      design_ref: projects/huaqiang-watermelon/details/scene_design_v1.0.md
      summary: 奶黄色高反射玩具质感机身，带有特大圆形表盘或荧光数字LED屏，支持Slapstick弹簧般受重下沉形变。在劈瓜爆发时，秤盘会像飞碟旋转飞走，机身呈现受惊缩窄卡通逗趣形变。
  script_adaptation_notes:
    - 剧本需完整保留全部原版台词，但动作描述需与“慢动作拔刀”和“西瓜浆汁风洞爆裂”的动画物理机制完全对齐。
    - 华强平静说出台词与身上展现的超现实“大反派”光影特效形成反差性幽默，需要在台词描述与视听语言描述中突出。
  next_action: 进入 scene-script-adapter，编写《华强卖瓜》皮克斯版完整改编剧本，将经典对白与疯狂卡通 Slapstick 特效及动作线彻底融入剧本正文。
```

## 5. 剧本改编区

```yaml
patch_type: scene-script-adapter
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次采用部分改写型（`partial_rewrite`），并最终确认为夸张搞笑化（`exaggerated_comedy`）演绎风格，小黄人风格光滑3D卡通剧本已落盘。
data:
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  script_summary: 100%保留《征服》华强买瓜全部经典台词、水果摊陈设与故事骨架，但将所有动作描述与视听效果重写为小黄人/皮克斯式光滑Q弹3D Slapstick喜剧物理体系。
  preserved_elements:
    - category: 台词表达
      note: 完整原汁原味保留全部经典台词（如“这瓜保熟吗”、“找茬是不是”、“萨日朗”），利用平静台词与夸张卡通视听画面形成反差笑果。
    - category: 剧情骨架
      note: 骑车到店、挑瓜问价、秤上博弈、劈瓜揭秘对峙、骑车离去的主线骨架保持1:1不变。
    - category: 标志道具
      note: 经典的红色Q版摩托车、亮黑色漆皮夹克、电子秤、金链子背心与街角水果摊的陈设全部保留。
  rewritten_elements:
    - category: 动作设计
      note: 全面重写持刀与劈瓜物理线。华强持刀使用360度低空史诗慢动作环绕运镜；西瓜破裂重写为半透明红色浆汁火山爆发与空气冲击波，秤盘旋飞上天。
    - category: 角色反应
      note: 摊主脸部在劈瓜冲击波下呈现夸张的面部“风洞化”波浪颤抖形变，路人（小黄人比例）以慢动作抱头滚落，华强始终保持大眼睛清澈无辜的平静微笑。
    - category: 喜剧机制
      note: 引入Q弹电子秤受重压扁30%再弹起（Squash & Stretch）等经典的物理喜剧弹跳机制。
  scene_beats:
    - beat_id: B1
      beat_summary: 华强骑着高光圆润红色摩托滑稽漂移登场，平静询问瓜价。
      visual_focus: 华强亮皮夹克的高端Rim Light边缘光，与老板大光头亮闪闪的镜面反射对比。
      emotion_goal: 建立干净亮丽的皮克斯动画开场，引入平静与傲慢的滑稽冲突。
    - beat_id: B2
      beat_summary: 华强下车挑瓜质疑保熟，老板怒气横生。
      visual_focus: 华强专注的大圆眼特写，与西瓜金字塔的墨绿翠亮质感。
      emotion_goal: 放大经典名台词的认知锚点，通过卡通微表情积累喜剧张力。
    - beat_id: B3
      beat_summary: 秤盘交锋，老板偷按秤底吸铁石，电子秤发生夸张形变。
      visual_focus: 奶黄色电子秤被砸中后Squash压扁再Q弹跃起，指针螺旋桨般疯狂打转。
      emotion_goal: 展现小黄人风格经典的Slapstick物理回弹喜感。
    - beat_id: B4
      beat_summary: 史诗级慢动作拔刀，西瓜岩浆喷泉爆发，老板面部风洞形变，华强平静离去。
      visual_focus: 360度低空慢动作环绕拔刀十字星光 ✨，半透明果汁水柱喷发，老板脸颊波浪形剧烈风洞抖动。
      emotion_goal: 矛盾激化到顶峰的荒诞搞笑高潮，彻底去害化并极大提升视听冲击力。
  script_file: projects/huaqiang-watermelon/details/script_v1.0.md
  storyboard_hints:
    pacing_note: 慢动作拔刀Beat要使用极度隆重的静止与环绕慢速，而劈瓜爆发Beat则要爆发极高频的软体形变与物件飞溅，形成强烈的“静与动”的视听落差。
    acting_note: 强化华强自始至终的大眼睛纯真无辜神态，与老板从狂妄到被震懵、脸部呈波浪抖动的狂野卡通表现的对比。
    visual_escalation_note: 水果刀闪光要采用超现实的十字光晕，西瓜汁喷泉必须具备高端的三维玻璃透光流体质感。
  risk_notes:
    - 卡通流体需保持干净饱满的红色西瓜汁，不可带有深红或粘稠的写实血腥暗示，确保全年龄段审核安全。
  next_action: 进入 scene-storyboard-director，按 B1-B2-B3-B4 节拍开展镜头级分镜设计与视听调度规划。
```

## 6. 分镜设计区

```yaml
patch_type: scene-storyboard-director
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）光滑3D分镜已完成，共8镜，完整镜头级分镜表与三维运镜设计已落盘。
data:
  storyboard_version: v1.0
  total_shots: 8
  storyboard_summary: 以经典冲突线为骨架，镜头从静态挑衅层层递进，直至在电子秤交互与“石中剑拔刀”和“西瓜浆汁喷泉大爆发”中达到Slapstick（物理形变）喜剧巅峰。
  shot_highlights:
    - shot_id: S01
      shot_purpose: 红色圆润Q版摩托滑稽甩尾登场，奠定皮克斯风格反差感。
      visual_focus: 华强亮黑色漆皮夹克在暖日下的金色Rim Light边缘轮廓光。
      motion_note: 摩托滑入定格，华强帅气摘盔一甩头。
      emotion_note: 建立喜感帅气与经典死鱼眼无辜微笑的开场。
    - shot_id: S04
      shot_purpose: 扔瓜上秤，展现偷秤博弈中极其夸张的物理变形。
      visual_focus: 奶黄色复古电子秤特写与超大LED显示屏。
      motion_note: 电子秤被砸中瞬间Squash压扁30%再弹起Stretch，指针直升机飞旋般转动。
      emotion_note: 展现纯正小黄人风格的弹力重力Slapstick喜剧反馈。
    - shot_id: S06
      shot_purpose: 名场面拔刀，进行荒诞史诗慢动作艺术化重构，规避暴力拿刀动作。
      visual_focus: 华强亮眼大暗影剪影，水果刀爆发十字星闪光 ✨。
      motion_note: 时间静止万分之一秒，浮尘微尘零重力静止，相机进行低空360度史诗环绕。
      emotion_note: 隆重史诗感荒诞解构，将戏剧张力积累至爆发前夜。
    - shot_id: S07
      shot_purpose: 劈瓜高潮，彻底去害化重构劈西瓜，展现极速卡通空气流体物理形变。
      visual_focus: 半透明红色晶莹西瓜汁大喷泉，以及老板脸部软体网格。
      motion_note: 冲击波震飞秤盘如飞碟旋转上天，老板双颊、厚唇在气流吹拂中发生波浪形风洞抖动。
      emotion_note: 名场面荒诞搞笑的高潮，彻底去害化带来满分的视听冲击。
  continuity_rules:
    character_consistency: 华强的漆皮黑色夹克材质光泽与大眼睛在各机位保持一致；老板的抛光硬塑料大光头镜面反光与白色背心布料保持统一。
    scene_consistency: 水果金字塔墨绿油亮西瓜、蓝色塑料桌与蓝白帆布顶棚保持空间相对坐标稳定，暖金日照与金色边缘光在镜头切换中保持光源相位恒定。
    motion_continuity: B1-B3的运镜平缓推进与S06的万分之一秒时空静止、S07的劈瓜爆裂横向冲击波形成极强的“动静慢快”剪辑落差。
  shotlist_file: projects/huaqiang-watermelon/details/shotlist_v1.0.md
  prompt_hints:
    storyboard_prompt_focus: 强调角色漆皮与抛光材质渲染，大圆眼融合形变（死鱼眼、小黑点、风洞波浪震颤）。
    video_prompt_focus: 保持电子秤与西瓜在Squash & Stretch物理反馈下的连续变化，注重西瓜汁晶莹半透明流体溅射模拟。
    audio_prompt_focus: 突出摩托轮胎尖锐哨音、电子秤受压橡胶回弹与指针直升机飞旋音、拔刀光剑嗡鸣以及风洞气流吹拂声。
  risk_notes:
    - 卡通流体必须严控为高亮干净的红色果汁，绝不可渲染出写实、粘稠的深红血液暗示，确保审核安全。
  next_action: 进入 scene-video-prompt-builder，根据分镜的高亮镜头、连续性规则与提示词焦点，生成故事板与视频分段提示词。
```

## 7. 故事板与视频提示词区

```yaml
patch_type: scene-video-prompt-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）提示词已生成，故事板、视频分段和一致性约束文件均已落盘。
data:
  prompt_pack_version: v1.0
  storyboard_prompt_files:
    - file: projects/huaqiang-watermelon/outputs/storyboard_prompts/storyboard_prompt_v1.0.md
      purpose: 故事板静帧生成提示词
  video_prompt_files:
    - file: projects/huaqiang-watermelon/outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_01_08
      purpose: 分镜头视频分段提示词
  consistency_rules:
    character_consistency: 华强的亮反光漆皮夹克材质和大圆眼在各机位保持一致；老板的抛光硬塑料光头镜面反光和背心金链子保持统一，均施加 cref 一致性约束。
    scene_consistency: 天蓝色折叠塑料桌、墨绿油亮西瓜金字塔、蓝白帆布棚顶和下午金色 Rim Light 在各镜头间保持空间和光照相位恒定，施加 sref 一致性约束。
    motion_continuity: B1-B3的运镜平缓推进与S06的万分之一秒时空静止、S07的西瓜浆汁大喷发和老板“风洞形变”抖动形成完美的物理喜剧节奏。
  audio_rules:
    sound_fx_direction: 在华强敲瓜、电子秤受压 Squash & Stretch 弹跳指针飞旋、拔刀十字星 ✨ 闪光嗡鸣、劈西瓜果汁火山喷发和电线杆砸响中加入极富表现力的 Foley Cartoon SFX。
    music_direction: 复古滑稽管弦乐大乐团风格背景乐，拔刀瞬间突入滴答时钟与激光嗡鸣，劈瓜高潮齐鸣后转化为口哨滑稽谢幕。
    pacing_audio_note: 慢动作拔刀瞬间的音效骤停为视觉的高亮史诗慢动作提供了绝佳的“动静/声画”戏剧落差。
  readiness_notes:
    - 发布包装前已具备完整的视听资产生成基线，只需在最终发布前准备平台封面方案和爆款标题文案。
  next_action: 进入 scene-publish-review，整理小红书/B站爆款标题、发布文案、发布后数据复盘方案和资产入库沉淀建议。
```

## 8. 发布与复盘区

```yaml
patch_type: scene-publish-review
version: 1
status: pending
updated_at:
summary: 待进行发布与复盘
data: {}
```

## 9. 风险与待办

- **暴力情节去害化设计**：需在剧本改编阶段提供创新的卡通喜剧冲突替代原版刀劈情节，避免暴力血腥。
- **经典台词的夸张表演配合**：在剧本与分镜阶段需设计极度夸张的面部膨胀与收缩效果，来搭配华强平静说出经典台词的反差感。
