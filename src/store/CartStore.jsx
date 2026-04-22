import { useReducer, createContext, useContext } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// Context để share cart xuống toàn app không cần prop drilling
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook tiện dụng dùng trong mọi component
export function useCart() {
  return useContext(CartContext);
}