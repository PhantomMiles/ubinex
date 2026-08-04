import React from 'react';

export default function BottomNav({ active }) {
  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'orders', label: 'Orders', icon: 'fas fa-table-list' },
    { id: 'sales', label: 'Sales', icon: 'fas fa-history' },
    { id: 'messages', label: 'Messages', icon: 'far fa-comment-dots' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-user-gear' },
  ];

  const handleNavigate = (id) => {
    window.location.hash = `#/admin/${id}`;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50 px-4 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
              isActive ? 'text-primary scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              <i className={`${item.icon} text-lg mb-0.5`}></i>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}