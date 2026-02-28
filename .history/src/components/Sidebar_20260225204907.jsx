import React from "react";

export default function Sidebar({ active = "products" }) {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Admin Dashboard</h3>
        <p className="text-xs text-gray-500">Manage products and inventory</p>
      </div>
      <nav className="p-4 space-y-1">
        <a href="#/admin/products" className={`block px-3 py-2 rounded ${active === 'products' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}>Products</a>
        <a href="#/admin/analytics" className={`block px-3 py-2 rounded ${active === 'analytics' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}>Analytics</a>
        <a href="#/" className="block px-3 py-2 rounded hover:bg-gray-100">Back to marketplace</a>
      </nav>
    </aside>
  );
}
