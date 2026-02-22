'use client';

import { X, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchStore } from '@/lib/store/search';
import { products } from '@/lib/data/seed';
import { formatPrice } from '@/lib/utils';

export default function SearchOverlay() {
  const { query, isOpen, setQuery, closeSearch } = useSearchStore();

  const results = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const suggestions = [
    'Diamond Rings',
    'Pearl Necklaces',
    'Gold Earrings',
    'Gifts for Anniversary',
    'Engagement Rings',
    'Bracelets',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Search Input */}
        <div className="flex items-center gap-4 border-b-2 border-charcoal pb-4">
          <SearchIcon size={22} className="text-warm-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for rings, necklaces, gifts..."
            className="flex-1 text-lg font-display outline-none bg-transparent"
            autoFocus
          />
          <button onClick={closeSearch} className="p-2 hover:text-gold transition-colors" aria-label="Close search">
            <X size={22} />
          </button>
        </div>

        {/* Suggestions */}
        {query.length === 0 && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-warm-gray mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 border border-border rounded-full text-sm text-warm-gray hover:border-gold hover:text-gold transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.length > 1 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-warm-gray mb-4">
              {results.length} {results.length === 1 ? 'Result' : 'Results'}
            </p>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-display text-xl text-warm-gray mb-2">No results found</p>
                <p className="text-sm text-warm-gray">Try searching for a different term or browse our collections.</p>
                <Link href="/products" onClick={closeSearch} className="btn-primary mt-6 inline-flex">
                  Browse All
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {results.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 p-3 hover:bg-cream rounded-lg transition-colors"
                  >
                    <div className="w-16 h-20 bg-cream rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-warm-gray">{product.category}</p>
                      <p className="text-sm font-medium text-gold mt-1">
                        {formatPrice(product.salePrice || product.originalPrice)}
                      </p>
                    </div>
                  </Link>
                ))}
                {results.length > 8 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    className="block text-center py-3 text-sm text-gold hover:underline"
                  >
                    View all {results.length} results →
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
