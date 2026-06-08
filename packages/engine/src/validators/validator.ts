import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Project, parseMarkdownFrontmatter, Artifact } from '../project.js';
import { ValidationError, ValidationReport } from './types.js';
import { FrontmatterSchemas } from './schemas.js';

export interface StageRule {
  expected_file_pattern: string;
  required_headers: string[];
}

export const DEFAULT_STAGE_RULES: Record<string, StageRule> = {
  topic_gate: {
    expected_file_pattern: '^outputs/topic\\.md$',
    required_headers: ['topic_ideas']
  },
  script: {
    expected_file_pattern: '^outputs/script\\.md$',
    required_headers: ['story_beats']
  },
  performance: {
    expected_file_pattern: '^outputs/performance_pack_\\d+(_\\w+)?\\.md$',
    required_headers: ['performance_beats']
  },
  audio: {
    expected_file_pattern: '^outputs/audio_pack_\\d+(_\\w+)?\\.md$',
    required_headers: ['audio_execution_plan']
  },
  storyboard: {
    expected_file_pattern: '^outputs/storyboard_pack_\\d+(_\\w+)?\\.md$',
    required_headers: ['storyboard_prompt_pack']
  },
  video_prompts: {
    expected_file_pattern: '^outputs/video_prompts_pack_\\d+(_\\w+)?\\.md$',
    required_headers: ['pack_audio_execution_plan', 'segment_sound_execution']
  },
  publish_review: {
    expected_file_pattern: '^outputs/publish_review\\.md$',
    required_headers: ['publish_checklist']
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

    // ==========================================
    // Level 1: Lint (Paths, existence, registry)
    // ==========================================
    
    if (finalArtifacts.length === 0) {
      errors.push({
        rule_id: 'SF-L1-001',
        severity: 'error',
        artifact: 'artifacts.manifest.yaml',
        message: `No final artifacts registered in manifest for stage '${stage}'.`,
        suggestion: `Ensure you register a final artifact with 'kind: final' in artifacts.manifest.yaml.`
      });
    }

    const patternRegex = rule.expected_file_pattern ? new RegExp(rule.expected_file_pattern) : null;

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
      if (art.kind === 'final' && patternRegex && !patternRegex.test(art.path)) {
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
    const parsedFiles: { art: Artifact; frontmatter: Record<string, any>; body: string; lines: string[] }[] = [];

    for (const art of finalArtifacts) {
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

      for (const art of finalArtifacts) {
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
    const packIds = finalArtifacts
      .map(art => art.pack_id)
      .filter((id): id is string => typeof id === 'string')
      .map(id => parseInt(id, 10))
      .filter(num => !isNaN(num))
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
          artifact: finalArtifacts[0]?.path || 'unknown',
          message: `Segment IDs must start with 01/1. Found starting segment ID: ${sortedSegmentIds[0]}.`,
          suggestion: `Ensure the first segment is marked as segment-01.`
        });
      }
      for (let i = 0; i < sortedSegmentIds.length - 1; i++) {
        if (sortedSegmentIds[i + 1] - sortedSegmentIds[i] !== 1) {
          errors.push({
            rule_id: 'SF-L3-003',
            severity: 'error',
            artifact: finalArtifacts[0]?.path || 'unknown',
            message: `Segment IDs are not contiguous: found jump from ${sortedSegmentIds[i]} to ${sortedSegmentIds[i + 1]}.`,
            suggestion: `Verify the segment naming order; a segment seems to be missing between segment-${sortedSegmentIds[i]} and segment-${sortedSegmentIds[i + 1]}.`
          });
        }
      }
    }

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
