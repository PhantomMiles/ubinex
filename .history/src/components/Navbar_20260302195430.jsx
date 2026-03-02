import React, { useState } from 'react';
import { useApp } from '../context/useAppContext';
import logoImg from '../assets/logo.png';

export default function Navbar({ query = "", setQuery = () => {}, selectedCategory = "", setSelectedCategory = () => {} }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useApp();

  const navigateTo = (path) => {
    window.location.hash = path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by parent component via setQuery
  };

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Poultry",
    "Herbs",
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-full mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 max-w-lg h-10">
         <img src={logoImg} alt="Ubinex Logo" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 max-w-xl hidden sm:block">
          <form className="relative block" onSubmit={handleSearch}>
            <span className="sr-only">Search products</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, farms or categories"
              className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2d5016] transition"
            />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 text-white rounded-full px-3 py-1 text-sm transition flex items-center gap-1" style={{ backgroundColor: "#2d5016" }}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          {user?.role !== 'farmer' && (
            <>
              <button 
                onClick={() => navigateTo('/categories')}
                className="px-3 space-x-2 py-2 rounded-md hover:bg-gray-100 hidden sm:inline text-sm text-gray-700 transition flex items-center gap-1"
                title="Browse all categories"
              >
                <i className="fas fa-th-large"></i>
                <span>Categories</span>
              </button>
              <button 
                onClick={() => navigateTo('/orders')}
                className="px-3 space-x-2 py-2 rounded-md hover:bg-gray-100 hidden sm:inline text-sm text-gray-700 transition flex items-center gap-1"
                title="View your orders"
              >
                <i className="fas fa-list-ul"></i>
                <span>Orders</span>
              </button>
              <button 
                onClick={() => navigateTo('/cart')}
                className="text-white px-3 space-x-2 py-2 rounded-md flex items-center gap-2 hidden sm:inline text-sm transition hover:shadow-md" 
                style={{ backgroundColor: "#2d5016" }}
                title="View shopping cart"
              > 
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
                <span className="bg-white text-gray-900 font-semibold text-xs rounded-full px-2">0</span>
              </button>
            </>
          )}

          {/* User Profile Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <span className="text-sm font-medium text-gray-700">{user?.name || user?.email?.split('@')[0]}</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: "#8B5A3C" }}>
                {user?.name?.charAt(0) || user?.email?.charAt(0)}
              </div>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#2d5016" }}>
                    {user?.role === 'farmer' ? (
                      <><i className="fas fa-tractor"></i> Farmer Account</>
                    ) : (
                      <><i className="fas fa-shopping-cart"></i> Consumer Account</>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-medium transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="sm:hidden p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="px-4 py-3 space-y-2">
            <button 
              onClick={() => {
                navigateTo('/categories');
                setOpen(false);
              }} 
              className="w-full block text-left text-sm text-gray-700 hover:text-gray-900 py-2 transition flex items-center gap-2"
            >
              <i className="fas fa-th-large"></i>
              <span>Categories</span>
            </button>
            <button 
              onClick={() => {
                navigateTo('/orders');
                setOpen(false);
              }} 
              className="w-full block text-left text-sm text-gray-700 hover:text-gray-900 py-2 transition flex items-center gap-2"
            >
              <i className="fas fa-list-ul"></i>
              <span>Orders</span>
            </button>
            <button 
              onClick={() => {
                navigateTo('/cart');
                setOpen(false);
              }} 
              className="w-full block text-left text-sm text-gray-700 hover:text-gray-900 py-2 transition flex items-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Cart</span>
            </button>
            <label className="block mt-2">
              <input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search" className="w-full border border-gray-300 p-2 rounded text-sm" />
            </label>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-red-600 text-sm font-medium py-2 hover:bg-red-50 rounded transition mt-4 flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      <nav className="bg-green-50 border-t border-green-100" style={{ backgroundColor: "#f0ffe8" }}>
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-3 overflow-x-auto">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => {
                navigateTo('/categories');
                setSelectedCategory(c === "All" ? "" : c);
              }}
              className={`text-sm px-3 py-1.5 rounded-full whitespace-nowrap transition ${ 
                (selectedCategory === "" && c === "All") || selectedCategory === c
                  ? "text-white font-semibold shadow-md"
                  : "bg-white shadow-sm hover:shadow-md text-gray-700"
              }`}
              style={
                (selectedCategory === "" && c === "All") || selectedCategory === c
                  ? { backgroundColor: "#2d5016" }
                  : {}
              }
            >
              {c}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}