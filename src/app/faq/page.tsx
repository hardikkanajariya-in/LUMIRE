'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    name: 'Orders & Shipping',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Same-day delivery is available in select cities for orders placed before 12 PM.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we ship within India only. International shipping will be available soon. Please subscribe to our newsletter for updates.',
      },
      {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order is shipped, you will receive a tracking number via email and SMS. You can also track your order from your account page.',
      },
      {
        question: 'What packaging do you use?',
        answer: 'Every Lumière piece comes in our signature ivory gift box with a satin ribbon, accompanied by a certificate of authenticity, polishing cloth, and care card.',
      },
    ],
  },
  {
    name: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for all unused and unworn items in their original packaging. Custom orders and personalized pieces are non-returnable.',
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log in to your account, go to order history, and select the item you wish to return. You can also contact our customer care team for assistance.',
      },
      {
        question: 'Can I exchange for a different size?',
        answer: 'Yes, size exchanges are free within 30 days of purchase. We will ship the new size as soon as we receive the original item back.',
      },
    ],
  },
  {
    name: 'Product Information',
    items: [
      {
        question: 'Are your diamonds certified?',
        answer: 'Yes, all diamonds 0.3 carats and above come with a GIA or IGI certificate. The certificate details are listed on each product page.',
      },
      {
        question: 'What gold purity do you use?',
        answer: 'We work with 14K, 18K, and 22K gold. Each product page specifies the gold purity. We also offer platinum and rose gold options for select designs.',
      },
      {
        question: 'How do I find my ring size?',
        answer: 'We provide a comprehensive ring size guide on each ring product page. You can also visit any of our store locations for a complimentary ring sizing.',
      },
      {
        question: 'Can I customize a piece?',
        answer: 'Absolutely! Visit our Custom Orders page to begin the bespoke journey. Our design team will work with you to create your dream piece.',
      },
    ],
  },
  {
    name: 'Care & Maintenance',
    items: [
      {
        question: 'How should I care for my jewelry?',
        answer: 'Store pieces individually in soft pouches. Avoid contact with perfumes, lotions, and chlorine. Clean gently with a soft cloth. We include a care card with every purchase.',
      },
      {
        question: 'Do you offer cleaning services?',
        answer: 'Yes, we offer complimentary professional cleaning and polishing for all Lumière pieces. Visit any of our locations or mail your piece to us.',
      },
      {
        question: 'Is there a warranty?',
        answer: 'All Lumière jewelry comes with a 1-year warranty covering manufacturing defects. We also offer lifetime rhodium plating for white gold pieces at a nominal charge.',
      },
    ],
  },
  {
    name: 'Payment & Security',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI, all major credit and debit cards, net banking, EMI options, and Cash on Delivery. All payments are processed through secure, PCI-compliant gateways.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard SSL encryption and never store your full card details. All transactions are processed through verified payment gateways.',
      },
      {
        question: 'Do you offer EMI options?',
        answer: 'Yes, we offer no-cost EMI on orders above ₹10,000 with select bank cards. EMI options are displayed during checkout.',
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left hover:text-gold transition-colors">
        <span className="text-xs sm:text-sm font-medium pr-4">{item.question}</span>
        <ChevronDown size={16} className={`shrink-0 text-warm-gray transition-transform sm:w-[18px] sm:h-[18px] ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-60 pb-3.5 sm:pb-4' : 'max-h-0'}`}>
        <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].name);

  function toggleItem(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const activeCategoryData = FAQ_DATA.find((c) => c.name === activeCategory);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-14 sm:py-16 md:py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 text-charcoal">Frequently Asked Questions</h1>
          <p className="text-sm sm:text-base text-warm-gray">Everything you need to know about shopping with Lumière.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-1.5 sm:gap-2 mb-6 sm:mb-8 pb-2 no-scrollbar">
          {FAQ_DATA.map((cat) => (
            <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.name ? 'bg-gold text-white' : 'border border-border text-warm-gray hover:border-gold'
              }`}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Questions */}
        {activeCategoryData && (
          <div className="bg-white border border-border rounded-lg p-4 sm:p-5 md:p-6">
            <h2 className="font-display text-lg sm:text-xl mb-3 sm:mb-4">{activeCategoryData.name}</h2>
            {activeCategoryData.items.map((item, idx) => {
              const key = `${activeCategoryData.name}-${idx}`;
              return (
                <AccordionItem key={key} item={item} isOpen={!!openItems[key]}
                  onToggle={() => toggleItem(key)} />
              );
            })}
          </div>
        )}

        {/* Contact CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 p-5 sm:p-6 md:p-8 bg-cream rounded-lg border border-border">
          <h3 className="font-display text-lg sm:text-xl mb-2">Still have questions?</h3>
          <p className="text-sm text-warm-gray mb-4">
            Our customer care team is here to help.
          </p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
