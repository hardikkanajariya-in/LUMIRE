'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, Suspense } from 'react';
import { products } from '@/lib/data/seed';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center"><p className="text-warm-gray">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.stoneType.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-6">Search Results</h1>
        <div className="mb-8">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for jewelry..."
            className="input-luxury max-w-xl text-lg py-3" autoFocus />
        </div>
        {query.length >= 2 && (
          <p className="text-sm text-warm-gray mb-6">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
        )}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-warm-gray mb-3">No results found</p>
            <p className="text-sm text-warm-gray mb-6">Try a different search term or browse our collections.</p>
            <Link href="/products" className="btn-primary">Browse All</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
