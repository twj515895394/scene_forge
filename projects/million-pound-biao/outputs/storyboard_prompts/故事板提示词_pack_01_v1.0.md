# 故事板提示词包 - Pack 01: 寒冬入店与大葱对峙

*   **项目名称**：`million-pound-biao`
*   **版本**：v1.0
*   **Prompt包编号**：`pack_01`
*   **涵盖镜头**：Shot 01 至 Shot 10 (Segment 1 至 Segment 5)
*   **核心视觉基调**：冷暖色调对切。格子窗外是冷蓝的风雪夜，室内是暖洋洋的橘黄煤气灯。胡桃木装潢和白色台布上透着精致古典。

---

## 🎨 角色与场景视觉全局描述 (Global Prompts for Consistency)

*   **Biao Ge (彪哥)**: A middle-aged Chinese man in 3D Pixar cartoon style, about 5 head tall, slightly chubby, wear an oversized retro black faux leather jacket, a bright red popped-collar polo shirt, a thick gold chain necklace, and retro gold-rimmed aviator sunglasses. Symmetrical features, deadpan default expression.
*   **Ma Dashuai (马大帅)**: An elderly Chinese rural man in 3D Pixar style, 5.5 head tall, slightly hunched, weathered face with deep wrinkles, wear a rough grey linen Chinese button-up shirt and blue trousers, black fabric shoes.质朴憨厚.
*   **Wu Zong (吴总)**: A chubby middle-aged Chinese restaurant manager in 3D Pixar style, 5 head tall, round belly, wear a black Victorian suit vest, dark trousers, and an oversized shiny gold watch on his left wrist.
*   **A Gang (阿刚)**: A tall and skin-thin Chinese waiter in 3D Pixar style, 6.5 head tall, thin triangle face, high shoulders, wear a black-and-white Victorian waiter vest with a crooked red bow tie, carry a white cleaning rag on his shoulder.
*   **Victorian Tea Room (1903古典英式茶室)**: A luxurious 1903 English tea room, polished mahogany wall panels, white cotton tablecloths, gas wall sconces emitting warm orange glow, big brass Roman numeral clock on the wall above the entrance.

---

## 📽️ 镜头级提示词清单 (Shot Prompts)

### 🎥 Shot 01 (ECU - ECU 彪哥贴玻璃)
*   **画面描述**：特写结满白色霜花的格子玻璃窗，外景是大雪。彪哥那胖乎乎的大脸紧紧贴在窗户玻璃上向里窥视，蛤蟆镜略带雾气，从嘴里呼出一大团白色的卡通蒸汽体积光。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style extreme closeup. A chubby Chinese man with aviator sunglasses pressed his face against a frosty windowpane of a Victorian tea room. Snowing heavily outside. He is blowing a large puffy cloud of white cartoon steam onto the glass. Inside is warm orange gaslight, outside is cold blue winter. Clay render style, Unreal Engine 5 render, soft volumetric light, cinematic composition. --ar 16:9

### 🎥 Shot 02 (CU - 跟拍雪地鞋子)
*   **画面描述**：低机位，特写彪哥踩在雪地上的黑色老式皮鞋，一步一步在大雪中前移，背带在脚边投下长长的影子，背后露出一根被大红绿花布包袱皮裹着的长枪木枪托轮裹。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style closeup, extremely low angle tracking shot. Old black leather shoes walking on thick white snow towards a mahogany door of a warm shop. A long rod wrapped in bright red and green floral print fabric hangs behind, exposing a brown walnut wood butt. High detail, soft snow particles, volumetric blue winter evening light, clay render. --ar 16:9

### 🎥 Shot 03 (WS - 彪哥推门撞枪)
*   **画面描述**：茶室入口全景。彪哥背着长长的大花布长枪推开拱形大门跨入。因为枪包过长，在通过门框时，枪包顶端重重磕碰在门沿上，枪身在半空中发生了略带弹性拉伸的卡通颤抖，彪哥上身紧绷。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style wide shot. Symmetrical composition. A chubby Chinese man in a black leather jacket walks through a grand arched wooden entrance of a Victorian tea room. A long rod wrapped in red-and-green floral fabric on his back hits the top of the door frame, showing subtle motion blur and cartoon elastic vibration. Polished mahogany floor, warm gas sconces, clay texture, cinematic light. --ar 16:9

### 🎥 Shot 04 (MS/OTS - 柜台冷眼吴总阿刚)
*   **画面描述**：中景，过肩镜头。前景是 Zone B 柜台，吴总挺着啤酒肚，手腕上晃眼的大金表反光极强，算盘在侧。吴总和高瘦的阿刚正用十分嫌弃和戒备的冷眼，盯着背景大门处的彪哥。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style medium shot, over-the-shoulder view. In the foreground, a chubby manager with a shiny oversized gold watch on his wrist stands behind a mahogany cashier desk. He and a tall, paper-thin waiter with a triangle face squint suspiciously at a weirdly dressed man standing in the doorway in the background. Saturated colors, soft rendering, Unreal Engine 5 style. --ar 16:9

### 🎥 Shot 05 (MS - 阿刚甩毛巾单手指路)
*   **画面描述**：中景，低视角仰拍。倒三角脸的高瘦阿刚双手一展，把肩膀上的白毛巾甩在空中划圈，高耸着细细的肩膀，用一根细长的手指，极度傲慢地指着 Zone C 角落里最窄小的餐椅。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style medium shot, low angle. A tall, extremely thin Chinese waiter with high shoulders whips a white cleaning rag in the air. He points his long skinny finger condescendingly towards a dark, cramped corner of a grand dining hall. Arrogant facial expression, dynamic pose, stylized animation lines. --ar 16:9

### 🎥 Shot 06 (MLS - 角落圆桌甩菜单)
*   **画面描述**：中远景。靠窗的狭小圆桌。阿刚以极其夸张的扭腰动作，将本巨大的厚皮菜单“啪”地摔在白棉布台面上。彪哥毫不在意，大度合十坐进皮革椅，长枪裹着花布倚在窗下的墙角里。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style medium long shot. A cramped round table by a dark window of a Victorian tea room. A thin waiter slaps a heavy leather menu onto the white tablecloth. A chubby man in a black leather jacket sits calmly in a leather chair. A long rod wrapped in green-red floral fabric rests in the corner under the window. Cold blue light from window, warm orange wall light. --ar 16:9

### 🎥 Shot 07 (ECU - 彪哥吸面嚼大葱)
*   **画面描述**：仰拍，面碗大特写。面条和一盘蘸酱在正下方。彪哥大脸埋下狂吸面条，面条拉出Smear Frame重影残影，他的两肋肌肉高鼓，右手拿着一根被咬断的脆皮大葱。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style extreme closeup, low angle point of view from inside a noodle bowl. A chubby Chinese man with aviator sunglasses slurps noodles wildly, the noodles stretching in smear frame motion blur. His cheeks are cartoonishly puffed like balloons. He holds a half-bitten green onion in his hand. Exaggerated comedy facial expressions, warm dramatic side lighting, high rendering detail. --ar 16:9

### 🎥 Shot 08 (WS/Pan - 邻桌马大帅吃红薯)
*   **画面描述**：全景，横向摇镜头。左边是柜台前吴总直撇嘴嫌弃；镜头平移向右侧，邻桌坐着微驼的马大帅。马大帅双手捧着剥了皮的烤红薯，红薯正冒出连续不断的白气体积雾，马大帅斜着眼嫌弃彪哥。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style wide shot. In a luxurious tea room, an elderly rural Chinese man sits at an adjacent table, slightly hunched. He holds a peeled steamed sweet potato with realistic soft volumetric steam rising. He squints in extreme disapproval at a man eating noisily nearby. Clay texture, detailed linen clothing, warm volumetric gaslight. --ar 16:9

### 🎥 Shot 09 (CU - 碗底反光折射阿刚)
*   **画面描述**：特写，俯视碗底。锃亮如镜子的陶碗底把台布的纹理都擦白。碗底的金属般镜面反射里，赫然折射出阿刚面无表情、端着账单走来的大头投影，产生滑稽的透视变形。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style closeup, vertical view looking down into a completely clean ceramic bowl. The mirror-like shiny bottom of the bowl perfectly reflects the cartoon face of a thin, cold waiter holding a bill clipboard, approaching from behind. Symmetrical reflective warping, soft ambient lighting, high PBR detail. --ar 16:9

### 🎥 Shot 10 (MS - 马大帅地瓜吐槽)
*   **画面描述**：中景，马大帅吃地瓜特写。马大帅一边咬着冒汽的红薯，嘴边沾着碎屑，一边皱着眉、无奈地撇嘴摇头，朝彪哥的方向叹着气嘟嘟囔囔，背景是彪哥打嗝时被震得挺起的大肚子。
*   **MJ/Flux Prompt**:
    > **Prompt**: 3D Pixar style medium shot. A weathered elderly Chinese man in a grey button-up shirt eats a sweet potato with rising steam. He shakes his head with a sigh of extreme disapproval, looking towards a chubby man in the background who is bloating his belly after eating. Detailed facial expressions, clay model rendering, cinematic depth of field. --ar 16:9
