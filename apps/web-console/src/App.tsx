import React, { useState, useEffect, useRef } from 'react';
import VariantB from './VariantB';
import Lobby from './Lobby';


interface ChatBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text' | 'system' | 'prompt_ui';
  content: string;
  timestamp: string;
  answered?: boolean;
  selectedOptionLabel?: string;
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
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Permission bypass preference
  const [bypassPermissions, setBypassPermissions] = useState<boolean>(() => {
    return localStorage.getItem('bypassPermissions') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('bypassPermissions', String(bypassPermissions));
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ bypassPermissions }));
    }
  }, [bypassPermissions]);

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
      console.log('[loadSession]', data.messages?.length, 'messages from API');
      // Convert session messages to ChatBubble format
      const loaded: ChatBubble[] = [];
      for (const msg of data.messages) {
        if (msg.role === 'user') {
          loaded.push({
            id: `hist-u-${sessionId.slice(0,4)}-${loaded.length}`,
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
                id: `hist-t-${loaded.length}`,
                type: 'thought',
                content: part.replace(/<\/?thought>/g, ''),
                timestamp: msg.timestamp
              });
            } else if (part.trim()) {
              const isToolCall = part.trim().startsWith('[tool_call:');
              loaded.push({
                id: `hist-a-${loaded.length}`,
                type: isToolCall ? 'tool_call' : 'text',
                content: part.trim(),
                timestamp: msg.timestamp
              });
            }
          }
        }
      }
      console.log('[loadSession]', loaded.length, 'bubbles created:', loaded.map(b => b.type).join(','));
      setBubbles(loaded);
      setCurrentSessionId(sessionId);
      setShowHistory(false);

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'load_session', sessionId }));
      }
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
      // Sync dynamic settings on connect
      ws.send(JSON.stringify({ bypassPermissions }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === 'session_init') {
          setCurrentSessionId(payload.sessionId);
        } else if (payload.type === 'output') {
          if (payload.bubbles && payload.bubbles.length > 0) {
            setBubbles((prev) => {
              // Merge bubbles based on id
              const bubbleMap = new Map(prev.map(b => [b.id, b]));
              payload.bubbles.forEach((b: ChatBubble) => bubbleMap.set(b.id, b));
              return Array.from(bubbleMap.values());
            });
          }
        } else if (payload.type === 'prompt_ui') {
          setBubbles((prev) => {
            const bubbleMap = new Map(prev.map(b => [b.id, b]));
            bubbleMap.set(payload.id, {
              id: payload.id,
              type: 'prompt_ui',
              content: JSON.stringify(payload),
              timestamp: new Date().toISOString()
            });
            return Array.from(bubbleMap.values());
          });
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
        stage,
        bypassPermissions
      }));
    }
  };

  const handlePromptSubmit = (bubbleId: string, optionId: string, optionLabel: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'prompt_response', value: optionId }));
      
      // Update bubble state locally to mark it answered
      setBubbles((prev) =>
        prev.map((b) => {
          if (b.id === bubbleId) {
            return {
              ...b,
              answered: true,
              selectedOptionLabel: optionLabel,
            };
          }
          return b;
        })
      );
    }
  };

  const hasPendingPrompt = bubbles.some(b => b.type === 'prompt_ui' && !b.answered);

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
  const handleSend = (overrideText?: string | React.MouseEvent) => {
    const text = typeof overrideText === 'string' ? overrideText : inputVal;
    if (!text || !text.trim()) return;
    const textToSend = text.trim();
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const forceBypass = typeof overrideText === 'string' ? true : bypassPermissions;
      wsRef.current.send(JSON.stringify({
        type: 'stdin',
        data: textToSend + '\n',
        bypassPermissions: forceBypass
      }));
      // Echo user message to local chat bubble list
      setBubbles((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          type: 'text',
          content: `> ${textToSend}`,
          timestamp: new Date().toISOString()
        }
      ]);
      if (typeof overrideText !== 'string') {
        setInputVal('');
      }
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
      // Code blocks first (before other transformations)
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="md-code-block"><code>$2</code></pre>')
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
      // Unordered lists — wrap consecutive <li> in <ul>
      .replace(/^- (.*$)/gim, '<li class="md-li">$1</li>')
      // Tables: match one or more table rows (lines starting and ending with |)
      .replace(/((?:^\|.*\|$\n?)+)/gm, (tableBlock: string) => {
        const rows = tableBlock.trim().split('\n');
        if (rows.length < 2) return tableBlock;
        let tableHtml = '<table class="md-table">';
        // First row = header
        tableHtml += '<thead><tr>' + rows[0]
          .split('|').filter(c => c.trim())
          .map(c => `<th>${c.trim()}</th>`).join('') + '</tr></thead>';
        // Skip separator row (|---|---|), render remaining as body
        const bodyRows = rows.filter((_, i) => i > 0 && !/^[\|\-\s:]+$/.test(rows[i]));
        if (bodyRows.length > 0) {
          tableHtml += '<tbody>' + bodyRows.map(row =>
            '<tr>' + row.split('|').filter(c => c.trim())
              .map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
          ).join('') + '</tbody>';
        }
        tableHtml += '</table>';
        return tableHtml;
      })
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

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
    currentSessionId,
    onLoadSession: handleLoadSession,
    renderMarkdown,
    onReturnLobby: handleReturnToLobby,
    bypassPermissions,
    setBypassPermissions,
    chatEndRef,
    hasPendingPrompt,
    onPromptSubmit: handlePromptSubmit
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
