import { test } from 'node:test';
import assert from 'node:assert';
import { buildSessionBubblesFromJsonl } from '../chatHistory.js';
import { extractClaudeChunks } from '../claudeStream.js';

test('Conversation parsing guards thought rendering regressions', async (t) => {
  await t.test('history parser restores thinking as a resolved process row', () => {
    const jsonl = [
      JSON.stringify({
        type: 'user',
        timestamp: '2026-06-12T08:00:00.000Z',
        message: {
          content: '读取 ./AGENTS.md\n\n---\n用户: 继续'
        }
      }),
      JSON.stringify({
        type: 'assistant',
        timestamp: '2026-06-12T08:00:01.000Z',
        message: {
          content: [
            { type: 'thinking', thinking: '' },
            { type: 'thinking', thinking: ' 先确认当前阶段，再决定是否推进。 ' },
            { type: 'text', text: '我先检查一下当前状态。' }
          ]
        }
      })
    ].join('\n');

    const bubbles = buildSessionBubblesFromJsonl(jsonl, 'session-1234');

    assert.strictEqual(bubbles.length, 3);
    assert.deepStrictEqual(
      bubbles.map((bubble) => ({ type: bubble.type, content: bubble.content })),
      [
        { type: 'text', content: '> 继续' },
        { type: 'thought', content: '先确认当前阶段，再决定是否推进。' },
        { type: 'text', content: '我先检查一下当前状态。' }
      ]
    );
    assert.strictEqual(bubbles[1].thoughtStatus, 'resolved');
  });

  await t.test('history parser normalizes noisy thinking whitespace and drops consecutive duplicate process rows', () => {
    const jsonl = [
      JSON.stringify({
        type: 'assistant',
        timestamp: '2026-06-12T08:10:00.000Z',
        message: {
          content: [
            { type: 'thinking', thinking: '\u200B\n\n 先检查历史气泡 \n\n\n 再决定是否继续。 \n' },
            { type: 'thinking', thinking: '先检查历史气泡\n\n再决定是否继续。' },
            { type: 'thinking', thinking: '\n\n\n' },
          ]
        }
      })
    ].join('\n');

    const bubbles = buildSessionBubblesFromJsonl(jsonl, 'session-dup');

    assert.strictEqual(bubbles.length, 1);
    assert.deepStrictEqual(bubbles[0], {
      id: 'hist-t-0',
      type: 'thought',
      content: '先检查历史气泡\n\n再决定是否继续。',
      timestamp: '2026-06-12T08:10:00.000Z',
      thoughtStatus: 'resolved',
    });
  });

  await t.test('history parser drops consecutive duplicate assistant text across mixed payload shapes', () => {
    const jsonl = [
      JSON.stringify({
        type: 'assistant',
        timestamp: '2026-06-12T08:20:00.000Z',
        message: {
          content: [
            { type: 'text', text: '现在写 88 镜头完整分镜清单。' },
          ]
        }
      }),
      JSON.stringify({
        type: 'assistant',
        timestamp: '2026-06-12T08:20:01.000Z',
        message: {
          content: ' 现在写 88 镜头完整分镜清单。 \n'
        }
      }),
      JSON.stringify({
        type: 'assistant',
        timestamp: '2026-06-12T08:20:02.000Z',
        message: {
          content: '继续写 8 包故事板 prompt。'
        }
      })
    ].join('\n');

    const bubbles = buildSessionBubblesFromJsonl(jsonl, 'session-text-dup');

    assert.strictEqual(bubbles.length, 2);
    assert.deepStrictEqual(
      bubbles.map((bubble) => ({ type: bubble.type, content: bubble.content })),
      [
        { type: 'text', content: '现在写 88 镜头完整分镜清单。' },
        { type: 'text', content: '继续写 8 包故事板 prompt。' }
      ]
    );
  });

  await t.test('stream fallback extracts thinking text when delta uses text field', () => {
    const chunks = extractClaudeChunks({
      type: 'stream_event',
      event: {
        type: 'content_block_delta',
        index: 2,
        delta: {
          type: 'thinking_delta',
          text: '先读取黑板，再决定下一步。'
        }
      }
    });

    assert.strictEqual(chunks.length, 1);
    assert.deepStrictEqual(chunks[0], {
      type: 'thinking',
      content: '先读取黑板，再决定下一步。',
      index: 2
    });
  });
});
