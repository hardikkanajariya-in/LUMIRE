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
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">The Journal</h1>
          <p className="text-gray-400">Stories, guides, and inspiration from the world of fine jewelry.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button onClick={() => setActiveCategory('')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${!activeCategory ? 'bg-charcoal text-white' : 'border border-border text-warm-gray hover:border-gold'}`}>
            All
          </button>
          {blogCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === cat ? 'bg-charcoal text-white' : 'border border-border text-warm-gray hover:border-gold'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white border border-border rounded-lg overflow-hidden hover:border-gold transition-all">
                <div className="aspect-[16/10] bg-cream flex items-center justify-center">
                  <p className="font-display text-warm-gray italic text-sm">{post.category}</p>
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-gold">{post.category}</span>
                  <h2 className="font-display text-xl mt-2 mb-2 group-hover:text-gold transition-colors">{post.title}</h2>
                  <p className="text-sm text-warm-gray leading-relaxed mb-4">{post.excerpt}</p>
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
