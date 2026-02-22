'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, Minus, Plus, Star, ChevronDown, ChevronUp, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { products, reviews as allReviews } from '@/lib/data/seed';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { formatPrice, getDiscountPercentage, getMetalLabel } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';
import type { MetalType } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);

  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product?.metalType[0] || 'gold-18k');
  const [selectedSize, setSelectedSize] = useState(product?.ringSizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [activeTab, setActiveTab] = useState<'reviews' | 'related'>('reviews');

  const addToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">Browse Collection</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const currentPrice = product.salePrice || product.originalPrice;
  const productReviews = allReviews.filter((r) => r.productId === product.id && r.status === 'approved');
  const relatedProducts = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const variant = product.variants.find((v) => v.metalType === selectedMetal);
    addToCart({
      productId: product.id,
      variantId: variant?.id || product.variants[0]?.id || product.id,
      quantity,
      metalType: selectedMetal,
      ringSize: selectedSize || undefined,
    });
    openCart();
  };

  const toggleWishlist = () => {
    wishlisted ? removeWishlist(product.id) : addWishlist(product.id);
  };

  const AccordionItem = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border">
      <button onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
        className="flex items-center justify-between w-full py-4 text-sm font-medium">
        {title}
        {openAccordion === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openAccordion === id && <div className="pb-4 text-sm text-warm-gray leading-relaxed">{children}</div>}
    </div>
  );

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: productReviews.filter((r) => r.rating === stars).length,
    percentage: productReviews.length > 0
      ? (productReviews.filter((r) => r.rating === stars).length / productReviews.length) * 100
      : 0,
  }));

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-warm-gray">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categorySlug}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-charcoal truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-cream rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-border/50 flex items-center justify-center">
                  <Sparkles size={28} className="text-gold" />
                </div>
                <p className="font-display text-warm-gray italic text-lg">{product.name}</p>
                <p className="text-xs text-warm-gray mt-1">{product.category}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-cream rounded flex items-center justify-center border-2 transition-colors ${selectedImage === i ? 'border-gold' : 'border-transparent hover:border-border'}`}>
                  <span className="text-[10px] text-warm-gray">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'fill-gold text-gold' : 'text-light-gray fill-light-gray'} />
                ))}
              </div>
              <span className="text-xs text-warm-gray">({product.reviewCount} reviews)</span>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-light mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-display font-semibold text-gold">{formatPrice(currentPrice)}</span>
              {product.salePrice && (
                <>
                  <span className="text-lg text-warm-gray line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge badge-rose">-{getDiscountPercentage(product.originalPrice, product.salePrice)}%</span>
                </>
              )}
            </div>

            <p className="text-sm text-warm-gray leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Metal Type */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider font-medium mb-3 block">Metal Type</label>
              <div className="flex flex-wrap gap-2">
                {product.metalType.map((metal) => (
                  <button key={metal} onClick={() => setSelectedMetal(metal)}
                    className={`px-4 py-2.5 rounded-full text-sm border transition-all ${selectedMetal === metal ? 'border-gold bg-gold/10 text-gold' : 'border-border text-warm-gray hover:border-gold'}`}>
                    {getMetalLabel(metal)}
                  </button>
                ))}
              </div>
            </div>

            {/* Ring Size */}
            {product.ringSizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-wider font-medium">Ring Size</label>
                  <button className="text-xs text-gold hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.ringSizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full text-sm border transition-all flex items-center justify-center ${selectedSize === size ? 'border-gold bg-gold/10 text-gold' : 'border-border text-warm-gray hover:border-gold'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-xs uppercase tracking-wider font-medium mb-3 block">Quantity</label>
              <div className="flex items-center border border-border rounded-full w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-gold transition-colors" aria-label="Decrease quantity"><Minus size={16} /></button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-gold transition-colors" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} className="btn-primary flex-1">Add to Cart</button>
              <button onClick={toggleWishlist}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${wishlisted ? 'border-rose bg-rose/10' : 'border-border hover:border-gold'}`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
                <Heart size={20} className={wishlisted ? 'fill-rose text-rose' : 'text-warm-gray'} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-6">
              <div className="text-center">
                <Truck size={20} className="mx-auto text-gold mb-1.5" />
                <p className="text-[11px] text-warm-gray">Free Shipping<br />over ₹5,000</p>
              </div>
              <div className="text-center">
                <Shield size={20} className="mx-auto text-gold mb-1.5" />
                <p className="text-[11px] text-warm-gray">Lifetime<br />Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw size={20} className="mx-auto text-gold mb-1.5" />
                <p className="text-[11px] text-warm-gray">30-Day<br />Returns</p>
              </div>
            </div>

            {/* Accordions */}
            <div>
              <AccordionItem id="description" title="Description">
                {product.description}
              </AccordionItem>
              <AccordionItem id="materials" title="Material Details">
                {product.materialDetails}
              </AccordionItem>
              <AccordionItem id="care" title="Care Instructions">
                {product.careInstructions}
              </AccordionItem>
            </div>

            <Link href="/contact" className="text-xs text-gold hover:underline mt-4 inline-block">Ask a Question</Link>
          </div>
        </div>

        {/* Reviews & Related */}
        <div className="mt-20">
          <div className="flex gap-8 border-b border-border mb-8">
            <button onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm uppercase tracking-wider font-medium transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-gold text-charcoal' : 'border-transparent text-warm-gray hover:text-charcoal'}`}>
              Reviews ({productReviews.length})
            </button>
            <button onClick={() => setActiveTab('related')}
              className={`pb-3 text-sm uppercase tracking-wider font-medium transition-colors border-b-2 ${activeTab === 'related' ? 'border-gold text-charcoal' : 'border-transparent text-warm-gray hover:text-charcoal'}`}>
              You May Also Like
            </button>
          </div>

          {activeTab === 'reviews' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-center md:text-left mb-6">
                  <p className="font-display text-5xl font-light text-gold">{product.rating}</p>
                  <div className="flex justify-center md:justify-start my-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'fill-gold text-gold' : 'text-light-gray'} />
                    ))}
                  </div>
                  <p className="text-xs text-warm-gray">{product.reviewCount} reviews</p>
                </div>
                <div className="space-y-2">
                  {ratingBreakdown.map((rb) => (
                    <div key={rb.stars} className="flex items-center gap-2">
                      <span className="text-xs w-3">{rb.stars}</span>
                      <Star size={10} className="fill-gold text-gold" />
                      <div className="flex-1 h-1.5 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${rb.percentage}%` }} />
                      </div>
                      <span className="text-xs text-warm-gray w-6 text-right">{rb.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                {productReviews.length === 0 ? (
                  <p className="text-sm text-warm-gray italic">No reviews yet. Be the first to share your experience.</p>
                ) : (
                  productReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} className={s <= review.rating ? 'fill-gold text-gold' : 'text-light-gray'} />
                          ))}
                        </div>
                        <span className="text-xs text-warm-gray">·</span>
                        <span className="text-xs text-warm-gray">{review.customerName}</span>
                      </div>
                      <p className="text-sm text-warm-gray leading-relaxed">{review.text}</p>
                      {review.adminReply && (
                        <div className="mt-3 pl-4 border-l-2 border-gold/30">
                          <p className="text-xs font-medium text-gold mb-1">Lumière</p>
                          <p className="text-xs text-warm-gray">{review.adminReply}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
