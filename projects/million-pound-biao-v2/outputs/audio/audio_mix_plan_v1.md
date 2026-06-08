# 混音计划 (Audio Mixing Plan) - million-pound-biao-v2

本文件定义了本片 120 秒视频在后期音频混音（Mixing）阶段的声学空间设计、频段均衡、声相（Panning）定位以及动态响度控制规范，确保高水准的动画电影级声场表达。

---

## 🏛️ 一、 空间声学与混响 (Spatial Acoustics & Reverb)

为了建立逼真的古典英伦餐厅室内外空间对比，混音阶段必须定义两种完全不同的空间混响预设：

### 1. 室内高档茶室空间 (Indoor Tea Room Space)
*   **空间模拟**：中型古典欧式房间（约 200 平方米），胡桃木护墙板、高天花板、厚重的棉麻挂毯、地毯吸音。
*   **混响参数**：
    *   **混响类型**：木质中厅 (Wood Medium Room) 或 室内大堂 (Chamber)。
    *   **衰减时间 (Decay Time)**：1.2s - 1.4s。
    *   **早期反射 (Early Reflections)**：较强且温暖，低频吸收（100Hz 以下衰减 -3dB），高频在 5kHz 以上平缓截止。
    *   **作用对象**：弗罗斯特、领班、经理的台词配音；划燃火柴、倒水、盘子摩擦等拟音；弦乐圆舞曲。
*   **声学效果**：使声音显得温暖、尊贵、圆润，带有些许沉闷与窒息感，与彪哥粗粝的野蛮吃相产生对比。

### 2. 外部雪地街道空间 (Outdoor Snowy Street Space)
*   **空间模拟**：开阔的大雪街道，周围有结冰建筑物反射，积雪起强吸音作用。
*   **混响参数**：
    *   **混响类型**：户外开阔空间 (Outdoor Open Space)。
    *   **衰减时间 (Decay Time)**：0.4s - 0.6s（极短，吸音严重）。
    *   **早期反射**：极弱，伴随长延迟的建筑物稀疏回声 (Echos)。
    *   **作用对象**：彪哥在雪地里的自言自语（Shot 01）、跳舞和滑倒（Shot 24）的声音、猛烈北风。
*   **声学效果**：声音干瘪、空旷、发紧，有明显的冷风呜咽底噪。

---

## 🧭 二、 声相与声学景深 (Panning & Depth of Field)

根据 Faction Layout（左右阵营对垒），全片对话与音效的左右声道定位必须严守轴线：

*   **画面左侧阵营 (Screen Left - Panned Left 15% - 30%)**：
    *   服务员弗罗斯特、领班、老板在柜台（Zone B）的交谈及倒茶、打算盘音效。
*   **画面右侧阵营 (Screen Right - Panned Right 15% - 30%)**：
    *   主角范德彪的台词、包拉链、筷子碰盘子、嚼葱、蘸酱、拍皮包等音效。
*   **大门正中 (Screen Center - Panned Center 0%)**：
    *   大门挂钟机械大摆轮嘀嗒声、总经理克莱门斯跑来的皮鞋脚步声。
*   **声学景深 (Audio Depth of Field)**：
    *   在 S05 中，画面焦点在前景大嚼大葱的彪哥，背景中弗罗斯特和经理低头咬耳朵。弗罗斯特的声音必须通过 **高通滤波器 (High-pass Filter)** 和 **低通滤波器 (Low-pass Filter)** 截断高频和低频，加入 1.8s 的较湿混响（Wet Mix 45%），模拟偏远后景的“虚化”说话声。

---

## 🎚️ 三、 频段均衡与频率共存 (EQ & Frequency Management)

*   **彪哥嗓音 EQ 雕琢**：
    *   高频在 6kHz 处进行小幅提升（+1.5dB），强化其沙哑大碴子烟酒嗓的干燥质感；
    *   在 250Hz 进行略微衰减（-2dB），防止其中年男性的胸腔共鸣低频与大提琴拨弦的主题低频发生混淆（Muddy）。
*   **弗罗斯特嗓音 EQ 雕琢**：
    *   在中高频 1.5kHz - 2.5kHz 处进行略微提升（+2dB），以增强其翻译腔刻薄尖酸的穿透力。
*   **挂钟嘀嗒声与大提琴拨弦的低频分配**：
    *   大提琴拨弦基频在 80Hz - 150Hz 处做宽 Q 值提升，使其温暖、有支撑力；
    *   挂钟嘀嗒的木质碰撞频段锁定在 800Hz - 1.2kHz，将 150Hz 以下低频完全切除，防止两个时钟节奏在低频重叠。

---

## ⚡ 四、 动态响度控制与戛然而止 (Dynamics & Hard Cut)

*   **拍账单硬冲突**：
    *   Shot 15 中，拍账单的“啪——”一声必须通过压限器（Limiter）限制在 -1dBFS，使其瞬间拥有极强的瞬态冲击力，账单纸张的声音要干脆、硬朗。
*   **【关键混音高潮点：黑卡圣光瞬间静音】**：
    *   在 Shot 19 (90.0s) 亮卡瞬间，所有的音乐、壁炉燃烧、时钟嘀嗒声必须进行**硬切断 (Hard Cut)**，在 1 帧内淡出至 0。
    *   同时，神圣圣光的“嗡——”Hum 声音量要在 10 帧内从无提升至 -6dBFS，声场由窄立体声瞬间爆开为 100% 极宽的超宽环绕声。
    *   Shot 20 中弗罗斯特下巴脱轨的“Sproing”卡通手风琴滑音，音量要高，动态变化剧烈，高频有夸张的金属颤音。
*   **【结尾铜锣敲碎乐章】**：
    *   Shot 24 彪哥在雪地得意跳舞滑倒的瞬间，铜锣敲击声（Gong）必须极其突兀，动态冲击力极强，音量定在 -0.5dBFS，在敲击后立刻将背景的管弦乐圆舞曲以 **Noise Gate** 或 **Hard Limiter** 切断，不留下任何管弦乐尾音。

---

## 📦 五、 视频提示词整合手协议 (Video Prompt Handoff)
后续 `scene-video-prompt-builder` 阶段生成的视频段落提示词中，关于声音的融合描述必须写明：
1.  **大嚼大葱段**：`accompanied by crunchy chewing sound of raw green onion and wet paste splat`
2.  **亮黑卡段**：`music suddenly turns into absolute silence, with a divine holy choir drone humming from the card`
3.  **滑倒段**：`lively classical music is suddenly interrupted by a loud bronze gong crash, followed by comic cartoon sliding shoe whistle`
4.  **绝对禁止出现** 写实骨折声 `bone cracking`、真实枪击声 `gunshot` 和凄惨痛苦惨叫 `screaming in real pain`。
