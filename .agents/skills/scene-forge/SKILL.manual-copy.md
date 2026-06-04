---
name: scene-forge
manual_copy_target: .agents/skills/scene-forge/SKILL.md
description: SceneForge 总控手工镜像文件。主规范以 SKILL.md 为准。
---

# scene-forge manual copy

本文件仅作为 `SKILL.md` 的手工镜像占位。

当前有效规范：

- 以 `.agents/skills/scene-forge/SKILL.md` 为唯一主入口
- 使用 v8 轻黑板协议
- 总控只读取和更新：
  - `state`
  - `routing`
  - `project_config`
  - `confirmations`
  - `active_versions`
  - `stage_index`
  - `cross_stage_summary`
  - `read_policy`
  - `stage_patches`
- 总控只执行 `state.next_stage`
- 子 Skill 只返回 `board_updates` 和文件索引，不直接重写整份黑板

若本文件与 `SKILL.md` 不一致，一律以 `SKILL.md` 为准。
