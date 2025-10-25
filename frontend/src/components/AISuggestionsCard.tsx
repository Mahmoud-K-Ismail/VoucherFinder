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
    <div className="w-full max-w-6xl mx-auto mb-12 animate-slide-up">
      <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Smart Saving Strategies
          </h2>
          <p className="text-sm text-neutral-600">
            Alternative ways to save beyond voucher codes
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          {displayedSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-white rounded-lg p-5 shadow-card border border-neutral-200"
            >
              {/* Title and Type */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {suggestion.title}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
                    {suggestion.suggestion_type.replace(/_/g, ' ')}
                  </span>
                </div>
                {suggestion.risk_level === 'safe' && (
                  <span className="text-success-600 font-semibold text-sm whitespace-nowrap ml-2">Verified Safe</span>
                )}
              </div>

              {/* Description */}
              <p className="text-neutral-700 mb-4 leading-relaxed">
                {suggestion.description}
              </p>

              {/* Savings */}
              {suggestion.estimated_savings !== null && suggestion.estimated_savings > 0 && (
                <div className="mb-4 p-4 bg-accent-50 rounded-lg border-l-4 border-accent-500">
                  <div className="font-bold text-accent-600 text-lg">
                    Save ${suggestion.estimated_savings.toFixed(2)}
                    {suggestion.estimated_savings_description && (
                      <span className="text-sm font-normal text-neutral-600 ml-2">
                        {suggestion.estimated_savings_description}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Conditions */}
              {suggestion.conditions && (
                <div className="mb-3 text-sm">
                  <span className="font-semibold text-neutral-700">Requirements: </span>
                  <span className="text-neutral-600">{suggestion.conditions}</span>
                </div>
              )}

              {/* Pro Tip */}
              {suggestion.pro_tip && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <span className="font-semibold text-neutral-900">Tip: </span>
                  <span className="text-neutral-700">{suggestion.pro_tip}</span>
                </div>
              )}

              {/* Verification Info */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <div className="text-sm text-neutral-600">
                  {suggestion.verification_count > 0 ? (
                    <span>
                      <strong>{suggestion.verification_count}</strong> {suggestion.verification_count === 1 ? 'person' : 'people'} verified this
                      {suggestion.confidence_score > 0 && (
                        <span className="ml-2 text-success-600 font-medium">
                          {Math.round(suggestion.confidence_score)}% confidence
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>Be the first to try this</span>
                  )}
                </div>

                {/* Verify buttons */}
                {!verifiedIds.has(suggestion.id) ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(suggestion.id, true)}
                      aria-label="Mark suggestion as worked"
                      className="px-4 py-2 text-sm font-semibold bg-success-500 hover:bg-success-600 text-white rounded-lg transition-all"
                    >
                      Worked
                    </button>
                    <button
                      onClick={() => handleVerify(suggestion.id, false)}
                      aria-label="Mark suggestion as didn't work"
                      className="px-4 py-2 text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-all"
                    >
                      Didn't Work
                    </button>
                  </div>
                ) : (
                  <span className="text-success-600 font-semibold text-sm">
                    Thanks for feedback!
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
            aria-label={showAll ? 'Show fewer suggestions' : `Show ${suggestions.length - 3} more suggestions`}
            className="mt-6 w-full py-3 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-all"
          >
            {showAll ? 'Show Less' : `Show ${suggestions.length - 3} More`}
          </button>
        )}
      </div>
    </div>
  );
}

