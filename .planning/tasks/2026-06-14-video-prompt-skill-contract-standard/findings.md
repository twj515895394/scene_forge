# Findings

## 2026-06-14

- `scene-video-prompt-builder/SKILL.md` 约 198 行，承载了大量流程、review 和输出协议。
- `references/output-contract.md` 约 1124 行，适合保留为完整协议，但不适合作为主入口全部加载后执行。
- 既有 output-contract 指定默认输出路径为 `outputs/video_prompts/视频提示词_第01包_中文_v*.md` 与英文 pack 文件。
- 当前 validator 主要做 marker 检查，需要补真实交付文件、manifest、board 索引、pack 体裁和确认闸口检查。
