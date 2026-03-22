import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Our Mission</p>
          <h1 className="text-6xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-12">
            Revolutionizing <br/>Nigerian Agriculture
          </h1>
          <div className="space-y-8 text-gray-600 leading-relaxed font-medium">
            <p>
              Ubinex is state-of-the-art agricultural marketplace designed to bridge the gap between hard-working Nigerian farmers and the final consumers. Based in the heart of Enugu, we leverage technology to ensure food security, fair pricing, and seamless logistics.
            </p>
            <p>
              Our platform empowers local farmers by giving them direct access to regional and national markets, eliminating unnecessary middlemen and ensuring that fresh produce reaches your table at its peak quality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-20">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Our Values</h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-gray-900 italic">
                <li className="flex items-center gap-3"><i className="fas fa-check text-primary"></i> Transparency</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-primary"></i> Fairness</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-primary"></i> Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Contact</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 italic">Enugu State, Nigeria</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">contact@ubinex.com.ng</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
