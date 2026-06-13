import { createTransformStreamState, type TransformStreamState } from './toolInputStreamState.js';

export { createTransformStreamState };

// Inlined core helper types matching `@anthropic-ai/claude-agent-sdk` schemas
export interface SDKMessage {
  type: 'system' | 'assistant' | 'user' | 'stream_event' | 'result';
  subtype?: string;
  session_id?: string;
  agents?: any[];
  permissionMode?: string;
  parent_tool_use_id?: string | null;
  error?: string;
  message?: {
    role: string;
    content: any;
    usage?: any;
  };
  tool_use_result?: any;
  _blocked?: boolean;
  _blockReason?: string;
  event?: {
    type: 'message_start' | 'message_delta' | 'content_block_start' | 'content_block_delta' | 'content_block_stop' | 'message_stop';
    message?: any;
    usage?: any;
    index?: number;
    content_block?: {
      type: 'text' | 'thinking' | 'tool_use';
      id?: string;
      name?: string;
      input?: any;
      text?: string;
      thinking?: string;
    };
    delta?: {
      type: 'input_json_delta' | 'text_delta' | 'thinking_delta' | 'signature_delta';
      partial_json?: string;
      text?: string;
      thinking?: string;
      signature?: string;
    };
  };
  errors?: string[];
  modelUsage?: Record<string, { contextWindow?: number }>;
  timestamp?: string;
}

export interface UsageInfo {
  model?: string;
  inputTokens: number;
  cacheCreationInputTokens?: number;
  cacheReadInputTokens?: number;
  contextWindow: number;
  contextTokens: number;
  percentage: number;
}

export type TransformEvent =
  | { type: 'session_init'; sessionId: string; agents?: any[]; permissionMode?: string }
  | { type: 'context_compacted' }
  | { type: 'thinking'; content: string; index: number }
  | { type: 'text'; content: string; index: number }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
  | { type: 'subagent_tool_use'; subagentId: string; id: string; name: string; input: Record<string, unknown> }
  | { type: 'tool_result'; id: string; content: string; isError?: boolean }
  | { type: 'subagent_tool_result'; subagentId: string; id: string; content: string; isError?: boolean }
  | { type: 'error'; content: string }
  | { type: 'notice'; content: string; level?: 'info' | 'warning' }
  | { type: 'usage'; usage: UsageInfo }
  | { type: 'context_window'; contextWindow: number }
  | { type: 'async_subagent_result'; agentId: string; status: 'completed' | 'error'; result?: string };

type ToolUseFields = { id: string; name: string; input: Record<string, unknown> };
type ToolResultFields = { id: string; content: string; isError?: boolean };

function getToolInput(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }
  return input as Record<string, unknown>;
}

function emitToolUse(parentToolUseId: string | null, fields: ToolUseFields): TransformEvent {
  if (parentToolUseId === null) {
    return { type: 'tool_use', ...fields };
  }
  return { type: 'subagent_tool_use', subagentId: parentToolUseId, ...fields };
}

function emitToolResult(parentToolUseId: string | null, fields: ToolResultFields): TransformEvent {
  if (parentToolUseId === null) {
    return { type: 'tool_result', ...fields };
  }
  return { type: 'subagent_tool_result', subagentId: parentToolUseId, ...fields };
}

function isBlockedMessage(message: SDKMessage): boolean {
  return (
    message.type === 'user' &&
    '_blocked' in message &&
    message._blocked === true &&
    '_blockReason' in message
  );
}

function extractToolResultContent(content: unknown, options?: { fallbackIndent?: number }): string {
  if (typeof content === 'string') return content;
  if (content == null) return '';

  if (Array.isArray(content)) {
    const textParts = content.filter(isTextBlock).map((block) => block.text);
    if (textParts.length > 0) return textParts.join('\n');
    if (content.length > 0) return JSON.stringify(content, null, options?.fallbackIndent);
    return '';
  }

  return JSON.stringify(content, null, options?.fallbackIndent);
}

function isTextBlock(block: unknown): block is { type: 'text'; text: string } {
  if (!block || typeof block !== 'object') return false;
  const record = block as Record<string, unknown>;
  return record.type === 'text' && typeof record.text === 'string';
}

function getContextWindowSize(model: string): number {
  if (model.toLowerCase().endsWith('[1m]') || model.toLowerCase().endsWith('[1m]')) {
    return 1000000;
  }
  return 200000;
}

export interface TransformOptions {
  intendedModel?: string;
  streamState?: TransformStreamState;
  usageState?: TransformUsageState;
}

export interface MessageUsage {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
}

interface PromptUsageSnapshot {
  inputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
  contextTokens: number;
}

export interface TransformUsageState {
  clear(): void;
  mergePromptUsage(usage: MessageUsage): PromptUsageSnapshot;
  getPromptUsage(): PromptUsageSnapshot;
  hasEmitted(promptUsage: PromptUsageSnapshot): boolean;
  markEmitted(promptUsage: PromptUsageSnapshot): void;
}

const EMPTY_PROMPT_USAGE: PromptUsageSnapshot = {
  inputTokens: 0,
  cacheCreationInputTokens: 0,
  cacheReadInputTokens: 0,
  contextTokens: 0,
};

function normalizeTokenCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;
}

function hasPromptUsageField(usage: unknown): usage is MessageUsage {
  if (!usage || typeof usage !== 'object' || Array.isArray(usage)) {
    return false;
  }
  const record = usage as Record<string, unknown>;
  return typeof record.input_tokens === 'number' ||
    typeof record.cache_creation_input_tokens === 'number' ||
    typeof record.cache_read_input_tokens === 'number';
}

function toPromptUsageSnapshot(usage: MessageUsage): PromptUsageSnapshot {
  const inputTokens = normalizeTokenCount(usage.input_tokens);
  const cacheCreationInputTokens = normalizeTokenCount(usage.cache_creation_input_tokens);
  const cacheReadInputTokens = normalizeTokenCount(usage.cache_read_input_tokens);
  return {
    inputTokens,
    cacheCreationInputTokens,
    cacheReadInputTokens,
    contextTokens: inputTokens + cacheCreationInputTokens + cacheReadInputTokens,
  };
}

function mergePromptUsage(current: PromptUsageSnapshot, usage: MessageUsage): PromptUsageSnapshot {
  const next = toPromptUsageSnapshot(usage);
  const inputTokens = Math.max(current.inputTokens, next.inputTokens);
  const cacheCreationInputTokens = Math.max(current.cacheCreationInputTokens, next.cacheCreationInputTokens);
  const cacheReadInputTokens = Math.max(current.cacheReadInputTokens, next.cacheReadInputTokens);
  return {
    inputTokens,
    cacheCreationInputTokens,
    cacheReadInputTokens,
    contextTokens: inputTokens + cacheCreationInputTokens + cacheReadInputTokens,
  };
}

function samePromptUsage(a: PromptUsageSnapshot, b: PromptUsageSnapshot): boolean {
  return a.inputTokens === b.inputTokens &&
    a.cacheCreationInputTokens === b.cacheCreationInputTokens &&
    a.cacheReadInputTokens === b.cacheReadInputTokens &&
    a.contextTokens === b.contextTokens;
}

function buildUsageInfo(promptUsage: PromptUsageSnapshot, options?: TransformOptions): UsageInfo {
  const model = options?.intendedModel ?? 'sonnet';
  const contextWindow = getContextWindowSize(model);
  const percentage = Math.min(100, Math.max(0, Math.round((promptUsage.contextTokens / contextWindow) * 100)));

  return {
    model,
    inputTokens: promptUsage.inputTokens,
    cacheCreationInputTokens: promptUsage.cacheCreationInputTokens,
    cacheReadInputTokens: promptUsage.cacheReadInputTokens,
    contextWindow,
    contextTokens: promptUsage.contextTokens,
    percentage,
  };
}

export function createTransformUsageState(): TransformUsageState {
  let promptUsage: PromptUsageSnapshot = { ...EMPTY_PROMPT_USAGE };
  let lastEmittedPromptUsage: PromptUsageSnapshot | null = null;

  return {
    clear(): void {
      promptUsage = { ...EMPTY_PROMPT_USAGE };
      lastEmittedPromptUsage = null;
    },
    mergePromptUsage(usage: MessageUsage): PromptUsageSnapshot {
      promptUsage = mergePromptUsage(promptUsage, usage);
      return promptUsage;
    },
    getPromptUsage(): PromptUsageSnapshot {
      return { ...promptUsage };
    },
    hasEmitted(nextPromptUsage: PromptUsageSnapshot): boolean {
      return lastEmittedPromptUsage !== null && samePromptUsage(lastEmittedPromptUsage, nextPromptUsage);
    },
    markEmitted(nextPromptUsage: PromptUsageSnapshot): void {
      lastEmittedPromptUsage = { ...nextPromptUsage };
    },
  };
}

function maybeEmitUsageFromPromptUsage(
  promptUsage: PromptUsageSnapshot,
  options?: TransformOptions,
  behavior: { emitZeroUsage?: boolean } = {},
): TransformEvent | null {
  if (promptUsage.contextTokens <= 0) {
    return behavior.emitZeroUsage
      ? { type: 'usage', usage: buildUsageInfo(promptUsage, options) }
      : null;
  }
  if (options?.usageState?.hasEmitted(promptUsage)) {
    return null;
  }
  options?.usageState?.markEmitted(promptUsage);
  return { type: 'usage', usage: buildUsageInfo(promptUsage, options) };
}

export function* transformSDKMessage(
  message: SDKMessage,
  options?: TransformOptions
): Generator<TransformEvent> {
  switch (message.type) {
    case 'system':
      if (message.subtype === 'init' && message.session_id) {
        yield {
          type: 'session_init',
          sessionId: message.session_id,
          agents: message.agents,
          permissionMode: message.permissionMode,
        };
      } else if (message.subtype === 'compact_boundary') {
        yield { type: 'context_compacted' };
      }
      break;

    case 'assistant': {
      const parentToolUseId = message.parent_tool_use_id ?? null;

      if (message.error) {
        yield { type: 'error', content: message.error };
      }

      if (message.message?.content && Array.isArray(message.message.content)) {
        for (let i = 0; i < message.message.content.length; i++) {
          const block = message.message.content[i];
          if (block.type === 'thinking' && block.thinking) {
            if (parentToolUseId === null) {
              yield { type: 'thinking', content: block.thinking, index: i };
            }
          } else if (block.type === 'text' && block.text && block.text.trim() !== '(no content)') {
            if (parentToolUseId === null) {
              yield { type: 'text', content: block.text, index: i };
            }
          } else if (block.type === 'tool_use') {
            yield emitToolUse(parentToolUseId, {
              id: block.id || `tool-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
              name: block.name || 'unknown',
              input: getToolInput(block.input),
            });
          }
        }
      }

      options?.streamState?.clearParent(parentToolUseId);

      const usage = (message.message as { usage?: MessageUsage } | undefined)?.usage;
      if (parentToolUseId === null && usage) {
        if (options?.usageState) {
          const promptUsage = options.usageState.mergePromptUsage(usage);
          const usageChunk = maybeEmitUsageFromPromptUsage(promptUsage, options, { emitZeroUsage: true });
          if (usageChunk) {
            yield usageChunk;
          }
        } else {
          yield { type: 'usage', usage: buildUsageInfo(toPromptUsageSnapshot(usage), options) };
        }
      }
      break;
    }

    case 'user': {
      const parentToolUseId = message.parent_tool_use_id ?? null;

      if (isBlockedMessage(message)) {
        yield {
          type: 'notice',
          content: message._blockReason || 'Blocked by policy',
          level: 'warning',
        };
        break;
      }
      if (message.tool_use_result !== undefined && message.parent_tool_use_id) {
        yield emitToolResult(parentToolUseId, {
          id: message.parent_tool_use_id,
          content: extractToolResultContent(message.tool_use_result, { fallbackIndent: 2 }),
          isError: false,
        });
      }
      if (message.message?.content && Array.isArray(message.message.content)) {
        for (const block of message.message.content) {
          if (block.type === 'tool_result') {
            yield emitToolResult(parentToolUseId, {
              id: block.tool_use_id || message.parent_tool_use_id || '',
              content: extractToolResultContent(block.content, { fallbackIndent: 2 }),
              isError: block.is_error || false,
            });
          }
        }
      }
      break;
    }

    case 'stream_event': {
      const parentToolUseId = message.parent_tool_use_id ?? null;
      const event = message.event;
      if (parentToolUseId === null && event?.type === 'message_start') {
        options?.usageState?.clear();
        const usage = (event.message as { usage?: MessageUsage } | undefined)?.usage;
        if (usage && hasPromptUsageField(usage)) {
          if (options?.usageState) {
            options.usageState.mergePromptUsage(usage);
          } else {
            const usageChunk = maybeEmitUsageFromPromptUsage(toPromptUsageSnapshot(usage), options);
            if (usageChunk) {
              yield usageChunk;
            }
          }
        }
      } else if (parentToolUseId === null && event?.type === 'message_delta' && hasPromptUsageField(event.usage)) {
        if (options?.usageState) {
          const previousPromptUsage = options.usageState.getPromptUsage();
          const promptUsage = options.usageState.mergePromptUsage(event.usage);
          const shouldEmitDeltaUsage = previousPromptUsage.contextTokens <= 0 ||
            options.usageState.hasEmitted(previousPromptUsage);
          if (shouldEmitDeltaUsage) {
            const usageChunk = maybeEmitUsageFromPromptUsage(promptUsage, options);
            if (usageChunk) {
              yield usageChunk;
            }
          }
        } else {
          const usageChunk = maybeEmitUsageFromPromptUsage(toPromptUsageSnapshot(event.usage), options);
          if (usageChunk) {
            yield usageChunk;
          }
        }
      } else if (event?.type === 'content_block_start' && event.content_block?.type === 'tool_use') {
        const toolUseFields: ToolUseFields = {
          id: event.content_block.id || `tool-${Date.now()}`,
          name: event.content_block.name || 'unknown',
          input: getToolInput(event.content_block.input),
        };
        if (typeof event.index === 'number') {
          options?.streamState?.registerToolUse(parentToolUseId, event.index, toolUseFields);
        }
        yield emitToolUse(parentToolUseId, toolUseFields);
      } else if (event?.type === 'content_block_start' && event.content_block?.type === 'thinking') {
        if (parentToolUseId === null && event.content_block.thinking && typeof event.index === 'number') {
          yield { type: 'thinking', content: event.content_block.thinking, index: event.index };
        }
      } else if (event?.type === 'content_block_start' && event.content_block?.type === 'text') {
        if (parentToolUseId === null && event.content_block.text && typeof event.index === 'number') {
          yield { type: 'text', content: event.content_block.text, index: event.index };
        }
      } else if (event?.type === 'content_block_delta') {
        if (event.delta?.type === 'input_json_delta' && typeof event.index === 'number') {
          const toolUseFields = options?.streamState?.applyInputJsonDelta(
            parentToolUseId,
            event.index,
            event.delta.partial_json || '',
          );
          if (toolUseFields) {
            yield emitToolUse(parentToolUseId, toolUseFields);
          }
        } else if (parentToolUseId === null && event.delta?.type === 'thinking_delta' && event.delta.thinking && typeof event.index === 'number') {
          yield { type: 'thinking', content: event.delta.thinking, index: event.index };
        } else if (parentToolUseId === null && event.delta?.type === 'text_delta' && event.delta.text && typeof event.index === 'number') {
          yield { type: 'text', content: event.delta.text, index: event.index };
        }
      } else if (event?.type === 'content_block_stop' && typeof event.index === 'number') {
        options?.streamState?.clearContentBlock(parentToolUseId, event.index);
      }
      break;
    }

    case 'result':
      options?.streamState?.clearAll();
      if (options?.usageState) {
        const usageChunk = maybeEmitUsageFromPromptUsage(options.usageState.getPromptUsage(), options);
        if (usageChunk) {
          yield usageChunk;
        }
        options.usageState.clear();
      }
      if (message.errors && Array.isArray(message.errors) && message.errors.length > 0) {
        const content = message.errors.filter((e) => e.trim().length > 0).join('\n');
        yield {
          type: 'error',
          content: content || `Result error: ${message.subtype}`,
        };
      }
      if ('modelUsage' in message && message.modelUsage) {
        const usageKeys = Object.keys(message.modelUsage);
        if (usageKeys.length > 0 && usageKeys[0]) {
          const selectedModel = usageKeys[0];
          const contextWindow = getContextWindowSize(selectedModel);
          yield { type: 'context_window', contextWindow };
        }
      }
      break;

    default:
      break;
  }
}
