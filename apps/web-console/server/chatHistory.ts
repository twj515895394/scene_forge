export interface HistoryBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text';
  content: string;
  timestamp: string;
  thoughtStatus?: 'streaming' | 'resolved';
  durationMs?: number;
}

interface ToolResultInfo {
  content: string;
  isError: boolean;
}

function isRenderableString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeHistoryThought(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeHistoryText(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTextParts(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .filter((block: any) => block?.type === 'text' && typeof block.text === 'string')
      .map((block: any) => block.text)
      .join('\n');
  }

  return '';
}

function stripInjectedUserContext(text: string): string {
  const separator = '\n\n---\n用户: ';
  const index = text.indexOf(separator);
  return index === -1 ? text : text.slice(index + separator.length);
}

function collectToolResults(lines: string[]): Map<string, ToolResultInfo> {
  const toolResults = new Map<string, ToolResultInfo>();

  for (const line of lines) {
    if (!line.trim()) continue;

    try {
      const entry = JSON.parse(line);
      const contentValue = entry.message?.content || entry.content;
      if (!Array.isArray(contentValue)) continue;

      for (const block of contentValue) {
        if (block?.type !== 'tool_result' || !block.tool_use_id) continue;

        const resultText = extractTextParts(block.content);
        toolResults.set(block.tool_use_id, {
          content: resultText,
          isError: block.is_error === true
        });
      }
    } catch {
      // Ignore malformed lines in session logs.
    }
  }

  return toolResults;
}

export function buildSessionBubblesFromJsonl(content: string, sessionId: string): HistoryBubble[] {
  const lines = content.trim().split('\n');
  const bubbles: HistoryBubble[] = [];
  const toolResults = collectToolResults(lines);
  let previousHistoryThought = '';
  let previousHistoryText = '';

  for (const line of lines) {
    if (!line.trim()) continue;

    try {
      const entry = JSON.parse(line);
      const value = entry.message?.content || entry.content;
      const timestamp = entry.timestamp || new Date().toISOString();

      if (entry.type === 'user') {
        const text = stripInjectedUserContext(extractTextParts(value));
        if (
          isRenderableString(text) &&
          !text.includes('<local-command-stdout>') &&
          !text.includes('<local-command-stderr>')
        ) {
          bubbles.push({
            id: `hist-u-${sessionId.slice(0, 4)}-${bubbles.length}`,
            type: 'text',
            content: `> ${text}`,
            timestamp
          });
        }
        continue;
      }

      if (entry.type !== 'assistant') continue;

      if (Array.isArray(value)) {
        for (const block of value) {
          if (block?.type === 'text' && isRenderableString(block.text)) {
            const normalizedText = normalizeHistoryText(block.text);
            if (!normalizedText || normalizedText === previousHistoryText) {
              continue;
            }
            bubbles.push({
              id: `hist-a-${bubbles.length}`,
              type: 'text',
              content: normalizedText,
              timestamp
            });
            previousHistoryText = normalizedText;
            continue;
          }

          if (block?.type === 'thinking' && isRenderableString(block.thinking)) {
            const normalizedThought = normalizeHistoryThought(block.thinking);
            if (!normalizedThought || normalizedThought === previousHistoryThought) {
              continue;
            }
            bubbles.push({
              id: `hist-t-${bubbles.length}`,
              type: 'thought',
              content: normalizedThought,
              timestamp,
              thoughtStatus: 'resolved'
            });
            previousHistoryThought = normalizedThought;
            continue;
          }

          if (block?.type === 'tool_use' && block.id && block.name) {
            const result = toolResults.get(block.id);
            const toolInfo = {
              id: block.id,
              name: block.name,
              input: block.input || {},
              status: result ? (result.isError ? 'error' : 'completed') : 'running',
              result: result?.content,
              isError: result?.isError
            };

            bubbles.push({
              id: `hist-tool-${block.id}`,
              type: 'tool_call',
              content: JSON.stringify(toolInfo),
              timestamp
            });
          }
        }
        continue;
      }

      if (isRenderableString(value)) {
        const normalizedText = normalizeHistoryText(value);
        if (!normalizedText || normalizedText === previousHistoryText) {
          continue;
        }
        bubbles.push({
          id: `hist-a-${bubbles.length}`,
          type: 'text',
          content: normalizedText,
          timestamp
        });
        previousHistoryText = normalizedText;
      }
    } catch {
      // Ignore malformed lines in session logs.
    }
  }

  return bubbles;
}
