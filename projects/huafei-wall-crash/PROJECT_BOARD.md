project:
  name: 士兰撞墙未遂事件
  slug: huafei-wall-crash
  created_at: 2026-06-07T12:00:00+08:00
  updated_at: 2026-06-08T16:25:00+08:00

state:
  project_status: video_prompts_ready
  next_stage: scene-publish-review
  lifecycle_flag: active
  blocker_note:

routing:
  current_stage: scene-publish-review
  allowed_next_stages:
    - scene-publish-review
  last_completed_stage: scene-video-prompt-builder
  route_reason: 视频提示词全新重跑完成（5中文Pack+1英文导演长版/Segment+Shot+Timecode双层/可直接复制使用块），推进到发布审查。

runtime_policy:
  context_policy:
    mode: minimal
    allow_docs_scan: false
    active_protocol_docs:
      - .agents/skills/scene-forge/references/board-protocol.md
      - .agents/skills/scene-forge/references/project-board-template.md
    allowed_runtime_asset_paths: []
    forbidden_runtime_paths:
      - docs/
      - .handoff/
      - 会话记录_*.md
      - 历史项目输出
      - 其他无关项目目录
      - projects/ 下当前项目之外的任何兄弟项目目录
    token_budget:
      default_stage_budget: compact
      require_reason_for_extra_reads: true
  reference_policy:
    templates_are_reference_only: true
    examples_are_reference_only: true
    enums_are_open_by_default: true
    strict_enum_only_when_explicit: true
    allow_adapted_reference: true
    allow_custom_generated_option: true
    require_reason_for_custom_option: true

project_config:
  score: 91
  production_level: focus
  reference_type: hybrid_reference
  adaptation_level:
  director_style_id: classic_studio_wuxia
  director_style_version: v1
  style_family: live_action_cinematic
  style_profile_path: style_profiles/classic_studio_wuxia/profile.md
  performance_style: exaggerated_comedy
  target_total_duration_seconds: 90
  segment_duration_seconds: 10

confirmations:
  topic_confirmed:
    status: confirmed
    note: 用户已确认选题方向（士兰撞墙鬼畜改编），并提供了完整的创意脚本。
  style_family_confirmed:
    status: confirmed
    note: 用户确认风格大类为 live_action_cinematic（真人电影感）。
  style_confirmed:
    status: confirmed
    note: 用户确认导演风格包为 classic_studio_wuxia（经典棚拍武侠电影感）。
  reference_confirmed:
    status: confirmed
    note: 参考边界已裁定为hybrid_reference，以宫斗剧类型母题+棚拍美学为双参考轴。
  story_confirmed:
    status: confirmed
    note: 用户已确认6 Beat故事骨架、角色功能和情绪曲线。
  asset_plan_confirmed:
    status: confirmed
    note: 全新项目无复用资产。角色4个(new_full×1+new_light×3)，场景3个(new_full×1+new_light×2)，核心道具5个(new_core_prop)。
  design_confirmed:
    status: confirmed
    note: 用户确认设计方向。士兰脸型参考蒋欣，皇上有四郎胡子。棚拍布景感为核心美学。
  script_confirmed:
    status: confirmed
    note: 用户确认9×10s分段策略。正式剧本已落盘。
  performance_confirmed:
    status: confirmed
    note: 士兰9段+3配角+2个Hero Moment表演方案完成，含动作/情绪连续性链。
  storyboard_plan_confirmed:
    status: confirmed
    note: >
      v2最终版完成。5包整板总板/41镜/9段×10s/零跨边界/每包含Seg Bridge格确保平滑过渡。
      Pack01(2段8镜)+Pack02(2段10镜)+Pack03(2段8镜)+Pack04(2段10镜)+Pack05(1段5镜)。
      旧v1版全部STALE。
  audio_plan_confirmed:
    status: confirmed
    note: 9段音轨方案+5主题配乐+拟音清单+混音计划完成，含8个段间音频桥接。
  video_prompt_plan_confirmed:
    status: confirmed
    note: 全新重跑。5中文Pack+1英文导演长版。Segment+Shot+Timecode双层+可直接复制使用块。旧产物已删除。
  publish_confirmed:
    status: pending
    note:

active_versions:
  source_intake:
  topic: v1
  reference: v1
  story: v1
  assets: v1
  design: v1
  script: v1
  performance: v1
  storyboard: v1
  audio: v1
  video_prompts: v1
  publish:

stage_index:
  source_intake:
    status: skipped
    active_version:
    summary: 文字输入项目，无需视频源解析。
    updated_at: 2026-06-07T12:00:00+08:00
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:
  topic:
    status: completed
    active_version: v1
    summary: >
      选题评分91分（focus/重点制作池），decision=go。
      风格已确认：live_action_cinematic / classic_studio_wuxia（经典棚拍武侠电影感）。
      演绎风格建议exaggerated_comedy。角色已去版权化（华妃→士兰）。
    updated_at: 2026-06-07T12:15:00+08:00
    files:
      index:
      primary: inputs/topic_gate_output_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - inputs/topic_gate_output_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-reference-decider。
  reference:
    status: completed
    active_version: v1
    summary: >
      参考类型裁定为hybrid_reference。主参考为宫斗剧类型母题（角色关系+情绪结构），
      辅参考为classic_studio_wuxia棚拍美学。严禁继承具体剧集角色名、服装和镜头。
      角色已统一为"士兰（皇帝的妃子）"。
    updated_at: 2026-06-07T12:20:00+08:00
    files:
      index:
      primary: details/reference/reference_boundary_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/reference/reference_boundary_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-story-development。
  story:
    status: completed
    active_version: v1
    summary: >
      故事骨架已确认。6 Beat/90秒：悲壮开场→泡沫柱子→连环失败→短暂沉默→LED墙高潮→不撞了。
      情绪曲线：悲壮→懵圈→崩溃→心酸→荒诞高潮→温暖释然。角色全部去版权化。
    updated_at: 2026-06-07T12:25:00+08:00
    files:
      index:
      primary: details/story/story_development_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/story/story_development_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-asset-checker。
  assets:
    status: completed
    active_version: v1
    summary: >
      全新项目，全部资产new_full或new_light。4角色(士兰完整新建+3配角轻量)、
      3场景(冷宫完整新建+2轻量)、5核心道具(全部新建状态机)。
    updated_at: 2026-06-07T12:30:00+08:00
    files:
      index:
      primary: details/assets/asset_check_v1.md
      details:
        - details/assets/asset_lock_v1.md
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/assets/asset_check_v1.md
        - details/assets/asset_lock_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-design-builder。
  design:
    status: completed
    active_version: v1
    summary: >
      focus完整设定完成。士兰(new_full)脸型参考蒋欣，素白旗装+两把头。
      冷宫双状态场景(new_full)，5核心道具状态机，空间站位图+全场景总参考图。
      配角3人(new_light)：场务/导演/皇上(四郎胡子)。棚拍布景感为核心视觉锚点。
    updated_at: 2026-06-07T12:45:00+08:00
    files:
      index:
      primary: details/design/design_output_v1.md
      details:
        - details/角色说明书_士兰_v1.md
        - details/scene_design_cold_palace_v1.md
        - details/design/prop_state_machines_v1.md
        - details/design/space_continuity_seed_v1.md
        - details/design/supporting_characters_v1.md
        - details/design/supporting_scenes_v1.md
      outputs:
        - outputs/design_prompts/角色说明书图片提示词_士兰_v1.md
        - outputs/design_prompts/scene_cold_palace_prompt_v1.md
        - outputs/design_prompts/空间站位图提示词_v1.md
        - outputs/design_prompts/master_scene_prop_reference_v1.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/design/design_output_v1.md
        - details/角色说明书_士兰_v1.md
        - details/scene_design_cold_palace_v1.md
        - details/design/prop_state_machines_v1.md
        - details/design/space_continuity_seed_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-script-adapter。
  script:
    status: completed
    active_version: v1
    summary: >
      9段×10秒正式剧本完成。B01-B06分9段：悲壮还原→泡沫穿帮→卷土重来→快剪蒙太奇→蹦床弹飞→
      短暂沉默→终极准备→LED穿帮→不撞了+彩蛋。exaggerated_comedy演绎风格。
    updated_at: 2026-06-07T12:55:00+08:00
    files:
      index:
      primary: details/script/script_output_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/script/script_output_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-performance-director。
  performance:
    status: completed
    active_version: v1
    summary: 士兰9段逐段表演方案完成，含眼神/微表情/肢体/停顿/反应节奏。3配角表演+2 Hero Moment+动作情绪连续性链。
    updated_at: 2026-06-07T13:05:00+08:00
    files:
      index:
      primary: details/performance/performance_sheet_v1.md
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/performance/performance_sheet_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-storyboard-director。
  storyboard:
    status: completed
    active_version: v1
    summary: >
      v2最终版。5包整板故事板总板(gpt-image2复制即用)/41镜/9段×10s/零跨边界。
      Pack01(2段8镜3×3)+Pack02(2段10镜3×4)+Pack03(2段8镜3×3)+Pack04(2段10镜3×4)+Pack05(1段5镜2×3)。
      每包含复制专用主Prompt+控制版+风格版+8条控制轨道+Seg Bridge格(平滑过渡说明)。
      旧v1版全部STALE。
    updated_at: 2026-06-08T02:00:00+08:00
    files:
      index:
      primary:
      details:
        - details/storyboard/beat_skeleton_v1.md
        - details/storyboard/video_generation_units_v1.md
        - details/storyboard/shot_continuity_plan_v1.md
      outputs:
        - outputs/storyboard_prompts/故事板提示词_pack_01_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_02_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_03_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_04_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_05_v2.md
      handoff:
      quality_check:
      methodology_config:
    read_policy:
      default_read:
        - outputs/storyboard_prompts/故事板提示词_pack_01_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_02_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_03_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_04_v2.md
        - outputs/storyboard_prompts/故事板提示词_pack_05_v2.md
      deep_read: []
      never_read_by_default:
        - outputs/storyboard_prompts/storyboard_prompt_v1.0.md
        - outputs/storyboard_prompts/storyboard_pack_a_v1.0.md
        - outputs/storyboard_prompts/storyboard_pack_b_v1.0.md
        - outputs/storyboard_prompts/storyboard_pack_c_v1.0.md
        - outputs/storyboard_prompts/storyboard_pack_d_v1.0.md
        - outputs/storyboard_prompts/故事板提示词_pack_01_v1.md
        - outputs/storyboard_prompts/故事板提示词_pack_02_v1.md
        - outputs/storyboard_prompts/故事板提示词_pack_03a_v1.md
        - outputs/storyboard_prompts/故事板提示词_pack_03b_v1.md
        - outputs/storyboard_prompts/故事板提示词_pack_04_v1.md
    next_action: 推进到 scene-audio-director。
  audio:
    status: completed
    active_version: v1
    summary: >
      9段音轨方案+5主题配乐prompt+拟音清单(13项道具+6项环境)+混音计划(8个段间音频桥接)。
      含配乐情绪曲线+段间过渡混音技术+静默点管理+整体响度曲线。
    updated_at: 2026-06-08T02:30:00+08:00
    files:
      index:
      primary: details/audio_plan_v1.md
      details: []
      outputs:
        - outputs/audio_prompts/music_prompt_v1.md
        - outputs/audio_prompts/foley_prompt_v1.md
        - outputs/audio_prompts/audio_mix_plan_v1.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - details/audio_plan_v1.md
        - outputs/audio_prompts/music_prompt_v1.md
        - outputs/audio_prompts/foley_prompt_v1.md
        - outputs/audio_prompts/audio_mix_plan_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-video-prompt-builder。
  video_prompts:
    status: completed
    active_version: v1
    summary: >
      全新重跑完成。5中文Pack(对齐故事板5包)+1英文导演长版(Segment+Shot+Timecode)。
      正文含global_execution_preamble+project_level_global_rules+segment_technical_control_block+
      shot_by_shot_director_prompt+可直接复制使用块(指令语气不含review元信息)。
      覆盖41镜/9段×10s/6 VGU。旧产物已全部删除。
    updated_at: 2026-06-08T16:25:00+08:00
    files:
      index:
      primary: outputs/video_prompts/视频提示词_pack_01_zh_v1.md
      details: []
      outputs:
        - outputs/video_prompts/视频提示词_pack_01_zh_v1.md
        - outputs/video_prompts/视频提示词_pack_02_zh_v1.md
        - outputs/video_prompts/视频提示词_pack_03_zh_v1.md
        - outputs/video_prompts/视频提示词_pack_04_zh_v1.md
        - outputs/video_prompts/视频提示词_pack_05_zh_v1.md
        - outputs/video_prompts/视频提示词_导演长版_英文_v1.md
      handoff:
      quality_check:
    read_policy:
      default_read:
        - outputs/video_prompts/视频提示词_pack_01_zh_v1.md
      deep_read: []
      never_read_by_default: []
    next_action: 推进到 scene-publish-review。
  publish:
    status: pending
    active_version:
    summary:
    updated_at:
    files:
      index:
      primary:
      details: []
      outputs: []
      handoff:
      quality_check:
    read_policy:
      default_read: []
      deep_read: []
      never_read_by_default: []
    next_action:

cross_stage_summary:
  premise: 皇帝的妃子士兰在冷宫中得知真相后决意撞墙自尽，却发现宫中所有可撞之物皆为道具，怎么撞都撞不死。鬼畜喜剧短片。
  story_engine: 悲壮自杀→撞到道具→不信邪→连环道具失败→短暂低谷→片场真相→释然和解
  core_characters:
    - 士兰（皇帝的妃子，原剧华妃改编）
    - 皇上（仅在彩蛋出场）
    - 场务小哥
    - 导演
  core_scene: 冷宫（实际为棚拍片场）
  key_props:
    - 泡沫柱子
    - 纸板柱子
    - 蹦床地板
    - 绿幕背景布
    - LED显示屏墙面
  visual_style: classic_studio_wuxia / live_action_cinematic / 棚拍布景感
  continuity_focus:
  source_adaptation_mode: rewrite_adaptation
  current_risks:
    - 喜剧节奏需精确控制情绪切点，避免纯堆梗或纯闹剧
    - 开场悲壮氛围不可过度渲染，需与后续喜剧翻转精确衔接

read_policy:
  default_read:
    - PROJECT_BOARD.md
    - projects/PROJECT_INDEX.md
    - style_profiles/style_registry.md
  stage_specific_reads: {}
  style_profile_resolution_order:
    - project_config.style_profile_path
    - style_profile.required_profile_files
  style_profile_bulk_scan_allowed: false
  cross_project_scan_allowed: false
  deep_read_requires_reason: true

stage_patches:
  - patch_type: scene-topic-gate
    stage: topic
    version: v1
    status: completed
    updated_at: 2026-06-07T12:15:00+08:00
    summary: 选题评分91分/focus，decision=go。风格确认classic_studio_wuxia（live_action_cinematic）。角色去版权化为"士兰"。
  - patch_type: scene-reference-decider
    stage: reference
    version: v1
    status: completed
    updated_at: 2026-06-07T12:20:00+08:00
    summary: 参考类型裁定hybrid_reference。主参考宫斗剧类型母题，辅参考棚拍美学。严禁继承具体剧集角色名/服装/镜头。
  - patch_type: scene-story-development
    stage: story
    version: v1
    status: completed
    updated_at: 2026-06-07T12:25:00+08:00
    summary: 故事骨架已确认。6 Beat/90秒鬼畜喜剧，情绪曲线悲壮→懵圈→崩溃→心酸→荒诞高潮→温暖释然。
  - patch_type: scene-asset-checker
    stage: assets
    version: v1
    status: completed
    updated_at: 2026-06-07T12:30:00+08:00
    summary: 全新项目，全部new_full/new_light。4角色+3场景+5核心道具，无复用资产。
  - patch_type: scene-design-builder
    stage: design
    version: v1
    status: completed
    updated_at: 2026-06-07T12:45:00+08:00
    summary: >
      focus完整设定。士兰(new_full/脸型蒋欣参考)，冷宫双状态(new_full)，5道具状态机(new_core_prop)，
      3配角(new_light)+3配角图片提示词+5道具图片提示词。棚拍布景感为核心美学。
  - patch_type: scene-script-adapter
    stage: script
    version: v1
    status: completed
    updated_at: 2026-06-07T12:55:00+08:00
    summary: 9段×10秒=90秒正式剧本，含台词+场景描述。exaggerated_comedy演绎风格。
  - patch_type: scene-performance-director
    stage: performance
    version: v1
    status: completed
    updated_at: 2026-06-07T13:05:00+08:00
    summary: 士兰9段+3配角+2Hero Moment表演方案，含眼神/微表情/肢体/停顿/反应节奏+动作情绪连续性链。
  - patch_type: scene-storyboard-director
    stage: storyboard
    version: v1
    status: completed
    updated_at: 2026-06-07T13:10:00+08:00
    summary: 18镜头双语故事板Prompt包，9段各2镜+Linkage连续性锚点。Hero Shot: SH15 LED穿透+SH11躺地独白。
  - patch_type: scene-audio-director
    stage: audio
    version: v1
    status: completed
    updated_at: 2026-06-07T13:15:00+08:00
    summary: 9段音频方案。BGM/环境音/音效三层设计，Seg6全静默，Seg8史诗BGM突然静音。
  - patch_type: scene-video-prompt-builder
    stage: video_prompts
    version: v1
    status: completed
    updated_at: 2026-06-07T13:20:00+08:00
    summary: 9段×10秒=90秒视频生成提示词包，含分分镜参数+模型编译Prompt+全片连续性控制总结。
  - patch_type: scene-storyboard-director-rollback
    stage: storyboard
    version: v1
    status: rolled_back
    updated_at: 2026-06-08T00:00:00+08:00
    summary: 18镜头故事板此前越级生成（未经预览确认闸门），已回退。产物文件标记为STALE。后续须按multi_pack_recommended拆包预览。
  - patch_type: scene-storyboard-director
    stage: storyboard
    version: v2
    status: completed
    updated_at: 2026-06-08T00:30:00+08:00
    summary: 4包44镜故事板Prompt包正式完成(multi_pack)。用户已确认拆包方案。Pack A/B/C/D覆盖9段全片。
  - patch_type: scene-storyboard-director
    stage: storyboard
    version: v3
    status: completed
    updated_at: 2026-06-08T01:00:00+08:00
    summary: >
      v8协议全新重跑完成。5包整板故事板总板prompt(复制即用gpt-image2)，
      每包含复制专用主Prompt+控制版+风格版+8条控制轨道。
      内部中间层beat_skeleton/VGU/shot_continuity已落盘。旧逐镜格式文件全部STALE。
  - patch_type: scene-audio-director-rollback
    stage: audio
    version: v1
    status: rolled_back
    updated_at: 2026-06-08T00:00:00+08:00
    summary: 音频方案此前越级生成，已回退。产物文件标记为STALE。
  - patch_type: scene-video-prompt-builder-rollback
    stage: video_prompts
    version: v1
    status: rolled_back
    updated_at: 2026-06-08T00:00:00+08:00
    summary: 视频提示词包此前越级生成，已回退。产物文件标记为STALE。
  - patch_type: scene-video-prompt-builder
    stage: video_prompts
    version: v1
    status: completed
    updated_at: 2026-06-08T16:25:00+08:00
    summary: >
      全新重跑完成。5中文Pack+1英文导演长版(41镜/9段×10s/6 VGU)。
      Segment+Shot+Timecode双层+可直接复制使用块(四层/指令语气)。
      旧产物已全部删除。review通过。推进到scene-publish-review。
