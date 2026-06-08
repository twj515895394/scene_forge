# 声音导演主方案 v1.0

本文件详述《华强买瓜》拟人动物版改编的声音导演方案。通过声音设计强化戏剧压迫感与反差喜剧感，并提供明确的非写实卡通物理音效设计，消除任何血液或实器伤害声线。

---

## ⚙️ 声音导演控制数据 (YAML)

```yaml
data:
  audio_plan_version: "v1.0"
  expressive_animation_inheritance:
    enabled: true
    animation_stylization_level: "expressive"
    injury_tone_level: "minor_cartoon"
    contrast_comedy_enabled: true
  audio_plan_path: "projects/huaqiang-watermelon-animal/details/audio_plan_v1.0.md"
  music_prompt_path: "projects/huaqiang-watermelon-animal/outputs/audio/music_prompt_v1.0.md"
  foley_prompt_path: "projects/huaqiang-watermelon-animal/outputs/audio/foley_prompt_v1.0.md"
  audio_mix_plan_path: "projects/huaqiang-watermelon-animal/outputs/audio/audio_mix_plan_v1.0.md"
  audio_summary: "通过经典的意大利西部片吉他/口哨音乐铺垫平头哥的硬汉大佬感，在中期对峙中引入夏日蝉鸣的骤然静音真空，在高潮劈瓜爆炸中反差接入滑笛、八音盒金星卡通声，并以土拨鼠悲壮破音嚎丧萨日朗收尾，形成极致的声音反差与去害化喜剧物理反馈。"
  voice_direction:
    language: "Chinese"
    overall_tone: "Tense confrontation mixed with absurd comedy"
    pacing: "Extremely paced, slow for Honey Badger, rapid/unstable for Bulldog, high-pitched screech for Marmot"
    breath_control: "Gravelly low breaths for Honey Badger; heavy and wet wheezing for Bully dog; sharp gasps for Marmot"
    emotional_delivery: "Honey Badger maintains cold stoicism; Bully dog transitions from arrogance to panic and then frenzy; Marmot builds up to an operatic,破音 scream."
    character_voice_notes:
      - character_id: "CHA_01"
        character_name: "平头哥 (华强)"
        voice_age: "38"
        voice_texture: "Gravelly, low-pitched, dry, smoky baritone"
        emotional_tone: "Stoic, cold, slow, highly authoritative"
        pacing: "Extremely slow, leaving 0.8s between words, dropping tone at sentence ends"
        pause_pattern: "Pre-phrase pause (0.5s), intra-phrase pause (0.8s), unhurried breathing"
        delivery_notes: "Speaks flatly under his breath. Never shouts, yet maintains absolute psychological dominance."
        contrast_voice_note: "A deadly, gravelly voice coming from a small animal riding a pink scooter creates massive ironical humor."
      - character_id: "CHA_02"
        character_name: "恶霸犬 (摊主)"
        voice_age: "45"
        voice_texture: "Loud, thick, wet, coarse, growling bass"
        emotional_tone: "Aggressive, haughty, easily startled, frantic"
        pacing: "Rapid, rushing words, spitting consonants"
        pause_pattern: "Irregular gasping pauses when angry, sudden stuttering pause during the stunned moment"
        delivery_notes: "Shouts to intimidate. Showcases street bully behavior but gets quickly cowed by flat stares."
        contrast_voice_note: "Heavy growls contrasted with high-pitched cartoon dizzy chimes and bubble gurgles at the end."
      - character_id: "CHA_03"
        character_name: "土拨鼠 (小弟)"
        voice_age: "24"
        voice_texture: "High-pitched, nasal, squeaky, trembling tenor"
        emotional_tone: "Groveling, cowardly, nervous, theatrical panic"
        pacing: "Rapidly stuttering, breathless"
        pause_pattern: "Short pants, a continuous long operatic wail at the climax"
        delivery_notes: "Sycophantic laughs when backing the boss; turns into high-pitched operatic screams when crying."
        contrast_voice_note: "Trembling small voice contrasts with a grand, tragic, operatic scream 'SA RI LANG!!!' that fills the soundstage."
  music_design:
    main_theme: "Lonely drifter acoustic slide guitar strumming paired with dry whistling and sharp handclaps (Morricone Western style)"
    leitmotif:
      honey_badger: "Dry electric slide guitar bend with a lazy whistle"
      bully_dog: "Low-frequency clumsy tuba slide or bass trombone growl"
      marmot: "High-pitched, nervous violin pizzicato"
    instrumentation: "Acoustic slide guitar, dry whistling, cello drone, tuba, double bass, pizzicato strings, glockenspiel"
    tempo_range: "72 BPM (confrontation) to 135 BPM (climax/chase)"
    emotional_curve: "Lonely drifter (B01-B02) ➡️ Looming thriller tension (B03-B05) ➡️ Sudden absolute silence (B06-B07) ➡️ Rising panic (B08-B09) ➡️ Comic explosion hit (B10) ➡️ Grand operatic parody tragedy (B11)"
    music_density: "Low-to-medium, avoiding continuous wall-of-sound"
    music_misdirection: "Serious action thriller music builds up (VGU_03-08) ➡️ melon slices ➡️ drops to a slide whistle and glockenspiel star twinkle, denying expected metal slash sound."
    silence_points:
      - beat_id: "B06"
        shot_id: "S06_04"
        purpose: "Cut all cicadas and music to highlight the vacuum of the classic head-tilt pose."
      - beat_id: "B07"
        shot_id: "S07_03"
        purpose: "Maintain absolute audio silence during the vendor's 1.2s stunned gulp."
  foley_design:
    density: "Medium-high, highlighting texture and comic dynamics"
    key_foley_moments:
      - shot_id: "S01_02"
        segment_id: "VGU_01"
        sound: "Cute retro scooter engine 'putt-putt-putt-putt' (突突突) toy hum"
        timing: "2.5s - 7.5s"
        purpose: "Highlight size/prop irony"
        related_prop_state: "SCOOTER_01_RIDING"
        related_blocking: "Scooter sliding from left to center-left"
        expressive_audio:
          sound_type: "contrast_sound"
          cartoon_action_sound: "putt-putt toy engine"
          injury_gag_sound: ""
          contrast_sound: "Badger's cool jacket vs cute scooter engine hum"
          forbidden_realistic_sounds: "heavy Harley roaring"
      - shot_id: "S02_01"
        segment_id: "VGU_02"
        sound: "Crisp plastic helmet buckle click-clack"
        timing: "10.0s - 12.5s"
        purpose: "Dismounting gesture tracking"
        related_prop_state: "SCOOTER_02_PARKED"
        related_blocking: "Badger unbuckles helmet on scooter"
        expressive_audio:
          sound_type: "none"
          cartoon_action_sound: ""
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: ""
      - shot_id: "S02_04"
        segment_id: "VGU_02"
        sound: "Hollow wood-like knock on melon rind 'donk, donk' (咚、咚)"
        timing: "17.5s - 20.0s"
        purpose: "Melon testing sound"
        related_prop_state: "SCALE_01_NORMAL"
        related_blocking: "Badger taps melon at counter"
        expressive_audio:
          sound_type: "none"
          cartoon_action_sound: ""
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: ""
      - shot_id: "S05_01"
        segment_id: "VGU_05"
        sound: "Heavy bamboo chair screeching on dirt ground 'creeeak!' (嘎吱)"
        timing: "40.0s - 42.0s"
        purpose: "Vendor stands up abruptly"
        related_prop_state: ""
        related_blocking: "Bulldog rises from chair"
        expressive_audio:
          sound_type: "none"
          cartoon_action_sound: ""
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: ""
      - shot_id: "S06_02"
        segment_id: "VGU_06"
        sound: "Heavy dull melon impact on wooden counter table 'thump!' (啪！)"
        timing: "52.0s - 54.0s"
        purpose: "Melon slammed on table"
        related_prop_state: ""
        related_blocking: "Bulldog slams melon down"
        expressive_audio:
          sound_type: "none"
          cartoon_action_sound: ""
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: ""
      - shot_id: "S07_04"
        segment_id: "VGU_07"
        sound: "Exaggerated throat gulping sound 'gulp!' (咕噜)"
        timing: "66.0s - 68.0s"
        purpose: "Vendor stunned swallowing during stand-off"
        related_prop_state: ""
        related_blocking: "Bulldog frozen staring at Badger"
        expressive_audio:
          sound_type: "contrast_sound"
          cartoon_action_sound: ""
          injury_gag_sound: ""
          contrast_sound: "Gulp highlights Bulldog's sudden loss of nerve"
          forbidden_realistic_sounds: "no sound"
      - shot_id: "S08_02"
        segment_id: "VGU_08"
        sound: "Knife chopping wood 'thwack!' (夺！), followed by high-pitched metallic blade wobble 'boooing-n-g-g' (铮——)"
        timing: "72.0s - 74.0s"
        purpose: "Knife slammed into counter, vibrating"
        related_prop_state: ""
        related_blocking: "Bulldog chops knife into counter"
        expressive_audio:
          sound_type: "cartoon_physics"
          cartoon_action_sound: "wobble boooing"
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: "slashing flesh sounds, blood spray"
      - shot_id: "S09_05"
        segment_id: "VGU_09"
        sound: "Ripping wires, plastic cracking 'clack-crack-smash!', metal plate clanging, springs bouncing out 'sproing!'"
        timing: "88.0s - 90.0s"
        purpose: "Scale flipped and smashed on ground"
        related_prop_state: "SCALE_03_FLIPPED_EXPOSED"
        related_blocking: "Badger flips scale"
        expressive_audio:
          sound_type: "cartoon_physics"
          cartoon_action_sound: "spring sproing"
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: "heavy realistic crash, glass shattering"
      - shot_id: "S10_05"
        segment_id: "VGU_10"
        sound: "Juicy water-balloon explosion 'KABOOM-SPLASH!' (轰隆哗啦), pulpy splats, no slicing effects"
        timing: "96.0s - 98.5s"
        purpose: "Melon juice explosion high climax"
        related_prop_state: ""
        related_blocking: "Melon splits and bursts open"
        expressive_audio:
          sound_type: "combined"
          cartoon_action_sound: "water-balloon kaboom"
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: "blade cutting flesh, bone impact, realistic explosion"
      - shot_id: "S10_06"
        segment_id: "VGU_10"
        sound: "Slide whistle descending 'wheeeee-bonk', followed by cartoon glockenspiel dizzy twinkle 'ding-ding-ding' (叮叮叮), bubble gurgles"
        timing: "98.5s - 100.0s"
        purpose: "Bulldog knocked out hilariously"
        related_prop_state: ""
        related_blocking: "Bulldog spins and falls"
        expressive_audio:
          sound_type: "minor_injury_gag"
          cartoon_action_sound: "slide whistle"
          injury_gag_sound: "star twinkle glockenspiel"
          contrast_sound: ""
          forbidden_realistic_sounds: "heavy groans, realistic thuds, bone breaking"
      - shot_id: "S11_02"
        segment_id: "VGU_11"
        sound: "Marmot's crying wail 'SA RI LANG!!!' with cartoon spray sound effects"
        timing: "102.0s - 105.0s"
        purpose: "Henchman screaming in operatic parody"
        related_prop_state: ""
        related_blocking: "Marmot cradles Bulldog's head"
        expressive_audio:
          sound_type: "minor_injury_gag"
          cartoon_action_sound: ""
          injury_gag_sound: "operatic crying spray"
          contrast_sound: ""
          forbidden_realistic_sounds: "realistic pain scream"
      - shot_id: "S11_04"
        segment_id: "VGU_11"
        sound: "Scooter kickstart squeak, engine turning over, followed by three puff pops 'pft, pft, pft' (噗、噗、噗)"
        timing: "107.0s - 108.5s"
        purpose: "Scooter kickstart puff smoke rings"
        related_prop_state: "SCOOTER_03_KICKSTART_ESCAPE"
        related_blocking: "Badger starts scooter"
        expressive_audio:
          sound_type: "cartoon_physics"
          cartoon_action_sound: "puff pops"
          injury_gag_sound: ""
          contrast_sound: ""
          forbidden_realistic_sounds: "loud backfire, engine roar, muffler smoke blast"
  expressive_audio_design:
    stylized_action_audio:
      - shot_id: "S08_02"
        beat_id: "B08"
        impact_sound: "thwack"
        motion_sound: "whoosh"
        deformation_sound: "wood groan"
        hold_or_silence: "none"
        recovery_sound: "metal wobble boooing"
      - shot_id: "S09_05"
        beat_id: "B09"
        impact_sound: "plastic smash"
        motion_sound: "air blur"
        deformation_sound: "metal clang"
        hold_or_silence: "none"
        recovery_sound: "spring bounce sproing"
      - shot_id: "S11_04"
        beat_id: "B11"
        impact_sound: "kick click"
        motion_sound: "engine hum"
        deformation_sound: "none"
        hold_or_silence: "none"
        recovery_sound: "three pop puffs"
    injury_gag_audio:
      - shot_id: "S10_06"
        beat_id: "B10"
        visible_injury: "Dizzy X_X eyes, bubbles at mouth, rotating golden stars"
        allowed_sound: "Slide whistle wheeeee-bonk, glockenspiel chimes ding-ding-ding"
        comedic_timing: "Starts immediately after the splash, lasting 1.5s"
        forbidden_realistic_sounds: "realistic body impact, bone cracking, heavy groans"
      - shot_id: "S11_02"
        beat_id: "B11"
        visible_injury: "Wet fur, tears flying like fountain sprays"
        allowed_sound: "Squeaky operatic破音 wail 'SA RI LANG!!!' with comic water sprays"
        comedic_timing: "Starts immediately as Marmot cradles boss head, wail peaks at 1.5s"
        forbidden_realistic_sounds: "guttural crying, realistic shrieking"
    contrast_audio:
      - shot_id: "S01_02"
        beat_id: "B01"
        contrast_type: "vehicle_character_contrast"
        sound_contrast: "Badger's heavy leather jacket vs cute high-pitched toy scooter engine hum"
        silence_or_pause: "none"
        prop_sound: "toy engine putt-putt"
        music_misdirection: "Western slide guitar theme makes it look like a Harley ride, but engine sound reveals toy scooter"
      - shot_id: "S11_04"
        beat_id: "B11"
        contrast_type: "ending_parody_contrast"
        sound_contrast: "Marmot's loud grand tragic operatic wail in the background vs Badger's unbothered cute toy scooter starting puff-puffs"
        silence_or_pause: "1.0s gap between wail peak and scooter launch"
        prop_sound: "three smoke rings pop-puffs"
        music_misdirection: "Grand symphony chords parody epic movie endings, while Badger simply rides away on a pink scooter"
  ambience_design:
    location_bed: "Southern humid summer evening old street: high-frequency buzzing cicadas, distant passing vehicle low hums, air conditioner rattle"
    emotional_ambience: "Cicada buzz rises during bargaining (B03-B05) to highlight impatience; cuts to absolute vacuum silence during standoff (B06-B07) to emphasize deadlock."
    transition_ambience: "Cicada buzz slowly returns in B08; cut during explosion B10; replaced by late evening breeze in B11."
    blocking_ambience_note: "Background motor hum stays locked to the left side where the scooter is parked."
  segment_audio_plan:
    - segment_id: "VGU_01"
      covered_shots: ["S01_01", "S01_02", "S01_03", "S01_04"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Bulldog's lazy grunts, Badger's silence."
      music_focus: "Western slide guitar strumming and lonely whistler theme."
      foley_focus: "Scooter toy hum, chair creaking, toothpick clicks."
      ambience_focus: "Cicada buzzing, warm street background hum."
      expressive_audio_focus: true
      silence_or_pause: "none"
      continuity_in: "ambient street hum fades in"
      continuity_out: "scooter toy hum fades out to low idle rattle"
      bridge_audio_hook: "scooter engine cuts out with a soft putt-sputter"
      blocking_audio_continuity: "scooter rattle fixed to the left"
      prop_state_audio_continuity: "SCOOTER_01_RIDING transitions to SCOOTER_02_PARKED"
      expressive_audio_continuity: "Western slide guitar tracks Badger's ride"
    - segment_id: "VGU_02"
      covered_shots: ["S02_01", "S02_02", "S02_03", "S02_04"]
      related_hero_moments: []
      related_bridge_shots: ["Bridge Shot 01"]
      voice_focus: "Badger's first line: '老板，这西瓜多少钱一斤啊？'"
      music_focus: "Guitar theme dies down to a single acoustic bass string pluck."
      foley_focus: "Helmet click, helmet mirror hang clink, boots sand crunch, melon knocks."
      ambience_focus: "Cicada buzzing continues."
      expressive_audio_focus: false
      silence_or_pause: "0.5s pause before Badger speaks"
      continuity_in: "scooter idle rattle ends"
      continuity_out: "sound of melon knock fades out"
      bridge_audio_hook: "boots sand crunching links dismount to table walk"
      blocking_audio_continuity: "Badger's footsteps transition from left to counter-center"
      prop_state_audio_continuity: "helmet hung clank locks ACT_CHAIN_01"
      expressive_audio_continuity: "dry acoustic plucks anchor Badger's voice"
    - segment_id: "VGU_03"
      covered_shots: ["S03_01", "S03_02", "S03_03", "S03_04"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Bulldog's response: '两块钱一斤。'"
      music_focus: "Pizzicato violin plucks represent Marmot's giggles."
      foley_focus: "Toothpick wet scraping, toothpick spit."
      ambience_focus: "Impatience cicada buzz rises slightly."
      expressive_audio_focus: false
      silence_or_pause: "0.3s pause between spit and speech"
      continuity_in: "melon knock echo ends"
      continuity_out: "dry grass chewing rustle"
      bridge_audio_hook: "toothpick spit sound cuts off table silence"
      blocking_audio_continuity: "Marmot's low chortle fixed on the far right"
      prop_state_audio_continuity: "dry grass locked to Badger's mouth"
      expressive_audio_continuity: "pizzicato strings match Marmot's fan waving"
    - segment_id: "VGU_04"
      covered_shots: ["S04_01", "S04_02", "S04_03", "S04_04"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Badger's sarcastic line: '卧槽，这西瓜皮是金子做的，还是西瓜子是金子做的？'"
      music_focus: "Tense low double-bass drone starts."
      foley_focus: "Lethal eye-lock air draft, teeth grit."
      ambience_focus: "Cicada buzz lowers, representing air pressure drop."
      expressive_audio_focus: false
      silence_or_pause: "0.8s pause between the two parts of the sentence"
      continuity_in: "grass chewing sound"
      continuity_out: "low beastly growl"
      bridge_audio_hook: "Badger's sentence pause holds the camera cut"
      blocking_audio_continuity: "stiff posture silence"
      prop_state_audio_continuity: "scooter parked on left stays silent"
      expressive_audio_continuity: "cello/double bass drone accentuates sarcasm"
    - segment_id: "VGU_05"
      covered_shots: ["S05_01", "S05_02", "S05_03", "S05_04", "S05_05"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Bulldog's roaring defense; Badger's quiet command: '给我挑一个。'"
      music_focus: "Violin pizzicato string tension accelerates."
      foley_focus: "Bamboo chair screech, spit spray."
      ambience_focus: "Low street noise suppressed by Bulldog's voice."
      expressive_audio_focus: false
      silence_or_pause: "0.5s pause after roar, before Badger's reply"
      continuity_in: "beast growl peaks to shout"
      continuity_out: "dull silence"
      bridge_audio_hook: "chair screeching links chair exit to standing stance"
      blocking_audio_continuity: "Bulldog's massive voice fills the counter area"
      prop_state_audio_continuity: "chair slide screech track"
      expressive_audio_continuity: "rapid string tension builds up"
    - segment_id: "VGU_06"
      covered_shots: ["S06_01", "S06_02", "S06_03", "S06_04", "S06_05"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Bulldog: '行！这瓜怎么样？'; Badger's first soul question: '这瓜保熟吗？'"
      music_focus: "Building orchestral hit ➡️ **S06_04: Cuts abruptly to complete silence**."
      foley_focus: "Melon heavy table slam thump, tabletop groan, tabletop wood creak."
      ambience_focus: "**B06_04: Completely muted (真空静音)**, cicada buzz vanishes."
      expressive_audio_focus: true
      silence_or_pause: "**S06_04 to S06_05: Absolute vacuum silence (100% quiet)**"
      continuity_in: "Bulldog's slam thump"
      continuity_out: "absolute cold quiet"
      bridge_audio_hook: "melon thump marks the start of the freeze-frame"
      blocking_audio_continuity: "table-leaning pose locked with zero body noise (ACT_CHAIN_02)"
      prop_state_audio_continuity: "melon thuds onto scale table"
      expressive_audio_continuity: "vacuum silence tracks Badger's unblinking eye-lock"
    - segment_id: "VGU_07"
      covered_shots: ["S07_01", "S07_02", "S07_03", "S07_04", "S07_05"]
      related_hero_moments: []
      related_bridge_shots: []
      voice_focus: "Bulldog's roar; Bulldog's stunned gulp; Badger's second question: '我问你这瓜保熟吗？'"
      music_focus: "Silence continues ➡️ slowly introduces a low, vibrating timpani heartbeat."
      foley_focus: "Paper fan flapping, Bulldog's stunned gulp."
      ambience_focus: "Silence maintained, no background noise."
      expressive_audio_focus: true
      silence_or_pause: "**S07_04: 1.2s stunned gulp freeze-frame silence**"
      continuity_in: "absolute cold quiet"
      continuity_out: "low timpani hum"
      bridge_audio_hook: "Bulldog's gulp sound breaks the roar"
      blocking_audio_continuity: "Bulldog's sudden freeze-frame immobility (EMO_CHAIN_01)"
      prop_state_audio_continuity: "grass chewing still halted"
      expressive_audio_continuity: "gulp sound represents Bulldog's psychological breakdown"
    - segment_id: "VGU_08"
      covered_shots: ["S08_01", "S08_02", "S08_03", "S08_04", "S08_05"]
      related_hero_moments: []
      related_bridge_shots: ["Bridge Shot 02"]
      voice_focus: "Bulldog: '你是故意找茬是不是...'; Badger's smirk reply; Bulldog: '不熟我自己吃了它！'"
      music_focus: "Low strings return, building an action thriller theme."
      foley_focus: "Table slam, knife draw whoosh, knife chop wood thwack, metal blade wobble boooing."
      ambience_focus: "Cicada buzz slowly returns at low volume."
      expressive_audio_focus: true
      silence_or_pause: "0.4s pause between chop vibration and Bulldog's roar"
      continuity_in: "low timpani hum"
      continuity_out: "vibrating blade hum"
      bridge_audio_hook: "metal blade wobble vibration links VGU_08 to VGU_09"
      blocking_audio_continuity: "knife stuck in center acts as spatial audio focal point"
      prop_state_audio_continuity: "knife chopped into table locks ACT_CHAIN_03"
      expressive_audio_continuity: "metal blade wobble boooing represents martial escalation"
    - segment_id: "VGU_09"
      covered_shots: ["S09_01", "S09_02", "S09_03", "S09_04", "S09_05"]
      related_hero_moments: []
      related_bridge_shots: ["Bridge Shot 02"]
      voice_focus: "Bulldog's smug cheat quote: '十五斤，三十块。这称够数吧？'"
      music_focus: "Tense violin tremolo climbs to a peak."
      foley_focus: "Melon roll, scale click, plastic smash, plate clang, spring bounce sproing."
      ambience_focus: "Cicada buzz rises, then cut off by scale smash."
      expressive_audio_focus: true
      silence_or_pause: "0.2s pause before the scale smash action"
      continuity_in: "vibrating blade hum ends"
      continuity_out: "cracked scale parts rolling"
      bridge_audio_hook: "scale smash sound shatters the bargaining tension"
      blocking_audio_continuity: "scale flying left-to-bottom-center audio path"
      prop_state_audio_continuity: "SCALE_02_CHEAT transitions to SCALE_03_FLIPPED_EXPOSED"
      expressive_audio_continuity: "spring bounce sproing sound represents deception shattered"
    - segment_id: "VGU_10"
      covered_shots: ["S10_01", "S10_02", "S10_03", "S10_04", "S10_05", "S10_06"]
      related_hero_moments: ["H01"]
      related_bridge_shots: []
      voice_focus: "Badger: '吸铁石贴在秤底下，当我傻逼啊？'; Bulldog: '呀——！'"
      music_focus: "Violin tremolo peak ➡️ **S10_05 Climax hit (KABOOM) ➡️ shifts to glockenspiel star twinkle**."
      foley_focus: "Claw swing whoosh, water-balloon splash kaboom, slide whistle wheeeee-bonk, glockenspiel chimes, bubbles."
      ambience_focus: "Completely overwhelmed by explosion noise."
      expressive_audio_focus: true
      silence_or_pause: "0.5s pause after the splash kaboom, before slide whistle starts"
      continuity_in: "cracked scale parts rolling"
      continuity_out: "fading star chimes, bubble gurgles"
      bridge_audio_hook: "juice explosion boom carries the main high payoff"
      blocking_audio_continuity: "Bulldog's spin-fly right-to-chair path"
      prop_state_audio_continuity: "melon bursts; scale magnet left exposed on dirt ground"
      expressive_audio_continuity: "splash kaboom (H01) + slide whistle/twinkle (KO) removes violence"
    - segment_id: "VGU_11"
      covered_shots: ["S11_01", "S11_02", "S11_03", "S11_04", "S11_05"]
      related_hero_moments: ["H02"]
      related_bridge_shots: []
      voice_focus: "Marmot's screaming wail: '萨——日——朗——！！'"
      music_focus: "Grand, mock-epic symphonic parody tragic chords."
      foley_focus: "Crate slide, helmet snap click, scooter engine toy hum, three exhaust smoke pops."
      ambience_focus: "Background晚风 breeze replaces the hot midday air."
      expressive_audio_focus: true
      silence_or_pause: "1.0s gap between wail peak and scooter launch"
      continuity_in: "fading star chimes"
      continuity_out: "scooter engine hum fades out, silence"
      bridge_audio_hook: "Marmot's long wail links the stall ruins to the scooter exit"
      blocking_audio_continuity: "Marmot crying at bottom-right; scooter starting at left and moving left-out"
      prop_state_audio_continuity: "helmet buckle snap + three exhaust pops (ACT_CHAIN_01)"
      expressive_audio_continuity: "grand tragic chords vs toy scooter hum parody"
  video_prompt_handoff:
    must_include_audio_notes: "Downstream video prompt builders must integrate these audio cues into the prompt text (e.g. specifying the cartoon physics puffs, stars twinkle, bubbles, water-balloon juice splash)."
    music_prompt_usage: "Use music_prompt_v1.0.md to guide background music generations."
    foley_prompt_usage: "Use foley_prompt_v1.0.md for generating cartoon foley effects."
    mix_notes: "Scale table slam thump must have weight; gulp swallow must be crisp; knife chop must have wobble vibrato; melon explosion must sound like a juicy water balloon, not an explosive bomb; Marmot wail must have operatic parody grandeur; scooter must have toy-like putt-putt engine."
    bridge_audio_usage: "Maintain residual reverb across VGU cuts (e.g. blade vibrato, melon splash roar)."
    blocking_audio_usage: "Ensure spatial audio matches the 180-degree blocking map."
    prop_state_audio_usage: "helmet click, scale smash, exhaust smoke puff pops must occur at precise moments."
    expressive_audio_usage: "Stars twinkle and slide whistles must sync with the visual knockout gag."
    forbidden_realistic_audio: "Strictly forbid bone cracking, flesh cutting, wet stabbing, realistic heavy groans, blood spurting, gunshots, or realistic explosion blasts."
  risk_notes: "The audio mix must balance Marmot's loud wail so it doesn't clip or overwhelm the cute scooter pops; the melon blast must remain juicy-sounding to avoid fire/grenade connotations."
  next_action: "进入 scene-video-prompt-builder 阶段，结合分镜与声音设计生成最终视频提示词。"
```

---

## Ⅱ. 声音导演方案细节说明

### 1. 配配音方向与台词气口 (Voice Design)
为了完美还原对峙张力，华强（平头哥）的配音不能有任何情绪上的急躁。
*   **平头哥 (华强)** 的台词速度必须比常人慢一半。在说“这瓜皮是金子做的”时，应在“皮”与“是”之间留下 0.8 秒的心理静止，并发出干黄草签在嘴唇间嚼动时的微弱摩擦音。
*   **恶霸犬老板** 的声线要在“一愣卡壳”前展现出膨胀的音量。在其咆哮“我开水果摊的，能卖给你生瓜蛋子？！”之后，**必须有 1.2 秒的物理真空期**，仅听见其狗鼻子粗重的喘息声，随后是一声明显的喉头耸动吞水声（“咕噜”），以听觉证实其心理防线的坍塌。
*   **土拨鼠小弟** 最后的“萨日朗”哭嚎，应当是一次夸张的男高音悲情唱腔。声音要在“萨”字上拉长 2.5 秒，并在“朗”字上转为滑稽的破音与颤音。

### 2. 配乐主题与静默艺术 (Music & Silence)
本片的音乐是一部荒诞的“西部对决剧”。
*   **主旋律**：采用空旷荒野的干木吉他单弦扫拨，伴随一声声干枯而清脆的口哨声，仿佛平头哥是一位踏入法外之地的牛仔。
*   **静默点设计**：在 B06_04 平头哥歪头撑案姿势摆出的瞬间，**将所有的背景蝉鸣声、风声、吉他声全部拉掉（Mute）**。这种极端的“声音真空”能让受众的注意力全部集中到平头哥毫无生气的黑眼睛和歪头的姿势上，把紧张感憋到最满。
*   **高潮反差**：劈西瓜的一瞬间，伴随着果汁爆破，西部吉他乐骤然破裂，接入极其滑稽的卡通向下滑音笛（Slide Whistle）和八音盒金星闪烁音，将严肃打斗彻底解构为喜剧表演。

### 3. Foley 拟音与卡通喜剧音效 (Foley & Gags)
所有物理交互音效均采用皮克斯式非写实风格，规避任何物理血腥暴力：
*   **剁大瓜刀 (S08_02)**：剁桌声为木头受力沉音，核心听觉是金属大片颤动长达 2 秒的滑稽高频余音（“铮————”），突出钢刀的分量。
*   **暴掀电子秤 (S09_05)**：掀秤为塑料外壳碎裂声与内部铜弹簧强力崩断反弹的卡通“sproing！”音效，避免玻璃或厚重金属破裂的惨重感。
*   **去害化劈瓜 (S10_05)**：西瓜破开为**“高压水汽球爆裂”（Juicy Water-Balloon Burst）**的高饱和液态冲刷音，伴有无数瓜籽飞散的雨打叶片声。禁止使用任何切割肉体的湿粘利器音效。
*   **摊主晕倒 (S10_06)**：摊主被西瓜汁冲飞在空中自转时配以卡通破风呼呼声，倒地时采用滑稽的重摔声，头上金星配以高亮的 glockenspiel（钟琴）敲击声，嘴部配以吐肥皂泡的“啵啵”声，代表其滑稽昏厥。
*   **摩托车起步 (S11_04)**：老踏板发动机踩火两次（“咔、咔”），点火成功时排气管突突突，并吐出 3 个膨胀黑烟圈。每只烟圈膨胀时配以软萌的卡通小气球充气噗噗声（“噗、噗、噗”），增加结尾的滑稽感。
