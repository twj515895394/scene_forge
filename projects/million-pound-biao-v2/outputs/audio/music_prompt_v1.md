# 音乐生成提示词包 (Music Prompts Pack) - million-pound-biao-v2

本文件定义了本二创视频全片 120 秒各个段落的背景音乐生成提示词（Prompts），可直接用于 Suno / Udio 等音乐生成 AI，以辅助生成切合古典英式氛围与彪哥喜剧反差的主题配乐。

---

## 🎵 一、 主题音乐设计参数 (Main Theme Specs)

*   **音乐风格 (Style)**：19世纪英式古典宫廷圆舞曲 (19th-century Classical English Court Waltz)。
*   **乐器编制 (Instrumentation)**：弦乐四重奏 (String Quartet: 2 Violins, Viola, Cello) 搭配一支滑稽的木管双簧管 (Solo Oboe)。
*   **速度范围 (Tempo)**：中速三拍子 (Moderato, 3/4 time signature, ~110-120 BPM)。
*   **主旋律特征**：起初优雅高贵、庄严静谧，但在中提琴和大提琴部带有滑稽的下行拨弦与微小的不谐和滑音，暗示人物的外强中干。

---

## 🎹 二、 音乐生成提示词 (Music Generation Prompts)

### 🎹 1. 主题圆舞曲 Prompt (适用于 S01 - S04 点餐段)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    classical waltz, chamber string quartet, solo oboe, 19th century elegant chamber music, 3/4 time signature, moderately playful, light comedy undertones, aristocratic ballroom style, acoustic, warm conservatory recording
    ```
*   **音乐描述 (Description)**：
    ```text
    An elegant and slightly comical Victorian chamber waltz, led by a playful solo oboe and accompanied by warm staccato strings. The tempo is steady 3/4 time, conveying a sophisticated yet ironic luxury dining atmosphere.
    ```

### 🎹 2. 嚼肉反差圆舞曲 Prompt (适用于 S05 - S06 狂嚼段)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    classical waltz, staccato pizzicato strings, solo oboe, woodwind slide, comedic pizzicato, awkward pause, quirky chamber music, 3/4 time, ironic humor, lighthearted cartoon drama
    ```
*   **音乐描述 (Description)**：
    ```text
    A quirky variation of the chamber waltz. The oboe plays mismatched syncopated notes, while the cello and viola perform exaggerated pizzicato downslides (sliding notes), creating a strong sense of comic mismatch and dining awkwardness.
    ```

### 🎹 3. 逼账对峙与挂钟同步 Prompt (适用于 S08 - S09 逼账段)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    suspenseful classical chamber, solo cello pizzicato, rhythmic ticking clock tempo, tense string ostinato, minimalist classical, slow building drama, dramatic pause, low frequency dread
    ```
*   **音乐描述 (Description)**：
    ```text
    All woodwinds and violins disappear. Only a single cello remains, playing a tense, rhythmic, mechanical low-frequency staccato (pizzicato) that mimics a clock's seconds ticking, synchronized with a ticking clock tempo, creating suspense.
    ```

### 🎹 4. 亮卡圣光爆发静默 Prompt (适用于 S10 亮卡瞬间)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    sudden silence, dramatic pause, choral swell, divine volumetric choir hum, worship ambient drone, angelic vocal pad, cinematic silence break, warm gold lighting soundscape
    ```
*   **音乐描述 (Description)**：
    ```text
    The tense ticking cello suddenly drops to absolute silence (mute). After a brief pause, a glorious, divine, volumetric choir hum and warm angelic vocal drone swell up, sounding like holy light piercing through a dark room.
    ```

### 🎹 5. 夹道送客高潮圆舞曲 Prompt (适用于 S11 - S12 谄媚送客)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    fast lively waltz, grand orchestral chamber, triumphant strings, joyful oboe, celebratory classical, theatrical comedy, high energy court dance, 3/4 time signature, cinematic climax
    ```
*   **音乐描述 (Description)**：
    ```text
    A fast-paced, grand, and theatrical variation of the main waltz. All strings and woodwinds play together in a fortissimo (very loud) triumphant orchestral waltz, expressing extreme flattery, royalty, and comical celebration.
    ```

### 🎹 6. 终局滑倒与铜锣打断 Prompt (适用于 S12 结尾打滑段)
*   **Suno / Udio 标签 (Tags)**：
    ```text
    sudden gong hit, comic orchestral hit, pizzicato downslide, violin slide, fast cartoon run, abrupt stop, fading acoustic outro, silly comedy ending
    ```
*   **音乐描述 (Description)**：
    ```text
    The fast waltz is suddenly interrupted by a loud, resonant Gong hit (bronze gong crash), ending all instruments instantly. A single violin plays a funny, stumbling downslide (slide down) using pizzicato, slowly fading out to silence.
    ```
