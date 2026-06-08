# SceneForge 多风格资产盘点任务计划

## 当前目标

- 为现有 SOP 补上最小可运行的风格确认闭环
- 让 `scene-topic-gate` 提供风格建议、`scene-script-adapter` 正式确认风格包
- 保持 `pixar_like` 回退链可用，同时为第二风格包 A/B 验证铺路

## 当前阶段

- [x] 确认多风格三层体系与风格总表
- [x] 完成 `pixar_like` 资产与 Skill 口径盘点
- [x] 完成 `pixar_like` 风格包骨架与三条下游主链接入
- [x] 完成全链路 review，确认缺口在“风格确认闭环”
- [x] 补充实施计划，写明 `scene-topic-gate -> scene-script-adapter` 风格确认闭环
- [x] 修改 `scene-topic-gate` 协议，加入风格建议字段
- [x] 修改 `scene-script-adapter`，加入正式风格确认与黑板回写
- [x] 修改 `scene-forge` 总控口径，说明未确认风格时 only fallback
- [x] 自查一致性并更新执行记录
- [x] 新增 `dreamworks_like` 最小风格包骨架
- [x] 新增 `stylized_chinese_3d` 与 `comic_action_3d` 最小风格包骨架
- [x] 完成 `Phase 1` 四个 3D 风格包结构检查
- [ ] 基于 `Phase 1` 四个 3D 风格包做第一轮测试与 A/B 验证方案
- [x] 梳理 26 个未落地风格包，区分 `Phase 2` 与 `Exploration Pool`
- [x] 产出未落地风格包详细梳理文档，补齐 `Phase 2` 高完整度与 `Exploration Pool` 中等细度索引卡
- [x] 产出未落地风格包落地实施计划，明确批次、优先级、升级规则与建包门槛
- [x] 按统一 7 文件模板一次性补齐全部 26 个未落地风格包
- [x] 前移导演风格正式确认点到 `scene-topic-gate`
- [x] 为 `scene-design-builder` 增加“未确认风格即阻塞”规则
- [x] 将 `scene-script-adapter` 调整为默认继承已确认风格，而不是第一版正式确认点
- [x] 为 `scene-topic-gate` 增加 `director_style_candidates` 候选结构
- [x] 为旧项目补充 `legacy confirmed` 风格兼容语义
- [x] 统一 `scene-storyboard-director` / `scene-video-prompt-builder` 的下游风格处理口径
- [x] 将总表全部风格包接入 `scene-topic-gate` 候选池，并按 `Phase 1 / Phase 2 / Exploration Pool` 分层标记
- [x] 新增 `style_profiles/style_registry.md` 运行时风格索引，避免每轮扫描全部风格目录
- [x] 将“禁止读取当前项目之外的 `projects/*` 兄弟项目”升级为仓库级与主链级硬限制
- [x] 统一主链风格读取顺序为“`style_registry -> profile.md -> 当前阶段必需文件`”
- [x] 新增全局 `projects/PROJECT_INDEX.md` 与项目级 `projects/<project>/PROJECT_INDEX.md` 轻索引机制
- [x] 将 `scene-forge` 项目发现规则改为“全局索引 -> 项目索引 -> 项目黑板”的三级读取顺序
- [x] 为现有项目初始化轻索引，避免一句新需求触发全量黑板扫描
- [x] 收紧兼容退路：无项目级索引的项目默认不参与自动命中，只允许用户点名后直读黑板
- [x] 将入口评分维度从“动画化适配度”改为“风格转译适配度”，去掉默认动画入口
- [x] 将 `scene-topic-gate` 调整为“先判 `style_family`，再判 `director_style_id`”
- [x] 将 `scene-script-adapter` 与 `scene-design-builder` 的职责描述改为服从已确认风格家族，而非默认动画电影化
- [x] 为风格确认闭环补入 `style_family_confirmed` 第一确认层，并同步黑板模板、总控闸门与上游协议
- [x] 将 `expressive_animation` 从默认项目框架降为按 `style_family` 条件启用的扩展层
- [x] 为 `动画化适配度 -> 风格转译适配度` 补入正式兼容读取规则，不批量改历史项目正文
- [x] 收口 `director_style_suggestion` 排序 tie-break 规则，明确“先家族、后包”的固定优先级
- [x] 完成本轮多风格协议收口后的最终静态一致性 review
- [x] 修复 `scene-video-prompt-builder` 对 `expressive_animation` 的默认继承口径，改为按 `style_family` 条件启用
- [x] 修复 `scene-storyboard-director` 的默认动画电影感描述，改为服从当前 `style_family`
- [x] 将 `expressive-animation-protocol` 标记为历史协议摘要，避免旧 `enabled: true` 语义回流为运行时默认规则
- [x] 修复“阶段确认可被跨阶段复用”的口径，要求确认只绑定当前阶段
- [x] 为故事板阶段补入 `total_shots > 12` 必须拆包的预览与正式落盘硬校验
- [x] 为视频提示词阶段补入独立确认与上游故事板拆包状态校验，禁止越级直出
- [x] 收紧 `scene-storyboard-director` 的故事板主交付体裁：正式 `storyboard_prompt_files` 必须恢复为控制版 / 风格版双版整板 Prompt 包，逐镜头 `Seg / Shot / Prompt` 文稿只能作为中间层
- [x] 收紧 `scene-video-prompt-builder` 的主交付体裁与 review 闸门：正式视频提示词必须恢复为导演长版 + copy-ready + pack 对齐文件，多包缺失/版权直指/说明稿替代时不得标记完成
- [x] 为 `stage_index.video_prompts` 补入 `quality_check` 强制索引规则：无 review / auto-fix 结果路径时不得写成 `completed`
- [x] 收紧视频提示词默认交付形态：主交付默认按 storyboard `pack` 对齐，`segment_copy_ready` 默认内嵌在 pack 文件内，按段独立文件只在用户明确要求时生成
- [x] 为视频提示词预览补入 `video_prompt_pack_plan` 硬要求，并将黑板 `stage_index.video_prompts.outputs` 的默认示例切回先索引 pack 文件
- [x] 为故事板阶段补入 `storyboard_prompt_pack_plan`、`storyboard_quality_check.final_delivery_ready` 与自动 review / auto-fix 闸门
- [x] 统一故事板与视频提示词的 `completed / primary / default_read` 条件，要求正式主交付 + review 结果 + pack 规则同时满足
- [x] 增强视频提示词中的声音层呈现：默认在每个 `pack` 内加入包级声音执行摘要，并要求每个 Segment 显式输出 `BGM / Foley-SFX / Ambience / Silence` 声音执行块

## 约束

- 不新增独立 `scene-style-selector` Skill
- 不批量改写 `projects/` 历史产物
- `pixar_like` 必须作为回归基线保留，不能为了抽象而退化
- 所有用户可见确认信息统一使用“中文描述（English Term）”
- 用户将自行负责 `Phase 1` 四个已落地风格包的人工测试
- `Exploration Pool` 本轮虽然补齐为可运行包，但仍保持 `experimental` 身份，不作为默认回退项
- 故事板正式主交付必须保持“整板双版 Prompt 包”体裁，不允许把 shotlist / 导演稿直接写成 `outputs/storyboard_prompts/*.md` 的用户主交付
- 视频提示词正式主交付必须保持“导演长版 + 每段 copy-ready + 多包时 pack 对齐文件”体裁，不允许把参数表 / 编译 Prompt 说明稿直接写成 `outputs/video_prompts/*.md` 的用户主交付
- 视频提示词阶段若以 `final_delivery_ready` 为完成闸门，则必须同时落 `stage_index.video_prompts.files.quality_check`，否则不得标记 `completed`
- 视频提示词主交付默认与故事板 `pack` 对齐，不默认把每个 Segment 拆成独立物理文件
- 视频提示词的声音层默认内嵌在 pack 主交付中呈现，不额外拆出独立 BGM / SFX / 环境音文件
- 视频提示词预览若未先给出 `video_prompt_pack_plan`，不得直接进入正式落盘确认
- 故事板预览若未先给出 `storyboard_prompt_pack_plan`，不得直接进入正式落盘确认
- 故事板与视频提示词两个阶段都必须通过阶段级 review / auto-fix 闸门后，才能写成 `completed`
