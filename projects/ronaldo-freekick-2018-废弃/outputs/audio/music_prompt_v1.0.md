# 音乐设计提示词 (Music Prompt Sheet) - ronaldo-freekick-2018

本文件提供用于生成/制作本片原创配乐的**音乐 Prompt 及制作说明**。设计完全对齐分镜时间轴与情感曲线，严禁出现真实球员姓名。

---

## 1. 原创配乐 AI Prompt 及风格定义 (Music AI Prompts)

若使用 Suno / Udio 等 AI 音乐生成模型，可使用以下 Prompt 词包：

*   **前段 (窒息备战期 - 0s-10s)**:
    > **Prompt**: `Epic dark cinematic drone, ultra-low frequency sub-bass pad at 35Hz, tense tremolo strings, slow sparse heartbeat thump percussion, empty atmosphere, wind chimes, extreme suspense, slow tempo 70 BPM, dark sports drama soundtrack.`
*   **中段 (绝杀破门期 - 10s-20s)**:
    > **Prompt**: `Dramatic orchestral build-up, acceleration, heartbeat percussion rises to 120 BPM, sudden silent drop, then massive explosive symphonic blast, heroic brass fanfare, heavy orchestral horns, thundering taiko drums, epic stadium rock energy.`
*   **慢镜回放段 (神迹慢放期 - 20s-30s)**:
    > **Prompt**: `Ethereal ambient pad, slow-motion dreamlike metallic delay echoes, distant resonant piano chord, floating strings, reflective, sports replay slow-motion score, post-rock reverb atmosphere.`
*   **庆祝高潮段 (终极SIUUU - 30s-35s)**:
    > **Prompt**: `High-energy epic symphonic rock triumph, soaring electric guitars, heavy cinematic drums, heroic brass ensemble, glorious victory anthem, grand orchestral resolution, 130 BPM, triumphant stadium chant outro.`

---

## 2. 镜头级音乐结构控制 (Music Timecode & Cues)

| 时间轴 (Timecode) | 配乐状态与变奏 (Music State) | 乐器与编排说明 (Instrumentation) | 情感功能 (Emotional Goal) |
| :--- | :--- | :--- | :--- |
| **0.0s - 2.0s** | 极弱起，深沉铺底音 | 35Hz 合成器低频长音 (Sub-bass drone) 缓起，低频定音鼓以 70 BPM 缓慢敲击。 | 渲染决战前的窒息感与死寂对峙。 |
| **2.0s - 7.0s** | 悬念爬升，心跳隆隆 | 提琴颤音 (Tremolo strings) 加入，心跳定音鼓音量微弱拉高，偶有清脆的金属风铃声掠过。 | 总裁深呼吸仪式感，空气极度紧缩。 |
| **7.0s - 10.0s** | 动能蓄势，准备爆发 | 心跳定音鼓速度渐快，大提琴重音拉响，右脚重踩时低音猛然一沉。 | 总裁拉裤摆、踩泥蓄势完毕。 |
| **10.0s - 14.5s** | 助跑冲刺，音乐拉起 | 速度加快，铜管乐器 (Brass short notes) 齐奏爬升，击弦乐快速拨弦推进。 | 总裁坚决起跑，动能极速释放。 |
| **14.5s - 16.5s** | **击球瞬间，极度静默** | **[Silence Point 1] 音乐音轨在此瞬间切断 (Cut to Silence)**。只保留总裁出脚后击球凹陷的非写实橡胶声与一声心跳“咚”，去除旋律。 | 留白艺术，锁死击球形变慢放高潮。 |
| **16.5s - 20.0s** | 破网绝杀，重音爆发 | 音乐瞬间炸裂！长号/大号狂暴齐奏，架子鼓重音拍击，电吉他低音扫弦加入，伴随全场人声欢呼。 | 球破死角挂网，戏剧张力第一波大释放。 |
| **20.0s - 23.5s** | 回放一，金属共鸣慢放 | 音乐高潮迅速过渡为高延时混响的空灵背景垫底音 (Ambient wash)，钢琴单音在 2.5 秒处重重落下一个回音弦。 | 从球网后视角慢动作回味坠网弧线美。 |
| **23.5s - 26.5s** | 回放二，鞋底微观力学 | 低频金属残响，低音贝斯慢速拨弄一根弦，配合水滴颗粒般的高频合成音。 | 解构球鞋击球变形的超微观物理。 |
| **26.5s - 30.0s** | 回放三，门将挫败静默 | **[Silence Point 2] 音乐音量主观弱化 80% (Ducked)**。仅留微弱的大提琴悲壮长音拉响，烘托鸭哥落地抱头的落魄。 | 戏剧犹豫点，情绪下沉。 |
| **30.0s - 32.0s** | 狂奔角旗，音乐二次拉升 | 实时画面。交响打击乐与电吉他合奏以 130 BPM 狂暴涌入，总裁飞奔起跳，大号高亢鸣响。 | 霸气庆祝前摇，能量再度积聚。 |
| **32.0s - 35.0s** | **SIUUU落地，史诗终曲** | 总裁踏地定格瞬间，**打击乐与低频爆能特效重音同步轰鸣！全场十万观众同声齐吼“SIUUU！”**，随后高亢的交响摇滚胜利赞歌推向最强高潮，最终在葡萄牙红绿灯光中史诗般渐暗淡出。 | 王者称霸定格，高潮Payoff释放。 |
