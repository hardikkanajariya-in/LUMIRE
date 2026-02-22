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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-light">Wishlist</h1>
            <p className="text-sm text-warm-gray mt-1">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
          </div>
          {items.length > 0 && (
            <button onClick={shareWishlist} className="flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors">
              <Share2 size={16} /> Share
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-light-gray mb-4" />
            <h2 className="font-display text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-warm-gray mb-6">Save your favorite pieces to revisit them later.</p>
            <Link href="/products" className="btn-primary">Start Exploring</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product) => {
              if (!product) return null;
              const price = product.salePrice || product.originalPrice;
              return (
                <div key={product.id} className="bg-white border border-border hover:border-gold transition-all rounded-lg overflow-hidden group">
                  <Link href={`/products/${product.slug}`}>
                    <div className="aspect-[3/4] bg-cream flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-border/50 flex items-center justify-center">
                          <span className="text-warm-gray text-xs font-display">L</span>
                        </div>
                        <span className="text-xs text-warm-gray">{product.category}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-display text-sm font-medium mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gold font-medium mb-3">{formatPrice(price)}</p>
                    <div className="flex gap-2">
                      <button onClick={() => moveToCart(product.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gold text-white rounded-full text-xs font-medium hover:bg-gold-dark transition-colors">
                        <ShoppingBag size={12} /> Move to Cart
                      </button>
                      <button onClick={() => removeItem(product.id)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors" aria-label="Remove from wishlist">
                        <Trash2 size={14} />
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
