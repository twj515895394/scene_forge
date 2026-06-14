export type BubbleChunkSource = 'assistant' | 'stream';

export interface MergeChunkOptions {
  incoming: string;
  previous: string;
  source: BubbleChunkSource;
  streamVisible: boolean;
}

export interface MergeChunkResult {
  next: string;
  skipped: boolean;
}

export interface TextBubbleLike {
  type: string;
  content: string;
}

export function normalizeBubbleTextForDedupe(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function shouldReplacePreviousText(previous: string, incoming: string): boolean {
  return incoming.length > previous.length && incoming.startsWith(previous);
}

function shouldSkipIncomingText(previous: string, incoming: string): boolean {
  return previous === incoming || previous.startsWith(incoming);
}

export function dedupeConsecutiveTextBubbles<T extends TextBubbleLike>(items: T[]): T[] {
  const next: T[] = [];

  for (const bubble of items) {
    if (bubble.type !== 'text') {
      next.push(bubble);
      continue;
    }

    const normalized = normalizeBubbleTextForDedupe(bubble.content);
    const previous = next[next.length - 1];
    if (!normalized || previous?.type !== 'text') {
      next.push(bubble);
      continue;
    }

    const previousNormalized = normalizeBubbleTextForDedupe(previous.content);
    if (shouldReplacePreviousText(previousNormalized, normalized)) {
      next[next.length - 1] = bubble;
      continue;
    }
    if (shouldSkipIncomingText(previousNormalized, normalized)) {
      continue;
    }

    next.push(bubble);
  }

  return next;
}

function appendChunk(previous: string, incoming: string): string {
  if (!previous) return incoming;
  if (!incoming) return previous;
  if (incoming === previous) return previous;
  if (incoming.startsWith(previous)) return incoming;
  if (previous.endsWith(incoming)) return previous;
  return previous + incoming;
}

export function mergeVisibleBubbleChunk({
  incoming,
  previous,
  source,
  streamVisible,
}: MergeChunkOptions): MergeChunkResult {
  const trimmedIncoming = incoming.trim();
  if (!trimmedIncoming) {
    return { next: previous, skipped: true };
  }

  const next = appendChunk(previous, incoming);

  if (source === 'assistant' && streamVisible && next === previous) {
    return { next: previous, skipped: true };
  }

  if (next === previous) {
    return { next: previous, skipped: true };
  }

  return { next, skipped: false };
}
