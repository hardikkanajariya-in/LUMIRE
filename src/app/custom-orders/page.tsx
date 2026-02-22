'use client';

import { useState } from 'react';
import { Sparkles, Pencil, Gem, Package, Calendar } from 'lucide-react';

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    pieceType: '', metal: '', stone: '', budget: '', occasion: '', deadline: '', description: '',
  });

  const steps = [
    { icon: Pencil, title: 'Share Your Vision', desc: 'Tell us about the piece you dream of — the style, metal, stones, and the story behind it.' },
    { icon: Gem, title: 'Design & Approval', desc: 'Our designers create detailed sketches and 3D renders. You approve the design before we begin.' },
    { icon: Sparkles, title: 'Master Craftsmanship', desc: 'Our artisans bring your vision to life with meticulous attention to detail and quality.' },
    { icon: Package, title: 'Delivery & Delight', desc: 'Your bespoke piece arrives in our signature packaging, ready to become a cherished heirloom.' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-charcoal text-white py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-light mb-6">Bespoke Creations</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your most meaningful moments deserve one-of-a-kind jewelry. Let us craft something extraordinary, just for you.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-light">The Bespoke Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <step.icon size={24} className="text-gold" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xs text-gold font-medium">Step {i + 1}</span>
                </div>
                <h3 className="font-display text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Request Form */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-light mb-3">Start Your Custom Order</h2>
            <p className="text-sm text-warm-gray">Tell us about your dream piece and we&apos;ll bring it to life.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <Sparkles size={32} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-2">Request Received!</h3>
              <p className="text-sm text-warm-gray">Our design team will reach out within 48 hours to begin your journey.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-lg border border-border p-8 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Type of Piece</label>
                <select value={form.pieceType} onChange={(e) => setForm({ ...form, pieceType: e.target.value })} className="input-luxury" required>
                  <option value="">Select a type</option>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="pendant">Pendant</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Preferred Metal</label>
                  <select value={form.metal} onChange={(e) => setForm({ ...form, metal: e.target.value })} className="input-luxury">
                    <option value="">Select</option>
                    <option value="gold-18k">Gold 18K</option>
                    <option value="silver-925">Silver 925</option>
                    <option value="platinum">Platinum</option>
                    <option value="rose-gold">Rose Gold</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Stone Preference</label>
                  <select value={form.stone} onChange={(e) => setForm({ ...form, stone: e.target.value })} className="input-luxury">
                    <option value="">Select</option>
                    <option value="diamond">Diamond</option>
                    <option value="ruby">Ruby</option>
                    <option value="sapphire">Sapphire</option>
                    <option value="emerald">Emerald</option>
                    <option value="pearl">Pearl</option>
                    <option value="none">No Stone</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Budget Range</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="input-luxury">
                    <option value="">Select</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 – ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-2l">₹1,00,000 – ₹2,00,000</option>
                    <option value="above-2l">Above ₹2,00,000</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Occasion</label>
                  <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className="input-luxury">
                    <option value="">Select</option>
                    <option value="engagement">Engagement</option>
                    <option value="wedding">Wedding</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="birthday">Birthday</option>
                    <option value="gift">Gift</option>
                    <option value="self">Self Purchase</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Desired Deadline</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-luxury" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Describe Your Vision</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Tell us about your dream piece — style inspiration, specific details, reference images you love..." rows={5} className="input-luxury resize-none" required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-medium mb-2 block">Reference Image (optional)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
                  <p className="text-sm text-warm-gray">Drag & drop or click to upload</p>
                  <p className="text-xs text-warm-gray mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">Submit Custom Request</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
