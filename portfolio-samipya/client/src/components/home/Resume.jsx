import { motion } from 'framer-motion';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import SectionWrapper from '../ui/SectionWrapper';

const Resume = () => {
  const { data: profile } = useProfile();
  const stats = profile?.stats || [];
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  return (
    <SectionWrapper id="resume">
      <div className="section-container">
        <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.12) 0%, transparent 70%)' }} />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-accent-blue" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">Want the full picture?</h2>
            <p className="text-text-secondary max-w-md mx-auto mb-8 leading-relaxed">
              Download my resume for a complete overview of my experience, skills, and accomplishments.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a href={resumeUrl} download="Samipya_Ghimire_Resume.pdf"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary">
                <Download size={16} />Download CV (PDF)
              </motion.a>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary group">
                Contact Me<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {stats.length > 0 && (
              <div className={`grid grid-cols-${Math.min(stats.length, 4)} gap-4 mt-10 pt-8 border-t border-border-subtle max-w-sm mx-auto`}>
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold gradient-text">{value}</p>
                    <p className="text-text-muted text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Resume;
