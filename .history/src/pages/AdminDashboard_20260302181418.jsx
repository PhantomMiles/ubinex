import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminProducts from "./AdminProducts";

export default function AdminDashboard() {
  const [route, setRoute] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const h = (window.location.hash || '#/admin').replace('#/admin', '').replace('#/', '').replace('/', '') || 'products';
      setRoute(h || 'products');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar active={route} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 py-4 flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="text-2xl text-green-600"><i className="fas fa-seedling"></i></div>
              <div>
                <h1 className="font-semibold text-gray-900">Ubinex Farmer Dashboard</h1>
                <p className="text-xs text-gray-500">Manage your agricultural products and sales</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {route === 'products' && <AdminProducts />}
          {route === 'analytics' && (
            <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4"><i className="fas fa-chart-bar mr-2 text-green-600"></i>Sales Analytics</h2>
              <p className="text-gray-600">Coming soon</p>
            </div>
          )}
          {route === 'sales' && (
            <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4"><i className="fas fa-dollar-sign mr-2 text-green-600"></i>Sales Overview</h2>
              <p className="text-gray-600">Coming soon</p>
            </div>
          )}
          {route === 'orders' && (
            <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4"><i className="fas fa-clipboard-list mr-2 text-green-600"></i>Your Orders</h2>
              <p className="text-gray-600">Coming soon</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
