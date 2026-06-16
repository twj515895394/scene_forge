import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { Project } from '../project.js';
import { Validator } from '../validators/validator.js';

test('Validator System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_validator_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  const project = new Project(testDir);
  const validator = new Validator(project);
  const validStoryboardBody = `## storyboard_prompt_pack
### beat_skeleton
### storyboard_content_breakdown
### cinematic_language_plan
### video_generation_units
VGU001
### shot_continuity_plan
### continuity_control_system
### storyboard_prompt_pack_plan
### storyboard_quality_check
control_storyboard_file
styled_storyboard_file
control_storyboard_prompt_file
styled_storyboard_prompt_file`;
  const validVideoPromptsBody = `## pack_audio_execution_plan
### video_prompt_pack_plan
### global_execution_preamble
### project_level_global_rules
## segment_sound_execution
BGM
Foley
SFX
Ambience
Silence
### segment_technical_control_block
primary_vgu_ids
continuity_in
continuity_out
blocking_execution
prop_state_execution
next_handoff
### shot_by_shot_director_prompt
shot_continuity
screen_positioning
### prompt_trace
### video_prompt_review`;
  const validVideoPromptPackBody = `---
schema: video_prompts.v1
stage: video_prompts
pack_id: "001"
---
# 视频提示词 第01包

## pack_audio_execution_plan

## video_prompt_pack_plan

## global_execution_preamble

## project_level_global_rules

## segment_sound_execution

### BGM
### Foley-SFX
### Ambience
### Silence

## segment_technical_control_block

primary_vgu_ids
continuity_in
continuity_out
blocking_execution
prop_state_execution
next_handoff

## shot_by_shot_director_prompt

shot_continuity
screen_positioning

## prompt_trace

## 可直接复制使用块

【故事板关键帧参考规则】
将"控制故事板 Pack 01"作为本段视频生成的顺序动作、镜头调度、空间关系和连续性主参考；将"风格故事板 Pack 01"作为角色渲染、场景质感、灯光影调、情绪氛围和最终画面质量辅助参考。严格依据控制故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进来驱动画面生成。在相邻故事板关键姿势之间，扩展出流畅、连续、电影化的动画动作，遵循预备动作→发力→反应→收势的完整弧线。不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕等版式痕迹。

【项目级全局锁定规则】
- 主场景：测试主场景保持固定空间锚点。
- 角色锁定：主角每次出现保持同一角色设计。
- 不重复角色：同一镜头内不出现两个主角。
- 画面可读性：动作清晰、角色轮廓可辨、空间锚点稳定、表演时机准确。
- 风格锁定：保持已确认风格包的镜头节奏和表演尺度。
- 灯光锁定：保持已确认灯光方向和光比。
- 负向边界：不现代化表演，不出现角色重复、空间漂移或故事板版式痕迹。

【Segment 1 技术控制说明】
本段承接 VGU-01，continuity_in 从上一段动作动势进入，continuity_out 将角色视线和道具状态交给下一段。角色始终保持画面右侧到中景的移动路径，空间轴线不反转，blocking_execution 与 prop_state_execution 都以可读动作为先，next_handoff 保留动作、视线和声音钩子。

【Segment 1 导演长版提示词】
Segment 总时间轴：00:00-00:10。C01 [00:00-00:02] 镜头语言：使用中景固定到缓慢推镜，镜头运动服务动作可读性和情绪递进。画面构图：角色位于画面中央偏右，前景保留空间锚点，中景展示动作路径，后景保持场景轮廓。角色表演：先出现预备动作，再发力推进，随后完成反应和收势，微表情从紧张过渡到释然。情绪递进：进入时压抑，动作爆发时升高，结尾回落并交给下一段。动作弧线：预备动作→发力→反应→收势必须完整。空间与道具连续性：角色不跨轴，道具开头、段内变化和结尾状态都清晰可见。情绪氛围：保持压抑到释放的渐进氛围。美术质感：沿用风格故事板中的场景材质、角色渲染和最终画面质量。灯光影调：保持已确认灯光方向、色温和光比。声音承接：BGM 承接上一段，Foley-SFX 强化动作点，Ambience 保持场景底噪，Silence 留给情绪停顿。负向边界：避免现代快剪、现代化表演、角色重复、空间漂移、写实伤害和故事板版式痕迹。

## video_prompt_review`;
  const validStoryboardPromptBody = `# 故事板整板 Prompt

## 复制专用主 Prompt

生成一张 12 格故事板总板。

## Control-Oriented Storyboard Board

### Beat Line
### Camera Path
### Action Path

## Style & Rendering Storyboard Board

### Visual Style
### Character Rendering`;
  const storyboardDetailArtifacts = [
    {
      id: 'storyboard-beat-skeleton-v1',
      stage: 'storyboard',
      kind: 'draft' as const,
      role: 'detail',
      path: 'details/storyboard/beat_skeleton_v1.md',
      readable_by_downstream: false
    },
    {
      id: 'storyboard-vgu-v1',
      stage: 'storyboard',
      kind: 'draft' as const,
      role: 'detail',
      path: 'details/storyboard/video_generation_units_v1.md',
      readable_by_downstream: false
    },
    {
      id: 'storyboard-shot-continuity-v1',
      stage: 'storyboard',
      kind: 'draft' as const,
      role: 'detail',
      path: 'details/storyboard/shot_continuity_plan_v1.md',
      readable_by_downstream: false
    },
    {
      id: 'storyboard-quality-check-v1',
      stage: 'storyboard',
      kind: 'draft' as const,
      role: 'detail',
      path: 'details/storyboard/storyboard_quality_check_v1.md',
      readable_by_downstream: false
    },
    {
      id: 'storyboard-design-reconciliation-v1',
      stage: 'storyboard',
      kind: 'draft' as const,
      role: 'detail',
      path: 'details/storyboard/design_reconciliation_review_v1.md',
      readable_by_downstream: false
    }
  ];
  const storyboardPromptArtifacts = [
    {
      id: 'storyboard-control-prompt-v1',
      stage: 'storyboard',
      kind: 'final' as const,
      role: 'output',
      path: 'outputs/storyboard_prompts/control_storyboard_prompt_v1.md',
      readable_by_downstream: true
    },
    {
      id: 'storyboard-styled-prompt-v1',
      stage: 'storyboard',
      kind: 'final' as const,
      role: 'output',
      path: 'outputs/storyboard_prompts/styled_storyboard_prompt_v1.md',
      readable_by_downstream: true
    }
  ];
  const videoPromptPackArtifacts = [
    {
      id: 'video-prompts-pack-001-zh',
      stage: 'video_prompts',
      kind: 'final' as const,
      role: 'primary_delivery',
      path: 'outputs/video_prompts/视频提示词_第01包_中文_v1.md',
      readable_by_downstream: true,
      pack_id: '001'
    }
  ];
  const englishVideoPromptPackArtifact = {
    id: 'video-prompts-pack-001-en',
    stage: 'video_prompts',
    kind: 'final' as const,
    role: 'translation',
    path: 'outputs/video_prompts/视频提示词_第01包_英文_v1.md',
    readable_by_downstream: true,
    pack_id: '001'
  };
  const optionalVideoPromptPackArtifacts = [
    {
      ...englishVideoPromptPackArtifact
    }
  ];
  const videoPromptReviewArtifact = {
    id: 'video-prompts-review-v1',
    stage: 'video_prompts',
    kind: 'draft' as const,
    role: 'detail',
    path: 'details/video_prompts/video_prompt_review_v1.md',
    readable_by_downstream: false
  };
  const validDesignBody = `---
schema: design.v1
stage: design
language: zh
---
## visual_language
shape_language_core
character_designs
scene_designs
prop_designs
space_continuity_seed
prop_state_machines
blocking_map`;
  const validDesignPromptBody = `# 角色说明书图片提示词

## 复制专用主 Prompt

生成一张中文主导的角色说明书板 / character bible sheet / character design board，用于后续多图参考和角色一致性校对。

## 角色基础信息区
角色名称、基础身份、故事功能、视觉锚点。

## 多视角区
正面、3/4、侧面、背面，保持同一脸型、发型、服装主色和剪影。

## 轮廓剪影区
展示清晰可识别的外轮廓和头身比。

## 表情系统区
包含 6 到 9 个剧情表情，覆盖惊讶、自信、紧张、喜悦、困惑、决心。

## 微表情区
包含 2 到 4 个微表情，展示眼神、眉毛和嘴角变化。

## 动作姿态区
包含 4 到 6 个剧情动作姿态，服务故事节拍。

## 关键道具交互区
展示角色与核心道具的握持、摆放、使用和状态变化。

## 服装 / 配件 / 材质细节区
展示服装、配件、手部、鞋子、材质和可复用识别点。

## 比例对照区
展示角色与关键道具、其他角色或场景元素的比例对照。

## 物理与安全边界区
说明边界约束、轻喜剧动作尺度和不可改变的角色锚点。`;
  const designPromptArtifacts = [
    {
      id: 'design-character-prompt-v1',
      stage: 'design',
      kind: 'final' as const,
      role: 'design_prompt',
      path: 'outputs/design_prompts/角色说明书图片提示词_v1.md',
      readable_by_downstream: true
    },
    {
      id: 'design-master-prompt-v1',
      stage: 'design',
      kind: 'final' as const,
      role: 'design_prompt',
      path: 'outputs/design_prompts/全场景资产总参考图提示词_v1.md',
      readable_by_downstream: true
    }
  ];

  function writeProjectFile(relativePath: string, content: string) {
    const fullPath = path.resolve(testDir, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
  }

  function writeStoryboardDeliveryFiles(promptBody = validStoryboardPromptBody) {
    for (const artifact of storyboardDetailArtifacts) {
      const content = artifact.path.includes('design_reconciliation_review')
        ? '# design_reconciliation_review\ndesign_revision_required: false\nchecked_storyboard_sources:\n  - outputs/storyboard_pack_001_cn.md\nchecked_design_sources:\n  - outputs/design.md\nnew_expression_or_pose_needs: none\nnew_prop_state_needs: none\nnew_space_or_blocking_needs: none\nnew_reference_board_needs: none\nno_design_change_reason: 当前最终分镜没有新增设计阶段未覆盖的表情、动作姿态、道具状态或空间站位。\n'
        : `# ${artifact.id}\n`;
      writeProjectFile(artifact.path, content);
    }
    for (const artifact of storyboardPromptArtifacts) {
      writeProjectFile(artifact.path, promptBody);
    }
  }

  function writeStoryboardBoard(
    confirmationStatus: 'confirmed' | 'pending' = 'confirmed',
    primaryPath = 'outputs/storyboard_pack_001_cn.md'
  ) {
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), `
confirmations:
  storyboard_plan_confirmed:
    status: ${confirmationStatus}
execution_policy:
  mode: fast_production
stage_index:
  storyboard:
    status: completed
    files:
      primary: ${primaryPath}
      outputs:
        - ${primaryPath}
        - outputs/storyboard_prompts/control_storyboard_prompt_v1.md
        - outputs/storyboard_prompts/styled_storyboard_prompt_v1.md
      details:
        - details/storyboard/beat_skeleton_v1.md
        - details/storyboard/video_generation_units_v1.md
        - details/storyboard/shot_continuity_plan_v1.md
        - details/storyboard/storyboard_quality_check_v1.md
        - details/storyboard/design_reconciliation_review_v1.md
      handoff: handoffs/storyboard.handoff.json
      quality_check: details/storyboard/storyboard_quality_check_v1.md
`, 'utf8');
  }

  function writeValidStoryboardManifest(primaryPath = 'outputs/storyboard_pack_001_cn.md') {
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_final_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: primaryPath,
          readable_by_downstream: true,
          pack_id: '001'
        },
        ...storyboardDetailArtifacts,
        ...storyboardPromptArtifacts
      ]
    });
  }

  function writeVideoPromptDeliveryFiles(packBody = validVideoPromptPackBody, includeEnglish = false) {
    for (const artifact of videoPromptPackArtifacts) {
      writeProjectFile(artifact.path, packBody);
    }
    if (includeEnglish) {
      writeProjectFile(englishVideoPromptPackArtifact.path, packBody);
    }
    writeProjectFile(videoPromptReviewArtifact.path, '# video_prompt_review\nfinal_delivery_ready: true\n');
  }

  function writeVideoPromptBoard(confirmationStatus: 'confirmed' | 'pending' = 'confirmed', includeEnglish = false) {
    const englishOutput = includeEnglish
      ? '        - outputs/video_prompts/视频提示词_第01包_英文_v1.md\n'
      : '';
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), `
confirmations:
  video_prompt_plan_confirmed:
    status: ${confirmationStatus}
execution_policy:
  mode: fast_production
stage_index:
  video_prompts:
    status: completed
    files:
      primary: outputs/video_prompts/视频提示词_第01包_中文_v1.md
      outputs:
        - outputs/video_prompts/视频提示词_第01包_中文_v1.md
${englishOutput.trimEnd()}
      details:
        - details/video_prompts/video_prompt_review_v1.md
      quality_check: details/video_prompts/video_prompt_review_v1.md
`, 'utf8');
  }

  function writeValidVideoPromptManifest(includeEnglish = false) {
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_pack_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: 'outputs/storyboard_pack_001_cn.md',
          readable_by_downstream: true,
          pack_id: '001'
        },
        ...videoPromptPackArtifacts,
        ...(includeEnglish ? optionalVideoPromptPackArtifacts : []),
        videoPromptReviewArtifact
      ]
    });
  }

  function writeDesignDeliveryFiles(characterPromptBody = validDesignPromptBody) {
    writeProjectFile('outputs/design.md', validDesignBody);
    writeProjectFile('outputs/design_prompts/角色说明书图片提示词_v1.md', characterPromptBody);
    writeProjectFile('outputs/design_prompts/全场景资产总参考图提示词_v1.md', '# 全场景资产总参考图提示词\n主场景空间布局\n角色默认站位\n核心道具位置\n道具状态矩阵\n');
  }

  function writeDesignBoard(confirmationStatus: 'confirmed' | 'pending' = 'confirmed') {
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), `
confirmations:
  design_confirmed:
    status: ${confirmationStatus}
execution_policy:
  mode: fast_production
stage_index:
  design:
    status: completed
    files:
      primary: outputs/design.md
      outputs:
        - outputs/design.md
        - outputs/design_prompts/角色说明书图片提示词_v1.md
        - outputs/design_prompts/全场景资产总参考图提示词_v1.md
      details: []
`, 'utf8');
  }

  function writeValidDesignManifest() {
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'design-final',
          stage: 'design',
          kind: 'final',
          role: 'design_output',
          path: 'outputs/design.md',
          readable_by_downstream: true
        },
        ...designPromptArtifacts
      ]
    });
  }

  await t.test('1. L1 Lint - Missing final artifacts and file existence', () => {
    // 1. No artifacts at all
    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L1-001'));

    // 2. Register final artifact but file does not physically exist
    project.registerArtifact({
      id: 'storyboard_final_001',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: 'outputs/storyboard_pack_001_cn.md',
      readable_by_downstream: true,
      pack_id: '001'
    });

    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L1-002'));
  });

  await t.test('2. L1 Lint - Path mismatch', () => {
    // Write physical file at a non-matching pattern
    const invalidPath = 'outputs/invalid_name.md';
    const fullInvalidPath = path.resolve(testDir, invalidPath);
    fs.mkdirSync(path.dirname(fullInvalidPath), { recursive: true });
    fs.writeFileSync(fullInvalidPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`, 'utf8');

    project.registerArtifact({
      id: 'storyboard_invalid_pattern',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: invalidPath,
      readable_by_downstream: true,
      pack_id: '001'
    });

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-L1-003'));

    // Clean up
    fs.unlinkSync(fullInvalidPath);
    // Remove the invalid artifact from manifest to prevent noise in subsequent tests
    const manifest = project.readManifest();
    manifest.artifacts = manifest.artifacts.filter(art => art.id !== 'storyboard_invalid_pattern');
    project.writeManifest(manifest);
  });

  await t.test('3. L2 Schema - Zod frontmatter and required headings', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    const fullValidPath = path.resolve(testDir, validPath);
    
    // Clear manifest and register one valid path artifact
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_final_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: validPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });
    
    // 1. Broken Frontmatter (unclosed flow sequence causes yaml parse error)
    fs.writeFileSync(fullValidPath, '---\nstage: [\n---\nBody', 'utf8');
    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L2-001'));

    // 2. Schema schema mismatch (missing 'schema' in frontmatter)
    fs.writeFileSync(fullValidPath, '---\nstage: storyboard\npack_id: "001"\n---\nBody', 'utf8');
    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L2-002'));

    // 3. Missing required heading (## storyboard_prompt_pack)
    fs.writeFileSync(fullValidPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\nBody content', 'utf8');
    const report3 = validator.validate('storyboard');
    assert.strictEqual(report3.status, 'failed');
    assert.ok(report3.errors.some(e => e.rule_id === 'SF-L2-003'));
  });

  await t.test('4. L3 Semantic - Forbidden terms', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    const fullValidPath = path.resolve(testDir, validPath);

    // Clear manifest
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_final_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: validPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });

    // Setup forbidden terms
    const forbiddenPath = path.resolve(testDir, 'forbidden_terms.yaml');
    fs.writeFileSync(forbiddenPath, 'terms:\n  - "Tom Cruise"\n  - "Coca-Cola"', 'utf8');

    // Content containing a forbidden term
    fs.writeFileSync(fullValidPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}\nWe will hire Tom Cruise for this scene.`, 'utf8');
    
    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-L3-001' && e.artifact === validPath));

    // Clean up forbidden_terms file
    fs.unlinkSync(forbiddenPath);
  });

  await t.test('5. L3 Semantic - Pack ID and Segment ID continuity', () => {
    // Clear manifest completely
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: []
    });

    const p1Path = 'outputs/storyboard_pack_002_cn.md';
    const fullP1Path = path.resolve(testDir, p1Path);
    
    // 1. Pack ID discontinuity (starts at 002, missing 001)
    fs.writeFileSync(fullP1Path, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "002"\n---\n${validStoryboardBody}\n### segment-01`, 'utf8');
    project.registerArtifact({
      id: 'storyboard_final_002',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: p1Path,
      readable_by_downstream: true,
      pack_id: '002'
    });

    const report1 = validator.validate('storyboard');
    assert.strictEqual(report1.status, 'failed');
    assert.ok(report1.errors.some(e => e.rule_id === 'SF-L3-002'));

    // Fix Pack ID discontinuity but introduce Segment ID discontinuity
    // We clean manifest and register ONLY pack 001 which has segments 01 and 03
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: []
    });

    // Delete outputs/storyboard_pack_002_cn.md physically to avoid scanning it
    if (fs.existsSync(fullP1Path)) {
      fs.unlinkSync(fullP1Path);
    }

    const p0Path = 'outputs/storyboard_pack_001_cn.md';
    const fullP0Path = path.resolve(testDir, p0Path);
    fs.writeFileSync(fullP0Path, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}\n### segment-01\n### segment-03`, 'utf8');
    
    project.registerArtifact({
      id: 'storyboard_final_001',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: p0Path,
      readable_by_downstream: true,
      pack_id: '001'
    });

    // Segment ID discontinuity check (starts at 1, but jumps to 3)
    const report2 = validator.validate('storyboard');
    assert.strictEqual(report2.status, 'failed');
    assert.ok(report2.errors.some(e => e.rule_id === 'SF-L3-003'));
  });

  await t.test('6. Custom override of stage rules using YAML configuration', () => {
    const customRuleDir = path.resolve(testDir, '.rules/stages');
    fs.mkdirSync(customRuleDir, { recursive: true });

    // Custom rule that changes expected pattern and required headers
    fs.writeFileSync(path.resolve(customRuleDir, 'storyboard.yaml'), 'expected_file_pattern: "^outputs/custom_storyboard_\\\\d+\\\\.md$"\nrequired_headers:\n  - "custom_header"', 'utf8');

    const customPath = 'outputs/custom_storyboard_1.md';
    const fullCustomPath = path.resolve(testDir, customPath);
    fs.writeFileSync(fullCustomPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## custom_header\n${validStoryboardBody}`, 'utf8');
    writeStoryboardDeliveryFiles();
    writeStoryboardBoard('confirmed', customPath);

    // Register custom artifact
    project.registerArtifact({
      id: 'custom_storyboard',
      stage: 'storyboard',
      kind: 'final',
      role: 'primary_delivery',
      path: customPath,
      readable_by_downstream: true,
      pack_id: '001'
    });

    // We need to clear previous final artifacts in manifest to avoid their path mismatches
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'custom_storyboard',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: customPath,
          readable_by_downstream: true,
          pack_id: '001'
        },
        ...storyboardDetailArtifacts,
        ...storyboardPromptArtifacts
      ]
    });

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'passed');
    assert.strictEqual(report.errors.length, 0);

    fs.rmSync(path.resolve(testDir, '.rules'), { recursive: true, force: true });
  });

  await t.test('7. SF-VP-001 Video Prompt storyboard pack alignment', () => {
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_pack_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: 'outputs/storyboard_pack_001_cn.md',
          readable_by_downstream: true,
          pack_id: '001'
        }
      ]
    });

    const vpPath = 'outputs/video_prompts_pack_002_cn.md';
    const fullVpPath = path.resolve(testDir, vpPath);
    fs.mkdirSync(path.dirname(fullVpPath), { recursive: true });
    // Write a valid body with headers to avoid other errors
    fs.writeFileSync(fullVpPath, `---\nschema: video_prompts.v1\nstage: video_prompts\npack_id: "002"\n---\n${validVideoPromptsBody}`, 'utf8');

    project.registerArtifact({
      id: 'vp_pack_002',
      stage: 'video_prompts',
      kind: 'final',
      role: 'primary_delivery',
      path: vpPath,
      readable_by_downstream: true,
      pack_id: '002'
    });

    // Validating video_prompts: it has pack_id: 002 but storyboard only has 001. Should fail SF-VP-001.
    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-001'));

    // Clean up
    if (fs.existsSync(fullVpPath)) {
      fs.unlinkSync(fullVpPath);
    }
  });

  await t.test('8. L4 index consistency warns when state, board, and manifest drift apart', () => {
    const topicPath = 'outputs/topic.md';
    const topicFullPath = path.resolve(testDir, topicPath);
    fs.mkdirSync(path.dirname(topicFullPath), { recursive: true });
    fs.writeFileSync(topicFullPath, '---\nschema: topic_gate.v1\nstage: topic_gate\n---\n## topic_ideas\n- idea', 'utf8');
    fs.mkdirSync(path.resolve(testDir, 'details/topic_gate'), { recursive: true });
    fs.writeFileSync(path.resolve(testDir, 'details/topic_gate/notes_v1.md'), '# notes', 'utf8');

    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'topic_gate_final',
        stage: 'topic_gate',
        kind: 'final',
        role: 'primary_delivery',
        path: topicPath,
        readable_by_downstream: true
      }]
    });
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_STATE.json'), JSON.stringify({
      project: 'temp_test_validator_project',
      stages: {
        topic_gate: {
          stage: 'topic_gate',
          status: 'completed',
          updated_at: '2026-06-14T00:00:00.000Z',
          history: []
        }
      }
    }, null, 2), 'utf8');
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), `
stage_index:
  topic_gate:
    status: pending
    files:
      primary:
      outputs: []
      details: []
`, 'utf8');

    const report = validator.validate('topic_gate');
    assert.strictEqual(report.status, 'passed');
    assert.ok(report.warnings.some(e => e.rule_id === 'SF-L4-001'));
    assert.ok(report.warnings.some(e => e.rule_id === 'SF-L4-002'));
  });

  await t.test('9. Storyboard deep contract rejects shallow prompt packs', () => {
    const shallowPath = 'outputs/storyboard_pack_001_cn.md';
    const fullShallowPath = path.resolve(testDir, shallowPath);
    fs.writeFileSync(fullShallowPath, '---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n## storyboard_prompt_pack\n### shot list\n- C01: wide shot', 'utf8');

    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_shallow_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: shallowPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-101'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-108'));
  });

  await t.test('10. Video prompts deep contract rejects missing technical control fields', () => {
    const shallowPath = 'outputs/video_prompts_pack_001_cn.md';
    const fullShallowPath = path.resolve(testDir, shallowPath);
    fs.writeFileSync(fullShallowPath, '---\nschema: video_prompts.v1\nstage: video_prompts\npack_id: "001"\n---\n## pack_audio_execution_plan\n## segment_sound_execution\n- music rises', 'utf8');

    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_pack_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: 'outputs/storyboard_pack_001_cn.md',
          readable_by_downstream: true,
          pack_id: '001'
        },
        {
          id: 'vp_shallow_001',
          stage: 'video_prompts',
          kind: 'final',
          role: 'primary_delivery',
          path: shallowPath,
          readable_by_downstream: true,
          pack_id: '001'
        }
      ]
    });

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-102'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-103'));
  });

  await t.test('11. Storyboard delivery contract rejects declared but missing prompt files', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'storyboard_final_001',
        stage: 'storyboard',
        kind: 'final',
        role: 'primary_delivery',
        path: validPath,
        readable_by_downstream: true,
        pack_id: '001'
      }]
    });
    fs.rmSync(path.resolve(testDir, 'PROJECT_BOARD.md'), { force: true });

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-201'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-205'));
  });

  await t.test('12. Storyboard delivery contract rejects prompt files without whole-board sections', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles('# Prompt\n## Shot List\nSeg | Shot | Prompt CN');
    writeStoryboardBoard('confirmed');
    writeValidStoryboardManifest(validPath);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-207'));
  });

  await t.test('13. Storyboard delivery contract rejects pending confirmation in fast mode', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles();
    writeStoryboardBoard('pending');
    writeValidStoryboardManifest(validPath);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-208'));
  });

  await t.test('13b. Storyboard delivery contract rejects missing confirmation in fast mode', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles();
    writeStoryboardBoard('confirmed');
    writeValidStoryboardManifest(validPath);
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), fs.readFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), 'utf8').replace(/confirmations:[\s\S]*?execution_policy:/, 'execution_policy:'), 'utf8');

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-208'));
  });

  await t.test('13c. Storyboard design reconciliation requires conditional fields and review dimensions', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles();
    writeProjectFile('details/storyboard/design_reconciliation_review_v1.md', '# design_reconciliation_review\ndesign_revision_required: true\nchecked_storyboard_sources:\n  - outputs/storyboard_pack_001_cn.md\nchecked_design_sources:\n  - outputs/design.md\nno_design_change_reason: 不需要\n');
    writeStoryboardBoard('confirmed');
    writeValidStoryboardManifest(validPath);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-214'));
  });

  await t.test('13d. Storyboard blocks completion when design reconciliation requires revision', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles();
    writeProjectFile('details/storyboard/design_reconciliation_review_v1.md', '# design_reconciliation_review\ndesign_revision_required: true\nchecked_storyboard_sources:\n  - outputs/storyboard_pack_001_cn.md\nchecked_design_sources:\n  - outputs/design.md\nnew_expression_or_pose_needs: 需要新增冲刺后喘息和回头确认的微表情。\nnew_prop_state_needs: none\nnew_space_or_blocking_needs: none\nnew_reference_board_needs: 需要补一张角色动作姿态参考。\nrecommended_design_updates:\n  - 更新角色说明书动作姿态区。\n');
    writeStoryboardBoard('confirmed');
    writeValidStoryboardManifest(validPath);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-SB-215'));
  });

  await t.test('14. Storyboard delivery contract passes with registered files, board index, and prompt sections', () => {
    const validPath = 'outputs/storyboard_pack_001_cn.md';
    writeProjectFile(validPath, `---\nschema: storyboard.v1\nstage: storyboard\npack_id: "001"\n---\n${validStoryboardBody}`);
    writeStoryboardDeliveryFiles();
    writeStoryboardBoard('confirmed');
    writeValidStoryboardManifest(validPath);

    const report = validator.validate('storyboard');
    assert.strictEqual(report.status, 'passed');
    assert.strictEqual(report.errors.length, 0);
  });

  await t.test('15. Video prompts delivery contract rejects missing pack and review files', () => {
    const vpPath = 'outputs/video_prompts_pack_001_cn.md';
    writeProjectFile(vpPath, validVideoPromptPackBody);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [
        {
          id: 'storyboard_pack_001',
          stage: 'storyboard',
          kind: 'final',
          role: 'primary_delivery',
          path: 'outputs/storyboard_pack_001_cn.md',
          readable_by_downstream: true,
          pack_id: '001'
        },
        {
          id: 'vp_legacy_001',
          stage: 'video_prompts',
          kind: 'final',
          role: 'primary_delivery',
          path: vpPath,
          readable_by_downstream: true,
          pack_id: '001'
        }
      ]
    });
    fs.rmSync(path.resolve(testDir, 'PROJECT_BOARD.md'), { force: true });

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-201'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-203'));
    assert.strictEqual(report.errors.some(e => e.rule_id === 'SF-VP-202'), false);
  });

  await t.test('16. Video prompts delivery contract rejects pack files without required runtime sections', () => {
    writeVideoPromptDeliveryFiles(`---
schema: video_prompts.v1
stage: video_prompts
pack_id: "001"
---
## pack_audio_execution_plan
## video_prompt_pack_plan
## global_execution_preamble
## project_level_global_rules
## segment_sound_execution
BGM
foley
sfx
Ambience
Silence
## segment_technical_control_block
primary_vgu_ids
continuity_in
continuity_out
blocking_execution
prop_state_execution
next_handoff
## shot_by_shot_director_prompt
shot_continuity
screen_positioning
## prompt_trace
## video_prompt_review`);
    writeVideoPromptBoard('confirmed');
    writeValidVideoPromptManifest();

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-204'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-205'));
  });

  await t.test('16b. Video prompts delivery contract rejects shallow copy-ready blocks', () => {
    writeVideoPromptDeliveryFiles(`---
schema: video_prompts.v1
stage: video_prompts
pack_id: "001"
---
# 视频提示词 第01包

## pack_audio_execution_plan
## video_prompt_pack_plan
## global_execution_preamble
## project_level_global_rules
## segment_sound_execution
### BGM
### Foley-SFX
### Ambience
### Silence
## segment_technical_control_block
primary_vgu_ids
continuity_in
continuity_out
blocking_execution
prop_state_execution
next_handoff
## shot_by_shot_director_prompt
shot_continuity
screen_positioning
## prompt_trace
## 可直接复制使用块
【故事板关键帧参考规则】
global_execution_preamble
【项目级全局锁定规则】
主场景
角色锁定
不重复角色
画面可读性
风格锁定
灯光锁定
负向边界
【Segment 1 技术控制说明】
\`\`\`yaml
primary_vgu_ids: [VGU-01]
continuity_in: 上一段
continuity_out: 下一段
\`\`\`
【Segment 1 导演长版提示词】
镜头标题和短句。
## video_prompt_review`);
    writeVideoPromptBoard('confirmed');
    writeValidVideoPromptManifest();

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-211'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-212'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-213'));
  });

  await t.test('17. Video prompts delivery contract rejects pending confirmation in fast mode', () => {
    writeVideoPromptDeliveryFiles();
    writeVideoPromptBoard('pending');
    writeValidVideoPromptManifest();

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-206'));
  });

  await t.test('17b. Video prompts delivery contract rejects locked full_auto mode', () => {
    writeVideoPromptDeliveryFiles();
    writeVideoPromptBoard('confirmed');
    writeValidVideoPromptManifest();
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), fs.readFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), 'utf8').replace('mode: fast_production', 'mode: full_auto'), 'utf8');

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-VP-206'));
  });

  await t.test('18. Video prompts delivery contract passes with registered pack files, review, and board index', () => {
    writeVideoPromptDeliveryFiles();
    writeVideoPromptBoard('confirmed');
    writeValidVideoPromptManifest();

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'passed');
    assert.strictEqual(report.errors.length, 0);
  });

  await t.test('18b. Video prompts delivery contract still validates optional English pack when present', () => {
    writeVideoPromptDeliveryFiles();
    writeProjectFile(englishVideoPromptPackArtifact.path, `---
schema: video_prompts.v1
stage: video_prompts
pack_id: "001"
---
# English shallow pack`);
    writeVideoPromptBoard('confirmed', true);
    writeValidVideoPromptManifest(true);

    const report = validator.validate('video_prompts');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.artifact === englishVideoPromptPackArtifact.path));
  });

  await t.test('19. Design delivery contract rejects missing required design prompt artifacts', () => {
    writeProjectFile('outputs/design.md', validDesignBody);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'design-final',
        stage: 'design',
        kind: 'final',
        role: 'design_output',
        path: 'outputs/design.md',
        readable_by_downstream: true
      }]
    });
    fs.rmSync(path.resolve(testDir, 'PROJECT_BOARD.md'), { force: true });

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-205'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-206'));
    assert.strictEqual(report.errors.some(e => e.rule_id === 'SF-DG-201'), false);
  });

  await t.test('19b. Design delivery contract rejects missing primary state and space markers', () => {
    writeDesignDeliveryFiles();
    writeDesignBoard('confirmed');
    writeValidDesignManifest();
    writeProjectFile('outputs/design.md', `---
schema: design.v1
stage: design
---
## visual_language
character_designs
scene_designs
prop_designs`);

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-101'));
    assert.ok(report.errors.some(e => e.message.includes('space_continuity_seed')));
    assert.ok(report.errors.some(e => e.message.includes('prop_state_machines')));
    assert.ok(report.errors.some(e => e.message.includes('blocking_map')));
  });

  await t.test('20. Design delivery contract rejects English-dominant poster-style character prompt', () => {
    writeDesignDeliveryFiles(`# Character Poster

single portrait, cinematic portrait, hero poster, highly detailed character poster, dramatic lighting, full body, cool pose

## character design board
front view, side view`);
    writeDesignBoard('confirmed');
    writeValidDesignManifest();

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-207'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-208'));
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-209'));
  });

  await t.test('21. Design delivery contract rejects pending confirmation in fast mode', () => {
    writeDesignDeliveryFiles();
    writeDesignBoard('pending');
    writeValidDesignManifest();

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-210'));
  });

  await t.test('21b. Design delivery contract rejects missing confirmation in fast mode', () => {
    writeDesignDeliveryFiles();
    writeDesignBoard('confirmed');
    writeValidDesignManifest();
    fs.writeFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), fs.readFileSync(path.resolve(testDir, 'PROJECT_BOARD.md'), 'utf8').replace(/confirmations:[\s\S]*?execution_policy:/, 'execution_policy:'), 'utf8');

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-DG-210'));
  });

  await t.test('22. Design delivery contract passes with registered files, Chinese prompt, and board index', () => {
    writeDesignDeliveryFiles();
    writeDesignBoard('confirmed');
    writeValidDesignManifest();

    const report = validator.validate('design');
    assert.strictEqual(report.status, 'passed');
    assert.strictEqual(report.errors.length, 0);
  });

  await t.test('23. Reference lightweight contract rejects missing inheritance boundary fields', () => {
    writeProjectFile('details/reference/reference_boundary_v1.md', '# reference_boundary\nallowed_inheritance\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'reference-boundary-v1',
        stage: 'reference',
        kind: 'final',
        role: 'reference_boundary',
        path: 'details/reference/reference_boundary_v1.md',
        readable_by_downstream: true
      }]
    });

    const report = validator.validate('reference');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-REF-101'));
  });

  await t.test('24. Story lightweight contract enforces beat count and emotional arc', () => {
    writeProjectFile('details/story/story_development_v1.md', `# story_development
story_beats
beat_id: B01
beat_id: B02
beat_id: B03
emotional_arc`);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'story-development-v1',
        stage: 'story',
        kind: 'final',
        role: 'story_development',
        path: 'details/story/story_development_v1.md',
        readable_by_downstream: true
      }]
    });

    const report = validator.validate('story');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-ST-102'));
  });

  await t.test('24b. Story lightweight contract accepts YAML beat ids', () => {
    writeProjectFile('details/story/story_development_v1.md', `# story_development
story_beats
beats:
  - id: beat_1
  - id: beat_2
  - id: beat_3
  - id: beat_4
emotional_arc`);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'story-development-v1',
        stage: 'story',
        kind: 'final',
        role: 'story_development',
        path: 'details/story/story_development_v1.md',
        readable_by_downstream: true
      }]
    });

    const report = validator.validate('story');
    assert.strictEqual(report.status, 'passed');
  });

  await t.test('25. Assets lightweight contract rejects missing lock constraints', () => {
    writeProjectFile('details/assets/asset_check_v1.md', '# asset_check\nasset_lock\nlocked_assets\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'asset-check-v1',
        stage: 'assets',
        kind: 'final',
        role: 'asset_check',
        path: 'details/assets/asset_check_v1.md',
        readable_by_downstream: true
      }]
    });

    const report = validator.validate('assets');
    assert.strictEqual(report.status, 'failed');
    assert.ok(report.errors.some(e => e.rule_id === 'SF-AS-101'));
  });

  await t.test('26. Lightweight contracts pass with required single-file structures', () => {
    writeProjectFile('details/reference/reference_boundary_v1.md', '# reference_boundary\nallowed_inheritance\nforbidden_inheritance\ncreative_direction_context\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'reference-boundary-v1',
        stage: 'reference',
        kind: 'final',
        role: 'reference_boundary',
        path: 'details/reference/reference_boundary_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('reference').status, 'passed');

    writeProjectFile('details/story/story_development_v1.md', `# story_development
story_beats
beat_id: B01
beat_id: B02
beat_id: B03
beat_id: B04
emotional_arc`);
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'story-development-v1',
        stage: 'story',
        kind: 'final',
        role: 'story_development',
        path: 'details/story/story_development_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('story').status, 'passed');

    writeProjectFile('details/assets/asset_check_v1.md', '# asset_check\nasset_lock\nlocked_assets\ndownstream_constraints\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'asset-check-v1',
        stage: 'assets',
        kind: 'final',
        role: 'asset_check',
        path: 'details/assets/asset_check_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('assets').status, 'passed');
  });

  await t.test('27. Protocol detail primary artifacts pass final artifact validation', () => {
    writeProjectFile('details/performance_sheet_v1.md', '---\nschema: performance.v1\nstage: performance\n---\n## performance_beats\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'performance-sheet-v1',
        stage: 'performance',
        kind: 'final',
        role: 'detail',
        path: 'details/performance_sheet_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('performance').status, 'passed');

    writeProjectFile('details/audio_plan_v1.md', '---\nschema: audio.v1\nstage: audio\n---\n## audio_execution_plan\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'audio-plan-v1',
        stage: 'audio',
        kind: 'final',
        role: 'detail',
        path: 'details/audio_plan_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('audio').status, 'passed');

    writeProjectFile('details/script_v1.md', '---\nschema: script.v1\nstage: script\n---\n## story_beats\n');
    project.writeManifest({
      version: 1,
      project: 'temp_test_validator_project',
      artifacts: [{
        id: 'script-v1',
        stage: 'script',
        kind: 'final',
        role: 'detail',
        path: 'details/script_v1.md',
        readable_by_downstream: true
      }]
    });
    assert.strictEqual(validator.validate('script').status, 'passed');
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
