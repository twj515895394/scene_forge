import path from 'path';

function isPathInside(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function getPathCandidates(rawPath: string, projectPath: string, workspaceRoot: string): string[] {
  return [
    path.resolve(workspaceRoot, rawPath),
    path.resolve(projectPath, rawPath),
  ];
}

function isProjectReadPath(rawPath: string, projectPath: string, workspaceRoot: string): boolean {
  if (!rawPath) return false;
  return getPathCandidates(rawPath, projectPath, workspaceRoot)
    .some((candidate) => isPathInside(projectPath, candidate));
}

function stripProjectCdPrefix(command: string, projectPath: string): string {
  const escapedProjectPath = projectPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cdPrefix = new RegExp(`^cd ["']?${escapedProjectPath}["']? &&\\s+(.+)$`);
  return command.match(cdPrefix)?.[1] ?? command;
}

function hasProjectCdPrefix(command: string, projectPath: string): boolean {
  return stripProjectCdPrefix(command, projectPath) !== command;
}

function matchCommandPath(command: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = command.match(pattern);
    if (match) {
      return match[1] || match[2] || match[3];
    }
  }
  return undefined;
}

export function isAllowedStageLightReadOnlyCommand(command: string, projectPath: string, workspaceRoot: string): boolean {
  const normalizedCommand = stripProjectCdPrefix(command.trim().replace(/\s+/g, ' '), projectPath);
  const pathAtom = String.raw`(?:"([^"]+)"|'([^']+)'|(\S+))`;
  const readPath = matchCommandPath(normalizedCommand, [
    new RegExp(String.raw`^cat\s+${pathAtom}(?:\s+\|\s+head(?:\s+(?:-n\s+\d+|-\d+))?)?$`),
    new RegExp(String.raw`^head\s+(?:-n\s+\d+|-\d+)\s+${pathAtom}$`),
    new RegExp(String.raw`^sed\s+-n\s+(?:"\d+,\d+p"|'\d+,\d+p')\s+${pathAtom}$`),
    new RegExp(String.raw`^nl\s+-ba\s+${pathAtom}(?:\s+\|\s+sed\s+-n\s+(?:"\d+,\d+p"|'\d+,\d+p'))?$`),
  ]);

  return readPath ? isProjectReadPath(readPath, projectPath, workspaceRoot) : false;
}

function collectExplicitPaths(command: string): string[] {
  const paths = new Set<string>();
  const quotedPattern = /["']([^"']+)["']/g;
  let quotedMatch: RegExpExecArray | null;
  while ((quotedMatch = quotedPattern.exec(command)) !== null) {
    const value = quotedMatch[1];
    if (looksLikePath(value)) {
      paths.add(value);
    }
  }

  const tokens = command.split(/\s+/);
  for (const token of tokens) {
    const value = token.replace(/^[|;&(<]+|[|;&)>]+$/g, '');
    if (looksLikePath(value)) {
      paths.add(value);
    }
  }
  return [...paths];
}

function looksLikePath(value: string): boolean {
  return value.startsWith('/') ||
    value.startsWith('projects/') ||
    value.startsWith('./projects/') ||
    value.startsWith('../') ||
    value.includes('/PROJECT_') ||
    value.includes('/inputs/') ||
    value.includes('/outputs/') ||
    value.includes('/details/') ||
    value.includes('/handoffs/') ||
    value.includes('/runtime/');
}

export function isAllowedStageLightProjectCommand(command: string, projectPath: string, workspaceRoot: string): boolean {
  const normalizedCommand = command.trim().replace(/\s+/g, ' ');
  if (!normalizedCommand) return false;

  const commandAfterCd = stripProjectCdPrefix(normalizedCommand, projectPath);
  if (isAllowedEngineCliCommand(commandAfterCd)) {
    return true;
  }

  const explicitPaths = collectExplicitPaths(normalizedCommand);
  if (explicitPaths.some((rawPath) => !isProjectReadPath(rawPath, projectPath, workspaceRoot))) {
    return false;
  }

  if (hasProjectCdPrefix(normalizedCommand, projectPath)) {
    return !commandAfterCd.includes('../');
  }

  return explicitPaths.length > 0;
}

function isAllowedEngineCliCommand(command: string): boolean {
  const cliOutputSuffix = String.raw`(?:\s+2>&1)?(?:\s+\|\s+head(?:\s+(?:-n\s+\d+|-\d+))?)?`;
  const cliPattern = new RegExp(String.raw`^node \.\.\/\.\.\/packages\/engine\/dist\/cli\.js (status|rules --stage [a-z_]+|start --stage [a-z_]+|validate --stage [a-z_]+|complete --stage [a-z_]+)( --json)?${cliOutputSuffix}$`, 'i');
  return cliPattern.test(command);
}
