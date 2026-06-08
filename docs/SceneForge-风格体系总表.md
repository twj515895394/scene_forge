# SceneForge 风格体系总表

## 1. 文档定位

本文档是 SceneForge 多风格能力的母文档（Master Style Catalog）。

用途只有四个：

1. 固定 SceneForge 的风格分层模型。
2. 统一收录当前已想到的风格候选树。
3. 为后续新增 `style_profiles/`、`scene-style-selector` 和各主链 Skill 适配提供索引。
4. 作为持续补充的总表，避免未来把“题材、媒介、品牌感、演法”混写成一锅。

本文档当前不直接改动既有主链协议，只定义风格体系边界与候选池。

---

## 2. 已确认的三层模型

SceneForge 的风格主结构固定为：

```text
style_family（风格大类）
-> director_style_id（具体风格包）
-> performance_style（演绎力度）
```

### 2.1 第一层：风格大类（Style Family）

这是媒介语言与制作语言层，不是题材层。

固定为六类：

1. 3D动画（`3d_animation`）
2. 2D动画（`2d_animation`）
3. 真人电影感（`live_action_cinematic`）
4. 定格动画（`stop_motion`）
5. 动态漫画/分镜动画（`motion_comic`）
6. 混合形态（`hybrid`）

### 2.2 第二层：具体风格包（Director Style ID）

这是可被系统读取、可被多个 Skill 复用的中粒度风格包。

原则：

- 只收“可稳定复用”的中粒度风格包。
- 更细的变化先记录为子变体（Variant），不单独升为一级风格包。
- 讨论层允许使用便于理解的参考标签，但系统层尽量使用中性 ID。

### 2.3 第三层：演绎力度（Performance Style）

这是跨风格通用的演绎层，不和具体风格包绑死。

第一版固定六类：

1. 电影写实（`cinematic_serious`）
2. 电影轻喜（`cinematic_comedy`）
3. 夸张喜剧（`exaggerated_comedy`）
4. 热血燃向（`heroic_intense`）
5. 诗意抒情（`poetic_lyrical`）
6. 黑暗压迫（`dark_tense`）

---

## 3. 题材与风格的关系

题材（Genre / Topic）不是风格树的一层。

题材只作为风格包的附着标签使用，例如：

- 适配题材（`suitable_topics`）
- 谨慎题材（`risk_topics`）
- 不推荐题材（`avoid_topics`）

示例：

- 武侠题材不等于武侠风格。
- 同样是武侠，可以挂到“经典棚拍武侠电影感（`classic_studio_wuxia`）”，也可以挂到“东方奇幻 3D（`stylized_chinese_3d`）”。
- 同样是校园题材，可以挂到“日式热血动画电影感（`anime_cinematic`）”，也可以挂到“青春成长 3D（`coming_of_age_3d`）”。

---

## 4. 命名规范

每个风格候选统一采用“双命名”：

- 中文讨论名（Chinese Discussion Name）
- 英文标签（English Label）
- 系统风格包 ID（Director Style ID）

示例：

- 经典棚拍武侠电影感（Classic Studio Wuxia Feel）
- `director_style_id: classic_studio_wuxia`

说明：

- 中文名服务讨论与阅读理解。
- 英文标签服务文档可读性与跨语言对齐。
- 系统 ID 服务协议、配置和后续落地。
- 系统 ID 默认尽量避免直接绑定具体品牌或公司名。

---

## 5. 成熟度分层

总表中的每个风格包都必须标注成熟度：

- 第一阶段优先落地（`Phase 1`）
- 第二阶段扩展（`Phase 2`）
- 风格探索池（`Exploration Pool`）

解释：

- `Phase 1`：近期真要接入 SceneForge 主链的候选。
- `Phase 2`：结构成立，但先不优先实现。
- `Exploration Pool`：先收录，后续再判断是否值得变成正式风格包。

---

## 6. 第一版总树（Style Tree v1）

```text
风格体系（Style System）
├── 3D动画（3d_animation）
│   ├── 高品质角色驱动动画电影感（Premium Character-Driven 3D Animation）-> pixar_like -> Phase 1
│   ├── 外放喜剧冲突 3D（Outward Comedic 3D）-> dreamworks_like -> Phase 1
│   ├── 东方奇幻风格化 3D（Stylized Chinese Fantasy 3D）-> stylized_chinese_3d -> Phase 1
│   ├── 漫画动作 3D（Comic Action 3D）-> comic_action_3d -> Phase 1
│   ├── 青春成长 3D（Coming-of-Age 3D）-> coming_of_age_3d -> Phase 2
│   ├── 写实质感 3D 电影化（Realist Cinematic 3D）-> realist_cinematic_3d -> Phase 2
│   ├── 神话史诗 3D（Mythic Epic 3D）-> mythic_epic_3d -> Phase 2
│   ├── 黑色奇谭 3D（Dark Fable 3D）-> dark_fable_3d -> Exploration Pool
│   └── 复古玩具箱 3D（Retro Toybox 3D）-> retro_toybox_3d -> Exploration Pool
├── 2D动画（2d_animation）
│   ├── 日式热血动画电影感（Anime Cinematic）-> anime_cinematic -> Phase 2
│   ├── 诗意幻想手绘动画（Poetic Hand-Drawn Fantasy）-> poetic_2d_fantasy -> Phase 2
│   ├── 都市潮流平面动画（Urban Graphic 2D）-> urban_graphic_2d -> Phase 2
│   ├── 少女梦幻叙事动画（Dreamy Shoujo Narrative 2D）-> dreamy_shoujo_2d -> Exploration Pool
│   ├── 狂想夸张喜剧动画（Wild Exaggerated Comedy 2D）-> wild_comedy_2d -> Exploration Pool
│   └── 水墨抒情动画（Ink Poetic 2D）-> ink_poetic_2d -> Exploration Pool
├── 真人电影感（live_action_cinematic）
│   ├── 经典棚拍武侠电影感（Classic Studio Wuxia Feel）-> classic_studio_wuxia -> Phase 2
│   ├── 东方新武侠电影感（Neo Wuxia Cinematic）-> neo_wuxia_cinematic -> Phase 2
│   ├── 黑色侦探电影感（Noir Detective Cinematic）-> noir_detective -> Phase 2
│   ├── 港式江湖类型片感（Hong Kong Underworld Cinematic）-> hk_underworld_cinematic -> Exploration Pool
│   ├── 社会现实压迫电影感（Social Realist Tension Cinematic）-> social_realist_tension -> Exploration Pool
│   └── 温暖治愈生活电影感（Warm Humanist Cinematic）-> warm_humanist_cinematic -> Exploration Pool
├── 定格动画（stop_motion）
│   ├── 手工奇趣定格（Handcrafted Whimsy Stop Motion）-> handcrafted_whimsy_stop_motion -> Phase 2
│   ├── 哥特童话定格（Gothic Fairy-Tale Stop Motion）-> gothic_fairy_stop_motion -> Exploration Pool
│   └── 复古机械定格（Retro Mechanical Stop Motion）-> retro_mechanical_stop_motion -> Exploration Pool
├── 动态漫画/分镜动画（motion_comic）
│   ├── 热血分镜漫画动效（Heroic Motion Comic）-> heroic_motion_comic -> Phase 2
│   ├── 悬疑黑白动态漫画（Suspense Monochrome Motion Comic）-> suspense_monochrome_motion_comic -> Exploration Pool
│   └── 社媒快节奏动效漫画（Social Fast-Cut Motion Comic）-> social_fastcut_motion_comic -> Exploration Pool
└── 混合形态（hybrid）
    ├── 2D角色+3D场景混合（2D Character with 3D World Hybrid）-> two_d_character_three_d_world -> Exploration Pool
    ├── 真人表演+动画强化混合（Live Action with Animation Enhancement）-> live_action_animation_hybrid -> Exploration Pool
    └── 纪录感+漫画批注混合（Docu Comic Hybrid）-> docu_comic_hybrid -> Exploration Pool
```

---

## 7. 通用演绎力度枚举（Performance Style Catalog）

### 7.1 电影写实（`cinematic_serious`）

- 关键词：克制、真实、压迫、因果感、镜头可信度
- 常见搭配：
  - 写实质感 3D（`realist_cinematic_3d`）
  - 黑色侦探电影感（`noir_detective`）
  - 东方新武侠电影感（`neo_wuxia_cinematic`）

### 7.2 电影轻喜（`cinematic_comedy`）

- 关键词：轻盈、角色反应、节奏弹性、温暖、可亲
- 常见搭配：
  - 高品质角色驱动动画电影感（`pixar_like`）
  - 青春成长 3D（`coming_of_age_3d`）
  - 温暖治愈生活电影感（`warm_humanist_cinematic`）

### 7.3 夸张喜剧（`exaggerated_comedy`）

- 关键词：反差、强反应、表情夸张、物理喜剧、爆点推进
- 常见搭配：
  - 外放喜剧冲突 3D（`dreamworks_like`）
  - 漫画动作 3D（`comic_action_3d`）
  - 狂想夸张喜剧动画（`wild_comedy_2d`）

### 7.4 热血燃向（`heroic_intense`）

- 关键词：推进力、对抗、爆发、英雄时刻、节奏上扬
- 常见搭配：
  - 日式热血动画电影感（`anime_cinematic`）
  - 神话史诗 3D（`mythic_epic_3d`）
  - 热血分镜漫画动效（`heroic_motion_comic`）

### 7.5 诗意抒情（`poetic_lyrical`）

- 关键词：留白、氛围、意象、慢节奏、感受优先
- 常见搭配：
  - 诗意幻想手绘动画（`poetic_2d_fantasy`）
  - 水墨抒情动画（`ink_poetic_2d`）
  - 温暖治愈生活电影感（`warm_humanist_cinematic`）

### 7.6 黑暗压迫（`dark_tense`）

- 关键词：悬疑、压迫、危险、冷感、阴影层次
- 常见搭配：
  - 黑色侦探电影感（`noir_detective`）
  - 黑色奇谭 3D（`dark_fable_3d`）
  - 哥特童话定格（`gothic_fairy_stop_motion`）

---

## 8. 第一阶段优先风格包（Phase 1）

> 说明：第一阶段先只重点做 `3d_animation` 家族，验证风格包机制本身，不同时处理跨媒介切换。

### 8.1 高品质角色驱动动画电影感（Premium Character-Driven 3D Animation）

- 英文标签（English Label）：Pixar-like Feel
- 系统风格包 ID（Director Style ID）：`pixar_like`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 1`
- 核心视觉特征（Visual Traits）：圆润体块、亲和比例、温暖灯光、电影级材质、表情可读性高
- 核心表演特征（Performance Traits）：微表情丰富、角色驱动、停顿有效、情绪递进清晰
- 核心镜头/节奏特征（Camera and Rhythm Traits）：镜头服务情绪与角色关系、节奏平滑、重视呼吸位
- 适配题材（Suitable Topics）：家庭喜剧、经典桥段改编、都市轻喜、成长故事、暖心反差
- 代表作品（Representative Works）：《玩具总动员》系列、《头脑特工队》、《寻梦环游记》
- 风险提示/边界（Risk Notes）：对外表达避免直接品牌复刻；不要写成具体影片复制
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`poetic_lyrical`
- 可派生子风格（Variants）：节日温暖版、冒险喜剧版、情绪抒情版

### 8.2 外放喜剧冲突 3D（Outward Comedic 3D）

- 英文标签（English Label）：DreamWorks-like Feel
- 系统风格包 ID（Director Style ID）：`dreamworks_like`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 1`
- 核心视觉特征（Visual Traits）：轮廓更利落、角色态度更强、表情更大开大合、颜色更跳
- 核心表演特征（Performance Traits）：嘴炮感、强反应、冲突推进、喜剧时机更外放
- 核心镜头/节奏特征（Camera and Rhythm Traits）：剪辑更快、反应镜头更密、爆点更明显
- 适配题材（Suitable Topics）：嘴仗喜剧、群像冲突、反差段子、强对抗短片
- 代表作品（Representative Works）：《怪物史瑞克》、《马达加斯加》、《功夫熊猫》
- 风险提示/边界（Risk Notes）：容易过度油滑或喧闹；要防止只剩表情包没有故事
- 推荐演绎力度（Recommended Performance Styles）：`cinematic_comedy`、`exaggerated_comedy`
- 可派生子风格（Variants）：嘴贱搭档版、反派喜剧版、动作闹剧版

### 8.3 东方奇幻风格化 3D（Stylized Chinese Fantasy 3D）

- 英文标签（English Label）：Stylized Chinese Fantasy 3D
- 系统风格包 ID（Director Style ID）：`stylized_chinese_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 1`
- 核心视觉特征（Visual Traits）：东方造型语汇、层次化服装、意象化光色、云雾与器物设计感强
- 核心表演特征（Performance Traits）：仪式感、身段感、含蓄与爆发并存、气势建立重要
- 核心镜头/节奏特征（Camera and Rhythm Traits）：重空间纵深、重亮相、重英雄姿态、重意象转场
- 适配题材（Suitable Topics）：神话、武侠、志怪、古装传奇、东方奇幻
- 代表作品（Representative Works）：《长安三万里》、《白蛇：缘起》、《深海》
- 风险提示/边界（Risk Notes）：容易滑向泛古风贴皮；需要明确世界观与视觉锚点
- 推荐演绎力度（Recommended Performance Styles）：`heroic_intense`、`poetic_lyrical`
- 可派生子风格（Variants）：神话史诗版、志怪奇谭版、少年热血版

### 8.4 漫画动作 3D（Comic Action 3D）

- 英文标签（English Label）：Comic Action 3D
- 系统风格包 ID（Director Style ID）：`comic_action_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 成熟度状态（Maturity）：`Phase 1`
- 核心视觉特征（Visual Traits）：更强图形感、动作轨迹清晰、视觉冲击重于细腻写实
- 核心表演特征（Performance Traits）：动作预备与发力清楚、反应夸张、姿态设计先行
- 核心镜头/节奏特征（Camera and Rhythm Traits）：更强调速度、切点、冲击帧和 Hero Moment
- 适配题材（Suitable Topics）：追逐、对决、运动、闯关、爽感桥段
- 代表作品（Representative Works）：《蜘蛛侠：平行宇宙》、《忍者神龟：变种大乱斗》、《无敌破坏王》
- 风险提示/边界（Risk Notes）：容易牺牲角色细腻度；要防止全程只有打点没有情绪
- 推荐演绎力度（Recommended Performance Styles）：`exaggerated_comedy`、`heroic_intense`
- 可派生子风格（Variants）：运动竞技版、超级英雄版、街头追逐版

---

## 9. 第二阶段扩展风格包（Phase 2）

### 9.1 青春成长 3D（Coming-of-Age 3D）

- 英文标签（English Label）：Coming-of-Age 3D
- 系统风格包 ID（Director Style ID）：`coming_of_age_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 核心方向：更轻、更生活流、更注重少年感与关系细节
- 代表作品（Representative Works）：《青春变形记》、《心灵奇旅》、《夏日友晴天》

### 9.2 写实质感 3D 电影化（Realist Cinematic 3D）

- 英文标签（English Label）：Realist Cinematic 3D
- 系统风格包 ID（Director Style ID）：`realist_cinematic_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 核心方向：降低卡通感，提高真实光影、镜头可信度与压迫感
- 代表作品（Representative Works）：《阿凡达：最后的气宗》真人版氛围向参考、《爱，死亡和机器人》部分篇章、《最终幻想7：圣子降临》

### 9.3 神话史诗 3D（Mythic Epic 3D）

- 英文标签（English Label）：Mythic Epic 3D
- 系统风格包 ID（Director Style ID）：`mythic_epic_3d`
- 所属大类（Style Family）：3D动画（`3d_animation`）
- 核心方向：宏大空间、英雄亮相、史诗调度、神性仪式感
- 代表作品（Representative Works）：《哪吒之魔童降世》、《西游记之大圣归来》、《指环王》史诗调度感参考

### 9.4 日式热血动画电影感（Anime Cinematic）

- 英文标签（English Label）：Anime Cinematic
- 系统风格包 ID（Director Style ID）：`anime_cinematic`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 核心方向：静帧爆发、极端特写、速度线式推进、热血情绪放大
- 代表作品（Representative Works）：《鬼灭之刃》剧场版、《灌篮高手》电影版、《你的名字。》

### 9.5 诗意幻想手绘动画（Poetic Hand-Drawn Fantasy）

- 英文标签（English Label）：Poetic Hand-Drawn Fantasy
- 系统风格包 ID（Director Style ID）：`poetic_2d_fantasy`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 核心方向：抒情、幻想、自然气息、生活感与想象力并存
- 代表作品（Representative Works）：《千与千寻》、《龙猫》、《借东西的小人阿莉埃蒂》

### 9.6 都市潮流平面动画（Urban Graphic 2D）

- 英文标签（English Label）：Urban Graphic 2D
- 系统风格包 ID（Director Style ID）：`urban_graphic_2d`
- 所属大类（Style Family）：2D动画（`2d_animation`）
- 核心方向：平面构成、潮流配色、快节奏、社媒传播友好
- 代表作品（Representative Works）：《蜘蛛侠：平行宇宙》、《米切尔一家大战机器》、《爱，死亡和机器人》图形化篇章参考

### 9.7 经典棚拍武侠电影感（Classic Studio Wuxia Feel）

- 英文标签（English Label）：Classic Studio Wuxia Feel
- 系统风格包 ID（Director Style ID）：`classic_studio_wuxia`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 核心方向：棚拍仪式感、舞台化调度、定场亮相、类型片姿态
- 代表作品（Representative Works）：《独臂刀》、《大醉侠》、《金燕子》

### 9.8 东方新武侠电影感（Neo Wuxia Cinematic）

- 英文标签（English Label）：Neo Wuxia Cinematic
- 系统风格包 ID（Director Style ID）：`neo_wuxia_cinematic`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 核心方向：更流动的镜头、更强动作编排、更现代的情绪和空间设计
- 代表作品（Representative Works）：《卧虎藏龙》、《英雄》、《影》

### 9.9 黑色侦探电影感（Noir Detective Cinematic）

- 英文标签（English Label）：Noir Detective Cinematic
- 系统风格包 ID（Director Style ID）：`noir_detective`
- 所属大类（Style Family）：真人电影感（`live_action_cinematic`）
- 核心方向：阴影、悬疑、信息遮蔽、压迫空间、冷感节奏
- 代表作品（Representative Works）：《银翼杀手2049》、《七宗罪》、《唐人街》

### 9.10 手工奇趣定格（Handcrafted Whimsy Stop Motion）

- 英文标签（English Label）：Handcrafted Whimsy Stop Motion
- 系统风格包 ID（Director Style ID）：`handcrafted_whimsy_stop_motion`
- 所属大类（Style Family）：定格动画（`stop_motion`）
- 核心方向：手工材质、微缩世界、奇趣道具、节奏略顿但充满质感
- 代表作品（Representative Works）：《了不起的狐狸爸爸》、《鬼妈妈》、《小鸡快跑》

### 9.11 热血分镜漫画动效（Heroic Motion Comic）

- 英文标签（English Label）：Heroic Motion Comic
- 系统风格包 ID（Director Style ID）：`heroic_motion_comic`
- 所属大类（Style Family）：动态漫画/分镜动画（`motion_comic`）
- 核心方向：低成本高冲击、靠分镜设计和动效节奏建立爽感
- 代表作品（Representative Works）：《黑袍纠察队：恶魔》部分篇章参考、《爱，死亡和机器人》分镜动效篇章参考、漫威动态漫画（Motion Comic）系列

---

## 10. 风格探索池（Exploration Pool）

> 这些方向先保留索引，不承诺近期实现。

### 10.1 3D动画（`3d_animation`）

- 黑色奇谭 3D（Dark Fable 3D）-> `dark_fable_3d`
- 复古玩具箱 3D（Retro Toybox 3D）-> `retro_toybox_3d`

### 10.2 2D动画（`2d_animation`）

- 少女梦幻叙事动画（Dreamy Shoujo Narrative 2D）-> `dreamy_shoujo_2d`
- 狂想夸张喜剧动画（Wild Exaggerated Comedy 2D）-> `wild_comedy_2d`
- 水墨抒情动画（Ink Poetic 2D）-> `ink_poetic_2d`

### 10.3 真人电影感（`live_action_cinematic`）

- 港式江湖类型片感（Hong Kong Underworld Cinematic）-> `hk_underworld_cinematic`
- 社会现实压迫电影感（Social Realist Tension Cinematic）-> `social_realist_tension`
- 温暖治愈生活电影感（Warm Humanist Cinematic）-> `warm_humanist_cinematic`

### 10.4 定格动画（`stop_motion`）

- 哥特童话定格（Gothic Fairy-Tale Stop Motion）-> `gothic_fairy_stop_motion`
- 复古机械定格（Retro Mechanical Stop Motion）-> `retro_mechanical_stop_motion`

### 10.5 动态漫画/分镜动画（`motion_comic`）

- 悬疑黑白动态漫画（Suspense Monochrome Motion Comic）-> `suspense_monochrome_motion_comic`
- 社媒快节奏动效漫画（Social Fast-Cut Motion Comic）-> `social_fastcut_motion_comic`

### 10.6 混合形态（`hybrid`）

- 2D角色+3D场景混合（2D Character with 3D World Hybrid）-> `two_d_character_three_d_world`
- 真人表演+动画强化混合（Live Action with Animation Enhancement）-> `live_action_animation_hybrid`
- 纪录感+漫画批注混合（Docu Comic Hybrid）-> `docu_comic_hybrid`

---

## 11. 每个风格包的最小索引卡模板

后续新增任何 `director_style_id`，至少要补齐以下字段：

1. 中文讨论名（Chinese Discussion Name）
2. 英文标签（English Label）
3. 系统风格包 ID（Director Style ID）
4. 所属大类（Style Family）
5. 成熟度状态（Maturity）
6. 核心视觉特征（Visual Traits）
7. 核心表演特征（Performance Traits）
8. 核心镜头/节奏特征（Camera and Rhythm Traits）
9. 适配题材（Suitable Topics）
10. 风险提示/边界（Risk Notes）

建议补充：

- 推荐演绎力度（Recommended Performance Styles）
- 可派生子风格（Variants）
- 反向禁忌（Negative Constraints）

---

## 12. 后续落地建议

第一阶段建议只做三件事：

1. 先把 `PROJECT_BOARD.md` 的风格字段补成：
   - `director_style_id`
   - `director_style_version`
   - `style_family`
   - `style_profile_path`
   - `performance_style`
2. 先为 `Phase 1` 的四个 3D 风格包建立 `style_profiles/`
3. 优先适配三个主链 Skill：
   - `scene-design-builder`
   - `scene-storyboard-director`
   - `scene-video-prompt-builder`

暂不建议当前就做：

- 全部风格包同时接入
- 跨全部媒介大类一起实现
- 为每个风格单独复制一套 Skill

---

## 13. 本文档的维护规则

后续补充必须遵守：

1. 新风格先判断它属于哪个 `style_family`，不允许游离在树外。
2. 新风格先判断是否只是某个现有风格包的 Variant。
3. 新风格必须标注 `Phase 1 / Phase 2 / Exploration Pool`。
4. 题材词只能进入 `Suitable Topics / Risk Topics / Avoid Topics`，不能直接升成一级风格层。
5. 讨论名可以参考常见影视印象，但系统 ID 尽量保持中性、稳定、可扩展。

---

## 14. 当前结论

SceneForge 第一版多风格体系，不应该按“武侠、校园、科幻”这类题材来切，也不应该按“吉卜力、邵氏、皮克斯”这类品牌感直接做一级分类。

更稳的结构是：

```text
先按风格大类（style_family）分桶
再按具体风格包（director_style_id）建可复用配置
最后用演绎力度（performance_style）控制项目这次怎么演
题材只作为适配标签附着
```

这份总表就是后续所有风格补充、风格删改、风格协议落地的母索引。
