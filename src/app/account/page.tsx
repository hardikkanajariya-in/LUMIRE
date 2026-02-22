'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Eye, Download } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth';
import { sampleOrders } from '@/lib/data/seed';
import { formatPrice, formatDate } from '@/lib/utils';

export default function AccountPage() {
  const { isAuthenticated, customer, login, logout, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [editMode, setEditMode] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white border border-border rounded-lg p-8">
            <h1 className="font-display text-3xl text-center mb-2">Welcome Back</h1>
            <p className="text-sm text-warm-gray text-center mb-8">Sign in to your Lumière account</p>
            <form onSubmit={(e) => { e.preventDefault(); login(loginForm.email, loginForm.password); }} className="space-y-4">
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email address" className="input-luxury" required />
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))} placeholder="Password" className="input-luxury" required />
              <button type="submit" className="btn-primary w-full">Sign In</button>
            </form>
            <p className="text-xs text-warm-gray text-center mt-4">
              Enter any email and password to sign in (demo mode)
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  const statusColors: Record<string, string> = {
    pending: 'badge-warning',
    processing: 'badge-info',
    shipped: 'badge-info',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
    paid: 'badge-success',
    failed: 'badge-danger',
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-light">My Account</h1>
            <p className="text-sm text-warm-gray mt-1">Welcome back, {customer?.name}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-warm-gray hover:text-rose transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white border border-border rounded-lg overflow-hidden">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-5 py-4 text-sm transition-colors border-b border-border last:border-0 ${activeTab === tab.id ? 'bg-cream text-gold font-medium' : 'text-warm-gray hover:bg-ivory'}`}>
                  <tab.icon size={18} />
                  {tab.label}
                  <ChevronRight size={14} className="ml-auto" />
                </button>
              ))}
              <Link href="/wishlist" className="flex items-center gap-3 w-full px-5 py-4 text-sm text-warm-gray hover:bg-ivory transition-colors">
                <Heart size={18} /> Wishlist <ChevronRight size={14} className="ml-auto" />
              </Link>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-display text-xl mb-6">Order History</h2>
                {sampleOrders.length === 0 ? (
                  <div className="text-center py-12 bg-white border border-border rounded-lg">
                    <Package size={40} className="mx-auto text-light-gray mb-3" />
                    <p className="font-display text-lg mb-2">No orders yet</p>
                    <Link href="/products" className="btn-primary mt-4 inline-flex">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sampleOrders.map((order) => (
                      <div key={order.id} className="bg-white border border-border rounded-lg p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="text-xs text-warm-gray">Order #{order.orderNumber}</p>
                            <p className="text-xs text-warm-gray mt-0.5">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`badge ${statusColors[order.paymentStatus]}`}>{order.paymentStatus}</span>
                            <span className={`badge ${statusColors[order.fulfillmentStatus]}`}>{order.fulfillmentStatus}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-12 h-14 bg-cream rounded-lg flex-shrink-0 overflow-hidden">
                                {item.productImage ? (
                                  <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-[10px] text-warm-gray flex items-center justify-center w-full h-full">IMG</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{item.productName}</p>
                                <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium">Total: <span className="text-gold">{formatPrice(order.total)}</span></p>
                          <div className="flex gap-2">
                            {order.trackingNumber && (
                              <span className="text-xs text-warm-gray flex items-center gap-1">
                                <Eye size={12} /> {order.trackingNumber}
                              </span>
                            )}
                            <button className="text-xs text-gold hover:underline flex items-center gap-1">
                              <Download size={12} /> Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="font-display text-xl mb-6">Profile Details</h2>
                <div className="bg-white border border-border rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-gray mb-1 block">Name</label>
                      {editMode ? (
                        <input type="text" defaultValue={customer?.name} className="input-luxury" onChange={(e) => updateProfile({ name: e.target.value })} />
                      ) : (
                        <p className="text-sm py-3">{customer?.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-gray mb-1 block">Email</label>
                      <p className="text-sm py-3">{customer?.email}</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-gray mb-1 block">Phone</label>
                      {editMode ? (
                        <input type="tel" defaultValue={customer?.phone} className="input-luxury" onChange={(e) => updateProfile({ phone: e.target.value })} />
                      ) : (
                        <p className="text-sm py-3">{customer?.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-gray mb-1 block">Birthday</label>
                      {editMode ? (
                        <input type="date" defaultValue={customer?.birthday || ''} className="input-luxury" onChange={(e) => updateProfile({ birthday: e.target.value })} />
                      ) : (
                        <p className="text-sm py-3">{customer?.birthday ? formatDate(customer.birthday) : 'Not set'}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setEditMode(!editMode)} className={editMode ? 'btn-primary' : 'btn-outline'}>
                      {editMode ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl">Saved Addresses</h2>
                  <button className="btn-gold-outline text-xs py-2 px-4">Add New</button>
                </div>
                {customer?.addresses.length === 0 ? (
                  <div className="text-center py-12 bg-white border border-border rounded-lg">
                    <MapPin size={40} className="mx-auto text-light-gray mb-3" />
                    <p className="text-sm text-warm-gray">No saved addresses</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {customer?.addresses.map((addr) => (
                      <div key={addr.id} className="bg-white border border-border rounded-lg p-5">
                        {addr.isDefault && <span className="badge badge-gold mb-2">Default</span>}
                        <p className="text-sm font-medium">{addr.name}</p>
                        <p className="text-sm text-warm-gray mt-1">
                          {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                          {addr.city}, {addr.state} {addr.pincode}<br />
                          {addr.country}
                        </p>
                        <p className="text-sm text-warm-gray mt-1">{addr.phone}</p>
                        <div className="flex gap-3 mt-4">
                          <button className="text-xs text-gold hover:underline">Edit</button>
                          <button className="text-xs text-rose hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
