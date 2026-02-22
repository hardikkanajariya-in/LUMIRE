'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/data/seed';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import type { MetalType, StoneType } from '@/types';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'best-selling' | 'most-reviewed';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center"><p className="text-warm-gray">Loading...</p></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedMetals, setSelectedMetals] = useState<MetalType[]>([]);
  const [selectedStones, setSelectedStones] = useState<StoneType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [availability, setAvailability] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const metalOptions: { value: MetalType; label: string }[] = [
    { value: 'gold-18k', label: 'Gold 18K' },
    { value: 'silver-925', label: 'Silver 925' },
    { value: 'platinum', label: 'Platinum' },
    { value: 'rose-gold', label: 'Rose Gold' },
  ];

  const stoneOptions: { value: StoneType; label: string }[] = [
    { value: 'diamond', label: 'Diamond' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'sapphire', label: 'Sapphire' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'pearl', label: 'Pearl' },
    { value: 'no-stone', label: 'No Stone' },
  ];

  const filtered = useMemo(() => {
    let result = [...products].filter((p) => p.status === 'active');
    if (selectedCategory) result = result.filter((p) => p.categorySlug === selectedCategory);
    if (selectedMetals.length > 0) result = result.filter((p) => p.metalType.some((m) => selectedMetals.includes(m)));
    if (selectedStones.length > 0) result = result.filter((p) => selectedStones.includes(p.stoneType));
    if (availability) result = result.filter((p) => p.availability === availability);
    result = result.filter((p) => {
      const price = p.salePrice || p.originalPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'price-low': result.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)); break;
      case 'price-high': result.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)); break;
      case 'best-selling': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'most-reviewed': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [selectedCategory, selectedMetals, selectedStones, priceRange, availability, sortBy]);

  const activeFilters: { label: string; onRemove: () => void }[] = [];
  if (selectedCategory) {
    const cat = categories.find((c) => c.slug === selectedCategory);
    activeFilters.push({ label: cat?.name || selectedCategory, onRemove: () => setSelectedCategory('') });
  }
  selectedMetals.forEach((m) => {
    const opt = metalOptions.find((o) => o.value === m);
    activeFilters.push({ label: opt?.label || m, onRemove: () => setSelectedMetals((prev) => prev.filter((x) => x !== m)) });
  });
  selectedStones.forEach((s) => {
    const opt = stoneOptions.find((o) => o.value === s);
    activeFilters.push({ label: opt?.label || s, onRemove: () => setSelectedStones((prev) => prev.filter((x) => x !== s)) });
  });

  const clearAll = () => {
    setSelectedCategory('');
    setSelectedMetals([]);
    setSelectedStones([]);
    setPriceRange([0, 200000]);
    setAvailability('');
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${selectedCategory === cat.slug ? 'text-gold font-medium' : 'text-warm-gray hover:text-charcoal'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Metal Type */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-medium mb-3">Metal Type</h3>
        <div className="space-y-2">
          {metalOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedMetals.includes(opt.value)}
                onChange={(e) => setSelectedMetals(e.target.checked ? [...selectedMetals, opt.value] : selectedMetals.filter((m) => m !== opt.value))}
                className="w-4 h-4 accent-gold" />
              <span className="text-sm text-warm-gray">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stone Type */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-medium mb-3">Stone Type</h3>
        <div className="space-y-2">
          {stoneOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedStones.includes(opt.value)}
                onChange={(e) => setSelectedStones(e.target.checked ? [...selectedStones, opt.value] : selectedStones.filter((s) => s !== opt.value))}
                className="w-4 h-4 accent-gold" />
              <span className="text-sm text-warm-gray">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-medium mb-3">Price Range</h3>
        <input type="range" min={0} max={200000} step={5000} value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-gold" />
        <div className="flex justify-between text-xs text-warm-gray mt-1">
          <span>₹0</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-medium mb-3">Availability</h3>
        <div className="space-y-2">
          {[{ value: 'in-stock', label: 'In Stock' }, { value: 'made-to-order', label: 'Made to Order' }].map((opt) => (
            <button key={opt.value} onClick={() => setAvailability(availability === opt.value ? '' : opt.value)}
              className={`block w-full text-left text-sm py-1.5 transition-colors ${availability === opt.value ? 'text-gold font-medium' : 'text-warm-gray hover:text-charcoal'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {activeFilters.length > 0 && (
        <button onClick={clearAll} className="text-xs text-rose underline">Clear all filters</button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="page-container pt-4 sm:pt-6">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-warm-gray overflow-x-auto">
          <Link href="/" className="hover:text-gold transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <span className="text-charcoal shrink-0">Collections</span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className="text-charcoal capitalize">{selectedCategory}</span>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="page-container py-5 sm:py-8 md:py-10">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
          {selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name || 'Collections' : 'All Collections'}
        </h1>
        <p className="text-xs sm:text-sm text-warm-gray mt-1.5 sm:mt-2">{filtered.length} pieces</p>
      </div>

      <div className="page-container pb-12 sm:pb-16 md:pb-20">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4 sm:mb-6 gap-3">
          <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 text-xs sm:text-sm border border-border rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 hover:border-gold active:bg-cream transition-colors">
            <SlidersHorizontal size={15} /> Filters
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm border border-border rounded-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white outline-none min-w-0">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low–High</option>
            <option value="price-high">Price: High–Low</option>
            <option value="best-selling">Best Selling</option>
            <option value="most-reviewed">Most Reviewed</option>
          </select>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {activeFilters.map((f, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-cream border border-border rounded-full text-xs font-medium">
                {f.label}
                <button onClick={f.onRemove} className="hover:text-rose transition-colors" aria-label={`Remove ${f.label} filter`}><X size={12} /></button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6 lg:gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-24 self-start">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs uppercase tracking-wider font-medium">Filters</h2>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white outline-none">
                <option value="newest">Newest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="best-selling">Best Selling</option>
                <option value="most-reviewed">Most Reviewed</option>
              </select>
            </div>
            <FilterContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <p className="font-display text-xl sm:text-2xl text-warm-gray mb-3">No pieces found</p>
                <p className="text-xs sm:text-sm text-warm-gray mb-6">Try adjusting your filters or explore our full collection.</p>
                <button onClick={clearAll} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFiltersOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="font-display text-lg">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 -mr-2 rounded-lg hover:bg-cream active:bg-cream-dark transition-colors" aria-label="Close filters"><X size={20} /></button>
            </div>
            <div className="p-4 sm:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <FilterContent />
              <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary w-full mt-6">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
