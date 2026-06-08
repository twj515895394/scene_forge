# SceneForge `pixar_like` Skill 口径迁移清单

## 1. 文档目的

本文档用于回答四个执行问题：

1. 当前 SOP 主链 skill 中，哪些默认 Pixar-like 口径需要迁出
2. 它们各自应迁到 `style_profiles/pixar_like/` 的哪个文件
3. Skill 改造后应如何读取
4. 哪些主链 skill 当前**没有**显式写死 Pixar-like，暂时不需要优先迁

本文档聚焦当前第一轮主链：

- `scene-design-builder`
- `scene-script-adapter`
- `scene-performance-director`
- `scene-storyboard-director`
- `scene-audio-director`
- `scene-video-prompt-builder`

---

## 2. 先说结论

按当前仓库内容，**显式写死 Pixar-like 默认口径的高优先迁移点，几乎全部集中在 `scene-design-builder`**。

其他主链 skill 当前的情况更像是：

- 读取共享资产
- 使用通用“动画电影化”表述
- 暂时没有把 Pixar-like 品牌锚词写死在运行时口径里

这意味着第一轮真正要动手迁的重点非常集中，不需要把所有 skill 一起大改。

---

## 3. 高优先迁移清单

## 3.1 `scene-design-builder/SKILL.md`

### 当前位置

- 文件：`.agents/skills/scene-design-builder/SKILL.md`
- 当前口径：
  - “皮克斯电影级动画风格”
  - “超高质量 3D 角色动画”
  - “电影级灯光与镜头语言”

### 为什么要迁

- 这段内容属于运行时 prompt 指导
- 它会把设计阶段默认拉向 Pixar-like
- 后续切到 `dreamworks_like`、`stylized_chinese_3d`、`comic_action_3d` 时会直接造成风格偏移

### 迁移目标

- `style_profiles/pixar_like/profile.md`
- `style_profiles/pixar_like/visual_language.md`
- `style_profiles/pixar_like/lighting_language.md`

### 改造建议

当前写法：

```text
生成 prompt 允许使用强风格锚词，例如“皮克斯电影级动画风格”“超高质量 3D 角色动画”“电影级灯光与镜头语言”
```

建议改成：

```text
生成 prompt 时，必须优先读取当前 `director_style_id` 对应 `style_profile` 中的视觉锚词、材质锚词、灯光锚词和板式锚词；若风格包缺失，再按显式回退规则使用默认风格包。
```

### 改造后读取方式

`scene-design-builder` 运行时新增读取：

- `style_profiles/<director_style_id>/profile.md`
- `style_profiles/<director_style_id>/visual_language.md`
- `style_profiles/<director_style_id>/lighting_language.md`

---

## 3.2 `scene-design-builder/references/output-contract.md`

### 当前位置

- 文件：`.agents/skills/scene-design-builder/references/output-contract.md`
- 当前口径：
  - `皮克斯电影级动画风格`
  - `超高质量 3D 角色动画`
  - `电影级灯光与镜头语言`
  - `feature animation character sheet`

### 为什么要迁

- 这部分属于设计阶段 prompt 规范
- 它会成为角色说明书板和设定图 prompt 的默认锚词来源
- 如果继续留在全局 contract 中，所有风格包都会被同一套 Pixar-like 语言拉偏

### 迁移目标

- `style_profiles/pixar_like/visual_language.md`
- `style_profiles/pixar_like/profile.md`

### 改造建议

当前写法更像：

```text
生成 prompt 允许使用这些强风格锚词
```

建议改成：

```text
生成 prompt 时可引用当前风格包提供的风格锚词；本 contract 不再内置具体风格锚词示例，只保留“可以存在风格锚词”这一机制说明。
```

### 改造后读取方式

`scene-design-builder` 在生成：

- `角色说明书图片提示词_v*.md`
- `scene_prompts_v*.md`
- `master_scene_prop_reference_v*.md`

时，统一从当前风格包读取锚词。

---

## 4. 当前可暂缓迁移的主链 skill

## 4.1 `scene-script-adapter`

### 当前判断

- 没有发现显式 Pixar-like 锚词
- 当前主要读取的是动画风格化共享资产

### 结论

- 暂不作为第一批 Pixar-like 口径迁移点
- 后续只需在多风格阶段补充“可读取 `performance_language` / `rhythm_language`”

## 4.2 `scene-performance-director`

### 当前判断

- 没有发现显式 Pixar-like 锚词
- 当前更多是表演结构与表现力扩展规则

### 结论

- 暂不需要做品牌口径迁移
- 后续适合接入 `performance_language.md`

## 4.3 `scene-storyboard-director`

### 当前判断

- 没有发现显式 Pixar-like 锚词
- 当前主要依赖共享镜头语言与故事板方法论资产

### 结论

- 暂不需要做 Pixar-like 品牌口径迁移
- 后续重点是接入：
  - `camera_language.md`
  - `rhythm_language.md`
  - `lighting_language.md`

## 4.4 `scene-audio-director`

### 当前判断

- 没有发现显式 Pixar-like 锚词
- 出现的“温暖音乐”等表述属于情绪策略，不等于 Pixar-like 品牌锚词

### 结论

- 暂不需要做第一批品牌口径迁移
- 后续可按风格包接入 `music_language.md` / `sound_language.md`

## 4.5 `scene-video-prompt-builder`

### 当前判断

- 没有发现显式 Pixar-like 锚词
- 当前更多是继承分镜、表演、声音和共享镜头资产

### 结论

- 暂不需要先迁品牌锚词
- 后续重点是让它消费来自 `style_profiles/` 的风格总控语句

---

## 5. 第一轮改造顺序

### P0：先做

1. 建 `style_profiles/pixar_like/`
2. 把 `scene-design-builder/SKILL.md` 中的默认 Pixar-like 锚词迁出
3. 把 `scene-design-builder/references/output-contract.md` 中的默认 Pixar-like 锚词迁出

### P1：再做

1. 给 `scene-design-builder` 增加按 `director_style_id` 读取风格包的规则
2. 验证 `pixar_like` 路线不退化

### P2：后做

1. 让 `scene-storyboard-director` 接入 `camera_language.md` / `rhythm_language.md`
2. 让 `scene-video-prompt-builder` 接入风格总控
3. 再扩到其他 `Phase 1` 风格包

---

## 6. 迁移后的最小读取契约

第一轮建议先让 `scene-design-builder` 读取：

```text
style_profiles/<director_style_id>/profile.md
style_profiles/<director_style_id>/visual_language.md
style_profiles/<director_style_id>/lighting_language.md
```

第二轮再扩到：

```text
style_profiles/<director_style_id>/performance_language.md
style_profiles/<director_style_id>/camera_language.md
style_profiles/<director_style_id>/rhythm_language.md
style_profiles/<director_style_id>/negative_constraints.md
```

---

## 7. 本次最终结论

如果现在就下手改造，最正确的起点不是“改所有主链 skill”，而是：

```text
先把 scene-design-builder 里的默认 Pixar-like 口径迁出来
先建立 pixar_like 的 style profile
先保证默认路线不退化
再把其他 skill 接到风格包体系上
```

这一步整理清楚后，后面的改造会非常稳，因为：

- 该迁的点很集中
- 不会误拆共享资产
- 也不会误判其他 skill 已经“深度绑定 Pixar-like”
