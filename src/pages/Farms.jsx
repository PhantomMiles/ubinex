import React from "react";
import Navbar from "../components/Navbar";

const registeredFarms = [
  { name: "Nsukka Golden Gardens", owner: "Mazi Okonkwo", location: "Nsukka", specialty: "Yellow Pepper", image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=400&h=400" },
  { name: "Oji River Rice Mill", owner: "Chief Ezugwu", location: "Oji River", specialty: "Abakaliki Rice", image: "https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=400&h=400" },
  { name: "Aninri Roots Farm", owner: "Lady Nwakego", location: "Aninri", specialty: "Big Yam", image: "https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg" },
  { name: "Udenu Poultry Hub", owner: "Engr. Nnamdi", location: "Udenu", specialty: "Eggs & Birds", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=400&h=400" },
  { name: "Uzo-Uwani Honey Co.", owner: "Doctor Amaechi", location: "Uzo-Uwani", specialty: "Natural Honey", image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?q=80&w=400&h=400" },
];

export default function Farms() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-20">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">The Producers</p>
          <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-6">
            Farm Directory
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
            Connecting you directly to verified agricultural producers across Enugu State. Real farms, real food, real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {registeredFarms.map((farm) => (
            <div key={farm.name} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-500">
               <div className="relative h-64">
                  <img src={farm.image} alt={farm.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-xl text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                     <i className="fas fa-certificate text-xs"></i> Verified Farm
                  </div>
               </div>
               <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-gray-900 mb-1">{farm.name}</h3>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 italic">Chief Operator: {farm.owner}</p> Speciality: {farm.specialty}
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-lg border border-gray-100 italic">
                     <i className="fas fa-map-marker-alt text-primary text-xs"></i>
                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-700">{farm.location}, Enugu</span>
                  </div>
                  <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                     <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary italic">View Portfolio</button>
                     <div className="flex gap-4 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500">
                        <i className="fas fa-phone-alt text-xs"></i>
                        <i className="fas fa-envelope text-xs"></i>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <section className="mt-20 p-16 bg-[#0a0a0a] rounded-xl text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
           <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-8">Are you a Farmer?</h2>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-10 leading-loose italic">
                 Register your farm today and join a network of over 500+ successful producers reaching consumers across Nigeria. Scale your operations with Ubinex.
              </p>
              <button className="bg-primary hover:bg-white hover:text-primary text-white font-black px-12 py-5 rounded-lg text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl active:scale-95 italic border border-white/10">Start Your Registry</button>
           </div>
        </section>
      </main>
    </div>
  );
}
