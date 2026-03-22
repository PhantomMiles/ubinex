import React from "react";
import Navbar from "../components/Navbar";

const services = [
  { title: "Farm Pickup", icon: "fas fa-tractor", desc: "Automated logistics for direct farm site consolidation." },
  { title: "Cold Storage", icon: "fas fa-snowflake", desc: "Preserving freshness for dairy and meat produce." },
  { title: "Last-Mile Delivery", icon: "fas fa-truck", desc: "Fast delivery within the Enugu metropolis." },
  { title: "Supply Chain Analytics", icon: "fas fa-chart-line", desc: "Track your produce from farm to fork." },
];

export default function Logistics() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-20">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Supply Chain</p>
          <h1 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-6">
            Logistics & Warehousing
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
            Ensuring that every harvest reaches its destination in peak condition through specialized transportation and storage solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((svc) => (
            <div key={svc.title} className="group bg-white p-10 rounded-xl border border-gray-100 hover:shadow-2xl transition duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-primary text-2xl mb-8 group-hover:bg-primary group-hover:text-white transition duration-500 shadow-inner">
                <i className={svc.icon}></i>
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-gray-900 mb-4">{svc.title}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>

        {/* Tracking UI Placeholder */}
        <section className="mt-20 bg-[#0a0a0a] text-white p-12 rounded-xl shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           </div>
           
           <div className="max-w-xl relative z-10">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block italic">Track Shipment</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Where is your harvest?</h2>
              <div className="flex gap-4">
                 <input placeholder="ENTER TRACKING ID (UBX-XXXX-XXXX)" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-5 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/20 outline-none transition shadow-inner" />
                 <button className="bg-primary hover:bg-white hover:text-primary px-8 py-5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl transition active:scale-95 italic">Locate</button>
              </div>
              <p className="mt-6 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Contact Logistics Support for real-time issues: +234 812 000 0000</p>
           </div>
        </section>
      </main>
    </div>
  );
}
