import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, StarOff, X, Loader2, Save } from 'lucide-react';
import { useSkills, useCreateSkill, useUpdateSkill, useDeleteSkill } from '../../hooks/useSkills';

const CATEGORIES = ['backend', 'frontend', 'database', 'devops', 'qa', 'other'];
const ICON_KEYS = ['node', 'react', 'mongodb', 'docker', 'kubernetes', 'code'];
const CAT_COLORS = { backend: '#68a063', frontend: '#61dafb', database: '#47a248', devops: '#2496ed', qa: '#f59e0b', other: '#9ca3af' };

const EMPTY = { name: '', category: 'backend', isHighlight: false, description: '', relatedTech: [], iconKey: 'code', color: '#4f8ef7', order: 0 };

const SkillForm = ({ initial = EMPTY, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [techInput, setTechInput] = useState('');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.relatedTech.includes(t)) set('relatedTech', [...form.relatedTech, t]);
    setTechInput('');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-secondary text-xs mb-1">Name *</label>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} required className="form-input text-sm" placeholder="e.g. Node.js" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="form-input text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Icon Key</label>
          <select value={form.iconKey} onChange={(e) => set('iconKey', e.target.value)} className="form-input text-sm">
            {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Accent Color</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={form.color} onChange={(e) => set('color', e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
            <input value={form.color} onChange={(e) => set('color', e.target.value)} className="form-input text-sm flex-1 font-mono" />
          </div>
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1">Order</label>
          <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className="form-input text-sm" />
        </div>
        <div className="flex items-center gap-3 pt-5">
          <input type="checkbox" id="hl" checked={form.isHighlight} onChange={(e) => set('isHighlight', e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
          <label htmlFor="hl" className="text-text-secondary text-sm cursor-pointer">
            <span className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-400" />Show as highlight card
            </span>
          </label>
        </div>
      </div>

      {form.isHighlight && (
        <>
          <div>
            <label className="block text-text-secondary text-xs mb-1">Description (shown on card)</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} className="form-input text-sm resize-none" placeholder="Short description for the highlight card..." />
          </div>
          <div>
            <label className="block text-text-secondary text-xs mb-1">Related Technologies</label>
            <div className="flex gap-2 mb-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                placeholder="Add tech (Enter)" className="form-input text-sm flex-1" />
              <button type="button" onClick={addTech} className="btn-secondary px-3"><Plus size={15} /></button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.relatedTech.map((t) => (
                <span key={t} className="tech-badge flex items-center gap-1.5">
                  {t}
                  <button type="button" onClick={() => set('relatedTech', form.relatedTech.filter((x) => x !== t))} className="hover:text-red-400"><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3 pt-2 border-t border-border-subtle">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
        <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }} className="btn-primary flex-1 justify-center disabled:opacity-50">
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Skill
        </motion.button>
      </div>
    </form>
  );
};

const SkillsManager = () => {
  const { data: skills = [], isLoading } = useSkills();
  const create = useCreateSkill();
  const update = useUpdateSkill();
  const remove = useDeleteSkill();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const highlighted = skills.filter((s) => s.isHighlight);
  const normal = skills.filter((s) => !s.isHighlight);

  const handleSubmit = (form) => {
    if (editing) {
      update.mutate({ id: editing._id, data: form }, { onSuccess: () => { setEditing(null); setShowForm(false); } });
    } else {
      create.mutate(form, { onSuccess: () => setShowForm(false) });
    }
  };

  const toggleHighlight = (skill) => {
    update.mutate({ id: skill._id, data: { isHighlight: !skill.isHighlight } });
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 size={22} className="animate-spin text-accent-blue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-text-primary font-bold">Skills ({skills.length})</h2>
          <p className="text-text-muted text-xs mt-0.5">{highlighted.length} highlighted · {normal.length} in tag list</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary">
          <Plus size={15} />Add Skill
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowForm(false); setEditing(null); }}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-bg-card border border-border-subtle rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-text-primary font-bold">{editing ? 'Edit Skill' : 'Add Skill'}</h3>
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
              </div>
              <SkillForm initial={editing || EMPTY} onSubmit={handleSubmit}
                onCancel={() => { setShowForm(false); setEditing(null); }}
                isLoading={create.isPending || update.isPending} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlighted */}
      {highlighted.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Star size={11} className="fill-amber-400" />Highlight Cards ({highlighted.length})
          </p>
          <div className="space-y-2">
            {highlighted.map((skill) => (
              <SkillRow key={skill._id} skill={skill}
                onEdit={() => { setEditing(skill); setShowForm(true); }}
                onDelete={() => setConfirmDelete(skill._id)}
                onToggle={() => toggleHighlight(skill)}
                isUpdating={update.isPending} />
            ))}
          </div>
        </div>
      )}

      {/* Normal */}
      {normal.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">Tag List ({normal.length})</p>
          <div className="space-y-2">
            {normal.map((skill) => (
              <SkillRow key={skill._id} skill={skill}
                onEdit={() => { setEditing(skill); setShowForm(true); }}
                onDelete={() => setConfirmDelete(skill._id)}
                onToggle={() => toggleHighlight(skill)}
                isUpdating={update.isPending} />
            ))}
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-bg-card border border-border-subtle rounded-2xl p-6 max-w-xs w-full text-center">
              <p className="text-text-primary font-bold mb-2">Remove this skill?</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={() => remove.mutate(confirmDelete, { onSuccess: () => setConfirmDelete(null) })}
                  disabled={remove.isPending} className="btn-primary bg-red-500 hover:bg-red-600 border-red-500 flex-1 justify-center disabled:opacity-50">
                  {remove.isPending ? <Loader2 size={14} className="animate-spin" /> : 'Remove'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkillRow = ({ skill, onEdit, onDelete, onToggle, isUpdating }) => (
  <motion.div layout className="glass-card px-4 py-3 flex items-center gap-3">
    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: skill.color }} />
    <span className="text-text-primary text-sm font-medium flex-1">{skill.name}</span>
    <span className="text-xs px-2 py-0.5 rounded capitalize" style={{ background: `${skill.color}15`, color: skill.color }}>{skill.category}</span>
    <button onClick={onToggle} disabled={isUpdating}
      title={skill.isHighlight ? 'Move to tags' : 'Make highlight card'}
      className={`p-1.5 rounded transition-colors disabled:opacity-50 ${skill.isHighlight ? 'text-amber-400 hover:text-text-muted' : 'text-text-muted hover:text-amber-400'}`}>
      {skill.isHighlight ? <Star size={14} className="fill-amber-400" /> : <StarOff size={14} />}
    </button>
    <button onClick={onEdit} className="p-1.5 text-text-muted hover:text-accent-blue transition-colors"><Edit2 size={13} /></button>
    <button onClick={onDelete} className="p-1.5 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
  </motion.div>
);

export default SkillsManager;
