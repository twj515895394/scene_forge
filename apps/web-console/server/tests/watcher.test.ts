import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { FileWatcher } from '../FileWatcher.js';

test('FileWatcher System Tests', async (t) => {
  const testDir = path.resolve('./temp_test_watcher_project');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
  fs.mkdirSync(testDir, { recursive: true });

  // Pre-create output folder
  const outputsDir = path.join(testDir, 'outputs');
  fs.mkdirSync(outputsDir, { recursive: true });

  await t.test('1. Chokidar change notifications on add, change, unlink', (t, done) => {
    const events: { event: string; file: string }[] = [];
    
    const watcher = new FileWatcher(testDir, (msg) => {
      events.push({ event: msg.event, file: msg.file });
      
      // Stop once we receive target event logs
      if (events.some(e => e.event === 'unlink')) {
        watcher.close();
        
        // Assertions
        assert.ok(events.some(e => e.event === 'add' && e.file === 'outputs/test_watch.md'));
        assert.ok(events.some(e => e.event === 'change' && e.file === 'outputs/test_watch.md'));
        assert.ok(events.some(e => e.event === 'unlink' && e.file === 'outputs/test_watch.md'));
        done();
      }
    });

    const targetFile = path.join(outputsDir, 'test_watch.md');

    // Trigger FS events in series (allowing small pauses for OS file system notifications)
    setTimeout(() => {
      // 1. Add file
      fs.writeFileSync(targetFile, 'initial text', 'utf8');
      
      setTimeout(() => {
        // 2. Change file
        fs.writeFileSync(targetFile, 'updated text', 'utf8');
        
        setTimeout(() => {
          // 3. Unlink file
          fs.unlinkSync(targetFile);
        }, 150);
      }, 150);
    }, 150);
  });

  // Cleanup
  fs.rmSync(testDir, { recursive: true });
});
