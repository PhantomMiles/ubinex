import { useApp } from "../context/useAppContext";

export default function Sidebar({ active = "products", open = false, onClose = () => {} }) {
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/30 md:hidden z-30" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`fixed md:static left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-40 md:z-auto flex flex-col ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Farmer Dashboard</h3>
            <p className="text-xs text-gray-500">Manage your products</p>
          </div>
          <button onClick={onClose} className="md:hidden p-1 hover:bg-gray-100 rounded transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: "#8B5A3C" }}>
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || user?.email}</p>
              <p className="text-xs text-gray-500">👨‍🌾 Farmer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <a 
            href="#/admin/products" 
            onClick={onClose} 
            className={`block px-3 py-2 rounded-lg transition-colors ${
              active === 'products' 
                ? 'text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={active === 'products' ? { backgroundColor: "#2d5016" } : {}}
          >
            📦 Products
          </a>
          <a 
            href="#/admin/analytics" 
            onClick={onClose} 
            className={`block px-3 py-2 rounded-lg transition-colors ${
              active === 'analytics' 
                ? 'text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={active === 'analytics' ? { backgroundColor: "#2d5016" } : {}}
          >
            📊 Analytics
          </a>
          <a 
            href="#/admin/sales" 
            onClick={onClose} 
            className={`block px-3 py-2 rounded-lg transition-colors ${
              active === 'sales' 
                ? 'text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={active === 'sales' ? { backgroundColor: "#2d5016" } : {}}
          >
            💰 Sales
          </a>
          <a 
            href="#/admin/orders" 
            onClick={onClose} 
            className={`block px-3 py-2 rounded-lg transition-colors ${
              active === 'orders' 
                ? 'text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={active === 'orders' ? { backgroundColor: "#2d5016" } : {}}
          >
            📋 Orders
          </a>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <a 
            href="#/" 
            onClick={onClose} 
            className="block w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm text-center font-medium"
          >
            ← Marketplace
          </a>
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: "#d32f2f" }}
          >
            🚪 Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
