import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '@/types';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        if (!get().items.find((i) => i.productId === productId)) {
          set({
            items: [
              ...get().items,
              { productId, addedAt: new Date().toISOString() },
            ],
          });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((i) => i.productId !== productId),
        });
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'lumiere-wishlist' }
  )
);
