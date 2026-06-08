# Video Generation Prompt Pack (English Version) v1.0

This pack contains **9 video segment generation prompts** (10 seconds each) for the adapted restaurant checkout scene of *The Million Pound Note*, totaling 90 seconds. This document is a merged version, presenting the standard visual, action, physics, sound, and blocking parameters directly in a **shot-by-shot timeline format**, with the compiled segment prompt at the end of each section.

---

## 🎨 Character & Scene Consistency Anchors

When generating each segment, please reference the following descriptions to maintain visual consistency:
*   **Tang Dynasty Monk (the monk)**: A young Eastern monk, 25-30 years old, bald, with a serene and peaceful expression. He wears an earth-grey coarse cloth monk robe filled with loose threads and patches (impoverished look, noble and imperial posture, walks slowly and elegantly).
*   **Elder Jinchi (Jinchi)**: A short, chubby elderly monk, 5-head-tall proportions, hunchbacked, with a white mustache and a wrinkled face, wearing a gold-wire monocle. He wears a red woolen vest suit with a bow tie, and a diagonal sash of translucent, bright red ruby prayer beads (ping-pong ball sized). His voice alternates between an aristocratic British accent and a snobbish, high-pitched eunuch tone.
*   **店小二 (Waiter)**: A tall, skinny "noodle-man" figure with high-shrugged shoulders, 20-25 years old, with a crooked smirk. He wears a black double-breasted swallowtail vest (with a grey monk-robe border) and has a coarse white towel draped over his shoulder.
*   **Tea Room Scene**: A classical 1903 British tea room with dark carved walnut wood paneling, white cotton tablecloths on round tables, a large brass wall clock on the wood paneling, and warm, low-intensity gas lamps.

---

## 🎥 Detailed Video Generation Plan for the 9 Segments

---

### 🎬 Segment 1 (00:00 - 00:10) | Pacing the Window

*   **Segment Info**:
    *   **Covered Beats**: Beat B01 | Covered Shots: SH01 & SH02
    *   **Target Duration**: 10 seconds (00:00 - 00:10)
    *   **Visual Goal**: Show the impoverished Tang Dynasty Monk outside in the winter cold, looking at the warm interior while shivering from hunger, and taking out the envelope to confirm his decision to enter the restaurant.
    *   **Continuity Control**: Continuity In is fade in; Continuity Out is the Tang Dynasty Monk walking to the right, fully out of the frame, leaving rightward movement.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH01 [00:00 - 00:05] | Outside Gaze**:
    *   **Camera Language**: Medium shot, eye-level, looking through a frost-covered glass window. Foreground framing composition (window frame), static camera, utilizing cold/warm light contrast.
    *   **Action & Performance**: the Tang Dynasty Monk shivers with shrugged shoulders in the wind and snow, hands tucked inside his sleeves. He swallows and stares longingly at the dining guests inside. Lips are purple and trembling. A classic gold calligraphy nameplate "Tang Dynasty Monk" appears at the bottom center.
    *   **VFX & Physics**: A small puff of white cartoon smoke pops up from the Tang Dynasty Monk's stomach, indicating an empty belly. His nose tip is frozen pink (mild cartoon injury).
    *   **Audio & Foley**: Desolate wind howling, teeth chattering, and stomach rumbling. Wooden fish and chime name overlay sound.
    *   **Blocking**: the Tang Dynasty Monk is on the street (Zone A exterior).
    *   **Prop States**: Envelope is hidden in the sleeve.
*   **SH02 [00:05 - 00:10] | Envelope Verification**:
    *   **Camera Language**: Close-up, eye-level. Central composition, slowly panning to the right (as a Bridge shot).
    *   **Action & Performance**: the Tang Dynasty Monk pulls out a dirty, yellowed Xuan paper envelope (State_Closed_Envelope) from his patched sleeve. He stares at it with a slight frown for 0.8 seconds (Hold), tucks it back, turns, and walks out of the frame to the right.
    *   **VFX & Physics**: Envelope details (grease spots, frayed edges, yellowed paper).
    *   **Audio & Foley**: Sleeve and paper rustling. Comical stomach rumbling.
    *   **Blocking**: the Tang Dynasty Monk walks right, fully out of the frame.
    *   **Prop States**: Envelope is pulled out and put back, in 【State_Closed_Envelope】.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:00-00:05 Shot 1] Medium shot, eye-level, looking through a frost-covered cold glass window. Outside, a bald, young Eastern monk (Tang Dynasty Monk) wearing a patched, ragged, earth-grey coarse cloth monk robe, shivering with shrugged shoulders in the wind and snow, his nose tip frozen pink and lips purple. He swallows and stares intently at the dining guests inside. A small puff of white cartoon smoke pops up from his belly. A classic gold calligraphy nameplate "Tang Dynasty Monk" appears at the bottom center. [00:05-00:10 Shot 2] Close-up, eye-level, camera slowly panning right. The young monk the Tang Dynasty Monk pulls out a folded, yellowed, crumpled Xuan paper envelope stained with large brown oil spots from his patched grey sleeve. He stares at the closed envelope with a slight frown for 0.8 seconds, then tucks it back, turns and walks to the right, fully moving out of the frame. Warm light from the high-end tea room background. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, realistic wounds, body horror, or screams. No watermark, no frame noise.

---

### 🎬 Segment 2 (00:10 - 00:20) | Entering the Shop

*   **Segment Info**:
    *   **Covered Beats**: Beat B02 | Covered Shots: SH03 & SH04
    *   **Target Duration**: 10 seconds (00:10 - 00:20)
    *   **Visual Goal**: the Tang Dynasty Monk pushes the door open to enter the luxurious tea room. The waiter and Elder Jinchi spy on him from the counter, establishing spatial and psychological transition.
    *   **Continuity Control**: Continuity In is the Tang Dynasty Monk entering from the left; Continuity Out is the waiter sneering, preparing to walk out from behind the counter, shaking a towel.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH03 [00:10 - 00:15] | Step inside**:
    *   **Camera Language**: Full shot, side eye-level angle. Rule of thirds, camera slowly panning right tracking the movement.
    *   **Action & Performance**: Heavy double oak doors swing open. the Tang Dynasty Monk walks in from the left, clutching the envelope tightly to his chest. He looks nervous and cautious, walking slowly on the red carpet.
    *   **VFX & Physics**: Warm indoor lighting reflecting on the coarse texture of the Tang Dynasty Monk's robe.
    *   **Audio & Foley**: Door creaking, wind blowing in, then indoor ambient dining sounds rising.
    *   **Blocking**: the Tang Dynasty Monk stands at the doorway (Zone A).
    *   **Prop States**: Envelope is held closely at his chest.
*   **SH04 [00:15 - 00:20] | Counter Surveillance**:
    *   **Camera Language**: Medium shot, eye-level (over-the-counter perspective). Foreground framing with a thick dark walnut pillar, static camera.
    *   **Action & Performance**: Behind the counter (symmetrical Chinese nameplates "金池长老" and "店小二" fade in). Elder Jinchi in his red vest suit coldly flicks a jade abacus while rubbing ruby beads. The tall waiter shrugs and comically stretches his neck, rolling his eyes in disgust at the Tang Dynasty Monk.
    *   **VFX & Physics**: Ruby beads water-like glow. Comical neck stretching.
    *   **Audio & Foley**: abacus clicking. Waiter: "Master, look at this pauper..." Jinchi: "Watch him, don't let him dirty the tablecloths."
    *   **Blocking**: Jinchi and the waiter are behind the counter (Zone B).
    *   **Prop States**: Abacus, ruby beads.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:10-00:15 Shot 3] Full shot, eye-level angle, camera slowly panning right. A heavy arched oak double-door opens inward. The young monk Tang Dynasty Monk in his patched grey monk robe walks in from the left side of the frame into the luxurious Victorian tea room, looking nervous and cautious, with his hand tightly clutching the yellowed paper envelope at his chest. [00:15-00:20 Shot 4] Medium shot, over-the-counter perspective, with a thick dark wooden pillars framing the foreground. Behind the high cash register counter, the short, chubby, hunchbacked Elder Jinchi wearing a red wool vest suit and a tie, with huge ruby prayer beads on his chest, coldly flicks a jade abacus. Next to him, the skinny, tall waiter with high shoulders shrugs, stretches his neck comically, and squints his eyes in disgust at the monk. Symmetrical Chinese subtitle overlays "金池长老" and "店小二" fade in at the bottom center. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, realistic wounds, body horror, or screams. No watermark.

---

### 🎬 Segment 3 (00:20 - 00:30) | Guided to the Corner

*   **Segment Info**:
    *   **Covered Beats**: Beat B03 | Covered Shots: SH05 & SH06
    *   **Target Duration**: 10 seconds (00:20 - 00:30)
    *   **Visual Goal**: The waiter arrogantly guides the Tang Dynasty Monk to the most isolated corner booth, completing the blocking lock for sitting.
    *   **Continuity Control**: Continuity In connects with the waiter stepping out; Continuity Out is the Tang Dynasty Monk sitting on the chair.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH05 [00:20 - 00:25] | Arrogant Block**:
    *   **Camera Language**: Medium shot, camera tracking backward as characters move forward, showing room depth.
    *   **Action & Performance**: The waiter approaches with a stiff fake smile, comically blocking the aisle and pointing to the far corner. the Tang Dynasty Monk stands peacefully, palms pressed together in salute.
    *   **VFX & Physics**: Comical elasticity of the waiter's long body.
    *   **Audio & Foley**: Shoe squeaking. Waiter: "This seat is reserved, go this way."
    *   **Blocking**: Moving from the center of the hall to the corner.
    *   **Prop States**: None.
*   **SH06 [00:25 - 00:30] | Wiping the Table**:
    *   **Camera Language**: Full shot, corner booth eye-level, static camera. Symmetrical framing of the corner.
    *   **Action & Performance**: The waiter slaps a yellowed menu onto the white tablecloth and rolls his eyes. the Tang Dynasty Monk bows palms-together, pulls out a chair, and sits down calmly.
    *   **VFX & Physics**: Yellowed paper menu with tea stain details.
    *   **Audio & Foley**: Menu slapped onto the table. Waiter: "Sit." the Tang Dynasty Monk: "Amitabha. Almsgiver, a bowl of plain noodles will do."
    *   **Blocking**: the Tang Dynasty Monk sits on the right, waiter stands on the left of Zone C.
    *   **Prop States**: Menu on the table. Envelope is in the Tang Dynasty Monk's sleeve.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:20-00:25 Shot 5] Medium shot, camera tracking backward as characters move forward. The tall, thin, shrugged-shoulder waiter comically blocks the aisle with his body, showing a fake, wide grin, and points his long arm towards the deep, dark corner card seat. The monk Tang Dynasty Monk stands calmly, palms pressed together in a peaceful salute, walking toward the corner. [00:25-00:30 Shot 6] Full shot, corner booth eye-level, static camera. The waiter comically and rudely slaps a crumpled, yellowed paper menu "slap!" onto the white cotton tablecloth of the dark mahogany round table, rolling his eyes in annoyance. Tang Dynasty Monk quietly sits down on the wooden chair on the right side of the round table, hands clasped together in peace. Dim background of the tea room. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, realistic wounds, body horror. No watermark.

---

### 🎬 Segment 4 (00:30 - 00:40) | Devouring the Noodles

*   **Segment Info**:
    *   **Covered Beats**: Beat B04 | Covered Shots: SH07 & SH08
    *   **Target Duration**: 10 seconds (00:30 - 00:40)
    *   **Visual Goal**: the Tang Dynasty Monk's comical and ravenous noodle-slurping action contrasted with his serene face, and the shopkeepers' sneering surveillance.
    *   **Continuity Control**: Continuity In is the noodles served; Continuity Out is the Tang Dynasty Monk finishing the bowl.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH07 [00:30 - 00:35] | Slurping Noodles**:
    *   **Camera Language**: Close-up, high-angle tabletop view, static camera.
    *   **Action & Performance**: A ceramic bowl of noodles is set down. the Tang Dynasty Monk uses chopsticks to eat rapidly. Noodles blur in the air (Smear Frame) and his cheeks comically balloon out in a fast rhythm.
    *   **VFX & Physics**: Chopsticks speed blur (Smear frame). Yellow soup and green leaf stuck to the corner of his lips. Steam rising.
    *   **Audio & Foley**: Loud cartoon slurping and chewing sounds.
    *   **Blocking**: the Tang Dynasty Monk eats at the table in Zone C.
    *   **Prop States**: Ceramic bowl filled with noodles.
*   **SH08 [00:35 - 00:40] | Cold Glance**:
    *   **Camera Language**: Close-up, eye-level, over-shoulder shot. Symmetrical view of the counter.
    *   **Action & Performance**: Jinchi pinches his nose and squints his monocle. The waiter bends over next to him, whispering and pointing to cut down the green onions.
    *   **VFX & Physics**: Monocle lens reflection.
    *   **Audio & Foley**: Ambient dining sounds, whispering of the two.
    *   **Blocking**: Behind the counter (Zone B).
    *   **Prop States**: Monocle.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:30-00:35 Shot 7] Close-up high-angle shot overlooking the tabletop. A large, chipped blue-grey ceramic bowl sits on the white tablecloth. The monk Tang Dynasty Monk holds bamboo chopsticks, rapidly slurping hot noodles into his mouth. The noodles create motion blur smear frames in mid-air, and his cheeks comically puff up like balloons in alternation. His eyes remain serene, despite a drop of yellow soup and a green leaf stuck to the corner of his lips. [00:35-00:40 Shot 8] Close-up over-shoulder shot. From behind the counter, Elder Jinchi uses his hand to pinch his nose shut, squinting his eyes behind his golden monocle to look at the corner table. The waiter bends over next to him, nodding and whispering in complicity, pointing a finger to gesture saving costs on green onions. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, wounds, body horror. No watermark.

---

### 🎬 Segment 5 (00:40 - 00:50) | Wiping the Bowl

*   **Segment Info**:
    *   **Covered Beats**: Beat B05 | Covered Shots: SH09 & SH10
    *   **Target Duration**: 10 seconds (00:40 - 00:50)
    *   **Visual Goal**: The mundane, absurd detail of the Tang Dynasty Monk wiping the bowl clean with bread, using the reflections and hand insertion to bridge into the bill presentation.
    *   **Continuity Control**: Continuity In connects with empty bowl; Continuity Out is the waiter's hand sliding in.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH09 [00:40 - 00:45] | Bread Wiping**:
    *   **Camera Language**: Close-up, eye-level, symmetrical composition, static.
    *   **Action & Performance**: the Tang Dynasty Monk holds the empty bowl, circles it three times with a piece of bread, wipes every drop of soup, and pops the bread in his mouth with bliss.
    *   **VFX & Physics**: Clean clay bowl bottom reflecting light.
    *   **Audio & Foley**: Squeaking sound of bread on clay. the Tang Dynasty Monk: "Good indeed, good indeed. Labor is precious."
    *   **Blocking**: the Tang Dynasty Monk sits at the right of Zone C.
    *   **Prop States**: Empty clay bowl.
*   **SH10 [00:45 - 00:50] | Mirror Reflection**:
    *   **Camera Language**: Extreme close-up, looking straight down, static.
    *   **Action & Performance**: The wiped bowl bottom shines, reflecting a distorted image of the waiter carrying the bill. A skinny hand slides in holding a white bill.
    *   **VFX & Physics**: Concave mirror reflection distortion. Bell chime "ting" for the reflection.
    *   **Audio & Foley**: Bowl hitting the table, footsteps.
    *   **Blocking**: Waiter moves from the counter to the card seat.
    *   **Prop States**: Reflective empty bowl, bill.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:40-00:45 Shot 9] Close-up eye-level shot, symmetrical composition. Tang Dynasty Monk holds the empty ceramic bowl with both hands, using a small piece of white bread to rub and wipe the inside of the bowl in circles. He satisfies himself by putting the wiped bread into his mouth to chew, showing a calm and blissful expression of appreciation. [00:45-00:50 Shot 10] Extreme close-up shot, looking straight down into the bottom of the empty ceramic bowl. The clean, wiped bottom of the bowl shines like a mirror, reflecting a distorted silhouette of the skinny waiter holding a paper bill and approaching arrogantly. Suddenly, a long, bony hand holding a white paper bill slides into the frame from the edge of the bowl. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, wounds, body horror. No watermark.

---

### 🎬 Segment 6 (00:50 - 01:00) | Demanding Payment (Silent Standoff)

*   **Segment Info**:
    *   **Covered Beats**: Beat B06 | Covered Shots: SH11 & SH12
    *   **Target Duration**: 10 seconds (00:50 - 01:00)
    *   **Visual Goal**: The shopkeepers slap the table to demand payment, creating a high-pressure confrontation with table objects bouncing up and a loud ticking wall clock in a dead silent room.
    *   **Continuity Control**: Continuity In is the bill slammed down; Continuity Out is the Tang Dynasty Monk preparing to reach into his sleeve.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH11 [00:50 - 00:55] | Slap Bill**:
    *   **Camera Language**: Close-up, eye-level, asymmetrical composition, static.
    *   **Action & Performance**: The waiter slaps the bill down. Jinchi waddles forward, looming over the table. the Tang Dynasty Monk looks up calmly.
    *   **VFX & Physics**: Paper flattening onto the table.
    *   **Audio & Foley**: Bill slapped onto the tablecloth. Waiter: "Five silver coins! Pay up!"
    *   **Blocking**: The shopkeepers approach Zone C.
    *   **Prop States**: Bill.
*   **SH12 [00:55 - 01:00] | Table Slam**:
    *   **Camera Language**: Medium shot, low-angle looking at the table. A slight camera bump shake occurs when Jinchi slams the table.
    *   **Action & Performance**: Jinchi slams the table in fury. Tablecloth ripples, silverware and cups pop up, hover for 0.3s (Hold), and settle back. Jinchi's face turns red, quivering mustache, pointing at the wall clock. the Tang Dynasty Monk is undisturbed.
    *   **VFX & Physics**: Tablecloth jelly-like ripple. White dust puff under his palm.
    *   **Audio & Foley**: Loud thud, silverware clanking, followed by dead silence. Loud tick-tock of the wall clock. Jinchi: "Outsider! If you cannot pay, we'll send you to court!"
    *   **Blocking**: Jinchi stands at the table, the Tang Dynasty Monk is on the right.
    *   **Prop States**: Wall clock in the background.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [00:50-00:55 Shot 11] Close-up eye-level shot. A hand slaps a white paper bill "slap!" onto the clean white tablecloth. In the background, Elder Jinchi in his red vest walks forward with his belly protruding towards the table. The monk Tang Dynasty Monk comically looks up at him. [00:55-01:00 Shot 12] Medium shot, low-angle looking at the table. Elder Jinchi slams his hand heavily onto the round wooden table, causing a slight camera shake. The white tablecloth ripples like jelly, and the silver spoon and white teacup bounce up, hovering in mid-air for 0.3 seconds before settling back. A small puff of white dust rises under his palm. Elder Jinchi's face turns comically red with rage, his white mustache quivers, and he points his finger at a large brass wall clock in the background, yelling with an open mouth. Tang Dynasty Monk sits peacefully on the right. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, wounds, bone crack sound, or screams. No watermark.

---

### 🎬 Segment 7 (01:00 - 01:10) | Revealing the Golden Document

*   **Segment Info**:
    *   **Covered Beats**: Beat B07 | Covered Shots: SH13 & SH14
    *   **Target Duration**: 10 seconds (01:00 - 01:10)
    *   **Visual Goal**: the Tang Dynasty Monk solemnly pulls out the dirty envelope, and a needle-like star glint flashes from the golden scroll inside, acting as the visual fuse before the climax.
    *   **Continuity Control**: Continuity In connects with the silence; Continuity Out is the gold star glint reaching peak brightness.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH13 [01:00 - 01:05] | Pulling Envelope**:
    *   **Camera Language**: Medium shot, eye-level. Rule of thirds, static.
    *   **Action & Performance**: the Tang Dynasty Monk smiles calmly, hand in prayer, and slowly retrieves a dirty, brown-greased envelope from his patched sleeve, sliding it onto the white table towards Elder Jinchi.
    *   **VFX & Physics**: Frayed paper texture with brown grease spots.
    *   **Audio & Foley**: Paper sliding on cotton. the Tang Dynasty Monk: "Amitabha. Do not worry. I have a document, but I fear you cannot make change."
    *   **Blocking**: the Tang Dynasty Monk on the right, pushing the envelope to the center.
    *   **Prop States**: Envelope is in 【State_Closed_Envelope】.
*   **SH14 [01:05 - 01:10] | Star Glint**:
    *   **Camera Language**: Extreme close-up, low-angle, slowly pushing forward.
    *   **Action & Performance**: the Tang Dynasty Monk slides out the golden scroll by one-third. Under the gas lamp, the golden threads flash a sharp needle-like star glint, reflecting in the eyes of the shopkeepers.
    *   **VFX & Physics**: Needle-like star glint (Star glint) on the yellow scroll corner.
    *   **Audio & Foley**: Golden scroll sliding. Metallic chime "ting" for the star glint.
    *   **Blocking**: Focus on the envelope.
    *   **Prop States**: Scroll in 【State_Revealing_Envelope】.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [01:00-01:05 Shot 13] Medium shot, eye-level angle. Tang Dynasty Monk wears a gentle smile, palms together, and slowly pulls a yellowed, dirty Xuan paper envelope stained with dark brown grease out from his grey patched sleeve, placing it quietly in the middle of the table. [01:05-01:10 Shot 14] Extreme close-up shot from a low angle, camera slowly pushing forward. Tang Dynasty Monk's fingers pinch the envelope and slide out a bright yellow scroll by one-third. Under the warm gas lamp, the pure gold threads on the scroll's dragon pattern suddenly flash a sharp, dazzling needle-like star glint in the air, illuminating the faces of the waiter and the elder on the left. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, wounds. No watermark.

---

### 🎬 Segment 8 (01:10 - 01:20) | Holy Light Verification (Hero Shot H01)

*   **Segment Info**:
    *   **Covered Beats**: Beat B08 | Covered Shots: SH15 & SH16
    *   **Target Duration**: 10 seconds (01:10 - 01:20)
    *   **Core Look**: **Core Climax Look (Hero Shot H01)**. Symmetrical holy light explosion, comically extreme cartoon deformations of the shopkeepers (jaw drop stretch, monocle flying off); Elder Jinchi sweats bullets and trembles in terror to verify the seals.
    *   **Continuity Control**: Continuity In is the scroll unfolded; Continuity Out is Jinchi looking up in shock.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH15 [01:10 - 01:15] | Holy Light**:
    *   **Camera Language**: Full shot, low-angle. Scale-contrast, static.
    *   **Action & Performance**: the Tang Dynasty Monk unfolds the passport. Volumetric golden light beams shoot upward, lighting the room. The waiter's jaw drops comically to his chest (Jaw Drop stretch). Jinchi's monocle is blown away, spinning three times, and he buckles to his knees.
    *   **VFX & Physics**: Volumetric golden glow. comically stretched jaw. Monocle spinning in the air.
    *   **Audio & Foley**: Holy choral music. Clock ticking stops. Spring "boing" sound for the jaw drop, monocle spinning "ding-ding". Jinchi: "This... the Tang Dynasty Ruler's passport?!"
    *   **Blocking**: the Tang Dynasty Monk on the right, Jinchi kneels on the left.
    *   **Prop States**: Passport is open in 【State_Unfolded_Glow】.
*   **SH16 [01:15 - 01:20] | Verification**:
    *   **Camera Language**: Close-up, low-angle looking up, slowly pushing forward.
    *   **Character Action & Performance**: Shivering and sweating bullets, Jinchi crawls to the table, using a magnifying glass to check the red square jade seal ("受命于天"). the Tang Dynasty Monk sits calmly in the golden light, hands folded.
    *   **VFX & Physics**: Saturated red seal stamp with ancient seal characters. Transparent cartoon sweat drops spraying.
    *   **Audio & Foley**: Shaking magnifying glass clicking. Jinchi: "The imperial seal?! Heavens... my Buddha!"
    *   **Blocking**: Jinchi at the left side of the table.
    *   **Prop States**: Magnifying glass.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [01:10-01:15 Shot 15] [Hero Shot H01] Full shot, low-angle. Tang Dynasty Monk fully unfolds the golden imperial passport on the table. A bright, warm volumetric golden glow radiates upward in a fan shape, lighting up the dark tea room and scattering sparkling gold dust particles in slow motion. On the left, the waiter's eyes bug out and his jaw comically drops and stretches down to his chest. Elder Jinchi's gold-rimmed monocle is blown into the air by the wind of the light, spinning three times, and his legs buckle as he collapses to his knees. [01:15-01:20 Shot 16] Close-up special shot, low angle, slow camera push. Shivering and covered in large cartoon sweat drops spraying from his forehead, Elder Jinchi crawls back to the table, holding a magnifying glass in his shaking hands to examine a giant vermilion-red square jade seal print in the center of the passport, which reads "受命于天" in ancient seal script. Tang Dynasty Monk sits on the right in the warm golden glow, palms pressed together peacefully. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, realistic wounds, body horror, realistic jaw-tearing sounds, or screams. No watermark.

---

### 🎬 Segment 9 (01:20 - 01:30) | Bowing Farewell (Option B Ending)

*   **Segment Info**:
    *   **Covered Beats**: Beat B09 | Covered Shots: SH17 & SH18
    *   **Target Duration**: 10 seconds (01:20 - 01:30)
    *   **Core Look**: **Option B Ending**. The waiter spins to return the envelope; the Tang Dynasty Monk walks out of the door, silhouetted as a tall hero, and the shopkeepers bow at 90 degrees in symmetrical rows as the double doors close.
    *   **Continuity Control**: Continuity In connects with Jinchi's kneeling state; Continuity Out is the double doors closing.

#### 🎥 Detailed Shot Execution Plan (Timeline)
*   **SH17 [01:20 - 01:25] | Spinning Return**:
    *   **Camera Language**: Medium shot, tracking camera. Rule of thirds, fast movement.
    *   **Action & Performance**: The waiter's jaw snaps back. He slips and spins three times in a windup blur on the floor, handing the envelope back to the Tang Dynasty Monk with both hands and a toothy grin. the Tang Dynasty Monk accepts it calmly and puts it in his sleeve.
    *   **VFX & Physics**: Comical dust arcs and motion lines from spinning.
    *   **Audio & Foley**: Shoe squeaking and windup sound. Waiter: "Holy Monk, it's on the house! Please accept it!"
    *   **Blocking**: The waiter runs from the table to the door.
    *   **Prop States**: Passport is returned in closed envelope.
*   **SH18 [01:25 - 01:30] |Symmetrical Bowing**:
    *   **Camera Language**: Extreme long shot, low-angle looking in from the dark street. Symmetrical composition, camera pulling out.
    *   **Action & Performance**: The large arched oak doors swing open. Golden light floods out, silhouetting the Tang Dynasty Monk as he steps outside. On both sides, Elder Jinchi and a line of staff bow deeply at 90 degrees. Oak doors close.
    *   **VFX & Physics**: Golden indoor light cut off as the doors shut. Symmetrical bowing staff alignment.
    *   **Audio & Foley**: Curtain call march music. Oak door shutting heavy thud. Jinchi: "Have a safe journey!"
    *   **Blocking**: Doorway (Zone A).
    *   **Prop States**: Doors slowly close.

#### 🤖 Compiled Segment Prompt (Model Feeding Version)
> 3D animated movie style, Pixar aesthetic, PBR materials, ray tracing. Warm and soft cinematic lighting. [01:20-01:25 Shot 17] Medium shot, camera tracking action. The waiter's jaw snaps back to normal, his feet slip and spin three times in a fast comic windup blur on the floor, creating dust arcs. He hands the envelope containing the passport back to Tang Dynasty Monk with both hands, quivering with a wide, toothy grin. Tang Dynasty Monk comically takes it and slips it into his wide grey sleeve. [01:25-01:30 Shot 18] [Option B Ending] Extreme long shot, looking from the dark, cold street outside into the warm Victorian room through the double doors. The large arched oak doors swing open. Golden light floods out, silhouetting Tang Dynasty Monk as a tall, heroic figure walking out into the night. On both sides of the door, Elder Jinchi and a symmetrical line of waiters bow deeply at 90 degrees with excessive obsequious smiles. The heavy doors slowly shut, cut the light. Fade out. --ar 16:9

*   **Segment-specific Negative Constraints**:
    *   No realistic blood, wounds. No watermark, no frame noise.

---

## 🚫 Global Negative Constraints

Please include the following controls in the negative bounds of all Segment/Shot prompts:
> 不要写实流血、血泊、开放性伤口、写实刀枪伤、骨折特写、身体恐怖、持续痛苦、写实惨叫。所有夸张形变在动作结束后必须回弹复原，角色需保持结构完整性与可表演状态。不要堆砌随机特效，镜头语言需符合三维卡通电影规则，不要出现水印、字幕、画面杂色、写实下巴撕裂声。所有主角背影需与先前建立的角色视觉保持一致。
