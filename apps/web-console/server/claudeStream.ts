import { transformSDKMessage } from './transformClaudeMessage.js';

type TransformOptions = Parameters<typeof transformSDKMessage>[1];
type TransformChunk = ReturnType<typeof transformSDKMessage> extends Generator<infer T> ? T : never;

function isRenderableString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function fallbackChunksFromMessage(message: any): TransformChunk[] {
  const chunks: TransformChunk[] = [];

  if (message?.type === 'assistant') {
    const content = message.message?.content || message.content;
    if (Array.isArray(content)) {
      content.forEach((block: any, index: number) => {
        if (block?.type === 'thinking' && isRenderableString(block.thinking)) {
          chunks.push({ type: 'thinking', content: block.thinking, index } as TransformChunk);
        } else if (block?.type === 'text' && isRenderableString(block.text) && block.text.trim() !== '(no content)') {
          chunks.push({ type: 'text', content: block.text, index } as TransformChunk);
        } else if (block?.type === 'tool_use' && block.id && block.name) {
          chunks.push({
            type: 'tool_use',
            id: block.id,
            name: block.name,
            input: block.input || {}
          } as TransformChunk);
        }
      });
    }
    return chunks;
  }

  if (message?.type !== 'stream_event') {
    return chunks;
  }

  const event = message.event;
  const index = typeof event?.index === 'number' ? event.index : 0;

  if (event?.type === 'content_block_start') {
    if (event.content_block?.type === 'thinking' && isRenderableString(event.content_block.thinking)) {
      chunks.push({ type: 'thinking', content: event.content_block.thinking, index } as TransformChunk);
    } else if (event.content_block?.type === 'text' && isRenderableString(event.content_block.text)) {
      chunks.push({ type: 'text', content: event.content_block.text, index } as TransformChunk);
    }
  }

  if (event?.type === 'content_block_delta') {
    if (event.delta?.type === 'thinking_delta') {
      const thoughtText = event.delta.thinking ?? event.delta.text;
      if (isRenderableString(thoughtText)) {
        chunks.push({ type: 'thinking', content: thoughtText, index } as TransformChunk);
      }
    } else if (event.delta?.type === 'text_delta') {
      const text = event.delta.text ?? event.delta.partial_text;
      if (isRenderableString(text)) {
        chunks.push({ type: 'text', content: text, index } as TransformChunk);
      }
    }
  }

  return chunks;
}

export function extractClaudeChunks(message: any, options?: TransformOptions): TransformChunk[] {
  const primary = Array.from(transformSDKMessage(message, options));
  if (primary.length > 0) {
    return primary;
  }

  return fallbackChunksFromMessage(message);
}
