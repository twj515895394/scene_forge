# 音乐提示词方案 (Music Prompts Plan)

*   **项目名称**：`million-pound-biao`
*   **版本**：v1.0
*   **推进阶段**：`scene-audio-director`
*   **主要工具推荐**：Suno / Udio / MusicFX

---

## 🎵 一、核心配乐提示词 (Core Leitmotif Prompts)

全片由于氛围反差巨大，分为两个截然不同的音乐主题，以适配戏剧从“英式中产阶级优雅”到“神圣体积感财富”，再到“滑稽东北民俗”的反转。

### 1. 优雅拨弦主题 (Pizzicato Elegance Theme)
*   **使用场景**：*Segment 2 至 Segment 5* (彪哥进餐、吸面、擦碗底)
*   **音乐意图**：用精致得有些刻意的弦乐拨弦来反衬彪哥粗俗狂野的大葱吃相，制造极致的滑稽感。小提琴拨弦的速度和力度会随着吸面的重影（Smear Frame）加速，形成喜剧共鸣。
*   **英文生成 Prompt (Udio/Suno 适用)**:
    ```text
    A high-society Victorian classical salon music, quirky and fast-paced pizzicato violin, harpsichord arpeggios, light cello undercurrent. Playful, slightly eccentric, comedic elegance, steady 120 bpm, crystal clear acoustic chamber music recording. High dynamic range, cinematic, Victorian tea room background music.
    ```
*   **中文音乐描述**：
    维多利亚沙龙古典室内乐，滑稽且快速的纯小提琴拨弦（Pizzicato），轻快的大键琴琶音，低频大提琴打底。俏皮、略带怪诞的喜剧优雅感，稳定的 120 拍每分钟，清晰的原声录音，电影感，古典英式茶室背景音乐。

### 2. 圣光神格化合唱主题 (Warm Golden Sacred Choir)
*   **使用场景**：*Segment 8* (亮出黑卡，圣光滑跪)
*   **音乐意图**：神化“开原维多利亚黑卡”，用宗教般圣洁的合唱和宏大管风琴把财富的降维打击渲染到顶点，造成极限的反差。
*   **英文生成 Prompt (Udio/Suno 适用)**:
    ```text
    Epic sacred gothic cathedral choir, angelic soprano vocalizing high note, massive warm pipe organ chords, orchestral brass crescendo, holy golden light atmosphere, sudden silence drop, cinematic tension, transcendental, 70 bpm, divine intervention style.
    ```
*   **中文音乐描述**：
    史诗神圣的哥特式大教堂唱诗班合唱，天使般的女高音吟唱高音，宏大而温暖的管风琴和弦，交响铜管渐强，神圣的金色光芒感，电影感张力，超凡脱俗，70 拍每分钟，神迹降临风格。

### 3. 滑稽二人转谢幕主题 (Slapstick Erhuan-Woodwind Outro)
*   **使用场景**：*Segment 9* (猎枪走火，落灰糊脸，彪哥溜走)
*   **音乐意图**：枪响瞬间圣歌骤停，音乐迅速切入极其滑稽、节奏暴走、充满东北泥土芳香的二人转板胡与木琴，彻底解构之前的神圣感，释放喜剧张力。
*   **英文生成 Prompt (Udio/Suno 适用)**:
    ```text
    Upbeat cartoon slapstick comedy music, energetic Chinese Banhu fiddle (high-pitched solo), hyperactive wooden xylophone run, sliding whistles, goofy brass horn accents, festive rustic tempo, chaotic and humorous chase outro, 140 bpm.
    ```
*   **中文音乐描述**：
    欢快跳跃的卡通滑稽喜剧音乐，充满能量的中国高音板胡独奏，极度活跃的木琴滑奏，滑音哨（Slide Whistle），搞笑的铜管号音点缀，欢快喜庆的乡村节奏，混乱而幽默的追逐谢幕音乐，140 拍每分钟。

---

## 🛑 二、配乐静默与控制点说明 (Music Control & Silence Points)

在提示词输入和混音中，必须对以下静默时间节点进行精确控制，以实现喜剧留白：

1.  **吴总拍桌对峙 (00:55 - 01:00)**：拨弦主题乐器在吴总大掌击打在桌面的瞬间**彻底静止**。留下 5 秒的真空无声期，只听罗马钟重音“滴答、滴答”，利用听觉空白拉满紧张感。
2.  **黑卡出世前摇 (01:10 - 01:12)**：在黑卡展平、金光暴射前的 1.5 秒，风雪风噪、挂钟声和环境音**全部静音**，形成听觉暴风雨前的宁静。
3.  **走火礼炮切歌 (01:25)**：长枪落地触发“砰”走火枪响的瞬间，管风琴与唱诗班的圣歌咏唱**瞬间撕裂骤停**，不留下任何回音（Reverb tail），下一帧直接切入暴走的二人转板胡与木琴滑奏。
