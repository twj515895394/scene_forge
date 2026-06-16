import React from 'react';
import { History, Loader2, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SessionInfo {
  id: string;
  sessionId?: string;
  preview: string;
  timestamp: string;
  messageCount: number;
  scope?: 'project' | 'workspace';
  scopeLabel?: string;
}

interface ChatHistoryProps {
  sessions: SessionInfo[];
  loading: boolean;
  currentSessionId: string | null;
  onSelect: (sessionId: string) => void;
  onClose: () => void;
}

export default function ChatHistory({ sessions, loading, currentSessionId, onSelect, onClose }: ChatHistoryProps) {
  return (
    <div className="variant-b-history-panel">
      <div className="history-panel-header">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <span className="history-title">会话历史 / HISTORY</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12 text-xs text-muted-foreground">
            暂无历史会话
          </div>
        ) : (
          <div className="history-list">
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`history-item ${currentSessionId === s.id ? 'active' : ''}`}
                onClick={() => onSelect(s.id)}
              >
                <div className="history-item-top">
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span className={`history-item-scope ${s.scope === 'workspace' ? 'workspace' : 'project'}`}>
                    {s.scopeLabel || (s.scope === 'workspace' ? 'Workspace Root' : 'Project')}
                  </span>
                  <span className="history-item-date">
                    {new Date(s.timestamp).toLocaleDateString()} {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="history-item-count">{s.messageCount} 条</span>
                </div>
                <p className="history-item-preview">{s.preview}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
