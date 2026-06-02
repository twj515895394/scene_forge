---
project_name: huaqiang-watermelon
project_status: video_prompts_ready
next_stage: scene-publish-review
lifecycle_flag: active
blocker_note:
score: 90
production_level: focus
reference_type: hybrid_reference
adaptation_level: partial_rewrite
performance_style: exaggerated_comedy
segment_duration_seconds: 10
created_at: 2026-06-01
updated_at: 2026-06-01
---

# PROJECT BOARD

## 0. 项目总览

- 项目名称：华强卖瓜动画改编
- 选题来源：电视剧《征服》经典片段“华强买瓜”
- 当前状态：提示词已完成（`video_prompts_ready`）
- 下一阶段：发布与复盘（`scene-publish-review`）
- 生命周期：进行中（`active`）
- 制作分层：重点制作池（`focus`）
- 参考对象类型：混合参考（`hybrid_reference`）
- 改编档位：部分改写（`partial_rewrite`）
- 演绎风格：夸张搞笑化（`exaggerated_comedy`）
- 分段时长：10 秒（`10`）

## 1. 选题评分区

```yaml
patch_type: scene-topic-gate
version: 1
status: completed
updated_at: 2026-06-01
summary: 该选题总分 90，判断为进入制作（`go`），建议走夸张搞笑化（`exaggerated_comedy`）路线，并进入重点制作池（`focus`）。
data:
  topic_name: 华强卖瓜动画改编
  source_material:
    source_type: specific_adaptation
    source_name: 电视剧《征服》华强买瓜片段
    source_locator: 华强买瓜
    notes: 经典互联网热梗片段，保留冲突张力与核心台词，转为高品质3D动画电影质感的夸张搞笑表达。
  total_score: 90
  performance_style_suggestion: exaggerated_comedy
  production_level: focus
  decision: go
  dimension_scores:
    热点价值: 23
    动画化适配度: 18
    改编空间: 14
    经典认知锚点: 15
    风险可控性: 7
    制作成本可控性: 8
    平台传播潜力: 5
  rationale:
    - 经典热梗认知度高，适合做夸张喜剧再创作。
    - 角色对峙和节奏反差明显，适合动画化重构。
    - 可沉淀角色、摊位、道具等系列资产。
  risk_notes:
    - 拿刀和劈瓜动作需做去害化改写，避免写实暴力表达。
  reuse_hints:
    - 华强、摊主和水果摊都适合作为后续系列短视频的复用资产。
  evaluator_rule_version: topic-gate-v1
```

## 2. 参考对象判断区

```yaml
patch_type: scene-reference-decider
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次以电视剧《征服》原版桥段为主参考，保留经典台词、人物关系和水果摊认知锚点，同时把动作表现和视听风格改写为高品质3D动画电影化的夸张喜剧表达。
data:
  reference_type: hybrid_reference
  decision_summary: 以原片段的角色关系、对峙流程和经典台词为主参考，动作、运镜和物理反馈全部重做，不复刻原片写实拍法。
  reference_boundary:
    primary_reference: 电视剧《征服》华强买瓜片段
    secondary_reference: 高品质3D动画电影化夸张喜剧表达
    boundary_rule: 保留名场面认知锚点和冲突流程，但镜头调度、角色外形比例和动作物理全部按动画表达重构。
    allowed_inheritance:
      - 角色身份
      - 角色关系
      - 标志道具
      - 情绪核心
      - 剧情骨架
      - 场景气质
    forbidden_inheritance:
      - 镜头动势
  must_keep:
    - category: 标志道具
      note: 水果摊、西瓜、电子秤、摩托车和水果刀都要保留为认知锚点。
    - category: 剧情骨架
      note: 骑车到摊位、问瓜保熟吗、秤上冲突、揭穿猫腻、高潮收束这条主线必须保留。
    - category: 情绪核心
      note: 华强平静问话与摊主不耐烦之间的张力必须保持。
  must_avoid:
    - category: 镜头动势
      note: 避免直接模仿原片写实切镜和写实持刀调度。
    - category: 标志道具
      note: 避免写实伤害性劈瓜动作，改为夸张去害化的果汁爆裂和道具反馈。
  risk_notes:
    - 角色身份辨识要来自气质、服装轮廓和关系，不要滑向真人脸复刻。
  next_action: 进入 scene-asset-checker，判断角色、场景和核心道具的复用与新建策略。
```

## 3. 资产复用判断区

```yaml
patch_type: scene-asset-checker
version: 1
status: completed
updated_at: 2026-06-01
summary: 角色与场景资产判断已完成，华强、摊主和街角水果摊均进入完整新建（`new_full`），核心道具电子秤进入单独新建（`new_core_prop`）。
data:
  character_assets:
    - role_name: 华强
      reuse_status: new_full
      asset_ref:
      reuse_reason: 当前资产库内无可直接承接该桥段的角色基础模型，需要完整新建。
      required_adjustments: []
    - role_name: 摊主
      reuse_status: new_full
      asset_ref:
      reuse_reason: 当前资产库内无可直接承接该桥段的角色基础模型，需要完整新建。
      required_adjustments: []
  scene_assets:
    - scene_name: 街角水果摊
      reuse_status: new_full
      asset_ref:
      reuse_reason: 需要独立建立可服务后续系列化短视频的通用水果摊场景。
      required_adjustments: []
  prop_assets:
    - prop_name: 电子秤
      prop_status: new_core_prop
      asset_ref:
      handling_note: 电子秤承担关键物理反馈，需要单独建核心道具卡。
    - prop_name: 水果刀
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 作为角色配件存在，不单独建核心道具卡。
    - prop_name: 西瓜
      prop_status: embed_in_character_or_scene
      asset_ref:
      handling_note: 作为场景可交互物存在，不单独建核心道具卡。
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets: []
    new_full_targets:
      - 华强
      - 摊主
      - 街角水果摊
  risk_notes:
    - 角色表情需支持夸张喜剧，但不能损坏身份辨识。
  next_action: 进入 scene-design-builder，产出锁定卡和可直接生成设定图的 prompt 包。
```

## 4. 角色与场景设定区

```yaml
patch_type: scene-design-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 角色与场景设定已完成；锁定卡与设定图 prompt 已落盘，可直接生成角色图、场景图和核心道具图。
data:
  design_mode: focus
  character_designs:
    - name: 华强
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon/details/character_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon/outputs/design_prompts/character_prompts_v1.0.md
    - name: 摊主
      reference_strength: medium_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon/details/character_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon/outputs/design_prompts/character_prompts_v1.0.md
  scene_designs:
    - name: 街角水果摊
      reference_strength: high_anchor
      asset_strategy: new_full
      lock_card_file: projects/huaqiang-watermelon/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon/outputs/design_prompts/scene_prompts_v1.0.md
  prop_designs:
    - name: 电子秤
      asset_strategy: new_core_prop
      lock_card_file: projects/huaqiang-watermelon/details/scene_design_v1.0.md
      prompt_file: projects/huaqiang-watermelon/outputs/design_prompts/scene_prompts_v1.0.md
  visual_consistency:
    character_anchor_note: 华强保持冷静压迫感，摊主保持粗鲁嚣张感，两人都使用圆润但有辨识度的3D动画角色比例。
    scene_anchor_note: 水果摊维持老街路边摊认知，但空间组织更干净、更适合动画镜头调度。
    material_anchor_note: 服装和道具以高品质3D动画电影质感为主，避免过度塑料玩具化。
  script_adaptation_notes:
    - 核心台词保留，动作和反应全部按夸张搞笑节奏重写。
    - 高潮戏必须服务镜头分段和视频生成，不要只写气氛词。
  next_action: 进入 scene-script-adapter，按锁定卡和 prompt 锚点完成剧本改编。
```

## 5. 剧本改编区

```yaml
patch_type: scene-script-adapter
version: 1
status: completed
updated_at: 2026-06-01
summary: 本次采用部分改写型（`partial_rewrite`），并最终确认为夸张搞笑化（`exaggerated_comedy`）演绎风格，完整剧本已落盘。
data:
  adaptation_level: partial_rewrite
  performance_style: exaggerated_comedy
  script_summary: 保留经典桥段和核心台词，把动作、反应和物理反馈重构为夸张搞笑的3D动画表达，并为后续按 10 秒分段生成做节拍收束。
  preserved_elements:
    - category: 台词表达
      note: 保留“这瓜保熟吗”“你故意找茬是不是”等核心识别台词。
    - category: 剧情骨架
      note: 保留到摊、试探、秤上冲突、揭穿、高潮收束这条主线。
  rewritten_elements:
    - category: 动作设计
      note: 把高潮动作改写为可去害化、可做镜头分段的夸张物理反馈。
    - category: 角色反应
      note: 强化表情、停顿和反差节奏，给分镜和视频 prompt 明确表演抓手。
    - category: 节奏推进
      note: 剧本按两段 10 秒结构组织节拍，方便后续生成平台处理。
  scene_beats:
    - beat_id: B1
      beat_summary: 华强到摊、问价、建立平静压迫感。
      visual_focus: 角色登场和摊主状态的反差。
      emotion_goal: 建立喜剧张力。
    - beat_id: B2
      beat_summary: 问瓜保熟吗，摊主情绪升级。
      visual_focus: 对视、挑衅和表情变化。
      emotion_goal: 放大经典台词锚点。
    - beat_id: B3
      beat_summary: 上秤与揭穿猫腻，节奏变快。
      visual_focus: 电子秤反馈和双方肢体冲突。
      emotion_goal: 把冲突推到爆发前。
    - beat_id: B4
      beat_summary: 高潮动作与收束离场。
      visual_focus: 去害化高潮与平静离场反差。
      emotion_goal: 完成荒诞喜剧顶峰。
  script_file: projects/huaqiang-watermelon/details/script_v1.0.md
  storyboard_hints:
    pacing_note: 前 10 秒做铺垫和升级，后 10 秒做爆发和收束。
    acting_note: 华强始终稳，摊主逐步失控，所有表演都要服务镜头切分。
    visual_escalation_note: 高潮画面要有明确前摇、爆发点和余波，方便分镜和视频 prompt 写出连续动作。
  risk_notes:
    - 不能只追求夸张，必须保证每个节拍都能被拆成明确镜头。
  next_action: 进入 scene-storyboard-director，按 10 秒分段组织镜头、时间轴和故事板 prompt。
```

## 6. 分镜设计区

```yaml
patch_type: scene-storyboard-director
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）分镜已完成，按 10 秒分为 2 段，共 8 镜；完整镜头表和故事板 prompt 已落盘。
data:
  storyboard_version: v1.0
  segment_duration_seconds: 10
  total_shots: 8
  total_segments: 2
  storyboard_summary: 第一段完成角色登场、问瓜和秤上冲突；第二段完成揭穿、高潮爆发和离场收束。每段都可单独进入视频生成。
  segments:
    - segment_id: SEG01
      duration_seconds: 10
      covered_shots:
        - S01
        - S02
        - S03
        - S04
      segment_goal: 建立角色关系，完成试探和秤上博弈。
    - segment_id: SEG02
      duration_seconds: 10
      covered_shots:
        - S05
        - S06
        - S07
        - S08
      segment_goal: 完成揭穿、去害化高潮和离场收束。
  shot_highlights:
    - shot_id: S01
      beat_id: B1
      start_second: 0.0
      end_second: 2.2
      shot_purpose: 建立华强登场和摊位空间。
      visual_focus: 摩托停车、华强摘头盔、摊位全貌。
      motion_note: 缓推后定格，给角色亮相时间。
      dialogue_cue: 老板，这瓜多少钱一斤？
      emotion_note: 平静压迫感里带一点喜剧反差。
    - shot_id: S04
      beat_id: B3
      start_second: 7.2
      end_second: 10.0
      shot_purpose: 把第一段推到冲突临界点。
      visual_focus: 西瓜落秤、秤体反馈、双方对视。
      motion_note: 中近景快速切换。
      dialogue_cue: 20斤？你这秤不够数啊。
      emotion_note: 紧张里带明显荒诞预热。
    - shot_id: S06
      beat_id: B4
      start_second: 12.6
      end_second: 15.8
      shot_purpose: 完成去害化高潮爆发。
      visual_focus: 电子秤、西瓜、果汁冲击和摊主反应。
      motion_note: 先短停顿，再爆发式推进。
      dialogue_cue: 以拟音和反应为主，台词让位给动作高潮。
      emotion_note: 荒诞喜剧顶峰。
    - shot_id: S08
      beat_id: B4
      start_second: 18.2
      end_second: 20.0
      shot_purpose: 平静离场，形成反差谢幕。
      visual_focus: 华强上车离开，摊主留在果汁余波里。
      motion_note: 缓慢后拉收束。
      dialogue_cue: 萨日朗！
      emotion_note: 冷静退场形成最后笑点。
  continuity_rules:
    character_consistency: 华强的冷静状态不崩，摊主从嚣张到失控层层升级。
    scene_consistency: 水果摊空间、光照方向和电子秤位置在两段内保持稳定。
    motion_continuity: 第一段稳中带快，第二段先停顿后爆发再收束，动作节奏必须能无缝续接。
  shotlist_file: projects/huaqiang-watermelon/details/shotlist_v1.0.md
  storyboard_prompt_files:
    - file: projects/huaqiang-watermelon/outputs/storyboard_prompts/storyboard_prompt_v1.0.md
      purpose: 逐镜头故事板图生成 prompt
  prompt_hints:
    video_prompt_focus: 每段必须写清楚镜头覆盖、动作阶段和结尾状态，方便 Seedance 2.0 连段生成。
    audio_prompt_focus: 台词、拟音和停顿都要直接写进视频 prompt，而不是只写在附属音频文档里。
  risk_notes:
    - 镜头不能只写氛围词，必须能直接转成故事板图和视频段落。
  next_action: 进入 scene-video-prompt-builder，按两段结构整合最终视频 prompt。
```

## 7. 故事板与视频提示词区

```yaml
patch_type: scene-video-prompt-builder
version: 1
status: completed
updated_at: 2026-06-01
summary: 夸张搞笑化（`exaggerated_comedy`）视频提示词已生成，按 10 秒分为 2 段；角色设定图 prompt、故事板 prompt 和最终视频分段 prompt 已全部落盘。
data:
  prompt_pack_version: v1.0
  segment_duration_seconds: 10
  total_segments: 2
  video_prompt_files:
    - file: projects/huaqiang-watermelon/outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_01
      purpose: 第 1 段视频生成 prompt
    - file: projects/huaqiang-watermelon/outputs/video_prompts/video_prompt_segments_v1.0.md
      segment_scope: segment_02
      purpose: 第 2 段视频生成 prompt
  reference_assets:
    character_design_refs: 先用 outputs/design_prompts/character_prompts_v1.0.md 生成角色设定图，作为角色参考输入。
    storyboard_refs: 再用 outputs/storyboard_prompts/storyboard_prompt_v1.0.md 生成逐镜头故事板图，按分段选择对应镜头图作为构图参考输入。
  consistency_rules:
    character_consistency: 角色比例、服装轮廓、表情层级和光照方向在两段视频中保持一致。
    scene_consistency: 水果摊空间、光影和道具位置延续分镜方案，不跨段跳变。
    motion_continuity: 第 1 段结尾的对峙状态直接续到第 2 段开场，高潮后的余波状态延续到离场镜头。
  global_render_rules:
    visual_style_note: 统一使用高品质3D动画电影质感的夸张搞笑表达，不直接写品牌风格名。
    dialogue_audio_note: 每段 prompt 已整合台词、拟音、音乐和停顿要求，可直接投喂视频平台。
    reference_usage_note: 输入顺序建议为角色设定图 -> 当前段故事板图 -> 当前段视频 prompt。
  readiness_notes:
    - 已具备角色图、故事板图和视频 prompt 三类核心生成素材。
    - 发布前仍需补封面和标题版本。
  next_action: 进入 scene-publish-review，整理发布包装和复盘方案。
```

## 8. 发布与复盘区

```yaml
patch_type: scene-publish-review
version: 1
status: pending
updated_at:
summary: 待进行发布与复盘
data: {}
```

## 9. 风险与待办

- 若生成平台单段动作承载不足，可在下次项目中把 `segment_duration_seconds` 从 `10` 调整为 `15`，但需在分镜阶段确认。
- 当前示例已转为 prompt 导向产物，后续重点应验证图像参考与视频段落衔接是否顺畅。
