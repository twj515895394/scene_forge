# 《华强买瓜》3D 动画电影版 - 故事板设计图提示词包 (v1.0)

本提示词包继承自角色设定锁定卡 (v1.0)、场景设定锁定卡 (v1.0) 与分镜镜头表 (v1.0)。本包产出用于生成 **12 个关键分镜故事板设计图 (Storyboard Keyframes)** 的高度优化提示词（含中文主描述与英文出图适配器），确保在 **高品质 3D 动画电影 (Pixar-like 风格)** 的视觉轨道上保持极致的色调、光影、角色形象与喜剧构图一致性。

---

## 一、 顶层视觉控制参数 (Universal Style Anchors)

为保证 12 个镜头出图风格不发生漂移，所有英文提示词必须统一嵌入以下**高品质动画电影视觉锚点**：

```text
Style Anchor: 
3D animated movie keyframe, high-quality 3D digital animation style, soft warm cinematic lighting, ray tracing, octane render, vivid colors, detailed textures, clay-like smooth skin shader, micro-expressions, rich tactile materials (leather jacket, cotton vest, wooden crates, metal scales), highly expressive characters, 16:9 aspect ratio, dramatic atmosphere, PG-rated comical physical humor.
```

* **禁止词汇 (Negatives)**：`realistic, photorealistic, 2D illustration, flat shading, sketch, drawing, violent, blood, gore, knife pointing at person, generic branding.`

---

## 二、 12 个分镜故事板提示词详情 (Storyboard Prompts)

```carousel
### SH001：Q弹刹车登场
**镜头编号**：`SH001` (SEG01)  
**构图与景别**：全景 (Full Shot)，侧面低角度平移侧拍。  
**画面描述**：夏日炎热正午，一辆高亮黑色复古弯梁摩托车疾驰而入，并在街角的水果摊前稳稳刹停。由于惯性，摩托车前后粗大的红色避震弹簧产生可爱的Q弹下压和车身起伏晃动，车尾排气管随之喷出一个白色的卡通烟雾圈。华强身穿挺拔黑色皮夹克，头戴反光镜片黑色头盔，骑在车上。背景为斑驳的灰色老街水泥墙、红蓝条纹遮阳雨棚和松木水果摊。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影分镜关键帧，高品质3D数字动画风格，皮克斯风格。阳光刺眼的夏日正午，一个戴着黑色高亮机车头盔、穿着挺拔黑色皮夹克（带拉丝银色金属拉链）的中国男子，骑着一辆高亮黑色复古弯梁摩托车在街角水果摊前稳稳刹停。由于惯性，摩托车的前后粗红色避震弹簧产生Q弹可爱的极限下压与起伏回弹，排气管“啵”地喷出一个白色的卡通烟雾圈。背景是斑驳的老街水泥墙、红蓝相间的条纹遮阳棚和松木水果摊。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例，富有戏剧性的荒诞喜剧氛围。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie keyframe, a cool male rider with a black leather jacket and a glossy black motorcycle helmet sits on a vintage black moped under the blazing summer noon sun. The moped is bouncing comically with exaggerated suspension compression in front of a street fruit stand. A funny cartoon white smoke ring puffs out from the exhaust pipe. Background has weathered gray concrete walls and a rustic wooden fruit stand with a red-and-blue striped awning. Ray tracing, warm sunlight, comical atmosphere, 16:9, Pixar style.
```
<!-- slide -->
### SH002：利落脱盔直视
**镜头编号**：`SH002` (SEG01)  
**构图与景别**：中近景 (Medium Close-up)，华强正面微仰拍，镜头缓慢拉向脸部。  
**画面描述**：华强单脚支地坐在摩托上，右手利落地脱下黑色头盔挂在车把上。他留着干净平整的寸头，下颌微抬，双眼冷静而深邃，上眼睑拉平，充满平静但极强的压迫审视感。阳光斜射，照亮其坚毅宽平的下巴与锐利的鼻梁线条。皮夹克肩膀硬挺，拉丝金属扣反射微光。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影近景分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个留着利落极短寸头、有着方阔平直下颌线、双眼冷静深邃的帅气中国男子，坐在黑色摩托车上，右手利落地脱下高亮黑色头盔挂在左把手上。他微微抬起下颌，目光平静而深锁，锁定前方，充满极强的压迫审视感。阳光斜射照亮他坚毅宽平的下巴与笔直的鼻梁。他穿着硬挺黑色复古机车皮夹克，带银色金属拉链。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie close-up keyframe. A cool Chinese man with a very short buzzed haircut, flat square jawline, and intense calm eyes stares directly at the viewer with a slight upward chin tilt. He is holding his glossy black helmet in one hand, wearing a tough black leather motorcycle jacket with detailed silver zippers. Bright noon sun hits his face, casting sharp dramatic shadows. Calm yet intimidating gaze, smooth stylized clay skin, warm cinema lighting, 16:9, Pixar style.
```
<!-- slide -->
### SH003：金子调侃对峙
**镜头编号**：`SH003` (SEG01)  
**构图与景别**：双人 OTS 中景 (Over-the-shoulder Medium Shot)，越过华强黑皮衣背影。  
**画面描述**：在红蓝帆布雨棚下，胖胖的摊主老板（挺着大肚腩，身穿泛黄的白色小吊带棉背心）原本躺在竹椅上剔牙，听到华强的挑衅调侃后，啐掉牙签，一巴掌拍在肚皮上猛然起立，横肉满面怒气；一旁瘦溜肩的小弟蹲在凳子上嗑瓜子，露出鬼祟谄媚的坏笑。华强负手踱步在木箱旁。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影双人越肩分镜关键帧，高品质3D数字动画风格，皮克斯风格。越过黑色机车皮夹克男子的右肩背影。在水果摊斜跨的红蓝条纹遮阳雨棚下，胖胖的、挺着大肚腩、身穿泛黄白色棉背心的摊主老板霍然从竹椅上站起，猛啐掉剔牙签，满脸横肉狂怒；旁边一个极瘦、驼背溜肩的小弟缩在低凳上嗑瓜子，咧歪嘴露出鬼祟谄媚的坏笑。背景码放着木质西瓜箱。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例，富有喜剧色彩的胖瘦对比。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie OTS shot over a leather-jacketed man's shoulder. A fat, chubby vendor wearing a yellowed white sleeveless tank top is angrily standing up, his round belly protruding, throwing a wooden toothpick from his mouth in fury. Next to him, a very thin, lanky assistant with sloped shoulders sits on a low stool, smirking wickedly and eating seeds. Weathered street corner fruit stand filled with wooden crates of watermelons under a blue-red awning. Comical fat-and-thin duo contrast, 16:9, Pixar style.
```
<!-- slide -->
### SH004：手拍西瓜藤蔓颤抖
**镜头编号**：`SH004` (SEG02)  
**构图与景别**：极近特写 (Extreme Close-up)，俯拍西瓜堆。  
**画面描述**：一只戴着黑色骑行皮手套的右手伸入画面，在焦点中心一颗极圆、翠绿条纹的蜡质西瓜皮上轻轻“咚咚”拍了两下。瓜皮接触点微微卡通下陷。西瓜顶部的褐色干枯弯弯藤蔓产生像**弹簧般的剧烈Q弹上下抖动**，敲击点震起一圈滑稽白小的灰尘颗粒。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影极近景微距分镜关键帧，高品质3D数字动画风格，皮克斯风格。一只戴着黑色骑行皮手套的右手伸入画面，在一颗极圆、翠绿条纹的蜡质西瓜皮上轻轻“咚咚”敲击了两下。瓜皮接触点微微卡通凹陷，西瓜顶部的褐色干枯藤蔓像弹簧般在半空发生剧烈Q弹上下弹抖，拍击点震起一圈滑稽白小的灰尘微粒。背景是干燥松木箱纹理。柔和温暖的电影级光影，光线追踪渲染，16:9比例，丰富的触觉材质纹理。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie extreme close-up. A hand in a black leather riding glove gently taps a perfectly round, waxy green striped watermelon. The tap causes a cartoon-style squash indentation on the rind. The dry curly brown vine on top of the melon is vibrating wildly like a spring. A tiny ring of white dust particles puffs up from the point of impact. Tactile wooden crate background, crisp warm sunbeams, 16:9, Pixar style.
```
<!-- slide -->
### SH005：华强死亡保熟凝视
**镜头编号**：`SH005` (SEG02)  
**构图与景别**：越肩中景 (OTS Medium Shot)，越过西瓜堆仰拍华强。  
**画面描述**：华强双臂抱胸在黑色皮外套前，面色平静如水。他眉骨下压，双眼皮拉成一字，死死锁定前方的摊主。一旁的小弟则弓着背、双手搓在一块，缩着细长脖子，露出得志小人般的谄媚坏笑附和着。阳光在其脸上投下笔直的阴影。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影低角度越肩分镜关键帧，高品质3D数字动画风格，皮克斯风格。越过西瓜堆仰拍。一个身穿黑色皮衣的冷峻中国男子双臂抱胸，面色平静如水，眉骨重压，双眼皮拉平死死锁定前方，散发着冰冷的审视感。旁边一个瘦小溜肩的小弟贴着老板，双手高频揉搓，缩着细长脖子，咧嘴露出谄媚而鬼祟的坏笑。斜射的强太阳光在他们脸上投下戏剧性的直角阴影。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie low-angle shot over watermelons. A cool Chinese man with a black leather jacket stands with arms crossed, staring down with intense, icy-cold squinting eyes. Beside him, a sneaky, lanky boy with sloped shoulders and a blue tank top smirks mischievously with a bootlicking expression, rubbing his hands together. Extreme sharp shadows under the midday sun, heavy psychological tension, comical yet dramatic, 16:9, Pixar style.
```
<!-- slide -->
### SH006：老板怒拍横肉狂怒
**镜头编号**：`SH006` (SEG02)  
**构图与景别**：中景 (Medium Shot)，正对大胖子摊主老板。  
**画面描述**：矮壮粗鲁的摊主被华强眼神逼急，额头青筋暴跳，满脸络腮胡茬横肉颤动，在胸前“啪”地合击拍响大胖手，一根粗大手指狂暴指点。旁边溜肩的小弟被巴掌巨响吓得脖子缩没了，谄媚笑脸瞬间僵住。背景是堆叠的西瓜木箱。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影中景分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个横肉满面、满脸络腮胡子茬点阵、挺着大肚腩的矮胖中国摊主老板气急败坏。他面色通红，大张着嘴狂吼，在胸前“啪”地大力合击肉乎乎的双手掌，全身横肉产生滑稽的余震颤动，一根粗大手指愤怒地直指前方。旁边瘦小溜肩的小弟被巴掌巨响吓得缩没了脖子，嘴歪着呆滞惊恐。背景是堆叠的西瓜木箱。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例，混乱好笑的喜剧动能。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie medium shot. A heavy, angry Chinese vendor with a short scruffy beard and a bulging belly is slapping his thick palms together with force, red-faced and yelling with wide-open mouth, pointing a finger forward. Beside him, his thin, sloped-shouldered assistant shudders in shock, his silly grin frozen in fear. Background of wooden melon crates under a striped awning, chaotic comical energy, 16:9, Pixar style.
```
<!-- slide -->
### SH007：砸瓜上秤Q弹颤抖
**镜头编号**：`SH007` (SEG03)  
**构图与景别**：中景双人同框 (Medium Shot)，水平视角静态机位。  
**画面描述**：摊主满脸凶神恶煞，双手狠狠将那颗翠绿的大瓜“砸”在金属电子秤盘上。秤盘承受重击，底座橡胶脚产生夸张的卡通Q弹，在半空上下剧烈弹跳颤抖，案板震起一层木屑微粒。华强在左侧负手而立，嘴角勾起一抹戏谑微抿的冷笑；小弟豆豆眼圆瞪，屏住呼吸。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影水平视角分镜关键帧，高品质3D数字动画风格，皮克斯风格。胖胖的摊主老板满脸凶神恶煞，双手狠狠将一颗翠绿的大西瓜砸在金属电子秤盘上。秤盘承受重击，电子秤底座的橡胶脚产生极度夸张的卡通Q弹，在半空剧烈上下弹跳颤动，案板震起一层木屑灰尘微粒。左侧一个穿着黑色皮夹克的冷酷中国男子负手而立，嘴角勾起一抹戏谑微抿的冷笑。右侧溜肩小弟豆豆眼圆瞪，屏住呼吸。柔和温暖的电影级光影，光线追踪渲染，粘土滑润皮肤材质，丰富的物理材质纹理，16:9比例。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie keyframe. An angry vendor violently slams a large green watermelon onto a vintage metal electronic scale. The silver scale is bouncing and vibrating wildly with elastic cartoon physics. On the left, a cool man in a black leather jacket stands calmly, wearing a subtle sarcastic smirk. On the right, a lanky assistant gasps with wide bean-like eyes. Comical physics bounce, dynamic motion, 16:9, Pixar style.
```
<!-- slide -->
### SH008：指点不够数绿读数
**镜头编号**：`SH008` (SEG03)  
**构图与景别**：近景俯拍 (High angle Close-up)，电子秤。  
**画面描述**：电子秤的绿色数显液晶屏在一帧内定格在亮绿色的虚假“`20.00`”数字上。华强一只戴着黑色皮手套的右手食指伸入画面，指尖沉稳而缓慢地轻轻“按抵”在秤盘的银色不锈钢边缘，秤盘发生了微幅的倾斜，亮绿色的数显绿灯投射在黑色皮手套上，反光微粒分明。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影高角度俯视近景分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个复古金属电子秤的绿色液晶屏亮起，延迟定格在虚假读数“20.00”上。一只戴着黑色骑行皮手套的右手伸入画面，食指沉稳而缓慢地轻轻“按抵”在秤盘的银色不锈钢边缘，导致秤盘微幅倾斜，莹绿色的液晶数码光反射在黑色皮手套的细微颗粒上。柔和温暖的电影级光影，光线追踪渲染，丰富的金属与皮革材质，16:9比例，悬疑感特写。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie close-up from a high angle. A vintage electronic scale's screen glows with a fake bright green digital display showing "20.00". A hand in a black leather glove extends into the frame, press-pointing a single index finger firmly onto the edge of the shiny silver metallic scale plate, causing the plate to tilt slightly. Green digital light reflects onto the dark leather glove. Suspenseful close-up, 16:9, Pixar style.
```
<!-- slide -->
### SH009：秤底反转红色磁铁暴露
**镜头编号**：`SH009` (SEG03)  
**构图与景别**：极微距特写 (Extreme Close-up) -> 快速拉开为三人同框大中景。  
**画面描述**：秤盘被华强左手猛地一掀翻转了过来。不锈钢秤盘反面（背面）凹陷金属底座的中心位置，**吸附着一颗高饱和度鲜红色的圆形塑料磁铁**，在银色金属折射中极其刺眼醒目。随后切三人大中景强制冻结：摊主呆死，额头滑下一颗大汗珠；小弟下巴大张长条状，腿软颤抖。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影戏剧性分镜关键帧，高品质3D数字动画风格，皮克斯风格。不锈钢电子秤盘被一只手猛地反转掀翻，露出秤盘反面金属底座中心凹陷处吸附着的一颗高饱和度、极其刺眼的鲜红色圆形塑料磁铁。画面的另一半是三个呈滑稽石化状态的人物：冷酷的黑皮衣男子戏谑地勾起嘴角；矮胖的摊主呆立，额头正滑下一大颗晶莹的大汗滴；瘦小的小弟张着长条状大嘴下巴脱臼，膝盖打抖双手在空气中呈鸡爪状颤抖。柔和温暖的电影级光影，光线追踪渲染，16:9比例，戏剧性凝结与鲜红色块点睛。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie dramatic keyframe. The metal scale plate is flipped upside down, revealing a bright saturated red circular magnet stuck to the center of its silver concave metallic underside. Immediate transition to a wide shot of three characters frozen in shock: the cool man smirk-gazing, the fat vendor staring blankly with a huge comical sweat drop sliding down his face, and his thin helper gasping with an elongated open mouth and shaking knees. High contrast red color pop, comedic freezing, 16:9, Pixar style.
```
<!-- slide -->
### SH010：拔刀劈瓜折射星芒
**镜头编号**：`SH010` (SEG04)  
**构图与景别**：中景转特写 (Medium to Close-up)，刀身仰拍。  
**画面描述**：摊主气急败坏抢刀，华强以极其优美帅气的慢动作跨步上前，反手抢先拔出了那把缠绕多层黑色绝缘胶带的圆头西瓜刀。刀身在空中划过完美的慢动作弧线，**折射出一道耀眼刺目的亮银色卡通星芒闪光**，避开人体，极其坚决精准地一刀朝案板上的绿色西瓜斩去。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影动作分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个穿着硬挺黑色皮衣的冷酷中国男子，以极为优美帅气慢动作跨步上前，反手抢先拔出了一把手柄缠绕着多层黑色胶带的钝头圆角西瓜刀。刀身在空中划过完美的弧线，在阳光下折射出一道锃亮刺目的亮银色卡通星芒闪光。他神情坚决，避开周围人，一刀精准地劈向木案板上的绿色西瓜。充满动能的帅气战斗姿态。柔和温暖的电影级光影，光线追踪渲染，丰富的物理材质纹理，16:9比例。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie dynamic keyframe. A cool Chinese man in a black leather jacket, in an elegant slow-motion dash, unsheaths a melon cleaver wrapped with black tape on the handle. The dull round-tipped silver blade sweeps in a perfect arc, flashing a brilliant white cartoon starburst gleam in the air. He slashes down decisively at the green watermelon on the counter, completely bypassing the vendor. Dynamic action pose, star flare reflection, 16:9, Pixar style.
```
<!-- slide -->
### SH011：果汁水球大爆炸洗礼与小弟“萨日朗”翻车
**镜头编号**：`SH011` (SEG04)  
**构图与景别**：中近景 (Medium Close-up)，镜头爆破抖动。  
**画面描述**：西瓜没有写实破裂，而是**像红色果汁水球般瞬间发生卡通大爆炸**！无数绿皮朝四周激射，一股**高压消防水枪般的鲜红色西瓜汁喷泉**迎面狠狠拍在摊主脸上，将他冲退两步。老板满脸黏糊果汁、贴着西瓜籽、眼冒金星。一旁的小弟被大爆炸吓尿，屁股下的木矮凳侧翻，他整个人四脚朝天仰翻在地，双脚在半空作滑稽的“蹬自行车”状挣扎，眼泪鼻涕大张嘴。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影滑稽高潮分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个翠绿的大西瓜没有写实破裂，而是像一个红色汁水气球般瞬间发生卡通大爆炸！无数绿色瓜皮碎片飞溅，一股高压消防水枪般的鲜红色西瓜汁喷泉正面狠狠拍在摊主脸上，将他冲退两步。老板浑身黏糊糊贴满红色果汁和黑色西瓜籽，眼冒金星。一旁的小弟被大爆炸吓得仰天大摔一跤，屁股下的矮凳掀翻，他四脚朝天躺在地上，双脚在半空作滑稽的“蹬自行车”状挣扎，张着长条大嘴狂哭破音大喊。高能液体飞溅，喜剧大payoff。柔和温暖的电影级光影，光线追踪渲染，丰富的物理材质纹理，16:9比例。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie keyframe, comical explosion. A watermelon explodes like a massive red liquid water balloon, blasting a high-pressure jet stream of bright red sweet juice directly onto the fat vendor's face, pushing him back. The drenched vendor is covered in red juice with melon seeds stuck to his face, cartoon stars spinning around his head. On the right, his thin helper falls backward as his wooden stool flips over, lying flat on his back with his legs kicking the air in a bicycling motion, mouth stretched open in terror, crying tears. High energy liquid splash, 16:9, Pixar style.
```
<!-- slide -->
### SH012：白烟圈绝尘离去
**镜头编号**：`SH012` (SEG04)  
**构图与景别**：中景平滑向后拉远、拉高的全景鸟瞰俯拍。  
**画面描述**：华强面无表情，利落地将西瓜刀随手一插，戴上头盔跨上黑色复古弯梁车，踩下踏板。摩托车排气管卡点喷出**三个由高到矮、大小递减的圆形卡通白烟圈**，朝温暖夕阳照亮的老街远方绝尘而去。背景中，落汤鸡老板废墟中呆滞，而小弟双手抱头、一脚穿布鞋一脚光着，狼狈不堪地朝反方向一路打滑逃向老街深处。  
**中文出图提示词 (可以直接复制)**：
```text
3D动画电影后拉拉高鸟瞰分镜关键帧，高品质3D数字动画风格，皮克斯风格。一个身穿黑色皮衣的中国男子面无表情地随手插下西瓜刀，戴上黑色头盔跨上高亮黑色复古摩托车，踩下踏板。车尾排气管卡点喷出三个由高到矮、大小递减的圆形卡通白烟圈，朝着被夕阳照亮的老街水泥巷深处绝尘而去。背景中，浑身甜红西瓜汁的摊主在废墟中发懵呆立，而那个驼背溜肩的小弟双手抱头、右脚光着、左脚穿着黑鞋，狼狈不堪地在泥地上打滑，尖叫着逃向老街反方向。拉长的斜斜黑影，柔和温暖的金色夕阳，荒诞离场。光线追踪渲染，16:9比例，淡出全黑。
```
**英文出图提示词 (可以直接复制)**：
```text
3D animated movie pullback crane shot. A cool Chinese rider in a black leather jacket rides his vintage black moped away into the warm summer sunset down a concrete alley. Three round white cartoon smoke rings puff in sequence from the exhaust pipe. In the background, the drenched red-juice covered vendor stands dazed, while his lanky, sloped-shouldered assistant, with one shoe missing, runs away frantically in the opposite direction clutching his head. Long shadows, comedic bird's-eye view, dramatic exit, warm golden sunset glow, fade to black, 16:9, Pixar style.
```
````

---

## 三、 完整故事板合集大图提示词 (Combined Storyboard Sheet Prompt)

在有些生成平台或需要一次性锁定全片风格和构图逻辑时，使用**大合集故事板大图 (Storyboard Grid Sheet)** 能在单次生成中锁定 12 个分镜的画面一致性。以下是一张图里包含所有分镜的图片提示词及生成后的图片参考引导：

### 1. 12格大合集图片提示词 (Combined 12-Frame Storyboard Grid Prompt)

#### 中文版大图提示词 (Chinese Master Grid Prompt)
```text
一个包含12格画面布局（排列为整齐的4列3行故事板网格）的3D动画喜剧短片故事板，每格画面均为16:9比例。每格画面的左上角都有一个明显的白色圆形高对比度数字，从1标记到12。
- 第1格 (SH001): 阳光刺眼的夏日正午，一个留着利落极短黑色寸头、有着方阔平直下颌线、身穿硬挺黑色复古机车皮夹克（带银色拉丝金属拉链）的中国男子，骑着一辆高亮黑色复古弯梁摩托车疾驰冲入画面，在街角水果摊木箱前刹停。摩托车的前后粗避震发生Q弹可爱的极限下压与起伏回弹，车尾排气管“啵”地喷出一个白色的卡通烟雾圈。
- 第2格 (SH002): 正面微仰拍中近景，这位中国男子坐在摩托车上，右手利落地脱下黑色高亮头盔挂在左把手上。他微微抬起下颌，双眼冷静深邃，上眼睑拉平锁定前方，散发着冷静而强大的压迫审视感。阳光斜射照亮他坚毅宽平的下颌与棱角笔直的鼻梁，皮肤呈现光滑细致的3D粘土材质。
- 第3格 (SH003): OTS越肩中景。在水果摊斜跨的红蓝条纹遮阳棚下，高大敦实、挺着圆皮球般肚皮、身穿泛黄白色棉背心的摊主老板霍然从躺椅上站起，猛啐掉剔牙签，满脸横肉狂怒；旁边一个极瘦、驼背溜肩的小弟缩在凳子上嗑瓜子，龇牙咧嘴露出鬼祟谄媚的坏笑。华强在左侧踱步，背景码放着松木西瓜箱。
- 第4格 (SH004): 极近景微距特写，一只戴着黑色骑行皮手套的右手伸入，在一颗极圆、翠绿条纹的蜡质西瓜皮上轻轻“咚咚”拍敲击了两下。瓜皮接触点微微卡通下陷，西瓜顶部的褐色干枯藤蔓像弹簧般在半空发生剧烈Q弹上下弹抖，拍击点震起一圈滑稽白小的灰尘微粒。
- 第5格 (SH005): 越过西瓜堆的低角度OTS中景。华强双手抱胸站在皮夹克前，面色平静如水，双眉深压，眼睑拉平聚焦前方，散发着冰冷审视。瘦小溜肩的小弟贴在老板身侧，双手高频摩擦，缩着细长脖子咧歪嘴附和着，露出得志小人般的谄媚笑。阳光斜射投下大面积阴影。
- 第6格 (SH006): 中景。满脸络腮胡点阵、挺着大肚腩的摊主粗鲁大汉被逼急，额头青筋暴跳，在胸前“啪！！”地合击大拍肥胖肉掌，全身横肉跟着巴掌剧烈余颤，一根粗大手指愤怒指点。旁边溜肩的小弟被巴掌巨响吓得缩没了脖子，谄媚笑脸硬切为呆滞惊恐。
- 第7格 (SH007): 中景水平视角。摊主满脸凶神恶煞，双手狠狠将西瓜砸在金属电子秤盘上，电子秤避震橡胶脚产生极度夸张的Q弹剧烈弹跳颤动。华强在左侧负手而立，嘴角勾起一抹戏谑微抿的冷笑；小弟豆豆眼圆瞪，屏住呼吸。
- 第8格 (SH008): 俯视近景特写。电子秤绿色液晶屏绿光亮起，延迟定格在虚假读数“20.00”上。华强一只戴黑色皮手套的右手食指伸入画面，指尖沉稳地按抵在秤盘银色边缘，导致秤盘微幅倾斜，莹绿色的液晶数码光晕反射在皮手套颗粒上。
- 第9格 (SH009): 极微距切三人中景。秤盘被华强左手闪电反转掀起，露出背面凹陷金属底座正中心吸附的一颗高饱和亮红色圆形塑料磁铁。随后画面强制石化：摊主抬起的手僵在半空，大脸上挂着一颗往下滑的透明大汗滴；小弟大张着长条状大嘴，腿软颤抖，双手呈鹰爪抓在空气中。
- 第10格 (SH010): 动作特写。摊主暴跳抓刀恐吓，华强以极其优美帅气的慢动作后发先至，右手反手拔出缠绕黑色胶带的圆头西瓜刀。刀身划过完美抛物线，折射出一道锃亮耀眼的卡通银色星芒，避开人体，极其坚决精准地一刀劈在案板上的大西瓜上。
- 第11格 (SH011): 爆笑高潮。西瓜没有写实血腥破裂，而是像红色果汁水球“砰——啪！”瞬间卡通大爆炸，一股高压消防水枪般的鲜红色西瓜汁喷泉拍脸冲洗摊主老板大脸，摊主被冲退两步成懵逼委屈落汤鸡眼冒金星。一旁的小弟被爆炸吓退矮凳侧翻仰面摔大跤，双布鞋在半空狂蹬自行车，眼泪鼻涕大张嘴狂喊。
- 第12格 (SH012): 后拉拉高鸟瞰全景。华强面无表情随手插刀，跨上黑色复古弯梁车轰油门，排气管卡点排出三个由高到矮、大小递减的圆形卡通白烟圈，驶入夕阳老街深处。背景中老板被红色汁水浇满呆滞，而小弟双手抱头、光着一只脚在泥地上打滑惊恐大喊逃亡，夕阳斜照拉出长长阴影，画面渐暗淡出。
高品质 3D 动画电影质感，柔和温暖的电影级光影，光线追踪渲染，丰富的物理材质纹理，粘土滑润 Clay 皮肤，夸张搞笑的物理反馈，皮克斯风格。
```

#### 英文版大图提示词 (English Master Grid Prompt)
```text
A 12-frame storyboard grid sheet layout (organized in a clean 4 columns and 3 rows grid) depicting a 3D animated comedy short movie, 16:9 aspect ratio for each frame. Each frame is clearly numbered in its top-left corner with high-contrast numbers in white circles from 1 to 12. 
- Frame 1 (SH001): A cool Chinese man with a flat square jawline, neat short buzzed haircut, wearing a tough black leather motorcycle jacket with detailed silver zippers, rides a vintage black moped. The moped arrives at a summer street fruit stand, its heavy red spring suspension compressing and bouncing comically in front of the rustic wooden watermelon crates. A cute cartoon white smoke ring puffs out from the exhaust pipe.
- Frame 2 (SH002): Low angle close-up. The cool Chinese man sits on his black moped and takes off his glossy black helmet, hanging it on the metallic handlebar. He tilts his chin up slightly, locks his intense, calm squinted eyes forward in a calm yet intimidating gaze. The bright noon sunlight hits his face casting sharp shadows, highlighting his sharp nose and smooth clay skin.
- Frame 3 (SH003): A side OTS shot over the cool man's leather shoulder. Under a red-and-blue striped awning, a fat, chubby vendor wearing a yellowed white sleeveless tank top stands up angrily from his bamboo chair, spitting out a wooden toothpick. Beside him, a very thin, lanky assistant with sloped shoulders sits on a low stool, smirking wickedly and eating seeds. Watermelons are stacked in wooden crates.
- Frame 4 (SH004): Extreme close-up of a hand in a black leather glove gently tapping a perfectly round, waxy green striped watermelon on a wooden crate. The tap causes a comical cartoon-style squash indentation on the rind, and the dry curly brown vine on top of the watermelon wiggles wildly like a spring. A tiny ring of white dust particles puffs up from the impact point.
- Frame 5 (SH005): Low-angle shot over the watermelons. The cool Chinese man stands with arms crossed, staring down with intense, icy-cold squinting eyes. Beside him, the sneaky lanky assistant with sloped shoulders and a blue tank top smirks mischievously with a bootlicking, hands-rubbing expression under the hot midday sun with sharp shadows.
- Frame 6 (SH006): Medium shot of the heavy, angry Chinese vendor with a short scruffy beard and a bulging belly. He is red-faced and screaming with his mouth wide open, slamming his thick fleshy palms together with force, creating fleshy ripples. Next to him, his thin, sloped-shouldered assistant shudders in shock, his silly grin frozen in fear.
- Frame 7 (SH007): The angry fat vendor violently slams a large green watermelon onto a vintage metal electronic scale. The silver scale bounces and vibrates wildly with elastic cartoon physics. On the left, the cool man in the black leather jacket stands calmly, wearing a subtle sarcastic smirk. On the right, the lanky assistant gasps with wide bean-like eyes.
- Frame 8 (SH008): Close-up from a high angle. The vintage electronic scale's screen glows with a fake bright green digital display showing "20.00". A hand in a black leather glove extends into the frame, press-pointing a single index finger firmly onto the edge of the shiny silver metallic scale plate, causing the plate to tilt slightly. Green digital light reflects onto the dark leather glove.
- Frame 9 (SH009): Dramatic keyframe. The metal scale plate is flipped upside down, revealing a bright saturated red circular plastic magnet stuck to the center of its silver concave metallic underside. Immediate transition to a wide shot of three characters frozen in shock: the cool man smirk-gazing, the fat vendor staring blankly with a huge comical sweat drop sliding down his face, and his thin helper gasping with an elongated open mouth and shaking knees.
- Frame 10 (SH010): Dynamic action keyframe. The cool Chinese man in the black leather jacket, in an elegant slow-motion dash, unsheaths a melon cleaver wrapped with black tape on the handle. The dull round-tipped silver blade sweeps in a perfect arc, flashing a brilliant white cartoon starburst gleam in the air as he slashes down decisively at the green watermelon on the counter, completely bypassing the vendor.
- Frame 11 (SH011): Comical explosion. The watermelon explodes like a massive red liquid water balloon, blasting a high-pressure jet stream of bright red sweet juice directly onto the fat vendor's face, pushing him back. The drenched vendor is covered in red juice with melon seeds stuck to his face, cartoon stars spinning around his head. On the right, his thin helper falls backward as his wooden stool flips over, lying flat on his back with his legs kicking the air in a bicycling motion, mouth stretched open in terror, crying tears.
- Frame 12 (SH012): Pullback crane shot. The cool Chinese rider in the black leather jacket rides his vintage black moped away into the warm summer sunset down a concrete alley. Three round white cartoon smoke rings puff in sequence from the exhaust pipe. In the background, the drenched red-juice covered vendor stands dazed, while his lanky, sloped-shouldered assistant, with one shoe missing, runs away frantically in the opposite direction clutching his head.
High-quality 3D digital animation style, soft warm sunbeams, vivid colors, detailed textures, clay-like smooth clay skin shaders, comical physical humor, Pixar-like visual style.
```


### 2. 故事板大合集设计图参考效果 (Storyboard Grid Reference)

我们已使用本合集提示词为您生成了这幅 **完整故事板 12 格大图**。画面完全卡点对齐三位角色的形状语言比例，并高度锁定了老街水果棚的透视空间一致性：

![华强买瓜 3D 动画电影版完整故事板大合集](/Users/tangwujun/.gemini/antigravity-ide/brain/3a596eab-8faa-4371-94fa-433ed07c556e/storyboard_grid_sheet_1780375032731.png)

### 3. 分镜序号与个体画片引导说明 (Individual Shot Navigation & Links)

您可以根据大合集图上的分镜序号，点击以下直达超链接，跳转至各独立分镜镜头的故事板详细出图提示词与适配器，做高精度单图微调：

* **[分镜 1] SH001：Q弹刹车登场** —— [跳转到 SH001 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh001q弹刹车登场) ( covered_beats: B01 | 0.0s - 3.0s )
* **[分镜 2] SH002：利落脱盔直视** —— [跳转到 SH002 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh002利落脱盔直视) ( covered_beats: B01 | 3.0s - 6.5s )
* **[分镜 3] SH003：金子调侃对峙** —— [跳转到 SH003 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh003金子调侃对峙) ( covered_beats: B01 | 6.5s - 10.0s )
* **[分镜 4] SH004：手拍西瓜藤蔓颤抖** —— [跳转到 SH004 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh004手拍西瓜藤蔓颤抖) ( covered_beats: B02 | 10.0s - 13.5s )
* **[分镜 5] SH005：死亡保熟审视** —— [跳转到 SH005 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh005华强死亡保熟凝视) ( covered_beats: B02 | 13.5s - 16.5s )
* **[分镜 6] SH006：老板拍掌暴怒恐吓** —— [跳转到 SH006 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh006老板怒拍横肉狂怒) ( covered_beats: B02 | 16.5s - 20.0s )
* **[分镜 7] SH007：砸瓜上秤Q弹颤抖** —— [跳转到 SH007 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh007砸瓜上秤q弹颤抖) ( covered_beats: B03 | 20.0s - 23.5s )
* **[分镜 8] SH008：指按秤盘不够数** —— [跳转到 SH008 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh008指按秤盘不够数) ( covered_beats: B03 | 23.5s - 26.5s )
* **[分镜 9] SH009：秤底反转大红磁铁暴露** —— [跳转到 SH009 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh009秤底反转红色磁铁暴露) ( covered_beats: B03 | 26.5s - 30.0s )
* **[分镜 10] SH010：夺刀劈西瓜闪耀星芒** —— [跳转到 SH010 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh010拔刀劈瓜折射星芒) ( covered_beats: B04 | 30.0s - 33.5s )
* **[分镜 11] SH011：果汁爆炸受洗小弟翻车** —— [跳转到 SH011 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh011果汁水球大爆炸洗礼与小弟萨日朗翻车) ( covered_beats: B04 | 33.5s - 37.0s )
* **[分镜 12] SH012：卡通白烟圈绝尘老街离场** —— [跳转到 SH012 提示词详情](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/huaqiang-watermelon-40s/outputs/storyboard_prompts/storyboard_prompt_v1.0.md#sh012白烟圈绝尘离去) ( covered_beats: B04 | 37.0s - 40.0s )

---

## 四、 出图连续性指导 (AI Consistency Guidelines)

1. **构图一致性**：
   * **背景街角**： SH001、SH003、SH007、SH009、SH011、SH012 中，背景的水泥老墙裂缝和斜拉雨棚处于恒定的透视视角，雨棚的**红蓝相间条纹数量和倾斜微弧**需完全对齐。
   * **水果案板**： 松木水果箱干燥的微毛刺起毛起纤维纹理，在所有中景镜头中均在固定位置提供粗糙木材的质感锚定。
2. **角色表情一致性**：
   * **华强**： 眼睛比真人放大 15%，黑色寸头边缘为方折几何裁剪，眉骨重压。皮夹克在 SH002、SH005、SH010 中反射拉丝银色光泽。
   * **摊主**： 络腮胡茬以紧密的动画噪点点阵表示，大蒜鼻发红，肚皮在 SH003、SH006、SH007 中有相同的棉背心接缝线。
   * **小弟**： 稀疏的两撇八字胡在 SH003、SH005、SH011、SH012 中为恒定的干枯质感，小豆豆眼珠的相对眼白比例锁死为 1:5。
3. **点睛大红色的提取**：
   * 必须严格将 `highly saturated red` (高饱和红色) 的参数控制在 **SH009 秤底吸铁石** 和 **SH011 西瓜爆汁** 中。其余所有场景（老街灰墙、木箱、摩托高亮黑皮外套）皆过滤高饱和红色，使大红色成为叙事与冲突爆发的唯一点睛视觉强调色。
