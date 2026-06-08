# 全场景资产与站位总参考提示词 (Master Scene-Prop Reference) v1.0

本文件定义了用于生成全场景角色与道具站位总参考图（Master Scene-Prop Reference Board）的最终提示词。此提示词面向图像生成模型，用于直观确立主罚任意球时，总裁、足球、人墙、门将及比分板 HUD 在海滨竞技场大禁区内的相对空间距离与左右朝向轴线。

---

## 1. 空间站位图提示词 (Master Blocking & Faction Layout Prompt)

### 中文提示词 (Chinese Prompt)
```text
高角度俯视大禁区全景空间站位图，皮克斯3D卡通动画电影风格，温暖黄昏落日逆光，海滨竞技场大禁区。
画面展示清晰的三维 blocking 角色与道具相对位置布局：
1. 【总裁 (RED #7)】：位于画面前方原点（大禁区弧顶外侧），倒三角健壮体型男射手，穿着红衣绿边7号球衣，双手叉腰站立，右裤脚拉起；其双脚站在草地上一条手画的裁判白色喷雾折线后方；
2. 【星纹像素足球】：静止于总裁前方 1.5 米的喷雾线中央；
3. 【白色人墙 (WHT Wall)】：并排 5 名身穿纯白球衣的扁平方正男防守队员，站立在足球前方 9.15 米的禁区线外沿，并拢护裆；
4. 【门将鸭哥 (WHT GK)】：身穿灰黄条纹球衣，戴着巨大橙色手套，张开双臂微蹲防守在球门线上；
5. 【比分大屏 HUD】：挂在球门上方后方的高空大看板上，显示亮黄色霓虹灯文字“RED 2 - 3 WHT”和“TIME: 88:00”。
三维空间布局，透视线分明，探照灯白蓝色光束扫射，落日余晖的金色 rim 轮廓光将每个角色的边缘照亮，高保真电影级渲染。 --ar 16:9 --v 6.0
```

### 英文提示词 (English Prompt)
```text
A high-angle bird's-eye view camera shot of a soccer penalty area blocking map, nickname "Coastal Arena", in Pixar and Disney 3D CGI animation style, sunset golden lighting.
The image shows the precise spatial layout and blocking coordinates of characters and props:
1. ["President" RED #7]: Standing at the foreground origin (outside the penalty arc), heroic inverted triangle body shape, wearing a plain red jersey with gold number 7, hands on hips, right shorts leg pulled up, standing behind a hand-drawn judges white spray line on the grass.
2. [Pixel Star Football]: Lying stationary on the white spray line, 1.5 meters in front of the President.
3. ["White Wall" WHT Wall]: A group of 5 boxy male defenders in solid white jerseys, standing shoulder-to-shoulder, 9.15 meters in front of the football, cowering and protecting their groins.
4. ["Yage" WHT GK]: Slender goalkeeper in a gray-and-yellow vertical striped jersey, wearing massive orange goalkeeper gloves, squatting on the goal line 16.5 meters away with arms spread wide.
5. [Scoreboard HUD]: Suspended high above the goal, showing glowing neon text "RED 2 - 3 WHT" and "TIME: 88:00".
Clear three-dimensional spatial blocking, strong sunset golden rim light highlighting each character's edges, cyan searchlights beams scanning, volumetric render. --ar 16:9 --v 6.0
```
