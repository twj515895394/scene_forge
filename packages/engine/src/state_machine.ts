import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { Project } from './project.js';

// Stages definition
export const DEFAULT_STAGES = [
  'topic_gate',
  'script',
  'performance',
  'audio',
  'storyboard',
  'video_prompts',
  'publish_review'
];

export const STAGE_DEPENDENCIES: Record<string, string[]> = {
  topic_gate: [],
  script: ['topic_gate'],
  performance: ['script'],
  audio: ['performance'],
  storyboard: ['performance', 'audio'],
  video_prompts: ['storyboard'],
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
      return ProjectStateSchema.parse(parsed);
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
      stages[stage] = {
        stage,
        status: 'ready',
        updated_at: new Date().toISOString(),
        history: [{
          status: 'ready',
          timestamp: new Date().toISOString(),
          message: 'Initialized stage status'
        }]
      };
    }
    const state: ProjectState = {
      project: this.project.projectSlug,
      stages
    };
    this.writeState(state);
    return state;
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
      const deps = STAGE_DEPENDENCIES[stage] || [];
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

    if (stageState.status !== 'in_progress' && stageState.status !== 'review_failed') {
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
}
