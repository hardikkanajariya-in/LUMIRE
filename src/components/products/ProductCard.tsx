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
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="badge badge-gold text-[9px] sm:text-[10px]">New</span>
          )}
          {product.salePrice && (
            <span className="badge badge-rose text-[9px] sm:text-[10px]">
              -{getDiscountPercentage(product.originalPrice, product.salePrice)}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white hover:scale-110 active:scale-95 shadow-sm"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            className={`sm:[&]:w-[15px] sm:[&]:h-[15px] ${wishlisted ? 'fill-rose text-rose' : 'text-warm-gray'}`}
          />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-300" />
      </div>

      {/* Info */}
      <div className="product-info">
        <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-gold-dark mb-1 sm:mb-1.5 font-medium">
          {product.category}
        </p>
        <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-charcoal leading-snug mb-1.5 sm:mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap">
          <span className="font-display text-base sm:text-lg md:text-xl font-semibold text-gold-dark">
            {formatPrice(product.salePrice || product.originalPrice)}
          </span>
          {product.salePrice && (
            <span className="text-[10px] sm:text-xs text-warm-gray line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-border/60">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
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
          <span className="text-[10px] sm:text-[11px] text-warm-gray">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
