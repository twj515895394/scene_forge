import { test } from 'node:test';
import assert from 'node:assert';
import { mergeVisibleBubbleChunk } from '../liveBubbleAccumulator.js';

test('live bubble accumulator deduplicates final assistant content after stream output', async (t) => {
  await t.test('appends stream deltas into one visible string', () => {
    const first = mergeVisibleBubbleChunk({
      previous: '',
      incoming: 'Hello',
      source: 'stream',
      streamVisible: false,
    });
    assert.deepStrictEqual(first, { next: 'Hello', skipped: false });

    const second = mergeVisibleBubbleChunk({
      previous: first.next,
      incoming: ' world',
      source: 'stream',
      streamVisible: true,
    });
    assert.deepStrictEqual(second, { next: 'Hello world', skipped: false });
  });

  await t.test('skips duplicate final assistant text after visible stream text', () => {
    const result = mergeVisibleBubbleChunk({
      previous: 'Hello world',
      incoming: 'Hello world',
      source: 'assistant',
      streamVisible: true,
    });
    assert.deepStrictEqual(result, { next: 'Hello world', skipped: true });
  });

  await t.test('skips duplicate final assistant thinking after visible stream thinking', () => {
    const result = mergeVisibleBubbleChunk({
      previous: 'Reasoning...',
      incoming: 'Reasoning...',
      source: 'assistant',
      streamVisible: true,
    });
    assert.deepStrictEqual(result, { next: 'Reasoning...', skipped: true });
  });

  await t.test('keeps final assistant content when stream never produced visible text', () => {
    const result = mergeVisibleBubbleChunk({
      previous: '',
      incoming: 'Final answer',
      source: 'assistant',
      streamVisible: false,
    });
    assert.deepStrictEqual(result, { next: 'Final answer', skipped: false });
  });
});
