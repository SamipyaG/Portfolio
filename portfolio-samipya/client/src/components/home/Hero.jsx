import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, Server, Database, Layers } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

const FLOAT_ICONS = [
  { icon: Server, label: 'Node.js', top: '22%', left: '7%', delay: 0 },
  { icon: Database, label: 'MongoDB', top: '62%', left: '5%', delay: 0.5 },
  { icon: Layers, label: 'Express', top: '72%', right: '6%', delay: 1 },
];

const Hero = () => {
  const { data: profile } = useProfile();

  const TYPED_STRINGS = [
    profile?.title || 'Full Stack MERN Developer',
    'Backend Systems Engineer',
    'REST API Architect',
    'Node.js Specialist',
  ];

  const [typedIndex, setTypedIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_STRINGS[typedIndex];
    let timeout;
    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTypedIndex((p) => (p + 1) % TYPED_STRINGS.length);
    } else {
      timeout = setTimeout(
        () => setDisplayText(isDeleting ? current.slice(0, displayText.length - 1) : current.slice(0, displayText.length + 1)),
        isDeleting ? 38 : 75
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typedIndex, TYPED_STRINGS]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const name = profile?.name || 'Samipya Ghimire';
  const firstName = name.split(' ')[0];
  const tagline = profile?.tagline || 'Building Scalable Backend Systems & Modern Web Apps';
  const available = profile?.availability?.available ?? true;
  const availMsg = profile?.availability?.message || 'Available for opportunities';

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Glow orbs */}
      <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Floating labels */}
      {FLOAT_ICONS.map(({ icon: Icon, label, top, left, right, delay }) => (
        <motion.div key={label}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-card border border-border-subtle text-text-muted text-xs pointer-events-none"
          style={{ top, left, right }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon size={14} className="text-accent-blue" />{label}
        </motion.div>
      ))}

      <div className="section-container relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Availability badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 ${
              available
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${available ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={`text-xs font-medium ${available ? 'text-emerald-400' : 'text-amber-400'}`}>{availMsg}</span>
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-text-primary">Hi, I'm </span>
            <span className="gradient-text">{firstName}</span>
            <br />
            <span className="text-text-primary">{name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }} className="h-10 flex items-center mb-6"
          >
            <span className="text-xl sm:text-2xl font-mono text-accent-blue">
              {displayText}<span className="cursor-blink text-accent-blue">|</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-text-secondary text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 text-balance"
          >
            {tagline}.{' '}Specialized in{' '}
            <span className="text-text-primary font-medium">Node.js</span>,{' '}
            <span className="text-text-primary font-medium">REST APIs</span>, and the{' '}
            <span className="text-text-primary font-medium">MERN stack</span>
            {profile?.location ? ` — based in ${profile.location}` : ''}.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap gap-3 mb-12"
          >
            <button onClick={() => scrollTo('projects')} className="btn-primary group">
              View My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-secondary">Get in Touch</button>
            <a href={profile?.resumeUrl || '/resume.pdf'} download className="btn-secondary">
              <Download size={16} />Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className="text-text-muted text-sm">Find me on</span>
            <div className="flex gap-3">
              {[
                { icon: Github, href: profile?.github || '#', label: 'GitHub' },
                { icon: Linkedin, href: profile?.linkedin || '#', label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${profile?.email || ''}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted"
        >
          <span className="text-xs">scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-6 bg-gradient-to-b from-text-muted to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
