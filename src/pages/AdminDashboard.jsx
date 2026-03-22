import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminProducts from "./AdminProducts";

export default function AdminDashboard() {
  const [route, setRoute] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const h = (window.location.hash || '#/admin').replace('#/admin', '').replace('#/', '').replace('/', '') || 'analytics';
      setRoute(h || 'analytics');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar active={route} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Classy & Modern */}
        <header className="bg-white border-b border-gray-100 py-6 px-10 flex items-center justify-between z-20">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="md:hidden p-3 hover:bg-gray-50 rounded-lg transition text-primary border border-gray-100"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="max-w-xl w-full relative hidden sm:block">
               <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
               <input 
                 placeholder="Search analytics, products, orders..." 
                 className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner"
               />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative text-gray-400 hover:text-primary transition group">
               <i className="far fa-comment-dots text-xl"></i>
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 italic">Farmer Chidi</p>
                  <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Enugu North / Nigeria</p>
               </div>
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner border border-primary/5 italic">
                  C
               </div>
               <i className="fas fa-chevron-down text-[8px] text-gray-300"></i>
            </div>
          </div>
        </header>

        {/* Main Content Scrollable */}
        <main className="flex-1 p-10 overflow-y-auto no-scrollbar">
          {route === 'analytics' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Top Row Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Weather Card - Enugu Focus */}
                <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 text-primary/5 group-hover:scale-110 transition duration-700">
                      <i className="fas fa-cloud-sun text-9xl"></i>
                   </div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Local Weather</p>
                   <h3 className="text-2xl font-black text-gray-900 mb-8 italic uppercase tracking-tighter">Enugu City <span className="text-gray-300 font-normal NOT-italic opacity-50 ml-2">Today</span></h3>
                   
                   <div className="flex items-center gap-10">
                      <div className="relative w-28 h-28 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner">
                         <div className="text-center">
                            <span className="text-3xl font-black italic text-gray-900">32°c</span>
                            <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Sunny</p>
                         </div>
                      </div>
                      <div className="space-y-6">
                         <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black italic text-gray-900">34°</span>
                            <span className="text-sm font-black text-gray-300 italic uppercase">High</span>
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-1 rounded-md w-fit">Strong Sun (12h)</p>
                      </div>
                   </div>
                   <div className="mt-10 flex justify-between pt-10 border-t border-gray-50">
                      <div className="text-center"><i className="fas fa-wind text-gray-300 mb-3 block"></i><p className="text-[9px] font-black uppercase tracking-widest">12 km/h</p></div>
                      <div className="text-center"><i className="fas fa-tint text-gray-300 mb-3 block"></i><p className="text-[9px] font-black uppercase tracking-widest">45% Hum</p></div>
                      <div className="text-center"><i className="fas fa-sun text-gray-300 mb-3 block"></i><p className="text-[9px] font-black uppercase tracking-widest">UV High</p></div>
                   </div>
                </div>

                {/* Productivity Card */}
                <div className="bg-[#0a0a0a] rounded-xl p-10 shadow-2xl border border-white/5 flex flex-col text-white relative overflow-hidden">
                   <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 blur-[80px] rounded-full"></div>
                   <div className="flex justify-between items-center mb-10 relative z-10">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Yield Growth Activity</p>
                      <button className="text-[8px] font-black bg-white/5 px-4 py-1.5 rounded-lg text-white/50 hover:text-primary transition uppercase tracking-[0.2em] border border-white/10">Yearly</button>
                   </div>
                   
                   <div className="flex-1 relative flex items-end gap-2 px-2 pt-12 pb-8">
                      <svg className="absolute inset-0 w-full h-full text-primary opacity-50" viewBox="0 0 400 200" preserveAspectRatio="none">
                         <path d="M0,180 Q100,20 200,140 T400,40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                      </svg>
                      <div className="absolute top-10 left-[40%] px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg uppercase shadow-2xl italic tracking-tighter transition-transform hover:scale-110 cursor-pointer">
                        +24% Increase
                      </div>
                   </div>
                   
                   <div className="flex justify-between text-[8px] font-black text-white/20 uppercase tracking-[0.3em] pt-6 border-t border-white/5 relative z-10">
                      <span>Jan '26</span>
                      <span>Jun '26</span>
                      <span>Dec '26</span>
                   </div>
                </div>

                {/* Banner Card - Enugu Markets */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl group flex flex-col">
                   <img src="https://images.unsplash.com/photo-1595841696677-5f80cc294248?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000 grayscale-[0.5] group-hover:grayscale-0" alt="Market" />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-10 text-white z-10">
                      <div className="flex justify-between items-end mb-6">
                         <div>
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">Premium Marketplace</span>
                            <h3 className="text-3xl font-black italic leading-none uppercase tracking-tighter">Ogbete Main Market</h3>
                         </div>
                         <button className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center hover:bg-white text-white hover:text-primary transition shadow-xl active:scale-90"><i className="fas fa-arrow-right text-xl"></i></button>
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-widest border-t border-white/10 pt-6">
                         Connecting your farm produce directly to the heart of Enugu's largest trading hub. Real-time price tracking and logistics.
                      </p>
                   </div>
                </div>
              </div>

              {/* Summary of Production Section - Enugu Crops */}
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Inventory Analytics</p>
                      <h2 className="text-3xl font-black italic text-gray-900 uppercase tracking-tighter">Production Summary</h2>
                   </div>
                   <div className="flex flex-wrap items-center gap-10 border-b border-gray-50 pb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded bg-primary/20"></div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Previous</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded bg-primary shadow-lg shadow-primary/20"></div>
                         <span className="text-[9px] font-black uppercase tracking-widest text-gray-900">Current</span>
                      </div>
                   </div>
                </div>

                <div className="h-96 w-full flex items-end justify-between gap-6 px-4 relative">
                   {/* Fake Chart Body */}
                   {[12, 18, 28, 45, 22, 35, 55, 18, 40, 60, 30, 15].map((h, i) => (
                     <div key={i} className="flex-1 flex flex-col gap-2 items-center group">
                        <div className="w-full bg-primary/10 rounded-t-md transition-all duration-500 group-hover:bg-primary/20" style={{ height: `${h * 1.2}%` }}></div>
                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 shadow-xl group-hover:scale-y-110 origin-bottom group-hover:bg-[#0a0a0a]" style={{ height: `${h * 1.5}%` }}></div>
                     </div>
                   ))}
                   {/* Tooltip - Enugu Produce */}
                   <div className="absolute top-24 left-[75%] -translate-x-1/2 flex flex-col items-center group cursor-pointer">
                      <div className="px-5 py-2 bg-[#0a0a0a] text-white text-[10px] font-black rounded-lg uppercase mb-3 shadow-2xl italic tracking-widest group-hover:bg-primary transition whitespace-nowrap">
                        Nsukka Pepper: 4.2 Tons
                      </div>
                      <div className="w-px h-48 bg-gray-200 border-l border-dashed border-gray-300"></div>
                   </div>
                </div>
                
                <div className="flex justify-between mt-10 px-4 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] italic">
                   {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          )}

          {route === 'products' && <AdminProducts />}
          {route === 'sales' && (
            <div className="p-16 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-6 duration-700">
               <h2 className="text-3xl font-black italic text-gray-900 mb-12 uppercase tracking-tighter"><i className="fas fa-history mr-4 text-primary opacity-50"></i>Sales History</h2>
               <div className="text-center py-32 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="text-7xl text-gray-200 mb-8"><i className="fas fa-folder-open"></i></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">No sales data recorded for your account.</p>
               </div>
            </div>
          )}
          {route === 'orders' && (
            <div className="p-16 bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-6 duration-700">
               <h2 className="text-3xl font-black italic text-gray-900 mb-12 uppercase tracking-tighter"><i className="fas fa-shopping-basket mr-4 text-primary opacity-50"></i>Order Management</h2>
               <div className="text-center py-32 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="text-7xl text-gray-200 mb-8"><i className="fas fa-box-open"></i></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">You have no active orders to process.</p>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
