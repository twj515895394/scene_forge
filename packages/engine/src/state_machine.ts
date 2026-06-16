import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { Project } from './project.js';

// Stages definition
export const DEFAULT_STAGES = [
  'topic_gate',
  'reference',
  'story',
  'assets',
  'design',
  'script',
  'performance',
  'storyboard',
  'audio',
  'video_prompts',
  'publish_review'
] as const;

const DEFAULT_STAGE_SET = new Set<string>(DEFAULT_STAGES);

export const STAGE_DEPENDENCIES: Record<string, string[]> = {
  topic_gate: [],
  reference: ['topic_gate'],
  story: ['reference'],
  assets: ['story'],
  design: ['assets'],
  script: ['design'],
  performance: ['script'],
  storyboard: ['performance'],
  audio: ['storyboard'],
  video_prompts: ['audio'],
  publish_review: ['video_prompts']
};

// Zod Schemas
export const StageStatusSchema = z.enum([
  'ready',
  'in_progress',
  'review_failed',
  'validated',
  'completed'
]);

export type StageStatus = z.infer<typeof StageStatusSchema>;

export const StageHistoryItemSchema = z.object({
  status: StageStatusSchema,
  timestamp: z.string(),
  message: z.string().optional()
});

export const StageStateSchema = z.object({
  stage: z.string(),
  status: StageStatusSchema,
  updated_at: z.string(),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
  handoff_path: z.string().optional(),
  validation_result_path: z.string().optional(),
  history: z.array(StageHistoryItemSchema)
});

export type StageState = z.infer<typeof StageStateSchema>;

export const ProjectStateSchema = z.object({
  project: z.string(),
  current_stage: z.string().optional(),
  stages: z.record(StageStateSchema)
});

export type ProjectState = z.infer<typeof ProjectStateSchema>;

export class StateMachine {
  private project: Project;
  private stateFilePath: string;

  constructor(project: Project) {
    this.project = project;
    this.stateFilePath = path.join(this.project.projectPath, 'PROJECT_STATE.json');
  }

  // Read the current project state, initialize if it doesn't exist
  public readState(): ProjectState {
    if (!fs.existsSync(this.stateFilePath)) {
      return this.initializeState();
    }
    try {
      const content = fs.readFileSync(this.stateFilePath, 'utf8');
      const parsed = JSON.parse(content);
      const { state, changed } = this.normalizeState(parsed);
      if (changed) {
        this.writeState(state);
      }
      return state;
    } catch (err) {
      throw new Error(`Failed to parse PROJECT_STATE.json: ${(err as Error).message}`);
    }
  }

  // Write state to file
  public writeState(state: ProjectState): void {
    const parsed = ProjectStateSchema.parse(state);
    fs.writeFileSync(this.stateFilePath, JSON.stringify(parsed, null, 2), 'utf8');
  }

  // Initialize new state
  private initializeState(): ProjectState {
    const stages: Record<string, StageState> = {};
    for (const stage of DEFAULT_STAGES) {
      stages[stage] = this.createInitialStageState(stage);
    }
    const state: ProjectState = {
      project: this.project.projectSlug,
      stages
    };
    this.writeState(state);
    return state;
  }

  private createInitialStageState(stage: string): StageState {
    const now = new Date().toISOString();
    return {
      stage,
      status: 'ready',
      updated_at: now,
      history: [{
        status: 'ready',
        timestamp: now,
        message: 'Initialized stage status'
      }]
    };
  }

  private normalizeState(raw: unknown): { state: ProjectState; changed: boolean } {
    const rawState = (raw && typeof raw === 'object') ? raw as Record<string, any> : {};
    const rawStages = (rawState.stages && typeof rawState.stages === 'object')
      ? rawState.stages as Record<string, any>
      : {};
    const stages: Record<string, StageState> = {};
    let changed = false;

    for (const stage of DEFAULT_STAGES) {
      const fallback = this.createInitialStageState(stage);
      const candidate = rawStages[stage];

      if (!candidate || typeof candidate !== 'object') {
        stages[stage] = fallback;
        changed = true;
        continue;
      }

      const normalizedCandidate = {
        stage,
        status: candidate.status ?? fallback.status,
        updated_at: candidate.updated_at ?? fallback.updated_at,
        started_at: candidate.started_at,
        completed_at: candidate.completed_at,
        handoff_path: candidate.handoff_path,
        validation_result_path: candidate.validation_result_path,
        history: Array.isArray(candidate.history) && candidate.history.length > 0
          ? candidate.history
          : fallback.history
      };

      const parsed = StageStateSchema.safeParse(normalizedCandidate);
      if (!parsed.success) {
        stages[stage] = fallback;
        changed = true;
        continue;
      }

      stages[stage] = parsed.data;

      if (
        candidate.stage !== stage ||
        candidate.status !== parsed.data.status ||
        candidate.updated_at !== parsed.data.updated_at ||
        !Array.isArray(candidate.history) ||
        candidate.history.length === 0
      ) {
        changed = true;
      }
    }

    for (const [stage, candidate] of Object.entries(rawStages)) {
      if (DEFAULT_STAGE_SET.has(stage)) {
        continue;
      }
      const parsed = StageStateSchema.safeParse(candidate);
      if (parsed.success) {
        stages[stage] = parsed.data;
      } else {
        changed = true;
      }
    }

    const currentStage = typeof rawState.current_stage === 'string' && stages[rawState.current_stage]
      ? rawState.current_stage
      : undefined;
    if (rawState.current_stage !== currentStage) {
      changed = true;
    }

    const project = typeof rawState.project === 'string' && rawState.project
      ? rawState.project
      : this.project.projectSlug;
    if (rawState.project !== project) {
      changed = true;
    }

    return {
      state: {
        project,
        current_stage: currentStage,
        stages
      },
      changed
    };
  }

  // Verify dependencies for starting a stage
  public checkDependencies(stage: string): boolean {
    const deps = STAGE_DEPENDENCIES[stage] || [];
    const state = this.readState();
    for (const dep of deps) {
      const depState = state.stages[dep];
      if (!depState || depState.status !== 'completed') {
        return false;
      }
    }
    return true;
  }

  // Transition stage to in_progress
  public startStage(stage: string): StageState {
    const state = this.readState();
    const stageState = state.stages[stage];
    if (!stageState) {
      throw new Error(`Unknown stage: ${stage}`);
    }

    // Check upstream dependencies
    if (!this.checkDependencies(stage)) {
      const deps = (STAGE_DEPENDENCIES[stage] || []).filter((dep) => state.stages[dep]?.status !== 'completed');
      throw new Error(`Cannot start stage '${stage}': required upstream stages [${deps.join(', ')}] are not completed.`);
    }

    const now = new Date().toISOString();
    stageState.status = 'in_progress';
    stageState.started_at = now;
    stageState.updated_at = now;
    stageState.history.push({
      status: 'in_progress',
      timestamp: now,
      message: `Started stage ${stage}`
    });

    state.current_stage = stage;
    this.writeState(state);
    return stageState;
  }

  // Transition stage to complete with validator checks
  public completeStage(stage: string, validatorSuccess: boolean = true, errors: string[] = []): StageState {
    const state = this.readState();
    const stageState = state.stages[stage];
    if (!stageState) {
      throw new Error(`Unknown stage: ${stage}`);
    }

    if (stageState.status !== 'in_progress' && stageState.status !== 'review_failed' && stageState.status !== 'validated') {
      throw new Error(`Cannot complete stage '${stage}': stage is not in progress.`);
    }

    const now = new Date().toISOString();

    if (!validatorSuccess) {
      // Transition to review_failed
      stageState.status = 'review_failed';
      stageState.updated_at = now;

      // Output validation result json
      const validationPath = path.join(this.project.projectPath, 'runtime', `validation_result.${stage}.json`);
      fs.mkdirSync(path.dirname(validationPath), { recursive: true });
      fs.writeFileSync(validationPath, JSON.stringify({
        project: this.project.projectSlug,
        stage,
        status: 'failed',
        validated_at: now,
        errors
      }, null, 2), 'utf8');

      stageState.validation_result_path = path.relative(this.project.projectPath, validationPath);
      stageState.history.push({
        status: 'review_failed',
        timestamp: now,
        message: `Validation failed: ${errors.join(', ')}`
      });

      this.writeState(state);
      throw new Error(`Validation failed for stage '${stage}': ${errors.join(', ')}`);
    }

    // Success transition path:
    // 1. Move to validated
    stageState.status = 'validated';
    stageState.updated_at = now;
    stageState.history.push({
      status: 'validated',
      timestamp: now,
      message: 'Validation passed'
    });

    // 2. Generate Handoff file
    const handoffPath = path.join(this.project.projectPath, 'handoffs', `${stage}.handoff.json`);
    fs.mkdirSync(path.dirname(handoffPath), { recursive: true });
    const handoffData = {
      project: this.project.projectSlug,
      stage,
      generated_at: now,
      summary: `Handoff from stage ${stage}`,
      metadata: {
        completed_run: `run_${stage}_${now.replace(/[-:T.Z]/g, '')}`
      }
    };
    fs.writeFileSync(handoffPath, JSON.stringify(handoffData, null, 2), 'utf8');
    stageState.handoff_path = path.relative(this.project.projectPath, handoffPath);

    // 3. Move to completed
    stageState.status = 'completed';
    stageState.completed_at = now;
    stageState.history.push({
      status: 'completed',
      timestamp: now,
      message: `Completed stage ${stage}`
    });

    // Reset current stage if it was active
    if (state.current_stage === stage) {
      state.current_stage = undefined;
    }

    this.writeState(state);
    return stageState;
  }

  // Record validation result without completing the stage.
  public recordValidationResult(stage: string, validatorSuccess: boolean, errors: string[] = []): StageState {
    const state = this.readState();
    const stageState = state.stages[stage];
    if (!stageState) {
      throw new Error(`Unknown stage: ${stage}`);
    }

    if (stageState.status !== 'in_progress' && stageState.status !== 'review_failed' && stageState.status !== 'validated') {
      throw new Error(`Cannot validate stage '${stage}': stage is not in progress.`);
    }

    const now = new Date().toISOString();
    const validationPath = path.join(this.project.projectPath, 'runtime', `validation_result.${stage}.json`);
    fs.mkdirSync(path.dirname(validationPath), { recursive: true });
    fs.writeFileSync(validationPath, JSON.stringify({
      project: this.project.projectSlug,
      stage,
      status: validatorSuccess ? 'passed' : 'failed',
      validated_at: now,
      errors
    }, null, 2), 'utf8');

    stageState.validation_result_path = path.relative(this.project.projectPath, validationPath);
    stageState.status = validatorSuccess ? 'validated' : 'review_failed';
    stageState.updated_at = now;
    stageState.history.push({
      status: stageState.status,
      timestamp: now,
      message: validatorSuccess ? 'Validation passed' : `Validation failed: ${errors.join(', ')}`
    });

    state.current_stage = stage;
    this.writeState(state);
    return stageState;
  }
}
