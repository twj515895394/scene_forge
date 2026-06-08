# SceneForge 未落地风格包详细梳理

## 1. 文档定位

本文档用于系统梳理 SceneForge 当前尚未落地到 `style_profiles/` 的全部风格包。

目标有三个：

1. 为 `Phase 2` 风格包补齐高完整度索引卡，直接服务后续建包。
2. 为 `Exploration Pool` 风格包补齐中等细度索引卡，避免后续重复从零讨论。
3. 统一后续落地口径，避免“题材、媒介、品牌感、情绪”混写。

说明：

- 本文档是风格定义与规划资料，不代表这些风格已经完成 `style_profiles/` 建包。
- 代表作品仅作为理解锚点，不等于品牌复刻目标。
- 所有用户可见命名统一采用 `中文描述（English Term）`。

---

## 2. 当前未落地清单总览

### 2.1 第二阶段扩展（Phase 2）

1. `coming_of_age_3d`
2. `realist_cinematic_3d`
3. `mythic_epic_3d`
4. `anime_cinematic`
5. `poetic_2d_fantasy`
6. `urban_graphic_2d`
7. `classic_studio_wuxia`
8. `neo_wuxia_cinematic`
9. `noir_detective`
10. `handcrafted_whimsy_stop_motion`
11. `heroic_motion_comic`

### 2.2 风格探索池（Exploration Pool）

1. `dark_fable_3d`
2. `retro_toybox_3d`
3. `dreamy_shoujo_2d`
4. `wild_comedy_2d`
5. `ink_poetic_2d`
6. `hk_underworld_cinematic`
7. `social_realist_tension`
8. `warm_humanist_cinematic`
9. `gothic_fairy_stop_motion`
10. `retro_mechanical_stop_motion`
11. `suspense_monochrome_motion_comic`
12. `social_fastcut_motion_comic`
13. `two_d_character_three_d_world`
14. `live_action_animation_hybrid`
15. `docu_comic_hybrid`

---

## 3. Phase 2 高完整度风格索引卡

### 3.1 青春成长 3D（Coming-of-Age 3D）

- 英文标签（English Label）：Coming-of-Age 3D
- 系统风格包 ID（Director Style ID）：`coming_of_age_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：柔和日常光照、轻快生活化场景、青春色块、略夸张但不过火的角色比例、可亲近校园或社区空间
- 核心表演特征（Performance Traits）：少年感、关系细节、尴尬停顿、试探与成长、群体互动中的微妙情绪变化
- 核心镜头/节奏特征（Camera and Rhythm Traits）：中近景人物观察、轻推拉、生活流转场、留给反应和沉默的呼吸位
- 适配题材（Suitable Topics）：校园成长、朋友关系、代际沟通、第一次冒险、青春轻喜
- 风险题材（Risk Topics）：宏大战争、纯高概念世界观、过于冷硬悬疑
- 不推荐题材（Avoid Topics）：重口暴力、极端黑暗压迫、全程无角色关系推进的纯动作桥段
- 代表作品（Representative Works）：《青春变形记》、《心灵奇旅》、《夏日友晴天》
- 风险提示/边界（Risk Notes）：容易和 `pixar_like` 混同；需要强化“少年视角、生活流、关系成长”而不是只保留温暖感
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`poetic_lyrical`
- 可派生子风格（Variants）：校园日常版、暑期冒险版、友情裂变版
- 反向禁忌（Negative Constraints）：不要写成全龄童话口吻；不要把角色关系扁平成单线励志鸡汤
- 建包提示（Profile Build Notes）：优先补 `performance_language.md` 与 `rhythm_language.md`，建立和 `pixar_like` 的明确区分

### 3.2 写实质感 3D 电影化（Realist Cinematic 3D）

- 英文标签（English Label）：Realist Cinematic 3D
- 系统风格包 ID（Director Style ID）：`realist_cinematic_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：高可信光影、材质粗粝度更强、体积光与环境反射更真实、卡通夸张度收敛
- 核心表演特征（Performance Traits）：克制、因果清楚、身体重量感更强、动作不过分卡通化、情绪变化依赖细小行为
- 核心镜头/节奏特征（Camera and Rhythm Traits）：更接近真人电影机位、空间连续性更强、剪辑更克制、强调压迫和可信度
- 适配题材（Suitable Topics）：灾难逃生、末日生存、硬派动作、冷调科幻、严肃冲突
- 风险题材（Risk Topics）：夸张喜剧、低幼萌系、极端漫画化追逐
- 不推荐题材（Avoid Topics）：全程表情包喜剧、物理弹性夸张段子、过度卡通闹剧
- 代表作品（Representative Works）：《爱，死亡和机器人》部分篇章、《最终幻想7：圣子降临》、真人奇幻电影的氛围化参考
- 风险提示/边界（Risk Notes）：若只降饱和和提写实材质，容易变成“灰暗普通 CG”；必须同步建立镜头可信度和表演重量感
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_serious`、`dark_tense`
- 可派生子风格（Variants）：冷调科幻版、灾难求生版、压迫动作版
- 反向禁忌（Negative Constraints）：不要保留高卡通嘴型和大开大合的面部反应；不要用轻快可爱配色破坏调性
- 建包提示（Profile Build Notes）：优先补 `lighting_language.md`、`camera_language.md`、`negative_constraints.md`

### 3.3 神话史诗 3D（Mythic Epic 3D）

- 英文标签（English Label）：Mythic Epic 3D
- 系统风格包 ID（Director Style ID）：`mythic_epic_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：宏大空间、神性光感、层层递进的景深、仪式性道具和服装、壮阔天象
- 核心表演特征（Performance Traits）：英雄亮相、誓言感、对抗命运、强姿态、克制后爆发
- 核心镜头/节奏特征（Camera and Rhythm Traits）：低机位仰拍、远景建立秩序、慢起快收的史诗节奏、关键时刻强调停顿和仪式转场
- 适配题材（Suitable Topics）：封神、神话、东方传奇、宿命对决、王者归来
- 风险题材（Risk Topics）：纯日常轻喜、过于琐碎的生活场景、极小体量关系戏
- 不推荐题材（Avoid Topics）：碎片化段子、弱目标驱动、无亮相无气势的随手桥段
- 代表作品（Representative Works）：《哪吒之魔童降世》、《西游记之大圣归来》、《指环王》史诗调度感参考
- 风险提示/边界（Risk Notes）：容易滑向空泛“大战预告片”；必须保证人物关系和神性仪式感并行
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`poetic_lyrical`
- 可派生子风格（Variants）：天命决战版、少年觉醒版、神怪远征版
- 反向禁忌（Negative Constraints）：不要只堆金光和大场面；不要写成无情绪层级的持续高亢
- 建包提示（Profile Build Notes）：优先补 `visual_language.md` 与 `camera_language.md` 的空间层级规则

### 3.4 日式热血动画电影感（Anime Cinematic）

- 英文标签（English Label）：Anime Cinematic
- 系统风格包 ID（Director Style ID）：`anime_cinematic`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：形体线条清晰、局部高对比、静帧爆发、速度线与特写冲击、情绪性背景简化
- 核心表演特征（Performance Traits）：热血宣言、意志爆发、夸张停顿、临界点反扑、情绪峰值可视化
- 核心镜头/节奏特征（Camera and Rhythm Traits）：极端特写、快速切点、静止与爆发交替、情绪高潮前长蓄力
- 适配题材（Suitable Topics）：热血竞技、少年对决、友情誓言、命运挑战、青春燃向
- 风险题材（Risk Topics）：写实纪实、完全无情绪起伏的生活流、复杂群像政治戏
- 不推荐题材（Avoid Topics）：纯冷感侦探推理、极端自然主义对白戏、全程低波动观察电影
- 代表作品（Representative Works）：《鬼灭之刃》剧场版、《灌篮高手》电影版、《你的名字。》
- 风险提示/边界（Risk Notes）：容易把所有段落都演成“高燃 PV”；需要区分日常铺垫和爆发段
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`poetic_lyrical`
- 可派生子风格（Variants）：校园热血版、命运奇幻版、青春恋爱版
- 反向禁忌（Negative Constraints）：不要持续满格输出；不要失去静帧留白和情绪酝酿
- 建包提示（Profile Build Notes）：优先补 `rhythm_language.md`，明确“静帧-爆发-回落”的节拍骨架

### 3.5 诗意幻想手绘动画（Poetic Hand-Drawn Fantasy）

- 英文标签（English Label）：Poetic Hand-Drawn Fantasy
- 系统风格包 ID（Director Style ID）：`poetic_2d_fantasy`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：手绘肌理、柔和自然色、空气感、植物和微风等环境细节、幻想与日常并置
- 核心表演特征（Performance Traits）：克制、体察、善意、细节感受优先、动作幅度不大但有情绪余韵
- 核心镜头/节奏特征（Camera and Rhythm Traits）：慢节奏、自然观察、静观式转场、让空间自己说话
- 适配题材（Suitable Topics）：自然幻想、童年回忆、静谧冒险、日常奇遇、治愈叙事
- 风险题材（Risk Topics）：重机械、硬科幻、持续高压追逐
- 不推荐题材（Avoid Topics）：极端爆裂动作、低俗闹剧、黑帮暴力
- 代表作品（Representative Works）：《千与千寻》、《龙猫》、《借东西的小人阿莉埃蒂》
- 风险提示/边界（Risk Notes）：容易写成“只有好看画面没有戏剧骨架”；需要用意象服务情绪而不是堆氛围词
- 推荐演绎力度（Recommended Performance Styles）：`poetic_lyrical`、`cinematic_comedy`
- 可派生子风格（Variants）：森林奇遇版、海风童年版、温柔离别版
- 反向禁忌（Negative Constraints）：不要加入过于锋利的现代潮流语感；不要把画面做成艳俗奇观
- 建包提示（Profile Build Notes）：优先补 `visual_language.md` 与 `negative_constraints.md`

### 3.6 都市潮流平面动画（Urban Graphic 2D）

- 英文标签（English Label）：Urban Graphic 2D
- 系统风格包 ID（Director Style ID）：`urban_graphic_2d`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：平面构成、强图形轮廓、高记忆点配色、街头感、版式和运动图形并用
- 核心表演特征（Performance Traits）：态度鲜明、动作干脆、反应利落、群像节奏短平快
- 核心镜头/节奏特征（Camera and Rhythm Traits）：卡点剪辑、图形化转场、字幕或贴纸式强化、社媒传播节奏
- 适配题材（Suitable Topics）：城市青年、时尚喜剧、品牌感短片、社交平台传播片段、轻反叛表达
- 风险题材（Risk Topics）：史诗神话、古典抒情、重写实年代戏
- 不推荐题材（Avoid Topics）：严肃历史再现、重压悬疑写实、过度复杂的慢热群像
- 代表作品（Representative Works）：《蜘蛛侠：平行宇宙》、《米切尔一家大战机器》、《爱，死亡和机器人》图形化篇章参考
- 风险提示/边界（Risk Notes）：容易只有“视觉潮”没有叙事支撑；需要保证角色态度和节奏一体化
- 推荐演绎力度（Recommended Performance Styles）：`exaggerated_comedy`、`heroic_intense`
- 可派生子风格（Variants）：街头潮流版、数码噪点版、品牌快闪版
- 反向禁忌（Negative Constraints）：不要把复杂视觉全部堆在同一镜头；不要失去可读性
- 建包提示（Profile Build Notes）：优先补 `camera_language.md` 与 `rhythm_language.md` 的图形化规则

### 3.7 经典棚拍武侠电影感（Classic Studio Wuxia Feel）

- 英文标签（English Label）：Classic Studio Wuxia Feel
- 系统风格包 ID（Director Style ID）：`classic_studio_wuxia`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：布景棚拍感、定场亮相、服装轮廓清楚、类型化灯光、舞台化景别秩序
- 核心表演特征（Performance Traits）：身段感、亮相意识、台词劲道、忠奸分明、招式与礼法并重
- 核心镜头/节奏特征（Camera and Rhythm Traits）：定场镜头、完整动作展示、节拍偏稳、重进出场和站位秩序
- 适配题材（Suitable Topics）：门派冲突、江湖复仇、客栈对峙、比武亮相、古典类型桥段
- 风险题材（Risk Topics）：极强现代都市语境、赛博科技、社媒口水战
- 不推荐题材（Avoid Topics）：高频跳剪闹剧、碎片化 vlog 表达、极端写实犯罪戏
- 代表作品（Representative Works）：《独臂刀》、《大醉侠》、《金燕子》
- 风险提示/边界（Risk Notes）：不能只停留在“旧电影滤镜”；真正差异点在仪式性调度和身段秩序
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`cinematic_serious`
- 可派生子风格（Variants）：客栈对峙版、门派恩怨版、宫廷奇案版
- 反向禁忌（Negative Constraints）：不要套现代快剪动作片镜头逻辑；不要把角色演法现代口语化
- 建包提示（Profile Build Notes）：优先补 `performance_language.md` 与 `camera_language.md` 的亮相规则

### 3.8 东方新武侠电影感（Neo Wuxia Cinematic）

- 英文标签（English Label）：Neo Wuxia Cinematic
- 系统风格包 ID（Director Style ID）：`neo_wuxia_cinematic`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：流动空间、现代美术控制、冷暖对比、雾气与空境并用、写意动作轨迹
- 核心表演特征（Performance Traits）：克制情欲、人物心事深、动作与情绪绑定、英雄孤独感强
- 核心镜头/节奏特征（Camera and Rhythm Traits）：运动镜头更丰富、节奏更现代、武打段前后有情绪回旋、空间调度更流动
- 适配题材（Suitable Topics）：宿命对决、朝堂江湖、情义撕裂、孤胆远行、东方美学决战
- 风险题材（Risk Topics）：低幼喜剧、纯热闹闯关、无情绪层次的动作堆叠
- 不推荐题材（Avoid Topics）：社媒段子、校园青春日常、纯萌系童话
- 代表作品（Representative Works）：《卧虎藏龙》、《英雄》、《影》
- 风险提示/边界（Risk Notes）：容易只学“空镜和慢动作”；关键是动作、情绪、空间三者的一体感
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_serious`、`heroic_intense`
- 可派生子风格（Variants）：宫廷诗性版、江湖孤侠版、黑白写意版
- 反向禁忌（Negative Constraints）：不要把动作拆成纯功能性打斗；不要丢掉东方写意空间关系
- 建包提示（Profile Build Notes）：优先补 `camera_language.md`、`lighting_language.md`

### 3.9 黑色侦探电影感（Noir Detective Cinematic）

- 英文标签（English Label）：Noir Detective Cinematic
- 系统风格包 ID（Director Style ID）：`noir_detective`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：阴影遮挡、湿冷夜景、霓虹或钨丝灯反差、狭窄空间、信息半遮蔽
- 核心表演特征（Performance Traits）：疲惫、怀疑、克制、试探、眼神和停顿比大动作更重要
- 核心镜头/节奏特征（Camera and Rhythm Traits）：观察性机位、长廊和门框构图、低速推进、悬疑信息延迟释放
- 适配题材（Suitable Topics）：侦探调查、罪案迷局、都市黑夜、身份欺骗、危险合作
- 风险题材（Risk Topics）：明亮家庭喜剧、纯热血青春、浪漫童话冒险
- 不推荐题材（Avoid Topics）：低幼幽默、超高饱和萌系视觉、持续闹剧节奏
- 代表作品（Representative Works）：《银翼杀手2049》、《七宗罪》、《唐人街》
- 风险提示/边界（Risk Notes）：不能只靠“夜景+旁白”；必须建立信息遮蔽、空间压迫和人物疲惫感
- 推荐演绎力度（Recommended Performance Styles）：`dark_tense`、`cinematic_serious`
- 可派生子风格（Variants）：霓虹赛博版、传统私家侦探版、冷雨都市版
- 反向禁忌（Negative Constraints）：不要把悬疑演成动作爽片；不要快速解释完所有信息
- 建包提示（Profile Build Notes）：优先补 `lighting_language.md` 与 `negative_constraints.md`

### 3.10 手工奇趣定格（Handcrafted Whimsy Stop Motion）

- 英文标签（English Label）：Handcrafted Whimsy Stop Motion
- 系统风格包 ID（Director Style ID）：`handcrafted_whimsy_stop_motion`
- 所属大类（Style Family）：定格动画（`stop_motion`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：手工材质纹理、微缩道具、拼贴感、可见手作痕迹、奇趣但不粗糙
- 核心表演特征（Performance Traits）：小幅但明确的动作节拍、稚拙可爱、怪趣幽默、角色行为有手作停顿感
- 核心镜头/节奏特征（Camera and Rhythm Traits）：节奏略顿、动作重拍点、镜头调度不过分花哨、重道具和空间呈现
- 适配题材（Suitable Topics）：怪趣家庭、微缩冒险、黑色童趣、发明小物件、 quirky 喜剧
- 风险题材（Risk Topics）：超高速写实战斗、宏大战争、极度流畅的商业动作戏
- 不推荐题材（Avoid Topics）：纯硬科幻机甲大战、沉重现实主义纪实、持续写实暴力
- 代表作品（Representative Works）：《了不起的狐狸爸爸》、《鬼妈妈》、《小鸡快跑》
- 风险提示/边界（Risk Notes）：不能只写“手工感”；必须让道具、质感、节拍共同支撑世界观
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`dark_tense`
- 可派生子风格（Variants）：乡野怪趣版、黑童话版、发明家家庭版
- 反向禁忌（Negative Constraints）：不要追求过于丝滑的写实运动；不要让材质细节输给空泛奇观
- 建包提示（Profile Build Notes）：优先补 `visual_language.md`、`rhythm_language.md`

### 3.11 热血分镜漫画动效（Heroic Motion Comic）

- 英文标签（English Label）：Heroic Motion Comic
- 系统风格包 ID（Director Style ID）：`heroic_motion_comic`
- 所属大类（Style Family）：动态漫画/分镜动画（`motion_comic`）
- 成熟度状态（Maturity）：`Phase 2`
- 核心视觉特征（Visual Traits）：分镜格感、强对比轮廓、局部动态增强、有限动作配合冲击构图
- 核心表演特征（Performance Traits）：姿态设计优先、停格瞬间承载英雄感、口号式推进、反应明确
- 核心镜头/节奏特征（Camera and Rhythm Traits）：靠卡点、推镜、特效字和层次位移建立爽感，动作并非全帧连续
- 适配题材（Suitable Topics）：英雄登场、能力觉醒、短时对决、宣言式高潮、低成本高情绪段落
- 风险题材（Risk Topics）：细腻生活流、写实纪实、长时间自然主义对白戏
- 不推荐题材（Avoid Topics）：极致真实武打、复杂群像推理、过长连续动作长镜头
- 代表作品（Representative Works）：漫威动态漫画（Motion Comic）系列、《爱，死亡和机器人》部分分镜动效篇章参考
- 风险提示/边界（Risk Notes）：容易变成廉价 PPT 动效；必须依赖分镜设计和节拍精度，而不是随便平移缩放
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`exaggerated_comedy`
- 可派生子风格（Variants）：超英宣言版、少年觉醒版、战斗播报版
- 反向禁忌（Negative Constraints）：不要伪装成完整逐帧动画；不要让镜头运动和画面重心打架
- 建包提示（Profile Build Notes）：优先补 `camera_language.md`、`rhythm_language.md`、`negative_constraints.md`

---

## 4. Exploration Pool 中等细度风格索引卡

> 说明：以下条目保持统一字段结构，但内容深度有意比 `Phase 2` 更克制，避免把未验证方向写成已成熟风格包。

### 4.1 黑色奇谭 3D（Dark Fable 3D）

- 英文标签（English Label）：Dark Fable 3D
- 系统风格包 ID（Director Style ID）：`dark_fable_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：童话化轮廓、黑森林或异境空间、冷暖反差强、危险中带美感
- 核心表演特征（Performance Traits）：恐惧、诱惑、好奇、禁忌触碰、脆弱角色的勇气建立
- 核心镜头/节奏特征（Camera and Rhythm Traits）：慢推进、窥视感、突发惊悚点与静默交替
- 适配题材（Suitable Topics）：黑童话、禁忌冒险、诅咒、异境试炼
- 代表作品（Representative Works）：《鬼妈妈》、《匹诺曹》暗黑段落、《潘神的迷宫》氛围参考
- 风险提示/边界（Risk Notes）：需要区分于纯恐怖片，重点是“奇谭”而非血腥惊吓
- 推荐演绎力度（Recommended Performance Styles）：`dark_tense`、`poetic_lyrical`
- 可派生子风格（Variants）：哥特童话版、森林诅咒版
- 反向禁忌（Negative Constraints）：不要写成单纯儿童可爱冒险或纯写实 horror
- 建包提示（Profile Build Notes）：若进入建包，先补 `lighting_language.md`

### 4.2 复古玩具箱 3D（Retro Toybox 3D）

- 英文标签（English Label）：Retro Toybox 3D
- 系统风格包 ID（Director Style ID）：`retro_toybox_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：复古塑料和木质玩具感、鲜艳但偏旧时代配色、可收藏品质感
- 核心表演特征（Performance Traits）：玩具人格化、童趣冒险、群像协作、轻微闹剧
- 核心镜头/节奏特征（Camera and Rhythm Traits）：箱庭空间调度、玩具尺寸对比、轻快节奏
- 适配题材（Suitable Topics）：玩具世界、收藏柜冒险、童年回忆、轻动作喜剧
- 代表作品（Representative Works）：《玩具总动员》早期玩具感参考、《乐高大电影》玩具秩序感参考
- 风险提示/边界（Risk Notes）：要避免和 `pixar_like` 的温暖家庭向完全重叠
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`
- 可派生子风格（Variants）：锡兵怀旧版、盒中冒险版
- 反向禁忌（Negative Constraints）：不要直接复刻知名玩具 IP 视觉
- 建包提示（Profile Build Notes）：若进入建包，优先明确材质与尺寸叙事

### 4.3 少女梦幻叙事动画（Dreamy Shoujo Narrative 2D）

- 英文标签（English Label）：Dreamy Shoujo Narrative 2D
- 系统风格包 ID（Director Style ID）：`dreamy_shoujo_2d`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：柔焦、花卉或星光意象、轻盈色层、人物情绪被画面意象化
- 核心表演特征（Performance Traits）：心动、犹豫、误解、情绪细波动、凝视与幻想转换
- 核心镜头/节奏特征（Camera and Rhythm Traits）：柔性特写、情绪蒙太奇、轻飘过渡
- 适配题材（Suitable Topics）：青春情感、少女成长、关系误会、梦境化日常
- 代表作品（Representative Works）：少女漫画改编动画、细腻青春电影感参考
- 风险提示/边界（Risk Notes）：容易空泛甜美；需要有具体情绪推进
- 推荐演绎力度（Recommended Performance Styles）：`poetic_lyrical`
- 可派生子风格（Variants）：校园心动版、梦境幻想版
- 反向禁忌（Negative Constraints）：不要写成幼儿向可爱贴纸风
- 建包提示（Profile Build Notes）：若建包，先补 `performance_language.md`

### 4.4 狂想夸张喜剧动画（Wild Exaggerated Comedy 2D）

- 英文标签（English Label）：Wild Exaggerated Comedy 2D
- 系统风格包 ID（Director Style ID）：`wild_comedy_2d`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：超弹性形变、极端表情、颜色冲击、图形化夸张
- 核心表演特征（Performance Traits）：闹腾、崩坏、反差、节拍极快、角色反应先于逻辑
- 核心镜头/节奏特征（Camera and Rhythm Traits）：快切、夸张冲击帧、拉伸和挤压的视觉节奏
- 适配题材（Suitable Topics）：闹剧、追逐、误会连锁、角色翻车
- 代表作品（Representative Works）：经典夸张电视动画和现代 meme 化 2D 喜剧参考
- 风险提示/边界（Risk Notes）：要防止只有噪音没有笑点结构
- 推荐演绎力度（Recommended Performance Styles）：`exaggerated_comedy`
- 可派生子风格（Variants）：追逐崩坏版、嘴炮闹剧版
- 反向禁忌（Negative Constraints）：不要套入严肃纪实对白节奏
- 建包提示（Profile Build Notes）：若建包，先补 `rhythm_language.md`

### 4.5 水墨抒情动画（Ink Poetic 2D）

- 英文标签（English Label）：Ink Poetic 2D
- 系统风格包 ID（Director Style ID）：`ink_poetic_2d`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：水墨留白、晕染层次、山水或雾气意象、黑白灰与少量点色
- 核心表演特征（Performance Traits）：含蓄、凝神、意在言外、情绪通过身姿和空间回响体现
- 核心镜头/节奏特征（Camera and Rhythm Traits）：慢节奏、停顿、卷轴式展开、场景意象转场
- 适配题材（Suitable Topics）：山水抒情、古典诗意、离别、修行、东方寓言
- 代表作品（Representative Works）：水墨动画传统语汇与东方诗意电影感参考
- 风险提示/边界（Risk Notes）：高风险在于形式化空转，必须保证叙事可读
- 推荐演绎力度（Recommended Performance Styles）：`poetic_lyrical`
- 可派生子风格（Variants）：山水长卷版、武侠抒情版
- 反向禁忌（Negative Constraints）：不要把水墨仅当滤镜覆盖
- 建包提示（Profile Build Notes）：若建包，先补 `visual_language.md`

### 4.6 港式江湖类型片感（Hong Kong Underworld Cinematic）

- 英文标签（English Label）：Hong Kong Underworld Cinematic
- 系统风格包 ID（Director Style ID）：`hk_underworld_cinematic`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：霓虹旧街、狭窄空间、都市湿热、夜色与烟雾
- 核心表演特征（Performance Traits）：兄弟义气、隐忍、嘴硬心软、危险关系
- 核心镜头/节奏特征（Camera and Rhythm Traits）：城市空间穿梭、对峙剪辑、压迫又流动
- 适配题材（Suitable Topics）：兄弟反目、卧底、黑帮交易、命运滑坡
- 代表作品（Representative Works）：港式犯罪类型片语汇参考
- 风险提示/边界（Risk Notes）：容易和 `noir_detective` 混同，需强调江湖义气和都市帮派关系
- 推荐演绎力度（Recommended Performance Styles）：`dark_tense`、`cinematic_serious`
- 可派生子风格（Variants）：卧底版、码头火拼版
- 反向禁忌（Negative Constraints）：不要写成纯侦探推理
- 建包提示（Profile Build Notes）：若建包，先定义和 `noir_detective` 的边界

### 4.7 社会现实压迫电影感（Social Realist Tension Cinematic）

- 英文标签（English Label）：Social Realist Tension Cinematic
- 系统风格包 ID（Director Style ID）：`social_realist_tension`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：朴素空间、冷硬生活质地、现实环境压力、少修饰摄影
- 核心表演特征（Performance Traits）：压抑、局促、忍耐、爆发前积累
- 核心镜头/节奏特征（Camera and Rhythm Traits）：观察性镜头、局部手持感、慢热推进
- 适配题材（Suitable Topics）：社会困境、家庭压力、边缘人生、现实冲突
- 代表作品（Representative Works）：现实主义社会题材电影参考
- 风险提示/边界（Risk Notes）：不适合被娱乐化处理；要区别于纯 noir 和纯文艺
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_serious`、`dark_tense`
- 可派生子风格（Variants）：家庭困局版、职场压迫版
- 反向禁忌（Negative Constraints）：不要用过度风格化奇观镜头破坏现实感
- 建包提示（Profile Build Notes）：若建包，先补 `performance_language.md`

### 4.8 温暖治愈生活电影感（Warm Humanist Cinematic）

- 英文标签（English Label）：Warm Humanist Cinematic
- 系统风格包 ID（Director Style ID）：`warm_humanist_cinematic`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：自然暖光、生活细节、真实空间中的柔软秩序
- 核心表演特征（Performance Traits）：体谅、陪伴、笨拙善意、日常幽默
- 核心镜头/节奏特征（Camera and Rhythm Traits）：静观、轻推移、人物与空间共同叙事
- 适配题材（Suitable Topics）：家庭关系、普通人小愿望、城市治愈、代际和解
- 代表作品（Representative Works）：温暖人文电影参考
- 风险提示/边界（Risk Notes）：容易过于平淡，需要微妙冲突和人物选择
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`poetic_lyrical`
- 可派生子风格（Variants）：家庭日常版、城市小人物版
- 反向禁忌（Negative Constraints）：不要写成鸡汤短视频
- 建包提示（Profile Build Notes）：若建包，优先补 `rhythm_language.md`

### 4.9 哥特童话定格（Gothic Fairy-Tale Stop Motion）

- 英文标签（English Label）：Gothic Fairy-Tale Stop Motion
- 系统风格包 ID（Director Style ID）：`gothic_fairy_stop_motion`
- 所属大类（Style Family）：定格动画（`stop_motion`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：哥特装饰、暗色手工材质、异形道具、童话危险感
- 核心表演特征（Performance Traits）：诡异可爱、惧怕与好奇并存、黑色幽默
- 核心镜头/节奏特征（Camera and Rhythm Traits）：缓慢窥视、阴影推进、道具戏强
- 适配题材（Suitable Topics）：暗黑童话、诅咒婚礼、奇异家族、怪诞成长
- 代表作品（Representative Works）：哥特定格电影参考
- 风险提示/边界（Risk Notes）：不要只做装饰黑暗，要有童话机制
- 推荐演绎力度（Recommended Performance Styles）：`dark_tense`
- 可派生子风格（Variants）：婚礼诅咒版、城堡怪谈版
- 反向禁忌（Negative Constraints）：不要写成纯血腥恐怖
- 建包提示（Profile Build Notes）：若建包，先补 `lighting_language.md`

### 4.10 复古机械定格（Retro Mechanical Stop Motion）

- 英文标签（English Label）：Retro Mechanical Stop Motion
- 系统风格包 ID（Director Style ID）：`retro_mechanical_stop_motion`
- 所属大类（Style Family）：定格动画（`stop_motion`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：齿轮、黄铜、机械拼装、复古工业质感
- 核心表演特征（Performance Traits）：笨拙执着、发明家气质、机械秩序中的情感
- 核心镜头/节奏特征（Camera and Rhythm Traits）：装置展示、机械运转节拍、空间剖面感
- 适配题材（Suitable Topics）：发明冒险、蒸汽机械、微缩工业世界
- 代表作品（Representative Works）：机械美术导向的定格与蒸汽朋克参考
- 风险提示/边界（Risk Notes）：如果没有人物情感，会变成纯美术陈列
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`poetic_lyrical`
- 可派生子风格（Variants）：蒸汽实验室版、机械旅行版
- 反向禁忌（Negative Constraints）：不要写成纯 CGI 机甲爽片
- 建包提示（Profile Build Notes）：若建包，先补 `visual_language.md`

### 4.11 悬疑黑白动态漫画（Suspense Monochrome Motion Comic）

- 英文标签（English Label）：Suspense Monochrome Motion Comic
- 系统风格包 ID（Director Style ID）：`suspense_monochrome_motion_comic`
- 所属大类（Style Family）：动态漫画/分镜动画（`motion_comic`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：黑白高反差、局部点色、阴影块面、信息遮挡
- 核心表演特征（Performance Traits）：凝视、怀疑、追问、惊觉
- 核心镜头/节奏特征（Camera and Rhythm Traits）：卡点揭示、局部放大、分镜格切换
- 适配题材（Suitable Topics）：悬疑、调查、谜团、惊悚短篇
- 代表作品（Representative Works）：黑白图像小说与悬疑 motion comic 参考
- 风险提示/边界（Risk Notes）：容易变成廉价恐怖剪辑，需强化信息控制
- 推荐演绎力度（Recommended Performance Styles）：`dark_tense`
- 可派生子风格（Variants）：侦查笔记版、夜城追踪版
- 反向禁忌（Negative Constraints）：不要加入高饱和彩色热闹元素
- 建包提示（Profile Build Notes）：若建包，先补 `negative_constraints.md`

### 4.12 社媒快节奏动效漫画（Social Fast-Cut Motion Comic）

- 英文标签（English Label）：Social Fast-Cut Motion Comic
- 系统风格包 ID（Director Style ID）：`social_fastcut_motion_comic`
- 所属大类（Style Family）：动态漫画/分镜动画（`motion_comic`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：高密度信息卡片、图文混排、快切、移动端友好构图
- 核心表演特征（Performance Traits）：直给、态度化、反应快、信息表达优先
- 核心镜头/节奏特征（Camera and Rhythm Traits）：短促切换、字幕强化、单点 punchline
- 适配题材（Suitable Topics）：热点解构、情绪吐槽、快速传播型内容
- 代表作品（Representative Works）：社媒原生图文动效内容参考
- 风险提示/边界（Risk Notes）：天然偏传播而非沉浸叙事，不宜误用到长情节
- 推荐演绎力度（Recommended Performance Styles）：`exaggerated_comedy`
- 可派生子风格（Variants）：热点拆解版、吐槽评论版
- 反向禁忌（Negative Constraints）：不要假装成电影化沉浸长片
- 建包提示（Profile Build Notes）：若建包，先补 `rhythm_language.md`

### 4.13 2D角色+3D场景混合（2D Character with 3D World Hybrid）

- 英文标签（English Label）：2D Character with 3D World Hybrid
- 系统风格包 ID（Director Style ID）：`two_d_character_three_d_world`
- 所属大类（Style Family）：混合形态（`hybrid`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：2D 人物轮廓与 3D 空间纵深并置、层次反差明显
- 核心表演特征（Performance Traits）：角色表演更图形化，环境反馈更电影化
- 核心镜头/节奏特征（Camera and Rhythm Traits）：需要解决镜头运动与 2D 角色一致性
- 适配题材（Suitable Topics）：奇幻冒险、跨维度世界、风格反差叙事
- 代表作品（Representative Works）：二维角色与三维空间混搭作品参考
- 风险提示/边界（Risk Notes）：高风险在于角色和场景脱节
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`poetic_lyrical`
- 可派生子风格（Variants）：童话冒险版、都市穿越版
- 反向禁忌（Negative Constraints）：不要让 2D 角色像贴纸悬浮
- 建包提示（Profile Build Notes）：若建包，需先有稳定的混合一致性规则

### 4.14 真人表演+动画强化混合（Live Action with Animation Enhancement）

- 英文标签（English Label）：Live Action with Animation Enhancement
- 系统风格包 ID（Director Style ID）：`live_action_animation_hybrid`
- 所属大类（Style Family）：混合形态（`hybrid`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：真人基底上叠加图形化强化、特效批注、情绪可视化
- 核心表演特征（Performance Traits）：真人自然表演为主，动画强化用于主观感受放大
- 核心镜头/节奏特征（Camera and Rhythm Traits）：真人节奏与动画强化节点同步
- 适配题材（Suitable Topics）：都市奇想、主观情绪、轻实验短片、人物心理可视化
- 代表作品（Representative Works）：真人与动画混合叙事作品参考
- 风险提示/边界（Risk Notes）：如果动画强化没有规则，容易显得廉价或杂乱
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`poetic_lyrical`
- 可派生子风格（Variants）：情绪标注版、幻想入侵版
- 反向禁忌（Negative Constraints）：不要把所有信息都依赖特效字幕表达
- 建包提示（Profile Build Notes）：若建包，需先定义强化层触发条件

### 4.15 纪录感+漫画批注混合（Docu Comic Hybrid）

- 英文标签（English Label）：Docu Comic Hybrid
- 系统风格包 ID（Director Style ID）：`docu_comic_hybrid`
- 所属大类（Style Family）：混合形态（`hybrid`）
- 成熟度状态（Maturity）：`Exploration Pool`
- 核心视觉特征（Visual Traits）：纪实画面基底、漫画标注层、信息图式批注、现实与观点叠加
- 核心表演特征（Performance Traits）：观察、解释、吐槽、纪录者视角介入
- 核心镜头/节奏特征（Camera and Rhythm Traits）：纪实段落与批注段落交替，节奏依赖信息组织
- 适配题材（Suitable Topics）：社会观察、知识拆解、纪实短片、现场解构
- 代表作品（Representative Works）：纪录表达与漫画批注混合内容参考
- 风险提示/边界（Risk Notes）：要避免变成 PPT 旁白视频
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_serious`、`exaggerated_comedy`
- 可派生子风格（Variants）：现场讲解版、冷幽默旁批版
- 反向禁忌（Negative Constraints）：不要用纯讲稿替代镜头组织
- 建包提示（Profile Build Notes）：若建包，优先定义信息层级与批注风格

---

## 5. 跨风格优先级建议

### 5.1 建议优先进入下一轮落地准备的 8 个风格包

1. `coming_of_age_3d`
2. `realist_cinematic_3d`
3. `mythic_epic_3d`
4. `anime_cinematic`
5. `classic_studio_wuxia`
6. `neo_wuxia_cinematic`
7. `noir_detective`
8. `heroic_motion_comic`

理由：

- 能覆盖更多 `style_family`
- 与当前 SceneForge 主链的“设计、分镜、视频提示词”复用性高
- 与已落地的四个 `Phase 1` 风格差异足够明显

### 5.2 建议作为第二优先层的 3 个 `Phase 2` 风格包

1. `poetic_2d_fantasy`
2. `urban_graphic_2d`
3. `handcrafted_whimsy_stop_motion`

理由：

- 风格辨识度高，但跨媒介适配与共享资产抽象要求更高

### 5.3 建议继续保留观察的 Exploration Pool 方向

- 全部 `Exploration Pool` 条目暂不建议直接建包
- 若要提前拉起，应优先考虑：
  - `dark_fable_3d`
  - `warm_humanist_cinematic`
  - `two_d_character_three_d_world`

---

## 6. 当前结论

SceneForge 当前未落地的 26 个风格包，已经可以分为两种不同工作方式：

1. `Phase 2`：可以开始按高完整度索引卡准备 `style_profiles/` 建包。
2. `Exploration Pool`：先保留为受控候选池，等待测试需求、题材牵引和跨媒介策略更清晰后再升级。

下一步不建议“一口气建完全部风格包”，而应先按优先级做 2 到 3 批，逐步验证差异度、复用度和主链适配成本。
