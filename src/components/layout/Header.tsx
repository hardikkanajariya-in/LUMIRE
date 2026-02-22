'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useSearchStore } from '@/lib/store/search';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);
  const openSearch = useSearchStore((s) => s.openSearch);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/products', label: 'Collections' },
    { href: '/products?category=rings', label: 'Rings' },
    { href: '/products?category=necklaces', label: 'Necklaces' },
    { href: '/products?category=earrings', label: 'Earrings' },
    { href: '/products?category=bracelets', label: 'Bracelets' },
    { href: '/custom-orders', label: 'Custom' },
    { href: '/gift-cards', label: 'Gifts' },
  ];

  const secondaryLinks = [
    { href: '/account', label: 'Account', mobileOnly: true },
    { href: '/blog', label: 'Journal' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-cream text-warm-gray text-center py-2 sm:py-2.5 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-body border-b border-border px-4">
        Complimentary shipping on orders above ₹5,000
      </div>

      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-border">
        <div className="page-container">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 -ml-2.5 rounded-lg active:bg-cream transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-charcoal">
                LUMIÈRE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] lg:text-xs uppercase tracking-wider text-warm-gray hover:text-gold transition-colors font-medium py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={openSearch} aria-label="Search" className="p-2.5 rounded-lg hover:text-gold hover:bg-cream/60 active:bg-cream transition-colors">
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2.5 rounded-lg hover:text-gold hover:bg-cream/60 active:bg-cream transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button onClick={openCart} className="p-2.5 rounded-lg hover:text-gold hover:bg-cream/60 active:bg-cream transition-colors relative" aria-label="Cart">
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <Link href="/account" className="p-2.5 rounded-lg hover:text-gold hover:bg-cream/60 active:bg-cream transition-colors hidden sm:flex" aria-label="Account">
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav - Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav - Slide-in drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[min(80vw,320px)] bg-white z-50 transform transition-transform duration-300 ease-out md:hidden shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-14 sm:h-16 border-b border-border">
          <span className="font-display text-lg sm:text-xl font-light tracking-wider text-charcoal">LUMIÈRE</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2.5 -mr-2.5 rounded-lg hover:bg-cream active:bg-cream-dark transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col overflow-y-auto h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]">
          {/* Main nav links */}
          <div className="py-3 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3.5 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream rounded-lg transition-all active:bg-cream-dark"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {/* Secondary links */}
          <div className="py-3 px-2">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3.5 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream rounded-lg transition-all active:bg-cream-dark ${
                  link.mobileOnly ? 'sm:hidden' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom spacer for safe area */}
          <div className="mt-auto pb-[env(safe-area-inset-bottom,1rem)]" />
        </nav>
      </div>
    </>
  );
}
