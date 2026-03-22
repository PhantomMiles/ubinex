import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Legal() {
  const [activeSec, setActiveSec] = useState("tos");

  const sections = [
    { id: "tos", label: "Terms of Service" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "engineering", label: "Engineering Standards" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Regulatory & Safety</p>
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
            Compliance Hub
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed max-w-2xl">
            Ubinex operates under the highest standards of digital trade and data protection for the Nigerian agricultural sector.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-64 flex flex-col gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSec(s.id)}
                className={`text-left px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeSec === s.id ? "bg-[#0a0a0a] text-white shadow-xl" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </aside>

          {/* Content Area */}
          <div className="flex-1 bg-gray-50/50 rounded-3xl p-10 md:p-16 border border-gray-100 animate-in fade-in slide-in-from-right-8 duration-700">
            {activeSec === "tos" && (
              <article className="prose prose-sm max-w-none text-gray-600">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-10">Terms of Service</h2>
                <div className="space-y-8 text-[11px] uppercase tracking-wider leading-loose font-bold">
                  <section>
                    <h4 className="text-gray-900 mb-2">1. PLATFORM OBJECTIVE</h4>
                    <p>Ubinex is a digital marketplace connecting farmers in Enugu State with consumers. We facilitate discovery and price negotiation but do not take ownership of physical produce.</p>
                  </section>
                  <section>
                    <h4 className="text-gray-900 mb-2">2. FAIR TRADE & NEGOTIATION</h4>
                    <p>All price proposals must fall within 30% to 150% of the listed market price. Fraudulent listings or pricing or bait-and-switch tactics will result in immediate account termination.</p>
                  </section>
                  <section>
                    <h4 className="text-gray-900 mb-2">3. LOCAL JURISDICTION</h4>
                    <p>These terms are governed by the laws of the Federal Republic of Nigeria, with specific adherence to the Enugu State Agricultural Development Program (ENADEP) guidelines.</p>
                  </section>
                </div>
              </article>
            )}

            {activeSec === "privacy" && (
              <article className="prose prose-sm max-w-none text-gray-600">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-10">Privacy Policy</h2>
                <div className="space-y-8 text-[11px] uppercase tracking-wider leading-loose font-bold">
                  <section>
                    <h4 className="text-gray-900 mb-2">DATA ARCHITECTURE</h4>
                    <p>We adhere to the NDPR (Nigeria Data Protection Regulation). User data including phone numbers, locations, and transaction history are stored securely via encrypted local persistence.</p>
                  </section>
                  <section>
                    <h4 className="text-gray-900 mb-2">THIRD-PARTY DISCLOSURE</h4>
                    <p>Ubinex does not sell user data to third-party advertisers. Shared data is limited to logistics partners strictly for the fulfillment of orders.</p>
                  </section>
                </div>
              </article>
            )}

            {activeSec === "engineering" && (
              <article className="prose prose-sm max-w-none text-gray-600">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-10">Engineering Standards</h2>
                <div className="space-y-8">
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
                    <h4 className="text-gray-900 font-black uppercase text-[10px] tracking-widest mb-4">Core Architecture</h4>
                    <p className="text-[10px] uppercase font-bold text-gray-400 leading-loose">Ubinex is built on a React-based SPA architecture with a centralized Context API for global state. Persistence is achieved via LocalStorage-DB simulation for offline-first capabilities.</p>
                  </div>
                  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <h4 className="text-gray-900 font-black uppercase text-[10px] tracking-widest mb-4">Security Protocols</h4>
                    <ul className="text-[10px] uppercase font-bold text-gray-400 space-y-3 list-disc pl-5">
                       <li>SIMULATED TOKEN-BASED SESSION MANAGEMENT</li>
                       <li>ENFORCEABLE PRICE BOUNDARIES FOR MARKET INTEGRITY</li>
                       <li>SECURE PERSISTENCE WITH NO SENSITIVE DATA IN PLAIN LOGS</li>
                       <li>MOBILE-FIRST RESPONSIVE UI VALIDATION</li>
                    </ul>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
