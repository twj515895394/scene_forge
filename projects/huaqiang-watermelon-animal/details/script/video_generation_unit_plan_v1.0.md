# 视频生成单元规划卡 (video_generation_unit_plan_v1.0.md)

本文件对《华强买瓜》动物版后续 3D 动画及 AI 视频模型的生成单元（Video Generation Units, VGUs）进行高密度切分与连续性焦点标定，每段均规划 4-8 个镜头以强化电影级视听张力。

---

## 一、 视频生成单元 (VGU) 规划列表

```yaml
video_generation_unit_plan:
  - vgu_id: VGU_01
    linked_beat_ids:
      - B01
    narrative_goal: 建立街角水果摊正面全景，展示平头哥骑摩托驶入并停靠的过程。
    target_duration_seconds: 10
    shot_density_hint: 4镜 (高动态调度)
    shot_details:
      - shot_01: 街角水果摊正面大远景，马路空旷，微风吹拂雨棚，背景传来突突突的摩托引擎声。
      - shot_02: 侧向跟拍。平头哥骑着粉色小踏板车、戴着猫耳粉安全帽由远及近慢速滑入。
      - shot_03: 水果案板侧面反打。恶霸犬老板横躺在竹椅上抖脚剔牙，斜眼瞅见摩托驶入。
      - shot_04: 正面中近景。平头哥在摊前稳稳熄火，踩下脚撑，以一言不发的冷峻坐姿直视前方。
    bridge_required: true
    action_continuity_focus: 踏板摩托车滑行轨迹、车胎与泥地泥点飞溅、平头哥双手把车姿势。
    emotion_continuity_focus: 冷峻压迫感的建立。

  - vgu_id: VGU_02
    linked_beat_ids:
      - B02
    narrative_goal: 平头哥下车摘安全帽，问出首句台词。
    target_duration_seconds: 10
    shot_density_hint: 4镜
    shot_details:
      - shot_01: 平头哥正面近景特写，戴着黑皮套的爪子慢条斯理地解开安全帽的粉色挂扣。
      - shot_02: 摩托把手侧景。平头哥摘下小粉帽，稳稳地挂在左反光镜柱把手上。
      - shot_03: 低角度跟拍。平头哥穿着粗壮机车靴，沉稳踱步至老旧木案板前。
      - shot_04: 拍瓜近景。平头哥伸手在台面绿皮大瓜上“咚咚”叩击两声，冷酷开腔：“老板，这西瓜多少钱一斤啊？”
    bridge_required: true
    action_continuity_focus: 粉色安全帽挂在反光镜柱上的摇晃状态，敲瓜的爪子高度与收回姿态。
    emotion_continuity_focus: 平缓、冷酷的挑衅切入。

  - vgu_id: VGU_03
    linked_beat_ids:
      - B03
    narrative_goal: 展现恶霸犬老板市侩抠牙回绝，平头哥冷眼嚼草。
    target_duration_seconds: 10
    shot_density_hint: 4镜
    shot_details:
      - shot_01: 恶霸犬老板仰视大特写。双眼眯成缝，鼻尖大蒜鼻翕动，眼神充满不耐烦与轻蔑。
      - shot_02: 狗爪剔牙特写。肥壮爪尖用牙签一抠，吐掉，斜眼撇嘴：“两块钱一斤。”
      - shot_03: 侧面双人中景。恶霸犬挺了挺肚腩，而平头哥在对面双臂环抱在胸前，一动不动。
      - shot_04: 平头哥眼神大特写。眼神冰冷，嘴角的一根细干草签微微上下咬动咀嚼。
    bridge_required: true
    action_continuity_focus: 剔牙牙签的抛物线落地，平头哥嘴角干草的朝向。
    emotion_continuity_focus: 双方冷硬气场的初次交错。

  - vgu_id: VGU_04
    linked_beat_ids:
      - B04
    narrative_goal: 平头哥正面抛出“金子皮”的经典嘲讽，恶霸犬面色下沉。
    target_duration_seconds: 10
    shot_density_hint: 4镜
    shot_details:
      - shot_01: 平头哥面部特写。眼睛微微睁大，眉骨紧压，吐字：“卧槽，这西瓜皮是金子做的...”
      - shot_02: 恶霸犬老板嘴角耸动特写。嘴皮向上扯起，露出一侧泛黄的下门牙。
      - shot_03: 反打平头哥特写。冷嘲低语：“...还是西瓜子是金子做的？”
      - shot_04: 案板中景。恶霸犬的剔牙大粗腿猛地踩实地面，面色黑沉下来，空气骤然凝聚。
    bridge_required: true
    action_continuity_focus: 平头哥嘴边胡须的物理震颤，老板两耳竖起的防备状态。
    emotion_continuity_focus: 对峙张力加速压缩。

  - vgu_id: VGU_05
    linked_beat_ids:
      - B05
    narrative_goal: 老板站起身挺肚吵嚷，平头哥冷静命令挑瓜。
    target_duration_seconds: 10
    shot_density_hint: 5镜
    shot_details:
      - shot_01: 侧面大中景。竹椅摩擦地发出刺耳声响，恶霸犬臃肿庞大的身子猛地站立挺直。
      - shot_02: 恶霸犬视角仰拍。他指着货架大喊：“你瞧瞧现在哪有西瓜啊？这都是大棚的西瓜...”
      - shot_03: 恶霸犬前倾压迫特写：“...你嫌贵我还嫌贵呢！”飞沫特效。
      - shot_04: 俯拍平头哥。他身体静止如石，仰头冷视，嘴角干草嚼动。
      - shot_05: 平头哥低气压低沉发音特写：“给我挑一个。”
    bridge_required: true
    action_continuity_focus: 椅子向后位移的距离，恶霸犬滑落肩头的白色背心带。
    emotion_continuity_focus: 横蛮粗野与深邃冷静的力量较量。

  - vgu_id: VGU_06
    linked_beat_ids:
      - B06
    narrative_goal: 老板拍瓜上台，平头哥经典姿态拷问“这瓜保熟吗？”。
    target_duration_seconds: 10
    shot_density_hint: 5镜 (关键节点)
    shot_details:
      - shot_01: 恶霸犬老板侧转抱瓜。粗鲁拍击瓜架大绿瓜，将其重重抱起。
      - shot_02: 案板特写。大绿西瓜“咚”一声重重拍砸在油腻的木台面上，震起木屑。
      - shot_03: 恶霸犬狞笑特写。厚爪压在西瓜上：“行！这瓜怎么样？”
      - shot_04: 经典姿态复刻镜头（全景/中景反打）。平头哥身形略微下沉前倾，双爪撑在破旧长木案板边缘，头微微向左偏斜，黑眼珠微微上翻，死死且危险地锁死恶霸犬。
      - shot_05: 平头哥嘴部特写。极其缓慢、低平的声音飘出：“这瓜保熟吗？”
    bridge_required: true
    action_continuity_focus: 平头哥双爪撑住案板的受力位置、**头部偏斜的角度（完美复刻征服原Post）**。
    emotion_continuity_focus: 戏剧最强暴点预热，背景音知了叫声瞬间静音。

  - vgu_id: VGU_07
    linked_beat_ids:
      - B07
    narrative_goal: 恶霸犬嚣张质问，平头哥二次重复保熟问题，摊主一愣。
    target_duration_seconds: 10
    shot_density_hint: 5镜 (关键神态交锋)
    shot_details:
      - shot_01: 恶霸犬老板狂怒前倾特写。尖牙大张，吼叫：“我开水果摊的，能卖给你生瓜蛋子？！”
      - shot_02: 土拨鼠小弟中景侧拍。在右后方疯狂摇着大纸扇，缩头围观。
      - shot_03: 平头哥特写。依旧冷冰冰地维持原经典撑桌姿势，眼神如深渊般死寂，死死盯视。
      - shot_04: **摊主一愣特写（Stunned Moment）**。恶霸犬大吼完后的老脸突然一僵，瞳孔急剧一缩，神色出现了一瞬间的卡壳和惶恐（被平头哥这野兽般的冷静眼神彻底刺痛）。
      - shot_05: 平头哥缓缓吐字：“我问你这瓜保熟吗？”
    bridge_required: true
    action_continuity_focus: 平头哥双爪撑桌的力道感，恶霸犬额头流下的汗珠。
    emotion_continuity_focus: 心理压迫推至顶点。

  - vgu_id: VGU_08
    linked_beat_ids:
      - B08
    narrative_goal: 老板拔刀威慑剁案板，双方对峙亮爪。
    target_duration_seconds: 10
    shot_density_hint: 5镜
    shot_details:
      - shot_01: 恶霸犬重重掴在案板上，顺手抽出旁边的水果大弯刀。
      - shot_02: 大刀特写。泛光的精钢西瓜刀“夺”的一声猛然剁入木案板中，刀身剧烈抖动铮鸣。
      - shot_03: 恶霸犬面目狰狞怒吼：“你是故意找茬是不是？你要不要吧！”
      - shot_04: 平头哥低头斜睨震颤的刀锋，嘴角扯开一丝极度危险的戏谑笑意：“这瓜要是熟的我肯定要啊。”
      - shot_05: 反打老板特写。平头哥低沉问：“那它要是不熟怎么办呀？”恶霸犬咬牙切齿指刀：“不熟自己吃了它！”
    bridge_required: true
    action_continuity_focus: 水果刀插在木板中的颤动幅度，刀身对红蓝雨棚颜色的不锈钢折射。
    emotion_continuity_focus: 物理冲突爆发前夕。

  - vgu_id: VGU_09
    linked_beat_ids:
      - B09
    narrative_goal: 平头哥推瓜，老板虚报重量，平头哥伸手掀秤。
    target_duration_seconds: 10
    shot_density_hint: 5镜
    shot_details:
      - shot_01: 近景拍瓜。平头哥伸爪将西瓜推上侧面的蓝色电子秤。
      - shot_02: 电子秤红色 LED 数显屏跳变特写。恶霸犬用手掌心轻拍台面遮掩。
      - shot_03: 恶霸犬斜眼挑衅报数：“十五斤，三十块。这称够数吧？”
      - shot_04: 平头哥眼角余光扫向秤底。嘴角挂着的一抹冷哼。
      - shot_05: 中景。平头哥出爪如闪电，猛然拽住秤盘向上暴扣一掀，电子秤翻转腾空，塑料底盖破裂飞散。
    bridge_required: true
    action_continuity_focus: 电子秤被掀起并在空中翻滚的弧线轨迹，西瓜被推开滑行的终点。
    emotion_continuity_focus: 精准揭局与突然发难。

  - vgu_id: VGU_10
    linked_beat_ids:
      - B10
    narrative_goal: 指认作弊吸铁石，老板砍来，平头哥闪避一爪引爆西瓜风暴。
    target_duration_seconds: 10
    shot_density_hint: 6镜 (Climax 高潮爆发)
    shot_details:
      - shot_01: 平头哥指爪指着地上翻转的电子秤底。特写底盖缝隙里的圆形吸铁石：“吸铁石贴在秤底下，当我傻逼啊？”
      - shot_02: 恶霸犬急眼爆粗，发狂劈起木案板上的大瓜刀砍去。
      - shot_03: 动作特写。平头哥身形往下一缩成团块，带起白色动作残影轻盈后掠，刀劈空剁进案板。
      - shot_04: 亮爪光效。平头哥利爪划出一道半月形白色弧光特效，横掠案板上的绿皮西瓜。
      - shot_05: 流体核爆。西瓜瞬间在木板上爆开，高饱和度的亮红色西瓜汁呈高压龙卷风状喷薄涌出，气流卷携果肉与西瓜籽泼洒。
      - shot_06: 卡通受击。大肚腩恶霸犬被气浪冲击，在原地像陀螺般飞速打转，最后翻白眼呈 X_X 晕眩倒地，头顶亮起三颗闪烁旋转的卡通金星。
    bridge_required: true
    action_continuity_focus: 出爪的破风白弧光效、**西瓜汁亮红色卡通水滴粒子特效（绝对防血液感）**。
    emotion_continuity_focus: 极致暴烈但完全去害化的喜剧视觉大释放。

  - vgu_id: VGU_11
    linked_beat_ids:
      - B11
    narrative_goal: 土拨鼠抱狗头狂嚎萨日朗，平头哥踩摩托冒黑烟离场。
    target_duration_seconds: 10
    shot_density_hint: 5镜 (荒诞大收尾)
    shot_details:
      - shot_01: 案板右侧。被西瓜汁淋得湿漉漉的土拨鼠小弟，哆哆嗦嗦从坍塌的水果架下爬出。
      - shot_02: **土拨鼠咆哮大特写（Classic Meme）**。土拨鼠抱起地上瘫软的恶霸犬狗大头，头部拉伸变形，张开占脸部 60% 大小的巨嘴痛哭嚎叫：“萨——日——朗——！萨——日——朗——！”两侧泪水喷泉状飞溅。
      - shot_03: 反打平头哥。浑身清爽、片尘不染的平头哥踱步跨上粉色小摩托，冷静扣上粉色安全帽。
      - shot_04: 摩托起步特写。小摩托后轮在泥地上卷起沙尘，排气管“突突突”喷出三个依次膨胀扩散的卡通圆黑烟圈。
      - shot_05: 远景镜头。平头哥骑着粉色小车在突突声中缓缓消失在街道拐角，留下嚎嚎大哭的土拨鼠做滑稽淡出背景。
    bridge_required: false
    action_continuity_focus: 摩托车后轮卷起的沙点位置，土拨鼠面部变形拉伸的物理极限。
    emotion_continuity_focus: 终极荒诞歌剧反差谢幕，喜剧效果拉满。
```
