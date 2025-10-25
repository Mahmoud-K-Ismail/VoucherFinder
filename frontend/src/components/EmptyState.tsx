interface EmptyStateProps {
  brandName?: string;
  message?: string;
}

export default function EmptyState({ brandName, message }: EmptyStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center py-16">
      <div className="glass-effect rounded-2xl p-12 shadow-xl">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {brandName ? `No codes found for ${brandName}` : 'No results found'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {message || "We couldn't find any discount codes for this brand yet."}
        </p>
        <div className="text-sm text-slate-500 dark:text-slate-500">
          <p className="mb-2">Try:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Checking the spelling of the brand name</li>
            <li>Searching for a different brand</li>
            <li>Coming back later as we regularly update our database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

