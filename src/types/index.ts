export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  images: string[];
  primaryImage: string;
  originalPrice: number;
  salePrice: number | null;
  costPrice: number;
  metalType: MetalType[];
  stoneType: StoneType;
  ringSizes: string[];
  variants: ProductVariant[];
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  isFeatured: boolean;
  isNewArrival: boolean;
  availability: 'in-stock' | 'made-to-order';
  careInstructions: string;
  materialDetails: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  metalType: MetalType;
  ringSize?: string;
  stock: number;
  priceAdjustment: number;
}

export type MetalType = 'gold-18k' | 'silver-925' | 'platinum' | 'rose-gold';
export type StoneType = 'diamond' | 'ruby' | 'sapphire' | 'emerald' | 'pearl' | 'no-stone';
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  coverImage: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  metalType: MetalType;
  ringSize?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  couponCode: string | null;
  trackingNumber: string | null;
  notes: string;
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  metalType: MetalType;
  ringSize?: string;
  quantity: number;
  price: number;
}

export interface OrderTimelineEntry {
  status: string;
  timestamp: string;
  note?: string;
}

export type ShippingMethod = 'standard' | 'express' | 'same-day';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';
export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string | null;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  notes: string;
  joinDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  usageLimit: number;
  perCustomerLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  applicableCategories: string[];
  applicableProducts: string[];
  firstOrderOnly: boolean;
  isActive: boolean;
  revenue: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  adminReply: string | null;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  timezone: string;
  contactEmail: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    pinterest: string;
    twitter: string;
  };
  footerText: string;
  freeShippingThreshold: number;
  gstRate: number;
  enabledPaymentMethods: PaymentMethod[];
}

export interface GiftCard {
  id: string;
  amount: number;
  recipientEmail: string;
  senderName: string;
  message: string;
  code: string;
  isRedeemed: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}
