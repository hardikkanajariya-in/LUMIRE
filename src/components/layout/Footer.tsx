'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      {/* Main Footer */}
      <div className="page-container py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display text-2xl font-light tracking-wider text-charcoal mb-4">LUMIÈRE</h3>
            <p className="text-sm text-warm-gray leading-relaxed mb-6 max-w-xs">
              Where precious meets timeless. Crafted with intention, worn for a lifetime.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all">
                <Facebook size={16} />
              </a>
              <a href="mailto:hello@lumiere.com" aria-label="Email" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-warm-gray hover:text-gold hover:border-gold transition-all">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-gold-dark font-semibold">Shop</h4>
            <ul className="space-y-2.5">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom Pieces', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Custom Pieces' ? '/custom-orders' : item === 'Gift Cards' ? '/gift-cards' : `/products?category=${item.toLowerCase()}`}
                    className="text-sm text-warm-gray hover:text-gold-dark transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-gold-dark font-semibold">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Journal', href: '/blog' },
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Returns & Refunds', href: '/returns' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-warm-gray hover:text-gold-dark transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-5 text-gold-dark font-semibold">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-charcoal font-medium">+91 98765 43210</p>
                  <p className="text-[11px] text-warm-gray mt-0.5">Mon–Sat, 10am–7pm IST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={15} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-charcoal">hello@lumiere.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-warm-gray leading-relaxed">
                  42 Rue de la Joaillerie<br />
                  Bandra West, Mumbai 400050
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="page-container py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-warm-gray">
            © 2025 Lumière. All rights reserved. Crafted with love in India.
          </p>
          <p className="text-[11px] text-warm-gray">
            Built by{' '}
            <a href="https://hardikkanajariya.in" target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:underline font-medium">hardikkanajariya.in</a>
          </p>
          <div className="flex gap-4 sm:gap-6">
            {['Visa', 'Mastercard', 'UPI', 'Net Banking'].map((m) => (
              <span key={m} className="text-[11px] text-warm-gray/60 font-medium">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
