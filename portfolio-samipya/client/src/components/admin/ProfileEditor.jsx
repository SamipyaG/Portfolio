import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, X, Save } from 'lucide-react';
import { useProfile, useUpdateProfile } from '../../hooks/useProfile';

const Field = ({ label, children }) => (
  <div>
    <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const Input = (props) => <input {...props} className={`form-input text-sm ${props.className || ''}`} />;

const ProfileEditor = () => {
  const { data: profile, isLoading } = useProfile();
  const { mutate: save, isPending } = useUpdateProfile();

  const [form, setForm] = useState(null);
  const [bioInput, setBioInput] = useState('');
  const [statInput, setStatInput] = useState({ value: '', label: '' });

  useEffect(() => {
    if (profile && !form) setForm({ ...profile });
  }, [profile]);

  if (isLoading || !form) return <div className="flex justify-center py-12"><Loader2 size={22} className="animate-spin text-accent-blue" /></div>;

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const setNested = (parent, key, val) => setForm((p) => ({ ...p, [parent]: { ...p[parent], [key]: val } }));

  const addBio = () => {
    if (!bioInput.trim()) return;
    set('bio', [...(form.bio || []), bioInput.trim()]);
    setBioInput('');
  };

  const removeBio = (i) => set('bio', form.bio.filter((_, idx) => idx !== i));

  const addStat = () => {
    if (!statInput.value || !statInput.label) return;
    set('stats', [...(form.stats || []), { ...statInput }]);
    setStatInput({ value: '', label: '' });
  };

  const removeStat = (i) => set('stats', form.stats.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    save(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Identity ─────────────────────────────────────────────── */}
      <section className="glass-card p-6 space-y-5">
        <h3 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Identity</h3>

        {/* Photo preview */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl border border-border-subtle overflow-hidden bg-bg-elevated flex items-center justify-center flex-shrink-0">
            {form.photoUrl
              ? <img src={form.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              : <span className="text-text-muted text-xs text-center px-1">No photo</span>}
          </div>
          <Field label="Photo URL">
            <Input value={form.photoUrl} onChange={(e) => set('photoUrl', e.target.value)} placeholder="https://..." className="w-64" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name"><Input value={form.name} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="Title"><Input value={form.title} onChange={(e) => set('title', e.target.value)} /></Field>
        </div>
        <Field label="Tagline">
          <Input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </Field>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section className="glass-card p-6 space-y-4">
        <h3 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Contact Info</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+977 ..." /></Field>
          <Field label="Location"><Input value={form.location} onChange={(e) => set('location', e.target.value)} /></Field>
          <Field label="Resume URL"><Input value={form.resumeUrl} onChange={(e) => set('resumeUrl', e.target.value)} /></Field>
          <Field label="LinkedIn URL"><Input value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} /></Field>
          <Field label="GitHub URL"><Input value={form.github} onChange={(e) => set('github', e.target.value)} /></Field>
        </div>
      </section>

      {/* ── Availability ─────────────────────────────────────────── */}
      <section className="glass-card p-6 space-y-4">
        <h3 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Availability Badge</h3>
        <div className="flex items-center gap-3 mb-3">
          <input type="checkbox" id="avail" checked={form.availability?.available ?? true}
            onChange={(e) => setNested('availability', 'available', e.target.checked)}
            className="w-4 h-4 rounded accent-blue-500" />
          <label htmlFor="avail" className="text-text-secondary text-sm">Mark as available</label>
        </div>
        <Field label="Badge Message">
          <Input value={form.availability?.message || ''} onChange={(e) => setNested('availability', 'message', e.target.value)} placeholder="Available for opportunities" />
        </Field>
      </section>

      {/* ── Bio paragraphs ───────────────────────────────────────── */}
      <section className="glass-card p-6 space-y-4">
        <h3 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Bio Paragraphs</h3>
        <div className="space-y-2">
          {(form.bio || []).map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea value={para} rows={3}
                onChange={(e) => { const b = [...form.bio]; b[i] = e.target.value; set('bio', b); }}
                className="form-input flex-1 resize-none text-sm" />
              <button type="button" onClick={() => removeBio(i)} className="p-2 text-text-muted hover:text-red-400 transition-colors mt-1">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea value={bioInput} onChange={(e) => setBioInput(e.target.value)} rows={2}
            placeholder="Add a new bio paragraph..." className="form-input flex-1 resize-none text-sm" />
          <button type="button" onClick={addBio} className="btn-secondary px-3 self-start mt-0">
            <Plus size={15} />
          </button>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="glass-card p-6 space-y-4">
        <h3 className="text-text-primary font-semibold text-sm border-b border-border-subtle pb-3">Resume Stats</h3>
        <div className="space-y-2">
          {(form.stats || []).map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={stat.value} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], value: e.target.value }; set('stats', s); }} placeholder="Value" className="w-24" />
              <Input value={stat.label} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], label: e.target.value }; set('stats', s); }} placeholder="Label" className="flex-1" />
              <button type="button" onClick={() => removeStat(i)} className="p-2 text-text-muted hover:text-red-400 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input value={statInput.value} onChange={(e) => setStatInput((p) => ({ ...p, value: e.target.value }))} placeholder="e.g. 1+" className="w-24" />
          <Input value={statInput.label} onChange={(e) => setStatInput((p) => ({ ...p, label: e.target.value }))} placeholder="e.g. Year Experience" className="flex-1" />
          <button type="button" onClick={addStat} className="btn-secondary px-3"><Plus size={15} /></button>
        </div>
      </section>

      {/* Save */}
      <motion.button type="submit" disabled={isPending} whileTap={{ scale: 0.98 }}
        className="btn-primary w-full justify-center py-3 disabled:opacity-50">
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        Save Profile
      </motion.button>
    </form>
  );
};

export default ProfileEditor;
