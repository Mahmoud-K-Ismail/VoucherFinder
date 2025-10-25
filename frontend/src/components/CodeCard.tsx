import { useState } from 'react';
import type { Code } from '../types';
import { trackCodeCopy } from '../services/api';

interface CodeCardProps {
  code: Code;
}

export default function CodeCard({ code }: CodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      
      // Track copy in backend
      trackCodeCopy(code.id).catch(console.error);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getStatusColor = () => {
    switch (code.status) {
      case 'verified':
        return 'bg-success-100 text-success-800 border-success-300';
      case 'unverified':
        return 'bg-warning-100 text-warning-800 border-warning-300';
      case 'expired':
        return 'bg-danger-100 text-danger-800 border-danger-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusIcon = () => {
    switch (code.status) {
      case 'verified':
        return '✓';
      case 'unverified':
        return '○';
      case 'expired':
        return '✗';
      default:
        return '?';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="glass-effect rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in">
      {/* Code */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">CODE:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
            {getStatusIcon()} {code.status}
          </span>
        </div>
        <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-center">
          {code.code}
        </div>
      </div>

      {/* Discount */}
      {(code.discount_percentage || code.discount_description) && (
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            {code.discount_percentage && `${code.discount_percentage}% off`}
            {code.discount_percentage && code.discount_description && ' - '}
            {code.discount_description}
          </div>
        </div>
      )}

      {/* Source */}
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400">Source:</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {code.source_creator || code.source}
          </span>
          {code.source === 'YouTube' && <span className="text-red-600">▶</span>}
        </div>
        {code.date_found && (
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">Posted:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {formatDate(code.date_found)}
            </span>
          </div>
        )}
        {code.uses_count > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">Used by:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {code.uses_count} {code.uses_count === 1 ? 'person' : 'people'}
            </span>
          </div>
        )}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`w-full py-3 rounded-lg font-semibold transition-all transform active:scale-95 ${
          copied
            ? 'bg-success-500 text-white'
            : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
        }`}
      >
        {copied ? '✓ Copied!' : 'Copy Code'}
      </button>

      {/* Visit source link */}
      {code.source_url && (
        <a
          href={code.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          View Source →
        </a>
      )}
    </div>
  );
}

