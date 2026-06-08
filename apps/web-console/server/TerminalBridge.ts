import * as pty from 'node-pty';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import path from 'path';

export class TerminalBridge {
  private ptyProcess?: pty.IPty;
  private mockProcess?: ChildProcessWithoutNullStreams;
  private isMock: boolean = false;

  constructor(cwd: string, shell?: string, args: string[] = []) {
    const isWin = process.platform === 'win32';
    const defaultShell = isWin ? 'powershell.exe' : 'zsh';
    const targetShell = shell || (process.env.SHELL || defaultShell);

    try {
      this.ptyProcess = pty.spawn(targetShell, args, {
        name: 'xterm-256color',
        cols: 80,
        rows: 24,
        cwd: path.resolve(cwd),
        env: process.env as Record<string, string>
      });
      this.isMock = false;
    } catch (err) {
      console.warn(`node-pty spawn failed: ${(err as Error).message}. Falling back to native child_process.`);
      this.isMock = true;
      // Fallback to spawning native shell
      // Use absolute path targetShell or system executable directly
      this.mockProcess = spawn(targetShell, args, {
        cwd: path.resolve(cwd),
        env: process.env
      });
    }
  }

  public write(data: string): void {
    if (this.isMock && this.mockProcess) {
      this.mockProcess.stdin.write(data);
    } else if (this.ptyProcess) {
      this.ptyProcess.write(data);
    }
  }

  public resize(cols: number, rows: number): void {
    if (!this.isMock && this.ptyProcess) {
      this.ptyProcess.resize(cols, rows);
    }
  }

  public onData(callback: (data: string) => void): { dispose: () => void } {
    if (this.isMock && this.mockProcess) {
      const onStdout = (data: Buffer) => callback(data.toString());
      const onStderr = (data: Buffer) => callback(data.toString());

      this.mockProcess.stdout.on('data', onStdout);
      this.mockProcess.stderr.on('data', onStderr);

      return {
        dispose: () => {
          if (this.mockProcess) {
            this.mockProcess.stdout.off('data', onStdout);
            this.mockProcess.stderr.off('data', onStderr);
          }
        }
      };
    } else if (this.ptyProcess) {
      return this.ptyProcess.onData(callback);
    }
    return { dispose: () => {} };
  }

  public kill(): void {
    if (this.isMock && this.mockProcess) {
      try {
        this.mockProcess.kill();
      } catch (err) {
        // Safe ignore
      }
    } else if (this.ptyProcess) {
      try {
        this.ptyProcess.kill();
      } catch (err) {
        // Safe ignore
      }
    }
  }
}
