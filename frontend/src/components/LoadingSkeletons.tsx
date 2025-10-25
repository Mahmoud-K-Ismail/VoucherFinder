export default function LoadingSkeletons() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-pulse">
      {/* AI Suggestions Skeleton */}
      <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
        <div className="mb-6">
          <div className="h-8 bg-primary-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-primary-200 rounded w-1/2"></div>
        </div>
        <div className="bg-white rounded-lg p-5 border border-neutral-200 h-48"></div>
      </div>

      {/* Title Skeleton */}
      <div>
        <div className="h-9 bg-neutral-200 rounded w-1/4 mb-2"></div>
        <div className="h-5 bg-neutral-200 rounded w-1/6"></div>
      </div>

      {/* Code Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="card p-6 border-l-4 border-l-primary-300 h-80"
          >
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
              <div className="h-6 bg-neutral-200 rounded-full w-20"></div>
            </div>
            <div className="h-8 bg-neutral-200 rounded w-3/4 mb-6"></div>
            <div className="h-20 bg-neutral-100 rounded-lg mb-6"></div>
            <div className="flex justify-between mb-4">
              <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
            </div>
            <div className="h-12 bg-neutral-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

