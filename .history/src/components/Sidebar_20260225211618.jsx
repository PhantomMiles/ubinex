import { useState } from "react";

export default function Sidebar({ active = "products" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={() => setOpen(!open)} className="md:hidden fixed top-20 left-4 z-40 p-2 bg-green-600 text-white rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/30 md:hidden z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static left-0 top-0 w-64 h-screen bg-white border-r transition-transform duration-300 z-40 md:z-auto md:h-auto ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Admin Dashboard</h3>
            <p className="text-xs text-gray-500">Manage products and inventory</p>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <a href="#/admin/products" onClick={() => setOpen(false)} className={`block px-3 py-2 rounded ${active === 'products' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}>Products</a>
          <a href="#/admin/analytics" onClick={() => setOpen(false)} className={`block px-3 py-2 rounded ${active === 'analytics' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-100'}`}>Analytics</a>
          <a href="#/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Back to marketplace</a>
        </nav>
      </aside>
    </>
  );
}
