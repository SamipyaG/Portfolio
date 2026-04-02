import { motion } from 'framer-motion';
import { useSkills } from '../../hooks/useSkills';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

// SVG icons for each tech — inline so no external deps needed
const ICONS = {
  node: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 4L44 16V32L24 44L4 32V16L24 4Z" fill="currentColor" opacity="0.15"/>
      <path d="M24 4L44 16V32L24 44L4 32V16L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text x="24" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" fontFamily="monospace">NODE</text>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 24 24)"/>
      <ellipse cx="24" cy="24" rx="20" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 24 24)"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 6 C24 6 34 16 34 26 C34 36 29 42 24 43 C19 42 14 36 14 26 C14 16 24 6 24 6Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <path d="M24 43 L24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="6" y="22" width="36" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
      <rect x="10" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="18" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="26" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="18" y="6" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M42 26 C44 24 44 20 40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="26" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="32" cy="30" r="1.5" fill="currentColor"/>
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08"/>
      <path d="M24 10V24M24 24L34 30M24 24L14 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="10" r="2.5" fill="currentColor"/>
      <circle cx="34" cy="30" r="2.5" fill="currentColor"/>
      <circle cx="14" cy="30" r="2.5" fill="currentColor"/>
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M16 16L8 24L16 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 16L40 24L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 12L20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const CATEGORY_COLORS = {
  backend: '#68a063',
  frontend: '#61dafb',
  database: '#47a248',
  devops: '#2496ed',
  qa: '#f59e0b',
  other: '#9ca3af',
};

const HighlightCard = ({ skill, index }) => {
  const icon = ICONS[skill.iconKey] || ICONS.code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 group relative overflow-hidden"
      style={{ '--card-color': skill.color }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${skill.color}18 0%, transparent 70%)` }}
      />

      {/* Top row: icon + category */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30`, color: skill.color }}
        >
          {icon}
        </div>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full capitalize"
          style={{ background: `${CATEGORY_COLORS[skill.category] || '#4f8ef7'}15`, color: CATEGORY_COLORS[skill.category] || '#4f8ef7' }}
        >
          {skill.category}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-white"
        style={{ color: skill.color }}
      >
        {skill.name}
      </h3>

      {/* Description */}
      {skill.description && (
        <p className="text-text-muted text-sm leading-relaxed mb-4">{skill.description}</p>
      )}

      {/* Related tech tags */}
      {skill.relatedTech?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
          {skill.relatedTech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: `${skill.color}10`, color: skill.color, border: `1px solid ${skill.color}20` }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const { data: skills = [], isLoading } = useSkills();

  const highlighted = skills.filter((s) => s.isHighlight);
  const normal = skills.filter((s) => !s.isHighlight);

  // Group normal skills by category
  const grouped = normal.reduce((acc, s) => {
    const cat = s.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <SectionWrapper id="skills">
      <div className="section-container">
        <SectionHeader
          label="Tech Stack"
          title="Skills & Technologies"
          subtitle="Core technologies I build with daily — plus everything else in my toolkit."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-56 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {/* ── Highlighted skill cards ─────────────────────────────── */}
            {highlighted.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
                {highlighted.map((skill, i) => (
                  <HighlightCard key={skill._id} skill={skill} index={i} />
                ))}
              </div>
            )}

            {/* ── Also know section ───────────────────────────────────── */}
            {Object.keys(grouped).length > 0 && (
              <div className="glass-card p-6">
                <p className="text-text-muted text-xs font-semibold tracking-widest uppercase mb-5">
                  Also in my toolkit
                </p>
                <div className="space-y-4">
                  {Object.entries(grouped).map(([cat, catSkills], i) => (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span
                        className="text-xs font-semibold uppercase tracking-wider w-20 flex-shrink-0"
                        style={{ color: CATEGORY_COLORS[cat] || '#9ca3af' }}
                      >
                        {cat}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {catSkills.map((s) => (
                          <motion.span
                            key={s._id}
                            whileHover={{ scale: 1.05 }}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-active transition-colors cursor-default"
                          >
                            {s.name}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
