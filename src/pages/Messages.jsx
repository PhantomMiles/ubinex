import React, { useState } from 'react';
import { useApp } from '../context/useAppContext';

export default function Messages() {
  const { negotiations, user } = useApp();
  const [selectedNeg, setSelectedNeg] = useState(null);
  const [reply, setReply] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply) return;
    // In a full app, this would update the negotiation thread
    setReply("");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Inbox List */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">Market Hub</h2>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Active Negotiations</p>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {negotiations.map(neg => (
             <div 
               key={neg.id} 
               onClick={() => setSelectedNeg(neg)}
               className={`p-6 border-b border-gray-50 cursor-pointer transition-all ${selectedNeg?.id === neg.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-gray-50'}`}
             >
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{neg.buyerName}</span>
                   <span className="text-[8px] font-black text-gray-300 uppercase">2m ago</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold truncate tracking-widest leading-tight">{neg.lastMessage}</p>
                <div className="mt-4 flex items-center gap-2">
                   <span className={`w-1.5 h-1.5 rounded-full ${neg.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                   <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{neg.status} Inquiry</span>
                </div>
             </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50/50">
        {selectedNeg ? (
          <>
            <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner">
                    {selectedNeg.buyerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{selectedNeg.buyerName}</h3>
                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Inquiry for Enugu Yellow Pepper</p>
                  </div>
               </div>
               <button className="text-[9px] font-black text-primary uppercase tracking-widest border-b border-primary">View Product Details</button>
            </div>

            <div className="flex-1 p-10 overflow-y-auto space-y-8 no-scrollbar">
               {/* Incoming */}
               <div className="flex flex-col items-start max-w-[70%]">
                  <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <p className="text-[11px] font-bold text-gray-600 leading-relaxed tracking-wide">
                      Greetings Farmer {user?.name}. I'm interested in wholesale volumes of your yellow pepper. What's the best price for 20 baskets delivered to Ogbete?
                    </p>
                  </div>
                  <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest mt-2 px-2">10:42 AM</span>
               </div>

               {/* Outgoing */}
               <div className="flex flex-col items-end max-w-[70%] ml-auto">
                  <div className="bg-[#0a0a0a] p-6 rounded-2xl rounded-tr-none shadow-xl border border-white/5">
                    <p className="text-[11px] font-bold text-white leading-relaxed tracking-wide">
                      Welcome Obinna. For 20 baskets, we can offer ₦8,500 per basket instead of the retail ₦10,000. Quality is top grade from Nsukka.
                    </p>
                  </div>
                  <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest mt-2 px-2">Recently</span>
               </div>
            </div>

            <div className="p-8 bg-white border-t border-gray-100">
               <form onSubmit={handleSend} className="relative">
                  <input 
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder="Compose message or proposal..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-5 pl-8 pr-32 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner" 
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                    Send Reply
                  </button>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center opacity-20 grayscale">
             <i className="far fa-comments text-9xl mb-10"></i>
             <h2 className="text-2xl font-black uppercase tracking-tighter">No Active Chat</h2>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-2">Select a negotiation from the sidebar to begin responding.</p>
          </div>
        )}
      </div>
    </div>
  );
}
