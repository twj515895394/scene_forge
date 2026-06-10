import React, { useRef, useEffect } from 'react';
import { Home, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatHistory from './ChatHistory';

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
  handleSend: (overrideText?: string) => void;
  handleCancel: () => void;
  handleNewSession: () => void;
  agentRunning: boolean;
  sessions: any[];
  sessionsLoading: boolean;
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  currentSessionId: string | null;
  onLoadSession: (id: string) => void;
  renderMarkdown: (text: string) => React.ReactNode;
  onReturnLobby?: () => void;
  bypassPermissions: boolean;
  setBypassPermissions: (v: boolean) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
  hasPendingPrompt: boolean;
  onPromptSubmit: (bubbleId: string, optionId: string, optionLabel: string) => void;
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
    currentSessionId,
    onLoadSession,
    renderMarkdown,
    onReturnLobby,
    bypassPermissions,
    setBypassPermissions,
    chatEndRef,
    hasPendingPrompt,
    onPromptSubmit
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [collapsedTools, setCollapsedTools] = React.useState<Record<string, boolean>>({});

  const toggleToolCollapse = (id: string) => {
    setCollapsedTools(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Auto-resize textarea as content grows
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  }, [inputVal]);

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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setBypassPermissions(!bypassPermissions)} 
            title={bypassPermissions ? "自动授权：子进程所有写入和执行操作自动跳过确认" : "安全授权模式：默认拦截写入/执行工具"} 
            className={`text-xs flex items-center gap-1 ${bypassPermissions ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'}`}
          >
            🛡️ {bypassPermissions ? "自动授权 (Auto-Approve)" : "安全限制 (Protected)"}
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
            currentSessionId={currentSessionId}
            onSelect={onLoadSession}
            onClose={() => setShowHistory(false)}
          />
        </div>
      )}

      {/* Grid Layout */}
      <div className="variant-b-grid">
        {/* Panel 1: Vertical Sidebar (Pipeline Flow Panel) */}
        <aside className="variant-b-sidebar flex flex-col h-full border-r border-white/5 bg-[#08080c] w-[260px] flex-shrink-0 min-w-[260px]">
          <div className="section-header px-4 py-3 text-[10px] tracking-wider text-muted-foreground uppercase font-mono border-b border-white/5">
            <span>Pipeline Flow (SOP 管线)</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 flex flex-col gap-2">
              {STAGES.map((stg, index) => {
                const state = projectState?.stages[stg];
                const status = state?.status || 'ready';
                const isActive = activeStage === stg;
                const isCurrent = projectState?.current_stage === stg;

                return (
                  <div
                    key={stg}
                    onClick={() => sendMacro && sendMacro('start', stg)}
                    className={`flex items-center justify-between p-3 rounded cursor-pointer text-xs transition-all ${
                      isActive 
                        ? 'bg-white/5 text-white border border-white/10' 
                        : 'text-muted-foreground hover:bg-white/[0.02]'
                    } ${isCurrent ? 'border-l-2 border-l-[#00f0ff]' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-[9px] opacity-40">{String(index + 1).padStart(2, '0')}</span>
                      <span className="truncate text-[12px] font-medium">{STAGE_NAMES[stg]?.split(' ')[0] || stg}</span>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      status === 'in_progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-white/5 text-muted-foreground border border-white/5'
                    }`}>
                      {status === 'completed' ? 'Done' : status === 'in_progress' ? 'Run' : 'Idle'}
                    </span>
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
          <div className="variant-b-feed-viewport">
            {bubbles.map((b) => {
              // 1. Thought Process Bubble
              if (b.type === 'thought') {
                const expanded = expandedThoughts[b.id] !== false;
                return (
                  <div key={b.id} className="chat-bubble-b thought">
                    <div className="bubble-thought-header" onClick={() => toggleThought(b.id)}>
                      <span>💡 Agent 思考中...</span>
                      <span className="expand-indicator">{expanded ? '收起 ▲' : '展开 ▼'}</span>
                    </div>
                    {expanded && (
                      <pre className="thought-pre-b">{b.content}</pre>
                    )}
                  </div>
                );
              }

              // 2. Tool System Call Bubble (Claudian StatusPanel style: Collapsible & Copyable)
              if (b.type === 'tool_call') {
                const isCollapsed = collapsedTools[b.id] !== false;
                return (
                  <div key={b.id} className="chat-bubble-b tool border border-white/5 bg-[#050508] rounded my-1 overflow-hidden transition-all self-stretch">
                    <div 
                      className="bubble-tool-header px-3 py-1.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between cursor-pointer font-mono text-[9px]"
                      onClick={() => toggleToolCollapse(b.id)}
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>⚙️</span>
                        <span className="font-semibold text-white/80">System Command Logs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          className="hover:text-[#00f0ff] transition-colors bg-transparent border-none p-0 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(b.content);
                          }}
                        >
                          Copy
                        </button>
                        <span className="opacity-40">{isCollapsed ? 'Expand ▼' : 'Collapse ▲'}</span>
                      </div>
                    </div>
                    {!isCollapsed && (
                      <pre className="tool-pre-b p-3 m-0 font-mono text-[10px] leading-relaxed text-[#a3a3ac] overflow-x-auto bg-[#020204] border-none rounded-none text-left">
                        {b.content.trim()}
                      </pre>
                    )}
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

              // 3.5. Intercepted Prompt / Permission Card
              if (b.type === 'prompt_ui') {
                let payload: any;
                try {
                  payload = JSON.parse(b.content);
                } catch (e) {
                  payload = { title: '授权申请 (Permission Requested)', options: [] };
                }

                return (
                  <div key={b.id} className="chat-bubble-b prompt-ui-wrapper">
                    <div className={`prompt-ui-card ${b.answered ? 'answered' : 'pending'}`}>
                      <div className="prompt-ui-header">
                        <span className="prompt-ui-icon">{b.answered ? '✓' : '🛡️'}</span>
                        <span className="prompt-ui-title">
                          {b.answered ? '系统授权已确认 / SYSTEM PERMISSION RESOLVED' : '系统授权申请 / SYSTEM PERMISSION REQUEST'}
                        </span>
                      </div>
                      
                      <div className="prompt-ui-body">
                        <p className="prompt-ui-question">{payload.title}</p>
                        
                        {b.answered ? (
                          <div className="prompt-ui-status-resolved">
                            <span className="resolved-check">✓</span>
                            <span>已授权选项：<strong>{b.selectedOptionLabel}</strong></span>
                          </div>
                        ) : (
                          <div className="prompt-ui-options-grid">
                            {payload.options?.map((opt: any) => {
                              const isAllow = opt.kind?.includes('allow') || opt.label?.toLowerCase().includes('yes') || opt.label?.toLowerCase().includes('allow') || opt.label?.includes('批准') || opt.label?.includes('允许');
                              const isDeny = opt.kind?.includes('deny') || opt.label?.toLowerCase().includes('no') || opt.label?.toLowerCase().includes('deny') || opt.label?.includes('拒绝') || opt.label?.includes('取消');
                              
                              let btnClass = "prompt-ui-btn";
                              if (isAllow) btnClass += " allow";
                              else if (isDeny) btnClass += " deny";
                              else btnClass += " neutral";

                              return (
                                <button
                                  key={opt.value}
                                  className={btnClass}
                                  onClick={() => onPromptSubmit(b.id, opt.value, opt.label)}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // 4. AI / Assistant / System Response Bubble (Without redundant approval buttons)
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

            {agentRunning && (
              <div className="chat-bubble-b ai-wrapper active-agent-loading">
                <div className="ai-bubble loading-state" style={{ padding: '10px 14px', minWidth: '150px' }}>
                  <div className="bubble-sender-title flex items-center gap-1.5" style={{ fontSize: '8px', marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                    <span className="dot-blink-blue"></span>
                    AI DIRECTOR IS WORKING
                  </div>
                  <div className="bubble-content flex items-center gap-1.5 py-0.5" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

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
            <div className={`variant-b-input-container ${hasPendingPrompt ? 'disabled' : ''}`}>
              <div className="input-prompt-symbol">&gt;</div>
              <ScrollArea className="variant-b-input-scrollarea">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder={hasPendingPrompt ? "等待授权决策以继续执行管线..." : "与 AI 导演对话... (Enter 发送，Shift+Enter 换行)"}
                  value={hasPendingPrompt ? "" : inputVal}
                  disabled={hasPendingPrompt}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="variant-b-textarea"
                />
              </ScrollArea>
              <div className="variant-b-send-group">
                {agentRunning ? (
                  <button className="btn-b-send stop" onClick={handleCancel}>⏹ 停止</button>
                ) : (
                  <button className="btn-b-send" onClick={() => handleSend()} disabled={hasPendingPrompt}>发送</button>
                )}
              </div>
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
