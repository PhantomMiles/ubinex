import React from 'react';
import { useApp } from '../context/useAppContext';

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-2xl group h-[450px] lg:h-[550px]">
        <img
          src="https://i.pinimg.com/1200x/b5/ef/e3/b5efe340e7d97fb9d0dde05625c82330.jpg"
          alt="Premium Abakaliki Rice"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 grayscale-[0.3] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center px-16 text-white z-10">
          <span className="text-green-600 font-black uppercase mb-6 animate-in fade-in slide-in-from-left duration-700">
            {t("premium_harvest")}
          </span>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight max-w-xl animate-in fade-in slide-in-from-left duration-700 delay-100 uppercase tracking-tighter">
            {t("stone_free")} <br />
            <span className="text-primary">{t("abakaliki_rice")}</span>
          </h1>
          <p className="text-xl mb-10 opacity-80 delay-200 animate-in fade-in slide-in-from-left font-bold uppercase tracking-widest">
            {t("starting_from")} <span className="text-white font-black">₦45,000</span> <span className="text-xs opacity-50">/ 50kg Bag</span>
          </p>
          <button className="bg-primary hover:bg-white hover:text-primary text-white font-black py-5 px-12 rounded-lg transition-all shadow-2xl w-fit uppercase text-[10px] delay-300 animate-in fade-in slide-in-from-left transform active:scale-95 border border-white/10">
            {t("secure_your_bag")} <i className="fas fa-arrow-right ml-3 scale-90"></i>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 h-[450px] lg:h-[550px]">
        <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl group border border-gray-100">
          <img
            src="https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg"
            alt="Nsukka Yellow Pepper"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter leading-none">
              {t("nsukka_pepper")}
            </h3>
            <p className="text-[9px] uppercase opacity-80 mb-6 font-black text-primary">
              {t("authentic_aroma")}
            </p>
            <button className="text-[9px] font-black uppercase border-b border-primary w-fit pb-1.5 hover:text-primary transition">
              {t("search_market")}
            </button>
          </div>
        </div>

        <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl group border border-gray-100">
          <img
            src="https://i.pinimg.com/736x/96/20/3b/96203bc957b2121c341ebf1116f73578.jpg"
            alt="Nigerian Spices"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 grayscale-[0.2] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/10 to-transparent flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter leading-none">
              {t("premium_spices")}
            </h3>
            <p className="text-[9px] uppercase opacity-80 mb-6 font-black text-accent">
              Crayfish, Cameroon Pepper, Dried Pepper
            </p>
            <button className="text-[9px] font-black uppercase border-b border-accent w-fit pb-1.5 hover:text-accent transition">
              {t("view_spices")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}