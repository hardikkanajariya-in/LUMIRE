'use client';

import { X, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchStore } from '@/lib/store/search';
import { products } from '@/lib/data/seed';
import { formatPrice } from '@/lib/utils';
import { useEffect } from 'react';

export default function SearchOverlay() {
  const { query, isOpen, setQuery, closeSearch } = useSearchStore();

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8">
        {/* Search Input */}
        <div className="flex items-center gap-3 sm:gap-4 border-b-2 border-charcoal pb-3 sm:pb-4">
          <SearchIcon size={20} className="text-warm-gray shrink-0 sm:[&]:w-[22px] sm:[&]:h-[22px]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for rings, necklaces, gifts..."
            className="flex-1 text-base sm:text-lg font-display outline-none bg-transparent min-w-0"
            autoFocus
          />
          <button
            onClick={closeSearch}
            className="p-2.5 -mr-2 rounded-lg hover:bg-cream active:bg-cream-dark transition-colors shrink-0"
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Suggestions */}
        {query.length === 0 && (
          <div className="mt-6 sm:mt-8">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-warm-gray mb-3 sm:mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 border border-border rounded-full text-xs sm:text-sm text-warm-gray hover:border-gold hover:text-gold active:bg-cream transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.length > 1 && (
          <div className="mt-5 sm:mt-6">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-warm-gray mb-3 sm:mb-4">
              {results.length} {results.length === 1 ? 'Result' : 'Results'}
            </p>
            {results.length === 0 ? (
              <div className="text-center py-10 sm:py-12">
                <p className="font-display text-lg sm:text-xl text-warm-gray mb-2">No results found</p>
                <p className="text-xs sm:text-sm text-warm-gray max-w-xs mx-auto">Try searching for a different term or browse our collections.</p>
                <Link href="/products" onClick={closeSearch} className="btn-primary mt-5 sm:mt-6 inline-flex">
                  Browse All
                </Link>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 max-h-[65vh] sm:max-h-[60vh] overflow-y-auto -mx-2 px-2">
                {results.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-cream rounded-xl transition-colors active:bg-cream-dark"
                  >
                    <div className="w-14 sm:w-16 aspect-[3/4] bg-cream rounded-lg shrink-0 overflow-hidden">
                      <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{product.category}</p>
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
                    className="block text-center py-3 sm:py-4 text-sm text-gold font-medium hover:underline"
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
