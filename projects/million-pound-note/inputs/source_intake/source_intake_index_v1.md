# source_intake_index_v1.md

```yaml
source_intake_index:
  version: v1
  source_summary: "《百万英镑》经典餐厅结账片段的结构化解析，包括28个镜头的详细分镜、对白逐字稿、摄影与画面构图分析、声音设计与物理空间运动轨迹。"
  file_manifest:
    - file: "projects/million-pound-note/inputs/source_intake/source_video_analysis_v1.md"
      content_type: "video_metadata_and_space_analysis"
      when_to_read: "在设计角色造型、场景道具清单与镜头视觉风格时"
      key_sections: ["一、视频基础信息", "三、场景空间关系解析", "四、人物角色分析"]
    - file: "projects/million-pound-note/inputs/source_intake/source_video_timeline_v1.md"
      content_type: "shot_by_shot_timeline_breakdown"
      when_to_read: "在分镜导演与动作链设计阶段核对特定动作与画面时"
      key_sections: ["逐镜头分镜时间轴"]
    - file: "projects/million-pound-note/inputs/source_intake/source_video_dialogue_v1.md"
      content_type: "dialogue_transcript"
      when_to_read: "在进行剧本改编与对白节奏拟定时"
      key_sections: ["对白逐字稿"]
    - file: "projects/million-pound-note/inputs/source_intake/source_video_audio_v1.md"
      content_type: "audio_design_and_music"
      when_to_read: "在声音导演进行配乐与音效策划时"
      key_sections: ["一、背景音乐（BGM）的喜剧化调度", "二、核心环境音与音效设计（Foley）"]
    - file: "projects/million-pound-note/inputs/source_intake/source_video_camera_v1.md"
      content_type: "camera_language_and_composition"
      when_to_read: "在分镜方案的机位、镜头运动与构图设计时"
      key_sections: ["1. 构图的阶级与心理隐喻", "2. 镜子的反射手法（Dual-Identity）"]
    - file: "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
      content_type: "content_priority_and_adaptation_boundaries"
      when_to_read: "在进行选题评分与改编规则制定时"
      key_sections: ["content_priority_map"]

  chapter_index:
    topic_gate:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/topic_gate_handoff_v1.md"
        - "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
    reference_decider:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
    design_builder:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_analysis_v1.md"
    script_adapter:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_dialogue_v1.md"
        - "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
    performance_director:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_analysis_v1.md"
    storyboard_director:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_camera_v1.md"
        - "projects/million-pound-note/inputs/source_intake/source_video_timeline_v1.md"
    audio_director:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_audio_v1.md"
    video_prompt_builder:
      read_files:
        - "projects/million-pound-note/inputs/source_intake/source_video_priority_map_v1.md"
        - "projects/million-pound-note/inputs/source_intake/source_video_camera_v1.md"

  priority_summary:
    core_must_keep:
      - "180度态度剧变喜剧冲突模式"
      - "伦敦高档英式餐厅/茶室物理场地与构图布局（改编中物理场地保持不变）"
      - "主角狼吞虎咽吃相与店家的傲慢怀疑"
      - "亮出支付工具与确认支票时的喜剧视听骤停"
    highlight_should_keep:
      - "挂钟滴答声特写"
      - "侍应生下巴脱臼表情特写"
      - "主角用面包擦盘子动作细节"
      - "结尾两列整齐的90度谄媚深鞠躬送客"

  adaptation_ideas_summary:
    idea_count: 6
    recommended_ideas:
      - "落魄古代书生在繁华京城客栈结账亮出御赐免死金牌/至尊玉玺（场地不变，纯改编角色）"
      - "落魄现代青年在奢侈法式餐厅结账亮出写满机密的黑金芯片（场地不变，纯改编角色）"
      - "落魄未来流浪汉在太空中转站豪华复古茶室结账亮出银河系地契（场地不变，纯改编角色）"
    user_selection_required: true

  read_policy:
    default_stage_budget: "compact"
    recommended_first_read:
      - "inputs/source_intake/topic_gate_handoff_v1.md"
      - "inputs/source_intake/source_video_priority_map_v1.md"
    avoid_default_full_read:
      - "inputs/source_intake/source_video_analysis_v1.md"
      - "inputs/source_intake/source_video_timeline_v1.md"
```
