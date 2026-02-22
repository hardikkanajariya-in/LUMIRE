'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/lib/data/seed';
import { formatPrice, getMetalLabel, getStoneLabel } from '@/lib/utils';

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-semibold mb-2">Product Not Found</h1>
        <Link href="/admin/products" className="text-gold hover:underline text-sm">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Edit: {product.name}</h1>
          <p className="text-sm text-warm-gray">ID: {product.id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Basic Information</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Name</label>
              <input type="text" defaultValue={product.name} className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Slug</label>
              <input type="text" defaultValue={product.slug} className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Description</label>
              <textarea defaultValue={product.description} rows={5} className="input-luxury w-full resize-none" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Short Description</label>
              <input type="text" defaultValue={product.shortDescription} className="input-luxury w-full" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-warm-gray mb-1">Original Price</label>
                <input type="number" defaultValue={product.originalPrice} className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-sm text-warm-gray mb-1">Sale Price</label>
                <input type="number" defaultValue={product.salePrice ?? ''} className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-sm text-warm-gray mb-1">Cost Price</label>
                <input type="number" defaultValue={product.costPrice} className="input-luxury w-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Materials</h2>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Metal Types</label>
              <div className="flex flex-wrap gap-2">
                {product.metalType.map((mt) => (
                  <span key={mt} className="px-3 py-1 bg-charcoal text-white rounded-full text-xs">{getMetalLabel(mt)}</span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Stone Type</label>
              <p className="text-sm">{getStoneLabel(product.stoneType)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Status</h2>
            <select defaultValue={product.status} className="input-luxury w-full">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked={product.isFeatured} className="rounded" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked={product.isNewArrival} className="rounded" />
              New Arrival
            </label>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-charcoal">Inventory</h2>
            <p className="text-sm">Stock: <strong>{product.stock}</strong></p>
            <p className="text-sm">Low Threshold: <strong>{product.lowStockThreshold}</strong></p>
          </div>

          <button className="btn-primary w-full">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
