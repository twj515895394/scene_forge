import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface ChatBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text' | 'system';
  content: string;
  timestamp: string;
}

interface StageState {
  stage: string;
  status: 'ready' | 'in_progress' | 'review_failed' | 'validated' | 'completed';
  updated_at: string;
  started_at?: string;
  completed_at?: string;
  handoff_path?: string;
  validation_result_path?: string;
}

interface ProjectState {
  project: string;
  current_stage?: string;
  stages: Record<string, StageState>;
}

const STAGES = [
  'topic_gate',
  'script',
  'performance',
  'audio',
  'storyboard',
  'video_prompts',
  'publish_review'
];

const STAGE_NAMES: Record<string, string> = {
  topic_gate: 'Topic Gate (选题/吸入)',
  script: 'Script (剧本开发)',
  performance: 'Performance (表演导演)',
  audio: 'Audio (声音导演)',
  storyboard: 'Storyboard (分镜故事板)',
  video_prompts: 'Video Prompts (视频提示词)',
  publish_review: 'Publish Review (发布评审)'
};

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState | null>(null);
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [activeStage, setActiveStage] = useState<string>('storyboard');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewPath, setPreviewPath] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});

  const wsRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Establish WebSocket Connection
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname === 'localhost' ? 'localhost:3000' : window.location.host;
    const wsUrl = `${protocol}//${host}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('open');
      console.log('WS Connection Open');
      // Fetch initial status
      ws.send(JSON.stringify({ type: 'stdin', data: 'npx scene-forge status --json\n' }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === 'output') {
          if (payload.bubbles && payload.bubbles.length > 0) {
            setBubbles((prev) => {
              // Merge bubbles based on id
              const bubbleMap = new Map(prev.map(b => [b.id, b]));
              payload.bubbles.forEach((b: ChatBubble) => bubbleMap.set(b.id, b));
              return Array.from(bubbleMap.values());
            });
          }
        } else if (payload.type === 'workspace_update') {
          console.log('Workspace update notified:', payload.file);
          if (payload.projectState) {
            setProjectState(payload.projectState);
          }
          // If the active preview file changed, reload it
          if (payload.file && payload.file.includes(activeStage)) {
            fetchPreviewFile(payload.file);
          }
        }
      } catch (err) {
        // Fallback for raw terminal streaming
      }
    };

    ws.onclose = () => {
      setConnectionStatus('closed');
      console.log('WS Connection Closed');
    };

    return () => {
      ws.close();
    };
  }, [activeStage]);

  // Scroll chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bubbles]);

  // Load preview document
  const fetchPreviewFile = async (filePath: string) => {
    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
      if (res.ok) {
        const text = await res.text();
        setPreviewContent(text);
        setPreviewPath(filePath);
      } else {
        setPreviewContent(`*Artifact file is not physically written yet.*\nPath: ${filePath}`);
        setPreviewPath(filePath);
      }
    } catch (err) {
      setPreviewContent(`Failed to load preview document: ${(err as Error).message}`);
    }
  };

  // Switch preview stage
  useEffect(() => {
    // Attempt to locate final output matching current stage
    let foundPath = `outputs/${activeStage}_pack_001_cn.md`;
    if (activeStage === 'topic_gate') foundPath = 'outputs/topic.md';
    if (activeStage === 'script') foundPath = 'outputs/script.md';
    if (activeStage === 'publish_review') foundPath = 'outputs/publish_review.md';

    fetchPreviewFile(foundPath);
  }, [activeStage, projectState]);

  // Trigger macro actions (starts, validates, completes)
  const sendMacro = (action: 'start' | 'validate' | 'complete', stage: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'macro',
        action,
        stage
      }));
    }
  };

  // Keystroke stdin
  const handleSend = () => {
    if (!inputVal.trim()) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'stdin',
        data: inputVal + '\n'
      }));
      // Echo user message to local chat bubble list
      setBubbles((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          type: 'text',
          content: `> ${inputVal}`,
          timestamp: new Date().toISOString()
        }
      ]);
      setInputVal('');
    }
  };

  const toggleThought = (id: string) => {
    setExpandedThoughts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Micro rendering helper for simple Markdown formatting
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    // Basic escapes and bullet lists
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
      .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
      .replace(/^\- (.*$)/gim, '<li class="md-li">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="md-code">$1</code>');
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="console-container">
      {/* 1. Header Navigation Bar */}
      <header className="console-header">
        <div className="logo-group">
          <div className="logo-pulse"></div>
          <h1>SceneForge <span>v9</span> Console</h1>
        </div>
        <div className="status-badge">
          <span className={`dot ${connectionStatus}`}></span>
          {connectionStatus === 'open' ? 'Service Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
        </div>
      </header>

      {/* 2. Main Three-Panel Viewport */}
      <main className="console-main">
        
        {/* Left Column: Pipeline 看板 */}
        <section className="column pipeline-panel">
          <div className="panel-title">Pipeline Gate Pipeline</div>
          <div className="stage-list">
            {STAGES.map((stg) => {
              const state = projectState?.stages[stg];
              const status = state?.status || 'ready';
              const isActive = projectState?.current_stage === stg;
              
              return (
                <div 
                  key={stg} 
                  className={`stage-card ${status} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStage(stg)}
                >
                  <div className="stage-info">
                    <span className={`status-indicator ${status}`}></span>
                    <span className="stage-name">{STAGE_NAMES[stg]}</span>
                  </div>
                  <div className="stage-actions" onClick={(e) => e.stopPropagation()}>
                    {status === 'ready' && (
                      <button className="btn-action start" onClick={() => sendMacro('start', stg)}>Start</button>
                    )}
                    {(status === 'in_progress' || status === 'review_failed') && (
                      <>
                        <button className="btn-action validate" onClick={() => sendMacro('validate', stg)}>Validate</button>
                        <button className="btn-action complete" onClick={() => sendMacro('complete', stg)}>Complete</button>
                      </>
                    )}
                    {status === 'completed' && <span className="completed-badge">Completed</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Center Column: Chat 终端对话 */}
        <section className="column chat-panel">
          <div className="panel-title">Interactive Agent Session</div>
          <div className="chat-viewport">
            {bubbles.map((b) => {
              if (b.type === 'thought') {
                const expanded = expandedThoughts[b.id];
                return (
                  <div key={b.id} className="chat-bubble thought-bubble">
                    <div className="bubble-header" onClick={() => toggleThought(b.id)}>
                      <span>⚡ Agent Thinking Process</span>
                      <span className="toggle-btn">{expanded ? 'Collapse' : 'Expand'}</span>
                    </div>
                    {expanded && <pre className="thought-body">{b.content.trim()}</pre>}
                  </div>
                );
              }
              if (b.type === 'tool_call') {
                return (
                  <div key={b.id} className="chat-bubble tool-bubble">
                    <div className="bubble-header">⚙️ Executing System Command</div>
                    <pre className="tool-body">{b.content.trim()}</pre>
                  </div>
                );
              }
              return (
                <div key={b.id} className="chat-bubble text-bubble">
                  <pre className="text-body">{b.content}</pre>
                </div>
              );
            })}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chat-input-bar">
            <input 
              type="text" 
              placeholder="Ask Agent or input command..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>Send</button>
          </div>
        </section>

        {/* Right Column: Markdown 预览 / Diff */}
        <section className="column preview-panel">
          <div className="panel-title">Artifact Preview Zone</div>
          <div className="preview-meta">
            <span className="file-icon">📄</span>
            <span className="file-path">{previewPath || 'No file selected'}</span>
          </div>
          <div className="preview-viewport">
            {renderMarkdown(previewContent)}
          </div>
        </section>

      </main>
    </div>
  );
}
