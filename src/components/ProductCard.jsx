import React from "react";
import { useApp } from "../context/useAppContext";

export default function ProductCard({ product = {}, onView }) {
  const { currency, currencies, addToCart } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';
  const price = product.price || 0;
  const unit = product.unit || "kg";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full relative font-sans">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
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
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
           <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white shadow-xl transition active:scale-95">
             <i className="far fa-heart"></i>
           </button>
           <button 
             onClick={() => onView && onView(product)}
             className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white shadow-xl transition active:scale-95"
           >
             <i className="far fa-eye"></i>
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">{product.category}</span>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest truncate">{product.location?.split(',')[1] || product.location || 'Enugu'}</span>
          </div>
          <h3 className="text-sm font-black text-gray-900 leading-tight group-hover:text-primary transition line-clamp-2 uppercase italic tracking-tighter">{product.name}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4 opacity-80">
          {[1,2,3,4,5].map((s) => (
            <i key={s} className={`fas fa-star text-[8px] ${s <= 4 ? 'text-yellow-400' : 'text-gray-200'}`}></i>
          ))}
          <span className="text-[8px] text-gray-400 font-black ml-1 uppercase tracking-widest">(12 Reviews)</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-primary italic">{symbol}{price.toLocaleString()}</span>
            <span className="text-[9px] text-gray-400 font-black ml-1 uppercase tracking-widest">/ {unit}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition shadow-inner group-hover:shadow-md active:scale-95"
            title="Add to Basket"
          >
            <i className="fas fa-shopping-basket text-xs"></i>
          </button>
        </div>
      </div>

      {/* Hover Status */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-black text-primary opacity-0 group-hover:opacity-100 transition duration-300 shadow-sm border border-primary/10 uppercase tracking-widest">
        Available
      </div>
    </article>
  );
}
