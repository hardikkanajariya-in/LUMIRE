'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store/wishlist';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addItem, removeItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlisted ? removeItem(product.id) : addItem(product.id);
  };

  return (
    <Link href={`/products/${product.slug}`} className="product-card block group">
      {/* Image */}
      <div className="product-image relative">
        <div className="w-full h-full bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-border/50 flex items-center justify-center">
              <span className="text-warm-gray text-xs font-display">L</span>
            </div>
            <span className="text-xs text-warm-gray font-display">{product.category}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="badge badge-gold">New</span>
          )}
          {product.salePrice && (
            <span className="badge badge-rose">
              -{getDiscountPercentage(product.originalPrice, product.salePrice)}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-rose text-rose' : 'text-warm-gray'}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-warm-gray mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-medium text-charcoal leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gold">
            {formatPrice(product.salePrice || product.originalPrice)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-warm-gray line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? 'text-gold fill-gold'
                    : 'text-light-gray fill-light-gray'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-warm-gray">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
