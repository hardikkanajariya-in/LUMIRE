'use client';

import { useState } from 'react';
import { Search, Eye, Mail } from 'lucide-react';
import { sampleCustomers } from '@/lib/data/seed';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Customer } from '@/types';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | ''>('');
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = sampleCustomers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-charcoal">Customers</h1>
        <p className="text-sm text-warm-gray">{sampleCustomers.length} registered customers</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input type="text" placeholder="Search by name or email..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | '')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gold">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-6 min-w-0">
        {/* Table */}
        <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden min-w-0 ${selected ? 'flex-1' : 'w-full'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Orders</th>
                  <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium hidden md:table-cell">Spent</th>
                  <th className="text-left py-3 px-4 text-xs text-warm-gray font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-xs text-warm-gray font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer) => (
                  <tr key={customer.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer ${
                      selected?.id === customer.id ? 'bg-gold/5' : ''
                    }`}
                    onClick={() => setSelected(customer)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-medium">
                          {customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{customer.name}</p>
                          <p className="text-xs text-warm-gray">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-warm-gray">{customer.totalOrders}</td>
                    <td className="py-3 px-4 hidden md:table-cell font-medium">{formatPrice(customer.totalSpent)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                        customer.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={(e) => { e.stopPropagation(); setSelected(customer); }}
                        className="p-1.5 text-warm-gray hover:text-charcoal"><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-white rounded-lg border border-gray-200 p-5 self-start hidden lg:block">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-display text-xl">
                  {selected.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <h3 className="font-semibold text-charcoal">{selected.name}</h3>
              <p className="text-sm text-warm-gray">{selected.email}</p>
              <p className="text-sm text-warm-gray">{selected.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-semibold text-charcoal">{selected.totalOrders}</p>
                <p className="text-xs text-warm-gray">Orders</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-semibold text-charcoal">{formatPrice(selected.totalSpent)}</p>
                <p className="text-xs text-warm-gray">Total Spent</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-warm-gray">
                Member since: {formatDate(selected.joinDate)}
              </p>
              {selected.birthday && (
                <p className="text-warm-gray">Birthday: {formatDate(selected.birthday)}</p>
              )}
              <p className="text-warm-gray">Addresses: {selected.addresses.length} saved</p>
            </div>
            <button className="btn-outline w-full mt-4 flex items-center justify-center gap-2 text-sm">
              <Mail size={14} /> Send Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
