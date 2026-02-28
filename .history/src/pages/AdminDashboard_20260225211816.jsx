import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminProducts from "./AdminProducts";

export default function AdminDashboard() {
  const [route, setRoute] = useState('products');

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
    <div className="min-h-screen bg-gray-50">
      <Sidebar active={route} />
      <div className="md:ml-0">
        <header className="bg-white p-4 border-b">
          <h1 className="font-semibold">{route === 'products' ? 'Products' : route}</h1>
        </header>
        <main className="p-4">
          {route === 'products' && <AdminProducts />}
          {route !== 'products' && <div className="p-4 bg-white rounded shadow">Coming soon</div>}
        </main>
      </div>
    </div>
  );
}
