# scene-publish-review 输出协议

本文件定义 `scene-publish-review` 的发布物分类、补丁结构、复盘边界和落盘路径。

## 阶段补丁壳

```yaml
patch_type: scene-publish-review
stage: scene-publish-review
version: 1
status: pending | in_progress | completed | blocked | skipped
updated_at:
summary:
board_updates:
  state:
  routing:
  project_config:
  confirmations:
  active_versions:
  stage_index:
  cross_stage_summary:
  read_policy:
files_created:
  - path:
    purpose:
    version:
files_updated:
  - path:
    purpose:
    version:
next_action:
```

## 上游输入

本阶段默认消费以下结果：

- `scene-video-prompt-builder`：`prompt_pack_version`、提示词交付文件索引、review 结果、`consistency_rules`、`audio_rules`、`readiness_notes`
- 黑板索引：`project_config.performance_style`、`stage_index.video_prompts.files`、`stage_index.video_prompts.summary`

## 风格与表达规则

发布文案和复盘摘要应延续`project_config.performance_style` 的中文表达，但正式对外措辞继续使用通用动画电影化语言，不直接写具体品牌名。

例如：

- 可写“鬼畜离谱化 3D 动画搞笑改编”
- 不建议写“Pixar 官方风格”或“皮克斯同款”

## 输出内容

- 标题
- 封面文案
- 平台发布文案
- 评论区引导
- 字幕 / 配音文案
- 发布后数据复盘
- 资产沉淀建议

## 阶段正文结构

下文结构用于阶段正式产物文件，例如 `details/`、`outputs/` 或 `inputs/` 中的 primary/handoff 文件；不得直接作为黑板正文回写。黑板只写 `board_updates`、文件索引和摘要。

```yaml
data:
  publish_pack_version:
  source_video_prompt_files:
    zh_full:
    en_full:
    zh_segment_copy_ready:
    en_segment_copy_ready:
  delivery_readiness_checked: false
  publish_files:
    - file:
      platform:
      purpose:
  subtitle_or_voice_file:
  review_status:
  review_summary:
  asset_rollup_suggestions:
    characters:
    scenes:
    props:
  risk_notes:
  next_action:
```

### 字段说明

- `publish_pack_version`：本次发布物版本号。
- `source_video_prompt_files`：发布阶段引用的最终视频提示词交付物。默认读取`stage_index.video_prompts.files`。
- `delivery_readiness_checked`：发布阶段是否已确认 `stage_index.video_prompts.files.quality_check` 指向的 review 文件里 `final_delivery_ready = true`。
- `publish_files`：标题、封面文案、平台文案等文件列表。
- `subtitle_or_voice_file`：字幕或配音文案路径。
- `review_status`：复盘状态，建议使用 `pending / published / reviewed`。
- `review_summary`：发布后数据或复盘摘要。
- `asset_rollup_suggestions`：建议沉淀回资产库的角色、场景、道具清单。
- `risk_notes`：发布表达与复盘风险提示。
- `next_action`：后续动作，例如归档或继续复盘。

### 文件列表结构

```yaml
- file:
  platform:
  purpose:
```

`platform` 可写：

- `generic`
- `xiaohongshu`
- `douyin`
- `bilibili`
- `x`

## 目录规则

最终发布文案统一写入：

- `outputs/publish_copy/`

如需补充复盘记录，可写入：

- `details/review_v*.md`

## 黑板摘要建议

黑板补丁至少应说明：

- 发布前是否确认视频提示词已通过自动 review
- 发布阶段引用了哪些最终提示词文件
- 已生成哪些平台发布物
- 发布后复盘状态
- 是否建议沉淀为角色、场景或道具资产

`summary` 使用中文；如需标明风格，可带英文参数值。

## 阻塞规则

- 只要能产出一版可发布文本包，且视频提示词已通过自动 review，就不应阻塞。
- 即使发布后复盘数据还未完整回流，也可以先完成“发布”状态。
- 若 review 文件中的 `final_delivery_ready != true`，应视为上游未就绪，而不是静默继续发布阶段。
- 只有在发布表达明显越过风险边界，或最终发布物目录和内容范围无法确定时，才使用 `status: blocked`。

## 示例

```yaml
patch_type: scene-publish-review
stage: scene-publish-review
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）发布文案已生成，发布状态已完成（`published`），待后续补充完整复盘。
board_updates:
  state:
    project_status: published
  stage_index:
    publish:
files_created:
  - path: outputs/publish_copy/title_cover_v1.md
    purpose: 发布文案示例
    version: v1
files_updated:
  - path: projects/<project>/PROJECT_BOARD.md
    purpose: 发布阶段索引更新
    version: v1
next_action: 若上线后数据达标，补写 review_v1.md 并推进到 reviewed。
data:
  publish_pack_version: v1
  publish_files:
    - file: outputs/publish_copy/title_cover_v1.md
      platform: generic
      purpose: 标题与封面文案
    - file: outputs/publish_copy/douyin_publish_v1.md
      platform: douyin
      purpose: 抖音发布文案与评论区引导
    - file: outputs/publish_copy/bilibili_publish_v1.md
      platform: bilibili
      purpose: B站发布文案
  subtitle_or_voice_file: outputs/publish_copy/voice_subtitle_v1.md
  review_status: published
  review_summary: 首轮发布文案已齐备，待上线后补充播放、完播和互动数据复盘。
  asset_rollup_suggestions:
    characters:
      - 孙悟空夸张搞笑版可考虑沉淀为系列角色资产变体
    scenes:
      - 妖洞内部轻量场景锁定卡可升级为正式场景资产
    props:
      - 暂无新增核心道具沉淀建议
  risk_notes:
    - 发布标题与封面措辞仍需避免直接绑定具体影视版本名称做强引导。
  next_action: 若上线后数据达标，补写 review_v1.md 并推进到 reviewed。
```

## 阶段推进建议

- 发布完成后可推进到 `published`
- 复盘完成后可推进到 `reviewed`
