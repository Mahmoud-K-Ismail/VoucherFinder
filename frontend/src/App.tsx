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
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-3">
          VoucherFinder
        </h1>
        <p className="text-lg text-neutral-600">
          Find discount codes and save money instantly
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-16">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-accent-50 border-l-4 border-accent-500 rounded-lg">
          <p className="font-semibold text-accent-800">{error}</p>
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
                message="No vouchers found for this brand yet."
              />
            )
          )}
        </>
      )}

      {/* Welcome State */}
      {!hasSearched && !loading && (
        <div className="max-w-5xl mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Search for any brand to discover working voucher codes and smart saving strategies
            </p>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">
                Multi-Source Search
              </h3>
              <p className="text-sm text-neutral-600">
                Search YouTube, coupon sites, and more for the best codes
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">
                Smart Suggestions
              </h3>
              <p className="text-sm text-neutral-600">
                Get AI-powered strategies like free trials and student discounts
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-lg">
                Verified Codes
              </h3>
              <p className="text-sm text-neutral-600">
                See which codes work, verified by real users
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 py-6 text-center text-sm text-neutral-500 border-t border-neutral-200">
        <p>
          Credits creators ethically
          <span className="mx-2">•</span>
          <a href="https://github.com" className="text-primary-600 hover:text-primary-700 transition-colors">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

