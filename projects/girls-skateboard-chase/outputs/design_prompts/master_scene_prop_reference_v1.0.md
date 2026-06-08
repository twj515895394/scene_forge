# 全场景资产总参考图提示词 (Master Scene-Prop Reference) - v1.0

本文件提供用于生成全场景资产总参考图（Master Scene-Prop Reference Board）的提示词。该图将主场景布局、两名女孩的默认站位/服装、滑板道具状态以及整体美术调性压缩至单张生成图像中，作为后续视频分段生成的最高一致性视觉基线。

---

## 1. 核心设计集成规范
*   **主场景集成**：蜿蜒的黑灰色沥青高山公路，一侧为悬崖一侧为山体，远景有松树林和淡淡的雾气。
*   **角色集成**：两名 18 岁中国滑板少女并排滑行在路面上，身材高挑纤细，身材完美，前凸后翘，展现迷人的运动S型轮廓，服装采用撞色街头潮服风格，告别单一色调：
    *   **女孩 A**：高马尾深栗色长发，戴亮白色（橘黑云纹印花）半盔，身穿象牙白紧身露脐背心与炭黑色高腰防磨短裤，踩着亮橘/炭黑色棋盘格“CHASE”滑板。
    *   **女孩 B**：黑色直短发，戴哑光冷灰色（深蓝与薄荷绿几何线）半盔，身穿鼠尾草绿/薄荷灰紧身露脐短袖T恤与深蓝色百褶短裙，踩着深蓝/薄荷绿双拼“FUTURE”滑板。
*   **表情与互动集成**：两人在高速并行中转头相视大笑，手臂微微依靠在一起，呈现极佳的运动默契与青春活力。
*   **美术调性**：清晨的金色阳光照射，带有耀眼的侧逆光边缘光，3D 皮克斯动画电影风格，PBR 材质，高速运镜下的轻微背景动态模糊。

---

## 2. 生成提示词 (Master Prompt)

### 💡 提示词 (Prompt)
```text
Master concept keyart of two 18-year-old Chinese girl skateboarders racing downhill side-by-side on a winding mountain asphalt road, slender and curvy athletic sporty figures, perfect S-curve body shapes. Girl A on the left has a dark chestnut high ponytail and air bangs, wearing a glossy white open-face half-shell sport helmet with neon orange and charcoal black cloud prints (no visor), a tight ivory white sporty crop tank top with neon orange edge trim exposing her slim waist and toned stomach, high-waisted charcoal black active mini shorts highlighting her long slender legs and curvy hips, white skate shoes with cream beige socks, sliding on a custom neon-orange and charcoal black checkered skateboard. Girl B on the right has a black bob-cut short hair, wearing a matte cool grey open-face half-shell helmet with midnight navy and mint green tech-line decals, a tight-fit sage green crop sport tee exposing her slim waist, a high-waisted midnight navy pleated active tennis skirt with a white waistband highlighting her long shapely legs and curvy S-curve hips, navy skate shoes with black socks, sliding on a custom midnight navy and mint green split-color skateboard. They are sliding close together, shoulder-to-shoulder, looking at each other with wide energetic smiles and clear facial expressions under the helmet. The background is a scenic windy asphalt mountain road with a metal guardrail, surrounded by green pines and morning mist. Cinematic panning action shot with dynamic motion blur in the background, low-angle board-chase perspective. Low-angle golden morning sunlight casting long shadows and glowing edges. 3D animated feature film render, Disney Pixar style, high-end PBR materials, detailed clothing fabric and skateboard truck metals, vivid color scripting, 8k resolution --ar 16:9 --v 6.0
```

### 🚫 负向提示词 (Negative Prompt)
```text
photorealistic, real human, covering face, full-face helmet, shield visor, motorcycle helmet, baggy clothing, fat waist, fat thighs, weapons, street combat, dark, moody, low resolution, text labels, watermark, logo, split screen
```
