import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { parseMarkdownFrontmatter } from '@scene-forge/engine';

export class FileWatcher {
  private watcher: chokidar.FSWatcher;

  constructor(projectPath: string, wsBroadcaster: (msg: any) => void) {
    const resolvedPath = path.resolve(projectPath);

    // Watch outputs/, details/, PROJECT_STATE.json and PROJECT_BOARD.md
    const pathsToWatch = [
      path.join(resolvedPath, 'outputs'),
      path.join(resolvedPath, 'details'),
      path.join(resolvedPath, 'PROJECT_STATE.json'),
      path.join(resolvedPath, 'PROJECT_BOARD.md')
    ];

    this.watcher = chokidar.watch(pathsToWatch, {
      ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**'
      ],
      persistent: true,
      ignoreInitial: true, // do not fire events on init
      depth: 3
    });

    const handleEvent = (event: string, filePath: string) => {
      const relativePath = path.relative(resolvedPath, filePath);
      console.log(`FileWatcher detected: ${event} on '${relativePath}'`);
      
      // Read latest PROJECT_STATE.json content if it exists
      let projectState = null;
      const statePath = path.join(resolvedPath, 'PROJECT_STATE.json');
      if (fs.existsSync(statePath)) {
        try {
          projectState = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        } catch (err) {
          // Avoid crashing if partial write is ongoing
        }
      }

      // Read latest PROJECT_BOARD.md content if it exists
      let boardState = null;
      const boardPath = path.join(resolvedPath, 'PROJECT_BOARD.md');
      if (fs.existsSync(boardPath)) {
        try {
          const boardContent = fs.readFileSync(boardPath, 'utf8');
          const parsed = parseMarkdownFrontmatter(boardContent);
          boardState = parsed.frontmatter;
        } catch (err) {
          // Avoid crashing if partial write is ongoing
        }
      }

      wsBroadcaster({
        type: 'workspace_update',
        file: relativePath,
        event,
        projectState,
        boardState
      });
    };

    this.watcher
      .on('add', (p: string) => handleEvent('add', p))
      .on('change', (p: string) => handleEvent('change', p))
      .on('unlink', (p: string) => handleEvent('unlink', p))
      .on('error', (error: Error) => console.error(`FileWatcher Error: ${error}`));
  }

  public close(): void {
    this.watcher.close();
  }
}
