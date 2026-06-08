import React from 'react';
import { VariantProps } from './VariantA';

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
  topic_gate: 'Topic Gate',
  script: 'Scripting',
  performance: 'Performance',
  audio: 'Audio Directing',
  storyboard: 'Storyboard',
  video_prompts: 'Video Prompts',
  publish_review: 'Publish Review'
};

export default function VariantB(props: VariantProps) {
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
    <div className="console-container variant-b">
      {/* Swiss Minimalist Top Header */}
      <header className="variant-b-header">
        <div className="header-left">
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
            {connectionStatus}
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="variant-b-grid">
        {/* Panel 1: Vertical Stages Index */}
        <aside className="variant-b-sidebar">
          <div className="section-header">
            <span>PIPELINE INSTANCE</span>
            <span className="active-count">{STAGES.length} STAGES</span>
          </div>
          <div className="stage-cards-container">
            {STAGES.map((stg) => {
              const state = projectState?.stages[stg];
              const status = state?.status || 'ready';
              const isActive = activeStage === stg;
              const isCurrent = projectState?.current_stage === stg;

              return (
                <div
                  key={stg}
                  className={`stage-card-b ${status} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setActiveStage(stg)}
                >
                  <div className="card-top">
                    <span className="status-bullet"></span>
                    <span className="stage-title">{STAGE_NAMES[stg]}</span>
                  </div>
                  
                  {isCurrent && <span className="current-badge">ACTIVE FLOW</span>}

                  {isActive && (
                    <div className="card-actions-b" onClick={e => e.stopPropagation()}>
                      {status === 'ready' && (
                        <button className="btn-b start" onClick={() => sendMacro('start', stg)}>START</button>
                      )}
                      {(status === 'in_progress' || status === 'review_failed') && (
                        <div className="action-row-b">
                          <button className="btn-b validate" onClick={() => sendMacro('validate', stg)}>CHECK</button>
                          <button className="btn-b complete" onClick={() => sendMacro('complete', stg)}>SUBMIT</button>
                        </div>
                      )}
                      {status === 'completed' && <div className="done-label">✓ COMPLETE</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Panel 2: Center Feed (PTY + Logs) */}
        <section className="variant-b-feed">
          <div className="section-header">TERMINAL AGENT FEED</div>
          
          <div className="variant-b-feed-viewport">
            {bubbles.map((b) => {
              if (b.type === 'thought') {
                const expanded = expandedThoughts[b.id];
                return (
                  <div key={b.id} className={`bubble-card thought ${expanded ? 'expanded' : ''}`}>
                    <div className="bubble-card-header" onClick={() => toggleThought(b.id)}>
                      <span>Thought Process</span>
                      <span className="expand-indicator">{expanded ? 'CLOSE' : 'OPEN'}</span>
                    </div>
                    {expanded && <pre className="thought-pre-b">{b.content.trim()}</pre>}
                  </div>
                );
              }
              if (b.type === 'tool_call') {
                return (
                  <div key={b.id} className="bubble-card tool">
                    <div className="bubble-card-header">System Call</div>
                    <pre className="tool-pre-b">{b.content.trim()}</pre>
                  </div>
                );
              }
              return (
                <div key={b.id} className={`bubble-card text ${b.content.startsWith('>') ? 'user-sent' : ''}`}>
                  <pre className="text-pre-b">{b.content}</pre>
                </div>
              );
            })}
          </div>

          <div className="variant-b-input-container">
            <input
              type="text"
              placeholder="Send instruction payload to terminal..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-b-send" onClick={handleSend}>EXEC</button>
          </div>
        </section>

        {/* Panel 3: Document Viewer */}
        <section className="variant-b-preview">
          <div className="section-header">OUTPUT ARTIFACT PREVIEW</div>
          <div className="preview-header-b">
            <span className="file-icon-b">📄</span>
            <span className="file-name-b">{previewPath || 'none'}</span>
          </div>
          <div className="preview-content-b">
            {renderMarkdown(previewContent)}
          </div>
        </section>
      </div>
    </div>
  );
}
