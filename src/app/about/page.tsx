'use client';

import Link from 'next/link';
import { Sparkles, Heart, Gem, Leaf, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-charcoal text-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-light mb-6">Our Story</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Born from a passion for timeless beauty and exceptional craftsmanship, 
            Lumière has been creating heirloom-quality jewelry since 2018.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&h=750&fit=crop" alt="Our Founder" className="w-full h-full object-cover" />
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'The Workshop', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop' },
              { title: 'Hand Setting', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop' },
              { title: 'Final Polish', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop' },
            ].map((item) => (
              <div key={item.title} className="aspect-square rounded-xl overflow-hidden relative group">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                  <p className="font-display text-white text-lg">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">The Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-4">The Hands Behind the Craft</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: 'Marie Laurent', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
              { name: 'Rajan Patel', role: 'Master Goldsmith', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
              { name: 'Sophie Chen', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
              { name: 'Arjun Nair', role: 'Gemologist', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h4 className="font-display text-base sm:text-lg">{member.name}</h4>
                <p className="text-xs text-warm-gray mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
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
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
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
