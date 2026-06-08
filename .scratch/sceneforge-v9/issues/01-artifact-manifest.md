Status: ready-for-agent

# Issue 01: Artifact Manifest 产物隔离与 Taxonomy 读取策略

## 父问题

[PRD.md](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/sceneforge-v9/PRD.md)

## 要构建什么

本任务实现阶段产物的分类物理隔离与防泄漏。需要使用 TypeScript 编写核心逻辑，管理和解析 `artifacts.manifest.yaml` 产物清单，并读取 markdown 产物的 YAML frontmatter。

主要功能包括：
1. **清单管理**：支持阶段运行（Run）生成和写入 `artifacts.manifest.yaml`（包含产物的 id、stage、kind、path、schema、readable_by_downstream 等）。
2. **隔离读取逻辑**：实现获取可用上游产物接口。当后续阶段请求读取上游产物时，拦截读取请求，有且仅有标记为 `kind: final` 且 `readable_by_downstream: true` 的文件能暴露给下游。
3. **写入范围锁定**：锁定阶段写入目录（Write Scope），仅允许将 `preview` / `draft` / `review` 写入 `details/<stage>/`，将 `final` 写入 `outputs/`，防止误标或混淆。

## 验收标准

- [ ] 无法通过引擎 API 读取标记为非 downstream-readable 的 preview 或 draft 文件。
- [ ] 所有的 outputs 交付件 markdown 文件在顶部均带有符合 Schema 规范的 YAML frontmatter 头部。
- [ ] 执行 `scene-forge artifacts --from storyboard --readable-by video_prompts` 命令只返回合规的 Final 产物记录。

## 被阻塞于

无 - 可以立即开始
