import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import fs from 'fs';
import { TerminalBridge } from './TerminalBridge.js';
import { OutputParser } from './OutputParser.js';
import { FileWatcher } from './FileWatcher.js';
import { engineVersion } from '@scene-forge/engine';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

console.log(`Starting Web Console Server (Engine v${engineVersion})...`);

// Allow CORS for development SPA access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve front-end static files in production
const distPath = path.resolve('./dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 1. File fetch API for GUI sidebar rendering
app.get('/api/file', (req, res) => {
  const filePath = req.query.path as string;
  if (!filePath) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }
  const fullPath = path.resolve(process.cwd(), filePath);
  
  // Sandbox boundary check to prevent traversal leaks
  if (!fullPath.startsWith(process.cwd())) {
    return res.status(403).json({ error: 'Access Denied' });
  }
  
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected to Web Console WebSocket.');

  const parser = new OutputParser();
  const terminal = new TerminalBridge(process.cwd());
  
  // Set up FileWatcher for hot reload push
  const watcher = new FileWatcher(process.cwd(), (msg: any) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  });

  // Listen to PTY outputs
  terminal.onData((data: string) => {
    const bubbles = parser.feed(data);
    
    // Broadcast both raw stream data (for xterm.js) and structured chat bubbles
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'output',
        raw: data,
        bubbles
      }));
    }
  });

  // Listen to UI control signals or stdin keystrokes
  ws.on('message', (message: string) => {
    try {
      const payload = JSON.parse(message);
      
      switch (payload.type) {
        case 'stdin':
          if (typeof payload.data === 'string') {
            terminal.write(payload.data);
          }
          break;

        case 'resize':
          if (typeof payload.cols === 'number' && typeof payload.rows === 'number') {
            terminal.resize(payload.cols, payload.rows);
          }
          break;

        case 'macro':
          const { action, stage } = payload;
          if (action && stage) {
            let command = '';
            if (action === 'start') {
              command = `npx scene-forge start --stage ${stage}\n`;
            } else if (action === 'validate') {
              command = `npx scene-forge validate --stage ${stage}\n`;
            } else if (action === 'complete') {
              command = `npx scene-forge complete --stage ${stage}\n`;
            }
            if (command) {
              console.log(`Injecting macro command: ${command.trim()}`);
              terminal.write(command);
            }
          }
          break;

        default:
          console.warn('Unknown message type received:', payload.type);
      }
    } catch (err) {
      terminal.write(message.toString());
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected. Releasing resources.');
    terminal.kill();
    watcher.close();
  });
});

server.listen(PORT, () => {
  console.log(`Web Console Service is active on http://localhost:${PORT}`);
});
