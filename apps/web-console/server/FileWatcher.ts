import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';

export class FileWatcher {
  private watcher: chokidar.FSWatcher;

  constructor(projectPath: string, wsBroadcaster: (msg: any) => void) {
    const resolvedPath = path.resolve(projectPath);

    // Watch outputs/, details/ and PROJECT_STATE.json
    const pathsToWatch = [
      path.join(resolvedPath, 'outputs'),
      path.join(resolvedPath, 'details'),
      path.join(resolvedPath, 'PROJECT_STATE.json')
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

      wsBroadcaster({
        type: 'workspace_update',
        file: relativePath,
        event,
        projectState
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
