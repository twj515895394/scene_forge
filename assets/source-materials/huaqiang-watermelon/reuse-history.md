# 《华强买瓜》经典桥段资产复用历史 (reuse-history.md)

本文件记录全局复用资产 `huaqiang-watermelon` 在不同项目中的实际引用、改编情况与复用模式。

---

## 1. 资产基本引用规则

在项目 `PROJECT_BOARD.md` 的 `source_asset_ref` 或相关阶段中引用本资产时，需指定复用模式 `reuse_mode`：
*   `direct_reference`：经典复刻模式。完全保留原片的人物身份、服装轮廓和动作逻辑，仅使用 3D 动画电影风格重制。
*   `adapted_reference`：混合改编模式。保留核心冲突、台词和剧情骨架，但对角色身份（如动物化）、场地、道具物理反应（如去害化高潮）进行跨界改编。
*   `structure_only`：纯结构复用模式。仅抽取“挑衅、揭发欺诈、高潮反击”的冲突模型，内容完全重做。

---

## 2. 复用历史记录表

| 记录日期 | 引用项目ID | 项目路径 | 复用模式 | 改编方向说明 | 资产状态 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-06-05 | `huaqiang-watermelon-animal` | `projects/huaqiang-watermelon-animal/` | `adapted_reference` | 角色拟人动物化（平头哥蜜獾、恶霸犬、土拨鼠），高潮暴力动势改为去害化的西瓜汁爆破，摊主被当场冲晕，小弟哭嚎“萨日朗”反差谢幕。 | `in_progress` / 推进中 |
| 2026-06-01 | `huaqiang-watermelon` | `projects/huaqiang-watermelon/` | `adapted_reference` | 人类角色 3D 动画化改编，采用部分改写及 10 秒短视频分段结构，高潮部分同样做去害化物理反馈设计。 | `completed` / 提示词已完成 |
| 2026-06-01 | `huaqiang-watermelon-40s` | `projects/huaqiang-watermelon-40s/` | `adapted_reference` | 人类角色 3D 动画化改编，针对 40 秒视频生成结构组织 8 镜头分镜与配音/拟音/音乐全案设计。 | `completed` / 提示词已完成 |
