import React from "react";
import Navbar from "../components/Navbar";

const wholesaleOffers = [
  { name: "Abakaliki Rice (50kg Bag)", price: 45000, category: "Grains", image: "https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=400&h=400" },
  { name: "Palm Oil (25L Jerrycan)", price: 28000, category: "Oils", image: "https://images.unsplash.com/photo-1621460245137-024240536417?q=80&w=400&h=400" },
  { name: "Yam Tubers (Large Barn)", price: 85000, category: "Roots", image: "https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg" },
  { name: "Onions (Full Sack)", price: 32000, category: "Vegetables", image: "https://images.unsplash.com/photo-1580196782182-c43789594de5?q=80&w=400&h=400" },
];

export default function Wholesale() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Bulk Procurement</p>
            <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-4">
              Wholesale Market
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-lg">
              Unlock maximum value with bulk purchases directly from regional consolidation centers.
            </p>
          </div>
          <button className="bg-[#0a0a0a] text-white px-12 py-5 rounded-lg text-[10px] font-black uppercase tracking-widest italic hover:bg-primary transition shadow-2xl">Download Price List</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wholesaleOffers.map((offer) => (
            <div key={offer.name} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-500">
              <div className="h-48 overflow-hidden">
                <img src={offer.image} alt={offer.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="p-8">
                <span className="text-[8px] font-black uppercase tracking-widest text-primary mb-2 block">{offer.category}</span>
                <h3 className="text-lg font-black italic uppercase tracking-tighter text-gray-900 mb-6">{offer.name}</h3>
                <div className="flex justify-between items-end pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Bulk Price</p>
                    <p className="text-xl font-black text-gray-900 italic">₦{offer.price.toLocaleString()}</p>
                  </div>
                  <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-[#0a0a0a] transition"><i className="fas fa-cart-plus text-xs"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-20 p-12 bg-primary/5 rounded-xl border border-primary/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 mb-6">Partner With Us for Logistics</h2>
              <p className="text-xs text-gray-600 font-bold leading-relaxed uppercase tracking-widest mb-8 italic">
                We offer specialized transportation for wholesale orders across the South East. Temperature controlled vehicles are available for perishable items.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary pb-1">Request Quote</button>
           </div>
        </section>
      </main>
    </div>
  );
}
