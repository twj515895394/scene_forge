import React, { useState, useEffect, useRef } from 'react';
import VariantB from './VariantB';
import Lobby from './Lobby';
import { isChatContentRenderable, stripChatNoiseLines, summarizeChatNoise } from './lib/chatSanitizer';


interface ChatBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text' | 'system' | 'prompt_ui';
  content: string;
  timestamp: string;
  answered?: boolean;
  selectedOptionLabel?: string;
  thoughtStatus?: 'streaming' | 'resolved';
  durationMs?: number;
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

const CLI_TO_UI_STAGE_MAP: Record<string, string> = {
  topic_gate: 'topic',
  script: 'script',
  performance: 'performance',
  audio: 'audio',
  storyboard: 'storyboard',
  video_prompts: 'video_prompts',
  publish_review: 'publish'
};

function previewDebugContent(value: string, length = 80): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, length);
}

function debugChatEvent(label: string, payload: Record<string, unknown>) {
  console.log(`[DEBUG-chatdiag] ${label}`, payload);
}

function normalizeBubbleTextForMerge(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function dedupeConsecutiveTextBubbles<T extends ChatBubble>(items: T[]): T[] {
  const next: T[] = [];

  for (const bubble of items) {
    if (bubble.type !== 'text') {
      next.push(bubble);
      continue;
    }

    const normalized = normalizeBubbleTextForMerge(bubble.content);
    const previous = next[next.length - 1];
    if (
      normalized &&
      previous?.type === 'text' &&
      normalizeBubbleTextForMerge(previous.content) === normalized
    ) {
      continue;
    }
    if (normalized && previous?.type === 'text') {
      const previousNormalized = normalizeBubbleTextForMerge(previous.content);
      if (normalized.length > previousNormalized.length && normalized.startsWith(previousNormalized)) {
        next[next.length - 1] = bubble;
        continue;
      }
      if (previousNormalized.startsWith(normalized)) {
        continue;
      }
    }

    next.push(bubble);
  }

  return next;
}

function normalizeIncomingHistoryBubbles(items: ChatBubble[]): ChatBubble[] {
  return items.map((bubble) => {
    if (bubble.type !== 'thought') {
      return bubble;
    }
    return {
      ...bubble,
      thoughtStatus: bubble.thoughtStatus ?? 'resolved',
    };
  });
}

function prepareOutputBubble(bubble: ChatBubble): ChatBubble {
  if (bubble.type !== 'thought') {
    return bubble;
  }
  return {
    ...bubble,
    thoughtStatus: bubble.thoughtStatus ?? 'streaming',
  };
}

function resolveThoughtBubbles(items: ChatBubble[], resolvedAt = Date.now()): ChatBubble[] {
  return items.map((bubble) => {
    if (bubble.type !== 'thought' || bubble.thoughtStatus === 'resolved') {
      return bubble;
    }

    const startedAt = Date.parse(bubble.timestamp);
    const durationMs = Number.isFinite(startedAt)
      ? Math.max(0, resolvedAt - startedAt)
      : bubble.durationMs;

    return {
      ...bubble,
      thoughtStatus: 'resolved',
      durationMs,
    };
  });
}


function summarizeChatRenderableArtifacts(value: string) {
  return summarizeChatNoise(value);
}

function logRenderableBubbleDiagnostics(source: 'history' | 'output', bubbles: ChatBubble[]) {
  const suspicious = bubbles
    .filter((bubble) => bubble.type === 'text' && typeof bubble.content === 'string')
    .map((bubble) => ({
      id: bubble.id,
      preview: previewDebugContent(bubble.content, 140),
      ...summarizeChatRenderableArtifacts(bubble.content),
    }))
    .filter((bubble) =>
      bubble.separatorLineCount > 0 ||
      bubble.tableDelimiterCount > 0 ||
      bubble.blankRunCount > 0 ||
      bubble.sanitizedEmpty
    );

  if (suspicious.length > 0) {
    debugChatEvent(`renderable.${source}`, {
      total: bubbles.length,
      suspicious: suspicious.slice(0, 12),
    });
  }
}

function getProjectBypassStorageKey(projectSlug: string): string {
  return `bypassPermissions:${projectSlug}`;
}

function getProjectBypassDefault(projectSlug?: string): boolean {
  return projectSlug ? true : true;
}

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState | null>(null);
  const [boardState, setBoardState] = useState<any>(null);
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [inputVal, setInputVal] = useState('');
  // activeStage 自动跟随项目状态，不允许手动选择
  const rawStage = projectState?.current_stage
    || (projectState ? Object.entries(projectState.stages).find(([,s]) => s.status !== 'completed')?.[0] : null)
    || 'topic_gate';
  const activeStage = CLI_TO_UI_STAGE_MAP[rawStage] || rawStage || 'topic';

  const activeStageRef = useRef(activeStage);
  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

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
    const stored = localStorage.getItem('bypassPermissions');
    if (stored === 'true' || stored === 'false') {
      return stored === 'true';
    }
    return true;
  });

  const bypassPermissionsRef = useRef(bypassPermissions);
  useEffect(() => {
    bypassPermissionsRef.current = bypassPermissions;
  }, [bypassPermissions]);

  useEffect(() => {
    const projectSlug = activeProject?.active ? activeProject.projectSlug : undefined;
    if (projectSlug) {
      localStorage.setItem(getProjectBypassStorageKey(projectSlug), String(bypassPermissions));
    }
    localStorage.setItem('bypassPermissions', String(bypassPermissions));
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ bypassPermissions }));
    }
  }, [activeProject?.active, activeProject?.projectSlug, bypassPermissions]);

  useEffect(() => {
    if (!activeProject?.active || !activeProject.projectSlug) {
      return;
    }

    const projectKey = getProjectBypassStorageKey(activeProject.projectSlug);
    const storedProjectValue = localStorage.getItem(projectKey);
    if (storedProjectValue === 'true' || storedProjectValue === 'false') {
      setBypassPermissions(storedProjectValue === 'true');
      return;
    }

    const nextValue = getProjectBypassDefault(activeProject.projectSlug);
    setBypassPermissions(nextValue);
  }, [activeProject?.active, activeProject?.projectSlug]);

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
      debugChatEvent('load_session.api', {
        sessionId,
        count: data.bubbles?.length ?? 0,
        sample: Array.isArray(data.bubbles)
          ? data.bubbles.slice(0, 6).map((bubble: ChatBubble) => ({
              id: bubble.id,
              type: bubble.type,
              preview: previewDebugContent(bubble.content),
            }))
          : [],
      });

      if (data.bubbles) {
        setBubbles(normalizeIncomingHistoryBubbles(data.bubbles));
      }

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
            if (data.active) {
              if (data.state) {
                setProjectState(data.state);
              }
              if (data.boardState) {
                setBoardState(data.boardState);
              }
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
        if (data.boardState) {
          setBoardState(data.boardState);
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
      setBoardState(null);
      setBubbles([]);
    } catch (err) {
      console.error('Failed to return to lobby:', err);
    }
  };

  const handleExecutionModeChange = async (mode: 'fast_production' | 'full_auto') => {
    try {
      const res = await fetch('/api/projects/active/execution-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode }),
      });
      if (!res.ok) {
        throw new Error('Failed to update execution policy');
      }
      const data = await res.json();
      if (data.boardState) {
        setBoardState(data.boardState);
      }
      setBubbles((prev) => [
        ...prev,
        {
          id: `system-execution-policy-${Date.now()}`,
          type: 'system',
          content: mode === 'full_auto'
            ? '已切换为全自动模式：topic_gate + script/adaptation 确认后，后续阶段将自动执行，硬错误才暂停。'
            : '已切换为快速执行模式：关键创作阶段保留确认，执行型阶段自动落盘汇报。',
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error('Failed to update execution policy:', err);
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

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 25000);

    ws.onopen = () => {
      setConnectionStatus('open');
      console.log('WS Connection Open');
      // Sync dynamic settings on connect
      ws.send(JSON.stringify({ bypassPermissions: bypassPermissionsRef.current }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === 'session_init') {
          setCurrentSessionId(payload.sessionId);
        } else if (payload.type === 'history') {
          if (payload.bubbles) {
            logRenderableBubbleDiagnostics('history', payload.bubbles);
            debugChatEvent('ws.history', {
              count: payload.bubbles.length,
              sample: payload.bubbles.slice(0, 6).map((bubble: ChatBubble) => ({
                id: bubble.id,
                type: bubble.type,
                preview: previewDebugContent(bubble.content),
              })),
            });
            setBubbles(dedupeConsecutiveTextBubbles(normalizeIncomingHistoryBubbles(payload.bubbles)));
          }
        } else if (payload.type === 'output') {
          if (payload.bubbles && payload.bubbles.length > 0) {
            logRenderableBubbleDiagnostics('output', payload.bubbles);
            setBubbles((prev) => {
              const incomingBubbles = payload.bubbles.map(prepareOutputBubble);
              const hasFinalText = incomingBubbles.some((bubble: ChatBubble) => bubble.type === 'text');
              debugChatEvent('ws.output.before_merge', {
                prevCount: prev.length,
                incomingCount: incomingBubbles.length,
                incoming: incomingBubbles.map((bubble: ChatBubble) => ({
                  id: bubble.id,
                  type: bubble.type,
                  thoughtStatus: bubble.thoughtStatus,
                  preview: previewDebugContent(bubble.content),
                })),
              });
              // Merge bubbles based on id
              const bubbleMap = new Map(prev.map(b => [b.id, b]));
              incomingBubbles.forEach((b: ChatBubble) => bubbleMap.set(b.id, b));
              const merged = Array.from(bubbleMap.values());
              const next = dedupeConsecutiveTextBubbles(hasFinalText ? resolveThoughtBubbles(merged) : merged);
              debugChatEvent('ws.output.after_merge', {
                nextCount: next.length,
                duplicatesByContent: next
                  .map((bubble) => ({
                    id: bubble.id,
                    type: bubble.type,
                    normalized: previewDebugContent(bubble.content, 160),
                  }))
                  .filter((bubble, index, arr) =>
                    arr.findIndex((candidate) =>
                      candidate.type === bubble.type && candidate.normalized === bubble.normalized
                    ) !== index
                  ),
              });
              return next;
            });
          }
        } else if (payload.type === 'prompt_ui') {
          debugChatEvent('ws.prompt_ui', {
            id: payload.id,
            title: payload.title,
            options: payload.options?.map((option: { value: string }) => option.value) ?? [],
          });
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
        } else if (payload.type === 'prompt_ui_resolved') {
          setBubbles((prev) =>
            prev.map((b) => {
              if (b.id !== payload.id) {
                return b;
              }
              return {
                ...b,
                answered: true,
                selectedOptionLabel: payload.selectedOptionLabel ?? b.selectedOptionLabel ?? '已处理',
              };
            })
          );
        } else if (payload.type === 'prompt_ui_dismissed') {
          setBubbles((prev) =>
            prev.filter((b) => !(b.type === 'prompt_ui' && b.id === payload.id && !b.answered))
          );
        } else if (payload.type === 'run_status') {
          setAgentRunning(payload.running === true);
          if (payload.running !== true) {
            setBubbles((prev) => resolveThoughtBubbles(prev));
          }
        } else if (payload.type === 'workspace_update') {
          console.log('Workspace update notified:', payload.file);
          if (payload.projectState) {
            setProjectState(payload.projectState);
          }
          if (payload.boardState) {
            setBoardState(payload.boardState);
          }
          // If the active preview file changed, reload it
          if (payload.file && payload.file.includes(activeStageRef.current)) {
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
      clearInterval(pingInterval);
      ws.onmessage = null;
      ws.onclose = null;
      ws.onerror = null;
      ws.close();
    };
  }, [activeProject]);

  // Scroll chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bubbles]);

  useEffect(() => {
    const emptyCandidates = bubbles
      .filter((bubble) => !bubble.content || !bubble.content.trim())
      .map((bubble) => ({ id: bubble.id, type: bubble.type }));
    const normalizedDuplicates = bubbles
      .map((bubble) => ({
        id: bubble.id,
        type: bubble.type,
        normalized: previewDebugContent(bubble.content, 160),
      }))
      .filter((bubble, index, arr) =>
        bubble.normalized &&
        arr.findIndex((candidate) =>
          candidate.type === bubble.type && candidate.normalized === bubble.normalized
        ) !== index
      );

    debugChatEvent('bubbles.state', {
      total: bubbles.length,
      emptyCandidates,
      normalizedDuplicates,
      sample: bubbles.slice(-8).map((bubble) => ({
        id: bubble.id,
        type: bubble.type,
        preview: previewDebugContent(bubble.content),
      })),
    });
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
          if (activeStage === 'topic') foundPath = 'outputs/topic.md';
          if (activeStage === 'script') foundPath = 'outputs/script.md';
          if (activeStage === 'publish') foundPath = 'outputs/publish_review.md';
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

      // Optimistic UI update until the server confirms resolution.
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

  const handleReloadClaudeConfig = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'reload_claude_config' }));
    }
    setBubbles([]);
    fetchSessions();
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
  const renderMarkdown = (text: string, mode: 'chat' | 'preview' = 'chat') => {
    if (!text) return null;

    // Strip and parse YAML frontmatter if it exists at the start of the markdown file
    let frontmatter: Record<string, string> = {};
    let markdownText = text;
    const yamlRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
    const match = text.match(yamlRegex);
    if (match) {
      markdownText = text.slice(match[0].length);
      const yamlStr = match[1];
      yamlStr.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const k = line.slice(0, colonIdx).trim();
          const v = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (k) {
            frontmatter[k] = v;
          }
        }
      });
    }

    if (mode === 'chat') {
      markdownText = stripChatNoiseLines(markdownText);
      if (!isChatContentRenderable(markdownText)) {
        return null;
      }
    }

    // Basic escapes and bullet lists
    let html = markdownText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Code blocks first (before other transformations)
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="md-code-block"><code>$2</code></pre>')
      // Headings
      .replace(/^###\s*(.*$)/gim, '<h3 class="md-h3">$1</h3>')
      .replace(/^##\s*(.*$)/gim, '<h2 class="md-h2">$1</h2>')
      .replace(/^#\s*(.*$)/gim, '<h1 class="md-h1">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="md-img" src="$2" alt="$1" />')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
      // Horizontal rules
      .replace(mode === 'preview' ? /^\s*(?:-{5,}|\*{5,})\s*$/gm : /$^/gm, '<hr class="md-hr" />')
      // Blockquotes (matching escaped &gt; for blockquote syntax)
      .replace(/((?:^&gt;\s+.*$\n?)+)/gm, (quoteBlock: string) => {
        const lines = quoteBlock.trim().split('\n');
        return '<blockquote class="md-blockquote">' + lines.map(line => {
          return line.replace(/^&gt;\s*/, '');
        }).join('<br/>') + '</blockquote>';
      })
      // Tables: match one or more table rows (lines starting and ending with |)
      .replace(/((?:^\|.*\|$\n?)+)/gm, (tableBlock: string) => {
        const rows = tableBlock.trim().split('\n');
        if (rows.length < 2) return tableBlock;
        let tableHtml = '<div class="md-table-wrapper"><table class="md-table">';
        // First row = header
        const headers = rows[0].split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
        tableHtml += '<thead><tr>' + headers.map(c => `<th>${c}</th>`).join('') + '</tr></thead>';
        // Skip separator row (|---|---|), render remaining as body
        const bodyRows = rows.filter((_, i) => i > 0 && !/^[\|\-\s:]+$/.test(rows[i]));
        if (bodyRows.length > 0) {
          tableHtml += '<tbody>' + bodyRows.map(row => {
            const cells = row.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
            return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
          }).join('') + '</tbody>';
        }
        tableHtml += '</table></div>';
        return tableHtml;
      })
      // Unordered lists — wrap consecutive lines starting with - or * in <ul>
      .replace(/((?:^(?:- |\* ).*$\n?)+)/gm, (listBlock: string) => {
        const items = listBlock.trim().split('\n');
        return '<ul class="md-ul">' + items.map(item => {
          let content = item.replace(/^[-*]\s+/, '');
          let isChecklist = false;
          let isChecked = false;
          if (content.startsWith('[ ] ')) {
            isChecklist = true;
            content = content.slice(4);
          } else if (content.startsWith('[x] ')) {
            isChecklist = true;
            isChecked = true;
            content = content.slice(4);
          }

          if (isChecklist) {
            return `<li class="md-li md-task-item"><span class="md-task-checkbox${isChecked ? ' checked' : ''}"></span>${content}</li>`;
          }
          return `<li class="md-li">${content}</li>`;
        }).join('') + '</ul>';
      })
      // Ordered lists — wrap consecutive lines starting with number. in <ol>
      .replace(/((?:^\d+\.\s+.*$\n?)+)/gm, (listBlock: string) => {
        const items = listBlock.trim().split('\n');
        return '<ol class="md-ol">' + items.map(item => {
          const content = item.replace(/^\d+\.\s+/, '');
          return `<li class="md-li">${content}</li>`;
        }).join('') + '</ol>';
      })
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    // Clean up extra <br/> tags that are adjacent to block tags
    html = html
      .replace(/(<\/(?:h1|h2|h3|div|ul|ol|li|table|thead|tbody|tr|th|td|blockquote|pre|hr)>)\s*(?:<br\s*\/?>)+/gi, '$1')
      .replace(/(?:<br\s*\/?>)+\s*(<(?:h1|h2|h3|div|ul|ol|li|table|thead|tbody|tr|th|td|blockquote|pre|hr)[^>]*>)/gi, '$1');


    return (
      <div className="markdown-rendered-container">
        {Object.keys(frontmatter).length > 0 && (
          <div className="md-frontmatter-card">
            {Object.entries(frontmatter).map(([k, v]) => (
              <div key={k} className="md-frontmatter-item">
                <span className="md-frontmatter-key">{k}:</span>
                <span className="md-frontmatter-value">{v}</span>
              </div>
            ))}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  };

  const variantProps = {
    projectState,
    boardState,
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
    handleReloadClaudeConfig,
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
    onPromptSubmit: handlePromptSubmit,
    onSelectArtifact: fetchPreviewFile,
    onExecutionModeChange: handleExecutionModeChange
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
