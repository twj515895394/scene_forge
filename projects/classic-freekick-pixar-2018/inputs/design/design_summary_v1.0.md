# 角色与场景设计汇总说明书 (Design Summary) v1.0

本说明书定义了“2018经典任意球绝平二创（皮克斯风格）”项目的统一视觉设计语言系统，并对所有角色、场景及空间调度机制的设计结论进行汇总。本文件是后续剧本、分镜及视频提示词生成的视觉标准源。

---

## 1. 统一视觉语言与美术基线 (Unified Art Baseline)

- **美术流派**：3D 卡通电影风格（Pixar Stylized CGI）。大曲率边缘几何形态，避免任何写实结构，突出Q弹可触的粘土胶皮质感（Vinyl/Clay texture）。
- **色彩剧本 (Color Script)**：
  - **备战与飞行阶段 (Beat 1 - Beat 5)**：夕阳余晖下的黄昏球场，温暖的逆光金边效果（Warm Rim Light）勾勒出角色的卡通边缘轮廓，形成雕塑般的史诗张力；
  - **改写与庆祝阶段 (Beat 6 - Beat 8)**：进球后触发霓虹爆裂与像素烟花，SIUUU落地瞬间引爆以鞋底为中心的环状红金双色魔法力场，空中飘浮着半透明的红金流电气流波纹与星星金币粒子（Pixar Aura with Gold Particles），冷暖色调强烈交织。
- **表现力扩展规则 (Expressive Animation Design)**：
  - **弹性变形**：允许非写实的卡通变形。击球时足球瞬时被重踩压扁 20%；鸭哥门将极限扑救时，手臂与身体可拉伸延长 1.2 倍。
  - **表情夸张**：大眼睛特写。人墙队员在球擦过头顶时，眼球瞬间夸张突起、嘴巴大张呈滑稽受惊状。
  - **禁用项目**：严禁出现写实流血、撕裂伤口；严禁出现任何真实的商业赞助广告牌及官方足协标志。

---

## 2. 角色设计路径锁定 (Character Locking)

| 角色名 | 外号/标识 | 制作路径 | 设计规范源文件 | 核心视觉特征描述 |
| :--- | :--- | :--- | :--- | :--- |
| **总裁** | 总裁 (RED #7) | **完整新建 (new_full)** | [character_design_总裁_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/character_design_总裁_v1.0.md) | 倒三角强壮身形（1:6头身比）。短发，大眼睛专注有神。身穿无字纯红衣配绿绿领，胸前为金色飞鹰抽象队徽，背后为**亮金色7号**。右侧短裤拉起，股四头肌肌肉隆起为卡通硬汉轮廓。 |
| **鸭哥** | 鸭哥 (WHT GK) | **轻量新建 (new_light)** | [character_design_鸭哥_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/character_design_鸭哥_v1.0.md) | 长梯形瘦高比例，手脚修长。身穿灰黄竖条纹队服，戴着一双**比例偏大、极其厚重的亮橙色乳胶手套**。眼睛为标准皮克斯圆形大眼，提供大尺度惊恐表情。 |
| **白色人墙** | 白色人墙 (WHT Wall) | **轻量新建 (new_light)** | [character_design_白色人墙_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/character_design_白色人墙_v1.0.md) | 5人并排，身材扁平方正（盒子人轮廓）。纯白球衣，背印非7号蓝色数字。绑定滑稽的五官大张惊恐表情。 |
| **红衣队友** | 红衣队友 (RED Team) | **轻量新建 (new_light)** | [character_design_红衣队友_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/character_design_红衣队友_v1.0.md) | Q版红衣绿裤配角，造型蠢萌。进球后张嘴大吼狂喜奔跑。 |

---

## 3. 场景与核心道具锁定 (Scene & Props)

### 3.1 场景：海滨竞技场大禁区 (Coastal Arena)
- **源文件**：[scene_design_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/scene_design_v1.0.md)
- **视觉特征**：地处海滨，看台后方隐约可见落日大海与热带椰树剪影。球场无真实商业广告牌，替换为卡通霓虹地灯。
- **大屏 HUD**：球门正后方高悬英文霓虹记分 HUD 屏，状态变化为：`RED 2 - 3 WHT` + `TIME: 88:00` $\rightarrow$ 进球后更新为 `RED 3 - 3 WHT` 伴随小霓虹焰花绽放，全场英文呈现。

### 3.2 道具：星纹像素足球
- **源文件**：[scene_design_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/scene_design_v1.0.md#L30-L50)
- **特征**：卡通大像素拼接的黑白足球，抽射压扁，飞行带红金流线气流，入网网兜圆锥凸起形变。

---

## 4. 空间连续性规范 (Space Continuity Seed)
- **源文件**：[space_continuity_seed_v1.0.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/projects/classic-freekick-pixar-2018/inputs/design/space_continuity_seed_v1.0.md)
- **轴线锁死**：180度射门轴线。进攻方球门位于画面**右侧 (X轴正向)**，防守方人墙/鸭哥在画面**左侧 (X轴负向)**。足球轨迹从**左下向右上**弧线切入。SIUUU庆祝角旗区位于球场右下角。

---

## 5. 后续制作指示

1. **去真人化词表检查**：严禁在 outputs/ 目录下的所有提示词中出现 "Ronaldo", "C罗", "西班牙", "葡萄牙" 等词，确保提示词的干净可复制性。
2. **皮克斯词缀继承**：在图片生成提示词中注入强特征词：`in Pixar 3D stylized CGI animation style`, `Disney character design`, `warm golden rim lighting`, `exaggerated expressions`, `vinyl toy textures`，避免产生写实或低保真3D画风。
