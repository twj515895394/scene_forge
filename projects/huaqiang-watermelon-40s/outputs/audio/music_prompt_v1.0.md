# 《华强买瓜》3D 动画电影版 - 音乐生成提示词包 (v1.0)

本提示词包继承自角色声音导演方案 (v1.0)，专为 AI 音乐生成器（如 Suno, Udio, 或多模态音轨生成模型）设计。整体配乐风格锚定 **“皮克斯动画长片级家庭喜剧配乐 (Pixar-like family animation comedy score)”**，使用高质感的原声木管、拨弦与打击乐器，严禁使用任何侵权受保护电影旋律，突出高反差的戏剧张力与荒诞滑稽感。

---

## 一、 顶层音乐控制参数 (Universal Music Parameters)

* **音乐速度 (Tempo)**：`92 BPM (Mid-tempo, walking pace, playful bounce)`
* **调性与和声 (Key & Harmony)**：`C Major (bright, sunny), transitioning to C minor (playful suspense) during confrontation, ending in bright chaotic major.`
* **整体风格标签 (Tags)**：
  ```text
  Playful acoustic comedy instrumental, Pixar-like family animation movie soundtrack, mischievous woodwinds, bouncy pizzicato strings, whimsical marimba, warm acoustic guitar, bassoon staccato, comedic dynamic shifts, cartoon curiosity, light suspense, comical payoff, PG-rated funny physical humor.
  ```
* **禁止词汇 (Negatives)**：`electronic synthesizer, heavy drums, metal electric guitar, dark horror ambient, vocals, singing, modern synthpop, sad, tragic, copyrighted theme song.`

---

## 二、 乐器编制矩阵 (Instrumentation Setup)

为了实现高品质的真实物理共鸣质感，配乐采用以下精细木管与拨弦编制：

| 乐器名称 | 承担角色 (Role) | 声音特性 (Acoustic Feature) |
| :--- | :--- | :--- |
| **低音巴松管 (Bassoon)** | 摊主老板与肥胖体态 | 滑稽的断奏 staccato，笨重浑厚，带有一点鼻音。 |
| **尤克里里 / 古典吉他 (Ukulele/Guitar)** | 燥热老街与悠闲夏日 | 轻快干爽的指弹扫弦，带有木质箱体的温暖干燥纤维感。 |
| **马林巴琴 / 木琴 (Marimba/Xylophone)** | 华强的冷静挑衅与敲击动作 | Q弹轻脆的圆木椎敲击声，富有物理弹性，带微弱声学空气感。 |
| **大提琴拨弦 (Cello Pizzicato)** | 冲突升级与心理张力 | 低沉、饱满的不协和单音拨弦，紧拉空气张力。 |
| **大长号 (Sliding Trombone)** | 爆汁高潮受洗与狼狈滑稽 | 极其滑稽的管乐大滑音 (sliding glissando)，滑稽感拉满。 |

---

## 三、 按 Segment 音乐提示词详情 (Segment Music Prompts)

### SEG01 (0.0s - 10.0s) — 【第一幕：登场与调侃价格】
* **叙事画面**：华强骑弯梁摩托Q弹刹停登场，踱步调侃“金子做的”。
* **音乐任务**：建立夏日老街闲散庸懒的环境背景，带出华强的冷俊帅气与调侃价格的喜剧尴尬。
* **乐器重点**：尤克里里轻松指弹，巴松管 staccato 间歇性切入。
* **生成提示词 (Prompt)**：
  ```text
  Acoustic comedy score, 92 BPM, bright warm sunbeams, a bouncy acoustic guitar and playful ukulele start with a lazy summer stroll rhythm. A quirky staccato bassoon enters with funny steps. The music has a slow, mischievous build-up. Suddenly, the music cuts to complete dead silence for 0.5 seconds at the end of the phrase, leaving only ambient summer wind. Pixar animation style.
  ```

### SEG02 (10.0s - 20.0s) — 【第二幕：挑瓜与保熟交锋】
* **叙事画面**：手敲西瓜藤抖动，发问“保熟吗”对峙升级，老板暴怒合击肉掌。
* **音乐任务**：压缩空气，拉近戏剧距离，拉升博弈的火药味，在平稳中蓄积暴怒力量。
* **乐器重点**：马林巴琴高频弹跳，大提琴 pizzicato 单音下压。
* **生成提示词 (Prompt)**：
  ```text
  Mischievous animation music, tempo slows down slightly to 88 BPM for tension. Whimsical marimba notes start bouncing with physical springy vibes. Dry cello pizzicato notes pluck in dissonance, building a light, playful suspense. The woodwinds play short, anxious phrases. The tension builds to a maximum with a sharp crescendo, ending abruptly on a loud clap hit. Pixar family comedy tension.
  ```

### SEG03 (20.0s - 30.0s) — 【第三幕：对赌上秤与揭穿猫腻】
* **叙事画面**：西瓜砸秤盘绿数爆闪，华强抵秤盘，一把翻面露出红磁铁，三人石化大定格。
* **音乐任务**：砸秤时的动作物理卡点，翻盘露磁铁的瞬间**完全切断声音，长达 1.0 秒绝对静音**。
* **乐器重点**：砸秤金属音，掀盘轴承吱呀，随后全场绝对真空静默。
* **生成提示词 (Prompt)**：
  ```text
  Acoustic suspense comedy track, starts with a sudden metallic heavy impact and springy xylophone clatter. Cello staccato climbs up quickly for 3 seconds. The moment the scale is flipped, all music and instrumentation are immediately sliced to total absolute zero silence for 1.0 second. Dead silence, frozen comical frame, only ambient warm breeze. Pixar movie comedy freeze.
  ```

### SEG04 (30.0s - 40.0s) — 【第四幕：去害化劈瓜与荒诞离场】
* **叙事画面**：出刀劈瓜折射星芒，水球大爆炸，老板落汤鸡，小弟高喊“萨日朗”逃命，排气管烟圈绝尘，荒诞谢幕。
* **音乐任务**：在爆炸瞬间爆发出极具荒诞爆笑色彩的大长号滑音与滑稽木琴大 Payoff，小弟呐喊时声场移动，摩托绝尘渐远淡出。
* **乐器重点**：滑稽长号滑音、急促木琴、大提琴拨弦，随摩托发电机声淡出。
* **生成提示词 (Prompt)**：
  ```text
  Whimsical orchestral explosion payoff, tempo bursts into a fast-paced 108 BPM. A funny sliding trombone glissando drops comically alongside rapid, bright xylophone runs. The music is festive yet highly ridiculous. The playful brass and strings chase each other in a chaotic comical run. The instruments slowly dissolve one by one, leaving a single motor hum and a final ukulele pluck fading into warm silence. Fade to black.
  ```
