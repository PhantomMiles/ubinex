import React, { useState } from "react";
import { useApp } from "../context/useAppContext";

export default function Negotiation({ product = {}, onClose }) {
  const [offer, setOffer] = useState("");
  const [notes, setNotes] = useState("");
  const { currency, currencies } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';

  const [offers, setOffers] = useState([
    { id: 1, from: "seller", amount: product.price || 0, message: "Starting consolidated market price" },
  ]);

  function sendOffer(e) {
    e.preventDefault();
    const amt = Number(offer) || 0;
    if (!amt) return;
    const next = { id: Date.now(), from: "buyer", amount: amt, message: notes };
    setOffers((s) => [next, ...s]);
    setOffer("");
    setNotes("");

    // simulate seller counter after a short delay
    setTimeout(() => {
      const sellerCounter = Math.max(Math.round((product.price || amt) * 0.95), amt + 100);
      setOffers((s) => [
        { id: Date.now() + 1, from: "seller", amount: sellerCounter, message: "Market counter-offer based on volume" },
        ...s,
      ]);
    }, 1200);
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 font-sans flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
           <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">Live Negotiation</p>
           <h3 className="text-lg font-black italic uppercase tracking-tighter text-gray-900 leading-none">{product.name}</h3>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition active:scale-90">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[300px] bg-white">
        {offers.map((o) => (
          <div key={o.id} className={`flex flex-col ${o.from === "buyer" ? "items-end" : "items-start"}`}>
             <div className={`p-4 rounded-xl max-w-[85%] shadow-sm border ${
               o.from === "buyer" 
                ? "bg-primary text-white border-primary/10" 
                : "bg-gray-50 text-gray-700 border-gray-100"
             }`}>
                <div className="flex items-center justify-between gap-8 mb-2">
                   <span className={`text-[8px] font-black uppercase tracking-widest ${o.from === 'buyer' ? 'text-white/50' : 'text-gray-400'}`}>
                      {o.from === "buyer" ? "Your Proposal" : "Seller Quote"}
                   </span>
                   <span className={`text-sm font-black italic ${o.from === 'buyer' ? 'text-white' : 'text-primary'}`}>
                      {symbol}{o.amount.toLocaleString()}
                   </span>
                </div>
                <p className={`text-[10px] font-bold leading-relaxed ${o.from === 'buyer' ? 'text-white/80' : 'text-gray-500'}`}>
                   {o.message}
                </p>
             </div>
             <p className="text-[7px] font-black text-gray-300 uppercase tracking-widest mt-2 px-2">
                Recently
             </p>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <form onSubmit={sendOffer} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">{symbol}</span>
               <input
                 type="number"
                 min="0"
                 value={offer}
                 onChange={(e) => setOffer(e.target.value)}
                 placeholder="0.00"
                 className="w-full pl-10 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-xs font-black shadow-inner focus:ring-4 focus:ring-primary/5 outline-none transition"
               />
            </div>
            <button 
               type="submit" 
               className="bg-[#0a0a0a] hover:bg-primary text-white px-8 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all duration-300 italic active:scale-95"
            >
              Propose
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add terms (e.g., bulk discount, delivery preferences...)"
            rows="2"
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-[10px] font-bold text-gray-600 focus:ring-4 focus:ring-primary/5 outline-none transition resize-none shadow-inner italic"
          />
        </form>
        <p className="mt-4 text-[8px] font-black text-gray-400 uppercase tracking-widest text-center italic">
           All negotiations are recorded for market transparency
        </p>
      </div>
    </div>
  );
}
