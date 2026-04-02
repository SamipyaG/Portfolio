import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/samipya', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samipya-ghimire-30abb7202', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:samipya.ghimire.it@gmail.com', label: 'Email' },
];

const Footer = () => (
  <footer className="border-t border-border-subtle bg-bg-secondary/50">
    <div className="section-container py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-text-primary font-semibold text-sm">Samipya Ghimire</p>
          <p className="text-text-muted text-xs mt-0.5">Full Stack MERN Developer · Biratnagar, Nepal</p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-colors"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="text-text-muted text-xs flex items-center gap-1">
          Built with <Heart size={12} className="text-red-400 fill-red-400" /> using MERN Stack
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-border-subtle text-center text-text-muted text-xs">
        © {new Date().getFullYear()} Samipya Ghimire. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
