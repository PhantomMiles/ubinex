import React from "react";
import { useApp } from "../context/useAppContext";

export default function ProductDetails({ product = {}, onNegotiate, onClose }) {
  const { currency, currencies, addToCart } = useApp();

  if (!product) return null;
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';
  const price = product.price || product.pricePerKg || product.pricePerLiter || 0;
  const unit = product.unit || "kg";

  const handleAddToCart = () => {
    addToCart(product);
    onClose && onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto font-sans relative">
      {/* Header / Close */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-gray-100 p-6 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Product Details</p>
          <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">{product.name}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-600 transition shadow-inner active:scale-90"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="p-8">
        {/* Gallery / Image */}
        <div className="aspect-video bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-inner mb-8 group">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Origin & Quality</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                  <i className="fas fa-map-marker-alt text-accent"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">{product.location || "Enugu, Nigeria"}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                  <i className="fas fa-certificate text-primary"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Verified Grade A</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Market Description</p>
              <p className="text-xs font-bold text-gray-600 leading-loose uppercase tracking-[0.1em] italic">
                {product.description || "Premium agricultural produce sourced directly from consolidation centers in Enugu. Ensuring peak freshness and quality for your table."}
              </p>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="bg-[#0a0a0a] text-white p-8 rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
            <div className="relative z-10">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Consolidated Price</p>
               <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-black italic text-white line-height-none tracking-tighter">{symbol}{price.toLocaleString()}</span>
                  <span className="text-xs font-black text-white/30 uppercase tracking-widest mb-2">/ {unit}</span>
               </div>
               
               <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Estimated Delivery</span>
                     <span className="text-white italic">24 - 48 Hours</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Supply Status</span>
                     <span className="text-primary italic">In Stock</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4 relative z-10 mt-auto">
               <button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-white hover:text-primary text-white font-black py-5 rounded-lg text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl italic"
               >
                  Add to Shopping Bag
               </button>
               <button 
                  onClick={() => onNegotiate && onNegotiate()}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-5 rounded-lg text-[10px] uppercase tracking-[0.3em] transition-all border border-white/10 italic"
               >
                  Negotiate Price
               </button>
            </div>

            {/* Decorative background */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>

        {/* Similar Items Placeholder or Additional Meta */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center grayscale opacity-30">
           <div className="flex gap-8">
              <i className="fas fa-share-alt text-sm"></i>
              <i className="fas fa-print text-sm"></i>
              <i className="fas fa-heart text-sm"></i>
           </div>
           <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Copyright © 2026 Ubinex Limited</p>
        </div>
      </div>
    </div>
  );
}
