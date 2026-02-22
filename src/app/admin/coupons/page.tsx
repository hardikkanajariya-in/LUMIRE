'use client';

import { useState } from 'react';
import { Plus, Trash2, Copy, Edit2 } from 'lucide-react';
import { coupons as seedCoupons } from '@/lib/data/seed';
import { formatPrice, formatDate, generateId } from '@/lib/utils';
import type { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const [couponList, setCouponList] = useState<Coupon[]>(seedCoupons);
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [usageLimit, setUsageLimit] = useState('100');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');

  function addCoupon() {
    if (!code.trim() || !value) return;
    const newCoupon: Coupon = {
      id: generateId(),
      code: code.toUpperCase(),
      type,
      value: Number(value),
      minOrderValue: Number(minOrder) || 0,
      usageLimit: Number(usageLimit) || 100,
      perCustomerLimit: 1,
      usedCount: 0,
      validFrom: validFrom || new Date().toISOString(),
      validTo: validTo || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      applicableCategories: [],
      applicableProducts: [],
      firstOrderOnly: false,
      isActive: true,
      revenue: 0,
    };
    setCouponList((prev) => [newCoupon, ...prev]);
    resetForm();
  }

  function resetForm() {
    setShowForm(false);
    setCode('');
    setType('percentage');
    setValue('');
    setMinOrder('');
    setUsageLimit('100');
    setValidFrom('');
    setValidTo('');
  }

  function deleteCoupon(id: string) {
    setCouponList((prev) => prev.filter((c) => c.id !== id));
  }

  function toggleActive(id: string) {
    setCouponList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Coupons</h1>
          <p className="text-sm text-warm-gray">{couponList.length} discount codes</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* New Coupon Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gold p-5 space-y-4">
          <h3 className="font-semibold text-charcoal">New Coupon</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-warm-gray mb-1">Code *</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="SUMMER20" className="input-luxury w-full font-mono" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')}
                className="input-luxury w-full">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Value *</label>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
                placeholder={type === 'percentage' ? '20' : '500'} className="input-luxury w-full" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-warm-gray mb-1">Min Order Value</label>
              <input type="number" value={minOrder} onChange={(e) => setMinOrder(e.target.value)}
                placeholder="0" className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Valid From</label>
              <input type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)}
                className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Valid To</label>
              <input type="date" value={validTo} onChange={(e) => setValidTo(e.target.value)}
                className="input-luxury w-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addCoupon} disabled={!code.trim() || !value}
              className="btn-primary text-sm disabled:opacity-50">Create</button>
            <button onClick={resetForm} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Coupon List */}
      <div className="space-y-3">
        {couponList.map((coupon) => {
          const isExpired = new Date(coupon.validTo) < new Date();
          return (
            <div key={coupon.id} className="bg-white rounded-lg border border-gray-200 p-5 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-lg font-semibold text-charcoal tracking-wider">{coupon.code}</span>
                  <button onClick={() => copyCode(coupon.code)} className="p-1 text-warm-gray hover:text-gold" title="Copy">
                    <Copy size={14} />
                  </button>
                  {!coupon.isActive && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Disabled</span>}
                  {isExpired && <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Expired</span>}
                </div>
                <p className="text-sm text-warm-gray">
                  {coupon.type === 'percentage' ? `${coupon.value}% off` : `${formatPrice(coupon.value)} off`}
                  {coupon.minOrderValue > 0 ? ` on orders above ${formatPrice(coupon.minOrderValue)}` : ''}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-warm-gray">
                  <span>Used: {coupon.usedCount}/{coupon.usageLimit}</span>
                  <span>Valid: {formatDate(coupon.validFrom)} - {formatDate(coupon.validTo)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleActive(coupon.id)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    coupon.isActive ? 'border-green-300 text-green-700 bg-green-50' : 'border-gray-200 text-gray-500'
                  }`}>
                  {coupon.isActive ? 'Active' : 'Disabled'}
                </button>
                <button onClick={() => deleteCoupon(coupon.id)}
                  className="p-1.5 text-warm-gray hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
