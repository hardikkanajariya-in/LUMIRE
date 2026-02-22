'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-light tracking-wider mb-4">LUMIÈRE</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Where precious meets timeless. Crafted with intention, worn for a lifetime.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:hello@lumiere.com" aria-label="Email" className="text-gray-400 hover:text-gold transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gold">Shop</h4>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Custom Pieces', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Custom Pieces' ? '/custom-orders' : item === 'Gift Cards' ? '/gift-cards' : `/products?category=${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gold">Company</h4>
            <ul className="space-y-3">
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
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gold">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">+91 98765 43210</p>
                  <p className="text-xs text-gray-500">Mon–Sat, 10am–7pm IST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">hello@lumiere.com</p>
              </div>
              <p className="text-sm text-gray-400">
                42 Rue de la Joaillerie<br />
                Bandra West, Mumbai 400050
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2025 Lumière. All rights reserved. Crafted with love in India.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-500">Visa</span>
            <span className="text-xs text-gray-500">Mastercard</span>
            <span className="text-xs text-gray-500">UPI</span>
            <span className="text-xs text-gray-500">Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
