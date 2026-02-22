'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users,
  Ticket, Warehouse, FileText, Star, Settings, LogOut, Menu, X, ChevronLeft,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAdmin, adminLogin, adminLogout } = useAuthStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-gold mb-2">Lumière</h1>
            <p className="text-gray-400 text-sm">Admin Panel</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const success = adminLogin(password);
            if (!success) setError('Invalid password');
          }} className="bg-white rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm text-warm-gray mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password" className="input-luxury w-full" autoFocus />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <p className="text-xs text-gray-600 text-center mt-6">
            Built by{' '}
            <a href="https://hardikkanajariya.in" target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold transition-colors">hardikkanajariya.in</a>
          </p>
        </div>
      </div>
    );
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar (fixed overlay) */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-charcoal text-white flex flex-col w-60 transition-transform duration-300 lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin" className="font-display text-xl text-gold">Lumière</Link>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors mx-2 rounded-lg mb-0.5 ${
                  active ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={18} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <Link href="/" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white mb-3">
            <span>View Store</span>
          </Link>
          <button onClick={adminLogout} className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 w-full">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
          <p className="text-[10px] text-gray-600 mt-4 text-center">
            Built by{' '}
            <a href="https://hardikkanajariya.in" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold transition-colors">hardikkanajariya.in</a>
          </p>
        </div>
      </aside>

      {/* Desktop Sidebar (static flex child) */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 bg-charcoal text-white h-full overflow-y-auto transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          {!collapsed && <Link href="/admin" className="font-display text-xl text-gold">Lumière</Link>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors mx-2 rounded-lg mb-0.5 ${
                  active ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}>
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4 shrink-0">
          <Link href="/" className={`flex items-center gap-3 text-sm text-gray-400 hover:text-white mb-3 ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && <span>View Store</span>}
          </Link>
          <button onClick={adminLogout}
            className={`flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 w-full ${collapsed ? 'justify-center' : ''}`}>
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
          {!collapsed && (
            <p className="text-[10px] text-gray-600 mt-4 text-center">
              Built by{' '}
              <a href="https://hardikkanajariya.in" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold transition-colors">hardikkanajariya.in</a>
            </p>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 shrink-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-3 sm:mr-4 p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors" aria-label="Open sidebar">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <span className="text-sm text-warm-gray">Admin</span>
        </header>
        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
