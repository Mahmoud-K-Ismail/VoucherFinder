import { useState } from 'react';
import SearchBar from './components/SearchBar';
import AISuggestionsCard from './components/AISuggestionsCard';
import CodeGrid from './components/CodeGrid';
import LoadingSkeletons from './components/LoadingSkeletons';
import EmptyState from './components/EmptyState';
import { searchCodes, scrapeCodes, getSuggestions } from './services/api';
import type { Code, AISuggestion } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [codes, setCodes] = useState<Code[]>([]);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (brand: string) => {
    setLoading(true);
    setError(null);
    setBrandName(brand);
    setHasSearched(true);
    setCodes([]);
    setSuggestions([]);

    try {
      // Search for existing codes first
      const searchResponse = await searchCodes(brand);
      
      // If no codes or stale, trigger scraping
      if (searchResponse.codes.length === 0 || searchResponse.stale) {
        // Scrape in parallel with getting AI suggestions
        const [scrapeResponse, suggestionsResponse] = await Promise.all([
          scrapeCodes(brand),
          getSuggestions(brand),
        ]);
        
        setCodes(scrapeResponse.codes);
        setSuggestions(suggestionsResponse.suggestions);
      } else {
        // Use existing codes and fetch suggestions
        setCodes(searchResponse.codes);
        const suggestionsResponse = await getSuggestions(brand);
        setSuggestions(suggestionsResponse.suggestions);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch codes. Please try again.');
      
      // Still try to get AI suggestions even if code scraping fails
      try {
        const suggestionsResponse = await getSuggestions(brand);
        setSuggestions(suggestionsResponse.suggestions);
      } catch (suggestionErr) {
        console.error('Suggestions error:', suggestionErr);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="mb-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-primary-700 bg-clip-text text-transparent mb-3">
            VoucherFinder
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Find the best discount codes & smart savings strategies
          </p>
        </div>
        
        {/* Value propositions */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow">
            <span className="text-green-600">✓</span>
            <span className="text-slate-700 dark:text-slate-300">Credits Creators</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow">
            <span className="text-blue-600">✓</span>
            <span className="text-slate-700 dark:text-slate-300">AI-Powered Suggestions</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow">
            <span className="text-purple-600">✓</span>
            <span className="text-slate-700 dark:text-slate-300">YouTube + Coupon Sites</span>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-800">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingSkeletons />}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          {/* AI Suggestions */}
          {suggestions.length > 0 && <AISuggestionsCard suggestions={suggestions} />}

          {/* Discount Codes */}
          {codes.length > 0 ? (
            <CodeGrid codes={codes} brandName={brandName} />
          ) : (
            !loading && suggestions.length === 0 && (
              <EmptyState
                brandName={brandName}
                message="We couldn't find any discount codes for this brand yet. Check out the AI suggestions above for alternative saving strategies!"
              />
            )
          )}
        </>
      )}

      {/* Welcome State */}
      {!hasSearched && !loading && (
        <div className="max-w-4xl mx-auto text-center py-16">
          <div className="glass-effect rounded-2xl p-12 shadow-xl">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to VoucherFinder!
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Search for any brand to discover working discount codes and AI-powered saving strategies.
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Multi-Source Search
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We search YouTube, RetailMeNot, and more to find the best codes.
                </p>
              </div>
              
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  AI Suggestions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get smart strategies like free trials, student discounts, and more.
                </p>
              </div>
              
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Verified Codes
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  See which codes are working and verified by other users.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-slate-500 dark:text-slate-500">
        <p>
          Made with ❤️ for finding better deals • Credits creators ethically • 
          <a href="https://github.com" className="ml-1 text-primary-600 hover:text-primary-700 dark:text-primary-400">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

