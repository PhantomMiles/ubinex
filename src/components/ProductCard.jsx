import React from "react";
import { useApp } from "../context/useAppContext";

export default function ProductCard({ product = {}, onView }) {
  const { currency, currencies, addToCart, t } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';
  const price = product.price || 0;
  const unit = product.unit || "kg";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleNegotiate = (e) => {
    e.stopPropagation();
    onView && onView(product);
  };

  return (
    <article 
      onClick={() => onView && onView(product)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full relative font-sans cursor-pointer"
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded shadow-lg uppercase">
          -{product.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
        <img
          src={product.image || "https://via.placeholder.com/400x400?text=Premium+Produce"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/5 transition duration-500"></div>
        
        {/* Quick Actions Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden">
           <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white shadow-xl transition active:scale-95">
             <i className="far fa-heart"></i>
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onView && onView(product); }}
             className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white shadow-xl transition active:scale-95"
           >
             <i className="far fa-eye"></i>
           </button>
        </div>

        {/* Mobile Action Badge */}
        <div className="absolute bottom-3 left-3 md:hidden">
           <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 flex items-center gap-2">
              <i className="fas fa-handshake text-primary text-[10px]"></i>
              <span className="text-[8px] font-black uppercase text-primary">{t("negotiable")}</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] font-black text-primary uppercase">{t(product.category_key) || product.category}</span>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <span className="text-[8px] font-black text-gray-400 uppercase truncate">{product.location?.split(',')[1] || product.location || 'Enugu'}</span>
          </div>
          <h3 className="text-sm font-black text-gray-900 leading-tight group-hover:text-primary transition line-clamp-2 uppercase">{product.name}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4 opacity-80">
          {[1,2,3,4,5].map((s) => (
            <i key={s} className={`fas fa-star text-[8px] ${s <= 4 ? 'text-yellow-400' : 'text-gray-200'}`}></i>
          ))}
          <span className="text-[8px] text-gray-400 font-black ml-1 uppercase">(12 {t("reviews")})</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-primary">{symbol}{price.toLocaleString()}</span>
            <span className="text-[9px] text-gray-400 font-black ml-1 uppercase">/ {unit}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleNegotiate}
              className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition shadow-inner active:scale-95"
              title={t("negotiate_price")}
            >
              <i className="fas fa-comments text-xs"></i>
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-[#0a0a0a] transition shadow-md active:scale-95"
              title={t("add_to_basket")}
            >
              <i className="fas fa-shopping-basket text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-black text-primary opacity-0 group-hover:opacity-100 transition duration-300 shadow-sm border border-primary/10 uppercase md:block hidden">
        {t("available")}
      </div>
    </article>
  );
}