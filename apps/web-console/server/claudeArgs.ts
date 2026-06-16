export type ClaudeContextMode = 'stage_light' | 'resume_full';

export interface BuildClaudeArgsInput {
  prompt: string;
  sessionId: string;
  isFirstMessage: boolean;
  contextMode: ClaudeContextMode;
  projectContext?: string;
  bypassPermissions?: boolean;
}

export interface BuildClaudeArgsResult {
  args: string[];
  finalPrompt: string;
  nextIsFirstMessage: boolean;
}

const BASE_ARGS = [
  '--print',
  '--output-format', 'stream-json',
  '--include-partial-messages',
  '--verbose',
];

function withProjectContext(projectContext: string | undefined, prompt: string): string {
  if (!projectContext) return prompt;
  return `${projectContext}\n\n---\n用户: ${prompt}`;
}

export function buildClaudeArgs(input: BuildClaudeArgsInput): BuildClaudeArgsResult {
  const args = [...BASE_ARGS];
  if (input.bypassPermissions) {
    args.push('--dangerously-skip-permissions');
  }

  if (input.contextMode === 'stage_light' && input.isFirstMessage) {
    const finalPrompt = withProjectContext(input.projectContext, input.prompt);
    args.push(finalPrompt, '--session-id', input.sessionId);
    return {
      args,
      finalPrompt,
      nextIsFirstMessage: false,
    };
  }

  if (input.contextMode === 'stage_light') {
    const finalPrompt = withProjectContext(input.projectContext, input.prompt);
    args.push(finalPrompt, '--resume', input.sessionId);
    return {
      args,
      finalPrompt,
      nextIsFirstMessage: false,
    };
  }

  if (input.isFirstMessage) {
    const finalPrompt = withProjectContext(input.projectContext, input.prompt);
    args.push(finalPrompt, '--session-id', input.sessionId);
    return {
      args,
      finalPrompt,
      nextIsFirstMessage: false,
    };
  }

  args.push(input.prompt, '--resume', input.sessionId);
  return {
    args,
    finalPrompt: input.prompt,
    nextIsFirstMessage: false,
  };
}
