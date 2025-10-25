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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {brandName ? `Discount Codes for ${brandName}` : 'Discount Codes'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Found {codes.length} {codes.length === 1 ? 'code' : 'codes'} from multiple sources
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

