Status: pending

# Issue 25: 声音导演阶段产物规范化与落盘 (Audio Stage Deliverables Rectification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在 `projects/worldcup001` 下，依据声音导演的 Skill 协议合规要求，进行配音、配乐、拟音及混音规划设计，并进行长内容分离落盘。

任务包括：
1. 编写包含语速气口、主旋律及环境设计的 `details/audio_plan_v1.md`。
2. 在 `outputs/audio/` 下产出独立音乐提示词 `music_prompt_v1.md`、拟音提示词 `foley_prompt_v1.md` 和混音时间轴 `audio_mix_plan_v1.md`（定义心跳、脚步、哨声等声音与画面的同步点）。
3. 规范化重写 `outputs/audio_pack_001.md` 元描述文件。

## 验收标准

- [ ] 生成 `details/audio_plan_v1.md`，情绪曲线与静默点设计到位。
- [ ] 产出 `outputs/audio/` 目录下的三份独立声音提示词与混音计划。
- [ ] 重写 `outputs/audio_pack_001.md` 且通过 CLI 验证命令：`node ../../packages/engine/dist/cli.js validate --stage audio`。

## 被阻塞于

- [Issue 24: 分镜故事板阶段产物规范化与落盘](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/24-storyboard-stage-deliverables-rectification.md)
