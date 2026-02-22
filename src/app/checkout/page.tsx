'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, CreditCard, Banknote, Smartphone, Building, Sparkles, PartyPopper } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { products } from '@/lib/data/seed';
import { formatPrice, generateOrderNumber } from '@/lib/utils';

type Step = 1 | 2 | 3;
type ShippingMethodType = 'standard' | 'express' | 'same-day';
type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'cod';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [formData, setFormData] = useState({
    email: '', name: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India',
  });
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodType>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((i) => i.product);

  const subtotal = cartProducts.reduce((sum, item) => {
    const price = item.product!.salePrice || item.product!.originalPrice;
    return sum + price * item.quantity;
  }, 0);

  const shippingCosts: Record<ShippingMethodType, number> = { standard: subtotal >= 5000 ? 0 : 200, express: 200, 'same-day': 500 };
  const shippingCost = shippingCosts[shippingMethod];
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + shippingCost + tax;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (couponCode.toUpperCase() === 'LUMIERE500' && subtotal >= 10000) {
      setDiscount(500);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePlaceOrder = () => {
    const num = generateOrderNumber();
    setOrderNumber(num);
    setOrderComplete(true);
    clearCart();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory relative overflow-hidden">
        {/* Confetti */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="confetti-piece" style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#C9A84C', '#B76E79', '#D4B96A', '#F5F0E8', '#1A1A1A'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }} />
        ))}
        <div className="text-center z-10 px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <PartyPopper size={32} className="text-gold" />
          </div>
          <h1 className="font-display text-4xl font-light mb-3">Order Confirmed!</h1>
          <p className="text-warm-gray mb-2">Thank you for your purchase.</p>
          <p className="text-sm bg-cream inline-block px-4 py-2 rounded-full mb-6">
            Order Number: <span className="font-medium text-gold">{orderNumber}</span>
          </p>
          <p className="text-sm text-warm-gray mb-8">
            Estimated delivery: {shippingMethod === 'same-day' ? 'Today' : shippingMethod === 'express' ? '2-3 business days' : '5-7 business days'}
          </p>
          <p className="text-xs text-warm-gray mb-6">A confirmation email has been sent to {formData.email || 'your email'}.</p>
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1 as Step, label: 'Contact & Shipping' },
    { num: 2 as Step, label: 'Delivery Method' },
    { num: 3 as Step, label: 'Payment' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-display text-3xl font-light mb-8 text-center">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <button onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-2 ${step >= s.num ? 'text-charcoal' : 'text-warm-gray'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${step > s.num ? 'bg-gold text-white' : step === s.num ? 'bg-charcoal text-white' : 'bg-light-gray text-warm-gray'}`}>
                  {step > s.num ? <Check size={14} /> : s.num}
                </div>
                <span className="text-xs uppercase tracking-wider hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight size={16} className="mx-4 text-light-gray" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl mb-4">Contact Information</h2>
                  <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Email address" className="input-luxury" />
                </div>
                <div>
                  <h2 className="font-display text-xl mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Full name" className="input-luxury col-span-2" />
                    <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone number" className="input-luxury col-span-2" />
                    <input type="text" value={formData.addressLine1} onChange={(e) => updateField('addressLine1', e.target.value)} placeholder="Address line 1" className="input-luxury col-span-2" />
                    <input type="text" value={formData.addressLine2} onChange={(e) => updateField('addressLine2', e.target.value)} placeholder="Address line 2 (optional)" className="input-luxury col-span-2" />
                    <input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)} placeholder="City" className="input-luxury" />
                    <input type="text" value={formData.state} onChange={(e) => updateField('state', e.target.value)} placeholder="State" className="input-luxury" />
                    <input type="text" value={formData.pincode} onChange={(e) => updateField('pincode', e.target.value)} placeholder="Pincode" className="input-luxury" />
                    <input type="text" value={formData.country} onChange={(e) => updateField('country', e.target.value)} placeholder="Country" className="input-luxury" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary w-full">Continue to Shipping</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl mb-4">Shipping Method</h2>
                {([
                  { value: 'standard' as ShippingMethodType, label: 'Standard Shipping', desc: '5–7 business days', price: subtotal >= 5000 ? 'Free' : '₹200' },
                  { value: 'express' as ShippingMethodType, label: 'Express Shipping', desc: '2–3 business days', price: '₹200' },
                  { value: 'same-day' as ShippingMethodType, label: 'Same Day Delivery', desc: 'Available in select cities', price: '₹500' },
                ]).map((method) => (
                  <button key={method.value} onClick={() => setShippingMethod(method.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${shippingMethod === method.value ? 'border-gold bg-gold/5' : 'border-border hover:border-gold'}`}>
                    <div className="text-left">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{method.desc}</p>
                    </div>
                    <span className="text-sm font-medium">{method.price}</span>
                  </button>
                ))}
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1">Continue to Payment</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl mb-4">Payment Method</h2>
                {([
                  { value: 'upi' as PaymentMethodType, label: 'UPI', icon: Smartphone, desc: 'Pay using Google Pay, PhonePe, etc.' },
                  { value: 'card' as PaymentMethodType, label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                  { value: 'netbanking' as PaymentMethodType, label: 'Net Banking', icon: Building, desc: 'All major banks supported' },
                  { value: 'cod' as PaymentMethodType, label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
                ]).map((method) => (
                  <button key={method.value} onClick={() => setPaymentMethod(method.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${paymentMethod === method.value ? 'border-gold bg-gold/5' : 'border-border hover:border-gold'}`}>
                    <method.icon size={20} className={paymentMethod === method.value ? 'text-gold' : 'text-warm-gray'} />
                    <div className="text-left">
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{method.desc}</p>
                    </div>
                  </button>
                ))}
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setStep(2)} className="btn-outline flex-1">Back</button>
                  <button onClick={handlePlaceOrder} className="btn-primary flex-1">Place Order · {formatPrice(total)}</button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
              <h3 className="font-display text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cartProducts.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                    <div className="w-14 h-16 bg-cream rounded flex-shrink-0 flex items-center justify-center relative">
                      <span className="text-[10px] text-warm-gray">IMG</span>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal text-white text-[10px] rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.product!.name}</p>
                      <p className="text-xs text-warm-gray">{item.metalType.replace('-', ' ')}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice((item.product!.salePrice || item.product!.originalPrice) * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4 pb-4 border-b border-border">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon code" className="input-luxury flex-1 text-sm py-2" />
                <button onClick={applyCoupon} className="btn-gold-outline py-1.5 px-3 text-xs">Apply</button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-warm-gray">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between"><span className="text-warm-gray">Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
                <div className="flex justify-between"><span className="text-warm-gray">Tax (GST 18%)</span><span>{formatPrice(tax)}</span></div>
                <div className="flex justify-between pt-3 border-t border-border font-medium text-base">
                  <span>Total</span>
                  <span className="text-gold font-display text-lg">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
