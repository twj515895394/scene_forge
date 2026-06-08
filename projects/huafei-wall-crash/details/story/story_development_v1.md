data:
  script_strategy:
    status: selected
    mode: rewrite_adaptation
  creative_direction_context:
    script_mode: rewrite_adaptation
    selected_adaptation:
      status: selected
      selected_idea_id: shilan_parody_selected
      selected_title: 士兰撞墙鬼畜——撞什么都撞不死
      selection_note: >
        用户已确认改编方向。角色去版权化（华妃→士兰，皇帝的妃子）。
        核心引擎：所有可撞之物都是道具，怎么撞都撞不死。
    downstream_rule: >
      下游围绕6 Beat鬼畜喜剧结构执行。开场悲壮还原→道具连环失败→情绪低谷→LED墙高潮→释然结局。
      严格遵循 classic_studio_wuxia 棚拍美学，道具梗作为风格本体。
  story_confirmation:
    confirmed_by_user: true
    confirmation_note: 用户已确认6 Beat故事骨架、角色功能和情绪曲线。
  story_development_summary: >
    以"悲壮赴死→道具连环穿帮→片场真相→释然和解"为主轴，
    用6个Beat完成起承转合，情绪曲线为悲壮→懵圈→崩溃→心酸→荒诞高潮→温暖释然。
    核心喜剧引擎为"预期违背"：越是认真悲壮，反差越强。
  logline: >
    皇帝的妃子士兰在冷宫中决意赴死，却发现宫里所有可撞之物全是道具——
    泡沫柱、纸板墙、蹦床地板、绿幕布、LED屏——撞什么都撞不死，
    最后在片场众目睽睽之下决定不撞了，凑合活着。
  story_premise: >
    用"道具穿帮"驱动预期违背喜剧，每段升级荒诞程度，在B04插入情绪低谷给观众喘息，
    最后用LED墙穿透达成终极翻转，以释然和解收尾。彩蛋callback原剧角色关系。
  duration_target:
    target_total_duration_seconds: 90
    rationale: 6个Beat各15秒，紧凑节奏适合短视频平台传播。
  story_beats:
    - beat_id: B01
      title: 悲壮开场
      function: setup
      beat_summary: >
        完全还原原剧名场面氛围：烛火摇动，士兰跪坐冷宫，眼眶通红。
        喊出名台词"陛下，你害得士兰好苦啊！！！"——
        悲剧BGM拉满，慢镜头，士兰起身冲刺撞向石柱。
        就在额头接触柱子的瞬间：橡皮鸭子音效，柱子如果冻般晃动弹回。
        士兰一屁股坐地，表情从悲壮→懵圈。
        特写：柱子上便利贴"道具泡沫柱，请勿用力撞击——横店影视城"。
      emotion_goal: 建立极致悲壮氛围，然后在最后一帧用物理笑点瞬间粉碎。
      dramatic_question: 她会不会发现这只是个开始？
      payoff_seed: 泡沫柱子上的便利贴暗示整个冷宫都不对劲。
    - beat_id: B02
      title: 卷土重来
      function: escalation
      beat_summary: >
        士兰爬起，拍灰，冷笑"区区泡沫，也配挡本宫？"
        锁定另一根柱子——学聪明了，先敲，咚咚咚像石头，满意点头。
        再次悲壮冲刺。柱子像硬纸板直挺挺倒下。
        露出柱子后正在吃泡面的场务小哥。
        场务（面条挂嘴边）："士兰老师？您这场已经拍了八遍了……"
        空气凝固，场务默默扶起柱子。
      emotion_goal: 从"我不信"升级到"社死"——第三方围观让荒诞加倍。
      dramatic_question: 还有什么是真的？
      payoff_seed: 场务的出现确认了"这是片场"的元设定。
    - beat_id: B03
      title: 连环失败
      function: peak_chaos
      beat_summary: >
        士兰彻底怒了，开始乱撞。快剪蒙太奇（每段1.5秒，加速BGM）：
        撞桌子→纸糊的咔嚓碎；撞门→自动感应门自己开了，人飞出去；
        撞香炉→充气的噗一声瘪了；撞墙→绿幕背景布，裹着绿布滚成木乃伊。
        弹幕特效飘过："道具组是不是没预算""这宫里还有真东西吗"。
        士兰披头散发，深呼吸，摆出跳水预备姿势。
        奥运跳水BGM响起——头朝下俯冲地面——
        地面塌陷，弹了起来。蹦床。弹上弹下七八次，每次"啊——放我下来——"。
        最终脸朝下趴地，头顶金色小鸟转圈——昏过去了。
      emotion_goal: 从崩溃到彻底荒诞，蒙太奇快节奏制造笑点密度峰值。
      dramatic_question: 她还会醒过来吗？
      payoff_seed: 蹦床是道具清单的最后一项，B04需要情绪喘息。
    - beat_id: B04
      title: 短暂的沉默
      function: emotional_breather
      beat_summary: >
        安静。士兰缓缓睁眼，没有立刻爬起。翻身躺地，怔怔望房梁。
        背景隐约传来片场闲聊："泡沫柱子谁准备的""蹦床谁放那里的"。
        鸽子飞过，鸽子叫。士兰独白（全片唯一正经台词）：
        "士兰争了一辈子。争恩宠，争地位，争一口气。到头来，连一面真的墙，都争不到。"
        长镜头：天花板很高，灯光在她脸上形成孤独剪影。
        停顿三秒——然后猛地坐起来，眼神变了：
        "不对。冷宫。冷宫的墙一定是真的。那地方没人愿意去，道具组肯定懒得布置。"
        眼睛重新燃起火光。
      emotion_goal: 让观众的笑声卡在喉咙里。悲喜交加的"喜剧内核是悲剧"瞬间。
      dramatic_question: 冷宫的墙会是真的吗？
      payoff_seed: 她的逻辑是对的——越破的地方道具组越不会管。
    - beat_id: B05
      title: 终极一战
      function: climax
      beat_summary: >
        夕阳。冷宫外破旧石墙前。士兰伸手摸——冰凉、粗糙、坚硬。是真的。
        她满意地笑了。以下进入全片最认真的段落：
        宽银幕比例，交响史诗BGM。体育电影训练蒙太奇：
        后退50米画起跑线、拉伸压腿深呼吸、风吹发丝、群演宫人被眼神吓退。
        "陛下，我们来世再见。"起跑，慢镜头，脚蹬地尘土飞扬。
        50米→30米→10米→闭上眼——撞了。没有声音。她穿过去了。
        画面停两秒。士兰从"墙"另一面穿出，踉跄站定。
        明亮灯光、摄像机轨道、收音麦克、导演监视器——墙的背面是LED屏。
        片场所有人停下手里的活看着她。
        导演（从监视器后探出头）："好！这条情绪到了！保一条！"
        副导演凑近小声说："导演，她好像……穿到B组了？"
        士兰嘴唇动了动，大脑一片空白——昏倒，脸朝下。
        灯光师开始鼓掌，然后所有人都开始鼓掌。
      emotion_goal: 从希望拉到最高再砸到最大的荒诞——LED墙是最不可能的道具。
      dramatic_question: 她还能站起来吗？
      payoff_seed: 片场鼓掌是B06释然的前奏——她的"悲剧"在别人眼里是"好戏"。
    - beat_id: B06
      title: 不撞了
      function: resolution
      beat_summary: >
        片场休息区。士兰醒了，头上冰袋，身上毯子，坐帆布折叠椅。
        椅背印"主演·士兰"。实习生递矿泉水，她接过来拧开喝一口。
        很长一段沉默。看眼前片场——有人拆泡沫柱，有人收蹦床。
        士兰（对镜头，平静）："不撞了。活着，喝点水，晒晒太阳。
        被弹飞八次都没死，说明老天不收我。那就……凑合活吧。"
        站起叠好毯子，走两步回头："对了，帮我转告陛下——
        让他下次批道具预算的时候，上点心。"
        切黑。出片名《士兰撞墙未遂事件》。
        小字："全剧唯一想死没死成的女人。"
        ——彩蛋——养心殿。皇上拿iPad看回放：士兰被蹦床弹飞。
        一遍两遍三遍。嘴角抽搐→忍不住→破防大笑→笑得从龙椅上滑下来。
        擦着眼泪拿起对讲机："苏培盛，把这段发给她姐姐。标题写：你姐姐今日战绩。"
        画面定格皇上憋笑脸。字幕滚屏：本片拍摄过程中没有士兰受伤。
        泡沫柱子三根，纸板柱子两根，蹦床一座，绿幕一块，LED屏一面，均已回收利用。
        特别鸣谢：横店影视城道具组。
      emotion_goal: 温暖释然，让观众笑着感到被治愈。彩蛋callback收尾。
      dramatic_question: （收束，不再提问）
      payoff_seed: "让陛下批道具预算上点心"——把矛盾从生死沉重轻轻卸下。
  character_functions:
    - character_name: 士兰
      story_function: 主角，灾难承受者与最终和解者
      conflict_role: 主动赴死却被迫活着，与整个片场的"假"对抗
      emotional_task: 悲壮→懵圈→愤怒→崩溃→心酸→重新振作→更荒诞的失败→释然
    - character_name: 场务小哥
      story_function: B02穿帮触发者，片场现实的代表
      conflict_role: 无意间戳破"悲壮"的泡泡
      emotional_task: 无辜慌乱，无心之失
    - character_name: 导演
      story_function: B05高潮触发者，严肃艺术追求与荒诞的反差
      conflict_role: 把士兰的悲剧当作表演素材
      emotional_task: 专业冷静，越严肃越好笑
    - character_name: 皇上
      story_function: 彩蛋角色，callback原剧角色关系
      conflict_role: 不在现场但被牵连
      emotional_task: 憋笑→破防，观众的代入视角
  core_scene_functions:
    - scene_name: 冷宫（实际为棚拍片场）
      story_function: >
        所有Beat的核心场景。开场充当"真实冷宫"的悲剧空间，
        B02开始逐步暴露棚拍本质，B05彻底揭露。
        空间本身是最大的喜剧道具——从压抑到穿帮的渐进揭示。
      required_beats:
        - B01
        - B02
        - B03
        - B04
        - B05
    - scene_name: 片场休息区
      story_function: B06释然和解的空间。与冷宫的压抑形成对比——明亮、日常、放松。
      required_beats:
        - B06
    - scene_name: 养心殿
      story_function: 彩蛋场景，callback原剧权力关系的喜剧反转。
      required_beats:
        - B06
  key_prop_functions:
    - prop_name: 泡沫柱子
      story_function: B01笑点触发器，第一个揭露"道具真相"的item
      required_beats:
        - B01
    - prop_name: 纸板柱子
      story_function: B02笑点触发器，引入场务小哥穿帮
      required_beats:
        - B02
    - prop_name: 蹦床地板
      story_function: B03笑点顶点，华妃被弹飞八次是B03的核心视觉
      required_beats:
        - B03
    - prop_name: 绿幕背景布
      story_function: B03蒙太奇笑点之一，裹成木乃伊
      required_beats:
        - B03
    - prop_name: LED显示屏墙面
      story_function: B05高潮翻转道具，从"真墙"到"最假的道具"的终极反转
      required_beats:
        - B05
    - prop_name: iPad
      story_function: 彩蛋道具，皇上看回放的工具
      required_beats:
        - B06
  emotional_arc: 悲壮 → 懵圈 → 愤怒 → 崩溃/荒诞 → 心酸/喘息 → 希望 → 更大荒诞 → 释然/温暖
  hero_moment_candidates:
    - hero_id: H01
      title: LED墙穿透瞬间
      related_beat: B05
      reason: 悲壮冲刺+LED穿透+片场穿帮三连击，是全片视觉和情绪的终极爆破点。
    - hero_id: H02
      title: 地上的独白
      related_beat: B04
      reason: 全片唯一正经时刻，喜剧中的悲剧内核，让士兰的角色从"鬼畜对象"升华为"有血有肉的人"。
  ending_payoff: >
    双重收尾：第一层，士兰喝矿泉水说"不撞了，凑合活吧"——将生死主题轻轻放下，
    用日常动作（喝水、叠毯子）传递释然。第二层，彩蛋中皇上笑到滑下龙椅并转发——
    callback原剧角色关系，给老观众一个会心一笑的句号。
  story_risk_notes:
    - B03蒙太奇如果过快可能让观众疲劳，需精确控制每段1.5秒的节奏和音效配合。
    - B04独白长度需精确控制，太长会打断喜剧节奏，太短则无法形成情绪呼吸。
    - B05体育电影蒙太奇致敬段落需拿捏分寸，过度模仿会显得拖沓。
  next_action: 进入 scene-asset-checker，优先判断士兰角色、冷宫场景和六个核心道具是否已有可复用资产。
