import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  onSale?: boolean;
  salePrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  compare: Product[];
  isCartOpen: boolean;
  searchQuery: string;
  isDark: boolean;
  selectedCategory: string;
  sortBy: string;
  priceRange: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (range: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  toggleCompare: (product: Product) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      isCartOpen: false,
      searchQuery: "",
      isDark: false,
      selectedCategory: "All",
      sortBy: "featured",
      priceRange: "all",
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setPriceRange: (range) => set({ priceRange: range }),
      toggleTheme: () =>
        set((state) => {
          const newDark = !state.isDark;
          if (newDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDark: newDark };
        }),
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) =>
                  item.id === id ? { ...item, quantity } : item,
                ),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          };
        }),
      isInWishlist: (id) => get().wishlist.some((p) => p.id === id),
      toggleCompare: (product) =>
        set((state) => {
          const exists = state.compare.some((p) => p.id === product.id);
          if (exists) {
            return {
              compare: state.compare.filter((p) => p.id !== product.id),
            };
          }
          if (state.compare.length >= 4) return state;
          return { compare: [...state.compare, product] };
        }),
      isInCompare: (id) => get().compare.some((p) => p.id === id),
      clearCompare: () => set({ compare: [] }),
    }),
    {
      name: "ceramic-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        compare: state.compare,
        isDark: state.isDark,
      }),
    },
  ),
);

// Apply dark mode on initial load from persisted state
const { isDark } = useStore.getState();
if (isDark) {
  document.documentElement.classList.add("dark");
}
