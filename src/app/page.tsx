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
    <section className="relative min-h-[75vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center bg-cream overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="relative page-container w-full py-10 sm:py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="fade-up text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-6 justify-center md:justify-start">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Since 2018</span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal leading-[1.08] mb-4 sm:mb-6 font-light">
              Where Precious<br />Meets <span className="italic text-gold-dark">Timeless</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-warm-gray mb-6 sm:mb-8 md:mb-10 max-w-lg leading-relaxed mx-auto md:mx-0">
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
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
      <div className="page-container">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-dark font-semibold">Explore</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mt-2 sm:mt-3">Shop by Category</h2>
          <div className="gold-line mt-3 sm:mt-4" />
          <p className="text-xs sm:text-sm text-warm-gray mt-3 sm:mt-4">Find the perfect piece for every occasion</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-gold transition-all duration-300 mx-auto mb-2.5 sm:mb-3 md:mb-4 shadow-sm group-hover:shadow-md">
                <img src={cat.coverImage} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.12em] text-warm-gray group-hover:text-gold-dark transition-colors font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({ title, subtitle, items }: { title: string; subtitle: string; items: typeof products }) {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="page-container">
        <div className="flex items-end justify-between mb-8 sm:mb-10 md:mb-14 lg:mb-16">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-dark font-semibold">Collection</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mt-1.5 sm:mt-2">{title}</h2>
            <p className="text-xs sm:text-sm text-warm-gray mt-1.5 sm:mt-2">{subtitle}</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-gold-dark hover:text-gold transition-colors font-semibold shrink-0 ml-4">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {items.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="sm:hidden text-center mt-8">
          <Link href="/products" className="btn-gold-outline text-sm">View All</Link>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
      <div className="page-container">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-20 items-center">
          <div className="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-border/30">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=80"
              alt="Lumière Atelier Workshop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4 justify-center md:justify-start">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark font-semibold">Our Story</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
              Crafted with intention.<br /><span className="italic text-gold-dark">Worn for a lifetime.</span>
            </h2>
            <p className="text-warm-gray leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm md:text-base">
              At Lumière, we believe jewelry is more than adornment — it&apos;s an expression of your story. Each piece is meticulously handcrafted by master artisans.
            </p>
            <p className="text-warm-gray leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
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
    const cardWidth = window.innerWidth < 640 ? 280 : 380;
    const newIndex = dir === 'left' ? Math.max(0, activeIndex - 1) : Math.min(testimonials.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
  };
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
      <div className="page-container">
        <div className="flex items-end justify-between mb-8 sm:mb-12 md:mb-16">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-dark font-semibold">Testimonials</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mt-1.5 sm:mt-2">What Our Clients Say</h2>
            <div className="gold-line mt-3 sm:mt-4 !ml-0" />
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <button onClick={() => scroll('left')} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors active:bg-cream" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={() => scroll('right')} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors active:bg-cream" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-3.5 sm:gap-5 md:gap-6 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card snap-start min-w-[260px] sm:min-w-[300px] md:min-w-[360px] shrink-0">
              <div className="flex mb-2.5 sm:mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} className={`sm:[&]:w-[14px] sm:[&]:h-[14px] ${s <= t.rating ? 'fill-gold text-gold' : 'text-light-gray'}`} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-4 sm:mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img src={t.image} alt={t.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-border" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-[10px] sm:text-[11px] text-warm-gray">{t.location}</p>
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
    <section className="py-10 sm:py-14 md:py-20 border-y border-border bg-ivory">
      <div className="page-container">
        <p className="text-center text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-warm-gray mb-5 sm:mb-8 font-medium">As Seen In</p>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
          {brands.map((b) => (
            <span key={b} className="font-display text-base sm:text-lg md:text-xl lg:text-2xl text-warm-gray/40 font-light tracking-wide hover:text-gold transition-colors duration-300">{b}</span>
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
    <section className="py-14 sm:py-20 md:py-28 lg:py-36 bg-champagne/40 relative overflow-hidden">
      {/* Decorative border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <Diamond size={20} className="text-gold sm:[&]:w-[22px] sm:[&]:h-[22px]" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal font-light mb-3 sm:mb-4">
          Join the <span className="italic text-gold-dark">Inner Circle</span>
        </h2>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <div className="w-12 h-px bg-gold/40" />
          <Diamond size={10} className="text-gold/50" />
          <div className="w-12 h-px bg-gold/40" />
        </div>

        {/* Description */}
        <p className="text-warm-gray text-xs sm:text-sm md:text-base mb-7 sm:mb-10 max-w-lg mx-auto leading-relaxed">
          Be the first to know about new collections, exclusive offers, and the stories behind our craft.
        </p>

        {/* Form or Success */}
        {submitted ? (
          <div className="fade-up py-4">
            <div className="flex justify-center mb-4">
              <Diamond size={16} className="text-gold" />
            </div>
            <p className="text-gold-dark font-display text-xl sm:text-2xl mb-2">Welcome to the family</p>
            <p className="text-warm-gray text-sm">We&apos;ll be in touch with something special soon.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:flex-1 px-6 py-4 bg-white border border-border text-charcoal placeholder-warm-gray/50 rounded-full text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto btn-primary px-10 py-4 text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="text-warm-gray/60 text-xs mt-4 tracking-wide">No spam, ever. Unsubscribe anytime.</p>
          </form>
        )}
      </div>

      {/* Decorative border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
