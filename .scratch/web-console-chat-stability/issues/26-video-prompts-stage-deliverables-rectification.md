Status: pending

# Issue 26: 视频提示词阶段产物规范化与落盘 (Video Prompts Stage Deliverables Rectification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，根据视频提示词构建 Skill 的合规要求，生成符合 4层大块结构的导演长版双语提示词，并完成防触发审核的安全规避。

任务包括：
1. 在 `outputs/video_prompts/` 目录下产出 `视频提示词_导演长版_中文_v1.md` 与 `视频提示词_导演长版_英文_v1.md`。
2. 双语提示词正文必须严格由 `global_execution_preamble`、`project_level_global_rules`、`segment_technical_control_block` 和 `shot_by_shot_director_prompt` 四部分构成。
3. 提示词内容中去除敏感安全词与版权专有名词（如 FIFA、世界杯等在投喂模型段中修改为抽象词汇）。
4. 产出独立可直接复制块，省去手动拼接动作。
5. 生成质量检查自检文件 `outputs/video_prompts/quality_check_v1.md`，并在自检合格后写入 `final_delivery_ready = true`。
6. 规范化重写 `outputs/video_prompts_pack_001.md` 元描述文件。

## 验收标准

- [ ] 产出 `outputs/video_prompts/` 下的中文与英文导演长版主交付文件。
- [ ] 导演长版内含 4 层结构且过滤了敏感版权词。
- [ ] 生成 `outputs/video_prompts/quality_check_v1.md` 且其内部标识 `final_delivery_ready` 值为 `true`。
- [ ] 重写 `outputs/video_prompts_pack_001.md` 且通过 CLI 验证命令：`node ../../packages/engine/dist/cli.js validate --stage video_prompts`。

## 被阻塞于

- [Issue 25: 声音导演阶段产物规范化与落盘](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/25-audio-stage-deliverables-rectification.md)
