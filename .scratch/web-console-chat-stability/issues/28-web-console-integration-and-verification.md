Status: pending

# Issue 28: Web Console 前端产物渲染验证 (Web Console Integration & Verification)

## 父问题

[implementation_plan.md](file:///Users/tangwujun/.gemini/antigravity-ide/brain/fe1d6cca-887e-46cd-a915-c45e82edccf7/implementation_plan.md)

## 要构建什么

在所有后端产物、详情设计稿、控制链路表与中英文提示词全部生成并妥善注册至 `PROJECT_BOARD.md` 的 `stage_index` 后，进行 Web Console UI 前端的端到端测试与集成验证。

任务包括：
1. 启动 Web Console 本地开发服务器，确保前端可以正常连接。
2. 展开左侧菜单中的每一个阶段，校验其折叠菜单展开后是否展示出了对应的全部产物（包含 outputs 及 details 文件）。
3. 依次点击每一个文件进行右侧预览面板加载，确保所有的 Markdown 列表、表格、代码块及 YAML 前置元数据渲染排版美观，可读性极高。

## 验收标准

- [ ] 后半段的每一个阶段折叠菜单展开后均正常展示多份对应的产物（无空置或不全）。
- [ ] 所有新创建的 `.md` 产物文件在右侧预览面板中点击均能成功加载，无渲染异常。
- [ ] 聊天视口和预览面板各项新 CSS 样式在真机浏览器中渲染符合预期。

## 被阻塞于

- [Issue 27: 发布评审阶段产物规范化与落盘](file:///Users/tangwujun/Documents/trae_projects/scene_forge/.scratch/web-console-chat-stability/issues/27-publish-review-stage-deliverables-rectification.md)
