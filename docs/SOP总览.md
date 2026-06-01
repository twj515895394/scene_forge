# SceneForge SOP 总览

## 项目定位

经典影视 / 热点片段的 3D 动画电影化再创作生产系统。

输入：经典片段、热点片段、影视梗、原著母题、用户指定桥段。

输出：选题判断、参考对象判断、资产复用判断、角色/场景设定、剧本改编、分镜设计、故事板提示词、视频分段提示词、发布文案与复盘记录。

## 全局状态源

每个项目以 `PROJECT_BOARD.md` 作为唯一状态源。

顶层关键索引字段包括：

- `project_status`
- `next_stage`
- `lifecycle_flag`
- `score`
- `production_level`
- `reference_type`
- `adaptation_level`
- `performance_style`

各阶段内容统一以结构化 YAML 补丁块记录。

## 已确定主流程

1. 选题评分：不限定类型，支持追热点；最低 60 分进入制作。
2. 参考对象判断：必须明确参考的是原著/母题，还是具体影视版本。
3. 资产复用判断：角色与场景为强制前置；道具为轻量备选。
4. 角色与场景设定：根据制作分层决定轻量锁定卡或完整设定。
5. 剧本改编：支持原样保留、大部分保留、部分改写、重构扩写四档，并由该阶段最终确认 `performance_style`。
6. 分镜设计：强调 3D 动画电影感镜头语言，不死套原版拍法。
7. 故事板与视频提示词：根据分镜生成故事板提示词和视频分段提示词。
8. 发布与复盘：沉淀标题、封面、发布文案、数据复盘和资产更新建议。

## 制作分层

- 80 分以上：重点制作池。完整角色设定、多版故事板、精修视频。
- 60～79 分：快速制作池。轻量角色锁定卡、单版故事板、快速视频生成。
- 40～59 分：备选观察池。暂不制作，等待热度或角度。
- 低于 40 分：放弃池。

## 演绎风格

`performance_style` 作为独立维度存在，不和改编强度混用。

- `cinematic_serious`：正剧电影化
- `cinematic_comedy`：喜剧动画化
- `exaggerated_comedy`：夸张搞笑化
- `absurd_chaotic`：鬼畜离谱化

其中：

- `scene-topic-gate` 负责给出 `performance_style_suggestion`
- `scene-script-adapter` 负责最终确认并写入顶层 `performance_style`

## 表达规范

整套 SOP 统一采用：

- 对话与黑板概览：中文优先
- `summary`：中文显示名 + 英文参数值
- 结构化字段：英文参数值

示例：

- 选题已评分（`topic_scored`）
- 夸张搞笑化（`exaggerated_comedy`）
- 进入制作（`go`）
