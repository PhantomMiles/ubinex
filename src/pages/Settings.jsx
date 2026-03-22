import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/useAppContext';

export default function Settings() {
  const { user, updateUser, deleteUserAccount } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    location: user?.location || 'Enugu State'
  });
  const [saved, setSaved] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });

  // Determine if we are in admin dashboard context
  const isAdmin = window.location.hash.includes('/admin');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Content = (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 font-sans">
      <div className="mb-12">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Account Control</p>
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
          Profile Settings
        </h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
           Manage your official Ubinex identity and regional presence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-10 space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date of Birth</label>
                  <input 
                    type="date" 
                    value={formData.dob}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition cursor-pointer" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Regional Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition" 
                  />
               </div>
            </div>

            <div className="pt-10 border-t border-gray-50">
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-1">Ubinex Identity</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{user?.ubxId || 'Assigned on next login'}</p>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg border border-gray-100 text-[8px] font-black uppercase tracking-widest text-gray-400">
                    ID Non-Editable
                  </div>
               </div>
            </div>
         </div>

         <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-6">
            {saved && (
              <span className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-4">
                <i className="fas fa-check-circle"></i> Changes Committed
              </span>
            )}
            <button className="bg-primary hover:bg-[#0a0a0a] text-white px-12 py-4 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95">
               Update Profile
            </button>
         </div>
      </form>

      {user?.role === 'consumer' && (
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-700">
           <div className="p-10 border-b border-gray-100">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Regional Wallet</p>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Payment Methods</h3>
           </div>
           <div className="p-10 grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                 <div className="p-8 rounded-xl border-2 border-primary/20 bg-primary/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><i className="fas fa-credit-card text-7xl"></i></div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-6">Default Naira Card</p>
                    <div className="text-xl font-black text-gray-900 tracking-widest mb-2">**** **** **** 4242</div>
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] font-black uppercase text-gray-400">Exp: 12/28</span>
                       <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 grayscale opacity-30" alt="Card" />
                    </div>
                 </div>
                 <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-primary hover:text-primary transition">
                    + Link New Payment Gateway
                 </button>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-6">
                 <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Card Entry Point</p>
                 <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Card Number" className="col-span-2 w-full bg-white border border-gray-200 rounded-lg py-4 px-6 text-[10px] font-black uppercase focus:ring-4 focus:ring-primary/5 transition" />
                    <input placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-lg py-4 px-6 text-[10px] font-black uppercase focus:ring-4 focus:ring-primary/5 transition" />
                    <input placeholder="CVC" className="w-full bg-white border border-gray-200 rounded-lg py-4 px-6 text-[10px] font-black uppercase focus:ring-4 focus:ring-primary/5 transition" />
                 </div>
                 <button className="w-full bg-[#0a0a0a] text-white py-4 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-primary transition active:scale-95">Verify & Add Card</button>
              </div>
           </div>
        </div>
      )}

      <div className="mt-12 grid md:grid-cols-2 gap-8">
         <div onClick={() => setShowSecurity(true)} className="p-8 bg-white border border-gray-100 rounded-xl relative group cursor-pointer hover:border-primary transition">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-4">Security</h4>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Update your password and login credentials.</p>
            <i className="fas fa-shield-alt absolute top-8 right-8 text-gray-100 group-hover:text-primary/20 transition text-2xl"></i>
         </div>
         <div onClick={() => setShowDelete(true)} className="p-8 bg-white border border-gray-100 rounded-xl relative group cursor-pointer hover:border-red-100 transition">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-4">Deactivation</h4>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Close your account and purge archived data.</p>
            <i className="fas fa-exclamation-triangle absolute top-8 right-8 text-gray-100 group-hover:text-red-100 transition text-2xl"></i>
         </div>
      </div>

      {/* Security Modal */}
      {showSecurity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Security Center</h3>
                 <button onClick={() => setShowSecurity(false)} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition"><i className="fas fa-times"></i></button>
              </div>
              <div className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] focus:ring-4 focus:ring-primary/5 outline-none transition" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-6 text-[10px] focus:ring-4 focus:ring-primary/5 outline-none transition" />
                 </div>
                 <button className="w-full bg-[#0a0a0a] text-white py-4 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95">Update Security</button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
              <div className="p-10 text-center">
                 <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">
                    <i className="fas fa-user-slash"></i>
                 </div>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-4">Close Account?</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-10">
                    This will permanently delete your harvest statistics and transaction history.
                 </p>
                 <div className="flex flex-col gap-4">
                    <button onClick={deleteUserAccount} className="w-full bg-red-600 text-white py-4 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-red-700 transition active:scale-95">Terminate Identity</button>
                    <button onClick={() => setShowDelete(false)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition">Keep Account</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  if (isAdmin) {
    return Content;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-10 py-20 flex gap-20">
         <div className="hidden lg:block w-64 space-y-2">
            <button className="w-full text-left px-6 py-4 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl">Profile Details</button>
            <button className="w-full text-left px-6 py-4 rounded-xl text-gray-400 hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest transition">Order History</button>
            <button className="w-full text-left px-6 py-4 rounded-xl text-gray-400 hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest transition">Security</button>
         </div>
         <div className="flex-1">
            {Content}
         </div>
      </div>
    </div>
  );
}
