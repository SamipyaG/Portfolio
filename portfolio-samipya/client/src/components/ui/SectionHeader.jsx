const SectionHeader = ({ label, title, subtitle }) => (
  <div className="mb-14">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
      <span className="text-accent-blue text-xs font-semibold tracking-widest uppercase">{label}</span>
    </div>
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle mt-3 max-w-2xl">{subtitle}</p>}
  </div>
);

export default SectionHeader;
