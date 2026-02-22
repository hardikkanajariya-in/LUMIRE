'use client';

import Link from 'next/link';
import { useState } from 'react';
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

  const navLinks = [
    { href: '/products', label: 'Collections' },
    { href: '/products?category=rings', label: 'Rings' },
    { href: '/products?category=necklaces', label: 'Necklaces' },
    { href: '/products?category=earrings', label: 'Earrings' },
    { href: '/products?category=bracelets', label: 'Bracelets' },
    { href: '/custom-orders', label: 'Custom' },
    { href: '/gift-cards', label: 'Gifts' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-cream text-warm-gray text-center py-2.5 text-[11px] tracking-[0.2em] uppercase font-body border-b border-border">
        Complimentary shipping on orders above ₹5,000
      </div>

      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
        <div className="page-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl md:text-3xl font-light tracking-wider text-charcoal">
                LUMIÈRE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-warm-gray hover:text-gold transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={openSearch} aria-label="Search" className="p-2 hover:text-gold transition-colors">
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2 hover:text-gold transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button onClick={openCart} className="p-2 hover:text-gold transition-colors relative" aria-label="Cart">
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <Link href="/account" className="p-2 hover:text-gold transition-colors hidden sm:block" aria-label="Account">
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav - Slide-in drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
        )}
        <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <span className="font-display text-xl font-light tracking-wider text-charcoal">LUMIÈRE</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col py-4 overflow-y-auto h-[calc(100%-4rem)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream transition-all sm:hidden"
              >
                Account
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream transition-all"
              >
                Journal
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream transition-all"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm uppercase tracking-wider text-warm-gray hover:text-gold hover:bg-cream transition-all"
              >
                Contact
              </Link>
            </nav>
        </div>
      </header>
    </>
  );
}
