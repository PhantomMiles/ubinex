import React from "react";
import Navbar from "../components/Navbar";

const registeredFarms = [
  { name: "Nsukka Golden Gardens", owner: "Mazi Okonkwo", location: "Nsukka", specialty: "Yellow Pepper", image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=400&h=400", type: "Verified Farms" },
  { name: "Oji River Rice Mill", owner: "Chief Ezeugwu", location: "Oji River", specialty: "Abakaliki Rice", image: "https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=400&h=400", type: "Verified Farms" },
  { name: "Aninri Roots Farm", owner: "Lady Nwakego", location: "Aninri", specialty: "Big Yam", image: "https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg", type: "Verified Farms" },
  { name: "Hybrid Seedlings Pro", owner: "Dr. Ofor", location: "Enugu Town", specialty: "Improved Seeds", image: "https://images.unsplash.com/photo-1592150621344-c79429b3f27f?q=80&w=400&h=400", type: "Seedlings" },
  { name: "AgroTech Tools Ltd", owner: "Engr. Nnamdi", location: "Emene", specialty: "Modern Equipment", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=400&h=400", type: "Farming Tools" },
  { name: "Ubinex Consultancy", owner: "Agro Experts", location: "9th Mile", specialty: "Farm Management", image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=400&h=400", type: "Consultancy" },
];

export default function Farms() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Agricultural Services</p>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6">
            Producers & Partners
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
            From verified farm gates to technical consultancy. Find everything you need to grow and source at scale.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
           {["All Services", "Verified Farms", "Farming Tools", "Seedlings", "Consultancy"].map(cat => (
             <button key={cat} className="px-8 py-4 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition whitespace-nowrap shadow-sm">
               {cat}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {registeredFarms.map((farm) => (
            <div key={farm.name} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-500">
               <div className="relative h-64">
                  <img src={farm.image} alt={farm.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-xl text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                     <i className="fas fa-certificate text-xs"></i> {farm.type}
                  </div>
               </div>
               <div className="p-10">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-1">{farm.name}</h3>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-6">Lead: {farm.owner}</p>
                  
                  <div className="flex items-center gap-2 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-lg border border-gray-100">
                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-700">{farm.specialty}</span>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-primary text-xs"></i>
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{farm.location}</span>
                     </div>
                     <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-0.5">Contact</button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-24 p-16 bg-[#0a0a0a] rounded-xl text-center relative overflow-hidden border border-white/5">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
           <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-8">Join the Directory</h2>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-10 leading-loose mx-auto">
                 Are you an agro-consultant or equipment supplier? Ubinex is Nigeria's largest digital hub for agricultural professional services.
              </p>
              <button className="bg-primary hover:bg-white hover:text-primary text-white font-black px-12 py-5 rounded-lg text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 border border-white/10">Become a Partner</button>
           </div>
        </section>
      </main>
    </div>
  );
}
