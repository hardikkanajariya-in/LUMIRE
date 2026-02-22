'use client';

import { useState } from 'react';
import { Search, AlertTriangle, Save } from 'lucide-react';
import { products as seedProducts } from '@/lib/data/seed';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

export default function AdminInventoryPage() {
  const [productList, setProductList] = useState<Product[]>(seedProducts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState('');

  const filtered = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'low') return matchesSearch && p.stock > 0 && p.stock <= p.lowStockThreshold;
    if (filter === 'out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  const totalProducts = productList.length;
  const lowStock = productList.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length;
  const outOfStock = productList.filter((p) => p.stock === 0).length;

  function startEdit(product: Product) {
    setEditingId(product.id);
    setEditStock(String(product.stock));
  }

  function saveStock(id: string) {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number(editStock) || 0 } : p))
    );
    setEditingId(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-charcoal">Inventory</h1>
        <p className="text-sm text-warm-gray">Manage stock levels across all products</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => setFilter('all')}
          className={`bg-white rounded-lg border p-4 text-center transition-all ${filter === 'all' ? 'border-gold' : 'border-gray-200'}`}>
          <p className="text-2xl font-semibold text-charcoal">{totalProducts}</p>
          <p className="text-xs text-warm-gray">Total Products</p>
        </button>
        <button onClick={() => setFilter('low')}
          className={`bg-white rounded-lg border p-4 text-center transition-all ${filter === 'low' ? 'border-gold' : 'border-gray-200'}`}>
          <p className="text-2xl font-semibold text-orange-500">{lowStock}</p>
          <p className="text-xs text-warm-gray">Low Stock</p>
        </button>
        <button onClick={() => setFilter('out')}
          className={`bg-white rounded-lg border p-4 text-center transition-all ${filter === 'out' ? 'border-gold' : 'border-gray-200'}`}>
          <p className="text-2xl font-semibold text-red-500">{outOfStock}</p>
          <p className="text-xs text-warm-gray">Out of Stock</p>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input type="text" placeholder="Search products..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap min-w-[250px]">Product</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap">Price</th>
                <th className="text-center py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap">Stock</th>
                <th className="text-center py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap">Threshold</th>
                <th className="text-center py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap">Status</th>
                <th className="text-right py-3 px-4 text-xs text-warm-gray font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const isLow = product.stock > 0 && product.stock <= product.lowStockThreshold;
                const isOut = product.stock === 0;
                return (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-cream border border-gray-100 shrink-0 overflow-hidden">
                          <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-charcoal truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-warm-gray">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-warm-gray">{formatPrice(product.originalPrice)}</td>
                    <td className="py-3 px-4 text-center">
                      {editingId === product.id ? (
                        <input type="number" value={editStock} onChange={(e) => setEditStock(e.target.value)}
                          className="w-20 px-2 py-1 text-center text-sm border border-gold rounded focus:outline-none"
                          autoFocus onKeyDown={(e) => e.key === 'Enter' && saveStock(product.id)} />
                      ) : (
                        <span className={`font-medium ${isOut ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-charcoal'}`}>
                          {product.stock}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-warm-gray">{product.lowStockThreshold}</td>
                    <td className="py-3 px-4 text-center">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-700">Out of Stock</span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-orange-50 text-orange-700 flex items-center gap-1 justify-center">
                          <AlertTriangle size={12} /> Low
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700">In Stock</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {editingId === product.id ? (
                        <button onClick={() => saveStock(product.id)} className="p-1.5 text-gold hover:text-gold/80">
                          <Save size={16} />
                        </button>
                      ) : (
                        <button onClick={() => startEdit(product)} className="text-xs text-gold hover:underline">
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
