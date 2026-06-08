Status: ready-for-agent

# Issue 01: 实现 Artifact Manifest 与物理读取隔离 (Taxonomy)

## 背景

当前阶段 Agent 在执行后续任务时（例如 video prompt 阶段），常常将上游阶段（storyboard 阶段）的草稿或说明稿误读为正式主交付，或者因为上下文里包含了太多无用的草稿数据，导致生成跑偏。

## 目标

1. 设计 `artifacts.manifest.yaml` 格式并实现解析。
2. 在 `outputs/` 中实施 frontmatter 解析。
3. 编写隔离逻辑：下游阶段调用 `artifacts` 读取接口时，仅能看到 `kind: final` 且 `readable_by_downstream: true` 的文件。

## 约定

- 配置文件：`projects/<project_slug>/artifacts.manifest.yaml`
- 读取命令：`scene-forge artifacts --from <stage> --readable-by <next_stage> --json`
- 写入规则：Agent 运行时，引擎锁定 `write_scope`，只允许写入 `details/<stage>/`（draft/preview）和 `outputs/`（final）。

## 验收标准

- [ ] 无法通过 CLI 读取下游不该访问的 `draft` 和 `preview` 文件。
- [ ] final markdown 文件均带有标准 YAML frontmatter，说明包含哪些所需 section。
