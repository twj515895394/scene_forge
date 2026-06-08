import { test } from 'node:test';
import assert from 'node:assert';
import { TerminalBridge } from '../TerminalBridge.js';
import { OutputParser, stripAnsi, cleanTerminalProgress } from '../OutputParser.js';

test('PTY Bridge & OutputParser System Tests', async (t) => {

  await t.test('1. Static Helper Functions - stripAnsi and cleanTerminalProgress', () => {
    // A. stripAnsi test
    const rawAnsi = '\u001b[31m[ERROR]\u001b[0m SceneForge Engine \u001b[1mv9\u001b[0m';
    const cleanAnsi = stripAnsi(rawAnsi);
    assert.strictEqual(cleanAnsi, '[ERROR] SceneForge Engine v9');

    // B. cleanTerminalProgress carriage return test
    const rawProgress = 'Progress: 10%\rProgress: 50%\rProgress: 100%\nCompleted successfully.';
    const cleanProgress = cleanTerminalProgress(rawProgress);
    assert.strictEqual(cleanProgress, 'Progress: 100%\nCompleted successfully.');
  });

  await t.test('2. OutputParser - Chunk Segmenting and XML thought blocks', () => {
    const parser = new OutputParser();

    // Streaming feed 1
    const res1 = parser.feed('Initializing process...\n<thought>We need to check the manifest first.');
    assert.strictEqual(res1.length, 2);
    assert.strictEqual(res1[0].type, 'text');
    assert.strictEqual(res1[0].content, 'Initializing process...\n');
    assert.strictEqual(res1[1].type, 'thought');
    assert.strictEqual(res1[1].content, 'We need to check the manifest first.');

    // Streaming feed 2 (completing the thought block and adding text)
    const res2 = parser.feed(' Done thinking.</thought>\nStarting validation...');
    assert.strictEqual(res2.length, 3);
    assert.strictEqual(res2[1].type, 'thought');
    assert.strictEqual(res2[1].content, 'We need to check the manifest first. Done thinking.');
    assert.strictEqual(res2[2].type, 'text');
    assert.strictEqual(res2[2].content, '\nStarting validation...');
  });

  await t.test('3. TerminalBridge - Subprocess Spawn, Write & onData capture', (t, done) => {
    const isWin = process.platform === 'win32';
    // Use standard sh or cmd.exe depending on OS
    const bridge = new TerminalBridge(process.cwd());

    let captured = '';
    const start = Date.now();

    const disposable = bridge.onData((data) => {
      captured += data;
      if (captured.includes('SCENEFORGE_OK')) {
        disposable.dispose();
        bridge.kill();
        done();
      }
    });

    // Write a simple echo command into terminal stdin
    if (isWin) {
      bridge.write('echo SCENEFORGE_OK\r\n');
    } else {
      bridge.write('echo "SCENEFORGE_OK"\n');
    }

    // Timeout safety: fail if no output in 5 seconds
    setTimeout(() => {
      if (Date.now() - start >= 5000 && !captured.includes('SCENEFORGE_OK')) {
        disposable.dispose();
        bridge.kill();
        done(new Error(`PTY Spawn Timeout: failed to capture echo in 5 seconds. Captured so far: ${captured}`));
      }
    }, 5000);
  });
});
