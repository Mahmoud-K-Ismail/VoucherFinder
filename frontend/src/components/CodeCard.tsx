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
        return 'bg-success-50 text-success-700 border-success-200';
      case 'unverified':
        return 'bg-neutral-50 text-neutral-700 border-neutral-200';
      case 'expired':
        return 'bg-accent-50 text-accent-700 border-accent-200';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}m ago`;
  };

  const getDiscountDisplay = () => {
    if (code.discount_percentage && code.discount_description) {
      return `${code.discount_percentage}% off - ${code.discount_description}`;
    }
    if (code.discount_percentage) {
      return `${code.discount_percentage}% off`;
    }
    return code.discount_description;
  };

  return (
    <div className="card p-6 border-l-4 border-l-primary-500 animate-fade-in">
      {/* Status badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">
          {code.source_creator || code.source}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
          {code.status === 'verified' ? 'Verified' : code.status}
        </span>
      </div>

      {/* Discount amount - prominent */}
      {(code.discount_percentage || code.discount_description) && (
        <div className="mb-4">
          <div className="text-2xl font-bold text-accent-500">
            {getDiscountDisplay()}
          </div>
        </div>
      )}

      {/* Voucher code */}
      <div className="mb-6">
        <div className="font-mono text-xl font-bold text-neutral-900 bg-neutral-50 rounded-lg p-4 text-center border border-neutral-200">
          {code.code}
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-4 flex items-center justify-between text-sm text-neutral-600">
        {code.date_found && (
          <span>Posted {formatDate(code.date_found)}</span>
        )}
        {code.uses_count > 0 && (
          <span>{code.uses_count} uses</span>
        )}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        aria-label={`Copy voucher code ${code.code}`}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          copied
            ? 'bg-success-500 text-white'
            : 'btn-primary'
        }`}
      >
        {copied ? 'Copied!' : 'Copy Code'}
      </button>

      {/* View source link */}
      {code.source_url && (
        <a
          href={code.source_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source for ${code.code}`}
          className="block mt-3 text-center text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
        >
          View Source
        </a>
      )}
    </div>
  );
}

