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
