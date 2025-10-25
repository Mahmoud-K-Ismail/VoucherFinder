interface EmptyStateProps {
  brandName?: string;
  message?: string;
}

export default function EmptyState({ brandName, message }: EmptyStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center py-16">
      <div className="card p-12">
        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
          {brandName ? `No vouchers found for ${brandName}` : 'No results found'}
        </h3>
        <p className="text-neutral-600 mb-8">
          {message || "We couldn't find any vouchers for this brand yet."}
        </p>
        <div className="text-sm text-neutral-500 text-left max-w-md mx-auto">
          <p className="mb-3 font-medium">Suggestions:</p>
          <ul className="space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Check the spelling of the brand name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Try a different brand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Check back later as we update regularly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

