const SkeletonCard = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="skeleton h-48 w-full rounded-lg" />
    <div className="space-y-2">
      <div className="skeleton h-5 w-2/3 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-4/5 rounded" />
    </div>
    <div className="flex gap-2">
      <div className="skeleton h-6 w-16 rounded-md" />
      <div className="skeleton h-6 w-20 rounded-md" />
      <div className="skeleton h-6 w-14 rounded-md" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
