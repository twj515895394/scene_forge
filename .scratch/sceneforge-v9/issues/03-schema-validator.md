Status: ready-for-agent

# Issue 03: 开发硬性校验规则引擎 (Schema & Semantic Validator)

## 背景

阶段产物的具体要求（如 storyboard 双版 prompt、音频执行块等）分散在 prose 规则文档中，AI 极易在长上下文中遗漏。需要将其升级为可执行代码校验。

## 目标

1. 建立 `.rules/*.yaml` 作为统一的机器可读规则配置库。
2. 建立 `.schemas/*.json` 锁死产物字段规范（如 storyboard_prompt_pack.schema.json 等）。
3. 编写三层校验器：
   - **Level 1 (Lint)**：校验产物文件命名与 manifest 登记的 path 是否对齐。
   - **Level 2 (Schema)**：校验 Frontmatter 头部与产物中必须存在的 Sections/Blocks 是否完备（如声音块 `pack_audio_execution_plan`）。
   - **Level 3 (Semantic Guard)**：校验禁用词正则过滤（禁止出现 IP 演员人名）、多包模式下的 Segment ID 连续性。

## 验收标准

- [ ] 运行 `scene-forge validate --stage <stage>` 能够针对规则库进行全量校验，输出标准的 JSON 报错对象（包含错误码、出错文件、规则 ID 及修正提示）。
- [ ] 存在禁用词或缺少声音块的产物会被 Level 2/3 校验器精准标记为失败。
