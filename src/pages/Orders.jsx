import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/useAppContext";

export default function Orders() {
  const [query, setQuery] = useState("");
  const { currencies, currency, user } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';

  // Mock orders data with Enugu focus
  const [orders] = useState([
    {
      id: "UBX-7721",
      productName: "Fresh Tomatoes (Basket)",
      quantity: 5,
      unit: "basket",
      totalPrice: 22500,
      date: "2026-03-20",
      status: "delivered",
      farmerName: "Nenwe Farmers Coop",
      farmLocation: "Amorji, Nenwe (Aninri LGA)"
    },
    {
      id: "UBX-8842",
      productName: "Nsukka Yellow Pepper",
      quantity: 2,
      unit: "kg",
      totalPrice: 3000,
      date: "2026-03-21",
      status: "in-transit",
      farmerName: "Obukpa Organic Farms",
      farmLocation: "Ihe/Owerre, Nsukka LGA"
    },
    {
      id: "UBX-9910",
      productName: "Large White Yam",
      quantity: 10,
      unit: "tuber",
      totalPrice: 35000,
      date: "2026-03-22",
      status: "processing",
      farmerName: "Inyi Root Crops",
      farmLocation: "Umuagu, Inyi (Oji River LGA)"
    }
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-primary/10 text-primary border-primary/20";
      case "in-transit":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "processing":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-400 border-gray-100";
    }
  };

  const filteredOrders = orders.filter((order) =>
    `${order.productName} ${order.farmerName} ${order.id}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-3">Accounts / History</p>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Order Tracking
            </h1>
          </div>
          
          <div className="w-full md:w-80">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
              <input 
                type="text"
                placeholder="Find Order ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition shadow-inner outline-none"
              />
            </div>
          </div>
        </div>

        {/* Orders Listing */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="group bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-700 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-50 group-hover:bg-primary transition duration-500"></div>
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Order Meta */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-black text-white bg-[#0a0a0a] px-3 py-1 rounded shadow-lg uppercase tracking-widest">#{order.id}</span>
                        <span className={`text-[8px] font-black px-3 py-1 rounded border uppercase tracking-[0.2em] ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2 leading-none">{order.productName}</h3>
                      <div className="flex flex-wrap gap-6 mt-4">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                           <i className="fas fa-calendar-alt text-primary/50"></i>
                           {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </p>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                           <i className="fas fa-map-marker-alt text-accent/50"></i>
                           {order.farmLocation}
                         </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex items-center gap-8 lg:border-l lg:border-gray-100 lg:pl-12">
                       <div className="text-right">
                         <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Items Summary</p>
                         <p className="text-sm font-black text-gray-900">{order.quantity} {order.unit}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount Settled</p>
                         <p className="text-2xl font-black text-primary leading-none">{symbol}{order.totalPrice.toLocaleString()}</p>
                       </div>
                       <button className="w-12 h-12 rounded-lg bg-gray-50 hover:bg-primary hover:text-white transition flex items-center justify-center text-gray-300 group-hover:shadow-xl active:scale-95 transform">
                         <i className="fas fa-arrow-right text-xs"></i>
                       </button>
                    </div>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="px-8 pb-4">
                   <div className="flex justify-between mb-2">
                       {["Received", "Processing", "Shipped", "Delivered"].map((step, idx) => (
                         <div key={idx} className={`text-[8px] font-black uppercase tracking-widest ${idx <= (order.status === 'delivered' ? 3 : order.status === 'in-transit' ? 2 : 1) ? 'text-primary' : 'text-gray-200'}`}>
                            {step}
                         </div>
                       ))}
                   </div>
                   <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-primary transition-all duration-1000 ${order.status === 'delivered' ? 'w-full' : order.status === 'in-transit' ? 'w-2/3' : 'w-1/3'}`}
                      ></div>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-40 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center">
               <div className="w-20 h-20 bg-white rounded-lg shadow-xl flex items-center justify-center text-gray-100 text-3xl mb-10 border border-gray-50">
                  <i className="fas fa-receipt opacity-20"></i>
               </div>
               <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">No records found</h2>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">We couldn't find any orders matching your criteria</p>
            </div>
          )}
        </div>

        {/* Verification / Support Info */}
        <div className="mt-20 p-12 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-primary text-2xl border border-gray-200">
                 <i className="fas fa-headset"></i>
              </div>
              <div>
                 <h4 className="text-xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-2">Need Assistance?</h4>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Our logistics support is active 24/7 for you</p>
              </div>
           </div>
           <button className="bg-[#0a0a0a] hover:bg-primary text-white px-10 py-5 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 active:scale-95">Open Support Ticket</button>
        </div>
      </main>
    </div>
  );
}
