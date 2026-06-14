import React, { useRef, useEffect } from 'react';
import { Home, History, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatHistory from './ChatHistory';
import { isChatContentRenderable, stripChatNoiseLines } from './lib/chatSanitizer';

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
  status: 'ready' | 'in_progress' | 'review_failed' | 'validated' | 'completed' | 'skipped';
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
  boardState: any;
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
  renderMarkdown: (text: string, mode?: 'chat' | 'preview') => React.ReactNode;
  onReturnLobby?: () => void;
  bypassPermissions: boolean;
  setBypassPermissions: (v: boolean) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
  hasPendingPrompt: boolean;
  onPromptSubmit: (bubbleId: string, optionId: string, optionLabel: string) => void;
  onSelectArtifact?: (path: string) => void;
  onExecutionModeChange: (mode: ExecutionPolicyMode) => void;
}

type ExecutionPolicyMode = 'fast_production' | 'full_auto';

const STAGES = [
  'source_intake',
  'topic',
  'reference',
  'story',
  'assets',
  'design',
  'script',
  'performance',
  'storyboard',
  'audio',
  'video_prompts',
  'publish'
];

const STAGE_NAMES: Record<string, string> = {
  source_intake: 'Source Intake (视频源吸入)',
  topic: 'Topic Gate (选题闸门)',
  reference: 'Reference Decider (参考裁定)',
  story: 'Story Development (故事开发)',
  assets: 'Asset Checker (资产复用)',
  design: 'Design Builder (设定生成)',
  script: 'Script Adapter (剧本改编)',
  performance: 'Performance Director (表演导演)',
  storyboard: 'Storyboard Director (分镜故事板)',
  audio: 'Audio Director (声音导演)',
  video_prompts: 'Video Prompt Builder (视频提示词)',
  publish: 'Publish Review (发布评审)'
};

const CLI_STAGE_MAP: Record<string, string> = {
  topic: 'topic_gate',
  script: 'script',
  performance: 'performance',
  audio: 'audio',
  storyboard: 'storyboard',
  video_prompts: 'video_prompts',
  publish: 'publish_review'
};

const SCENE_TO_UI_STAGE_MAP: Record<string, string> = {
  'scene-video-intake': 'source_intake',
  'scene-topic-gate': 'topic',
  'scene-reference-decider': 'reference',
  'scene-story-development': 'story',
  'scene-asset-checker': 'assets',
  'scene-design-builder': 'design',
  'scene-script-adapter': 'script',
  'scene-performance': 'performance',
  'scene-performance-director': 'performance',
  'scene-storyboard-director': 'storyboard',
  'scene-audio-director': 'audio',
  'scene-video-prompt-builder': 'video_prompts',
  'scene-publish-review': 'publish'
};

type UiStageStatus = 'ready' | 'in_progress' | 'review_failed' | 'validated' | 'completed' | 'skipped' | 'needs_sync';

function getExecutionMode(boardState: any): ExecutionPolicyMode {
  const mode = boardState?.execution_policy?.mode;
  return mode === 'full_auto' ? 'full_auto' : 'fast_production';
}

function isConfirmed(value: any): boolean {
  return value?.status === 'confirmed' || value?.status === 'legacy confirmed';
}

function isFullAutoUnlocked(boardState: any): boolean {
  const confirmations = boardState?.confirmations ?? {};
  const config = boardState?.project_config ?? {};
  return (
    isConfirmed(confirmations.topic_confirmed) &&
    isConfirmed(confirmations.style_family_confirmed) &&
    isConfirmed(confirmations.style_confirmed) &&
    isConfirmed(confirmations.script_confirmed) &&
    Boolean(config.target_total_duration_seconds) &&
    Boolean(config.segment_duration_seconds)
  );
}

export default function VariantB(props: VariantProps) {
  const {
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
    onPromptSubmit,
    onSelectArtifact,
    onExecutionModeChange
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [collapsedTools, setCollapsedTools] = React.useState<Record<string, boolean>>({});

  // 1. Sidebar collapsing state
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState<number>(320);

  // 2. Resizable columns state
  const [previewCollapsed, setPreviewCollapsed] = React.useState(true);
  const [previewWidth, setPreviewWidth] = React.useState<number>(440);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSidebarDragging, setIsSidebarDragging] = React.useState(false);

  // 3. Stage artifacts accordion states
  const [expandedStages, setExpandedStages] = React.useState<Record<string, boolean>>({});
  const [stageArtifacts, setStageArtifacts] = React.useState<Record<string, any[]>>({});
  const [isRefreshingArtifacts, setIsRefreshingArtifacts] = React.useState(false);
  const executionMode = getExecutionMode(boardState);
  const fullAutoUnlocked = isFullAutoUnlocked(boardState);

  // 4. Debug log visibility state
  const [showSystemLogs, setShowSystemLogs] = React.useState(false);

  const toggleToolCollapse = (id: string) => {
    setCollapsedTools(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle stage accordion and fetch artifacts on demand
  const fetchStageArtifacts = async (stg: string) => {
    const res = await fetch(`/api/artifacts?stage=${encodeURIComponent(stg)}`);
    if (!res.ok) {
      throw new Error(`Failed to load artifacts for ${stg}`);
    }
    return await res.json();
  };

  const handleToggleStage = async (stg: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering stage activate Macro command
    const nextVal = !expandedStages[stg];
    setExpandedStages(prev => ({ ...prev, [stg]: nextVal }));

    if (nextVal && !stageArtifacts[stg]) {
      try {
        const list = await fetchStageArtifacts(stg);
        setStageArtifacts(prev => ({ ...prev, [stg]: list }));
      } catch (err) {
        console.error('Failed to load artifacts for', stg, err);
      }
    }
  };

  const handleRefreshAllStageArtifacts = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRefreshingArtifacts) return;

    setIsRefreshingArtifacts(true);
    try {
      const entries = await Promise.all(
        STAGES.map(async (stg) => [stg, await fetchStageArtifacts(stg)] as const)
      );
      setStageArtifacts(Object.fromEntries(entries));
    } catch (err) {
      console.error('Failed to refresh stage artifacts', err);
    } finally {
      setIsRefreshingArtifacts(false);
    }
  };

  // Draggable columns divider handler
  const handleResizerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = previewWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 1200;
      const maxW = Math.floor(containerWidth * 0.7);
      // Since preview is on the right, dragging left increases the width
      const newWidth = Math.max(250, Math.min(maxW, startWidth - deltaX));
      setPreviewWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSidebarResizerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSidebarDragging(true);
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const containerWidth = containerRef.current?.getBoundingClientRect().width || 1400;
      const maxW = Math.floor(containerWidth * 0.34);
      const newWidth = Math.max(280, Math.min(maxW, startWidth + deltaX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsSidebarDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleArtifactSelect = (path: string) => {
    if (previewCollapsed) {
      setPreviewCollapsed(false);
    }
    onSelectArtifact && onSelectArtifact(path);
  };

  // Auto-resize textarea as content grows
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.max(36, Math.min(ta.scrollHeight, 160)) + 'px';
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

  const normalizeThoughtContent = (content: string) => stripChatNoiseLines(content).trim();
  const formatBubbleTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatThoughtDuration = (durationMs?: number) => {
    if (typeof durationMs !== 'number' || !Number.isFinite(durationMs) || durationMs <= 0) {
      return '';
    }
    const totalSeconds = Math.max(1, Math.round(durationMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy bubble content', error);
    }
  };

  useEffect(() => {
    const renderable = bubbles.filter((b) => {
      if (!b.content || !b.content.trim()) {
        return false;
      }
      if (isUserBubble(b.content)) {
        const cleaned = b.content.replace(/^>\s*/, '').trim();
        if (!cleaned) return false;
      }
      if (b.type === 'tool_call') {
        try {
          JSON.parse(b.content);
        } catch {
          return false;
        }
      }
      if (b.type === 'thought' && !normalizeThoughtContent(b.content)) {
        return false;
      }
      if (b.type === 'text' && !isUserBubble(b.content) && !isChatContentRenderable(b.content)) {
        return false;
      }
      return true;
    });

    console.log('[DEBUG-chatdiag] variantb.renderable', {
      total: bubbles.length,
      renderableCount: renderable.length,
      filteredOut: bubbles
        .filter((bubble) => !renderable.some((item) => item.id === bubble.id))
        .map((bubble) => ({
          id: bubble.id,
          type: bubble.type,
          preview: bubble.content.replace(/\s+/g, ' ').trim().slice(0, 100),
          sanitizedPreview: bubble.type === 'text' && !isUserBubble(bubble.content)
            ? stripChatNoiseLines(bubble.content).slice(0, 100)
            : undefined,
        })),
      renderableSample: renderable.slice(-8).map((bubble) => ({
        id: bubble.id,
        type: bubble.type,
        preview: bubble.content.replace(/\s+/g, ' ').trim().slice(0, 100),
      })),
    });
  }, [bubbles]);

  const normalizeBoardRouteStage = (value?: string | null) => {
    if (!value) return '';
    return SCENE_TO_UI_STAGE_MAP[value] || value;
  };

  const currentRouteStage = normalizeBoardRouteStage(boardState?.routing?.current_stage) || activeStage;
  const lastCompletedRouteStage = normalizeBoardRouteStage(boardState?.routing?.last_completed_stage);
  const furthestReachedStageIndex = Math.max(
    STAGES.indexOf(currentRouteStage),
    STAGES.indexOf(lastCompletedRouteStage)
  );

  const getDisplayStageStatus = (stg: string): UiStageStatus => {
    const cliStageKey = CLI_STAGE_MAP[stg];
    const boardStatus = boardState?.stage_index?.[stg]?.status;
    const cliStatus = cliStageKey ? projectState?.stages?.[cliStageKey]?.status : undefined;
    const rawStatus = (!boardStatus || boardStatus === 'pending') ? cliStatus || boardStatus : boardStatus;

    if (rawStatus === 'skipped') {
      return 'skipped';
    }

    if (!rawStatus || rawStatus === 'pending' || rawStatus === 'ready') {
      const stageIndex = STAGES.indexOf(stg);
      if (
        stg !== 'source_intake' &&
        stageIndex !== -1 &&
        furthestReachedStageIndex !== -1 &&
        stageIndex < furthestReachedStageIndex
      ) {
        return 'needs_sync';
      }
      return 'ready';
    }

    return rawStatus as UiStageStatus;
  };

  const getStageStatusLabel = (status: UiStageStatus) => {
    switch (status) {
      case 'completed':
        return 'Done';
      case 'in_progress':
        return 'Run';
      case 'review_failed':
        return 'Fix';
      case 'validated':
        return 'Pass';
      case 'skipped':
        return 'Skip';
      case 'needs_sync':
        return 'Sync';
      default:
        return 'Idle';
    }
  };

  return (
    <div className="console-container variant-b">
      {/* Swiss Minimalist Top Header */}
      <header className="variant-b-header">
        <div className="header-left">
          {onReturnLobby && (
            <Button variant="ghost" size="icon" onClick={onReturnLobby} title="返回欢迎大厅" className="h-8 w-8 text-muted-foreground hover:text-white">
              <Home className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
            className="h-8 w-8 text-muted-foreground hover:text-white"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPreviewCollapsed(!previewCollapsed)}
            title={previewCollapsed ? '展开产物预览栏' : '折叠产物预览栏'}
            className="h-8 w-8 text-muted-foreground hover:text-white"
          >
            {previewCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBypassPermissions(!bypassPermissions)}
            title={bypassPermissions ? "自动授权：子进程所有写入和执行操作自动跳过确认" : "安全授权模式：默认拦截写入/执行工具"}
            className={`h-8 px-2.5 text-[11px] flex items-center gap-1 ${bypassPermissions ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'}`}
          >
            🛡️ {bypassPermissions ? "自动授权" : "安全限制"}
          </Button>
          <div className="logo-square">SF</div>
          <span className="brand-title">SceneForge</span>
          <span className="badge-v9">V9</span>
          <span className="badge-sub mr-3">NEO-GEEK</span>

          {/* Current Stage Status Pill */}
          {(() => {
            const cliStageKey = CLI_STAGE_MAP[activeStage];
            let status = boardState?.stage_index?.[activeStage]?.status;
            if ((!status || status === 'pending') && cliStageKey && projectState?.stages?.[cliStageKey]) {
              status = projectState.stages[cliStageKey].status;
            }
            if (status === 'pending') {
              status = 'ready';
            }
            if (!status) {
              status = 'ready';
            }
            const statusLabels: Record<string, string> = {
              ready: '待开始', in_progress: '进行中', review_failed: '需修复', validated: '已校验', completed: '已完成'
            };
            return (
              <div className="header-stage-pill flex items-center gap-2 px-2.5 py-0.5 ml-1">
                <span className="header-stage-label">当前阶段:</span>
                <strong className="header-stage-name">{STAGE_NAMES[activeStage] || activeStage}</strong>
                <span className={`status-badge-b ${status} ml-1`}>
                  {statusLabels[status] || status}
                </span>
              </div>
            );
          })()}
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

      {/* Flex Layout Container with ref */}
      <div ref={containerRef} className="variant-b-grid">
        {/* Panel 1: Vertical Sidebar (Pipeline Flow Panel) */}
        <aside className={`variant-b-sidebar flex flex-col h-full ${sidebarCollapsed ? 'collapsed' : ''}`} style={sidebarCollapsed ? undefined : { width: `${sidebarWidth}px`, minWidth: `${sidebarWidth}px`, maxWidth: `${sidebarWidth}px` }}>
          <div className="section-header sidebar-section-header">
            <span>Pipeline Flow (SOP 管线)</span>
            <div className="execution-policy-toggle" title={executionMode === 'full_auto' && !fullAutoUnlocked ? '全自动待解锁：请先确认题材、风格、剧本、总时长和分段策略' : '执行模式'}>
              <button
                type="button"
                className={`execution-policy-option ${executionMode === 'fast_production' ? 'active' : ''}`}
                onClick={() => onExecutionModeChange('fast_production')}
              >
                快速
              </button>
              <button
                type="button"
                className={`execution-policy-option ${executionMode === 'full_auto' ? 'active' : ''} ${executionMode === 'full_auto' && !fullAutoUnlocked ? 'pending' : ''}`}
                onClick={() => onExecutionModeChange('full_auto')}
              >
                {executionMode === 'full_auto' && !fullAutoUnlocked ? '全自动·待解锁' : '全自动'}
              </button>
            </div>
            <button
              type="button"
              className="stage-artifacts-refresh-btn"
              onClick={handleRefreshAllStageArtifacts}
              disabled={isRefreshingArtifacts}
              title="刷新所有阶段产物"
              aria-label="刷新所有阶段产物"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshingArtifacts ? 'spinning' : ''}`} />
            </button>
          </div>
          <div className="sidebar-scroll-area flex-1 overflow-y-auto">
            <div className="p-2.5 flex flex-col gap-1.5">
              {STAGES.map((stg, index) => {
                const status = getDisplayStageStatus(stg);
                const isActive = activeStage === stg;
                const isCurrent = activeStage === stg;
                const artifactsForStage = stageArtifacts[stg];
                const artifactCount = artifactsForStage?.length ?? 0;
                const isExpanded = !!expandedStages[stg];

                return (
                  <div
                    key={stg}
                    className={`stage-card-wrapper flex flex-col ${isExpanded ? 'expanded' : ''} ${artifactCount > 0 ? 'has-artifacts' : ''}`}
                  >
                    <div
                      onClick={(e) => handleToggleStage(stg, e)}
                      className={`stage-row-b flex items-center justify-between cursor-pointer transition-all ${
                        isActive
                          ? 'active text-white'
                          : 'text-muted-foreground'
                      } ${isCurrent ? 'current-stage' : ''}`}
                    >
                      <div className="flex items-center gap-2 truncate flex-1 stage-row-main">
                        <span className="stage-step-num">{String(index + 1).padStart(2, '0')}</span>
                        <span className="stage-row-title truncate">{STAGE_NAMES[stg]}</span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 stage-row-meta">
                        {artifactsForStage && artifactCount > 0 && (
                          <span className="stage-artifact-count" title={`${artifactCount} 个阶段产物`}>
                            {artifactCount}
                          </span>
                        )}
                        <span className={`stage-inline-status ${
                          status === 'completed' ? 'completed' :
                          status === 'in_progress' ? 'in_progress' :
                          status === 'review_failed' ? 'review_failed' :
                          status === 'skipped' ? 'skipped' :
                          status === 'needs_sync' ? 'needs_sync' :
                          'ready'
                        }`}>
                          {getStageStatusLabel(status)}
                        </span>

                        <div
                          className={`stage-row-chevron text-muted-foreground flex items-center justify-center chevron-icon transition-all duration-200 ${expandedStages[stg] ? 'rotate-90' : ''}`}
                          title="查看交付产物"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Accordion: Stage Artifacts List */}
                    {expandedStages[stg] && (
                      <div className="stage-artifacts-panel">
                        <div className="stage-artifacts-list">
                        {!stageArtifacts[stg] ? (
                          <div className="stage-artifacts-loading">
                            <span className="stage-artifacts-loading-line short" />
                            <span className="stage-artifacts-loading-line" />
                          </div>
                        ) : stageArtifacts[stg].length === 0 ? (
                          <div className="stage-artifacts-empty">
                            <div className="stage-artifacts-empty-icon">+</div>
                            <div className="stage-artifacts-empty-body">
                              <span className="stage-artifacts-empty-title">
                                {status === 'needs_sync' ? '阶段状态待同步' : '暂无交付产物'}
                              </span>
                              <span className="stage-artifacts-empty-copy">
                                {status === 'needs_sync'
                                  ? '流程已经越过该阶段，但黑板仍显示 pending，建议补齐阶段摘要或显式标注跳过原因'
                                  : '该阶段还没有可预览文件'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          stageArtifacts[stg].map((art) => {
                            const isViewing = previewPath === art.path;
                            return (
                              <div
                                key={art.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleArtifactSelect(art.path);
                                }}
                                className={`stage-artifact-row stage-artifact-grid cursor-pointer ${
                                  isViewing ? 'viewing font-semibold' : ''
                                }`}
                                title={art.path}
                              >
                                <span className="stage-artifact-icon">📄</span>
                                <span className="stage-artifact-name">{art.path.split('/').pop()}</span>
                                <span className="stage-artifact-kind">{art.kind}</span>
                              </div>
                            );
                          })
                        )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {!sidebarCollapsed && (
          <div
            className={`variant-b-resizer sidebar-resizer ${isSidebarDragging ? 'dragging' : ''}`}
            onMouseDown={handleSidebarResizerMouseDown}
          />
        )}

        {/* Panel 2: Center Feed (Polished Chat Bubbles + Action Dock) */}
        <section className="variant-b-feed">
          <div className="section-header">
            <span>COLLABORATIVE FEED</span>
            <div className="flex items-center gap-2">
              <button
                className={`panel-toggle-chip ${showSystemLogs ? 'active' : ''}`}
                onClick={() => setShowSystemLogs(!showSystemLogs)}
                title={showSystemLogs ? '隐藏系统调试日志（思考过程与工具调用）' : '显示系统调试日志（思考过程与工具调用）'}
              >
                {showSystemLogs ? '隐藏日志' : '显示日志'}
              </button>
              <button
                className="panel-toggle-chip"
                onClick={() => setPreviewCollapsed(!previewCollapsed)}
                title={previewCollapsed ? '展开产物预览栏' : '折叠产物预览栏'}
              >
                {previewCollapsed ? '打开预览' : '收起预览'}
              </button>
            </div>
          </div>

          {/* Chat Bubble Viewport */}
          <div className="variant-b-feed-viewport">
            {bubbles
              .filter((b) => {
                // Skip empty or whitespace-only messages
                if (!b.content || !b.content.trim()) {
                  return false;
                }
                // Hide thought and tool call bubbles if they are resolved/completed and system logs are disabled
                if (!showSystemLogs) {
                  if (b.type === 'tool_call') return false;
                  if (b.type === 'thought' && b.thoughtStatus !== 'streaming') return false;
                }
                // Skip empty user messages
                if (isUserBubble(b.content)) {
                  const cleaned = b.content.replace(/^>\s*/, '').trim();
                  if (!cleaned) return false;
                }
                // Skip invalid tool call messages
                if (b.type === 'tool_call') {
                  try {
                    JSON.parse(b.content);
                  } catch (e) {
                    return false;
                  }
                }
                // Skip thought bubbles whose content normalizes to empty
                if (b.type === 'thought' && !normalizeThoughtContent(b.content)) return false;
                // Skip non-user text bubbles that aren't renderable after sanitization
                if (b.type === 'text' && !isUserBubble(b.content) && !isChatContentRenderable(b.content)) return false;
                return true;
              })
              .map((b) => {
              // 1. Thought Process Bubble
              if (b.type === 'thought') {
                const thoughtContent = normalizeThoughtContent(b.content);
                if (!thoughtContent) return null;
                const status = b.thoughtStatus ?? 'streaming';
                const expanded = showSystemLogs ? (expandedThoughts[b.id] !== false) : (expandedThoughts[b.id] ?? status === 'streaming');
                const durationText = formatThoughtDuration(b.durationMs);
                const title = status === 'resolved'
                  ? `已处理${durationText ? ` ${durationText}` : ''}`
                  : '思考中...';
                return (
                  <div key={b.id} className={`chat-bubble-b thought ${status} ${expanded ? 'expanded' : 'collapsed'}`}>
                    <div className="bubble-thought-header" onClick={() => toggleThought(b.id)}>
                      <span>{title}</span>
                      <span className="expand-indicator">{expanded ? '⌄' : '›'}</span>
                    </div>
                    {expanded && (
                      <div className="max-h-[300px] w-full overflow-y-auto thought-content-scroll">
                        <pre className="thought-pre-b">{thoughtContent}</pre>
                      </div>
                    )}
                  </div>
                );
              }

              // 2. Tool System Call Bubble
              if (b.type === 'tool_call') {
                if (!b.content || !b.content.trim()) return null; // Filter empty streaming tool calls
                let toolInfo: { id: string; name: string; input: any; status: string; result?: string; isError?: boolean };
                try {
                  toolInfo = JSON.parse(b.content);
                } catch (e) {
                  // Filter out raw history tool_call strings (e.g. "[tool_call: write_to_file]")
                  return null;
                }

                const isCollapsed = showSystemLogs ? (collapsedTools[b.id] === true) : (collapsedTools[b.id] !== false);

                // Extract a clean argument summary
                let summaryText = '';
                if (toolInfo.name === 'run_command' && toolInfo.input?.CommandLine) {
                  summaryText = toolInfo.input.CommandLine;
                } else if ((toolInfo.name === 'view_file' || toolInfo.name === 'read_file') && toolInfo.input?.AbsolutePath) {
                  summaryText = toolInfo.input.AbsolutePath;
                } else if ((toolInfo.name === 'write_to_file' || toolInfo.name === 'replace_file_content') && toolInfo.input?.TargetFile) {
                  summaryText = toolInfo.input.TargetFile;
                } else if (toolInfo.input) {
                  summaryText = typeof toolInfo.input === 'string' ? toolInfo.input : JSON.stringify(toolInfo.input);
                }

                // Determine icon and status text
                let statusIcon = '⏳';
                let statusClass = 'status-running';
                if (toolInfo.status === 'completed') {
                  statusIcon = '✅';
                  statusClass = 'status-completed';
                } else if (toolInfo.status === 'error') {
                  statusIcon = '❌';
                  statusClass = 'status-error';
                }

                return (
                  <div key={b.id} className="claudian-tool-call-container">
                    <div
                      className={`claudian-tool-header ${isCollapsed ? 'collapsed' : ''}`}
                      onClick={() => toggleToolCollapse(b.id)}
                    >
                      <div className="flex items-center gap-2 overflow-hidden flex-1">
                        <span className={`claudian-tool-icon ${statusClass}`}>{statusIcon}</span>
                        <span className="claudian-tool-name">{toolInfo.name}</span>
                        {summaryText && <span className="claudian-tool-summary">{summaryText}</span>}
                      </div>
                      <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                        {toolInfo.result && (
                          <button
                            className="tool-inline-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(toolInfo.result || '');
                            }}
                          >
                            Copy
                          </button>
                        )}
                        <span className="tool-collapse-indicator">{isCollapsed ? '展开 ▼' : '收起 ▲'}</span>
                      </div>
                    </div>
                    {!isCollapsed && toolInfo.result && (
                      <div className="claudian-tool-content">
                        <pre className="claudian-tool-result-pre">
                          {toolInfo.result.trim()}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              }

              // 3. User Sent Chat Bubble
              if (isUserBubble(b.content)) {
                const userContent = formatUserContent(b.content);
                return (
                  <div key={b.id} className="chat-bubble-b user-wrapper">
                    <div className="user-bubble">
                      <div className="bubble-content">{userContent}</div>
                    </div>
                    <div className="bubble-meta-row user-message-meta">
                      <span className="bubble-time">{formatBubbleTime(b.timestamp)}</span>
                      <button className="bubble-copy-btn" onClick={() => handleCopyText(userContent)}>复制</button>
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

              // 4. AI / Assistant / System Response Bubble
              if (!b.content || !b.content.trim()) return null;
              if (!isChatContentRenderable(b.content)) return null;
              const renderedMarkdown = renderMarkdown(b.content, 'chat');
              if (!renderedMarkdown) return null;
              return (
                <div key={b.id} className="chat-bubble-b ai-wrapper">
                  <div className="ai-bubble">
                    <div className="bubble-sender-title">AI DIRECTOR</div>
                    <div className="bubble-content markdown-body-b">
                      {renderedMarkdown}
                    </div>
                  </div>
                  <div className="bubble-meta-row ai-message-meta">
                    <span className="bubble-time">{formatBubbleTime(b.timestamp)}</span>
                    <button className="bubble-copy-btn" onClick={() => handleCopyText(b.content)}>复制</button>
                  </div>
                </div>
              );
            })}

            {agentRunning && (
              <div className="chat-bubble-b ai-wrapper active-agent-loading">
                <div className="ai-bubble loading-state agent-loading-bubble">
                  <div className="bubble-sender-title agent-loading-title">
                    <span className="dot-blink-blue"></span>
                    AI DIRECTOR IS WORKING
                  </div>
                  <div className="bubble-content agent-loading-dots">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Bottom Action Dock (History and New Session Buttons) */}
          <div className="variant-b-action-dock">
            <div className="action-dock-inner w-full">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  title="会话历史"
                  className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5"
                >
                  <History className="h-3 w-3 mr-1" />
                  历史会话
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNewSession}
                  title="开始新会话"
                  className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5"
                >
                  + 新会话
                </Button>
              </div>
              <span className="label-done">通过对话驱动 Claude 推进管线</span>
            </div>
          </div>

          {/* TextInput Command Line Wrapper */}
          <div className="variant-b-input-wrapper">
            <div className={`variant-b-input-container ${hasPendingPrompt ? 'disabled' : ''}`}>
              <div className="input-prompt-symbol">&gt;</div>
              <div className="variant-b-input-scrollarea overflow-y-auto">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder={hasPendingPrompt ? "⚠️ 等待授权决策中，请在上方卡片进行选择以继续..." : "与 AI 导演对话... (Enter 发送，Shift+Enter 换行)"}
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
              </div>
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

        {/* Draggable Divider Bar */}
        {!previewCollapsed && (
          <div
            className={`variant-b-resizer ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleResizerMouseDown}
          />
        )}

        {/* Panel 3: Document Viewer */}
        <section className={`variant-b-preview ${previewCollapsed ? 'collapsed' : ''}`} style={previewCollapsed ? undefined : { width: `${previewWidth}px`, flexShrink: 0 }}>
          <div className="section-header">
            <span>OUTPUT ARTIFACT VISUALIZER</span>
            <button
              className="panel-toggle-chip"
              onClick={() => setPreviewCollapsed(true)}
              title="收起产物预览栏"
            >
              收起
            </button>
          </div>
          <div className="preview-header-b">
            <span className="file-icon-b">📄</span>
            <span className="file-name-b">{previewPath || 'no_file_registered.md'}</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="preview-content-b markdown-rendered-b">
              {renderMarkdown(previewContent, 'preview')}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
