'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { products } from '@/lib/data/seed';
import { formatPrice, getMetalLabel } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [couponCode, setCouponCode] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });

  const subtotal = cartProducts.reduce((sum, item) => {
    if (!item.product) return sum;
    const price = item.product.salePrice || item.product.originalPrice;
    return sum + price * item.quantity;
  }, 0);

  const upsellProducts = products
    .filter((p) => !items.some((i) => i.productId === p.id))
    .slice(0, 3);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[min(100vw,420px)] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-gold" />
            <h2 className="font-display text-lg sm:text-xl">Your Cart</h2>
            <span className="text-xs text-warm-gray">({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 -mr-2 rounded-lg hover:bg-cream active:bg-cream-dark transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 sm:px-8 text-center py-12">
              <ShoppingBag size={44} className="text-light-gray mb-4" />
              <p className="font-display text-lg sm:text-xl mb-2">Your cart is empty</p>
              <p className="text-sm text-warm-gray mb-6 max-w-[260px]">
                Discover our curated collections and find something extraordinary.
              </p>
              <Link href="/products" onClick={closeCart} className="btn-primary">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {cartProducts.map((item) => {
                if (!item.product) return null;
                const price = item.product.salePrice || item.product.originalPrice;
                return (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 sm:gap-4 pb-4 border-b border-border last:border-b-0">
                    {/* Product image */}
                    <div className="w-[72px] sm:w-20 aspect-[3/4] bg-cream rounded-lg shrink-0 overflow-hidden">
                      <img src={item.product.primaryImage} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-sm font-medium truncate pr-2">{item.product.name}</h3>
                      <p className="text-xs text-warm-gray mt-0.5">
                        {getMetalLabel(item.metalType)}
                        {item.ringSize ? ` · Size ${item.ringSize}` : ''}
                      </p>
                      <p className="text-sm font-medium text-gold mt-1">{formatPrice(price)}</p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center border border-border rounded-full">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="p-1.5 sm:p-2 hover:text-gold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm w-7 sm:w-8 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:text-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-medium">{formatPrice(price * item.quantity)}</p>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="p-2 text-warm-gray hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Coupon */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code"
                  className="input-luxury flex-1 text-sm !py-2.5 !px-3.5"
                />
                <button className="btn-gold-outline !py-2 !px-4 text-xs shrink-0">Apply</button>
              </div>

              {/* Upsells */}
              {upsellProducts.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs uppercase tracking-wider text-warm-gray mb-3">
                    Customers also bought
                  </p>
                  <div className="space-y-3">
                    {upsellProducts.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-cream/60 transition-colors">
                        <div className="w-11 sm:w-12 aspect-[3/4] bg-cream rounded-lg shrink-0 overflow-hidden">
                          <img src={p.primaryImage} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{p.name}</p>
                          <p className="text-xs text-gold mt-0.5">{formatPrice(p.salePrice || p.originalPrice)}</p>
                        </div>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={closeCart}
                          className="text-xs text-gold font-medium hover:underline whitespace-nowrap py-1.5 px-2"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-4 sm:px-6 py-4 sm:py-5 space-y-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-warm-gray">Subtotal</span>
              <span className="text-lg font-display font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-warm-gray">
              Shipping & taxes calculated at checkout
            </p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="btn-outline w-full">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
