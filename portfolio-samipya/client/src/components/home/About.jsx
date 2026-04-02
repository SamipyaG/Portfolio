import { motion } from 'framer-motion';
import { MapPin, Briefcase, Mail, Code2, Zap, Shield } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';

const HIGHLIGHTS = [
  {
    icon: Code2,
    title: 'Backend-First Mindset',
    description: 'Node.js & Express APIs designed for scale — clean MVC architecture, optimized MongoDB schemas, and bulletproof middleware pipelines.',
    color: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20',
  },
  {
    icon: Zap,
    title: 'Performance Obsessed',
    description: 'Database query optimization, caching strategies, and profiling are part of my workflow — not afterthoughts.',
    color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20',
  },
  {
    icon: Shield,
    title: 'QA & Automation',
    description: 'Playwright automation, regression testing, and production debugging experience from working directly in a live product environment.',
    color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20',
  },
];

const About = () => {
  const { data: profile } = useProfile();

  const bio = profile?.bio || [];
  const location = profile?.location || 'Biratnagar, Nepal';
  const email = profile?.email || '';
  const photo = profile?.photoUrl || '';

  return (
    <SectionWrapper id="about">
      <div className="section-container">
        <SectionHeader label="About Me" title="I build systems that scale" subtitle="Backend-focused developer with a full-stack perspective." />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: photo (if set) + bio */}
          <div className="space-y-6">
            {photo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-accent-blue/20 shadow-glow"
              >
                <img src={photo} alt={profile?.name} className="w-full h-full object-cover" />
              </motion.div>
            )}

            <div className="space-y-4">
              {bio.map((para, i) => (
                <p key={i} className="text-text-secondary leading-relaxed text-base">{para}</p>
              ))}
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: MapPin, text: location },
                { icon: Briefcase, text: 'G-Mana (Dec 2023–Present)' },
                { icon: Mail, text: email },
              ].filter((x) => x.text).map(({ icon: Icon, text }) => (
                <div key={text}
                  className="flex items-center gap-1.5 text-sm text-text-muted bg-bg-elevated border border-border-subtle px-3 py-1.5 rounded-full"
                >
                  <Icon size={13} className="text-accent-blue flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, description, color, bg, border }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-5 flex gap-4 group hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
