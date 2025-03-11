import { create } from "zustand";
import {
  cartProduct,
  Product,
  Category as CategoryInter,
} from "@/components/shared/types";

interface Cart {
  cartItems: cartProduct[];
  addCartItem: (item: Product) => void;
  removeCartItem: (id: number) => void;
  setCartItems: (items: cartProduct[]) => void;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

interface Category {
  categories: CategoryInter[];
  setCategories: (categories: CategoryInter[]) => void;
  selectedCategory: string;
  categorySelected: (selected: string) => void;
}

export const useCategory = create<Category>((set) => ({
  categories: [],
  setCategories: (categories) => {
    set({ categories });
  },
  selectedCategory: "",
  categorySelected: (selected) => {
    set({ selectedCategory: selected });
  },
}));

export const useCart = create<Cart>((set) => ({
  cartItems: [],
  addCartItem: (item) =>
    set((state) => {
      const updatedCartItems = state.cartItems.some(
        (cartItem) => cartItem.id === item.id
      )
        ? state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, number: cartItem.number + 1 }
              : cartItem
          )
        : [...state.cartItems, { ...item, number: 1 }];
      return { cartItems: updatedCartItems };
    }),
  removeCartItem: (id) =>
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, number: cartItem.number - 1 }
            : cartItem
        )
        .filter((item) => item.number > 0);
      return { cartItems: updatedCartItems };
    }),
  setCartItems: (items) => {
    set({ cartItems: items });
  },
}));

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },
}));
