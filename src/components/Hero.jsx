import React from 'react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      {/* Main Banner - Abakaliki Rice Focus */}
      <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-2xl group h-[450px] lg:h-[550px]">
        <img 
          src="https://images.unsplash.com/photo-1586201327693-86649f7ba80d?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Abakaliki Rice" 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center px-16 text-white z-10">
          <span className="text-primary font-black uppercase tracking-[0.4em] mb-6 animate-in fade-in slide-in-from-left duration-700 italic">Premium Nigerian Harvest</span>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight max-w-xl animate-in fade-in slide-in-from-left duration-700 delay-100 italic uppercase tracking-tighter">
            Stone-Free <br/><span className="text-primary">Abakaliki Rice</span>
          </h1>
          <p className="text-xl mb-10 opacity-80 delay-200 animate-in fade-in slide-in-from-left font-bold uppercase tracking-widest">Starting from <span className="text-white font-black italic">₦45,000</span> <span className="text-xs opacity-50">/ 50kg Bag</span></p>
          <button className="bg-primary hover:bg-white hover:text-primary text-white font-black py-5 px-12 rounded-lg transition-all shadow-2xl w-fit uppercase tracking-[0.3em] text-[10px] delay-300 animate-in fade-in slide-in-from-left transform active:scale-95 italic border border-white/10">
            Secure Your Bag <i className="fas fa-arrow-right ml-3 scale-90"></i>
          </button>
        </div>
        {/* Decorative Overlay */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2 text-white/20 animate-pulse">
           <div className="w-12 h-px bg-current"></div>
           <p className="text-[8px] font-black uppercase tracking-[0.5em] origin-right rotate-90 translate-y-8">Harvest 2026</p>
        </div>
      </div>

      {/* Side Banners - Enugu Specifics */}
      <div className="flex flex-col gap-8 h-[450px] lg:h-[550px]">
        {/* Nsukka Pepper Banner */}
        <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl group border border-gray-100">
          <img 
            src="https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg" 
            alt="Nsukka Yellow Pepper" 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-black mb-3 italic uppercase tracking-tighter leading-none">Nsukka <br/>Yellow Pepper</h3>
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-80 mb-6 font-black text-primary italic">Authentic Aroma & Spice</p>
            <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-primary w-fit pb-1.5 hover:text-primary transition italic">Shop Market</button>
          </div>
        </div>

        {/* Ogbono/Spices Banner */}
        <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl group border border-gray-100">
          <img 
            src="https://i.pinimg.com/1200x/8f/35/d5/8f35d556a31034f82855580556666666.jpg" 
            alt="Nigerian Spices" 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/10 to-transparent flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-black mb-3 italic uppercase tracking-tighter leading-none">Premium <br/>Local Spices</h3>
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-80 mb-6 font-black text-accent italic">Ogbono, Crayfish, Egusi</p>
            <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-accent w-fit pb-1.5 hover:text-accent transition italic">View Spices</button>
          </div>
        </div>
      </div>
    </section>
  );
}
