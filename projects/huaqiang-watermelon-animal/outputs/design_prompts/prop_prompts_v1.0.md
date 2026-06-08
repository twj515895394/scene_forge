# 核心道具图片生成提示词 (prop_prompts_v1.0.md)

本文件包含用于在外部图像生成平台生成“作弊电子秤”与“粉色踏板摩托车”设定参考图的最终 Prompt。设计为状态展示板格式，可直接复制使用。

---

## 1. 核心道具一：作弊电子秤 Prompt

```text
【提示词类型】：核心道具设定参考图 (Prop Model Reference Sheet)
【风格定位】：高品质 3D 动画电影质感 (feature animation style), 3d asset render, studio lighting
【主画面布局】：
一张 3D 动画电影道具设计参考图 (prop design board)。白色背景，整齐排版。展示同一台电子秤的三个不同物理状态。

【核心道具描述】：
一台中国菜市场常见的浅蓝色卡通电子秤 (light blue plastic casing electronic scale)。
- 秤体材质：稍微有些许油渍划痕的浅蓝色塑料外壳，边缘圆润。
- 秤盘：正方形的不锈钢拉丝秤盘 (brushed stainless steel plate)，底座装有铜制避震小弹簧。
- 屏幕：电子秤前后两侧有红色的 LED 数显双面显示屏。

【三个状态展示 (Three States in Reference Sheet)】：
1. 【正常空载状态 (State 1: Normal Idle)】：电子秤端正摆放，秤盘水平，红色数显屏亮起显示“0.00”字样。
2. 【称重作弊状态 (State 2: Cheating Mode)】：一个绿皮西瓜放在秤盘上，数显屏强行背光闪烁显示“15.00”斤。
3. 【掀翻暴露状态 (State 3: Flipped & Exposed)】：整个电子秤被掀得底朝天，秤盘滑出落地。暴露出底座中央粘着的一块特大圆形黑色磁铁（吸铁石），吸铁石上贴着一块醒目的红色“合格证”贴纸标签。底座内部露出的铜制小弹簧弯曲抖动。

【负向约束 (Negative Prompt)】：
真人现实相机照片 (realistic photo), 纯黑背景 (black background), 超市大型地秤 (industrial floor scale), 模糊没有细节 (flat texture).
```

---

## 2. 核心道具二：粉色踏板摩托车与安全帽 Prompt

```text
【提示词类型】：核心道具设定参考图 (Prop Model Reference Sheet)
【风格定位】：高品质 3D 动画电影质感 (feature animation style), 3d asset model render, pixar visual style
【主画面布局】：
一张复古踏板摩托车的三维设计展示图板 (prop bible board)。白色背景，多角度展示，干净明亮。

【核心道具描述】：
一辆圆润复古的 3D 卡通踏板摩托车 (pink vintage retro scooter)。
- 车身外观：喷有高亮光泽的樱花粉漆面 (sakura pink glossy finish)。圆形的镀铬后视镜，单圆大灯。车身两侧带有流线型的银色防撞护栏。
- 比例特色：头小轮宽，车身比真实踏板车更加圆润胖乎，前风挡处设计有小波浪边缘。
- 安全帽配件：一个粉红色复古安全帽 (pink retro helmet with cute cat ears decoration)，安全帽顶部有一对可爱的猫耳造型装饰，正面印有白色边缘图案，与车辆风格一致。

【三个状态展示 (Three States in Reference Sheet)】：
1. 【骑行进场状态 (State 1: Riding View)】：车大灯亮着柔和黄光，前轮微微偏转，呈现行驶动势。
2. 【侧架驻车状态 (State 2: Parked View)】：摩托车侧倾15度，单侧斜支撑架撑在泥沙地上，粉红色安全帽（带可爱猫耳）松垮地挂在左侧车反光镜（车把）上。
3. 【踩火启动状态 (State 3: Engine Kickstart View)】：平头哥踩燃引擎，车辆剧烈抖动，车尾排气管喷出三个连续膨胀的黑色卡通圈状烟圈 (three black cartoon smoke puff rings)。

【负向约束 (Negative Prompt)】：
写实哈雷摩托 (realistic chopper motorcycle), 赛车 (racing motorcycle), 纯黑背景 (black background), 写实机车纹理 (gritty texture).
```

---

## 3. 辅助道具：爆破大西瓜 Prompt

```text
【提示词类型】：辅助道具设定参考图 (Prop Model Reference Sheet)
【风格定位】：高品质 3D 动画电影质感 (feature animation style), 3d asset model render, pixar cartoon style
【主画面布局】：
一张展示爆破大西瓜的三维设计展示图板。白色背景，多状态对比，排版整洁。

【核心道具描述】：
一个卡通风格的饱满大西瓜 (a plump cartoon watermelon)。
- 瓜皮外观：高光泽的蜡质瓜皮 (waxy green rind)，带有深墨绿色的波浪状条纹，质感圆润饱满。

【两个状态展示 (Two States in Reference Sheet)】：
1. 【完整静态 (State 1: Whole Melon)】：一个完整的西瓜静止放置在粗糙木板桌面上，在阳光下呈现蜡质的反光。
2. 【切口大爆破状态 (State 2: High-Pressure Explosion Mode)】：西瓜被横向一爪劈开，西瓜内部瞬间爆发出惊人且密集的半透明亮红色果浆 (bright saturated watermelon red juice wave)。高饱和度的果汁呈环形高压气浪粒子向外喷射，其中夹杂着几颗黑色扁平的西瓜籽和碎裂的红西瓜果肉。果汁液体具有晶莹剔透的折射和微弱的卡通速度线效果。

【负向约束 (Negative Prompt)】：
流血和暗红色血液质感 (blood and dark red liquid), 写实恐怖伤口 (body horror), 写实水流 (realistic water splashing), 纯黑背景 (black background).
```
