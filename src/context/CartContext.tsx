/* eslint-disable react-refresh/only-export-components */

// src/context/CartContext.tsx
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useCart } from "../hooks/cartFunctions";
import type { CartProps } from "../interfaces";

// Define the cart item type
export interface CartItem {
  id: string;
  name?: string;
  price?: number;
  quantity: number;
  image?: string;
  categories?: string;
}

// Define what the context will provide
interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  total: number;
  fetchCart: () => Promise<void>;
  handleIncrease: (id: string) => Promise<void>;
  handleDecrease: (id: string) => Promise<void>;
  handleDeleteAll: (id: string) => Promise<void>;
  handleQuantityChange: (id: string, newQty: string) => Promise<void>;
}

// ✅ Create the context with correct type (nullable)
const CartContext = createContext<CartContextType | null>(null);

// ✅ Combine props into ONE object
interface CartProviderProps extends CartProps {
  children: ReactNode;
}

// ✅ Provider component
export const CartProvider = ({ children, cartShow, setCartShow }: CartProviderProps) => {
  const cart = useCart(cartShow, setCartShow); // reuse your existing hook logic
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

// ✅ Safe custom hook to access cart context
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
