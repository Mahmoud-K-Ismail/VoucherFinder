export default function LoadingSkeletons() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* AI Suggestions Skeleton */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-primary-200 dark:border-primary-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 h-48"></div>
        </div>
      </div>

      {/* Title Skeleton */}
      <div>
        <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
      </div>

      {/* Code Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="glass-effect rounded-xl p-6 shadow-lg h-80"
          >
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="h-16 bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
            <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

