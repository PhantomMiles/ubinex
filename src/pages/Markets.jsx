import React from "react";
import Navbar from "../components/Navbar";

const marketHubs = [
  { name: "Ogbete Main Market", location: "Enugu North", special: "Everything", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400&h=400" },
  { name: "New Market", location: "Enugu North", special: "Fresh Produce", image: "https://images.unsplash.com/photo-1488459711612-071727719703?q=80&w=400&h=400" },
  { name: "Kenyatta Market", location: "Enugu South", special: "Cereal & Grains", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&h=400" },
  { name: "9th Mile Corner", location: "Ngwo", special: "Fruits & Tubers", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&h=400" },
  { name: "Abakpa Market", location: "Enugu East", special: "Vegetables", image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=400&h=400" },
];

export default function Markets() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Trading Hubs</p>
          <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-4">
            Regional Markets
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-lg">
            Discover the major agricultural trading hubs in Enugu state where fresh produce is consolidated daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {marketHubs.map((market) => (
            <div key={market.name} className="group relative rounded-xl overflow-hidden shadow-2xl h-[400px]">
              <img src={market.image} alt={market.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-8 text-white z-10 transition-all group-hover:from-primary/90">
                <span className="text-[8px] font-black uppercase tracking-widest text-primary group-hover:text-white transition-colors mb-2">{market.location}</span>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{market.name}</h3>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Specialty: {market.special}</p>
                   <button className="text-[10px] font-black uppercase tracking-widest text-white border-b border-primary">Explore Vendors</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
