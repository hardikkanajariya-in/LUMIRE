'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts } from '@/lib/data/seed';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Article Not Found</h1>
          <p className="text-warm-gray mb-6">The article you are looking for does not exist.</p>
          <Link href="/blog" className="btn-primary">Back to Journal</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category && p.isPublished)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-20 border-b border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-gold mb-6 transition-colors">
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
          <span className="block text-xs uppercase tracking-wider text-gold-dark mb-4">{post.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-light mb-4 leading-tight text-charcoal">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-warm-gray">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
          </div>
        </div>
      </section>

      {/* Cover Image Placeholder */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 -mt-6">
        <div className="aspect-[21/9] bg-cream border border-border rounded-xl overflow-hidden shadow-lg">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-warm-gray leading-relaxed mb-6">{post.excerpt}</p>
          <p className="text-warm-gray leading-relaxed mb-6">
            Jewelry has been an integral part of human civilization for thousands of years. From the earliest
            beaded necklaces found in ancient caves to the meticulously designed pieces of today, our desire to
            adorn ourselves with beautiful objects speaks to something fundamental in human nature.
          </p>
          <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">The Art of Selection</h2>
          <p className="text-warm-gray leading-relaxed mb-6">
            Choosing the right piece of jewelry is both an art and a science. It involves understanding personal
            style, the occasion, and the subtle interplay between metals and gemstones. At Lumière, we believe
            every piece tells a story — your story.
          </p>
          <blockquote className="border-l-2 border-gold pl-6 italic text-charcoal my-8 text-lg">
            &ldquo;Jewelry is a way of keeping memories close. Each piece holds a moment in time, a feeling, a
            connection that transcends the physical.&rdquo;
          </blockquote>
          <h2 className="font-display text-2xl text-charcoal mt-10 mb-4">Expert Insights</h2>
          <p className="text-warm-gray leading-relaxed mb-6">
            Our master jewelers bring decades of experience to every creation. The interplay of light through a
            perfectly cut diamond, the warm glow of 22-karat gold, the subtle blush of rose gold — these details
            matter, and they are what make Lumière pieces extraordinary.
          </p>
          <p className="text-warm-gray leading-relaxed mb-6">
            Whether you are shopping for an engagement ring, a birthday gift, or simply treating yourself, understanding
            the fundamentals of jewelry selection will help you make a choice you will treasure forever.
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cream text-xs text-warm-gray rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="flex items-center justify-center gap-4 mt-10 pt-8 border-t border-border">
          <span className="text-sm text-warm-gray">Share this article</span>
          <button className="p-2 border border-border rounded-full hover:border-gold transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </article>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl text-center mb-10">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                  <article>
                    <div className="aspect-[16/10] bg-cream border border-border rounded-lg mb-4 overflow-hidden">
                      <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gold">{rp.category}</span>
                    <h3 className="font-display text-lg mt-1 group-hover:text-gold transition-colors">{rp.title}</h3>
                    <p className="text-sm text-warm-gray mt-1">{formatDate(rp.publishedAt)}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
