import { useEffect, useState } from "react";
import { agroProducts } from "../data/agroProducts";

const STORAGE_KEY = "adminProducts";

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // JSON parse error, fall back to defaults
  }
  return agroProducts.slice();
}

export default function AdminProducts() {
  const [products, setProducts] = useState(loadProducts);
  const [form, setForm] = useState({ name: "", category: "", price: "", unit: "", stock: true, location: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    setProducts([{ id, ...form }, ...products]);
    setForm({ name: "", category: "", price: "", unit: "", stock: true, location: "" });
  };

  const toggleStock = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: !p.stock } : p));
  };

  const remove = (id) => setProducts(products.filter(p => p.id !== id));

  return (
    <div className="p-4" style={{ backgroundColor: '#f0ffe8' }}>
      <h2 className="text-xl font-bold mb-3" style={{ color: '#2d5016' }}>Your Products</h2>

      <form onSubmit={addProduct} className="bg-white p-4 rounded shadow mb-4 grid gap-2 sm:grid-cols-2" style={{ border: '1px solid #2d5016' }}>
        <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" style={{ borderColor: '#2d5016' }} />
        <input required placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border p-2 rounded" style={{ borderColor: '#2d5016' }} />
        <input required placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2 rounded" style={{ borderColor: '#2d5016' }} />
        <input required placeholder="Unit (e.g. kg)" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="border p-2 rounded" style={{ borderColor: '#2d5016' }} />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="border p-2 rounded" style={{ borderColor: '#2d5016' }} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} /> In stock</label>
        <div className="sm:col-span-2">
          <button className="text-white px-4 py-2 rounded" style={{ backgroundColor: '#2d5016' }}>Add product</button>
        </div>
      </form>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded shadow flex items-center justify-between" style={{ border: '1px solid #2d5016' }}>
            <div>
              <div className="font-semibold" style={{ color: '#2d5016' }}>{p.name}</div>
              <div className="text-sm" style={{ color: '#666' }}>{p.category} • {p.location || '—'}</div>
              <div className="text-sm" style={{ color: '#333' }}>{p.price} / {p.unit}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleStock(p.id)} className={`px-3 py-1 rounded ${p.stock ? 'text-green-700' : ''}`} style={p.stock ? { backgroundColor: '#f0ffe8', border: '1px solid #2d5016' } : { backgroundColor: '#f8f8f8' }}>
                {p.stock ? 'In stock' : 'Out of stock'}
              </button>
              <button onClick={() => remove(p.id)} className="px-3 py-1 rounded text-red-700" style={{ backgroundColor: '#fdecea' }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
