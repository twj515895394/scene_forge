import React, { useState, useEffect, useRef } from 'react';
import VariantB from './VariantB';
import Lobby from './Lobby';


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

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState | null>(null);
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [inputVal, setInputVal] = useState('');
  // activeStage 自动跟随项目状态，不允许手动选择
  const activeStage = projectState?.current_stage
    || (projectState ? Object.entries(projectState.stages).find(([,s]) => s.status !== 'completed')?.[0] : null)
    || 'topic_gate';
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewPath, setPreviewPath] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const [agentRunning, setAgentRunning] = useState(false);

  const [activeProject, setActiveProject] = useState<{ active: boolean; projectSlug?: string } | null>(null);

  // Session history
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const fetchSessions = async () => {
    setSessionsLoading(true);
    try {
      const res = await fetch('/api/sessions');
      if (res.ok) setSessions(await res.json());
    } catch { /* */ }
    finally { setSessionsLoading(false); }
  };

  // Load sessions when entering workspace
  useEffect(() => {
    if (activeProject?.active) fetchSessions();
  }, [activeProject?.active, activeProject?.projectSlug]);

  const handleLoadSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`);
      if (!res.ok) return;
      const data = await res.json();
      // Convert session messages to ChatBubble format
      const loaded: ChatBubble[] = [];
      for (const msg of data.messages) {
        if (msg.role === 'user') {
          loaded.push({
            id: `hist-u-${Date.now()}-${loaded.length}`,
            type: 'text',
            content: `> ${msg.content}`,
            timestamp: msg.timestamp
          });
        } else {
          // Parse <thought> blocks from assistant content
          const parts = msg.content.split(/(<thought>[\s\S]*?<\/thought>)/g);
          for (const part of parts) {
            if (part.startsWith('<thought>')) {
              loaded.push({
                id: `hist-t-${Date.now()}-${loaded.length}`,
                type: 'thought',
                content: part.replace(/<\/?thought>/g, ''),
                timestamp: msg.timestamp
              });
            } else if (part.trim()) {
              loaded.push({
                id: `hist-a-${Date.now()}-${loaded.length}`,
                type: 'text',
                content: part.trim(),
                timestamp: msg.timestamp
              });
            }
          }
        }
      }
      setBubbles(loaded);
      setShowHistory(false);
    } catch (err) {
      console.error('Failed to load session:', err);
    }
  };

  // Check initial active project on mount
  useEffect(() => {
    let cancelled = false;
    const checkActive = async () => {
      try {
        const res = await fetch('/api/projects/active');
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json();
            setActiveProject(data);
            if (data.active && data.state) {
              setProjectState(data.state);
            }
          } else {
            setActiveProject({ active: false });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setActiveProject({ active: false });
        }
      }
    };
    checkActive();
    return () => { cancelled = true; };
  }, []);

  const handleLaunchProject = async (slug: string) => {
    try {
      const res = await fetch('/api/projects/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug: slug })
      });
      if (res.ok) {
        const data = await res.json();
        setActiveProject({ active: true, projectSlug: slug });
        if (data.state) {
          setProjectState(data.state);
        }
        setBubbles([]); // Reset bubbles for the new project context
      }
    } catch (err) {
      console.error('Failed to launch project:', err);
    }
  };

  const handleReturnToLobby = async () => {
    try {
      await fetch('/api/projects/active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug: null })
      });
      setActiveProject({ active: false });
      setProjectState(null);
      setBubbles([]);
    } catch (err) {
      console.error('Failed to return to lobby:', err);
    }
  };

  const wsRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Establish WebSocket Connection
  useEffect(() => {
    if (!activeProject || !activeProject.active) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname === 'localhost' ? 'localhost:4399' : window.location.host;
    const wsUrl = `${protocol}//${host}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('open');
      console.log('WS Connection Open');
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
        } else if (payload.type === 'run_status') {
          setAgentRunning(payload.running === true);
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
  }, [activeStage, activeProject]);

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
        if (text.trim().startsWith('<!DOCTYPE html>')) {
          setPreviewContent(`*此阶段的物理产物文件尚未正式生成。*\n\n您可以在当前阶段点击 **[确认提交 (Complete)]**，或者与 AI 导演对话将产物写盘，然后在此处预览。`);
        } else {
          setPreviewContent(text);
        }
        setPreviewPath(filePath);
      } else {
        setPreviewContent(`*此阶段的物理产物文件尚未生成。*\n\n您可以在当前阶段点击 **[确认提交 (Complete)]**，或者与 AI 导演对话将产物写盘，然后在此处预览。\n\n物理路径: ${filePath}`);
        setPreviewPath(filePath);
      }
    } catch (err) {
      setPreviewContent(`加载预览文档失败: ${(err as Error).message}`);
    }
  };

  // Switch preview stage
  useEffect(() => {
    if (!activeProject || !activeProject.active) return;
    let isMounted = true;
    const loadArtifact = async () => {
      try {
        const res = await fetch(`/api/artifacts?stage=${encodeURIComponent(activeStage)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch artifacts list');
        }
        interface Artifact {
          id: string;
          stage: string;
          kind: 'preview' | 'draft' | 'review' | 'final';
          path: string;
        }
        const artifacts: Artifact[] = await res.json();
        
        if (!isMounted) return;

        if (artifacts.length === 0) {
          setPreviewContent(`*此阶段尚未登记任何产物文件.*\n(您可以执行 Start/Complete 来生成产物)`);
          setPreviewPath('');
          return;
        }

        // Priority order: final -> review -> draft -> preview
        const priority: Record<string, number> = { final: 4, review: 3, draft: 2, preview: 1 };
        const sorted = [...artifacts].sort((a, b) => (priority[b.kind] || 0) - (priority[a.kind] || 0));
        const bestArtifact = sorted[0];

        fetchPreviewFile(bestArtifact.path);
      } catch (err) {
        if (isMounted) {
          // Fallback logic in case API fails
          let foundPath = `outputs/${activeStage}_pack_001_cn.md`;
          if (activeStage === 'topic_gate') foundPath = 'outputs/topic.md';
          if (activeStage === 'script') foundPath = 'outputs/script.md';
          if (activeStage === 'publish_review') foundPath = 'outputs/publish_review.md';
          fetchPreviewFile(foundPath);
        }
      }
    };

    loadArtifact();

    return () => {
      isMounted = false;
    };
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

  // Cancel current Claude operation (Ctrl+C — keeps session alive)
  const handleCancel = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'cancel' }));
    }
  };

  // Start a fresh Claude session
  const handleNewSession = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'new_session' }));
    }
    setBubbles([]);
    fetchSessions(); // Refresh history list
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

  const variantProps = {
    projectState,
    bubbles,
    inputVal,
    setInputVal,
    activeStage,
    previewContent,
    previewPath,
    connectionStatus,
    expandedThoughts,
    toggleThought,
    sendMacro,
    handleSend,
    handleCancel,
    handleNewSession,
    agentRunning,
    sessions,
    sessionsLoading,
    showHistory,
    setShowHistory,
    onLoadSession: handleLoadSession,
    renderMarkdown,
    onReturnLobby: handleReturnToLobby
  };

  if (activeProject === null) {
    return (
      <div className="lobby-loading" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#050508' }}>
        <div className="apple-spinner"></div>
        <p style={{ color: '#fff', textAlign: 'center', marginTop: '20px', fontFamily: 'SF Pro Text, sans-serif', fontSize: '13px' }}>正在加载 SceneForge 工作区...</p>
      </div>
    );
  }

  if (!activeProject.active) {
    return <Lobby onSelectProject={handleLaunchProject} />;
  }

  return <VariantB {...variantProps} />;
}
