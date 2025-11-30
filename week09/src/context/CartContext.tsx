import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  totalCount: number;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (id: number) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (!exists) return [...prev, { id, quantity: 1 }];
      return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (!exists) return prev;
      if (exists.quantity === 1) return prev.filter((p) => p.id !== id);

      return prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p));
    });
  };

  const clear = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <CartContext.Provider value={{ cart, addItem, removeItem, clear, totalCount }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext)!;
