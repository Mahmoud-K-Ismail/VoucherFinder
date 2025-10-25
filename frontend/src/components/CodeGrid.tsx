import type { Code } from '../types';
import CodeCard from './CodeCard';

interface CodeGridProps {
  codes: Code[];
  brandName?: string;
}

export default function CodeGrid({ codes, brandName }: CodeGridProps) {
  if (codes.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          {brandName ? `${brandName} Vouchers` : 'Vouchers'}
        </h2>
        <p className="text-neutral-600">
          {codes.length} {codes.length === 1 ? 'code' : 'codes'} available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {codes.map((code) => (
          <CodeCard key={code.id} code={code} />
        ))}
      </div>
    </div>
  );
}

