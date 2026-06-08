# SceneForge `pixar_like` 资产归属盘点

## 1. 文档目的

本文档只回答两个执行问题：

1. **哪些内容是真正的 `pixar_like` 风格专属资产/口径，后续应迁入 `style_profiles/pixar_like/`**
2. **哪些内容是共享资产，后续绝不能误迁**

这样做的目的，是避免后续多风格适配时：

- 把 Pixar-like 拎不干净
- 把共享底座误拆坏

---

## 2. 本次结论先说

当前第一轮多风格改造里：

- **真正该迁的，不是故事板方法论库，也不是整包动画资产库**
- **真正该迁的，是 Skill 层里默认写死的 Pixar-like 风格口径**

而以下两类内容必须保留为共享资产：

- 故事板方法论资产
- 动画/3D 家族共享资产

---

## 3. 该迁的：`pixar_like` 专属资产/口径清单

> 说明：这里说的“资产”，当前大多还不是 `assets/` 目录里的文件，而是写在 Skill 里的默认风格口径。后续它们应被整理成 `style_profiles/pixar_like/`。

### 3.1 优先迁移对象

| 当前位置 | 当前内容 | 为什么属于 `pixar_like` 专属 | 目标去向 |
|---|---|---|---|
| `.agents/skills/scene-design-builder/SKILL.md` | “皮克斯电影级动画风格”“超高质量 3D 角色动画”“电影级灯光与镜头语言”等强锚词 | 这是明确的默认风格引导，不是全局通用口径 | `style_profiles/pixar_like/visual_language.md`、`style_profiles/pixar_like/profile.md` |
| `.agents/skills/scene-design-builder/references/output-contract.md` | 角色说明书 prompt 的 Pixar-like 风格锚词示例 | 会直接影响设计阶段的默认生成方向 | `style_profiles/pixar_like/visual_language.md` |

### 3.2 未来应整理进 `style_profiles/pixar_like/` 的内容类型

后续建议至少收成这些文件：

- `style_profiles/pixar_like/profile.md`
  - 风格摘要
  - 适配题材
  - 推荐 `performance_style`
- `style_profiles/pixar_like/visual_language.md`
  - 圆润体块
  - 角色魅力导向
  - 温暖电影灯光
  - 高可读表情系统
- `style_profiles/pixar_like/performance_language.md`
  - 微表情驱动
  - 停顿与呼吸位
  - 情绪递进
- `style_profiles/pixar_like/camera_language.md`
  - 角色关系优先
  - 情绪推进镜头
  - 家庭向动画电影镜头倾向
- `style_profiles/pixar_like/rhythm_language.md`
  - 平滑推进
  - 角色情绪节奏
  - 喜剧但不油滑
- `style_profiles/pixar_like/lighting_language.md`
  - 温暖、细腻、可信但不冷硬
- `style_profiles/pixar_like/negative_constraints.md`
  - 避免直接品牌复刻
  - 避免过度写实冷峻
  - 避免过度嘴炮化、攻击性表演

### 3.3 迁移原则

- 先复制收拢到 `style_profiles/pixar_like/`
- 再改 Skill 去读取
- 验证 `pixar_like` 路线效果不退化
- 最后再清理旧口径

---

## 4. 绝不能误迁的：共享资产保留清单

## 4.1 全局通用资产

这些资产与具体风格包关系最弱，属于 SceneForge 主链底座，**绝不能迁入 `style_profiles/pixar_like/`**。

| 资产 | 当前位置 | 原因 | 结论 |
|---|---|---|---|
| 故事板方法论总库 | `assets/storyboard-methodology/*` | 负责 VGU、continuity、双版故事板、转译规则、模型适配，是主链结构方法论，不是 Pixar-like 风格资产 | 保持全局通用资产 |
| 通用镜头语言库 | `assets/cinematic-language/shot-language-library.md` | 这是通用镜头语法，不是某一风格包专属镜头语言 | 保持全局通用资产 |

### 4.1.1 特别强调

你刚指出的重点是对的：

**`assets/storyboard-methodology/*` 就是通用资产，不是 Pixar-like 风格资产。**

后续如果把这部分误迁，结果一定会坏，因为：

- 所有风格都会共用这套主链控制底座
- 它影响的是结构，不是风格气质

## 4.2 3D / 动画家族共享资产

这些资产带有动画电影化特征，但并不只服务 `pixar_like`，后续 `dreamworks_like`、`comic_action_3d`、`stylized_chinese_3d` 也需要继续共用。

| 资产 | 当前位置 | 原因 | 结论 |
|---|---|---|---|
| 动画风格化效果库 | `assets/animation-stylization/effect-library.md` | 提供夸张物理、轻中度卡通伤害、安全边界，是动画/3D 家族共享底座 | 保持家族共享资产 |
| 反差喜剧库 | `assets/animation-stylization/contrast-comedy-library.md` | 多个 3D 风格包都会复用 | 保持家族共享资产 |
| 动画电影镜头模式库 | `assets/cinematic-language/animation-film-shot-patterns.md` | 是动画电影家族共享镜头模式，不只服务 `pixar_like` | 保持家族共享资产 |
| 动画喜剧动作模式库 | `assets/cinematic-language/animation-comedy-action-patterns.md` | `dreamworks_like`、`comic_action_3d` 也会用到 | 保持家族共享资产 |

---

## 5. 执行边界

### 5.1 第一轮要做的

1. 把 Skill 里的 Pixar-like 默认锚词迁出
2. 建立 `style_profiles/pixar_like/`
3. 让 `scene-design-builder` 先从风格包读取

### 5.2 第一轮不要做的

1. 不要迁 `assets/storyboard-methodology/*`
2. 不要迁 `assets/animation-stylization/*`
3. 不要迁 `assets/cinematic-language/animation-*`
4. 不要把通用镜头语言库当成 Pixar-like 资产

---

## 6. 下一步建议

下一步最适合继续做的，不是再盘 `assets/`，而是直接出一张：

**SOP 主链 Skill 中的 Pixar-like 默认口径迁移清单**

这张清单要回答：

1. 哪句默认风格口径要迁
2. 迁到 `style_profiles/pixar_like/` 的哪个文件
3. 改完后 Skill 应该如何读取

---

## 7. 本次最终结论

`pixar_like` 的多风格拆分，第一步不该理解为：

```text
把所有带动画电影感的 assets 都拎出来
```

而应理解为：

```text
把 Pixar-like 默认风格口径从 Skill 里拎出来
把它们整理进 style_profiles/pixar_like/
同时保住通用资产和家族共享资产不被误拆
```
