'use client';

import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Diamond } from 'lucide-react';
import { products, categories, testimonials } from '@/lib/data/seed';
import ProductCard from '@/components/products/ProductCard';
import { useState, useRef } from 'react';

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = products.filter((p) => p.tags.includes('bestseller'));

  return (
    <div>
      <HeroSection />
      <CategoryRow />
      <ProductSection title="New Arrivals" subtitle="The latest additions to our collection" items={newArrivals} />
      <BrandStory />
      <ProductSection title="Best Sellers" subtitle="Loved by our community" items={bestSellers} />
      <TestimonialCarousel />
      <AsSeenIn />
      <Newsletter />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-cream overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="relative page-container w-full py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="fade-up text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-6 justify-center md:justify-start">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Since 2018</span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.08] mb-6 font-light">
              Where Precious<br />Meets <span className="italic text-gold-dark">Timeless</span>
            </h1>
            <p className="text-sm sm:text-base text-warm-gray mb-8 sm:mb-10 max-w-lg leading-relaxed mx-auto md:mx-0">
              Discover handcrafted luxury jewelry that tells your story. Each piece is a masterwork of intention, designed to be treasured for a lifetime.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <Link href="/products" className="btn-primary">Explore Collection</Link>
              <Link href="/custom-orders" className="btn-gold-outline">Book a Consultation</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 lg:w-80 xl:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-border/50">
                <img
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=640&auto=format&fit=crop&q=80"
                  alt="Luxury jewelry"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-72 lg:w-80 xl:w-96 aspect-[3/4] rounded-2xl border-2 border-gold/20 -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border border-gold/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-gold/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function CategoryRow() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="page-container">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mt-3">Shop by Category</h2>
          <div className="gold-line mt-4" />
          <p className="text-sm text-warm-gray mt-4">Find the perfect piece for every occasion</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group text-center">
              <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-gold transition-all duration-300 mx-auto mb-3 sm:mb-4 shadow-sm group-hover:shadow-md">
                <img src={cat.coverImage} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-warm-gray group-hover:text-gold-dark transition-colors font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({ title, subtitle, items }: { title: string; subtitle: string; items: typeof products }) {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Collection</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-2">{title}</h2>
            <p className="text-sm text-warm-gray mt-2">{subtitle}</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-gold-dark hover:text-gold transition-colors font-semibold">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {items.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="sm:hidden text-center mt-10">
          <Link href="/products" className="btn-gold-outline text-sm">View All</Link>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="page-container">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-border/30">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=80"
              alt="Lumière Atelier Workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:pl-4 text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-4 justify-center md:justify-start">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Our Story</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
              Crafted with intention.<br /><span className="italic text-gold-dark">Worn for a lifetime.</span>
            </h2>
            <p className="text-warm-gray leading-relaxed mb-5 text-sm sm:text-base">
              At Lumière, we believe jewelry is more than adornment — it&apos;s an expression of your story. Each piece is meticulously handcrafted by master artisans.
            </p>
            <p className="text-warm-gray leading-relaxed mb-8 text-sm sm:text-base">
              From ethically sourced gemstones to sustainably produced metals, every element is chosen with care. We create heirlooms that carry meaning across generations.
            </p>
            <Link href="/about" className="btn-outline inline-flex items-center gap-2">Our Story <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const newIndex = dir === 'left' ? Math.max(0, activeIndex - 1) : Math.min(testimonials.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({ left: newIndex * 380, behavior: 'smooth' });
  };
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="page-container">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-2">What Our Clients Say</h2>
            <div className="gold-line mt-4 !ml-0" />
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 sm:gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card snap-start min-w-[300px] sm:min-w-[360px]">
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= t.rating ? 'fill-gold text-gold' : 'text-light-gray'} />
                ))}
              </div>
              <p className="text-sm text-warm-gray leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-[11px] text-warm-gray">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AsSeenIn() {
  const brands = ['Vogue India', 'Elle', 'Harper\'s Bazaar', 'GQ India', 'Femina'];
  return (
    <section className="py-12 md:py-16 border-y border-border bg-ivory">
      <div className="page-container">
        <p className="text-center text-[11px] uppercase tracking-[0.3em] text-warm-gray mb-8 font-medium">As Seen In</p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
          {brands.map((b) => (
            <span key={b} className="font-display text-lg sm:text-xl md:text-2xl text-warm-gray/40 font-light tracking-wide hover:text-gold transition-colors duration-300">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="relative max-w-xl mx-auto px-5 sm:px-8 text-center">
        <Diamond size={20} className="text-gold mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-4xl text-charcoal font-light mb-3">Join the Inner Circle</h2>
        <div className="gold-line mt-3 mb-5" />
        <p className="text-warm-gray text-sm mb-8 max-w-md mx-auto leading-relaxed">Be the first to know about new collections, exclusive offers, and the stories behind our craft.</p>
        {submitted ? (
          <div className="fade-up">
            <p className="text-gold-dark font-display text-xl">Welcome to the family</p>
            <p className="text-warm-gray text-sm mt-2">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3.5 bg-white border border-border text-charcoal placeholder-warm-gray/50 rounded-full text-sm outline-none focus:border-gold transition-colors shadow-sm" />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
