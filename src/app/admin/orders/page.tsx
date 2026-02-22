'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Download, Eye } from 'lucide-react';
import { sampleOrders, sampleCustomers } from '@/lib/data/seed';
import { formatPrice, formatDate } from '@/lib/utils';
import type { FulfillmentStatus } from '@/types';

const STATUS_OPTIONS: FulfillmentStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FulfillmentStatus | ''>('');

  const filtered = sampleOrders.filter((o) => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || o.fulfillmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function exportCSV() {
    const headers = ['Order #', 'Customer', 'Date', 'Total', 'Payment', 'Status'];
    const rows = filtered.map((o) => [
      o.orderNumber, o.customerName, formatDate(o.createdAt),
      o.total.toString(), o.paymentStatus, o.fulfillmentStatus,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Orders</h1>
          <p className="text-sm text-warm-gray">{sampleOrders.length} total orders</p>
        </div>
        <button onClick={exportCSV} className="btn-outline flex items-center gap-2 text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input type="text" placeholder="Search by order # or customer..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as FulfillmentStatus | '')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold">
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {STATUS_OPTIONS.map((status) => {
          const count = sampleOrders.filter((o) => o.fulfillmentStatus === status).length;
          return (
            <button key={status} onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
              className={`bg-white rounded-lg border p-3 text-center transition-all ${
                statusFilter === status ? 'border-gold' : 'border-gray-200'
              }`}>
              <p className="text-lg font-semibold text-charcoal">{count}</p>
              <p className="text-xs text-warm-gray capitalize">{status}</p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Order #</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Total</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Payment</th>
                <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Status</th>
                <th className="text-right py-3 px-4 text-xs text-warm-gray font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium text-charcoal">{order.orderNumber}</td>
                  <td className="py-3 px-4">
                    <p className="text-charcoal">{order.customerName}</p>
                    <p className="text-xs text-warm-gray">{order.customerEmail}</p>
                  </td>
                  <td className="py-3 px-4 text-warm-gray hidden md:table-cell">{formatDate(order.createdAt)}</td>
                  <td className="py-3 px-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <PaymentBadge status={order.paymentStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <FulfillmentBadge status={order.fulfillmentStatus} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/admin/orders/${order.id}`}
                      className="p-1.5 text-warm-gray hover:text-charcoal inline-flex"><Eye size={16} /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-warm-gray text-sm">No orders found.</div>
        )}
      </div>
    </div>
  );
}

function FulfillmentBadge({ status }: { status: FulfillmentStatus }) {
  const styles: Record<FulfillmentStatus, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${styles[status]}`}>{status}</span>;
}

function PaymentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    failed: 'bg-red-50 text-red-700',
    refunded: 'bg-gray-100 text-gray-600',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${styles[status] ?? 'bg-gray-50 text-gray-700'}`}>{status}</span>;
}
