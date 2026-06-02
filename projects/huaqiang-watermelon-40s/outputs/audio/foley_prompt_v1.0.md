# 《华强买瓜》3D 动画电影版 - 拟音与音效生成提示词包 (v1.0)

本提示词包继承自角色声音导演方案 (v1.0)，专门针对 AI 音效与拟音生成模型（如 ElevenLabs SFX, AudioCraft, AudioLDM, 或后期拟音录制）设计。为了完美呈现 **3D 动画长片（皮克斯风格）** 的高度物理颗粒感与物理幽默，所有拟音音效均进行了高度的**“弹性卡通化与触觉强调”**处理，彻底规避任何生硬刺耳的杂音。

---

## 一、 顶层拟音音效控制标签 (Universal SFX Guidelines)

```text
SFX Style Anchor: 
High-fidelity stylized animation sound effects, crisp tactile textures, clean cartoon physics, rubbery elasticity, exaggerated cartoon impact, clear room acoustics, warm resonant foley, funny physical comedy, PG-rated safe visual impact.
```

* **禁止词汇 (Negatives)**：`low-quality hiss, distortion, modern synthesizer noise, realistic screaming, realistic knife stabbing flesh, graphic violent impact sounds, raw white noise.`

---

## 二、 关键拟音音效 AI 提示词详情 (Foley & SFX Prompts)

```carousel
### SFX01：摩托车Q弹避震与排气白烟圈
**所属镜头**：`SH001`  
**声音描述**：复古摩托疾驰引擎声突然刹停，产生粗大的避震金属弹簧被极限压迫后，发出滑稽干涩的“吱溜——”压缩声，伴随橡胶轮胎在地上摩擦的卡通Q弹余震。车子刚停稳，排气管发出一声爽朗清脆的“啵”气孔弹跳哨音。  
**音效生成提示词 (Prompt)**：
```text
Crisp cartoon sound effects. A vintage moped engine decelerates to a sudden stop. The thick heavy spring suspension makes a comical, squeaky metallic compress sound "squeeeak-boing". Rubber tires have a clean elastic cartoon squeak on concrete. Followed immediately by a short, dry, whimsical air puff pop sound "poof" from an exhaust pipe. High fidelity foley, 16-bit.
```
<!-- slide -->
### SFX02：头盔敲击挂车把
**所属镜头**：`SH002`  
**声音描述**：华强利落脱下头盔挂在车把上，头盔的黑色反光钢盔表面与车把的拉丝金属发出“当啷——”一声清脆、带有亮堂金属泛音的碰撞声，余音在正午的燥热空气中微微颤动。  
**音效生成提示词 (Prompt)**：
```text
Stylized animation foley. A glossy heavy motorcycle helmet is hung and clanks onto a metallic handlebar. A single, crisp, clean metal-on-metal collision sound "clank-dring" with bright ringing metal harmonics and warm decay. Very clear acoustic space, noon street ambience.
```
<!-- slide -->
### SFX03：啐剔牙签撞击松木箱
**所属镜头**：`SH003`  
**声音描述**：大吊带背心摊主不屑地朝地上剔牙，发出“啐”的湿气流声，牙签弹射在粗糙的干燥松木水果箱上，发出一声极其细微、清脆的木质敲击“嗒”声。  
**音效生成提示词 (Prompt)**：
```text
Close-up cartoon foley. A wet mouth spitting sound "p-tui", followed by a tiny, dry, wooden click sound "tap" as a wooden toothpick hits a dry pine wooden fruit crate. Very clear close-up textures, highly focused, silent background.
```
<!-- slide -->
### SFX04：皮手套敲击西瓜与弹簧藤抖
**所属镜头**：`SH004`  
**声音描述**：戴着皮夹克皮手套的手指敲击翠绿大西瓜两下，发出“咚咚”饱满、清脆的空腔物理回音。敲击的一瞬间，西瓜顶部的褐色干枯藤蔓发生弹簧般的Q弹剧烈抖动，发出滑稽短促的“啵嘤啵嘤”小幅度弹簧摩擦音。  
**音效生成提示词 (Prompt)**：
```text
Highly tactile close-up sound effect. Two hollow, crisp taps on a large ripe watermelon rind with a thick leather-gloved finger "thump-thump", showing a rich hollow pulp resonance. The dry curly vine on top vibrates wildly like a spring, generating a comical, high-pitched rubbery wiggle vibration sound "boiing-boing". Complete clean silent room background.
```
<!-- slide -->
### SFX05：怒拍大胖大肥手掌
**所属镜头**：`SH006`  
**声音描述**：粗壮的摊主大汗淋漓，大发雷霆时，肥厚的一对肉掌在胸前“啪！！”地大力拍击一次。声音饱满沉重，带有明显的脂肪卡通颤动余波感，震起案板尘埃。  
**音效生成提示词 (Prompt)**：
```text
Exaggerated cartoon foley. A fat heavy man furiously slaps his thick fleshy palms together, creating a loud, heavy, fleshy impact sound "SLAP!!" with comical fat-vibration ripples afterwards. Acoustic indoor street-side reverb. Clean transient.
```
<!-- slide -->
### SFX06：西瓜砸中金属秤盘跳动
**所属镜头**：`SH007`  
**声音描述**：摊主狠狠砸下大西瓜，西瓜砸中电子秤盘的瞬间，发出一声巨大的不锈钢金属沉重撞击“当——”及电子秤橡胶避震底座的“当啷当啷”强烈颤抖金属回音。  
**音效生成提示词 (Prompt)**：
```text
Exaggerated animation sound effect. A heavy green round object violently hits a stainless steel scale plate. A massive, loud, resonant metallic impact clang "CLANG!!" with springy metallic rattling and vibrations decaying for 2 seconds. Comical mechanical shake, high energy.
```
<!-- slide -->
### SFX07：秤盘反转与磁铁撞击“叮”
**所属镜头**：`SH009`  
**声音描述**：华强左手利落一掀反转金属秤盘，发出金属轴承锈蚀偏转的干涩“吱呀——”声。秤盘底座中心的圆形吸铁石脱离并撞击不锈钢底盘，发出清脆透亮的“叮——”一声高亮撞击反差音。  
**音效生成提示词 (Prompt)**：
```text
Stylized mechanical foley. A metallic scale plate is flipped over, making a sharp, dry screeching metal squeak sound "screeech-creak". The moment the plate stops, a crisp, bright, high-pitched metal click "ting!" pop sound rings out as a circular plastic magnet collides on steel. Very clean and isolated.
```
<!-- slide -->
### SFX08：出刀锃亮星芒与慢动作破空
**所属镜头**：`SH010`  
**声音描述**：圆头西瓜刀被反手利落拔出，在阳光下星芒闪过的一刹，发出刀刃星光一闪的亮银闪光音“锃——”。出刀劈下的轨道在慢动作下发出斩开空气的重低音划空“呼——”啸音。  
**音效生成提示词 (Prompt)**：
```text
Whimsical action animation sound. A dull round-tipped steel cleaver is swung quickly, making a cartoon metallic shine glint sound "zing-shine!" with high-pitched steel harmonics. Followed by a slow-motion deep air-slicing swoosh sound "whoosh" under a theatrical slow-motion effect.
```
<!-- slide -->
### SFX09：橡胶西瓜水球大爆炸与高压果汁喷射
**所属镜头**：`SH011`  
**声音描述**：劈瓜瞬间，大西瓜像橡胶水球爆裂，发出一声巨大、沉闷且带有巨量水汽的卡通闷爆大响“嘭——啪！”。随即抛物线的高压鲜红果汁喷泉喷出，发出消防高压水枪迎面拍脸冲刷大汉的“哗啦啦——”大水激射冲洗声。  
**音效生成提示词 (Prompt)**：
```text
Comical massive explosion sound. A huge ripe watermelon pops like a giant water balloon, making a heavy, wet, muffled blast boom sound "SPLASH-POW!!", releasing tons of liquid. Instantly followed by a continuous, high-pressure water hose spraying and gushing sound "whuuuush-gush" hitting a fleshy surface, mimicking a comical face wash. Deep cartoon physics.
```
<!-- slide -->
### SFX10：摩托烟圈啵啵啵离场
**所属镜头**：`SH012`  
**声音描述**：华强跨摩托发动机“轰隆”响起，摩托踩油门绝尘而去。排气管在 SH012 卡点依次喷出三个烟圈，发出“啵、啵、啵”由高到低三个高矮递减的圆形卡通白烟圈的弹跳气孔气流音。  
**音效生成提示词 (Prompt)**：
```text
Quirky moped departure foley. A small single-cylinder motor engine hums "vrooom" and accelerates. The exhaust pipe makes three distinct, sequential popping bubble whistle sounds "pop, pop, pop" in a rhythmic syncopation. The engine sound and pops smoothly fade away into the distance under summer heat.
```
```
