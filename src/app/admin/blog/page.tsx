'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { blogPosts as seedPosts } from '@/lib/data/seed';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(seedPosts);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Style Guide');

  function addPost() {
    if (!title.trim()) return;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title,
      slug,
      excerpt,
      content,
      coverImage: '',
      category,
      tags: [],
      author: 'Admin',
      publishedAt: new Date().toISOString(),
      isPublished: false,
      metaTitle: title,
      metaDescription: excerpt,
    };
    setPosts((prev) => [newPost, ...prev]);
    setShowForm(false);
    setTitle('');
    setExcerpt('');
    setContent('');
  }

  function togglePublish(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Blog Posts</h1>
          <p className="text-sm text-warm-gray">{posts.length} articles</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* New Post Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gold p-5 space-y-4">
          <h3 className="font-semibold text-charcoal">New Blog Post</h3>
          <div>
            <label className="block text-sm text-warm-gray mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title" className="input-luxury w-full" autoFocus />
          </div>
          <div>
            <label className="block text-sm text-warm-gray mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-luxury w-full">
              <option>Style Guide</option>
              <option>Care Tips</option>
              <option>Behind the Scenes</option>
              <option>Gift Ideas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-warm-gray mb-1">Excerpt</label>
            <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary" className="input-luxury w-full" />
          </div>
          <div>
            <label className="block text-sm text-warm-gray mb-1">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article..." rows={8} className="input-luxury w-full resize-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={addPost} disabled={!title.trim()} className="btn-primary text-sm disabled:opacity-50">Save Draft</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="w-16 h-12 rounded bg-cream border border-gray-100 shrink-0 overflow-hidden">
              {post.coverImage ? (
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-warm-gray flex items-center justify-center w-full h-full">{post.category}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-medium text-charcoal truncate">{post.title}</p>
                {!post.isPublished && (
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">Draft</span>
                )}
              </div>
              <p className="text-xs text-warm-gray truncate">{post.excerpt}</p>
              <div className="flex gap-3 mt-1 text-xs text-warm-gray">
                <span>{post.author}</span>
                <span>·</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => togglePublish(post.id)}
                className={`p-1.5 rounded transition-colors ${post.isPublished ? 'text-green-600 hover:text-green-700' : 'text-warm-gray hover:text-charcoal'}`}
                title={post.isPublished ? 'Unpublish' : 'Publish'}>
                {post.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => deletePost(post.id)}
                className="p-1.5 text-warm-gray hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
