import React, { useState } from 'react';
import { useApp } from '../context/useAppContext';
import { SUPPORTED_LANGUAGES } from '../data/translations';

export default function Navbar({ query = "", setQuery = () => { }, selectedCategory = "", setSelectedCategory = () => { } }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  
  const { user, logout, selectedLang, setSelectedLang, t } = useApp();

  // Safely extract current language string and display code
  const currentLangName = typeof selectedLang === 'object' ? selectedLang?.name : selectedLang;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.name === currentLangName) || SUPPORTED_LANGUAGES[0];

  const navigateTo = (path, category = "") => {
    window.location.hash = `/${path}`;
    if (category) {
      setSelectedCategory(category);
    }
    setActiveDropdown(null);
    setProfileOpen(false);
  };

  const menuItems = [
    { label: "Markets", labelKey: "markets", path: "markets", dropdown: [
      { text: "Vegetables", key: "vegetables" },
      { text: "Fruits", key: "fruits" },
      { text: "Grains", key: "grains" },
      { text: "Roots", key: "roots" },
      { text: "Meat", key: "meat" },
      { text: "Fish", key: "fish" },
      { text: "Poultry", key: "poultry" }
    ]},
    { label: "Wholesale", labelKey: "wholesale", path: "wholesale", dropdown: [
      { text: "Bulk Grains", key: "bulk_grains" },
      { text: "Palm Oil", key: "palm_oil" },
      { text: "Bulk Tubers", key: "bulk_tubers" },
      { text: "Sacks", key: "sacks" }
    ]},
    { label: "Farms", labelKey: "farms", path: "farms", dropdown: [
      { text: "Verified Farms", key: "verified_farms" },
      { text: "Farming Tools", key: "farming_tools" },
      { text: "Seedlings", key: "seedlings" },
      { text: "Consultancy", key: "consultancy" }
    ]},
    { label: "Logistics", labelKey: "logistics", path: "logistics", dropdown: [
      { text: "Track Order", key: "track_order" },
      { text: "Freight", key: "freight" },
      { text: "Cold Storage", key: "cold_storage" },
      { text: "Pick-up", key: "pick_up" }
    ]},
    { label: "About", labelKey: "about", path: "about", dropdown: [
      { text: "Our Story", key: "our_story" },
      { text: "Partners", key: "partners" },
      { text: "Contact Us", key: "contact_us" },
      { text: "Help Center", key: "help_center" }
    ]},
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
        <div className="max-w-7xl mx-auto flex justify-between items-center font-bold uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-green-700"></i>
              +234 814 305 4030
            </span>
            <span className="hidden lg:inline border-l border-white/10 pl-6 text-white/50">
              {t('bridging')}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="hover:text-primary transition flex items-center gap-1.5 uppercase text-[10px] font-black"
              >
                <span>{currentLangObj.code}</span>
                <span className="opacity-40">({currentLangObj.name})</span>
                <i className={`fas fa-chevron-down text-[8px] transition-transform ${langOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 max-h-64 overflow-y-auto bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-100 z-[150] no-scrollbar">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => { 
                        setSelectedLang(lang.name); 
                        setLangOpen(false); 
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] hover:bg-primary/5 hover:text-primary transition font-bold flex items-center justify-between border-b border-gray-50 ${currentLangName === lang.name ? 'bg-primary/5 text-primary' : ''}`}
                    >
                      <span className="uppercase">{lang.name}</span>
                      <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="hover:text-green-500 transition text-green-700 font-black">₦ NGN</button>
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

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative flex items-center bg-gray-50 rounded-xl border border-gray-100 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition px-6 py-3 shadow-inner">
              <i className="fas fa-search text-gray-300 mr-4"></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-600 placeholder:text-gray-300 font-bold uppercase"
              />
              <div className="h-4 w-px bg-gray-200 mx-6"></div>
              <button
                type="submit"
                className="text-[10px] font-black text-primary hover:text-green-800 transition uppercase whitespace-nowrap"
              >
                {t('search_market')}
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <button className="relative group text-gray-400 transition" onClick={() => navigateTo('orders')}>
              <i className="far fa-heart text-xl group-hover:text-primary"></i>
              <span className="absolute -top-2 -right-2 bg-green-800 text-white text-[8px] font-black w-4 h-4 rounded-md flex items-center justify-center border-2 border-white shadow-sm">0</span>
            </button>

            <button className="relative group text-gray-400 transition" onClick={() => navigateTo('cart')}>
              <i className="fas fa-shopping-basket text-xl group-hover:text-primary"></i>
              <span className="absolute -top-2 -right-2 bg-brown-800 text-white text-[8px] font-black w-4 h-4 rounded-md flex items-center justify-center border-2 border-white shadow-sm">0</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 bg-gray-50 hover:bg-white hover:shadow-xl transition p-2 pr-5 rounded-xl border border-transparent hover:border-gray-100 group ${profileOpen ? 'bg-white border-gray-100 shadow-xl' : ''}`}
              >
                <div className="w-10 h-10 rounded-lg bg-green-700 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-105 transition">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[9px] text-gray-400 font-black uppercasest leading-none mb-1">{t('account')}</p>
                  <p className="text-xs font-black text-gray-900 leading-none truncate max-w-[100px] uppercase">
                    {user?.name || user?.email?.split('@')[0] || "User"}
                  </p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-6 bg-gray-50 border-b border-gray-100">
                    <p className="font-black text-gray-900 uppercase">{user?.name || 'User'}</p>
                    <p className="text-[9px] text-gray-400 truncate mt-1 uppercasest font-black">{user?.email}</p>
                    <div className="mt-4 flex items-center gap-2 py-1.5 px-3 bg-white rounded-lg border border-gray-200 text-[8px] font-black text-primary uppercase shadow-sm w-fit">
                      {user?.role === 'farmer' ? <i className="fas fa-tractor"></i> : <i className="fas fa-shopping-cart"></i>}
                      {user?.role || 'Guest'} {t('portal')}
                    </div>
                  </div>
                  <div className="p-3">
                    <button onClick={() => navigateTo('settings')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercasest transition">{t('account_settings')}</button>
                    <button onClick={() => navigateTo('orders')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercasest transition">{t('track_orders')}</button>
                    <button onClick={() => navigateTo('cart')} className="w-full text-left px-4 py-3 hover:bg-primary/5 rounded-lg text-[9px] font-black uppercasest transition">{t('shopping_bag')}</button>
                    <div className="h-px bg-gray-100 my-2 mx-4"></div>
                    <button
                      onClick={() => {
                        logout();
                        navigateTo('home');
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-[9px] font-black uppercasest transition flex items-center gap-3"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      {t('exit_market')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
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
                  className={`py-5 text-[12px] font-black transition uppercase flex items-center gap-2 ${window.location.hash.includes(item.path) ? 'text-primary border-b-[3px] border-primary' : 'text-gray-400 hover:text-primary'
                    }`}
                >
                  {t(item.labelKey)}
                  <i className={`fas fa-chevron-down scale-[0.6]  opacity-30 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 opacity-100 text-primary' : ''}`}></i>
                </button>

                {activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border border-gray-100 rounded-b-xl py-4 z-[120] animate-in slide-in-from-top-2 duration-300">
                    {item.dropdown.map(subItem => (
                      <button
                        key={subItem.key}
                        onClick={() => {
                          if (item.path === 'markets') {
                            navigateTo('categories', subItem.text);
                          } else {
                            navigateTo(item.path);
                          }
                        }}
                        className="w-full text-left px-8 py-3 hover:bg-primary/5 text-[11px] font-black uppercase text-gray-500 hover:text-primary transition"
                      >
                        {t(subItem.key)}
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