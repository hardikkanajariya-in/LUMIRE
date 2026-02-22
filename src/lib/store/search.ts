import { create } from 'zustand';

interface SearchStore {
  query: string;
  isOpen: boolean;
  setQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  isOpen: false,
  setQuery: (query) => set({ query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  toggleSearch: () => set({ isOpen: !get().isOpen }),
}));
