import React from 'react';

export interface ChatBubble {
  id: string;
  type: 'thought' | 'tool_call' | 'text' | 'system';
  content: string;
  timestamp: string;
}

export interface StageState {
  stage: string;
  status: 'ready' | 'in_progress' | 'review_failed' | 'validated' | 'completed';
  updated_at: string;
  started_at?: string;
  completed_at?: string;
  handoff_path?: string;
  validation_result_path?: string;
}

export interface ProjectState {
  project: string;
  current_stage?: string;
  stages: Record<string, StageState>;
}

export interface VariantProps {
  projectState: ProjectState | null;
  bubbles: ChatBubble[];
  inputVal: string;
  setInputVal: (val: string) => void;
  activeStage: string;
  setActiveStage: (stage: string) => void;
  previewContent: string;
  previewPath: string;
  connectionStatus: 'connecting' | 'open' | 'closed';
  expandedThoughts: Record<string, boolean>;
  toggleThought: (id: string) => void;
  sendMacro: (action: 'start' | 'validate' | 'complete', stage: string) => void;
  handleSend: () => void;
  renderMarkdown: (text: string) => React.ReactNode;
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

export default function VariantA(props: VariantProps) {
  const {
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
  } = props;

  return (
    <div className="console-container variant-a">
      {/* Header */}
      <header className="variant-a-header">
        <div className="logo-group">
          <div className="logo-pulse"></div>
          <h1>SceneForge <span className="version-pill">v9</span> <span className="style-sub">Cinema Studio</span></h1>
        </div>
        <div className="project-slug-display">
          <span className="slug-label">Project:</span>
          <span className="slug-value">{projectState?.project || 'Unloaded'}</span>
        </div>
        <div className="status-badge">
          <span className={`dot ${connectionStatus}`}></span>
          {connectionStatus === 'open' ? 'Studio Linked' : connectionStatus === 'connecting' ? 'Linking...' : 'Offline'}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="variant-a-main">
        {/* Left Side: Pipeline and Chat */}
        <section className="variant-a-left">
          {/* Timeline Beats Panel */}
          <div className="variant-a-timeline-panel">
            <div className="panel-title-a">影视制作时间轴 / Script Timeline</div>
            <div className="horizontal-timeline">
              {STAGES.map((stg, idx) => {
                const state = projectState?.stages[stg];
                const status = state?.status || 'ready';
                const isActive = activeStage === stg;
                const isCurrent = projectState?.current_stage === stg;

                return (
                  <div
                    key={stg}
                    className={`timeline-node ${status} ${isActive ? 'active' : ''} ${isCurrent ? 'current-marker' : ''}`}
                    onClick={() => setActiveStage(stg)}
                  >
                    <div className="node-index">{idx + 1}</div>
                    <div className="node-meta">
                      <div className="node-name">{STAGE_NAMES[stg].split(' ')[0]}</div>
                      <div className="node-status">{status.replace('_', ' ')}</div>
                    </div>
                    {idx < STAGES.length - 1 && <div className="timeline-connector"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Combined Console Control & Chat */}
          <div className="variant-a-console-panel">
            <div className="panel-title-a">智能协作控制台 / Collaborative agent</div>
            
            {/* Interactive Session */}
            <div className="variant-a-chat-viewport">
              {bubbles.map((b) => {
                if (b.type === 'thought') {
                  const expanded = expandedThoughts[b.id];
                  return (
                    <div key={b.id} className="chat-bubble thought-bubble-a">
                      <div className="bubble-header-a" onClick={() => toggleThought(b.id)}>
                        <span>⚡ Agent Thinking</span>
                        <span className="toggle-btn-a">{expanded ? 'Collapse [-]' : 'Expand [+]'}</span>
                      </div>
                      {expanded && <pre className="thought-body-a">{b.content.trim()}</pre>}
                    </div>
                  );
                }
                if (b.type === 'tool_call') {
                  return (
                    <div key={b.id} className="chat-bubble tool-bubble-a">
                      <div className="bubble-header-a">⚙️ Command Execution</div>
                      <pre className="tool-body-a">{b.content.trim()}</pre>
                    </div>
                  );
                }
                return (
                  <div key={b.id} className={`chat-bubble text-bubble-a ${b.content.startsWith('>') ? 'user-echo' : ''}`}>
                    <pre className="text-body-a">{b.content}</pre>
                  </div>
                );
              })}
            </div>

            {/* Input & Stage Operations */}
            <div className="variant-a-control-footer">
              <div className="stage-quick-actions">
                <span className="action-label">当前阶段操作:</span>
                {STAGES.map((stg) => {
                  if (stg !== activeStage) return null;
                  const state = projectState?.stages[stg];
                  const status = state?.status || 'ready';

                  return (
                    <div key={stg} className="action-buttons-wrapper">
                      {status === 'ready' && (
                        <button className="btn-a start" onClick={() => sendMacro('start', stg)}>开启阶段 (Start)</button>
                      )}
                      {(status === 'in_progress' || status === 'review_failed') && (
                        <>
                          <button className="btn-a validate" onClick={() => sendMacro('validate', stg)}>格式校验 (Validate)</button>
                          <button className="btn-a complete" onClick={() => sendMacro('complete', stg)}>完成提交 (Complete)</button>
                        </>
                      )}
                      {status === 'completed' && <span className="status-completed-label">✓ 本阶段已制作完成</span>}
                    </div>
                  );
                })}
              </div>
              
              <div className="chat-input-bar-a">
                <input
                  type="text"
                  placeholder="在此输入指令与 AI 导演对话..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="send-btn-a" onClick={handleSend}>发送</button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Large Cinematic Document Preview */}
        <section className="variant-a-right">
          <div className="panel-title-a">电影脚本与故事板预览 / Output Preview</div>
          <div className="preview-meta-a">
            <span className="file-tag">FINAL DELIVERY</span>
            <span className="file-path-a">{previewPath || 'No file generated yet'}</span>
          </div>
          <div className="preview-viewport-a">
            {renderMarkdown(previewContent)}
          </div>
        </section>
      </main>
    </div>
  );
}
