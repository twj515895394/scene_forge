# Storyboard Skill Contract Standard Implementation Plan

## 背景

`worldcup003` 暴露出 storyboard 阶段仍可能生成“看似包含规范字段、但正式产物不完整”的结果：

- 主文件包含 `beat_skeleton`、`video_generation_units` 等 marker，因此当前 validator 通过。
- 但 `outputs/storyboard_prompts/*` 只在正文中声明，实际没有落盘。
- `details/storyboard/*`、质量检查文件、正式整板 prompt 文件没有注册到 manifest，也没有进入 `PROJECT_BOARD.md stage_index.storyboard`。
- `storyboard_plan_confirmed` 仍为 pending，阶段却被推进到 completed。

这说明问题不只是旧产物缺失，而是 skill 组织方式和 review/validator 契约都需要加强。

## 目标

建立一个可复用的 SceneForge skill 重构标准，并先应用到 `scene-storyboard-director`：

1. `SKILL.md` 保持短小，只保留触发、读取边界、执行顺序、强制交付清单和引用入口。
2. 长规则拆入 `references/`，按职责分类。
3. validator 不只检查 marker，还检查真实文件、manifest 注册、board 索引和正式 prompt 体裁。
4. 不修改 `projects/worldcup003` 产物，让用户重新手动测试生成链路。

## Source of Truth

本方案的 storyboard 落盘产物与内容要求只来自：

- `.agents/skills/scene-storyboard-director/SKILL.md` 的既有阶段规则
- `.agents/skills/scene-storyboard-director/references/output-contract.md` 的既有输出协议

`worldcup003` 仅用于定位当前程序漏检点，不作为新交付标准或内容模板来源。

## Skill 标准结构

```text
scene-xxx/
├── SKILL.md
├── references/
│   ├── workflow.md
│   ├── required-deliverables.md
│   ├── review-checklist.md
│   ├── storyboard-prompt-template.md
│   └── output-contract.md
```

`SKILL.md` 只做路由和程序性约束：

- 何时使用
- 必读文件
- 阶段步骤
- 正式落盘前必须通过 review
- 必须生成哪些文件
- 失败时不得推进状态

## Storyboard 强制交付

- `outputs/storyboard_pack_*.md`
- `details/storyboard/beat_skeleton_v*.md`
- `details/storyboard/video_generation_units_v*.md`
- `details/storyboard/shot_continuity_plan_v*.md`
- `details/storyboard/storyboard_quality_check_v*.md`
- `outputs/storyboard_prompts/control_storyboard_prompt_v*.md`
- `outputs/storyboard_prompts/styled_storyboard_prompt_v*.md`
- 至少一个可直接复制给 `gpt-image2` 的整板 prompt 文件，包含：
  - `复制专用主 Prompt`
  - `Control-Oriented Storyboard Board`
  - `Style & Rendering Storyboard Board`

## Validator 加固

- 只在 storyboard 阶段启用。
- 检查声明的正式 prompt 文件是否真实存在并注册。
- 检查 manifest 是否包含 `details/storyboard/*` 与 `outputs/storyboard_prompts/*`。
- 检查 board `stage_index.storyboard.files.details / outputs / quality_check` 是否可追踪。
- 检查快速模式下 `storyboard_plan_confirmed.status` 不是 pending。
- 检查正式 prompt 文件包含三段固定交付结构。

## 验证

- `pnpm --filter @scene-forge/engine build`
- `pnpm --filter @scene-forge/engine test`
- `pnpm --filter @scene-forge/web-console build`

## 不做

- 不修复或补全 `projects/worldcup003`。
- 不推进任何真实项目状态。
- 不把旧产物迁移成新结构。
