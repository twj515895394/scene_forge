import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import VariantA from './VariantA';
import VariantB from './VariantB';
import VariantC from './VariantC';
import PrototypeSwitcher from './PrototypeSwitcher';


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

  const [variant, setVariant] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('variant') || 'A';
  });

  const handleVariantChange = (newVariant: string) => {
    setVariant(newVariant);
    const params = new URLSearchParams(window.location.search);
    params.set('variant', newVariant);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

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
    setActiveStage,
    previewContent,
    previewPath,
    connectionStatus,
    expandedThoughts,
    toggleThought,
    sendMacro,
    handleSend,
    renderMarkdown
  };

  const variantsList = [
    { key: 'A', name: 'Cinema Classic Dark' },
    { key: 'B', name: 'Swiss Neo-Geek Grid' },
    { key: 'C', name: 'Director\'s Multi-track' }
  ];

  return (
    <>
      {variant === 'A' && <VariantA {...variantProps} />}
      {variant === 'B' && <VariantB {...variantProps} />}
      {variant === 'C' && <VariantC {...variantProps} />}
      <PrototypeSwitcher
        variants={variantsList}
        current={variant}
        onChange={handleVariantChange}
      />
    </>
  );
}
