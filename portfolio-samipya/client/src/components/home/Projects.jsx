import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Layers } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeader from '../ui/SectionHeader';
import { SkeletonGrid } from '../ui/SkeletonCard';

const CATEGORIES = ['all', 'fullstack', 'backend', 'frontend', 'automation'];

const ProjectCard = ({ project, index }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    className="glass-card p-6 flex flex-col gap-4 group cursor-default"
  >
    {/* Project image / placeholder */}
    <div className="relative h-44 rounded-lg bg-bg-elevated border border-border-subtle overflow-hidden">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <Layers size={32} className="text-accent-blue/40 mx-auto" />
            <span className="text-text-muted text-xs font-mono">{project.category}</span>
          </div>
        </div>
      )}
      {project.featured && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium">
          <Star size={10} className="fill-amber-400" />
          Featured
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 space-y-3">
      <div>
        <h3 className="text-text-primary font-bold text-base mb-1 group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Links */}
    <div className="flex gap-2 pt-2 border-t border-border-subtle">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary text-xs font-medium transition-colors px-3 py-1.5 rounded-md hover:bg-bg-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={14} />
          Code
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-accent-blue hover:text-blue-400 text-xs font-medium transition-colors px-3 py-1.5 rounded-md hover:bg-accent-blue/10"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      )}
    </div>
  </motion.article>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: projects, isLoading, isError } = useProjects();

  const filtered = projects
    ? activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)
    : [];

  return (
    <SectionWrapper id="projects">
      <div className="section-container">
        <SectionHeader
          label="Projects"
          title="Featured Work"
          subtitle="Real projects built with the MERN stack — from schema design to deployment."
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent-blue text-white border border-accent-blue'
                  : 'bg-bg-elevated text-text-muted border border-border-subtle hover:text-text-primary hover:border-accent-blue/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {isLoading && <SkeletonGrid count={3} />}

        {isError && (
          <div className="glass-card p-10 text-center text-text-muted">
            <p>Failed to load projects. Please refresh the page.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-10 text-center text-text-muted"
              >
                No projects found in this category.
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project._id} project={project} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
