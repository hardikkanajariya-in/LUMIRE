'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <SearchOverlay />}
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
