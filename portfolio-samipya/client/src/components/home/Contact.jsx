import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Send, Loader2 } from 'lucide-react';
import { useSubmitContact } from '../../hooks/useContact';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'samipya.ghimire.it@gmail.com', href: 'mailto:samipya.ghimire.it@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Biratnagar, Nepal', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'samipya-ghimire', href: 'https://www.linkedin.com/in/samipya-ghimire-30abb7202' },
];

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const { mutate: submit, isPending } = useSubmitContact();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    submit(form, {
      onSuccess: () => {
        setForm(INITIAL_FORM);
        setErrors({});
      },
    });
  };

  return (
    <SectionWrapper id="contact">
      <div className="section-container">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              I'm currently open to new roles and freelance projects. Whether it's a full-time
              position, contract backend work, or just a technical conversation — reach out.
            </p>

            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="glass-card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-text-primary text-sm hover:text-accent-blue transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-text-primary text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time note */}
            <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-accent-blue/5 border border-accent-blue/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
              <p className="text-text-muted text-sm">
                I typically respond within <span className="text-text-primary font-medium">24 hours</span>.
              </p>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} noValidate className="glass-card p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-text-secondary text-sm mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`form-input ${errors.name ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                    disabled={isPending}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-secondary text-sm mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`form-input ${errors.email ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                    disabled={isPending}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-text-secondary text-sm mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={`form-input ${errors.subject ? 'border-red-500/60' : ''}`}
                  disabled={isPending}
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-text-secondary text-sm mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className={`form-input resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                  disabled={isPending}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-red-400 text-xs">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-text-muted text-xs">{form.message.length}/2000</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={!isPending ? { scale: 1.01 } : {}}
                whileTap={!isPending ? { scale: 0.98 } : {}}
                className="w-full btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
