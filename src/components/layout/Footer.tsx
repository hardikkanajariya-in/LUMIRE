'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Diamond } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Top Ribbon */}
      <div className="border-t border-b border-border bg-cream/60">
        <div className="page-container py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { title: 'Free Shipping', desc: 'On orders above ₹5,000' },
              { title: 'Lifetime Warranty', desc: 'On all fine jewelry' },
              { title: 'Easy Returns', desc: '30-day hassle-free returns' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1.5">
                <p className="text-sm font-semibold text-charcoal tracking-wide">{item.title}</p>
                <p className="text-[12px] text-warm-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="page-container py-16 sm:py-20 lg:py-24">
        {/* Brand Row */}
        <div className="text-center mb-14 lg:mb-16">
          <Link href="/" className="inline-block">
            <h3 className="font-display text-3xl sm:text-4xl font-light tracking-[0.15em] text-charcoal">LUMIÈRE</h3>
          </Link>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="w-10 h-[1px] bg-gold/40" />
            <Diamond size={12} className="text-gold" />
            <div className="w-10 h-[1px] bg-gold/40" />
          </div>
          <p className="text-sm text-warm-gray leading-relaxed mt-4 max-w-md mx-auto">
            Where precious meets timeless. Handcrafted luxury jewelry, designed to be treasured for a lifetime.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 lg:gap-16">
          {/* Shop */}
          <div className="text-center sm:text-left">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-charcoal font-semibold">Shop</h4>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom Pieces', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Custom Pieces' ? '/custom-orders' : item === 'Gift Cards' ? '/gift-cards' : `/products?category=${item.toLowerCase()}`}
                    className="text-[13px] text-warm-gray hover:text-gold-dark transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-charcoal font-semibold">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Journal', href: '/blog' },
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Returns', href: '/returns' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-warm-gray hover:text-gold-dark transition-colors inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-charcoal font-semibold">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <div className="text-left">
                  <p className="text-[13px] text-charcoal font-medium">+91 98765 43210</p>
                  <p className="text-[11px] text-warm-gray mt-0.5">Mon–Sat, 10am–7pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                <a href="mailto:hello@lumiere.com" className="text-[13px] text-charcoal hover:text-gold-dark transition-colors">hello@lumiere.com</a>
              </div>
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <p className="text-[13px] text-warm-gray leading-relaxed text-left">
                  42 Rue de la Joaillerie,<br />
                  Bandra West, Mumbai 400050
                </p>
              </div>
            </div>
          </div>

          {/* Social & Newsletter teaser */}
          <div className="text-center sm:text-left col-span-2 sm:col-span-1">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-charcoal font-semibold">Follow Us</h4>
            <p className="text-[13px] text-warm-gray leading-relaxed mb-5">
              Join our community for behind-the-scenes, styling tips, and exclusive previews.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-cream border border-border flex items-center justify-center text-warm-gray hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-cream border border-border flex items-center justify-center text-warm-gray hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="mailto:hello@lumiere.com" aria-label="Email" className="w-10 h-10 rounded-full bg-cream border border-border flex items-center justify-center text-warm-gray hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-cream/40">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-warm-gray order-2 md:order-1">
              © 2026 Lumière. All rights reserved. Crafted with love in India.
            </p>
            <div className="flex items-center gap-5 order-1 md:order-2">
              {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((m) => (
                <span key={m} className="text-[11px] text-warm-gray/50 font-semibold uppercase tracking-wider">{m}</span>
              ))}
            </div>
            <p className="text-[11px] text-warm-gray order-3">
              Built by{' '}
              <a href="https://hardikkanajariya.in" target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:underline font-medium">hardikkanajariya.in</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
