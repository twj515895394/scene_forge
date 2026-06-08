#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { Project } from './project.js';
import { StateMachine } from './state_machine.js';
import { Validator } from './validators/validator.js';
import { ArtifactRegistry } from './artifact_registry.js';

const program = new Command();

program
  .name('scene-forge')
  .description('SceneForge CLI Engine')
  .version('9.0.0');

// Helper to handle output formatting and process exits
function handleSuccess(data: any, options: { json?: boolean }, textFormatter: () => string) {
  if (options.json) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log(textFormatter());
  }
  process.exit(0);
}

function handleError(err: any, options: { json?: boolean }) {
  let errorCode = 'SF-ERR-UNKNOWN';
  const message = err.message || 'Unknown error occurred';
  const details: any = {};

  if (message.includes('Cannot start stage') || message.includes('upstream stages')) {
    errorCode = 'SF-ERR-DEPENDENCY-FAILED';
  } else if (message.includes('Validation failed') || message.includes('Level 1') || message.includes('Level 2') || message.includes('Level 3')) {
    errorCode = 'SF-ERR-VALIDATION-FAILED';
  } else if (message.includes('not in progress') || message.includes('is not allowed to write')) {
    errorCode = 'SF-ERR-INVALID-STAGE-STATE';
  } else if (message.includes('ENOENT') || message.includes('Failed to parse')) {
    errorCode = 'SF-ERR-SYSTEM';
  } else if (message.includes('Unknown stage') || message.includes('invalid') || message.includes('Missing required option')) {
    errorCode = 'SF-ERR-INVALID-ARG';
  }

  if (options.json) {
    console.log(JSON.stringify({
      error_code: errorCode,
      message: message,
      details: details
    }, null, 2));
  } else {
    console.error(`\x1b[31mError [${errorCode}]: ${message}\x1b[0m`);
  }
  process.exit(1);
}

function getInstances() {
  const projectPath = process.cwd();
  const project = new Project(projectPath);
  const stateMachine = new StateMachine(project);
  const validator = new Validator(project);
  const registry = new ArtifactRegistry(project);
  return { project, stateMachine, validator, registry };
}

// 1. Status Command
program
  .command('status')
  .description('Get the current project stage status')
  .option('--json', 'Output details in JSON format')
  .action((options) => {
    try {
      const { stateMachine } = getInstances();
      const state = stateMachine.readState();
      handleSuccess(
        state,
        options,
        () => {
          let text = `Project: ${state.project}\n`;
          text += `Current Stage: ${state.current_stage || 'None (idle)'}\n\n`;
          text += `Stages:\n`;
          for (const key of Object.keys(state.stages)) {
            const s = state.stages[key];
            text += `  - [${s.status.toUpperCase().padEnd(12)}] ${s.stage}\n`;
          }
          return text;
        }
      );
    } catch (err) {
      handleError(err, options);
    }
  });

// 2. Start Command
program
  .command('start')
  .description('Start a development stage')
  .requiredOption('--stage <stage>', 'The stage name to start')
  .option('--json', 'Output result in JSON format')
  .action((options) => {
    try {
      const { stateMachine } = getInstances();
      const stageState = stateMachine.startStage(options.stage);
      handleSuccess(
        {
          project: stateMachine.readState().project,
          stage: stageState.stage,
          status: stageState.status,
          started_at: stageState.started_at
        },
        options,
        () => `Successfully started stage '${options.stage}'. Write scope is now locked to 'outputs/' and 'details/${options.stage}/'.`
      );
    } catch (err) {
      handleError(err, options);
    }
  });

// 3. Validate Command
program
  .command('validate')
  .description('Validate artifacts for a stage')
  .requiredOption('--stage <stage>', 'The stage name to validate')
  .option('--json', 'Output result in JSON format')
  .action((options) => {
    try {
      const { validator } = getInstances();
      const report = validator.validate(options.stage);
      
      if (report.status === 'failed') {
        throw new Error(`Validation failed for stage '${options.stage}': ${report.errors.map(e => e.message).join('; ')}`);
      }
      
      handleSuccess(
        report,
        options,
        () => `Validation PASSED for stage '${options.stage}'.`
      );
    } catch (err) {
      handleError(err, options);
    }
  });

// 4. Complete Command
program
  .command('complete')
  .description('Complete a stage with automatic validations')
  .requiredOption('--stage <stage>', 'The stage name to complete')
  .option('--json', 'Output result in JSON format')
  .action((options) => {
    try {
      const { stateMachine, validator } = getInstances();
      
      // Perform validation
      const report = validator.validate(options.stage);
      const isSuccess = report.status === 'passed';
      const errors = report.errors.map(e => e.message);

      // Trigger completeStage
      const stageState = stateMachine.completeStage(options.stage, isSuccess, errors);
      
      handleSuccess(
        {
          project: stateMachine.readState().project,
          stage: stageState.stage,
          status: stageState.status,
          completed_at: stageState.completed_at,
          handoff_path: stageState.handoff_path
        },
        options,
        () => `Successfully completed stage '${options.stage}'. Generated handoff at '${stageState.handoff_path}'.`
      );
    } catch (err) {
      handleError(err, options);
    }
  });

// 5. Artifacts Command
program
  .command('artifacts')
  .description('List downstream readable artifacts from a stage')
  .requiredOption('--from <stage>', 'The source stage name')
  .option('--json', 'Output result in JSON format')
  .action((options) => {
    try {
      const { registry } = getInstances();
      const artifacts = registry.getReadableArtifacts(options.from, 'downstream');
      handleSuccess(
        artifacts,
        options,
        () => {
          let text = `Readable final artifacts from stage '${options.from}':\n`;
          for (const art of artifacts) {
            text += `  - [${art.role}] ${art.id}: ${art.path}\n`;
          }
          return text;
        }
      );
    } catch (err) {
      handleError(err, options);
    }
  });

// 6. Rules Command
program
  .command('rules')
  .description('Get active rules for a stage')
  .requiredOption('--stage <stage>', 'The stage name')
  .option('--json', 'Output result in JSON format')
  .action((options) => {
    try {
      const { validator } = getInstances();
      const rule = validator.getStageRule(options.stage);
      handleSuccess(
        {
          stage: options.stage,
          ...rule
        },
        options,
        () => `Active rules for '${options.stage}':\n  Expected File Pattern: ${rule.expected_file_pattern}\n  Required Heading Headers: ${rule.required_headers.join(', ')}`
      );
    } catch (err) {
      handleError(err, options);
    }
  });

program.parse(process.argv);
