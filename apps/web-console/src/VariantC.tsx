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
  topic_gate: 'Topic Gate (选题)',
  script: 'Script (剧本)',
  performance: 'Performance (表演)',
  audio: 'Audio (声音)',
  storyboard: 'Storyboard (分镜)',
  video_prompts: 'Prompts (提示词)',
  publish_review: 'Review (发布评审)'
};

const STAGE_ICONS: Record<string, string> = {
  topic_gate: '💡',
  script: '✍️',
  performance: '🎭',
  audio: '🔊',
  storyboard: '🖼️',
  video_prompts: '📹',
  publish_review: '🚀'
};

export default function VariantC(props: VariantProps) {
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
    <div className="console-container variant-c">
      {/* Premiere Pro Style Top Header */}
      <header className="variant-c-header">
        <div className="title-left">
          <div className="brand-dot"></div>
          <h1>SceneForge <span>v9</span></h1>
          <span className="layout-mode-tag">MULTI-TRACK EDITOR</span>
        </div>
        
        <div className="meta-right">
          <div className="meta-item">
            <span className="meta-lbl">PROJECT:</span>
            <span className="meta-val highlight">{projectState?.project || 'N/A'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-lbl">ACTIVE STAGE:</span>
            <span className="meta-val">{activeStage.toUpperCase()}</span>
          </div>
          <div className="meta-item">
            <span className="meta-lbl">LINK:</span>
            <span className={`status-badge-c ${connectionStatus}`}>{connectionStatus}</span>
          </div>
        </div>
      </header>

      {/* Media Timeline Track (Top Section - Full Width Horizontal Slider) */}
      <section className="variant-c-timeline-track">
        <div className="track-title-bar">
          <span className="icon">🎬</span>
          <span>VIDEO STAGE TIMELINE TRACK (HORIZONTAL CONTROLS)</span>
        </div>
        <div className="track-slider">
          {STAGES.map((stg, idx) => {
            const state = projectState?.stages[stg];
            const status = state?.status || 'ready';
            const isActive = activeStage === stg;
            const isCurrent = projectState?.current_stage === stg;

            return (
              <div
                key={stg}
                className={`track-card ${status} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => setActiveStage(stg)}
              >
                <div className="track-card-header">
                  <span className="idx">CH {idx + 1}</span>
                  <span className="status-dot"></span>
                </div>
                
                <div className="track-card-body">
                  <div className="icon">{STAGE_ICONS[stg]}</div>
                  <div className="name">{STAGE_NAMES[stg]}</div>
                  <div className="state">{status.toUpperCase()}</div>
                </div>

                <div className="track-card-footer" onClick={e => e.stopPropagation()}>
                  {status === 'ready' && (
                    <button className="btn-c start" onClick={() => sendMacro('start', stg)}>START</button>
                  )}
                  {(status === 'in_progress' || status === 'review_failed') && (
                    <div className="btn-group-c">
                      <button className="btn-c validate" onClick={() => sendMacro('validate', stg)}>LINT</button>
                      <button className="btn-c complete" onClick={() => sendMacro('complete', stg)}>DONE</button>
                    </div>
                  )}
                  {status === 'completed' && <span className="lbl-done">READY ✓</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Down Section: Split View of Chat and Preview */}
      <div className="variant-c-split">
        {/* Left: Chat Feed */}
        <section className="variant-c-chat">
          <div className="split-header">AGENT DIALOG CONTROLLER</div>
          <div className="variant-c-chat-viewport">
            {bubbles.map((b) => {
              if (b.type === 'thought') {
                const expanded = expandedThoughts[b.id];
                return (
                  <div key={b.id} className="bubble-c thought">
                    <div className="bubble-header-c" onClick={() => toggleThought(b.id)}>
                      <span>⚡ AI COGNITIVE STEPS</span>
                      <span className="btn-toggle">{expanded ? 'COLLAPSE' : 'EXPAND'}</span>
                    </div>
                    {expanded && <pre className="thought-body-c">{b.content.trim()}</pre>}
                  </div>
                );
              }
              if (b.type === 'tool_call') {
                return (
                  <div key={b.id} className="bubble-c tool">
                    <div className="bubble-header-c">⚙️ SYSTEM EXECUTION</div>
                    <pre className="tool-body-c">{b.content.trim()}</pre>
                  </div>
                );
              }
              return (
                <div key={b.id} className={`bubble-c text ${b.content.startsWith('>') ? 'user' : ''}`}>
                  <pre className="text-body-c">{b.content}</pre>
                </div>
              );
            })}
          </div>
          
          <div className="variant-c-input-bar">
            <input
              type="text"
              placeholder="Send command to active channel..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn-c" onClick={handleSend}>SEND</button>
          </div>
        </section>

        {/* Right: Document Preview */}
        <section className="variant-c-preview">
          <div className="split-header">STAGE ARTIFACT VIEWER</div>
          <div className="meta-path-c">
            <span className="lbl">PATH:</span>
            <span className="val">{previewPath || 'no file generated'}</span>
          </div>
          <div className="preview-viewport-c">
            {renderMarkdown(previewContent)}
          </div>
        </section>
      </div>
    </div>
  );
}
