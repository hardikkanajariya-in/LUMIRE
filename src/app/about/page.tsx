'use client';

import Link from 'next/link';
import { Sparkles, Heart, Gem, Leaf, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-charcoal text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Sparkles size={24} className="text-gold mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-6xl font-light mb-6">Our Story</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Born from a passion for timeless beauty and exceptional craftsmanship, 
            Lumière has been creating heirloom-quality jewelry since 2018.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/5] bg-cream rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <Sparkles size={40} className="text-gold mx-auto mb-3" />
                <p className="font-display text-warm-gray italic">Our Founder</p>
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">The Beginning</span>
              <h2 className="font-display text-3xl md:text-4xl font-light mt-4 mb-6">
                A dream born from the love of beautiful things
              </h2>
              <p className="text-warm-gray leading-relaxed mb-4">
                Lumière was founded with a singular vision: to create jewelry that transcends trends 
                and speaks to the soul. Every piece we craft is a testament to the belief that true 
                luxury lies not in ostentation, but in the quiet confidence of exceptional quality.
              </p>
              <p className="text-warm-gray leading-relaxed mb-4">
                Our journey began in a small workshop in Mumbai, where a team of master artisans 
                brought our founder&apos;s vision to life. Today, we continue that tradition of 
                handcrafted excellence, combining time-honored techniques with contemporary design.
              </p>
              <p className="text-warm-gray leading-relaxed">
                Each Lumière piece passes through the hands of at least five artisans before it 
                reaches yours — from the initial sketch to the final polish. This is jewelry made 
                with patience, passion, and an unwavering commitment to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-4">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Gem, title: 'Exceptional Craftsmanship', desc: 'Every piece is handcrafted by master artisans with decades of experience, using time-honored techniques passed down through generations.' },
              { icon: Leaf, title: 'Ethical Sourcing', desc: 'We are committed to responsibly sourced gemstones and recycled precious metals. Our supply chain is transparent and conflict-free.' },
              { icon: Heart, title: 'Meaningful Design', desc: 'We believe jewelry should tell a story. Each design is created to carry emotional significance and be treasured for a lifetime.' },
            ].map((value) => (
              <div key={value.title} className="text-center p-8 bg-white rounded-lg border border-border">
                <value.icon size={28} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {['The Workshop', 'Hand Setting', 'Final Polish'].map((title) => (
              <div key={title} className="aspect-square bg-cream rounded-lg border border-border flex items-center justify-center">
                <p className="font-display text-warm-gray italic">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">The Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-4">The Hands Behind the Craft</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Marie Laurent', role: 'Founder & Creative Director' },
              { name: 'Rajan Patel', role: 'Master Goldsmith' },
              { name: 'Sophie Chen', role: 'Head of Design' },
              { name: 'Arjun Nair', role: 'Gemologist' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-cream border border-border flex items-center justify-center">
                  <Users size={28} className="text-warm-gray" />
                </div>
                <h4 className="font-display text-lg">{member.name}</h4>
                <p className="text-xs text-warm-gray mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Leaf size={28} className="text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-light mb-6">Our Sustainability Pledge</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We believe luxury and responsibility go hand in hand. By 2027, we pledge to achieve 
            100% recycled precious metals, carbon-neutral operations, and zero-waste packaging.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Every Lumière purchase contributes to our partnership with environmental organizations 
            working to protect natural habitats where gemstones are found.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-light mb-6">Ready to discover your piece?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">Explore Collection</Link>
            <Link href="/custom-orders" className="btn-outline">Create a Custom Piece</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
