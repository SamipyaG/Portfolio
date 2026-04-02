import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative z-10 py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
