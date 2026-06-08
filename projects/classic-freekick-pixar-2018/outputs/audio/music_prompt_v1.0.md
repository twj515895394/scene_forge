# 配乐提示词与生成规范 (Music Prompt) v1.0

本文件提供用于在 AI 音乐生成平台（如 Suno, Udio）生成本项目背景音乐的提示词、风格标签（Style Tags）及段落描述轨，确保配乐完全符合皮克斯 3D 动画电影的叙事节奏。

---

## 1. 音乐风格标签 (Music Style Tags)
请在生成器 Style/Tags 输入框中填入以下英文标签：
```text
cinematic orchestral brass, dramatic staccato strings, 8-bit retro chiptune arpeggios, marching snare drums, high suspense synth drone, emotional violin melody, low sub-bass drops, triumphant fanfare march, Pixar animation movie soundtrack style, 110 bpm, 4/4 time signature.
```

---

## 2. 结构化段落控制 Prompt (Structural Description Prompt)
请将以下英文段落控制描述填入生成器的 Prompt / Lyrics (Insturmental mode) 框内，以生成符合 40 秒 VGU 时间切分的情绪伴奏轨：

```text
[0:00 - 0:07] Intro: Heavy bass heartbeat thuds (100 bpm) with low synth drone. Mysterious, tense, and silent. A retro chiptune neon light buzzes quietly in the background.

[0:07 - 0:10] Build-up: Fast military marching snare drum rolls. Low brass horns rise in crescendo. Heartbeat drum speeds up, charging forward with immense energy.

[0:10 - 0:13] Climax Drop: A massive, explosive orchestral brass hit and heavy percussion slam at 0:11. Triumphant trumpets scream.

[0:13 - 0:18] Suspense Pause (Bullet Time): Orchestral music is instantly low-pass filtered, dropping to 10% volume. A slow, whimsical chiptune synthesizer arpeggio loops in a dreamy space, creating a comical zero-gravity suspense.

[0:18 - 0:24] Resolution: The low-pass filter explodes open. Full orchestral theme bursts back in with marching percussion as the ball hits the net.

[0:24 - 0:30] Slow-Motion Replay (Cinematic Theme): Transition into a soaring, romantic, and majestic string theme (violins and cellos) playing a beautiful, emotional melody under a warm sunset backlight. Highly aesthetic and slow-paced.

[0:30 - 0:33] Celebration Pre-hook: Triumphant marching band fanfare. Energetic brass horns blow, drumbeats matching a running hero.

[0:33 - 0:36] Kingly 定格 (SIUUU Drop): Music stops dead silent for 0.5 seconds at 0:34. Then, at 0:35, a massive sub-bass drop booms, layered with retro 8-bit coin-collecting cascades and shining chime rings.

[0:36 - 0:40] Outro: Upbeat victory march band theme. Snare drums, happy brass fanfares, blending with stadium crowd cheers, slowly fading out into a single deep bass drum heartbeat.
```

---

## 3. 生成与混音提示 (Mixing Tips)
1. **防止杂音**：建议在外部平台生成 2-3 个变体，并剪切其中最符合 S11（击球点）和 S28（落地定格点）重音节拍的版本。
2. **重音对齐**：在剪辑软件中，务必将 `0:11` 处的管弦大撞击与 S11 总裁脚背击中像素球的瞬间对齐，并把 `0:35` 的 Bass Drop 与 S29 总裁鞋底砸地引发激波的瞬间对齐。
