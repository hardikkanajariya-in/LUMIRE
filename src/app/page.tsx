'use client';

import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-[90vh] flex items-center bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(183,110,121,0.2) 0%, transparent 50%)',
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Since 2018</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 font-light">
              Where Precious<br />Meets <span className="italic text-gold">Timeless</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
              Discover handcrafted luxury jewelry that tells your story. Each piece is a masterwork of intention, designed to be treasured for a lifetime.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">Explore Collection</Link>
              <Link href="/custom-orders" className="btn-gold-outline">Book a Consultation</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-80 h-96 rounded-2xl bg-gradient-to-br from-gold/20 to-rose/20 border border-gold/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-gold/40 flex items-center justify-center">
                  <Sparkles size={32} className="text-gold" />
                </div>
                <p className="font-display text-white/60 text-lg italic">Lumière</p>
                <p className="text-xs text-white/40 mt-1 tracking-widest uppercase">Fine Jewelry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function CategoryRow() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-light">Shop by Category</h2>
        </div>
        <div className="category-scroll justify-center">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-cream border border-border group-hover:border-gold transition-all duration-300 flex items-center justify-center mx-auto mb-3">
                <span className="font-display text-lg text-warm-gray group-hover:text-gold transition-colors">{cat.name.charAt(0)}</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-warm-gray group-hover:text-gold transition-colors font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({ title, subtitle, items }: { title: string; subtitle: string; items: typeof products }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-light">{title}</h2>
            <p className="text-sm text-warm-gray mt-2">{subtitle}</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-wider text-gold hover:text-gold-dark transition-colors font-medium">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] bg-white rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <Sparkles size={40} className="text-gold mx-auto mb-3" />
              <p className="font-display text-warm-gray italic">Atelier Workshop</p>
            </div>
          </div>
          <div className="md:pl-8">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mt-4 mb-6 leading-tight">
              Crafted with intention.<br /><span className="italic">Worn for a lifetime.</span>
            </h2>
            <p className="text-warm-gray leading-relaxed mb-6">
              At Lumière, we believe jewelry is more than adornment — it&apos;s an expression of your story. Each piece is meticulously handcrafted by master artisans.
            </p>
            <p className="text-warm-gray leading-relaxed mb-8">
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
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-2">What Our Clients Say</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-border hover:border-gold flex items-center justify-center transition-colors" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card snap-start rounded-lg min-w-[320px] sm:min-w-[360px]">
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= t.rating ? 'fill-gold text-gold' : 'text-light-gray'} />
                ))}
              </div>
              <p className="text-sm text-warm-gray leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-warm-gray">{t.location}</p>
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
    <section className="py-12 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-warm-gray mb-8">As Seen In</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((b) => (
            <span key={b} className="font-display text-xl md:text-2xl text-light-gray font-light tracking-wide">{b}</span>
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
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <Sparkles size={24} className="text-gold mx-auto mb-4" />
        <h2 className="font-display text-3xl md:text-4xl text-white font-light mb-3">Join the Inner Circle</h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">Be the first to know about new collections, exclusive offers, and the stories behind our craft.</p>
        {submitted ? (
          <div className="fade-up">
            <p className="text-gold font-display text-xl">Welcome to the family ✨</p>
            <p className="text-gray-400 text-sm mt-2">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-full text-sm outline-none focus:border-gold transition-colors" />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
