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
    <>
      {!isAdmin && <Header />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <SearchOverlay />}
      <main className="min-w-0 overflow-x-hidden">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
