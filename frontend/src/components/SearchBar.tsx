import { useState } from 'react';

interface SearchBarProps {
  onSearch: (brand: string) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const popularBrands = ['Amazon Prime', 'NordVPN', 'Spotify', 'Skillshare'];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for vouchers..."
              aria-label="Search for brand vouchers"
              className="w-full px-6 py-4 text-base bg-white border-2 border-neutral-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors duration-200 placeholder:text-neutral-400"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2" aria-live="polite">
                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            aria-label="Search vouchers"
            className="btn-primary px-8 py-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Popular searches */}
      <div className="mt-6">
        <p className="text-sm text-neutral-600 mb-3 font-medium">Popular searches:</p>
        <div className="flex flex-wrap gap-2">
          {popularBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSearchTerm(brand);
                onSearch(brand);
              }}
              aria-label={`Search for ${brand} vouchers`}
              className="px-4 py-2 text-sm bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-lg border border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
              disabled={loading}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

