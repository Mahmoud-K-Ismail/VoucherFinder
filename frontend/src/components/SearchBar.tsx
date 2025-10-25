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
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter brand name (e.g., NordVPN, Amazon Prime, Spotify...)"
              className="w-full px-6 py-4 text-lg rounded-xl glass-effect shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {loading ? 'Searching...' : 'Find Codes'}
          </button>
        </div>
      </form>

      {/* Popular brands */}
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Popular searches:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {popularBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSearchTerm(brand);
                onSearch(brand);
              }}
              className="px-3 py-1 text-sm bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:text-primary-600 transition-all"
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

