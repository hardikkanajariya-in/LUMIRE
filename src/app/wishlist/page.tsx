'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Share2, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { products } from '@/lib/data/seed';
import { formatPrice, getMetalLabel } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean);

  const moveToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addToCart({
      productId: product.id,
      variantId: product.variants[0]?.id || product.id,
      quantity: 1,
      metalType: product.metalType[0],
      ringSize: product.ringSizes[0] || undefined,
    });
    removeItem(productId);
    openCart();
  };

  const shareWishlist = () => {
    const url = `${window.location.origin}/wishlist?shared=${items.map((i) => i.productId).join(',')}`;
    navigator.clipboard.writeText(url);
    alert('Wishlist link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="page-container py-8 sm:py-10 md:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light">Wishlist</h1>
            <p className="text-xs sm:text-sm text-warm-gray mt-1">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
          </div>
          {items.length > 0 && (
            <button onClick={shareWishlist} className="flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors">
              <Share2 size={16} /> Share
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <Heart size={40} className="mx-auto text-light-gray mb-3 sm:mb-4 sm:w-12 sm:h-12" />
            <h2 className="font-display text-xl sm:text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-xs sm:text-sm text-warm-gray mb-5 sm:mb-6">Save your favorite pieces to revisit them later.</p>
            <Link href="/products" className="btn-primary">Start Exploring</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {wishlistProducts.map((product) => {
              if (!product) return null;
              const price = product.salePrice || product.originalPrice;
              return (
                <div key={product.id} className="bg-white border border-border hover:border-gold transition-all rounded-lg overflow-hidden group">
                  <Link href={`/products/${product.slug}`}>
                    <div className="aspect-[3/4] bg-cream overflow-hidden">
                      <img src={product.primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  </Link>
                  <div className="p-3 sm:p-4">
                    <p className="text-[11px] sm:text-xs text-warm-gray uppercase tracking-wider mb-0.5 sm:mb-1">{product.category}</p>
                    <h3 className="font-display text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 truncate">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-gold font-medium mb-2 sm:mb-3">{formatPrice(price)}</p>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button onClick={() => moveToCart(product.id)} className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-gold text-white rounded-full text-[10px] sm:text-xs font-medium hover:bg-gold-dark active:bg-gold-dark transition-colors">
                        <ShoppingBag size={11} className="sm:w-3 sm:h-3" /> Move to Cart
                      </button>
                      <button onClick={() => removeItem(product.id)} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-border flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors shrink-0" aria-label="Remove from wishlist">
                        <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
