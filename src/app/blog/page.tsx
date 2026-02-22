'use client';

import Link from 'next/link';
import { useState } from 'react';
import { blogPosts } from '@/lib/data/seed';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const blogCategories = ['Style Guide', 'Care Tips', 'Behind the Scenes', 'Gift Ideas'];

  const filtered = activeCategory
    ? blogPosts.filter((p) => p.category === activeCategory && p.isPublished)
    : blogPosts.filter((p) => p.isPublished);

  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-cream py-14 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 text-charcoal">The Journal</h1>
          <p className="text-sm sm:text-base text-warm-gray">Stories, guides, and inspiration from the world of fine jewelry.</p>
        </div>
      </section>

      <div className="page-container py-8 sm:py-10 md:py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-10">
          <button onClick={() => setActiveCategory('')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${!activeCategory ? 'bg-gold text-white' : 'border border-border text-warm-gray hover:border-gold'}`}>
            All
          </button>
          {blogCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all ${activeCategory === cat ? 'bg-gold text-white' : 'border border-border text-warm-gray hover:border-gold'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white border border-border rounded-lg overflow-hidden hover:border-gold transition-all">
                <div className="aspect-[16/10] bg-cream overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider text-gold">{post.category}</span>
                  <h2 className="font-display text-base sm:text-lg md:text-xl mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-xs sm:text-sm text-warm-gray leading-relaxed mb-3 sm:mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-warm-gray">{post.author}</span>
                      <span className="text-xs text-warm-gray">·</span>
                      <span className="text-xs text-warm-gray">{formatDate(post.publishedAt)}</span>
                    </div>
                    <ArrowRight size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
