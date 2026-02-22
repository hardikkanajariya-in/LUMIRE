'use client';

import { useState } from 'react';
import { Gift, CreditCard, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const AMOUNTS = [500, 1000, 2500, 5000];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const finalAmount = useCustom ? Number(customAmount) || 0 : selectedAmount;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (finalAmount < 100) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="font-display text-3xl mb-3">Gift Card Sent!</h1>
          <p className="text-warm-gray mb-2">
            A {formatPrice(finalAmount)} Lumière gift card has been sent to <strong>{recipientEmail}</strong>.
          </p>
          <p className="text-sm text-warm-gray mb-6">The recipient will receive an email with their unique gift card code.</p>
          <a href="/" className="btn-primary inline-block">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <Gift className="mx-auto mb-4 text-gold" size={40} />
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4 text-charcoal">Gift Cards</h1>
          <p className="text-warm-gray max-w-lg mx-auto">
            Give the gift of choice. A Lumière gift card lets your loved ones pick the jewelry that speaks to them.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Amount Selection */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-4">Select Amount</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {AMOUNTS.map((amt) => (
                <button key={amt} type="button"
                  onClick={() => { setSelectedAmount(amt); setUseCustom(false); }}
                  className={`py-3 rounded-lg border text-center transition-all ${
                    !useCustom && selectedAmount === amt
                      ? 'border-gold bg-gold/5 text-charcoal font-medium'
                      : 'border-border text-warm-gray hover:border-gold'
                  }`}>
                  {formatPrice(amt)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setUseCustom(true)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  useCustom ? 'border-gold bg-gold/5' : 'border-border hover:border-gold'
                }`}>
                Custom Amount
              </button>
              {useCustom && (
                <div className="flex-1">
                  <input type="number" min="100" max="100000" placeholder="Enter amount (min ₹100)"
                    value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
                    className="input-luxury w-full" />
                </div>
              )}
            </div>
          </div>

          {/* Recipient Details */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h2 className="font-display text-xl mb-4">Recipient Details</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-warm-gray mb-1">Recipient Name</label>
                <input type="text" required value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter name" className="input-luxury w-full" />
              </div>
              <div>
                <label className="block text-sm text-warm-gray mb-1">Recipient Email</label>
                <input type="email" required value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Enter email" className="input-luxury w-full" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-warm-gray mb-1">Your Name</label>
              <input type="text" required value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name" className="input-luxury w-full" />
            </div>
            <div>
              <label className="block text-sm text-warm-gray mb-1">Personal Message (optional)</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal note..." maxLength={200} rows={3}
                className="input-luxury w-full resize-none" />
              <span className="text-xs text-warm-gray">{message.length}/200</span>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-cream to-cream-dark rounded-lg p-8 relative overflow-hidden border border-border">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -mr-16 -mt-16" />
            <div className="relative">
              <p className="font-display text-2xl text-gold-dark mb-1">Lumière</p>
              <p className="text-sm text-warm-gray mb-6">Gift Card</p>
              <p className="font-display text-4xl mb-4 text-charcoal">{formatPrice(finalAmount)}</p>
              {recipientName && <p className="text-sm text-charcoal">To: {recipientName}</p>}
              {senderName && <p className="text-sm text-warm-gray">From: {senderName}</p>}
              {message && <p className="text-sm italic text-warm-gray mt-3">&ldquo;{message}&rdquo;</p>}
              <CreditCard className="absolute bottom-0 right-0 text-gold/20" size={64} />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warm-gray">Total</p>
              <p className="font-display text-2xl">{formatPrice(finalAmount)}</p>
            </div>
            <button type="submit" disabled={finalAmount < 100}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:pointer-events-none">
              Purchase Gift Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
