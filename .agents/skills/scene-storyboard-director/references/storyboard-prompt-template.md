# Storyboard Prompt Template

`outputs/storyboard_prompts/*_prompt_v*.md` 必须使用整板故事板 prompt 体裁。文件应可整份复制给 `gpt-image2`。

## Required Sections

```markdown
# 故事板整板 Prompt

## 复制专用主 Prompt

生成一张 [N] 格故事板总板，使用项目已确认的正式视觉风格。

画面区占整板约 70% 到 80%，底部控制轨道区占约 20% 到 30%。

必须保持同一角色、同一场景、同一道具状态连续。

## Control-Oriented Storyboard Board

### Panel Layout

### Beat Line

### Camera Path

### Action Path

### Rhythm Track

### State Track

### Continuity Rules

## Style & Rendering Storyboard Board

### Visual Style

### Character Rendering

### Scene Rendering

### Lighting

### Motion / Effects

### Final Quality Constraints
```

## Pack Rule

- `total_shots <= 12` 时可单包。
- `total_shots > 12` 时必须多包。
- 多包时每个 pack 都必须保留完整三段结构。

## Language

- 默认中文。
- 英文术语可保留用于模型控制，例如 `Control-Oriented Storyboard Board`。

## Forbidden Shape

不要把正式 prompt 写成逐镜头表格：

```text
Seg | Shot | Prompt EN | Prompt CN | Continuity
```

这类内容只能作为内部 shotlist 或附录，不是正式故事板 prompt 主交付。
