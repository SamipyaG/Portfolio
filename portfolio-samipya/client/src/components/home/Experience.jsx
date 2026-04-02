import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useExperiences } from '../../hooks/useExperiences';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

const Experience = () => {
  const { data: experiences = [], isLoading } = useExperiences();

  return (
    <SectionWrapper id="experience">
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="Work History"
          subtitle="Real-world impact at a product company, shipping features and squashing bugs."
        />

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => <div key={i} className="skeleton h-64 rounded-xl" />)}
          </div>
        ) : (
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-subtle to-transparent -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-start ${index % 2 !== 0 ? 'lg:[&>*:first-child]:order-last' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 top-8 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10"
                    style={{ borderColor: exp.color, background: '#0a0a0f' }}>
                    <div className="absolute inset-0.5 rounded-full" style={{ background: exp.color, opacity: 0.6 }} />
                  </div>

                  {/* Date side */}
                  <div className={`hidden lg:flex flex-col justify-start pt-6 ${index % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated border border-border-subtle mb-2">
                      <Calendar size={12} className="text-text-muted" />
                      <span className="text-text-muted text-xs font-medium">{exp.period}</span>
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold"
                      style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 hover:shadow-card-hover transition-all duration-300">
                    <div className="lg:hidden flex items-center gap-2 mb-4">
                      <Calendar size={13} className="text-text-muted" />
                      <span className="text-text-muted text-xs">{exp.period}</span>
                      <span className="ml-auto px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: `${exp.color}15`, color: exp.color }}>{exp.type}</span>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                        <Briefcase size={18} style={{ color: exp.color }} />
                      </div>
                      <div>
                        <h3 className="text-text-primary font-bold text-base leading-tight">{exp.role}</h3>
                        <p className="text-text-secondary text-sm">{exp.company}</p>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-5">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex gap-2 text-text-secondary text-sm leading-relaxed">
                          <ChevronRight size={14} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                          {ach}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}20` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
