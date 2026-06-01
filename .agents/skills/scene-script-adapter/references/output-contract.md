# scene-script-adapter 输出协议

本文件定义 `scene-script-adapter` 的改编档位、补丁结构、黑板摘要边界和长正文落盘方式。

## 阶段补丁壳

```yaml
patch_type: scene-script-adapter
version: 1
status:
updated_at:
summary:
data:
```

## 改编档位

- `original_preserve`
- `mostly_preserve`
- `partial_rewrite`
- `reconstruct_expand`

## 演绎风格

由本阶段最终确认并写入顶层 `performance_style`：

- `cinematic_serious`
- `cinematic_comedy`
- `exaggerated_comedy`
- `absurd_chaotic`

## `data` 结构

```yaml
data:
  adaptation_level:
  performance_style:
  script_summary:
  preserved_elements:
    - category:
      note:
  rewritten_elements:
    - category:
      note:
  scene_beats:
    - beat_id:
      beat_summary:
      visual_focus:
      emotion_goal:
  script_file:
  storyboard_hints:
    pacing_note:
    acting_note:
    visual_escalation_note:
  risk_notes:
  next_action:
```

### 字段说明

- `adaptation_level`：本次最终改编档位。
- `performance_style`：本次最终演绎风格，同时回写顶层。
- `script_summary`：供黑板与后续阶段读取的剧本摘要。
- `preserved_elements`：必须保留的内容列表。
- `rewritten_elements`：本次主动重写或强化的内容列表。
- `scene_beats`：面向分镜阶段的关键节拍列表。
- `script_file`：完整剧本正文路径。
- `storyboard_hints`：交给 `scene-storyboard-director` 的节奏、表演、视觉升级提示。
- `risk_notes`：风险提示列表。
- `next_action`：下一阶段执行提示。

### 轻结构约束

`preserved_elements` 与 `rewritten_elements` 使用同一轻结构：

```yaml
- category:
  note:
```

推荐分类：

- `台词表达`
- `情绪核心`
- `剧情骨架`
- `动作设计`
- `角色反应`
- `喜剧机制`
- `节奏推进`

### `scene_beats` 结构

```yaml
scene_beats:
  - beat_id:
    beat_summary:
    visual_focus:
    emotion_goal:
```

说明：

- `beat_id`：节拍编号，如 `B1`、`B2`
- `beat_summary`：该节拍发生什么
- `visual_focus`：后续分镜最该抓的画面焦点
- `emotion_goal`：该节拍要传达的情绪或喜剧效果

## 黑板摘要建议

黑板补丁至少应说明：

- 本次改编档位
- 最终演绎风格
- 剧本摘要
- 关键保留点
- 关键重写点
- 完整剧本正文路径
- 分镜阶段的关键节拍提示

## 摘要显示规则

- `summary` 使用中文
- 关键档位和演绎风格建议采用“中文显示名（英文参数值）”

示例：

- 本次采用部分改写型（`partial_rewrite`）并最终确认为鬼畜离谱化（`absurd_chaotic`）路线。

## 长正文落盘

完整剧本写入：

- `details/script_v*.md`

黑板只保留摘要和路径，不直接塞完整正文。

## 阻塞规则

- 只要能明确给出改编档位、演绎风格和可执行的剧本主线，就不应阻塞。
- 即使完整台词还需后续润色，也可以先完成本阶段。
- 只有在参考边界冲突、无法决定保留与重写范围时，才使用 `status: blocked`。

## 示例

```yaml
patch_type: scene-script-adapter
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次采用部分改写型（`partial_rewrite`），并最终确认为夸张搞笑化（`exaggerated_comedy`）路线，完整剧本已落盘。
data:
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  script_summary: 保留三打白骨精的基础冲突结构，强化误会升级、夸张反应和喜剧节奏停顿。
  preserved_elements:
    - category: 情绪核心
      note: 保留孙悟空识破伪装但不被理解的委屈与急切。
    - category: 剧情骨架
      note: 保留白骨精连续试探与团队误判的主结构。
  rewritten_elements:
    - category: 角色反应
      note: 强化唐僧与八戒的夸张误解反应，提升喜剧反差。
    - category: 节奏推进
      note: 加入更明显的停顿、误会升级和快速反转。
  scene_beats:
    - beat_id: B1
      beat_summary: 白骨精首次伪装接近，悟空立即警觉。
      visual_focus: 悟空的表情预判与其他角色的迟钝反应反差。
      emotion_goal: 建立轻松悬疑里的喜剧张力。
    - beat_id: B2
      beat_summary: 悟空出手后解释失败，团队误会升级。
      visual_focus: 唐僧与八戒的夸张震惊反应。
      emotion_goal: 放大委屈感和误会喜剧。
  script_file: details/script_v1.md
  storyboard_hints:
    pacing_note: 每次误会升级前留出明显停顿，方便分镜做喜剧节奏断点。
    acting_note: 强化悟空的无奈、八戒的咋呼、唐僧的错愕对比。
    visual_escalation_note: 每一轮冲突都比上一轮更夸张，形成层层升级。
  risk_notes:
    - 夸张反应不能滑向具体影视演员模仿。
  next_action: 进入 scene-storyboard-director，按 B1-B2-B3 节拍组织镜头升级。
```

## 阶段推进建议

- `project_status: script_ready`
- `next_stage: scene-storyboard-director`
- 顶层写入 `adaptation_level`
- 顶层写入 `performance_style`
