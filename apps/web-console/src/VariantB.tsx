import React from 'react';
import { Home, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatHistory from './ChatHistory';

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

interface VariantProps {
  projectState: ProjectState | null;
  bubbles: ChatBubble[];
  inputVal: string;
  setInputVal: (val: string) => void;
  activeStage: string;
  previewContent: string;
  previewPath: string;
  connectionStatus: 'connecting' | 'open' | 'closed';
  expandedThoughts: Record<string, boolean>;
  toggleThought: (id: string) => void;
  sendMacro: (action: 'start' | 'validate' | 'complete', stage: string) => void;
  handleSend: () => void;
  handleCancel: () => void;
  handleNewSession: () => void;
  agentRunning: boolean;
  sessions: any[];
  sessionsLoading: boolean;
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  onLoadSession: (id: string) => void;
  renderMarkdown: (text: string) => React.ReactNode;
  onReturnLobby?: () => void;
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
  topic_gate: 'Topic Gate (选题吸入)',
  script: 'Script (剧本开发)',
  performance: 'Performance (表演设计)',
  audio: 'Audio (声音导演)',
  storyboard: 'Storyboard (分镜故事板)',
  video_prompts: 'Video Prompts (视频提示词)',
  publish_review: 'Publish Review (发布评审)'
};

export default function VariantB(props: VariantProps) {
  const {
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
    onLoadSession,
    renderMarkdown,
    onReturnLobby
  } = props;

  // Helper to check if a bubble is from user
  const isUserBubble = (content: string) => content.startsWith('>');
  // Helper to strip user prefix '>'
  const formatUserContent = (content: string) => {
    if (content.startsWith('>')) {
      return content.substring(1).trim();
    }
    return content;
  };

  return (
    <div className="console-container variant-b">
      {/* Swiss Minimalist Top Header */}
      <header className="variant-b-header">
        <div className="header-left">
          {onReturnLobby && (
            <Button variant="ghost" size="icon" onClick={onReturnLobby} title="返回欢迎大厅">
              <Home className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)} title="会话历史" className="text-xs text-muted-foreground hover:text-white">
            <History className="h-3.5 w-3.5 mr-1" />
            历史
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNewSession} title="开始新会话" className="text-xs text-muted-foreground hover:text-white">
            + 新会话
          </Button>
          <div className="logo-square">SF</div>
          <span className="brand-title">SceneForge</span>
          <span className="badge-v9">V9</span>
          <span className="badge-sub">NEO-GEEK</span>
        </div>
        <div className="header-right">
          <div className="project-pill">
            <span className="dot-blink"></span>
            <span className="project-name">{projectState?.project || 'No Project'}</span>
          </div>
          <div className="connection-badge">
            <span className={`indicator ${connectionStatus}`}></span>
            {connectionStatus === 'open' ? 'linked' : 'offline'}
          </div>
        </div>
      </header>

      {/* History Panel — slide overlay */}
      {showHistory && (
        <div className="variant-b-history-overlay">
          <ChatHistory
            sessions={sessions}
            loading={sessionsLoading}
            currentSessionId={null}
            onSelect={onLoadSession}
            onClose={() => setShowHistory(false)}
          />
        </div>
      )}

      {/* Grid Layout */}
      <div className="variant-b-grid">
        {/* Panel 1: Vertical Stages Index */}
        <aside className="variant-b-sidebar">
          <div className="section-header">
            <span>SOP PROCESS FLOW</span>
            <span className="active-count">{STAGES.length} STAGES</span>
          </div>
          <ScrollArea className="h-full flex-1">
          <div className="stage-cards-container">
            {STAGES.map((stg, index) => {
              const state = projectState?.stages[stg];
              const status = state?.status || 'ready';
              const isActive = activeStage === stg;
              const isCurrent = projectState?.current_stage === stg;

              return (
                <div
                  key={stg}
                  className={`stage-card-b ${status} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                >
                  <div className="card-left-section">
                    <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="status-bullet"></span>
                  </div>
                  
                  <div className="card-mid-section">
                    <span className="stage-title">{STAGE_NAMES[stg]}</span>
                    {isCurrent && <span className="active-flow-tag">ACTIVE</span>}
                  </div>

                  <div className="card-right-section">
                    <span className={`status-badge-b ${status}`}>
                      {status === 'completed' && 'COMPLETE'}
                      {status === 'in_progress' && 'RUNNING'}
                      {status === 'review_failed' && 'FAILED'}
                      {status === 'ready' && 'READY'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          </ScrollArea>
        </aside>

        {/* Panel 2: Center Feed (Polished Chat Bubbles + Action Dock) */}
        <section className="variant-b-feed">
          <div className="section-header">COLLABORATIVE FEED</div>
          
          {/* Chat Bubble Viewport */}
          <ScrollArea className="flex-1">
          <div className="variant-b-feed-viewport">
            {bubbles.map((b) => {
              // 1. Thought Process Bubble
              if (b.type === 'thought') {
                const expanded = expandedThoughts[b.id];
                return (
                  <div key={b.id} className={`chat-bubble-b thought ${expanded ? 'expanded' : ''}`}>
                    <div className="bubble-thought-header" onClick={() => toggleThought(b.id)}>
                      <span className="thought-icon">💡</span>
                      <span className="thought-title">Agent Thought Process</span>
                      <span className="expand-indicator">{expanded ? 'COLLAPSE ▲' : 'EXPAND ▼'}</span>
                    </div>
                    {expanded && (
                      <pre className="thought-pre-b">{b.content.trim()}</pre>
                    )}
                  </div>
                );
              }

              // 2. Tool System Call Bubble
              if (b.type === 'tool_call') {
                return (
                  <div key={b.id} className="chat-bubble-b tool">
                    <div className="bubble-tool-header">
                      <span className="tool-icon">⚙️</span>
                      <span className="tool-title">System Execution Log</span>
                    </div>
                    <pre className="tool-pre-b">{b.content.trim()}</pre>
                  </div>
                );
              }

              // 3. User Sent Chat Bubble
              if (isUserBubble(b.content)) {
                return (
                  <div key={b.id} className="chat-bubble-b user-wrapper">
                    <div className="user-bubble">
                      <div className="bubble-content">
                        {formatUserContent(b.content)}
                      </div>
                      <span className="bubble-time">{new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              }

              // 4. AI / Assistant / System Response Bubble
              return (
                <div key={b.id} className="chat-bubble-b ai-wrapper">
                  <div className="ai-bubble">
                    <div className="bubble-sender-title">AI DIRECTOR</div>
                    <div className="bubble-content markdown-body-b">
                      {renderMarkdown(b.content)}
                    </div>
                    <span className="bubble-time">{new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
          </ScrollArea>

          {/* Current Stage Status Bar */}
          <div className="variant-b-action-dock">
            {(() => {
              const state = projectState?.stages[activeStage];
              const status = state?.status || 'ready';
              const statusLabels: Record<string, string> = {
                ready: '待开始', in_progress: '进行中', review_failed: '需修复', validated: '已校验', completed: '已完成'
              };
              return (
                <div className="action-dock-inner">
                  <div className="dock-meta">
                    <span className="dock-stage-label">当前阶段:</span>
                    <strong className="dock-stage-name">{STAGE_NAMES[activeStage] || activeStage}</strong>
                    <span className={`status-badge-b ${status}`}>{statusLabels[status] || status}</span>
                  </div>
                  <span className="label-done">通过对话驱动 Claude 推进管线</span>
                </div>
              );
            })()}
          </div>

          {/* TextInput Command Line Wrapper for Floating Card style */}
          <div className="variant-b-input-wrapper">
            <div className="variant-b-input-container">
              <div className="input-prompt-symbol">&gt;</div>
              <textarea
                rows={4}
                placeholder="Inject command or message to AI director... (Enter to send, Shift+Enter to wrap)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              {agentRunning ? (
                <button className="btn-b-send" onClick={handleCancel} style={{ background: '#FF453A' }}>⏹ STOP</button>
              ) : (
                <button className="btn-b-send" onClick={handleSend}>SEND PAYLOAD</button>
              )}
            </div>
          </div>
        </section>

        {/* Panel 3: Document Viewer (Clean & Minimalist Typography) */}
        <section className="variant-b-preview">
          <div className="section-header">OUTPUT ARTIFACT VISUALIZER</div>
          <div className="preview-header-b">
            <span className="file-icon-b">📄</span>
            <span className="file-name-b">{previewPath || 'no_file_registered.md'}</span>
          </div>
          <ScrollArea className="flex-1">
          <div className="preview-content-b markdown-rendered-b">
            {renderMarkdown(previewContent)}
          </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}
