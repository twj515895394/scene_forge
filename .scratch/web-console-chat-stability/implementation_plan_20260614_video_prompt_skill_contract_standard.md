# Video Prompt Builder Skill Contract Standard Implementation Plan

## 背景

`scene-video-prompt-builder` 与 storyboard 阶段存在同类风险：

- `SKILL.md` 承载了大量流程、字段、review、禁止项和输出规则。
- `references/output-contract.md` 信息量很大，执行时容易被压缩成 marker 级输出。
- engine validator 目前主要检查关键 marker，尚未检查真实交付文件、manifest、board 索引、pack 对齐和可直接复制使用块。

## Source of Truth

本方案的 video_prompts 落盘产物与内容要求只来自：

- `.agents/skills/scene-video-prompt-builder/SKILL.md` 的既有阶段规则
- `.agents/skills/scene-video-prompt-builder/references/output-contract.md` 的既有输出协议

任何现有项目产物仅可作为漏检样本，不作为新交付模板来源。

## 目标

建立第二个可复用 SceneForge skill 重构样板，并应用到 `scene-video-prompt-builder`：

1. `SKILL.md` 保持短小，只保留触发、读取边界、执行顺序、强制交付清单和引用入口。
2. 长规则拆入 `references/`，按职责分类。
3. validator 检查真实视频提示词交付文件、manifest 注册、board 索引、review 文件、pack 体裁和确认闸口。
4. 不修改任何真实项目产物。

## Skill 标准结构

```text
scene-video-prompt-builder/
├── SKILL.md
├── references/
│   ├── workflow.md
│   ├── required-deliverables.md
│   ├── review-checklist.md
│   ├── video-prompt-template.md
│   └── output-contract.md
```

## Video Prompts 强制交付

基于既有 output-contract，本阶段默认按故事板 pack 对齐输出：

- `outputs/video_prompts/视频提示词_第01包_中文_v*.md`
- `outputs/video_prompts/视频提示词_第01包_英文_v*.md`
- `details/video_prompts/video_prompt_review_v*.md`

如用户明确需要整片汇编版，才额外输出：

- `outputs/video_prompts/视频提示词_导演长版_中文_v*.md`
- `outputs/video_prompts/视频提示词_导演长版_英文_v*.md`

如用户明确要求按段单独落文件，才额外输出 segment 文件。

## Validator 加固

- 检查中文 / 英文 pack 文件是否真实存在并注册。
- 检查 review / auto-fix 结果文件是否真实存在并注册到 board quality_check。
- 检查 board `stage_index.video_prompts.files.outputs / details / quality_check` 是否可追踪。
- 检查快速模式下 `video_prompt_plan_confirmed.status` 不是 pending。
- 检查正式 pack 文件包含四层强结构：
  - `global_execution_preamble`
  - `project_level_global_rules`
  - `segment_technical_control_block`
  - `shot_by_shot_director_prompt`
- 检查正式 pack 文件包含：
  - `video_prompt_pack_plan`
  - `pack_audio_execution_plan`
  - `segment_sound_execution`
  - `prompt_trace`
  - `video_prompt_review`
  - `可直接复制使用块`
- 检查 `segment_sound_execution` 覆盖 `BGM / Foley-SFX / Ambience / Silence`。

## 验证

- `pnpm --filter @scene-forge/engine build`
- `pnpm --filter @scene-forge/engine test`
- `pnpm --filter @scene-forge/web-console build`

## 不做

- 不修复或补全任何真实项目。
- 不推进任何真实项目状态。
- 不把旧产物迁移成新结构。
