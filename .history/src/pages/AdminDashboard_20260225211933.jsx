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
        <header className="bg-white p-4 border-b flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="md:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>
        <main className="p-4">
          {route === 'products' && <AdminProducts />}
          {route !== 'products' && <div className="p-4 bg-white rounded shadow">Coming soon</div>}
        </main>
      </div>
    </div>
  );
}
