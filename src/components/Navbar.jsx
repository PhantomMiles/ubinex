import React, { useState } from 'react';
import { useApp } from '../context/useAppContext';

export default function Navbar({ query = "", setQuery = () => {}, selectedCategory = "", setSelectedCategory = () => {} }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout } = useApp();

  const navigateTo = (path, category = "") => {
    window.location.hash = `/${path}`;
    if (category) {
      setSelectedCategory(category);
    }
    setActiveDropdown(null);
    setProfileOpen(false);
  };

  const menuItems = [
    { label: "Markets", path: "markets", dropdown: ["Vegetables", "Fruits", "Grains", "Roots", "Meat", "Fish", "Poultry"] },
    { label: "Wholesale", path: "wholesale", dropdown: ["Bulk Grains", "Palm Oil", "Bulk Tubers", "Sacks"] },
    { label: "Farms", path: "farms", dropdown: ["Verified Farms", "Farming Tools", "Seedlings", "Consultancy"] },
    { label: "Logistics", path: "logistics", dropdown: ["Track Order", "Freight", "Cold Storage", "Pick-up"] },
    { label: "About", path: "about", dropdown: ["Our Story", "Partners", "Contact Us", "Help Center"] },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigateTo('categories');
    }
  };

  return (
    <header className="w-full bg-white font-sans border-b border-gray-100 z-[100] relative">
      {/* Top Bar */}
      <div className="bg-[#0a0a0a] text-white text-[10px] py-3 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-black tracking-[0.2em] uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-primary"></i>
              +234 814 305 4030
            </span>
            <span className="hidden lg:inline border-l border-white/10 pl-6 text-white/50">
              Bridging Nigerian <span className="text-white">Farms & Consumers</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-primary transition lowercase">En</button>
            <button className="hover:text-primary transition text-primary">₦ NGN</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-12">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <img src="/logo.png" alt="Ubinex" className="w-32 h-12 object-contain group-hover:scale-110 transition duration-500" />
          </div>

          {/* Search Bar - Active */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative flex items-center bg-gray-50 rounded-xl border border-gray-100 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition px-6 py-3 shadow-inner">
              <i className="fas fa-search text-gray-300 mr-4"></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Nsukka Pepper, Yams, Palm Oil..."
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-600 placeholder:text-gray-300 font-bold uppercase tracking-tight"
              />
              <div className="h-4 w-px bg-gray-200 mx-6"></div>
              <button 
                type="submit" 
                className="text-[10px] font-black text-primary hover:text-green-800 transition tracking-[0.2em] uppercase whitespace-nowrap"
              >
                Search Market
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <button className="relative group text-gray-400 transition" onClick={() => navigateTo('orders')}>
              <i className="far fa-heart text-xl group-hover:text-primary"></i>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-md flex items-center justify-center border-2 border-white shadow-sm">0</span>
            </button>
            
            <button className="relative group text-gray-400 transition" onClick={() => navigateTo('cart')}>
              <i className="fas fa-shopping-basket text-xl group-hover:text-primary"></i>
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-md flex items-center justify-center border-2 border-white shadow-sm">0</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 bg-gray-50 hover:bg-white hover:shadow-xl transition p-2 pr-5 rounded-xl border border-transparent hover:border-gray-100 group ${profileOpen ? 'bg-white border-gray-100 shadow-xl' : ''}`}
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-105 transition">
                  {user?.name?.charAt(0) || user?.email?.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Account</p>
                  <p className="text-xs font-black text-gray-900 leading-none truncate max-w-[100px] uppercase tracking-tighter">
                    {user?.name || user?.email?.split('@')[0]}
                  </p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-6 bg-gray-50 border-b border-gray-100">
                    <p className="font-black text-gray-900 uppercase tracking-tighter">{user?.name || 'User'}</p>
                    <p className="text-[9px] text-gray-400 truncate mt-1 uppercase tracking-widest font-black">{user?.email}</p>
                    <div className="mt-4 flex items-center gap-2 py-1.5 px-3 bg-white rounded-lg border border-gray-200 text-[8px] font-black text-primary uppercase tracking-[0.2em] shadow-sm w-fit">
                      {user?.role === 'farmer' ? <i className="fas fa-tractor"></i> : <i className="fas fa-shopping-cart"></i>}
                      {user?.role} Portal
                    </div>
                  </div>
                  <div className="p-3">
                    <button onClick={() => navigateTo('settings')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercase tracking-widest transition">Account Settings</button>
                    <button onClick={() => navigateTo('orders')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercase tracking-widest transition">Track Orders</button>
                    <button onClick={() => navigateTo('cart')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercase tracking-widest transition">Shopping Bag</button>
                    <div className="h-px bg-gray-100 my-2 mx-4"></div>
                    <button
                      onClick={() => {
                        logout();
                        navigateTo('home');
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-[9px] font-black uppercase tracking-widest transition flex items-center gap-3"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Exit Market
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu with Dropdowns */}
      <nav className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center">
            {menuItems.map((item) => (
              <li 
                key={item.label} 
                className="relative group mr-10"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => navigateTo(item.path)}
                  className={`py-5 text-[10px] font-black transition tracking-[0.3em] uppercase flex items-center gap-2 ${
                    window.location.hash.includes(item.path) ? 'text-primary border-b-[3px] border-primary' : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {item.label}
                  <i className={`fas fa-chevron-down scale-[0.6] opacity-30 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 opacity-100 text-primary' : ''}`}></i>
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === item.label && (
                   <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border border-gray-100 rounded-b-xl py-4 z-[120] animate-in slide-in-from-top-2 duration-300">
                      {item.dropdown.map(subItem => (
                        <button 
                          key={subItem}
                          onClick={() => {
                            if (item.path === 'markets') {
                              navigateTo('categories', subItem);
                            } else {
                              navigateTo(item.path);
                            }
                          }}
                          className="w-full text-left px-8 py-3 hover:bg-primary/5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition"
                        >
                          {subItem}
                        </button>
                      ))}
                   </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
