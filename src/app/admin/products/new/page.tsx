'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { MetalType, StoneType, ProductStatus } from '@/types';
import { generateId, slugify } from '@/lib/utils';

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('50');
  const [status, setStatus] = useState<ProductStatus>('draft');
  const [metalTypes, setMetalTypes] = useState<MetalType[]>([]);
  const [stoneType, setStoneType] = useState<StoneType>('no-stone');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  function handleNameChange(value: string) {
    setName(value);
    setSlug(slugify(value));
  }

  function toggleMetal(mt: MetalType) {
    setMetalTypes((prev) =>
      prev.includes(mt) ? prev.filter((m) => m !== mt) : [...prev, mt]
    );
  }

  async function generateDescription() {
    if (!name) return;
    setGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const aiDesc = `Discover the exquisite ${name}, a masterpiece of fine jewelry craftsmanship. Each piece is meticulously handcrafted by our master artisans using the finest materials, ensuring unparalleled beauty and lasting quality. This stunning creation captures the essence of luxury, making it the perfect addition to your jewelry collection or a meaningful gift for someone special.`;
    setDescription(aiDesc);
    setShortDescription(`Exquisite ${name} — handcrafted luxury jewelry with exceptional detail and timeless elegance.`);
    setGenerating(false);
  }

  function handleSave() {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      router.push('/admin/products');
    }, 1000);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-charcoal">Add Product</h1>
            <p className="text-sm text-warm-gray">Create a new product listing</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving || !name}
            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Basic Information</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Product Name *</label>
              <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Celestial Diamond Ring" className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                className="input-luxury w-full text-warm-gray" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-warm-gray">Description</label>
                <button onClick={generateDescription} disabled={!name || generating}
                  className="flex items-center gap-1 text-xs text-gold hover:underline disabled:opacity-50">
                  <Sparkles size={12} /> {generating ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Full product description..." rows={5}
                className="input-luxury w-full resize-none" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Short Description</label>
              <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief one-line description" className="input-luxury w-full" />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-warm-gray mb-1">Original Price *</label>
                <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="₹" className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-sm text-warm-gray mb-1">Sale Price</label>
                <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="₹" className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-sm text-warm-gray mb-1">Cost Price</label>
                <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="₹" className="input-luxury w-full" />
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Materials</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-2">Metal Types</label>
              <div className="flex flex-wrap gap-2">
                {(['gold-18k', 'silver-925', 'platinum', 'rose-gold'] as MetalType[]).map((mt) => (
                  <button key={mt} type="button" onClick={() => toggleMetal(mt)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      metalTypes.includes(mt) ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-warm-gray hover:border-gold'
                    }`}>
                    {mt.replace('-', ' ').replace('k', 'K')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Stone Type</label>
              <select value={stoneType} onChange={(e) => setStoneType(e.target.value as StoneType)}
                className="input-luxury w-full">
                <option value="no-stone">No Stone</option>
                <option value="diamond">Diamond</option>
                <option value="ruby">Ruby</option>
                <option value="sapphire">Sapphire</option>
                <option value="emerald">Emerald</option>
                <option value="pearl">Pearl</option>
              </select>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">SEO</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Page title for search engines" className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Meta Description</label>
              <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief description for search engines" rows={2}
                className="input-luxury w-full resize-none" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Tags (comma-separated)</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. ring, diamond, engagement" className="input-luxury w-full" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Status</h2>
            <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)}
              className="input-luxury w-full">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-gray-300" />
              Featured product
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)}
                className="rounded border-gray-300" />
              New arrival
            </label>
          </div>

          {/* Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Category</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="input-luxury w-full">
              <option value="">Select category</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
              <option value="bangles">Bangles</option>
              <option value="pendants">Pendants</option>
            </select>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Inventory</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Stock Quantity</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)}
                className="input-luxury w-full" />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Images</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-sm text-warm-gray mb-2">Drag & drop images here</p>
              <p className="text-xs text-warm-gray">or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
