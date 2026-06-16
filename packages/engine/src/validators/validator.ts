import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Project, parseMarkdownFrontmatter, Artifact } from '../project.js';
import { discoverStageArtifacts } from '../artifact_sync.js';
import { ValidationError, ValidationReport } from './types.js';
import { FrontmatterSchemas } from './schemas.js';

export interface StageRule {
  expected_file_pattern: string;
  required_headers: string[];
}

interface ParsedFinalArtifact {
  art: Artifact;
  frontmatter: Record<string, unknown>;
  body: string;
  lines: string[];
}

interface DeepContractRule {
  rule_id: string;
  label: string;
  required_markers: string[];
  suggestion: string;
}

const STORYBOARD_DEEP_CONTRACT_RULES: DeepContractRule[] = [
  {
    rule_id: 'SF-SB-101',
    label: 'beat_skeleton',
    required_markers: ['beat_skeleton'],
    suggestion: 'Add a beat_skeleton section that defines each beat function, duration, action, emotion, and continuity handoff.'
  },
  {
    rule_id: 'SF-SB-102',
    label: 'storyboard_content_breakdown',
    required_markers: ['storyboard_content_breakdown'],
    suggestion: 'Add storyboard_content_breakdown before shot prompting so downstream stages can trace what each board block covers.'
  },
  {
    rule_id: 'SF-SB-103',
    label: 'cinematic_language_plan',
    required_markers: ['cinematic_language_plan'],
    suggestion: 'Add cinematic_language_plan with camera language, lens/movement logic, framing rhythm, and visual continuity.'
  },
  {
    rule_id: 'SF-SB-104',
    label: 'video_generation_units',
    required_markers: ['video_generation_units', 'vgu'],
    suggestion: 'Add video_generation_units and stable VGU ids so video_prompts can inherit segment boundaries exactly.'
  },
  {
    rule_id: 'SF-SB-105',
    label: 'shot_continuity_plan',
    required_markers: ['shot_continuity_plan'],
    suggestion: 'Add shot_continuity_plan with shot-to-shot handoff, screen direction, blocking, and prop state continuity.'
  },
  {
    rule_id: 'SF-SB-106',
    label: 'continuity_control_system',
    required_markers: ['continuity_control_system'],
    suggestion: 'Add continuity_control_system covering spatial continuity, character position, prop state, rhythm, and emotional handoff.'
  },
  {
    rule_id: 'SF-SB-107',
    label: 'storyboard_prompt_pack_plan',
    required_markers: ['storyboard_prompt_pack_plan'],
    suggestion: 'Add storyboard_prompt_pack_plan before final storyboard prompts so the output has an inspectable production plan.'
  },
  {
    rule_id: 'SF-SB-108',
    label: 'dual storyboard deliverables and quality check',
    required_markers: [
      'storyboard_quality_check',
      'control_storyboard_file',
      'styled_storyboard_file',
      'control_storyboard_prompt_file',
      'styled_storyboard_prompt_file'
    ],
    suggestion: 'Add storyboard_quality_check plus control/styled storyboard file and prompt file markers for the dual-version delivery.'
  }
];

const VIDEO_PROMPT_DEEP_CONTRACT_RULES: DeepContractRule[] = [
  {
    rule_id: 'SF-VP-101',
    label: 'video_prompt_pack_plan',
    required_markers: ['video_prompt_pack_plan'],
    suggestion: 'Add video_prompt_pack_plan to explain pack scope, segment mapping, and inherited storyboard/audio constraints.'
  },
  {
    rule_id: 'SF-VP-102',
    label: 'global execution rules',
    required_markers: ['global_execution_preamble', 'project_level_global_rules'],
    suggestion: 'Add global_execution_preamble and project_level_global_rules before segment prompts.'
  },
  {
    rule_id: 'SF-VP-103',
    label: 'segment continuity and technical control',
    required_markers: [
      'segment_technical_control_block',
      'primary_vgu_ids',
      'continuity_in',
      'continuity_out',
      'blocking_execution',
      'prop_state_execution',
      'next_handoff'
    ],
    suggestion: 'Add a segment_technical_control_block for every segment with VGU ids, continuity in/out, blocking, prop state, and next handoff.'
  },
  {
    rule_id: 'SF-VP-104',
    label: 'segment_sound_execution',
    required_markers: ['segment_sound_execution', 'bgm', 'foley', 'sfx', 'ambience', 'silence'],
    suggestion: 'Expand segment_sound_execution into BGM, Foley/SFX, Ambience, and Silence layers for each segment.'
  },
  {
    rule_id: 'SF-VP-105',
    label: 'shot_by_shot_director_prompt',
    required_markers: ['shot_by_shot_director_prompt', 'shot_continuity', 'screen_positioning'],
    suggestion: 'Add shot_by_shot_director_prompt with shot continuity and screen positioning for director-length prompts.'
  },
  {
    rule_id: 'SF-VP-106',
    label: 'prompt trace and review',
    required_markers: ['prompt_trace', 'video_prompt_review'],
    suggestion: 'Add prompt_trace and video_prompt_review so the pack can be audited and auto-fixed before delivery.'
  }
];

interface StoryboardRequiredArtifact {
  rule_id: string;
  label: string;
  pattern: RegExp;
  suggestion: string;
}

const STORYBOARD_REQUIRED_ARTIFACTS: StoryboardRequiredArtifact[] = [
  {
    rule_id: 'SF-SB-201',
    label: 'beat_skeleton detail file',
    pattern: /^details\/storyboard\/beat_skeleton_v[^/]+\.md$/i,
    suggestion: 'Write and register details/storyboard/beat_skeleton_v*.md.'
  },
  {
    rule_id: 'SF-SB-202',
    label: 'video_generation_units detail file',
    pattern: /^details\/storyboard\/video_generation_units_v[^/]+\.md$/i,
    suggestion: 'Write and register details/storyboard/video_generation_units_v*.md.'
  },
  {
    rule_id: 'SF-SB-203',
    label: 'shot_continuity_plan detail file',
    pattern: /^details\/storyboard\/shot_continuity_plan_v[^/]+\.md$/i,
    suggestion: 'Write and register details/storyboard/shot_continuity_plan_v*.md.'
  },
  {
    rule_id: 'SF-SB-204',
    label: 'storyboard_quality_check detail file',
    pattern: /^details\/storyboard\/storyboard_quality_check_v[^/]+\.md$/i,
    suggestion: 'Write and register details/storyboard/storyboard_quality_check_v*.md, then point PROJECT_BOARD stage_index.storyboard.files.quality_check to it.'
  },
  {
    rule_id: 'SF-SB-213',
    label: 'design reconciliation review file',
    pattern: /^details\/storyboard\/design_reconciliation_review_v[^/]+\.md$/i,
    suggestion: 'Write and register details/storyboard/design_reconciliation_review_v*.md after final storyboard design.'
  },
  {
    rule_id: 'SF-SB-205',
    label: 'control storyboard prompt file',
    pattern: /^outputs\/storyboard_prompts\/control_storyboard_prompt_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/storyboard_prompts/control_storyboard_prompt_v*.md.'
  },
  {
    rule_id: 'SF-SB-206',
    label: 'styled storyboard prompt file',
    pattern: /^outputs\/storyboard_prompts\/styled_storyboard_prompt_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/storyboard_prompts/styled_storyboard_prompt_v*.md.'
  }
];

const STORYBOARD_PROMPT_REQUIRED_SECTIONS = [
  '复制专用主 Prompt',
  'Control-Oriented Storyboard Board',
  'Style & Rendering Storyboard Board',
];

const STORYBOARD_DESIGN_RECONCILIATION_REQUIRED_MARKERS = [
  'design_revision_required',
  'checked_storyboard_sources',
  'checked_design_sources',
  'new_expression_or_pose_needs',
  'new_prop_state_needs',
  'new_space_or_blocking_needs',
  'new_reference_board_needs',
];

interface DesignRequiredArtifact {
  rule_id: string;
  label: string;
  pattern: RegExp;
  suggestion: string;
}

const DESIGN_REQUIRED_ARTIFACTS: DesignRequiredArtifact[] = [
  {
    rule_id: 'SF-DG-205',
    label: 'character bible sheet prompt',
    pattern: /^outputs\/design_prompts\/角色说明书图片提示词_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/design_prompts/角色说明书图片提示词_v*.md.'
  },
  {
    rule_id: 'SF-DG-206',
    label: 'master scene-prop reference prompt',
    pattern: /^outputs\/design_prompts\/全场景资产总参考图提示词_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/design_prompts/全场景资产总参考图提示词_v*.md.'
  }
];

const DESIGN_PRIMARY_REQUIRED_MARKERS = [
  'visual_language',
  'character_designs',
  'scene_designs',
  'prop_designs',
  'space_continuity_seed',
  'prop_state_machines',
  'blocking_map',
];

const DESIGN_CHARACTER_PROMPT_REQUIRED_MARKERS = [
  '角色说明书',
  '多视角',
  '轮廓剪影',
  '表情系统',
  '微表情',
  '动作姿态',
  '关键道具交互',
  '细节区',
  '比例对照',
  '边界约束',
];

const DESIGN_FORBIDDEN_POSTER_MARKERS = [
  'single portrait',
  'cinematic portrait',
  'hero poster',
  'character poster',
];

interface LightStageContract {
  artifactPattern: RegExp;
  requiredMarkers: string[];
  ruleId: string;
  label: string;
  suggestion: string;
}

const LIGHT_STAGE_CONTRACTS: Record<string, LightStageContract> = {
  reference: {
    artifactPattern: /^details\/reference\/reference_boundary_v[^/]+\.md$/i,
    requiredMarkers: ['reference_boundary', 'allowed_inheritance', 'forbidden_inheritance', 'creative_direction_context'],
    ruleId: 'SF-REF-101',
    label: 'reference boundary',
    suggestion: 'Add reference_boundary with allowed/forbidden inheritance and creative_direction_context.'
  },
  story: {
    artifactPattern: /^details\/story\/story_development_v[^/]+\.md$/i,
    requiredMarkers: ['story_beats', 'emotional_arc'],
    ruleId: 'SF-ST-101',
    label: 'story development',
    suggestion: 'Add story_beats with 4-8 beat_id entries and emotional_arc.'
  },
  assets: {
    artifactPattern: /^details\/assets\/asset_check_v[^/]+\.md$/i,
    requiredMarkers: ['asset_lock', 'locked_assets', 'downstream_constraints'],
    ruleId: 'SF-AS-101',
    label: 'asset check',
    suggestion: 'Add asset_lock with locked_assets and downstream_constraints.'
  }
};

interface VideoPromptsRequiredArtifact {
  rule_id: string;
  label: string;
  pattern: RegExp;
  suggestion: string;
  optional?: boolean;
}

const VIDEO_PROMPTS_REQUIRED_ARTIFACTS: VideoPromptsRequiredArtifact[] = [
  {
    rule_id: 'SF-VP-201',
    label: 'Chinese pack-aligned video prompt file',
    pattern: /^outputs\/video_prompts\/视频提示词_第\d+包_中文_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/video_prompts/视频提示词_第01包_中文_v*.md.'
  },
  {
    rule_id: 'SF-VP-202',
    label: 'English pack-aligned video prompt file',
    pattern: /^outputs\/video_prompts\/视频提示词_第\d+包_英文_v[^/]+\.md$/i,
    suggestion: 'Write and register outputs/video_prompts/视频提示词_第01包_英文_v*.md only when English delivery is requested.',
    optional: true
  },
  {
    rule_id: 'SF-VP-203',
    label: 'video prompt review file',
    pattern: /^details\/video_prompts\/video_prompt_review_v[^/]+\.md$/i,
    suggestion: 'Write and register details/video_prompts/video_prompt_review_v*.md, then point PROJECT_BOARD stage_index.video_prompts.files.quality_check to it.'
  }
];

const VIDEO_PROMPTS_PACK_REQUIRED_SECTIONS = [
  'video_prompt_pack_plan',
  'pack_audio_execution_plan',
  'global_execution_preamble',
  'project_level_global_rules',
  'segment_technical_control_block',
  'shot_by_shot_director_prompt',
  'segment_sound_execution',
  'prompt_trace',
  'video_prompt_review',
  '可直接复制使用块',
];

const VIDEO_PROMPTS_SOUND_REQUIRED_SECTIONS = [
  'BGM',
  'Foley-SFX',
  'Ambience',
  'Silence',
];

const VIDEO_PROMPTS_COPY_BLOCK_REQUIRED_MARKERS = [
  '【故事板关键帧参考规则】',
  '将"控制故事板 Pack',
  '顺序动作、镜头调度、空间关系和连续性主参考',
  '将"风格故事板 Pack',
  '角色渲染、场景质感、灯光影调、情绪氛围和最终画面质量辅助参考',
  '严格依据控制故事板中的节拍推进、镜头节奏、构图逻辑、动作编排、空间关系和情绪递进',
  '不渲染故事板中的边框、箭头、镜头编号、面板分隔线、UI标注或字幕',
  '【项目级全局锁定规则】',
  '主场景',
  '角色锁定',
  '不重复角色',
  '画面可读性',
  '风格锁定',
  '灯光锁定',
  '负向边界',
  '技术控制说明',
  '导演长版提示词',
];

const VIDEO_PROMPTS_DIRECTOR_PROMPT_REQUIRED_MARKERS = [
  'Segment 总时间轴',
  '镜头语言',
  '画面构图',
  '角色表演',
  '情绪递进',
  '动作弧线',
  '空间',
  '道具',
  '情绪氛围',
  '美术',
  '灯光',
  '声音',
  'Foley-SFX',
  '负向边界',
];

export const DEFAULT_STAGE_RULES: Record<string, StageRule> = {
  topic_gate: {
    expected_file_pattern: '^outputs/topic\\.md$',
    required_headers: []
  },
  reference: {
    expected_file_pattern: '^details/reference/reference_boundary_v[^/]+\\.md$',
    required_headers: []
  },
  story: {
    expected_file_pattern: '^details/story/story_development_v[^/]+\\.md$',
    required_headers: []
  },
  assets: {
    expected_file_pattern: '^details/assets/asset_check_v[^/]+\\.md$',
    required_headers: []
  },
  script: {
    expected_file_pattern: '^(outputs/script\\.md|details/script_v[^/]+\\.md)$',
    required_headers: ['story_beats']
  },
  design: {
    expected_file_pattern: '^outputs/design\\.md$',
    required_headers: ['visual_language']
  },
  performance: {
    expected_file_pattern: '^(outputs/performance_pack_\\d+(_\\w+)?\\.md|details/performance_sheet_v[^/]+\\.md)$',
    required_headers: ['performance_beats']
  },
  audio: {
    expected_file_pattern: '^(outputs/audio_pack_\\d+(_\\w+)?\\.md|details/audio_plan_v[^/]+\\.md)$',
    required_headers: ['audio_execution_plan']
  },
  storyboard: {
    expected_file_pattern: '^outputs/storyboard_pack_\\d+(_\\w+)?\\.md$',
    required_headers: ['storyboard_prompt_pack']
  },
  video_prompts: {
    expected_file_pattern: '^(outputs/video_prompts_pack_\\d+(_\\w+)?\\.md|outputs/video_prompts/视频提示词_第\\d+包_(中文|英文)_v[^/]+\\.md)$',
    required_headers: ['pack_audio_execution_plan', 'segment_sound_execution']
  },
  publish_review: {
    expected_file_pattern: '^(outputs/publish_review\\.md|outputs/publish_copy/.+\\.md)$',
    required_headers: []
  }
};

export class Validator {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  /**
   * Load stage rules (merging .rules/stages/<stage>.yaml if it exists)
   */
  public getStageRule(stage: string): StageRule {
    const rulePath = path.join(this.project.projectPath, '.rules', 'stages', `${stage}.yaml`);
    const defaultRule = DEFAULT_STAGE_RULES[stage] || { expected_file_pattern: '', required_headers: [] };
    
    if (fs.existsSync(rulePath)) {
      try {
        const content = fs.readFileSync(rulePath, 'utf8');
        const parsed = yaml.load(content) as Partial<StageRule>;
        return {
          expected_file_pattern: parsed.expected_file_pattern ?? defaultRule.expected_file_pattern,
          required_headers: parsed.required_headers ?? defaultRule.required_headers
        };
      } catch (err) {
        // Fallback to default if load/parse fails
      }
    }
    return defaultRule;
  }

  /**
   * Load forbidden terms list from project root (forbidden_terms.yaml)
   */
  public getForbiddenTerms(): string[] {
    const filePath = path.join(this.project.projectPath, 'forbidden_terms.yaml');
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const parsed = yaml.load(content) as { terms?: string[] };
        if (parsed && Array.isArray(parsed.terms)) {
          return parsed.terms;
        }
      } catch (err) {
        // Fallback
      }
    }
    return [];
  }

  private getStageAliases(stage: string): string[] {
    if (stage === 'topic_gate') return ['topic_gate', 'topic'];
    if (stage === 'topic') return ['topic', 'topic_gate'];
    if (stage === 'publish_review') return ['publish_review', 'publish'];
    if (stage === 'publish') return ['publish', 'publish_review'];
    return [stage];
  }

  private readStateStageStatus(stage: string): string | undefined {
    const statePath = path.join(this.project.projectPath, 'PROJECT_STATE.json');
    if (!fs.existsSync(statePath)) {
      return undefined;
    }
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      return state?.stages?.[stage]?.status;
    } catch {
      return undefined;
    }
  }

  private readBoardStageIndex(stage: string): any | undefined {
    const boardState = this.readProjectBoardState();
    const stageIndex = boardState?.stage_index ?? {};
    for (const alias of this.getStageAliases(stage)) {
      if (stageIndex[alias]) {
        return stageIndex[alias];
      }
    }
    return undefined;
  }

  private readProjectBoardState(): any | undefined {
    const boardPath = path.join(this.project.projectPath, 'PROJECT_BOARD.md');
    if (!fs.existsSync(boardPath)) {
      return undefined;
    }
    try {
      const parsed = parseMarkdownFrontmatter(fs.readFileSync(boardPath, 'utf8'));
      return parsed.frontmatter;
    } catch {
      return undefined;
    }
  }

  private isConfirmed(value: any): boolean {
    return value?.status === 'confirmed' || value?.status === 'legacy confirmed';
  }

  private isFullAutoUnlocked(boardState: any): boolean {
    const confirmations = boardState?.confirmations ?? {};
    const config = boardState?.project_config ?? {};
    return (
      this.isConfirmed(confirmations.topic_confirmed) &&
      this.isConfirmed(confirmations.style_family_confirmed) &&
      this.isConfirmed(confirmations.style_confirmed) &&
      this.isConfirmed(confirmations.script_confirmed) &&
      Boolean(config.target_total_duration_seconds) &&
      Boolean(config.segment_duration_seconds)
    );
  }

  private addConfirmationGateError(
    stage: string,
    boardState: any,
    confirmationKey: string,
    ruleId: string,
    errors: ValidationError[],
  ) {
    const executionMode = boardState.execution_policy?.mode;
    if (executionMode === 'full_auto') {
      if (!this.isFullAutoUnlocked(boardState)) {
        errors.push({
          rule_id: ruleId,
          severity: 'error',
          artifact: 'PROJECT_BOARD.md',
          message: `${stage} stage is not allowed to complete in full_auto mode before the full_auto unlock prerequisites are satisfied.`,
          suggestion: 'Confirm topic, style family, style profile, script/adaptation, target duration, and segment duration before relying on full_auto.'
        });
      }
      return;
    }

    const confirmationStatus = boardState.confirmations?.[confirmationKey]?.status;
    if (confirmationStatus !== 'confirmed') {
      errors.push({
        rule_id: ruleId,
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: `${stage} stage is not allowed to complete in fast mode unless confirmations.${confirmationKey}.status is confirmed.`,
        suggestion: `Confirm the ${stage} preview or switch to unlocked full_auto mode before completing ${stage}.`
      });
    }
  }

  private addIndexConsistencyWarnings(
    stage: string,
    stageArtifacts: Artifact[],
    warnings: ValidationError[],
  ) {
    const stateStatus = this.readStateStageStatus(stage);
    const boardStageIndex = this.readBoardStageIndex(stage);
    const boardFiles = boardStageIndex?.files;
    const boardFilePaths = [
      boardFiles?.primary,
      boardFiles?.index,
      boardFiles?.handoff,
      boardFiles?.quality_check,
      ...(Array.isArray(boardFiles?.outputs) ? boardFiles.outputs : []),
      ...(Array.isArray(boardFiles?.details) ? boardFiles.details : []),
    ].filter((value): value is string => typeof value === 'string' && value.length > 0);

    if (
      stateStatus === 'completed' &&
      boardStageIndex &&
      (boardStageIndex.status !== 'completed' || boardFilePaths.length === 0)
    ) {
      warnings.push({
        rule_id: 'SF-L4-001',
        severity: 'warning',
        artifact: 'PROJECT_BOARD.md',
        message: `Stage '${stage}' is completed in PROJECT_STATE.json but PROJECT_BOARD.md stage_index is not completed or has no files.`,
        suggestion: `Run complete --stage ${stage} again or sync the stage_index files from manifest and disk artifacts.`
      });
    }

    const manifestPaths = new Set(stageArtifacts.map((artifact) => artifact.path));
    const missingDiskPaths = discoverStageArtifacts(this.project, stage)
      .map((artifact) => artifact.path)
      .filter((artifactPath) => !manifestPaths.has(artifactPath));

    if (missingDiskPaths.length > 0) {
      warnings.push({
        rule_id: 'SF-L4-002',
        severity: 'warning',
        artifact: 'artifacts.manifest.yaml',
        message: `Found ${missingDiskPaths.length} stage artifact file(s) on disk that are not registered in manifest for stage '${stage}'.`,
        suggestion: `Register missing files in artifacts.manifest.yaml or run complete --stage ${stage} to auto-sync.`
      });
    }
  }

  private addDeepContractErrors(
    stage: string,
    parsedFiles: ParsedFinalArtifact[],
    errors: ValidationError[],
  ) {
    const rules =
      stage === 'storyboard'
        ? STORYBOARD_DEEP_CONTRACT_RULES
        : stage === 'video_prompts'
          ? VIDEO_PROMPT_DEEP_CONTRACT_RULES
          : [];

    if (rules.length === 0) {
      return;
    }

    for (const { art, body } of parsedFiles) {
      const normalizedBody = body.toLowerCase();

      for (const rule of rules) {
        const missingMarkers = rule.required_markers.filter(
          marker => !normalizedBody.includes(marker.toLowerCase())
        );

        if (missingMarkers.length > 0) {
          errors.push({
            rule_id: rule.rule_id,
            severity: 'error',
            artifact: art.path,
            message: `Deep contract section '${rule.label}' is incomplete in '${art.path}'. Missing marker(s): ${missingMarkers.join(', ')}.`,
            suggestion: rule.suggestion
          });
        }
      }
    }
  }

  private addStoryboardDeliveryErrors(
    stageArtifacts: Artifact[],
    errors: ValidationError[],
  ) {
    const stage = 'storyboard';
    const artifactPaths = stageArtifacts.map((artifact) => artifact.path);
    const manifestPathSet = new Set(artifactPaths);
    const discoveredPaths = new Set(discoverStageArtifacts(this.project, stage).map((artifact) => artifact.path));

    for (const required of STORYBOARD_REQUIRED_ARTIFACTS) {
      const registeredPath = artifactPaths.find((artifactPath) => required.pattern.test(artifactPath));
      const discoveredPath = [...discoveredPaths].find((artifactPath) => required.pattern.test(artifactPath));

      if (!registeredPath) {
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: 'artifacts.manifest.yaml',
          message: `Storyboard required artifact '${required.label}' is not registered in manifest.`,
          suggestion: discoveredPath
            ? `Register existing file '${discoveredPath}' in artifacts.manifest.yaml.`
            : required.suggestion
        });
        continue;
      }

      const fullPath = path.resolve(this.project.projectPath, registeredPath);
      if (!fs.existsSync(fullPath)) {
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: registeredPath,
          message: `Storyboard required artifact '${required.label}' is registered but the file does not exist.`,
          suggestion: required.suggestion
        });
      }
    }

    const promptArtifacts = stageArtifacts.filter((artifact) => (
      /^outputs\/storyboard_prompts\/.+_prompt_v[^/]+\.md$/i.test(artifact.path)
    ));

    for (const artifact of promptArtifacts) {
      const fullPath = path.resolve(this.project.projectPath, artifact.path);
      if (!fs.existsSync(fullPath)) {
        continue;
      }
      const content = fs.readFileSync(fullPath, 'utf8');
      const missingSections = STORYBOARD_PROMPT_REQUIRED_SECTIONS.filter((section) => !content.includes(section));
      if (missingSections.length > 0) {
        errors.push({
          rule_id: 'SF-SB-207',
          severity: 'error',
          artifact: artifact.path,
          message: `Storyboard prompt file is missing required whole-board section(s): ${missingSections.join(', ')}.`,
          suggestion: 'Rewrite the prompt file using references/storyboard-prompt-template.md with the three required sections.'
        });
      }
    }

    const reconciliationArtifact = stageArtifacts.find((artifact) => (
      /^details\/storyboard\/design_reconciliation_review_v[^/]+\.md$/i.test(artifact.path)
    ));
    if (reconciliationArtifact) {
      const fullPath = path.resolve(this.project.projectPath, reconciliationArtifact.path);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const missingMarkers = STORYBOARD_DESIGN_RECONCILIATION_REQUIRED_MARKERS.filter((marker) => !content.includes(marker));
        const revisionMatch = content.match(/design_revision_required\s*:\s*(true|false)/i);
        const revisionRequired = revisionMatch?.[1]?.toLowerCase();
        const missingConditionalMarkers: string[] = [];
        if (!revisionRequired) {
          missingConditionalMarkers.push('design_revision_required: true | false');
        } else if (revisionRequired === 'true' && !content.includes('recommended_design_updates')) {
          missingConditionalMarkers.push('recommended_design_updates');
        } else if (revisionRequired === 'false' && !content.includes('no_design_change_reason')) {
          missingConditionalMarkers.push('no_design_change_reason');
        }
        if (missingMarkers.length > 0 || missingConditionalMarkers.length > 0) {
          errors.push({
            rule_id: 'SF-SB-214',
            severity: 'error',
            artifact: reconciliationArtifact.path,
            message: `Storyboard design reconciliation review is incomplete. Missing marker(s): ${[
              ...missingMarkers,
              ...missingConditionalMarkers
            ].join(', ')}.`,
            suggestion: 'Add a design reconciliation review that explains whether final storyboard requires design revisions.'
          });
        }
        if (revisionRequired === 'true' && missingConditionalMarkers.length === 0) {
          errors.push({
            rule_id: 'SF-SB-215',
            severity: 'error',
            artifact: reconciliationArtifact.path,
            message: 'Storyboard design reconciliation requires design revisions before this stage can complete.',
            suggestion: 'Return to the design stage, apply the recommended_design_updates, then rerun storyboard validation.'
          });
        }
      }
    }

    const boardState = this.readProjectBoardState();
    const boardStageIndex = this.readBoardStageIndex(stage);
    if (!boardState || !boardStageIndex) {
      return;
    }

    this.addConfirmationGateError(stage, boardState, 'storyboard_plan_confirmed', 'SF-SB-208', errors);

    const boardFiles = boardStageIndex.files ?? {};
    const boardDetails = Array.isArray(boardFiles.details) ? boardFiles.details : [];
    const boardOutputs = Array.isArray(boardFiles.outputs) ? boardFiles.outputs : [];
    const boardQualityCheck = typeof boardFiles.quality_check === 'string' ? boardFiles.quality_check : '';

    const missingBoardDetails = STORYBOARD_REQUIRED_ARTIFACTS
      .filter((required) => required.pattern.source.startsWith('^details'))
      .filter((required) => !boardDetails.some((detailPath: string) => required.pattern.test(detailPath)));

    if (missingBoardDetails.length > 0) {
      errors.push({
        rule_id: 'SF-SB-209',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: `PROJECT_BOARD.md stage_index.storyboard.files.details is missing required detail entries: ${missingBoardDetails.map((item) => item.label).join(', ')}.`,
        suggestion: 'Sync storyboard details into PROJECT_BOARD.md stage_index.storyboard.files.details before completing the stage.'
      });
    }

    const missingBoardOutputs = STORYBOARD_REQUIRED_ARTIFACTS
      .filter((required) => required.pattern.source.startsWith('^outputs'))
      .filter((required) => !boardOutputs.some((outputPath: string) => required.pattern.test(outputPath)));

    if (missingBoardOutputs.length > 0) {
      errors.push({
        rule_id: 'SF-SB-210',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: `PROJECT_BOARD.md stage_index.storyboard.files.outputs is missing required output entries: ${missingBoardOutputs.map((item) => item.label).join(', ')}.`,
        suggestion: 'Sync storyboard prompt outputs into PROJECT_BOARD.md stage_index.storyboard.files.outputs before completing the stage.'
      });
    }

    if (!/^details\/storyboard\/storyboard_quality_check_v[^/]+\.md$/i.test(boardQualityCheck)) {
      errors.push({
        rule_id: 'SF-SB-211',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: 'PROJECT_BOARD.md stage_index.storyboard.files.quality_check must point to details/storyboard/storyboard_quality_check_v*.md.',
        suggestion: 'Set stage_index.storyboard.files.quality_check to the registered storyboard quality check file.'
      });
    }

    for (const requiredPath of [...boardDetails, ...boardOutputs, boardQualityCheck].filter(Boolean)) {
      if (!manifestPathSet.has(requiredPath)) {
        errors.push({
          rule_id: 'SF-SB-212',
          severity: 'error',
          artifact: 'PROJECT_BOARD.md',
          message: `PROJECT_BOARD.md references storyboard artifact '${requiredPath}' that is not registered in manifest.`,
          suggestion: `Register '${requiredPath}' in artifacts.manifest.yaml or remove the stale board reference.`
        });
      }
    }
  }

  private addDesignDeliveryErrors(
    stageArtifacts: Artifact[],
    parsedFiles: ParsedFinalArtifact[],
    errors: ValidationError[],
  ) {
    const stage = 'design';
    const artifactPaths = stageArtifacts.map((artifact) => artifact.path);
    const manifestPathSet = new Set(artifactPaths);
    const discoveredPaths = new Set(discoverStageArtifacts(this.project, stage).map((artifact) => artifact.path));

    const primaryBody = parsedFiles.find((file) => file.art.path === 'outputs/design.md')?.body ?? '';
    const missingPrimaryMarkers = DESIGN_PRIMARY_REQUIRED_MARKERS.filter((marker) => !primaryBody.includes(marker));
    if (missingPrimaryMarkers.length > 0) {
      errors.push({
        rule_id: 'SF-DG-101',
        severity: 'error',
        artifact: 'outputs/design.md',
        message: `Design primary output is missing required marker(s): ${missingPrimaryMarkers.join(', ')}.`,
        suggestion: 'Align outputs/design.md with scene-design-builder/references/output-contract.md.'
      });
    }

    for (const required of DESIGN_REQUIRED_ARTIFACTS) {
      const registeredPath = artifactPaths.find((artifactPath) => required.pattern.test(artifactPath));
      const discoveredPath = [...discoveredPaths].find((artifactPath) => required.pattern.test(artifactPath));

      if (!registeredPath) {
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: 'artifacts.manifest.yaml',
          message: `Design required artifact '${required.label}' is not registered in manifest.`,
          suggestion: discoveredPath
            ? `Register existing file '${discoveredPath}' in artifacts.manifest.yaml.`
            : required.suggestion
        });
        continue;
      }

      const fullPath = path.resolve(this.project.projectPath, registeredPath);
      if (!fs.existsSync(fullPath)) {
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: registeredPath,
          message: `Design required artifact '${required.label}' is registered but the file does not exist.`,
          suggestion: required.suggestion
        });
      }
    }

    const characterPrompt = stageArtifacts.find((artifact) => (
      /^outputs\/design_prompts\/角色说明书图片提示词_v[^/]+\.md$/i.test(artifact.path)
    ));
    if (characterPrompt) {
      const fullPath = path.resolve(this.project.projectPath, characterPrompt.path);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const missingMarkers = DESIGN_CHARACTER_PROMPT_REQUIRED_MARKERS.filter((marker) => !content.includes(marker));
        if (missingMarkers.length > 0) {
          errors.push({
            rule_id: 'SF-DG-207',
            severity: 'error',
            artifact: characterPrompt.path,
            message: `Character bible sheet prompt is missing required section marker(s): ${missingMarkers.join(', ')}.`,
            suggestion: 'Rewrite the prompt as a Chinese-led character bible sheet using references/design-prompt-template.md.'
          });
        }

        const chineseChars = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
        const asciiLetters = (content.match(/[A-Za-z]/g) ?? []).length;
        if (chineseChars < 80 || chineseChars * 1.2 < asciiLetters) {
          errors.push({
            rule_id: 'SF-DG-208',
            severity: 'error',
            artifact: characterPrompt.path,
            message: 'Character bible sheet prompt must be Chinese-led; current text appears English-dominant or too light in Chinese.',
            suggestion: 'Use Chinese for structure, character description, constraints, and copy-ready prompt body; keep English only as auxiliary anchor terms.'
          });
        }

        const lowerContent = content.toLowerCase();
        const forbiddenMarkers = DESIGN_FORBIDDEN_POSTER_MARKERS.filter((marker) => lowerContent.includes(marker));
        if (forbiddenMarkers.length > 0) {
          errors.push({
            rule_id: 'SF-DG-209',
            severity: 'error',
            artifact: characterPrompt.path,
            message: `Character bible sheet prompt contains poster/portrait-oriented marker(s): ${forbiddenMarkers.join(', ')}.`,
            suggestion: 'The primary design prompt must target a character bible sheet / character design board, not a single portrait or poster.'
          });
        }
      }
    }

    const boardState = this.readProjectBoardState();
    const boardStageIndex = this.readBoardStageIndex(stage);
    if (!boardState || !boardStageIndex) {
      return;
    }

    this.addConfirmationGateError(stage, boardState, 'design_confirmed', 'SF-DG-210', errors);

    const boardFiles = boardStageIndex.files ?? {};
    const boardDetails = Array.isArray(boardFiles.details) ? boardFiles.details : [];
    const boardOutputs = Array.isArray(boardFiles.outputs) ? boardFiles.outputs : [];

    const missingBoardOutputs = DESIGN_REQUIRED_ARTIFACTS
      .filter((required) => required.pattern.source.startsWith('^outputs'))
      .filter((required) => !boardOutputs.some((outputPath: string) => required.pattern.test(outputPath)));
    if (missingBoardOutputs.length > 0) {
      errors.push({
        rule_id: 'SF-DG-212',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: `PROJECT_BOARD.md stage_index.design.files.outputs is missing required output entries: ${missingBoardOutputs.map((item) => item.label).join(', ')}.`,
        suggestion: 'Sync design prompt outputs into PROJECT_BOARD.md stage_index.design.files.outputs before completing the stage.'
      });
    }

    for (const requiredPath of [...boardDetails, ...boardOutputs, boardFiles.primary].filter(Boolean)) {
      if (!manifestPathSet.has(requiredPath)) {
        errors.push({
          rule_id: 'SF-DG-213',
          severity: 'error',
          artifact: 'PROJECT_BOARD.md',
          message: `PROJECT_BOARD.md references design artifact '${requiredPath}' that is not registered in manifest.`,
          suggestion: `Register '${requiredPath}' in artifacts.manifest.yaml or remove the stale board reference.`
        });
      }
    }
  }

  private addVideoPromptsDeliveryErrors(
    stageArtifacts: Artifact[],
    errors: ValidationError[],
  ) {
    const stage = 'video_prompts';
    const artifactPaths = stageArtifacts.map((artifact) => artifact.path);
    const manifestPathSet = new Set(artifactPaths);
    const discoveredPaths = new Set(discoverStageArtifacts(this.project, stage).map((artifact) => artifact.path));

    for (const required of VIDEO_PROMPTS_REQUIRED_ARTIFACTS) {
      const registeredPath = artifactPaths.find((artifactPath) => required.pattern.test(artifactPath));
      const discoveredPath = [...discoveredPaths].find((artifactPath) => required.pattern.test(artifactPath));

      if (!registeredPath) {
        if (required.optional) {
          continue;
        }
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: 'artifacts.manifest.yaml',
          message: `Video prompts required artifact '${required.label}' is not registered in manifest.`,
          suggestion: discoveredPath
            ? `Register existing file '${discoveredPath}' in artifacts.manifest.yaml.`
            : required.suggestion
        });
        continue;
      }

      const fullPath = path.resolve(this.project.projectPath, registeredPath);
      if (!fs.existsSync(fullPath)) {
        errors.push({
          rule_id: required.rule_id,
          severity: 'error',
          artifact: registeredPath,
          message: `Video prompts required artifact '${required.label}' is registered but the file does not exist.`,
          suggestion: required.suggestion
        });
      }
    }

    const packArtifacts = stageArtifacts.filter((artifact) => (
      /^outputs\/video_prompts\/视频提示词_第\d+包_(中文|英文)_v[^/]+\.md$/i.test(artifact.path)
    ));

    for (const artifact of packArtifacts) {
      const fullPath = path.resolve(this.project.projectPath, artifact.path);
      if (!fs.existsSync(fullPath)) {
        continue;
      }
      const content = fs.readFileSync(fullPath, 'utf8');
      const missingSections = VIDEO_PROMPTS_PACK_REQUIRED_SECTIONS.filter((section) => !content.includes(section));
      const missingSoundSections = VIDEO_PROMPTS_SOUND_REQUIRED_SECTIONS.filter((section) => !content.includes(section));
      const missingCopyBlockMarkers = VIDEO_PROMPTS_COPY_BLOCK_REQUIRED_MARKERS.filter((marker) => !content.includes(marker));
      const missingDirectorPromptMarkers = VIDEO_PROMPTS_DIRECTOR_PROMPT_REQUIRED_MARKERS.filter((marker) => !content.includes(marker));
      const hasShotTimecode = /[A-Z]\d{2}\s*\[\d{2}:\d{2}-\d{2}:\d{2}\]/.test(content);

      if (missingSections.length > 0) {
        errors.push({
          rule_id: 'SF-VP-204',
          severity: 'error',
          artifact: artifact.path,
          message: `Video prompt pack is missing required section(s): ${missingSections.join(', ')}.`,
          suggestion: 'Rewrite the pack using references/video-prompt-template.md with the required pack-aligned director prompt sections.'
        });
      }

      if (missingSoundSections.length > 0) {
        errors.push({
          rule_id: 'SF-VP-205',
          severity: 'error',
          artifact: artifact.path,
          message: `Video prompt pack segment_sound_execution is missing sound layer(s): ${missingSoundSections.join(', ')}.`,
          suggestion: 'Expand segment_sound_execution into BGM, Foley-SFX, Ambience, and Silence layers.'
        });
      }

      if (missingCopyBlockMarkers.length > 0) {
        errors.push({
          rule_id: 'SF-VP-211',
          severity: 'error',
          artifact: artifact.path,
          message: `Video prompt copy-ready block is missing required marker(s): ${missingCopyBlockMarkers.join(', ')}.`,
          suggestion: 'Rewrite each 可直接复制使用块 with the required storyboard keyframe preamble, project-level global lock rules, natural-language technical control, and director prompt sections.'
        });
      }

      if (missingDirectorPromptMarkers.length > 0) {
        errors.push({
          rule_id: 'SF-VP-212',
          severity: 'error',
          artifact: artifact.path,
          message: `Video prompt director prompt is missing required dimension(s): ${missingDirectorPromptMarkers.join(', ')}.`,
          suggestion: 'Expand Segment X 导演长版提示词 to cover camera language, composition, performance, emotion, action arc, space/prop continuity, sound handoff, and negative boundaries.'
        });
      }

      if (!hasShotTimecode) {
        errors.push({
          rule_id: 'SF-VP-214',
          severity: 'error',
          artifact: artifact.path,
          message: 'Video prompt director prompt is missing shot-level timecodes.',
          suggestion: 'Add Segment 总时间轴 and per-shot timecodes such as C01 [00:00-00:02] in Segment X 导演长版提示词.'
        });
      }

      if (/可直接复制使用块[\s\S]*```(?:yaml|yml)/i.test(content)) {
        errors.push({
          rule_id: 'SF-VP-213',
          severity: 'error',
          artifact: artifact.path,
          message: 'Video prompt copy-ready block must not contain a YAML technical control block.',
          suggestion: 'Convert Segment X 技术控制说明 into natural-language prose before final delivery.'
        });
      }
    }

    const boardState = this.readProjectBoardState();
    const boardStageIndex = this.readBoardStageIndex(stage);
    if (!boardState || !boardStageIndex) {
      return;
    }

    this.addConfirmationGateError(stage, boardState, 'video_prompt_plan_confirmed', 'SF-VP-206', errors);

    const boardFiles = boardStageIndex.files ?? {};
    const boardDetails = Array.isArray(boardFiles.details) ? boardFiles.details : [];
    const boardOutputs = Array.isArray(boardFiles.outputs) ? boardFiles.outputs : [];
    const boardQualityCheck = typeof boardFiles.quality_check === 'string' ? boardFiles.quality_check : '';

    const missingBoardOutputs = VIDEO_PROMPTS_REQUIRED_ARTIFACTS
      .filter((required) => required.pattern.source.startsWith('^outputs'))
      .filter((required) => !required.optional)
      .filter((required) => !boardOutputs.some((outputPath: string) => required.pattern.test(outputPath)));

    if (missingBoardOutputs.length > 0) {
      errors.push({
        rule_id: 'SF-VP-207',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: `PROJECT_BOARD.md stage_index.video_prompts.files.outputs is missing required output entries: ${missingBoardOutputs.map((item) => item.label).join(', ')}.`,
        suggestion: 'Sync video prompt pack outputs into PROJECT_BOARD.md stage_index.video_prompts.files.outputs before completing the stage.'
      });
    }

    const hasReviewDetail = boardDetails.some((detailPath: string) => (
      /^details\/video_prompts\/video_prompt_review_v[^/]+\.md$/i.test(detailPath)
    ));
    if (!hasReviewDetail) {
      errors.push({
        rule_id: 'SF-VP-208',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: 'PROJECT_BOARD.md stage_index.video_prompts.files.details is missing details/video_prompts/video_prompt_review_v*.md.',
        suggestion: 'Sync the video prompt review detail file into PROJECT_BOARD.md stage_index.video_prompts.files.details.'
      });
    }

    if (!/^details\/video_prompts\/video_prompt_review_v[^/]+\.md$/i.test(boardQualityCheck)) {
      errors.push({
        rule_id: 'SF-VP-209',
        severity: 'error',
        artifact: 'PROJECT_BOARD.md',
        message: 'PROJECT_BOARD.md stage_index.video_prompts.files.quality_check must point to details/video_prompts/video_prompt_review_v*.md.',
        suggestion: 'Set stage_index.video_prompts.files.quality_check to the registered video prompt review file.'
      });
    }

    for (const requiredPath of [...boardDetails, ...boardOutputs, boardQualityCheck].filter(Boolean)) {
      if (!manifestPathSet.has(requiredPath)) {
        errors.push({
          rule_id: 'SF-VP-210',
          severity: 'error',
          artifact: 'PROJECT_BOARD.md',
          message: `PROJECT_BOARD.md references video prompt artifact '${requiredPath}' that is not registered in manifest.`,
          suggestion: `Register '${requiredPath}' in artifacts.manifest.yaml or remove the stale board reference.`
        });
      }
    }
  }

  private addLightStageStructureErrors(
    stage: string,
    stageArtifacts: Artifact[],
    errors: ValidationError[],
  ) {
    const contract = LIGHT_STAGE_CONTRACTS[stage];
    if (!contract) return;

    const artifact = stageArtifacts.find((item) => contract.artifactPattern.test(item.path));
    if (!artifact) {
      errors.push({
        rule_id: contract.ruleId,
        severity: 'error',
        artifact: 'artifacts.manifest.yaml',
        message: `${contract.label} artifact is missing for stage '${stage}'.`,
        suggestion: contract.suggestion
      });
      return;
    }

    const fullPath = path.resolve(this.project.projectPath, artifact.path);
    if (!fs.existsSync(fullPath)) {
      errors.push({
        rule_id: contract.ruleId,
        severity: 'error',
        artifact: artifact.path,
        message: `${contract.label} artifact is registered but the file does not exist.`,
        suggestion: contract.suggestion
      });
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const missingMarkers = contract.requiredMarkers.filter((marker) => !content.includes(marker));
    if (missingMarkers.length > 0) {
      errors.push({
        rule_id: contract.ruleId,
        severity: 'error',
        artifact: artifact.path,
        message: `${contract.label} artifact is missing required marker(s): ${missingMarkers.join(', ')}.`,
        suggestion: contract.suggestion
      });
    }

    if (stage === 'story') {
      const beatCount = (content.match(/\bbeat_id\s*:/gi) ?? []).length +
        (content.match(/\bid\s*:\s*beat[_-]?\d+\b/gi) ?? []).length;
      if (beatCount < 4 || beatCount > 8) {
        errors.push({
          rule_id: 'SF-ST-102',
          severity: 'error',
          artifact: artifact.path,
          message: `story development must contain 4-8 story beats; found ${beatCount}.`,
          suggestion: 'Add 4-8 story_beats entries with beat_id fields or id values such as beat_1.'
        });
      }
    }
  }

  /**
   * Perform all validation levels for a stage
   */
  public validate(stage: string): ValidationReport {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];
    const rule = this.getStageRule(stage);
    const manifest = this.project.readManifest();
    
    // Filter artifacts for current stage
    const stageArtifacts = manifest.artifacts.filter(art => art.stage === stage);
    const finalArtifacts = stageArtifacts.filter(art => art.kind === 'final');
    const patternRegex = rule.expected_file_pattern ? new RegExp(rule.expected_file_pattern) : null;
    const primaryFinalArtifacts = finalArtifacts.filter(art => (
      art.role === 'primary_delivery' ||
      art.role === `${stage}_output` ||
      (patternRegex ? patternRegex.test(art.path) : false)
    ));

    // ==========================================
    // Level 1: Lint (Paths, existence, registry)
    // ==========================================
    
    if (primaryFinalArtifacts.length === 0) {
      errors.push({
        rule_id: 'SF-L1-001',
        severity: 'error',
        artifact: 'artifacts.manifest.yaml',
        message: `No final artifacts registered in manifest for stage '${stage}'.`,
        suggestion: `Ensure you register a final artifact with 'kind: final' in artifacts.manifest.yaml.`
      });
    }

    for (const art of stageArtifacts) {
      const fullPath = path.resolve(this.project.projectPath, art.path);
      
      // 1. Check physical existence
      if (!fs.existsSync(fullPath)) {
        errors.push({
          rule_id: 'SF-L1-002',
          severity: 'error',
          artifact: art.path,
          message: `Artifact file not found at path: '${art.path}' (id: '${art.id}').`,
          suggestion: `Verify that the file has been correctly written to '${art.path}'.`
        });
        continue;
      }

      // 2. Validate expected file name/path pattern (only for final artifacts)
      if (
        art.kind === 'final' &&
        (art.role === 'primary_delivery' || art.role === `${stage}_output`) &&
        patternRegex &&
        !patternRegex.test(art.path)
      ) {
        errors.push({
          rule_id: 'SF-L1-003',
          severity: 'error',
          artifact: art.path,
          message: `Artifact path '${art.path}' does not match the stage rule pattern '${rule.expected_file_pattern}'.`,
          suggestion: `Rename the artifact file and register it to match '${rule.expected_file_pattern}'.`
        });
      }
    }

    // Skip Level 2 and Level 3 checks if Level 1 already failed critical file existence
    const criticalFailure = errors.some(e => e.rule_id === 'SF-L1-001' || e.rule_id === 'SF-L1-002');
    if (criticalFailure) {
      return {
        project: this.project.projectSlug,
        stage,
        status: 'failed',
        validated_at: new Date().toISOString(),
        errors,
        warnings
      };
    }

    // ==========================================
    // Level 2: Schema (Frontmatter & Markdown headings)
    // ==========================================
    const parsedFiles: ParsedFinalArtifact[] = [];

    for (const art of primaryFinalArtifacts) {
      const fullPath = path.resolve(this.project.projectPath, art.path);
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split(/\r?\n/);
      
      let parsed;
      try {
        parsed = parseMarkdownFrontmatter(content);
      } catch (err) {
        errors.push({
          rule_id: 'SF-L2-001',
          severity: 'error',
          artifact: art.path,
          message: `Failed to parse frontmatter for '${art.path}': ${(err as Error).message}`,
          suggestion: `Ensure the frontmatter is valid YAML wrapped in '---'.`
        });
        continue;
      }

      parsedFiles.push({ art, frontmatter: parsed.frontmatter, body: parsed.body, lines });

      // 1. Zod Schema Verification
      const schema = FrontmatterSchemas[stage];
      if (schema) {
        const result = schema.safeParse(parsed.frontmatter);
        if (!result.success) {
          for (const err of result.error.errors) {
            errors.push({
              rule_id: 'SF-L2-002',
              severity: 'error',
              artifact: art.path,
              message: `Frontmatter schema validation failed for field '${err.path.join('.')}': ${err.message}`,
              suggestion: `Correct the field type/existence according to the ${stage} frontmatter schema.`
            });
          }
        }
      }

      // 2. Markdown Headings (required headers)
      for (const header of rule.required_headers) {
        // Look for headings: e.g. "## storyboard_prompt_pack" or "## 1. storyboard_prompt_pack"
        const headerRegex = new RegExp(`^#+\\s+(?:\\d+\\.\\s+)?${header}\\s*$`, 'i');
        const hasHeader = lines.some(line => headerRegex.test(line));
        
        if (!hasHeader) {
          errors.push({
            rule_id: 'SF-L2-003',
            severity: 'error',
            artifact: art.path,
            message: `Required markdown heading '## ${header}' is missing in '${art.path}'.`,
            suggestion: `Add the heading '## ${header}' in the Markdown structure.`
          });
        }
      }
    }

    // ==========================================
    // Level 3: Semantic Guard (Forbidden terms, alignment, & ID continuity)
    // ==========================================
    const forbiddenTerms = this.getForbiddenTerms();

    for (const { art, frontmatter, body, lines } of parsedFiles) {
      // 1. Forbidden terms check
      for (const term of forbiddenTerms) {
        if (!term) continue;
        const termRegex = new RegExp(term, 'gi'); // Case-insensitive
        
        // Scan line-by-line to give exact line numbers
        lines.forEach((line, index) => {
          if (termRegex.test(line)) {
            errors.push({
              rule_id: 'SF-L3-001',
              severity: 'error',
              artifact: art.path,
              message: `Forbidden term '${term}' found in '${art.path}' at line ${index + 1}.`,
              line: index + 1,
              suggestion: `Remove or genericize references to '${term}' in the artifact.`
            });
          }
        });
      }
    }

    // 2. Cross-stage alignment: storyboard and video prompt pack alignment (SF-VP-001)
    if (stage === 'video_prompts') {
      const storyboardPackIds = new Set(
        manifest.artifacts
          .filter(art => art.stage === 'storyboard' && art.kind === 'final')
          .map(art => art.pack_id)
          .filter((id): id is string => typeof id === 'string')
      );

      for (const art of primaryFinalArtifacts) {
        if (art.pack_id && !storyboardPackIds.has(art.pack_id)) {
          errors.push({
            rule_id: 'SF-VP-001',
            severity: 'error',
            artifact: art.path,
            message: `Video prompt pack_id '${art.pack_id}' does not align with any storyboard pack.`,
            suggestion: `Ensure there is a corresponding storyboard final artifact registered with pack_id '${art.pack_id}'.`
          });
        }
      }
    }

    // 3. Continuous Pack ID and Segment ID Check
    // A. Pack ID check
    const packIds = primaryFinalArtifacts
      .map(art => art.pack_id)
      .filter((id): id is string => typeof id === 'string')
      .map(id => parseInt(id, 10))
      .filter(num => !isNaN(num))
      .filter((num, index, nums) => nums.indexOf(num) === index)
      .sort((a, b) => a - b);

    if (packIds.length > 0) {
      // Must start at 1 and be contiguous
      if (packIds[0] !== 1) {
        errors.push({
          rule_id: 'SF-L3-002',
          severity: 'error',
          artifact: 'artifacts.manifest.yaml',
          message: `Pack IDs must start with 001/1. Found starting pack ID: ${packIds[0]}.`,
          suggestion: `Rename your packs so that the first pack_id starts at 1 (or 001).`
        });
      }
      for (let i = 0; i < packIds.length - 1; i++) {
        if (packIds[i + 1] - packIds[i] !== 1) {
          errors.push({
            rule_id: 'SF-L3-002',
            severity: 'error',
            artifact: 'artifacts.manifest.yaml',
            message: `Pack IDs are not contiguous: found jump from ${packIds[i]} to ${packIds[i + 1]}.`,
            suggestion: `Fill in the missing pack between ${packIds[i]} and ${packIds[i + 1]}.`
          });
        }
      }
    }

    // B. Segment ID check (across all files for current stage)
    const allSegmentIds: number[] = [];
    const segmentRegex = /#+\s+(?:segment|seg)-(\d+)/gi;

    for (const { body } of parsedFiles) {
      let match;
      const regex = new RegExp(segmentRegex);
      while ((match = regex.exec(body)) !== null) {
        const idNum = parseInt(match[1], 10);
        if (!isNaN(idNum)) {
          allSegmentIds.push(idNum);
        }
      }
    }

    if (allSegmentIds.length > 0) {
      const sortedSegmentIds = [...new Set(allSegmentIds)].sort((a, b) => a - b);
      if (sortedSegmentIds[0] !== 1) {
        errors.push({
          rule_id: 'SF-L3-003',
          severity: 'error',
          artifact: primaryFinalArtifacts[0]?.path || 'unknown',
          message: `Segment IDs must start with 01/1. Found starting segment ID: ${sortedSegmentIds[0]}.`,
          suggestion: `Ensure the first segment is marked as segment-01.`
        });
      }
      for (let i = 0; i < sortedSegmentIds.length - 1; i++) {
        if (sortedSegmentIds[i + 1] - sortedSegmentIds[i] !== 1) {
          errors.push({
            rule_id: 'SF-L3-003',
            severity: 'error',
            artifact: primaryFinalArtifacts[0]?.path || 'unknown',
            message: `Segment IDs are not contiguous: found jump from ${sortedSegmentIds[i]} to ${sortedSegmentIds[i + 1]}.`,
            suggestion: `Verify the segment naming order; a segment seems to be missing between segment-${sortedSegmentIds[i]} and segment-${sortedSegmentIds[i + 1]}.`
          });
        }
      }
    }

    const errorCountBeforeDeepContract = errors.length;
    this.addDeepContractErrors(stage, parsedFiles, errors);
    if (stage === 'storyboard' && errors.length === errorCountBeforeDeepContract) {
      this.addStoryboardDeliveryErrors(stageArtifacts, errors);
    }
    if (stage === 'video_prompts' && errors.length === errorCountBeforeDeepContract) {
      this.addVideoPromptsDeliveryErrors(stageArtifacts, errors);
    }
    if (stage === 'design' && errors.length === errorCountBeforeDeepContract) {
      this.addDesignDeliveryErrors(stageArtifacts, parsedFiles, errors);
    }
    if ((stage === 'reference' || stage === 'story' || stage === 'assets') && errors.length === errorCountBeforeDeepContract) {
      this.addLightStageStructureErrors(stage, stageArtifacts, errors);
    }
    this.addIndexConsistencyWarnings(stage, stageArtifacts, warnings);

    return {
      project: this.project.projectSlug,
      stage,
      status: errors.length === 0 ? 'passed' : 'failed',
      validated_at: new Date().toISOString(),
      errors,
      warnings
    };
  }
}
