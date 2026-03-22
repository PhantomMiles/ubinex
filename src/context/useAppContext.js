import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const CURRENCIES = {
  NG: { name: "Nigeria", symbol: "₦", rate: 1 },
  GH: { name: "Ghana", symbol: "GHS", rate: 0.4 },
  KE: { name: "Kenya", symbol: "KES", rate: 0.019 },
  TZ: { name: "Tanzania", symbol: "TZS", rate: 0.00042 },
  ET: { name: "Ethiopia", symbol: "ETB", rate: 0.018 },
};

const DB_KEY = "UBINEX_DATABASE";
const CART_KEY = "UBINEX_CART";

function getDB() {
  const db = localStorage.getItem(DB_KEY);
  return db ? JSON.parse(db) : { users: [] };
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState("NG");
  const [db, setDb] = useState(getDB);

  // Cart state persisted
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // auth state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ubinex_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const register = (userData) => {
    const currentDB = getDB();
    if (currentDB.users.find(u => u.email === userData.email)) {
      throw new Error("User already exists");
    }
    const newUser = { ...userData, id: Date.now().toString() };
    currentDB.users.push(newUser);
    saveDB(currentDB);
    setDb(currentDB);
    return newUser;
  };

  const login = (email, password) => {
    const currentDB = getDB();
    const userMatch = currentDB.users.find(u => u.email === email && u.password === password);
    if (!userMatch) {
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userSafe } = userMatch;
    setUser(userSafe);
    localStorage.setItem('ubinex_user', JSON.stringify(userSafe));
    return userSafe;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ubinex_user');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return React.createElement(
    AppContext.Provider,
    { value: { 
      currency, setCurrency, currencies: CURRENCIES, 
      user, login, register, logout, 
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      db 
    } },
    children
  );
}
