'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-cream py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4 text-charcoal">Get in Touch</h1>
          <p className="text-warm-gray">We&apos;d love to hear from you. Reach out for inquiries, custom orders, or just to say hello.</p>
        </div>
      </section>

      <div className="page-container py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-cream rounded-lg p-8 text-center">
                <p className="font-display text-xl mb-2">Thank you!</p>
                <p className="text-sm text-warm-gray">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-luxury" required />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="input-luxury" required />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" className="input-luxury" />
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-luxury">
                  <option value="general">General Inquiry</option>
                  <option value="custom">Custom Order</option>
                  <option value="wholesale">Wholesale</option>
                </select>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message" rows={5} className="input-luxury resize-none" required />
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl mb-6">Visit Our Boutique</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p className="text-sm text-warm-gray">42 Rue de la Joaillerie<br />Bandra West, Mumbai 400050<br />India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone</h3>
                  <p className="text-sm text-warm-gray">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <p className="text-sm text-warm-gray">hello@lumiere.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Store Hours</h3>
                  <p className="text-sm text-warm-gray">Monday – Saturday: 10:00 AM – 7:00 PM<br />Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>

            <div className="mt-8 aspect-video rounded-xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=450&fit=crop" alt="Lumière Boutique" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
