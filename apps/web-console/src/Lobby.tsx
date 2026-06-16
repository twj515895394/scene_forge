import React, { useState, useEffect } from 'react';
import { Folder, Plus, Sparkles, ArrowRight, Loader2, Film, Clapperboard, Rocket, Zap, Save, RotateCcw, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectInfo {
  slug: string;
  path: string;
  state?: {
    project: string;
    current_stage?: string;
    stages: Record<string, {
      stage: string;
      status: 'ready' | 'in_progress' | 'review_failed' | 'validated' | 'completed';
      updated_at: string;
    }>;
  };
  error?: string;
}

interface LobbyProps {
  onSelectProject: (slug: string) => void;
}

interface ProjectsRootConfig {
  workspaceRoot: string;
  projectsRoot: string;
  defaultProjectsRoot: string;
  configuredProjectsRoot: string;
  isDefault: boolean;
}

const STYLE_POSTERS = [
  { id: 'disney_3d', name: '迪士尼 3D 动画', icon: Film, gradient: 'from-orange-500 to-pink-500' },
  { id: 'classic_film', name: '经典胶片电影', icon: Clapperboard, gradient: 'from-gray-700 to-gray-900' },
  { id: 'pixar_sci_fi', name: '皮克斯科幻风', icon: Rocket, gradient: 'from-blue-500 to-emerald-400' },
  { id: 'cyberpunk_neon', name: '赛博朋克霓虹', icon: Zap, gradient: 'from-fuchsia-500 to-purple-600' }
];

function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'completed': return 'default';
    case 'in_progress': return 'secondary';
    case 'ready': return 'outline';
    case 'review_failed': return 'destructive';
    default: return 'outline';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'completed': return '完成';
    case 'in_progress': return '进行中';
    case 'ready': return '就绪';
    case 'review_failed': return '审核失败';
    default: return status;
  }
}

export default function Lobby({ onSelectProject }: LobbyProps) {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  const [newSlug, setNewSlug] = useState('');
  const [concept, setConcept] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('disney_3d');
  const [wizardError, setWizardError] = useState('');
  const [creating, setCreating] = useState(false);
  const [projectsRootConfig, setProjectsRootConfig] = useState<ProjectsRootConfig | null>(null);
  const [projectsRootInput, setProjectsRootInput] = useState('');
  const [projectsRootSaving, setProjectsRootSaving] = useState(false);
  const [projectsRootMessage, setProjectsRootMessage] = useState('');
  const [showProjectsRootSettings, setShowProjectsRootSettings] = useState(false);

  useEffect(() => {
    fetchProjectsRootConfig();
    fetchProjects();
  }, []);

  const fetchProjectsRootConfig = async () => {
    try {
      const res = await fetch('/api/config/projects-root');
      if (!res.ok) return;
      const data = await res.json();
      setProjectsRootConfig(data);
      setProjectsRootInput(data.projectsRoot || '');
    } catch (err) {
      console.error('Failed to load projects root config:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (slug: string) => setSelectedSlug(slug);
  const handleCardDoubleClick = (slug: string) => onSelectProject(slug);

  const saveProjectsRoot = async (projectsRoot: string) => {
    setProjectsRootSaving(true);
    setProjectsRootMessage('');
    try {
      const res = await fetch('/api/config/projects-root', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectsRoot })
      });
      const data = await res.json();
      if (!res.ok) {
        setProjectsRootMessage(data.error || '项目目录保存失败');
        return;
      }
      setProjectsRootConfig(data);
      setProjectsRootInput(data.projectsRoot || '');
      setSelectedSlug('');
      setProjectsRootMessage('项目目录已保存，项目列表已刷新');
      setShowProjectsRootSettings(false);
      await fetchProjects();
    } catch (err) {
      setProjectsRootMessage(`项目目录保存失败: ${(err as Error).message}`);
    } finally {
      setProjectsRootSaving(false);
    }
  };

  const handleProjectsRootSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProjectsRoot(projectsRootInput);
  };

  const handleResetProjectsRoot = async () => {
    await saveProjectsRoot('');
  };

  const openProjectsRootSettings = () => {
    setProjectsRootInput(projectsRootConfig?.projectsRoot || '');
    setProjectsRootMessage('');
    setShowProjectsRootSettings(true);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setWizardError('');
    if (!newSlug.trim()) {
      setWizardError('项目目录名称不能为空');
      return;
    }
    const cleanSlug = newSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!cleanSlug) {
      setWizardError('项目名称仅能包含英文字符、数字和横线');
      return;
    }

    setCreating(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug: cleanSlug, directorStyleId: selectedStyle, concept })
      });
      if (res.ok) {
        onSelectProject(cleanSlug);
      } else {
        const errData = await res.json();
        setWizardError(errData.error || '创建项目失败');
      }
    } catch (err) {
      setWizardError(`创建失败: ${(err as Error).message}`);
    } finally {
      setCreating(false);
    }
  };

  const getProgressStats = (project: ProjectInfo) => {
    if (!project.state || !project.state.stages) return { text: '未激活', percent: 0 };
    const stages = Object.values(project.state.stages);
    const completed = stages.filter(s => s.status === 'completed').length;
    return {
      text: `${completed} / ${stages.length} 阶段已完成`,
      percent: Math.round((completed / stages.length) * 100)
    };
  };

  const getCurrentStage = (project: ProjectInfo) => {
    if (!project.state?.current_stage) return null;
    const stage = project.state.stages[project.state.current_stage];
    if (!stage) return null;
    return { name: project.state.current_stage, status: stage.status };
  };

  const cardBase = `
    relative p-4 rounded-xl border cursor-pointer select-none
    bg-background/50 backdrop-blur-md
    transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5
  `;

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 md:p-10"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(10,132,255,0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,55,95,0.03) 0%, transparent 50%),
          #070709
        `
      }}
    >
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-semibold tracking-tight text-white">SceneForge Lobby</h1>
            <Badge variant="secondary" className="ml-2 text-white bg-white/10">{projects.length} 个项目</Badge>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0 max-w-[620px] rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 min-w-0">
                <Folder className="h-4 w-4 text-blue-300 shrink-0" />
                <span className="text-xs text-white/45 shrink-0">当前项目目录</span>
                <span className="truncate text-sm font-medium text-white/82">
                  {projectsRootConfig?.projectsRoot || '加载中'}
                </span>
                {projectsRootConfig?.isDefault && (
                  <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/45 shrink-0">默认</span>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={openProjectsRootSettings}
              className="h-10 rounded-full border-white/10 bg-white/[0.035] px-4 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              设置
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Left: Project Cards */}
          <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-black/20">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-white/60">
                最近编辑项目 / RECENT PROJECTS
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">{projects.length} PROJECTS</Badge>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">正在扫描本地工作区项目...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                  <Folder className="h-12 w-12 text-muted-foreground/30" />
                  <h3 className="text-lg font-medium text-white">还没有任何项目</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">在右侧向导中填表，即可创建一个全新的 SceneForge 影视制作项目。</p>
                </div>
              ) : (
                <ScrollArea className="h-[60vh] pr-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((proj) => {
                      const isSelected = selectedSlug === proj.slug;
                      const progress = getProgressStats(proj);
                      const currentStage = getCurrentStage(proj);
                      const lastUpdated = proj.state?.stages
                        ? new Date(Math.max(...Object.values(proj.state.stages).map(s => new Date(s.updated_at).getTime()))).toLocaleDateString()
                        : '未知时间';

                      return (
                        <div
                          key={proj.slug}
                          className={`
                            ${cardBase}
                            ${isSelected
                              ? 'border-primary/60 ring-1 ring-primary/30 bg-primary/[0.04] shadow-md shadow-primary/10'
                              : 'border-border/60 hover:border-primary/30'
                            }
                          `}
                          onClick={() => handleCardClick(proj.slug)}
                          onDoubleClick={() => handleCardDoubleClick(proj.slug)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="p-1.5 rounded-md bg-muted/50">
                              <Folder className="h-4 w-4 text-muted-foreground" />
                            </div>
                            {currentStage && (
                              <Badge variant={getStatusVariant(currentStage.status)} className="text-[10px] h-5">
                                {getStatusLabel(currentStage.status)}
                              </Badge>
                            )}
                          </div>

                          <h3 className="font-medium text-sm truncate mb-3 text-white">{proj.slug}</h3>

                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                              <span>进度</span>
                              <span className="text-foreground/80 font-medium">{progress.text}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>修改</span>
                              <span>{lastUpdated}</span>
                            </div>
                          </div>

                          {progress.percent > 0 && (
                            <div className="mt-2.5 h-1 bg-muted/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                          )}

                          <div className="mt-3 text-[10px] text-muted-foreground/40 flex items-center gap-1 opacity-0 group-hover:opacity-100 hover:!opacity-100 transition-opacity duration-200">
                            <ArrowRight className="h-3 w-3" />
                            双击卡片进入工作台
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Right: Create Wizard */}
          <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl shadow-black/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-white/60">
                创建新项目 / CREATE PROJECT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProject} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="projectSlug" className="text-sm font-medium text-white/90">
                    项目目录名称
                    <span className="text-muted-foreground font-normal ml-1 text-xs">(Project Slug)</span>
                  </label>
                  <Input
                    id="projectSlug"
                    type="text"
                    placeholder="例如: girls-skateboard-chase"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <p className="text-xs text-muted-foreground/60">只能使用小写英文、数字、中横线</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="concept" className="text-sm font-medium text-white/90">
                    选题核心想法
                    <span className="text-muted-foreground font-normal ml-1 text-xs">(Concept)</span>
                  </label>
                  <Textarea
                    id="concept"
                    rows={3}
                    placeholder="写下关于这个片段的热点想法、原著梗概或者台词片段..."
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="bg-muted/30 border-border/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">影视风格包选择</label>
                  <div className="grid grid-cols-2 gap-2">
                    {STYLE_POSTERS.map((sty) => {
                      const isSelected = selectedStyle === sty.id;
                      const Icon = sty.icon;
                      return (
                        <div
                          key={sty.id}
                          className={`
                            relative p-3 rounded-lg cursor-pointer transition-all duration-200
                            bg-gradient-to-br ${sty.gradient}
                            ${isSelected
                              ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-background scale-[1.02]'
                              : 'hover:ring-1 hover:ring-white/20 hover:scale-[1.01]'
                            }
                          `}
                          onClick={() => setSelectedStyle(sty.id)}
                        >
                          <Icon className="h-6 w-6 text-white mb-1 drop-shadow" />
                          <p className="text-xs font-medium text-white">{sty.name}</p>
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                              <span className="text-black text-xs font-bold">✓</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator className="bg-border/50" />

                {wizardError && (
                  <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                    <AlertTitle>{wizardError}</AlertTitle>
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
                  disabled={creating}
                >
                  {creating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  创建并激活项目 (Create & Launch)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {showProjectsRootSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-6 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0d0f15] shadow-2xl shadow-black/50">
            <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">项目目录设置</h2>
                <p className="mt-1 text-sm text-white/50">首页项目列表、新建项目和会话记录都会从这个目录读取。</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowProjectsRootSettings(false)}
                className="h-8 w-8 rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleProjectsRootSubmit} className="space-y-5 px-6 py-6">
              <div className="space-y-2">
                <label htmlFor="projectsRoot" className="text-sm font-medium text-white/90">
                  项目总目录
                </label>
                <Input
                  id="projectsRoot"
                  value={projectsRootInput}
                  onChange={(e) => setProjectsRootInput(e.target.value)}
                  placeholder={projectsRootConfig?.defaultProjectsRoot || '<workspaceRoot>/projects'}
                  className="h-12 bg-white/[0.045] border-white/10 text-white focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/20"
                />
                <div className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-xs leading-6 text-white/48">
                  <div className="truncate">当前扫描：{projectsRootConfig?.projectsRoot || '加载中'}</div>
                  <div className="truncate">默认目录：{projectsRootConfig?.defaultProjectsRoot || '<workspaceRoot>/projects'}</div>
                </div>
                {projectsRootMessage && (
                  <p className="text-sm text-blue-300/90">{projectsRootMessage}</p>
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResetProjectsRoot}
                  disabled={projectsRootSaving}
                  className="text-white/60 hover:bg-white/8 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  恢复默认目录
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProjectsRootSettings(false)}
                    disabled={projectsRootSaving}
                    className="border-white/10 bg-transparent text-white/70 hover:bg-white/8 hover:text-white"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    disabled={projectsRootSaving}
                    className="bg-white text-black hover:bg-white/90"
                  >
                    {projectsRootSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    保存设置
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
