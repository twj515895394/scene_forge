# scene-design-builder Workflow

## 1. 入口检查

- 读取 `PROJECT_BOARD.md`。
- 确认 `confirmations.style_family_confirmed.status` 与 `confirmations.style_confirmed.status`。
- 确认 `project_config.style_family`、`director_style_id`、`style_profile_path` 已存在。
- 确认 assets 阶段已完成并有可读资产复用结论。
- 快速执行模式下确认 `confirmations.design_confirmed.status` 不应在正式完成时保持 `pending`。

## 2. 读取输入

按紧凑预算读取：

- reference boundary。
- story development。
- asset checker 输出。
- 当前风格包 `profile.md`、`visual_language.md`、`lighting_language.md`。
- 表现力扩展资产库中与当前设计决策有关的章节。

## 3. 生成预览

预览必须包含：

- 角色方向候选。
- 场景与关键道具清单。
- 统一视觉语言基线。
- 参考强度。
- 角色/场景/道具输出清单。
- `expressive_animation_design` 是否启用。
- 是否需要空间站位图和全场景资产总参考图。

## 4. 正式生成

用户确认后，按以下顺序生成：

1. `visual_language` baseline
2. `expressive_animation_design`
3. character design bible files
4. scene design file
5. prop design file
6. space continuity seed
7. character bible sheet prompt
8. scene / prop / master reference prompts
9. design review

## 5. 落盘与注册

正式完成前必须：

- 写入 `outputs/design.md`。
- 写入 `details/design/*`。
- 写入 `outputs/design_prompts/*`。
- 在 `artifacts.manifest.yaml` 注册上述文件。
- 在 `PROJECT_BOARD.md stage_index.design.files` 注册 primary、details、outputs。

## 6. 完成前校验

- 运行 `node ../../packages/engine/dist/cli.js validate --stage design`。
- validator 失败时按错误补结构，不推进阶段。
- 校验通过后才能交回总控推进至 script。
