import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/useAppContext";

export default function Cart() {
  const [query, setQuery] = useState("");
  const { currencies, currency, cart, removeFromCart, updateCartQuantity } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05); // 5% VAT
  };

  const calculateShipping = () => {
    return cart.length > 0 ? 2000 : 0; // Local delivery fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout via Paystack...\nTotal: " + symbol + " " + calculateTotal().toLocaleString());
  };

  const navigateTo = (path) => {
    window.location.hash = `/${path}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-3">Shop / Checkout</p>
          <h1 className="text-5xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">
            Shopping Bag
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Cart Items List */}
            <div className="flex-1 space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="group flex flex-col sm:flex-row gap-8 pb-8 border-b border-gray-100 last:border-0">
                  <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative shadow-inner">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-500"></div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1 font-sans">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline transform active:scale-95"
                        >
                          Delete Item
                        </button>
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2 italic">
                        <i className="fas fa-leaf text-primary"></i> {item.category}
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 italic">
                        <i className="fas fa-map-marker-alt text-accent"></i> {item.location || 'Enugu, Nigeria'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shadow-inner">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary transition active:scale-75"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary transition active:scale-75"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Subtotal Value</p>
                        <p className="text-xl font-black text-primary italic leading-none">{symbol}{(item.quantity * item.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => navigateTo('categories')}
                className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-primary transition flex items-center gap-3 italic mt-12 bg-gray-50 px-6 py-3 rounded-lg border border-gray-100"
              >
                <i className="fas fa-arrow-left"></i>
                Continue Exploring Markets
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="w-full lg:w-96">
              <div className="bg-[#0a0a0a] text-white p-10 rounded-xl shadow-2xl relative overflow-hidden lg:sticky lg:top-32 border border-white/5">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 leading-none">Order Checklist</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Subtotal</span>
                    <span className="text-sm font-black italic">{symbol}{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Delivery (Logistics)</span>
                    <span className="text-sm font-black italic">{symbol}{calculateShipping().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">VAT (5%)</span>
                    <span className="text-sm font-black italic">{symbol}{calculateTax().toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 mb-10">
                  <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 italic">Total Due</p>
                       <p className="text-4xl font-black italic text-primary leading-none">{symbol}{calculateTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-white hover:text-primary text-white py-5 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all duration-500 italic active:scale-95"
                >
                  Pay Securely Now
                </button>

                <div className="mt-12 pt-10 border-t border-white/5 space-y-4 font-sans">
                   <div className="flex items-center gap-4 text-[8px] font-bold text-white/30 uppercase tracking-widest italic">
                      <i className="fas fa-shield-alt text-primary opacity-50"></i>
                      Secured by Paystack Encryption
                   </div>
                   <div className="flex items-center gap-4 text-[8px] font-bold text-white/30 uppercase tracking-widest italic">
                      <i className="fas fa-map-marker-alt text-primary opacity-50"></i>
                      Enugu Logistics Network Active
                   </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="py-40 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 mt-12 font-sans relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
             <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center text-gray-100 text-4xl mb-10 mx-auto border border-gray-50">
                   <i className="fas fa-shopping-basket opacity-20"></i>
                </div>
                <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Your basket is empty</h2>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-12 italic">Fresh farm harvests are waiting for you in the markets</p>
                <button 
                  onClick={() => navigateTo('categories')}
                  className="bg-[#0a0a0a] text-white px-16 py-5 rounded-lg text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-primary transition-all duration-500 italic active:scale-95 transform"
                >
                  View Today's Harvests
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
