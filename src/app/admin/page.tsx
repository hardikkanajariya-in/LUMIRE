'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown,
  ArrowRight, AlertTriangle,
} from 'lucide-react';
import { products, sampleOrders, sampleCustomers } from '@/lib/data/seed';
import { formatPrice, formatDate } from '@/lib/utils';

const STATS = [
  {
    label: 'Total Revenue',
    value: '₹24,85,000',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'text-green-600 bg-green-50',
  },
  {
    label: 'Orders',
    value: '156',
    change: '+8.2%',
    trend: 'up' as const,
    icon: ShoppingCart,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    label: 'Customers',
    value: '89',
    change: '+15.3%',
    trend: 'up' as const,
    icon: Users,
    color: 'text-purple-600 bg-purple-50',
  },
  {
    label: 'Avg. Order Value',
    value: '₹15,929',
    change: '-2.1%',
    trend: 'down' as const,
    icon: Package,
    color: 'text-orange-600 bg-orange-50',
  },
];

const MONTHLY_REVENUE = [
  { month: 'Jan', value: 180000 },
  { month: 'Feb', value: 220000 },
  { month: 'Mar', value: 195000 },
  { month: 'Apr', value: 260000 },
  { month: 'May', value: 240000 },
  { month: 'Jun', value: 310000 },
  { month: 'Jul', value: 280000 },
  { month: 'Aug', value: 350000 },
  { month: 'Sep', value: 320000 },
  { month: 'Oct', value: 380000 },
  { month: 'Nov', value: 420000 },
  { month: 'Dec', value: 485000 },
];

export default function AdminDashboard() {
  const [period] = useState('This Month');
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const lowStockProducts = products.filter((p) => p.stock < 10);
  const topProducts = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Dashboard</h1>
          <p className="text-sm text-warm-gray">Welcome back! Here is what is happening today.</p>
        </div>
        <span className="text-sm text-warm-gray bg-white border border-gray-200 rounded-lg px-3 py-2">{period}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-charcoal">{stat.value}</p>
              <p className="text-sm text-warm-gray">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Revenue Overview</h2>
          <div className="flex items-end gap-1.5 h-48">
            {MONTHLY_REVENUE.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gold/80 rounded-t hover:bg-gold transition-colors"
                  style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                  title={formatPrice(m.value)} />
                <span className="text-[10px] text-warm-gray">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-charcoal">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className="text-xs text-warm-gray w-5">{idx + 1}.</span>
                <div className="w-9 h-9 rounded bg-cream border border-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">{product.name}</p>
                  <p className="text-xs text-warm-gray">{formatPrice(product.originalPrice)}</p>
                </div>
                <span className="text-xs text-warm-gray">{product.rating}★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-charcoal">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-gold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs text-warm-gray font-medium">Order</th>
                  <th className="text-left py-2 text-xs text-warm-gray font-medium">Customer</th>
                  <th className="text-left py-2 text-xs text-warm-gray font-medium">Total</th>
                  <th className="text-left py-2 text-xs text-warm-gray font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.slice(0, 5).map((order) => {
                  const customer = sampleCustomers.find((c) => c.id === order.customerId);
                  return (
                    <tr key={order.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-2.5 font-medium text-charcoal">{order.orderNumber}</td>
                      <td className="py-2.5 text-warm-gray">{customer?.name ?? 'Unknown'}</td>
                      <td className="py-2.5">{formatPrice(order.total)}</td>
                      <td className="py-2.5">
                        <StatusBadge status={order.fulfillmentStatus} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-500" />
              Low Stock Alerts
            </h2>
            <Link href="/admin/inventory" className="text-xs text-gold hover:underline">Manage</Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-warm-gray">All products are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-9 h-9 rounded bg-white border border-orange-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">{product.name}</p>
                    <p className="text-xs text-orange-600">{product.stock} left in stock</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${styles[status] ?? 'bg-gray-50 text-gray-700'}`}>
      {status}
    </span>
  );
}
