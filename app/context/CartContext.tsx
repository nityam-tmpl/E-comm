
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
  color: string;
  size: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (
  product: Product,
  color: string,
  size: string,
  quantity?: number
) => void;
  increaseQuantity: (id: number, color: string, size: string) => void;
  decreaseQuantity: (id: number, color: string, size: string) => void;
  removeFromCart: (id: number, color: string, size: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopco-cart");

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      localStorage.removeItem("shopco-cart");
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("shopco-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  function addToCart(
  product: Product,
  color: string,
  size: string,
  quantity: number = 1
) {
  setCartItems((items) => {
    const existing = items.find(
      (item) =>
        item.product.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existing) {
      return items.map((item) =>
        item.product.id === product.id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [...items, { product, quantity, color, size }];
  });
}

  function increaseQuantity(id: number, color: string, size: string) {
    setCartItems((items) => {
      const updated = items.map((item) =>
        item.product.id === id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return updated;
    });
  }

  function decreaseQuantity(id: number, color: string, size: string) {
    setCartItems((items) => {
      const updated = items
        .map((item) =>
          item.product.id === id &&
          item.color === color &&
          item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return updated;
    });
  }

  function removeFromCart(id: number, color: string, size: string) {
    setCartItems((items) => {
      const updated = items.filter(
        (item) =>
          !(
            item.product.id === id &&
            item.color === color &&
            item.size === size
          )
      );

      return updated;
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
