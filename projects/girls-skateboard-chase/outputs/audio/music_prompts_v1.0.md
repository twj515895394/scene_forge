# 极速山道滑板追逐战 音乐提示词 (AI Music Prompts) - v1.0

本文件提供用于 AI 音乐生成器（如 Suno, Udio, Stable Audio 等）生成短片配乐的提示词（Prompts），包含整片 60 秒主题音轨与分段循环音轨。

---

## 1. 整片 60 秒主题音轨提示词 (Master Theme Prompts - 60s)

*   **音乐名称**：Double Star Chase (双星极限追击)
*   **适用场景**：全片背景竞速电子朋克音乐，带起步爆发与高潮并漂。

### Suno / Udio 标签与描述 (Style & Description Tags)
```text
[Genre] Skate Punk, Synthwave, Electronic Rock
[Instrumentation] Energetic melodic electric guitar riffs, crunchy power chords, fast-paced acoustic punk drums, snappy snare rolls, bright vintage poly-synthesizers, bubbling arpeggios, pulsing synth bass
[Mood & Tempo] High-energy, youth sports, extreme race, fast-paced, triumphant, 160 BPM, double-time rhythm, joyful, nostalgic Pixar action-comedy style
[Structure]
0:00-0:07: Ambient wind pad intro, rising tension, silent drums, guitar muted notes.
0:07-0:08: Starter whistle blow, sudden drums roll and guitar explosion.
0:08-0:25: Fast skate punk driving beat, synth melody leading.
0:25-0:28: Sudden mute/filter sweep (Air jump silence), single loud wooden clack.
0:28-0:40: Deep synth bass drops back in, fast tempo resumes with high-speed wind texture.
0:40-0:50: Climax high-energy synth guitar harmony, triumphant main melody.
0:50-0:56: Final chord hits and decays, transitioning to warm acoustic guitar outro.
0:56-1:00: Light acoustic chords with synth bells, peaceful fade out.
```

### Stable Audio 文本提示词 (Text Prompt)
> **Stable Audio Prompt**: 
> A high-energy skate punk and synthwave hybrid track for a 3D animated action scene, 160 BPM. Melodic electric guitar riffs, rapid acoustic punk drum beat, bubbling retro synthesizers, and driving synth bass. Dynamic structure: starts with a quiet ambient synth pad and wind howling for 7 seconds, explodes into a fast-paced double-time punk rock rhythm at 8 seconds, experiences a dramatic high-pass filter sweep/silence at 25 seconds for an aerial stunt, drops back into heavy bass and fast drums at 28 seconds, peaks at 40 seconds with a triumphant synth-guitar harmony climax, and transitions to a warm, nostalgic acoustic guitar and synth bell outro at 50 seconds, fading out peacefully. Pixar movie soundtrack style, clear mix, professional production.

---

## 2. 局部变奏与循环轨提示词 (Segment Loops Prompts)

供视频剪辑阶段灵活拼接使用的分轨/素材提示词：

### 轨 A：山顶起跑悬念前奏 (Intro Loop - 0:00-0:08)
> **Prompt**: 
> An ambient cinematic synth intro with a wind howling backdrop, low-frequency suspenseful synth pads, and a subtle muted electric guitar plucking a slow melody. No drums. Rising tension, expecting a race to start. 160 BPM, youth sports movie intro vibe.

### 轨 B：极速竞速主干循环 (Race Main Loop - 0:08-0:40)
> **Prompt**: 
> Fast-paced skate punk driving drum beat, 160 BPM, double-time drums, energetic crunchy electric guitar power chords, bright retro synthesizer arpeggios playing a cheerful melodic motif. Pure energy, adrenaline rush, extreme sports action-comedy soundtrack.

### 轨 C：弯道双漂视觉高潮 (Climax Loop - 0:40-0:50)
> **Prompt**: 
> Triumphant and epic electronic rock climax, 160 BPM. Duet of screaming melodic electric guitar and bright poly-synthesizers playing a high-pitch triumphant theme in harmony. Heavy bass drops, double-time energetic rock drums, sparkling high-frequency synth chimes, massive energy release.

### 轨 D：终点友情温馨尾奏 (Outro Loop - 0:50-1:00)
> **Prompt**: 
> Warm and nostalgic acoustic guitar fingerpicking outro with soft retro synth bells and a gentle synth pad backdrop. Gentle wind rustling leaves in the background. Peaceful, relieved, happy ending, childhood friendship vibe, slow tempo fade out.
