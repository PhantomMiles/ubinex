import React from 'react';
import { useApp } from '../context/useAppContext';

export default function Sidebar({ active, open, onClose }) {
  const { user, logout } = useApp();

  const menuItems = [
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-pie' },
    { id: 'products', label: 'My Products', icon: 'fas fa-leaf' },
    { id: 'orders', label: 'Orders', icon: 'fas fa-shopping-basket' },
    { id: 'sales', label: 'Sales History', icon: 'fas fa-history' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const navigateTo = (id) => {
    window.location.hash = `#/admin/${id}`;
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar - Black Background as requested */}
      <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-[#0a0a0a] text-white z-50 transform ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300 ease-in-out flex flex-col border-r border-white/5`}>
        {/* Branding */}
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <img src="/ubinex.png" alt="Ubinex" className="w-8 h-8 object-contain" />
          <span className="text-lg font-black tracking-tight uppercase italic text-white/90">HARVEST</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto no-scrollbar font-sans">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                    active === item.id 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} w-5 text-center text-sm`}></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-black shadow-sm">
               {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
             </div>
             <div className="flex-1 truncate">
               <p className="text-[10px] font-black uppercase tracking-widest truncate">{user?.name || user?.email?.split('@')[0] || 'User'}</p>
               <p className="text-[8px] text-white/20 truncate uppercase font-bold tracking-tighter">Farmer / Enugu State</p>
             </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 hover:bg-white/5 transition-all duration-200"
          >
            <i className="fas fa-sign-out-alt"></i>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
