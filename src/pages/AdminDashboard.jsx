import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import AdminProducts from "./AdminProducts";
import Settings from "./Settings";
import Messages from "./Messages";
import { useApp } from "../context/useAppContext";
import { SUPPORTED_LANGUAGES } from "../data/translations";
import { getRealTimeWeather } from "../services/weatherService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { productionAnalytics } from '../data/productionData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('both');
  const [yieldTimeframe, setYieldTimeframe] = useState('yearly');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [langOpen, setLangOpen] = useState(false);

  const yieldDataMap = {
    weekly: {
      increase: "+8% Increase",
      labels: ["Mon", "Wed", "Sun"],
      path: "M0,150 Q100,170 200,80 T400,30"
    },
    monthly: {
      increase: "+15% Increase",
      labels: ["W1", "W2", "W4"],
      path: "M0,120 Q100,50 200,160 T400,20"
    },
    yearly: {
      increase: "+24% Increase",
      labels: ["Jan '26", "Jun '26", "Dec '26"],
      path: "M0,180 Q100,20 200,140 T400,40"
    }
  };

  const { labels, datasets } = productionAnalytics;
  const chartDatasets = [];

  if (activeView === 'both' || activeView === 'previous') {
    chartDatasets.push({
      label: datasets.previous.label,
      data: datasets.previous.data,
      borderColor: datasets.previous.color,
      borderDash: [6, 6],
      borderWidth: 2,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#B8A394',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 7,
      tension: 0.4,
      fill: false,
      extraItems: datasets.previous.items,
    });
  }

  if (activeView === 'both' || activeView === 'current') {
    chartDatasets.push({
      label: datasets.current.label,
      data: datasets.current.data,
      borderColor: datasets.current.color,
      borderWidth: 3,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#244210ff',
      pointBorderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(45, 80, 22, 0.25)');
        gradient.addColorStop(1, 'rgba(45, 80, 22, 0.0)');
        return gradient;
      },
      extraItems: datasets.current.items,
    });
  }

  const chartData = { labels, datasets: chartDatasets };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { size: 10, weight: 'bold' },
        bodyFont: { size: 10, weight: '600' },
        padding: 8,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          font: { weight: '700', size: 9 }, 
          color: '#94A3B8',
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        border: { dash: [4, 4] },
        grid: { color: '#E2E8F0' },
        ticks: { display: false }
      }
    }
  };

  const { user, selectedLang, setSelectedLang } = useApp();
  const [route, setRoute] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLangName = typeof selectedLang === 'object' ? selectedLang?.name : selectedLang;
  const currentLangObj = SUPPORTED_LANGUAGES?.find(l => l.name === currentLangName) || SUPPORTED_LANGUAGES?.[0] || { code: 'EN', name: 'English' };

  useEffect(() => {
    async function fetchWeather() {
      setWeatherLoading(true);
      const data = await getRealTimeWeather(6.4584, 7.5464);
      if (data) setWeather(data);
      setWeatherLoading(false);
    }
    fetchWeather();
  }, []);

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
      {/* Desktop Sidebar */}
      <Sidebar active={route} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile Bottom Navigation Bar (Unchanged) */}
      <BottomNav active={route} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden md:pl-64">
        
        {/* FIX 1: Clean Mobile Sticky Header */}
        <header className="bg-white border-b border-gray-100 py-3 px-4 sm:px-10 flex items-center justify-between z-20 sticky top-0 shadow-sm md:shadow-none">
          
          {/* Mobile Logo Branding */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-white font-black text-xs shadow-md overflow-hidden">
               <img src="/ubinex.png" alt="Ubinex Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-xs tracking-tight text-gray-900 uppercase">
              Ubinex
            </span>
          </div>

          {/* Desktop Search */}
          <div className="max-w-xl w-full relative hidden sm:block">
             <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
             <input 
               placeholder="Search analytics, products, orders..." 
               className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-12 pr-6 text-[10px] font-black uppercase focus:ring-4 focus:ring-primary/5 transition shadow-inner"
             />
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 py-1.5 px-2.5 rounded-xl transition flex items-center gap-1.5 text-gray-700 font-black text-[10px] uppercase"
              >
                <i className="fas fa-globe text-primary"></i>
                <span>{currentLangObj.code}</span>
                <i className={`fas fa-chevron-down text-[8px] opacity-40 transition-transform ${langOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 max-h-64 overflow-y-auto bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-100 z-[150] no-scrollbar py-1">
                  {SUPPORTED_LANGUAGES?.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => { 
                        setSelectedLang(lang.name); 
                        setLangOpen(false); 
                      }}
                      className={`w-full text-left px-3 py-2 text-[10px] hover:bg-primary/5 hover:text-primary transition font-bold flex items-center justify-between border-b border-gray-50/50 last:border-none ${currentLangName === lang.name ? 'bg-primary/5 text-primary' : ''}`}
                    >
                      <span className="uppercase">{lang.name}</span>
                      <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 bg-gray-50 p-1 sm:p-2 sm:pr-6 rounded-xl border border-gray-100 group cursor-pointer hover:bg-white transition-all">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center text-white font-black shadow-md text-xs sm:text-base">
                  {user?.name?.charAt(0) || 'E'}
               </div>
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-gray-900">Farmer {user?.name || 'Producer'}</p>
                  <p className="text-[8px] text-primary font-black uppercase flex items-center justify-end gap-1">
                    <i className="fas fa-fingerprint text-[6px]"></i>
                    {user?.ubxId || 'UBX-F-PENDING'}
                  </p>
               </div>
               <i className="fas fa-chevron-down text-[8px] text-gray-300 ml-0.5 group-hover:text-primary transition"></i>
            </div>
          </div>
        </header>

        {/* FIX 2: Responsive Main Content Container */}
        <main className="flex-1 p-4 sm:p-8 pb-28 md:pb-10 overflow-y-auto no-scrollbar">
          {route === 'analytics' && (
            <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-500">
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                
                {/* FIX 3: Dynamic Weather Card Mobile Scaling */}
                <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between">
                   <div className={`absolute top-0 right-0 p-6 sm:p-10 opacity-10 ${weather?.color || 'text-primary'}`}>
                      <i className={`fas ${weather?.icon || 'fa-cloud-sun'} text-7xl sm:text-9xl`}></i>
                   </div>
                   
                   <div>
                     <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Local Weather</p>
                     <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 uppercase">
                       Enugu City <span className="text-gray-300 font-normal opacity-50 ml-1">Today</span>
                     </h3>
                   </div>

                   {weatherLoading ? (
                     <div className="flex-1 flex items-center justify-center py-6">
                       <p className="text-[9px] font-black text-gray-300 uppercase animate-pulse">
                         Fetching real-time weather...
                       </p>
                     </div>
                   ) : (
                     <>
                       <div className="flex items-center gap-6 sm:gap-10">
                          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner shrink-0">
                             <div className="text-center">
                                <span className="text-2xl sm:text-3xl font-black text-gray-900">{weather?.temp ?? 32}°c</span>
                                <p className={`text-[7px] sm:text-[8px] font-black uppercase ${weather?.color || 'text-gray-400'}`}>
                                  {weather?.status || 'Live Temp'}
                                </p>
                             </div>
                          </div>
                          <div className="space-y-3 sm:space-y-6">
                             <div className="flex items-baseline gap-1">
                                <span className="text-3xl sm:text-5xl font-black text-gray-900">{weather?.highTemp ?? 34}°</span>
                                <span className="text-xs font-black text-gray-300 uppercase">High</span>
                             </div>
                             <p className={`text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-md w-fit ${weather?.color || 'text-primary'} ${weather?.bgAccent || 'bg-primary/5'}`}>
                               {weather?.status || 'Sunny'} ({weather?.isDay ? 'Day' : 'Night'})
                             </p>
                          </div>
                       </div>
                       
                       <div className="mt-6 sm:mt-10 flex justify-between pt-6 border-t border-gray-50">
                          <div className="text-center">
                            <i className="fas fa-wind text-gray-300 mb-2 text-xs block"></i>
                            <p className="text-[8px] sm:text-[9px] font-black uppercase">{weather?.windSpeed ?? 12} km/h</p>
                          </div>
                          <div className="text-center">
                            <i className="fas fa-tint text-gray-300 mb-2 text-xs block"></i>
                            <p className="text-[8px] sm:text-[9px] font-black uppercase">{weather?.humidity ?? 45}% Hum</p>
                          </div>
                          <div className="text-center">
                            <i className="fas fa-sun text-gray-300 mb-2 text-xs block"></i>
                            <p className="text-[8px] sm:text-[9px] font-black uppercase">UV {weather?.uvIndex ?? 'High'}</p>
                          </div>
                       </div>
                     </>
                   )}
                </div>

                {/* Productivity Card (Yield Growth Activity) */}
                <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/5 flex flex-col text-white relative overflow-hidden min-h-[260px]">
                   <div className="flex justify-between items-center mb-6 relative z-10 gap-2">
                      <p className="text-[9px] font-black text-white/40 uppercase">Yield Growth Activity</p>
                      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        {['weekly', 'monthly', 'yearly'].map((tf) => (
                          <button
                            key={tf}
                            type="button"
                            onClick={() => setYieldTimeframe(tf)}
                            className={`text-[8px] font-black px-2 py-1 rounded-md transition uppercase ${
                              yieldTimeframe === tf
                                ? 'bg-primary text-white shadow-md'
                                : 'text-white/40 hover:text-white'
                            }`}
                          >
                            {tf === 'weekly' ? 'W' : tf === 'monthly' ? 'M' : 'Y'}
                          </button>
                        ))}
                      </div>
                   </div>
                   
                   <div className="flex-1 relative flex items-end gap-2 px-2 pt-8 pb-6">
                      <svg className="absolute inset-0 w-full h-full text-primary opacity-80" viewBox="0 0 400 200" preserveAspectRatio="none">
                         <path 
                           d={yieldDataMap[yieldTimeframe].path} 
                           fill="none" 
                           stroke="currentColor" 
                           strokeWidth="5" 
                           strokeLinecap="round" 
                           className="transition-all duration-500 ease-in-out"
                         />
                      </svg>
                      <div className="absolute top-6 left-[35%] px-3 py-1.5 bg-primary text-white text-[9px] font-black rounded-lg uppercase shadow-2xl">
                        {yieldDataMap[yieldTimeframe].increase}
                      </div>
                   </div>
                   
                   <div className="flex justify-between text-[8px] font-black text-white/30 uppercase pt-4 border-t border-white/5 relative z-10">
                      {yieldDataMap[yieldTimeframe].labels.map((lbl, idx) => (
                        <span key={idx}>{lbl}</span>
                      ))}
                   </div>
                </div>

                {/* Banner Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl group flex flex-col min-h-[260px] sm:min-h-[300px]">
                   <img src="https://scontent.fabb1-1.fna.fbcdn.net/v/t1.6435-9/95926697_1114038835640037_5154846609384669184_n.jpg?stp=dst-jpg_tt6&cstp=mx720x960&ctp=s590x590&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFocLLx_Ot47XEaElTgVc4mRVDlr6neqOtFUOWvqd6o60w-VkxRMH81XplO9fxBX9mIlGFvBGxGylbRHIyKkEQU&_nc_ohc=cINcigeNwu4Q7kNvwGQk7Up&_nc_oc=Ado5Yhx9YKgx_SGHTT2P4TkBN2RhUR3UW0pPHeckKBkq2Eg5Ok4i3PNcn2QWz-IYJAs&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=9kFP8u391E0ftvh9d4qP5g&_nc_ss=7b2a8&oh=00_AQFHfkdYSXvMqZ3K9Lt2HYQX5yHw5eEH8Ns2yzmZes082g&oe=6A99B050" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000 grayscale-[0.3]" alt="Market" />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white z-10">
                      <div className="flex justify-between items-end mb-4">
                         <div>
                            <span className="text-[8px] font-black uppercase text-primary mb-1 block">Premium Marketplace</span>
                            <h3 className="text-xl sm:text-3xl font-black leading-none uppercase">Ogbete Market</h3>
                         </div>
                         <button className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl flex items-center justify-center text-white shrink-0"><i className="fas fa-arrow-right text-sm sm:text-xl"></i></button>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/60 leading-relaxed font-bold uppercase border-t border-white/10 pt-4">
                         Connecting your farm produce directly to the heart of Enugu's largest trading hub.
                      </p>
                   </div>
                </div>
              </div>

              {/* FIX 4: Production Summary Section & Legend Controls */}
              <div className="bg-white rounded-2xl p-5 sm:p-12 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Inventory Analytics</p>
                      <h2 className="text-xl sm:text-3xl font-black text-gray-900 uppercase">Production Summary</h2>
                   </div>

                   {/* Compact Filter Buttons for Mobile */}
                   <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setActiveView('both')}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${
                          activeView === 'both'
                            ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                            : 'text-gray-400'
                        }`}
                      >
                        All
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveView('previous')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${
                          activeView === 'previous'
                            ? 'bg-[#D6C7BC] text-white shadow-sm'
                            : 'text-gray-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#B8A394]"></span>
                        Previous
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveView('current')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${
                          activeView === 'current'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-gray-400'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${activeView === 'current' ? 'bg-white' : 'bg-primary'}`}></span>
                        Current
                      </button>
                   </div>
                </div>

                {/* FIX 5: Chart Responsive Height */}
                <div className="h-64 sm:h-96 w-full">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

            </div>
          )}

          {route === 'products' && <AdminProducts />}
          {route === 'settings' && <Settings />}
          {route === 'messages' && <Messages />}
          {route === 'sales' && (
            <div className="p-8 sm:p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
               <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-8 uppercase"><i className="fas fa-history mr-3 text-primary opacity-50"></i>Sales History</h2>
               <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="text-5xl text-gray-200 mb-4"><i className="fas fa-folder-open"></i></div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">No sales data recorded for your account.</p>
               </div>
            </div>
          )}
          {route === 'orders' && (
            <div className="p-8 sm:p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
               <h2 className="text-xl sm:text-3xl font-black text-gray-900 mb-8 uppercase"><i className="fas fa-shopping-basket mr-3 text-primary opacity-50"></i>Order Management</h2>
               <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="text-5xl text-gray-200 mb-4"><i className="fas fa-box-open"></i></div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">You have no active orders to process.</p>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}