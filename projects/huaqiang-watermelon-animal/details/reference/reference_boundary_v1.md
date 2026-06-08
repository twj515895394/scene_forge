# 参考边界裁定卡 (reference_boundary_v1.md)

本文件定义《华强买瓜》动物版改编的参考边界、允许继承项、规避项及具体无害化约束。

---

## 一、 参考基本设定与剧本模式

```yaml
data:
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: bypassed
      selected_idea_id: ""
      selected_title: ""
      selection_note: "非视频源输入，直接基于平头哥动物改编的创意决策执行。"
    downstream_rule: 下游各阶段围绕平头哥（蜜獾）华强与恶霸犬老板、土拨鼠小弟的对峙进行夸张喜剧演绎设计。
  reference_type: hybrid_reference
  decision_summary: 剧情和台词主要参考电视剧《征服》原片，角色设定与物理动作参考 3D 动画电影夸张喜剧。
```

---

## 二、 参考边界细则

```yaml
  reference_boundary:
    primary_reference: 电视剧《征服》华强买瓜片段
    secondary_reference: 3D 动画电影夸张喜剧表达 (Pixar/Minions 物理与表演风格)
    boundary_rule: 继承原片的冲突主线与高识别度台词，但将角色和动作进行拟人化动物重构，并将写实暴力高潮改为西瓜汁爆裂的动画去害化表现。
    allowed_inheritance:
      - 角色关系
      - 标志道具
      - 情绪核心
      - 剧情骨架
    forbidden_inheritance:
      - 角色身份
      - 服装轮廓
      - 镜头动势
```

---

## 三、 保留与规避约束 (Must Keep & Must Avoid)

```yaml
  must_keep:
    - category: 剧情骨架
      note: 到摊-挑衅提问“这瓜保熟吗”-上秤冲突-揭穿吸铁石猫腻-高潮劈瓜/炸瓜-离场，这一核心故事逻辑必须完整保留。
    - category: 情绪核心
      note: 平头哥华强始终冷静、略带戏谑的压迫感，与恶霸犬摊主逐渐暴躁、失控的愤怒，以及土拨鼠小弟狗仗人势后惊恐退缩的戏剧张力必须维持。
    - category: 标志道具
      note: 西瓜（作为主要交易物）、电子秤（作为吸铁石作弊道具及被劈碎实体）必须保留。

  must_avoid:
    - category: 角色身份
      note: 避免任何写实人类面部特征或人体比例，角色必须是高识别度的拟人化蜜獾、斗牛犬和土拨鼠。
    - category: 镜头动势
      note: 规避写实、血腥的持刀砍人或刺伤动作。劈瓜高潮需转译为无害的物理爆破，西瓜被劈开瞬间释放大量西瓜汁形成小范围气浪。
    - category: 服装轮廓
      note: 避免完全复刻原版人类的衣服尺寸，衣物需根据动物体型定制，例如蜜獾华强的机车皮夹克要体现其厚实圆滚的肩膀，恶霸犬的白背心要衬托出其宽阔的胸肌与赘肉。
```

---

## 四、 其他信息与风险说明

```yaml
  source_intake_reference_use:
    source_intake_used: false
    files_read: []
    inherited_core: []
    inherited_highlights: []
    rewritten_or_replaced: []
    avoid_copying: []
  risk_notes:
    - 动作无害化是首要合规要点，提示词和故事板描述中必须明确“无流血、无写实暴力，仅为西瓜汁与果肉物理喷溅效果”。
  next_action: 进入 scene-story-development 阶段开发轻量故事骨架。
```
