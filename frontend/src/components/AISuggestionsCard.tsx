import { useState } from 'react';
import type { AISuggestion } from '../types';
import { verifySuggestion } from '../services/api';

interface AISuggestionsCardProps {
  suggestions: AISuggestion[];
}

export default function AISuggestionsCard({ suggestions }: AISuggestionsCardProps) {
  const [verifiedIds, setVerifiedIds] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const displayedSuggestions = showAll ? suggestions : suggestions.slice(0, 3);

  const handleVerify = async (suggestionId: number, worked: boolean) => {
    try {
      await verifySuggestion(suggestionId, worked);
      if (worked) {
        setVerifiedIds(new Set([...verifiedIds, suggestionId]));
      }
    } catch (error) {
      console.error('Failed to verify suggestion:', error);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 animate-slide-up">
      <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/50 to-blue-50/50 dark:from-primary-900/20 dark:to-blue-900/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">💡</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Suggestion: Smart Ways to Save
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Discover alternative strategies beyond just coupon codes
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          {displayedSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-slate-200 dark:border-slate-700"
            >
              {/* Title and Type */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {suggestion.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full">
                      {suggestion.suggestion_type.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
                {suggestion.risk_level === 'safe' && (
                  <span className="text-success-600 font-semibold text-sm">✓ Safe</span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                {suggestion.description}
              </p>

              {/* Savings */}
              {suggestion.estimated_savings !== null && suggestion.estimated_savings > 0 && (
                <div className="mb-4 p-3 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <div className="font-bold text-success-800 dark:text-success-200">
                        Estimated savings: ${suggestion.estimated_savings.toFixed(2)}
                        {suggestion.estimated_savings_description && ` (${suggestion.estimated_savings_description})`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditions */}
              {suggestion.conditions && (
                <div className="mb-3 text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Requirements: </span>
                  <span className="text-slate-600 dark:text-slate-400">{suggestion.conditions}</span>
                </div>
              )}

              {/* Pro Tip */}
              {suggestion.pro_tip && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">✨</span>
                    <div>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">Pro tip: </span>
                      <span className="text-blue-700 dark:text-blue-300">{suggestion.pro_tip}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Info */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {suggestion.verification_count > 0 ? (
                    <span>
                      ✓ Verified by <strong>{suggestion.verification_count}</strong> users
                      {suggestion.confidence_score > 0 && (
                        <span className="ml-2">
                          • <strong>{Math.round(suggestion.confidence_score)}%</strong> confidence
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>Be the first to try this!</span>
                  )}
                </div>

                {/* Verify buttons */}
                {!verifiedIds.has(suggestion.id) ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(suggestion.id, true)}
                      className="px-4 py-2 text-sm font-medium bg-success-500 hover:bg-success-600 text-white rounded-lg transition-all"
                    >
                      This Worked!
                    </button>
                    <button
                      onClick={() => handleVerify(suggestion.id, false)}
                      className="px-4 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-all"
                    >
                      Didn't Work
                    </button>
                  </div>
                ) : (
                  <span className="text-success-600 font-semibold text-sm">
                    ✓ Thanks for your feedback!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        {suggestions.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            {showAll ? '▲ Show Less' : `▼ View ${suggestions.length - 3} More Suggestions`}
          </button>
        )}
      </div>
    </div>
  );
}

