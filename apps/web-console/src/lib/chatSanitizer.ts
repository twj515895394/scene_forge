function isSeparatorOnlyLine(line: string): boolean {
  return /^[-*_=\s]{3,}$/.test(line);
}

function isMarkdownTableDelimiterLine(line: string): boolean {
  if (!line.includes('|')) {
    return false;
  }

  const cells = line
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  if (cells.length === 0) {
    return false;
  }

  return cells.every((cell) => /^:?[=\-_*]{3,}:?$/.test(cell));
}

export function stripChatNoiseLines(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return true;
      }
      return !isSeparatorOnlyLine(trimmed) && !isMarkdownTableDelimiterLine(trimmed);
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function isChatContentRenderable(value: string): boolean {
  return stripChatNoiseLines(value).length > 0;
}

export function summarizeChatNoise(value: string) {
  const lines = value.replace(/\r\n/g, '\n').split('\n');
  const separatorLineCount = lines.filter((line) => isSeparatorOnlyLine(line.trim())).length;
  const tableDelimiterCount = lines.filter((line) => isMarkdownTableDelimiterLine(line.trim())).length;
  const blankRuns = (value.match(/\n{3,}/g) ?? []).map((segment) => segment.length);
  const sanitized = stripChatNoiseLines(value);

  return {
    separatorLineCount,
    tableDelimiterCount,
    blankRunCount: blankRuns.length,
    maxBlankRun: blankRuns.length > 0 ? Math.max(...blankRuns) : 0,
    sanitizedChanged: sanitized !== value.trim(),
    sanitizedEmpty: sanitized.length === 0,
  };
}
