Status: ready-for-agent

# Issue 04: 稳定化 CLI JSON API (CLI Interface Freeze)

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

标准化 `scene-forge` 的命令行 CLI 接口（使用 Node.js `commander` 或 `yargs`），保证所有底层指令在带上 `--json` 参数时，均以统一且确定的 JSON 格式输出至 stdout。

主要命令与功能要求：
1. `scene-forge status --json`：输出项目状态树、当前卡点及各阶段 completed 验证证据（evidence）。
2. `scene-forge start --stage <stage> --json`
3. `scene-forge validate --stage <stage> --json`
4. `scene-forge complete --stage <stage> --json`
5. `scene-forge artifacts --from <stage> --json`
6. `scene-forge rules --stage <stage> --json`
7. **错误码注册表**：统一的错误响应结构（`{ "error_code": "SF-ERR-...", "message": "...", "details": {} }`）。

## 验收标准

- [ ] 在带上 `--json` 时，命令行的 stdout 没有任何 ANSI 终端彩色干扰，能直接被 JSON.parse 解析。
- [ ] 命令行对所有运行期抛错均有确定的错误码映射和友好的描述返回。

## 被阻塞于

- [Issue 02: 阶段事务状态机与推进原子化 (Transactional Complete)](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/02-transactional-state-machine.md)
- [Issue 03: 开发硬性校验规则引擎 (Schema & Semantic Validator)](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/issues/03-schema-validator.md)
