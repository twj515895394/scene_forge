# Storyboard 阶段强制交付清单

本文件是从 `scene-storyboard-director` 既有阶段规则和 `references/output-contract.md` 抽出的交付清单，不以任何单个项目产物作为模板来源。

Storyboard 阶段完成时，以下文件必须真实存在、写入 manifest，并进入 `PROJECT_BOARD.md stage_index.storyboard.files`。

## 主交付

```text
outputs/storyboard_pack_*.md
```

必须包含：

- `storyboard_prompt_pack`
- `beat_skeleton`
- `storyboard_content_breakdown`
- `cinematic_language_plan`
- `video_generation_units`
- `shot_continuity_plan`
- `continuity_control_system`
- `storyboard_prompt_pack_plan`
- `storyboard_quality_check`
- `control_storyboard_file`
- `styled_storyboard_file`
- `control_storyboard_prompt_file`
- `styled_storyboard_prompt_file`

## 细节文件

```text
details/storyboard/beat_skeleton_v*.md
details/storyboard/video_generation_units_v*.md
details/storyboard/shot_continuity_plan_v*.md
details/storyboard/storyboard_quality_check_v*.md
details/storyboard/design_reconciliation_review_v*.md
```

按需生成；默认并入 `outputs/storyboard_pack_*.md` 的对应 section：

```text
details/storyboard/storyboard_content_breakdown_v*.md
details/storyboard/cinematic_language_plan_v*.md
details/storyboard/space_continuity_map_v*.md
```

## 故事板 Prompt 输出

```text
outputs/storyboard_prompts/control_storyboard_prompt_v*.md
outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
```

每个正式 prompt 文件必须是整板故事板 prompt，不是逐镜头平台 prompt 清单。

必须包含：

- `复制专用主 Prompt`
- `Control-Oriented Storyboard Board`
- `Style & Rendering Storyboard Board`

## 黑板索引

`PROJECT_BOARD.md` 必须同步：

```yaml
stage_index:
  storyboard:
    files:
      primary: outputs/storyboard_pack_*.md
      details:
        - details/storyboard/beat_skeleton_v*.md
        - details/storyboard/video_generation_units_v*.md
        - details/storyboard/shot_continuity_plan_v*.md
        - details/storyboard/design_reconciliation_review_v*.md
      outputs:
        - outputs/storyboard_pack_*.md
        - outputs/storyboard_prompts/control_storyboard_prompt_v*.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v*.md
      quality_check: details/storyboard/storyboard_quality_check_v*.md
```

## 禁止完成的情况

不得把以下情况标记为 completed：

- 只在主文件里写了 prompt 文件路径，但文件不存在。
- 文件存在但未注册 manifest。
- board 没有索引 details / outputs / quality_check。
- prompt 文件缺少正式三段结构。
- 缺少 storyboard 完成后的设计回看文件。
- 快速模式下用户尚未确认 storyboard 方案。
