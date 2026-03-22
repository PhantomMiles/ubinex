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

function generateFarmerID() {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `UBX-F-${random}`;
}

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

  // Negotiations / Messages state
  const [negotiations, setNegotiations] = useState(() => {
    const stored = localStorage.getItem('UBX_NEGOTIATIONS');
    return stored ? JSON.parse(stored) : [
      { id: '1', productId: 'p1', buyerName: 'Obinna K.', lastMessage: 'Is the price negotiable for 10 bags?', status: 'active', timestamp: Date.now() - 100000 },
      { id: '2', productId: 'p2', buyerName: 'Amaka J.', lastMessage: 'I need delivery to 9th Mile.', status: 'pending', timestamp: Date.now() - 500000 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('UBX_NEGOTIATIONS', JSON.stringify(negotiations));
  }, [negotiations]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const register = (userData) => {
    const currentDB = getDB();
    if (currentDB.users.find(u => u.email === userData.email)) {
      throw new Error("User already exists");
    }
    const newUser = { 
      ...userData, 
      id: Date.now().toString(),
      ubxId: userData.role === 'farmer' ? generateFarmerID() : null,
      phone: userData.phone || "",
      dob: userData.dob || ""
    };
    currentDB.users.push(newUser);
    saveDB(currentDB);
    setDb(currentDB);
    return newUser;
  };

  const updateUser = (updates) => {
    const currentDB = getDB();
    const updatedUsers = currentDB.users.map(u => 
      u.email === user.email ? { ...u, ...updates } : u
    );
    const updatedUser = { ...user, ...updates };
    
    currentDB.users = updatedUsers;
    saveDB(currentDB);
    setDb(currentDB);
    setUser(updatedUser);
    localStorage.setItem('ubinex_user', JSON.stringify(updatedUser));
  };

  const login = (email, password) => {
    const currentDB = getDB();
    const userMatch = currentDB.users.find(u => u.email === email && u.password === password);
    if (!userMatch) {
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userSafe } = userMatch;
    setUser(userSafe);
    
    // Simulate secure session token
    const mockToken = btoa(JSON.stringify({ id: userSafe.id, exp: Date.now() + 86400000 }));
    sessionStorage.setItem('UBX_SECURE_TOKEN', mockToken);
    
    localStorage.setItem('ubinex_user', JSON.stringify(userSafe));
    return userSafe;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ubinex_user');
    sessionStorage.removeItem('UBX_SECURE_TOKEN');
  };

  const deleteUserAccount = () => {
    const currentDB = getDB();
    const filteredUsers = currentDB.users.filter(u => u.email !== user.email);
    currentDB.users = filteredUsers;
    saveDB(currentDB);
    setDb(currentDB);
    logout();
  };

  const addNegotiation = (neg) => {
    setNegotiations(prev => [{ ...neg, id: Date.now().toString(), timestamp: Date.now() }, ...prev]);
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
      user, login, register, logout, updateUser, deleteUserAccount,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      negotiations, addNegotiation,
      db 
    } },
    children
  );
}
