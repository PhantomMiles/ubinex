import { useEffect, useState } from "react";
import { agroProducts, enuguLGAs } from "../data/agroProducts";

const STORAGE_KEY = "adminProducts";

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return agroProducts.slice();
}

export default function AdminProducts() {
  const [products, setProducts] = useState(loadProducts);
  const [form, setForm] = useState({ name: "", category: "Vegetables", price: "", unit: "kg", stock: true, location: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const newProduct = { 
      ...form, 
      id, 
      price: Number(form.price) || 0,
      image: "" 
    };
    setProducts([newProduct, ...products]);
    setForm({ name: "", category: "Vegetables", price: "", unit: "kg", stock: true, location: "" });
    setShowAddForm(false);
  };

  const updateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, price: Number(editingProduct.price) } : p));
    setEditingProduct(null);
  };

  const toggleStock = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: !p.stock } : p));
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
  };

  const categories = ["Vegetables", "Fruits", "Grains", "Roots", "Oils", "Spices", "Processed", "Meat", "Fish", "Poultry"];
  const units = ["kg", "basket", "tuber", "liter", "bottle", "piece", "bag", "bird", "crate"];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Inventory Control</p>
          <h2 className="text-4xl font-black text-gray-900 leading-none uppercase tracking-tighter">My Products</h2>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className={`bg-[#0a0a0a] hover:bg-primary text-white font-black py-4 px-10 rounded-lg transition-all shadow-2xl flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] transform active:scale-95 border border-white/5 ${showAddForm ? 'bg-red-600 hover:bg-red-700' : ''}`}
        >
          <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'} text-xs`}></i>
          {showAddForm ? 'Cancel Operation' : 'Add New harvest'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={addProduct} className="bg-white p-10 rounded-xl shadow-2xl mb-16 border border-gray-100 animate-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <h3 className="text-xl font-black mb-10 text-gray-900 uppercase tracking-tighter">Enter Product Details</h3>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
               <input required placeholder="e.g. Nsukka Yellow Pepper" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
               <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner appearance-none cursor-pointer">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price (₦)</label>
               <input required type="number" placeholder="0.00" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Unit</label>
               <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner appearance-none cursor-pointer">
                  {units.map(u => <option key={u} value={u}>{u}</option>)}
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Farm LGA</label>
               <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner appearance-none cursor-pointer">
                  <option value="">Select Enugu LGA</option>
                  {enuguLGAs.map(lga => <option key={lga.name} value={`${lga.name}, Enugu`}>{lga.name}</option>)}
               </select>
            </div>
            <div className="flex items-center gap-4 mt-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
               <input type="checkbox" id="stock-cb" checked={form.stock} onChange={e => setForm({ ...form, stock: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
               <label htmlFor="stock-cb" className="text-[10px] font-black uppercase tracking-widest text-gray-700 cursor-pointer">Mark as Available</label>
            </div>
          </div>
          <div className="mt-12 flex justify-end">
             <button className="bg-primary hover:bg-[#0a0a0a] text-white font-black py-5 px-16 rounded-lg transition-all shadow-2xl text-[10px] uppercase tracking-[0.3em] transform active:scale-95">Commit harvest to Market</button>
          </div>
        </form>
      )}

      {/* Product List Table - Classy & Modern */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Produce Item</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Category</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Market Price</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Inventory Status</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition duration-300 group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                       <div className="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center text-primary group-hover:scale-110 transition duration-500 shadow-inner font-black text-2xl">
                          {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <i className="fas fa-leaf scale-90 opacity-40"></i>}
                       </div>
                       <div>
                         <div className="text-sm font-black text-gray-900 uppercase tracking-tighter mb-1">{p.name}</div>
                         <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                           <i className="fas fa-map-marker-alt text-accent"></i>
                           {p.location || 'Enugu, NG'}
                         </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-primary/5 text-primary rounded border border-primary/10">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-lg font-black text-gray-900">₦{(p.price || 0).toLocaleString()} <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest ml-1">/ {p.unit}</span></div>
                  </td>
                  <td className="px-10 py-8">
                    <button 
                      onClick={() => toggleStock(p.id)}
                      className={`flex items-center gap-3 px-5 py-2.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                        p.stock ? 'bg-primary/5 text-primary border-primary/20' : 'bg-red-50 text-red-600 border-red-100'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${p.stock ? 'bg-primary animate-pulse' : 'bg-red-600'}`}></div>
                      {p.stock ? 'Live in Market' : 'Hidden / Sold Out'}
                    </button>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                       <button onClick={() => setEditingProduct(p)} className="w-12 h-12 rounded-lg bg-white border border-gray-100 text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition shadow-sm flex items-center justify-center group/btn active:scale-90">
                          <i className="fas fa-edit text-xs"></i>
                       </button>
                       <button onClick={() => setDeletingProduct(p)} className="w-12 h-12 rounded-lg bg-white border border-gray-100 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition shadow-sm flex items-center justify-center group/btn active:scale-90">
                          <i className="fas fa-trash-alt text-xs"></i>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-40 px-10 bg-gray-50/50">
               <div className="text-8xl text-gray-100 mb-10"><i className="fas fa-leaf opacity-20"></i></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed">Your farm repository is currently empty. Please register your first harvest using the button above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
