import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Loader2 } from 'lucide-react';

const INITIAL = {
  title: '',
  description: '',
  shortDescription: '',
  techStack: [],
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  category: 'fullstack',
  featured: false,
  order: 0,
};

const ProjectForm = ({ project, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState(INITIAL);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setForm({ ...INITIAL, ...project });
    } else {
      setForm(INITIAL);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm((p) => ({ ...p, techStack: [...p.techStack, t] }));
    }
    setTechInput('');
  };

  const removeTech = (t) => {
    setForm((p) => ({ ...p, techStack: p.techStack.filter((x) => x !== t) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-sm mb-1">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Project title" className="form-input" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-sm mb-1">Short Description</label>
          <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="One-liner summary" className="form-input" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-text-secondary text-sm mb-1">Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Full description..." className="form-input resize-none" />
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">GitHub URL</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} type="url" placeholder="https://github.com/..." className="form-input" />
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">Live URL</label>
          <input name="liveUrl" value={form.liveUrl} onChange={handleChange} type="url" placeholder="https://..." className="form-input" />
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} type="url" placeholder="https://..." className="form-input" />
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="form-input">
            {['fullstack', 'backend', 'frontend', 'automation', 'other'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm mb-1">Display Order</label>
          <input name="order" value={form.order} onChange={handleChange} type="number" min={0} className="form-input" />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-blue-500" />
          <label htmlFor="featured" className="text-text-secondary text-sm cursor-pointer">Mark as featured</label>
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <label className="block text-text-secondary text-sm mb-1">Tech Stack *</label>
        <div className="flex gap-2 mb-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            placeholder="Add technology (press Enter)"
            className="form-input flex-1"
          />
          <button type="button" onClick={addTech} className="btn-secondary px-3 py-2">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.techStack.map((t) => (
            <span key={t} className="tech-badge flex items-center gap-1.5">
              {t}
              <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400 transition-colors">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
        {form.techStack.length === 0 && (
          <p className="text-text-muted text-xs mt-1">At least one technology is required</p>
        )}
      </div>

      <div className="flex gap-3 pt-2 border-t border-border-subtle">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <motion.button
          type="submit"
          disabled={isLoading || form.techStack.length === 0}
          whileTap={{ scale: 0.97 }}
          className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
          {project ? 'Update Project' : 'Create Project'}
        </motion.button>
      </div>
    </form>
  );
};

export default ProjectForm;
