import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Plus, Edit2, Trash2, Mail, MailOpen, X, Eye,
  LayoutDashboard, FolderOpen, MessageSquare, Star, Loader2,
  User, Layers, Briefcase, Code2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../hooks/useProjects';
import { useMessages, useMarkRead, useDeleteMessage } from '../hooks/useContact';
import { useSkills } from '../hooks/useSkills';
import { useExperiences } from '../hooks/useExperiences';
import ProjectForm from '../components/admin/ProjectForm';
import ProfileEditor from '../components/admin/ProfileEditor';
import SkillsManager from '../components/admin/SkillsManager';
import ExperienceManager from '../components/admin/ExperienceManager';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

const AdminDashboard = () => {
  const { admin, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [expandedMsg, setExpandedMsg] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: messagesData, isLoading: msgsLoading } = useMessages();
  const { data: skills = [] } = useSkills();
  const { data: experiences = [] } = useExperiences();
  const messages = messagesData?.data || [];
  const unreadCount = messagesData?.unreadCount || 0;

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const markRead = useMarkRead();
  const deleteMsg = useDeleteMessage();

  if (authLoading) return null;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleProjectSubmit = (formData) => {
    if (editingProject) {
      updateProject.mutate({ id: editingProject._id, data: formData }, {
        onSuccess: () => { setEditingProject(null); setShowForm(false); },
      });
    } else {
      createProject.mutate(formData, { onSuccess: () => setShowForm(false) });
    }
  };

  const handleMsgClick = (msg) => {
    setExpandedMsg(expandedMsg?._id === msg._id ? null : msg);
    if (!msg.isRead) markRead.mutate(msg._id);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
              <Layers size={13} className="text-accent-blue" />
            </div>
            <span className="font-semibold text-sm text-text-primary">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-sm hidden sm:block">{admin?.email}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-text-muted hover:text-red-400 text-sm transition-colors">
              <LogOut size={15} /><span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-14 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab bar */}
        <div className="flex gap-1 mb-8 overflow-x-auto hide-scrollbar p-1 bg-bg-card rounded-xl w-fit border border-border-subtle">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === id ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {activeTab === id && (
                <motion.span layoutId="admin-tab" className="absolute inset-0 bg-bg-elevated rounded-lg border border-border-subtle"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={14} />{label}
                {id === 'messages' && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-xs rounded-full bg-accent-blue text-white font-medium">{unreadCount}</span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* ── Overview ──────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Projects', value: projects.length, icon: FolderOpen, color: '#4f8ef7', sub: `${projects.filter((p) => p.featured).length} featured` },
                { label: 'Skills', value: skills.length, icon: Code2, color: '#68a063', sub: `${skills.filter((s) => s.isHighlight).length} highlighted` },
                { label: 'Experience', value: experiences.length, icon: Briefcase, color: '#8b5cf6', sub: 'roles' },
                { label: 'Unread Messages', value: unreadCount, icon: Mail, color: '#f59e0b', sub: `${messages.length} total` },
              ].map(({ label, value, icon: Icon, color, sub }) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5 flex items-center gap-4 cursor-pointer hover:shadow-card-hover transition-all"
                  onClick={() => setActiveTab(label.toLowerCase().split(' ')[0])}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-text-primary">{value}</p>
                    <p className="text-text-secondary text-sm">{label}</p>
                    <p className="text-text-muted text-xs">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="text-text-primary font-semibold text-sm mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Edit Profile', tab: 'profile', icon: User, color: '#4f8ef7' },
                  { label: 'Manage Skills', tab: 'skills', icon: Code2, color: '#68a063' },
                  { label: 'Add Experience', tab: 'experience', icon: Briefcase, color: '#8b5cf6' },
                  { label: 'Add Project', tab: 'projects', icon: FolderOpen, color: '#f59e0b' },
                ].map(({ label, tab, icon: Icon, color }) => (
                  <button key={label} onClick={() => setActiveTab(tab)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border border-border-subtle hover:border-border-active transition-colors text-text-secondary hover:text-text-primary"
                    style={{ background: `${color}08` }}
                  >
                    <Icon size={15} style={{ color }} />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Profile ───────────────────────────────────────────── */}
        {activeTab === 'profile' && <ProfileEditor />}

        {/* ── Skills ────────────────────────────────────────────── */}
        {activeTab === 'skills' && <SkillsManager />}

        {/* ── Experience ────────────────────────────────────────── */}
        {activeTab === 'experience' && <ExperienceManager />}

        {/* ── Projects ──────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-text-primary">Projects ({projects.length})</h2>
              <button onClick={() => { setEditingProject(null); setShowForm(true); }} className="btn-primary">
                <Plus size={16} />Add Project
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => { setShowForm(false); setEditingProject(null); }}
                >
                  <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                    className="bg-bg-card border border-border-subtle rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg font-bold text-text-primary">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                      <button onClick={() => { setShowForm(false); setEditingProject(null); }} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                    </div>
                    <ProjectForm project={editingProject} onSubmit={handleProjectSubmit}
                      onCancel={() => { setShowForm(false); setEditingProject(null); }}
                      isLoading={createProject.isPending || updateProject.isPending} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {projectsLoading ? (
              <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-accent-blue" /></div>
            ) : projects.length === 0 ? (
              <div className="glass-card p-10 text-center text-text-muted">No projects yet.</div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <motion.div key={project._id} layout className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-text-primary font-semibold text-sm truncate">{project.title}</h3>
                        {project.featured && <span className="flex-shrink-0 px-1.5 py-0.5 text-xs rounded bg-amber-500/15 text-amber-400 border border-amber-500/20"><Star size={10} className="inline mr-0.5 fill-amber-400" />Featured</span>}
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-xs rounded bg-accent-blue/10 text-accent-blue border border-accent-blue/20 capitalize">{project.category}</span>
                      </div>
                      <p className="text-text-muted text-xs truncate">{project.shortDescription || project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.slice(0, 5).map((t) => <span key={t} className="tech-badge">{t}</span>)}
                        {project.techStack.length > 5 && <span className="tech-badge">+{project.techStack.length - 5}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingProject(project); setShowForm(true); }} className="p-2 rounded-lg text-text-muted hover:text-accent-blue hover:bg-accent-blue/10 transition-colors"><Edit2 size={15} /></button>
                      <button onClick={() => setConfirmDelete(project._id)} className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {confirmDelete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                    className="bg-bg-card border border-border-subtle rounded-2xl p-6 max-w-sm w-full text-center">
                    <Trash2 size={20} className="text-red-400 mx-auto mb-3" />
                    <h3 className="text-text-primary font-bold mb-1">Delete Project?</h3>
                    <p className="text-text-muted text-sm mb-5">This action cannot be undone.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                      <button onClick={() => deleteProject.mutate(confirmDelete, { onSuccess: () => setConfirmDelete(null) })}
                        disabled={deleteProject.isPending}
                        className="flex-1 btn-primary bg-red-500 hover:bg-red-600 border-red-500 justify-center disabled:opacity-50">
                        {deleteProject.isPending ? <Loader2 size={15} className="animate-spin" /> : 'Delete'}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── Messages ──────────────────────────────────────────── */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-6">
              Contact Messages ({messages.length})
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-accent-blue text-white font-medium">{unreadCount} unread</span>
              )}
            </h2>

            {msgsLoading ? (
              <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-accent-blue" /></div>
            ) : messages.length === 0 ? (
              <div className="glass-card p-10 text-center text-text-muted">No messages yet.</div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div key={msg._id} layout className="glass-card overflow-hidden">
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer" onClick={() => handleMsgClick(msg)}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.isRead ? 'bg-bg-elevated' : 'bg-accent-blue/15 border border-accent-blue/25'}`}>
                          {msg.isRead ? <MailOpen size={14} className="text-text-muted" /> : <Mail size={14} className="text-accent-blue" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-semibold ${msg.isRead ? 'text-text-secondary' : 'text-text-primary'}`}>{msg.name}</span>
                            <span className="text-text-muted text-xs">{msg.email}</span>
                          </div>
                          <p className="text-text-muted text-xs truncate">{msg.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-text-muted text-xs">
                          {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); deleteMsg.mutate(msg._id); }}
                          className="p-1.5 rounded text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors">
                          <Trash2 size={13} />
                        </button>
                        <Eye size={14} className={`text-text-muted transition-transform duration-200 ${expandedMsg?._id === msg._id ? 'opacity-100' : 'opacity-40'}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedMsg?._id === msg._id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-border-subtle">
                          <div className="p-4 sm:p-5">
                            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            <div className="flex items-center justify-between mt-3">
                              <p className="text-text-muted text-xs">{new Date(msg.createdAt).toLocaleString()}</p>
                              <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                className="text-xs text-accent-blue hover:underline">Reply via email →</a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
