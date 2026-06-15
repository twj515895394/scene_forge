# 故事板 Prompt 模板

`outputs/storyboard_prompts/*_prompt_v*.md` 必须使用整板故事板 prompt 体裁。文件应可整份复制给 `gpt-image2`。

## 必须使用的章节

```markdown
# 故事板整板 Prompt

## 复制专用主 Prompt

生成一张 [N] 格故事板总板，使用项目已确认的正式视觉风格。

画面区占整板约 70% 到 80%，底部控制轨道区占约 20% 到 30%。

必须保持同一角色、同一场景、同一道具状态连续。

## Control-Oriented Storyboard Board

控制板是后续视频生成的默认主参考板，优先服务动作、镜头调度、空间连续性和状态继承。控制板必须镜头语言专业、画面不重叠、分镜工整，不能为了风格表现牺牲动作可读性。

### Panel Layout

- 每格边界清晰，画面不重叠，不出现多格互相压住主体的情况。
- 每格下方轨道栏对齐，文字短而清楚，不遮挡画面主体。
- 每个分镜画面区内部必须直接标注运动箭头；箭头不得只放在底部控制轨道栏，轨道栏只能补充说明。
- 红色箭头画在角色或动作路径旁，表示人物运动方向；红色箭头不得遮挡角色脸部、关键道具或主体动作。
- 蓝色摄影机箭头 / 蓝色镜头图标画在画面边缘或镜头路径旁，表示摄影机运动方向；蓝色箭头不得遮挡主体动作。
- 若某格无人物移动或无摄影机运动，必须在该格底部轨道栏标注“人物静止”或“固定机位”。

### Beat Line

### Camera Path

- 使用蓝色镜头 / 蓝色摄影机箭头标注摄影机运动方向。
- 摄影机运动方向与人物运动方向分开标注，不混用颜色。
- 蓝色摄影机箭头必须出现在对应分镜画面区内部，轨道栏只负责解释镜头运动类型。

### Action Path

- 使用红色箭头标注人物运动方向。
- 红色箭头只能表达角色或核心动作路径，不用于摄影机运动。
- 红色人物运动箭头必须出现在对应分镜画面区内部，轨道栏只负责解释动作路径。

### Rhythm Track

### State Track

### Continuity Rules

### Color Legend

- 红色箭头 = 人物运动方向。
- 蓝色镜头 / 蓝色箭头 = 摄影机运动方向。
- 轨道栏颜色说明必须清晰可读。

## Style & Rendering Storyboard Board

### Visual Style

### Character Rendering

### Scene Rendering

### Lighting

### Motion / Effects

### Final Quality Constraints
```

## 拆包规则

- `total_shots <= 12` 时可单包。
- `total_shots > 12` 时必须多包。
- 多包时每个 pack 都必须保留完整三段结构。

## 语言要求

- 默认中文。
- 英文术语可保留用于模型控制，例如 `Control-Oriented Storyboard Board`。

## 禁止形态

不要把正式 prompt 写成逐镜头表格：

```text
Seg | Shot | Prompt EN | Prompt CN | Continuity
```

这类内容只能作为内部 shotlist 或附录，不是正式故事板 prompt 主交付。
