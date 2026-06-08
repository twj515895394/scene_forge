Status: closed

# Issue 03: 开发硬性校验规则引擎 (Schema & Semantic Validator)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

设计并实现基于 TypeScript 的校验引擎，从 `.rules/*.yaml` 和 Zod Schema 中读取校验配置，用机器代码拦截代替纯文本自查。

三层校验器结构设计：
1. **Level 1 (Lint)**：校验产物文件路径及文件命名是否符合阶段规范、是否在 manifest 中完备登记。
2. **Level 2 (Schema)**：校验 Frontmatter 属性，并使用 Zod 锁死必需字段（如 video prompt markdown 内是否含有 `pack_audio_execution_plan` 及 `segment_sound_execution` 等大标题和声音执行块）。
3. **Level 3 (Semantic Guard)**：校验禁用词正则词库（读取 `forbidden_terms.yaml`，严禁出现真实演员真名或真实品牌名以防跑偏）、校验多包（pack）之间的 Segment ID 连续性。

## 验收标准

- [ ] 提供标准的 Pydantic-like 或 Zod 强校验方法，运行 `scene-forge validate` 时输出标准的验证报告 JSON 格式（带错误码、错误行、规则 ID、修复提示）。
- [ ] 故意在产物中写错必需块（如缺少声音段）或包含敏感禁用词时，校验报告能精准发现并报出 Level 2 或 Level 3 校验失败。

## 被阻塞于

- [Issue 01: Artifact Manifest 产物隔离与 Taxonomy 读取策略](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/01-artifact-manifest.md)
