'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { products as seedProducts } from '@/lib/data/seed';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductStatus } from '@/types';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(seedProducts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | ''>('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function deleteProduct(id: string) {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setMenuOpen(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Products</h1>
          <p className="text-sm text-warm-gray">{productList.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input type="text" placeholder="Search products..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ProductStatus | '')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Product</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Price</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Stock</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden lg:table-cell">Category</th>
                <th className="text-right py-3 px-4 text-xs text-warm-gray font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-cream border border-gray-100 shrink-0 overflow-hidden">
                        <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-charcoal truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-warm-gray">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium">{formatPrice(product.originalPrice)}</p>
                    {product.salePrice && (
                      <p className="text-xs text-green-600">{formatPrice(product.salePrice)}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className={`text-sm ${product.stock < product.lowStockThreshold ? 'text-red-500 font-medium' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell text-warm-gray">{product.category}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => setMenuOpen(menuOpen === product.id ? null : product.id)}
                        className="p-1.5 text-warm-gray hover:text-charcoal rounded-lg hover:bg-gray-100">
                        <MoreHorizontal size={16} />
                      </button>
                      {menuOpen === product.id && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                          <Link href={`/admin/products/${product.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                            <Edit2 size={14} /> Edit
                          </Link>
                          <button onClick={() => deleteProduct(product.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-warm-gray">
            <p className="text-sm">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    active: 'bg-green-50 text-green-700',
    draft: 'bg-yellow-50 text-yellow-700',
    archived: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
