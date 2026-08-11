import React, { useEffect, useState } from 'react';
import { useApp } from '../context/useAppContext';

export default function MobileNav() {
  const { cart, user } = useApp();
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const cartCount = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  
  const ordersCount = (() => {
    try {
      const stored = localStorage.getItem('UBX_ORDERS');
      if (stored) return JSON.parse(stored).length;
    } catch {}
    return user ? 2 : 0;
  })();

  const navItems = [
    { id: 'home', path: '#/home', label: 'Home', icon: 'fas fa-home' },
    { id: 'markets', path: '#/markets', label: 'Markets', icon: 'fas fa-store' },
    { id: 'orders', path: '#/orders', label: 'Orders', icon: 'far fa-heart', badge: ordersCount },
    { id: 'cart', path: '#/cart', label: 'Cart', icon: 'fas fa-shopping-basket', badge: cartCount },
    { id: 'profile', path: '#/settings', label: 'Profile', icon: 'fas fa-user' },
  ];

  return (
    <nav 
      className="sm:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 z-[100] px-2 pt-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      {navItems.map((item) => {
        const isActive = currentHash.includes(item.path.replace('#/', ''));
        return (
          <a
            key={item.id}
            href={item.path}
            className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 ${
              isActive ? 'text-primary scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative mb-1">
              <i className={`${item.icon} text-lg`}></i>
              {item.badge > 0 && (
                <span className={`absolute -top-2 -right-2 text-white text-[8px] font-black w-4 h-4 rounded-md flex items-center justify-center border border-white shadow-sm ${item.id === 'orders' ? 'bg-green-800' : 'bg-primary'}`}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tight">
              {item.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
            )}
          </a>
        );
      })}
    </nav>
  );
}
