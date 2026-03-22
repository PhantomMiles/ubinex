import React from "react";
import Navbar from "../components/Navbar";

const wholesaleOffers = [
  { name: "Abakaliki Rice (50kg Bag)", price: 45000, category: "Bulk Grains", image: "https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=400&h=400" },
  { name: "Palm Oil (25L Jerrycan)", price: 28000, category: "Palm Oil", image: "https://images.unsplash.com/photo-1621460245137-024240536417?q=80&w=400&h=400" },
  { name: "Yam Tubers (Large Barn)", price: 85000, category: "Bulk Tubers", image: "https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg" },
  { name: "White Onions (Full Sack)", price: 32000, category: "Sacks", image: "https://images.unsplash.com/photo-1580196782182-c43789594de5?q=80&w=400&h=400" },
  { name: "Yellow Corn (100kg Bag)", price: 38000, category: "Bulk Grains", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&h=400" },
  { name: "Dried Pepper (Large Sack)", price: 15000, category: "Sacks", image: "https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg" },
];

export default function Wholesale() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Bulk Procurement</p>
            <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
              Wholesale Market
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-lg leading-relaxed">
              Unlock maximum value with bulk purchases directly from regional consolidation centers in Enugu and beyond.
            </p>
          </div>
          <button className="bg-[#0a0a0a] text-white px-12 py-5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary transition shadow-2xl border border-white/5 active:scale-95">Download Price List</button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
           {["All Bulk", "Bulk Grains", "Palm Oil", "Bulk Tubers", "Sacks"].map(cat => (
             <button key={cat} className="px-6 py-3 rounded-lg bg-gray-50 border border-gray-100 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition whitespace-nowrap">
               {cat}
             </button>
           ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {wholesaleOffers.map((offer) => (
            <div key={offer.name} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-500 relative">
              <div className="h-56 overflow-hidden">
                <img src={offer.image} alt={offer.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
                   {offer.category}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-8">{offer.name}</h3>
                <div className="flex justify-between items-end pt-8 border-t border-gray-100">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Bulk Rate</p>
                    <p className="text-2xl font-black text-gray-900">₦{offer.price.toLocaleString()}</p>
                  </div>
                  <button className="w-12 h-12 rounded-lg bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-primary transition shadow-lg active:scale-90">
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Sections */}
        <div className="mt-24 grid md:grid-cols-2 gap-12">
           <section className="p-12 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-6">Industrial Supply</h2>
              <p className="text-xs text-gray-600 font-bold leading-relaxed uppercase tracking-widest mb-8">
                 We provide continuous supply chains for hotels, restaurants, and food processors. Custom sorting and cleaning available for bulk grains and tubers.
              </p>
              <button className="bg-primary text-white px-8 py-4 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl">Inquire Now</button>
           </section>
           <section className="p-12 bg-[#0a0a0a] text-white rounded-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl"></div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">Logistics for Bulk</h2>
              <p className="text-xs text-white/50 font-bold leading-relaxed uppercase tracking-widest mb-8">
                 Dedicated freight services for orders above 2 tons. We handle the heavy lifting from the farm gate to your warehouse.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-primary border-b-2 border-primary pb-1">View Routes</button>
           </section>
        </div>
      </main>
    </div>
  );
}
