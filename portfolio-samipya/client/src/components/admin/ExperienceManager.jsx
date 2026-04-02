import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { useExperiences, useCreateExperience, useUpdateExperience, useDeleteExperience } from '../../hooks/useExperiences';

const EMPTY = { role: '', company: '', period: '', type: 'Full-time', color: '#4f8ef7', achievements: [], tech: [], order: 0 };

const ExperienceForm = ({ initial = EMPTY, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [achInput, setAchInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const addAch = () => { if (achInput.trim()) { set('achievements', [...form.achievements, achInput.trim()]); setAchInput(''); } };
  const removeAch = (i) => set('achievements', form.achievements.filter((_, idx) => idx !== i));
  const updateAch = (i, v) => { const a = [...form.achievements]; a[i] = v; set('achievements', a); };

  const addTech = () => { if (techInput.trim() && !form.tech.includes(techInput.trim())) { set('tech', [...form.tech, techInput.trim()]); setTechInput(''); } };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-secondary text-xs mb-1">Role *</label>
          <input value={form.role} onChange={(e) => set('role', e.target.value)} required className="form-input text-sm" placeholder="Backend Developer" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Company *</label>
          <input value={form.company} onChange={(e) => set('company', e.target.value)} required className="form-input text-sm" placeholder="Company Name" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Period *</label>
          <input value={form.period} onChange={(e) => set('period', e.target.value)} required className="form-input text-sm" placeholder="Jan 2023 – Present" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Type</label>
          <input value={form.type} onChange={(e) => set('type', e.target.value)} className="form-input text-sm" placeholder="Full-time" />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-text-secondary text-xs mb-1">Accent Color</label>
            <input value={form.color} onChange={(e) => set('color', e.target.value)} className="form-input text-sm font-mono" />
          </div>
          <input type="color" value={form.color} onChange={(e) => set('color', e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Order</label>
          <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className="form-input text-sm" />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <label className="block text-text-secondary text-xs mb-2">Achievements</label>
        <div className="space-y-2 mb-2">
          {form.achievements.map((ach, i) => (
            <div key={i} className="flex gap-2">
              <textarea value={ach} onChange={(e) => updateAch(i, e.target.value)} rows={2} className="form-input text-sm flex-1 resize-none" />
              <button type="button" onClick={() => removeAch(i)} className="p-2 text-text-muted hover:text-red-400 self-start mt-1"><X size={13} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea value={achInput} onChange={(e) => setAchInput(e.target.value)} rows={2} placeholder="Add achievement..." className="form-input text-sm flex-1 resize-none" />
          <button type="button" onClick={addAch} className="btn-secondary px-3 self-start"><Plus size={14} /></button>
        </div>
      </div>

      {/* Tech */}
      <div>
        <label className="block text-text-secondary text-xs mb-2">Tech Stack</label>
        <div className="flex gap-2 mb-2">
          <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            placeholder="Add technology" className="form-input text-sm flex-1" />
          <button type="button" onClick={addTech} className="btn-secondary px-3"><Plus size={14} /></button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.tech.map((t) => (
            <span key={t} className="tech-badge flex items-center gap-1.5">{t}
              <button type="button" onClick={() => set('tech', form.tech.filter((x) => x !== t))} className="hover:text-red-400"><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-border-subtle">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
        <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }} className="btn-primary flex-1 justify-center disabled:opacity-50">
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}Save
        </motion.button>
      </div>
    </form>
  );
};

const ExperienceManager = () => {
  const { data: experiences = [], isLoading } = useExperiences();
  const create = useCreateExperience();
  const update = useUpdateExperience();
  const remove = useDeleteExperience();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSubmit = (form) => {
    if (editing) {
      update.mutate({ id: editing._id, data: form }, { onSuccess: () => { setEditing(null); setShowForm(false); } });
    } else {
      create.mutate(form, { onSuccess: () => setShowForm(false) });
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 size={22} className="animate-spin text-accent-blue" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-text-primary font-bold">Experience ({experiences.length})</h2>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary"><Plus size={15} />Add Experience</button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowForm(false); setEditing(null); }}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-bg-card border border-border-subtle rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-text-primary font-bold">{editing ? 'Edit Experience' : 'Add Experience'}</h3>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
              </div>
              <ExperienceForm initial={editing || EMPTY} onSubmit={handleSubmit}
                onCancel={() => { setShowForm(false); setEditing(null); }}
                isLoading={create.isPending || update.isPending} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {experiences.length === 0
        ? <div className="glass-card p-8 text-center text-text-muted">No experiences yet.</div>
        : experiences.map((exp) => (
          <motion.div key={exp._id} layout className="glass-card overflow-hidden">
            <div className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => setExpanded(expanded === exp._id ? null : exp._id)}>
              <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: exp.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-text-primary font-semibold text-sm">{exp.role}</p>
                <p className="text-text-muted text-xs">{exp.company} · {exp.period}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${exp.color}15`, color: exp.color }}>{exp.type}</span>
              <button onClick={(e) => { e.stopPropagation(); setEditing(exp); setShowForm(true); }} className="p-2 text-text-muted hover:text-accent-blue transition-colors"><Edit2 size={13} /></button>
              <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(exp._id); }} className="p-2 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
              {expanded === exp._id ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
            </div>

            <AnimatePresence>
              {expanded === exp._id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border-subtle">
                  <div className="p-4 space-y-3">
                    <ul className="space-y-1">
                      {exp.achievements.map((a, i) => <li key={i} className="text-text-muted text-xs leading-relaxed">· {a}</li>)}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {exp.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      }

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-bg-card border border-border-subtle rounded-2xl p-6 max-w-xs w-full text-center">
              <p className="text-text-primary font-bold mb-2">Delete this experience?</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={() => remove.mutate(confirmDelete, { onSuccess: () => setConfirmDelete(null) })}
                  disabled={remove.isPending} className="btn-primary bg-red-500 hover:bg-red-600 border-red-500 flex-1 justify-center disabled:opacity-50">
                  {remove.isPending ? <Loader2 size={14} className="animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceManager;
