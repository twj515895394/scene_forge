data:
  story_function_summary:
    key_characters:
      - name: "总裁"
        role: "红衣7号进攻核心，主导罚球与绝平狂喜"
      - name: "鸭哥"
        role: "白衣门将，长臂伸展防守，提供败北戏剧性"
      - name: "白色人墙"
        role: "5名防守队员群像，在半空展现受惊表情"
      - name: "红衣队友"
        role: "狂喜奔跑的进攻支援群像，丰富庆祝画面"
    key_scenes:
      - name: "海滨竞技场大禁区"
        role: "日落金边下的对峙球场与英文霓虹记分HUD"
    key_props:
      - name: "星纹像素足球"
        role: "高速旋转变形的香蕉弧线飞行道具"
      - name: "比分看板 HUD"
        role: "外化绝平戏剧感的2-3至3-3比分牌"
  character_assets:
    - role_name: "总裁"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "彻底规避肖像侵权，必须从写实改造成皮克斯风格。主角总裁的拉裤脚特写、大腿股四头肌肌肉纤维、大眼深呼吸面部表情绑定需要高规格的完整新建与物理拓扑设计。"
      required_adjustments: []
    - role_name: "鸭哥"
      reuse_status: "new_light"
      asset_ref: ""
      reuse_reason: "门将鸭哥需要制作非写实拉伸造型（如长臂扑救物理），采用轻量化卡通脸捏脸和西班牙色调（灰色/黄色）替换门将队服即可。"
      required_adjustments: []
    - role_name: "白色人墙"
      reuse_status: "new_light"
      asset_ref: ""
      reuse_reason: "人墙为并排起跳的白衣防守群像，可建立一款扁平卡通防守男队员模型，通过微调五官间距和克隆5份拼装来完成，无需单独高规格捏脸。"
      required_adjustments: []
    - role_name: "红衣队友"
      reuse_status: "new_light"
      asset_ref: ""
      reuse_reason: "狂喜庆祝的红衣队友，采用简易的红衣绿色短裤模型和喜感夸张大笑捏脸，直接作轻量资产建立。"
      required_adjustments: []
  scene_assets:
    - scene_name: "海滨竞技场大禁区"
      reuse_status: "new_full"
      asset_ref: ""
      reuse_reason: "避开世界杯场馆和广告版权，必须新建一款带有梦幻日落、高亮探照灯逆光效果的皮克斯卡通球场，并需要将英文大屏幕HUD看板设计作为核心资产部件嵌入。"
      required_adjustments: []
  prop_assets:
    - prop_name: "星纹像素足球"
      prop_status: "new_core_prop"
      asset_ref: ""
      handling_note: "由于该足球在抽射瞬间压扁变形，在空中以香蕉弧线飞行，需要单独编写其受力压扁、子弹自转、入网隆起的状态机与物理形变材质。"
    - prop_name: "比分看板 HUD"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "挂载在海滨竞技场上空的巨型屏幕看板，作为场景组件随球场环境一同渲染，但在数据层面标记其初始/最终比分变化。"
    - prop_name: "裁判白折线喷雾"
      prop_status: "embed_in_character_or_scene"
      asset_ref: ""
      handling_note: "作为草地纹理材质的一部分，直接嵌入球场表面渲染，不建立独立道具卡。"
  design_actions:
    reuse_targets: []
    tweak_targets: []
    new_light_targets:
      - "鸭哥"
      - "白色人墙"
      - "红衣队友"
    new_full_targets:
      - "总裁"
      - "海滨竞技场大禁区"
  asset_lock_file: "projects/classic-freekick-pixar-2018/inputs/assets/asset_lock_v1.md"
  asset_lock_summary:
    locked_characters:
      - "总裁 (new_full)"
      - "鸭哥 (new_light)"
      - "白色人墙 (new_light)"
      - "红衣队友 (new_light)"
    locked_scenes:
      - "海滨竞技场大禁区 (new_full)"
    locked_props:
      - "星纹像素足球 (new_core_prop)"
      - "比分看板 HUD (embed)"
    downstream_constraints:
      - "严禁在总裁、队友或对手球衣上出现任何国家足协Logo或英文字母名字，必须做无字匿名化处理。"
      - "主角总裁球背号码强锁定为亮金色7号，WHT白色人墙为其他非7号码。"
      - "比分看板大屏文字HUD仅限显示英文缩写（RED与WHT），严禁包含任何暗示真实国家的缩写。"
  risk_notes:
    - "皮克斯画风下，纯色红白绿三色球衣色彩饱和度过高时，可能在温暖的黄昏逆光下产生过曝，需设计组在色调配比中平衡亮度。"
    - "所有新建皮克斯模型在比例上均须采用非写实设计，避免总裁面部过于仿真产生肖像侵权隐患。"
  next_action: "进入 scene-design-builder 阶段，优先撰写去版权化的总裁与鸭哥皮克斯角色设定，并确定比分板及像素足球的生成提示词。"
